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
          <img src="/img/tradeshow-hero.jpg?v=3" alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 px-8 py-7 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
            <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">⚡ HỘI CHỢ THƯƠNG MẠI</span>
            <h1 className="text-[34px] font-extrabold leading-tight max-md:text-[24px]">Tham gia hội chợ cùng Cybersilkroads</h1>
            <p className="text-[13.5px] opacity-90 max-w-[600px] mt-2">Đặt vé, hỗ trợ visa, đặt khách sạn, tour thăm nhà máy. Tham gia 8+ hội chợ lớn tại Trung Quốc mỗi năm.</p>
          </div>
        </div>
      </div>

      {/* Featured — Hội nghị B2B Matching (VGEA) */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <div className="bg-paper border-2 border-accent rounded p-5">
          <span className="inline-block bg-accent text-white px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2">⚡ ĐIỂM CỐT LÕI · DO VGEA TỔ CHỨC</span>
          <h2 className="text-[24px] font-extrabold text-ink mb-1 max-md:text-[20px]">🤝 Hội nghị B2B Matching — Miễn phí, theo từng lĩnh vực</h2>
          <p className="text-[13.5px] text-mute leading-relaxed mb-4 max-w-[860px]">
            Hội nghị kết nối trực tiếp nhà máy Trung Quốc với doanh nghiệp Việt Nam, do <b className="text-ink">Hiệp hội Thương mại điện tử Toàn cầu Việt Nam (VGEA)</b> tổ chức.
            Hoàn toàn <b className="text-accent">MIỄN PHÍ cho cả hai phía</b> — không thu phí gian hàng, không phí tham dự. Mỗi hội nghị tập trung vào <b className="text-ink">một lĩnh vực cụ thể</b>.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-4 max-md:grid-cols-1">
            <div className="border border-line rounded p-4 bg-surface-2">
              <b className="block text-[14px] text-ink mb-1">💸 Miễn phí 2 chiều</b>
              <p className="text-[12.5px] text-mute leading-relaxed">Doanh nghiệp Trung Quốc và Việt Nam đều tham dự miễn phí. VGEA chịu trách nhiệm tổ chức, kết nối và phiên dịch.</p>
            </div>
            <div className="border border-line rounded p-4 bg-surface-2">
              <b className="block text-[14px] text-ink mb-1">📊 Kích hoạt theo dữ liệu</b>
              <p className="text-[12.5px] text-mute leading-relaxed">Không cố định lịch trước. Hội nghị được kích hoạt theo <b className="text-ink">"điểm bùng phát"</b> của dữ liệu nhu cầu thực tế — mở đúng lĩnh vực, đúng thời điểm thị trường cần.</p>
            </div>
            <div className="border border-line rounded p-4 bg-surface-2">
              <b className="block text-[14px] text-ink mb-1">🏭 Theo từng lĩnh vực</b>
              <p className="text-[12.5px] text-mute leading-relaxed">Mỗi kỳ tổ chức riêng cho một ngành (nội thất, vật liệu xây dựng, đèn LED, sanitary…) để buyer và nhà máy gặp đúng đối tác.</p>
            </div>
          </div>

          <div className="border border-gold rounded p-4 bg-cream mb-4">
            <b className="block text-[14px] text-ink mb-2">✅ Điều kiện BẮT BUỘC với nhà máy Trung Quốc tham dự</b>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 max-md:grid-cols-1">
              <span className="text-[12.5px] text-mute">👤 Hiện diện <b className="text-ink">trực tiếp</b> tại hội nghị</span>
              <span className="text-[12.5px] text-mute">📦 Mang theo <b className="text-ink">sản phẩm mẫu vật lý</b></span>
              <span className="text-[12.5px] text-mute">🎥 Video dây chuyền nhà xưởng <b className="text-ink">không cắt ghép</b></span>
              <span className="text-[12.5px] text-mute">📖 Đầy đủ <b className="text-ink">catalog</b> sản phẩm</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="border border-line rounded p-4 bg-surface-2 flex gap-3 items-start">
              <span className="text-[22px]">📱</span>
              <div>
                <b className="block text-[13.5px] text-ink mb-0.5">Quét QR tại bàn nhà máy</b>
                <p className="text-[12.5px] text-mute leading-relaxed">Buyer quét mã QR ngay tại bàn của nhà máy để mở trang sản phẩm tương ứng trên cybersilkroads.com.</p>
              </div>
            </div>
            <div className="border border-line rounded p-4 bg-surface-2 flex gap-3 items-start">
              <span className="text-[22px]">💬</span>
              <div>
                <b className="block text-[13.5px] text-ink mb-0.5">Chat 1-1 dịch real-time</b>
                <p className="text-[12.5px] text-mute leading-relaxed">Trao đổi trực tiếp với nhà máy qua chat 1-1, dịch <b className="text-ink">Việt – Trung tức thời</b>, không cần phiên dịch viên riêng.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Link href="/buying-request" className="px-5 py-2.5 bg-accent text-white rounded-sm font-bold text-[13px]">Đăng ký nhận lịch Hội nghị B2B Matching →</Link>
            <Link href="/trade-alert" className="px-5 py-2.5 border border-brand text-brand rounded-sm font-semibold text-[13px]">Nhận cảnh báo theo lĩnh vực</Link>
          </div>
        </div>
      </div>

      {/* Featured Canton Fair */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <p className="text-[12.5px] text-mute mb-3">
          Ngoài Hội nghị B2B Matching, Cybersilkroads còn <b className="text-ink">hỗ trợ doanh nghiệp tham dự các hội chợ quốc tế</b> dưới đây (đây là dịch vụ hỗ trợ tham dự, không phải hội nghị matching của VGEA).
        </p>
        <div className="bg-paper border-2 border-gold rounded p-5 grid grid-cols-[1fr_280px] gap-5 max-md:grid-cols-1">
          <div>
            <span className="inline-block bg-accent text-white px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2">NỔI BẬT · HỘI CHỢ B2B LỚN NHẤT</span>
            <h2 className="text-[22px] font-bold text-ink mb-1">🇨🇳 Canton Fair 2026 — Hội chợ Quảng Châu</h2>
            <p className="text-[13px] text-mute leading-relaxed mb-3">Hội chợ B2B lớn nhất thế giới — diễn ra 2 lần/năm tại Quảng Châu Pazhou với 60.000+ NCC, 200.000+ buyer quốc tế. Cybersilkroads tổ chức đoàn 50 dealer VN tham dự mỗi kỳ.</p>
            <div className="grid grid-cols-2 gap-3 mb-4 max-md:grid-cols-1">
              <div className="border border-line rounded p-3 bg-surface-2">
                <b className="block text-[13px] text-ink">📅 Phase 1 — Spring 2026</b>
                <span className="text-[12px] text-mute">15 Apr – 5 May 2026 (3 đợt)</span>
                <p className="text-[11.5px] text-mute mt-1">Vật liệu xây dựng, máy móc, năng lượng</p>
              </div>
              <div className="border border-line rounded p-3 bg-surface-2">
                <b className="block text-[13px] text-ink">📅 Phase 2 — Autumn 2026</b>
                <span className="text-[12px] text-mute">15 Oct – 4 Nov 2026 (3 đợt)</span>
                <p className="text-[11.5px] text-mute mt-1">Nội thất, sanitary, đèn, dệt may</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link href="/buying-request" className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm font-bold text-[13px]">Đặt vé Canton Fair →</Link>
              <Link href="/info/audit-process" className="px-5 py-2.5 border border-brand text-brand rounded-sm font-semibold text-[13px]">Xem lịch sử Canton Fair</Link>
            </div>
          </div>
          <img src="/img/cantonfair.jpg?v=3" alt="Canton Fair" className="w-full h-full object-cover rounded" />
        </div>
      </div>

      {/* Upcoming list */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">Hội chợ sắp diễn ra</h2>
        <div className="bg-paper border border-line rounded overflow-hidden">
          {UPCOMING.map((s, i) => (
            <div key={s.name} className={`grid grid-cols-[1fr_180px_220px_140px_120px] gap-4 px-4 py-3.5 text-[13px] hover:bg-surface-2 max-md:grid-cols-1 max-md:gap-1 ${i > 0 ? "border-t border-line" : ""}`}>
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
            <div key={i} className="aspect-video bg-surface-1 rounded overflow-hidden">
              <img src={`/img/tradeshow-past-${i}.jpg?v=3`} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5 mb-7">
        <div className="bg-brand-dark text-white rounded p-6 flex justify-between items-center max-md:flex-col max-md:gap-4 max-md:text-center">
          <div>
            <h3 className="text-[20px] font-bold mb-1">🎫 Đặt vé tham quan có hỗ trợ</h3>
            <p className="text-[13px] opacity-85">Cybersilkroads lo trọn gói: vé, visa, khách sạn, dịch giả, tour nhà máy. Giá từ $890/3 ngày.</p>
          </div>
          <Link href="/buying-request" className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px]">Đăng ký tour →</Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Trade Shows — Cybersilkroads" };
