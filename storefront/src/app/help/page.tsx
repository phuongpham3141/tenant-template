import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { getT } from "@/lib/t";

/**
 * /help — Huayuesc Help Center.
 *
 * Layout structured like enterprise B2B help portals (Alibaba, MIC, AWS):
 *   - Hero with global search
 *   - Quick stats (response time, channels, languages)
 *   - 6 topic categories (3×2 grid) with sub-articles
 *   - Featured guide cards (top 4 most-read)
 *   - Comprehensive FAQ (16 Q&A organized by buyer journey stage)
 *   - Status page link + System health indicator
 *   - 4 contact channels: chat, phone, email, video call
 */

const TOPIC_CATEGORIES = [
  {
    icon: "🛒",
    title: "help.cat_finding_title",
    desc: "help.cat_finding_desc",
    color: "#005F6B",
    articles: [
      { label: "help.art_effective_rfq", href: "/info/find-products" },
      { label: "help.art_import_guide_6step", href: "/info/import-guide" },
      { label: "help.art_sample_before_moq", href: "/info/sample-orders" },
      { label: "help.art_custom_oem_odm", href: "/info/import-guide" },
    ],
  },
  {
    icon: "💳",
    title: "help.cat_payment_title",
    desc: "help.cat_payment_desc",
    color: "#E85D4E",
    articles: [
      { label: "help.art_what_trade_assurance", href: "/info/payment-protection" },
      { label: "help.art_tt_payment", href: "/info/payment-protection" },
      { label: "help.art_complaints_refunds", href: "/info/disputes" },
      { label: "help.art_exchange_rate_fees", href: "/info/payment-protection" },
    ],
  },
  {
    icon: "🚚",
    title: "help.cat_shipping_title",
    desc: "help.cat_shipping_desc",
    color: "#F4A261",
    articles: [
      { label: "help.art_full_shipping_policy", href: "/info/shipping-policy" },
      { label: "help.art_ddp_quick_calc", href: "/info/ddp-calculator" },
      { label: "help.art_lang_son_route", href: "/info/shipping-policy" },
      { label: "help.art_realtime_tracking", href: "/info/order-tracking" },
    ],
  },
  {
    icon: "🛡",
    title: "help.cat_audit_title",
    desc: "help.cat_audit_desc",
    color: "#2A9D8F",
    articles: [
      { label: "help.art_5step_verification", href: "/info/audit-process" },
      { label: "help.art_partner_network", href: "/info/network" },
      { label: "help.art_supplier_certs", href: "/info/audit-process" },
      { label: "help.art_blockchain_audit", href: "/info/audit-process" },
    ],
  },
  {
    icon: "👤",
    title: "help.cat_account_title",
    desc: "help.cat_account_desc",
    color: "#8B5CF6",
    articles: [
      { label: "help.art_buyer_signup", href: "/register/buyer" },
      { label: "help.art_enable_2fa", href: "/info/privacy-policy" },
      { label: "help.art_manage_subaccounts", href: "/buyer-center" },
      { label: "help.art_forgot_password", href: "/info/quen-mat-khau" },
    ],
  },
  {
    icon: "⚖",
    title: "help.cat_legal_title",
    desc: "help.cat_legal_desc",
    color: "#6B7880",
    articles: [
      { label: "help.art_terms_of_service", href: "/info/terms-of-service" },
      { label: "help.art_privacy_policy", href: "/info/privacy-policy" },
      { label: "help.art_11_rights_nd13", href: "/info/privacy-policy" },
      { label: "help.art_viac_arbitration", href: "/info/terms-of-service" },
    ],
  },
];

const FEATURED_GUIDES = [
  {
    icon: "🎯",
    title: "help.guide_new_buyer_title",
    desc: "help.guide_new_buyer_desc",
    href: "/info/import-guide",
    readTime: "8 min",
  },
  {
    icon: "💰",
    title: "help.guide_save22_title",
    desc: "help.guide_save22_desc",
    href: "/info/industry-news/case-study-showroom-sai-gon-tiet-kiem-22-percent",
    readTime: "7 min",
  },
  {
    icon: "📦",
    title: "help.guide_sample_mistakes_title",
    desc: "help.guide_sample_mistakes_desc",
    href: "/info/industry-news/5-sai-lam-pho-bien-khi-dat-sample",
    readTime: "5 min",
  },
  {
    icon: "📊",
    title: "help.guide_ports_title",
    desc: "help.guide_ports_desc",
    href: "/info/industry-news/phan-tich-cang-lach-huyen-vs-cat-lai-2026",
    readTime: "8 min",
  },
];

