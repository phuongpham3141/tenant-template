import { Img } from "@/components/ui/img";
import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";
import { getT } from "@/lib/t";

const SAMPLE_ALERTS = [
  { tag: "PRICE", title: "trade_alert.alert1_title", time: "trade_alert.time_2_days_ago", text: "trade_alert.alert1_text" },
  { tag: "NEW SUPPLIER", title: "trade_alert.alert2_title", time: "trade_alert.time_3_days_ago", text: "trade_alert.alert2_text" },
  { tag: "TREND", title: "trade_alert.alert3_title", time: "trade_alert.time_5_days_ago", text: "trade_alert.alert3_text" },
  { tag: "FAIR", title: "trade_alert.alert4_title", time: "trade_alert.time_1_week_ago", text: "trade_alert.alert4_text" },
  { tag: "POLICY", title: "trade_alert.alert5_title", time: "trade_alert.time_1_week_ago", text: "trade_alert.alert5_text" },
  { tag: "DEAL", title: "trade_alert.alert6_title", time: "trade_alert.time_2_weeks_ago", text: "trade_alert.alert6_text" },
];

const TAG_COLORS: Record<string, string> = {
  PRICE: "bg-accent",
  "NEW SUPPLIER": "bg-success",
  TREND: "bg-brand",
  FAIR: "bg-gold text-brand-dark",
  POLICY: "bg-mute",
  DEAL: "bg-accent",
};

export default async function TradeAlertPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("trade_alert.breadcrumb_home"), href: "/" }, { label: t("trade_alert.breadcrumb_current") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 grid grid-cols-[1fr_360px] gap-5 max-md:grid-cols-1">
        <div>
          <div className="relative rounded overflow-hidden h-[200px] bg-brand-dark">
            <Img loading="lazy" decoding="async" src="/img/tradealert.jpg?v=6" alt="" className="w-full h-full object-cover opacity-55" />
            <div className="absolute inset-0 px-7 py-6 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
              <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📬 {t("trade_alert.badge_newsletter")}</span>
              <h1 className="text-[28px] font-extrabold leading-tight max-md:text-[22px]">{t("trade_alert.hero_title")}</h1>
              <p className="text-[13px] opacity-90 mt-2">{t("trade_alert.hero_subtitle")}</p>
            </div>
          </div>

          {/* Sample alerts */}
          <h2 className="text-[16px] font-bold text-ink mt-5 mb-3">{t("trade_alert.samples_heading")}</h2>
          <div className="space-y-3">
            {SAMPLE_ALERTS.map((a) => (
              <div key={a.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="flex justify-between items-start gap-3 mb-1.5">
                  <span className={`text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider ${TAG_COLORS[a.tag] ?? "bg-brand"}`}>{a.tag}</span>
                  <span className="text-[11.5px] text-mute">{t(a.time)}</span>
                </div>
                <b className="block text-[14px] text-ink mb-1">{t(a.title)}</b>
                <p className="text-[12.5px] text-mute leading-relaxed">{t(a.text)}</p>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <form action="/trade-alert" method="get" className="bg-paper border border-line rounded overflow-hidden sticky top-4">
            <div className="bg-brand text-white px-4 py-3 font-semibold text-[14px]">📬 {t("trade_alert.form_header")}</div>
            <div className="p-4">
              <p className="text-[12px] text-mute mb-3">{t("trade_alert.form_intro")}</p>
              <input name="email" type="email" placeholder={t("trade_alert.email_placeholder")} className="w-full px-3 py-2 border border-line rounded-sm text-[13px] mb-2 outline-none focus:border-brand" />
              <select name="industry" className="w-full px-3 py-2 border border-line rounded-sm text-[13px] mb-2 bg-white">
                <option value="">{t("trade_alert.industry_default")}</option>
                {NAV_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                ))}
              </select>
              <select name="lang" className="w-full px-3 py-2 border border-line rounded-sm text-[13px] mb-3 bg-white">
                <option value="vi">🇻🇳 Tiếng Việt</option>
                <option value="en">🇬🇧 English</option>
              </select>
              <button type="submit" className="w-full py-2.5 bg-accent text-white rounded-sm font-bold text-[13px]">{t("trade_alert.submit")}</button>
              <p className="text-[11px] text-mute text-center mt-3">
                {t("trade_alert.already_account")} <Link href="/login" className="text-brand">{t("trade_alert.sign_in")}</Link>
              </p>
            </div>
          </form>

          <div className="bg-paper border border-line rounded p-4 mt-4 text-[12px] text-mute leading-relaxed">
            <b className="block text-[13px] text-ink mb-2">{t("trade_alert.benefits_heading")}</b>
            <ul className="space-y-1.5">
              <li>✓ {t("trade_alert.benefit1")}</li>
              <li>✓ {t("trade_alert.benefit2")}</li>
              <li>✓ {t("trade_alert.benefit3")}</li>
              <li>✓ {t("trade_alert.benefit4")}</li>
            </ul>
          </div>
        </aside>
      </div>
      <div className="mb-7" />
    </>
  );
}

export const metadata = { title: "Trade Alert — Huayuesc" };
