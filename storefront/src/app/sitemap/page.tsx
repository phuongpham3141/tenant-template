import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { ARTICLES } from "@/lib/blog";

type SitemapLink = { label: string; href: string; desc?: string };

type SitemapSection = {
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  links: SitemapLink[];
};

const SECTIONS: SitemapSection[] = [
  {
    icon: "🏠",
    color: "var(--color-brand)",
    title: "Trang chủ & Khám phá",
    subtitle: "Điểm vào chính của nền tảng",
    links: [
      { label: "Trang chủ", href: "/", desc: "Điểm khởi đầu — featured products, RFQ form, promotions" },
      { label: "Tất cả sản phẩm", href: "/products", desc: "Catalog 200K+ SKU từ 1,840+ NCC verified" },
      { label: "Tìm kiếm", href: "/search", desc: "Full-text search theo SKU, NCC, ngành" },
      { label: "Tìm kiếm bằng hình ảnh", href: "/search/by-image", desc: "Upload ảnh để tìm sản phẩm tương tự" },
      { label: "Suppliers", href: "/suppliers", desc: "Danh sách 1,840+ NCC đã pass audit" },
      { label: "Zones", href: "/zones", desc: "Sản xuất theo cluster — Foshan, Đông Quan, Yiwu..." },
      { label: "Industry Channels", href: "/industry-channels", desc: "Kênh chuyên ngành — nội thất, sanitary, điện tử..." },
      { label: "Factory Tour", href: "/factory-tour", desc: "Video tour 360° nhà máy đối tác" },
    ],
  },
  {
    icon: "🛒",
    color: "#16A34A",
    title: "Mua hàng (Buyer)",
    subtitle: "Quy trình từ RFQ đến nhận hàng",
    links: [
      { label: "Gửi RFQ — Yêu cầu báo giá", href: "/buying-request", desc: "Form RFQ — AI matching đẩy 5-10 NCC trong 24h" },
      { label: "Cảnh báo Thương mại (Newsletter)", href: "/trade-alert", desc: "12,000+ buyer đăng ký — tin tức + sale alert tuần" },
      { label: "Trade Shows 2026", href: "/trade-shows", desc: "12 sự kiện CSR đại diện hoặc đồng tổ chức" },
      { label: "Trung tâm trợ giúp", href: "/help", desc: "300+ bài hướng dẫn theo 5 stage hành trình mua" },
    ],
  },
  {
    icon: "📊",
    color: "#0891B2",
    title: "Buyer Center — Sau khi đăng nhập",
    subtitle: "Dashboard người mua với 12 chức năng",
    links: [
      { label: "Trang tổng quan", href: "/buyer-center", desc: "Tổng hợp RFQ, đơn hàng, tin nhắn" },
      { label: "Đơn hàng của tôi", href: "/buyer-center/orders", desc: "Tracking realtime, ảnh/video từng mốc" },
      { label: "Sản phẩm yêu thích", href: "/buyer-center/favorites", desc: "Wishlist các SKU đang cân nhắc" },
      { label: "Báo cáo audit nhà máy", href: "/buyer-center/audited-reports", desc: "Download báo cáo audit ký số blockchain" },
      { label: "Lịch sử duyệt", href: "/buyer-center/browsing-history", desc: "Sản phẩm đã xem 30 ngày gần nhất" },
      { label: "Liên hệ — chat", href: "/buyer-center/contact", desc: "Chat với quản lý tài khoản, NCC" },
      { label: "Gặp NCC trực tuyến", href: "/buyer-center/meet-suppliers", desc: "Đặt video call với NCC qua dispatcher CSR" },
      { label: "Hướng dẫn buyer mới", href: "/buyer-center/new-user-guide", desc: "30 ngày đầu — onboarding chi tiết" },
      { label: "Đăng RFQ", href: "/buyer-center/post-rfq", desc: "Multi-supplier RFQ với template ngành" },
      { label: "Product Directory", href: "/buyer-center/product-directory", desc: "Phân loại theo HS code, MOQ, thời gian giao" },
      { label: "Secured Trading", href: "/buyer-center/secured-trading", desc: "Bảo đảm Giao dịch (tài khoản trung gian) workflow" },
      { label: "Khám phá NCC mới", href: "/buyer-center/supplier-discover", desc: "AI gợi ý NCC theo lịch sử mua" },
    ],
  },
  {
    icon: "🏭",
    color: "#9C6A1F",
    title: "Bán hàng (Seller / Supplier)",
    subtitle: "Đăng ký và quản lý gian hàng NCC",
    links: [
      { label: "Sell on Cybersilkroads", href: "/sell-on-csr", desc: "3 tier (Free / Verified / Premium) — quy trình audit 4 bước" },
      { label: "Đăng ký nhà máy", href: "/register/factory", desc: "Form đăng ký + upload giấy tờ pháp lý" },
      { label: "Đăng ký dealer", href: "/register/dealer", desc: "Đại lý phân phối tại VN/ASEAN" },
    ],
  },
  {
    icon: "💼",
    color: "#7C2D12",
    title: "Seller Center — Sau khi audit",
    subtitle: "10 công cụ vận hành cho NCC verified",
    links: [
      { label: "Trang tổng quan", href: "/seller-center", desc: "Doanh số, đơn nhận, RFQ inbox, conversion" },
      { label: "AI Assistant", href: "/seller-center/ai-assistant", desc: "Trợ lý AI viết quote, dịch tiếng Việt, optimize listing" },
      { label: "Domestic CN", href: "/seller-center/domestic-cn", desc: "Bán hàng nội địa Trung Quốc qua Taobao/Tmall" },
      { label: "Export NA", href: "/seller-center/export-na", desc: "Xuất khẩu Bắc Mỹ qua Amazon FBA + 3PL" },
      { label: "Gold Member", href: "/seller-center/gold-member", desc: "Tier cao nhất — featured banner, priority RFQ" },
      { label: "Logistics", href: "/seller-center/logistics", desc: "Booking tàu, customs broker, container tracking" },
      { label: "Smart Expo", href: "/seller-center/smart-expo", desc: "Virtual booth tại trade fair online" },
      { label: "Trade eHome", href: "/seller-center/trade-ehome", desc: "Showroom số cho ngành nội thất" },
      { label: "Trade Services", href: "/seller-center/trade-services", desc: "Dịch thuật, pháp lý, tài chính cho NCC" },
      { label: "Trading Service", href: "/seller-center/trading-service", desc: "CSR đại diện trade — buyer's agent thuê ngoài" },
    ],
  },
  {
    icon: "📚",
    color: "#7C3AED",
    title: "Thông tin & Tài liệu",
    subtitle: "Hướng dẫn, chính sách, và tài liệu nghiên cứu",
    links: [
      { label: "Giới thiệu CSR", href: "/info/about-us", desc: "Tầm nhìn 'con đường tơ lụa số' — 4 trụ cột" },
      { label: "Mạng lưới đối tác hiệp hội", href: "/info/network", desc: "42 hiệp hội VN · TQ · ASEAN, 28+ MOU" },
      { label: "Quy trình kiểm định nhà máy", href: "/info/audit-process", desc: "7 bước, 32% pass rate, lab SGS/BV/TÜV/Intertek" },
      { label: "Bảo đảm Giao dịch", href: "/info/trade-assurance", desc: "Trung gian VCB · BIDV · Bank of China — bảo vệ thanh toán" },
      { label: "Khiếu nại & tranh chấp", href: "/info/disputes", desc: "3 cấp escalation — Direct · Mediation · VIAC trọng tài" },
      { label: "Đặt mẫu (Sample Order)", href: "/info/sample-orders", desc: "Quy trình 6 bước, Trung tâm Mẫu Quảng Châu" },
      { label: "Hướng dẫn nhập khẩu", href: "/info/import-guide", desc: "9 sections — VNACCS, Form E, ACFTA, RCEP" },
      { label: "Chính sách vận chuyển", href: "/info/shipping-policy", desc: "Incoterms 2020, 5 cảng VN, đường bộ Lạng Sơn" },
      { label: "Tính cước DDP", href: "/info/ddp-calculator", desc: "Calculator interactive — input CBM, weight, route" },
      { label: "Theo dõi đơn realtime", href: "/info/order-tracking", desc: "5 stages, ảnh/video tại mỗi mốc" },
      { label: "Bảo vệ thanh toán", href: "/info/payment-protection", desc: "Cơ chế trung gian + bảo hiểm" },
      { label: "Tìm sản phẩm hiệu quả", href: "/info/find-products", desc: "Tips RFQ, AI matching, multi-supplier comparison" },
      { label: "Tích hợp API", href: "/info/api-integration", desc: "REST + Webhook + 4 SDK (Node/Py/PHP/Go)" },
      { label: "Báo cáo thị trường", href: "/info/market-reports", desc: "48 báo cáo/năm, 12 ngành cover" },
      { label: "Tin tức ngành (Blog)", href: "/info/industry-news", desc: "12+ bài analysis, weekly pulse" },
      { label: "Tuyển dụng (Careers)", href: "/info/careers", desc: "37+ vị trí mở — Engineering, Product, Sales" },
      { label: "Liên hệ", href: "/info/contact", desc: "8 văn phòng VN + ASEAN, dropdown chọn theo khu vực" },
    ],
  },
  {
    icon: "⚖",
    color: "#475569",
    title: "Pháp lý & Chính sách",
    subtitle: "Điều khoản sử dụng và bảo mật dữ liệu",
    links: [
      { label: "Điều khoản dịch vụ", href: "/info/terms-of-service", desc: "14 sections, VIAC arbitration, force majeure" },
      { label: "Chính sách bảo mật", href: "/info/privacy-policy", desc: "ISO 27001, NĐ 13/2023, PIPL, GDPR compliance" },
    ],
  },
  {
    icon: "🔐",
    color: "#A21CAF",
    title: "Tài khoản & Đăng ký",
    subtitle: "Authentication và onboarding",
    links: [
      { label: "Đăng nhập", href: "/login", desc: "Email/password + Google + Apple + Facebook OAuth" },
      { label: "Đăng ký Người mua", href: "/register/buyer", desc: "Cá nhân hoặc doanh nghiệp — KYC nhanh" },
      { label: "Đăng ký Dealer", href: "/register/dealer", desc: "Đại lý phân phối VN/ASEAN — verified workflow" },
      { label: "Đăng ký Factory", href: "/register/factory", desc: "Nhà máy NCC — bắt đầu audit 7 bước" },
      { label: "Tải app mobile", href: "/app", desc: "iOS + Android — RFQ + tracking trên di động" },
    ],
  },
];

