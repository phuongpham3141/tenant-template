import Link from "next/link";
import type { Section, Badge, Product } from "@/data/home";

const badgeStyle: Record<Badge, string> = {
  top: "bg-gold text-brand-dark",
  new: "bg-success text-white",
  deal: "bg-accent text-white",
  oem: "bg-accent text-white",
  gold: "bg-gold text-brand-dark",
};

const badgeLabel: Record<Badge, string> = {
  top: "HOT",
  new: "MỚI",
  deal: "-25%",
  oem: "OEM",
  gold: "GOLD",
};

function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/product/${p.id}`} className="border border-line rounded-sm bg-white transition cursor-pointer overflow-hidden hover:border-brand hover:shadow-[0_4px_10px_rgba(0,60,143,0.1)] hover:-translate-y-0.5 block">
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

type AllParams = Record<string, string | string[] | undefined>;

function buildTabHref(allParams: AllParams, myParam: string, tabName: string, sectionId: string): string {
  const next = new URLSearchParams();
  for (const [k, v] of Object.entries(allParams)) {
    if (k === myParam) continue;
    if (typeof v === "string") next.set(k, v);
  }
  // Tab "Tất cả" = không cần param; các tab khác đặt giá trị
  if (tabName !== "Tất cả") next.set(myParam, tabName);
  const qs = next.toString();
  return (qs ? `/?${qs}` : "/") + `#sec-${sectionId}`;
}

export function ProductSection({ section, allParams }: { section: Section; allParams: AllParams }) {
  const myParam = `tab-${section.id}`;
  const activeName = typeof allParams[myParam] === "string" ? (allParams[myParam] as string) : section.tabs[0];
  const activeIdx = Math.max(0, section.tabs.indexOf(activeName));
  const visibleProducts =
    activeIdx === 0
      ? section.products
      : section.products.filter((p) => p.tags?.includes(section.tabs[activeIdx]));

  return (
    <div id={`sec-${section.id}`} className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-20 max-md:px-3 max-md:mt-3">
      <div className="bg-paper px-5 py-3.5 flex justify-between items-center border-t-[3px] border-brand rounded-t border-l border-r border-line max-md:flex-col max-md:items-stretch max-md:gap-2 max-md:px-3 max-md:py-2.5">
        <h2 className="text-[18px] font-bold text-ink flex items-center gap-2.5 max-md:text-[15px] max-md:gap-2">
          <span className="w-7 h-7 bg-brand text-white rounded-sm flex items-center justify-center font-bold max-md:w-6 max-md:h-6 max-md:text-[13px]">
            {section.num}
          </span>
          <span className="truncate">{section.title} · {section.cn}</span>
        </h2>
        <div role="tablist" className="flex gap-0 text-[13px] max-md:overflow-x-auto max-md:w-full max-md:-mx-3 max-md:px-3 max-md:text-[12px]">
          {section.tabs.map((t, i) => {
            const isActive = i === activeIdx;
            return (
              <Link
                key={t}
                href={buildTabHref(allParams, myParam, t, section.id)}
                scroll={false}
                role="tab"
                aria-selected={isActive}
                className={`px-3.5 py-1.5 border-b-2 -mb-px cursor-pointer max-md:flex-shrink-0 max-md:whitespace-nowrap transition ${
                  isActive
                    ? "text-brand border-brand font-semibold"
                    : "text-mute border-transparent hover:text-brand"
                }`}
              >
                {t}
              </Link>
            );
          })}
        </div>
        <Link href={`/category/${section.categorySlug}`} className="text-brand text-[12.5px] flex items-center gap-1 cursor-pointer max-md:text-[11.5px] max-md:self-end">
          Xem tất cả {section.totalCount} sp →
        </Link>
      </div>
      <div className="bg-paper rounded-b border-l border-r border-b border-line p-4 grid grid-cols-[280px_1fr] gap-4 max-md:grid-cols-1 max-md:p-2.5 max-md:gap-2.5">
        <Link href={`/supplier/${section.featureSlug}`} className="relative rounded overflow-hidden bg-brand-dark text-white aspect-square cursor-pointer block max-md:aspect-[16/7]">
          <span className="absolute top-3.5 left-3.5 bg-accent text-white px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider z-10">
            {section.feature.badge}
          </span>
          {section.feature.image ? (
            <img
              src={section.feature.image}
              alt=""
              className="w-full h-full object-cover opacity-65"
            />
          ) : null}
          <div
            className="absolute inset-0 p-5.5 flex flex-col justify-end max-md:p-3"
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
        <div className="grid grid-cols-4 gap-2.5 max-md:grid-cols-2">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((p) => <ProductCard key={p.id} p={p} />)
          ) : (
            <div className="col-span-full text-center text-[12.5px] text-mute py-10">
              Chưa có sản phẩm trong tab này.
            </div>
          )}
          {activeIdx > 0 && visibleProducts.length > 0 && (
            <div className="col-span-full text-center text-[12.5px] text-mute pt-2 pb-1">
              Đang lọc theo: <b className="text-ink">{section.tabs[activeIdx]}</b>{" "}
              ({visibleProducts.length} sản phẩm) ·{" "}
              <Link href={`/category/${section.categorySlug}`} className="text-brand">
                Xem thêm trong danh mục →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
