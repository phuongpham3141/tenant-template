import { CATEGORIES, type CategoryPage, type CatSubcatItem, type CatOverviewItem } from "./categories";

export type ProductImg = { src: string; total: number };

export type Supplier = {
  name: string;
  audited: boolean;
  loc: string;
};

export type ProdLabel = "amazing" | "month" | null;

export type ListingProduct = {
  id: string;
  title: string;
  desc: string;
  priceFrom: string;
  priceTo: string;
  unit: string;
  moq: string;
  img: ProductImg;
  isVideo?: boolean;
  amazing?: boolean;
  monthLabel?: string;
  guaranteed: boolean;
  supplier: Supplier;
};

export type FeaturedSupplier = {
  logo: string;
  name: string;
  audited: boolean;
  rating: number;
  videoCaption: string;
  videoSrc: string;
  miniProducts: { title: string; price: string; unit: string; img: string }[];
};

export type FilterGroup = {
  title: string;
  options: { name: string; count?: string }[];
  showMore?: boolean;
  nested?: { name: string; depth: number; active?: boolean }[];
};

export type LeafCategoryPage = {
  slug: string;
  parentSlug: string;
  title: string;
  parentName: string;
  l2Name: string;
  l2Slug?: string;
  resultsCount: string;
  chips: { name: string; active?: boolean }[];
  trendingChips: string[];
  faqs: { q: string; a: string }[];
  filters: FilterGroup[];
  featured: FeaturedSupplier;
  products: ListingProduct[];
};

export type LeafSeed = {
  parentSlug: string;
  parentName: string;
  l2Name: string;
  title: string;
  resultsCount: string;
  chips: string[];
  trendingChips: string[];
  productNames: string[];
  styles?: string[];
  materials?: string[];
  extraFilters?: { title: string; options: string[] }[];
  faqs?: { q: string; a: string }[];
  featuredSupplier?: {
    name: string;
    logo: string;
    loc: string;
    videoCaption: string;
    products: { title: string; price: string }[];
  };
};

const photo = (seed: string) => `https://picsum.photos/seed/${seed}/400/400`;

