import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";
import { getT } from "@/lib/t";

const STATS_BY_INDUSTRY: Record<string, { factories: string; sku: string; lead: string; cluster: string }> = {
  "construction-materials": {
    factories: "20+", sku: "480+", lead: "18-25 days",
    cluster: "Foshan (ceramics, sanitary) · Chaozhou (glazed tile) · Fujian (natural stone)",
  },
  "noi-that": {
    factories: "20+", sku: "480+", lead: "20-30 days",
    cluster: "Lecong, Foshan (sofas) · Dongguan (kitchen/wardrobe cabinets) · Jinjiang (engineered wood)",
  },
  // Kitchen-bathroom appliances — the 3rd industry from the PDF (not yet in NAV_CATEGORIES, fallback)
  "kitchen-bathroom-appliances": {
    factories: "15+", sku: "320+", lead: "20-25 days",
    cluster: "Zhongshan (lighting, gas cooktops) · Shunde (home appliances) · Juhe (smart toilet seats)",
  },
};

export default async function IndustryChannelsPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("industry_channels.breadcrumb_home"), href: "/" }, { label: t("industry_channels.breadcrumb_title") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5">
          <h1 className="text-[24px] font-extrabold text-ink leading-tight">{t("industry_channels.h1")}</h1>
          <p className="text-[13px] text-mute mt-1">{t("industry_channels.intro")}</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-5 grid grid-cols-3 gap-4 max-md:grid-cols-1 mb-7">
        {NAV_CATEGORIES.map((c) => {
          const stats = STATS_BY_INDUSTRY[c.slug] ?? { factories: "100+", sku: "2,000", lead: "20-30 days" };
          return (
            <Link key={c.slug} href={`/category/${c.slug}`} className="bg-paper border border-line rounded overflow-hidden hover:border-brand block group">
              <div className="aspect-[16/9] bg-[#F5F5F5] relative overflow-hidden">
                <img src={`/img/industry-${c.slug}.jpg?v=6`} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <div className="absolute top-3 left-3 bg-white px-3 py-1.5 rounded-sm text-[24px] leading-none">{c.icon}</div>
              </div>
              <div className="p-4">
                <h3 className="text-[16px] font-bold text-ink mb-2">{c.name}</h3>
                <div className="grid grid-cols-3 gap-2 text-[11.5px] mb-2">
                  <div>
                    <div className="text-mute">{t("industry_channels.audited_suppliers")}</div>
                    <b className="text-brand">{stats.factories}</b>
                  </div>
                  <div>
                    <div className="text-mute">{t("industry_channels.skus_on_sale")}</div>
                    <b className="text-brand">{stats.sku}</b>
                  </div>
                  <div>
                    <div className="text-mute">{t("industry_channels.ddp_to_vietnam")}</div>
                    <b className="text-brand">{stats.lead}</b>
                  </div>
                </div>
                <div className="text-[11px] text-mute leading-snug border-t border-line pt-2">
                  <b className="text-ink">{t("industry_channels.cluster_label")}</b> {stats.cluster}
                </div>
                <span className="text-brand text-[12.5px] font-semibold mt-3 block">{t("industry_channels.explore_channel")}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export const metadata = { title: "Industry Channels — Huayuesc" };
