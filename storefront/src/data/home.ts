import {
  PARTNERS,
  productSlug,
  type PartnerBrand,
  type PartnerProduct,
} from "@/data/partners";

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
  /** Direct link target — real partner products link to /info/partners/{slug}/{productSlug}.
   *  When unset, ProductCard falls back to /product/{id}. */
  href?: string;
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
    /** Optional link target for the feature panel (real partner page). */
    href?: string;
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
  /** Made-in-China VR comId — if present, show the 360° tour in the VR Tour tab. */
  vr360ComId?: string;
};

export type Zone = {
  slug: string;
  name: string;
  count: string;
  image?: string;
};

export { HOT_SEARCHES, NAV_CATEGORIES, NAV_MENU } from "./nav";
export type { NavSubItem } from "./nav";

export const STATS = [
  { value: "960+", label: "SKU đang bán" },
  { value: "20+", label: "Nhà máy đã xác minh" },
  { value: "<24h", label: "Thời gian báo giá" },
  { value: "300+", label: "Đại lý tại Việt Nam" },
  { value: "12 năm", label: "Năm kinh nghiệm" },
];

// ── Homepage product sections — computed from real PARTNERS (single source of truth).
//    Auto-updates for future partners too; each card links to the real product detail page. ──
function homeYears(founded?: string): string {
  const m = founded?.match(/(\d{4})/);
  if (!m) return "Chính hãng";
  const d = 2026 - parseInt(m[1], 10);
  return d > 0 ? `${d} năm` : "Chính hãng";
}
function partnerCard(p: PartnerBrand, prod: PartnerProduct): Product {
  const ps = productSlug(prod);
  return {
    id: `${p.slug}-${ps}`,
    href: `/info/partners/${p.slug}/${ps}`,
    title: prod.name,
    price: "Liên hệ",
    unit: "",
    moq: prod.series ?? "Có sẵn",
    rating: 5,
    seller: p.name,
    years: homeYears(p.founded),
    image: prod.image,
    tags: [p.name],
  };
}
const HOME_CATS: { slug: string; title: string }[] = [
  { slug: "electrical", title: "Điện & Điện gia dụng" },
  { slug: "kitchen-equipment", title: "Thiết bị bếp" },
  { slug: "bathroom-sanitary", title: "Thiết bị vệ sinh" },
  { slug: "lighting", title: "Đèn chiếu sáng" },
  { slug: "construction-materials", title: "Vật liệu xây dựng" },
  { slug: "noi-that", title: "Nội thất & Trang trí" },
  { slug: "home-garden", title: "Nhà cửa & Sân vườn" },
  { slug: "doors-windows", title: "Cửa, Cửa sổ & Khoá thông minh" },
];
function buildHomeSections(): Section[] {
  const out: Section[] = [];
  for (const cat of HOME_CATS) {
    const brands = PARTNERS.filter((p) => p.category === cat.slug && p.products.length > 0);
    if (brands.length === 0) continue;
    const lists = brands.map((b) =>
      b.products.filter((pr) => pr.image).slice(0, 12).map((pr) => partnerCard(b, pr))
    );
    const cards: Product[] = [];
    for (let i = 0; cards.length < 96 && lists.some((l) => l[i]); i++)
      for (const l of lists) if (l[i]) cards.push(l[i]);
    const featured = brands[0];
    const featuredImg = `/img/feat-${cat.slug}.jpg?v=2`;
    out.push({
      id: cat.slug,
      num: out.length + 1,
      title: cat.title,
      cn: cat.title,
      tabs: ["Tất cả", ...brands.slice(0, 7).map((b) => b.name)],
      totalCount: String(brands.reduce((s, b) => s + b.products.length, 0)),
      categorySlug: cat.slug,
      featureSlug: featured.slug,
      feature: {
        badge: "ĐỐI TÁC",
        title: featured.name,
        desc: featured.name,
        cta: "Xem sản phẩm →",
        image: featuredImg,
        href: `/info/partners/${featured.slug}`,
      },
      products: cards,
    });
  }
  return out;
}
export const SECTIONS: Section[] = buildHomeSections();

