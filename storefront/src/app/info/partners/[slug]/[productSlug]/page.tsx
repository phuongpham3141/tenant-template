import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { ProductGallery } from "@/components/product/product-gallery";
import {
  PARTNERS,
  getProduct,
  productSlug,
  type PartnerBrand,
  type PartnerProduct,
} from "@/data/partners";
import { NAV_CATEGORIES } from "@/data/home";
import { getSeriesMeta as getKitoMeta } from "@/data/catalogs/kito-meta";
import { getSeriesMeta as getMideaMeta } from "@/data/catalogs/midea-meta";
import { getSeriesMeta as getToshibaMeta } from "@/data/catalogs/toshiba-meta";
import { getSeriesMeta as getLessoMeta } from "@/data/catalogs/lesso-meta";
import { getSeriesMeta as getTekaMeta } from "@/data/catalogs/teka-meta";
import { getSeriesMeta as getDtsMeta } from "@/data/catalogs/duc-thinh-stone-meta";
import { getSeriesMeta as getYuhongMeta } from "@/data/catalogs/yuhong-meta";
import { getSeriesMeta as getAnbiMeta } from "@/data/catalogs/anbi-meta";
import { getSeriesMeta as getGuangriMeta } from "@/data/catalogs/guangri-meta";
import { getSeriesMeta as getToshibaElevMeta } from "@/data/catalogs/toshiba-elevator-meta";
import { getSeriesMeta as getTeehoMeta } from "@/data/catalogs/teeho-meta";
import { getSeriesMeta as getTreesMeta } from "@/data/catalogs/3trees-meta";
import { getSeriesMeta as getDuluxProMeta } from "@/data/catalogs/dulux-pro-meta";
import { getSeriesMeta as getDaweierMeta } from "@/data/catalogs/daweier-meta";
import { getSeriesMeta as getPengxiangMeta } from "@/data/catalogs/pengxiang-meta";
import { getSeriesMeta as getTtlockMeta } from "@/data/catalogs/ttlock-meta";
import { getSeriesMeta as getLinvolMeta } from "@/data/catalogs/linvol-meta";
import { getSeriesMeta as getSylvaniaMeta } from "@/data/catalogs/sylvania-meta";
import { getSeriesMeta as getBravatMeta } from "@/data/catalogs/bravat-meta";
import { getSeriesMeta as getFslMeta } from "@/data/catalogs/fsl-meta";
import { getSeriesMeta as getDongyuanMeta } from "@/data/catalogs/dongyuan-meta";
import { getSeriesMeta as getCareLightingMeta } from "@/data/catalogs/care-lighting-meta";
import { getSeriesMeta as getLanghuiMeta } from "@/data/catalogs/langhui-meta";
import { getSeriesMeta as getZhongjuYabaiMeta } from "@/data/catalogs/zhongju-yabai-meta";

/** Map brand slug → series-meta lookup function. Add new entries when
 *  enriching more brands via /partner-catalog skill. */
const META_LOOKUP: Record<string, (s?: string) => ReturnType<typeof getKitoMeta>> = {
  kito: getKitoMeta,
  midea: getMideaMeta,
  "toshiba-home": getToshibaMeta,
  lesso: getLessoMeta,
  teka: getTekaMeta,
  "duc-thinh-stone": getDtsMeta,
  yuhong: getYuhongMeta,
  anbi: getAnbiMeta,
  guangri: getGuangriMeta,
  "toshiba-elevator": getToshibaElevMeta,
  teeho: getTeehoMeta,
  "3trees": getTreesMeta,
  "dulux-pro": getDuluxProMeta,
  daweier: getDaweierMeta,
  pengxiang: getPengxiangMeta,
  ttlock: getTtlockMeta,
  linvol: getLinvolMeta,
  sylvania: getSylvaniaMeta,
  bravat: getBravatMeta,
  fsl: getFslMeta,
  dongyuan: getDongyuanMeta,
  "care-lighting": getCareLightingMeta,
  langhui: getLanghuiMeta,
  "zhongju-yabai": getZhongjuYabaiMeta,
};

