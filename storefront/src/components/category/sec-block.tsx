import Link from "next/link";
import type { CatSection, SecAccent, CatSubcatItem } from "@/data/categories";

const accentText: Record<SecAccent, string> = {
  green: "text-success",
  blue: "text-brand-light",
  ochre: "text-gold",
  red: "text-accent",
};

const accentBorder: Record<SecAccent, string> = {
  green: "border-success",
  blue: "border-brand-light",
  ochre: "border-gold",
  red: "border-accent",
};

const norm = (i: string | CatSubcatItem): CatSubcatItem =>
  typeof i === "string" ? { name: i } : i;

export function SecBlock({ section, parentSlug }: { section: CatSection; parentSlug: string }) {
  return (
    <div id={`sec-${section.id}`} className="max-w-[1400px] mx-auto px-4 mt-5 scroll-mt-20">
      <div className={`bg-paper border-t-[3px] ${accentBorder[section.accent]} border-l border-r border-line rounded-t px-5 py-3 flex justify-between items-center`}>
        <h2 className={`text-[18px] font-bold ${accentText[section.accent]}`}>
          {section.title}
        </h2>
        <a className="text-brand text-[12.5px] cursor-pointer">Xem tất cả →</a>
      </div>
      <div className="bg-paper rounded-b border-l border-r border-b border-line grid grid-cols-[280px_1fr] max-md:grid-cols-1">
        <aside className="bg-[#FCFBF8] p-4 border-r border-line max-md:border-r-0 max-md:border-b">
          <ul className="space-y-1.5">
            {section.subcats.map((sc) => {
              const head = sc.slug ? (
                <Link
                  href={`/category/${parentSlug}/${sc.slug}`}
                  className={`flex justify-between items-center py-1 text-[13px] ${
                    sc.inline ? `${accentText[section.accent]} font-semibold` : "text-ink"
                  } hover:text-brand`}
                >
                  <span>{sc.name}</span>
                  <span className="text-mute2 text-[10px]">›</span>
                </Link>
              ) : (
                <a className={`flex justify-between items-center py-1 text-[13px] ${
                  sc.inline ? `${accentText[section.accent]} font-semibold` : "text-ink"
                } hover:text-brand cursor-pointer`}>
                  <span>{sc.name}</span>
                  <span className="text-mute2 text-[10px]">›</span>
                </a>
              );
              return (
                <li key={sc.name}>
                  {head}
                  {sc.inline && (
                    <div className="pl-2 pb-1 flex flex-wrap gap-x-1.5 gap-y-0.5 text-[12px]">
                      {sc.inline.map((raw, i, arr) => {
                        const it = norm(raw);
                        const node = it.slug ? (
                          <Link
                            href={`/category/${parentSlug}/${it.slug}`}
                            className="text-mute hover:text-brand"
                          >
                            {it.name}
                          </Link>
                        ) : (
                          <a className="text-mute hover:text-brand cursor-pointer">{it.name}</a>
                        );
                        return (
                          <span key={it.name} className="flex items-center gap-1.5">
                            {node}
                            {i < arr.length - 1 && <span className="text-mute2">/</span>}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>
        <div className="grid grid-cols-4 grid-rows-2 max-md:grid-cols-2 max-md:grid-rows-none">
          {section.products.map((p, i) => (
            <a
              key={i}
              className="border-r border-b border-line last:border-r-0 [&:nth-child(4n)]:border-r-0 p-3 hover:bg-[#FCFBF8] cursor-pointer flex flex-col gap-2"
            >
              <span className="text-[12px] text-ink font-medium leading-tight line-clamp-2 min-h-[32px]">
                {p.name}
              </span>
              <div className="aspect-square bg-[#F5F5F5] rounded-sm overflow-hidden">
                {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
