import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { RFQ_MODULE, type RfqService, type RfqStatus } from "../../../../modules/rfq"
import { resolveTenant } from "../../../../lib/tenant/context"

/**
 * GET /admin/rfqs/:id — detail.
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const rfqService = req.scope.resolve<RfqService>(RFQ_MODULE)
  const ctx = resolveTenant(req)

  try {
    const rfq = await rfqService.retrieveRfq(ctx, req.params.id)
    if (!rfq) {
      return res.status(404).json({ message: "Không tìm thấy yêu cầu báo giá" })
    }
    return res.json({ rfq })
  } catch (error: any) {
    console.error("Admin retrieve RFQ failed:", error)
    return res.status(500).json({ message: "Có lỗi xảy ra" })
  }
}

/**
 * POST /admin/rfqs/:id — update status (workflow timestamps auto).
 *
 * Status enums match CHECK constraint schema (L19):
 *   draft | published | quoting | awarded | converted | closed | expired | cancelled
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const rfqService = req.scope.resolve<RfqService>(RFQ_MODULE)
  const ctx = resolveTenant(req)

  const body = req.body as { status?: string }

  const allowedStatus: RfqStatus[] = [
    "draft",
    "published",
    "quoting",
    "awarded",
    "converted",
    "closed",
    "expired",
    "cancelled",
  ]

  if (!body.status || !allowedStatus.includes(body.status as RfqStatus)) {
    return res.status(400).json({ message: "Trạng thái không hợp lệ" })
  }

  try {
    const updated = await rfqService.updateRfqStatus(
      ctx,
      req.params.id,
      body.status as RfqStatus
    )
    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy yêu cầu báo giá" })
    }
    return res.json({ rfq: updated })
  } catch (error: any) {
    console.error("Admin update RFQ failed:", error)
    return res.status(500).json({ message: "Có lỗi xảy ra" })
  }
}
