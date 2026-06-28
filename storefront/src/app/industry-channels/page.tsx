import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

const STATS_BY_INDUSTRY: Record<string, { factories: string; sku: string; lead: string }> = {
  // Cụm 1 — Tiêu dùng & đời sống
  "thoi-trang": { factories: "2,800+", sku: "62,000", lead: "15-25 ngày" },
  "my-pham": { factories: "640+", sku: "14,500", lead: "20-30 ngày" },
  "phu-kien": { factories: "1,100+", sku: "28,000", lead: "15-20 ngày" },
  "do-me-be": { factories: "520+", sku: "11,800", lead: "20-25 ngày" },
  "the-thao": { factories: "760+", sku: "16,400", lead: "20-30 ngày" },
  "giai-tri": { factories: "430+", sku: "9,200", lead: "20-25 ngày" },
  "thuc-pham": { factories: "980+", sku: "12,600", lead: "10-20 ngày" },
  // Cụm 2 — Xây dựng & nội thất
  "construction-materials": { factories: "1,200+", sku: "24,000", lead: "25-30 ngày" },
  "noi-that": { factories: "3,000+", sku: "45,000", lead: "30-40 ngày" },
  "bathroom-sanitary": { factories: "520+", sku: "11,000", lead: "20-30 ngày" },
  "gach-op-lat": { factories: "1,400+", sku: "26,000", lead: "25-30 ngày" },
  "lighting": { factories: "2,200+", sku: "32,000", lead: "15-20 ngày" },
  "thiet-bi-van-phong": { factories: "360+", sku: "7,600", lead: "20-25 ngày" },
  // Cụm 3 — Công nghiệp & kỹ thuật
  "phu-tung-oto-xe-may": { factories: "1,600+", sku: "38,000", lead: "20-30 ngày" },
  "electrical": { factories: "880+", sku: "15,000", lead: "20-25 ngày" },
  "dien-tu": { factories: "2,400+", sku: "54,000", lead: "15-25 ngày" },
  "thiet-bi-linh-kien": { factories: "1,300+", sku: "42,000", lead: "20-30 ngày" },
  "may-cong-nghiep": { factories: "740+", sku: "9,800", lead: "30-45 ngày" },
  "hardware-tools": { factories: "680+", sku: "12,000", lead: "15-20 ngày" },
  "nang-luong-khoang-san": { factories: "420+", sku: "5,200", lead: "25-35 ngày" },
  "hoa-chat": { factories: "560+", sku: "8,800", lead: "20-30 ngày" },
  // Cụm 4 — Nông nghiệp & dịch vụ
  "nong-san": { factories: "1,100+", sku: "9,400", lead: "10-20 ngày" },
  "nong-nghiep": { factories: "480+", sku: "6,200", lead: "25-35 ngày" },
  "van-tai": { factories: "210+", sku: "3,400", lead: "Theo hợp đồng" },
  "bao-ve-an-ninh": { factories: "390+", sku: "8,100", lead: "20-30 ngày" },
  "bao-bi": { factories: "720+", sku: "13,500", lead: "15-25 ngày" },
};

export default function IndustryChannelsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Industry Channels" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5">
          <h1 className="text-[24px] font-extrabold text-ink leading-tight">Kênh ngành — Industry Channels</h1>
          <p className="text-[13px] text-mute mt-1">40 lĩnh vực trọng điểm chia thành 4 cụm, hơn 2.400 phân loại con. Mỗi kênh được vận hành bởi sourcing manager chuyên ngành tại Quảng Châu.</p>
          <div className="flex flex-wrap gap-2 mt-3 text-[11.5px]">
            <span className="bg-surface-1 border border-line rounded-sm px-2.5 py-1 text-mute"><b className="text-ink">Cụm 1</b> · Tiêu dùng &amp; đời sống — 7 ngành</span>
            <span className="bg-surface-1 border border-line rounded-sm px-2.5 py-1 text-mute"><b className="text-ink">Cụm 2</b> · Xây dựng &amp; nội thất — 6 ngành</span>
            <span className="bg-surface-1 border border-line rounded-sm px-2.5 py-1 text-mute"><b className="text-ink">Cụm 3</b> · Công nghiệp &amp; kỹ thuật — 8 ngành</span>
            <span className="bg-surface-1 border border-line rounded-sm px-2.5 py-1 text-mute"><b className="text-ink">Cụm 4</b> · Nông nghiệp &amp; dịch vụ — 5 ngành</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-5 grid grid-cols-3 gap-4 max-md:grid-cols-1 mb-7">
        {NAV_CATEGORIES.map((c) => {
          const stats = STATS_BY_INDUSTRY[c.slug] ?? { factories: "100+", sku: "2,000", lead: "20-30 ngày" };
          return (
            <Link key={c.slug} href={`/category/${c.slug}`} className="bg-paper border border-line rounded overflow-hidden hover:border-brand block group">
              <div className="aspect-[16/9] bg-surface-1 relative overflow-hidden">
                <img src={`/img/industry-${c.slug}.jpg?v=3`} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
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
