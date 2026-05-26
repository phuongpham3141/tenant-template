import Link from "next/link";
import { NAV_MENU } from "@/data/home";

export function CategoryShowcase() {
  const totalSubs = NAV_MENU.reduce((n, g) => n + g.items.length, 0);
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-4 max-md:px-3 max-md:mt-3">
      <div className="bg-paper border border-line rounded p-5 max-md:p-3">
        <h2 className="text-[18px] font-bold text-ink mb-4 flex items-center gap-2 max-md:text-[16px] max-md:mb-3">
          <span className="w-1 h-5 bg-brand rounded-sm" />
          Danh mục sản phẩm chính
          <span className="text-[12px] text-mute font-normal ml-1">
            · {NAV_MENU.length} ngành chính, {totalSubs} phân loại
          </span>
        </h2>

        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-4">
          {NAV_MENU.map((group) => (
            <div key={group.main.slug} className="flex flex-col">
              <Link
                href={`/category/${group.main.slug}`}
                className="flex items-center gap-2 text-[15px] font-bold text-ink hover:text-brand mb-3"
              >
                <span className="text-[18px]">{group.main.icon}</span>
                <span>{group.main.name}</span>
                <span className="text-mute2 text-[12px] font-normal">→</span>
              </Link>
              <div className="grid grid-cols-4 gap-2.5 max-md:grid-cols-4 max-md:gap-2">
                {group.items.map((it) => (
                  <Link
                    key={it.slug}
                    href={`/category/${group.main.slug}/${it.slug}`}
                    className="group/cat flex flex-col items-center text-center hover:bg-[#FCFBF8] rounded p-1.5 transition-colors"
                  >
                    <div className="w-full aspect-square bg-[#F5F5F5] rounded-sm overflow-hidden mb-1.5 border border-line group-hover/cat:border-brand transition-colors">
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-full h-full object-cover group-hover/cat:scale-105 transition-transform"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[11.5px] font-medium text-ink group-hover/cat:text-brand line-clamp-2 leading-tight max-md:text-[11px]">
                      {it.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
