import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const HERO_STATS = [
  { n: "20+", l: "Verified suppliers", icon: "🏭" },
  { n: "VN distribution partners", l: "Vietnamese business dealers", icon: "🇻🇳" },
  { n: "Growing every year", l: "Order value protected", icon: "🛡" },
  { n: "32%", l: "Factory audit pass rate", icon: "✅" },
];

const VALUE_PROPS = [
  {
    icon: "🇻🇳",
    title: "Verified Vietnamese distribution partners and dealers",
    desc: "Dealers fully verified as businesses, with a real import history. Industry mix: furniture 35%, building materials 22%, sanitary ware 15%, home appliances 12%, other industries 16%.",
  },
  {
    icon: "🤝",
    title: "Bilingual Chinese – Vietnamese team",
    desc: "A Guangzhou team (sourcing, QC, audit) + a Hanoi team (warehouse, customs clearance, sales). Support via WeChat, DingTalk, and Zalo — responding within 30 minutes during business hours.",
  },
  {
    icon: "🛡",
    title: "Trade Assurance — buyers pay 0% fees",
    desc: "Escrow accounts through partner banks in Vietnam and China. Suppliers pay 1.5% (already included in the listed price). It removes the trust barrier — Vietnamese dealers confidently place large orders.",
  },
  {
    icon: "🚢",
    title: "Connected to Hai Phong (main) port + secondary ports + border overland",
    desc: "Lach Huyen (Hai Phong main) · Cat Lai · Cai Mep, plus the Huu Nghi overland route (Lang Son), 5–7 days for small orders. Shipping partners on standby: COSCO, MSC, OOCL, ONE.",
  },
  {
    icon: "📊",
    title: "Detailed analytics dashboard",
    desc: "Views by SKU, RFQ → quote → order conversion rates, top dealers by revenue, seasonal best-seller SKU suggestions, and A/B image testing. Export to Excel, CSV, or automatically via API.",
  },
  {
    icon: "💸",
    title: "Win-Win model — sharing market risk",
    desc: "Listing, audit, RFQ matching, banners — 100% free. The only fee, the 1.5% Trade Assurance fee, applies solely on a successful order. A commitment to refund 100% of fees if the supplier has not turned a profit after the first 12 months.",
  },
];

const PRICING_PILLARS = [
  {
    badge: "Before You Have an Order",
    price: "VND 0",
    priceSub: "Completely free",
    color: "#16A34A",
    headline: "Listing, audit, and all marketing tools — 100% free",
    desc: "Huayuesc believes value must be proven before any fee is charged. The entire infrastructure — from factory audits and unlimited product listings to AI RFQ matching and homepage banners — is free for every supplier that passes the audit.",
    items: [
      "Factory registration & legal screening",
      "On-site factory audit (ISO 19011 standard)",
      "Unlimited product listings",
      "RFQ inbox + top-3 AI matching",
      "Bilingual Chinese – Vietnamese account management",
      "Industry banners & homepage banners",
      "Quarterly Vietnamese dealer report",
      "Trade-show representation (Canton Fair, VIETBUILD)",
    ],
    accent: false,
  },
  {
    badge: "On a Successful Order",
    price: "1.5%",
    priceSub: "Of the order value",
    color: "#005F6B",
    headline: "Trade Assurance — the only fee, charged only on successful delivery",
    desc: "We only earn when the supplier has received the order and the Vietnamese dealer has confirmed it. The 1.5% fee covers the full escrow-account service through partner banks in Vietnam and China — protecting buyer trust. Buyers pay VND 0; suppliers have already included the 1.5% in the listed price, with no hidden fees.",
    items: [
      "Escrow accounts through 3 international banks",
      "Vietnamese buyers pay 0% fees — confident placing large orders",
      "Funds released only after the dealer confirms the goods are correct",
      "Dispute protection — refund if it does not match what was promised",
      "Transparent fee, with nothing beyond the 1.5%",
      "Auto-deducted — the supplier does nothing extra",
    ],
    accent: true,
  },
  {
    badge: "Our Commitment",
    price: "No Profit",
    priceSub: "No fee",
    color: "#9C6A1F",
    headline: "If the supplier has not turned a profit, Huayuesc waives all fees",
    desc: "We believe in a model where everyone wins. If after the first 12 months a supplier has not earned a real profit from Huayuesc, we refund 100% of the Trade Assurance fees paid — or continue free for another 6 months to find the optimal path together. This is not a promotion — it is our operating philosophy.",
    items: [
      "A binding commitment in the service contract",
      "100% refund of Trade Assurance fees after 12 months if not yet profitable",
      "Or continue free for another 6 months — the supplier chooses",
      "The account manager proactively suggests price and product optimizations",
      "Huayuesc shares market risk with the supplier",
      "Our philosophy: we win together — not separately",
    ],
    accent: false,
  },
];

