import Link from "next/link";

type FooterLink = { label: string; href: string };

const FOOTER_COLS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Mua hàng",
    links: [
      { label: "Tìm sản phẩm", href: "/products" },
      { label: "Gửi RFQ", href: "/buying-request" },
      { label: "Đặt mẫu (sample)", href: "/info/dat-mau" },
      { label: "Theo dõi đơn", href: "/info/theo-doi-don" },
      { label: "Bảo vệ thanh toán", href: "/info/bao-ve-thanh-toan" },
      { label: "Khiếu nại", href: "/info/khieu-nai" },
    ],
  },
  {
    title: "Về AlibabaVN",
    links: [
      { label: "Giới thiệu", href: "/info/gioi-thieu" },
      { label: "Đội ngũ tại Quảng Châu", href: "/info/doi-ngu-quang-chau" },
      { label: "Quy trình audit", href: "/info/quy-trinh-audit" },
      { label: "Tin tức ngành", href: "/info/tin-tuc-nganh" },
      { label: "Tuyển dụng", href: "/info/tuyen-dung" },
      { label: "Liên hệ", href: "/info/lien-he" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { label: "Trung tâm trợ giúp", href: "/help" },
      { label: "Hướng dẫn nhập khẩu", href: "/info/huong-dan-nhap-khau" },
      { label: "Tính cước DDP", href: "/info/tinh-cuoc-ddp" },
      { label: "Chính sách vận chuyển", href: "/info/chinh-sach-van-chuyen" },
      { label: "Điều khoản", href: "/info/dieu-khoan" },
      { label: "Chính sách bảo mật", href: "/info/chinh-sach-bao-mat" },
    ],
  },
  {
    title: "Dành cho NCC",
    links: [
      { label: "Đăng ký nhà máy", href: "/sell-on-avn" },
      { label: "Gold Membership", href: "/info/gold-membership" },
      { label: "Quảng cáo", href: "/info/quang-cao" },
      { label: "API integration", href: "/info/api-integration" },
      { label: "Trung tâm bán hàng", href: "/seller-center" },
    ],
  },
];

const CERTS = ["✓ Bộ Công Thương", "✓ Bảo vệ DMCA", "✓ ISO 27001", "✓ Đã audit TUV", "✓ Bảo mật SSL"];

const SOCIALS = ["F", "Y", "L", "Z", "T"];

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-7 pt-9 pb-5 max-md:mt-4 max-md:pt-5 max-md:pb-3">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-9 pb-7 border-b border-white/10 max-md:grid-cols-1 max-md:gap-0 max-md:pb-3">
          <div className="max-md:pb-3 max-md:border-b max-md:border-white/10 max-md:mb-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-10 h-10 bg-gold text-brand-dark flex items-center justify-center rounded font-extrabold text-[20px]">
                AV
              </div>
              <div className="leading-tight">
                <b className="block font-extrabold text-[20px] tracking-tight">
                  AlibabaVN
                </b>
                <small className="text-[10.5px] opacity-70 tracking-wider uppercase">
                  Nền tảng sourcing hàng Trung Quốc
                </small>
              </div>
            </div>
            <p className="text-[12px] opacity-75 leading-relaxed mb-3.5 max-w-[320px]">
              Nền tảng B2B kết nối nhà bán Việt Nam với 40+ nhà máy đã được audit
              tại Trung Quốc. Báo giá nhanh, chất lượng đảm bảo, vận chuyển DDP
              tận kho.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <Link
                  key={s}
                  href={`/info/social-${s.toLowerCase()}`}
                  className="w-8 h-8 bg-white/10 rounded-sm flex items-center justify-center text-[13px] font-bold cursor-pointer hover:bg-gold hover:text-brand-dark"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              {/* Desktop: title + list always shown */}
              <b className="hidden md:block text-[13px] font-bold mb-3 tracking-wide">
                {col.title}
              </b>
              <ul className="hidden md:block space-y-1.5">
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
        <div className="flex justify-between items-center pt-5 text-[11.5px] opacity-70 max-md:flex-col max-md:gap-3 max-md:text-center">
          <span>
            © 2026 AlibabaVN · Sourcing Platform · Vận hành bởi Huayue SC ·
            Hà Nội · Quảng Châu
          </span>
          <div className="flex gap-3.5 flex-wrap max-md:justify-center">
            {CERTS.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
