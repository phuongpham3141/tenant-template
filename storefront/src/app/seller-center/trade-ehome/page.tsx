import { Img } from "@/components/ui/img";
import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";
import { getT } from "@/lib/t";

const TOOLS = [
  { icon: "📦", name: "seller_center_trade_ehome.tool_products_name", desc: "seller_center_trade_ehome.tool_products_desc", count: "seller_center_trade_ehome.tool_products_count" },
  { icon: "📋", name: "seller_center_trade_ehome.tool_orders_name", desc: "seller_center_trade_ehome.tool_orders_desc", count: "seller_center_trade_ehome.tool_orders_count" },
  { icon: "📨", name: "seller_center_trade_ehome.tool_rfq_name", desc: "seller_center_trade_ehome.tool_rfq_desc", count: "seller_center_trade_ehome.tool_rfq_count" },
  { icon: "💲", name: "seller_center_trade_ehome.tool_quote_name", desc: "seller_center_trade_ehome.tool_quote_desc", count: "seller_center_trade_ehome.tool_quote_count" },
  { icon: "🚚", name: "seller_center_trade_ehome.tool_shipping_name", desc: "seller_center_trade_ehome.tool_shipping_desc", count: "seller_center_trade_ehome.tool_shipping_count" },
  { icon: "📊", name: "seller_center_trade_ehome.tool_report_name", desc: "seller_center_trade_ehome.tool_report_desc", count: "seller_center_trade_ehome.tool_report_count" },
];

const INTEGRATIONS = [
  { name: "SAP Business One", type: "seller_center_trade_ehome.int_type_erp", logo: 11 },
  { name: "Oracle NetSuite", type: "seller_center_trade_ehome.int_type_erp", logo: 12 },
  { name: "Kingdee K3", type: "seller_center_trade_ehome.int_type_erp_cn", logo: 13 },
  { name: "Manhattan WMS", type: "seller_center_trade_ehome.int_type_warehouse", logo: 14 },
  { name: "Cainiao Fulfillment", type: "seller_center_trade_ehome.int_type_fulfillment", logo: 15 },
  { name: "Salesforce CRM", type: "seller_center_trade_ehome.int_type_crm", logo: 16 },
  { name: "WeCom", type: "seller_center_trade_ehome.int_type_chat", logo: 17 },
  { name: "DingTalk", type: "seller_center_trade_ehome.int_type_chat", logo: 18 },
];

const STEPS = [
  { n: 1, title: "seller_center_trade_ehome.step1_title", desc: "seller_center_trade_ehome.step1_desc" },
  { n: 2, title: "seller_center_trade_ehome.step2_title", desc: "seller_center_trade_ehome.step2_desc" },
  { n: 3, title: "seller_center_trade_ehome.step3_title", desc: "seller_center_trade_ehome.step3_desc" },
];

export default async function TradeEhomePage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("seller_center_trade_ehome.breadcrumb_home"), href: "/" }, { label: t("seller_center_trade_ehome.breadcrumb_seller_area"), href: "/seller-center" }, { label: "Foreign Trade e-Home" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/trade-ehome" />
        <div>
          <div className="bg-gradient-to-br from-brand to-brand-dark text-white rounded p-6 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">{t("seller_center_trade_ehome.hero_badge")}</div>
            <h1 className="text-[26px] font-bold leading-tight">Foreign Trade e-Home</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              {t("seller_center_trade_ehome.hero_desc")}
            </p>
            <div className="flex gap-3 mt-4 max-md:flex-col">
              <button className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[12.5px]">{t("seller_center_trade_ehome.hero_btn_trial")}</button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-semibold text-[12.5px] border border-white/30">{t("seller_center_trade_ehome.hero_btn_demo")}</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {TOOLS.map((tool) => (
              <div key={tool.name} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[28px] mb-2">{tool.icon}</div>
                <b className="block text-[14px] text-ink mb-1">{t(tool.name)}</b>
                <p className="text-[11.5px] text-mute leading-relaxed mb-3">{t(tool.desc)}</p>
                <div className="bg-success/10 text-success text-[11px] font-semibold px-2 py-1 rounded-sm inline-block">
                  {t(tool.count)}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_trade_ehome.integrations_title")}</b>
            <p className="text-[12px] text-mute mb-4">{t("seller_center_trade_ehome.integrations_desc")}</p>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {INTEGRATIONS.map((i) => (
                <div key={i.name} className="border border-line rounded p-3 flex items-center gap-3 hover:border-brand">
                  <Img loading="lazy" decoding="async" src={`/img/seller-ehome-int-${i.logo}.jpg?v=6`} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <b className="block text-[12px] text-ink truncate">{i.name}</b>
                    <span className="text-[10.5px] text-mute">{t(i.type)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="#" className="text-brand text-[12px] font-semibold">{t("seller_center_trade_ehome.integrations_custom_link")}</Link>
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_trade_ehome.setup_title")}</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-4 text-center">
                  <div className="w-12 h-12 bg-brand text-white rounded-full mx-auto flex items-center justify-center font-bold text-[18px] mb-3">{s.n}</div>
                  <b className="block text-[13px] text-ink mb-1">{t(s.title)}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{t(s.desc)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-2">
            <div className="bg-paper border border-line rounded p-4 text-center">
              <b className="block text-[24px] text-brand">−68%</b>
              <span className="text-[11px] text-mute">{t("seller_center_trade_ehome.stat_time_value")}</span>
            </div>
            <div className="bg-paper border border-line rounded p-4 text-center">
              <b className="block text-[24px] text-success">+34%</b>
              <span className="text-[11px] text-mute">{t("seller_center_trade_ehome.stat_conversion")}</span>
            </div>
            <div className="bg-paper border border-line rounded p-4 text-center">
              <b className="block text-[24px] text-accent">14 ngày</b>
              <span className="text-[11px] text-mute">{t("seller_center_trade_ehome.stat_trial")}</span>
            </div>
          </div>

          <div className="bg-brand-dark text-white rounded p-5 text-center">
            <b className="block text-[18px] mb-2">{t("seller_center_trade_ehome.cta_title")}</b>
            <p className="text-[12.5px] opacity-90 mb-4">{t("seller_center_trade_ehome.cta_desc")}</p>
            <button className="bg-gold text-brand-dark px-7 py-3 rounded-sm font-bold text-[14px] hover:opacity-95">
              {t("seller_center_trade_ehome.cta_button")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Foreign Trade e-Home — Seller Center" };
