import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { SUPPLIER_APPLICATION_MODULE } from "../../../modules/supplier_application"

/**
 * GET /admin/supplier-applications
 * Admin list pending/all applications.
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const supplierAppService = req.scope.resolve(SUPPLIER_APPLICATION_MODULE) as any

  const status = req.query.status as string | undefined
  const limit = Number(req.query.limit ?? 50)
  const offset = Number(req.query.offset ?? 0)

  const filters: any = {}
  if (status) filters.status = status

  try {
    const apps = await supplierAppService.listSupplierApplications(filters, {
      take: limit,
      skip: offset,
      order: { created_at: "DESC" },
    })

    return res.json({
      supplier_applications: apps,
      count: apps.length,
      limit,
      offset,
    })
  } catch (error: any) {
    console.error("Admin list supplier-applications failed:", error)
    return res.status(500).json({ message: "Có lỗi xảy ra" })
  }
}
