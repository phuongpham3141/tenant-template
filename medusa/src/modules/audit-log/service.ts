import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import type { AuditEvent, AuditQueryFilter, AggregateSnapshot } from "./types"

class AuditLogService extends MedusaService({}) {
  async query(ctx: TenantContext, filter: AuditQueryFilter): Promise<AuditEvent[]> {
    const params: unknown[] = []
    const conds: string[] = []
    if (filter.actorUserId) { params.push(filter.actorUserId); conds.push(`actor_user_id = $${params.length}`) }
    if (filter.resourceType) { params.push(filter.resourceType); conds.push(`resource_type = $${params.length}`) }
    if (filter.resourceId) { params.push(filter.resourceId); conds.push(`resource_id = $${params.length}`) }
    if (filter.actionCode) { params.push(filter.actionCode); conds.push(`action_code = $${params.length}`) }
    if (filter.severity) { params.push(filter.severity); conds.push(`severity = $${params.length}`) }
    if (filter.from) { params.push(filter.from); conds.push(`occurred_at >= $${params.length}`) }
    if (filter.to) { params.push(filter.to); conds.push(`occurred_at <= $${params.length}`) }
    const where = conds.length ? `WHERE ${conds.join(" AND ")}` : ""
    params.push(Math.min(filter.limit ?? 100, 1000))
    params.push(filter.offset ?? 0)
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM audit.audit_event ${where}
       ORDER BY occurred_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    )
    return rows.map(mapEvent)
  }

  async getResourceHistory(ctx: TenantContext, resourceType: string, resourceId: string): Promise<AuditEvent[]> {
    return this.query(ctx, { resourceType, resourceId, limit: 1000 })
  }

  async replay(ctx: TenantContext, resourceType: string, resourceId: string, untilDate?: Date): Promise<AggregateSnapshot> {
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM audit.audit_event
       WHERE resource_type = $1 AND resource_id = $2 ${untilDate ? "AND occurred_at <= $3" : ""}
       ORDER BY occurred_at ASC`,
      untilDate ? [resourceType, resourceId, untilDate] : [resourceType, resourceId]
    )
    let state: Record<string, unknown> = {}
    let version = 0
    for (const r of rows) {
      version++
      if (r.action_code.endsWith(".delete")) {
        state = { _deleted: true, lastAction: r.action_code }
      } else if (r.after_state) {
        state = { ...state, ...r.after_state }
      }
    }
    return {
      resourceType, resourceId, asOfVersion: version, state, builtAt: new Date(),
    }
  }
}

function mapEvent(r: any): AuditEvent {
  return {
    id: r.id, tenantId: r.tenant_id, occurredAt: r.occurred_at,
    actorUserId: r.actor_user_id, actorIp: r.actor_ip, actorUserAgent: r.actor_user_agent,
    actionCode: r.action_code, resourceType: r.resource_type, resourceId: r.resource_id,
    beforeState: r.before_state, afterState: r.after_state,
    severity: r.severity, outcome: r.outcome,
    correlationId: r.correlation_id, metadata: r.metadata ?? {},
  }
}

export default AuditLogService
