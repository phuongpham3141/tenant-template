import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { COMPANY } from "@/data/company";
import { getT } from "@/lib/t";

// ─── DATA ────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { n: "63", l: "info_network.hero_stat_vn", icon: "🇻🇳" },
  { n: "3", l: "info_network.hero_stat_cn", icon: "🇨🇳" },
  { n: "4", l: "info_network.hero_stat_partner", icon: "🤝" },
  { n: "2", l: "info_network.hero_stat_office", icon: "🏢" },
];

const DISTRIBUTION_PARTNERS = [
  {
    icon: "🏪",
    color: "#005F6B",
    title: "info_network.dp1_title",
    summary: "info_network.dp1_summary",
    desc: "info_network.dp1_desc",
    benefits: [
      "info_network.dp1_b1",
      "info_network.dp1_b2",
      "info_network.dp1_b3",
      "info_network.dp1_b4",
    ],
  },
  {
    icon: "🏗",
    color: "#9C6A1F",
    title: "info_network.dp2_title",
    summary: "info_network.dp2_summary",
    desc: "info_network.dp2_desc",
    benefits: [
      "info_network.dp2_b1",
      "info_network.dp2_b2",
      "info_network.dp2_b3",
      "info_network.dp2_b4",
    ],
  },
  {
    icon: "🎨",
    color: "#7C2D12",
    title: "info_network.dp3_title",
    summary: "info_network.dp3_summary",
    desc: "info_network.dp3_desc",
    benefits: [
      "info_network.dp3_b1",
      "info_network.dp3_b2",
      "info_network.dp3_b3",
      "info_network.dp3_b4",
    ],
  },
  {
    icon: "🔌",
    color: "#7C3AED",
    title: "info_network.dp4_title",
    summary: "info_network.dp4_summary",
    desc: "info_network.dp4_desc",
    benefits: [
      "info_network.dp4_b1",
      "info_network.dp4_b2",
      "info_network.dp4_b3",
      "info_network.dp4_b4",
    ],
  },
];

const CN_CLUSTERS = [
  {
    province: "info_network.cl1_province",
    provinceCn: "Guangdong",
    color: "#C8102E",
    weight: "info_network.cl1_weight",
    cities: [
      { name: "info_network.cl1_c1_name", spec: "info_network.cl1_c1_spec" },
      { name: "info_network.cl1_c2_name", spec: "info_network.cl1_c2_spec" },
      { name: "info_network.cl1_c3_name", spec: "info_network.cl1_c3_spec" },
      { name: "info_network.cl1_c4_name", spec: "info_network.cl1_c4_spec" },
      { name: "info_network.cl1_c5_name", spec: "info_network.cl1_c5_spec" },
    ],
  },
  {
    province: "info_network.cl2_province",
    provinceCn: "Fujian",
    color: "#0E7490",
    weight: "info_network.cl2_weight",
    cities: [
      { name: "info_network.cl2_c1_name", spec: "info_network.cl2_c1_spec" },
      { name: "info_network.cl2_c2_name", spec: "info_network.cl2_c2_spec" },
    ],
  },
  {
    province: "info_network.cl3_province",
    provinceCn: "Shandong",
    color: "#475569",
    weight: "info_network.cl3_weight",
    cities: [
      { name: "info_network.cl3_c1_name", spec: "info_network.cl3_c1_spec" },
      { name: "info_network.cl3_c2_name", spec: "info_network.cl3_c2_spec" },
      { name: "info_network.cl3_c3_name", spec: "info_network.cl3_c3_spec" },
    ],
  },
];

const PARTNERSHIP_MECHANISMS = [
  {
    icon: "📚",
    title: "info_network.pm1_title",
    desc: "info_network.pm1_desc",
  },
  {
    icon: "🎤",
    title: "info_network.pm2_title",
    desc: "info_network.pm2_desc",
  },
  {
    icon: "💡",
    title: "info_network.pm3_title",
    desc: "info_network.pm3_desc",
  },
  {
    icon: "📢",
    title: "info_network.pm4_title",
    desc: "info_network.pm4_desc",
  },
  {
    icon: "✈",
    title: "info_network.pm5_title",
    desc: "info_network.pm5_desc",
  },
];

