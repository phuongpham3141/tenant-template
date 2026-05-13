export type EscrowStatus = "draft" | "funded" | "partially_released" | "released" | "refunded" | "disputed" | "cancelled"
export type MilestoneStatus = "pending" | "ready_to_release" | "released" | "disputed" | "cancelled"

export interface Escrow {
  id: string
  tenantId: string
  orderId: string
  buyerId: string
  supplierId: string
  totalAmountMinor: bigint
  currency: string
  totalUsdMinor: bigint
  fxSnapshotId: string
  releasedAmountMinor: bigint
  refundedAmountMinor: bigint
  status: EscrowStatus
  fundedAt?: Date | null
  fullyReleasedAt?: Date | null
  expiresAt?: Date | null
  metadata?: Record<string, unknown>
  createdAt: Date
}

export interface EscrowMilestone {
  id: string
  escrowId: string
  tenantId: string
  milestoneType: "deposit" | "production" | "shipment" | "delivery" | "qc_passed" | "final_payment"
  amountMinor: bigint
  currency: string
  status: MilestoneStatus
  dueDate?: Date | null
  releaseConditions: Record<string, unknown>
  releasedAt?: Date | null
  releasedBy?: string | null
  notes?: string
}

export interface CreateEscrowInput {
  orderId: string
  buyerId: string
  supplierId: string
  totalAmountMinor: bigint
  currency: string
  fxSnapshotId: string
  totalUsdMinor: bigint
  expiresAt?: Date
  milestones: Array<{
    milestoneType: EscrowMilestone["milestoneType"]
    amountMinor: bigint
    dueDate?: Date
    releaseConditions?: Record<string, unknown>
  }>
}

export interface FxSnapshot {
  id: string
  tenantId: string
  fromCurrency: string
  toCurrency: string
  rate: number
  source: string
  capturedAt: Date
}

export interface Payout {
  id: string
  tenantId: string
  supplierId: string
  escrowId?: string | null
  amountMinor: bigint
  currency: string
  bankAccountId: string
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  scheduledAt?: Date | null
  processedAt?: Date | null
  failureReason?: string | null
}
