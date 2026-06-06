import { Img } from "@/components/ui/img";
import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { COMPANY } from "@/data/company";
import { getT } from "@/lib/t";

// ─── DATA ─────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { n: "3", l: "info_about_us.stat_industries", icon: "🎯" },
  { n: "4", l: "info_about_us.stat_services", icon: "⚙️" },
  { n: "2", l: "info_about_us.stat_offices", icon: "🏢" },
  { n: "20+", l: "info_about_us.stat_suppliers", icon: "🏭" },
];

const CORE_SERVICES = [
  {
    icon: "🔍",
    color: "#005F6B",
    image: "/img/sol-hubs.jpg?v=6",
    cn: "info_about_us.svc1_cn",
    title: "info_about_us.svc1_title",
    desc: "info_about_us.svc1_desc",
  },
  {
    icon: "📦",
    color: "#9C6A1F",
    image: "/img/sol-mei.jpg?v=6",
    cn: "info_about_us.svc2_cn",
    title: "info_about_us.svc2_title",
    desc: "info_about_us.svc2_desc",
  },
  {
    icon: "🚢",
    color: "#C8102E",
    image: "/img/hero-ddp-logistics.jpg?v=6",
    cn: "info_about_us.svc3_cn",
    title: "info_about_us.svc3_title",
    desc: "info_about_us.svc3_desc",
  },
  {
    icon: "🤝",
    color: "#7C3AED",
    image: "/img/sol-expo.jpg?v=6",
    cn: "info_about_us.svc4_cn",
    title: "info_about_us.svc4_title",
    desc: "info_about_us.svc4_desc",
  },
];

const INDUSTRIES = [
  {
    badge: "01",
    cn: "info_about_us.ind1_cn",
    title: "info_about_us.ind1_title",
    color: "#C8102E",
    image: "/img/cer1.jpg?v=6",
    examples: [
      "info_about_us.ind1_ex1",
      "info_about_us.ind1_ex2",
      "info_about_us.ind1_ex3",
      "info_about_us.ind1_ex4",
      "info_about_us.ind1_ex5",
      "info_about_us.ind1_ex6",
      "info_about_us.ind1_ex7",
    ],
    extraImages: ["/img/cer2.jpg?v=6", "/img/cer3.jpg?v=6", "/img/cer6.jpg?v=6"],
  },
  {
    badge: "02",
    cn: "info_about_us.ind2_cn",
    title: "info_about_us.ind2_title",
    color: "#9C6A1F",
    image: "/img/fur1.jpg?v=6",
    examples: [
      "info_about_us.ind2_ex1",
      "info_about_us.ind2_ex2",
      "info_about_us.ind2_ex3",
      "info_about_us.ind2_ex4",
      "info_about_us.ind2_ex5",
    ],
    extraImages: ["/img/fur2.jpg?v=6", "/img/fur3.jpg?v=6", "/img/fur7.jpg?v=6"],
  },
  {
    badge: "03",
    cn: "info_about_us.ind3_cn",
    title: "info_about_us.ind3_title",
    color: "#7C3AED",
    image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6",
    examples: [
      "info_about_us.ind3_ex1",
      "info_about_us.ind3_ex2",
      "info_about_us.ind3_ex3",
      "info_about_us.ind3_ex4",
      "info_about_us.ind3_ex5",
      "info_about_us.ind3_ex6",
    ],
    extraImages: [
      "/img/kitchen-equipment-sc-prod-1.jpg?v=6",
      "/img/kitchen-equipment-sc-prod-2.jpg?v=6",
      "/img/kitchen-equipment-sc-prod-3.jpg?v=6",
    ],
  },
];

const WAREHOUSE_TYPES = [
  {
    cn: "info_about_us.wh1_cn",
    title: "info_about_us.wh1_title",
    desc: "info_about_us.wh1_desc",
    image: "/img/sol-hubs.jpg?v=6",
  },
  {
    cn: "info_about_us.wh2_cn",
    title: "info_about_us.wh2_title",
    desc: "info_about_us.wh2_desc",
    image: "/img/son-epoxy-san.jpg?v=6",
  },
  {
    cn: "info_about_us.wh3_cn",
    title: "info_about_us.wh3_title",
    desc: "info_about_us.wh3_desc",
    image: "/img/sol-mei.jpg?v=6",
  },
];

