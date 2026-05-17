import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { RFQ_MODULE, type RfqService } from "../../../modules/rfq"
import { resolveTenant } from "../../../lib/tenant/context"

/**
 * GET /admin/rfqs — list all RFQs (tenant-scoped).
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const rfqService = req.scope.resolve<RfqService>(RFQ_MODULE)
  const ctx = resolveTenant(req)

  const status = req.query.status as string | undefined
  const limit = Math.min(Number(req.query.limit ?? 50), 100)
  const offset = Math.max(Number(req.query.offset ?? 0), 0)

  const filters: any = {}
  if (status) filters.status = status

  try {
    const { rfqs, count } = await rfqService.listRfqs(ctx, filters, {
      limit,
      offset,
      order_by: "created_at",
      order_dir: "DESC",
    })
    return res.json({ rfqs, count, limit, offset })
  } catch (error: any) {
    console.error("Admin list RFQs failed:", error)
    return res.status(500).json({ message: "Có lỗi xảy ra" })
  }
}
