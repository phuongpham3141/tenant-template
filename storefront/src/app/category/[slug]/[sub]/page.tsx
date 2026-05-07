import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SupBanner } from "@/components/products/sup-banner";
import { TitleTabs } from "@/components/products/title-tabs";
import { SubChips } from "@/components/products/sub-chips";
import { FiltersSidebar } from "@/components/products/filters-sidebar";
import { ProdCard } from "@/components/products/prod-card";
import { Pagination } from "@/components/products/pagination";
import { Trending } from "@/components/products/trending";
import { Faq } from "@/components/products/faq";
import { NotFoundBlock } from "@/components/products/not-found-block";
import { getLeafCategory } from "@/data/products";
import { getCategory } from "@/data/categories";
import { NAV_CATEGORIES } from "@/data/home";

export default async function LeafCategoryPage({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const data = getLeafCategory(slug, sub);
  const parent = getCategory(slug);
  const navEntry = NAV_CATEGORIES.find((c) => c.slug === slug);

  if (!data) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <Breadcrumb
          trail={[
            { label: "Trang chủ", href: "/" },
            { label: "Danh mục sản phẩm" },
            {
              label: parent?.title ?? navEntry?.name ?? slug,
              href: `/category/${slug}`,
            },
            { label: sub },
          ]}
        />
        <div className="bg-paper border border-line rounded p-12 mt-6 text-center">
          <div className="text-[48px] mb-3">🔧</div>
          <h1 className="text-[24px] font-bold text-ink mb-2">{sub}</h1>
          <p className="text-[13px] text-mute mb-5">
            Danh sách sản phẩm cho danh mục này đang được cập nhật. Quay lại sau
            hoặc duyệt danh mục cha.
          </p>
          <Link
            href={`/category/${slug}`}
            className="inline-block px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] hover:bg-brand-light"
          >
            ← {parent?.title ?? navEntry?.name ?? "Quay lại danh mục"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Danh mục sản phẩm" },
          { label: data.parentName, href: `/category/${data.parentSlug}` },
          { label: data.l2Name },
          { label: data.title },
        ]}
      />
      <SupBanner sup={data.featured} />
      <TitleTabs data={data} />
      <SubChips chips={data.chips} />

      <div className="max-w-[1400px] mx-auto px-4 mt-4 grid grid-cols-[240px_1fr] gap-4 max-md:grid-cols-1">
        <FiltersSidebar filters={data.filters} />
        <div>
          <div className="flex flex-col gap-3">
            {data.products.map((p) => (
              <ProdCard key={p.id} p={p} />
            ))}
          </div>
          <Pagination />
        </div>
      </div>

      <Trending chips={data.trendingChips} />
      <Faq title={data.title} faqs={data.faqs} />
      <NotFoundBlock keyword={data.title} />
      <div className="h-8" />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const data = getLeafCategory(slug, sub);
  return {
    title: data ? `${data.title} — ${data.resultsCount} kết quả · AlibabaVN` : `${sub} · AlibabaVN`,
    description: data
      ? `${data.resultsCount} ${data.title} từ nhà cung cấp đã kiểm định tại Trung Quốc. Báo giá nhanh trong 24h trên AlibabaVN.`
      : undefined,
  };
}
