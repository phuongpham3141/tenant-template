import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { FACTORIES } from "@/data/home";
import { getT } from "@/lib/t";
import { getTd } from "@/lib/td";

const INDUSTRIES = ["buyer_center_supplier_discover.industries_all", "buyer_center_supplier_discover.industries_ceramics", "buyer_center_supplier_discover.industries_furniture", "buyer_center_supplier_discover.industries_bathroom", "buyer_center_supplier_discover.industries_lighting", "buyer_center_supplier_discover.industries_kitchen", "buyer_center_supplier_discover.industries_doors"];
const PROVINCES = ["buyer_center_supplier_discover.provinces_all", "buyer_center_supplier_discover.provinces_guangdong", "buyer_center_supplier_discover.provinces_zhejiang", "buyer_center_supplier_discover.provinces_fujian", "buyer_center_supplier_discover.provinces_shandong", "buyer_center_supplier_discover.provinces_jiangsu", "buyer_center_supplier_discover.provinces_sichuan"];
const RATINGS = ["buyer_center_supplier_discover.ratings_all", "buyer_center_supplier_discover.ratings_5", "buyer_center_supplier_discover.ratings_45", "buyer_center_supplier_discover.ratings_4"];
const YEARS = ["buyer_center_supplier_discover.years_all", "buyer_center_supplier_discover.years_over15", "buyer_center_supplier_discover.years_10_15", "buyer_center_supplier_discover.years_5_10", "buyer_center_supplier_discover.years_under5"];
const SIZES = ["buyer_center_supplier_discover.sizes_all", "buyer_center_supplier_discover.sizes_large", "buyer_center_supplier_discover.sizes_medium", "buyer_center_supplier_discover.sizes_small"];
const SORTS = [
  { v: "newest", l: "buyer_center_supplier_discover.sort_newest" },
  { v: "rating", l: "buyer_center_supplier_discover.sort_rating" },
  { v: "orders", l: "buyer_center_supplier_discover.sort_orders" },
  { v: "audit", l: "buyer_center_supplier_discover.sort_audit" },
];

