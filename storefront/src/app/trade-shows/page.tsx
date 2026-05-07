import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const UPCOMING = [
  { name: "Vietnam Expo 2026", date: "12 - 15 Apr 2026", venue: "Hà Nội ICE", industry: "Tổng hợp", country: "VN" },
  { name: "Furniture China 2026", date: "8 - 11 Sep 2026", venue: "Shanghai NECC", industry: "Nội thất", country: "CN" },
  { name: "Ceramics China", date: "18 - 21 May 2026", venue: "Foshan Tanzhou", industry: "Gạch ốp lát", country: "CN" },
  { name: "Hong Kong Lighting Fair", date: "27 - 30 Oct 2026", venue: "HKCEC", industry: "Đèn LED", country: "HK" },
  { name: "Bauma China 2026", date: "12 - 16 Oct 2026", venue: "Shanghai SNIEC", industry: "Vật liệu xây dựng", country: "CN" },
  { name: "Kitchen & Bath China", date: "1 - 4 Jun 2026", venue: "Shanghai NECC", industry: "Bếp & Sanitary", country: "CN" },
];

export default function TradeShowsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Trade Shows" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[220px] bg-brand-dark">
          <img src="https://picsum.photos/seed/tradeshow-hero/1400/300" alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 px-8 py-7 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
            <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">⚡ HỘI CHỢ THƯƠNG MẠI</span>
            <h1 className="text-[34px] font-extrabold leading-tight max-md:text-[24px]">Tham gia hội chợ cùng AlibabaVN</h1>
            <p className="text-[13.5px] opacity-90 max-w-[600px] mt-2">Đặt vé, hỗ trợ visa, đặt khách sạn, tour thăm nhà máy. Tham gia 8+ hội chợ lớn tại Trung Quốc mỗi năm.</p>
          </div>
        </div>
      </div>

      {/* Featured Canton Fair */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <div className="bg-paper border-2 border-gold rounded p-5 grid grid-cols-[1fr_280px] gap-5 max-md:grid-cols-1">
          <div>
            <span className="inline-block bg-accent text-white px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2">FEATURED · LARGEST B2B FAIR</span>
            <h2 className="text-[22px] font-bold text-ink mb-1">🇨🇳 Canton Fair 2026 — Hội chợ Quảng Châu</h2>
            <p className="text-[13px] text-mute leading-relaxed mb-3">Hội chợ B2B lớn nhất thế giới — diễn ra 2 lần/năm tại Quảng Châu Pazhou với 60.000+ NCC, 200.000+ buyer quốc tế. AlibabaVN tổ chức đoàn 50 dealer VN tham dự mỗi kỳ.</p>
            <div className="grid grid-cols-2 gap-3 mb-4 max-md:grid-cols-1">
              <div className="border border-line rounded p-3 bg-[#FAFBFC]">
                <b className="block text-[13px] text-ink">📅 Phase 1 — Spring 2026</b>
                <span className="text-[12px] text-mute">15 Apr – 5 May 2026 (3 đợt)</span>
                <p className="text-[11.5px] text-mute mt-1">Vật liệu xây dựng, máy móc, năng lượng</p>
              </div>
              <div className="border border-line rounded p-3 bg-[#FAFBFC]">
                <b className="block text-[13px] text-ink">📅 Phase 2 — Autumn 2026</b>
                <span className="text-[12px] text-mute">15 Oct – 4 Nov 2026 (3 đợt)</span>
                <p className="text-[11.5px] text-mute mt-1">Nội thất, sanitary, đèn, dệt may</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link href="/buying-request" className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm font-bold text-[13px]">Đặt vé Canton Fair →</Link>
              <Link href="/info/quy-trinh-audit" className="px-5 py-2.5 border border-brand text-brand rounded-sm font-semibold text-[13px]">Xem lịch sử Canton Fair</Link>
            </div>
          </div>
          <img src="https://picsum.photos/seed/cantonfair/600/400" alt="Canton Fair" className="w-full h-full object-cover rounded" />
        </div>
      </div>

      {/* Upcoming list */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">Hội chợ sắp diễn ra</h2>
        <div className="bg-paper border border-line rounded overflow-hidden">
          {UPCOMING.map((s, i) => (
            <div key={s.name} className={`grid grid-cols-[1fr_180px_220px_140px_120px] gap-4 px-4 py-3.5 text-[13px] hover:bg-[#FAFBFC] max-md:grid-cols-1 max-md:gap-1 ${i > 0 ? "border-t border-line" : ""}`}>
              <b className="text-ink">{s.name}</b>
              <span className="text-mute">📅 {s.date}</span>
              <span className="text-mute">📍 {s.venue}</span>
              <span className="text-brand">{s.industry}</span>
              <Link href="/buying-request" className="text-brand text-[12px] font-semibold hover:underline">Đặt vé →</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery past */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">Xem lại các kỳ trước</h2>
        <div className="grid grid-cols-4 gap-2 max-md:grid-cols-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-video bg-[#F5F5F5] rounded overflow-hidden">
              <img src={`https://picsum.photos/seed/tradeshow-past-${i}/400/240`} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5 mb-7">
        <div className="bg-brand-dark text-white rounded p-6 flex justify-between items-center max-md:flex-col max-md:gap-4 max-md:text-center">
          <div>
            <h3 className="text-[20px] font-bold mb-1">🎫 Đặt vé tham quan có hỗ trợ</h3>
            <p className="text-[13px] opacity-85">AlibabaVN lo trọn gói: vé, visa, khách sạn, dịch giả, tour nhà máy. Giá từ $890/3 ngày.</p>
          </div>
          <Link href="/buying-request" className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px]">Đăng ký tour →</Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Trade Shows — AlibabaVN" };