const STEPS = [
  {
    n: 1,
    icon: "📝",
    color: "#0E7490",
    title: "Register & Pre-Screen",
    duration: "1–2 days",
    desc: "Fill out the online form (10 minutes) — upload your business license, ISO 9001/14001, and production capacity. Huayuesc screens within 24–48 hours: checking Tianyancha, the GACC export license, and complaint history. About 32% of applications pass the pre-screening.",
    actions: [
      "Answer 32 questions on scale, products, and revenue",
      "Cross-checked against 5 public data sources",
      "100% of applications get a response — we never leave you hanging",
    ],
  },
  {
    n: 2,
    icon: "🔍",
    color: "#7C2D12",
    title: "On-Site Factory Audit",
    duration: "7–15 days",
    desc: "The Huayuesc audit team (4 QC staff in Guangzhou) visits the factory in person: inspecting the actual production line, capacity, QC system, original certificates, and labor conditions (ILO standard). The on-site audit takes 1–2 days. A 28–45 page PDF report is digitally signed on the blockchain.",
    actions: [
      "Tour 12 items per the ISO 19011 standard",
      "Randomly interview 5–8 workers (privately)",
      "Shoot 360° video + 100–180 evidence photos",
      "Inspect a production batch actually running",
    ],
  },
  {
    n: 3,
    icon: "🚀",
    color: "#16A34A",
    title: "Launch the Storefront & Training",
    duration: "3–5 days",
    desc: "1-on-1 account manager guidance: post SKUs with titles optimized for Vietnamese search, standardize images (re-shoot if needed), set MOQs and price tiers, and connect your internal API/ERP if available. Training via 8 video sessions in Chinese + Vietnamese.",
    actions: [
      "Post 10–30 flagship products with photos + video",
      "Set up the bank account to receive payouts",
      "Process training: response time, disputes, packaging",
      "API integration or ERP connector (optional)",
    ],
  },
  {
    n: 4,
    icon: "💼",
    color: "#9C6A1F",
    title: "Sell & Receive Your First Order",
    duration: "7–30 days",
    desc: "With the storefront live, AI matching automatically pushes SKUs to suitable Vietnamese dealers. On average a supplier receives its first RFQ within 7–14 days. The first order averages 30 days. The account manager monitors and optimizes continuously.",
    actions: [
      "RFQs are automatically routed to the best-fit supplier",
      "Quote via the dashboard or the mobile app",
      "Track orders across 5 statuses with photos/video",
      "Payout via escrow after the dealer confirms",
    ],
  },
];

const AUDIT_CRITERIA = [
  { label: "Chinese business license", required: true },
  { label: "GACC export license", required: true },
  { label: "ISO 9001:2015 or equivalent", required: true },
  { label: "Production capacity ≥ the industry threshold", required: true },
  { label: "A documented quality-control system", required: true },
  { label: "Compliance with basic ILO labor standards", required: true },
  { label: "ISO 14001 (environmental)", required: false },
  { label: "BSCI or SEDEX (social audit)", required: false },
  { label: "Industry certifications (CE, FCC, RoHS, FDA)", required: false },
  { label: "Tianyancha credit score ≥ 70", required: false },
];

