import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { OverviewCard } from "@/components/category/overview-card";
import { AllCatNav } from "@/components/category/all-cat-nav";
import { SecBlock } from "@/components/category/sec-block";
import { CatFoot } from "@/components/category/cat-foot";
import { getCategory } from "@/data/categories";
import { NAV_CATEGORIES } from "@/data/home";
import { partnersByCategory, type PartnerBrand } from "@/data/partners";
import { getT } from "@/lib/t";
import { getTd } from "@/lib/td";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const t = await getT();
  const td = await getTd();
  const { slug } = await params;
  const data = getCategory(slug);
  const navEntry = NAV_CATEGORIES.find((c) => c.slug === slug);

  if (!data) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-16">
        <Breadcrumb
          trail={[
            { label: t("category_slug.breadcrumb_home"), href: "/" },
            { label: t("category_slug.breadcrumb_product_categories") },
            { label: td(navEntry?.name ?? slug) },
          ]}
        />
        <div className="bg-paper border border-line rounded p-12 mt-6 text-center">
          <div className="text-[48px] mb-3">{navEntry?.icon ?? "📦"}</div>
          <h1 className="text-[24px] font-bold text-ink mb-2">
            {td(navEntry?.name ?? slug)}
          </h1>
          <p className="text-[13px] text-mute mb-5">
            {t("category_slug.not_found_desc")}
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] hover:bg-brand-light"
          >
            {t("category_slug.back_to_home")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb
        trail={[
          { label: t("category_slug.breadcrumb_home"), href: "/" },
          { label: t("category_slug.breadcrumb_product_categories") },
          { label: data.title },
        ]}
      />
      <OverviewCard data={data} />
      <AllCatNav sections={data.sections} />
      {data.sections.map((s) => (
        <SecBlock key={s.id} section={s} parentSlug={data.slug} />
      ))}
      <PartnersInCategory categorySlug={data.slug} />
      <CatFoot data={data} />
    </>
  );
}

/**
 * Lists Huayue's official partner factories within this industry.
 * Only renders if at least 1 partner is mapped to the category slug.
 */
async function PartnersInCategory({ categorySlug }: { categorySlug: string }) {
  const t = await getT();
  // category slug from categories.ts (e.g. "noi-that") must match the
  // partners.category union — only render if it matches one of the
  // type-allowed values.
  const allowed = [
    "home-garden",
    "construction-materials",
    "bathroom-sanitary",
    "noi-that",
    "kitchen-equipment",
    "lighting",
    "doors-windows",
    "electrical",
  ] as const;
  if (!(allowed as readonly string[]).includes(categorySlug)) return null;
  const partners = partnersByCategory(
    categorySlug as PartnerBrand["category"]
  );
  if (partners.length === 0) return null;

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-5 max-md:px-3">
      <div className="bg-paper border border-line rounded p-5 max-md:p-3">
        <h2 className="text-[18px] font-bold text-ink mb-4 flex items-center gap-2 max-md:text-[16px]">
          <span className="w-1 h-5 bg-brand rounded-sm" />
          {t("category_slug.partner_factories_title")}
          <span className="text-[12px] text-mute font-normal ml-1">
            · {partners.length} {t("category_slug.certified_brands")}
          </span>
        </h2>

        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 max-md:gap-3">
          {partners.map((p) => (
            <Link
              key={p.slug}
              href={`/info/partners/${p.slug}`}
              className="flex items-start gap-3 bg-bg border border-line rounded-lg p-3 hover:border-brand hover:shadow-sm transition group"
            >
              <div className={`w-[64px] h-[64px] flex-shrink-0 rounded border flex items-center justify-center overflow-hidden ${p.logoBg === "dark" ? "bg-brand-dark border-brand-dark" : "bg-white border-line"}`}>
                {p.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-w-full max-h-full object-contain p-1"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-[28px]">🏭</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-bold text-ink group-hover:text-brand leading-tight mb-0.5">
                  {p.name}
                </h3>
                <p className="text-[11px] text-mute mb-1.5">
                  {p.nameOriginal}
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] text-mute">
                  <span>📦 {p.products.length} SKU</span>
                  <span className="truncate">
                    📍 {p.factory.location.split(",")[0]}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-line text-center">
          <Link
            href="/info/partners"
            className="inline-flex items-center gap-1 text-[13px] text-brand font-semibold hover:underline"
          >
            {t("category_slug.view_all_partners")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getCategory(slug);
  const navEntry = NAV_CATEGORIES.find((c) => c.slug === slug);
  const name = data?.title ?? navEntry?.name ?? slug;
  return {
    title: `${name} — Huayuesc`,
    description:
      data?.intro ??
      `Discover ${name} from leading Chinese manufacturers on Huayuesc.`,
  };
}
