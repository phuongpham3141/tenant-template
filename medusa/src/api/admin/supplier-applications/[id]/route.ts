import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { SUPPLIER_APPLICATION_MODULE } from "../../../../modules/supplier_application"

/**
 * GET /admin/supplier-applications/:id
 * Admin xem chi tiết application.
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const supplierAppService = req.scope.resolve(SUPPLIER_APPLICATION_MODULE) as any

  try {
    const app = await supplierAppService.retrieveSupplierApplication(req.params.id)
    if (!app) {
      return res.status(404).json({ message: "Không tìm thấy đơn đăng ký" })
    }
    return res.json({ supplier_application: app })
  } catch (error: any) {
    if (error?.type === "not_found" || /not found/i.test(String(error?.message ?? ""))) {
      return res.status(404).json({ message: "Không tìm thấy đơn đăng ký" })
    }
    console.error("Admin retrieve supplier-application failed:", error)
    return res.status(500).json({ message: "Có lỗi xảy ra" })
  }
}

/**
 * POST /admin/supplier-applications/:id
 * Admin update status (approve / reject / needs_info workflow).
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const supplierAppService = req.scope.resolve(SUPPLIER_APPLICATION_MODULE) as any
  const body = req.body as any

  const allowedStatus = ["under_review", "needs_info", "approved", "rejected"]
  if (!body.status || !allowedStatus.includes(body.status)) {
    return res.status(400).json({ message: "Trạng thái không hợp lệ" })
  }

  const update: any = {
    id: req.params.id,
    status: body.status,
    reviewed_at: new Date(),
  }

  if (body.admin_notes) update.admin_notes = String(body.admin_notes)
  if (body.status === "rejected" && body.rejection_reason) {
    update.rejection_reason = String(body.rejection_reason)
  }
  if (body.status === "approved" && body.supplier_id) {
    update.approved_supplier_id = String(body.supplier_id)
  }

  const adminId = (req as any).auth_context?.actor_id || (req as any).auth?.actor_id
  if (adminId) update.reviewed_by = String(adminId)

  try {
    const updated = await supplierAppService.updateSupplierApplications(update)
    return res.json({ supplier_application: updated })
  } catch (error: any) {
    console.error("Admin update supplier-application failed:", error)
    return res.status(500).json({ message: "Có lỗi xảy ra" })
  }
}
