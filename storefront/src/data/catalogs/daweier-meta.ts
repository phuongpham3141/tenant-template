/**
 * 达威尔 (Daweier) 元数据 — 详情页。按 seriesOriginal (catKey: sink/faucet/drain/accessory...) 索引。
 * 货源：daweier.cn —— 开平达威尔厨卫（Kaiping Daweier Kitchen & Bath），广东。不锈钢水槽、龙头、地漏。
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
const CERTS = ["厨卫设备中国国家标准（GB）", "食品级 SUS304 不锈钢", "ISO 9001 质量管理体系", "防腐蚀与水密性检测"];
const MFG = [
  "达威尔（广东开平）—— 专业生产手工不锈钢水槽、厨房龙头、地漏及配件",
  "食品级 SUS304 不锈钢水槽；手工与拉伸两大系列",
  "地漏为强项产品线 —— 多种侧排/下排防臭款式",
  "质量管控：水密性测试、防腐蚀、不锈钢板厚度",
];
const PACK = [
  { label: "包装", value: "纸箱 + 泡沫/保护膜保护不锈钢表面" },
  { label: "随附配件", value: "下水器、滤篮、密封圈（视产品而定）" },
  { label: "起订量", value: "按批量/集装箱；支持多型号混装" },
];
const INSTALL = [
  "水槽：按尺寸开台面孔，加装卡扣并打边缘硅胶",
  "龙头：装入预留孔，接通冷/热水，检查渗漏",
  "地漏：按地面标高安装，确保排水坡度与防臭存水弯",
  "交付前进行水密验收测试",
];
const CARE = [
  { title: "不锈钢清洁", desc: "用软布加中性清洁剂顺纹擦拭；避免使用钢丝球及强酸，以防划伤/腐蚀。" },
  { title: "防止积水", desc: "使用后擦干，避免水渍/水垢；定期疏通滤篮与排水存水弯。" },
  { title: "龙头/地漏", desc: "清洁龙头出水口除水垢；检查密封圈与地漏防臭存水弯。" },
];
const FAQ = [
  { q: "达威尔水槽采用哪种不锈钢？", a: "食品级 SUS304 不锈钢，防锈耐用，适应厨房环境。" },
  { q: "是否提供台面开孔尺寸？", a: "提供。各型号有对应尺寸参数；华越供应链可协助提供安装图纸。" },
  { q: "起订量与交期？", a: "按批量/集装箱计；交期随订单确认。" },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🍳", title: "SUS304 不锈钢耐用", desc: "食品级 304 不锈钢水槽/配件，防锈，经久耐用美观。" };
const SHOW = ["家用及公寓厨房", "餐厅、商用厨房", "厨卫交付项目"];
const SINK = mk({
  story: "达威尔不锈钢水槽 —— 手工（handmade R10）与拉伸两大系列，厚实 SUS304 不锈钢，底部隔音，提供单/双槽多款，适用于家用及商用厨房。",
  heritage: "手工不锈钢水槽是达威尔的核心产品线。",
  technicalSpecs: [{ label: "材质", value: "食品级 SUS304 不锈钢" }, { label: "工艺", value: "手工/拉伸" }, { label: "特性", value: "底部隔音、防锈、易清洁" }, { label: "款式", value: "单/双槽，台下/台上" }],
  whyChoose: [WHY, { icon: "🔇", title: "隔音降噪", desc: "底部隔音层降低放水噪音，更安静。" }, { icon: "🧽", title: "易清洁", desc: "R角合理、表面平滑，清洁快捷。" }],
  projectShowcase: SHOW,
});
export const DAWEIER_SERIES_META: Record<string, SeriesMeta> = {
  sink: SINK, basin: SINK, other: SINK,
  faucet: mk({
    story: "达威尔厨房龙头 —— 适用于水槽的冷热水龙头，陶瓷阀芯耐用，水流稳定，电镀防氧化变色。",
    heritage: "厨房龙头为达威尔水槽套系画上句点。",
    technicalSpecs: [{ label: "材质", value: "黄铜 / 镀层不锈钢" }, { label: "阀芯", value: "陶瓷阀芯（ceramic cartridge）" }, { label: "适用场景", value: "厨房水槽" }],
    whyChoose: [WHY, { icon: "🚿", title: "水流顺畅", desc: "陶瓷阀芯开关顺滑，不易渗漏。" }, { icon: "🛡️", title: "镀层耐久", desc: "电镀层防氧化变色，长久光亮如新。" }],
    projectShowcase: SHOW,
  }),
  drain: mk({
    story: "达威尔地漏 —— 不锈钢 / 铜防臭地漏，多种侧排与下排款式，排水量大，适用于浴室、阳台、厨房。",
    heritage: "地漏是达威尔深耕的强项产品线。",
    technicalSpecs: [{ label: "材质", value: "SUS304 不锈钢 / 铜" }, { label: "款式", value: "侧排（E）/ 下排；正方形（L05）" }, { label: "特性", value: "防臭、排水量大" }, { label: "适用场景", value: "浴室、阳台、厨房" }],
    whyChoose: [WHY, { icon: "👃", title: "防臭", desc: "高效防臭存水弯，阻隔下水道异味返溢。" }, { icon: "💧", title: "排水快", desc: "排水量大，减少地面积水。" }],
    projectShowcase: SHOW,
  }),
  accessory: mk({
    story: "达威尔水槽配件 —— 下水器、排水头、下水管、滤篮及配套配件，与不锈钢水槽配套使用。",
    heritage: "配套配件让水槽系统更完整。",
    technicalSpecs: [{ label: "材质", value: "不锈钢 / 合金 / ABS 塑料" }, { label: "包含", value: "下水器、排水头、下水管、滤篮" }, { label: "适用场景", value: "厨房水槽" }],
    whyChoose: [WHY, { icon: "🧩", title: "配套精准", desc: "与达威尔水槽精准匹配，安装快捷。" }],
    projectShowcase: SHOW,
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DAWEIER_SERIES_META[seriesOriginal.trim()] || DAWEIER_SERIES_META.sink;
}
