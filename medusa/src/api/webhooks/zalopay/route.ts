import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { PAYMENT_ABSTRACT_MODULE } from "../../../modules/payment-abstract"
import type PaymentAbstractService from "../../../modules/payment-abstract/service"
import { adminContext } from "../../../lib/tenant/context"
import crypto from "crypto"

const ZP_KEY2 = process.env.ZALOPAY_KEY2 ?? ""

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = req.body as any
  const mac = crypto.createHmac("sha256", ZP_KEY2).update(body.data).digest("hex")
  if (mac !== body.mac) return res.status(400).json({ return_code: -1, return_message: "invalid_mac" })

  const data = JSON.parse(body.data)
  const tenantId = process.env.DEFAULT_TENANT_ID
  if (!tenantId) return res.status(400).json({ return_code: -1, return_message: "missing_tenant" })
  const status = "captured"
  const svc = req.scope.resolve<PaymentAbstractService>(PAYMENT_ABSTRACT_MODULE)
  await svc.updateStatusFromWebhook(adminContext(tenantId), "zalopay", data.app_trans_id, status as any, data)
  return res.status(200).json({ return_code: 1, return_message: "success" })
}
