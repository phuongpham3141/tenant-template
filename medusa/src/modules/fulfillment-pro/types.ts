export type ShipmentStatus = "draft" | "label_created" | "picked_up" | "in_transit" | "at_customs" | "out_for_delivery" | "delivered" | "exception" | "returned"
export type QcStatus = "pending" | "in_progress" | "passed" | "failed" | "waived"

export interface Warehouse {
  id: string
  tenantId: string
  code: string
  name: string
  type: "fba" | "supplier_owned" | "3pl" | "consolidation"
  addressLine1: string
  city: string
  country: string
  postalCode: string
  lat?: number
  lng?: number
  active: boolean
  metadata?: Record<string, unknown>
}

export interface InventorySnapshot {
  warehouseId: string
  skuId: string
  onHand: number
  reserved: number
  available: number
  inbound: number
  damaged: number
}

export interface Shipment {
  id: string
  tenantId: string
  orderId: string
  fromWarehouseId: string
  toAddress: {
    line1: string
    line2?: string
    city: string
    state?: string
    country: string
    postalCode: string
    phone?: string
    contactName?: string
  }
  carrier: string
  serviceLevel: string
  trackingNumber?: string | null
  weightKg: number
  dimensionsCm: { length: number; width: number; height: number }
  status: ShipmentStatus
  estimatedDeliveryAt?: Date | null
  actualDeliveryAt?: Date | null
  metadata?: Record<string, unknown>
}

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
