/**
 * 索菲亚 SOFEYIA 全屋定制 元数据 —— 产品详情页富文本。以 seriesOriginal（品类）为键。
 * 来源：SOFEYIA 海外主画册（2025.10）。源自法国设计、扎根中国制造的全屋定制家居品牌。
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

const CERTS = [
  "环保基材等级 E0 / ENF 级 —— 甲醛释放量符合并优于国家标准，室内更安心",
  "符合定制家居 / 人造板及木质家具国家标准（GB）",
  "五金件经开合耐久测试 —— 铰链、滑轨长期顺滑稳定",
  "按 ISO 9001 标准建立的质量管理体系，设计—生产—安装全程受控",
];
const MFG = [
  "索菲亚 SOFEYIA —— 源自法国设计、扎根中国制造的全屋定制家居品牌（衣柜、橱柜、木门、浴室柜等）",
  "数字化柔性生产线，按单定制 —— 一人一户一方案，板件按图切割、封边、开孔",
  "环保基材（E0 / ENF 级）+ 进口五金，全屋同色同系、工厂一体出货",
  "「设计 → 测量 → 生产 → 安装 → 售后」一体化服务链，整家落地更省心",
];
const PACK = [
  { label: "供货形式", value: "按单定制，板件 + 五金 + 配件成套发货" },
  { label: "定制", value: "按户型、动线与风格量身设计，颜色 / 五金 / 造型可选配" },
  { label: "运输防护", value: "板件分件包装、边角加护，五金独立封装，减少运输磕碰" },
  { label: "服务", value: "上门复尺 → 工厂生产 → 专业安装 → 售后跟进" },
];
const INSTALL = [
  "设计师上门复尺，结合户型与需求出深化方案与效果图",
  "方案确认后工厂按单切割、封边、开孔，板件编号成套发货",
  "专业团队上门安装，校准柜体水平、调试铰链与滑轨",
  "安装后清洁验收，讲解使用与保养要点后交付",
];
const CARE = [
  { title: "日常清洁", desc: "用柔软湿布顺纹擦拭，避免硬物刮擦与强酸碱清洁剂，保持饰面光洁。" },
  { title: "防潮通风", desc: "保持室内通风，远离持续水汽与积水；厨房 / 卫浴柜体注意及时擦干。" },
  { title: "五金保养", desc: "定期检查并调试铰链、滑轨与拉手，保持开合顺滑、柜门对齐。" },
  { title: "承重得当", desc: "层板与抽屉按建议承重使用，重物靠近柜体两侧，延长使用寿命。" },
];
const FAQ = [
  { q: "索菲亚是定制还是成品家具？", a: "是按单全屋定制 —— 依户型、动线与风格量身设计生产，衣柜、橱柜、木门、浴室柜可整屋统一，而非标准成品。" },
  { q: "板材环保吗？", a: "采用 E0 / ENF 级环保基材，甲醛释放量符合并优于国家标准；可按项目提供相应板材的环保说明。" },
  { q: "能整屋统一风格吗？", a: "可以。这正是索菲亚「全屋定制」的核心 —— 衣柜、橱柜、客餐厅柜、木门与浴室柜可同色同系，通体协调。" },
  { q: "在越南能提供设计与安装吗？", a: "请联系华越，获取适合项目的全屋定制设计、测量、供货与安装方案咨询。" },
];

function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}

const WHY_BRAND = { icon: "🏛️", title: "法式设计 · 中国制造", desc: "源自法国的设计语言 + 扎根中国的柔性制造，让高端全屋定制更可亲近。" };
const WHY_ONESTOP = { icon: "🧩", title: "一站式整家", desc: "衣柜、橱柜、木门、浴室柜同色同系，一套设计语言贯穿全屋。" };
const WHY_ECO = { icon: "🌿", title: "环保基材", desc: "E0 / ENF 级基材，甲醛释放量优于国标，室内更安心。" };

export const SOFEYIA_SERIES_META: Record<string, SeriesMeta> = {
  "whole-home": mk({
    story:
      "索菲亚全屋定制，把「整个家」当成一件作品来设计 —— 从玄关、客餐厅到卧室、厨房与卫浴，衣柜、橱柜、木门、浴室柜被统一在同一套设计语言之中，色彩、五金与木纹通体呼应，不再是东拼西凑的单品堆砌。源自法国的优雅比例与现代极简线条，让高级感落在日常的每一处细节；成品级设计系列（如 Salon Gathering 沙龙、Evening Dress 晚礼服）可整屋直接落地，省去反复搭配的烦恼。一站式的设计—测量—生产—安装，让「理想之家」从效果图到现实，少走弯路。",
    heritage:
      "全屋定制是索菲亚的核心能力 —— 以「一人一户一方案」的柔性制造，把法式设计与中国智造结合，服务追求整体感与高品质的家庭。",
    technicalSpecs: [
      { label: "类型", value: "全屋定制家居（一站式整家方案）" },
      { label: "覆盖品类", value: "衣柜 · 橱柜 · 客餐厅柜 · 木门 · 浴室柜" },
      { label: "设计系列", value: "Salon Gathering / Evening Dress / Michelin 等多套" },
      { label: "基材", value: "E0 / ENF 级环保基材 + 进口五金" },
      { label: "风格", value: "法式优雅 · 现代极简 · 静奢" },
      { label: "服务", value: "设计 → 测量 → 生产 → 安装 → 售后一体" },
    ],
    whyChoose: [WHY_BRAND, WHY_ONESTOP, WHY_ECO, { icon: "📐", title: "量身定制", desc: "按户型与动线深化设计，空间利用更充分。" }],
    projectShowcase: ["新房整装与精装升级", "高端住宅与别墅整家", "样板房与设计师项目"],
  }),
  wardrobe: mk({
    story:
      "索菲亚定制衣柜与衣帽间，是为「衣物的秩序与仪式感」而生 —— 以 Evening Dress 晚礼服系列为代表，通顶柜体把层高用到极致，转角衣帽间、岛台抽屉与玻璃门展示柜让每件衣物各归其位。柔光层板灯在取放时自动点亮，叠放区、悬挂区、抽屉与饰品格分区清晰；细腻木纹与哑光色板搭配金属拉手，把更衣这件小事变成每天的精致仪式。",
    heritage:
      "衣储是索菲亚起家与最见功力的品类 —— 以人因工学与分区收纳逻辑，让衣帽间既能装得多，又能拿得顺、看得美。",
    technicalSpecs: [
      { label: "类型", value: "定制衣柜 / 步入式衣帽间" },
      { label: "代表系列", value: "Evening Dress 晚礼服 等" },
      { label: "配置", value: "通顶柜体 · 转角衣帽间 · 岛台抽屉 · 玻璃展示门 · 柔光层板灯" },
      { label: "饰面", value: "细腻木纹 / 哑光色板 + 金属拉手" },
      { label: "基材", value: "E0 / ENF 级环保基材" },
      { label: "适用", value: "主卧、次卧、儿童房、独立衣帽间" },
    ],
    whyChoose: [WHY_BRAND, { icon: "👗", title: "分区收纳", desc: "悬挂/叠放/抽屉/饰品分区清晰，取放更顺手。" }, { icon: "💡", title: "柔光层板灯", desc: "取放自动点亮，深柜也一目了然。" }, WHY_ECO],
    projectShowcase: ["主卧通顶衣柜", "独立步入式衣帽间", "儿童房与次卧收纳"],
  }),
  kitchen: mk({
    story:
      "索菲亚定制橱柜，把厨房从「做饭的地方」升级为「社交的舞台」—— Party 派对与 Michelin 米其林系列以岛台、中西分厨与电器高柜重构动线，洗、切、炒、备一气呵成。木纹与哑光面板碰撞出温润高级感，无缝台面易清洁、抗污耐用，嵌入式家电让立面干净利落。一桌好菜的烟火气，与一处体面的待客空间，在这里合二为一。",
    heritage:
      "橱柜是索菲亚全屋定制的关键一环 —— 以合理动线与一体收纳，把高频使用的厨房做得既好用又耐看。",
    technicalSpecs: [
      { label: "类型", value: "定制橱柜（整体厨房）" },
      { label: "代表系列", value: "Party 派对 / Michelin 米其林 等" },
      { label: "布局", value: "一字型 / L 型 / 岛台 / 中西分厨" },
      { label: "配置", value: "嵌入式家电 · 电器高柜 · 无缝台面 · 拉篮收纳" },
      { label: "饰面", value: "木纹 × 哑光面板高级配色" },
      { label: "适用", value: "开放式厨房、中西厨、公寓与别墅" },
    ],
    whyChoose: [WHY_BRAND, { icon: "🍳", title: "顺手动线", desc: "洗切炒备分区合理，岛台扩展操作与社交空间。" }, { icon: "🧽", title: "易洁耐用", desc: "无缝台面抗污耐磨，日常打理省心。" }, WHY_ECO],
    projectShowcase: ["开放式中西厨", "岛台社交厨房", "公寓与别墅整体厨房"],
  }),
  cabinet: mk({
    story:
      "索菲亚餐边柜与酒柜，为家中留出一处「微醺的高光角落」—— Vacation 度假系列以通顶酒格、玻璃恒温酒柜与岛台吧台一体设计，把餐厅收纳与品酒待客融为一体。金属线条勾勒深色饰面，隐藏储物把杂物收于无形，灯光一开，平凡的一面墙就成了会客与小酌的主场。",
    heritage:
      "餐边与酒柜是索菲亚提升「生活仪式感」的点睛品类 —— 既解决餐厅收纳，也承载待客与品酒的情绪价值。",
    technicalSpecs: [
      { label: "类型", value: "餐边柜 / 酒柜 / 吧台柜" },
      { label: "代表系列", value: "Vacation 度假 等" },
      { label: "配置", value: "通顶酒格 · 玻璃门展示 · 隐藏储物 · 岛台吧台" },
      { label: "饰面", value: "深色木纹 / 玻璃 + 金属线条" },
      { label: "基材", value: "E0 / ENF 级环保基材" },
      { label: "适用", value: "餐厅、家庭吧台、会客与品酒区" },
    ],
    whyChoose: [WHY_BRAND, { icon: "🍷", title: "品酒待客", desc: "酒格 + 玻璃酒柜 + 吧台，餐厅秒变社交主场。" }, { icon: "🗄️", title: "隐藏收纳", desc: "杂物收于无形，立面始终清爽体面。" }, WHY_ONESTOP],
    projectShowcase: ["餐厅餐边收纳墙", "家庭吧台与酒窖角", "会客与品酒空间"],
  }),
  living: mk({
    story:
      "索菲亚客厅定制，以一整面「会呼吸的墙」重新定义客厅 —— Leisurely Duke 悠然公爵系列把电视背景、书架、展示格与隐形储物融为完整立面，影音线缆与杂物尽数收纳于无形。温润木色搭配米杏软装，让客厅在大气与从容之间找到平衡，既是家人相聚的中心，也是品味的展示窗。",
    heritage:
      "客厅定制是索菲亚把「收纳」升华为「立面设计」的代表 —— 让电视墙不再单调，而成为整屋风格的视觉锚点。",
    technicalSpecs: [
      { label: "类型", value: "客厅定制（电视柜 / 整墙收纳）" },
      { label: "代表系列", value: "Leisurely Duke 悠然公爵 等" },
      { label: "配置", value: "电视背景墙 · 书架展示格 · 隐形储物 · 影音集成" },
      { label: "风格", value: "温润木色 · 米杏轻奢" },
      { label: "基材", value: "E0 / ENF 级环保基材" },
      { label: "适用", value: "客厅电视墙、书房、会客厅堂" },
    ],
    whyChoose: [WHY_BRAND, { icon: "📺", title: "电视墙一体", desc: "背景墙 + 收纳 + 影音集成，立面完整大气。" }, { icon: "📚", title: "展示与收纳", desc: "书架展示格与隐形储物兼得，客厅更有格调。" }, WHY_ONESTOP],
    projectShowcase: ["客厅电视背景墙", "书房与会客厅", "整墙收纳立面"],
  }),
  master: mk({
    story:
      "索菲亚主卧定制，把卧室升级为「酒店式套房」—— Fayven Master 系列将床头背景墙、床身、床头柜与衣储统一规划，柔包背景与暗藏灯带营造静谧氛围，睡眠区与更衣区分而不隔。从一面背景墙到整间套房，私密、从容而有仪式感，让每天的入睡与醒来都被温柔以待。",
    heritage:
      "主卧定制是索菲亚把「卧室」做成「套房体验」的进阶品类 —— 以一体化设计统一睡眠、收纳与氛围。",
    technicalSpecs: [
      { label: "类型", value: "主卧定制（背景墙 + 床身 + 收纳）" },
      { label: "代表系列", value: "Fayven Master 等" },
      { label: "配置", value: "柔包背景墙 · 暗藏灯带 · 通顶衣柜 · 床头柜" },
      { label: "风格", value: "酒店式 · 静奢" },
      { label: "基材", value: "E0 / ENF 级环保基材" },
      { label: "适用", value: "主卧套房、高端公寓卧室、民宿客房" },
    ],
    whyChoose: [WHY_BRAND, { icon: "🛏️", title: "套房体验", desc: "背景墙+床身+收纳一体，酒店式主卧落地。" }, { icon: "🌙", title: "静谧氛围", desc: "暗藏灯带与柔包背景，营造安睡氛围。" }, WHY_ONESTOP],
    projectShowcase: ["酒店式主卧套房", "高端公寓与别墅卧室", "精品民宿客房"],
  }),
  door: mk({
    story:
      "索菲亚室内木门，让「门」也成为整屋设计的一部分 —— 与柜体同色同系的成套木门，平板、造型与极简线条多款可选，门套、墙板与柜体在色彩与质感上通体协调，告别各装各的割裂感。静音锁体与稳定门芯兼顾质感与耐用，开合之间，是整屋风格的延续与体面。",
    heritage:
      "成套木门是索菲亚「全屋同色同系」理念的重要拼图 —— 把常被忽略的门，纳入整体设计语言。",
    technicalSpecs: [
      { label: "类型", value: "室内门 / 木门（成套）" },
      { label: "款式", value: "平板门 / 造型门 / 极简线条门" },
      { label: "搭配", value: "与全屋定制同色同系，门套 + 墙板协调" },
      { label: "配置", value: "静音锁体 · 稳定门芯" },
      { label: "基材", value: "环保门芯基材" },
      { label: "适用", value: "卧室、书房、整装成套木门" },
    ],
    whyChoose: [WHY_BRAND, WHY_ONESTOP, { icon: "🔇", title: "静音稳定", desc: "静音锁体与稳定门芯，质感与耐用兼顾。" }, WHY_ECO],
    projectShowcase: ["卧室与书房成套木门", "整装室内门工程", "高端住宅室内门"],
  }),
  vanity: mk({
    story:
      "索菲亚浴室柜，把「全屋同系」延伸到卫浴空间 —— NINI 等系列以防潮基材与一体陶瓷/岩板台盆打造现代卫浴：壁挂式柜体让地面更易清洁，智能镜柜与侧边收纳塔组合灵活，柔光镜灯与金属拉手提升精致度。在潮湿环境下依旧稳定耐用，让卫浴也拥有与全屋一致的高级质感。",
    heritage:
      "浴室柜让索菲亚的全屋定制覆盖到最后一处空间 —— 以防潮工艺把设计感与耐用性带进卫浴。",
    technicalSpecs: [
      { label: "类型", value: "浴室柜（卫浴定制）" },
      { label: "代表系列", value: "NINI 等" },
      { label: "配置", value: "壁挂柜体 · 一体陶瓷/岩板台盆 · 智能镜柜 · 侧收纳塔" },
      { label: "基材", value: "防潮基材，适应潮湿环境" },
      { label: "饰面", value: "柔光镜灯 + 金属拉手" },
      { label: "适用", value: "主卫、客卫、高端住宅卫浴" },
    ],
    whyChoose: [WHY_BRAND, { icon: "🚿", title: "防潮耐用", desc: "防潮基材壁挂柜体，潮湿环境下依旧稳定。" }, { icon: "🪞", title: "智能镜柜", desc: "镜柜 + 收纳塔 + 柔光镜灯，精致又实用。" }, WHY_ONESTOP],
    projectShowcase: ["主卫与客卫浴室柜", "壁挂式卫浴收纳", "高端住宅卫浴"],
  }),
};

/** 按 seriesOriginal 获取元数据，缺省回退到 whole-home。 */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return SOFEYIA_SERIES_META[seriesOriginal.trim()] || SOFEYIA_SERIES_META["whole-home"];
}
