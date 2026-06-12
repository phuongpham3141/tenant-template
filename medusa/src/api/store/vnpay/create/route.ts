import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createVnpayPaymentUrl } from "../../../../lib/vnpay"

/**
 * POST /store/vnpay/create — Tao URL thanh toan VNPay (P0-4 sandbox)
 * Body: { amount: number (VND), order_id: string, order_info?: string }
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = (req.body as any) ?? {}
  const amount = Number(body.amount)
  const orderId = String(body.order_id || "").trim()

  if (!amount || amount < 1000 || !orderId) {
    return res.status(400).json({ message: "Can amount (>=1000 VND) va order_id" })
  }

  try {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket?.remoteAddress || "127.0.0.1"
    const { url } = createVnpayPaymentUrl({
      amountVnd: amount,
      orderId,
      orderInfo: String(body.order_info || ("Thanh toan don " + orderId)),
      ipAddr: ip,
    })
    return res.json({ payment_url: url })
  } catch (err: any) {
    return res.status(500).json({ message: err?.message || "VNPay error" })
  }
}
