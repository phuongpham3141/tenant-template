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
    years: "Verified",
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
  ["Origin", "China"],
  ["Brand", "OEM/ODM supported"],
  ["Material", "Premium – Grade A"],
  ["Standards", "ISO 9001, CE, RoHS"],
  ["Packaging", "Export carton + pallet"],
  ["Port of Loading", "Foshan / Shenzhen / Ningbo"],
  ["Production Lead Time", "20 – 30 days"],
  ["Payment Terms", "T/T 30% deposit, 70% before shipment"],
  ["Shipping", "FOB / CIF / DDP to Vietnam"],
  ["Warranty", "12 months in Vietnam"],
];

/* --- Reviews + breakdown ----------------------------------------------- */

const REVIEWS = [
  { name: "Tran Minh Huy", company: "Saigon Furniture Showroom", rating: 5, date: "2026-04-12", text: "Goods arrived exactly as sampled, fast delivery. We will order 2 more containers in the next round.", helpful: 18 },
  { name: "Pham Quoc Anh", company: "Phuong Nam Building Materials", rating: 5, date: "2026-03-28", text: "Quote returned within 6 hours. The supplier supported a video call to inspect goods before shipment.", helpful: 14 },
  { name: "Nguyen Thu Hang", company: "Hotel Group HCMC", rating: 4, date: "2026-03-15", text: "Good quality, export-grade packaging. Pricing is 30% more competitive than domestic.", helpful: 9 },
  { name: "Le Van Duc", company: "Da Nang Dealer", rating: 5, date: "2026-02-22", text: "The factory audit organized by Huayuesc was very professional. We order with confidence.", helpful: 12 },
];

const RATING_BREAKDOWN = [
  { label: "Product Quality", score: 4.9 },
  { label: "Supplier Communication", score: 4.8 },
  { label: "Packaging & Shipping", score: 4.7 },
  { label: "On-Time Delivery", score: 4.9 },
];

/* --- Trade certificates (placeholders) --------------------------------- */

const CERTIFICATES = [
  { code: "ISO 9001:2015", desc: "Quality Management" },
  { code: "CE", desc: "EU Conformity" },
  { code: "RoHS", desc: "Hazardous Substance Restriction" },
  { code: "FSC", desc: "Sustainable Forestry" },
  { code: "BSCI", desc: "Business Ethics" },
  { code: "ISO 14001", desc: "Environmental" },
];

/* --- FAQ --------------------------------------------------------------- */

