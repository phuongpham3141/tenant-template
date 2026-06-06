import fs from 'node:fs';
const R = '/work/src';
function edit(path, pairs) {
  const p = `${R}/${path}`;
  let s = fs.readFileSync(p, 'utf8');
  for (const [a, b] of pairs) {
    if (s.includes(a)) s = s.split(a).join(b);
    else console.log('NF', path, JSON.stringify(a.slice(0, 45)));
  }
  fs.writeFileSync(p, s);
}
const write = (path, content) => fs.writeFileSync(`${R}/${path}`, content);

// 1) i18n.ts: replace localeHref (subdomain) with path-based + append helpers
let i18 = fs.readFileSync(`${R}/lib/i18n.ts`, 'utf8');
const lhStart = i18.indexOf('export function localeHref(');
const lhEnd = i18.indexOf('\n}', lhStart) + 2;
if (lhStart < 0) { console.log('localeHref NOT FOUND'); }
else {
  i18 = i18.slice(0, lhStart) +
`export function localeHref(target: LocaleCode, currentPath: string): string {
  return withLocalePrefix(target, currentPath);
}` + i18.slice(lhEnd);
}
i18 += `

/* ------------------------------------------------------------------ */
/*  Path-based locale (/en, /cn ; vi = no prefix)                      */
/* ------------------------------------------------------------------ */

export function detectLocaleFromPath(pathname: string): LocaleCode | null {
  const seg = pathname.split("/")[1]?.toLowerCase();
  if (seg === "en") return "en";
  if (seg === "cn") return "cn";
  return null;
}

export function stripLocalePrefix(pathname: string): string {
  const seg = pathname.split("/")[1]?.toLowerCase();
  if (seg === "en" || seg === "cn") {
    const rest = pathname.slice(seg.length + 1);
    return rest === "" ? "/" : rest;
  }
  return pathname || "/";
}

export function withLocalePrefix(locale: LocaleCode, path: string): string {
  const clean = stripLocalePrefix(path);
  if (locale === "vi") return clean;
  return clean === "/" ? \`/\${locale}\` : \`/\${locale}\${clean}\`;
}
`;
fs.writeFileSync(`${R}/lib/i18n.ts`, i18);

// 2) proxy.ts — path mode + subdomain fallback
write('proxy.ts', `import { NextRequest, NextResponse } from "next/server";
import { detectLocaleFromHost, detectLocaleFromPath, stripLocalePrefix } from "@/lib/i18n";

/**
 * Locale middleware — path mode (/en, /cn) with subdomain fallback.
 * A leading /en or /cn segment selects the locale and is rewritten away so
 * the underlying app routes resolve. The locale is forwarded to Server
 * Components via the \`x-locale\` request header (read by getLocale) and
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
  matcher: ["/((?!_next|api|favicon.ico|.*\\\\..*).*)"],
};
`);

// 3) lib/t.ts — getLocale reads x-locale header (path), falls back to Host
edit('lib/t.ts', [
  [`export async function getLocale(): Promise<LocaleCode> {
  const h = await headers(); // Next 16: async
  return detectLocaleFromHost(h.get("host"));
}`,
   `export async function getLocale(): Promise<LocaleCode> {
  const h = await headers(); // Next 16: async
  const fromHeader = h.get("x-locale");
  if (fromHeader === "en" || fromHeader === "cn" || fromHeader === "vi") return fromHeader;
  return detectLocaleFromHost(h.get("host"));
}`],
]);

// 4) i18n-provider — also provide locale + useLocale
write('components/i18n-provider.tsx', `"use client";

import { createContext, useContext } from "react";
import { vi } from "@/messages/vi";
import type { Messages } from "@/messages";
import type { LocaleCode } from "@/lib/i18n";

const Ctx = createContext<{ messages: Messages; locale: LocaleCode }>({ messages: vi, locale: "vi" });

export function I18nProvider({
  messages,
  locale,
  children,
}: {
  messages: Messages;
  locale: LocaleCode;
  children: React.ReactNode;
}) {
  return <Ctx.Provider value={{ messages, locale }}>{children}</Ctx.Provider>;
}

export function useT() {
  const m = useContext(Ctx).messages;
  return (key: string): string => (m as Record<string, string>)[key] ?? key;
}

export function useLocale(): LocaleCode {
  return useContext(Ctx).locale;
}
`);

// 5) layout — pass locale to provider
edit('app/layout.tsx', [
  ['<I18nProvider messages={messages}>', '<I18nProvider messages={messages} locale={locale}>'],
]);

// 6) i18n-link — drop-in <Link> that prefixes internal hrefs with the active locale
write('components/i18n-link.tsx', `"use client";

import NextLink, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useLocale } from "@/components/i18n-provider";
import { withLocalePrefix } from "@/lib/i18n";

type Props = Omit<LinkProps, "href"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: LinkProps["href"];
    children?: ReactNode;
  };

/** Drop-in replacement for next/link that prefixes internal ("/...") hrefs
 *  with the active locale (/en, /cn). vi = no prefix. External / anchor /
 *  already-prefixed hrefs pass through untouched. */
export default function Link({ href, ...props }: Props) {
  const locale = useLocale();
  const h =
    typeof href === "string" && href.startsWith("/") && !href.startsWith("//")
      ? withLocalePrefix(locale, href)
      : href;
  return <NextLink href={h} {...props} />;
}
`);

console.log('path-locale infra written ✓');
