import type { PaymentAdapter } from "../types"
import { IntegrationError } from "../../../lib/errors"

const ALIPAY_APP_ID = process.env.ALIPAY_APP_ID ?? ""
const ALIPAY_API_URL = process.env.ALIPAY_API_URL ?? "https://openapi.alipaydev.com/gateway.do"

export const alipayAdapter: PaymentAdapter = {
  id: "alipay",
  async authorize({ amountMinor, currency, metadata }) {
    if (!ALIPAY_APP_ID) throw new IntegrationError("alipay", "ALIPAY_APP_ID not configured")
    if (currency !== "CNY") throw new IntegrationError("alipay", "Alipay only supports CNY")
    const outTradeNo = `AL-${Date.now()}`
    const redirectUrl = `${ALIPAY_API_URL}?app_id=${ALIPAY_APP_ID}&out_trade_no=${outTradeNo}&total_amount=${Number(amountMinor) / 100}&subject=${encodeURIComponent(String(metadata?.orderInfo ?? "Payment"))}`
    return { processorTxId: outTradeNo, status: "initiated", threeDsRedirectUrl: redirectUrl }
  },
  async capture() { return { status: "captured" } },
  async refund(processorTxId, amountMinor) {
    return { status: "refunded", refundId: `RF-${processorTxId}-${Date.now()}` }
  },
  async void() { return { status: "voided" } },
}
