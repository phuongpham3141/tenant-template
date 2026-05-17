import Link from "next/link"
import { redirect } from "next/navigation"
import { Breadcrumb } from "@/components/category/breadcrumb"
import { BuyerSidebar } from "@/components/buyer/sidebar"
import { api, ApiError } from "@/lib/api/client"

// Standard Medusa Customer shape (relevant fields only)
interface Customer {
  id: string
  email: string
  first_name?: string | null
  last_name?: string | null
  phone?: string | null
  has_account: boolean
  metadata?: Record<string, unknown> | null
  created_at: string
}

function fullName(c: Customer): string {
  const parts = [c.first_name, c.last_name].filter(Boolean)
  return parts.length > 0 ? parts.join(" ") : "(chưa cập nhật)"
}

function joinedDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("vi-VN", {
      month: "2-digit",
      year: "numeric",
    })
  } catch {
    return "—"
  }
}

function initialLetter(c: Customer): string {
  if (c.first_name) return c.first_name[0]!.toUpperCase()
  if (c.email) return c.email[0]!.toUpperCase()
  return "?"
}

function ProfileSection({
  title,
  items,
  ctaLabel,
  ctaHref,
}: {
  title: string
  items: { label: string; value: string }[]
  ctaLabel: string
  ctaHref?: string
}) {
  const CtaTag = ctaHref ? Link : "button"
  const ctaProps: any = ctaHref
    ? { href: ctaHref }
    : { type: "button" }

  return (
    <div className="bg-paper border border-line rounded overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 border-b border-line bg-surface-2">
        <h2 className="font-bold text-ink text-[14px]">{title}</h2>
        <CtaTag {...ctaProps} className="text-brand text-[12px] hover:underline">
          {ctaLabel}
        </CtaTag>
      </div>
      <dl className="divide-y divide-line">
        {items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[160px_1fr] gap-3 px-4 py-3 text-[13px] max-md:grid-cols-1 max-md:gap-0.5"
          >
            <dt className="text-mute">{item.label}</dt>
            <dd className="text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default async function BuyerProfilePage() {
  let customer: Customer

  try {
    const data = await api<{ customer: Customer }>("/store/customers/me")
    customer = data.customer
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      redirect("/login?redirect=/buyer-center/profile")
    }
    throw err
  }

  const PERSONAL = [
    { label: "Họ và tên", value: fullName(customer) },
    { label: "Email", value: customer.email },
    { label: "Số điện thoại", value: customer.phone || "(chưa cập nhật)" },
  ]

  const md = (customer.metadata ?? {}) as Record<string, string | undefined>
  const BUSINESS = [
    { label: "Tên công ty", value: md.company_name || "(chưa cập nhật)" },
    { label: "Mã số thuế", value: md.tax_id || "(chưa cập nhật)" },
    { label: "Ngành hàng chính", value: md.industries || "(chưa cập nhật)" },
    { label: "Quy mô", value: md.company_size || "(chưa cập nhật)" },
  ]

  const SECURITY = [
    { label: "Mật khẩu", value: "••••••••" },
    { label: "Xác thực 2 lớp (2FA)", value: "Chưa bật" },
  ]

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Khu vực người mua", href: "/buyer-center" },
          { label: "Hồ sơ" },
        ]}
      />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/profile" />
        <div className="space-y-4">
          <div className="bg-paper border border-line rounded p-5 flex items-center gap-4 max-md:flex-col max-md:items-start max-md:gap-3">
            <div className="w-16 h-16 rounded-full bg-brand text-paper flex items-center justify-center text-[28px] font-bold flex-shrink-0">
              {initialLetter(customer)}
            </div>
            <div className="flex-1">
              <h1 className="text-[22px] font-bold text-ink">{fullName(customer)}</h1>
              <p className="text-[12.5px] text-mute mt-0.5">
                Buyer · Tham gia {joinedDate(customer.created_at)}
              </p>
              {customer.has_account ? (
                <p className="text-[11.5px] text-success mt-1">✓ Hồ sơ đã xác thực</p>
              ) : null}
            </div>
          </div>

          <ProfileSection title="Thông tin cá nhân" items={PERSONAL} ctaLabel="Chỉnh sửa" />
          <ProfileSection title="Thông tin doanh nghiệp" items={BUSINESS} ctaLabel="Chỉnh sửa" />
          <ProfileSection
            title="Bảo mật"
            items={SECURITY}
            ctaLabel="Đổi mật khẩu"
            ctaHref="/forgot-password"
          />
        </div>
      </div>
    </>
  )
}

export const metadata = { title: "Hồ sơ — Trung tâm Buyer" }
