import { NextResponse } from "next/server";

const locales = ["en", "pt-br"];
const defaultLocale = "en";

// Map countries to their respective currencies
const countryToCurrency = {
  BR: 'BRL', GB: 'GBP', US: 'USD', CA: 'CAD', AU: 'AUD', NZ: 'NZD', JP: 'JPY', CN: 'CNY', 
  MX: 'MXN', CL: 'CLP', CO: 'COP', ZA: 'ZAR', IN: 'INR', ID: 'IDR', MY: 'MYR', PH: 'PHP', 
  SG: 'SGD', TH: 'THB', IL: 'ILS', TR: 'TRY', EG: 'EGP', HK: 'HKD',
  // Europe
  AT: 'EUR', BE: 'EUR', CY: 'EUR', EE: 'EUR', FI: 'EUR', FR: 'EUR', DE: 'EUR', 
  GR: 'EUR', IE: 'EUR', IT: 'EUR', LV: 'EUR', LT: 'EUR', LU: 'EUR', MT: 'EUR', 
  NL: 'EUR', PT: 'EUR', SK: 'EUR', SI: 'EUR', ES: 'EUR', CH: 'CHF', DK: 'DKK', 
  NO: 'NOK', SE: 'SEK', PL: 'PLN', CZ: 'CZK', HU: 'HUF', RO: 'RON'
};

export function proxy(request) {
  const { pathname } = request.nextUrl;
  
  // Skip public assets and internal next routes
  if (
    pathname.includes('.') || 
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')
  ) {
    return;
  }

  let response;
  
  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  let locale = request.cookies.get("NEXT_LOCALE")?.value;
  let currency = request.cookies.get("NEXT_CURRENCY")?.value;
  
  let needsLocaleCookie = false;
  let needsCurrencyCookie = false;

  // 1. Resolve Locale
  if (!pathnameHasLocale) {
    if (!locale || !locales.includes(locale)) {
      // Vercel gives us country headers, and standard accept-language
      const country = request.headers.get("x-vercel-ip-country");
      const acceptLang = request.headers.get("accept-language");
      
      if (country === 'BR' || country === 'PT' || (acceptLang && acceptLang.includes("pt"))) {
        locale = "pt-br";
      } else {
        locale = defaultLocale;
      }
    }
    needsLocaleCookie = true;
    request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    response = NextResponse.redirect(request.nextUrl);
  } else {
    // If the path already has a locale, we just pass the request
    response = NextResponse.next();
  }

  // 2. Resolve Currency based on Vercel IP Country
  if (!currency) {
    const country = request.headers.get("x-vercel-ip-country");
    // If country is found, map it to currency, else fallback to USD
    currency = country ? (countryToCurrency[country] || 'USD') : 'USD';
    needsCurrencyCookie = true;
  }

  // 3. Set Cookies
  if (needsLocaleCookie) {
    response.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  }
  if (needsCurrencyCookie) {
    response.cookies.set("NEXT_CURRENCY", currency, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
