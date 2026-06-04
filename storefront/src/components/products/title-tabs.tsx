import type { LeafCategoryPage } from "@/data/products";

const TABS = [
  { name: "产品列表", active: true },
  { name: "供应商列表" },
  { name: "已认证工厂" },
  { name: "交易保障" },
];

export function TitleTabs({ data }: { data: LeafCategoryPage }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-4">
      <div className="flex items-baseline gap-3 mb-2 flex-wrap">
        <h1 className="text-[26px] font-extrabold text-ink leading-tight">
          {data.title}
        </h1>
        <span className="text-[13px] text-mute">
          {data.title} 的 <b className="text-ink">{data.resultsCount}</b> 个结果
        </span>
      </div>
      <div className="flex justify-between items-center border-b border-line max-md:flex-col max-md:items-stretch max-md:gap-2">
        <div className="flex gap-0 max-md:overflow-x-auto">
          {TABS.map((t) => (
            <a
              key={t.name}
              className={`px-4 py-2.5 text-[13.5px] cursor-pointer border-b-[3px] -mb-px max-md:flex-shrink-0 max-md:whitespace-nowrap ${
                t.active
                  ? "text-accent border-accent font-semibold"
                  : "text-mute border-transparent hover:text-accent"
              }`}
            >
              {t.name}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[12px] text-mute max-md:px-1">
          <span>显示</span>
          <div className="flex border border-line rounded-sm overflow-hidden">
            <button className="px-2.5 py-1 bg-brand text-white text-[14px]">☰</button>
            <button className="px-2.5 py-1 bg-paper text-mute text-[14px] border-l border-line">▦</button>
          </div>
          <select className="px-2 py-1 border border-line rounded-sm text-[12px] bg-paper">
            <option>最新</option>
            <option>价格从低到高</option>
            <option>价格从高到低</option>
            <option>热销</option>
          </select>
        </div>
      </div>
    </div>
  );
}
