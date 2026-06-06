import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { QtyStepper } from "@/components/products/qty-stepper";
import { SECTIONS, FACTORIES, NAV_CATEGORIES } from "@/data/home";
import type { Product } from "@/data/home";
import { getLeafCategory } from "@/data/products";
import type { ListingProduct } from "@/data/products";
import { getT } from "@/lib/t";
import { getTd } from "@/lib/td";

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
  { name: "Tran Minh Huy", company: "product_id.review_company_1", rating: 5, date: "2026-04-12", text: "product_id.review_text_1", helpful: 18 },
  { name: "Pham Quoc Anh", company: "product_id.review_company_2", rating: 5, date: "2026-03-28", text: "product_id.review_text_2", helpful: 14 },
  { name: "Nguyen Thu Hang", company: "product_id.review_company_3", rating: 4, date: "2026-03-15", text: "product_id.review_text_3", helpful: 9 },
  { name: "Le Van Duc", company: "product_id.review_company_4", rating: 5, date: "2026-02-22", text: "product_id.review_text_4", helpful: 12 },
];

const RATING_BREAKDOWN = [
  { label: "product_id.rating_product_quality", score: 4.9 },
  { label: "product_id.rating_supplier_comm", score: 4.8 },
  { label: "product_id.rating_packaging", score: 4.7 },
  { label: "product_id.rating_ontime", score: 4.9 },
];

/* --- Trade certificates (placeholders) --------------------------------- */

const CERTIFICATES = [
  { code: "ISO 9001:2015", desc: "product_id.cert_iso9001_desc" },
  { code: "CE", desc: "product_id.cert_ce_desc" },
  { code: "RoHS", desc: "product_id.cert_rohs_desc" },
  { code: "FSC", desc: "product_id.cert_fsc_desc" },
  { code: "BSCI", desc: "product_id.cert_bsci_desc" },
  { code: "ISO 14001", desc: "product_id.cert_iso14001_desc" },
];

/* --- FAQ --------------------------------------------------------------- */

const FAQS = [
  {
    q: "product_id.faq_q1",
    a: "product_id.faq_a1",
  },
  {
    q: "product_id.faq_q2",
    a: "product_id.faq_a2",
  },
  {
    q: "product_id.faq_q3",
    a: "product_id.faq_a3",
  },
  {
    q: "product_id.faq_q4",
    a: "product_id.faq_a4",
  },
  {
    q: "product_id.faq_q5",
    a: "product_id.faq_a5",
  },
];

