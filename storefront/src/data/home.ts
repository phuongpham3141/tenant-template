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

export type NavSubItem = {
  name: string;
  slug: string;
  image: string;
  /** Tagline shown next to hero image in the sub-panel. */
  tagline: string;
  /** 6 related products/sub-cats shown as grid in the sub-panel. */
  highlights: { name: string; image: string; slug?: string }[];
};

/** Hierarchical sidebar menu — 2 main groups × 8 sub-items.
 *  Hovering a sub-item shows a dedicated sub-panel (image + highlights). */
export const NAV_MENU: { main: { icon: string; name: string; slug: string }; items: NavSubItem[] }[] = [
  {
    main: { icon: "🧱", name: "Vật liệu xây dựng", slug: "construction-materials" },
    items: [
      {
        name: "Thép & Kim loại", slug: "ket-cau-thep-khung",
        image: "/img/thep-hinh-h-i-u-v.jpg?v=5",
        tagline: "Thép hình H/I/U/V, ống thép, tấm thép — báo giá theo tấn FOB Quảng Châu.",
        highlights: [
          { name: "Thép hình H/I/U/V",  image: "/img/thep-hinh-h-i-u-v.jpg?v=5", slug: "ket-cau-thep-khung" },
          { name: "Ống thép đen / mạ",  image: "/img/ceramic-1-2.jpg?v=5", slug: "ket-cau-thep-khung" },
          { name: "Tấm thép cuộn",      image: "/img/ceramic-1-3.jpg?v=5", slug: "ket-cau-thep-khung" },
          { name: "Thép hộp",           image: "/img/ceramic-1-4.jpg?v=5", slug: "ket-cau-thep-khung" },
          { name: "Lưới thép hàn",      image: "/img/ceramic-1-5.jpg?v=5", slug: "ket-cau-thep-khung" },
          { name: "Thép không gỉ",      image: "/img/cer3.jpg?v=5", slug: "ket-cau-thep-khung" },
        ],
      },
      {
        name: "Tấm ốp tường & Trần", slug: "tam-op-tuong-tran",
        image: "/img/cer6.jpg?v=5",
        tagline: "Tấm porcelain, gốm sứ, MDF — thiết kế nội thất khách sạn & biệt thự.",
        highlights: [
          { name: "Tấm porcelain lớn",  image: "/img/cer6.jpg?v=5", slug: "tam-op-tuong-tran" },
          { name: "Tấm 3D tường",       image: "/img/cer4.jpg?v=5", slug: "tam-op-tuong-tran" },
          { name: "Trần thạch cao",     image: "/img/cer5.jpg?v=5", slug: "tam-op-tuong-tran" },
          { name: "Ốp gỗ MDF",          image: "/img/cer8.jpg?v=5", slug: "tam-op-tuong-tran" },
          { name: "Trần kim loại",      image: "/img/cer3.jpg?v=5", slug: "tam-op-tuong-tran" },
          { name: "Ốp đá tự nhiên",     image: "/img/cer2.jpg?v=5", slug: "tam-op-tuong-tran" },
        ],
      },
      {
        name: "Vật liệu lát sàn", slug: "vat-lieu-lat-san",
        image: "/img/cer7.jpg?v=5",
        tagline: "Gạch porcelain, gỗ kỹ thuật, vinyl SPC — DDP tận kho Hà Nội/HCM 18 ngày.",
        highlights: [
          { name: "Gạch porcelain",     image: "/img/cer1.jpg?v=5", slug: "vat-lieu-lat-san" },
          { name: "Sàn gỗ kỹ thuật",    image: "/img/cer8.jpg?v=5", slug: "vat-lieu-lat-san" },
          { name: "Vinyl SPC",          image: "/img/cer7.jpg?v=5", slug: "vat-lieu-lat-san" },
          { name: "Gạch terrazzo",      image: "/img/cer2.jpg?v=5", slug: "vat-lieu-lat-san" },
          { name: "Đá granite tấm",     image: "/img/da-granite-tu-nhien.jpg?v=5", slug: "vat-lieu-lat-san" },
          { name: "Sàn ngoài trời",     image: "/img/cer5.jpg?v=5", slug: "vat-lieu-lat-san" },
        ],
      },
      {
        name: "Đá ốp lát & Nhân tạo", slug: "da-op-lat",
        image: "/img/da-marble-tu-nhien.jpg?v=5",
        tagline: "Marble Phúc Kiến, granite, quartz — tấm lớn cho mặt bàn bếp & lobby.",
        highlights: [
          { name: "Marble tự nhiên",    image: "/img/da-marble-tu-nhien.jpg?v=5", slug: "da-op-lat" },
          { name: "Granite tấm",        image: "/img/da-granite-tu-nhien.jpg?v=5", slug: "da-op-lat" },
          { name: "Quartz nhân tạo",    image: "/img/da-quartz-nhan-tao.jpg?v=5", slug: "da-op-lat" },
          { name: "Đá mosaic",          image: "/img/da-mosaic-trang-tri.jpg?v=5", slug: "da-op-lat" },
          { name: "Đá op ngoại thất",   image: "/img/da-op-ngoai-that.jpg?v=5", slug: "da-op-lat" },
          { name: "Đá sintered",        image: "/img/da-sintered-da-thieu-ket.jpg?v=5", slug: "da-op-lat" },
        ],
      },
      {
        name: "Sơn & Lớp phủ", slug: "son-lop-phu",
        image: "/img/son-epoxy-san.jpg?v=5",
        tagline: "Sơn epoxy sàn, sơn chống cháy, vữa trang trí — đạt chuẩn QCVN.",
        highlights: [
          { name: "Sơn epoxy sàn",      image: "/img/son-epoxy-san.jpg?v=5", slug: "son-lop-phu" },
          { name: "Sơn polyurethane",   image: "/img/ceramic-2-1.jpg?v=5", slug: "son-lop-phu" },
          { name: "Sơn ngoại thất",     image: "/img/ceramic-2-2.jpg?v=5", slug: "son-lop-phu" },
          { name: "Sơn nội thất",       image: "/img/ceramic-2-3.jpg?v=5", slug: "son-lop-phu" },
          { name: "Vữa trang trí",      image: "/img/ceramic-2-4.jpg?v=5", slug: "son-lop-phu" },
          { name: "Sơn chống thấm",     image: "/img/ceramic-2-5.jpg?v=5", slug: "son-lop-phu" },
        ],
      },
      {
        name: "Cách âm & Cách nhiệt", slug: "vat-lieu-cach-am-cach-nhiet",
        image: "/img/tam-cach-am.jpg?v=5",
        tagline: "Bông khoáng, EPS/XPS, mút cao su — phòng karaoke, nhà xưởng, kho lạnh.",
        highlights: [
          { name: "Bông khoáng rockwool", image: "/img/bong-khoang-rockwool.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Tấm cách âm tường",   image: "/img/tam-cach-am.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Bông thủy tinh",      image: "/img/bong-thuy-tinh-cach-nhiet.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Bông polyester",      image: "/img/bong-polyester.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Tấm EPS/XPS",         image: "/img/ceramic-3-1.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Foil cách nhiệt",     image: "/img/ceramic-3-2.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
        ],
      },
      {
        name: "Chống thấm", slug: "vat-lieu-chong-tham",
        image: "/img/mang-chong-tham-bitum.jpg?v=5",
        tagline: "Màng bitum tự dính, sơn polyurethane, keo PU — bảo hành 10-15 năm.",
        highlights: [
          { name: "Màng bitum tự dính",  image: "/img/mang-chong-tham-bitum.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "Sơn PU chống thấm",   image: "/img/ceramic-4-1.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "Keo silicone",        image: "/img/ceramic-4-2.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "Phụ gia xi măng",     image: "/img/ceramic-4-3.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "Băng cản nước PVC",   image: "/img/ceramic-4-4.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "Vữa chống thấm",      image: "/img/ceramic-4-5.jpg?v=5", slug: "vat-lieu-chong-tham" },
        ],
      },
      {
        name: "Xi măng & Vữa", slug: "vat-lieu-kho-xi-mang-vua",
        image: "/img/chau-xi-mang.jpg?v=5",
        tagline: "Xi măng Hà Tiên, vữa khô trộn sẵn, phụ gia bê tông — giao tận công trình.",
        highlights: [
          { name: "Xi măng đa dụng",     image: "/img/chau-xi-mang.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Vữa trộn sẵn",        image: "/img/ceramic-5-1.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Phụ gia bê tông",     image: "/img/ceramic-5-2.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Vữa rót non-shrink",  image: "/img/ceramic-5-3.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Keo dán gạch",        image: "/img/ceramic-5-4.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Vữa kháng axit",      image: "/img/ceramic-5-5.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
        ],
      },
    ],
  },
  {
    main: { icon: "🛋", name: "Nội thất", slug: "noi-that" },
    items: [
      {
        name: "Phòng khách", slug: "phong-khach",
        image: "/img/phong-khach.jpg?v=5",
        tagline: "Sofa, bàn cà phê, kệ TV — set trọn gói cho biệt thự & căn hộ cao cấp.",
        highlights: [
          { name: "Sofa hiện đại",       image: "/img/fur1.jpg?v=5", slug: "phong-khach" },
          { name: "Sofa cổ điển",        image: "/img/fur2.jpg?v=5", slug: "phong-khach" },
          { name: "Bàn cà phê",          image: "/img/ban-ca-phe.jpg?v=5", slug: "phong-khach" },
          { name: "Kệ TV",               image: "/img/fur4.jpg?v=5", slug: "phong-khach" },
          { name: "Ghế thư giãn",        image: "/img/fur5.jpg?v=5", slug: "phong-khach" },
          { name: "Bàn console",         image: "/img/furniture-1-3.jpg?v=5", slug: "phong-khach" },
        ],
      },
      {
        name: "Phòng ngủ", slug: "phong-ngu",
        image: "/img/phong-ngu.jpg?v=5",
        tagline: "Giường, tủ áo, bàn trang điểm — phong cách hiện đại & tân cổ điển.",
        highlights: [
          { name: "Giường ngủ",          image: "/img/fur3.jpg?v=5", slug: "phong-ngu" },
          { name: "Tủ quần áo",          image: "/img/fur8.jpg?v=5", slug: "phong-ngu" },
          { name: "Bàn trang điểm",      image: "/img/furniture-2-1.jpg?v=5", slug: "phong-ngu" },
          { name: "Táp đầu giường",      image: "/img/furniture-2-2.jpg?v=5", slug: "phong-ngu" },
          { name: "Đệm latex",           image: "/img/dem-latex-memory-foam.jpg?v=5", slug: "phong-ngu" },
          { name: "Đệm pocket spring",   image: "/img/dem-pocket-spring.jpg?v=5", slug: "phong-ngu" },
        ],
      },
      {
        name: "Phòng ăn", slug: "phong-an",
        image: "/img/phong-an.jpg?v=5",
        tagline: "Bộ bàn ăn, tủ rượu, ghế ăn — gỗ tự nhiên & MDF veneer cao cấp.",
        highlights: [
          { name: "Bàn ăn 6-8 chỗ",      image: "/img/ban-an.jpg?v=5", slug: "phong-an" },
          { name: "Ghế ăn",              image: "/img/ghe-an.jpg?v=5", slug: "phong-an" },
          { name: "Bàn cà phê",          image: "/img/ban-ca-phe.jpg?v=5", slug: "phong-an" },
          { name: "Ghế bar",             image: "/img/ghe-bar.jpg?v=5", slug: "phong-an" },
          { name: "Đèn chùm pha lê",     image: "/img/den-pha-le-k9.jpg?v=5", slug: "phong-an" },
          { name: "Đèn pendant",         image: "/img/den-pendant.jpg?v=5", slug: "phong-an" },
        ],
      },
      {
        name: "Tủ bếp", slug: "tu-bep",
        image: "/img/fur7.jpg?v=5",
        tagline: "Tủ bếp OPPEIN, gỗ acrylic & laminate — thiết kế 3D miễn phí từ đơn 30 bộ.",
        highlights: [
          { name: "Tủ bếp chữ L",        image: "/img/fur7.jpg?v=5", slug: "tu-bep" },
          { name: "Tủ bếp chữ U",        image: "/img/furniture-7-1.jpg?v=5", slug: "tu-bep" },
          { name: "Đảo bếp",             image: "/img/furniture-7-2.jpg?v=5", slug: "tu-bep" },
          { name: "Mặt đá quartz",       image: "/img/da-quartz-nhan-tao.jpg?v=5", slug: "tu-bep" },
          { name: "Bản lề tủ bếp",       image: "/img/ban-le-tu-bep.jpg?v=5", slug: "tu-bep" },
          { name: "Bản lề giảm chấn",    image: "/img/ban-le-tu-giam-chan.jpg?v=5", slug: "tu-bep" },
        ],
      },
      {
        name: "Tủ quần áo", slug: "tu-quan-ao",
        image: "/img/fur8.jpg?v=5",
        tagline: "Tủ áo âm tường, walk-in closet — OEM theo kích thước phòng.",
        highlights: [
          { name: "Tủ áo cánh trượt",    image: "/img/fur8.jpg?v=5", slug: "tu-quan-ao" },
          { name: "Walk-in closet",      image: "/img/furniture-8-1.jpg?v=5", slug: "tu-quan-ao" },
          { name: "Tủ áo trẻ em",        image: "/img/furniture-8-2.jpg?v=5", slug: "tu-quan-ao" },
          { name: "Tủ giày",             image: "/img/furniture-8-3.jpg?v=5", slug: "tu-quan-ao" },
          { name: "Bản lề tủ",           image: "/img/ban-le.jpg?v=5", slug: "tu-quan-ao" },
          { name: "Bản lề cửa",          image: "/img/ban-le-cua.jpg?v=5", slug: "tu-quan-ao" },
        ],
      },
      {
        name: "Văn phòng tại nhà", slug: "van-phong-tai-nha",
        image: "/img/van-phong-tai-nha.jpg?v=5",
        tagline: "Bàn làm việc, ghế ergonomic, kệ sách — chuẩn home-office hybrid.",
        highlights: [
          { name: "Bàn làm việc",        image: "/img/ban-lam-viec.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "Ghế văn phòng",       image: "/img/ghe-van-phong.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "Bàn picnic gập",      image: "/img/ban-picnic-gap-gon.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "Đèn bàn LED",         image: "/img/den-ban-de-ban.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "Đèn floor lamp",      image: "/img/den-san-floor-lamp.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "Đèn smart Wi-Fi",     image: "/img/den-smart-wi-fi.jpg?v=5", slug: "van-phong-tai-nha" },
        ],
      },
      {
        name: "Nội thất khách sạn", slug: "noi-that-khach-san",
        image: "/img/noi-that-khach-san.jpg?v=5",
        tagline: "Trọn gói FF&E 3-5 sao — thiết kế phù hợp chuẩn Marriott/Hilton.",
        highlights: [
          { name: "Giường khách sạn",    image: "/img/fur6.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "Bàn lobby",           image: "/img/furniture-6-1.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "Ghế sảnh chờ",        image: "/img/furniture-6-2.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "Đèn pha lê chandelier", image: "/img/den-chum-chandelier.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "Đèn wall sconce",     image: "/img/den-tuong-wall-sconce.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "Đèn ốp trần",         image: "/img/den-op-tran.jpg?v=5", slug: "noi-that-khach-san" },
        ],
      },
      {
        name: "Trẻ em & Em bé", slug: "tre-em-em-be",
        image: "/img/tre-em-em-be.jpg?v=5",
        tagline: "Giường trẻ em, bàn học, đồ chơi an toàn — chứng nhận E0/E1.",
        highlights: [
          { name: "Giường trẻ em",       image: "/img/furniture-3-1.jpg?v=5", slug: "tre-em-em-be" },
          { name: "Bàn học",             image: "/img/furniture-3-2.jpg?v=5", slug: "tre-em-em-be" },
          { name: "Tủ đồ chơi",          image: "/img/furniture-3-3.jpg?v=5", slug: "tre-em-em-be" },
          { name: "Ghế tâm năng",        image: "/img/ghe-tam-nang.jpg?v=5", slug: "tre-em-em-be" },
          { name: "Đèn để bàn trẻ em",   image: "/img/den-ban-de-ban.jpg?v=5", slug: "tre-em-em-be" },
          { name: "Đèn LED dây trang trí", image: "/img/den-led-day.jpg?v=5", slug: "tre-em-em-be" },
        ],
      },
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
      image: "/img/marble1.jpg?v=5",
    },
    products: [
      { id: "ceramic-1", title: "Gạch Porcelain vân đá Calacatta trắng 600×1200", price: "$8.50", unit: "/m²", moq: "MOQ: 100 m²", rating: 4.9, seller: "Dongpeng Ceramics", years: "12 năm", badges: ["top"], image: "/img/cer1.jpg?v=5", tags: ["Gạch porcelain", "Gạch lát sàn", "Đá marble tấm"] },
      { id: "ceramic-2", title: "Tấm đá marble Nero Marquina đen 1600×3200mm", price: "$42", unit: "/m²", moq: "MOQ: 50 m²", rating: 4.8, seller: "NABEL Stone Group", years: "10 năm", badges: ["new"], image: "/img/cer2.jpg?v=5", tags: ["Đá marble tấm", "Gạch ốp tường"] },
      { id: "ceramic-3", title: "Gạch lát sàn vân đá Travertine rustic 800×800", price: "$6.80", unit: "/m²", moq: "MOQ: 200 m²", rating: 4.7, seller: "Monalisa Ceramic", years: "10 năm", badges: ["deal"], image: "/img/cer3.jpg?v=5", tags: ["Gạch lát sàn", "Gạch porcelain"] },
      { id: "ceramic-4", title: "Gạch mosaic ốp tường Hexagon Terracotta vintage 200×230mm", price: "$12", unit: "/m²", moq: "MOQ: 50 m²", rating: 4.9, seller: "Xinzhongyuan Ceramic", years: "8 năm", image: "/img/cer4.jpg?v=5", tags: ["Gạch mosaic", "Gạch ốp tường"] },
      { id: "ceramic-5", title: "Tấm Porcelain marble xám honed finish 1200×2400mm", price: "$18", unit: "/m²", moq: "MOQ: 80 m²", rating: 5.0, seller: "Guanzhu Ceramic", years: "15 năm", badges: ["top"], image: "/img/cer5.jpg?v=5", tags: ["Gạch porcelain", "Đá marble tấm", "Gạch ốp tường", "Gạch lát sàn"] },
      { id: "ceramic-6", title: "Tấm ốp tường acoustic vân gỗ 3D trang trí 2400×600", price: "$15", unit: "/m²", moq: "MOQ: 100 m²", rating: 4.7, seller: "Foshan Hanse Industrial", years: "6 năm", badges: ["new"], image: "/img/cer6.jpg?v=5", tags: ["Gạch ốp tường"] },
      { id: "ceramic-7", title: "Sàn SPC vinyl click vân xương cá 1900×190×6mm", price: "$7.20", unit: "/m²", moq: "MOQ: 500 m²", rating: 4.8, seller: "Longda Flooring Co.", years: "9 năm", image: "/img/cer7.jpg?v=5", tags: ["Gạch lát sàn"] },
      { id: "ceramic-8", title: "Sàn gỗ kỹ thuật sồi Châu Âu UV finish hạng AB", price: "$22", unit: "/m²", moq: "MOQ: 300 m²", rating: 4.9, seller: "Jinjiang Wood House", years: "11 năm", badges: ["deal"], image: "/img/cer8.jpg?v=5", tags: ["Gạch lát sàn"] },
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
      image: "/img/sofa1.jpg?v=5",
    },
    products: [
      { id: "furniture-1", title: "Sofa góc chữ L 6 chỗ ngồi bọc nhung", price: "$420", unit: "/bộ", moq: "MOQ: 10 bộ", rating: 4.9, seller: "KUKA Home", years: "9 năm", badges: ["top"], image: "/img/fur1.jpg?v=5", tags: ["Phòng khách"] },
      { id: "furniture-2", title: "Sofa thư giãn da điện 3 chỗ hiện đại có cổng USB", price: "$680", unit: "/bộ", moq: "MOQ: 5 bộ", rating: 4.8, seller: "Foshan ZuoYou", years: "8 năm", image: "/img/fur2.jpg?v=5", tags: ["Phòng khách"] },
      { id: "furniture-3", title: "Giường gỗ óc chó king size 1800×2000mm tiêu chuẩn khách sạn", price: "$380", unit: "/cái", moq: "MOQ: 5 cái", rating: 4.9, seller: "Landbond Furniture", years: "14 năm", badges: ["new"], image: "/img/fur3.jpg?v=5", tags: ["Phòng ngủ", "Khách sạn"] },
      { id: "furniture-4", title: "Bộ bàn ăn Bắc Âu 6 chỗ mặt đá marble chân inox", price: "$280", unit: "/bộ", moq: "MOQ: 10 bộ", rating: 4.8, seller: "Dongguan Yijia Element", years: "7 năm", badges: ["oem"], image: "/img/fur4.jpg?v=5", tags: ["Phòng ăn"] },
      { id: "furniture-5", title: "Ghế giám đốc da công thái học lưng cao có tựa đầu", price: "$95", unit: "/cái", moq: "MOQ: 20 cái", rating: 4.7, seller: "Anji Chair Group", years: "11 năm", badges: ["top"], image: "/img/fur5.jpg?v=5", tags: ["Văn phòng"] },
      { id: "furniture-6", title: "Bộ nội thất phòng ngủ khách sạn 5 sao 4 món", price: "$1,450", unit: "/bộ", moq: "MOQ: 10 bộ", rating: 5.0, seller: "Foshan EMT Jufu", years: "13 năm", image: "/img/fur6.jpg?v=5", tags: ["Phòng ngủ", "Khách sạn"] },
      { id: "furniture-7", title: "Tủ bếp module OPPEIN acrylic bóng tùy chỉnh", price: "$210", unit: "/m", moq: "MOQ: 1 bộ", rating: 4.9, seller: "OPPEIN Home", years: "15 năm", badges: ["deal"], image: "/img/fur7.jpg?v=5", tags: ["Phòng ăn"] },
      { id: "furniture-8", title: "Tủ quần áo cửa trượt 4 cánh MDF melamine hiện đại", price: "$340", unit: "/cái", moq: "MOQ: 10 cái", rating: 4.8, seller: "Suofeiya Home", years: "12 năm", image: "/img/fur8.jpg?v=5", tags: ["Phòng ngủ"] },
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
  { slug: "foshan-ceramic", name: "Phật Sơn — Gốm sứ", count: "1.200 nhà máy", image: "/img/zone1.jpg?v=5" },
  { slug: "foshan-furniture", name: "Phật Sơn — Nội thất", count: "3.000+ nhà máy", image: "/img/zone3.jpg?v=5" },
  { slug: "jinjiang-wood", name: "Tấn Giang — Gỗ", count: "340 nhà máy", image: "/img/zone5.jpg?v=5" },
];
