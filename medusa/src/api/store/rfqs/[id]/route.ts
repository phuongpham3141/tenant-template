import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { RFQ_MODULE, type RfqService } from "../../../../modules/rfq"
import { resolveTenant } from "../../../../lib/tenant/context"

/**
 * GET /store/rfqs/:id
 * Detail RFQ của customer (chỉ owner xem được).
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const customerId = (req as any).auth_context?.actor_id || (req as any).auth?.actor_id

  if (!customerId) {
    return res.status(401).json({ message: "Vui lòng đăng nhập" })
  }

  const rfqService = req.scope.resolve<RfqService>(RFQ_MODULE)
  const ctx = resolveTenant(req)

  try {
    const rfq = await rfqService.retrieveRfq(ctx, req.params.id)

    if (!rfq) {
      return res.status(404).json({ message: "Không tìm thấy yêu cầu báo giá" })
    }

    if (rfq.buyer_id !== customerId) {
      return res.status(403).json({
        message: "Bạn không có quyền xem yêu cầu báo giá này",
      })
    }

    return res.json({ rfq })
  } catch (error: any) {
    console.error("Retrieve RFQ failed:", error)
    return res.status(500).json({ message: "Có lỗi xảy ra. Vui lòng thử lại." })
  }
}
