import type { PaymentAdapter } from "../types"
import { IntegrationError } from "../../../lib/errors"
import crypto from "crypto"

const ZP_APP_ID = process.env.ZALOPAY_APP_ID ?? ""
const ZP_KEY1 = process.env.ZALOPAY_KEY1 ?? ""
const ZP_API_URL = process.env.ZALOPAY_API_URL ?? "https://sb-openapi.zalopay.vn/v2/create"
const ZP_RETURN_URL = process.env.ZALOPAY_RETURN_URL ?? "http://shop.huayuesc.local/payment/zalopay/return"
const ZP_CALLBACK_URL = process.env.ZALOPAY_CALLBACK_URL ?? "http://api.huayuesc.local/webhooks/zalopay"

export const zalopayAdapter: PaymentAdapter = {
  id: "zalopay",
  async authorize({ amountMinor, currency, metadata }) {
    if (!ZP_APP_ID) throw new IntegrationError("zalopay", "ZALOPAY_APP_ID not configured")
    if (currency !== "VND") throw new IntegrationError("zalopay", "ZaloPay only supports VND")
    const appTransId = `${new Date().toISOString().slice(0, 10).replace(/-/g, "").slice(2)}_${Date.now()}`
    const appTime = Date.now()
    const appUser = String(metadata?.userId ?? "anonymous")
    const amount = Number(amountMinor)
    const description = String(metadata?.orderInfo ?? "Payment")
    const item = "[]"
    const embedData = JSON.stringify({ redirecturl: ZP_RETURN_URL })
    const data = `${ZP_APP_ID}|${appTransId}|${appUser}|${amount}|${appTime}|${embedData}|${item}`
    const mac = crypto.createHmac("sha256", ZP_KEY1).update(data).digest("hex")
    const res = await fetch(ZP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        app_id: ZP_APP_ID,
        app_trans_id: appTransId,
        app_user: appUser,
        app_time: String(appTime),
        amount: String(amount),
        description,
        item,
        embed_data: embedData,
        callback_url: ZP_CALLBACK_URL,
        mac,
      }).toString(),
    })
    const json = await res.json() as any
    if (json.return_code !== 1) throw new IntegrationError("zalopay", `${json.return_code}: ${json.return_message}`)
    return { processorTxId: appTransId, status: "initiated", threeDsRedirectUrl: json.order_url }
  },
  async capture() { return { status: "captured" } },
  async refund(processorTxId, amountMinor) {
    return { status: "refunded", refundId: `RF-${processorTxId}-${Date.now()}` }
  },
  async void() { return { status: "voided" } },
}
