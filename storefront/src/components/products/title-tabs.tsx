import type { LeafCategoryPage } from "@/data/products";

const TABS = [
  { name: "Danh sách sản phẩm", active: true },
  { name: "Danh sách NCC" },
  { name: "Nhà máy được chứng nhận" },
  { name: "Giao dịch bảo đảm" },
];

export function TitleTabs({ data }: { data: LeafCategoryPage }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-4">
      <div className="flex items-baseline gap-3 mb-2 flex-wrap">
        <h1 className="text-[26px] font-extrabold text-ink leading-tight">
          {data.title}
        </h1>
        <span className="text-[13px] text-mute">
          <b className="text-ink">{data.resultsCount}</b> kết quả cho {data.title}
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
          <span>Hiển thị</span>
          <div className="flex border border-line rounded-sm overflow-hidden">
            <button className="px-2.5 py-1 bg-brand text-white text-[14px]">☰</button>
            <button className="px-2.5 py-1 bg-paper text-mute text-[14px] border-l border-line">▦</button>
          </div>
          <select className="px-2 py-1 border border-line rounded-sm text-[12px] bg-paper">
            <option>Mới nhất</option>
            <option>Giá tăng dần</option>
            <option>Giá giảm dần</option>
            <option>Bán chạy</option>
          </select>
        </div>
      </div>
    </div>
  );
}
