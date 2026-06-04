import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { QtyStepper } from "@/components/products/qty-stepper";
import { SECTIONS, FACTORIES, NAV_CATEGORIES } from "@/data/home";
import type { Product } from "@/data/home";
import { getLeafCategory } from "@/data/products";
import type { ListingProduct } from "@/data/products";

/**
 * Product detail page — Made-in-China-style layout.
 *
 * Anatomy (top to bottom):
 *   1. Breadcrumb
 *   2. Hero row     : gallery (left) + sticky info+CTA panel (right)
 *   3. Sticky tabs  : Description / Specs / Trade Assurance / Reviews / Shipping / FAQ
 *   4. Description, Specs, Trade Assurance, Reviews, Shipping, FAQ — sections
 *   5. Same-factory rail
 *   6. "You may also like" rail
 *   7. Mobile sticky bottom action bar
 */

/* Convert a leaf-listing product into the shape the home/Product type uses
   so the rest of the page (which assumes Product fields) just works. */
function listingToProduct(lp: ListingProduct, leafTitle: string): Product {
  // priceFrom looks like "30,00$" or "$30.00" — normalize to "$30.00"
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
    badges: lp.amazing ? ["top"] : lp.monthLabel?.includes("新") ? ["new"] : undefined,
    tags: [leafTitle],
  };
}

type FoundProduct = {
  product: Product;
  /** For home-section products: section id. */
  sectionId?: string;
  /** For leaf products: parent slug, leaf slug, leaf title. */
  parentSlug?: string;
  parentName?: string;
  leafSlug?: string;
  leafTitle?: string;
  l2Name?: string;
  /** Related products to show in "Same factory" rail. */
  related: Product[];
};

const TOP_PARENT_SLUGS = NAV_CATEGORIES.map((c) => c.slug);

function findProduct(id: string): FoundProduct | null {
  // 1) Check home-page SECTIONS first (existing behaviour).
  for (const s of SECTIONS) {
    const p = s.products.find((x) => x.id === id);
    if (p) {
      return {
        product: p,
        sectionId: s.id,
        related: s.products.filter((x) => x.id !== id).slice(0, 6),
      };
    }
  }

  // 2) Try leaf categories — id format "${leafSlug}-${n}".
  const m = id.match(/^(.+)-(\d+)$/);
  if (m) {
    const [, leafSlug, idxStr] = m;
    const idx = parseInt(idxStr, 10) - 1;
    for (const parent of TOP_PARENT_SLUGS) {
      const leaf = getLeafCategory(parent, leafSlug);
      if (leaf && leaf.products[idx]) {
        const navEntry = NAV_CATEGORIES.find((c) => c.slug === parent);
        const lp = leaf.products[idx];
        return {
          product: listingToProduct(lp, leaf.title),
          parentSlug: parent,
          parentName: leaf.parentName ?? navEntry?.name,
          leafSlug,
          leafTitle: leaf.title,
          l2Name: leaf.l2Name,
          related: leaf.products
            .filter((x) => x.id !== id)
            .slice(0, 6)
            .map((x) => listingToProduct(x, leaf.title)),
        };
      }
    }
  }

  return null;
}

function tierTable(price: string) {
  const num = parseFloat(price.replace(/[^0-9.]/g, "")) || 10;
  return [
    { range: "1 – 49", price: num.toFixed(2), discount: 0 },
    { range: "50 – 99", price: (num * 0.92).toFixed(2), discount: 8 },
    { range: "100 – 499", price: (num * 0.85).toFixed(2), discount: 15 },
    { range: "500+", price: (num * 0.78).toFixed(2), discount: 22 },
  ];
}

const SPECS: [string, string][] = [
  ["产地", "中国（China）"],
  ["品牌", "支持OEM/ODM"],
  ["材质", "高端 – Grade A"],
  ["标准", "ISO 9001, CE, RoHS"],
  ["包装", "纸箱 + 出口托盘"],
  ["出货港", "佛山 / 深圳 / 宁波"],
  ["生产周期", "20 – 30天"],
  ["付款方式", "T/T 30%预付，70%出货前付清"],
  ["运输", "FOB / CIF / DDP至越南"],
  ["质保", "越南本地12个月"],
];

/* --- Reviews + breakdown ----------------------------------------------- */

