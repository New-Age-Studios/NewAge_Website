"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const TEBEX_TOKEN = 'uozl-bd880a83b5eacbcd68df95195576e75b5222e8b3';
const BASE_URL = `https://headless.tebex.io/api/accounts/${TEBEX_TOKEN}`;

async function getBasket() {
  const cookieStore = await cookies();
  const ident = cookieStore.get("tebex_basket_ident")?.value;

  if (ident) {
    const res = await fetch(`${BASE_URL}/baskets/${ident}`);
    if (res.ok) {
      return ident;
    }
  }

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const originUrl = `${protocol}://${host}`;
  const referer = headersList.get("referer") || `${originUrl}/en/products`;
  // Extract language from referer if possible, default to en
  let lang = "en";
  try {
    const url = new URL(referer);
    const pathParts = url.pathname.split("/").filter(Boolean);
    if (pathParts.length > 0) lang = pathParts[0];
  } catch (e) {}

  const res = await fetch(`${BASE_URL}/baskets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      complete_url: `${originUrl}/${lang}/success`,
      cancel_url: `${originUrl}/${lang}/products`,
    }),
  });

  if (!res.ok) throw new Error("Failed to create basket on Tebex");
  
  const json = await res.json();
  const newIdent = json.data.ident;

  cookieStore.set("tebex_basket_ident", newIdent, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return newIdent;
}

export async function getBasketData() {
  const cookieStore = await cookies();
  const ident = cookieStore.get("tebex_basket_ident")?.value;
  if (!ident) return null;

  const res = await fetch(`${BASE_URL}/baskets/${ident}`, { cache: "no-store" });
  if (res.ok) {
    const json = await res.json();
    return json.data;
  }
  return null;
}

export async function getLoginState() {
  const data = await getBasketData();
  if (data && data.username) {
    return data.username;
  }
  return null;
}

export async function getAvailableAuthMethods(returnPath = "/") {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const fullReturnUrl = `${protocol}://${host}${returnPath}`;

  const basketIdent = await getBasket();

  const authRes = await fetch(`${BASE_URL}/baskets/${basketIdent}/auth?returnUrl=${encodeURIComponent(fullReturnUrl)}`);
  if (authRes.ok) {
    const authJson = await authRes.json();
    return authJson;
  }
  return [];
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("tebex_basket_ident");
}

export async function clearCartCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("tebex_basket_ident");
}

export async function initiateLogin(returnPath, providerName = "FiveM") {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const fullReturnUrl = `${protocol}://${host}${returnPath}`;

  const basketIdent = await getBasket();

  const authRes = await fetch(`${BASE_URL}/baskets/${basketIdent}/auth?returnUrl=${encodeURIComponent(fullReturnUrl)}`);
  if (authRes.ok) {
    const authJson = await authRes.json();
    const targetProvider = authJson.find(p => p.name === providerName) || authJson[0];
    const authUrl = targetProvider?.url;
    if (authUrl) redirect(authUrl);
  }
  throw new Error(`Failed to load Tebex login screen for ${providerName}.`);
}

export async function addToCart(formData) {
  const packageId = formData.get("packageId");
  const returnPath = formData.get("returnPath");

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const fullReturnUrl = `${protocol}://${host}${returnPath}`;

  const basketIdent = await getBasket();

  const res = await fetch(`https://headless.tebex.io/api/baskets/${basketIdent}/packages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ package_id: parseInt(packageId), quantity: 1 }),
  });

  const json = await res.json();

  if (!res.ok) {
    if (json.status === 422 && json.detail && json.detail.includes("User must login")) {
      const authRes = await fetch(`${BASE_URL}/baskets/${basketIdent}/auth?returnUrl=${encodeURIComponent(fullReturnUrl)}`);
      if (authRes.ok) {
        const authJson = await authRes.json();
        const authUrl = authJson[0]?.url;
        if (authUrl) redirect(authUrl);
      }
      throw new Error("Failed to load Tebex login screen.");
    }
    throw new Error(json.detail || "Error adding item to cart.");
  }

  return true;
}

export async function goToCheckout() {
  const basketIdent = await getBasket();
  const checkoutRes = await fetch(`${BASE_URL}/baskets/${basketIdent}`);
  const checkoutJson = await checkoutRes.json();
  const checkoutUrl = checkoutJson.data.links.checkout;

  if (!checkoutUrl) throw new Error("Could not generate checkout link.");

  redirect(checkoutUrl);
}

export async function removePackage(packageId) {
  const basketIdent = await getBasket();

  const res = await fetch(`https://headless.tebex.io/api/baskets/${basketIdent}/packages/remove`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ package_id: parseInt(packageId) }),
  });

  if (!res.ok) {
    throw new Error("Error removing package from cart.");
  }
}

export async function applyCoupon(couponCode) {
  const basketIdent = await getBasket();

  const res = await fetch(`${BASE_URL}/baskets/${basketIdent}/coupons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ coupon_code: couponCode }),
  });

  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.detail || "Invalid coupon code.");
  }
}

export async function removeCoupon(couponCode) {
  const basketIdent = await getBasket();

  const res = await fetch(`${BASE_URL}/baskets/${basketIdent}/coupons/remove`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ coupon_code: couponCode }),
  });

  if (!res.ok) {
    throw new Error("Error removing coupon.");
  }
}
