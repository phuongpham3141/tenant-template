import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";
import { getT } from "@/lib/t";
import { getTd } from "@/lib/td";

const KPIS = [
  { v: "187", l: "seller_center.kpi_orders", c: "text-brand", trend: "seller_center.kpi_orders_trend" },
  { v: "23", l: "seller_center.kpi_rfq", c: "text-accent", trend: "seller_center.kpi_rfq_trend" },
  { v: "412", l: "seller_center.kpi_sku", c: "text-success", trend: "seller_center.kpi_sku_trend" },
  { v: "4.8 ★", l: "seller_center.kpi_rating", c: "text-gold", trend: "seller_center.kpi_rating_trend" },
];

const ACTIVITY = [
  { time: "seller_center.activity_1_time", text: "seller_center.activity_1_text" },
  { time: "seller_center.activity_2_time", text: "seller_center.activity_2_text" },
  { time: "seller_center.activity_3_time", text: "seller_center.activity_3_text" },
  { time: "seller_center.activity_4_time", text: "seller_center.activity_4_text" },
  { time: "seller_center.activity_5_time", text: "seller_center.activity_5_text" },
];

const QUICK = [
  { label: "seller_center.quick_reply_rfq", icon: "📨", href: "/seller-center/trade-ehome", color: "bg-accent" },
  { label: "seller_center.quick_update_fob", icon: "💲", href: "/seller-center/trade-ehome", color: "bg-brand" },
  { label: "seller_center.quick_new_product", icon: "➕", href: "/seller-center/trade-ehome", color: "bg-success" },
  { label: "seller_center.quick_view_report", icon: "📊", href: "/seller-center/trade-ehome", color: "bg-gold text-brand-dark" },
];

const CHART = [
  { m: "T12", v: 42 },
  { m: "T1", v: 58 },
  { m: "T2", v: 65 },
  { m: "T3", v: 78 },
  { m: "T4", v: 124 },
  { m: "T5", v: 187 },
];

export default async function SellerCenterPage() {
  const t = await getT();
  const max = Math.max(...CHART.map((c) => c.v));
  return (
    <>
      <Breadcrumb trail={[{ label: t("seller_center.breadcrumb_home"), href: "/" }, { label: t("seller_center.breadcrumb_current") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4 flex justify-between items-start max-md:flex-col max-md:gap-3">
            <div>
              <h1 className="text-[20px] font-bold text-ink">{t("seller_center.greeting")}</h1>
              <p className="text-[12.5px] text-mute mt-1">
                {t("seller_center.overview_prefix")}<span className="bg-gold/30 text-brand-dark px-1.5 py-0.5 rounded-sm font-bold">{t("seller_center.gold_tier")}</span>{t("seller_center.overview_suffix")}
              </p>
            </div>
            <Link href="/seller-center/gold-member" className="text-[12px] bg-brand text-white px-3 py-2 rounded-sm font-semibold whitespace-nowrap">{t("seller_center.upgrade_diamond")}</Link>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {KPIS.map((s) => (
              <div key={s.l} className="bg-paper border border-line rounded p-4">
                <b className={`block text-[24px] font-extrabold ${s.c}`}>{s.v}</b>
                <span className="text-[11.5px] text-mute mt-1 block">{t(s.l)}</span>
                <span className="text-[10.5px] text-success block mt-1.5 font-semibold">{t(s.trend)}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-4">
              <div className="flex justify-between items-center mb-3">
                <b className="text-[14px] text-ink">{t("seller_center.chart_title")}</b>
                <span className="text-[10.5px] text-mute">{t("seller_center.chart_updated")}</span>
              </div>
              <svg viewBox="0 0 320 140" className="w-full h-[140px]">
                {CHART.map((c, i) => {
                  const h = (c.v / max) * 110;
                  const x = 20 + i * 50;
                  return (
                    <g key={c.m}>
                      <rect x={x} y={120 - h} width="34" height={h} fill={i === CHART.length - 1 ? "#E8302C" : "#1F4F8E"} rx="2" />
                      <text x={x + 17} y={135} fontSize="10" textAnchor="middle" fill="#6B7280">{c.m}</text>
                      <text x={x + 17} y={115 - h} fontSize="9.5" textAnchor="middle" fill="#0B1220" fontWeight="bold">{c.v}</text>
                    </g>
                  );
                })}
              </svg>
              <p className="text-[11px] text-mute mt-2">{t("seller_center.chart_note")}</p>
            </div>

            <div className="bg-paper border border-line rounded p-4">
              <b className="block text-[14px] text-ink mb-3">{t("seller_center.activity_title")}</b>
              <ul className="space-y-2.5">
                {ACTIVITY.map((a, i) => (
                  <li key={i} className="text-[12.5px] border-b border-dashed border-line pb-2 last:border-0">
                    <span className="text-mute text-[11px] block">{t(a.time)}</span>
                    <span className="text-ink">{t(a.text)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-4 mb-4">
            <b className="block text-[14px] text-ink mb-3">{t("seller_center.quick_title")}</b>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {QUICK.map((q) => (
                <Link key={q.label} href={q.href} className={`${q.color} text-white rounded-sm p-3 hover:opacity-95 flex items-center gap-3`}>
                  <span className="text-[22px]">{q.icon}</span>
                  <b className="text-[12.5px] leading-tight">{t(q.label)}</b>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link href="/seller-center/smart-expo" className="bg-gold/20 border border-gold rounded p-4 hover:bg-gold/30">
              <b className="block text-[14px] text-ink mb-1">{t("seller_center.expo_title")}</b>
              <p className="text-[12px] text-mute">{t("seller_center.expo_desc")}</p>
            </Link>
            <Link href="/seller-center/ai-assistant" className="bg-brand/10 border border-brand rounded p-4 hover:bg-brand/15">
              <b className="block text-[14px] text-ink mb-1">{t("seller_center.ai_title")}</b>
              <p className="text-[12px] text-mute">{t("seller_center.ai_desc")}</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata() {
  const td = await getTd();
  return { title: td("Trung tâm người bán — Huayuesc") };
}
