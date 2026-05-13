import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { SEARCH_PLATFORM_MODULE } from "../../../../modules/search-platform"
import type SearchPlatformService from "../../../../modules/search-platform/service"
import { adminContext } from "../../../../lib/tenant/context"

const CDC_TOKEN = process.env.CDC_WEBHOOK_TOKEN ?? ""

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  if (req.headers["x-cdc-token"] !== CDC_TOKEN) {
    return res.status(403).json({ error: "forbidden" })
  }
  const event = req.body as any
  const op = event.payload?.op
  const after = event.payload?.after
  const source = event.payload?.source
  const tableName = source?.table
  const tenantId = after?.tenant_id ?? after?.tenantId

  if (!tableName || !tenantId) return res.status(204).end()
  const ctx = adminContext(tenantId)
  const search = req.scope.resolve<SearchPlatformService>(SEARCH_PLATFORM_MODULE)

  if (tableName === "product" && (op === "c" || op === "u")) {
    await search.indexDocument(ctx, "product", after.id, {
      tenant_id: after.tenant_id, sku: after.sku, status: after.status,
      title_vi: after.title_i18n?.vi, title_en: after.title_i18n?.en, title_cn: after.title_i18n?.cn,
      supplier_id: after.supplier_id, category_id: after.category_id,
      base_price_minor: String(after.base_price_minor ?? 0), base_currency: after.base_currency ?? "USD",
      updated_at: after.updated_at,
    }).catch(() => undefined)
  }

  return res.status(204).end()
}
