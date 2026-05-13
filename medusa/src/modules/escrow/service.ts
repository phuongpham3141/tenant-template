import { MedusaService } from "@medusajs/framework/utils"
import { queryT, withTenant, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError, ConflictError, ValidationError } from "../../lib/errors"
import type { Escrow, EscrowMilestone, CreateEscrowInput, Payout, FxSnapshot } from "./types"

class EscrowService extends MedusaService({}) {
  async createEscrow(ctx: TenantContext, input: CreateEscrowInput): Promise<Escrow> {
    const sumMilestones = input.milestones.reduce((acc, m) => acc + m.amountMinor, 0n)
    if (sumMilestones !== input.totalAmountMinor) {
      throw new ValidationError("Milestone amounts must sum to totalAmountMinor")
    }
    const result = await withTenant(ctx, async (client) => {
      const { rows } = await client.query(
        `INSERT INTO payment.escrow (
           id, tenant_id, order_id, buyer_user_id, supplier_id,
           total_amount_minor, currency, total_usd_minor, fx_snapshot_id,
           status, expires_at, created_at, updated_at
         ) VALUES (
           public.uuidv7(), $1, $2, $3, $4,
           $5, $6, $7, $8,
           'draft', $9, NOW(), NOW()
         ) RETURNING *`,
        [
          ctx.tenantId, input.orderId, input.buyerId, input.supplierId,
          String(input.totalAmountMinor), input.currency, String(input.totalUsdMinor), input.fxSnapshotId,
          input.expiresAt ?? null,
        ]
      )
      const escrow = rows[0]
      for (let i = 0; i < input.milestones.length; i++) {
        const m = input.milestones[i]
        await client.query(
          `INSERT INTO payment.escrow_milestone (
             id, tenant_id, escrow_id, sequence, milestone_type, amount_minor, currency, status, due_date, release_conditions, created_at, updated_at
           ) VALUES (
             public.uuidv7(), $1, $2, $3, $4, $5, $6, 'pending', $7, $8::jsonb, NOW(), NOW()
           )`,
          [
            ctx.tenantId, escrow.id, i + 1, m.milestoneType,
            String(m.amountMinor), input.currency,
            m.dueDate ?? null, JSON.stringify(m.releaseConditions ?? {}),
          ]
        )
      }
      return escrow
    })
    const escrow = mapEscrow(result)
    await emitAudit(ctx, {
      actionCode: "escrow.create",
      resourceType: "payment.escrow",
      resourceId: escrow.id,
      after: escrow,
      severity: "high",
    })
    return escrow
  }

