import { NextRequest, NextResponse } from "next/server";
import { detectLocaleFromHost, detectLocaleFromPath, stripLocalePrefix } from "@/lib/i18n";

/**
 * Locale middleware — path mode (/en, /cn) with subdomain fallback.
 * A leading /en or /cn segment selects the locale and is rewritten away so
 * the underlying app routes resolve. The locale is forwarded to Server
 * Components via the `x-locale` request header (read by getLocale) and
 * mirrored to a cookie for the client.
 */
export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const pathLocale = detectLocaleFromPath(url.pathname);
  const locale = pathLocale ?? detectLocaleFromHost(req.headers.get("host"));
  const headers = new Headers(req.headers);
  headers.set("x-locale", locale);
  const res = pathLocale
    ? NextResponse.rewrite(new URL(stripLocalePrefix(url.pathname) + url.search, url), { request: { headers } })
    : NextResponse.next({ request: { headers } });
  res.cookies.set("locale", locale, { path: "/", sameSite: "lax" });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
