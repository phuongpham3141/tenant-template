/**
 * Metadata CareLighting 开尔照明 (Zhejiang Xuguang / Kaier Lighting) — 品牌通用元数据。
 * 来源：care-china.en.made-in-china.com。LED 灯具制造商，已挂牌新三板（839762）。
 * 产品覆盖 G45 LED 球泡灯、GX53 嵌入式/橱柜灯、筒灯射灯、USB 充电应急灯等。
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
    "当夜色降临，一盏好灯决定了一个空间的温度。CareLighting 开尔照明隶属于浙江旭光电子科技股份有限公司——一家把研发、生产、销售与服务握在自己手里的国家级高新技术企业。从一只直径 45mm 的 G45 小球泡，到嵌进吊顶的 GX53 薄型筒灯，再到停电瞬间自动亮起的 USB 充电应急灯，开尔把 LED 的光做成了可以替代千家万户传统灯泡的日常选择。它不追逐浮夸的造型，而是把心思放在出光的均匀、用电的省俭与寿命的长久上——让每一度电都点亮得更值。",
  heritage:
    "公司于 2016 年挂牌新三板（代码 839762），旗下 Kaier Lighting 是中国知名 LED 灯具品牌，曾连续 4 年荣获中国「光源十大品牌」。依托逾 90,000 平方米的现代化生产厂房与约 1 亿套灯具/年的产能，开尔建立起覆盖 26 个省级运营中心、500 多个一级分销网点、辐射超过 100,000 个零售终端的渠道网络。",
  technicalSpecs: [
    { label: "功率", value: "G45 球泡 3W 起；GX53 嵌入灯 5W / 7W / 9W；T 型柱泡 20W-50W" },
    { label: "光效", value: "高流明 SMD 贴片光源，整灯光效通常 80-100 lm/W（视型号而定）" },
    { label: "色温", value: "暖白光约 2700-3000K、自然白约 4000K、正白光约 6000K 可选" },
    { label: "显色指数 CRI", value: "Ra 大于 80，护眼无频闪型号还原物体本色更真实" },
    { label: "IP 防护", value: "室内型 IP20；户外应急款具备一定防潮抗淋能力" },
    { label: "额定寿命", value: "约 25,000-30,000 小时，可省去频繁更换灯泡的烦恼" },
  ],
  manufacturing: [
    "浙江旭光电子科技（开尔照明 / Kaier Lighting）自有现代化厂房逾 90,000 平方米，产能约 1 亿套 LED 灯具/年",
    "G45 球泡、GX53 嵌入灯、筒灯射灯、应急灯多条产线并行，SMD 贴片、灌封、老化、分光分色全流程在厂内完成",
    "累计 122 项专利申请、其中 82 项已获授权；通过 ISO 9001:2015 质量与 ISO 14001:2015 环境管理体系认证",
    "铝壳与塑料/PC 灯罩散热结构经热仿真优化，配套相匹配的恒流驱动，保障无频闪与长寿命",
    "出厂前 100% 通电点亮抽检，并执行高温老化测试，剔除早期失效，确保整批一致性",
  ],
  careGuide: [
    { title: "日常清洁", desc: "断电后用干燥或微湿软布擦拭灯体灰尘；室内型灯具应避免受潮，切勿用水直接冲洗。" },
    { title: "选对灯头", desc: "更换前确认灯座类型（E27 / E14 / B22 / GX53）与功率匹配；安装更换时切勿湿手触碰金属灯头。" },
    { title: "应急充电款", desc: "首次使用前用 USB 充满电；建议每隔一段时间充放电一次，以维持电池容量与应急可靠性。" },
    { title: "散热环境", desc: "大功率灯具避免封闭在不透气灯罩内长时间满负荷使用，留出散热空间可显著延长寿命。" },
  ],
  installation: [
    "按现有灯座的灯头类型与额定功率，选配相匹配的灯泡或灯具，避免超功率使用",
    "GX53 嵌入式/吸顶橱柜灯按 GX53 标准开孔尺寸预留孔位，旋插到位后轻扣固定",
    "按正确电压接线（通常 AC220-240V），需调光的型号须搭配兼容调光器，不可调光款请勿接入调光回路",
    "嵌入式筒灯/射灯安装时分清火线零线，金属外壳型号做好可靠接地",
    "为大功率灯具保证良好散热与通风，吊顶内布线远离高温与尖锐边缘",
  ],
  certifications: [
    "ISO 9001:2015 质量管理体系与 ISO 14001:2015 环境管理体系认证",
    "国内整灯符合 CCC 强制性产品认证要求；出口系列通过 CE、RoHS、ERP 等认证",
    "符合 LED 能效等级要求，节能省电，满足绿色照明采购标准",
    "通过 LED 光生物安全评估，无频闪/低频闪型号有效降低视觉疲劳",
    "高新技术企业资质，已挂牌新三板（代码 839762），提供整灯质保服务",
  ],
  packaging: [
    { label: "供货方式", value: "按 SKU 标准包装或定制包装（OEM/ODM），G45 球泡支持定制彩盒" },
    { label: "产品线", value: "G45 LED 球泡灯、T 型柱泡、GX53 嵌入/橱柜灯、筒灯射灯、USB 充电应急灯" },
    { label: "灯头/接口", value: "E27 / E14 / B22 / GX53（视 SKU 而定）；应急款配 USB 充电口" },
    { label: "防护", value: "独立彩盒加缓冲内衬，外箱分隔防压，长途运输降低破损率" },
    { label: "样品", value: "可提供样灯试装、确认光色与亮度后再批量下单" },
  ],
  whyChoose: [
    { icon: "💡", title: "知名 LED 品牌", desc: "Kaier Lighting 曾连续 4 年蝉联中国「光源十大品牌」，品质口碑经市场检验。" },
    { icon: "🏭", title: "规模制造", desc: "逾 90,000 平方米厂房、约 1 亿套/年产能，工厂直供稳定交期。" },
    { icon: "✅", title: "认证齐全", desc: "ISO 9001/14001 体系，CCC 与 CE/RoHS/ERP 出口认证，节能合规。" },
    { icon: "🌙", title: "护眼无频闪", desc: "高 CRI 配恒流驱动，光线柔和稳定，久看不刺眼、还原本色。" },
    { icon: "🔋", title: "应急不断电", desc: "USB 充电应急灯泡停电自动亮起，户外野营与频繁停电地区皆适用。" },
  ],
  projectShowcase: [
    "住宅与公寓的主照明及装饰照明改造",
    "客厅、卧室、办公室嵌入式吊顶与点光源照明",
    "橱柜、展示柜、货架的 GX53 薄型补光",
    "停电频发地区、户外露营的应急备用照明",
  ],
  faq: [
    { q: "CareLighting（Kaier）是什么品牌？", a: "是浙江旭光电子科技旗下的 LED 灯具品牌开尔照明，为已挂牌新三板（839762）的高新技术企业，曾获中国「光源十大品牌」。" },
    { q: "有哪些灯具类型？", a: "包括 G45 LED 球泡灯（E27/E14/B22）、T 型柱状大功率球泡、GX53 嵌入式/橱柜灯、筒灯射灯，以及 USB 充电应急 LED 灯泡。" },
    { q: "GX53 灯怎么选可调光还是不可调光？", a: "需要配合调光器调节亮度的请选 dimmable 可调光款并搭配兼容调光器；普通开关回路选不可调光款即可，切勿把不可调光灯接入调光回路。" },
    { q: "灯具能用多久？", a: "额定寿命约 25,000-30,000 小时，正常使用可达数年；保证良好散热并避免频繁通断可进一步延长寿命。" },
    { q: "是否在越南供货？", a: "请联系 Huayuesc 华越供应链，咨询为越南项目与经销商供应 CareLighting 开尔照明灯具的事宜与报价。" },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
