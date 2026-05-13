export type RmaStatus = "requested" | "approved" | "rejected" | "shipped_by_buyer" | "received" | "inspecting" | "refunded" | "exchanged" | "closed"
export type RmaReason = "defective" | "wrong_item" | "not_as_described" | "damaged" | "missing_parts" | "no_longer_needed" | "size_fit" | "quality" | "other"

export interface RmaRequest {
  id: string
  tenantId: string
  orderId: string
  orderItemIds: string[]
  buyerId: string
  reason: RmaReason
  description: string
  desiredOutcome: "refund" | "exchange" | "store_credit"
  status: RmaStatus
  evidencePhotos: string[]
  totalRefundMinor?: bigint
  currency?: string
  carrierReturnLabelUrl?: string
  createdAt: Date
}

export interface RmaInspection {
  id: string
  rmaId: string
  inspectorUserId: string
  disposition: "restock" | "refurbish" | "destroy" | "return_to_supplier" | "donate"
  notes?: string
  photoUrls: string[]
  completedAt: Date
}
