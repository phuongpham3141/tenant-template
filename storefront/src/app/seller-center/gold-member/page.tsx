import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const TIERS = [
  {
    name: "Miễn phí",
    price: "$0",
    per: "/năm",
    color: "border-line",
    badge: "Miễn phí",
    cta: "Đang sử dụng",
    ctaColor: "bg-mute2/30 text-mute",
    desc: "Cho NCC mới, thử nghiệm thị trường",
  },
  {
    name: "Vàng",
    price: "$2,980",
    per: "/năm",
    color: "border-gold ring-2 ring-gold",
    badge: "PHỔ BIẾN NHẤT",
    cta: "Nâng cấp Vàng",
    ctaColor: "bg-gold text-brand-dark",
    desc: "Cho NCC nghiêm túc xuất khẩu sang VN",
    highlight: true,
  },
  {
    name: "Kim cương",
    price: "$6,800",
    per: "/năm",
    color: "border-brand",
    badge: "Premium",
    cta: "Liên hệ tư vấn",
    ctaColor: "bg-brand text-white",
    desc: "Cho thương hiệu lớn, cần tối đa exposure",
  },
];

const FEATURES = [
  { name: "Số sản phẩm đăng tối đa", free: "30 SKU", gold: "5,000 SKU", diamond: "Không giới hạn" },
  { name: "RFQ nhận / tháng", free: "10", gold: "Không giới hạn", diamond: "Không giới hạn + ưu tiên" },
  { name: "Vị trí trong kết quả tìm kiếm", free: "Bình thường", gold: "Top 30%", diamond: "Top 5%" },
  { name: "Banner trang chủ ngành", free: "—", gold: "✓ (luân phiên)", diamond: "✓ (cố định 1 slot)" },
  { name: "Audit nhà máy + báo cáo TÜV", free: "Tự trả $1,200", gold: "1 lần / năm miễn phí", diamond: "2 lần / năm miễn phí" },
  { name: "Phù hiệu Vàng + nhà bán đã xác minh", free: "—", gold: "✓", diamond: "✓ + vương miện Kim cương" },
  { name: "Dashboard analytics chi tiết", free: "Cơ bản", gold: "Đầy đủ", diamond: "Đầy đủ + competitor data" },
  { name: "AI trợ lý Maike", free: "Demo 7 ngày", gold: "✓ Free", diamond: "✓ Free + custom training" },
  { name: "Account manager riêng", free: "—", gold: "Chia sẻ", diamond: "Chuyên trách" },
  { name: "Tham dự Smart Expo", free: "1 expo / năm", gold: "Tất cả expo", diamond: "Tất cả + booth premium" },
];

const TESTIMONIALS = [
  {
    company: "Shenzhen Lighting Co.",
    role: "CEO Lý Cường",
    quote: "Sau 3 tháng nâng Vàng, đơn từ buyer Việt Nam tăng 4× — chủ yếu nhờ banner ngành đèn LED và RFQ ưu tiên. ROI bù phí Vàng trong tháng đầu.",
    metric: "+312% đơn",
    avatar: 41,
  },
  {
    company: "Foshan Tile Master",
    role: "Sales Director Trương Mỹ",
    quote: "Buyer HCM tìm gạch porcelain trên Cybersilkroads — Vàng đẩy chúng tôi lên top 3 kết quả. RFQ inbound từ 8/tháng lên 47/tháng. Audit TÜV miễn phí giúp ký được chuỗi khách sạn lớn.",
    metric: "47 RFQ/tháng",
    avatar: 42,
  },
  {
    company: "Guangzhou KUKA Home",
    role: "Export Manager Vương Hoa",
    quote: "Kim cương + Triển lãm thông minh cho phép chúng tôi tiếp cận 12K buyer Đông Nam Á trong 1 tuần — bằng 6 tháng làm trade fair offline. Phí 6.8K USD nhỏ so với chi phí Canton Fair $40K+.",
    metric: "12K buyer/expo",
    avatar: 43,
  },
];

const ROI_ROWS = [
  { label: "Đơn hàng trung bình hiện tại / tháng", v: "$4,200" },
  { label: "Tăng trưởng dự kiến với Vàng (3.2×)", v: "+$13,440" },
  { label: "Phí Vàng năm (chia 12 tháng)", v: "−$248" },
  { label: "Lãi ròng tăng thêm / tháng (margin 22%)", v: "+$2,729" },
];

