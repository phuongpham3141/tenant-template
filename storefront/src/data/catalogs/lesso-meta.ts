/**
 * 联塑各管道产品线的丰富元数据 —— 用于产品详情页。
 *
 * 以 seriesOriginal（中文原始标签："给水"、"排水"、"电力通信"……）为键。
 *
 * 来源说明：
 *   • 企业资料：中国联塑集团控股（China Liansu Group Holdings）
 *     —— 港交所上市代码 2128，公开年度报告。
 *   • 技术标准：中国国家 GB/T + 各管材适用的 ISO 标准
 *     （PVC-U / PE / PP-R / PE-RT）。
 *   • 产品参数：lessopipe.com 官方产品页。
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
  "ISO 14001 —— 环境管理体系",
  "ISO 45001 —— 职业健康安全",
  "CCC —— 中国强制性认证",
  "中国名牌产品 —— 中国国家知名品牌",
  "国家免检产品 —— 国家级免检产品",
  "符合 GB/T —— 各管材对应的中国国家标准",
];

const COMMON_MFG = [
  "中国联塑集团 —— 亚洲最大的塑料管道制造商，2010 年起在港交所上市，代码 2128",
  "1986 年创立于广东佛山 —— 在中国及海外拥有 30 多个生产基地",
  "塑料管道产能 > 300 万吨/年 —— 塑料管道全球最大规模",
  "一体化建材生态：管材及配件、阀门、装饰材料、卫浴设备",
  "自动挤出生产线，逐米在线检测管道的直径、壁厚、压力",
  "国家级材料实验室 —— 进行静水压、冲击、热老化测试",
];

const COMMON_PACKAGING = [
  { label: "成捆/成件包装", value: "管材缠绕 PE 膜 + 塑料打包带；配件装纸箱" },
  { label: "标准长度", value: "硬管通常 4m 或 6m；PE 盘管按盘" },
  { label: "标识打印", value: "直接打印在管体上：品牌、规格、标准、压力" },
  { label: "进口起订量", value: "1 个 20ft / 40ft HQ 集装箱 —— 可混装多种规格" },
  { label: "仓储保管", value: "干燥处，避免阳光直射；平放，勿堆叠过高" },
];

const COMMON_INSTALL = [
  "安装前请仔细阅读与管材种类对应的施工标准",
  "连接前将管材垂直切割、倒角并清除毛刺",
  "按材质选用正确的连接方式：热熔（PP-R/PE-RT）、对接/电熔焊接（PE）、胶粘（PVC-U）、卡压（不锈钢）",
  "安装后、验收及回填前进行全线压力测试",
  "埋地管材：铺设砂垫层，按规程回填与夯实，避免变形",
];

const COMMON_CARE = [
  {
    title: "安装前",
    desc: "检查管体无裂纹、无凹陷；接头、橡胶圈完好。让管材温度与安装环境相适应。",
  },
  {
    title: "运行中",
    desc: "在各管材的公称压力与允许温度范围内运行。避免对明装管线施加强烈的机械冲击。",
  },
  {
    title: "定期维保",
    desc: "检查接头、阀门处是否渗漏；清洁管路前端的过滤网。对热水供应系统，检查热胀冷缩与支座。",
  },
];

const COMMON_FAQ = [
  {
    q: "联塑产品是否具备进口越南的标准文件？",
    a: "有。联塑提供 CO（原产地证）、CQ（质量证）及对应 GB/T 标准的检测报告。华越供应链协助办理越南进口与合规手续。",
  },
  {
    q: "最小起订量（MOQ）与交货周期是多久？",
    a: "起订量通常按集装箱计；1 个集装箱内可混装多种规格。生产 + 运至越南的周期视品类而定，华越供应链按订单提供具体时间表。",
  },
  {
    q: "是否提供压力等级 / 材质选型咨询？",
    a: "有。提供使用条件（介质、温度、压力、埋地或明装），技术团队将推荐合适的管材与配件。",
  },
];

function mk(
  partial: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">
): SeriesMeta {
  return {
    ...partial,
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    faq: COMMON_FAQ,
  };
}

export const LESSO_SERIES_META: Record<string, SeriesMeta> = {
  // 给水
  给水: mk({
    story:
      "联塑给水管系列包括 PVC-U、PE 和 PP-R —— 服务从城市给水管线、建筑给水到室内冷热水系统。这是奠定联塑亚洲最大塑料管道制造商地位的核心产品群。",
    heritage:
      "联塑自 1986 年起研发给水管，持续拓展 PVC-U → PE100 → PP-R 材料系列，覆盖民用、城市与工业的全部给水需求。",
    technicalSpecs: [
      { label: "材质", value: "PVC-U / PE80 / PE100 / PP-R" },
      { label: "压力等级", value: "0.63 – 2.5 MPa（视产品而定）" },
      { label: "连接", value: "胶粘（PVC-U）、热熔（PP-R）、对接/电熔焊接（PE）" },
      { label: "热水温度（PP-R）", value: "长期至 70°C，短期 95°C" },
      { label: "标准", value: "GB/T 10002（PVC-U）、GB/T 13663（PE）、GB/T 18742（PP-R）" },
    ],
    whyChoose: [
      { icon: "💧", title: "饮水安全", desc: "材质满足生活饮用水接触要求，不溶出重金属。" },
      { icon: "🔧", title: "管材+配件配套", desc: "管材与配件同系，公差贴合，接口密封耐用。" },
      { icon: "🏭", title: "亚洲第一规模", desc: "供货能力强、稳定，适合大批量项目。" },
    ],
    projectShowcase: [
      "城区与高层住宅给水",
      "住宅、酒店的 PP-R 冷热水系统",
      "工业区埋地给水管线",
    ],
  }),

  // 排水
  排水: mk({
    story:
      "联塑排水产品群涵盖室内 PVC-U 排水管、HDPE/PVC-U 双壁波纹管、缠绕结构壁管（克拉管）到屋面虹吸排水系统及塑料检查井 —— 满足建筑、市政与地下基础设施排水。",
    heritage:
      "波纹管与缠绕结构壁管是联塑的基础设施强项，广泛用于中国大型排水与市政项目。",
    technicalSpecs: [
      { label: "材质", value: "PVC-U / HDPE" },
      { label: "环刚度等级（SN）", value: "SN4 / SN8（视波纹管产品而定）" },
      { label: "构造", value: "实壁 / 双壁波纹 / 中空壁缠绕" },
      { label: "介质温度", value: "≤ 40°C（普通排水）" },
      { label: "标准", value: "GB/T 5836（PVC-U）、GB/T 19472（HDPE 波纹）" },
    ],
    whyChoose: [
      { icon: "🌀", title: "波纹管环刚度高", desc: "耐土压、质轻、施工快，适合埋地管线。" },
      { icon: "🏗️", title: "面向大型基础设施", desc: "克拉管与缠绕管用于大口径排水管、市政工程。" },
      { icon: "🏠", title: "室内配套", desc: "同层排水与屋面虹吸系统适配现代建筑。" },
    ],
    projectShowcase: [
      "住宅区、市政的雨水及污水排放",
      "会展中心、车站的屋面虹吸排水系统",
      "大口径基础设施管线（克拉管）",
    ],
  }),

  // 电力通信
  电力通信: mk({
    story:
      "联塑穿线管系列包括电力电缆保护管、通信管（实壁、多孔、蜂窝、格栅）及非开挖施工 MPP 管 —— 保护城市基础设施中的地下电缆线路。",
    heritage:
      "联塑为地下电网与通信提供配套的穿线管解决方案，契合中国城市基础设施入地化浪潮。",
    technicalSpecs: [
      { label: "材质", value: "PE / PVC / PVC-C / MPP（改性PP）" },
      { label: "构造", value: "实壁 / 多孔 / 蜂窝 / 格栅" },
      { label: "施工", value: "明埋与非开挖（MPP抗拉强度高）" },
      { label: "特性", value: "绝缘、阻燃（专用产品）" },
      { label: "标准", value: "电缆保护管中国国家标准GB/T" },
    ],
    whyChoose: [
      { icon: "⚡", title: "电缆长效保护", desc: "绝缘、耐腐蚀，在地下环境中保护电缆。" },
      { icon: "🛠️", title: "非开挖（MPP）", desc: "高抗拉MPP管用于地下定向钻，减少路面破坏。" },
      { icon: "🧩", title: "多种构造", desc: "蜂窝/多孔/格栅在单一截面内优化电缆路数。" },
    ],
    projectShowcase: [
      "城市电网与通信电缆入地",
      "综合管廊、隧道、地铁线路",
      "穿越道路的地下定向钻管线（MPP）",
    ],
  }),

  // 采暖
  采暖: mk({
    story:
      "联塑供热与采暖系列包括PE-RT地暖管、阻氧管、集中供热二次管网管及配件（分集水器、过滤套阀）——用于民用地暖与区域供热。",
    heritage:
      "PE-RT凭借柔韧、耐热与良好的弯曲性能成为地暖核心材料——联塑为采暖市场研发了多个高端家装系列。",
    technicalSpecs: [
      { label: "材质", value: "PE-RT（I/II型），含阻氧层（EVOH）" },
      { label: "工作温度", value: "长期至70°C" },
      { label: "应用", value: "地暖、墙暖、集中供热二次管网" },
      { label: "连接", value: "热熔/经配件卡压" },
      { label: "标准", value: "GB/T 28799（PE-RT供热）" },
    ],
    whyChoose: [
      { icon: "🔥", title: "地暖柔顺", desc: "PE-RT弯曲性好、弯曲半径小，便于铺设地暖盘管。" },
      { icon: "🛡️", title: "阻氧", desc: "EVOH阻氧层隔绝氧气，保护供热系统中的金属设备。" },
      { icon: "🧰", title: "配件配套", desc: "分集水器、过滤套阀同系，便于整体安装。" },
    ],
    projectShowcase: [
      "住宅、别墅地暖",
      "住宅区集中供热二次管网",
      "中国北方公共建筑采暖",
    ],
  }),

  // 通风
  通风: mk({
    story:
      "联塑通风产品群包括PE新风管、PVC-U风管、铝箔复合管及各类管卡/支撑配件——用于民用建筑与养殖的通风及新风系统。",
    heritage:
      "顺应现代住宅新风趋势，联塑补充了风管系列及通风系统固定配件。",
    technicalSpecs: [
      { label: "材质", value: "PE / PVC-U / 铝箔复合管" },
      { label: "应用", value: "住宅新风、建筑风管、养殖通风" },
      { label: "配件", value: "快装管卡、包胶不锈钢管卡、燕尾三通" },
      { label: "特性", value: "质轻、表面光滑降低压损" },
      { label: "标准", value: "按对应塑料管标准" },
    ],
    whyChoose: [
      { icon: "🌬️", title: "洁净新风", desc: "内壁光滑、少积尘，风管易清洁。" },
      { icon: "🔩", title: "固定配件丰富", desc: "快装管卡与支撑配件，施工简洁牢固。" },
      { icon: "🪶", title: "重量轻", desc: "安装快捷，减轻吊顶与墙体的承重。" },
    ],
    projectShowcase: [
      "公寓、别墅新风系统",
      "商业建筑风管",
      "养殖场通风",
    ],
  }),

  // 农业
  农业: mk({
    story:
      "联塑农业与水产产品群包括PE输水管、低压灌溉管、滴灌带、增强软管、栽培槽/栽培管及网箱–网箱框架–海上集成房屋等水产养殖方案。",
    heritage:
      "联塑从灌溉管拓展至高科技农业方案（基质栽培）与海水养殖（抗浪HDPE网箱）。",
    technicalSpecs: [
      { label: "材质", value: "PE / HDPE / PVC-U / 增强纤维" },
      { label: "应用", value: "灌溉、输水、基质栽培、水产养殖网箱" },
      { label: "产品系列", value: "灌溉管、滴灌、软管、网箱框架与网箱" },
      { label: "特性", value: "耐候、抗紫外线（户外产品）" },
      { label: "标准", value: "PE/PVC灌溉管的GB/T标准" },
    ],
    whyChoose: [
      { icon: "🌾", title: "节水灌溉", desc: "滴灌与喷灌降低用水量，提升耕作效率。" },
      { icon: "🐟", title: "抗浪网箱", desc: "HDPE框架与网箱耐海洋环境、抗紫外线。" },
      { icon: "🌱", title: "高科技种植", desc: "基质栽培槽与栽培管用于都市农业、温室大棚。" },
    ],
    projectShowcase: [
      "农田、果园滴灌系统",
      "海水养殖场 – HDPE 圆形网箱",
      "温室大棚基质栽培模式",
    ],
  }),

  // 工业
  工业: mk({
    story:
      "联塑工业专用产品群包括美标 PVC SCH80 管、工业 PVC-U 管、用于油气 – 采矿的 RTP/钢丝复合管及高阻隔输氢软管 —— 适用于高压与强腐蚀的严苛环境。",
    heritage:
      "联塑以专用的耐压、耐腐蚀管材服务重工业（化工、采矿、油气），并提供面向新能源的输氢管方案。",
    technicalSpecs: [
      { label: "材质", value: "PVC SCH80 / PVC-U / RTP 复合管（玻纤）/ 钢丝增强" },
      { label: "应用", value: "油气、化工、采矿、输氢" },
      { label: "特性", value: "耐高压、耐化学腐蚀" },
      { label: "输氢", value: "高阻隔软管用于氢气系统（≤10 MPa，-20~65°C）" },
      { label: "标准", value: "ASTM（SCH80）+ 工业 GB/T" },
    ],
    whyChoose: [
      { icon: "🛢️", title: "耐压耐腐蚀", desc: "适用于化工介质、油气、矿浆等严苛工况。" },
      { icon: "🧪", title: "国际标准", desc: "美标 PVC SCH80 适用于出口工业系统。" },
      { icon: "🔋", title: "新能源", desc: "面向清洁能源基础设施的输氢管方案。" },
    ],
    projectShowcase: [
      "化工管线与工业水处理",
      "油气田集输管线（RTP）",
      "氢气储存 – 输送系统",
    ],
  }),

  // 消防
  消防: mk({
    story:
      "联塑消防产品群包括 PVC-C 消防管、涂塑 EP 钢塑复合管、卷盘消防软管及各类镀锌/防火专用穿线管 —— 用于消防系统及防火电气线路。",
    heritage:
      "联塑提供从消防给水管到防火穿线管的一体化消防方案，服务商业与公共建筑。",
    technicalSpecs: [
      { label: "材质", value: "PVC-C / 涂塑 EP 钢塑复合管 / 镀锌钢" },
      { label: "应用", value: "消防给水、防火穿线管" },
      { label: "穿线管等级", value: "轻 / 中 / 重 / 超重型（镀锌）" },
      { label: "特性", value: "耐热、阻燃、绝缘" },
      { label: "标准", value: "消防管及金属穿线管的 GB/T 标准" },
    ],
    whyChoose: [
      { icon: "🧯", title: "防火安全", desc: "阻燃材料用于消防中的给水与电气线路。" },
      { icon: "🔩", title: "多强度等级", desc: "镀锌穿线管多等级，按工程要求选用。" },
      { icon: "🏢", title: "面向大型建筑", desc: "为酒店、商业综合体、公共建筑配套。" },
    ],
    projectShowcase: [
      "高层建筑消防给水系统",
      "商场防火电气线路",
      "公共基础设施镀锌穿线管",
    ],
  }),

  // 燃气
  燃气: mk({
    story:
      "联塑燃气系列包括埋地 PE 燃气输送管及燃气用铝塑复合管 —— 用于安全的城市与民用燃气分配系统。",
    heritage:
      "PE 燃气管凭借密封性、柔韧性与长寿命成为地下燃气分配管网的标准；联塑按专用燃气管标准生产。",
    technicalSpecs: [
      { label: "材质", value: "PE（燃气专用）/ 铝塑复合管" },
      { label: "工作温度", value: "-20 ~ 40°C（PE 燃气管）" },
      { label: "压力", value: "长期最大 ≤ 0.7 MPa（视产品而定）" },
      { label: "识别颜色", value: "燃气管线为黄色或黑色带黄条" },
      { label: "标准", value: "GB 15558（PE 燃气管）" },
    ],
    whyChoose: [
      { icon: "🔥", title: "燃气安全", desc: "焊接密封无渗漏，用于燃气分配管网。" },
      { icon: "♻️", title: "寿命长", desc: "埋地 PE 管设计寿命 50 年，耐腐蚀。" },
      { icon: "🚧", title: "标识清晰", desc: "专用颜色便于识别燃气管线，施工安全。" },
    ],
    projectShowcase: [
      "城市燃气分配管网",
      "住宅区民用燃气管线",
      "工业供气",
    ],
  }),
};

/** 辅助函数：按 seriesOriginal（联塑中文原始标签）获取元数据。 */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  const key = seriesOriginal.split(/[·\/\s]/)[0].trim();
  return LESSO_SERIES_META[key];
}
