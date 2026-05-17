import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { RFQ_MODULE, type RfqService } from "../../../modules/rfq"
import { resolveTenant } from "../../../lib/tenant/context"

/**
 * GET /store/rfqs
 * List RFQs của customer đang đăng nhập (buyer).
 *
 * Auth: customer session required (cookie-based).
 * Query: status?, limit (default 20, max 100), offset (default 0).
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const customerId = (req as any).auth_context?.actor_id || (req as any).auth?.actor_id

  if (!customerId) {
    return res.status(401).json({
      message: "Vui lòng đăng nhập để xem yêu cầu báo giá",
    })
  }

  const rfqService = req.scope.resolve<RfqService>(RFQ_MODULE)
  const ctx = resolveTenant(req)

  const status = req.query.status as string | undefined
  const limit = Math.min(Number(req.query.limit ?? 20), 100)
  const offset = Math.max(Number(req.query.offset ?? 0), 0)

  const filters: any = { buyer_id: customerId }
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
    console.error("List RFQs failed:", error)
    return res.status(500).json({
      message: "Có lỗi xảy ra. Vui lòng thử lại.",
    })
  }
}
