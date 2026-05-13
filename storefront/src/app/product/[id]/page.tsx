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
 *   3. Sticky tabs  : Mô tả / Thông số / Bảo đảm Giao dịch / Đánh giá / Vận chuyển / FAQ
 *   4. Description, Specs, Bảo đảm Giao dịch, Reviews, Shipping, FAQ — sections
 *   5. Same-factory rail
 *   6. "Có thể bạn quan tâm" rail
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
    years: "Đã xác minh",
    image: lp.img.src,
    badges: lp.amazing ? ["top"] : lp.monthLabel?.toLowerCase().includes("mới") ? ["new"] : undefined,
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
  ["Xuất xứ", "Trung Quốc (China)"],
  ["Thương hiệu", "OEM/ODM hỗ trợ"],
  ["Vật liệu", "Cao cấp – Grade A"],
  ["Tiêu chuẩn", "ISO 9001, CE, RoHS"],
  ["Đóng gói", "Carton + pallet xuất khẩu"],
  ["Cảng xuất", "Foshan / Shenzhen / Ningbo"],
  ["Thời gian sản xuất", "20 – 30 ngày"],
  ["Hình thức thanh toán", "T/T 30% trả trước, 70% trước khi xuất"],
  ["Vận chuyển", "FOB / CIF / DDP về Việt Nam"],
  ["Bảo hành", "12 tháng tại Việt Nam"],
];

/* --- Reviews + breakdown ----------------------------------------------- */

const REVIEWS = [
  { name: "Trần Minh Huy", company: "Showroom Nội thất Sài Gòn", rating: 5, date: "2026-04-12", text: "Hàng nhận đúng mẫu, thời gian giao nhanh. Đợt 2 sẽ đặt thêm 2 container.", helpful: 18 },
  { name: "Phạm Quốc Anh", company: "Vật liệu xây dựng Phương Nam", rating: 5, date: "2026-03-28", text: "Báo giá nhanh trong 6 tiếng. NCC hỗ trợ video call kiểm hàng trước xuất.", helpful: 14 },
  { name: "Nguyễn Thu Hằng", company: "Hotel Group HCM", rating: 4, date: "2026-03-15", text: "Chất lượng tốt, đóng gói chuẩn xuất khẩu. Giá cạnh tranh hơn nội địa 30%.", helpful: 9 },
  { name: "Lê Văn Đức", company: "Đại lý Đà Nẵng", rating: 5, date: "2026-02-22", text: "Audit nhà máy do Cybersilkroads tổ chức rất chuyên nghiệp. Yên tâm đặt hàng.", helpful: 12 },
];

const RATING_BREAKDOWN = [
  { label: "Chất lượng sản phẩm", score: 4.9 },
  { label: "Giao tiếp với NCC", score: 4.8 },
  { label: "Đóng gói & vận chuyển", score: 4.7 },
  { label: "Đúng cam kết thời hạn", score: 4.9 },
];

/* --- Trade certificates (placeholders) --------------------------------- */

const CERTIFICATES = [
  { code: "ISO 9001:2015", desc: "Quản lý chất lượng" },
  { code: "CE", desc: "EU Conformity" },
  { code: "RoHS", desc: "Hạn chế chất độc hại" },
  { code: "FSC", desc: "Gỗ rừng bền vững" },
  { code: "BSCI", desc: "Đạo đức kinh doanh" },
  { code: "ISO 14001", desc: "Môi trường" },
];

/* --- FAQ --------------------------------------------------------------- */

