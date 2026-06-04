import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { COMPANY } from "@/data/company";

// ─── DATA ─────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { n: "3", l: "Specialized industries", icon: "🎯" },
  { n: "4", l: "Core services", icon: "⚙️" },
  { n: "2", l: "Operating offices", icon: "🏢" },
  { n: "20+", l: "Audited suppliers", icon: "🏭" },
];

const CORE_SERVICES = [
  {
    icon: "🔍",
    color: "#005F6B",
    image: "/img/sol-hubs.jpg?v=5",
    cn: "源头精选与采购支持",
    title: "Source Vetting & Procurement Support",
    desc: "Screening competitive Chinese suppliers, controlling quality at the factory, and managing orders with centralized procurement — minimizing both cost and procurement risk.",
  },
  {
    icon: "📦",
    color: "#9C6A1F",
    image: "/img/sol-mei.jpg?v=5",
    cn: "中国境内仓储与集运",
    title: "China Warehousing & Consolidated Shipping",
    desc: "Building or partnering with modern warehouses in China's key industrial parks and ports, providing safe and efficient warehouse management services.",
  },
  {
    icon: "🚢",
    color: "#C8102E",
    image: "/img/hero-ddp-logistics.jpg?v=5",
    cn: "跨境物流与高效清关",
    title: "Cross-Border Logistics & Efficient Customs Clearance",
    desc: "Door-to-door and port-to-port; Huayue's customs team works with Hai Phong port and knows import/export law inside out, ensuring fast, compliant and cost-effective clearance.",
  },
  {
    icon: "🤝",
    color: "#7C3AED",
    image: "/img/sol-expo.jpg?v=5",
    cn: "本地化分销渠道拓展",
    title: "Vietnam Distribution Channel Development",
    desc: "An extensive partner network across Vietnam — bringing Chinese brands and products into the main distribution channels across 63 provinces.",
  },
];

const INDUSTRIES = [
  {
    badge: "01",
    cn: "建材",
    title: "Building Materials",
    color: "#C8102E",
    image: "/img/cer1.jpg?v=5",
    examples: [
      "Porcelain ceramic tile",
      "Sanitaryware",
      "Hardware & metal fittings",
      "Door materials & profiles",
      "Paint & coatings",
      "Water pipes & fittings",
      "Lighting fixtures",
    ],
    extraImages: ["/img/cer2.jpg?v=5", "/img/cer3.jpg?v=5", "/img/cer6.jpg?v=5"],
  },
  {
    badge: "02",
    cn: "装饰材料",
    title: "Interior Decoration Materials",
    color: "#9C6A1F",
    image: "/img/fur1.jpg?v=5",
    examples: [
      "Wallpaper / wall fabric",
      "Engineered / solid wood flooring",
      "Ceiling decoration materials",
      "Natural & artificial stone",
      "Home decor items",
    ],
    extraImages: ["/img/fur2.jpg?v=5", "/img/fur3.jpg?v=5", "/img/fur7.jpg?v=5"],
  },
  {
    badge: "03",
    cn: "厨卫小家电",
    title: "Kitchen & Bathroom Appliances",
    color: "#7C3AED",
    image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5",
    examples: [
      "Electric water heaters",
      "Gas cooktops",
      "Range hoods",
      "Rice cookers",
      "High-speed blenders",
      "Smart toilet seats",
    ],
    extraImages: [
      "/img/kitchen-equipment-sc-prod-1.jpg?v=5",
      "/img/kitchen-equipment-sc-prod-2.jpg?v=5",
      "/img/kitchen-equipment-sc-prod-3.jpg?v=5",
    ],
  },
];

const WAREHOUSE_TYPES = [
  {
    cn: "常温仓储区",
    title: "Ambient-Temperature Warehouse",
    desc: "General goods — ceramics, appliances, decoration materials",
    image: "/img/sol-hubs.jpg?v=5",
  },
  {
    cn: "易燃品库",
    title: "Flammable-Goods Warehouse",
    desc: "Paint, solvents, thinners — fire-safety compliant",
    image: "/img/son-epoxy-san.jpg?v=5",
  },
  {
    cn: "恒温恒湿库",
    title: "Climate-Controlled Warehouse",
    desc: "Sensitive electronics, premium products",
    image: "/img/sol-mei.jpg?v=5",
  },
];

