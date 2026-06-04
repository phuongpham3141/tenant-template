import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const BENEFITS = [
  { icon: "💰", title: "Payment protection", desc: "Buyers deposit 30% into escrow the moment the PI is signed — so you can produce with confidence and never worry about a mid-order cancellation." },
  { icon: "🛡", title: "Shipping risk insurance", desc: "Huayuesc carries All-Risk insurance on every STS order — paying out 110% of the FOB price if a container is damaged, burned, or lost." },
  { icon: "⚖", title: "Bilingual legal support", desc: "The Baker McKenzie + YKVN team helps with contract disputes. Interpretation for buyer meetings is free for the first 60 minutes per order." },
  { icon: "📈", title: "Expand your buyer pool", desc: "STS orders display a 'Verified Trade' badge for higher search ranking. Vietnamese buyers prefer STS orders 4× over standard ones." },
];

const STEPS = [
  { n: 1, title: "Buyer sends RFQ → you quote", desc: "Buyers see the 'STS Enabled' badge on your profile. Quote with 30-40-30 terms." },
  { n: 2, title: "Sign PI + escrow funded", desc: "The buyer signs the PI electronically and transfers a 30% deposit into a Vietcombank escrow account. You get notified and start production." },
  { n: 3, title: "Produce + update milestones", desc: "Upload weekly production-line photos to e-Home. At the ship-ready milestone, the buyer releases the next 40%." },
  { n: 4, title: "QC inspection + sealing", desc: "QIMA/SGS inspects 10% of the lot to AQL 2.5 — pass, and the container is sealed. The buyer pays the QC fee." },
  { n: 5, title: "Shipping — you receive 70%", desc: "Once the container leaves port, escrow automatically releases 70% (the 30% deposit + 40% ship-ready) to you the moment the B/L is issued." },
  { n: 6, title: "Buyer receives goods → final 30% payout", desc: "The buyer confirms in the app within 14 days, and escrow releases the final 30%. The order closes and you earn a rating + STS credit." },
];

const FEES = [
  { item: "STS escrow fee", v: "0.5%", per: "of order value", note: "Can be split 50/50 with the buyer (common arrangement)" },
  { item: "AI quoting service fee", v: "Free", per: "—", note: "Built in for Gold suppliers" },
  { item: "VI-ZH contract interpretation", v: "Free", per: "first 60 minutes", note: "$50/hr thereafter" },
  { item: "On-site QC inspection", v: "Buyer pays", per: "—", note: "You bear no cost — just host the QC team" },
];

const CASES = [
  {
    title: "Foshan Tile — $84K order, no accounts-receivable worries",
    desc: "The supplier produced 4,200m² of porcelain for a Vietnamese hotel chain. The buyer was late releasing the final 30%, so escrow transferred it automatically after 14 days. The supplier got paid in full without chasing the debt.",
    metric: "100% paid on time",
  },
  {
    title: "Shenzhen LED — 6× order surge thanks to the STS badge",
    desc: "Three months after enabling STS, the supplier's profile was recommended to 320 new buyers. RFQ → Order conversion rose from 8% to 23%.",
    metric: "+520% revenue",
  },
  {
    title: "KUKA Home — $12K payout for a damaged container",
    desc: "A container of 30 sofas was hit at the Port of Singapore. Huayuesc insurance paid out $12,400 in 11 days — and KUKA shipped a replacement batch in time to keep the buyer's trust.",
    metric: "$12K paid in 11 days",
  },
];

export default function TradingServicePage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Seller Center", href: "/seller-center" }, { label: "Trading Service" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/trading-service" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-success/15 text-success px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🔒 TRADE ASSURANCE — FOR SELLERS</div>
            <h1 className="text-[22px] font-bold text-ink">Trading Service (seller view)</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              STS does not just protect the buyer — it protects <b>you</b>. The buyer makes a real deposit into escrow before you cut fabric, cast blanks, or order materials. Container damaged? Insurance pays out. Buyer late on payment? Escrow releases on schedule. A dispute? Bilingual legal support is on hand.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[28px] mb-2">{b.icon}</div>
                <b className="block text-[13.5px] text-ink mb-1">{b.title}</b>
                <p className="text-[11.5px] text-mute leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🔄 The 6-step process (supplier view)</b>
            <div className="space-y-3">
              {STEPS.map((s, i) => (
                <div key={s.n} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 bg-success text-white rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0">{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px bg-line mt-1 min-h-[20px]" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <b className="block text-[13px] text-ink mb-1">{s.title}</b>
                    <p className="text-[12px] text-mute leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-3">💵 Fees — just 0.5% for suppliers</b>
            <p className="text-[12px] text-mute mb-4">The escrow fee is very low compared with the usual cost of carrying receivables and risk. Most suppliers split it 50/50 with the buyer — paying only 0.25% in practice.</p>
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">Fee</th>
                  <th className="text-left px-3 py-2.5 font-medium">Price</th>
                  <th className="text-left px-3 py-2.5 font-medium">Basis</th>
                  <th className="text-left px-3 py-2.5 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((f) => (
                  <tr key={f.item} className="border-t border-line">
                    <td className="px-3 py-3 text-ink font-semibold">{f.item}</td>
                    <td className="px-3 py-3 text-accent font-bold">{f.v}</td>
                    <td className="px-3 py-3 text-mute">{f.per}</td>
                    <td className="px-3 py-3 text-mute text-[11.5px]">{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">📋 Case studies — suppliers who benefited</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.title} className="border border-line rounded p-4 bg-[#FAFBFC]">
                  <b className="block text-[13px] text-ink leading-tight mb-2">{c.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                  <div className="border-t border-line pt-2 flex justify-between items-baseline">
                    <span className="text-[10.5px] text-mute">Result</span>
                    <b className="text-[13px] text-success">{c.metric}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/seller-center/trade-ehome" className="block bg-success text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">🔒 Enable STS on all your orders</b>
            <p className="text-[12.5px] opacity-90">Go to e-Home → Settings → Auto-enable STS. Buyers see a 'Verified Trade' badge on every one of your listings.</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Trading Service — Seller Center" };
