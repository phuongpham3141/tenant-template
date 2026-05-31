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
  { icon: "📺", name: "Điện gia dụng", slug: "dien-gia-dung" },
  { icon: "🛗", name: "Thang máy", slug: "thang-may" },
  { icon: "💡", name: "Đèn chiếu sáng", slug: "den-chieu-sang" },
  { icon: "🔐", name: "Khoá thông minh", slug: "khoa-thong-minh" },
  { icon: "🚿", name: "Thiết bị nhà tắm", slug: "thiet-bi-nha-tam" },
  { icon: "🥘", name: "Thiết bị bếp", slug: "thiet-bi-bep" },
  { icon: "⚡", name: "Đồ điện", slug: "do-dien" },
];

export type NavSubItem = {
  name: string;
  slug: string;
  /** Emoji shown next to the sub-item name in the mega-menu sidebar
      (mirrors the main category icon styling). */
  icon: string;
  image: string;
  /** Tagline shown next to hero image in the sub-panel. */
  tagline: string;
  /** Legacy: 6 related thumbnails. Still used by sub-panel hero strip preview. */
  highlights: { name: string; image: string; slug?: string }[];
  /** CSR-style sections grid: 4 sections × 4 sub-sub items as text links. */
  sections: { title: string; items: { name: string; slug?: string }[] }[];
};

/** Hierarchical sidebar menu — 2 main groups × 8 sub-items.
 *  Hovering a sub-item shows a dedicated sub-panel (image + highlights). */
