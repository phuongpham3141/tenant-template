/**
 * 3TREES 三棵树（SKSHU）涂料元数据 —— 产品详情页。Keyed by seriesOriginal（catKey）。
 * 来源：3treesgroup.com —— SKSHU Paint（三棵树涂料，上海上市 603737）。
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
const CERTS = ["涂料与防水的中国国家标准（GB）", "绿色环境标志（十环）", "低 VOC 含量 / 净味", "ISO 9001 / ISO 14001"];
const MFG = [
  "3TREES 三棵树（SKSHU Paint）—— 中国最大的涂料企业之一，上海上市代码 603737，2002 年成立于福建",
  "产品线：内外墙漆、仿石漆、艺术漆、防水、胶粘剂、美缝剂、腻子",
  "聚焦绿色涂料—净味—低 VOC；多款抗菌/防霉/吸附甲醛系列",
  "按国家标准建立研发与质量检测体系",
];
const PACK = [
  { label: "规格", value: "按系列分桶（如 18L、5L）；胶按支/桶" },
  { label: "起订量", value: "按集装箱 / 托盘计；可混装多型号" },
  { label: "仓储", value: "阴凉干燥处，避免日晒与冰冻；用后密封" },
];
const INSTALL = [
  "基层处理需洁净、干燥、平整；面漆前先批腻子并涂底漆",
  "按规定用量与道数施工，各道间留足干燥时间",
  "按推荐比例稀释；使用前搅拌均匀",
  "防水：多道施工，覆盖前做蓄水试验验收",
];
const CARE = [
  { title: "仓储", desc: "密封存放于阴凉干燥处，避免日晒 / 冰冻；在保质期内用完。" },
  { title: "施工", desc: "遵守温湿度条件；雨天或高湿环境下勿施工。" },
  { title: "清洁", desc: "水性涂料用后立即用清水清洗工具。" },
];
const FAQ = [
  { q: "3TREES 涂料有环保标志吗？", a: "有。多款产品获绿色标志、净味、低 VOC；按产品提供技术资料。" },
  { q: "可按项目类型提供涂料/防水选型建议吗？", a: "可以。请告知项目类型（内 / 外墙、屋面、卫生间……），即可获得合适系列的建议。" },
  { q: "起订量与交货时间？", a: "按集装箱 / 托盘计；交期按订单确认。" },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🌳", title: "中国领先绿色涂料", desc: "3TREES —— 大型涂料品牌，聚焦健康与环保。" };
const SHOW = ["住宅、公寓、别墅", "商业及公共工程", "精装交付与改造项目"];
const INTERIOR = mk({
  story: "3TREES 内墙漆 —— 净味、低 VOC 的内墙乳胶漆，多款抗菌/防霉/吸附甲醛系列，遮盖力佳、色彩持久。",
  heritage: "内墙漆是 3TREES 聚焦健康涂料的核心系列。",
  technicalSpecs: [{ label: "类型", value: "内墙乳胶漆（latex）" }, { label: "特性", value: "净味、低 VOC、抗菌/防霉（视系列）" }, { label: "应用", value: "室内墙面与顶棚" }],
  whyChoose: [WHY, { icon: "🌬️", title: "净味安全", desc: "低 VOC，部分系列吸附甲醛，室内安全。" }, { icon: "🎨", title: "色彩持久、遮盖力佳", desc: "遮盖力高，色泽持久美观，易擦洗。" }],
  projectShowcase: SHOW,
});
export const TREES_SERIES_META: Record<string, SeriesMeta> = {
  interior: INTERIOR,
  exterior: mk({
    story: "3TREES 外墙漆 —— 耐候、抗积尘、风吹雨打下色彩持久，保护建筑外立面。",
    heritage: "外墙系列保护并美化建筑外立面。",
    technicalSpecs: [{ label: "类型", value: "外墙乳胶漆" }, { label: "特性", value: "耐候、抗积尘、色彩持久" }, { label: "应用", value: "外墙、外立面" }],
    whyChoose: [WHY, { icon: "☀️", title: "耐候", desc: "经受日晒雨淋，不易褪色，防霉防藻。" }, { icon: "🧱", title: "保护墙体", desc: "保护外立面，延长工程寿命。" }],
    projectShowcase: SHOW,
  }),
  "faux-stone": mk({
    story: "3TREES 仿石漆（天彩石）—— 为外立面再现天然石材效果，纹色多样，经济地替代石材干挂。",
    heritage: "仿石漆以合理成本呈现天然石材之美。",
    technicalSpecs: [{ label: "类型", value: "仿石漆（faux stone）" }, { label: "效果", value: "多样天然石纹" }, { label: "应用", value: "外立面、装饰饰面" }],
    whyChoose: [WHY, { icon: "🪨", title: "媲美真石", desc: "天然石材效果，外立面尽显高雅。" }, { icon: "💰", title: "经济", desc: "替代石材干挂，轻质且成本合理。" }],
    projectShowcase: SHOW,
  }),
  artistic: mk({
    story: "3TREES 艺术漆 —— 高端装饰性表面效果（质感、纹理、金属）打造令人印象深刻的内外空间。",
    heritage: "艺术漆营造高端美学亮点。",
    technicalSpecs: [{ label: "类型", value: "装饰艺术漆" }, { label: "效果", value: "质感、纹理、金属（视系列）" }, { label: "应用", value: "内 / 外墙装饰亮点" }],
    whyChoose: [WHY, { icon: "✨", title: "高美学", desc: "独特而高雅的表面效果。" }, { icon: "🖌️", title: "多效果", desc: "多种纹理与色彩满足个性化设计。" }],
    projectShowcase: SHOW,
  }),
  waterproof: mk({
    story: "3TREES 防水 —— 防水涂料与卷材（JS 聚合物水泥、自粘卷材、柔性涂料）用于屋面、墙面、卫生间、地下室。",
    heritage: "防水系列保护工程免受渗漏侵害。",
    technicalSpecs: [{ label: "类型", value: "防水涂料/卷材（JS、自粘、弹性）" }, { label: "特性", value: "弹性、附着力好、耐水" }, { label: "应用", value: "屋面、墙面、卫生间、地下室" }],
    whyChoose: [WHY, { icon: "💧", title: "持久防水", desc: "封闭水分的涂层，随结构伸缩。" }, { icon: "🏠", title: "多场景", desc: "适用于屋面、墙面、潮湿区、地下室。" }],
    projectShowcase: SHOW,
  }),
  joint: mk({
    story: "3TREES 美缝剂 —— 填缝美观，防水防污，色彩多样（含金属色），美化并保护瓷砖填缝。",
    heritage: "美缝剂完善并保护瓷砖填缝。",
    technicalSpecs: [{ label: "类型", value: "美缝剂（环氧/PU）" }, { label: "特性", value: "防水、防污、多种颜色" }, { label: "应用", value: "瓷砖填缝、地面" }],
    whyChoose: [WHY, { icon: "✨", title: "缝隙美观洁净", desc: "填缝美观，防止积污与霉变。" }, { icon: "🌈", title: "色彩多样", desc: "多种颜色含金属色，适配各类瓷砖。" }],
    projectShowcase: SHOW,
  }),
  adhesive: mk({
    story: "3TREES 胶粘剂（免钉胶等）—— 免钉多功能胶粘剂，粘接力强，让室内装修施工快捷利落。",
    heritage: "胶粘剂助力便捷的装修收尾施工。",
    technicalSpecs: [{ label: "类型", value: "多功能胶粘剂 / 免钉胶" }, { label: "特性", value: "粘接力强，适用多种材料" }, { label: "应用", value: "粘贴线条、踢脚线、装饰件" }],
    whyChoose: [WHY, { icon: "🔩", title: "免钉", desc: "无需钻孔即可牢固粘贴，利落快捷。" }],
    projectShowcase: SHOW,
  }),
  primer: mk({
    story: "3TREES 底漆 —— 形成附着力强的底层，抗碱、防返潮渗透，提升面漆的耐久性。",
    heritage: "底漆是保证涂装系统经久耐用的重要基础工序。",
    technicalSpecs: [{ label: "类型", value: "内/外墙底漆" }, { label: "功能", value: "抗碱、增强附着力、防返潮渗透" }, { label: "应用", value: "面漆前的底层" }],
    whyChoose: [WHY, { icon: "🛡️", title: "稳固基底", desc: "抗碱，增强附着力并延长面漆寿命。" }],
    projectShowcase: SHOW,
  }),
  floor: mk({
    story: "3TREES 地坪漆 —— 超耐用环氧/PU 地坪漆，适用于工业地面、厂房、车库：耐磨损、易清洁。",
    heritage: "地坪漆面向工业与商业工程。",
    technicalSpecs: [{ label: "类型", value: "环氧 / PU 地坪漆" }, { label: "特性", value: "超耐用、耐磨损、易清洁" }, { label: "应用", value: "厂房、车库、仓库、工业地面" }],
    whyChoose: [WHY, { icon: "🏭", title: "超耐用", desc: "耐磨损、承重强，适用于工业地面。" }],
    projectShowcase: SHOW,
  }),
  putty: mk({
    story: "3TREES 腻子与砂浆 —— 找平墙面的腻子、专用砂浆，为涂装收尾打底。",
    heritage: "腻子与砂浆是涂装系统的找平基础。",
    technicalSpecs: [{ label: "类型", value: "墙面腻子 / 砂浆" }, { label: "功能", value: "找平、基层粘结" }, { label: "应用", value: "涂装前的表面处理" }],
    whyChoose: [WHY, { icon: "🧱", title: "平整细腻的基底", desc: "打造平整细腻的表面，成就漂亮的涂层。" }],
    projectShowcase: SHOW,
  }),
  tool: mk({
    story: "3TREES 施工工具 —— 滚筒、底漆/面漆施工工具，助力高效施工。",
    heritage: "配套工具服务于整套涂装施工。",
    technicalSpecs: [{ label: "类型", value: "施工工具（滚筒等）" }, { label: "功能", value: "高效、均匀的涂装施工" }],
    whyChoose: [WHY, { icon: "🧰", title: "高效施工", desc: "配套工具让涂层均匀、施工迅速。" }],
    projectShowcase: SHOW,
  }),
  insulation: mk({
    story: "3TREES 保温材料 —— 岩棉条及墙体保温系统材料，用于涂装—保温一体化施工系统。",
    heritage: "外墙系统材料，服务于保温—涂装一体化方案。",
    technicalSpecs: [{ label: "类型", value: "保温材料（岩棉）" }, { label: "功能", value: "保温、防火" }, { label: "应用", value: "外墙外保温系统" }],
    whyChoose: [WHY, { icon: "🔥", title: "保温防火", desc: "岩棉为墙体提供保温与防火性能。" }],
    projectShowcase: SHOW,
  }),
  other: INTERIOR,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TREES_SERIES_META[seriesOriginal.trim()] || TREES_SERIES_META.interior;
}
