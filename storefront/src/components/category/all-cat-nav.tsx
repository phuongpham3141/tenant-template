import type { CatSection } from "@/data/categories";

export function AllCatNav({ sections }: { sections: CatSection[] }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-5">
      <div className="bg-paper border border-line rounded overflow-hidden">
        <div className="px-5 py-3.5 flex justify-between items-center border-b border-line max-md:flex-col max-md:items-start max-md:gap-2">
          <h2 className="text-[16px] font-bold text-ink">Tất cả danh mục</h2>
          <div className="flex items-center gap-2.5 text-[12px] text-mute">
            <span>Xem theo</span>
            <div className="flex border border-line rounded-sm overflow-hidden">
              <button className="px-2.5 py-1 bg-brand text-white text-[12px] font-medium">
                Phân loại
              </button>
              <button className="px-2.5 py-1 bg-paper text-mute text-[12px] font-medium border-l border-line">
                A-Z
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 grid grid-cols-4 gap-x-4 gap-y-2 max-md:grid-cols-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#sec-${s.id}`}
              className="text-[13px] text-ink hover:text-brand cursor-pointer py-1 flex items-center gap-1.5"
            >
              <span className="text-mute2">›</span> {s.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
