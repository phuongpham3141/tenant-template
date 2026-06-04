/**
 * LINVOL 领沃 元数据 — 产品详情页。以 seriesOriginal 为键（villa/retrofit/escalator/passenger）。
 * 来源：linvol.midea.com.cn — 美的集团旗下官方电梯品牌。
 * 制造商：菱王电梯有限公司。服务热线：400-700-7722。
 */
export type SeriesMeta = {
  story: string; heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[]; careGuide: { title: string; desc: string }[];
  installation: string[]; certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[]; faq: { q: string; a: string }[];
};
const CERTS = [
  "中国电梯安全国家标准（GB 7588）",
  "家用电梯新标准 GB/T 21739-2025",
  "电梯安全检测与验收",
  "按美的集团标准建立的质量管理体系",
];
const MFG = [
  "LINVOL 领沃 — 美的集团旗下官方电梯品牌（美的楼宇科技 Midea Building Technologies）",
  "制造商：菱王电梯有限公司（Lingwang Elevator）",
  "美的数字化电梯研发中心 + 佛山工业园区工厂",
  "数字技术 + AI 全程应用：设计 → 生产 → 定制 → 研发 → 运行 → 维保",
];
const PACK = [
  { label: "供应形式", value: "整套电梯 + 按项目安装" },
  { label: "定制", value: "轿厢与配置按工程定制" },
  { label: "服务", value: "「管家 + 专家」 — 终身质保 + 维保（热线 400-700-7722）" },
];
const INSTALL = [
  "选配前勘察底坑（pit）、提升高度、载重量",
  "由受过培训的技术团队安装；按标准进行安全验收",
  "按规范连接电源、救援系统、门联锁",
  "投入使用前进行试运行与安全检测",
];
const CARE = [
  { title: "终身维保", desc: "LINVOL「管家 + 专家」模式：按计划维保，检查钢丝绳/导轨、制动器、门、控制系统。" },
  { title: "数字化监控", desc: "数字技术 + AI 协助监测运行状态，异常早预警。" },
  { title: "安全", desc: "按规定定期进行安全检测；运行异常时立即处理。" },
];
const FAQ = [
  { q: "LINVOL 是美的的品牌吗？", a: "是。LINVOL 领沃 是美的集团旗下官方电梯品牌（美的楼宇科技 Midea Building Technologies），制造商为菱王电梯有限公司（Lingwang Elevator）。" },
  { q: "LINVOL 在越南是否提供安装与维保？", a: "请联系华越，获取适合项目的供应、安装与技术服务方案咨询。" },
  { q: "质保政策如何？", a: "LINVOL 采用「管家 + 专家」全生命周期模式 —— 终身质保 + 维保。" },
];
function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🛗", title: "美的品牌", desc: "LINVOL —— 美的集团（《财富》世界 500 强）旗下官方电梯。" };
export const LINVOL_SERIES_META: Record<string, SeriesMeta> = {
  villa: mk({
    story: "LINVOL 别墅电梯 —— 轿厢与部件全面升级设计，最大化利用井道空间，外观时尚，可定制性丰富。在美的集团的支持下，成为「用户优选的家用电梯品牌」。",
    heritage: "家用电梯是 LINVOL 重点发展的系列 —— 符合新标准 GB/T 21739-2025，多项配置参数更优。",
    technicalSpecs: [
      { label: "类型", value: "家用电梯 / 别墅电梯" },
      { label: "应用", value: "别墅、多层联排别墅" },
      { label: "优势", value: "充分利用井道，外观时尚，定制性高" },
    ],
    whyChoose: [WHY, { icon: "🏡", title: "适用住宅", desc: "设计紧凑，最大化利用室内井道空间。" }, { icon: "🎨", title: "可定制", desc: "轿厢与外观可按室内装饰丰富选配。" }],
    projectShowcase: ["别墅", "多层联排别墅", "高端家庭住宅"],
  }),
  retrofit: mk({
    story: "LINVOL 加装改造电梯 —— 专为老旧楼房加装电梯而设计，将全新数字技术与人性化设计相结合，服务社区居民与老年群体。",
    heritage: "改造系列满足老旧公寓/楼房加装电梯的需求 —— 解决城市民生难题。",
    technicalSpecs: [
      { label: "类型", value: "老旧楼房加装电梯（加装改造）" },
      { label: "应用", value: "老旧公寓/楼房加装电梯" },
      { label: "特点", value: "全新数字技术 + 人性化设计" },
    ],
    whyChoose: [WHY, { icon: "🏢", title: "适用旧楼", desc: "为既有建筑加装电梯的解决方案。" }, { icon: "👵", title: "人性化", desc: "服务社区居民与老年群体。" }],
    projectShowcase: ["老旧公寓加装电梯", "老年人聚居社区", "既有建筑改造"],
  }),
  escalator: mk({
    story: "LINVOL 自动扶梯 —— 适用于购物中心、车站、机场：结构精密，运行平稳，节能省电。",
    heritage: "自动扶梯是 LINVOL 产品线中面向大人流量公共交通的系列。",
    technicalSpecs: [
      { label: "类型", value: "自动扶梯" },
      { label: "应用", value: "购物中心、车站、机场、公共场所" },
      { label: "特性", value: "结构精密，运行平稳，节能省电" },
    ],
    whyChoose: [WHY, { icon: "🏬", title: "适用大型工程", desc: "满足购物中心、车站、机场的高人流量。" }, { icon: "🛡️", title: "安全", desc: "符合标准的安全系统与紧急制停。" }],
    projectShowcase: ["购物中心", "车站与机场", "公共工程"],
  }),
  passenger: mk({
    story: "LINVOL 数字化乘客电梯 —— 适用于酒店、写字楼、住宅小区：性能卓越、安全性高、节能省电；数字技术 + AI 贯穿电梯全生命周期。",
    heritage: "乘客电梯是核心产品，充分展现 LINVOL/美的的数字化实力。",
    technicalSpecs: [
      { label: "类型", value: "乘客电梯" },
      { label: "应用", value: "酒店、写字楼、住宅小区" },
      { label: "技术", value: "数字化 + AI 贯穿全生命周期" },
    ],
    whyChoose: [WHY, { icon: "🏨", title: "多种工程", desc: "适用于酒店、写字楼、住宅小区。" }, { icon: "⚡", title: "节能", desc: "性能高、节能省电、安全可靠。" }],
    projectShowcase: ["酒店", "写字楼", "住宅小区与住宅"],
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return LINVOL_SERIES_META[seriesOriginal.trim()] || LINVOL_SERIES_META["villa"];
}
