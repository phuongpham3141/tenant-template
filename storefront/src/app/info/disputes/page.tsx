import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { getT } from "@/lib/t";
import { getTd } from "@/lib/td";
import { tdDeep } from "@/lib/localize";

const HERO_STATS_RAW = [
  { n: "Đa số", l: "Khiếu nại có lợi cho buyer khi evidence đầy đủ", icon: "⚖️" },
  { n: "<24h", l: "Phản hồi trung bình", icon: "⏱" },
  { n: "Tích luỹ", l: "Giá trị đơn được Huayue bảo vệ", icon: "🛡" },
  { n: "24/7", l: "Hotline khẩn cấp", icon: "📞" },
];

const COMPLAINT_TYPES_RAW = [
  {
    icon: "🎨",
    color: "#DC2626",
    title: "Sai đặc tả kỹ thuật",
    desc: "Hàng giao không đúng spec đã ký trong PI/HĐ — sai size, màu, chất liệu, certification (CE, FCC, RoHS thiếu hoặc giả).",
    successRate: "94%",
    avgDays: "5",
    evidence: "Ảnh hàng tại kho · spec PO · báo cáo lab nếu cần",
  },
  {
    icon: "📊",
    color: "#7C2D12",
    title: "Chất lượng kém / lỗi AQL",
    desc: "Tỷ lệ lỗi major + minor vượt AQL 2.5 đã thoả thuận. Lỗi defect không nằm trong tolerance pre-production sample đã ký.",
    successRate: "82%",
    avgDays: "9",
    evidence: "Báo cáo SGS/BV · ảnh defect · sample so sánh · video unboxing",
  },
  {
    icon: "🔢",
    color: "#92400E",
    title: "Thiếu số lượng",
    desc: "Đếm thực tế ít hơn PO — không có thông báo trước. Tolerance cho phép thông thường ±2% (theo Incoterms 2020).",
    successRate: "96%",
    avgDays: "3",
    evidence: "Packing List · ảnh đếm · video unload container · biên bản kho",
  },
  {
    icon: "⏰",
    color: "#1E3A8A",
    title: "Trễ giao hàng",
    desc: "NCC không giao đúng thời hạn ghi trong PO mà không có thông báo lý do force majeure hợp lệ. Tolerance thông thường 14 ngày.",
    successRate: "78%",
    avgDays: "7",
    evidence: "PO ngày thời hạn · bằng chứng email/chat · loss tracker (nếu có khách hàng cuối cancel)",
  },
  {
    icon: "📦",
    color: "#0E7490",
    title: "Hư hỏng do đóng gói",
    desc: "Hư hỏng do NCC đóng gói sai chuẩn — carton ướt, không pallet, không corner protector cho hàng fragile, không bubble wrap...",
    successRate: "85%",
    avgDays: "11",
    evidence: "Ảnh tình trạng carton lúc unload · biên bản tại cảng · so sánh với packaging spec",
  },
  {
    icon: "🚢",
    color: "#0369A1",
    title: "Hư hỏng vận chuyển",
    desc: "Tổn thất trong hành trình do thiên tai, va chạm, hoả hoạn, đắm tàu — KHÔNG phải lỗi NCC. Xử lý qua Marine Insurance, không qua Bảo đảm Giao dịch.",
    successRate: "91%",
    avgDays: "21",
    evidence: "Bill of Lading · biên bản hãng tàu · ảnh tổn thất · survey report bảo hiểm",
  },
  {
    icon: "🚨",
    color: "#9F1239",
    title: "Gian lận / lừa đảo",
    desc: "NCC nhận tiền nhưng không sản xuất, biến mất, hoặc giao hàng giả mạo brand. Trường hợp nghiêm trọng nhất — escalate ngay.",
    successRate: "100%",
    avgDays: "5",
    evidence: "Toàn bộ giao tiếp · tracking thanh toán · báo cáo Tianyancha về NCC",
  },
  {
    icon: "©",
    color: "#581C87",
    title: "Vi phạm IP / sao chép",
    desc: "Hàng giao infringe trademark, design patent, copyright của bên thứ ba — buyer có rủi ro pháp lý nếu nhập khẩu. Xử lý ưu tiên cao.",
    successRate: "89%",
    avgDays: "15",
    evidence: "Tài liệu IP gốc · ảnh hàng vi phạm · thông báo từ cơ quan hải quan nếu có",
  },
];

