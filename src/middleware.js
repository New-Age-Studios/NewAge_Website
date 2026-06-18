import { NextResponse } from "next/server";

const locales = ["en", "pt-br"];
const defaultLocale = "en";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip public assets and internal next routes
  if (
    pathname.includes('.') || 
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Determine locale: check cookie first, then accept-language
  let locale = request.cookies.get("NEXT_LOCALE")?.value;
  if (!locale || !locales.includes(locale)) {
    const acceptLang = request.headers.get("accept-language");
    if (acceptLang && acceptLang.includes("pt")) {
      locale = "pt-br";
    } else {
      locale = defaultLocale;
    }
  }

  // Redirect to localized URL
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  const response = NextResponse.redirect(request.nextUrl);
  
  // Set cookie for future visits
  response.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  
  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
