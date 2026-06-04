import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { SECTIONS, FACTORIES } from "@/data/home";

const FAV_PRODUCTS = SECTIONS.flatMap((s) => s.products).slice(0, 8);
const FAV_SUPPLIERS = FACTORIES.slice(0, 3);

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams: Promise<{ add?: string }>;
}) {
  const { add } = await searchParams;
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "采购商中心", href: "/buyer-center" }, { label: "收藏" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/favorites" />
        <div>
          {add && (
            <div className="bg-success/10 border border-success/30 text-success rounded p-3 mb-4 flex items-center gap-2 text-[13px]">
              <span className="text-[16px]">✓</span>
              <span>
                已将 <Link href={`/product/${add}`} className="font-semibold underline cursor-pointer">{add}</Link> 添加到收藏夹。
              </span>
            </div>
          )}
          <div className="bg-paper border border-line rounded p-4 mb-4">
            <h1 className="text-[20px] font-bold text-ink">收藏</h1>
            <p className="text-[12px] text-mute mt-0.5">已收藏 {FAV_PRODUCTS.length} 个产品 · {FAV_SUPPLIERS.length} 家供应商</p>
          </div>

          <div className="bg-paper border border-line rounded p-4 mb-4">
            <b className="block text-[14px] text-ink mb-3">❤ 收藏产品</b>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {FAV_PRODUCTS.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="border border-line rounded-sm overflow-hidden hover:border-brand block">
                  <div className="aspect-square bg-[#F5F5F5]">
                    {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
                  </div>
                  <div className="p-2.5">
                    <h4 className="text-[12px] text-ink line-clamp-2 mb-1 min-h-[30px]">{p.title}</h4>
                    <div className="text-accent font-bold text-[13px]">{p.price}<small className="text-mute font-normal text-[10px]">{p.unit}</small></div>
                    <div className="text-[10.5px] text-mute mt-0.5">{p.seller}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[14px] text-ink mb-3">🏭 关注的供应商</b>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {FAV_SUPPLIERS.map((f) => (
                <Link key={f.slug} href={`/supplier/${f.slug}`} className="border border-line rounded-sm p-3 hover:border-brand flex gap-3 items-start">
                  <div className="w-12 h-12 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[15px] text-brand flex-shrink-0">{f.initials}</div>
                  <div className="min-w-0">
                    <b className="block text-[13px] text-ink line-clamp-2 leading-tight">{f.name}</b>
                    <span className="text-[11px] text-mute">{f.location}</span>
                    <div className="text-[11px] text-success mt-1">★ {f.rating} · {f.badges.years}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "收藏 — 采购商中心" };
