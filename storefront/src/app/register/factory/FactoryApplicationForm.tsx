"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { NAV_CATEGORIES } from "@/data/home"

const BUSINESS_TYPES = [
  { value: "factory", label: "Nhà máy sản xuất" },
  { value: "manufacturer", label: "Nhà sản xuất OEM/ODM" },
  { value: "trading_company", label: "Công ty thương mại" },
  { value: "distributor", label: "Nhà phân phối" },
] as const

const PROVINCES_CN = ["Quảng Đông", "Chiết Giang", "Giang Tô", "Phúc Kiến", "Sơn Đông", "Hà Bắc", "Tứ Xuyên", "Khác"] as const

const EMPLOYEE_RANGES = ["< 50", "50-200", "200-500", "500-1000", "> 1000"] as const

const REVENUE_RANGES = ["< $1M", "$1M-5M", "$5M-20M", "$20M-100M", "> $100M"] as const

const CERTIFICATIONS = ["ISO 9001", "ISO 14001", "BSCI", "Sedex", "GMP", "HACCP", "CE", "RoHS", "FCC", "FDA"] as const

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://api.huayuesc.local"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ""

export function FactoryApplicationForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const fd = new FormData(e.currentTarget)

    if (!fd.get("consent_tos")) {
      setError("Vui lòng đồng ý Điều khoản NCC + audit on-site")
      return
    }

    const body = {
      company_name: String(fd.get("company") ?? "").trim(),
      business_type: String(fd.get("business_type") ?? "factory"),
      established_year: fd.get("founded") ? Number(fd.get("founded")) : undefined,
      province: String(fd.get("province") ?? "") || undefined,
      employee_count: String(fd.get("employees") ?? "") || undefined,
      factory_area_m2: fd.get("area") ? Number(fd.get("area")) : undefined,
      capacity_monthly: String(fd.get("capacity") ?? "") || undefined,
      moq: String(fd.get("moq") ?? "") || undefined,
      lead_time_days: String(fd.get("leadTime") ?? "") || undefined,
      industries: fd.getAll("products").map(String),
      export_year: fd.get("exportYear") ? Number(fd.get("exportYear")) : undefined,
      annual_revenue: String(fd.get("revenue") ?? "") || undefined,
      certifications: fd.getAll("cert").map(String),
      contact_name: String(fd.get("contactName") ?? "").trim(),
      contact_role: String(fd.get("contactRole") ?? "") || undefined,
      contact_email: String(fd.get("email") ?? "").trim(),
      contact_im: String(fd.get("im") ?? "") || undefined,
      contact_phone: String(fd.get("im") ?? "") || undefined, // Map IM → phone (form chưa có phone field riêng)
      website: String(fd.get("website") ?? "") || undefined,
      country: "CN" as const,
    }

    if (!body.company_name || !body.contact_name || !body.contact_email) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${BACKEND_URL}/store/supplier-applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": PUBLISHABLE_KEY,
          "x-tenant-id": "csr",
        },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        setSuccess(data.message ?? "Đã gửi đăng ký. Chúng tôi sẽ liên hệ trong vòng 3 ngày làm việc.")
        return
      }

      if (res.status === 400) {
        setError(data.message ?? "Vui lòng kiểm tra lại thông tin")
      } else if (res.status === 409) {
        setError("Đăng ký đã tồn tại. Vui lòng liên hệ hỗ trợ.")
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại sau.")
      }
    } catch {
      setError("Không kết nối được máy chủ. Vui lòng kiểm tra mạng.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Section: Company info */}
      <div>
        <b className="block text-[12px] uppercase tracking-wider text-brand mb-2">① Thông tin công ty</b>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          <div className="col-span-2">
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
              Tên công ty <span className="text-accent">*</span>
            </label>
            <input name="company" required placeholder="Foshan ABC Industrial Co., Ltd."
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
              Năm thành lập <span className="text-accent">*</span>
            </label>
            <input name="founded" type="number" min="1900" max="2026" placeholder="2010"
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
              Loại hình <span className="text-accent">*</span>
            </label>
            <select name="business_type" required
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-paper">
              {BUSINESS_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Tỉnh / Thành phố</label>
            <select name="province"
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-paper">
              {PROVINCES_CN.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Số nhân viên</label>
            <select name="employees"
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-paper">
              {EMPLOYEE_RANGES.map((e) => <option key={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Diện tích nhà máy (m²)</label>
            <input name="area" type="number" placeholder="50000"
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
          </div>
        </div>
      </div>

      {/* Section: Production capacity */}
      <div className="pt-3 border-t border-line">
        <b className="block text-[12px] uppercase tracking-wider text-brand mb-2">② Năng lực sản xuất</b>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          <div>
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Sản lượng / tháng</label>
            <input name="capacity" placeholder="Vd: 200,000 pcs / month"
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">MOQ tối thiểu</label>
            <input name="moq" placeholder="Vd: 500 pcs / 50 kg / 1 cont 20"
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Thời gian sản xuất (ngày)</label>
            <input name="leadTime" placeholder="Vd: 30-45 ngày"
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Năm bắt đầu xuất khẩu</label>
            <input name="exportYear" type="number" min="1900" max="2026" placeholder="2015"
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
          </div>
          <div className="col-span-2">
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
              Ngành sản phẩm chính <span className="text-mute2 font-normal text-[11px]">(chọn nhiều)</span>
            </label>
            <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2">
              {NAV_CATEGORIES.slice(0, 9).map((c) => (
                <label key={c.slug} className="flex items-center gap-1.5 text-[12px] text-mute cursor-pointer px-2 py-1.5 border border-line rounded-sm hover:border-brand hover:bg-bg">
                  <input type="checkbox" name="products" value={c.slug} className="accent-brand" />
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Doanh thu năm gần nhất</label>
            <select name="revenue"
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-paper">
              {REVENUE_RANGES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
              Chứng chỉ <span className="text-mute2 font-normal text-[11px]">(chọn nhiều)</span>
            </label>
            <div className="grid grid-cols-5 gap-2 max-md:grid-cols-3">
              {CERTIFICATIONS.map((cert) => (
                <label key={cert} className="flex items-center gap-1 text-[11.5px] text-mute cursor-pointer px-2 py-1 border border-line rounded-sm hover:border-brand hover:bg-bg">
                  <input type="checkbox" name="cert" value={cert} className="accent-brand" />
                  <span>{cert}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section: Contact */}
      <div className="pt-3 border-t border-line">
        <b className="block text-[12px] uppercase tracking-wider text-brand mb-2">③ Liên hệ & hồ sơ</b>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          <div>
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
              Người liên hệ <span className="text-accent">*</span>
            </label>
            <input name="contactName" required placeholder="Tên người liên hệ tại nhà máy"
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Chức vụ</label>
            <input name="contactRole" placeholder="Sales Manager / Export Director"
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
              Email <span className="text-accent">*</span>
            </label>
            <input name="email" type="email" required placeholder="export@company.com"
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">WeChat / WhatsApp</label>
            <input name="im" placeholder="WeChat ID hoặc số WhatsApp"
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
          </div>
          <div className="col-span-2">
            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Website hiện có (nếu có)</label>
            <input name="website" type="url" placeholder="https://yourcompany.com"
              className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
          </div>
        </div>
      </div>

      <label className="flex items-start gap-2 text-[12px] text-mute mt-4">
        <input type="checkbox" name="consent_tos" required className="accent-brand mt-0.5" />
        <span>
          Đồng ý cho Cybersilkroads thực hiện audit on-site và đồng ý{" "}
          <Link href="/info/terms-of-service" className="text-brand cursor-pointer hover:underline">Điều khoản NCC</Link>
          {" "}(commission 5% trên đơn hàng thành công).
        </span>
      </label>

      {error && (
        <div role="alert" className="px-3 py-2 bg-red/10 border border-red/30 text-red rounded-sm text-[12.5px]">
          {error}
        </div>
      )}
      {success && (
        <div role="status" className="px-3 py-2 bg-success/10 border border-success/30 text-success rounded-sm text-[12.5px]">
          {success}
        </div>
      )}

      <button type="submit" disabled={loading}
        className="w-full py-3 bg-brand text-paper rounded-sm font-bold text-[14px] cursor-pointer hover:bg-brand-light mt-3 disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? "Đang gửi đăng ký..." : "Gửi đăng ký nhà máy →"}
      </button>

      <p className="text-[12px] text-mute text-center">
        Đã có tài khoản?{" "}
        <Link href="/login" className="text-brand font-semibold cursor-pointer hover:underline">Đăng nhập</Link>
      </p>
    </form>
  )
}
