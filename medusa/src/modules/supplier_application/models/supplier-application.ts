import { model } from "@medusajs/framework/utils"

export const SupplierApplication = model.define("supplier_application", {
  id: model.id().primaryKey(),

  // Thông tin công ty
  company_name: model.text(),
  tax_id: model.text().nullable(),  // D14c: Sprint 6 form chưa collect
  business_type: model.enum(["factory", "manufacturer", "trading_company", "distributor"]),
  established_year: model.number().nullable(),
  employee_count: model.text().nullable(),

  // Địa chỉ
  address: model.text().nullable(),  // D14c: Sprint 6 form chỉ có province
  province: model.text().nullable(),
  district: model.text().nullable(),  // D14c: Sprint 6 form chưa collect
  country: model.enum(["VN", "CN"]).default("CN"),  // Factory mặc định CN

  // Liên hệ
  contact_name: model.text(),
  contact_phone: model.text().nullable(),  // Form dùng IM thay vì phone thuần
  contact_email: model.text(),
  contact_role: model.text().nullable(),  // Sprint 6 form có "contactRole"
  contact_im: model.text().nullable(),    // Sprint 6 form có WeChat/WhatsApp

  // Năng lực sản xuất (factory specific)
  industries: model.array().default([]),
  capacity_monthly: model.text().nullable(),
  certifications: model.array().default([]),
  factory_area_m2: model.number().nullable(),
  moq: model.text().nullable(),
  lead_time_days: model.text().nullable(),
  export_year: model.number().nullable(),
  annual_revenue: model.text().nullable(),
  website: model.text().nullable(),

  // Workflow
  status: model.enum([
    "submitted",        // Mới gửi
    "under_review",     // Admin đang xem xét
    "needs_info",       // Cần bổ sung thông tin
    "approved",         // Đã duyệt → tạo supplier account
    "rejected",         // Từ chối với lý do
  ]).default("submitted"),

  admin_notes: model.text().nullable(),
  rejection_reason: model.text().nullable(),

  reviewed_by: model.text().nullable(),
  reviewed_at: model.dateTime().nullable(),
  approved_supplier_id: model.text().nullable(),

  // Audit
  tenant_id: model.text(),
  // submitted_at: auto-set trong route handler (D15: model default Date generates invalid SQL)
})
