import type { MedusaContainer } from "@medusajs/framework"
import { EXPERIMENTATION_MODULE } from "../modules/experimentation"
import type ExperimentationService from "../modules/experimentation/service"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"

export default async function experimentStatsRollup(container: MedusaContainer) {
  const exp = container.resolve<ExperimentationService>(EXPERIMENTATION_MODULE)
  const tenants = await queryT<{ id: string }>(adminContext(process.env.SYSTEM_TENANT_ID ?? ""), `SELECT id FROM admin.tenant WHERE status = 'active'`, []).catch(() => [])
  for (const t of tenants) {
    const ctx = adminContext(t.id)
    const experiments = await queryT<{ id: string; primary_metric: string }>(ctx, `SELECT id, primary_metric FROM experiment.experiment WHERE status = 'running'`, []).catch(() => [])
    for (const e of experiments) {
      const stats = await exp.computeStats(ctx, e.id, e.primary_metric).catch(() => [])
      for (const s of stats) {
        await queryT(ctx, `INSERT INTO experiment.metric_rollup (id, tenant_id, experiment_id, variant_id, metric, bucket_hour, count, sum, mean, std_dev, lift_pct, computed_at)
         VALUES (public.uuidv7(), $1, $2, $3, $4, date_trunc('hour', NOW()), $5, $6, $7, $8, $9, NOW())
         ON CONFLICT (experiment_id, variant_id, metric, bucket_hour)
         DO UPDATE SET count = EXCLUDED.count, sum = EXCLUDED.sum, mean = EXCLUDED.mean, std_dev = EXCLUDED.std_dev, lift_pct = EXCLUDED.lift_pct, computed_at = NOW()`,
          [ctx.tenantId, e.id, s.variantId, s.metric, s.count, s.sum, s.mean, s.stdDev, s.liftPct ?? null]
        ).catch(() => undefined)
      }
    }
  }
}

export const config = {
  name: "experiment-stats-rollup",
  schedule: "0 * * * *",
}
