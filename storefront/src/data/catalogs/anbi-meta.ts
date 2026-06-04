/**
 * 安彼卫浴 ANBI 卫浴洁具元数据 — 产品详情页。
 * 以 seriesOriginal 为键（catKey："smart-toilet"、"toilet"、"basin"、"faucet"、"cabinet" 等）。
 * 来源：anbichina.com — 型号 + 真实尺寸；材质描述遵循卫生陶瓷行业标准。
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
const CERTS = ["卫生陶瓷与龙头中国国家标准（GB）", "ISO 9001 质量管理", "防污釉面，易清洁", "耐用性与密封性检测"];
const MFG = [
  "安彼卫浴 ANBI — 中国卫浴洁具品牌（卫生陶瓷、龙头、浴室柜、淋浴房）",
  "全套浴室产品线：马桶（普通与智能）、洗手盆、小便器、浴室柜、龙头、浴缸",
  "高温烧制陶瓷，防污釉面；龙头采用铜/合金镀铬",
  "按批次质量管控：密封测试、冲水测试、釉层/镀层耐用性",
];
const PACK = [
  { label: "包装", value: "纸箱 + 定型泡沫，保护陶瓷釉面" },
  { label: "起订量", value: "按整柜计；可混搭多种型号" },
  { label: "随附配件", value: "排水件、密封圈、安装螺栓，按产品配套" },
  { label: "存储", value: "干燥处存放，避免磕碰釉面边缘，直立放置" },
];
const INSTALL = [
  "安装前检查排污中心距/预留尺寸（rough-in）与产品匹配",
  "使用专用密封圈/硅胶，均匀拧紧螺栓，避免陶瓷开裂",
  "按规范连接进水与排水；安装后进行冲水/密封测试",
  "智能马桶：确保电源与水源符合要求，并做好接地",
];
const CARE = [
  { title: "清洁", desc: "用软布加中性清洁剂擦拭。防污釉面便于清洁；避免使用研磨粉与强酸。" },
  { title: "龙头保养", desc: "定期清洁出水头防止水垢；检查密封圈以防渗漏。" },
  { title: "智能马桶", desc: "按说明清洁喷嘴与滤网；检查电源安全。" },
];
const FAQ = [
  { q: "安彼产品是否配齐安装配件？", a: "是。每件产品均配套相应的排水件/密封圈/螺栓；华越可提供 rough-in 预留尺寸咨询。" },
  { q: "马桶的预留尺寸（rough-in）如何？", a: "各产品均标注长×宽×高尺寸；排污中心距为标准值，请按型号确认。" },
  { q: "起订量与交期？", a: "按整柜计；交期按订单另行通知。" },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const SHOW = ["酒店与服务式公寓", "民用住宅、别墅", "商业与公共工程"];
const WHY = { icon: "🛁", title: "全套浴室方案", desc: "马桶、洗手盆、龙头、浴室柜配套——一站式供应。" };
const TOILET = mk({
  story: "安彼马桶——高温烧制卫生陶瓷，防污釉面，连体式/壁挂式现代款，冲水安静且节水。",
  heritage: "马桶是安彼的核心产品线，款式与尺寸丰富，适配各种空间。",
  technicalSpecs: [{ label: "材质", value: "高级卫生陶瓷，防污釉面" }, { label: "款式", value: "连体式 / 壁挂式" }, { label: "尺寸", value: "按各型号标注（长×宽×高）" }],
  whyChoose: [WHY, { icon: "💧", title: "静音节水", desc: "高效冲水技术，噪音低，节约用水。" }, { icon: "✨", title: "防污釉面", desc: "釉面光滑，清洁迅速，不易积污。" }],
  projectShowcase: SHOW,
});
const BASIN = mk({
  story: "安彼洗手盆——艺术陶瓷及台上盆/立柱盆，款式多样，适用于浴室洗手盆与台面。",
  heritage: "艺术台盆系列为浴室空间增添美学亮点。",
  technicalSpecs: [{ label: "材质", value: "高级卫生陶瓷" }, { label: "安装方式", value: "台上 / 台下 / 立柱" }, { label: "尺寸", value: "按各型号标注" }],
  whyChoose: [WHY, { icon: "🎨", title: "美观出众", desc: "款式多样，釉面精美，易于搭配室内装饰。" }, { icon: "🧼", title: "易于清洁", desc: "防污釉面，擦拭迅速。" }],
  projectShowcase: SHOW,
});
const FAUCET = mk({
  story: "安彼龙头——水龙头及淋浴套件，铜/合金镀铬，陶瓷阀芯耐用，水流稳定。",
  heritage: "龙头与安彼全套浴室同风格搭配，完善整体方案。",
  technicalSpecs: [{ label: "材质", value: "铜/合金镀铬" }, { label: "阀芯", value: "陶瓷阀芯（ceramic cartridge）" }, { label: "表面", value: "镀铬亮泽，抗氧化" }],
  whyChoose: [WHY, { icon: "🚿", title: "水流顺畅", desc: "陶瓷阀芯开关顺滑，减少渗漏。" }, { icon: "🛡️", title: "镀层耐用", desc: "镀铬抗氧化，持久亮丽。" }],
  projectShowcase: SHOW,
});
const CABINET = mk({
  story: "安彼浴室柜——防潮柜体配洗手盆与镜子，为现代浴室优化收纳。",
  heritage: "组合浴室柜让浴室更整洁、更实用。",
  technicalSpecs: [{ label: "柜体", value: "防潮材质" }, { label: "配套", value: "洗手盆 +（镜子）视型号而定" }, { label: "尺寸", value: "按各型号标注" }],
  whyChoose: [WHY, { icon: "🪞", title: "整套配置", desc: "柜体 + 洗手盆 + 镜子配套，安装快捷。" }, { icon: "💧", title: "防潮", desc: "材质耐潮，适应浴室环境。" }],
  projectShowcase: SHOW,
});
export const ANBI_SERIES_META: Record<string, SeriesMeta> = {
  "smart-toilet": mk({
    story: "安彼智能马桶——集成电子洁身盖板：温水冲洗、暖风烘干、除臭、缓降盖板，部分型号支持自动开合与感应冲水。",
    heritage: "安彼最高端的产品线，带来现代化的如厕体验。",
    technicalSpecs: [{ label: "类型", value: "智能马桶（电子洁身盖板）" }, { label: "功能", value: "温水冲洗、烘干、除臭、缓降盖板" }, { label: "材质", value: "卫生陶瓷 + 电子线路板" }],
    whyChoose: [WHY, { icon: "🚽", title: "温水冲洗·暖风烘干", desc: "温水喷嘴可调，暖风烘干，清洁洁净。" }, { icon: "🔆", title: "舒适便捷", desc: "除臭、缓降盖板，部分型号支持自动感应。" }],
    projectShowcase: SHOW,
  }),
  "smart-seat": mk({
    story: "安彼智能盖板——将普通马桶升级为智能马桶：温水冲洗、烘干、缓降盖板。",
    heritage: "无需更换整个马桶即可升级的便捷方案。",
    technicalSpecs: [{ label: "类型", value: "可替换式电子洁身盖板" }, { label: "功能", value: "温水冲洗、烘干、除臭" }, { label: "兼容性", value: "普通马桶" }],
    whyChoose: [WHY, { icon: "♻️", title: "升级简便", desc: "替换普通盖板，让旧马桶变智能。" }, { icon: "🌡️", title: "温水冲洗", desc: "温水喷嘴，暖风烘干，舒适便捷。" }],
    projectShowcase: SHOW,
  }),
  toilet: TOILET, "wall-toilet": TOILET, squat: TOILET,
  kids: mk({
    story: "安彼儿童洁具套装——小尺寸马桶与洗手盆，安全，适合托儿所及有小孩的家庭。",
    heritage: "专为儿童卫浴空间打造的系列。",
    technicalSpecs: [{ label: "适用对象", value: "儿童（小尺寸）" }, { label: "材质", value: "高级卫生陶瓷" }, { label: "尺寸", value: "按各型号标注" }],
    whyChoose: [WHY, { icon: "🧒", title: "贴合儿童", desc: "尺寸与高度适合儿童，安全可靠。" }, { icon: "🏫", title: "适用托幼", desc: "幼儿园、托儿所、家庭的理想之选。" }],
    projectShowcase: SHOW,
  }),
  "art-basin": BASIN, basin: BASIN,
  urinal: mk({
    story: "安彼小便器——适用于公共与商业卫生间的卫生陶瓷，部分型号支持自动感应冲水。",
    heritage: "面向公共工程的男士卫浴方案。",
    technicalSpecs: [{ label: "材质", value: "高级卫生陶瓷" }, { label: "应用", value: "公共/商业卫生间" }, { label: "尺寸", value: "按各型号标注" }],
    whyChoose: [WHY, { icon: "🏢", title: "适用工程", desc: "耐用易清洁，适合高人流量卫生间。" }, { icon: "💧", title: "节约用水", desc: "高效冲水设计，部分型号带感应。" }],
    projectShowcase: SHOW,
  }),
  cabinet: CABINET, faucet: FAUCET, "shower-set": FAUCET, shower: FAUCET,
  "shower-room": mk({
    story: "安彼淋浴房——钢化玻璃隔断 + 铝合金边框，干净利落地挡水，适配现代浴室。",
    heritage: "浴室干湿分区方案。",
    technicalSpecs: [{ label: "材质", value: "钢化玻璃 + 铝合金边框" }, { label: "款式", value: "淋浴隔断/立式淋浴房" }, { label: "尺寸", value: "按型号/定制" }],
    whyChoose: [WHY, { icon: "🚪", title: "保持干爽", desc: "干湿分区，保持浴室洁净干爽。" }, { icon: "🛡️", title: "安全玻璃", desc: "钢化玻璃耐用，破碎时更安全。" }],
    projectShowcase: SHOW,
  }),
  bathtub: mk({
    story: "安彼浴缸——亚克力材质保温，造型现代，适配高端浴室。",
    heritage: "浴缸完善浴室的放松空间。",
    technicalSpecs: [{ label: "材质", value: "亚克力保温" }, { label: "款式", value: "落地式 / 嵌入式" }, { label: "尺寸", value: "按型号" }],
    whyChoose: [WHY, { icon: "🛀", title: "保温", desc: "亚克力长效保温，表面光滑。" }, { icon: "🧽", title: "易清洁", desc: "表面平滑，防污，易清洁。" }],
    projectShowcase: SHOW,
  }),
  "mop-basin": BASIN, other: TOILET,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return ANBI_SERIES_META[seriesOriginal.trim()] || ANBI_SERIES_META.toilet;
}
