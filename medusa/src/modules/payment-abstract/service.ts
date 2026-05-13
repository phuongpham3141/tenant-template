import { MedusaService } from "@medusajs/framework/utils"
import { queryT, withTenant, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError, ConflictError } from "../../lib/errors"
import type { PaymentTransaction, InitiatePaymentInput, ChargebackCase, PaymentAdapter, Processor, TxStatus } from "./types"
import { adapters } from "./adapters"

class PaymentAbstractService extends MedusaService({}) {
  private getAdapter(processor: Processor): PaymentAdapter {
    const a = adapters[processor]
    if (!a) throw new NotFoundError("PaymentAdapter", processor)
    return a
  }

  async initiate(ctx: TenantContext, input: InitiatePaymentInput): Promise<PaymentTransaction> {
    const adapter = this.getAdapter(input.processor)
    const res = await adapter.authorize({
      amountMinor: input.amountMinor,
      currency: input.currency,
      methodToken: input.methodToken,
      metadata: input.metadata,
    })
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO payment.payment_transaction (
         id, tenant_id, order_id, escrow_id, processor, processor_tx_id,
         amount_minor, currency, status, three_ds_completed, metadata, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5,
         $6, $7, $8, $9, $10::jsonb, NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.orderId ?? null, input.escrowId ?? null, input.processor, res.processorTxId,
        String(input.amountMinor), input.currency, res.status, false,
        JSON.stringify({ ...(input.metadata ?? {}), threeDsRedirectUrl: res.threeDsRedirectUrl }),
      ]
    )
    const tx = mapTx(rows[0])
    await emitAudit(ctx, {
      actionCode: "payment.initiate",
      resourceType: "payment.payment_transaction",
      resourceId: tx.id,
      after: { processor: input.processor, status: tx.status, amount: String(input.amountMinor), currency: input.currency },
    })
    return tx
  }

  async capture(ctx: TenantContext, txId: string, amountMinor?: bigint): Promise<PaymentTransaction> {
    const tx = await this.get(ctx, txId)
    if (tx.status !== "authorized") throw new ConflictError(`Cannot capture tx in status ${tx.status}`)
    const adapter = this.getAdapter(tx.processor)
    const res = await adapter.capture(tx.processorTxId!, amountMinor)
    const rows = await queryT<any>(
      ctx,
      `UPDATE payment.payment_transaction SET status = $1, updated_at = NOW() WHERE id = $2 AND tenant_id = $3 RETURNING *`,
      [res.status, txId, ctx.tenantId]
    )
    await emitAudit(ctx, { actionCode: "payment.capture", resourceType: "payment.payment_transaction", resourceId: txId, after: { status: res.status } })
    return mapTx(rows[0])
  }

  async refund(ctx: TenantContext, txId: string, amountMinor: bigint, reason?: string): Promise<PaymentTransaction> {
    const tx = await this.get(ctx, txId)
    if (!["captured", "settled"].includes(tx.status)) throw new ConflictError(`Cannot refund tx in status ${tx.status}`)
    const adapter = this.getAdapter(tx.processor)
    const res = await adapter.refund(tx.processorTxId!, amountMinor, reason)
    const rows = await queryT<any>(
      ctx,
      `UPDATE payment.payment_transaction SET status = $1, updated_at = NOW(), metadata = metadata || jsonb_build_object('refundId', $2) WHERE id = $3 RETURNING *`,
      [res.status, res.refundId, txId]
    )
    await emitAudit(ctx, { actionCode: "payment.refund", resourceType: "payment.payment_transaction", resourceId: txId, after: { refundId: res.refundId, amount: String(amountMinor) }, severity: "high" })
    return mapTx(rows[0])
  }

  async get(ctx: TenantContext, txId: string): Promise<PaymentTransaction> {
    const rows = await queryT<any>(ctx, `SELECT * FROM payment.payment_transaction WHERE id = $1`, [txId])
    if (!rows[0]) throw new NotFoundError("PaymentTransaction", txId)
    return mapTx(rows[0])
  }

  async updateStatusFromWebhook(ctx: TenantContext, processor: Processor, processorTxId: string, newStatus: TxStatus, payload: Record<string, unknown>): Promise<PaymentTransaction> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE payment.payment_transaction
       SET status = $1, updated_at = NOW(), metadata = metadata || $2::jsonb
       WHERE processor = $3 AND processor_tx_id = $4 RETURNING *`,
      [newStatus, JSON.stringify({ lastWebhook: payload }), processor, processorTxId]
    )
    if (!rows[0]) throw new NotFoundError("PaymentTransaction by processorTxId", processorTxId)
    await emitAudit(ctx, { actionCode: "payment.webhook", resourceType: "payment.payment_transaction", resourceId: rows[0].id, after: { processor, status: newStatus } })
    return mapTx(rows[0])
  }

  async openChargeback(ctx: TenantContext, input: { paymentTransactionId: string; reasonCode: string; amountMinor: bigint; currency: string; evidenceDueAt?: Date }): Promise<ChargebackCase> {
    const tx = await this.get(ctx, input.paymentTransactionId)
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO payment.chargeback_case (id, tenant_id, payment_transaction_id, processor, reason_code, amount_minor, currency, status, evidence_due_at, created_at, updated_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4, $5, $6, 'evidence_required', $7, NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, tx.id, tx.processor, input.reasonCode, String(input.amountMinor), input.currency, input.evidenceDueAt ?? null]
    )
    await queryT(ctx, `UPDATE payment.payment_transaction SET status = 'disputed' WHERE id = $1`, [tx.id])
    await emitAudit(ctx, { actionCode: "chargeback.open", resourceType: "payment.chargeback_case", resourceId: rows[0].id, after: rows[0], severity: "high" })
    return mapChargeback(rows[0])
  }
}

function mapTx(r: any): PaymentTransaction {
  return {
    id: r.id, tenantId: r.tenant_id, orderId: r.order_id, escrowId: r.escrow_id,
    processor: r.processor, processorTxId: r.processor_tx_id,
    amountMinor: BigInt(r.amount_minor), currency: r.currency, status: r.status,
    threeDsCompleted: r.three_ds_completed, failureCode: r.failure_code, failureMessage: r.failure_message,
    metadata: r.metadata ?? {}, createdAt: r.created_at, updatedAt: r.updated_at,
  }
}
function mapChargeback(r: any): ChargebackCase {
  return {
    id: r.id, tenantId: r.tenant_id, paymentTransactionId: r.payment_transaction_id, processor: r.processor,
    reasonCode: r.reason_code, amountMinor: BigInt(r.amount_minor), currency: r.currency,
    status: r.status, evidenceDueAt: r.evidence_due_at, resolvedAt: r.resolved_at, metadata: r.metadata ?? {},
  }
}

export default PaymentAbstractService
