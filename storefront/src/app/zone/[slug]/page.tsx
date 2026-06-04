import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { ZONES, FACTORIES, SECTIONS } from "@/data/home";
import type { Zone } from "@/data/home";

function getZone(slug: string): Zone {
  return (
    ZONES.find((z) => z.slug === slug) ?? {
      slug,
      name: slug.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" "),
      count: "100+ factories",
      image: `/img/${slug}.jpg?v=5`,
    }
  );
}

const TRADE_SHOWS = [
  { name: "Canton Fair Phase 1", date: "15 - 20 Apr 2026", venue: "Guangzhou Pazhou", industry: "General" },
  { name: "Foshan Ceramics Expo", date: "5 - 8 Jun 2026", venue: "Foshan Tanzhou", industry: "Tiles" },
  { name: "China Furniture Fair", date: "18 - 22 Sep 2026", venue: "Guangzhou PWTC", industry: "Furniture" },
  { name: "Bauma China", date: "12 - 16 Oct 2026", venue: "Shanghai SNIEC", industry: "Building Materials" },
];

export default async function ZonePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const z = getZone(slug);
  const clusterFactories = FACTORIES.slice(0, 6);
  const products = SECTIONS.flatMap((s) => s.products).slice(0, 8);

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Trading Zones", href: "/zones" },
          { label: z.name },
        ]}
      />

      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[280px] bg-brand-dark">
          {z.image ? <img src={z.image} alt={z.name} className="w-full h-full object-cover opacity-65" /> : null}
          <div className="absolute inset-0 px-8 py-7 flex flex-col justify-end text-white" style={{ background: "linear-gradient(transparent 30%, rgba(0,37,87,0.95))" }}>
            <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📍 TRADING ZONE</span>
            <h1 className="text-[32px] font-extrabold leading-tight max-md:text-[24px]">{z.name} Industrial Cluster</h1>
            <p className="text-[13px] opacity-90 max-w-[600px] mt-2">{z.count} specializing in {z.name.toLowerCase()}, with a complete supply chain from raw materials to finished export goods.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-4 grid grid-cols-4 gap-5 max-md:grid-cols-2">
          {[
            { v: z.count.split(" ")[0], l: "Factories" },
            { v: "$15B", l: "Annual output" },
            { v: "$8.2B", l: "Export revenue" },
            { v: "1985", l: "Year established" },
          ].map((s) => (
            <div key={s.l} className="text-center px-2.5 border-r border-line last:border-r-0">
              <b className="block text-[26px] font-extrabold text-brand leading-none">{s.v}</b>
              <span className="text-[11.5px] text-mute mt-1 block">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <div className="bg-paper border border-line rounded p-5">
          <h2 className="text-[16px] font-bold text-ink mb-3">About the {z.name} cluster</h2>
          <div className="text-[13px] text-ink leading-relaxed space-y-3">
            <p>{z.name} is one of China's largest industrial clusters, formed in the early 1980s and growing rapidly after China joined the WTO in 2001. With more than {z.count}, this cluster accounts for roughly 35% of China's total industry output.</p>
            <p>The cluster has a complete supply chain from raw materials (silica, clay, metals) and machinery to packaging and export logistics. Factories are clearly tiered: tier 1 serves the EU/US markets at high standards, tier 2 serves Southeast Asia and the Middle East, and tier 3 does OEM for domestic brands.</p>
            <p>Huayuesc has had a representative office in {z.name.split(" ")[0]} since 2018 with a team of 12, running on-site factory audits twice a month for Vietnamese buyers. Major brands from this cluster — including Dongpeng, Monalisa, Ortonbaths, and KUKA — are already on Huayuesc.</p>
          </div>
        </div>
      </div>

      {/* Cluster factories */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">Key factories in the cluster</h2>
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
          {clusterFactories.map((f) => (
            <Link key={f.slug} href={`/supplier/${f.slug}`} className="bg-paper border border-line rounded-sm p-3.5 hover:border-brand block">
              <div className="flex gap-3 items-start mb-2">
                <div className="w-12 h-12 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[16px] text-brand flex-shrink-0">{f.initials}</div>
                <div className="flex-1 min-w-0">
                  <b className="block text-[13px] font-semibold text-ink leading-tight line-clamp-2">{f.name}</b>
                  <span className="text-[11.5px] text-mute">{f.location}</span>
                </div>
              </div>
              <div className="flex gap-3 text-[11.5px] text-mute mt-2">
                <span><b className="text-accent">★ {f.rating}</b></span>
                <span>{f.meta}</span>
                <span>{f.badges.years}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">Featured products from the cluster</h2>
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand block">
              <div className="aspect-square bg-[#F5F5F5]">
                {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="p-2.5">
                <h4 className="text-[12px] text-ink line-clamp-2 mb-1">{p.title}</h4>
                <div className="text-accent font-bold text-[13px]">{p.price}<small className="text-mute font-normal text-[10px]">{p.unit}</small></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trade shows */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">Events &amp; Trade Shows in the region</h2>
        <div className="bg-paper border border-line rounded overflow-hidden">
          {TRADE_SHOWS.map((t, i) => (
            <Link key={t.name} href="/trade-shows" className={`grid grid-cols-[1fr_180px_180px_140px] gap-4 px-4 py-3 text-[13px] hover:bg-[#FAFBFC] max-md:grid-cols-1 max-md:gap-1 ${i > 0 ? "border-t border-line" : ""}`}>
              <b className="text-ink">{t.name}</b>
              <span className="text-mute">{t.date}</span>
              <span className="text-mute">{t.venue}</span>
              <span className="text-brand">{t.industry}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5 mb-7">
        <h2 className="text-[16px] font-bold text-ink mb-3">Cluster map</h2>
        <div className="relative rounded overflow-hidden h-[280px] bg-brand-dark">
          <img src={`/img/${slug}-map.jpg?v=5`} alt="map" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center text-white" style={{ background: "rgba(0,37,87,0.55)" }}>
            <div className="text-center">
              <div className="text-[36px] mb-2">🗺️</div>
              <b className="block text-[18px] font-bold">{z.name} — {z.count}</b>
              <span className="text-[12.5px] opacity-90">An interactive map will be released in Q2/2026</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const z = getZone(slug);
  return { title: `${z.name} Trading Zone — Huayuesc` };
}
