import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { PARTNERS, getPartner, productSlug, type PartnerProduct } from "@/data/partners";
import { NAV_CATEGORIES } from "@/data/home";

export function generateStaticParams() {
  return PARTNERS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPartner(slug);
  if (!p) return { title: "Partner — Huayuesc" };
  return {
    title: `${p.name} — Huayuesc Partner Factory 华越供应链`,
    description: p.introduction.slice(0, 160),
  };
}

/**
 * Single-partner detail page — with 5 sections:
 *  1. Brand banner (logo + name + tagline + industry)
 *  2. Company introduction
 *  3. Factory card (location, area, capacity, employees, capital)
 *  4. Highlights (certifications, awards, projects)
 *  5. Product catalog (image grid + SKU + description + RFQ button)
 */
export default async function PartnerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partner = getPartner(slug);
  if (!partner) return notFound();

  const category = NAV_CATEGORIES.find((c) => c.slug === partner.category);
  const trail = [
    { label: "Home", href: "/" },
    { label: "Partner Factories", href: "/info/partners" },
    { label: partner.name },
  ];

  return (
    <>
      <Breadcrumb trail={trail} />

      <div className="max-w-[1200px] mx-auto px-4 mt-5 mb-12 max-md:px-3">
        {/* ── 1. Brand banner ──────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-brand-dark to-brand text-white rounded-lg p-7 mb-6 max-md:p-5 relative overflow-hidden">
          <div className="flex items-center gap-6 max-md:flex-col max-md:items-start max-md:gap-4">
            {/* Logo */}
            <div className={`w-[120px] h-[120px] flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden max-md:w-[88px] max-md:h-[88px] ${partner.logoBg === "dark" ? "bg-brand-dark border border-white/20" : "bg-white"}`}>
              {partner.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain p-2"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-[48px]">🏭</span>
              )}
            </div>

            {/* Title + meta */}
            <div className="flex-1 min-w-0">
              {category && (
                <Link
                  href={`/info/partners#${category.slug}`}
                  className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-[12px] px-3 py-1 rounded-full mb-2 transition-colors"
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
              )}
              <h1 className="text-[28px] font-bold mb-1 leading-tight max-md:text-[22px]">
                {partner.name}
              </h1>
              <p className="text-[14px] opacity-85 mb-3">{partner.nameOriginal}</p>
              <div className="flex flex-wrap gap-3 text-[12.5px]">
                {partner.founded && (
                  <span className="inline-flex items-center gap-1.5 bg-white/15 rounded px-3 py-1">
                    <span>🗓</span>
                    <span>Founded {partner.founded}</span>
                  </span>
                )}
                {partner.listed && (
                  <span className="inline-flex items-center gap-1.5 bg-gold text-brand-dark font-bold rounded px-3 py-1">
                    <span>📈</span>
                    <span>{partner.listed}</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 bg-white/15 rounded px-3 py-1">
                  <span>📦</span>
                  <span>{partner.products.length} SKUs</span>
                </span>
                {partner.hotline && (
                  <span className="inline-flex items-center gap-1.5 bg-accent rounded px-3 py-1 font-bold">
                    <span>☎</span>
                    <span>{partner.hotline}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-[1fr_320px] gap-6 max-md:grid-cols-1 mb-6">
          {/* ── 2. Company introduction ───────────────────────────── */}
          <section className="bg-paper border border-line rounded-lg p-6 max-md:p-4">
            <h2 className="text-[18px] font-bold text-brand mb-3 max-md:text-[16px] flex items-center gap-2">
              <span className="w-1 h-5 bg-brand rounded-sm" />
              Company Introduction
            </h2>
            <p className="text-[14px] text-ink leading-relaxed">
              {partner.introduction}
            </p>

            {partner.highlights.length > 0 && (
              <>
                <h3 className="text-[15px] font-bold text-brand-dark mt-5 mb-2">
                  Highlights
                </h3>
                <ul className="space-y-1.5">
                  {partner.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-[13px] text-ink leading-snug pl-5 relative"
                    >
                      <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-gold rounded-full" />
                      {h}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          {/* ── 3. Factory card ────────────────────────────────── */}
          <aside className="bg-paper border border-line rounded-lg p-5 self-start sticky top-4 max-md:static max-md:p-4">
            <h2 className="text-[15px] font-bold text-brand-dark mb-3 flex items-center gap-2">
              🏭 Factory
            </h2>
            <dl className="space-y-3 text-[13px]">
              <FactoryField label="Location" value={partner.factory.location} />
              {partner.factory.area && (
                <FactoryField label="Area" value={partner.factory.area} />
              )}
              {partner.factory.employees && (
                <FactoryField
                  label="Employees"
                  value={partner.factory.employees}
                />
              )}
              {partner.factory.capacity && (
                <FactoryField
                  label="Capacity / year"
                  value={partner.factory.capacity}
                />
              )}
              {partner.factory.facilities && (
                <FactoryField
                  label="Facilities"
                  value={partner.factory.facilities}
                />
              )}
              {partner.factory.investment && (
                <FactoryField
                  label="Investment"
                  value={partner.factory.investment}
                />
              )}
            </dl>

            <div className="border-t border-line mt-4 pt-4 space-y-2">
              {partner.hotline && (
                <a
                  href={`tel:${partner.hotline.replace(/[^+0-9]/g, "")}`}
                  className="flex items-center gap-2 text-[13px] text-accent font-bold hover:underline"
                >
                  <span>☎</span>
                  <span>{partner.hotline}</span>
                </a>
              )}
              <a
                href={partner.website}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 text-[12.5px] text-brand hover:underline break-all"
              >
                <span>🌐</span>
                <span>Official website ↗</span>
              </a>
            </div>

            <Link
              href="/buying-request"
              className="block w-full mt-4 bg-accent text-white text-center font-bold py-2.5 rounded hover:bg-[#B81827] transition-colors text-[13.5px]"
            >
              📩 Send a Quote
            </Link>
          </aside>
        </div>

        {/* ── 4. Product catalog ──────────────────────────────────── */}
        <section className="bg-paper border border-line rounded-lg p-6 max-md:p-4">
          <h2 className="text-[18px] font-bold text-brand mb-1 max-md:text-[16px] flex items-center gap-2">
            <span className="w-1 h-5 bg-brand rounded-sm" />
            Product Catalog
            <span className="ml-2 text-[12px] text-mute font-normal">
              · {partner.products.length} SKUs
            </span>
          </h2>
          <p className="text-[12.5px] text-mute mb-5">
            Every SKU below has been vetted by Huayue and is available for a DDP
            quote to Vietnam. Click an image to view details, or click Send a Quote
            for a specific item.
          </p>

          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-md:gap-3">
            {partner.products.map((prod) => (
              <ProductCard key={prod.model} product={prod} partnerSlug={partner.slug} />
            ))}
          </div>
        </section>

        {/* ── 5. CTA + other brands in the same industry ──────────────────────── */}
        <RelatedPartnersSection
          currentSlug={partner.slug}
          category={partner.category}
        />
      </div>
    </>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────── */

/**
 * Guesses a fitting emoji for a SKU based on keywords in the product name.
 * Used when product.image is empty — better than the generic 📦 fallback.
 */
function guessIcon(name: string): string {
  const n = name.toLowerCase();
  if (/điều hoà|máy lạnh/.test(n)) return "❄️";
  if (/tủ lạnh|lạnh/.test(n)) return "🧊";
  if (/máy giặt|giặt/.test(n)) return "🧺";
  if (/máy sấy|sấy/.test(n)) return "💨";
  if (/bếp từ|bếp điện|bếp ga|bếp gas/.test(n)) return "♨️";
  if (/hút mùi|hút khói/.test(n)) return "💨";
  if (/lò vi sóng|lò hấp|lò nướng/.test(n)) return "🔥";
  if (/nồi cơm|nồi điện/.test(n)) return "🍚";
  if (/nồi áp suất/.test(n)) return "🍲";
  if (/máy sưởi/.test(n)) return "🔥";
  if (/bình nóng lạnh|nước nóng/.test(n)) return "🚿";
  if (/máy rửa bát|rửa chén/.test(n)) return "🍽️";
  if (/lò vi sóng|vi sóng/.test(n)) return "📡";
  if (/máy lọc|nước|cây nước/.test(n)) return "💧";
  if (/cà phê|coffee/.test(n)) return "☕";
  if (/rượu|wine/.test(n)) return "🍷";
  if (/chậu rửa|sink/.test(n)) return "🧽";
  if (/vòi/.test(n)) return "🚰";
  if (/bồn cầu/.test(n)) return "🚽";
  if (/lavabo|bồn rửa/.test(n)) return "🪣";
  if (/tủ phòng tắm|tủ tắm/.test(n)) return "🪞";
  if (/thang máy|thang cuốn/.test(n)) return "🛗";
  if (/khoá|khóa|lock/.test(n)) return "🔐";
  if (/gateway|wi-?fi/.test(n)) return "📶";
  if (/sơn|coating/.test(n)) return "🎨";
  if (/màng/.test(n)) return "📜";
  if (/bột trét/.test(n)) return "🧱";
  if (/bông khoáng|bông thuỷ|cách nhiệt|cách âm/.test(n)) return "🧊";
  if (/tấm|panel|alc|aac/.test(n)) return "🟦";
  if (/đá|quartz|stone|cẩm thạch/.test(n)) return "⛰️";
  if (/ống|cáp|dây điện/.test(n)) return "🔌";
  if (/máng/.test(n)) return "🛤️";
  if (/đèn|led/.test(n)) return "💡";
  if (/phụ kiện|accessor/.test(n)) return "🔧";
  return "📦";
}

function FactoryField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] text-mute uppercase tracking-wider font-semibold">
        {label}
      </dt>
      <dd className="text-[13px] text-ink leading-snug mt-0.5">{value}</dd>
    </div>
  );
}

function ProductCard({
  product,
  partnerSlug,
}: {
  product: PartnerProduct;
  partnerSlug: string;
}) {
  const detailHref = `/info/partners/${partnerSlug}/${productSlug(product)}`;
  return (
    <div className="group border border-line rounded overflow-hidden hover:border-brand hover:shadow-md transition flex flex-col bg-white">
      {/* Image — links to the detail page */}
      <Link
        href={detailHref}
        className="aspect-square bg-bg overflow-hidden relative block"
      >
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-bg to-[#E0E5EC] text-mute2">
            <span className="text-[44px] opacity-60">{guessIcon(product.name)}</span>
            <span className="text-[10.5px] text-mute font-semibold tracking-wider">
              {product.model}
            </span>
          </div>
        )}
        <span className="absolute top-2 left-2 bg-brand-dark text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wider">
          {product.model}
        </span>
      </Link>

      {/* Body */}
      <div className="p-3 flex-1 flex flex-col">
        <Link href={detailHref} className="block">
          <h3 className="text-[13px] font-bold text-ink group-hover:text-brand line-clamp-2 leading-tight mb-1">
            {product.name}
          </h3>
        </Link>
        {product.desc && (
          <p className="text-[11.5px] text-mute line-clamp-3 leading-snug mb-2 flex-1">
            {product.desc}
          </p>
        )}
        {product.dimensions && (
          <div className="text-[11px] text-mute mb-1.5">📐 {product.dimensions}</div>
        )}
        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <Link
            href={detailHref}
            className="text-[11.5px] text-brand font-semibold hover:underline inline-flex items-center gap-1"
          >
            View Details →
          </Link>
          <Link
            href={`/buying-request?partner=${partnerSlug}&model=${encodeURIComponent(product.model)}`}
            className="text-[11.5px] text-accent font-semibold hover:underline inline-flex items-center gap-1"
          >
            📩 RFQ
          </Link>
        </div>
      </div>
    </div>
  );
}

function RelatedPartnersSection({
  currentSlug,
  category,
}: {
  currentSlug: string;
  category: string;
}) {
  const others = PARTNERS.filter(
    (p) => p.category === category && p.slug !== currentSlug
  );
  if (others.length === 0) return null;
  const cat = NAV_CATEGORIES.find((c) => c.slug === category);

  return (
    <section className="mt-8">
      <h2 className="text-[16px] font-bold text-ink mb-3 flex items-center gap-2">
        <span className="w-1 h-4 bg-brand rounded-sm" />
        Other partners in {cat?.icon} {cat?.name}
      </h2>
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 max-md:gap-3">
        {others.map((p) => (
          <Link
            key={p.slug}
            href={`/info/partners/${p.slug}`}
            className="flex items-center gap-3 bg-paper border border-line rounded-lg p-3 hover:border-brand hover:shadow-sm transition group"
          >
            <div className={`w-[56px] h-[56px] flex-shrink-0 rounded border flex items-center justify-center overflow-hidden ${p.logoBg === "dark" ? "bg-brand-dark border-brand-dark" : "bg-bg border-line"}`}>
              {p.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-w-full max-h-full object-contain p-1"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-[22px]">🏭</span>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-[13.5px] font-bold text-ink group-hover:text-brand leading-tight truncate">
                {p.name}
              </h3>
              <p className="text-[11px] text-mute truncate">
                {p.products.length} SKU · {p.factory.location.split(",")[0]}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