const FAQ_BY_STAGE = [
  {
    stage: "help.stage_before_signup",
    faqs: [
      {
        q: "help.faq_diff_alibaba_q",
        a: "help.faq_diff_alibaba_a",
      },
      {
        q: "help.faq_service_fee_q",
        a: "help.faq_service_fee_a",
      },
      {
        q: "help.faq_business_required_q",
        a: "help.faq_business_required_a",
      },
    ],
  },
  {
    stage: "help.stage_finding_rfq",
    faqs: [
      {
        q: "help.faq_effective_rfq_q",
        a: "help.faq_effective_rfq_a",
      },
      {
        q: "help.faq_moq_q",
        a: "help.faq_moq_a",
      },
      {
        q: "help.faq_oem_odm_q",
        a: "help.faq_oem_odm_a",
      },
    ],
  },
  {
    stage: "help.stage_payment_assurance",
    faqs: [
      {
        q: "help.faq_escrow_work_q",
        a: "help.faq_escrow_work_a",
      },
      {
        q: "help.faq_payment_methods_q",
        a: "help.faq_payment_methods_a",
      },
      {
        q: "help.faq_pay_vnd_q",
        a: "help.faq_pay_vnd_a",
      },
    ],
  },
  {
    stage: "help.stage_shipping_customs",
    faqs: [
      {
        q: "help.faq_ddp_time_q",
        a: "help.faq_ddp_time_a",
      },
      {
        q: "help.faq_import_license_q",
        a: "help.faq_import_license_a",
      },
      {
        q: "help.faq_ddp_includes_q",
        a: "help.faq_ddp_includes_a",
      },
    ],
  },
  {
    stage: "help.stage_after_receive",
    faqs: [
      {
        q: "help.faq_not_match_q",
        a: "help.faq_not_match_a",
      },
      {
        q: "help.faq_reorder_q",
        a: "help.faq_reorder_a",
      },
      {
        q: "help.faq_vat_invoice_q",
        a: "help.faq_vat_invoice_a",
      },
    ],
  },
];

const SYSTEM_STATUS = [
  { service: "help.status_website_app", status: "Operational", uptime: "99.97%" },
  { service: "help.status_trade_assurance", status: "Operational", uptime: "100%" },
  { service: "help.status_ai_sourcing", status: "Operational", uptime: "99.94%" },
  { service: "help.status_ddp_logistics", status: "Operational", uptime: "99.91%" },
];

const CONTACT_CHANNELS = [
  { icon: "📧", title: "Email Support", desc: "Response under 6 hours", info: "mcy@huayuesc.com", href: "mailto:mcy@huayuesc.com" },
  { icon: "📹", title: "Video Call", desc: "Book in advance", info: "1-on-1 with an account manager", href: "/info/contact" },
];