const MARKETING_TOOLS = [
  {
    icon: "📢",
    title: "AI RFQ Matching",
    desc: "When a Vietnamese dealer sends a quote request, the AI ranking system pushes the best-fit suppliers into the top 3 — based on sales history, ratings, capacity, and response time. Premium-tier suppliers get top-3 priority when several candidates tie on score.",
  },
  {
    icon: "🏠",
    title: "Featured Homepage Banner",
    desc: "Premium-tier suppliers get a rotating banner on the Huayuesc homepage — 100,000+ views per week, with an average click-through rate of 4.2%. The rotation cycles every 8 hours among Premium suppliers.",
  },
  {
    icon: "📧",
    title: "Trade Alert — Weekly Newsletter",
    desc: "A weekly newsletter sent to 12,000 registered dealers. Premium suppliers are featured in the New Suppliers section (once a month) or Best Offers (by industry). 38% open rate, 8.5% click rate.",
  },
  {
    icon: "🎯",
    title: "Trade-Show Representation",
    desc: "Huayuesc represents Premium suppliers at the Canton Fair (Guangzhou, twice a year), VIETBUILD Ho Chi Minh City, and VIIF Hanoi — collecting dealer business cards and routing leads back to suppliers within 48 hours. Free for 2 trade shows/year on the Premium tier.",
  },
  {
    icon: "🎬",
    title: "Factory Tour Video",
    desc: "Huayuesc produces a 90–180 second factory tour video for Premium suppliers (once a year free, then $800 USD/video). Placed on the storefront and shared via Trade Alert — building credibility with new dealers.",
  },
  {
    icon: "📈",
    title: "Quarterly Vietnamese Dealer Report",
    desc: "Verified-tier and above suppliers receive a quarterly report: the industry's top 20 Vietnamese dealers, sales trends, churn-risk forecasts, and market opportunities (SKUs in short supply). 30+ pages, compiled by the Research team.",
  },
];

const STORIES = [
  {
    name: "Foshan Hanse Industrial",
    loc: "Foshan",
    category: "Office furniture",
    before: "20 orders / month",
    after: "85 orders / month",
    lift: "+325%",
    years: "6 years on CSR",
    quote: "Before Huayuesc, we entered Vietnam through middleman dealers at an 8–12% margin. Now we sell direct, at a 22% margin and with long-term relationships.",
  },
  {
    name: "OPPEIN Home Group",
    loc: "Guangzhou",
    category: "Kitchen cabinets & furniture",
    before: "$80,000 / month",
    after: "$420,000 / month",
    lift: "+425%",
    years: "5 years on CSR",
    quote: "Vietnam has been OPPEIN's fastest-growing market over 3 years — outpacing even Indonesia and the Philippines.",
  },
  {
    name: "Taizhou Faucet Group",
    loc: "Taizhou",
    category: "Faucets & sanitary ware",
    before: "0 Vietnamese dealers",
    after: "32 Vietnamese dealers",
    lift: "+32 dealers",
    years: "4 years on CSR",
    quote: "The Huayuesc account manager helped us handle Vietnam's VAT regulations — something we could not do ourselves from China.",
  },
  {
    name: "Landbond Furniture",
    loc: "Foshan",
    category: "Mid- to high-end wooden furniture",
    before: "$60,000 / month",
    after: "$280,000 / month",
    lift: "+367%",
    years: "7 years on CSR",
    quote: "The Premium tier is well worth it — the homepage banner generates 40% of our high-quality RFQs.",
  },
  {
    name: "Ortonbaths Group",
    loc: "Shenzhen",
    category: "Toilets & lavabos",
    before: "5% of exports to Vietnam",
    after: "32% of exports to Vietnam",
    lift: "+540%",
    years: "3 years on CSR",
    quote: "In 3 years, Vietnam rose from our 8th market to our 2nd (after the US). Huayuesc is the key channel.",
  },
  {
    name: "Monalisa Ceramic",
    loc: "Foshan",
    category: "Wall & floor tiles",
    before: "$120,000 / month",
    after: "$680,000 / month",
    lift: "+466%",
    years: "8 years on CSR",
    quote: "A chain of 24 tile dealers in Vietnam all know Monalisa through Huayuesc. It builds the brand more effectively than traditional advertising.",
  },
];

