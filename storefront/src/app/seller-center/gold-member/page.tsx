import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const TIERS = [
  {
    name: "Free",
    price: "$0",
    per: "/yr",
    color: "border-line",
    badge: "Free",
    cta: "Currently active",
    ctaColor: "bg-mute2/30 text-mute",
    desc: "For new suppliers testing the market",
  },
  {
    name: "Gold",
    price: "$2,980",
    per: "/yr",
    color: "border-gold ring-2 ring-gold",
    badge: "MOST POPULAR",
    cta: "Upgrade to Gold",
    ctaColor: "bg-gold text-brand-dark",
    desc: "For suppliers serious about exporting to Vietnam",
    highlight: true,
  },
  {
    name: "Diamond",
    price: "$6,800",
    per: "/yr",
    color: "border-brand",
    badge: "Premium",
    cta: "Contact Sales",
    ctaColor: "bg-brand text-white",
    desc: "For major brands that need maximum exposure",
  },
];

const FEATURES = [
  { name: "Maximum products listed", free: "30 SKUs", gold: "5,000 SKUs", diamond: "Unlimited" },
  { name: "RFQs received / month", free: "10", gold: "Unlimited", diamond: "Unlimited + priority" },
  { name: "Search result ranking", free: "Standard", gold: "Top 30%", diamond: "Top 5%" },
  { name: "Industry homepage banner", free: "—", gold: "✓ (rotating)", diamond: "✓ (1 fixed slot)" },
  { name: "Factory audit + TÜV report", free: "Self-paid $1,200", gold: "1x / yr free", diamond: "2x / yr free" },
  { name: "Gold badge + verified seller", free: "—", gold: "✓", diamond: "✓ + Diamond crown" },
  { name: "Detailed analytics dashboard", free: "Basic", gold: "Full", diamond: "Full + competitor data" },
  { name: "Maike AI assistant", free: "7-day demo", gold: "✓ Free", diamond: "✓ Free + custom training" },
  { name: "Dedicated account manager", free: "—", gold: "Shared", diamond: "Dedicated" },
  { name: "Smart Expo access", free: "1 expo / yr", gold: "All expos", diamond: "All + premium booth" },
];

const TESTIMONIALS = [
  {
    company: "Shenzhen Lighting Co.",
    role: "CEO, Li Qiang",
    quote: "Three months after upgrading to Gold, orders from Vietnamese buyers grew 4× — mostly thanks to the LED lighting industry banner and priority RFQs. The ROI covered the Gold fee in the first month.",
    metric: "+312% orders",
    avatar: 41,
  },
  {
    company: "Foshan Tile Master",
    role: "Sales Director, Zhang Mei",
    quote: "Ho Chi Minh City buyers search for porcelain tile on Huayuesc — Gold pushed us into the top 3 results. Inbound RFQs went from 8/month to 47/month. The free TÜV audit helped us close a major hotel chain.",
    metric: "47 RFQs/month",
    avatar: 42,
  },
  {
    company: "Guangzhou KUKA Home",
    role: "Export Manager, Wang Hua",
    quote: "Diamond plus Smart Expo let us reach 12K Southeast Asian buyers in a single week — the equivalent of six months of offline trade fairs. The $6.8K fee is small next to a Canton Fair budget of $40K+.",
    metric: "12K buyers/expo",
    avatar: 43,
  },
];

const ROI_ROWS = [
  { label: "Current average orders / month", v: "$4,200" },
  { label: "Projected growth with Gold (3.2×)", v: "+$13,440" },
  { label: "Annual Gold fee (divided over 12 months)", v: "−$248" },
  { label: "Extra net profit / month (22% margin)", v: "+$2,729" },
];

