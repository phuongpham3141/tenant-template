/**
 * 广日电梯 (Guangri) 元数据 — 详情页。按 seriesOriginal (home-cabin/home-elevator/escalator) 索引。
 * 货源：guangri.com.cn —— 广州广日电梯（Guangzhou Guangri Elevator）。
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
const CERTS = ["中国国家电梯安全标准（GB 7588）", "ISO 9001 质量管理体系", "电梯安全检验与竣工验收", "安装与维保认证"];
const MFG = [
  "广日电梯（广州）—— 中国大型电梯制造商之一",
  "产品系列：乘客电梯、家用电梯、自动扶梯与自动人行道、载货电梯、医用电梯、消防电梯",
  "覆盖全国的安装、维保与技术服务体系",
  "为家用电梯提供多种高端轿厢设计方案",
];
const PACK = [
  { label: "供应方式", value: "整机电梯 + 按项目安装" },
  { label: "轿厢可选", value: "多种轿厢内饰设计款式" },
  { label: "服务", value: "勘测、安装、维保、升级改造" },
];
const INSTALL = [
  "选型前先勘测底坑（pit）、提升行程及载重",
  "由受训技术团队安装；按标准进行安全验收",
  "规范完成电气接线、救援系统及门联动",
  "投入使用前进行试运行与安全检验",
];
const CARE = [
  { title: "定期维保", desc: "按计划维保（通常每月）：检查钢丝绳 / 导轨、制动器、门、控制系统并润滑。" },
  { title: "安全", desc: "按规定定期进行安全检验；运行出现异常时立即处理。" },
  { title: "轿厢清洁", desc: "使用适配材质（不锈钢 / 玻璃 / 木材）的清洁剂清洁轿厢表面。" },
];
const FAQ = [
  { q: "广日是否在越南提供安装与维保支持？", a: "请联系华越供应链，获取适配项目的供货、安装及技术服务方案咨询。" },
  { q: "是否可按需定制轿厢设计？", a: "提供多款高端轿厢；可根据工程的室内风格提供选型建议。" },
  { q: "交货与安装周期？", a: "视配置与项目而定；具体周期按实际勘测确认。" },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🛗", title: "知名电梯品牌", desc: "广日 —— 信誉良好的中国电梯制造商，产品系列齐全。" };
export const GUANGRI_SERIES_META: Record<string, SeriesMeta> = {
  "home-cabin": mk({
    story: "广日家用电梯轿厢款式 —— 高端轿厢内饰设计系列（罗曼、哥特、水木清华等），适用于别墅与联排住宅电梯，提升空间美学。",
    heritage: "轿厢设计是家用电梯的点睛之笔 —— 广日提供多种装饰风格。",
    technicalSpecs: [{ label: "类型", value: "家用电梯轿厢（轿厢）" }, { label: "风格", value: "多款：古典、现代、艺术" }, { label: "材质", value: "高端不锈钢 / 玻璃 / 木质装饰" }],
    whyChoose: [WHY, { icon: "🎨", title: "风格多样", desc: "多款轿厢设计，搭配各类室内风格。" }, { icon: "💎", title: "高端品质", desc: "高档材质与工艺，适配别墅。" }],
    projectShowcase: ["高端别墅与联排住宅", "顶层复式（Penthouse）", "多层住宅工程"],
  }),
  "home-elevator": mk({
    story: "广日家用电梯 —— 面向别墅、联排住宅的电梯解决方案：运行平稳、节能省电、占地小，并提供多种轿厢可选。",
    heritage: "家用电梯是顺应多层住宅需求而蓬勃发展的产品线。",
    technicalSpecs: [{ label: "类型", value: "家用电梯（家用电梯）" }, { label: "适用场景", value: "别墅、联排住宅" }, { label: "优势", value: "平稳、节能、占地小" }],
    whyChoose: [WHY, { icon: "🏡", title: "适合住宅", desc: "设计紧凑，适配室内小井道。" }, { icon: "🔇", title: "运行平稳", desc: "平稳驱动技术，节能省电。" }],
    projectShowcase: ["别墅", "多层联排住宅", "家庭住宅"],
  }),
  escalator: mk({
    story: "广日自动扶梯与自动人行道 —— 适用于购物中心、地铁站、机场及大客流公共建筑。",
    heritage: "自动扶梯与自动人行道是广日公共交通领域的主力产品线。",
    technicalSpecs: [{ label: "类型", value: "自动扶梯 / 自动人行道" }, { label: "适用场景", value: "购物中心、火车站、机场、公共场所" }, { label: "特性", value: "大运量、连续安全运行" }],
    whyChoose: [WHY, { icon: "🏬", title: "适配大型工程", desc: "满足购物中心、车站、机场的高客流。" }, { icon: "🛡️", title: "安全可靠", desc: "符合标准的安全系统与紧急制停。" }],
    projectShowcase: ["购物中心", "地铁站与机场", "公共建筑"],
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return GUANGRI_SERIES_META[seriesOriginal.trim()] || GUANGRI_SERIES_META["home-cabin"];
}
