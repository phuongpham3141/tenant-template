import Link from "next/link";
import type { NavSubItem, NAV_MENU } from "@/data/home";

type NavMenuGroup = typeof NAV_MENU[number];

/**
 * Category-overview panel — shown in the BannerSection right-panel when a
 * main category in the sidebar is hovered. Reuses the CSR-style layout
 * from SubItemPanel but at the MAIN-category level:
 *   1. 4-col grid where each "section" = one sub-item of the group, with
 *      the sub-item's name as the section title and the top items from
 *      its first sections[].items[] (or highlights) listed underneath.
 *   2. "More Categories →" link bridge.
 *   3. Row of 6 round-cornered sub-item image thumbnails + captions.
 *   4. "Best Sellers:" inline list (top sub-item names).
 *   5. Footer breadcrumb + "View All [main] →".
 */
export function CategoryOverviewPanel({ group }: { group: NavMenuGroup }) {
  const mainHref = `/category/${group.main.slug}`;
  const bestsellers = group.items.slice(0, 5);

  if (group.items.length === 0) {
    return (
      <div className="p-4 h-full flex flex-col">
        <div className="border-b border-line pb-2.5 mb-3 flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-brand flex items-center gap-2">
            <span className="text-[20px]">{group.main.icon}</span>
            <span>{group.main.name}</span>
          </h3>
          <Link href={mainHref} className="text-[12px] text-accent font-semibold hover:underline">
            View All →
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center text-mute italic text-[13px]">
          This category is being updated…
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col overflow-y-auto">
      {/* 4-col grid — one section per sub-item */}
      <div className="grid grid-cols-4 gap-x-5 gap-y-4 flex-shrink-0">
        {group.items.map((it) => {
          const itemHref = `/category/${group.main.slug}/${it.slug}`;
          // Lead items: first section's items if present, else highlights.
          const leadItems = it.sections[0]?.items?.slice(0, 4)
            ?? it.highlights.slice(0, 4).map(h => ({ name: h.name, slug: h.slug }));
          const count = it.sections.reduce((n, s) => n + s.items.length, 0) || it.highlights.length;
          return (
            <div key={it.slug} className="min-w-0">
              <Link href={itemHref} className="flex items-baseline gap-1 mb-2 group/sect">
                <h4 className="text-[13px] font-bold text-brand group-hover/sect:underline truncate">
                  {it.name}
                </h4>
                <span className="text-[11px] text-mute2 font-normal flex-shrink-0">
                  ({count})
                </span>
              </Link>
              <ul className="space-y-0">
                {leadItems.map((sub, i) => (
                  <li key={`${sub.name}-${i}`}>
                    <Link
                      href={sub.slug ? `/category/${group.main.slug}/${sub.slug}` : itemHref}
                      className="block text-[12px] text-ink/85 hover:text-brand hover:underline truncate leading-snug py-0.5"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* More Categories bridge */}
      <div className="border-t border-line mt-3 pt-2.5 flex-shrink-0">
        <Link href={mainHref} className="text-[12px] text-brand font-semibold hover:underline">
          More Categories →
        </Link>
      </div>

      {/* Sub-item thumbnails row — round-cornered image + caption */}
      <ul className="grid grid-cols-6 gap-3 mt-2.5 flex-shrink-0">
        {group.items.slice(0, 6).map((it) => (
          <li key={it.slug} className="min-w-0">
            <Link
              href={`/category/${group.main.slug}/${it.slug}`}
              className="block group/hl"
            >
              <div className="aspect-square rounded-md bg-[#F5F7FA] overflow-hidden border border-line group-hover/hl:border-brand">
                <img
                  src={it.image}
                  alt={it.name}
                  className="w-full h-full object-cover group-hover/hl:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
              <p className="text-[10.5px] text-ink/85 text-center mt-1 leading-tight line-clamp-2 group-hover/hl:text-brand">
                {it.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Bestsellers inline list */}
      <div className="mt-2.5 pt-2 border-t border-line flex items-baseline gap-2 flex-shrink-0 flex-wrap">
        <span className="text-[11.5px] font-bold text-ink flex-shrink-0">
          Best Sellers:
        </span>
        {bestsellers.map((b, i) => (
          <span key={b.slug} className="flex items-baseline">
            <Link
              href={`/category/${group.main.slug}/${b.slug}`}
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

      {/* Footer: breadcrumb + view all */}
      <div className="mt-auto pt-2.5 border-t border-line flex justify-between items-center flex-shrink-0 text-[12px]">
        <span className="text-mute flex items-center gap-1.5">
          <span className="text-[14px]">{group.main.icon}</span>
          <span>{group.main.name}</span>
        </span>
        <Link href={mainHref} className="text-accent font-semibold hover:underline">
          View all {group.main.name} →
        </Link>
      </div>
    </div>
  );
}

/**
 * CSR-style sub-item panel — restored to full layout matching the
 * original Huayuesc design:
 *  1. 4-col grid of sections (title with count + child links)
 *  2. "More Categories →" link bridge
 *  3. Horizontal row of product highlight thumbnails (round-cornered
 *     image + caption) drawn from `item.highlights`
 *  4. "Best Sellers:" inline list (top items from highlights)
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
        {item.sections.map((s, si) => (
          <div key={`${s.title}-${si}`} className="min-w-0">
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
              {s.items.map((sub, si) => (
                <li key={`${sub.name}-${si}`}>
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
        {item.highlights.slice(0, 6).map((h, hi) => (
          <li key={`${h.name}-${hi}`} className="min-w-0">
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
          Best Sellers:
        </span>
        {bestsellers.map((b, i) => (
          <span key={`${b.name}-${i}`} className="flex items-baseline">
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
