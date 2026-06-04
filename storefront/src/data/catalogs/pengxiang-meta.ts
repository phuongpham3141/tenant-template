/**
 * 鹏翔 (Pengxiang) 人造石元数据 — 详情页。按 seriesOriginal (quartz/marble/onyx/terrazzo) 索引。
 * 货源：px-stone.com —— 福建鹏翔实业（Fujian Pengxiang Industrial），福建南安。
 * 鹏翔是德盛石材（越南法人主体）的母集团。
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
const CERTS = ["ISO 9001 —— 质量管理体系", "无放射性材料认证", "吸水率、抗弯强度、耐磨性检测", "环保材料（低 VOC 树脂）"];
const MFG = [
  "福建鹏翔实业（Fujian Pengxiang Industrial）—— 成立于 2006 年，位于福建南安（中国石材之都）",
  "领先的人造石制造商：人造大理石、石英石（quartz）、玉石（onyx）、水磨石（terrazzo）",
  "德盛石材（越南法人主体，乂安工厂）的母集团",
  "人造石由约 90% 石粉 / 石英粉 + 树脂压制而成；大规格板材，可按需切割",
];
const PACK = [
  { label: "包装", value: "A 字铁架 + 护角 + 缠绕膜；出口采用木箱" },
  { label: "板材规格", value: "3200×1600mm / 2400×1600mm + 可按需切割" },
  { label: "厚度", value: "12 – 30mm（视系列而定）" },
  { label: "起订量", value: "按集装箱计；支持多色 / 多规格混装" },
];
const INSTALL = [
  "加工前进行测量并制定排版图（nesting），优化石纹衔接",
  "CNC 切割 + 边缘打磨；接缝处使用人造石专用胶",
  "确保支撑面平整、受力均匀；大跨度处加固",
  "安装后清洁并抛光接缝",
];
const CARE = [
  { title: "日常清洁", desc: "用软布加温水 / 中性清洁剂擦拭。避免强力清洁剂及高浓度酸 / 碱。" },
  { title: "预防保养", desc: "切割及放置热锅时使用砧板 / 隔热垫；避免骤冷骤热。" },
  { title: "污渍处理", desc: "顽固污渍使用温和清洁液加不伤表面的清洁垫处理；随后立即擦净。" },
];
const FAQ = [
  { q: "鹏翔石材可否按需切割尺寸？", a: "可以。支持按尺寸切割（cut-to-size）并按图纸进行边缘加工。" },
  { q: "与德盛石材是什么关系？", a: "鹏翔是母集团；德盛石材是越南法人主体（乂安工厂），共享同一产品体系。" },
  { q: "起订量与交期？", a: "按集装箱计；交期随订单确认。" },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const SHOW = ["公寓与别墅厨房台面", "高端室内墙面与地面铺贴", "酒店大堂、商用外立面"];
const QUARTZ = mk({
  story: "鹏翔人造石英石（engineered quartz）—— 由约 90% 石英粉 + 树脂压制而成：硬度高、耐刮擦、防渗透、耐酸。适用于厨房台面、台盆面、地面、墙面铺贴。",
  heritage: "石英石凭借耐用且无孔的表面，是最受欢迎的厨房台面人造石系列。",
  technicalSpecs: [{ label: "材质", value: "石英粉约 90% + 树脂" }, { label: "板材规格", value: "3200×1600 / 3000×1600 mm" }, { label: "厚度", value: "12 – 30 mm" }, { label: "表面", value: "抛光 / 哑光" }, { label: "特性", value: "耐酸、耐污、耐热、耐刮擦" }],
  whyChoose: [{ icon: "💎", title: "坚硬耐用", desc: "硬度高于天然石材，耐刮擦，少维护。" }, { icon: "🛡️", title: "不渗透", desc: "表面无孔，不渗水 / 渗油。" }, { icon: "🎨", title: "纹色丰富", desc: "多种色调及 Calacatta 金纹系列。" }],
  projectShowcase: SHOW,
});
const MARBLE = mk({
  story: "鹏翔人造大理石（engineered/artificial marble）—— 高度还原天然大理石纹理，且均匀度高、易于加工、价格合理，适用于墙面、地面、室内装饰。",
  heritage: "人造大理石纹理美观均匀、瑕疵少，适用于大面积铺贴。",
  technicalSpecs: [{ label: "材质", value: "天然石材 + 大理石粉 + 树脂" }, { label: "板材规格", value: "3200×1600 / 2400×1600 mm + 可按需切割" }, { label: "厚度", value: "12 – 30 mm" }, { label: "表面", value: "抛光 / 哑光" }, { label: "适用场景", value: "墙面、地面、卫浴、大堂" }],
  whyChoose: [{ icon: "🏛️", title: "大理石之美", desc: "大理石纹理高雅，大面积铺贴均匀一致。" }, { icon: "✂️", title: "易于加工", desc: "切割 / 拼接灵活，损耗低于天然石块。" }, { icon: "💰", title: "性价比高", desc: "在同等美学效果下价格优于天然大理石。" }],
  projectShowcase: SHOW,
});
export const PENGXIANG_SERIES_META: Record<string, SeriesMeta> = {
  quartz: QUARTZ, marble: MARBLE, other: MARBLE,
  onyx: mk({
    story: "鹏翔人造玉石（onyx）—— 具备透光（translucent）效果与独特玉石纹理，适用于点缀项目、背光隔断、吧台。",
    heritage: "人造玉石再现天然玉石的梦幻之美，且耐用性更高。",
    technicalSpecs: [{ label: "材质", value: "矿物粉 + 树脂（玉石效果）" }, { label: "特性", value: "玉石纹理，部分系列具备透光（backlit）效果" }, { label: "适用场景", value: "点缀隔断、吧台、装饰台面" }],
    whyChoose: [{ icon: "✨", title: "透光效果", desc: "背光（backlit）照射时尤为出彩、高雅。" }, { icon: "🎨", title: "纹理独特", desc: "玉石纹理梦幻，每块板材各具特色。" }],
    projectShowcase: SHOW,
  }),
  terrazzo: mk({
    story: "鹏翔人造水磨石（terrazzo）—— 石粒 / 玻璃粒均匀分布于基底，呈现现代水磨石风格，适用于地面、墙面、台面。",
    heritage: "水磨石凭借耐用与美观重回现代设计潮流。",
    technicalSpecs: [{ label: "材质", value: "石粒 / 玻璃粒 + 树脂 / 水泥基底" }, { label: "效果", value: "水磨石撒粒效果，多彩" }, { label: "适用场景", value: "地面、墙面、台面" }],
    whyChoose: [{ icon: "🎯", title: "水磨石风格", desc: "现代撒粒效果，契合设计潮流。" }, { icon: "💪", title: "坚固耐用", desc: "耐磨性佳，适用于高客流地面。" }],
    projectShowcase: SHOW,
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return PENGXIANG_SERIES_META[seriesOriginal.trim()] || PENGXIANG_SERIES_META.marble;
}
