import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { getT } from "@/lib/t";
import { getTd } from "@/lib/td";
import { tdDeep } from "@/lib/localize";

const HERO_STATS_RAW = [
  { n: "8-12", l: "info_sample_orders.hero_stat_l_1", icon: "⏱" },
  { n: "$30-200", l: "info_sample_orders.hero_stat_l_2", icon: "💰" },
  { n: "100%", l: "info_sample_orders.hero_stat_l_3", icon: "↩" },
  { n: "4%", l: "info_sample_orders.hero_stat_l_4", icon: "📉" },
];

const WHY_REASONS_RAW = [
  {
    icon: "🤲",
    title: "info_sample_orders.why_title_1",
    desc: "info_sample_orders.why_desc_1",
  },
  {
    icon: "📐",
    title: "info_sample_orders.why_title_2",
    desc: "info_sample_orders.why_desc_2",
  },
  {
    icon: "🌈",
    title: "info_sample_orders.why_title_3",
    desc: "info_sample_orders.why_desc_3",
  },
  {
    icon: "📦",
    title: "info_sample_orders.why_title_4",
    desc: "info_sample_orders.why_desc_4",
  },
  {
    icon: "📜",
    title: "info_sample_orders.why_title_5",
    desc: "info_sample_orders.why_desc_5",
  },
  {
    icon: "🛡",
    title: "info_sample_orders.why_title_6",
    desc: "info_sample_orders.why_desc_6",
  },
];

const PROCESS_STEPS_RAW = [
  {
    n: "01",
    icon: "🔍",
    title: "info_sample_orders.step_title_1",
    duration: "5 phút",
    color: "#0E7490",
    desc: "info_sample_orders.step_desc_1",
    actions: [
      "info_sample_orders.step_action_1_1",
      "info_sample_orders.step_action_1_2",
      "info_sample_orders.step_action_1_3",
    ],
  },
  {
    n: "02",
    icon: "⚙️",
    title: "info_sample_orders.step_title_2",
    duration: "10-15 phút",
    color: "#7C3AED",
    desc: "info_sample_orders.step_desc_2",
    actions: [
      "info_sample_orders.step_action_2_1",
      "info_sample_orders.step_action_2_2",
      "info_sample_orders.step_action_2_3",
      "info_sample_orders.step_action_2_4",
    ],
  },
  {
    n: "03",
    icon: "💳",
    title: "info_sample_orders.step_title_3",
    duration: "1-3 giờ",
    color: "#16A34A",
    desc: "info_sample_orders.step_desc_3",
    actions: [
      "info_sample_orders.step_action_3_1",
      "info_sample_orders.step_action_3_2",
      "info_sample_orders.step_action_3_3",
    ],
  },
  {
    n: "04",
    icon: "🏭",
    title: "info_sample_orders.step_title_4",
    duration: "3-7 ngày",
    color: "#92400E",
    desc: "info_sample_orders.step_desc_4",
    actions: [
      "info_sample_orders.step_action_4_1",
      "info_sample_orders.step_action_4_2",
      "info_sample_orders.step_action_4_3",
      "info_sample_orders.step_action_4_4",
    ],
  },
  {
    n: "05",
    icon: "📦",
    title: "info_sample_orders.step_title_5",
    duration: "1-3 ngày",
    color: "#A21CAF",
    desc: "info_sample_orders.step_desc_5",
    actions: [
      "info_sample_orders.step_action_5_1",
      "info_sample_orders.step_action_5_2",
      "info_sample_orders.step_action_5_3",
      "info_sample_orders.step_action_5_4",
    ],
  },
  {
    n: "06",
    icon: "✈️",
    title: "info_sample_orders.step_title_6",
    duration: "3-5 ngày",
    color: "#DC2626",
    desc: "info_sample_orders.step_desc_6",
    actions: [
      "info_sample_orders.step_action_6_1",
      "info_sample_orders.step_action_6_2",
      "info_sample_orders.step_action_6_3",
      "info_sample_orders.step_action_6_4",
    ],
  },
];

