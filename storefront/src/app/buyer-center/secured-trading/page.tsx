import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";

const LAYERS = [
  {
    icon: "💰",
    title: "Payment escrow",
    desc: "Your funds are held in a Huayuesc escrow account and released to the supplier only after the goods pass QC and you confirm full receipt.",
    bullets: ["Escrow held at partner banks (Vietcombank / BIDV)", "Milestone disbursement: 30% deposit – 40% ex-works – 30% on receipt", "100% refund if delivery is over 30 days late"],
  },
  {
    icon: "🔍",
    title: "On-site QC inspection",
    desc: "An independent QC team randomly inspects 10% of the output to AQL 2.5 before the container is sealed.",
    bullets: ["Detailed photo + video report within 48h", "Tested against the relevant ISO/EN/ASTM standards", "The buyer can reject any batch that fails"],
  },
  {
    icon: "🚢",
    title: "Shipping insurance",
    desc: "Every container moving through Trade Assurance is covered by All-Risk insurance, with compensation up to 110% of the goods' value.",
    bullets: ["Insurance in partnership with PVI / Bảo Việt", "Covered from the supplier's warehouse to the buyer's (DDP)", "Claims handled within 14 days"],
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
  { service: "Escrow service", fee: "0.5%", per: "of transaction value", note: "Applied automatically to every Trade Assurance order" },
  { service: "All-Risk insurance", fee: "1.2%", per: "of FOB value", note: "May increase/decrease by route and goods value" },
  { service: "On-site QC inspection", fee: "$300", per: "per inspection, one factory", note: "Optional — buyers can skip it if the supplier is already certified" },
  { service: "In-line stage QC", fee: "$220", per: "per inspection", note: "Recommended for orders over $50,000 or OEM" },
  { service: "VN-CN contract interpretation", fee: "Free", per: "first 60 minutes", note: "$50/hour thereafter" },
];

const CASES = [
  {
    title: "HCMC showroom bought $42K of porcelain tile",
    desc: "QC found 8% of the batch cracked during domestic transport in China. The buyer got a 100% replacement of the defective batch, the supplier covered the cost, and escrow held the funds until the new batch passed QC.",
    saved: "$3,360",
  },
  {
    title: "4-star Da Nang hotel ordered 80 smart toilets",
    desc: "The container was partly burned in transit through Singapore. Huayuesc insurance paid out $14,400 (110% of FOB) within 9 days — the buyer reordered in time for the opening.",
    saved: "$14,400",
  },
  {
    title: "Hanoi furniture dealer signed a $120K OEM contract",
    desc: "The supplier fell 45 days behind the contracted production schedule. The buyer triggered the penalty clause — escrow automatically refunded 30% of the value to the buyer, and the order was canceled at no cost.",
    saved: "$36,000",
  },
];

export default function SecuredTradingPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Buyer Center", href: "/buyer-center" }, { label: "Trade Assurance Service" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/secured-trading" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-success/15 text-success px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🔒 TRADE ASSURANCE</div>
            <h1 className="text-[22px] font-bold text-ink">Trade Assurance Service</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              In cross-border wholesale, the risks often outweigh the margins: goods that don't match the description, late delivery, suppliers running off with the money, damaged containers. Trade Assurance is a three-layer shield that lets you transfer funds with confidence: the supplier only gets paid once the goods reach you exactly as promised.
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🛡 3 layers of buyer protection</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {LAYERS.map((l) => (
                <div key={l.title} className="border border-line rounded p-4 hover:border-brand">
                  <div className="text-[32px] mb-2">{l.icon}</div>
                  <b className="block text-[14px] text-ink mb-2">{l.title}</b>
                  <p className="text-[12px] text-mute leading-relaxed mb-3">{l.desc}</p>
                  <ul className="space-y-1 border-t border-line pt-3">
                    {l.bullets.map((b) => (
                      <li key={b} className="text-[11.5px] text-ink flex gap-1.5"><span className="text-success">✓</span> {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🔄 5-step process</b>
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
            <b className="block text-[15px] text-ink mb-4">💵 Service fee schedule</b>
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#FAFBFC] text-mute text-[11.5px]">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">Service</th>
                  <th className="text-left px-3 py-2.5 font-medium">Fee</th>
                  <th className="text-left px-3 py-2.5 font-medium">Unit</th>
                  <th className="text-left px-3 py-2.5 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((f) => (
                  <tr key={f.service} className="border-t border-line">
                    <td className="px-3 py-3 text-ink font-semibold">{f.service}</td>
                    <td className="px-3 py-3 text-accent font-bold">{f.fee}</td>
                    <td className="px-3 py-3 text-mute">{f.per}</td>
                    <td className="px-3 py-3 text-mute text-[11.5px]">{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">📋 Real case studies</b>
              <span className="text-[11px] text-mute">3 notable cases from the last 6 months</span>
            </div>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.title} className="border border-line rounded p-4 bg-[#FAFBFC]">
                  <b className="block text-[13px] text-ink leading-tight mb-2">{c.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                  <div className="border-t border-line pt-2 flex justify-between items-baseline">
                    <span className="text-[10.5px] text-mute">Buyer protected</span>
                    <b className="text-[16px] text-success">{c.saved}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/buying-request" className="block bg-accent text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">🚀 Open your first Trade Assurance order</b>
            <p className="text-[12.5px] opacity-90">Send an RFQ → Pick a supplier → Enable Trade Assurance — your money is safe from the very first second.</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Trade Assurance Service — Buyer Center" };
