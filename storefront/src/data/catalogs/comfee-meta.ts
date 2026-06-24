/**
 * Comfee 元数据 —— 产品详情页富文本。以 seriesOriginal（厨电品类）为键。
 * Comfee 是美的集团旗下面向出口市场的厨电品牌。来源：Comfee 越南市场产品画册。
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
  "美的集团品质体系 —— Comfee 为美的旗下出口厨电品牌，共享美的研发与制造资源",
  "符合家用电器安全与能效相关标准（按出口市场认证）",
  "嵌入式厨电按欧标尺寸设计，适配主流橱柜开孔",
  "IoT 智能家居互联 —— 支持 App 远程操作与联动（部分型号）",
];
const MFG = [
  "Comfee —— 美的集团（《财富》世界 500 强）旗下面向出口市场的厨电品牌",
  "嵌入式厨电产品线：电磁灶、油烟机、洗碗机、嵌入式烤箱、嵌入式微波炉",
  "AI 智能技术加持：AI 烹饪、AI 变频、AI 洗涤识别、AI 触控等",
  "依托美的全球制造与供应链，品质稳定、配件与服务有保障",
];
const PACK = [
  { label: "供货形式", value: "整机包装，含安装配件与说明书" },
  { label: "定制", value: "可按项目/经销需求配置型号与数量" },
  { label: "运输防护", value: "泡沫 + 纸箱多重防护，玻璃面板加护角" },
  { label: "服务", value: "美的体系售后，提供安装指引与技术支持" },
];
const INSTALL = [
  "嵌入式产品安装前核对橱柜开孔尺寸与电源/排烟条件",
  "按说明书预留散热与检修空间，确保通风良好",
  "由专业人员连接电源（部分大功率型号需独立回路）与排水/排烟",
  "通电试机，检查各功能、按键/触控与 App 联动是否正常",
];
const CARE = [
  { title: "日常清洁", desc: "面板与玻璃用柔软湿布擦拭，避免强酸碱与硬物刮擦。" },
  { title: "油污处理", desc: "油烟机滤网与灶面定期清洁去油，保持吸力与美观。" },
  { title: "洗碗机保养", desc: "定期清理滤网、加注软化盐与漂洗剂，保持洗涤效果。" },
  { title: "安全用电", desc: "大功率厨电避免与其他大负载共用线路，潮湿环境注意接地。" },
];
const FAQ = [
  { q: "Comfee 和美的是什么关系？", a: "Comfee 是美的集团旗下面向出口市场的厨电品牌，共享美的的研发、制造与供应链资源。" },
  { q: "这些是嵌入式厨电吗？", a: "是。电磁灶、油烟机、洗碗机、烤箱与微波炉均按嵌入式/欧标尺寸设计，适配现代整体橱柜。" },
  { q: "支持智能控制吗？", a: "部分型号支持 IoT 智能家居与 App 远程操作（如洗碗机），并配备 AI 变频、AI 识别等智能功能。" },
  { q: "在越南是否提供安装与售后？", a: "请联系华越，获取适合项目的型号选型、供货、安装与售后方案咨询。" },
];

function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}

const WHY_BRAND = { icon: "🔥", title: "美的出品", desc: "Comfee 为美的集团（《财富》世界 500 强）旗下出口厨电品牌，大厂品质可托付。" };
const WHY_AI = { icon: "🤖", title: "AI 智能厨电", desc: "AI 烹饪 / AI 变频 / AI 识别 / AI 触控等智能技术，让烹饪与清洁更省心。" };
const WHY_BUILTIN = { icon: "🧩", title: "嵌入式美学", desc: "按欧标尺寸设计，与整体橱柜浑然一体，厨房立面更整洁高级。" };

export const COMFEE_SERIES_META: Record<string, SeriesMeta> = {
  "induction-hob": mk({
    story:
      "Comfee 电磁灶，把「精准火候」交给 AI —— 德国 IGBT 高效功率模块带来快速而稳定的加热，AI 自动烹饪联动与旋钮/触控操作让大火爆炒与小火慢炖都拿捏自如。一块黑色微晶玻璃面板嵌入台面，平整易洁、颜值在线；多种规格（双灶到多灶）适配中西厨需求，是现代嵌入式厨房的高效心脏。",
    heritage: "电磁灶是 Comfee 嵌入式厨电的核心品类，以德国 IGBT 与 AI 烹饪技术兼顾效率与体验。",
    technicalSpecs: [
      { label: "类型", value: "嵌入式电磁灶（微晶玻璃面板）" },
      { label: "核心技术", value: "德国 IGBT 高效功率模块 · AI 自动烹饪 · 旋钮/触控操作" },
      { label: "规格", value: "双灶至多灶多型号（CIH / CMH 系列）" },
      { label: "面板", value: "黑色微晶玻璃，平整易洁" },
      { label: "适用", value: "嵌入式整体厨房、中西厨" },
    ],
    whyChoose: [WHY_BRAND, { icon: "⚡", title: "德国 IGBT", desc: "高效功率模块，加热快、火力稳、能效高。" }, WHY_AI, WHY_BUILTIN],
    projectShowcase: ["现代嵌入式厨房", "公寓与住宅整厨", "精装与样板房项目"],
  }),
  "range-hood": mk({
    story:
      "Comfee 油烟机，让厨房「大火爆炒也清新如初」—— AI 变频电机带来强劲而安静的吸力，AI 烟雾感应在油烟升腾时自动提速、平时低速节能；AI Waving 隔空挥手触控，手上沾油也能轻松操作，干净又卫生。简约的黑色机身与触控面板，嵌入橱柜立面，颜值与实力并存。",
    heritage: "油烟机是 Comfee 守护厨房空气的关键品类，以 AI 变频与隔空触控带来更聪明的排烟体验。",
    technicalSpecs: [
      { label: "类型", value: "壁挂式/嵌入式油烟机" },
      { label: "核心技术", value: "AI 变频电机 · AI 烟雾感应自动调速 · AI Waving 隔空挥手触控" },
      { label: "规格", value: "70/90cm 多型号（CH 系列）" },
      { label: "面板", value: "黑色机身 + 触控操作" },
      { label: "适用", value: "嵌入式整体厨房、开放式厨房" },
    ],
    whyChoose: [WHY_BRAND, { icon: "🌬️", title: "强劲静音", desc: "AI 变频大吸力，烟雾感应自动提速，安静又高效。" }, { icon: "👋", title: "隔空触控", desc: "AI Waving 挥手操作，沾油的手也能轻松控制。" }, WHY_BUILTIN],
    projectShowcase: ["开放式与半开放厨房", "公寓与住宅整厨", "中西分厨项目"],
  }),
  dishwasher: mk({
    story:
      "Comfee 洗碗机，把「洗碗自由」带进每个厨房 —— 高压热水洗 + AI Wash 自动识别脏污程度，脏得多就洗得透；热风/AI Heat Dry 烘干让餐具干爽无水渍，部分型号配高温/UV 除菌更安心。嵌入式、独立式与半嵌多种安装方式，3 层碗篮装得下中欧餐具，配合 IoT 智能与多档程序，解放双手、省水省心。",
    heritage: "洗碗机是 Comfee 解放厨房双手的明星品类，以 AI 洗涤识别与多重烘干除菌带来安心洁净。",
    technicalSpecs: [
      { label: "类型", value: "嵌入式 / 独立式 / 半嵌（多型号）" },
      { label: "容量", value: "8–15 套（欧标），2–3 层碗篮" },
      { label: "核心技术", value: "高压热水洗 · AI Wash 脏污识别 · 热风/AI Heat Dry 烘干 · 高温/UV 除菌 · AI 变频 · IoT" },
      { label: "程序", value: "8–10 个洗涤程序" },
      { label: "噪音", value: "约 42–48 dB" },
      { label: "适用", value: "嵌入式整体厨房、公寓与住宅" },
    ],
    whyChoose: [WHY_BRAND, { icon: "💧", title: "洗得透烘得干", desc: "高压热水洗 + AI 识别脏污 + 热风烘干，餐具洁净干爽。" }, { icon: "🦠", title: "高温除菌", desc: "部分型号配高温/UV 除菌，宝宝餐具也安心。" }, WHY_AI],
    projectShowcase: ["现代嵌入式厨房", "公寓与住宅", "民宿与小型餐饮"],
  }),
  oven: mk({
    story:
      "Comfee 嵌入式烤箱，把「烘焙的仪式感」嵌进橱柜 —— 大容量内腔与多种加热模式满足烘烤、焗、烤一体需求，精准控温让蛋糕、面包与烤肉都恰到好处。黑色玻璃门与简洁旋钮/面板，嵌入立面干净利落，是家庭烘焙与西厨的得力伙伴。",
    heritage: "嵌入式烤箱是 Comfee 西厨场景的重要一员，以稳定控温与大容量满足家庭烘焙需求。",
    technicalSpecs: [
      { label: "类型", value: "嵌入式电烤箱（CO 系列）" },
      { label: "加热模式", value: "多种加热模式，烘/烤/焗一体" },
      { label: "控温", value: "精准控温，受热均匀" },
      { label: "面板", value: "黑色玻璃门 + 旋钮/触控" },
      { label: "适用", value: "嵌入式整体厨房、家庭烘焙与西厨" },
    ],
    whyChoose: [WHY_BRAND, { icon: "🍞", title: "稳定控温", desc: "多模式精准控温，烘焙烤制恰到好处。" }, WHY_BUILTIN, WHY_AI],
    projectShowcase: ["家庭烘焙厨房", "西厨与开放式厨房", "公寓与别墅整厨"],
  }),
  microwave: mk({
    story:
      "Comfee 嵌入式微波炉，让「快手加热」也有高级感 —— 嵌入橱柜节省台面空间，多档微波与解冻/加热程序覆盖日常所需，简洁面板操作直观。与同系列嵌入式厨电同色同系，让厨房立面整齐统一，是现代快节奏厨房的实用之选。",
    heritage: "嵌入式微波炉是 Comfee 补全嵌入式厨电矩阵的实用品类，与全套厨电同色同系。",
    technicalSpecs: [
      { label: "类型", value: "嵌入式微波炉（CMW 系列）" },
      { label: "功能", value: "多档微波 · 解冻/加热程序" },
      { label: "安装", value: "嵌入橱柜，节省台面空间" },
      { label: "面板", value: "简洁面板，操作直观" },
      { label: "适用", value: "嵌入式整体厨房、公寓与住宅" },
    ],
    whyChoose: [WHY_BRAND, WHY_BUILTIN, { icon: "⏱️", title: "快手加热", desc: "多档微波与程序，日常加热解冻省时省心。" }, WHY_AI],
    projectShowcase: ["现代嵌入式厨房", "公寓与小户型", "民宿与办公茶水间"],
  }),
};

/** 按 seriesOriginal（厨电品类）获取元数据，缺省回退到 induction-hob。 */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return COMFEE_SERIES_META[seriesOriginal.trim()] || COMFEE_SERIES_META["induction-hob"];
}