const REVIEWS = [
  { name: "陈明辉", company: "西贡家具展厅", rating: 5, date: "2026-04-12", text: "收到的货与样品一致，交货速度快。第二批将再订2个集装箱。", helpful: 18 },
  { name: "范国英", company: "南方建筑材料", rating: 5, date: "2026-03-28", text: "6小时内快速报价。供应商支持出货前视频验货。", helpful: 14 },
  { name: "阮秋恒", company: "胡志明市酒店集团", rating: 4, date: "2026-03-15", text: "品质好，出口级包装。价格比国内低30%，很有竞争力。", helpful: 9 },
  { name: "黎文德", company: "岘港经销商", rating: 5, date: "2026-02-22", text: "由华越组织的工厂验厂非常专业，下单很放心。", helpful: 12 },
];

const RATING_BREAKDOWN = [
  { label: "产品品质", score: 4.9 },
  { label: "与供应商沟通", score: 4.8 },
  { label: "包装与运输", score: 4.7 },
  { label: "如期履约", score: 4.9 },
];

/* --- Trade certificates (placeholders) --------------------------------- */

const CERTIFICATES = [
  { code: "ISO 9001:2015", desc: "质量管理" },
  { code: "CE", desc: "EU Conformity" },
  { code: "RoHS", desc: "有害物质限制" },
  { code: "FSC", desc: "可持续森林木材" },
  { code: "BSCI", desc: "商业道德" },
  { code: "ISO 14001", desc: "环境管理" },
];

/* --- FAQ --------------------------------------------------------------- */

const FAQS = [
  {
    q: "华越平台上的起订量是多少？",
    a: "标准起订量显示在价格表中。部分产品可在大批量下单前先订样品（起订量 = 1）——请发送询价确认。",
  },
  {
    q: "交货周期多久？",
    a: "平均 20-30 天生产 + 12-18 天 DDP 运输至河内/胡志明市。自支付 T/T 30% 定金起，总交货周期 32-48 天。",
  },
  {
    q: "可以按图纸做 OEM/ODM 吗？",
    a: "可以。供应商支持按技术图纸印 logo、改色、定制尺寸。打样费通常 $50-200，达到起订量下单时可抵扣至正式订单。",
  },
  {
    q: "华越如何保障交易？",
    a: "交易保障：货款托管于华越的担保账户，仅在采购商确认货物与描述相符后才向供应商放款。如不符约定，100% 退款。",
  },
  {
    q: "DDP 运费包含哪些内容？",
    a: "包含海运/陆运运费、进口关税、增值税、清关费、中转仓储费、越南境内运输至采购商仓库的费用。采购商无需办理任何手续。",
  },
];