const TRADE_FAIRS = [
  { month: "info_network.tf1_month", name: "CIFF Quảng Châu", desc: "info_network.tf1_desc", color: "#005F6B" },
  { month: "info_network.tf2_month", name: "Canton Fair Phase 1-3", desc: "info_network.tf2_desc", color: "#C8102E" },
  { month: "info_network.tf2_month", name: "Foshan Pottery Show", desc: "info_network.tf3_desc", color: "#9C6A1F" },
  { month: "info_network.tf4_month", name: "VIETBUILD HCM", desc: "info_network.tf4_desc", color: "#7C3AED" },
  { month: "info_network.tf5_month", name: "CIFF Thượng Hải", desc: "info_network.tf5_desc", color: "#005F6B" },
  { month: "info_network.tf6_month", name: "Canton Fair Autumn", desc: "info_network.tf6_desc", color: "#C8102E" },
  { month: "info_network.tf6_month", name: "Foshan Pottery Autumn", desc: "info_network.tf7_desc", color: "#9C6A1F" },
  { month: "info_network.tf8_month", name: "VIETBUILD Hà Nội", desc: "info_network.tf8_desc", color: "#7C3AED" },
];

const BUYER_BENEFITS = [
  { icon: "💰", title: "info_network.bb1_title", desc: "info_network.bb1_desc" },
  { icon: "✅", title: "info_network.bb2_title", desc: "info_network.bb2_desc" },
  { icon: "🚛", title: "info_network.bb3_title", desc: "info_network.bb3_desc" },
  { icon: "🇻🇳", title: "info_network.bb4_title", desc: "info_network.bb4_desc" },
  { icon: "🎁", title: "info_network.bb5_title", desc: "info_network.bb5_desc" },
  { icon: "📊", title: "info_network.bb6_title", desc: "info_network.bb6_desc" },
];

const FAQS = [
  {
    q: "info_network.faq1_q",
    a: "info_network.faq1_a",
  },
  {
    q: "info_network.faq2_q",
    a: "info_network.faq2_a",
  },
  {
    q: "info_network.faq3_q",
    a: "info_network.faq3_a",
  },
  {
    q: "info_network.faq4_q",
    a: "info_network.faq4_a",
  },
  {
    q: "info_network.faq5_q",
    a: "info_network.faq5_a",
  },
];

// ─── PAGE ────────────────────────────────────────────────────────────────

