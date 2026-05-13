import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const CHANNELS = [
  { icon: "📦", name: "Amazon FBA", desc: "Marketplace #1 Bắc Mỹ. Bán B2C, FBA lo kho-ship-CS. Phù hợp consumer goods, electronics, home.", users: "200M+ Prime", commission: "8-15%", img: 61 },
  { icon: "🛒", name: "Walmart Marketplace", desc: "Tăng trưởng 38% YoY. Phí thấp hơn Amazon, ưu tiên product made in USA + supplier minority.", users: "120M+ tháng", commission: "6-15%", img: 62 },
  { icon: "🛍", name: "Shopify Plus", desc: "Xây website thương hiệu riêng. Margin cao nhất, nhưng phải tự lo traffic. Phù hợp brand đã có nhận diện.", users: "Tự traffic", commission: "$2K/tháng", img: 63 },
  { icon: "🌐", name: "Independent website", desc: "Đầu tư DTC website + Google Shopping + Meta Ads. Kiểm soát 100% data + customer relationship.", users: "Tự build", commission: "10-20% ad spend", img: 64 },
];

const SERVICES = [
  { icon: "📋", title: "Đăng ký EIN + brand registry", desc: "Mở LLC Delaware, EIN tax ID, FDA cho food/cosmetic, FCC cho electronics. Trademark USPTO." },
  { icon: "🏬", title: "Setup kho FBA + 3PL", desc: "Inbound FCL từ TQ → 4 trung tâm FBA Mỹ. Backup 3PL kho riêng để né phí storage cao mùa peak." },
  { icon: "📣", title: "Quảng cáo Amazon PPC + DSP", desc: "Đội Mỹ chạy Sponsored Products, Sponsored Brand video, DSP retargeting. ACOS mục tiêu < 18%." },
  { icon: "💬", title: "Customer service tiếng Anh", desc: "Đội Mỹ + AI 24/7 trả lời review, message, A-to-Z claim. Giữ rating 4.5+ là sống còn trên Amazon." },
  { icon: "🔄", title: "Quản lý trả hàng (returns)", desc: "Trả hàng Mỹ về kho 3PL, refurbish hoặc liquidate. Tỷ lệ return Amazon TB 12-18% cho home goods." },
  { icon: "🧾", title: "Tax compliance (sales tax)", desc: "Đăng ký nexus 12 bang Mỹ, file định kỳ qua TaxJar. EIN & 1099-K reporting." },
];

const CASES = [
  {
    company: "Foshan Tile Master",
    product: "Vinyl flooring",
    desc: "Mở Amazon FBA tháng 11/2024 với 4 SKU. Sau 14 tháng đạt $2.4M doanh thu, top 50 Flooring. Margin 28% sau Amazon fees.",
    metric: "$2.4M / 14 tháng",
    img: 71,
  },
  {
    company: "Shenzhen LED Co.",
    product: "Smart LED bulbs",
    desc: "Walmart Marketplace + Shopify hybrid. Walmart drive volume, Shopify cao margin. Tăng từ $40K/tháng (cuối 2024) lên $480K/tháng (2026).",
    metric: "12× tăng trưởng",
    img: 72,
  },
  {
    company: "Guangzhou Garment",
    product: "Activewear",
    desc: "Shopify DTC + Meta Ads. Đầu tư $80K/tháng marketing, ROAS 2.8×. Xây thương hiệu riêng, exit roadmap 5 năm.",
    metric: "ROAS 2.8× ổn định",
    img: 73,
  },
];

const TIERS = [
  { name: "Starter", price: "$999", per: "/tháng", channels: "1 channel", skus: "Tới 50 SKU", ad: "Up to $5K/tháng PPC", support: "Email business hours" },
  { name: "Pro", price: "$2,499", per: "/tháng", channels: "3 channels", skus: "Tới 500 SKU", ad: "Up to $25K/tháng PPC", support: "Quản lý chuyên trách, weekly call", highlight: true },
  { name: "Enterprise", price: "$4,999", per: "/tháng", channels: "Tất cả channels", skus: "Không giới hạn", ad: "Up to $100K/tháng PPC", support: "Dedicated team, 24/7" },
];

