import { Img } from "@/components/ui/img";
import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { SECTIONS } from "@/data/home";
import { getT } from "@/lib/t";

const STATS = [
  { v: "12", l: "buyer_center.stat_orders_in_progress", c: "text-brand" },
  { v: "5", l: "buyer_center.stat_rfqs_awaiting", c: "text-accent" },
  { v: "$12,420", l: "buyer_center.stat_total_value", c: "text-success" },
  { v: "23", l: "buyer_center.stat_favorite_products", c: "text-gold" },
];

const RECENT_RFQS = [
  { id: "RFQ-8421", product: "Porcelain tile 600×1200 calacatta", qty: "2,000 m²", quotes: 7, status: "buyer_center.status_pending" },
  { id: "RFQ-8417", product: "Navy velvet L-shape sofa", qty: "30 set", quotes: 5, status: "buyer_center.status_pending" },
  { id: "RFQ-8412", product: "4-star hotel smart toilet", qty: "80 pc", quotes: 9, status: "buyer_center.status_ordered" },
];

const ACTIVITY = [
  { time: "buyer_center.time_12_min", text: "Dongpeng Ceramics sent a quote for RFQ-8421" },
  { time: "buyer_center.time_1_hour", text: "Order AVN-7820 arrived at the Pingxiang warehouse" },
  { time: "buyer_center.time_3_hours", text: "KUKA Home replied to your message" },
  { time: "buyer_center.time_yesterday", text: "RFQ-8412 changed status to Ordered" },
];

const FEATURED = SECTIONS[0].products.slice(0, 4);

export default async function BuyerCenterPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("buyer_center.breadcrumb_home"), href: "/" }, { label: t("buyer_center.breadcrumb_title") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <h1 className="text-[20px] font-bold text-ink">Hi, Tran Van A 👋</h1>
            <p className="text-[12.5px] text-mute mt-1">{t("buyer_center.overview_lead")}</p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {STATS.map((s) => (
              <div key={s.l} className="bg-paper border border-line rounded p-4">
                <b className={`block text-[24px] font-extrabold ${s.c}`}>{s.v}</b>
                <span className="text-[11.5px] text-mute mt-1 block">{t(s.l)}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-4">
              <div className="flex justify-between items-center mb-3">
                <b className="text-[14px] text-ink">{t("buyer_center.recent_rfqs")}</b>
                <Link href="/buying-request" className="text-brand text-[12px]">{t("buyer_center.new_rfq")}</Link>
              </div>
              <table className="w-full text-[12.5px]">
                <thead className="text-mute">
                  <tr className="border-b border-line">
                    <th className="text-left py-1.5 font-medium">{t("buyer_center.th_id")}</th>
                    <th className="text-left py-1.5 font-medium">{t("buyer_center.th_product")}</th>
                    <th className="text-left py-1.5 font-medium">{t("buyer_center.th_quotes")}</th>
                    <th className="text-left py-1.5 font-medium">{t("buyer_center.th_status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_RFQS.map((r) => (
                    <tr key={r.id} className="border-b border-line last:border-0">
                      <td className="py-2 text-brand">{r.id}</td>
                      <td className="py-2 text-ink truncate max-w-[180px]">{r.product}</td>
                      <td className="py-2 text-success font-semibold">{r.quotes}</td>
                      <td className="py-2 text-mute">{t(r.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-paper border border-line rounded p-4">
              <b className="block text-[14px] text-ink mb-3">{t("buyer_center.recent_activity")}</b>
              <ul className="space-y-2.5">
                {ACTIVITY.map((a, i) => (
                  <li key={i} className="text-[12.5px] border-b border-dashed border-line pb-2 last:border-0">
                    <span className="text-mute text-[11px] block">{t(a.time)}</span>
                    <span className="text-ink">{a.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <div className="flex justify-between items-center mb-3">
              <b className="text-[14px] text-ink">{t("buyer_center.recommended")}</b>
              <Link href="/products" className="text-brand text-[12px]">{t("buyer_center.view_more")}</Link>
            </div>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {FEATURED.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="border border-line rounded-sm overflow-hidden hover:border-brand block">
                  <div className="aspect-square bg-[#F5F5F5]">
                    {p.image ? <Img loading="lazy" decoding="async" src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
                  </div>
                  <div className="p-2">
                    <h4 className="text-[12px] text-ink line-clamp-2 mb-1">{p.title}</h4>
                    <div className="text-accent font-bold text-[13px]">{p.price}<small className="text-mute font-normal text-[10px]">{p.unit}</small></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Buyer Center — Huayuesc" };
