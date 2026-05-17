import Link from "next/link"
import { redirect } from "next/navigation"
import { Breadcrumb } from "@/components/category/breadcrumb"
import { BuyerSidebar } from "@/components/buyer/sidebar"
import { EmptyState } from "@/components/ui/EmptyState"
import { rfqsApi, type Rfq, type RfqStatus } from "@/lib/sdk/rfqs"
import { ApiError } from "@/lib/api/client"

// Status enums match schema CHECK constraint (L19)
const STATUS_LABELS: Record<RfqStatus, string> = {
  draft: "Bản nháp",
  published: "Đã đăng",
  quoting: "Đang báo giá",
  awarded: "Đã chốt",
  converted: "Đã tạo đơn",
  closed: "Đã đóng",
  expired: "Hết hạn",
  cancelled: "Hủy",
}

const STATUS_COLOR: Record<RfqStatus, string> = {
  draft: "bg-mute2/20 text-mute",
  published: "bg-gold/30 text-brand-dark",
  quoting: "bg-gold/30 text-brand-dark",
  awarded: "bg-success/20 text-success",
  converted: "bg-success/20 text-success",
  closed: "bg-mute2/20 text-mute",
  expired: "bg-mute2/20 text-mute",
  cancelled: "bg-mute2/20 text-mute",
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("vi-VN")
  } catch {
    return "—"
  }
}

function rfqTitle(rfq: Rfq): string {
  return rfq.title_i18n?.vi || rfq.title_i18n?.en || rfq.title_i18n?.cn || "(không có tiêu đề)"
}

export default async function BuyerRfqsPage() {
  let rfqs: Rfq[] = []

  try {
    const data = await rfqsApi.list({ limit: 50 })
    rfqs = data.rfqs
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      redirect("/login?redirect=/buyer-center/rfqs")
    }
    throw err
  }

  const isEmpty = rfqs.length === 0

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Khu vực người mua", href: "/buyer-center" },
          { label: "Yêu cầu báo giá" },
        ]}
      />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/rfqs" />
        <div>
          <div className="bg-paper border border-line rounded p-4 mb-4 flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-3">
            <div>
              <h1 className="text-[20px] font-bold text-ink">Yêu cầu báo giá của tôi</h1>
              <p className="text-[12px] text-mute mt-0.5">
                Tổng {rfqs.length} RFQ
              </p>
            </div>
            <Link
              href="/buyer-center/post-rfq"
              className="px-4 py-2 bg-accent text-paper rounded-sm font-semibold text-[12.5px]"
            >
              📨 Đăng RFQ mới
            </Link>
          </div>

          {isEmpty ? (
            <div className="bg-paper border border-line rounded">
              <EmptyState
                title="Bạn chưa có RFQ nào"
                message="Hãy đăng yêu cầu báo giá đầu tiên — Cybersilkroads sẽ gửi đến 5-10 nhà máy phù hợp trong vòng 24h."
                ctaText="Đăng RFQ đầu tiên"
                ctaHref="/buyer-center/post-rfq"
              />
            </div>
          ) : (
            <div className="bg-paper border border-line rounded">
              <table className="w-full text-[12.5px] max-md:hidden">
                <thead className="bg-surface-2 text-mute">
                  <tr>
                    <th className="text-left px-3 py-2.5 font-medium">Mã RFQ</th>
                    <th className="text-left px-3 py-2.5 font-medium">Sản phẩm</th>
                    <th className="text-left px-3 py-2.5 font-medium">Số lượng</th>
                    <th className="text-left px-3 py-2.5 font-medium">Ngày tạo</th>
                    <th className="text-left px-3 py-2.5 font-medium">Trạng thái</th>
                    <th className="text-left px-3 py-2.5 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {rfqs.map((rfq) => (
                    <tr key={rfq.id} className="border-t border-line hover:bg-surface-2">
                      <td className="px-3 py-3 text-brand font-semibold">{rfq.code}</td>
                      <td className="px-3 py-3 text-ink truncate max-w-[260px]">
                        {rfqTitle(rfq)}
                      </td>
                      <td className="px-3 py-3 text-mute">
                        {rfq.target_quantity} {rfq.unit_code}
                      </td>
                      <td className="px-3 py-3 text-mute">{formatDate(rfq.created_at)}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-sm font-semibold ${STATUS_COLOR[rfq.status]}`}
                        >
                          {STATUS_LABELS[rfq.status]}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <Link
                          href={`/buyer-center/rfqs/${rfq.id}`}
                          className="text-brand text-[12px] hover:underline"
                        >
                          Chi tiết →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ul className="md:hidden divide-y divide-line">
                {rfqs.map((rfq) => (
                  <li key={rfq.id} className="p-3 hover:bg-surface-2">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-brand font-semibold text-[13px]">{rfq.code}</span>
                      <span
                        className={`text-[10.5px] px-2 py-0.5 rounded-sm font-semibold ${STATUS_COLOR[rfq.status]}`}
                      >
                        {STATUS_LABELS[rfq.status]}
                      </span>
                    </div>
                    <p className="text-ink text-[13px] mb-1">{rfqTitle(rfq)}</p>
                    <div className="flex justify-between text-[11.5px] text-mute">
                      <span>
                        {rfq.target_quantity} {rfq.unit_code} · {formatDate(rfq.created_at)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const metadata = { title: "Yêu cầu báo giá — Trung tâm Buyer" }
