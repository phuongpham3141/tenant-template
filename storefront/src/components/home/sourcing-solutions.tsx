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
    title: "产业集群采购",
    bullets: [
      "集中型工业园区",
      "源头价格更具竞争力",
      "原厂 OEM/ODM 产品",
    ],
    image: "/img/sol-hubs.jpg?v=4",
    href: "/zones",
    subcats: [
      { name: "礼品与体育用品", image: "/img/sub-gifts.jpg?v=4", href: "/category/decoration" },
      { name: "电气与电子", image: "/img/sub-electric.jpg?v=4", href: "/category/electrical" },
      { name: "运输", image: "/img/sub-transport.jpg?v=4", href: "/category/hardware-tools" },
    ],
  },
  {
    title: "MEI 获奖产品",
    bullets: [
      "卓越的制造品质",
      "突破性设计",
      "经行业专家评审",
    ],
    image: "/img/sol-mei.jpg?v=4",
    href: "/info/mei-awards",
    subcats: [
      { name: "生产与加工", image: "/img/sub-mfg.jpg?v=4", href: "/category/construction-materials" },
      { name: "冶金与矿产", image: "/img/sub-metal.jpg?v=4", href: "/category/hardware-tools" },
      { name: "包装与印刷", image: "/img/sub-pack.jpg?v=4", href: "/category/decoration" },
    ],
  },
  {
    title: "产品定制",
    bullets: [
      "定制 Logo / 尺寸 / 颜色",
      "按需专属设计",
      "下单前提供样品",
    ],
    image: "/img/sol-custom.jpg?v=4",
    href: "/buying-request",
    subcats: [
      { name: "雨伞", image: "/img/sub-umb.jpg?v=4", href: "/category/outdoor-garden" },
      { name: "拖鞋与鞋类", image: "/img/sub-slip.jpg?v=4", href: "/category/hotel-supplies" },
      { name: "手机壳", image: "/img/sub-case.jpg?v=4", href: "/category/electrical" },
    ],
  },
  {
    title: "智能展会 — 线上展会",
    bullets: [
      "经过审核认证的供应商",
      "亮相国际展会",
      "7×24 小时虚拟展位",
    ],
    image: "/img/sol-expo.jpg?v=4",
    href: "/seller-center/smart-expo",
    subcats: [
      { name: "生产与加工", image: "/img/sub-expo1.jpg?v=4", href: "/category/construction-materials" },
      { name: "运输与车辆", image: "/img/sub-expo2.jpg?v=4", href: "/category/hardware-tools" },
      { name: "建筑与装饰", image: "/img/sub-expo3.jpg?v=4", href: "/category/construction-materials" },
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
                className="w-full h-full object-cover opacity-65 group-hover/sol:opacity-50 transition-opacity"
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
              {s.subcats.map((sub) => (
                <Link
                  key={sub.name}
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
