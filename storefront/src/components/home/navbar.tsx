import Link from "@/components/i18n-link";
import { NAV_MENU } from "@/data/home";
import { CategoryOverviewPanel } from "@/components/home/mega-submenu";
import { getT } from "@/lib/t";
import { getTd } from "@/lib/td";

export async function NavBar() {
  const t = await getT();
  const td = await getTd();
  const links: { key: string; href: string }[] = [
  { key: "nav.home", href: "/" },
  { key: "nav.products", href: "/products" },
  { key: "nav.suppliers", href: "/suppliers" },
  { key: "nav.tradeShows", href: "/trade-shows" },
  { key: "nav.industryChannels", href: "/industry-channels" },
  { key: "nav.tradeAlert", href: "/trade-alert" },
  { key: "nav.buyingRequest", href: "/buying-request" },
];

  return (
    <nav className="bg-brand text-white">
      <div className="max-w-[1400px] mx-auto px-4 flex items-stretch gap-0 max-md:flex-col md:max-xl:flex-col">
        {/* DESKTOP mega-menu — clean list of the 8 main categories
            (mm-cat-N). Hovering a main reveals its CategoryOverviewPanel
            (mm-cat-panel-N) in the shared 860px area. Identical markup to
            the home BannerSection sidebar so both menus look the same.
            globals.css :has(.mm-cat-N:hover) drives the reveal. */}
        <div className="mm-root relative max-xl:hidden">
          <div className="px-6 py-3.5 bg-brand-dark text-white flex items-center gap-2.5 font-bold text-[13.5px] cursor-pointer w-[280px]">
            <span>☰</span> {t("nav.allCategories")} <span className="ml-auto">▾</span>
          </div>
          <div className="mm-wrap absolute top-full left-0 flex items-stretch bg-paper text-ink border border-line shadow-lg z-40">
            <aside className="mm-l1 w-[260px] border-r border-line">
              {NAV_MENU.map((group, idx) => (
                <Link
                  key={group.main.slug}
                  href={`/category/${group.main.slug}`}
                  className={`mm-cat mm-cat-${idx + 1} flex justify-between items-center px-3.5 py-2.5 text-[13px] hover:bg-[#F5F5F5] font-semibold text-ink border-b border-[#F5F5F5] last:border-0`}
                >
                  <b className="font-bold flex items-center gap-2 min-w-0">
                    <span className="text-[16px] flex-shrink-0">{group.main.icon}</span>
                    <span className="truncate">{t(`cat.${group.main.slug}`)}</span>
                  </b>
                  <span className="text-mute2 text-[11px] flex-shrink-0">▸</span>
                </Link>
              ))}
            </aside>
            <div className="mm-panel w-[860px] h-[504px] grid">
              {NAV_MENU.map((group, idx) => (
                <div
                  key={group.main.slug}
                  className={`mm-cat-panel mm-cat-panel-${idx + 1} row-start-1 col-start-1 h-full overflow-hidden`}
                >
                  <CategoryOverviewPanel group={group} t={t} td={td} />
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
              key={l.key}
              href={l.href}
              className="px-4 py-3.5 text-white text-[13.5px] font-medium border-b-[3px] border-transparent -mb-[3px] hover:bg-brand-dark hover:border-b-gold whitespace-nowrap text-center md:max-xl:flex-1 md:max-xl:basis-[20%] md:max-xl:px-2 md:max-xl:py-2.5 md:max-xl:text-[12.5px]"
            >
              {t(l.key)}
            </Link>
          ))}
          <Link
            href="/factory-tour"
            className="px-4 py-3.5 text-gold text-[13.5px] font-medium border-b-[3px] border-transparent -mb-[3px] hover:bg-brand-dark hover:border-b-gold whitespace-nowrap text-center md:max-xl:flex-1 md:max-xl:basis-[20%] md:max-xl:px-2 md:max-xl:py-2.5 md:max-xl:text-[12.5px]"
          >
            🔥 {t("nav.factoryTour")}
          </Link>
        </div>

        {/* TABLET + MOBILE: hamburger drawer for "All Categories".
            Renders each main category as a heading + its full sub-items
            list below (NAV_MENU, not NAV_CATEGORIES) so users can drill
            straight to a sub-category without an extra tap. */}
        <details className="hidden max-xl:block group md:max-xl:order-1">
          <summary className="px-4 py-3 bg-brand-dark text-white flex items-center gap-2.5 font-bold text-[14px] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="text-[18px]">☰</span>
            <span className="flex-1">{t("nav.allCategories")}</span>
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
                  <span className="flex-1 leading-tight">{t(`cat.${group.main.slug}`)}</span>
                  <span className="text-mute2 text-[12px]">›</span>
                </Link>
                <ul className="grid grid-cols-2 md:max-xl:grid-cols-3 gap-0">
                  {group.items.map((it) => (
                    <li key={it.slug}>
                      <Link
                        href={`/category/${group.main.slug}/${it.slug}`}
                        className="flex items-center gap-2 px-4 py-2.5 text-[12.5px] text-ink font-bold border-t border-[#F5F5F5] active:bg-brand active:text-white hover:bg-bg leading-snug"
                      >
                        <span className="flex-shrink-0">{it.icon}</span>
                        <span className="flex-1 truncate">{td(it.name)}</span>
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
              key={l.key}
              href={l.href}
              className="px-3.5 py-2.5 text-white text-[12.5px] font-medium whitespace-nowrap flex-shrink-0 active:bg-brand-dark"
            >
              {t(l.key)}
            </Link>
          ))}
          <Link
            href="/factory-tour"
            className="px-3.5 py-2.5 text-gold text-[12.5px] font-medium whitespace-nowrap flex-shrink-0 active:bg-brand-dark"
          >
            🔥 {t("nav.factoryShort")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
