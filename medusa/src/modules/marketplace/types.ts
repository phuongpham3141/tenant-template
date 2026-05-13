import type { I18nText } from "../../lib/i18n"

export type SupplierTier = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type SupplierStatus = "draft" | "pending" | "active" | "suspended" | "banned" | "archived"
export type OperationMode = "direct" | "intermediary"

export interface Supplier {
  id: string
  tenantId: string
  slug: string
  legalName: string
  displayNameI18n: I18nText
  countryCode: string
  status: SupplierStatus
  verificationTier: SupplierTier
  operationMode: OperationMode
  dealerCapabilities: {
    canSellWholesale: boolean
    canSellRetail: boolean
    canActAsAgent: boolean
  }
  yearEstablished?: number
  employeeCount?: number
  annualRevenueUsdMinor?: bigint
  exportRatioPct?: number
  primaryIndustryCode?: string
  certifications?: string[]
  tags?: string[]
  categoryIds?: string[]
  metadata?: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export interface CreateSupplierInput {
  slug: string
  legalName: string
  displayName: I18nText
  countryCode: string
  operationMode?: OperationMode
  dealerCapabilities?: Partial<Supplier["dealerCapabilities"]>
  yearEstablished?: number
  primaryIndustryCode?: string
  metadata?: Record<string, unknown>
}

export interface UpdateSupplierInput extends Partial<CreateSupplierInput> {
  status?: SupplierStatus
  verificationTier?: SupplierTier
}

export interface KycDocument {
  id: string
  tenantId: string
  supplierId: string
  documentType: string
  fileUrl: string
  status: "pending" | "approved" | "rejected" | "expired"
  reviewedBy?: string | null
  reviewedAt?: Date | null
  rejectionReason?: string | null
  expiresAt?: Date | null
  metadata?: Record<string, unknown>
}

export interface VerificationRecord {
  id: string
  tenantId: string
  supplierId: string
  fromTier: SupplierTier
  toTier: SupplierTier
  verifierId: string
  verifiedAt: Date
  evidenceDocumentIds: string[]
  notes?: string
}