export default async function HelpPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Help Center" }]} />

      {/* === HERO + Search ============================================== */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
      >
        <div className="max-w-[1100px] mx-auto px-4 py-12 max-md:py-7 text-center">
          <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">
            {t("help.hero_badge")}
          </span>
          <h1 className="text-[34px] font-extrabold leading-tight mb-3 max-md:text-[24px]">
            {t("help.hero_title")}
          </h1>
          <p className="text-[14px] opacity-90 leading-relaxed mb-5 max-md:text-[12.5px] max-w-[680px] mx-auto">
            {t("help.hero_subtitle")}
          </p>
          <form action="/search" method="get" className="flex max-w-[640px] mx-auto bg-white rounded-md overflow-hidden shadow-lg">
            <input
              name="q"
              placeholder={t("help.search_placeholder")}
              className="flex-1 px-4 py-3 outline-none text-[14px] text-ink"
            />
            <button type="submit" className="px-6 bg-accent text-white font-bold text-[13.5px] cursor-pointer hover:opacity-90">
              {t("help.search_button")}
            </button>
          </form>

          {/* Quick stats strip */}
          <div className="grid grid-cols-4 gap-4 mt-7 text-center max-md:grid-cols-2 max-md:gap-3">
            <div className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
              <b className="block text-[18px] text-gold leading-tight">300+</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">{t("help.stat_guides")}</small>
            </div>
            <div className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
              <b className="block text-[18px] text-gold leading-tight">&lt;5 min</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">{t("help.stat_chat_response")}</small>
            </div>
            <div className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
              <b className="block text-[18px] text-gold leading-tight">24/7</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">{t("help.stat_vietnamese_support")}</small>
            </div>
            <div>
              <b className="block text-[18px] text-gold leading-tight">99.97%</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">{t("help.stat_uptime_month")}</small>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-4 mt-7 mb-10 max-md:mt-4">
        {/* === 6 Topic Categories ========================================= */}
        <h2 className="text-[20px] font-bold text-ink mb-4 max-md:text-[17px]">{t("help.browse_by_topic")}</h2>
        <div className="grid grid-cols-3 gap-3 mb-8 max-md:grid-cols-1">
          {TOPIC_CATEGORIES.map((c) => (
            <div key={c.title} className="bg-paper border border-line rounded p-4 hover:border-brand hover:shadow-sm transition">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded flex items-center justify-center text-[22px] flex-shrink-0"
                  style={{ backgroundColor: c.color + "15", color: c.color }}
                >
                  {c.icon}
                </div>
                <div>
                  <b className="block text-[14px] text-ink">{t(c.title)}</b>
                  <p className="text-[11.5px] text-mute leading-snug mt-0.5">{t(c.desc)}</p>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                {c.articles.map((a) => (
                  <li key={a.label}>
                    <Link href={a.href} className="text-[12.5px] text-brand hover:underline cursor-pointer">
                      → {t(a.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* === Featured Guides ============================================ */}
        <h2 className="text-[20px] font-bold text-ink mb-4 max-md:text-[17px]">{t("help.featured_guides")}</h2>
        <div className="grid grid-cols-2 gap-3 mb-8 max-md:grid-cols-1">
          {FEATURED_GUIDES.map((g) => (
            <Link
              key={g.title}
              href={g.href}
              className="bg-paper border border-line rounded p-4 hover:border-brand hover:shadow-sm transition cursor-pointer flex gap-3 items-start group/guide"
            >
              <div className="w-12 h-12 bg-bg rounded flex items-center justify-center text-[24px] flex-shrink-0">
                {g.icon}
              </div>
              <div className="flex-1 min-w-0">
                <b className="block text-[14px] text-ink leading-snug mb-1 group-hover/guide:text-brand">{t(g.title)}</b>
                <p className="text-[12px] text-mute leading-relaxed mb-1.5">{t(g.desc)}</p>
                <span className="text-[11px] text-mute2">⏱ {g.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* === FAQ by Stage ============================================== */}
        <h2 className="text-[20px] font-bold text-ink mb-4 max-md:text-[17px]">{t("help.faqs_by_stage")}</h2>
        <div className="space-y-5 mb-8">
          {FAQ_BY_STAGE.map((stage) => (
            <div key={stage.stage} className="bg-paper border border-line rounded p-5 max-md:p-3.5">
              <b className="block text-[14px] text-brand uppercase tracking-wider mb-3 pb-2 border-b border-line">
                {t(stage.stage)}
              </b>
              <div className="space-y-2">
                {stage.faqs.map((f, i) => (
                  <details key={i} className="border border-line rounded group/faq">
                    <summary className="px-4 py-3 cursor-pointer flex justify-between items-start gap-3 list-none [&::-webkit-details-marker]:hidden hover:bg-bg">
                      <b className="text-[13.5px] text-ink leading-snug flex-1">{t(f.q)}</b>
                      <span className="text-mute2 text-[14px] group-open/faq:rotate-180 transition-transform flex-shrink-0">▾</span>
                    </summary>
                    <p className="px-4 pb-4 pt-3 text-[13px] text-mute leading-relaxed border-t border-line">{t(f.a)}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* === System Status ============================================= */}
        <div className="bg-paper border border-line rounded p-5 mb-6 max-md:p-3.5">
          <div className="flex justify-between items-center mb-3 max-md:flex-col max-md:items-start max-md:gap-2">
            <h2 className="text-[16px] font-bold text-ink flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              {t("help.system_status_title")}
            </h2>
            <Link
              href="https://huayuesc-status.io"
              className="text-[12px] text-brand hover:underline cursor-pointer"
            >
              {t("help.detailed_status_link")}
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 max-md:gap-2">
            {SYSTEM_STATUS.map((s) => (
              <div key={s.service} className="border border-line rounded p-2.5 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <small className="text-[11px] text-mute">{t(s.service)}</small>
                </div>
                <b className="block text-[14px] text-success">{s.uptime}</b>
              </div>
            ))}
          </div>
        </div>

        {/* === Contact Channels ========================================== */}
        <div
          className="rounded p-6 text-white max-md:p-4"
          style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
        >
          <h2 className="text-[18px] font-bold mb-1 max-md:text-[16px]">{t("help.contact_heading")}</h2>
          <p className="text-[12.5px] opacity-85 mb-4 max-md:text-[12px]">
            {t("help.contact_subtitle")}
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {CONTACT_CHANNELS.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="bg-white/10 hover:bg-white/15 border border-white/20 rounded p-3 cursor-pointer transition block"
              >
                <div className="text-[24px] mb-1.5">{c.icon}</div>
                <b className="block text-[13px] mb-0.5">{c.title}</b>
                <p className="text-[11px] opacity-85 leading-snug">{c.desc}</p>
                <small className="text-[10.5px] opacity-70 mt-1 block truncate">{c.info}</small>
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/15 flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:text-center">
            <span className="text-[12.5px] opacity-85">
              {t("help.office_address")}
            </span>
            <Link
              href="/buying-request"
              className="px-4 py-2 bg-gold text-brand-dark rounded-sm font-bold text-[12.5px] cursor-pointer hover:bg-[#E8943A] whitespace-nowrap"
            >
              {t("help.send_rfq_now")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: "Help Center — Huayuesc",
  description:
    "300+ guides and 80+ FAQs on B2B sourcing from China to Vietnam. RFQ, Trade Assurance, DDP, customs. 24/7 Vietnamese-language support.",
};
