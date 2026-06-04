import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { COMPANY } from "@/data/company";

// ─── DATA ────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { n: "63", l: "Provinces in Vietnam", icon: "🇻🇳" },
  { n: "3", l: "Core China clusters", icon: "🇨🇳" },
  { n: "4", l: "Distribution partner types", icon: "🤝" },
  { n: "2", l: "Operating offices", icon: "🏢" },
];

const DISTRIBUTION_PARTNERS = [
  {
    icon: "🏪",
    color: "#005F6B",
    title: "Building Materials Dealers",
    summary: "Store chains, tile showrooms, materials warehouses",
    desc: "Dealers of porcelain tile, sanitaryware, cladding stone, paint and wood flooring across provinces and cities.",
    benefits: [
      "DDP price delivered to warehouse",
      "Warranty from the original factory",
      "Returns and exchanges handled by the Hanoi team",
      "Catalog and samples in Vietnamese",
    ],
  },
  {
    icon: "🏗",
    color: "#9C6A1F",
    title: "Construction Contractors",
    summary: "Construction companies, property contractors, social housing",
    desc: "Project-based quotes, delivery aligned to the construction schedule, free samples on orders of 30 sets or more.",
    benefits: [
      "Turnkey project quotations",
      "Phased delivery by construction schedule",
      "Free samples on orders of 30 sets or more",
      "Warranty and returns handled by Huayue",
    ],
  },
  {
    icon: "🎨",
    color: "#7C2D12",
    title: "Interior Design Firms",
    summary: "Design studios, interior design",
    desc: "Vietnamese-language catalogs plus free 3D visuals for VIP clients with orders of 30 sets or more.",
    benefits: [
      "Vietnamese catalogs for China brands",
      "Real wood/stone/fabric samples",
      "Free 3D visuals for VIP clients",
      "Preferential discounts on turnkey projects",
    ],
  },
  {
    icon: "🔌",
    color: "#7C3AED",
    title: "Appliance & Kitchen Equipment Dealers",
    summary: "Appliance chains, regional dealers",
    desc: "Electric water heaters, gas cooktops, range hoods and smart toilet seats.",
    benefits: [
      "Exclusive regional dealership contracts",
      "Genuine China manufacturer warranty",
      "Point-of-sale marketing support",
      "Better landed cost than self-importing distributors",
    ],
  },
];

const CN_CLUSTERS = [
  {
    province: "Guangdong",
    provinceCn: "广东省",
    color: "#C8102E",
    weight: "Primary cluster",
    cities: [
      { name: "Foshan (佛山)", spec: "Ceramics, sanitaryware, porcelain tile — 1,200+ factories" },
      { name: "Lecong / Shunde (乐从顺德)", spec: "Sofas, wood furniture — China's largest furniture market" },
      { name: "Dongguan (东莞)", spec: "Kitchen cabinets, wardrobes, premium MDF" },
      { name: "Zhongshan (中山)", spec: "LED lighting, home appliances" },
      { name: "Chaozhou (潮州)", spec: "Decorative ceramic tile" },
    ],
  },
  {
    province: "Fujian",
    provinceCn: "福建省",
    color: "#0E7490",
    weight: "Secondary cluster",
    cities: [
      { name: "Jinjiang (晋江)", spec: "Natural stone, engineered wood flooring" },
      { name: "Xiamen (厦门)", spec: "Processed imported timber" },
    ],
  },
  {
    province: "Shandong + Others",
    provinceCn: "山东省",
    color: "#475569",
    weight: "Supplementary",
    cities: [
      { name: "Yongkang (永康)", spec: "Machinery, hardware" },
      { name: "Qinhuangdao (秦皇岛)", spec: "Construction glass" },
      { name: "Midea (美的 Zhongshan)", spec: "Premium home appliances" },
    ],
  },
];

const PARTNERSHIP_MECHANISMS = [
  {
    icon: "📚",
    title: "Bilingual Chinese–Vietnamese Catalogs",
    desc: "Huayue translates and publishes China brand catalogs into Vietnamese, ready for dealers to print or share with customers.",
  },
  {
    icon: "🎤",
    title: "New Product Launch Conferences",
    desc: "Held annually in Hanoi and Ho Chi Minh City, inviting China brands to unveil new products and connect directly with property developers, contractors and design firms.",
  },
  {
    icon: "💡",
    title: "Topical Forums",
    desc: "Eco-friendly building materials, home appliance technology and new porcelain tile innovations — meet experts from both countries.",
  },
  {
    icon: "📢",
    title: "Online + Offline Media",
    desc: "Campaigns promoting China brands in Vietnamese trade press, on Facebook/Zalo and at live events — bringing brands to local buyers.",
  },
  {
    icon: "✈",
    title: "China Factory Tours",
    desc: "Vietnamese buyer delegations visit factories 2–4 times a year: Canton Fair (April & October), CIFF (March & September), Foshan Pottery (April & October). Huayue organizes the full package.",
  },
];

