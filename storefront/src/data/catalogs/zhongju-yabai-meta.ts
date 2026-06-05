/**
 * Metadata Zhongju Yabai 中居亚百 (Guangdong Zhongju Yabai Building Materials Technology) — 通用元数据。
 * 来源：gdzjyb.com。无机预涂板 无机预涂板 / 冰火板 / 洁净板 制造商，广东佛山三水。
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
    "Guangdong Zhongju Yabai Building Materials Technology Co., Ltd. (广东中居亚百建材科技) 专业生产无机预涂板（又称冰火板/洁净板），是用于内外墙隔断和吊顶的高端饰面材料。公司集研发、生产和销售于一体，拥有经验丰富的技术团队和自动化生产线，位于广东佛山三水区。",
  heritage:
    "产品具有防火（A级）、防潮、防霉、抗菌和无甲醛释放等特性——满足医院、洁净室和医疗环境的要求。已应用于多家医院（例如青岛大学附属医院、华信医院）。",
  technicalSpecs: [
    { label: "品牌", value: "Zhongju Yabai 中居亚百（广东中居亚百）" },
    { label: "产品", value: "无机预涂板/冰火板/洁净板，墙面板" },
    { label: "特性", value: "A级防火、防潮防霉、抗菌、无甲醛" },
    { label: "基地", value: "广东佛山三水——自动化生产线" },
  ],
  manufacturing: [
    "广东中居亚百建材科技有限公司（中居亚百）—— 佛山三水",
    "无机预涂板：表面层和芯材均为无机材料 → 细菌无法存活，达到「洁净」效果",
    "自动化生产线；集研发—生产—销售于一体",
    "特性：A级防火、防潮、防霉、抗菌、无甲醛",
  ],
  careGuide: [
    { title: "清洁", desc: "无机表面抗污易擦；用湿布擦拭即可，无需强力化学清洁剂。" },
    { title: "存放", desc: "置于干燥处，平放，仓储和运输时避免板材边缘碰撞。" },
    { title: "耐久性", desc: "防潮防霉，可长期保持表面洁净；适合卫生要求高的环境。" },
  ],
  installation: [
    "确定饰面位置：隔墙、外墙、吊顶、走廊、洁净室",
    "安装于龙骨/结构体系上；使用无机板专用胶水/配件",
    "处理拼缝和连接点，确保平整、密封、防火",
    "按环境要求（医院/洁净室）完成收边与拼缝处理",
  ],
  certifications: [
    "A级防火（不燃装饰材料）",
    "无甲醛释放——达到医疗/洁净室环境标准",
    "抗菌——适合医院、实验室、洁净室",
  ],
  packaging: [
    { label: "供货方式", value: "按板材/规格，依项目交付" },
    { label: "表面", value: "多种纹理与颜色（木纹、纯色、粉彩色……）" },
    { label: "应用", value: "墙面、吊顶、室内外饰面" },
  ],
  whyChoose: [
    { icon: "🔥", title: "A级防火", desc: "无机不燃材料——保障工程安全。" },
    { icon: "🏥", title: "医疗标准", desc: "抗菌、无甲醛——达到医院、洁净室标准。" },
    { icon: "💧", title: "防潮防霉", desc: "无机表面防潮、防霉，易擦洗，经久耐看。" },
  ],
  projectShowcase: ["医院及医疗机构（洁净室）", "学校、实验室", "酒店、公寓、办公楼", "公共墙面/吊顶及走廊"],
  faq: [
    { q: "Zhongju Yabai 的无机预涂板/「冰火板」是什么？", a: "是一种表面和芯材均为无机材料的装饰板——A级防火、防潮防霉、抗菌且无甲醛释放，用于墙面/吊顶饰面。" },
    { q: "适用于哪些工程？", a: "医院、洁净室、学校、实验室、酒店、办公楼、公共走廊——凡是防火与卫生要求高的场所。" },
    { q: "Zhongju Yabai 在越南有供货吗？", a: "请联系 Huayuesc 咨询，为您在越南的项目提供 Zhongju Yabai 无机板。" },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