export const LEAF_CATEGORIES: Record<string, LeafCategoryPage> = {
  "ghe-van-phong": {
    slug: "ghe-van-phong",
    parentSlug: "noi-that",
    title: "Ghế văn phòng",
    parentName: "Nội thất",
    l2Name: "Nội thất văn phòng",
    resultsCount: "77.906",
    chips: [
      { name: "Ghế văn phòng", active: true },
      { name: "Ghế lưới" },
      { name: "Ghế điều hành" },
      { name: "Ghế công thái học" },
      { name: "Ghế xoay" },
      { name: "Ghế da" },
    ],
    trendingChips: [
      "Ghế vẽ kỹ thuật",
      "Ghế phòng họp",
      "Ghế xếp chồng",
      "Ghế khách",
      "Ghế điều hành",
      "Ghế nhân viên",
      "Ghế công thái học",
      "Ghế lưới",
    ],
    faqs: [
      {
        q: "Ghế văn phòng công thái học có lợi ích gì?",
        a: "Ghế công thái học được thiết kế để hỗ trợ tự nhiên cột sống, giảm áp lực lên cổ, vai và lưng dưới. Khi ngồi nhiều giờ, ghế công thái học chất lượng tốt giúp cải thiện tư thế, giảm mệt mỏi và phòng ngừa các bệnh lý mạn tính như thoái hóa đốt sống cổ, đau thắt lưng. Đây là khoản đầu tư đáng tiền cho năng suất làm việc dài hạn.",
      },
      {
        q: "Có thể mua ghế văn phòng giá sỉ không?",
        a: "Hầu hết các nhà máy trên AlibabaVN đều hỗ trợ giá sỉ với MOQ từ 10–50 chiếc tùy mẫu. Bạn có thể gửi RFQ với số lượng cụ thể, các NCC sẽ phản hồi báo giá CIF/DDP về kho Việt Nam trong vòng 24 giờ. Đơn từ 100 chiếc thường được giảm 8–15% so với giá niêm yết. OEM đổi logo, đổi màu da, đổi đệm khả dụng cho đơn từ 200 chiếc.",
      },
      {
        q: "Làm sao chọn ghế văn phòng phù hợp với nhu cầu?",
        a: "Xác định trước: (1) thời gian ngồi mỗi ngày — dưới 4 giờ chọn ghế nhân viên cơ bản, trên 6 giờ nên chọn ghế công thái học; (2) chiều cao và cân nặng người dùng — ghế phải có dải nâng hạ phù hợp; (3) chất liệu — lưới thoáng cho khí hậu nóng, da/vải bouclé cho phòng máy lạnh. Yêu cầu mẫu thử trước khi đặt số lượng lớn.",
      },
    ],
    filters: [
      {
        title: "Lựa chọn mới",
        options: [
          { name: "Ghế nhân viên" },
          { name: "Ghế điều hành" },
          { name: "Ghế lưới" },
          { name: "Ghế phòng họp" },
          { name: "Ghế công thái học" },
        ],
      },
      {
        title: "Danh mục",
        options: [],
        nested: [
          { name: "Nội thất", depth: 0 },
          { name: "Nội thất văn phòng", depth: 1 },
          { name: "Ghế văn phòng", depth: 2, active: true },
        ],
      },
      {
        title: "Phong cách",
        options: [
          { name: "Cổ điển", count: "540" },
          { name: "Hiện đại", count: "63.567" },
          { name: "Tối giản", count: "3.714" },
          { name: "Trung Hoa", count: "748" },
          { name: "Mỹ", count: "154" },
        ],
        showMore: true,
      },
      {
        title: "Vật liệu",
        options: [
          { name: "Vải", count: "30.933" },
          { name: "Da thật", count: "3.431" },
          { name: "Da tổng hợp", count: "14.332" },
        ],
      },
      {
        title: "Xoay",
        options: [{ name: "Ghế xoay", count: "59.064" }],
      },
      {
        title: "Tay vịn",
        options: [
          { name: "Có tay vịn", count: "63.466" },
          { name: "Không tay vịn", count: "14.440" },
        ],
      },
      {
        title: "Nơi xuất xứ",
        options: [
          { name: "Quảng Đông", count: "45.289" },
          { name: "Triết Giang", count: "12.103" },
          { name: "Phúc Kiến", count: "5.874" },
        ],
      },
    ],
    featured: {
      logo: "YF",
      name: "Công ty TNHH Sản xuất Nội thất YAFON Quảng Châu",
      audited: true,
      rating: 4,
      videoCaption: "Không gian riêng, không gian chung",
      videoSrc: photo("yafon-video"),
      miniProducts: [
        { title: "Ghế công thái học lưới cao cấp YF-A88", price: "155$-299$", unit: "/ Bộ", img: photo("yf1") },
        { title: "Ghế điều hành da bò Ý chân nhôm đúc", price: "320$-540$", unit: "/ Bộ", img: photo("yf2") },
        { title: "Ghế phòng họp xếp chồng khung thép", price: "65$-110$", unit: "/ Bộ", img: photo("yf3") },
        { title: "Ghế khách chân chữ A bọc vải bouclé", price: "78$-145$", unit: "/ Bộ", img: photo("yf4") },
        { title: "Ghế công thái học YF-A99 có để chân", price: "210$-399$", unit: "/ Bộ", img: photo("yf5") },
      ],
    },
    products: [
      {
        id: "p1",
        title: "Ghế văn phòng lưới công thái học chân nhôm có gối tựa đầu điều chỉnh",
        desc: "Khung thép sơn tĩnh điện, lưới thoáng khí Đức, tựa lưng cong S 3D, tay vịn 4D, cơ chế tilt khoá 3 vị trí. Sản xuất tại Quảng Đông, OEM 200pcs+.",
        priceFrom: "30,00$",
        priceTo: "33,00$",
        unit: "/ Bộ",
        moq: "1 Bộ",
        img: { src: photo("chair1"), total: 4 },
        amazing: true,
        monthLabel: "Tháng 4",
        guaranteed: true,
        supplier: {
          name: "Công ty Nội thất Aston Phật Sơn",
          audited: true,
          loc: "📍 Quảng Đông, Trung Quốc",
        },
      },
      {
        id: "p2",
        title: "Ghế điều hành da bò Ý cao cấp tựa đầu massage cơ học chân nhôm đúc",
        desc: "Da bò Italia 1.6mm, đệm mút cao su tự nhiên, hệ thống massage 8 điểm chạy bằng pin. Bảo hành 5 năm. Phù hợp phòng giám đốc, văn phòng cao cấp.",
        priceFrom: "189,00$",
        priceTo: "245,00$",
        unit: "/ Bộ",
        moq: "5 Bộ",
        img: { src: photo("chair2"), total: 5 },
        isVideo: true,
        guaranteed: true,
        supplier: {
          name: "Công ty TNHH Nội thất Hengxin",
          audited: true,
          loc: "📍 Triết Giang, Trung Quốc",
        },
      },
      {
        id: "p3",
        title: "Ghế phòng họp xếp chồng được khung thép bọc vải nỉ chống cháy",
        desc: "Vải nỉ chống cháy BS5852, khung thép sơn tĩnh điện, đệm mút PU đúc. Xếp chồng 10 ghế. Lý tưởng cho phòng họp, hội trường, khu vực sự kiện.",
        priceFrom: "18,50$",
        priceTo: "26,00$",
        unit: "/ Bộ",
        moq: "20 Bộ",
        img: { src: photo("chair3"), total: 3 },
        amazing: true,
        guaranteed: true,
        supplier: {
          name: "Công ty Nội thất Yongkang Spring",
          audited: true,
          loc: "📍 Triết Giang, Trung Quốc",
        },
      },
      {
        id: "p4",
        title: "Ghế công thái học AKF-X3 lưới Mỹ chân nhôm đỡ thắt lưng năng động",
        desc: "Lưới USA Matrex2, đỡ thắt lưng khí nén tự điều chỉnh, tay vịn 5D, gối tựa đầu xoay 360. Đạt chứng nhận BIFMA, GREENGUARD GOLD. Bảo hành khung 12 năm.",
        priceFrom: "98,00$",
        priceTo: "165,00$",
        unit: "/ Bộ",
        moq: "10 Bộ",
        img: { src: photo("chair4"), total: 6 },
        isVideo: true,
        amazing: true,
        monthLabel: "Tháng 4",
        guaranteed: true,
        supplier: {
          name: "Công ty Nội thất AKF Quảng Châu",
          audited: true,
          loc: "📍 Quảng Đông, Trung Quốc",
        },
      },
      {
        id: "p5",
        title: "Ghế nhân viên xoay 360 lưng lưới có tay vịn cố định, chân nhựa 5 cánh",
        desc: "Lưng lưới poly, đệm mút PU, tay vịn cố định bọc PU, chân nhựa nylon 5 cánh, xy-lanh khí nén loại 4. Phù hợp văn phòng startup, coworking.",
        priceFrom: "12,80$",
        priceTo: "18,50$",
        unit: "/ Bộ",
        moq: "50 Bộ",
        img: { src: photo("chair5"), total: 4 },
        guaranteed: true,
        supplier: {
          name: "Công ty TNHH Nội thất Sihoo",
          audited: true,
          loc: "📍 Phúc Kiến, Trung Quốc",
        },
      },
      {
        id: "p6",
        title: "Ghế công thái học YAFON YF-A88 lưới Đức tựa đầu 4D bảo hành 10 năm",
        desc: "Lưới Đức Matrex, khung thép cường độ cao, tay vịn 4D điều chỉnh độ cao/sâu/xoay/nghiêng. Đệm ngồi mềm độ dày 12cm. Đạt SGS và BIFMA-X5.",
        priceFrom: "155,00$",
        priceTo: "299,00$",
        unit: "/ Bộ",
        moq: "1 Bộ",
        img: { src: photo("chair6"), total: 8 },
        isVideo: true,
        amazing: true,
        guaranteed: true,
        supplier: {
          name: "Công ty TNHH Sản xuất Nội thất YAFON Quảng Châu",
          audited: true,
          loc: "📍 Quảng Đông, Trung Quốc",
        },
      },
      {
        id: "p7",
        title: "Ghế xoay làm việc đệm da PU chân nhôm 5 cánh, tay vịn cố định",
        desc: "Da PU 1.2mm chống xước, đệm mút PU đúc cao 10cm, chân nhôm sơn đen mờ, bánh xe PU 60mm di chuyển êm. Phù hợp cả nhà và văn phòng.",
        priceFrom: "42,00$",
        priceTo: "65,00$",
        unit: "/ Bộ",
        moq: "10 Bộ",
        img: { src: photo("chair7"), total: 5 },
        monthLabel: "Tháng 4",
        guaranteed: true,
        supplier: {
          name: "Công ty Nội thất Hooker Foshan",
          audited: true,
          loc: "📍 Quảng Đông, Trung Quốc",
        },
      },
      {
        id: "p8",
        title: "Ghế khách văn phòng chân chữ A khung thép, đệm bouclé màu kem",
        desc: "Bouclé Pháp 100% polyester, khung thép mạ chrome, đệm mút HD 8cm, khả năng chịu tải 150kg. Style Bắc Âu sang trọng, tinh tế.",
        priceFrom: "55,00$",
        priceTo: "82,00$",
        unit: "/ Bộ",
        moq: "20 Bộ",
        img: { src: photo("chair8"), total: 4 },
        amazing: true,
        guaranteed: true,
        supplier: {
          name: "Công ty Nội thất Bewinner Đông Quan",
          audited: true,
          loc: "📍 Quảng Đông, Trung Quốc",
        },
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Seed-based leaf generator (used for home-garden subcats and inline items)
// ---------------------------------------------------------------------------

// Deterministic small hash (FNV-1a 32-bit) for picking templates from a slug.
function hashSeed(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}

// Synthetic but plausible facet count based on slug + label.
function synthCount(slug: string, label: string): string {
  const h = hashSeed(slug + "::" + label);
  // Range 250 .. 90000 with bias towards 4-digit values.
  const v = 250 + (h % 89_750);
  return v.toLocaleString("vi-VN").replace(/,/g, ".");
}

// Realistic-looking USD price with comma decimals (Vietnamese trade convention).
function priceTier(slug: string, idx: number): { from: string; to: string; unit: string } {
  const h = hashSeed(slug + "::price::" + idx);
  // Pick a base from a tier table — varies across leaves.
  const tiers: Array<{ base: number; unit: string }> = [
    { base: 4, unit: "/ Cái" },
    { base: 8, unit: "/ Bộ" },
    { base: 12, unit: "/ Chiếc" },
    { base: 22, unit: "/ Bộ" },
    { base: 35, unit: "/ Cái" },
    { base: 58, unit: "/ Bộ" },
    { base: 95, unit: "/ Bộ" },
    { base: 145, unit: "/ Bộ" },
  ];
  const t = tiers[(h + idx) % tiers.length];
  const jitter = (h % 13) / 10; // 0.0 - 1.2
  const lo = t.base + jitter * t.base * 0.15;
  const hi = lo * (1.18 + ((h >> 4) % 17) / 100); // +18%..+34%
  const fmt = (n: number) => n.toFixed(2).replace(".", ",") + "$";
  return { from: fmt(lo), to: fmt(hi), unit: t.unit };
}

const SUPPLIER_TEMPLATES: Array<{ name: string; loc: string; logo: string }> = [
  { name: "Công ty TNHH Trang trí Lifeart Quảng Châu", loc: "📍 Quảng Đông, Trung Quốc", logo: "LA" },
  { name: "Công ty CP Sản xuất Tianyu Nghĩa Ô", loc: "📍 Triết Giang, Trung Quốc", logo: "TY" },
  { name: "Công ty TNHH Hangyu Nội ngoại thất Hạ Môn", loc: "📍 Phúc Kiến, Trung Quốc", logo: "HY" },
  { name: "Công ty Sản xuất Greenland Lâm Nghi", loc: "📍 Sơn Đông, Trung Quốc", logo: "GL" },
  { name: "Công ty TNHH Trang trí Bayue Bảo Định", loc: "📍 Hà Bắc, Trung Quốc", logo: "BY" },
  { name: "Công ty CP Đồ gia dụng Sunpower Tô Châu", loc: "📍 Giang Tô, Trung Quốc", logo: "SP" },
  { name: "Công ty TNHH Cảnh Đức Trấn Ceramic", loc: "📍 Giang Tây, Trung Quốc", logo: "CD" },
  { name: "Công ty Sản xuất Foshan Brightway", loc: "📍 Quảng Đông, Trung Quốc", logo: "BW" },
  { name: "Công ty TNHH Yongkang Hardware", loc: "📍 Triết Giang, Trung Quốc", logo: "YK" },
  { name: "Công ty CP Ningbo Greenhome", loc: "📍 Triết Giang, Trung Quốc", logo: "NB" },
];

const FEATURED_VIDEO_CAPTIONS = [
  "Dây chuyền sản xuất 12.000m² — quy trình QC khép kín",
  "OEM cho hơn 80 thương hiệu quốc tế",
  "Đặt hàng từ 1 mẫu — DDP tận kho VN trong 18 ngày",
  "Showroom 1.500m² — sản phẩm trưng bày đầy đủ",
  "Xưởng đạt BSCI, ISO 9001, Sedex",
];

function pickSupplier(slug: string, offset = 0) {
  const h = hashSeed(slug + "::sup::" + offset);
  return SUPPLIER_TEMPLATES[(h + offset) % SUPPLIER_TEMPLATES.length];
}

function buildLeafFromSeed(slug: string, seed: LeafSeed): LeafCategoryPage {
  // Filters
  const filters: FilterGroup[] = [];

  filters.push({
    title: "Lựa chọn mới",
    options: seed.chips.slice(0, 6).map((c) => ({ name: c })),
  });

  filters.push({
    title: "Danh mục",
    options: [],
    nested: [
      { name: seed.parentName, depth: 0 },
      { name: seed.l2Name, depth: 1 },
      { name: seed.title, depth: 2, active: true },
    ],
  });

  if (seed.styles && seed.styles.length) {
    filters.push({
      title: "Phong cách",
      options: seed.styles.map((s) => ({ name: s, count: synthCount(slug, "style:" + s) })),
      showMore: seed.styles.length > 5,
    });
  }

  if (seed.materials && seed.materials.length) {
    filters.push({
      title: "Vật liệu",
      options: seed.materials.map((m) => ({ name: m, count: synthCount(slug, "mat:" + m) })),
      showMore: seed.materials.length > 5,
    });
  }

  if (seed.extraFilters) {
    for (const ef of seed.extraFilters) {
      filters.push({
        title: ef.title,
        options: ef.options.map((o) => ({ name: o, count: synthCount(slug, ef.title + ":" + o) })),
        showMore: ef.options.length > 5,
      });
    }
  }

  filters.push({
    title: "Nơi xuất xứ",
    options: [
      { name: "Quảng Đông", count: synthCount(slug, "origin:gd") },
      { name: "Triết Giang", count: synthCount(slug, "origin:zj") },
      { name: "Phúc Kiến", count: synthCount(slug, "origin:fj") },
    ],
  });

  // Featured supplier
  let featured: FeaturedSupplier;
  if (seed.featuredSupplier) {
    const fs = seed.featuredSupplier;
    featured = {
      logo: fs.logo,
      name: fs.name,
      audited: true,
      rating: 4 + ((hashSeed(slug + "::rate") % 2)),
      videoCaption: fs.videoCaption,
      videoSrc: photo(slug + "-fvideo"),
      miniProducts: fs.products.map((p, i) => ({
        title: p.title,
        price: p.price,
        unit: i % 2 === 0 ? "/ Bộ" : "/ Cái",
        img: photo(slug + "-fmini-" + i),
      })),
    };
  } else {
    const fs = pickSupplier(slug);
    const captionIdx = hashSeed(slug + "::cap") % FEATURED_VIDEO_CAPTIONS.length;
    featured = {
      logo: fs.logo,
      name: fs.name,
      audited: true,
      rating: 4 + ((hashSeed(slug + "::rate") % 2)),
      videoCaption: FEATURED_VIDEO_CAPTIONS[captionIdx],
      videoSrc: photo(slug + "-fvideo"),
      miniProducts: seed.productNames.slice(0, 5).map((title, i) => {
        const p = priceTier(slug, i + 100);
        return {
          title: title.length > 60 ? title.slice(0, 57) + "…" : title,
          price: `${p.from}-${p.to}`,
          unit: p.unit,
          img: photo(slug + "-fmini-" + i),
        };
      }),
    };
  }

  // Products
  const moqPool = ["1 Bộ", "1 Cái", "5 Bộ", "10 Bộ", "20 Cái", "50 Cái", "100 Cái", "200 Cái"];
  const monthLabels = ["Tháng 4", "Tháng 5", "Mới"];
  const products: ListingProduct[] = seed.productNames.slice(0, 8).map((name, i) => {
    const sup = pickSupplier(slug, i + 1);
    const p = priceTier(slug, i);
    const h = hashSeed(slug + "::p::" + i);
    const desc = buildProductDesc(name, seed, i);
    return {
      id: `p${i + 1}`,
      title: name,
      desc,
      priceFrom: p.from,
      priceTo: p.to,
      unit: p.unit,
      moq: moqPool[(h + i) % moqPool.length],
      img: { src: photo(slug + "-prod-" + i), total: 3 + ((h >> 3) % 6) },
      isVideo: i % 3 === 0,
      amazing: i % 2 === 0,
      monthLabel: i % 4 === 0 ? monthLabels[(h >> 5) % monthLabels.length] : undefined,
      guaranteed: true,
      supplier: {
        name: sup.name,
        audited: true,
        loc: sup.loc,
      },
    };
  });

  // FAQs
  const faqs =
    seed.faqs && seed.faqs.length === 3
      ? seed.faqs
      : [
          {
            q: `MOQ tối thiểu cho ${seed.title.toLowerCase()} là bao nhiêu?`,
            a: `MOQ phổ biến cho ${seed.title.toLowerCase()} dao động từ 1–50 đơn vị tùy mẫu và mức độ tùy chỉnh. Đơn từ 100 đơn vị thường được giảm 8–15% so với giá niêm yết. Nhà máy có thể nhận sample 1 cái để kiểm tra chất lượng trước khi đặt số lượng lớn — phí sample sẽ được trừ vào đơn chính thức.`,
          },
          {
            q: `Có thể đặt ${seed.title.toLowerCase()} theo OEM/ODM không?`,
            a: `Hầu hết các nhà máy trong danh mục này hỗ trợ OEM (in logo, đổi màu, đổi bao bì) từ 200 đơn vị và ODM (thiết kế riêng) từ 500 đơn vị. Thời gian sản xuất trung bình 25–40 ngày kể từ khi duyệt mẫu. AlibabaVN có hỗ trợ kỹ thuật phối hợp với nhà máy nếu bạn cần tư vấn vật liệu, kết cấu, kích thước.`,
          },
          {
            q: `Vận chuyển ${seed.title.toLowerCase()} về Việt Nam như thế nào?`,
            a: `Các đơn ${seed.title.toLowerCase()} thường được vận chuyển bằng đường biển LCL/FCL từ cảng Quảng Châu, Ninh Ba, Hạ Môn về Hải Phòng/TP.HCM. AlibabaVN cung cấp dịch vụ DDP — bao thuế, bao thông quan, giao tận kho — cho 99% mã sản phẩm trong danh mục. Thời gian door-to-door 14–21 ngày tùy cảng đi và thời điểm.`,
          },
        ];

  return {
    slug,
    parentSlug: seed.parentSlug,
    title: seed.title,
    parentName: seed.parentName,
    l2Name: seed.l2Name,
    resultsCount: seed.resultsCount,
    chips: seed.chips.map((c, i) => ({ name: c, active: i === 0 })),
    trendingChips: seed.trendingChips,
    faqs,
    filters,
    featured,
    products,
  };
}

function buildProductDesc(name: string, seed: LeafSeed, idx: number): string {
  // Pick a description pattern; vary by index so the listing feels organic.
  const certs = ["CE, RoHS", "ISO 9001, BSCI", "SGS, REACH", "BSCI, Sedex", "CE, FCC"];
  const minOrder = ["MOQ 50 cái", "MOQ 100 cái", "MOQ 200 cái", "MOQ 1 bộ (sample)", "MOQ 20 bộ"];
  const ports = ["FOB Quảng Châu", "FOB Ninh Ba", "FOB Hạ Môn", "FOB Thanh Đảo"];
  const mat = seed.materials?.[idx % (seed.materials.length || 1)];
  const style = seed.styles?.[idx % (seed.styles.length || 1)];
  const c = certs[idx % certs.length];
  const m = minOrder[idx % minOrder.length];
  const port = ports[idx % ports.length];
  const matPart = mat ? `${mat}, ` : "";
  const stylePart = style ? `phong cách ${style.toLowerCase()}, ` : "";
  return `${matPart}${stylePart}đạt chứng nhận ${c}. ${m}. Hỗ trợ OEM in logo, đổi màu, đổi bao bì cho đơn từ 200 cái. Giao hàng ${port}, DDP về Hải Phòng/TP.HCM 16–22 ngày.`;
}

// ---------------------------------------------------------------------------
// Helper builders for repeated facet groups
// ---------------------------------------------------------------------------

const SIZE_FILTER = {
  title: "Kích thước",
  options: ["Nhỏ (<30cm)", "Vừa (30–60cm)", "Lớn (60–100cm)", "Đại (>100cm)"],
};

const APP_INDOOR_OUTDOOR = {
  title: "Ứng dụng",
  options: ["Trong nhà", "Ngoài trời", "Khách sạn", "Resort", "Sân vườn", "Sảnh văn phòng"],
};

// ---------------------------------------------------------------------------
// HOME_GARDEN_LEAVES — seed map for every subcat + inline item under home-garden
// ---------------------------------------------------------------------------

const PARENT = "home-garden";
const PARENT_NAME = "Nhà & Sân vườn";

export const HOME_GARDEN_LEAVES: Record<string, LeafSeed> = {
  // ===========================================================================
  // Section 1 — Trang trí trong nhà (decoration-indoor)
  // ===========================================================================
  "tuong-vat-pham-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí trong nhà",
    title: "Tượng & Vật phẩm trang trí",
    resultsCount: "62.418",
    chips: [
      "Tượng resin",
      "Tượng composite",
      "Tượng phong thủy",
      "Tượng phật ngọc",
      "Tượng động vật decor",
      "Bộ tượng để bàn",
    ],
    trendingChips: [
      "Tượng phật ngọc bích",
      "Tượng cá chép phong thủy",
      "Tượng ngựa đồng",
      "Tượng đầu tuần lộc",
      "Tượng abstract resin",
      "Tượng nai vàng",
      "Tượng angel composite",
      "Bộ tượng 3 mèo thần tài",
    ],
    productNames: [
      "Tượng phật ngọc bích A-Di-Đà 30cm khắc thủ công, đế gỗ tử đàn",
      "Bộ 3 tượng ngựa đồng phong thủy tỷ lệ 1:18, mạ vàng 24K",
      "Tượng đầu tuần lộc resin treo tường 45cm, sơn metallic gold",
      "Tượng cá chép vượt vũ môn composite 60cm, hoàn thiện đá nhân tạo",
      "Tượng abstract face hiện đại resin trắng 35cm để bàn console",
      "Bộ tượng 3 mèo thần tài Maneki-Neko vàng nhũ 18cm",
      "Tượng nai vàng Bắc Âu kim loại 50cm, base đá cẩm thạch",
      "Tượng angel composite 80cm sân vườn, sơn antique vintage",
    ],
    styles: ["Hiện đại", "Tân cổ điển", "Trung Hoa", "Bắc Âu", "Châu Âu cổ điển", "Phật giáo"],
    materials: ["Resin", "Composite", "Đồng đúc", "Sợi thủy tinh", "Đá nhân tạo", "Gốm sứ"],
    extraFilters: [SIZE_FILTER, APP_INDOOR_OUTDOOR],
  },

  "hoa-gia-cay-gia": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí trong nhà",
    title: "Hoa giả & Cây giả",
    resultsCount: "118.245",
    chips: [
      "Cây ô liu giả",
      "Hoa hồng lụa",
      "Cây kim tiền giả",
      "Lan hồ điệp giả",
      "Cây bonsai giả",
      "Cỏ pampas khô",
    ],
    trendingChips: [
      "Cây ô liu nhân tạo 1.8m",
      "Hoa lan hồ điệp 5 cành",
      "Hoa hồng lụa baby breath",
      "Cây kim tiền lá xanh 1.2m",
      "Cây bàng singapore giả",
      "Hoa anh đào giả cành dài",
      "Cây trầu bà giả cao 1.5m",
      "Cây bonsai mini bàn làm việc",
    ],
    productNames: [
      "Cây ô liu giả cao 180cm, 1.200 lá real-touch latex, chậu xi măng",
      "Hoa lan hồ điệp lụa Phalaenopsis 5 cành, real-touch silicon",
      "Cây bàng Singapore giả cao 160cm, lá EVA in 3D, gốc gỗ thật",
      "Hoa hồng lụa Garden Rose hộp 50 cành baby breath nhồi bông",
      "Cây kim tiền giả 6 nhánh cao 120cm, lá real-touch chống tia UV",
      "Cây bonsai mini ficus 30cm để bàn, chậu gốm Cảnh Đức men rạn",
      "Cành hoa anh đào giả Sakura dài 1.5m, sử dụng wedding/event",
      "Bó cỏ pampas khô tự nhiên 10 cành dài 110cm, nhuộm kem",
    ],
    styles: ["Tự nhiên", "Bắc Âu", "Tân cổ điển", "Hiện đại", "Đám cưới"],
    materials: ["Lụa polyester", "Latex (real-touch)", "EVA in 3D", "Nhựa PE", "Cỏ khô tự nhiên"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Dịp sử dụng", options: ["Trang trí nhà", "Đám cưới", "Sự kiện", "Khách sạn", "Showroom"] },
    ],
  },

  "hoa-lua": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí trong nhà",
    title: "Hoa lụa",
    resultsCount: "48.912",
    chips: ["Hoa hồng lụa", "Hoa peony lụa", "Hoa cẩm tú cầu", "Hoa hướng dương", "Hoa baby breath", "Hoa cúc lụa"],
    trendingChips: [
      "Hoa hồng lụa Garden Rose",
      "Hoa peony nhân tạo cành dài",
      "Hoa cẩm tú cầu lụa",
      "Hoa hướng dương đám cưới",
      "Bó hoa lụa cô dâu cầm tay",
      "Hoa baby breath nhồi bông",
      "Hoa lavender khô lụa",
      "Hoa cúc đại đóa lụa",
    ],
    productNames: [
      "Hoa hồng lụa Garden Rose 65 đầu hoa real-touch, hộp gift box",
      "Cụm peony lụa Pháp đỏ rượu 5 đầu, cành kim loại uốn cong",
      "Hoa cẩm tú cầu lụa Hydrangea, đầu hoa 18cm, dùng cắm bình lớn",
      "Hoa hướng dương lụa cành dài 70cm, lõi nhồi bông cotton",
      "Hoa baby breath lụa nhồi bông cao cấp, bó 50 cành",
      "Hoa lavender lụa khô màu tím nhạt, bó 80 cành 35cm",
      "Hoa cúc đại đóa lụa nhiều màu, đầu hoa 12cm, cành dài 60cm",
      "Bó hoa cô dâu cầm tay lụa hồng phấn + xanh sage, ribbon satin",
    ],
    styles: ["Đám cưới", "Cổ điển", "Bắc Âu", "Tự nhiên", "Vintage"],
    materials: ["Lụa polyester", "Latex (real-touch)", "Bông cotton nhồi", "Polyester+EVA"],
    extraFilters: [
      { title: "Số đầu hoa", options: ["1 đầu", "3-5 đầu", "5-10 đầu", "10-30 đầu", "Trên 30 đầu"] },
      { title: "Dịp", options: ["Đám cưới", "Trang trí nhà", "Sự kiện", "Quà tặng", "Khách sạn"] },
    ],
  },

  "cay-o-liu": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí trong nhà",
    title: "Cây ô liu giả",
    resultsCount: "12.408",
    chips: ["Cây ô liu 1m", "Cây ô liu 1.8m", "Cây ô liu 2.5m", "Topiary ô liu", "Real-touch", "Ô liu trong chậu"],
    trendingChips: [
      "Cây ô liu giả 1.8m chậu xi măng",
      "Cây ô liu 2.5m sảnh khách sạn",
      "Cây ô liu mini để bàn 60cm",
      "Topiary ô liu tròn",
      "Lá ô liu real-touch latex",
      "Cây ô liu trồng gốc gỗ thật",
      "Cây ô liu Bắc Âu Tuscany",
      "Combo 2 cây ô liu sảnh",
    ],
    productNames: [
      "Cây ô liu giả Tuscany cao 180cm, 1.200 lá real-touch, gốc gỗ thật",
      "Cây ô liu mini cao 60cm để bàn, chậu gốm men rạn 18cm",
      "Cây ô liu cao 250cm sảnh khách sạn, 2.500 lá EVA UV-stable",
      "Topiary ô liu tròn đôi cao 130cm, base ceramic trắng",
      "Cây ô liu giả cao 150cm thân quấn dây thừng, 800 lá",
      "Cây ô liu cao 100cm chậu xi măng vuông 22cm, decor minimalist",
      "Cây ô liu giả 4 thân cao 200cm, hiệu ứng cây thật 95%",
      "Cây ô liu giả treo tường 80cm, khung dây thép uốn",
    ],
    styles: ["Tuscany", "Bắc Âu", "Tối giản", "Hiện đại", "Mediterranean"],
    materials: ["Lá EVA UV", "Lá latex real-touch", "Gốc gỗ thật", "Thân nhựa PE"],
    extraFilters: [
      { title: "Chiều cao", options: ["<60cm", "60-100cm", "100-150cm", "150-200cm", ">200cm"] },
    ],
  },

  "cay-kim-tien-gia": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí trong nhà",
    title: "Cây kim tiền giả",
    resultsCount: "9.245",
    chips: ["Kim tiền 1.2m", "Kim tiền mini", "Real-touch", "Lá xanh đậm", "Chậu xi măng", "ZZ plant"],
    trendingChips: [
      "Cây kim tiền giả 1.2m",
      "Kim tiền mini để bàn",
      "Lá kim tiền real-touch",
      "Cây kim tiền chậu xi măng",
      "ZZ plant nhân tạo",
      "Kim tiền 6 nhánh",
      "Kim tiền cao 1.5m sảnh",
      "Cây kim tiền văn phòng",
    ],
    productNames: [
      "Cây kim tiền giả 6 nhánh cao 120cm, lá real-touch chống UV",
      "Kim tiền mini 35cm để bàn, chậu gốm trắng dáng tròn 12cm",
      "Cây kim tiền cao 150cm 8 nhánh, 220 lá xanh đậm bóng",
      "Cây kim tiền cao 90cm chậu xi măng vuông 18cm",
      "Combo 2 cây kim tiền giả văn phòng + chậu inox 304",
      "ZZ plant nhân tạo cao 70cm, lá EVA chống cháy",
      "Cây kim tiền lá biến thể đen Raven 1.2m hot trend",
      "Cây kim tiền giả treo trần dài 60cm, móc treo inox",
    ],
    styles: ["Hiện đại", "Tối giản", "Bắc Âu", "Văn phòng"],
    materials: ["Lá real-touch latex", "Lá EVA UV", "Lá nhựa PE bóng"],
    extraFilters: [
      { title: "Chiều cao", options: ["<50cm", "50-100cm", "100-150cm", ">150cm"] },
    ],
  },

  "hoa-lan-gia": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí trong nhà",
    title: "Hoa lan giả",
    resultsCount: "21.084",
    chips: ["Lan hồ điệp", "Lan vũ nữ", "Lan dendrobium", "Lan hài", "Real-touch", "Cắm chậu sẵn"],
    trendingChips: [
      "Lan hồ điệp giả 5 cành",
      "Lan hồ điệp real-touch",
      "Lan dendrobium giả",
      "Hoa lan trắng cắm chậu",
      "Lan hồ điệp tím",
      "Lan vũ nữ vàng",
      "Lan hồ điệp mini bàn làm việc",
      "Lan hồ điệp khách sạn lễ tân",
    ],
    productNames: [
      "Hoa lan hồ điệp giả 5 cành Phalaenopsis trắng, real-touch silicon",
      "Lan hồ điệp tím cắm chậu 9 cành, chậu sứ Cảnh Đức men ngọc",
      "Lan vũ nữ vàng cành dài 65cm, hoa nhỏ 3cm dùng bouquet",
      "Lan dendrobium giả nhiều màu, cành dài 50cm, dùng cắm bình",
      "Lan hài giả monopodial 4 cành, kèm rêu khô tự nhiên",
      "Combo 3 chậu lan hồ điệp mini real-touch để bàn lễ tân",
      "Lan hồ điệp xanh ngọc đặc biệt, 5 cành 70cm cắm chậu sứ",
      "Lan trắng nguyên cành 90cm dùng cắm bình lớn sảnh khách sạn",
    ],
    styles: ["Cổ điển", "Hiện đại", "Khách sạn", "Đám cưới"],
    materials: ["Real-touch silicon", "Lụa polyester", "Latex"],
    extraFilters: [
      { title: "Số cành", options: ["3 cành", "5 cành", "7 cành", "9 cành", "Trên 9 cành"] },
      { title: "Có chậu sẵn", options: ["Đã cắm chậu", "Cành rời"] },
    ],
  },

  "binh-hoa-lo-hoa": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí trong nhà",
    title: "Bình hoa & Lọ hoa",
    resultsCount: "54.620",
    chips: ["Bình gốm sứ", "Bình thủy tinh", "Bình kim loại", "Bình resin", "Bình mây tre", "Set bình decor"],
    trendingChips: [
      "Bình gốm sứ Cảnh Đức",
      "Bình thủy tinh handmade",
      "Bình hoa kim loại đồng",
      "Bình resin abstract",
      "Bình hoa cao 50cm",
      "Bình mini để bàn",
      "Bình thủy tinh bong bóng",
      "Set 3 bình decor Bắc Âu",
    ],
    productNames: [
      "Bình gốm sứ Cảnh Đức men rạn cổ cao 45cm, vẽ thủ công",
      "Bình thủy tinh borosilicate handmade dáng quả lê 30cm",
      "Bình hoa kim loại đồng đỏ cao 55cm, hiệu ứng patina cổ",
      "Bình resin abstract trắng dáng face decor 35cm",
      "Bình mây tre đan thủ công 40cm, miệng tròn dùng cắm khô",
      "Set 3 bình gốm Bắc Âu đa kích thước men matte trắng kem",
      "Bình thủy tinh bong bóng art glass đa sắc 28cm",
      "Bình ceramic vintage chạm nổi hoa văn cobalt 50cm",
    ],
    styles: ["Trung Hoa cổ", "Bắc Âu", "Hiện đại", "Vintage", "Industrial", "Art-deco"],
    materials: ["Gốm sứ", "Thủy tinh handmade", "Kim loại đồng", "Resin", "Mây tre"],
    extraFilters: [SIZE_FILTER],
  },

  "tuong-cay-nhan-tao": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí trong nhà",
    title: "Tường cây nhân tạo",
    resultsCount: "32.105",
    chips: ["Module 60×60", "Module 50×50", "Cây xanh hỗn hợp", "Có hoa", "Chống UV", "Chống cháy B1"],
    trendingChips: [
      "Tường cây giả module 60×60",
      "Tường cây có hoa lan",
      "Tường cây chống UV ngoài trời",
      "Tường cây chống cháy B1",
      "Tường cây sảnh lễ tân",
      "Tường cây phòng họp",
      "Tường cây quán cà phê",
      "Tường cây nhà hàng",
    ],
    productNames: [
      "Module tường cây giả 60×60cm chống UV outdoor, mật độ cao",
      "Module tường cây 50×50cm có hoa lan + cẩm tú cầu",
      "Tường cây nhân tạo chống cháy B1 dùng trong sảnh",
      "Module cây cọ tropical 1×1m hiệu ứng rừng",
      "Tường cây có gắn rêu trang trí — phối hỗn hợp eucalyptus",
      "Module tường cây dày 12cm, viền kim loại đen mờ",
      "Tường cây giả nhỏ 40×60cm dùng đầu giường, decor sofa",
      "Tường cây 3D module có chống ẩm, dùng ban công",
    ],
    styles: ["Tropical", "Bắc Âu", "Tự nhiên", "Modern jungle"],
    materials: ["Lá nhựa PE", "Lá EVA UV", "Khung nhôm", "Khung nhựa PP"],
    extraFilters: [
      { title: "Khả năng chống cháy", options: ["B1 chống cháy", "Tiêu chuẩn (không CC)"] },
      { title: "Khả năng chống UV", options: ["Có chống UV (outdoor)", "Indoor only"] },
    ],
  },

  "vach-ngan-gap": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí trong nhà",
    title: "Vách ngăn gấp",
    resultsCount: "8.940",
    chips: ["3 cánh", "4 cánh", "6 cánh", "Vách gỗ", "Vách bọc vải", "Vách rỗng decor"],
    trendingChips: [
      "Vách ngăn gấp 4 cánh gỗ chạm",
      "Vách ngăn bọc vải nhung",
      "Vách ngăn 3 cánh khung kim loại",
      "Vách ngăn họa tiết Trung Hoa",
      "Vách ngăn phòng tắm",
      "Vách ngăn gấp 6 cánh sảnh",
      "Vách ngăn rỗng decor căn hộ",
      "Vách ngăn gỗ tre đan",
    ],
    productNames: [
      "Vách ngăn gấp 4 cánh gỗ MDF chạm hoa văn Trung Hoa, cao 180cm",
      "Vách ngăn bọc vải nhung 3 cánh khung gỗ sồi, cao 170cm",
      "Vách ngăn 4 cánh khung kim loại đen mờ + lưới rattan đan",
      "Vách ngăn 6 cánh sảnh khách sạn, vẽ thủ công cảnh sơn thủy",
      "Vách ngăn 3 cánh gỗ tre tự nhiên, mỗi cánh rộng 45cm",
      "Vách ngăn gấp 4 cánh tổ ong giấy honeycomb cao 160cm",
      "Vách ngăn gấp 5 cánh mặt gương, decor phòng khách",
      "Vách ngăn gấp 4 cánh khung nhôm kính mờ phun cát",
    ],
    styles: ["Trung Hoa", "Hiện đại", "Bắc Âu", "Industrial", "Vintage"],
    materials: ["Gỗ MDF", "Gỗ sồi", "Kim loại", "Nhôm", "Tre tự nhiên", "Vải nhung"],
    extraFilters: [
      { title: "Số cánh", options: ["3 cánh", "4 cánh", "5 cánh", "6 cánh"] },
    ],
  },

  "khung-tranh-nghe-thuat": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí trong nhà",
    title: "Khung tranh nghệ thuật",
    resultsCount: "76.520",
    chips: ["Khung composite", "Khung gỗ", "Khung nhôm", "Tranh canvas", "Tranh poster", "Bộ tranh 3-5 tấm"],
    trendingChips: [
      "Khung tranh canvas trừu tượng",
      "Bộ tranh 3 tấm Bắc Âu",
      "Khung tranh gỗ sồi",
      "Tranh poster vintage",
      "Khung composite mạ vàng",
      "Tranh canvas khổ lớn 120x80",
      "Bộ tranh phòng khách 5 tấm",
      "Khung ảnh để bàn",
    ],
    productNames: [
      "Khung tranh canvas trừu tượng khổ 80×120cm, viền composite mạ vàng",
      "Bộ 3 khung tranh Bắc Âu khổ 30×40cm, viền gỗ sồi tự nhiên",
      "Khung tranh poster vintage A2, viền nhôm đen mờ",
      "Bộ 5 khung tranh phòng khách 50×70cm, hoa lá baroque",
      "Khung composite chạm hoa văn cổ điển khổ 60×90cm mạ vàng",
      "Khung ảnh để bàn 10×15cm gỗ óc chó tự nhiên, set 4 cái",
      "Khung canvas mỏng art-deco khổ 100×150cm viền vàng",
      "Bộ 4 tranh canvas trừu tượng tone xanh navy 40×60cm",
    ],
    styles: ["Bắc Âu", "Tân cổ điển", "Hiện đại", "Industrial", "Art-deco", "Vintage"],
    materials: ["Composite", "Gỗ sồi", "Gỗ óc chó", "Nhôm", "PS chạm cổ điển"],
    extraFilters: [
      { title: "Kích thước", options: ["A4-A3", "30×40-50×70", "60×90", "80×120", "Trên 100cm"] },
    ],
  },

  "do-trang-tri-gom-su": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí trong nhà",
    title: "Đồ trang trí gốm sứ",
    resultsCount: "29.310",
    chips: ["Cảnh Đức Trấn", "Men rạn", "Men ngọc", "Vẽ tay", "Set decor", "Mini để bàn"],
    trendingChips: [
      "Bình gốm Cảnh Đức men rạn",
      "Bộ ấm trà gốm sứ vẽ tay",
      "Tượng gốm sứ phật bà",
      "Đĩa gốm trang trí treo tường",
      "Bình hoa gốm men ngọc",
      "Set 3 bình decor matte",
      "Bộ tượng mèo gốm sứ",
      "Hộp đựng gốm sứ men cobalt",
    ],
    productNames: [
      "Bình gốm sứ Cảnh Đức men rạn cao 45cm, vẽ thủ công cảnh xuân",
      "Bộ ấm trà gốm sứ vẽ tay cobalt blue, 1 ấm + 6 chén",
      "Tượng gốm sứ phật bà Quan Âm men ngọc cao 30cm",
      "Đĩa gốm trang trí treo tường đường kính 35cm men rạn",
      "Set 3 bình decor matte trắng kem cao 18-25-32cm",
      "Bộ 2 tượng mèo gốm sứ trắng decor handmade 15cm",
      "Hộp đựng gốm sứ men cobalt blue & white, nắp khắc nổi rồng",
      "Tượng cá chép gốm sứ Cảnh Đức men cobalt cao 25cm phong thủy",
    ],
    styles: ["Trung Hoa cổ", "Bắc Âu", "Vintage", "Tối giản", "Tân cổ điển"],
    materials: ["Sứ Cảnh Đức", "Gốm men rạn", "Sứ matte", "Sứ men ngọc"],
    extraFilters: [SIZE_FILTER],
  },

  // ===========================================================================
  // Section 2 — Trang trí sân vườn (garden-decor)
  // ===========================================================================
  "tuong-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí sân vườn",
    title: "Tượng vườn",
    resultsCount: "27.840",
    chips: ["Sư tử đá", "Tượng phật", "Tượng động vật", "Tượng angel", "Tượng abstract", "Tượng cá chép"],
    trendingChips: [
      "Tượng sư tử đá nguyên khối",
      "Tượng phật ngoài trời",
      "Tượng angel composite",
      "Tượng cá chép phong thủy",
      "Tượng nai vàng kim loại",
      "Tượng abstract sân vườn",
      "Tượng kỳ lân đá hoa cương",
      "Bộ tượng linh vật cổng",
    ],
    productNames: [
      "Tượng sư tử đá granite nguyên khối cao 1.2m, đôi cổng biệt thự",
      "Tượng phật A-Di-Đà composite ngoài trời cao 1.8m, sơn metallic",
      "Tượng angel composite 80cm chống UV outdoor, base đá",
      "Tượng cá chép phong thủy đá tổng hợp cao 1m, vảy mạ vàng",
      "Tượng nai vàng kim loại sân vườn cao 1.4m, hoàn thiện brass",
      "Bộ 2 tượng kỳ lân đá hoa cương cao 80cm, chân đế chạm trổ",
      "Tượng abstract resin gia cường sợi thủy tinh outdoor 1.5m",
      "Tượng đầu sư tử treo cổng đá nhân tạo, mạ vàng cổ điển",
    ],
    styles: ["Trung Hoa cổ", "Châu Âu cổ điển", "Phật giáo", "Hiện đại"],
    materials: ["Đá granite", "Đá nhân tạo", "Composite GFRC", "Bronze đúc", "Đồng đỏ"],
    extraFilters: [SIZE_FILTER],
  },

  "su-tu-da": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí sân vườn",
    title: "Sư tử đá",
    resultsCount: "9.680",
    chips: ["Đá granite", "Đá hoa cương", "Đá tổng hợp", "Cao 1m", "Cao 1.5m", "Đôi sư tử cổng"],
    trendingChips: [
      "Sư tử đá granite nguyên khối",
      "Đôi sư tử đá cổng biệt thự",
      "Sư tử đá Trung Hoa cổ",
      "Sư tử đá granite G654",
      "Sư tử đá ngân nhũ",
      "Đầu sư tử treo cổng",
      "Sư tử đá Tàu cao 1m",
      "Sư tử đá phong thủy",
    ],
    productNames: [
      "Đôi sư tử đá granite G654 nguyên khối cao 1.2m, điêu khắc thủ công",
      "Sư tử đá hoa cương đỏ cao 1.5m, đế chạm trổ vân mây",
      "Cặp sư tử đá tổng hợp cao 80cm, hoàn thiện màu đá tự nhiên",
      "Sư tử đá granite G603 cao 1m, dáng ngồi truyền thống",
      "Đầu sư tử treo cổng đá granite đường kính 40cm, móc inox",
      "Sư tử đá G682 vàng cao 1.8m, base chạm hoa văn rồng phượng",
      "Cặp sư tử mini đá tổng hợp cao 50cm, đặt bậc tam cấp",
      "Sư tử đá granite nguyên khối cao 2.2m, dự án quốc tế",
    ],
    styles: ["Trung Hoa cổ", "Cung đình", "Cổ điển"],
    materials: ["Đá granite G654", "Đá granite G603", "Đá hoa cương đỏ", "Đá tổng hợp"],
    extraFilters: [
      { title: "Chiều cao", options: ["50-80cm", "80-120cm", "120-180cm", "Trên 180cm"] },
    ],
  },

  "tuong-phat-ngoai-troi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí sân vườn",
    title: "Tượng phật ngoài trời",
    resultsCount: "11.230",
    chips: ["Phật A-Di-Đà", "Phật bà Quan Âm", "Phật Thích Ca", "Cao 1m", "Cao 1.8m", "Cao 3m"],
    trendingChips: [
      "Tượng A-Di-Đà composite outdoor",
      "Tượng Quan Âm GFRC cao 2m",
      "Tượng Thích Ca tọa thiền",
      "Tượng phật đá granite",
      "Tượng phật mạ vàng outdoor",
      "Tượng phật chùa cao 3m",
      "Tượng phật mini sân vườn",
      "Tượng phật khu nghỉ dưỡng",
    ],
    productNames: [
      "Tượng phật A-Di-Đà composite GFRC ngoài trời cao 1.8m, finish granite",
      "Tượng Quan Âm bồ tát đứng cao 2.5m, composite gia cường sợi thủy tinh",
      "Tượng Thích Ca tọa thiền đá granite nguyên khối cao 1.2m",
      "Tượng phật mạ vàng cao 1.5m, lõi composite phủ vàng PVD",
      "Tượng phật ngồi đá tổng hợp cao 80cm dùng sân vườn nhỏ",
      "Tượng phật khu nghỉ dưỡng cao 3m, hoàn thiện đồng giả cổ",
      "Tượng phật mini bench vườn cao 60cm composite chống UV",
      "Tượng phật bằng đá hoa cương trắng cao 1.6m, chạm thủ công",
    ],
    styles: ["Phật giáo", "Á Đông", "Cổ điển"],
    materials: ["Composite GFRC", "Đá granite", "Đá tổng hợp", "Bronze đúc"],
    extraFilters: [
      { title: "Chiều cao", options: ["<1m", "1-2m", "2-3m", "Trên 3m"] },
    ],
  },

  "tuong-dong-vat": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí sân vườn",
    title: "Tượng động vật",
    resultsCount: "14.560",
    chips: ["Tượng nai", "Tượng cá chép", "Tượng ngựa", "Tượng voi", "Tượng chim", "Tượng kỳ lân"],
    trendingChips: [
      "Tượng nai vàng outdoor",
      "Tượng cá chép phong thủy",
      "Tượng ngựa đồng phong thủy",
      "Tượng voi đá granite",
      "Tượng chim hạc kim loại",
      "Tượng kỳ lân cổng",
      "Tượng cừu sân vườn",
      "Tượng đại bàng đá",
    ],
    productNames: [
      "Tượng nai vàng outdoor cao 1.4m, kim loại hoàn thiện brass cổ",
      "Tượng cá chép phong thủy đá tổng hợp cao 1m vảy mạ vàng",
      "Bộ 3 tượng ngựa đồng phong thủy tỷ lệ 1:8 mạ vàng 24K",
      "Tượng voi đá granite nguyên khối cao 80cm, đôi đặt cổng",
      "Bộ tượng chim hạc kim loại sân vườn cao 1.5m, tone vàng đồng",
      "Tượng kỳ lân đá hoa cương đôi cao 1m, base chạm cổ điển",
      "Tượng cừu trắng composite GFRC outdoor cao 70cm",
      "Tượng đại bàng đá tổng hợp cao 1.2m, dang cánh 1.5m",
    ],
    styles: ["Trung Hoa cổ", "Bắc Âu", "Hiện đại", "Bronze cổ điển"],
    materials: ["Composite GFRC", "Đồng đúc", "Đá tổng hợp", "Đá granite", "Kim loại sơn brass"],
    extraFilters: [SIZE_FILTER],
  },

  "dai-phun-nuoc": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí sân vườn",
    title: "Đài phun nước",
    resultsCount: "6.420",
    chips: ["3 tầng", "5 tầng", "Tròn", "Vuông", "Có đèn LED", "Composite GFRC"],
    trendingChips: [
      "Đài phun nước 3 tầng tròn",
      "Đài phun nước có LED",
      "Đài phun nước GFRC ngoài trời",
      "Đài phun nước 5 tầng cổ điển",
      "Đài phun nước biệt thự",
      "Đài phun mini sân vườn",
      "Đài phun đá granite",
      "Đài phun nước có tượng",
    ],
    productNames: [
      "Đài phun nước 3 tầng composite GFRC tròn đường kính 1.8m, có LED",
      "Đài phun nước 5 tầng cổ điển cao 2.4m, hoàn thiện đá nhân tạo",
      "Đài phun mini sân vườn cao 70cm, kèm bơm chìm 35W tiết kiệm",
      "Đài phun đá granite tự nhiên đường kính 2m, hoa văn chạm tay",
      "Đài phun nước có tượng nữ thần Hy Lạp cao 1.8m GFRC",
      "Đài phun nước vuông 1.5×1.5m hiện đại, pha LED đổi màu",
      "Đài phun cá chép vượt vũ môn cao 1.6m, có hệ thống tuần hoàn",
      "Đài phun nước stone bowl đường kính 80cm, dùng ban công",
    ],
    styles: ["Cổ điển châu Âu", "Trung Hoa cổ", "Hiện đại", "Mediterranean"],
    materials: ["Composite GFRC", "Đá granite", "Đá tổng hợp", "Composite + LED"],
    extraFilters: [
      { title: "Số tầng", options: ["1 tầng", "2 tầng", "3 tầng", "5 tầng"] },
      { title: "Có đèn LED", options: ["Có LED đổi màu", "LED trắng", "Không LED"] },
    ],
  },

  "den-vuon-led": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí sân vườn",
    title: "Đèn vườn LED",
    resultsCount: "42.310",
    chips: ["Đèn cột", "Đèn cắm cỏ", "Đèn pha", "Đèn dây", "IP65", "IP66"],
    trendingChips: [
      "Đèn cột sân vườn cao 2m",
      "Đèn cắm cỏ inox 304",
      "Đèn pha LED 50W IP66",
      "Đèn vườn LED đổi màu",
      "Đèn dây LED 10m",
      "Đèn vườn solar tích hợp",
      "Đèn motif hươu LED",
      "Đèn lồng treo solar",
    ],
    productNames: [
      "Đèn cột sân vườn LED 12W cao 2m, vỏ nhôm sơn tĩnh điện đen mờ",
      "Đèn cắm cỏ inox 304 LED 5W IP65, ánh sáng vàng 3000K",
      "Đèn pha LED 50W IP66 vỏ nhôm đúc, dùng chiếu mặt tiền biệt thự",
      "Dây đèn LED ngoài trời 10m IP65, 100 bóng warm white",
      "Đèn vườn LED RGB đổi màu 8W, app điều khiển bluetooth",
      "Đèn motif hươu LED Noel cao 1.2m, dùng outdoor IP44",
      "Đèn lồng treo solar LED, vỏ kim loại đen mờ, 4 chiếc/set",
      "Đèn cột vườn cao 80cm dáng nấm, vỏ nhôm hoàn thiện đồng",
    ],
    styles: ["Hiện đại", "Cổ điển châu Âu", "Tối giản", "Industrial"],
    materials: ["Vỏ nhôm đúc", "Inox 304", "Vỏ nhựa PC chống UV"],
    extraFilters: [
      { title: "Cấp bảo vệ IP", options: ["IP44", "IP65", "IP66", "IP67"] },
      { title: "Công suất", options: ["3-5W", "5-10W", "10-20W", "20-50W", "Trên 50W"] },
      { title: "Nguồn năng lượng", options: ["AC 220V", "Solar", "Pin sạc", "DC 12V"] },
    ],
  },

  "co-banner-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí sân vườn",
    title: "Cờ & Banner trang trí",
    resultsCount: "5.910",
    chips: ["Cờ vườn", "Banner sự kiện", "Cờ holiday", "Polyester", "In digital", "Cột cờ"],
    trendingChips: [
      "Cờ trang trí vườn polyester",
      "Banner sự kiện vẽ tay",
      "Cờ Noel polyester",
      "Cờ vườn 4 mùa",
      "Banner double-sided in",
      "Cờ cá đuôi vườn",
      "Set cờ vườn 12 tháng",
      "Cột cờ vườn xoắn",
    ],
    productNames: [
      "Cờ trang trí vườn polyester 30×45cm in 2 mặt, theme bốn mùa",
      "Banner sự kiện double-sided 50×80cm vải Oxford 600D",
      "Set 12 cờ vườn theo tháng polyester chống UV, kèm cột xoắn",
      "Cờ Noel polyester 35×50cm, in nhiệt bền màu, treo móc inox",
      "Banner ngoài trời vinyl in digital 1×3m chống thấm",
      "Cờ cá đuôi koi sân vườn dài 1.2m vải dù chống nước",
      "Cột cờ vườn xoắn cao 1m kim loại sơn tĩnh điện",
      "Cờ Halloween polyester 30×45 in 3D pumpkin set 6 cái",
    ],
    styles: ["Holiday", "Bốn mùa", "Vintage", "Modern"],
    materials: ["Polyester 110D", "Oxford 600D", "Vinyl in digital", "Vải dù"],
    extraFilters: [
      { title: "Dịp", options: ["Noel", "Halloween", "Tết Tây", "4 mùa", "Sự kiện"] },
    ],
  },

  "qua-cau-thuy-tinh-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí sân vườn",
    title: "Quả cầu thủy tinh trang trí",
    resultsCount: "4.380",
    chips: ["Phản chiếu", "Mạ bạc", "Đa sắc", "20cm", "30cm", "50cm"],
    trendingChips: [
      "Quả cầu thủy tinh mạ bạc",
      "Quả cầu phản chiếu vườn",
      "Quả cầu thủy tinh đa sắc",
      "Quả cầu trang trí 30cm",
      "Quả cầu nổi mặt nước",
      "Set 3 quả cầu decor vườn",
      "Quả cầu hoa văn vintage",
      "Quả cầu khắc laser",
    ],
    productNames: [
      "Quả cầu thủy tinh phản chiếu 30cm, mạ bạc gương ngoài trời",
      "Set 3 quả cầu mạ thủy tinh đa sắc 15-20-25cm, decor vườn",
      "Quả cầu thủy tinh nổi mặt nước đường kính 20cm tone xanh",
      "Quả cầu mạ rainbow 35cm bóng phản chiếu, dùng decor cổng",
      "Quả cầu khắc laser hoa văn mandala đường kính 25cm",
      "Quả cầu mạ vàng đồng cổ điển 30cm, base kim loại đen",
      "Quả cầu thủy tinh art glass 28cm, hand-blown thủ công",
      "Quả cầu thủy tinh dày mạ chrome 50cm, dùng sân vườn lớn",
    ],
    styles: ["Hiện đại", "Vintage", "Bohemian", "Cổ điển"],
    materials: ["Thủy tinh dày mạ", "Thủy tinh hand-blown", "Acrylic mạ"],
    extraFilters: [
      { title: "Đường kính", options: ["<20cm", "20-30cm", "30-40cm", "Trên 40cm"] },
    ],
  },

  "phu-dieu-tuong-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí sân vườn",
    title: "Phù điêu tường vườn",
    resultsCount: "3.760",
    chips: ["Phù điêu PU", "Phù điêu composite", "Phù điêu đá", "Hoa văn cổ điển", "Hiện đại", "3D"],
    trendingChips: [
      "Phù điêu nhựa PU tường vườn",
      "Phù điêu composite hoa văn",
      "Phù điêu đá nhân tạo",
      "Phù điêu chạm rồng phượng",
      "Phù điêu hoa hồng cổ điển",
      "Phù điêu 3D abstract",
      "Phù điêu mặt sư tử cổng",
      "Phù điêu thiên thần baroque",
    ],
    productNames: [
      "Phù điêu PU tường vườn hoa hồng baroque 60×90cm, sơn antique",
      "Phù điêu composite chạm rồng phượng 1×2m, finish đá granite",
      "Phù điêu đá nhân tạo mặt sư tử đường kính 40cm",
      "Phù điêu PU thiên thần baroque 80cm cao, mạ vàng cổ điển",
      "Phù điêu 3D abstract composite 1×1.5m, sơn metallic",
      "Phù điêu hoa văn Trung Hoa 60×120cm, finish bronze",
      "Phù điêu PU mặt nữ thần Hy Lạp 50cm, treo cổng biệt thự",
      "Phù điêu hoa cẩm tú cầu PU 80×60cm, sơn tone vintage",
    ],
    styles: ["Baroque", "Trung Hoa cổ", "Châu Âu cổ điển", "Hiện đại"],
    materials: ["Nhựa PU", "Composite GFRC", "Đá tổng hợp", "Đá nhân tạo"],
    extraFilters: [SIZE_FILTER],
  },

  "do-trang-tri-san-golf": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí sân vườn",
    title: "Đồ trang trí sân golf",
    resultsCount: "2.140",
    chips: ["Cờ tee", "Bia đá tee", "Bench golf", "Biển chỉ dẫn", "Tượng trang trí", "Đèn cắm cỏ"],
    trendingChips: [
      "Cờ tee golf polyester",
      "Bia đá tee box granite",
      "Bench golf gỗ chống nước",
      "Biển chỉ dẫn sân golf inox",
      "Tượng decor sân golf",
      "Đèn cắm cỏ inox golf",
      "Cột yardage marker",
      "Pole cờ tee aluminum",
    ],
    productNames: [
      "Cờ tee golf polyester double-sided in logo, kèm cột nhôm 1.8m",
      "Bia đá granite khắc tee box 30×60cm, finish polished",
      "Bench golf gỗ teak chống nước dài 1.6m, kèm bảng số hole",
      "Biển chỉ dẫn sân golf inox 304 vuông 40×40cm khắc laser",
      "Cột yardage marker nhôm cao 1.2m, sơn tĩnh điện trắng",
      "Tượng decor sân golf composite hình golfer cao 60cm",
      "Đèn cắm cỏ inox 304 LED 3W IP65, dùng đêm gala golf",
      "Bộ pole cờ tee aluminum 1.8m, base inox + cờ tùy chỉnh logo",
    ],
    styles: ["Cổ điển", "Hiện đại", "Sang trọng"],
    materials: ["Inox 304", "Đá granite", "Gỗ teak", "Nhôm sơn tĩnh điện"],
    extraFilters: [
      { title: "Loại sản phẩm", options: ["Cờ & Pole", "Bia & Marker", "Bench & Đồ nội thất", "Đèn"] },
    ],
  },

  // ===========================================================================
  // Section 3 — Chậu hoa & Bồn cây (planters)
  // ===========================================================================
  "chau-nhua-pe": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Chậu hoa & Bồn cây",
    title: "Chậu nhựa PE",
    resultsCount: "63.250",
    chips: ["Chậu PE tròn", "Chậu PE vuông", "Chậu PE chữ nhật", "Chậu treo", "Chậu rattan giả", "Có lỗ thoát nước"],
    trendingChips: [
      "Chậu nhựa PE chữ nhật ban công",
      "Chậu PE tròn cao 60cm",
      "Chậu PE vuông 50×50cm",
      "Chậu PE rattan giả",
      "Chậu treo PE",
      "Chậu PE tự tưới",
      "Chậu PE màu xám matte",
      "Chậu PE đen 80cm",
    ],
    productNames: [
      "Chậu nhựa PE chữ nhật 60×20×18cm ban công, có lỗ thoát nước",
      "Chậu PE tròn cao 60cm đường kính 50cm, finish xám matte",
      "Chậu PE vuông 50×50×50cm dùng cây cảnh sảnh, đáy gỗ thật",
      "Set 3 chậu PE rattan giả tròn 25-30-35cm, decor ban công",
      "Chậu PE treo balcony tự tưới 30cm, kèm móc kim loại đen",
      "Chậu PE đen mờ kích thước 80×30×30cm dùng landscape",
      "Set 6 chậu PE mini tròn 12cm tone trắng kem để bàn",
      "Chậu PE chống tia UV 100×40cm, lined đen, dáng trụ",
    ],
    styles: ["Hiện đại", "Tối giản", "Mediterranean", "Bắc Âu"],
    materials: ["Nhựa PE rotomold", "Nhựa PE chống UV", "PE rattan-effect"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Hình dáng", options: ["Tròn", "Vuông", "Chữ nhật", "Trụ cao", "Treo"] },
    ],
  },

  "chau-composite-soi-thuy-tinh": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Chậu hoa & Bồn cây",
    title: "Chậu composite & Sợi thủy tinh",
    resultsCount: "28.940",
    chips: ["GFRC", "Fiberclay", "Fiberglass", "Trụ cao", "Tròn lớn", "Vuông 80cm"],
    trendingChips: [
      "Chậu composite GFRC trụ cao",
      "Chậu fiberclay tròn",
      "Chậu fiberglass cao 80cm",
      "Chậu sợi thủy tinh sảnh",
      "Chậu trụ cao 100cm landscape",
      "Chậu composite chống UV",
      "Chậu fiberclay xám matte",
      "Chậu composite outdoor 1.2m",
    ],
    productNames: [
      "Chậu composite GFRC trụ cao 100cm đường kính 35cm, finish granite",
      "Chậu fiberclay tròn đường kính 60cm cao 50cm, tone xám matte",
      "Chậu fiberglass cao 80cm đường kính 50cm, dùng sảnh khách sạn",
      "Chậu composite vuông 80×80×80cm chống UV, có lỗ thoát + đĩa lót",
      "Chậu fiberclay tone đất nung Đường 80×40cm, dùng cây bonsai lớn",
      "Chậu composite GFRC vân đá granite 1.2m landscape biệt thự",
      "Set 2 chậu composite trụ tone xanh navy cao 80-100cm",
      "Chậu sợi thủy tinh đường kính 1.5m cao 60cm dùng cây cọ lớn",
    ],
    styles: ["Hiện đại", "Tối giản", "Mediterranean", "Industrial"],
    materials: ["Composite GFRC", "Fiberclay", "Fiberglass GRP"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Khả năng chống UV", options: ["Có chống UV", "Tiêu chuẩn"] },
    ],
  },

  "chau-gom-su": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Chậu hoa & Bồn cây",
    title: "Chậu gốm sứ",
    resultsCount: "37.620",
    chips: ["Cảnh Đức Trấn", "Men rạn", "Men ngọc", "Vẽ tay", "Đường kính 30cm", "Đường kính 50cm"],
    trendingChips: [
      "Chậu gốm sứ Cảnh Đức 40cm",
      "Chậu gốm men rạn cổ",
      "Chậu sứ men ngọc trồng lan",
      "Chậu gốm vẽ tay cobalt",
      "Set 3 chậu gốm decor",
      "Chậu sứ trồng cây bonsai",
      "Chậu gốm Cảnh Đức blue & white",
      "Chậu gốm trắng matte để bàn",
    ],
    productNames: [
      "Chậu gốm sứ Cảnh Đức Trấn vẽ tay đường kính 40cm cao 35cm",
      "Chậu gốm men rạn cổ đường kính 50cm, hoa văn xanh cobalt",
      "Chậu sứ men ngọc đường kính 30cm dùng trồng lan hồ điệp",
      "Set 3 chậu sứ matte trắng kem 12-15-18cm decor để bàn",
      "Chậu sứ vẽ tay rồng phượng đường kính 60cm, dùng cây cảnh lớn",
      "Chậu sứ Cảnh Đức cobalt blue & white đường kính 35cm cao 30cm",
      "Chậu sứ trồng bonsai mini đường kính 12cm men ngọc, set 6",
      "Chậu sứ Đường tone đất nung đường kính 45cm, vân khắc thủ công",
    ],
    styles: ["Trung Hoa cổ", "Bắc Âu", "Tân cổ điển", "Tối giản"],
    materials: ["Sứ Cảnh Đức", "Gốm men rạn", "Sứ matte", "Sứ men ngọc"],
    extraFilters: [
      { title: "Đường kính", options: ["<20cm", "20-30cm", "30-50cm", "50-80cm", "Trên 80cm"] },
    ],
  },

  "chau-xi-mang": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Chậu hoa & Bồn cây",
    title: "Chậu xi măng",
    resultsCount: "14.380",
    chips: ["Vuông", "Tròn", "Trụ cao", "Đáy gỗ", "Tone xám", "Tone đất nung"],
    trendingChips: [
      "Chậu xi măng vuông 50cm",
      "Chậu xi măng trụ cao 80cm",
      "Chậu xi măng tròn 40cm",
      "Chậu xi măng đáy gỗ",
      "Chậu xi măng decor minimalist",
      "Set 3 chậu xi măng",
      "Chậu xi măng tone đất nung",
      "Chậu xi măng siêu nhẹ GFRC",
    ],
    productNames: [
      "Chậu xi măng vuông 50×50×50cm, finish xám matte, có lỗ thoát",
      "Chậu xi măng trụ cao 80cm đường kính 30cm, dáng tối giản",
      "Chậu xi măng tròn 40cm cao 35cm tone đất nung, đáy gỗ teak",
      "Set 3 chậu xi măng vuông 15-20-25cm decor để bàn",
      "Chậu xi măng GFRC siêu nhẹ vuông 80×80cm, giảm 60% trọng lượng",
      "Chậu xi măng dáng bowl đường kính 60cm cao 25cm tone xám",
      "Chậu xi măng landscape vuông 1×1×0.6m chống nứt",
      "Chậu xi măng mini hexagon 15cm, set 6 cái decor",
    ],
    styles: ["Tối giản", "Industrial", "Hiện đại", "Brutalist"],
    materials: ["Xi măng đúc", "Xi măng GFRC siêu nhẹ", "Xi măng polymer"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Trọng lượng", options: ["Tiêu chuẩn", "Siêu nhẹ GFRC"] },
    ],
  },

  "chau-inox-kim-loai": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Chậu hoa & Bồn cây",
    title: "Chậu inox & Kim loại",
    resultsCount: "9.840",
    chips: ["Inox 304", "Inox vàng PVD", "Tôn galvanized", "Đồng đỏ", "Đáy gỗ", "Vuông"],
    trendingChips: [
      "Chậu inox 304 trụ cao",
      "Chậu inox mạ vàng PVD",
      "Chậu galvanized vintage",
      "Chậu kim loại đáy gỗ",
      "Chậu inox đường kính 50cm",
      "Chậu inox vuông 40cm",
      "Chậu đồng đỏ patina",
      "Chậu inox sảnh khách sạn",
    ],
    productNames: [
      "Chậu inox 304 trụ cao 100cm đường kính 35cm, finish hairline",
      "Chậu inox mạ vàng PVD vuông 40×40cm, dùng sảnh sang trọng",
      "Chậu galvanized vintage tròn đường kính 50cm, có quai xách",
      "Chậu kim loại đáy gỗ teak đường kính 35cm cao 30cm",
      "Chậu inox 304 đường kính 60cm cao 60cm, hairline brushed",
      "Chậu đồng đỏ patina cổ điển vuông 30×30cm decor sảnh",
      "Set 3 chậu inox vàng PVD 18-25-32cm decor căn hộ cao cấp",
      "Chậu inox 304 hình hexagon đường kính 50cm dùng sảnh tòa nhà",
    ],
    styles: ["Hiện đại", "Industrial", "Sang trọng", "Vintage"],
    materials: ["Inox 304", "Inox vàng PVD", "Tôn galvanized", "Đồng đỏ"],
    extraFilters: [
      { title: "Hoàn thiện", options: ["Hairline", "Mirror polished", "Mạ vàng PVD", "Patina cổ"] },
    ],
  },

  "bon-trong-tu-tuoi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Chậu hoa & Bồn cây",
    title: "Bồn trồng tự tưới",
    resultsCount: "8.130",
    chips: ["Ban công", "Vuông", "Chữ nhật", "Có hệ thống bấc", "Có chỉ báo nước", "Cao 30cm"],
    trendingChips: [
      "Bồn tự tưới ban công",
      "Bồn tự tưới chữ nhật 60cm",
      "Bồn trồng có chỉ báo nước",
      "Bồn tự tưới hệ thống bấc",
      "Bồn tự tưới đứng nhiều tầng",
      "Bồn tự tưới rau gia đình",
      "Bồn tự tưới trồng dâu",
      "Bồn tự tưới tròn 40cm",
    ],
    productNames: [
      "Bồn tự tưới ban công chữ nhật 60×20×18cm, hệ thống bấc + chỉ báo nước",
      "Bồn tự tưới đứng 3 tầng cao 90cm, trồng rau gia đình ban công",
      "Bồn tự tưới tròn 40cm cao 35cm, lõi reservoir 5L",
      "Bồn tự tưới chữ nhật 1m × 25cm × 25cm, trồng rau quanh năm",
      "Bồn tự tưới sân thượng vuông 50×50cm, capacity 25L nước",
      "Set 3 bồn tự tưới hexagon 25cm decor + trồng cây cảnh",
      "Bồn tự tưới trồng dâu treo balcony, 6 hốc trồng",
      "Bồn tự tưới đứng tự đặt cây 8 hốc cao 1.4m",
    ],
    styles: ["Hiện đại", "Tối giản", "Vertical garden"],
    materials: ["Nhựa PP nguyên sinh", "Nhựa PE", "Composite"],
    extraFilters: [
      { title: "Dung tích bồn nước", options: ["<5L", "5-10L", "10-25L", "Trên 25L"] },
      { title: "Cấu hình", options: ["1 ngăn", "2 ngăn", "Đứng nhiều tầng", "Treo nhiều hốc"] },
    ],
  },

  "gia-do-chau": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Chậu hoa & Bồn cây",
    title: "Giá đỡ chậu",
    resultsCount: "11.620",
    chips: ["Kim loại", "Gỗ", "3 tầng", "5 tầng", "Đứng góc", "Treo trần"],
    trendingChips: [
      "Giá đỡ chậu 3 tầng kim loại",
      "Giá đỡ chậu gỗ Bắc Âu",
      "Giá đỡ chậu đứng góc",
      "Giá đỡ chậu kim loại đen",
      "Giá đỡ chậu treo trần",
      "Giá đỡ chậu 5 tầng cao",
      "Giá đỡ chậu xếp gọn",
      "Giá đỡ chậu mini để bàn",
    ],
    productNames: [
      "Giá đỡ chậu kim loại 3 tầng cao 75cm, sơn tĩnh điện đen mờ",
      "Giá đỡ chậu gỗ sồi Bắc Âu 4 tầng dáng zig-zag cao 110cm",
      "Giá đỡ chậu đứng góc kim loại 5 tầng cao 1.4m, dùng ban công",
      "Giá đỡ treo trần móc inox dây thừng 3 tầng decor cây leo",
      "Giá đỡ chậu mini để bàn 2 tầng kim loại vàng đồng",
      "Giá đỡ chậu xếp gọn dáng thang gỗ thông cao 1.6m",
      "Giá đỡ chậu industrial ống nước đen, 4 tầng treo tường",
      "Giá đỡ chậu modular ghép module mỗi tầng cao 25cm",
    ],
    styles: ["Bắc Âu", "Industrial", "Hiện đại", "Vintage"],
    materials: ["Kim loại sơn tĩnh điện", "Gỗ thông", "Gỗ sồi", "Inox 304"],
    extraFilters: [
      { title: "Số tầng", options: ["1-2 tầng", "3 tầng", "4 tầng", "5+ tầng"] },
      { title: "Kiểu lắp đặt", options: ["Đứng sàn", "Đứng góc", "Treo tường", "Treo trần"] },
    ],
  },

  "treo-tran-treo-tuong": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Chậu hoa & Bồn cây",
    title: "Chậu treo trần & Treo tường",
    resultsCount: "13.420",
    chips: ["Macrame", "Móc kim loại", "Đáy thoát nước", "Kèm dây", "Treo cửa sổ", "Cây leo"],
    trendingChips: [
      "Chậu treo macrame cotton",
      "Chậu treo móc kim loại",
      "Chậu treo balcony",
      "Chậu treo cây leo",
      "Set 3 chậu macrame",
      "Chậu treo trần dài 1m",
      "Chậu treo tường thẳng đứng",
      "Chậu treo có đĩa thoát nước",
    ],
    productNames: [
      "Chậu treo macrame cotton handmade dài 80cm, kèm chậu sứ 18cm",
      "Chậu treo balcony nhựa PE đường kính 25cm, móc kim loại đen",
      "Chậu treo cây leo dài 60cm dáng cone, kèm dây dù 1m",
      "Set 3 chậu macrame mini cotton tone trắng kem 30-50-70cm",
      "Chậu treo tường thẳng đứng module 30×60cm 6 hốc trồng",
      "Chậu treo trần inox 304 đường kính 30cm, dây inox dài 1.2m",
      "Chậu treo trần ceramic dáng quả lê 25cm, dây cotton xoắn",
      "Chậu treo cửa sổ mini set 4 cái dây da bò 50cm",
    ],
    styles: ["Bohemian", "Bắc Âu", "Hiện đại", "Tropical"],
    materials: ["Cotton macrame", "Inox 304", "Nhựa PE", "Ceramic"],
    extraFilters: [
      { title: "Kiểu treo", options: ["Treo trần", "Treo tường", "Treo cửa sổ", "Treo balcony"] },
      { title: "Đường kính chậu", options: ["<15cm", "15-25cm", "25-35cm", "Trên 35cm"] },
    ],
  },

  // ===========================================================================
  // Section 4 — Dụng cụ làm vườn (garden-tools)
  // ===========================================================================
  "may-cat-co": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Dụng cụ làm vườn",
    title: "Máy cắt cỏ",
    resultsCount: "18.420",
    chips: ["Cầm tay", "Tự đẩy", "Robot", "2-thì", "4-thì", "Pin lithium"],
    trendingChips: [
      "Máy cắt cỏ cầm tay 2-thì 52cc",
      "Máy cắt cỏ tự đẩy",
      "Robot cắt cỏ tự động",
      "Máy cắt cỏ pin lithium 21V",
      "Máy cắt cỏ 4-thì 139cc",
      "Lưỡi cắt cỏ thép cứng",
      "Máy cắt cỏ điện AC",
      "Máy cắt cỏ đeo lưng",
    ],
    productNames: [
      "Máy cắt cỏ cầm tay 2-thì 52cc, công suất 1.9kW, tay cầm chống rung",
      "Máy cắt cỏ tự đẩy 4-thì 139cc, bề rộng cắt 51cm, có hộp gom cỏ 60L",
      "Robot cắt cỏ tự động bề rộng 28cm, pin lithium 5Ah, app điều khiển",
      "Máy cắt cỏ pin lithium 21V brushless, 2 pin 4Ah + sạc nhanh",
      "Máy cắt cỏ đeo lưng 4-thì Honda GX35, kèm 3 loại lưỡi cắt",
      "Máy cắt cỏ điện AC 1.6kW dùng vườn nhà, dây nguồn 10m",
      "Lưỡi cắt cỏ thép cứng dày 3mm, đường kính 25cm, set 5 lưỡi",
      "Máy cắt cỏ Hybrid 5-in-1 56cc kèm lưỡi cắt + tỉa hàng rào",
    ],
    styles: ["Sử dụng dân dụng", "Sử dụng chuyên nghiệp", "Sử dụng landscape"],
    materials: ["Vỏ nhựa ABS", "Lưỡi thép carbon", "Khung kim loại"],
    extraFilters: [
      { title: "Loại nguồn", options: ["Xăng 2-thì", "Xăng 4-thì", "Pin lithium", "AC điện"] },
      { title: "Công suất", options: ["<1kW", "1-1.5kW", "1.5-2.5kW", "Trên 2.5kW"] },
      { title: "Chứng nhận", options: ["CE", "EPA", "Euro V"] },
    ],
  },

  "keo-dao-lam-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Dụng cụ làm vườn",
    title: "Kéo & Dao làm vườn",
    resultsCount: "32.510",
    chips: ["Kéo cắt cành", "Kéo tỉa hàng rào", "Cưa cầm tay", "Pin lithium", "Cán dài", "Dao trồng cây"],
    trendingChips: [
      "Kéo cắt cành cán dài 60cm",
      "Kéo tỉa hàng rào 2 tay",
      "Kéo cắt cành pin 21V",
      "Cưa cành cong 35cm",
      "Kéo cắt cành thuỷ lực",
      "Kéo tỉa cảnh bonsai",
      "Dao trồng cây đa năng",
      "Set 6 kéo dao làm vườn",
    ],
    productNames: [
      "Kéo cắt cành lưỡi SK5 cán dài 60cm, lực cắt cành 32mm",
      "Kéo tỉa hàng rào 2 tay cán hợp kim nhôm dài 65cm, lưỡi 25cm",
      "Kéo cắt cành pin lithium 21V, cắt cành 30mm, 2 pin 2Ah",
      "Cưa cành cong 35cm thép Nhật SK5, cán cao su chống trượt",
      "Kéo cắt cành thuỷ lực ratchet, lực nhân 4 lần, cành tới 40mm",
      "Set kéo bonsai stainless steel 6 món, hộp da bò sang trọng",
      "Dao trồng cây hori-hori inox 304, lưỡi răng cưa, bao da",
      "Bộ kéo dao làm vườn 6 món thép Nhật, hộp đựng vải canvas",
    ],
    styles: ["Chuyên nghiệp", "Dân dụng", "Bonsai"],
    materials: ["Thép SK5", "Inox 304", "Thép carbon", "Hợp kim Nhật"],
    extraFilters: [
      { title: "Cơ cấu cắt", options: ["Bypass", "Anvil", "Ratchet", "Pin/Điện"] },
      { title: "Đường kính cắt", options: ["<15mm", "15-25mm", "25-35mm", "Trên 35mm"] },
    ],
  },

  "cuoc-xeng-cao": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Dụng cụ làm vườn",
    title: "Cuốc, xẻng, cào",
    resultsCount: "15.840",
    chips: ["Cán gỗ", "Cán fiberglass", "Đầu thép cứng", "Set 3 món", "Mini bonsai", "Cào lá"],
    trendingChips: [
      "Bộ cuốc xẻng cào 3 món",
      "Xẻng đào hố cán fiberglass",
      "Cuốc bàn thép cứng",
      "Cào lá đa năng",
      "Set dụng cụ bonsai mini",
      "Xẻng đào cây cán dài",
      "Cào sắt 14 răng",
      "Bộ 5 món làm vườn",
    ],
    productNames: [
      "Bộ cuốc xẻng cào 3 món thép carbon, cán gỗ tần bì 1.2m",
      "Xẻng đào hố cán fiberglass dài 1.2m, đầu thép forged",
      "Cuốc bàn thép cứng 1.5kg, cán gỗ tần bì sơn dầu 1.2m",
      "Cào lá đa năng 22 răng, cán nhôm dài 1.65m",
      "Set 9 món dụng cụ bonsai mini stainless, hộp da",
      "Xẻng đào cây cán dài 1.4m thép forged dày 4mm",
      "Cào sắt 14 răng cán fiberglass dùng đào đất, 1.4m",
      "Bộ 5 món làm vườn cán nhôm: cuốc, xẻng, cào, dầm, cuốc chim",
    ],
    styles: ["Chuyên nghiệp", "Dân dụng", "Bonsai"],
    materials: ["Thép carbon forged", "Inox 304", "Cán gỗ tần bì", "Cán fiberglass", "Cán nhôm"],
    extraFilters: [
      { title: "Loại cán", options: ["Gỗ", "Fiberglass", "Nhôm", "Thép"] },
      { title: "Bộ sản phẩm", options: ["Bán lẻ", "Set 3 món", "Set 5 món", "Set 9+ món"] },
    ],
  },

  "may-phun-thuoc": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Dụng cụ làm vườn",
    title: "Máy phun thuốc",
    resultsCount: "9.380",
    chips: ["Đeo vai", "Cầm tay", "Pin lithium", "Bằng tay", "Áp lực cao", "Dung tích 16L"],
    trendingChips: [
      "Máy phun thuốc đeo vai 16L",
      "Máy phun thuốc pin 12V",
      "Máy phun bằng tay 5L",
      "Máy phun áp lực cao",
      "Máy phun đeo lưng 20L",
      "Vòi phun đồng dài 60cm",
      "Máy phun có pin Bosch",
      "Bình xịt áp lực mini",
    ],
    productNames: [
      "Máy phun thuốc đeo vai 16L pin lithium 12V, vòi đồng dài 60cm",
      "Máy phun bằng tay 5L áp lực cao, vòi điều chỉnh tia phun",
      "Máy phun đeo lưng 20L động cơ xăng 2-thì 26cc",
      "Máy phun mini cầm tay 1.5L pin lithium 7.4V, USB sạc",
      "Máy phun thuốc đeo vai 18L điện 12V, có hệ thống mixing tự động",
      "Bình xịt áp lực thủ công 8L, vòi inox 304 dài 80cm",
      "Máy phun thuốc xăng 4-thì 35cc đeo lưng dung tích 18L",
      "Bộ phun gồm máy 16L + 4 vòi phun + 2 pin sạc nhanh",
    ],
    styles: ["Chuyên nghiệp", "Dân dụng", "Mini"],
    materials: ["Bình HDPE", "Vòi inox 304", "Vòi đồng"],
    extraFilters: [
      { title: "Dung tích", options: ["<2L", "2-8L", "8-16L", "16-20L", "Trên 20L"] },
      { title: "Loại nguồn", options: ["Bằng tay", "Pin lithium 12V", "Pin lithium 18V", "Xăng 2-thì"] },
    ],
  },

  "may-xoi-dat": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Dụng cụ làm vườn",
    title: "Máy xới đất",
    resultsCount: "5.640",
    chips: ["Xăng 2-thì", "Xăng 4-thì", "Pin lithium", "Mini", "139cc", "196cc"],
    trendingChips: [
      "Máy xới đất mini xăng 4-thì",
      "Máy xới đất 196cc tự đẩy",
      "Máy xới đất pin lithium",
      "Lưỡi xới hợp kim cứng",
      "Máy xới đất đa năng",
      "Máy xới mini 52cc",
      "Máy xới đất Honda GX160",
      "Máy xới đất 6.5HP",
    ],
    productNames: [
      "Máy xới đất mini xăng 4-thì 139cc, bề rộng làm việc 35cm",
      "Máy xới đất 196cc tự đẩy 6.5HP, bề rộng 60cm, hộp số 2-tốc",
      "Máy xới đất pin lithium 56V brushless, bề rộng 30cm",
      "Máy xới đất 52cc 2-thì cầm tay, kèm 4 lưỡi xới",
      "Máy xới đất Honda GX160 5.5HP bánh hơi, bề rộng 50cm",
      "Máy xới đất mini 43cc, dùng vườn nhà nhỏ, đa năng 5 chức năng",
      "Lưỡi xới hợp kim cứng SK5 dày 4mm, set 6 lưỡi đường kính 30cm",
      "Máy xới đất công suất 9HP, bề rộng làm việc 80cm dùng nông trại",
    ],
    styles: ["Dân dụng", "Bán chuyên", "Nông trại"],
    materials: ["Lưỡi SK5", "Khung thép", "Vỏ nhôm đúc"],
    extraFilters: [
      { title: "Công suất", options: ["<3HP", "3-5HP", "5-7HP", "Trên 7HP"] },
      { title: "Loại nguồn", options: ["Xăng 2-thì", "Xăng 4-thì", "Pin lithium"] },
    ],
  },

  "binh-tuoi-voi-tuoi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Dụng cụ làm vườn",
    title: "Bình tưới & Vòi tưới",
    resultsCount: "21.840",
    chips: ["Bình tưới 5L", "Bình tưới 10L", "Vòi sen", "Vòi súng", "Vòi xoay 360", "Hệ thống nhỏ giọt"],
    trendingChips: [
      "Bình tưới hoa nhựa 5L",
      "Vòi sen xoay 360 độ",
      "Vòi tưới súng 8 chế độ",
      "Bình tưới inox 7L",
      "Vòi tưới tự động hẹn giờ",
      "Hệ thống tưới nhỏ giọt 30m",
      "Vòi sen tưới nhẹ baby",
      "Bình tưới mini 1L decor",
    ],
    productNames: [
      "Bình tưới hoa nhựa 5L vòi sen rời, dùng cây cảnh, ban công",
      "Vòi sen xoay 360° hợp kim kẽm chống rỉ, đường kính 12cm",
      "Vòi tưới súng 8 chế độ hợp kim ABS + cao su mềm",
      "Bình tưới inox 304 dung tích 7L, vòi sen tích hợp",
      "Vòi tưới tự động hẹn giờ pin AAA, lập lịch theo ngày + giờ",
      "Hệ thống tưới nhỏ giọt 30m kèm 30 đầu phun + bộ lọc + bộ chia",
      "Vòi sen tưới nhẹ baby flow đầu nhựa mềm 8 lỗ, dùng tưới hạt",
      "Bình tưới mini gốm sứ 600ml hình thiên nga decor + tưới",
    ],
    styles: ["Dân dụng", "Decor", "Chuyên nghiệp"],
    materials: ["Nhựa PP", "Inox 304", "Hợp kim kẽm", "Cao su EPDM"],
    extraFilters: [
      { title: "Dung tích bình", options: ["<2L", "2-5L", "5-10L", "Trên 10L"] },
      { title: "Loại sản phẩm", options: ["Bình tưới", "Vòi sen", "Vòi súng", "Hệ thống nhỏ giọt", "Hẹn giờ"] },
    ],
  },

  "gang-tay-lam-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Dụng cụ làm vườn",
    title: "Găng tay làm vườn",
    resultsCount: "12.450",
    chips: ["Da bò", "PU coated", "Latex", "Chống gai", "Có móng cào", "Set 6 đôi"],
    trendingChips: [
      "Găng tay da bò làm vườn",
      "Găng tay PU chống gai",
      "Găng tay có móng cào",
      "Găng tay latex chống thấm",
      "Găng tay tỉa hồng dài tay",
      "Set 6 đôi găng tay",
      "Găng tay nitrile foam",
      "Găng tay chống cắt cấp 5",
    ],
    productNames: [
      "Găng tay da bò làm vườn cổ vớ, dài 30cm chống gai bụi cây",
      "Găng tay PU coated cotton liner chống gai cấp 4, hộp 12 đôi",
      "Găng tay có móng cào nhựa cứng 8 móng, dùng đào đất tay",
      "Găng tay latex chống thấm + chống hóa chất, cổ vớ dài 35cm",
      "Găng tay tỉa hồng da bò dài 45cm, có lớp gia cố cánh tay",
      "Găng tay nitrile foam coated chống dầu, set 6 đôi nhiều màu",
      "Găng tay chống cắt cấp 5 sợi HPPE + nitrile, dùng tỉa cảnh",
      "Set 6 đôi găng tay làm vườn nữ in hoa thời trang",
    ],
    styles: ["Chuyên nghiệp", "Dân dụng", "Thời trang nữ"],
    materials: ["Da bò", "PU coated", "Latex", "Nitrile foam", "HPPE chống cắt"],
    extraFilters: [
      { title: "Khả năng chống gai", options: ["Tiêu chuẩn", "Chống gai cấp 4", "Chống cắt cấp 5"] },
      { title: "Chiều dài", options: ["Cổ ngắn", "Cổ vớ trung", "Cổ vớ dài 30+", "Cổ tay áo 45cm"] },
    ],
  },

  "phu-tung-dung-cu": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Dụng cụ làm vườn",
    title: "Phụ tùng dụng cụ",
    resultsCount: "8.940",
    chips: ["Lưỡi cắt cỏ", "Dây cắt cỏ", "Bugi", "Lọc gió", "Bộ chế hoà khí", "Pin & sạc"],
    trendingChips: [
      "Lưỡi cắt cỏ thép cứng",
      "Dây cắt cỏ nilon 2.4mm",
      "Bugi máy cắt cỏ",
      "Lọc gió động cơ 2-thì",
      "Bộ chế hoà khí Honda",
      "Pin lithium 21V 4Ah",
      "Lưỡi cưa xích chainsaw",
      "Đầu cắt cỏ multi-line",
    ],
    productNames: [
      "Lưỡi cắt cỏ thép cứng SK5 dày 3mm đường kính 25cm, set 5 lưỡi",
      "Dây cắt cỏ nilon nylon 2.4mm cuộn 100m hình vuông xoắn",
      "Bugi máy cắt cỏ NGK BPMR7A, dùng động cơ 2-thì 25-52cc",
      "Lọc gió động cơ 2-thì foam, dùng máy cắt cỏ 36-52cc, set 5 cái",
      "Bộ chế hoà khí Honda GX35 zin chính hãng",
      "Pin lithium 21V 4Ah cell Samsung gốc, dùng máy cắt cỏ + tỉa cành",
      "Lưỡi cưa xích chainsaw 16 inch 0.325\" 1.5mm 66 mắt",
      "Đầu cắt cỏ multi-line tự nạp dây, ren M10 ngược chiều",
    ],
    styles: ["OEM", "Chính hãng", "Tương thích đa hãng"],
    materials: ["Thép SK5", "Nylon copolymer", "Đồng + Cách điện"],
    extraFilters: [
      { title: "Loại phụ tùng", options: ["Lưỡi cắt", "Dây cắt", "Phụ tùng động cơ", "Pin & sạc"] },
    ],
  },

  // ===========================================================================
  // Section 5 — Đèn & Chiếu sáng sân vườn (lighting-outdoor)
  // ===========================================================================
  "den-solar-san-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Đèn & Chiếu sáng sân vườn",
    title: "Đèn solar sân vườn",
    resultsCount: "55.420",
    chips: ["Đèn cột solar", "Đèn cắm cỏ solar", "Đèn pha solar", "Đèn dây solar", "IP65", "IP66"],
    trendingChips: [
      "Đèn solar sân vườn IP65 8W",
      "Đèn cột solar cao 1.8m",
      "Đèn cắm cỏ solar inox",
      "Đèn pha solar 60W",
      "Dây đèn solar 10m 100 bóng",
      "Đèn solar cảm biến chuyển động",
      "Đèn solar đổi màu RGB",
      "Đèn lồng treo solar",
    ],
    productNames: [
      "Đèn solar sân vườn IP65 LED 8W, pin Li-ion 3.7V 2400mAh",
      "Đèn cột solar cao 1.8m, vỏ nhôm, panel mono 6V/3W tích hợp",
      "Đèn cắm cỏ solar inox 304, LED 1W, sáng vàng 3000K, set 6",
      "Đèn pha solar 60W IP66, panel mono 6V 25W rời + remote",
      "Dây đèn solar 10m 100 LED warm white, 8 chế độ chớp",
      "Đèn solar cảm biến chuyển động 36 LED IP65, gắn tường",
      "Đèn solar RGB đổi màu LED 5W, app điều khiển bluetooth",
      "Đèn lồng treo solar handmade vintage, vỏ kim loại đen, set 4",
    ],
    styles: ["Hiện đại", "Cổ điển châu Âu", "Vintage", "Tối giản"],
    materials: ["Vỏ nhôm đúc", "Inox 304", "Vỏ nhựa PC chống UV"],
    extraFilters: [
      { title: "Cấp bảo vệ IP", options: ["IP44", "IP65", "IP66", "IP67"] },
      { title: "Công suất", options: ["1-3W", "3-8W", "8-30W", "30-60W", "Trên 60W"] },
      { title: "Pin", options: ["NiMH 600mAh", "Li-ion 1500mAh", "Li-ion 2400mAh", "Li-ion 4800mAh"] },
    ],
  },

  "den-pha-led-ngoai-troi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Đèn & Chiếu sáng sân vườn",
    title: "Đèn pha LED ngoài trời",
    resultsCount: "38.620",
    chips: ["10W", "30W", "50W", "100W", "200W", "IP66"],
    trendingChips: [
      "Đèn pha LED 50W IP66",
      "Đèn pha LED 100W ngoài trời",
      "Đèn pha LED 200W sân thể thao",
      "Đèn pha LED COB chip Bridgelux",
      "Đèn pha LED cảm biến",
      "Đèn pha LED 30W IP65",
      "Đèn pha LED RGB",
      "Đèn pha LED năng lượng mặt trời",
    ],
    productNames: [
      "Đèn pha LED 50W IP66, vỏ nhôm đúc đen, chip Bridgelux 5050",
      "Đèn pha LED 100W IP66 chip SMD 2835, lifespan 50.000 giờ",
      "Đèn pha LED 200W sân thể thao, lumen 22.000lm, IP66",
      "Đèn pha LED COB 30W chip Bridgelux US, dimmable 0-10V",
      "Đèn pha LED 30W cảm biến chuyển động PIR 12m, IP65",
      "Đèn pha LED RGB 50W app + remote, 16M màu, IP65",
      "Đèn pha LED solar 60W rời panel, pin lithium 12000mAh",
      "Đèn pha LED 150W chiếu nhà xưởng IK10 chống va đập",
    ],
    styles: ["Industrial", "Hiện đại", "Sân thể thao"],
    materials: ["Vỏ nhôm đúc", "Vỏ nhôm sơn tĩnh điện", "Kính cường lực"],
    extraFilters: [
      { title: "Công suất", options: ["10-30W", "30-50W", "50-100W", "100-200W", "Trên 200W"] },
      { title: "Cấp bảo vệ", options: ["IP65", "IP66", "IP67", "IP68"] },
      { title: "Loại nguồn", options: ["AC 220V", "DC 24V", "Solar tích hợp"] },
    ],
  },

  "den-cam-co": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Đèn & Chiếu sáng sân vườn",
    title: "Đèn cắm cỏ",
    resultsCount: "24.130",
    chips: ["Inox 304", "Vỏ nhôm", "LED 3W", "LED 5W", "Solar", "Có cảm biến"],
    trendingChips: [
      "Đèn cắm cỏ inox 304",
      "Đèn cắm cỏ LED solar",
      "Đèn cắm cỏ vỏ nhôm",
      "Đèn cắm cỏ chiếu cây",
      "Đèn cắm cỏ cảm biến",
      "Đèn cắm cỏ 12V DC",
      "Đèn cắm cỏ 3000K vàng",
      "Set 6 đèn cắm cỏ",
    ],
    productNames: [
      "Đèn cắm cỏ inox 304 LED 3W IP65, ánh sáng vàng 3000K, set 6",
      "Đèn cắm cỏ vỏ nhôm sơn đen mờ 5W IP66, chùm chiếu 24°",
      "Đèn cắm cỏ solar inox 304, panel mono tích hợp, pin 1500mAh",
      "Đèn cắm cỏ chiếu cây 12V DC 7W IP67, kèm bộ điều khiển",
      "Đèn cắm cỏ cảm biến chuyển động PIR 5m, pin sạc, IP65",
      "Đèn cắm cỏ inox 316 chống mặn dùng resort biển, 3W IP67",
      "Đèn cắm cỏ uplight chiếu tường 9W IP65, chùm 60°",
      "Đèn cắm cỏ mini decor 1W warm white, set 10 cái IP44",
    ],
    styles: ["Hiện đại", "Tối giản", "Industrial"],
    materials: ["Inox 304", "Inox 316", "Vỏ nhôm đúc"],
    extraFilters: [
      { title: "Công suất", options: ["1-3W", "3-5W", "5-9W", "Trên 9W"] },
      { title: "Loại nguồn", options: ["AC 220V", "DC 12V", "Solar"] },
    ],
  },

  "den-canh-quan-day": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Đèn & Chiếu sáng sân vườn",
    title: "Đèn cảnh quan dây",
    resultsCount: "31.420",
    chips: ["Dây 5m", "Dây 10m", "Dây 20m", "S14 G40", "Fairy light", "IP44"],
    trendingChips: [
      "Dây đèn LED ngoài trời 10m",
      "Dây đèn S14 vintage 25 bóng",
      "Dây đèn G40 cafe garden",
      "Dây đèn fairy light 20m",
      "Dây đèn LED solar 100 bóng",
      "Dây đèn icicle ngoài trời",
      "Dây đèn LED đổi màu 8 chế độ",
      "Dây đèn warm white IP65",
    ],
    productNames: [
      "Dây đèn LED ngoài trời 10m 100 bóng warm white IP65, plug AC",
      "Dây đèn S14 vintage 25 bóng E27 LED 1W, dài 7.5m IP44",
      "Dây đèn G40 cafe garden 15m 30 bóng LED 1W, plug + extend",
      "Dây đèn fairy light 20m 200 LED đồng filament, IP44 trang trí",
      "Dây đèn LED solar 100 bóng 12m, 8 chế độ chớp, IP65",
      "Dây đèn icicle ngoài trời 5m 96 LED màn mưa, IP44",
      "Dây đèn LED RGB 10m 60 bóng app điều khiển, IP65",
      "Dây đèn warm white 30m 300 bóng IP65 dùng decor đại lễ",
    ],
    styles: ["Vintage", "Cafe garden", "Hiện đại", "Holiday"],
    materials: ["Vỏ PVC chịu nhiệt", "Dây đồng filament", "Vỏ silicone"],
    extraFilters: [
      { title: "Chiều dài", options: ["<5m", "5-10m", "10-20m", "Trên 20m"] },
      { title: "Loại nguồn", options: ["AC 220V plug", "Solar", "Pin", "USB DC"] },
    ],
  },

  "den-chieu-cay": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Đèn & Chiếu sáng sân vườn",
    title: "Đèn chiếu cây",
    resultsCount: "12.840",
    chips: ["Uplight", "Spotlight", "12W", "18W", "24V DC", "IP66"],
    trendingChips: [
      "Đèn chiếu gốc cây 18W",
      "Đèn uplight chiếu cây IP66",
      "Đèn spotlight chiếu cây 12V",
      "Đèn chiếu cây vỏ đồng",
      "Đèn chiếu cây góc 24°",
      "Đèn chiếu cây có dimmer",
      "Đèn chiếu cây RGB",
      "Đèn chiếu cây solar",
    ],
    productNames: [
      "Đèn chiếu gốc cây 18W IP66, vỏ nhôm đen, chùm chiếu 24°",
      "Đèn uplight chiếu cây cao 30cm 12W chip Cree, spike + base",
      "Đèn spotlight chiếu cây 12V DC 7W IP67, dimmer 0-10V",
      "Đèn chiếu cây vỏ đồng patina 9W warm 3000K, vintage style",
      "Đèn chiếu cây 24V DC 24W chùm 60° dùng cây lớn 4-6m",
      "Đèn chiếu cây RGB 18W app + remote 16M màu, IP66",
      "Đèn chiếu cây solar 8W panel rời, dùng cây 3-4m",
      "Bộ chiếu cây 6 đèn 9W 12V + transformer 60W + dây 30m",
    ],
    styles: ["Hiện đại", "Vintage", "Tối giản"],
    materials: ["Vỏ nhôm đúc", "Vỏ đồng patina", "Inox 316"],
    extraFilters: [
      { title: "Công suất", options: ["3-9W", "9-18W", "18-30W", "Trên 30W"] },
      { title: "Loại nguồn", options: ["AC 220V", "DC 12V", "DC 24V", "Solar"] },
      { title: "Góc chiếu", options: ["15° hẹp", "24°", "38°", "60° rộng"] },
    ],
  },

  "den-motif-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Đèn & Chiếu sáng sân vườn",
    title: "Đèn motif trang trí",
    resultsCount: "9.520",
    chips: ["Motif Noel", "Motif hươu", "Motif ngôi sao", "Motif chữ", "Motif animal", "Motif arch"],
    trendingChips: [
      "Đèn motif hươu LED Noel",
      "Đèn motif ngôi sao 3D",
      "Đèn motif arch vòm cổng",
      "Đèn motif chữ LOVE",
      "Đèn motif animal sân vườn",
      "Đèn motif hoa giấy",
      "Đèn motif lễ hội đường phố",
      "Đèn motif RGB điều khiển",
    ],
    productNames: [
      "Đèn motif hươu LED Noel cao 1.2m 240 LED warm white IP44",
      "Đèn motif ngôi sao 3D đường kính 60cm 200 LED, treo cổng",
      "Đèn motif arch vòm cổng 2.5×3m, 1.500 LED, dùng sự kiện",
      "Đèn motif chữ LOVE cao 50cm LED warm white IP44",
      "Đèn motif animal cừu cao 1m LED ấm, dùng sân vườn quanh năm",
      "Đèn motif hoa giấy lớn đường kính 80cm RGB app điều khiển",
      "Đèn motif lễ hội đường phố treo cột cao 3m, LED 2000lm",
      "Đèn motif tuần lộc + xe trượt tuyết LED 600 bóng dùng Noel",
    ],
    styles: ["Holiday", "Cổng vòm sự kiện", "Hiện đại", "Trẻ em"],
    materials: ["Khung kim loại sơn tĩnh điện", "Khung dây sắt mạ kẽm", "LED RGB chip 5050"],
    extraFilters: [
      { title: "Dịp", options: ["Noel", "Tết Tây", "Halloween", "Sự kiện cưới", "Đường phố quanh năm"] },
    ],
  },

  // ===========================================================================
  // Section 6 — Đồ gia dụng & Sundries (household)
  // ===========================================================================
  "san-pham-to-chuc-tu": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Đồ gia dụng & Sundries",
    title: "Sản phẩm tổ chức tủ",
    resultsCount: "33.620",
    chips: ["Tổ chức ngăn kéo", "Hộp ngăn", "Khay phân loại", "Vải", "Nhựa PP", "Set 6"],
    trendingChips: [
      "Tổ chức ngăn kéo nhựa",
      "Hộp ngăn quần áo gấp",
      "Khay phân loại đồ lót",
      "Set 6 hộp tổ chức",
      "Hộp tổ chức tủ bếp",
      "Hộp tổ chức ngăn kéo bàn",
      "Khay tổ chức tủ phòng tắm",
      "Hộp tổ chức tủ giày",
    ],
    productNames: [
      "Bộ tổ chức ngăn kéo nhựa PP modular, 6 ngăn ghép linh hoạt",
      "Set 6 hộp ngăn quần áo vải dệt non-woven gấp gọn",
      "Khay phân loại đồ lót 24 ô vải 600D, gấp gọn khi không dùng",
      "Set 6 hộp tổ chức tủ bếp nhựa PP trong suốt 2.5L",
      "Hộp tổ chức ngăn kéo bàn nhựa 8 ngăn rời, lắp ghép L+T",
      "Khay tổ chức tủ phòng tắm nhựa PP 4 ngăn chống nước",
      "Hộp tổ chức tủ giày trong suốt PP có nắp xếp chồng, set 6",
      "Bộ 4 hộp ngăn vali xếp đồ du lịch vải canvas chống thấm",
    ],
    styles: ["Tối giản", "Hiện đại", "Bắc Âu"],
    materials: ["Nhựa PP", "Vải non-woven", "Vải canvas 600D", "Tre tự nhiên"],
    extraFilters: [
      { title: "Khu vực sử dụng", options: ["Tủ quần áo", "Ngăn kéo bàn", "Tủ bếp", "Tủ phòng tắm", "Tủ giày"] },
    ],
  },

  "hop-dung-do": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Đồ gia dụng & Sundries",
    title: "Hộp đựng đồ",
    resultsCount: "47.840",
    chips: ["Hộp PP trong suốt", "Hộp xếp chồng", "Hộp vải", "Hộp gỗ", "Có nắp", "Gấp gọn"],
    trendingChips: [
      "Hộp đựng đồ nhựa PP set 5",
      "Hộp đựng đồ trong suốt có nắp",
      "Hộp đựng đồ vải gấp gọn",
      "Hộp đựng đồ chơi trẻ em",
      "Hộp đựng đồ xếp chồng",
      "Hộp đựng đồ kích thước lớn 50L",
      "Hộp đựng đồ có bánh xe",
      "Hộp đựng đồ inox công nghiệp",
    ],
    productNames: [
      "Bộ hộp đựng đồ nhựa PP 5 món 5L-10L-20L-30L-50L có nắp khoá",
      "Hộp đựng đồ trong suốt PP 30L xếp chồng 5 tầng, có bánh xe",
      "Hộp đựng đồ vải canvas 600D gấp gọn 38×38×38cm có nắp",
      "Hộp đựng đồ chơi trẻ em nhựa PP in hoạt hình 28L",
      "Set 4 hộp đựng đồ xếp chồng PP trong suốt 5L tủ phòng tắm",
      "Hộp đựng đồ siêu lớn 70L có khoá nắp, dùng cất quần áo mùa",
      "Hộp đựng đồ có bánh xe gầm giường 35L PP trong suốt",
      "Hộp đựng đồ inox 304 60L công nghiệp, có khoá an toàn",
    ],
    styles: ["Tối giản", "Hiện đại", "Bắc Âu", "Trẻ em"],
    materials: ["Nhựa PP", "Vải canvas 600D", "Inox 304", "Tre"],
    extraFilters: [
      { title: "Dung tích", options: ["<5L", "5-15L", "15-30L", "30-50L", "Trên 50L"] },
      { title: "Tính năng", options: ["Có nắp khoá", "Xếp chồng", "Gấp gọn", "Có bánh xe", "Trong suốt"] },
    ],
  },

  "moc-treo-ke-tuong": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Đồ gia dụng & Sundries",
    title: "Móc treo & Kệ tường",
    resultsCount: "26.150",
    chips: ["Móc dán keo", "Móc khoan vít", "Kệ gắn tường", "Kệ phòng tắm", "Inox 304", "Nhựa ABS"],
    trendingChips: [
      "Móc treo dán tường chịu lực 5kg",
      "Móc khoan vít inox 304",
      "Kệ tường 3 tầng gỗ + sắt",
      "Kệ phòng tắm dán keo",
      "Móc treo cửa sau",
      "Kệ tường kiểu hexagon",
      "Móc treo inox tủ bếp",
      "Set 6 móc treo dán keo",
    ],
    productNames: [
      "Móc treo dán tường chịu lực 5kg nhựa ABS, set 6 cái không khoan",
      "Móc khoan vít inox 304 chữ U, chịu tải 15kg, dùng vườn nhà",
      "Kệ tường 3 tầng gỗ thông + sắt khung industrial 60×60cm",
      "Kệ phòng tắm dán keo 2 tầng inox 304, dài 40cm",
      "Móc treo cửa sau 6 ngạnh thép sơn tĩnh điện, không khoan",
      "Set 6 kệ tường hexagon gỗ + sắt, dùng decor + để đồ",
      "Móc treo inox 304 dán keo dùng tủ bếp, set 10 cái",
      "Kệ tường gắn lò vi sóng inox 304 chịu tải 25kg",
    ],
    styles: ["Industrial", "Bắc Âu", "Tối giản"],
    materials: ["Inox 304", "Nhựa ABS", "Gỗ thông + sắt", "Hợp kim kẽm"],
    extraFilters: [
      { title: "Cách lắp", options: ["Dán keo 3M", "Khoan vít", "Đè trên cửa"] },
      { title: "Khu vực", options: ["Phòng tắm", "Tủ bếp", "Phòng khách", "Cửa sau"] },
    ],
  },

  "tui-vai-gio-dung": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Đồ gia dụng & Sundries",
    title: "Túi vải & Giỏ đựng",
    resultsCount: "19.420",
    chips: ["Cotton", "Canvas 12oz", "Non-woven", "Có quai", "Gấp gọn", "Đa năng"],
    trendingChips: [
      "Giỏ vải gấp gọn cotton",
      "Túi canvas 12oz đi chợ",
      "Giỏ đựng đồ chơi tre",
      "Túi vải non-woven in logo",
      "Giỏ đựng laundry cotton",
      "Túi tote canvas in",
      "Giỏ đựng quần áo bẩn",
      "Túi vải đa năng có khoá kéo",
    ],
    productNames: [
      "Giỏ vải gấp gọn cotton + thép 38×38×38cm, có nắp + tay xách",
      "Túi canvas 12oz đi chợ in logo OEM, tay quai dài 60cm",
      "Giỏ đựng đồ chơi trẻ em mây tre đan 35cm",
      "Túi vải non-woven 80g in 4 màu, kích thước 40×30cm",
      "Giỏ đựng laundry cotton + sắt cao 65cm, có nắp + bánh xe",
      "Túi tote canvas in painting handmade, kích thước 38×42cm",
      "Giỏ đựng quần áo bẩn vải lưới gấp 65L có 2 ngăn phân loại",
      "Túi vải đa năng có khoá kéo canvas 600D, dung tích 45L",
    ],
    styles: ["Bắc Âu", "Vintage", "Hiện đại", "Bohemian"],
    materials: ["Cotton 100%", "Canvas 12oz", "Non-woven 80g", "Mây tre đan", "Vải lưới"],
    extraFilters: [
      { title: "Công năng", options: ["Đi chợ", "Đựng đồ chơi", "Laundry", "Decor", "Du lịch"] },
    ],
  },

  "san-pham-giat-la": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Đồ gia dụng & Sundries",
    title: "Sản phẩm giặt là",
    resultsCount: "14.380",
    chips: ["Giá phơi đồ", "Giỏ laundry", "Móc kẹp", "Giá phơi inox", "Giá gấp gọn", "Có bánh xe"],
    trendingChips: [
      "Giá phơi đồ inox gấp",
      "Giá phơi đồ 3 tầng có bánh xe",
      "Giỏ đựng đồ giặt cotton",
      "Móc kẹp phơi quần áo set 30",
      "Giá phơi đồ ban công gắn tường",
      "Giá phơi gấp X-style nhỏ",
      "Giỏ phân loại đồ giặt 3 ngăn",
      "Móc treo phơi tất 16 ngạnh",
    ],
    productNames: [
      "Giá phơi đồ inox 304 gấp gọn 2 tầng, dài 1.6m, chịu tải 30kg",
      "Giá phơi đồ 3 tầng có bánh xe inox 304, gấp gọn ngang 50cm",
      "Giỏ đựng đồ giặt cotton + sắt 65L có nắp + tay xách",
      "Móc kẹp phơi quần áo nhựa PP set 30 cái, lò xo inox",
      "Giá phơi đồ ban công gắn tường nhôm rút gọn 1.4m",
      "Giá phơi gấp X-style nhỏ inox 304 dùng ban chung cư",
      "Giỏ phân loại đồ giặt 3 ngăn vải canvas + sắt",
      "Móc treo phơi tất 16 ngạnh nhựa ABS, kẹp lò xo inox",
    ],
    styles: ["Tối giản", "Industrial", "Hiện đại"],
    materials: ["Inox 304", "Nhôm rút", "Nhựa ABS", "Cotton + sắt"],
    extraFilters: [
      { title: "Loại sản phẩm", options: ["Giá phơi", "Giỏ laundry", "Móc kẹp", "Móc treo tất"] },
      { title: "Khu vực", options: ["Sàn", "Ban công gắn tường", "Trần", "Di động có bánh xe"] },
    ],
  },

  "san-pham-ve-sinh-nha-cua": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Đồ gia dụng & Sundries",
    title: "Sản phẩm vệ sinh nhà cửa",
    resultsCount: "23.640",
    chips: ["Cây lau nhà", "Chổi quét", "Khăn microfiber", "Bình xịt", "Hộp đựng giẻ", "Set vệ sinh"],
    trendingChips: [
      "Cây lau nhà xoay 360 độ",
      "Cây lau nhà hơi nước",
      "Chổi quét không bụi",
      "Khăn microfiber set 6",
      "Bình xịt tạo bọt",
      "Set vệ sinh đa năng 6 món",
      "Cây lau kính 2 mặt nam châm",
      "Chổi tĩnh điện hút bụi",
    ],
    productNames: [
      "Cây lau nhà xoay 360° tự vắt, đầu microfiber set 4 cái thay thế",
      "Cây lau nhà hơi nước 1500W, bình 350ml, dùng diệt khuẩn",
      "Chổi quét không bụi sợi tổng hợp + cán nhôm dài 1.2m",
      "Set 6 khăn microfiber 30×30cm 300gsm, dùng đa năng",
      "Bình xịt tạo bọt nhựa PP 500ml, dùng pha xà phòng + hóa chất",
      "Set vệ sinh đa năng 6 món: cây lau + chổi + khăn + xô vắt",
      "Cây lau kính 2 mặt nam châm dùng cửa sổ chung cư cao tầng",
      "Chổi tĩnh điện hút bụi gỗ + sợi tổng hợp, dài 80cm",
    ],
    styles: ["Hiện đại", "Tối giản"],
    materials: ["Microfiber", "Nhựa ABS", "Nhôm rút", "Inox 304"],
    extraFilters: [
      { title: "Loại sản phẩm", options: ["Cây lau", "Chổi quét", "Khăn lau", "Bình xịt", "Set đa năng"] },
    ],
  },

  // ===========================================================================
  // Section 7 — Quà tặng & Đồ thủ công (festive)
  // ===========================================================================
  "qua-tang-thu-cong-noel": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Quà tặng & Đồ thủ công",
    title: "Quà tặng & Thủ công Noel",
    resultsCount: "84.620",
    chips: ["Cây thông", "Vòng hoa cửa", "Quả châu", "Đèn LED Noel", "Tượng tuần lộc", "Set decor"],
    trendingChips: [
      "Cây thông Noel PVC 1.8m",
      "Vòng hoa cửa Noel handmade",
      "Bộ trang trí cây thông 50 món",
      "Quả châu Noel set 24",
      "Đèn LED Noel 10m IP44",
      "Tượng tuần lộc decor cửa",
      "Cây thông pre-lit 2.1m",
      "Bít tất Noel handmade",
    ],
    productNames: [
      "Cây thông Noel PVC 1.8m 1.200 nhánh, đế kim loại, hộp gift",
      "Vòng hoa cửa Noel handmade đường kính 50cm, lá thông + quả châu",
      "Bộ trang trí cây thông 50 món: quả châu + ribbon + topper + dây",
      "Set 24 quả châu Noel đường kính 6cm matte gold, hộp gift",
      "Dây đèn LED Noel 10m 100 bóng warm white IP44, plug",
      "Tượng tuần lộc decor cửa vào set 3 cao 30-50-70cm",
      "Cây thông pre-lit Noel cao 2.1m gắn sẵn 350 LED warm",
      "Bộ 6 bít tất Noel velvet handmade thêu tên cá nhân",
    ],
    styles: ["Truyền thống đỏ vàng", "Bắc Âu trắng", "Vintage", "Glam gold", "Rustic"],
    materials: ["PVC", "Nỉ + vải", "Resin", "LED 5050"],
    extraFilters: [
      { title: "Loại sản phẩm", options: ["Cây thông", "Vòng cửa", "Đèn LED", "Quả châu", "Tượng decor"] },
      { title: "Chiều cao cây", options: ["1.2-1.5m", "1.8-2.1m", "2.4-3m", "Trên 3m"] },
    ],
  },

  "do-thu-cong-halloween": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Quà tặng & Đồ thủ công",
    title: "Đồ thủ công Halloween",
    resultsCount: "32.140",
    chips: ["Bí ngô LED", "Tượng ma resin", "Mạng nhện", "Đèn LED kinh dị", "Mặt nạ", "Set decor cửa"],
    trendingChips: [
      "Bí ngô Halloween nhựa LED",
      "Tượng ma resin",
      "Mạng nhện trang trí",
      "Đèn LED Halloween cam tím",
      "Mặt nạ Halloween cao su",
      "Set decor cửa Halloween",
      "Vòng hoa cửa Halloween",
      "Bí ngô bơm hơi sân vườn",
    ],
    productNames: [
      "Bí ngô Halloween nhựa LED đường kính 25cm, ánh sáng cam vàng",
      "Tượng ma resin handmade cao 50cm, ánh sáng LED tích hợp",
      "Mạng nhện trang trí Halloween 3.6×3.6m + 100 nhện nhựa",
      "Dây đèn LED Halloween cam + tím 10m 100 bóng IP44",
      "Mặt nạ Halloween cao su latex thiết kế zombie 8 mẫu",
      "Set decor cửa Halloween 8 món: bí ngô + ma + mạng nhện",
      "Vòng hoa cửa Halloween đường kính 45cm có LED + bí ngô",
      "Bí ngô bơm hơi sân vườn cao 2.4m có LED + quạt 12V",
    ],
    styles: ["Truyền thống cam đen", "Glam", "Trẻ em vui", "Kinh dị"],
    materials: ["Nhựa PE", "Resin", "Vải lưới", "Cao su latex"],
    extraFilters: [
      { title: "Loại sản phẩm", options: ["Bí ngô", "Tượng ma", "Mạng nhện", "Đèn LED", "Mặt nạ"] },
    ],
  },

  "do-tiec-trang-tri-su-kien": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Quà tặng & Đồ thủ công",
    title: "Đồ tiệc & Trang trí sự kiện",
    resultsCount: "41.620",
    chips: ["Bóng bay", "Banner sinh nhật", "Bóng kim loại", "Vòm hoa", "Confetti", "Cốc đĩa giấy"],
    trendingChips: [
      "Bóng bay Happy Birthday set",
      "Bóng kim loại số tuổi 1m",
      "Vòm hoa giả backdrop sự kiện",
      "Banner sinh nhật vintage",
      "Confetti party set",
      "Cốc đĩa giấy theme",
      "Set bóng baby shower",
      "Backdrop hoa giả wedding",
    ],
    productNames: [
      "Set bóng bay Happy Birthday 50 cái + banner + ribbon, theme vàng đen",
      "Bóng kim loại số tuổi cao 1m, helium-grade, có nhồi LED",
      "Vòm hoa giả backdrop sự kiện 2.5m, hoa lụa + lá xanh",
      "Banner sinh nhật vintage giấy kraft + ribbon, in tên + số tuổi",
      "Confetti party set 5 màu, 1.000 cái + 6 popper",
      "Set cốc đĩa giấy theme baby shower 60 cái, 4 màu pastel",
      "Set bóng baby shower 70 cái 4 size + arch kit",
      "Backdrop hoa giả wedding 2×2.4m, mật độ hoa cao + base sắt",
    ],
    styles: ["Vintage", "Pastel", "Glam gold", "Boho wedding", "Trẻ em"],
    materials: ["Latex", "Mylar/foil", "Hoa lụa", "Giấy kraft"],
    extraFilters: [
      { title: "Loại sự kiện", options: ["Sinh nhật", "Wedding", "Baby shower", "Lễ tốt nghiệp", "Tiệc cuối năm"] },
    ],
  },

  "thu-cong-nhua-resin": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Quà tặng & Đồ thủ công",
    title: "Thủ công nhựa resin",
    resultsCount: "12.840",
    chips: ["Tượng resin", "Khung resin", "Đồ trang sức resin", "Coaster resin", "Mạ vàng", "Đa sắc"],
    trendingChips: [
      "Thủ công resin tượng angel",
      "Khung tranh resin handmade",
      "Coaster resin mạ vàng",
      "Trang sức resin epoxy",
      "Tượng resin để bàn",
      "Decor resin animal mini",
      "Resin hoa khô preserve",
      "Bộ tượng 3 mèo resin",
    ],
    productNames: [
      "Thủ công resin tượng angel handmade cao 30cm sơn metallic gold",
      "Khung tranh resin handmade A4 viền vàng + ngọc trai chìm",
      "Set 6 coaster resin epoxy mạ vàng đường kính 10cm",
      "Bộ trang sức resin epoxy bao gồm vòng + dây + bông tai",
      "Bộ 3 tượng resin sư tử + voi + ngựa decor để bàn",
      "Decor resin animal mini set 6 cao 8-12cm dùng terrarium",
      "Bình resin epoxy hoa khô preserve hồng + baby breath",
      "Bộ 3 tượng resin mèo thần tài Maneki-Neko vàng nhũ 18cm",
    ],
    styles: ["Hiện đại", "Vintage", "Glam gold", "Bắc Âu"],
    materials: ["Resin epoxy", "Resin polyester", "Resin + ngọc trai chìm"],
    extraFilters: [
      { title: "Loại sản phẩm", options: ["Tượng decor", "Khung tranh", "Coaster", "Trang sức", "Bình hoa"] },
    ],
  },

  "thu-cong-kim-loai": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Quà tặng & Đồ thủ công",
    title: "Thủ công kim loại",
    resultsCount: "9.310",
    chips: ["Đồng đúc", "Sắt nghệ thuật", "Inox decor", "Mạ vàng", "Patina cổ", "Wall art"],
    trendingChips: [
      "Tranh kim loại wall art",
      "Đồng đúc decor",
      "Sắt nghệ thuật wall art",
      "Tượng kim loại mini",
      "Bộ ấm trà đồng",
      "Móc treo kim loại nghệ thuật",
      "Khung tranh kim loại",
      "Đèn kim loại handmade",
    ],
    productNames: [
      "Tranh kim loại wall art 80×120cm hand-cut, finish patina cổ",
      "Tượng đồng đúc handmade cao 40cm finish brass nguyên khối",
      "Tranh sắt nghệ thuật wall art 1×1m hand-forged thiết kế hoa",
      "Tượng kim loại mini decor để bàn cao 25cm tone đồng đỏ",
      "Bộ ấm trà đồng đúc handmade kèm 6 chén, hộp gift box",
      "Móc treo kim loại nghệ thuật chữ S, set 6 cái finish vàng",
      "Khung tranh kim loại đường viền hand-cut đường kính 60cm",
      "Đèn kim loại handmade dáng cage industrial cao 60cm",
    ],
    styles: ["Industrial", "Vintage", "Tân cổ điển", "Bắc Âu"],
    materials: ["Đồng đúc", "Sắt rèn", "Inox 304 hand-cut", "Hợp kim mạ vàng"],
    extraFilters: [
      { title: "Hoàn thiện", options: ["Brass cổ", "Patina", "Mạ vàng PVD", "Đen mờ powder coat"] },
    ],
  },

  "thu-cong-go": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Quà tặng & Đồ thủ công",
    title: "Thủ công gỗ",
    resultsCount: "11.520",
    chips: ["Pyrography", "Gỗ chạm tay", "Gỗ tự nhiên", "Bộ thớt", "Khay decor", "Tranh gỗ"],
    trendingChips: [
      "Thủ công gỗ pyrography",
      "Tranh gỗ chạm tay",
      "Bộ thớt gỗ olive",
      "Khay gỗ decor",
      "Tượng gỗ handmade",
      "Hộp gỗ tự nhiên",
      "Đồ trang trí gỗ óc chó",
      "Móc treo gỗ chạm",
    ],
    productNames: [
      "Thủ công gỗ pyrography tranh khắc lửa 30×40cm gỗ thông",
      "Bộ thớt gỗ olive Italy 3 món, dùng decor + dùng thật",
      "Khay gỗ óc chó decor 40×25cm handmade hoàn thiện dầu hạt lanh",
      "Tượng gỗ teak handmade decor cao 35cm hand-carved",
      "Hộp gỗ tự nhiên decor có nắp 25×15×10cm gỗ tần bì",
      "Tranh gỗ chạm tay 40×60cm cảnh núi non, finish dầu",
      "Đồ trang trí gỗ óc chó nguyên khối hình mèo set 3",
      "Móc treo gỗ chạm hand-carved, 6 ngạnh, dài 50cm",
    ],
    styles: ["Bắc Âu", "Rustic", "Vintage", "Á Đông"],
    materials: ["Gỗ thông", "Gỗ óc chó", "Gỗ teak", "Gỗ olive Italy", "Gỗ tần bì"],
    extraFilters: [
      { title: "Loại gỗ", options: ["Gỗ thông", "Gỗ tần bì", "Gỗ teak", "Gỗ óc chó", "Gỗ olive"] },
    ],
  },

  // ===========================================================================
  // Section 8 — Outdoor living & Sân thượng (outdoor-living)
  // ===========================================================================
  "ban-ghe-san-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor living & Sân thượng",
    title: "Bàn ghế sân vườn",
    resultsCount: "47.320",
    chips: ["PE rattan", "Aluminum", "Teak", "Bộ 4 chỗ", "Bộ 6 chỗ", "Sectional sofa"],
    trendingChips: [
      "Bộ bàn ghế PE rattan 4 chỗ",
      "Bộ ghế sofa nhôm 6 chỗ",
      "Bộ teak garden 8 chỗ",
      "Sectional sofa outdoor L-shape",
      "Bộ ghế nhôm + textilene",
      "Bàn ăn outdoor 6 chỗ",
      "Ghế tắm nắng nhôm",
      "Set 4 ghế bar outdoor",
    ],
    productNames: [
      "Bộ bàn ghế PE rattan 4 chỗ + bàn kính cường lực, đệm chống thấm",
      "Bộ sofa nhôm 6 chỗ L-shape PE rattan, đệm Olefin chống mưa",
      "Bộ teak garden 8 chỗ — bàn 2.4m + 8 ghế folding teak Indonesia",
      "Sectional sofa outdoor L-shape rattan 7 chỗ + bàn cà phê kính",
      "Bộ ghế nhôm + textilene 4 chỗ ăn, dùng resort + biệt thự",
      "Bàn ăn outdoor 6 chỗ chân nhôm + mặt HPL chống UV",
      "Ghế tắm nắng nhôm + textilene gấp gọn, có gối kê đầu",
      "Set 4 ghế bar outdoor PE rattan + bàn cao chân nhôm",
    ],
    styles: ["Hiện đại", "Bắc Âu", "Mediterranean", "Resort"],
    materials: ["PE rattan + nhôm", "Aluminum đúc", "Teak Indonesia", "Inox 316 + textilene"],
    extraFilters: [
      { title: "Số chỗ ngồi", options: ["2 chỗ", "4 chỗ", "6 chỗ", "8 chỗ", "10+ chỗ"] },
      { title: "Loại bộ", options: ["Bộ ăn", "Sofa", "Sectional L-shape", "Sun lounger", "Bar set"] },
    ],
  },

  "o-du-leu-bai": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor living & Sân thượng",
    title: "Ô dù & Lều bãi",
    resultsCount: "16.940",
    chips: ["Ô lệch tâm", "Ô đứng giữa", "Lều sự kiện", "Lều cắm trại", "Đường kính 3m", "Có đèn LED"],
    trendingChips: [
      "Ô dù sân vườn 3m chân chữ thập",
      "Ô lệch tâm 3.5m hand-crank",
      "Lều bạt sự kiện 3×3m chống thấm",
      "Lều cắm trại 4 người chống mưa",
      "Ô dù đường kính 4m có LED",
      "Ô parasol cantilever 3m",
      "Lều phao bãi biển 2×2m",
      "Ô dù cố định ngoài trời resort",
    ],
    productNames: [
      "Ô dù sân vườn đường kính 3m chân chữ thập, vải polyester 250D",
      "Ô lệch tâm 3.5m cantilever hand-crank, finish nhôm sơn antraxit",
      "Lều bạt sự kiện 3×3m chân thép sơn tĩnh điện, vải Oxford 600D",
      "Lều cắm trại 4 người 2 lớp chống mưa 3000mm, có cửa hai lớp",
      "Ô dù đường kính 4m có 32 LED warm white pin sạc",
      "Ô parasol cantilever 3×4m bán nguyệt, đế đá granite 70kg",
      "Lều phao bãi biển 2×2m chống UV UPF50, có cọc neo",
      "Ô dù cố định resort cao 3m chân ngầm bê tông, đường kính 4m",
    ],
    styles: ["Resort", "Bắc Âu", "Hiện đại"],
    materials: ["Vải polyester 250D", "Vải Oxford 600D", "Vải Sunbrella", "Khung nhôm", "Khung thép"],
    extraFilters: [
      { title: "Đường kính", options: ["<2.5m", "2.5-3m", "3-3.5m", "3.5-4m", "Trên 4m"] },
      { title: "Loại chân", options: ["Chân chữ thập", "Cantilever lệch tâm", "Đứng giữa", "Chân ngầm bê tông"] },
    ],
  },

  "bep-bbq-ngoai-troi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor living & Sân thượng",
    title: "Bếp BBQ ngoài trời",
    resultsCount: "8.640",
    chips: ["Than củi", "Gas", "Điện", "Tích hợp xông khói", "Inox 304", "Đường kính 60cm"],
    trendingChips: [
      "Bếp BBQ than củi inox",
      "Bếp BBQ gas 4 đầu đốt",
      "Bếp BBQ điện ngoài trời",
      "Bếp BBQ kèm xông khói",
      "Bếp BBQ chân di động",
      "Bếp BBQ kettle 57cm",
      "Bếp BBQ Kamado gốm",
      "Bếp BBQ outdoor cố định",
    ],
    productNames: [
      "Bếp BBQ than củi inox 304 đường kính 60cm, có nắp + nhiệt kế",
      "Bếp BBQ gas 4 đầu đốt inox 430, mặt 80×40cm dùng resort",
      "Bếp BBQ điện ngoài trời 2200W, vỉ chống dính dùng ban công",
      "Bếp BBQ kèm xông khói than củi cao 1.2m, inox 304",
      "Bếp BBQ chân di động bánh xe inox, nồi inox + nắp kính",
      "Bếp BBQ kettle 57cm sơn epoxy, kèm vỉ inox + chân thép",
      "Bếp BBQ Kamado gốm sứ 18 inch, chịu nhiệt 400°C",
      "Bếp BBQ outdoor cố định inox 304 80×60cm, kèm tủ chứa",
    ],
    styles: ["Resort", "Hiện đại", "Cổ điển kettle"],
    materials: ["Inox 304", "Inox 430", "Gốm sứ Kamado", "Sơn epoxy chịu nhiệt"],
    extraFilters: [
      { title: "Loại nhiên liệu", options: ["Than củi", "Gas", "Điện", "Pellet"] },
      { title: "Kích thước mặt nướng", options: ["<40cm", "40-55cm", "55-70cm", "Trên 70cm"] },
    ],
  },

  "be-boi-phao-spa": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor living & Sân thượng",
    title: "Bể bơi phao & Spa",
    resultsCount: "6.430",
    chips: ["Bể bơi 3m", "Bể bơi 4.5m", "Bồn spa bơm hơi", "Spa 4 người", "Khung kim loại", "Hệ thống lọc"],
    trendingChips: [
      "Bể bơi bơm hơi gia đình 3m",
      "Bể bơi khung kim loại 4.5m",
      "Bồn spa bơm hơi 6 người",
      "Spa 4 người mát-xa khí",
      "Bể bơi trẻ em hình chữ nhật",
      "Bồn spa portable inflatable",
      "Bể bơi composite chôn",
      "Bộ lọc bể bơi 1HP",
    ],
    productNames: [
      "Bể bơi bơm hơi gia đình đường kính 3m sâu 76cm, 3 lớp PVC",
      "Bể bơi khung kim loại 4.5m × 1.2m sâu, kèm bộ lọc 0.5HP",
      "Bồn spa bơm hơi 6 người đường kính 2m, hệ thống mát-xa 130 bong bóng",
      "Spa 4 người portable inflatable 1.85m, làm nóng 40°C",
      "Bể bơi trẻ em hình chữ nhật 2.6×1.6×0.65m PVC 3 lớp",
      "Bồn spa portable inflatable 800L, kèm bơm + nắp đậy + chemical kit",
      "Bể bơi composite chôn 4×3m sâu 1.5m, fiberglass + GFRC",
      "Bộ lọc bể bơi 1HP cát + ozone, dùng bể tới 50m³ nước",
    ],
    styles: ["Gia đình", "Resort", "Trẻ em"],
    materials: ["PVC 3 lớp", "Khung kim loại sơn epoxy", "Composite fiberglass"],
    extraFilters: [
      { title: "Kích thước", options: ["<3m", "3-4m", "4-5m", "Trên 5m"] },
      { title: "Loại", options: ["Bể bơi phao", "Bể bơi khung", "Bồn spa portable", "Bể bơi composite chôn"] },
    ],
  },

  "nha-kinh-trong-cay": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor living & Sân thượng",
    title: "Nhà kính trồng cây",
    resultsCount: "4.820",
    chips: ["Mini 2×3m", "Trung 3×4m", "Lớn 6×8m", "Khung nhôm", "Khung thép", "PE/PC"],
    trendingChips: [
      "Nhà kính nhựa PE mini 2×3m",
      "Nhà kính khung nhôm 3×4m",
      "Nhà kính PC tấm rỗng",
      "Nhà kính trồng rau gia đình",
      "Nhà kính ban công 1×2m",
      "Nhà kính nông nghiệp 6×8m",
      "Nhà kính multi-span",
      "Nhà kính có hệ thống tưới",
    ],
    productNames: [
      "Nhà kính mini PE 2×3×2.1m khung sắt mạ kẽm, dùng vườn nhà",
      "Nhà kính khung nhôm 3×4×2.4m, mái PC 6mm tấm rỗng",
      "Nhà kính PC tấm rỗng 4×6×2.5m, có cửa trượt + cửa sổ thoát",
      "Nhà kính ban công 1×2×1.8m PE, dùng trồng rau quanh năm",
      "Nhà kính nông nghiệp 6×8×3m khung thép mạ kẽm + film PE",
      "Nhà kính multi-span 8×30m khung thép, có tưới phun sương",
      "Nhà kính có hệ thống tưới nhỏ giọt + quạt hút 4×6m",
      "Nhà kính tunnel 5×10m PE film, dùng trồng dâu + rau ăn lá",
    ],
    styles: ["Gia đình", "Bán chuyên", "Nông trại"],
    materials: ["Khung sắt mạ kẽm", "Khung nhôm", "Tấm PC rỗng", "Film PE"],
    extraFilters: [
      { title: "Diện tích", options: ["<5m²", "5-15m²", "15-50m²", "Trên 50m²"] },
      { title: "Vật liệu mái", options: ["Film PE", "Tấm PC rỗng", "Tấm PC đặc", "Kính cường lực"] },
    ],
  },

  "xe-day-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor living & Sân thượng",
    title: "Xe đẩy vườn",
    resultsCount: "5.320",
    chips: ["4 bánh", "1 bánh", "Có thùng tháo rời", "Có thành lưới", "Tải 200kg", "Tải 300kg"],
    trendingChips: [
      "Xe đẩy vườn 4 bánh tải 200kg",
      "Xe rùa 1 bánh thép",
      "Xe đẩy vườn có thùng tháo",
      "Xe đẩy gấp gọn",
      "Xe đẩy có thành lưới",
      "Xe đẩy điện 24V",
      "Xe đẩy hàng kho landscape",
      "Xe đẩy bánh hơi không xì",
    ],
    productNames: [
      "Xe đẩy vườn 4 bánh tải 200kg thùng PE 90L, càng kéo gấp",
      "Xe rùa 1 bánh thép sơn tĩnh điện, thùng 100L tải 150kg",
      "Xe đẩy vườn có thùng tháo rời nghiêng, dùng đổ phân, đất",
      "Xe đẩy gấp gọn 4 bánh, vải Oxford 600D, tải 100kg",
      "Xe đẩy có thành lưới 4 bánh, tải 300kg, dùng nông trại",
      "Xe đẩy điện 24V tải 200kg, pin lithium 30Ah, leo dốc 25°",
      "Xe đẩy hàng kho landscape 4 bánh càng cứng, tải 350kg",
      "Xe đẩy bánh hơi không xì 16 inch, lốp PU đặc, tải 150kg",
    ],
    styles: ["Gia đình", "Bán chuyên", "Nông trại"],
    materials: ["Khung thép sơn tĩnh điện", "Thùng PE", "Vải Oxford 600D", "Bánh PU đặc"],
    extraFilters: [
      { title: "Tải trọng", options: ["<100kg", "100-200kg", "200-300kg", "Trên 300kg"] },
      { title: "Loại bánh", options: ["1 bánh (xe rùa)", "2 bánh", "4 bánh", "Có động cơ"] },
    ],
  },

  // ===========================================================================
  // Overview-card cross-sections — Theo khu vực sử dụng
  // ===========================================================================
  "trang-tri-trong-nha": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí theo khu vực",
    title: "Trang trí trong nhà",
    resultsCount: "184.620",
    chips: [
      "Tượng trang trí",
      "Bình hoa & Lọ hoa",
      "Tường cây nhân tạo",
      "Khung tranh canvas",
      "Đồng hồ trang trí",
      "Gương decor",
    ],
    trendingChips: [
      "Tượng phật ngọc bích",
      "Bình hoa gốm Cảnh Đức",
      "Tường cây giả 60×60",
      "Khung tranh trừu tượng",
      "Gương tròn Bắc Âu",
      "Đèn bàn ceramic",
      "Vật phẩm resin để bàn",
      "Bộ tượng 3 mèo thần tài",
    ],
    productNames: [
      "Tượng phật A-Di-Đà ngọc bích 30cm khắc thủ công, đế gỗ tử đàn",
      "Bình hoa gốm Cảnh Đức men rạn cao 45cm, vẽ thủy mặc thủ công",
      "Tường cây giả khung nhôm 60×60cm, lá EVA UV 5 năm không phai",
      "Khung tranh canvas trừu tượng bộ 3 tấm 40×60cm, viền gỗ sồi",
      "Gương trang trí tròn Bắc Âu Φ80cm, viền inox 304 mạ vàng PVD",
      "Đèn bàn ceramic dáng cong 45cm, chao vải linen, bóng E27",
      "Bộ 3 mèo thần tài Maneki-Neko vàng nhũ resin 18cm chống ẩm",
      "Đồng hồ treo tường nan gỗ MDF 50cm, kim trượt Nhật chính hãng",
    ],
    styles: ["Hiện đại", "Bắc Âu", "Tân cổ điển", "Tối giản", "Phật giáo", "Light Luxury"],
    materials: ["Resin", "Gốm sứ", "Inox 304", "Composite", "Gỗ MDF phủ Acrylic", "Lụa polyester"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Khu vực sử dụng", options: ["Phòng khách", "Phòng ngủ", "Phòng ăn", "Sảnh", "Văn phòng tại nhà"] },
    ],
  },

  "trang-tri-san-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí theo khu vực",
    title: "Trang trí sân vườn",
    resultsCount: "96.480",
    chips: [
      "Tượng vườn",
      "Đài phun nước",
      "Đèn solar",
      "Quả cầu phản chiếu",
      "Phù điêu tường",
      "Cờ trang trí",
    ],
    trendingChips: [
      "Tượng sư tử đá granite",
      "Đài phun nước 3 tầng",
      "Đèn solar cắm cỏ LED",
      "Quả cầu phản chiếu inox",
      "Phù điêu nhựa PU",
      "Tượng cá chép phong thủy",
      "Cờ vườn vải polyester",
      "Phong linh kim loại",
    ],
    productNames: [
      "Tượng sư tử đá granite nguyên khối cao 1.2m, chống mưa nắng 20 năm",
      "Đài phun nước 3 tầng đường kính 1.5m composite phủ đá nhân tạo",
      "Bộ 6 đèn solar cắm cỏ LED 1W IP65, pin lithium 1200mAh",
      "Quả cầu phản chiếu vườn inox 304 đánh bóng gương Φ30cm",
      "Phù điêu tường vườn nhựa PU Hy Lạp 80×120cm chống thấm",
      "Tượng cá chép vượt vũ môn composite 60cm, hoàn thiện đá nhân tạo",
      "Bộ cờ trang trí vườn vải polyester 30×45cm, in UV 4 mùa",
      "Phong linh kim loại đồng cao 60cm, 6 ống tone Tây Tạng",
    ],
    styles: ["Tân cổ điển", "Bắc Âu", "Mediterranean", "Tự nhiên", "Trung Hoa", "Tropical"],
    materials: ["Đá granite", "Composite", "Nhựa PU", "Inox 304", "Đồng đúc", "Gốm sứ men ngoài trời"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Vị trí lắp đặt", options: ["Sân trước", "Sân sau", "Hồ cá", "Lối đi vườn", "Sân thượng"] },
    ],
  },

  "phong-khach-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí theo khu vực",
    title: "Trang trí phòng khách",
    resultsCount: "142.305",
    chips: [
      "Bình hoa lớn",
      "Tranh canvas",
      "Tượng để bàn console",
      "Cây giả lớn",
      "Đèn bàn floor",
      "Thảm trải sàn",
    ],
    trendingChips: [
      "Cây ô liu giả 1.8m sảnh",
      "Bình hoa floor vase 80cm",
      "Bộ tranh canvas trừu tượng",
      "Đèn floor đứng 1.6m",
      "Thảm Ba Tư 200×290",
      "Tượng abstract resin trắng",
      "Bàn console gốm sứ",
      "Set decor bàn trà",
    ],
    productNames: [
      "Bình hoa floor vase gốm sứ cao 80cm, vẽ men ngọc Long Tuyền",
      "Cây ô liu giả Tuscany 180cm, 1.200 lá real-touch latex chậu xi măng",
      "Bộ 3 tranh canvas trừu tượng 60×90cm, khung gỗ sồi vân thật",
      "Đèn cây đứng góc phòng khách 1.6m, đế đá cẩm thạch chao linen",
      "Thảm Ba Tư polypropylene 200×290cm, dệt tay hoa văn truyền thống",
      "Tượng face abstract resin trắng 35cm, hoàn thiện matte sơn epoxy",
      "Bộ decor bàn trà 5 món: tray gỗ + nến + tượng + bình + sách",
      "Vách ngăn 4 cánh khung gỗ sồi cao 1.8m, mặt phim mờ ánh vàng",
    ],
    styles: ["Hiện đại", "Tân cổ điển", "Bắc Âu", "Industrial", "Light Luxury", "Boho"],
    materials: ["Gốm sứ", "Resin", "Vải linen", "Gỗ sồi", "Đá cẩm thạch", "Polypropylene"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Vị trí trong phòng", options: ["Bàn console", "Bàn trà", "Góc phòng", "Trên tường", "Tủ TV"] },
    ],
  },

  "phong-an-khach-san": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí theo khu vực",
    title: "Trang trí phòng ăn khách sạn",
    resultsCount: "58.940",
    chips: [
      "Bộ trung tâm bàn",
      "Đèn chùm pendant",
      "Vách ngăn decor",
      "Khay phục vụ",
      "Bình hoa bàn ăn",
      "Tranh tường F&B",
    ],
    trendingChips: [
      "Đèn chùm pendant ballroom",
      "Bộ centerpiece bàn dài 3m",
      "Bình hoa bàn ăn cao 35cm",
      "Vách ngăn cây giả CNC",
      "Khay buffet inox 304",
      "Tranh tường F&B canvas",
      "Đèn chân nến 5 ngọn",
      "Lọ tiêu muối ceramic",
    ],
    productNames: [
      "Đèn chùm pha lê K9 ballroom Φ1.2m, 24 bóng E14 + LED dimmable",
      "Bộ centerpiece bàn dài 3m 5 món: bình hoa + nến + đế gương",
      "Bình hoa bàn ăn ceramic cao 35cm matte beige, miệng rộng cắm hoa thật",
      "Vách ngăn CNC gỗ MDF phủ veneer óc chó hoa văn arabic 2.4×1.2m",
      "Khay buffet inox 304 GN 1/1 sâu 65mm, mặt mờ chống vân tay",
      "Bộ tranh tường F&B canvas 60×90cm bộ 3, chủ đề ẩm thực Á Đông",
      "Đèn chân nến 5 ngọn kim loại đồng cao 60cm, dùng banquet",
      "Lọ tiêu muối ceramic vuông 8cm, set 24 cặp logo khách sạn 5 sao",
    ],
    styles: ["5 sao quốc tế", "Tân cổ điển", "Á Đông", "Light Luxury", "Industrial F&B"],
    materials: ["Pha lê K9", "Inox 304", "Gốm sứ men matte", "Đồng đúc", "Gỗ veneer óc chó"],
    extraFilters: [
      { title: "Loại không gian F&B", options: ["Buffet sảnh", "Fine dining", "À la carte", "Banquet", "Pool bar"] },
      { title: "Chứng nhận", options: ["NSF (food safe)", "FDA", "LFGB EU", "ISO 22000", "CE"] },
    ],
    featuredSupplier: {
      name: "Foshan Hospitality Decor Factory",
      logo: "https://picsum.photos/seed/sup-hotel-fs/120/120",
      loc: "Foshan, Guangdong",
      videoCaption: "Xưởng decor F&B 5 sao — chuyên cung cấp Marriott, Hilton",
      products: [
        { title: "Đèn chùm ballroom K9 1.2m", price: "$420–680/cái" },
        { title: "Bộ centerpiece banquet 3m", price: "$120–185/bộ" },
      ],
    },
  },

  "hanh-lang-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí theo khu vực",
    title: "Trang trí hành lang",
    resultsCount: "32.180",
    chips: [
      "Bàn console hẹp",
      "Gương lớn treo",
      "Tranh runner dài",
      "Đèn tường wall sconce",
      "Cây giả mảnh",
      "Thảm runner",
    ],
    trendingChips: [
      "Bàn console hẹp 30cm",
      "Gương treo tường 1.6m",
      "Đèn tường wall sconce LED",
      "Tranh runner 30×120cm",
      "Cây kim tiền hẹp 1.2m",
      "Thảm runner 80×300cm",
      "Bộ 3 tranh hành lang",
      "Tượng decor mảnh dài",
    ],
    productNames: [
      "Bàn console hành lang hẹp 30×120cm gỗ sồi, chân kim loại đen",
      "Gương treo tường hành lang 60×160cm, viền gỗ sồi tự nhiên",
      "Đèn tường wall sconce LED 12W, chao kim loại đen, ánh vàng 3000K",
      "Bộ 3 tranh canvas hành lang 30×120cm, chủ đề tropical leaves",
      "Cây kim tiền giả hẹp cao 1.2m, chậu xi măng vuông 18cm",
      "Thảm runner hành lang 80×300cm, chất liệu polypropylene chống trượt",
      "Tượng decor cao mảnh resin 60cm, hình dáng nghệ thuật abstract",
      "Đồng hồ treo tường thiết kế dài đứng 80cm, kim Nhật im lặng",
    ],
    styles: ["Hiện đại", "Tối giản", "Bắc Âu", "Tân cổ điển", "Industrial"],
    materials: ["Gỗ sồi", "Kim loại sơn tĩnh điện", "Polypropylene", "Resin", "Vải canvas"],
    extraFilters: [
      { title: "Chiều rộng hành lang", options: ["<1m", "1-1.5m", "1.5-2m", "Trên 2m"] },
    ],
  },

  "ban-cong-san-thuong": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí theo khu vực",
    title: "Trang trí ban công & sân thượng",
    resultsCount: "76.215",
    chips: [
      "Bộ bàn ghế ngoài trời",
      "Cây giả chống UV",
      "Đèn dây fairy",
      "Chậu cây treo",
      "Pergola di động",
      "Sàn gỗ ghép WPC",
    ],
    trendingChips: [
      "Bộ bàn ghế ban công bistro",
      "Cây ô liu giả UV chậu xi măng",
      "Đèn dây solar 10m",
      "Chậu treo lan can sắt",
      "Pergola gấp di động 3×3m",
      "Sàn gỗ ghép WPC 30×30",
      "Lưới che nắng HDPE 70%",
      "Bồn trồng tự tưới balcony",
    ],
    productNames: [
      "Bộ bàn ghế bistro ban công 1 bàn 2 ghế, khung thép sơn tĩnh điện",
      "Cây ô liu giả UV cao 1.5m, chậu xi măng vuông 25cm chống mưa",
      "Đèn dây solar fairy LED 10m 100 bóng, IP65, pin lithium",
      "Bộ 4 chậu treo lan can sắt nhựa PE, móc inox điều chỉnh",
      "Pergola gấp di động 3×3m khung nhôm, mái vải Oxford 600D",
      "Sàn gỗ ghép WPC 30×30cm, lắp click không cần ốc, chống trơn",
      "Lưới che nắng HDPE 70% UV 5×3m, khoen inox cách 50cm",
      "Bồn trồng tự tưới balcony nhựa PE 60×25cm, có hồ chứa nước 4L",
    ],
    styles: ["Tropical", "Bắc Âu", "Mediterranean", "Industrial", "Boho"],
    materials: ["Khung nhôm", "Thép sơn tĩnh điện", "WPC", "Nhựa PE", "Vải Oxford 600D"],
    extraFilters: [
      { title: "Diện tích ban công", options: ["<5m²", "5-10m²", "10-20m²", "Trên 20m²"] },
      { title: "Hướng nắng", options: ["Hướng Đông", "Hướng Tây", "Hướng Nam", "Hướng Bắc"] },
    ],
  },

  "khu-vuc-sanh": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí theo khu vực",
    title: "Trang trí khu vực sảnh",
    resultsCount: "44.760",
    chips: [
      "Cây giả sảnh lớn",
      "Bình hoa floor vase",
      "Tượng welcome",
      "Đèn chùm sảnh",
      "Bàn lễ tân",
      "Thảm sảnh tròn",
    ],
    trendingChips: [
      "Cây ô liu sảnh 2.5m",
      "Bình hoa sảnh 1.2m gốm",
      "Tượng phong thủy đầu sảnh",
      "Đèn chùm sảnh ballroom",
      "Bàn lễ tân hotel",
      "Thảm sảnh tròn Φ3m",
      "Bồn cây sợi thủy tinh đại",
      "Bộ centerpiece reception",
    ],
    productNames: [
      "Cây ô liu sảnh khách sạn cao 2.5m, 2.500 lá EVA UV-stable",
      "Bình hoa floor vase gốm sứ cao 1.2m, vẽ thủy mặc Cảnh Đức thủ công",
      "Cặp tượng sư tử đá granite cao 1.5m, đặt 2 bên cửa sảnh",
      "Đèn chùm sảnh pha lê K9 Φ1.5m, 36 bóng LED dimmable",
      "Bàn lễ tân hotel 3m gỗ veneer óc chó, mặt đá nhân tạo trắng",
      "Thảm sảnh tròn Φ3m polypropylene, dệt tay logo khách sạn",
      "Bồn cây sợi thủy tinh đại Φ80×H100cm, lót lớp chống thấm EPDM",
      "Bộ centerpiece reception 7 món: bình + tượng + nến + tray gương",
    ],
    styles: ["5 sao quốc tế", "Tân cổ điển", "Light Luxury", "Trung Hoa", "Hiện đại sang trọng"],
    materials: ["Pha lê K9", "Đá granite", "Sợi thủy tinh", "Gỗ veneer", "Đá nhân tạo Solid Surface"],
    extraFilters: [
      { title: "Loại sảnh", options: ["Khách sạn", "Văn phòng", "Chung cư cao cấp", "Showroom", "Resort"] },
      SIZE_FILTER,
    ],
    featuredSupplier: {
      name: "Guangzhou Lobby Decor Co., Ltd.",
      logo: "https://picsum.photos/seed/sup-lobby-gz/120/120",
      loc: "Guangzhou, Guangdong",
      videoCaption: "Tour xưởng decor sảnh — đã cung cấp 200+ khách sạn 5 sao châu Á",
      products: [
        { title: "Bình hoa floor 1.2m Cảnh Đức", price: "$185–280/cái" },
        { title: "Cây ô liu sảnh 2.5m EVA UV", price: "$320–450/cây" },
      ],
    },
  },

  "san-van-dong-cong-vien": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Trang trí theo khu vực",
    title: "Trang trí sân vận động & công viên",
    resultsCount: "28.430",
    chips: [
      "Ghế công viên đại trà",
      "Thùng rác composite",
      "Đèn pha sân thể thao",
      "Cột đèn cảnh quan",
      "Bồn cây đại",
      "Bảng chỉ dẫn",
    ],
    trendingChips: [
      "Ghế công viên 1.8m thép composite",
      "Thùng rác composite phân loại",
      "Đèn pha sân bóng 400W",
      "Cột đèn cảnh quan 4m",
      "Bồn cây sợi thủy tinh đại 1m",
      "Bảng chỉ dẫn công viên CNC",
      "Lan can trang trí WPC",
      "Cổng chào composite vòm",
    ],
    productNames: [
      "Ghế công viên 1.8m khung thép sơn tĩnh điện, mặt WPC chống mục",
      "Thùng rác công viên composite 240L 3 ngăn phân loại, chống cháy",
      "Đèn pha sân bóng 400W LED IP66, 50.000lm góc 60° không loá",
      "Cột đèn cảnh quan công viên cao 4m, chao đôi LED 60W solar lai",
      "Bồn cây sợi thủy tinh đại Φ100×H80cm, đặt giữa quảng trường",
      "Bảng chỉ dẫn công viên CNC gỗ WPC 1.2×0.8m, chân thép âm đất",
      "Lan can trang trí WPC 100m, post 100×100mm, nan 30×80mm",
      "Cổng chào composite vòm 4m, sơn epoxy chịu UV cấp marine",
    ],
    styles: ["Đô thị", "Sinh thái", "Sport venue", "Theme park"],
    materials: ["Thép sơn tĩnh điện", "WPC", "Composite", "Sợi thủy tinh", "Đồng đúc", "Đá granite"],
    extraFilters: [
      { title: "Loại công trình", options: ["Sân vận động", "Công viên đô thị", "Quảng trường", "Trường học", "Khu dân cư"] },
      { title: "Chứng nhận", options: ["CE", "EN 1176 (sân chơi)", "ISO 9001", "RoHS", "FSC"] },
    ],
  },

  // ===========================================================================
  // Overview-card cross-sections — Theo loại sản phẩm
  // ===========================================================================
  "chau-hoa-bon-cay": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Theo loại sản phẩm",
    title: "Chậu hoa & Bồn cây",
    resultsCount: "215.840",
    chips: [
      "Chậu composite",
      "Chậu nhựa PE",
      "Chậu gốm sứ",
      "Chậu xi măng",
      "Chậu inox",
      "Chậu sợi thủy tinh",
    ],
    trendingChips: [
      "Chậu composite tròn 60cm",
      "Bồn nhựa PE chữ nhật",
      "Chậu gốm sứ men trắng 40",
      "Chậu xi măng vuông 50",
      "Chậu inox 304 đáy gỗ",
      "Bồn tự tưới balcony",
      "Chậu sợi thủy tinh vuông",
      "Chậu treo lan can",
    ],
    productNames: [
      "Chậu composite tròn cao 60cm Φ50cm, sơn epoxy đa màu, lỗ thoát đáy",
      "Bồn cây nhựa PE chữ nhật 80×30×35cm, kháng UV 8 năm, chân tháo",
      "Chậu gốm sứ men trắng Cảnh Đức cao 40cm, vẽ tay hoa văn xanh lam",
      "Chậu xi măng vuông 50×50×50cm, bề mặt nhám tự nhiên anti-mold",
      "Chậu inox 304 trụ tròn cao 70cm, đáy gỗ tếch tự nhiên chống mục",
      "Bồn cây sợi thủy tinh vuông 40×40×40cm, finish matte 12 màu",
      "Bồn tự tưới balcony PP 60×25cm, hồ chứa 4L nước, ống dẫn mao mạch",
      "Bộ 3 chậu treo lan can nhựa ABS, móc inox điều chỉnh 0–180mm",
    ],
    styles: ["Hiện đại", "Tối giản", "Bắc Âu", "Mediterranean", "Industrial", "Tropical"],
    materials: ["Composite", "Nhựa PE", "Gốm sứ", "Xi măng", "Inox 304", "Sợi thủy tinh"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Hình dáng", options: ["Tròn", "Vuông", "Chữ nhật", "Trụ cao", "Hình côn"] },
      { title: "Vị trí", options: ["Trong nhà", "Ngoài trời", "Treo lan can", "Treo trần", "Sảnh"] },
    ],
  },

  "binh-hoa": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Theo loại sản phẩm",
    title: "Bình hoa",
    resultsCount: "84.520",
    chips: [
      "Bình hoa thủy tinh",
      "Bình hoa gốm sứ",
      "Floor vase lớn",
      "Bình mini để bàn",
      "Bình kim loại",
      "Bình resin",
    ],
    trendingChips: [
      "Bình thủy tinh thổi tay 25cm",
      "Bình gốm Cảnh Đức men rạn",
      "Floor vase 80cm phòng khách",
      "Bình mini đầu giường 12cm",
      "Bình kim loại brass mạ vàng",
      "Bình ceramic Bắc Âu matte",
      "Bình pha lê K9 cắt khía",
      "Bình resin abstract trắng",
    ],
    productNames: [
      "Bình thủy tinh thổi tay miệng loe cao 25cm, đế vàng đồng",
      "Bình gốm Cảnh Đức men rạn cao 45cm, vẽ thủy mặc thủ công",
      "Floor vase ceramic phòng khách cao 80cm, miệng rộng cắm hoa thật",
      "Bình hoa mini đầu giường 12cm matte beige, set 3 cái cùng tone",
      "Bình kim loại brass mạ vàng PVD cao 30cm, miệng hẹp cắm 1 cành",
      "Bình ceramic Bắc Âu matte ribbed cao 28cm, 6 màu pastel pha trộn",
      "Bình pha lê K9 cắt khía Bohemia cao 22cm, đáy dày 15mm cao cấp",
      "Bình resin abstract face hiện đại trắng 35cm, finish matte epoxy",
    ],
    styles: ["Hiện đại", "Bắc Âu", "Tân cổ điển", "Trung Hoa", "Vintage", "Light Luxury"],
    materials: ["Thủy tinh borosilicate", "Gốm sứ", "Kim loại đồng/brass", "Pha lê K9", "Resin"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Loại miệng", options: ["Miệng loe rộng", "Miệng hẹp", "Miệng đứng", "Miệng cong"] },
    ],
  },

  "vat-pham-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Theo loại sản phẩm",
    title: "Vật phẩm trang trí",
    resultsCount: "168.940",
    chips: [
      "Tượng để bàn",
      "Khay decor",
      "Chân nến",
      "Hộp đựng decor",
      "Mô hình kiến trúc",
      "Quả cầu trang trí",
    ],
    trendingChips: [
      "Tượng abstract resin",
      "Khay decor gương vàng",
      "Chân nến đồng 3 ngọn",
      "Hộp khăn giấy ceramic",
      "Mô hình tháp Eiffel",
      "Quả cầu thủy tinh phản chiếu",
      "Sách giả decor",
      "Bộ 3 lọ trang trí matte",
    ],
    productNames: [
      "Tượng face abstract resin trắng 35cm, hoàn thiện matte epoxy không phai",
      "Khay decor gương mạ vàng PVD chữ nhật 40×25cm, viền inox 304",
      "Chân nến đồng 3 ngọn cao 60cm, dùng banquet hoặc bàn console",
      "Hộp khăn giấy ceramic Bắc Âu Bear hình gấu 25cm, men matte trắng",
      "Mô hình tháp Eiffel mạ vàng 32cm, đế đá cẩm thạch trắng",
      "Quả cầu thủy tinh phản chiếu Φ20cm, đế gỗ óc chó tròn",
      "Set 5 quyển sách giả decor bìa cứng vintage, dùng tủ trang trí",
      "Bộ 3 lọ trang trí ceramic matte set, cao 15-20-25cm cùng tone",
    ],
    styles: ["Hiện đại", "Bắc Âu", "Light Luxury", "Vintage", "Industrial", "Phong thủy"],
    materials: ["Resin", "Gốm sứ", "Kim loại đồng/brass", "Inox 304 PVD", "Đá cẩm thạch", "Gỗ óc chó"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Vị trí decor", options: ["Bàn console", "Tủ TV", "Bàn ăn", "Bàn làm việc", "Tường"] },
    ],
  },

  "den-san-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Theo loại sản phẩm",
    title: "Đèn sân vườn",
    resultsCount: "112.380",
    chips: [
      "Đèn solar",
      "Đèn LED âm đất",
      "Đèn cắm cỏ",
      "Đèn pha LED",
      "Đèn dây fairy",
      "Cột đèn cảnh quan",
    ],
    trendingChips: [
      "Đèn solar cắm cỏ LED 1W",
      "Đèn pha LED 50W IP66",
      "Đèn âm đất 12V deck",
      "Đèn dây fairy 10m solar",
      "Cột đèn cảnh quan 3m",
      "Đèn motif dáng bướm",
      "Đèn chiếu cây spotlight",
      "Đèn solar tường wall",
    ],
    productNames: [
      "Bộ 6 đèn solar cắm cỏ LED 1W IP65, pin lithium 1200mAh sáng 8h",
      "Đèn pha LED ngoài trời 50W IP66 6500K, vỏ nhôm chống ăn mòn muối",
      "Đèn âm đất deck 12V DC 1W IP67, mặt inox 304, đường kính 60mm",
      "Đèn dây fairy solar 10m 100 bóng LED, 8 chế độ chớp, IP65",
      "Cột đèn cảnh quan công viên cao 3m, chao đôi LED 60W ánh vàng",
      "Đèn motif dáng bướm LED 25W IP65, lắp tường, sáng đa màu RGB",
      "Đèn chiếu cây spotlight LED 12W IP66 cọc cắm điều chỉnh góc 360°",
      "Đèn solar wall lắp tường ngoài trời 6W IP65, motion sensor PIR",
    ],
    styles: ["Hiện đại", "Cổ điển", "Tropical", "Industrial", "Bắc Âu"],
    materials: ["Vỏ nhôm đúc", "Inox 304", "Nhựa PC chống UV", "Đồng nguyên chất"],
    extraFilters: [
      { title: "Nguồn điện", options: ["Solar", "Điện 220V", "DC 12V", "DC 24V", "Pin sạc lithium"] },
      { title: "IP rating", options: ["IP54", "IP65", "IP66", "IP67", "IP68"] },
      { title: "Công suất", options: ["<5W", "5-20W", "20-50W", "50-100W", "Trên 100W"] },
    ],
  },

  // ===========================================================================
  // Overview-card cross-sections — Theo vật liệu
  // ===========================================================================
  "vat-lieu-composite": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Theo vật liệu",
    title: "Sản phẩm composite",
    resultsCount: "67.420",
    chips: [
      "Chậu composite",
      "Tượng composite",
      "Bàn ghế WPC",
      "Phù điêu composite",
      "Sàn ghép WPC",
      "Cổng vòm composite",
    ],
    trendingChips: [
      "Chậu composite tròn 60cm",
      "Tượng cá chép composite 60cm",
      "Bàn ghế WPC outdoor",
      "Phù điêu Hy Lạp composite",
      "Sàn ghép WPC 30×30",
      "Cổng vòm composite vườn",
      "Tượng sư tử composite phủ đá",
      "Lan can WPC chống mục",
    ],
    productNames: [
      "Chậu composite tròn cao 60cm Φ50cm, sơn epoxy 12 màu, chịu nắng 10 năm",
      "Tượng cá chép vượt vũ môn composite 60cm, hoàn thiện đá nhân tạo",
      "Bộ bàn ghế WPC outdoor 1+4, khung nhôm + nan WPC chống mục",
      "Phù điêu tường vườn composite Hy Lạp 80×120cm, sơn antique gold",
      "Sàn ghép WPC ngoài trời 30×30cm, lắp click không ốc, anti-slip",
      "Cổng vòm composite vườn 4m, sơn epoxy chịu UV cấp marine",
      "Tượng sư tử composite phủ đá nhân tạo cao 1m, độ bền 15 năm",
      "Lan can WPC 100m, post 100×100mm + nan 30×80mm chống mục",
    ],
    styles: ["Hiện đại", "Tân cổ điển", "Tropical", "Mediterranean"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Ứng dụng", options: ["Sân vườn", "Sảnh", "Công viên", "Resort", "Villa"] },
      { title: "Bảo hành", options: ["3 năm", "5 năm", "10 năm", "15 năm"] },
    ],
  },

  "vat-lieu-nhua-pe": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Theo vật liệu",
    title: "Sản phẩm nhựa PE",
    resultsCount: "94.260",
    chips: [
      "Chậu PE",
      "Bồn cây PE tự tưới",
      "Bàn ghế PE rattan",
      "Thùng rác PE",
      "Lưới PE che nắng",
      "Khay PE nhân giống",
    ],
    trendingChips: [
      "Chậu PE tròn 40cm",
      "Bồn PE tự tưới balcony",
      "Bàn ghế PE rattan outdoor",
      "Thùng rác công viên 240L",
      "Lưới HDPE che nắng 70%",
      "Khay nhân giống PE 105 lỗ",
      "Bể chứa nước PE 1000L",
      "Hộp PE trồng rau hữu cơ",
    ],
    productNames: [
      "Chậu PE tròn cao 40cm Φ35cm, kháng UV 8 năm, lỗ thoát nước đáy",
      "Bồn cây PE tự tưới balcony 60×25cm, hồ 4L, ống dẫn mao mạch",
      "Bộ bàn ghế PE rattan outdoor 1+4 khung nhôm, đệm vải Olefin",
      "Thùng rác công viên PE 240L 3 ngăn phân loại, chống cháy V0",
      "Lưới che nắng HDPE 70% UV 5×3m, dày 0.45mm, khoen inox",
      "Khay nhân giống PE 105 lỗ 54×28cm, dùng ươm hạt giống nông trại",
      "Bể chứa nước PE 1000L, dày 5mm food-grade, chống tảo",
      "Hộp PE trồng rau hữu cơ vuông 30×30cm, có chân + khay đáy",
    ],
    styles: ["Tropical", "Industrial", "Tối giản"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Cấp độ PE", options: ["LDPE", "HDPE", "LLDPE", "Roto-mold PE", "PE food-grade"] },
      { title: "Kháng UV", options: ["3 năm", "5 năm", "8 năm", "10 năm"] },
    ],
  },

  "vat-lieu-gom-su": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Theo vật liệu",
    title: "Sản phẩm gốm sứ",
    resultsCount: "78.940",
    chips: [
      "Bình hoa gốm",
      "Chậu gốm sứ",
      "Tượng gốm",
      "Đồ trang trí Cảnh Đức",
      "Tile gốm trang trí",
      "Lọ trang trí matte",
    ],
    trendingChips: [
      "Bình gốm Cảnh Đức men rạn",
      "Chậu gốm men trắng 40cm",
      "Tượng phật ngọc gốm",
      "Đồ Cảnh Đức vẽ thủy mặc",
      "Tile gốm Maroc trang trí",
      "Lọ matte ribbed Bắc Âu",
      "Bộ trà gốm Long Tuyền",
      "Hộp khăn ceramic Bắc Âu",
    ],
    productNames: [
      "Bình gốm Cảnh Đức men rạn cao 45cm, vẽ thủy mặc thủ công 100%",
      "Chậu gốm sứ men trắng cao 40cm, miệng rộng vẽ tay hoa văn xanh lam",
      "Tượng phật A-Di-Đà gốm men ngọc 30cm, đế gỗ tử đàn",
      "Bộ 6 tile gốm Maroc 20×20cm, men cobalt blue dùng ốp tường",
      "Lọ ceramic Bắc Âu matte ribbed cao 28cm, 6 màu pastel",
      "Bộ trà gốm Long Tuyền 9 món men ngọc bích, hộp gỗ quà tặng",
      "Hộp khăn giấy ceramic Bắc Âu Bear, men matte trắng 25cm",
      "Đèn bàn ceramic men rạn cao 45cm, chao vải linen, bóng E27",
    ],
    styles: ["Trung Hoa cổ điển", "Bắc Âu", "Mediterranean", "Hiện đại"],
    extraFilters: [
      { title: "Loại men", options: ["Men rạn", "Men ngọc", "Men matte", "Men bóng", "Men sần"] },
      { title: "Vùng sản xuất", options: ["Cảnh Đức", "Long Tuyền", "Đức Hóa", "Quảng Đông"] },
    ],
  },

  "vat-lieu-da-tu-nhien": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Theo vật liệu",
    title: "Sản phẩm đá tự nhiên",
    resultsCount: "42.180",
    chips: [
      "Tượng đá granite",
      "Đài phun đá",
      "Phù điêu đá",
      "Chậu đá travertine",
      "Bàn đá cẩm thạch",
      "Bia đá khắc",
    ],
    trendingChips: [
      "Tượng sư tử đá granite 1.2m",
      "Đài phun đá 3 tầng",
      "Phù điêu đá sandstone vườn",
      "Chậu đá travertine 40cm",
      "Bàn đá cẩm thạch tròn",
      "Bia đá khắc CNC",
      "Tượng đá hoa cương Hy Lạp",
      "Cối đá xay tay vintage",
    ],
    productNames: [
      "Tượng sư tử đá granite nguyên khối cao 1.2m, đánh bóng/nhám 2 mặt",
      "Đài phun nước đá 3 tầng đường kính 1.5m, hoa cương Sơn Đông",
      "Phù điêu đá sandstone vườn 80×120cm, khắc tay hoa văn La Mã",
      "Chậu đá travertine tròn cao 40cm Φ35cm, finish honed tự nhiên",
      "Bàn đá cẩm thạch tròn Φ80cm dày 30mm, chân kim loại đồng",
      "Bia đá khắc CNC 60×40cm, đá granite đen Sơn Đông G684",
      "Tượng nữ thần đá hoa cương Hy Lạp 1.5m, hand-carved 100%",
      "Cối đá xay tay vintage Φ40cm, đá ong tự nhiên decor sân vườn",
    ],
    styles: ["Cổ điển Hy Lạp/La Mã", "Trung Hoa cổ điển", "Tự nhiên", "Vintage"],
    extraFilters: [
      { title: "Loại đá", options: ["Granite", "Marble", "Sandstone", "Travertine", "Limestone", "Bluestone"] },
      { title: "Hoàn thiện", options: ["Polished (bóng)", "Honed (mờ)", "Flamed (nhám)", "Bush hammered", "Sandblasted"] },
      SIZE_FILTER,
    ],
    featuredSupplier: {
      name: "Quanzhou Natural Stone Carving",
      logo: "https://picsum.photos/seed/sup-stone-qz/120/120",
      loc: "Quanzhou, Fujian",
      videoCaption: "Xưởng đá Tuyền Châu — chuyên tượng đá granite tự nhiên xuất khẩu",
      products: [
        { title: "Tượng sư tử granite 1.2m", price: "$580–880/cặp" },
        { title: "Đài phun đá 3 tầng 1.5m", price: "$1.250–1.850/bộ" },
      ],
    },
  },

  "vat-lieu-kim-loai-son-tinh-dien": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Theo vật liệu",
    title: "Sản phẩm kim loại sơn tĩnh điện",
    resultsCount: "58.620",
    chips: [
      "Bàn ghế thép sơn",
      "Lan can thép sơn",
      "Chậu thép sơn",
      "Cổng sắt sơn",
      "Ghế công viên",
      "Giá kệ ngoài trời",
    ],
    trendingChips: [
      "Bàn ghế bistro thép sơn",
      "Lan can thép vuông sơn đen",
      "Chậu thép sơn ngoài trời",
      "Cổng sắt nghệ thuật sơn",
      "Ghế công viên 1.8m",
      "Giá kệ thép sơn outdoor",
      "Khung pergola thép sơn",
      "Bộ giá đỡ chậu 3 tầng",
    ],
    productNames: [
      "Bộ bàn ghế bistro ban công thép sơn tĩnh điện đen, mặt 60cm",
      "Lan can thép vuông 40×40 sơn tĩnh điện đen, anti-rust 2 lớp",
      "Chậu thép sơn ngoài trời cao 50cm, sơn epoxy chịu UV 8 năm",
      "Cổng sắt nghệ thuật sơn tĩnh điện cánh 1.5m, hoa văn CNC",
      "Ghế công viên 1.8m khung thép sơn, mặt WPC chống mục",
      "Giá kệ thép sơn outdoor 5 tầng 60×30×180cm, tải 50kg/tầng",
      "Khung pergola thép sơn 3×3m, mái vải Oxford 600D chống thấm",
      "Bộ giá đỡ chậu 3 tầng kim loại đen 80cm, sơn epoxy nhám",
    ],
    styles: ["Industrial", "Hiện đại", "Vintage Pháp", "Tối giản"],
    extraFilters: [
      { title: "Cấp độ sơn", options: ["1 lớp", "2 lớp epoxy + polyester", "3 lớp marine", "Anti-rust C5"] },
      { title: "Màu sơn", options: ["Đen RAL 9005", "Trắng RAL 9010", "Xám RAL 7016", "Đồng vintage", "Tùy chọn"] },
      { title: "Bảo hành", options: ["2 năm", "5 năm", "10 năm"] },
    ],
  },

  "vat-lieu-soi-thuy-tinh": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Theo vật liệu",
    title: "Sản phẩm sợi thủy tinh",
    resultsCount: "38.940",
    chips: [
      "Chậu sợi thủy tinh",
      "Bồn cây fiberglass",
      "Tượng fiberglass",
      "Bàn ghế fiberglass",
      "Phù điêu fiberglass",
      "Chậu sảnh đại",
    ],
    trendingChips: [
      "Chậu sợi thủy tinh vuông 40cm",
      "Bồn fiberglass tròn 60cm",
      "Tượng fiberglass sảnh",
      "Bàn ghế fiberglass outdoor",
      "Phù điêu fiberglass tường",
      "Chậu sảnh đại 1m",
      "Chậu fiberglass matte 12 màu",
      "Bồn fiberglass dáng côn",
    ],
    productNames: [
      "Bồn cây sợi thủy tinh vuông 40×40×40cm, finish matte 12 màu",
      "Chậu fiberglass tròn cao 60cm Φ50cm, lớp gelcoat marine grade",
      "Tượng nữ thần fiberglass sảnh khách sạn cao 1.8m, sơn faux-marble",
      "Bộ bàn ghế fiberglass outdoor 1+4, gelcoat trắng chống ố vàng",
      "Phù điêu tường fiberglass 80×120cm, sơn antique gold không phai",
      "Chậu sảnh đại fiberglass Φ80×H100cm, lót lớp EPDM chống thấm",
      "Bộ 3 chậu fiberglass matte ngoài trời, vuông 30/40/50cm cùng tone",
      "Bồn fiberglass dáng côn cao 70cm, miệng 50/đáy 35, decor minimalist",
    ],
    styles: ["Hiện đại", "Tối giản", "Tân cổ điển", "Light Luxury"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Hoàn thiện", options: ["Matte", "Bóng", "Faux-marble", "Faux-stone", "Anti-graffiti"] },
      { title: "Bảo hành", options: ["5 năm", "8 năm", "10 năm", "15 năm"] },
    ],
  },

  "vat-lieu-may-tre": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Theo vật liệu",
    title: "Sản phẩm mây & tre",
    resultsCount: "31.450",
    chips: [
      "Bàn ghế mây tự nhiên",
      "Bàn ghế PE rattan",
      "Đèn tre",
      "Giỏ mây",
      "Vách tre",
      "Decor tre boho",
    ],
    trendingChips: [
      "Bàn ghế mây tự nhiên 1+4",
      "Bộ sofa PE rattan corner",
      "Đèn tre Bắc Âu pendant",
      "Giỏ mây hatched đan tay",
      "Vách tre tự nhiên 1.8m",
      "Decor tre boho macrame",
      "Ghế bập bênh mây",
      "Khay tre đan thủ công",
    ],
    productNames: [
      "Bộ bàn ghế mây tự nhiên 1+4, khung mây cứng đan tay, đệm cotton",
      "Sofa PE rattan corner outdoor 5 chỗ + bàn, khung nhôm chống gỉ",
      "Đèn pendant tre Bắc Âu Φ40cm, đan tay, dây vải dài 1.5m",
      "Bộ 3 giỏ mây hatched đan tay 30/40/50cm, nhuộm màu tự nhiên",
      "Vách ngăn tre tự nhiên 1.8×0.9m, 4 cánh gấp, frame gỗ keo",
      "Set decor tre boho macrame: 5 món tường + treo trần khác cỡ",
      "Ghế bập bênh mây tự nhiên cao 95cm, đan tay Indonesia style",
      "Khay phục vụ tre đan thủ công chữ nhật 40×25cm, chống ẩm",
    ],
    styles: ["Tropical", "Boho", "Bắc Âu", "Á Đông", "Vintage"],
    extraFilters: [
      { title: "Loại mây/tre", options: ["Mây tự nhiên", "PE rattan tổng hợp", "Tre thật", "Tre ép"] },
      { title: "Xuất xứ", options: ["Indonesia style", "Việt Nam style", "Trung Hoa", "Bali"] },
      { title: "Ứng dụng", options: ["Trong nhà", "Ngoài trời (PE)", "Resort", "Café boho"] },
    ],
  },

  "vat-lieu-inox-304": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Theo vật liệu",
    title: "Sản phẩm inox 304",
    resultsCount: "46.180",
    chips: [
      "Chậu inox 304",
      "Lan can inox",
      "Bàn ghế inox",
      "Tượng inox đánh bóng",
      "Khay buffet inox",
      "Quả cầu inox decor",
    ],
    trendingChips: [
      "Chậu inox 304 trụ 70cm",
      "Lan can inox 304 PVD vàng",
      "Bàn ghế inox 304 outdoor",
      "Tượng inox 304 mirror finish",
      "Khay buffet GN 1/1 inox",
      "Quả cầu phản chiếu inox 304",
      "Tay vịn inox brushed satin",
      "Cột đèn cảnh quan inox",
    ],
    productNames: [
      "Chậu inox 304 trụ tròn cao 70cm Φ40cm, đáy gỗ tếch chống mục",
      "Lan can inox 304 PVD vàng cao 90cm, post Φ50.8 + tay vịn Φ42.4",
      "Bộ bàn ghế inox 304 outdoor 1+4, mặt đá compact HPL chống mưa",
      "Tượng inox 304 mirror finish abstract cao 1.5m, đế đá granite đen",
      "Khay buffet inox 304 GN 1/1 sâu 65mm, dày 0.8mm, NSF certified",
      "Quả cầu phản chiếu vườn inox 304 đánh bóng gương Φ30cm",
      "Tay vịn inox 304 brushed satin Φ42.4 dài 6m, khớp 90° linh hoạt",
      "Cột đèn cảnh quan inox 304 cao 3m, chao kép LED 60W IP66",
    ],
    styles: ["Hiện đại", "Industrial", "Light Luxury", "5 sao quốc tế"],
    extraFilters: [
      { title: "Hoàn thiện", options: ["Mirror (gương)", "Brushed satin", "PVD vàng", "PVD đồng", "PVD đen"] },
      { title: "Cấp độ inox", options: ["304", "304L", "316", "316L (marine grade)"] },
      { title: "Chứng nhận", options: ["NSF (food)", "ISO 9001", "EN 1090", "CE", "RoHS"] },
    ],
  },
};

