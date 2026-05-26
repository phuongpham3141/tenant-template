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
  "đá marble tấm lớn",
  "bộ sofa",
  "tủ bếp",
  "sàn gỗ kỹ thuật",
  "giường khách sạn",
];

export const NAV_CATEGORIES = [
  { icon: "🧱", name: "Vật liệu xây dựng", slug: "construction-materials" },
  { icon: "🛋", name: "Nội thất", slug: "noi-that" },
];

/** Hierarchical sidebar menu — 2 main groups, each with ~8 sub-items.
 *  Sub-items link to category leaf pages. Hovering opens mega panel
 *  showing the parent main cat's full sections grid. */
export const NAV_MENU = [
  {
    main: { icon: "🧱", name: "Vật liệu xây dựng", slug: "construction-materials" },
    items: [
      { name: "Thép & Kim loại", slug: "ket-cau-thep-khung" },
      { name: "Tấm ốp tường & Trần", slug: "tam-op-tuong-tran" },
      { name: "Vật liệu lát sàn", slug: "vat-lieu-lat-san" },
      { name: "Đá ốp lát & Nhân tạo", slug: "da-op-lat" },
      { name: "Sơn & Lớp phủ", slug: "son-lop-phu" },
      { name: "Cách âm & Cách nhiệt", slug: "vat-lieu-cach-am-cach-nhiet" },
      { name: "Chống thấm", slug: "vat-lieu-chong-tham" },
      { name: "Xi măng & Vữa", slug: "vat-lieu-kho-xi-mang-vua" },
    ],
  },
  {
    main: { icon: "🛋", name: "Nội thất", slug: "noi-that" },
    items: [
      { name: "Phòng khách", slug: "phong-khach" },
      { name: "Phòng ngủ", slug: "phong-ngu" },
      { name: "Phòng ăn", slug: "phong-an" },
      { name: "Tủ bếp", slug: "tu-bep" },
      { name: "Tủ quần áo", slug: "tu-quan-ao" },
      { name: "Văn phòng tại nhà", slug: "van-phong-tai-nha" },
      { name: "Nội thất khách sạn", slug: "noi-that-khach-san" },
      { name: "Trẻ em & Em bé", slug: "tre-em-em-be" },
    ],
  },
];

export const STATS = [
  { value: "960+", label: "SKU đang bán" },
  { value: "20+", label: "Nhà máy đã thẩm định" },
  { value: "<24h", label: "Thời gian báo giá" },
  { value: "300+", label: "Đại lý VN" },
  { value: "12 năm", label: "Lịch sử giao dịch" },
];