export const FACTORIES: Factory[] = [
  // Building materials (tiles, stone, flooring)
  { initials: "DP", slug: "dongpeng-ceramics", name: "Guangdong Dongpeng Ceramics Co., Ltd.", location: "Foshan, Guangdong · CN", rating: 4.9, reviews: "2,340", meta: "50 triệu m²/năm", badges: { gold: true, audited: true, years: "12 năm" }, tags: ["Gạch porcelain", "Đá marble", "Gạch ốp lát"] },
  { initials: "MN", slug: "monalisa-group", name: "Monalisa Group Co., Ltd.", location: "Foshan, Guangdong · CN", rating: 4.9, reviews: "1,540", meta: "25 triệu m²/năm", badges: { gold: true, audited: true, years: "10 năm" }, tags: ["Gốm sứ", "Tấm khổ lớn", "Tấm đá"] },
  { initials: "NP", slug: "newpearl-ceramics", name: "NewPearl Ceramics Group", location: "Foshan · CN", rating: 4.7, reviews: "680", meta: "200 triệu m²/năm", badges: { audited: true, years: "11 năm" }, tags: ["Gạch ốp tường", "Gạch lát nền", "Gạch porcelain"] },
  // Furniture
  { initials: "KK", slug: "kuka-home", name: "Hangzhou KUKA Home Co., Ltd.", location: "Hangzhou, Zhejiang · CN", rating: 4.8, reviews: "1,810", meta: "6K+ cửa hàng", badges: { gold: true, audited: true, years: "9 năm" }, tags: ["Sofa", "Ghế thư giãn", "Nội thất khách sạn"] },
  { initials: "OP", slug: "oppein-home", name: "OPPEIN Home Group Inc.", location: "Guangzhou · CN", rating: 5.0, reviews: "3,120", meta: "Số 1 châu Á — tủ bếp", badges: { gold: true, audited: true, years: "15 năm" }, tags: ["Tủ bếp", "Tủ quần áo", "Nội thất trọn nhà"], vr360ComId: "eKtTcaCAvhrm" },
  { initials: "LB", slug: "landbond-furniture", name: "Landbond Furniture Group", location: "Foshan & Linyi · CN", rating: 5.0, reviews: "1,230", meta: "40 năm gỗ tự nhiên", badges: { gold: true, audited: true, years: "14 năm" }, tags: ["Gỗ tự nhiên", "Phòng ngủ", "Phòng khách"] },
  { initials: "ZY", slug: "zuoyou-furniture", name: "ZuoYou Furniture Co., Ltd.", location: "Shenzhen · CN", rating: 4.8, reviews: "540", meta: "Chú trọng thiết kế", badges: { audited: true, years: "8 năm" }, tags: ["Bọc nệm", "Sofa", "Hiện đại"] },
  { initials: "RA", slug: "redapple-furniture", name: "RedApple Furniture (HK)", location: "Hong Kong · CN", rating: 4.9, reviews: "1,050", meta: "Từ năm 1981", badges: { audited: true, years: "18 năm" }, tags: ["Đặt riêng", "Nệm", "Khách sạn"] },
];

export const ZONES: Zone[] = [
  { slug: "foshan-ceramic", name: "Phật Sơn — Gốm sứ", count: "1,200 nhà máy", image: "/img/zk-ceramic.jpg?v=1" },
  { slug: "foshan-furniture", name: "Phật Sơn — Nội thất", count: "3,000+ nhà máy", image: "/img/zk-furniture.jpg?v=1" },
  { slug: "jinjiang-wood", name: "Tấn Giang — Gỗ", count: "340 nhà máy", image: "/img/zk-wood.jpg?v=1" },
  { slug: "guangzhou-appliance", name: "Quảng Châu — Điện gia dụng", count: "2,000+ nhà máy", image: "/img/zk-appliance.jpg?v=1" },
  { slug: "guzhen-lighting", name: "Cổ Trấn — Đèn chiếu sáng", count: "8,000+ cơ sở", image: "/img/zk-lighting.jpg?v=1" },
  { slug: "chaozhou-sanitary", name: "Triều Châu — Thiết bị vệ sinh", count: "1,500+ nhà máy", image: "/img/zk-sanitary.jpg?v=1" },
];
