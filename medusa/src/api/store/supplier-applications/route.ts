import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { SUPPLIER_APPLICATION_MODULE } from "../../../modules/supplier_application"

/**
 * POST /store/supplier-applications
 *
 * Storefront submit form đăng ký factory (Sprint 6 D9 carry-over → Sprint 9A Pha 1).
 * KHÔNG tạo user account ngay — admin review + tạo supplier sau approval.
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const supplierAppService = req.scope.resolve(SUPPLIER_APPLICATION_MODULE)
  const body = req.body as any

  // Required fields validation (theo Sprint 6 form reality)
  const required = [
    "company_name", "business_type",
    "contact_name", "contact_email",
  ]
  const missing = required.filter((f) => !body[f]?.toString().trim())
  if (missing.length > 0) {
    return res.status(400).json({
      message: "Thiếu thông tin bắt buộc",
      fields: missing,
    })
  }

  // Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.contact_email)) {
    return res.status(400).json({ message: "Email không hợp lệ" })
  }

  // Phone optional, validate nếu có
  if (body.contact_phone) {
    const phoneRegex = /^(0|\+84|\+86|\d)[\d\s\-()]{7,}$/
    if (!phoneRegex.test(String(body.contact_phone).replace(/\s/g, ""))) {
      return res.status(400).json({ message: "Số điện thoại không hợp lệ" })
    }
  }

  const tenantId = (req.headers["x-tenant-id"] as string) || "csr"

  try {
    const apps = await supplierAppService.createSupplierApplications([
      {
        ...body,
        tenant_id: tenantId,
        status: "submitted",
        submitted_at: new Date(),
      },
    ])
    const app = Array.isArray(apps) ? apps[0] : apps

    return res.status(201).json({
      id: app.id,
      message: "Đã gửi đăng ký. Chúng tôi sẽ liên hệ trong vòng 3 ngày làm việc.",
    })
  } catch (error: any) {
    console.error("Supplier application submit failed:", error)
    return res.status(500).json({
      message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
    })
  }
}
