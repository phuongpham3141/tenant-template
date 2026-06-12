/**
 * 光年地板 (Lumina Floor) 系列元数据 —— 产品详情页富文本。
 * 按 seriesOriginal 索引："spc"（石塑锁扣地板）/ "lvt"（弹性地板）。
 * 资料来源：华越供应链-光年地板产品画册（中越双语版）+ 行业通用工艺参数。
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

const BRAND_MFG = [
  "光年地板由华越供应链旗下自营工厂打造 —— 从基材配料、装饰膜印刷到锁扣开模实现全链条自控，源头直供、稳定交期",
  "装饰膜来自全球领先的花色供应商，可选图案与颜色超过 800 种，覆盖木纹、石纹、人字拼、几何纹等潮流题材",
  "石塑基材采用钙粉 + 高纯 PVC 复合配方，高温高压一次成型，板面平整、尺寸稳定、抗变形",
  "支持 OEM / ODM：可按项目定制花色、规格、锁扣类型与包装，最小起订量灵活，适配工程与经销两种渠道",
];
const BRAND_CARE = [
  { title: "日常清洁", desc: "用拧干的软拖把或抹布配中性清洁剂擦拭即可；无需打蜡，免抛光维护，省心耐用。" },
  { title: "防止划伤", desc: "家具腿加装毡垫，搬运重物时垫板移动；建议在门口放置地垫，减少砂砾带入。" },
  { title: "防水防潮", desc: "石塑基材本身防水，洒水及时擦干即可；可用于厨房、卫生间过道等易潮区域。" },
  { title: "温度适应", desc: "避免长时间局部高温炙烤（如未隔热的取暖器直接接触）；正常室温与地暖环境下表现稳定。" },
];
const BRAND_INSTALL = [
  "施工前测量房间并绘制排版图，优化花色衔接与切割损耗",
  "基面要求平整、干燥、洁净，平整度误差控制在 2mm / 2m 以内；不平处先做自流平找平",
  "锁扣款无需打胶，沿墙预留 8–10mm 伸缩缝，错缝拼装、轻敲到位；自粘款撕膜即贴、滚压排气",
  "大面积或地暖区域按厂家建议分区铺装，安装后清洁地面、检查接缝平整",
];
const BRAND_CERTS = [
  "环保基材 —— 甲醛释放达 E0 / E1 级，绿色家装可放心使用",
  "耐磨等级 AC3–AC5（视耐磨层厚度而定），适配住宅至商业人流强度",
  "防滑表面处理（参考 R9–R10），提升居家与公共空间安全",
  "防火 B1 级阻燃基材，遇火不易延烧、低烟",
];
const BRAND_PACK = [
  { label: "包装", value: "纸箱装，箱内泡棉/护角防护；托盘缠膜出口" },
  { label: "起订量", value: "按集装箱 / 平米计；支持多花色混装" },
  { label: "交期", value: "现货花色快速发货；定制花色随订单协商（参考 15–30 天）" },
  { label: "样品", value: "提供色卡与小样，大批量下单前确认花色与手感" },
];

export const LUMINA_SERIES_META: Record<string, SeriesMeta> = {
  spc: {
    story:
      "光年地板 SPC 石塑锁扣地板，以「石」为骨、以「塑」为韵 —— 钙粉与高纯 PVC 复合而成的刚性基材，赋予地板出色的尺寸稳定性与脚踏踏实的厚重质感。它生来防水、天生耐磨，撕去传统木地板「怕水、怕潮、怕变形」的标签；锁扣即装的设计，让一间屋子的焕新可以快到「一日成型」。对追求颜值与效率的年轻人而言，这是一块既能扛得住生活、又拍得出片的地面。",
    heritage:
      "SPC 是近年风靡欧美与亚洲的「网红地材」。光年地板把这一品类做透 —— 用全球领先的装饰膜还原真实木石肌理，再以华越自营工厂的供应链把成本压到友好区间，让「高级感」不再是高价的专属。",
    technicalSpecs: [
      { label: "类型", value: "SPC 石塑锁扣地板（石塑刚性基材）" },
      { label: "板材厚度", value: "4mm – 8mm" },
      { label: "背衬垫", value: "1.0 / 1.5 / 2.0mm EVA 或 IXPE 静音垫" },
      { label: "耐磨层", value: "0.2 / 0.3 / 0.5mm（透明 PVC 耐磨层）" },
      { label: "安装方式", value: "单边锁扣 / 一体锁扣，免胶点击式" },
      { label: "花色", value: "木纹 / 石纹 / 人字拼等 800+ 图案" },
      { label: "适用场景", value: "住宅、公寓、办公、零售、轻商业空间" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "💧", title: "天生防水", desc: "石塑基材遇水不膨胀、不变形，厨卫过道与潮湿地区皆可放心铺装。" },
      { icon: "🛡️", title: "刚硬耐磨", desc: "刚性基材+多档耐磨层，抗压抗刮、耐久度高，适配高人流商业空间。" },
      { icon: "⚡", title: "锁扣快装", desc: "免胶点击式拼装，旧房不铲地坪也能直铺，开荒到入住更快一步。" },
      { icon: "🌱", title: "环保静音", desc: "E0/E1 级基材搭配 EVA/IXPE 静音垫，脚感安静，绿色家装更安心。" },
      { icon: "🎨", title: "潮流花色", desc: "800+ 木纹石纹与潮流纹理，从原木侘寂到现代极简，一站配齐。" },
    ],
    projectShowcase: [
      "年轻公寓与小户型整屋翻新",
      "咖啡店、买手店、工作室等商业空间",
      "办公室、共享空间与展厅地面",
    ],
    faq: [
      { q: "SPC 地板可以铺在地暖上吗？", a: "可以。石塑基材导热稳定、变形小，适配水暖/电暖；建议按厂家分区铺装并控制升温速率。" },
      { q: "旧瓷砖/旧地坪上能直接铺吗？", a: "在基面平整、干燥的前提下，锁扣款可免铲直铺；不平处先做自流平找平即可。" },
      { q: "耐磨层怎么选？", a: "家用建议 0.3mm，商业及高人流空间建议 0.5mm；耐磨层越厚，使用寿命越长。" },
      { q: "起订量与样品？", a: "支持按集装箱/平米起订、多花色混装；可先寄色卡与小样确认花色手感。" },
    ],
  },
  lvt: {
    story:
      "光年地板 LVT 弹性地板，把「柔」做到了极致 —— 多层 PVC 复合结构带来温润脚感与出色静音，踩上去如履软毯却比软毯更易打理。它薄而轻盈，干式背衬、自粘、点击锁扣多种形态任选，能贴合每一种翻新与商用场景。当空间需要安静、舒适与设计自由时，LVT 是那块「藏在细节里的高级感」。",
    heritage:
      "LVT（Luxury Vinyl Tile）是全球商业地坪的常青主力 —— 机场、医院、连锁零售常年的选择。光年地板将这一专业品类带入年轻家居，用更友好的价格与更潮流的花色，让「商用级耐用」走进日常生活。",
    technicalSpecs: [
      { label: "类型", value: "LVT 多层弹性地板" },
      { label: "板材厚度", value: "2mm / 3mm（干式背衬·自粘）；4mm / 5mm（点击锁扣）" },
      { label: "耐磨层", value: "0.2 / 0.3 / 0.5mm" },
      { label: "安装方式", value: "干式背衬满胶 / 自粘撕贴 / 点击锁扣免胶" },
      { label: "花色", value: "木纹 / 石纹 / 编织纹等 800+ 图案" },
      { label: "特性", value: "静音、脚感舒适、耐磨易洁、柔韧防滑" },
      { label: "适用场景", value: "住宅、办公、医疗、教育、零售商业" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🤫", title: "静音脚感", desc: "多层弹性结构吸收脚步声，踩感柔软温润，居家办公更安静。" },
      { icon: "🪶", title: "轻薄百搭", desc: "2–3mm 超薄款不抬高地面、不卡门，旧房翻新与局部改造尤为友好。" },
      { icon: "🧩", title: "三种装法", desc: "满胶/自粘/锁扣随场景灵活选择，从快装翻新到长久工程都覆盖。" },
      { icon: "🧽", title: "耐磨易洁", desc: "商用级耐磨层抗踩抗刮，污渍一擦即净，维护成本低。" },
      { icon: "🦶", title: "柔韧防滑", desc: "表面防滑处理+弹性脚感，老人小孩居家更安心，公共空间更安全。" },
    ],
    projectShowcase: [
      "医院、诊所、养老机构等安静耐用场景",
      "学校、培训中心、母婴空间",
      "连锁零售、办公室与公寓快装翻新",
    ],
    faq: [
      { q: "自粘款和锁扣款怎么选？", a: "追求极速翻新、平整基面选自粘（撕膜即贴）；想要免胶、可拆装复用选点击锁扣款。" },
      { q: "LVT 和 SPC 有什么区别？", a: "LVT 更薄更柔、脚感静音；SPC 基材更硬、尺寸更稳更防水。重舒适选 LVT，重稳定防水选 SPC。" },
      { q: "适合商业空间吗？", a: "非常适合。LVT 是机场、医院、连锁零售的常用地材，耐磨易洁、可单片更换维护。" },
      { q: "提供花色定制吗？", a: "支持 OEM/ODM 花色与规格定制，可寄样确认；起订量灵活。" },
    ],
  },
};

/** Helper：按 seriesOriginal 获取元数据，缺省回退到 spc。 */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return LUMINA_SERIES_META[seriesOriginal.trim().toLowerCase()] || LUMINA_SERIES_META.spc;
}
