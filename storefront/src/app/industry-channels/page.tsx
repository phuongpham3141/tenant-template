import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

const STATS_BY_INDUSTRY: Record<string, { factories: string; sku: string; lead: string; cluster: string }> = {
  "construction-materials": {
    factories: "20+", sku: "480+", lead: "18-25 ngày",
    cluster: "Phật Sơn (gốm sứ, sanitary) · Triều Châu (gạch men) · Phúc Kiến (đá tự nhiên)",
  },
  "noi-that": {
    factories: "20+", sku: "480+", lead: "20-30 ngày",
    cluster: "Lecong Phật Sơn (sofa) · Đông Quan (tủ bếp/tủ áo) · Tấn Giang (gỗ kỹ thuật)",
  },
  // Kitchen-bathroom appliances — ngành thứ 3 từ PDF (chưa có trong NAV_CATEGORIES, fallback)
  "kitchen-bathroom-appliances": {
    factories: "15+", sku: "320+", lead: "20-25 ngày",
    cluster: "Trung Sơn (đèn, bếp gas) · Mỹ Đích (đồ điện gia dụng) · Cự Hà (nắp bồn cầu thông minh)",
  },
};

export default function IndustryChannelsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Industry Channels" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5">
          <h1 className="text-[24px] font-extrabold text-ink leading-tight">Kênh ngành — Industry Channels</h1>
          <p className="text-[13px] text-mute mt-1">Huayue tập trung sâu vào 3 ngành chính: Vật liệu xây dựng (建材), Vật liệu trang trí nội thất (装饰材料) và Đồ điện gia dụng nhà bếp – phòng tắm (厨卫小家电). Mỗi kênh được vận hành bởi đội sourcing manager chuyên ngành tại văn phòng Quảng Châu, kết nối trực tiếp với các cụm nhà máy hàng đầu Trung Quốc.</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-5 grid grid-cols-3 gap-4 max-md:grid-cols-1 mb-7">
        {NAV_CATEGORIES.map((c) => {
          const stats = STATS_BY_INDUSTRY[c.slug] ?? { factories: "100+", sku: "2,000", lead: "20-30 ngày" };
          return (
            <Link key={c.slug} href={`/category/${c.slug}`} className="bg-paper border border-line rounded overflow-hidden hover:border-brand block group">
              <div className="aspect-[16/9] bg-[#F5F5F5] relative overflow-hidden">
                <img src={`/img/industry-${c.slug}.jpg?v=5`} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <div className="absolute top-3 left-3 bg-white px-3 py-1.5 rounded-sm text-[24px] leading-none">{c.icon}</div>
              </div>
              <div className="p-4">
                <h3 className="text-[16px] font-bold text-ink mb-2">{c.name}</h3>
                <div className="grid grid-cols-3 gap-2 text-[11.5px] mb-2">
                  <div>
                    <div className="text-mute">NCC đã audit</div>
                    <b className="text-brand">{stats.factories}</b>
                  </div>
                  <div>
                    <div className="text-mute">SKU đang bán</div>
                    <b className="text-brand">{stats.sku}</b>
                  </div>
                  <div>
                    <div className="text-mute">DDP về VN</div>
                    <b className="text-brand">{stats.lead}</b>
                  </div>
                </div>
                <div className="text-[11px] text-mute leading-snug border-t border-line pt-2">
                  <b className="text-ink">Cluster:</b> {stats.cluster}
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

export const metadata = { title: "Industry Channels — Huayuesc" };
