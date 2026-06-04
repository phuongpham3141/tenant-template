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
];
