import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { EmptyState } from "@/components/ui/EmptyState";

const MOCK_RFQS = [
  { id: "RFQ-8421", title: "Porcelain tile 600×1200 calacatta white", qty: "2,000 m²", quotes: 7, status: "Đang chờ báo giá", date: "12/04/2026" },
  { id: "RFQ-8417", title: "Sofa L-shape velvet xanh navy", qty: "30 set", quotes: 5, status: "Đang chờ báo giá", date: "10/04/2026" },
  { id: "RFQ-8412", title: "Smart toilet hotel 4-sao", qty: "80 pc", quotes: 9, status: "Đã chấp nhận", date: "06/04/2026" },
  { id: "RFQ-8398", title: "Kitchen cabinet OEM melamine trắng", qty: "12 set", quotes: 4, status: "Đang chờ báo giá", date: "01/04/2026" },
  { id: "RFQ-8376", title: "Brushed brass mixer tap", qty: "200 pc", quotes: 3, status: "Đã hủy", date: "25/03/2026" },
];

const STATUS_COLOR: Record<string, string> = {
  "Đang chờ báo giá": "bg-gold/30 text-brand-dark",
  "Đã chấp nhận": "bg-success/20 text-success",
  "Đã hủy": "bg-mute2/20 text-mute",
};

const TABS = ["Tất cả", "Đang chờ báo giá", "Đã chấp nhận", "Đã hủy"];

export default function BuyerRfqsPage() {
  const isEmpty = MOCK_RFQS.length === 0;

  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực người mua", href: "/buyer-center" }, { label: "Yêu cầu báo giá" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/rfqs" />
        <div>
          <div className="bg-paper border border-line rounded p-4 mb-4 flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-3">
            <div>
              <h1 className="text-[20px] font-bold text-ink">Yêu cầu báo giá của tôi</h1>
              <p className="text-[12px] text-mute mt-0.5">Tổng {MOCK_RFQS.length} RFQ · Cập nhật 12 phút trước</p>
            </div>
            <Link href="/buyer-center/post-rfq" className="px-4 py-2 bg-accent text-paper rounded-sm font-semibold text-[12.5px]">
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
              <div className="flex gap-0 border-b border-line px-2 overflow-x-auto">
                {TABS.map((t, i) => (
                  <a key={t} className={`px-4 py-3 text-[12.5px] cursor-pointer border-b-2 -mb-px whitespace-nowrap ${i === 0 ? "text-brand border-brand font-semibold" : "text-mute border-transparent hover:text-brand"}`}>
                    {t}
                  </a>
                ))}
              </div>

              <table className="w-full text-[12.5px] max-md:hidden">
                <thead className="bg-surface-2 text-mute">
                  <tr>
                    <th className="text-left px-3 py-2.5 font-medium">Mã RFQ</th>
                    <th className="text-left px-3 py-2.5 font-medium">Sản phẩm</th>
                    <th className="text-left px-3 py-2.5 font-medium">Số lượng</th>
                    <th className="text-left px-3 py-2.5 font-medium">Báo giá</th>
                    <th className="text-left px-3 py-2.5 font-medium">Ngày đăng</th>
                    <th className="text-left px-3 py-2.5 font-medium">Trạng thái</th>
                    <th className="text-left px-3 py-2.5 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_RFQS.map((r) => (
                    <tr key={r.id} className="border-t border-line hover:bg-surface-2">
                      <td className="px-3 py-3 text-brand font-semibold">{r.id}</td>
                      <td className="px-3 py-3 text-ink truncate max-w-[260px]">{r.title}</td>
                      <td className="px-3 py-3 text-mute">{r.qty}</td>
                      <td className="px-3 py-3 text-success font-semibold">{r.quotes}</td>
                      <td className="px-3 py-3 text-mute">{r.date}</td>
                      <td className="px-3 py-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded-sm font-semibold ${STATUS_COLOR[r.status]}`}>{r.status}</span>
                      </td>
                      <td className="px-3 py-3">
                        <Link href={`/buyer-center/rfqs/${r.id}`} className="text-brand text-[12px] hover:underline">Chi tiết →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ul className="md:hidden divide-y divide-line">
                {MOCK_RFQS.map((r) => (
                  <li key={r.id} className="p-3 hover:bg-surface-2">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-brand font-semibold text-[13px]">{r.id}</span>
                      <span className={`text-[10.5px] px-2 py-0.5 rounded-sm font-semibold ${STATUS_COLOR[r.status]}`}>{r.status}</span>
                    </div>
                    <p className="text-ink text-[13px] mb-1">{r.title}</p>
                    <div className="flex justify-between text-[11.5px] text-mute">
                      <span>{r.qty} · {r.date}</span>
                      <span className="text-success font-semibold">{r.quotes} báo giá</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Yêu cầu báo giá — Buyer Center" };
