/**
 * i18n configuration — single source of truth for supported locales.
 *
 * Domain strategy (one currency per locale, currency follows language):
 *   - vi (default) → apex          huayuesc.vn      · VND
 *   - en           → en.           en.huayuesc.vn   · USD
 *   - cn           → cn.           cn.huayuesc.vn   · CNY
 *
 * `localeHref(target, path, host)` rebuilds the URL for `target` on the same
 * registrable/base domain: `vi` drops the locale label (apex), `en`/`cn`
 * prefix it. Switching language therefore also switches currency.
 *
 * To add a locale: add it to LOCALES, route its subdomain in Caddy, and add
 * the host to next.config.mjs allowedDevOrigins.
 */

export type LocaleCode = "vi" | "en" | "cn";

export type LocaleConfig = {
  code: LocaleCode;
  label: string;       // shown in its own language: "Tiếng Việt" / "English" / "中文"
  shortLabel: string;  // "VI"
  flag: string;        // 🇻🇳
  currency: string;    // "VND"
  subdomain: string;   // "" = apex (vi) | "en" | "cn"
};

export const LOCALES: Record<LocaleCode, LocaleConfig> = {
  vi: { code: "vi", label: "Tiếng Việt", shortLabel: "VI", flag: "🇻🇳", currency: "VND", subdomain: ""   },
  en: { code: "en", label: "English",    shortLabel: "EN", flag: "🇬🇧", currency: "USD", subdomain: "en" },
  cn: { code: "cn", label: "中文",        shortLabel: "CN", flag: "🇨🇳", currency: "CNY", subdomain: "cn" },
};

export const DEFAULT_LOCALE: LocaleCode = "vi";
export const LOCALE_LIST: LocaleConfig[] = Object.values(LOCALES);

/** First-DNS labels that denote a locale prefix — stripped to find the base domain. */
const STRIP_LABELS = new Set<string>(["cn", "en", "shop", "vi"]);

/* ------------------------------------------------------------------ */
/*  Detection                                                          */
/* ------------------------------------------------------------------ */

/** Detect the active locale from a host like "cn.huayuesc.vn" / "huayuesc.vn". */
export function detectLocaleFromHost(host: string | null | undefined): LocaleCode {
  if (!host) return DEFAULT_LOCALE;
  const first = host.split(":")[0].split(".")[0].toLowerCase();
  if (first === "cn") return "cn";
  if (first === "en") return "en";
  return DEFAULT_LOCALE; // apex / shop / vi / anything else → Vietnamese
}

/* ------------------------------------------------------------------ */
/*  URL builder                                                        */
/* ------------------------------------------------------------------ */

/**
 * Build the URL for `currentPath` under `target` locale on the same base
 * domain. Protocol-relative so the browser does a full cross-host navigation
 * (cookies are per-host). Returns the path alone if host is unknown.
 */
export function localeHref(
  target: LocaleCode,
  currentPath: string,
  currentHost?: string | null,
): string {
  if (!currentHost) return currentPath || "/";

  const [bareHost, port] = currentHost.split(":");
  let parts = bareHost.split(".");

  // Drop a leading locale label to reach the base/registrable domain.
  if (parts.length > 0 && STRIP_LABELS.has(parts[0].toLowerCase())) {
    parts = parts.slice(1);
  }
  const base = parts.join(".");
  const sub = LOCALES[target].subdomain;
  const newHost = (sub ? `${sub}.` : "") + base + (port ? `:${port}` : "");
  return `//${newHost}${currentPath || "/"}`;
}