const FAQ = [
  {
    q: "I do not speak Vietnamese — is that a problem?",
    a: "No. Your Huayuesc account manager is fluent in Chinese + Vietnamese + English and bridges all communication. Your storefront is automatically translated into Vietnamese (a human translation team reviews it, not pure AI). Dealer messages come through the account manager — the supplier receives them translated and summarized.",
  },
  {
    q: "How long does a factory audit take and what does it cost?",
    a: "The on-site audit takes 1–2 days, with a total cycle of 7–15 days from scheduling. It is free on every tier — Huayuesc covers the audit team and travel costs. The supplier only needs to arrange support staff (1 QC manager + 1 production manager on the audit day). The Premium tier gets one additional free audit each year to maintain certification.",
  },
  {
    q: "I already have a storefront on Alibaba.com — do I also need Huayuesc?",
    a: "Yes, if the Vietnamese market matters to your strategy. Alibaba.com is a general global marketplace; Huayuesc is a dedicated channel for Vietnam — a different dealer profile (medium-to-large Vietnamese B2B businesses, not dropshippers), different pricing and Incoterms (strong on DDP, light on FOB), and a different trust mechanism (Trade Assurance through VN+China partner banks instead of Alipay). Many suppliers use both in parallel.",
  },
  {
    q: "How does Huayuesc make money if everything is free?",
    a: "We only charge a 1.5% fee on successful order value, through the Trade Assurance service — a fee the supplier has already included in the listed price, not a hidden one. Buyers pay VND 0. Our model is tied to the supplier's success: we only earn when the supplier has sold. If the supplier has not turned a profit, we charge nothing.",
  },
  {
    q: "How exactly does the &ldquo;No Profit, No Fee&rdquo; commitment work?",
    a: "After 12 months from a supplier's official storefront launch, if total profit from orders on Huayuesc (after deducting production, shipping, and the 1.5% fee) is not yet positive, the supplier may request one of two options: (1) a 100% refund of the Trade Assurance fees paid during those 12 months. (2) Continue free Trade Assurance for another 6 months — Huayuesc shares market risk with the supplier. This commitment is written into the service contract — it is not a marketing promise.",
  },
  {
    q: "Can I leave Huayuesc at any time?",
    a: "Yes. The supplier locks its own storefront from the dashboard, effective immediately — no long-term binding contract and no cancellation fee. Because listing is 100% free, there is nothing to refund. Orders already in Trade Assurance must complete the escrow cycle (payout or dispute resolution) before the account fully closes.",
  },
  {
    q: "Are there special legal requirements for exporting to Vietnam via Huayuesc?",
    a: "Suppliers need: (1) a GACC export license (issuing Form E for ACFTA preferences). (2) A commercial invoice and packing list meeting Vietnamese customs standards. (3) A certificate of origin (Form E or RCEP if applicable). (4) For specialized goods: quality certificates, safety data sheets (for chemicals), and inspection reports (for electrical/electronics). The Huayuesc account manager reviews the documents before each shipment — free of charge.",
  },
  {
    q: "I want to sell to Vietnamese dealers but not export directly — is there an alternative model?",
    a: "There is a 'CSR Fulfilled' model rolling out from Q3 2026: the supplier delivers goods FOB to Huayuesc Logistics in Hong Kong or Guangzhou, and Huayuesc handles all shipping + customs clearance + delivery to the Vietnamese dealer. The supplier only ships to the gateway. The logistics fee is 8–15% (by industry), with no setup fee. It is currently being piloted with 8 Premium suppliers.",
  },
  {
    q: "Is Trade Assurance mandatory?",
    a: "Strongly recommended but not mandatory. About 78% of orders on Huayuesc use Trade Assurance. Participating suppliers see higher close rates (dealers trust them 3.4× more, per internal data), especially on a first order with a new dealer. The 1.5% per-order fee is already included in the listed price, with no hidden fees.",
  },
];

function StatTile({ n, l, icon }: { n: string; l: string; icon: string }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded p-4 backdrop-blur-sm">
      <div className="text-[20px] mb-1">{icon}</div>
      <div className="text-[24px] font-extrabold leading-none">{n}</div>
      <div className="text-[11px] opacity-85 mt-1">{l}</div>
    </div>
  );
}