export default function GoldMemberPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực nhà bán", href: "/seller-center" }, { label: "Đăng ký Hội viên Vàng" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/gold-member" />
        <div>
          <div className="bg-gradient-to-br from-gold/40 to-gold/10 border border-gold rounded p-5 mb-4">
            <div className="inline-block bg-brand-dark text-gold px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🥇 GOLD MEMBERSHIP</div>
            <h1 className="text-[24px] font-bold text-ink">Trở thành NCC Vàng — đột phá xuất khẩu Việt Nam</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed max-w-[680px]">
              91% đơn hàng B2B trên Cybersilkroads đến từ NCC Vàng/Kim cương. Khi buyer tìm kiếm "gạch porcelain MOQ 500m²" hay "OEM tủ bếp", thuật toán ưu tiên hiển thị suppliers có badge — Vàng = lòng tin + traffic + báo cáo audit minh bạch.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-5 max-md:grid-cols-1">
            {TIERS.map((t) => (
              <div key={t.name} className={`bg-paper border-2 ${t.color} rounded p-5 relative`}>
                {t.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-brand-dark text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-sm tracking-wider">
                    {t.badge}
                  </div>
                )}
                <h3 className="text-[18px] font-bold text-ink">{t.name}</h3>
                <p className="text-[11.5px] text-mute mt-1 mb-3">{t.desc}</p>
                <div className="mb-4">
                  <span className="text-[28px] font-extrabold text-ink">{t.price}</span>
                  <span className="text-[12px] text-mute">{t.per}</span>
                </div>
                <button className={`block w-full ${t.ctaColor} rounded-sm py-2.5 text-[12.5px] font-semibold`}>
                  {t.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4 overflow-x-auto">
            <b className="block text-[15px] text-ink mb-4">📋 So sánh tính năng chi tiết</b>
            <table className="w-full text-[12.5px] min-w-[640px]">
              <thead className="bg-surface-2 text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">Tính năng</th>
                  <th className="text-center px-3 py-2.5 font-medium">Miễn phí</th>
                  <th className="text-center px-3 py-2.5 font-medium bg-gold/15 text-brand-dark">Vàng</th>
                  <th className="text-center px-3 py-2.5 font-medium">Kim cương</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((f) => (
                  <tr key={f.name} className="border-t border-line">
                    <td className="px-3 py-2.5 text-ink">{f.name}</td>
                    <td className="px-3 py-2.5 text-center text-mute">{f.free}</td>
                    <td className="px-3 py-2.5 text-center text-ink font-semibold bg-gold/5">{f.gold}</td>
                    <td className="px-3 py-2.5 text-center text-brand font-semibold">{f.diamond}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">💬 Nhà cung cấp đã thành công với Vàng</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {TESTIMONIALS.map((t) => (
                <div key={t.company} className="border border-line rounded p-4 bg-surface-2">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={`/img/seller-gold-${t.avatar}.jpg?v=3`} alt="" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <b className="block text-[12.5px] text-ink leading-tight">{t.company}</b>
                      <span className="text-[11px] text-mute">{t.role}</span>
                    </div>
                  </div>
                  <p className="text-[12px] text-ink leading-relaxed mb-3">"{t.quote}"</p>
                  <div className="border-t border-line pt-2 flex justify-between items-baseline">
                    <span className="text-[10.5px] text-mute">Kết quả</span>
                    <b className="text-[14px] text-success">{t.metric}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[15px] text-ink mb-3">📊 Tính ROI Vàng</b>
              <p className="text-[11.5px] text-mute mb-3">Dựa trên trung bình 142 supplier furniture đã nâng Vàng trong 12 tháng qua.</p>
              <table className="w-full text-[12.5px]">
                <tbody>
                  {ROI_ROWS.map((r, i) => (
                    <tr key={r.label} className={`border-b border-line last:border-0 ${i === ROI_ROWS.length - 1 ? "bg-success/10 font-bold" : ""}`}>
                      <td className="py-2 text-ink">{r.label}</td>
                      <td className="py-2 text-right text-accent font-semibold">{r.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[11px] text-mute mt-3">* Số liệu mang tính tham khảo. Phụ thuộc ngành hàng, vị trí kho, năng lực sản xuất.</p>
            </div>

            <div className="bg-brand-dark text-white rounded p-5 flex flex-col justify-center">
              <b className="block text-[18px] mb-2">🚀 Sẵn sàng nâng cấp?</b>
              <p className="text-[12.5px] opacity-90 leading-relaxed mb-4">
                Hôm nay đăng ký Vàng — kích hoạt trong 24h, kèm gói audit TÜV trị giá $1,200 và banner ngành 30 ngày miễn phí cho 50 đăng ký đầu tiên tháng 5.
              </p>
              <button className="bg-gold text-brand-dark rounded-sm py-3 font-bold text-[14px] hover:opacity-95">
                Nâng cấp Vàng ngay — $2,980/năm
              </button>
              <span className="text-[11px] opacity-70 mt-2 text-center">Không hài lòng trong 30 ngày → hoàn 100% phí.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Đăng ký Hội viên Vàng — Seller Center" };
