import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SECTIONS, NAV_CATEGORIES } from "@/data/home";

const ALL_PRODUCTS = SECTIONS.flatMap((s) => s.products);

const FILTERS = [
  { title: "分类", options: NAV_CATEGORIES.slice(0, 6).map((c) => c.name) },
  { title: "材质", options: ["陶瓷", "天然石材", "木材", "金属", "皮革", "高端塑料"] },
  { title: "风格", options: ["现代", "古典", "极简", "工业", "北欧", "轻奢"] },
  { title: "价格", options: ["< $10", "$10 – $50", "$50 – $200", "$200 – $1000", "> $1000"] },
  { title: "产地", options: ["佛山", "广州", "东莞", "杭州", "上海"] },
];

export default function ProductsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "全部产品" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5 flex justify-between items-end max-md:flex-col max-md:items-start max-md:gap-3">
          <div>
            <h1 className="text-[24px] font-extrabold text-ink leading-tight">全部产品</h1>
            <p className="text-[13px] text-mute mt-1">来自 40+ 家已验厂工厂的 2,400+ 款产品 · 24 小时内报价 · DDP 运输至越南</p>
          </div>
          <div className="flex gap-2">
            {["全部", "热销", "新品", "精选", "OEM"].map((t, i) => (
              <a key={t} className={`px-4 py-2 text-[12.5px] rounded-sm cursor-pointer ${i === 0 ? "bg-brand text-white font-semibold" : "border border-line text-mute hover:border-brand"}`}>{t}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 mt-4 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        {/* Sidebar filters */}
        <aside className="bg-paper border border-line rounded p-4 self-start space-y-5">
          {FILTERS.map((f) => (
            <div key={f.title}>
              <b className="block text-[13px] font-semibold text-ink mb-2">{f.title}</b>
              <ul className="space-y-1.5">
                {f.options.map((o) => (
                  <li key={o} className="flex items-center gap-2 text-[12.5px] text-mute hover:text-brand cursor-pointer">
                    <input type="checkbox" className="accent-brand" /> {o}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Grid */}
        <div>
          <div className="text-[12px] text-mute mb-2">显示 24 / 2,400 款产品</div>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {ALL_PRODUCTS.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand block">
                <div className="aspect-square bg-[#F5F5F5]">
                  {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
                </div>
                <div className="p-2.5">
                  <h4 className="text-[12.5px] text-ink line-clamp-2 mb-1 min-h-[32px]">{p.title}</h4>
                  <div className="text-accent font-bold text-[14px] mb-1">{p.price}<small className="text-mute font-normal text-[11px]">{p.unit}</small></div>
                  <div className="text-[11px] text-mute flex justify-between">
                    <span>{p.moq}</span>
                    <span>★{p.rating}</span>
                  </div>
                  <div className="text-[11px] text-mute mt-1.5 pt-1.5 border-t border-dashed border-line truncate">{p.seller}</div>
                </div>
              </Link>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center gap-1 mt-6 mb-7">
            {[1, 2, 3, 4, 5, "...", 100].map((p, i) => (
              <a key={i} className={`min-w-[34px] px-2.5 py-1.5 text-[12.5px] rounded-sm cursor-pointer ${p === 1 ? "bg-brand text-white font-semibold" : "border border-line text-mute hover:border-brand"}`}>{p}</a>
            ))}
            <a className="px-3 py-1.5 text-[12.5px] rounded-sm border border-line text-mute hover:border-brand cursor-pointer">下一页 →</a>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "全部产品 — Huayuesc" };
