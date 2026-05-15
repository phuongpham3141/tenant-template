import { Breadcrumb } from "@/components/category/breadcrumb";
import { FACTORIES, SECTIONS } from "@/data/home";
import type { Factory } from "@/data/home";
import { SupplierDetail } from "./SupplierDetail";

function getFactory(slug: string): Factory {
  return (
    FACTORIES.find((f) => f.slug === slug) ?? {
      initials: slug.slice(0, 2).toUpperCase(),
      slug,
      name: slug.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ") + " Co., Ltd.",
      location: "Foshan, Guangdong · CN",
      rating: 4.7,
      reviews: "350",
      meta: "Nhà máy đã xác minh",
      badges: { audited: true, years: "8Y" },
      tags: ["OEM", "ODM", "Export"],
    }
  );
}

export default async function SupplierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = getFactory(slug);
  const allProducts = SECTIONS.flatMap((s) => s.products);
  const ownProducts = allProducts.filter((p) => p.seller.toLowerCase().includes(f.name.split(" ")[0].toLowerCase())).slice(0, 24);
  const heroProducts = ownProducts.length >= 4 ? ownProducts.slice(0, 8) : allProducts.slice(0, 8);

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Nhà cung cấp", href: "/suppliers" },
          { label: f.name },
        ]}
      />
      <SupplierDetail
        factory={f}
        heroProducts={heroProducts}
        ownProducts={ownProducts}
        allProducts={allProducts}
      />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = getFactory(slug);
  return { title: `${f.name} — Cybersilkroads` };
}