export default function SellOnCsrPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Sell on CSR" }]} />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #001A3F 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-brand-light blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-12 max-md:py-8">
          <span className="inline-block bg-gold text-brand-dark text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wider mb-3">
            🏭 SELL ON CSR · FOR SUPPLIERS
          </span>
          <h1 className="text-[42px] font-extrabold leading-[1.1] mb-4 max-md:text-[26px]">
            Sell B2B into Vietnam<br />
            <span className="text-gold">through the #1 dedicated platform</span>
          </h1>
          <p className="text-[15px] opacity-90 max-w-[760px] leading-relaxed mb-7 max-md:text-[13px]">
            A B2B platform dedicated to the Vietnam – China market for furniture, materials, sanitary ware, and home appliances. <b className="text-gold">Listing is 100% free</b> — we only charge once a supplier has a successful order. Our &ldquo;No Profit, No Fee&rdquo; commitment: if you have not turned a profit, Huayuesc waives all fees. 40+ partner factories have achieved 300%+ growth after 24 months with our win-win model.
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {HERO_STATS.map((s) => (
              <StatTile key={s.l} {...s} />
            ))}
          </div>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link href="/register/factory" className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]">
              🚀 Register Your Factory Now
            </Link>
            <Link href="/info/audit-process" className="px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10">
              📋 See the Audit Process
            </Link>
            <Link href="/info/contact" className="px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90">
              💬 Book a 30-Minute Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* === Why Huayuesc ============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-9">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">WHY CHOOSE HUAYUESC</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">6 Reasons 20+ Factories Choose Our Platform</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Not a global marketplace — Huayuesc is an in-depth channel for the Vietnamese market, with infrastructure and a team dedicated to every transaction.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className="bg-paper border border-line rounded p-5 hover:border-brand transition">
              <div className="text-[32px] mb-2">{v.icon}</div>
              <b className="block text-[15px] text-ink mb-2 leading-tight">{v.title}</b>
              <p className="text-[12.5px] text-mute leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Pricing philosophy ============================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">FEE POLICY · WIN-WIN MODEL</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">
            Listing is 100% free — fees apply only on a successful transaction
          </h2>
          <p className="text-[13.5px] text-mute mt-2 max-w-[760px] mx-auto leading-relaxed">
            Huayuesc connects trading parties on the principle that <b className="text-ink">everyone benefits</b>. We charge no registration fee, no audit fee, and no annual membership fee. The only fee is the 1.5% Trade Assurance fee — incurred solely when the supplier has a successful order and the dealer confirms the goods. <b className="text-ink">If the supplier has not turned a profit, Huayuesc commits to waiving all fees.</b>
          </p>
        </div>

        {/* Top callout — big "100% free" stripe */}
        <div className="rounded p-5 mb-5 border-2 border-success bg-success/5 flex items-center justify-between gap-5 max-md:flex-col max-md:text-center">
          <div className="flex items-center gap-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-success text-white flex items-center justify-center text-[26px] flex-shrink-0">
              🎁
            </div>
            <div>
              <b className="block text-[18px] text-ink leading-tight">The entire registration, audit, and listing process — 100% FREE</b>
              <p className="text-[12.5px] text-mute mt-1">
                No hidden fees, no long-term binding contract, no deposit required. Suppliers can leave the platform at any time.
              </p>
            </div>
          </div>
          <Link
            href="/register/factory"
            className="px-5 py-2.5 bg-success text-white rounded-sm font-bold text-[13px] hover:opacity-90 whitespace-nowrap"
          >
            Register Free →
          </Link>
        </div>

        {/* 3 pricing pillars */}
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {PRICING_PILLARS.map((p) => (
            <div
              key={p.headline}
              className={`bg-paper border-2 rounded p-5 flex flex-col ${
                p.accent ? "shadow-md ring-1" : ""
              }`}
              style={{
                borderColor: p.accent ? p.color : "#E5E7EB",
                ...(p.accent ? { boxShadow: `0 4px 12px ${p.color}20` } : {}),
              }}
            >
              <span
                className="inline-block self-start text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm mb-3"
                style={{ background: `${p.color}15`, color: p.color }}
              >
                {p.badge}
              </span>
              <div className="mb-3">
                <span className="text-[40px] font-extrabold leading-none" style={{ color: p.color }}>
                  {p.price}
                </span>
                <div className="text-[12px] text-mute mt-1">{p.priceSub}</div>
              </div>
              <h3 className="text-[15px] font-bold text-ink leading-tight mb-2 min-h-[3em]">
                {p.headline}
              </h3>
              <p className="text-[12px] text-mute leading-relaxed mb-4 flex-shrink-0">{p.desc}</p>
              <ul className="space-y-2 text-[12.5px] text-ink mb-1 flex-1">
                {p.items.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="flex-shrink-0" style={{ color: p.color }}>
                      ✓
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom commitment banner */}
        <div
          className="mt-5 rounded p-5 text-white max-md:p-4"
          style={{ background: "linear-gradient(135deg, #9C6A1F 0%, #7C5A1F 100%)" }}
        >
          <div className="flex items-start gap-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-white/15 border-2 border-gold flex items-center justify-center text-[26px] flex-shrink-0">
              🤝
            </div>
            <div className="flex-1">
              <b className="block text-[16px] mb-1">The &ldquo;No Profit, No Fee&rdquo; commitment — in writing in the service contract</b>
              <p className="text-[13px] opacity-90 leading-relaxed">
                If after the first 12 months a supplier has not earned a real profit from Huayuesc, we <b>refund 100% of the Trade Assurance fees</b> paid — or continue free for another 6 months to find the optimal path together. We believe a B2B platform only has value when every party wins.
              </p>
            </div>
            <Link
              href="/info/contact"
              className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm font-bold text-[13px] hover:bg-[#E8943A] whitespace-nowrap"
            >
              Talk to BD →
            </Link>
          </div>
        </div>
      </section>

      {/* === Process steps ================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">4-STEP PROCESS</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">On Average 30 Days From Registration to First Order</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Free audit, with a 1-on-1 account manager guiding you throughout, from day one to your first order.
          </p>
        </div>
        <div className="space-y-3">
          {STEPS.map((s) => (
            <article key={s.n} className="bg-paper border-l-4 rounded-r p-5 max-md:p-4" style={{ borderColor: s.color }}>
              <div className="flex gap-4 max-md:flex-col">
                <div className="flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded flex items-center justify-center font-extrabold text-white text-[20px] shadow-md"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.n}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[28px]">{s.icon}</span>
                      <div>
                        <h3 className="text-[17px] font-bold text-ink leading-tight">{s.title}</h3>
                        <span className="text-[10.5px] uppercase tracking-wider font-bold" style={{ color: s.color }}>
                          STEP {s.n}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] bg-bg border border-line px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider text-mute">
                      🕒 {s.duration}
                    </span>
                  </div>
                  <p className="text-[13px] text-mute leading-relaxed mb-3">{s.desc}</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] max-md:grid-cols-1">
                    {s.actions.map((a, i) => (
                      <li key={i} className="flex gap-2 text-ink">
                        <span style={{ color: s.color }} className="flex-shrink-0">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === Audit criteria ================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="bg-paper border border-line rounded p-6 max-md:p-4">
          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-brand font-bold">AUDIT CRITERIA</span>
              <h2 className="text-[22px] font-bold text-ink mt-1 max-md:text-[18px]">A 10-Item Criteria Set — Required + Bonus</h2>
              <p className="text-[13px] text-mute mt-1">A 32% average pass rate — a strict standard to protect Vietnamese dealers</p>
            </div>
            <Link
              href="/info/audit-process"
              className="text-[12.5px] text-brand font-semibold hover:underline whitespace-nowrap"
            >
              See the process in detail →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 max-md:grid-cols-1">
            {AUDIT_CRITERIA.map((c) => (
              <div key={c.label} className="flex items-center gap-2.5 text-[13px]">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                    c.required ? "bg-brand text-white" : "bg-bg border border-line text-mute"
                  }`}
                >
                  {c.required ? "✓" : "+"}
                </span>
                <span className="text-ink flex-1">{c.label}</span>
                {c.required ? (
                  <span className="text-[10px] text-accent font-bold">REQUIRED</span>
                ) : (
                  <span className="text-[10px] text-mute2">BONUS</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Marketing tools ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">MARKETING TOOLS</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">Huayuesc Actively Pushes Suppliers to Dealers</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            More than a passive storefront — we run 6 active marketing channels that put suppliers in front of the right dealers with real demand.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {MARKETING_TOOLS.map((m) => (
            <div key={m.title} className="bg-paper border border-line rounded p-5 hover:border-brand transition">
              <div className="text-[28px] mb-2">{m.icon}</div>
              <b className="block text-[15px] text-ink mb-2 leading-tight">{m.title}</b>
              <p className="text-[12.5px] text-mute leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Success stories ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">SUCCESS STORIES</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">6 Long-Standing Partner Factories — Real Numbers</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Shared directly by the directors of factories that have worked with Huayuesc for 3 to 8 years.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {STORIES.map((s) => (
            <article key={s.name} className="bg-paper border border-line rounded p-5">
              <div className="flex justify-between items-start mb-2 flex-wrap gap-1">
                <b className="text-[14.5px] text-ink leading-tight">{s.name}</b>
                <span className="text-[10.5px] text-mute2 whitespace-nowrap">{s.years}</span>
              </div>
              <div className="flex justify-between text-[11.5px] text-mute mb-3 flex-wrap gap-1">
                <span>📍 {s.loc}</span>
                <span>· {s.category}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-line text-[12px]">
                <div>
                  <div className="text-mute text-[10.5px] uppercase tracking-wider">Before CSR</div>
                  <b className="text-ink text-[12.5px]">{s.before}</b>
                </div>
                <div>
                  <div className="text-mute text-[10.5px] uppercase tracking-wider">After CSR</div>
                  <b className="text-success text-[12.5px]">{s.after}</b>
                </div>
              </div>
              <div className="mt-2 text-center bg-success/10 border border-success/25 text-success font-bold py-1.5 rounded-sm text-[13px]">
                {s.lift}
              </div>
              <p className="text-[11.5px] text-mute italic mt-3 leading-relaxed border-l-2 border-gold pl-2.5">
                &ldquo;{s.quote}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* === FAQ =========================================================== */}
      <section className="max-w-[900px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">The 8 Most Important Supplier Questions</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Compiled from interviews with registered suppliers and 20+ existing partners over the past 12 months.
          </p>
        </div>
        <div className="space-y-2">
          {FAQ.map((f, i) => (
            <details key={i} className="group bg-paper border border-line rounded">
              <summary className="cursor-pointer px-4 py-3 flex justify-between items-center gap-3 list-none">
                <b className="text-[13.5px] text-ink flex-1">{f.q}</b>
                <span className="text-mute group-open:rotate-180 transition-transform text-[12px]">▾</span>
              </summary>
              <div className="px-4 pb-4 pt-1 text-[13px] text-mute leading-relaxed border-t border-line">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* === Final CTA ====================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 mb-10">
        <div
          className="rounded p-8 text-white text-center max-md:p-5"
          style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #001A3F 100%)" }}
        >
          <h3 className="text-[30px] font-extrabold mb-3 max-md:text-[22px]">
            Ready to grow your Vietnam export revenue?
          </h3>
          <p className="text-[14px] opacity-90 mb-6 max-w-[680px] mx-auto leading-relaxed">
            Free registration, free audit. On average 30 days to launch your storefront and receive your first order. 20+ suppliers have chosen Huayuesc — no hidden transaction fees, with 1-on-1 bilingual Chinese – Vietnamese account management.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/register/factory"
              className="inline-block px-8 py-3.5 bg-gold text-brand-dark rounded-sm font-bold text-[15px] hover:bg-[#E8943A]"
            >
              🚀 Register Your Factory Now
            </Link>
            <Link
              href="/info/contact"
              className="inline-block px-8 py-3.5 border-2 border-white/40 text-white rounded-sm font-bold text-[15px] hover:bg-white/10"
            >
              💬 Book a 30-Minute Consultation
            </Link>
          </div>
          <div className="mt-6 pt-5 border-t border-white/15 text-[12px] opacity-80 flex justify-center gap-5 flex-wrap">
            <span>📞 +86 20 8888 1234 (Guangzhou)</span>
            <span>📞 +84 24 3556 7788 (Hanoi)</span>
            <span>✉ supplier@huayuesc.vn</span>
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "Sell on CSR — Sell B2B Into Vietnam Through Huayuesc",
  description:
    "A B2B platform dedicated to the Vietnam – China market. Verified Vietnamese distribution partners and dealers, Trade Assurance through partner banks in Vietnam and China, and bilingual Chinese – Vietnamese account management. 20+ suppliers registered, free audit, 30 days from registration to first order.",
};
