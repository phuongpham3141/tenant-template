import { Img } from "@/components/ui/img";
import Link from "@/components/i18n-link";
import { HOT_SEARCHES } from "@/data/home";
import { getT } from "@/lib/t";
import { getTd } from "@/lib/td";

/**
 * Header layout — grid 2D so the search FORM (row 2 col 2) and the CTA
 * BUTTONS (row 2 col 3) sit on the same grid row → identical Y position,
 * identical height (h-12). Logo spans all 3 rows, self-center vertically.
 *
 * Tab visibility is :has()-driven via globals.css (.search-root:has(#st-X:checked)
 * .form-X / .tab-X) so radios + labels + forms can live anywhere in the tree.
 */
export async function Header() {
  const t = await getT();
  const td = await getTd();
  return (
    <header className="search-root bg-paper py-4 border-b-[3px] border-brand relative z-10 max-md:py-3">
      {/* Hidden radios — drive .search-root:has() rules in globals.css */}
      <input
        type="radio"
        name="search-tab"
        id="st-products"
        defaultChecked
        className="hidden"
      />
      <input
        type="radio"
        name="search-tab"
        id="st-suppliers"
        className="hidden"
      />
      <input
        type="radio"
        name="search-tab"
        id="st-rfq"
        className="hidden"
      />

      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-[240px_1fr_auto] grid-rows-[auto_auto_auto] gap-x-6 gap-y-1.5 md:max-xl:grid-cols-[200px_1fr] md:max-xl:gap-x-4 max-md:grid-cols-1 max-md:gap-x-0 max-md:gap-y-2">
        {/* LOGO — desktop: horizontal logo, width = 240px (matches ALL
            CATEGORIES sidebar width); tablet: 200px (matches col-1 width).
            Mobile: horizontal logo at 80% of the row width. */}
        <Link
          href="/"
          className="col-start-1 row-start-1 row-span-3 self-center flex items-center max-md:row-span-1 max-md:w-full max-md:justify-center"
          aria-label="Huayuesc — Home"
        >
          {/* Desktop & tablet: horizontal logo fills the logo column */}
          <Img loading="eager" fetchPriority="low" decoding="async"
            src="/logo/cybersilkroads-horizontal.png?v=6"
            alt="Huayuesc"
            width={400}
            height={200}
            className="w-[240px] h-auto max-md:hidden md:max-xl:w-[200px]"
          />
          {/* Mobile: compact horizontal logo. Capped at max-w to keep header
              tidy on small screens (avoids huge logo dominating viewport). */}
          <Img loading="eager" fetchPriority="low" decoding="async"
            src="/logo/cybersilkroads-horizontal-compact.png?v=6"
            alt="Huayuesc"
            width={400}
            height={120}
            className="hidden h-auto max-md:block max-md:max-h-[56px] max-md:w-auto"
          />
        </Link>

        {/* TABS — full-width row matching the search form below it; each
            tab takes exactly 1/3 of that width via flex-1. */}
        <div className="col-start-2 row-start-1 w-full flex gap-0.5 text-[13px] max-md:col-start-1 max-md:row-start-2">
          <label
            htmlFor="st-products"
            className="search-tab tab-products flex-1 py-1.5 font-medium rounded-t cursor-pointer transition text-center max-md:text-[12px]"
          >
            {t("header.tab_products")}
          </label>
          <label
            htmlFor="st-suppliers"
            className="search-tab tab-suppliers flex-1 py-1.5 font-medium rounded-t cursor-pointer transition text-center max-md:text-[12px]"
          >
            {t("header.tab_suppliers")}
          </label>
          <label
            htmlFor="st-rfq"
            className="search-tab tab-rfq flex-1 py-1.5 font-medium rounded-t cursor-pointer transition text-center max-md:text-[12px]"
          >
            {t("header.tab_rfq")}
          </label>
        </div>

        {/* FORMS — all stack at row 2 col 2; only the active one is display:flex */}
        <form
          action="/search"
          method="get"
          className="search-form form-products col-start-2 row-start-2 h-12 border-2 border-brand rounded-[0_4px_4px_4px] overflow-hidden bg-white max-md:col-start-1 max-md:row-start-3"
        >
          <div className="px-3.5 bg-[#F5F7FA] flex items-center gap-1.5 text-[13px] text-mute border-r border-line max-md:hidden">
            {t("header.filter_all")}
          </div>
          <input
            name="q"
            className="flex-1 min-w-0 px-3.5 outline-none font-sans text-[14px]"
            placeholder={t("header.ph_products")}
          />
          <button
            type="submit"
            formAction="/search/by-image"
            className="px-3 bg-[#F5F7FA] hover:bg-[#E0E5EC] text-mute text-[18px] border-l border-line cursor-pointer flex items-center"
            aria-label={t("header.img_search_aria")}
            title={t("header.img_search_title")}
          >
            📷
          </button>
          <button
            type="submit"
            aria-label={t("header.search_product_aria")}
            title={t("header.search_product_title")}
            className="px-7 bg-brand text-white text-[22px] hover:bg-brand-light cursor-pointer flex items-center justify-center max-md:px-5 max-md:text-[19px]"
          >
            🔍
          </button>
        </form>
        <form
          action="/suppliers"
          method="get"
          className="search-form form-suppliers col-start-2 row-start-2 h-12 border-2 border-brand rounded-[0_4px_4px_4px] overflow-hidden bg-white max-md:col-start-1 max-md:row-start-3"
        >
          <div className="px-3.5 bg-[#F5F7FA] flex items-center gap-1.5 text-[13px] text-mute border-r border-line max-md:hidden">
            {t("header.filter_all")}
          </div>
          <input
            name="q"
            className="flex-1 min-w-0 px-3.5 outline-none font-sans text-[14px]"
            placeholder={t("header.ph_suppliers")}
          />
          <button
            type="submit"
            formAction="/search/by-image"
            className="px-3 bg-[#F5F7FA] hover:bg-[#E0E5EC] text-mute text-[18px] border-l border-line cursor-pointer flex items-center"
            aria-label={t("header.img_supplier_aria")}
            title={t("header.img_supplier_title")}
          >
            📷
          </button>
          <button
            type="submit"
            aria-label={t("header.search_supplier_aria")}
            title={t("header.search_supplier_title")}
            className="px-7 bg-brand text-white text-[22px] hover:bg-brand-light cursor-pointer flex items-center justify-center max-md:px-5 max-md:text-[19px]"
          >
            🏭
          </button>
        </form>
        <form
          action="/buying-request"
          method="get"
          className="search-form form-rfq col-start-2 row-start-2 h-12 border-2 border-brand rounded-[0_4px_4px_4px] overflow-hidden bg-white max-md:col-start-1 max-md:row-start-3"
        >
          <div className="px-3.5 bg-[#F5F7FA] flex items-center gap-1.5 text-[13px] text-mute border-r border-line max-md:hidden">
            {t("header.filter_all")}
          </div>
          <input
            name="q"
            className="flex-1 min-w-0 px-3.5 outline-none font-sans text-[14px]"
            placeholder={t("header.ph_rfq")}
          />
          <button
            type="submit"
            formAction="/search/by-image"
            className="px-3 bg-[#F5F7FA] hover:bg-[#E0E5EC] text-mute text-[18px] border-l border-line cursor-pointer flex items-center"
            aria-label={t("header.img_rfq_aria")}
            title={t("header.img_rfq_title")}
          >
            📷
          </button>
          <button
            type="submit"
            aria-label={t("header.send_rfq_aria")}
            title={t("header.send_rfq_title")}
            className="px-7 bg-accent text-white text-[22px] hover:bg-[#B81827] cursor-pointer flex items-center justify-center max-md:px-5 max-md:text-[19px]"
          >
            📨
          </button>
        </form>

        {/* CTAs — desktop only (lg+, row 2 col 3, h-12). Hidden on tablet & mobile. */}
        <div className="col-start-3 row-start-2 flex gap-2.5 items-center max-xl:hidden">
          <Link
            href="/buying-request"
            className="h-12 w-[170px] inline-flex items-center justify-center gap-1.5 border-2 border-brand text-brand rounded font-semibold text-[13px] hover:bg-brand hover:text-white cursor-pointer"
          >
            📥 {t("header.cta_rfq")}
          </Link>
          <Link
            href="/register/buyer"
            className="h-12 w-[170px] inline-flex items-center justify-center gap-1.5 bg-brand text-white border-2 border-brand rounded font-semibold text-[13px] hover:bg-brand-light hover:border-brand-light cursor-pointer"
          >
            {t("header.cta_register_buyer")} →
          </Link>
        </div>

        {/* HOT SEARCH — row 3 col 2 */}
        <div className="col-start-2 row-start-3 text-[11.5px] text-mute flex gap-3 flex-wrap max-md:hidden">
          <b className="text-ink">{t("header.hot_searches")}</b>
          {HOT_SEARCHES.map((s) => (
            <Link
              key={s}
              href={`/search?q=${encodeURIComponent(s)}`}
              className="text-brand cursor-pointer"
            >
              {td(s)}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
