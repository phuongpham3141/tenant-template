import { withTenant, type TenantContext } from "../db/pg"

export interface AuditEventInput {
  actionCode: string
  resourceType: string
  resourceId?: string | null
  before?: unknown
  after?: unknown
  severity?: "info" | "low" | "medium" | "high" | "critical"
  outcome?: "success" | "failure" | "denied"
  correlationId?: string | null
  metadata?: Record<string, unknown>
}

export async function emitAudit(ctx: TenantContext, input: AuditEventInput): Promise<void> {
  return withTenant(ctx, async (client) => {
    await client.query(
      `INSERT INTO audit.audit_event (
        id, tenant_id, occurred_at, actor_user_id,
        action_code, resource_type, resource_id,
        before_state, after_state, severity, outcome,
        correlation_id, metadata
      ) VALUES (
        public.uuidv7(), $1, NOW(), $2,
        $3, $4, $5,
        $6::jsonb, $7::jsonb, $8, $9,
        $10, $11::jsonb
      )`,
      [
        ctx.tenantId,
        ctx.userId ?? null,
        input.actionCode,
        input.resourceType,
        input.resourceId ?? null,
        input.before ? JSON.stringify(input.before) : null,
        input.after ? JSON.stringify(input.after) : null,
        input.severity ?? "info",
        input.outcome ?? "success",
        input.correlationId ?? null,
        JSON.stringify(input.metadata ?? {}),
      ]
    )
  })
}
