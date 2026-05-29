import Link from "next/link";
import type { NavSubItem } from "@/data/home";

/**
 * CSR-style sub-item panel — restored to full layout matching the
 * original Huayuesc design:
 *  1. 4-col grid of sections (title with count + child links)
 *  2. "More Categories →" link bridge
 *  3. Horizontal row of product highlight thumbnails (round-cornered
 *     image + caption) drawn from `item.highlights`
 *  4. "Sản phẩm bán chạy:" inline list (top items from highlights)
 *
 * Hero image strip was removed — the original reference does not have
 * one above the sections, only the 4-col grid + thumbnails.
 */
export function SubItemPanel({
  groupSlug,
  item,
}: {
  groupSlug: string;
  item: NavSubItem;
}) {
  const itemHref = `/category/${groupSlug}/${item.slug}`;
  const bestsellers = item.highlights.slice(0, 5);

  return (
    <div className="p-4 h-full flex flex-col overflow-y-auto">
      {/* CSR-style sections grid: 4 cols × N rows of text links */}
      <div className="grid grid-cols-4 gap-x-5 gap-y-4 flex-shrink-0">
        {item.sections.map((s) => (
          <div key={s.title} className="min-w-0">
            <Link
              href={itemHref}
              className="flex items-baseline gap-1 mb-2 group/sect"
            >
              <h4 className="text-[13px] font-bold text-brand group-hover/sect:underline truncate">
                {s.title}
              </h4>
              <span className="text-[11px] text-mute2 font-normal flex-shrink-0">
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
                        : itemHref
                    }
                    className="block text-[12px] text-ink/85 hover:text-brand hover:underline truncate leading-snug py-0.5"
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bridge: More Categories link */}
      <div className="border-t border-line mt-3 pt-2.5 flex-shrink-0">
        <Link
          href={itemHref}
          className="text-[12px] text-brand font-semibold hover:underline"
        >
          More Categories →
        </Link>
      </div>

      {/* Highlight thumbnails — small rounded images of top products */}
      <ul className="grid grid-cols-6 gap-3 mt-2.5 flex-shrink-0">
        {item.highlights.slice(0, 6).map((h) => (
          <li key={h.name} className="min-w-0">
            <Link
              href={h.slug ? `/category/${groupSlug}/${h.slug}` : itemHref}
              className="block group/hl"
            >
              <div className="aspect-square rounded-md bg-[#F5F7FA] overflow-hidden border border-line group-hover/hl:border-brand">
                <img
                  src={h.image}
                  alt={h.name}
                  className="w-full h-full object-cover group-hover/hl:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
              <p className="text-[10.5px] text-ink/85 text-center mt-1 leading-tight line-clamp-2 group-hover/hl:text-brand">
                {h.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Bestsellers footer line */}
      <div className="mt-2.5 pt-2 border-t border-line flex items-baseline gap-2 flex-shrink-0 flex-wrap">
        <span className="text-[11.5px] font-bold text-ink flex-shrink-0">
          Sản phẩm bán chạy:
        </span>
        {bestsellers.map((b, i) => (
          <span key={b.name} className="flex items-baseline">
            <Link
              href={b.slug ? `/category/${groupSlug}/${b.slug}` : itemHref}
              className="text-[11.5px] text-accent hover:underline"
            >
              {b.name}
            </Link>
            {i < bestsellers.length - 1 && (
              <span className="text-mute2 ml-1.5 mr-0.5">,</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