// ---------------------------------------------------------------------------
// Auto-fallback: build a default seed by scanning CATEGORIES for the slug.
// Lets every subcat / inline item / overview item that has a `slug` field
// render a working leaf page without requiring a hand-written seed.
// ---------------------------------------------------------------------------

function findLeafContext(
  parentSlug: string,
  leafSlug: string
): { parent: CategoryPage; l2Name: string; title: string } | null {
  const parent = CATEGORIES[parentSlug];
  if (!parent) return null;

  for (const group of parent.overview.groups) {
    for (const raw of group.items) {
      const it: CatOverviewItem = typeof raw === "string" ? { name: raw } : raw;
      if (it.slug === leafSlug) {
        return { parent, l2Name: group.title, title: it.name };
      }
    }
  }

  for (const sec of parent.sections) {
    for (const sc of sec.subcats) {
      if (sc.slug === leafSlug) {
        return { parent, l2Name: sec.title, title: sc.name };
      }
      if (sc.inline) {
        for (const inl of sc.inline) {
          const it: CatSubcatItem = typeof inl === "string" ? { name: inl } : inl;
          if (it.slug === leafSlug) {
            return { parent, l2Name: sec.title, title: it.name };
          }
        }
      }
    }
  }

  return null;
}

const DEFAULT_STYLES = ["Hiện đại", "Cổ điển", "Tối giản", "Industrial", "Châu Âu"];
const DEFAULT_PRODUCT_VARIANTS = [
  "bản tiêu chuẩn xuất khẩu, đóng gói carton 5 lớp",
  "phiên bản cao cấp dành cho dự án khách sạn 5 sao",
  "mẫu OEM tùy chỉnh kích thước, màu sắc, logo",
  "đời 2026, đạt chứng nhận CE/RoHS/ISO 9001",
  "series eco-friendly, vật liệu tái chế FSC",
  "hàng tồn kho sẵn, ship trong 7 ngày từ Quảng Châu",
  "mẫu bestseller 2025, có sample miễn phí cho buyer mới",
  "phiên bản OEM cho thị trường EU, dày dặn cường độ cao",
];

