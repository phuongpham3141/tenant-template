/**
 * Fulfillment-pro module types (Sprint 11 Pha 2e Module 3 D-PARTIAL)
 *
 * DROPPED: ShipmentStatus, Warehouse, InventorySnapshot, Shipment (tables missing)
 * PRESERVED: QcStatus, CustomsDeclaration, QcInspection, InsurancePolicy
 */

export type QcStatus = "pending" | "in_progress" | "passed" | "failed" | "waived"

export interface CustomsDeclaration {
  id: string
  shipmentId: string
  originCountry: string
  destCountry: string
  hsCodes: string[]
  declaredValueUsdMinor: bigint
  contentDescription: string
  inco: "EXW" | "FCA" | "FOB" | "CFR" | "CIF" | "DAP" | "DDP"
  duties: Array<{ hsCode: string; rate: number; amountMinor: bigint; currency: string }>
  status: "draft" | "submitted" | "cleared" | "held" | "rejected"
}

export interface QcInspection {
  id: string
  shipmentId: string
  inspectorUserId: string
  status: QcStatus
  defectsFound: Array<{ code: string; severity: "minor" | "major" | "critical"; description: string }>
  photoUrls: string[]
  reportUrl?: string
  startedAt: Date
  completedAt?: Date
}

export interface InsurancePolicy {
  id: string
  shipmentId: string
  insurer: string
  policyNumber: string
  coverageUsdMinor: bigint
  premiumUsdMinor: bigint
  deductibleUsdMinor: bigint
  coverageType: "all_risk" | "named_perils" | "fpa"
  effectiveDate: Date
  expiryDate: Date
}