const SAMPLE_TYPES_RAW = [
  {
    type: "info_sample_orders.sample_type_1",
    color: "#0E7490",
    icon: "📦",
    fee: "$30-100",
    leadtime: "8-10 ngày",
    desc: "info_sample_orders.sample_desc_1",
    bestFor: "info_sample_orders.sample_bestfor_1",
    pros: ["info_sample_orders.sample_pro_1_1", "info_sample_orders.sample_pro_1_2", "info_sample_orders.sample_pro_1_3"],
    cons: ["info_sample_orders.sample_con_1_1", "info_sample_orders.sample_con_1_2"],
  },
  {
    type: "info_sample_orders.sample_type_2",
    color: "#7C3AED",
    icon: "🎨",
    fee: "$50-150",
    leadtime: "10-12 ngày",
    desc: "info_sample_orders.sample_desc_2",
    bestFor: "info_sample_orders.sample_bestfor_2",
    pros: ["info_sample_orders.sample_pro_2_1", "info_sample_orders.sample_pro_2_2", "info_sample_orders.sample_pro_2_3"],
    cons: ["info_sample_orders.sample_con_2_1", "info_sample_orders.sample_con_2_2", "info_sample_orders.sample_con_2_3"],
  },
  {
    type: "info_sample_orders.sample_type_3",
    color: "#A21CAF",
    icon: "🏷",
    fee: "$80-300 + mock-up",
    leadtime: "12-21 ngày",
    desc: "info_sample_orders.sample_desc_3",
    bestFor: "info_sample_orders.sample_bestfor_3",
    pros: ["info_sample_orders.sample_pro_3_1", "info_sample_orders.sample_pro_3_2", "info_sample_orders.sample_pro_3_3"],
    cons: ["info_sample_orders.sample_con_3_1", "info_sample_orders.sample_con_3_2", "info_sample_orders.sample_con_3_3"],
  },
];

const COST_TABLE_RAW = [
  { item: "info_sample_orders.cost_item_1", range: "$30-100", note: "info_sample_orders.cost_note_1" },
  { item: "info_sample_orders.cost_item_2", range: "$50-150", note: "info_sample_orders.cost_note_2" },
  { item: "info_sample_orders.cost_item_3", range: "$80-300", note: "info_sample_orders.cost_note_3" },
  { item: "info_sample_orders.cost_item_4", range: "$20-40", note: "info_sample_orders.cost_note_4" },
  { item: "info_sample_orders.cost_item_5", range: "$60-120", note: "info_sample_orders.cost_note_5" },
  { item: "info_sample_orders.cost_item_6", range: "$2-5", note: "info_sample_orders.cost_note_6" },
  { item: "info_sample_orders.cost_item_7", range: "$99/tháng", note: "info_sample_orders.cost_note_7" },
  { item: "info_sample_orders.cost_item_8", range: "$0", note: "info_sample_orders.cost_note_8" },
];

const PRE_MOQ_CHECKLIST_RAW = [
  {
    category: "info_sample_orders.checklist_cat_1",
    icon: "🧪",
    items: [
      "info_sample_orders.checklist_item_1_1",
      "info_sample_orders.checklist_item_1_2",
      "info_sample_orders.checklist_item_1_3",
      "info_sample_orders.checklist_item_1_4",
    ],
  },
  {
    category: "info_sample_orders.checklist_cat_2",
    icon: "📐",
    items: [
      "info_sample_orders.checklist_item_2_1",
      "info_sample_orders.checklist_item_2_2",
      "info_sample_orders.checklist_item_2_3",
      "info_sample_orders.checklist_item_2_4",
    ],
  },
  {
    category: "info_sample_orders.checklist_cat_3",
    icon: "🎨",
    items: [
      "info_sample_orders.checklist_item_3_1",
      "info_sample_orders.checklist_item_3_2",
      "info_sample_orders.checklist_item_3_3",
      "info_sample_orders.checklist_item_3_4",
    ],
  },
  {
    category: "info_sample_orders.checklist_cat_4",
    icon: "📦",
    items: [
      "info_sample_orders.checklist_item_4_1",
      "info_sample_orders.checklist_item_4_2",
      "info_sample_orders.checklist_item_4_3",
      "info_sample_orders.checklist_item_4_4",
    ],
  },
  {
    category: "info_sample_orders.checklist_cat_5",
    icon: "📜",
    items: [
      "info_sample_orders.checklist_item_5_1",
      "info_sample_orders.checklist_item_5_2",
      "info_sample_orders.checklist_item_5_3",
      "info_sample_orders.checklist_item_5_4",
    ],
  },
];

