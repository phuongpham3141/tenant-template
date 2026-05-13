export type Locale = "vi" | "en" | "cn"
export type I18nText = Partial<Record<Locale, string>>

export const DEFAULT_LOCALE: Locale = "vi"
export const FALLBACK_ORDER: Locale[] = ["vi", "en", "cn"]

export function pickLocale(text: I18nText | null | undefined, preferred: Locale = DEFAULT_LOCALE): string {
  if (!text) return ""
  if (text[preferred]) return text[preferred] as string
  for (const l of FALLBACK_ORDER) {
    if (text[l]) return text[l] as string
  }
  return ""
}

export function setLocale(text: I18nText | null | undefined, locale: Locale, value: string): I18nText {
  return { ...(text ?? {}), [locale]: value }
}

export function mergeI18n(a: I18nText | null | undefined, b: I18nText | null | undefined): I18nText {
  return { ...(a ?? {}), ...(b ?? {}) }
}
