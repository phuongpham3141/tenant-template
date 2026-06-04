/**
 * Dulux Professional 多乐士专业 元数据 —— 产品详情页。Keyed by seriesOriginal（catKey）。
 * 来源：duluxpro.com.cn —— Dulux Professional（隶属阿克苏诺贝尔）。
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
const CERTS = ["涂料中国国家标准（GB）", "环境标志（十环）/ 低 VOC", "阿克苏诺贝尔全球质量体系", "ISO 9001 / ISO 14001"];
const MFG = [
  "Dulux Professional 多乐士专业 —— 阿克苏诺贝尔（荷兰涂料集团）旗下的专业/工程涂料系列",
  "产品线：内外墙漆、真石漆、艺术质感漆、无机矿物漆、底漆、腻子",
  "阿克苏诺贝尔全球涂料技术；多款净味、抗菌、防霉系列",
  "色彩体系与专业工程解决方案",
];
const PACK = [
  { label: "规格", value: "按系列分桶（如 18L、5L）；腻子按袋装" },
  { label: "起订量", value: "按集装箱 / 托盘计；可混装多型号" },
  { label: "仓储", value: "阴凉干燥处，避免日晒与冰冻；用后密封" },
];
const INSTALL = [
  "基层处理需洁净、干燥、平整；面漆前先批腻子并涂底漆",
  "按规定用量与道数施工，各道间留足干燥时间",
  "按厂商推荐比例稀释；使用前搅拌均匀",
  "外墙/真石漆系统：按底涂—面涂—罩面流程施工",
];
const CARE = [
  { title: "仓储", desc: "密封存放于阴凉干燥处，避免日晒/冰冻；在保质期内使用。" },
  { title: "施工", desc: "遵守温湿度条件；雨天/高湿环境下勿施工。" },
  { title: "清洁", desc: "水性涂料用后立即用清水清洗工具。" },
];
const FAQ = [
  { q: "Dulux Pro 有环保标志吗？", a: "有。多款产品获绿色标志/低 VOC；按产品提供技术资料。" },
  { q: "可按项目类型提供选漆建议吗？", a: "可以。请告知项目类型（内/外墙、真石漆、防水……），即可获得合适系列的建议。" },
  { q: "起订量与交货时间？", a: "按集装箱 / 托盘计；交期按订单确认。" },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🎨", title: "阿克苏诺贝尔全球", desc: "Dulux Pro —— 阿克苏诺贝尔的专业系列，国际品质。" };
const SHOW = ["住宅、公寓、别墅项目", "商业及公共工程", "精装交付与高端外立面项目"];
const INTERIOR = mk({
  story: "多乐士专业内墙漆 —— 净味水性涂料，多款抗菌/防霉/防潮系列，遮盖力高、色彩持久、易擦洗。",
  heritage: "内墙漆是采用阿克苏诺贝尔技术的核心系列。",
  technicalSpecs: [{ label: "类型", value: "内墙水性涂料" }, { label: "特性", value: "净味、抗菌/防霉（视系列）、遮盖力高" }, { label: "应用", value: "室内墙面与顶棚" }],
  whyChoose: [WHY, { icon: "🌬️", title: "净味安全", desc: "低 VOC，部分系列抗菌，室内安全。" }, { icon: "🎨", title: "色彩持久，遮盖力佳", desc: "遮盖力高，色泽持久美观，易擦洗。" }],
  projectShowcase: SHOW,
});
const EXTERIOR = mk({
  story: "多乐士专业外墙漆 —— 耐候、抗积尘、风吹雨打下色彩持久；备有用于外立面的弹性遮裂系列。",
  heritage: "外墙系列保护并美化建筑外立面。",
  technicalSpecs: [{ label: "类型", value: "外墙水性涂料（含弹性系列）" }, { label: "特性", value: "耐候、抗积尘、色彩持久、遮裂（弹性系列）" }, { label: "应用", value: "外墙、外立面" }],
  whyChoose: [WHY, { icon: "☀️", title: "耐候", desc: "经受日晒雨淋，不易褪色，防霉防藻。" }, { icon: "🧱", title: "遮裂", desc: "弹性系列遮盖细微裂纹，保护墙体。" }],
  projectShowcase: SHOW,
});
const PRIMER = mk({
  story: "多乐士专业底漆 —— 抗碱、增强附着力、抗反渗，为面漆打造耐久基底；备有真石漆/矿物专用底漆系列。",
  heritage: "底漆是涂料系统耐久美观的重要基础环节。",
  technicalSpecs: [{ label: "类型", value: "内/外墙底漆" }, { label: "功能", value: "抗碱、增强附着力、抗反渗" }, { label: "应用", value: "面漆前的底层" }],
  whyChoose: [WHY, { icon: "🛡️", title: "耐久基底", desc: "抗碱，增强附着力与涂层寿命。" }],
  projectShowcase: SHOW,
});
export const DULUX_PRO_SERIES_META: Record<string, SeriesMeta> = {
  interior: INTERIOR, exterior: EXTERIOR, primer: PRIMER,
  "real-stone": mk({
    story: "多乐士专业真石漆（真石漆）—— 再现天然石材效果（花岗岩、真石）用于高端外立面，纹色多样。",
    heritage: "真石漆以合理成本呈现天然石材之美。",
    technicalSpecs: [{ label: "类型", value: "真石漆（real stone）" }, { label: "效果", value: "天然石纹、花岗岩" }, { label: "应用", value: "外立面、高端装饰饰面" }],
    whyChoose: [WHY, { icon: "🪨", title: "媲美真石", desc: "天然石材效果，外立面尽显高雅。" }, { icon: "☀️", title: "户外耐久", desc: "耐候，美观持久。" }],
    projectShowcase: SHOW,
  }),
  texture: mk({
    story: "多乐士专业艺术质感漆（质感/岩彩/浮雕）—— 装饰性表面效果（质感、浮雕纹理、堆塑）打造令人印象深刻的空间。",
    heritage: "艺术涂料营造高端美学亮点。",
    technicalSpecs: [{ label: "类型", value: "艺术质感/堆塑涂料" }, { label: "效果", value: "质感、浮雕纹理、堆塑" }, { label: "应用", value: "内 / 外墙装饰亮点" }],
    whyChoose: [WHY, { icon: "✨", title: "高美学", desc: "独特而高雅的表面效果。" }, { icon: "🖌️", title: "多效果", desc: "多种纹理与层次满足个性化设计。" }],
    projectShowcase: SHOW,
  }),
  mineral: mk({
    story: "多乐士专业无机矿物漆（无机矿物）—— 无机矿物基环保配方，透气、色彩持久、抗碱性佳，适用于内/外墙。",
    heritage: "无机矿物系列提供可持续的涂料解决方案。",
    technicalSpecs: [{ label: "类型", value: "无机矿物漆" }, { label: "特性", value: "透气、色彩持久、环保" }, { label: "应用", value: "内/外墙、可持续工程" }],
    whyChoose: [WHY, { icon: "🌱", title: "可持续", desc: "无机矿物基，透气环保。" }, { icon: "🧱", title: "色彩持久", desc: "抗碱化，色彩保持持久。" }],
    projectShowcase: SHOW,
  }),
  metal: mk({
    story: "多乐士专业金属效果漆 —— 金属光泽效果涂层，用于高端外立面与装饰。",
    heritage: "金属漆带来独特的美学效果。",
    technicalSpecs: [{ label: "类型", value: "金属效果漆（水性）" }, { label: "效果", value: "装饰性金属光泽" }, { label: "应用", value: "外立面、高端亮点" }],
    whyChoose: [WHY, { icon: "🥇", title: "金属光泽高雅", desc: "独特金属效果，适合高端工程。" }],
    projectShowcase: SHOW,
  }),
  waterproof: mk({
    story: "多乐士专业防水 —— 用于墙面、屋面、潮湿区的防水涂料/解决方案；保护工程免受渗漏侵害。",
    heritage: "防水系列保护工程。",
    technicalSpecs: [{ label: "类型", value: "防水涂料/解决方案" }, { label: "特性", value: "弹性、附着力、耐水" }, { label: "应用", value: "墙面、屋面、潮湿区" }],
    whyChoose: [WHY, { icon: "💧", title: "持久防水", desc: "封闭水分的涂层，保护结构。" }],
    projectShowcase: SHOW,
  }),
  other: INTERIOR,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DULUX_PRO_SERIES_META[seriesOriginal.trim()] || DULUX_PRO_SERIES_META.interior;
}
