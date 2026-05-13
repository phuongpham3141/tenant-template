import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError, ConflictError } from "../../lib/errors"
import type { Dispute, DisputeStatus, DisputeTier, AmlFlag } from "./types"

const SLA_HOURS: Record<DisputeTier, number> = {
  T1_buyer_supplier: 72,
  T2_platform_mediator: 168,
  T3_arbitration: 720,
  T4_external_court: 0,
}

class DisputeService extends MedusaService({}) {
  async open(ctx: TenantContext, input: Omit<Dispute, "id" | "tenantId" | "tier" | "status" | "createdAt" | "evidenceItemIds"> & { evidenceItemIds?: string[] }): Promise<Dispute> {
    const tier: DisputeTier = "T1_buyer_supplier"
    const slaDueAt = new Date(Date.now() + SLA_HOURS[tier] * 3600_000)
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO dispute.dispute (
         id, tenant_id, order_id, initiator_user_id, respondent_party_id, type, tier, status,
         description, claim_amount_minor, currency, evidence_item_ids, sla_due_at, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, 'open', $7, $8, $9, $10::uuid[], $11, NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.orderId, input.initiatorId, input.respondentId, input.type, tier,
        input.description, input.claimAmountMinor ? String(input.claimAmountMinor) : null,
        input.currency ?? null, input.evidenceItemIds ?? [], slaDueAt,
      ]
    )
    const d = mapDispute(rows[0])
    await emitAudit(ctx, { actionCode: "dispute.open", resourceType: "dispute.dispute", resourceId: d.id, after: d, severity: "high" })
    return d
  }

  async escalate(ctx: TenantContext, disputeId: string): Promise<Dispute> {
    const cur = await this.get(ctx, disputeId)
    const order: DisputeTier[] = ["T1_buyer_supplier", "T2_platform_mediator", "T3_arbitration", "T4_external_court"]
    const next = order[order.indexOf(cur.tier) + 1]
    if (!next) throw new ConflictError("Already at highest tier")
    const slaDueAt = SLA_HOURS[next] ? new Date(Date.now() + SLA_HOURS[next] * 3600_000) : null
    const rows = await queryT<any>(
      ctx,
      `UPDATE dispute.dispute SET tier = $1, status = 'evidence_collection', sla_due_at = $2, updated_at = NOW()
       WHERE id = $3 AND tenant_id = $4 RETURNING *`,
      [next, slaDueAt, disputeId, ctx.tenantId]
    )
    await emitAudit(ctx, { actionCode: `dispute.escalate.${next}`, resourceType: "dispute.dispute", resourceId: disputeId, severity: "high" })
    return mapDispute(rows[0])
  }

  async resolve(ctx: TenantContext, disputeId: string, outcome: Dispute["outcome"], awardMinor?: bigint, currency?: string): Promise<Dispute> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE dispute.dispute SET status = 'resolved', outcome = $1, resolved_at = NOW(), updated_at = NOW(),
       metadata = COALESCE(metadata, '{}'::jsonb) || jsonb_build_object('award_minor', $2::text, 'award_currency', $3)
       WHERE id = $4 AND tenant_id = $5 RETURNING *`,
      [outcome, awardMinor ? String(awardMinor) : null, currency ?? null, disputeId, ctx.tenantId]
    )
    if (!rows[0]) throw new NotFoundError("Dispute", disputeId)
    await emitAudit(ctx, { actionCode: "dispute.resolve", resourceType: "dispute.dispute", resourceId: disputeId, after: { outcome, awardMinor: String(awardMinor ?? "0") }, severity: "high" })
    return mapDispute(rows[0])
  }

  async get(ctx: TenantContext, id: string): Promise<Dispute> {
    const rows = await queryT<any>(ctx, `SELECT * FROM dispute.dispute WHERE id = $1`, [id])
    if (!rows[0]) throw new NotFoundError("Dispute", id)
    return mapDispute(rows[0])
  }

  async raiseAmlFlag(ctx: TenantContext, input: Omit<AmlFlag, "id" | "tenantId" | "createdAt">): Promise<AmlFlag> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO dispute.aml_flag (id, tenant_id, entity_type, entity_id, flag_type, severity, details, raised_by, created_at, updated_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4, $5, $6::jsonb, $7, NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, input.entityType, input.entityId, input.flagType, input.severity, JSON.stringify(input.details), input.raisedBy]
    )
    await emitAudit(ctx, { actionCode: "aml.flag", resourceType: "dispute.aml_flag", resourceId: rows[0].id, after: rows[0], severity: input.severity === "critical" ? "critical" : "high" })
    return mapAml(rows[0])
  }
}

function mapDispute(r: any): Dispute {
  return {
    id: r.id, tenantId: r.tenant_id, orderId: r.order_id,
    initiatorId: r.initiator_user_id, respondentId: r.respondent_party_id,
    type: r.type, tier: r.tier, status: r.status, description: r.description,
    claimAmountMinor: r.claim_amount_minor ? BigInt(r.claim_amount_minor) : undefined,
    currency: r.currency, evidenceItemIds: r.evidence_item_ids ?? [],
    mediatorUserId: r.mediator_user_id, arbitratorUserId: r.arbitrator_user_id,
    slaDueAt: r.sla_due_at, resolvedAt: r.resolved_at, outcome: r.outcome, createdAt: r.created_at,
  }
}
function mapAml(r: any): AmlFlag {
  return {
    id: r.id, tenantId: r.tenant_id, entityType: r.entity_type, entityId: r.entity_id,
    flagType: r.flag_type, severity: r.severity, details: r.details ?? {},
    raisedBy: r.raised_by, reviewedBy: r.reviewed_by_user_id, resolution: r.resolution, createdAt: r.created_at,
  }
}

export default DisputeService
