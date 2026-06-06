import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";
import { PARTNERS, productSlug } from "@/data/partners";
import { getT } from "@/lib/t";
import { getTd } from "@/lib/td";

/** Toàn bộ sản phẩm THẬT từ tất cả đối tác (chỉ lấy SP có ảnh) — single source of truth. */
const ALL_PRODUCTS = PARTNERS.flatMap((partner) =>
  partner.products
    .filter((prod) => Boolean(prod.image))
    .map((prod) => {
      const ps = productSlug(prod);
      return {
        key: `${partner.slug}-${ps}`,
        href: `/info/partners/${partner.slug}/${ps}`,
        title: prod.name,
        image: prod.image as string,
        series: prod.series ?? "",
        seller: partner.name,
      };
    })
);

const PER_PAGE = 48;
const TOTAL_PAGES = Math.max(1, Math.ceil(ALL_PRODUCTS.length / PER_PAGE));

const FILTERS = [{ title: "products.filter_industry", options: NAV_CATEGORIES.map((c) => c.name) }];

/** Dãy số trang kiểu "1 2 3 4 5 … last" (windowed). */
function pageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const t = await getT();
  const td = await getTd();
  const sp = await searchParams;
  const raw = parseInt(sp.page ?? "1", 10);
  const page = Number.isFinite(raw) ? Math.min(Math.max(raw, 1), TOTAL_PAGES) : 1;
  const start = (page - 1) * PER_PAGE;
  const items = ALL_PRODUCTS.slice(start, start + PER_PAGE);
  const pages = pageList(page, TOTAL_PAGES);

  return (
    <>
      <Breadcrumb trail={[{ label: t("products.breadcrumb_home"), href: "/" }, { label: t("products.breadcrumb_all") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5 flex justify-between items-end max-md:flex-col max-md:items-start max-md:gap-3">
          <div>
            <h1 className="text-[24px] font-extrabold text-ink leading-tight">{t("products.heading")}</h1>
            <p className="text-[13px] text-mute mt-1">
              {ALL_PRODUCTS.length.toLocaleString()} {t("products.subtitle_products_from")} {PARTNERS.length} {t("products.subtitle_suffix")}
            </p>
          </div>
          <div className="text-[12.5px] text-mute">{t("products.page_label")} {page} / {TOTAL_PAGES}</div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 mt-4 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        {/* Sidebar — danh mục theo ngành */}
        <aside className="bg-paper border border-line rounded p-4 self-start space-y-5">
          {FILTERS.map((f) => (
            <div key={f.title}>
              <b className="block text-[13px] font-semibold text-ink mb-2">{t(f.title)}</b>
              <ul className="space-y-1.5">
                {f.options.map((o, i) => (
                  <li key={o}>
                    <Link
                      href={`/category/${NAV_CATEGORIES[i]?.slug ?? ""}`}
                      className="flex items-center gap-2 text-[12.5px] text-mute hover:text-brand"
                    >
                      <span className="text-[13px]">{NAV_CATEGORIES[i]?.icon}</span> {td(o)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link href="/info/partners" className="block text-[12.5px] text-brand font-semibold hover:underline">
            {t("products.view_all_partners_prefix")} {PARTNERS.length} {t("products.view_all_partners_suffix")}
          </Link>
        </aside>

        {/* Grid */}
        <div>
          <div className="text-[12px] text-mute mb-2">
            {t("products.showing")} {start + 1}–{Math.min(start + PER_PAGE, ALL_PRODUCTS.length)} / {ALL_PRODUCTS.length.toLocaleString()} {t("products.showing_products_suffix")}
          </div>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {items.map((p) => (
              <Link
                key={p.key}
                href={p.href}
                className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand hover:shadow-[0_4px_10px_rgba(0,60,143,0.1)] hover:-translate-y-0.5 transition block"
              >
                <div className="aspect-square bg-[#F5F5F5] overflow-hidden">
                  <img src={p.image} alt={td(p.title)} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-2.5">
                  <h4 className="text-[12.5px] text-ink line-clamp-2 mb-1 min-h-[32px] leading-tight">{td(p.title)}</h4>
                  {p.series && <div className="text-[11px] text-mute2 truncate mb-1">{td(p.series)}</div>}
                  <div className="text-[11px] text-mute mt-1 pt-1.5 border-t border-dashed border-line flex items-center gap-1 truncate">
                    <span className="cn-flag" />
                    <span className="truncate">{p.seller}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Phân trang — 1 2 3 4 5 … {last}  Sau → */}
          <nav className="flex justify-center items-center gap-1 mt-6 mb-8 flex-wrap" aria-label={t("products.pagination_aria")}>
            {page > 1 && (
              <Link href={`/products?page=${page - 1}`} className="px-3 py-1.5 text-[12.5px] rounded-sm border border-line text-mute hover:border-brand">
                {t("products.prev")}
              </Link>
            )}
            {pages.map((pg, i) =>
              pg === "…" ? (
                <span key={`e-${i}`} className="min-w-[34px] px-2.5 py-1.5 text-[12.5px] text-mute2 text-center select-none">…</span>
              ) : (
                <Link
                  key={pg}
                  href={`/products?page=${pg}`}
                  aria-current={pg === page ? "page" : undefined}
                  className={`min-w-[34px] px-2.5 py-1.5 text-[12.5px] rounded-sm text-center ${
                    pg === page ? "bg-brand text-white font-semibold" : "border border-line text-mute hover:border-brand"
                  }`}
                >
                  {pg}
                </Link>
              )
            )}
            {page < TOTAL_PAGES && (
              <Link href={`/products?page=${page + 1}`} className="px-3 py-1.5 text-[12.5px] rounded-sm border border-line text-mute hover:border-brand font-medium">
                {t("products.next")}
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
