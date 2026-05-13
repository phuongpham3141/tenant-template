import type { PaymentAdapter } from "../types"

export const internalEscrowAdapter: PaymentAdapter = {
  id: "internal_escrow",
  async authorize({ amountMinor }) {
    const id = `IES-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    return { processorTxId: id, status: "authorized" }
  },
  async capture() { return { status: "captured" } },
  async refund(processorTxId, amountMinor) {
    return { status: "refunded", refundId: `IES-RF-${processorTxId}` }
  },
  async void() { return { status: "voided" } },
}
