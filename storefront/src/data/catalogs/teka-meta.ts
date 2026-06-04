/**
 * Teka 厨房设备各系列的富元数据 —— 用于产品详情页。
 *
 * Keyed by seriesOriginal (category: "oven", "range-hood", "hob"...).
 *
 * Honest sourcing:
 *   • 企业资料：Teka 集团（西班牙）—— 旗下 3 个品牌 Teka（1924）、
 *     Küppersbusch（1875）、Intra（1871）。数据来自 teka.com 公布信息。
 *   • 产品参数：teka.com/zh-cn 详情页（真实抓取）。
 *   • 标准：CE/CB/GB + 各产品对应的欧盟能效标签（EEI）。
 */

export type SeriesMeta = {
  story: string;
  heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[];
  careGuide: { title: string; desc: string }[];
  installation: string[];
  certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[];
  faq: { q: string; a: string }[];
};

const COMMON_CERTS = [
  "CE —— 欧洲认证",
  "CB Scheme —— 国际电气安全认证（IEC）",
  "欧盟能效标签 —— 按EEI分级A至G",
  "ISO 9001 —— 质量管理",
  "ISO 14001 —— 环境管理",
  "RoHS —— 不含有害重金属",
  "Red Dot与iF Design（高端Küppersbusch系列）",
];

const COMMON_MFG = [
  "Teka 集团 —— 源自欧洲的厨卫设备集团，旗下拥有 3 个品牌：Teka（1924）、Küppersbusch（1875，德国高端）、Intra（1871，瑞典不锈钢水槽）",
  "全球 15 家工厂 —— 服务 120 多个国家",
  "约 5,000 名员工；约 50% 的西班牙家庭使用 Teka 产品",
  "欧洲研发与设计中心 —— 多次荣获 Red Dot、iF Design 奖（Küppersbusch）",
  "按欧盟标准进行生产与检测；逐批进行电气安全、能效测试",
];

const COMMON_PACKAGING = [
  { label: "包装", value: "多层纸箱 + 定型泡棉 + 护角" },
  { label: "运输保障", value: "运输致损可获赔" },
  { label: "进口起订量", value: "1 个 20ft/40ft 集装箱 —— 可混装多型号" },
  { label: "资料", value: "说明书 + 质保卡；协助进口单证" },
  { label: "仓储", value: "干燥避光处；竖放，勿超量堆叠" },
];

const COMMON_INSTALL = [
  "由专业技术人员按 Teka 说明书安装",
  "核对橱柜开孔（cut-out）尺寸与产品嵌装尺寸是否匹配",
  "接驳前确保电源/燃气管路/给排水符合标准",
  "抽油烟机：安装符合管径的排烟管，减少弯折以保持排风量",
  "交付前对全部功能进行试机验收",
];

const COMMON_CARE = [
  { title: "日常清洁", desc: "用湿软布 + 中性溶液擦拭表面。请勿使用研磨性清洁剂或硬物刮擦玻璃/不锈钢。" },
  { title: "定期清洁", desc: "定期清洁滤油网（抽油烟机）、烤盘/内腔（烤箱）、滤网（洗衣机）。烤箱配有蒸汽自清洁（AquaClean）或热解清洁模式。" },
  { title: "技术维护", desc: "定期检查门封、燃烧器、燃气/水路；出现异常时联系技术人员，以保持性能与安全。" },
];

const COMMON_FAQ = [
  { q: "Teka 产品是否适配越南 220V 电网？", a: "适配。本处收录的型号标注电压为 220-240V / 50-60Hz，符合越南电网。华越供应链可按项目提供配置咨询。" },
  { q: "是否提供进口单证与质保支持？", a: "提供。提供 CO/CQ、技术资料；协助进口单证并按厂商政策提供质保。" },
  { q: "最低起订量与交货时间？", a: "按集装箱计，可混装多型号。具体交期按订单确认。" },
];

function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: COMMON_MFG, careGuide: COMMON_CARE, installation: COMMON_INSTALL,
    certifications: COMMON_CERTS, packaging: COMMON_PACKAGING, faq: COMMON_FAQ };
}

const WHY_EU = { icon: "🇪🇺", title: "欧洲设计与标准", desc: "源自欧洲品牌（1924），符合欧盟安全与能效标准。" };

