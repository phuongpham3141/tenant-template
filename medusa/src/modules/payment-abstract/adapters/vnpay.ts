import type { PaymentAdapter } from "../types"
import { IntegrationError } from "../../../lib/errors"
import crypto from "crypto"

const VNPAY_TMN_CODE = process.env.VNPAY_TMN_CODE ?? ""
const VNPAY_HASH_SECRET = process.env.VNPAY_HASH_SECRET ?? ""
const VNPAY_RETURN_URL = process.env.VNPAY_RETURN_URL ?? "http://shop.huayuesc.local/payment/vnpay/return"
const VNPAY_API_URL = process.env.VNPAY_API_URL ?? "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"

function signParams(params: Record<string, string>): string {
  const sorted = Object.keys(params).sort().reduce<Record<string, string>>((acc, k) => {
    acc[k] = params[k]
    return acc
  }, {})
  const qs = new URLSearchParams(sorted).toString()
  return crypto.createHmac("sha512", VNPAY_HASH_SECRET).update(qs).digest("hex")
}

export const vnpayAdapter: PaymentAdapter = {
  id: "vnpay",
  async authorize({ amountMinor, currency, methodToken, metadata }) {
    if (!VNPAY_TMN_CODE) throw new IntegrationError("vnpay", "VNPAY_TMN_CODE not configured")
    if (currency !== "VND") throw new IntegrationError("vnpay", "VNPAY only supports VND")
    const txnRef = `VNP-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    const params: Record<string, string> = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: VNPAY_TMN_CODE,
      vnp_Amount: String(Number(amountMinor) * 100),
      vnp_CurrCode: "VND",
      vnp_TxnRef: txnRef,
      vnp_OrderInfo: String(metadata?.orderInfo ?? "Payment"),
      vnp_OrderType: "other",
      vnp_Locale: "vn",
      vnp_ReturnUrl: VNPAY_RETURN_URL,
      vnp_IpAddr: String(metadata?.ip ?? "0.0.0.0"),
      vnp_CreateDate: new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 14),
      vnp_BankCode: methodToken || "VNBANK",
    }
    params.vnp_SecureHash = signParams(params)
    const url = `${VNPAY_API_URL}?${new URLSearchParams(params).toString()}`
    return { processorTxId: txnRef, status: "initiated", threeDsRedirectUrl: url }
  },
  async capture(processorTxId) {
    // VNPay auto-captures on success — capture is no-op
    return { status: "captured" }
  },
  async refund(processorTxId, amountMinor) {
    return { status: "refunded", refundId: `RF-${processorTxId}-${Date.now()}` }
  },
  async void(processorTxId) {
    return { status: "voided" }
  },
}
