import Link from "next/link";
import { NAV_CATEGORIES } from "@/data/home";

export function NavBar() {
  const links: { label: string; href: string }[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/products" },
    { label: "Nhà cung cấp", href: "/suppliers" },
    { label: "Hội chợ", href: "/trade-shows" },
    { label: "Kênh ngành", href: "/industry-channels" },
    { label: "Cảnh báo giao dịch", href: "/trade-alert" },
    { label: "Yêu cầu mua hàng", href: "/buying-request" },
    { label: "Bán trên AVN", href: "/sell-on-avn" },
  ];
  return (
    <nav className="bg-brand text-white">
      <div className="max-w-[1400px] mx-auto px-4 flex items-stretch gap-0 max-md:flex-col">
        {/* DESKTOP: 240px-wide button + horizontal nav */}
        <details className="group relative max-md:hidden">
          <summary className="px-6 py-3.5 bg-brand-dark text-white flex items-center gap-2.5 font-bold text-[13.5px] cursor-pointer w-[240px] list-none [&::-webkit-details-marker]:hidden">
            <span>☰</span> TẤT CẢ DANH MỤC <span className="ml-auto">▾</span>
          </summary>
          {/* Mega-menu dropdown desktop */}
          <div className="absolute top-full left-0 w-[240px] bg-paper text-ink border border-line shadow-lg z-50 max-h-[480px] overflow-y-auto">
            {NAV_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="flex justify-between items-center px-3.5 py-2.5 text-[13px] border-b border-[#F5F5F5] last:border-b-0 hover:bg-brand hover:text-white"
              >
                <b className="font-medium">
                  {c.icon} {c.name}
                  {c.isNew && (
                    <span className="bg-accent text-white text-[9px] px-1.5 py-px rounded-sm ml-1.5">
                      NEW
                    </span>
                  )}
                </b>
                <span className="text-mute2 text-[11px]">▸</span>
              </Link>
            ))}
          </div>
        </details>

        {/* DESKTOP: horizontal nav links */}
        <div className="flex items-stretch gap-0 max-md:hidden flex-1 overflow-x-auto">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="px-4 py-3.5 text-white text-[13.5px] font-medium border-b-[3px] border-transparent -mb-[3px] hover:bg-brand-dark hover:border-b-gold whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/factory-tour"
            className="px-4 py-3.5 text-gold text-[13.5px] font-medium border-b-[3px] border-transparent -mb-[3px] hover:bg-brand-dark hover:border-b-gold whitespace-nowrap"
          >
            🔥 Tham quan nhà máy
          </Link>
        </div>

        {/* MOBILE: top row = hamburger drawer (full-width) */}
        <details className="hidden max-md:block group">
          <summary className="px-4 py-3 bg-brand-dark text-white flex items-center gap-2.5 font-bold text-[14px] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="text-[18px]">☰</span>
            <span className="flex-1">TẤT CẢ DANH MỤC</span>
            <span className="group-open:rotate-180 transition-transform">▾</span>
          </summary>
          {/* Mobile drawer: 12 categories */}
          <div className="bg-paper text-ink border-t border-brand-dark grid grid-cols-2 gap-0 max-h-[60vh] overflow-y-auto">
            {NAV_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="flex items-center gap-2 px-3.5 py-3 text-[13px] border-b border-[#F5F5F5] active:bg-brand active:text-white"
              >
                <span className="text-[16px]">{c.icon}</span>
                <span className="flex-1 leading-tight">{c.name}</span>
                {c.isNew && (
                  <span className="bg-accent text-white text-[9px] px-1.5 py-px rounded-sm">
                    NEW
                  </span>
                )}
              </Link>
            ))}
          </div>
        </details>

        {/* MOBILE: secondary nav links (horizontal scroll) */}
        <div className="hidden max-md:flex overflow-x-auto bg-brand">
          {links.slice(0, 5).map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="px-3.5 py-2.5 text-white text-[12.5px] font-medium whitespace-nowrap flex-shrink-0 active:bg-brand-dark"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/factory-tour"
            className="px-3.5 py-2.5 text-gold text-[12.5px] font-medium whitespace-nowrap flex-shrink-0 active:bg-brand-dark"
          >
            🔥 Nhà máy
          </Link>
        </div>
      </div>
    </nav>
  );
}
