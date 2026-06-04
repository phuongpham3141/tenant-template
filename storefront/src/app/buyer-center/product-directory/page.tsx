import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { NAV_CATEGORIES } from "@/data/home";

const EXTRA_CATEGORIES = [
  { name: "包装与印刷", slug: "packaging-printing" },
  { name: "泳池与水疗", slug: "pool-spa" },
  { name: "庭院景观", slug: "landscape-garden" },
  { name: "卷帘门与自动门", slug: "rolling-door" },
  { name: "花岗岩与大理石", slug: "stone-granite" },
  { name: "空调与通风", slug: "hvac" },
  { name: "儿童玩具", slug: "toys" },
  { name: "工作服与面料", slug: "uniform-fabric" },
  { name: "瓷砖与马赛克", slug: "tile-mosaic" },
  { name: "监控与安防系统", slug: "security-camera" },
  { name: "不锈钢与金属板材", slug: "metal-sheet" },
  { name: "智能电子锁", slug: "smart-lock" },
  { name: "装饰玻璃与镜面", slug: "glass-mirror" },
  { name: "烤箱与商用灶具", slug: "oven-stove" },
  { name: "发电机", slug: "generator" },
  { name: "工业净水设备", slug: "water-purifier" },
  { name: "太阳能", slug: "solar" },
  { name: "高端铝合金门窗", slug: "aluminum-glass" },
  { name: "塑料管材与阀门", slug: "pipe-valve" },
  { name: "工业风扇", slug: "industrial-fan" },
  { name: "窗帘与装饰材料", slug: "curtain-decor" },
  { name: "强化复合木地板", slug: "engineered-wood" },
  { name: "涂料与饰面材料", slug: "paint-finish" },
  { name: "建筑钢材", slug: "steel" },
  { name: "电梯与扶梯", slug: "elevator" },
  { name: "智能家居设备", slug: "smart-home" },
  { name: "咖啡调制设备", slug: "coffee-equipment" },
  { name: "工业冷柜与冰箱", slug: "freezer" },
  { name: "玻璃展示柜", slug: "display-cabinet" },
  { name: "家具包覆面料", slug: "upholstery-fabric" },
  { name: "防水材料", slug: "waterproof" },
  { name: "电动车与叉车", slug: "electric-vehicle" },
];

const ALL_CATEGORIES = [
  ...NAV_CATEGORIES.map((c) => ({ name: c.name, slug: c.slug })),
  ...EXTRA_CATEGORIES,
];

const VN_LETTER_ORDER = "ABCDEĐEGHIKLMNOPQRSTUVXY";

function firstLetter(name: string): string {
  const first = name.trim()[0]?.toUpperCase() ?? "Z";
  const normalized = first.normalize("NFD").replace(/[̀-ͯ]/g, "");
  return normalized || first;
}

const grouped: Record<string, { name: string; slug: string }[]> = {};
for (const c of ALL_CATEGORIES) {
  const l = firstLetter(c.name);
  if (!grouped[l]) grouped[l] = [];
  grouped[l].push(c);
}
for (const l of Object.keys(grouped)) {
  grouped[l].sort((a, b) => a.name.localeCompare(b.name, "vi"));
}
const LETTERS = Array.from(new Set(VN_LETTER_ORDER.split(""))).filter((l) => grouped[l]);

const VERTICALS = [
  { icon: "🏨", name: "酒店与度假村", count: "240+ 供应商" },
  { icon: "🏢", name: "办公与共享办公", count: "180+ 供应商" },
  { icon: "🏠", name: "公寓与住宅", count: "320+ 供应商" },
  { icon: "🍽️", name: "餐厅与咖啡馆", count: "150+ 供应商" },
  { icon: "🏥", name: "医疗与医院", count: "90+ 供应商" },
  { icon: "🏫", name: "学校与培训", count: "75+ 供应商" },
  { icon: "🛍️", name: "零售与展厅", count: "210+ 供应商" },
  { icon: "🏗️", name: "项目与工程", count: "400+ 供应商" },
];

export default function ProductDirectoryPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "采购商中心", href: "/buyer-center" }, { label: "产品目录" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/product-directory" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/10 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🗂 产品目录</div>
            <h1 className="text-[22px] font-bold text-ink">产品目录</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              按 A–Z 字母顺序快速检索 2,400 余个 SKU。点击字母可滚动至对应分组；若您服务于特定类型项目，也可使用右侧的垂直行业入口查看。
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-3 mb-4 sticky top-2 z-10">
            <div className="flex flex-wrap gap-1 justify-center">
              {LETTERS.map((l) => (
                <a key={l} href={`#letter-${l}`} className="w-8 h-8 flex items-center justify-center text-[13px] font-bold text-brand border border-line rounded-sm hover:bg-brand hover:text-white">{l}</a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[1fr_240px] gap-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-5">
              {LETTERS.map((l) => (
                <section key={l} id={`letter-${l}`} className="mb-5 last:mb-0 scroll-mt-20">
                  <div className="flex items-center gap-3 mb-2 pb-2 border-b border-line">
                    <div className="w-9 h-9 bg-brand text-white rounded-sm flex items-center justify-center font-extrabold text-[16px]">{l}</div>
                    <span className="text-[12px] text-mute">{grouped[l].length} 个分类</span>
                  </div>
                  <div className="grid grid-cols-3 gap-x-4 gap-y-1.5 max-md:grid-cols-2">
                    {grouped[l].map((c) => (
                      <Link key={c.slug} href={`/category/${c.slug}`} className="text-[12.5px] text-ink hover:text-brand py-1 border-b border-dashed border-line">
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <aside className="bg-paper border border-line rounded p-4 self-start">
              <b className="block text-[13px] text-ink mb-3">🏷 按垂直行业查看</b>
              <ul className="space-y-1">
                {VERTICALS.map((v) => (
                  <li key={v.name}>
                    <Link href={`/category/${v.name.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "")}`} className="flex items-center gap-2 px-2 py-1.5 rounded-sm text-[12px] text-ink hover:bg-[#F5F7FA]">
                      <span className="w-5 text-center">{v.icon}</span>
                      <span className="flex-1 leading-tight">{v.name}</span>
                      <span className="text-[10px] text-mute">{v.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/buying-request" className="mt-3 block text-center px-3 py-2 bg-accent text-white rounded-sm text-[12px] font-bold hover:opacity-90">+ 发送询价</Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "产品目录 — 采购商中心" };
