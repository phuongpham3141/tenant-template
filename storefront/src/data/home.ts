export type Badge = "new" | "gold" | "deal" | "oem" | "top";

export type Product = {
  id: string;
  title: string;
  price: string;
  unit: string;
  moq: string;
  rating: number;
  seller: string;
  years: string;
  badges?: Badge[];
  image?: string;
  tags?: string[];
};

export type Section = {
  id: string;
  num: number;
  title: string;
  cn: string;
  tabs: string[];
  totalCount: string;
  categorySlug: string;
  featureSlug: string;
  feature: {
    badge: string;
    title: string;
    desc: string;
    cta: string;
    image?: string;
  };
  products: Product[];
};

export type Factory = {
  initials: string;
  slug: string;
  name: string;
  location: string;
  rating: number;
  reviews: string;
  meta: string;
  badges: { gold?: boolean; audited?: boolean; years: string };
  tags: string[];
  /** Made-in-China VR comId — nếu có, hiển thị tour 360° trong tab Tour VR. */
  vr360ComId?: string;
};

export type Zone = {
  slug: string;
  name: string;
  count: string;
  image?: string;
};

export const HOT_SEARCHES = [
  "gạch porcelain",
  "bộ sofa",
  "bồn cầu thông minh",
  "đèn thả LED",
  "tủ bếp",
  "đá marble tấm lớn",
];

export const NAV_CATEGORIES = [
  { icon: "🏠", name: "Nhà & Sân vườn", slug: "home-garden" },
  { icon: "🧱", name: "Vật liệu xây dựng", slug: "construction-materials" },
  { icon: "🚿", name: "Phòng tắm & Vệ sinh", slug: "bathroom-sanitary" },
  { icon: "🛋", name: "Nội thất", slug: "noi-that", isNew: true },
  { icon: "🍳", name: "Thiết bị nhà bếp", slug: "kitchen-equipment" },
  { icon: "💡", name: "Đèn & Chiếu sáng", slug: "lighting" },
  { icon: "🪟", name: "Cửa & Cửa sổ", slug: "doors-windows" },
  { icon: "🛏", name: "Đồ dùng khách sạn", slug: "hotel-supplies" },
  { icon: "🔨", name: "Phụ kiện & Dụng cụ", slug: "hardware-tools" },
  { icon: "🎨", name: "Trang trí", slug: "decoration" },
  { icon: "🌿", name: "Ngoài trời & Sân vườn", slug: "outdoor-garden" },
  { icon: "⚡", name: "Điện & Thiết bị điện", slug: "electrical" },
];

export const STATS = [
  { value: "2.400+", label: "SKU đang bán" },
  { value: "40+", label: "Nhà máy đã thẩm định" },
  { value: "<24h", label: "Thời gian báo giá" },
  { value: "600+", label: "Đại lý VN" },
  { value: "12 năm", label: "Lịch sử giao dịch" },
];