export default function GoldMemberPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Seller Center", href: "/seller-center" }, { label: "Gold Member Sign-Up" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/gold-member" />
        <div>
          <div className="bg-gradient-to-br from-gold/40 to-gold/10 border border-gold rounded p-5 mb-4">
            <div className="inline-block bg-brand-dark text-gold px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🥇 GOLD MEMBERSHIP</div>
            <h1 className="text-[24px] font-bold text-ink">Become a Gold supplier — break through into Vietnam exports</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed max-w-[680px]">
              91% of B2B orders on Huayuesc come from Gold/Diamond suppliers. When a buyer searches "porcelain tile MOQ 500m²" or "OEM kitchen cabinets," the algorithm gives priority to suppliers with a badge — Gold = trust + traffic + transparent audit reports.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-5 max-md:grid-cols-1">
            {TIERS.map((t) => (
              <div key={t.name} className={`bg-paper border-2 ${t.color} rounded p-5 relative`}>
                {t.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-brand-dark text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-sm tracking-wider">
                    {t.badge}
                  </div>
                )}
                <h3 className="text-[18px] font-bold text-ink">{t.name}</h3>
                <p className="text-[11.5px] text-mute mt-1 mb-3">{t.desc}</p>
                <div className="mb-4">
                  <span className="text-[28px] font-extrabold text-ink">{t.price}</span>
                  <span className="text-[12px] text-mute">{t.per}</span>
                </div>
                <button className={`block w-full ${t.ctaColor} rounded-sm py-2.5 text-[12.5px] font-semibold`}>
                  {t.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4 overflow-x-auto">
            <b className="block text-[15px] text-ink mb-4">📋 Detailed feature comparison</b>
            <table className="w-full text-[12.5px] min-w-[640px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">Feature</th>
                  <th className="text-center px-3 py-2.5 font-medium">Free</th>
                  <th className="text-center px-3 py-2.5 font-medium bg-gold/15 text-brand-dark">Gold</th>
                  <th className="text-center px-3 py-2.5 font-medium">Diamond</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((f) => (
                  <tr key={f.name} className="border-t border-line">
                    <td className="px-3 py-2.5 text-ink">{f.name}</td>
                    <td className="px-3 py-2.5 text-center text-mute">{f.free}</td>
                    <td className="px-3 py-2.5 text-center text-ink font-semibold bg-gold/5">{f.gold}</td>
                    <td className="px-3 py-2.5 text-center text-brand font-semibold">{f.diamond}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">💬 Suppliers who succeeded with Gold</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {TESTIMONIALS.map((t) => (
                <div key={t.company} className="border border-line rounded p-4 bg-[#FAFBFC]">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={`/img/seller-gold-${t.avatar}.jpg?v=5`} alt="" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <b className="block text-[12.5px] text-ink leading-tight">{t.company}</b>
                      <span className="text-[11px] text-mute">{t.role}</span>
                    </div>
                  </div>
                  <p className="text-[12px] text-ink leading-relaxed mb-3">"{t.quote}"</p>
                  <div className="border-t border-line pt-2 flex justify-between items-baseline">
                    <span className="text-[10.5px] text-mute">Result</span>
                    <b className="text-[14px] text-success">{t.metric}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[15px] text-ink mb-3">📊 Gold ROI calculator</b>
              <p className="text-[11.5px] text-mute mb-3">Based on the average of 142 furniture suppliers who upgraded to Gold over the past 12 months.</p>
              <table className="w-full text-[12.5px]">
                <tbody>
                  {ROI_ROWS.map((r, i) => (
                    <tr key={r.label} className={`border-b border-line last:border-0 ${i === ROI_ROWS.length - 1 ? "bg-success/10 font-bold" : ""}`}>
                      <td className="py-2 text-ink">{r.label}</td>
                      <td className="py-2 text-right text-accent font-semibold">{r.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[11px] text-mute mt-3">* Figures are for reference only. They depend on product category, warehouse location, and production capacity.</p>
            </div>

            <div className="bg-brand-dark text-white rounded p-5 flex flex-col justify-center">
              <b className="block text-[18px] mb-2">🚀 Ready to upgrade?</b>
              <p className="text-[12.5px] opacity-90 leading-relaxed mb-4">
                Sign up for Gold today — activated within 24 hours, with a $1,200 TÜV audit package and a free 30-day industry banner for the first 50 sign-ups in May.
              </p>
              <button className="bg-gold text-brand-dark rounded-sm py-3 font-bold text-[14px] hover:opacity-95">
                Upgrade to Gold now — $2,980/yr
              </button>
              <span className="text-[11px] opacity-70 mt-2 text-center">Not satisfied within 30 days? Get a 100% refund.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Gold Member Sign-Up — Seller Center" };
