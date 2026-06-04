import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { ZONES } from "@/data/home";

const ZONE_DESC: Record<string, string> = {
  "foshan-ceramic": "中国最大的陶瓷中心——占全球 porcelain 产量的 60%。",
  "taizhou-faucet": "水龙头与卫浴配件之都——480 家工厂出口全球。",
  "foshan-furniture": "亚洲最大家具产业集群——3,000+ 家工厂，配套供应链齐全。",
  "zhongshan-light": "LED 灯具王国——2,200 家民用及商用照明工厂。",
  "jinjiang-wood": "木地板与工程木制品中心——340 家专业出口工厂。",
  "chaozhou-sanitary": "卫浴陶瓷之都——出口高端马桶、面盆、浴缸。",
};

export default function ZonesPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "产业带" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5">
          <h1 className="text-[24px] font-extrabold text-ink leading-tight">🗺️ 产业带——中国产业集群</h1>
          <p className="text-[13px] text-mute mt-1">6 大产业集群，专注建材、家具、卫浴、LED 灯具。源头直采——价格最优。</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {ZONES.map((z) => (
            <Link key={z.slug} href={`/zone/${z.slug}`} className="bg-paper border border-line rounded overflow-hidden hover:border-brand block group">
              <div className="aspect-[16/9] bg-[#F5F5F5] relative overflow-hidden">
                {z.image ? <img src={z.image} alt={z.name} className="w-full h-full object-cover group-hover:scale-105 transition" /> : null}
                <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 60%, rgba(0,37,87,0.85))" }} />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <b className="block text-[18px] font-bold leading-tight">{z.name}</b>
                  <span className="text-[12px] opacity-90">{z.count}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[12.5px] text-mute leading-relaxed">{ZONE_DESC[z.slug] ?? "专业产业集群，汇聚众多已验厂的合作工厂。"}</p>
                <span className="text-brand text-[12.5px] font-semibold mt-3 block">探索产业带 →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5 mb-7">
        <h2 className="text-[18px] font-bold text-ink mb-3">📍 中国产业集群地图</h2>
        <div className="relative rounded overflow-hidden h-[420px] bg-brand-dark">
          <img src="/img/china-map.jpg?v=5" alt="map" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center text-white" style={{ background: "rgba(0,37,87,0.5)" }}>
            <div className="text-center">
              <div className="text-[42px] mb-2">🗺️</div>
              <b className="block text-[20px] font-bold">地图上的 6 大产业集群</b>
              <p className="text-[12.5px] opacity-90 max-w-[480px] mx-auto mt-2">标注各集群位置的交互式地图将于 2026 Q2 上线。目前请点击上方卡片查看详情。</p>
            </div>
          </div>
          {/* dot markers */}
          {ZONES.map((z, i) => (
            <span
              key={z.slug}
              className="absolute w-3 h-3 bg-gold rounded-full ring-4 ring-gold/40"
              style={{
                top: `${30 + (i % 3) * 18}%`,
                left: `${20 + i * 12}%`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "产业带 — Huayuesc" };
