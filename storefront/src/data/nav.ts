// Navigation constants (HOT_SEARCHES, NAV_CATEGORIES, NavSubItem, NAV_MENU).
// FREE of any @/data/partners import so client components (sticky-header)
// can import these WITHOUT dragging the ~1.5MB product catalog into client JS.

export const HOT_SEARCHES = [
  "gạch porcelain",
  "tấm đá marble khổ lớn",
  "bộ sofa",
  "tủ bếp",
  "sàn gỗ công nghiệp",
  "giường khách sạn",
];

export const NAV_CATEGORIES = [
  { icon: "🏠", name: "Nhà cửa & Sân vườn", slug: "home-garden" },
  { icon: "🧱", name: "Vật liệu xây dựng", slug: "construction-materials" },
  { icon: "🚿", name: "Thiết bị vệ sinh", slug: "bathroom-sanitary" },
  { icon: "🛋", name: "Nội thất", slug: "noi-that" },
  { icon: "🍳", name: "Thiết bị bếp", slug: "kitchen-equipment" },
  { icon: "💡", name: "Đèn chiếu sáng", slug: "lighting" },
  { icon: "🪟", name: "Cửa & Khoá", slug: "doors-windows" },
  { icon: "⚡", name: "Điện & Điện gia dụng", slug: "electrical" },
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
    main: { icon: "🏠", name: "Nhà cửa & Sân vườn", slug: "home-garden" },
    items: [
      {
        name: "Thang máy", slug: "thang-may", icon: "🛗",
        image: "/img/nm-home-garden-0.jpg?v=8",
        tagline: "Thang máy chở khách / thang cuốn / thang chống cháy — đầy đủ tải trọng và ứng dụng.",
        highlights: [
          { name: "Thang máy chở khách",       image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "thang-may-cho-khach" },
          { name: "Thang cuốn",                image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "thang-cuon" },
          { name: "Thang chống cháy",      image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "thang-chong-chay" },
          { name: "Thang máy 6 người",        image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "thang-may-cho-khach" },
          { name: "Thang máy 13 người",       image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "thang-may-cho-khach" },
          { name: "Thang cuốn sân bay",        image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "thang-cuon" },
        ],
        sections: [
          { title: "Thang máy chở khách", items: [
            { name: "Cabin 6 người (450 kg)", slug: "thang-may-cho-khach" },
            { name: "Cabin 13 người (1000 kg)", slug: "thang-may-cho-khach" },
            { name: "Cabin 21 người (1600 kg)", slug: "thang-may-cho-khach" },
            { name: "Tốc độ 1.0–2.5 m/s", slug: "thang-may-cho-khach" },
          ]},
          { title: "Thang cuốn", items: [
            { name: "Bề rộng bậc 600–1000 mm", slug: "thang-cuon" },
            { name: "Độ nghiêng 30° / 35°", slug: "thang-cuon" },
            { name: "Trung tâm thương mại", slug: "thang-cuon" },
            { name: "Sân bay / tàu điện", slug: "thang-cuon" },
          ]},
          { title: "Thang chống cháy", items: [
            { name: "Cabin chống cháy 120 phút", slug: "thang-chong-chay" },
            { name: "Cửa chịu nhiệt", slug: "thang-chong-chay" },
            { name: "Nguồn UPS dự phòng", slug: "thang-chong-chay" },
            { name: "EN 81-72 / TCVN 6396", slug: "thang-chong-chay" },
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
        image: "/img/nm-construction-materials-0.jpg?v=8",
        tagline: "Thép hình H/I/U/V, ống thép, tấm thép, tôn lạnh phủ màu — báo giá theo tấn FOB Quảng Châu.",
        highlights: [
          { name: "Thép hình H/I/U/V",  image: "/img/thep-hinh-h-i-u-v.jpg?v=6", slug: "ket-cau-thep-khung" },
          { name: "Ống thép đen / mạ kẽm",  image: "/img/ceramic-1-2.jpg?v=6", slug: "ket-cau-thep-khung" },
          { name: "Tấm thép cuộn",      image: "/img/ceramic-1-3.jpg?v=6", slug: "ket-cau-thep-khung" },
          { name: "Thép hộp",      image: "/img/ceramic-1-4.jpg?v=6", slug: "ket-cau-thep-khung" },
          { name: "Tôn lạnh phủ màu",     image: "/img/ceramic-1-5.jpg?v=6", slug: "ton-lanh" },
          { name: "Thép chữ I",   image: "/img/cer3.jpg?v=6", slug: "ket-cau-thep-khung" },
        ],
        sections: [
          { title: "Thép", items: [
            { name: "Tôn lạnh phủ màu", slug: "ton-lanh" },
            { name: "Thép chữ I", slug: "ket-cau-thep-khung" },
          ]},
          { title: "Theo hình dạng", items: [
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
            { name: "Bu lông neo M16+", slug: "ket-cau-thep-khung" },
            { name: "Bu lông cường độ cao", slug: "ket-cau-thep-khung" },
            { name: "Lưới thép hàn", slug: "ket-cau-thep-khung" },
            { name: "Đinh tán thép", slug: "ket-cau-thep-khung" },
          ]},
        ],
      },
      {
        name: "Tấm ốp tường & trần", slug: "tam-op-tuong-tran", icon: "🟦",
        image: "/img/nm-construction-materials-1.jpg?v=8",
        tagline: "Tấm porcelain, gốm sứ, MDF — thiết kế nội thất cho khách sạn và biệt thự.",
        highlights: [
          { name: "Tấm porcelain khổ lớn",  image: "/img/cer6.jpg?v=6", slug: "tam-op-tuong-tran" },
          { name: "Tấm ốp tường 3D",       image: "/img/cer4.jpg?v=6", slug: "tam-op-tuong-tran" },
          { name: "Trần thạch cao",     image: "/img/cer5.jpg?v=6", slug: "tam-op-tuong-tran" },
          { name: "Ốp gỗ MDF",          image: "/img/cer8.jpg?v=6", slug: "tam-op-tuong-tran" },
          { name: "Tấm cách âm",  image: "/img/cer3.jpg?v=6", slug: "tam-cach-am" },
          { name: "Gạch ALC", image: "/img/cer2.jpg?v=6", slug: "gach-alc-acc" },
        ],
        sections: [
          { title: "Vật liệu tường", items: [
            { name: "Tấm cách âm", slug: "tam-cach-am" },
            { name: "Gạch ALC / ACC", slug: "gach-alc-acc" },
          ]},
          { title: "Tấm ốp tường", items: [
            { name: "Tấm porcelain khổ lớn", slug: "tam-op-tuong-tran" },
            { name: "Tấm PVC 3D", slug: "tam-op-tuong-tran" },
            { name: "Tấm composite", slug: "tam-op-tuong-tran" },
            { name: "Tấm acrylic bóng", slug: "tam-op-tuong-tran" },
          ]},
          { title: "Trần thạch cao", items: [
            { name: "Trần chìm phẳng", slug: "tam-op-tuong-tran" },
            { name: "Trần thả 60×60", slug: "tam-op-tuong-tran" },
            { name: "Trần thả 60×120", slug: "tam-op-tuong-tran" },
            { name: "Trần nano đục lỗ", slug: "tam-op-tuong-tran" },
          ]},
          { title: "Ốp gỗ trang trí", items: [
            { name: "MDF veneer sồi", slug: "tam-op-tuong-tran" },
            { name: "HDF chống ẩm", slug: "tam-op-tuong-tran" },
            { name: "Gỗ nhựa WPC", slug: "tam-op-tuong-tran" },
            { name: "Phào chỉ gỗ thông", slug: "tam-op-tuong-tran" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Khung xương mạ kẽm", slug: "tam-op-tuong-tran" },
            { name: "Keo dán tấm ốp", slug: "tam-op-tuong-tran" },
            { name: "Đèn LED âm", slug: "tam-op-tuong-tran" },
            { name: "Phào chỉ PVC", slug: "tam-op-tuong-tran" },
          ]},
        ],
      },
      {
        name: "Vật liệu lát sàn", slug: "vat-lieu-lat-san", icon: "🟫",
        image: "/img/nm-construction-materials-2.jpg?v=8",
        tagline: "Sàn SPC + LVT, gỗ tự nhiên, gạch lát nền — DDP trong 18 ngày.",
        highlights: [
          { name: "Sàn SPC + LVT",          image: "/img/cer7.jpg?v=6", slug: "san-go-spc-lvt" },
          { name: "Sàn gỗ kỹ thuật", image: "/img/cer8.jpg?v=6", slug: "san-go-engineered" },
          { name: "Sàn gỗ tự nhiên",   image: "/img/cer2.jpg?v=6", slug: "san-go-tu-nhien" },
          { name: "Gạch lát nền",          image: "/img/cer1.jpg?v=6", slug: "gach-op-lat" },
          { name: "Tấm đá granite",            image: "/img/da-granite-tu-nhien.jpg?v=6", slug: "vat-lieu-lat-san" },
          { name: "Sàn ngoài trời",            image: "/img/cer5.jpg?v=6", slug: "vat-lieu-lat-san" },
        ],
        sections: [
          { title: "Sàn gỗ", items: [
            { name: "Sàn SPC + LVT", slug: "san-go-spc-lvt" },
            { name: "Sàn gỗ kỹ thuật nhiều lớp", slug: "san-go-engineered" },
            { name: "Sàn gỗ cứng tự nhiên", slug: "san-go-tu-nhien" },
          ]},
          { title: "Vật liệu lát sàn", items: [
            { name: "Gạch lát nền", slug: "gach-op-lat" },
          ]},
          { title: "Gạch porcelain", items: [
            { name: "Bóng kính", slug: "vat-lieu-lat-san" },
            { name: "Mờ nhám", slug: "vat-lieu-lat-san" },
            { name: "Vân 3D", slug: "vat-lieu-lat-san" },
            { name: "Mosaic", slug: "vat-lieu-lat-san" },
          ]},
          { title: "Sàn gỗ", items: [
            { name: "Kỹ thuật 3 lớp", slug: "vat-lieu-lat-san" },
            { name: "Laminate AC4", slug: "vat-lieu-lat-san" },
            { name: "Vinyl SPC", slug: "vat-lieu-lat-san" },
            { name: "Tre carbon hoá", slug: "vat-lieu-lat-san" },
          ]},
          { title: "Đá tự nhiên", items: [
            { name: "Đá marble Carrara", slug: "vat-lieu-lat-san" },
            { name: "Đá granite đen", slug: "vat-lieu-lat-san" },
            { name: "Đá travertine", slug: "vat-lieu-lat-san" },
            { name: "Đá phiến đen Trung Quốc", slug: "vat-lieu-lat-san" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Phào chân tường", slug: "vat-lieu-lat-san" },
            { name: "Nẹp ngạch cửa", slug: "vat-lieu-lat-san" },
            { name: "Keo dán sàn", slug: "vat-lieu-lat-san" },
            { name: "Lớp lót sàn", slug: "vat-lieu-lat-san" },
          ]},
        ],
      },
      {
        name: "Đá tự nhiên & Đá nhân tạo", slug: "da-op-lat", icon: "⛰️",
        image: "/img/nm-construction-materials-3.jpg?v=8",
        tagline: "Đá marble Phúc Kiến, granite, thạch anh — tấm lớn cho mặt bếp và sảnh.",
        highlights: [
          { name: "Đá marble tự nhiên",                  image: "/img/da-marble-tu-nhien.jpg?v=6", slug: "da-op-lat" },
          { name: "Tấm đá granite",                      image: "/img/da-granite-tu-nhien.jpg?v=6", slug: "da-op-lat" },
          { name: "Đá thạch anh tự nhiên",  image: "/img/da-quartz-nhan-tao.jpg?v=6", slug: "da-thach-anh-tu-nhien" },
          { name: "Đá thạch anh nhân tạo", image: "/img/da-mosaic-trang-tri.jpg?v=6", slug: "da-thach-anh-nhan-tao" },
          { name: "Đá mài vô cơ terrazzo",     image: "/img/da-op-ngoai-that.jpg?v=6", slug: "da-mai-vo-co" },
          { name: "Đá thiêu kết",                       image: "/img/da-sintered-da-thieu-ket.jpg?v=6", slug: "da-op-lat" },
        ],
        sections: [
          { title: "Đá chuyên dụng", items: [
            { name: "Đá thạch anh tự nhiên", slug: "da-thach-anh-tu-nhien" },
            { name: "Đá thạch anh / marble nhân tạo", slug: "da-thach-anh-nhan-tao" },
            { name: "Đá mài vô cơ terrazzo", slug: "da-mai-vo-co" },
          ]},
          { title: "Đá marble tự nhiên", items: [
            { name: "Carrara trắng", slug: "da-op-lat" },
            { name: "Marquina đen", slug: "da-op-lat" },
            { name: "Vàng be", slug: "da-op-lat" },
            { name: "Hồng Rosa Portugal", slug: "da-op-lat" },
          ]},
          { title: "Granite", items: [
            { name: "Đen tuyền", slug: "da-op-lat" },
            { name: "Đỏ Brazil", slug: "da-op-lat" },
            { name: "Xám Sardo", slug: "da-op-lat" },
            { name: "Vàng nhiệt đới", slug: "da-op-lat" },
          ]},
          { title: "Đá nhân tạo", items: [
            { name: "Thạch anh vân marble", slug: "da-op-lat" },
            { name: "Thạch anh vân kim loại", slug: "da-op-lat" },
            { name: "Bề mặt acrylic đặc", slug: "da-op-lat" },
            { name: "Terrazzo nhân tạo", slug: "da-op-lat" },
          ]},
          { title: "Đá thiêu kết", items: [
            { name: "Neolith", slug: "da-op-lat" },
            { name: "Dekton", slug: "da-op-lat" },
            { name: "Lapitec", slug: "da-op-lat" },
            { name: "MaxFine", slug: "da-op-lat" },
          ]},
        ],
      },
      {
        name: "Sơn & Lớp phủ", slug: "son-lop-phu", icon: "🎨",
        image: "/img/nm-construction-materials-4.jpg?v=8",
        tagline: "Sơn sàn epoxy, sơn chống cháy, vữa trang trí — đạt tiêu chuẩn QCVN.",
        highlights: [
          { name: "Sơn tường nội thất / nghệ thuật", image: "/img/son-epoxy-san.jpg?v=6", slug: "son-tuong-trong-nghe-thuat" },
          { name: "Sơn ngoại thất vân đá",  image: "/img/ceramic-2-1.jpg?v=6", slug: "son-mat-tuong-ngoai" },
          { name: "Keo dán gạch",                     image: "/img/ceramic-2-2.jpg?v=6", slug: "keo-gach-op" },
          { name: "Keo chà mạch trang trí",         image: "/img/ceramic-2-3.jpg?v=6", slug: "keo-chit-mach" },
          { name: "Sơn chống thấm",                image: "/img/ceramic-2-5.jpg?v=6", slug: "son-chong-tham" },
          { name: "Sơn sàn epoxy",                            image: "/img/ceramic-2-4.jpg?v=6", slug: "son-lop-phu" },
        ],
        sections: [
          { title: "Sơn", items: [
            { name: "Sơn latex nội thất / nghệ thuật", slug: "son-tuong-trong-nghe-thuat" },
            { name: "Sơn ngoại thất vân đá", slug: "son-mat-tuong-ngoai" },
            { name: "Keo dán gạch", slug: "keo-gach-op" },
            { name: "Keo chà mạch trang trí", slug: "keo-chit-mach" },
            { name: "Sơn chống thấm", slug: "son-chong-tham" },
          ]},
          { title: "Sơn nội thất", items: [
            { name: "Sơn lót chống kiềm", slug: "son-lop-phu" },
            { name: "Sơn phủ bóng", slug: "son-lop-phu" },
            { name: "Sơn tạo vân", slug: "son-lop-phu" },
            { name: "Sơn chống nấm mốc", slug: "son-lop-phu" },
          ]},
          { title: "Sơn ngoại thất", items: [
            { name: "Sơn nano siêu bền", slug: "son-lop-phu" },
            { name: "Sơn phản nhiệt", slug: "son-lop-phu" },
            { name: "Sơn kẻ đường / vạch", slug: "son-lop-phu" },
            { name: "Sơn sàn epoxy", slug: "son-lop-phu" },
          ]},
          { title: "Sơn chuyên dụng", items: [
            { name: "Sơn chống cháy", slug: "son-lop-phu" },
            { name: "Sơn chống thấm", slug: "son-lop-phu" },
            { name: "Sơn chống tĩnh điện", slug: "son-lop-phu" },
            { name: "Sơn cách nhiệt", slug: "son-lop-phu" },
          ]},
          { title: "Phụ kiện sơn", items: [
            { name: "Băng keo che", slug: "son-lop-phu" },
            { name: "Con lăn / cọ sơn", slug: "son-lop-phu" },
            { name: "Bạt phủ bảo vệ sàn", slug: "son-lop-phu" },
            { name: "Bột bả tường", slug: "son-lop-phu" },
          ]},
        ],
      },
      {
        name: "Vật liệu cách âm & cách nhiệt", slug: "vat-lieu-cach-am-cach-nhiet", icon: "🧊",
        image: "/img/nm-construction-materials-5.jpg?v=8",
        tagline: "Bông khoáng, EPS/XPS, mút cao su — cho phòng karaoke, nhà xưởng, kho lạnh.",
        highlights: [
          { name: "Bông khoáng Rockwool", image: "/img/bong-khoang-rockwool.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Tấm cách âm tường",   image: "/img/tam-cach-am.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Bông thuỷ tinh",      image: "/img/bong-thuy-tinh-cach-nhiet.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Bông polyester",      image: "/img/bong-polyester.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Tấm EPS/XPS",         image: "/img/ceramic-3-1.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Màng cách nhiệt",     image: "/img/ceramic-3-2.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
        ],
        sections: [
          { title: "Bông khoáng", items: [
            { name: "Tấm bông khoáng Rockwool", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Cuộn bông thuỷ tinh", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Bông gốm chịu nhiệt", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Bông silica aerogel", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "Mút xốp", items: [
            { name: "Cuộn mút PE", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Mút PU phun", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Mút phenolic", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "EPP đúc khuôn", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "EPS / XPS", items: [
            { name: "Tấm EPS tiêu chuẩn", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Tấm XPS chịu nén", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Tấm EPS SIP đúc khuôn", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "XPS lợp mái", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "Phụ kiện cách nhiệt", items: [
            { name: "Màng nhôm phản nhiệt", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Keo dán bông cách nhiệt", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Thanh giằng / khung mạ kẽm", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Vít neo chuyên dụng", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
        ],
      },
      {
        name: "Chống thấm", slug: "vat-lieu-chong-tham", icon: "💧",
        image: "/img/nm-construction-materials-6.jpg?v=8",
        tagline: "Màng bitum tự dính, lớp phủ polyurethane, keo PU — bảo hành 10–15 năm.",
        highlights: [
          { name: "Màng bitum tự dính",  image: "/img/mang-chong-tham-bitum.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "Lớp phủ chống thấm PU",   image: "/img/ceramic-4-1.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "Keo silicone",        image: "/img/ceramic-4-2.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "Phụ gia xi măng",     image: "/img/ceramic-4-3.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "Băng cản nước PVC",   image: "/img/ceramic-4-4.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "Vữa chống thấm",      image: "/img/ceramic-4-5.jpg?v=6", slug: "vat-lieu-chong-tham" },
        ],
        sections: [
          { title: "Màng bitum", items: [
            { name: "SBS tự dính", slug: "vat-lieu-chong-tham" },
            { name: "APP khò nhiệt", slug: "vat-lieu-chong-tham" },
            { name: "Cuộn dày 3mm", slug: "vat-lieu-chong-tham" },
            { name: "Cuộn dày 4mm", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "Lớp phủ chống thấm", items: [
            { name: "PU đàn hồi 1 thành phần", slug: "vat-lieu-chong-tham" },
            { name: "PU đàn hồi 2 thành phần", slug: "vat-lieu-chong-tham" },
            { name: "Acrylic gốc nước", slug: "vat-lieu-chong-tham" },
            { name: "Polyurea phun áp lực cao", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "Keo & Phụ gia", items: [
            { name: "Silicone trung tính", slug: "vat-lieu-chong-tham" },
            { name: "MS Polymer", slug: "vat-lieu-chong-tham" },
            { name: "Phụ gia chống thấm xi măng", slug: "vat-lieu-chong-tham" },
            { name: "Vữa chống thấm 2 thành phần", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "Phụ kiện thi công", items: [
            { name: "Băng cản nước PVC", slug: "vat-lieu-chong-tham" },
            { name: "Lưới sợi gia cường", slug: "vat-lieu-chong-tham" },
            { name: "Băng keo butyl", slug: "vat-lieu-chong-tham" },
            { name: "Vữa không co ngót", slug: "vat-lieu-chong-tham" },
          ]},
        ],
      },
      {
        name: "Xi măng & Vữa", slug: "vat-lieu-kho-xi-mang-vua", icon: "🏗️",
        image: "/img/nm-construction-materials-7.jpg?v=8",
        tagline: "Xi măng Hà Tiên, vữa khô trộn sẵn, phụ gia bê tông — giao tận công trình.",
        highlights: [
          { name: "Xi măng đa dụng",     image: "/img/chau-xi-mang.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Vữa trộn sẵn",        image: "/img/ceramic-5-1.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Phụ gia bê tông",     image: "/img/ceramic-5-2.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Vữa không co ngót",  image: "/img/ceramic-5-3.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Keo dán gạch",        image: "/img/ceramic-5-4.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Vữa chịu axit",      image: "/img/ceramic-5-5.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
        ],
        sections: [
          { title: "Xi măng bao", items: [
            { name: "PCB30 đa dụng", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCB40 chịu nén cao", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCB50 cường độ cao", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Xi măng trắng", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "Vữa khô trộn sẵn", items: [
            { name: "Vữa xây & trát", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Vữa kết dính", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Vữa hoàn thiện", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Vữa tự san phẳng", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "Phụ gia bê tông", items: [
            { name: "Đông kết nhanh", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Đông kết chậm", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Phụ gia siêu dẻo PCE", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Chống thấm bê tông", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "Keo dán & Vữa chà", items: [
            { name: "Keo dán gạch 1 thành phần", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Keo dán gạch 2 thành phần", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Keo chà ron epoxy", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Keo chà ron xi măng chống mốc", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🚿", name: "Thiết bị vệ sinh", slug: "bathroom-sanitary" },
    items: [
      {
        name: "Bồn cầu sứ", slug: "bon-cau-su", icon: "🚽",
        image: "/img/nm-bathroom-sanitary-0.jpg?v=8",
        tagline: "Bồn cầu một khối, hai khối, treo tường — sứ tráng men, xả siphon êm.",
        highlights: [
          { name: "Bồn cầu một khối xả siphon",  image: "/img/bathroom-1-1.jpg?v=6", slug: "bon-cau-su" },
          { name: "Bồn cầu hai khối tiêu chuẩn", image: "/img/bathroom-1-2.jpg?v=6", slug: "bon-cau-su" },
          { name: "Bồn cầu treo tường",       image: "/img/bathroom-1-3.jpg?v=6", slug: "bon-cau-su" },
          { name: "Bồn cầu xổm sứ",            image: "/img/bathroom-1-4.jpg?v=6", slug: "bon-cau-su" },
        ],
        sections: [
          { title: "Kiểu xả", items: [
            { name: "Siphon êm", slug: "bon-cau-su" },
            { name: "Xả thẳng", slug: "bon-cau-su" },
            { name: "Xả áp lực", slug: "bon-cau-su" },
          ]},
          { title: "Kiểu lắp đặt", items: [
            { name: "Một khối", slug: "bon-cau-su" },
            { name: "Hai khối có két", slug: "bon-cau-su" },
            { name: "Treo tường", slug: "bon-cau-su" },
          ]},
          { title: "Tiêu chuẩn nước", items: [
            { name: "Tiết kiệm nước 3/6L", slug: "bon-cau-su" },
            { name: "WaterSense", slug: "bon-cau-su" },
            { name: "CUPC", slug: "bon-cau-su" },
          ]},
        ],
      },
      {
        name: "Bồn cầu thông minh", slug: "bon-cau-thong-minh", icon: "🤖",
        image: "/img/nm-bathroom-sanitary-1.jpg?v=8",
        tagline: "Bồn cầu thông minh có rửa + sấy + ghế sưởi + khử mùi tự động.",
        highlights: [
          { name: "Một khối thông minh",   image: "/img/bathroom-2-1.jpg?v=6", slug: "bon-cau-thong-minh" },
          { name: "Nắp rửa thông minh lắp thêm",         image: "/img/bathroom-2-2.jpg?v=6", slug: "bon-cau-thong-minh" },
          { name: "Treo tường thông minh", image: "/img/bathroom-2-3.jpg?v=6", slug: "bon-cau-thong-minh" },
          { name: "Cao cấp chuẩn Nhật",   image: "/img/bathroom-2-4.jpg?v=6", slug: "bon-cau-thong-minh" },
        ],
        sections: [
          { title: "Tính năng", items: [
            { name: "Rửa nước ấm", slug: "bon-cau-thong-minh" },
            { name: "Sấy khô", slug: "bon-cau-thong-minh" },
            { name: "Ghế sưởi + khử mùi", slug: "bon-cau-thong-minh" },
          ]},
          { title: "Điều khiển", items: [
            { name: "Cảm biến tiệm cận", slug: "bon-cau-thong-minh" },
            { name: "Điều khiển hồng ngoại", slug: "bon-cau-thong-minh" },
            { name: "Bảng cạnh + giọng nói", slug: "bon-cau-thong-minh" },
          ]},
          { title: "Tiết kiệm điện", items: [
            { name: "Xả siêu tiết kiệm 3L", slug: "bon-cau-thong-minh" },
            { name: "Chế độ Eco", slug: "bon-cau-thong-minh" },
            { name: "Tự ngắt nguồn", slug: "bon-cau-thong-minh" },
          ]},
        ],
      },
      {
        name: "Lavabo sứ", slug: "lavabo-su", icon: "🪣",
        image: "/img/nm-bathroom-sanitary-2.jpg?v=8",
        tagline: "Lavabo sứ treo tường, âm bàn và đặt bàn — nhiều kiểu dáng.",
        highlights: [
          { name: "Đặt bàn tròn",   image: "/img/bathroom-3-1.jpg?v=6", slug: "lavabo-su" },
          { name: "Treo tường",     image: "/img/bathroom-3-2.jpg?v=6", slug: "lavabo-su" },
          { name: "Chậu đặt bàn", image: "/img/bathroom-3-3.jpg?v=6", slug: "lavabo-su" },
          { name: "Âm bàn",          image: "/img/bathroom-3-4.jpg?v=6", slug: "lavabo-su" },
        ],
        sections: [
          { title: "Kiểu lắp đặt", items: [
            { name: "Đặt bàn", slug: "lavabo-su" },
            { name: "Treo tường", slug: "lavabo-su" },
            { name: "Âm bàn", slug: "lavabo-su" },
          ]},
          { title: "Chất liệu", items: [
            { name: "Sứ vệ sinh", slug: "lavabo-su" },
            { name: "Composite", slug: "lavabo-su" },
            { name: "Đá nhân tạo", slug: "lavabo-su" },
          ]},
          { title: "Bề mặt", items: [
            { name: "Men trắng cổ điển", slug: "lavabo-su" },
            { name: "Men đen mờ", slug: "lavabo-su" },
            { name: "Bề mặt nghệ thuật vân đá", slug: "lavabo-su" },
          ]},
        ],
      },
      {
        name: "Tủ phòng tắm", slug: "tu-phong-tam", icon: "🪞",
        image: "/img/nm-bathroom-sanitary-3.jpg?v=8",
        tagline: "Tủ lavabo + gương + đèn — gỗ chống nước + inox.",
        highlights: [
          { name: "Tủ 600 mm",       image: "/img/bathroom-4-1.jpg?v=6", slug: "tu-phong-tam" },
          { name: "Tủ 800 mm kèm gương", image: "/img/bathroom-4-2.jpg?v=6", slug: "tu-phong-tam" },
          { name: "Tủ đôi 1200 mm",   image: "/img/bathroom-4-3.jpg?v=6", slug: "tu-phong-tam" },
          { name: "Tủ inox 304",       image: "/img/bathroom-4-4.jpg?v=6", slug: "tu-phong-tam" },
        ],
        sections: [
          { title: "Chất liệu", items: [
            { name: "Gỗ dán phủ melamine", slug: "tu-phong-tam" },
            { name: "PVC chống nước", slug: "tu-phong-tam" },
            { name: "Inox 304", slug: "tu-phong-tam" },
          ]},
          { title: "Kích thước", items: [
            { name: "600 mm", slug: "tu-phong-tam" },
            { name: "800 mm", slug: "tu-phong-tam" },
            { name: "1200 mm chậu đôi", slug: "tu-phong-tam" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Gương cảm ứng + đèn", slug: "tu-phong-tam" },
            { name: "Cửa nâng thuỷ lực", slug: "tu-phong-tam" },
            { name: "Tay nắm vàng hồng", slug: "tu-phong-tam" },
          ]},
        ],
      },
      {
        name: "Vòi nước & Sen", slug: "voi-nuoc", icon: "🚰",
        image: "/img/nm-bathroom-sanitary-4.jpg?v=8",
        tagline: "Vòi sen, vòi lavabo và vòi bếp — đồng thau mạ chrome / vàng / mờ.",
        highlights: [
          { name: "Vòi lavabo cao", image: "/img/bathroom-5-1.jpg?v=6", slug: "voi-nuoc" },
          { name: "Vòi sen âm tường", image: "/img/bathroom-5-2.jpg?v=6", slug: "voi-nuoc" },
          { name: "Vòi bếp cổ ngỗng", image: "/img/bathroom-5-3.jpg?v=6", slug: "voi-nuoc" },
          { name: "Bộ sen tắm",   image: "/img/bathroom-5-4.jpg?v=6", slug: "voi-nuoc" },
        ],
        sections: [
          { title: "Vị trí lắp đặt", items: [
            { name: "Lavabo", slug: "voi-nuoc" },
            { name: "Bồn tắm / vòi sen", slug: "voi-nuoc" },
            { name: "Nhà bếp", slug: "voi-nuoc" },
          ]},
          { title: "Chất liệu", items: [
            { name: "Đồng thau mạ chrome", slug: "voi-nuoc" },
            { name: "Inox 304", slug: "voi-nuoc" },
            { name: "Hợp kim kẽm giá rẻ", slug: "voi-nuoc" },
          ]},
          { title: "Màu hoàn thiện", items: [
            { name: "Chrome bóng", slug: "voi-nuoc" },
            { name: "Đen mờ", slug: "voi-nuoc" },
            { name: "Vàng hồng / vàng xước", slug: "voi-nuoc" },
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
        image: "/img/nm-noi-that-0.jpg?v=8",
        tagline: "Sofa, bàn trà, kệ tivi — trọn bộ cho biệt thự và căn hộ cao cấp.",
        highlights: [
          { name: "Sofa hiện đại",       image: "/img/fur1.jpg?v=6", slug: "phong-khach" },
          { name: "Sofa cổ điển",        image: "/img/fur2.jpg?v=6", slug: "phong-khach" },
          { name: "Bàn trà",          image: "/img/ban-ca-phe.jpg?v=6", slug: "phong-khach" },
          { name: "Kệ tivi",               image: "/img/fur4.jpg?v=6", slug: "phong-khach" },
          { name: "Ghế thư giãn",        image: "/img/fur5.jpg?v=6", slug: "phong-khach" },
          { name: "Bàn console",         image: "/img/furniture-1-3.jpg?v=6", slug: "phong-khach" },
        ],
        sections: [
          { title: "Sofa", items: [
            { name: "Sofa hiện đại", slug: "phong-khach" },
            { name: "Sofa cổ điển", slug: "phong-khach" },
            { name: "Sofa da Ý", slug: "phong-khach" },
            { name: "Sofa vải lanh", slug: "phong-khach" },
          ]},
          { title: "Bàn & Kệ", items: [
            { name: "Bàn trà", slug: "phong-khach" },
            { name: "Bàn console", slug: "phong-khach" },
            { name: "Kệ tivi treo tường", slug: "phong-khach" },
            { name: "Kệ tivi đứng", slug: "phong-khach" },
          ]},
          { title: "Ghế thư giãn", items: [
            { name: "Ghế bành", slug: "phong-khach" },
            { name: "Ghế thư giãn ngả lưng", slug: "phong-khach" },
            { name: "Ghế trứng đu", slug: "phong-khach" },
            { name: "Ghế đôn", slug: "phong-khach" },
          ]},
          { title: "Đèn & Trang trí", items: [
            { name: "Đèn cây", slug: "phong-khach" },
            { name: "Đèn bàn cạnh sofa", slug: "phong-khach" },
            { name: "Thảm phòng khách", slug: "phong-khach" },
            { name: "Rèm cao cấp", slug: "phong-khach" },
          ]},
        ],
      },
      {
        name: "Phòng ngủ", slug: "phong-ngu", icon: "🛏️",
        image: "/img/nm-noi-that-1.jpg?v=8",
        tagline: "Giường, tủ quần áo, bàn trang điểm — phong cách hiện đại và tân cổ điển.",
        highlights: [
          { name: "Giường",          image: "/img/fur3.jpg?v=6", slug: "phong-ngu" },
          { name: "Tủ quần áo",          image: "/img/fur8.jpg?v=6", slug: "phong-ngu" },
          { name: "Bàn trang điểm",      image: "/img/furniture-2-1.jpg?v=6", slug: "phong-ngu" },
          { name: "Tủ đầu giường",      image: "/img/furniture-2-2.jpg?v=6", slug: "phong-ngu" },
          { name: "Nệm cao su",           image: "/img/dem-latex-memory-foam.jpg?v=6", slug: "phong-ngu" },
          { name: "Nệm lò xo túi",   image: "/img/dem-pocket-spring.jpg?v=6", slug: "phong-ngu" },
        ],
        sections: [
          { title: "Giường", items: [
            { name: "Giường 1.6m", slug: "phong-ngu" },
            { name: "Giường 1.8m", slug: "phong-ngu" },
            { name: "Giường King 2m", slug: "phong-ngu" },
            { name: "Giường tầng", slug: "phong-ngu" },
          ]},
          { title: "Tủ quần áo", items: [
            { name: "Tủ quần áo cửa lùa", slug: "phong-ngu" },
            { name: "Tủ quần áo cửa mở", slug: "phong-ngu" },
            { name: "Phòng thay đồ", slug: "phong-ngu" },
            { name: "Tủ quần áo có gương", slug: "phong-ngu" },
          ]},
          { title: "Nệm cao cấp", items: [
            { name: "Nệm cao su thiên nhiên", slug: "phong-ngu" },
            { name: "Nệm lò xo túi", slug: "phong-ngu" },
            { name: "Nệm memory foam", slug: "phong-ngu" },
            { name: "Nệm cao su 7 vùng", slug: "phong-ngu" },
          ]},
          { title: "Bàn / Phụ kiện", items: [
            { name: "Bàn trang điểm có gương", slug: "phong-ngu" },
            { name: "Tủ đầu giường", slug: "phong-ngu" },
            { name: "Ghế đuôi giường", slug: "phong-ngu" },
            { name: "Đèn ngủ cảm ứng", slug: "phong-ngu" },
          ]},
        ],
      },
      {
        name: "Phòng ăn", slug: "phong-an", icon: "🍽️",
        image: "/img/nm-noi-that-2.jpg?v=8",
        tagline: "Bộ bàn ăn, tủ rượu, ghế ăn — gỗ tự nhiên và MDF veneer cao cấp.",
        highlights: [
          { name: "Bàn ăn 6–8 ghế",      image: "/img/ban-an.jpg?v=6", slug: "phong-an" },
          { name: "Ghế ăn",              image: "/img/ghe-an.jpg?v=6", slug: "phong-an" },
          { name: "Bàn trà",          image: "/img/ban-ca-phe.jpg?v=6", slug: "phong-an" },
          { name: "Ghế bar",             image: "/img/ghe-bar.jpg?v=6", slug: "phong-an" },
          { name: "Đèn chùm pha lê",     image: "/img/den-pha-le-k9.jpg?v=6", slug: "phong-an" },
          { name: "Đèn thả",         image: "/img/den-pendant.jpg?v=6", slug: "phong-an" },
        ],
        sections: [
          { title: "Bàn ăn", items: [
            { name: "Bàn 4 ghế", slug: "phong-an" },
            { name: "Bàn 6 ghế", slug: "phong-an" },
            { name: "Bàn 8 ghế", slug: "phong-an" },
            { name: "Bàn mở rộng", slug: "phong-an" },
          ]},
          { title: "Ghế ăn", items: [
            { name: "Ghế gỗ tự nhiên", slug: "phong-an" },
            { name: "Ghế bọc da", slug: "phong-an" },
            { name: "Ghế bọc vải", slug: "phong-an" },
            { name: "Ghế nhựa cao cấp", slug: "phong-an" },
          ]},
          { title: "Tủ rượu & Tủ buffet", items: [
            { name: "Tủ rượu cửa kính", slug: "phong-an" },
            { name: "Tủ rượu module", slug: "phong-an" },
            { name: "Tủ buffet trưng bày", slug: "phong-an" },
            { name: "Tủ bar mini", slug: "phong-an" },
          ]},
          { title: "Đèn & Trang trí", items: [
            { name: "Đèn chùm pha lê", slug: "phong-an" },
            { name: "Đèn thả đơn", slug: "phong-an" },
            { name: "Bình hoa bàn ăn", slug: "phong-an" },
            { name: "Tranh trang trí", slug: "phong-an" },
          ]},
        ],
      },
      {
        name: "Tủ bếp", slug: "tu-bep", icon: "🍳",
        image: "/img/nm-noi-that-3.jpg?v=8",
        tagline: "Tủ bếp OPPEIN, bề mặt acrylic và laminate — thiết kế 3D miễn phí từ đơn 30 bộ.",
        highlights: [
          { name: "Bếp chữ L",        image: "/img/fur7.jpg?v=6", slug: "tu-bep" },
          { name: "Bếp chữ U",        image: "/img/furniture-7-1.jpg?v=6", slug: "tu-bep" },
          { name: "Đảo bếp",             image: "/img/furniture-7-2.jpg?v=6", slug: "tu-bep" },
          { name: "Mặt đá thạch anh",       image: "/img/da-quartz-nhan-tao.jpg?v=6", slug: "tu-bep" },
          { name: "Bản lề tủ bếp",       image: "/img/ban-le-tu-bep.jpg?v=6", slug: "tu-bep" },
          { name: "Bản lề giảm chấn",    image: "/img/ban-le-tu-giam-chan.jpg?v=6", slug: "tu-bep" },
        ],
        sections: [
          { title: "Bố cục", items: [
            { name: "Chữ I cơ bản", slug: "tu-bep" },
            { name: "Bếp góc chữ L", slug: "tu-bep" },
            { name: "Chữ U khép kín", slug: "tu-bep" },
            { name: "Có đảo bếp", slug: "tu-bep" },
          ]},
          { title: "Chất liệu cánh", items: [
            { name: "Acrylic bóng", slug: "tu-bep" },
            { name: "Laminate vân gỗ", slug: "tu-bep" },
            { name: "Melamine MFC", slug: "tu-bep" },
            { name: "Gỗ sồi / óc chó tự nhiên", slug: "tu-bep" },
          ]},
          { title: "Mặt bàn", items: [
            { name: "Đá thạch anh nhân tạo", slug: "tu-bep" },
            { name: "Granite tự nhiên", slug: "tu-bep" },
            { name: "Marble trắng", slug: "tu-bep" },
            { name: "Bề mặt đặc Corian", slug: "tu-bep" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Bản lề giảm chấn Blum", slug: "tu-bep" },
            { name: "Ray ngăn kéo 3 tầng", slug: "tu-bep" },
            { name: "Tay nắm tủ", slug: "tu-bep" },
            { name: "Đèn LED dưới tủ", slug: "tu-bep" },
          ]},
        ],
      },
      {
        name: "Tủ quần áo", slug: "tu-quan-ao", icon: "👔",
        image: "/img/nm-noi-that-4.jpg?v=8",
        tagline: "Tủ quần áo âm tường, phòng thay đồ — OEM theo kích thước phòng của bạn.",
        highlights: [
          { name: "Tủ quần áo cửa lùa",    image: "/img/fur8.jpg?v=6", slug: "tu-quan-ao" },
          { name: "Phòng thay đồ",      image: "/img/furniture-8-1.jpg?v=6", slug: "tu-quan-ao" },
          { name: "Tủ quần áo trẻ em",        image: "/img/furniture-8-2.jpg?v=6", slug: "tu-quan-ao" },
          { name: "Tủ giày",             image: "/img/furniture-8-3.jpg?v=6", slug: "tu-quan-ao" },
          { name: "Bản lề tủ",           image: "/img/ban-le.jpg?v=6", slug: "tu-quan-ao" },
          { name: "Bản lề cửa",          image: "/img/ban-le-cua.jpg?v=6", slug: "tu-quan-ao" },
        ],
        sections: [
          { title: "Loại tủ quần áo", items: [
            { name: "Cửa lùa", slug: "tu-quan-ao" },
            { name: "Cửa mở", slug: "tu-quan-ao" },
            { name: "Phòng thay đồ", slug: "tu-quan-ao" },
            { name: "Module âm tường", slug: "tu-quan-ao" },
          ]},
          { title: "Chất liệu", items: [
            { name: "MDF veneer", slug: "tu-quan-ao" },
            { name: "HDF chống ẩm", slug: "tu-quan-ao" },
            { name: "Gỗ tự nhiên", slug: "tu-quan-ao" },
            { name: "Acrylic bóng", slug: "tu-quan-ao" },
          ]},
          { title: "Phụ kiện bên trong", items: [
            { name: "Giỏ kéo Hafele", slug: "tu-quan-ao" },
            { name: "Móc cà vạt xoay", slug: "tu-quan-ao" },
            { name: "Đèn LED cảm ứng chuyển động", slug: "tu-quan-ao" },
            { name: "Két sắt trong tủ", slug: "tu-quan-ao" },
          ]},
          { title: "Tủ đồng bộ", items: [
            { name: "Tủ giày đồng bộ", slug: "tu-quan-ao" },
            { name: "Tủ đầu giường", slug: "tu-quan-ao" },
            { name: "Tủ ngăn kéo", slug: "tu-quan-ao" },
            { name: "Khay trang sức âm tủ", slug: "tu-quan-ao" },
          ]},
        ],
      },
      {
        name: "Văn phòng tại nhà", slug: "van-phong-tai-nha", icon: "💼",
        image: "/img/nm-noi-that-5.jpg?v=8",
        tagline: "Bàn làm việc, ghế công thái học, kệ sách — cho văn phòng tại nhà linh hoạt.",
        highlights: [
          { name: "Bàn làm việc",        image: "/img/ban-lam-viec.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "Ghế văn phòng",       image: "/img/ghe-van-phong.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "Bàn picnic gấp gọn",      image: "/img/ban-picnic-gap-gon.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "Đèn bàn LED",         image: "/img/den-ban-de-ban.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "Đèn cây",      image: "/img/den-san-floor-lamp.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "Đèn thông minh Wi-Fi",     image: "/img/den-smart-wi-fi.jpg?v=6", slug: "van-phong-tai-nha" },
        ],
        sections: [
          { title: "Bàn làm việc", items: [
            { name: "Bàn đứng", slug: "van-phong-tai-nha" },
            { name: "Bàn chữ L", slug: "van-phong-tai-nha" },
            { name: "Bàn thẳng tối giản", slug: "van-phong-tai-nha" },
            { name: "Bàn kèm kệ sách", slug: "van-phong-tai-nha" },
          ]},
          { title: "Ghế ngồi", items: [
            { name: "Ghế công thái học", slug: "van-phong-tai-nha" },
            { name: "Ghế gaming", slug: "van-phong-tai-nha" },
            { name: "Ghế da giám đốc", slug: "van-phong-tai-nha" },
            { name: "Ghế lưới văn phòng", slug: "van-phong-tai-nha" },
          ]},
          { title: "Lưu trữ", items: [
            { name: "Kệ sách mở", slug: "van-phong-tai-nha" },
            { name: "Tủ hồ sơ cửa kính", slug: "van-phong-tai-nha" },
            { name: "Hộp lưu trữ tài liệu", slug: "van-phong-tai-nha" },
            { name: "Tủ ngăn kéo di động", slug: "van-phong-tai-nha" },
          ]},
          { title: "Phụ kiện làm việc", items: [
            { name: "Đèn bàn LED cảm ứng", slug: "van-phong-tai-nha" },
            { name: "Giá đỡ màn hình", slug: "van-phong-tai-nha" },
            { name: "Đèn thông minh Wi-Fi", slug: "van-phong-tai-nha" },
            { name: "Giá đỡ laptop dọc", slug: "van-phong-tai-nha" },
          ]},
        ],
      },
      {
        name: "Nội thất khách sạn", slug: "noi-that-khach-san", icon: "🏨",
        image: "/img/nm-noi-that-6.jpg?v=8",
        tagline: "FF&E trọn gói 3–5 sao — thiết kế đạt chuẩn Marriott/Hilton.",
        highlights: [
          { name: "Giường khách sạn",    image: "/img/fur6.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "Bàn sảnh",           image: "/img/furniture-6-1.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "Ghế thư giãn",        image: "/img/furniture-6-2.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "Đèn chùm pha lê", image: "/img/den-chum-chandelier.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "Đèn gắn tường",     image: "/img/den-tuong-wall-sconce.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "Đèn ốp trần",         image: "/img/den-op-tran.jpg?v=6", slug: "noi-that-khach-san" },
        ],
        sections: [
          { title: "Phòng ngủ khách sạn", items: [
            { name: "Giường King/Queen", slug: "noi-that-khach-san" },
            { name: "Đầu giường bọc nệm", slug: "noi-that-khach-san" },
            { name: "Bàn làm việc trong phòng", slug: "noi-that-khach-san" },
            { name: "Tủ minibar veneer gỗ", slug: "noi-that-khach-san" },
          ]},
          { title: "Phòng tắm khách sạn", items: [
            { name: "Khăn cotton 100%", slug: "noi-that-khach-san" },
            { name: "Bộ amenities đóng gói", slug: "noi-that-khach-san" },
            { name: "Áo choàng tắm waffle", slug: "noi-that-khach-san" },
            { name: "Dép đi trong phòng", slug: "noi-that-khach-san" },
          ]},
          { title: "Sảnh & Khu chờ", items: [
            { name: "Ghế thư giãn", slug: "noi-that-khach-san" },
            { name: "Quầy lễ tân", slug: "noi-that-khach-san" },
            { name: "Đèn chùm pha lê", slug: "noi-that-khach-san" },
            { name: "Tủ trưng bày kính", slug: "noi-that-khach-san" },
          ]},
          { title: "Khu ăn uống / Bar", items: [
            { name: "Bàn buffet inox", slug: "noi-that-khach-san" },
            { name: "Ghế nhà hàng cao cấp", slug: "noi-that-khach-san" },
            { name: "Đèn thả quầy bar", slug: "noi-that-khach-san" },
            { name: "Quầy bar nguyên khối", slug: "noi-that-khach-san" },
          ]},
        ],
      },
      {
        name: "Trẻ em & Em bé", slug: "tre-em-em-be", icon: "🧸",
        image: "/img/nm-noi-that-7.jpg?v=8",
        tagline: "Giường trẻ em, bàn học, đồ chơi an toàn — đạt chuẩn E0/E1.",
        highlights: [
          { name: "Giường trẻ em",       image: "/img/furniture-3-1.jpg?v=6", slug: "tre-em-em-be" },
          { name: "Bàn học",             image: "/img/furniture-3-2.jpg?v=6", slug: "tre-em-em-be" },
          { name: "Tủ đồ chơi",          image: "/img/furniture-3-3.jpg?v=6", slug: "tre-em-em-be" },
          { name: "Ghế trẻ em điều chỉnh",        image: "/img/ghe-tam-nang.jpg?v=6", slug: "tre-em-em-be" },
          { name: "Đèn bàn trẻ em",   image: "/img/den-ban-de-ban.jpg?v=6", slug: "tre-em-em-be" },
          { name: "Đèn LED dây trang trí", image: "/img/den-led-day.jpg?v=6", slug: "tre-em-em-be" },
        ],
        sections: [
          { title: "Phòng ngủ trẻ em", items: [
            { name: "Giường tầng an toàn", slug: "tre-em-em-be" },
            { name: "Cũi em bé MDF", slug: "tre-em-em-be" },
            { name: "Tủ quần áo trẻ em", slug: "tre-em-em-be" },
            { name: "Đèn ngủ cảm ứng", slug: "tre-em-em-be" },
          ]},
          { title: "Góc học tập", items: [
            { name: "Bàn chống gù lưng", slug: "tre-em-em-be" },
            { name: "Ghế học điều chỉnh", slug: "tre-em-em-be" },
            { name: "Kệ sách trẻ em", slug: "tre-em-em-be" },
            { name: "Đèn bàn LED bảo vệ mắt", slug: "tre-em-em-be" },
          ]},
          { title: "Đồ chơi & Lưu trữ", items: [
            { name: "Tủ đồ chơi module", slug: "tre-em-em-be" },
            { name: "Đồ chơi gỗ E0", slug: "tre-em-em-be" },
            { name: "Khối xếp hình giáo dục", slug: "tre-em-em-be" },
            { name: "Hộp đựng đồ bằng vải", slug: "tre-em-em-be" },
          ]},
          { title: "Vệ sinh & Ăn uống", items: [
            { name: "Ghế ăn em bé", slug: "tre-em-em-be" },
            { name: "Khăn cotton trẻ em", slug: "tre-em-em-be" },
            { name: "Yếm ăn silicone", slug: "tre-em-em-be" },
            { name: "Chậu rửa mini em bé", slug: "tre-em-em-be" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🍳", name: "Thiết bị bếp", slug: "kitchen-equipment" },
    items: [
      {
        name: "Bếp từ", slug: "bep-tu", icon: "♨️",
        image: "/img/nm-kitchen-equipment-0.jpg?v=8",
        tagline: "Bếp từ đơn / đôi / 3–4 vùng nấu — mặt kính Schott, công suất 3500W+.",
        highlights: [
          { name: "Vùng nấu đôi",   image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "bep-tu" },
          { name: "3 vùng nấu",     image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "bep-tu" },
          { name: "4 vùng nấu",     image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "bep-tu" },
          { name: "Bếp đơn di động",    image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "bep-tu" },
        ],
        sections: [
          { title: "Số vùng nấu", items: [
            { name: "Đơn 1 vùng", slug: "bep-tu" },
            { name: "Đôi 2 vùng", slug: "bep-tu" },
            { name: "Âm 3–4 vùng", slug: "bep-tu" },
          ]},
          { title: "Công suất", items: [
            { name: "≤ 2000 W", slug: "bep-tu" },
            { name: "2000–3500 W", slug: "bep-tu" },
            { name: "Booster > 3500 W", slug: "bep-tu" },
          ]},
          { title: "Tính năng", items: [
            { name: "Khoá trẻ em", slug: "bep-tu" },
            { name: "Tự ngắt (nồi rỗng)", slug: "bep-tu" },
            { name: "9 mức nhiệt", slug: "bep-tu" },
          ]},
        ],
      },
      {
        name: "Máy hút mùi", slug: "may-hut-mui", icon: "💨",
        image: "/img/nm-kitchen-equipment-1.jpg?v=8",
        tagline: "Máy hút mùi gắn tường, âm tủ và đảo bếp — lưu lượng 700–1300 m³/h.",
        highlights: [
          { name: "Gắn tường kim cương", image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "may-hut-mui" },
          { name: "Âm tủ cổ điển",   image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "may-hut-mui" },
          { name: "Đảo bếp gắn trần", image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "may-hut-mui" },
          { name: "Điều khiển cảm ứng từ xa",     image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "may-hut-mui" },
        ],
        sections: [
          { title: "Theo lắp đặt", items: [
            { name: "Tường / gắn tường", slug: "may-hut-mui" },
            { name: "Âm tủ cổ điển", slug: "may-hut-mui" },
            { name: "Đảo bếp gắn trần", slug: "may-hut-mui" },
          ]},
          { title: "Airflow", items: [
            { name: "700 m³/h", slug: "may-hut-mui" },
            { name: "1000 m³/h", slug: "may-hut-mui" },
            { name: "1300+ m³/h", slug: "may-hut-mui" },
          ]},
          { title: "Chất liệu", items: [
            { name: "Inox 304", slug: "may-hut-mui" },
            { name: "Kính cường lực", slug: "may-hut-mui" },
            { name: "Đồng phay nghệ thuật", slug: "may-hut-mui" },
          ]},
        ],
      },
      {
        name: "Lò vi sóng", slug: "lo-vi-song", icon: "📡",
        image: "/img/nm-kitchen-equipment-2.jpg?v=8",
        tagline: "Lò vi sóng cơ, điện tử và nướng — dung tích 20–42L.",
        highlights: [
          { name: "Cơ 20L",     image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "lo-vi-song" },
          { name: "Điện tử 25L",    image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "lo-vi-song" },
          { name: "Nướng 30L",   image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "lo-vi-song" },
          { name: "Kết hợp hấp", image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "lo-vi-song" },
        ],
        sections: [
          { title: "Dung tích", items: [
            { name: "20L gia đình", slug: "lo-vi-song" },
            { name: "25–30L", slug: "lo-vi-song" },
            { name: "42L+ chuyên nghiệp", slug: "lo-vi-song" },
          ]},
          { title: "Loại", items: [
            { name: "Cơ", slug: "lo-vi-song" },
            { name: "Cảm ứng điện tử", slug: "lo-vi-song" },
            { name: "Vi sóng + nướng + hấp", slug: "lo-vi-song" },
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
        image: "/img/nm-kitchen-equipment-3.jpg?v=8",
        tagline: "Nồi áp suất điện và đa năng — dung tích 4–10L.",
        highlights: [
          { name: "Điện 5L",       image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "noi-ap-suat" },
          { name: "Đa năng 6L",    image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "noi-ap-suat" },
          { name: "Inox lớn 8L",      image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "noi-ap-suat" },
          { name: "Cơ truyền thống", image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "noi-ap-suat" },
        ],
        sections: [
          { title: "Dung tích", items: [
            { name: "4–5L gia đình", slug: "noi-ap-suat" },
            { name: "6–8L", slug: "noi-ap-suat" },
            { name: "10L+ quán ăn", slug: "noi-ap-suat" },
          ]},
          { title: "Loại", items: [
            { name: "Điện", slug: "noi-ap-suat" },
            { name: "Cơ", slug: "noi-ap-suat" },
            { name: "Đa năng 12 trong 1", slug: "noi-ap-suat" },
          ]},
          { title: "Chất liệu lòng nồi", items: [
            { name: "Gốm chống dính", slug: "noi-ap-suat" },
            { name: "Inox 304", slug: "noi-ap-suat" },
            { name: "Hợp kim nhôm dày", slug: "noi-ap-suat" },
          ]},
        ],
      },
      {
        name: "Nồi cơm điện", slug: "noi-com-dien", icon: "🍚",
        image: "/img/nm-kitchen-equipment-4.jpg?v=8",
        tagline: "Nồi cơm điện cơ, điện tử và cao tần IH — 1.8–5L cho gia đình và nhà hàng.",
        highlights: [
          { name: "Cơ 1.8L",   image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "noi-com-dien" },
          { name: "Điện tử 2L",    image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "noi-com-dien" },
          { name: "Cao tần IH",    image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "noi-com-dien" },
          { name: "Thương mại 5L",image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "noi-com-dien" },
        ],
        sections: [
          { title: "Công nghệ", items: [
            { name: "Cơ", slug: "noi-com-dien" },
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
            { name: "Nấu cháo / hầm", slug: "noi-com-dien" },
          ]},
        ],
      },
      {
        name: "Máy rửa bát", slug: "may-rua-bat", icon: "🍽️",
        image: "/img/nm-kitchen-equipment-5.jpg?v=8",
        tagline: "Máy rửa bát độc lập, âm tủ và mini — 6–14 bộ.",
        highlights: [
          { name: "Độc lập 14 bộ",  image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "may-rua-bat" },
          { name: "Âm tủ 12 bộ",    image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "may-rua-bat" },
          { name: "Mini để bàn 6 bộ",  image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "may-rua-bat" },
          { name: "Bán âm tủ",          image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "may-rua-bat" },
        ],
        sections: [
          { title: "Kiểu lắp đặt", items: [
            { name: "Độc lập", slug: "may-rua-bat" },
            { name: "Âm tủ", slug: "may-rua-bat" },
            { name: "Mini để bàn", slug: "may-rua-bat" },
          ]},
          { title: "Số bộ rửa", items: [
            { name: "6 bộ mini", slug: "may-rua-bat" },
            { name: "8–10 bộ", slug: "may-rua-bat" },
            { name: "13–14 bộ chuyên nghiệp", slug: "may-rua-bat" },
          ]},
          { title: "Tính năng", items: [
            { name: "Sấy nhiệt", slug: "may-rua-bat" },
            { name: "Diệt khuẩn UV", slug: "may-rua-bat" },
            { name: "Điều khiển Wi-Fi", slug: "may-rua-bat" },
          ]},
        ],
      },
      {
        name: "Chậu rửa inox", slug: "chau-rua-inox", icon: "🍽️",
        image: "/img/nm-kitchen-equipment-6.jpg?v=8",
        tagline: "Chậu rửa inox 304 đơn / đôi / ba hộc — handmade nhẵn / chống ồn.",
        highlights: [
          { name: "Đơn hộc 50×40",   image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "chau-rua-inox" },
          { name: "Đôi hộc 78×42",   image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "chau-rua-inox" },
          { name: "Vuông handmade",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "chau-rua-inox" },
          { name: "Ba hộc thương mại", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "chau-rua-inox" },
        ],
        sections: [
          { title: "Số hộc", items: [
            { name: "1 hộc", slug: "chau-rua-inox" },
            { name: "2 hộc", slug: "chau-rua-inox" },
            { name: "3 hộc", slug: "chau-rua-inox" },
          ]},
          { title: "Loại", items: [
            { name: "Lắp dương", slug: "chau-rua-inox" },
            { name: "Âm bàn", slug: "chau-rua-inox" },
            { name: "Bán âm bàn", slug: "chau-rua-inox" },
          ]},
          { title: "Bề mặt", items: [
            { name: "Xước lụa", slug: "chau-rua-inox" },
            { name: "Đen mờ nano", slug: "chau-rua-inox" },
            { name: "Handmade R10", slug: "chau-rua-inox" },
          ]},
        ],
      },
      {
        name: "Kim khí & Phụ kiện", slug: "kim-khi-bep", icon: "🔧",
        image: "/img/nm-kitchen-equipment-7.jpg?v=8",
        tagline: "Bản lề tủ, ray ngăn kéo, tay nắm, phụ kiện inox — đặt theo container.",
        highlights: [
          { name: "Bản lề giảm chấn", image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "kim-khi-bep" },
          { name: "Ray âm đáy",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "kim-khi-bep" },
          { name: "Tay nắm hợp kim",  image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "kim-khi-bep" },
          { name: "Phụ kiện inox",    image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "kim-khi-bep" },
        ],
        sections: [
          { title: "Bản lề & Ray", items: [
            { name: "Bản lề bát 35 mm", slug: "kim-khi-bep" },
            { name: "Ray ngăn kéo 3 tầng", slug: "kim-khi-bep" },
            { name: "Tay nâng tủ thuỷ lực", slug: "kim-khi-bep" },
          ]},
          { title: "Phụ kiện inox", items: [
            { name: "Giá để bát", slug: "kim-khi-bep" },
            { name: "Giá gia vị", slug: "kim-khi-bep" },
            { name: "Thùng rác âm tủ", slug: "kim-khi-bep" },
          ]},
          { title: "Tay nắm", items: [
            { name: "Tay nắm inox vuông", slug: "kim-khi-bep" },
            { name: "Núm đồng tròn", slug: "kim-khi-bep" },
            { name: "Tay nắm âm phẳng", slug: "kim-khi-bep" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "💡", name: "Đèn chiếu sáng", slug: "lighting" },
    items: [
      {
        name: "Nguồn sáng LED", slug: "den-led", icon: "💡",
        image: "/img/nm-lighting-0.jpg?v=8",
        tagline: "Đủ loại nguồn sáng LED — driver, module, COB, SMD chuyên dụng.",
        highlights: [
          { name: "Chip COB",      image: "/img/ceramic-2-1.jpg?v=6", slug: "den-led" },
          { name: "SMD 2835/5050", image: "/img/ceramic-2-2.jpg?v=6", slug: "den-led" },
          { name: "Module driver",  image: "/img/ceramic-2-3.jpg?v=6", slug: "den-led" },
          { name: "Bóng LED sợi đốt", image: "/img/ceramic-2-4.jpg?v=6", slug: "den-led" },
        ],
        sections: [
          { title: "Loại chip", items: [
            { name: "COB", slug: "den-led" },
            { name: "SMD", slug: "den-led" },
            { name: "Sợi đốt", slug: "den-led" },
          ]},
          { title: "Nhiệt độ màu", items: [
            { name: "Trắng ấm 3000K", slug: "den-led" },
            { name: "Trắng trung tính 4000K", slug: "den-led" },
            { name: "Trắng lạnh 6500K", slug: "den-led" },
          ]},
          { title: "Độ hoàn màu CRI", items: [
            { name: "Ra >80", slug: "den-led" },
            { name: "Ra >90", slug: "den-led" },
            { name: "Ra >95 cho trưng bày nghệ thuật", slug: "den-led" },
          ]},
        ],
      },
      {
        name: "Đèn LED gia dụng", slug: "den-led-gia-dung", icon: "🏠",
        image: "/img/nm-lighting-1.jpg?v=8",
        tagline: "Đèn ốp trần, đèn downlight, panel, đèn LED dây — cho phòng khách và sinh hoạt.",
        highlights: [
          { name: "Đèn ốp trần",  image: "/img/ceramic-2-2.jpg?v=6", slug: "den-led-gia-dung" },
          { name: "Đèn downlight âm trần", image: "/img/ceramic-2-3.jpg?v=6", slug: "den-led-gia-dung" },
          { name: "Panel vuông",  image: "/img/ceramic-2-4.jpg?v=6", slug: "den-led-gia-dung" },
          { name: "Đèn LED dây trang trí", image: "/img/ceramic-2-5.jpg?v=6", slug: "den-led-gia-dung" },
        ],
        sections: [
          { title: "Theo vị trí", items: [
            { name: "Living room", slug: "den-led-gia-dung" },
            { name: "Phòng ngủ", slug: "den-led-gia-dung" },
            { name: "Hành lang / cầu thang", slug: "den-led-gia-dung" },
          ]},
          { title: "Theo loại", items: [
            { name: "Ốp trần", slug: "den-led-gia-dung" },
            { name: "Đèn downlight âm trần", slug: "den-led-gia-dung" },
            { name: "Panel siêu mỏng", slug: "den-led-gia-dung" },
          ]},
          { title: "Tính năng", items: [
            { name: "3 chế độ màu", slug: "den-led-gia-dung" },
            { name: "Điều chỉnh độ sáng", slug: "den-led-gia-dung" },
            { name: "Wi-Fi thông minh", slug: "den-led-gia-dung" },
          ]},
        ],
      },
      {
        name: "Đèn LED thương mại", slug: "den-led-thuong-mai", icon: "🏢",
        image: "/img/nm-lighting-2.jpg?v=8",
        tagline: "Đèn pha, đèn tuýp công nghiệp, đèn spotlight — IP65/66.",
        highlights: [
          { name: "Đèn pha LED 100W",  image: "/img/ceramic-2-3.jpg?v=6", slug: "den-led-thuong-mai" },
          { name: "Đèn tuýp T8",       image: "/img/ceramic-2-4.jpg?v=6", slug: "den-led-thuong-mai" },
          { name: "Đèn spotlight thanh ray", image: "/img/ceramic-2-5.jpg?v=6", slug: "den-led-thuong-mai" },
          { name: "Đèn highbay UFO", image: "/img/ceramic-2-1.jpg?v=6", slug: "den-led-thuong-mai" },
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
          { title: "Cấp bảo vệ IP", items: [
            { name: "IP44 trong nhà", slug: "den-led-thuong-mai" },
            { name: "IP65 ngoài trời", slug: "den-led-thuong-mai" },
            { name: "IP66 chống bụi/nước", slug: "den-led-thuong-mai" },
          ]},
        ],
      },
      {
        name: "Vật tư điện", slug: "vat-tu-dien", icon: "⚙️",
        image: "/img/nm-lighting-3.jpg?v=8",
        tagline: "Ổ cắm, công tắc, MCB, ATS — phụ kiện hoàn thiện hệ thống chiếu sáng.",
        highlights: [
          { name: "Ổ cắm âm tường",  image: "/img/ceramic-2-4.jpg?v=6", slug: "vat-tu-dien" },
          { name: "Công tắc cảm ứng", image: "/img/ceramic-2-5.jpg?v=6", slug: "vat-tu-dien" },
          { name: "MCB / RCBO",       image: "/img/ceramic-2-1.jpg?v=6", slug: "vat-tu-dien" },
          { name: "Hộp nối dây",      image: "/img/ceramic-2-2.jpg?v=6", slug: "vat-tu-dien" },
        ],
        sections: [
          { title: "Thiết bị đóng cắt", items: [
            { name: "MCB 6/10/16A", slug: "vat-tu-dien" },
            { name: "RCBO", slug: "vat-tu-dien" },
            { name: "Cầu dao tự động", slug: "vat-tu-dien" },
          ]},
          { title: "Ổ cắm & Công tắc", items: [
            { name: "Mặt âm vuông", slug: "vat-tu-dien" },
            { name: "Cảm ứng thông minh", slug: "vat-tu-dien" },
            { name: "Ổ cắm USB", slug: "vat-tu-dien" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Đế âm tường", slug: "vat-tu-dien" },
            { name: "Bu lông tiếp địa", slug: "vat-tu-dien" },
            { name: "Kẹp cáp nhanh", slug: "vat-tu-dien" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🪟", name: "Cửa & Khoá", slug: "doors-windows" },
    items: [
      {
        name: "Khoá nhận diện khuôn mặt 3D", slug: "khoa-3d-face", icon: "📹",
        image: "/img/nm-doors-windows-0.jpg?v=8",
        tagline: "Khoá nhận diện khuôn mặt 3D + gọi video — chống nước IP68.",
        highlights: [
          { name: "Khuôn mặt 3D + video",  image: "/img/ceramic-3-1.jpg?v=6", slug: "khoa-3d-face" },
          { name: "Camera 1080p",     image: "/img/ceramic-3-2.jpg?v=6", slug: "khoa-3d-face" },
          { name: "Pin sạc 5000 mAh", image: "/img/ceramic-3-3.jpg?v=6", slug: "khoa-3d-face" },
          { name: "Wi-Fi + 4G",        image: "/img/ceramic-3-4.jpg?v=6", slug: "khoa-3d-face" },
        ],
        sections: [
          { title: "Cảm biến", items: [
            { name: "Nhận diện chấm 3D", slug: "khoa-3d-face" },
            { name: "Hồng ngoại ban đêm", slug: "khoa-3d-face" },
            { name: "Cảm biến vân tay dự phòng", slug: "khoa-3d-face" },
          ]},
          { title: "Mở khoá", items: [
            { name: "Nhận diện khuôn mặt", slug: "khoa-3d-face" },
            { name: "Vân tay", slug: "khoa-3d-face" },
            { name: "Mã PIN / NFC", slug: "khoa-3d-face" },
          ]},
          { title: "Kết nối", items: [
            { name: "Wi-Fi 2.4 GHz", slug: "khoa-3d-face" },
            { name: "Bluetooth 5.0", slug: "khoa-3d-face" },
            { name: "Module 4G dự phòng", slug: "khoa-3d-face" },
          ]},
        ],
      },
      {
        name: "Khoá thông minh Wi-Fi", slug: "khoa-wifi", icon: "📶",
        image: "/img/nm-doors-windows-1.jpg?v=8",
        tagline: "Khoá vân tay + điều khiển từ xa qua app Wi-Fi.",
        highlights: [
          { name: "App Tuya Smart",  image: "/img/ceramic-3-2.jpg?v=6", slug: "khoa-wifi" },
          { name: "Pin AA dùng 1 năm", image: "/img/ceramic-3-3.jpg?v=6", slug: "khoa-wifi" },
          { name: "Mã dùng một lần",         image: "/img/ceramic-3-4.jpg?v=6", slug: "khoa-wifi" },
          { name: "Chốt khoá chống cạy kép", image: "/img/ceramic-3-5.jpg?v=6", slug: "khoa-wifi" },
        ],
        sections: [
          { title: "Mở khoá", items: [
            { name: "Vân tay", slug: "khoa-wifi" },
            { name: "Mã PIN", slug: "khoa-wifi" },
            { name: "Thẻ NFC", slug: "khoa-wifi" },
          ]},
          { title: "Nhà thông minh", items: [
            { name: "Tuya / Smart Life", slug: "khoa-wifi" },
            { name: "Google Home", slug: "khoa-wifi" },
            { name: "Alexa", slug: "khoa-wifi" },
          ]},
          { title: "Chất liệu thân khoá", items: [
            { name: "Hợp kim kẽm", slug: "khoa-wifi" },
            { name: "Inox 304", slug: "khoa-wifi" },
            { name: "Nhôm anodized", slug: "khoa-wifi" },
          ]},
        ],
      },
      {
        name: "Khoá cổng Wi-Fi", slug: "khoa-don-cong-wifi", icon: "🚪",
        image: "/img/nm-doors-windows-2.jpg?v=8",
        tagline: "Khoá cổng ngoài trời, vân tay + Wi-Fi — thiết kế cho biệt thự.",
        highlights: [
          { name: "Cổng sắt biệt thự",  image: "/img/ceramic-3-3.jpg?v=6", slug: "khoa-don-cong-wifi" },
          { name: "Cổng xếp inox",      image: "/img/ceramic-3-4.jpg?v=6", slug: "khoa-don-cong-wifi" },
          { name: "Cổng trượt tự động", image: "/img/ceramic-3-5.jpg?v=6", slug: "khoa-don-cong-wifi" },
          { name: "Cổng nhôm Euro",     image: "/img/ceramic-3-1.jpg?v=6", slug: "khoa-don-cong-wifi" },
        ],
        sections: [
          { title: "Mở khoá", items: [
            { name: "Vân tay", slug: "khoa-don-cong-wifi" },
            { name: "Mã PIN", slug: "khoa-don-cong-wifi" },
            { name: "App + điều khiển từ xa", slug: "khoa-don-cong-wifi" },
          ]},
          { title: "Cấp bảo vệ IP", items: [
            { name: "IP65", slug: "khoa-don-cong-wifi" },
            { name: "IP67", slug: "khoa-don-cong-wifi" },
            { name: "IP68 ngâm nước", slug: "khoa-don-cong-wifi" },
          ]},
          { title: "Công suất", items: [
            { name: "Pin kiềm", slug: "khoa-don-cong-wifi" },
            { name: "Pin lithium sạc", slug: "khoa-don-cong-wifi" },
            { name: "Năng lượng mặt trời", slug: "khoa-don-cong-wifi" },
          ]},
        ],
      },
      {
        name: "Khoá vân tay", slug: "khoa-van-tay", icon: "👆",
        image: "/img/nm-doors-windows-3.jpg?v=8",
        tagline: "Khoá vân tay điện tử cho cửa gỗ, nhôm và thép — phổ thông.",
        highlights: [
          { name: "Cửa gỗ tiêu chuẩn",  image: "/img/ceramic-3-4.jpg?v=6", slug: "khoa-van-tay" },
          { name: "Cửa nhôm Xingfa",   image: "/img/ceramic-3-5.jpg?v=6", slug: "khoa-van-tay" },
          { name: "Cửa thép chống cháy", image: "/img/ceramic-3-1.jpg?v=6", slug: "khoa-van-tay" },
          { name: "Cửa kính pivot",      image: "/img/ceramic-3-2.jpg?v=6", slug: "khoa-van-tay" },
        ],
        sections: [
          { title: "Loại cảm biến", items: [
            { name: "Điện dung", slug: "khoa-van-tay" },
            { name: "Quang học", slug: "khoa-van-tay" },
            { name: "Bán dẫn", slug: "khoa-van-tay" },
          ]},
          { title: "Mở khoá", items: [
            { name: "Vân tay (≤100)", slug: "khoa-van-tay" },
            { name: "Mã PIN", slug: "khoa-van-tay" },
            { name: "Chìa cơ", slug: "khoa-van-tay" },
          ]},
          { title: "Pin", items: [
            { name: "4 × AA", slug: "khoa-van-tay" },
            { name: "Pin lithium sạc", slug: "khoa-van-tay" },
            { name: "Sạc dự phòng USB-C khẩn cấp", slug: "khoa-van-tay" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "⚡", name: "Điện & Điện gia dụng", slug: "electrical" },
    items: [
      {
        name: "Điều hoà", slug: "dieu-hoa", icon: "❄️",
        image: "/img/nm-electrical-0.jpg?v=8",
        tagline: "Điều hoà inverter treo tường, âm trần và tủ đứng — đủ dải công suất.",
        highlights: [
          { name: "Inverter treo tường", image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "dieu-hoa" },
          { name: "Âm trần cassette",    image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "dieu-hoa" },
          { name: "Tủ đứng thương mại", image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "dieu-hoa" },
          { name: "Multi-split",         image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "dieu-hoa" },
        ],
        sections: [
          { title: "Theo công suất", items: [
            { name: "9,000 BTU", slug: "dieu-hoa" },
            { name: "12,000 BTU", slug: "dieu-hoa" },
            { name: "18,000–24,000 BTU", slug: "dieu-hoa" },
          ]},
          { title: "Theo lắp đặt", items: [
            { name: "Treo tường", slug: "dieu-hoa" },
            { name: "Âm trần cassette", slug: "dieu-hoa" },
            { name: "Tủ đứng", slug: "dieu-hoa" },
          ]},
          { title: "Công nghệ", items: [
            { name: "Inverter R32", slug: "dieu-hoa" },
            { name: "Điều khiển Wi-Fi", slug: "dieu-hoa" },
            { name: "Lọc PM2.5", slug: "dieu-hoa" },
          ]},
        ],
      },
      {
        name: "Tủ lạnh", slug: "tu-lanh", icon: "🧊",
        image: "/img/nm-electrical-1.jpg?v=8",
        tagline: "Tủ lạnh side-by-side, French door và mini bar — báo giá theo lô FCL.",
        highlights: [
          { name: "Side-by-side",  image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "tu-lanh" },
          { name: "French door",   image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "tu-lanh" },
          { name: "Ngăn đá trên",  image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "tu-lanh" },
          { name: "Mini bar",      image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "tu-lanh" },
        ],
        sections: [
          { title: "Theo công suất", items: [
            { name: "< 200L", slug: "tu-lanh" },
            { name: "200–400L", slug: "tu-lanh" },
            { name: "> 500L", slug: "tu-lanh" },
          ]},
          { title: "Theo loại", items: [
            { name: "Side-by-side", slug: "tu-lanh" },
            { name: "French door", slug: "tu-lanh" },
            { name: "Nhiều cửa", slug: "tu-lanh" },
          ]},
          { title: "Tính năng", items: [
            { name: "Inverter tiết kiệm điện", slug: "tu-lanh" },
            { name: "Không đóng tuyết", slug: "tu-lanh" },
            { name: "Wi-Fi thông minh", slug: "tu-lanh" },
          ]},
        ],
      },
      {
        name: "Máy giặt", slug: "may-giat", icon: "🧺",
        image: "/img/nm-electrical-2.jpg?v=8",
        tagline: "Máy giặt cửa trước, cửa trên và giặt sấy — đủ loại cho gia đình và khách sạn.",
        highlights: [
          { name: "Cửa trước inverter",  image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "may-giat" },
          { name: "Cửa trên",            image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "may-giat" },
          { name: "Giặt sấy kết hợp",      image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "may-giat" },
          { name: "Thương mại khách sạn", image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "may-giat" },
        ],
        sections: [
          { title: "Theo khối lượng", items: [
            { name: "7–9 kg", slug: "may-giat" },
            { name: "10–12 kg", slug: "may-giat" },
            { name: "Thương mại >15 kg", slug: "may-giat" },
          ]},
          { title: "Loại", items: [
            { name: "Cửa trước", slug: "may-giat" },
            { name: "Cửa trên", slug: "may-giat" },
            { name: "Giặt sấy kết hợp", slug: "may-giat" },
          ]},
          { title: "Tính năng", items: [
            { name: "Inverter", slug: "may-giat" },
            { name: "Diệt khuẩn hơi nước", slug: "may-giat" },
            { name: "Điều khiển Wi-Fi", slug: "may-giat" },
          ]},
        ],
      },
      {
        name: "Máy sưởi", slug: "may-suoi", icon: "🔥",
        image: "/img/nm-electrical-3.jpg?v=8",
        tagline: "Máy sưởi dầu, halogen và quạt sưởi — công suất 1500–2500 W.",
        highlights: [
          { name: "Sưởi dầu 9 thanh",  image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "may-suoi" },
          { name: "Tháp halogen",      image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "may-suoi" },
          { name: "Quạt sưởi mini",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "may-suoi" },
          { name: "Sưởi hồng ngoại carbon", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "may-suoi" },
        ],
        sections: [
          { title: "Loại", items: [
            { name: "Máy sưởi dầu", slug: "may-suoi" },
            { name: "Tháp halogen", slug: "may-suoi" },
            { name: "Quạt sưởi", slug: "may-suoi" },
          ]},
          { title: "Công suất", items: [
            { name: "1500 W", slug: "may-suoi" },
            { name: "2000 W", slug: "may-suoi" },
            { name: "2500 W", slug: "may-suoi" },
          ]},
          { title: "Tính năng", items: [
            { name: "Hẹn giờ tắt", slug: "may-suoi" },
            { name: "Điều khiển từ xa", slug: "may-suoi" },
            { name: "Bảo vệ quá nhiệt", slug: "may-suoi" },
          ]},
        ],
      },
      {
        name: "Bình nóng lạnh", slug: "binh-nong-lanh", icon: "🚿",
        image: "/img/nm-electrical-4.jpg?v=8",
        tagline: "Bình nóng lạnh trực tiếp, gián tiếp và năng lượng mặt trời.",
        highlights: [
          { name: "Trực tiếp 3500W",     image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "binh-nong-lanh" },
          { name: "Gián tiếp 30L",       image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "binh-nong-lanh" },
          { name: "Năng lượng mặt trời", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "binh-nong-lanh" },
          { name: "Bơm nhiệt",           image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "binh-nong-lanh" },
        ],
        sections: [
          { title: "Loại", items: [
            { name: "Trực tiếp", slug: "binh-nong-lanh" },
            { name: "Lưu trữ", slug: "binh-nong-lanh" },
            { name: "Năng lượng mặt trời", slug: "binh-nong-lanh" },
          ]},
          { title: "Dung tích", items: [
            { name: "15–20L", slug: "binh-nong-lanh" },
            { name: "30L", slug: "binh-nong-lanh" },
            { name: "50L+ khách sạn", slug: "binh-nong-lanh" },
          ]},
          { title: "Chất liệu bình", items: [
            { name: "Bình tráng men", slug: "binh-nong-lanh" },
            { name: "Bình inox", slug: "binh-nong-lanh" },
            { name: "Bình đồng", slug: "binh-nong-lanh" },
          ]},
        ],
      },
      {
        name: "Dây điện & Cáp", slug: "day-dien-cap", icon: "🔌",
        image: "/img/nm-electrical-5.jpg?v=8",
        tagline: "Dây đơn lõi, đa lõi, cáp điều khiển — đồng nguyên chất, đạt chuẩn EN.",
        highlights: [
          { name: "Đơn lõi 1.5–4 mm²",  image: "/img/ceramic-4-1.jpg?v=6", slug: "day-dien-cap" },
          { name: "Đa lõi mềm 2.5–10",   image: "/img/ceramic-4-2.jpg?v=6", slug: "day-dien-cap" },
          { name: "Cáp động lực 25–95 mm²",   image: "/img/ceramic-4-3.jpg?v=6", slug: "day-dien-cap" },
          { name: "Cáp điều khiển CY",    image: "/img/ceramic-4-4.jpg?v=6", slug: "day-dien-cap" },
        ],
        sections: [
          { title: "Theo tiết diện", items: [
            { name: "1.5 mm²", slug: "day-dien-cap" },
            { name: "2.5 mm²", slug: "day-dien-cap" },
            { name: "4–10 mm²", slug: "day-dien-cap" },
          ]},
          { title: "Theo loại", items: [
            { name: "Đơn lõi cứng VCm", slug: "day-dien-cap" },
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
        name: "Ống luồn dây điện", slug: "ong-dan-dien", icon: "📏",
        image: "/img/nm-electrical-6.jpg?v=8",
        tagline: "Ống luồn dây PVC, PE và kim loại — chống cháy + chịu lực.",
        highlights: [
          { name: "Ống PVC trắng",   image: "/img/ceramic-4-2.jpg?v=6", slug: "ong-dan-dien" },
          { name: "Ống PE mềm",  image: "/img/ceramic-4-3.jpg?v=6", slug: "ong-dan-dien" },
          { name: "Ống thép GI",     image: "/img/ceramic-4-4.jpg?v=6", slug: "ong-dan-dien" },
          { name: "Ống nhôm mềm",    image: "/img/ceramic-4-5.jpg?v=6", slug: "ong-dan-dien" },
        ],
        sections: [
          { title: "Chất liệu", items: [
            { name: "PVC cứng", slug: "ong-dan-dien" },
            { name: "PE mềm", slug: "ong-dan-dien" },
            { name: "Thép GI mạ kẽm", slug: "ong-dan-dien" },
          ]},
          { title: "Đường kính", items: [
            { name: "Ø16 mm", slug: "ong-dan-dien" },
            { name: "Ø20 mm", slug: "ong-dan-dien" },
            { name: "Ø25–32 mm", slug: "ong-dan-dien" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Co nối T/L", slug: "ong-dan-dien" },
            { name: "Đế âm tường", slug: "ong-dan-dien" },
            { name: "Kẹp treo trần", slug: "ong-dan-dien" },
          ]},
        ],
      },
      {
        name: "Máng cáp", slug: "mang-day-dien", icon: "🛤️",
        image: "/img/nm-electrical-7.jpg?v=8",
        tagline: "Máng cáp thép, inox và nhôm — đi dây cho hành lang nhà xưởng và văn phòng.",
        highlights: [
          { name: "Máng thép phủ epoxy", image: "/img/ceramic-4-3.jpg?v=6", slug: "mang-day-dien" },
          { name: "Máng inox 304",       image: "/img/ceramic-4-4.jpg?v=6", slug: "mang-day-dien" },
          { name: "Thang cáp mạ kẽm",  image: "/img/ceramic-4-5.jpg?v=6", slug: "mang-day-dien" },
          { name: "Máng nhựa cong",       image: "/img/ceramic-4-1.jpg?v=6", slug: "mang-day-dien" },
        ],
        sections: [
          { title: "Chất liệu", items: [
            { name: "Thép phủ epoxy", slug: "mang-day-dien" },
            { name: "Inox 304", slug: "mang-day-dien" },
            { name: "Mạ kẽm nhúng nóng", slug: "mang-day-dien" },
          ]},
          { title: "Loại", items: [
            { name: "Máng đặc", slug: "mang-day-dien" },
            { name: "Máng đục lỗ", slug: "mang-day-dien" },
            { name: "Thang cáp công nghiệp", slug: "mang-day-dien" },
          ]},
          { title: "Phụ kiện", items: [
            { name: "Co nối T/Y", slug: "mang-day-dien" },
            { name: "Nắp đậy", slug: "mang-day-dien" },
            { name: "Giá treo trần", slug: "mang-day-dien" },
          ]},
        ],
      },
    ],
  },
];
