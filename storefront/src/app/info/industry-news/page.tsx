import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { ARTICLES, CATEGORIES, type BlogCategory } from "@/lib/blog";

/**
 * Blog index — /info/industry-news.
 * Static route takes precedence over /info/[topic] catch-all.
 *
 * Layout:
 *   - Hero: title + intro + category filter chips
 *   - Featured article (large card)
 *   - Article grid (3 cols on desktop, 2 on tablet, 1 on mobile)
 *   - Sidebar: categories with count, newsletter signup, popular tags
 *   - Pagination (placeholder — all 12 articles shown for now)
 */

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const sp = await searchParams;
  const activeCat = sp.cat as BlogCategory | undefined;

  const allArticles = ARTICLES;
  const filtered = activeCat ? allArticles.filter((a) => a.category === activeCat) : allArticles;
  const featured = filtered.find((a) => a.featured) ?? filtered[0];
  const rest = filtered.filter((a) => a.slug !== featured?.slug);

  // Category counts
  const catCounts = (Object.keys(CATEGORIES) as BlogCategory[]).map((k) => ({
    code: k,
    label: CATEGORIES[k].label,
    color: CATEGORIES[k].color,
    count: allArticles.filter((a) => a.category === k).length,
  }));

  // Popular tags (from all articles)
  const tagFreq: Record<string, number> = {};
  allArticles.forEach((a) => a.tags.forEach((t) => (tagFreq[t] = (tagFreq[t] ?? 0) + 1)));
  const popularTags = Object.entries(tagFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Thông tin", href: "/help" },
          { label: "Tin tức ngành" },
        ]}
      />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)" }}
      >
        <div className="max-w-[1200px] mx-auto px-4 py-10 max-md:py-7">
          <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">
            📰 BLOG · CYBERSILKROADS
          </span>
          <h1 className="text-[34px] font-extrabold leading-tight mb-2 max-md:text-[24px]">
            Tin tức ngành sourcing Việt Nam – Trung Quốc
          </h1>
          <p className="text-[14px] opacity-90 leading-relaxed max-w-[720px] max-md:text-[12.5px] mb-5">
            Phân tích xu hướng giá, hội chợ, chính sách thuế, case study từ buyer Việt Nam và profile NCC. Cập nhật mỗi tuần bởi đội ngũ Quảng Châu + Hà Nội.
          </p>

          {/* Category filter chips */}
          <div className="flex flex-wrap gap-2">
            <Link
              href="/info/industry-news"
              className={`px-3 py-1.5 rounded-full text-[12px] font-semibold cursor-pointer transition ${
                !activeCat ? "bg-gold text-brand-dark" : "bg-white/15 text-white hover:bg-white/25"
              }`}
            >
              Tất cả ({allArticles.length})
            </Link>
            {catCounts.map((c) => (
              <Link
                key={c.code}
                href={`/info/industry-news?cat=${c.code}`}
                className={`px-3 py-1.5 rounded-full text-[12px] font-semibold cursor-pointer transition ${
                  activeCat === c.code ? "bg-gold text-brand-dark" : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {c.label} ({c.count})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === BODY: articles + sidebar ====================================== */}
      <div className="max-w-[1200px] mx-auto px-4 mt-6 mb-10 grid grid-cols-[1fr_300px] gap-7 max-lg:grid-cols-1 max-md:mt-4">
        {/* === Articles column =========================================== */}
        <div>
          {/* Featured article */}
          {featured && (
            <Link
              href={`/info/industry-news/${featured.slug}`}
              className="block bg-paper border border-line rounded overflow-hidden cursor-pointer hover:border-brand hover:shadow-md transition mb-6 group/feat"
            >
              <div className="grid grid-cols-[1.3fr_1fr] max-md:grid-cols-1">
                <div className="aspect-[16/10] overflow-hidden bg-[#0E2A33] max-md:aspect-[16/9]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/feat:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center max-md:p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-[10.5px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm text-white"
                      style={{ backgroundColor: CATEGORIES[featured.category].color }}
                    >
                      {CATEGORIES[featured.category].label}
                    </span>
                    <span className="text-[10.5px] text-mute2 uppercase tracking-wider font-bold">⭐ NỔI BẬT</span>
                  </div>
                  <h2 className="text-[22px] font-bold text-ink leading-tight mb-2 group-hover/feat:text-brand max-md:text-[18px]">
                    {featured.title}
                  </h2>
                  <p className="text-[13px] text-mute leading-relaxed mb-4 line-clamp-3">{featured.excerpt}</p>
                  <div className="text-[11.5px] text-mute2 flex items-center gap-2 flex-wrap">
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span>{fmtDate(featured.date)}</span>
                    <span>·</span>
                    <span>⏱ {featured.readMinutes} phút đọc</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Article grid */}
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-4">
            {rest.map((a) => (
              <Link
                key={a.slug}
                href={`/info/industry-news/${a.slug}`}
                className="block bg-paper border border-line rounded overflow-hidden cursor-pointer hover:border-brand hover:shadow-sm transition group/card"
              >
                <div className="aspect-[16/9] overflow-hidden bg-[#0E2A33]">
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/card:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span
                    className="inline-block text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm text-white mb-2"
                    style={{ backgroundColor: CATEGORIES[a.category].color }}
                  >
                    {CATEGORIES[a.category].label}
                  </span>
                  <h3 className="text-[15px] font-bold text-ink leading-snug mb-2 group-hover/card:text-brand line-clamp-2 min-h-[42px]">
                    {a.title}
                  </h3>
                  <p className="text-[12px] text-mute leading-relaxed mb-3 line-clamp-2">{a.excerpt}</p>
                  <div className="text-[11px] text-mute2 flex items-center gap-2 flex-wrap pt-2 border-t border-line">
                    <span>{a.author}</span>
                    <span>·</span>
                    <span>{fmtDate(a.date)}</span>
                    <span>·</span>
                    <span>⏱ {a.readMinutes}p</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="bg-paper border border-line rounded p-12 text-center text-mute">
              Chưa có bài viết trong danh mục này.
            </div>
          )}

          {/* Pagination placeholder */}
          {filtered.length > 8 && (
            <div className="flex justify-center mt-8 gap-2">
              <button className="px-3 py-1.5 border border-line rounded-sm text-[12.5px] text-mute hover:border-brand hover:text-brand cursor-pointer">← Trang trước</button>
              <span className="px-3 py-1.5 bg-brand text-white rounded-sm text-[12.5px] font-bold">1</span>
              <button className="px-3 py-1.5 border border-line rounded-sm text-[12.5px] text-ink hover:border-brand hover:text-brand cursor-pointer">2</button>
              <button className="px-3 py-1.5 border border-line rounded-sm text-[12.5px] text-ink hover:border-brand hover:text-brand cursor-pointer">Trang sau →</button>
            </div>
          )}
        </div>

        {/* === Sidebar =================================================== */}
        <aside className="space-y-4 max-lg:hidden">
          {/* Newsletter signup */}
          <div
            className="rounded p-4 text-white"
            style={{ background: "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[18px]">📬</span>
              <b className="text-[13px] font-bold">Cảnh báo Thương mại miễn phí</b>
            </div>
            <p className="text-[11.5px] opacity-90 leading-snug mb-3">
              12,000+ buyer Việt Nam đã đăng ký. Newsletter mỗi thứ 5 với xu hướng giá, deal limited, hội chợ.
            </p>
            <form action="/trade-alert" method="get" className="space-y-2">
              <input
                type="email"
                name="email"
                placeholder="email@congty.vn"
                className="w-full px-2.5 py-1.5 text-[12px] rounded-sm bg-white text-ink outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-gold text-brand-dark rounded-sm font-bold text-[12.5px] cursor-pointer hover:bg-[#E8943A]"
              >
                Đăng ký miễn phí
              </button>
            </form>
          </div>

          {/* Categories list */}
          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[12px] uppercase tracking-wider text-mute font-bold mb-3">📁 Danh mục</b>
            <ul className="space-y-1.5">
              {catCounts.map((c) => (
                <li key={c.code}>
                  <Link
                    href={`/info/industry-news?cat=${c.code}`}
                    className={`flex justify-between items-center py-1 text-[12.5px] cursor-pointer ${
                      activeCat === c.code ? "text-brand font-semibold" : "text-ink hover:text-brand"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.label}
                    </span>
                    <span className="text-[11px] text-mute2">{c.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular tags */}
          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[12px] uppercase tracking-wider text-mute font-bold mb-3">🏷 Tag phổ biến</b>
            <div className="flex flex-wrap gap-1.5">
              {popularTags.map(([tag, n]) => (
                <span
                  key={tag}
                  className="text-[11px] text-ink bg-bg border border-line px-2 py-0.5 rounded-sm hover:border-brand hover:text-brand cursor-pointer"
                  title={`${n} bài viết`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related links */}
          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[12px] uppercase tracking-wider text-mute font-bold mb-3">🔗 Liên kết</b>
            <ul className="space-y-1.5">
              <li>
                <Link href="/info/about-us" className="text-[12.5px] text-brand hover:underline cursor-pointer block">
                  → Giới thiệu Cybersilkroads
                </Link>
              </li>
              <li>
                <Link href="/info/import-guide" className="text-[12.5px] text-brand hover:underline cursor-pointer block">
                  → Hướng dẫn nhập khẩu
                </Link>
              </li>
              <li>
                <Link href="/buying-request" className="text-[12.5px] text-brand hover:underline cursor-pointer block">
                  → Gửi RFQ
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-[12.5px] text-brand hover:underline cursor-pointer block">
                  → Trung tâm trợ giúp
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

export const metadata = {
  title: "Tin tức ngành sourcing — Cybersilkroads Blog",
  description:
    "Phân tích xu hướng giá, hội chợ, chính sách thuế, case study buyer Việt Nam và profile NCC Trung Quốc. Cập nhật mỗi tuần bởi đội Cybersilkroads.",
};
