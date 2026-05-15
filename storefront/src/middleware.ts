import { NextRequest, NextResponse } from "next/server";
import { detectLocaleFromHost } from "@/lib/i18n";

/**
 * Locale middleware — subdomain mode.
 * Reads the `Host` header (e.g. `en.huayuesc.local`), derives the active
 * locale via `detectLocaleFromHost`, and stores it in a `locale` cookie
 * for server components and client to consume. No path rewrite needed.
 */

export function middleware(req: NextRequest) {
  const host = req.headers.get("host");
  const locale = detectLocaleFromHost(host);
  const res = NextResponse.next();
  res.cookies.set("locale", locale, { path: "/", sameSite: "lax" });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
