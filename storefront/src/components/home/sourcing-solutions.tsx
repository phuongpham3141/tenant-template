import Link from "next/link";

type SolutionSub = { name: string; image: string; href: string };

type SolutionCard = {
  title: string;
  bullets: string[];
  image: string;
  href: string;
  subcats: SolutionSub[];
};

const SOLUTIONS: SolutionCard[] = [
  {
    title: "陶瓷与石材产业集群",
    bullets: [
      "佛山 — 1,200家陶瓷工厂",
      "大规格瓷砖与大理石板材",
      "海防FOB / DDP报价",
    ],
    image: "/img/sol-hubs.jpg?v=7",
    href: "/zones",
    subcats: [
      { name: "瓷砖", image: "/img/cer1.jpg?v=7", href: "/category/construction-materials" },
      { name: "大规格大理石板材", image: "/img/cer2.jpg?v=7", href: "/category/construction-materials" },
      { name: "强化复合地板", image: "/img/cer8.jpg?v=7", href: "/category/construction-materials" },
    ],
  },
  {
    title: "家居产业集群",
    bullets: [
      "佛山 — 3,000多家家居工厂",
      "晋江 — 340家木材加工厂",
      "沙发、床、柜与餐桌OEM/ODM",
    ],
    image: "/img/sol-mei.jpg?v=7",
    href: "/zones",
    subcats: [
      { name: "沙发与客厅", image: "/img/fur1.jpg?v=7", href: "/category/noi-that" },
      { name: "床与卧室", image: "/img/fur3.jpg?v=7", href: "/category/noi-that" },
      { name: "橱柜与衣柜", image: "/img/fur7.jpg?v=7", href: "/category/noi-that" },
    ],
  },
  {
    title: "定制OEM/ODM加工",
    bullets: [
      "定制logo / 尺寸 / 颜色",
      "30套起订单免费3D设计",
      "大批量下单前提供样品",
    ],
    image: "/img/sol-custom.jpg?v=7",
    href: "/buying-request",
    subcats: [
      { name: "建筑材料", image: "/img/showcase-construction-materials.jpg?v=7", href: "/category/construction-materials" },
      { name: "定制家居", image: "/img/showcase-noi-that.jpg?v=7", href: "/category/noi-that" },
      { name: "五星级酒店OEM", image: "/img/fur6.jpg?v=7", href: "/category/noi-that" },
    ],
  },
  {
    title: "Smart Expo — 虚拟展会",
    bullets: [
      "信誉供应商",
      "360° VR工厂参观",
      "视频通话直接对接QC主管",
    ],
    image: "/img/sol-expo.jpg?v=7",
    href: "/seller-center/smart-expo",
    subcats: [
      { name: "VR工厂参观", image: "/img/sub-expo1.jpg?v=7", href: "/factory-tour" },
      { name: "陶瓷分类", image: "/img/sub-expo3.jpg?v=7", href: "/category/construction-materials" },
      { name: "家居分类", image: "/img/cer8.jpg?v=7", href: "/category/noi-that" },
    ],
  },
];

export function SourcingSolutions() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-6 max-md:px-3 max-md:mt-4">
      <h2 className="text-[20px] font-bold text-ink text-center mb-4 max-md:text-[17px] max-md:mb-3">
        采购解决方案与专属服务
      </h2>
      <div className="grid grid-cols-4 gap-3 md:max-xl:grid-cols-2 md:max-xl:gap-2.5 max-md:grid-cols-1 max-md:gap-2">
        {SOLUTIONS.map((s) => (
          <div
            key={s.title}
            className="bg-paper border border-line rounded overflow-hidden flex flex-col"
          >
            {/* Top: image with overlay text */}
            <Link
              href={s.href}
              className="relative aspect-[16/9] bg-brand-dark text-white block group/sol"
            >
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover opacity-80 group-hover/sol:opacity-70 transition-opacity"
              />
              <div
                className="absolute inset-0 px-4 py-4 flex flex-col justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,37,87,0.85) 0%, rgba(0,37,87,0.4) 100%)",
                }}
              >
                <h3 className="text-[18px] font-bold leading-tight mb-2 max-md:text-[16px]">
                  {s.title}
                </h3>
                <ul className="space-y-0.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-[11.5px] opacity-90 leading-snug max-md:text-[11px]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
            {/* Bottom: 3 sub-icons with labels */}
            <div className="grid grid-cols-3 gap-1.5 p-3 max-md:p-2">
              {s.subcats.map((sub, si) => (
                <Link
                  key={`${sub.name}-${si}`}
                  href={sub.href}
                  className="flex flex-col items-center gap-1.5 group/sub"
                >
                  <div className="w-[52px] h-[52px] rounded-full bg-[#F5F5F5] overflow-hidden border border-line group-hover/sub:border-accent transition-colors max-md:w-[44px] max-md:h-[44px]">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-full h-full object-cover group-hover/sub:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10.5px] text-ink text-center leading-tight line-clamp-2 group-hover/sub:text-accent max-md:text-[10px]">
                    {sub.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
