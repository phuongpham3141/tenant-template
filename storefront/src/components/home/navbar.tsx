import Link from "next/link";
import { NAV_CATEGORIES } from "@/data/home";
import { SubmenuContent } from "@/components/home/mega-submenu";

export function NavBar() {
  const links: { label: string; href: string }[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/products" },
    { label: "Nhà cung cấp", href: "/suppliers" },
    { label: "Hội chợ", href: "/trade-shows" },
    { label: "Kênh ngành", href: "/industry-channels" },
    { label: "Cảnh báo giao dịch", href: "/trade-alert" },
    { label: "Yêu cầu mua hàng", href: "/buying-request" },
    { label: "Bán trên CSR", href: "/sell-on-csr" },
  ];
  return (
    <nav className="bg-brand text-white">
      <div className="max-w-[1400px] mx-auto px-4 flex items-stretch gap-0 max-md:flex-col md:max-xl:flex-col">
        {/* DESKTOP: hover-based mega-menu (shared-panel pattern).
            mm-root = trigger + dropdown wrap. mm-wrap = mm-l1 (sidebar) +
            mm-panel (shared 720px area). All 12 submenus stack in mm-panel;
            only the one matching the hovered mm-cat is shown via :has(). */}
        <div className="mm-root relative max-xl:hidden">
          <div className="px-6 py-3.5 bg-brand-dark text-white flex items-center gap-2.5 font-bold text-[13.5px] cursor-pointer w-[240px]">
            <span>☰</span> TẤT CẢ DANH MỤC <span className="ml-auto">▾</span>
          </div>
          <div className="mm-wrap absolute top-full left-0 flex items-stretch bg-paper text-ink border border-line shadow-lg z-40">
            <aside className="mm-l1 w-[240px] border-r border-line">
              {NAV_CATEGORIES.map((c) => (
                <div key={c.slug} className="mm-cat">
                  <Link
                    href={`/category/${c.slug}`}
                    className="flex justify-between items-center px-3.5 py-2.5 text-[13px] border-b border-[#F5F5F5] last:border-b-0 hover:bg-brand hover:text-white"
                  >
                    <b className="font-medium">
                      {c.icon} {c.name}
                      {c.isNew && (
                        <span className="bg-accent text-white text-[9px] px-1.5 py-px rounded-sm ml-1.5">
                          MỚI
                        </span>
                      )}
                    </b>
                    <span className="text-mute2 text-[11px]">▸</span>
                  </Link>
                </div>
              ))}
            </aside>
            <div className="mm-panel w-[720px] grid">
              {NAV_CATEGORIES.map((c) => (
                <div
                  key={c.slug}
                  className="mm-l2 row-start-1 col-start-1 p-5 grid-cols-4 gap-x-4 gap-y-3"
                >
                  <SubmenuContent slug={c.slug} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nav links — desktop (lg+): single horizontal row.
            Tablet (md:max-lg): wraps into 2 even rows of 5 + 4 items
            (each link uses basis-[20%] so 5 fit per row; row 2 grows
            to fill its 4 items evenly). */}
        <div className="flex items-stretch gap-0 max-md:hidden flex-1 overflow-x-auto md:max-xl:flex-wrap md:max-xl:overflow-visible md:max-xl:order-2">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="px-4 py-3.5 text-white text-[13.5px] font-medium border-b-[3px] border-transparent -mb-[3px] hover:bg-brand-dark hover:border-b-gold whitespace-nowrap text-center md:max-xl:flex-1 md:max-xl:basis-[20%] md:max-xl:px-2 md:max-xl:py-2.5 md:max-xl:text-[12.5px]"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/factory-tour"
            className="px-4 py-3.5 text-gold text-[13.5px] font-medium border-b-[3px] border-transparent -mb-[3px] hover:bg-brand-dark hover:border-b-gold whitespace-nowrap text-center md:max-xl:flex-1 md:max-xl:basis-[20%] md:max-xl:px-2 md:max-xl:py-2.5 md:max-xl:text-[12.5px]"
          >
            🔥 Tham quan nhà máy
          </Link>
        </div>

        {/* TABLET + MOBILE: hamburger drawer for "Tất cả danh mục"
            (replaces the desktop hover mega-menu — click-driven so the
            720px panel doesn't overflow viewport on iPad). Renders ABOVE
            the nav links via order-1 on tablet. */}
        <details className="hidden max-xl:block group md:max-xl:order-1">
          <summary className="px-4 py-3 bg-brand-dark text-white flex items-center gap-2.5 font-bold text-[14px] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="text-[18px]">☰</span>
            <span className="flex-1">TẤT CẢ DANH MỤC</span>
            <span className="group-open:rotate-180 transition-transform">▾</span>
          </summary>
          {/* Drawer body: 12 categories — 3 cols on tablet, 2 on mobile */}
          <div className="bg-paper text-ink border-t border-brand-dark grid grid-cols-2 md:max-xl:grid-cols-3 gap-0 max-h-[60vh] overflow-y-auto">
            {NAV_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="flex items-center gap-2 px-3.5 py-3 text-[13px] border-b border-[#F5F5F5] active:bg-brand active:text-white hover:bg-bg"
              >
                <span className="text-[16px]">{c.icon}</span>
                <span className="flex-1 leading-tight">{c.name}</span>
                {c.isNew && (
                  <span className="bg-accent text-white text-[9px] px-1.5 py-px rounded-sm">
                    MỚI
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
