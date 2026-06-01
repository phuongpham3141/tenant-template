/**
 * Đối tác sản xuất của Huayue 华越供应链 — 12 thương hiệu có hợp tác chính
 * thức, đã được phòng sourcing Quảng Châu thẩm định và cấp catalog
 * phục vụ phân phối tại thị trường Việt Nam.
 *
 * Mỗi đối tác được map vào MỘT root category chính trong NAV_MENU (slug).
 * Nội dung gốc tiếng Trung / Anh đã được lược dịch + viết lại tiếng Việt
 * cho phù hợp với khách hàng B2B Việt Nam — không sao chép nguyên văn
 * marketing copy của brand.
 */

export type PartnerProduct = {
  /** SKU / model code chính thức của nhà máy. */
  model: string;
  /** Tên sản phẩm tiếng Việt. */
  name: string;
  /** Mô tả ngắn 1-2 câu tiếng Việt (đặc tính / công năng chính). */
  desc?: string;
  /** Ảnh sản phẩm — URL trực tiếp từ CDN của brand hoặc /img/ local. */
  image?: string;
};

export type PartnerFactory = {
  /** Địa chỉ nhà máy (thành phố, tỉnh, quốc gia). */
  location: string;
  /** Diện tích nhà máy. */
  area?: string;
  /** Số nhân viên / công nhân. */
  employees?: string;
  /** Công suất sản xuất hàng năm. */
  capacity?: string;
  /** Số lượng cơ sở (sản xuất / R&D / logistics). */
  facilities?: string;
  /** Tổng vốn đầu tư nhà máy. */
  investment?: string;
};

export type PartnerBrand = {
  /** URL slug — đường dẫn /info/partners/{slug}. */
  slug: string;
  /** Tên thương hiệu tiếng Việt (nếu có) hoặc giữ tên gốc Latinh. */
  name: string;
  /** Tên gốc Trung + tên Latinh để khách nhận diện. */
  nameOriginal: string;
  /** Slug của root category trong NAV_MENU. */
  category:
    | "home-garden"
    | "construction-materials"
    | "bathroom-sanitary"
    | "noi-that"
    | "kitchen-equipment"
    | "lighting"
    | "doors-windows"
    | "electrical";
  /** STT trong CSV gốc (để trace nguồn). */
  cvsStt: number;
  /** Logo URL (nếu có). */
  logo?: string;
  /** Banner / hero image. */
  banner?: string;

  /** Giới thiệu công ty — đoạn văn 2-3 câu tiếng Việt. */
  introduction: string;
  /** Năm thành lập. */
  founded?: string;
  /** Nếu là công ty niêm yết — mã chứng khoán. */
  listed?: string;

  factory: PartnerFactory;

  /** Điểm nổi bật (chứng nhận, giải thưởng, công nghệ độc quyền, dự án lớn). */
  highlights: string[];

  /** Hotline + website. */
  hotline?: string;
  website: string;

  /** Toàn bộ sản phẩm chính. */
  products: PartnerProduct[];
};