export const SECTIONS: Section[] = [
  {
    id: "ceramic",
    num: 1,
    title: "Vật liệu xây dựng",
    cn: "建材",
    tabs: ["Tất cả", "Gạch porcelain", "Đá marble tấm", "Gạch lát sàn", "Gạch ốp tường", "Sàn gỗ kỹ thuật"],
    totalCount: "480",
    categorySlug: "construction-materials",
    featureSlug: "dongpeng-ceramics",
    feature: {
      badge: "NỔI BẬT",
      title: "Dongpeng Porcelain cao cấp",
      desc: "Bộ sưu tập chủ lực · Dòng Calacatta · 600×1200mm · Hạng A",
      cta: "Xem bộ sưu tập →",
      image: "/img/marble1.jpg?v=4",
    },
    products: [
      { id: "ceramic-1", title: "Gạch Porcelain vân đá Calacatta trắng 600×1200", price: "$8.50", unit: "/m²", moq: "MOQ: 100 m²", rating: 4.9, seller: "Dongpeng Ceramics", years: "12 năm", badges: ["top"], image: "/img/cer1.jpg?v=4", tags: ["Gạch porcelain", "Gạch lát sàn", "Đá marble tấm"] },
      { id: "ceramic-2", title: "Tấm đá marble Nero Marquina đen 1600×3200mm", price: "$42", unit: "/m²", moq: "MOQ: 50 m²", rating: 4.8, seller: "NABEL Stone Group", years: "10 năm", badges: ["new"], image: "/img/cer2.jpg?v=4", tags: ["Đá marble tấm", "Gạch ốp tường"] },
      { id: "ceramic-3", title: "Gạch lát sàn vân đá Travertine rustic 800×800", price: "$6.80", unit: "/m²", moq: "MOQ: 200 m²", rating: 4.7, seller: "Monalisa Ceramic", years: "10 năm", badges: ["deal"], image: "/img/cer3.jpg?v=4", tags: ["Gạch lát sàn", "Gạch porcelain"] },
      { id: "ceramic-4", title: "Gạch mosaic ốp tường Hexagon Terracotta vintage 200×230mm", price: "$12", unit: "/m²", moq: "MOQ: 50 m²", rating: 4.9, seller: "Xinzhongyuan Ceramic", years: "8 năm", image: "/img/cer4.jpg?v=4", tags: ["Gạch mosaic", "Gạch ốp tường"] },
      { id: "ceramic-5", title: "Tấm Porcelain marble xám honed finish 1200×2400mm", price: "$18", unit: "/m²", moq: "MOQ: 80 m²", rating: 5.0, seller: "Guanzhu Ceramic", years: "15 năm", badges: ["top"], image: "/img/cer5.jpg?v=4", tags: ["Gạch porcelain", "Đá marble tấm", "Gạch ốp tường", "Gạch lát sàn"] },
      { id: "ceramic-6", title: "Tấm ốp tường acoustic vân gỗ 3D trang trí 2400×600", price: "$15", unit: "/m²", moq: "MOQ: 100 m²", rating: 4.7, seller: "Foshan Hanse Industrial", years: "6 năm", badges: ["new"], image: "/img/cer6.jpg?v=4", tags: ["Gạch ốp tường"] },
      { id: "ceramic-7", title: "Sàn SPC vinyl click vân xương cá 1900×190×6mm", price: "$7.20", unit: "/m²", moq: "MOQ: 500 m²", rating: 4.8, seller: "Longda Flooring Co.", years: "9 năm", image: "/img/cer7.jpg?v=4", tags: ["Gạch lát sàn"] },
      { id: "ceramic-8", title: "Sàn gỗ kỹ thuật sồi Châu Âu UV finish hạng AB", price: "$22", unit: "/m²", moq: "MOQ: 300 m²", rating: 4.9, seller: "Jinjiang Wood House", years: "11 năm", badges: ["deal"], image: "/img/cer8.jpg?v=4", tags: ["Gạch lát sàn"] },
    ],
  },
  {
    id: "furniture",
    num: 2,
    title: "Nội thất",
    cn: "家具",
    tabs: ["Tất cả", "Phòng khách", "Phòng ngủ", "Phòng ăn", "Tủ bếp & Tủ áo", "Văn phòng", "Khách sạn"],
    totalCount: "480",
    categorySlug: "noi-that",
    featureSlug: "kuka-home",
    feature: {
      badge: "BÁN CHẠY",
      title: "Bộ sưu tập sofa KUKA",
      desc: "Sofa góc dạng module · Nhung Ý · 10 lựa chọn màu · Hỗ trợ OEM",
      cta: "Yêu cầu catalog →",
      image: "/img/sofa1.jpg?v=4",
    },
    products: [
      { id: "furniture-1", title: "Sofa góc chữ L 6 chỗ ngồi bọc nhung", price: "$420", unit: "/bộ", moq: "MOQ: 10 bộ", rating: 4.9, seller: "KUKA Home", years: "9 năm", badges: ["top"], image: "/img/fur1.jpg?v=4", tags: ["Phòng khách"] },
      { id: "furniture-2", title: "Sofa thư giãn da điện 3 chỗ hiện đại có cổng USB", price: "$680", unit: "/bộ", moq: "MOQ: 5 bộ", rating: 4.8, seller: "Foshan ZuoYou", years: "8 năm", image: "/img/fur2.jpg?v=4", tags: ["Phòng khách"] },
      { id: "furniture-3", title: "Giường gỗ óc chó king size 1800×2000mm tiêu chuẩn khách sạn", price: "$380", unit: "/cái", moq: "MOQ: 5 cái", rating: 4.9, seller: "Landbond Furniture", years: "14 năm", badges: ["new"], image: "/img/fur3.jpg?v=4", tags: ["Phòng ngủ", "Khách sạn"] },
      { id: "furniture-4", title: "Bộ bàn ăn Bắc Âu 6 chỗ mặt đá marble chân inox", price: "$280", unit: "/bộ", moq: "MOQ: 10 bộ", rating: 4.8, seller: "Dongguan Yijia Element", years: "7 năm", badges: ["oem"], image: "/img/fur4.jpg?v=4", tags: ["Phòng ăn"] },
      { id: "furniture-5", title: "Ghế giám đốc da công thái học lưng cao có tựa đầu", price: "$95", unit: "/cái", moq: "MOQ: 20 cái", rating: 4.7, seller: "Anji Chair Group", years: "11 năm", badges: ["top"], image: "/img/fur5.jpg?v=4", tags: ["Văn phòng"] },
      { id: "furniture-6", title: "Bộ nội thất phòng ngủ khách sạn 5 sao 4 món", price: "$1,450", unit: "/bộ", moq: "MOQ: 10 bộ", rating: 5.0, seller: "Foshan EMT Jufu", years: "13 năm", image: "/img/fur6.jpg?v=4", tags: ["Phòng ngủ", "Khách sạn"] },
      { id: "furniture-7", title: "Tủ bếp module OPPEIN acrylic bóng tùy chỉnh", price: "$210", unit: "/m", moq: "MOQ: 1 bộ", rating: 4.9, seller: "OPPEIN Home", years: "15 năm", badges: ["deal"], image: "/img/fur7.jpg?v=4", tags: ["Phòng ăn"] },
      { id: "furniture-8", title: "Tủ quần áo cửa trượt 4 cánh MDF melamine hiện đại", price: "$340", unit: "/cái", moq: "MOQ: 10 cái", rating: 4.8, seller: "Suofeiya Home", years: "12 năm", image: "/img/fur8.jpg?v=4", tags: ["Phòng ngủ"] },
    ],
  },
];

