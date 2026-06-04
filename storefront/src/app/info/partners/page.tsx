import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { PARTNERS, partnersByCategory, type PartnerBrand } from "@/data/partners";
import { NAV_CATEGORIES } from "@/data/home";

export const metadata = {
  title: "Partner Factories — Huayuesc 华越供应链",
  description:
    "A list of 24 official partner brands of Huayue Supply Chain in Vietnam — factory-vetted, with preferential distribution catalogs for the Vietnamese market.",
};

/**
 * Partner Factories index page — groups 24 partner brands by the 8 root
 * categories in NAV_CATEGORIES. Each category is a section of brand
 * cards linking to the detail page /info/partners/[slug].
 */
export default function PartnersIndexPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Partner Factories" },
  ];

  const totalSku = PARTNERS.reduce((n, p) => n + p.products.length, 0);

  return (
    <>
      <Breadcrumb trail={trail} />

      <div className="max-w-[1200px] mx-auto px-4 mt-5 max-md:px-3 mb-12">
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="bg-paper border border-line rounded-lg p-7 mb-7 max-md:p-5">
          <h1 className="text-[26px] font-bold text-brand mb-3 max-md:text-[22px]">
            Huayue's Official Partner Factories
          </h1>
          <p className="text-[14.5px] text-ink leading-relaxed max-w-[900px]">
            Huayue 华越供应链 has vetted factories in person and signed distribution
            agreements with <b>{PARTNERS.length} leading brands</b> from China and
            Vietnam, covering <b>{NAV_CATEGORIES.length} main product industries</b>
            across the building-materials &amp; furniture supply chain.
            The partner catalog holds <b>{totalSku}+ SKUs</b> ready for a DDP quote to
            a Hanoi / Ho Chi Minh City warehouse.
          </p>

          <div className="grid grid-cols-4 gap-4 mt-6 max-md:grid-cols-2 max-md:gap-3">
            <div className="bg-bg rounded p-4 text-center">
              <div className="text-[24px] font-bold text-brand">{PARTNERS.length}</div>
              <div className="text-[12px] text-mute">Partner brands</div>
            </div>
            <div className="bg-bg rounded p-4 text-center">
              <div className="text-[24px] font-bold text-brand">{NAV_CATEGORIES.length}</div>
              <div className="text-[12px] text-mute">Product industries covered</div>
            </div>
            <div className="bg-bg rounded p-4 text-center">
              <div className="text-[24px] font-bold text-brand">{totalSku}+</div>
              <div className="text-[12px] text-mute">SKUs in the catalog</div>
            </div>
            <div className="bg-bg rounded p-4 text-center">
              <div className="text-[24px] font-bold text-brand">100%</div>
              <div className="text-[12px] text-mute">Factories audited</div>
            </div>
          </div>
        </section>

        {/* ── Sections by the 8 root categories ────────────────────────── */}
        {NAV_CATEGORIES.map((cat) => {
          const partners = partnersByCategory(
            cat.slug as PartnerBrand["category"]
          );
          if (partners.length === 0) return null;
          return (
            <CategorySection
              key={cat.slug}
              icon={cat.icon}
              name={cat.name}
              partners={partners}
            />
          );
        })}

        {/* ── Industries without a partner yet ─────────────────────────────────── */}
        {(() => {
          const emptyCats = NAV_CATEGORIES.filter(
            (c) => partnersByCategory(c.slug as PartnerBrand["category"]).length === 0
          );
          if (emptyCats.length === 0) return null;
          return (
            <section className="bg-[#FFFBEB] border-l-4 border-gold rounded-r p-5 mt-6">
              <h3 className="text-[14px] font-bold text-[#92400E] mb-2">
                Expanding industries — new partners welcome
              </h3>
              <p className="text-[12.5px] text-ink leading-relaxed mb-3">
                Huayue is actively expanding its partner portfolio in the industries below.
                If your factory supplies products in these groups and is interested
                in the Vietnamese market, please contact{" "}
                <a
                  href="mailto:partnership@huayuesc.vn"
                  className="text-brand font-semibold hover:underline"
                >
                  partnership@huayuesc.vn
                </a>
                .
              </p>
              <div className="flex flex-wrap gap-2">
                {emptyCats.map((c) => (
                  <span
                    key={c.slug}
                    className="inline-flex items-center gap-1.5 bg-paper border border-line rounded-full px-3 py-1 text-[12px] text-ink"
                  >
                    <span>{c.icon}</span>
                    <span>{c.name}</span>
                  </span>
                ))}
              </div>
            </section>
          );
        })()}

        {/* ── End-of-page CTA ───────────────────────────────────────── */}
        <section className="mt-8 bg-brand text-white rounded-lg p-7 text-center max-md:p-5">
          <h2 className="text-[20px] font-bold mb-2">
            Interested in a detailed catalog or becoming a partner?
          </h2>
          <p className="text-[13.5px] opacity-90 mb-5">
            Our sourcing team in Guangzhou is ready to send a DDP quote to Vietnam
            within 24h.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/buying-request"
              className="inline-flex items-center justify-center gap-2 bg-gold text-brand-dark font-bold rounded px-6 py-3 hover:bg-white hover:text-brand transition-colors"
            >
              📩 Send a Quote Request
            </Link>
            <Link
              href="/info/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold rounded px-6 py-3 hover:bg-white/10 transition-colors"
            >
              ☎ Contact Us Directly
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────── */

function CategorySection({
  icon,
  name,
  partners,
}: {
  icon: string;
  name: string;
  partners: PartnerBrand[];
}) {
  return (
    <section className="mb-8">
      <h2 className="text-[18px] font-bold text-ink mb-4 pb-2.5 border-b-2 border-brand flex items-center gap-2.5 max-md:text-[16px]">
        <span className="text-[22px]">{icon}</span>
        <span>{name}</span>
        <span className="ml-auto text-[12.5px] text-mute font-normal">
          {partners.length} brands
        </span>
      </h2>
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        {partners.map((p) => (
          <PartnerCard key={p.slug} partner={p} />
        ))}
      </div>
    </section>
  );
}

function PartnerCard({ partner }: { partner: PartnerBrand }) {
  return (
    <Link
      href={`/info/partners/${partner.slug}`}
      className="block bg-paper border border-line rounded-lg overflow-hidden hover:border-brand hover:shadow-md transition group"
    >
      <div className="p-4 flex items-start gap-4">
        {/* Logo */}
        <div className={`w-[88px] h-[88px] flex-shrink-0 rounded border flex items-center justify-center overflow-hidden ${partner.logoBg === "dark" ? "bg-brand-dark border-brand-dark" : "bg-bg border-line"}`}>
          {partner.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-w-full max-h-full object-contain p-1.5"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="text-[32px]">🏭</span>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[15.5px] font-bold text-ink group-hover:text-brand mb-1 leading-tight">
            {partner.name}
          </h3>
          <p className="text-[11.5px] text-mute2 mb-2">
            {partner.nameOriginal}
          </p>
          <p className="text-[12.5px] text-ink/85 leading-snug line-clamp-2 mb-2">
            {partner.introduction.split(".")[0]}.
          </p>
          <div className="flex items-center gap-3 text-[11px] text-mute mt-2 flex-wrap">
            <span className="inline-flex items-center gap-1">
              📍 <span className="truncate max-w-[200px]">{partner.factory.location.split(",")[0]}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              📦 {partner.products.length} SKU
            </span>
            {partner.founded && (
              <span className="inline-flex items-center gap-1">
                🗓 Since {partner.founded}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-2 bg-bg border-t border-line flex justify-between items-center text-[12px]">
        <span className="text-mute">
          {partner.listed ? `Listed ${partner.listed}` : "Vetted partner"}
        </span>
        <span className="text-brand font-semibold group-hover:underline">
          View Details →
        </span>
      </div>
    </Link>
  );
}
