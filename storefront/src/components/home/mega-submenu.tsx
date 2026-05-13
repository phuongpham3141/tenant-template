import Link from "next/link";
import { CATEGORIES, type CatSubcatItem } from "@/data/categories";
import { MegaCarousel, type CarouselItem } from "@/components/home/mega-carousel";

const norm = (i: string | CatSubcatItem): CatSubcatItem =>
  typeof i === "string" ? { name: i } : i;

/** Inner content of a category's submenu — caller wraps in mm-l2 grid container. */
export function SubmenuContent({ slug }: { slug: string }) {
  const cat = CATEGORIES[slug];
  if (!cat) {
    return (
      <div className="col-span-4 flex items-center justify-center text-[12.5px] text-mute py-10">
        Đang cập nhật danh sách subcategories cho danh mục này...
      </div>
    );
  }
  const sections = cat.sections.slice(0, 8);

  // Flatten ALL subcats (including inline items) into carousel items
  const carouselItems: CarouselItem[] = [];
  for (const s of cat.sections) {
    for (const sc of s.subcats) {
      const subSlug = sc.slug;
      carouselItems.push({
        name: sc.name,
        image: `/img/${(subSlug ?? sc.name).replace(/\s+/g, "")}.jpg?v=2`,
        href: subSlug
          ? `/category/${slug}/${subSlug}`
          : `/category/${slug}#sec-${s.id}`,
      });
      if (sc.inline) {
        for (const raw of sc.inline) {
          const it = norm(raw);
          carouselItems.push({
            name: it.name,
            image: `/img/${(it.slug ?? it.name).replace(/\s+/g, "")}.jpg?v=2`,
            href: it.slug
              ? `/category/${slug}/${it.slug}`
              : `/category/${slug}#sec-${s.id}`,
          });
        }
      }
    }
  }

  // Hot products: 5 short keywords pulled from sections' subcats
  const hotProducts: string[] = [];
  for (const s of cat.sections) {
    for (const sc of s.subcats) {
      if (hotProducts.length < 5) hotProducts.push(sc.name);
    }
    if (hotProducts.length >= 5) break;
  }

  return (
    <>
      {/* Top: 8 sections in 4-col grid (2 rows × 4 cols).
          Each section uses class .mm-sec — items beyond 4 are hidden by
          default and revealed on .mm-sec:hover (handled in globals.css). */}
      {sections.map((s) => (
        <div key={s.id} className="mm-sec min-w-0">
          <Link
            href={`/category/${slug}#sec-${s.id}`}
            className="block text-[12px] font-bold text-brand mb-1 hover:underline truncate"
          >
            {s.title}
            {s.subcats.length > 4 && (
              <span className="ml-1 text-[10px] text-mute2 font-normal mm-sec-more">
                ({s.subcats.length})
              </span>
            )}
          </Link>
          <ul className="space-y-0">
            {s.subcats.map((sc) => (
              <li key={sc.name}>
                <Link
                  href={
                    sc.slug
                      ? `/category/${slug}/${sc.slug}`
                      : `/category/${slug}#sec-${s.id}`
                  }
                  className="block text-[11.5px] text-ink/85 hover:text-brand py-0.5 truncate"
                >
                  {sc.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* "More categories" link separator */}
      <div className="col-span-4 pt-3 mt-2 border-t border-line">
        <Link
          href={`/category/${slug}`}
          className="text-[12px] text-brand hover:underline font-medium"
        >
          More Categories →
        </Link>
      </div>

      {/* Carousel of ALL subcats with images (scroll buttons) */}
      <div className="col-span-4">
        <MegaCarousel items={carouselItems} />
      </div>

      {/* Hot products keywords row */}
      <div className="col-span-4 pt-2 border-t border-line text-[11.5px] text-mute">
        <b className="text-ink">Sản phẩm bán chạy:</b>{" "}
        {hotProducts.map((kw, i) => (
          <span key={kw}>
            <Link
              href={`/search?q=${encodeURIComponent(kw)}`}
              className="text-mute hover:text-brand"
            >
              {kw}
            </Link>
            {i < hotProducts.length - 1 && (
              <span className="text-mute2 mx-1">,</span>
            )}
          </span>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="col-span-4 flex justify-between items-center pt-2 border-t border-line">
        <span className="text-[11px] text-mute">{cat.title}</span>
        <Link
          href={`/category/${slug}`}
          className="text-[12px] text-accent font-semibold hover:underline"
        >
          Xem toàn bộ {cat.title} →
        </Link>
      </div>
    </>
  );
}