export const SECTIONS: Section[] = [
  {
    id: "ceramic",
    num: 1,
    title: "Gạch & Đá ốp lát",
    cn: "建材",
    tabs: ["Tất cả", "Gạch lát sàn", "Gạch ốp tường", "Gạch porcelain", "Đá marble tấm", "Gạch mosaic"],
    totalCount: "1.200",
    categorySlug: "construction-materials",
    featureSlug: "dongpeng-ceramics",
    feature: {
      badge: "NỔI BẬT",
      title: "Dongpeng Porcelain cao cấp",
      desc: "Bộ sưu tập chủ lực · Dòng Calacatta · 600×1200mm · Hạng A",
      cta: "Xem bộ sưu tập →",
      image: "/img/marble1.jpg?v=2",
    },
    products: [
      { id: "ceramic-1", title: "Gạch Porcelain vân đá Calacatta trắng 600×1200", price: "$8.50", unit: "/m²", moq: "MOQ: 100 m²", rating: 4.9, seller: "Dongpeng Ceramics", years: "12 năm", badges: ["top"], image: "/img/cer1.jpg?v=2", tags: ["Gạch porcelain", "Gạch lát sàn", "Đá marble tấm"] },
      { id: "ceramic-2", title: "Tấm đá marble Nero Marquina đen 1600×3200mm", price: "$42", unit: "/m²", moq: "MOQ: 50 m²", rating: 4.8, seller: "NABEL Stone Group", years: "10 năm", badges: ["new"], image: "/img/cer2.jpg?v=2", tags: ["Đá marble tấm", "Gạch ốp tường"] },
      { id: "ceramic-3", title: "Gạch lát sàn vân đá Travertine rustic 800×800", price: "$6.80", unit: "/m²", moq: "MOQ: 200 m²", rating: 4.7, seller: "Monalisa Ceramic", years: "10 năm", badges: ["deal"], image: "/img/cer3.jpg?v=2", tags: ["Gạch lát sàn", "Gạch porcelain"] },
      { id: "ceramic-4", title: "Gạch mosaic ốp tường Hexagon Terracotta vintage 200×230mm", price: "$12", unit: "/m²", moq: "MOQ: 50 m²", rating: 4.9, seller: "Xinzhongyuan Ceramic", years: "8 năm", image: "/img/cer4.jpg?v=2", tags: ["Gạch mosaic", "Gạch ốp tường"] },
      { id: "ceramic-5", title: "Tấm Porcelain marble xám honed finish 1200×2400mm", price: "$18", unit: "/m²", moq: "MOQ: 80 m²", rating: 5.0, seller: "Guanzhu Ceramic", years: "15 năm", badges: ["top"], image: "/img/cer5.jpg?v=2", tags: ["Gạch porcelain", "Đá marble tấm", "Gạch ốp tường", "Gạch lát sàn"] },
      { id: "ceramic-6", title: "Tấm ốp tường acoustic vân gỗ 3D trang trí 2400×600", price: "$15", unit: "/m²", moq: "MOQ: 100 m²", rating: 4.7, seller: "Foshan Hanse Industrial", years: "6 năm", badges: ["new"], image: "/img/cer6.jpg?v=2", tags: ["Gạch ốp tường"] },
      { id: "ceramic-7", title: "Sàn SPC vinyl click vân xương cá 1900×190×6mm", price: "$7.20", unit: "/m²", moq: "MOQ: 500 m²", rating: 4.8, seller: "Longda Flooring Co.", years: "9 năm", image: "/img/cer7.jpg?v=2", tags: ["Gạch lát sàn"] },
      { id: "ceramic-8", title: "Sàn gỗ kỹ thuật sồi Châu Âu UV finish hạng AB", price: "$22", unit: "/m²", moq: "MOQ: 300 m²", rating: 4.9, seller: "Jinjiang Wood House", years: "11 năm", badges: ["deal"], image: "/img/cer8.jpg?v=2", tags: ["Gạch lát sàn"] },
    ],
  },
  {
    id: "furniture",
    num: 2,
    title: "Nội thất & Đồ gia dụng",
    cn: "家具",
    tabs: ["Tất cả", "Phòng khách", "Phòng ngủ", "Phòng ăn", "Văn phòng", "Khách sạn"],
    totalCount: "480",
    categorySlug: "noi-that",
    featureSlug: "kuka-home",
    feature: {
      badge: "BÁN CHẠY",
      title: "Bộ sưu tập sofa KUKA",
      desc: "Sofa góc dạng module · Nhung Ý · 10 lựa chọn màu · Hỗ trợ OEM",
      cta: "Yêu cầu catalog →",
      image: "/img/sofa1.jpg?v=2",
    },
    products: [
      { id: "furniture-1", title: "Sofa góc chữ L 6 chỗ ngồi bọc nhung", price: "$420", unit: "/bộ", moq: "MOQ: 10 bộ", rating: 4.9, seller: "KUKA Home", years: "9 năm", badges: ["top"], image: "/img/fur1.jpg?v=2", tags: ["Phòng khách"] },
      { id: "furniture-2", title: "Sofa thư giãn da điện 3 chỗ hiện đại có cổng USB", price: "$680", unit: "/bộ", moq: "MOQ: 5 bộ", rating: 4.8, seller: "Foshan ZuoYou", years: "8 năm", image: "/img/fur2.jpg?v=2", tags: ["Phòng khách"] },
      { id: "furniture-3", title: "Giường gỗ óc chó king size 1800×2000mm tiêu chuẩn khách sạn", price: "$380", unit: "/cái", moq: "MOQ: 5 cái", rating: 4.9, seller: "Landbond Furniture", years: "14 năm", badges: ["new"], image: "/img/fur3.jpg?v=2", tags: ["Phòng ngủ", "Khách sạn"] },
      { id: "furniture-4", title: "Bộ bàn ăn Bắc Âu 6 chỗ mặt đá marble chân inox", price: "$280", unit: "/bộ", moq: "MOQ: 10 bộ", rating: 4.8, seller: "Dongguan Yijia Element", years: "7 năm", badges: ["oem"], image: "/img/fur4.jpg?v=2", tags: ["Phòng ăn"] },
      { id: "furniture-5", title: "Ghế giám đốc da công thái học lưng cao có tựa đầu", price: "$95", unit: "/cái", moq: "MOQ: 20 cái", rating: 4.7, seller: "Anji Chair Group", years: "11 năm", badges: ["top"], image: "/img/fur5.jpg?v=2", tags: ["Văn phòng"] },
      { id: "furniture-6", title: "Bộ nội thất phòng ngủ khách sạn 5 sao 4 món", price: "$1,450", unit: "/bộ", moq: "MOQ: 10 bộ", rating: 5.0, seller: "Foshan EMT Jufu", years: "13 năm", image: "/img/fur6.jpg?v=2", tags: ["Phòng ngủ", "Khách sạn"] },
      { id: "furniture-7", title: "Tủ bếp module OPPEIN acrylic bóng tùy chỉnh", price: "$210", unit: "/m", moq: "MOQ: 1 bộ", rating: 4.9, seller: "OPPEIN Home", years: "15 năm", badges: ["deal"], image: "/img/fur7.jpg?v=2", tags: ["Phòng ăn"] },
      { id: "furniture-8", title: "Tủ quần áo cửa trượt 4 cánh MDF melamine hiện đại", price: "$340", unit: "/cái", moq: "MOQ: 10 cái", rating: 4.8, seller: "Suofeiya Home", years: "12 năm", image: "/img/fur8.jpg?v=2", tags: ["Phòng ngủ"] },
    ],
  },
  {
    id: "bathroom",
    num: 3,
    title: "Phòng tắm & Vệ sinh",
    cn: "卫浴",
    tabs: ["Tất cả", "Bồn cầu", "Lavabo", "Vòi", "Sen tắm", "Bồn tắm"],
    totalCount: "340",
    categorySlug: "bathroom-sanitary",
    featureSlug: "ortonbaths-group",
    feature: {
      badge: "CÔNG NGHỆ THÔNG MINH",
      title: "Bồn cầu thông minh Ortonbaths",
      desc: "Tự xả · Màn hình LED · Cảm biến chân · Tiêu chuẩn khách sạn 5 sao",
      cta: "Xem Dongpeng & Ortonbaths →",
      image: "/img/toilet1.jpg?v=2",
    },
    products: [
      { id: "bathroom-1", title: "Bồn cầu thông minh tự xả màn hình LED tích hợp bidet liền khối", price: "$180", unit: "/cái", moq: "MOQ: 50 cái", rating: 4.9, seller: "Ortonbaths Group", years: "7 năm", badges: ["top"], image: "/img/bat1.jpg?v=2", tags: ["Bồn cầu"] },
      { id: "bathroom-2", title: "Lavabo đá Onyx tự nhiên 600×420mm đánh bóng", price: "$95", unit: "/cái", moq: "MOQ: 20 cái", rating: 4.8, seller: "Foshan GuCi Industry", years: "9 năm", image: "/img/bat2.jpg?v=2", tags: ["Lavabo"] },
      { id: "bathroom-3", title: "Vòi trộn đồng vàng brushed tay đơn cần 35cm", price: "$38", unit: "/cái", moq: "MOQ: 100 cái", rating: 4.9, seller: "Taizhou Faucet Group", years: "13 năm", badges: ["new"], image: "/img/bat3.jpg?v=2", tags: ["Vòi"] },
      { id: "bathroom-4", title: "Bộ sen mưa âm tường ổn nhiệt đầu sen 30×30cm", price: "$85", unit: "/bộ", moq: "MOQ: 30 bộ", rating: 4.7, seller: "Guangdong Difan K&B", years: "10 năm", image: "/img/bat4.jpg?v=2", tags: ["Sen tắm", "Vòi"] },
      { id: "bathroom-5", title: "Tủ lavabo phòng tắm 2 chậu 1800mm gỗ tự nhiên", price: "$520", unit: "/bộ", moq: "MOQ: 5 bộ", rating: 4.8, seller: "Shenzhen Sanitary", years: "8 năm", badges: ["deal"], image: "/img/bat5.jpg?v=2", tags: ["Lavabo"] },
      { id: "bathroom-6", title: "Bồn tắm acrylic độc lập hình oval 1700mm đen mờ", price: "$320", unit: "/cái", moq: "MOQ: 10 cái", rating: 4.9, seller: "Dongpeng Sanitary", years: "12 năm", badges: ["top"], image: "/img/bat6.jpg?v=2", tags: ["Bồn tắm"] },
      { id: "bathroom-7", title: "Phòng tắm kính walk-in 1200×900×2000mm không khung", price: "$240", unit: "/bộ", moq: "MOQ: 10 bộ", rating: 4.7, seller: "Foshan Orient Bath", years: "6 năm", image: "/img/bat7.jpg?v=2", tags: ["Sen tắm", "Bồn tắm"] },
      { id: "bathroom-8", title: "Gương tròn LED chống mờ cảm ứng phòng tắm 800mm", price: "$58", unit: "/cái", moq: "MOQ: 50 cái", rating: 4.8, seller: "Orton Group", years: "7 năm", badges: ["oem"], image: "/img/bat8.jpg?v=2", tags: ["Lavabo"] },
    ],
  },
];

