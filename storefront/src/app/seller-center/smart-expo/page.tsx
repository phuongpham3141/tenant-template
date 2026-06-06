import { Img } from "@/components/ui/img";
import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";
import { getT } from "@/lib/t";

const UPCOMING = [
  { date: "12-16/06/2026", title: "Furniture Asia Cloud Expo", topic: "seller_center_smart_expo.upcoming_topic_furniture", buyer: "seller_center_smart_expo.upcoming_buyer_sea_au", img: 21 },
  { date: "20-24/06/2026", title: "Smart Home & Lighting", topic: "seller_center_smart_expo.upcoming_topic_smarthome", buyer: "seller_center_smart_expo.upcoming_buyer_vn_th", img: 22 },
  { date: "08-12/07/2026", title: "Building Materials Asia", topic: "seller_center_smart_expo.upcoming_topic_building", buyer: "seller_center_smart_expo.upcoming_buyer_vn_id", img: 23 },
  { date: "22-26/07/2026", title: "Garments & Textiles", topic: "seller_center_smart_expo.upcoming_topic_garments", buyer: "seller_center_smart_expo.upcoming_buyer_sea_all", img: 24 },
];

const STEPS = [
  { n: 1, title: "seller_center_smart_expo.step1_title", desc: "seller_center_smart_expo.step1_desc" },
  { n: 2, title: "seller_center_smart_expo.step2_title", desc: "seller_center_smart_expo.step2_desc" },
  { n: 3, title: "seller_center_smart_expo.step3_title", desc: "seller_center_smart_expo.step3_desc" },
];

const BOOTHS = [
  { name: "KUKA Home Furniture", industry: "seller_center_smart_expo.booth_industry_sofa", visits: "2,840", img: 31 },
  { name: "Foshan Tile Master", industry: "seller_center_smart_expo.booth_industry_tile", visits: "1,920", img: 32 },
  { name: "Shenzhen LED Co.", industry: "seller_center_smart_expo.booth_industry_lighting", visits: "1,650", img: 33 },
  { name: "Ortonbaths Group", industry: "seller_center_smart_expo.booth_industry_sanitary", visits: "2,210", img: 34 },
  { name: "Guangzhou Garment", industry: "seller_center_smart_expo.booth_industry_apparel", visits: "1,480", img: 35 },
  { name: "Jiangsu Steel Door", industry: "seller_center_smart_expo.booth_industry_door", visits: "1,180", img: 36 },
];

const STATS = [
  { v: "50K+", l: "seller_center_smart_expo.stat_buyers" },
  { v: "3.2K+", l: "seller_center_smart_expo.stat_booths" },
  { v: "12", l: "seller_center_smart_expo.stat_expos" },
  { v: "$48M", l: "seller_center_smart_expo.stat_gmv" },
];

export default async function SmartExpoPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("seller_center_smart_expo.breadcrumb_home"), href: "/" }, { label: t("seller_center_smart_expo.breadcrumb_seller"), href: "/seller-center" }, { label: t("seller_center_smart_expo.breadcrumb_current") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/smart-expo" />
        <div>
          <div className="bg-gradient-to-br from-accent/90 to-brand text-white rounded p-6 mb-4">
            <div className="inline-block bg-white text-accent px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">{t("seller_center_smart_expo.badge")}</div>
            <h1 className="text-[26px] font-bold leading-tight">{t("seller_center_smart_expo.hero_title")}</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              {t("seller_center_smart_expo.hero_desc")}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {STATS.map((s) => (
              <div key={s.l} className="bg-paper border border-line rounded p-4 text-center">
                <b className="block text-[24px] font-extrabold text-brand">{s.v}</b>
                <span className="text-[11.5px] text-mute mt-1 block">{t(s.l)}</span>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">{t("seller_center_smart_expo.upcoming_heading")}</b>
              <Link href="#" className="text-brand text-[12px]">{t("seller_center_smart_expo.upcoming_calendar_link")}</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              {UPCOMING.map((u) => (
                <div key={u.title} className="border border-line rounded overflow-hidden hover:border-brand grid grid-cols-[120px_1fr] max-md:grid-cols-1">
                  <Img loading="lazy" decoding="async" src={`/img/seller-expo-${u.img}.jpg?v=6`} alt="" className="w-full h-full object-cover max-md:h-[140px]" />
                  <div className="p-3">
                    <span className="text-[10.5px] text-accent font-bold uppercase tracking-wider">{u.date}</span>
                    <b className="block text-[13.5px] text-ink mt-1 mb-1">{u.title}</b>
                    <p className="text-[11.5px] text-mute mb-2">{t(u.topic)}</p>
                    <p className="text-[11px] text-mute mb-3"><span className="font-semibold">{t("seller_center_smart_expo.upcoming_buyer_label")}</span> {t(u.buyer)}</p>
                    <button className="bg-brand text-white text-[11.5px] font-semibold px-3 py-1 rounded-sm">{t("seller_center_smart_expo.upcoming_register_btn")}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_smart_expo.steps_heading")}</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-4">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold text-[16px] mb-3">{s.n}</div>
                  <b className="block text-[13px] text-ink mb-1">{t(s.title)}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{t(s.desc)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">{t("seller_center_smart_expo.booths_heading")}</b>
              <Link href="#" className="text-brand text-[12px]">{t("seller_center_smart_expo.booths_more_link")}</Link>
            </div>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2">
              {BOOTHS.map((b) => (
                <div key={b.name} className="border border-line rounded overflow-hidden hover:border-brand">
                  <div className="aspect-video bg-[#F5F5F5] relative">
                    <Img loading="lazy" decoding="async" src={`/img/seller-booth-${b.img}.jpg?v=6`} alt="" className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-success text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">3D</span>
                  </div>
                  <div className="p-3">
                    <b className="block text-[12.5px] text-ink leading-tight mb-0.5">{b.name}</b>
                    <span className="text-[11px] text-mute block mb-2">{t(b.industry)}</span>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-mute">👁 {b.visits} visits</span>
                      <Link href="#" className="text-brand font-semibold">{t("seller_center_smart_expo.booth_view_link")}</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-dark text-white rounded p-5 text-center">
            <b className="block text-[18px] mb-2">{t("seller_center_smart_expo.cta_title")}</b>
            <p className="text-[12.5px] opacity-90 mb-4">{t("seller_center_smart_expo.cta_desc")}</p>
            <button className="bg-gold text-brand-dark px-7 py-3 rounded-sm font-bold text-[14px]">{t("seller_center_smart_expo.cta_btn")}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Smart Expo — Hội chợ đám mây — Seller Center" };
