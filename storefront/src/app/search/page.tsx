import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SECTIONS, FACTORIES } from "@/data/home";

const ALL_PRODUCTS = SECTIONS.flatMap((s) => s.products);

const FILTERS = [
  { title: "Loại kết quả", options: ["Sản phẩm", "Nhà cung cấp", "Trade Show"] },
  { title: "Giá", options: ["< $10", "$10 – $50", "$50 – $200", "> $200"] },
  { title: "MOQ", options: ["1 – 50", "50 – 200", "200 – 1000", "1000+"] },
  { title: "Xuất xứ", options: ["Foshan", "Quảng Châu", "Đông Quan", "Thượng Hải"] },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();

  // simple filter: if q matches any keyword in title or seller, prioritize
  const keywords = q.toLowerCase().split(/\s+/).filter(Boolean);
  const scored = ALL_PRODUCTS.map((p) => {
    const hay = (p.title + " " + p.seller).toLowerCase();
    const score = keywords.reduce((s, k) => s + (hay.includes(k) ? 1 : 0), 0);
    return { p, score };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((x) => x.p);

  const results = q ? scored : ALL_PRODUCTS.slice(0, 8);

  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Tìm kiếm" }, { label: q || "Tất cả" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5">
          <h1 className="text-[22px] font-bold text-ink leading-tight">
            Kết quả tìm kiếm cho <span className="text-brand">&ldquo;{q || "tất cả"}&rdquo;</span>
          </h1>
          <p className="text-[13px] text-mute mt-1">Tìm thấy {results.length} sản phẩm · 12 nhà cung cấp · 3 trade show</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {["Sản phẩm", "Nhà cung cấp", "Trade Show"].map((t, i) => (
              <a key={t} className={`px-4 py-2 text-[12.5px] rounded-sm cursor-pointer ${i === 0 ? "bg-brand text-white font-semibold" : "border border-line text-mute hover:border-brand"}`}>{t}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-4 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1 mb-7">
        <aside className="bg-paper border border-line rounded p-4 self-start space-y-5">
          {FILTERS.map((f) => (
            <div key={f.title}>
              <b className="block text-[13px] font-semibold text-ink mb-2">{f.title}</b>
              <ul className="space-y-1.5">
                {f.options.map((o) => (
                  <li key={o} className="flex items-center gap-2 text-[12.5px] text-mute hover:text-brand cursor-pointer">
                    <input type="checkbox" className="accent-brand" /> {o}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <div>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {results.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand block">
                <div className="aspect-square bg-surface-1">
                  {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
                </div>
                <div className="p-2.5">
                  <h4 className="text-[12.5px] text-ink line-clamp-2 mb-1 min-h-[32px]">{p.title}</h4>
                  <div className="text-accent font-bold text-[14px]">{p.price}<small className="text-mute font-normal text-[11px]">{p.unit}</small></div>
                  <div className="text-[11px] text-mute mt-1 truncate">{p.seller} · ★ {p.rating}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-7">
            <h2 className="text-[15px] font-bold text-ink mb-3">Nhà cung cấp liên quan</h2>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {FACTORIES.slice(0, 3).map((f) => (
                <Link key={f.slug} href={`/supplier/${f.slug}`} className="bg-paper border border-line rounded-sm p-3 hover:border-brand flex gap-3 items-center">
                  <div className="w-12 h-12 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[15px] text-brand flex-shrink-0">{f.initials}</div>
                  <div className="min-w-0">
                    <b className="block text-[12.5px] text-ink line-clamp-1">{f.name}</b>
                    <span className="text-[11px] text-mute">{f.location} · ★ {f.rating}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* No results CTA */}
          <div className="mt-7 bg-brand-dark text-white rounded p-5 flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:text-center">
            <div>
              <b className="block text-[16px] mb-1">Không tìm thấy sản phẩm phù hợp?</b>
              <span className="text-[12.5px] opacity-85">Gửi RFQ — chúng tôi sẽ tìm 5-10 nhà máy phù hợp trong 24h.</span>
            </div>
            <Link href={`/buying-request${q ? `?q=${encodeURIComponent(q)}` : ""}`} className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm font-bold text-[13px]">📨 Gửi RFQ →</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Tìm kiếm — Cybersilkroads" };
