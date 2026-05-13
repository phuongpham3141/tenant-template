import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { queryT } from "../../../../../lib/db/pg"
import { adminContext } from "../../../../../lib/tenant/context"

const INTERNAL_TOKEN = process.env.PAYLOAD_TO_MEDUSA_TOKEN ?? ""

export async function PUT(req: MedusaRequest, res: MedusaResponse) {
  if (req.headers["x-internal-token"] !== INTERNAL_TOKEN) {
    return res.status(403).json({ error: "forbidden" })
  }
  const id = req.params.id
  const body = req.body as any
  const tenantId = body.tenant_id ?? process.env.DEFAULT_TENANT_ID
  if (!tenantId) return res.status(400).json({ error: "missing_tenant" })
  await queryT(
    adminContext(tenantId),
    `UPDATE catalog.category
     SET name_i18n = COALESCE($1::jsonb, name_i18n),
         slug = COALESCE($2, slug),
         short_description_i18n = COALESCE($3::jsonb, short_description_i18n),
         metadata = COALESCE(metadata, '{}'::jsonb) || $4::jsonb,
         updated_at = NOW()
     WHERE id = $5`,
    [JSON.stringify(body.name_i18n), body.slug ?? null, JSON.stringify(body.short_description_i18n), JSON.stringify(body.metadata ?? {}), id]
  )
  return res.status(200).json({ ok: true })
}
