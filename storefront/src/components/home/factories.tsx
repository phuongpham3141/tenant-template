import Link from "@/components/i18n-link";
import { PARTNERS, type PartnerBrand } from "@/data/partners";
import { getT } from "@/lib/t";
import { getTd } from "@/lib/td";

/**
 * Partner factories — 9 curated brands on the homepage.
 *
 * Each card uses a brand-specific banner image: prefer the brand's official
 * CDN (Midea / LINVOL / Bravat / KITO / FSL / Toshiba) over generic
 * Unsplash. For the 3 brands without a hot-linkable hero image
 * (TTLock / Teka / 3TREES) → use a thematic Unsplash image + brand logo
 * overlay to preserve recognizability.
 *
 * Card data (name, factory location, SKU count, listing, founding year) is
 * pulled straight from PARTNERS — single source of truth.
 */

/** 9 curated brand slugs for the homepage, 1+ brand per industry. */
const FEATURED_SLUGS = [
  "midea", // ⚡ electrical — top global brand
  "toshiba-elevator", // 🏠 home-garden — premium Japanese
  "linvol", // 🛋 noi-that — Midea elevators
  "bravat", // 🚿 bathroom-sanitary — German, 100 years
  "kito", // 🧱 construction — ceramic tile
  "3trees", // 🧱 construction — SSE-listed paint
  "fsl", // 💡 lighting — 1958 heritage
  "teka", // 🍳 kitchen — Spanish, European
  "ttlock", // 🪟 doors-windows — smart locks
] as const;

/** Banner image for each brand (16:9 ratio). */
const BRAND_BANNER: Record<string, string> = {
  midea: "/img/factory-midea.jpg?v=3",
  "toshiba-elevator": "/img/factory-toshiba-elevator.jpg?v=3",
  linvol: "/img/factory-linvol.jpg?v=3",
  bravat: "/img/factory-bravat.jpg?v=3",
  kito: "/img/factory-kito.jpg?v=3",
  fsl: "/img/factory-fsl.jpg?v=3",
  "3trees": "/img/factory-3trees.jpg?v=3",
  teka: "/img/factory-teka.jpg?v=3",
  ttlock: "/img/factory-ttlock.jpg?v=3",
};

const FALLBACK_BANNER = "/img/factory-fallback.jpg?v=6";

function bannerUrl(slug: string) {
  return BRAND_BANNER[slug] ?? FALLBACK_BANNER;
}

/** 1-2 character initials from the brand name (skip content in parentheses). */
function initials(name: string): string {
  const clean = name.replace(/\s*\([^)]*\)\s*/g, " ").trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/** "X yrs" from founded year (snapshot NOW = 2026 for stable SSR). */
function yearsBadge(founded?: string): string | null {
  if (!founded) return null;
  const m = founded.match(/(\d{4})/);
  if (!m) return null;
  const diff = 2026 - parseInt(m[1], 10);
  return diff > 0 ? String(diff) : null;
}

/** Short metric line (capacity > area > employees > facilities). */
function factoryMeta(p: PartnerBrand): string {
  const f = p.factory;
  if (f.capacity) return f.capacity;
  if (f.area) return f.area;
  if (f.employees) return f.employees;
  if (f.facilities) {
    return f.facilities;
  }
  return "—";
}

/** 2 tag chips from the first products (cleanly trimmed). */
function brandTags(p: PartnerBrand): string[] {
  return p.products
    .slice(0, 2)
    .map((pr) => {
      return pr.name;
    })
    .filter(Boolean);
}

