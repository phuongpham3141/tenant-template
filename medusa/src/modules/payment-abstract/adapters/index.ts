import type { PaymentAdapter, Processor } from "../types"
import { stripeAdapter } from "./stripe"
import { vnpayAdapter } from "./vnpay"
import { momoAdapter } from "./momo"
import { zalopayAdapter } from "./zalopay"
import { alipayAdapter } from "./alipay"
import { internalEscrowAdapter } from "./internalEscrow"

export const adapters: Partial<Record<Processor, PaymentAdapter>> = {
  stripe: stripeAdapter,
  vnpay: vnpayAdapter,
  momo: momoAdapter,
  zalopay: zalopayAdapter,
  alipay: alipayAdapter,
  internal_escrow: internalEscrowAdapter,
}
