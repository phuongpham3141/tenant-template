import type { MedusaContainer } from "@medusajs/framework"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"

export default async function sessionCleaner(container: MedusaContainer) {
  const tenants = await queryT<{ id: string }>(adminContext(process.env.SYSTEM_TENANT_ID ?? ""), `SELECT id FROM admin.tenant WHERE status = 'active'`, []).catch(() => [])
  for (const t of tenants) {
    await queryT(adminContext(t.id),
      `UPDATE auth.session SET status = 'expired', updated_at = NOW()
       WHERE status = 'active' AND expires_at < NOW()`, []
    ).catch(() => undefined)
  }
}

export const config = {
  name: "session-cleaner",
  schedule: "*/5 * * * *",
}
