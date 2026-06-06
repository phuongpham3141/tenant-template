import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { getT } from "@/lib/t";

const HERO_STATS = [
  { n: "20+", l: "sell_on_csr.hero_stat_l1", icon: "🏭" },
  { n: "VN distribution partners", l: "sell_on_csr.hero_stat_l2", icon: "🇻🇳" },
  { n: "Growing every year", l: "sell_on_csr.hero_stat_l3", icon: "🛡" },
  { n: "32%", l: "sell_on_csr.hero_stat_l4", icon: "✅" },
];

const VALUE_PROPS = [
  {
    icon: "🇻🇳",
    title: "sell_on_csr.vp1_title",
    desc: "sell_on_csr.vp1_desc",
  },
  {
    icon: "🤝",
    title: "sell_on_csr.vp2_title",
    desc: "sell_on_csr.vp2_desc",
  },
  {
    icon: "🛡",
    title: "sell_on_csr.vp3_title",
    desc: "sell_on_csr.vp3_desc",
  },
  {
    icon: "🚢",
    title: "sell_on_csr.vp4_title",
    desc: "sell_on_csr.vp4_desc",
  },
  {
    icon: "📊",
    title: "sell_on_csr.vp5_title",
    desc: "sell_on_csr.vp5_desc",
  },
  {
    icon: "💸",
    title: "sell_on_csr.vp6_title",
    desc: "sell_on_csr.vp6_desc",
  },
];

const PRICING_PILLARS = [
  {
    badge: "sell_on_csr.pillar1_badge",
    price: "VND 0",
    priceSub: "sell_on_csr.pillar1_priceSub",
    color: "#16A34A",
    headline: "sell_on_csr.pillar1_headline",
    desc: "sell_on_csr.pillar1_desc",
    items: [
      "sell_on_csr.pillar1_item1",
      "sell_on_csr.pillar1_item2",
      "sell_on_csr.pillar1_item3",
      "sell_on_csr.pillar1_item4",
      "sell_on_csr.pillar1_item5",
      "sell_on_csr.pillar1_item6",
      "sell_on_csr.pillar1_item7",
      "sell_on_csr.pillar1_item8",
    ],
    accent: false,
  },
  {
    badge: "sell_on_csr.pillar2_badge",
    price: "1.5%",
    priceSub: "sell_on_csr.pillar2_priceSub",
    color: "#005F6B",
    headline: "sell_on_csr.pillar2_headline",
    desc: "sell_on_csr.pillar2_desc",
    items: [
      "sell_on_csr.pillar2_item1",
      "sell_on_csr.pillar2_item2",
      "sell_on_csr.pillar2_item3",
      "sell_on_csr.pillar2_item4",
      "sell_on_csr.pillar2_item5",
      "sell_on_csr.pillar2_item6",
    ],
    accent: true,
  },
  {
    badge: "sell_on_csr.pillar3_badge",
    price: "No Profit",
    priceSub: "sell_on_csr.pillar3_priceSub",
    color: "#9C6A1F",
    headline: "sell_on_csr.pillar3_headline",
    desc: "sell_on_csr.pillar3_desc",
    items: [
      "sell_on_csr.pillar3_item1",
      "sell_on_csr.pillar3_item2",
      "sell_on_csr.pillar3_item3",
      "sell_on_csr.pillar3_item4",
      "sell_on_csr.pillar3_item5",
      "sell_on_csr.pillar3_item6",
    ],
    accent: false,
  },
];

const STEPS = [
  {
    n: 1,
    icon: "📝",
    color: "#0E7490",
    title: "sell_on_csr.step1_title",
    duration: "sell_on_csr.step1_duration",
    desc: "sell_on_csr.step1_desc",
    actions: [
      "sell_on_csr.step1_action1",
      "sell_on_csr.step1_action2",
      "sell_on_csr.step1_action3",
    ],
  },
  {
    n: 2,
    icon: "🔍",
    color: "#7C2D12",
    title: "sell_on_csr.step2_title",
    duration: "sell_on_csr.step2_duration",
    desc: "sell_on_csr.step2_desc",
    actions: [
      "sell_on_csr.step2_action1",
      "sell_on_csr.step2_action2",
      "sell_on_csr.step2_action3",
      "sell_on_csr.step2_action4",
    ],
  },
  {
    n: 3,
    icon: "🚀",
    color: "#16A34A",
    title: "sell_on_csr.step3_title",
    duration: "sell_on_csr.step3_duration",
    desc: "sell_on_csr.step3_desc",
    actions: [
      "sell_on_csr.step3_action1",
      "sell_on_csr.step3_action2",
      "sell_on_csr.step3_action3",
      "sell_on_csr.step3_action4",
    ],
  },
  {
    n: 4,
    icon: "💼",
    color: "#9C6A1F",
    title: "sell_on_csr.step4_title",
    duration: "sell_on_csr.step4_duration",
    desc: "sell_on_csr.step4_desc",
    actions: [
      "sell_on_csr.step4_action1",
      "sell_on_csr.step4_action2",
      "sell_on_csr.step4_action3",
      "sell_on_csr.step4_action4",
    ],
  },
];

