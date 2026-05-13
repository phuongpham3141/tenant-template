import type { MedusaContainer } from "@medusajs/framework"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"

export default async function computeCostRollup(container: MedusaContainer) {
  const sys = adminContext(process.env.SYSTEM_TENANT_ID ?? "")
  const tenants = await queryT<{ id: string }>(sys, `SELECT id FROM admin.tenant WHERE status = 'active'`, []).catch(() => [])

  for (const t of tenants) {
    const ctx = adminContext(t.id)
    const rollup = await queryT<any>(
      ctx,
      `SELECT resource_type, SUM(total_micros) AS total, SUM(units) AS units, COUNT(*) AS events
       FROM live.ai_compute_ledger
       WHERE occurred_at >= NOW() - INTERVAL '1 hour'
       GROUP BY resource_type`,
      []
    ).catch(() => [])

    for (const r of rollup) {
      await queryT(
        ctx,
        `INSERT INTO admin.usage_meter (tenant_id, bucket, metric_key, quantity, unit, recorded_at)
         VALUES ($1, date_trunc('hour', NOW()), $2, $3, 'micros_usd', NOW())
         ON CONFLICT (tenant_id, bucket, metric_key) DO UPDATE
         SET quantity = admin.usage_meter.quantity + EXCLUDED.quantity, recorded_at = NOW()`,
        [t.id, `ai_${r.resource_type}_cost`, Number(r.total ?? 0)]
      ).catch(() => undefined)
    }
  }
}

export const config = {
  name: "compute-cost-rollup",
  schedule: "0 * * * *",
}
