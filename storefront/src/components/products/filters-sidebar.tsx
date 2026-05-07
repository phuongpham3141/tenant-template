import type { FilterGroup } from "@/data/products";

export function FiltersSidebar({ filters }: { filters: FilterGroup[] }) {
  return (
    <aside className="bg-paper border border-line rounded p-3.5 sticky top-3 self-start max-md:static">
      <div className="flex justify-between items-center pb-2.5 mb-2.5 border-b border-line">
        <b className="text-[14px] text-ink font-bold">⚙ Bộ lọc</b>
        <a className="text-[11.5px] text-brand cursor-pointer">Xoá hết</a>
      </div>
      {filters.map((g) => (
        <div key={g.title} className="mb-3.5 pb-3 last:mb-0 last:pb-0 border-b border-dashed border-line last:border-b-0">
          <h4 className="text-[12.5px] font-bold text-ink mb-2 uppercase tracking-wider">
            {g.title}
          </h4>
          {g.nested && (
            <ul className="space-y-1">
              {g.nested.map((n) => (
                <li
                  key={n.name}
                  style={{ paddingLeft: `${n.depth * 12}px` }}
                  className={`text-[12.5px] flex justify-between items-center py-0.5 ${
                    n.active ? "text-accent font-bold" : "text-ink"
                  }`}
                >
                  <span className="cursor-pointer hover:text-brand flex items-center gap-1">
                    {n.depth > 0 && <span className="text-mute2">└</span>}
                    {n.name}
                  </span>
                  {n.active && <span className="text-accent text-[10px]">●</span>}
                </li>
              ))}
            </ul>
          )}
          {g.options.length > 0 && (
            <ul className="space-y-1.5">
              {g.options.map((o) => (
                <li key={o.name}>
                  <label className="flex items-center justify-between gap-2 cursor-pointer text-[12.5px] text-ink hover:text-brand">
                    <span className="flex items-center gap-1.5">
                      <input type="checkbox" className="accent-brand w-3.5 h-3.5" />
                      <span>{o.name}</span>
                    </span>
                    {o.count && (
                      <span className="text-mute2 text-[11px]">({o.count})</span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          )}
          {g.showMore && (
            <a className="block mt-1.5 text-[11.5px] text-brand cursor-pointer">
              Xem thêm ▼
            </a>
          )}
        </div>
      ))}
    </aside>
  );
}
