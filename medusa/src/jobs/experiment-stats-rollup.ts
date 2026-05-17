/**
 * Experiment stats rollup job (Sprint 11 Pha 2c D31 stubbed)
 *
 * STATUS: Job no-op do experimentation drop.
 * Original: hourly rollup of A/B test metrics into experiment.metric_rollup.
 *
 * Sprint 12+ TODO: Re-enable when experimentation service rewrite.
 * Backup: /tmp/sprint-11-pha-2c-bak/cascade/experiment-stats-rollup.ts
 */
import type { MedusaContainer } from "@medusajs/framework"

export default async function experimentStatsRollup(container: MedusaContainer) {
  container.resolve("logger").debug(
    "[experiment-stats-rollup] No-op stub (Sprint 11 Pha 2c D31 defer Sprint 12+)"
  )
}

export const config = {
  name: "experiment-stats-rollup",
  schedule: "0 * * * *",
}
