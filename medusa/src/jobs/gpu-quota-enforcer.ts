import type { MedusaContainer } from "@medusajs/framework"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"
import { tenantsOverQuota, checkMonthlyQuota } from "../modules/ai-livestream/cost-ledger"

export default async function gpuQuotaEnforcer(container: MedusaContainer) {
  const offenders = await tenantsOverQuota()
  for (const tenantId of offenders) {
    const ctx = adminContext(tenantId)
    const sessions = await queryT<any>(
      ctx,
      `SELECT id FROM live.ai_director_session WHERE status IN ('running','initializing')`,
      []
    ).catch(() => [])
    for (const s of sessions) {
      await queryT(
        ctx,
        `UPDATE live.ai_director_session SET status = 'quota_paused', paused_at = NOW(), failure_reason = 'monthly_quota_exceeded' WHERE id = $1`,
        [s.id]
      ).catch(() => undefined)
    }
    await queryT(
      ctx,
      `UPDATE live.broadcast_schedule SET paused = TRUE, pause_reason = 'quota_exceeded', updated_at = NOW() WHERE paused = FALSE`,
      []
    ).catch(() => undefined)
    container.resolve("logger").warn(`gpu-quota-enforcer: paused tenant=${tenantId} sessions=${sessions.length}`)
  }

  // Warn approaching limit
  const sys = adminContext(process.env.SYSTEM_TENANT_ID ?? "")
  const tenants = await queryT<{ id: string }>(sys, `SELECT id FROM admin.tenant WHERE status = 'active'`, []).catch(() => [])
  for (const t of tenants) {
    const q = await checkMonthlyQuota(adminContext(t.id))
    if (q.isApproachingLimit && !q.isOverQuota) {
      container.resolve("logger").info(`quota warn: tenant=${t.id} used=${q.percentUsed}%`)
    }
  }
}

export const config = {
  name: "gpu-quota-enforcer",
  schedule: "*/5 * * * *",
}