export default async function NetworkPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb
        trail={[
          { label: t("info_network.bc_home"), href: "/" },
          { label: t("info_network.bc_info"), href: "/help" },
          { label: t("info_network.bc_network") },
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
              {t("info_network.hero_badge")}
            </span>
            <h1 className="text-[34px] font-extrabold leading-tight mb-3 max-md:text-[22px]">
              {t("info_network.hero_h1")}
            </h1>
            <p className="text-[14.5px] opacity-90 leading-relaxed max-w-[820px] max-md:text-[13px]">
              {t("info_network.hero_p")}
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 bg-black/15">
          <div className="max-w-[1200px] mx-auto px-4 py-4 grid grid-cols-4 gap-3 max-md:grid-cols-2 max-md:py-3">
            {HERO_STATS.map((s) => (
              <div key={s.l} className="text-center border-r border-white/15 last:border-r-0 max-md:border-r-0 max-md:py-1.5">
                <div className="text-[20px] mb-0.5">{s.icon}</div>
                <b className="block text-[22px] text-gold leading-none max-md:text-[18px]">{s.n}</b>
                <small className="text-[11px] opacity-80 uppercase tracking-wider">{t(s.l)}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TWO NETWORKS DIAGRAM ═══════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-8 max-md:mt-5">
        <div className="text-center mb-6">
          <h2 className="text-[24px] font-bold text-ink mb-1.5 max-md:text-[20px]">
            {t("info_network.two_net_h2")}
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            {t("info_network.two_net_sub")}
          </p>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-stretch max-md:grid-cols-1">
          {/* CN side */}
          <div className="bg-paper border-2 border-line rounded-lg p-6 max-md:p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[32px]">🇨🇳</span>
              <div>
                <b className="block text-[17px] text-ink leading-tight">{t("info_network.cn_in_title")}</b>
                <small className="text-[11.5px] text-mute">{t("info_network.cn_in_office")}</small>
              </div>
            </div>
            <p className="text-[13px] text-ink/80 mb-3 leading-relaxed">
              {t("info_network.cn_in_p")}
            </p>
            <ul className="space-y-1.5 text-[12.5px] text-ink/85">
              <li className="flex gap-2"><span className="text-success">●</span> {t("info_network.cn_in_li1")}</li>
              <li className="flex gap-2"><span className="text-success">●</span> {t("info_network.cn_in_li2")}</li>
              <li className="flex gap-2"><span className="text-success">●</span> {t("info_network.cn_in_li3")}</li>
              <li className="flex gap-2"><span className="text-success">●</span> {t("info_network.cn_in_li4")}</li>
            </ul>
          </div>

          {/* Bridge */}
          <div className="flex items-center justify-center max-md:py-2">
            <div className="bg-brand text-white px-4 py-6 rounded-lg text-center max-md:py-3 max-md:w-full">
              <div className="text-[40px] mb-1 max-md:text-[28px]">🚢</div>
              <b className="block text-[13px] leading-tight">Huayue</b>
              <small className="text-[10.5px] opacity-85">{t("info_network.bridge_sub")}</small>
            </div>
          </div>

          {/* VN side */}
          <div className="bg-paper border-2 border-line rounded-lg p-6 max-md:p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[32px]">🇻🇳</span>
              <div>
                <b className="block text-[17px] text-ink leading-tight">{t("info_network.vn_out_title")}</b>
                <small className="text-[11.5px] text-mute">{t("info_network.vn_out_office")}</small>
              </div>
            </div>
            <p className="text-[13px] text-ink/80 mb-3 leading-relaxed">
              {t("info_network.vn_out_p")}
            </p>
            <ul className="space-y-1.5 text-[12.5px] text-ink/85">
              <li className="flex gap-2"><span className="text-accent">●</span> {t("info_network.vn_out_li1")}</li>
              <li className="flex gap-2"><span className="text-accent">●</span> {t("info_network.vn_out_li2")}</li>
              <li className="flex gap-2"><span className="text-accent">●</span> {t("info_network.vn_out_li3")}</li>
              <li className="flex gap-2"><span className="text-accent">●</span> {t("info_network.vn_out_li4")}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ 4 DISTRIBUTION PARTNER TYPES ═════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
        <div className="text-center mb-6">
          <span className="inline-block bg-accent/10 text-accent px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
            {t("info_network.dp_badge")}
          </span>
          <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
            {t("info_network.dp_h2")}
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            {t("info_network.dp_sub")}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {DISTRIBUTION_PARTNERS.map((p) => (
            <div key={p.title} className="bg-paper border border-line rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="px-5 py-3 text-white flex items-center gap-3" style={{ backgroundColor: p.color }}>
                <span className="text-[28px]">{p.icon}</span>
                <div>
                  <b className="block text-[15px] leading-tight">{t(p.title)}</b>
                  <small className="text-[11px] opacity-90">{t(p.summary)}</small>
                </div>
              </div>
              <div className="p-5 max-md:p-4">
                <p className="text-[13px] text-ink/85 mb-3 leading-relaxed">{t(p.desc)}</p>
                <ul className="space-y-1.5">
                  {p.benefits.map((b) => (
                    <li key={b} className="text-[12.5px] text-ink/85 flex gap-2">
                      <span className="text-success font-bold flex-shrink-0">✓</span>
                      {t(b)}
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
            {t("info_network.cl_badge")}
          </span>
          <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
            {t("info_network.cl_h2")}
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            {t("info_network.cl_sub")}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {CN_CLUSTERS.map((c) => (
            <div key={c.province} className="bg-paper border border-line rounded-lg overflow-hidden">
              <div className="px-5 py-4 text-white" style={{ backgroundColor: c.color }}>
                <small className="text-[10px] uppercase tracking-wider opacity-85">{t(c.weight)}</small>
                <b className="block text-[18px] leading-tight mt-0.5">{t(c.province)}</b>
                <span className="text-[12px] opacity-90 italic">{c.provinceCn}</span>
              </div>
              <ul className="divide-y divide-line">
                {c.cities.map((city) => (
                  <li key={city.name} className="px-4 py-2.5">
                    <b className="block text-[13px] text-ink leading-tight">{t(city.name)}</b>
                    <span className="text-[11.5px] text-mute leading-snug">{t(city.spec)}</span>
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
              {t("info_network.pm_h2")}
            </h2>
            <p className="text-[13px] text-mute max-md:text-[12px]">
              Theo brochure section <i>'Dịch vụ triển lãm thương mại'</i> và <i>'Quảng bá thị trường'</i>
            </p>
          </div>
          <div className="grid grid-cols-5 gap-3 max-lg:grid-cols-3 max-md:grid-cols-1">
            {PARTNERSHIP_MECHANISMS.map((m) => (
              <div key={m.title} className="bg-paper border border-line rounded-lg p-4 text-center hover:border-brand hover:shadow-sm transition-all">
                <div className="text-[38px] mb-2">{m.icon}</div>
                <b className="block text-[13.5px] text-ink mb-2 leading-tight">{t(m.title)}</b>
                <p className="text-[11.5px] text-mute leading-relaxed">{t(m.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRADE FAIR CALENDAR ══════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
        <div className="text-center mb-6">
          <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
            {t("info_network.tf_h2")}
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            {t("info_network.tf_sub")}
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {TRADE_FAIRS.map((f, i) => (
            <div key={i} className="bg-paper border border-line rounded-lg overflow-hidden flex">
              <div className="px-3 py-3 text-white font-bold text-[15px] flex items-center justify-center min-w-[58px]" style={{ backgroundColor: f.color }}>
                {t(f.month)}
              </div>
              <div className="p-3 flex-1">
                <b className="block text-[13px] text-ink mb-0.5 leading-tight">{f.name}</b>
                <span className="text-[11px] text-mute leading-snug">{t(f.desc)}</span>
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
              {t("info_network.bb_h2")}
            </h2>
            <p className="text-[13px] text-mute max-md:text-[12px]">
              {t("info_network.bb_sub")}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {BUYER_BENEFITS.map((b) => (
              <div key={b.title} className="border border-line rounded p-4 hover:border-brand hover:bg-bg transition">
                <div className="text-[24px] mb-1.5">{b.icon}</div>
                <b className="block text-[13.5px] text-ink mb-1">{t(b.title)}</b>
                <p className="text-[12px] text-mute leading-relaxed">{t(b.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PULL QUOTE ═══════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-4 mt-10 max-md:mt-7">
        <blockquote className="bg-bg border-l-4 border-gold rounded-r-lg px-6 py-5 max-md:px-4 max-md:py-4">
          <p className="text-[16px] text-ink italic leading-relaxed max-md:text-[14px]">
            {t("info_network.quote")}
          </p>
          <footer className="mt-3 text-[12.5px] text-mute not-italic">{t("info_network.quote_footer")}</footer>
        </blockquote>
      </section>

      {/* ═══ FAQ ═════════════════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-4 mt-10 max-md:mt-7">
        <h2 className="text-[22px] font-bold text-ink mb-4 flex items-center gap-2 max-md:text-[18px]">
          <span>❓</span> {t("info_network.faq_h2")}
        </h2>
        <div className="space-y-2">
          {FAQS.map((f, i) => (
            <details key={i} {...(i === 0 ? { open: true } : {})} className="border border-line rounded-lg group/faq bg-paper">
              <summary className="px-4 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden flex justify-between items-center hover:bg-bg">
                <b className="text-[13.5px] text-ink leading-snug pr-3">{t(f.q)}</b>
                <span className="text-mute2 text-[14px] group-open/faq:rotate-180 transition-transform flex-shrink-0">▾</span>
              </summary>
              <p className="px-4 pb-4 pt-3 text-[13px] text-ink/85 leading-relaxed border-t border-line">{t(f.a)}</p>
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
                {t("info_network.cta_badge")}
              </span>
              <b className="block text-[20px] mb-1.5 max-md:text-[17px]">{t("info_network.cta_title")}</b>
              <p className="text-[13px] opacity-90 leading-relaxed max-md:text-[12.5px]">
                {t("info_network.cta_p")}
              </p>
              <p className="text-[12px] opacity-80 mt-2">
                📞 {COMPANY.contact.hotline} · ✉ <a href={`mailto:${COMPANY.contact.emails.partnership}`} className="underline hover:text-gold">{COMPANY.contact.emails.partnership}</a>
              </p>
            </div>
            <div className="flex flex-col gap-2 max-md:w-full">
              <a
                href={`mailto:${COMPANY.contact.emails.partnership}?subject=Đăng%20ký%20đối%20tác%20phân%20phối%20Huayue`}
                className="px-5 py-2.5 bg-gold text-brand-dark rounded font-bold text-[13px] hover:bg-[#E8943A] cursor-pointer text-center whitespace-nowrap"
              >
                ✉ {t("info_network.cta_btn_register")}
              </a>
              <Link
                href="/info/contact"
                className="px-5 py-2.5 border-2 border-white/40 text-white rounded font-bold text-[13px] hover:bg-white/10 cursor-pointer text-center whitespace-nowrap"
              >
                📍 {t("info_network.cta_btn_office")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "Mạng lưới đối tác — Huayuesc",
  description:
    "Huayue kết nối nhà máy hàng đầu Quảng Đông, Phúc Kiến, Sơn Đông với 4 nhóm đối tác phân phối tại Việt Nam: đại lý VLXD, nhà thầu xây dựng, công ty thiết kế nội thất, đại lý điện máy. 63 tỉnh thành coverage, 2 văn phòng vận hành Hải Phòng + Quảng Châu.",
};
