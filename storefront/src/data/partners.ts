import { KITO_PRODUCTS } from "@/data/catalogs/kito";
import { MIDEA_PRODUCTS } from "@/data/catalogs/midea";
import { TOSHIBA_PRODUCTS } from "@/data/catalogs/toshiba";
import { LESSO_PRODUCTS } from "@/data/catalogs/lesso";
import { TEKA_PRODUCTS } from "@/data/catalogs/teka";
import { DUC_THINH_STONE_PRODUCTS } from "@/data/catalogs/duc-thinh-stone";
import { YUHONG_PRODUCTS } from "@/data/catalogs/yuhong";
import { ANBI_PRODUCTS } from "@/data/catalogs/anbi";
import { GUANGRI_PRODUCTS } from "@/data/catalogs/guangri";
import { TOSHIBA_ELEVATOR_PRODUCTS } from "@/data/catalogs/toshiba-elevator";
import { TEEHO_PRODUCTS } from "@/data/catalogs/teeho";
import { TREES_PRODUCTS } from "@/data/catalogs/3trees";
import { DULUX_PRO_PRODUCTS } from "@/data/catalogs/dulux-pro";
import { DAWEIER_PRODUCTS } from "@/data/catalogs/daweier";
import { PENGXIANG_PRODUCTS } from "@/data/catalogs/pengxiang";
import { TTLOCK_PRODUCTS } from "@/data/catalogs/ttlock";
import { LINVOL_PRODUCTS } from "@/data/catalogs/linvol";
import { SYLVANIA_PRODUCTS } from "@/data/catalogs/sylvania";
import { BRAVAT_PRODUCTS } from "@/data/catalogs/bravat";
import { FSL_PRODUCTS } from "@/data/catalogs/fsl";
import { DONGYUAN_PRODUCTS } from "@/data/catalogs/dongyuan";
import { CARE_LIGHTING_PRODUCTS } from "@/data/catalogs/care-lighting";
import { LANGHUI_PRODUCTS } from "@/data/catalogs/langhui";
import { ZHONGJU_YABAI_PRODUCTS } from "@/data/catalogs/zhongju-yabai";
import { MIJIC_PRODUCTS } from "@/data/catalogs/mijic";

/**
 * Huayue Supply Chain partner factories — 24 official partner brands, all
 * audited by the Guangzhou sourcing team and supplying their product catalogs
 * for distribution in the Vietnam market.
 *
 * Each partner maps to one main category (slug) in NAV_MENU.
 * Original Chinese / English content has been compiled and rewritten as
 * professional English to fit B2B customers, not copied verbatim from the
 * brands' marketing materials.
 */

export type PartnerProduct = {
  /** Factory official SKU / model code. */
  model: string;
  /** URL slug —— path /info/partners/{partner}/{productSlug}.
   *  Defaults to model.toLowerCase() when not set. */
  slug?: string;
  /** Product name. */
  name: string;
  /** Original Chinese name (if any). */
  nameOriginal?: string;
  /** Series / product line name. */
  series?: string;
  /** Original Chinese series name. */
  seriesOriginal?: string;
  /** Short description, 1-2 sentences (key features / functions). */
  desc?: string;
  /** Long description for the detail page. */
  longDesc?: string;
  /** Product image —— brand CDN direct link or local /img/. */
  image?: string;
  /** Additional images for the detail page (gallery). */
  gallery?: string[];
  /** Dimensions (e.g. "1200×600 mm"). */
  dimensions?: string;
  /** Surface / finish. */
  surface?: string;
  /** Highlight features. */
  features?: string[];
  /** Applications / suitable spaces. */
  applications?: string[];
  /** Real technical spec table (scraped from the brand product page).
   *  k = label (e.g. "Capacity"), v = value (e.g. "8.5 kg"). */
  specs?: { k: string; v: string }[];
  /** Original product page link on the brand website (for traceability). */
  sourceUrl?: string;
};

export type PartnerFactory = {
  /** Factory location (city, province, country). */
  location: string;
  /** Factory area. */
  area?: string;
  /** Number of employees / workers. */
  employees?: string;
  /** Annual capacity. */
  capacity?: string;
  /** Number of facilities (production / R&D / logistics). */
  facilities?: string;
  /** Total factory investment. */
  investment?: string;
};

export type PartnerBrand = {
  /** URL slug —— path /info/partners/{slug}. */
  slug: string;
  /** Brand name (Chinese name if any) or the original Latin name. */
  name: string;
  /** Original Chinese name + Latin name, for easy customer recognition. */
  nameOriginal: string;
  /** Slug of the main category in NAV_MENU. */
  category:
    | "home-garden"
    | "construction-materials"
    | "bathroom-sanitary"
    | "noi-that"
    | "kitchen-equipment"
    | "lighting"
    | "doors-windows"
    | "electrical";
  /** Original CSV sequence number (for traceability). */
  cvsStt: number;
  /** Logo URL (if any). */
  logo?: string;
  /** If the logo is a white-on-transparent design (only visible on dark
   *  backgrounds), set `logoBg: "dark"` so all logo containers use a dark
   *  background instead of white. */
  logoBg?: "dark";
  /** Banner / hero image. */
  banner?: string;

  /** Company introduction —— a 2-3 sentence paragraph. */
  introduction: string;
  /** Year founded. */
  founded?: string;
  /** If a listed company —— stock ticker. */
  listed?: string;

  factory: PartnerFactory;

  /** Highlights (certifications, awards, proprietary technology, major projects). */
  highlights: string[];

  /** Hotline + website. */
  hotline?: string;
  website: string;

  /** All main products. */
  products: PartnerProduct[];
};

