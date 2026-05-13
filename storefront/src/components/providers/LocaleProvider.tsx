"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import type { Locale } from "@/lib/tenant"

interface LocaleState {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (text: Partial<Record<Locale, string>> | string) => string
}

const LocaleContext = createContext<LocaleState | null>(null)

export function LocaleProvider({ initialLocale = "vi", children }: { initialLocale?: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`
  }, [])

  const t = useCallback((text: Partial<Record<Locale, string>> | string): string => {
    if (typeof text === "string") return text
    return text[locale] ?? text.en ?? text.vi ?? text.cn ?? ""
  }, [locale])

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleState {
  const c = useContext(LocaleContext)
  if (!c) throw new Error("LocaleProvider missing")
  return c
}