export const TEKA_SERIES_META: Record<string, SeriesMeta> = {
  oven: mk({
    story: "Teka 嵌入式烤箱系列 —— 从多功能 iOven/iOven P 到 HLB/HSB/HLC 及 SteakMaster —— 以多维热风烹饪（MultiFunction）、AquaClean 水洁自清洁系统及 TFT 触控面板著称。",
    heritage: "烤箱自 20 世纪 20 年代起便是 Teka 的核心产品，热风、蒸烤一体与自清洁技术持续升级。",
    technicalSpecs: [
      { label: "容积", value: "63 – 71 L（60cm 系列）" },
      { label: "嵌装尺寸", value: "595 × 595 × ~560 mm" },
      { label: "温度", value: "30°C – 270°C" },
      { label: "自清洁", value: "AquaClean（蒸汽）/ 热解（Pyrolytic）" },
      { label: "电源", value: "220-240V / 50-60Hz" },
      { label: "能效", value: "常见 A / A+" },
    ],
    whyChoose: [WHY_EU,
      { icon: "♨️", title: "多维热风", desc: "多层热量均匀分布，可同时多盘烘烤。" },
      { icon: "💧", title: "AquaClean 自清洁", desc: "用蒸汽软化污渍，无需化学剂即可快速清洁。" }],
    projectShowcase: ["高端公寓、别墅厨房", "家具展厅厨房区", "整体厨房交付项目"],
  }),
  "steam-oven": mk({
    story: "Teka 蒸箱及蒸烤一体机系列（HLC/HSC 847、HSB……）—— 蒸制锁住营养，结合烧烤功能可烹饪多样菜式。",
    heritage: "Teka 顺应健康烹饪潮流开发蒸制系列，集成于标准嵌装尺寸之中。",
    technicalSpecs: [
      { label: "类型", value: "蒸箱/蒸烤一体机" },
      { label: "尺寸", value: "45cm 或 60cm 嵌入式" },
      { label: "电源", value: "220-240V / 50-60Hz" },
      { label: "操控", value: "TFT / LED 触控" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🥗", title: "锁住营养", desc: "蒸制保留维生素与食材水分。" },
      { icon: "🍞", title: "蒸 + 烤", desc: "一机兼具蒸制与对流烧烤。" }],
    projectShowcase: ["高端家庭厨房", "服务式公寓", "厨房设备展厅"],
  }),
  "microwave-oven": mk({
    story: "Teka 嵌入式微波炉（MS/MC/HLC 847 C/HSC 644 C）—— 快速加热，部分型号兼具烧烤功能，与橱柜同步嵌装。",
    heritage: "Teka 提供与同系烤箱设计协调的嵌入式微波炉系列。",
    technicalSpecs: [
      { label: "类型", value: "嵌入式微波炉 / 微波烤箱一体机" },
      { label: "安装", value: "嵌入式" },
      { label: "电源", value: "220-240V / 50-60Hz" },
    ],
    whyChoose: [WHY_EU,
      { icon: "⚡", title: "快速加热", desc: "日常加热 / 快煮便捷" },
      { icon: "🧩", title: "橱柜协调", desc: "嵌装贴合，玻璃面板与烤箱协调一致" }],
    projectShowcase: ["公寓厨房", "办公室 / 茶水间厨房", "家居项目"],
  }),
  "range-hood": mk({
    story: "Teka 抽油烟机 —— 侧吸式（CXW-220 DLV/iHood）与壁挂 T 型（DH/GFH）系列 —— 吸力强劲、运行静音、不锈钢滤油网可拆卸",
    heritage: "抽油烟机是 Teka 的长期强项，款式多样适配各种厨房布局",
    technicalSpecs: [
      { label: "类型", value: "侧吸式 / 壁挂 T 型" },
      { label: "中国标准型号", value: "CXW-220（厨房抽油烟类）" },
      { label: "电源", value: "220-240V / 50Hz" },
      { label: "过滤", value: "不锈钢滤油网，可拆卸清洗" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🌪️", title: "吸力强劲", desc: "高效排除油烟，适合重油烟的中式厨房" },
      { icon: "🔇", title: "运行静音", desc: "电机优化噪声，多档风速可调" }],
    projectShowcase: ["公寓与联排别墅厨房", "小型餐厅", "厨房展厅"],
  }),
  hob: mk({
    story: "Teka 灶具 —— 燃气灶（IG/GFH/JZT）与电磁 / 电嵌入灶 —— 钢化玻璃、高效燃烧器、安全熄火保护",
    heritage: "Teka 为燃气与电 / 电磁市场提供多样化嵌入式灶具",
    technicalSpecs: [
      { label: "类型", value: "燃气灶 / 电磁灶 / 嵌入式电灶" },
      { label: "灶面", value: "微晶玻璃 / 不锈钢" },
      { label: "安全", value: "熄火自动断气传感器（燃气系列）" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🔥", title: "高效燃烧器", desc: "火力强劲、分布均匀、节省燃气" },
      { icon: "🛡️", title: "安全", desc: "自动熄火断气，耐热玻璃面板" }],
    projectShowcase: ["家庭厨房", "公寓", "整体厨房交付项目"],
  }),
  "coffee-machine": mk({
    story: "Teka 嵌入式咖啡机（CLC 855 GM）—— 集成磨豆，自动制作 espresso/cappuccino，与橱柜同步嵌装",
    heritage: "Teka 拓展至现代厨房的高端集成饮品设备",
    technicalSpecs: [
      { label: "类型", value: "集成磨豆嵌入式咖啡机" },
      { label: "安装", value: "嵌入式" },
      { label: "电源", value: "220-240V / 50-60Hz" },
    ],
    whyChoose: [WHY_EU,
      { icon: "☕", title: "自动磨豆冲泡", desc: "从豆到 espresso/cappuccino 一键完成" },
      { icon: "🧩", title: "嵌入式高雅", desc: "与同系烤箱、微波炉设计协调" }],
    projectShowcase: ["顶层公寓厨房", "酒店 / 服务式公寓", "高端展厅"],
  }),
  refrigerator: mk({
    story: "Teka 冰箱 —— 包括多门手工不锈钢系列（RMF）及嵌入 / 独立式（RFD/RFC）欧式风格冰箱",
    heritage: "Teka 为高端厨房提供协调一致的冷藏保鲜解决方案",
    technicalSpecs: [
      { label: "类型", value: "独立式 / 嵌入式 / 多门不锈钢冰箱" },
      { label: "电源", value: "220-240V / 50Hz" },
      { label: "能效", value: "依欧盟能效标签" },
    ],
    whyChoose: [WHY_EU,
      { icon: "❄️", title: "优化保鲜", desc: "分区温控，使食材持久保鲜" },
      { icon: "✨", title: "高端不锈钢", desc: "RMF 手工不锈钢系列高雅耐用、历久弥新" }],
    projectShowcase: ["别墅厨房", "高端公寓", "家具展厅"],
  }),
  washer: mk({
    story: "Teka 洗衣机（WML/WDL）—— 前开门、变频节能、多种洗涤程序，适合家庭使用",
    heritage: "Teka 为现代生活空间提供洗涤设备系列",
    technicalSpecs: [
      { label: "类型", value: "前开门洗衣机 / 洗干一体机" },
      { label: "电源", value: "220-240V / 50Hz" },
      { label: "能效", value: "依欧盟能效标签" },
    ],
    whyChoose: [WHY_EU,
      { icon: "💧", title: "洁净节能", desc: "变频静音，节水省电" },
      { icon: "🌀", title: "多程序", desc: "针对不同面料的多种模式" }],
    projectShowcase: ["公寓", "联排别墅", "服务式公寓"],
  }),
  dryer: mk({
    story: "Teka 热泵干衣机（SHL）—— 柔和烘干、节能省电、呵护衣物纤维",
    heritage: "Teka 为洗烘系列增添高效热泵干衣机。",
    technicalSpecs: [
      { label: "类型", value: "热泵干衣机（heat pump）" },
      { label: "电源", value: "220-240V / 50Hz" },
      { label: "能效", value: "高（热泵）" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🌡️", title: "热泵烘干", desc: "低温呵护衣物，节省电力。" },
      { icon: "👕", title: "呵护纤维", desc: "烘干均匀，减少褶皱与缩水。" }],
    projectShowcase: ["高端公寓", "联排别墅", "公寓共用洗衣区"],
  }),
  sink: mk({
    story: "Teka/Intra 水槽 —— Square/ForSquare/Stone 系列 —— 不锈钢与花岗岩材质，现代方形造型，部分配自动下水阀。",
    heritage: "Intra（1871，瑞典）是 Teka 集团旗下历史悠久的不锈钢水槽品牌。",
    technicalSpecs: [
      { label: "材质", value: "不锈钢 / 花岗岩（Tegranite）" },
      { label: "类型", value: "台下 / 台上，1-2 槽" },
      { label: "系列", value: "Square、ForSquare、Stone" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🪣", title: "耐用易洁", desc: "不锈钢 / 石材防污、耐刮。" },
      { icon: "📐", title: "方形设计", desc: "小 R 角现代造型，优化槽内空间。" }],
    projectShowcase: ["家庭厨房", "厨房展厅", "家居项目"],
  }),
  vacuum: mk({
    story: "Teka 食品真空封装机（VS 152）—— 真空包装、延长保鲜、抽屉式嵌装。",
    heritage: "Teka 为高端厨房增添专业保鲜设备。",
    technicalSpecs: [
      { label: "类型", value: "抽屉式真空封装" },
      { label: "电源", value: "220-240V / 50-60Hz" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🧪", title: "持久保鲜", desc: "真空封装使食材保鲜更久。" },
      { icon: "🍳", title: "支持低温慢煮", desc: "支持低温真空慢煮（Sous-vide）。" }],
    projectShowcase: ["顶层公寓厨房", "高端餐厅", "展厅"],
  }),
  "warming-drawer": mk({
    story: "Teka 暖食抽屉（CP 15 GS）—— 推拉式，为餐盘 / 食物保温，与橱柜同步嵌装。",
    heritage: "Teka 高端嵌入式厨房系统的完善配件。",
    technicalSpecs: [
      { label: "类型", value: "推拉式暖食 / 保温抽屉（push-pull）" },
      { label: "安装", value: "嵌入式" },
      { label: "电源", value: "220-240V / 50-60Hz" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🍽️", title: "为餐食保温", desc: "用餐前为餐盘加热并保温食物。" },
      { icon: "🧩", title: "橱柜协调", desc: "与同系烤箱及设备嵌装贴合。" }],
    projectShowcase: ["高端厨房", "酒店", "展厅"],
  }),
};

/** 辅助函数：按 Teka 的 seriesOriginal（category）获取 meta。 */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  const key = seriesOriginal.trim();
  return TEKA_SERIES_META[key] || TEKA_SERIES_META[key.split(/[·\/\s]/)[0].trim()];
}
