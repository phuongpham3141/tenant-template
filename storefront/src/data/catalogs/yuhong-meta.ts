/**
 * Yuhong 东方雨虹 各防水材料系列元数据 —— 产品详情页。
 * Keyed by seriesOriginal (key: "membrane-poly","membrane-bitumen","membrane-sa","pu","water","bitumen-coat","rigid").
 *
 * 来源：yuhong.com.cn —— 北京东方雨虹（BOWS，SZSE 002271），
 * 中国最大的防水材料制造商。
 */
export type SeriesMeta = {
  story: string; heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[];
  careGuide: { title: string; desc: string }[];
  installation: string[]; certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[]; faq: { q: string; a: string }[];
};
const CERTS = [
  "防水卷材与涂料的中国国家标准（GB）",
  "ISO 9001 / ISO 14001 / ISO 45001",
  "绿色产品认证，低 VOC 含量",
  "中国驰名商标",
];
const MFG = [
  "北京东方雨虹 东方雨虹（SZSE 002271）—— 中国最大的防水材料制造商，成立于 1995 年",
  "在中国设有数十个生产基地；拥有国家级研发与检测实验室体系",
  "沥青/高分子卷材及涂料自动化生产线；按批次质量管控",
  "供应高铁、机场、地铁、水库等重大基础设施项目",
];
const PACK = [
  { label: "卷材", value: "卷宽 1m，长 10–20m/卷；托盘缠膜" },
  { label: "涂料/coating", value: "20kg/桶（或按厂商规格）" },
  { label: "起订量", value: "按集装箱计；可混装多型号" },
  { label: "仓储", value: "阴凉干燥处，避免日晒；卷材竖放，涂料密封" },
];
const INSTALL = [
  "施工前基面处理需洁净、干燥、平整、无灰尘油污",
  "热熔/粘贴卷材：按说明热熔或撕除自粘隔离层；搭接边足够宽",
  "涂料：按用量多道施工，各道间留足干燥时间",
  "做保护层/铺贴前进行蓄水试验验收",
];
const CARE = [
  { title: "仓储", desc: "存放于干燥处，避免日晒高温与火源（沥青卷材）。涂料密封防止结皮。" },
  { title: "施工", desc: "遵守推荐用量与施工温度；雨天/高湿环境下勿施工。" },
  { title: "验收", desc: "检查搭接边、阴阳角、管根；覆盖前做蓄水试验。" },
];
const FAQ = [
  { q: "雨虹材料有进口用的 GB 标准吗？", a: "有。提供适用标准（GB）+ 检测报告；华越供应链协助进口单证。" },
  { q: "可按项目类型提供防水系统选型建议吗？", a: "可以。请告知项目类型（屋面、地下室、卫生间、水池……），即可获得合适的卷材/涂料建议。" },
  { q: "起订量与交货时间？", a: "按集装箱计；交期按订单确认。" },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🏆", title: "中国防水第一品牌", desc: "行业领军品牌，应用于国家级重大基础设施项目。" };
const SHOW = ["鸟巢体育场（Bird's Nest）", "高铁与地铁", "机场、水库、地铁隧道"];

export const YUHONG_SERIES_META: Record<string, SeriesMeta> = {
  "membrane-poly": mk({
    story: "雨虹高分子防水卷材（TPO、HDPE/PMH、PME）—— 化学与力学耐久性高，热焊密封，用于屋面、地下室、水库及预铺（pre-applied）项目。",
    heritage: "高分子系列是高耐久、长寿命工程的现代化解决方案。",
    technicalSpecs: [
      { label: "材料", value: "TPO / HDPE / PE 高分子" },
      { label: "常见厚度", value: "1.2 – 2.0 mm" },
      { label: "连接", value: "热焊接 / 基层自粘" },
      { label: "应用", value: "屋面、地下室、水库、预铺" },
    ],
    whyChoose: [WHY,
      { icon: "🔥", title: "热焊密封", desc: "热焊接缝一体化，耐久且密封防水。" },
      { icon: "🛡️", title: "耐化学", desc: "耐环境与老化性能好，寿命长。" }],
    projectShowcase: SHOW,
  }),
  "membrane-bitumen": mk({
    story: "雨虹 SBS/APP 改性沥青卷材（太空堡 TKB、PMB、ARC 系列）—— 高弹性、耐高低温、热熔施工，用于屋面、地下室、承重项目。",
    heritage: "改性沥青卷材是雨虹用于民用与基础设施工程的传统主力产品。",
    technicalSpecs: [
      { label: "材料", value: "SBS / APP 改性沥青，聚酯/玻纤增强" },
      { label: "厚度", value: "3 mm / 4 mm" },
      { label: "施工", value: "热熔（torch-on）" },
      { label: "特性", value: "弹性、耐宽温域、耐根穿刺（ARC）" },
    ],
    whyChoose: [WHY,
      { icon: "🌡️", title: "耐宽温域", desc: "高温与严寒下均具良好弹性（专用系列）。" },
      { icon: "🌿", title: "耐根穿刺", desc: "ARC 系列阻挡植物根系穿刺，适用于绿化屋面。" }],
    projectShowcase: SHOW,
  }),
  "membrane-sa": mk({
    story: "雨虹自粘卷材（TKB 2xx/3xx/4xx、SAM）—— 撕膜冷粘、无需明火、施工安全，可冷粘/湿铺，用于地下室、卫生间、屋面。",
    heritage: "自粘技术使施工快速、安全，适合封闭空间。",
    technicalSpecs: [
      { label: "材料", value: "自粘改性沥青，有胎/无胎" },
      { label: "施工", value: "撕膜冷粘 / 湿铺（wet-lay）" },
      { label: "优点", value: "无需明火、安全、快速" },
      { label: "应用", value: "地下室、卫生间、屋面" },
    ],
    whyChoose: [WHY,
      { icon: "🧊", title: "冷粘安全", desc: "无需明火，可在封闭空间安全施工。" },
      { icon: "⏱️", title: "施工快速", desc: "撕除隔离层即贴，节省时间。" }],
    projectShowcase: SHOW,
  }),
  pu: mk({
    story: "雨虹聚氨酯（PU）防水涂料（SPU、GES）—— 无缝高弹涂膜、附着力好，用于屋面、露台、卫生间、复杂结构。",
    heritage: "PU 涂料形成无缝涂层，适合细节繁多的基面。",
    technicalSpecs: [
      { label: "类型", value: "单组分 / 双组分聚氨酯" },
      { label: "特性", value: "高弹性、无缝、附着力好" },
      { label: "施工", value: "按用量多道滚涂/刷涂" },
      { label: "应用", value: "屋面、露台、卫生间、阳台" },
    ],
    whyChoose: [WHY,
      { icon: "🎯", title: "无缝", desc: "无接缝，封闭管根与复杂边角。" },
      { icon: "💪", title: "高弹性", desc: "随结构伸缩，抵抗基层裂纹。" }],
    projectShowcase: SHOW,
  }),
  water: mk({
    story: "雨虹水性防水涂料（JS/JSA 聚合物水泥、HCA 丙烯酸、VPC）—— 环保、可潮湿基面施工，用于卫生间、水池、外墙。",
    heritage: "水性系列安全、少味，适合室内民用工程。",
    technicalSpecs: [
      { label: "类型", value: "聚合物水泥（JS/JSA）/ 丙烯酸（HCA）/ 透汽（VPC）" },
      { label: "特性", value: "水性、少味、可潮湿基面施工" },
      { label: "应用", value: "卫生间、水池、外墙、阳台" },
    ],
    whyChoose: [WHY,
      { icon: "🌱", title: "环保", desc: "水性、低 VOC，室内施工安全。" },
      { icon: "💧", title: "潮湿基面附着", desc: "可在潮湿基层施工，适合潮湿区域。" }],
    projectShowcase: SHOW,
  }),
  "bitumen-coat": mk({
    story: "雨虹沥青基防水涂料（PBC 非固化、BBC、BCW）—— 附着力极强、自愈破损，用于地下室、道桥、埋地项目。",
    heritage: "非固化沥青涂料形成永久柔性层，自封闭微裂纹。",
    technicalSpecs: [
      { label: "类型", value: "非固化橡胶沥青（PBC）/ 水性（BCW）" },
      { label: "特性", value: "附着力强、永久柔性、自愈" },
      { label: "应用", value: "地下室、道桥、埋地项目" },
    ],
    whyChoose: [WHY,
      { icon: "🩹", title: "自愈裂纹", desc: "非固化柔性层自封闭微裂纹与破洞。" },
      { icon: "🧲", title: "附着力强", desc: "牢固粘结混凝土，与卷材配合良好。" }],
    projectShowcase: SHOW,
  }),
  rigid: mk({
    story: "雨虹刚性防水（PCC 水泥渗透结晶型）—— 深入渗透混凝土，生成结晶封堵毛细孔，从内部防水，用于水池、地下室、水库。",
    heritage: "渗透结晶技术自封闭混凝土，长效且能自修复微裂纹。",
    technicalSpecs: [
      { label: "类型", value: "水泥渗透结晶型（crystalline）" },
      { label: "机理", value: "在混凝土中生成结晶封堵毛细孔" },
      { label: "应用", value: "水池、地下室、水库、混凝土结构" },
    ],
    whyChoose: [WHY,
      { icon: "💎", title: "结晶自封堵", desc: "结晶在混凝土内部生长，从内部防水。" },
      { icon: "♻️", title: "自修复", desc: "遇水再结晶，封堵新生微裂纹。" }],
    projectShowcase: SHOW,
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return YUHONG_SERIES_META[seriesOriginal.trim()] || YUHONG_SERIES_META["membrane-bitumen"];
}
