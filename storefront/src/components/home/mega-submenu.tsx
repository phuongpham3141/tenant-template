import Link from "next/link";
import type { NavSubItem, NAV_MENU } from "@/data/home";

type NavMenuGroup = typeof NAV_MENU[number];

/**
 * Category-overview panel — shown in the BannerSection right-panel when a
 * main category in the sidebar is hovered. Lists the group's sub-items as
 * a 3-col grid of cards (image + icon + name + tagline). Click any card
 * to drill into the sub-category page.
 */
export function CategoryOverviewPanel({ group }: { group: NavMenuGroup }) {
  const mainHref = `/category/${group.main.slug}`;
  return (
    <div className="p-4 h-full overflow-y-auto flex flex-col">
      {/* Heading */}
      <div className="flex items-center justify-between border-b border-line pb-2.5 mb-3 flex-shrink-0">
        <h3 className="text-[15px] font-bold text-brand flex items-center gap-2 min-w-0">
          <span className="text-[20px] flex-shrink-0">{group.main.icon}</span>
          <span className="truncate">{group.main.name}</span>
        </h3>
        <Link
          href={mainHref}
          className="text-[12px] text-accent font-semibold hover:underline flex-shrink-0 ml-3"
        >
          Xem toàn bộ →
        </Link>
      </div>

      {/* Body */}
      {group.items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-mute italic text-[13px] py-12">
          Danh mục đang cập nhật…
        </div>
      ) : (
        <ul className="grid grid-cols-3 gap-3 flex-1 content-start">
          {group.items.map((it) => (
            <li key={it.slug}>
              <Link
                href={`/category/${group.main.slug}/${it.slug}`}
                className="block rounded border border-line overflow-hidden hover:border-brand hover:shadow-md transition group/it h-full"
              >
                <div className="aspect-[16/10] bg-bg overflow-hidden">
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-full h-full object-cover group-hover/it:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <div className="p-2.5">
                  <div className="flex items-start gap-1.5 mb-1">
                    <span className="text-[16px] flex-shrink-0 leading-none mt-0.5">{it.icon}</span>
                    <h4 className="text-[12.5px] font-bold text-ink leading-tight group-hover/it:text-brand line-clamp-2">
                      {it.name}
                    </h4>
                  </div>
                  <p className="text-[10.5px] text-mute line-clamp-2 leading-snug">
                    {it.tagline}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
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