export const NAV_MENU: { main: { icon: string; name: string; slug: string }; items: NavSubItem[] }[] = [
  {
    main: { icon: "🏠", name: "Nhà & Sân vườn", slug: "home-garden" },
    items: [
      {
        name: "Thang máy chở khách", slug: "thang-may-cho-khach", icon: "🛗",
        image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5",
        tagline: "Thang chở khách 6–21 người, tốc độ 1.0–2.5 m/s — tiêu chuẩn EN 81.",
        highlights: [
          { name: "Cabin 6 người",   image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "thang-may-cho-khach" },
          { name: "Cabin 13 người",  image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "thang-may-cho-khach" },
          { name: "Tốc độ cao",      image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "thang-may-cho-khach" },
          { name: "Vận hành êm",      image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "thang-may-cho-khach" },
        ],
        sections: [
          { title: "Tải trọng", items: [
            { name: "450 kg / 6 người", slug: "thang-may-cho-khach" },
            { name: "1000 kg / 13 người", slug: "thang-may-cho-khach" },
            { name: "1600 kg / 21 người", slug: "thang-may-cho-khach" },
          ]},
          { title: "Tốc độ", items: [
            { name: "1.0 m/s", slug: "thang-may-cho-khach" },
            { name: "1.75 m/s", slug: "thang-may-cho-khach" },
            { name: "2.5 m/s", slug: "thang-may-cho-khach" },
          ]},
          { title: "Tiêu chuẩn", items: [
            { name: "EN 81-20/50", slug: "thang-may-cho-khach" },
            { name: "GB 7588", slug: "thang-may-cho-khach" },
            { name: "ISO 22559", slug: "thang-may-cho-khach" },
          ]},
        ],
      },
      {
        name: "Thang cuốn", slug: "thang-cuon", icon: "🪜",
        image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5",
        tagline: "Thang cuốn trung tâm thương mại, sân bay — góc 30°/35°.",
        highlights: [
          { name: "Trung tâm thương mại", image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "thang-cuon" },
          { name: "Sân bay",              image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "thang-cuon" },
          { name: "Metro / ga tàu",       image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "thang-cuon" },
          { name: "Outdoor có mái",       image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "thang-cuon" },
        ],
        sections: [
          { title: "Bước thang", items: [
            { name: "600 mm", slug: "thang-cuon" },
            { name: "800 mm", slug: "thang-cuon" },
            { name: "1000 mm", slug: "thang-cuon" },
          ]},
          { title: "Góc nghiêng", items: [
            { name: "30°", slug: "thang-cuon" },
            { name: "35°", slug: "thang-cuon" },
          ]},
          { title: "Ứng dụng", items: [
            { name: "Trong nhà", slug: "thang-cuon" },
            { name: "Bán ngoài trời", slug: "thang-cuon" },
            { name: "Heavy-duty", slug: "thang-cuon" },
          ]},
        ],
      },
      {
        name: "Thang chống cháy", slug: "thang-chong-chay", icon: "🚒",
        image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5",
        tagline: "Thang máy chuyên dụng PCCC EN 81-72 — vận hành an toàn khi hoả hoạn.",
        highlights: [
          { name: "Cabin chống lửa",   image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "thang-chong-chay" },
          { name: "Cửa kháng nhiệt",   image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "thang-chong-chay" },
          { name: "Nguồn dự phòng",    image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "thang-chong-chay" },
          { name: "Chống thấm nước",   image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "thang-chong-chay" },
        ],
        sections: [
          { title: "Tải trọng", items: [
            { name: "630 kg / 8 người", slug: "thang-chong-chay" },
            { name: "1000 kg / 13 người", slug: "thang-chong-chay" },
            { name: "1600 kg cứu hộ", slug: "thang-chong-chay" },
          ]},
          { title: "Tiêu chuẩn PCCC", items: [
            { name: "EN 81-72", slug: "thang-chong-chay" },
            { name: "EN 81-73", slug: "thang-chong-chay" },
            { name: "TCVN 6396", slug: "thang-chong-chay" },
          ]},
          { title: "Tính năng", items: [
            { name: "Cabin chống cháy 120 phút", slug: "thang-chong-chay" },
            { name: "Nguồn UPS", slug: "thang-chong-chay" },
            { name: "Đèn báo PCCC", slug: "thang-chong-chay" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🧱", name: "Vật liệu xây dựng", slug: "construction-materials" },
    items: [
      {
        name: "Thép & Kim loại", slug: "ket-cau-thep-khung", icon: "🔩",
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
        sections: [
          { title: "Theo dạng", items: [
            { name: "Thép hình H/I", slug: "ket-cau-thep-khung" },
            { name: "Thép hình U/V", slug: "ket-cau-thep-khung" },
            { name: "Thép hộp vuông", slug: "ket-cau-thep-khung" },
            { name: "Ống thép tròn", slug: "ket-cau-thep-khung" },
          ]},
          { title: "Theo bề mặt", items: [
            { name: "Thép đen", slug: "ket-cau-thep-khung" },
            { name: "Mạ kẽm nhúng nóng", slug: "ket-cau-thep-khung" },
            { name: "Sơn tĩnh điện", slug: "ket-cau-thep-khung" },
            { name: "Inox 304/316", slug: "ket-cau-thep-khung" },
          ]},
          { title: "Theo tiêu chuẩn", items: [
            { name: "JIS SS400", slug: "ket-cau-thep-khung" },
            { name: "EN S275JR", slug: "ket-cau-thep-khung" },
            { name: "GB Q235", slug: "ket-cau-thep-khung" },
            { name: "ASTM A36", slug: "ket-cau-thep-khung" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Bu-lông neo M16+", slug: "ket-cau-thep-khung" },
            { name: "Đinh ốc cường độ cao", slug: "ket-cau-thep-khung" },
            { name: "Lưới thép hàn", slug: "ket-cau-thep-khung" },
            { name: "Đinh tán thép", slug: "ket-cau-thep-khung" },
          ]},
        ],
      },
      {
        name: "Tấm ốp tường & Trần", slug: "tam-op-tuong-tran", icon: "🟦",
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
        sections: [
          { title: "Tấm ốp tường", items: [
            { name: "Porcelain tấm lớn", slug: "tam-op-tuong-tran" },
            { name: "Tấm 3D PVC", slug: "tam-op-tuong-tran" },
            { name: "Tấm composite", slug: "tam-op-tuong-tran" },
            { name: "Tấm acrylic gloss", slug: "tam-op-tuong-tran" },
          ]},
          { title: "Trần thạch cao", items: [
            { name: "Trần chìm phẳng", slug: "tam-op-tuong-tran" },
            { name: "Trần thả 60×60", slug: "tam-op-tuong-tran" },
            { name: "Trần caro 60×120", slug: "tam-op-tuong-tran" },
            { name: "Trần nano đục lỗ", slug: "tam-op-tuong-tran" },
          ]},
          { title: "Ốp gỗ trang trí", items: [
            { name: "MDF veneer sồi", slug: "tam-op-tuong-tran" },
            { name: "HDF chống ẩm", slug: "tam-op-tuong-tran" },
            { name: "Gỗ nhựa WPC", slug: "tam-op-tuong-tran" },
            { name: "Phào nẹp gỗ thông", slug: "tam-op-tuong-tran" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Khung xương kẽm", slug: "tam-op-tuong-tran" },
            { name: "Keo dán tấm ốp", slug: "tam-op-tuong-tran" },
            { name: "Đèn LED âm trần", slug: "tam-op-tuong-tran" },
            { name: "Phào nẹp PVC", slug: "tam-op-tuong-tran" },
          ]},
        ],
      },
      {
        name: "Vật liệu lát sàn", slug: "vat-lieu-lat-san", icon: "🟫",
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
        sections: [
          { title: "Gạch porcelain", items: [
            { name: "Bóng kính", slug: "vat-lieu-lat-san" },
            { name: "Mờ matte", slug: "vat-lieu-lat-san" },
            { name: "Vân 3D", slug: "vat-lieu-lat-san" },
            { name: "Mosaic ghép", slug: "vat-lieu-lat-san" },
          ]},
          { title: "Sàn gỗ", items: [
            { name: "Engineered 3 lớp", slug: "vat-lieu-lat-san" },
            { name: "Laminate AC4", slug: "vat-lieu-lat-san" },
            { name: "Vinyl SPC", slug: "vat-lieu-lat-san" },
            { name: "Bamboo carbonized", slug: "vat-lieu-lat-san" },
          ]},
          { title: "Đá tự nhiên", items: [
            { name: "Marble Carrara", slug: "vat-lieu-lat-san" },
            { name: "Granite đen", slug: "vat-lieu-lat-san" },
            { name: "Travertine", slug: "vat-lieu-lat-san" },
            { name: "Slate đen Trung Quốc", slug: "vat-lieu-lat-san" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Phào chân tường", slug: "vat-lieu-lat-san" },
            { name: "Nẹp ngưỡng cửa", slug: "vat-lieu-lat-san" },
            { name: "Keo dán sàn", slug: "vat-lieu-lat-san" },
            { name: "Lớp lót underlay", slug: "vat-lieu-lat-san" },
          ]},
        ],
      },
      {
        name: "Đá ốp lát & Nhân tạo", slug: "da-op-lat", icon: "⛰️",
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
        sections: [
          { title: "Marble tự nhiên", items: [
            { name: "Carrara trắng", slug: "da-op-lat" },
            { name: "Marquina đen", slug: "da-op-lat" },
            { name: "Beige vàng", slug: "da-op-lat" },
            { name: "Rosa hồng Bồ Đào Nha", slug: "da-op-lat" },
          ]},
          { title: "Granite", items: [
            { name: "Đen tuyền", slug: "da-op-lat" },
            { name: "Đỏ Brazil", slug: "da-op-lat" },
            { name: "Xám Sardo", slug: "da-op-lat" },
            { name: "Vàng cây Vạn Niên", slug: "da-op-lat" },
          ]},
          { title: "Đá nhân tạo", items: [
            { name: "Quartz vân marble", slug: "da-op-lat" },
            { name: "Quartz vân kim loại", slug: "da-op-lat" },
            { name: "Solid surface acrylic", slug: "da-op-lat" },
            { name: "Terrazzo nhân tạo", slug: "da-op-lat" },
          ]},
          { title: "Sintered stone", items: [
            { name: "Neolith", slug: "da-op-lat" },
            { name: "Dekton", slug: "da-op-lat" },
            { name: "Lapitec", slug: "da-op-lat" },
            { name: "MaxFine", slug: "da-op-lat" },
          ]},
        ],
      },
      {
        name: "Sơn & Lớp phủ", slug: "son-lop-phu", icon: "🎨",
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
        sections: [
          { title: "Sơn nội thất", items: [
            { name: "Sơn lót kiềm", slug: "son-lop-phu" },
            { name: "Sơn phủ bóng", slug: "son-lop-phu" },
            { name: "Sơn texture vân", slug: "son-lop-phu" },
            { name: "Sơn chống mốc", slug: "son-lop-phu" },
          ]},
          { title: "Sơn ngoại thất", items: [
            { name: "Sơn nano siêu bền", slug: "son-lop-phu" },
            { name: "Sơn cách nhiệt", slug: "son-lop-phu" },
            { name: "Sơn vỉa hè / vạch kẻ", slug: "son-lop-phu" },
            { name: "Sơn epoxy sàn", slug: "son-lop-phu" },
          ]},
          { title: "Sơn chuyên dụng", items: [
            { name: "Sơn chống cháy", slug: "son-lop-phu" },
            { name: "Sơn chống nước", slug: "son-lop-phu" },
            { name: "Sơn chống tĩnh điện", slug: "son-lop-phu" },
            { name: "Sơn cách điện", slug: "son-lop-phu" },
          ]},
          { title: "Phụ kiện sơn", items: [
            { name: "Băng keo che", slug: "son-lop-phu" },
            { name: "Lăn sơn / cọ", slug: "son-lop-phu" },
            { name: "Vải bảo vệ sàn", slug: "son-lop-phu" },
            { name: "Bột trét tường", slug: "son-lop-phu" },
          ]},
        ],
      },
      {
        name: "Cách âm & Cách nhiệt", slug: "vat-lieu-cach-am-cach-nhiet", icon: "🧊",
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
        sections: [
          { title: "Bông khoáng", items: [
            { name: "Rockwool tấm", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Glasswool cuộn", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Bông gốm chịu nhiệt", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Bông silica aerogel", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "Mút foam", items: [
            { name: "PE foam cuộn", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "PU foam phun", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Phenolic foam", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "EPP định hình", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "EPS / XPS", items: [
            { name: "Tấm EPS thường", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Tấm XPS chịu nén", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "EPS định hình SIPs", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "XPS lát mái", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "Phụ kiện cách nhiệt", items: [
            { name: "Foil nhôm chống nóng", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Keo dán bông cách nhiệt", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Thanh giằng / khung kẽm", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Vít neo chuyên dụng", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
        ],
      },
      {
        name: "Chống thấm", slug: "vat-lieu-chong-tham", icon: "💧",
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
        sections: [
          { title: "Màng bitum", items: [
            { name: "Tự dính SBS", slug: "vat-lieu-chong-tham" },
            { name: "Khò nóng APP", slug: "vat-lieu-chong-tham" },
            { name: "Cuộn dày 3mm", slug: "vat-lieu-chong-tham" },
            { name: "Cuộn dày 4mm", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "Sơn chống thấm", items: [
            { name: "PU đàn hồi 1K", slug: "vat-lieu-chong-tham" },
            { name: "PU đàn hồi 2K", slug: "vat-lieu-chong-tham" },
            { name: "Acrylic gốc nước", slug: "vat-lieu-chong-tham" },
            { name: "Polyurea phun cao áp", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "Keo & Phụ gia", items: [
            { name: "Silicone trung tính", slug: "vat-lieu-chong-tham" },
            { name: "MS Polymer", slug: "vat-lieu-chong-tham" },
            { name: "Phụ gia chống thấm xi măng", slug: "vat-lieu-chong-tham" },
            { name: "Hồ chống thấm 2K", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "Phụ kiện thi công", items: [
            { name: "Băng cản nước PVC", slug: "vat-lieu-chong-tham" },
            { name: "Lưới fiber gia cường", slug: "vat-lieu-chong-tham" },
            { name: "Băng keo butyl", slug: "vat-lieu-chong-tham" },
            { name: "Vữa rót non-shrink", slug: "vat-lieu-chong-tham" },
          ]},
        ],
      },
      {
        name: "Xi măng & Vữa", slug: "vat-lieu-kho-xi-mang-vua", icon: "🏗️",
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
        sections: [
          { title: "Xi măng bao", items: [
            { name: "PCB30 đa dụng", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCB40 chịu nén cao", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCB50 cường độ cao", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Xi măng trắng", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "Vữa khô trộn sẵn", items: [
            { name: "Vữa xây tô", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Vữa lót", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Vữa trát hoàn thiện", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Vữa mài / self-leveling", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "Phụ gia bê tông", items: [
            { name: "Đông kết nhanh", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Đông kết chậm", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Siêu dẻo PCE", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Chống thấm bê tông", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "Keo & Mạch", items: [
            { name: "Keo dán gạch 1K", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Keo dán gạch 2K", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Mạch epoxy", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Mạch xi măng chống mốc", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🚿", name: "Phòng tắm & Vệ sinh", slug: "bathroom-sanitary" },
    items: [
      {
        name: "Bồn cầu sứ", slug: "bon-cau-su", icon: "🚽",
        image: "/img/bathroom-1-1.jpg?v=5",
        tagline: "Bồn cầu 1 khối, 2 khối, treo tường — sứ tráng men siphon êm.",
        highlights: [
          { name: "Bồn 1 khối siphon",  image: "/img/bathroom-1-1.jpg?v=5", slug: "bon-cau-su" },
          { name: "Bồn 2 khối phổ thông", image: "/img/bathroom-1-2.jpg?v=5", slug: "bon-cau-su" },
          { name: "Bồn treo tường",       image: "/img/bathroom-1-3.jpg?v=5", slug: "bon-cau-su" },
          { name: "Bồn xổm sứ",            image: "/img/bathroom-1-4.jpg?v=5", slug: "bon-cau-su" },
        ],
        sections: [
          { title: "Kiểu xả", items: [
            { name: "Siphon êm", slug: "bon-cau-su" },
            { name: "Xả thẳng", slug: "bon-cau-su" },
            { name: "Xả áp lực", slug: "bon-cau-su" },
          ]},
          { title: "Kiểu lắp", items: [
            { name: "1 khối liền", slug: "bon-cau-su" },
            { name: "2 khối có két", slug: "bon-cau-su" },
            { name: "Treo tường", slug: "bon-cau-su" },
          ]},
          { title: "Tiêu chuẩn nước", items: [
            { name: "3/6L tiết kiệm", slug: "bon-cau-su" },
            { name: "WaterSense", slug: "bon-cau-su" },
            { name: "CUPC", slug: "bon-cau-su" },
          ]},
        ],
      },
      {
        name: "Bồn cầu thông minh", slug: "bon-cau-thong-minh", icon: "🤖",
        image: "/img/bathroom-2-1.jpg?v=5",
        tagline: "Bồn cầu thông minh xịt + sấy + sưởi nắp + tự khử mùi.",
        highlights: [
          { name: "1 khối thông minh",   image: "/img/bathroom-2-1.jpg?v=5", slug: "bon-cau-thong-minh" },
          { name: "Nắp gắn thêm",         image: "/img/bathroom-2-2.jpg?v=5", slug: "bon-cau-thong-minh" },
          { name: "Treo tường thông minh", image: "/img/bathroom-2-3.jpg?v=5", slug: "bon-cau-thong-minh" },
          { name: "Cao cấp Nhật chuẩn",   image: "/img/bathroom-2-4.jpg?v=5", slug: "bon-cau-thong-minh" },
        ],
        sections: [
          { title: "Tính năng", items: [
            { name: "Xịt rửa nóng", slug: "bon-cau-thong-minh" },
            { name: "Sấy khô", slug: "bon-cau-thong-minh" },
            { name: "Sưởi nắp + khử mùi", slug: "bon-cau-thong-minh" },
          ]},
          { title: "Điều khiển", items: [
            { name: "Cảm biến gần", slug: "bon-cau-thong-minh" },
            { name: "Remote IR", slug: "bon-cau-thong-minh" },
            { name: "Side panel + voice", slug: "bon-cau-thong-minh" },
          ]},
          { title: "Tiết kiệm", items: [
            { name: "Xả siêu nhỏ 3L", slug: "bon-cau-thong-minh" },
            { name: "Eco-mode", slug: "bon-cau-thong-minh" },
            { name: "Tự ngắt nguồn", slug: "bon-cau-thong-minh" },
          ]},
        ],
      },
      {
        name: "Lavabo sứ", slug: "lavabo-su", icon: "🪣",
        image: "/img/bathroom-3-1.jpg?v=5",
        tagline: "Chậu rửa lavabo sứ treo tường, đặt bàn, dương vành — đa kiểu dáng.",
        highlights: [
          { name: "Đặt bàn tròn",   image: "/img/bathroom-3-1.jpg?v=5", slug: "lavabo-su" },
          { name: "Treo tường",     image: "/img/bathroom-3-2.jpg?v=5", slug: "lavabo-su" },
          { name: "Đặt dương vành", image: "/img/bathroom-3-3.jpg?v=5", slug: "lavabo-su" },
          { name: "Âm bàn",          image: "/img/bathroom-3-4.jpg?v=5", slug: "lavabo-su" },
        ],
        sections: [
          { title: "Kiểu lắp", items: [
            { name: "Đặt bàn", slug: "lavabo-su" },
            { name: "Treo tường", slug: "lavabo-su" },
            { name: "Âm bàn", slug: "lavabo-su" },
          ]},
          { title: "Vật liệu", items: [
            { name: "Sứ vệ sinh", slug: "lavabo-su" },
            { name: "Composite", slug: "lavabo-su" },
            { name: "Đá nhân tạo", slug: "lavabo-su" },
          ]},
          { title: "Hoàn thiện", items: [
            { name: "Men trắng cổ điển", slug: "lavabo-su" },
            { name: "Men đen matte", slug: "lavabo-su" },
            { name: "Vân đá art", slug: "lavabo-su" },
          ]},
        ],
      },
      {
        name: "Tủ phòng tắm", slug: "tu-phong-tam", icon: "🪞",
        image: "/img/bathroom-4-1.jpg?v=5",
        tagline: "Tủ chậu lavabo + gương + đèn — gỗ chống nước + inox.",
        highlights: [
          { name: "Tủ 600 mm",       image: "/img/bathroom-4-1.jpg?v=5", slug: "tu-phong-tam" },
          { name: "Tủ 800 mm có gương", image: "/img/bathroom-4-2.jpg?v=5", slug: "tu-phong-tam" },
          { name: "Tủ 1200 mm đôi",   image: "/img/bathroom-4-3.jpg?v=5", slug: "tu-phong-tam" },
          { name: "Tủ inox 304",       image: "/img/bathroom-4-4.jpg?v=5", slug: "tu-phong-tam" },
        ],
        sections: [
          { title: "Vật liệu", items: [
            { name: "Plywood phủ melamine", slug: "tu-phong-tam" },
            { name: "PVC chống nước", slug: "tu-phong-tam" },
            { name: "Inox 304", slug: "tu-phong-tam" },
          ]},
          { title: "Kích thước", items: [
            { name: "600 mm", slug: "tu-phong-tam" },
            { name: "800 mm", slug: "tu-phong-tam" },
            { name: "1200 mm đôi chậu", slug: "tu-phong-tam" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Gương cảm ứng + đèn", slug: "tu-phong-tam" },
            { name: "Tay nâng thuỷ lực", slug: "tu-phong-tam" },
            { name: "Tay cầm vàng-rose", slug: "tu-phong-tam" },
          ]},
        ],
      },
      {
        name: "Vòi nước kim khí", slug: "voi-nuoc", icon: "🚰",
        image: "/img/bathroom-5-1.jpg?v=5",
        tagline: "Vòi sen, vòi lavabo, vòi bếp — đồng mạ chrome / vàng / matte.",
        highlights: [
          { name: "Vòi lavabo cao", image: "/img/bathroom-5-1.jpg?v=5", slug: "voi-nuoc" },
          { name: "Vòi sen âm tường", image: "/img/bathroom-5-2.jpg?v=5", slug: "voi-nuoc" },
          { name: "Vòi bếp uốn cong", image: "/img/bathroom-5-3.jpg?v=5", slug: "voi-nuoc" },
          { name: "Bộ vòi sen tắm",   image: "/img/bathroom-5-4.jpg?v=5", slug: "voi-nuoc" },
        ],
        sections: [
          { title: "Vị trí lắp", items: [
            { name: "Lavabo", slug: "voi-nuoc" },
            { name: "Bồn tắm / sen", slug: "voi-nuoc" },
            { name: "Bếp", slug: "voi-nuoc" },
          ]},
          { title: "Vật liệu", items: [
            { name: "Đồng đỏ mạ chrome", slug: "voi-nuoc" },
            { name: "Inox 304", slug: "voi-nuoc" },
            { name: "Hợp kim Zn rẻ", slug: "voi-nuoc" },
          ]},
          { title: "Màu hoàn thiện", items: [
            { name: "Chrome bóng", slug: "voi-nuoc" },
            { name: "Đen matte", slug: "voi-nuoc" },
            { name: "Vàng rose / brushed gold", slug: "voi-nuoc" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🛋", name: "Nội thất", slug: "noi-that" },
    items: [
      {
        name: "Phòng khách", slug: "phong-khach", icon: "🛋️",
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
        sections: [
          { title: "Sofa", items: [
            { name: "Sofa hiện đại", slug: "phong-khach" },
            { name: "Sofa cổ điển", slug: "phong-khach" },
            { name: "Sofa da Italia", slug: "phong-khach" },
            { name: "Sofa vải linen", slug: "phong-khach" },
          ]},
          { title: "Bàn & Kệ", items: [
            { name: "Bàn cà phê", slug: "phong-khach" },
            { name: "Bàn console", slug: "phong-khach" },
            { name: "Kệ TV treo tường", slug: "phong-khach" },
            { name: "Kệ TV đứng", slug: "phong-khach" },
          ]},
          { title: "Ghế thư giãn", items: [
            { name: "Ghế bành cánh tay", slug: "phong-khach" },
            { name: "Ghế thư giãn ngả", slug: "phong-khach" },
            { name: "Ghế swing tổ chim", slug: "phong-khach" },
            { name: "Ghế đôn / footstool", slug: "phong-khach" },
          ]},
          { title: "Đèn & Decor", items: [
            { name: "Đèn sàn floor lamp", slug: "phong-khach" },
            { name: "Đèn bàn cạnh sofa", slug: "phong-khach" },
            { name: "Thảm trải phòng khách", slug: "phong-khach" },
            { name: "Rèm cửa cao cấp", slug: "phong-khach" },
          ]},
        ],
      },
      {
        name: "Phòng ngủ", slug: "phong-ngu", icon: "🛏️",
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
        sections: [
          { title: "Giường ngủ", items: [
            { name: "Giường 1m6", slug: "phong-ngu" },
            { name: "Giường 1m8", slug: "phong-ngu" },
            { name: "Giường King 2m", slug: "phong-ngu" },
            { name: "Giường tầng", slug: "phong-ngu" },
          ]},
          { title: "Tủ áo", items: [
            { name: "Tủ cánh trượt", slug: "phong-ngu" },
            { name: "Tủ cánh mở", slug: "phong-ngu" },
            { name: "Walk-in closet", slug: "phong-ngu" },
            { name: "Tủ kết hợp gương", slug: "phong-ngu" },
          ]},
          { title: "Đệm cao cấp", items: [
            { name: "Đệm cao su tự nhiên", slug: "phong-ngu" },
            { name: "Đệm lò xo túi", slug: "phong-ngu" },
            { name: "Đệm memory foam", slug: "phong-ngu" },
            { name: "Đệm latex 7-zone", slug: "phong-ngu" },
          ]},
          { title: "Bàn / Phụ kiện", items: [
            { name: "Bàn trang điểm có gương", slug: "phong-ngu" },
            { name: "Táp đầu giường", slug: "phong-ngu" },
            { name: "Ghế bench cuối giường", slug: "phong-ngu" },
            { name: "Đèn ngủ cảm ứng", slug: "phong-ngu" },
          ]},
        ],
      },
      {
        name: "Phòng ăn", slug: "phong-an", icon: "🍽️",
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
        sections: [
          { title: "Bàn ăn", items: [
            { name: "Bàn 4 chỗ", slug: "phong-an" },
            { name: "Bàn 6 chỗ", slug: "phong-an" },
            { name: "Bàn 8 chỗ", slug: "phong-an" },
            { name: "Bàn mở rộng", slug: "phong-an" },
          ]},
          { title: "Ghế ăn", items: [
            { name: "Ghế gỗ tự nhiên", slug: "phong-an" },
            { name: "Ghế bọc da", slug: "phong-an" },
            { name: "Ghế bọc vải", slug: "phong-an" },
            { name: "Ghế nhựa cao cấp", slug: "phong-an" },
          ]},
          { title: "Tủ rượu & Buffet", items: [
            { name: "Tủ rượu cánh kính", slug: "phong-an" },
            { name: "Tủ rượu module", slug: "phong-an" },
            { name: "Tủ buffet trưng bày", slug: "phong-an" },
            { name: "Tủ bar mini", slug: "phong-an" },
          ]},
          { title: "Đèn & Decor", items: [
            { name: "Đèn chùm pha lê", slug: "phong-an" },
            { name: "Đèn pendant đơn", slug: "phong-an" },
            { name: "Lọ hoa bàn ăn", slug: "phong-an" },
            { name: "Tranh trang trí", slug: "phong-an" },
          ]},
        ],
      },
      {
        name: "Tủ bếp", slug: "tu-bep", icon: "🍳",
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
        sections: [
          { title: "Hình dạng tủ", items: [
            { name: "Chữ I cơ bản", slug: "tu-bep" },
            { name: "Chữ L góc bếp", slug: "tu-bep" },
            { name: "Chữ U khép kín", slug: "tu-bep" },
            { name: "Có đảo bếp / island", slug: "tu-bep" },
          ]},
          { title: "Vật liệu cánh", items: [
            { name: "Acrylic gloss", slug: "tu-bep" },
            { name: "Laminate vân gỗ", slug: "tu-bep" },
            { name: "Melamine MFC", slug: "tu-bep" },
            { name: "Gỗ tự nhiên sồi/óc chó", slug: "tu-bep" },
          ]},
          { title: "Mặt đá", items: [
            { name: "Quartz nhân tạo", slug: "tu-bep" },
            { name: "Granite tự nhiên", slug: "tu-bep" },
            { name: "Marble trắng", slug: "tu-bep" },
            { name: "Solid surface Corian", slug: "tu-bep" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Bản lề Blum giảm chấn", slug: "tu-bep" },
            { name: "Ray trượt 3 tầng", slug: "tu-bep" },
            { name: "Tay nắm tủ", slug: "tu-bep" },
            { name: "Đèn LED âm tủ", slug: "tu-bep" },
          ]},
        ],
      },
      {
        name: "Tủ quần áo", slug: "tu-quan-ao", icon: "👔",
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
        sections: [
          { title: "Kiểu tủ", items: [
            { name: "Cánh trượt", slug: "tu-quan-ao" },
            { name: "Cánh mở", slug: "tu-quan-ao" },
            { name: "Walk-in closet", slug: "tu-quan-ao" },
            { name: "Module âm tường", slug: "tu-quan-ao" },
          ]},
          { title: "Vật liệu", items: [
            { name: "MDF veneer", slug: "tu-quan-ao" },
            { name: "HDF chống ẩm", slug: "tu-quan-ao" },
            { name: "Gỗ tự nhiên", slug: "tu-quan-ao" },
            { name: "Acrylic gloss", slug: "tu-quan-ao" },
          ]},
          { title: "Phụ kiện trong", items: [
            { name: "Rổ kéo Hafele", slug: "tu-quan-ao" },
            { name: "Móc cà-vạt xoay", slug: "tu-quan-ao" },
            { name: "Đèn cảm ứng LED", slug: "tu-quan-ao" },
            { name: "Két sắt giấu trong tủ", slug: "tu-quan-ao" },
          ]},
          { title: "Tủ phụ kèm theo", items: [
            { name: "Tủ giày kết hợp", slug: "tu-quan-ao" },
            { name: "Tủ đầu giường", slug: "tu-quan-ao" },
            { name: "Tủ ngăn kéo", slug: "tu-quan-ao" },
            { name: "Kệ trang sức tích hợp", slug: "tu-quan-ao" },
          ]},
        ],
      },
      {
        name: "Văn phòng tại nhà", slug: "van-phong-tai-nha", icon: "💼",
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
        sections: [
          { title: "Bàn làm việc", items: [
            { name: "Standing desk", slug: "van-phong-tai-nha" },
            { name: "Bàn chữ L", slug: "van-phong-tai-nha" },
            { name: "Bàn thẳng tối giản", slug: "van-phong-tai-nha" },
            { name: "Bàn kết hợp kệ sách", slug: "van-phong-tai-nha" },
          ]},
          { title: "Ghế ngồi", items: [
            { name: "Ghế ergonomic", slug: "van-phong-tai-nha" },
            { name: "Ghế gaming", slug: "van-phong-tai-nha" },
            { name: "Ghế da giám đốc", slug: "van-phong-tai-nha" },
            { name: "Ghế lưới văn phòng", slug: "van-phong-tai-nha" },
          ]},
          { title: "Lưu trữ", items: [
            { name: "Kệ sách open shelf", slug: "van-phong-tai-nha" },
            { name: "Tủ tài liệu cánh kính", slug: "van-phong-tai-nha" },
            { name: "Hộp đựng tài liệu", slug: "van-phong-tai-nha" },
            { name: "Tủ ngăn kéo di động", slug: "van-phong-tai-nha" },
          ]},
          { title: "Phụ kiện làm việc", items: [
            { name: "Đèn LED bàn cảm ứng", slug: "van-phong-tai-nha" },
            { name: "Giá đỡ monitor", slug: "van-phong-tai-nha" },
            { name: "Đèn smart Wi-Fi", slug: "van-phong-tai-nha" },
            { name: "Khay đứng laptop", slug: "van-phong-tai-nha" },
          ]},
        ],
      },
      {
        name: "Nội thất khách sạn", slug: "noi-that-khach-san", icon: "🏨",
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
        sections: [
          { title: "Phòng ngủ khách sạn", items: [
            { name: "Giường king/queen", slug: "noi-that-khach-san" },
            { name: "Đầu giường bọc nệm", slug: "noi-that-khach-san" },
            { name: "Bàn làm việc trong phòng", slug: "noi-that-khach-san" },
            { name: "Tủ minibar gỗ veneer", slug: "noi-that-khach-san" },
          ]},
          { title: "Phòng tắm khách sạn", items: [
            { name: "Khăn tắm 100% cotton", slug: "noi-that-khach-san" },
            { name: "Đồ amenity hộp gói", slug: "noi-that-khach-san" },
            { name: "Áo choàng tắm waffle", slug: "noi-that-khach-san" },
            { name: "Dép đi trong phòng", slug: "noi-that-khach-san" },
          ]},
          { title: "Lobby & Sảnh chờ", items: [
            { name: "Ghế sảnh chờ", slug: "noi-that-khach-san" },
            { name: "Bàn lễ tân", slug: "noi-that-khach-san" },
            { name: "Đèn chandelier pha lê", slug: "noi-that-khach-san" },
            { name: "Kệ trưng bày kính", slug: "noi-that-khach-san" },
          ]},
          { title: "Phòng ăn / Bar", items: [
            { name: "Bàn buffet inox", slug: "noi-that-khach-san" },
            { name: "Ghế nhà hàng cao cấp", slug: "noi-that-khach-san" },
            { name: "Đèn pendant bar", slug: "noi-that-khach-san" },
            { name: "Quầy bar liền khối", slug: "noi-that-khach-san" },
          ]},
        ],
      },
      {
        name: "Trẻ em & Em bé", slug: "tre-em-em-be", icon: "🧸",
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
        sections: [
          { title: "Phòng ngủ trẻ em", items: [
            { name: "Giường tầng an toàn", slug: "tre-em-em-be" },
            { name: "Cũi em bé MDF", slug: "tre-em-em-be" },
            { name: "Tủ áo trẻ em", slug: "tre-em-em-be" },
            { name: "Đèn ngủ cảm ứng", slug: "tre-em-em-be" },
          ]},
          { title: "Học tập", items: [
            { name: "Bàn học chống gù", slug: "tre-em-em-be" },
            { name: "Ghế học điều chỉnh", slug: "tre-em-em-be" },
            { name: "Kệ sách trẻ em", slug: "tre-em-em-be" },
            { name: "Đèn bàn LED chống cận", slug: "tre-em-em-be" },
          ]},
          { title: "Đồ chơi & Lưu trữ", items: [
            { name: "Tủ đồ chơi modular", slug: "tre-em-em-be" },
            { name: "Đồ chơi gỗ E0", slug: "tre-em-em-be" },
            { name: "Xếp hình giáo dục", slug: "tre-em-em-be" },
            { name: "Hộp lưu trữ vải", slug: "tre-em-em-be" },
          ]},
          { title: "Vệ sinh & Ăn uống", items: [
            { name: "Ghế ăn em bé", slug: "tre-em-em-be" },
            { name: "Khăn tắm trẻ em cotton", slug: "tre-em-em-be" },
            { name: "Yếm ăn silicone", slug: "tre-em-em-be" },
            { name: "Bồn rửa mini cho bé", slug: "tre-em-em-be" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🍳", name: "Thiết bị nhà bếp", slug: "kitchen-equipment" },
    items: [
      {
        name: "Bếp từ", slug: "bep-tu", icon: "♨️",
        image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5",
        tagline: "Bếp từ đơn / đôi / 3-4 vùng nấu — kính ceramic Schott, công suất 3500W+.",
        highlights: [
          { name: "Đôi vùng nấu",   image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "bep-tu" },
          { name: "3 vùng nấu",     image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "bep-tu" },
          { name: "4 vùng nấu",     image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "bep-tu" },
          { name: "Đơn di động",    image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "bep-tu" },
        ],
        sections: [
          { title: "Số vùng nấu", items: [
            { name: "Đơn 1 vùng", slug: "bep-tu" },
            { name: "Đôi 2 vùng", slug: "bep-tu" },
            { name: "3-4 vùng âm", slug: "bep-tu" },
          ]},
          { title: "Công suất", items: [
            { name: "≤ 2000 W", slug: "bep-tu" },
            { name: "2000–3500 W", slug: "bep-tu" },
            { name: "Booster > 3500 W", slug: "bep-tu" },
          ]},
          { title: "Tính năng", items: [
            { name: "Khoá trẻ em", slug: "bep-tu" },
            { name: "Tự ngắt nồi rỗng", slug: "bep-tu" },
            { name: "9 mức nhiệt", slug: "bep-tu" },
          ]},
        ],
      },
      {
        name: "Máy hút mùi", slug: "may-hut-mui", icon: "💨",
        image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5",
        tagline: "Hút mùi áp trần, kệ trên, đảo bếp — lưu lượng 700–1300 m³/h.",
        highlights: [
          { name: "Áp trần kim cương", image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "may-hut-mui" },
          { name: "Kệ trên cổ điển",   image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "may-hut-mui" },
          { name: "Đảo bếp treo trần", image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "may-hut-mui" },
          { name: "Cảm ứng từ xa",     image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "may-hut-mui" },
        ],
        sections: [
          { title: "Theo kiểu lắp", items: [
            { name: "Áp trần / áp tường", slug: "may-hut-mui" },
            { name: "Kệ trên cổ điển", slug: "may-hut-mui" },
            { name: "Treo trần đảo bếp", slug: "may-hut-mui" },
          ]},
          { title: "Lưu lượng", items: [
            { name: "700 m³/h", slug: "may-hut-mui" },
            { name: "1000 m³/h", slug: "may-hut-mui" },
            { name: "1300+ m³/h", slug: "may-hut-mui" },
          ]},
          { title: "Vật liệu", items: [
            { name: "Inox 304", slug: "may-hut-mui" },
            { name: "Kính cường lực", slug: "may-hut-mui" },
            { name: "Đồng phay nghệ thuật", slug: "may-hut-mui" },
          ]},
        ],
      },
      {
        name: "Lò vi sóng", slug: "lo-vi-song", icon: "📡",
        image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5",
        tagline: "Lò vi sóng cơ, điện tử, có nướng — dung tích 20–42L.",
        highlights: [
          { name: "Cơ học 20L",     image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "lo-vi-song" },
          { name: "Điện tử 25L",    image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "lo-vi-song" },
          { name: "Có nướng 30L",   image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "lo-vi-song" },
          { name: "Combo hơi nước", image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "lo-vi-song" },
        ],
        sections: [
          { title: "Dung tích", items: [
            { name: "20L hộ gia đình", slug: "lo-vi-song" },
            { name: "25–30L", slug: "lo-vi-song" },
            { name: "42L+ chuyên nghiệp", slug: "lo-vi-song" },
          ]},
          { title: "Loại", items: [
            { name: "Cơ học", slug: "lo-vi-song" },
            { name: "Điện tử cảm ứng", slug: "lo-vi-song" },
            { name: "Vi sóng + nướng + hơi", slug: "lo-vi-song" },
          ]},
          { title: "Công suất", items: [
            { name: "700 W", slug: "lo-vi-song" },
            { name: "900 W", slug: "lo-vi-song" },
            { name: "1200 W+", slug: "lo-vi-song" },
          ]},
        ],
      },
      {
        name: "Nồi áp suất", slug: "noi-ap-suat", icon: "🍲",
        image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5",
        tagline: "Nồi áp suất điện tử, multi-cook — dung tích 4–10L.",
        highlights: [
          { name: "Điện tử 5L",       image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "noi-ap-suat" },
          { name: "Multi-cook 6L",    image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "noi-ap-suat" },
          { name: "Inox lớn 8L",      image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "noi-ap-suat" },
          { name: "Cơ học truyền thống", image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "noi-ap-suat" },
        ],
        sections: [
          { title: "Dung tích", items: [
            { name: "4–5L gia đình", slug: "noi-ap-suat" },
            { name: "6–8L", slug: "noi-ap-suat" },
            { name: "10L+ quán ăn", slug: "noi-ap-suat" },
          ]},
          { title: "Loại", items: [
            { name: "Điện tử", slug: "noi-ap-suat" },
            { name: "Cơ học", slug: "noi-ap-suat" },
            { name: "Multi-cook 12-trong-1", slug: "noi-ap-suat" },
          ]},
          { title: "Vật liệu lòng", items: [
            { name: "Chống dính ceramic", slug: "noi-ap-suat" },
            { name: "Inox 304", slug: "noi-ap-suat" },
            { name: "Hợp kim nhôm dày", slug: "noi-ap-suat" },
          ]},
        ],
      },
      {
        name: "Nồi cơm điện", slug: "noi-com-dien", icon: "🍚",
        image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5",
        tagline: "Nồi cơm cơ học, điện tử, cao tần IH — 1.8–5L cho gia đình & nhà hàng.",
        highlights: [
          { name: "Cơ học 1.8L",   image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "noi-com-dien" },
          { name: "Điện tử 2L",    image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "noi-com-dien" },
          { name: "Cao tần IH",    image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "noi-com-dien" },
          { name: "Công nghiệp 5L",image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "noi-com-dien" },
        ],
        sections: [
          { title: "Công nghệ", items: [
            { name: "Cơ học", slug: "noi-com-dien" },
            { name: "Điện tử", slug: "noi-com-dien" },
            { name: "Cao tần IH", slug: "noi-com-dien" },
          ]},
          { title: "Dung tích", items: [
            { name: "1.0–1.8L", slug: "noi-com-dien" },
            { name: "2.0–3.0L", slug: "noi-com-dien" },
            { name: "5L+ nhà hàng", slug: "noi-com-dien" },
          ]},
          { title: "Chế độ", items: [
            { name: "Nấu cơm", slug: "noi-com-dien" },
            { name: "Hấp", slug: "noi-com-dien" },
            { name: "Nấu cháo / chậm", slug: "noi-com-dien" },
          ]},
        ],
      },
      {
        name: "Máy rửa bát", slug: "may-rua-bat", icon: "🍽️",
        image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5",
        tagline: "Máy rửa bát độc lập, âm tủ, mini — 6–14 bộ tiêu chuẩn.",
        highlights: [
          { name: "Độc lập 14 bộ",  image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "may-rua-bat" },
          { name: "Âm tủ 12 bộ",    image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "may-rua-bat" },
          { name: "Mini bàn 6 bộ",  image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "may-rua-bat" },
          { name: "Bán âm",          image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "may-rua-bat" },
        ],
        sections: [
          { title: "Kiểu lắp", items: [
            { name: "Độc lập", slug: "may-rua-bat" },
            { name: "Âm tủ", slug: "may-rua-bat" },
            { name: "Mini để bàn", slug: "may-rua-bat" },
          ]},
          { title: "Số bộ", items: [
            { name: "6 bộ mini", slug: "may-rua-bat" },
            { name: "8–10 bộ", slug: "may-rua-bat" },
            { name: "13–14 bộ chuyên nghiệp", slug: "may-rua-bat" },
          ]},
          { title: "Tính năng", items: [
            { name: "Sấy nóng", slug: "may-rua-bat" },
            { name: "Diệt khuẩn UV", slug: "may-rua-bat" },
            { name: "Wi-Fi điều khiển", slug: "may-rua-bat" },
          ]},
        ],
      },
      {
        name: "Chậu rửa inox", slug: "chau-rua-inox", icon: "🍽️",
        image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5",
        tagline: "Chậu rửa inox 304 đơn / đôi / 3 ngăn — mịn handmade / chống ồn.",
        highlights: [
          { name: "Chậu đơn 50×40",   image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "chau-rua-inox" },
          { name: "Chậu đôi 78×42",   image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "chau-rua-inox" },
          { name: "Handmade vuông",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "chau-rua-inox" },
          { name: "3 ngăn công nghiệp", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "chau-rua-inox" },
        ],
        sections: [
          { title: "Số ngăn", items: [
            { name: "1 ngăn", slug: "chau-rua-inox" },
            { name: "2 ngăn", slug: "chau-rua-inox" },
            { name: "3 ngăn", slug: "chau-rua-inox" },
          ]},
          { title: "Kiểu", items: [
            { name: "Đặt bàn", slug: "chau-rua-inox" },
            { name: "Âm bàn", slug: "chau-rua-inox" },
            { name: "Bán âm undermount", slug: "chau-rua-inox" },
          ]},
          { title: "Hoàn thiện", items: [
            { name: "Brushed lụa", slug: "chau-rua-inox" },
            { name: "Nano đen matte", slug: "chau-rua-inox" },
            { name: "Handmade R10", slug: "chau-rua-inox" },
          ]},
        ],
      },
      {
        name: "Sản phẩm kim khí", slug: "kim-khi-bep", icon: "🔧",
        image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5",
        tagline: "Bản lề tủ bếp, ray trượt, tay cầm, phụ kiện inox — gọi theo container.",
        highlights: [
          { name: "Bản lề giảm chấn", image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "kim-khi-bep" },
          { name: "Ray trượt đáy",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "kim-khi-bep" },
          { name: "Tay cầm hợp kim",  image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "kim-khi-bep" },
          { name: "Phụ kiện inox",    image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "kim-khi-bep" },
        ],
        sections: [
          { title: "Bản lề & Ray", items: [
            { name: "Bản lề cốc 35 mm", slug: "kim-khi-bep" },
            { name: "Ray trượt 3 tầng", slug: "kim-khi-bep" },
            { name: "Pittông nâng tủ", slug: "kim-khi-bep" },
          ]},
          { title: "Phụ kiện inox", items: [
            { name: "Giá bát đĩa", slug: "kim-khi-bep" },
            { name: "Giá gia vị", slug: "kim-khi-bep" },
            { name: "Thùng rác âm tủ", slug: "kim-khi-bep" },
          ]},
          { title: "Tay cầm", items: [
            { name: "Tay vuông inox", slug: "kim-khi-bep" },
            { name: "Tay tròn đồng", slug: "kim-khi-bep" },
            { name: "Tay chìm âm", slug: "kim-khi-bep" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "💡", name: "Đèn & Chiếu sáng", slug: "lighting" },
    items: [
      {
        name: "Đèn LED nguồn", slug: "den-led", icon: "💡",
        image: "/img/ceramic-2-1.jpg?v=5",
        tagline: "LED chip nguồn các loại — driver, modul, COB, SMD chuyên dụng.",
        highlights: [
          { name: "Chip COB",      image: "/img/ceramic-2-1.jpg?v=5", slug: "den-led" },
          { name: "SMD 2835/5050", image: "/img/ceramic-2-2.jpg?v=5", slug: "den-led" },
          { name: "Modul Driver",  image: "/img/ceramic-2-3.jpg?v=5", slug: "den-led" },
          { name: "Bóng LED filament", image: "/img/ceramic-2-4.jpg?v=5", slug: "den-led" },
        ],
        sections: [
          { title: "Loại chip", items: [
            { name: "COB", slug: "den-led" },
            { name: "SMD", slug: "den-led" },
            { name: "Filament", slug: "den-led" },
          ]},
          { title: "Nhiệt màu", items: [
            { name: "Trắng ấm 3000K", slug: "den-led" },
            { name: "Trắng trung 4000K", slug: "den-led" },
            { name: "Trắng lạnh 6500K", slug: "den-led" },
          ]},
          { title: "CRI", items: [
            { name: "Ra >80", slug: "den-led" },
            { name: "Ra >90", slug: "den-led" },
            { name: "Ra >95 nghệ thuật", slug: "den-led" },
          ]},
        ],
      },
      {
        name: "Đèn LED gia dụng", slug: "den-led-gia-dung", icon: "🏠",
        image: "/img/ceramic-2-2.jpg?v=5",
        tagline: "Đèn ốp trần, downlight, panel, dây LED — cho phòng khách & sinh hoạt.",
        highlights: [
          { name: "Đèn ốp trần",  image: "/img/ceramic-2-2.jpg?v=5", slug: "den-led-gia-dung" },
          { name: "Downlight âm trần", image: "/img/ceramic-2-3.jpg?v=5", slug: "den-led-gia-dung" },
          { name: "Panel vuông",  image: "/img/ceramic-2-4.jpg?v=5", slug: "den-led-gia-dung" },
          { name: "Dây LED trang trí", image: "/img/ceramic-2-5.jpg?v=5", slug: "den-led-gia-dung" },
        ],
        sections: [
          { title: "Theo vị trí", items: [
            { name: "Phòng khách", slug: "den-led-gia-dung" },
            { name: "Phòng ngủ", slug: "den-led-gia-dung" },
            { name: "Hành lang / cầu thang", slug: "den-led-gia-dung" },
          ]},
          { title: "Theo kiểu", items: [
            { name: "Ốp trần", slug: "den-led-gia-dung" },
            { name: "Downlight âm", slug: "den-led-gia-dung" },
            { name: "Panel siêu mỏng", slug: "den-led-gia-dung" },
          ]},
          { title: "Tính năng", items: [
            { name: "3 chế độ màu", slug: "den-led-gia-dung" },
            { name: "Điều chỉnh sáng", slug: "den-led-gia-dung" },
            { name: "Smart Wi-Fi", slug: "den-led-gia-dung" },
          ]},
        ],
      },
      {
        name: "Đèn LED thương mại", slug: "den-led-thuong-mai", icon: "🏢",
        image: "/img/ceramic-2-3.jpg?v=5",
        tagline: "Đèn pha, đèn tuyp công nghiệp, đèn rọi spotlight — IP65/66.",
        highlights: [
          { name: "Đèn pha LED 100W",  image: "/img/ceramic-2-3.jpg?v=5", slug: "den-led-thuong-mai" },
          { name: "Đèn tuyp T8",       image: "/img/ceramic-2-4.jpg?v=5", slug: "den-led-thuong-mai" },
          { name: "Spotlight rọi ray", image: "/img/ceramic-2-5.jpg?v=5", slug: "den-led-thuong-mai" },
          { name: "Đèn nhà xưởng UFO", image: "/img/ceramic-2-1.jpg?v=5", slug: "den-led-thuong-mai" },
        ],
        sections: [
          { title: "Ứng dụng", items: [
            { name: "Showroom", slug: "den-led-thuong-mai" },
            { name: "Văn phòng", slug: "den-led-thuong-mai" },
            { name: "Nhà xưởng", slug: "den-led-thuong-mai" },
          ]},
          { title: "Công suất", items: [
            { name: "≤ 50 W", slug: "den-led-thuong-mai" },
            { name: "50–150 W", slug: "den-led-thuong-mai" },
            { name: "> 200 W", slug: "den-led-thuong-mai" },
          ]},
          { title: "IP rating", items: [
            { name: "IP44 indoor", slug: "den-led-thuong-mai" },
            { name: "IP65 outdoor", slug: "den-led-thuong-mai" },
            { name: "IP66 chống bụi/nước", slug: "den-led-thuong-mai" },
          ]},
        ],
      },
      {
        name: "Vật tư điện", slug: "vat-tu-dien", icon: "⚙️",
        image: "/img/ceramic-2-4.jpg?v=5",
        tagline: "Ổ cắm, công tắc, MCB, ATS — phụ kiện hoàn thiện hệ thống đèn.",
        highlights: [
          { name: "Ổ cắm âm tường",  image: "/img/ceramic-2-4.jpg?v=5", slug: "vat-tu-dien" },
          { name: "Công tắc cảm ứng", image: "/img/ceramic-2-5.jpg?v=5", slug: "vat-tu-dien" },
          { name: "MCB / RCBO",       image: "/img/ceramic-2-1.jpg?v=5", slug: "vat-tu-dien" },
          { name: "Hộp đấu nối",      image: "/img/ceramic-2-2.jpg?v=5", slug: "vat-tu-dien" },
        ],
        sections: [
          { title: "Thiết bị đóng cắt", items: [
            { name: "MCB 6/10/16A", slug: "vat-tu-dien" },
            { name: "RCBO", slug: "vat-tu-dien" },
            { name: "Cầu dao tự động", slug: "vat-tu-dien" },
          ]},
          { title: "Ổ cắm & Công tắc", items: [
            { name: "Mặt vuông âm tường", slug: "vat-tu-dien" },
            { name: "Cảm ứng smart", slug: "vat-tu-dien" },
            { name: "Ổ cắm USB", slug: "vat-tu-dien" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Hộp âm tường", slug: "vat-tu-dien" },
            { name: "Bu-lông tiếp địa", slug: "vat-tu-dien" },
            { name: "Kẹp cáp nhanh", slug: "vat-tu-dien" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🪟", name: "Cửa & Cửa sổ", slug: "doors-windows" },
    items: [
      {
        name: "Khoá nhận diện khuôn mặt 3D", slug: "khoa-3d-face", icon: "📹",
        image: "/img/ceramic-3-1.jpg?v=5",
        tagline: "Khoá nhận diện 3D face + video call — IP68 chống nước.",
        highlights: [
          { name: "3D face + video",  image: "/img/ceramic-3-1.jpg?v=5", slug: "khoa-3d-face" },
          { name: "Camera 1080p",     image: "/img/ceramic-3-2.jpg?v=5", slug: "khoa-3d-face" },
          { name: "Pin sạc 5000 mAh", image: "/img/ceramic-3-3.jpg?v=5", slug: "khoa-3d-face" },
          { name: "Wi-Fi + 4G",        image: "/img/ceramic-3-4.jpg?v=5", slug: "khoa-3d-face" },
        ],
        sections: [
          { title: "Cảm biến", items: [
            { name: "Nhận diện 3D dot", slug: "khoa-3d-face" },
            { name: "Hồng ngoại ban đêm", slug: "khoa-3d-face" },
            { name: "Sensor vân tay phụ", slug: "khoa-3d-face" },
          ]},
          { title: "Mở khoá", items: [
            { name: "Face ID", slug: "khoa-3d-face" },
            { name: "Vân tay", slug: "khoa-3d-face" },
            { name: "Mã PIN / NFC", slug: "khoa-3d-face" },
          ]},
          { title: "Kết nối", items: [
            { name: "Wi-Fi 2.4 GHz", slug: "khoa-3d-face" },
            { name: "Bluetooth 5.0", slug: "khoa-3d-face" },
            { name: "Modul 4G phụ", slug: "khoa-3d-face" },
          ]},
        ],
      },
      {
        name: "Khoá thông minh Wi-Fi", slug: "khoa-wifi", icon: "📶",
        image: "/img/ceramic-3-2.jpg?v=5",
        tagline: "Khoá vân tay + Wi-Fi điều khiển từ xa qua app.",
        highlights: [
          { name: "App Tuya Smart",  image: "/img/ceramic-3-2.jpg?v=5", slug: "khoa-wifi" },
          { name: "Pin AA bền 1 năm", image: "/img/ceramic-3-3.jpg?v=5", slug: "khoa-wifi" },
          { name: "Mã 1 lần",         image: "/img/ceramic-3-4.jpg?v=5", slug: "khoa-wifi" },
          { name: "Khoá kép chống cạy", image: "/img/ceramic-3-5.jpg?v=5", slug: "khoa-wifi" },
        ],
        sections: [
          { title: "Mở khoá", items: [
            { name: "Vân tay", slug: "khoa-wifi" },
            { name: "Mã PIN", slug: "khoa-wifi" },
            { name: "Thẻ từ NFC", slug: "khoa-wifi" },
          ]},
          { title: "Smart home", items: [
            { name: "Tuya / Smart Life", slug: "khoa-wifi" },
            { name: "Google Home", slug: "khoa-wifi" },
            { name: "Alexa", slug: "khoa-wifi" },
          ]},
          { title: "Vật liệu vỏ", items: [
            { name: "Hợp kim Zn", slug: "khoa-wifi" },
            { name: "Thép không gỉ 304", slug: "khoa-wifi" },
            { name: "Nhôm anode", slug: "khoa-wifi" },
          ]},
        ],
      },
      {
        name: "Khoá đòn cổng Wi-Fi", slug: "khoa-don-cong-wifi", icon: "🚪",
        image: "/img/ceramic-3-3.jpg?v=5",
        tagline: "Khoá đòn cổng ngoài trời, vân tay + Wi-Fi — chuyên cho biệt thự.",
        highlights: [
          { name: "Cổng sắt biệt thự",  image: "/img/ceramic-3-3.jpg?v=5", slug: "khoa-don-cong-wifi" },
          { name: "Cổng xếp inox",      image: "/img/ceramic-3-4.jpg?v=5", slug: "khoa-don-cong-wifi" },
          { name: "Cổng trượt tự động", image: "/img/ceramic-3-5.jpg?v=5", slug: "khoa-don-cong-wifi" },
          { name: "Cổng nhôm euro",     image: "/img/ceramic-3-1.jpg?v=5", slug: "khoa-don-cong-wifi" },
        ],
        sections: [
          { title: "Mở khoá", items: [
            { name: "Vân tay", slug: "khoa-don-cong-wifi" },
            { name: "Mã số", slug: "khoa-don-cong-wifi" },
            { name: "App + remote", slug: "khoa-don-cong-wifi" },
          ]},
          { title: "IP rating", items: [
            { name: "IP65", slug: "khoa-don-cong-wifi" },
            { name: "IP67", slug: "khoa-don-cong-wifi" },
            { name: "IP68 ngâm nước", slug: "khoa-don-cong-wifi" },
          ]},
          { title: "Nguồn", items: [
            { name: "Pin alkaline", slug: "khoa-don-cong-wifi" },
            { name: "Pin lithium sạc", slug: "khoa-don-cong-wifi" },
            { name: "Năng lượng mặt trời", slug: "khoa-don-cong-wifi" },
          ]},
        ],
      },
      {
        name: "Khoá vân tay", slug: "khoa-van-tay", icon: "👆",
        image: "/img/ceramic-3-4.jpg?v=5",
        tagline: "Khoá vân tay điện tử cho cửa gỗ, cửa nhôm, cửa thép — phổ thông.",
        highlights: [
          { name: "Cửa gỗ phổ thông",  image: "/img/ceramic-3-4.jpg?v=5", slug: "khoa-van-tay" },
          { name: "Cửa nhôm Xingfa",   image: "/img/ceramic-3-5.jpg?v=5", slug: "khoa-van-tay" },
          { name: "Cửa thép chống cháy", image: "/img/ceramic-3-1.jpg?v=5", slug: "khoa-van-tay" },
          { name: "Cửa kính xoay",      image: "/img/ceramic-3-2.jpg?v=5", slug: "khoa-van-tay" },
        ],
        sections: [
          { title: "Loại cảm biến", items: [
            { name: "Điện dung", slug: "khoa-van-tay" },
            { name: "Quang học", slug: "khoa-van-tay" },
            { name: "Bán dẫn", slug: "khoa-van-tay" },
          ]},
          { title: "Mở khoá", items: [
            { name: "Vân tay (≤100)", slug: "khoa-van-tay" },
            { name: "Mã số", slug: "khoa-van-tay" },
            { name: "Chìa cơ", slug: "khoa-van-tay" },
          ]},
          { title: "Pin", items: [
            { name: "4 × AA", slug: "khoa-van-tay" },
            { name: "Pin lithium sạc", slug: "khoa-van-tay" },
            { name: "Power-bank cứu hộ USB-C", slug: "khoa-van-tay" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🛏", name: "Đồ dùng khách sạn", slug: "hotel-supplies" },
    items: [],
  },
  {
    main: { icon: "🔨", name: "Phụ kiện & Dụng cụ", slug: "hardware-tools" },
    items: [],
  },
  {
    main: { icon: "🎨", name: "Trang trí", slug: "decoration" },
    items: [],
  },
  {
    main: { icon: "🌿", name: "Ngoài trời & Sân vườn", slug: "outdoor-garden" },
    items: [],
  },
  {
    main: { icon: "⚡", name: "Điện & Thiết bị điện", slug: "electrical" },
    items: [
      {
        name: "Điều hoà", slug: "dieu-hoa", icon: "❄️",
        image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5",
        tagline: "Điều hoà inverter treo tường, âm trần, tủ đứng — đa dải công suất.",
        highlights: [
          { name: "Treo tường inverter", image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "dieu-hoa" },
          { name: "Âm trần cassette",    image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "dieu-hoa" },
          { name: "Tủ đứng công nghiệp", image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "dieu-hoa" },
          { name: "Multi-split",         image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "dieu-hoa" },
        ],
        sections: [
          { title: "Theo công suất", items: [
            { name: "9.000 BTU", slug: "dieu-hoa" },
            { name: "12.000 BTU", slug: "dieu-hoa" },
            { name: "18.000–24.000 BTU", slug: "dieu-hoa" },
          ]},
          { title: "Theo kiểu lắp", items: [
            { name: "Treo tường", slug: "dieu-hoa" },
            { name: "Âm trần", slug: "dieu-hoa" },
            { name: "Tủ đứng", slug: "dieu-hoa" },
          ]},
          { title: "Công nghệ", items: [
            { name: "Inverter R32", slug: "dieu-hoa" },
            { name: "Wi-Fi điều khiển", slug: "dieu-hoa" },
            { name: "Lọc PM2.5", slug: "dieu-hoa" },
          ]},
        ],
      },
      {
        name: "Tủ lạnh", slug: "tu-lanh", icon: "🧊",
        image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5",
        tagline: "Tủ lạnh side-by-side, French door, mini bar — báo giá theo lô FCL.",
        highlights: [
          { name: "Side-by-side",  image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "tu-lanh" },
          { name: "French door",   image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "tu-lanh" },
          { name: "Ngăn đá trên",  image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "tu-lanh" },
          { name: "Mini bar",      image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "tu-lanh" },
        ],
        sections: [
          { title: "Theo dung tích", items: [
            { name: "< 200L", slug: "tu-lanh" },
            { name: "200–400L", slug: "tu-lanh" },
            { name: "> 500L", slug: "tu-lanh" },
          ]},
          { title: "Theo kiểu", items: [
            { name: "Side-by-side", slug: "tu-lanh" },
            { name: "French door", slug: "tu-lanh" },
            { name: "Multi-door", slug: "tu-lanh" },
          ]},
          { title: "Tính năng", items: [
            { name: "Inverter tiết kiệm", slug: "tu-lanh" },
            { name: "No-frost", slug: "tu-lanh" },
            { name: "Smart Wi-Fi", slug: "tu-lanh" },
          ]},
        ],
      },
      {
        name: "Máy giặt", slug: "may-giat", icon: "🧺",
        image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5",
        tagline: "Máy giặt cửa trước, cửa trên, sấy khô — full hộ gia đình & khách sạn.",
        highlights: [
          { name: "Cửa trước inverter",  image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "may-giat" },
          { name: "Cửa trên",            image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "may-giat" },
          { name: "Giặt sấy combo",      image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "may-giat" },
          { name: "Công nghiệp khách sạn", image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "may-giat" },
        ],
        sections: [
          { title: "Theo tải", items: [
            { name: "7–9 kg", slug: "may-giat" },
            { name: "10–12 kg", slug: "may-giat" },
            { name: "Công nghiệp >15 kg", slug: "may-giat" },
          ]},
          { title: "Loại", items: [
            { name: "Cửa trước", slug: "may-giat" },
            { name: "Cửa trên", slug: "may-giat" },
            { name: "Giặt sấy combo", slug: "may-giat" },
          ]},
          { title: "Tính năng", items: [
            { name: "Inverter", slug: "may-giat" },
            { name: "Hơi nước diệt khuẩn", slug: "may-giat" },
            { name: "Wi-Fi điều khiển", slug: "may-giat" },
          ]},
        ],
      },
      {
        name: "Máy sưởi", slug: "may-suoi", icon: "🔥",
        image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5",
        tagline: "Máy sưởi dầu, halogen, quạt — công suất 1500–2500 W.",
        highlights: [
          { name: "Sưởi dầu 9 thanh",  image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "may-suoi" },
          { name: "Halogen tháp",      image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "may-suoi" },
          { name: "Quạt sưởi mini",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "may-suoi" },
          { name: "Carbon hồng ngoại", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "may-suoi" },
        ],
        sections: [
          { title: "Loại", items: [
            { name: "Sưởi dầu", slug: "may-suoi" },
            { name: "Halogen tháp", slug: "may-suoi" },
            { name: "Quạt sưởi", slug: "may-suoi" },
          ]},
          { title: "Công suất", items: [
            { name: "1500 W", slug: "may-suoi" },
            { name: "2000 W", slug: "may-suoi" },
            { name: "2500 W", slug: "may-suoi" },
          ]},
          { title: "Tính năng", items: [
            { name: "Hẹn giờ tự tắt", slug: "may-suoi" },
            { name: "Điều khiển từ xa", slug: "may-suoi" },
            { name: "Chống nổ quá nhiệt", slug: "may-suoi" },
          ]},
        ],
      },
      {
        name: "Bình nóng lạnh", slug: "binh-nong-lanh", icon: "🚿",
        image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5",
        tagline: "Bình nóng lạnh trực tiếp, gián tiếp, năng lượng mặt trời.",
        highlights: [
          { name: "Trực tiếp 3500W",     image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "binh-nong-lanh" },
          { name: "Gián tiếp 30L",       image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "binh-nong-lanh" },
          { name: "Năng lượng mặt trời", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "binh-nong-lanh" },
          { name: "Heat-pump",           image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "binh-nong-lanh" },
        ],
        sections: [
          { title: "Loại", items: [
            { name: "Trực tiếp", slug: "binh-nong-lanh" },
            { name: "Gián tiếp", slug: "binh-nong-lanh" },
            { name: "Năng lượng mặt trời", slug: "binh-nong-lanh" },
          ]},
          { title: "Dung tích", items: [
            { name: "15–20L", slug: "binh-nong-lanh" },
            { name: "30L", slug: "binh-nong-lanh" },
            { name: "50L+ khách sạn", slug: "binh-nong-lanh" },
          ]},
          { title: "Vật liệu", items: [
            { name: "Lòng tráng men", slug: "binh-nong-lanh" },
            { name: "Lòng inox", slug: "binh-nong-lanh" },
            { name: "Lòng đồng", slug: "binh-nong-lanh" },
          ]},
        ],
      },
      {
        name: "Dây điện & Cáp", slug: "day-dien-cap", icon: "🔌",
        image: "/img/ceramic-4-1.jpg?v=5",
        tagline: "Dây điện đơn lõi, đa lõi, cáp điều khiển — đồng nguyên chất, CB EN.",
        highlights: [
          { name: "Đơn lõi 1.5–4 mm²",  image: "/img/ceramic-4-1.jpg?v=5", slug: "day-dien-cap" },
          { name: "Đa lõi mềm 2.5–10",   image: "/img/ceramic-4-2.jpg?v=5", slug: "day-dien-cap" },
          { name: "Cáp lực 25–95 mm²",   image: "/img/ceramic-4-3.jpg?v=5", slug: "day-dien-cap" },
          { name: "Cáp điều khiển CY",    image: "/img/ceramic-4-4.jpg?v=5", slug: "day-dien-cap" },
        ],
        sections: [
          { title: "Theo tiết diện", items: [
            { name: "1.5 mm²", slug: "day-dien-cap" },
            { name: "2.5 mm²", slug: "day-dien-cap" },
            { name: "4–10 mm²", slug: "day-dien-cap" },
          ]},
          { title: "Theo loại", items: [
            { name: "Đơn cứng VCm", slug: "day-dien-cap" },
            { name: "Đa lõi mềm", slug: "day-dien-cap" },
            { name: "Chống cháy LSZH", slug: "day-dien-cap" },
          ]},
          { title: "Tiêu chuẩn", items: [
            { name: "IEC 60227", slug: "day-dien-cap" },
            { name: "EN 50525", slug: "day-dien-cap" },
            { name: "TCVN 5934", slug: "day-dien-cap" },
          ]},
        ],
      },
      {
        name: "Ống dẫn", slug: "ong-dan-dien", icon: "📏",
        image: "/img/ceramic-4-2.jpg?v=5",
        tagline: "Ống luồn dây PVC, PE, kim loại — chống cháy + chịu lực.",
        highlights: [
          { name: "Ống PVC trắng",   image: "/img/ceramic-4-2.jpg?v=5", slug: "ong-dan-dien" },
          { name: "Ống PE đàn hồi",  image: "/img/ceramic-4-3.jpg?v=5", slug: "ong-dan-dien" },
          { name: "Ống thép GI",     image: "/img/ceramic-4-4.jpg?v=5", slug: "ong-dan-dien" },
          { name: "Ống nhôm gập",    image: "/img/ceramic-4-5.jpg?v=5", slug: "ong-dan-dien" },
        ],
        sections: [
          { title: "Vật liệu", items: [
            { name: "PVC cứng", slug: "ong-dan-dien" },
            { name: "PE đàn hồi", slug: "ong-dan-dien" },
            { name: "Thép GI mạ kẽm", slug: "ong-dan-dien" },
          ]},
          { title: "Đường kính", items: [
            { name: "Ø16 mm", slug: "ong-dan-dien" },
            { name: "Ø20 mm", slug: "ong-dan-dien" },
            { name: "Ø25–32 mm", slug: "ong-dan-dien" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Co nối T/L", slug: "ong-dan-dien" },
            { name: "Hộp âm tường", slug: "ong-dan-dien" },
            { name: "Đai treo trần", slug: "ong-dan-dien" },
          ]},
        ],
      },
      {
        name: "Máng dây điện", slug: "mang-day-dien", icon: "🛤️",
        image: "/img/ceramic-4-3.jpg?v=5",
        tagline: "Máng cáp tôn, inox, nhôm — đi dây hành lang nhà xưởng + văn phòng.",
        highlights: [
          { name: "Máng tôn sơn epoxy", image: "/img/ceramic-4-3.jpg?v=5", slug: "mang-day-dien" },
          { name: "Máng inox 304",       image: "/img/ceramic-4-4.jpg?v=5", slug: "mang-day-dien" },
          { name: "Thang cáp galvanize",  image: "/img/ceramic-4-5.jpg?v=5", slug: "mang-day-dien" },
          { name: "Máng nhựa cong",       image: "/img/ceramic-4-1.jpg?v=5", slug: "mang-day-dien" },
        ],
        sections: [
          { title: "Vật liệu", items: [
            { name: "Tôn sơn epoxy", slug: "mang-day-dien" },
            { name: "Inox 304", slug: "mang-day-dien" },
            { name: "Mạ kẽm nhúng nóng", slug: "mang-day-dien" },
          ]},
          { title: "Kiểu", items: [
            { name: "Máng kín", slug: "mang-day-dien" },
            { name: "Máng có lỗ", slug: "mang-day-dien" },
            { name: "Thang cáp công nghiệp", slug: "mang-day-dien" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Co T/Y", slug: "mang-day-dien" },
            { name: "Nắp đậy", slug: "mang-day-dien" },
            { name: "Giá đỡ treo trần", slug: "mang-day-dien" },
          ]},
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