  async fundEscrow(ctx: TenantContext, escrowId: string, paymentTransactionId: string): Promise<Escrow> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE payment.escrow
       SET status = 'funded', funded_at = NOW(), updated_at = NOW(),
           metadata = metadata || jsonb_build_object('funding_tx', $1)
       WHERE id = $2 AND tenant_id = $3 AND status = 'draft' RETURNING *`,
      [paymentTransactionId, escrowId, ctx.tenantId]
    )
    if (!rows[0]) throw new ConflictError("Escrow not in draft state")
    await emitAudit(ctx, {
      actionCode: "escrow.fund",
      resourceType: "payment.escrow",
      resourceId: escrowId,
      after: { paymentTransactionId },
      severity: "high",
    })
    return mapEscrow(rows[0])
  }

  async listMilestones(ctx: TenantContext, escrowId: string): Promise<EscrowMilestone[]> {
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM payment.escrow_milestone WHERE escrow_id = $1 ORDER BY sequence ASC`,
      [escrowId]
    )
    return rows.map(mapMilestone)
  }

  async markMilestoneReady(ctx: TenantContext, milestoneId: string, evidence: Record<string, unknown>): Promise<EscrowMilestone> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE payment.escrow_milestone
       SET status = 'ready_to_release', updated_at = NOW(),
           release_conditions = release_conditions || jsonb_build_object('evidence', $1::jsonb)
       WHERE id = $2 AND tenant_id = $3 AND status = 'pending' RETURNING *`,
      [JSON.stringify(evidence), milestoneId, ctx.tenantId]
    )
    if (!rows[0]) throw new ConflictError("Milestone not in pending state")
    return mapMilestone(rows[0])
  }

  async releaseMilestone(ctx: TenantContext, milestoneId: string): Promise<EscrowMilestone> {
    const result = await withTenant(ctx, async (client) => {
      const { rows } = await client.query(
        `UPDATE payment.escrow_milestone
         SET status = 'released', released_at = NOW(), released_by_user_id = $1, updated_at = NOW()
         WHERE id = $2 AND tenant_id = $3 AND status IN ('pending', 'ready_to_release') RETURNING *`,
        [ctx.userId, milestoneId, ctx.tenantId]
      )
      if (!rows[0]) throw new ConflictError("Milestone not releasable")
      const m = rows[0]
      const { rows: [escrow] } = await client.query(
        `UPDATE payment.escrow
         SET released_amount_minor = COALESCE(released_amount_minor,0) + $1, updated_at = NOW()
         WHERE id = $2 RETURNING *, (released_amount_minor >= total_amount_minor) AS fully_released`,
        [m.amount_minor, m.escrow_id]
      )
      if (escrow.fully_released) {
        await client.query(
          `UPDATE payment.escrow SET status = 'released', fully_released_at = NOW() WHERE id = $1`,
          [m.escrow_id]
        )
      } else {
        await client.query(
          `UPDATE payment.escrow SET status = 'partially_released' WHERE id = $1 AND status = 'funded'`,
          [m.escrow_id]
        )
      }
      return m
    })
    await emitAudit(ctx, {
      actionCode: "escrow.milestone.release",
      resourceType: "payment.escrow_milestone",
      resourceId: milestoneId,
      severity: "high",
    })
    return mapMilestone(result)
  }

  async refundEscrow(ctx: TenantContext, escrowId: string, amountMinor: bigint, reason: string): Promise<Escrow> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE payment.escrow
       SET refunded_amount_minor = COALESCE(refunded_amount_minor,0) + $1,
           status = CASE WHEN COALESCE(refunded_amount_minor,0) + $1 >= total_amount_minor THEN 'refunded' ELSE status END,
           metadata = metadata || jsonb_build_object('last_refund_reason', $2),
           updated_at = NOW()
       WHERE id = $3 AND tenant_id = $4 RETURNING *`,
      [String(amountMinor), reason, escrowId, ctx.tenantId]
    )
    if (!rows[0]) throw new NotFoundError("Escrow", escrowId)
    await emitAudit(ctx, {
      actionCode: "escrow.refund",
      resourceType: "payment.escrow",
      resourceId: escrowId,
      after: { amount: String(amountMinor), reason },
      severity: "high",
    })
    return mapEscrow(rows[0])
  }

  async captureFxSnapshot(ctx: TenantContext, fromCurrency: string, toCurrency: string, rate: number, source = "internal"): Promise<FxSnapshot> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO payment.fx_snapshot (id, tenant_id, from_currency, to_currency, rate, source, captured_at, created_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, fromCurrency, toCurrency, rate, source]
    )
    return {
      id: rows[0].id,
      tenantId: rows[0].tenant_id,
      fromCurrency: rows[0].from_currency,
      toCurrency: rows[0].to_currency,
      rate: Number(rows[0].rate),
      source: rows[0].source,
      capturedAt: rows[0].captured_at,
    }
  }

  async schedulePayout(ctx: TenantContext, input: { supplierId: string; amountMinor: bigint; currency: string; bankAccountId: string; escrowId?: string; scheduledAt?: Date }): Promise<Payout> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO payment.payout (id, tenant_id, supplier_id, escrow_id, amount_minor, currency, bank_account_id, status, scheduled_at, created_at, updated_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4, $5, $6, 'pending', $7, NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, input.supplierId, input.escrowId ?? null, String(input.amountMinor), input.currency, input.bankAccountId, input.scheduledAt ?? null]
    )
    return mapPayout(rows[0])
  }
}

function mapEscrow(r: any): Escrow {
  return {
    id: r.id, tenantId: r.tenant_id, orderId: r.order_id, buyerId: r.buyer_user_id, supplierId: r.supplier_id,
    totalAmountMinor: BigInt(r.total_amount_minor), currency: r.currency,
    totalUsdMinor: BigInt(r.total_usd_minor), fxSnapshotId: r.fx_snapshot_id,
    releasedAmountMinor: BigInt(r.released_amount_minor ?? 0), refundedAmountMinor: BigInt(r.refunded_amount_minor ?? 0),
    status: r.status, fundedAt: r.funded_at, fullyReleasedAt: r.fully_released_at,
    expiresAt: r.expires_at, metadata: r.metadata ?? {}, createdAt: r.created_at,
  }
}
function mapMilestone(r: any): EscrowMilestone {
  return {
    id: r.id, escrowId: r.escrow_id, tenantId: r.tenant_id,
    milestoneType: r.milestone_type, amountMinor: BigInt(r.amount_minor), currency: r.currency,
    status: r.status, dueDate: r.due_date, releaseConditions: r.release_conditions ?? {},
    releasedAt: r.released_at, releasedBy: r.released_by_user_id, notes: r.notes,
  }
}
function mapPayout(r: any): Payout {
  return {
    id: r.id, tenantId: r.tenant_id, supplierId: r.supplier_id, escrowId: r.escrow_id,
    amountMinor: BigInt(r.amount_minor), currency: r.currency, bankAccountId: r.bank_account_id,
    status: r.status, scheduledAt: r.scheduled_at, processedAt: r.processed_at, failureReason: r.failure_reason,
  }
}

export default EscrowService
