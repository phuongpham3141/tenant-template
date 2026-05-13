import type { MedusaContainer } from "@medusajs/framework"
import { withClient } from "../lib/db/pg"

export default async function partitionMaintenance(container: MedusaContainer) {
  await withClient(async (c) => {
    await c.query("SET LOCAL role = 'csr_admin'")
    const ext = await c.query(`SELECT 1 FROM pg_extension WHERE extname = 'pg_partman'`)
    if (!ext.rowCount) {
      container.resolve("logger").info("partition-maintenance: pg_partman not installed; skipping")
      return
    }
    await c.query(`SELECT partman.run_maintenance(p_analyze := TRUE)`)
  })
}

export const config = {
  name: "partition-maintenance",
  schedule: "30 1 * * *",
}