const ESCALATION_TIERS_RAW = [
  {
    tier: "1",
    label: "Đối thoại trực tiếp",
    color: "#16A34A",
    duration: "0-3 ngày",
    bgRate: "62%",
    description: "Buyer mở dispute trên dashboard, NCC nhận thông báo trong 1 giờ. Hai bên thương lượng trực tiếp qua chat CSR (có translator), tìm giải pháp tự nguyện. ~62% case kết thúc tại tier này — NCC chấp nhận lỗi và đề xuất giải pháp (giảm giá, ship hàng bù, refund partial).",
    actions: [
      "Buyer mở dispute kèm bằng chứng",
      "NCC phản hồi trong 24-48h",
      "Đối thoại có đội Huayue Quảng Châu theo dõi",
      "Đạt thoả thuận → đóng dispute",
    ],
  },
  {
    tier: "2",
    label: "Huayue Mediation",
    color: "#005F6B",
    duration: "3-14 ngày",
    bgRate: "31%",
    description: "Nếu tier 1 không đạt thoả thuận trong 5 ngày, dispute được nâng lên tier 2 — Dispute Officer của Huayue (có chứng chỉ hoà giải thương mại theo NĐ 22/2017) takes over. Officer review bằng chứng, tổ chức call 3 phương Buyer-NCC-CSR, ra phán quyết ràng buộc theo điều khoản dịch vụ.",
    actions: [
      "Dispute Officer review case 2-3 ngày",
      "Call 3 phương 60-90 phút (có dịch song song)",
      "CSR ra phán quyết dựa trên evidence + điều khoản",
      "Thi hành: refund/replace/credit qua tài khoản trung gian",
    ],
  },
  {
    tier: "3",
    label: "Trọng tài VIAC / CIETAC",
    color: "#A21CAF",
    duration: "60-180 ngày",
    bgRate: "7%",
    description: "Nếu một bên không chấp nhận phán quyết tier 2, có quyền đưa ra trọng tài chính thức — VIAC (Vietnam International Arbitration Centre) cho luật Việt Nam, hoặc CIETAC (China International Economic and Trade Arbitration Commission) cho luật Trung Quốc, theo điều khoản đã chọn trong PI. Phán quyết trọng tài có giá trị thi hành quốc tế (Công ước New York 1958).",
    actions: [
      "Nộp đơn yêu cầu trọng tài + phí ~$2,000-8,000",
      "Hội đồng 1-3 trọng tài viên được chỉ định",
      "Phiên hearing online hoặc tại HQ trọng tài",
      "Phán quyết binding, thi hành quốc tế qua New York Convention",
    ],
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "info_disputes.proc_01_title",
    deadline: "info_disputes.proc_01_deadline",
    desc: "info_disputes.proc_01_desc",
    tips: [
      "info_disputes.proc_01_tip1",
      "info_disputes.proc_01_tip2",
      "info_disputes.proc_01_tip3",
    ],
  },
  {
    n: "02",
    title: "info_disputes.proc_02_title",
    deadline: "info_disputes.proc_02_deadline",
    desc: "info_disputes.proc_02_desc",
    tips: [
      "info_disputes.proc_02_tip1",
      "info_disputes.proc_02_tip2",
      "info_disputes.proc_02_tip3",
      "info_disputes.proc_02_tip4",
    ],
  },
  {
    n: "03",
    title: "info_disputes.proc_03_title",
    deadline: "info_disputes.proc_03_deadline",
    desc: "info_disputes.proc_03_desc",
    tips: [
      "info_disputes.proc_03_tip1",
      "info_disputes.proc_03_tip2",
      "info_disputes.proc_03_tip3",
    ],
  },
  {
    n: "04",
    title: "info_disputes.proc_04_title",
    deadline: "info_disputes.proc_04_deadline",
    desc: "info_disputes.proc_04_desc",
    tips: [
      "info_disputes.proc_04_tip1",
      "info_disputes.proc_04_tip2",
      "info_disputes.proc_04_tip3",
    ],
  },
  {
    n: "05",
    title: "info_disputes.proc_05_title",
    deadline: "info_disputes.proc_05_deadline",
    desc: "info_disputes.proc_05_desc",
    tips: [
      "info_disputes.proc_05_tip1",
      "info_disputes.proc_05_tip2",
      "info_disputes.proc_05_tip3",
    ],
  },
  {
    n: "06",
    title: "info_disputes.proc_06_title",
    deadline: "info_disputes.proc_06_deadline",
    desc: "info_disputes.proc_06_desc",
    tips: [
      "info_disputes.proc_06_tip1",
      "info_disputes.proc_06_tip2",
      "info_disputes.proc_06_tip3",
    ],
  },
  {
    n: "07",
    title: "info_disputes.proc_07_title",
    deadline: "info_disputes.proc_07_deadline",
    desc: "info_disputes.proc_07_desc",
    tips: [
      "info_disputes.proc_07_tip1",
      "info_disputes.proc_07_tip2",
      "info_disputes.proc_07_tip3",
    ],
  },
];