const AUDIT_CRITERIA = [
  { label: "sell_on_csr.audit1", required: true },
  { label: "sell_on_csr.audit2", required: true },
  { label: "sell_on_csr.audit3", required: true },
  { label: "sell_on_csr.audit4", required: true },
  { label: "sell_on_csr.audit5", required: true },
  { label: "sell_on_csr.audit6", required: true },
  { label: "sell_on_csr.audit7", required: false },
  { label: "sell_on_csr.audit8", required: false },
  { label: "sell_on_csr.audit9", required: false },
  { label: "sell_on_csr.audit10", required: false },
];

const MARKETING_TOOLS = [
  {
    icon: "📢",
    title: "sell_on_csr.mkt1_title",
    desc: "sell_on_csr.mkt1_desc",
  },
  {
    icon: "🏠",
    title: "sell_on_csr.mkt2_title",
    desc: "sell_on_csr.mkt2_desc",
  },
  {
    icon: "📧",
    title: "sell_on_csr.mkt3_title",
    desc: "sell_on_csr.mkt3_desc",
  },
  {
    icon: "🎯",
    title: "sell_on_csr.mkt4_title",
    desc: "sell_on_csr.mkt4_desc",
  },
  {
    icon: "🎬",
    title: "sell_on_csr.mkt5_title",
    desc: "sell_on_csr.mkt5_desc",
  },
  {
    icon: "📈",
    title: "sell_on_csr.mkt6_title",
    desc: "sell_on_csr.mkt6_desc",
  },
];

const STORIES = [
  {
    name: "Foshan Hanse Industrial",
    loc: "Foshan",
    category: "sell_on_csr.story1_category",
    before: "20 orders / month",
    after: "85 orders / month",
    lift: "+325%",
    years: "6 years on CSR",
    quote: "sell_on_csr.story1_quote",
  },
  {
    name: "OPPEIN Home Group",
    loc: "Guangzhou",
    category: "sell_on_csr.story2_category",
    before: "$80,000 / month",
    after: "$420,000 / month",
    lift: "+425%",
    years: "5 years on CSR",
    quote: "sell_on_csr.story2_quote",
  },
  {
    name: "Taizhou Faucet Group",
    loc: "Taizhou",
    category: "sell_on_csr.story3_category",
    before: "0 Vietnamese dealers",
    after: "32 Vietnamese dealers",
    lift: "+32 dealers",
    years: "4 years on CSR",
    quote: "sell_on_csr.story3_quote",
  },
  {
    name: "Landbond Furniture",
    loc: "Foshan",
    category: "sell_on_csr.story4_category",
    before: "$60,000 / month",
    after: "$280,000 / month",
    lift: "+367%",
    years: "7 years on CSR",
    quote: "sell_on_csr.story4_quote",
  },
  {
    name: "Ortonbaths Group",
    loc: "Shenzhen",
    category: "sell_on_csr.story5_category",
    before: "5% of exports to Vietnam",
    after: "32% of exports to Vietnam",
    lift: "+540%",
    years: "3 years on CSR",
    quote: "sell_on_csr.story5_quote",
  },
  {
    name: "Monalisa Ceramic",
    loc: "Foshan",
    category: "sell_on_csr.story6_category",
    before: "$120,000 / month",
    after: "$680,000 / month",
    lift: "+466%",
    years: "8 years on CSR",
    quote: "sell_on_csr.story6_quote",
  },
];

