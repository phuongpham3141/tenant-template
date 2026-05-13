import type { MedusaContainer } from "@medusajs/framework"
import { RFQ_MODULE } from "../modules/rfq"
import type RfqService from "../modules/rfq/service"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"

export default async function rfqExpirer(container: MedusaContainer) {
  const tenants = await queryT<{ id: string }>(adminContext(process.env.SYSTEM_TENANT_ID ?? ""), `SELECT id FROM admin.tenant WHERE status = 'active'`, []).catch(() => [])
  const rfq = container.resolve<RfqService>(RFQ_MODULE)
  for (const t of tenants) {
    const n = await rfq.expireRfqs(adminContext(t.id))
    if (n > 0) container.resolve("logger").info(`rfq-expirer: tenant=${t.id} expired=${n}`)
  }
}

export const config = {
  name: "rfq-expirer",
  schedule: "*/10 * * * *",
}
