import Link from "next/link";
import { LangSwitcher } from "@/components/lang-switcher";

type FooterLink = { label: string; href: string };

const FOOTER_COLS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Mua hàng",
    links: [
      { label: "Tìm sản phẩm", href: "/products" },
      { label: "Gửi RFQ", href: "/buying-request" },
      { label: "Đặt mẫu", href: "/info/sample-orders" },
      { label: "Theo dõi đơn hàng", href: "/info/order-tracking" },
      { label: "Bảo vệ thanh toán", href: "/info/payment-protection" },
      { label: "Khiếu nại", href: "/info/disputes" },
    ],
  },
  {
    title: "Về Cybersilkroads",
    links: [
      { label: "Giới thiệu", href: "/info/about-us" },
      { label: "Mạng lưới kết nối", href: "/info/network" },
      { label: "Quy trình kiểm định", href: "/info/audit-process" },
      { label: "Tin tức ngành", href: "/info/industry-news" },
      { label: "Tuyển dụng", href: "/info/careers" },
      { label: "Liên hệ", href: "/info/contact" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { label: "Trung tâm trợ giúp", href: "/help" },
      { label: "Hướng dẫn nhập khẩu", href: "/info/import-guide" },
      { label: "Tính cước DDP", href: "/info/ddp-calculator" },
      { label: "Chính sách vận chuyển", href: "/info/shipping-policy" },
      { label: "Điều khoản", href: "/info/terms-of-service" },
      { label: "Chính sách bảo mật", href: "/info/privacy-policy" },
      { label: "Bản đồ trang", href: "/sitemap" },
    ],
  },
  {
    title: "Dành cho NCC",
    links: [
      { label: "Đăng ký nhà máy", href: "/sell-on-csr" },
      { label: "Bảo đảm Giao dịch", href: "/info/trade-assurance" },
      { label: "Báo cáo thị trường", href: "/info/market-reports" },
      { label: "Tích hợp API", href: "/info/api-integration" },
      { label: "Trung tâm bán hàng", href: "/seller-center" },
    ],
  },
];

const CERTS = ["✓ Bộ Công Thương", "✓ Bảo vệ DMCA", "✓ ISO 27001", "✓ Đã kiểm định TUV", "✓ Bảo mật SSL"];

type Social = {
  name: string;
  href: string;
  brand: string; // background color when hovered
  icon: React.ReactNode;
};

