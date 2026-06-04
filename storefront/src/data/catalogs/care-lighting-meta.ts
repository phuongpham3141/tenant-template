/**
 * Metadata CareLighting 开尔照明 (Zhejiang Xuguang / Kaier Lighting) — 品牌通用元数据。
 * 来源：care-china.en.made-in-china.com。LED 灯具制造商，已挂牌新三板（839762）。
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
    "CareLighting（开尔照明）隶属于浙江旭光电子科技有限公司（Zhejiang Xuguang Electronic Technology Co., Ltd.）——一家集 LED 灯具及家用电器研发、生产、销售与服务于一体的高新技术企业。公司于 2016 年挂牌新三板（代码 839762）；旗下「Kaier Lighting」是中国知名 LED 灯具品牌，产品覆盖流通/综合照明、家居、商业、集成设备及电器五大领域。",
  heritage:
    "拥有逾 90,000 ㎡ 现代化生产厂房，产能约 1 亿套 LED 灯具/年。连续 4 年荣获中国「光源十大品牌」；建有 26 个省级运营中心、500+ 一级分销网点的网络，覆盖逾 100,000 个零售终端。",
  technicalSpecs: [
    { label: "品牌", value: "CareLighting 开尔照明 (Kaier / Zhejiang Xuguang)" },
    { label: "上市", value: "新三板 2016（代码 839762）" },
    { label: "产品", value: "LED 球泡灯、GX53/嵌入式灯、应急灯" },
    { label: "产能", value: "约 1 亿套灯具/年，90,000 ㎡ 厂房" },
  ],
  manufacturing: [
    "浙江旭光电子科技（开尔照明 / Kaier Lighting）",
    "现代化厂房 >90,000 ㎡，产能约 1 亿套 LED 灯具/年",
    "122 项专利申请（82 项已授权）；ISO 9001:2015 & ISO 14001:2015",
    "连续 4 年中国「光源十大品牌」",
  ],
  careGuide: [
    { title: "LED 灯具", desc: "寿命长、少维护；定期擦拭表面灰尘，室内型灯具应避免受潮。" },
    { title: "灯头", desc: "选配正确的灯头类型（E27/E14/B22/GX53）；更换灯泡时切勿湿手触碰。" },
    { title: "充电/应急型", desc: "首次使用前充满电；定期放电-充电以保持电池寿命。" },
  ],
  installation: [
    "按现有灯座的灯头与功率选配相匹配的灯泡/灯具",
    "GX53 嵌入式/吸顶橱柜灯：按 GX53 标准开孔安装",
    "按正确电压接线（通常 AC220-240V）；配用相匹配的驱动器/电源",
    "为大功率灯具保证良好散热",
  ],
  certifications: [
    "ISO 9001:2015（质量）& ISO 14001:2015（环境）",
    "出口系列通过 CE 认证",
    "高新技术企业，已挂牌新三板（839762）",
  ],
  packaging: [
    { label: "供货方式", value: "按 SKU / 定制包装（OEM）" },
    { label: "产品线", value: "G45 球泡灯、GX53 灯、筒灯、应急灯" },
    { label: "灯头", value: "E27 / E14 / B22 / GX53（视 SKU 而定）" },
  ],
  whyChoose: [
    { icon: "💡", title: "知名 LED 品牌", desc: "Kaier Lighting——连续 4 年中国「光源十大品牌」，已上市。" },
    { icon: "🏭", title: "规模庞大", desc: "90,000 ㎡ 厂房，约 1 亿套灯具/年。" },
    { icon: "✅", title: "国际标准", desc: "ISO 9001/14001，多项专利，达 CE 出口标准。" },
  ],
  projectShowcase: ["住宅与公寓", "办公室、客厅", "橱柜、展示柜（GX53 灯）", "零售与商业"],
  faq: [
    { q: "CareLighting（Kaier）是什么品牌？", a: "是浙江旭光电子旗下的 LED 灯具品牌 开尔照明，为已挂牌新三板（839762）的高新技术企业，获中国「光源十大品牌」。" },
    { q: "有哪些灯具类型？", a: "G45 LED 球泡灯（E27/E14/B22）、GX53 嵌入式/吸顶橱柜灯、筒灯、USB 充电应急灯。" },
    { q: "是否在越南供货？", a: "请联系 Huayuesc，咨询为越南项目/经销商供应 CareLighting 灯具事宜。" },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
