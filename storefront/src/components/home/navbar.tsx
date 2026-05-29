import Link from "next/link";
import { NAV_CATEGORIES, NAV_MENU } from "@/data/home";
import { SubItemPanel } from "@/components/home/mega-submenu";

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

  // Flatten sub-items with global index so each gets a unique mm-sub-N class
  // matched by globals.css :has() rules to show the matching mm-sub-panel-N.
  const flatSubs: { groupSlug: string; idx: number; item: typeof NAV_MENU[number]["items"][number] }[] = [];
  let g = 0;
  for (const group of NAV_MENU) {
    for (const item of group.items) {
      g += 1;
      flatSubs.push({ groupSlug: group.main.slug, idx: g, item });
    }
  }

  return (
    <nav className="bg-brand text-white">
      <div className="max-w-[1400px] mx-auto px-4 flex items-stretch gap-0 max-md:flex-col md:max-xl:flex-col">
        {/* DESKTOP mega-menu. mm-l1 sidebar = 2 mm-cat groups × 8 mm-sub
            items. mm-panel stacks 16 mm-sub-panel-N (one per sub-item).
            CSS :has(.mm-sub-N:hover) reveals the matching panel. */}
        <div className="mm-root relative max-xl:hidden">
          <div className="px-6 py-3.5 bg-brand-dark text-white flex items-center gap-2.5 font-bold text-[13.5px] cursor-pointer w-[280px]">
            <span>☰</span> TẤT CẢ DANH MỤC <span className="ml-auto">▾</span>
          </div>
          <div className="mm-wrap absolute top-full left-0 flex items-stretch bg-paper text-ink border border-line shadow-lg z-40">
            <aside className="mm-l1 w-[260px] border-r border-line py-2">
              {(() => {
                let n = 0;
                return NAV_MENU.map((group) => (
                  <div key={group.main.slug} className="mm-cat mb-2">
                    <Link
                      href={`/category/${group.main.slug}`}
                      className="flex justify-between items-center px-4 py-2 text-[13px] hover:bg-[#F5F5F5] font-semibold text-ink"
                    >
                      <b className="font-bold">{group.main.icon} {group.main.name}</b>
                      <span className="text-mute2 text-[11px]">▸</span>
                    </Link>
                    <ul className="pl-7 pr-3 mt-0.5">
                      {group.items.map((it) => {
                        n += 1;
                        return (
                          <li key={it.slug}>
                            <Link
                              href={`/category/${group.main.slug}/${it.slug}`}
                              className={`mm-sub mm-sub-${n} flex items-center gap-1.5 py-[3px] text-[12.5px] text-accent font-bold hover:text-brand leading-snug truncate`}
                            >
                              <span className="flex-shrink-0">{it.icon}</span>
                              <span className="truncate">{it.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ));
              })()}
            </aside>
            <div className="mm-panel w-[860px] grid">
              {flatSubs.map(({ groupSlug, idx, item }) => (
                <div
                  key={`${groupSlug}-${item.slug}`}
                  className={`mm-sub-panel mm-sub-panel-${idx} row-start-1 col-start-1`}
                >
                  <SubItemPanel groupSlug={groupSlug} item={item} />
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

        {/* TABLET + MOBILE: hamburger drawer for "Tất cả danh mục".
            Renders each main category as a heading + its full sub-items
            list below (NAV_MENU, not NAV_CATEGORIES) so users can drill
            straight to a sub-category without an extra tap. */}
        <details className="hidden max-xl:block group md:max-xl:order-1">
          <summary className="px-4 py-3 bg-brand-dark text-white flex items-center gap-2.5 font-bold text-[14px] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="text-[18px]">☰</span>
            <span className="flex-1">TẤT CẢ DANH MỤC</span>
            <span className="group-open:rotate-180 transition-transform">▾</span>
          </summary>
          <div className="bg-paper text-ink border-t border-brand-dark max-h-[70vh] overflow-y-auto">
            {NAV_MENU.map((group) => (
              <div key={group.main.slug} className="border-b border-line">
                <Link
                  href={`/category/${group.main.slug}`}
                  className="flex items-center gap-2 px-4 py-3 text-[14px] font-bold bg-[#F5F7FA] text-ink active:bg-brand active:text-white"
                >
                  <span className="text-[18px]">{group.main.icon}</span>
                  <span className="flex-1 leading-tight">{group.main.name}</span>
                  <span className="text-mute2 text-[12px]">›</span>
                </Link>
                <ul className="grid grid-cols-2 md:max-xl:grid-cols-3 gap-0">
                  {group.items.map((it) => (
                    <li key={it.slug}>
                      <Link
                        href={`/category/${group.main.slug}/${it.slug}`}
                        className="flex items-center gap-2 px-4 py-2.5 text-[12.5px] text-accent font-bold border-t border-[#F5F5F5] active:bg-brand active:text-white hover:bg-bg leading-snug"
                      >
                        <span className="flex-shrink-0">{it.icon}</span>
                        <span className="flex-1 truncate">{it.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
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