const SAMPLE_SUB_FEATURES_RAW = [
  { icon: "♾", title: "info_sample_orders.subfeat_title_1", desc: "info_sample_orders.subfeat_desc_1" },
  { icon: "🚀", title: "info_sample_orders.subfeat_title_2", desc: "info_sample_orders.subfeat_desc_2" },
  { icon: "🤝", title: "info_sample_orders.subfeat_title_3", desc: "info_sample_orders.subfeat_desc_3" },
  { icon: "📞", title: "info_sample_orders.subfeat_title_4", desc: "info_sample_orders.subfeat_desc_4" },
  { icon: "📊", title: "info_sample_orders.subfeat_title_5", desc: "info_sample_orders.subfeat_desc_5" },
  { icon: "↩", title: "info_sample_orders.subfeat_title_6", desc: "info_sample_orders.subfeat_desc_6" },
];

const PITFALLS_RAW = [
  {
    icon: "🚫",
    title: "info_sample_orders.pitfall_title_1",
    why: "info_sample_orders.pitfall_why_1",
  },
  {
    icon: "⚠️",
    title: "info_sample_orders.pitfall_title_2",
    why: "info_sample_orders.pitfall_why_2",
  },
  {
    icon: "🔇",
    title: "info_sample_orders.pitfall_title_3",
    why: "info_sample_orders.pitfall_why_3",
  },
  {
    icon: "💸",
    title: "info_sample_orders.pitfall_title_4",
    why: "info_sample_orders.pitfall_why_4",
  },
  {
    icon: "📵",
    title: "info_sample_orders.pitfall_title_5",
    why: "info_sample_orders.pitfall_why_5",
  },
  {
    icon: "📅",
    title: "info_sample_orders.pitfall_title_6",
    why: "info_sample_orders.pitfall_why_6",
  },
];

const FAQ_RAW = [
  {
    q: "info_sample_orders.faq_q_1",
    a: "info_sample_orders.faq_a_1",
  },
  {
    q: "info_sample_orders.faq_q_2",
    a: "info_sample_orders.faq_a_2",
  },
  {
    q: "info_sample_orders.faq_q_3",
    a: "info_sample_orders.faq_a_3",
  },
  {
    q: "info_sample_orders.faq_q_4",
    a: "info_sample_orders.faq_a_4",
  },
  {
    q: "info_sample_orders.faq_q_5",
    a: "info_sample_orders.faq_a_5",
  },
  {
    q: "info_sample_orders.faq_q_6",
    a: "info_sample_orders.faq_a_6",
  },
  {
    q: "info_sample_orders.faq_q_7",
    a: "info_sample_orders.faq_a_7",
  },
  {
    q: "info_sample_orders.faq_q_8",
    a: "info_sample_orders.faq_a_8",
  },
];

async function StatTile({ n, l, icon }: { n: string; l: string; icon: string }) {
  const t = await getT();
  return (
    <div className="bg-white/10 border border-white/20 rounded p-4 backdrop-blur-sm">
      <div className="text-[20px] mb-1">{icon}</div>
      <div className="text-[24px] font-extrabold leading-none">{n}</div>
      <div className="text-[11px] opacity-85 mt-1">{t(l)}</div>
    </div>
  );
}

