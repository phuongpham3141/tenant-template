/**
 * 东芝电梯元数据 —— 详情页。以 seriesOriginal（catKey）为键。
 * 来源：toshiba-elevator.com.cn —— 东芝电梯（中国）有限公司。
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
const CERTS = ["国际电梯安全标准 & GB 7588", "ISO 9001 / ISO 14001", "日本东芝技术", "安全检验与验收"];
const MFG = [
  "Toshiba Elevator 东芝电梯 —— 东芝集团（日本）的电梯品牌，在中国运营",
  "东芝曳引与控制技术：静音、节能、高安全",
  "产品线：高速电梯、乘客电梯、自动扶梯、自动人行道、家用电梯、加装电梯",
  "专业的安装系统与技术服务",
];
const PACK = [
  { label: "供应方式", value: "整梯 + 按项目安装" },
  { label: "服务", value: "勘测、安装、维保、现代化改造" },
];
const INSTALL = [
  "勘测井道、行程、载重以选定配置",
  "由受训技术团队安装；按标准进行安全验收",
  "投入使用前进行试运行与安全检验",
];
const CARE = [
  { title: "定期维保", desc: "按计划维保：检查钢丝绳/导轨、制动器、门、控制系统，并润滑。" },
  { title: "安全", desc: "定期安全检验；出现异常立即处理。" },
];
const FAQ = [
  { q: "东芝电梯在越南有支持吗？", a: "请联系华越供应链，获取契合项目的供货、安装与技术服务咨询。" },
  { q: "交货与安装周期？", a: "视配置与项目而定；根据实地勘测提供时间表。" },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🇯🇵", title: "日本东芝技术", desc: "日系电梯品牌，静音 – 安全 – 节能。" };
const SHOW = ["写字楼与商场", "高层住宅", "火车站、机场、公共建筑"];
const PASS = mk({
  story: "东芝乘客电梯（ELCOSMO 小机房，SPACEL 无机房）—— 运行静音、节能、优化井道空间，适用于楼宇与住宅。",
  heritage: "ELCOSMO 与 SPACEL 是东芝电梯的主力乘客电梯产品线。",
  technicalSpecs: [{ label: "类型", value: "乘客电梯（有/无机房）" }, { label: "技术", value: "无齿轮曳引，VVVF 控制" }, { label: "应用", value: "办公、住宅、商业" }],
  whyChoose: [WHY, { icon: "🔇", title: "运行静音", desc: "静音曳引技术，平稳安静。" }, { icon: "⚡", title: "节能", desc: "能效优化控制，具备电能回馈。" }],
  projectShowcase: SHOW,
});
export const TOSHIBA_ELEVATOR_SERIES_META: Record<string, SeriesMeta> = {
  "high-speed": mk({
    story: "东芝高速电梯（New ELBRIGHT）—— 适用于超高层建筑，速度快，高速运行仍平稳安静，配减振与气压平衡技术。",
    heritage: "ELBRIGHT 是面向摩天大楼的最高端产品线。",
    technicalSpecs: [{ label: "类型", value: "高速电梯" }, { label: "应用", value: "超高层建筑、地标" }, { label: "技术", value: "减振，高速稳定" }],
    whyChoose: [WHY, { icon: "🚀", title: "高速平稳", desc: "高速运行仍平稳舒适。" }, { icon: "🏙️", title: "面向摩天大楼", desc: "超高层建筑解决方案。" }],
    projectShowcase: SHOW,
  }),
  passenger: PASS, "passenger-elevator": PASS,
  escalator: mk({
    story: "东芝自动扶梯（KINDMOVER）—— 适用于商场、火车站、机场；连续运行、安全、配智能待机节能。",
    heritage: "KINDMOVER 是东芝的主力自动扶梯产品线。",
    technicalSpecs: [{ label: "类型", value: "自动扶梯" }, { label: "应用", value: "商场、火车站、机场" }, { label: "特性", value: "节能、待机模式" }],
    whyChoose: [WHY, { icon: "🏬", title: "面向大型建筑", desc: "满足高客流，连续运行。" }, { icon: "🌱", title: "节能", desc: "智能待机模式降低耗电。" }],
    projectShowcase: SHOW,
  }),
  "moving-walk": mk({
    story: "东芝自动人行道 —— 在平面/缓坡上运送乘客与行李，适用于机场、火车站、大型商场。",
    heritage: "自动人行道为大型建筑提供水平交通辅助。",
    technicalSpecs: [{ label: "类型", value: "自动人行道（moving walk）" }, { label: "应用", value: "机场、火车站、商场" }, { label: "特性", value: "水平运送、安全、连续" }],
    whyChoose: [WHY, { icon: "🧳", title: "面向机场/车站", desc: "便捷运送乘客与行李长距离。" }, { icon: "🛡️", title: "安全", desc: "符合标准的安全系统与紧急停止。" }],
    projectShowcase: SHOW,
  }),
  home: mk({
    story: "东芝家用电梯（SPACEL-H）—— 适用于别墅与联排住宅：小巧、静音、安全，搭载东芝技术，内饰选择丰富。",
    heritage: "SPACEL-H 将东芝技术带入居家空间。",
    technicalSpecs: [{ label: "类型", value: "家用电梯（SPACEL-H）" }, { label: "应用", value: "别墅、联排住宅" }, { label: "优点", value: "小巧、静音、安全" }],
    whyChoose: [WHY, { icon: "🏡", title: "面向住宅", desc: "设计紧凑、静音，适配小井道。" }, { icon: "🛡️", title: "东芝安全", desc: "符合东芝标准的安全功能。" }],
    projectShowcase: ["别墅", "多层联排住宅"],
  }),
  retrofit: mk({
    story: "东芝加装电梯解决方案 —— 为既有建筑（旧住宅楼、联排住宅）加装电梯，优化既有结构，施工简洁。",
    heritage: "加装方案满足旧建筑升级需求。",
    technicalSpecs: [{ label: "类型", value: "加装电梯（retrofit）" }, { label: "应用", value: "旧住宅楼、既有建筑" }, { label: "优点", value: "优化既有结构，施工简洁" }],
    whyChoose: [WHY, { icon: "🏗️", title: "面向旧楼", desc: "为尚无电梯的建筑加装电梯。" }, { icon: "🧩", title: "优化结构", desc: "契合既有空间与结构的方案。" }],
    projectShowcase: ["旧住宅楼改造", "联排住宅升级"],
  }),
  freight: PASS, observation: PASS,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TOSHIBA_ELEVATOR_SERIES_META[seriesOriginal.trim()] || TOSHIBA_ELEVATOR_SERIES_META.passenger;
}
