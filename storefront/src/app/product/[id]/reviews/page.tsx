import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SECTIONS, NAV_CATEGORIES } from "@/data/home";
import type { Product } from "@/data/home";
import { getLeafCategory } from "@/data/products";
import type { ListingProduct } from "@/data/products";

/**
 * Full reviews list for a product. Linked from product detail page's
 * "View all N reviews" CTA. Synthesizes a longer list of reviews
 * from a small seed pool so every product page has a populated reviews
 * page (useful for SEO + buyer trust).
 */

const REVIEW_SEED = [
  { name: "陈明辉", company: "西贡家具展厅 · 胡志明市", rating: 5, text: "收到的货与样品一致，交货速度快。第二批将再订2个集装箱。", helpful: 18 },
  { name: "范国英", company: "南方建筑材料 · 河内", rating: 5, text: "6小时内快速报价。供应商支持出货前视频验货。", helpful: 14 },
  { name: "阮秋恒", company: "胡志明市酒店集团 · 胡志明市", rating: 4, text: "品质好，出口级包装。价格比国内低30%，很有竞争力。", helpful: 9 },
  { name: "黎文德", company: "岘港经销商 · 岘港", rating: 5, text: "由广州团队组织的工厂验厂非常专业，下单很放心。", helpful: 12 },
  { name: "邓清河", company: "平明建筑公司 · 北宁", rating: 5, text: "DDP送货到仓，不产生额外税费。比自己安排物流节省4天。", helpful: 22 },
  { name: "裴国俊", company: "河内装饰展厅", rating: 4, text: "个别产品有些细微的漆面瑕疵，供应商已免费补发。服务好。", helpful: 7 },
  { name: "武翠玲", company: "大叻度假村 · 林同", rating: 5, text: "品质超出预期，客户服务很周到。", helpful: 11 },
  { name: "潘文雄", company: "海防经销商", rating: 4, text: "交货按时，品质物有所值。", helpful: 6 },
  { name: "李氏梅", company: "会安精品酒店", rating: 5, text: "1箱受损时交易保障全额退款，值得信赖。", helpful: 13 },
  { name: "杜克军", company: "平阳承包商", rating: 5, text: "已收3个集装箱，无任何投诉。将继续合作。", helpful: 17 },
];

const RATING_BREAKDOWN = [
  { label: "产品品质", score: 4.9 },
  { label: "与供应商沟通", score: 4.8 },
  { label: "包装与运输", score: 4.7 },
  { label: "如期履约", score: 4.9 },
];

/* Reuse the lookup pattern from product detail page */

function listingToProduct(lp: ListingProduct, leafTitle: string): Product {
  const num = parseFloat(lp.priceFrom.replace(/[^0-9.,]/g, "").replace(",", ".")) || 0;
  return {
    id: lp.id,
    title: lp.title,
    price: `$${num.toFixed(2)}`,
    unit: lp.unit,
    moq: `MOQ: ${lp.moq}`,
    rating: 4.7,
    seller: lp.supplier.name,
    years: "已认证",
    image: lp.img.src,
    badges: undefined,
    tags: [leafTitle],
  };
}

const TOP_PARENT_SLUGS = NAV_CATEGORIES.map((c) => c.slug);

function findProduct(id: string): {
  product: Product;
  parentSlug?: string;
  parentName?: string;
  leafSlug?: string;
  leafTitle?: string;
  l2Name?: string;
  sectionTitle?: string;
  sectionSlug?: string;
} | null {
  for (const s of SECTIONS) {
    const p = s.products.find((x) => x.id === id);
    if (p) return { product: p, sectionTitle: s.title, sectionSlug: s.categorySlug };
  }
  const m = id.match(/^(.+)-(\d+)$/);
  if (m) {
    const [, leafSlug, idxStr] = m;
    const idx = parseInt(idxStr, 10) - 1;
    for (const parent of TOP_PARENT_SLUGS) {
      const leaf = getLeafCategory(parent, leafSlug);
      if (leaf && leaf.products[idx]) {
        const navEntry = NAV_CATEGORIES.find((c) => c.slug === parent);
        return {
          product: listingToProduct(leaf.products[idx], leaf.title),
          parentSlug: parent,
          parentName: leaf.parentName ?? navEntry?.name,
          leafSlug,
          leafTitle: leaf.title,
          l2Name: leaf.l2Name,
        };
      }
    }
  }
  return null;
}

