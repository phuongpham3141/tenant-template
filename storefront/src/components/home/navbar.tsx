import Link from "next/link";
import { NAV_CATEGORIES, NAV_MENU } from "@/data/home";

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
                              className={`mm-sub mm-sub-${n} block py-[3px] text-[12.5px] text-accent hover:text-brand hover:font-bold leading-snug truncate`}
                            >
                              - {it.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ));
              })()}
            </aside>
            <div className="mm-panel w-[720px] grid">
              {flatSubs.map(({ groupSlug, idx, item }) => (
                <div
                  key={`${groupSlug}-${item.slug}`}
                  className={`mm-sub-panel mm-sub-panel-${idx} row-start-1 col-start-1 p-5`}
                >
                  {/* Hero strip */}
                  <Link
                    href={`/category/${groupSlug}/${item.slug}`}
                    className="block relative aspect-[16/6] rounded overflow-hidden mb-3 group/hero"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover/hero:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 px-4 py-3 flex flex-col justify-end text-white"
                      style={{ background: "linear-gradient(180deg, rgba(0,37,87,0.0) 40%, rgba(0,37,87,0.85) 100%)" }}
                    >
                      <h3 className="text-[16px] font-bold leading-tight">{item.name}</h3>
                      <p className="text-[11.5px] opacity-90 leading-snug line-clamp-2 mt-0.5">
                        {item.tagline}
                      </p>
                    </div>
                  </Link>
                  {/* 6 highlight thumbnails — 3 cols × 2 rows */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {item.highlights.slice(0, 6).map((h) => (
                      <Link
                        key={h.name}
                        href={
                          h.slug
                            ? `/category/${groupSlug}/${h.slug}`
                            : `/category/${groupSlug}/${item.slug}`
                        }
                        className="group/h flex flex-col"
                      >
                        <div className="aspect-square bg-[#F5F5F5] rounded-sm overflow-hidden border border-line group-hover/h:border-brand transition-colors">
                          <img
                            src={h.image}
                            alt={h.name}
                            className="w-full h-full object-cover group-hover/h:scale-105 transition-transform"
                            loading="lazy"
                          />
                        </div>
                        <span className="text-[11.5px] text-ink group-hover/h:text-brand mt-1 leading-snug line-clamp-2">
                          {h.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                  {/* CTA */}
                  <div className="mt-3 pt-2 border-t border-line flex justify-between items-center">
                    <span className="text-[11px] text-mute">{item.highlights.length}+ sản phẩm</span>
                    <Link
                      href={`/category/${groupSlug}/${item.slug}`}
                      className="text-[12px] text-accent font-semibold hover:underline"
                    >
                      Xem toàn bộ {item.name} →
                    </Link>
                  </div>
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

        {/* TABLET + MOBILE: hamburger drawer for "Tất cả danh mục" */}
        <details className="hidden max-xl:block group md:max-xl:order-1">
          <summary className="px-4 py-3 bg-brand-dark text-white flex items-center gap-2.5 font-bold text-[14px] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="text-[18px]">☰</span>
            <span className="flex-1">TẤT CẢ DANH MỤC</span>
            <span className="group-open:rotate-180 transition-transform">▾</span>
          </summary>
          <div className="bg-paper text-ink border-t border-brand-dark grid grid-cols-2 md:max-xl:grid-cols-3 gap-0 max-h-[60vh] overflow-y-auto">
            {NAV_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="flex items-center gap-2 px-3.5 py-3 text-[13px] border-b border-[#F5F5F5] active:bg-brand active:text-white hover:bg-bg"
              >
                <span className="text-[16px]">{c.icon}</span>
                <span className="flex-1 leading-tight">{c.name}</span>
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
