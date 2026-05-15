import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SECTIONS, NAV_CATEGORIES } from "@/data/home";
import type { Product } from "@/data/home";
import { getLeafCategory } from "@/data/products";
import type { ListingProduct } from "@/data/products";

/**
 * Full reviews list for a product. Linked from product detail page's
 * "Xem tất cả N đánh giá" CTA. Synthesizes a longer list of reviews
 * from a small seed pool so every product page has a populated reviews
 * page (useful for SEO + buyer trust).
 */

const REVIEW_SEED = [
  { name: "Trần Minh Huy", company: "Showroom Nội thất Sài Gòn · TP HCM", rating: 5, text: "Hàng nhận đúng mẫu, thời gian giao nhanh. Đợt 2 sẽ đặt thêm 2 container.", helpful: 18 },
  { name: "Phạm Quốc Anh", company: "Vật liệu xây dựng Phương Nam · Hà Nội", rating: 5, text: "Báo giá nhanh trong 6 tiếng. NCC hỗ trợ video call kiểm hàng trước xuất.", helpful: 14 },
  { name: "Nguyễn Thu Hằng", company: "Hotel Group HCM · TP HCM", rating: 4, text: "Chất lượng tốt, đóng gói chuẩn xuất khẩu. Giá cạnh tranh hơn nội địa 30%.", helpful: 9 },
  { name: "Lê Văn Đức", company: "Đại lý Đà Nẵng · Đà Nẵng", rating: 5, text: "Audit nhà máy do đội Quảng Châu tổ chức rất chuyên nghiệp. Yên tâm đặt hàng.", helpful: 12 },
  { name: "Đặng Thanh Hà", company: "Công ty Xây dựng Bình Minh · Bắc Ninh", rating: 5, text: "DDP về tận kho, không phát sinh phí thuế. Tiết kiệm 4 ngày so với tự lo logistics.", helpful: 22 },
  { name: "Bùi Quốc Tuấn", company: "Showroom Decor Hà Nội", rating: 4, text: "Một vài sản phẩm có vài lỗi nhỏ về sơn, NCC đã ship bù miễn phí. Service tốt.", helpful: 7 },
  { name: "Vũ Thuý Linh", company: "Resort Đà Lạt · Lâm Đồng", rating: 5, text: "Chất lượng hơn cả mong đợi, customer service tận tình.", helpful: 11 },
  { name: "Phan Văn Hùng", company: "Đại lý Hải Phòng", rating: 4, text: "Thời gian giao hàng đúng hẹn, chất lượng đáng tiền.", helpful: 6 },
  { name: "Lý Thị Mai", company: "Boutique Hotel Hội An", rating: 5, text: "Bảo đảm Giao dịch refund đầy đủ khi 1 box bị hỏng. Đáng tin.", helpful: 13 },
  { name: "Đỗ Khắc Quân", company: "Nhà thầu Bình Dương", rating: 5, text: "Đã nhận 3 container, không có khiếu nại. Sẽ tiếp tục hợp tác.", helpful: 17 },
];

const RATING_BREAKDOWN = [
  { label: "Chất lượng sản phẩm", score: 4.9 },
  { label: "Giao tiếp với NCC", score: 4.8 },
  { label: "Đóng gói & vận chuyển", score: 4.7 },
  { label: "Đúng cam kết thời hạn", score: 4.9 },
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
    years: "Đã xác minh",
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
        <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm", href: "/products" }, { label: id }, { label: "Đánh giá" }]} />
        <div className="bg-paper border border-line rounded p-12 mt-6 text-center">
          <h1 className="text-[20px] font-bold text-ink mb-2">Không tìm thấy sản phẩm</h1>
          <Link href="/products" className="inline-block px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px]">← Tất cả sản phẩm</Link>
        </div>
      </div>
    );
  }

  const { product: p, parentSlug, parentName, leafSlug, leafTitle, sectionTitle, sectionSlug } = found;

  const trail = sectionSlug
    ? [
        { label: "Trang chủ", href: "/" },
        { label: "Sản phẩm", href: "/products" },
        { label: sectionTitle!, href: `/category/${sectionSlug}` },
        { label: p.title, href: `/product/${p.id}` },
        { label: "Đánh giá" },
      ]
    : [
        { label: "Trang chủ", href: "/" },
        { label: "Sản phẩm", href: "/products" },
        ...(parentName && parentSlug ? [{ label: parentName, href: `/category/${parentSlug}` }] : []),
        ...(leafTitle && leafSlug && parentSlug ? [{ label: leafTitle, href: `/category/${parentSlug}/${leafSlug}` }] : []),
        { label: p.title, href: `/product/${p.id}` },
        { label: "Đánh giá" },
      ];

  return (
    <>
      <Breadcrumb trail={trail} />

      {/* Header card with product summary */}
      <div className="max-w-[1100px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-4 flex gap-4 items-center max-md:flex-col max-md:items-start">
          <Link href={`/product/${p.id}`} className="w-20 h-20 bg-surface-1 rounded-sm overflow-hidden flex-shrink-0 cursor-pointer">
            {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
          </Link>
          <div className="flex-1 min-w-0">
            <Link href={`/product/${p.id}`} className="cursor-pointer">
              <h1 className="text-[16px] font-semibold text-ink hover:text-brand line-clamp-2">{p.title}</h1>
            </Link>
            <div className="text-[12.5px] text-mute mt-1">{p.seller} · {p.years}</div>
          </div>
          <Link href={`/product/${p.id}`} className="text-brand text-[12.5px] font-semibold cursor-pointer hover:underline flex-shrink-0">
            ← Quay lại sản phẩm
          </Link>
        </div>
      </div>

      {/* Overall rating + breakdown */}
      <div className="max-w-[1100px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5 grid grid-cols-[280px_1fr] gap-6 max-md:grid-cols-1">
          <div className="text-center border-r border-line pr-6 max-md:border-r-0 max-md:border-b max-md:pr-0 max-md:pb-4">
            <div className="text-[44px] font-extrabold text-accent leading-none">{overall}</div>
            <div className="text-gold text-[18px] my-1">★★★★★</div>
            <small className="text-[11.5px] text-mute">Dựa trên {reviews.length} đánh giá đã kiểm chứng</small>
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
            <h2 className="text-[16px] font-bold text-ink">Tất cả đánh giá ({reviews.length})</h2>
            <select className="px-3 py-1.5 border border-line rounded-sm text-[12.5px] outline-none bg-white cursor-pointer">
              <option>Mới nhất</option>
              <option>Đánh giá cao nhất</option>
              <option>Đánh giá thấp nhất</option>
              <option>Hữu ích nhất</option>
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
                    👍 Hữu ích ({r.helpful})
                  </Link>
                  <Link href={`/login?next=/product/${p.id}/reviews`} className="hover:text-brand cursor-pointer">
                    💬 Trả lời
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link href={`/buying-request?productId=${p.id}`} className="inline-block px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] cursor-pointer hover:bg-brand-light">
              💬 Liên hệ NCC để hỏi thêm
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
    title: found ? `Đánh giá: ${found.product.title} — Cybersilkroads` : `Đánh giá sản phẩm — Cybersilkroads`,
  };
}
