import Link from "next/link";
import { PARTNERS, type PartnerBrand } from "@/data/partners";

/**
 * 合作工厂 — 首页精选的 9 个品牌。
 *
 * 每张卡片使用品牌专属横幅图：优先采用品牌官方 CDN
 * (Midea / LINVOL / Bravat / KITO / FSL / Toshiba)，而非通用的
 * Unsplash 图片。对于 3 个暂无可热链 hero 图的品牌
 * (TTLock / Teka / 3TREES) → 使用主题化 Unsplash + 品牌 logo 叠加
 * 以保持品牌辨识度。
 *
 * 卡片数据（名称、工厂位置、SKU 数、上市状态、成立年份）直接
 * 取自 PARTNERS — single source of truth。
 */

/** 首页精选的 9 个品牌 slug，每个行业 1+ 个品牌。 */
const FEATURED_SLUGS = [
  "midea", // ⚡ electrical — 全球顶级品牌
  "toshiba-elevator", // 🏠 home-garden — 日本高端
  "linvol", // 🛋 noi-that — 美的电梯
  "bravat", // 🚿 bathroom-sanitary — 德国百年品牌
  "kito", // 🧱 construction — 陶瓷砖
  "3trees", // 🧱 construction — 上交所上市涂料
  "fsl", // 💡 lighting — 1958 年传承
  "teka", // 🍳 kitchen — 西班牙欧洲品牌
  "ttlock", // 🪟 doors-windows — 智能门锁
] as const;

/** 各品牌横幅图（16:9 比例）。 */
const BRAND_BANNER: Record<string, string> = {
  midea:
    "https://cn-res.midea.com/content/dam/mideacn-aem/%E7%BE%8E%E7%9A%84%E4%B8%9A%E5%8A%A1/%E6%99%BA%E8%83%BD%E5%AE%B6%E5%B1%85/%E7%BE%8E%E7%9A%84/%E7%BE%8E%E7%9A%841.png",
  "toshiba-elevator":
    "https://www.toshiba-elevator.com.cn/upload/2023/12-11/14-59-580999930083743.jpg",
  linvol:
    "https://static-btri.midea.com/btri-apaas-files/3d7a8f2d-4ff8-4615-9e80-732999e4d325@btri-apaas@%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2025-12-15_172059_812(1).jpg",
  bravat:
    "https://www.bravat.com.cn/ftp/fj/SYS26012718003945710X@26_1113132.jpg",
  kito: "https://kito.cn/img/img45.708220b9.png",
  fsl: "https://www.chinafsl.com/static/img/banner.jpg",
  // 3 个品牌回退至主题化 Unsplash — 品牌专属横幅暂不可热链
  "3trees":
    "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=640&h=360&fit=crop&auto=format&q=75",
  teka: "https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=640&h=360&fit=crop&auto=format&q=75",
  ttlock:
    "https://images.unsplash.com/photo-1581092446327-9b52bd1570c2?w=640&h=360&fit=crop&auto=format&q=75",
};

const FALLBACK_BANNER =
  "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=640&h=360&fit=crop&auto=format&q=75";

function bannerUrl(slug: string) {
  return BRAND_BANNER[slug] ?? FALLBACK_BANNER;
}

/** 从品牌名取 1-2 个字母缩写（跳过括号内内容）。 */
function initials(name: string): string {
  const clean = name.replace(/\s*\([^)]*\)\s*/g, " ").trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/** 由成立年份计算 "X年"（快照 NOW = 2026，保证 SSR 稳定）。 */
function yearsBadge(founded?: string): string | null {
  if (!founded) return null;
  const m = founded.match(/(\d{4})/);
  if (!m) return null;
  const diff = 2026 - parseInt(m[1], 10);
  return diff > 0 ? `${diff} 年` : null;
}

/** 简短指标行（产能 > 面积 > 员工 > 设施）。 */
function factoryMeta(p: PartnerBrand): string {
  const f = p.factory;
  if (f.capacity) return f.capacity;
  if (f.area) return f.area;
  if (f.employees) return f.employees;
  if (f.facilities) {
    return f.facilities.length > 35
      ? f.facilities.slice(0, 35) + "…"
      : f.facilities;
  }
  return "—";
}

/** 从前几个产品取 2 个标签（清理后）。 */
function brandTags(p: PartnerBrand): string[] {
  return p.products
    .slice(0, 2)
    .map((pr) => {
      const n = pr.name.split(/[—·\-(]/)[0].trim();
      return n.length > 18 ? n.slice(0, 18) + "…" : n;
    })
    .filter(Boolean);
}

export function Factories() {
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
          合作工厂
        </h2>
        <div className="flex gap-3.5 text-[12.5px] text-mute max-md:flex-wrap max-md:gap-2 max-md:text-[11.5px]">
          <span>
            <b className="text-ink">{PARTNERS.length}</b> 家已审核
          </span>
          <span>
            <b className="text-ink">{totalListed}</b> 家上市供应商
          </span>
          <span>
            <b className="text-ink">100%</b> 完成实地验厂
          </span>
        </div>
        <Link
          href="/suppliers"
          className="text-brand text-[12.5px] flex items-center gap-1 cursor-pointer max-md:self-end max-md:text-[11.5px]"
        >
          查看全部工厂 →
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
              <div className="relative aspect-[16/9] overflow-hidden bg-[#0E2A33]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bannerUrl(p.slug)}
                  alt={p.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-90 group-hover/fact:opacity-100 group-hover/fact:scale-[1.03] transition-all duration-300"
                />
                {/* Top badges */}
                <div className="absolute top-2 left-2 flex gap-1 flex-wrap z-10">
                  {p.listed && (
                    <span className="bg-gold text-brand-dark text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider shadow-sm">
                      ⭐ 金牌
                    </span>
                  )}
                  <span className="bg-success text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider shadow-sm">
                    ✓ 已认证
                  </span>
                </div>
                {/* Years pill (right) */}
                {years && (
                  <span className="absolute top-2 right-2 bg-black/55 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider z-10 backdrop-blur-sm">
                    {years}
                  </span>
                )}
                {/* Bottom gradient */}
                <div
                  className="absolute inset-x-0 bottom-0 h-2/3 z-0"
                  style={{
                    background:
                      "linear-gradient(transparent, rgba(0,37,87,0.85))",
                  }}
                />
                {/* Brand seal (有 logo 则用 logo，否则回退为首字母) */}
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
                    {p.factory.location}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11.5px] mb-2.5 pb-2.5 border-b border-dashed border-line gap-2">
                  <span className="flex items-center gap-1">
                    <span>📦</span>
                    <b className="text-accent">{p.products.length}</b>{" "}
                    <span className="text-mute">SKU</span>
                  </span>
                  <span className="text-mute truncate ml-2 text-right">
                    {factoryMeta(p)}
                  </span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {brandTags(p).map((t) => (
                    <span
                      key={t}
                      className="text-[10.5px] bg-[#F5F5F5] text-mute px-2 py-0.5 rounded-sm"
                    >
                      {t}
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
