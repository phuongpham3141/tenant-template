import Link from "next/link";
import type { Section, Badge, Product } from "@/data/home";

/**
 * Product section — purely Vietnamese (no 中文 subtitle), with instant
 * tab switching driven by hidden radios + CSS :has() (zero JS, zero
 * navigation, no flash). The feature image stretches to the full height
 * of the products grid via items-stretch + h-full.
 *
 * Tab visibility rules live in globals.css (.ps-root :has(.ps-radio-N:checked)
 * .ps-grid-N { display: grid }) covering up to 8 tabs per section.
 */

const badgeStyle: Record<Badge, string> = {
  top: "bg-gold text-brand-dark",
  new: "bg-success text-white",
  deal: "bg-accent text-white",
  oem: "bg-accent text-white",
  gold: "bg-gold text-brand-dark",
};

const badgeLabel: Record<Badge, string> = {
  top: "BÁN CHẠY",
  new: "MỚI",
  deal: "-25%",
  oem: "OEM",
  gold: "VÀNG",
};

function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.id}`}
      className="border border-line rounded-sm bg-white transition cursor-pointer overflow-hidden hover:border-brand hover:shadow-[0_4px_10px_rgba(0,60,143,0.1)] hover:-translate-y-0.5 block"
    >
      <div className="aspect-square overflow-hidden relative bg-[#F5F5F5]">
        {p.badges && p.badges.length > 0 && (
          <div className="absolute top-1.5 left-1.5 flex gap-0.5 flex-wrap">
            {p.badges.map((b) => (
              <span
                key={b}
                className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider ${badgeStyle[b]}`}
              >
                {b === "deal" ? "-25%" : badgeLabel[b]}
              </span>
            ))}
          </div>
        )}
        {p.image ? (
          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
        ) : null}
      </div>
      <div className="p-2.5">
        <h4 className="text-[12.5px] font-medium leading-tight text-ink mb-1.5 min-h-[32px] line-clamp-2">
          {p.title}
        </h4>
        <div className="text-accent font-extrabold text-[15px] mb-1">
          {p.price}
          <small className="text-mute font-normal text-[11px]">{p.unit}</small>
        </div>
        <div className="text-[11px] text-mute flex justify-between mb-1.5">
          <span>{p.moq}</span>
          <span>★{p.rating}</span>
        </div>
        <div className="flex items-center gap-1 py-1.5 border-t border-dashed border-line text-[11px] text-mute">
          <span className="cn-flag" />
          {p.seller}
          <span className="bg-brand text-white px-1.5 py-px rounded-sm text-[9px] font-bold ml-auto">
            {p.years}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProductSection({ section }: { section: Section }) {
  // Pre-compute each tab's product list. Tab[0] = "Tất cả" → all products;
  // others filter by tag matching the tab name. Cap at 8 = 2 rows × 4 cols
  // so every section has identical 2-row height (image stays compact).
  const PER_TAB = 8;
  const tabLists = section.tabs.map((tabName, i) =>
    (i === 0 ? section.products : section.products.filter((p) => p.tags?.includes(tabName))).slice(0, PER_TAB)
  );

  return (
    <div
      id={`sec-${section.id}`}
      className="ps-root max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-20 max-md:px-3 max-md:mt-3"
    >
      {/* Hidden radios drive the .ps-tab and .ps-grid visibility via :has() */}
      {section.tabs.map((_, i) => (
        <input
          key={`r-${i}`}
          type="radio"
          name={`ps-${section.id}`}
          id={`ps-${section.id}-${i + 1}`}
          defaultChecked={i === 0}
          className={`hidden ps-radio-${i + 1}`}
        />
      ))}

      {/* === HEADER ===================================================== */}
      <div className="bg-paper px-5 py-3.5 flex justify-between items-center border-t-[3px] border-brand rounded-t border-l border-r border-line max-md:flex-col max-md:items-stretch max-md:gap-2 max-md:px-3 max-md:py-2.5">
        <h2 className="text-[18px] font-bold text-ink flex items-center gap-2.5 max-md:text-[15px] max-md:gap-2">
          <span className="w-7 h-7 bg-brand text-white rounded-sm flex items-center justify-center font-bold max-md:w-6 max-md:h-6 max-md:text-[13px]">
            {section.num}
          </span>
          <span className="truncate">{section.title}</span>
        </h2>
        <div
          role="tablist"
          className="flex gap-0 text-[13px] max-md:overflow-x-auto max-md:w-full max-md:-mx-3 max-md:px-3 max-md:text-[12px]"
        >
          {section.tabs.map((t, i) => (
            <label
              key={t}
              htmlFor={`ps-${section.id}-${i + 1}`}
              role="tab"
              className={`ps-tab ps-tab-${
                i + 1
              } px-3.5 py-1.5 border-b-2 -mb-px cursor-pointer max-md:flex-shrink-0 max-md:whitespace-nowrap transition`}
            >
              {t}
            </label>
          ))}
        </div>
        <Link
          href={`/category/${section.categorySlug}`}
          className="text-brand text-[12.5px] flex items-center gap-1 cursor-pointer max-md:text-[11.5px] max-md:self-end"
        >
          Xem tất cả {section.totalCount} sp →
        </Link>
      </div>

      {/* === BODY ======================================================== */}
      <div className="bg-paper rounded-b border-l border-r border-b border-line p-4 grid grid-cols-[320px_1fr] gap-4 items-stretch md:max-xl:grid-cols-[220px_1fr] md:max-xl:gap-3 max-md:grid-cols-1 max-md:p-2.5 max-md:gap-2.5">
        {/* Feature image — h-full stretches to full grid row height (matches products) */}
        <Link
          href={`/supplier/${section.featureSlug}`}
          className="relative rounded overflow-hidden bg-brand-dark text-white h-full cursor-pointer block max-md:aspect-[16/7] max-md:h-auto"
        >
          <span className="absolute top-3.5 left-3.5 bg-accent text-white px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider z-10">
            {section.feature.badge}
          </span>
          {section.feature.image ? (
            <img
              src={section.feature.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-65"
            />
          ) : null}
          <div
            className="absolute inset-0 p-5 flex flex-col justify-end max-md:p-3"
            style={{
              background: "linear-gradient(transparent 20%, rgba(0,37,87,0.9))",
            }}
          >
            <h3 className="text-[22px] font-bold mb-1.5 leading-tight max-md:text-[15px] max-md:mb-1">
              {section.feature.title}
            </h3>
            <p className="text-[12px] opacity-90 mb-3.5 max-md:text-[11px] max-md:mb-2 max-md:line-clamp-2">
              {section.feature.desc}
            </p>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold text-brand-dark font-bold text-[12.5px] rounded-sm self-start max-md:px-2.5 max-md:py-1.5 max-md:text-[11.5px]">
              {section.feature.cta}
            </span>
          </div>
        </Link>

        {/* Product grids — all stacked, only the active one shown via CSS.
            Always 2 rows × 4 cols (8 cells) so layout never jumps when
            switching tabs. Empty cells render as a soft placeholder. */}
        <div>
          {section.tabs.map((tabName, i) => {
            const list = tabLists[i];
            const empties = Math.max(0, PER_TAB - list.length);
            return (
              <div
                key={tabName}
                role="tabpanel"
                aria-labelledby={`ps-${section.id}-${i + 1}`}
                className={`ps-grid ps-grid-${i + 1} grid grid-cols-4 grid-rows-2 gap-2.5 md:max-xl:grid-cols-3 md:max-xl:grid-rows-none max-md:grid-cols-2 max-md:grid-rows-none`}
              >
                {list.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
                {Array.from({ length: empties }).map((_, k) => (
                  <Link
                    key={`empty-${k}`}
                    href={`/category/${section.categorySlug}?tag=${encodeURIComponent(tabName)}`}
                    className="border border-dashed border-line rounded-sm bg-bg/50 flex items-center justify-center text-[12px] text-mute2 hover:border-brand hover:text-brand cursor-pointer max-md:hidden"
                  >
                    {k === 0 && list.length === 0 ? (
                      <span className="text-center px-2">
                        Chưa có sản phẩm
                        <br />
                        <small className="text-[11px]">trong tab "{tabName}"</small>
                      </span>
                    ) : (
                      <span className="opacity-60">+ Xem thêm</span>
                    )}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