const OUTCOMES = [
  { icon: "💰", title: "info_disputes.outcome_1_title", pct: "38%", desc: "info_disputes.outcome_1_desc" },
  { icon: "📊", title: "info_disputes.outcome_2_title", pct: "27%", desc: "info_disputes.outcome_2_desc" },
  { icon: "🔄", title: "info_disputes.outcome_3_title", pct: "19%", desc: "info_disputes.outcome_3_desc" },
  { icon: "🎟", title: "info_disputes.outcome_4_title", pct: "11%", desc: "info_disputes.outcome_4_desc" },
  { icon: "⚖️", title: "info_disputes.outcome_5_title", pct: "5%", desc: "info_disputes.outcome_5_desc" },
];

const CASE_STUDIES = [
  {
    title: "info_disputes.case_1_title",
    industry: "info_disputes.case_1_industry",
    days: "11 ngày",
    outcome: "info_disputes.case_1_outcome",
    detail: "info_disputes.case_1_detail",
  },
  {
    title: "info_disputes.case_2_title",
    industry: "info_disputes.case_2_industry",
    days: "7 ngày",
    outcome: "info_disputes.case_2_outcome",
    detail: "info_disputes.case_2_detail",
  },
  {
    title: "info_disputes.case_3_title",
    industry: "info_disputes.case_3_industry",
    days: "21 ngày",
    outcome: "info_disputes.case_3_outcome",
    detail: "info_disputes.case_3_detail",
  },
  {
    title: "info_disputes.case_4_title",
    industry: "info_disputes.case_4_industry",
    days: "28 ngày",
    outcome: "info_disputes.case_4_outcome",
    detail: "info_disputes.case_4_detail",
  },
];

const EMERGENCY_CHANNELS = [
  { icon: "🚨", title: "info_disputes.emch_1_title", value: "+86 181-2225-6999", desc: "info_disputes.emch_1_desc" },
  { icon: "💬", title: "info_disputes.emch_2_title", value: "dashboard /buyer-center", desc: "info_disputes.emch_2_desc" },
  { icon: "✉", title: "info_disputes.emch_3_title", value: "dispute@huayuesc.vn", desc: "info_disputes.emch_3_desc" },
  { icon: "📱", title: "info_disputes.emch_4_title", value: "+84 +86 181-2225-6999", desc: "info_disputes.emch_4_desc" },
];

