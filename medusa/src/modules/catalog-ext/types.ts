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

export interface UnitMaster {
  code: string
  category: "weight" | "length" | "volume" | "area" | "count" | "time"
  labelI18n: I18nText
  conversionToBaseFactor: number
  baseCode: string
}

// ===========================================================================
// Sprint 10 Pha 2b v2 — D25 Option B refactor
// CustomizationRequest = B2B OEM custom order workflow
// Schema: catalog.customization_request (24 cols + 2 CHECK enums + 5 FK)
// ===========================================================================

// CHECK constraint enums (audited Pha 2b Bước 0)
export type CustomizationRequestType =
  | "logo"
  | "packaging"
  | "color"
  | "material"
  | "dimension"
  | "spec"
  | "full_oem"
  | "formula"

export type CustomizationRequestStatus =
  | "draft"
  | "submitted"
  | "in_revision"
  | "approved"
  | "rejected"
  | "converted_to_order"
  | "cancelled"
  | "expired"

export interface CustomizationRequest {
  // Identity
  id: string
  tenant_id: string
  code: string

  // Participants
  buyer_id: string
  supplier_id: string
  product_id?: string
  rfq_id?: string

  // Request details
  request_type: CustomizationRequestType
  description_i18n: Record<string, string>
  artwork_urls: string[]

  // Quantity + unit
  target_quantity: number
  unit_code: string

  // Budget (dual-currency optional)
  budget_min_usd_minor?: bigint
  budget_max_usd_minor?: bigint

  // Revision workflow
  revision_round: number
  max_revisions: number

  // Workflow state
  status: CustomizationRequestStatus
  approval_gate_at?: Date
  converted_order_id?: string
  expires_at?: Date

  // Audit
  version: number
  metadata: Record<string, unknown>
  created_at: Date
  updated_at: Date
}

export interface CreateCustomizationRequestInput {
  // Required
  buyer_id: string
  supplier_id: string
  request_type: CustomizationRequestType
  description_i18n: Record<string, string>
  target_quantity: number
  unit_code: string

  // Optional
  product_id?: string
  rfq_id?: string
  artwork_urls?: string[]
  budget_min_usd_minor?: bigint
  budget_max_usd_minor?: bigint
  max_revisions?: number
  expires_at?: Date
  metadata?: Record<string, unknown>
}

export interface ListCustomizationRequestsFilters {
  buyer_id?: string
  supplier_id?: string
  product_id?: string
  rfq_id?: string
  status?: CustomizationRequestStatus | CustomizationRequestStatus[]
  request_type?: CustomizationRequestType
}

export interface ListCustomizationRequestsOpts {
  limit?: number
  offset?: number
  order_by?: "created_at" | "updated_at" | "code" | "expires_at"
  order_dir?: "ASC" | "DESC"
}
