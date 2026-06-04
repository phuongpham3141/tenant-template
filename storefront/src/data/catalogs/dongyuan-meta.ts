/**
 * 元数据 Dongyuan 东原厨具 (Guangdong Dongyuan Kitchenware) — 品牌通用元数据。
 * 来源：dongyuan.en.made-in-china.com。304 不锈钢水槽制造商，创立于 1993 年，佛山顺德。
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
    "广东东原厨具实业有限公司（东原厨具）创立于 1993 年，厂区约 25,000 ㎡，坐落于佛山市顺德区 —— 珠江三角洲的核心工业带。东原专业生产不锈钢厨房水槽、橱柜及卫浴设备；全部产品采用进口高端不锈钢板，防腐蚀。",
  heritage:
    "逾 30 年经验，拥有 400+ 名熟练工人及自有模具设计团队。主营产品：SUS 304 不锈钢水槽（台下/台上、单/双盆、手工款），并取得多项出口认证（UPC、CSA）。",
  technicalSpecs: [
    { label: "品牌", value: "东原（广东东原厨具）" },
    { label: "创立", value: "1993 年（佛山顺德）" },
    { label: "产品", value: "SUS 304 不锈钢水槽、橱柜" },
    { label: "厂区", value: "约 25,000 ㎡，400+ 名工人" },
  ],
  manufacturing: [
    "广东东原厨具（东原厨具）— 创立于 1993 年，佛山顺德",
    "专业生产不锈钢水槽：台下式、台上式、手工款",
    "采用进口 SUS 304 不锈钢板，防腐蚀；拥有自有模具设计团队",
    "取得出口认证（UPC、CSA）— 服务国际市场",
  ],
  careGuide: [
    { title: "清洁", desc: "用柔软抹布 + 中性洗洁精擦拭；避免金属钢丝球刮伤不锈钢表面。" },
    { title: "防污渍", desc: "使用后擦干，避免积水；定期使用不锈钢专用清洁剂。" },
    { title: "排水", desc: "定期清洁滤篮与存水弯，保持排水顺畅，避免堵塞。" },
  ],
  installation: [
    "按石材台面选择安装方式：台下式、台上式或平嵌式",
    "按水槽尺寸开孔台面；使用专用胶水与支撑挂码",
    "安装水龙头、排水管、存水弯；检查密封性",
    "台下式水槽：确保石材台面足够厚并加固承重",
  ],
  certifications: [
    "SUS 304 不锈钢 — 食品接触材料标准",
    "出口认证 UPC / CSA",
    "面向国际市场的品质管控",
  ],
  packaging: [
    { label: "供货形式", value: "按水槽 SKU" },
    { label: "类型", value: "台下式 / 台上式 / 手工款，单盆与双盆" },
    { label: "材质", value: "进口 SUS 304 不锈钢" },
  ],
  whyChoose: [
    { icon: "🥘", title: "专注水槽", desc: "逾 30 年专业生产厨房不锈钢水槽。" },
    { icon: "🛡️", title: "304 不锈钢", desc: "进口 SUS 304 不锈钢板，防腐蚀，坚固美观。" },
    { icon: "🌍", title: "符合出口标准", desc: "UPC/CSA 认证，服务多个市场。" },
  ],
  projectShowcase: ["家庭厨房", "公寓与连排房", "商用厨房、餐厅", "厨房家居项目"],
  faq: [
    { q: "东原水槽采用什么材质？", a: "主要为进口 SUS 304 不锈钢，防腐蚀，食品接触安全。" },
    { q: "有台下式和台上式款型吗？", a: "种类齐全：台下式、台上式、手工款，单盆与双盆均有。" },
    { q: "东原在越南有供货吗？", a: "请联系华越供应链（Huayuesc），获取为越南项目/经销商供应东原水槽的咨询。" },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