const FAQ = [
  {
    q: "info_disputes.faq_1_q",
    a: "info_disputes.faq_1_a",
  },
  {
    q: "info_disputes.faq_2_q",
    a: "info_disputes.faq_2_a",
  },
  {
    q: "info_disputes.faq_3_q",
    a: "info_disputes.faq_3_a",
  },
  {
    q: "info_disputes.faq_4_q",
    a: "info_disputes.faq_4_a",
  },
  {
    q: "info_disputes.faq_5_q",
    a: "info_disputes.faq_5_a",
  },
  {
    q: "info_disputes.faq_6_q",
    a: "info_disputes.faq_6_a",
  },
  {
    q: "info_disputes.faq_7_q",
    a: "info_disputes.faq_7_a",
  },
  {
    q: "info_disputes.faq_8_q",
    a: "info_disputes.faq_8_a",
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

export default async function KhieuNaiPage() {
  const t = await getT();
  const td = await getTd();
  const HERO_STATS = tdDeep(HERO_STATS_RAW, td);
  const COMPLAINT_TYPES = tdDeep(COMPLAINT_TYPES_RAW, td);
  const ESCALATION_TIERS = tdDeep(ESCALATION_TIERS_RAW, td);
  return (
    <>
      <Breadcrumb
        trail={[
          { label: t("info_disputes.bc_home"), href: "/" },
          { label: t("info_disputes.bc_info"), href: "/help" },
          { label: t("info_disputes.bc_current") },
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
            {t("info_disputes.hero_badge")}
          </span>
          <h1 className="text-[40px] font-extrabold leading-[1.1] mb-4 max-md:text-[26px]">
            {t("info_disputes.hero_h1_line1")}<br />
            <span className="text-gold">{t("info_disputes.hero_h1_span")}</span>
          </h1>
          <p className="text-[15px] opacity-90 max-w-[780px] leading-relaxed mb-7 max-md:text-[13px]">
            {t("info_disputes.hero_p")}
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {HERO_STATS.map((s) => (
              <StatTile key={s.l} {...s} />
            ))}
          </div>
          <div className="mt-6 flex gap-3 flex-wrap">
            <a
              href="#mo-disputes"
              className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              {t("info_disputes.hero_cta_open")}
            </a>
            <a
              href="tel:19006688"
              className="px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90"
            >
              {t("info_disputes.hero_cta_hotline")}
            </a>
          </div>
        </div>
      </section>

      {/* === When to file =================================================== */}
      <div className="max-w-[1200px] mx-auto px-4 mt-7">
        <div className="bg-paper border-l-4 border-gold rounded-r p-5">
          <div className="flex items-start gap-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-[26px] flex-shrink-0">
              ⏰
            </div>
            <div className="flex-1">
              <h2 className="text-[18px] font-bold text-ink mb-2">{t("info_disputes.inspection_h2")}</h2>
              <p className="text-[13px] text-mute leading-relaxed mb-3">
                {t("info_disputes.inspection_p")}
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-[12px] max-md:grid-cols-1">
                <div className="bg-success/10 border border-success/30 rounded-sm p-3">
                  <div className="font-bold text-success">{t("info_disputes.insp_t1_range")}</div>
                  <div className="text-mute">{t("info_disputes.insp_t1_desc")}</div>
                </div>
                <div className="bg-gold/10 border border-gold/30 rounded-sm p-3">
                  <div className="font-bold text-[#9C6A1F]">{t("info_disputes.insp_t2_range")}</div>
                  <div className="text-mute">{t("info_disputes.insp_t2_desc")}</div>
                </div>
                <div className="bg-mute/10 border border-mute2/30 rounded-sm p-3">
                  <div className="font-bold text-mute">{t("info_disputes.insp_t3_range")}</div>
                  <div className="text-mute">{t("info_disputes.insp_t3_desc")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Complaint types ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("info_disputes.types_eyebrow")}</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">{t("info_disputes.types_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("info_disputes.types_p")}
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {COMPLAINT_TYPES.map((t) => (
            <article key={t.title} className="bg-paper border border-line rounded overflow-hidden hover:border-brand hover:shadow-md transition flex flex-col">
              <div className="px-4 pt-3 pb-2 border-b border-line" style={{ background: `linear-gradient(135deg, ${t.color}10, ${t.color}03)` }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[26px]">{t.icon}</span>
                  <span className="text-[10.5px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: t.color, color: "#fff" }}>
                    {t.successRate} {td("thắng")}
                  </span>
                </div>
                <b className="block text-[14px] font-bold text-ink leading-tight">{t.title}</b>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[12px] text-mute leading-relaxed mb-3 flex-1">{t.desc}</p>
                <div className="text-[11px] space-y-1 border-t border-line pt-2.5">
                  <div className="flex justify-between"><span className="text-mute">⏱ {td("TB giải quyết")}</span><b className="text-ink">{t.avgDays} {td("ngày")}</b></div>
                  <div className="text-mute pt-1">📎 <span className="text-ink">{t.evidence}</span></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === 3-tier escalation =============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("info_disputes.tiers_eyebrow")}</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">{t("info_disputes.tiers_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("info_disputes.tiers_p")}
          </p>
        </div>
        <div className="space-y-4">
          {ESCALATION_TIERS.map((t) => (
            <div key={t.tier} className="bg-paper border-l-4 rounded-r p-5 max-md:p-4" style={{ borderColor: t.color }}>
              <div className="flex items-start gap-4 max-md:flex-col">
                <div className="w-16 h-16 rounded flex items-center justify-center font-extrabold text-[32px] flex-shrink-0 text-white shadow-md" style={{ backgroundColor: t.color }}>
                  {t.tier}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <div>
                      <span className="text-[10.5px] uppercase tracking-wider font-bold" style={{ color: t.color }}>TIER {t.tier}</span>
                      <h3 className="text-[20px] font-bold text-ink leading-tight">{t.label}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-[10px] text-mute uppercase">{td("Thời gian")}</div>
                        <b className="text-[14px] text-ink">{t.duration}</b>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-mute uppercase">{td("% Case xử lý tại tier này")}</div>
                        <b className="text-[18px] font-extrabold" style={{ color: t.color }}>{t.bgRate}</b>
                      </div>
                    </div>
                  </div>
                  <p className="text-[13px] text-mute leading-relaxed mb-3">{t.description}</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] max-md:grid-cols-1">
                    {t.actions.map((a, i) => (
                      <li key={i} className="flex gap-2 text-ink">
                        <span style={{ color: t.color }} className="flex-shrink-0">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === Process steps ================================================== */}
      <section id="mo-disputes" className="max-w-[1200px] mx-auto px-4 mt-12 scroll-mt-20">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("info_disputes.process_eyebrow")}</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">{t("info_disputes.process_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("info_disputes.process_p")}
          </p>
        </div>
        <div className="space-y-3">
          {PROCESS_STEPS.map((s, idx) => (
            <article key={s.n} className="bg-paper border border-line rounded p-5 max-md:p-4 flex gap-4 max-md:flex-col">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-[16px] shadow-md">
                  {s.n}
                </div>
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="flex-1 w-0.5 bg-line mt-2 min-h-[20px] max-md:hidden" aria-hidden="true" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                  <h3 className="text-[16px] font-bold text-ink">{t(s.title)}</h3>
                  <span className="text-[10.5px] bg-accent/15 text-accent px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                    🕒 {t(s.deadline)}
                  </span>
                </div>
                <p className="text-[13px] text-mute leading-relaxed mb-3">{t(s.desc)}</p>
                <div className="bg-bg border border-line rounded p-3">
                  <b className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1.5 block">{t("info_disputes.process_tips_label")}</b>
                  <ul className="space-y-1 text-[12px]">
                    {s.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-ink">
                        <span className="text-brand flex-shrink-0">✓</span>
                        <span>{t(tip)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === Outcomes distribution ========================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("info_disputes.outcomes_eyebrow")}</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">{t("info_disputes.outcomes_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("info_disputes.outcomes_p")}
          </p>
        </div>
        <div className="grid grid-cols-5 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {OUTCOMES.map((o) => (
            <div key={o.title} className="bg-paper border border-line rounded p-4 hover:border-brand transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[28px]">{o.icon}</span>
                <span className="text-[20px] font-extrabold text-brand">{o.pct}</span>
              </div>
              <b className="block text-[14px] text-ink mb-2 leading-tight">{t(o.title)}</b>
              <p className="text-[11.5px] text-mute leading-relaxed">{t(o.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Case studies =================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("info_disputes.cases_eyebrow")}</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">{t("info_disputes.cases_h2")}</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            {t("info_disputes.cases_p")}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {CASE_STUDIES.map((c) => (
            <article key={c.title} className="bg-paper border border-line rounded p-5">
              <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                <div>
                  <span className="inline-block text-[10px] uppercase tracking-wider font-bold bg-bg border border-line px-2 py-0.5 rounded-sm text-mute mb-1">
                    {t(c.industry)}
                  </span>
                  <h3 className="text-[15px] font-bold text-ink leading-tight">{t(c.title)}</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3 text-[12px]">
                <div className="bg-bg border border-line rounded p-2">
                  <div className="text-mute uppercase tracking-wider text-[10px]">{t("info_disputes.cases_time_label")}</div>
                  <b className="text-ink">{td(c.days)}</b>
                </div>
                <div className="bg-success/10 border border-success/30 rounded p-2">
                  <div className="text-success uppercase tracking-wider text-[10px]">{t("info_disputes.cases_result_label")}</div>
                  <b className="text-success">{t(c.outcome)}</b>
                </div>
              </div>
              <p className="text-[12.5px] text-ink leading-relaxed">{t(c.detail)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* === Emergency channels ============================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="rounded p-5 max-md:p-4 border-2 border-accent" style={{ background: "linear-gradient(135deg, #DC262610, #DC262603)" }}>
          <div className="flex items-start gap-4 mb-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-[26px] text-white flex-shrink-0 animate-pulse">
              🚨
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-ink mb-1">{t("info_disputes.emergency_h2")}</h2>
              <p className="text-[13px] text-mute leading-relaxed">
                {t("info_disputes.emergency_p")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
            {EMERGENCY_CHANNELS.map((c) => (
              <div key={c.title} className="bg-paper border border-line rounded p-3.5">
                <div className="text-[24px] mb-1.5">{c.icon}</div>
                <b className="block text-[13px] text-ink mb-1">{t(c.title)}</b>
                <div className="text-[12.5px] text-accent font-bold mb-1.5 break-all">{c.value}</div>
                <p className="text-[11px] text-mute leading-snug">{t(c.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Legal references =============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="bg-paper border border-line rounded p-5">
          <h2 className="text-[18px] font-bold text-ink mb-3">{t("info_disputes.legal_h2")}</h2>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 text-[12.5px]">
            <div>
              <b className="block text-[11px] uppercase tracking-wider text-brand font-bold mb-2">{t("info_disputes.legal_col_vn")}</b>
              <ul className="space-y-1.5 text-mute">
                <li>• {td("Luật Thương mại 2005 — Điều 318 (thời hiệu khiếu nại)")}</li>
                <li>• {td("Luật Trọng tài Thương mại 2010")}</li>
                <li>• {td("NĐ 22/2017/NĐ-CP về hoà giải thương mại")}</li>
                <li>• {td("Bộ luật Dân sự 2015 — chế định hợp đồng")}</li>
                <li>• {td("NĐ 13/2023/NĐ-CP — bảo vệ dữ liệu cá nhân")}</li>
              </ul>
            </div>
            <div>
              <b className="block text-[11px] uppercase tracking-wider text-brand font-bold mb-2">{t("info_disputes.legal_col_intl")}</b>
              <ul className="space-y-1.5 text-mute">
                <li>• {td("Công ước New York 1958 — thi hành phán quyết trọng tài")}</li>
                <li>• UNCITRAL Model Law on International Commercial Arbitration</li>
                <li>• ICC Rules of Arbitration 2021</li>
                <li>• {td("Incoterms 2020 (ICC) — phân chia trách nhiệm")}</li>
                <li>• {td("CISG 1980 — Hợp đồng mua bán hàng hoá quốc tế")}</li>
              </ul>
            </div>
            <div>
              <b className="block text-[11px] uppercase tracking-wider text-brand font-bold mb-2">{t("info_disputes.legal_col_org")}</b>
              <ul className="space-y-1.5 text-mute">
                <li>• <b className="text-ink">VIAC</b> {td("— Vietnam International Arbitration Centre (Hà Nội + HCM)")}</li>
                <li>• <b className="text-ink">CIETAC</b> {td("— China International Economic and Trade Arbitration Commission (Bắc Kinh)")}</li>
                <li>• <b className="text-ink">SIAC</b> {td("— Singapore International Arbitration Centre (cho case ASEAN)")}</li>
                <li>• <b className="text-ink">HKIAC</b> {td("— Hong Kong International Arbitration Centre")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* === FAQ =========================================================== */}
      <section className="max-w-[900px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">{t("info_disputes.faq_eyebrow")}</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">{t("info_disputes.faq_h2")}</h2>
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
          <h3 className="text-[28px] font-extrabold mb-2 max-md:text-[22px]">{t("info_disputes.cta_h3")}</h3>
          <p className="text-[14px] opacity-90 mb-6 max-w-[660px] mx-auto leading-relaxed">
            {t("info_disputes.cta_p")}
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/buyer-center/orders"
              className="inline-block px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              {t("info_disputes.cta_dashboard")}
            </Link>
            <a
              href="mailto:dispute@huayuesc.vn"
              className="inline-block px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              ✉ dispute@huayuesc.vn
            </a>
            <a
              href="tel:19006688"
              className="inline-block px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90"
            >
              🚨 +86 181-2225-6999 — 24/7
            </a>
          </div>
          <div className="mt-5 pt-5 border-t border-white/15 text-[11.5px] opacity-75 max-w-[680px] mx-auto leading-relaxed">
            {t("info_disputes.cta_footer")}
          </div>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata() {
  const td = await getTd();
  return {
    title: td("Khiếu nại & tranh chấp") + " · Huayuesc Dispute Resolution",
    description: td("Hệ thống giải quyết tranh chấp 3 cấp độ: đối thoại trực tiếp, Huayue Mediation theo NĐ 22/2017, trọng tài VIAC Hà Nội theo Công ước New York 1958. đa số case có lợi cho buyer khi evidence đầy đủ trong 3.2 ngày trung bình. Hotline 24/7: +86 181-2225-6999."),
  };
}
