/**
 * 元数据 FSL 佛山照明 (Foshan Lighting) — 品牌通用元数据。
 * 来源：chinafsl.com（国际站）。中国大型照明厂商，已上市，创立于 1958 年。
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
const BRAND: SeriesMeta = {
  story:
    "FSL（佛山照明 — Foshan Electrical and Lighting Co., Ltd.）于 1958 年创立于广东佛山，是中国规模最大、历史最悠久的照明制造商之一，已在证券交易所上市。FSL 拥有 5 个生产基地、200 多条生产线及逾 10,000 名员工，提供完整的产品线：民用、商业、户外、工业照明，车灯、专用灯具及智能照明。",
  heritage:
    "国内外知名品牌，服务约 80 个国家的 200 多家客户。产品涵盖 LED 灯泡、灯管/支架灯、筒灯、面板灯，以及投光灯、路灯和智能照明解决方案。",
  technicalSpecs: [
    { label: "品牌", value: "FSL 佛山照明 (Foshan Lighting)" },
    { label: "创立", value: "1958 年（广东佛山）" },
    { label: "规模", value: "5 个生产基地，200+ 条生产线，10,000+ 名员工" },
    { label: "覆盖范围", value: "民用、商业、户外、工业、车灯、智能" },
  ],
  manufacturing: [
    "Foshan Electrical and Lighting Co., Ltd. (FSL) — 已上市，创立于 1958 年",
    "中国境内 5 个生产基地 + 200 多条生产线",
    "自主研发与生产 LED 芯片/模组、驱动电源、光学件",
    "出口 80 多个国家 — 大规模品质管控",
  ],
  careGuide: [
    { title: "LED 灯具", desc: "寿命长、维护少；定期擦拭表面灰尘，室内款应避免受潮。" },
    { title: "户外灯具", desc: "IP65-66 等级耐受风吹日晒；仍应定期检查密封圈与接头。" },
    { title: "安装", desc: "按功率选用正确的驱动电源；投光灯/路灯须保证散热。" },
  ],
  installation: [
    "按用途选择灯具类型（嵌入式、吸顶、支架、投光、路灯等）",
    "由电工接线；电压正确（通常 AC220-240V）并配驱动电源",
    "嵌入式筒灯用弹簧卡扣；投光灯/路灯需配合适的支架与散热",
    "户外安装须检查 IP 与防水等级",
  ],
  certifications: [
    "中国/国际照明与电气安全标准（CE 等）",
    "上市企业 — 大规模品质管理体系",
    "户外系列达 IP65-66 防护等级",
  ],
  packaging: [
    { label: "供货形式", value: "按 SKU / 按产品系列" },
    { label: "产品范围", value: "灯泡、灯管、筒灯、面板灯、投光灯、路灯、智能、车灯" },
    { label: "出口", value: "80 多个国家" },
  ],
  whyChoose: [
    { icon: "💡", title: "1958 年创立的大厂", desc: "中国规模最大、历史最悠久的照明制造商之一，已上市。" },
    { icon: "🏭", title: "庞大规模", desc: "5 个生产基地，200+ 条生产线，10,000+ 名员工。" },
    { icon: "🌍", title: "全面覆盖", desc: "从民用 LED 灯泡到路灯、车灯及智能照明。" },
  ],
  projectShowcase: ["住宅与公寓", "办公、零售、商业", "街道与城市照明", "厂房、物流、农业"],
  faq: [
    { q: "FSL 是哪家厂商？", a: "FSL（佛山照明 Foshan Lighting）是中国大型照明制造商，创立于 1958 年，已上市，出口 80 多个国家。" },
    { q: "FSL 在越南有售吗？", a: "请联系华越供应链（Huayuesc），获取为越南项目/经销商供应 FSL 灯具的咨询。" },
    { q: "FSL 有哪些类型的灯具？", a: "种类齐全：LED 灯泡、灯管/支架灯、筒灯、面板灯、投光灯、路灯、庭院灯、开关/插座、LED 灯带、智能灯具及专用灯具。" },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
