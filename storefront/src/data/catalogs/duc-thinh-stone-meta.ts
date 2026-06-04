/**
 * 德盛石材 (Đức Thịnh Stone) 人造石系列丰富元数据 — 产品详情页。
 * 按 seriesOriginal（类目："quartz"、"marble"、"onyx"）索引。
 *
 * 货源说明：
 *   • 资料与参数：ducthinhstone.com（Duc Thinh Stone Technology Co., Ltd）。
 *   • 人造石（engineered stone）系列由石英粉 / 石粉 + 树脂制成。
 */

export type SeriesMeta = {
  story: string;
  heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[];
  careGuide: { title: string; desc: string }[];
  installation: string[];
  certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[];
  faq: { q: string; a: string }[];
};

const COMMON_CERTS = [
  "ISO 9001 —— 质量管理体系",
  "无放射性材料认证（按批次 NSF/Class A）",
  "吸水率、抗弯强度、耐磨性检测",
  "环保材料（低 VOC 树脂）",
];
const COMMON_MFG = [
  "德盛石材 —— 面向越南室内装饰市场的人造石（engineered stone）供应与加工商",
  "人造石由约 90% 石英粉 / 石粉 + 树脂经真空振压成型",
  "大规格板材 3200×1600mm、3000×1400/1600mm；厚度 18–30mm；可按需切割尺寸",
  "供应能力雄厚（每年数百万㎡），原料供应稳定",
];
const COMMON_PACKAGING = [
  { label: "包装", value: "铁架（A 字架）+ 护角 + 缠绕膜；出口采用木箱" },
  { label: "板材规格", value: "3200×1600mm / 3000×1400mm / 3000×1600mm / 3000×1200mm + 可按需切割" },
  { label: "厚度", value: "18 – 30mm（视系列而定）" },
  { label: "起订量", value: "按集装箱计；支持多色 / 多规格混装" },
  { label: "存储", value: "竖立于 A 字架上，避免碰撞板材边缘" },
];
const COMMON_INSTALL = [
  "加工前进行测量并制定排版图（nesting），优化石纹衔接",
  "CNC 切割 + 边缘打磨；接缝处使用人造石专用胶",
  "确保支撑面平整、受力均匀；大跨度处（台面）加固",
  "安装后清洁并抛光接缝",
];
const COMMON_CARE = [
  { title: "日常清洁", desc: "用软布加温水 / 中性清洁剂擦拭。避免强力清洁剂及高浓度酸 / 碱。" },
  { title: "预防保养", desc: "切割及放置热锅时使用砧板 / 隔热垫。石英石耐热性佳，但应避免骤冷骤热。" },
  { title: "污渍处理", desc: "顽固污渍使用温和清洁液加不伤表面的清洁垫处理；随后立即擦净。" },
];
const COMMON_FAQ = [
  { q: "德盛人造石可否按需切割尺寸？", a: "可以。支持按尺寸切割（cut-to-size）并按图纸进行边缘加工。" },
  { q: "最低起订量与交期？", a: "按集装箱 / 数量计；交期随订单协商（参考约 15 天）。" },
  { q: "是否提供样品以确认颜色？", a: "提供。可提供小块样板，供大批量下单前确认颜色 / 纹理。" },
];
function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: COMMON_MFG, careGuide: COMMON_CARE, installation: COMMON_INSTALL,
    certifications: COMMON_CERTS, packaging: COMMON_PACKAGING, faq: COMMON_FAQ };
}

export const DTS_SERIES_META: Record<string, SeriesMeta> = {
  quartz: mk({
    story: "德盛人造石英石（engineered quartz）—— 由约 90% 石英粉 + 树脂压制而成，硬度高、耐刮擦、防渗透、耐酸性能优异。适用于厨房台面、台盆面、地面及墙面铺贴。",
    heritage: "石英石凭借优于天然石材的耐用性以及无孔、抗菌的表面，是最受欢迎的厨房台面人造石系列。",
    technicalSpecs: [
      { label: "材质", value: "石英粉约 90% + 树脂" },
      { label: "板材规格", value: "3200×1600 / 3000×1400 / 3000×1600 mm" },
      { label: "厚度", value: "20 – 30 mm" },
      { label: "表面", value: "抛光 / 哑光（honed）" },
      { label: "特性", value: "耐酸、耐污、耐热、耐刮擦" },
    ],
    whyChoose: [
      { icon: "💎", title: "坚硬耐用", value: undefined as never, desc: "硬度高于天然石材，耐刮擦，几乎免维护。" } as never,
      { icon: "🛡️", title: "不渗透、抗菌", desc: "表面无孔，不渗水 / 渗油，易于清洁。" },
      { icon: "🎨", title: "纹色丰富", desc: "白 / 灰 / 黑 / 米等多种色调及 Calacatta 金纹系列。" },
    ],
    projectShowcase: ["公寓与别墅厨房台面", "前台接待台、商用台面", "高端室内墙面与地面铺贴"],
  }),
  marble: mk({
    story: "德盛人造大理石（engineered/artificial marble）—— 高度还原天然大理石纹理之美，且均匀度高、易于加工、价格合理，适用于墙面、地面及室内装饰。",
    heritage: "人造大理石纹理媲美天然石材，但更均匀、瑕疵更少，适用于大面积铺贴。",
    technicalSpecs: [
      { label: "材质", value: "天然石材 + 大理石粉 + 树脂" },
      { label: "板材规格", value: "3200×1600 / 2400×1600 mm + 可按需切割" },
      { label: "厚度", value: "18 – 30 mm" },
      { label: "表面", value: "抛光 / 哑光 / 喷砂" },
      { label: "适用场景", value: "墙面、地面、卫浴、客厅" },
    ],
    whyChoose: [
      { icon: "🏛️", title: "大理石之美", desc: "大理石纹理高雅，大面积铺贴均匀一致。" },
      { icon: "✂️", title: "易于加工", desc: "切割 / 拼接灵活，损耗低于天然石块。" },
      { icon: "💰", title: "性价比高", desc: "在同等美学效果下，价格优于天然大理石。" },
    ],
    projectShowcase: ["酒店大堂与墙面", "别墅客厅地面", "外立面与商用室内装饰"],
  }),
  onyx: mk({
    story: "德盛人造玉石（onyx）—— 具备透光（translucent）效果与独特的玉石纹理，适用于装饰点缀、透光隔断、吧台等项目。",
    heritage: "人造玉石再现天然玉石的梦幻之美，且耐用性更高，适用于背光（backlit）项目。",
    technicalSpecs: [
      { label: "材质", value: "矿物粉 + 树脂（玉石效果）" },
      { label: "板材规格", value: "大规格板材，可按需切割" },
      { label: "特性", value: "玉石纹理，部分系列具备透光（backlit）效果" },
      { label: "适用场景", value: "点缀隔断、吧台、装饰台面" },
    ],
    whyChoose: [
      { icon: "✨", title: "透光效果", desc: "背光（backlit）照射时尤为出彩，营造高雅点缀。" },
      { icon: "🎨", title: "纹理独特", desc: "玉石纹理梦幻，每块板材各具特色。" },
      { icon: "💪", title: "比天然玉石更耐用", desc: "不易开裂，比天然石块更易施工。" },
    ],
    projectShowcase: ["酒店大堂背光隔断", "吧台与前台", "高端室内装饰点缀"],
  }),
};

/** Helper：按 seriesOriginal（类目）获取元数据。 */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DTS_SERIES_META[seriesOriginal.trim()] || DTS_SERIES_META.quartz;
}
