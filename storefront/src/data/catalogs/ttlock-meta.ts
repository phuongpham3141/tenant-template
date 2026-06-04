/**
 * TTLock 智能锁元数据 — 详情页。按 seriesOriginal (catKey) 索引。
 * 货源：ttlock.eu（欧洲分销商）。TTLock/Sciener（赛脑智能，深圳）—— 全球智能锁平台。
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
const CERTS = ["国际电子安全认证（CE）", "数据加密安全（AES）", "RoHS —— 安全材料", "兼容 TTLock App 与 Sciener 平台"];
const MFG = [
  "TTLock / Sciener 赛脑智能（深圳）—— 全球智能锁平台（App + 云端 API + SDK）",
  "产品生态：门锁、执手锁、锁芯、挂锁、电机锁、WiFi 网关",
  "多种开锁方式：指纹、密码、刷卡、App/蓝牙、机械钥匙；可通过网关远程下发密码",
  "为出租公寓、酒店、办公室提供集中化门锁管理",
];
const PACK = [
  { label: "包装", value: "零售包装，含安装配件与电池" },
  { label: "随附配件", value: "螺丝、机械钥匙、说明书（视产品而定）" },
  { label: "起订量", value: "按批量；支持多型号混搭" },
];
const INSTALL = [
  "下单前核对门厚与锁型（插芯锁 / 欧标锁芯）是否兼容",
  "按说明书安装；通过蓝牙连接 TTLock App",
  "录入指纹 / 密码 / 卡片；加装 WiFi 网关以实现远程控制与下发密码",
  "交付前检查开锁 / 上锁及电量",
];
const CARE = [
  { title: "电池", desc: "使用优质电池；App 提示电量不足时及时更换。部分型号配有应急供电接口。" },
  { title: "App 与安全", desc: "及时更新 TTLock App；远程下发 / 撤销 eKey 密钥；临时密码使用后及时删除。" },
  { title: "清洁", desc: "用干燥软布擦拭指纹传感器与键盘；避免接触水或强化学品。" },
];
const FAQ = [
  { q: "TTLock 能否远程控制？", a: "可以，加装 WiFi 网关后，即可通过 TTLock App 远程下发密码、开锁并查看进出记录。" },
  { q: "是否适合出租公寓 / 酒店管理？", a: "非常适合 —— 可为客人下发一次性 / 限时密码，并集中管理多把门锁。" },
  { q: "起订量与交期？", a: "按批量计；交期随订单确认。" },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "📲", title: "TTLock 生态系统", desc: "App + 网关：远程下发密码与管理，支持多把门锁联动。" };
const SHOW = ["出租公寓 / Airbnb", "酒店、办公室", "智能家居"];
const LOCK = mk({
  story: "TTLock 智能门锁（ENTR、RIO 等）—— 支持指纹、密码、刷卡、App/蓝牙及机械钥匙开锁；配备网关后可远程下发密码并查看进出记录。",
  heritage: "门锁系列是 TTLock 生态系统的核心产品。",
  technicalSpecs: [{ label: "类型", value: "智能电子门锁" }, { label: "开锁方式", value: "指纹、密码、刷卡、App/蓝牙、机械钥匙" }, { label: "远程控制", value: "通过 WiFi 网关（TTLock App）" }, { label: "供电", value: "电池 + 应急供电接口（视型号而定）" }],
  whyChoose: [WHY, { icon: "🔐", title: "多种开锁方式", desc: "多样开锁方式，便捷又安全。" }, { icon: "🏨", title: "适合出租", desc: "为客人下发限时密码，集中管理。" }],
  projectShowcase: SHOW,
});
export const TTLOCK_SERIES_META: Record<string, SeriesMeta> = {
  "smart-lock": LOCK, deadbolt: LOCK, other: LOCK,
  lever: mk({
    story: "TTLock 智能执手锁（Handle）—— 执手一体设计，支持指纹 / 密码 / 刷卡 / App 开锁，适用于房门与入户门。",
    heritage: "智能执手锁带来简洁便捷的门锁解决方案。",
    technicalSpecs: [{ label: "类型", value: "智能执手锁" }, { label: "开锁方式", value: "指纹、密码、刷卡、App、机械钥匙" }, { label: "适用场景", value: "房门、入户门" }],
    whyChoose: [WHY, { icon: "🚪", title: "执手便捷", desc: "通过执手开关门，适用于多种门型。" }],
    projectShowcase: SHOW,
  }),
  cylinder: mk({
    story: "TTLock 智能锁芯（Euro Cylinder）—— 将普通门锁锁芯升级为智能锁芯，支持 App / 密码 / 钥匙开锁，无需更换整套锁具。",
    heritage: "智能锁芯让旧锁升级变得轻而易举。",
    technicalSpecs: [{ label: "类型", value: "智能锁芯（欧标锁芯）" }, { label: "开锁方式", value: "App/蓝牙、密码（带键盘型号）、机械钥匙" }, { label: "适用场景", value: "替换标准欧标锁芯" }],
    whyChoose: [WHY, { icon: "♻️", title: "升级简便", desc: "仅需更换锁芯，无需更换整套锁具。" }],
    projectShowcase: SHOW,
  }),
  padlock: mk({
    story: "TTLock 智能挂锁（Padlock）—— 支持指纹 / App 开锁，防水耐用，适用于门禁、柜体、仓库、车辆。",
    heritage: "智能挂锁适用于移动场景与户外应用。",
    technicalSpecs: [{ label: "类型", value: "智能挂锁（padlock）" }, { label: "开锁方式", value: "指纹 / App 蓝牙" }, { label: "特性", value: "防水、可充电电池" }],
    whyChoose: [WHY, { icon: "🔒", title: "灵活多用", desc: "适用于门禁、柜体、仓库、车辆 —— 无需钥匙即可开锁。" }],
    projectShowcase: SHOW,
  }),
  outdoor: mk({
    story: "TTLock 户外锁 / 门禁锁 —— 耐候性强，支持 App / 密码开锁，适用于大门、庭院及户外区域。",
    heritage: "户外系列可耐受恶劣环境。",
    technicalSpecs: [{ label: "类型", value: "户外锁 / 门禁" }, { label: "特性", value: "防水、耐候" }, { label: "开锁方式", value: "App、密码" }],
    whyChoose: [WHY, { icon: "🌧️", title: "耐候性强", desc: "经受风吹日晒，适用于大门及户外区域。" }],
    projectShowcase: SHOW,
  }),
  motorlock: mk({
    story: "TTLock 电机锁 —— 适用于玻璃门 / 铝合金门的电子锁，集成电机实现自动开关，可通过 App 控制。",
    heritage: "电机锁适用于商用门与现代玻璃门。",
    technicalSpecs: [{ label: "类型", value: "电机锁（玻璃门 / 铝合金门）" }, { label: "特性", value: "电机自动开关" }, { label: "开锁方式", value: "App、密码、刷卡" }],
    whyChoose: [WHY, { icon: "⚙️", title: "电机自动", desc: "开关顺畅静音，适用于商用玻璃门。" }],
    projectShowcase: SHOW,
  }),
  gateway: mk({
    story: "TTLock 网关 / 配件 —— 蓝牙门锁的 WiFi 桥接器，实现远程控制与下发密码，扩展智能门锁系统。",
    heritage: "网关是 TTLock 系统的远程连接中枢。",
    technicalSpecs: [{ label: "类型", value: "WiFi 网关 / 配件" }, { label: "功能", value: "蓝牙 ↔ WiFi 桥接，实现远程控制" }, { label: "兼容性", value: "TTLock 门锁" }],
    whyChoose: [{ icon: "📡", title: "远程控制", desc: "让蓝牙门锁可通过 App 实现远程控制。" }, WHY],
    projectShowcase: SHOW,
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TTLOCK_SERIES_META[seriesOriginal.trim()] || TTLOCK_SERIES_META["smart-lock"];
}
