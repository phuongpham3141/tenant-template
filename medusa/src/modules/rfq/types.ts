import type { I18nText } from "../../lib/i18n"

export type RfqStatus = "draft" | "open" | "quoting" | "negotiating" | "awarded" | "cancelled" | "expired"
export type RfqQuoteStatus = "pending" | "submitted" | "accepted" | "rejected" | "withdrawn" | "counter_offered"

export interface Rfq {
  id: string
  tenantId: string
  customerId: string
  rfqNumber: string
  titleI18n: I18nText
  descriptionI18n: I18nText
  categoryId?: string
  productCategoryHint?: string
  targetQuantity: number
  targetUnitCode: string
  destinationCountry: string
  destinationCity?: string
  desiredDeliveryDate?: Date
  budgetMinor?: bigint
  budgetCurrency?: string
  paymentTermsPreference?: string
  shippingTermsPreference?: string
  inviteMode: "open" | "invited_only" | "hybrid"
  status: RfqStatus
  expiresAt: Date
  attachments?: string[]
  metadata?: Record<string, unknown>
  createdAt: Date
}

export interface InvitedSupplier {
  rfqId: string
  supplierId: string
  invitedAt: Date
  respondedAt?: Date | null
  declineReason?: string | null
}

export interface RfqQuote {
  id: string
  tenantId: string
  rfqId: string
  supplierId: string
  status: RfqQuoteStatus
  quoteNumber: string
  pricePerUnitMinor: bigint
  currency: string
  totalPriceMinor: bigint
  paymentTerms: string
  shippingTerms: string
  leadTimeDays: number
  validUntil: Date
  notes?: string
  attachments?: string[]
  counterOfferOf?: string | null
  acceptedAt?: Date | null
  rejectedAt?: Date | null
  createdAt: Date
}

export interface CreateRfqInput {
  customerId: string
  title: I18nText
  description: I18nText
  categoryId?: string
  targetQuantity: number
  targetUnitCode: string
  destinationCountry: string
  desiredDeliveryDate?: Date
  budgetMinor?: bigint
  budgetCurrency?: string
  inviteMode?: "open" | "invited_only" | "hybrid"
  invitedSupplierIds?: string[]
  expiresAt?: Date
  attachments?: string[]
}

export interface SubmitQuoteInput {
  rfqId: string
  supplierId: string
  pricePerUnitMinor: bigint
  currency: string
  paymentTerms: string
  shippingTerms: string
  leadTimeDays: number
  validUntil: Date
  notes?: string
  attachments?: string[]
}
