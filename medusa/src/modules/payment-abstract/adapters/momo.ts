import type { PaymentAdapter } from "../types"
import { IntegrationError } from "../../../lib/errors"
import crypto from "crypto"

const MOMO_PARTNER = process.env.MOMO_PARTNER_CODE ?? ""
const MOMO_ACCESS_KEY = process.env.MOMO_ACCESS_KEY ?? ""
const MOMO_SECRET_KEY = process.env.MOMO_SECRET_KEY ?? ""
const MOMO_API_URL = process.env.MOMO_API_URL ?? "https://test-payment.momo.vn/v2/gateway/api/create"
const MOMO_RETURN_URL = process.env.MOMO_RETURN_URL ?? "http://shop.huayuesc.local/payment/momo/return"
const MOMO_IPN_URL = process.env.MOMO_IPN_URL ?? "http://api.huayuesc.local/webhooks/momo"

export const momoAdapter: PaymentAdapter = {
  id: "momo",
  async authorize({ amountMinor, currency, methodToken, metadata }) {
    if (!MOMO_PARTNER) throw new IntegrationError("momo", "MOMO_PARTNER_CODE not configured")
    if (currency !== "VND") throw new IntegrationError("momo", "MoMo only supports VND")
    const requestId = `MM-${Date.now()}`
    const orderId = `${requestId}-${Math.random().toString(36).slice(2, 8)}`
    const amount = String(Number(amountMinor))
    const orderInfo = String(metadata?.orderInfo ?? "Payment")
    const extraData = ""
    const requestType = "captureWallet"
    const raw = `accessKey=${MOMO_ACCESS_KEY}&amount=${amount}&extraData=${extraData}&ipnUrl=${MOMO_IPN_URL}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${MOMO_PARTNER}&redirectUrl=${MOMO_RETURN_URL}&requestId=${requestId}&requestType=${requestType}`
    const signature = crypto.createHmac("sha256", MOMO_SECRET_KEY).update(raw).digest("hex")
    const res = await fetch(MOMO_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        partnerCode: MOMO_PARTNER,
        accessKey: MOMO_ACCESS_KEY,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl: MOMO_RETURN_URL,
        ipnUrl: MOMO_IPN_URL,
        extraData,
        requestType,
        signature,
        lang: "vi",
      }),
    })
    const data = await res.json() as any
    if (!data.payUrl) throw new IntegrationError("momo", `${data.resultCode}: ${data.message}`)
    return { processorTxId: orderId, status: "initiated", threeDsRedirectUrl: data.payUrl }
  },
  async capture() { return { status: "captured" } },
  async refund(processorTxId, amountMinor) {
    return { status: "refunded", refundId: `RF-${processorTxId}-${Date.now()}` }
  },
  async void() { return { status: "voided" } },
}
