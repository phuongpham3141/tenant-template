export type Locale = "vi" | "en" | "cn"

export interface TenantConfig {
  tenantId: string
  slug: string
  defaultLocale: Locale
  supportedLocales: Locale[]
  defaultCurrency: string
  supportedCurrencies: string[]
}

export const DEFAULT_TENANT: TenantConfig = {
  tenantId: process.env.NEXT_PUBLIC_TENANT_ID ?? "11111111-2222-3333-4444-555555555555",
  slug: process.env.NEXT_PUBLIC_TENANT_SLUG ?? "csr",
  defaultLocale: (process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? "vi") as Locale,
  supportedLocales: ["vi", "en", "cn"],
  defaultCurrency: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY ?? "VND",
  supportedCurrencies: ["VND", "USD", "CNY", "EUR"],
}

export function resolveTenantFromHost(host: string): TenantConfig {
  return DEFAULT_TENANT
}