const LOGISTICS_FLOW = [
  { icon: "📥", cn: "info_about_us.log1_cn", title: "info_about_us.log1_title", desc: "info_about_us.log1_desc" },
  { icon: "📦", cn: "info_about_us.log2_cn", title: "info_about_us.log2_title", desc: "info_about_us.log2_desc" },
  { icon: "🚛", cn: "info_about_us.log3_cn", title: "info_about_us.log3_title", desc: "info_about_us.log3_desc" },
];

const DIGITAL_PILLARS = [
  {
    icon: "📊",
    cn: "info_about_us.dig1_cn",
    title: "info_about_us.dig1_title",
    desc: "info_about_us.dig1_desc",
    benefit: "info_about_us.dig1_benefit",
    color: "#005F6B",
  },
  {
    icon: "🤖",
    cn: "info_about_us.dig2_cn",
    title: "info_about_us.dig2_title",
    desc: "info_about_us.dig2_desc",
    benefit: "info_about_us.dig2_benefit",
    color: "#9C6A1F",
  },
  {
    icon: "🔗",
    cn: "info_about_us.dig3_cn",
    title: "info_about_us.dig3_title",
    desc: "info_about_us.dig3_desc",
    benefit: "info_about_us.dig3_benefit",
    color: "#7C3AED",
  },
];

const PROMOTION_IMAGES = [
  "/img/sol-expo.jpg?v=6",
  "/img/sub-expo1.jpg?v=6",
  "/img/sub-expo3.jpg?v=6",
  "/img/sol-mei.jpg?v=6",
  "/img/hero-factory-tour.jpg?v=6",
  "/img/sol-custom.jpg?v=6",
];

// ─── PAGE ─────────────────────────────────────────────────────────────────