const LOGISTICS_FLOW = [
  { icon: "📥", cn: "卸货平台", title: "Unloading Dock", desc: "Container-standard" },
  { icon: "📦", cn: "分拣打包台", title: "Sorting & Packing", desc: "By SKU and destination" },
  { icon: "🚛", cn: "合作物流驻点", title: "Logistics Partners", desc: "COSCO, MSC, OOCL stationed on-site at the warehouse" },
];

const DIGITAL_PILLARS = [
  {
    icon: "📊",
    cn: "数据驱动决策",
    title: "Data-Driven Decisions",
    desc: "Big-data analytics to forecast market demand and optimize inventory.",
    benefit: "Higher business revenue",
    color: "#005F6B",
  },
  {
    icon: "🤖",
    cn: "智能自动化",
    title: "Intelligent Automation",
    desc: "AI algorithms automatically process orders, coordinate shipping and optimize logistics routes.",
    benefit: "Lower operating costs",
    color: "#9C6A1F",
  },
  {
    icon: "🔗",
    cn: "协同网络",
    title: "Collaborative Network",
    desc: "A platform linking all suppliers, manufacturers, shipping companies and end retail channels.",
    benefit: "Improved capital efficiency",
    color: "#7C3AED",
  },
];

const PROMOTION_IMAGES = [
  "/img/sol-expo.jpg?v=5",
  "/img/sub-expo1.jpg?v=5",
  "/img/sub-expo3.jpg?v=5",
  "/img/sol-mei.jpg?v=5",
  "/img/hero-factory-tour.jpg?v=5",
  "/img/sol-custom.jpg?v=5",
];

// ─── PAGE ─────────────────────────────────────────────────────────────────

