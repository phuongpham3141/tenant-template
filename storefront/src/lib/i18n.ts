/**
 * i18n configuration — single source of truth for supported locales.
 *
 * Subdomain URL strategy: each locale lives at its own subdomain
 *   - vi (default) → `shop.huayuesc.local` / `huayuesc.com` (prod)
 *   - en           → `en.huayuesc.local`   / `en.huayuesc.com`
 *   - cn           → `cn.huayuesc.local`   / `cn.huayuesc.com`
 *
 * `localeHref(target, currentPath, currentHost)` swaps the first DNS label
 * of the host with the target locale's subdomain. Path stays the same so
 * users land on the equivalent page in the new locale.
 *
 * To add a new locale (e.g. Thai):
 *   1) Add an entry in LOCALES below
 *   2) Caddy: route the new subdomain to storefront in Caddyfile.dev
 *   3) next.config.mjs: add the new host to allowedDevOrigins
 */

export type LocaleCode = "vi" | "en" | "cn";

export type LocaleConfig = {
  code: LocaleCode;
  label: string;       // "Tiếng Việt"
  shortLabel: string;  // "VI"
  flag: string;        // 🇻🇳
  currency: string;    // "VND"
  subdomain: string;   // "shop" (default) | "en" | "cn"
};

export const LOCALES: Record<LocaleCode, LocaleConfig> = {
  vi: { code: "vi", label: "Tiếng Việt", shortLabel: "VI", flag: "🇻🇳", currency: "VND", subdomain: "shop" },
  en: { code: "en", label: "English",    shortLabel: "EN", flag: "🇬🇧", currency: "USD", subdomain: "en"   },
  cn: { code: "cn", label: "中文",        shortLabel: "CN", flag: "🇨🇳", currency: "CNY", subdomain: "cn"   },
};

export const DEFAULT_LOCALE: LocaleCode = "vi";
export const LOCALE_LIST: LocaleConfig[] = Object.values(LOCALES);

/** All recognized first-DNS-labels (so we know what to strip when swapping). */
const KNOWN_SUBDOMAINS = new Set<string>([
  ...LOCALE_LIST.map((l) => l.subdomain),
  "vi", // alias for default — also recognized
]);

/* ------------------------------------------------------------------ */
/*  Detection helpers                                                 */
/* ------------------------------------------------------------------ */

/** Detect locale from a host header like "en.huayuesc.local". */
export function detectLocaleFromHost(host: string | null | undefined): LocaleCode {
  if (!host) return DEFAULT_LOCALE;
  const sub = host.split(":")[0].split(".")[0];
  const matched = LOCALE_LIST.find((l) => l.subdomain === sub);
  if (matched) return matched.code;
  if (sub === "vi") return "vi";
  return DEFAULT_LOCALE;
}

/* ------------------------------------------------------------------ */
/*  URL builder (subdomain mode)                                       */
/* ------------------------------------------------------------------ */

/**
 * Build the URL for the same `currentPath` on the target locale's subdomain.
 * Returns a protocol-relative absolute URL so the browser does a full
 * navigation (cookies are subdomain-scoped, no client-side routing here).
 *
 * Falls back to the path itself if `currentHost` is unknown (e.g. SSR
 * before hydration), the LangSwitcher upgrades the href on the client.
 */
export function localeHref(
  target: LocaleCode,
  currentPath: string,
  currentHost?: string | null,
): string {
  if (!currentHost) return currentPath || "/";

  // Split host:port → host parts + port
  const [bareHost, port] = currentHost.split(":");
  const parts = bareHost.split(".");

  // Replace the first label if it's a known locale subdomain;
  // otherwise prepend the target subdomain.
  if (parts.length > 0 && KNOWN_SUBDOMAINS.has(parts[0])) {
    parts[0] = LOCALES[target].subdomain;
  } else {
    parts.unshift(LOCALES[target].subdomain);
  }

  const newHost = parts.join(".") + (port ? `:${port}` : "");
  return `//${newHost}${currentPath || "/"}`;
}