const SOCIALS: Social[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/alibabavn",
    brand: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@alibabavn",
    brand: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.5a3 3 0 0 0-2.1-2.12C19.5 3.85 12 3.85 12 3.85s-7.5 0-9.4.53A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.1 2.12c1.9.53 9.4.53 9.4.53s7.5 0 9.4-.53a3 3 0 0 0 2.1-2.12c.5-1.9.5-5.5.5-5.5s0-3.6-.5-5.5ZM9.6 15.57V8.43L15.8 12l-6.2 3.57Z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@alibabavn",
    brand: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.93a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31Z" />
      </svg>
    ),
  },
  {
    name: "Zalo",
    href: "https://zalo.me/alibabavn",
    brand: "#0068FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 5.95 2 10.83c0 2.7 1.4 5.13 3.6 6.78L4.7 21l3.84-1.92c1.05.3 2.17.46 3.46.46 5.52 0 10-3.95 10-8.71C22 5.95 17.52 2 12 2Zm-3.85 11.2H6.62a.4.4 0 0 1-.4-.4V8.94a.4.4 0 0 1 .8 0v3.46h1.13a.4.4 0 1 1 0 .8Zm2.05-.4a.4.4 0 0 1-.8 0V8.94a.4.4 0 0 1 .8 0v3.86Zm5 0a.4.4 0 0 1-.8 0v-.27a1.62 1.62 0 0 1-1.18.51 1.65 1.65 0 0 1-1.65-1.65v-.06a1.65 1.65 0 0 1 1.65-1.65c.46 0 .88.19 1.18.5v-.26a.4.4 0 1 1 .8 0v2.88Zm3.78.4h-3.05a.4.4 0 0 1-.32-.64l2.42-3.22h-2.1a.4.4 0 1 1 0-.8h2.97a.4.4 0 0 1 .33.64L17 12.4h1.98a.4.4 0 1 1 0 .8Z" />
        <path d="M12.84 11.4a.85.85 0 1 0 1.7 0 .85.85 0 0 0-1.7 0Z" />
      </svg>
    ),
  },
  {
    name: "WeChat",
    href: "/info/wechat",
    brand: "#07C160",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8.69 4C4.43 4 1 6.84 1 10.34c0 1.97 1.13 3.74 2.9 4.91l-.72 2.18 2.55-1.28c.91.18 1.83.27 2.96.18-.18-.55-.27-1.18-.27-1.82 0-3.55 3.27-6.46 7.27-6.46.36 0 .73.03 1.09.09C16 5.55 12.69 4 8.69 4ZM6 8.91a.91.91 0 1 1 0-1.82.91.91 0 0 1 0 1.82Zm5.45 0a.91.91 0 1 1 0-1.82.91.91 0 0 1 0 1.82ZM23 14.5c0-2.96-2.96-5.36-6.6-5.36-3.85 0-6.6 2.4-6.6 5.36 0 2.97 2.75 5.37 6.6 5.37.86 0 1.67-.13 2.4-.32l2.16 1.18-.6-1.84c1.6-1.04 2.64-2.55 2.64-4.39ZM14.45 13.5a.73.73 0 1 1 0-1.45.73.73 0 0 1 0 1.45Zm4.36 0a.73.73 0 1 1 0-1.45.73.73 0 0 1 0 1.45Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/alibabavn",
    brand: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43A2.06 2.06 0 1 1 5.35 3.3a2.06 2.06 0 0 1-.01 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.78A1.76 1.76 0 0 0 0 1.74v20.52A1.76 1.76 0 0 0 1.78 24h20.44A1.76 1.76 0 0 0 24 22.26V1.74A1.76 1.76 0 0 0 22.22 0Z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-7 pt-9 pb-5 max-md:mt-4 max-md:pt-5 max-md:pb-3">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-9 pb-7 border-b border-white/10 md:max-lg:grid-cols-2 md:max-lg:gap-6 max-md:grid-cols-1 max-md:gap-0 max-md:pb-3">
          <div className="md:max-lg:col-span-2 md:max-lg:pb-4 md:max-lg:border-b md:max-lg:border-white/10 md:max-lg:text-center max-md:pb-3 max-md:border-b max-md:border-white/10 max-md:mb-2 max-md:text-center">
            {/* Logo — horizontal mark on transparent background, centered.
                The PNG is already transparent and the gold tagline reads
                fine on the navy footer, so no pill needed. */}
            <Link
              href="/"
              className="block mx-auto mb-4 w-fit"
              aria-label="Cybersilkroads — Trang chủ"
            >
              <img
                src="/logo/cybersilkroads-horizontal.png?v=5"
                alt="Cybersilkroads"
                width={400}
                height={200}
                className="h-32 w-auto max-md:h-24"
              />
            </Link>
            <p className="text-[12px] opacity-75 leading-relaxed mb-3.5 max-w-[320px] md:max-lg:mx-auto max-md:mx-auto">
              Nền tảng B2B kết nối nhà bán Việt Nam với 40+ nhà máy đã được kiểm định
              tại Trung Quốc. Báo giá nhanh, chất lượng đảm bảo, vận chuyển DDP
              tận kho.
            </p>
            <div className="flex gap-2 flex-wrap md:max-lg:justify-center max-md:justify-center">
              {SOCIALS.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  title={s.name}
                  className="w-9 h-9 bg-white/10 rounded-sm flex items-center justify-center cursor-pointer transition-colors hover:text-white"
                  style={{ ["--social-brand" as string]: s.brand }}
                >
                  <span className="w-[18px] h-[18px] block social-icon">{s.icon}</span>
                </Link>
              ))}
            </div>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              {/* Desktop: title + list always shown. Tablet: centered. */}
              <b className="hidden md:block text-[13px] font-bold mb-3 tracking-wide md:max-lg:text-center">
                {col.title}
              </b>
              <ul className="hidden md:block space-y-1.5 md:max-lg:text-center">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[12px] opacity-75 hover:opacity-100 hover:text-gold cursor-pointer">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Mobile: collapsible accordion via <details> */}
              <details className="md:hidden border-b border-white/10 group">
                <summary className="flex justify-between items-center py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <b className="text-[13px] font-bold tracking-wide">{col.title}</b>
                  <span className="text-[12px] opacity-70 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <ul className="space-y-2 pb-3 pl-1">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-[12.5px] opacity-80 active:opacity-100 active:text-gold">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
        {/* Bottom row: copy + language picker + certs.
            Desktop: 3-col strip [copy | lang | certs].
            Tablet & mobile: stacked vertically + center-aligned. */}
        <div className="pt-5 grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-3 items-center text-[11.5px] opacity-90 max-lg:grid-cols-1 max-lg:text-center max-lg:gap-y-3.5">
          <span className="opacity-80 max-lg:order-3">
            © 2026 Cybersilkroads (CSR) · Nền tảng B2B · Vận hành bởi Beeagents.com
          </span>
          <div className="flex items-center gap-2 max-lg:justify-center max-lg:order-1">
            <span className="text-white/60 text-[11px] uppercase tracking-wider">Ngôn ngữ:</span>
            <LangSwitcher variant="compact" />
          </div>
          <div className="flex gap-3.5 flex-wrap opacity-70 max-lg:justify-center max-lg:order-2">
            {CERTS.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
