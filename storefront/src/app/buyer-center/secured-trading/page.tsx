import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { getT } from "@/lib/t";

const LAYERS = [
  {
    icon: "💰",
    title: "buyer_center_secured_trading.layer_escrow_title",
    desc: "buyer_center_secured_trading.layer_escrow_desc",
    bullets: ["buyer_center_secured_trading.layer_escrow_b1", "buyer_center_secured_trading.layer_escrow_b2", "buyer_center_secured_trading.layer_escrow_b3"],
  },
  {
    icon: "🔍",
    title: "buyer_center_secured_trading.layer_qc_title",
    desc: "buyer_center_secured_trading.layer_qc_desc",
    bullets: ["buyer_center_secured_trading.layer_qc_b1", "buyer_center_secured_trading.layer_qc_b2", "buyer_center_secured_trading.layer_qc_b3"],
  },
  {
    icon: "🚢",
    title: "buyer_center_secured_trading.layer_ship_title",
    desc: "buyer_center_secured_trading.layer_ship_desc",
    bullets: ["buyer_center_secured_trading.layer_ship_b1", "buyer_center_secured_trading.layer_ship_b2", "buyer_center_secured_trading.layer_ship_b3"],
  },
];

const TIMELINE = [
  { n: 1, title: "Sign the contract & deposit via escrow", desc: "The buyer transfers 30% of the order value into escrow. The supplier sees 'deposit received' and starts production." },
  { n: 2, title: "Production + progress tracking", desc: "The supplier posts production-line photos weekly. You can add optional in-line inspection at any stage." },
  { n: 3, title: "Pre-shipment QC inspection", desc: "Once the supplier reports completion, the Huayuesc QC team visits the factory to inspect 10% of the batch. Pass → seal the container." },
  { n: 4, title: "Shipping + insurance", desc: "The container ships out of Yantian/Shanghai. All-Risk insurance activates automatically. Real-time tracking in the Buyer Center." },
  { n: 5, title: "Receive & confirm", desc: "You inspect the goods at your Vietnamese warehouse. Click 'Confirm full receipt' → escrow releases the remaining balance to the supplier. Order closed." },
];

const FEES = [
  { service: "buyer_center_secured_trading.fee_escrow_service", fee: "0.5%", per: "buyer_center_secured_trading.fee_escrow_per", note: "buyer_center_secured_trading.fee_escrow_note" },
  { service: "buyer_center_secured_trading.fee_insurance_service", fee: "1.2%", per: "buyer_center_secured_trading.fee_insurance_per", note: "buyer_center_secured_trading.fee_insurance_note" },
  { service: "buyer_center_secured_trading.fee_qc_service", fee: "$300", per: "buyer_center_secured_trading.fee_qc_per", note: "buyer_center_secured_trading.fee_qc_note" },
  { service: "buyer_center_secured_trading.fee_inline_service", fee: "$220", per: "buyer_center_secured_trading.fee_inline_per", note: "buyer_center_secured_trading.fee_inline_note" },
  { service: "buyer_center_secured_trading.fee_interpret_service", fee: "buyer_center_secured_trading.fee_interpret_fee", per: "buyer_center_secured_trading.fee_interpret_per", note: "buyer_center_secured_trading.fee_interpret_note" },
];

const CASES = [
  {
    title: "buyer_center_secured_trading.case_tile_title",
    desc: "buyer_center_secured_trading.case_tile_desc",
    saved: "$3,360",
  },
  {
    title: "buyer_center_secured_trading.case_hotel_title",
    desc: "buyer_center_secured_trading.case_hotel_desc",
    saved: "$14,400",
  },
  {
    title: "buyer_center_secured_trading.case_furniture_title",
    desc: "buyer_center_secured_trading.case_furniture_desc",
    saved: "$36,000",
  },
];

export default async function SecuredTradingPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("buyer_center_secured_trading.bc_home"), href: "/" }, { label: t("buyer_center_secured_trading.bc_buyer_center"), href: "/buyer-center" }, { label: t("buyer_center_secured_trading.bc_trade_assurance") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/secured-trading" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-success/15 text-success px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">{t("buyer_center_secured_trading.badge")}</div>
            <h1 className="text-[22px] font-bold text-ink">{t("buyer_center_secured_trading.h1")}</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              {t("buyer_center_secured_trading.intro")}
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("buyer_center_secured_trading.layers_heading")}</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {LAYERS.map((l) => (
                <div key={l.title} className="border border-line rounded p-4 hover:border-brand">
                  <div className="text-[32px] mb-2">{l.icon}</div>
                  <b className="block text-[14px] text-ink mb-2">{t(l.title)}</b>
                  <p className="text-[12px] text-mute leading-relaxed mb-3">{t(l.desc)}</p>
                  <ul className="space-y-1 border-t border-line pt-3">
                    {l.bullets.map((b) => (
                      <li key={b} className="text-[11.5px] text-ink flex gap-1.5"><span className="text-success">✓</span> {t(b)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("buyer_center_secured_trading.process_heading")}</b>
            <div className="space-y-3">
              {TIMELINE.map((t, i) => (
                <div key={t.n} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 bg-brand text-white rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0">{t.n}</div>
                    {i < TIMELINE.length - 1 && <div className="flex-1 w-px bg-line mt-1 min-h-[20px]" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <b className="block text-[13px] text-ink mb-1">{t.title}</b>
                    <p className="text-[12px] text-mute leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("buyer_center_secured_trading.fees_heading")}</b>
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#FAFBFC] text-mute text-[11.5px]">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">{t("buyer_center_secured_trading.th_service")}</th>
                  <th className="text-left px-3 py-2.5 font-medium">{t("buyer_center_secured_trading.th_fee")}</th>
                  <th className="text-left px-3 py-2.5 font-medium">{t("buyer_center_secured_trading.th_unit")}</th>
                  <th className="text-left px-3 py-2.5 font-medium">{t("buyer_center_secured_trading.th_notes")}</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((f) => (
                  <tr key={f.service} className="border-t border-line">
                    <td className="px-3 py-3 text-ink font-semibold">{t(f.service)}</td>
                    <td className="px-3 py-3 text-accent font-bold">{t(f.fee)}</td>
                    <td className="px-3 py-3 text-mute">{t(f.per)}</td>
                    <td className="px-3 py-3 text-mute text-[11.5px]">{t(f.note)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">{t("buyer_center_secured_trading.cases_heading")}</b>
              <span className="text-[11px] text-mute">{t("buyer_center_secured_trading.cases_sub")}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.title} className="border border-line rounded p-4 bg-[#FAFBFC]">
                  <b className="block text-[13px] text-ink leading-tight mb-2">{t(c.title)}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed mb-3">{t(c.desc)}</p>
                  <div className="border-t border-line pt-2 flex justify-between items-baseline">
                    <span className="text-[10.5px] text-mute">{t("buyer_center_secured_trading.buyer_protected")}</span>
                    <b className="text-[16px] text-success">{c.saved}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/buying-request" className="block bg-accent text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">{t("buyer_center_secured_trading.cta_title")}</b>
            <p className="text-[12.5px] opacity-90">{t("buyer_center_secured_trading.cta_desc")}</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Trade Assurance Service — Buyer Center" };