export async function Factories() {
  const t = await getT();
  const td = await getTd();
  const featured = FEATURED_SLUGS.map((slug) =>
    PARTNERS.find((p) => p.slug === slug)
  ).filter((p): p is PartnerBrand => Boolean(p));

  const totalListed = PARTNERS.filter((p) => p.listed).length;

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-5 max-md:px-3 max-md:mt-3">
      {/* === Header bar ============================================ */}
      <div className="bg-paper px-5 py-3.5 flex justify-between items-center border-t-[3px] border-accent rounded-t border-l border-r border-line max-md:flex-col max-md:items-stretch max-md:gap-2 max-md:px-3 max-md:py-2.5">
        <h2 className="text-[18px] font-bold text-ink flex items-center gap-2.5 max-md:text-[15px]">
          <span className="w-7 h-7 bg-accent text-white rounded-sm flex items-center justify-center font-bold max-md:w-6 max-md:h-6 max-md:text-[12px]">
            🏭
          </span>
          {t("factories.title")}
        </h2>
        <div className="flex gap-3.5 text-[12.5px] text-mute max-md:flex-wrap max-md:gap-2 max-md:text-[11.5px]">
          <span>
            <b className="text-ink">{PARTNERS.length}</b> {t("factories.partners")}
          </span>
          <span>
            <b className="text-ink">{totalListed}</b> {t("factories.partnersListed")}
          </span>
          <span>
            <b className="text-ink">100%</b> {t("factories.factoryInspected")}
          </span>
        </div>
        <Link
          href="/suppliers"
          className="text-brand text-[12.5px] flex items-center gap-1 cursor-pointer max-md:self-end max-md:text-[11.5px]"
        >
          {t("factories.viewAll")}
        </Link>
      </div>

      {/* === Factory cards grid ==================================== */}
      <div className="bg-paper rounded-b border-l border-r border-b border-line p-4 grid grid-cols-3 gap-3 md:max-xl:gap-2.5 max-md:grid-cols-1 max-md:p-2.5 max-md:gap-2">
        {featured.map((p) => {
          const years = yearsBadge(p.founded);
          return (
            <Link
              key={p.slug}
              href={`/info/partners/${p.slug}`}
              className="border border-line rounded-sm overflow-hidden transition cursor-pointer hover:border-brand hover:shadow-[0_4px_10px_rgba(0,60,143,0.1)] block group/fact"
            >
              {/* === Banner ========================================== */}
              <div className="relative aspect-[3/2] overflow-hidden bg-[#0E2A33]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bannerUrl(p.slug)}
                  alt={p.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover/fact:scale-[1.03] transition-all duration-300"
                />
                {/* Top badges */}
                <div className="absolute top-2 left-2 flex gap-1 flex-wrap z-10">
                  <span className="bg-gradient-to-r from-[#A5F3FC] to-[#38BDF8] text-brand-dark text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider shadow-sm">
                    {t("factories.diamond")}
                  </span>
                  <span className="bg-success text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider shadow-sm">
                    {t("factories.partnerBadge")}
                  </span>
                </div>
                {/* Years pill (right) */}
                {years && (
                  <span className="absolute top-2 right-2 bg-black/55 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider z-10 backdrop-blur-sm">
                    {years} {t("factories.yrs")}
                  </span>
                )}
                {/* Bottom gradient */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 z-0"
                  style={{
                    background:
                      "linear-gradient(transparent, rgba(0,22,52,0.78))",
                  }}
                />
                {/* Brand seal (logo if available, fallback to initials) */}
                <div className="absolute bottom-2 left-2 right-2 flex items-end gap-2 z-10">
                  <div className={`w-12 h-12 border-2 rounded-sm flex items-center justify-center font-extrabold text-[16px] flex-shrink-0 shadow-md overflow-hidden p-1 ${p.logoBg === "dark" ? "bg-brand-dark border-white/90 text-white" : "bg-paper border-white/90 text-brand"}`}>
                    {p.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.logo}
                        alt={p.name}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span>{initials(p.name)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pb-0.5">
                    <b className="block text-[12.5px] font-semibold text-white leading-tight line-clamp-2 drop-shadow-md">
                      {p.name}
                    </b>
                  </div>
                </div>
              </div>

              {/* === Content ========================================= */}
              <div className="p-3 max-md:p-2.5">
                <div className="flex items-center gap-1.5 text-[11.5px] text-mute mb-2">
                  <span>🇨🇳</span>
                  <span className="truncate flex-1">
                    {td(p.factory.location)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11.5px] mb-2.5 pb-2.5 border-b border-dashed border-line gap-2">
                  <span className="flex items-center gap-1">
                    <span>📦</span>
                    <b className="text-accent">{p.products.length}</b>{" "}
                    <span className="text-mute">SKU</span>
                  </span>
                  <span className="text-mute truncate ml-2 text-right">
                    {td(factoryMeta(p))}
                  </span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {brandTags(p).map((tag, ti) => (
                    <span
                      key={`${p.slug}-${ti}`}
                      className="text-[10.5px] bg-[#F5F5F5] text-mute px-2 py-0.5 rounded-sm"
                    >
                      {td(tag)}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
