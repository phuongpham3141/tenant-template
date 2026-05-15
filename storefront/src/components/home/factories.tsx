import Link from "next/link";
import { FACTORIES } from "@/data/home";

/**
 * Factory partners — each card leads with a real factory/industrial photo
 * from Unsplash (verified hot-link-able IDs) with the brand initials seal
 * overlapping the bottom-left — same pattern as Alibaba/MIC supplier cards.
 *
 * Mapping is by factory slug → curated photo ID. We use Unsplash's CDN
 * (images.unsplash.com) directly via plain <img> so no next/image config
 * is needed and the photos are deterministic.
 */

const FACTORY_BANNER: Record<string, string> = {
  "dongpeng-ceramics": "1565008447742-97f6f38c985c",   // warehouse with stacked goods
  "monalisa-group": "1551434678-e076c223a692",          // production line
  "newpearl-ceramics": "1565043589221-1a6fd9ae45c7",    // production line wide
  "ortonbaths-group": "1581092446327-9b52bd1570c2",     // industrial machinery
  "kuka-home": "1567789884554-0b844b597180",            // furniture manufacturing
  "oppein-home": "1493946740644-2d8a1f1a6aff",          // industrial wide
  "landbond-furniture": "1556745757-8d76bdb6984b",      // factory floor
  "zuoyou-furniture": "1581092335397-9583eb92d232",     // warehouse aisle
  "redapple-furniture": "1517245386807-bb43f82c33c4",   // industrial scene
};

const FALLBACK_BANNER = "1565793298595-6a879b1d9492";   // factory worker (default)

function bannerUrl(slug: string) {
  const id = FACTORY_BANNER[slug] || FALLBACK_BANNER;
  return `https://images.unsplash.com/photo-${id}?w=640&h=360&fit=crop&auto=format&q=70`;
}

export function Factories() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-5 max-md:px-3 max-md:mt-3">
      {/* === Header bar ============================================ */}
      <div className="bg-paper px-5 py-3.5 flex justify-between items-center border-t-[3px] border-accent rounded-t border-l border-r border-line max-md:flex-col max-md:items-stretch max-md:gap-2 max-md:px-3 max-md:py-2.5">
        <h2 className="text-[18px] font-bold text-ink flex items-center gap-2.5 max-md:text-[15px]">
          <span className="w-7 h-7 bg-accent text-white rounded-sm flex items-center justify-center font-bold max-md:w-6 max-md:h-6 max-md:text-[12px]">
            🏭
          </span>
          Nhà máy đối tác
        </h2>
        <div className="flex gap-3.5 text-[12.5px] text-mute max-md:flex-wrap max-md:gap-2 max-md:text-[11.5px]">
          <span>
            <b className="text-ink">40+</b> Đã thẩm định
          </span>
          <span>
            <b className="text-ink">22</b> NCC hạng Vàng
          </span>
          <span>
            <b className="text-ink">38</b> Đã audit
          </span>
        </div>
        <Link
          href="/suppliers"
          className="text-brand text-[12.5px] flex items-center gap-1 cursor-pointer max-md:self-end max-md:text-[11.5px]"
        >
          Xem tất cả nhà máy →
        </Link>
      </div>

      {/* === Factory cards grid ==================================== */}
      <div className="bg-paper rounded-b border-l border-r border-b border-line p-4 grid grid-cols-3 gap-3 md:max-xl:gap-2.5 max-md:grid-cols-1 max-md:p-2.5 max-md:gap-2">
        {FACTORIES.map((f) => (
          <Link
            key={f.slug}
            href={`/supplier/${f.slug}`}
            className="border border-line rounded-sm overflow-hidden transition cursor-pointer hover:border-brand hover:shadow-[0_4px_10px_rgba(0,60,143,0.1)] block group/fact"
          >
            {/* === Banner: factory photo with badges + brand seal === */}
            <div className="relative aspect-[16/9] overflow-hidden bg-[#0E2A33]">
              <img
                src={bannerUrl(f.slug)}
                alt={f.name}
                loading="lazy"
                className="w-full h-full object-cover opacity-90 group-hover/fact:opacity-100 group-hover/fact:scale-[1.03] transition-all duration-300"
              />
              {/* Top badges */}
              <div className="absolute top-2 left-2 flex gap-1 flex-wrap z-10">
                {f.badges.gold && (
                  <span className="bg-gold text-brand-dark text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider shadow-sm">
                    ⭐ VÀNG
                  </span>
                )}
                {f.badges.audited && (
                  <span className="bg-success text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider shadow-sm">
                    ✓ ĐÃ KIỂM ĐỊNH
                  </span>
                )}
              </div>
              {/* Years pill (right) */}
              <span className="absolute top-2 right-2 bg-black/55 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider z-10 backdrop-blur-sm">
                {f.badges.years}
              </span>
              {/* Bottom gradient + brand seal */}
              <div
                className="absolute inset-x-0 bottom-0 h-2/3"
                style={{
                  background:
                    "linear-gradient(transparent, rgba(0,37,87,0.85))",
                }}
              />
              {/* Brand initials seal (bottom-left, overlapping) */}
              <div className="absolute bottom-2 left-2 right-2 flex items-end gap-2 z-10">
                <div className="w-12 h-12 bg-paper border-2 border-white/90 rounded-sm flex items-center justify-center font-extrabold text-[16px] text-brand flex-shrink-0 shadow-md">
                  {f.initials}
                </div>
                <div className="flex-1 min-w-0 pb-0.5">
                  <b className="block text-[12.5px] font-semibold text-white leading-tight line-clamp-2 drop-shadow-md">
                    {f.name}
                  </b>
                </div>
              </div>
            </div>

            {/* === Content rows ====================================== */}
            <div className="p-3 max-md:p-2.5">
              <div className="flex items-center gap-1.5 text-[11.5px] text-mute mb-2">
                <span className="cn-flag" />
                <span className="truncate flex-1">{f.location}</span>
              </div>
              <div className="flex justify-between items-center text-[11.5px] mb-2.5 pb-2.5 border-b border-dashed border-line">
                <span>
                  <b className="text-accent">★ {f.rating}</b>{" "}
                  <span className="text-mute">({f.reviews} đánh giá)</span>
                </span>
                <span className="text-mute truncate ml-2">{f.meta}</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {f.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10.5px] bg-surface-1 text-mute px-2 py-0.5 rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
