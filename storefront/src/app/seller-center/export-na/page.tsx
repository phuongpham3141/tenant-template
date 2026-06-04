import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const CHANNELS = [
  { icon: "📦", name: "Amazon FBA", desc: "North America's #1 marketplace. Sell B2C while FBA handles warehousing, shipping, and CS. Great for consumer goods, electronics, and home.", users: "200M+ Prime", commission: "8-15%", img: 61 },
  { icon: "🛒", name: "Walmart Marketplace", desc: "Growing 38% YoY. Lower fees than Amazon, with priority for made-in-USA products and minority suppliers.", users: "120M+ monthly", commission: "6-15%", img: 62 },
  { icon: "🛍", name: "Shopify Plus", desc: "Build your own branded website. Highest margins, but you drive your own traffic. Best for brands with existing recognition.", users: "Self-driven traffic", commission: "$2K/month", img: 63 },
  { icon: "🌐", name: "Independent website", desc: "Invest in a DTC website + Google Shopping + Meta Ads. Full control over your data and customer relationships.", users: "Self-built", commission: "10-20% ad spend", img: 64 },
];

const SERVICES = [
  { icon: "📋", title: "EIN + brand registry registration", desc: "Form a Delaware LLC, EIN tax ID, FDA for food/cosmetics, FCC for electronics, and USPTO trademark." },
  { icon: "🏬", title: "FBA + 3PL warehouse setup", desc: "Inbound FCL from China to 4 US FBA centers. Backup private 3PL warehouse to avoid high peak-season storage fees." },
  { icon: "📣", title: "Amazon PPC + DSP advertising", desc: "A US team runs Sponsored Products, Sponsored Brand video, and DSP retargeting. Target ACOS under 18%." },
  { icon: "💬", title: "English customer service", desc: "A US team + AI handle reviews, messages, and A-to-Z claims 24/7. Holding a 4.5+ rating is make-or-break on Amazon." },
  { icon: "🔄", title: "Returns management", desc: "US returns flow back to the 3PL warehouse to refurbish or liquidate. Average Amazon return rate is 12–18% for home goods." },
  { icon: "🧾", title: "Tax compliance (sales tax)", desc: "Register nexus in 12 US states and file regularly via TaxJar. EIN & 1099-K reporting." },
];

const CASES = [
  {
    company: "Foshan Tile Master",
    product: "Vinyl flooring",
    desc: "Launched Amazon FBA in November 2024 with 4 SKUs. After 14 months it reached $2.4M in revenue and a top-50 Flooring rank. 28% margin after Amazon fees.",
    metric: "$2.4M / 14 months",
    img: 71,
  },
  {
    company: "Shenzhen LED Co.",
    product: "Smart LED bulbs",
    desc: "A Walmart Marketplace + Shopify hybrid. Walmart drives volume, Shopify delivers higher margins. Grew from $40K/month (late 2024) to $480K/month (2026).",
    metric: "12× growth",
    img: 72,
  },
  {
    company: "Guangzhou Garment",
    product: "Activewear",
    desc: "Shopify DTC + Meta Ads. Investing $80K/month in marketing at a 2.8× ROAS. Building its own brand with a 5-year exit roadmap.",
    metric: "Steady 2.8× ROAS",
    img: 73,
  },
];

const TIERS = [
  { name: "Starter", price: "$999", per: "/month", channels: "1 channel", skus: "Up to 50 SKUs", ad: "Up to $5K/month PPC", support: "Email, business hours" },
  { name: "Pro", price: "$2,499", per: "/month", channels: "3 channels", skus: "Up to 500 SKUs", ad: "Up to $25K/month PPC", support: "Dedicated manager, weekly call", highlight: true },
  { name: "Enterprise", price: "$4,999", per: "/month", channels: "All channels", skus: "Unlimited", ad: "Up to $100K/month PPC", support: "Dedicated team, 24/7" },
];

