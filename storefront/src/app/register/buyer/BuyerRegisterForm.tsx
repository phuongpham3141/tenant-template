"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NAV_CATEGORIES } from "@/data/home"

const CITIES = ["Hà Nội", "TP Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Khác"] as const
const SIZES = ["Cá nhân / Hộ kinh doanh", "Dưới 10 nhân viên", "10 – 50 nhân viên", "50 – 200 nhân viên", "Trên 200 nhân viên"] as const
const REVENUES = ["Dưới 1 tỷ", "1 – 5 tỷ", "5 – 20 tỷ", "Trên 20 tỷ"] as const
const SOURCES = ["Tìm kiếm Google", "Nhóm Facebook / Zalo", "Bạn bè giới thiệu", "Hội chợ / Sự kiện", "Tiếp thị qua email", "Khác"] as const

export function BuyerRegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const fd = new FormData(e.currentTarget)
    const password = String(fd.get("password") ?? "")
    if (password.length < 8) {
      setError("Mật khẩu phải có tối thiểu 8 ký tự")
      return
    }
    if (!fd.get("consent_tos") || !fd.get("consent_privacy")) {
      setError("Vui lòng đồng ý Điều khoản và Chính sách bảo mật")
      return
    }

    const body = {
      email: String(fd.get("email") ?? ""),
      password,
      display_name: String(fd.get("name") ?? ""),
      account_type: "buyer" as const,
      phone: String(fd.get("phone") ?? "") || undefined,
      company_name: String(fd.get("company") ?? "") || undefined,
      locale: "vi" as const,
      consent_tos: true,
      consent_privacy: true,
      consent_marketing: Boolean(fd.get("consent_marketing")),
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setSuccess("Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.")
        setTimeout(() => router.push("/login"), 2500)
        return
      }
      if (res.status === 400) {
        setError("Vui lòng kiểm tra lại thông tin")
      } else if (res.status === 409) {
        setError("Email đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác")
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại")
      }
    } catch {
      setError("Không kết nối được máy chủ. Vui lòng kiểm tra mạng")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
        <div>
          <label htmlFor="reg-name" className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Họ tên <span className="text-accent">*</span>
          </label>
          <input id="reg-name" name="name" required autoComplete="name" placeholder="Nguyễn Văn A"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
        </div>
        <div>
          <label htmlFor="reg-company" className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Công ty
          </label>
          <input id="reg-company" name="company" autoComplete="organization" placeholder="Công ty TNHH ABC"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
        </div>
        <div>
          <label htmlFor="reg-email" className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Email <span className="text-accent">*</span>
          </label>
          <input id="reg-email" name="email" type="email" required autoComplete="email" placeholder="ban@congty.vn"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
        </div>
        <div>
          <label htmlFor="reg-phone" className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Điện thoại / Zalo <span className="text-accent">*</span>
          </label>
          <input id="reg-phone" name="phone" type="tel" required autoComplete="tel" placeholder="09xx xxx xxx"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
        </div>
        <div>
          <label htmlFor="reg-password" className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Mật khẩu <span className="text-accent">*</span>
          </label>
          <input id="reg-password" name="password" type="password" required minLength={8} autoComplete="new-password"
            placeholder="Tối thiểu 8 ký tự"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
        </div>
        <div>
          <label htmlFor="reg-city" className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Tỉnh / Thành
          </label>
          <select id="reg-city" name="city"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-paper">
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="reg-size" className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Quy mô doanh nghiệp
          </label>
          <select id="reg-size" name="size"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-paper">
            {SIZES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="reg-revenue" className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Doanh thu / năm
          </label>
          <select id="reg-revenue" name="revenue"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-paper">
            {REVENUES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Ngành quan tâm <span className="text-mute2 font-normal text-[11px]">(chọn nhiều)</span>
          </label>
          <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2">
            {NAV_CATEGORIES.slice(0, 9).map((c) => (
              <label key={c.slug} className="flex items-center gap-1.5 text-[12px] text-mute cursor-pointer px-2 py-1.5 border border-line rounded-sm hover:border-brand hover:bg-bg">
                <input type="checkbox" name="industry" value={c.slug} className="accent-brand" />
                <span className="text-[14px]">{c.icon}</span>
                <span>{c.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <label htmlFor="reg-source" className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Bạn nghe Cybersilkroads từ đâu?
          </label>
          <select id="reg-source" name="source"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-paper">
            {SOURCES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <label className="flex items-start gap-2 text-[12px] text-mute mt-4">
        <input type="checkbox" name="consent_tos" required className="accent-brand mt-0.5" />
        <span>
          Tôi đồng ý với{" "}
          <Link href="/info/terms-of-service" className="text-brand cursor-pointer hover:underline">Điều khoản dịch vụ</Link>
          {" "}và{" "}
          <Link href="/info/privacy-policy" className="text-brand cursor-pointer hover:underline">Chính sách bảo mật</Link>
        </span>
      </label>
      <label className="flex items-start gap-2 text-[12px] text-mute">
        <input type="checkbox" name="consent_privacy" required className="accent-brand mt-0.5" />
        <span>Tôi xác nhận đã đọc Chính sách bảo mật và cho phép xử lý dữ liệu cá nhân</span>
      </label>
      <label className="flex items-start gap-2 text-[12px] text-mute">
        <input type="checkbox" name="consent_marketing" className="accent-brand mt-0.5" />
        <span>Nhận tin khuyến mãi, hội chợ và RFQ phù hợp qua email/Zalo</span>
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
        className="w-full py-3 bg-brand text-paper rounded-sm font-bold text-[14px] cursor-pointer hover:bg-brand-light disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? "Đang đăng ký..." : "Đăng ký Người mua miễn phí"}
      </button>
    </form>
  )
}