export const PARTNERS: PartnerBrand[] = [
  // ─── ⚡ ĐIỆN & THIẾT BỊ ĐIỆN ─────────────────────────────────────────
  {
    slug: "midea",
    name: "Midea",
    nameOriginal: "美的 Midea",
    category: "electrical",
    cvsStt: 1,
    logo: "https://cn-res.midea.com/content/dam/mideacn-aem/test/logo-1x.png",
    banner:
      "https://cn-res.midea.com/content/dam/mideacn-aem/%E7%BE%8E%E7%9A%84%E4%B8%9A%E5%8A%A1/%E6%99%BA%E8%83%BD%E5%AE%B6%E5%B1%85/%E7%BE%8E%E7%9A%84/%E7%BE%8E%E7%9A%841.png",
    introduction:
      "Midea là tập đoàn điện gia dụng đa thương hiệu hàng đầu Trung Quốc, sở hữu danh mục thương hiệu chiến lược phục vụ từ phân khúc phổ thông đến cao cấp. Các sản phẩm điều hoà, tủ lạnh, máy giặt cùng đồ điện nhà bếp + đồ điện gia dụng nhỏ của Midea chiếm thị phần dẫn đầu tại Trung Quốc và xuất khẩu hơn 200 quốc gia.",
    founded: "1968",
    listed: "SZSE 000333",
    factory: {
      location: "Trụ sở chính: Phật Sơn, tỉnh Quảng Đông, Trung Quốc",
      facilities: "30+ nhà máy + 35+ trung tâm R&D toàn cầu",
      employees: "180.000+ nhân viên (toàn tập đoàn)",
    },
    highlights: [
      "Fortune Global 500 (vào top từ 2016 đến nay)",
      "Sở hữu 7 sub-brand chiến lược: Midea, Little Swan, COLMO (cao cấp AI), Toshiba (cao cấp Nhật), Cuckoo, Hualing (trẻ + giá rẻ), Comfee (xuất khẩu)",
      "Mạng lưới phân phối phủ 200+ quốc gia",
      "Niêm yết sàn Thâm Quyến mã 000333",
    ],
    website: "https://www.midea.com.cn/zh/our-businesses/Smart-Home-Business-Unit/midea",
    products: [
      { model: "AC", name: "Điều hoà gia dụng", desc: "Điều hoà treo tường + cây + multi-split inverter, công suất 9.000-24.000 BTU.", image: "https://cn-res.midea.com/content/dam/mideacn-aem/%E7%BE%8E%E7%9A%84%E4%B8%9A%E5%8A%A1/%E6%99%BA%E8%83%BD%E5%AE%B6%E5%B1%85/%E7%BE%8E%E7%9A%84/%E7%BE%8E%E7%9A%84%E5%B0%8F%E5%9B%BE1.png" },
      { model: "C-AC", name: "Điều hoà trung tâm", desc: "Điều hoà trung tâm cho biệt thự, văn phòng, khách sạn — VRF/multi-V.", image: "https://cn-res.midea.com/content/dam/mideacn-aem/%E7%BE%8E%E7%9A%84%E4%B8%9A%E5%8A%A1/%E6%99%BA%E8%83%BD%E5%AE%B6%E5%B1%85/%E7%BE%8E%E7%9A%84/%E7%BE%8E%E7%9A%84%E5%B0%8F%E5%9B%BE2.png" },
      { model: "WM", name: "Máy giặt", desc: "Máy giặt cửa trên + cửa trước inverter, tải 7-12 kg. Có dòng combo giặt sấy.", image: "https://cn-res.midea.com/content/dam/mideacn-aem/%E7%BE%8E%E7%9A%84%E4%B8%9A%E5%8A%A1/%E6%99%BA%E8%83%BD%E5%AE%B6%E5%B1%85/%E7%BE%8E%E7%9A%84/%E7%BE%8E%E7%9A%84%E5%B0%8F%E5%9B%BE3.png" },
      { model: "RF", name: "Tủ lạnh", desc: "Tủ lạnh side-by-side + French door + ngăn đá trên, dung tích 200-650L.", image: "https://cn-res.midea.com/content/dam/mideacn-aem/%E7%BE%8E%E7%9A%84%E4%B8%9A%E5%8A%A1/%E6%99%BA%E8%83%BD%E5%AE%B6%E5%B1%85/%E7%BE%8E%E7%9A%84/%E7%BE%8E%E7%9A%84%E5%B0%8F%E5%9B%BE4.png" },
      { model: "RH-DW", name: "Hút mùi + Máy rửa bát", desc: "Combo bếp: máy hút mùi áp trần/kệ trên 700-1300 m³/h + máy rửa bát 8-14 bộ.", image: "https://cn-res.midea.com/content/dam/mideacn-aem/mideacn-aem-old/our-businesses/smart-home-business-unit-/midea/overview/img-midea-CATEGORIES-Residential%20AC%20@2x%20(2).png" },
      { model: "WH", name: "Bình nóng lạnh", desc: "Bình nóng lạnh điện gián tiếp 15-100L + trực tiếp 3500W + năng lượng mặt trời + heat-pump.", image: "https://cn-res.midea.com/content/dam/mideacn-aem/mideacn-aem-old/our-businesses/smart-home-business-unit-/midea/overview/img-midea-CATEGORIES-Commerical%20AC%20@2x%20(1)1652768953857.png" },
      { model: "WP", name: "Máy lọc + cây nước", desc: "Máy lọc nước RO 5/6/7 cấp + cây nước nóng lạnh cho gia đình + văn phòng.", image: "https://cn-res.midea.com/content/dam/mideacn-aem/mideacn-aem-old/our-businesses/smart-home-business-unit-/midea/overview/img-midea-CATEGORIES-Laundry%20Appliances%20@2x%20(1)1652768953863.png" },
      { model: "SA", name: "Đồ điện gia dụng nhỏ", desc: "Nồi cơm điện cao tần IH, ấm điện, bếp từ đơn, máy ép trái cây, máy xay đa năng.", image: "https://cn-res.midea.com/content/dam/mideacn-aem/mideacn-aem-old/our-businesses/smart-home-business-unit-/midea/overview/img-midea-CATEGORIES-Refrigerator%20@2x%20(1)1652768953869.png" },
      { model: "MW", name: "Lò vi sóng + lò hấp nướng", desc: "Lò vi sóng cơ học/điện tử + lò hấp nướng đa năng 20-42L.", image: "https://cn-res.midea.com/content/dam/mideacn-aem/mideacn-aem-old/our-businesses/smart-home-business-unit-/midea/overview/%E7%BE%8E%E7%9A%84%E6%B6%88%E8%B4%B9%E7%94%B5%E5%99%A8%E4%BA%A7%E5%93%81%E5%85%A5%E5%8F%A3-%E5%BE%AE%E6%B3%A2%E7%82%89.png" },
      { model: "CA", name: "Đồ điện vệ sinh", desc: "Máy hút bụi cầm tay + robot lau nhà + máy hơi nước + máy lọc không khí.", image: "https://cn-res.midea.com/content/dam/mideacn-aem/mideacn-aem-old/our-businesses/smart-home-business-unit-/midea/overview/%E7%BE%8E%E7%9A%84-%E4%BA%A7%E5%93%81%E7%B1%BB%E5%88%AB%E5%85%A5%E5%8F%A3.jpg" },
      { model: "WS", name: "Đồ điện kiểu Tây", desc: "Máy pha cà phê + máy nướng bánh mì + máy đánh trứng + lò nướng compact.", image: "https://cn-res.midea.com/content/dam/mideacn-aem/mideacn-aem-old/our-businesses/smart-home-business-unit-/midea/overview/%E8%A5%BF%E5%BC%8F%E5%B0%8F%E7%94%B5.png" },
    ],
  },
  {
    slug: "toshiba-home",
    name: "Toshiba Home Appliances",
    nameOriginal: "东芝家电 Toshiba",
    category: "electrical",
    cvsStt: 3,
    introduction:
      "Toshiba Home Appliances là thương hiệu điện gia dụng cao cấp gốc Nhật Bản với hơn 100 năm lịch sử. Mảng điện gia dụng tại Trung Quốc do tập đoàn Midea vận hành, tập trung phân khúc cao cấp với công nghệ Nhật, gia công tinh xảo và bảo quản tươi sống vượt trội.",
    founded: "1875 (Toshiba Corp)",
    factory: {
      location: "Vận hành bởi Midea Group tại Phật Sơn, Quảng Đông, Trung Quốc",
      facilities: "Sử dụng cơ sở sản xuất chung của tập đoàn Midea",
    },
    highlights: [
      "Thương hiệu cao cấp Nhật Bản với di sản hơn 100 năm",
      "Vận hành tại TQ bởi Midea Group — sức mạnh sản xuất TQ + know-how Nhật",
      "Tập trung 4 dòng chủ lực: tủ lạnh, máy rửa bát, nồi cơm điện IH, lò hấp nướng",
      "Phân khúc cao cấp, kênh phân phối qua Midea Lifestyle",
    ],
    website: "https://www.midea.com.cn/zh/our-businesses/Smart-Home-Business-Unit/toshiba",
    products: [
      { model: "T-RF", name: "Tủ lạnh Toshiba", desc: "Tủ lạnh side-by-side + multi-door công nghệ giữ tươi Nhật, 400-650L." },
      { model: "T-DW", name: "Máy rửa bát Toshiba", desc: "Máy rửa bát âm tủ + độc lập 8-14 bộ, sấy nóng + diệt khuẩn UV." },
      { model: "T-RC", name: "Nồi cơm điện Toshiba", desc: "Nồi cơm điện cao tần IH, lòng đồng tinh khiết, dung tích 1.0-1.8L." },
      { model: "T-SO", name: "Lò hấp nướng Toshiba", desc: "Lò hấp + nướng + vi sóng combo, kết hợp 3-in-1, 28-32L." },
    ],
  },
  {
    slug: "lesso",
    name: "Lesso",
    nameOriginal: "联塑 Lesso",
    category: "electrical",
    cvsStt: 29,
    logo: "https://www.lesso.com/uploads/20260210/1469496bff5ab6eba035b3c4ef12df07.png",
    introduction:
      "Lesso là tập đoàn vật liệu xây dựng + nội thất + chuỗi cung ứng quy mô lớn của Trung Quốc, kinh doanh đa lĩnh vực gồm ống nhựa, dây điện - cáp, vật liệu xây dựng, môi trường, năng lượng mới. Sản phẩm phục vụ thị trường dân dụng, công nghiệp, nông nghiệp và hạ tầng kỹ thuật.",
    factory: {
      location: "Trụ sở chính: Long Giang, Thuận Đức, Phật Sơn, Quảng Đông, Trung Quốc",
      facilities: "30+ nhà máy lớn tại Trung Quốc và Đông Nam Á",
    },
    highlights: [
      "Hotline 24/7 toàn quốc: 400-168-2128",
      "Hiện diện qua 7 thị trường quốc tế: Tiếng Anh, UAE, Mỹ, Indonesia, Ấn Độ, Malaysia, Campuchia",
      "6 hệ sản phẩm: thi công đô thị, dân dụng, nông nghiệp, công nghiệp - thương mại, PCCC, khí gas",
      "Vận chuyển trực tiếp container từ nhà máy về Việt Nam",
    ],
    hotline: "400-168-2128",
    website: "https://www.lessopipe.com/",
    products: [
      { model: "PVC-U-WS", name: "Ống PVC-U cấp nước", desc: "Ống PVC-U dẫn nước sạch đô thị, nhẹ, chống ăn mòn, áp suất PN10-PN16.", image: "https://www.lesso.com/uploads/20250416/6b9dba8f64ec375f650e9a71bb7c8221.jpg" },
      { model: "PE-WS", name: "Ống PE cấp nước", desc: "Ống polyethylene cấp nước, khả năng chịu va đập + chống ăn mòn cao.", image: "https://www.lesso.com/uploads/20250416/56084439e33922987411b43db7f58dcc.jpg" },
      { model: "SWM-PE", name: "Ống PE lõi lưới thép", desc: "Ống composite PE cốt lưới thép, chịu áp lực cao, ổn định nhiệt giống thép.", image: "https://www.lesso.com/uploads/20250416/56b1a226e95077e319e146d9bc9ad5f2.jpg" },
      { model: "GFR-PE", name: "Ống PE gia cường sợi thuỷ tinh", desc: "Ống composite PE 3 lớp, gia cường sợi thuỷ tinh, áp suất cao + kháng hoá chất.", image: "https://www.lesso.com/uploads/20250416/dd178fb50f4013deb74f3ac347fb24e7.jpg" },
      { model: "HDG-SP", name: "Ống thép mạ kẽm nhúng nóng", desc: "Ống thép mạ kẽm nhúng nóng, độ dày đồng đều, đạt tiêu chuẩn quốc gia.", image: "https://www.lesso.com/upfile/2020/09/20200929113337_954.png" },
      { model: "PPR-STD", name: "Ống PP-R chuẩn", desc: "Ống PP-R cấp nước nóng lạnh cho công trình dân dụng + thương mại." },
      { model: "PPR-DC", name: "Ống PP-R 2 màu (gia dụng)", desc: "Ống PP-R 2 màu phân biệt nước nóng/lạnh, dòng gia dụng cao cấp." },
      { model: "PPR-LOTUS", name: "Ống PP-R lá sen tự làm sạch", desc: "Ống PP-R mặt trong vân lá sen, chống bám cặn + tự làm sạch." },
      { model: "PPR-NANO", name: "Ống PP-R nano kháng khuẩn", desc: "Ống PP-R phủ nano bạc, kháng khuẩn cho hệ nước sinh hoạt." },
      { model: "PPR-CER", name: "Ống PP-R lõi sứ 2 màu", desc: "Ống PP-R series Sứ Tâm, lõi sứ chịu nhiệt + áp lực cao." },
      { model: "WC", name: "Dây điện - cáp", desc: "Dây điện đơn lõi 1.5-10 mm² + cáp đa lõi mềm + cáp lực 25-95 mm² + cáp điều khiển CY." },
      { model: "CT", name: "Máng cáp", desc: "Máng cáp tôn sơn epoxy + inox 304 + thang cáp mạ kẽm nhúng nóng." },
    ],
  },

  // ─── 🍳 THIẾT BỊ NHÀ BẾP ─────────────────────────────────────────────
  {
    slug: "teka",
    name: "Teka",
    nameOriginal: "Teka",
    category: "kitchen-equipment",
    cvsStt: 4,
    logo: "https://www.teka.com/zh-cn/wp-content/themes/teka/img/teka-new-logo.svg",
    introduction:
      "Teka là tập đoàn thiết bị bếp và phòng tắm Tây Ban Nha với hơn 100 năm lịch sử. Tập đoàn sở hữu 3 thương hiệu: Teka (1924, gốc Đức), Küppersbusch (1875, cao cấp Đức, nhiều giải Red Dot + IF Design), Intra (1871, chậu inox Thụy Điển). Hiện thuộc công ty mẹ German Heritage B.",
    founded: "1924 (Teka)",
    factory: {
      location: "Trụ sở chính: Đức (Teka), Tây Ban Nha (vận hành chính)",
      facilities: "15 nhà máy trên toàn cầu",
      employees: "5.000 nhân viên",
      capacity: "Phục vụ 120+ quốc gia, 100 triệu hộ gia đình toàn cầu",
    },
    highlights: [
      "Khoảng 50% hộ gia đình Tây Ban Nha sử dụng sản phẩm Teka",
      "Sở hữu portfolio 3 thương hiệu: Teka (1924), Küppersbusch (1875), Intra (1871)",
      "Küppersbusch đạt nhiều giải Red Dot, IF Design, ADEX Platinum Excellence",
      "Küppersbusch là thành viên sáng lập German Design Council (2016)",
    ],
    website: "https://www.teka.com/zh-cn/guanyuwomen/teka-pinpai/",
    products: [
      { model: "T-OV", name: "Lò nướng âm tủ", desc: "Lò nướng đa năng âm tủ kiểu Châu Âu, dung tích 60-72L." },
      { model: "T-MW", name: "Lò vi sóng âm tủ", desc: "Lò vi sóng âm tủ Châu Âu tích hợp nướng + hấp." },
      { model: "T-CM", name: "Máy pha cà phê", desc: "Máy pha cà phê tự động âm tủ, espresso + cappuccino." },
      { model: "T-CT", name: "Bếp âm", desc: "Bếp gas/điện/từ âm âm 2/3/4 vùng nấu, kính ceramic Schott." },
      { model: "T-RH", name: "Hút mùi", desc: "Hút mùi áp trần + đảo bếp + slim cao cấp, 700-1300 m³/h." },
      { model: "T-RF", name: "Tủ lạnh", desc: "Tủ lạnh âm tủ + độc lập, phong cách Châu Âu." },
      { model: "T-WC", name: "Tủ rượu vang", desc: "Tủ bảo quản rượu vang âm tủ, 2 vùng nhiệt độ." },
      { model: "T-SK", name: "Chậu rửa inox (Intra)", desc: "Chậu rửa inox 304 đơn/đôi/3 ngăn handmade R10 (Intra brand)." },
      { model: "T-FA", name: "Vòi bếp", desc: "Vòi bếp đồng mạ chrome/vàng/đen matte, vòi rút uốn cong." },
      { model: "T-WM", name: "Máy giặt", desc: "Máy giặt cửa trước Châu Âu, inverter + hơi nước." },
      { model: "T-DR", name: "Máy sấy", desc: "Máy sấy bơm nhiệt cao cấp, A+++ tiết kiệm năng lượng." },
      { model: "T-COMBO", name: "Máy giặt sấy combo", desc: "Combo giặt + sấy trong 1 máy, tiết kiệm không gian." },
      { model: "T-SA", name: "Đồ điện gia dụng nhỏ", desc: "Bộ sản phẩm điện gia dụng nhỏ kiểu Châu Âu." },
      { model: "T-ACC", name: "Phụ kiện + parts", desc: "Phụ kiện thay thế + thiết bị bổ sung cho tất cả dòng sản phẩm." },
    ],
  },

  // ─── 🏠 NHÀ & SÂN VƯỜN (thang máy thuộc hạ tầng nhà) ──────────────────
  {
    slug: "toshiba-elevator",
    name: "Toshiba Elevator",
    nameOriginal: "东芝电梯 Toshiba Elevator (China)",
    category: "home-garden",
    cvsStt: 12,
    logo: "https://www.toshiba-elevator.com.cn/assets/images/icon/logo.svg",
    introduction:
      "Toshiba Elevator (China) là chi nhánh tại Trung Quốc của tập đoàn Toshiba (Nhật Bản), chuyên cung cấp giải pháp thang máy cao cấp tích hợp công nghệ Nhật tiên tiến. Năm 2024, Toshiba Elevator được xếp hạng top 7 hãng thang máy toàn cầu, nổi tiếng với công nghệ dẫn hướng từ tính, thang máy hai khoang và kỷ lục thang máy tốc độ cao.",
    factory: {
      location: "Trụ sở chính: Thượng Hải, Trung Quốc",
      facilities: "Nhà máy sản xuất tại Thẩm Dương + Tô Châu",
    },
    highlights: [
      "Hotline kỹ thuật toàn quốc: 400-700-5680",
      "Top 7 thang máy toàn cầu (2024)",
      "12 công nghệ lõi: ultra-high-speed, FLOORNAVI destination control, AI fleet management, BIM design, magnetic suspension guide shoe…",
      "Dự án tham chiếu gần đây: Bệnh viện Y Học CT Nội Mông, Sơn Tây Liu An Hoa Đô GĐ5 (67 đơn vị)",
    ],
    hotline: "400-700-5680",
    website: "https://www.toshiba-elevator.com.cn/",
    products: [
      { model: "T-HS", name: "Thang máy tốc độ cao", desc: "Thang chở khách cho cao ốc văn phòng + khách sạn 30+ tầng, tốc độ ≥2.5 m/s.", image: "https://www.toshiba-elevator.com.cn/upload/2022/12-22/16-02-550855-1155300723.jpg" },
      { model: "T-PE", name: "Thang chở khách tiêu chuẩn", desc: "Thang máy cho chung cư + văn phòng phổ thông, tải 630-1600 kg.", image: "https://www.toshiba-elevator.com.cn/upload/2022/12-22/16-33-08081472987408.jpg" },
      { model: "T-ESC", name: "Thang cuốn + băng chuyền", desc: "Thang cuốn TTTM, sân bay, metro + băng chuyền đi bộ.", image: "https://www.toshiba-elevator.com.cn/upload/2022/12-22/16-05-180561427893075.jpg" },
      { model: "SPACEL-H Pro", name: "Thang máy gia đình SPACEL-H Pro", desc: "Thang máy thiết kế cho biệt thự + nhà phố, cabin compact tích hợp Smart Door.", image: "https://www.toshiba-elevator.com.cn/upload/2023/12-11/14-59-580999930083743.jpg" },
      { model: "T-RT", name: "Thang lắp thêm công trình cũ", desc: "Giải pháp lắp thang máy cho chung cư cũ không có thang sẵn — chiếm ít diện tích.", image: "https://www.toshiba-elevator.com.cn/upload/2023/01-05/17-52-380489974514277.jpg" },
    ],
  },
  {
    slug: "guangri",
    name: "Guangri Elevator",
    nameOriginal: "广日电梯 Guangri",
    category: "home-garden",
    cvsStt: 13,
    logo: "https://www.guangri.com.cn/cn/images/logo.png",
    introduction:
      "Guangri Elevator là doanh nghiệp niêm yết, công ty con quan trọng của tập đoàn Guangzhou Industrial Investment Holding Group (thuộc Fortune Global 500). Thành lập từ 1956, sản xuất thang chở hàng từ 1973, Guangri đã tích luỹ hơn 50 năm kinh nghiệm và phát triển thành doanh nghiệp hiện đại R&D + sản xuất + lắp đặt + bảo trì trọn gói.",
    founded: "1956",
    factory: {
      location: "Số 636 đại lộ Quốc Mậu Nam, Trấn Thạch Lâu, Quận Phiên Ngung, Quảng Châu",
      facilities: "Sản xuất chính tại Quảng Châu + cơ sở phụ trên toàn quốc",
    },
    highlights: [
      "Hotline kỹ thuật: 400-8866-130",
      "Email: grdt@guangri.com.cn",
      "Tập đoàn mẹ thuộc Fortune Global 500",
      "Trên 50 năm kinh nghiệm sản xuất thang máy",
      "Cung cấp giải pháp toàn diện: R&D + thiết kế + sản xuất + lắp đặt + bảo trì + đào tạo",
    ],
    hotline: "400-8866-130",
    website: "https://guangri.com.cn/",
    products: [
      { model: "G-VE", name: "Thang máy dọc", desc: "Thang máy thông minh cho cao ốc + chung cư, tải 450-1600 kg, tốc độ 1.0-2.5 m/s.", image: "https://www.guangri.com.cn/vancheerfile/Images/2023/7/20230728132656249.jpg" },
      { model: "G-ESC", name: "Thang cuốn + băng chuyền", desc: "Thang cuốn thương mại + giao thông công cộng, bước thang 600-1000mm.", image: "https://www.guangri.com.cn/vancheerfile/Images/2023/7/20230703180154589.jpg" },
      { model: "G-HE", name: "Thang máy gia đình", desc: "Thang máy compact cho biệt thự + nhà phố cao cấp.", image: "https://www.guangri.com.cn/vancheerfile/Images/2023/8/20230804164029309.jpg" },
      { model: "G-CESC", name: "Thang cuốn thương mại", desc: "Thang cuốn TTTM + sân bay, thiết kế đẹp + tải khách cao.", image: "https://www.guangri.com.cn/vancheerfile/Images/2023/8/20230814092717766.jpg" },
      { model: "G-TESC", name: "Thang cuốn metro / giao thông", desc: "Thang cuốn cho metro + ga tàu + sân bay, hoạt động liên tục heavy-duty.", image: "https://www.guangri.com.cn/vancheerfile/Images/2023/8/20230814092729176.jpg" },
    ],
  },

  // ─── 🪟 CỬA & CỬA SỔ (khoá thông minh) ──────────────────────────────
  {
    slug: "teeho",
    name: "TEEHO",
    nameOriginal: "TEEHO",
    category: "doors-windows",
    cvsStt: 18,
    logo: "https://www.teeho.com/cdn/shop/files/20220414170928_dab500c7-794d-410b-80a0-54b76e9eb97b.png?v=1678261396&width=240",
    introduction:
      "TEEHO là thương hiệu khoá thông minh top-seller trên Amazon Mỹ, chuyên thiết kế và sản xuất khoá vân tay + khoá bàn phím + khoá Wi-Fi. Sản phẩm tích hợp công nghệ hiện đại với UX thân thiện, phục vụ thị trường gia đình + khách sạn + cho thuê Airbnb tại Bắc Mỹ.",
    factory: {
      location: "Nhà máy sản xuất tại Quảng Đông, Trung Quốc",
    },
    highlights: [
      "Top seller mảng smart lock trên Amazon Mỹ",
      "Toàn bộ sản phẩm có IP54 (chống bụi + tia nước) hoặc IP55",
      "Pin 4× AA bền 1 năm sử dụng — không cần sạc thường xuyên",
      "Nhiệt độ vận hành: -30°C đến 70°C (phù hợp khí hậu Việt Nam)",
      "Chính sách đổi trả 30 ngày + hỗ trợ khách hàng 24h",
    ],
    website: "https://www.teeho.com/",
    products: [
      { model: "TE001", name: "TE001 — Khoá chốt bàn phím", desc: "Khoá chốt nhập mã bàn phím cơ bản, vào không cần chìa, giá $56.99 (Amazon).", image: "https://www.teeho.com/cdn/shop/files/20240902193240.jpg?v=1725276810&width=400" },
      { model: "TE001K", name: "TE001K — Bộ khoá + tay nắm", desc: "Bộ khoá chốt + tay nắm cửa, không cần chìa, giá $76.99.", image: "https://www.teeho.com/cdn/shop/products/TE001-K.jpg?v=1677822820&width=400" },
      { model: "TE001L", name: "TE001L — Bộ khoá Keyless 2 tay nắm", desc: "Bộ khoá entry không chìa với 2 tay nắm, lắp được cửa chính + cửa phụ, giá $89.99.", image: "https://www.teeho.com/cdn/shop/files/20241127102519.jpg?v=1732674373&width=400" },
      { model: "TE002", name: "TE002 — Khoá chốt + vân tay ⭐", desc: "Flagship: kết hợp bàn phím + vân tay (lưu 20 vân tay + 20 mã PIN), IP54, pin bền 1 năm, giá $59.99.", image: "https://www.teeho.com/cdn/shop/products/1_5bdd18c6-b792-4600-b230-b2e9bc0a45f4.jpg?v=1663570360&width=400" },
      { model: "TE002K", name: "TE002K — Bộ khoá vân tay + 2 tay nắm", desc: "Bộ vân tay + tay nắm cao cấp với 2 knob, giá $189.99.", image: "https://www.teeho.com/cdn/shop/products/TE002-K.jpg?v=1677814047&width=400" },
      { model: "TE002L", name: "TE002L — Khoá vân tay + 2 tay nắm đòn", desc: "Khoá vân tay với 2 tay nắm đòn, giá $129.99.", image: "https://www.teeho.com/cdn/shop/files/TE002-L_1_5f321ec3-6f7b-4921-9d28-b1e13bb01ac1.jpg?v=1684891191&width=400" },
      { model: "TE003", name: "TE003 — Khoá bàn phím + tay nắm", desc: "Khoá bàn phím tích hợp tay nắm, giá $69.99.", image: "https://www.teeho.com/cdn/shop/files/TE003.jpg" },
      { model: "TE004", name: "TE004 — Khoá keyless + chống nhìn trộm", desc: "Bàn phím + tay nắm với chế độ chống nhìn trộm + tự khoá + passage mode, giá $69.99.", image: "https://www.teeho.com/cdn/shop/files/6391ace427ade714b70fb966024ae804_160ebb11-303f-490d-954c-3c2af5e241bd.jpg" },
      { model: "TE011W", name: "TE011W — Khoá Wi-Fi + Alexa/Google", desc: "Khoá Wi-Fi điều khiển từ xa, tương thích Alexa + Google Assistant, giá $69.99.", image: "https://www.teeho.com/cdn/shop/files/B0GJDFVNX1.MAIN.jpg" },
      { model: "TE012W", name: "TE012W — Khoá Wi-Fi + vân tay IP55", desc: "Khoá Wi-Fi tích hợp vân tay, chống nước IP55, app điều khiển từ xa, giá $62.99.", image: "https://www.teeho.com/cdn/shop/files/1-1_8754ffbe-3bb9-4711-8c75-03b5637c1685.jpg" },
      { model: "TE012W-H", name: "TE012W-H — Wi-Fi + tay nắm + vân tay", desc: "Phiên bản cao cấp: Wi-Fi + tay nắm + vân tay, giá $199.99.", image: "https://www.teeho.com/cdn/shop/files/0_4-WiFi.jpg" },
      { model: "TE012W-K", name: "TE012W-K — Wi-Fi + 2 knob + vân tay", desc: "Wi-Fi + 2 knob + vân tay, giá $97.99.", image: "https://www.teeho.com/cdn/shop/files/1_f3c19df7-12a0-4a7a-95cd-a8e20978b55a.jpg" },
      { model: "TE018", name: "TE018 — Smart Door Knob", desc: "Knob thông minh + bàn phím + app + chia sẻ mã 1 lần, giá $99.99.", image: "https://www.teeho.com/cdn/shop/files/0_1.jpg" },
      { model: "TE019", name: "TE019 — Smart Lock + tay nắm", desc: "Smart Lock + tay nắm + app + chia sẻ mã 1 lần + passage mode, giá $99.99.", image: "https://www.teeho.com/cdn/shop/files/3_f882c030-9200-4098-8854-46d724a23093.jpg" },
      { model: "TK001H", name: "TK001H — Keyless deadbolt + handle set", desc: "Bộ khoá chốt keyless với handle set hoàn chỉnh, giá $99.99.", image: "https://www.teeho.com/cdn/shop/files/20250115090944.jpg" },
      { model: "G1", name: "G1 Gateway — Wi-Fi Bridge", desc: "Gateway Wi-Fi điều khiển khoá từ xa + smart hub tương thích Alexa, giá $39.99.", image: "https://www.teeho.com/cdn/shop/files/0.jpg" },
    ],
  },

  // ─── 🚿 PHÒNG TẮM & VỆ SINH ─────────────────────────────────────────
  {
    slug: "anbi",
    name: "ANBI",
    nameOriginal: "安彼卫浴 ANBI",
    category: "bathroom-sanitary",
    cvsStt: 24,
    introduction:
      "ANBI là thương hiệu sứ vệ sinh đặt tại Triều Châu, Quảng Đông — một trong những trung tâm sản xuất sứ vệ sinh lớn nhất Trung Quốc. Thương hiệu tập trung phát triển dòng bồn cầu thông minh và thiết kế nội thất phòng tắm tích hợp, định vị mục tiêu trở thành thương hiệu gia dụng toàn quốc Trung Quốc.",
    founded: "2021",
    factory: {
      location: "Cổ Hạng Trấn, Triều An Khu, Triều Châu, Quảng Đông, Trung Quốc",
    },
    highlights: [
      "Hotline: 400-8308-789",
      "Khẩu hiệu: 安彼智能, 安心享用 (An Bĩ thông minh, an tâm tận hưởng)",
      "Được công nhận Top 10 thương hiệu sứ vệ sinh Triều Châu 2024",
      "Top thương hiệu được người tiêu dùng yêu thích 2024",
      "Có trong danh mục mua sắm tiết kiệm năng lượng của chính phủ TQ",
    ],
    hotline: "400-8308-789",
    website: "https://www.anbichina.com/",
    products: [
      { model: "A-IT", name: "Bồn cầu thông minh 1 khối", desc: "Bồn cầu thông minh tích hợp xịt + sấy + sưởi nắp + tự khử mùi, dạng 1 khối.", image: "https://www.anbichina.com/uploadimg/type_03.jpg" },
      { model: "A-SC", name: "Nắp bồn cầu thông minh", desc: "Nắp bồn cầu thông minh gắn thêm cho bồn cầu thường, xịt + sấy + sưởi.", image: "https://www.anbichina.com/uploadimg/type_02.jpg" },
      { model: "A-OT", name: "Bồn cầu liền khối truyền thống", desc: "Bồn cầu sứ liền khối, xả siphon êm + tiết kiệm nước 3/6L.", image: "https://www.anbichina.com/uploadimg/type_01.jpg" },
      { model: "A-WH", name: "Bồn cầu treo tường", desc: "Bồn cầu treo tường tiết kiệm không gian, lắp với két âm tường.", image: "https://www.anbichina.com/uploadimg/type_04.jpg" },
      { model: "A-CS", name: "Set phòng tắm trẻ em", desc: "Bộ sản phẩm phòng tắm cho trẻ em: bồn cầu nhỏ + lavabo + bậc.", image: "https://www.anbichina.com/uploadimg/type_05.jpg" },
      { model: "A-AB", name: "Lavabo nghệ thuật", desc: "Lavabo sứ nghệ thuật đa dạng kiểu dáng + màu men, đặt bàn + treo tường.", image: "https://www.anbichina.com/uploadimg/type_06.jpg" },
    ],
  },

  // ─── 🧱 VẬT LIỆU XÂY DỰNG ──────────────────────────────────────────
  {
    slug: "dulux-pro",
    name: "Dulux Professional",
    nameOriginal: "Dulux Pro / AkzoNobel",
    category: "construction-materials",
    cvsStt: 34,
    logo: "https://www.duluxpro.com.cn/wp-content/uploads/2024/05/logo-1.png",
    introduction:
      "Dulux Professional là dòng sơn chuyên dụng của tập đoàn AkzoNobel (Hà Lan, thành lập từ 1792 — hơn 230 năm lịch sử). Tập đoàn sở hữu các thương hiệu sơn nổi tiếng toàn cầu: Dulux, International, Sikkens, Interpon, hoạt động tại hơn 150 quốc gia với 34.000 nhân viên.",
    founded: "1792 (AkzoNobel)",
    factory: {
      location: "Trụ sở AkzoNobel: Amsterdam, Hà Lan",
      facilities: "Sản xuất tại 150+ quốc gia",
      employees: "~34.000 toàn cầu",
    },
    highlights: [
      "Tập đoàn sơn lâu đời nhất thế giới — hơn 230 năm",
      "Sở hữu portfolio đa thương hiệu: Dulux, International, Sikkens, Interpon",
      "Định vị 'Professional Solution Partner' — cung cấp giải pháp + kỹ thuật + màu sắc trọn gói cho B2B",
      "Khách hàng tham chiếu VIP tại TQ: Vanke, Longfor, Huarun, Country Garden, Zhaoshang Shekou, Yuexiu Real Estate",
    ],
    website: "https://www.duluxpro.com.cn/",
    products: [
      { model: "JK-1", name: "JK-1 — Sơn ngoại thất giả đá + nghệ thuật", desc: "Sơn ngoại thất hiệu ứng giả đá + texture nghệ thuật cho mặt đứng cao cấp.", image: "https://www.duluxpro.com.cn/wp-content/uploads/2024/05/jk-1.jpg" },
      { model: "JK-2", name: "JK-2 — Sơn ngoại thất 晴雨漆", desc: "Sơn ngoại thất chống mưa nắng (Sunny & Rainy paint), bền màu thời tiết khắc nghiệt.", image: "https://www.duluxpro.com.cn/wp-content/uploads/2024/05/jk-2.jpg" },
      { model: "JK-3", name: "JK-3 — Sơn phản xạ nhiệt", desc: "Sơn ngoại thất phản xạ tia hồng ngoại, giảm nhiệt độ bề mặt 5-10°C.", image: "https://www.duluxpro.com.cn/wp-content/uploads/2024/05/jk-3.jpg" },
      { model: "JK-4", name: "JK-4 — Sơn kim loại gốc nước", desc: "Sơn kim loại water-based, độ bám dính cao cho bề mặt thép.", image: "https://www.duluxpro.com.cn/wp-content/uploads/2024/05/jk-4.jpg" },
      { model: "JK-5", name: "JK-5 — Sơn fluorocarbon gốc nước", desc: "Sơn fluorocarbon (PVDF) gốc nước, độ bền cao + bảo vệ kim loại 20+ năm.", image: "https://www.duluxpro.com.cn/wp-content/uploads/2024/05/jk-5.jpg" },
      { model: "JK-6", name: "JK-6 — Sơn nội thất sinh thái", desc: "Sơn nội thất low-VOC, không mùi, đạt chuẩn xanh.", image: "https://www.duluxpro.com.cn/wp-content/uploads/2024/05/jk-6.jpg" },
      { model: "JK-7", name: "JK-7 — Sơn nội thất bền hiệu năng", desc: "Sơn nội thất bền cao + chống mốc + dễ vệ sinh.", image: "https://www.duluxpro.com.cn/wp-content/uploads/2024/05/jk-7.jpg" },
      { model: "JK-8", name: "JK-8 — Sơn sàn epoxy", desc: "Sơn sàn epoxy cho công nghiệp + thương mại, chống dầu + chịu mài mòn.", image: "https://www.duluxpro.com.cn/wp-content/uploads/2024/05/jk-8.jpg" },
      { model: "JK-9", name: "JK-9 — Sơn sàn polyurethane mortar", desc: "Sơn sàn PU mortar cho nhà máy chế biến thực phẩm + dược phẩm.", image: "https://www.duluxpro.com.cn/wp-content/uploads/2024/05/jk-9.jpg" },
      { model: "JK-10", name: "JK-10 — Phụ trợ: bột trét + keo + chống thấm", desc: "Hệ phụ trợ trọn gói: bột trét, keo gạch, sơn chống thấm hệ Dulux Pro.", image: "https://www.duluxpro.com.cn/wp-content/uploads/2024/05/jk-10.jpg" },
    ],
  },
  {
    slug: "yuhong",
    name: "Đông Phương Vũ Hồng (Yuhong)",
    nameOriginal: "东方雨虹 Oriental Yuhong",
    category: "construction-materials",
    cvsStt: 36,
    logo: "https://www.yuhong.com.cn/thems/dfyhjt/images/f_logo_03.png",
    introduction:
      "Đông Phương Vũ Hồng (Oriental Yuhong) là tập đoàn vật liệu chống thấm + cách nhiệt + sơn xây dựng dân dụng hàng đầu Trung Quốc, niêm yết trên sàn Thâm Quyến mã 002271. Doanh thu năm 2023 đạt khoảng 328 tỷ NDT, sở hữu 1.916 bằng sáng chế và 68 cơ sở sản xuất + R&D + logistics (trong đó 3 cơ sở ngoài Trung Quốc).",
    founded: "1995",
    listed: "SZSE 002271",
    factory: {
      location: "Trụ sở chính: Bắc Kinh, Trung Quốc",
      facilities: "68 cơ sở (sản xuất + R&D + logistics, gồm 3 ở nước ngoài)",
      capacity: "Màng chống thấm 1.5 tỷ m²/năm · Sơn chống thấm 5 triệu tấn/năm · Vữa 20+ triệu tấn/năm · Cách nhiệt 10+ triệu m³/năm",
    },
    highlights: [
      "Niêm yết SZSE — mã 002271",
      "Doanh thu 2023: ~328 tỷ NDT, lợi nhuận ròng ~22,7 tỷ NDT",
      "1.916 bằng sáng chế (toàn tập đoàn)",
      "Phòng thí nghiệm trọng điểm quốc gia về vật liệu chống thấm tiên tiến",
      "Cung cấp chống thấm cho dự án Bird's Nest, Water Cube (Olympic Bắc Kinh 2008), Nhà hát Opera Trung Ương",
      "Hotline phân theo dòng SP: Engineering 400-779-1975 / Residential 400-700-5756 / Repair 400-995-8686 / Mortar 400-685-0885",
    ],
    website: "https://www.yuhong.com.cn/",
    products: [
      { model: "PMB-741", name: "PMB-741 — Màng SBS biến tính", desc: "Màng chống thấm bitum SBS biến tính, đàn hồi cao + chịu thời tiết.", image: "https://www.yuhong.com.cn/uploads/230626/1-230626114311T8.png" },
      { model: "PMB-751", name: "PMB-751 — Màng asphalt nhiệt-ẩm cao", desc: "Màng chống thấm chuyên dụng cho khí hậu nhiệt độ + độ ẩm cao như Việt Nam.", image: "https://www.yuhong.com.cn/uploads/230626/1-230626114522533.png" },
      { model: "PMB-742", name: "PMB-742 — Màng SBS siêu lạnh", desc: "Màng SBS biến tính chịu nhiệt độ siêu thấp cho khu vực bắc.", image: "https://www.yuhong.com.cn/uploads/230626/1-230626114432W6.png" },
      { model: "SAM-920", name: "SAM-920 — Màng tự dính polymer", desc: "Màng chống thấm tự dính không cốt + polymer biến tính, lắp nhanh không cần khò.", image: "https://www.yuhong.com.cn/uploads/230626/1-230626115150144.png" },
      { model: "SAM-921", name: "SAM-921 — Màng tự dính cường độ cao", desc: "Màng tự dính cường độ cao, bám siêu chặt cho công trình ngầm + bể nước.", image: "https://www.yuhong.com.cn/uploads/230626/1-230626115240O8.png" },
      { model: "TPO-P", name: "TPO-P — Màng nhiệt dẻo polyolefin", desc: "Màng chống thấm TPO nhiệt dẻo, không hoá dẻo + thân thiện môi trường.", image: "https://www.yuhong.com.cn/uploads/250425/1-250425164403504.png" },
      { model: "SPU-301", name: "SPU-301 — Sơn PU 1-thành phần", desc: "Sơn chống thấm polyurethane 1-thành phần, tạo màng đàn hồi liền mạch.", image: "https://www.yuhong.com.cn/uploads/230626/1-230626115P12J.png" },
      { model: "SPU-311", name: "SPU-311 — Sơn PU 2-thành phần", desc: "Sơn chống thấm PU 2-thành phần, độ bền + đàn hồi cao hơn.", image: "https://www.yuhong.com.cn/uploads/250425/1-250425162534212.png" },
      { model: "EPS-G", name: "EPS / Polystyrene graphite (Fuda)", desc: "Tấm cách nhiệt EPS chứa graphite, hệ số dẫn nhiệt thấp.", image: "https://www.yuhong.com.cn/uploads/200313/1-20031313204YW.png" },
      { model: "XPS-B", name: "Tấm XPS", desc: "Tấm cách nhiệt XPS polystyrene đùn ép, độ nén cao + chống ẩm.", image: "https://www.yuhong.com.cn/uploads/200313/1-200313132104145.png" },
      { model: "RW", name: "Bông khoáng rockwool", desc: "Bông khoáng đá rockwool, cách nhiệt + cách âm + chống cháy A1.", image: "https://www.yuhong.com.cn/uploads/190911/1-1Z9111022404G.jpg" },
      { model: "GW", name: "Bông thuỷ tinh glass wool", desc: "Bông thuỷ tinh cách nhiệt + cách âm cho tường + trần + ống gió.", image: "https://www.yuhong.com.cn/uploads/190911/1-1Z91110231J62.png" },
      { model: "CP-634", name: "CP-634 — Sơn sỏi Caparol", desc: "Sơn ngoại thất sỏi vụn (Caparol Stone), hiệu ứng tự nhiên.", image: "https://www.yuhong.com.cn/uploads/190823/1-1ZR31R535524.png" },
      { model: "CP-665", name: "CP-665 — Rock Color Caparol", desc: "Sơn texture vân đá tự nhiên, hiệu ứng cao cấp cho mặt đứng.", image: "https://www.yuhong.com.cn/uploads/190826/1-1ZR6094S1543.png" },
      { model: "CP-383", name: "CP-383 — Màng sơn đàn hồi", desc: "Màng sơn đàn hồi cao, che được vết nứt nhỏ trên tường.", image: "https://www.yuhong.com.cn/uploads/190826/1-1ZR609491a64.png" },
      { model: "CP-362", name: "CP-362 — Sơn ngoại thất acrylic", desc: "Sơn ngoại thất acrylic pure, bền màu + chống mốc.", image: "https://www.yuhong.com.cn/uploads/190826/1-1ZR609505X23.png" },
      { model: "BA-N10", name: "Bian'an N10 — Bột trét base", desc: "Bột trét tường base, tạo nền cho lớp trét tiếp theo.", image: "https://www.yuhong.com.cn/uploads/200323/1-200323135922V3.png" },
      { model: "BA-N20", name: "Bian'an N20 — Bột trét tường", desc: "Bột trét tường standard, độ mịn cao.", image: "https://www.yuhong.com.cn/uploads/200324/1-2003241621405N.png" },
      { model: "BA-N30", name: "Bian'an N30 — Bột trét cao cấp", desc: "Bột trét tường cao cấp, độ kết dính tốt.", image: "https://www.yuhong.com.cn/uploads/200324/1-200324162222163.png" },
      { model: "BA-N35", name: "Bian'an N35 — Bột trét premium", desc: "Bột trét tường premium, kháng nấm mốc.", image: "https://www.yuhong.com.cn/uploads/200324/1-200324162455a0.png" },
      { model: "BA-N40", name: "Bian'an N40 — Bột trét ngoài trời", desc: "Bột trét chuyên dụng ngoại thất, chống thấm + chịu thời tiết.", image: "https://www.yuhong.com.cn/uploads/200324/1-2003241625155T.png" },
    ],
  },
  {
    slug: "langhui",
    name: "Lang Huy (Langhui)",
    nameOriginal: "朗辉建材 Langhui",
    category: "construction-materials",
    cvsStt: 42,
    logo: "https://gdlanghui.com/template/default/images/logo.png",
    introduction:
      "Lang Huy (Guangdong Langhui Building Materials) là nhà sản xuất chuyên về tấm bê tông khí chưng áp ALC/AAC tại Quảng Đông, Trung Quốc. Khu sản xuất rộng 246 mẫu (~166ha) với vốn đầu tư khoảng 4,2 tỷ NDT, sở hữu hơn 120 bộ máy tự động hoá cao, công suất hơn 1 triệu m³/năm.",
    factory: {
      location: "Khu công nghiệp Cao Minh, Phật Sơn, Quảng Đông, đường Ming Ba 133-8",
      area: "246 mẫu (~166 ha)",
      capacity: "1+ triệu m³/năm",
      facilities: "120+ bộ máy tự động hoá",
      investment: "~4,2 tỷ NDT",
    },
    highlights: [
      "Hotline kinh doanh: 133-1632-2103 / Email: salesem@gdlanghui.com",
      "Sản phẩm fire wall đạt chống cháy &gt; 4 giờ",
      "Sản phẩm tấm siêu mỏng 50/75mm xuất khẩu Úc, Nhật, Hàn Quốc",
      "Dự án tham chiếu: Longhu Developments, Agile Xiyuefu Residences",
    ],
    hotline: "133-1632-2103",
    website: "https://gdlanghui.com/",
    products: [
      { model: "HACB", name: "HACB — Khối AAC độ chính xác cao", desc: "Khối bê tông khí chưng áp AAC độ chính xác cao, kích thước đồng đều, xây tường nhẹ.", image: "https://gdlanghui.com/static/upload/image/20241007/1728293058978388.png" },
      { model: "ALC-WP", name: "Tấm vách ngăn ALC cốt thép", desc: "Tấm vách ngăn ALC gia cường thép, độ bền cao, lắp nhanh.", image: "https://gdlanghui.com/static/upload/image/20241007/1728292941967339.png" },
      { model: "ALC-UT", name: "Tấm ALC siêu mỏng 50/75mm", desc: "Tấm ALC siêu mỏng dày 50mm/75mm cho khung lightweight, xuất khẩu Úc/Nhật/Hàn.", image: "https://gdlanghui.com/static/upload/image/20241028/1730081325482341.png" },
      { model: "ALC-FR", name: "Tấm sàn + tấm mái ALC", desc: "Tấm sàn + tấm mái ALC chịu tải trọng cao + chống cháy + cách nhiệt.", image: "https://gdlanghui.com/static/upload/image/20241008/1728355217862065.jpg" },
      { model: "ALC-FW", name: "Tấm vách chống cháy &gt; 4 giờ", desc: "Tấm vách chống cháy đạt &gt; 4 giờ — vượt nhiều tiêu chuẩn quốc tế.", image: "https://gdlanghui.com/static/upload/image/20241008/1728354539552653.jpg" },
      { model: "ALC-IW", name: "Tấm vách trong nhà", desc: "Tấm vách trong nhà với cốt thép tuỳ chỉnh theo kết cấu, giảm trọng lượng tổng thể.", image: "https://gdlanghui.com/static/upload/image/20241008/1728353085571947.jpg" },
    ],
  },
  {
    slug: "duc-thinh-stone",
    name: "Đức Thịnh Stone",
    nameOriginal: "德盛 Duc Thinh Stone Technology Co., Ltd.",
    category: "construction-materials",
    cvsStt: 44,
    logo:
      "https://ducthinhstone.com/wp-content/uploads/2025/06/z7153273983391_4d3bb7ae8fc09b583a866595e847744c.jpg",
    introduction:
      "Đức Thịnh Stone Technology là pháp nhân Việt Nam thuộc tập đoàn PENG XIANG (Phúc Kiến, Trung Quốc) — một trong những nhà sản xuất đá nhân tạo cao cấp hàng đầu Châu Á. Nhà máy đặt tại KCN Nghĩa Đàn, Nghệ An, vốn 25 triệu USD, gần 800-1000 nhân viên, công suất 8,5 triệu m² tấm/năm. Sản phẩm phục vụ thị trường nội địa Việt Nam và xuất khẩu 120+ quốc gia.",
    factory: {
      location: "KCN Nghĩa Đàn, Xã Nghĩa Thọ, Nghệ An, Việt Nam",
      area: "400.000 m² (~40 ha)",
      employees: "~800–1.000 người",
      capacity: "8,5 triệu m² tấm/năm",
      investment: "25 triệu USD",
    },
    highlights: [
      "Pháp nhân Việt Nam — sản xuất tại Việt Nam, vận chuyển thuận lợi",
      "Hotline: (+84) 238-863-9666 / Email: office@ducthinhstone.com",
      "Tập đoàn mẹ PENG XIANG (Phúc Kiến TQ) — top nhà sản xuất đá nhân tạo Châu Á",
      "Xuất khẩu hơn 120 quốc gia",
      "Ứng dụng: mặt bàn bếp, tủ phòng tắm, ốp tường, cầu thang, nội thất cao cấp, TTTM, khách sạn",
    ],
    hotline: "(+84) 238-863-9666",
    website: "https://ducthinhstone.com/",
    products: [
      { model: "PXQZ240907-3", name: "PXQZ240907-3 — Quartz chống thấm", desc: "Tấm quartz nhân tạo chống thấm, dùng cho mặt bếp + lavabo.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202505081528458137-1-300x200.jpg" },
      { model: "PXQZ240901-1", name: "PXQZ240901-1 — Tấm khổ lớn 3200×1600mm", desc: "Tấm quartz nhân tạo khổ lớn 3200×1600mm, hạn chế mối nối.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202505071047199014-1-300x200.jpg" },
      { model: "PXQZ190425-5", name: "PXQZ190425-5 — Ốp tường bề mặt da", desc: "Tấm quartz ốp tường bề mặt nhám kiểu da, hiệu ứng tự nhiên.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202407241107180115-300x200.jpg" },
      { model: "PXQZ221222-1", name: "PXQZ221222-1 — Mặt bếp cao cấp", desc: "Tấm quartz mặt bếp cao cấp, độ cứng cao + chống xước.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202408011613584918-300x200.jpg" },
      { model: "PXQZ230521-3", name: "PXQZ230521-3 — Quartz nội thất sinh thái", desc: "Tấm quartz nội thất thân thiện môi trường, không phát thải VOC.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202407291619590663-768x513.jpg" },
      { model: "PXQZ231109-2", name: "PXQZ231109-2 — Mặt bàn + ốp tường", desc: "Tấm quartz đa năng, làm mặt bàn lẫn ốp tường nội thất.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202407301430196426-768x513.jpg" },
      { model: "PXQZ160725-3", name: "PXQZ160725-3 — Engineered wholesale", desc: "Tấm engineered quartz cho phân khúc wholesale.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202407311133208903-768x513.jpg" },
      { model: "PXQZ220507-2", name: "PXQZ220507-2 — Tấm tuỳ kích thước", desc: "Sản xuất tấm quartz theo kích thước khách hàng đặt, giá factory direct.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202407281521296906-768x513.jpg" },
      { model: "PXQZ190612-1", name: "PXQZ190612-1 — White Calacatta", desc: "Tấm quartz vân Calacatta trắng kinh điển cao cấp.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202407281445225808-768x513.jpg" },
      { model: "PXQZ230427-1", name: "PXQZ230427-1 — Golden Veins Calacatta", desc: "Calacatta nhân tạo với vân vàng nổi bật cho không gian sang trọng.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202407291535050738-768x513.jpg" },
      { model: "PXQZ230629-3", name: "PXQZ230629-3 — Stone furniture slab", desc: "Tấm quartz cho sản xuất nội thất đá (bàn, ghế đá).", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202407291717085630-768x513.jpg" },
      { model: "PXQZ230709-2", name: "PXQZ230709-2 — Black quartz sheet", desc: "Tấm quartz màu đen cao cấp, mặt mờ + chống vân tay.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202407291723014117-1.jpg" },
      { model: "PXQZ220914-4", name: "PXQZ220914-4 — Kitchen island slab", desc: "Tấm quartz chuyên cho đảo bếp, khổ lớn liền mạch.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202407291054556491-768x513.jpg" },
      { model: "PXQZ230626-1", name: "PXQZ230626-1 — Cabinet countertop", desc: "Tấm quartz cho mặt tủ bếp, chống thấm + dễ vệ sinh.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202407291702491021-768x513.jpg" },
      { model: "PXQZ231109-8", name: "PXQZ231109-8 — Wall cladding cao cấp", desc: "Tấm ốp tường cao cấp, vân thiết kế hiện đại.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202407301436314184-768x513.jpg" },
      { model: "PXQZ231126-3", name: "PXQZ231126-3 — Tấm có quality cert", desc: "Tấm quartz có đầy đủ chứng nhận chất lượng quốc tế.", image: "https://ducthinhstone.com/wp-content/uploads/2025/07/3121-202407301453103172-768x513.jpg" },
    ],
  },
];

/** Lookup helper: nhóm partners theo root category. */
export function partnersByCategory(slug: PartnerBrand["category"]): PartnerBrand[] {
  return PARTNERS.filter((p) => p.category === slug);
}

/** Lookup helper: lấy 1 partner theo slug. */
export function getPartner(slug: string): PartnerBrand | undefined {
  return PARTNERS.find((p) => p.slug === slug);
}
