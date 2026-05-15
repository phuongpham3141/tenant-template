import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { EmptyState } from "@/components/ui/EmptyState";

const ORDERS = [
  { id: "AVN-7831", supplier: "Dongpeng Ceramics", product: "Porcelain tile 600×1200", qty: "1,800 m²", total: "$15,300", status: "Đang vận chuyển", date: "12/04/2026" },
  { id: "AVN-7820", supplier: "KUKA Home", product: "Sofa L-shape velvet", qty: "30 set", total: "$12,600", status: "Đã giao", date: "08/04/2026" },
  { id: "AVN-7815", supplier: "Ortonbaths Group", product: "Smart toilet", qty: "80 pc", total: "$14,400", status: "Đang sản xuất", date: "05/04/2026" },
  { id: "AVN-7808", supplier: "OPPEIN Home", product: "Kitchen cabinet OEM", qty: "1 set", total: "$3,200", status: "Đã giao", date: "02/04/2026" },
  { id: "AVN-7795", supplier: "Monalisa Group", product: "Marble slab 1600×3200", qty: "120 m²", total: "$5,040", status: "Khiếu nại", date: "28/03/2026" },
  { id: "AVN-7780", supplier: "Landbond Furniture", product: "King size bed walnut", qty: "10 pc", total: "$3,800", status: "Đã giao", date: "20/03/2026" },
  { id: "AVN-7765", supplier: "Taizhou Faucet", product: "Brushed brass mixer", qty: "200 pc", total: "$7,600", status: "Đang xử lý", date: "15/03/2026" },
];

const STATUS_COLOR: Record<string, string> = {
  "Đang xử lý": "bg-mute2/20 text-mute",
  "Đang sản xuất": "bg-brand/15 text-brand",
  "Đang vận chuyển": "bg-gold/30 text-brand-dark",
  "Đã giao": "bg-success/20 text-success",
  "Khiếu nại": "bg-accent/20 text-accent",
};

const TABS = ["Tất cả", "Đang xử lý", "Đang vận chuyển", "Đã giao", "Khiếu nại"];

export default function OrdersPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực người mua", href: "/buyer-center" }, { label: "Đơn hàng" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/orders" />
        <div>
          <div className="bg-paper border border-line rounded p-4 mb-4 flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-3">
            <div>
              <h1 className="text-[20px] font-bold text-ink">Đơn hàng của tôi</h1>
              <p className="text-[12px] text-mute mt-0.5">Tổng {ORDERS.length} đơn · Cập nhật 12 phút trước</p>
            </div>
            <Link href="/products" className="px-4 py-2 bg-brand text-white rounded-sm font-semibold text-[12.5px]">+ Đơn hàng mới</Link>
          </div>

          {ORDERS.length === 0 ? (
            <div className="bg-paper border border-line rounded">
              <EmptyState
                title="Bạn chưa có đơn hàng"
                message="Khám phá sản phẩm chất lượng từ 40+ nhà máy đã audit và bắt đầu đặt hàng."
                ctaText="Duyệt sản phẩm"
                ctaHref="/products"
              />
            </div>
          ) : (
          <div className="bg-paper border border-line rounded">
            <div className="flex gap-0 border-b border-line px-2">
              {TABS.map((t, i) => (
                <a key={t} className={`px-4 py-3 text-[12.5px] cursor-pointer border-b-2 -mb-px ${i === 0 ? "text-brand border-brand font-semibold" : "text-mute border-transparent hover:text-brand"}`}>
                  {t}
                </a>
              ))}
            </div>
            <table className="w-full text-[12.5px]">
              <thead className="bg-surface-2 text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">Mã đơn</th>
                  <th className="text-left px-3 py-2.5 font-medium">Nhà cung cấp</th>
                  <th className="text-left px-3 py-2.5 font-medium">Sản phẩm</th>
                  <th className="text-left px-3 py-2.5 font-medium">SL</th>
                  <th className="text-left px-3 py-2.5 font-medium">Giá trị</th>
                  <th className="text-left px-3 py-2.5 font-medium">Ngày đặt</th>
                  <th className="text-left px-3 py-2.5 font-medium">Trạng thái</th>
                  <th className="text-left px-3 py-2.5 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o) => (
                  <tr key={o.id} className="border-t border-line hover:bg-surface-2">
                    <td className="px-3 py-3 text-brand font-semibold">{o.id}</td>
                    <td className="px-3 py-3 text-ink">{o.supplier}</td>
                    <td className="px-3 py-3 text-ink truncate max-w-[200px]">{o.product}</td>
                    <td className="px-3 py-3 text-mute">{o.qty}</td>
                    <td className="px-3 py-3 text-accent font-semibold">{o.total}</td>
                    <td className="px-3 py-3 text-mute">{o.date}</td>
                    <td className="px-3 py-3">
                      <span className={`text-[11px] px-2 py-0.5 rounded-sm font-semibold ${STATUS_COLOR[o.status]}`}>{o.status}</span>
                    </td>
                    <td className="px-3 py-3">
                      <Link href="/info/order-tracking" className="text-brand text-[12px] hover:underline">Chi tiết →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Đơn hàng — Trung tâm Buyer" };
