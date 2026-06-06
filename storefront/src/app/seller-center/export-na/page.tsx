import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";
import { getT } from "@/lib/t";

const CHANNELS = [
  { icon: "📦", name: "Amazon FBA", desc: "seller_center_export_na.channel_amazon_desc", users: "seller_center_export_na.channel_amazon_users", commission: "8-15%", img: 61 },
  { icon: "🛒", name: "Walmart Marketplace", desc: "seller_center_export_na.channel_walmart_desc", users: "seller_center_export_na.channel_walmart_users", commission: "6-15%", img: 62 },
  { icon: "🛍", name: "seller_center_export_na.channel_shopify_name", desc: "seller_center_export_na.channel_shopify_desc", users: "seller_center_export_na.channel_shopify_users", commission: "seller_center_export_na.channel_shopify_commission", img: 63 },
  { icon: "🌐", name: "seller_center_export_na.channel_website_name", desc: "seller_center_export_na.channel_website_desc", users: "seller_center_export_na.channel_website_users", commission: "seller_center_export_na.channel_website_commission", img: 64 },
];

const SERVICES = [
  { icon: "📋", title: "seller_center_export_na.service_ein_title", desc: "seller_center_export_na.service_ein_desc" },
  { icon: "🏬", title: "seller_center_export_na.service_fba_title", desc: "seller_center_export_na.service_fba_desc" },
  { icon: "📣", title: "seller_center_export_na.service_ppc_title", desc: "seller_center_export_na.service_ppc_desc" },
  { icon: "💬", title: "seller_center_export_na.service_cs_title", desc: "seller_center_export_na.service_cs_desc" },
  { icon: "🔄", title: "seller_center_export_na.service_returns_title", desc: "seller_center_export_na.service_returns_desc" },
  { icon: "🧾", title: "seller_center_export_na.service_tax_title", desc: "seller_center_export_na.service_tax_desc" },
];

const CASES = [
  {
    company: "Foshan Tile Master",
    product: "seller_center_export_na.case_tile_product",
    desc: "seller_center_export_na.case_tile_desc",
    metric: "seller_center_export_na.case_tile_metric",
    img: 71,
  },
  {
    company: "Shenzhen LED Co.",
    product: "seller_center_export_na.case_led_product",
    desc: "seller_center_export_na.case_led_desc",
    metric: "seller_center_export_na.case_led_metric",
    img: 72,
  },
  {
    company: "Guangzhou Garment",
    product: "seller_center_export_na.case_garment_product",
    desc: "seller_center_export_na.case_garment_desc",
    metric: "seller_center_export_na.case_garment_metric",
    img: 73,
  },
];

const TIERS = [
  { name: "Starter", price: "$999", per: "seller_center_export_na.tier_starter_per", channels: "seller_center_export_na.tier_starter_channels", skus: "seller_center_export_na.tier_starter_skus", ad: "seller_center_export_na.tier_starter_ad", support: "seller_center_export_na.tier_starter_support" },
  { name: "Pro", price: "$2,499", per: "seller_center_export_na.tier_pro_per", channels: "seller_center_export_na.tier_pro_channels", skus: "seller_center_export_na.tier_pro_skus", ad: "seller_center_export_na.tier_pro_ad", support: "seller_center_export_na.tier_pro_support", highlight: true },
  { name: "Enterprise", price: "$4,999", per: "seller_center_export_na.tier_enterprise_per", channels: "seller_center_export_na.tier_enterprise_channels", skus: "seller_center_export_na.tier_enterprise_skus", ad: "seller_center_export_na.tier_enterprise_ad", support: "seller_center_export_na.tier_enterprise_support" },
];

