import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { PAYMENT_ABSTRACT_MODULE } from "../../../modules/payment-abstract"
import type PaymentAbstractService from "../../../modules/payment-abstract/service"
import { adminContext } from "../../../lib/tenant/context"
import crypto from "crypto"

const VNPAY_HASH_SECRET = process.env.VNPAY_HASH_SECRET ?? ""

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const params = req.query as Record<string, string>
  const secureHash = params.vnp_SecureHash
  delete params.vnp_SecureHash
  delete params.vnp_SecureHashType
  const sorted = Object.keys(params).sort().reduce<Record<string, string>>((acc, k) => { acc[k] = params[k]; return acc }, {})
  const qs = new URLSearchParams(sorted).toString()
  const expected = crypto.createHmac("sha512", VNPAY_HASH_SECRET).update(qs).digest("hex")
  if (expected !== secureHash) return res.status(400).json({ RspCode: "97", Message: "invalid_signature" })

  const tenantId = params.tenant_id ?? process.env.DEFAULT_TENANT_ID
  if (!tenantId) return res.status(400).json({ RspCode: "01", Message: "missing_tenant" })
  const svc = req.scope.resolve<PaymentAbstractService>(PAYMENT_ABSTRACT_MODULE)
  const status = params.vnp_ResponseCode === "00" ? "captured" : "failed"
  await svc.updateStatusFromWebhook(adminContext(tenantId), "vnpay", params.vnp_TxnRef, status as any, params)
  return res.status(200).json({ RspCode: "00", Message: "success" })
}
