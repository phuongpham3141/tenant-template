import type { MedusaContainer } from "@medusajs/framework"
import { ESCROW_MODULE } from "../modules/escrow"
import type EscrowService from "../modules/escrow/service"
import { adminContext } from "../lib/tenant/context"
import { IntegrationError } from "../lib/errors"

const FX_API_URL = process.env.FX_API_URL ?? "https://api.exchangerate.host/latest"
const PAIRS: Array<[string, string]> = [
  ["USD", "VND"], ["USD", "CNY"], ["VND", "USD"], ["CNY", "USD"], ["CNY", "VND"], ["EUR", "USD"], ["JPY", "USD"],
]

export default async function fxSnapshotPoller(container: MedusaContainer) {
  const escrow = container.resolve<EscrowService>(ESCROW_MODULE)
  const tenantId = process.env.SYSTEM_TENANT_ID
  if (!tenantId) return
  for (const [from, to] of PAIRS) {
    try {
      const res = await fetch(`${FX_API_URL}?base=${from}&symbols=${to}`)
      if (!res.ok) throw new IntegrationError("fx-api", `${res.status}`)
      const json = await res.json() as any
      const rate = json.rates?.[to]
      if (rate && typeof rate === "number") {
        await escrow.captureFxSnapshot(adminContext(tenantId), from, to, rate, "exchangerate.host")
      }
    } catch (err) {
      container.resolve("logger").warn(`fx-snapshot-poller: failed ${from}->${to}: ${err}`)
    }
  }
}

export const config = {
  name: "fx-snapshot-poller",
  schedule: "0 */6 * * *",
}
