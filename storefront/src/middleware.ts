import { NextRequest, NextResponse } from "next/server";
import { detectLocaleFromHost } from "@/lib/i18n";

const PROTECTED_PATHS = [/^\/buyer-center/, /^\/seller-center/, /^\/account/, /^\/checkout/];

export function middleware(req: NextRequest) {
  const host = req.headers.get("host");
  const locale = detectLocaleFromHost(host);
  const res = NextResponse.next();
  res.cookies.set("locale", locale, { path: "/", sameSite: "lax" });

  const requiresAuth = PROTECTED_PATHS.some((re) => re.test(req.nextUrl.pathname));
  if (requiresAuth && !req.cookies.get("csr_session")) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
