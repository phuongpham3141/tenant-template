import Link from "next/link";
import type { CategoryPage, CatOverviewItem } from "@/data/categories";

const norm = (it: string | CatOverviewItem): CatOverviewItem =>
  typeof it === "string" ? { name: it } : it;

export function OverviewCard({ data }: { data: CategoryPage }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-4">
      <div className="bg-paper border border-line rounded overflow-hidden grid grid-cols-[280px_1fr] min-h-[480px] max-md:grid-cols-1">
        <aside className="border-r border-line bg-[#FCFBF8] p-4 max-md:border-r-0 max-md:border-b">
          <h1 className="text-[20px] font-bold text-ink mb-1">{data.title}</h1>
          <p className="text-[12px] text-mute mb-4 leading-relaxed">{data.intro}</p>
          {data.overview.groups.map((g) => (
            <div key={g.title} className="mb-4 last:mb-0">
              <h3 className="text-[13px] font-bold text-ink mb-2 pb-1.5 border-b border-line flex justify-between items-center">
                {g.title}
                <span className="text-mute2 text-[10px]">▾</span>
              </h3>
              <ul className="space-y-1">
                {g.items.map((raw) => {
                  const it = norm(raw);
                  const cls =
                    "text-[12.5px] text-ink hover:text-brand cursor-pointer flex justify-between items-center py-0.5";
                  const inner = (
                    <>
                      <span>{it.name}</span>
                      <span className="text-mute2 text-[10px]">›</span>
                    </>
                  );
                  return (
                    <li key={it.name}>
                      {it.slug ? (
                        <Link href={`/category/${data.slug}/${it.slug}`} className={cls}>
                          {inner}
                        </Link>
                      ) : (
                        <a className={cls}>{inner}</a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>
        <div className="grid grid-cols-5 grid-rows-2 max-md:grid-cols-2 max-md:grid-rows-none">
          {data.overview.products.map((p, i) => (
            <a
              key={i}
              className="border-r border-b border-line last:border-r-0 [&:nth-child(5n)]:border-r-0 p-3 hover:bg-[#FCFBF8] cursor-pointer flex flex-col gap-2"
            >
              <span className="text-[12px] text-ink font-medium leading-tight line-clamp-2 min-h-[32px]">
                {p.name}
              </span>
              <div className="aspect-square bg-surface-1 rounded-sm overflow-hidden">
                {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
