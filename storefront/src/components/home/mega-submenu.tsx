import Link from "next/link";
import type { NavSubItem } from "@/data/home";

/**
 * CSR-style sub-item panel — renders the 4 sections × 4 sub-sub-items
 * of a NAV_MENU sub-item as a 4-col text grid (like the original
 * cybersilkroads design). Single hero image strip on top for branding.
 */
export function SubItemPanel({
  groupSlug,
  item,
}: {
  groupSlug: string;
  item: NavSubItem;
}) {
  return (
    <div className="p-4 h-full flex flex-col">
      {/* Small hero strip with title + tagline */}
      <Link
        href={`/category/${groupSlug}/${item.slug}`}
        className="block relative aspect-[16/4] rounded overflow-hidden mb-3 group/hero flex-shrink-0"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover/hero:scale-105 transition-transform"
          loading="lazy"
        />
        <div
          className="absolute inset-0 px-4 py-2.5 flex flex-col justify-end text-white"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,37,87,0.0) 35%, rgba(0,37,87,0.88) 100%)",
          }}
        >
          <h3 className="text-[15px] font-bold leading-tight">{item.name}</h3>
          <p className="text-[10.5px] opacity-90 leading-snug line-clamp-1">
            {item.tagline}
          </p>
        </div>
      </Link>

      {/* CSR-style sections grid: 4 cols × N rows of text links */}
      <div className="grid grid-cols-4 gap-x-4 gap-y-3 flex-1 min-h-0 overflow-y-auto">
        {item.sections.map((s) => (
          <div key={s.title} className="min-w-0">
            <Link
              href={`/category/${groupSlug}/${item.slug}`}
              className="flex items-baseline gap-1 mb-1.5 group/sect"
            >
              <h4 className="text-[12.5px] font-bold text-brand group-hover/sect:underline truncate">
                {s.title}
              </h4>
              <span className="text-[10px] text-mute2 font-normal flex-shrink-0">
                ({s.items.length})
              </span>
            </Link>
            <ul className="space-y-0">
              {s.items.map((sub) => (
                <li key={sub.name}>
                  <Link
                    href={
                      sub.slug
                        ? `/category/${groupSlug}/${sub.slug}`
                        : `/category/${groupSlug}/${item.slug}`
                    }
                    className="block text-[11.5px] text-ink/85 hover:text-brand hover:underline truncate leading-snug py-0.5"
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-2 pt-2 border-t border-line flex justify-between items-center flex-shrink-0">
        <span className="text-[10.5px] text-mute">
          {item.sections.reduce((n, s) => n + s.items.length, 0)} sản phẩm
        </span>
        <Link
          href={`/category/${groupSlug}/${item.slug}`}
          className="text-[11.5px] text-accent font-semibold hover:underline"
        >
          Xem toàn bộ {item.name} →
        </Link>
      </div>
    </div>
  );
}