export default function AboutUsPage() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Information", href: "/help" },
          { label: "About Us" },
        ]}
      />

      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/img/heroint.jpg?v=5"
            alt="Container ship — Huayue China–Vietnam supply chain"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, rgba(0,37,87,0.95) 0%, rgba(0,95,107,0.85) 50%, rgba(200,16,46,0.5) 100%)",
            }}
          />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-16 max-md:py-10 text-white">
          <span className="inline-block bg-gold text-brand-dark px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-4">
            ABOUT HUAYUE · 关于我们
          </span>
          <div className="grid grid-cols-[1fr_auto] gap-8 items-end max-md:grid-cols-1 max-md:gap-5">
            <div>
              <h1 className="text-[38px] font-extrabold leading-tight mb-3 max-md:text-[24px]">
                {COMPANY.brandShort}{" "}
                <span className="text-gold">{COMPANY.brandCn}</span>
              </h1>
              <p className="text-[18px] font-bold leading-snug mb-2 text-gold max-md:text-[15px]">
                {COMPANY.visionCn}
              </p>
              <p className="text-[14.5px] leading-relaxed opacity-95 max-w-[760px] italic max-md:text-[12.5px]">
                {COMPANY.visionVi}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-5 py-4 text-center min-w-[200px] max-md:w-full">
              <div className="text-[11px] uppercase tracking-wider opacity-80 mb-1">
                Legal Name
              </div>
              <b className="block text-[14px] leading-tight text-gold mb-2">
                Huayue Supply Chain (Vietnam) Co., Ltd.
              </b>
              <div className="text-[11.5px] opacity-90 leading-snug">
                Tax ID: <b>{COMPANY.taxId}</b>
                <br />
                Domain: <b>{COMPANY.domain}</b>
              </div>
            </div>
          </div>
        </div>
        <div className="relative border-t border-white/15 bg-black/30">
          <div className="max-w-[1200px] mx-auto px-4 py-3.5 grid grid-cols-4 gap-3 text-white max-md:grid-cols-2 max-md:gap-2 max-md:py-3">
            {HERO_STATS.map((s) => (
              <div key={s.l} className="text-center border-r border-white/15 last:border-r-0 max-md:border-r-0">
                <div className="text-[18px] mb-0.5">{s.icon}</div>
                <b className="block text-[22px] text-gold leading-none max-md:text-[18px]">{s.n}</b>
                <small className="text-[10.5px] opacity-80 uppercase tracking-wider">{s.l}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GIỚI THIỆU CÔNG TY ═══════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-6">
        <div className="grid grid-cols-[1fr_1.2fr] gap-8 items-center max-md:grid-cols-1 max-md:gap-5">
          <div className="relative">
            <img
              src="/img/hero-buyer-promo.jpg?v=5"
              alt="About Huayue — China–Vietnam supply chain"
              className="w-full aspect-[4/5] object-cover rounded-lg shadow-lg max-md:aspect-[16/10]"
            />
            <div className="absolute -bottom-4 -right-4 bg-brand text-white px-4 py-3 rounded-lg shadow-lg max-md:relative max-md:-bottom-0 max-md:-right-0 max-md:mt-3 max-md:inline-block">
              <span className="text-[10.5px] uppercase tracking-wider opacity-80">Core Message</span>
              <b className="block text-gold text-[14px] mt-0.5">
                {COMPANY.taglineCn}
              </b>
            </div>
          </div>
          <div>
            <span className="inline-block bg-accent/10 text-accent px-2.5 py-0.5 text-[11px] font-bold rounded-sm tracking-wider mb-2">
              企业介绍 · COMPANY PROFILE
            </span>
            <h2 className="text-[28px] font-extrabold text-ink leading-tight mb-2 max-md:text-[22px]">
              引领中越建材家居贸易新通路
            </h2>
            <p className="text-[15px] text-mute font-semibold mb-4 max-md:text-[13px]">
              Opening a new trade route — bringing building materials, furniture and home appliances from China to Vietnam.
            </p>
            <p className="text-[14px] text-ink leading-relaxed mb-3 max-md:text-[13px]">
              <b>Huayue</b> is a one-stop supply chain service provider specializing in exporting high-quality building materials, decoration materials and kitchen and bathroom appliances from China into the Vietnamese market.
            </p>
            <p className="text-[14px] text-ink leading-relaxed mb-4 max-md:text-[13px]">
              We integrate everything from procurement, warehousing, logistics and customs clearance to distribution and localized marketing — delivering to customers a <b className="text-brand">turnkey supply chain from the China factory to the final point of consumption in Vietnam</b>.
            </p>
            <blockquote className="border-l-4 border-gold bg-bg pl-4 py-2 italic text-[13.5px] text-ink leading-relaxed">
              "从中国工厂到越南终端，华越让跨境供应链更简单、更高效"
              <br />
              <span className="text-mute not-italic text-[12px]">
                From the China factory to the Vietnam end customer — Huayue makes the cross-border supply chain simpler and more efficient.
              </span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ═══ 4 DỊCH VỤ TRỌNG TÂM ═══════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 max-md:mt-8">
        <div className="text-center mb-8">
          <span className="inline-block bg-brand/10 text-brand px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
            核心业务 · CORE SERVICES
          </span>
          <h2 className="text-[26px] font-extrabold text-ink leading-tight mb-1.5 max-md:text-[20px]">
            Four core services — a turnkey supply chain
          </h2>
          <p className="text-[14px] text-mute italic max-md:text-[12.5px]">
            全链条一站式服务 · A complete end-to-end supply chain
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-3">
          {CORE_SERVICES.map((s, i) => (
            <div key={s.title} className="bg-paper border border-line rounded-lg overflow-hidden flex hover:shadow-lg transition-shadow max-md:flex-col">
              <div className="w-[140px] flex-shrink-0 relative max-md:w-full max-md:aspect-[16/9]">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${s.color}90 0%, transparent 100%)` }} />
                <div className="absolute top-2 left-2 w-10 h-10 rounded-lg bg-white/95 flex items-center justify-center text-[22px] shadow">
                  {s.icon}
                </div>
                <div className="absolute bottom-2 left-2 text-white text-[11px] font-bold opacity-90 max-md:bottom-3 max-md:text-[13px]">
                  0{i + 1}
                </div>
              </div>
              <div className="p-4 flex-1 min-w-0">
                <div className="text-[11px] text-mute2 italic mb-0.5">{s.cn}</div>
                <b className="block text-[15px] text-ink leading-tight mb-2" style={{ color: s.color }}>{s.title}</b>
                <p className="text-[12.5px] text-ink/80 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3 NGÀNH SẢN PHẨM ═════════════════════════════════════════ */}
      <section className="bg-bg mt-12 py-12 max-md:mt-8 max-md:py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block bg-accent/10 text-accent px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
              专注领域 · FOCUS AREAS
            </span>
            <h2 className="text-[26px] font-extrabold text-ink leading-tight mb-1.5 max-md:text-[20px]">
              Superior Chinese products — three specialized industries
            </h2>
            <p className="text-[13px] text-mute leading-relaxed max-w-[720px] mx-auto max-md:text-[12px]">
              <i>性价比高、品类丰富、产业链成熟、创新速度快</i> — Competitive pricing, a rich product range, mature production lines and rapid innovation.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1 max-md:gap-4">
            {INDUSTRIES.map((ind) => (
              <div key={ind.title} className="bg-paper rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={ind.image} alt={ind.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 w-12 h-12 rounded flex items-center justify-center text-white font-extrabold text-[20px]" style={{ backgroundColor: ind.color }}>
                    {ind.badge}
                  </div>
                </div>
                <div className="p-5 max-md:p-4">
                  <div className="text-[12px] text-mute italic mb-0.5">{ind.cn}</div>
                  <b className="block text-[17px] text-ink mb-3 leading-tight" style={{ color: ind.color }}>{ind.title}</b>
                  <ul className="space-y-1 mb-3">
                    {ind.examples.map((e) => (
                      <li key={e} className="text-[12.5px] text-ink/85 flex gap-2">
                        <span className="text-success font-bold flex-shrink-0">✓</span>
                        {e}
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-line">
                    {ind.extraImages.map((src, i) => (
                      <div key={i} className="aspect-square rounded overflow-hidden bg-bg">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRIỂN LÃM & QUẢNG BÁ ═════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 max-md:mt-8">
        <div className="grid grid-cols-[1.2fr_1fr] gap-8 items-center max-md:grid-cols-1 max-md:gap-5">
          <div>
            <span className="inline-block bg-brand/10 text-brand px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
              展贸服务 + 推广服务 · EXHIBITIONS & PROMOTION
            </span>
            <h2 className="text-[24px] font-extrabold text-ink leading-tight mb-3 max-md:text-[19px]">
              品牌场景化展示 + 专业服务配套
            </h2>
            <p className="text-[14px] text-ink leading-relaxed mb-3 max-md:text-[13px]">
              A model of <b>"contextual brand showcasing + comprehensive professional services"</b> — creating a convenient trading environment where customers order directly at the showroom.
            </p>
            <ul className="space-y-2 text-[13.5px] text-ink/85">
              <li className="flex gap-2.5">
                <span className="text-accent text-[18px] leading-tight flex-shrink-0">🎤</span>
                <span>Annual <b>new product launch conferences</b> for Chinese brands</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-accent text-[18px] leading-tight flex-shrink-0">💡</span>
                <span><b>Topical forums</b> on eco-friendly building materials and home appliance technology</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-accent text-[18px] leading-tight flex-shrink-0">🏢</span>
                <span>Attracting <b>property developers, construction companies and interior design firms</b> to attend</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-accent text-[18px] leading-tight flex-shrink-0">📢</span>
                <span><b>Online + offline media</b> in Vietnam bringing Chinese brands to local buyers</span>
              </li>
            </ul>
            <div className="mt-4 bg-gold/10 border-l-4 border-gold px-4 py-3 italic text-[14px] text-ink rounded-r max-md:text-[12.5px]">
              "无需赴华，一站式采购中国优质商品"
              <br />
              <span className="text-mute not-italic text-[12px]">
                Come to Huayue — you do not need to travel to China to source superior Chinese products quickly and conveniently.
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {PROMOTION_IMAGES.map((src, i) => (
              <div key={i} className={i === 0 ? "col-span-2 row-span-2 aspect-square rounded-lg overflow-hidden" : "aspect-square rounded-lg overflow-hidden"}>
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KHO · VẬN CHUYỂN · THÔNG QUAN ═══════════════════════════ */}
      <section className="bg-brand-dark text-white mt-12 py-12 max-md:mt-8 max-md:py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-7">
            <span className="inline-block bg-gold text-brand-dark px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
              仓储 · 物流 · 清关 · WAREHOUSING · LOGISTICS · CUSTOMS CLEARANCE
            </span>
            <h2 className="text-[26px] font-extrabold leading-tight mb-1.5 max-md:text-[20px]">
              "保税存储" at the core
            </h2>
            <p className="text-[14px] opacity-85 max-md:text-[12.5px]">
              An automated, data-driven <i>"inbound – storage – outbound – customs clearance"</i> cycle
            </p>
          </div>

          {/* 3 warehouse types */}
          <div className="mb-7">
            <b className="block text-[11px] uppercase tracking-wider text-gold mb-3">仓储 — WAREHOUSING · 3 dedicated types</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 max-md:gap-3">
              {WAREHOUSE_TYPES.map((w) => (
                <div key={w.title} className="bg-white/5 border border-white/15 rounded-lg overflow-hidden hover:border-gold/50 transition">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={w.image} alt={w.title} className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] text-gold italic mb-0.5">{w.cn}</div>
                    <b className="block text-[14.5px] mb-1">{w.title}</b>
                    <p className="text-[12px] opacity-80 leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics flow */}
          <div className="mb-7">
            <b className="block text-[11px] uppercase tracking-wider text-gold mb-3">物流 — LOGISTICS · 3 stages</b>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {LOGISTICS_FLOW.map((l, i) => (
                <div key={l.title} className="bg-white/5 border border-white/15 rounded-lg p-4 flex items-center gap-3">
                  <div className="text-[32px] flex-shrink-0">{l.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10.5px] text-gold italic">{l.cn}</div>
                    <b className="block text-[13.5px] leading-tight">{l.title}</b>
                    <span className="text-[11.5px] opacity-75">{l.desc}</span>
                  </div>
                  {i < LOGISTICS_FLOW.length - 1 && <span className="text-gold/60 text-[20px] max-md:hidden">→</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Customs box */}
          <div className="bg-accent/15 border-2 border-accent rounded-lg p-5 max-md:p-4">
            <div className="grid grid-cols-[auto_1fr] gap-4 items-center max-md:grid-cols-1">
              <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center text-[32px] flex-shrink-0 max-md:w-12 max-md:h-12 max-md:text-[24px]">
                🛃
              </div>
              <div>
                <div className="text-[11px] text-gold uppercase tracking-wider mb-0.5">清关 — CUSTOMS CLEARANCE</div>
                <b className="block text-[16px] mb-1.5 max-md:text-[14.5px]">A streamlined process — integrated with Hai Phong port</b>
                <p className="text-[13px] opacity-90 leading-relaxed max-md:text-[12px]">
                  Huayue's customs team (Hanoi headquarters) is integrated with the customs system at Hai Phong port. Declaration data is transmitted instantly and the declaration process is streamlined — significantly reducing clearance time compared with the traditional self-declaration model.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SỐ HÓA CHUỖI CUNG ỨNG ═══════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 max-md:mt-8">
        <div className="text-center mb-7">
          <span className="inline-block bg-brand/10 text-brand px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
            供应链服务 · SUPPLY CHAIN SERVICES
          </span>
          <h2 className="text-[26px] font-extrabold text-ink leading-tight mb-1.5 max-md:text-[20px]">
            全流程可视化 — A fully digitized supply chain
          </h2>
          <p className="text-[13.5px] text-mute leading-relaxed max-w-[760px] mx-auto max-md:text-[12px]">
            Customers track their orders end to end, from raw materials at the production plant to the final consumer in Vietnam.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1 max-md:gap-4">
          {DIGITAL_PILLARS.map((d) => (
            <div key={d.title} className="bg-paper border border-line rounded-lg overflow-hidden">
              <div className="p-5 text-white" style={{ backgroundColor: d.color }}>
                <div className="text-[36px] mb-2">{d.icon}</div>
                <div className="text-[12px] italic opacity-85">{d.cn}</div>
                <b className="block text-[16px] mt-0.5">{d.title}</b>
              </div>
              <div className="p-4">
                <p className="text-[13px] text-ink/85 leading-relaxed mb-3">{d.desc}</p>
                <div className="bg-bg border-l-4 border-success px-3 py-2 rounded-r flex items-center gap-2">
                  <span className="text-success text-[16px]">↑</span>
                  <b className="text-[12.5px] text-ink">{d.benefit}</b>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SỨ MỆNH + LIÊN HỆ ═══════════════════════════════════════ */}
      <section className="mt-12 mb-12 max-md:mt-8 max-md:mb-7">
        <div className="max-w-[1200px] mx-auto px-4">
          <div
            className="rounded-2xl overflow-hidden text-white"
            style={{ background: "linear-gradient(135deg, #C8102E 0%, #002557 100%)" }}
          >
            <div className="px-8 py-10 text-center max-md:px-5 max-md:py-7">
              <span className="inline-block bg-gold text-brand-dark px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">
                使命 · MISSION
              </span>
              <h2 className="text-[24px] font-extrabold leading-tight mb-3 max-md:text-[18px]">
                助力中国制造闪耀越南，赋能越南市场升级发展
              </h2>
              <p className="text-[14.5px] opacity-95 leading-relaxed max-w-[820px] mx-auto italic mb-5 max-md:text-[12.5px]">
                Through professional, highly efficient and reliable one-stop supply chain services, we help Chinese manufacturing shine in Vietnam while helping the Vietnamese market advance to a new level.
              </p>
            </div>

            {/* Contact split into 2 cards */}
            <div className="grid grid-cols-2 border-t border-white/15 max-md:grid-cols-1">
              {/* VN */}
              <div className="px-7 py-6 border-r border-white/15 max-md:border-r-0 max-md:border-b max-md:px-5 max-md:py-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[28px]">🇻🇳</span>
                  <div>
                    <small className="text-[10.5px] uppercase tracking-wider opacity-75">越南地址 · Headquarters</small>
                    <b className="block text-[15px] leading-tight">{COMPANY.legalNameVi}</b>
                  </div>
                </div>
                <p className="text-[12.5px] opacity-90 leading-relaxed mb-2">
                  {COMPANY.offices.vn.addressVi}
                </p>
                <p className="text-[11.5px] opacity-70 italic">
                  {COMPANY.offices.vn.addressCn}
                </p>
                <div className="mt-3 pt-3 border-t border-white/15 text-[12px] opacity-90 space-y-1">
                  <div><b>Tax ID:</b> {COMPANY.taxId}</div>
                  <div><b>Domain:</b> <a href={COMPANY.websiteUrl} className="text-gold underline hover:opacity-80">{COMPANY.domain}</a></div>
                </div>
              </div>

              {/* CN */}
              <div className="px-7 py-6 max-md:px-5 max-md:py-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[28px]">🇨🇳</span>
                  <div>
                    <small className="text-[10.5px] uppercase tracking-wider opacity-75">中国地址 · Representative Office</small>
                    <b className="block text-[15px] leading-tight">Huayue Guangzhou sourcing team</b>
                  </div>
                </div>
                <p className="text-[12.5px] opacity-90 leading-relaxed mb-2">
                  {COMPANY.offices.cn.addressVi}
                </p>
                <p className="text-[11.5px] opacity-70 italic">
                  {COMPANY.offices.cn.addressCn}
                </p>
                <div className="mt-3 pt-3 border-t border-white/15 text-[12px] opacity-90">
                  <b>Role:</b> Sourcing &middot; Factory audits &middot; Pre-shipment QC
                </div>
              </div>
            </div>

            {/* Hotline strip */}
            <div className="px-7 py-5 bg-black/30 border-t border-white/15 grid grid-cols-2 gap-4 items-center max-md:grid-cols-1 max-md:px-5 max-md:py-4">
              <div>
                <small className="text-[10.5px] uppercase tracking-wider opacity-75">联系电话 · HOTLINE</small>
                <b className="block text-gold text-[22px] mt-0.5 max-md:text-[18px]">{COMPANY.contact.hotline}</b>
                <span className="text-[11.5px] opacity-80">Vietnamese + Chinese support &middot; 8am–10pm</span>
              </div>
              <div className="flex gap-2 max-md:flex-col">
                <Link
                  href="/buying-request"
                  className="flex-1 px-5 py-2.5 bg-gold text-brand-dark rounded font-bold text-[13px] hover:bg-[#E8943A] cursor-pointer text-center whitespace-nowrap"
                >
                  📨 Send RFQ
                </Link>
                <Link
                  href="/info/contact"
                  className="flex-1 px-5 py-2.5 border-2 border-white/40 text-white rounded font-bold text-[13px] hover:bg-white/10 cursor-pointer text-center whitespace-nowrap"
                >
                  📍 View Both Offices
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "About Us — Huayuesc 华越供应链 · Huayue Supply Chain (Vietnam) Co., Ltd.",
  description:
    "Huayue (华越供应链) is a one-stop supply chain service provider specializing in exporting building materials, decoration materials and kitchen and bathroom appliances from China into Vietnam. Hanoi headquarters plus a Guangzhou representative office. Tax ID 0111453693.",
};
