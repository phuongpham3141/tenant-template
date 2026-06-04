/**
 * TEEHO 智能锁元数据 — 详情页。按 seriesOriginal (catKey) 索引。
 * 货源：teeho.com（Shopify）。出口型电子 / 智能门锁（主要面向美国市场）。
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
const CERTS = ["国际电子安全认证", "民用门锁标准（参照 ANSI/BHMA）", "RoHS —— 安全材料", "指纹 / 密码数据加密安全"];
const MFG = [
  "TEEHO —— 智能 / 电子门锁品牌，通过 D2C/B2B 渠道分销（Shopify，美国市场）",
  "产品系列：密码插芯锁、执手锁、执手套装、WiFi/蓝牙锁、网关",
  "多种开锁方式：指纹、密码、卡片/App、机械应急钥匙",
  "按民用电子门锁标准进行质量与安全管控",
];
const PACK = [
  { label: "包装", value: "零售包装，含安装配件与电池" },
  { label: "随附配件", value: "螺丝、机械应急钥匙、说明书（电池）" },
  { label: "起订量", value: "按批量 / 集装箱；支持多型号混搭" },
];
const INSTALL = [
  "适用于标准门（常见门厚与锁舌中心距）；下单前请核对",
  "可按说明书用螺丝刀自行安装（DIY）；无需布线",
  "安装后录入指纹 / 密码并连接 App（WiFi/蓝牙系列）",
  "交付前检查开锁 / 上锁、自动上锁及电量",
];
const CARE = [
  { title: "电池", desc: "使用优质 AA 电池；电量不足提示时更换。部分型号配有应急供电接口。" },
  { title: "清洁", desc: "用干燥软布擦拭指纹传感器与键盘；避免接触水或强化学品。" },
  { title: "安全", desc: "定期更换密码，临时密码使用后删除；及时更新 App（WiFi 系列）。" },
];
const FAQ = [
  { q: "TEEHO 门锁能否安装在越南的门上？", a: "适用于符合门厚与锁舌中心距的标准门；下单前请按各型号确认门体参数。" },
  { q: "是否配有机械应急钥匙与应急供电？", a: "多数型号配有机械应急钥匙和 / 或应急供电接口；详情视各产品而定。" },
  { q: "起订量与交期？", a: "按批量计；交期随订单确认。" },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🔐", title: "多种开锁方式", desc: "指纹、密码、卡片/App 及机械应急钥匙 —— 便捷又安全。" };
const SHOW = ["住宅、公寓、别墅", "办公室、民宿/Airbnb", "智能家居交付项目"];
const DEADBOLT = mk({
  story: "TEEHO 密码插芯锁（TE001/TE002）—— 支持指纹与密码开锁的电子插芯锁，配机械应急钥匙，DIY 安装免布线，自动上锁。",
  heritage: "插芯锁系列是 TEEHO 面向通道门最普及的产品。",
  technicalSpecs: [{ label: "类型", value: "电子插芯锁（deadbolt）" }, { label: "开锁方式", value: "指纹、密码、机械钥匙" }, { label: "安装", value: "DIY，免布线" }, { label: "供电", value: "AA 电池 + 应急供电接口（视型号而定）" }],
  whyChoose: [WHY, { icon: "🛠️", title: "DIY 安装简便", desc: "用螺丝刀即可自行安装，适用于标准门。" }, { icon: "🔄", title: "自动上锁", desc: "关门后自动上锁，省心不遗忘。" }],
  projectShowcase: SHOW,
});
const WIFI = mk({
  story: "TEEHO WiFi 智能锁（TE011W/TE012W）—— 可通过 App 远程控制与下发密码、查看进出记录、集成语音助手，支持指纹/密码/App/钥匙开锁。",
  heritage: "WiFi 系列将 TEEHO 门锁接入智能家居生态。",
  technicalSpecs: [{ label: "类型", value: "WiFi 智能锁" }, { label: "连接方式", value: "WiFi（部分含蓝牙）" }, { label: "控制", value: "App 远程控制、下发 / 锁定密码、记录" }, { label: "开锁方式", value: "指纹、密码、App、机械钥匙" }],
  whyChoose: [WHY, { icon: "📱", title: "远程控制", desc: "随时随地通过 App 下发密码与开锁。" }, { icon: "🗣️", title: "智能家居", desc: "集成语音助手（Alexa/Google，视型号而定）。" }],
  projectShowcase: SHOW,
});
export const TEEHO_SERIES_META: Record<string, SeriesMeta> = {
  "keypad-deadbolt": DEADBOLT,
  "lever-lock": mk({
    story: "TEEHO 密码执手锁（TE001L/TE002L/TE003/TE004）—— 适用于房门 / 入户门的电子执手锁，支持指纹与密码开锁，配机械应急钥匙。",
    heritage: "执手锁系列适用于需要执手而非单纯插芯的门。",
    technicalSpecs: [{ label: "类型", value: "电子执手锁（lever）" }, { label: "开锁方式", value: "指纹、密码、机械钥匙" }, { label: "适用场景", value: "房门、入户门、办公室" }],
    whyChoose: [WHY, { icon: "🚪", title: "执手便捷", desc: "通过执手开关门，适用于多种门型。" }, { icon: "🔑", title: "应急钥匙", desc: "需要时有机械钥匙可用，使用安心。" }],
    projectShowcase: SHOW,
  }),
  "handle-set": mk({
    story: "TEEHO 执手锁套装（TE001K/TE002K/TE001H）—— 插芯锁 + 同步执手套装组合，适用于入户门，支持指纹与密码开锁。",
    heritage: "执手套装为入户门带来完整外观与双重安全。",
    technicalSpecs: [{ label: "类型", value: "插芯锁 + 执手套装（handle set）" }, { label: "开锁方式", value: "指纹、密码、机械钥匙" }, { label: "适用场景", value: "入户门、外立面门" }],
    whyChoose: [WHY, { icon: "🏠", title: "双重安全", desc: "插芯锁 + 同步执手，守护入户门。" }, { icon: "✨", title: "美观", desc: "完整套装，外观高雅大气。" }],
    projectShowcase: SHOW,
  }),
  "wifi-lock": WIFI, "wifi-handle": WIFI,
  "smart-handle": mk({
    story: "TEEHO 智能执手（TE018）—— 集成指纹 / 密码的门执手，简洁紧凑，适用于房门。",
    heritage: "智能执手提供轻巧紧凑的门锁解决方案。",
    technicalSpecs: [{ label: "类型", value: "智能执手" }, { label: "开锁方式", value: "指纹、密码、机械钥匙" }, { label: "适用场景", value: "房门" }],
    whyChoose: [WHY, { icon: "🤚", title: "轻巧紧凑", desc: "执手集成门锁，安装紧凑，适用于房门。" }],
    projectShowcase: SHOW,
  }),
  gateway: mk({
    story: "TEEHO 网关（G1）—— 连接器 / hub，让蓝牙门锁可通过 WiFi 实现远程控制，扩展智能家居功能。",
    heritage: "网关是 TEEHO 门锁系统的连接扩展配件。",
    technicalSpecs: [{ label: "类型", value: "网关 / 连接 Hub" }, { label: "功能", value: "蓝牙 ↔ WiFi 桥接，实现远程控制" }, { label: "兼容性", value: "支持网关的 TEEHO 门锁" }],
    whyChoose: [{ icon: "📡", title: "远程控制", desc: "让蓝牙门锁可通过 App 实现远程控制。" }, WHY],
    projectShowcase: SHOW,
  }),
  other: DEADBOLT,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TEEHO_SERIES_META[seriesOriginal.trim()] || TEEHO_SERIES_META["keypad-deadbolt"];
}
