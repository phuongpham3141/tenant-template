import type { I18nText } from "../../lib/i18n"

export interface Tenant {
  id: string
  slug: string
  legalName: string
  displayNameI18n: I18nText
  defaultLocale: "vi" | "en" | "cn"
  defaultCurrency: string
  status: "active" | "trial" | "suspended" | "archived"
  planTier: "starter" | "growth" | "enterprise"
  contactEmail: string
  metadata?: Record<string, unknown>
  createdAt: Date
}

export interface TenantDomain {
  id: string
  tenantId: string
  domain: string
  domainPurpose: "shop" | "admin" | "cms" | "api" | "media" | "metrics"
  isPrimary: boolean
  sslIssuedAt?: Date | null
  sslExpiresAt?: Date | null
  metadata?: Record<string, unknown>
}

export interface TenantBranding {
  tenantId: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  logoUrl?: string
  faviconUrl?: string
  ogImageUrl?: string
  headingFont: string
  bodyFont: string
}

export interface SubscriptionPlan {
  id: string
  code: "starter" | "growth" | "enterprise"
  name: string
  monthlyUsdMinor: bigint
  features: Record<string, unknown>
}

export interface UsageMetering {
  tenantId: string
  bucket: Date
  metricKey: string
  quantity: number
  unit: string
}