/** Synth helper — deterministic from product ID + seed index */
function synthDate(id: string, i: number): string {
  let h = 0;
  for (const c of id + i) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const day = (h % 28) + 1;
  const month = ((h >> 5) % 12) + 1;
  return `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const found = findProduct(id);

  // Synth a list of 30 reviews from the seed pool so every product has many
  const reviews = Array.from({ length: 30 }, (_, i) => {
    const base = REVIEW_SEED[i % REVIEW_SEED.length];
    return {
      ...base,
      date: synthDate(id, i),
      key: `${id}-${i}`,
    };
  });
  const overall = (RATING_BREAKDOWN.reduce((s, r) => s + r.score, 0) / RATING_BREAKDOWN.length).toFixed(1);

  if (!found) {
    return (
      <div className="max-w-[1100px] mx-auto px-4 py-12">
        <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "产品", href: "/products" }, { label: id }, { label: "评价" }]} />
        <div className="bg-paper border border-line rounded p-12 mt-6 text-center">
          <h1 className="text-[20px] font-bold text-ink mb-2">未找到产品</h1>
          <Link href="/products" className="inline-block px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px]">← 全部产品</Link>
        </div>
      </div>
    );
  }

  const { product: p, parentSlug, parentName, leafSlug, leafTitle, sectionTitle, sectionSlug } = found;

  const trail = sectionSlug
    ? [
        { label: "首页", href: "/" },
        { label: "产品", href: "/products" },
        { label: sectionTitle!, href: `/category/${sectionSlug}` },
        { label: p.title, href: `/product/${p.id}` },
        { label: "评价" },
      ]
    : [
        { label: "首页", href: "/" },
        { label: "产品", href: "/products" },
        ...(parentName && parentSlug ? [{ label: parentName, href: `/category/${parentSlug}` }] : []),
        ...(leafTitle && leafSlug && parentSlug ? [{ label: leafTitle, href: `/category/${parentSlug}/${leafSlug}` }] : []),
        { label: p.title, href: `/product/${p.id}` },
        { label: "评价" },
      ];

  return (
    <>
      <Breadcrumb trail={trail} />

      {/* Header card with product summary */}
      <div className="max-w-[1100px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-4 flex gap-4 items-center max-md:flex-col max-md:items-start">
          <Link href={`/product/${p.id}`} className="w-20 h-20 bg-[#F5F5F5] rounded-sm overflow-hidden flex-shrink-0 cursor-pointer">
            {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
          </Link>
          <div className="flex-1 min-w-0">
            <Link href={`/product/${p.id}`} className="cursor-pointer">
              <h1 className="text-[16px] font-semibold text-ink hover:text-brand line-clamp-2">{p.title}</h1>
            </Link>
            <div className="text-[12.5px] text-mute mt-1">{p.seller} · {p.years}</div>
          </div>
          <Link href={`/product/${p.id}`} className="text-brand text-[12.5px] font-semibold cursor-pointer hover:underline flex-shrink-0">
            ← 返回产品
          </Link>
        </div>
      </div>

      {/* Overall rating + breakdown */}
      <div className="max-w-[1100px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5 grid grid-cols-[280px_1fr] gap-6 max-md:grid-cols-1">
          <div className="text-center border-r border-line pr-6 max-md:border-r-0 max-md:border-b max-md:pr-0 max-md:pb-4">
            <div className="text-[44px] font-extrabold text-accent leading-none">{overall}</div>
            <div className="text-gold text-[18px] my-1">★★★★★</div>
            <small className="text-[11.5px] text-mute">基于 {reviews.length} 条已验证评价</small>
          </div>
          <div className="space-y-2">
            {RATING_BREAKDOWN.map((r) => {
              const pct = (r.score / 5) * 100;
              return (
                <div key={r.label} className="grid grid-cols-[160px_1fr_40px] gap-3 items-center text-[12px] max-md:grid-cols-[110px_1fr_36px]">
                  <span className="text-ink">{r.label}</span>
                  <div className="h-2 bg-line rounded-full overflow-hidden">
                    <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                  </div>
                  <b className="text-ink text-right">{r.score}</b>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div className="max-w-[1100px] mx-auto px-4 mt-4 mb-7">
        <div className="bg-paper border border-line rounded p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[16px] font-bold text-ink">全部评价 ({reviews.length})</h2>
            <select className="px-3 py-1.5 border border-line rounded-sm text-[12.5px] outline-none bg-white cursor-pointer">
              <option>最新</option>
              <option>评分最高</option>
              <option>评分最低</option>
              <option>最有用</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            {reviews.map((r) => (
              <div key={r.key} className="border border-line rounded p-3.5">
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <b className="block text-[13px] text-ink">{r.name}</b>
                    <small className="text-[11px] text-mute">{r.company}</small>
                  </div>
                  <div className="text-right">
                    <div className="text-gold text-[12px]">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                    <small className="text-[10.5px] text-mute2">{r.date}</small>
                  </div>
                </div>
                <p className="text-[12.5px] text-ink leading-relaxed mb-2">{r.text}</p>
                <div className="text-[11px] text-mute flex items-center gap-3 pt-2 border-t border-line">
                  <Link href={`/login?next=/product/${p.id}/reviews`} className="hover:text-brand cursor-pointer">
                    👍 有用 ({r.helpful})
                  </Link>
                  <Link href={`/login?next=/product/${p.id}/reviews`} className="hover:text-brand cursor-pointer">
                    💬 回复
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link href={`/buying-request?productId=${p.id}`} className="inline-block px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] cursor-pointer hover:bg-brand-light">
              💬 联系供应商咨询详情
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = findProduct(id);
  return {
    title: found ? `评价：${found.product.title} — Huayuesc` : `产品评价 — Huayuesc`,
  };
}