export const FACTORIES: Factory[] = [
  // Construction materials (gạch, đá, sàn)
  { initials: "DP", slug: "dongpeng-ceramics", name: "Guangdong Dongpeng Ceramics Co., Ltd.", location: "Foshan, Guangdong · CN", rating: 4.9, reviews: "2,340", meta: "50M m²/năm", badges: { gold: true, audited: true, years: "12 năm" }, tags: ["Porcelain", "Marble", "Gạch ốp lát"] },
  { initials: "MN", slug: "monalisa-group", name: "Monalisa Group Co., Ltd.", location: "Foshan, Guangdong · CN", rating: 4.9, reviews: "1,540", meta: "25M m²/năm", badges: { gold: true, audited: true, years: "10 năm" }, tags: ["Gốm sứ", "Tấm lớn", "Tấm đá"] },
  { initials: "NP", slug: "newpearl-ceramics", name: "NewPearl Ceramics Group", location: "Foshan · CN", rating: 4.7, reviews: "680", meta: "200M m²/năm", badges: { audited: true, years: "11 năm" }, tags: ["Gạch ốp tường", "Gạch lát sàn", "Porcelain"] },
  // Nội thất
  { initials: "KK", slug: "kuka-home", name: "Hangzhou KUKA Home Co., Ltd.", location: "Hangzhou, Zhejiang · CN", rating: 4.8, reviews: "1,810", meta: "6K+ cửa hàng", badges: { gold: true, audited: true, years: "9 năm" }, tags: ["Sofa", "Ghế thư giãn", "Nội thất khách sạn"] },
  { initials: "OP", slug: "oppein-home", name: "OPPEIN Home Group Inc.", location: "Guangzhou · CN", rating: 5.0, reviews: "3,120", meta: "#1 châu Á — tủ", badges: { gold: true, audited: true, years: "15 năm" }, tags: ["Tủ bếp", "Tủ quần áo", "Nội thất nguyên căn"], vr360ComId: "eKtTcaCAvhrm" },
  { initials: "LB", slug: "landbond-furniture", name: "Landbond Furniture Group", location: "Foshan & Linyi · CN", rating: 5.0, reviews: "1,230", meta: "40 năm gỗ tự nhiên", badges: { gold: true, audited: true, years: "14 năm" }, tags: ["Gỗ tự nhiên", "Phòng ngủ", "Phòng khách"] },
  { initials: "ZY", slug: "zuoyou-furniture", name: "ZuoYou Furniture Co., Ltd.", location: "Shenzhen · CN", rating: 4.8, reviews: "540", meta: "Thiết kế trọng tâm", badges: { audited: true, years: "8 năm" }, tags: ["Bọc nệm", "Sofa", "Hiện đại"] },
  { initials: "RA", slug: "redapple-furniture", name: "RedApple Furniture (HK)", location: "Hong Kong · CN", rating: 4.9, reviews: "1,050", meta: "Từ năm 1981", badges: { audited: true, years: "18 năm" }, tags: ["Tùy chỉnh", "Đệm", "Khách sạn"] },
];

export const ZONES: Zone[] = [
  { slug: "foshan-ceramic", name: "Phật Sơn — Gốm sứ", count: "1.200 nhà máy", image: "/img/zone1.jpg?v=4" },
  { slug: "foshan-furniture", name: "Phật Sơn — Nội thất", count: "3.000+ nhà máy", image: "/img/zone3.jpg?v=4" },
  { slug: "jinjiang-wood", name: "Tấn Giang — Gỗ", count: "340 nhà máy", image: "/img/zone5.jpg?v=4" },
];
