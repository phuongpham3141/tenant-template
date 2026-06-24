import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { PARTNERS, type PartnerBrand } from "@/data/partners";
import { NAV_CATEGORIES } from "@/data/home";

export const metadata = {
  title: "供应商名录 — Huayuesc 华越供应链",
  description:
    "华越已审核的中越工厂与品牌名录：工厂位置、成立年份、规模、SKU数量，以及上市公司的股票代码。",
};

type View = "cards" | "table";

/**
 * /suppliers — supplier / factory directory.
 *
 * 2 display modes (chosen via URL `?view=cards|table`, default cards):
 *   • Cards — airy card grid, browse-first experience
 *   • Table — B2B data table, good for quick comparison
 *
 * Filter by industry via URL `?cat=<NAV_CATEGORIES.slug>`. Left sidebar keeps
 * 4 visual filter dimensions (Industry functional + 3 decorative dimensions
 * for a later phase).
 */
export default async function SuppliersPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; view?: string }>;
}) {
  const sp = await searchParams;
  const view: View = sp.view === "table" ? "table" : "cards";
  const activeCat = NAV_CATEGORIES.find((c) => c.slug === sp.cat);
  const list = activeCat
    ? PARTNERS.filter((p) => p.category === activeCat.slug)
    : PARTNERS;

  const trail = [
    { label: "首页", href: "/" },
    { label: "供应商" },
  ];

  const totalSku = list.reduce((n, p) => n + p.products.length, 0);
  const listed = list.filter((p) => p.listed).length;

  return (
    <>
      <Breadcrumb trail={trail} />

      {/* ── Hero + view toggle ─────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 mt-4 max-md:px-3">
        <div className="bg-paper border border-line rounded p-5 flex justify-between items-end max-md:flex-col max-md:items-start max-md:gap-3">
          <div>
            <h1 className="text-[24px] font-extrabold text-ink leading-tight">
              {PARTNERS.length}+ 家已审核工厂
            </h1>
            <p className="text-[13px] text-mute mt-1">
              华越上的所有工厂均由广州团队每年实地验厂2次。
            </p>
            <div className="flex gap-4 mt-3 text-[12px] text-mute flex-wrap">
              <span>
                📦 <b className="text-brand">{totalSku}+</b> 个SKU
              </span>
              <span>
                ✓ <b className="text-brand">{listed}</b> 家已上市
              </span>
              <span>
                🏭 <b className="text-brand">{NAV_CATEGORIES.length}</b> 个行业
              </span>
            </div>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[12px] text-mute font-semibold">
              显示方式：
            </span>
            <div className="inline-flex rounded-sm border border-line overflow-hidden">
              <ViewToggle
                view="cards"
                active={view === "cards"}
                cat={sp.cat}
                icon="🟦"
                label="卡片"
              />
              <ViewToggle
                view="table"
                active={view === "table"}
                cat={sp.cat}
                icon="📋"
                label="表格"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Sidebar + Content ──────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 mt-4 max-md:px-3 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1 mb-12">
        {/* Sidebar — Industry = functional, the other 3 dims are visual */}
        <aside className="bg-paper border border-line rounded p-4 self-start space-y-5 max-md:order-2">
          <div>
            <b className="block text-[13px] font-semibold text-ink mb-2">
              行业
            </b>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href={withView("/suppliers", view)}
                  className={
                    "flex items-center justify-between gap-2 text-[12.5px] py-1 px-1.5 rounded-sm " +
                    (!activeCat
                      ? "bg-brand/10 text-brand font-semibold"
                      : "text-ink hover:text-brand hover:bg-bg")
                  }
                >
                  <span className="flex items-center gap-1.5">
                    <span>📋</span>
                    <span>全部</span>
                  </span>
                  <span className="text-[11px] text-mute">
                    {PARTNERS.length}
                  </span>
                </Link>
              </li>
              {NAV_CATEGORIES.map((c) => {
                const n = PARTNERS.filter((p) => p.category === c.slug).length;
                const isActive = activeCat?.slug === c.slug;
                if (n === 0) {
                  return (
                    <li
                      key={c.slug}
                      className="flex items-center justify-between gap-2 text-[12.5px] text-mute2 py-1 px-1.5 opacity-60 cursor-not-allowed"
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{c.icon}</span>
                        <span>{c.name}</span>
                      </span>
                      <span className="text-[11px]">{n}</span>
                    </li>
                  );
                }
                return (
                  <li key={c.slug}>
                    <Link
                      href={withView(`/suppliers?cat=${c.slug}`, view)}
                      className={
                        "flex items-center justify-between gap-2 text-[12.5px] py-1 px-1.5 rounded-sm " +
                        (isActive
                          ? "bg-brand/10 text-brand font-semibold"
                          : "text-ink hover:text-brand hover:bg-bg")
                      }
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{c.icon}</span>
                        <span>{c.name}</span>
                      </span>
                      <span className="text-[11px] text-mute">{n}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Decorative filter dims — later phase */}
          <DecorFilter
            title="省/市"
            options={[
              "佛山",
              "广州",
              "杭州",
              "深圳",
              "福建",
              "上海",
            ]}
          />
          <DecorFilter
            title="规模（员工）"
            options={["< 100", "100 – 500", "500 – 2,000", "2,000+"]}
          />
          <DecorFilter
            title="成立年份"
            options={["< 10 年", "10–30年", "30–60年", "60+年"]}
          />
          <div className="text-[11px] text-mute2 italic">
            * 省份/规模/年份筛选将在下一阶段随目录扩充后启用。
          </div>
        </aside>

        {/* Main */}
        <div>
          <div className="text-[12px] text-mute mb-2 flex items-center justify-between">
            <span>
              显示 <b className="text-ink">{list.length}</b> /{" "}
              {PARTNERS.length} 家供应商
              {activeCat && (
                <span className="ml-1">
                  · 行业 <b className="text-ink">{activeCat.name}</b>
                </span>
              )}
            </span>
          </div>

          {list.length === 0 ? (
            <div className="bg-paper border border-line rounded p-10 text-center text-mute text-[13px]">
              该行业暂无供应商。欢迎稍后再来，或通过{" "}
              <a
                href="mailto:partnership@huayuesc.vn"
                className="text-brand font-semibold hover:underline"
              >
                partnership@huayuesc.vn
              </a>{" "}
              发送合作申请。
            </div>
          ) : view === "table" ? (
            <TableView list={list} />
          ) : (
            <CardsView list={list} />
          )}

          {/* Pending-sites notice hidden per request (Mijic / Gise-Gnm) */}

          {/* ── CTA ────────────────────────────────────────────────── */}
          <section className="mt-6 bg-brand text-white rounded-lg p-6 text-center max-md:p-5">
            <h2 className="text-[18px] font-bold mb-2">
              需要工厂审核 + DDP 至越南报价？
            </h2>
            <p className="text-[13px] opacity-90 mb-4">
              广州采购团队随时为您核验营业执照、认证，并在 24 小时内发送报价。
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                href="/buying-request"
                className="inline-flex items-center justify-center gap-2 bg-gold text-brand-dark font-bold rounded px-5 py-2.5 hover:bg-white hover:text-brand transition-colors text-[13px]"
              >
                📩 发送询价
              </Link>
              <Link
                href="/info/partners"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold rounded px-5 py-2.5 hover:bg-white/10 transition-colors text-[13px]"
              >
                🏭 品牌故事
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

/* ─── View Toggle ─────────────────────────────────────────────────── */

function ViewToggle({
  view,
  active,
  cat,
  icon,
  label,
}: {
  view: View;
  active: boolean;
  cat?: string;
  icon: string;
  label: string;
}) {
  const params = new URLSearchParams();
  if (cat) params.set("cat", cat);
  if (view === "table") params.set("view", "table");
  const qs = params.toString();
  const href = "/suppliers" + (qs ? `?${qs}` : "");
  return (
    <Link
      href={href}
      className={
        "px-3 py-1.5 text-[12.5px] inline-flex items-center gap-1.5 transition-colors " +
        (active
          ? "bg-brand text-white font-semibold"
          : "bg-paper text-mute hover:text-brand hover:bg-bg")
      }
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function withView(href: string, view: View): string {
  if (view !== "table") return href;
  return href.includes("?") ? `${href}&view=table` : `${href}?view=table`;
}

/* ─── Decorative sidebar filter (enabled in a later phase) ─────────── */

function DecorFilter({
  title,
  options,
}: {
  title: string;
  options: string[];
}) {
  return (
    <div>
      <b className="block text-[13px] font-semibold text-ink mb-2">{title}</b>
      <ul className="space-y-1.5">
        {options.map((o) => (
          <li
            key={o}
            className="flex items-center gap-2 text-[12.5px] text-mute opacity-70"
          >
            <input
              type="checkbox"
              className="accent-brand"
              disabled
              tabIndex={-1}
            />{" "}
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Cards view (default — restores original visual) ─────────────── */

function CardsView({ list }: { list: PartnerBrand[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1 max-[1100px]:grid-cols-2">
      {list.map((p) => (
        <SupplierCard key={p.slug} partner={p} />
      ))}
    </div>
  );
}

function SupplierCard({ partner }: { partner: PartnerBrand }) {
  const cat = categoryLabel(partner.category);
  const years = yearsBadge(partner.founded);
  const meta = factoryHeadline(partner);
  const tags = brandTags(partner);
  return (
    <Link
      href={`/info/partners/${partner.slug}`}
      className="border border-line rounded-sm p-3.5 bg-paper hover:border-brand hover:shadow-sm transition-all block group"
    >
      <div className="flex gap-3 items-start mb-3">
        <div className={`w-14 h-14 border rounded-sm flex items-center justify-center font-extrabold text-[18px] flex-shrink-0 overflow-hidden ${partner.logoBg === "dark" ? "bg-brand-dark border-brand-dark text-white" : "bg-paper border-line text-brand"}`}>
          {partner.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-w-full max-h-full object-contain p-1"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span>{initials(partner.name)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <b className="block text-[13px] font-semibold text-ink leading-tight mb-0.5 line-clamp-2 group-hover:text-brand">
            {partner.name}
          </b>
          <span className="text-[11.5px] text-mute flex items-center gap-1">
            <CnFlag />
            <span className="truncate">{partner.factory.location}</span>
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-1 mb-2.5 flex-wrap">
        {partner.listed && (
          <span className="bg-gold text-brand-dark text-[10px] px-1.5 py-0.5 rounded-sm font-bold">
            金牌
          </span>
        )}
        <span className="bg-success text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">
          已验厂
        </span>
        {years && (
          <span className="bg-brand text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">
            {years}
          </span>
        )}
      </div>

      {/* Metric row */}
      <div className="flex gap-3 text-[11.5px] text-mute mb-2.5 pb-2.5 border-b border-dashed border-line items-center">
        <span className="flex items-center gap-1">
          <span>📦</span>
          <b className="text-accent">{partner.products.length}</b> SKU
        </span>
        <span className="truncate flex-1">{meta}</span>
      </div>

      {/* Tags */}
      <div className="flex gap-1 flex-wrap">
        <span className="text-[10.5px] bg-bg text-ink px-2 py-0.5 rounded-sm inline-flex items-center gap-1 border border-line">
          <span>{cat.icon}</span>
          <span>{cat.name}</span>
        </span>
        {tags.map((t) => (
          <span
            key={t}
            className="text-[10.5px] bg-[#F5F5F5] text-mute px-2 py-0.5 rounded-sm"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}

function CnFlag() {
  // Simplified: emoji flag instead of the .cn-flag CSS class (not present in globals)
  return <span>🇨🇳</span>;
}

/* ─── Table view ──────────────────────────────────────────────────── */

function TableView({ list }: { list: PartnerBrand[] }) {
  return (
    <div className="bg-paper border border-line rounded overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-bg border-b border-line">
            <tr className="text-left text-mute text-[12px]">
              <th className="px-4 py-2.5 font-semibold">品牌</th>
              <th className="px-3 py-2.5 font-semibold">行业</th>
              <th className="px-3 py-2.5 font-semibold">工厂位置</th>
              <th className="px-3 py-2.5 font-semibold text-right">
                成立
              </th>
              <th className="px-3 py-2.5 font-semibold">规模 / 产能</th>
              <th className="px-3 py-2.5 font-semibold text-right">SKU</th>
              <th className="px-3 py-2.5 font-semibold">上市</th>
              <th className="px-3 py-2.5 font-semibold text-right">详情</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <SupplierRow key={p.slug} partner={p} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden divide-y divide-line">
        {list.map((p) => (
          <SupplierMobileRow key={p.slug} partner={p} />
        ))}
      </div>
    </div>
  );
}

function SupplierRow({ partner }: { partner: PartnerBrand }) {
  const cat = categoryLabel(partner.category);
  return (
    <tr className="border-b border-line/70 hover:bg-bg/50 transition-colors">
      <td className="px-4 py-3 align-top">
        <Link href={`/info/partners/${partner.slug}`} className="block group">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 flex-shrink-0 rounded border flex items-center justify-center overflow-hidden font-bold text-[11px] ${partner.logoBg === "dark" ? "bg-brand-dark border-brand-dark text-white" : "bg-bg border-line text-brand"}`}>
              {partner.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span>{initials(partner.name)}</span>
              )}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-ink group-hover:text-brand leading-tight">
                {partner.name}
              </div>
              <div className="text-[11.5px] text-mute2 truncate max-w-[200px]">
                {partner.nameOriginal}
              </div>
            </div>
          </div>
        </Link>
      </td>
      <td className="px-3 py-3 align-top text-[12.5px] whitespace-nowrap">
        <span className="inline-flex items-center gap-1 bg-bg rounded-full px-2 py-0.5 border border-line">
          <span>{cat.icon}</span>
          <span className="text-ink">{cat.name}</span>
        </span>
      </td>
      <td className="px-3 py-3 align-top text-[12.5px] text-ink max-w-[260px]">
        {partner.factory.location}
      </td>
      <td className="px-3 py-3 align-top text-[12.5px] text-ink text-right whitespace-nowrap">
        {partner.founded ?? "—"}
      </td>
      <td className="px-3 py-3 align-top text-[12px] text-ink/85 max-w-[260px]">
        {factoryScale(partner)}
      </td>
      <td className="px-3 py-3 align-top text-[12.5px] text-ink text-right whitespace-nowrap">
        <span className="inline-flex items-center gap-1 font-semibold">
          📦 {partner.products.length}
        </span>
      </td>
      <td className="px-3 py-3 align-top text-[12px] whitespace-nowrap">
        {partner.listed ? (
          <span className="inline-flex items-center gap-1 bg-[#ECFDF5] text-[#065F46] rounded px-2 py-0.5 font-semibold">
            ✓ {partner.listed}
          </span>
        ) : (
          <span className="text-mute2">—</span>
        )}
      </td>
      <td className="px-3 py-3 align-top text-right whitespace-nowrap">
        <Link
          href={`/info/partners/${partner.slug}`}
          className="inline-flex items-center gap-1 text-brand font-semibold text-[12.5px] hover:underline"
        >
          查看 →
        </Link>
      </td>
    </tr>
  );
}

function SupplierMobileRow({ partner }: { partner: PartnerBrand }) {
  const cat = categoryLabel(partner.category);
  return (
    <Link
      href={`/info/partners/${partner.slug}`}
      className="block p-4 hover:bg-bg/50 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 flex-shrink-0 rounded border flex items-center justify-center overflow-hidden font-bold ${partner.logoBg === "dark" ? "bg-brand-dark border-brand-dark text-white" : "bg-bg border-line text-brand"}`}>
          {partner.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-w-full max-h-full object-contain p-0.5"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span>{initials(partner.name)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-bold text-ink leading-tight mb-0.5">
            {partner.name}
          </div>
          <div className="text-[11.5px] text-mute2 mb-2">
            {partner.nameOriginal}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11.5px] text-ink/85">
            <span>
              {cat.icon} {cat.name}
            </span>
            <span>📍 {partner.factory.location.split(",")[0]}</span>
            {partner.founded && <span>🗓 {partner.founded}</span>}
            <span>📦 {partner.products.length} SKU</span>
            {partner.listed && (
              <span className="text-[#065F46] font-semibold">
                ✓ {partner.listed}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────── */

function categoryLabel(slug: PartnerBrand["category"]): {
  icon: string;
  name: string;
} {
  const c = NAV_CATEGORIES.find((x) => x.slug === slug);
  return { icon: c?.icon ?? "📦", name: c?.name ?? slug };
}

/** 1-2 character initials from brand name (ignoring parentheses). */
function initials(name: string): string {
  // Strip parenthetical part — "Bối Lãng (BRAVAT)" → "Bối Lãng"
  const clean = name.replace(/\s*\([^)]*\)\s*/g, " ").trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/** Compute "X年" from founded (year only). Handles content like "1958" or "1995 (CareLighting brand)". */
function yearsBadge(founded?: string): string | null {
  if (!founded) return null;
  const m = founded.match(/(\d{4})/);
  if (!m) return null;
  const year = parseInt(m[1], 10);
  // Snapshot of the current year from page data (server-side stable — avoid
  // Date.now() to prevent hydration mismatch if run on an edge in another zone).
  const NOW = 2026;
  const diff = NOW - year;
  if (diff <= 0) return null;
  return `${diff} 年`;
}

/** Short metric line (capacity > area > facilities > founded year). */
function factoryHeadline(p: PartnerBrand): string {
  const f = p.factory;
  if (f.capacity) return f.capacity;
  if (f.area) return f.area;
  if (f.employees) return f.employees;
  if (f.facilities) {
    return f.facilities.length > 50
      ? f.facilities.slice(0, 50) + "…"
      : f.facilities;
  }
  if (p.founded) return `成立于 ${p.founded}`;
  return p.factory.location.split(",")[0];
}

/** Full scale string for the table cell. */
function factoryScale(p: PartnerBrand): string {
  const f = p.factory;
  const parts: string[] = [];
  if (f.area) parts.push(f.area);
  if (f.capacity) parts.push(f.capacity);
  if (f.employees) parts.push(f.employees);
  if (parts.length === 0 && f.facilities) {
    return f.facilities.length > 80
      ? f.facilities.slice(0, 80) + "…"
      : f.facilities;
  }
  return parts.join(" · ") || "—";
}

/** 2 tags from the products list (favor the first SKU — concise). */
function brandTags(p: PartnerBrand): string[] {
  return p.products
    .slice(0, 2)
    .map((pr) => {
      // Take the part before "—" or "·" to keep it concise
      const n = pr.name.split(/[—·\-(]/)[0].trim();
      return n.length > 22 ? n.slice(0, 22) + "…" : n;
    })
    .filter(Boolean);
}
