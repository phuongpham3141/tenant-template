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
  // ─── Thang máy chở khách không buồng máy (MRL) ───────────────────────────────
  {
    model: "AQY-01S",
    slug: "lv-mrl",
    name: "Thang máy chở khách không buồng máy LINVOL AQY-01S",
    nameOriginal: "无机房乘客电梯 Machine Room Less",
    series: "Thang máy chở khách không buồng máy",
    seriesOriginal: "mrl",
    desc: "Thang máy chở khách không buồng máy LINVOL — máy kéo dạng thanh nhỏ gọn được đặt linh hoạt ngay trong giếng thang, hiệu suất sử dụng giếng thang lên tới 58.9%, hố pit siêu nông chỉ từ 1200mm, tiết kiệm diện tích xây dựng và giảm tổng chi phí.",
    image: "/img/products/linvol/mrl.png",
    features: ["Kết cấu không buồng máy, tiết kiệm diện tích xây dựng", "Hiệu suất sử dụng giếng thang lên tới 58.9%", "Hố pit siêu nông chỉ từ 1200mm", "Truyền động nam châm vĩnh cửu đồng bộ, vận hành êm ái, độ ồn thấp"],
    applications: ["Toà nhà văn phòng và thương mại", "Khu dân cư và chung cư", "Dự án cải tạo hạn chế đỉnh tầng/hố pit", "Công trình nhạy cảm về diện tích xây dựng"],
    specs: [
      { k: "Loại hình", v: "Thang máy chở khách · không buồng máy (MRL)" },
      { k: "Hiệu suất sử dụng giếng thang", v: "Lên tới 58.9% (máy kéo dạng thanh nhỏ gọn đặt trong giếng thang)" },
      { k: "Chiều sâu hố pit", v: "Hố pit siêu nông chỉ từ 1200mm (truyền thống khoảng 1500mm)" },
      { k: "Tải trọng định mức", v: "Khoảng 630 – 1600kg (8 – 21 người, tùy biến theo tòa nhà)" },
      { k: "Kiểu truyền động", v: "Máy kéo không hộp số nam châm vĩnh cửu đồng bộ (tiết kiệm năng lượng, độ ồn thấp)" },
      { k: "Nhà sản xuất", v: "Lingwang Elevator" },
    ],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── Băng tải đi bộ tự động ───────────────────────────────
  {
    model: "LTR",
    slug: "lv-moving-walk",
    name: "Băng tải đi bộ tự động LINVOL LTR",
    nameOriginal: "自动人行道 Moving Walk",
    series: "Băng tải đi bộ tự động",
    seriesOriginal: "movingwalk",
    desc: "Băng tải đi bộ tự động LINVOL (dòng LTR) — dùng cho vận chuyển ngang/dốc nhẹ đường dài tại sân bay, trung tâm thương mại và siêu thị, chở được xe đẩy và hành lý, vận hành êm ái, tĩnh lặng và tiết kiệm điện.",
    image: "/img/products/linvol/movingwalk.png",
    features: ["Vận chuyển đường dài theo phương ngang/dốc nhẹ", "Chở được xe đẩy và hành lý", "Nhiều lớp bảo vệ an toàn ở tấm răng lược và tay vịn", "Cảm biến thông minh, tiết kiệm điện"],
    applications: ["Nhà ga sân bay", "Trung tâm thương mại và siêu thị lớn", "Trung tâm hội chợ triển lãm và đầu mối giao thông", "Hành lang dài và cầu nối"],
    specs: [
      { k: "Loại hình", v: "Băng tải đi bộ tự động (Moving Walk · LTR)" },
      { k: "Tốc độ vận hành", v: "Khoảng 0.5m/s (dải tốc độ phổ biến cho không gian công cộng)" },
      { k: "Góc nghiêng", v: "0° (phương ngang) / 10° – 12° (dốc nhẹ, theo mặt bằng)" },
      { k: "Bề rộng tấm bậc", v: "Khoảng 1000mm (có thể tùy biến theo lưu lượng khách)" },
      { k: "Cấu hình an toàn", v: "Bảo vệ tấm răng lược, bảo vệ lối vào tay vịn, nút dừng khẩn cấp và nhiều lớp bảo vệ khác" },
      { k: "Thương hiệu", v: "LINVOL — Midea Building Technologies" },
    ],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── Thang máy tải hàng/tải ô tô WINONE ───────────────────────────────
  {
    model: "WINONE WIN1000",
    slug: "lv-freight",
    name: "Thang máy tải hàng/tải ô tô WINONE LINVOL",
    nameOriginal: "WINONE Freight & Car Lift",
    series: "Thang máy tải hàng/tải ô tô",
    seriesOriginal: "freight",
    desc: "Thang máy tải hàng/tải ô tô WINONE LINVOL — có thể chọn loại có buồng máy (LTHX WIN1000) hoặc không buồng máy (LTHW WIN1000), tải trọng 1600–5500kg, sàn cabin thép cường độ cao 3–6mm chống trượt chịu mài mòn, đạt chuẩn EN81-1.",
    image: "/img/products/linvol/freight.png",
    features: ["Tải trọng 1600–5500kg, có thể tùy biến tải trọng lớn", "Chọn được kết cấu có buồng máy/không buồng máy", "Sàn cabin thép cường độ cao 3–6mm chống trượt chịu mài mòn", "Đạt chuẩn EN81-1, chọn được cửa đơn/cửa thông"],
    applications: ["Tải hàng cho nhà máy và xưởng sản xuất", "Kho vận và trung tâm phân phối", "Tải xe cho showroom 4S/nhà để xe", "Khu hậu cần siêu thị và lối vận chuyển hàng"],
    specs: [
      { k: "Loại hình", v: "Thang máy tải hàng/tải ô tô (dòng WINONE)" },
      { k: "Tải trọng định mức", v: "1600 / 2000 / 3000 / 5000 / 5500kg, v.v." },
      { k: "Tốc độ vận hành", v: "0.5 – 1.0m/s (theo tải trọng và hành trình)" },
      { k: "Kết cấu", v: "LTHX WIN1000 có buồng máy / LTHW WIN1000 không buồng máy" },
      { k: "Sàn cabin", v: "Thép cường độ cao 3–6mm, chống trượt chịu mài mòn (tùy chọn inox)" },
      { k: "Kiểu mở cửa", v: "Cửa đơn/cửa thông, chọn được S2 gập đôi/C4 gập bốn mở giữa, v.v." },
    ],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── Thang máy tải nhỏ/thang chuyển thức ăn ───────────────────────────────
  {
    model: "LTC",
    slug: "lv-dumbwaiter",
    name: "Thang máy tải nhỏ/thang chuyển thức ăn LINVOL LTC",
    nameOriginal: "杂物电梯 Dumbwaiter LTC",
    series: "Thang máy tải nhỏ",
    seriesOriginal: "dumbwaiter",
    desc: "Thang máy tải nhỏ LINVOL (dòng LTC, không buồng máy) — tải trọng 100–300kg, tốc độ 0.4m/s, nạp hàng kiểu cửa sổ/kiểu chạm sàn, thiết kế chuyên dụng để chuyển thức ăn trong nhà hàng, vận chuyển sách và hàng hóa nhỏ theo phương thẳng đứng.",
    image: "/img/products/linvol/dumbwaiter.png",
    features: ["Kết cấu không buồng máy, chiếm ít không gian", "Tải trọng 100–300kg, tốc độ 0.4m/s", "Hai kiểu nạp hàng: kiểu cửa sổ/kiểu chạm sàn", "Chuyển thức ăn nhà hàng và hàng hóa nhỏ hiệu quả"],
    applications: ["Chuyển thức ăn cho bếp sau nhà hàng/khách sạn", "Thư viện và phòng lưu trữ", "Vận chuyển hồ sơ ngân hàng và văn phòng", "Vận chuyển hàng hóa nhỏ của cửa hàng theo phương thẳng đứng"],
    specs: [
      { k: "Loại hình", v: "Thang máy tải nhỏ/thang chuyển thức ăn (Dumbwaiter · LTC, không buồng máy)" },
      { k: "Tải trọng định mức", v: "100 / 200 / 250 / 300kg" },
      { k: "Tốc độ vận hành", v: "Khoảng 0.4m/s" },
      { k: "Kiểu nạp hàng", v: "Kiểu cửa sổ (mặt bàn) / kiểu chạm sàn (cửa sát sàn)" },
      { k: "Kích thước cabin", v: "Khoảng 600×600 đến 1000×1000×1200mm, nhiều quy cách" },
      { k: "Nhà sản xuất", v: "Lingwang Elevator" },
    ],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
];