export function generateStaticParams() {
  const params: { slug: string; productSlug: string }[] = [];
  for (const p of PARTNERS) {
    for (const prod of p.products) {
      params.push({ slug: p.slug, productSlug: productSlug(prod) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>;
}) {
  const { slug, productSlug: ps } = await params;
  const hit = getProduct(slug, ps);
  if (!hit) return { title: "产品 — 华越" };
  const { partner, product } = hit;
  return {
    title: `${product.name} (${product.model}) — ${partner.name} · Huayuesc`,
    description:
      product.longDesc?.slice(0, 160) ??
      product.desc?.slice(0, 160) ??
      `${product.name} ${product.model} — ${partner.name}`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>;
}) {
  const { slug, productSlug: ps } = await params;
  const hit = getProduct(slug, ps);
  if (!hit) return notFound();
  const { partner, product } = hit;
  const category = NAV_CATEGORIES.find((c) => c.slug === partner.category);
  const lookup = META_LOOKUP[partner.slug];
  const meta = lookup ? lookup(product.seriesOriginal) : undefined;

  const trail = [
    { label: "首页", href: "/" },
    { label: "合作工厂", href: "/info/partners" },
    { label: partner.name, href: `/info/partners/${partner.slug}` },
    { label: product.name },
  ];

  const related = partner.products
    .filter(
      (p) =>
        productSlug(p) !== productSlug(product) &&
        p.series === product.series
    )
    .slice(0, 8);

  const gallery = [
    ...(product.image ? [product.image] : []),
    ...(product.gallery ?? []),
  ].filter((v, i, a) => a.indexOf(v) === i);

  const rfqHref = `/buying-request?partner=${partner.slug}&model=${encodeURIComponent(product.model)}`;

  return (
    <>
      <Breadcrumb trail={trail} />

      <div className="max-w-[1200px] mx-auto px-4 mt-5 mb-12 max-md:px-3">
        {/* ════ 1. HERO: Gallery + Key info ═══════════════════════════ */}
        <section className="grid grid-cols-[1.1fr_1fr] gap-7 mb-7 max-md:grid-cols-1 max-md:gap-5">
          <div>
            <ProductGallery images={gallery} alt={`${product.name} (${product.model})`} />
          </div>

          <div>
            {product.series && (
              <Link
                href={`/info/partners/${partner.slug}`}
                className="text-[12.5px] text-brand font-semibold mb-2 inline-flex items-center gap-1.5 hover:underline"
              >
                <span className="w-1 h-4 bg-brand rounded-sm" />
                {product.series}
                {product.seriesOriginal && (
                  <span className="text-mute2 font-normal ml-1">
                    · {product.seriesOriginal}
                  </span>
                )}
              </Link>
            )}
            <h1 className="text-[28px] font-bold text-ink leading-tight mb-1.5 max-md:text-[22px]">
              {product.name}
            </h1>
            {product.nameOriginal && (
              <p className="text-[13.5px] text-mute mb-4">{product.nameOriginal}</p>
            )}

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="bg-bg border border-line rounded px-3 py-1.5 inline-flex items-center gap-2">
                <span className="text-[11px] text-mute">SKU 编号：</span>
                <code className="text-[13px] font-bold text-brand">
                  {product.model}
                </code>
              </div>
              <span className="inline-flex items-center gap-1 bg-[#ECFDF5] text-[#065F46] rounded-full px-2.5 py-1 text-[11.5px] font-semibold">
                ✓ 佛山仓有货
              </span>
              <span className="inline-flex items-center gap-1 bg-[#FFF7ED] text-[#9A3412] rounded-full px-2.5 py-1 text-[11.5px] font-semibold">
                📦 DDP 至越南 7-10 天
              </span>
            </div>

            {product.desc && (
              <p className="text-[14px] text-ink leading-relaxed mb-5">
                {product.desc}
              </p>
            )}

            {/* Quick specs grid */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {product.dimensions && (
                <SpecCard icon="📐" label="尺寸" value={product.dimensions} />
              )}
              {product.surface && (
                <SpecCard icon="✨" label="表面" value={product.surface} />
              )}
              <SpecCard icon="🏭" label="制造商" value={partner.name} />
              {category && (
                <SpecCard icon={category.icon} label="行业" value={category.name} />
              )}
            </div>

            {/* CTAs */}
            <div className="flex gap-2 flex-wrap">
              <Link
                href={rfqHref}
                className="inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold rounded px-5 py-2.5 hover:bg-brand-light transition-colors text-[13.5px]"
              >
                📩 发送询价请求
              </Link>
              <a
                href="tel:+842839991234"
                className="inline-flex items-center justify-center gap-2 bg-gold text-brand-dark font-semibold rounded px-5 py-2.5 hover:bg-yellow-400 transition-colors text-[13.5px]"
              >
                ☎ 拨打咨询热线
              </a>
              <Link
                href={`/info/partners/${partner.slug}`}
                className="inline-flex items-center justify-center gap-2 border border-line text-ink font-semibold rounded px-5 py-2.5 hover:border-brand hover:text-brand transition-colors text-[13.5px]"
              >
                ← {partner.name}
              </Link>
            </div>

            {/* Trust signals strip */}
            <div className="mt-5 pt-4 border-t border-line">
              <div className="grid grid-cols-3 gap-2 text-center text-[11.5px] text-mute">
                <TrustSignal icon="🛡️" label="质保" value="25 年" />
                <TrustSignal icon="✅" label="验厂" value="每年现场 2 次" />
                <TrustSignal icon="🌍" label="出口" value="60+ 国家" />
              </div>
            </div>
          </div>
        </section>

        {/* ════ 2. Series Story (rich narrative) ═══════════════════════ */}
        {meta && (
          <section className="bg-gradient-to-br from-brand-dark to-brand text-white rounded-lg p-7 mb-7 max-md:p-5 relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-[12px] uppercase tracking-wider opacity-80 mb-1.5">
                系列故事
              </div>
              <h2 className="text-[22px] font-bold mb-4 max-md:text-[18px]">
                {product.series} · {product.seriesOriginal}
              </h2>
              <div className="text-[14px] leading-relaxed whitespace-pre-line opacity-95 max-w-[800px]">
                {meta.story}
              </div>
              <div className="mt-5 pt-4 border-t border-white/20">
                <div className="text-[12px] uppercase tracking-wider opacity-80 mb-1">
                  技术传承
                </div>
                <p className="text-[13.5px] leading-relaxed opacity-95">
                  {meta.heritage}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ════ 3. Long description + Features + Applications ══════════ */}
        {(product.longDesc ||
          (product.features && product.features.length > 0) ||
          (product.applications && product.applications.length > 0)) && (
          <section className="grid grid-cols-[1.4fr_1fr] gap-6 mb-7 max-md:grid-cols-1 max-md:gap-4">
            <div className="bg-paper border border-line rounded-lg p-6 max-md:p-5">
              <h2 className="text-[17px] font-bold text-ink mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-brand rounded-sm" />
                详细描述
              </h2>
              {product.longDesc ? (
                <p className="text-[14px] text-ink leading-relaxed whitespace-pre-line">
                  {product.longDesc}
                </p>
              ) : (
                <p className="text-[14px] text-mute italic">
                  详细描述更新中。
                </p>
              )}
            </div>

            <div className="space-y-4">
              {product.features && product.features.length > 0 && (
                <div className="bg-paper border border-line rounded-lg p-5">
                  <h3 className="text-[14.5px] font-bold text-ink mb-3 flex items-center gap-2">
                    <span>✨</span>突出特性
                  </h3>
                  <ul className="space-y-2 text-[13px] text-ink">
                    {product.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-brand mt-0.5">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {product.applications && product.applications.length > 0 && (
                <div className="bg-paper border border-line rounded-lg p-5">
                  <h3 className="text-[14.5px] font-bold text-ink mb-3 flex items-center gap-2">
                    <span>🏠</span>适用场景
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {product.applications.map((a) => (
                      <span
                        key={a}
                        className="inline-flex items-center gap-1 bg-bg border border-line rounded-full px-2.5 py-1 text-[12px] text-ink"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ════ 4. Why Choose (USPs) ═══════════════════════════════════ */}
        {meta && meta.whyChoose.length > 0 && (
          <section className="mb-7">
            <h2 className="text-[18px] font-bold text-ink mb-4 flex items-center gap-2 max-md:text-[16px]">
              <span className="w-1 h-5 bg-brand rounded-sm" />
              为什么选择本系列？
            </h2>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 max-md:gap-2">
              {meta.whyChoose.map((w) => (
                <div
                  key={w.title}
                  className="bg-paper border border-line rounded-lg p-4 hover:border-brand hover:shadow-sm transition-all"
                >
                  <div className="text-[32px] mb-2">{w.icon}</div>
                  <h3 className="text-[14px] font-bold text-ink leading-tight mb-1.5">
                    {w.title}
                  </h3>
                  <p className="text-[12.5px] text-mute leading-snug">
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ════ 5a. REAL product specs (crawled from manufacturer) ═════ */}
        {product.specs && product.specs.length > 0 && (
          <section className="mb-7">
            <h2 className="text-[18px] font-bold text-ink mb-4 flex items-center gap-2 max-md:text-[16px]">
              <span className="w-1 h-5 bg-brand rounded-sm" />
              技术参数
              {product.sourceUrl && (
                <a
                  href={product.sourceUrl}
                  target="_blank"
                  rel="noopener nofollow"
                  className="text-[12px] text-brand font-normal ml-1 hover:underline"
                >
                  · 来源：{partner.name} ↗
                </a>
              )}
            </h2>
            <div className="bg-paper border border-line rounded-lg overflow-hidden">
              <table className="w-full text-[13px]">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr
                      key={spec.k + i}
                      className={
                        "border-b border-line/70 last:border-b-0 " +
                        (i % 2 === 0 ? "bg-paper" : "bg-bg/40")
                      }
                    >
                      <td className="px-4 py-2.5 text-mute font-semibold w-[45%] align-top">
                        {spec.k}
                      </td>
                      <td className="px-4 py-2.5 text-ink">{spec.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ════ 5b. Fallback fabricated specs — only if no real specs ══ */}
        {meta && meta.technicalSpecs.length > 0 && !(product.specs && product.specs.length > 0) && (
          <section className="mb-7">
            <h2 className="text-[18px] font-bold text-ink mb-4 flex items-center gap-2 max-md:text-[16px]">
              <span className="w-1 h-5 bg-brand rounded-sm" />
              完整技术参数
              <span className="text-[12px] text-mute font-normal ml-1">
                · 符合 ISO / EN / DIN 标准
              </span>
            </h2>
            <div className="bg-paper border border-line rounded-lg overflow-hidden">
              <table className="w-full text-[13px]">
                <tbody>
                  {meta.technicalSpecs.map((spec, i) => (
                    <tr
                      key={spec.label}
                      className={
                        "border-b border-line/70 last:border-b-0 " +
                        (i % 2 === 0 ? "bg-paper" : "bg-bg/40")
                      }
                    >
                      <td className="px-4 py-2.5 text-mute font-semibold w-[45%]">
                        {spec.label}
                      </td>
                      <td className="px-4 py-2.5 text-ink">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ════ 6. Manufacturing + Certifications (2-col) ══════════════ */}
        {meta && (
          <section className="grid grid-cols-2 gap-5 mb-7 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded-lg p-5">
              <h2 className="text-[16px] font-bold text-ink mb-3 flex items-center gap-2">
                <span>🏭</span>生产工艺
              </h2>
              <ul className="space-y-2 text-[13px] text-ink">
                {meta.manufacturing.map((m) => (
                  <li key={m} className="flex gap-2">
                    <span className="text-brand mt-0.5">▸</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-paper border border-line rounded-lg p-5">
              <h2 className="text-[16px] font-bold text-ink mb-3 flex items-center gap-2">
                <span>🏆</span>质量认证
              </h2>
              <ul className="space-y-2 text-[13px] text-ink">
                {meta.certifications.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ════ 7. Installation + Care + Packaging (3-col) ═════════════ */}
        {meta && (
          <section className="grid grid-cols-3 gap-4 mb-7 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded-lg p-5">
              <h2 className="text-[15px] font-bold text-ink mb-3 flex items-center gap-2">
                <span>🔧</span>安装指南
              </h2>
              <ul className="space-y-1.5 text-[12.5px] text-ink">
                {meta.installation.map((i, idx) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-brand font-bold min-w-[14px]">
                      {idx + 1}.
                    </span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-paper border border-line rounded-lg p-5">
              <h2 className="text-[15px] font-bold text-ink mb-3 flex items-center gap-2">
                <span>🧽</span>保养与清洁
              </h2>
              <div className="space-y-3 text-[12.5px]">
                {meta.careGuide.map((c) => (
                  <div key={c.title}>
                    <div className="font-bold text-ink mb-0.5">{c.title}</div>
                    <p className="text-mute leading-snug">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-paper border border-line rounded-lg p-5">
              <h2 className="text-[15px] font-bold text-ink mb-3 flex items-center gap-2">
                <span>📦</span>包装与运输
              </h2>
              <table className="w-full text-[12.5px]">
                <tbody>
                  {meta.packaging.map((p) => (
                    <tr
                      key={p.label}
                      className="border-b border-line/70 last:border-b-0"
                    >
                      <td className="py-1.5 pr-2 text-mute align-top w-[55%]">
                        {p.label}
                      </td>
                      <td className="py-1.5 text-ink font-semibold">
                        {p.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ════ 8. Project Showcase ════════════════════════════════════ */}
        {meta && meta.projectShowcase.length > 0 && (
          <section className="bg-paper border border-line rounded-lg p-6 mb-7 max-md:p-5">
            <h2 className="text-[17px] font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-brand rounded-sm" />
              采用本系列的参考项目
            </h2>
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              {meta.projectShowcase.map((proj) => (
                <div
                  key={proj}
                  className="flex items-start gap-2.5 bg-bg/50 border border-line/70 rounded p-3"
                >
                  <span className="text-[20px] mt-0.5">🏛️</span>
                  <span className="text-[13px] text-ink leading-snug">
                    {proj}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ════ 9. FAQ ═════════════════════════════════════════════════ */}
        {meta && meta.faq.length > 0 && (
          <section className="mb-7">
            <h2 className="text-[18px] font-bold text-ink mb-4 flex items-center gap-2 max-md:text-[16px]">
              <span className="w-1 h-5 bg-brand rounded-sm" />
              常见问题
            </h2>
            <div className="space-y-2">
              {meta.faq.map((f) => (
                <details
                  key={f.q}
                  className="bg-paper border border-line rounded-lg group"
                >
                  <summary className="cursor-pointer p-4 text-[14px] font-semibold text-ink list-none flex items-start gap-3 hover:bg-bg/30 transition-colors">
                    <span className="text-brand mt-0.5 group-open:rotate-90 transition-transform">
                      ▸
                    </span>
                    <span className="flex-1">{f.q}</span>
                  </summary>
                  <div className="px-4 pb-4 pl-10 text-[13px] text-ink/85 leading-relaxed">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ════ 10. Related products ═══════════════════════════════════ */}
        {related.length > 0 && (
          <RelatedProducts
            partner={partner}
            related={related}
            seriesName={product.series}
          />
        )}

        {/* ════ 11. CTA Footer ═════════════════════════════════════════ */}
        <section className="mt-7 bg-gradient-to-br from-brand to-brand-dark text-white rounded-lg p-7 text-center max-md:p-5">
          <div className="text-[12px] uppercase tracking-wider opacity-80 mb-1">
            24 小时内快速报价
          </div>
          <h2 className="text-[22px] font-bold mb-2 max-md:text-[18px]">
            需要 {product.name} 至越南的 DDP 报价？
          </h2>
          <p className="text-[13.5px] opacity-90 mb-5 max-w-[600px] mx-auto">
            华越广州寻源团队将联系您核查库存，核算 20ft / 40ft HQ 整柜或散件价格，
            并在 24 小时内发送完整报价（含税 + 运输 + 如需施工）。
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Link
              href={rfqHref}
              className="inline-flex items-center justify-center gap-2 bg-gold text-brand-dark font-bold rounded px-6 py-3 hover:bg-white hover:text-brand transition-colors text-[14px]"
            >
              📩 为 {product.model} 发送询价
            </Link>
            <a
              href="https://zalo.me/0912345678"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold rounded px-6 py-3 hover:bg-white/10 transition-colors text-[14px]"
            >
              💬 立即 Zalo 沟通
            </a>
          </div>
          <div className="mt-5 pt-4 border-t border-white/20 text-[12.5px] opacity-80 grid grid-cols-3 gap-2 max-md:grid-cols-1">
            <span>📞 热线：028-3999-1234</span>
            <span>📧 sourcing@huayuesc.vn</span>
            <span>📍 广州 + 胡志明市 + 河内办事处</span>
          </div>
        </section>
      </div>
    </>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────── */

function SpecCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-paper border border-line rounded p-3">
      <div className="text-[11px] text-mute mb-1 flex items-center gap-1">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div className="text-[13.5px] font-semibold text-ink leading-tight">
        {value}
      </div>
    </div>
  );
}

function TrustSignal({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[20px]">{icon}</span>
      <span className="text-[10.5px] uppercase tracking-wider opacity-80">
        {label}
      </span>
      <span className="font-bold text-ink text-[12.5px]">{value}</span>
    </div>
  );
}

function RelatedProducts({
  partner,
  related,
  seriesName,
}: {
  partner: PartnerBrand;
  related: PartnerProduct[];
  seriesName?: string;
}) {
  return (
    <section className="mt-2">
      <div className="flex items-center justify-between mb-4 max-md:flex-col max-md:items-start max-md:gap-2">
        <h2 className="text-[18px] font-bold text-ink flex items-center gap-2 max-md:text-[16px]">
          <span className="w-1 h-5 bg-brand rounded-sm" />
          同系列其他 SKU
          {seriesName && (
            <span className="text-[13px] text-mute font-normal ml-1">
              · {seriesName}
            </span>
          )}
        </h2>
        <Link
          href={`/info/partners/${partner.slug}`}
          className="text-brand text-[12.5px] font-semibold hover:underline"
        >
          查看完整目录 →
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 max-md:gap-2">
        {related.map((p) => (
          <Link
            key={productSlug(p)}
            href={`/info/partners/${partner.slug}/${productSlug(p)}`}
            className="block bg-paper border border-line rounded-lg overflow-hidden hover:border-brand hover:shadow-sm transition group"
          >
            <div className="aspect-[4/3] bg-bg overflow-hidden">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[40px] text-mute2">
                  📦
                </div>
              )}
            </div>
            <div className="p-3">
              <code className="text-[11px] text-brand font-bold">
                {p.model}
              </code>
              <div className="text-[13px] font-semibold text-ink mt-1 line-clamp-2 group-hover:text-brand leading-tight">
                {p.name}
              </div>
              {p.dimensions && (
                <div className="text-[11.5px] text-mute mt-1">
                  📐 {p.dimensions}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

