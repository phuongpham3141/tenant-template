import Link from "@/components/i18n-link";
import { preload } from "react-dom";
import { NAV_MENU } from "@/data/home";
import { HeroSlider } from "@/components/home/hero-slider";
import { CategoryOverviewPanel } from "@/components/home/mega-submenu";
import { getT } from "@/lib/t";
import { getTd } from "@/lib/td";

/**
 * BannerSection sidebar — only the main categories are visible (a clean
 * 8-item list). Hovering a main category reveals its overview panel on
 * the right (absolute, overlays the hero). globals.css `.mm-cat-N` /
 * `.mm-cat-panel-N` rules drive the toggle via :has() — no JS needed.
 * The NavBar "TẤT CẢ DANH MỤC" dropdown uses the same markup so the two
 * menus look identical.
 */
async function CategoryMenu() {
  const t = await getT();
  const td = await getTd();
  return (
    <div className="mm-wrap relative h-full">
      <aside className="mm-l1 bg-paper border border-line rounded h-full overflow-y-auto py-2">
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
      {/* Right panel: 860px wide. One CategoryOverviewPanel per main
          category; CSS reveals only the one whose .mm-cat-N is hovered. */}
      <div className="mm-panel absolute left-full top-0 ml-[12px] w-[860px] h-full bg-paper border border-line rounded shadow-xl z-50 grid overflow-hidden">
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
  );
}

async function RightWidgets() {
  const t = await getT();
  const td = await getTd();
  return (
    <aside className="h-full flex flex-col gap-2.5 max-md:h-auto">
      <form action="/buying-request" method="get" className="bg-paper border border-line rounded overflow-hidden flex-shrink-0">
        <div className="bg-brand text-white px-3.5 py-2.5 font-semibold text-[13px] flex items-center gap-1.5">
          📋 {t("rfq.title")}
        </div>
        <div className="p-3.5">
          <p className="text-[11.5px] text-mute mb-2.5">
            {t("rfq.desc")}
          </p>
          <input
            name="q"
            placeholder={t("rfq.ph_product")}
            className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand"
          />
          <input
            name="qty"
            placeholder={t("rfq.ph_qty")}
            className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand"
          />
          <textarea
            name="desc"
            placeholder={t("rfq.ph_desc")}
            className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand resize-none min-h-[60px]"
          />
          <button type="submit" className="w-full py-2.5 bg-accent text-white border-0 rounded-sm font-bold text-[12.5px] cursor-pointer hover:bg-[#B81827]">
            🚀 {t("rfq.submit")}
          </button>
        </div>
      </form>
      <div
        className="text-white p-4 rounded flex-1 flex flex-col justify-between min-h-[120px]"
        style={{ background: "linear-gradient(135deg,#E85D4E,#E8364A)" }}
      >
        <div>
          <b className="block text-[15px] font-bold mb-1">🎁 {t("promo.title")}</b>
          <p className="text-[11.5px] opacity-90 mb-2.5 leading-snug">
            {t("promo.desc")}
          </p>
        </div>
        <Link href="/register/dealer" className="inline-block px-3.5 py-1.5 bg-gold text-brand-dark text-[12px] font-bold rounded-sm cursor-pointer">
          {t("promo.cta")} →
        </Link>
      </div>
    </aside>
  );
}

export function BannerSection() {
  preload("/img/heroint.webp?v=7", { as: "image", fetchPriority: "high", type: "image/webp" });
  return (
    <section className="py-4 bg-paper max-md:py-2">
      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-[240px_1fr_240px] gap-3 items-stretch h-[504px] max-[1280px]:grid-cols-1 max-[1280px]:h-auto max-md:gap-2 max-md:px-3">
        {/* CategoryMenu ẩn trên tablet & mobile — mega-panel 860px sẽ
            tràn ngoài viewport iPad. Tablet/mobile có drawer ở NavBar. */}
        <div className="max-xl:hidden h-full relative" style={{ zIndex: 10 }}>
          <CategoryMenu />
        </div>
        <div className="relative" style={{ zIndex: 1 }}>
          <HeroSlider />
        </div>
        <RightWidgets />
      </div>
    </section>
  );
}