export default async function SupplierDiscoverPage() {
  const t = await getT();
  const td = await getTd();
  return (
    <>
      <Breadcrumb trail={[{ label: t("buyer_center_supplier_discover.breadcrumb_home"), href: "/" }, { label: t("buyer_center_supplier_discover.breadcrumb_buyer_center"), href: "/buyer-center" }, { label: t("buyer_center_supplier_discover.breadcrumb_discover") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/supplier-discover" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/10 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🏭 {t("buyer_center_supplier_discover.badge")}</div>
            <h1 className="text-[22px] font-bold text-ink">{t("buyer_center_supplier_discover.heading")}</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              {t("buyer_center_supplier_discover.intro")}
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-4 mb-4">
            <div className="grid grid-cols-5 gap-3 mb-3 max-md:grid-cols-2">
              <select className="px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white outline-none focus:border-brand">
                {INDUSTRIES.map((i) => <option key={i}>{t(i)}</option>)}
              </select>
              <select className="px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white outline-none focus:border-brand">
                {PROVINCES.map((p) => <option key={p}>{t(p)}</option>)}
              </select>
              <select className="px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white outline-none focus:border-brand">
                {RATINGS.map((r) => <option key={r}>{t(r)}</option>)}
              </select>
              <select className="px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white outline-none focus:border-brand">
                {YEARS.map((y) => <option key={y}>{t(y)}</option>)}
              </select>
              <select className="px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white outline-none focus:border-brand">
                {SIZES.map((s) => <option key={s}>{t(s)}</option>)}
              </select>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-line max-md:flex-col max-md:items-start max-md:gap-2">
              <span className="text-[12px] text-mute">{t("buyer_center_supplier_discover.found")} <b className="text-ink">{FACTORIES.length}</b> {t("buyer_center_supplier_discover.matching_suppliers")} · <a className="text-brand">{t("buyer_center_supplier_discover.save_filter")}</a></span>
              <div className="flex gap-1">
                {SORTS.map((s, i) => (
                  <button key={s.v} className={`px-3 py-1.5 text-[11.5px] rounded-sm ${i === 0 ? "bg-brand text-white font-semibold" : "text-mute hover:text-brand border border-line"}`}>{t(s.l)}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {FACTORIES.map((f) => (
              <div key={f.slug} className="bg-paper border border-line rounded p-4 hover:border-brand transition-colors">
                <div className="flex gap-3 items-start mb-3">
                  <div className="w-14 h-14 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[17px] text-brand flex-shrink-0">{f.initials}</div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/supplier/${f.slug}`} className="block">
                      <b className="block text-[13px] text-ink leading-tight hover:text-brand line-clamp-2">{f.name}</b>
                    </Link>
                    <span className="text-[11px] text-mute">{f.location}</span>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {f.badges.gold && <span className="text-[9.5px] bg-gold text-brand-dark px-1.5 py-0.5 rounded-sm font-bold">GOLD</span>}
                      {f.badges.audited && <span className="text-[9.5px] bg-success/20 text-success px-1.5 py-0.5 rounded-sm font-bold">✓ AUDITED</span>}
                      <span className="text-[9.5px] bg-brand/10 text-brand px-1.5 py-0.5 rounded-sm font-bold">{td(f.badges.years)}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                  <div className="bg-[#FAFBFC] rounded-sm py-1.5">
                    <b className="block text-[12px] text-success">★ {f.rating}</b>
                    <span className="text-[9.5px] text-mute">{f.reviews} {t("buyer_center_supplier_discover.reviews")}</span>
                  </div>
                  <div className="bg-[#FAFBFC] rounded-sm py-1.5">
                    <b className="block text-[11px] text-ink">{td(f.meta)}</b>
                    <span className="text-[9.5px] text-mute">{t("buyer_center_supplier_discover.capacity")}</span>
                  </div>
                  <div className="bg-[#FAFBFC] rounded-sm py-1.5">
                    <b className="block text-[12px] text-brand">DDP ✓</b>
                    <span className="text-[9.5px] text-mute">{t("buyer_center_supplier_discover.to_vn")}</span>
                  </div>
                </div>
                <div className="flex gap-1 flex-wrap mb-3">
                  {f.tags.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10.5px] bg-[#F5F7FA] text-mute px-1.5 py-0.5 rounded-sm">{td(t)}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link href={`/supplier/${f.slug}`} className="flex-1 px-3 py-1.5 bg-brand text-white rounded-sm text-[11.5px] font-semibold text-center hover:opacity-90">{t("buyer_center_supplier_discover.view_profile")}</Link>
                  <Link href={`/buying-request?supplier=${f.slug}`} className="flex-1 px-3 py-1.5 border border-brand text-brand rounded-sm text-[11.5px] font-semibold text-center hover:bg-brand hover:text-white">{t("buyer_center_supplier_discover.send_rfq")}</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-3 flex justify-center items-center gap-1 text-[12px]">
            <button className="px-3 py-1.5 border border-line rounded-sm text-mute hover:border-brand hover:text-brand">{t("buyer_center_supplier_discover.previous")}</button>
            {[1, 2, 3, 4, 5].map((p) => (
              <button key={p} className={`w-9 py-1.5 rounded-sm ${p === 1 ? "bg-brand text-white font-bold" : "border border-line text-ink hover:border-brand hover:text-brand"}`}>{p}</button>
            ))}
            <span className="px-2 text-mute">…</span>
            <button className="w-9 py-1.5 border border-line rounded-sm text-ink hover:border-brand hover:text-brand">42</button>
            <button className="px-3 py-1.5 border border-line rounded-sm text-mute hover:border-brand hover:text-brand">{t("buyer_center_supplier_discover.next")}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Discover Suppliers — Buyer Center" };
