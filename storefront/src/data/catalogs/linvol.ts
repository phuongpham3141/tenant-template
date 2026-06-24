import type { PartnerProduct } from "@/data/partners";

/**
 * LINVOL 领沃 产品目录 — 来自 linvol.midea.com.cn 的 4 个真实电梯系列。
 * 美的集团旗下官方电梯品牌（美的楼宇科技 Midea Building Technologies）。
 * 制造商：菱王电梯有限公司。官方图片（已核验）。
 */

export const LINVOL_PRODUCTS: PartnerProduct[] = [
  // ─── 家用电梯 ───────────────────────────────
  {
    model: "LV-VILLA",
    slug: "lv-villa",
    name: "LINVOL 别墅电梯",
    nameOriginal: "别墅电梯",
    series: "家用电梯",
    seriesOriginal: "villa",
    desc: "LINVOL 别墅电梯——轿厢与部件全面升级设计，最大化利用井道空间，外观时尚，可定制性丰富。隶属美的集团旗下官方电梯品牌。",
    image: "/img/products/linvol/lv-villa.png",
    specs: [
      { k: "类型", v: "家用电梯/别墅电梯" },
      { k: "品牌", v: "LINVOL 领沃—美的楼宇科技 Midea Building Technologies" },
      { k: "制造商", v: "菱王电梯有限公司（Lingwang Elevator）" },
      { k: "服务", v: "「管家+专家」全生命周期——终身质保+维保" },
    ],
    applications: ["别墅、联排别墅、高端多层住宅"],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── 加装改造电梯 ───────────────────────────────
  {
    model: "LV-RETRO",
    slug: "lv-retro",
    name: "LINVOL 加装改造电梯",
    nameOriginal: "加装改造电梯",
    series: "加装改造电梯",
    seriesOriginal: "retrofit",
    desc: "LINVOL 加装改造电梯——专为老旧楼房加装电梯而设计，将全新数字技术与人性化设计相结合，服务社区居民与老年群体。",
    image: "/img/products/linvol/lv-retro.png",
    specs: [
      { k: "类型", v: "老旧楼房加装电梯（加装改造）" },
      { k: "品牌", v: "LINVOL 领沃—美的楼宇科技 Midea Building Technologies" },
      { k: "制造商", v: "菱王电梯有限公司（Lingwang Elevator）" },
      { k: "特点", v: "全新数字技术 + 面向社区的人性化设计" },
    ],
    applications: ["老旧公寓/楼房加装电梯", "老年人聚居社区"],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── 自动扶梯 ───────────────────────────────
  {
    model: "LV-ESC",
    slug: "lv-esc",
    name: "LINVOL 自动扶梯",
    nameOriginal: "自动扶梯",
    series: "自动扶梯",
    seriesOriginal: "escalator",
    desc: "LINVOL 自动扶梯——适用于购物中心、车站、机场：结构精密，运行平稳，节能省电。",
    image: "/img/products/linvol/lv-esc.png",
    specs: [
      { k: "类型", v: "自动扶梯" },
      { k: "品牌", v: "LINVOL 领沃—美的楼宇科技 Midea Building Technologies" },
      { k: "制造商", v: "菱王电梯有限公司（Lingwang Elevator）" },
      { k: "特性", v: "结构精密，运行平稳，节能省电" },
    ],
    applications: ["购物中心", "车站、机场", "大人流量公共工程"],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── 乘客电梯 ───────────────────────────────
  {
    model: "LV-PAX",
    slug: "lv-pax",
    name: "LINVOL 乘客电梯",
    nameOriginal: "乘客电梯",
    series: "乘客电梯",
    seriesOriginal: "passenger",
    desc: "LINVOL 数字化乘客电梯 —— 适用于酒店、写字楼、住宅小区：性能卓越、安全性高、节能省电，在电梯全生命周期中应用数字技术 + AI。",
    image: "/img/products/linvol/lv-pax.png",
    specs: [
      { k: "类型", v: "乘客电梯" },
      { k: "品牌", v: "LINVOL 领沃—美的楼宇科技 Midea Building Technologies" },
      { k: "制造商", v: "菱王电梯有限公司（Lingwang Elevator）" },
      { k: "技术", v: "数字化 + AI 贯穿电梯全生命周期" },
    ],
    applications: ["酒店", "写字楼", "住宅小区、住宅"],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── 无机房乘客电梯 (MRL) ───────────────────────────────
  {
    model: "AQY-01S",
    slug: "lv-mrl",
    name: "LINVOL 无机房乘客电梯 AQY-01S",
    nameOriginal: "无机房乘客电梯 Machine Room Less",
    series: "无机房乘客电梯",
    seriesOriginal: "mrl",
    desc: "LINVOL 无机房乘客电梯——紧凑条形曳引机灵活置于井道内，井道利用率高达 58.9%，超浅底坑低至 1200mm，省建筑面积、降整体造价。",
    image: "/img/products/linvol/mrl.png",
    features: ["无机房结构，省建筑面积", "井道利用率高达 58.9%", "超浅底坑低至 1200mm", "永磁同步驱动，运行平稳低噪"],
    applications: ["写字楼与商业楼宇", "住宅小区与公寓", "顶层/底坑受限的改造项目", "对建筑面积敏感的工程"],
    specs: [
      { k: "类型", v: "乘客电梯·无机房（MRL）" },
      { k: "井道利用率", v: "高达 58.9%（紧凑条形曳引机置于井道）" },
      { k: "底坑深度", v: "超浅底坑低至 1200mm（传统约 1500mm）" },
      { k: "额定载重", v: "约 630 – 1600kg（8 – 21 人，按楼宇定制）" },
      { k: "驱动方式", v: "永磁同步无齿轮曳引（节能、低噪）" },
      { k: "制造商", v: "菱王电梯有限公司（Lingwang Elevator）" },
    ],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── 自动人行道 ───────────────────────────────
  {
    model: "LTR",
    slug: "lv-moving-walk",
    name: "LINVOL 自动人行道 LTR",
    nameOriginal: "自动人行道 Moving Walk",
    series: "自动人行道",
    seriesOriginal: "movingwalk",
    desc: "LINVOL 自动人行道（LTR 系列）——适用于机场、商场、超市的水平/微倾斜长距离输送，承托手推车与行李，平稳静音、节能省电。",
    image: "/img/products/linvol/movingwalk.png",
    features: ["水平/微倾斜长距离输送", "可承托手推车与行李", "梳齿与扶手多重安全防护", "智能感应、节能省电"],
    applications: ["机场航站楼", "大型商场与超市", "会展中心与交通枢纽", "长廊连廊"],
    specs: [
      { k: "类型", v: "自动人行道（Moving Walk · LTR）" },
      { k: "运行速度", v: "约 0.5m/s（公共场所常用速段）" },
      { k: "倾斜角度", v: "0°（水平）/ 10°–12°（微倾斜，按场地）" },
      { k: "踏板宽度", v: "约 1000mm（可按客流定制）" },
      { k: "安全配置", v: "梳齿保护、扶手入口保护、急停按钮等多重防护" },
      { k: "品牌", v: "LINVOL 领沃—美的楼宇科技 Midea Building Technologies" },
    ],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── WINONE 载货/汽车电梯 ───────────────────────────────
  {
    model: "WINONE WIN1000",
    slug: "lv-freight",
    name: "LINVOL WINONE 载货/汽车电梯",
    nameOriginal: "WINONE Freight & Car Lift",
    series: "载货/汽车电梯",
    seriesOriginal: "freight",
    desc: "LINVOL WINONE 载货/汽车电梯——有机房（LTHX WIN1000）与无机房（LTHW WIN1000）可选，载重 1600–5500kg，3–6mm 高强度钢板防滑耐磨轿厢，符合 EN81-1。",
    image: "/img/products/linvol/freight.png",
    features: ["载重 1600–5500kg，大吨位可定制", "有机房/无机房两种结构可选", "3–6mm 高强度防滑耐磨轿厢地板", "符合 EN81-1，单门/贯通门可选"],
    applications: ["工厂与车间载货", "物流仓储与配送中心", "汽车 4S 店/停车楼载车", "商超后场与货运通道"],
    specs: [
      { k: "类型", v: "载货电梯/汽车电梯（WINONE 系列）" },
      { k: "额定载重", v: "1600 / 2000 / 3000 / 5000 / 5500kg 等" },
      { k: "运行速度", v: "0.5 – 1.0m/s（按吨位与行程）" },
      { k: "结构", v: "LTHX WIN1000 有机房 / LTHW WIN1000 无机房" },
      { k: "轿厢地板", v: "3–6mm 高强度钢板，防滑耐磨（可选不锈钢）" },
      { k: "开门方式", v: "单门/贯通门，S2 双折/C4 四折中分等可选" },
    ],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── 杂物电梯/传菜梯 ───────────────────────────────
  {
    model: "LTC",
    slug: "lv-dumbwaiter",
    name: "LINVOL 杂物电梯/传菜梯 LTC",
    nameOriginal: "杂物电梯 Dumbwaiter LTC",
    series: "杂物电梯",
    seriesOriginal: "dumbwaiter",
    desc: "LINVOL 杂物电梯（LTC 系列，无机房）——载重 100–300kg，速度 0.4m/s，窗口式/落地式装载，专为餐厅传菜、图书与小件货物垂直传输设计。",
    image: "/img/products/linvol/dumbwaiter.png",
    features: ["无机房结构，占用空间小", "载重 100–300kg，速度 0.4m/s", "窗口式/落地式两种装载方式", "餐厅传菜与小件货物高效传输"],
    applications: ["餐厅/酒店后厨传菜", "图书馆与档案室", "银行与办公文件传输", "商铺小件货物垂直运输"],
    specs: [
      { k: "类型", v: "杂物电梯/传菜梯（Dumbwaiter · LTC，无机房）" },
      { k: "额定载重", v: "100 / 200 / 250 / 300kg" },
      { k: "运行速度", v: "约 0.4m/s" },
      { k: "装载方式", v: "窗口式（台面）/ 落地式（落地门）" },
      { k: "轿厢尺寸", v: "约 600×600 至 1000×1000×1200mm 多规格" },
      { k: "制造商", v: "菱王电梯有限公司（Lingwang Elevator）" },
    ],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
];
