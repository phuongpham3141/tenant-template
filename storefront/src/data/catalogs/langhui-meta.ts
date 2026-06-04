/**
 * Metadata Langhui 朗辉建材 (Guangdong Langhui Building Material Technology) — 通用元数据。
 * 来源：gdlanghui.com。ALC/AAC 蒸压加气混凝土板材制造商，佛山-高明。
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
    "广东朗辉建材科技有限公司（Guangdong Langhui Building Material Technology Co., Ltd.，朗辉建材）坐落于佛山高明（Gaoming）重点工业发展区——现代化生产基地占地约 246 亩，总投资约 4.2 亿元人民币。朗辉拥有中国领先的先进蒸压加气混凝土板材生产线与生产工艺，已具备超薄 ALC/AAC 墙板的批量生产能力。",
  heritage:
    "朗辉超薄 ALC/AAC 板材广泛应用于澳大利亚、日本、韩国的轻钢结构工程，并已大量出口。朗辉 AAC 屋面板承载力高，防火、隔热性能优良；地处大湾区（Greater Bay Area）中心地带。",
  technicalSpecs: [
    { label: "品牌", value: "Langhui 朗辉 (Guangdong Langhui Building Material)" },
    { label: "产品", value: "ALC-AAC 墙板/楼板/屋面板，加气混凝土砌块" },
    { label: "基地", value: "约 246 亩（佛山高明），投资约 4.2 亿元人民币" },
    { label: "特性", value: "质轻、强度高、防火、隔音隔热" },
  ],
  manufacturing: [
    "广东朗辉建材科技（朗辉建材）——佛山高明",
    "先进的蒸压加气混凝土板材生产线；批量生产超薄 ALC/AAC 板材",
    "充分发挥大湾区（Greater Bay Area）在生产、运输、技术方面的优势",
    "ALC 板材出口至澳大利亚、日本、韩国等地",
  ],
  careGuide: [
    { title: "存储", desc: "板材存放于干燥处，平整垫放，仓储期间避免边角碰撞及受潮渗水。" },
    { title: "施工", desc: "使用合适工具切割/钻孔；采用 ALC 板专用砂浆/胶粘剂。" },
    { title: "饰面", desc: "选用适合 ALC 表面的薄抹灰/批刮；按规范处理拼缝以防开裂。" },
  ],
  installation: [
    "按部位确定板材类型：隔墙、外墙、楼板、屋面、防火墙",
    "按龙骨/钢结构体系装配；以专用配件与胶粘剂连接",
    "处理拼缝及连接节点，确保隔音、防火、防裂",
    "按工程要求完成表面饰面（薄抹灰/批刮）",
  ],
  certifications: [
    "蒸压加气混凝土板，符合 ALC/AAC 标准",
    "楼板/屋面板具备防火与承载性能",
    "产品出口至澳大利亚、日本、韩国——达到国际市场要求",
  ],
  packaging: [
    { label: "供货方式", value: "按张/规格供货，按项目交货" },
    { label: "规格", value: "多种厚度（如 50/75mm 等）按协商确定" },
    { label: "应用", value: "墙体、楼板、屋面、防火墙" },
  ],
  whyChoose: [
    { icon: "🧱", title: "专注 ALC/AAC 板材", desc: "先进生产线，批量生产超薄板材。" },
    { icon: "🔥", title: "防火、质轻", desc: "质轻、强度高、防火、隔音隔热性能优良。" },
    { icon: "🌏", title: "出口", desc: "用于澳大利亚、日本、韩国的钢结构工程。" },
  ],
  projectShowcase: ["轻钢结构房屋", "需轻质隔墙的办公大楼、厂房", "要求防火/隔音的工程", "墙体、楼板、屋面装配"],
  faq: [
    { q: "朗辉的 ALC/AAC 板材是什么？", a: "是蒸压加气混凝土板（Autoclaved Lightweight Concrete）——质轻、强度高、防火、隔音隔热，用于墙体/楼板/屋面装配。" },
    { q: "有哪些板材类型？", a: "超薄墙板、楼板与屋面板、AAC 砌块、防火墙、wallboard——多种厚度可按需选择。" },
    { q: "朗辉是否在越南供货？", a: "请联系 Huayuesc，咨询为越南项目供应朗辉 ALC/AAC 板材事宜。" },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