export default function ExportNaPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực nhà bán", href: "/seller-center" }, { label: "Xuất khẩu Bắc Mỹ" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/export-na" />
        <div>
          <div className="bg-gradient-to-br from-blue-700 to-red-600 text-white rounded p-6 mb-4" style={{ background: "linear-gradient(135deg,#1e40af,#dc2626)" }}>
            <div className="inline-block bg-white text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🌎 NORTH AMERICA OMNI-CHANNEL</div>
            <h1 className="text-[26px] font-bold leading-tight">Xuất khẩu đa kênh Bắc Mỹ — Mỹ · Canada · Mexico</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              480 triệu người tiêu dùng. GDP $30 nghìn tỷ. Cybersilkroads đồng hành NCC TQ "đổ bộ" Bắc Mỹ — từ EIN, FBA, PPC, customer service tiếng Anh, tới sales tax compliance. Một đối tác, 4 kênh bán hàng.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 max-md:grid-cols-1">
            {CHANNELS.map((c) => (
              <div key={c.name} className="bg-paper border border-line rounded p-4 hover:border-brand grid grid-cols-[80px_1fr] gap-3">
                <img src={`/img/seller-na-${c.img}.jpg?v=3`} alt="" className="w-20 h-20 rounded object-cover" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[20px]">{c.icon}</span>
                    <b className="text-[14px] text-ink">{c.name}</b>
                  </div>
                  <p className="text-[11.5px] text-mute leading-relaxed mb-2">{c.desc}</p>
                  <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                    <div><span className="text-mute">Audience:</span> <b className="text-brand">{c.users}</b></div>
                    <div><span className="text-mute">Phí:</span> <b className="text-accent">{c.commission}</b></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🎁 Hỗ trợ trọn gói — 6 dịch vụ</b>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {SERVICES.map((s) => (
                <div key={s.title} className="border border-line rounded p-4 hover:border-brand">
                  <div className="text-[24px] mb-2">{s.icon}</div>
                  <b className="block text-[13px] text-ink mb-1">{s.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🏆 Case studies — NCC đã thành công Bắc Mỹ</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.company} className="border border-line rounded overflow-hidden hover:border-brand">
                  <img src={`/img/seller-na-case-${c.img}.jpg?v=3`} alt="" className="w-full h-[140px] object-cover" />
                  <div className="p-4">
                    <b className="block text-[13px] text-ink mb-1">{c.company}</b>
                    <span className="text-[11px] text-brand block mb-2">{c.product}</span>
                    <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                    <div className="border-t border-line pt-2 flex justify-between items-baseline">
                      <span className="text-[10.5px] text-mute">Kết quả</span>
                      <b className="text-[13px] text-success">{c.metric}</b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">💲 Bảng giá — 3 gói linh hoạt</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {TIERS.map((t) => (
                <div key={t.name} className={`border-2 rounded p-4 ${t.highlight ? "border-accent ring-2 ring-accent/30 relative" : "border-line"}`}>
                  {t.highlight && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">PHỔ BIẾN</div>}
                  <b className="block text-[16px] text-ink">{t.name}</b>
                  <div className="my-3"><span className="text-[24px] font-extrabold text-accent">{t.price}</span><span className="text-[11px] text-mute">{t.per}</span></div>
                  <ul className="space-y-1.5 text-[11.5px]">
                    <li className="text-ink"><b>Channels:</b> {t.channels}</li>
                    <li className="text-ink"><b>SKUs:</b> {t.skus}</li>
                    <li className="text-ink"><b>Ad budget:</b> {t.ad}</li>
                    <li className="text-ink"><b>Support:</b> {t.support}</li>
                  </ul>
                  <button className={`w-full mt-4 ${t.highlight ? "bg-accent" : "bg-brand"} text-white rounded-sm py-2 text-[12.5px] font-semibold`}>
                    Bắt đầu {t.name} →
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Link href="#" className="block bg-brand-dark text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">🌎 Đặt lịch tư vấn miễn phí (60 phút)</b>
            <p className="text-[12.5px] opacity-90">Đội Mỹ + Quảng Châu phân tích sản phẩm của bạn — chọn channel + ngân sách hợp lý.</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Xuất khẩu Bắc Mỹ — Seller Center" };
