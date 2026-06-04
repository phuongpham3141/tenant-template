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

const photo = (seed: string) => `/img/${seed}.jpg?v=5`;

export const LEAF_CATEGORIES: Record<string, LeafCategoryPage> = {
  "ghe-van-phong": {
    slug: "ghe-van-phong",
    parentSlug: "noi-that",
    title: "办公椅",
    parentName: "家具",
    l2Name: "办公家具",
    resultsCount: "77.906",
    chips: [
      { name: "办公椅", active: true },
      { name: "网布椅" },
      { name: "大班椅" },
      { name: "人体工学椅" },
      { name: "转椅" },
      { name: "皮椅" },
    ],
    trendingChips: [
      "制图椅",
      "会议椅",
      "可叠放椅",
      "访客椅",
      "大班椅",
      "职员椅",
      "人体工学椅",
      "网布椅",
    ],
    faqs: [
      {
        q: "人体工学办公椅有什么好处？",
        a: "人体工学椅的设计能够自然支撑脊柱，减轻颈部、肩部和下背部的压力。长时间久坐时，优质的人体工学椅有助于改善坐姿、缓解疲劳，并预防颈椎退化、腰痛等慢性疾病。对于长期的工作效率而言，这是一笔值得的投资。",
      },
      {
        q: "办公椅可以批发采购吗？",
        a: "华越平台上的大多数工厂均支持批发，起订量视型号而定，一般为 10–50 把。您可提交具体数量的询价，供应商将在 24 小时内回复 CIF/DDP 到越南仓的报价。100 把以上的订单通常可在挂牌价基础上享受 8–15% 的折扣。200 把以上的订单可提供 OEM 换标、换皮色、换坐垫服务。",
      },
      {
        q: "如何选择适合自身需求的办公椅？",
        a: "请先明确：（1）每天的久坐时长——4 小时以内可选基础职员椅，6 小时以上建议选人体工学椅；（2）使用者的身高与体重——椅子须具备合适的升降范围；（3）材质——炎热气候宜选透气网布，空调房则可选皮革/布艺。大批量下单前请先索取样品试用。",
      },
    ],
    filters: [
      {
        title: "最新选项",
        options: [
          { name: "职员椅" },
          { name: "大班椅" },
          { name: "网布椅" },
          { name: "会议椅" },
          { name: "人体工学椅" },
        ],
      },
      {
        title: "分类",
        options: [],
        nested: [
          { name: "家具", depth: 0 },
          { name: "办公家具", depth: 1 },
          { name: "办公椅", depth: 2, active: true },
        ],
      },
      {
        title: "风格",
        options: [
          { name: "古典", count: "540" },
          { name: "现代", count: "63.567" },
          { name: "极简", count: "3.714" },
          { name: "中式", count: "748" },
          { name: "美式", count: "154" },
        ],
        showMore: true,
      },
      {
        title: "材质",
        options: [
          { name: "布艺", count: "30.933" },
          { name: "真皮", count: "3.431" },
          { name: "合成皮", count: "14.332" },
        ],
      },
      {
        title: "旋转",
        options: [{ name: "转椅", count: "59.064" }],
      },
      {
        title: "扶手",
        options: [
          { name: "带扶手", count: "63.466" },
          { name: "无扶手", count: "14.440" },
        ],
      },
      {
        title: "产地",
        options: [
          { name: "广东", count: "45.289" },
          { name: "浙江", count: "12.103" },
          { name: "福建", count: "5.874" },
        ],
      },
    ],
    featured: {
      logo: "YF",
      name: "广州雅风家具制造有限公司",
      audited: true,
      rating: 4,
      videoCaption: "私享空间，共享空间",
      videoSrc: photo("yafon-video"),
      miniProducts: [
        { title: "YF-A88 高端网布人体工学椅", price: "155$-299$", unit: "/套", img: photo("yf1") },
        { title: "意大利头层牛皮大班椅 压铸铝脚", price: "320$-540$", unit: "/套", img: photo("yf2") },
        { title: "钢架可叠放会议椅", price: "65$-110$", unit: "/套", img: photo("yf3") },
        { title: "A 字脚布雷绒访客椅", price: "78$-145$", unit: "/套", img: photo("yf4") },
        { title: "YF-A99 带搁脚人体工学椅", price: "210$-399$", unit: "/套", img: photo("yf5") },
      ],
    },
    products: [
      {
        id: "ghe-van-phong-1",
        title: "网布人体工学办公椅 铝合金脚 可调节头枕",
        desc: "钢架静电喷涂，德国透气网布，3D S 形曲线靠背，4D 扶手，3 档锁定后仰机构。广东生产，OEM 200pcs+。",
        priceFrom: "30,00$",
        priceTo: "33,00$",
        unit: "/套",
        moq: "1 套",
        img: { src: photo("chair1"), total: 4 },
        amazing: true,
        monthLabel: "4 月",
        guaranteed: true,
        supplier: {
          name: "佛山阿斯顿家具公司",
          audited: true,
          loc: "📍 中国广东",
        },
      },
      {
        id: "ghe-van-phong-2",
        title: "意大利头层牛皮高端大班椅 机械按摩头枕 压铸铝脚",
        desc: "1.6mm 意大利头层牛皮，天然乳胶坐垫，电池驱动 8 点按摩系统。5 年质保。适合总裁办公室、高端办公场所。",
        priceFrom: "189,00$",
        priceTo: "245,00$",
        unit: "/套",
        moq: "5 套",
        img: { src: photo("chair2"), total: 5 },
        isVideo: true,
        guaranteed: true,
        supplier: {
          name: "恒信家具有限公司",
          audited: true,
          loc: "📍 中国浙江",
        },
      },
      {
        id: "ghe-van-phong-3",
        title: "钢架可叠放会议椅 阻燃绒布包覆",
        desc: "BS5852 阻燃绒布，钢架静电喷涂，PU 模塑坐垫。可叠放 10 把。是会议室、礼堂、活动区域的理想之选。",
        priceFrom: "18,50$",
        priceTo: "26,00$",
        unit: "/套",
        moq: "20 套",
        img: { src: photo("chair3"), total: 3 },
        amazing: true,
        guaranteed: true,
        supplier: {
          name: "永康春天家具公司",
          audited: true,
          loc: "📍 中国浙江",
        },
      },
      {
        id: "ghe-van-phong-4",
        title: "AKF-X3 人体工学办公椅 美国网布 铝合金脚 动态腰托",
        desc: "USA Matrex2 网布，气压自适应腰托，5D 扶手，360 旋转头枕。通过 BIFMA、GREENGUARD GOLD 认证。框架质保 12 年。",
        priceFrom: "98,00$",
        priceTo: "165,00$",
        unit: "/套",
        moq: "10 套",
        img: { src: photo("chair4"), total: 6 },
        isVideo: true,
        amazing: true,
        monthLabel: "4 月",
        guaranteed: true,
        supplier: {
          name: "广州 AKF 家具有限公司",
          audited: true,
          loc: "📍 中国广东",
        },
      },
      {
        id: "ghe-van-phong-5",
        title: "360 旋转职员椅 网布靠背 固定扶手 五星塑料脚",
        desc: "聚酯网布靠背，PU 海绵坐垫，PU 包覆固定扶手，尼龙五星脚，4 级气压杆。适合初创办公室、联合办公空间。",
        priceFrom: "12,80$",
        priceTo: "18,50$",
        unit: "/套",
        moq: "50 套",
        img: { src: photo("chair5"), total: 4 },
        guaranteed: true,
        supplier: {
          name: "西昊家具有限公司",
          audited: true,
          loc: "📍 中国福建",
        },
      },
      {
        id: "ghe-van-phong-6",
        title: "YAFON YF-A88 人体工学办公椅 德国网布 4D 头枕 质保 10 年",
        desc: "德国 Matrex 网布，高强度钢架，4D 扶手可调高度/深度/旋转/倾仰。坐垫柔软厚 12cm。通过 SGS 及 BIFMA-X5 认证。",
        priceFrom: "155,00$",
        priceTo: "299,00$",
        unit: "/套",
        moq: "1 套",
        img: { src: photo("chair6"), total: 8 },
        isVideo: true,
        amazing: true,
        guaranteed: true,
        supplier: {
          name: "广州雅风家具制造有限公司",
          audited: true,
          loc: "📍 中国广东",
        },
      },
      {
        id: "ghe-van-phong-7",
        title: "PU 皮革办公转椅 五星铝合金脚 固定扶手",
        desc: "1.2mm 防刮 PU 皮，10cm 高模塑 PU 海绵坐垫，哑光黑铝合金脚，60mm PU 静音脚轮。适合家用及办公场所。",
        priceFrom: "42,00$",
        priceTo: "65,00$",
        unit: "/套",
        moq: "10 套",
        img: { src: photo("chair7"), total: 5 },
        monthLabel: "4 月",
        guaranteed: true,
        supplier: {
          name: "佛山 Hooker 家具有限公司",
          audited: true,
          loc: "📍 中国广东",
        },
      },
      {
        id: "ghe-van-phong-8",
        title: "A 字脚钢架办公访客椅 米色布雷绒坐垫",
        desc: "法国布雷绒 100% 涤纶，镀铬钢架，8cm 高密度海绵坐垫，承重 150kg。北欧风格，奢华精致。",
        priceFrom: "55,00$",
        priceTo: "82,00$",
        unit: "/套",
        moq: "20 套",
        img: { src: photo("chair8"), total: 4 },
        amazing: true,
        guaranteed: true,
        supplier: {
          name: "东莞 Bewinner 家具有限公司",
          audited: true,
          loc: "📍 中国广东",
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
    { base: 4, unit: "/个" },
    { base: 8, unit: "/套" },
    { base: 12, unit: "/件" },
    { base: 22, unit: "/套" },
    { base: 35, unit: "/个" },
    { base: 58, unit: "/套" },
    { base: 95, unit: "/套" },
    { base: 145, unit: "/套" },
  ];
  const t = tiers[(h + idx) % tiers.length];
  const jitter = (h % 13) / 10; // 0.0 - 1.2
  const lo = t.base + jitter * t.base * 0.15;
  const hi = lo * (1.18 + ((h >> 4) % 17) / 100); // +18%..+34%
  const fmt = (n: number) => n.toFixed(2).replace(".", ",") + "$";
  return { from: fmt(lo), to: fmt(hi), unit: t.unit };
}

const SUPPLIER_TEMPLATES: Array<{ name: string; loc: string; logo: string }> = [
  { name: "广州 Lifeart 装饰有限公司", loc: "📍 中国广东", logo: "LA" },
  { name: "义乌天宇制造股份有限公司", loc: "📍 中国浙江", logo: "TY" },
  { name: "厦门航宇室内外家居有限公司", loc: "📍 中国福建", logo: "HY" },
  { name: "临沂格陵兰制造有限公司", loc: "📍 中国山东", logo: "GL" },
  { name: "保定八月装饰有限公司", loc: "📍 中国河北", logo: "BY" },
  { name: "苏州尚普家居用品股份有限公司", loc: "📍 中国江苏", logo: "SP" },
  { name: "景德镇陶瓷有限公司", loc: "📍 中国江西", logo: "CD" },
  { name: "佛山 Brightway 制造有限公司", loc: "📍 中国广东", logo: "BW" },
  { name: "永康五金有限公司", loc: "📍 中国浙江", logo: "YK" },
  { name: "宁波绿家股份有限公司", loc: "📍 中国浙江", logo: "NB" },
];

const FEATURED_VIDEO_CAPTIONS = [
  "12,000㎡ 生产线——封闭式 QC 流程",
  "为 80 多个国际品牌代工 OEM",
  "起订 1 个样品——DDP 直送越南仓，18 天到货",
  "1,500㎡ 展厅——产品展示齐全",
  "工厂通过 BSCI、ISO 9001、Sedex 认证",
];

function pickSupplier(slug: string, offset = 0) {
  const h = hashSeed(slug + "::sup::" + offset);
  return SUPPLIER_TEMPLATES[(h + offset) % SUPPLIER_TEMPLATES.length];
}

function buildLeafFromSeed(slug: string, seed: LeafSeed): LeafCategoryPage {
  // Filters
  const filters: FilterGroup[] = [];

  filters.push({
    title: "最新选项",
    options: seed.chips.slice(0, 6).map((c) => ({ name: c })),
  });

  filters.push({
    title: "分类",
    options: [],
    nested: [
      { name: seed.parentName, depth: 0 },
      { name: seed.l2Name, depth: 1 },
      { name: seed.title, depth: 2, active: true },
    ],
  });

  if (seed.styles && seed.styles.length) {
    filters.push({
      title: "风格",
      options: seed.styles.map((s) => ({ name: s, count: synthCount(slug, "style:" + s) })),
      showMore: seed.styles.length > 5,
    });
  }

  if (seed.materials && seed.materials.length) {
    filters.push({
      title: "材质",
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
    title: "产地",
    options: [
      { name: "广东", count: synthCount(slug, "origin:gd") },
      { name: "浙江", count: synthCount(slug, "origin:zj") },
      { name: "福建", count: synthCount(slug, "origin:fj") },
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
      videoSrc: photo(seed.parentSlug + "-sc-fvideo"),
      miniProducts: fs.products.map((p, i) => ({
        title: p.title,
        price: p.price,
        unit: i % 2 === 0 ? "/套" : "/个",
        img: photo(seed.parentSlug + "-sc-fmini-" + i),
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
      videoSrc: photo(seed.parentSlug + "-sc-fvideo"),
      miniProducts: seed.productNames.slice(0, 5).map((title, i) => {
        const p = priceTier(slug, i + 100);
        return {
          title: title.length > 60 ? title.slice(0, 57) + "…" : title,
          price: `${p.from}-${p.to}`,
          unit: p.unit,
          img: photo(seed.parentSlug + "-sc-fmini-" + i),
        };
      }),
    };
  }

  // Products
  const moqPool = ["1 套", "1 个", "5 套", "10 套", "20 个", "50 个", "100 个", "200 个"];
  const monthLabels = ["4 月", "5 月", "新品"];
  const products: ListingProduct[] = seed.productNames.slice(0, 8).map((name, i) => {
    const sup = pickSupplier(slug, i + 1);
    const p = priceTier(slug, i);
    const h = hashSeed(slug + "::p::" + i);
    const desc = buildProductDesc(name, seed, i);
    return {
      id: `demo-${seed.parentSlug}-1`,
      title: name,
      desc,
      priceFrom: p.from,
      priceTo: p.to,
      unit: p.unit,
      moq: moqPool[(h + i) % moqPool.length],
      img: { src: photo(seed.parentSlug + "-sc-prod-" + i), total: 3 + ((h >> 3) % 6) },
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
            q: `${seed.title} 的起订量是多少？`,
            a: `${seed.title} 的常见起订量为 1–50 件，视型号及定制程度而定。100 件以上的订单通常可在挂牌价基础上享受 8–15% 的折扣。大批量下单前，工厂可提供 1 件样品供品质检验——样品费将在正式订单中抵扣。`,
          },
          {
            q: `${seed.title} 可以做 OEM/ODM 吗？`,
            a: `本分类下的大多数工厂支持 OEM（印 Logo、换色、换包装），起订 200 件；ODM（独立设计）起订 500 件。从打样确认起，平均生产周期 25–40 天。如需材料、结构、尺寸方面的咨询，华越可提供技术支持，协同工厂对接。`,
          },
          {
            q: `${seed.title} 如何运回越南？`,
            a: `${seed.title} 订单通常由广州、宁波、厦门港口经海运 LCL/FCL 运至海防/胡志明市。华越为本分类 99% 的产品提供 DDP 服务——含税、含清关、送货到仓。门到门时效 14–21 天，视启运港及时段而定。`,
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
  const minOrder = ["起订量 50 个", "起订量 100 个", "起订量 200 个", "起订量 1 套（样品）", "起订量 20 套"];
  const ports = ["FOB 广州", "FOB 宁波", "FOB 厦门", "FOB 青岛"];
  const mat = seed.materials?.[idx % (seed.materials.length || 1)];
  const style = seed.styles?.[idx % (seed.styles.length || 1)];
  const c = certs[idx % certs.length];
  const m = minOrder[idx % minOrder.length];
  const port = ports[idx % ports.length];
  const matPart = mat ? `${mat}，` : "";
  const stylePart = style ? `${style}风格，` : "";
  return `${matPart}${stylePart}通过 ${c} 认证。${m}。200 件以上订单支持 OEM 印 Logo、换色、换包装。${port} 交货，DDP 直送海防/胡志明市，16–22 天到货。`;
}

// ---------------------------------------------------------------------------
// Helper builders for repeated facet groups
// ---------------------------------------------------------------------------

const SIZE_FILTER = {
  title: "尺寸",
  options: ["小（<30cm）", "中（30–60cm）", "大（60–100cm）", "特大（>100cm）"],
};

const APP_INDOOR_OUTDOOR = {
  title: "应用场景",
  options: ["室内", "室外", "酒店", "度假村", "花园", "办公大堂"],
};

// ---------------------------------------------------------------------------
// HOME_GARDEN_LEAVES — seed map for every subcat + inline item under home-garden
// ---------------------------------------------------------------------------

const PARENT = "home-garden";
const PARENT_NAME = "家居与园艺";

export const HOME_GARDEN_LEAVES: Record<string, LeafSeed> = {
  // ===========================================================================
  // Section 1 — 室内装饰 (decoration-indoor)
  // ===========================================================================
  "tuong-vat-pham-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "室内装饰",
    title: "雕像与装饰摆件",
    resultsCount: "62.418",
    chips: [
      "树脂雕像",
      "复合材料雕像",
      "风水雕像",
      "玉佛雕像",
      "动物装饰雕像",
      "桌面摆件套装",
    ],
    trendingChips: [
      "碧玉佛像",
      "招财鲤鱼雕像",
      "铜马雕像",
      "驯鹿头雕像",
      "抽象树脂雕像",
      "金鹿雕像",
      "复合材料天使雕像",
      "三只招财猫摆件套装",
    ],
    productNames: [
      "碧玉阿弥陀佛像 30cm 手工雕刻，紫檀木底座",
      "风水铜马摆件三件套 1:18 比例，24K 镀金",
      "树脂驯鹿头壁挂雕像 45cm，金属金喷涂",
      "鲤鱼跃龙门复合材料雕像 60cm，人造石饰面",
      "现代抽象人脸白色树脂雕像 35cm 玄关桌面摆件",
      "招财猫 Maneki-Neko 摆件三件套 金箔色 18cm",
      "北欧金鹿金属雕像 50cm，大理石底座",
      "复合材料天使花园雕像 80cm，复古做旧喷涂",
    ],
    styles: ["现代", "新古典", "中式", "北欧", "欧式古典", "佛教"],
    materials: ["树脂", "复合材料", "铸铜", "玻璃纤维", "人造石", "陶瓷"],
    extraFilters: [SIZE_FILTER, APP_INDOOR_OUTDOOR],
  },

  "hoa-gia-cay-gia": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "室内装饰",
    title: "仿真花与仿真植物",
    resultsCount: "118.245",
    chips: [
      "仿真橄榄树",
      "丝绸玫瑰",
      "仿真金钱树",
      "仿真蝴蝶兰",
      "仿真盆景",
      "干蒲苇草",
    ],
    trendingChips: [
      "1.8m 仿真橄榄树",
      "5 枝蝴蝶兰",
      "丝绸玫瑰满天星",
      "1.2m 绿叶金钱树",
      "仿真琴叶榕",
      "长枝仿真樱花",
      "1.5m 仿真绿萝",
      "办公桌迷你盆景",
    ],
    productNames: [
      "仿真橄榄树 高 180cm，1,200 片真实触感乳胶叶，水泥花盆",
      "仿真丝绸蝴蝶兰 Phalaenopsis 5 枝，真实触感硅胶",
      "仿真琴叶榕 高 160cm，3D 打印 EVA 叶片，真实木桩",
      "Garden Rose 丝绸玫瑰礼盒 50 枝满天星填充棉",
      "仿真金钱树 6 枝 高 120cm，真实触感叶片，抗紫外线",
      "迷你榕树盆景 30cm 桌面摆件，景德镇裂纹釉陶盆",
      "仿真樱花枝 Sakura 长 1.5m，用于婚礼/活动",
      "天然干蒲苇草束 10 枝 长 110cm，染米色",
    ],
    styles: ["自然", "北欧", "新古典", "现代", "婚礼"],
    materials: ["涤纶丝绸", "乳胶（真实触感）", "3D 打印 EVA", "PE 塑料", "天然干草"],
    extraFilters: [
      SIZE_FILTER,
      { title: "使用场合", options: ["家居装饰", "婚礼", "活动", "酒店", "展厅"] },
    ],
  },

  "hoa-lua": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "室内装饰",
    title: "丝绸花",
    resultsCount: "48.912",
    chips: ["丝绸玫瑰", "丝绸牡丹", "绣球花", "向日葵", "满天星", "丝绸菊花"],
    trendingChips: [
      "Garden Rose 丝绸玫瑰",
      "长枝仿真牡丹",
      "丝绸绣球花",
      "婚礼向日葵",
      "丝绸新娘手捧花",
      "填充棉满天星",
      "丝绸干薰衣草",
      "丝绸大丽菊",
    ],
    productNames: [
      "Garden Rose 丝绸玫瑰 65 朵真实触感，礼盒装",
      "法式丝绸牡丹簇 酒红色 5 朵，金属弯枝",
      "丝绸绣球花 Hydrangea，花头 18cm，适合大瓶插花",
      "丝绸向日葵 长枝 70cm，棉花芯填充",
      "高级填充棉丝绸满天星，每束 50 枝",
      "丝绸干薰衣草 浅紫色，每束 80 枝 35cm",
      "丝绸大丽菊 多色，花头 12cm，长枝 60cm",
      "丝绸新娘手捧花 粉色 + 鼠尾草绿，缎带",
    ],
    styles: ["婚礼", "古典", "北欧", "自然", "复古"],
    materials: ["涤纶丝绸", "乳胶（真实触感）", "棉花填充", "涤纶+EVA"],
    extraFilters: [
      { title: "花头数量", options: ["1 朵", "3-5 朵", "5-10 朵", "10-30 朵", "30 朵以上"] },
      { title: "场合", options: ["婚礼", "家居装饰", "活动", "礼品", "酒店"] },
    ],
  },

  "cay-o-liu": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "室内装饰",
    title: "仿真橄榄树",
    resultsCount: "12.408",
    chips: ["1m 橄榄树", "1.8m 橄榄树", "2.5m 橄榄树", "球形橄榄树", "真实触感", "盆栽橄榄树"],
    trendingChips: [
      "1.8m 仿真橄榄树 水泥盆",
      "2.5m 酒店大堂橄榄树",
      "60cm 桌面迷你橄榄树",
      "圆形造型橄榄树",
      "真实触感乳胶橄榄叶",
      "真实木桩橄榄树",
      "北欧托斯卡纳橄榄树",
      "大堂橄榄树双株组合",
    ],
    productNames: [
      "托斯卡纳仿真橄榄树 高 180cm，1,200 片真实触感叶，真实木桩",
      "迷你橄榄树 高 60cm 桌面摆件，裂纹釉陶盆 18cm",
      "橄榄树 高 250cm 酒店大堂，2,500 片抗紫外线 EVA 叶",
      "圆形造型橄榄树双株 高 130cm，白色陶瓷底座",
      "仿真橄榄树 高 150cm 麻绳缠绕树干，800 片叶",
      "橄榄树 高 100cm 方形水泥盆 22cm，极简装饰",
      "四杆仿真橄榄树 高 200cm，95% 仿真效果",
      "壁挂仿真橄榄树 80cm，弯曲钢丝框架",
    ],
    styles: ["托斯卡纳", "北欧", "极简", "现代", "地中海"],
    materials: ["抗紫外线 EVA 叶", "真实触感乳胶叶", "真实木桩", "PE 塑料树干"],
    extraFilters: [
      { title: "高度", options: ["<60cm", "60-100cm", "100-150cm", "150-200cm", ">200cm"] },
    ],
  },

  "cay-kim-tien-gia": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "室内装饰",
    title: "仿真金钱树",
    resultsCount: "9.245",
    chips: ["1.2m 金钱树", "迷你金钱树", "真实触感", "深绿叶", "水泥盆", "ZZ plant"],
    trendingChips: [
      "1.2m 仿真金钱树",
      "桌面迷你金钱树",
      "真实触感金钱树叶",
      "水泥盆金钱树",
      "仿真 ZZ plant",
      "6 枝金钱树",
      "1.5m 大堂金钱树",
      "办公室金钱树",
    ],
    productNames: [
      "仿真金钱树 6 枝 高 120cm，真实触感叶片，抗紫外线",
      "迷你金钱树 35cm 桌面摆件，白色圆形陶盆 12cm",
      "金钱树 高 150cm 8 枝，220 片深绿亮叶",
      "金钱树 高 90cm 方形水泥盆 18cm",
      "办公室仿真金钱树双株组合 + 304 不锈钢盆",
      "仿真 ZZ plant 高 70cm，阻燃 EVA 叶",
      "黑叶变种 Raven 金钱树 1.2m 热门款",
      "吊顶仿真金钱树 长 60cm，不锈钢吊钩",
    ],
    styles: ["现代", "极简", "北欧", "办公"],
    materials: ["真实触感乳胶叶", "抗紫外线 EVA 叶", "PE 亮面塑料叶"],
    extraFilters: [
      { title: "高度", options: ["<50cm", "50-100cm", "100-150cm", ">150cm"] },
    ],
  },

  "hoa-lan-gia": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "室内装饰",
    title: "仿真兰花",
    resultsCount: "21.084",
    chips: ["蝴蝶兰", "文心兰", "石斛兰", "兜兰", "真实触感", "已栽盆"],
    trendingChips: [
      "5 枝仿真蝴蝶兰",
      "真实触感蝴蝶兰",
      "仿真石斛兰",
      "白色栽盆兰花",
      "紫色蝴蝶兰",
      "黄色文心兰",
      "办公桌迷你蝴蝶兰",
      "酒店前台蝴蝶兰",
    ],
    productNames: [
      "仿真蝴蝶兰 5 枝 Phalaenopsis 白色，真实触感硅胶",
      "紫色蝴蝶兰栽盆 9 枝，景德镇青釉瓷盆",
      "黄色文心兰 长枝 65cm，小花 3cm，适合花束",
      "仿真石斛兰 多色，长枝 50cm，适合瓶插",
      "仿真兜兰 单轴型 4 枝，附天然干苔藓",
      "真实触感迷你蝴蝶兰三盆组合 前台桌面摆件",
      "特别款翡翠绿蝴蝶兰，5 枝 70cm 栽瓷盆",
      "整枝白兰花 90cm 用于酒店大堂大瓶插花",
    ],
    styles: ["古典", "现代", "酒店", "婚礼"],
    materials: ["真实触感硅胶", "涤纶丝绸", "乳胶"],
    extraFilters: [
      { title: "枝数", options: ["3 枝", "5 枝", "7 枝", "9 枝", "9 枝以上"] },
      { title: "是否栽盆", options: ["已栽盆", "散枝"] },
    ],
  },

  "binh-hoa-lo-hoa": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "室内装饰",
    title: "花瓶与花器",
    resultsCount: "54.620",
    chips: ["陶瓷花瓶", "玻璃花瓶", "金属花瓶", "树脂花瓶", "藤竹花瓶", "装饰花瓶套装"],
    trendingChips: [
      "景德镇陶瓷花瓶",
      "手工玻璃花瓶",
      "黄铜金属花瓶",
      "抽象树脂花瓶",
      "50cm 高花瓶",
      "桌面迷你花瓶",
      "气泡玻璃花瓶",
      "北欧装饰花瓶三件套",
    ],
    productNames: [
      "景德镇裂纹釉古典陶瓷花瓶 高 45cm，手工彩绘",
      "手工硼硅玻璃花瓶 梨形 30cm",
      "红铜金属花瓶 高 55cm，复古铜绿做旧效果",
      "白色抽象树脂花瓶 人脸造型 35cm",
      "手工藤竹编花瓶 40cm，圆口适合插干花",
      "北欧陶瓷花瓶三件套 多尺寸 哑光米白釉",
      "气泡艺术玻璃花瓶 多色 28cm",
      "复古陶瓷花瓶 钴蓝浮雕纹 50cm",
    ],
    styles: ["中式古典", "北欧", "现代", "复古", "工业", "装饰艺术"],
    materials: ["陶瓷", "手工玻璃", "黄铜", "树脂", "藤竹"],
    extraFilters: [SIZE_FILTER],
  },

  "tuong-cay-nhan-tao": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "室内装饰",
    title: "仿真植物墙",
    resultsCount: "32.105",
    chips: ["60×60 模块", "50×50 模块", "混合绿植", "带花", "抗紫外线", "B1 阻燃"],
    trendingChips: [
      "60×60 仿真植物墙模块",
      "带兰花植物墙",
      "户外抗紫外线植物墙",
      "B1 阻燃植物墙",
      "前台大堂植物墙",
      "会议室植物墙",
      "咖啡馆植物墙",
      "餐厅植物墙",
    ],
    productNames: [
      "仿真植物墙模块 60×60cm 户外抗紫外线，高密度",
      "植物墙模块 50×50cm 带兰花 + 绣球花",
      "B1 阻燃仿真植物墙 用于大堂",
      "热带棕榈植物墙模块 1×1m 丛林效果",
      "带装饰苔藓植物墙——尤加利混搭",
      "植物墙模块 厚 12cm，哑光黑金属边框",
      "小型仿真植物墙 40×60cm 床头、沙发装饰",
      "3D 防潮植物墙模块，用于阳台",
    ],
    styles: ["热带", "北欧", "自然", "现代热带丛林"],
    materials: ["PE 塑料叶", "抗紫外线 EVA 叶", "铝框", "PP 塑料框"],
    extraFilters: [
      { title: "阻燃性能", options: ["B1 阻燃", "标准（不阻燃）"] },
      { title: "抗紫外线性能", options: ["抗紫外线（户外）", "仅室内"] },
    ],
  },

  "vach-ngan-gap": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "室内装饰",
    title: "折叠屏风",
    resultsCount: "8.940",
    chips: ["3 扇", "4 扇", "6 扇", "木屏风", "包布屏风", "镂空装饰屏风"],
    trendingChips: [
      "4 扇雕花木屏风",
      "丝绒包布屏风",
      "3 扇金属框屏风",
      "中式纹样屏风",
      "浴室屏风",
      "6 扇大堂屏风",
      "公寓镂空装饰屏风",
      "竹编木屏风",
    ],
    productNames: [
      "4 扇 MDF 木雕中式纹样屏风，高 180cm",
      "丝绒包布屏风 3 扇 橡木框，高 170cm",
      "4 扇哑光黑金属框 + 藤编网屏风",
      "6 扇酒店大堂屏风，手绘山水景",
      "3 扇天然竹木屏风，每扇宽 45cm",
      "4 扇蜂窝纸折叠屏风 高 160cm",
      "5 扇镜面折叠屏风，客厅装饰",
      "4 扇铝框喷砂磨砂玻璃折叠屏风",
    ],
    styles: ["中式", "现代", "北欧", "工业", "复古"],
    materials: ["MDF 木板", "橡木", "金属", "铝", "天然竹", "丝绒"],
    extraFilters: [
      { title: "扇数", options: ["3 扇", "4 扇", "5 扇", "6 扇"] },
    ],
  },

  "khung-tranh-nghe-thuat": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "室内装饰",
    title: "艺术画框",
    resultsCount: "76.520",
    chips: ["复合材料画框", "木画框", "铝画框", "帆布画", "海报画", "3-5 联画"],
    trendingChips: [
      "抽象帆布画框",
      "北欧三联画",
      "橡木画框",
      "复古海报画",
      "镀金复合材料画框",
      "120x80 大幅帆布画",
      "客厅五联画",
      "桌面相框",
    ],
    productNames: [
      "抽象帆布画框 80×120cm，镀金复合材料边框",
      "北欧三联画 30×40cm，天然橡木边框",
      "复古海报画框 A2，哑光黑铝边框",
      "客厅五联画 50×70cm，巴洛克花卉",
      "复合材料古典花纹画框 60×90cm 镀金",
      "桌面相框 10×15cm 天然胡桃木，4 件套",
      "装饰艺术风薄帆布画 100×150cm 金色边框",
      "海军蓝色调抽象帆布画四联 40×60cm",
    ],
    styles: ["北欧", "新古典", "现代", "工业", "装饰艺术", "复古"],
    materials: ["复合材料", "橡木", "胡桃木", "铝", "PS 古典雕花"],
    extraFilters: [
      { title: "尺寸", options: ["A4-A3", "30×40-50×70", "60×90", "80×120", "100cm 以上"] },
    ],
  },

  "do-trang-tri-gom-su": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "室内装饰",
    title: "陶瓷装饰品",
    resultsCount: "29.310",
    chips: ["景德镇", "裂纹釉", "青釉", "手绘", "装饰套装", "桌面迷你款"],
    trendingChips: [
      "景德镇裂纹釉陶瓶",
      "手绘陶瓷茶具套装",
      "陶瓷观音雕像",
      "壁挂装饰陶盘",
      "青釉陶瓷花瓶",
      "哑光装饰花瓶三件套",
      "陶瓷猫雕像套装",
      "钴蓝釉陶瓷储物盒",
    ],
    productNames: [
      "景德镇裂纹釉陶瓷花瓶 高 45cm，手绘春景",
      "手绘钴蓝陶瓷茶具套装，1 壶 + 6 杯",
      "青釉陶瓷观音菩萨像 高 30cm",
      "壁挂装饰陶盘 直径 35cm 裂纹釉",
      "哑光米白装饰花瓶三件套 高 18-25-32cm",
      "手工白色陶瓷猫雕像两件套 15cm",
      "青花钴蓝陶瓷储物盒，盖面浮雕龙纹",
      "景德镇钴蓝釉陶瓷鲤鱼风水雕像 高 25cm",
    ],
    styles: ["中式古典", "北欧", "复古", "极简", "新古典"],
    materials: ["景德镇瓷", "裂纹釉陶", "哑光瓷", "青釉瓷"],
    extraFilters: [SIZE_FILTER],
  },

  // ===========================================================================
  // Section 2 — 花园装饰 (garden-decor)
  // ===========================================================================
  "tuong-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花园装饰",
    title: "花园雕像",
    resultsCount: "27.840",
    chips: ["石狮", "佛像", "动物雕像", "天使雕像", "抽象雕像", "鲤鱼雕像"],
    trendingChips: [
      "整石石狮",
      "户外佛像",
      "复合材料天使雕像",
      "招财鲤鱼雕像",
      "金鹿金属雕像",
      "花园抽象雕像",
      "花岗岩麒麟雕像",
      "门口瑞兽雕像套装",
    ],
    productNames: [
      "整石花岗岩石狮 高 1.2m，别墅门口成对",
      "户外复合材料阿弥陀佛像 高 1.8m，金属喷涂",
      "复合材料天使雕像 80cm 户外抗紫外线，石质底座",
      "招财鲤鱼人造石雕像 高 1m，镀金鱼鳞",
      "花园金鹿金属雕像 高 1.4m，黄铜饰面",
      "花岗岩麒麟雕像两件套 高 80cm，雕花底座",
      "户外玻璃纤维增强抽象树脂雕像 1.5m",
      "壁挂人造石狮头门饰，古典镀金",
    ],
    styles: ["中式古典", "欧式古典", "佛教", "现代"],
    materials: ["花岗岩", "人造石", "GFRC 复合材料", "铸铜", "红铜"],
    extraFilters: [SIZE_FILTER],
  },

  "su-tu-da": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花园装饰",
    title: "石狮",
    resultsCount: "9.680",
    chips: ["花岗岩", "大理石", "人造石", "高 1m", "高 1.5m", "门口成对石狮"],
    trendingChips: [
      "整石花岗岩石狮",
      "别墅门口成对石狮",
      "中式古典石狮",
      "G654 花岗岩石狮",
      "银箔石狮",
      "壁挂石狮头",
      "1m 高中式石狮",
      "风水石狮",
    ],
    productNames: [
      "整石 G654 花岗岩石狮一对 高 1.2m，手工雕刻",
      "红色大理石石狮 高 1.5m，云纹雕花底座",
      "人造石石狮一对 高 80cm，天然石色饰面",
      "G603 花岗岩石狮 高 1m，传统坐姿",
      "壁挂花岗岩石狮头门饰 直径 40cm，不锈钢挂钩",
      "G682 黄色石狮 高 1.8m，龙凤纹雕花底座",
      "人造石迷你石狮一对 高 50cm，置于台阶",
      "整石花岗岩石狮 高 2.2m，国际工程项目",
    ],
    styles: ["中式古典", "宫廷", "古典"],
    materials: ["G654 花岗岩", "G603 花岗岩", "红色大理石", "人造石"],
    extraFilters: [
      { title: "高度", options: ["50-80cm", "80-120cm", "120-180cm", "180cm 以上"] },
    ],
  },

  "tuong-phat-ngoai-troi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花园装饰",
    title: "户外佛像",
    resultsCount: "11.230",
    chips: ["阿弥陀佛", "观音菩萨", "释迦牟尼佛", "高 1m", "高 1.8m", "高 3m"],
    trendingChips: [
      "户外复合材料阿弥陀佛像",
      "GFRC 观音像 高 2m",
      "释迦牟尼禅坐像",
      "花岗岩佛像",
      "户外镀金佛像",
      "寺庙佛像 高 3m",
      "花园迷你佛像",
      "度假村佛像",
    ],
    productNames: [
      "户外 GFRC 复合材料阿弥陀佛像 高 1.8m，花岗岩饰面",
      "观音菩萨立像 高 2.5m，玻璃纤维增强复合材料",
      "整石花岗岩释迦牟尼禅坐像 高 1.2m",
      "镀金佛像 高 1.5m，复合材料芯 PVD 镀金",
      "人造石坐佛像 高 80cm 用于小花园",
      "度假村佛像 高 3m，仿古铜饰面",
      "花园长凳迷你佛像 高 60cm 复合材料抗紫外线",
      "白色大理石佛像 高 1.6m，手工雕刻",
    ],
    styles: ["佛教", "东方", "古典"],
    materials: ["GFRC 复合材料", "花岗岩", "人造石", "铸铜"],
    extraFilters: [
      { title: "高度", options: ["<1m", "1-2m", "2-3m", "3m 以上"] },
    ],
  },

  "tuong-dong-vat": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花园装饰",
    title: "动物雕像",
    resultsCount: "14.560",
    chips: ["鹿雕像", "鲤鱼雕像", "马雕像", "象雕像", "鸟雕像", "麒麟雕像"],
    trendingChips: [
      "户外金鹿雕像",
      "招财鲤鱼雕像",
      "风水铜马雕像",
      "花岗岩象雕像",
      "金属仙鹤雕像",
      "门口麒麟雕像",
      "花园绵羊雕像",
      "石雕雄鹰雕像",
    ],
    productNames: [
      "户外金鹿雕像 高 1.4m，古铜色金属饰面",
      "招财鲤鱼人造石雕像 高 1m 镀金鱼鳞",
      "风水铜马摆件三件套 1:8 比例 24K 镀金",
      "整石花岗岩象雕像 高 80cm，门口成对",
      "花园金属仙鹤雕像套装 高 1.5m，铜金色调",
      "花岗岩麒麟雕像一对 高 1m，古典雕花底座",
      "户外白色 GFRC 复合材料绵羊雕像 高 70cm",
      "人造石雄鹰雕像 高 1.2m，展翅 1.5m",
    ],
    styles: ["中式古典", "北欧", "现代", "古典青铜"],
    materials: ["GFRC 复合材料", "铸铜", "人造石", "花岗岩", "黄铜喷涂金属"],
    extraFilters: [SIZE_FILTER],
  },

  "dai-phun-nuoc": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花园装饰",
    title: "喷泉",
    resultsCount: "6.420",
    chips: ["3 层", "5 层", "圆形", "方形", "带 LED 灯", "GFRC 复合材料"],
    trendingChips: [
      "3 层圆形喷泉",
      "带 LED 喷泉",
      "户外 GFRC 喷泉",
      "5 层古典喷泉",
      "别墅喷泉",
      "花园迷你喷泉",
      "花岗岩喷泉",
      "带雕像喷泉",
    ],
    productNames: [
      "3 层圆形 GFRC 复合材料喷泉 直径 1.8m，带 LED",
      "5 层古典喷泉 高 2.4m，人造石饰面",
      "花园迷你喷泉 高 70cm，配 35W 节能潜水泵",
      "天然花岗岩喷泉 直径 2m，手工雕花",
      "带希腊女神雕像 GFRC 喷泉 高 1.8m",
      "方形现代喷泉 1.5×1.5m，配变色 LED",
      "鲤鱼跃龙门喷泉 高 1.6m，配循环系统",
      "石钵喷泉 直径 80cm，用于阳台",
    ],
    styles: ["欧式古典", "中式古典", "现代", "地中海"],
    materials: ["GFRC 复合材料", "花岗岩", "人造石", "复合材料 + LED"],
    extraFilters: [
      { title: "层数", options: ["1 层", "2 层", "3 层", "5 层"] },
      { title: "LED 灯", options: ["变色 LED", "白光 LED", "无 LED"] },
    ],
  },

  "den-vuon-led": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花园装饰",
    title: "LED 花园灯",
    resultsCount: "42.310",
    chips: ["柱灯", "草坪插地灯", "投光灯", "灯串", "IP65", "IP66"],
    trendingChips: [
      "2m 高花园柱灯",
      "304 不锈钢草坪插地灯",
      "50W LED 投光灯 IP66",
      "变色 LED 花园灯",
      "10m LED 灯串",
      "一体式太阳能花园灯",
      "鹿造型 LED 灯",
      "太阳能吊挂灯笼",
    ],
    productNames: [
      "12W LED 花园柱灯 高 2m，哑光黑静电喷涂铝壳",
      "304 不锈钢草坪插地灯 5W LED IP65，3000K 暖黄光",
      "50W LED 投光灯 IP66 压铸铝壳，用于照射别墅外立面",
      "户外 LED 灯串 10m IP65，100 颗暖白灯珠",
      "RGB 变色 LED 花园灯 8W，蓝牙 App 控制",
      "圣诞鹿造型 LED 灯 高 1.2m，户外 IP44",
      "太阳能 LED 吊挂灯笼，哑光黑金属壳，4 个/套",
      "蘑菇造型花园柱灯 高 80cm，铜饰面铝壳",
    ],
    styles: ["现代", "欧式古典", "极简", "工业"],
    materials: ["压铸铝壳", "304 不锈钢", "抗紫外线 PC 塑料壳"],
    extraFilters: [
      { title: "IP 防护等级", options: ["IP44", "IP65", "IP66", "IP67"] },
      { title: "功率", options: ["3-5W", "5-10W", "10-20W", "20-50W", "50W 以上"] },
      { title: "电源", options: ["AC 220V", "太阳能", "充电电池", "DC 12V"] },
    ],
  },

  "co-banner-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花园装饰",
    title: "装饰旗帜与横幅",
    resultsCount: "5.910",
    chips: ["花园旗", "活动横幅", "节日旗", "涤纶", "数码印刷", "旗杆"],
    trendingChips: [
      "涤纶花园装饰旗",
      "手绘活动横幅",
      "涤纶圣诞旗",
      "四季花园旗",
      "双面印刷横幅",
      "花园鱼尾旗",
      "12 月份花园旗套装",
      "螺旋花园旗杆",
    ],
    productNames: [
      "涤纶花园装饰旗 30×45cm 双面印刷，四季主题",
      "双面活动横幅 50×80cm 600D 牛津布",
      "12 个月份花园旗套装 抗紫外线涤纶，配螺旋旗杆",
      "涤纶圣诞旗 35×50cm，热升华耐久印刷，不锈钢挂钩",
      "户外数码印刷 PVC 横幅 1×3m 防水",
      "花园锦鲤鱼尾旗 长 1.2m 防水伞布",
      "螺旋花园旗杆 高 1m 静电喷涂金属",
      "涤纶万圣节旗 30×45 3D 南瓜印花 6 件套",
    ],
    styles: ["节日", "四季", "复古", "现代"],
    materials: ["110D 涤纶", "600D 牛津布", "数码印刷 PVC", "伞布"],
    extraFilters: [
      { title: "场合", options: ["圣诞", "万圣节", "元旦", "四季", "活动"] },
    ],
  },

  "qua-cau-thuy-tinh-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花园装饰",
    title: "装饰玻璃球",
    resultsCount: "4.380",
    chips: ["反光", "镀银", "多彩", "20cm", "30cm", "50cm"],
    trendingChips: [
      "镀银玻璃球",
      "花园反光球",
      "多彩玻璃球",
      "30cm 装饰球",
      "水面漂浮球",
      "花园装饰球三件套",
      "复古纹样球",
      "激光雕刻球",
    ],
    productNames: [
      "反光玻璃球 30cm，户外镜面镀银",
      "多彩镀膜玻璃球三件套 15-20-25cm，花园装饰",
      "蓝色调水面漂浮玻璃球 直径 20cm",
      "彩虹镀膜反光球 35cm，门口装饰",
      "曼陀罗纹激光雕刻球 直径 25cm",
      "古典古铜镀金球 30cm，黑色金属底座",
      "手工吹制艺术玻璃球 28cm",
      "镀铬厚玻璃球 50cm，用于大型花园",
    ],
    styles: ["现代", "复古", "波西米亚", "古典"],
    materials: ["镀膜厚玻璃", "手工吹制玻璃", "镀膜亚克力"],
    extraFilters: [
      { title: "直径", options: ["<20cm", "20-30cm", "30-40cm", "40cm 以上"] },
    ],
  },

  "phu-dieu-tuong-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花园装饰",
    title: "花园墙浮雕",
    resultsCount: "3.760",
    chips: ["PU 浮雕", "复合材料浮雕", "石浮雕", "古典纹样", "现代", "3D"],
    trendingChips: [
      "PU 塑料花园墙浮雕",
      "复合材料花纹浮雕",
      "人造石浮雕",
      "龙凤雕花浮雕",
      "古典玫瑰浮雕",
      "3D 抽象浮雕",
      "门口狮面浮雕",
      "巴洛克天使浮雕",
    ],
    productNames: [
      "PU 巴洛克玫瑰花园墙浮雕 60×90cm，做旧喷涂",
      "复合材料龙凤雕花浮雕 1×2m，花岗岩饰面",
      "人造石狮面浮雕 直径 40cm",
      "PU 巴洛克天使浮雕 高 80cm，古典镀金",
      "3D 抽象复合材料浮雕 1×1.5m，金属喷涂",
      "中式花纹浮雕 60×120cm，青铜饰面",
      "PU 希腊女神面浮雕 50cm，别墅门口壁挂",
      "PU 绣球花浮雕 80×60cm，复古色调喷涂",
    ],
    styles: ["巴洛克", "中式古典", "欧式古典", "现代"],
    materials: ["PU 塑料", "GFRC 复合材料", "人造石", "人造石材"],
    extraFilters: [SIZE_FILTER],
  },

  "do-trang-tri-san-golf": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花园装饰",
    title: "高尔夫球场装饰品",
    resultsCount: "2.140",
    chips: ["果岭旗", "发球台石碑", "高尔夫长凳", "指示牌", "装饰雕像", "草坪插地灯"],
    trendingChips: [
      "涤纶果岭旗",
      "花岗岩发球台石碑",
      "防水木质高尔夫长凳",
      "不锈钢高尔夫球场指示牌",
      "高尔夫球场装饰雕像",
      "高尔夫不锈钢草坪插地灯",
      "码数标志柱",
      "铝制果岭旗杆",
    ],
    productNames: [
      "双面印 Logo 涤纶果岭旗，配 1.8m 铝杆",
      "花岗岩发球台雕刻石碑 30×60cm，抛光饰面",
      "防水柚木高尔夫长凳 长 1.6m，附球洞号牌",
      "304 不锈钢高尔夫球场指示牌 40×40cm 激光雕刻",
      "铝制码数标志柱 高 1.2m，白色静电喷涂",
      "复合材料高尔夫球手造型装饰雕像 高 60cm",
      "304 不锈钢草坪插地灯 LED 3W IP65，用于高尔夫晚会",
      "铝制果岭旗杆套装 1.8m，不锈钢底座 + 定制 Logo 旗",
    ],
    styles: ["古典", "现代", "高端"],
    materials: ["304 不锈钢", "花岗岩", "柚木", "静电喷涂铝"],
    extraFilters: [
      { title: "产品类型", options: ["旗帜与旗杆", "石碑与标志", "长凳与家具", "灯具"] },
    ],
  },

  // ===========================================================================
  // Section 3 — 花盆与花箱 (planters)
  // ===========================================================================
  "chau-nhua-pe": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花盆与花箱",
    title: "PE 塑料花盆",
    resultsCount: "63.250",
    chips: ["圆形 PE 盆", "方形 PE 盆", "长方形 PE 盆", "吊盆", "仿藤盆", "带排水孔"],
    trendingChips: [
      "长方形阳台 PE 塑料花盆",
      "60cm 高圆形 PE 盆",
      "50×50cm 方形 PE 盆",
      "仿藤 PE 盆",
      "PE 吊盆",
      "自浇水 PE 盆",
      "哑光灰 PE 盆",
      "80cm 黑色 PE 盆",
    ],
    productNames: [
      "长方形 PE 塑料阳台花盆 60×20×18cm，带排水孔",
      "圆形 PE 盆 高 60cm 直径 50cm，哑光灰饰面",
      "方形 PE 盆 50×50×50cm 大堂植物用，真实木底",
      "仿藤圆形 PE 盆三件套 25-30-35cm，阳台装饰",
      "阳台自浇水 PE 吊盆 30cm，配黑色金属吊钩",
      "哑光黑 PE 盆 尺寸 80×30×30cm 景观用",
      "迷你圆形 PE 盆六件套 12cm 米白色 桌面摆件",
      "抗紫外线 PE 盆 100×40cm，黑色内衬，柱形",
    ],
    styles: ["现代", "极简", "地中海", "北欧"],
    materials: ["滚塑 PE 塑料", "抗紫外线 PE 塑料", "仿藤 PE"],
    extraFilters: [
      SIZE_FILTER,
      { title: "形状", options: ["圆形", "方形", "长方形", "高柱形", "吊挂"] },
    ],
  },

  "chau-composite-soi-thuy-tinh": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花盆与花箱",
    title: "复合材料与玻璃纤维花盆",
    resultsCount: "28.940",
    chips: ["GFRC", "Fiberclay", "Fiberglass", "高柱形", "大圆形", "80cm 方形"],
    trendingChips: [
      "GFRC 复合材料高柱花盆",
      "Fiberclay 圆形花盆",
      "80cm 高 Fiberglass 花盆",
      "大堂玻璃纤维花盆",
      "100cm 高景观柱形花盆",
      "抗紫外线复合材料花盆",
      "哑光灰 Fiberclay 花盆",
      "1.2m 户外复合材料花盆",
    ],
    productNames: [
      "GFRC 复合材料高柱花盆 高 100cm 直径 35cm，花岗岩饰面",
      "Fiberclay 圆形花盆 直径 60cm 高 50cm，哑光灰色调",
      "Fiberglass 花盆 高 80cm 直径 50cm，酒店大堂用",
      "方形复合材料花盆 80×80×80cm 抗紫外线，带排水孔 + 托盘",
      "唐土陶色 Fiberclay 花盆 80×40cm，用于大型盆景",
      "花岗岩纹 GFRC 复合材料花盆 1.2m 别墅景观",
      "海军蓝复合材料柱形花盆两件套 高 80-100cm",
      "玻璃纤维花盆 直径 1.5m 高 60cm，用于大型棕榈",
    ],
    styles: ["现代", "极简", "地中海", "工业"],
    materials: ["GFRC 复合材料", "Fiberclay", "Fiberglass GRP"],
    extraFilters: [
      SIZE_FILTER,
      { title: "抗紫外线性能", options: ["抗紫外线", "标准"] },
    ],
  },

  "chau-gom-su": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花盆与花箱",
    title: "陶瓷花盆",
    resultsCount: "37.620",
    chips: ["景德镇", "裂纹釉", "青釉", "手绘", "直径 30cm", "直径 50cm"],
    trendingChips: [
      "景德镇陶瓷花盆 40cm",
      "古典裂纹釉陶盆",
      "青釉种兰瓷盆",
      "钴蓝手绘陶盆",
      "装饰陶盆三件套",
      "盆景瓷盆",
      "景德镇青花陶盆",
      "桌面哑光白陶盆",
    ],
    productNames: [
      "景德镇手绘陶瓷花盆 直径 40cm 高 35cm",
      "古典裂纹釉陶盆 直径 50cm，钴蓝花纹",
      "青釉瓷盆 直径 30cm 用于种植蝴蝶兰",
      "哑光米白瓷盆三件套 12-15-18cm 桌面装饰",
      "手绘龙凤瓷盆 直径 60cm，用于大型盆栽",
      "景德镇青花瓷盆 直径 35cm 高 30cm",
      "青釉迷你盆景瓷盆 直径 12cm，六件套",
      "唐土陶色瓷盆 直径 45cm，手工刻纹",
    ],
    styles: ["中式古典", "北欧", "新古典", "极简"],
    materials: ["景德镇瓷", "裂纹釉陶", "哑光瓷", "青釉瓷"],
    extraFilters: [
      { title: "直径", options: ["<20cm", "20-30cm", "30-50cm", "50-80cm", "80cm 以上"] },
    ],
  },

  "chau-xi-mang": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花盆与花箱",
    title: "水泥花盆",
    resultsCount: "14.380",
    chips: ["方形", "圆形", "高柱形", "木底", "灰色调", "土陶色调"],
    trendingChips: [
      "50cm 方形水泥花盆",
      "80cm 高柱形水泥花盆",
      "40cm 圆形水泥花盆",
      "木底水泥花盆",
      "极简装饰水泥花盆",
      "水泥花盆三件套",
      "土陶色调水泥花盆",
      "GFRC 超轻水泥花盆",
    ],
    productNames: [
      "方形水泥花盆 50×50×50cm，哑光灰饰面，带排水孔",
      "高柱形水泥花盆 高 80cm 直径 30cm，极简造型",
      "圆形水泥花盆 40cm 高 35cm 土陶色，柚木底",
      "方形水泥花盆三件套 15-20-25cm 桌面装饰",
      "GFRC 超轻方形水泥花盆 80×80cm，减重 60%",
      "钵形水泥花盆 直径 60cm 高 25cm 灰色调",
      "方形景观水泥花盆 1×1×0.6m 防裂",
      "迷你六边形水泥花盆 15cm，六件套装饰",
    ],
    styles: ["极简", "工业", "现代", "粗野主义"],
    materials: ["浇筑水泥", "GFRC 超轻水泥", "聚合物水泥"],
    extraFilters: [
      SIZE_FILTER,
      { title: "重量", options: ["标准", "GFRC 超轻"] },
    ],
  },

  "chau-inox-kim-loai": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花盆与花箱",
    title: "不锈钢与金属花盆",
    resultsCount: "9.840",
    chips: ["304 不锈钢", "PVD 镀金不锈钢", "镀锌板", "红铜", "木底", "方形"],
    trendingChips: [
      "304 不锈钢高柱花盆",
      "PVD 镀金不锈钢花盆",
      "复古镀锌花盆",
      "木底金属花盆",
      "直径 50cm 不锈钢花盆",
      "40cm 方形不锈钢花盆",
      "红铜做旧花盆",
      "酒店大堂不锈钢花盆",
    ],
    productNames: [
      "304 不锈钢高柱花盆 高 100cm 直径 35cm，拉丝饰面",
      "PVD 镀金不锈钢方形花盆 40×40cm，高端大堂用",
      "复古镀锌圆形花盆 直径 50cm，带提手",
      "柚木底金属花盆 直径 35cm 高 30cm",
      "304 不锈钢花盆 直径 60cm 高 60cm，拉丝处理",
      "古典做旧红铜方形花盆 30×30cm 大堂装饰",
      "PVD 镀金不锈钢花盆三件套 18-25-32cm 高端公寓装饰",
      "六边形 304 不锈钢花盆 直径 50cm，写字楼大堂用",
    ],
    styles: ["现代", "工业", "高端", "复古"],
    materials: ["304 不锈钢", "PVD 镀金不锈钢", "镀锌板", "红铜"],
    extraFilters: [
      { title: "表面处理", options: ["拉丝", "镜面抛光", "PVD 镀金", "古铜做旧"] },
    ],
  },

  "bon-trong-tu-tuoi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花盆与花箱",
    title: "自浇水花箱",
    resultsCount: "8.130",
    chips: ["阳台", "方形", "长方形", "带吸水芯", "带水位指示", "高 30cm"],
    trendingChips: [
      "阳台自浇水花箱",
      "60cm 长方形自浇水花箱",
      "带水位指示花箱",
      "吸水芯自浇水花箱",
      "多层立式自浇水花箱",
      "家庭种菜自浇水花箱",
      "草莓种植自浇水花箱",
      "40cm 圆形自浇水花箱",
    ],
    productNames: [
      "长方形阳台自浇水花箱 60×20×18cm，吸水芯 + 水位指示",
      "3 层立式自浇水花箱 高 90cm，阳台家庭种菜",
      "圆形自浇水花箱 40cm 高 35cm，5L 储水芯",
      "长方形自浇水花箱 1m × 25cm × 25cm，全年种菜",
      "方形露台自浇水花箱 50×50cm，25L 储水量",
      "六边形自浇水花箱三件套 25cm 装饰 + 盆栽",
      "阳台壁挂草莓种植自浇水花箱，6 个种植孔",
      "立式自浇水花箱 8 孔 高 1.4m",
    ],
    styles: ["现代", "极简", "垂直花园"],
    materials: ["原生 PP 塑料", "PE 塑料", "复合材料"],
    extraFilters: [
      { title: "储水量", options: ["<5L", "5-10L", "10-25L", "25L 以上"] },
      { title: "结构", options: ["单格", "双格", "多层立式", "多孔壁挂"] },
    ],
  },

  "gia-do-chau": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花盆与花箱",
    title: "花盆架",
    resultsCount: "11.620",
    chips: ["金属", "木质", "3 层", "5 层", "转角立式", "吊顶"],
    trendingChips: [
      "3 层金属花盆架",
      "北欧木质花盆架",
      "转角立式花盆架",
      "黑色金属花盆架",
      "吊顶花盆架",
      "5 层高花盆架",
      "折叠花盆架",
      "桌面迷你花盆架",
    ],
    productNames: [
      "3 层金属花盆架 高 75cm，哑光黑静电喷涂",
      "北欧橡木 4 层 Z 字形花盆架 高 110cm",
      "转角立式金属 5 层花盆架 高 1.4m，阳台用",
      "吊顶不锈钢绳挂 3 层藤蔓装饰花盆架",
      "桌面迷你 2 层铜金色金属花盆架",
      "松木梯形折叠花盆架 高 1.6m",
      "工业风黑色水管 4 层壁挂花盆架",
      "模块拼接花盆架 每层高 25cm",
    ],
    styles: ["北欧", "工业", "现代", "复古"],
    materials: ["静电喷涂金属", "松木", "橡木", "304 不锈钢"],
    extraFilters: [
      { title: "层数", options: ["1-2 层", "3 层", "4 层", "5 层以上"] },
      { title: "安装方式", options: ["落地立式", "转角立式", "壁挂", "吊顶"] },
    ],
  },

  "treo-tran-treo-tuong": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "花盆与花箱",
    title: "吊顶与壁挂花盆",
    resultsCount: "13.420",
    chips: ["编织挂绳", "金属吊钩", "底部排水", "含挂绳", "窗台挂", "藤蔓植物"],
    trendingChips: [
      "棉绳编织吊盆",
      "金属吊钩吊盆",
      "阳台吊盆",
      "藤蔓植物吊盆",
      "编织吊盆三件套",
      "1m 长吊顶花盆",
      "垂直壁挂花盆",
      "带排水盘吊盆",
    ],
    productNames: [
      "手工棉绳编织吊盆 长 80cm，配 18cm 瓷盆",
      "PE 塑料阳台吊盆 直径 25cm，黑色金属吊钩",
      "锥形藤蔓植物吊盆 长 60cm，配 1m 伞绳",
      "棉绳编织迷你吊盆三件套 米白色 30-50-70cm",
      "垂直壁挂花盆模块 30×60cm 6 个种植孔",
      "304 不锈钢吊顶花盆 直径 30cm，1.2m 不锈钢绳",
      "梨形陶瓷吊顶花盆 25cm，扭绞棉绳",
      "迷你窗台吊盆四件套 牛皮绳 50cm",
    ],
    styles: ["波西米亚", "北欧", "现代", "热带"],
    materials: ["棉绳编织", "304 不锈钢", "PE 塑料", "陶瓷"],
    extraFilters: [
      { title: "悬挂方式", options: ["吊顶", "壁挂", "窗台挂", "阳台挂"] },
      { title: "花盆直径", options: ["<15cm", "15-25cm", "25-35cm", "35cm 以上"] },
    ],
  },

  // ===========================================================================
  // Section 4 — 园艺工具 (garden-tools)
  // ===========================================================================
  "may-cat-co": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "园艺工具",
    title: "割草机",
    resultsCount: "18.420",
    chips: ["手持式", "自走式", "机器人", "二冲程", "四冲程", "锂电池"],
    trendingChips: [
      "52cc 二冲程手持割草机",
      "自走式割草机",
      "全自动割草机器人",
      "21V 锂电割草机",
      "139cc 四冲程割草机",
      "硬质钢割草刀片",
      "AC 电动割草机",
      "背负式割草机",
    ],
    productNames: [
      "52cc 二冲程手持割草机，功率 1.9kW，防震手柄",
      "139cc 四冲程自走式割草机，割幅 51cm，配 60L 集草箱",
      "全自动割草机器人 割幅 28cm，5Ah 锂电池，App 控制",
      "21V 无刷锂电割草机，2 块 4Ah 电池 + 快充",
      "Honda GX35 四冲程背负式割草机，配 3 种割刀",
      "1.6kW AC 电动割草机 家用花园，10m 电源线",
      "硬质钢割草刀片 厚 3mm，直径 25cm，5 片装",
      "56cc 五合一混合割草机，配割刀 + 绿篱修剪",
    ],
    styles: ["家用", "专业用", "景观用"],
    materials: ["ABS 塑料壳", "碳钢刀片", "金属框架"],
    extraFilters: [
      { title: "动力类型", options: ["二冲程汽油", "四冲程汽油", "锂电池", "AC 电动"] },
      { title: "功率", options: ["<1kW", "1-1.5kW", "1.5-2.5kW", "2.5kW 以上"] },
      { title: "认证", options: ["CE", "EPA", "Euro V"] },
    ],
  },

  "keo-dao-lam-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "园艺工具",
    title: "园艺剪刀与刀具",
    resultsCount: "32.510",
    chips: ["修枝剪", "绿篱剪", "手锯", "锂电池", "长柄", "种植刀"],
    trendingChips: [
      "60cm 长柄修枝剪",
      "双手绿篱剪",
      "21V 锂电修枝剪",
      "35cm 弯锯",
      "液压修枝剪",
      "盆景修剪剪",
      "多功能种植刀",
      "园艺剪刀刀具六件套",
    ],
    productNames: [
      "SK5 刀片修枝剪 长柄 60cm，剪枝直径 32mm",
      "双手绿篱剪 铝合金柄 65cm，刀片 25cm",
      "21V 锂电修枝剪，剪枝 30mm，2 块 2Ah 电池",
      "35cm 日本 SK5 钢弯锯，防滑橡胶柄",
      "棘轮液压修枝剪，4 倍省力，剪枝达 40mm",
      "不锈钢盆景剪六件套，高端牛皮盒",
      "304 不锈钢 hori-hori 种植刀，锯齿刀刃，皮鞘",
      "日本钢园艺剪刀刀具六件套，帆布收纳盒",
    ],
    styles: ["专业", "家用", "盆景"],
    materials: ["SK5 钢", "304 不锈钢", "碳钢", "日本合金"],
    extraFilters: [
      { title: "剪切机构", options: ["对刃式", "砧板式", "棘轮式", "电动/锂电"] },
      { title: "剪切直径", options: ["<15mm", "15-25mm", "25-35mm", "35mm 以上"] },
    ],
  },

  "cuoc-xeng-cao": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "园艺工具",
    title: "锄头、铁锹、耙子",
    resultsCount: "15.840",
    chips: ["木柄", "玻璃纤维柄", "硬质钢头", "三件套", "迷你盆景", "落叶耙"],
    trendingChips: [
      "锄头铁锹耙子三件套",
      "玻璃纤维柄挖坑铁锹",
      "硬质钢板锄",
      "多功能落叶耙",
      "迷你盆景工具套装",
      "长柄挖树铁锹",
      "14 齿铁耙",
      "园艺五件套",
    ],
    productNames: [
      "碳钢锄头铁锹耙子三件套，白蜡木柄 1.2m",
      "玻璃纤维柄挖坑铁锹 长 1.2m，锻钢头",
      "硬质钢板锄 1.5kg，油漆白蜡木柄 1.2m",
      "多功能落叶耙 22 齿，铝柄 长 1.65m",
      "迷你不锈钢盆景工具九件套，皮盒",
      "长柄挖树铁锹 1.4m 锻钢厚 4mm",
      "14 齿铁耙 玻璃纤维柄 翻土用，1.4m",
      "铝柄园艺五件套：锄头、铁锹、耙子、移栽铲、鹤嘴锄",
    ],
    styles: ["专业", "家用", "盆景"],
    materials: ["锻造碳钢", "304 不锈钢", "白蜡木柄", "玻璃纤维柄", "铝柄"],
    extraFilters: [
      { title: "柄材质", options: ["木", "玻璃纤维", "铝", "钢"] },
      { title: "套装", options: ["单件", "三件套", "五件套", "九件以上套装"] },
    ],
  },

  "may-phun-thuoc": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "园艺工具",
    title: "喷药机",
    resultsCount: "9.380",
    chips: ["肩背式", "手持式", "锂电池", "手动", "高压", "容量 16L"],
    trendingChips: [
      "16L 肩背式喷药机",
      "12V 锂电喷药机",
      "5L 手动喷药机",
      "高压喷药机",
      "20L 背负式喷药机",
      "60cm 黄铜喷杆",
      "配 Bosch 电池喷药机",
      "迷你高压喷壶",
    ],
    productNames: [
      "16L 肩背式喷药机 12V 锂电池，60cm 黄铜喷杆",
      "5L 手动高压喷药机，可调喷雾喷头",
      "20L 背负式喷药机 26cc 二冲程汽油发动机",
      "1.5L 手持式迷你喷药机 7.4V 锂电池，USB 充电",
      "18L 肩背式喷药机 12V 电动，自动混药系统",
      "8L 手动高压喷壶，304 不锈钢喷杆 长 80cm",
      "35cc 四冲程汽油背负式喷药机 容量 18L",
      "喷药套装：16L 主机 + 4 个喷头 + 2 块快充电池",
    ],
    styles: ["专业", "家用", "迷你"],
    materials: ["HDPE 药箱", "304 不锈钢喷杆", "黄铜喷杆"],
    extraFilters: [
      { title: "容量", options: ["<2L", "2-8L", "8-16L", "16-20L", "20L 以上"] },
      { title: "动力类型", options: ["手动", "12V 锂电池", "18V 锂电池", "二冲程汽油"] },
    ],
  },

  "may-xoi-dat": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "园艺工具",
    title: "松土机",
    resultsCount: "5.640",
    chips: ["二冲程汽油", "四冲程汽油", "锂电池", "迷你", "139cc", "196cc"],
    trendingChips: [
      "四冲程汽油迷你松土机",
      "196cc 自走式松土机",
      "锂电松土机",
      "硬质合金松土刀",
      "多功能松土机",
      "52cc 迷你松土机",
      "Honda GX160 松土机",
      "6.5HP 松土机",
    ],
    productNames: [
      "139cc 四冲程汽油迷你松土机，工作幅宽 35cm",
      "196cc 自走式松土机 6.5HP，幅宽 60cm，2 档变速箱",
      "56V 无刷锂电松土机，幅宽 30cm",
      "52cc 二冲程手持松土机，配 4 把松土刀",
      "Honda GX160 5.5HP 充气轮松土机，幅宽 50cm",
      "43cc 迷你松土机，小型家庭花园用，五功能多用途",
      "SK5 硬质合金松土刀 厚 4mm，6 把装 直径 30cm",
      "9HP 松土机，工作幅宽 80cm 农场用",
    ],
    styles: ["家用", "半专业", "农场"],
    materials: ["SK5 刀片", "钢框架", "压铸铝壳"],
    extraFilters: [
      { title: "功率", options: ["<3HP", "3-5HP", "5-7HP", "7HP 以上"] },
      { title: "动力类型", options: ["二冲程汽油", "四冲程汽油", "锂电池"] },
    ],
  },

  "binh-tuoi-voi-tuoi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "园艺工具",
    title: "浇水壶与喷水龙头",
    resultsCount: "21.840",
    chips: ["5L 浇水壶", "10L 浇水壶", "莲蓬头", "喷枪", "360 旋转喷头", "滴灌系统"],
    trendingChips: [
      "5L 塑料浇花壶",
      "360 度旋转莲蓬头",
      "8 档喷枪",
      "7L 不锈钢浇水壶",
      "自动定时喷水龙头",
      "30m 滴灌系统",
      "婴儿轻柔莲蓬头",
      "1L 迷你装饰浇水壶",
    ],
    productNames: [
      "5L 塑料浇花壶 可拆莲蓬头，盆栽、阳台用",
      "360° 旋转锌合金防锈莲蓬头，直径 12cm",
      "8 档 ABS 合金 + 软橡胶喷枪",
      "304 不锈钢浇水壶 容量 7L，一体莲蓬头",
      "自动定时喷水龙头 AAA 电池，按日 + 时设定",
      "30m 滴灌系统 配 30 个喷头 + 过滤器 + 分流器",
      "婴儿轻柔流量莲蓬头 8 孔软塑料头，用于浇种子",
      "600ml 天鹅造型陶瓷迷你浇水壶 装饰 + 浇水",
    ],
    styles: ["家用", "装饰", "专业"],
    materials: ["PP 塑料", "304 不锈钢", "锌合金", "EPDM 橡胶"],
    extraFilters: [
      { title: "壶容量", options: ["<2L", "2-5L", "5-10L", "10L 以上"] },
      { title: "产品类型", options: ["浇水壶", "莲蓬头", "喷枪", "滴灌系统", "定时器"] },
    ],
  },

  "gang-tay-lam-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "园艺工具",
    title: "园艺手套",
    resultsCount: "12.450",
    chips: ["牛皮", "PU 涂层", "乳胶", "防刺", "带挖爪", "6 双装"],
    trendingChips: [
      "牛皮园艺手套",
      "PU 防刺手套",
      "带挖爪手套",
      "乳胶防水手套",
      "长袖修玫瑰手套",
      "手套 6 双装",
      "丁腈泡棉手套",
      "5 级防割手套",
    ],
    productNames: [
      "长筒牛皮园艺手套，长 30cm 防灌木刺",
      "PU 涂层棉内衬 4 级防刺手套，12 双盒装",
      "8 爪硬塑挖爪手套，徒手翻土用",
      "乳胶防水 + 防化学手套，长筒 35cm",
      "长袖牛皮修玫瑰手套 长 45cm，前臂加固层",
      "丁腈泡棉涂层防油手套，6 双装多色",
      "HPPE + 丁腈 5 级防割手套，用于修剪",
      "时尚印花女士园艺手套 6 双装",
    ],
    styles: ["专业", "家用", "女士时尚"],
    materials: ["牛皮", "PU 涂层", "乳胶", "丁腈泡棉", "HPPE 防割"],
    extraFilters: [
      { title: "防刺性能", options: ["标准", "4 级防刺", "5 级防割"] },
      { title: "长度", options: ["短筒", "中筒", "长筒 30+", "45cm 袖口"] },
    ],
  },

  "phu-tung-dung-cu": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "园艺工具",
    title: "工具配件",
    resultsCount: "8.940",
    chips: ["割草刀片", "割草线", "火花塞", "空气滤芯", "化油器", "电池与充电器"],
    trendingChips: [
      "硬质钢割草刀片",
      "2.4mm 尼龙割草线",
      "割草机火花塞",
      "二冲程空气滤芯",
      "Honda 化油器",
      "21V 4Ah 锂电池",
      "链锯锯链",
      "多线割草头",
    ],
    productNames: [
      "SK5 硬质钢割草刀片 厚 3mm 直径 25cm，5 片装",
      "2.4mm 尼龙割草线 100m 卷装 方形扭纹",
      "NGK BPMR7A 割草机火花塞，用于 25-52cc 二冲程发动机",
      "二冲程泡棉空气滤芯，用于 36-52cc 割草机，5 个装",
      "Honda GX35 原厂化油器",
      "21V 4Ah 锂电池 原装三星电芯，用于割草机 + 修枝机",
      "16 英寸链锯锯链 0.325\" 1.5mm 66 节",
      "自动出线多线割草头，M10 反丝",
    ],
    styles: ["OEM", "原厂", "多品牌通用"],
    materials: ["SK5 钢", "尼龙共聚物", "铜 + 绝缘"],
    extraFilters: [
      { title: "配件类型", options: ["割刀", "割线", "发动机配件", "电池与充电器"] },
    ],
  },

  // ===========================================================================
  // Section 5 — 户外照明 (lighting-outdoor)
  // ===========================================================================
  "den-solar-san-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "户外照明",
    title: "太阳能花园灯",
    resultsCount: "55.420",
    chips: ["太阳能柱灯", "太阳能草坪插地灯", "太阳能投光灯", "太阳能灯串", "IP65", "IP66"],
    trendingChips: [
      "8W IP65 太阳能花园灯",
      "1.8m 高太阳能柱灯",
      "不锈钢太阳能草坪插地灯",
      "60W 太阳能投光灯",
      "10m 100 灯太阳能灯串",
      "人体感应太阳能灯",
      "RGB 变色太阳能灯",
      "太阳能吊挂灯笼",
    ],
    productNames: [
      "IP65 太阳能花园灯 LED 8W，锂电池 3.7V 2400mAh",
      "1.8m 高太阳能柱灯，铝壳，一体单晶板 6V/3W",
      "304 不锈钢太阳能草坪插地灯 LED 1W，3000K 暖黄光，6 个装",
      "60W 太阳能投光灯 IP66，分体单晶板 6V 25W + 遥控",
      "10m 太阳能灯串 100 颗 LED 暖白，8 种闪烁模式",
      "人体感应太阳能灯 36 颗 LED IP65，壁挂",
      "RGB 变色太阳能灯 LED 5W，蓝牙 App 控制",
      "手工复古太阳能吊挂灯笼，黑色金属壳，4 个装",
    ],
    styles: ["现代", "欧式古典", "复古", "极简"],
    materials: ["压铸铝壳", "304 不锈钢", "抗紫外线 PC 塑料壳"],
    extraFilters: [
      { title: "IP 防护等级", options: ["IP44", "IP65", "IP66", "IP67"] },
      { title: "功率", options: ["1-3W", "3-8W", "8-30W", "30-60W", "60W 以上"] },
      { title: "电池", options: ["NiMH 600mAh", "锂电池 1500mAh", "锂电池 2400mAh", "锂电池 4800mAh"] },
    ],
  },

  "den-pha-led-ngoai-troi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "户外照明",
    title: "户外 LED 投光灯",
    resultsCount: "38.620",
    chips: ["10W", "30W", "50W", "100W", "200W", "IP66"],
    trendingChips: [
      "50W LED 投光灯 IP66",
      "100W 户外 LED 投光灯",
      "200W 球场 LED 投光灯",
      "Bridgelux 芯片 COB LED 投光灯",
      "感应 LED 投光灯",
      "30W LED 投光灯 IP65",
      "RGB LED 投光灯",
      "太阳能 LED 投光灯",
    ],
    productNames: [
      "50W LED 投光灯 IP66，黑色压铸铝壳，Bridgelux 5050 芯片",
      "100W LED 投光灯 IP66 SMD 2835 芯片，寿命 50,000 小时",
      "200W 球场 LED 投光灯，光通量 22,000lm，IP66",
      "30W COB LED 投光灯 Bridgelux US 芯片，0-10V 可调光",
      "30W LED 投光灯 PIR 人体感应 12m，IP65",
      "50W RGB LED 投光灯 App + 遥控，1600 万色，IP65",
      "60W 太阳能 LED 投光灯 分体板，锂电池 12000mAh",
      "150W LED 投光灯 厂房照明 IK10 抗冲击",
    ],
    styles: ["工业", "现代", "运动场"],
    materials: ["压铸铝壳", "静电喷涂铝壳", "钢化玻璃"],
    extraFilters: [
      { title: "功率", options: ["10-30W", "30-50W", "50-100W", "100-200W", "200W 以上"] },
      { title: "防护等级", options: ["IP65", "IP66", "IP67", "IP68"] },
      { title: "电源类型", options: ["AC 220V", "DC 24V", "一体式太阳能"] },
    ],
  },

  "den-cam-co": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "户外照明",
    title: "草坪插地灯",
    resultsCount: "24.130",
    chips: ["304 不锈钢", "铝壳", "LED 3W", "LED 5W", "太阳能", "带感应"],
    trendingChips: [
      "304 不锈钢草坪插地灯",
      "LED 太阳能草坪插地灯",
      "铝壳草坪插地灯",
      "照树草坪插地灯",
      "感应草坪插地灯",
      "12V DC 草坪插地灯",
      "3000K 暖黄草坪插地灯",
      "草坪插地灯 6 个装",
    ],
    productNames: [
      "304 不锈钢草坪插地灯 LED 3W IP65，3000K 暖黄光，6 个装",
      "哑光黑铝壳草坪插地灯 5W IP66，24° 配光",
      "304 不锈钢太阳能草坪插地灯，一体单晶板，电池 1500mAh",
      "照树草坪插地灯 12V DC 7W IP67，配控制器",
      "PIR 人体感应草坪插地灯 5m，充电电池，IP65",
      "316 不锈钢防盐雾草坪插地灯 海滨度假村用，3W IP67",
      "照墙上射草坪插地灯 9W IP65，60° 配光",
      "1W 暖白迷你装饰草坪插地灯，10 个装 IP44",
    ],
    styles: ["现代", "极简", "工业"],
    materials: ["304 不锈钢", "316 不锈钢", "压铸铝壳"],
    extraFilters: [
      { title: "功率", options: ["1-3W", "3-5W", "5-9W", "9W 以上"] },
      { title: "电源类型", options: ["AC 220V", "DC 12V", "太阳能"] },
    ],
  },

  "den-canh-quan-day": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "户外照明",
    title: "景观灯串",
    resultsCount: "31.420",
    chips: ["5m 灯串", "10m 灯串", "20m 灯串", "S14 G40", "仙女灯", "IP44"],
    trendingChips: [
      "10m 户外 LED 灯串",
      "25 灯 S14 复古灯串",
      "G40 庭院咖啡灯串",
      "20m 仙女灯串",
      "100 灯太阳能 LED 灯串",
      "户外冰柱灯串",
      "8 模式变色 LED 灯串",
      "暖白灯串 IP65",
    ],
    productNames: [
      "10m 户外 LED 灯串 100 颗暖白 IP65，AC 插头",
      "25 灯 S14 复古灯串 E27 LED 1W，长 7.5m IP44",
      "G40 庭院咖啡灯串 15m 30 颗 LED 1W，可插接延长",
      "20m 仙女灯串 200 颗铜丝 LED，IP44 装饰",
      "100 灯太阳能 LED 灯串 12m，8 种闪烁模式，IP65",
      "户外冰柱灯串 5m 96 颗 LED 雨帘，IP44",
      "10m RGB LED 灯串 60 颗 App 控制，IP65",
      "暖白灯串 30m 300 颗 IP65 用于大型庆典装饰",
    ],
    styles: ["复古", "庭院咖啡", "现代", "节日"],
    materials: ["耐热 PVC 外壳", "铜丝灯丝", "硅胶外壳"],
    extraFilters: [
      { title: "长度", options: ["<5m", "5-10m", "10-20m", "20m 以上"] },
      { title: "电源类型", options: ["AC 220V 插头", "太阳能", "电池", "USB DC"] },
    ],
  },

  "den-chieu-cay": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "户外照明",
    title: "照树灯",
    resultsCount: "12.840",
    chips: ["上射灯", "射灯", "12W", "18W", "24V DC", "IP66"],
    trendingChips: [
      "18W 照树根灯",
      "IP66 照树上射灯",
      "12V 照树射灯",
      "铜壳照树灯",
      "24° 配光照树灯",
      "带调光照树灯",
      "RGB 照树灯",
      "太阳能照树灯",
    ],
    productNames: [
      "18W 照树根灯 IP66，黑色铝壳，24° 配光",
      "照树上射灯 高 30cm 12W Cree 芯片，插地 + 底座",
      "12V DC 照树射灯 7W IP67，0-10V 调光",
      "铜壳做旧照树灯 9W 暖光 3000K，复古风格",
      "24V DC 照树灯 24W 60° 配光，用于 4-6m 大树",
      "RGB 照树灯 18W App + 遥控 1600 万色，IP66",
      "8W 太阳能照树灯 分体板，用于 3-4m 树",
      "照树套装 6 灯 9W 12V + 60W 变压器 + 30m 线",
    ],
    styles: ["现代", "复古", "极简"],
    materials: ["压铸铝壳", "做旧铜壳", "316 不锈钢"],
    extraFilters: [
      { title: "功率", options: ["3-9W", "9-18W", "18-30W", "30W 以上"] },
      { title: "电源类型", options: ["AC 220V", "DC 12V", "DC 24V", "太阳能"] },
      { title: "配光角度", options: ["15° 窄光", "24°", "38°", "60° 宽光"] },
    ],
  },

  "den-motif-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "户外照明",
    title: "造型装饰灯",
    resultsCount: "9.520",
    chips: ["圣诞造型", "鹿造型", "星星造型", "字母造型", "动物造型", "拱门造型"],
    trendingChips: [
      "圣诞鹿造型 LED 灯",
      "3D 星星造型灯",
      "拱门造型灯",
      "LOVE 字母造型灯",
      "花园动物造型灯",
      "纸花造型灯",
      "街道节庆造型灯",
      "RGB 控制造型灯",
    ],
    productNames: [
      "圣诞鹿造型 LED 灯 高 1.2m 240 颗 LED 暖白 IP44",
      "3D 星星造型灯 直径 60cm 200 颗 LED，门口悬挂",
      "拱门造型灯 2.5×3m，1,500 颗 LED，活动用",
      "LOVE 字母造型灯 高 50cm LED 暖白 IP44",
      "绵羊动物造型灯 高 1m LED 暖光，花园全年用",
      "大型纸花造型灯 直径 80cm RGB App 控制",
      "街道节庆造型灯 挂柱 高 3m，LED 2000lm",
      "驯鹿 + 雪橇造型 LED 灯 600 颗 圣诞用",
    ],
    styles: ["节日", "活动拱门", "现代", "儿童"],
    materials: ["静电喷涂金属框架", "镀锌铁丝框架", "RGB 5050 芯片 LED"],
    extraFilters: [
      { title: "场合", options: ["圣诞", "元旦", "万圣节", "婚礼活动", "街道全年"] },
    ],
  },

  // ===========================================================================
  // Section 6 — 家居杂货 (household)
  // ===========================================================================
  "san-pham-to-chuc-tu": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "家居杂货",
    title: "收纳整理产品",
    resultsCount: "33.620",
    chips: ["抽屉收纳", "分隔盒", "分类托盘", "布艺", "PP 塑料", "6 件套"],
    trendingChips: [
      "塑料抽屉收纳",
      "可折叠衣物分隔盒",
      "内衣分类托盘",
      "收纳盒 6 件套",
      "厨柜收纳盒",
      "桌面抽屉收纳盒",
      "浴室柜整理托盘",
      "鞋柜收纳盒",
    ],
    productNames: [
      "PP 塑料模块抽屉收纳组，6 格灵活拼接",
      "无纺布可折叠衣物分隔盒 6 件套",
      "24 格 600D 布内衣分类托盘，不用时可折叠",
      "透明 PP 塑料厨柜收纳盒 6 件套 2.5L",
      "8 格分体桌面抽屉收纳盒，可 L+T 拼接",
      "PP 塑料浴室柜整理托盘 4 格防水",
      "透明 PP 鞋柜收纳盒 带盖可叠放，6 件套",
      "防水帆布旅行行李分装收纳盒 4 件套",
    ],
    styles: ["极简", "现代", "北欧"],
    materials: ["PP 塑料", "无纺布", "600D 帆布", "天然竹"],
    extraFilters: [
      { title: "使用区域", options: ["衣柜", "桌面抽屉", "厨柜", "浴室柜", "鞋柜"] },
    ],
  },

  "hop-dung-do": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "家居杂货",
    title: "收纳箱",
    resultsCount: "47.840",
    chips: ["透明 PP 箱", "可叠放箱", "布艺箱", "木箱", "带盖", "可折叠"],
    trendingChips: [
      "PP 塑料收纳箱 5 件套",
      "带盖透明收纳箱",
      "可折叠布艺收纳箱",
      "儿童玩具收纳箱",
      "可叠放收纳箱",
      "50L 大容量收纳箱",
      "带轮收纳箱",
      "工业不锈钢收纳箱",
    ],
    productNames: [
      "PP 塑料收纳箱 5 件套 5L-10L-20L-30L-50L 带锁盖",
      "透明 PP 收纳箱 30L 5 层叠放，带轮",
      "600D 帆布可折叠收纳箱 38×38×38cm 带盖",
      "PP 塑料卡通印花儿童玩具收纳箱 28L",
      "透明 PP 可叠放收纳箱 4 件套 5L 浴室柜用",
      "70L 超大带锁盖收纳箱，换季衣物收纳",
      "透明 PP 带轮床底收纳箱 35L",
      "304 不锈钢工业收纳箱 60L，带安全锁",
    ],
    styles: ["极简", "现代", "北欧", "儿童"],
    materials: ["PP 塑料", "600D 帆布", "304 不锈钢", "竹"],
    extraFilters: [
      { title: "容量", options: ["<5L", "5-15L", "15-30L", "30-50L", "50L 以上"] },
      { title: "功能", options: ["带锁盖", "可叠放", "可折叠", "带轮", "透明"] },
    ],
  },

  "moc-treo-ke-tuong": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "家居杂货",
    title: "挂钩与壁挂置物架",
    resultsCount: "26.150",
    chips: ["粘胶挂钩", "钻孔螺丝挂钩", "壁挂置物架", "浴室置物架", "304 不锈钢", "ABS 塑料"],
    trendingChips: [
      "承重 5kg 粘墙挂钩",
      "304 不锈钢钻孔螺丝挂钩",
      "3 层木 + 铁壁挂置物架",
      "粘胶浴室置物架",
      "门后挂钩",
      "六边形壁挂置物架",
      "厨柜不锈钢挂钩",
      "粘胶挂钩 6 件套",
    ],
    productNames: [
      "ABS 塑料承重 5kg 粘墙挂钩，6 件套免打孔",
      "304 不锈钢 U 型钻孔螺丝挂钩，承重 15kg，家用",
      "松木 + 铁工业风 3 层壁挂置物架 60×60cm",
      "304 不锈钢粘胶浴室置物架 2 层，长 40cm",
      "6 钩静电喷涂钢门后挂钩，免打孔",
      "木 + 铁六边形壁挂置物架 6 件套，装饰 + 置物",
      "304 不锈钢粘胶厨柜挂钩，10 件套",
      "304 不锈钢微波炉壁挂架 承重 25kg",
    ],
    styles: ["工业", "北欧", "极简"],
    materials: ["304 不锈钢", "ABS 塑料", "松木 + 铁", "锌合金"],
    extraFilters: [
      { title: "安装方式", options: ["3M 粘胶", "钻孔螺丝", "门上挂"] },
      { title: "区域", options: ["浴室", "厨柜", "客厅", "门后"] },
    ],
  },

  "tui-vai-gio-dung": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "家居杂货",
    title: "布袋与收纳篮",
    resultsCount: "19.420",
    chips: ["纯棉", "12oz 帆布", "无纺布", "带提手", "可折叠", "多功能"],
    trendingChips: [
      "纯棉可折叠收纳篮",
      "12oz 帆布购物袋",
      "竹编玩具收纳篮",
      "印 Logo 无纺布袋",
      "纯棉洗衣篮",
      "印花帆布手提袋",
      "脏衣收纳篮",
      "带拉链多功能布袋",
    ],
    productNames: [
      "棉 + 钢可折叠收纳篮 38×38×38cm，带盖 + 提手",
      "OEM 印 Logo 12oz 帆布购物袋，长提手 60cm",
      "藤竹编儿童玩具收纳篮 35cm",
      "80g 无纺布袋 4 色印刷，尺寸 40×30cm",
      "棉 + 铁洗衣篮 高 65cm，带盖 + 滚轮",
      "手工印花帆布手提袋，尺寸 38×42cm",
      "网布可折叠脏衣收纳篮 65L 2 格分类",
      "600D 帆布带拉链多功能布袋，容量 45L",
    ],
    styles: ["北欧", "复古", "现代", "波西米亚"],
    materials: ["100% 纯棉", "12oz 帆布", "80g 无纺布", "藤竹编", "网布"],
    extraFilters: [
      { title: "功能", options: ["购物", "玩具收纳", "洗衣", "装饰", "旅行"] },
    ],
  },

  "san-pham-giat-la": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "家居杂货",
    title: "洗衣晾晒用品",
    resultsCount: "14.380",
    chips: ["晾衣架", "洗衣篮", "晾衣夹", "不锈钢晾衣架", "可折叠架", "带轮"],
    trendingChips: [
      "不锈钢可折叠晾衣架",
      "3 层带轮晾衣架",
      "纯棉洗衣篮",
      "晾衣夹 30 个装",
      "阳台壁挂晾衣架",
      "小型 X 型折叠晾衣架",
      "3 格洗衣分类篮",
      "16 夹晾袜架",
    ],
    productNames: [
      "304 不锈钢 2 层可折叠晾衣架，长 1.6m，承重 30kg",
      "304 不锈钢 3 层带轮晾衣架，折叠后宽 50cm",
      "棉 + 铁洗衣篮 65L 带盖 + 提手",
      "PP 塑料晾衣夹 30 个装，不锈钢弹簧",
      "铝制阳台壁挂伸缩晾衣架 1.4m",
      "304 不锈钢小型 X 型折叠晾衣架 公寓阳台用",
      "帆布 + 铁 3 格洗衣分类篮",
      "ABS 塑料 16 夹晾袜架，不锈钢弹簧夹",
    ],
    styles: ["极简", "工业", "现代"],
    materials: ["304 不锈钢", "伸缩铝", "ABS 塑料", "棉 + 铁"],
    extraFilters: [
      { title: "产品类型", options: ["晾衣架", "洗衣篮", "晾衣夹", "晾袜架"] },
      { title: "区域", options: ["落地", "阳台壁挂", "吊顶", "带轮移动"] },
    ],
  },

  "san-pham-ve-sinh-nha-cua": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "家居杂货",
    title: "家居清洁用品",
    resultsCount: "23.640",
    chips: ["拖把", "扫把", "超细纤维抹布", "喷壶", "抹布收纳盒", "清洁套装"],
    trendingChips: [
      "360 度旋转拖把",
      "蒸汽拖把",
      "无尘扫把",
      "超细纤维抹布 6 件套",
      "起泡喷壶",
      "多功能清洁 6 件套",
      "双面磁吸擦玻璃器",
      "静电除尘掸",
    ],
    productNames: [
      "360° 旋转自动甩干拖把，超细纤维拖头 4 个替换装",
      "1500W 蒸汽拖把，350ml 水箱，杀菌用",
      "合成纤维无尘扫把 + 铝柄 长 1.2m",
      "超细纤维抹布 6 件套 30×30cm 300gsm，多用途",
      "PP 塑料起泡喷壶 500ml，用于稀释皂液 + 化学剂",
      "多功能清洁 6 件套：拖把 + 扫把 + 抹布 + 甩干桶",
      "双面磁吸擦玻璃器 用于高层公寓窗户",
      "木 + 合成纤维静电除尘掸，长 80cm",
    ],
    styles: ["现代", "极简"],
    materials: ["超细纤维", "ABS 塑料", "伸缩铝", "304 不锈钢"],
    extraFilters: [
      { title: "产品类型", options: ["拖把", "扫把", "抹布", "喷壶", "多功能套装"] },
    ],
  },

  // ===========================================================================
  // Section 7 — 礼品与手工艺品 (festive)
  // ===========================================================================
  "qua-tang-thu-cong-noel": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "礼品与手工艺品",
    title: "圣诞礼品与手工艺品",
    resultsCount: "84.620",
    chips: ["圣诞树", "门挂花环", "圣诞球", "圣诞 LED 灯", "驯鹿摆件", "装饰套装"],
    trendingChips: [
      "PVC 圣诞树 1.8m",
      "手工圣诞门挂花环",
      "圣诞树装饰套装 50 件",
      "圣诞球 24 件套",
      "圣诞 LED 灯 10m IP44",
      "驯鹿门口装饰摆件",
      "预装灯圣诞树 2.1m",
      "手工圣诞袜",
    ],
    productNames: [
      "PVC 圣诞树 1.8m 1,200 枝，金属底座，礼盒装",
      "手工圣诞门挂花环 直径 50cm，松针 + 圣诞球",
      "圣诞树装饰套装 50 件：圣诞球 + 丝带 + 树顶星 + 灯串",
      "圣诞球 24 件套 直径 6cm 哑光金，礼盒装",
      "圣诞 LED 灯串 10m 100 颗暖白 IP44，插头",
      "门口驯鹿装饰摆件 3 件套 高 30-50-70cm",
      "预装灯圣诞树 高 2.1m 预装 350 颗暖光 LED",
      "天鹅绒手工圣诞袜 6 件套 可绣名字",
    ],
    styles: ["传统红金", "北欧白", "复古", "奢华金", "乡村风"],
    materials: ["PVC", "毛毡 + 布", "树脂", "5050 LED"],
    extraFilters: [
      { title: "产品类型", options: ["圣诞树", "门挂花环", "LED 灯", "圣诞球", "装饰摆件"] },
      { title: "树高", options: ["1.2-1.5m", "1.8-2.1m", "2.4-3m", "3m 以上"] },
    ],
  },

  "do-thu-cong-halloween": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "礼品与手工艺品",
    title: "万圣节手工艺品",
    resultsCount: "32.140",
    chips: ["LED 南瓜", "树脂幽灵摆件", "蜘蛛网", "恐怖 LED 灯", "面具", "门口装饰套装"],
    trendingChips: [
      "塑料 LED 万圣节南瓜",
      "树脂幽灵摆件",
      "装饰蜘蛛网",
      "橙紫万圣节 LED 灯",
      "橡胶万圣节面具",
      "万圣节门口装饰套装",
      "万圣节门挂花环",
      "充气花园南瓜",
    ],
    productNames: [
      "塑料 LED 万圣节南瓜 直径 25cm，橙黄灯光",
      "手工树脂幽灵摆件 高 50cm，内置 LED 灯光",
      "万圣节装饰蜘蛛网 3.6×3.6m + 100 只塑料蜘蛛",
      "橙 + 紫万圣节 LED 灯串 10m 100 颗 IP44",
      "乳胶橡胶僵尸造型万圣节面具 8 款",
      "万圣节门口装饰 8 件套：南瓜 + 幽灵 + 蜘蛛网",
      "万圣节门挂花环 直径 45cm 带 LED + 南瓜",
      "充气花园南瓜 高 2.4m 带 LED + 12V 风机",
    ],
    styles: ["传统橙黑", "奢华", "儿童欢乐", "恐怖"],
    materials: ["PE 塑料", "树脂", "网布", "乳胶橡胶"],
    extraFilters: [
      { title: "产品类型", options: ["南瓜", "幽灵摆件", "蜘蛛网", "LED 灯", "面具"] },
    ],
  },

  "do-tiec-trang-tri-su-kien": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "礼品与手工艺品",
    title: "派对用品与活动布置",
    resultsCount: "41.620",
    chips: ["气球", "生日横幅", "铝膜气球", "花拱门", "彩纸礼炮", "纸杯纸盘"],
    trendingChips: [
      "Happy Birthday 气球套装",
      "1m 数字铝膜气球",
      "活动背景仿真花拱门",
      "复古生日横幅",
      "派对彩纸套装",
      "主题纸杯纸盘",
      "迎婴派对气球套装",
      "婚礼仿真花背景墙",
    ],
    productNames: [
      "Happy Birthday 气球套装 50 个 + 横幅 + 丝带，金黑主题",
      "数字铝膜气球 高 1m，氦气级，可填充 LED",
      "活动背景仿真花拱门 2.5m，丝绸花 + 绿叶",
      "牛皮纸 + 丝带复古生日横幅，可印名字 + 年龄数字",
      "派对彩纸套装 5 色，1,000 片 + 6 个礼炮",
      "迎婴派对主题纸杯纸盘套装 60 件，4 种粉彩色",
      "迎婴派对气球套装 70 个 4 种尺寸 + 拱门套件",
      "婚礼仿真花背景墙 2×2.4m，高花密度 + 铁底座",
    ],
    styles: ["复古", "粉彩", "奢华金", "波西米亚婚礼", "儿童"],
    materials: ["乳胶", "铝膜", "丝绸花", "牛皮纸"],
    extraFilters: [
      { title: "活动类型", options: ["生日", "婚礼", "迎婴派对", "毕业典礼", "年终派对"] },
    ],
  },

  "thu-cong-nhua-resin": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "礼品与手工艺品",
    title: "树脂手工艺品",
    resultsCount: "12.840",
    chips: ["树脂雕像", "树脂相框", "树脂首饰", "树脂杯垫", "镀金", "多彩"],
    trendingChips: [
      "树脂天使雕像手工艺品",
      "手工树脂相框",
      "镀金树脂杯垫",
      "环氧树脂首饰",
      "桌面树脂雕像",
      "迷你动物树脂摆件",
      "永生干花树脂",
      "树脂招财猫三件套",
    ],
    productNames: [
      "手工树脂天使雕像 高 30cm 金属金喷涂",
      "手工树脂相框 A4 金色边框 + 嵌珍珠",
      "镀金环氧树脂杯垫 6 件套 直径 10cm",
      "环氧树脂首饰套装 含手镯 + 项链 + 耳环",
      "桌面树脂雕像三件套 狮 + 象 + 马",
      "迷你动物树脂摆件 6 件套 高 8-12cm 用于生态缸",
      "环氧树脂永生干花瓶 玫瑰 + 满天星",
      "招财猫 Maneki-Neko 树脂雕像三件套 金箔色 18cm",
    ],
    styles: ["现代", "复古", "奢华金", "北欧"],
    materials: ["环氧树脂", "聚酯树脂", "树脂 + 嵌珍珠"],
    extraFilters: [
      { title: "产品类型", options: ["装饰雕像", "相框", "杯垫", "首饰", "花瓶"] },
    ],
  },

  "thu-cong-kim-loai": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "礼品与手工艺品",
    title: "金属手工艺品",
    resultsCount: "9.310",
    chips: ["铸铜", "艺术铁艺", "不锈钢装饰", "镀金", "做旧铜绿", "壁挂艺术品"],
    trendingChips: [
      "金属壁挂艺术画",
      "铸铜装饰品",
      "铁艺壁挂艺术画",
      "迷你金属雕像",
      "铜茶具套装",
      "艺术金属挂钩",
      "金属画框",
      "手工金属灯",
    ],
    productNames: [
      "手工切割金属壁挂艺术画 80×120cm，做旧铜绿饰面",
      "手工铸铜雕像 高 40cm 整体黄铜饰面",
      "手工锻造铁艺壁挂艺术画 1×1m 花卉设计",
      "桌面迷你金属装饰雕像 高 25cm 红铜色调",
      "手工铸铜茶具套装 含 6 杯，礼盒装",
      "S 型艺术金属挂钩 6 件套 金色饰面",
      "手工切割边框金属画框 直径 60cm",
      "工业风笼形手工金属灯 高 60cm",
    ],
    styles: ["工业", "复古", "新古典", "北欧"],
    materials: ["铸铜", "锻铁", "手工切割 304 不锈钢", "镀金合金"],
    extraFilters: [
      { title: "表面处理", options: ["古黄铜", "铜绿做旧", "PVD 镀金", "哑光黑喷粉"] },
    ],
  },

  "thu-cong-go": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "礼品与手工艺品",
    title: "木质手工艺品",
    resultsCount: "11.520",
    chips: ["烙画", "手工雕刻木", "天然木", "砧板套装", "装饰托盘", "木画"],
    trendingChips: [
      "木质烙画手工艺品",
      "手工雕刻木画",
      "橄榄木砧板套装",
      "木质装饰托盘",
      "手工木雕像",
      "天然木盒",
      "胡桃木装饰品",
      "雕刻木挂钩",
    ],
    productNames: [
      "松木烙画手工艺品 30×40cm",
      "意大利橄榄木砧板套装 3 件，装饰 + 实用",
      "手工胡桃木装饰托盘 40×25cm 亚麻籽油饰面",
      "手工雕刻柚木装饰雕像 高 35cm",
      "天然白蜡木带盖装饰木盒 25×15×10cm",
      "手工雕刻木画 40×60cm 山水景，油饰面",
      "整块胡桃木猫造型装饰品 3 件套",
      "手工雕刻木挂钩 6 钩，长 50cm",
    ],
    styles: ["北欧", "乡村风", "复古", "东方"],
    materials: ["松木", "胡桃木", "柚木", "意大利橄榄木", "白蜡木"],
    extraFilters: [
      { title: "木材类型", options: ["松木", "白蜡木", "柚木", "胡桃木", "橄榄木"] },
    ],
  },

  // ===========================================================================
  // Section 8 — 户外生活与露台 (outdoor-living)
  // ===========================================================================
  "ban-ghe-san-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "户外生活与露台",
    title: "户外桌椅",
    resultsCount: "47.320",
    chips: ["PE 藤编", "铝合金", "柚木", "4 座套装", "6 座套装", "组合沙发"],
    trendingChips: [
      "4 座 PE 藤编桌椅套装",
      "6 座铝合金沙发套装",
      "8 座柚木花园套装",
      "L 形户外组合沙发",
      "铝合金 + 特斯林椅套装",
      "6 座户外餐桌",
      "铝合金日光浴床",
      "4 座户外吧椅套装",
    ],
    productNames: [
      "4 座 PE 藤编桌椅套装 + 钢化玻璃桌，防水坐垫",
      "6 座 L 形铝合金 PE 藤编沙发套装，Olefin 防雨坐垫",
      "8 座柚木花园套装——2.4m 桌 + 8 把印尼柚木折叠椅",
      "L 形户外组合藤编沙发 7 座 + 玻璃茶几",
      "4 座铝合金 + 特斯林餐椅套装，度假村 + 别墅用",
      "6 座户外餐桌 铝合金脚 + 抗紫外线 HPL 桌面",
      "铝合金 + 特斯林可折叠日光浴床，带头枕",
      "4 座 PE 藤编户外吧椅 + 铝合金高脚桌套装",
    ],
    styles: ["现代", "北欧", "地中海", "度假村"],
    materials: ["PE 藤编 + 铝合金", "压铸铝", "印尼柚木", "316 不锈钢 + 特斯林"],
    extraFilters: [
      { title: "座位数", options: ["2 座", "4 座", "6 座", "8 座", "10 座以上"] },
      { title: "套装类型", options: ["餐桌套装", "沙发", "L 形组合", "日光浴床", "吧台套装"] },
    ],
  },

  "o-du-leu-bai": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "户外生活与露台",
    title: "遮阳伞与帐篷",
    resultsCount: "16.940",
    chips: ["偏心伞", "中柱伞", "活动帐篷", "露营帐篷", "直径 3m", "带 LED 灯"],
    trendingChips: [
      "3m 十字底座花园遮阳伞",
      "3.5m 手摇偏心伞",
      "3×3m 防水活动帐篷",
      "4 人防雨露营帐篷",
      "4m 带 LED 遮阳伞",
      "3m 悬臂偏心伞",
      "2×2m 沙滩弹开帐篷",
      "度假村户外固定遮阳伞",
    ],
    productNames: [
      "花园遮阳伞 直径 3m 十字底座，250D 涤纶布",
      "3.5m 手摇悬臂偏心伞，铝合金炭灰色喷涂饰面",
      "3×3m 活动帐篷 静电喷涂钢架，600D 牛津布",
      "4 人双层防雨露营帐篷 3000mm 防水，双层门",
      "直径 4m 遮阳伞 配 32 颗暖白 LED 充电电池",
      "3×4m 半月形悬臂遮阳伞，70kg 花岗岩底座",
      "2×2m 沙滩弹开帐篷 抗紫外线 UPF50，带地钉",
      "度假村户外固定遮阳伞 高 3m 混凝土暗装底座，直径 4m",
    ],
    styles: ["度假村", "北欧", "现代"],
    materials: ["250D 涤纶布", "600D 牛津布", "Sunbrella 面料", "铝合金框架", "钢框架"],
    extraFilters: [
      { title: "直径", options: ["<2.5m", "2.5-3m", "3-3.5m", "3.5-4m", "4m 以上"] },
      { title: "底座类型", options: ["十字底座", "悬臂偏心", "中柱", "混凝土暗装底座"] },
    ],
  },

  "bep-bbq-ngoai-troi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "户外生活与露台",
    title: "户外烧烤炉",
    resultsCount: "8.640",
    chips: ["木炭", "燃气", "电动", "一体熏烤", "304 不锈钢", "直径 60cm"],
    trendingChips: [
      "不锈钢木炭烧烤炉",
      "4 头燃气烧烤炉",
      "户外电动烧烤炉",
      "带熏烤烧烤炉",
      "移动脚烧烤炉",
      "57cm 球形烧烤炉",
      "陶瓷 Kamado 烧烤炉",
      "户外固定烧烤炉",
    ],
    productNames: [
      "304 不锈钢木炭烧烤炉 直径 60cm，带盖 + 温度计",
      "430 不锈钢 4 头燃气烧烤炉，炉面 80×40cm 度假村用",
      "2200W 户外电动烧烤炉，不粘烤网，阳台用",
      "带熏烤木炭烧烤炉 高 1.2m，304 不锈钢",
      "不锈钢移动轮脚烧烤炉，不锈钢炉 + 玻璃盖",
      "57cm 球形烧烤炉 环氧喷涂，配不锈钢烤网 + 钢脚",
      "18 英寸陶瓷 Kamado 烧烤炉，耐温 400°C",
      "304 不锈钢户外固定烧烤炉 80×60cm，配储物柜",
    ],
    styles: ["度假村", "现代", "经典球形"],
    materials: ["304 不锈钢", "430 不锈钢", "Kamado 陶瓷", "耐热环氧喷涂"],
    extraFilters: [
      { title: "燃料类型", options: ["木炭", "燃气", "电动", "颗粒"] },
      { title: "烤面尺寸", options: ["<40cm", "40-55cm", "55-70cm", "70cm 以上"] },
    ],
  },

  "be-boi-phao-spa": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "户外生活与露台",
    title: "充气泳池与水疗池",
    resultsCount: "6.430",
    chips: ["3m 泳池", "4.5m 泳池", "充气水疗池", "4 人水疗池", "金属框架", "过滤系统"],
    trendingChips: [
      "3m 家用充气泳池",
      "4.5m 金属框架泳池",
      "6 人充气水疗池",
      "4 人气泡按摩水疗池",
      "长方形儿童泳池",
      "便携充气水疗池",
      "复合材料埋地泳池",
      "1HP 泳池过滤器",
    ],
    productNames: [
      "家用充气泳池 直径 3m 深 76cm，3 层 PVC",
      "金属框架泳池 4.5m × 深 1.2m，配 0.5HP 过滤器",
      "6 人充气水疗池 直径 2m，130 气泡按摩系统",
      "4 人便携充气水疗池 1.85m，加热至 40°C",
      "长方形儿童泳池 2.6×1.6×0.65m 3 层 PVC",
      "便携充气水疗池 800L，配气泵 + 池盖 + 药剂套件",
      "复合材料埋地泳池 4×3m 深 1.5m，玻璃纤维 + GFRC",
      "1HP 砂 + 臭氧泳池过滤器，适用于 50m³ 以内泳池",
    ],
    styles: ["家用", "度假村", "儿童"],
    materials: ["3 层 PVC", "环氧喷涂金属框架", "玻璃纤维复合材料"],
    extraFilters: [
      { title: "尺寸", options: ["<3m", "3-4m", "4-5m", "5m 以上"] },
      { title: "类型", options: ["充气泳池", "框架泳池", "便携水疗池", "复合材料埋地泳池"] },
    ],
  },

  "nha-kinh-trong-cay": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "户外生活与露台",
    title: "种植温室",
    resultsCount: "4.820",
    chips: ["迷你 2×3m", "中型 3×4m", "大型 6×8m", "铝合金框架", "钢框架", "PE/PC"],
    trendingChips: [
      "PE 塑料迷你温室 2×3m",
      "铝合金框架温室 3×4m",
      "PC 中空板温室",
      "家庭种菜温室",
      "阳台温室 1×2m",
      "农业温室 6×8m",
      "连栋温室",
      "带灌溉系统温室",
    ],
    productNames: [
      "PE 迷你温室 2×3×2.1m 镀锌铁框架，家用花园",
      "铝合金框架温室 3×4×2.4m，6mm PC 中空板顶",
      "PC 中空板温室 4×6×2.5m，带推拉门 + 通风窗",
      "PE 阳台温室 1×2×1.8m，全年种菜",
      "农业温室 6×8×3m 镀锌钢框架 + PE 膜",
      "连栋温室 8×30m 钢框架，配喷雾灌溉",
      "带滴灌系统 + 抽风机温室 4×6m",
      "拱棚温室 5×10m PE 膜，种草莓 + 叶菜",
    ],
    styles: ["家用", "半专业", "农场"],
    materials: ["镀锌铁框架", "铝合金框架", "PC 中空板", "PE 膜"],
    extraFilters: [
      { title: "面积", options: ["<5㎡", "5-15㎡", "15-50㎡", "50㎡ 以上"] },
      { title: "顶部材料", options: ["PE 膜", "PC 中空板", "PC 实心板", "钢化玻璃"] },
    ],
  },

  "xe-day-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "户外生活与露台",
    title: "园艺手推车",
    resultsCount: "5.320",
    chips: ["4 轮", "1 轮", "可拆卸车斗", "网格围栏", "载重 200kg", "载重 300kg"],
    trendingChips: [
      "4 轮载重 200kg 园艺手推车",
      "钢制独轮手推车",
      "可拆卸车斗手推车",
      "可折叠手推车",
      "网格围栏手推车",
      "24V 电动手推车",
      "景观仓库手推车",
      "防爆胎充气轮手推车",
    ],
    productNames: [
      "4 轮园艺手推车 载重 200kg 90L PE 车斗，可折叠拉杆",
      "静电喷涂钢制独轮手推车，100L 车斗 载重 150kg",
      "可拆卸翻斗园艺手推车，用于倒肥料、泥土",
      "可折叠 4 轮手推车，600D 牛津布，载重 100kg",
      "4 轮网格围栏手推车，载重 300kg，农场用",
      "24V 电动手推车 载重 200kg，30Ah 锂电池，爬坡 25°",
      "景观仓库手推车 4 轮硬拉杆，载重 350kg",
      "16 英寸防爆胎充气轮手推车，PU 实心胎，载重 150kg",
    ],
    styles: ["家用", "半专业", "农场"],
    materials: ["静电喷涂钢框架", "PE 车斗", "600D 牛津布", "PU 实心轮"],
    extraFilters: [
      { title: "载重", options: ["<100kg", "100-200kg", "200-300kg", "300kg 以上"] },
      { title: "轮型", options: ["独轮", "2 轮", "4 轮", "电动"] },
    ],
  },

  // ===========================================================================
  // Overview-card cross-sections — 按使用区域
  // ===========================================================================
  "trang-tri-trong-nha": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按区域装饰",
    title: "室内装饰",
    resultsCount: "184.620",
    chips: [
      "装饰雕像",
      "花瓶与花器",
      "仿真植物墙",
      "帆布画框",
      "装饰挂钟",
      "装饰镜",
    ],
    trendingChips: [
      "碧玉佛像",
      "景德镇陶瓷花瓶",
      "60×60 仿真植物墙",
      "抽象画框",
      "北欧圆镜",
      "陶瓷台灯",
      "桌面树脂摆件",
      "三只招财猫摆件",
    ],
    productNames: [
      "碧玉阿弥陀佛像 30cm 手工雕刻，紫檀木底座",
      "景德镇裂纹釉陶瓷花瓶 高 45cm，手绘水墨",
      "铝框仿真植物墙 60×60cm，抗紫外线 EVA 叶 5 年不褪色",
      "抽象帆布画框三联 40×60cm，橡木边框",
      "北欧圆形装饰镜 Φ80cm，PVD 镀金 304 不锈钢边框",
      "弧形陶瓷台灯 45cm，亚麻布灯罩，E27 灯泡",
      "招财猫 Maneki-Neko 三件套 金箔色树脂 18cm 防潮",
      "MDF 木条挂钟 50cm，日本原装扫秒机芯",
    ],
    styles: ["现代", "北欧", "新古典", "极简", "佛教", "轻奢"],
    materials: ["树脂", "陶瓷", "304 不锈钢", "复合材料", "亚克力贴面 MDF", "涤纶丝绸"],
    extraFilters: [
      SIZE_FILTER,
      { title: "使用区域", options: ["客厅", "卧室", "餐厅", "门厅", "家庭办公室"] },
    ],
  },

  "trang-tri-san-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按区域装饰",
    title: "花园装饰",
    resultsCount: "96.480",
    chips: [
      "花园雕像",
      "喷泉",
      "太阳能灯",
      "反光球",
      "墙浮雕",
      "装饰旗帜",
    ],
    trendingChips: [
      "花岗岩石狮雕像",
      "3 层喷泉",
      "LED 太阳能草坪插地灯",
      "不锈钢反光球",
      "PU 塑料浮雕",
      "招财鲤鱼雕像",
      "涤纶花园旗",
      "金属风铃",
    ],
    productNames: [
      "整石花岗岩石狮雕像 高 1.2m，耐风雨 20 年",
      "3 层喷泉 直径 1.5m 复合材料人造石饰面",
      "LED 太阳能草坪插地灯 6 件套 1W IP65，锂电池 1200mAh",
      "304 不锈钢镜面抛光花园反光球 Φ30cm",
      "PU 塑料希腊花园墙浮雕 80×120cm 防水",
      "鲤鱼跃龙门复合材料雕像 60cm，人造石饰面",
      "涤纶花园装饰旗套装 30×45cm，抗紫外线印刷 四季",
      "黄铜金属风铃 高 60cm，6 管藏式音调",
    ],
    styles: ["新古典", "北欧", "地中海", "自然", "中式", "热带"],
    materials: ["花岗岩", "复合材料", "PU 塑料", "304 不锈钢", "铸铜", "户外釉陶瓷"],
    extraFilters: [
      SIZE_FILTER,
      { title: "安装位置", options: ["前院", "后院", "鱼池", "花园小径", "露台"] },
    ],
  },

  "phong-khach-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按区域装饰",
    title: "客厅装饰",
    resultsCount: "142.305",
    chips: [
      "大花瓶",
      "帆布画",
      "玄关桌摆件",
      "大型仿真植物",
      "落地灯",
      "地毯",
    ],
    trendingChips: [
      "1.8m 大堂仿真橄榄树",
      "80cm 落地花瓶",
      "抽象帆布画套装",
      "1.6m 落地灯",
      "波斯地毯 200×290",
      "白色抽象树脂雕像",
      "陶瓷玄关桌",
      "茶几装饰套装",
    ],
    productNames: [
      "陶瓷落地花瓶 高 80cm，龙泉青釉手绘",
      "托斯卡纳仿真橄榄树 180cm，1,200 片真实触感乳胶叶 水泥盆",
      "抽象帆布画三联 60×90cm，真实纹理橡木框",
      "客厅转角落地灯 1.6m，大理石底座 亚麻灯罩",
      "聚丙烯波斯地毯 200×290cm，手织传统纹样",
      "白色人脸抽象树脂雕像 35cm，哑光环氧喷涂饰面",
      "茶几装饰 5 件套：木托盘 + 蜡烛 + 雕像 + 花瓶 + 书",
      "4 扇橡木框屏风 高 1.8m，金色磨砂膜面",
    ],
    styles: ["现代", "新古典", "北欧", "工业", "轻奢", "波西米亚"],
    materials: ["陶瓷", "树脂", "亚麻布", "橡木", "大理石", "聚丙烯"],
    extraFilters: [
      SIZE_FILTER,
      { title: "房间内位置", options: ["玄关桌", "茶几", "房间角落", "墙面", "电视柜"] },
    ],
  },

  "phong-an-khach-san": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按区域装饰",
    title: "酒店餐厅装饰",
    resultsCount: "58.940",
    chips: [
      "餐桌中心摆件",
      "吊灯",
      "装饰隔断",
      "餐盘托盘",
      "餐桌花瓶",
      "餐饮墙画",
    ],
    trendingChips: [
      "宴会厅吊灯",
      "3m 长桌中心摆件套装",
      "35cm 餐桌花瓶",
      "CNC 仿真植物隔断",
      "304 不锈钢自助餐托盘",
      "餐饮帆布墙画",
      "5 头烛台",
      "陶瓷胡椒盐瓶",
    ],
    productNames: [
      "K9 水晶宴会厅吊灯 Φ1.2m，24 头 E14 + 可调光 LED",
      "3m 长桌中心摆件套装 5 件：花瓶 + 蜡烛 + 镜面底座",
      "陶瓷餐桌花瓶 高 35cm 哑光米色，宽口插鲜花",
      "MDF 木胡桃木贴面 CNC 阿拉伯纹隔断 2.4×1.2m",
      "304 不锈钢自助餐托盘 GN 1/1 深 65mm，哑光防指纹面",
      "餐饮帆布墙画三联 60×90cm，东方美食主题",
      "5 头黄铜烛台 高 60cm，宴会用",
      "8cm 方形陶瓷胡椒盐瓶，24 对装 五星酒店 Logo",
    ],
    styles: ["国际五星", "新古典", "东方", "轻奢", "餐饮工业"],
    materials: ["K9 水晶", "304 不锈钢", "哑光釉陶瓷", "铸铜", "胡桃木贴面"],
    extraFilters: [
      { title: "餐饮空间类型", options: ["大堂自助餐", "高级餐厅", "点餐", "宴会", "泳池吧"] },
      { title: "认证", options: ["NSF（食品安全）", "FDA", "LFGB EU", "ISO 22000", "CE"] },
    ],
    featuredSupplier: {
      name: "佛山酒店装饰工厂",
      logo: "/img/sup-hotel-fs.jpg?v=5",
      loc: "中国广东佛山",
      videoCaption: "五星餐饮装饰工厂——专供万豪、希尔顿",
      products: [
        { title: "K9 宴会厅吊灯 1.2m", price: "$420–680/个" },
        { title: "3m 宴会中心摆件套装", price: "$120–185/套" },
      ],
    },
  },

  "hanh-lang-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按区域装饰",
    title: "走廊装饰",
    resultsCount: "32.180",
    chips: [
      "窄玄关桌",
      "大挂镜",
      "长条画",
      "壁灯",
      "细长仿真植物",
      "长条地毯",
    ],
    trendingChips: [
      "30cm 窄玄关桌",
      "1.6m 壁挂镜",
      "LED 壁灯",
      "30×120cm 长条画",
      "1.2m 细长金钱树",
      "80×300cm 长条地毯",
      "走廊三联画",
      "细长装饰雕像",
    ],
    productNames: [
      "窄走廊玄关桌 30×120cm 橡木，黑色金属脚",
      "走廊壁挂镜 60×160cm，天然橡木边框",
      "LED 壁灯 12W，黑色金属灯罩，3000K 暖黄光",
      "走廊帆布三联画 30×120cm，热带叶片主题",
      "细长仿真金钱树 高 1.2m，方形水泥盆 18cm",
      "走廊长条地毯 80×300cm，聚丙烯防滑材质",
      "细长树脂装饰雕像 60cm，抽象艺术造型",
      "细长立式设计挂钟 80cm，日本静音机芯",
    ],
    styles: ["现代", "极简", "北欧", "新古典", "工业"],
    materials: ["橡木", "静电喷涂金属", "聚丙烯", "树脂", "帆布"],
    extraFilters: [
      { title: "走廊宽度", options: ["<1m", "1-1.5m", "1.5-2m", "2m 以上"] },
    ],
  },

  "ban-cong-san-thuong": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按区域装饰",
    title: "阳台与露台装饰",
    resultsCount: "76.215",
    chips: [
      "户外桌椅套装",
      "抗紫外线仿真植物",
      "仙女灯串",
      "吊挂花盆",
      "移动凉棚",
      "WPC 拼接地板",
    ],
    trendingChips: [
      "阳台 bistro 桌椅套装",
      "抗紫外线仿真橄榄树 水泥盆",
      "10m 太阳能灯串",
      "铁艺栏杆吊盆",
      "3×3m 折叠移动凉棚",
      "WPC 拼接地板 30×30",
      "HDPE 70% 遮阳网",
      "阳台自浇水花箱",
    ],
    productNames: [
      "阳台 bistro 桌椅套装 1 桌 2 椅，静电喷涂钢架",
      "抗紫外线仿真橄榄树 高 1.5m，方形水泥盆 25cm 防雨",
      "太阳能仙女 LED 灯串 10m 100 颗，IP65，锂电池",
      "PE 塑料铁艺栏杆吊盆 4 件套，可调不锈钢挂钩",
      "3×3m 折叠移动凉棚 铝合金框架，600D 牛津布顶",
      "WPC 拼接地板 30×30cm，免螺丝卡扣安装，防滑",
      "HDPE 70% 抗紫外线遮阳网 5×3m，不锈钢扣眼间距 50cm",
      "PE 塑料阳台自浇水花箱 60×25cm，4L 储水箱",
    ],
    styles: ["热带", "北欧", "地中海", "工业", "波西米亚"],
    materials: ["铝合金框架", "静电喷涂钢", "WPC", "PE 塑料", "600D 牛津布"],
    extraFilters: [
      { title: "阳台面积", options: ["<5㎡", "5-10㎡", "10-20㎡", "20㎡ 以上"] },
      { title: "朝向", options: ["朝东", "朝西", "朝南", "朝北"] },
    ],
  },

  "khu-vuc-sanh": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按区域装饰",
    title: "大堂区域装饰",
    resultsCount: "44.760",
    chips: [
      "大型大堂仿真植物",
      "落地花瓶",
      "迎宾雕像",
      "大堂吊灯",
      "前台",
      "圆形大堂地毯",
    ],
    trendingChips: [
      "2.5m 大堂橄榄树",
      "1.2m 大堂陶瓷花瓶",
      "大堂入口风水雕像",
      "宴会厅大堂吊灯",
      "酒店前台",
      "Φ3m 圆形大堂地毯",
      "超大玻璃纤维花盆",
      "前台中心摆件套装",
    ],
    productNames: [
      "酒店大堂橄榄树 高 2.5m，2,500 片抗紫外线 EVA 叶",
      "陶瓷落地花瓶 高 1.2m，景德镇手绘水墨",
      "花岗岩石狮雕像一对 高 1.5m，置于大堂门两侧",
      "K9 水晶大堂吊灯 Φ1.5m，36 头可调光 LED",
      "酒店前台 3m 胡桃木贴面，白色人造石台面",
      "Φ3m 圆形大堂地毯 聚丙烯，手织酒店 Logo",
      "超大玻璃纤维花盆 Φ80×H100cm，EPDM 防水内衬",
      "前台中心摆件 7 件套：花瓶 + 雕像 + 蜡烛 + 镜面托盘",
    ],
    styles: ["国际五星", "新古典", "轻奢", "中式", "现代奢华"],
    materials: ["K9 水晶", "花岗岩", "玻璃纤维", "木贴面", "人造石 Solid Surface"],
    extraFilters: [
      { title: "大堂类型", options: ["酒店", "办公楼", "高端公寓", "展厅", "度假村"] },
      SIZE_FILTER,
    ],
    featuredSupplier: {
      name: "广州大堂装饰有限公司",
      logo: "/img/sup-lobby-gz.jpg?v=5",
      loc: "中国广东广州",
      videoCaption: "大堂装饰工厂参观——已供应 200+ 亚洲五星酒店",
      products: [
        { title: "景德镇 1.2m 落地花瓶", price: "$185–280/个" },
        { title: "2.5m 抗紫外线 EVA 大堂橄榄树", price: "$320–450/棵" },
      ],
    },
  },

  "san-van-dong-cong-vien": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按区域装饰",
    title: "体育场与公园装饰",
    resultsCount: "28.430",
    chips: [
      "公园长椅",
      "复合材料垃圾桶",
      "运动场投光灯",
      "景观灯柱",
      "大型花盆",
      "指示牌",
    ],
    trendingChips: [
      "1.8m 钢 + 复合材料公园长椅",
      "复合材料分类垃圾桶",
      "400W 球场投光灯",
      "4m 景观灯柱",
      "1m 超大玻璃纤维花盆",
      "CNC 公园指示牌",
      "WPC 装饰栏杆",
      "拱形复合材料迎宾门",
    ],
    productNames: [
      "1.8m 公园长椅 静电喷涂钢架，WPC 防腐面板",
      "240L 复合材料公园垃圾桶 3 格分类，阻燃",
      "400W 球场投光灯 LED IP66，50,000lm 60° 配光无眩光",
      "4m 公园景观灯柱，双头 LED 60W 太阳能混合",
      "超大玻璃纤维花盆 Φ100×H80cm，置于广场中央",
      "CNC WPC 木公园指示牌 1.2×0.8m，钢脚暗埋",
      "WPC 装饰栏杆 100m，立柱 100×100mm，横条 30×80mm",
      "拱形复合材料迎宾门 4m，船用级抗紫外线环氧喷涂",
    ],
    styles: ["都市", "生态", "运动场馆", "主题公园"],
    materials: ["静电喷涂钢", "WPC", "复合材料", "玻璃纤维", "铸铜", "花岗岩"],
    extraFilters: [
      { title: "工程类型", options: ["体育场", "城市公园", "广场", "学校", "住宅区"] },
      { title: "认证", options: ["CE", "EN 1176（游乐场）", "ISO 9001", "RoHS", "FSC"] },
    ],
  },

  // ===========================================================================
  // Overview-card cross-sections — 按产品类型
  // ===========================================================================
  "chau-hoa-bon-cay": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按产品类型",
    title: "花盆与花箱",
    resultsCount: "215.840",
    chips: [
      "复合材料花盆",
      "PE 塑料花盆",
      "陶瓷花盆",
      "水泥花盆",
      "不锈钢花盆",
      "玻璃纤维花盆",
    ],
    trendingChips: [
      "60cm 圆形复合材料花盆",
      "长方形 PE 塑料花箱",
      "40cm 白釉陶瓷花盆",
      "50cm 方形水泥花盆",
      "304 不锈钢木底花盆",
      "阳台自浇水花箱",
      "方形玻璃纤维花盆",
      "栏杆吊盆",
    ],
    productNames: [
      "圆形复合材料花盆 高 60cm Φ50cm，多色环氧喷涂，底部排水孔",
      "长方形 PE 塑料花箱 80×30×35cm，抗紫外线 8 年，可拆脚",
      "景德镇白釉陶瓷花盆 高 40cm，手绘蓝色花纹",
      "方形水泥花盆 50×50×50cm，天然磨砂表面 防霉",
      "圆柱形 304 不锈钢花盆 高 70cm，天然柚木底防腐",
      "方形玻璃纤维花盆 40×40×40cm，哑光饰面 12 色",
      "PP 阳台自浇水花箱 60×25cm，4L 储水箱，毛细导水管",
      "ABS 塑料栏杆吊盆三件套，可调不锈钢挂钩 0–180mm",
    ],
    styles: ["现代", "极简", "北欧", "地中海", "工业", "热带"],
    materials: ["复合材料", "PE 塑料", "陶瓷", "水泥", "304 不锈钢", "玻璃纤维"],
    extraFilters: [
      SIZE_FILTER,
      { title: "形状", options: ["圆形", "方形", "长方形", "高柱形", "锥形"] },
      { title: "位置", options: ["室内", "室外", "栏杆挂", "吊顶", "大堂"] },
    ],
  },

  "binh-hoa": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按产品类型",
    title: "花瓶",
    resultsCount: "84.520",
    chips: [
      "玻璃花瓶",
      "陶瓷花瓶",
      "大落地花瓶",
      "桌面迷你花瓶",
      "金属花瓶",
      "树脂花瓶",
    ],
    trendingChips: [
      "25cm 手工吹制玻璃花瓶",
      "景德镇裂纹釉陶瓶",
      "80cm 客厅落地花瓶",
      "12cm 床头迷你花瓶",
      "镀金黄铜金属花瓶",
      "北欧哑光陶瓷花瓶",
      "K9 水晶切棱花瓶",
      "白色抽象树脂花瓶",
    ],
    productNames: [
      "手工吹制喇叭口玻璃花瓶 高 25cm，古铜金底座",
      "景德镇裂纹釉陶瓶 高 45cm，手绘水墨",
      "客厅陶瓷落地花瓶 高 80cm，宽口插鲜花",
      "床头迷你花瓶 12cm 哑光米色，同色调三件套",
      "PVD 镀金黄铜金属花瓶 高 30cm，窄口插单枝",
      "北欧哑光罗纹陶瓷花瓶 高 28cm，6 种粉彩混色",
      "波西米亚 K9 水晶切棱花瓶 高 22cm，底厚 15mm 高端",
      "现代白色人脸抽象树脂花瓶 35cm，哑光环氧饰面",
    ],
    styles: ["现代", "北欧", "新古典", "中式", "复古", "轻奢"],
    materials: ["硼硅玻璃", "陶瓷", "黄铜金属", "K9 水晶", "树脂"],
    extraFilters: [
      SIZE_FILTER,
      { title: "瓶口类型", options: ["宽喇叭口", "窄口", "直口", "弯口"] },
    ],
  },

  "vat-pham-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按产品类型",
    title: "装饰摆件",
    resultsCount: "168.940",
    chips: [
      "桌面雕像",
      "装饰托盘",
      "烛台",
      "装饰储物盒",
      "建筑模型",
      "装饰球",
    ],
    trendingChips: [
      "抽象树脂雕像",
      "金色镜面装饰托盘",
      "3 头铜烛台",
      "陶瓷纸巾盒",
      "埃菲尔铁塔模型",
      "反光玻璃球",
      "装饰假书",
      "哑光装饰瓶三件套",
    ],
    productNames: [
      "白色人脸抽象树脂雕像 35cm，哑光环氧饰面不褪色",
      "PVD 镀金镜面装饰托盘 长方形 40×25cm，304 不锈钢边框",
      "3 头铜烛台 高 60cm，宴会或玄关桌用",
      "北欧小熊造型陶瓷纸巾盒 25cm，哑光白釉",
      "镀金埃菲尔铁塔模型 32cm，白色大理石底座",
      "反光玻璃球 Φ20cm，圆形胡桃木底座",
      "复古硬壳装饰假书 5 本套，用于装饰柜",
      "哑光陶瓷装饰瓶三件套，高 15-20-25cm 同色调",
    ],
    styles: ["现代", "北欧", "轻奢", "复古", "工业", "风水"],
    materials: ["树脂", "陶瓷", "黄铜金属", "PVD 304 不锈钢", "大理石", "胡桃木"],
    extraFilters: [
      SIZE_FILTER,
      { title: "装饰位置", options: ["玄关桌", "电视柜", "餐桌", "书桌", "墙面"] },
    ],
  },

  "den-san-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按产品类型",
    title: "花园灯",
    resultsCount: "112.380",
    chips: [
      "太阳能灯",
      "LED 埋地灯",
      "草坪插地灯",
      "LED 投光灯",
      "仙女灯串",
      "景观灯柱",
    ],
    trendingChips: [
      "1W LED 太阳能草坪插地灯",
      "50W LED 投光灯 IP66",
      "12V 露台埋地灯",
      "10m 太阳能仙女灯串",
      "3m 景观灯柱",
      "蝴蝶造型灯",
      "照树射灯",
      "太阳能壁灯",
    ],
    productNames: [
      "LED 太阳能草坪插地灯 6 件套 1W IP65，锂电池 1200mAh 续航 8 小时",
      "户外 LED 投光灯 50W IP66 6500K，防盐雾腐蚀铝壳",
      "12V DC 露台埋地灯 1W IP67，304 不锈钢面，直径 60mm",
      "太阳能仙女灯串 10m 100 颗 LED，8 种闪烁模式，IP65",
      "公园景观灯柱 高 3m，双头 LED 60W 暖光",
      "蝴蝶造型 LED 灯 25W IP65，壁挂，RGB 多色",
      "照树射灯 LED 12W IP66 插地式可调 360° 角度",
      "户外太阳能壁灯 6W IP65，PIR 人体感应",
    ],
    styles: ["现代", "古典", "热带", "工业", "北欧"],
    materials: ["压铸铝壳", "304 不锈钢", "抗紫外线 PC 塑料", "纯铜"],
    extraFilters: [
      { title: "电源", options: ["太阳能", "220V 市电", "DC 12V", "DC 24V", "锂电池"] },
      { title: "IP 等级", options: ["IP54", "IP65", "IP66", "IP67", "IP68"] },
      { title: "功率", options: ["<5W", "5-20W", "20-50W", "50-100W", "100W 以上"] },
    ],
  },

  // ===========================================================================
  // Overview-card cross-sections — 按材质
  // ===========================================================================
  "vat-lieu-composite": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按材质",
    title: "复合材料产品",
    resultsCount: "67.420",
    chips: [
      "复合材料花盆",
      "复合材料雕像",
      "WPC 桌椅",
      "复合材料浮雕",
      "WPC 拼接地板",
      "复合材料拱门",
    ],
    trendingChips: [
      "60cm 圆形复合材料花盆",
      "60cm 复合材料鲤鱼雕像",
      "WPC 户外桌椅",
      "复合材料希腊浮雕",
      "WPC 拼接地板 30×30",
      "复合材料花园拱门",
      "人造石饰面复合材料石狮",
      "WPC 防腐栏杆",
    ],
    productNames: [
      "圆形复合材料花盆 高 60cm Φ50cm，12 色环氧喷涂，耐晒 10 年",
      "鲤鱼跃龙门复合材料雕像 60cm，人造石饰面",
      "WPC 户外桌椅套装 1+4，铝合金框架 + WPC 防腐横条",
      "复合材料希腊花园墙浮雕 80×120cm，做旧金喷涂",
      "户外 WPC 拼接地板 30×30cm，免螺丝卡扣安装，防滑",
      "复合材料花园拱门 4m，船用级抗紫外线环氧喷涂",
      "人造石饰面复合材料石狮 高 1m，耐用 15 年",
      "WPC 栏杆 100m，立柱 100×100mm + 横条 30×80mm 防腐",
    ],
    styles: ["现代", "新古典", "热带", "地中海"],
    extraFilters: [
      SIZE_FILTER,
      { title: "应用", options: ["花园", "大堂", "公园", "度假村", "别墅"] },
      { title: "质保", options: ["3 年", "5 年", "10 年", "15 年"] },
    ],
  },

  "vat-lieu-nhua-pe": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按材质",
    title: "PE 塑料产品",
    resultsCount: "94.260",
    chips: [
      "PE 花盆",
      "PE 自浇水花箱",
      "PE 藤编桌椅",
      "PE 垃圾桶",
      "PE 遮阳网",
      "PE 育苗盘",
    ],
    trendingChips: [
      "40cm 圆形 PE 花盆",
      "阳台 PE 自浇水花箱",
      "户外 PE 藤编桌椅",
      "240L 公园垃圾桶",
      "HDPE 70% 遮阳网",
      "105 孔 PE 育苗盘",
      "1000L PE 储水箱",
      "PE 有机蔬菜种植箱",
    ],
    productNames: [
      "圆形 PE 花盆 高 40cm Φ35cm，抗紫外线 8 年，底部排水孔",
      "阳台 PE 自浇水花箱 60×25cm，4L 储水，毛细导水管",
      "户外 PE 藤编桌椅套装 1+4 铝合金框架，Olefin 布坐垫",
      "240L PE 公园垃圾桶 3 格分类，V0 阻燃",
      "HDPE 70% 抗紫外线遮阳网 5×3m，厚 0.45mm，不锈钢扣眼",
      "105 孔 PE 育苗盘 54×28cm，农场播种育苗用",
      "1000L PE 储水箱，5mm 食品级，防藻",
      "方形 PE 有机蔬菜种植箱 30×30cm，带脚 + 底托",
    ],
    styles: ["热带", "工业", "极简"],
    extraFilters: [
      SIZE_FILTER,
      { title: "PE 级别", options: ["LDPE", "HDPE", "LLDPE", "滚塑 PE", "食品级 PE"] },
      { title: "抗紫外线", options: ["3 年", "5 年", "8 年", "10 年"] },
    ],
  },

  "vat-lieu-gom-su": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按材质",
    title: "陶瓷产品",
    resultsCount: "78.940",
    chips: [
      "陶瓷花瓶",
      "陶瓷花盆",
      "陶瓷雕像",
      "景德镇装饰品",
      "装饰瓷砖",
      "哑光装饰瓶",
    ],
    trendingChips: [
      "景德镇裂纹釉陶瓶",
      "40cm 白釉陶瓷花盆",
      "玉佛陶瓷雕像",
      "景德镇水墨手绘品",
      "摩洛哥装饰瓷砖",
      "北欧哑光罗纹瓶",
      "龙泉陶瓷茶具套装",
      "北欧陶瓷纸巾盒",
    ],
    productNames: [
      "景德镇裂纹釉陶瓶 高 45cm，100% 手绘水墨",
      "白釉陶瓷花盆 高 40cm，宽口手绘蓝色花纹",
      "青釉陶瓷阿弥陀佛像 30cm，紫檀木底座",
      "摩洛哥装饰瓷砖 6 片 20×20cm，钴蓝釉墙面铺贴",
      "北欧哑光罗纹陶瓷瓶 高 28cm，6 种粉彩色",
      "龙泉碧玉青釉茶具套装 9 件，木质礼盒",
      "北欧小熊造型陶瓷纸巾盒，哑光白釉 25cm",
      "裂纹釉陶瓷台灯 高 45cm，亚麻布灯罩，E27 灯泡",
    ],
    styles: ["中式古典", "北欧", "地中海", "现代"],
    extraFilters: [
      { title: "釉面类型", options: ["裂纹釉", "青釉", "哑光釉", "亮光釉", "磨砂釉"] },
      { title: "产区", options: ["景德镇", "龙泉", "德化", "广东"] },
    ],
  },

  "vat-lieu-da-tu-nhien": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按材质",
    title: "天然石材产品",
    resultsCount: "42.180",
    chips: [
      "花岗岩雕像",
      "石喷泉",
      "石浮雕",
      "洞石花盆",
      "大理石桌",
      "石碑雕刻",
    ],
    trendingChips: [
      "1.2m 花岗岩石狮雕像",
      "3 层石喷泉",
      "花园砂岩浮雕",
      "40cm 洞石花盆",
      "圆形大理石桌",
      "CNC 石碑雕刻",
      "希腊花岗岩雕像",
      "复古手工石磨",
    ],
    productNames: [
      "整石花岗岩石狮雕像 高 1.2m，抛光/磨砂双面",
      "3 层石喷泉 直径 1.5m，山东花岗岩",
      "花园砂岩浮雕 80×120cm，手工雕刻罗马纹",
      "圆形洞石花盆 高 40cm Φ35cm，天然亚光饰面",
      "圆形大理石桌 Φ80cm 厚 30mm，黄铜金属脚",
      "CNC 石碑雕刻 60×40cm，山东 G684 黑花岗岩",
      "希腊花岗岩女神雕像 1.5m，100% 手工雕刻",
      "复古手工石磨 Φ40cm，天然红砖石 花园装饰",
    ],
    styles: ["希腊/罗马古典", "中式古典", "自然", "复古"],
    extraFilters: [
      { title: "石材类型", options: ["花岗岩", "大理石", "砂岩", "洞石", "石灰石", "青石"] },
      { title: "表面处理", options: ["抛光", "亚光", "火烧面", "荔枝面", "喷砂面"] },
      SIZE_FILTER,
    ],
    featuredSupplier: {
      name: "泉州天然石材雕刻厂",
      logo: "/img/sup-stone-qz.jpg?v=5",
      loc: "中国福建泉州",
      videoCaption: "泉州石材工厂——专注天然花岗岩雕像出口",
      products: [
        { title: "1.2m 花岗岩石狮雕像", price: "$580–880/对" },
        { title: "1.5m 3 层石喷泉", price: "$1.250–1.850/套" },
      ],
    },
  },

  "vat-lieu-kim-loai-son-tinh-dien": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按材质",
    title: "静电喷涂金属产品",
    resultsCount: "58.620",
    chips: [
      "喷涂钢桌椅",
      "喷涂钢栏杆",
      "喷涂钢花盆",
      "喷涂铁艺门",
      "公园长椅",
      "户外货架",
    ],
    trendingChips: [
      "喷涂钢 bistro 桌椅",
      "黑色喷涂方钢栏杆",
      "户外喷涂钢花盆",
      "喷涂铁艺门",
      "1.8m 公园长椅",
      "户外喷涂钢货架",
      "喷涂钢凉棚框架",
      "3 层花盆架",
    ],
    productNames: [
      "黑色静电喷涂钢阳台 bistro 桌椅套装，桌面 60cm",
      "黑色静电喷涂方钢栏杆 40×40，双层防锈",
      "户外喷涂钢花盆 高 50cm，抗紫外线环氧喷涂 8 年",
      "静电喷涂铁艺门 门扇 1.5m，CNC 花纹",
      "1.8m 公园长椅 喷涂钢架，WPC 防腐面板",
      "户外喷涂钢货架 5 层 60×30×180cm，每层承重 50kg",
      "喷涂钢凉棚框架 3×3m，600D 牛津防水布顶",
      "黑色金属 3 层花盆架 80cm，磨砂环氧喷涂",
    ],
    styles: ["工业", "现代", "法式复古", "极简"],
    extraFilters: [
      { title: "喷涂等级", options: ["单层", "双层环氧 + 聚酯", "三层船用级", "C5 防锈"] },
      { title: "喷涂颜色", options: ["黑色 RAL 9005", "白色 RAL 9010", "灰色 RAL 7016", "复古铜色", "可定制"] },
      { title: "质保", options: ["2 年", "5 年", "10 年"] },
    ],
  },

  "vat-lieu-soi-thuy-tinh": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按材质",
    title: "玻璃纤维产品",
    resultsCount: "38.940",
    chips: [
      "玻璃纤维花盆",
      "玻璃纤维花箱",
      "玻璃纤维雕像",
      "玻璃纤维桌椅",
      "玻璃纤维浮雕",
      "超大大堂花盆",
    ],
    trendingChips: [
      "40cm 方形玻璃纤维花盆",
      "60cm 圆形玻璃纤维花箱",
      "大堂玻璃纤维雕像",
      "户外玻璃纤维桌椅",
      "玻璃纤维墙浮雕",
      "1m 超大大堂花盆",
      "12 色哑光玻璃纤维花盆",
      "锥形玻璃纤维花箱",
    ],
    productNames: [
      "方形玻璃纤维花箱 40×40×40cm，哑光饰面 12 色",
      "圆形玻璃纤维花盆 高 60cm Φ50cm，船用级胶衣层",
      "酒店大堂玻璃纤维女神雕像 高 1.8m，仿大理石喷涂",
      "户外玻璃纤维桌椅套装 1+4，白色胶衣抗泛黄",
      "玻璃纤维墙浮雕 80×120cm，做旧金喷涂不褪色",
      "超大玻璃纤维大堂花盆 Φ80×H100cm，EPDM 防水内衬",
      "户外哑光玻璃纤维花盆三件套，方形 30/40/50cm 同色调",
      "锥形玻璃纤维花箱 高 70cm，口径 50/底 35，极简装饰",
    ],
    styles: ["现代", "极简", "新古典", "轻奢"],
    extraFilters: [
      SIZE_FILTER,
      { title: "表面处理", options: ["哑光", "亮光", "仿大理石", "仿石材", "防涂鸦"] },
      { title: "质保", options: ["5 年", "8 年", "10 年", "15 年"] },
    ],
  },

  "vat-lieu-may-tre": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按材质",
    title: "藤竹产品",
    resultsCount: "31.450",
    chips: [
      "天然藤桌椅",
      "PE 藤编桌椅",
      "竹灯",
      "藤篮",
      "竹隔断",
      "波西米亚竹装饰",
    ],
    trendingChips: [
      "天然藤桌椅 1+4",
      "PE 藤编转角沙发套装",
      "北欧竹吊灯",
      "手工编织藤篮",
      "1.8m 天然竹隔断",
      "波西米亚竹编织装饰",
      "藤摇椅",
      "手工竹编托盘",
    ],
    productNames: [
      "天然藤桌椅套装 1+4，手工编织硬藤框架，棉坐垫",
      "户外 PE 藤编转角沙发 5 座 + 桌，防锈铝合金框架",
      "北欧竹吊灯 Φ40cm，手工编织，布线长 1.5m",
      "手工编织藤篮三件套 30/40/50cm，天然染色",
      "天然竹隔断 1.8×0.9m，4 扇折叠，相思木框架",
      "波西米亚竹编织装饰套装：5 件壁挂 + 吊顶 多尺寸",
      "天然藤摇椅 高 95cm，印尼风格手工编织",
      "手工竹编长方形餐盘 40×25cm，防潮",
    ],
    styles: ["热带", "波西米亚", "北欧", "东方", "复古"],
    extraFilters: [
      { title: "藤竹类型", options: ["天然藤", "合成 PE 藤", "真竹", "压制竹"] },
      { title: "产地风格", options: ["印尼风格", "越南风格", "中式", "巴厘岛"] },
      { title: "应用", options: ["室内", "户外（PE）", "度假村", "波西米亚咖啡馆"] },
    ],
  },

  "vat-lieu-inox-304": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "按材质",
    title: "304 不锈钢产品",
    resultsCount: "46.180",
    chips: [
      "304 不锈钢花盆",
      "不锈钢栏杆",
      "不锈钢桌椅",
      "抛光不锈钢雕像",
      "不锈钢自助餐托盘",
      "不锈钢装饰球",
    ],
    trendingChips: [
      "70cm 304 不锈钢柱形花盆",
      "PVD 镀金 304 不锈钢栏杆",
      "户外 304 不锈钢桌椅",
      "镜面 304 不锈钢雕像",
      "GN 1/1 不锈钢自助餐托盘",
      "304 不锈钢反光球",
      "拉丝缎面不锈钢扶手",
      "不锈钢景观灯柱",
    ],
    productNames: [
      "圆柱形 304 不锈钢花盆 高 70cm Φ40cm，柚木底防腐",
      "PVD 镀金 304 不锈钢栏杆 高 90cm，立柱 Φ50.8 + 扶手 Φ42.4",
      "户外 304 不锈钢桌椅套装 1+4，HPL 紧凑岩板防雨台面",
      "镜面 304 不锈钢抽象雕像 高 1.5m，黑花岗岩底座",
      "304 不锈钢自助餐托盘 GN 1/1 深 65mm，厚 0.8mm，NSF 认证",
      "镜面抛光 304 不锈钢花园反光球 Φ30cm",
      "拉丝缎面 304 不锈钢扶手 Φ42.4 长 6m，90° 灵活接头",
      "304 不锈钢景观灯柱 高 3m，双头 LED 60W IP66",
    ],
    styles: ["现代", "工业", "轻奢", "国际五星"],
    extraFilters: [
      { title: "表面处理", options: ["镜面", "拉丝缎面", "PVD 镀金", "PVD 镀铜", "PVD 镀黑"] },
      { title: "不锈钢级别", options: ["304", "304L", "316", "316L（船用级）"] },
      { title: "认证", options: ["NSF（食品）", "ISO 9001", "EN 1090", "CE", "RoHS"] },
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

const DEFAULT_STYLES = ["现代", "古典", "极简", "工业", "欧式"];
const DEFAULT_PRODUCT_VARIANTS = [
  "出口标准款，5 层瓦楞纸箱包装",
  "高端版本，适用于五星酒店工程项目",
  "OEM 款，可定制尺寸、颜色、Logo",
  "2026 款，通过 CE/RoHS/ISO 9001 认证",
  "环保系列，FSC 再生材料",
  "现货库存，广州 7 天内发货",
  "2025 畅销款，新买家免费提供样品",
  "面向欧盟市场的 OEM 版本，高强度厚实",
];

/**
 * Per-parent-category content templates — used by buildDefaultSeed so that
 * any leaf URL we don't have a hand-curated seed for still produces
 * contextually relevant product names, materials, styles.
 *
 * Each entry overrides the fallback defaults; missing fields fall back.
 */
type CategoryTemplate = {
  variants?: string[];
  styles?: string[];
  materials?: string[];
};

const CATEGORY_TEMPLATES: Record<string, CategoryTemplate> = {
  electrical: {
    variants: [
      "16A 250V 符合 IEC 标准，V0 阻燃 PC 外壳",
      "欧标暗装，镀镍铜体",
      "ELCB 30mA 防触电技术",
      "户外 IP65 防水版本",
      "集成 USB-C 20W 及 Type-A 2.4A 接口",
      "OEM 印 Logo，独立展示盒包装",
      "2026 款，附 CE / CCC / TÜV 标识",
      "质保 5 年，起订量灵活",
    ],
    styles: ["欧标", "美式", "英标 BS", "日标 JIS", "国标"],
    materials: ["阻燃 PC 塑料", "铝合金", "镀镍铜", "不锈钢", "静电喷涂金属"],
  },
  lighting: {
    variants: [
      "Bridgelux COB LED 芯片 9W-36W，CRI ≥80",
      "3000K/4000K/6500K 色温可调",
      "压铸铝散热壳，浴室 IP44",
      "集成调光器 + 涂鸦智能 Wi-Fi",
      "寿命 50,000 小时，质保 3 年",
      "按需 OEM ODM——驱动器印 Logo",
      "CE / RoHS / FCC / SAA 认证",
      "频闪 <8%，护眼安全",
    ],
    styles: ["现代", "北欧", "工业", "古典", "智能家居"],
    materials: ["压铸铝", "轻合金", "PMMA 亚克力", "硼硅玻璃", "静电喷涂钢"],
  },
  "bathroom-sanitary": {
    variants: [
      "实心黄铜，5 层 PVD 镀铬",
      "恒温技术 ±0.5°C",
      "纳米釉抗菌陶瓷，易清洁",
      "3L/6L 双冲节水结构",
      "8mm 防刮自洁钢化玻璃",
      "按图 OEM，起订量 50-100 套",
      "通过 CE / WaterSense / WRAS",
      "龙头主体质保 10 年，陶瓷质保 5 年",
    ],
    styles: ["现代", "新古典", "极简", "奢华", "水疗"],
    materials: ["黄铜", "锌合金", "陶瓷", "人造石", "亚克力", "镀铬黄铜"],
  },
  "doors-windows": {
    variants: [
      "6063-T5 铝框 厚 1.4mm，静电喷涂",
      "Low-E + 氩气双层玻璃，隔热 U=1.6",
      "双轨静音防尘推拉，EPDM 密封条",
      "Roto/Sheba/Hopo 高端配件",
      "按图定制尺寸，起订量 1 套",
      "IP65 防水，抗 12 级风",
      "OEM 印 Logo，出口托盘包装",
      "2026 款，通过 CE / AAMA / WERS-A",
    ],
    styles: ["铝合金系统门", "兴发铝门", "Bertelsmann 铝门", "钢化玻璃门", "复合木门"],
    materials: ["6063 铝", "静电喷涂钢", "钢化玻璃", "MDF 木贴面", "uPVC 塑料"],
  },
  "construction-materials": {
    variants: [
      "瓷砖 600×600 / 800×800 / 1000×1000mm",
      "哑光/亮光/砂岩釉面，R10 防滑",
      "抗折强度 ≥35 N/mm²，吸水率 <0.5%",
      "2026 大理石/花岗岩/水泥纹色调",
      "1.4 吨托盘包装，40HQ 集装箱装运",
      "砖底 OEM 型号 + Logo",
      "CE / ISO 13006 / A1 级防火认证",
      "质保 25 年不褪色",
    ],
    styles: ["大理石纹", "花岗岩纹", "水泥纹", "木纹", "水磨石"],
    materials: ["瓷砖", "天然石材", "石英石", "复合材料", "岩板"],
  },
  "hardware-tools": {
    variants: [
      "304 / 316 不锈钢，抗海水腐蚀",
      "800-2200W 有刷电机，转速可调",
      "18V/20V/40V 锂电池，2-6Ah，1 小时快充",
      "镁铝合金抗冲击外壳 IP54",
      "软胶防滑手柄，减震 60%",
      "机身激光雕刻 OEM Logo",
      "附吹塑工具箱，配件齐全",
      "通过 CE / GS / EMC / RoHS / 质保 2 年",
    ],
    styles: ["专业", "家庭 DIY", "工业"],
    materials: ["304 不锈钢", "碳钢", "铝合金", "ABS 塑料", "黄铜"],
  },
  "kitchen-equipment": {
    variants: [
      "304 拉丝不锈钢机身，易清洁",
      "2200W 变频电磁炉，9 档触控火力",
      "A++ 能效变频冰箱，多路制冷",
      "14 套餐具洗碗机，6 程序 + 热风烘干",
      "950m³/h 抽油烟机，304 不锈钢烟道",
      "OEM 供酒店 / 餐厅 / 高端公寓",
      "通过 CE / GS / EMC / ETL / NSF",
      "电机质保 2 年，零件质保 1 年",
    ],
    styles: ["岛台厨房", "嵌入式厨房", "内置式", "独立式", "商用"],
    materials: ["304 不锈钢", "静电喷涂碳钢", "石英石", "钢化玻璃", "铝"],
  },
  "hotel-supplies": {
    variants: [
      "100% 埃及长绒棉 60S/2，600 支纱线密度",
      "白鹅绒 90/10，厚 200gsm",
      "5cm 涤纶记忆棉，ProBact 抗菌",
      "尺寸 King 200×220cm / Queen 180×200cm",
      "OEM 绣 Logo，精品酒店起订 50 套",
      "通过 OEKO-TEX 100 / ISO 9001 / Greenguard",
      "单件 polybag 包装 + 出口托盘",
      "质保 2 年防起球、不褪色",
    ],
    styles: ["五星奢华", "精品", "度假村", "商务", "环保"],
    materials: ["100% 纯棉", "亚麻", "超细纤维", "竹纤维", "记忆棉", "羽绒"],
  },
  decoration: {
    variants: [
      "实木框 + 380gsm 帆布 8 色微喷印刷",
      "做旧复古/拉丝金/哑光黑饰面",
      "尺寸 A0/A1/A2 + 按需定制",
      "起订量 30-50 件，独立 5 层瓦楞纸箱包装",
      "背面 OEM Logo，支持 Adobe AI/PSD 设计",
      "通过 FSC / CE / 加州 Prop 65",
      "2025-2026 杭州工作室畅销设计",
      "≥$5K 项目免费寄样",
    ],
    styles: ["现代", "北欧", "新古典", "工业", "波西米亚"],
    materials: ["MDF 木板", "聚氨酯树脂", "复合材料", "铸铜", "玻璃纤维", "帆布"],
  },
  "outdoor-garden": {
    variants: [
      "6063-T5 铝框 静电喷涂 抗紫外线 7 年",
      "PE-HDPE 藤编 耐温 -20°C 至 +70°C",
      "Sunbrella® / Olefin 防水防霉坐垫",
      "304 不锈钢烧烤炉，双盖 4-6 头，配推车",
      "悬臂遮阳伞 3×3m / 3.5×3.5m",
      "OEM 供度假村 / 别墅 / 户外餐厅",
      "平板包装节省集装箱，附安装说明",
      "通过 CE / TÜV / SGS / 防腐蚀认证",
    ],
    styles: ["热带度假村", "地中海", "现代户外", "工业", "北欧"],
    materials: ["6063 铝", "PE-HDPE 藤编", "天然柚木", "304 不锈钢", "塑木 Polywood", "花岗岩"],
  },
  "noi-that": {
    variants: [
      "橡木/胡桃木/MDF 木贴面框架 + 天然乳胶垫",
      "尺寸 King/Queen/Single + 按图定制",
      "天鹅绒/棉麻/PU 皮/意大利头层牛皮包覆",
      "Hettich/Blum 滑轨，缓冲关闭，三段式",
      "OEM 供酒店 / 公寓 / 展厅项目",
      "平板包装，组装 <30 分钟",
      "通过 FSC / CARB-P2 / E0 甲醛排放",
      "框架质保 10 年，面料质保 3 年",
    ],
    styles: ["现代", "北欧", "新古典", "日韩极简", "工业"],
    materials: ["天然橡木", "胡桃木", "MDF 木贴面", "天然乳胶垫", "天鹅绒面料", "PU 皮"],
  },
  "home-garden": {
    variants: [
      "高端材料，喷粉涂层 7 年防褪色",
      "承重结构 200kg，户外耐用 10 年",
      "模块化设计，易拼接多种配置",
      "OEM Logo，起订量灵活 50-100 件",
      "平板包装，自行组装",
      "适合越南湿热气候",
      "通过 CE / TÜV / SGS / 抗紫外线",
      "质保 5 年，提供项目咨询支持",
    ],
    styles: ["北欧", "地中海", "热带", "工业", "波西米亚"],
    materials: ["天然木", "PE 藤编", "喷涂铝", "复合材料", "人造石"],
  },
};

function buildDefaultSeed(
  parentSlug: string,
  parentName: string,
  l2Name: string,
  title: string,
  slug: string
): LeafSeed {
  const h = hashSeed(slug);
  const lower = title.toLowerCase();
  const tpl = CATEGORY_TEMPLATES[parentSlug] || {};
  const variants = tpl.variants || DEFAULT_PRODUCT_VARIANTS;
  const styles = tpl.styles || DEFAULT_STYLES;
  return {
    parentSlug,
    parentName,
    l2Name,
    title,
    resultsCount: synthCount(slug, "results"),
    chips: [
      title,
      `${title} OEM`,
      `高端${title}`,
      `${title} 批发价`,
      `${title} 样品`,
      `${title} 工程款`,
    ],
    trendingChips: [
      `${title} 优惠价`,
      `${title} OEM Logo`,
      `${title} 2026 新款`,
      `${title} 现货库存`,
      `${title} 工程专用`,
      `${title} 出口欧盟`,
      `${title} 国际标准`,
      `${title} CE 认证`,
    ],
    productNames: variants.map((v, i) => {
      const tag = (h + i) % 4 === 0 ? "套装" : (h + i) % 4 === 1 ? "款" : (h + i) % 4 === 2 ? "系列" : "系";
      return `${tag} ${lower} — ${v}`;
    }),
    styles,
    materials: tpl.materials,
  };
}

// Showcase products: 12 demo products (1 per main category) — used by all
// subcat product cards which redirect to /product/demo-<parent>-1.
const SHOWCASE_PRODUCTS: Record<string, { title: string; parentName: string }> = {
  "home-garden":            { title: "高端 80cm 复合材料装饰花盆套装 含高端仿真绿植",                        parentName: "家居与园艺" },
  "construction-materials": { title: "Calacatta 大理石纹瓷砖大板 1200×2400mm 金灰纹 高端饰面",              parentName: "建筑材料" },
  "bathroom-sanitary":      { title: "集成 LED 智能马桶 一体式无水箱 带洁身器 触控操作",                    parentName: "卫浴洁具" },
  "noi-that":               { title: "L 形转角沙发 6 座 意大利天鹅绒包覆 PVD 镀金金属脚",                   parentName: "家具" },
  "kitchen-equipment":      { title: "OPPEIN 模块橱柜 亮面亚克力可定制 现代无拉手",                          parentName: "厨房设备" },
  "lighting":               { title: "现代水晶吊灯 12 头可调光 LED 高端客厅适用",                            parentName: "灯具照明" },
  "doors-windows":          { title: "兴发 55 系列铝合金 4 扇门 12mm 钢化玻璃 炭灰框",                       parentName: "门窗" },
  "hotel-supplies":         { title: "五星酒店床品四件套 60 支纯棉 250 支纱线密度 高端",                    parentName: "酒店用品" },
  "hardware-tools":         { title: "304 不锈钢 PVD 拉丝金橱柜拉手套装 奢华 10 件",                          parentName: "五金配件与工具" },
  "decoration":             { title: "意大利极简风树脂艺术雕像套装 3 件 白米色",                              parentName: "装饰品" },
  "outdoor-garden":         { title: "6 座 PE 藤编花园桌椅套装 防晒含坐垫 高端",                              parentName: "户外与园艺" },
  "electrical":             { title: "WiFi 智能触控开关 4 键 Tuya Smart Life 钢化玻璃面板",                  parentName: "电气与电器" },
};

function buildShowcaseLeaf(parent: string): LeafCategoryPage | null {
  const sc = SHOWCASE_PRODUCTS[parent];
  if (!sc) return null;
  const supplier: Supplier = { name: "华越示范工厂", audited: true, loc: "中国广东" };
  const lp: ListingProduct = {
    id: `demo-${parent}-1`,
    title: sc.title,
    desc: `${sc.title}。${sc.parentName} 行业的示范产品。联系华越查看完整目录。`,
    priceFrom: "$120",
    priceTo: "$280",
    unit: "/套",
    moq: "10 套",
    img: { src: `/img/demo-${parent}-1-1.jpg?v=5`, total: 8 },
    guaranteed: true,
    supplier,
  };
  return {
    slug: `demo-${parent}`,
    parentSlug: parent,
    parentName: sc.parentName,
    l2Name: "示范产品",
    title: `${sc.parentName} 示范`,
    resultsCount: "1",
    chips: [{ name: sc.title.split(" ").slice(0, 4).join(" "), active: true }],
    trendingChips: [],
    faqs: [],
    filters: [],
    featured: {
      logo: "/logo/cybersilkroads-icon.png?v=5",
      name: "华越示范",
      audited: true,
      rating: 5,
      videoCaption: "示范展示",
      videoSrc: `/img/${parent}-sc-fvideo.jpg?v=5`,
      miniProducts: [],
    },
    products: [lp],
  };
}

export function getLeafCategory(parent: string, leaf: string): LeafCategoryPage | null {
  // Showcase demo leaves: demo-<parent>
  if (leaf === `demo-${parent}`) {
    return buildShowcaseLeaf(parent);
  }

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