export const PARTNERS: PartnerBrand[] = [
  // ─── ⚡ Electrical & Appliances ─────────────────────────────────────────
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
      "Midea là tập đoàn điện gia dụng đa thương hiệu hàng đầu Trung Quốc với danh mục thương hiệu chiến lược trải dài từ phân khúc tầm trung đến cao cấp. Máy điều hòa, tủ lạnh, máy giặt, thiết bị nhà bếp và đồ gia dụng nhỏ của Midea giữ thị phần dẫn đầu tại Trung Quốc và được xuất khẩu sang hơn 200 quốc gia.",
    founded: "1968",
    listed: "SZSE 000333",
    factory: {
      location: "Trụ sở chính: Phật Sơn, Quảng Đông, Trung Quốc",
      facilities: "Hơn 30 nhà máy + hơn 35 trung tâm R&D trên toàn cầu",
      employees: "Hơn 180.000 nhân viên (toàn tập đoàn)",
    },
    highlights: [
      "Fortune Global 500 (có tên mỗi năm kể từ 2016)",
      "7 thương hiệu con chiến lược: Midea, Little Swan, COLMO (AI cao cấp), Toshiba (cao cấp Nhật Bản), Cuckoo, Hualing (trẻ trung + giá trị tốt), Comfee (xuất khẩu)",
      "Mạng lưới phân phối trải khắp hơn 200 quốc gia",
      "Niêm yết trên Sàn Giao dịch Chứng khoán Thâm Quyến, mã 000333",
    ],
    website: "https://www.midea.com.cn/zh/our-businesses/Smart-Home-Business-Unit/midea",
    products: MIDEA_PRODUCTS,
  },
  {
    slug: "toshiba-home",
    name: "Toshiba Home Appliances",
    nameOriginal: "东芝家电 Toshiba",
    category: "electrical",
    cvsStt: 3,
    logo: "/img/logos/toshiba-elevator.png",
    introduction:
      "Toshiba Home Appliances là thương hiệu điện gia dụng cao cấp của Nhật Bản với hơn một thế kỷ lịch sử. Mảng điện gia dụng tại Trung Quốc do Tập đoàn Midea vận hành và tập trung vào thị trường cao cấp, kết hợp công nghệ Nhật Bản, tay nghề tinh xảo và hiệu năng giữ tươi thực phẩm vượt trội.",
    founded: "1875 (Toshiba Corp)",
    factory: {
      location: "Do Tập đoàn Midea vận hành tại Phật Sơn, Quảng Đông, Trung Quốc",
      facilities: "Dùng chung cơ sở sản xuất của Tập đoàn Midea",
    },
    highlights: [
      "Thương hiệu Nhật Bản với hơn 150 năm truyền thống (Toshiba Corporation thành lập năm 1875)",
      "Mảng điện gia dụng do Tập đoàn Midea vận hành từ năm 2016 —— R&D vẫn đặt tại Tokyo",
      "Dải sản phẩm đầy đủ: máy điều hòa, tủ lạnh, máy giặt, máy sấy, bếp, máy lọc nước, quạt, máy hút bụi",
      "Phân phối chính hãng tại Việt Nam bởi Toshiba Lifestyle (toshiba-lifestyle.com/vn)",
    ],
    website: "https://www.toshiba-lifestyle.com/vn/",
    products: TOSHIBA_PRODUCTS,
  },
  {
    slug: "lesso",
    name: "Lesso",
    nameOriginal: "联塑 Lesso",
    category: "electrical",
    cvsStt: 29,
    logo: "https://www.lesso.com/uploads/20260210/1469496bff5ab6eba035b3c4ef12df07.png",
    introduction:
      "Lesso là tập đoàn lớn của Trung Quốc trong lĩnh vực vật liệu xây dựng, gia dụng và chuỗi cung ứng, với các mảng kinh doanh trải dài từ ống nhựa, dây và cáp điện, vật liệu xây dựng, bảo vệ môi trường, năng lượng mới và nhiều lĩnh vực khác, phục vụ các thị trường hạ tầng dân dụng, công nghiệp, nông nghiệp và đô thị.",
    factory: {
      location: "Trụ sở chính: Long Giang, Khu Thuận Đức, Phật Sơn, Quảng Đông, Trung Quốc",
      facilities: "Hơn 30 nhà máy lớn tại Trung Quốc và Đông Nam Á",
    },
    highlights: [
      "Hotline toàn quốc 24/7: 400-168-2128",
      "Hiện diện tại 7 thị trường quốc tế: các khu vực nói tiếng Anh, UAE, Hoa Kỳ, Indonesia, Ấn Độ, Malaysia, Campuchia",
      "6 hệ sản phẩm: công trình đô thị, dân dụng, nông nghiệp, công nghiệp & thương mại, phòng cháy chữa cháy, khí đốt",
      "Vận chuyển nguyên container trực tiếp từ nhà máy về Việt Nam",
    ],
    hotline: "400-168-2128",
    website: "https://www.lessopipe.com/",
    products: LESSO_PRODUCTS,
  },

  // ─── 🍳 Kitchen Equipment ─────────────────────────────────────────────
  {
    slug: "teka",
    name: "Teka",
    nameOriginal: "Teka",
    category: "kitchen-equipment",
    cvsStt: 4,
    logo: "https://www.teka.com/zh-cn/wp-content/themes/teka/img/teka-new-logo.svg",
    introduction:
      "Teka là tập đoàn thiết bị nhà bếp và phòng tắm của Tây Ban Nha với hơn một thế kỷ lịch sử và danh mục gồm 3 thương hiệu: Teka (1924, gốc Đức), Küppersbusch (1875, cao cấp Đức, đoạt nhiều giải Red Dot và IF Design) và Intra (1871, bồn rửa inox Thụy Điển). Hiện thuộc công ty mẹ German Heritage B.",
    founded: "1924 (Teka)",
    factory: {
      location: "Trụ sở chính: Đức (Teka), Tây Ban Nha (vận hành chính)",
      facilities: "15 nhà máy trên toàn cầu",
      employees: "5.000 nhân viên",
      capacity: "Phục vụ hơn 120 quốc gia và 100 triệu hộ gia đình trên toàn thế giới",
    },
    highlights: [
      "Khoảng 50% hộ gia đình Tây Ban Nha sử dụng sản phẩm Teka",
      "Danh mục 3 thương hiệu: Teka (1924), Küppersbusch (1875), Intra (1871)",
      "Küppersbusch đã đoạt nhiều giải Red Dot, IF Design và ADEX Platinum Excellence",
      "Küppersbusch là thành viên sáng lập của German Design Council (2016)",
    ],
    website: "https://www.teka.com/zh-cn/guanyuwomen/teka-pinpai/",
    products: TEKA_PRODUCTS,
  },

  // ─── 🏠 Home & Garden (elevators count as residential infrastructure) ──────────────────
  {
    slug: "toshiba-elevator",
    name: "Toshiba Elevator",
    nameOriginal: "东芝电梯 Toshiba Elevator (China)",
    category: "home-garden",
    cvsStt: 12,
    logo: "/img/logos/toshiba-elevator.png",
    introduction:
      "Toshiba Elevator (China) là nhánh Trung Quốc của Tập đoàn Toshiba Nhật Bản, tập trung vào các giải pháp thang máy cao cấp xây dựng trên nền công nghệ Nhật Bản tiên tiến. Năm 2024, Toshiba Elevator nằm trong top 7 nhà sản xuất thang máy hàng đầu thế giới, nổi tiếng với công nghệ dẫn hướng từ trường (magnetic-levitation), thang máy hai tầng cabin và các kỷ lục thang máy tốc độ cao.",
    factory: {
      location: "Trụ sở chính: Thượng Hải, Trung Quốc",
      facilities: "Nhà máy sản xuất tại Thẩm Dương và Tô Châu",
    },
    highlights: [
      "Hotline kỹ thuật toàn quốc: 400-700-5680",
      "Top 7 nhà sản xuất thang máy toàn cầu (2024)",
      "12 công nghệ cốt lõi: tốc độ siêu cao, điều khiển nhóm theo tầng đích FLOORNAVI, quản lý nhóm thang máy bằng AI, thiết kế BIM, guốc dẫn hướng từ trường và nhiều hơn nữa",
      "Dự án tiêu biểu gần đây: Bệnh viện CT Nội Mông, Sơn Tây Lộ An Hoa Đô giai đoạn 5 (67 thang)",
    ],
    hotline: "400-700-5680",
    website: "https://www.toshiba-elevator.com.cn/",
    products: TOSHIBA_ELEVATOR_PRODUCTS,
  },
  {
    slug: "guangri",
    name: "Guangri Elevator",
    nameOriginal: "广日电梯 Guangri",
    category: "home-garden",
    cvsStt: 13,
    logo: "https://www.guangri.com.cn/cn/images/logo.png",
    introduction:
      "Guangri Elevator là công ty niêm yết và là công ty con chủ chốt của Guangzhou Industrial Investment Holding Group (Fortune Global 500). Thành lập năm 1956 và sản xuất thang máy chở hàng từ năm 1973, Guangri đã tích lũy hơn 50 năm kinh nghiệm và phát triển thành doanh nghiệp hiện đại tích hợp R&D, sản xuất, lắp đặt và bảo trì.",
    founded: "1956",
    factory: {
      location: "Số 636 Đại lộ Quốc Mậu Nam, thị trấn Thạch Lâu, quận Phiên Ngung, Quảng Châu",
      facilities: "Sản xuất chính tại Quảng Châu, cùng các cơ sở phụ trợ trên toàn quốc",
    },
    highlights: [
      "Hotline kỹ thuật: 400-8866-130",
      "Email: grdt@guangri.com.cn",
      "Công ty mẹ nằm trong Fortune Global 500",
      "Hơn 50 năm kinh nghiệm sản xuất thang máy",
      "Giải pháp toàn diện: R&D, thiết kế, sản xuất, lắp đặt, bảo trì, đào tạo",
    ],
    hotline: "400-8866-130",
    website: "https://guangri.com.cn/",
    products: GUANGRI_PRODUCTS,
  },

  // ─── 🪟 Doors & Windows (smart locks) ──────────────────────────────
  {
    slug: "teeho",
    name: "TEEHO",
    nameOriginal: "TEEHO",
    category: "doors-windows",
    cvsStt: 18,
    logo: "https://www.teeho.com/cdn/shop/files/20220414170928_dab500c7-794d-410b-80a0-54b76e9eb97b.png?v=1678261396&width=240",
    introduction:
      "TEEHO là thương hiệu khóa thông minh bán chạy trên Amazon Mỹ, tập trung vào thiết kế và sản xuất khóa vân tay, khóa bàn phím và khóa Wi-Fi. Sản phẩm kết hợp công nghệ hiện đại với trải nghiệm người dùng thân thiện, phục vụ thị trường nhà ở, khách sạn và lưu trú ngắn ngày Airbnb tại Bắc Mỹ.",
    factory: {
      location: "Nhà máy sản xuất tại Quảng Đông, Trung Quốc",
    },
    highlights: [
      "Bán chạy trong nhóm khóa thông minh trên Amazon Mỹ",
      "Toàn bộ sản phẩm đạt chuẩn IP54 (chống bụi và bắn nước) hoặc IP55",
      "4 pin AA dùng được 1 năm, không phải sạc lại thường xuyên",
      "Nhiệt độ hoạt động: -30°C đến 70°C (phù hợp khí hậu Việt Nam)",
      "Chính sách đổi trả trong 30 ngày và hỗ trợ khách hàng 24/7",
    ],
    website: "https://www.teeho.com/",
    products: TEEHO_PRODUCTS,
  },

  // ─── 🚿 Bathroom & Sanitary ─────────────────────────────────────────
  {
    slug: "anbi",
    name: "ANBI",
    nameOriginal: "安彼卫浴 ANBI",
    category: "bathroom-sanitary",
    cvsStt: 24,
    introduction:
      "ANBI là thương hiệu sứ vệ sinh có trụ sở tại Triều Châu, Quảng Đông —— một trong những cơ sở sản xuất sứ vệ sinh lớn nhất Trung Quốc. Thương hiệu tập trung vào bồn cầu thông minh và thiết kế không gian phòng tắm trọn gói, hướng đến trở thành thương hiệu gia dụng cho thị trường toàn quốc.",
    founded: "2021",
    factory: {
      location: "Thị trấn Cổ Hạng, quận Triều An, Triều Châu, Quảng Đông, Trung Quốc",
    },
    highlights: [
      "Hotline: 400-8308-789",
      "Khẩu hiệu thương hiệu: Thông minh cùng ANBI, an tâm tận hưởng",
      "Được vinh danh Top 10 Thương hiệu Phòng tắm Triều Châu 2024",
      "Thương hiệu được Người tiêu dùng Yêu thích 2024",
      "Được chọn vào danh mục mua sắm tiết kiệm năng lượng của chính phủ Trung Quốc",
    ],
    hotline: "400-8308-789",
    website: "https://www.anbichina.com/",
    products: ANBI_PRODUCTS,
  },
  {
    slug: "mijic",
    name: "MIJIC",
    nameOriginal: "民洁卫浴 Mijic (Guangdong Minjie)",
    category: "bathroom-sanitary",
    cvsStt: 22,
    introduction:
      "Guangdong Minjie là công ty thiết bị phòng tắm với sứ mệnh xây dựng thương hiệu quốc gia và một môi trường thế giới trong lành. Kể từ khi thành lập năm 1992, công ty luôn cam kết mang đến các giải pháp phòng tắm chất lượng cao, lấy con người làm trung tâm cho người dùng trên toàn thế giới. Năm 2002, công ty chính thức xây dựng cơ sở sản xuất gốm sứ và bước vào giai đoạn phát triển quy mô lớn; năm 2019, thương hiệu được nâng cấp toàn diện với khẩu hiệu Mijic là của thế giới; và năm 2022, công ty tiếp tục tập trung vào phòng tắm lấy con người làm trung tâm, định vị mình là chuyên gia phòng tắm thấu hiểu con người hơn. Công ty vận hành hai nhà máy gốm sứ hiện đại (một nhà máy sản xuất thông minh) và một nhà máy chuyên tùy chỉnh tủ phòng tắm, bao trùm sứ vệ sinh, tủ phòng tắm và tùy chỉnh không gian phòng tắm trọn gói, hình thành một chuỗi công nghiệp hoàn chỉnh.",
    founded: "1992",
    factory: {
      location: "Quảng Đông, Trung Quốc",
      facilities: "Hai nhà máy gốm sứ hiện đại (gồm cả sản xuất thông minh) + nhà máy tùy chỉnh tủ phòng tắm",
    },
    highlights: [
      "Thành lập năm 1992 —— hơn 30 năm chuyên môn sản xuất thiết bị phòng tắm",
      "Khẩu hiệu thương hiệu: Mijic là của thế giới",
      "Tập trung vào phòng tắm lấy con người làm trung tâm —— chuyên gia phòng tắm thấu hiểu con người hơn",
      "Dải sản phẩm đầy đủ: bồn cầu thông minh, sứ vệ sinh, tủ phòng tắm, bồn tắm, vách tắm kính, phụ kiện ngũ kim",
    ],
    website: "https://www.mijic.cn/",
    products: MIJIC_PRODUCTS,
  },

  // ─── 🧱 Building Materials ──────────────────────────────────────────
  {
    slug: "dulux-pro",
    name: "Dulux Professional",
    nameOriginal: "Dulux Pro / AkzoNobel",
    category: "construction-materials",
    cvsStt: 34,
    logo: "https://www.duluxpro.com.cn/wp-content/uploads/2024/05/logo-1.png",
    introduction:
      "Dulux Professional là dòng sản phẩm sơn chuyên nghiệp của tập đoàn AkzoNobel (Hà Lan, thành lập năm 1792 với hơn 230 năm lịch sử). Tập đoàn sở hữu các thương hiệu sơn nổi tiếng toàn cầu như Dulux, International, Sikkens và Interpon, hoạt động tại hơn 150 quốc gia và có 34.000 nhân viên.",
    founded: "1792 (AkzoNobel)",
    factory: {
      location: "Trụ sở chính AkzoNobel: Amsterdam, Hà Lan",
      facilities: "Sản xuất tại hơn 150 quốc gia",
      employees: "Khoảng 34.000 trên toàn cầu",
    },
    highlights: [
      "Tập đoàn sơn lâu đời nhất thế giới —— hơn 230 năm",
      "Danh mục đa thương hiệu: Dulux, International, Sikkens, Interpon",
      "Định vị là đối tác giải pháp chuyên nghiệp —— giải pháp trọn gói, dịch vụ công nghệ và màu sắc cho B2B",
      "Khách hàng lớn tại Trung Quốc: Vanke, Longfor, China Resources, Country Garden, China Merchants Shekou, Yuexiu Property",
    ],
    website: "https://www.duluxpro.com.cn/",
    products: DULUX_PRO_PRODUCTS,
  },
  {
    slug: "yuhong",
    name: "Yuhong",
    nameOriginal: "东方雨虹 Oriental Yuhong",
    category: "construction-materials",
    cvsStt: 36,
    logo: "https://www.yuhong.com.cn/thems/dfyhjt/images/f_logo_03.png",
    introduction:
      "Oriental Yuhong là tập đoàn hàng đầu Trung Quốc trong lĩnh vực chống thấm, cách nhiệt và sơn xây dựng dân dụng, niêm yết trên Sàn Giao dịch Chứng khoán Thâm Quyến với mã 002271. Doanh thu năm 2023 đạt khoảng 32,8 tỷ RMB, với 1.916 bằng sáng chế và 68 cơ sở sản xuất, R&D và logistics (3 trong số đó ở nước ngoài).",
    founded: "1995",
    listed: "SZSE 002271",
    factory: {
      location: "Trụ sở chính: Bắc Kinh, Trung Quốc",
      facilities: "68 cơ sở (sản xuất, R&D, logistics, gồm 3 cơ sở ở nước ngoài)",
      capacity: "Màng chống thấm 1,5 tỷ m²/năm · sơn chống thấm 5 triệu tấn/năm · vữa hơn 20 triệu tấn/năm · vật liệu cách nhiệt hơn 10 triệu m³/năm",
    },
    highlights: [
      "Niêm yết trên SZSE —— mã 002271",
      "Doanh thu 2023: khoảng 32,8 tỷ RMB, lợi nhuận ròng khoảng 2,27 tỷ RMB",
      "1.916 bằng sáng chế (toàn tập đoàn)",
      "Vận hành một Phòng thí nghiệm Trọng điểm Quốc gia về vật liệu chống thấm tiên tiến",
      "Cung cấp chống thấm cho Tổ Chim, Khối Nước (Olympic Bắc Kinh 2008) và Nhà hát Lớn Quốc gia",
      "Hotline theo dòng sản phẩm: công trình 400-779-1975 / dân dụng 400-700-5756 / sửa chữa 400-995-8686 / vữa 400-685-0885",
    ],
    website: "https://www.yuhong.com.cn/",
    products: YUHONG_PRODUCTS,
  },
  {
    slug: "langhui",
    name: "Langhui",
    nameOriginal: "朗辉建材 Langhui",
    category: "construction-materials",
    cvsStt: 42,
    logo: "https://gdlanghui.com/template/default/images/logo.png",
    introduction:
      "Langhui (Guangdong Langhui Building Materials) là nhà sản xuất chuyên về tấm bê tông khí chưng áp ALC/AAC có trụ sở tại Quảng Đông, Trung Quốc. Khu sản xuất rộng 246 mẫu (khoảng 166 hecta), với mức đầu tư khoảng 4,2 tỷ RMB, vận hành hơn 120 bộ thiết bị tự động hóa cao với công suất hàng năm trên 1 triệu mét khối.",
    factory: {
      location: "Số 133-8 đường Minh Bá, Khu công nghiệp Cao Minh, Phật Sơn, Quảng Đông",
      area: "246 mẫu (khoảng 166 hecta)",
      capacity: "Hơn 1 triệu m³/năm",
      facilities: "Hơn 120 bộ thiết bị tự động hóa",
      investment: "Khoảng 4,2 tỷ RMB",
    },
    highlights: [
      "Hotline bán hàng: 133-1632-2103 / email: salesem@gdlanghui.com",
      "Sản phẩm tường chống cháy với khả năng chịu lửa trên 4 giờ",
      "Tấm siêu mỏng 50/75mm xuất khẩu sang Úc, Nhật Bản và Hàn Quốc",
      "Dự án tiêu biểu: Longfor Properties, Agile Xiyuefu",
    ],
    hotline: "133-1632-2103",
    website: "https://gdlanghui.com/",
    products: LANGHUI_PRODUCTS,
  },
  {
    slug: "duc-thinh-stone",
    name: "Duc Thinh Stone",
    nameOriginal: "德盛 Duc Thinh Stone Technology Co., Ltd.",
    category: "construction-materials",
    cvsStt: 44,
    logo:
      "https://ducthinhstone.com/wp-content/uploads/2025/06/z7153273983391_4d3bb7ae8fc09b583a866595e847744c.jpg",
    introduction:
      "Duc Thinh Stone Technology là công ty pháp nhân tại Việt Nam của Tập đoàn Pengxiang (Phúc Kiến, Trung Quốc) —— Pengxiang là một trong những nhà sản xuất đá nhân tạo cao cấp hàng đầu châu Á. Nhà máy đặt tại Khu công nghiệp Nghĩa Đàn, tỉnh Nghệ An, Việt Nam, với mức đầu tư 25 triệu USD, khoảng 800-1.000 nhân viên và sản lượng hàng năm 8,5 triệu m² tấm đá. Sản phẩm phục vụ thị trường nội địa Việt Nam và xuất khẩu sang hơn 120 quốc gia.",
    factory: {
      location: "Xã Nghĩa Thọ, Khu công nghiệp Nghĩa Đàn, Nghệ An, Việt Nam",
      area: "400.000 m² (khoảng 40 hecta)",
      employees: "Khoảng 800–1.000 người",
      capacity: "8,5 triệu m² tấm đá/năm",
      investment: "25 triệu USD",
    },
    highlights: [
      "Công ty pháp nhân tại Việt Nam —— sản xuất ngay tại Việt Nam, logistics thuận tiện",
      "Hotline: (+84) 238-863-9666 / email: office@ducthinhstone.com",
      "Công ty mẹ Tập đoàn Pengxiang (Phúc Kiến, Trung Quốc) —— nhà sản xuất đá nhân tạo hàng đầu châu Á",
      "Xuất khẩu sang hơn 120 quốc gia",
      "Ứng dụng: mặt bàn bếp, tủ phòng tắm, ốp tường, cầu thang, nội thất gia đình cao cấp, trung tâm thương mại, khách sạn",
    ],
    hotline: "(+84) 238-863-9666",
    website: "https://ducthinhstone.com/",
    products: DUC_THINH_STONE_PRODUCTS,
  },

  // ─── 💡 Lighting (added —— Phase 5+ batch) ──────────────────
  {
    slug: "fsl",
    name: "FSL",
    nameOriginal: "佛山照明 Foshan Lighting (FSL)",
    category: "lighting",
    cvsStt: 16,
    logo: "/img/logos/fsl.png",
    introduction:
      "Foshan Lighting (FSL) là một trong những công ty chiếu sáng lâu đời nhất Trung Quốc, thành lập năm 1958. Công ty hiện sở hữu chuỗi công nghiệp LED hoàn chỉnh —— từ chip thượng nguồn, đến đóng gói LED trung nguồn, tới ứng dụng đèn LED hạ nguồn. FSL tiếp tục mở rộng sang các lĩnh vực mới như chiếu sáng thông minh, sức khỏe, hàng hải, hàng không, thể thao, nông nghiệp và nuôi trồng thủy sản.",
    founded: "1958",
    factory: {
      location: "Trụ sở chính: Phật Sơn, Quảng Đông, Trung Quốc",
      facilities: "Chuỗi công nghiệp LED hoàn chỉnh: chip + đóng gói + ứng dụng",
    },
    highlights: [
      "Công ty chiếu sáng niêm yết đầu tiên của Trung Quốc —— được công nhận là Thương hiệu Lâu đời Trung Quốc",
      "Chuỗi công nghiệp LED hoàn chỉnh tự chủ (chip → đóng gói → ứng dụng)",
      "3 mảng kinh doanh cốt lõi: chiếu sáng dân dụng, kỹ thuật điện, chiếu sáng ô tô",
      "Mở rộng sang chiếu sáng thông minh, y tế, hàng hải, hàng không và thể thao",
    ],
    website: "https://www.chinafsl.com/",
    products: FSL_PRODUCTS,
  },
  {
    slug: "care-lighting",
    name: "CareLighting",
    nameOriginal: "开尔照明 Zhejiang Xuguang Electronic",
    category: "lighting",
    cvsStt: 14,
    logo: "/img/logos/care-lighting.png",
    introduction:
      "CareLighting thuộc Zhejiang Xuguang Electronic Co., Ltd. —— nhà cung cấp giải pháp ứng dụng đèn LED tích hợp R&D + sản xuất + bán hàng + dịch vụ. Công ty niêm yết trên sàn NEEQ (New Third Board) năm 2016 với mã 839762, được vinh danh Top 10 Thương hiệu LED Trung Quốc, và là đơn vị soạn thảo tiêu chuẩn quốc gia về an toàn cho đèn LED tự chấn lưu trên 50V.",
    founded: "1995 (thương hiệu CareLighting)",
    listed: "NEEQ 839762",
    factory: {
      location: "Trụ sở chính: Chiết Giang, Trung Quốc",
      facilities: "Cơ sở sản xuất tại Chiết Giang, mạng lưới phân phối trải khắp 26 tỉnh/thành",
    },
    highlights: [
      "Niêm yết trên sàn NEEQ (New Third Board) —— mã 839762 (2016)",
      "Một trong Top 10 Thương hiệu LED Trung Quốc",
      "Đơn vị soạn thảo tiêu chuẩn quốc gia: yêu cầu an toàn cho đèn LED tự chấn lưu trên 50V",
      "Mạng lưới 500 cửa hàng phân phối trải khắp 26 tỉnh, thành phố trực thuộc và khu tự trị",
    ],
    website: "http://www.care-china.cn/",
    products: CARE_LIGHTING_PRODUCTS,
  },

  // ─── 🍳 Kitchen Equipment (2 new brands) ─────────────────────────
  {
    slug: "daweier",
    name: "Daweier",
    nameOriginal: "开平达威尔厨卫 Kaiping Daweier",
    category: "kitchen-equipment",
    cvsStt: 27,
    logo: "/img/logos/daweier.png",
    introduction:
      "Kaiping Daweier là liên doanh Trung-Mỹ chuyên về bồn rửa inox cao cấp + vòi nước + thoát sàn inox + phụ kiện nhà bếp và phòng tắm. Tích hợp thiết kế + R&D + sản xuất + tiếp thị + dịch vụ, Daweier là đơn vị dẫn đầu thị trường bồn rửa Trung Quốc và đạt chứng nhận ISO 9001 cùng UPC từ sớm.",
    factory: {
      location: "Thị trấn Thủy Khẩu, Khai Bình, Quảng Đông, Trung Quốc",
      facilities: "Nhà máy hiện đại hơn 60.000 m² tại Khai Bình —— Vương quốc Phòng tắm của Trung Quốc",
    },
    highlights: [
      "Liên doanh Trung-Mỹ, thành lập năm 1998 —— hơn 25 năm chuyên môn",
      "Đạt chứng nhận ISO 9001 (chất lượng) + UPC (chứng nhận sản phẩm uPVC của Mỹ) từ sớm",
      "Đơn vị dẫn đầu thị trường bồn rửa inox Trung Quốc",
      "Sản phẩm xuất khẩu sang hơn 30 quốc gia và vùng lãnh thổ",
    ],
    website: "http://www.daweier.com/",
    products: DAWEIER_PRODUCTS,
  },
  {
    slug: "dongyuan",
    name: "Dongyuan",
    nameOriginal: "东原厨具 GuangDong DongYuan Kitchenware",
    category: "kitchen-equipment",
    cvsStt: 28,
    logo: "/img/logos/dongyuan.png",
    introduction:
      "Dongyuan Kitchenware là doanh nghiệp hiện đại có trụ sở tại Khu Thuận Đức, Phật Sơn —— một trong những cụm công nghiệp sản xuất lớn nhất Trung Quốc. Thành lập năm 1993, công ty tích hợp R&D + sản xuất + bán hàng và tập trung vào bồn rửa inox, dụng cụ nhà bếp + sản phẩm ngũ kim. Sản lượng hàng năm vượt 1,8 triệu sản phẩm, xuất khẩu sang hơn 30 quốc gia.",
    founded: "1993",
    factory: {
      location: "Khu Thuận Đức, Phật Sơn, Quảng Đông, Trung Quốc",
      area: "Khoảng 60.000 m²",
      capacity: "Hơn 1,8 triệu sản phẩm/năm",
    },
    highlights: [
      "Hơn 30 năm chuyên môn (từ 1993) —— kinh nghiệm sâu về bồn rửa + ngũ kim nhà bếp",
      "Sản lượng hàng năm vượt 1,8 triệu sản phẩm",
      "Xuất khẩu sang hơn 30 quốc gia và vùng lãnh thổ trên thế giới",
      "Cụm công nghiệp Thuận Đức —— trung tâm gia công kim loại hàng đầu Trung Quốc",
    ],
    website: "http://www.sddongyuan.com/",
    products: DONGYUAN_PRODUCTS,
  },

  // ─── 🧱 Building Materials (2 new stone + insulation panel brands) ──────────────────
  {
    slug: "pengxiang",
    name: "Pengxiang",
    nameOriginal: "福建鹏翔实业 Fujian Pengxiang Industry",
    category: "construction-materials",
    cvsStt: 43,
    logo: "/img/logos/pengxiang.png",
    introduction:
      "Fujian Pengxiang Industry là tập đoàn sản xuất đá cao cấp có trụ sở tại Phúc Kiến, Trung Quốc, và là một trong những nhà sản xuất đá nhân tạo hàng đầu châu Á. Sản phẩm chính bao gồm đá thạch anh nhân tạo, đá cẩm thạch tái tạo, terrazzo và đá thạch anh 3D. Tập đoàn cũng là công ty mẹ của Duc Thinh Stone tại Nghệ An, Việt Nam (công ty pháp nhân tại Việt Nam của họ).",
    factory: {
      location: "Phúc Kiến, Trung Quốc + nhà máy tại Khu công nghiệp Nghĩa Đàn, Nghệ An, Việt Nam (qua Duc Thinh Stone)",
      facilities: "Công nghệ sản xuất đá nhân tạo tự động hóa hoàn toàn —— đạt tiêu chuẩn quốc tế",
    },
    highlights: [
      "Một trong những nhà sản xuất đá nhân tạo lớn nhất châu Á",
      "Vận hành công ty pháp nhân tại Việt Nam (Duc Thinh Stone) ở Khu công nghiệp Nghĩa Đàn, Nghệ An, Việt Nam",
      "Đầu tư nhà máy tại Việt Nam: 25 triệu USD, công suất hàng năm 8,5 triệu m²",
      "Xuất khẩu sang hơn 120 quốc gia trên thế giới",
    ],
    website: "http://www.pengxiang.cn/",
    products: PENGXIANG_PRODUCTS,
  },
  {
    slug: "zhongju-yabai",
    name: "Zhongju Yabai",
    nameOriginal: "中居亚百建材科技 Zhongju Yabai Building Materials",
    category: "construction-materials",
    cvsStt: 38,
    logo: "/img/logos/zhongju-yabai.png",
    introduction:
      "Guangdong Zhongju Yabai Building Materials chuyên về tấm phủ sẵn vô cơ —— còn gọi là tấm băng hỏa —— một loại vật liệu hoàn thiện cao cấp cho tường ngăn và trần trong nhà lẫn ngoài trời. Sản phẩm có khả năng chống cháy, chống ẩm, chống mốc, kháng khuẩn và không phát thải formaldehyde.",
    factory: {
      location: "Quảng Đông, Trung Quốc",
      facilities: "Dây chuyền sản xuất tự động hóa hoàn toàn —— tấm phủ sẵn vô cơ",
    },
    highlights: [
      "Tấm phủ sẵn vô cơ —— chống cháy + chống ẩm + chống mốc",
      "Sản phẩm kháng khuẩn, không formaldehyde —— đạt tiêu chuẩn bệnh viện + phòng sạch",
      "Ứng dụng: tường ngăn trong và ngoài nhà, trần, tường y tế, phòng thí nghiệm",
      "Sản phẩm tấm băng hỏa —— chịu nhiệt và chịu nhiệt độ thấp",
    ],
    website: "http://www.gdzjyb.com/",
    products: ZHONGJU_YABAI_PRODUCTS,
  },

  // ─── 🏠 Furniture (1 new home elevator brand) ───────────────
  {
    slug: "linvol",
    name: "LINVOL",
    nameOriginal: "领沃 LINVOL (Midea Group)",
    category: "noi-that",
    cvsStt: 45,
    logo: "/img/logos/linvol.png",
    introduction:
      "LINVOL là thương hiệu thang máy chính thức của Tập đoàn Midea —— tập trung vào thang máy biệt thự, thang máy lắp thêm cho tòa nhà cũ, thang cuốn và thang máy chở khách. Với triết lý mỗi hành trình là một điểm đến tốt đẹp hơn, LINVOL tích hợp công nghệ số + AI xuyên suốt toàn bộ vòng đời thang máy: thiết kế → sản xuất → tùy chỉnh → R&D → vận hành → bảo trì.",
    factory: {
      location: "Khu R&D + nhà máy: Quảng Đông, Trung Quốc (khuôn viên Midea)",
      facilities: "Trung tâm R&D Thang máy Số hóa Midea + nhà máy khuôn viên Phật Sơn",
    },
    highlights: [
      "Thương hiệu thang máy chính thức của Tập đoàn Midea (Fortune Global 500)",
      "Dịch vụ concierge + chuyên gia trọn vòng đời —— bảo hành trọn đời + bảo trì",
      "Công nghệ số + AI xuyên suốt toàn bộ vòng đời thang máy",
      "4 dòng sản phẩm: biệt thự, lắp thêm, thang cuốn, thang máy chở khách",
    ],
    website: "https://linvol.midea.com.cn/home",
    products: LINVOL_PRODUCTS,
  },

  // ─── 🚪 Doors & Windows and smart locks (1 new smart lock brand) ─────
  {
    slug: "ttlock",
    name: "TTLock",
    nameOriginal: "TTLock Sciener (赛脑智能/鹿客 LOOCK)",
    category: "doors-windows",
    cvsStt: 46,
    logo: "/img/logos/ttlock.png",
    introduction:
      "TTLock (do Sciener phát triển) là nhà cung cấp giải pháp khóa thông minh hàng đầu toàn cầu —— bao gồm phần cứng PCBA tương thích mọi loại khóa cửa + nền tảng phần mềm quản lý + hệ thống tích hợp cho khách sạn, Airbnb, căn hộ dịch vụ và doanh nghiệp. Hệ sinh thái TTLock kết nối hơn 30 đối tác phần mềm Trung Quốc, phục vụ thị trường cho thuê căn hộ + quản lý bất động sản.",
    factory: {
      location: "Trụ sở R&D + sản xuất: Trung Quốc —— phân phối toàn cầu",
      facilities: "Trung tâm R&D + dây chuyền sản xuất PCBA chuyên dụng cho khóa thông minh",
    },
    highlights: [
      "Nhà cung cấp giải pháp khóa thông minh hàng đầu toàn cầu (tự công bố)",
      "PCBA tích hợp vào mọi loại khóa cửa —— nâng cấp khóa thường thành khóa thông minh",
      "Hệ sinh thái hơn 30 đối tác phần mềm phục vụ thị trường cho thuê + quản lý bất động sản",
      "Phần mềm chuyên dụng: ứng dụng TTLock, TTRenting, TTHotel Pro, TTology",
    ],
    website: "https://www.ttlock.com/",
    products: TTLOCK_PRODUCTS,
  },

  // ─── 🧱 Building Materials (2 new tile + coatings brands) ───────────────────
  {
    slug: "kito",
    name: "KITO",
    nameOriginal: "金意陶 KITO Ceramics",
    category: "construction-materials",
    cvsStt: 47,
    logo: "/img/logos/kito.png",
    introduction:
      "KITO (Guangdong KITO Ceramics Group) là nhà sản xuất hàng đầu Trung Quốc về gạch ốp lát + tấm đá nung kết —— tự định vị là người tiên phong gạch vân kết cấu tại Trung Quốc. Trụ sở vận hành đặt tại Tháp T6, Xincheng Zhihui, số 28 đường Cát Hoa, quận Thiền Thành, Phật Sơn, Quảng Đông. KITO định vị ở phân khúc tầm trung đến cao cấp, cung cấp 6 dòng gạch nghệ thuật và dịch vụ giao hàng trọn gói một cửa cho thiết kế nội thất.",
    factory: {
      location: "Phật Sơn, Quảng Đông, Trung Quốc (số 28 đường Cát Hoa, Thiền Thành —— Xincheng Zhihui T6)",
      facilities: "Cụm công nghiệp Phật Sơn —— Thủ phủ Gạch ốp lát của Trung Quốc",
    },
    highlights: [
      "Người tiên phong gạch vân kết cấu tại Trung Quốc",
      "6 dòng gạch nghệ thuật độc quyền —— định vị tầm trung đến cao cấp",
      "Giao hàng trọn gói một cửa cho thiết kế nội thất",
      "Cũng vận hành thương hiệu xuất khẩu KITO Ceramics (kitoceramics.com)",
    ],
    hotline: "4008-678-488",
    website: "https://kito.cn/",
    products: KITO_PRODUCTS,
  },
  {
    slug: "3trees",
    name: "3TREES",
    nameOriginal: "三棵树涂料股份有限公司 SKSHU Paint",
    category: "construction-materials",
    cvsStt: 48,
    logo: "/img/logos/3trees.png",
    introduction:
      "3TREES (SKSHU Paint) là tập đoàn sơn niêm yết của Trung Quốc với khẩu hiệu thương hiệu bén rễ giữa trời đất, xanh hóa thế giới. Công ty cung cấp hệ sản phẩm trang trí gia đình hoàn chỉnh (sơn tường nội thất + sơn nghệ thuật + tấm ốp Little Forest) và hệ sản phẩm công trình (sơn chống thấm + sơn công nghiệp). 3TREES đã ra mắt dịch vụ Move In Now —— gói trang trí và thi công nhà ở giao nhanh.",
    listed: "SSE 603737 (reference)",
    factory: {
      location: "Trụ sở chính: Bồ Điền, Phúc Kiến, Trung Quốc",
      facilities: "Tập đoàn niêm yết trên SSE —— hệ thống cụm sản xuất sơn quy mô lớn",
    },
    highlights: [
      "Tập đoàn sơn niêm yết lớn của Trung Quốc —— mã chứng khoán SSE 603737",
      "Dịch vụ một cửa Move In Now —— giao thi công sơn nhanh",
      "Hệ sản phẩm hoàn chỉnh: trang trí gia đình + công trình + công nghiệp + chống thấm",
      "Khẩu hiệu thương hiệu: bén rễ giữa trời đất, xanh hóa thế giới",
    ],
    website: "http://www.skshu.com.cn/",
    products: TREES_PRODUCTS,
  },

  // ─── 🚿 Bathroom & Sanitary (1 new German premium brand) ───────────
  {
    slug: "bravat",
    name: "BRAVAT",
    nameOriginal: "贝朗 BRAVAT (Dietsche Group, Germany)",
    category: "bathroom-sanitary",
    cvsStt: 49,
    logo: "/img/logos/bravat.png",
    logoBg: "dark",
    introduction:
      "BRAVAT là thương hiệu thiết bị phòng tắm cao cấp thuộc Tập đoàn Dietsche —— một tập đoàn thiết bị phòng tắm của Đức với hơn một thế kỷ lịch sử. Định vị quanh ý niệm cuộc sống thực sự bắt đầu từ đây, BRAVAT cung cấp giải pháp phòng tắm trọn gói: sản phẩm thông minh + ngũ kim + bồn cầu + nội thất phòng tắm + chậu rửa + bồn tắm + vách tắm kính + phụ kiện. Thương hiệu phục vụ các thị trường toàn cầu (Đức, Hoa Kỳ, Trung Quốc, Brazil, Úc, Singapore, Việt Nam, Nga, Mexico).",
    factory: {
      location: "Trụ sở Trung Quốc: BRAVAT China",
      facilities: "Nhà máy + R&D tại Trung Quốc —— một phần trong hệ thống toàn cầu của Dietsche",
    },
    highlights: [
      "Công ty mẹ Dietsche —— tập đoàn thiết bị phòng tắm của Đức với hơn một thế kỷ lịch sử",
      "Hệ sản phẩm hoàn chỉnh: 8 dòng, từ sản phẩm thông minh đến phụ kiện",
      "Dự án tiêu biểu: Marriott, Hyatt Đà Nẵng (Việt Nam), Sber City",
      "Phân phối tại hơn 10 thị trường: Đức, Hoa Kỳ, Trung Quốc, Brazil, Úc, Singapore, Việt Nam, Nga, Mexico",
    ],
    website: "https://www.bravat.com.cn/",
    products: BRAVAT_PRODUCTS,
  },

  // ─── 💡 Lighting (1 new international brand) ────────────────────────
  {
    slug: "sylvania",
    name: "Sylvania Group",
    nameOriginal: "Sylvania Group (Feilo Sylvania)",
    category: "lighting",
    cvsStt: 50,
    logo: "/img/logos/sylvania.png",
    introduction:
      "Sylvania Group (Feilo Sylvania) là tập đoàn chiếu sáng quốc tế có lịch sử từ năm 1901 và là một trong những thương hiệu chiếu sáng lâu đời, uy tín nhất thế giới. Tập đoàn hoạt động khắp châu Âu, Mỹ Latinh, châu Á và châu Phi, với danh mục sản phẩm bao trùm chiếu sáng kiến trúc, công nghiệp, bán lẻ, văn phòng và đô thị. Sau khi sáp nhập với Shanghai Feilo Acoustics Group, Sylvania gia nhập hệ sinh thái Trung Quốc - quốc tế, kết hợp công nghệ chiếu sáng phương Tây với chuỗi cung ứng Trung Quốc.",
    founded: "1901",
    factory: {
      location: "Hoạt động đa quốc gia —— trụ sở châu Âu + nhà máy Trung Quốc (Feilo)",
      facilities: "Mạng lưới R&D + nhà máy đa châu lục (châu Âu, châu Mỹ, châu Á)",
    },
    highlights: [
      "Thương hiệu chiếu sáng quốc tế có lịch sử từ năm 1901 —— hơn 120 năm lịch sử",
      "Hoạt động xuyên châu lục: châu Âu + châu Mỹ + châu Á + châu Phi",
      "Danh mục sản phẩm bao trùm: kiến trúc, công nghiệp, bán lẻ, văn phòng, đô thị",
      "Một phần của tập đoàn Feilo Sylvania —— kết hợp công nghệ phương Tây + chuỗi cung ứng Trung Quốc",
    ],
    website: "https://www.sylvania-group.com/",
    products: SYLVANIA_PRODUCTS,
  },
];

/** Query helper: group partners by main category. */
export function partnersByCategory(slug: PartnerBrand["category"]): PartnerBrand[] {
  return PARTNERS.filter((p) => p.category === slug);
}

/** Query helper: get a single partner by slug. */
export function getPartner(slug: string): PartnerBrand | undefined {
  return PARTNERS.find((p) => p.slug === slug);
}

/** Slug for a single product —— prefers the `slug` field, falls back to model.toLowerCase(). */
export function productSlug(p: PartnerProduct): string {
  return (p.slug ?? p.model).toLowerCase();
}

/** Query helper: get a single product by (partnerSlug, productSlug). */
export function getProduct(
  partnerSlug: string,
  prodSlug: string
): { partner: PartnerBrand; product: PartnerProduct } | undefined {
  const partner = getPartner(partnerSlug);
  if (!partner) return undefined;
  const product = partner.products.find(
    (p) => productSlug(p) === prodSlug.toLowerCase()
  );
  if (!product) return undefined;
  return { partner, product };
}