export default function ExportNaPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Seller Center", href: "/seller-center" }, { label: "North America Export" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/export-na" />
        <div>
          <div className="bg-gradient-to-br from-blue-700 to-red-600 text-white rounded p-6 mb-4" style={{ background: "linear-gradient(135deg,#1e40af,#dc2626)" }}>
            <div className="inline-block bg-white text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🌎 NORTH AMERICA OMNI-CHANNEL</div>
            <h1 className="text-[26px] font-bold leading-tight">North America omni-channel export — US · Canada · Mexico</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              480 million consumers. $30 trillion in GDP. Huayuesc helps Chinese suppliers land in North America — from EIN, FBA, and PPC to English customer service and sales tax compliance. One partner, four sales channels.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 max-md:grid-cols-1">
            {CHANNELS.map((c) => (
              <div key={c.name} className="bg-paper border border-line rounded p-4 hover:border-brand grid grid-cols-[80px_1fr] gap-3">
                <img src={`/img/seller-na-${c.img}.jpg?v=5`} alt="" className="w-20 h-20 rounded object-cover" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[20px]">{c.icon}</span>
                    <b className="text-[14px] text-ink">{c.name}</b>
                  </div>
                  <p className="text-[11.5px] text-mute leading-relaxed mb-2">{c.desc}</p>
                  <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                    <div><span className="text-mute">Audience:</span> <b className="text-brand">{c.users}</b></div>
                    <div><span className="text-mute">Fees:</span> <b className="text-accent">{c.commission}</b></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🎁 End-to-end support — 6 services</b>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {SERVICES.map((s) => (
                <div key={s.title} className="border border-line rounded p-4 hover:border-brand">
                  <div className="text-[24px] mb-2">{s.icon}</div>
                  <b className="block text-[13px] text-ink mb-1">{s.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🏆 Case studies — suppliers who succeeded in North America</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.company} className="border border-line rounded overflow-hidden hover:border-brand">
                  <img src={`/img/seller-na-case-${c.img}.jpg?v=5`} alt="" className="w-full h-[140px] object-cover" />
                  <div className="p-4">
                    <b className="block text-[13px] text-ink mb-1">{c.company}</b>
                    <span className="text-[11px] text-brand block mb-2">{c.product}</span>
                    <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                    <div className="border-t border-line pt-2 flex justify-between items-baseline">
                      <span className="text-[10.5px] text-mute">Result</span>
                      <b className="text-[13px] text-success">{c.metric}</b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">💲 Pricing — 3 flexible plans</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {TIERS.map((t) => (
                <div key={t.name} className={`border-2 rounded p-4 ${t.highlight ? "border-accent ring-2 ring-accent/30 relative" : "border-line"}`}>
                  {t.highlight && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">POPULAR</div>}
                  <b className="block text-[16px] text-ink">{t.name}</b>
                  <div className="my-3"><span className="text-[24px] font-extrabold text-accent">{t.price}</span><span className="text-[11px] text-mute">{t.per}</span></div>
                  <ul className="space-y-1.5 text-[11.5px]">
                    <li className="text-ink"><b>Channels:</b> {t.channels}</li>
                    <li className="text-ink"><b>SKUs:</b> {t.skus}</li>
                    <li className="text-ink"><b>Ad budget:</b> {t.ad}</li>
                    <li className="text-ink"><b>Support:</b> {t.support}</li>
                  </ul>
                  <button className={`w-full mt-4 ${t.highlight ? "bg-accent" : "bg-brand"} text-white rounded-sm py-2 text-[12.5px] font-semibold`}>
                    Get started with {t.name} →
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Link href="#" className="block bg-brand-dark text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">🌎 Book a free consultation (60 minutes)</b>
            <p className="text-[12.5px] opacity-90">Our US + Guangzhou team analyzes your products — choosing the right channel and budget.</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "North America Export — Seller Center" };