const FAQ = [
  {
    q: "sell_on_csr.faq1_q",
    a: "sell_on_csr.faq1_a",
  },
  {
    q: "sell_on_csr.faq2_q",
    a: "sell_on_csr.faq2_a",
  },
  {
    q: "sell_on_csr.faq3_q",
    a: "sell_on_csr.faq3_a",
  },
  {
    q: "sell_on_csr.faq4_q",
    a: "sell_on_csr.faq4_a",
  },
  {
    q: "sell_on_csr.faq5_q",
    a: "sell_on_csr.faq5_a",
  },
  {
    q: "sell_on_csr.faq6_q",
    a: "sell_on_csr.faq6_a",
  },
  {
    q: "sell_on_csr.faq7_q",
    a: "sell_on_csr.faq7_a",
  },
  {
    q: "sell_on_csr.faq8_q",
    a: "sell_on_csr.faq8_a",
  },
  {
    q: "sell_on_csr.faq9_q",
    a: "sell_on_csr.faq9_a",
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

export default async function SellOnCsrPage() {
  const t = await getT();
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
            {t("sell_on_csr.hero_h1_line1")}<br />
            <span className="text-gold">{t("sell_on_csr.hero_h1_line2")}</span>
          </h1>
          <p className="text-[15px] opacity-90 max-w-[760px] leading-relaxed mb-7 max-md:text-[13px]">
            A B2B platform dedicated to the Vietnam – China market for furniture, materials, sanitary ware, and home appliances. <b className="text-gold">Listing is 100% free</b> — we only charge once a supplier has a successful order. Our &ldquo;No Profit, No Fee&rdquo; commitment: if you have not turned a profit, Huayuesc waives all fees. 40+ partner factories have achieved 300%+ growth after 24 months with our win-win model.
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {HERO_STATS.map((s) => (
              <StatTile key={s.l} n={s.n} l={t(s.l)} icon={s.icon} />
            ))}
          </div>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link href="/register/factory" className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]">
              🚀 {t("sell_on_csr.cta_register")}
            </Link>
            <Link href="/info/audit-process" className="px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10">
              📋 {t("sell_on_csr.cta_audit_process")}
            </Link>
            <Link href="/info/contact" className="px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90">
              💬 {t("sell_on_csr.cta_consultation")}
            </Link>
          </div>
        </div>
      </section>

      {/* === Why Huayuesc ============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-9">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("sell_on_csr.why_eyebrow")}</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">{t("sell_on_csr.why_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("sell_on_csr.why_sub")}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className="bg-paper border border-line rounded p-5 hover:border-brand transition">
              <div className="text-[32px] mb-2">{v.icon}</div>
              <b className="block text-[15px] text-ink mb-2 leading-tight">{t(v.title)}</b>
              <p className="text-[12.5px] text-mute leading-relaxed">{t(v.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Pricing philosophy ============================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("sell_on_csr.pricing_eyebrow")}</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">
            {t("sell_on_csr.pricing_h2")}
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
              <b className="block text-[18px] text-ink leading-tight">{t("sell_on_csr.callout_title")}</b>
              <p className="text-[12.5px] text-mute mt-1">
                {t("sell_on_csr.callout_desc")}
              </p>
            </div>
          </div>
          <Link
            href="/register/factory"
            className="px-5 py-2.5 bg-success text-white rounded-sm font-bold text-[13px] hover:opacity-90 whitespace-nowrap"
          >
            {t("sell_on_csr.callout_btn")}
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
                {t(p.badge)}
              </span>
              <div className="mb-3">
                <span className="text-[40px] font-extrabold leading-none" style={{ color: p.color }}>
                  {p.price}
                </span>
                <div className="text-[12px] text-mute mt-1">{t(p.priceSub)}</div>
              </div>
              <h3 className="text-[15px] font-bold text-ink leading-tight mb-2 min-h-[3em]">
                {t(p.headline)}
              </h3>
              <p className="text-[12px] text-mute leading-relaxed mb-4 flex-shrink-0">{t(p.desc)}</p>
              <ul className="space-y-2 text-[12.5px] text-ink mb-1 flex-1">
                {p.items.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="flex-shrink-0" style={{ color: p.color }}>
                      ✓
                    </span>
                    <span>{t(it)}</span>
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
              <b className="block text-[16px] mb-1">{t("sell_on_csr.commit_title")}</b>
              <p className="text-[13px] opacity-90 leading-relaxed">
                If after the first 12 months a supplier has not earned a real profit from Huayuesc, we <b>refund 100% of the Trade Assurance fees</b> paid — or continue free for another 6 months to find the optimal path together. We believe a B2B platform only has value when every party wins.
              </p>
            </div>
            <Link
              href="/info/contact"
              className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm font-bold text-[13px] hover:bg-[#E8943A] whitespace-nowrap"
            >
              {t("sell_on_csr.commit_btn")}
            </Link>
          </div>
        </div>
      </section>

      {/* === Process steps ================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("sell_on_csr.steps_eyebrow")}</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">{t("sell_on_csr.steps_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("sell_on_csr.steps_sub")}
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
                        <h3 className="text-[17px] font-bold text-ink leading-tight">{t(s.title)}</h3>
                        <span className="text-[10.5px] uppercase tracking-wider font-bold" style={{ color: s.color }}>
                          STEP {s.n}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] bg-bg border border-line px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider text-mute">
                      🕒 {t(s.duration)}
                    </span>
                  </div>
                  <p className="text-[13px] text-mute leading-relaxed mb-3">{t(s.desc)}</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] max-md:grid-cols-1">
                    {s.actions.map((a, i) => (
                      <li key={i} className="flex gap-2 text-ink">
                        <span style={{ color: s.color }} className="flex-shrink-0">▸</span>
                        <span>{t(a)}</span>
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
              <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("sell_on_csr.audit_eyebrow")}</span>
              <h2 className="text-[22px] font-bold text-ink mt-1 max-md:text-[18px]">{t("sell_on_csr.audit_h2")}</h2>
              <p className="text-[13px] text-mute mt-1">{t("sell_on_csr.audit_sub")}</p>
            </div>
            <Link
              href="/info/audit-process"
              className="text-[12.5px] text-brand font-semibold hover:underline whitespace-nowrap"
            >
              {t("sell_on_csr.audit_link")}
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
                <span className="text-ink flex-1">{t(c.label)}</span>
                {c.required ? (
                  <span className="text-[10px] text-accent font-bold">{t("sell_on_csr.audit_required")}</span>
                ) : (
                  <span className="text-[10px] text-mute2">{t("sell_on_csr.audit_bonus")}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Marketing tools ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("sell_on_csr.mkt_eyebrow")}</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">{t("sell_on_csr.mkt_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("sell_on_csr.mkt_sub")}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {MARKETING_TOOLS.map((m) => (
            <div key={m.title} className="bg-paper border border-line rounded p-5 hover:border-brand transition">
              <div className="text-[28px] mb-2">{m.icon}</div>
              <b className="block text-[15px] text-ink mb-2 leading-tight">{t(m.title)}</b>
              <p className="text-[12.5px] text-mute leading-relaxed">{t(m.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Success stories ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("sell_on_csr.stories_eyebrow")}</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">{t("sell_on_csr.stories_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("sell_on_csr.stories_sub")}
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
                <span>· {t(s.category)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-line text-[12px]">
                <div>
                  <div className="text-mute text-[10.5px] uppercase tracking-wider">{t("sell_on_csr.stories_before")}</div>
                  <b className="text-ink text-[12.5px]">{s.before}</b>
                </div>
                <div>
                  <div className="text-mute text-[10.5px] uppercase tracking-wider">{t("sell_on_csr.stories_after")}</div>
                  <b className="text-success text-[12.5px]">{s.after}</b>
                </div>
              </div>
              <div className="mt-2 text-center bg-success/10 border border-success/25 text-success font-bold py-1.5 rounded-sm text-[13px]">
                {s.lift}
              </div>
              <p className="text-[11.5px] text-mute italic mt-3 leading-relaxed border-l-2 border-gold pl-2.5">
                &ldquo;{t(s.quote)}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* === FAQ =========================================================== */}
      <section className="max-w-[900px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("sell_on_csr.faq_eyebrow")}</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">{t("sell_on_csr.faq_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("sell_on_csr.faq_sub")}
          </p>
        </div>
        <div className="space-y-2">
          {FAQ.map((f, i) => (
            <details key={i} className="group bg-paper border border-line rounded">
              <summary className="cursor-pointer px-4 py-3 flex justify-between items-center gap-3 list-none">
                <b className="text-[13.5px] text-ink flex-1">{t(f.q)}</b>
                <span className="text-mute group-open:rotate-180 transition-transform text-[12px]">▾</span>
              </summary>
              <div className="px-4 pb-4 pt-1 text-[13px] text-mute leading-relaxed border-t border-line">
                {t(f.a)}
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
            {t("sell_on_csr.final_h3")}
          </h3>
          <p className="text-[14px] opacity-90 mb-6 max-w-[680px] mx-auto leading-relaxed">
            {t("sell_on_csr.final_desc")}
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/register/factory"
              className="inline-block px-8 py-3.5 bg-gold text-brand-dark rounded-sm font-bold text-[15px] hover:bg-[#E8943A]"
            >
              🚀 {t("sell_on_csr.cta_register")}
            </Link>
            <Link
              href="/info/contact"
              className="inline-block px-8 py-3.5 border-2 border-white/40 text-white rounded-sm font-bold text-[15px] hover:bg-white/10"
            >
              💬 {t("sell_on_csr.cta_consultation")}
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
