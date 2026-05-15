import Link from "next/link";
import { NAV_CATEGORIES } from "@/data/home";

export function CategoryShowcase() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-4 max-md:px-3 max-md:mt-3">
      <div className="bg-paper border border-line rounded p-5 max-md:p-3">
        <h2 className="text-[18px] font-bold text-ink mb-4 flex items-center gap-2 max-md:text-[16px] max-md:mb-3">
          <span className="w-1 h-5 bg-brand rounded-sm" />
          Danh mục sản phẩm chính
          <span className="text-[12px] text-mute font-normal ml-1">
            · 12 ngành hàng tiêu biểu
          </span>
        </h2>
        <div className="grid grid-cols-6 gap-3 md:max-xl:grid-cols-4 max-md:grid-cols-3 max-md:gap-2">
          {NAV_CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group/cat flex flex-col items-center text-center hover:bg-cream rounded p-2 transition-colors max-md:p-1.5"
            >
              <div className="relative w-full aspect-square bg-surface-1 rounded-sm overflow-hidden mb-2 border border-line group-hover/cat:border-brand transition-colors max-md:mb-1.5">
                <img
                  src={`/img/showcase-${c.slug}.jpg`}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover/cat:scale-105 transition-transform"
                  loading="lazy"
                />
                {c.isNew && (
                  <span className="absolute top-1.5 right-1.5 bg-accent text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">
                    MỚI
                  </span>
                )}
                <span className="absolute bottom-1.5 left-1.5 text-[18px] drop-shadow-lg">
                  {c.icon}
                </span>
              </div>
              <span className="text-[12.5px] font-medium text-ink group-hover/cat:text-brand line-clamp-2 leading-tight max-md:text-[11.5px]">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
