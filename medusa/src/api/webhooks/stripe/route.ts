import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { PAYMENT_ABSTRACT_MODULE } from "../../../modules/payment-abstract"
import type PaymentAbstractService from "../../../modules/payment-abstract/service"
import { adminContext } from "../../../lib/tenant/context"
import crypto from "crypto"

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? ""

function verifyStripeSignature(payload: string, sigHeader: string): boolean {
  if (!STRIPE_WEBHOOK_SECRET || !sigHeader) return false
  const items = Object.fromEntries(sigHeader.split(",").map((kv) => kv.split("=")))
  if (!items.t || !items.v1) return false
  const signedPayload = `${items.t}.${payload}`
  const expected = crypto.createHmac("sha256", STRIPE_WEBHOOK_SECRET).update(signedPayload).digest("hex")
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(items.v1))
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const rawBody = (req as any).rawBody ?? JSON.stringify(req.body)
  const sig = req.headers["stripe-signature"] as string
  if (!verifyStripeSignature(rawBody, sig)) {
    return res.status(400).json({ error: "invalid_signature" })
  }
  const evt = req.body as any
  const tenantId = evt.data?.object?.metadata?.tenant_id
  if (!tenantId) return res.status(400).json({ error: "missing_tenant_metadata" })

  const svc = req.scope.resolve<PaymentAbstractService>(PAYMENT_ABSTRACT_MODULE)
  const intent = evt.data.object
  let status: any = null
  if (evt.type === "payment_intent.succeeded") status = "captured"
  else if (evt.type === "payment_intent.payment_failed") status = "failed"
  else if (evt.type === "charge.refunded") status = "refunded"
  else if (evt.type === "charge.dispute.created") status = "disputed"

  if (status) {
    await svc.updateStatusFromWebhook(adminContext(tenantId), "stripe", intent.id, status, evt)
  }
  return res.status(200).json({ received: true })
}
