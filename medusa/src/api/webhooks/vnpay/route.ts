import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { verifyVnpaySignature } from "../../../lib/vnpay"
import { queryT } from "../../../lib/db/pg"
import { adminContext } from "../../../lib/tenant/context"

/**
 * GET /webhooks/vnpay — VNPay IPN (P0-4 Sprint 13)
 * VNPay goi server-to-server sau khi khach thanh toan.
 * Response RspCode bat buoc dung format de VNPay khong retry.
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { valid, data } = verifyVnpaySignature(req.query as Record<string, any>)

  if (!valid) {
    return res.json({ RspCode: "97", Message: "Invalid signature" })
  }

  const txnRef = data.vnp_TxnRef
  const responseCode = data.vnp_ResponseCode   // "00" = thanh cong
  const amount = Number(data.vnp_Amount || 0) / 100
  const tenantId = process.env.DEFAULT_TENANT_ID || "csr"

  // Ghi log giao dich vao payment.payment_transaction (bang EXISTS — verified Sprint 11)
  try {
    await queryT(
      adminContext(tenantId),
      "INSERT INTO payment.payment_transaction (id, tenant_id, order_id, processor, processor_tx_id, amount_minor, currency, status, three_ds_completed, metadata, created_at, updated_at) " +
      "VALUES (public.uuidv7(), $1, NULL, 'vnpay', $2, $3, 'VND', $4, false, $5::jsonb, NOW(), NOW())",
      [
        tenantId,
        String(data.vnp_TransactionNo || txnRef),
        String(Math.round(amount)),
        responseCode === "00" ? "captured" : "failed",
        JSON.stringify({ txn_ref: txnRef, response_code: responseCode, bank: data.vnp_BankCode, pay_date: data.vnp_PayDate }),
      ]
    )
  } catch (err: any) {
    console.error("[vnpay-ipn] log failed:", err?.message)
    // Van tra 00 de VNPay khong retry vo han — transaction da xu ly o Return URL flow
  }

  console.log("[vnpay-ipn] txnRef=" + txnRef + " code=" + responseCode + " amount=" + amount)
  return res.json({ RspCode: "00", Message: "Confirm Success" })
}