/* ====================================================================== */

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getT();
  const td = await getTd();
  const found = findProduct(id);

  if (!found) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-16">
        <Breadcrumb trail={[{ label: t("product_id.breadcrumb_home"), href: "/" }, { label: t("product_id.breadcrumb_products"), href: "/products" }, { label: id }]} />
        <div className="bg-paper border border-line rounded p-12 mt-6 text-center">
          <div className="text-[48px] mb-3">📦</div>
          <h1 className="text-[24px] font-bold text-ink mb-2">{t("product_id.not_found_title")}</h1>
          <p className="text-[13px] text-mute mb-5">{t("product_id.not_found_code_prefix")} <b>{id}</b> {t("product_id.not_found_code_suffix")}</p>
          <Link href="/products" className="inline-block px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] hover:bg-brand-light cursor-pointer">
            {t("product_id.view_all_products")}
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
        { label: t("product_id.breadcrumb_home"), href: "/" },
        { label: t("product_id.breadcrumb_products"), href: "/products" },
        { label: td(section.title), href: `/category/${section.categorySlug}` },
        { label: td(p.title) },
      ]
    : [
        { label: t("product_id.breadcrumb_home"), href: "/" },
        { label: t("product_id.breadcrumb_products"), href: "/products" },
        ...(parentName && parentSlug ? [{ label: td(parentName), href: `/category/${parentSlug}` }] : []),
        ...(l2Name ? [{ label: td(l2Name) }] : []),
        ...(leafTitle && leafSlug && parentSlug ? [{ label: td(leafTitle), href: `/category/${parentSlug}/${leafSlug}` }] : []),
        { label: td(p.title) },
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
                    src={`/img/${p.id}-${i}.jpg?v=6`}
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
                      : `/img/${p.id}-${i}.jpg?v=6`
                  }
                  alt={td(p.title)}
                  className={`ig-img ig-img-${i} absolute inset-0 w-full h-full object-cover`}
                />
              ))}
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] px-2.5 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition pointer-events-none">
                {t("product_id.gallery_hint")}
              </div>
              {p.badges && p.badges.length > 0 && (
                <div className="absolute top-3 left-3 flex gap-1 flex-wrap z-10">
                  {p.badges.includes("top") && <span className="bg-gold text-brand-dark text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">{t("product_id.badge_hot")}</span>}
                  {p.badges.includes("new") && <span className="bg-success text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">NEW</span>}
                  {p.badges.includes("deal") && <span className="bg-accent text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">-25%</span>}
                </div>
              )}
            </div>
          </div>

          {/* Title + meta */}
          <h1 className="text-[22px] font-bold text-ink mt-5 leading-tight max-md:text-[18px]">{td(p.title)}</h1>
          <div className="flex items-center gap-3 mt-2 text-[12.5px] text-mute flex-wrap">
            <span className="flex items-center gap-1"><span className="text-gold">★</span> <b className="text-ink">{p.rating}</b> <span>({REVIEWS.length * 31} {t("product_id.reviews_count_suffix")})</span></span>
            <span>·</span>
            <span>{t("product_id.orders_completed")}</span>
            <span>·</span>
            <span className="text-success font-semibold">{t("product_id.in_stock")}</span>
            <span>·</span>
            <span>{t("product_id.sku_prefix")} {p.id.toUpperCase()}</span>
          </div>

          {/* Tier price table */}
          <div className="mt-5 border border-line rounded">
            <div className="bg-[#FAFBFC] px-4 py-2.5 border-b border-line text-[13px] font-semibold text-ink flex justify-between items-center">
              <span>{t("product_id.price_by_moq")} <span className="text-mute font-normal">{t("product_id.fob_china")}</span></span>
              <span className="text-[11.5px] text-success font-medium">{t("product_id.delivery_20_30")}</span>
            </div>
            <table className="w-full text-[13px]">
              <thead className="bg-[#F5F7FA]">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-mute">{t("product_id.col_quantity")}</th>
                  <th className="text-left px-4 py-2 font-medium text-mute">{t("product_id.col_price_unit")}</th>
                  <th className="text-left px-4 py-2 font-medium text-mute">{t("product_id.col_savings")}</th>
                  <th className="text-right px-4 py-2 font-medium text-mute">{t("product_id.col_action")}</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier) => (
                  <tr key={tier.range} className="border-t border-line hover:bg-[#FAFBFC]">
                    <td className="px-4 py-2 text-ink">{tier.range} {p.unit}</td>
                    <td className="px-4 py-2 text-accent font-bold">${tier.price}{p.unit}</td>
                    <td className="px-4 py-2 text-success">{tier.discount === 0 ? t("product_id.base_price") : `-${tier.discount}%`}</td>
                    <td className="px-4 py-2 text-right">
                      <Link
                        href={`/buying-request?productId=${p.id}&qty=${encodeURIComponent(tier.range)}&tier=${tier.discount}`}
                        className="text-brand text-[12px] font-semibold cursor-pointer hover:underline"
                      >
                        {t("product_id.get_quote")}
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
                  {t("product_id.color_label")} <span className="text-mute2 font-normal">{t("product_id.color_options")}</span>
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { code: "#F5F1E8", label: "product_id.color_marble_white" },
                    { code: "#3D3D3D", label: "product_id.color_dark_gray" },
                    { code: "#E1C699", label: "product_id.color_golden_beige" },
                    { code: "#5C4033", label: "product_id.color_walnut_brown" },
                  ].map((c, i) => (
                    <span key={c.label}>
                      <input
                        type="radio"
                        name="color"
                        value={t(c.label)}
                        id={`cv-${p.id}-${i + 1}`}
                        defaultChecked={i === 0}
                        className={`hidden cv-radio-${i + 1}`}
                      />
                      <label
                        htmlFor={`cv-${p.id}-${i + 1}`}
                        className={`cv-swatch cv-swatch-${i + 1} w-9 h-9 rounded-sm cursor-pointer hover:opacity-90 inline-block`}
                        style={{ backgroundColor: c.code }}
                        title={t(c.label)}
                        aria-label={t(c.label)}
                      />
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor={`size-${p.id}`} className="block text-[12px] font-semibold text-ink mb-1.5">{t("product_id.size_label")}</label>
                <select
                  id={`size-${p.id}`}
                  name="size"
                  className="w-full px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand bg-white cursor-pointer"
                  defaultValue="Standard"
                >
                  <option>{t("product_id.size_standard")}</option>
                  <option>{t("product_id.size_custom")}</option>
                  <option>{t("product_id.size_scale")}</option>
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
                {t("product_id.contact_now")}
              </button>
              <button
                type="submit"
                name="intent"
                value="sample"
                formAction="/buying-request"
                className="px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] hover:bg-brand-light cursor-pointer inline-flex items-center gap-1.5"
              >
                {t("product_id.request_sample")}
              </button>
              <Link
                href={`/buyer-center/favorites?add=${p.id}`}
                className="px-4 py-2.5 border border-line rounded-sm text-[13px] text-ink hover:border-accent hover:text-accent cursor-pointer inline-flex items-center"
                aria-label={t("product_id.add_to_favorites")}
                title={t("product_id.add_to_favorites")}
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
            <div className="text-[11px] uppercase tracking-wider text-mute font-bold mb-2.5">{t("product_id.quick_info")}</div>
            <ul className="space-y-2 text-[12.5px]">
              <li className="flex justify-between">
                <span className="text-mute">{t("product_id.qi_moq")}</span>
                <b className="text-ink">{p.moq.replace("MOQ:", "").trim()}</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">{t("product_id.qi_delivery_time")}</span>
                <b className="text-ink">{t("product_id.qi_delivery_value")}</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">{t("product_id.qi_port")}</span>
                <b className="text-ink">{t("product_id.qi_port_value")}</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">{t("product_id.qi_payment")}</span>
                <b className="text-ink">T/T 30% + 70%</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">{t("product_id.qi_oem")}</span>
                <b className="text-success">{t("product_id.qi_supported")}</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">{t("product_id.qi_samples")}</span>
                <b className="text-ink">{t("product_id.qi_samples_value")}</b>
              </li>
            </ul>
          </div>

          {/* Supplier card */}
          <div className="bg-paper border border-line rounded p-4">
            <div className="text-[11px] uppercase tracking-wider text-mute font-bold mb-2.5">{t("product_id.supplier_label")}</div>
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
              {supplier.badges.gold && <span className="bg-gold text-brand-dark text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">{t("product_id.badge_gold")}</span>}
              {supplier.badges.audited && <span className="bg-success text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">{t("product_id.badge_audited")}</span>}
              <span className="bg-brand text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">{td(supplier.badges.years)}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] mb-3">
              <div className="border border-line rounded-sm p-1.5">
                <b className="block text-[14px] text-accent">★ {supplier.rating}</b>
                <small className="text-mute">{supplier.reviews}</small>
              </div>
              <div className="border border-line rounded-sm p-1.5">
                <b className="block text-[14px] text-brand">340</b>
                <small className="text-mute">{t("product_id.orders_per_yr")}</small>
              </div>
              <div className="border border-line rounded-sm p-1.5">
                <b className="block text-[14px] text-brand">98%</b>
                <small className="text-mute">{t("product_id.on_time_label")}</small>
              </div>
            </div>
            <Link
              href={`/supplier/${supplier.slug}`}
              className="block w-full text-center py-2 bg-brand text-white rounded-sm font-semibold text-[12.5px] hover:bg-brand-light cursor-pointer"
            >
              {t("product_id.view_factory")}
            </Link>
          </div>

          {/* Inline RFQ form — submits with full product + supplier context */}
          <form action="/buying-request" method="get" className="bg-paper border-2 border-accent rounded p-4">
            <input type="hidden" name="productId" value={p.id} />
            <input type="hidden" name="supplier" value={p.seller} />
            <input type="hidden" name="intent" value="rfq" />
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[18px]">📋</span>
              <b className="text-[13px] font-bold text-ink">{t("product_id.send_rfq")}</b>
            </div>
            <p className="text-[11.5px] text-mute mb-2.5 leading-snug">
              {t("product_id.rfq_desc")}
            </p>
            <input
              name="q"
              defaultValue={td(p.title)}
              className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand"
            />
            <input
              name="qty"
              placeholder={`Quantity + unit (e.g. 500${p.unit})`}
              className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand"
            />
            <textarea
              name="desc"
              placeholder={t("product_id.rfq_desc_placeholder")}
              rows={3}
              className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand resize-none"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-accent text-white rounded-sm font-bold text-[12.5px] cursor-pointer hover:opacity-90"
            >
              {t("product_id.send_rfq_now")}
            </button>
          </form>

          {/* Trust pillars */}
          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-semibold text-ink mb-2.5">{t("product_id.protection_title")}</b>
            <ul className="text-[12px] text-mute space-y-1.5">
              <li className="flex gap-2"><span className="text-success">✓</span> {t("product_id.protection_refund")}</li>
              <li className="flex gap-2"><span className="text-success">✓</span> {t("product_id.protection_audit")}</li>
              <li className="flex gap-2"><span className="text-success">✓</span> {t("product_id.protection_dispute")}</li>
              <li className="flex gap-2"><span className="text-success">✓</span> {t("product_id.protection_ddp")}</li>
              <li className="flex gap-2"><span className="text-success">✓</span> {t("product_id.protection_escrow")}</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* === STICKY TAB NAVIGATION ======================================== */}
      <nav className="sticky top-[3.4rem] z-30 bg-paper border-y border-line mt-7 max-md:top-0">
        <div className="max-w-[1400px] mx-auto px-4 flex gap-0 overflow-x-auto text-[13.5px] font-semibold">
          {[
            { href: "#mo-ta", label: t("product_id.tab_description") },
            { href: "#thong-so", label: t("product_id.tab_specifications") },
            { href: "#trade-assurance", label: t("product_id.tab_trade_assurance") },
            { href: "#danh-gia", label: `${t("product_id.tab_reviews")} (${REVIEWS.length * 31})` },
            { href: "#van-chuyen", label: t("product_id.tab_shipping") },
            { href: "#faq", label: t("product_id.tab_faq") },
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
          <h2 className="text-[18px] font-bold text-ink mb-4">{t("product_id.product_description")}</h2>
          <p className="text-[13px] text-ink leading-relaxed mb-4">
            <b>{td(p.title)}</b> {t("product_id.desc_p1_a")} <Link href={`/supplier/${supplier.slug}`} className="text-brand hover:underline cursor-pointer">{p.seller}</Link>, {t("product_id.desc_p1_b")} <b>{td(p.years)} {t("product_id.desc_p1_exp")}</b>{t("product_id.desc_p1_c")}
          </p>
          <img src={`/img/${p.id}-desc1.jpg?v=6`} alt="" className="w-full rounded mb-4" loading="lazy" />
          <p className="text-[13px] text-ink leading-relaxed mb-4">
            {t("product_id.desc_p2_a")} <b>ISO 9001:2015</b>{t("product_id.desc_p2_b")} <b>{t("product_id.desc_p2_oem")}</b> {t("product_id.desc_p2_c")}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4 max-md:grid-cols-1">
            <img src={`/img/${p.id}-desc2.jpg?v=6`} alt="" className="w-full rounded" loading="lazy" />
            <img src={`/img/${p.id}-desc3.jpg?v=6`} alt="" className="w-full rounded" loading="lazy" />
          </div>
          <p className="text-[13px] text-ink leading-relaxed">
            <b>{t("product_id.desc_p3_a")}</b> {t("product_id.desc_p3_b")}
          </p>
        </div>
      </section>

      {/* === SPECS ======================================================== */}
      <section id="thong-so" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">{t("product_id.specifications_title")}</h2>
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
            {t("product_id.trade_assurance_title")}
          </h2>
          <p className="text-[13px] text-mute mb-4 leading-relaxed">
            {t("product_id.trade_assurance_desc")}
          </p>
          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {[
              { icon: "🔒", t: t("product_id.ta_escrow_t"), d: t("product_id.ta_escrow_d") },
              { icon: "🏭", t: t("product_id.ta_inspection_t"), d: t("product_id.ta_inspection_d") },
              { icon: "⚖", t: t("product_id.ta_dispute_t"), d: t("product_id.ta_dispute_d") },
            ].map((x, xi) => (
              <div key={xi} className="bg-[#FFF7E6] border border-gold/40 rounded p-3.5">
                <div className="text-[24px] mb-1">{x.icon}</div>
                <b className="block text-[13px] text-ink mb-0.5">{x.t}</b>
                <p className="text-[11.5px] text-mute leading-snug">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-line pt-4">
            <b className="block text-[13px] font-semibold text-ink mb-3">{t("product_id.supplier_certifications")}</b>
            <div className="grid grid-cols-6 gap-2 max-md:grid-cols-3">
              {CERTIFICATES.map((c) => (
                <Link
                  key={c.code}
                  href={`/info/cert-${c.code.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="border border-line rounded p-2.5 text-center hover:border-brand hover:bg-bg cursor-pointer block"
                >
                  <b className="block text-[12px] text-brand">{c.code}</b>
                  <small className="text-[10.5px] text-mute leading-tight">{t(c.desc)}</small>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === REVIEWS ====================================================== */}
      <section id="danh-gia" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">{t("product_id.buyer_reviews")}</h2>
          <div className="grid grid-cols-[280px_1fr] gap-6 mb-5 max-md:grid-cols-1 max-md:gap-4">
            {/* Left: overall rating */}
            <div className="text-center border-r border-line pr-6 max-md:border-r-0 max-md:border-b max-md:pr-0 max-md:pb-4">
              <div className="text-[44px] font-extrabold text-accent leading-none">{overallRating}</div>
              <div className="text-gold text-[18px] my-1">★★★★★</div>
              <small className="text-[11.5px] text-mute">{t("product_id.based_on_prefix")} {REVIEWS.length * 31} {t("product_id.based_on_suffix")}</small>
            </div>
            {/* Right: breakdown bars */}
            <div className="space-y-2">
              {RATING_BREAKDOWN.map((r) => {
                const pct = (r.score / 5) * 100;
                return (
                  <div key={r.label} className="grid grid-cols-[160px_1fr_40px] gap-3 items-center text-[12px] max-md:grid-cols-[110px_1fr_36px]">
                    <span className="text-ink">{t(r.label)}</span>
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
                    <small className="text-[11px] text-mute">{t(r.company)}</small>
                  </div>
                  <div className="text-right">
                    <div className="text-gold text-[12px]">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                    <small className="text-[10.5px] text-mute2">{r.date}</small>
                  </div>
                </div>
                <p className="text-[12.5px] text-ink leading-relaxed mb-2">{t(r.text)}</p>
                <div className="text-[11px] text-mute flex items-center gap-3 pt-2 border-t border-line">
                  <Link
                    href={`/login?next=${encodeURIComponent(`/product/${p.id}/reviews`)}`}
                    className="hover:text-brand cursor-pointer"
                  >
                    {t("product_id.review_helpful")} ({r.helpful})
                  </Link>
                  <Link
                    href={`/login?next=${encodeURIComponent(`/product/${p.id}/reviews`)}`}
                    className="hover:text-brand cursor-pointer"
                  >
                    {t("product_id.review_reply")}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link href={`/product/${p.id}/reviews`} className="text-brand text-[13px] font-semibold cursor-pointer hover:underline">
              {t("product_id.view_all_prefix")} {REVIEWS.length * 31} {t("product_id.view_all_reviews_suffix")}
            </Link>
          </div>
        </div>
      </section>

      {/* === SHIPPING ===================================================== */}
      <section id="van-chuyen" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">{t("product_id.shipping_title")}</h2>
          <div className="grid grid-cols-3 gap-4 mb-5 max-md:grid-cols-1">
            {[
              { t: t("product_id.ship_fob_t"), d: t("product_id.ship_fob_d"), price: t("product_id.ship_fob_price"), time: t("product_id.ship_fob_time"), mode: "fob" },
              { t: t("product_id.ship_cif_t"), d: t("product_id.ship_cif_d"), price: "+ $200-400/CBM", time: t("product_id.ship_cif_time"), mode: "cif" },
              { t: t("product_id.ship_ddp_t"), d: t("product_id.ship_ddp_d"), price: "+ $400-700/CBM", time: t("product_id.ship_ddp_time"), mode: "ddp" },
            ].map((s, i) => (
              <Link
                key={s.t}
                href={`/info/ddp-calculator?mode=${s.mode}&productId=${p.id}`}
                className={`border-2 rounded p-3.5 cursor-pointer hover:shadow-sm transition block ${i === 2 ? "border-brand bg-brand/5 hover:bg-brand/10" : "border-line hover:border-brand"}`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <b className="text-[14px] text-ink">{s.t}</b>
                  {i === 2 && <span className="bg-brand text-white text-[9.5px] px-1.5 py-0.5 rounded-sm font-bold">{t("product_id.ship_popular")}</span>}
                </div>
                <p className="text-[11.5px] text-mute leading-snug mb-2">{s.d}</p>
                <div className="text-[12px] text-ink"><b className="text-accent">{s.price}</b></div>
                <div className="text-[11.5px] text-mute mt-0.5 mb-1">⏱ {s.time}</div>
                <span className="text-[11.5px] text-brand font-semibold">{t("product_id.ship_calculate_option")}</span>
              </Link>
            ))}
          </div>

          {/* Shipping calculator — submits to /info/ddp-calculator which
              renders an actual cost breakdown based on these query params. */}
          <form action="/info/ddp-calculator" method="get" className="border-t border-line pt-4">
            <input type="hidden" name="productId" value={p.id} />
            <input type="hidden" name="mode" value="ddp" />
            <b className="block text-[13px] font-semibold text-ink mb-2.5">{t("product_id.quick_ddp_estimate")}</b>
            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 max-md:grid-cols-1">
              <select name="port" className="px-3 py-2 border border-line rounded-sm text-[13px] bg-white outline-none focus:border-brand cursor-pointer" defaultValue="haiphong">
                <option value="haiphong">{t("product_id.port_haiphong")}</option>
                <option value="catlai">{t("product_id.port_catlai")}</option>
                <option value="danang">{t("product_id.port_danang")}</option>
                <option value="langson">{t("product_id.port_langson")}</option>
              </select>
              <input
                name="qty"
                type="number"
                step="0.1"
                min="0"
                placeholder={t("product_id.ddp_qty_placeholder")}
                className="px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
              <input
                name="value"
                type="number"
                step="1"
                min="0"
                placeholder={t("product_id.ddp_value_placeholder")}
                className="px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
              <button type="submit" className="px-5 py-2 bg-brand text-white rounded-sm font-semibold text-[13px] cursor-pointer hover:bg-brand-light">
                {t("product_id.calculate")}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* === FAQ ========================================================== */}
      <section id="faq" className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-32">
        <div className="bg-paper border border-line rounded p-5 max-md:p-3">
          <h2 className="text-[18px] font-bold text-ink mb-4">{t("product_id.faq_title")}</h2>
          <div className="space-y-2">
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                {...(i === 0 ? { open: true } : {})}
                className="border border-line rounded group/faq"
              >
                <summary className="px-4 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden flex justify-between items-center hover:bg-[#FAFBFC]">
                  <b className="text-[13px] text-ink leading-snug">{t(f.q)}</b>
                  <span className="text-mute2 text-[14px] group-open/faq:rotate-180 transition-transform flex-shrink-0 ml-3">▾</span>
                </summary>
                <p className="px-4 pb-3 text-[12.5px] text-mute leading-relaxed border-t border-line pt-3">{t(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* === SAME FACTORY RAIL ============================================ */}
      <section className="max-w-[1400px] mx-auto px-4 mt-7">
        <h2 className="text-[16px] font-bold text-ink mb-3 flex items-center justify-between">
          <span>{t("product_id.same_factory_prefix")} <span className="text-mute font-normal text-[12.5px]">· {supplier.name}</span></span>
          <Link href={`/supplier/${supplier.slug}`} className="text-brand text-[12.5px] font-semibold cursor-pointer hover:underline">{t("product_id.view_all_arrow")}</Link>
        </h2>
        <div className="grid grid-cols-6 gap-3 max-md:grid-cols-2">
          {sameSection.map((x) => (
            <Link key={x.id} href={`/product/${x.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand hover:shadow-sm block cursor-pointer">
              <div className="aspect-square bg-[#F5F5F5]">
                {x.image ? <img src={x.image} alt={td(x.title)} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="p-2.5">
                <h4 className="text-[12px] text-ink line-clamp-2 mb-1 leading-snug min-h-[32px]">{td(x.title)}</h4>
                <div className="text-accent font-bold text-[13.5px]">{td(x.price)}<small className="text-mute font-normal text-[11px]">{x.unit}</small></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* === RECOMMENDED RAIL ============================================= */}
      <section className="max-w-[1400px] mx-auto px-4 mt-7 mb-7 max-md:mb-24">
        <h2 className="text-[16px] font-bold text-ink mb-3">{t("product_id.you_may_also_like")}</h2>
        <div className="grid grid-cols-6 gap-3 max-md:grid-cols-2">
          {otherSection.map((x) => (
            <Link key={x.id} href={`/product/${x.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand hover:shadow-sm block cursor-pointer">
              <div className="aspect-square bg-[#F5F5F5]">
                {x.image ? <img src={x.image} alt={td(x.title)} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="p-2.5">
                <h4 className="text-[12px] text-ink line-clamp-2 mb-1 leading-snug min-h-[32px]">{td(x.title)}</h4>
                <div className="text-accent font-bold text-[13.5px]">{td(x.price)}<small className="text-mute font-normal text-[11px]">{x.unit}</small></div>
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
          aria-label={t("product_id.fav_aria")}
        >
          ❤
        </Link>
        <Link
          href={`/supplier/${supplier.slug}`}
          className="w-11 h-11 border border-line rounded-sm flex items-center justify-center text-[18px] cursor-pointer"
          aria-label={t("product_id.contact_supplier_aria")}
        >
          💬
        </Link>
        <Link
          href={`/buying-request?productId=${p.id}&intent=sample`}
          className="flex-1 h-11 bg-brand text-white rounded-sm font-bold text-[13px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {t("product_id.request_sample")}
        </Link>
        <Link
          href={`/buying-request?productId=${p.id}&intent=rfq`}
          className="flex-1 h-11 bg-accent text-white rounded-sm font-bold text-[13px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {t("product_id.send_rfq")}
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
