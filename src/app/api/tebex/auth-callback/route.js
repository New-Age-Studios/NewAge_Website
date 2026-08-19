import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCheckoutUrl } from "@/lib/tebex";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const packageId = searchParams.get('packageId');
  const type = searchParams.get('type');
  
  const cookieStore = await cookies();
  const basketIdent = cookieStore.get("tebex_basket_ident")?.value;

  if (!basketIdent || !packageId) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    // The basket is now authenticated, we can add the subscription package.
    const res = await fetch(`https://headless.tebex.io/api/baskets/${basketIdent}/packages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ package_id: parseInt(packageId), quantity: 1, type: type || "single" }),
    });

    if (!res.ok) {
      console.error("Failed to add package after auth:", await res.text());
      return NextResponse.redirect(new URL('/', request.url));
    }

    const checkoutUrl = await getCheckoutUrl(basketIdent);
    if (checkoutUrl) {
      return NextResponse.redirect(checkoutUrl);
    } else {
      return NextResponse.redirect(new URL('/cart', request.url));
    }
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