const TRADE_FAIRS = [
  { month: "Mar", name: "CIFF Guangzhou", desc: "China International Furniture Fair — furniture industry", color: "#005F6B" },
  { month: "Apr", name: "Canton Fair Phase 1-3", desc: "China's largest B2B trade fair", color: "#C8102E" },
  { month: "Apr", name: "Foshan Pottery Show", desc: "Specializing in porcelain tile and sanitaryware", color: "#9C6A1F" },
  { month: "Jun", name: "VIETBUILD HCMC", desc: "Vietnam building materials fair — Huayue invites a China factory delegation", color: "#7C3AED" },
  { month: "Sep", name: "CIFF Shanghai", desc: "CIFF session 2 — larger in scale than Guangzhou", color: "#005F6B" },
  { month: "Oct", name: "Canton Fair Autumn", desc: "Autumn session — diverse product categories", color: "#C8102E" },
  { month: "Oct", name: "Foshan Pottery Autumn", desc: "Autumn session — new ceramics collections", color: "#9C6A1F" },
  { month: "Nov", name: "VIETBUILD Hanoi", desc: "Northern Vietnam session", color: "#7C3AED" },
];

const BUYER_BENEFITS = [
  { icon: "💰", title: "True Factory-Gate Pricing", desc: "No middlemen, no hidden markups, with a full audit trail from the factory." },
  { icon: "✅", title: "Quality Inspected at Source", desc: "Huayue's Guangzhou QC team performs AQL 2.5 inspection before shipment." },
  { icon: "🚛", title: "Turnkey DDP to Vietnam", desc: "Includes logistics, customs clearance, duties and delivery to your warehouse. No worrying about booking vessels or customs." },
  { icon: "🇻🇳", title: "Vietnamese-Language Support", desc: "All communication handled by the Hanoi team — no Chinese required." },
  { icon: "🎁", title: "Free Samples & 3D", desc: "On orders of 30 sets or more — invest upfront to lock in the right design." },
  { icon: "📊", title: "Market Updates", desc: "Monthly factory price reports, CNY/VND exchange rates and new tax policies." },
];

const FAQS = [
  {
    q: "I want to become a Huayue distribution dealer in my province — what is the process?",
    a: "Email partnership@huayuesc.vn with your business license, details of your existing showroom/warehouse, the category you currently distribute (building materials / furniture / appliances) and your coverage area. The Huayue Hanoi team will call you within 5 business days and can visit in person if needed. After verification, you sign a dealership contract — no membership fee, just commission shared by sales volume.",
  },
  {
    q: "I am a construction contractor — what support does Huayue offer for my projects?",
    a: "Huayue provides DDP quotes delivered to the job site for building materials and interior finishes (tile, sanitaryware, cladding stone, paint, wood flooring). Support includes free samples on orders of 30 sets or more, delivery aligned to the construction schedule, and warranty from the original factory plus Huayue's responsibility for returns on defects. Contact sales@huayuesc.vn or +86 181-2225-6999.",
  },
  {
    q: "I run an interior design firm — are there offers for my VIP clients?",
    a: "Yes. Huayue offers a partnership package for design firms: Vietnamese catalogs for China brands, wood/stone/fabric samples, free 3D visual support for premium clients (orders of 30 sets or more) and preferential discounts on turnkey projects.",
  },
  {
    q: "I want to visit factories in China — does Huayue organize delegations?",
    a: "Yes. Huayue organizes Vietnamese buyer delegations to the Canton Fair (April and October), CIFF Guangzhou (March and September) and the Foshan Pottery Show (April and October). Each delegation has 10–25 buyers, with industry interpreters and the Huayue Guangzhou sourcing team to host you. Book factory business matching ahead of the trip. Contact partnership@huayuesc.vn.",
  },
  {
    q: "Why should I buy through Huayue instead of going to China myself or buying through a broker?",
    a: "Going to China yourself means you need to speak Chinese, know the market, have factory relationships and handle logistics and customs. Buying through a broker means no quality control at source, vulnerability to hidden markups and no clear legal standing. With Huayue: a registered Vietnamese legal entity (Tax ID 0111453693), goods inspected at the factory before shipment, DDP delivery to your warehouse, 24/7 Vietnamese-language support and Trade Assurance — you are refunded if goods do not match what was promised.",
  },
];

