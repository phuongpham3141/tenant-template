import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/category/breadcrumb";
import {
  ARTICLES,
  CATEGORIES,
  getArticle,
  getRelatedArticles,
  type BlogBlock,
} from "@/lib/blog";

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" });
}

function renderBlock(block: BlogBlock, i: number) {
  switch (block.type) {
    case "p":
      return (
        <p key={i} className="text-[14.5px] text-ink leading-[1.75] mb-5 max-md:text-[13.5px]">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 key={i} className="text-[22px] font-bold text-ink mt-8 mb-4 pb-2 border-b border-line max-md:text-[18px]">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="text-[17px] font-bold text-ink mt-6 mb-3 max-md:text-[15px]">
          {block.text}
        </h3>
      );
    case "img":
      return (
        <figure key={i} className="my-7">
          <img src={block.src} alt={block.caption ?? ""} loading="lazy" className="w-full rounded" />
          {block.caption && (
            <figcaption className="text-[11.5px] text-mute2 italic text-center mt-2">{block.caption}</figcaption>
          )}
        </figure>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="my-6 border-l-4 border-gold pl-5 py-2 italic text-[16px] text-ink leading-relaxed max-md:text-[14.5px]"
        >
          &ldquo;{block.text}&rdquo;
          {block.author && (
            <footer className="mt-2 text-[12.5px] text-mute not-italic">— {block.author}</footer>
          )}
        </blockquote>
      );
    case "list":
      return (
        <ul key={i} className="my-5 space-y-2 pl-1">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-2.5 text-[14px] text-ink leading-relaxed max-md:text-[13px]">
              <span className="text-brand font-bold flex-shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div key={i} className="my-6 overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="bg-bg border-b-2 border-brand">
                {block.headers.map((h, j) => (
                  <th key={j} className="text-left px-3 py-2 font-bold text-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rj) => (
                <tr key={rj} className="border-b border-line hover:bg-bg/50">
                  {row.map((cell, cj) => (
                    <td key={cj} className="px-3 py-2 text-ink">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const cat = CATEGORIES[article.category];
  const related = getRelatedArticles(slug, 3);

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Thông tin", href: "/help" },
          { label: "Tin tức ngành", href: "/info/industry-news" },
          { label: cat.label, href: `/info/industry-news?cat=${article.category}` },
          { label: article.title },
        ]}
      />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
      >
        <div className="max-w-[900px] mx-auto px-4 py-10 max-md:py-7">
          <Link
            href={`/info/industry-news?cat=${article.category}`}
            className="inline-block text-[10.5px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-sm mb-3 cursor-pointer text-white hover:opacity-90"
            style={{ backgroundColor: cat.color }}
          >
            {cat.label}
          </Link>
          <h1 className="text-[30px] font-extrabold leading-tight mb-3 max-md:text-[22px]">
            {article.title}
          </h1>
          <p className="text-[14px] opacity-90 leading-relaxed mb-4 max-md:text-[12.5px]">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-[12px] opacity-85 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-7 h-7 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-[12px]">
                {article.author.split(" ").map((s) => s[0]).slice(-2).join("")}
              </span>
              <span>
                <b>{article.author}</b>
                <span className="opacity-75 ml-1">· {article.authorRole}</span>
              </span>
            </span>
            <span>·</span>
            <span>📅 {fmtDate(article.date)}</span>
            <span>·</span>
            <span>⏱ {article.readMinutes} phút đọc</span>
          </div>
        </div>
      </section>

      {/* === BODY: article + sticky sidebar ================================ */}
      <div className="max-w-[1100px] mx-auto px-4 mt-6 mb-10 grid grid-cols-[1fr_280px] gap-7 max-lg:grid-cols-1">
        <article className="bg-paper border border-line rounded p-7 max-md:p-4">
          {/* Hero image */}
          <img
            src={article.image}
            alt={article.title}
            className="w-full rounded mb-6 max-md:mb-4"
          />

          {/* Content blocks */}
          <div>
            {article.content.map((block, i) => renderBlock(block, i))}
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-8 pt-5 border-t border-line">
              <span className="text-[11.5px] uppercase tracking-wider text-mute font-bold mr-3">Tags:</span>
              <div className="inline-flex flex-wrap gap-1.5">
                {article.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/info/industry-news?tag=${encodeURIComponent(t)}`}
                    className="text-[11.5px] text-ink bg-bg border border-line px-2 py-0.5 rounded-sm hover:border-brand hover:text-brand cursor-pointer"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author card */}
          <div className="mt-6 pt-5 border-t border-line bg-bg rounded p-4 flex gap-4 items-start max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-[18px] flex-shrink-0">
              {article.author.split(" ").map((s) => s[0]).slice(-2).join("")}
            </div>
            <div className="flex-1">
              <b className="block text-[14px] text-ink">{article.author}</b>
              <span className="text-[12px] text-mute">{article.authorRole} · Cybersilkroads</span>
              <p className="text-[12.5px] text-mute mt-1.5 leading-relaxed">
                Theo dõi {article.author} để cập nhật thêm các bài phân tích về ngành sourcing Việt Nam – Trung Quốc.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div
            className="mt-6 rounded p-5 text-white max-md:p-4"
            style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
          >
            <div className="grid grid-cols-[1fr_auto] gap-4 items-center max-md:grid-cols-1">
              <div>
                <b className="block text-[15px] mb-1">Cần sourcing trực tiếp từ NCC?</b>
                <p className="text-[12.5px] opacity-85 leading-snug">
                  Gửi RFQ — báo giá miễn phí trong 24h từ 5-10 NCC verified.
                </p>
              </div>
              <Link
                href="/buying-request"
                className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm font-bold text-[13px] hover:bg-[#E8943A] cursor-pointer text-center inline-block whitespace-nowrap"
              >
                🚀 Gửi RFQ
              </Link>
            </div>
          </div>
        </article>

        {/* === Sticky sidebar =========================================== */}
        <aside className="space-y-4 max-lg:hidden">
          {/* Article meta */}
          <div className="bg-paper border border-line rounded p-4 sticky top-[5rem]">
            <b className="block text-[12px] uppercase tracking-wider text-mute font-bold mb-3">📑 Bài viết này</b>
            <ul className="space-y-1.5 text-[12px] mb-4 pb-4 border-b border-line">
              <li className="flex justify-between">
                <span className="text-mute">Tác giả</span>
                <b className="text-ink text-right">{article.author}</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">Ngày đăng</span>
                <b className="text-ink">{fmtDate(article.date)}</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">Đọc trong</span>
                <b className="text-ink">{article.readMinutes} phút</b>
              </li>
              <li className="flex justify-between">
                <span className="text-mute">Danh mục</span>
                <b className="text-ink text-right">{cat.label}</b>
              </li>
            </ul>

            <Link
              href="/info/industry-news"
              className="block text-center py-2 border border-line rounded-sm text-[12px] text-ink font-semibold cursor-pointer hover:border-brand hover:text-brand mb-2"
            >
              ← Tất cả bài viết
            </Link>
            <Link
              href="/trade-alert"
              className="block text-center py-2 bg-accent text-white rounded-sm text-[12px] font-bold cursor-pointer hover:opacity-90"
            >
              📬 Đăng ký Cảnh báo Thương mại
            </Link>
          </div>
        </aside>
      </div>

      {/* === Related articles ============================================= */}
      {related.length > 0 && (
        <div className="max-w-[1100px] mx-auto px-4 mb-10">
          <h2 className="text-[18px] font-bold text-ink mb-4">Bài viết liên quan</h2>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/info/industry-news/${a.slug}`}
                className="block bg-paper border border-line rounded overflow-hidden cursor-pointer hover:border-brand hover:shadow-sm transition group/related"
              >
                <div className="aspect-[16/9] overflow-hidden bg-[#0E2A33]">
                  <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover/related:scale-[1.03] transition-transform" />
                </div>
                <div className="p-3.5">
                  <span
                    className="inline-block text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-sm text-white mb-1.5"
                    style={{ backgroundColor: CATEGORIES[a.category].color }}
                  >
                    {CATEGORIES[a.category].label}
                  </span>
                  <h3 className="text-[14px] font-bold text-ink leading-snug group-hover/related:text-brand line-clamp-2">{a.title}</h3>
                  <div className="text-[11px] text-mute2 mt-2">
                    {fmtDate(a.date)} · ⏱ {a.readMinutes}p
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Bài viết không tồn tại — Cybersilkroads" };
  return {
    title: `${article.title} — Cybersilkroads Blog`,
    description: article.excerpt,
  };
}