export const FACTORIES: Factory[] = [
  { initials: "DP", slug: "dongpeng-ceramics", name: "Guangdong Dongpeng Ceramics Co., Ltd.", location: "Foshan, Guangdong · CN", rating: 4.9, reviews: "2,340", meta: "50M m²/năm", badges: { gold: true, audited: true, years: "12 năm" }, tags: ["Porcelain", "Marble", "Vệ sinh"] },
  { initials: "KK", slug: "kuka-home", name: "Hangzhou KUKA Home Co., Ltd.", location: "Hangzhou, Zhejiang · CN", rating: 4.8, reviews: "1,810", meta: "6K+ cửa hàng", badges: { gold: true, audited: true, years: "9 năm" }, tags: ["Sofa", "Ghế thư giãn", "Nội thất khách sạn"] },
  { initials: "OP", slug: "oppein-home", name: "OPPEIN Home Group Inc.", location: "Guangzhou · CN", rating: 5.0, reviews: "3,120", meta: "#1 châu Á — tủ", badges: { gold: true, audited: true, years: "15 năm" }, tags: ["Tủ bếp", "Tủ quần áo", "Nội thất nguyên căn"], vr360ComId: "eKtTcaCAvhrm" },
  { initials: "MN", slug: "monalisa-group", name: "Monalisa Group Co., Ltd.", location: "Foshan, Guangdong · CN", rating: 4.9, reviews: "1,540", meta: "25M m²/năm", badges: { gold: true, audited: true, years: "10 năm" }, tags: ["Gốm sứ", "Tấm lớn", "Tấm đá"] },
  { initials: "OB", slug: "ortonbaths-group", name: "Ortonbaths Group Co., Ltd.", location: "Shenzhen · CN", rating: 4.8, reviews: "920", meta: "Phòng tắm thông minh", badges: { gold: true, audited: true, years: "7 năm" }, tags: ["Bồn cầu thông minh", "Tủ lavabo", "Vòi"] },
  { initials: "LB", slug: "landbond-furniture", name: "Landbond Furniture Group", location: "Foshan & Linyi · CN", rating: 5.0, reviews: "1,230", meta: "40 năm gỗ tự nhiên", badges: { gold: true, audited: true, years: "14 năm" }, tags: ["Gỗ tự nhiên", "Phòng ngủ", "Phòng khách"] },
  { initials: "NP", slug: "newpearl-ceramics", name: "NewPearl Ceramics Group", location: "Foshan · CN", rating: 4.7, reviews: "680", meta: "200M m²/năm", badges: { audited: true, years: "11 năm" }, tags: ["Gạch ốp tường", "Gạch lát sàn", "Vệ sinh"] },
  { initials: "ZY", slug: "zuoyou-furniture", name: "ZuoYou Furniture Co., Ltd.", location: "Shenzhen · CN", rating: 4.8, reviews: "540", meta: "Thiết kế trọng tâm", badges: { audited: true, years: "8 năm" }, tags: ["Bọc nệm", "Sofa", "Hiện đại"] },
  { initials: "RA", slug: "redapple-furniture", name: "RedApple Furniture (HK)", location: "Hong Kong · CN", rating: 4.9, reviews: "1,050", meta: "Từ năm 1981", badges: { audited: true, years: "18 năm" }, tags: ["Tùy chỉnh", "Đệm", "Khách sạn"] },
];

export const ZONES: Zone[] = [
  { slug: "foshan-ceramic", name: "Phật Sơn — Gốm sứ", count: "1.200 nhà máy", image: "/img/zone1.jpg?v=2" },
  { slug: "taizhou-faucet", name: "Đài Châu — Vòi nước", count: "480 nhà máy", image: "/img/zone2.jpg?v=2" },
  { slug: "foshan-furniture", name: "Phật Sơn — Nội thất", count: "3.000+ nhà máy", image: "/img/zone3.jpg?v=2" },
  { slug: "zhongshan-light", name: "Trung Sơn — Đèn chiếu sáng", count: "2.200 nhà máy", image: "/img/zone4.jpg?v=2" },
  { slug: "jinjiang-wood", name: "Tấn Giang — Gỗ", count: "340 nhà máy", image: "/img/zone5.jpg?v=2" },
  { slug: "chaozhou-sanitary", name: "Triều Châu — Vệ sinh", count: "520 nhà máy", image: "/img/zone6.jpg?v=2" },
];
