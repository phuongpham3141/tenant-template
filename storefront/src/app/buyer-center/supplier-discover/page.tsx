import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { FACTORIES } from "@/data/home";

const INDUSTRIES = ["All industries", "Ceramics & Materials", "Furniture & Home Furnishing", "Bathroom & Sanitary", "Lighting", "Kitchen Cabinets & Whole-Home Interiors", "Doors & Windows"];
const PROVINCES = ["All provinces", "Guangdong", "Zhejiang", "Fujian", "Shandong", "Jiangsu", "Sichuan"];
const RATINGS = ["All ratings", "5 stars", "4.5 stars and up", "4 stars and up"];
const YEARS = ["All years founded", "Over 15 years", "10–15 years", "5–10 years", "Under 5 years"];
const SIZES = ["All sizes", "Large (over 500 employees)", "Medium (100–500)", "Small (under 100)"];
const SORTS = [
  { v: "newest", l: "Newest" },
  { v: "rating", l: "Top Rated" },
  { v: "orders", l: "Most Orders" },
  { v: "audit", l: "Recently Audited" },
];

export default function SupplierDiscoverPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Buyer Center", href: "/buyer-center" }, { label: "Discover Suppliers" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/supplier-discover" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/10 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🏭 DISCOVER SUPPLIERS</div>
            <h1 className="text-[22px] font-bold text-ink">Discover Suppliers</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              Over 4,500 factories audited by Huayuesc, filterable by industry, production region, size, and year founded. Every supplier here has at least one successful order with a Vietnamese buyer and is ready to work in Vietnamese over email.
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-4 mb-4">
            <div className="grid grid-cols-5 gap-3 mb-3 max-md:grid-cols-2">
              <select className="px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white outline-none focus:border-brand">
                {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
              </select>
              <select className="px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white outline-none focus:border-brand">
                {PROVINCES.map((p) => <option key={p}>{p}</option>)}
              </select>
              <select className="px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white outline-none focus:border-brand">
                {RATINGS.map((r) => <option key={r}>{r}</option>)}
              </select>
              <select className="px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white outline-none focus:border-brand">
                {YEARS.map((y) => <option key={y}>{y}</option>)}
              </select>
              <select className="px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white outline-none focus:border-brand">
                {SIZES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-line max-md:flex-col max-md:items-start max-md:gap-2">
              <span className="text-[12px] text-mute">Found <b className="text-ink">{FACTORIES.length}</b> matching suppliers · <a className="text-brand">Save filter</a></span>
              <div className="flex gap-1">
                {SORTS.map((s, i) => (
                  <button key={s.v} className={`px-3 py-1.5 text-[11.5px] rounded-sm ${i === 0 ? "bg-brand text-white font-semibold" : "text-mute hover:text-brand border border-line"}`}>{s.l}</button>
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
                      <span className="text-[9.5px] bg-brand/10 text-brand px-1.5 py-0.5 rounded-sm font-bold">{f.badges.years}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                  <div className="bg-[#FAFBFC] rounded-sm py-1.5">
                    <b className="block text-[12px] text-success">★ {f.rating}</b>
                    <span className="text-[9.5px] text-mute">{f.reviews} reviews</span>
                  </div>
                  <div className="bg-[#FAFBFC] rounded-sm py-1.5">
                    <b className="block text-[11px] text-ink">{f.meta}</b>
                    <span className="text-[9.5px] text-mute">Capacity</span>
                  </div>
                  <div className="bg-[#FAFBFC] rounded-sm py-1.5">
                    <b className="block text-[12px] text-brand">DDP ✓</b>
                    <span className="text-[9.5px] text-mute">To VN</span>
                  </div>
                </div>
                <div className="flex gap-1 flex-wrap mb-3">
                  {f.tags.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10.5px] bg-[#F5F7FA] text-mute px-1.5 py-0.5 rounded-sm">{t}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link href={`/supplier/${f.slug}`} className="flex-1 px-3 py-1.5 bg-brand text-white rounded-sm text-[11.5px] font-semibold text-center hover:opacity-90">View Profile</Link>
                  <Link href={`/buying-request?supplier=${f.slug}`} className="flex-1 px-3 py-1.5 border border-brand text-brand rounded-sm text-[11.5px] font-semibold text-center hover:bg-brand hover:text-white">Send RFQ</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-3 flex justify-center items-center gap-1 text-[12px]">
            <button className="px-3 py-1.5 border border-line rounded-sm text-mute hover:border-brand hover:text-brand">‹ Previous</button>
            {[1, 2, 3, 4, 5].map((p) => (
              <button key={p} className={`w-9 py-1.5 rounded-sm ${p === 1 ? "bg-brand text-white font-bold" : "border border-line text-ink hover:border-brand hover:text-brand"}`}>{p}</button>
            ))}
            <span className="px-2 text-mute">…</span>
            <button className="w-9 py-1.5 border border-line rounded-sm text-ink hover:border-brand hover:text-brand">42</button>
            <button className="px-3 py-1.5 border border-line rounded-sm text-mute hover:border-brand hover:text-brand">Next ›</button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Discover Suppliers — Buyer Center" };