const FAQS = [
  {
    q: "MOQ trên Cybersilkroads là bao nhiêu?",
    a: "MOQ chuẩn hiển thị trong bảng giá. Một số sản phẩm có thể đặt mẫu trước (MOQ = 1) trước khi đặt số lượng lớn — vui lòng gửi RFQ để xác nhận.",
  },
  {
    q: "Thời gian giao bao lâu?",
    a: "Trung bình 20-30 ngày sản xuất + 12-18 ngày vận chuyển DDP về Hà Nội/HCM. Tổng thời gian giao 32-48 ngày kể từ lúc đặt cọc T/T 30%.",
  },
  {
    q: "Có thể OEM/ODM theo bản vẽ không?",
    a: "Có. NCC hỗ trợ in logo, đổi màu, custom kích thước theo bản vẽ kỹ thuật. Phí mẫu thường $50-200, được khấu trừ vào đơn chính khi đặt MOQ.",
  },
  {
    q: "Cybersilkroads bảo vệ giao dịch thế nào?",
    a: "Bảo đảm Giao dịch: tiền nằm tại tài khoản trung gian của Cybersilkroads, chỉ giải ngân cho NCC khi buyer xác nhận hàng đúng mô tả. Hoàn 100% nếu sai cam kết.",
  },
  {
    q: "Phí vận chuyển DDP đã bao gồm những gì?",
    a: "Bao gồm cước biển/đường bộ, thuế nhập khẩu, VAT, phí thông quan, phí kho trung chuyển, vận chuyển nội địa Việt Nam tới kho buyer. Buyer không cần làm thủ tục gì.",
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
        <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm", href: "/products" }, { label: id }]} />
        <div className="bg-paper border border-line rounded p-12 mt-6 text-center">
          <div className="text-[48px] mb-3">📦</div>
          <h1 className="text-[24px] font-bold text-ink mb-2">Sản phẩm đang được cập nhật</h1>
          <p className="text-[13px] text-mute mb-5">Mã sản phẩm <b>{id}</b> chưa có sẵn. Vui lòng quay lại sau.</p>
          <Link href="/products" className="inline-block px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] hover:bg-brand-light cursor-pointer">
            ← Xem tất cả sản phẩm
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
        { label: "Trang chủ", href: "/" },
        { label: "Sản phẩm", href: "/products" },
        { label: section.title, href: `/category/${section.categorySlug}` },
        { label: p.title },
      ]
    : [
        { label: "Trang chủ", href: "/" },
        { label: "Sản phẩm", href: "/products" },
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
                  aria-label={`Ảnh ${i}`}
                >
                  <img
                    src={`/img/${p.id}-${i}.jpg?v=3`}
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
                      : `/img/${p.id}-${i}.jpg?v=3`
                  }
                  alt={p.title}
                  className={`ig-img ig-img-${i} absolute inset-0 w-full h-full object-cover`}
                />
              ))}
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] px-2.5 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition pointer-events-none">
                🔍 Click thumb để chuyển ảnh
              </div>
              {p.badges && p.badges.length > 0 && (
                <div className="absolute top-3 left-3 flex gap-1 flex-wrap z-10">
                  {p.badges.includes("top") && <span className="bg-gold text-brand-dark text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">⭐ HOT</span>}
                  {p.badges.includes("new") && <span className="bg-success text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">MỚI</span>}
                  {p.badges.includes("deal") && <span className="bg-accent text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">-25%</span>}
                </div>
              )}
            </div>
          </div>

          {/* Title + meta */}
          <h1 className="text-[22px] font-bold text-ink mt-5 leading-tight max-md:text-[18px]">{p.title}</h1>
          <div className="flex items-center gap-3 mt-2 text-[12.5px] text-mute flex-wrap">
            <span className="flex items-center gap-1"><span className="text-gold">★</span> <b className="text-ink">{p.rating}</b> <span>({REVIEWS.length * 31} đánh giá)</span></span>
            <span>·</span>
            <span>340 đơn đã hoàn thành</span>
            <span>·</span>
            <span className="text-success font-semibold">✓ Còn hàng</span>
            <span>·</span>
            <span>SKU: {p.id.toUpperCase()}</span>
          </div>

          {/* Tier price table */}
          <div className="mt-5 border border-line rounded">
            <div className="bg-[#FAFBFC] px-4 py-2.5 border-b border-line text-[13px] font-semibold text-ink flex justify-between items-center">
              <span>Bảng giá theo MOQ <span className="text-mute font-normal">· FOB Trung Quốc</span></span>
              <span className="text-[11.5px] text-success font-medium">⏱ Thời gian giao 20-30 ngày</span>
            </div>
            <table className="w-full text-[13px]">
              <thead className="bg-[#F5F7FA]">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-mute">Số lượng</th>
                  <th className="text-left px-4 py-2 font-medium text-mute">Giá / đơn vị</th>
                  <th className="text-left px-4 py-2 font-medium text-mute">Tiết kiệm</th>
                  <th className="text-right px-4 py-2 font-medium text-mute">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => (
                  <tr key={t.range} className="border-t border-line hover:bg-[#FAFBFC]">
                    <td className="px-4 py-2 text-ink">{t.range} {p.unit}</td>
                    <td className="px-4 py-2 text-accent font-bold">${t.price}{p.unit}</td>
                    <td className="px-4 py-2 text-success">{t.discount === 0 ? "Giá gốc" : `-${t.discount}%`}</td>
                    <td className="px-4 py-2 text-right">
                      <Link
                        href={`/buying-request?productId=${p.id}&qty=${encodeURIComponent(t.range)}&tier=${t.discount}`}
                        className="text-brand text-[12px] font-semibold cursor-pointer hover:underline"
                      >
                        Báo giá →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* === Variant + qty + CTAs — wrapped in a form so submitting
              "Liên hệ ngay" / "Yêu cầu mẫu" carries the chosen color,
              size and quantity to /buying-request as query params. */}
          <form action="/buying-request" method="get" className="mt-5">
            <input type="hidden" name="productId" value={p.id} />
            <input type="hidden" name="productTitle" value={p.title} />
            <input type="hidden" name="supplier" value={p.seller} />

            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              {/* Color swatches — radio + label, CSS-driven active state */}
              <div className="cv-root">
                <span className="block text-[12px] font-semibold text-ink mb-1.5">
                  Màu sắc <span className="text-mute2 font-normal">· 4 lựa chọn</span>
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { code: "#F5F1E8", label: "Trắng cẩm thạch" },
                    { code: "#3D3D3D", label: "Xám đậm" },
                    { code: "#E1C699", label: "Be vàng" },
                    { code: "#5C4033", label: "Nâu walnut" },
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
                <label htmlFor={`size-${p.id}`} className="block text-[12px] font-semibold text-ink mb-1.5">Kích thước</label>
                <select
                  id={`size-${p.id}`}
                  name="size"
                  className="w-full px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand bg-white cursor-pointer"
                  defaultValue="Tiêu chuẩn"
                >
                  <option>Tiêu chuẩn</option>
                  <option>Custom theo bản vẽ</option>
                  <option>Thay đổi tỉ lệ ±5%</option>
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
                💬 Liên hệ ngay
              </button>
              <button
                type="submit"
                name="intent"
                value="sample"
                formAction="/buying-request"
                className="px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] hover:bg-brand-light cursor-pointer inline-flex items-center gap-1.5"
              >
                📦 Yêu cầu mẫu
              </button>
              <Link
                href={`/buyer-center/favorites?add=${p.id}`}
                className="px-4 py-2.5 border border-line rounded-sm text-[13px] text-ink hover:border-accent hover:text-accent cursor-pointer inline-flex items-center"
                aria-label="Thêm vào yêu thích"
                title="Thêm vào yêu thích"
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
            <div className="text-[11px] uppercase tracking-wider text-mute font-bold mb-2.5">Thông tin nhanh</div>
            <ul className="space-y-2 text-[12.5px]">
              <li className="flex justify-between">
                <span className="text-mute">📦 MOQ</span>
                <b className="text-ink">{p.moq.replace("MOQ:", "").trim()}</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">⏱ Thời gian giao</span>
                <b className="text-ink">20-30 ngày</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">🚚 Cảng xuất</span>
                <b className="text-ink">Foshan / Ningbo</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">💳 Thanh toán</span>
                <b className="text-ink">T/T 30% + 70%</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">🎨 OEM / ODM</span>
                <b className="text-success">Có hỗ trợ</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">🧪 Hàng mẫu</span>
                <b className="text-ink">$50-200 (khấu trừ vào đơn)</b>
              </li>
            </ul>
          </div>

          {/* Supplier card */}
          <div className="bg-paper border border-line rounded p-4">
            <div className="text-[11px] uppercase tracking-wider text-mute font-bold mb-2.5">Nhà cung cấp</div>
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
              {supplier.badges.gold && <span className="bg-gold text-brand-dark text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">⭐ VÀNG</span>}
              {supplier.badges.audited && <span className="bg-success text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">✓ ĐÃ KIỂM ĐỊNH</span>}
              <span className="bg-brand text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">{supplier.badges.years}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] mb-3">
              <div className="border border-line rounded-sm p-1.5">
                <b className="block text-[14px] text-accent">★ {supplier.rating}</b>
                <small className="text-mute">{supplier.reviews}</small>
              </div>
              <div className="border border-line rounded-sm p-1.5">
                <b className="block text-[14px] text-brand">340</b>
                <small className="text-mute">đơn / năm</small>
              </div>
              <div className="border border-line rounded-sm p-1.5">
                <b className="block text-[14px] text-brand">98%</b>
                <small className="text-mute">đúng hạn</small>
              </div>
            </div>
            <Link
              href={`/supplier/${supplier.slug}`}
              className="block w-full text-center py-2 bg-brand text-white rounded-sm font-semibold text-[12.5px] hover:bg-brand-light cursor-pointer"
            >
              Xem nhà máy →
            </Link>
          </div>

          {/* Inline RFQ form — submits with full product + supplier context */}
          <form action="/buying-request" method="get" className="bg-paper border-2 border-accent rounded p-4">
            <input type="hidden" name="productId" value={p.id} />
            <input type="hidden" name="supplier" value={p.seller} />
            <input type="hidden" name="intent" value="rfq" />
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[18px]">📋</span>
              <b className="text-[13px] font-bold text-ink">Gửi yêu cầu báo giá</b>
            </div>
            <p className="text-[11.5px] text-mute mb-2.5 leading-snug">
              Báo giá miễn phí trong 24h từ NCC này + 3-5 NCC tương tự.
            </p>
            <input
              name="q"
              defaultValue={p.title}
              className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand"
            />
            <input
              name="qty"
              placeholder={`Số lượng + đơn vị (vd: 500${p.unit})`}
              className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand"
            />
            <textarea
              name="desc"
              placeholder="Mô tả chi tiết yêu cầu, custom..."
              rows={3}
              className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand resize-none"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-accent text-white rounded-sm font-bold text-[12.5px] cursor-pointer hover:opacity-90"
            >
              🚀 Gửi RFQ ngay
            </button>
          </form>

          {/* Trust pillars */}
          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-semibold text-ink mb-2.5">🛡 Bảo vệ Cybersilkroads</b>
            <ul className="text-[12px] text-mute space-y-1.5">
              <li className="flex gap-2"><span className="text-success">✓</span> Hoàn tiền nếu không nhận hàng</li>
              <li className="flex gap-2"><span className="text-success">✓</span> Audit nhà máy miễn phí trước khi đặt</li>
              <li className="flex gap-2"><span className="text-success">✓</span> Hỗ trợ tranh chấp 24/7</li>
              <li className="flex gap-2"><span className="text-success">✓</span> Vận chuyển DDP — đã gồm thuế</li>
              <li className="flex gap-2"><span className="text-success">✓</span> Bảo đảm Giao dịch (tài khoản trung gian)</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* === STICKY TAB NAVIGATION ======================================== */}
      <nav className="sticky top-[3.4rem] z-30 bg-paper border-y border-line mt-7 max-md:top-0">
        <div className="max-w-[1400px] mx-auto px-4 flex gap-0 overflow-x-auto text-[13.5px] font-semibold">
          {[
            { href: "#mo-ta", label: "Mô tả" },
            { href: "#thong-so", label: "Thông số kỹ thuật" },
            { href: "#trade-assurance", label: "Bảo đảm Giao dịch" },
            { href: "#danh-gia", label: `Đánh giá (${REVIEWS.length * 31})` },
            { href: "#van-chuyen", label: "Vận chuyển" },
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
          <h2 className="text-[18px] font-bold text-ink mb-4">Mô tả sản phẩm</h2>
          <p className="text-[13px] text-ink leading-relaxed mb-4">
            <b>{p.title}</b> được sản xuất bởi <Link href={`/supplier/${supplier.slug}`} className="text-brand hover:underline cursor-pointer">{p.seller}</Link>, một trong những nhà máy hàng đầu tại Trung Quốc với <b>{p.years} kinh nghiệm</b> xuất khẩu. Sản phẩm đạt tiêu chuẩn quốc tế, phù hợp cho dự án thương mại và dân dụng cao cấp.
          </p>
          <img src={`/img/${p.id}-desc1.jpg?v=3`} alt="" className="w-full rounded mb-4" loading="lazy" />
          <p className="text-[13px] text-ink leading-relaxed mb-4">
            Quy trình kiểm soát chất lượng nghiêm ngặt theo <b>ISO 9001:2015</b>. Mỗi lô hàng đều được audit bởi đội ngũ Cybersilkroads tại Quảng Châu trước khi xuất xưởng. Hỗ trợ <b>OEM/ODM</b> theo bản vẽ khách hàng, MOQ linh hoạt, thời gian giao 20-30 ngày.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4 max-md:grid-cols-1">
            <img src={`/img/${p.id}-desc2.jpg?v=3`} alt="" className="w-full rounded" loading="lazy" />
            <img src={`/img/${p.id}-desc3.jpg?v=3`} alt="" className="w-full rounded" loading="lazy" />
          </div>
          <p className="text-[13px] text-ink leading-relaxed">
            Vận chuyển <b>DDP về Việt Nam</b> — không phải lo thủ tục hải quan, không phát sinh phí. Kho trung chuyển tại Bằng Tường (Lạng Sơn) và Hữu Nghị (cảng Hải Phòng) đảm bảo thời gian giao 5-7 ngày từ Trung Quốc về kho buyer.
          </p>
        </div>
      </section>

      {/* === SPECS ======================================================== */}
      <section id="thong-so" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">Thông số kỹ thuật</h2>
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
            🛡 Bảo đảm Giao dịch & Chứng chỉ
          </h2>
          <p className="text-[13px] text-mute mb-4 leading-relaxed">
            Đơn hàng được bảo vệ bởi Cybersilkroads Bảo đảm Giao dịch: tiền giữ tại tài khoản trung gian, NCC chỉ nhận tiền sau khi buyer xác nhận hàng đúng cam kết. Hoàn 100% nếu sai.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {[
              { icon: "🔒", t: "Tiền cọc giữ trung gian", d: "Tiền giữ tại Cybersilkroads, chỉ giải ngân khi người mua xác nhận" },
              { icon: "🏭", t: "Kiểm định tại chỗ miễn phí", d: "Đội kiểm định kiểm hàng trước khi xuất, gọi video trực tiếp" },
              { icon: "⚖", t: "Hỗ trợ tranh chấp", d: "Hoà giải 24/7, hoàn tiền 100% nếu sai mô tả/số lượng" },
            ].map((x) => (
              <div key={x.t} className="bg-[#FFF7E6] border border-gold/40 rounded p-3.5">
                <div className="text-[24px] mb-1">{x.icon}</div>
                <b className="block text-[13px] text-ink mb-0.5">{x.t}</b>
                <p className="text-[11.5px] text-mute leading-snug">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-line pt-4">
            <b className="block text-[13px] font-semibold text-ink mb-3">Chứng chỉ NCC đã đạt</b>
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
          <h2 className="text-[18px] font-bold text-ink mb-4">Đánh giá từ người mua</h2>
          <div className="grid grid-cols-[280px_1fr] gap-6 mb-5 max-md:grid-cols-1 max-md:gap-4">
            {/* Left: overall rating */}
            <div className="text-center border-r border-line pr-6 max-md:border-r-0 max-md:border-b max-md:pr-0 max-md:pb-4">
              <div className="text-[44px] font-extrabold text-accent leading-none">{overallRating}</div>
              <div className="text-gold text-[18px] my-1">★★★★★</div>
              <small className="text-[11.5px] text-mute">Dựa trên {REVIEWS.length * 31} đánh giá đã kiểm chứng</small>
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
                    👍 Hữu ích ({r.helpful})
                  </Link>
                  <Link
                    href={`/login?next=${encodeURIComponent(`/product/${p.id}/reviews`)}`}
                    className="hover:text-brand cursor-pointer"
                  >
                    💬 Trả lời
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link href={`/product/${p.id}/reviews`} className="text-brand text-[13px] font-semibold cursor-pointer hover:underline">
              Xem tất cả {REVIEWS.length * 31} đánh giá →
            </Link>
          </div>
        </div>
      </section>

      {/* === SHIPPING ===================================================== */}
      <section id="van-chuyen" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">🚚 Vận chuyển & DDP về Việt Nam</h2>
          <div className="grid grid-cols-3 gap-4 mb-5 max-md:grid-cols-1">
            {[
              { t: "FOB Trung Quốc", d: "Bạn tự lo cước, thuế. Giá rẻ nhất.", price: "Theo bảng giá", time: "Pickup tại Foshan / Ningbo", mode: "fob" },
              { t: "CIF Hải Phòng / Cát Lái", d: "Đã gồm cước + bảo hiểm tới cảng VN.", price: "+ $200-400/CBM", time: "12-15 ngày", mode: "cif" },
              { t: "DDP tận kho", d: "Trọn gói: thuế + thông quan + nội địa.", price: "+ $400-700/CBM", time: "18-22 ngày", mode: "ddp" },
            ].map((s, i) => (
              <Link
                key={s.t}
                href={`/info/ddp-calculator?mode=${s.mode}&productId=${p.id}`}
                className={`border-2 rounded p-3.5 cursor-pointer hover:shadow-sm transition block ${i === 2 ? "border-brand bg-brand/5 hover:bg-brand/10" : "border-line hover:border-brand"}`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <b className="text-[14px] text-ink">{s.t}</b>
                  {i === 2 && <span className="bg-brand text-white text-[9.5px] px-1.5 py-0.5 rounded-sm font-bold">PHỔ BIẾN</span>}
                </div>
                <p className="text-[11.5px] text-mute leading-snug mb-2">{s.d}</p>
                <div className="text-[12px] text-ink"><b className="text-accent">{s.price}</b></div>
                <div className="text-[11.5px] text-mute mt-0.5 mb-1">⏱ {s.time}</div>
                <span className="text-[11.5px] text-brand font-semibold">Tính cước cho phương thức này →</span>
              </Link>
            ))}
          </div>

          {/* Shipping calculator — submits to /info/ddp-calculator which
              renders an actual cost breakdown based on these query params. */}
          <form action="/info/ddp-calculator" method="get" className="border-t border-line pt-4">
            <input type="hidden" name="productId" value={p.id} />
            <input type="hidden" name="mode" value="ddp" />
            <b className="block text-[13px] font-semibold text-ink mb-2.5">⚡ Tính cước DDP nhanh</b>
            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 max-md:grid-cols-1">
              <select name="port" className="px-3 py-2 border border-line rounded-sm text-[13px] bg-white outline-none focus:border-brand cursor-pointer" defaultValue="haiphong">
                <option value="haiphong">Cảng đích: Hải Phòng</option>
                <option value="catlai">Cảng đích: Cát Lái (HCM)</option>
                <option value="danang">Cảng đích: Đà Nẵng</option>
                <option value="langson">Đường bộ qua Lạng Sơn</option>
              </select>
              <input
                name="qty"
                type="number"
                step="0.1"
                min="0"
                placeholder="Số lượng (CBM hoặc kg)"
                className="px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
              <input
                name="value"
                type="number"
                step="1"
                min="0"
                placeholder="Giá trị đơn ($USD)"
                className="px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
              <button type="submit" className="px-5 py-2 bg-brand text-white rounded-sm font-semibold text-[13px] cursor-pointer hover:bg-brand-light">
                Tính cước →
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* === FAQ ========================================================== */}
      <section id="faq" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">❓ Câu hỏi thường gặp</h2>
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
          <span>Sản phẩm cùng nhà máy <span className="text-mute font-normal text-[12.5px]">· {supplier.name}</span></span>
          <Link href={`/supplier/${supplier.slug}`} className="text-brand text-[12.5px] font-semibold cursor-pointer hover:underline">Xem tất cả →</Link>
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
        <h2 className="text-[16px] font-bold text-ink mb-3">Có thể bạn quan tâm</h2>
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
          aria-label="Yêu thích"
        >
          ❤
        </Link>
        <Link
          href={`/supplier/${supplier.slug}`}
          className="w-11 h-11 border border-line rounded-sm flex items-center justify-center text-[18px] cursor-pointer"
          aria-label="Liên hệ NCC"
        >
          💬
        </Link>
        <Link
          href={`/buying-request?productId=${p.id}&intent=sample`}
          className="flex-1 h-11 bg-brand text-white rounded-sm font-bold text-[13px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          📦 Yêu cầu mẫu
        </Link>
        <Link
          href={`/buying-request?productId=${p.id}&intent=rfq`}
          className="flex-1 h-11 bg-accent text-white rounded-sm font-bold text-[13px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          🚀 Gửi RFQ
        </Link>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = findProduct(id);
  return {
    title: found ? `${found.product.title} — Cybersilkroads` : `Sản phẩm ${id} — Cybersilkroads`,
    description: found ? `${found.product.title}. ${found.product.seller}. Giá từ ${found.product.price}${found.product.unit}. ${found.product.moq}. Thời gian giao 20-30 ngày, vận chuyển DDP về Việt Nam.` : undefined,
  };
}
