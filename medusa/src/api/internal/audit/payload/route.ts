import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { queryT } from "../../../../lib/db/pg"
import { adminContext } from "../../../../lib/tenant/context"

const INTERNAL_TOKEN = process.env.PAYLOAD_TO_MEDUSA_TOKEN ?? ""

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  if (req.headers["x-internal-token"] !== INTERNAL_TOKEN) {
    return res.status(403).json({ error: "forbidden" })
  }
  const body = req.body as any
  const tenantId = body.tenant_id ?? process.env.DEFAULT_TENANT_ID
  if (!tenantId) return res.status(204).end()
  await queryT(
    adminContext(tenantId),
    `INSERT INTO audit.audit_event (id, tenant_id, occurred_at, actor_user_id, action_code, resource_type, resource_id, before_state, after_state, severity, outcome, metadata)
     VALUES (public.uuidv7(), $1, COALESCE($2, NOW()), $3, $4, $5, $6, $7::jsonb, $8::jsonb, 'info', 'success', $9::jsonb)`,
    [tenantId, body.occurred_at ?? null, body.actor_user_id ?? null, body.action_code, body.resource_type, body.resource_id ?? null, JSON.stringify(body.before_state ?? null), JSON.stringify(body.after_state ?? null), JSON.stringify(body.metadata ?? {})]
  ).catch(() => undefined)
  return res.status(204).end()
}