// ─── PAGE ────────────────────────────────────────────────────────────────

export default function NetworkPage() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Information", href: "/help" },
          { label: "Partner Network" },
        ]}
      />

      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #003A42 100%)" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-12 max-md:py-8 grid grid-cols-[auto_1fr] gap-8 items-center max-md:grid-cols-1 max-md:gap-4">
          <div className="w-24 h-24 rounded-2xl bg-gold/20 border-2 border-gold flex items-center justify-center text-[52px] flex-shrink-0 max-md:w-16 max-md:h-16 max-md:text-[36px]">
            🤝
          </div>
          <div>
            <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">
              PARTNER NETWORK
            </span>
            <h1 className="text-[34px] font-extrabold leading-tight mb-3 max-md:text-[22px]">
              Partner Network — Vietnam Distribution &amp; China Factories
            </h1>
            <p className="text-[14.5px] opacity-90 leading-relaxed max-w-[820px] max-md:text-[13px]">
              Huayue builds its supply chain on two complementary networks:
              <b className="text-gold"> distribution partners across 63 provinces in Vietnam</b> (the output) and{" "}
              <b className="text-gold">leading factories in China's manufacturing clusters</b> (the input).
              This is how Huayue delivers
              <i> localized distribution channel expansion</i> alongside <i>source-vetted procurement</i>, per the brochure.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 bg-black/15">
          <div className="max-w-[1200px] mx-auto px-4 py-4 grid grid-cols-4 gap-3 max-md:grid-cols-2 max-md:py-3">
            {HERO_STATS.map((s) => (
              <div key={s.l} className="text-center border-r border-white/15 last:border-r-0 max-md:border-r-0 max-md:py-1.5">
                <div className="text-[20px] mb-0.5">{s.icon}</div>
                <b className="block text-[22px] text-gold leading-none max-md:text-[18px]">{s.n}</b>
                <small className="text-[11px] opacity-80 uppercase tracking-wider">{s.l}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TWO NETWORKS DIAGRAM ═══════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-8 max-md:mt-5">
        <div className="text-center mb-6">
          <h2 className="text-[24px] font-bold text-ink mb-1.5 max-md:text-[20px]">
            Two networks — one supply chain
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            Vetted China factories ⇄ Vietnam distribution partners — Huayue is the bridge
          </p>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-stretch max-md:grid-cols-1">
          {/* CN side */}
          <div className="bg-paper border-2 border-line rounded-lg p-6 max-md:p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[32px]">🇨🇳</span>
              <div>
                <b className="block text-[17px] text-ink leading-tight">Input — China</b>
                <small className="text-[11.5px] text-mute">Guangzhou Office</small>
              </div>
            </div>
            <p className="text-[13px] text-ink/80 mb-3 leading-relaxed">
              The Huayue sourcing team (3rd Floor, Shuyu Chuangxing Port 数娱创兴港 — Haizhu, Guangzhou) screens and audits partner factories across the 3 main clusters.
            </p>
            <ul className="space-y-1.5 text-[12.5px] text-ink/85">
              <li className="flex gap-2"><span className="text-success">●</span> Sourcing &amp; source vetting (源头精选)</li>
              <li className="flex gap-2"><span className="text-success">●</span> AQL 2.5 QC before shipment</li>
              <li className="flex gap-2"><span className="text-success">●</span> On-site audits every 12 months</li>
              <li className="flex gap-2"><span className="text-success">●</span> Interpreting &amp; trade-association relationships</li>
            </ul>
          </div>

          {/* Bridge */}
          <div className="flex items-center justify-center max-md:py-2">
            <div className="bg-brand text-white px-4 py-6 rounded-lg text-center max-md:py-3 max-md:w-full">
              <div className="text-[40px] mb-1 max-md:text-[28px]">🚢</div>
              <b className="block text-[13px] leading-tight">Huayue</b>
              <small className="text-[10.5px] opacity-85">Logistics + DDP Customs Clearance</small>
            </div>
          </div>

          {/* VN side */}
          <div className="bg-paper border-2 border-line rounded-lg p-6 max-md:p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[32px]">🇻🇳</span>
              <div>
                <b className="block text-[17px] text-ink leading-tight">Output — Vietnam</b>
                <small className="text-[11.5px] text-mute">Hanoi Headquarters</small>
              </div>
            </div>
            <p className="text-[13px] text-ink/80 mb-3 leading-relaxed">
              Headquarters at Bao Ngoc Building, Xuan Phuong, Hanoi — warehousing, customs clearance and distribution to 63 provinces across Vietnam.
            </p>
            <ul className="space-y-1.5 text-[12.5px] text-ink/85">
              <li className="flex gap-2"><span className="text-accent">●</span> Building materials &amp; furniture dealers</li>
              <li className="flex gap-2"><span className="text-accent">●</span> Construction contractors &amp; interior designers</li>
              <li className="flex gap-2"><span className="text-accent">●</span> Appliance &amp; kitchen equipment dealers</li>
              <li className="flex gap-2"><span className="text-accent">●</span> Warehouse + VNACCS customs clearance in Hanoi</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ 4 DISTRIBUTION PARTNER TYPES ═════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
        <div className="text-center mb-6">
          <span className="inline-block bg-accent/10 text-accent px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
            OUTPUT — VIETNAM
          </span>
          <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
            Four distribution partner types
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            Each type has its own support program — commission shared by sales volume, no membership fee
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {DISTRIBUTION_PARTNERS.map((p) => (
            <div key={p.title} className="bg-paper border border-line rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="px-5 py-3 text-white flex items-center gap-3" style={{ backgroundColor: p.color }}>
                <span className="text-[28px]">{p.icon}</span>
                <div>
                  <b className="block text-[15px] leading-tight">{p.title}</b>
                  <small className="text-[11px] opacity-90">{p.summary}</small>
                </div>
              </div>
              <div className="p-5 max-md:p-4">
                <p className="text-[13px] text-ink/85 mb-3 leading-relaxed">{p.desc}</p>
                <ul className="space-y-1.5">
                  {p.benefits.map((b) => (
                    <li key={b} className="text-[12.5px] text-ink/85 flex gap-2">
                      <span className="text-success font-bold flex-shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3 CHINA CLUSTERS MAP ═════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
        <div className="text-center mb-6">
          <span className="inline-block bg-brand/10 text-brand px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
            INPUT — CHINA
          </span>
          <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
            Three core factory clusters
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            Huayue's Guangzhou office connects directly with China's manufacturing capitals
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {CN_CLUSTERS.map((c) => (
            <div key={c.province} className="bg-paper border border-line rounded-lg overflow-hidden">
              <div className="px-5 py-4 text-white" style={{ backgroundColor: c.color }}>
                <small className="text-[10px] uppercase tracking-wider opacity-85">{c.weight}</small>
                <b className="block text-[18px] leading-tight mt-0.5">{c.province}</b>
                <span className="text-[12px] opacity-90 italic">{c.provinceCn}</span>
              </div>
              <ul className="divide-y divide-line">
                {c.cities.map((city) => (
                  <li key={city.name} className="px-4 py-2.5">
                    <b className="block text-[13px] text-ink leading-tight">{city.name}</b>
                    <span className="text-[11.5px] text-mute leading-snug">{city.spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PARTNERSHIP MECHANISMS ═══════════════════════════════════ */}
      <section className="bg-bg mt-10 py-10 max-md:py-7 max-md:mt-7">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
              Partnership mechanisms
            </h2>
            <p className="text-[13px] text-mute max-md:text-[12px]">
              Per the brochure sections <i>'Trade Exhibition Services'</i> and <i>'Market Promotion'</i>
            </p>
          </div>
          <div className="grid grid-cols-5 gap-3 max-lg:grid-cols-3 max-md:grid-cols-1">
            {PARTNERSHIP_MECHANISMS.map((m) => (
              <div key={m.title} className="bg-paper border border-line rounded-lg p-4 text-center hover:border-brand hover:shadow-sm transition-all">
                <div className="text-[38px] mb-2">{m.icon}</div>
                <b className="block text-[13.5px] text-ink mb-2 leading-tight">{m.title}</b>
                <p className="text-[11.5px] text-mute leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRADE FAIR CALENDAR ══════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
        <div className="text-center mb-6">
          <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
            Annual trade fairs Huayue attends
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            Huayue buyer delegations get a schedule, industry interpreters and airport pickup
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {TRADE_FAIRS.map((f, i) => (
            <div key={i} className="bg-paper border border-line rounded-lg overflow-hidden flex">
              <div className="px-3 py-3 text-white font-bold text-[15px] flex items-center justify-center min-w-[58px]" style={{ backgroundColor: f.color }}>
                {f.month}
              </div>
              <div className="p-3 flex-1">
                <b className="block text-[13px] text-ink mb-0.5 leading-tight">{f.name}</b>
                <span className="text-[11px] text-mute leading-snug">{f.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ BUYER BENEFITS ═══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
        <div className="bg-paper border border-line rounded-lg p-6 max-md:p-4">
          <div className="text-center mb-5">
            <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
              Benefits for buyers &amp; Vietnam distribution partners
            </h2>
            <p className="text-[13px] text-mute max-md:text-[12px]">
              Compared with sourcing directly yourself or buying through an unregulated broker
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {BUYER_BENEFITS.map((b) => (
              <div key={b.title} className="border border-line rounded p-4 hover:border-brand hover:bg-bg transition">
                <div className="text-[24px] mb-1.5">{b.icon}</div>
                <b className="block text-[13.5px] text-ink mb-1">{b.title}</b>
                <p className="text-[12px] text-mute leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PULL QUOTE ═══════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-4 mt-10 max-md:mt-7">
        <blockquote className="bg-bg border-l-4 border-gold rounded-r-lg px-6 py-5 max-md:px-4 max-md:py-4">
          <p className="text-[16px] text-ink italic leading-relaxed max-md:text-[14px]">
            "Huayue is not a product-listing marketplace — we are a supply chain. Goods move through real warehouses, real containers and a real customs team. The partner network is the lifeblood of the operation: take one side away and the chain breaks."
          </p>
          <footer className="mt-3 text-[12.5px] text-mute not-italic">— Partnership Team, Huayue Vietnam</footer>
        </blockquote>
      </section>

      {/* ═══ FAQ ═════════════════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-4 mt-10 max-md:mt-7">
        <h2 className="text-[22px] font-bold text-ink mb-4 flex items-center gap-2 max-md:text-[18px]">
          <span>❓</span> Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {FAQS.map((f, i) => (
            <details key={i} {...(i === 0 ? { open: true } : {})} className="border border-line rounded-lg group/faq bg-paper">
              <summary className="px-4 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden flex justify-between items-center hover:bg-bg">
                <b className="text-[13.5px] text-ink leading-snug pr-3">{f.q}</b>
                <span className="text-mute2 text-[14px] group-open/faq:rotate-180 transition-transform flex-shrink-0">▾</span>
              </summary>
              <p className="px-4 pb-4 pt-3 text-[13px] text-ink/85 leading-relaxed border-t border-line">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═════════════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 my-10 max-md:my-7">
        <div
          className="rounded-lg p-7 text-white max-md:p-5"
          style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 60%, #003A42 100%)" }}
        >
          <div className="grid grid-cols-[1fr_auto] gap-5 items-center max-md:grid-cols-1">
            <div>
              <span className="inline-block bg-gold text-brand-dark px-2 py-0.5 text-[10px] font-bold rounded-sm tracking-wider mb-2">
                PARTNER CONTACT
              </span>
              <b className="block text-[20px] mb-1.5 max-md:text-[17px]">Become a Huayue distribution partner</b>
              <p className="text-[13px] opacity-90 leading-relaxed max-md:text-[12.5px]">
                Building materials dealers, construction contractors, interior design firms or appliance dealers — send your business license and showroom/warehouse details. The Huayue Hanoi team will be in touch within 5 business days.
              </p>
              <p className="text-[12px] opacity-80 mt-2">
                📞 {COMPANY.contact.hotline} · ✉ <a href={`mailto:${COMPANY.contact.emails.partnership}`} className="underline hover:text-gold">{COMPANY.contact.emails.partnership}</a>
              </p>
            </div>
            <div className="flex flex-col gap-2 max-md:w-full">
              <a
                href={`mailto:${COMPANY.contact.emails.partnership}?subject=Huayue%20distribution%20partner%20application`}
                className="px-5 py-2.5 bg-gold text-brand-dark rounded font-bold text-[13px] hover:bg-[#E8943A] cursor-pointer text-center whitespace-nowrap"
              >
                ✉ Send Application
              </a>
              <Link
                href="/info/contact"
                className="px-5 py-2.5 border-2 border-white/40 text-white rounded font-bold text-[13px] hover:bg-white/10 cursor-pointer text-center whitespace-nowrap"
              >
                📍 View Offices
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "Partner Network — Huayuesc 华越供应链",
  description:
    "Huayue connects leading factories in Guangdong, Fujian and Shandong with 4 types of distribution partners in Vietnam: building materials dealers, construction contractors, interior design firms and appliance dealers. Coverage across 63 provinces, with 2 operating offices in Hanoi and Guangzhou.",
};
