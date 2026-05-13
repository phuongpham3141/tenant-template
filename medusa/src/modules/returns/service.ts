import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError, ConflictError } from "../../lib/errors"
import type { RmaRequest, RmaStatus, RmaInspection } from "./types"

class ReturnsService extends MedusaService({}) {
  async createRequest(ctx: TenantContext, input: Omit<RmaRequest, "id" | "tenantId" | "status" | "createdAt">): Promise<RmaRequest> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO ord.return_request (
         id, tenant_id, order_id, order_item_ids, buyer_user_id, reason, description, desired_outcome,
         status, evidence_photos, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3::uuid[], $4, $5, $6, $7,
         'requested', $8::text[], NOW(), NOW()
       ) RETURNING *`,
      [ctx.tenantId, input.orderId, input.orderItemIds, input.buyerId, input.reason, input.description, input.desiredOutcome, input.evidencePhotos ?? []]
    )
    const r = mapRma(rows[0])
    await emitAudit(ctx, { actionCode: "rma.create", resourceType: "ord.return_request", resourceId: r.id, after: r })
    return r
  }

  async transition(ctx: TenantContext, rmaId: string, to: RmaStatus, notes?: string): Promise<RmaRequest> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE ord.return_request SET status = $1, updated_at = NOW(),
       metadata = COALESCE(metadata, '{}'::jsonb) || jsonb_build_object('last_note', $2)
       WHERE id = $3 AND tenant_id = $4 RETURNING *`,
      [to, notes ?? null, rmaId, ctx.tenantId]
    )
    if (!rows[0]) throw new NotFoundError("RMA", rmaId)
    await emitAudit(ctx, { actionCode: `rma.transition.${to}`, resourceType: "ord.return_request", resourceId: rmaId })
    return mapRma(rows[0])
  }

  async recordInspection(ctx: TenantContext, input: Omit<RmaInspection, "id" | "completedAt">): Promise<RmaInspection> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO ord.return_inspection (id, tenant_id, rma_id, inspector_user_id, disposition, notes, photo_urls, completed_at, created_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4, $5, $6::text[], NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, input.rmaId, input.inspectorUserId, input.disposition, input.notes ?? null, input.photoUrls]
    )
    await this.transition(ctx, input.rmaId, input.disposition === "restock" || input.disposition === "refurbish" ? "refunded" : "closed")
    return { ...input, id: rows[0].id, completedAt: rows[0].completed_at }
  }

  async refund(ctx: TenantContext, rmaId: string, amountMinor: bigint, currency: string): Promise<RmaRequest> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE ord.return_request SET status = 'refunded', total_refund_minor = $1, currency = $2, updated_at = NOW()
       WHERE id = $3 AND tenant_id = $4 AND status IN ('received','inspecting') RETURNING *`,
      [String(amountMinor), currency, rmaId, ctx.tenantId]
    )
    if (!rows[0]) throw new ConflictError("RMA not refundable in current state")
    await emitAudit(ctx, { actionCode: "rma.refund", resourceType: "ord.return_request", resourceId: rmaId, after: { amount: String(amountMinor), currency }, severity: "high" })
    return mapRma(rows[0])
  }
}

function mapRma(r: any): RmaRequest {
  return {
    id: r.id, tenantId: r.tenant_id, orderId: r.order_id, orderItemIds: r.order_item_ids ?? [],
    buyerId: r.buyer_user_id, reason: r.reason, description: r.description, desiredOutcome: r.desired_outcome,
    status: r.status, evidencePhotos: r.evidence_photos ?? [],
    totalRefundMinor: r.total_refund_minor ? BigInt(r.total_refund_minor) : undefined,
    currency: r.currency, carrierReturnLabelUrl: r.carrier_return_label_url, createdAt: r.created_at,
  }
}

export default ReturnsService