export default async function DatMauPage() {
  const t = await getT();
  const td = await getTd();
  const HERO_STATS = tdDeep(HERO_STATS_RAW, td);
  const WHY_REASONS = tdDeep(WHY_REASONS_RAW, td);
  const PROCESS_STEPS = tdDeep(PROCESS_STEPS_RAW, td);
  const SAMPLE_TYPES = tdDeep(SAMPLE_TYPES_RAW, td);
  const COST_TABLE = tdDeep(COST_TABLE_RAW, td);
  const PRE_MOQ_CHECKLIST = tdDeep(PRE_MOQ_CHECKLIST_RAW, td);
  const SAMPLE_SUB_FEATURES = tdDeep(SAMPLE_SUB_FEATURES_RAW, td);
  const PITFALLS = tdDeep(PITFALLS_RAW, td);
  const FAQ = tdDeep(FAQ_RAW, td);
  return (
    <>
      <Breadcrumb
        trail={[
          { label: t("info_sample_orders.bc_home"), href: "/" },
          { label: t("info_sample_orders.bc_info"), href: "/help" },
          { label: t("info_sample_orders.bc_current") },
        ]}
      />

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
            📦 {t("info_sample_orders.hero_badge")}
          </span>
          <h1 className="text-[40px] font-extrabold leading-[1.1] mb-4 max-md:text-[26px]">
            {t("info_sample_orders.hero_h1_line1")}<br />
            <span className="text-gold">{t("info_sample_orders.hero_h1_line2")}</span>
          </h1>
          <p className="text-[15px] opacity-90 max-w-[780px] leading-relaxed mb-7 max-md:text-[13px]">
            {t("info_sample_orders.hero_lead")}
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {HERO_STATS.map((s) => (
              <StatTile key={s.l} {...s} />
            ))}
          </div>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link
              href="/products"
              className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              🔍 {t("info_sample_orders.hero_btn_find")}
            </Link>
            <a
              href="#sample-subscription"
              className="px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              ♾ {t("info_sample_orders.hero_btn_sub")}
            </a>
          </div>
        </div>
      </section>

      {/* === Why samples matter ============================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-9">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("info_sample_orders.why_kicker")}</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">{t("info_sample_orders.why_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("info_sample_orders.why_lead")}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {WHY_REASONS.map((r) => (
            <div key={r.title} className="bg-paper border border-line rounded p-5 hover:border-brand transition">
              <div className="text-[32px] mb-2">{r.icon}</div>
              <b className="block text-[15px] text-ink mb-2 leading-tight">{t(r.title)}</b>
              <p className="text-[12.5px] text-mute leading-relaxed">{t(r.desc)}</p>
            </div>
          ))}
        </div>

        {/* Big comparison stat */}
        <div className="mt-6 bg-paper border-2 border-gold rounded p-5 grid grid-cols-2 gap-4 items-center max-md:grid-cols-1">
          <div className="text-center border-r border-line pr-4 max-md:border-r-0 max-md:border-b max-md:pr-0 max-md:pb-4">
            <div className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1">{t("info_sample_orders.compare_no_label")}</div>
            <div className="text-[48px] font-extrabold text-accent leading-none">22%</div>
            <div className="text-[12px] text-mute mt-1">{t("info_sample_orders.compare_no_sub")}</div>
          </div>
          <div className="text-center">
            <div className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1">{t("info_sample_orders.compare_yes_label")}</div>
            <div className="text-[48px] font-extrabold text-success leading-none">4%</div>
            <div className="text-[12px] text-mute mt-1">{t("info_sample_orders.compare_yes_sub")}</div>
          </div>
        </div>
      </section>

      {/* === Process steps ================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("info_sample_orders.process_kicker")}</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">{t("info_sample_orders.process_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("info_sample_orders.process_lead")}
          </p>
        </div>
        <div className="space-y-3">
          {PROCESS_STEPS.map((s, idx) => (
            <article key={s.n} className="bg-paper border-l-4 rounded-r p-5 max-md:p-4" style={{ borderColor: s.color }}>
              <div className="flex gap-4 max-md:flex-col">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded flex items-center justify-center font-extrabold text-white text-[18px] shadow-md"
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
                        <span className="text-[10.5px] uppercase tracking-wider font-bold" style={{ color: s.color }}>{t("info_sample_orders.step_prefix")} {s.n}</span>
                      </div>
                    </div>
                    <span className="text-[11px] bg-bg border border-line px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider text-mute">
                      🕒 {s.duration}
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

      {/* === Giải thích Văn phòng Huayue Quảng Châu ========================================= */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="rounded p-6 max-md:p-4 border-2 border-[#A21CAF]" style={{ background: "linear-gradient(135deg, #A21CAF08, #A21CAF02)" }}>
          <div className="flex items-start gap-4 max-md:flex-col">
            <div className="w-16 h-16 rounded-md flex items-center justify-center text-[30px] flex-shrink-0" style={{ background: "#A21CAF20" }}>
              🏪
            </div>
            <div className="flex-1">
              <span className="inline-block bg-[#A21CAF] text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm mb-2">
                {t("info_sample_orders.hub_kicker")}
              </span>
              <h2 className="text-[20px] font-bold text-ink mb-2">{t("info_sample_orders.hub_h2")}</h2>
              <p className="text-[13px] text-ink leading-relaxed mb-3">
                {t("info_sample_orders.hub_lead")}
              </p>
              <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
                <div className="bg-paper border border-line rounded p-3 text-center">
                  <div className="text-[22px] font-extrabold text-[#A21CAF]">$60-120</div>
                  <div className="text-[11px] text-mute">{t("info_sample_orders.hub_label_alone")}</div>
                </div>
                <div className="bg-paper border border-line rounded p-3 text-center">
                  <div className="text-[22px] font-extrabold text-[#A21CAF]">$20-40</div>
                  <div className="text-[11px] text-mute">{t("info_sample_orders.hub_label_hub")}</div>
                </div>
                <div className="bg-success/10 border border-success/30 rounded p-3 text-center">
                  <div className="text-[22px] font-extrabold text-success">−60%</div>
                  <div className="text-[11px] text-success">{t("info_sample_orders.hub_label_save")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === 3 sample types ================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("info_sample_orders.types_kicker")}</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">{t("info_sample_orders.types_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("info_sample_orders.types_lead")}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {SAMPLE_TYPES.map((s) => (
            <article key={s.type} className="bg-paper border-2 rounded overflow-hidden flex flex-col" style={{ borderColor: s.color }}>
              <div className="px-5 py-4 text-white" style={{ background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}DD 100%)` }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[28px]">{s.icon}</span>
                  <h3 className="text-[20px] font-extrabold">{t(s.type)}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
                  <div>
                    <div className="opacity-80">{t("info_sample_orders.types_fee_label")}</div>
                    <b className="text-[14px]">{s.fee}</b>
                  </div>
                  <div>
                    <div className="opacity-80">{t("info_sample_orders.types_leadtime_label")}</div>
                    <b className="text-[14px]">{s.leadtime}</b>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[12.5px] text-mute leading-relaxed mb-3">{t(s.desc)}</p>
                <div className="bg-bg border border-line rounded p-2.5 mb-3">
                  <b className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1 block">{t("info_sample_orders.types_bestfor_label")}</b>
                  <p className="text-[11.5px] text-ink leading-snug">{t(s.bestFor)}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <b className="block text-success mb-1">✓ {t("info_sample_orders.types_pros_label")}</b>
                    <ul className="space-y-0.5 text-mute">
                      {s.pros.map((p, i) => <li key={i}>• {t(p)}</li>)}
                    </ul>
                  </div>
                  <div>
                    <b className="block text-accent mb-1">✕ {t("info_sample_orders.types_cons_label")}</b>
                    <ul className="space-y-0.5 text-mute">
                      {s.cons.map((c, i) => <li key={i}>• {t(c)}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === Cost breakdown table =========================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("info_sample_orders.cost_kicker")}</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">{t("info_sample_orders.cost_h2")}</h2>
        </div>
        <div className="bg-paper border border-line rounded overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-bg border-b-2 border-brand">
                <th className="text-left px-4 py-3 font-bold text-ink">{t("info_sample_orders.cost_th_item")}</th>
                <th className="text-left px-4 py-3 font-bold text-ink">{t("info_sample_orders.cost_th_fee")}</th>
                <th className="text-left px-4 py-3 font-bold text-ink max-md:hidden">{t("info_sample_orders.cost_th_note")}</th>
              </tr>
            </thead>
            <tbody>
              {COST_TABLE.map((c, i) => (
                <tr key={i} className="border-b border-line hover:bg-bg/50">
                  <td className="px-4 py-2.5 text-ink font-semibold">{t(c.item)}</td>
                  <td className="px-4 py-2.5 text-brand font-bold">{c.range}</td>
                  <td className="px-4 py-2.5 text-mute text-[12px] max-md:hidden">{t(c.note)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11.5px] text-mute mt-3 italic text-center">
          💡 {t("info_sample_orders.cost_footnote")}
        </p>
      </section>

      {/* === Pre-MOQ checklist ============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("info_sample_orders.checklist_kicker")}</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">{t("info_sample_orders.checklist_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("info_sample_orders.checklist_lead")}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {PRE_MOQ_CHECKLIST.map((c) => (
            <article key={c.category} className="bg-paper border border-line rounded p-5">
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-line">
                <div className="w-12 h-12 rounded-md bg-brand/10 border border-brand/30 flex items-center justify-center text-[24px] flex-shrink-0">
                  {c.icon}
                </div>
                <h3 className="text-[16px] font-bold text-ink">{t(c.category)}</h3>
              </div>
              <ul className="space-y-2 text-[12.5px]">
                {c.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-ink leading-relaxed">
                    <input type="checkbox" className="mt-0.5 flex-shrink-0 cursor-pointer" />
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* === Gói đăng ký mẫu ============================================ */}
      <section id="sample-subscription" className="max-w-[1200px] mx-auto px-4 mt-12 scroll-mt-20">
        <div className="rounded overflow-hidden border-2 border-gold">
          <div className="px-6 py-5 text-brand-dark bg-gold">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="text-[36px]">♾</span>
                <div>
                  <span className="text-[10.5px] uppercase tracking-wider font-bold">{t("info_sample_orders.sub_kicker")}</span>
                  <h2 className="text-[24px] font-extrabold leading-tight">{t("info_sample_orders.sub_h2")}</h2>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[36px] font-extrabold leading-none">$99</div>
                <div className="text-[12px]">{t("info_sample_orders.sub_per_month")}</div>
              </div>
            </div>
          </div>
          <div className="p-6 max-md:p-4 bg-paper">
            <p className="text-[13px] text-ink leading-relaxed mb-4">
              {t("info_sample_orders.sub_lead")}
            </p>
            <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
              {SAMPLE_SUB_FEATURES.map((f) => (
                <div key={f.title} className="bg-bg border border-line rounded p-3 hover:border-gold transition">
                  <div className="text-[24px] mb-1.5">{f.icon}</div>
                  <b className="block text-[13px] text-ink mb-1 leading-tight">{t(f.title)}</b>
                  <p className="text-[11.5px] text-mute leading-snug">{t(f.desc)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <a
                href={`mailto:mcy@huayuesc.com?subject=${encodeURIComponent(td("Gói đăng ký mẫu"))}`}
                className="inline-block px-6 py-3 bg-brand text-white rounded-sm font-bold text-[14px] hover:bg-brand-light"
              >
                🚀 {t("info_sample_orders.sub_cta")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === Common pitfalls ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-accent font-bold">⚠️ {t("info_sample_orders.pitfalls_kicker")}</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">{t("info_sample_orders.pitfalls_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("info_sample_orders.pitfalls_lead")}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {PITFALLS.map((p) => (
            <div key={p.title} className="bg-paper border border-line rounded p-4 hover:border-accent transition">
              <div className="flex gap-3 items-start">
                <span className="text-[24px] flex-shrink-0">{p.icon}</span>
                <div className="flex-1">
                  <b className="block text-[13.5px] text-ink mb-1.5 leading-tight">{t(p.title)}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{t(p.why)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === FAQ =========================================================== */}
      <section className="max-w-[900px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("info_sample_orders.faq_kicker")}</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">{t("info_sample_orders.faq_h2")}</h2>
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
          <h3 className="text-[28px] font-extrabold mb-2 max-md:text-[22px]">{t("info_sample_orders.cta_h3")}</h3>
          <p className="text-[14px] opacity-90 mb-6 max-w-[660px] mx-auto leading-relaxed">
            {t("info_sample_orders.cta_lead")}
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              🔍 {t("info_sample_orders.cta_btn_browse")}
            </Link>
            <Link
              href="/buying-request"
              className="inline-block px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              📝 {t("info_sample_orders.cta_btn_rfq")}
            </Link>
            <a
              href="mailto:mcy@huayuesc.com"
              className="inline-block px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90"
            >
              💬 {t("info_sample_orders.cta_btn_consult")}
            </a>
          </div>
          <div className="mt-5 pt-5 border-t border-white/15 text-[11.5px] opacity-75 max-w-[680px] mx-auto leading-relaxed">
            {t("info_sample_orders.cta_footnote")}
          </div>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata() {
  const td = await getTd();
  return {
    title: td("Đặt mẫu (Sample Order) — Huayuesc").split("— Huayuesc").join("· Huayuesc"),
    description: td("Quy trình 6 bước đặt sample từ NCC Trung Quốc về Việt Nam. văn phòng Huayue Quảng Châu gom shipping tiết kiệm 50-60% cước, thời gian giao 8-12 ngày, hoàn 100% phí khi đặt MOQ. 22%→4% giảm rủi ro khiếu nại nhờ sample."),
  };
}
