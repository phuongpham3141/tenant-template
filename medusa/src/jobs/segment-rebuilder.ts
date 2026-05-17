/**
 * Segment rebuilder job (Sprint 11 Pha 2c D30 stubbed)
 *
 * STATUS: Job no-op do marketing-email drop.
 * Original: rebuilt email_mkt.segment audience lists periodically.
 *
 * Sprint 12+ TODO: Re-enable when marketing-email service rewrite.
 * Backup: /tmp/sprint-11-pha-2c-bak/cascade/segment-rebuilder.ts
 */
import type { MedusaContainer } from "@medusajs/framework"

export default async function segmentRebuilder(container: MedusaContainer) {
  container.resolve("logger").debug(
    "[segment-rebuilder] No-op stub (Sprint 11 Pha 2c D30 defer Sprint 12+)"
  )
}

export const config = {
  name: "segment-rebuilder",
  schedule: "*/15 * * * *",
}