export default async function AboutUsPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb
        trail={[
          { label: t("info_about_us.bc_home"), href: "/" },
          { label: t("info_about_us.bc_info"), href: "/help" },
          { label: t("info_about_us.bc_about") },
        ]}
      />

      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Img loading="lazy" decoding="async"
            src="/img/heroint.jpg?v=6"
            alt="Container ship — Huayue chuỗi cung ứng Trung-Việt"
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
            {t("info_about_us.hero_badge")}
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
                Tên pháp lý
              </div>
              <b className="block text-[14px] leading-tight text-gold mb-2">
                CT TNHH Chuỗi Cung Ứng Huayue Việt Nam
              </b>
              <div className="text-[11.5px] opacity-90 leading-snug">
                MST: <b>{COMPANY.taxId}</b>
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
                <small className="text-[10.5px] opacity-80 uppercase tracking-wider">{t(s.l)}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GIỚI THIỆU CÔNG TY ═══════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-6">
        <div className="grid grid-cols-[1fr_1.2fr] gap-8 items-center max-md:grid-cols-1 max-md:gap-5">
          <div className="relative">
            <Img loading="lazy" decoding="async"
              src="/img/hero-buyer-promo.jpg?v=6"
              alt="Giới thiệu Huayue — chuỗi cung ứng TQ-VN"
              className="w-full aspect-[4/5] object-cover rounded-lg shadow-lg max-md:aspect-[16/10]"
            />
            <div className="absolute -bottom-4 -right-4 bg-brand text-white px-4 py-3 rounded-lg shadow-lg max-md:relative max-md:-bottom-0 max-md:-right-0 max-md:mt-3 max-md:inline-block">
              <span className="text-[10.5px] uppercase tracking-wider opacity-80">{t("info_about_us.intro_core_msg_label")}</span>
              <b className="block text-gold text-[14px] mt-0.5">
                {COMPANY.taglineCn}
              </b>
            </div>
          </div>
          <div>
            <span className="inline-block bg-accent/10 text-accent px-2.5 py-0.5 text-[11px] font-bold rounded-sm tracking-wider mb-2">
              {t("info_about_us.intro_badge")}
            </span>
            <h2 className="text-[28px] font-extrabold text-ink leading-tight mb-2 max-md:text-[22px]">
              {t("info_about_us.intro_h2")}
            </h2>
            <p className="text-[15px] text-mute font-semibold mb-4 max-md:text-[13px]">
              {t("info_about_us.intro_lead")}
            </p>
            <p className="text-[14px] text-ink leading-relaxed mb-3 max-md:text-[13px]">
              <b>Huayue</b> {t("info_about_us.intro_p1_a")}
            </p>
            <p className="text-[14px] text-ink leading-relaxed mb-4 max-md:text-[13px]">
              {t("info_about_us.intro_p2_a")} <b className="text-brand">{t("info_about_us.intro_p2_b")}</b>.
            </p>
            <blockquote className="border-l-4 border-gold bg-bg pl-4 py-2 italic text-[13.5px] text-ink leading-relaxed">
              {t("info_about_us.intro_quote_cn")}
              <br />
              <span className="text-mute not-italic text-[12px]">
                {t("info_about_us.intro_quote_vi")}
              </span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ═══ 4 DỊCH VỤ TRỌNG TÂM ═══════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 max-md:mt-8">
        <div className="text-center mb-8">
          <span className="inline-block bg-brand/10 text-brand px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
            {t("info_about_us.svc_section_badge")}
          </span>
          <h2 className="text-[26px] font-extrabold text-ink leading-tight mb-1.5 max-md:text-[20px]">
            {t("info_about_us.svc_section_h2")}
          </h2>
          <p className="text-[14px] text-mute italic max-md:text-[12.5px]">
            {t("info_about_us.svc_section_sub")}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-3">
          {CORE_SERVICES.map((s, i) => (
            <div key={s.title} className="bg-paper border border-line rounded-lg overflow-hidden flex hover:shadow-lg transition-shadow max-md:flex-col">
              <div className="w-[140px] flex-shrink-0 relative max-md:w-full max-md:aspect-[16/9]">
                <Img loading="lazy" decoding="async" src={s.image} alt={t(s.title)} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${s.color}90 0%, transparent 100%)` }} />
                <div className="absolute top-2 left-2 w-10 h-10 rounded-lg bg-white/95 flex items-center justify-center text-[22px] shadow">
                  {s.icon}
                </div>
                <div className="absolute bottom-2 left-2 text-white text-[11px] font-bold opacity-90 max-md:bottom-3 max-md:text-[13px]">
                  0{i + 1}
                </div>
              </div>
              <div className="p-4 flex-1 min-w-0">
                <div className="text-[11px] text-mute2 italic mb-0.5">{t(s.cn)}</div>
                <b className="block text-[15px] text-ink leading-tight mb-2" style={{ color: s.color }}>{t(s.title)}</b>
                <p className="text-[12.5px] text-ink/80 leading-relaxed">{t(s.desc)}</p>
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
              {t("info_about_us.ind_section_badge")}
            </span>
            <h2 className="text-[26px] font-extrabold text-ink leading-tight mb-1.5 max-md:text-[20px]">
              {t("info_about_us.ind_section_h2")}
            </h2>
            <p className="text-[13px] text-mute leading-relaxed max-w-[720px] mx-auto max-md:text-[12px]">
              <i>{t("info_about_us.ind_section_sub")}</i>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1 max-md:gap-4">
            {INDUSTRIES.map((ind) => (
              <div key={ind.title} className="bg-paper rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Img loading="lazy" decoding="async" src={ind.image} alt={t(ind.title)} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 w-12 h-12 rounded flex items-center justify-center text-white font-extrabold text-[20px]" style={{ backgroundColor: ind.color }}>
                    {ind.badge}
                  </div>
                </div>
                <div className="p-5 max-md:p-4">
                  <div className="text-[12px] text-mute italic mb-0.5">{t(ind.cn)}</div>
                  <b className="block text-[17px] text-ink mb-3 leading-tight" style={{ color: ind.color }}>{t(ind.title)}</b>
                  <ul className="space-y-1 mb-3">
                    {ind.examples.map((e) => (
                      <li key={e} className="text-[12.5px] text-ink/85 flex gap-2">
                        <span className="text-success font-bold flex-shrink-0">✓</span>
                        {t(e)}
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-line">
                    {ind.extraImages.map((src, i) => (
                      <div key={i} className="aspect-square rounded overflow-hidden bg-bg">
                        <Img loading="lazy" decoding="async" src={src} alt="" className="w-full h-full object-cover" />
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
              {t("info_about_us.promo_badge")}
            </span>
            <h2 className="text-[24px] font-extrabold text-ink leading-tight mb-3 max-md:text-[19px]">
              {t("info_about_us.promo_h2")}
            </h2>
            <p className="text-[14px] text-ink leading-relaxed mb-3 max-md:text-[13px]">
              {t("info_about_us.promo_p1_a")} <b>{t("info_about_us.promo_p1_b")}</b> {t("info_about_us.promo_p1_c")}
            </p>
            <ul className="space-y-2 text-[13.5px] text-ink/85">
              <li className="flex gap-2.5">
                <span className="text-accent text-[18px] leading-tight flex-shrink-0">🎤</span>
                <span><b>{t("info_about_us.promo_li1_b")}</b> {t("info_about_us.promo_li1_t")}</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-accent text-[18px] leading-tight flex-shrink-0">💡</span>
                <span><b>{t("info_about_us.promo_li2_b")}</b> {t("info_about_us.promo_li2_t")}</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-accent text-[18px] leading-tight flex-shrink-0">🏢</span>
                <span>{t("info_about_us.promo_li3_a")} <b>{t("info_about_us.promo_li3_b")}</b> {t("info_about_us.promo_li3_t")}</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-accent text-[18px] leading-tight flex-shrink-0">📢</span>
                <span><b>{t("info_about_us.promo_li4_b")}</b> {t("info_about_us.promo_li4_t")}</span>
              </li>
            </ul>
            <div className="mt-4 bg-gold/10 border-l-4 border-gold px-4 py-3 italic text-[14px] text-ink rounded-r max-md:text-[12.5px]">
              {t("info_about_us.promo_quote_cn")}
              <br />
              <span className="text-mute not-italic text-[12px]">
                {t("info_about_us.promo_quote_vi")}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {PROMOTION_IMAGES.map((src, i) => (
              <div key={i} className={i === 0 ? "col-span-2 row-span-2 aspect-square rounded-lg overflow-hidden" : "aspect-square rounded-lg overflow-hidden"}>
                <Img loading="lazy" decoding="async" src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition" />
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
              {t("info_about_us.wh_section_badge")}
            </span>
            <h2 className="text-[26px] font-extrabold leading-tight mb-1.5 max-md:text-[20px]">
              {t("info_about_us.wh_section_h2")}
            </h2>
            <p className="text-[14px] opacity-85 max-md:text-[12.5px]">
              {t("info_about_us.wh_section_sub_a")} <i>{t("info_about_us.wh_section_sub_b")}</i> {t("info_about_us.wh_section_sub_c")}
            </p>
          </div>

          {/* 3 warehouse types */}
          <div className="mb-7">
            <b className="block text-[11px] uppercase tracking-wider text-gold mb-3">{t("info_about_us.wh_types_label")}</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 max-md:gap-3">
              {WAREHOUSE_TYPES.map((w) => (
                <div key={w.title} className="bg-white/5 border border-white/15 rounded-lg overflow-hidden hover:border-gold/50 transition">
                  <div className="aspect-[16/10] overflow-hidden">
                    <Img loading="lazy" decoding="async" src={w.image} alt={t(w.title)} className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] text-gold italic mb-0.5">{t(w.cn)}</div>
                    <b className="block text-[14.5px] mb-1">{t(w.title)}</b>
                    <p className="text-[12px] opacity-80 leading-relaxed">{t(w.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics flow */}
          <div className="mb-7">
            <b className="block text-[11px] uppercase tracking-wider text-gold mb-3">{t("info_about_us.log_label")}</b>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {LOGISTICS_FLOW.map((l, i) => (
                <div key={l.title} className="bg-white/5 border border-white/15 rounded-lg p-4 flex items-center gap-3">
                  <div className="text-[32px] flex-shrink-0">{l.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10.5px] text-gold italic">{t(l.cn)}</div>
                    <b className="block text-[13.5px] leading-tight">{t(l.title)}</b>
                    <span className="text-[11.5px] opacity-75">{t(l.desc)}</span>
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
                <div className="text-[11px] text-gold uppercase tracking-wider mb-0.5">{t("info_about_us.customs_label")}</div>
                <b className="block text-[16px] mb-1.5 max-md:text-[14.5px]">{t("info_about_us.customs_title")}</b>
                <p className="text-[13px] opacity-90 leading-relaxed max-md:text-[12px]">
                  {t("info_about_us.customs_desc")}
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
            {t("info_about_us.digital_badge")}
          </span>
          <h2 className="text-[26px] font-extrabold text-ink leading-tight mb-1.5 max-md:text-[20px]">
            {t("info_about_us.digital_h2")}
          </h2>
          <p className="text-[13.5px] text-mute leading-relaxed max-w-[760px] mx-auto max-md:text-[12px]">
            {t("info_about_us.digital_sub")}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1 max-md:gap-4">
          {DIGITAL_PILLARS.map((d) => (
            <div key={d.title} className="bg-paper border border-line rounded-lg overflow-hidden">
              <div className="p-5 text-white" style={{ backgroundColor: d.color }}>
                <div className="text-[36px] mb-2">{d.icon}</div>
                <div className="text-[12px] italic opacity-85">{t(d.cn)}</div>
                <b className="block text-[16px] mt-0.5">{t(d.title)}</b>
              </div>
              <div className="p-4">
                <p className="text-[13px] text-ink/85 leading-relaxed mb-3">{t(d.desc)}</p>
                <div className="bg-bg border-l-4 border-success px-3 py-2 rounded-r flex items-center gap-2">
                  <span className="text-success text-[16px]">↑</span>
                  <b className="text-[12.5px] text-ink">{t(d.benefit)}</b>
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
                {t("info_about_us.mission_badge")}
              </span>
              <h2 className="text-[24px] font-extrabold leading-tight mb-3 max-md:text-[18px]">
                {t("info_about_us.mission_h2")}
              </h2>
              <p className="text-[14.5px] opacity-95 leading-relaxed max-w-[820px] mx-auto italic mb-5 max-md:text-[12.5px]">
                {t("info_about_us.mission_p")}
              </p>
            </div>

            {/* Contact split into 2 cards */}
            <div className="grid grid-cols-2 border-t border-white/15 max-md:grid-cols-1">
              {/* VN */}
              <div className="px-7 py-6 border-r border-white/15 max-md:border-r-0 max-md:border-b max-md:px-5 max-md:py-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[28px]">🇻🇳</span>
                  <div>
                    <small className="text-[10.5px] uppercase tracking-wider opacity-75">{t("info_about_us.contact_vn_label")}</small>
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
                  <div><b>MST:</b> {COMPANY.taxId}</div>
                  <div><b>Domain:</b> <a href={COMPANY.websiteUrl} className="text-gold underline hover:opacity-80">{COMPANY.domain}</a></div>
                </div>
              </div>

              {/* CN */}
              <div className="px-7 py-6 max-md:px-5 max-md:py-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[28px]">🇨🇳</span>
                  <div>
                    <small className="text-[10.5px] uppercase tracking-wider opacity-75">{t("info_about_us.contact_cn_label")}</small>
                    <b className="block text-[15px] leading-tight">{t("info_about_us.contact_cn_team")}</b>
                  </div>
                </div>
                <p className="text-[12.5px] opacity-90 leading-relaxed mb-2">
                  {COMPANY.offices.cn.addressVi}
                </p>
                <p className="text-[11.5px] opacity-70 italic">
                  {COMPANY.offices.cn.addressCn}
                </p>
                <div className="mt-3 pt-3 border-t border-white/15 text-[12px] opacity-90">
                  <b>{t("info_about_us.contact_role_a")}</b> {t("info_about_us.contact_role_b")}
                </div>
              </div>
            </div>

            {/* Hotline strip */}
            <div className="px-7 py-5 bg-black/30 border-t border-white/15 grid grid-cols-2 gap-4 items-center max-md:grid-cols-1 max-md:px-5 max-md:py-4">
              <div>
                <small className="text-[10.5px] uppercase tracking-wider opacity-75">HOTLINE</small>
                <b className="block text-gold text-[22px] mt-0.5 max-md:text-[18px]">{COMPANY.contact.hotline}</b>
                <span className="text-[11.5px] opacity-80">{t("info_about_us.hotline_support")}</span>
              </div>
              <div className="flex gap-2 max-md:flex-col">
                <Link
                  href="/buying-request"
                  className="flex-1 px-5 py-2.5 bg-gold text-brand-dark rounded font-bold text-[13px] hover:bg-[#E8943A] cursor-pointer text-center whitespace-nowrap"
                >
                  📨 {t("info_about_us.btn_quote")}
                </Link>
                <Link
                  href="/info/contact"
                  className="flex-1 px-5 py-2.5 border-2 border-white/40 text-white rounded font-bold text-[13px] hover:bg-white/10 cursor-pointer text-center whitespace-nowrap"
                >
                  📍 {t("info_about_us.btn_offices")}
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
  title: "Giới thiệu — Huayuesc · Công ty TNHH Chuỗi Cung Ứng Huayue Việt Nam",
  description:
    "Huayue là nhà cung cấp dịch vụ chuỗi cung ứng toàn diện, chuyên xuất khẩu vật liệu xây dựng, vật liệu trang trí và đồ điện gia dụng nhà bếp – phòng tắm từ Trung Quốc vào Việt Nam. Trụ sở Hà Nội + văn phòng đại diện Quảng Châu. MST 0111453693.",
};
