import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { SECTIONS } from "@/data/home";

const STATS = [
  { v: "12", l: "Đơn đang xử lý", c: "text-brand" },
  { v: "5", l: "RFQ đang chờ báo giá", c: "text-accent" },
  { v: "$12,420", l: "Tổng giá trị Q4/2026", c: "text-success" },
  { v: "23", l: "Sản phẩm yêu thích", c: "text-gold" },
];

const RECENT_RFQS = [
  { id: "RFQ-8421", product: "Porcelain tile 600×1200 calacatta", qty: "2,000 m²", quotes: 7, status: "Đang chờ" },
  { id: "RFQ-8417", product: "Sofa L-shape velvet xanh navy", qty: "30 set", quotes: 5, status: "Đang chờ" },
  { id: "RFQ-8412", product: "Smart toilet hotel 4-sao", qty: "80 pc", quotes: 9, status: "Đã đặt" },
];

const ACTIVITY = [
  { time: "12 phút trước", text: "Dongpeng Ceramics đã gửi báo giá cho RFQ-8421" },
  { time: "1 giờ trước", text: "Đơn AVN-7820 đã đến kho Bằng Tường" },
  { time: "3 giờ trước", text: "KUKA Home phản hồi tin nhắn của bạn" },
  { time: "Hôm qua", text: "RFQ-8412 đã chuyển sang trạng thái Đã đặt" },
];

const FEATURED = SECTIONS[0].products.slice(0, 4);

export default function BuyerCenterPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Trung tâm Buyer" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <h1 className="text-[20px] font-bold text-ink">Chào, Trần Văn A 👋</h1>
            <p className="text-[12.5px] text-mute mt-1">Đây là tổng quan hoạt động của bạn trong tháng này.</p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {STATS.map((s) => (
              <div key={s.l} className="bg-paper border border-line rounded p-4">
                <b className={`block text-[24px] font-extrabold ${s.c}`}>{s.v}</b>
                <span className="text-[11.5px] text-mute mt-1 block">{s.l}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-4">
              <div className="flex justify-between items-center mb-3">
                <b className="text-[14px] text-ink">RFQ gần đây</b>
                <Link href="/buying-request" className="text-brand text-[12px]">+ RFQ mới</Link>
              </div>
              <table className="w-full text-[12.5px]">
                <thead className="text-mute">
                  <tr className="border-b border-line">
                    <th className="text-left py-1.5 font-medium">Mã</th>
                    <th className="text-left py-1.5 font-medium">Sản phẩm</th>
                    <th className="text-left py-1.5 font-medium">Báo giá</th>
                    <th className="text-left py-1.5 font-medium">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_RFQS.map((r) => (
                    <tr key={r.id} className="border-b border-line last:border-0">
                      <td className="py-2 text-brand">{r.id}</td>
                      <td className="py-2 text-ink truncate max-w-[180px]">{r.product}</td>
                      <td className="py-2 text-success font-semibold">{r.quotes}</td>
                      <td className="py-2 text-mute">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-paper border border-line rounded p-4">
              <b className="block text-[14px] text-ink mb-3">Hoạt động gần đây</b>
              <ul className="space-y-2.5">
                {ACTIVITY.map((a, i) => (
                  <li key={i} className="text-[12.5px] border-b border-dashed border-line pb-2 last:border-0">
                    <span className="text-mute text-[11px] block">{a.time}</span>
                    <span className="text-ink">{a.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <div className="flex justify-between items-center mb-3">
              <b className="text-[14px] text-ink">Sản phẩm gợi ý cho bạn</b>
              <Link href="/products" className="text-brand text-[12px]">Xem thêm →</Link>
            </div>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {FEATURED.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="border border-line rounded-sm overflow-hidden hover:border-brand block">
                  <div className="aspect-square bg-[#F5F5F5]">
                    {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
                  </div>
                  <div className="p-2">
                    <h4 className="text-[12px] text-ink line-clamp-2 mb-1">{p.title}</h4>
                    <div className="text-accent font-bold text-[13px]">{p.price}<small className="text-mute font-normal text-[10px]">{p.unit}</small></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Trung tâm Buyer — Cybersilkroads" };
