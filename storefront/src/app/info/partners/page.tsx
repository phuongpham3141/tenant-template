import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { PARTNERS, partnersByCategory, type PartnerBrand } from "@/data/partners";
import { NAV_CATEGORIES } from "@/data/home";
import { getT } from "@/lib/t";

export const metadata = {
  title: "Đối tác sản xuất — Huayuesc",
  description:
    "Danh sách 24 thương hiệu đối tác chính thức của Huayue Chuỗi Cung Ứng tại Việt Nam — đã thẩm định nhà máy, có catalog phân phối ưu đãi cho thị trường Việt.",
};

/**
 * Trang index Đối tác sản xuất — gom 24 brand đối tác theo 8 root
 * category trong NAV_CATEGORIES. Mỗi category là 1 section gồm các
 * card brand link sang trang chi tiết /info/partners/[slug].
 */
export default async function PartnersIndexPage() {
  const t = await getT();
  const trail = [
    { label: t("info_partners.breadcrumb_home"), href: "/" },
    { label: t("info_partners.breadcrumb_self") },
  ];

  const totalSku = PARTNERS.reduce((n, p) => n + p.products.length, 0);

  return (
    <>
      <Breadcrumb trail={trail} />

      <div className="max-w-[1200px] mx-auto px-4 mt-5 max-md:px-3 mb-12">
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="bg-paper border border-line rounded-lg p-7 mb-7 max-md:p-5">
          <h1 className="text-[26px] font-bold text-brand mb-3 max-md:text-[22px]">
            {t("info_partners.hero_title")}
          </h1>
          <p className="text-[14.5px] text-ink leading-relaxed max-w-[900px]">
            {t("info_partners.hero_intro_pre")}<b>{PARTNERS.length}{t("info_partners.hero_brands_unit")}</b>{t("info_partners.hero_intro_mid1")}<b>{NAV_CATEGORIES.length}{t("info_partners.hero_industries_unit")}</b>{t("info_partners.hero_intro_mid2")}<b>{totalSku}{t("info_partners.hero_sku_unit")}</b>{t("info_partners.hero_intro_post")}
          </p>

          <div className="grid grid-cols-4 gap-4 mt-6 max-md:grid-cols-2 max-md:gap-3">
            <div className="bg-bg rounded p-4 text-center">
              <div className="text-[24px] font-bold text-brand">{PARTNERS.length}</div>
              <div className="text-[12px] text-mute">{t("info_partners.stat_brands")}</div>
            </div>
            <div className="bg-bg rounded p-4 text-center">
              <div className="text-[24px] font-bold text-brand">{NAV_CATEGORIES.length}</div>
              <div className="text-[12px] text-mute">{t("info_partners.stat_industries")}</div>
            </div>
            <div className="bg-bg rounded p-4 text-center">
              <div className="text-[24px] font-bold text-brand">{totalSku}+</div>
              <div className="text-[12px] text-mute">{t("info_partners.stat_sku")}</div>
            </div>
            <div className="bg-bg rounded p-4 text-center">
              <div className="text-[24px] font-bold text-brand">100%</div>
              <div className="text-[12px] text-mute">{t("info_partners.stat_audited")}</div>
            </div>
          </div>
        </section>

        {/* ── Sections theo 8 root category ────────────────────────── */}
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

        {/* ── Ngành chưa có đối tác ─────────────────────────────────── */}
        {(() => {
          const emptyCats = NAV_CATEGORIES.filter(
            (c) => partnersByCategory(c.slug as PartnerBrand["category"]).length === 0
          );
          if (emptyCats.length === 0) return null;
          return (
            <section className="bg-[#FFFBEB] border-l-4 border-gold rounded-r p-5 mt-6">
              <h3 className="text-[14px] font-bold text-[#92400E] mb-2">
                {t("info_partners.empty_title")}
              </h3>
              <p className="text-[12.5px] text-ink leading-relaxed mb-3">
                {t("info_partners.empty_desc_pre")}{" "}
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

        {/* ── CTA cuối trang ───────────────────────────────────────── */}
        <section className="mt-8 bg-brand text-white rounded-lg p-7 text-center max-md:p-5">
          <h2 className="text-[20px] font-bold mb-2">
            {t("info_partners.cta_title")}
          </h2>
          <p className="text-[13.5px] opacity-90 mb-5">
            {t("info_partners.cta_desc")}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/buying-request"
              className="inline-flex items-center justify-center gap-2 bg-gold text-brand-dark font-bold rounded px-6 py-3 hover:bg-white hover:text-brand transition-colors"
            >
              📩 {t("info_partners.cta_quote_btn")}
            </Link>
            <Link
              href="/info/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold rounded px-6 py-3 hover:bg-white/10 transition-colors"
            >
              ☎ {t("info_partners.cta_contact_btn")}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────── */

async function CategorySection({
  icon,
  name,
  partners,
}: {
  icon: string;
  name: string;
  partners: PartnerBrand[];
}) {
  const t = await getT();
  return (
    <section className="mb-8">
      <h2 className="text-[18px] font-bold text-ink mb-4 pb-2.5 border-b-2 border-brand flex items-center gap-2.5 max-md:text-[16px]">
        <span className="text-[22px]">{icon}</span>
        <span>{name}</span>
        <span className="ml-auto text-[12.5px] text-mute font-normal">
          {partners.length} {t("info_partners.section_brands_unit")}
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

async function PartnerCard({ partner }: { partner: PartnerBrand }) {
  const t = await getT();
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
          <h3 className="text-[15.5px] font-bold text-ink group-hover:text-brand mb-1.5 leading-tight">
            {partner.name}
          </h3>
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#A5F3FC] to-[#38BDF8] text-brand-dark text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider mb-2">
            💎 {t("info_partners.badge_diamond")}
          </span>
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
                🗓 {t("info_partners.card_since")} {partner.founded}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-2 bg-bg border-t border-line flex justify-between items-center text-[12px]">
        <span className="text-mute">
          {partner.listed ? `${t("info_partners.card_listed")} ${partner.listed}` : t("info_partners.card_verified")}
        </span>
        <span className="text-brand font-semibold group-hover:underline">
          {t("info_partners.card_detail")}
        </span>
      </div>
    </Link>
  );
}
