/**
 * FX snapshot poller job (stub Sprint 10 Pha 2c v2 D23-EXPANDED Option C2)
 *
 * STATUS: No-op. Original job called escrow.captureFxSnapshot (dropped Bước 2).
 *
 * Architectural gap: schema fx_snapshot model = date-range rates set (10 cols
 * với rates jsonb + applied_from_at/until_at + buffer_pct), original job
 * captured single rate per call — incompatible patterns.
 *
 * Sprint 11+ TODO: Re-enable khi escrow service rewrite implements
 * proper FX snapshot model. Original PAIRS: USD-VND/CNY, VND-USD, CNY-USD/VND,
 * EUR-USD, JPY-USD. Schedule: every 6 hours (0 *​/6 * * *).
 *
 * Pattern reference: P10-PHA2C-ESCALATE-D23-EXPANDED.md.
 */

import type { MedusaContainer } from "@medusajs/framework"

export default async function fxSnapshotPoller(container: MedusaContainer) {
  // No-op Sprint 10 Pha 2c v2 D23-EXPANDED Option C2.
  // Sprint 11+: re-enable with escrow service rewrite.
  container.resolve("logger").debug(
    "[fx-snapshot-poller] No-op stub (Sprint 10 Pha 2c v2 D23-EXPANDED defer Sprint 11+)"
  )
}

export const config = {
  name: "fx-snapshot-poller",
  schedule: "0 */6 * * *",
}