function buildDefaultSeed(
  parentSlug: string,
  parentName: string,
  l2Name: string,
  title: string,
  slug: string
): LeafSeed {
  const h = hashSeed(slug);
  const lower = title.toLowerCase();
  return {
    parentSlug,
    parentName,
    l2Name,
    title,
    resultsCount: synthCount(slug, "results"),
    chips: [
      title,
      `${title} OEM`,
      `${title} cao cấp`,
      `${title} giá sỉ`,
      `${title} sample`,
      `${title} dự án`,
    ],
    trendingChips: [
      `${title} giá tốt`,
      `${title} OEM logo`,
      `${title} mẫu mới 2026`,
      `${title} hàng tồn kho`,
      `${title} cho dự án`,
      `${title} xuất khẩu EU`,
      `${title} tiêu chuẩn quốc tế`,
      `${title} chứng nhận CE`,
    ],
    productNames: DEFAULT_PRODUCT_VARIANTS.map((v, i) => {
      const tag = (h + i) % 4 === 0 ? "Bộ" : (h + i) % 4 === 1 ? "Mẫu" : (h + i) % 4 === 2 ? "Series" : "Dòng";
      return `${tag} ${lower} — ${v}`;
    }),
    styles: DEFAULT_STYLES,
  };
}

export function getLeafCategory(parent: string, leaf: string): LeafCategoryPage | null {
  const data = LEAF_CATEGORIES[leaf];
  if (data && data.parentSlug === parent) return data;

  if (parent === "home-garden") {
    const seed = HOME_GARDEN_LEAVES[leaf];
    if (seed) return buildLeafFromSeed(leaf, seed);
  }

  // Auto-fallback: any leaf slug that exists in CATEGORIES gets a default seed
  const ctx = findLeafContext(parent, leaf);
  if (ctx) {
    const seed = buildDefaultSeed(parent, ctx.parent.title, ctx.l2Name, ctx.title, leaf);
    return buildLeafFromSeed(leaf, seed);
  }

  return null;
}