const FAQS = [
  {
    q: "What is the MOQ on Huayuesc?",
    a: "The standard MOQ is shown in the price table. Some products allow a sample order first (MOQ = 1) before placing a bulk order — please send an RFQ to confirm.",
  },
  {
    q: "How long is the delivery time?",
    a: "On average 20-30 days of production + 12-18 days of DDP shipping to Hanoi/Ho Chi Minh City. Total delivery time is 32-48 days from the T/T 30% deposit.",
  },
  {
    q: "Can you do OEM/ODM to drawing?",
    a: "Yes. The supplier supports logo printing, color changes, and custom dimensions to your technical drawings. The sample fee is typically $50-200 and is credited against the main order once the MOQ is placed.",
  },
  {
    q: "How does Huayuesc protect transactions?",
    a: "Trade Assurance: funds are held in Huayuesc's escrow account and released to the supplier only after the buyer confirms the goods match the description. 100% refund if commitments are not met.",
  },
  {
    q: "What does the DDP shipping fee include?",
    a: "It includes ocean/road freight, import duties, VAT, customs clearance, transit warehouse fees, and domestic Vietnam delivery to the buyer's warehouse. The buyer handles no paperwork.",
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
        <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: id }]} />
        <div className="bg-paper border border-line rounded p-12 mt-6 text-center">
          <div className="text-[48px] mb-3">📦</div>
          <h1 className="text-[24px] font-bold text-ink mb-2">This product is being updated</h1>
          <p className="text-[13px] text-mute mb-5">Product code <b>{id}</b> is not available yet. Please check back later.</p>
          <Link href="/products" className="inline-block px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] hover:bg-brand-light cursor-pointer">
            ← View All Products
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
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: section.title, href: `/category/${section.categorySlug}` },
        { label: p.title },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
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
                  aria-label={`Image ${i}`}
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
                🔍 Click a thumbnail to switch images
              </div>
              {p.badges && p.badges.length > 0 && (
                <div className="absolute top-3 left-3 flex gap-1 flex-wrap z-10">
                  {p.badges.includes("top") && <span className="bg-gold text-brand-dark text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">⭐ HOT</span>}
                  {p.badges.includes("new") && <span className="bg-success text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">NEW</span>}
                  {p.badges.includes("deal") && <span className="bg-accent text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">-25%</span>}
                </div>
              )}
            </div>
          </div>

          {/* Title + meta */}
          <h1 className="text-[22px] font-bold text-ink mt-5 leading-tight max-md:text-[18px]">{p.title}</h1>
          <div className="flex items-center gap-3 mt-2 text-[12.5px] text-mute flex-wrap">
            <span className="flex items-center gap-1"><span className="text-gold">★</span> <b className="text-ink">{p.rating}</b> <span>({REVIEWS.length * 31} reviews)</span></span>
            <span>·</span>
            <span>340 orders completed</span>
            <span>·</span>
            <span className="text-success font-semibold">✓ In Stock</span>
            <span>·</span>
            <span>SKU: {p.id.toUpperCase()}</span>
          </div>

          {/* Tier price table */}
          <div className="mt-5 border border-line rounded">
            <div className="bg-[#FAFBFC] px-4 py-2.5 border-b border-line text-[13px] font-semibold text-ink flex justify-between items-center">
              <span>Price by MOQ <span className="text-mute font-normal">· FOB China</span></span>
              <span className="text-[11.5px] text-success font-medium">⏱ Delivery 20-30 days</span>
            </div>
            <table className="w-full text-[13px]">
              <thead className="bg-[#F5F7FA]">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-mute">Quantity</th>
                  <th className="text-left px-4 py-2 font-medium text-mute">Price / unit</th>
                  <th className="text-left px-4 py-2 font-medium text-mute">Savings</th>
                  <th className="text-right px-4 py-2 font-medium text-mute">Action</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => (
                  <tr key={t.range} className="border-t border-line hover:bg-[#FAFBFC]">
                    <td className="px-4 py-2 text-ink">{t.range} {p.unit}</td>
                    <td className="px-4 py-2 text-accent font-bold">${t.price}{p.unit}</td>
                    <td className="px-4 py-2 text-success">{t.discount === 0 ? "Base price" : `-${t.discount}%`}</td>
                    <td className="px-4 py-2 text-right">
                      <Link
                        href={`/buying-request?productId=${p.id}&qty=${encodeURIComponent(t.range)}&tier=${t.discount}`}
                        className="text-brand text-[12px] font-semibold cursor-pointer hover:underline"
                      >
                        Get Quote →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* === Variant + qty + CTAs — wrapped in a form so submitting
              "Contact Now" / "Request Sample" carries the chosen color,
              size and quantity to /buying-request as query params. */}
          <form action="/buying-request" method="get" className="mt-5">
            <input type="hidden" name="productId" value={p.id} />
            <input type="hidden" name="productTitle" value={p.title} />
            <input type="hidden" name="supplier" value={p.seller} />

            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              {/* Color swatches — radio + label, CSS-driven active state */}
              <div className="cv-root">
                <span className="block text-[12px] font-semibold text-ink mb-1.5">
                  Color <span className="text-mute2 font-normal">· 4 options</span>
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { code: "#F5F1E8", label: "Marble White" },
                    { code: "#3D3D3D", label: "Dark Gray" },
                    { code: "#E1C699", label: "Golden Beige" },
                    { code: "#5C4033", label: "Walnut Brown" },
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
                <label htmlFor={`size-${p.id}`} className="block text-[12px] font-semibold text-ink mb-1.5">Size</label>
                <select
                  id={`size-${p.id}`}
                  name="size"
                  className="w-full px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand bg-white cursor-pointer"
                  defaultValue="Standard"
                >
                  <option>Standard</option>
                  <option>Custom to drawing</option>
                  <option>Scale ±5%</option>
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
                💬 Contact Now
              </button>
              <button
                type="submit"
                name="intent"
                value="sample"
                formAction="/buying-request"
                className="px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] hover:bg-brand-light cursor-pointer inline-flex items-center gap-1.5"
              >
                📦 Request Sample
              </button>
              <Link
                href={`/buyer-center/favorites?add=${p.id}`}
                className="px-4 py-2.5 border border-line rounded-sm text-[13px] text-ink hover:border-accent hover:text-accent cursor-pointer inline-flex items-center"
                aria-label="Add to favorites"
                title="Add to favorites"
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
            <div className="text-[11px] uppercase tracking-wider text-mute font-bold mb-2.5">Quick Info</div>
            <ul className="space-y-2 text-[12.5px]">
              <li className="flex justify-between">
                <span className="text-mute">📦 MOQ</span>
                <b className="text-ink">{p.moq.replace("MOQ:", "").trim()}</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">⏱ Delivery Time</span>
                <b className="text-ink">20-30 days</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">🚚 Port of Loading</span>
                <b className="text-ink">Foshan / Ningbo</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">💳 Payment</span>
                <b className="text-ink">T/T 30% + 70%</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">🎨 OEM / ODM</span>
                <b className="text-success">Supported</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">🧪 Samples</span>
                <b className="text-ink">$50-200 (credited to order)</b>
              </li>
            </ul>
          </div>

          {/* Supplier card */}
          <div className="bg-paper border border-line rounded p-4">
            <div className="text-[11px] uppercase tracking-wider text-mute font-bold mb-2.5">Supplier</div>
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
              {supplier.badges.gold && <span className="bg-gold text-brand-dark text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">⭐ GOLD</span>}
              {supplier.badges.audited && <span className="bg-success text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">✓ AUDITED</span>}
              <span className="bg-brand text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">{supplier.badges.years}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] mb-3">
              <div className="border border-line rounded-sm p-1.5">
                <b className="block text-[14px] text-accent">★ {supplier.rating}</b>
                <small className="text-mute">{supplier.reviews}</small>
              </div>
              <div className="border border-line rounded-sm p-1.5">
                <b className="block text-[14px] text-brand">340</b>
                <small className="text-mute">orders / yr</small>
              </div>
              <div className="border border-line rounded-sm p-1.5">
                <b className="block text-[14px] text-brand">98%</b>
                <small className="text-mute">on-time</small>
              </div>
            </div>
            <Link
              href={`/supplier/${supplier.slug}`}
              className="block w-full text-center py-2 bg-brand text-white rounded-sm font-semibold text-[12.5px] hover:bg-brand-light cursor-pointer"
            >
              View Factory →
            </Link>
          </div>

          {/* Inline RFQ form — submits with full product + supplier context */}
          <form action="/buying-request" method="get" className="bg-paper border-2 border-accent rounded p-4">
            <input type="hidden" name="productId" value={p.id} />
            <input type="hidden" name="supplier" value={p.seller} />
            <input type="hidden" name="intent" value="rfq" />
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[18px]">📋</span>
              <b className="text-[13px] font-bold text-ink">Send RFQ</b>
            </div>
            <p className="text-[11.5px] text-mute mb-2.5 leading-snug">
              Free quote within 24h from this supplier + 3-5 similar suppliers.
            </p>
            <input
              name="q"
              defaultValue={p.title}
              className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand"
            />
            <input
              name="qty"
              placeholder={`Quantity + unit (e.g. 500${p.unit})`}
              className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand"
            />
            <textarea
              name="desc"
              placeholder="Describe your requirements, customization..."
              rows={3}
              className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand resize-none"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-accent text-white rounded-sm font-bold text-[12.5px] cursor-pointer hover:opacity-90"
            >
              🚀 Send RFQ Now
            </button>
          </form>

          {/* Trust pillars */}
          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-semibold text-ink mb-2.5">🛡 Huayuesc Protection</b>
            <ul className="text-[12px] text-mute space-y-1.5">
              <li className="flex gap-2"><span className="text-success">✓</span> Refund if goods are not received</li>
              <li className="flex gap-2"><span className="text-success">✓</span> Free factory audit before ordering</li>
              <li className="flex gap-2"><span className="text-success">✓</span> 24/7 dispute support</li>
              <li className="flex gap-2"><span className="text-success">✓</span> DDP shipping — duties included</li>
              <li className="flex gap-2"><span className="text-success">✓</span> Trade Assurance (escrow account)</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* === STICKY TAB NAVIGATION ======================================== */}
      <nav className="sticky top-[3.4rem] z-30 bg-paper border-y border-line mt-7 max-md:top-0">
        <div className="max-w-[1400px] mx-auto px-4 flex gap-0 overflow-x-auto text-[13.5px] font-semibold">
          {[
            { href: "#mo-ta", label: "Description" },
            { href: "#thong-so", label: "Specifications" },
            { href: "#trade-assurance", label: "Trade Assurance" },
            { href: "#danh-gia", label: `Reviews (${REVIEWS.length * 31})` },
            { href: "#van-chuyen", label: "Shipping" },
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
          <h2 className="text-[18px] font-bold text-ink mb-4">Product Description</h2>
          <p className="text-[13px] text-ink leading-relaxed mb-4">
            <b>{p.title}</b> is manufactured by <Link href={`/supplier/${supplier.slug}`} className="text-brand hover:underline cursor-pointer">{p.seller}</Link>, one of the leading factories in China with <b>{p.years} of export experience</b>. The product meets international standards and is suited to commercial and high-end residential projects.
          </p>
          <img src={`/img/${p.id}-desc1.jpg?v=5`} alt="" className="w-full rounded mb-4" loading="lazy" />
          <p className="text-[13px] text-ink leading-relaxed mb-4">
            Strict quality control to <b>ISO 9001:2015</b>. Every batch is audited by the Huayuesc team in Guangzhou before it leaves the factory. <b>OEM/ODM</b> to customer drawings is supported, with flexible MOQ and a 20-30 day delivery time.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4 max-md:grid-cols-1">
            <img src={`/img/${p.id}-desc2.jpg?v=5`} alt="" className="w-full rounded" loading="lazy" />
            <img src={`/img/${p.id}-desc3.jpg?v=5`} alt="" className="w-full rounded" loading="lazy" />
          </div>
          <p className="text-[13px] text-ink leading-relaxed">
            <b>DDP shipping to Vietnam</b> — no customs paperwork to worry about, no surprise fees. Transit warehouses in Pingxiang (Lang Son) and Huu Nghi (Hai Phong port) ensure a 5-7 day delivery time from China to the buyer's warehouse.
          </p>
        </div>
      </section>

      {/* === SPECS ======================================================== */}
      <section id="thong-so" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">Specifications</h2>
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
            🛡 Trade Assurance & Certificates
          </h2>
          <p className="text-[13px] text-mute mb-4 leading-relaxed">
            Orders are protected by Huayuesc Trade Assurance: funds are held in escrow and the supplier is paid only after the buyer confirms the goods match the commitment. 100% refund if not.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {[
              { icon: "🔒", t: "Deposit held in escrow", d: "Funds held by Huayuesc, released only when the buyer confirms" },
              { icon: "🏭", t: "Free on-site inspection", d: "Our team inspects goods before shipment, with a live video call" },
              { icon: "⚖", t: "Dispute support", d: "24/7 mediation, 100% refund for description/quantity mismatch" },
            ].map((x) => (
              <div key={x.t} className="bg-[#FFF7E6] border border-gold/40 rounded p-3.5">
                <div className="text-[24px] mb-1">{x.icon}</div>
                <b className="block text-[13px] text-ink mb-0.5">{x.t}</b>
                <p className="text-[11.5px] text-mute leading-snug">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-line pt-4">
            <b className="block text-[13px] font-semibold text-ink mb-3">Supplier Certifications</b>
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
          <h2 className="text-[18px] font-bold text-ink mb-4">Buyer Reviews</h2>
          <div className="grid grid-cols-[280px_1fr] gap-6 mb-5 max-md:grid-cols-1 max-md:gap-4">
            {/* Left: overall rating */}
            <div className="text-center border-r border-line pr-6 max-md:border-r-0 max-md:border-b max-md:pr-0 max-md:pb-4">
              <div className="text-[44px] font-extrabold text-accent leading-none">{overallRating}</div>
              <div className="text-gold text-[18px] my-1">★★★★★</div>
              <small className="text-[11.5px] text-mute">Based on {REVIEWS.length * 31} verified reviews</small>
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
                    👍 Helpful ({r.helpful})
                  </Link>
                  <Link
                    href={`/login?next=${encodeURIComponent(`/product/${p.id}/reviews`)}`}
                    className="hover:text-brand cursor-pointer"
                  >
                    💬 Reply
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link href={`/product/${p.id}/reviews`} className="text-brand text-[13px] font-semibold cursor-pointer hover:underline">
              View All {REVIEWS.length * 31} Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* === SHIPPING ===================================================== */}
      <section id="van-chuyen" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">🚚 Shipping & DDP to Vietnam</h2>
          <div className="grid grid-cols-3 gap-4 mb-5 max-md:grid-cols-1">
            {[
              { t: "FOB China", d: "You arrange freight and duties. Lowest price.", price: "Per price list", time: "Pickup at Foshan / Ningbo", mode: "fob" },
              { t: "CIF Hai Phong / Cat Lai", d: "Freight + insurance to the VN port included.", price: "+ $200-400/CBM", time: "12-15 days", mode: "cif" },
              { t: "DDP to warehouse", d: "All-in: duties + customs + domestic delivery.", price: "+ $400-700/CBM", time: "18-22 days", mode: "ddp" },
            ].map((s, i) => (
              <Link
                key={s.t}
                href={`/info/ddp-calculator?mode=${s.mode}&productId=${p.id}`}
                className={`border-2 rounded p-3.5 cursor-pointer hover:shadow-sm transition block ${i === 2 ? "border-brand bg-brand/5 hover:bg-brand/10" : "border-line hover:border-brand"}`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <b className="text-[14px] text-ink">{s.t}</b>
                  {i === 2 && <span className="bg-brand text-white text-[9.5px] px-1.5 py-0.5 rounded-sm font-bold">POPULAR</span>}
                </div>
                <p className="text-[11.5px] text-mute leading-snug mb-2">{s.d}</p>
                <div className="text-[12px] text-ink"><b className="text-accent">{s.price}</b></div>
                <div className="text-[11.5px] text-mute mt-0.5 mb-1">⏱ {s.time}</div>
                <span className="text-[11.5px] text-brand font-semibold">Calculate freight for this option →</span>
              </Link>
            ))}
          </div>

          {/* Shipping calculator — submits to /info/ddp-calculator which
              renders an actual cost breakdown based on these query params. */}
          <form action="/info/ddp-calculator" method="get" className="border-t border-line pt-4">
            <input type="hidden" name="productId" value={p.id} />
            <input type="hidden" name="mode" value="ddp" />
            <b className="block text-[13px] font-semibold text-ink mb-2.5">⚡ Quick DDP Freight Estimate</b>
            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 max-md:grid-cols-1">
              <select name="port" className="px-3 py-2 border border-line rounded-sm text-[13px] bg-white outline-none focus:border-brand cursor-pointer" defaultValue="haiphong">
                <option value="haiphong">Destination port: Hai Phong</option>
                <option value="catlai">Destination port: Cat Lai (HCMC)</option>
                <option value="danang">Destination port: Da Nang</option>
                <option value="langson">Overland via Lang Son</option>
              </select>
              <input
                name="qty"
                type="number"
                step="0.1"
                min="0"
                placeholder="Quantity (CBM or kg)"
                className="px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
              <input
                name="value"
                type="number"
                step="1"
                min="0"
                placeholder="Order value ($USD)"
                className="px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
              <button type="submit" className="px-5 py-2 bg-brand text-white rounded-sm font-semibold text-[13px] cursor-pointer hover:bg-brand-light">
                Calculate →
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* === FAQ ========================================================== */}
      <section id="faq" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">❓ Frequently Asked Questions</h2>
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
          <span>Products from the Same Factory <span className="text-mute font-normal text-[12.5px]">· {supplier.name}</span></span>
          <Link href={`/supplier/${supplier.slug}`} className="text-brand text-[12.5px] font-semibold cursor-pointer hover:underline">View All →</Link>
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
        <h2 className="text-[16px] font-bold text-ink mb-3">You May Also Like</h2>
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
          aria-label="Favorites"
        >
          ❤
        </Link>
        <Link
          href={`/supplier/${supplier.slug}`}
          className="w-11 h-11 border border-line rounded-sm flex items-center justify-center text-[18px] cursor-pointer"
          aria-label="Contact supplier"
        >
          💬
        </Link>
        <Link
          href={`/buying-request?productId=${p.id}&intent=sample`}
          className="flex-1 h-11 bg-brand text-white rounded-sm font-bold text-[13px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          📦 Request Sample
        </Link>
        <Link
          href={`/buying-request?productId=${p.id}&intent=rfq`}
          className="flex-1 h-11 bg-accent text-white rounded-sm font-bold text-[13px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          🚀 Send RFQ
        </Link>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = findProduct(id);
  return {
    title: found ? `${found.product.title} — Huayuesc` : `Product ${id} — Huayuesc`,
    description: found ? `${found.product.title}. ${found.product.seller}. Price from ${found.product.price}${found.product.unit}. ${found.product.moq}. 20-30 day delivery, DDP shipping to Vietnam.` : undefined,
  };
}
