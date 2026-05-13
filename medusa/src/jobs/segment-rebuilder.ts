import type { MedusaContainer } from "@medusajs/framework"
import { MARKETING_EMAIL_MODULE } from "../modules/marketing-email"
import type MarketingEmailService from "../modules/marketing-email/service"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"

export default async function segmentRebuilder(container: MedusaContainer) {
  const me = container.resolve<MarketingEmailService>(MARKETING_EMAIL_MODULE)
  const tenants = await queryT<{ id: string }>(adminContext(process.env.SYSTEM_TENANT_ID ?? ""), `SELECT id FROM admin.tenant WHERE status = 'active'`, []).catch(() => [])
  for (const t of tenants) {
    const ctx = adminContext(t.id)
    const segs = await queryT<{ id: string }>(ctx, `SELECT id FROM email_mkt.segment WHERE last_built_at IS NULL OR last_built_at < NOW() - (refresh_interval_min || ' minutes')::interval LIMIT 50`, []).catch(() => [])
    for (const s of segs) {
      await me.buildSegment(ctx, s.id).catch(() => undefined)
    }
  }
}

export const config = {
  name: "segment-rebuilder",
  schedule: "*/15 * * * *",
}
