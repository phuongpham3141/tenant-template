import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { OverviewCard } from "@/components/category/overview-card";
import { AllCatNav } from "@/components/category/all-cat-nav";
import { SecBlock } from "@/components/category/sec-block";
import { CatFoot } from "@/components/category/cat-foot";
import { getCategory } from "@/data/categories";
import { NAV_CATEGORIES } from "@/data/home";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getCategory(slug);
  const navEntry = NAV_CATEGORIES.find((c) => c.slug === slug);

  if (!data) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-16">
        <Breadcrumb
          trail={[
            { label: "Trang chủ", href: "/" },
            { label: "Danh mục sản phẩm" },
            { label: navEntry?.name ?? slug },
          ]}
        />
        <div className="bg-paper border border-line rounded p-12 mt-6 text-center">
          <div className="text-[48px] mb-3">{navEntry?.icon ?? "📦"}</div>
          <h1 className="text-[24px] font-bold text-ink mb-2">
            {navEntry?.name ?? slug}
          </h1>
          <p className="text-[13px] text-mute mb-5">
            Danh mục này đang được hoàn thiện. Mời quý khách quay lại sau hoặc
            xem các danh mục khác.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] hover:bg-brand-light"
          >
            ← Quay về trang chủ
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
          { label: data.title },
        ]}
      />
      <OverviewCard data={data} />
      <AllCatNav sections={data.sections} />
      {data.sections.map((s) => (
        <SecBlock key={s.id} section={s} parentSlug={data.slug} />
      ))}
      <CatFoot data={data} />
    </>
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
    title: `${name} — Cybersilkroads`,
    description:
      data?.intro ??
      `Khám phá ${name} từ các nhà sản xuất hàng đầu Trung Quốc trên Cybersilkroads.`,
  };
}
