import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { PAYMENT_ABSTRACT_MODULE } from "../../../modules/payment-abstract"
import type PaymentAbstractService from "../../../modules/payment-abstract/service"
import { adminContext } from "../../../lib/tenant/context"
import crypto from "crypto"

const MOMO_SECRET = process.env.MOMO_SECRET_KEY ?? ""
const MOMO_ACCESS_KEY = process.env.MOMO_ACCESS_KEY ?? ""

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = req.body as any
  const raw = `accessKey=${MOMO_ACCESS_KEY}&amount=${body.amount}&extraData=${body.extraData}&message=${body.message}&orderId=${body.orderId}&orderInfo=${body.orderInfo}&orderType=${body.orderType}&partnerCode=${body.partnerCode}&payType=${body.payType}&requestId=${body.requestId}&responseTime=${body.responseTime}&resultCode=${body.resultCode}&transId=${body.transId}`
  const expected = crypto.createHmac("sha256", MOMO_SECRET).update(raw).digest("hex")
  if (expected !== body.signature) return res.status(400).json({ error: "invalid_signature" })

  const tenantId = body.extraData ? Buffer.from(body.extraData, "base64").toString("utf-8") : process.env.DEFAULT_TENANT_ID
  if (!tenantId) return res.status(400).json({ error: "missing_tenant" })
  const status = Number(body.resultCode) === 0 ? "captured" : "failed"
  const svc = req.scope.resolve<PaymentAbstractService>(PAYMENT_ABSTRACT_MODULE)
  await svc.updateStatusFromWebhook(adminContext(tenantId), "momo", body.orderId, status as any, body)
  return res.status(204).end()
}