export default async function ExportNaPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("seller_center_export_na.breadcrumb_home"), href: "/" }, { label: t("seller_center_export_na.breadcrumb_seller"), href: "/seller-center" }, { label: t("seller_center_export_na.breadcrumb_export_na") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/export-na" />
        <div>
          <div className="bg-gradient-to-br from-blue-700 to-red-600 text-white rounded p-6 mb-4" style={{ background: "linear-gradient(135deg,#1e40af,#dc2626)" }}>
            <div className="inline-block bg-white text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">{t("seller_center_export_na.hero_badge")}</div>
            <h1 className="text-[26px] font-bold leading-tight">{t("seller_center_export_na.hero_title")}</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              {t("seller_center_export_na.hero_desc")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 max-md:grid-cols-1">
            {CHANNELS.map((c) => (
              <div key={c.name} className="bg-paper border border-line rounded p-4 hover:border-brand grid grid-cols-[80px_1fr] gap-3">
                <img src={`/img/seller-na-${c.img}.jpg?v=6`} alt="" className="w-20 h-20 rounded object-cover" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[20px]">{c.icon}</span>
                    <b className="text-[14px] text-ink">{c.name}</b>
                  </div>
                  <p className="text-[11.5px] text-mute leading-relaxed mb-2">{t(c.desc)}</p>
                  <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                    <div><span className="text-mute">{t("seller_center_export_na.label_audience")}</span> <b className="text-brand">{t(c.users)}</b></div>
                    <div><span className="text-mute">{t("seller_center_export_na.label_fee")}</span> <b className="text-accent">{t(c.commission)}</b></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_export_na.services_heading")}</b>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {SERVICES.map((s) => (
                <div key={s.title} className="border border-line rounded p-4 hover:border-brand">
                  <div className="text-[24px] mb-2">{s.icon}</div>
                  <b className="block text-[13px] text-ink mb-1">{t(s.title)}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{t(s.desc)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_export_na.cases_heading")}</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.company} className="border border-line rounded overflow-hidden hover:border-brand">
                  <img src={`/img/seller-na-case-${c.img}.jpg?v=6`} alt="" className="w-full h-[140px] object-cover" />
                  <div className="p-4">
                    <b className="block text-[13px] text-ink mb-1">{c.company}</b>
                    <span className="text-[11px] text-brand block mb-2">{t(c.product)}</span>
                    <p className="text-[11.5px] text-mute leading-relaxed mb-3">{t(c.desc)}</p>
                    <div className="border-t border-line pt-2 flex justify-between items-baseline">
                      <span className="text-[10.5px] text-mute">{t("seller_center_export_na.case_result_label")}</span>
                      <b className="text-[13px] text-success">{t(c.metric)}</b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_export_na.pricing_heading")}</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {TIERS.map((tier) => (
                <div key={tier.name} className={`border-2 rounded p-4 ${tier.highlight ? "border-accent ring-2 ring-accent/30 relative" : "border-line"}`}>
                  {tier.highlight && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">{t("seller_center_export_na.tier_popular")}</div>}
                  <b className="block text-[16px] text-ink">{tier.name}</b>
                  <div className="my-3"><span className="text-[24px] font-extrabold text-accent">{tier.price}</span><span className="text-[11px] text-mute">{tier.per}</span></div>
                  <ul className="space-y-1.5 text-[11.5px]">
                    <li className="text-ink"><b>{t("seller_center_export_na.tier_channels_label")}</b> {t(tier.channels)}</li>
                    <li className="text-ink"><b>{t("seller_center_export_na.tier_skus_label")}</b> {t(tier.skus)}</li>
                    <li className="text-ink"><b>{t("seller_center_export_na.tier_ad_label")}</b> {t(tier.ad)}</li>
                    <li className="text-ink"><b>{t("seller_center_export_na.tier_support_label")}</b> {t(tier.support)}</li>
                  </ul>
                  <button className={`w-full mt-4 ${tier.highlight ? "bg-accent" : "bg-brand"} text-white rounded-sm py-2 text-[12.5px] font-semibold`}>
                    {t("seller_center_export_na.tier_cta_start")} {tier.name} →
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Link href="#" className="block bg-brand-dark text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">{t("seller_center_export_na.cta_consult_title")}</b>
            <p className="text-[12.5px] opacity-90">{t("seller_center_export_na.cta_consult_desc")}</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Xuất khẩu Bắc Mỹ — Seller Center" };
