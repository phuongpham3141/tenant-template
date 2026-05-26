import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

const STATS_BY_INDUSTRY: Record<string, { factories: string; sku: string; lead: string }> = {
  "home-garden": { factories: "320+", sku: "8,400", lead: "20-25 ngày" },
  "construction-materials": { factories: "1,200+", sku: "24,000", lead: "25-30 ngày" },
  "bathroom-sanitary": { factories: "520+", sku: "11,000", lead: "20-30 ngày" },
  "noi-that": { factories: "3,000+", sku: "45,000", lead: "30-40 ngày" },
  "kitchen-equipment": { factories: "180+", sku: "4,200", lead: "25-30 ngày" },
  "lighting": { factories: "2,200+", sku: "32,000", lead: "15-20 ngày" },
  "doors-windows": { factories: "440+", sku: "6,800", lead: "30-35 ngày" },
  "hotel-supplies": { factories: "260+", sku: "5,400", lead: "20-30 ngày" },
  "hardware-tools": { factories: "680+", sku: "12,000", lead: "15-20 ngày" },
  "decoration": { factories: "190+", sku: "3,800", lead: "20-25 ngày" },
  "outdoor-garden": { factories: "150+", sku: "2,900", lead: "25-30 ngày" },
  "electrical": { factories: "880+", sku: "15,000", lead: "20-25 ngày" },
};

export default function IndustryChannelsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Industry Channels" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5">
          <h1 className="text-[24px] font-extrabold text-ink leading-tight">Kênh ngành — Industry Channels</h1>
          <p className="text-[13px] text-mute mt-1">12 ngành chính, hơn 932 phân loại con. Mỗi kênh được vận hành bởi sourcing manager chuyên ngành tại Quảng Châu.</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-5 grid grid-cols-3 gap-4 max-md:grid-cols-1 mb-7">
        {NAV_CATEGORIES.map((c) => {
          const stats = STATS_BY_INDUSTRY[c.slug] ?? { factories: "100+", sku: "2,000", lead: "20-30 ngày" };
          return (
            <Link key={c.slug} href={`/category/${c.slug}`} className="bg-paper border border-line rounded overflow-hidden hover:border-brand block group">
              <div className="aspect-[16/9] bg-[#F5F5F5] relative overflow-hidden">
                <img src={`/img/industry-${c.slug}.jpg?v=4`} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <div className="absolute top-3 left-3 bg-white px-3 py-1.5 rounded-sm text-[24px] leading-none">{c.icon}</div>
                {c.isNew && <div className="absolute top-3 right-3 bg-accent text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider">MỚI</div>}
              </div>
              <div className="p-4">
                <h3 className="text-[16px] font-bold text-ink mb-2">{c.name}</h3>
                <div className="grid grid-cols-3 gap-2 text-[11.5px]">
                  <div>
                    <div className="text-mute">Nhà máy</div>
                    <b className="text-brand">{stats.factories}</b>
                  </div>
                  <div>
                    <div className="text-mute">SKU</div>
                    <b className="text-brand">{stats.sku}</b>
                  </div>
                  <div>
                    <div className="text-mute">Thời gian giao</div>
                    <b className="text-brand">{stats.lead}</b>
                  </div>
                </div>
                <span className="text-brand text-[12.5px] font-semibold mt-3 block">Khám phá kênh →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export const metadata = { title: "Industry Channels — Cybersilkroads" };
