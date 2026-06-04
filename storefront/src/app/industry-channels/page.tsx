import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

const STATS_BY_INDUSTRY: Record<string, { factories: string; sku: string; lead: string; cluster: string }> = {
  "construction-materials": {
    factories: "20+", sku: "480+", lead: "18-25 天",
    cluster: "佛山（陶瓷、卫浴） · 潮州（瓷砖） · 福建（天然石材）",
  },
  "noi-that": {
    factories: "20+", sku: "480+", lead: "20-30 天",
    cluster: "佛山乐从（沙发） · 东莞（橱柜/衣柜） · 晋江（工程木）",
  },
  // Kitchen-bathroom appliances — 来自 PDF 的第三大行业（NAV_CATEGORIES 中暂无，回退）
  "kitchen-bathroom-appliances": {
    factories: "15+", sku: "320+", lead: "20-25 天",
    cluster: "中山（灯具、燃气灶） · 美的（家用电器） · 巨贺（智能马桶盖）",
  },
};

export default function IndustryChannelsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "行业频道" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5">
          <h1 className="text-[24px] font-extrabold text-ink leading-tight">行业频道</h1>
          <p className="text-[13px] text-mute mt-1">华越深耕三大主业：建材、装饰材料和厨卫小家电。每个频道均由广州办事处的专业采购经理团队运营，直连中国头部产业集群。</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-5 grid grid-cols-3 gap-4 max-md:grid-cols-1 mb-7">
        {NAV_CATEGORIES.map((c) => {
          const stats = STATS_BY_INDUSTRY[c.slug] ?? { factories: "100+", sku: "2,000", lead: "20-30 天" };
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
                    <div className="text-mute">已验厂供应商</div>
                    <b className="text-brand">{stats.factories}</b>
                  </div>
                  <div>
                    <div className="text-mute">在售 SKU</div>
                    <b className="text-brand">{stats.sku}</b>
                  </div>
                  <div>
                    <div className="text-mute">DDP 到越南</div>
                    <b className="text-brand">{stats.lead}</b>
                  </div>
                </div>
                <div className="text-[11px] text-mute leading-snug border-t border-line pt-2">
                  <b className="text-ink">产业集群：</b> {stats.cluster}
                </div>
                <span className="text-brand text-[12.5px] font-semibold mt-3 block">探索频道 →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export const metadata = { title: "行业频道 — Huayuesc" };
