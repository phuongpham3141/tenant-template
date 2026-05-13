import { MedusaService } from "@medusajs/framework/utils"
import { queryT, withTenant, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError } from "../../lib/errors"
import type { ConsentRecord, ConsentScope, DsrRequest, DsrType, DsrStatus, DataBreachIncident } from "./types"

const DSR_SLA_DAYS = 30

class GdprService extends MedusaService({}) {
  async recordConsent(ctx: TenantContext, input: Omit<ConsentRecord, "id" | "tenantId" | "createdAt" | "supersededById">): Promise<ConsentRecord> {
    return withTenant(ctx, async (client) => {
      await client.query(
        `UPDATE gdpr.consent_record SET superseded_by_id = $1
         WHERE user_id = $2 AND scope = $3 AND superseded_by_id IS NULL`,
        ["pending", input.userId, input.scope]
      )
      const { rows } = await client.query(
        `INSERT INTO gdpr.consent_record (
           id, tenant_id, user_id, scope, granted, policy_version, source, ip_address, user_agent, created_at
         ) VALUES (
           public.uuidv7(), $1, $2, $3, $4, $5, $6, $7::inet, $8, NOW()
         ) RETURNING *`,
        [ctx.tenantId, input.userId, input.scope, input.granted, input.policyVersion, input.source, input.ipAddress ?? null, input.userAgent ?? null]
      )
      await client.query(`UPDATE gdpr.consent_record SET superseded_by_id = $1 WHERE superseded_by_id = 'pending'`, [rows[0].id])
      return mapConsent(rows[0])
    })
  }

  async getCurrentConsents(ctx: TenantContext, userId: string): Promise<Record<ConsentScope, boolean>> {
    const rows = await queryT<any>(
      ctx,
      `SELECT DISTINCT ON (scope) scope, granted FROM gdpr.consent_record
       WHERE user_id = $1 AND superseded_by_id IS NULL
       ORDER BY scope, created_at DESC`,
      [userId]
    )
    const out: Partial<Record<ConsentScope, boolean>> = {}
    for (const r of rows) out[r.scope as ConsentScope] = r.granted
    return out as Record<ConsentScope, boolean>
  }

  async submitDsr(ctx: TenantContext, input: { userId: string; type: DsrType; notes?: string }): Promise<DsrRequest> {
    const due = new Date(Date.now() + DSR_SLA_DAYS * 86_400_000)
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO gdpr.data_subject_request (
         id, tenant_id, user_id, type, status, received_at, sla_due_at, evidence_urls, notes, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, 'received', NOW(), $4, '{}', $5, NOW(), NOW()
       ) RETURNING *`,
      [ctx.tenantId, input.userId, input.type, due, input.notes ?? null]
    )
    await emitAudit(ctx, { actionCode: "gdpr.dsr.submit", resourceType: "gdpr.data_subject_request", resourceId: rows[0].id, after: rows[0], severity: "high" })
    return mapDsr(rows[0])
  }

  async transitionDsr(ctx: TenantContext, dsrId: string, to: DsrStatus, notes?: string, evidenceUrls?: string[]): Promise<DsrRequest> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE gdpr.data_subject_request
       SET status = $1, notes = COALESCE($2, notes),
           evidence_urls = CASE WHEN $3::text[] IS NULL THEN evidence_urls ELSE evidence_urls || $3::text[] END,
           completed_at = CASE WHEN $1 = 'completed' THEN NOW() ELSE completed_at END,
           updated_at = NOW()
       WHERE id = $4 AND tenant_id = $5 RETURNING *`,
      [to, notes ?? null, evidenceUrls ?? null, dsrId, ctx.tenantId]
    )
    if (!rows[0]) throw new NotFoundError("DSR", dsrId)
    await emitAudit(ctx, { actionCode: `gdpr.dsr.${to}`, resourceType: "gdpr.data_subject_request", resourceId: dsrId, severity: "high" })
    return mapDsr(rows[0])
  }

  async reportBreach(ctx: TenantContext, input: Omit<DataBreachIncident, "id" | "tenantId" | "detectedAt" | "notificationsSent">): Promise<DataBreachIncident> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO gdpr.data_breach_incident (
         id, tenant_id, detected_at, reported_at, severity, affected_user_count, data_categories,
         description, root_cause, containment_actions, notifications_sent, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, NOW(), $2, $3, $4, $5::text[], $6, $7, $8::text[], 0, NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.reportedAt ?? null, input.severity, input.affectedUserCount,
        input.dataCategories, input.description, input.rootCause ?? null, input.containmentActions,
      ]
    )
    await emitAudit(ctx, { actionCode: "gdpr.breach.report", resourceType: "gdpr.data_breach_incident", resourceId: rows[0].id, after: rows[0], severity: "critical" })
    return mapBreach(rows[0])
  }
}

function mapConsent(r: any): ConsentRecord {
  return {
    id: r.id, tenantId: r.tenant_id, userId: r.user_id, scope: r.scope, granted: r.granted,
    policyVersion: r.policy_version, source: r.source, ipAddress: r.ip_address, userAgent: r.user_agent,
    createdAt: r.created_at, supersededById: r.superseded_by_id,
  }
}
function mapDsr(r: any): DsrRequest {
  return {
    id: r.id, tenantId: r.tenant_id, userId: r.user_id, type: r.type, status: r.status,
    receivedAt: r.received_at, slaDueAt: r.sla_due_at, completedAt: r.completed_at,
    evidenceUrls: r.evidence_urls ?? [], notes: r.notes,
  }
}
function mapBreach(r: any): DataBreachIncident {
  return {
    id: r.id, tenantId: r.tenant_id, detectedAt: r.detected_at, reportedAt: r.reported_at,
    severity: r.severity, affectedUserCount: r.affected_user_count, dataCategories: r.data_categories ?? [],
    description: r.description, rootCause: r.root_cause, containmentActions: r.containment_actions ?? [],
    notificationsSent: r.notifications_sent, closedAt: r.closed_at,
  }
}

export default GdprService
