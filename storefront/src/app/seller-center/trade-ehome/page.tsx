import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const TOOLS = [
  { icon: "📦", name: "Product management", desc: "Bulk CSV upload, assign industry attributes, version OEM/ODM pricing, and check against Huayuesc listing standards.", count: "412 active SKUs" },
  { icon: "📋", name: "Order management", desc: "Kanban pipeline: RFQ → Quote → PI → Deposit → Production → Ship-ready → Delivery. Escrow integrated.", count: "23 orders in progress" },
  { icon: "📨", name: "RFQ inbox", desc: "Every quote request from Vietnamese buyers, filtered by industry/value/MOQ. AI suggests reply templates.", count: "23 unanswered RFQs" },
  { icon: "💲", name: "Quick quoting", desc: "Create a professional bilingual VI-ZH PI / quote in 30 seconds. Auto-syncs with your pricing matrix.", count: "Avg. 18 min/quote" },
  { icon: "🚚", name: "Shipment tracking", desc: "Real-time container tracking from Yantian/Shanghai to Hai Phong/Ho Chi Minh City. Auto-updates buyers.", count: "8 containers in transit" },
  { icon: "📊", name: "Sales reporting", desc: "Revenue, margin, top buyers, top SKUs, and RFQ→Order conversion. Export to Excel/PDF for your boss.", count: "$187K in May" },
];

const INTEGRATIONS = [
  { name: "SAP Business One", type: "ERP", logo: 11 },
  { name: "Oracle NetSuite", type: "ERP", logo: 12 },
  { name: "Kingdee K3", type: "China domestic ERP", logo: 13 },
  { name: "Manhattan WMS", type: "Warehouse", logo: 14 },
  { name: "Cainiao Fulfillment", type: "Fulfillment", logo: 15 },
  { name: "Salesforce CRM", type: "CRM", logo: 16 },
  { name: "WeCom (企业微信)", type: "Team chat", logo: 17 },
  { name: "DingTalk", type: "Team chat", logo: 18 },
];

const STEPS = [
  { n: 1, title: "Single sign-on", desc: "Sign in once (SSO) with your Huayuesc Gold account" },
  { n: 2, title: "Connect ERP/WMS", desc: "The wizard auto-maps fields and syncs products + inventory two-way" },
  { n: 3, title: "Run operations as one", desc: "Your whole team sees the same order pipeline — no more scattered spreadsheets" },
];

export default function TradeEhomePage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Seller Center", href: "/seller-center" }, { label: "Foreign Trade e-Home" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/trade-ehome" />
        <div>
          <div className="bg-gradient-to-br from-brand to-brand-dark text-white rounded p-6 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🏡 ALL-IN-ONE PORTAL</div>
            <h1 className="text-[26px] font-bold leading-tight">Foreign Trade e-Home</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              The "digital home" for export suppliers — 6 tools in one dashboard, connected to your in-house ERP/WMS/CRM. The entire order lifecycle, from RFQ to container delivery, runs through a single place.
            </p>
            <div className="flex gap-3 mt-4 max-md:flex-col">
              <button className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[12.5px]">Start a free 14-day trial</button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-semibold text-[12.5px] border border-white/30">Watch demo (3 min)</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {TOOLS.map((t) => (
              <div key={t.name} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[28px] mb-2">{t.icon}</div>
                <b className="block text-[14px] text-ink mb-1">{t.name}</b>
                <p className="text-[11.5px] text-mute leading-relaxed mb-3">{t.desc}</p>
                <div className="bg-success/10 text-success text-[11px] font-semibold px-2 py-1 rounded-sm inline-block">
                  {t.count}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🔗 Integrates with 8 enterprise systems</b>
            <p className="text-[12px] text-mute mb-4">e-Home does not replace your ERP — it bridges your internal systems and Vietnamese buyers.</p>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {INTEGRATIONS.map((i) => (
                <div key={i.name} className="border border-line rounded p-3 flex items-center gap-3 hover:border-brand">
                  <img src={`/img/seller-ehome-int-${i.logo}.jpg?v=5`} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <b className="block text-[12px] text-ink truncate">{i.name}</b>
                    <span className="text-[10.5px] text-mute">{i.type}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="#" className="text-brand text-[12px] font-semibold">+ Request a custom ERP integration</Link>
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">⚙ Set up in just 3 steps</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-4 text-center">
                  <div className="w-12 h-12 bg-brand text-white rounded-full mx-auto flex items-center justify-center font-bold text-[18px] mb-3">{s.n}</div>
                  <b className="block text-[13px] text-ink mb-1">{s.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-2">
            <div className="bg-paper border border-line rounded p-4 text-center">
              <b className="block text-[24px] text-brand">−68%</b>
              <span className="text-[11px] text-mute">order processing time</span>
            </div>
            <div className="bg-paper border border-line rounded p-4 text-center">
              <b className="block text-[24px] text-success">+34%</b>
              <span className="text-[11px] text-mute">RFQ → Order conversion</span>
            </div>
            <div className="bg-paper border border-line rounded p-4 text-center">
              <b className="block text-[24px] text-accent">14 days</b>
              <span className="text-[11px] text-mute">free trial, no card</span>
            </div>
          </div>

          <div className="bg-brand-dark text-white rounded p-5 text-center">
            <b className="block text-[18px] mb-2">🏡 Enter e-Home — operate like a major export company</b>
            <p className="text-[12.5px] opacity-90 mb-4">Free for 14 days · Free with a Gold plan · Cancel anytime</p>
            <button className="bg-gold text-brand-dark px-7 py-3 rounded-sm font-bold text-[14px] hover:opacity-95">
              Start using e-Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Foreign Trade e-Home — Seller Center" };
