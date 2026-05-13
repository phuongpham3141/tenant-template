export type Processor = "stripe" | "vnpay" | "momo" | "zalopay" | "alipay" | "wechatpay" | "internal_escrow"
export type TxStatus = "initiated" | "authorized" | "captured" | "settled" | "failed" | "refunded" | "voided" | "disputed"

export interface PaymentTransaction {
  id: string
  tenantId: string
  orderId?: string | null
  escrowId?: string | null
  processor: Processor
  processorTxId?: string | null
  amountMinor: bigint
  currency: string
  status: TxStatus
  threeDsCompleted?: boolean
  failureCode?: string | null
  failureMessage?: string | null
  metadata?: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export interface ChargebackCase {
  id: string
  tenantId: string
  paymentTransactionId: string
  processor: Processor
  reasonCode: string
  amountMinor: bigint
  currency: string
  status: "pending" | "evidence_required" | "submitted" | "won" | "lost" | "expired"
  evidenceDueAt?: Date | null
  resolvedAt?: Date | null
  metadata?: Record<string, unknown>
}

export interface PaymentAdapter {
  id: Processor
  authorize(input: { amountMinor: bigint; currency: string; methodToken: string; metadata?: Record<string, unknown> }): Promise<{ processorTxId: string; status: TxStatus; threeDsRedirectUrl?: string }>
  capture(processorTxId: string, amountMinor?: bigint): Promise<{ status: TxStatus }>
  refund(processorTxId: string, amountMinor: bigint, reason?: string): Promise<{ status: TxStatus; refundId: string }>
  void(processorTxId: string): Promise<{ status: TxStatus }>
}

export interface InitiatePaymentInput {
  orderId?: string
  escrowId?: string
  processor: Processor
  amountMinor: bigint
  currency: string
  methodToken: string
  metadata?: Record<string, unknown>
}