/* ====================================================================== */

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const found = findProduct(id);

  if (!found) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-16">
        <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "产品", href: "/products" }, { label: id }]} />
        <div className="bg-paper border border-line rounded p-12 mt-6 text-center">
          <div className="text-[48px] mb-3">📦</div>
          <h1 className="text-[24px] font-bold text-ink mb-2">产品更新中</h1>
          <p className="text-[13px] text-mute mb-5">产品编号 <b>{id}</b> 暂不可用，请稍后再来。</p>
          <Link href="/products" className="inline-block px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] hover:bg-brand-light cursor-pointer">
            ← 查看全部产品
          </Link>
        </div>
      </div>
    );
  }

  const { product: p, sectionId, parentSlug, parentName, leafSlug, leafTitle, l2Name, related } = found;
  const section = sectionId ? SECTIONS.find((s) => s.id === sectionId) : undefined;
  const supplier = FACTORIES.find((f) => f.name.toLowerCase().includes(p.seller.split(" ")[0].toLowerCase())) ?? FACTORIES[0];
  const tiers = tierTable(p.price);
  const sameSection = related;
  const otherSection = (section
    ? SECTIONS.filter((s) => s.id !== sectionId).flatMap((s) => s.products).slice(0, 6)
    : SECTIONS.flatMap((s) => s.products).slice(0, 6));
  const overallRating = (RATING_BREAKDOWN.reduce((sum, r) => sum + r.score, 0) / RATING_BREAKDOWN.length).toFixed(1);

  // Breadcrumb trail — branches by source (home section vs leaf category).
  const trail = section
    ? [
        { label: "首页", href: "/" },
        { label: "产品", href: "/products" },
        { label: section.title, href: `/category/${section.categorySlug}` },
        { label: p.title },
      ]
    : [
        { label: "首页", href: "/" },
        { label: "产品", href: "/products" },
        ...(parentName && parentSlug ? [{ label: parentName, href: `/category/${parentSlug}` }] : []),
        ...(l2Name ? [{ label: l2Name }] : []),
        ...(leafTitle && leafSlug && parentSlug ? [{ label: leafTitle, href: `/category/${parentSlug}/${leafSlug}` }] : []),
        { label: p.title },
      ];

  return (
    <>
      <Breadcrumb trail={trail} />

      {/* === HERO ROW: gallery + info+CTA panel ============================ */}
      <div className="max-w-[1400px] mx-auto px-4 mt-4 grid grid-cols-[1fr_400px] gap-5 max-xl:grid-cols-[1fr_360px] max-md:grid-cols-1">
        {/* === LEFT: gallery + title + tier table ========================= */}
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          {/* Gallery — radio-driven thumb navigation. Click any thumb
              swaps the main image (CSS-only via .ig-root :has() rules). */}
          <div className="ig-root grid grid-cols-[80px_1fr] gap-3 max-md:grid-cols-1">
            {/* Hidden radios — drive thumb-active and main-image visibility */}
            {[1, 2, 3, 4, 5].map((i) => (
              <input
                key={`r-${i}`}
                type="radio"
                name={`ig-${p.id}`}
                id={`ig-${p.id}-${i}`}
                defaultChecked={i === 1}
                className={`hidden ig-radio-${i}`}
              />
            ))}

            {/* Thumb labels (left column on desktop, scroll row on mobile) */}
            <div className="flex flex-col gap-2 max-md:flex-row max-md:overflow-x-auto max-md:order-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <label
                  key={i}
                  htmlFor={`ig-${p.id}-${i}`}
                  className={`ig-thumb ig-thumb-${i} aspect-square w-full bg-[#F5F5F5] rounded overflow-hidden cursor-pointer hover:border-brand max-md:w-[64px] max-md:flex-shrink-0`}
                  aria-label={`图片 ${i}`}
                >
                  <img
                    src={`/img/${p.id}-${i}.jpg?v=5`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </label>
              ))}
            </div>

            {/* Main image area — 5 images stacked, only the active one shown */}
            <div className="aspect-square bg-[#F5F5F5] rounded overflow-hidden relative group max-md:order-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={
                    i === 1 && p.image
                      ? p.image
                      : `/img/${p.id}-${i}.jpg?v=5`
                  }
                  alt={p.title}
                  className={`ig-img ig-img-${i} absolute inset-0 w-full h-full object-cover`}
                />
              ))}
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] px-2.5 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition pointer-events-none">
                🔍 点击缩略图切换图片
              </div>
              {p.badges && p.badges.length > 0 && (
                <div className="absolute top-3 left-3 flex gap-1 flex-wrap z-10">
                  {p.badges.includes("top") && <span className="bg-gold text-brand-dark text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">⭐ HOT</span>}
                  {p.badges.includes("new") && <span className="bg-success text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">新品</span>}
                  {p.badges.includes("deal") && <span className="bg-accent text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">-25%</span>}
                </div>
              )}
            </div>
          </div>

          {/* Title + meta */}
          <h1 className="text-[22px] font-bold text-ink mt-5 leading-tight max-md:text-[18px]">{p.title}</h1>
          <div className="flex items-center gap-3 mt-2 text-[12.5px] text-mute flex-wrap">
            <span className="flex items-center gap-1"><span className="text-gold">★</span> <b className="text-ink">{p.rating}</b> <span>({REVIEWS.length * 31} 条评价)</span></span>
            <span>·</span>
            <span>340 笔已完成订单</span>
            <span>·</span>
            <span className="text-success font-semibold">✓ 现货</span>
            <span>·</span>
            <span>SKU: {p.id.toUpperCase()}</span>
          </div>

          {/* Tier price table */}
          <div className="mt-5 border border-line rounded">
            <div className="bg-[#FAFBFC] px-4 py-2.5 border-b border-line text-[13px] font-semibold text-ink flex justify-between items-center">
              <span>起订量阶梯价 <span className="text-mute font-normal">· FOB 中国</span></span>
              <span className="text-[11.5px] text-success font-medium">⏱ 交货周期 20-30 天</span>
            </div>
            <table className="w-full text-[13px]">
              <thead className="bg-[#F5F7FA]">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-mute">数量</th>
                  <th className="text-left px-4 py-2 font-medium text-mute">单价</th>
                  <th className="text-left px-4 py-2 font-medium text-mute">节省</th>
                  <th className="text-right px-4 py-2 font-medium text-mute">操作</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => (
                  <tr key={t.range} className="border-t border-line hover:bg-[#FAFBFC]">
                    <td className="px-4 py-2 text-ink">{t.range} {p.unit}</td>
                    <td className="px-4 py-2 text-accent font-bold">${t.price}{p.unit}</td>
                    <td className="px-4 py-2 text-success">{t.discount === 0 ? "原价" : `-${t.discount}%`}</td>
                    <td className="px-4 py-2 text-right">
                      <Link
                        href={`/buying-request?productId=${p.id}&qty=${encodeURIComponent(t.range)}&tier=${t.discount}`}
                        className="text-brand text-[12px] font-semibold cursor-pointer hover:underline"
                      >
                        报价 →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* === Variant + qty + CTAs — wrapped in a form so submitting
              "Contact now" / "Request sample" carries the chosen color,
              size and quantity to /buying-request as query params. */}
          <form action="/buying-request" method="get" className="mt-5">
            <input type="hidden" name="productId" value={p.id} />
            <input type="hidden" name="productTitle" value={p.title} />
            <input type="hidden" name="supplier" value={p.seller} />

            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              {/* Color swatches — radio + label, CSS-driven active state */}
              <div className="cv-root">
                <span className="block text-[12px] font-semibold text-ink mb-1.5">
                  颜色 <span className="text-mute2 font-normal">· 4 种可选</span>
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { code: "#F5F1E8", label: "大理石白" },
                    { code: "#3D3D3D", label: "深灰" },
                    { code: "#E1C699", label: "米黄" },
                    { code: "#5C4033", label: "胡桃棕" },
                  ].map((c, i) => (
                    <span key={c.label}>
                      <input
                        type="radio"
                        name="color"
                        value={c.label}
                        id={`cv-${p.id}-${i + 1}`}
                        defaultChecked={i === 0}
                        className={`hidden cv-radio-${i + 1}`}
                      />
                      <label
                        htmlFor={`cv-${p.id}-${i + 1}`}
                        className={`cv-swatch cv-swatch-${i + 1} w-9 h-9 rounded-sm cursor-pointer hover:opacity-90 inline-block`}
                        style={{ backgroundColor: c.code }}
                        title={c.label}
                        aria-label={c.label}
                      />
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor={`size-${p.id}`} className="block text-[12px] font-semibold text-ink mb-1.5">尺寸</label>
                <select
                  id={`size-${p.id}`}
                  name="size"
                  className="w-full px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand bg-white cursor-pointer"
                  defaultValue="标准"
                >
                  <option>标准</option>
                  <option>按图纸定制</option>
                  <option>比例调整 ±5%</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex gap-2 items-stretch flex-wrap">
              <QtyStepper name="qty" defaultValue={50} />
              <button
                type="submit"
                name="intent"
                value="contact"
                className="flex-1 px-5 py-2.5 bg-accent text-white rounded-sm font-semibold text-[13px] hover:opacity-90 cursor-pointer text-center inline-flex items-center justify-center gap-1.5 max-md:w-full"
              >
                💬 立即联系
              </button>
              <button
                type="submit"
                name="intent"
                value="sample"
                formAction="/buying-request"
                className="px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] hover:bg-brand-light cursor-pointer inline-flex items-center gap-1.5"
              >
                📦 索取样品
              </button>
              <Link
                href={`/buyer-center/favorites?add=${p.id}`}
                className="px-4 py-2.5 border border-line rounded-sm text-[13px] text-ink hover:border-accent hover:text-accent cursor-pointer inline-flex items-center"
                aria-label="加入收藏"
                title="加入收藏"
              >
                ❤
              </Link>
            </div>
          </form>
        </div>

        {/* === RIGHT: sidebar (sticky) ==================================== */}
        <aside className="space-y-3 max-md:order-2">
          {/* Quick info pills */}
          <div className="bg-paper border border-line rounded p-4">
            <div className="text-[11px] uppercase tracking-wider text-mute font-bold mb-2.5">快速信息</div>
            <ul className="space-y-2 text-[12.5px]">
              <li className="flex justify-between">
                <span className="text-mute">📦 起订量</span>
                <b className="text-ink">{p.moq.replace("MOQ:", "").trim()}</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">⏱ 交货周期</span>
                <b className="text-ink">20-30天</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">🚚 出货港</span>
                <b className="text-ink">佛山 / 宁波</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">💳 付款</span>
                <b className="text-ink">T/T 30% + 70%</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">🎨 OEM / ODM</span>
                <b className="text-success">支持</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">🧪 样品</span>
                <b className="text-ink">$50-200（可抵扣订单）</b>
              </li>
            </ul>
          </div>

          {/* Supplier card */}
          <div className="bg-paper border border-line rounded p-4">
            <div className="text-[11px] uppercase tracking-wider text-mute font-bold mb-2.5">供应商</div>
            <Link href={`/supplier/${supplier.slug}`} className="flex gap-3 items-start mb-3 cursor-pointer">
              <div className="w-12 h-12 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[16px] text-brand flex-shrink-0">
                {supplier.initials}
              </div>
              <div>
                <b className="block text-[13px] font-semibold text-ink leading-tight hover:text-brand">{supplier.name}</b>
                <span className="text-[11.5px] text-mute flex items-center gap-1 mt-0.5">
                  <span className="cn-flag" /> {supplier.location}
                </span>
              </div>
            </Link>
            <div className="flex gap-1 mb-3 flex-wrap">
              {supplier.badges.gold && <span className="bg-gold text-brand-dark text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">⭐ 金牌</span>}
              {supplier.badges.audited && <span className="bg-success text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">✓ 已验厂</span>}
              <span className="bg-brand text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">{supplier.badges.years}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] mb-3">
              <div className="border border-line rounded-sm p-1.5">
                <b className="block text-[14px] text-accent">★ {supplier.rating}</b>
                <small className="text-mute">{supplier.reviews}</small>
              </div>
              <div className="border border-line rounded-sm p-1.5">
                <b className="block text-[14px] text-brand">340</b>
                <small className="text-mute">单 / 年</small>
              </div>
              <div className="border border-line rounded-sm p-1.5">
                <b className="block text-[14px] text-brand">98%</b>
                <small className="text-mute">按时交货</small>
              </div>
            </div>
            <Link
              href={`/supplier/${supplier.slug}`}
              className="block w-full text-center py-2 bg-brand text-white rounded-sm font-semibold text-[12.5px] hover:bg-brand-light cursor-pointer"
            >
              查看工厂 →
            </Link>
          </div>

          {/* Inline RFQ form — submits with full product + supplier context */}
          <form action="/buying-request" method="get" className="bg-paper border-2 border-accent rounded p-4">
            <input type="hidden" name="productId" value={p.id} />
            <input type="hidden" name="supplier" value={p.seller} />
            <input type="hidden" name="intent" value="rfq" />
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[18px]">📋</span>
              <b className="text-[13px] font-bold text-ink">发送询价</b>
            </div>
            <p className="text-[11.5px] text-mute mb-2.5 leading-snug">
              24 小时内获得该供应商 + 3-5 家同类供应商的免费报价。
            </p>
            <input
              name="q"
              defaultValue={p.title}
              className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand"
            />
            <input
              name="qty"
              placeholder={`数量 + 单位（例：500${p.unit}）`}
              className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand"
            />
            <textarea
              name="desc"
              placeholder="详细描述需求、定制要求……"
              rows={3}
              className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand resize-none"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-accent text-white rounded-sm font-bold text-[12.5px] cursor-pointer hover:opacity-90"
            >
              🚀 立即发送询价
            </button>
          </form>

          {/* Trust pillars */}
          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-semibold text-ink mb-2.5">🛡 华越保障</b>
            <ul className="text-[12px] text-mute space-y-1.5">
              <li className="flex gap-2"><span className="text-success">✓</span> 未收到货物全额退款</li>
              <li className="flex gap-2"><span className="text-success">✓</span> 下单前免费验厂</li>
              <li className="flex gap-2"><span className="text-success">✓</span> 7×24 小时争议支持</li>
              <li className="flex gap-2"><span className="text-success">✓</span> DDP 运输——含税到门</li>
              <li className="flex gap-2"><span className="text-success">✓</span> 交易保障（担保账户）</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* === STICKY TAB NAVIGATION ======================================== */}
      <nav className="sticky top-[3.4rem] z-30 bg-paper border-y border-line mt-7 max-md:top-0">
        <div className="max-w-[1400px] mx-auto px-4 flex gap-0 overflow-x-auto text-[13.5px] font-semibold">
          {[
            { href: "#mo-ta", label: "描述" },
            { href: "#thong-so", label: "技术参数" },
            { href: "#trade-assurance", label: "交易保障" },
            { href: "#danh-gia", label: `评价 (${REVIEWS.length * 31})` },
            { href: "#van-chuyen", label: "运输" },
            { href: "#faq", label: "FAQ" },
          ].map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="px-5 py-3 text-ink hover:text-brand border-b-2 border-transparent hover:border-brand whitespace-nowrap cursor-pointer transition"
            >
              {t.label}
            </a>
          ))}
        </div>
      </nav>

      {/* === DESCRIPTION ================================================== */}
      <section id="mo-ta" className="max-w-[1400px] mx-auto px-4 mt-7 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">产品描述</h2>
          <p className="text-[13px] text-ink leading-relaxed mb-4">
            <b>{p.title}</b> 由 <Link href={`/supplier/${supplier.slug}`} className="text-brand hover:underline cursor-pointer">{p.seller}</Link> 生产，是中国领先的工厂之一，拥有 <b>{p.years} 出口经验</b>。产品达到国际标准，适用于商业项目及高端民用工程。
          </p>
          <img src={`/img/${p.id}-desc1.jpg?v=5`} alt="" className="w-full rounded mb-4" loading="lazy" />
          <p className="text-[13px] text-ink leading-relaxed mb-4">
            按 <b>ISO 9001:2015</b> 执行严格的质量控制流程。每批货物出厂前均由华越广州团队验厂。支持按客户图纸进行 <b>OEM/ODM</b>，起订量灵活，交货周期 20-30 天。
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4 max-md:grid-cols-1">
            <img src={`/img/${p.id}-desc2.jpg?v=5`} alt="" className="w-full rounded" loading="lazy" />
            <img src={`/img/${p.id}-desc3.jpg?v=5`} alt="" className="w-full rounded" loading="lazy" />
          </div>
          <p className="text-[13px] text-ink leading-relaxed">
            <b>DDP 运输至越南</b>——无需担心海关手续，不产生额外费用。凭祥（谅山）与友谊关（海防港）的中转仓确保货物从中国运至采购商仓库仅需 5-7 天。
          </p>
        </div>
      </section>

      {/* === SPECS ======================================================== */}
      <section id="thong-so" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">技术参数</h2>
          <div className="grid grid-cols-2 gap-x-6 max-md:grid-cols-1">
            {SPECS.map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-[180px_1fr] py-2 text-[13px] border-b border-line max-md:grid-cols-[140px_1fr] ${i === SPECS.length - 1 || i === SPECS.length - 2 ? "max-md:border-b" : ""}`}>
                <div className="text-mute">{k}</div>
                <div className="text-ink">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === TRADE ASSURANCE / CERTIFICATES =============================== */}
      <section id="trade-assurance" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4 flex items-center gap-2">
            🛡 交易保障与认证
          </h2>
          <p className="text-[13px] text-mute mb-4 leading-relaxed">
            订单受华越交易保障保护：货款托管于担保账户，供应商仅在采购商确认货物符合约定后才收款。如不符，100% 退款。
          </p>
          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {[
              { icon: "🔒", t: "定金担保托管", d: "货款托管于华越，仅在采购商确认后放款" },
              { icon: "🏭", t: "免费实地验厂", d: "验厂团队出货前验货，支持实时视频通话" },
              { icon: "⚖", t: "争议支持", d: "7×24 小时调解，描述/数量不符 100% 退款" },
            ].map((x) => (
              <div key={x.t} className="bg-[#FFF7E6] border border-gold/40 rounded p-3.5">
                <div className="text-[24px] mb-1">{x.icon}</div>
                <b className="block text-[13px] text-ink mb-0.5">{x.t}</b>
                <p className="text-[11.5px] text-mute leading-snug">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-line pt-4">
            <b className="block text-[13px] font-semibold text-ink mb-3">供应商已获认证</b>
            <div className="grid grid-cols-6 gap-2 max-md:grid-cols-3">
              {CERTIFICATES.map((c) => (
                <Link
                  key={c.code}
                  href={`/info/cert-${c.code.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="border border-line rounded p-2.5 text-center hover:border-brand hover:bg-bg cursor-pointer block"
                >
                  <b className="block text-[12px] text-brand">{c.code}</b>
                  <small className="text-[10.5px] text-mute leading-tight">{c.desc}</small>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === REVIEWS ====================================================== */}
      <section id="danh-gia" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">采购商评价</h2>
          <div className="grid grid-cols-[280px_1fr] gap-6 mb-5 max-md:grid-cols-1 max-md:gap-4">
            {/* Left: overall rating */}
            <div className="text-center border-r border-line pr-6 max-md:border-r-0 max-md:border-b max-md:pr-0 max-md:pb-4">
              <div className="text-[44px] font-extrabold text-accent leading-none">{overallRating}</div>
              <div className="text-gold text-[18px] my-1">★★★★★</div>
              <small className="text-[11.5px] text-mute">基于 {REVIEWS.length * 31} 条已验证评价</small>
            </div>
            {/* Right: breakdown bars */}
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

          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            {REVIEWS.map((r) => (
              <div key={r.name} className="border border-line rounded p-3.5">
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
                  <Link
                    href={`/login?next=${encodeURIComponent(`/product/${p.id}/reviews`)}`}
                    className="hover:text-brand cursor-pointer"
                  >
                    👍 有用 ({r.helpful})
                  </Link>
                  <Link
                    href={`/login?next=${encodeURIComponent(`/product/${p.id}/reviews`)}`}
                    className="hover:text-brand cursor-pointer"
                  >
                    💬 回复
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link href={`/product/${p.id}/reviews`} className="text-brand text-[13px] font-semibold cursor-pointer hover:underline">
              查看全部 {REVIEWS.length * 31} 条评价 →
            </Link>
          </div>
        </div>
      </section>

      {/* === SHIPPING ===================================================== */}
      <section id="van-chuyen" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">🚚 运输与 DDP 至越南</h2>
          <div className="grid grid-cols-3 gap-4 mb-5 max-md:grid-cols-1">
            {[
              { t: "FOB 中国", d: "运费、关税自理。价格最低。", price: "按价格表", time: "佛山 / 宁波自提", mode: "fob" },
              { t: "CIF 海防 / 葛莱", d: "含运费 + 保险至越南港口。", price: "+ $200-400/CBM", time: "12-15 天", mode: "cif" },
              { t: "DDP 送货到仓", d: "一站到底：关税 + 清关 + 境内运输。", price: "+ $400-700/CBM", time: "18-22 天", mode: "ddp" },
            ].map((s, i) => (
              <Link
                key={s.t}
                href={`/info/ddp-calculator?mode=${s.mode}&productId=${p.id}`}
                className={`border-2 rounded p-3.5 cursor-pointer hover:shadow-sm transition block ${i === 2 ? "border-brand bg-brand/5 hover:bg-brand/10" : "border-line hover:border-brand"}`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <b className="text-[14px] text-ink">{s.t}</b>
                  {i === 2 && <span className="bg-brand text-white text-[9.5px] px-1.5 py-0.5 rounded-sm font-bold">热门</span>}
                </div>
                <p className="text-[11.5px] text-mute leading-snug mb-2">{s.d}</p>
                <div className="text-[12px] text-ink"><b className="text-accent">{s.price}</b></div>
                <div className="text-[11.5px] text-mute mt-0.5 mb-1">⏱ {s.time}</div>
                <span className="text-[11.5px] text-brand font-semibold">计算该方式运费 →</span>
              </Link>
            ))}
          </div>

          {/* Shipping calculator — submits to /info/ddp-calculator which
              renders an actual cost breakdown based on these query params. */}
          <form action="/info/ddp-calculator" method="get" className="border-t border-line pt-4">
            <input type="hidden" name="productId" value={p.id} />
            <input type="hidden" name="mode" value="ddp" />
            <b className="block text-[13px] font-semibold text-ink mb-2.5">⚡ DDP 运费快速测算</b>
            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 max-md:grid-cols-1">
              <select name="port" className="px-3 py-2 border border-line rounded-sm text-[13px] bg-white outline-none focus:border-brand cursor-pointer" defaultValue="haiphong">
                <option value="haiphong">目的港：海防</option>
                <option value="catlai">目的港：葛莱（胡志明市）</option>
                <option value="danang">目的港：岘港</option>
                <option value="langson">经谅山陆运</option>
              </select>
              <input
                name="qty"
                type="number"
                step="0.1"
                min="0"
                placeholder="数量（CBM 或 kg）"
                className="px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
              <input
                name="value"
                type="number"
                step="1"
                min="0"
                placeholder="订单价值（$USD）"
                className="px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
              <button type="submit" className="px-5 py-2 bg-brand text-white rounded-sm font-semibold text-[13px] cursor-pointer hover:bg-brand-light">
                计算运费 →
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* === FAQ ========================================================== */}
      <section id="faq" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">❓ 常见问题</h2>
          <div className="space-y-2">
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                {...(i === 0 ? { open: true } : {})}
                className="border border-line rounded group/faq"
              >
                <summary className="px-4 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden flex justify-between items-center hover:bg-[#FAFBFC]">
                  <b className="text-[13px] text-ink leading-snug">{f.q}</b>
                  <span className="text-mute2 text-[14px] group-open/faq:rotate-180 transition-transform flex-shrink-0 ml-3">▾</span>
                </summary>
                <p className="px-4 pb-3 text-[12.5px] text-mute leading-relaxed border-t border-line pt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* === SAME FACTORY RAIL ============================================ */}
      <section className="max-w-[1400px] mx-auto px-4 mt-7">
        <h2 className="text-[16px] font-bold text-ink mb-3 flex items-center justify-between">
          <span>同厂产品 <span className="text-mute font-normal text-[12.5px]">· {supplier.name}</span></span>
          <Link href={`/supplier/${supplier.slug}`} className="text-brand text-[12.5px] font-semibold cursor-pointer hover:underline">查看全部 →</Link>
        </h2>
        <div className="grid grid-cols-6 gap-3 max-md:grid-cols-2">
          {sameSection.map((x) => (
            <Link key={x.id} href={`/product/${x.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand hover:shadow-sm block cursor-pointer">
              <div className="aspect-square bg-[#F5F5F5]">
                {x.image ? <img src={x.image} alt={x.title} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="p-2.5">
                <h4 className="text-[12px] text-ink line-clamp-2 mb-1 leading-snug min-h-[32px]">{x.title}</h4>
                <div className="text-accent font-bold text-[13.5px]">{x.price}<small className="text-mute font-normal text-[11px]">{x.unit}</small></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* === RECOMMENDED RAIL ============================================= */}
      <section className="max-w-[1400px] mx-auto px-4 mt-7 mb-7 max-md:mb-24">
        <h2 className="text-[16px] font-bold text-ink mb-3">你可能感兴趣</h2>
        <div className="grid grid-cols-6 gap-3 max-md:grid-cols-2">
          {otherSection.map((x) => (
            <Link key={x.id} href={`/product/${x.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand hover:shadow-sm block cursor-pointer">
              <div className="aspect-square bg-[#F5F5F5]">
                {x.image ? <img src={x.image} alt={x.title} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="p-2.5">
                <h4 className="text-[12px] text-ink line-clamp-2 mb-1 leading-snug min-h-[32px]">{x.title}</h4>
                <div className="text-accent font-bold text-[13.5px]">{x.price}<small className="text-mute font-normal text-[11px]">{x.unit}</small></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* === MOBILE STICKY ACTION BAR ===================================== */}
      <div className="hidden max-md:flex fixed bottom-0 left-0 right-0 z-40 bg-paper border-t border-line shadow-[0_-2px_8px_rgba(0,0,0,0.08)] px-3 py-2 gap-2">
        <Link
          href={`/buyer-center/favorites?add=${p.id}`}
          className="w-11 h-11 border border-line rounded-sm flex items-center justify-center text-[18px] cursor-pointer hover:border-accent hover:text-accent"
          aria-label="收藏"
        >
          ❤
        </Link>
        <Link
          href={`/supplier/${supplier.slug}`}
          className="w-11 h-11 border border-line rounded-sm flex items-center justify-center text-[18px] cursor-pointer"
          aria-label="联系供应商"
        >
          💬
        </Link>
        <Link
          href={`/buying-request?productId=${p.id}&intent=sample`}
          className="flex-1 h-11 bg-brand text-white rounded-sm font-bold text-[13px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          📦 索取样品
        </Link>
        <Link
          href={`/buying-request?productId=${p.id}&intent=rfq`}
          className="flex-1 h-11 bg-accent text-white rounded-sm font-bold text-[13px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          🚀 发送询价
        </Link>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = findProduct(id);
  return {
    title: found ? `${found.product.title} — Huayuesc` : `产品 ${id} — Huayuesc`,
    description: found ? `${found.product.title}。${found.product.seller}。价格自 ${found.product.price}${found.product.unit} 起。${found.product.moq}。交货周期 20-30 天，DDP 运输至越南。` : undefined,
  };
}
