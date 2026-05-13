import type { I18nText } from "../../lib/i18n"

export type ProductStatus = "draft" | "active" | "archived" | "suspended"

export interface ProductExtension {
  id: string
  tenantId: string
  supplierId: string
  masterProductId?: string | null
  sku: string
  titleI18n: I18nText
  descriptionI18n: I18nText
  status: ProductStatus
  basePriceMinor?: bigint
  baseCurrency?: string
  moqMin?: number
  moqMax?: number | null
  hsCode?: string
  brandId?: string
  gtin?: string
  categoryId?: string
  attributes?: Record<string, unknown>
  tags?: string[]
  metadata?: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export interface MasterProduct {
  id: string
  tenantId: string
  canonicalSku: string
  titleI18n: I18nText
  brandId?: string
  gtin?: string
  attributes?: Record<string, unknown>
  variantCount: number
  createdAt: Date
}

export interface BuyBoxCandidate {
  productId: string
  supplierId: string
  priceMinor: bigint
  currency: string
  score: number
  reasonCodes: string[]
}

export interface CustomizationOption {
  id: string
  productId: string
  optionType: "logo" | "color" | "size" | "material" | "engraving" | "packaging" | "branding" | "custom"
  label: I18nText
  required: boolean
  freeOfCharge: boolean
  upchargeMinor?: bigint
  values?: Array<{ value: string; labelI18n: I18nText; upchargeMinor?: bigint }>
}

export interface UnitMaster {
  code: string
  category: "weight" | "length" | "volume" | "area" | "count" | "time"
  labelI18n: I18nText
  conversionToBaseFactor: number
  baseCode: string
}
