import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const KPIS = [
  { v: "187", l: "Đơn hàng tháng 5/2026", c: "text-brand", trend: "+12%" },
  { v: "23", l: "RFQ chưa trả lời", c: "text-accent", trend: "Cần xử lý" },
  { v: "412", l: "SKU đang bán", c: "text-success", trend: "+5 tuần này" },
  { v: "4.8 ★", l: "Đánh giá trung bình", c: "text-gold", trend: "Top 8% Gold" },
];

const ACTIVITY = [
  { time: "8 phút trước", text: "RFQ mới #RFQ-9145 từ Buyer Trần Văn A — 200 sofa L-shape velvet" },
  { time: "32 phút trước", text: "Đơn AVN-9018 đã thanh toán cọc 30% — bắt đầu sản xuất" },
  { time: "1 giờ 20 phút trước", text: "Đánh giá 5★ từ Nội thất Hà Đông cho lô bedroom set tháng 4" },
  { time: "3 giờ trước", text: "Audit nhà máy định kỳ TÜV sẽ diễn ra ngày 18/05 — chuẩn bị tài liệu QC" },
  { time: "Hôm qua", text: "Tin nhắn từ Buyer HCM hỏi về MOQ tủ TV oak veneer" },
];

const QUICK = [
  { label: "Trả lời RFQ", icon: "📨", href: "/seller-center/trade-ehome", color: "bg-accent" },
  { label: "Cập nhật giá FOB", icon: "💲", href: "/seller-center/trade-ehome", color: "bg-brand" },
  { label: "Đăng sản phẩm mới", icon: "➕", href: "/seller-center/trade-ehome", color: "bg-success" },
  { label: "Xem báo cáo doanh số", icon: "📊", href: "/seller-center/trade-ehome", color: "bg-gold text-brand-dark" },
];

const CHART = [
  { m: "T12", v: 42 },
  { m: "T1", v: 58 },
  { m: "T2", v: 65 },
  { m: "T3", v: 78 },
  { m: "T4", v: 124 },
  { m: "T5", v: 187 },
];

export default function SellerCenterPage() {
  const max = Math.max(...CHART.map((c) => c.v));
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Trung tâm người bán" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4 flex justify-between items-start max-md:flex-col max-md:gap-3">
            <div>
              <h1 className="text-[20px] font-bold text-ink">Chào, Công ty TNHH KUKA Home 🏭</h1>
              <p className="text-[12.5px] text-mute mt-1">
                Tổng quan hoạt động supplier · Cấp độ <span className="bg-gold/30 text-brand-dark px-1.5 py-0.5 rounded-sm font-bold">Gold Tier 3</span> · 6 năm liên tiếp
              </p>
            </div>
            <Link href="/seller-center/gold-member" className="text-[12px] bg-brand text-white px-3 py-2 rounded-sm font-semibold whitespace-nowrap">⭐ Nâng cấp Diamond</Link>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {KPIS.map((s) => (
              <div key={s.l} className="bg-paper border border-line rounded p-4">
                <b className={`block text-[24px] font-extrabold ${s.c}`}>{s.v}</b>
                <span className="text-[11.5px] text-mute mt-1 block">{s.l}</span>
                <span className="text-[10.5px] text-success block mt-1.5 font-semibold">{s.trend}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-4">
              <div className="flex justify-between items-center mb-3">
                <b className="text-[14px] text-ink">Hiệu suất 6 tháng (số đơn)</b>
                <span className="text-[10.5px] text-mute">cập nhật 12:30</span>
              </div>
              <svg viewBox="0 0 320 140" className="w-full h-[140px]">
                {CHART.map((c, i) => {
                  const h = (c.v / max) * 110;
                  const x = 20 + i * 50;
                  return (
                    <g key={c.m}>
                      <rect x={x} y={120 - h} width="34" height={h} fill={i === CHART.length - 1 ? "#E8302C" : "#1F4F8E"} rx="2" />
                      <text x={x + 17} y={135} fontSize="10" textAnchor="middle" fill="#6B7280">{c.m}</text>
                      <text x={x + 17} y={115 - h} fontSize="9.5" textAnchor="middle" fill="#0B1220" fontWeight="bold">{c.v}</text>
                    </g>
                  );
                })}
              </svg>
              <p className="text-[11px] text-mute mt-2">Tăng trưởng 145% so với cùng kỳ Q4/2025 — Tết 2026 và mùa cưới đẩy mạnh đơn furniture.</p>
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

          <div className="bg-paper border border-line rounded p-4 mb-4">
            <b className="block text-[14px] text-ink mb-3">Hành động nhanh</b>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {QUICK.map((q) => (
                <Link key={q.label} href={q.href} className={`${q.color} text-white rounded-sm p-3 hover:opacity-95 flex items-center gap-3`}>
                  <span className="text-[22px]">{q.icon}</span>
                  <b className="text-[12.5px] leading-tight">{q.label}</b>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link href="/seller-center/smart-expo" className="bg-gold/20 border border-gold rounded p-4 hover:bg-gold/30">
              <b className="block text-[14px] text-ink mb-1">🎪 Smart Expo Tháng 6 mở đăng ký</b>
              <p className="text-[12px] text-mute">Hội chợ ảo Furniture Asia 12-16/06 — 8K+ buyer Đông Nam Á tham dự. Đăng gian hàng ngay để được hỗ trợ thiết kế miễn phí.</p>
            </Link>
            <Link href="/seller-center/ai-assistant" className="bg-brand/10 border border-brand rounded p-4 hover:bg-brand/15">
              <b className="block text-[14px] text-ink mb-1">🤖 Maike AI: trả lời RFQ tự động</b>
              <p className="text-[12px] text-mute">Bật Maike để giảm 70% thời gian phản hồi — buyer thấy báo giá trong 5 phút thay vì 6 giờ. Free với gói Gold.</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Trung tâm người bán — AlibabaVN" };
