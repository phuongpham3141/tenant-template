"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NAV_CATEGORIES } from "@/data/home"

const REVENUES = ["Dưới 1 tỷ", "1 – 5 tỷ", "5 – 20 tỷ", "Trên 20 tỷ"] as const

export function DealerRegisterForm() {
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
    if (!fd.get("consent_tos")) {
      setError("Vui lòng đồng ý Điều khoản trước khi đăng ký")
      return
    }

    const body = {
      email: String(fd.get("email") ?? ""),
      password,
      display_name: String(fd.get("name") ?? ""),
      account_type: "dealer" as const,
      phone: String(fd.get("phone") ?? "") || undefined,
      company_name: String(fd.get("company") ?? "") || undefined,
      locale: "vi" as const,
      consent_tos: true,
      consent_privacy: true,
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setSuccess("Đăng ký Dealer thành công. Đội ngũ Cybersilkroads sẽ liên hệ trong 24h để xác minh thông tin.")
        setTimeout(() => router.push("/login"), 3000)
        return
      }
      if (res.status === 409) {
        setError("Email đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác")
      } else if (res.status === 400) {
        setError("Vui lòng kiểm tra lại thông tin")
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
          <label htmlFor="d-name" className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Họ tên <span className="text-accent">*</span>
          </label>
          <input id="d-name" name="name" required autoComplete="name"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
        </div>
        <div>
          <label htmlFor="d-company" className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Công ty <span className="text-accent">*</span>
          </label>
          <input id="d-company" name="company" required autoComplete="organization"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
        </div>
        <div>
          <label htmlFor="d-email" className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Email <span className="text-accent">*</span>
          </label>
          <input id="d-email" name="email" type="email" required autoComplete="email"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
        </div>
        <div>
          <label htmlFor="d-phone" className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Điện thoại / Zalo <span className="text-accent">*</span>
          </label>
          <input id="d-phone" name="phone" type="tel" required autoComplete="tel"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
        </div>
        <div>
          <label htmlFor="d-password" className="block text-[12.5px] font-semibold text-ink mb-1.5">
            Mật khẩu <span className="text-accent">*</span>
          </label>
          <input id="d-password" name="password" type="password" required minLength={8} autoComplete="new-password"
            placeholder="Tối thiểu 8 ký tự"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
        </div>
        <div>
          <label htmlFor="d-tax" className="block text-[12.5px] font-semibold text-ink mb-1.5">Mã số thuế</label>
          <input id="d-tax" name="tax"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
        </div>
        <div>
          <label htmlFor="d-revenue" className="block text-[12.5px] font-semibold text-ink mb-1.5">Doanh thu / năm</label>
          <select id="d-revenue" name="revenue"
            className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-paper">
            {REVENUES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Ngành kinh doanh</label>
          <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2">
            {NAV_CATEGORIES.slice(0, 9).map((c) => (
              <label key={c.slug} className="flex items-center gap-1.5 text-[12px] text-mute cursor-pointer">
                <input type="checkbox" name="industry" value={c.slug} className="accent-brand" />
                <span>{c.icon}</span>
                <span>{c.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <label className="flex items-start gap-2 text-[12px] text-mute mt-4">
        <input type="checkbox" name="consent_tos" required className="accent-brand mt-0.5" />
        <span>
          Đồng ý{" "}
          <Link href="/info/terms-of-service" className="text-brand">Điều khoản</Link>
          {" "}và sử dụng audit miễn phí trong 90 ngày
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
        className="w-full py-3 bg-accent text-paper rounded-sm font-bold text-[14px] hover:opacity-90 mt-3 disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? "Đang đăng ký..." : "Đăng ký Dealer & Nhận ưu đãi →"}
      </button>
    </form>
  )
}
