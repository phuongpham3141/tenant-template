/**
 * RFQ module types — map sang schema rfq.* thật.
 * Sprint 9B Pha 1d-a v2 rewrite (D19 + D20 root cause fix).
 * Reference: P9B-PHA1D-ESCALATE-D20.md + P9B-PHA1D-A-ESCALATE-D20A-EXPANDED.md
 *
 * Pha 1d-a v2: CRUD types only (Rfq + helpers + RfqQuote/RfqInvitedSupplier types exported).
 * Pha 1d-b: Quote workflow service methods + cascade workflows/jobs/subs adapt.
 *
 * Tenant canonical: 'csr' (Sprint 1 R20 design).
 */

import type { TenantContext } from "../../lib/db/pg"

// ===== Enum types =====

// Schema enum values từ rfq.rfq CHECK constraints (verified Pha 1d-a v2 Bước 5):
export type RfqStatus =
  | "draft"
  | "published"
  | "quoting"
  | "awarded"
  | "converted"
  | "closed"
  | "expired"
  | "cancelled"

export type RfqUrgency = "normal" | "fast" | "urgent" | "immediate"

export type RfqVisibility = "public" | "targeted" | "invitation_only" | "private"

// Schema enum values từ rfq.rfq_quote CHECK constraints:
export type QuoteStatus =
  | "submitted"
  | "accepted"
  | "rejected"
  | "withdrawn"
  | "expired"
  | "superseded"

// Schema enum values (8 incoterms):
export type ShippingTerms =
  | "fob"
  | "cif"
  | "ddp"
  | "exw"
  | "dap"
  | "dpu"
  | "cpt"
  | "cip"

// ===== Core Rfq interface (rfq.rfq — 31 columns) =====

export interface Rfq {
  // Identity
  id: string
  tenant_id: string
  code: string
  buyer_id: string

  // Content (i18n shape)
  title_i18n: Record<string, string>
  description_i18n: Record<string, string>

  // Optional category link
  category_id?: string

  // Quantity + unit
  target_quantity: number
  unit_code: string

  // Logistics
  desired_port?: string

  // Budget (USD implicit, optional range)
  budget_min_usd_minor?: bigint
  budget_max_usd_minor?: bigint

  // Visibility + targeting
  visibility: RfqVisibility
  target_supplier_country_codes: string[]
  target_verification_tier_min?: number
  target_category_ids: string[]

  // Attachments
  attachment_urls: string[]

  // Required workflow fields
  urgency: RfqUrgency
  secured_trading_required: boolean

  // Workflow state
  status: RfqStatus
  awarded_quote_id?: string
  converted_order_id?: string
  published_at?: Date
  awarded_at?: Date
  closed_at?: Date

  // Required: expires_at (NOT NULL no default)
  expires_at: Date

  // Versioning + metadata + soft delete
  version: number
  metadata: Record<string, unknown>
  deleted_at?: Date

  // Timestamps
  created_at: Date
  updated_at: Date
}

// ===== Service input types =====

export interface CreateRfqInput {
  // Required
  buyer_id: string
  title_i18n: Record<string, string>
  description_i18n: Record<string, string>
  target_quantity: number
  unit_code: string
  expires_at: Date

  // Optional defaults
  visibility?: RfqVisibility
  urgency?: RfqUrgency
  secured_trading_required?: boolean

  // Optional
  category_id?: string
  desired_port?: string
  budget_min_usd_minor?: bigint
  budget_max_usd_minor?: bigint
  target_supplier_country_codes?: string[]
  target_verification_tier_min?: number
  target_category_ids?: string[]
  attachment_urls?: string[]
  metadata?: Record<string, unknown>
}

export interface ListRfqsFilters {
  buyer_id?: string
  status?: RfqStatus | RfqStatus[]
  category_id?: string
  include_deleted?: boolean
}

export interface ListRfqsOpts {
  limit?: number
  offset?: number
  order_by?: "created_at" | "updated_at" | "code" | "expires_at"
  order_dir?: "ASC" | "DESC"
}

// ===== Quote interface (Pha 1d-b sẽ implement service methods) =====

export interface RfqQuote {
  id: string
  tenant_id: string
  rfq_id: string
  supplier_id: string
  unit_price_minor: bigint
  currency: string
  unit_price_usd_minor: bigint
  total_price_usd_minor: bigint
  fx_snapshot_id?: string
  lead_time_days: number
  validity_days: number
  shipping_terms: ShippingTerms
  payment_terms_i18n?: Record<string, string>
  moq: number
  notes_i18n?: Record<string, string>
  linked_product_id?: string
  attachment_urls?: string[]
  status: QuoteStatus
  submitted_at: Date
  expires_at: Date
  accepted_at?: Date
  rejected_at?: Date
  rejection_reason?: string
  version: number
  metadata: Record<string, unknown>
  created_at: Date
  updated_at: Date
}

export interface SubmitQuoteInput {
  rfq_id: string
  supplier_id: string
  unit_price_minor: bigint
  currency: string
  unit_price_usd_minor: bigint
  lead_time_days: number
  validity_days: number
  shipping_terms: ShippingTerms
  moq: number
  payment_terms_i18n?: Record<string, string>
  notes_i18n?: Record<string, string>
  linked_product_id?: string
  attachment_urls?: string[]
}

// ===== Invited supplier (rfq.rfq_invited_supplier — 11 columns) =====

export interface RfqInvitedSupplier {
  id: string
  tenant_id: string
  rfq_id: string
  supplier_id: string
  invitation_source: string
  ai_match_score?: number
  viewed_at?: Date
  declined_at?: Date
  decline_reason?: string
  invited_at: Date
  metadata: Record<string, unknown>
}

// ===== Re-export TenantContext =====
export type { TenantContext }
