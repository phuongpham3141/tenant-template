import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";
import { getT } from "@/lib/t";

const CATEGORIES = [
  {
    icon: "🏭",
    name: "seller_center_trade_services.cat_factory_audit_name",
    providers: ["TÜV Rheinland", "SGS Vietnam", "Bureau Veritas"],
    from: "$420",
    desc: "seller_center_trade_services.cat_factory_audit_desc",
  },
  {
    icon: "🔬",
    name: "seller_center_trade_services.cat_quality_inspection_name",
    providers: ["Intertek", "QIMA", "AsiaInspection"],
    from: "$220",
    desc: "seller_center_trade_services.cat_quality_inspection_desc",
  },
  {
    icon: "🚛",
    name: "seller_center_trade_services.cat_ddp_shipping_name",
    providers: ["VietExpress", "Cainiao Logistics", "DHL Trade"],
    from: "$1,800/cont",
    desc: "seller_center_trade_services.cat_ddp_shipping_desc",
  },
  {
    icon: "⚖",
    name: "seller_center_trade_services.cat_legal_contract_name",
    providers: ["Baker McKenzie VN", "YKVN", "VILAF"],
    from: "$680",
    desc: "seller_center_trade_services.cat_legal_contract_desc",
  },
  {
    icon: "🌐",
    name: "seller_center_trade_services.cat_translation_name",
    providers: ["TransVN", "WordSworth Asia", "Yufan Translation"],
    from: "$0.05/từ",
    desc: "seller_center_trade_services.cat_translation_desc",
  },
  {
    icon: "📣",
    name: "seller_center_trade_services.cat_marketing_name",
    providers: ["Nanjing Adsmile", "Asia Trade Media", "Hua Marketing"],
    from: "$1,200/tháng",
    desc: "seller_center_trade_services.cat_marketing_desc",
  },
  {
    icon: "📷",
    name: "seller_center_trade_services.cat_photography_name",
    providers: ["Studio M.O.", "Shenzhen ProShot", "Liang Visual"],
    from: "$15/SKU",
    desc: "seller_center_trade_services.cat_photography_desc",
  },
  {
    icon: "💳",
    name: "seller_center_trade_services.cat_trade_finance_name",
    providers: ["HSBC China", "ICBC Trade", "Standard Chartered"],
    from: "Lãi 5.4%/năm",
    desc: "seller_center_trade_services.cat_trade_finance_desc",
  },
  {
    icon: "🛡",
    name: "seller_center_trade_services.cat_cargo_insurance_name",
    providers: ["PingAn", "PVI", "Bảo Việt"],
    from: "1.1% giá FOB",
    desc: "seller_center_trade_services.cat_cargo_insurance_desc",
  },
  {
    icon: "📦",
    name: "seller_center_trade_services.cat_customs_name",
    providers: ["Logistic VN", "Sino-VN Customs", "FastClear"],
    from: "$180/tờ",
    desc: "seller_center_trade_services.cat_customs_desc",
  },
  {
    icon: "🔢",
    name: "seller_center_trade_services.cat_barcode_name",
    providers: ["GS1 China", "GS1 Vietnam"],
    from: "$95/SKU",
    desc: "seller_center_trade_services.cat_barcode_desc",
  },
  {
    icon: "✅",
    name: "seller_center_trade_services.cat_certification_name",
    providers: ["TÜV SÜD", "SGS", "ICR Polska"],
    from: "$1,500",
    desc: "seller_center_trade_services.cat_certification_desc",
  },
];

const TOP_PROVIDERS = [
  { name: "TÜV Rheinland", rating: 4.9, jobs: "1,420 jobs", tag: "Audit · Cert" },
  { name: "QIMA", rating: 4.8, jobs: "2,310 jobs", tag: "Inspection" },
  { name: "VietExpress", rating: 4.8, jobs: "980 jobs", tag: "DDP Logistics" },
  { name: "Baker McKenzie", rating: 4.9, jobs: "320 jobs", tag: "Legal" },
  { name: "Studio M.O.", rating: 4.7, jobs: "640 jobs", tag: "Photo" },
  { name: "Sino-VN Customs", rating: 4.8, jobs: "1,180 jobs", tag: "Customs" },
];

export default async function TradeServicesPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("seller_center_trade_services.breadcrumb_home"), href: "/" }, { label: t("seller_center_trade_services.breadcrumb_seller_center"), href: "/seller-center" }, { label: t("seller_center_trade_services.breadcrumb_current") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/trade-services" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/15 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🛒 {t("seller_center_trade_services.hero_badge")}</div>
            <h1 className="text-[22px] font-bold text-ink">{t("seller_center_trade_services.hero_title")}</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              {t("seller_center_trade_services.hero_desc")}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {CATEGORIES.map((c) => (
              <div key={c.name} className="bg-paper border border-line rounded p-4 hover:border-brand transition-colors">
                <div className="flex items-start gap-3 mb-2">
                  <div className="text-[28px]">{c.icon}</div>
                  <div className="flex-1">
                    <b className="block text-[13.5px] text-ink leading-tight">{t(c.name)}</b>
                    <span className="text-[10.5px] text-mute">{t("seller_center_trade_services.card_from")} <b className="text-accent">{c.from}</b></span>
                  </div>
                </div>
                <p className="text-[11.5px] text-mute leading-relaxed mb-3">{t(c.desc)}</p>
                <div className="border-t border-line pt-2 mb-3">
                  <span className="text-[10.5px] text-mute">{t("seller_center_trade_services.card_top_provider")}</span>
                  <ul className="mt-1 space-y-0.5">
                    {c.providers.map((p) => (
                      <li key={p} className="text-[11.5px] text-ink flex items-center gap-1">
                        <span className="text-success text-[10px]">●</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full bg-brand/10 text-brand text-[12px] font-semibold rounded-sm py-1.5 hover:bg-brand hover:text-white">
                  {t("seller_center_trade_services.card_view_service")}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">⭐ Top providers tháng 5/2026</b>
              <Link href="#" className="text-brand text-[12px]">{t("seller_center_trade_services.providers_view_all")}</Link>
            </div>
            <div className="grid grid-cols-6 gap-3 max-md:grid-cols-2">
              {TOP_PROVIDERS.map((p, i) => (
                <div key={p.name} className="border border-line rounded p-3 text-center hover:border-brand">
                  <img src={`/img/seller-trade-prov-${i}.jpg?v=6`} alt="" className="w-12 h-12 mx-auto mb-2 rounded object-cover" />
                  <b className="block text-[11.5px] text-ink leading-tight mb-1">{p.name}</b>
                  <div className="text-[10.5px] text-gold mb-1">★ {p.rating}</div>
                  <span className="text-[10px] text-mute block">{p.jobs}</span>
                  <span className="text-[9.5px] text-brand block mt-1 font-semibold">{p.tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-dark text-white rounded p-5 flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:text-center">
            <div>
              <b className="block text-[16px] mb-1">💼 {t("seller_center_trade_services.cta_title")}</b>
              <p className="text-[12px] opacity-85">{t("seller_center_trade_services.cta_desc")}</p>
            </div>
            <button className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[12.5px] whitespace-nowrap">
              {t("seller_center_trade_services.cta_button")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Sàn dịch vụ XNK — Seller Center" };
