import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";
import { getT } from "@/lib/t";

const BENEFITS = [
  { icon: "💰", title: "seller_center_trading_service.benefit_payment_title", desc: "seller_center_trading_service.benefit_payment_desc" },
  { icon: "🛡", title: "seller_center_trading_service.benefit_insurance_title", desc: "seller_center_trading_service.benefit_insurance_desc" },
  { icon: "⚖", title: "seller_center_trading_service.benefit_legal_title", desc: "seller_center_trading_service.benefit_legal_desc" },
  { icon: "📈", title: "seller_center_trading_service.benefit_pool_title", desc: "seller_center_trading_service.benefit_pool_desc" },
];

const STEPS = [
  { n: 1, title: "seller_center_trading_service.step1_title", desc: "seller_center_trading_service.step1_desc" },
  { n: 2, title: "seller_center_trading_service.step2_title", desc: "seller_center_trading_service.step2_desc" },
  { n: 3, title: "seller_center_trading_service.step3_title", desc: "seller_center_trading_service.step3_desc" },
  { n: 4, title: "seller_center_trading_service.step4_title", desc: "seller_center_trading_service.step4_desc" },
  { n: 5, title: "seller_center_trading_service.step5_title", desc: "seller_center_trading_service.step5_desc" },
  { n: 6, title: "seller_center_trading_service.step6_title", desc: "seller_center_trading_service.step6_desc" },
];

const FEES = [
  { item: "seller_center_trading_service.fee_sts_item", v: "0.5%", per: "seller_center_trading_service.fee_sts_per", note: "seller_center_trading_service.fee_sts_note" },
  { item: "seller_center_trading_service.fee_quote_item", v: "seller_center_trading_service.fee_quote_v", per: "—", note: "seller_center_trading_service.fee_quote_note" },
  { item: "seller_center_trading_service.fee_translate_item", v: "seller_center_trading_service.fee_translate_v", per: "seller_center_trading_service.fee_translate_per", note: "seller_center_trading_service.fee_translate_note" },
  { item: "seller_center_trading_service.fee_qc_item", v: "seller_center_trading_service.fee_qc_v", per: "—", note: "seller_center_trading_service.fee_qc_note" },
];

const CASES = [
  {
    title: "seller_center_trading_service.case_foshan_title",
    desc: "seller_center_trading_service.case_foshan_desc",
    metric: "seller_center_trading_service.case_foshan_metric",
  },
  {
    title: "seller_center_trading_service.case_shenzhen_title",
    desc: "seller_center_trading_service.case_shenzhen_desc",
    metric: "seller_center_trading_service.case_shenzhen_metric",
  },
  {
    title: "seller_center_trading_service.case_kuka_title",
    desc: "seller_center_trading_service.case_kuka_desc",
    metric: "seller_center_trading_service.case_kuka_metric",
  },
];

export default async function TradingServicePage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("seller_center_trading_service.breadcrumb_home"), href: "/" }, { label: t("seller_center_trading_service.breadcrumb_seller"), href: "/seller-center" }, { label: t("seller_center_trading_service.breadcrumb_current") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/trading-service" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-success/15 text-success px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">{t("seller_center_trading_service.badge_secure")}</div>
            <h1 className="text-[22px] font-bold text-ink">{t("seller_center_trading_service.h1")}</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              {t("seller_center_trading_service.intro_p1")}<b>{t("seller_center_trading_service.intro_you")}</b>{t("seller_center_trading_service.intro_p2")}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[28px] mb-2">{b.icon}</div>
                <b className="block text-[13.5px] text-ink mb-1">{t(b.title)}</b>
                <p className="text-[11.5px] text-mute leading-relaxed">{t(b.desc)}</p>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_trading_service.process_heading")}</b>
            <div className="space-y-3">
              {STEPS.map((s, i) => (
                <div key={s.n} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 bg-success text-white rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0">{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px bg-line mt-1 min-h-[20px]" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <b className="block text-[13px] text-ink mb-1">{t(s.title)}</b>
                    <p className="text-[12px] text-mute leading-relaxed">{t(s.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-3">{t("seller_center_trading_service.fee_heading")}</b>
            <p className="text-[12px] text-mute mb-4">{t("seller_center_trading_service.fee_intro")}</p>
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">{t("seller_center_trading_service.th_fee")}</th>
                  <th className="text-left px-3 py-2.5 font-medium">{t("seller_center_trading_service.th_price")}</th>
                  <th className="text-left px-3 py-2.5 font-medium">{t("seller_center_trading_service.th_per")}</th>
                  <th className="text-left px-3 py-2.5 font-medium">{t("seller_center_trading_service.th_note")}</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((f) => (
                  <tr key={f.item} className="border-t border-line">
                    <td className="px-3 py-3 text-ink font-semibold">{t(f.item)}</td>
                    <td className="px-3 py-3 text-accent font-bold">{f.v.startsWith("seller_center_trading_service.") ? t(f.v) : f.v}</td>
                    <td className="px-3 py-3 text-mute">{f.per.startsWith("seller_center_trading_service.") ? t(f.per) : f.per}</td>
                    <td className="px-3 py-3 text-mute text-[11.5px]">{t(f.note)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_trading_service.cases_heading")}</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.title} className="border border-line rounded p-4 bg-[#FAFBFC]">
                  <b className="block text-[13px] text-ink leading-tight mb-2">{t(c.title)}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed mb-3">{t(c.desc)}</p>
                  <div className="border-t border-line pt-2 flex justify-between items-baseline">
                    <span className="text-[10.5px] text-mute">{t("seller_center_trading_service.case_result_label")}</span>
                    <b className="text-[13px] text-success">{t(c.metric)}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/seller-center/trade-ehome" className="block bg-success text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">{t("seller_center_trading_service.cta_title")}</b>
            <p className="text-[12.5px] opacity-90">{t("seller_center_trading_service.cta_desc")}</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Dịch vụ giao dịch — Seller Center" };