export default function SitemapPage() {
  const totalLinks = SECTIONS.reduce((acc, s) => acc + s.links.length, 0) + ARTICLES.length;
  const sectionsCount = SECTIONS.length + 1; // +1 cho blog

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Sitemap" },
        ]}
      />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, var(--color-brand) 50%, #001A3F 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-brand-light blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-10 max-md:py-7">
          <span className="inline-block bg-gold text-brand-dark text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wider mb-3">
            🗺 BẢN ĐỒ TRANG
          </span>
          <h1 className="text-[36px] font-extrabold leading-[1.1] mb-3 max-md:text-[24px]">
            Bản đồ trang Cybersilkroads
          </h1>
          <p className="text-[14.5px] opacity-90 max-w-[760px] leading-relaxed mb-6 max-md:text-[13px]">
            {totalLinks}+ trang được tổ chức theo {sectionsCount} nhóm chức năng. Dùng sitemap này để khám phá nhanh toàn bộ tính năng và tài liệu của nền tảng. Sitemap XML cho search engine: <a href="/sitemap.xml" className="underline text-gold hover:opacity-80">/sitemap.xml</a>
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">📄</div>
              <div className="text-[22px] font-extrabold">{totalLinks}+</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">Tổng số trang</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">🗂</div>
              <div className="text-[22px] font-extrabold">{sectionsCount}</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">Nhóm chức năng</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">📰</div>
              <div className="text-[22px] font-extrabold">{ARTICLES.length}</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">Bài viết blog</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">🌐</div>
              <div className="text-[22px] font-extrabold">EN</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">URL slugs (SEO ready)</div>
            </div>
          </div>
        </div>
      </section>

      {/* === Section anchors quick nav ====================================== */}
      <div className="max-w-[1200px] mx-auto px-4 mt-6">
        <div className="bg-paper border border-line rounded p-4">
          <div className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">📍 NHẢY NHANH ĐẾN NHÓM</div>
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a
                key={s.title}
                href={`#${s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="text-[12px] font-semibold px-2.5 py-1 rounded-sm border cursor-pointer hover:opacity-80"
                style={{ borderColor: `${s.color}40`, color: s.color, background: `${s.color}08` }}
              >
                <span className="mr-1">{s.icon}</span>
                {s.title}
              </a>
            ))}
            <a
              href="#blog"
              className="text-[12px] font-semibold px-2.5 py-1 rounded-sm border cursor-pointer hover:opacity-80"
              style={{ borderColor: "#E8943A40", color: "#E8943A", background: "#E8943A08" }}
            >
              <span className="mr-1">📰</span>
              Blog mới nhất
            </a>
          </div>
        </div>
      </div>

      {/* === SECTIONS ======================================================= */}
      <div className="max-w-[1200px] mx-auto px-4 mt-6 space-y-6">
        {SECTIONS.map((s) => (
          <section
            key={s.title}
            id={s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            className="bg-paper border border-line rounded overflow-hidden scroll-mt-20"
          >
            {/* Header */}
            <div
              className="px-5 py-4 border-b border-line flex items-center justify-between gap-3 flex-wrap"
              style={{ background: `linear-gradient(135deg, ${s.color}10, ${s.color}03)` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center text-[22px] flex-shrink-0 shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}DD)`, color: "#fff" }}
                >
                  {s.icon}
                </div>
                <div>
                  <h2 className="text-[18px] font-extrabold text-ink leading-tight">{s.title}</h2>
                  <p className="text-[12px] text-mute mt-0.5">{s.subtitle}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[22px] font-extrabold leading-none" style={{ color: s.color }}>
                  {s.links.length}
                </div>
                <div className="text-[10.5px] uppercase tracking-wider text-mute">trang</div>
              </div>
            </div>

            {/* Links grid */}
            <ul className="grid grid-cols-2 gap-x-5 gap-y-1 p-4 max-md:grid-cols-1">
              {s.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block py-2 px-2.5 rounded-sm hover:bg-bg group"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-[13.5px] font-semibold text-ink group-hover:text-brand">{l.label}</span>
                      <span className="text-[10.5px] text-mute2 font-mono">{l.href}</span>
                    </div>
                    {l.desc && (
                      <span className="block text-[11.5px] text-mute leading-snug mt-0.5">{l.desc}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* === Blog articles section ======================================= */}
        <section id="blog" className="bg-paper border border-line rounded overflow-hidden scroll-mt-20">
          <div
            className="px-5 py-4 border-b border-line flex items-center justify-between gap-3 flex-wrap"
            style={{ background: "linear-gradient(135deg, #E8943A10, #E8943A03)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-md flex items-center justify-center text-[22px] flex-shrink-0 shadow-sm text-white"
                style={{ background: "linear-gradient(135deg, #E8943A, #C97520)" }}
              >
                📰
              </div>
              <div>
                <h2 className="text-[18px] font-extrabold text-ink leading-tight">Blog — Tin tức ngành</h2>
                <p className="text-[12px] text-mute mt-0.5">{ARTICLES.length} bài viết phân tích thị trường, case study, hướng dẫn</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/info/industry-news"
                className="text-[12px] text-brand font-semibold hover:underline whitespace-nowrap"
              >
                Xem tất cả →
              </Link>
              <div className="text-right">
                <div className="text-[22px] font-extrabold leading-none text-warm">{ARTICLES.length}</div>
                <div className="text-[10.5px] uppercase tracking-wider text-mute">bài</div>
              </div>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-x-5 gap-y-1 p-4 max-md:grid-cols-1">
            {ARTICLES.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/info/industry-news/${a.slug}`}
                  className="block py-2 px-2.5 rounded-sm hover:bg-bg group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[13px] font-semibold text-ink group-hover:text-brand leading-snug flex-1 line-clamp-2">{a.title}</span>
                    <span className="text-[10px] text-mute2 whitespace-nowrap">{a.readMinutes}p</span>
                  </div>
                  <span className="block text-[10.5px] text-mute2 font-mono mt-1">/info/industry-news/{a.slug}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* === Footer note ==================================================== */}
      <div className="max-w-[1200px] mx-auto px-4 mt-8 mb-10">
        <div className="bg-bg border border-line rounded p-5 text-center">
          <p className="text-[13px] text-mute leading-relaxed max-w-[680px] mx-auto">
            <b className="text-ink">Sitemap XML cho search engine</b>: <a href="/sitemap.xml" className="text-brand font-semibold hover:underline">cybersilkroads.com/sitemap.xml</a>
            {" · "}
            Cập nhật tự động khi thêm trang hoặc blog post mới. Toàn bộ slug đã chuẩn hoá tiếng Anh để tối ưu SEO quốc tế.
          </p>
          <div className="mt-3 flex justify-center gap-3 flex-wrap">
            <Link href="/help" className="text-[12px] px-4 py-2 border border-line rounded-sm font-semibold text-ink hover:border-brand hover:text-brand">
              Trung tâm trợ giúp
            </Link>
            <Link href="/info/contact" className="text-[12px] px-4 py-2 bg-brand text-white rounded-sm font-bold hover:bg-brand-light">
              Liên hệ CSR
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: "Sitemap — Cybersilkroads",
  description: "Bản đồ toàn bộ trang Cybersilkroads — 80+ pages tổ chức theo 9 nhóm chức năng. XML sitemap cho search engine tại /sitemap.xml.",
};
