import type { PartnerProduct } from "@/data/partners";

/**
 * Catalog LINVOL — 4 dòng thang máy THẬT từ linvol.midea.com.cn.
 * Thương hiệu thang máy chính thức của Tập đoàn Midea (Midea Building Technologies).
 * Nhà sản xuất: Lingwang Elevator. Ảnh chính thức (đã verify). Tên tiếng Việt.
 */

export const LINVOL_PRODUCTS: PartnerProduct[] = [
  // ─── Thang máy gia đình ───────────────────────────────
  {
    model: "LV-VILLA",
    slug: "lv-villa",
    name: "Thang máy biệt thự LINVOL",
    nameOriginal: "别墅电梯",
    series: "Thang máy gia đình",
    seriesOriginal: "villa",
    desc: "Thang máy biệt thự LINVOL — cabin và linh kiện được nâng cấp thiết kế toàn diện, tận dụng tối đa diện tích giếng thang, ngoại hình thời thượng, khả năng tuỳ biến phong phú. Thuộc thương hiệu thang máy chính thức của Tập đoàn Midea.",
    image: "/img/products/linvol/lv-villa.png",
    specs: [
      { k: "Loại hình", v: "Thang máy gia đình / biệt thự" },
      { k: "Thương hiệu", v: "LINVOL — Midea Building Technologies" },
      { k: "Nhà sản xuất", v: "Lingwang Elevator" },
      { k: "Dịch vụ", v: "«Quản gia + chuyên gia» trọn vòng đời — bảo hành trọn đời + bảo trì" },
    ],
    applications: ["Biệt thự, nhà phố, nhà ở nhiều tầng cao cấp"],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── Thang máy cải tạo / lắp thêm ───────────────────────────────
  {
    model: "LV-RETRO",
    slug: "lv-retro",
    name: "Thang máy lắp thêm / cải tạo LINVOL",
    nameOriginal: "加装改造电梯",
    series: "Thang máy cải tạo",
    seriesOriginal: "retrofit",
    desc: "Thang máy lắp thêm/cải tạo LINVOL — chuyên dành cho các toà nhà cũ lắp đặt thêm thang máy, kết hợp công nghệ số mới với thiết kế nhân văn, phục vụ cộng đồng dân cư và người cao tuổi.",
    image: "/img/products/linvol/lv-retro.png",
    specs: [
      { k: "Loại hình", v: "Thang máy lắp thêm cho nhà cũ" },
      { k: "Thương hiệu", v: "LINVOL — Midea Building Technologies" },
      { k: "Nhà sản xuất", v: "Lingwang Elevator" },
      { k: "Đặc điểm", v: "Công nghệ số mới + thiết kế nhân văn cho cộng đồng" },
    ],
    applications: ["Chung cư/toà nhà cũ lắp thêm thang máy", "Khu dân cư đông người cao tuổi"],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── Thang cuốn ───────────────────────────────
  {
    model: "LV-ESC",
    slug: "lv-esc",
    name: "Thang cuốn tự động LINVOL",
    nameOriginal: "自动扶梯",
    series: "Thang cuốn",
    seriesOriginal: "escalator",
    desc: "Thang cuốn tự động LINVOL — dùng cho trung tâm thương mại, nhà ga, sân bay: kết cấu chính xác, vận hành êm ái, tiết kiệm điện.",
    image: "/img/products/linvol/lv-esc.png",
    specs: [
      { k: "Loại hình", v: "Thang cuốn tự động" },
      { k: "Thương hiệu", v: "LINVOL — Midea Building Technologies" },
      { k: "Nhà sản xuất", v: "Lingwang Elevator" },
      { k: "Đặc tính", v: "Kết cấu chính xác, vận hành êm, tiết kiệm điện" },
    ],
    applications: ["Trung tâm thương mại", "Nhà ga, sân bay", "Công trình công cộng lưu lượng lớn"],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── Thang máy chở khách ───────────────────────────────
  {
    model: "LV-PAX",
    slug: "lv-pax",
    name: "Thang máy chở khách LINVOL",
    nameOriginal: "乘客电梯",
    series: "Thang máy chở khách",
    seriesOriginal: "passenger",
    desc: "Thang máy chở khách số hoá LINVOL — dùng cho khách sạn, văn phòng, chung cư: hiệu năng vượt trội, an toàn cao, tiết kiệm năng lượng, ứng dụng công nghệ số + AI trong toàn vòng đời thang.",
    image: "/img/products/linvol/lv-pax.png",
    specs: [
      { k: "Loại hình", v: "Thang máy chở khách" },
      { k: "Thương hiệu", v: "LINVOL — Midea Building Technologies" },
      { k: "Nhà sản xuất", v: "Lingwang Elevator" },
      { k: "Công nghệ", v: "Số hoá + AI xuyên suốt vòng đời thang máy" },
    ],
    applications: ["Khách sạn", "Toà nhà văn phòng", "Chung cư, nhà ở"],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
];
