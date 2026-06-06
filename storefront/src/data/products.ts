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

const photo = (seed: string) => `/img/${seed}.jpg?v=6`;

export const LEAF_CATEGORIES: Record<string, LeafCategoryPage> = {
  "ghe-van-phong": {
    slug: "ghe-van-phong",
    parentSlug: "noi-that",
    title: "Office Chairs",
    parentName: "Furniture",
    l2Name: "Office Furniture",
    resultsCount: "77,906",
    chips: [
      { name: "Office Chairs", active: true },
      { name: "Mesh Chairs" },
      { name: "Executive Chairs" },
      { name: "Ergonomic Chairs" },
      { name: "Swivel Chairs" },
      { name: "Leather Chairs" },
    ],
    trendingChips: [
      "Drafting Chairs",
      "Conference Chairs",
      "Stacking Chairs",
      "Guest Chairs",
      "Executive Chairs",
      "Task Chairs",
      "Ergonomic Chairs",
      "Mesh Chairs",
    ],
    faqs: [
      {
        q: "What are the benefits of an ergonomic office chair?",
        a: "Ergonomic chairs are designed to naturally support the spine and reduce pressure on the neck, shoulders and lower back. For long hours of sitting, a quality ergonomic chair improves posture, reduces fatigue and helps prevent chronic conditions such as cervical degeneration and lower-back pain. It is a worthwhile investment in long-term productivity.",
      },
      {
        q: "Can I buy office chairs at wholesale prices?",
        a: "Most factories on Huayuesc support wholesale pricing with an MOQ of 10–50 pc depending on the model. You can send an RFQ with a specific quantity, and suppliers will respond with a CIF/DDP quote to a Vietnam warehouse within 24 hours. Orders of 100 pc or more typically receive an 8–15% discount off list price. OEM logo changes, leather color changes and cushion changes are available for orders of 200 pc or more.",
      },
      {
        q: "How do I choose the right office chair for my needs?",
        a: "Determine in advance: (1) daily sitting time — under 4 hours, choose a basic task chair; over 6 hours, choose an ergonomic chair; (2) the user's height and weight — the chair must have a suitable lift range; (3) material — breathable mesh for hot climates, leather/bouclé fabric for air-conditioned rooms. Request a sample before placing a bulk order.",
      },
    ],
    filters: [
      {
        title: "New Arrivals",
        options: [
          { name: "Task Chairs" },
          { name: "Executive Chairs" },
          { name: "Mesh Chairs" },
          { name: "Conference Chairs" },
          { name: "Ergonomic Chairs" },
        ],
      },
      {
        title: "Category",
        options: [],
        nested: [
          { name: "Furniture", depth: 0 },
          { name: "Office Furniture", depth: 1 },
          { name: "Office Chairs", depth: 2, active: true },
        ],
      },
      {
        title: "Style",
        options: [
          { name: "Classic", count: "540" },
          { name: "Modern", count: "63,567" },
          { name: "Minimalist", count: "3,714" },
          { name: "Chinese", count: "748" },
          { name: "American", count: "154" },
        ],
        showMore: true,
      },
      {
        title: "Material",
        options: [
          { name: "Fabric", count: "30,933" },
          { name: "Genuine Leather", count: "3,431" },
          { name: "Synthetic Leather", count: "14,332" },
        ],
      },
      {
        title: "Swivel",
        options: [{ name: "Swivel Chairs", count: "59,064" }],
      },
      {
        title: "Armrests",
        options: [
          { name: "With Armrests", count: "63,466" },
          { name: "Without Armrests", count: "14,440" },
        ],
      },
      {
        title: "Origin",
        options: [
          { name: "Guangdong", count: "45,289" },
          { name: "Zhejiang", count: "12,103" },
          { name: "Fujian", count: "5,874" },
        ],
      },
    ],
    featured: {
      logo: "YF",
      name: "Guangzhou YAFON Furniture Manufacturing Co., Ltd.",
      audited: true,
      rating: 4,
      videoCaption: "Private spaces, shared spaces",
      videoSrc: photo("yafon-video"),
      miniProducts: [
        { title: "YF-A88 Premium Mesh Ergonomic Chair", price: "155$-299$", unit: "/ Set", img: photo("yf1") },
        { title: "Italian Cowhide Executive Chair, Cast-Aluminum Base", price: "320$-540$", unit: "/ Set", img: photo("yf2") },
        { title: "Steel-Frame Stacking Conference Chair", price: "65$-110$", unit: "/ Set", img: photo("yf3") },
        { title: "A-Frame Guest Chair, Bouclé Upholstery", price: "78$-145$", unit: "/ Set", img: photo("yf4") },
        { title: "YF-A99 Ergonomic Chair with Footrest", price: "210$-399$", unit: "/ Set", img: photo("yf5") },
      ],
    },
    products: [
      {
        id: "ghe-van-phong-1",
        title: "Mesh Ergonomic Office Chair, Aluminum Base, Adjustable Headrest",
        desc: "Powder-coated steel frame, German breathable mesh, 3D S-curve backrest, 4D armrests, 3-position lock tilt mechanism. Made in Guangdong, OEM 200pcs+.",
        priceFrom: "30,00$",
        priceTo: "33,00$",
        unit: "/ Set",
        moq: "1 Set",
        img: { src: photo("chair1"), total: 4 },
        amazing: true,
        monthLabel: "April",
        guaranteed: true,
        supplier: {
          name: "Foshan Aston Furniture Co.",
          audited: true,
          loc: "📍 Guangdong, China",
        },
      },
      {
        id: "ghe-van-phong-2",
        title: "Premium Italian Cowhide Executive Chair, Mechanical Massage Headrest, Cast-Aluminum Base",
        desc: "1.6mm Italian cowhide, natural-rubber foam cushion, battery-powered 8-point massage system. 5-year warranty. Ideal for executive offices and premium workspaces.",
        priceFrom: "189,00$",
        priceTo: "245,00$",
        unit: "/ Set",
        moq: "5 Set",
        img: { src: photo("chair2"), total: 5 },
        isVideo: true,
        guaranteed: true,
        supplier: {
          name: "Hengxin Furniture Co., Ltd.",
          audited: true,
          loc: "📍 Zhejiang, China",
        },
      },
      {
        id: "ghe-van-phong-3",
        title: "Steel-Frame Stacking Conference Chair, Flame-Retardant Felt Upholstery",
        desc: "BS5852 flame-retardant felt, powder-coated steel frame, molded PU foam cushion. Stacks 10 chairs high. Ideal for meeting rooms, auditoriums and event spaces.",
        priceFrom: "18,50$",
        priceTo: "26,00$",
        unit: "/ Set",
        moq: "20 Set",
        img: { src: photo("chair3"), total: 3 },
        amazing: true,
        guaranteed: true,
        supplier: {
          name: "Yongkang Spring Furniture Co.",
          audited: true,
          loc: "📍 Zhejiang, China",
        },
      },
      {
        id: "ghe-van-phong-4",
        title: "AKF-X3 Ergonomic Chair, US Mesh, Aluminum Base, Dynamic Lumbar Support",
        desc: "USA Matrex2 mesh, self-adjusting pneumatic lumbar support, 5D armrests, 360° swivel headrest. BIFMA and GREENGUARD GOLD certified. 12-year frame warranty.",
        priceFrom: "98,00$",
        priceTo: "165,00$",
        unit: "/ Set",
        moq: "10 Set",
        img: { src: photo("chair4"), total: 6 },
        isVideo: true,
        amazing: true,
        monthLabel: "April",
        guaranteed: true,
        supplier: {
          name: "Guangzhou AKF Furniture Co.",
          audited: true,
          loc: "📍 Guangdong, China",
        },
      },
      {
        id: "ghe-van-phong-5",
        title: "360° Swivel Task Chair, Mesh Back, Fixed Armrests, 5-Star Nylon Base",
        desc: "Poly mesh back, PU foam cushion, PU-wrapped fixed armrests, 5-star nylon base, Class-4 pneumatic cylinder. Ideal for startup offices and coworking spaces.",
        priceFrom: "12,80$",
        priceTo: "18,50$",
        unit: "/ Set",
        moq: "50 Set",
        img: { src: photo("chair5"), total: 4 },
        guaranteed: true,
        supplier: {
          name: "Sihoo Furniture Co., Ltd.",
          audited: true,
          loc: "📍 Fujian, China",
        },
      },
      {
        id: "ghe-van-phong-6",
        title: "YAFON YF-A88 Ergonomic Chair, German Mesh, 4D Headrest, 10-Year Warranty",
        desc: "German Matrex mesh, high-strength steel frame, 4D armrests adjustable for height/depth/rotation/tilt. Soft 12cm-thick seat cushion. SGS and BIFMA-X5 certified.",
        priceFrom: "155,00$",
        priceTo: "299,00$",
        unit: "/ Set",
        moq: "1 Set",
        img: { src: photo("chair6"), total: 8 },
        isVideo: true,
        amazing: true,
        guaranteed: true,
        supplier: {
          name: "Guangzhou YAFON Furniture Manufacturing Co., Ltd.",
          audited: true,
          loc: "📍 Guangdong, China",
        },
      },
      {
        id: "ghe-van-phong-7",
        title: "Swivel Task Chair, PU Leather Cushion, 5-Star Aluminum Base, Fixed Armrests",
        desc: "1.2mm scratch-resistant PU leather, 10cm molded PU foam cushion, matte-black aluminum base, smooth-rolling 60mm PU casters. Suitable for both home and office.",
        priceFrom: "42,00$",
        priceTo: "65,00$",
        unit: "/ Set",
        moq: "10 Set",
        img: { src: photo("chair7"), total: 5 },
        monthLabel: "April",
        guaranteed: true,
        supplier: {
          name: "Foshan Hooker Furniture Co.",
          audited: true,
          loc: "📍 Guangdong, China",
        },
      },
      {
        id: "ghe-van-phong-8",
        title: "A-Frame Office Guest Chair, Steel Frame, Cream Bouclé Cushion",
        desc: "French 100% polyester bouclé, chrome-plated steel frame, 8cm HD foam cushion, 150kg load capacity. Refined, luxurious Scandinavian style.",
        priceFrom: "55,00$",
        priceTo: "82,00$",
        unit: "/ Set",
        moq: "20 Set",
        img: { src: photo("chair8"), total: 4 },
        amazing: true,
        guaranteed: true,
        supplier: {
          name: "Dongguan Bewinner Furniture Co.",
          audited: true,
          loc: "📍 Guangdong, China",
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
    { base: 4, unit: "/ Pc" },
    { base: 8, unit: "/ Set" },
    { base: 12, unit: "/ Pc" },
    { base: 22, unit: "/ Set" },
    { base: 35, unit: "/ Pc" },
    { base: 58, unit: "/ Set" },
    { base: 95, unit: "/ Set" },
    { base: 145, unit: "/ Set" },
  ];
  const t = tiers[(h + idx) % tiers.length];
  const jitter = (h % 13) / 10; // 0.0 - 1.2
  const lo = t.base + jitter * t.base * 0.15;
  const hi = lo * (1.18 + ((h >> 4) % 17) / 100); // +18%..+34%
  const fmt = (n: number) => n.toFixed(2).replace(".", ",") + "$";
  return { from: fmt(lo), to: fmt(hi), unit: t.unit };
}

const SUPPLIER_TEMPLATES: Array<{ name: string; loc: string; logo: string }> = [
  { name: "Guangzhou Lifeart Decor Co., Ltd.", loc: "📍 Guangdong, China", logo: "LA" },
  { name: "Yiwu Tianyu Manufacturing Co.", loc: "📍 Zhejiang, China", logo: "TY" },
  { name: "Xiamen Hangyu Indoor & Outdoor Furniture Co., Ltd.", loc: "📍 Fujian, China", logo: "HY" },
  { name: "Linyi Greenland Manufacturing Co.", loc: "📍 Shandong, China", logo: "GL" },
  { name: "Baoding Bayue Decor Co., Ltd.", loc: "📍 Hebei, China", logo: "BY" },
  { name: "Suzhou Sunpower Houseware Co.", loc: "📍 Jiangsu, China", logo: "SP" },
  { name: "Jingdezhen Ceramic Co., Ltd.", loc: "📍 Jiangxi, China", logo: "CD" },
  { name: "Foshan Brightway Manufacturing Co.", loc: "📍 Guangdong, China", logo: "BW" },
  { name: "Yongkang Hardware Co., Ltd.", loc: "📍 Zhejiang, China", logo: "YK" },
  { name: "Ningbo Greenhome Co.", loc: "📍 Zhejiang, China", logo: "NB" },
];

const FEATURED_VIDEO_CAPTIONS = [
  "12,000m² production line — closed-loop QC process",
  "OEM for over 80 international brands",
  "Order from 1 sample — DDP to a Vietnam warehouse in 18 days",
  "1,500m² showroom — full product display",
  "BSCI, ISO 9001 and Sedex certified factory",
];

function pickSupplier(slug: string, offset = 0) {
  const h = hashSeed(slug + "::sup::" + offset);
  return SUPPLIER_TEMPLATES[(h + offset) % SUPPLIER_TEMPLATES.length];
}

function buildLeafFromSeed(slug: string, seed: LeafSeed): LeafCategoryPage {
  // Filters
  const filters: FilterGroup[] = [];

  filters.push({
    title: "New Arrivals",
    options: seed.chips.slice(0, 6).map((c) => ({ name: c })),
  });

  filters.push({
    title: "Category",
    options: [],
    nested: [
      { name: seed.parentName, depth: 0 },
      { name: seed.l2Name, depth: 1 },
      { name: seed.title, depth: 2, active: true },
    ],
  });

  if (seed.styles && seed.styles.length) {
    filters.push({
      title: "Style",
      options: seed.styles.map((s) => ({ name: s, count: synthCount(slug, "style:" + s) })),
      showMore: seed.styles.length > 5,
    });
  }

  if (seed.materials && seed.materials.length) {
    filters.push({
      title: "Material",
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
    title: "Origin",
    options: [
      { name: "Guangdong", count: synthCount(slug, "origin:gd") },
      { name: "Zhejiang", count: synthCount(slug, "origin:zj") },
      { name: "Fujian", count: synthCount(slug, "origin:fj") },
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
        unit: i % 2 === 0 ? "/ Set" : "/ Pc",
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
  const moqPool = ["1 Set", "1 Pc", "5 Set", "10 Set", "20 Pc", "50 Pc", "100 Pc", "200 Pc"];
  const monthLabels = ["April", "May", "New"];
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
            q: `What is the MOQ for ${seed.title.toLowerCase()}?`,
            a: `The typical MOQ for ${seed.title.toLowerCase()} ranges from 1–50 units depending on the model and degree of customization. Orders of 100 units or more usually receive an 8–15% discount off list price. Factories can supply a single sample for quality inspection before a bulk order — the sample fee is credited against the formal order.`,
          },
          {
            q: `Can ${seed.title.toLowerCase()} be ordered as OEM/ODM?`,
            a: `Most factories in this category support OEM (logo printing, color changes, packaging changes) from 200 units and ODM (custom design) from 500 units. Average production time is 25–40 days from sample approval. Huayuesc provides engineering support and coordinates with the factory if you need advice on materials, structure or dimensions.`,
          },
          {
            q: `How are ${seed.title.toLowerCase()} shipped to Vietnam?`,
            a: `${seed.title} orders are usually shipped by LCL/FCL sea freight from the ports of Guangzhou, Ningbo and Xiamen to Hai Phong/Ho Chi Minh City. Huayuesc offers a DDP service — duties, customs clearance and warehouse delivery included — for 99% of the SKUs in this category. Door-to-door time is 14–21 days depending on the origin port and season.`,
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
  const minOrder = ["MOQ 50 pc", "MOQ 100 pc", "MOQ 200 pc", "MOQ 1 set (sample)", "MOQ 20 set"];
  const ports = ["FOB Guangzhou", "FOB Ningbo", "FOB Xiamen", "FOB Qingdao"];
  const mat = seed.materials?.[idx % (seed.materials.length || 1)];
  const style = seed.styles?.[idx % (seed.styles.length || 1)];
  const c = certs[idx % certs.length];
  const m = minOrder[idx % minOrder.length];
  const port = ports[idx % ports.length];
  const matPart = mat ? `${mat}, ` : "";
  const stylePart = style ? `${style.toLowerCase()} style, ` : "";
  return `${matPart}${stylePart}${c} certified. ${m}. OEM logo printing, color changes and packaging changes supported for orders of 200 pc or more. ${port}, DDP to Hai Phong/Ho Chi Minh City in 16–22 days.`;
}

// ---------------------------------------------------------------------------
// Helper builders for repeated facet groups
// ---------------------------------------------------------------------------

const SIZE_FILTER = {
  title: "Size",
  options: ["Small (<30cm)", "Medium (30–60cm)", "Large (60–100cm)", "Extra Large (>100cm)"],
};

const APP_INDOOR_OUTDOOR = {
  title: "Application",
  options: ["Indoor", "Outdoor", "Hotel", "Resort", "Garden", "Office Lobby"],
};

// ---------------------------------------------------------------------------
// HOME_GARDEN_LEAVES — seed map for every subcat + inline item under home-garden
// ---------------------------------------------------------------------------

const PARENT = "home-garden";
const PARENT_NAME = "Home & Garden";

export const HOME_GARDEN_LEAVES: Record<string, LeafSeed> = {
  // ===========================================================================
  // Section 1 — Indoor decoration (decoration-indoor)
  // ===========================================================================
  "tuong-vat-pham-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Indoor Decoration",
    title: "Statues & Decorative Objects",
    resultsCount: "62,418",
    chips: [
      "Resin Statues",
      "Composite Statues",
      "Feng Shui Statues",
      "Jade Buddha Statues",
      "Decorative Animal Statues",
      "Tabletop Statue Sets",
    ],
    trendingChips: [
      "Jade Buddha Statues",
      "Feng Shui Carp Statues",
      "Brass Horse Statues",
      "Reindeer Head Statues",
      "Abstract Resin Statues",
      "Golden Deer Statues",
      "Composite Angel Statues",
      "Lucky-Cat Trio Sets",
    ],
    productNames: [
      "Hand-Carved Jade Amitabha Buddha Statue, 30cm, Rosewood Base",
      "Set of 3 Feng Shui Brass Horse Statues, 1:18 Scale, 24K Gold Plated",
      "Wall-Mounted Resin Reindeer Head Statue, 45cm, Metallic Gold Finish",
      "Composite Leaping Carp Statue, 60cm, Faux-Stone Finish",
      "Modern Abstract Face Statue, White Resin, 35cm, for Console Table",
      "Set of 3 Maneki-Neko Lucky-Cat Statues, Pearl Gold, 18cm",
      "Scandinavian Metal Golden Deer Statue, 50cm, Marble Base",
      "Composite Garden Angel Statue, 80cm, Antique Vintage Finish",
    ],
    styles: ["Modern", "Neoclassical", "Chinese", "Scandinavian", "European Classic", "Buddhist"],
    materials: ["Resin", "Composite", "Cast Brass", "Fiberglass", "Faux Stone", "Ceramic"],
    extraFilters: [SIZE_FILTER, APP_INDOOR_OUTDOOR],
  },

  "hoa-gia-cay-gia": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Indoor Decoration",
    title: "Artificial Flowers & Plants",
    resultsCount: "118,245",
    chips: [
      "Artificial Olive Trees",
      "Silk Roses",
      "Artificial ZZ Plants",
      "Artificial Phalaenopsis Orchids",
      "Artificial Bonsai",
      "Dried Pampas Grass",
    ],
    trendingChips: [
      "1.8m Artificial Olive Trees",
      "5-Stem Phalaenopsis Orchids",
      "Silk Rose Baby's Breath",
      "1.2m Green-Leaf ZZ Plants",
      "Artificial Fiddle-Leaf Figs",
      "Long-Stem Artificial Cherry Blossom",
      "1.5m Artificial Pothos",
      "Mini Desktop Bonsai",
    ],
    productNames: [
      "Artificial Olive Tree, 180cm, 1,200 Real-Touch Latex Leaves, Cement Pot",
      "Silk Phalaenopsis Orchid, 5 Stems, Real-Touch Silicone",
      "Artificial Fiddle-Leaf Fig, 160cm, 3D-Printed EVA Leaves, Real Wood Base",
      "Garden Rose Silk Flowers, Box of 50 Stems with Baby's Breath Filler",
      "6-Branch Artificial ZZ Plant, 120cm, UV-Resistant Real-Touch Leaves",
      "Mini Ficus Bonsai, 30cm Tabletop, Jingdezhen Crackle-Glaze Ceramic Pot",
      "Artificial Sakura Cherry-Blossom Branch, 1.5m, for Weddings/Events",
      "Natural Dried Pampas Grass Bundle, 10 Stems, 110cm, Cream-Dyed",
    ],
    styles: ["Natural", "Scandinavian", "Neoclassical", "Modern", "Wedding"],
    materials: ["Polyester Silk", "Latex (Real-Touch)", "3D-Printed EVA", "PE Plastic", "Natural Dried Grass"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Occasion", options: ["Home Decor", "Wedding", "Events", "Hotel", "Showroom"] },
    ],
  },

  "hoa-lua": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Indoor Decoration",
    title: "Silk Flowers",
    resultsCount: "48,912",
    chips: ["Silk Roses", "Silk Peonies", "Silk Hydrangeas", "Silk Sunflowers", "Silk Baby's Breath", "Silk Chrysanthemums"],
    trendingChips: [
      "Garden Rose Silk Flowers",
      "Long-Stem Artificial Peonies",
      "Silk Hydrangeas",
      "Wedding Sunflowers",
      "Silk Bridal Bouquets",
      "Padded Baby's Breath",
      "Dried Silk Lavender",
      "Large Silk Chrysanthemums",
    ],
    productNames: [
      "Garden Rose Silk Flowers, 65 Real-Touch Blooms, Gift Box",
      "French Silk Peony Cluster, Wine Red, 5 Blooms, Bendable Metal Stems",
      "Silk Hydrangeas, 18cm Heads, for Large Vase Arrangements",
      "Long-Stem Silk Sunflowers, 70cm, Cotton-Padded Centers",
      "Premium Padded Silk Baby's Breath, Bundle of 50 Stems",
      "Dried Silk Lavender, Light Purple, Bundle of 80 Stems, 35cm",
      "Multicolor Large Silk Chrysanthemums, 12cm Heads, 60cm Stems",
      "Silk Bridal Bouquet, Blush Pink + Sage Green, Satin Ribbon",
    ],
    styles: ["Wedding", "Classic", "Scandinavian", "Natural", "Vintage"],
    materials: ["Polyester Silk", "Latex (Real-Touch)", "Cotton Padding", "Polyester+EVA"],
    extraFilters: [
      { title: "Number of Blooms", options: ["1 Bloom", "3-5 Blooms", "5-10 Blooms", "10-30 Blooms", "Over 30 Blooms"] },
      { title: "Occasion", options: ["Wedding", "Home Decor", "Events", "Gifts", "Hotel"] },
    ],
  },

  "cay-o-liu": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Indoor Decoration",
    title: "Artificial Olive Trees",
    resultsCount: "12,408",
    chips: ["1m Olive Trees", "1.8m Olive Trees", "2.5m Olive Trees", "Olive Topiary", "Real-Touch", "Potted Olive Trees"],
    trendingChips: [
      "1.8m Artificial Olive Tree, Cement Pot",
      "2.5m Hotel-Lobby Olive Tree",
      "60cm Mini Tabletop Olive Tree",
      "Round Olive Topiary",
      "Real-Touch Latex Olive Leaves",
      "Real-Wood-Base Olive Tree",
      "Scandinavian Tuscany Olive Tree",
      "Pair of Lobby Olive Trees",
    ],
    productNames: [
      "Tuscany Artificial Olive Tree, 180cm, 1,200 Real-Touch Leaves, Real Wood Base",
      "Mini Olive Tree, 60cm Tabletop, 18cm Crackle-Glaze Ceramic Pot",
      "Hotel-Lobby Olive Tree, 250cm, 2,500 UV-Stable EVA Leaves",
      "Double Round Olive Topiary, 130cm, White Ceramic Base",
      "Rope-Wrapped Artificial Olive Tree, 150cm, 800 Leaves",
      "Olive Tree, 100cm, 22cm Square Cement Pot, Minimalist Decor",
      "4-Trunk Artificial Olive Tree, 200cm, 95% Lifelike Effect",
      "Wall-Mounted Artificial Olive Branch, 80cm, Bent Steel-Wire Frame",
    ],
    styles: ["Tuscany", "Scandinavian", "Minimalist", "Modern", "Mediterranean"],
    materials: ["UV EVA Leaves", "Real-Touch Latex Leaves", "Real Wood Base", "PE Plastic Trunk"],
    extraFilters: [
      { title: "Height", options: ["<60cm", "60-100cm", "100-150cm", "150-200cm", ">200cm"] },
    ],
  },

  "cay-kim-tien-gia": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Indoor Decoration",
    title: "Artificial ZZ Plants",
    resultsCount: "9,245",
    chips: ["1.2m ZZ Plants", "Mini ZZ Plants", "Real-Touch", "Dark-Green Leaves", "Cement Pot", "ZZ Plant"],
    trendingChips: [
      "1.2m Artificial ZZ Plant",
      "Mini Tabletop ZZ Plant",
      "Real-Touch ZZ Leaves",
      "ZZ Plant in Cement Pot",
      "Artificial ZZ Plant",
      "6-Branch ZZ Plant",
      "1.5m Lobby ZZ Plant",
      "Office ZZ Plant",
    ],
    productNames: [
      "6-Branch Artificial ZZ Plant, 120cm, UV-Resistant Real-Touch Leaves",
      "Mini ZZ Plant, 35cm Tabletop, Round 12cm White Ceramic Pot",
      "ZZ Plant, 150cm, 8 Branches, 220 Glossy Dark-Green Leaves",
      "ZZ Plant, 90cm, 18cm Square Cement Pot",
      "Pair of Office Artificial ZZ Plants + 304 Stainless Steel Pot",
      "Artificial ZZ Plant, 70cm, Flame-Retardant EVA Leaves",
      "Black Raven ZZ Plant Variant, 1.2m, On-Trend",
      "Ceiling-Hung Artificial ZZ Plant, 60cm, Stainless Steel Hook",
    ],
    styles: ["Modern", "Minimalist", "Scandinavian", "Office"],
    materials: ["Real-Touch Latex Leaves", "UV EVA Leaves", "Glossy PE Plastic Leaves"],
    extraFilters: [
      { title: "Height", options: ["<50cm", "50-100cm", "100-150cm", ">150cm"] },
    ],
  },

  "hoa-lan-gia": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Indoor Decoration",
    title: "Artificial Orchids",
    resultsCount: "21,084",
    chips: ["Phalaenopsis Orchids", "Oncidium Orchids", "Dendrobium Orchids", "Paphiopedilum Orchids", "Real-Touch", "Pre-Potted"],
    trendingChips: [
      "5-Stem Artificial Phalaenopsis Orchids",
      "Real-Touch Phalaenopsis Orchids",
      "Artificial Dendrobium Orchids",
      "Potted White Orchids",
      "Purple Phalaenopsis Orchids",
      "Yellow Oncidium Orchids",
      "Mini Desktop Phalaenopsis Orchids",
      "Hotel-Reception Phalaenopsis Orchids",
    ],
    productNames: [
      "5-Stem Artificial White Phalaenopsis Orchid, Real-Touch Silicone",
      "Potted Purple Phalaenopsis Orchid, 9 Stems, Jingdezhen Celadon-Glaze Pot",
      "Yellow Oncidium Orchid, 65cm Stems, 3cm Florets, for Bouquets",
      "Multicolor Artificial Dendrobium Orchid, 50cm Stems, for Vase Arrangements",
      "Artificial Monopodial Paphiopedilum Orchid, 4 Stems, with Natural Dried Moss",
      "Set of 3 Mini Real-Touch Phalaenopsis Orchids, for Reception Desks",
      "Special Jade-Green Phalaenopsis Orchid, 5 Stems, 70cm, in Ceramic Pot",
      "Full-Stem White Orchid, 90cm, for Large Hotel-Lobby Vase Arrangements",
    ],
    styles: ["Classic", "Modern", "Hotel", "Wedding"],
    materials: ["Real-Touch Silicone", "Polyester Silk", "Latex"],
    extraFilters: [
      { title: "Number of Stems", options: ["3 Stems", "5 Stems", "7 Stems", "9 Stems", "Over 9 Stems"] },
      { title: "Pre-Potted", options: ["Pre-Potted", "Loose Stems"] },
    ],
  },

  "binh-hoa-lo-hoa": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Indoor Decoration",
    title: "Vases & Vessels",
    resultsCount: "54,620",
    chips: ["Ceramic Vases", "Glass Vases", "Metal Vases", "Resin Vases", "Rattan Vases", "Decorative Vase Sets"],
    trendingChips: [
      "Jingdezhen Ceramic Vases",
      "Handmade Glass Vases",
      "Brass Metal Vases",
      "Abstract Resin Vases",
      "50cm Vases",
      "Mini Tabletop Vases",
      "Bubble Glass Vases",
      "Set of 3 Scandinavian Decorative Vases",
    ],
    productNames: [
      "Antique Crackle-Glaze Jingdezhen Ceramic Vase, 45cm, Hand-Painted",
      "Handmade Borosilicate Glass Vase, Pear Shape, 30cm",
      "Brass Metal Vase, 55cm, Antique Patina Effect",
      "White Abstract Face Resin Vase, 35cm",
      "Handwoven Rattan Vase, 40cm, Round Mouth, for Dried Arrangements",
      "Set of 3 Scandinavian Ceramic Vases, Mixed Sizes, Cream Matte Glaze",
      "Multicolor Bubble Art-Glass Vase, 28cm",
      "Vintage Ceramic Vase, Embossed Cobalt Pattern, 50cm",
    ],
    styles: ["Antique Chinese", "Scandinavian", "Modern", "Vintage", "Industrial", "Art Deco"],
    materials: ["Ceramic", "Handmade Glass", "Brass", "Resin", "Rattan"],
    extraFilters: [SIZE_FILTER],
  },

  "tuong-cay-nhan-tao": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Indoor Decoration",
    title: "Artificial Green Walls",
    resultsCount: "32,105",
    chips: ["60×60 Modules", "50×50 Modules", "Mixed Greenery", "With Flowers", "UV-Resistant", "B1 Flame-Retardant"],
    trendingChips: [
      "60×60 Green-Wall Modules",
      "Green Walls with Orchids",
      "UV-Resistant Outdoor Green Walls",
      "B1 Flame-Retardant Green Walls",
      "Reception-Lobby Green Walls",
      "Meeting-Room Green Walls",
      "Coffee-Shop Green Walls",
      "Restaurant Green Walls",
    ],
    productNames: [
      "Artificial Green-Wall Module, 60×60cm, UV-Resistant Outdoor, High Density",
      "Green-Wall Module, 50×50cm, with Orchids + Hydrangeas",
      "B1 Flame-Retardant Artificial Green Wall, for Lobby Use",
      "Tropical Palm Module, 1×1m, Jungle Effect",
      "Green Wall with Decorative Moss — Mixed Eucalyptus Blend",
      "Green-Wall Module, 12cm Thick, Matte-Black Metal Trim",
      "Small Artificial Green Wall, 40×60cm, for Headboards and Sofa Decor",
      "3D Green-Wall Module, Moisture-Resistant, for Balconies",
    ],
    styles: ["Tropical", "Scandinavian", "Natural", "Modern Rainforest"],
    materials: ["PE Plastic Leaves", "UV EVA Leaves", "Aluminum Frame", "PP Plastic Frame"],
    extraFilters: [
      { title: "Flame Resistance", options: ["B1 Flame-Retardant", "Standard (Non-FR)"] },
      { title: "UV Resistance", options: ["UV-Resistant (Outdoor)", "Indoor Only"] },
    ],
  },

  "vach-ngan-gap": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Indoor Decoration",
    title: "Folding Room Dividers",
    resultsCount: "8,940",
    chips: ["3-Panel", "4-Panel", "6-Panel", "Wood Dividers", "Fabric-Upholstered Dividers", "Open Decorative Dividers"],
    trendingChips: [
      "4-Panel Carved-Wood Dividers",
      "Velvet-Upholstered Dividers",
      "3-Panel Metal-Frame Dividers",
      "Chinese-Pattern Dividers",
      "Bathroom Dividers",
      "6-Panel Lobby Dividers",
      "Open Decorative Dividers for Apartments",
      "Woven-Bamboo Wood Dividers",
    ],
    productNames: [
      "4-Panel MDF Divider, Carved Chinese Pattern, 180cm Tall",
      "3-Panel Velvet-Upholstered Divider, Oak Frame, 170cm Tall",
      "4-Panel Matte-Black Metal-Frame Divider + Woven Rattan Mesh",
      "6-Panel Hotel-Lobby Divider, Hand-Painted Landscape Scene",
      "3-Panel Natural-Bamboo Divider, 45cm per Panel",
      "4-Panel Paper-Honeycomb Folding Divider, 160cm Tall",
      "5-Panel Mirrored Folding Divider, for Living-Room Decor",
      "4-Panel Aluminum-Frame Folding Divider, Sandblasted Frosted Glass",
    ],
    styles: ["Chinese", "Modern", "Scandinavian", "Industrial", "Vintage"],
    materials: ["MDF", "Oak", "Metal", "Aluminum", "Natural Bamboo", "Velvet"],
    extraFilters: [
      { title: "Number of Panels", options: ["3 Panels", "4 Panels", "5 Panels", "6 Panels"] },
    ],
  },

  "khung-tranh-nghe-thuat": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Indoor Decoration",
    title: "Art Frames",
    resultsCount: "76,520",
    chips: ["Composite Frames", "Wood Frames", "Aluminum Frames", "Canvas Art", "Poster Art", "3-5 Panel Sets"],
    trendingChips: [
      "Abstract Canvas Frames",
      "3-Panel Scandinavian Sets",
      "Oak Wood Frames",
      "Vintage Poster Art",
      "Gold-Plated Composite Frames",
      "Large 120x80 Canvas Art",
      "5-Panel Living-Room Sets",
      "Tabletop Photo Frames",
    ],
    productNames: [
      "Abstract Canvas Frame, 80×120cm, Gold-Plated Composite Border",
      "Set of 3 Scandinavian Frames, 30×40cm, Natural Oak Border",
      "Vintage Poster Frame, A2, Matte-Black Aluminum Border",
      "Set of 5 Living-Room Frames, 50×70cm, Baroque Floral",
      "Composite Frame, Carved Classic Pattern, 60×90cm, Gold-Plated",
      "Tabletop Photo Frame, 10×15cm, Natural Walnut, Set of 4",
      "Slim Art-Deco Canvas Frame, 100×150cm, Gold Border",
      "Set of 4 Abstract Canvas Frames, Navy Tones, 40×60cm",
    ],
    styles: ["Scandinavian", "Neoclassical", "Modern", "Industrial", "Art Deco", "Vintage"],
    materials: ["Composite", "Oak", "Walnut", "Aluminum", "Carved Classic PS"],
    extraFilters: [
      { title: "Size", options: ["A4-A3", "30×40-50×70", "60×90", "80×120", "Over 100cm"] },
    ],
  },

  "do-trang-tri-gom-su": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Indoor Decoration",
    title: "Ceramic Decor",
    resultsCount: "29,310",
    chips: ["Jingdezhen", "Crackle Glaze", "Celadon Glaze", "Hand-Painted", "Decor Sets", "Mini Tabletop"],
    trendingChips: [
      "Crackle-Glaze Jingdezhen Vases",
      "Hand-Painted Ceramic Tea Sets",
      "Guanyin Ceramic Statues",
      "Decorative Wall-Hung Ceramic Plates",
      "Celadon-Glaze Ceramic Vases",
      "Set of 3 Matte Decorative Vases",
      "Ceramic Cat Statue Sets",
      "Cobalt-Glaze Ceramic Boxes",
    ],
    productNames: [
      "Crackle-Glaze Jingdezhen Ceramic Vase, 45cm, Hand-Painted Spring Scene",
      "Hand-Painted Cobalt-Blue Ceramic Tea Set, 1 Pot + 6 Cups",
      "Celadon-Glaze Guanyin Ceramic Statue, 30cm",
      "Decorative Wall-Hung Ceramic Plate, 35cm Diameter, Crackle Glaze",
      "Set of 3 Matte Decorative Vases, Cream, 18-25-32cm",
      "Set of 2 White Ceramic Cat Statues, Handmade Decor, 15cm",
      "Cobalt Blue & White Ceramic Box, Embossed Dragon Lid",
      "Cobalt-Glaze Jingdezhen Ceramic Carp Statue, 25cm, Feng Shui",
    ],
    styles: ["Antique Chinese", "Scandinavian", "Vintage", "Minimalist", "Neoclassical"],
    materials: ["Jingdezhen Porcelain", "Crackle-Glaze Ceramic", "Matte Porcelain", "Celadon Porcelain"],
    extraFilters: [SIZE_FILTER],
  },

  // ===========================================================================
  // Section 2 — Garden decoration (garden-decor)
  // ===========================================================================
  "tuong-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Decoration",
    title: "Garden Statues",
    resultsCount: "27,840",
    chips: ["Stone Lions", "Buddha Statues", "Animal Statues", "Angel Statues", "Abstract Statues", "Carp Statues"],
    trendingChips: [
      "Solid Stone Lion Statues",
      "Outdoor Buddha Statues",
      "Composite Angel Statues",
      "Feng Shui Carp Statues",
      "Metal Golden Deer Statues",
      "Garden Abstract Statues",
      "Granite Qilin Statues",
      "Gate Guardian Statue Sets",
    ],
    productNames: [
      "Solid Granite Lion Statue, 1.2m, Pair for Villa Gates",
      "Outdoor Composite Amitabha Buddha Statue, 1.8m, Metallic Finish",
      "Composite Angel Statue, 80cm, UV-Resistant Outdoor, Stone Base",
      "Feng Shui Faux-Stone Carp Statue, 1m, Gold-Plated Scales",
      "Garden Metal Golden Deer Statue, 1.4m, Brass Finish",
      "Set of 2 Granite Qilin Statues, 80cm, Carved Plinth",
      "Outdoor Fiberglass-Reinforced Abstract Resin Statue, 1.5m",
      "Gate-Mounted Faux-Stone Lion Head Statue, Classic Gold Plating",
    ],
    styles: ["Antique Chinese", "European Classic", "Buddhist", "Modern"],
    materials: ["Granite", "Faux Stone", "GFRC Composite", "Cast Bronze", "Red Copper"],
    extraFilters: [SIZE_FILTER],
  },

  "su-tu-da": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Decoration",
    title: "Stone Lions",
    resultsCount: "9,680",
    chips: ["Granite", "Granite Stone", "Faux Stone", "1m Tall", "1.5m Tall", "Gate Lion Pairs"],
    trendingChips: [
      "Solid Granite Lions",
      "Villa-Gate Stone Lion Pairs",
      "Antique Chinese Stone Lions",
      "G654 Granite Lions",
      "Silver-Glint Stone Lions",
      "Gate-Mounted Lion Heads",
      "1m Chinese Stone Lions",
      "Feng Shui Stone Lions",
    ],
    productNames: [
      "Pair of Solid G654 Granite Lions, 1.2m, Hand-Carved",
      "Red Granite Lion, 1.5m, Cloud-Pattern Carved Plinth",
      "Pair of Faux-Stone Lions, 80cm, Natural-Stone Color Finish",
      "G603 Granite Lion, 1m, Traditional Seated Pose",
      "Gate-Mounted Granite Lion Head, 40cm Diameter, Stainless Steel Hook",
      "Yellow G682 Granite Lion, 1.8m, Dragon-Phoenix Carved Base",
      "Pair of Mini Faux-Stone Lions, 50cm, for Front Steps",
      "Solid Granite Lion, 2.2m, for International Projects",
    ],
    styles: ["Antique Chinese", "Imperial Court", "Classic"],
    materials: ["G654 Granite", "G603 Granite", "Red Granite", "Faux Stone"],
    extraFilters: [
      { title: "Height", options: ["50-80cm", "80-120cm", "120-180cm", "Over 180cm"] },
    ],
  },

  "tuong-phat-ngoai-troi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Decoration",
    title: "Outdoor Buddha Statues",
    resultsCount: "11,230",
    chips: ["Amitabha Buddha", "Guanyin", "Shakyamuni Buddha", "1m Tall", "1.8m Tall", "3m Tall"],
    trendingChips: [
      "Outdoor Composite Amitabha Statues",
      "2m GFRC Guanyin Statues",
      "Seated Meditating Shakyamuni Statues",
      "Granite Buddha Statues",
      "Outdoor Gold-Plated Buddha Statues",
      "3m Temple Buddha Statues",
      "Mini Garden Buddha Statues",
      "Resort Buddha Statues",
    ],
    productNames: [
      "Outdoor GFRC Composite Amitabha Buddha Statue, 1.8m, Granite Finish",
      "Standing Guanyin Bodhisattva Statue, 2.5m, Fiberglass-Reinforced Composite",
      "Seated Meditating Shakyamuni Statue, Solid Granite, 1.2m",
      "Gold-Plated Buddha Statue, 1.5m, Composite Core with PVD Gold",
      "Seated Faux-Stone Buddha Statue, 80cm, for Small Gardens",
      "Resort Buddha Statue, 3m, Antique-Bronze Finish",
      "Mini Garden-Bench Buddha Statue, 60cm, UV-Resistant Composite",
      "White Granite Buddha Statue, 1.6m, Hand-Carved",
    ],
    styles: ["Buddhist", "East Asian", "Classic"],
    materials: ["GFRC Composite", "Granite", "Faux Stone", "Cast Bronze"],
    extraFilters: [
      { title: "Height", options: ["<1m", "1-2m", "2-3m", "Over 3m"] },
    ],
  },

  "tuong-dong-vat": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Decoration",
    title: "Animal Statues",
    resultsCount: "14,560",
    chips: ["Deer Statues", "Carp Statues", "Horse Statues", "Elephant Statues", "Bird Statues", "Qilin Statues"],
    trendingChips: [
      "Outdoor Golden Deer Statues",
      "Feng Shui Carp Statues",
      "Feng Shui Brass Horse Statues",
      "Granite Elephant Statues",
      "Metal Crane Statues",
      "Gate Qilin Statues",
      "Garden Sheep Statues",
      "Stone Eagle Statues",
    ],
    productNames: [
      "Outdoor Golden Deer Statue, 1.4m, Metal with Antique-Brass Finish",
      "Feng Shui Faux-Stone Carp Statue, 1m, Gold-Plated Scales",
      "Set of 3 Feng Shui Brass Horse Statues, 1:8 Scale, 24K Gold Plated",
      "Solid Granite Elephant Statue, 80cm, Pair for Gates",
      "Garden Metal Crane Statue Set, 1.5m, Gold-Brass Tone",
      "Pair of Granite Qilin Statues, 1m, Classic Carved Base",
      "Outdoor White GFRC Composite Sheep Statue, 70cm",
      "Faux-Stone Eagle Statue, 1.2m, 1.5m Wingspan",
    ],
    styles: ["Antique Chinese", "Scandinavian", "Modern", "Classic Bronze"],
    materials: ["GFRC Composite", "Cast Brass", "Faux Stone", "Granite", "Brass-Finished Metal"],
    extraFilters: [SIZE_FILTER],
  },

  "dai-phun-nuoc": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Decoration",
    title: "Fountains",
    resultsCount: "6,420",
    chips: ["3-Tier", "5-Tier", "Round", "Square", "With LED", "GFRC Composite"],
    trendingChips: [
      "3-Tier Round Fountains",
      "Fountains with LED",
      "Outdoor GFRC Fountains",
      "5-Tier Classic Fountains",
      "Villa Fountains",
      "Mini Garden Fountains",
      "Granite Fountains",
      "Fountains with Statues",
    ],
    productNames: [
      "3-Tier GFRC Composite Fountain, Round, 1.8m Diameter, with LED",
      "5-Tier Classic Fountain, 2.4m, Faux-Stone Finish",
      "Mini Garden Fountain, 70cm, with Energy-Saving 35W Submersible Pump",
      "Natural Granite Fountain, 2m Diameter, Hand-Carved Pattern",
      "Fountain with Greek Goddess Statue, 1.8m, GFRC",
      "Modern Square Fountain, 1.5×1.5m, Color-Changing LED Lighting",
      "Leaping-Carp Fountain, 1.6m, with Recirculation System",
      "Stone-Bowl Fountain, 80cm Diameter, for Balconies",
    ],
    styles: ["European Classic", "Antique Chinese", "Modern", "Mediterranean"],
    materials: ["GFRC Composite", "Granite", "Faux Stone", "Composite + LED"],
    extraFilters: [
      { title: "Number of Tiers", options: ["1 Tier", "2 Tiers", "3 Tiers", "5 Tiers"] },
      { title: "LED Lighting", options: ["Color-Changing LED", "White LED", "No LED"] },
    ],
  },

  "den-vuon-led": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Decoration",
    title: "LED Garden Lights",
    resultsCount: "42,310",
    chips: ["Bollard Lights", "Spike Lights", "Flood Lights", "String Lights", "IP65", "IP66"],
    trendingChips: [
      "2m Garden Bollard Lights",
      "304 Stainless Steel Spike Lights",
      "50W IP66 LED Flood Lights",
      "Color-Changing LED Garden Lights",
      "10m LED String Lights",
      "Integrated Solar Garden Lights",
      "LED Reindeer Motif Lights",
      "Hanging Solar Lanterns",
    ],
    productNames: [
      "12W LED Garden Bollard Light, 2m, Matte-Black Powder-Coated Aluminum Housing",
      "304 Stainless Steel Spike Light, 5W LED, IP65, 3000K Warm Light",
      "50W IP66 LED Flood Light, Cast-Aluminum Housing, for Villa Facades",
      "10m Outdoor LED String Light, IP65, 100 Warm-White Bulbs",
      "8W RGB Color-Changing LED Garden Light, Bluetooth App Control",
      "1.2m LED Reindeer Christmas Motif Light, Outdoor IP44",
      "LED Solar Hanging Lantern, Matte-Black Metal Housing, Set of 4",
      "80cm Mushroom-Shape Garden Bollard Light, Brass-Finish Aluminum Housing",
    ],
    styles: ["Modern", "European Classic", "Minimalist", "Industrial"],
    materials: ["Cast-Aluminum Housing", "304 Stainless Steel", "UV-Resistant PC Plastic Housing"],
    extraFilters: [
      { title: "IP Rating", options: ["IP44", "IP65", "IP66", "IP67"] },
      { title: "Power", options: ["3-5W", "5-10W", "10-20W", "20-50W", "Over 50W"] },
      { title: "Power Source", options: ["AC 220V", "Solar", "Rechargeable Battery", "DC 12V"] },
    ],
  },

  "co-banner-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Decoration",
    title: "Decorative Flags & Banners",
    resultsCount: "5,910",
    chips: ["Garden Flags", "Event Banners", "Holiday Flags", "Polyester", "Digital Print", "Flagpoles"],
    trendingChips: [
      "Polyester Garden Flags",
      "Hand-Painted Event Banners",
      "Polyester Christmas Flags",
      "Four-Season Garden Flags",
      "Double-Sided Printed Banners",
      "Koi Windsock Garden Flags",
      "12-Month Garden Flag Sets",
      "Spiral Garden Flagpoles",
    ],
    productNames: [
      "Polyester Garden Flag, 30×45cm, Double-Sided Print, Four-Season Theme",
      "Double-Sided Event Banner, 50×80cm, Oxford 600D Fabric",
      "Set of 12 Monthly Garden Flags, UV-Resistant Polyester, with Spiral Pole",
      "Polyester Christmas Flag, 35×50cm, Fade-Resistant Heat Print, Stainless Steel Hook",
      "Outdoor Vinyl Digital-Print Banner, 1×3m, Waterproof",
      "Koi Windsock Garden Flag, 1.2m, Waterproof Parachute Fabric",
      "Spiral Garden Flagpole, 1m, Powder-Coated Metal",
      "Polyester Halloween Flag, 30×45, 3D Pumpkin Print, Set of 6",
    ],
    styles: ["Holiday", "Four-Season", "Vintage", "Modern"],
    materials: ["Polyester 110D", "Oxford 600D", "Digital-Print Vinyl", "Parachute Fabric"],
    extraFilters: [
      { title: "Occasion", options: ["Christmas", "Halloween", "New Year", "Four-Season", "Events"] },
    ],
  },

  "qua-cau-thuy-tinh-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Decoration",
    title: "Decorative Glass Gazing Balls",
    resultsCount: "4,380",
    chips: ["Reflective", "Silver-Plated", "Iridescent", "20cm", "30cm", "50cm"],
    trendingChips: [
      "Silver-Plated Glass Gazing Balls",
      "Reflective Garden Gazing Balls",
      "Iridescent Glass Gazing Balls",
      "30cm Decorative Gazing Balls",
      "Floating Water Gazing Balls",
      "Set of 3 Garden Decor Gazing Balls",
      "Vintage-Pattern Gazing Balls",
      "Laser-Etched Gazing Balls",
    ],
    productNames: [
      "Reflective Glass Gazing Ball, 30cm, Silver Mirror Plating, Outdoor",
      "Set of 3 Iridescent Plated Glass Gazing Balls, 15-20-25cm, Garden Decor",
      "Floating Water Glass Gazing Ball, 20cm Diameter, Blue Tone",
      "Rainbow-Plated Reflective Gazing Ball, 35cm, for Gate Decor",
      "Laser-Etched Mandala-Pattern Gazing Ball, 25cm Diameter",
      "Classic Antique-Gold Gazing Ball, 30cm, Black Metal Base",
      "Hand-Blown Art-Glass Gazing Ball, 28cm",
      "Thick Chrome-Plated Glass Gazing Ball, 50cm, for Large Gardens",
    ],
    styles: ["Modern", "Vintage", "Bohemian", "Classic"],
    materials: ["Thick Plated Glass", "Hand-Blown Glass", "Plated Acrylic"],
    extraFilters: [
      { title: "Diameter", options: ["<20cm", "20-30cm", "30-40cm", "Over 40cm"] },
    ],
  },

  "phu-dieu-tuong-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Decoration",
    title: "Garden Wall Reliefs",
    resultsCount: "3,760",
    chips: ["PU Reliefs", "Composite Reliefs", "Stone Reliefs", "Classic Patterns", "Modern", "3D"],
    trendingChips: [
      "PU Garden Wall Reliefs",
      "Patterned Composite Reliefs",
      "Faux-Stone Reliefs",
      "Dragon-Phoenix Carved Reliefs",
      "Classic Rose Reliefs",
      "3D Abstract Reliefs",
      "Gate Lion-Face Reliefs",
      "Baroque Angel Reliefs",
    ],
    productNames: [
      "PU Garden Wall Relief, Baroque Roses, 60×90cm, Antique Finish",
      "Composite Dragon-Phoenix Carved Relief, 1×2m, Granite Finish",
      "Faux-Stone Lion-Face Relief, 40cm Diameter",
      "PU Baroque Angel Relief, 80cm Tall, Classic Gold Plating",
      "3D Abstract Composite Relief, 1×1.5m, Metallic Finish",
      "Chinese-Pattern Relief, 60×120cm, Bronze Finish",
      "PU Greek Goddess-Face Relief, 50cm, for Villa Gates",
      "PU Hydrangea Relief, 80×60cm, Vintage-Tone Finish",
    ],
    styles: ["Baroque", "Antique Chinese", "European Classic", "Modern"],
    materials: ["PU Plastic", "GFRC Composite", "Faux Stone", "Cast Stone"],
    extraFilters: [SIZE_FILTER],
  },

  "do-trang-tri-san-golf": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Decoration",
    title: "Golf Course Decor",
    resultsCount: "2,140",
    chips: ["Tee Flags", "Tee Stone Markers", "Golf Benches", "Signage", "Decorative Statues", "Spike Lights"],
    trendingChips: [
      "Polyester Golf Tee Flags",
      "Granite Tee-Box Stone Markers",
      "Waterproof Wood Golf Benches",
      "Stainless Steel Golf Course Signage",
      "Golf Course Decor Statues",
      "Stainless Steel Golf Spike Lights",
      "Yardage Marker Posts",
      "Aluminum Tee Flagpoles",
    ],
    productNames: [
      "Double-Sided Polyester Golf Tee Flag, Logo Print, with 1.8m Aluminum Pole",
      "Granite Tee-Box Stone Marker, Engraved, 30×60cm, Polished Finish",
      "Waterproof Teak Golf Bench, 1.6m, with Hole-Number Plaque",
      "304 Stainless Steel Golf Course Sign, 40×40cm, Laser-Etched",
      "Aluminum Yardage Marker Post, 1.2m, White Powder Coat",
      "Composite Golf Course Decor Statue, Golfer, 60cm",
      "304 Stainless Steel Spike Light, 3W LED, IP65, for Golf Gala Nights",
      "Aluminum Tee Flagpole Set, 1.8m, Stainless Steel Base + Custom-Logo Flag",
    ],
    styles: ["Classic", "Modern", "Luxury"],
    materials: ["304 Stainless Steel", "Granite", "Teak", "Powder-Coated Aluminum"],
    extraFilters: [
      { title: "Product Type", options: ["Flags & Poles", "Markers & Stones", "Benches & Furniture", "Lighting"] },
    ],
  },

  // ===========================================================================
  // Section 3 — Planters & flowerpots (planters)
  // ===========================================================================
  "chau-nhua-pe": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Planters & Flowerpots",
    title: "PE Plastic Planters",
    resultsCount: "63,250",
    chips: ["Round PE Planters", "Square PE Planters", "Rectangular PE Planters", "Hanging Planters", "Faux-Rattan Planters", "With Drainage Holes"],
    trendingChips: [
      "Rectangular PE Balcony Planters",
      "60cm Round PE Planters",
      "50×50cm Square PE Planters",
      "Faux-Rattan PE Planters",
      "Hanging PE Planters",
      "Self-Watering PE Planters",
      "Matte-Gray PE Planters",
      "80cm Black PE Planters",
    ],
    productNames: [
      "Rectangular PE Balcony Planter, 60×20×18cm, with Drainage Holes",
      "Round PE Planter, 60cm Tall, 50cm Diameter, Matte-Gray Finish",
      "Square PE Planter, 50×50×50cm, for Lobby Plants, Real Wood Base",
      "Set of 3 Round Faux-Rattan PE Planters, 25-30-35cm, Balcony Decor",
      "Self-Watering Hanging Balcony PE Planter, 30cm, with Black Metal Hook",
      "Matte-Black PE Planter, 80×30×30cm, for Landscaping",
      "Set of 6 Mini Round PE Planters, 12cm, Cream, Tabletop",
      "UV-Resistant PE Planter, 100×40cm, Black Liner, Column Shape",
    ],
    styles: ["Modern", "Minimalist", "Mediterranean", "Scandinavian"],
    materials: ["Rotomolded PE Plastic", "UV-Resistant PE Plastic", "PE Rattan-Effect"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Shape", options: ["Round", "Square", "Rectangular", "Tall Column", "Hanging"] },
    ],
  },

  "chau-composite-soi-thuy-tinh": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Planters & Flowerpots",
    title: "Composite & Fiberglass Planters",
    resultsCount: "28,940",
    chips: ["GFRC", "Fiberclay", "Fiberglass", "Tall Column", "Large Round", "80cm Square"],
    trendingChips: [
      "Tall GFRC Composite Planters",
      "Round Fiberclay Planters",
      "80cm Fiberglass Planters",
      "Lobby Fiberglass Planters",
      "100cm Tall Landscape Planters",
      "UV-Resistant Composite Planters",
      "Matte-Gray Fiberclay Planters",
      "1.2m Outdoor Composite Planters",
    ],
    productNames: [
      "Tall GFRC Composite Planter, 100cm, 35cm Diameter, Granite Finish",
      "Round Fiberclay Planter, 60cm Diameter, 50cm Tall, Matte-Gray Tone",
      "Fiberglass Planter, 80cm Tall, 50cm Diameter, for Hotel Lobbies",
      "UV-Resistant Square Composite Planter, 80×80×80cm, with Drainage + Saucer",
      "Terracotta-Tone Tang Fiberclay Planter, 80×40cm, for Large Bonsai",
      "Granite-Vein GFRC Composite Planter, 1.2m, for Villa Landscaping",
      "Set of 2 Navy-Tone Column Composite Planters, 80-100cm Tall",
      "Fiberglass Planter, 1.5m Diameter, 60cm Tall, for Large Palms",
    ],
    styles: ["Modern", "Minimalist", "Mediterranean", "Industrial"],
    materials: ["GFRC Composite", "Fiberclay", "GRP Fiberglass"],
    extraFilters: [
      SIZE_FILTER,
      { title: "UV Resistance", options: ["UV-Resistant", "Standard"] },
    ],
  },

  "chau-gom-su": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Planters & Flowerpots",
    title: "Ceramic Planters",
    resultsCount: "37,620",
    chips: ["Jingdezhen", "Crackle Glaze", "Celadon Glaze", "Hand-Painted", "30cm Diameter", "50cm Diameter"],
    trendingChips: [
      "40cm Jingdezhen Ceramic Planters",
      "Antique Crackle-Glaze Ceramic Planters",
      "Celadon Orchid Planters",
      "Hand-Painted Cobalt Ceramic Planters",
      "Set of 3 Decorative Ceramic Planters",
      "Bonsai Ceramic Planters",
      "Jingdezhen Blue & White Ceramic Planters",
      "White Matte Tabletop Ceramic Planters",
    ],
    productNames: [
      "Hand-Painted Jingdezhen Ceramic Planter, 40cm Diameter, 35cm Tall",
      "Antique Crackle-Glaze Ceramic Planter, 50cm Diameter, Cobalt-Blue Pattern",
      "Celadon-Glaze Ceramic Planter, 30cm Diameter, for Phalaenopsis Orchids",
      "Set of 3 Matte Cream Ceramic Planters, 12-15-18cm, Tabletop Decor",
      "Hand-Painted Dragon-Phoenix Ceramic Planter, 60cm Diameter, for Large Plants",
      "Jingdezhen Cobalt Blue & White Ceramic Planter, 35cm Diameter, 30cm Tall",
      "Mini Bonsai Ceramic Planter, 12cm Diameter, Celadon Glaze, Set of 6",
      "Terracotta-Tone Tang Ceramic Planter, 45cm Diameter, Hand-Carved Vein",
    ],
    styles: ["Antique Chinese", "Scandinavian", "Neoclassical", "Minimalist"],
    materials: ["Jingdezhen Porcelain", "Crackle-Glaze Ceramic", "Matte Porcelain", "Celadon Porcelain"],
    extraFilters: [
      { title: "Diameter", options: ["<20cm", "20-30cm", "30-50cm", "50-80cm", "Over 80cm"] },
    ],
  },

  "chau-xi-mang": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Planters & Flowerpots",
    title: "Cement Planters",
    resultsCount: "14,380",
    chips: ["Square", "Round", "Tall Column", "Wood Base", "Gray Tone", "Terracotta Tone"],
    trendingChips: [
      "50cm Square Cement Planters",
      "80cm Tall Column Cement Planters",
      "40cm Round Cement Planters",
      "Wood-Base Cement Planters",
      "Minimalist Decor Cement Planters",
      "Set of 3 Cement Planters",
      "Terracotta-Tone Cement Planters",
      "Ultra-Light GFRC Cement Planters",
    ],
    productNames: [
      "Square Cement Planter, 50×50×50cm, Matte-Gray Finish, with Drainage",
      "Tall Column Cement Planter, 80cm, 30cm Diameter, Minimalist Shape",
      "Round Cement Planter, 40cm, 35cm Tall, Terracotta Tone, Teak Wood Base",
      "Set of 3 Square Cement Planters, 15-20-25cm, Tabletop Decor",
      "Ultra-Light GFRC Cement Planter, 80×80cm Square, 60% Lighter",
      "Bowl-Shape Cement Planter, 60cm Diameter, 25cm Tall, Gray Tone",
      "Square Landscape Cement Planter, 1×1×0.6m, Crack-Resistant",
      "Mini Hexagon Cement Planter, 15cm, Set of 6, Decor",
    ],
    styles: ["Minimalist", "Industrial", "Modern", "Brutalist"],
    materials: ["Cast Cement", "Ultra-Light GFRC Cement", "Polymer Cement"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Weight", options: ["Standard", "Ultra-Light GFRC"] },
    ],
  },

  "chau-inox-kim-loai": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Planters & Flowerpots",
    title: "Stainless Steel & Metal Planters",
    resultsCount: "9,840",
    chips: ["304 Stainless Steel", "PVD Gold Stainless Steel", "Galvanized Steel", "Red Copper", "Wood Base", "Square"],
    trendingChips: [
      "Tall 304 Stainless Steel Planters",
      "PVD Gold-Plated Stainless Steel Planters",
      "Vintage Galvanized Planters",
      "Wood-Base Metal Planters",
      "50cm Stainless Steel Planters",
      "40cm Square Stainless Steel Planters",
      "Patina Red-Copper Planters",
      "Hotel-Lobby Stainless Steel Planters",
    ],
    productNames: [
      "Tall 304 Stainless Steel Planter, 100cm, 35cm Diameter, Hairline Finish",
      "PVD Gold-Plated Stainless Steel Planter, 40×40cm Square, for Luxury Lobbies",
      "Vintage Galvanized Planter, 50cm Round, with Carry Handles",
      "Teak Wood-Base Metal Planter, 35cm Diameter, 30cm Tall",
      "304 Stainless Steel Planter, 60cm Diameter, 60cm Tall, Brushed Hairline",
      "Classic Patina Red-Copper Planter, 30×30cm Square, Lobby Decor",
      "Set of 3 PVD Gold Stainless Steel Planters, 18-25-32cm, Premium Apartment Decor",
      "304 Stainless Steel Hexagon Planter, 50cm Diameter, for Building Lobbies",
    ],
    styles: ["Modern", "Industrial", "Luxury", "Vintage"],
    materials: ["304 Stainless Steel", "PVD Gold Stainless Steel", "Galvanized Steel", "Red Copper"],
    extraFilters: [
      { title: "Finish", options: ["Hairline", "Mirror Polished", "PVD Gold Plated", "Antique Patina"] },
    ],
  },

  "bon-trong-tu-tuoi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Planters & Flowerpots",
    title: "Self-Watering Planters",
    resultsCount: "8,130",
    chips: ["Balcony", "Square", "Rectangular", "Wick System", "Water-Level Indicator", "30cm Tall"],
    trendingChips: [
      "Self-Watering Balcony Planters",
      "60cm Rectangular Self-Watering Planters",
      "Planters with Water-Level Indicator",
      "Wick-System Self-Watering Planters",
      "Multi-Tier Vertical Self-Watering Planters",
      "Family Vegetable Self-Watering Planters",
      "Strawberry Self-Watering Planters",
      "40cm Round Self-Watering Planters",
    ],
    productNames: [
      "Rectangular Self-Watering Balcony Planter, 60×20×18cm, Wick System + Water-Level Indicator",
      "3-Tier Vertical Self-Watering Planter, 90cm, for Family Balcony Vegetable Gardens",
      "Round Self-Watering Planter, 40cm, 35cm Tall, 5L Reservoir Core",
      "Rectangular Self-Watering Planter, 1m × 25cm × 25cm, for Year-Round Vegetables",
      "Square Rooftop Self-Watering Planter, 50×50cm, 25L Water Capacity",
      "Set of 3 Hexagon Self-Watering Planters, 25cm, Decor + Ornamental Plants",
      "Hanging Strawberry Self-Watering Balcony Planter, 6 Planting Pockets",
      "Vertical Self-Watering Planter, 8 Pockets, 1.4m Tall",
    ],
    styles: ["Modern", "Minimalist", "Vertical Garden"],
    materials: ["Virgin PP Plastic", "PE Plastic", "Composite"],
    extraFilters: [
      { title: "Water Reservoir Capacity", options: ["<5L", "5-10L", "10-25L", "Over 25L"] },
      { title: "Configuration", options: ["1 Compartment", "2 Compartments", "Multi-Tier Vertical", "Multi-Pocket Hanging"] },
    ],
  },

  "gia-do-chau": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Planters & Flowerpots",
    title: "Plant Stands",
    resultsCount: "11,620",
    chips: ["Metal", "Wood", "3-Tier", "5-Tier", "Corner Stand", "Ceiling-Hung"],
    trendingChips: [
      "3-Tier Metal Plant Stands",
      "Scandinavian Wood Plant Stands",
      "Corner Plant Stands",
      "Black Metal Plant Stands",
      "Ceiling-Hung Plant Stands",
      "Tall 5-Tier Plant Stands",
      "Foldable Plant Stands",
      "Mini Tabletop Plant Stands",
    ],
    productNames: [
      "3-Tier Metal Plant Stand, 75cm, Matte-Black Powder Coat",
      "Scandinavian Oak 4-Tier Plant Stand, Zig-Zag Shape, 110cm",
      "5-Tier Corner Metal Plant Stand, 1.4m, for Balconies",
      "Ceiling-Hung Stainless Steel + Rope 3-Tier Stand, for Climbing-Plant Decor",
      "Mini 2-Tier Tabletop Plant Stand, Gold-Brass Metal",
      "Foldable Pine-Wood Ladder Plant Stand, 1.6m",
      "Industrial Black Pipe Plant Stand, 4-Tier, Wall-Mounted",
      "Modular Plant Stand, Stackable Modules, 25cm per Tier",
    ],
    styles: ["Scandinavian", "Industrial", "Modern", "Vintage"],
    materials: ["Powder-Coated Metal", "Pine Wood", "Oak", "304 Stainless Steel"],
    extraFilters: [
      { title: "Number of Tiers", options: ["1-2 Tiers", "3 Tiers", "4 Tiers", "5+ Tiers"] },
      { title: "Mounting Type", options: ["Floor-Standing", "Corner", "Wall-Mounted", "Ceiling-Hung"] },
    ],
  },

  "treo-tran-treo-tuong": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Planters & Flowerpots",
    title: "Ceiling & Wall Hanging Planters",
    resultsCount: "13,420",
    chips: ["Macramé", "Metal Hooks", "Drainage Base", "With Cord", "Window-Hung", "Climbing Plants"],
    trendingChips: [
      "Cotton Macramé Hanging Planters",
      "Metal-Hook Hanging Planters",
      "Balcony Hanging Planters",
      "Climbing-Plant Hanging Planters",
      "Set of 3 Macramé Planters",
      "1m Ceiling Hanging Planters",
      "Vertical Wall Hanging Planters",
      "Hanging Planters with Drainage Saucer",
    ],
    productNames: [
      "Handmade Cotton Macramé Hanging Planter, 80cm, with 18cm Ceramic Pot",
      "PE Plastic Balcony Hanging Planter, 25cm Diameter, Black Metal Hook",
      "Cone-Shape Climbing-Plant Hanging Planter, 60cm, with 1m Parachute Cord",
      "Set of 3 Mini Cotton Macramé Planters, Cream, 30-50-70cm",
      "Vertical Wall Hanging Planter, 30×60cm Module, 6 Planting Pockets",
      "304 Stainless Steel Ceiling Hanging Planter, 30cm Diameter, 1.2m Stainless Cord",
      "Pear-Shape Ceramic Ceiling Hanging Planter, 25cm, Twisted Cotton Cord",
      "Mini Window Hanging Planter, Set of 4, 50cm Cowhide Cord",
    ],
    styles: ["Bohemian", "Scandinavian", "Modern", "Tropical"],
    materials: ["Cotton Macramé", "304 Stainless Steel", "PE Plastic", "Ceramic"],
    extraFilters: [
      { title: "Hanging Type", options: ["Ceiling-Hung", "Wall-Hung", "Window-Hung", "Balcony-Hung"] },
      { title: "Pot Diameter", options: ["<15cm", "15-25cm", "25-35cm", "Over 35cm"] },
    ],
  },

  // ===========================================================================
  // Section 4 — Garden tools (garden-tools)
  // ===========================================================================
  "may-cat-co": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Tools",
    title: "Lawn Mowers",
    resultsCount: "18,420",
    chips: ["Handheld", "Self-Propelled", "Robotic", "2-Stroke", "4-Stroke", "Lithium Battery"],
    trendingChips: [
      "52cc 2-Stroke Handheld Mowers",
      "Self-Propelled Mowers",
      "Robotic Lawn Mowers",
      "21V Lithium-Battery Mowers",
      "139cc 4-Stroke Mowers",
      "Hardened-Steel Mower Blades",
      "AC Electric Mowers",
      "Backpack Mowers",
    ],
    productNames: [
      "52cc 2-Stroke Handheld Mower, 1.9kW, Anti-Vibration Handle",
      "139cc 4-Stroke Self-Propelled Mower, 51cm Cutting Width, 60L Grass Box",
      "Robotic Lawn Mower, 28cm Cutting Width, 5Ah Lithium Battery, App Control",
      "21V Brushless Lithium-Battery Mower, 2 x 4Ah Batteries + Fast Charger",
      "Honda GX35 4-Stroke Backpack Mower, with 3 Blade Types",
      "1.6kW AC Electric Mower, for Home Gardens, 10m Power Cord",
      "Hardened-Steel Mower Blade, 3mm Thick, 25cm Diameter, Set of 5",
      "56cc 5-in-1 Hybrid Mower, with Cutting Blade + Hedge Trimmer",
    ],
    styles: ["Residential Use", "Professional Use", "Landscaping Use"],
    materials: ["ABS Plastic Housing", "Carbon-Steel Blade", "Metal Frame"],
    extraFilters: [
      { title: "Power Source", options: ["2-Stroke Gas", "4-Stroke Gas", "Lithium Battery", "AC Electric"] },
      { title: "Power", options: ["<1kW", "1-1.5kW", "1.5-2.5kW", "Over 2.5kW"] },
      { title: "Certification", options: ["CE", "EPA", "Euro V"] },
    ],
  },

  "keo-dao-lam-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Tools",
    title: "Garden Shears & Knives",
    resultsCount: "32,510",
    chips: ["Pruning Shears", "Hedge Shears", "Hand Saws", "Lithium Battery", "Long Handle", "Garden Knives"],
    trendingChips: [
      "60cm Long-Handle Pruning Shears",
      "Two-Handed Hedge Shears",
      "21V Battery Pruning Shears",
      "35cm Curved Pruning Saws",
      "Hydraulic Pruning Shears",
      "Bonsai Pruning Shears",
      "Multi-Purpose Garden Knives",
      "Set of 6 Garden Shears & Knives",
    ],
    productNames: [
      "SK5-Blade Pruning Shears, 60cm Long Handle, 32mm Cutting Capacity",
      "Two-Handed Hedge Shears, 65cm Aluminum-Alloy Handle, 25cm Blade",
      "21V Lithium-Battery Pruning Shears, 30mm Cutting Capacity, 2 x 2Ah Batteries",
      "35cm Curved Pruning Saw, Japanese SK5 Steel, Anti-Slip Rubber Handle",
      "Ratchet Hydraulic Pruning Shears, 4x Force Multiplication, up to 40mm",
      "Set of 6 Stainless Steel Bonsai Shears, Premium Cowhide Case",
      "Hori-Hori Garden Knife, 304 Stainless Steel, Serrated Blade, Leather Sheath",
      "Set of 6 Japanese-Steel Garden Shears & Knives, Canvas Case",
    ],
    styles: ["Professional", "Residential", "Bonsai"],
    materials: ["SK5 Steel", "304 Stainless Steel", "Carbon Steel", "Japanese Alloy"],
    extraFilters: [
      { title: "Cutting Mechanism", options: ["Bypass", "Anvil", "Ratchet", "Battery/Electric"] },
      { title: "Cutting Diameter", options: ["<15mm", "15-25mm", "25-35mm", "Over 35mm"] },
    ],
  },

  "cuoc-xeng-cao": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Tools",
    title: "Hoes, Shovels & Rakes",
    resultsCount: "15,840",
    chips: ["Wood Handle", "Fiberglass Handle", "Hardened-Steel Head", "Set of 3", "Mini Bonsai", "Leaf Rakes"],
    trendingChips: [
      "3-Piece Hoe, Shovel & Rake Sets",
      "Fiberglass-Handle Digging Shovels",
      "Hardened-Steel Field Hoes",
      "Multi-Purpose Leaf Rakes",
      "Mini Bonsai Tool Sets",
      "Long-Handle Planting Shovels",
      "14-Tine Steel Rakes",
      "5-Piece Garden Sets",
    ],
    productNames: [
      "3-Piece Carbon-Steel Hoe, Shovel & Rake Set, 1.2m Ash-Wood Handle",
      "Fiberglass-Handle Digging Shovel, 1.2m, Forged-Steel Head",
      "1.5kg Hardened-Steel Field Hoe, 1.2m Oil-Finished Ash-Wood Handle",
      "Multi-Purpose 22-Tine Leaf Rake, 1.65m Aluminum Handle",
      "Set of 9 Stainless Mini Bonsai Tools, Leather Case",
      "Long-Handle Planting Shovel, 1.4m, 4mm Forged Steel",
      "14-Tine Steel Rake, Fiberglass Handle, for Soil Digging, 1.4m",
      "5-Piece Aluminum-Handle Garden Set: Hoe, Shovel, Rake, Trowel, Pickaxe",
    ],
    styles: ["Professional", "Residential", "Bonsai"],
    materials: ["Forged Carbon Steel", "304 Stainless Steel", "Ash-Wood Handle", "Fiberglass Handle", "Aluminum Handle"],
    extraFilters: [
      { title: "Handle Type", options: ["Wood", "Fiberglass", "Aluminum", "Steel"] },
      { title: "Product Set", options: ["Individual", "Set of 3", "Set of 5", "Set of 9+"] },
    ],
  },

  "may-phun-thuoc": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Tools",
    title: "Sprayers",
    resultsCount: "9,380",
    chips: ["Shoulder-Carried", "Handheld", "Lithium Battery", "Manual", "High-Pressure", "16L Capacity"],
    trendingChips: [
      "16L Shoulder-Carried Sprayers",
      "12V Battery Sprayers",
      "5L Manual Sprayers",
      "High-Pressure Sprayers",
      "20L Backpack Sprayers",
      "60cm Brass Spray Wands",
      "Bosch-Battery Sprayers",
      "Mini Pressure Sprayers",
    ],
    productNames: [
      "16L Shoulder-Carried Sprayer, 12V Lithium Battery, 60cm Brass Wand",
      "5L Manual High-Pressure Sprayer, Adjustable Spray-Pattern Nozzle",
      "20L Backpack Sprayer, 26cc 2-Stroke Gas Engine",
      "1.5L Handheld Mini Sprayer, 7.4V Lithium Battery, USB Charging",
      "18L Shoulder-Carried Sprayer, 12V Electric, Auto-Mixing System",
      "8L Manual Pressure Sprayer, 80cm 304 Stainless Steel Wand",
      "35cc 4-Stroke Gas Backpack Sprayer, 18L Capacity",
      "Sprayer Set: 16L Unit + 4 Spray Wands + 2 Fast-Charge Batteries",
    ],
    styles: ["Professional", "Residential", "Mini"],
    materials: ["HDPE Tank", "304 Stainless Steel Wand", "Brass Wand"],
    extraFilters: [
      { title: "Capacity", options: ["<2L", "2-8L", "8-16L", "16-20L", "Over 20L"] },
      { title: "Power Source", options: ["Manual", "12V Lithium Battery", "18V Lithium Battery", "2-Stroke Gas"] },
    ],
  },

  "may-xoi-dat": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Tools",
    title: "Tillers",
    resultsCount: "5,640",
    chips: ["2-Stroke Gas", "4-Stroke Gas", "Lithium Battery", "Mini", "139cc", "196cc"],
    trendingChips: [
      "4-Stroke Gas Mini Tillers",
      "196cc Self-Propelled Tillers",
      "Lithium-Battery Tillers",
      "Hardened-Alloy Tiller Blades",
      "Multi-Purpose Tillers",
      "52cc Mini Tillers",
      "Honda GX160 Tillers",
      "6.5HP Tillers",
    ],
    productNames: [
      "139cc 4-Stroke Gas Mini Tiller, 35cm Working Width",
      "196cc Self-Propelled Tiller, 6.5HP, 60cm Width, 2-Speed Gearbox",
      "56V Brushless Lithium-Battery Tiller, 30cm Width",
      "52cc 2-Stroke Handheld Tiller, with 4 Tilling Blades",
      "Honda GX160 5.5HP Tiller, Pneumatic Tires, 50cm Width",
      "43cc Mini Tiller, for Small Home Gardens, 5-Function Multi-Purpose",
      "Hardened SK5-Alloy Tiller Blade, 4mm Thick, Set of 6, 30cm Diameter",
      "9HP Tiller, 80cm Working Width, for Farms",
    ],
    styles: ["Residential", "Semi-Professional", "Farm"],
    materials: ["SK5 Blade", "Steel Frame", "Cast-Aluminum Housing"],
    extraFilters: [
      { title: "Power", options: ["<3HP", "3-5HP", "5-7HP", "Over 7HP"] },
      { title: "Power Source", options: ["2-Stroke Gas", "4-Stroke Gas", "Lithium Battery"] },
    ],
  },

  "binh-tuoi-voi-tuoi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Tools",
    title: "Watering Cans & Hose Nozzles",
    resultsCount: "21,840",
    chips: ["5L Watering Cans", "10L Watering Cans", "Shower Nozzles", "Spray Guns", "360° Swivel Nozzles", "Drip Systems"],
    trendingChips: [
      "5L Plastic Watering Cans",
      "360° Swivel Shower Nozzles",
      "8-Mode Spray Guns",
      "7L Stainless Steel Watering Cans",
      "Auto Timer Hose Nozzles",
      "30m Drip Irrigation Systems",
      "Gentle Baby-Flow Shower Nozzles",
      "1L Mini Decorative Watering Cans",
    ],
    productNames: [
      "5L Plastic Watering Can, Detachable Rose Head, for Plants and Balconies",
      "360° Swivel Shower Nozzle, Rust-Resistant Zinc Alloy, 12cm Diameter",
      "8-Mode Spray Gun, ABS Alloy + Soft Rubber",
      "7L 304 Stainless Steel Watering Can, Integrated Rose Head",
      "AAA-Battery Auto Timer Hose Nozzle, Day + Time Scheduling",
      "30m Drip Irrigation System with 30 Drippers + Filter + Splitter",
      "Gentle Baby-Flow Shower Nozzle, Soft 8-Hole Plastic Head, for Watering Seeds",
      "600ml Mini Ceramic Watering Can, Swan Shape, Decor + Watering",
    ],
    styles: ["Residential", "Decor", "Professional"],
    materials: ["PP Plastic", "304 Stainless Steel", "Zinc Alloy", "EPDM Rubber"],
    extraFilters: [
      { title: "Can Capacity", options: ["<2L", "2-5L", "5-10L", "Over 10L"] },
      { title: "Product Type", options: ["Watering Can", "Shower Nozzle", "Spray Gun", "Drip System", "Timer"] },
    ],
  },

  "gang-tay-lam-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Tools",
    title: "Garden Gloves",
    resultsCount: "12,450",
    chips: ["Cowhide", "PU-Coated", "Latex", "Thorn-Resistant", "With Claws", "Set of 6 Pairs"],
    trendingChips: [
      "Cowhide Garden Gloves",
      "Thorn-Resistant PU Gloves",
      "Claw Gloves",
      "Waterproof Latex Gloves",
      "Long-Cuff Rose-Pruning Gloves",
      "Set of 6 Pairs of Gloves",
      "Nitrile Foam Gloves",
      "Level-5 Cut-Resistant Gloves",
    ],
    productNames: [
      "Knit-Cuff Cowhide Garden Gloves, 30cm Long, Thorn-Resistant for Shrubs",
      "PU-Coated Cotton-Liner Gloves, Level-4 Thorn Resistance, Box of 12 Pairs",
      "Claw Gloves, 8 Hard-Plastic Claws, for Hand Digging",
      "Waterproof + Chemical-Resistant Latex Gloves, 35cm Knit Cuff",
      "Cowhide Rose-Pruning Gloves, 45cm Long, Reinforced Forearm Layer",
      "Oil-Resistant Nitrile Foam-Coated Gloves, Set of 6 Pairs, Assorted Colors",
      "Level-5 Cut-Resistant HPPE + Nitrile Gloves, for Pruning",
      "Set of 6 Pairs of Women's Garden Gloves, Fashion Floral Print",
    ],
    styles: ["Professional", "Residential", "Women's Fashion"],
    materials: ["Cowhide", "PU-Coated", "Latex", "Nitrile Foam", "Cut-Resistant HPPE"],
    extraFilters: [
      { title: "Thorn Resistance", options: ["Standard", "Level-4 Thorn-Resistant", "Level-5 Cut-Resistant"] },
      { title: "Length", options: ["Short Cuff", "Medium Knit Cuff", "Long Knit Cuff 30+", "45cm Gauntlet Cuff"] },
    ],
  },

  "phu-tung-dung-cu": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Garden Tools",
    title: "Tool Parts & Accessories",
    resultsCount: "8,940",
    chips: ["Mower Blades", "Trimmer Line", "Spark Plugs", "Air Filters", "Carburetors", "Batteries & Chargers"],
    trendingChips: [
      "Hardened-Steel Mower Blades",
      "2.4mm Nylon Trimmer Line",
      "Mower Spark Plugs",
      "2-Stroke Engine Air Filters",
      "Honda Carburetors",
      "21V 4Ah Lithium Batteries",
      "Chainsaw Chains",
      "Multi-Line Trimmer Heads",
    ],
    productNames: [
      "Hardened SK5-Steel Mower Blade, 3mm Thick, 25cm Diameter, Set of 5",
      "2.4mm Nylon Trimmer Line, 100m Reel, Twisted Square Profile",
      "NGK BPMR7A Mower Spark Plug, for 25-52cc 2-Stroke Engines",
      "Foam Air Filter for 2-Stroke Engines, for 36-52cc Mowers, Set of 5",
      "Genuine OEM Honda GX35 Carburetor",
      "21V 4Ah Lithium Battery, Genuine Samsung Cells, for Mowers + Pruning Shears",
      "16-inch Chainsaw Chain, 0.325in, 1.5mm, 66 Links",
      "Multi-Line Auto-Feed Trimmer Head, M10 Left-Hand Thread",
    ],
    styles: ["OEM", "Genuine", "Multi-Brand Compatible"],
    materials: ["SK5 Steel", "Copolymer Nylon", "Copper + Insulation"],
    extraFilters: [
      { title: "Part Type", options: ["Cutting Blades", "Trimmer Line", "Engine Parts", "Batteries & Chargers"] },
    ],
  },

  // ===========================================================================
  // Section 5 — Outdoor lighting (lighting-outdoor)
  // ===========================================================================
  "den-solar-san-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor Lighting",
    title: "Solar Garden Lights",
    resultsCount: "55,420",
    chips: ["Solar Bollard Lights", "Solar Spike Lights", "Solar Flood Lights", "Solar String Lights", "IP65", "IP66"],
    trendingChips: [
      "8W IP65 Solar Garden Lights",
      "1.8m Solar Bollard Lights",
      "Stainless Steel Solar Spike Lights",
      "60W Solar Flood Lights",
      "10m 100-Bulb Solar String Lights",
      "Motion-Sensor Solar Lights",
      "RGB Color-Changing Solar Lights",
      "Hanging Solar Lanterns",
    ],
    productNames: [
      "8W IP65 LED Solar Garden Light, 3.7V 2400mAh Li-ion Battery",
      "1.8m Solar Bollard Light, Aluminum Housing, Integrated 6V/3W Mono Panel",
      "304 Stainless Steel Solar Spike Light, 1W LED, 3000K Warm Light, Set of 6",
      "60W IP66 Solar Flood Light, Detachable 6V 25W Mono Panel + Remote",
      "10m 100-LED Warm-White Solar String Light, 8 Flash Modes",
      "Motion-Sensor Solar Light, 36 LEDs, IP65, Wall-Mounted",
      "5W RGB Color-Changing LED Solar Light, Bluetooth App Control",
      "Handmade Vintage Hanging Solar Lantern, Black Metal Housing, Set of 4",
    ],
    styles: ["Modern", "European Classic", "Vintage", "Minimalist"],
    materials: ["Cast-Aluminum Housing", "304 Stainless Steel", "UV-Resistant PC Plastic Housing"],
    extraFilters: [
      { title: "IP Rating", options: ["IP44", "IP65", "IP66", "IP67"] },
      { title: "Power", options: ["1-3W", "3-8W", "8-30W", "30-60W", "Over 60W"] },
      { title: "Battery", options: ["NiMH 600mAh", "Li-ion 1500mAh", "Li-ion 2400mAh", "Li-ion 4800mAh"] },
    ],
  },

  "den-pha-led-ngoai-troi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor Lighting",
    title: "Outdoor LED Flood Lights",
    resultsCount: "38,620",
    chips: ["10W", "30W", "50W", "100W", "200W", "IP66"],
    trendingChips: [
      "50W IP66 LED Flood Lights",
      "100W Outdoor LED Flood Lights",
      "200W Stadium LED Flood Lights",
      "Bridgelux-Chip COB LED Flood Lights",
      "Sensor LED Flood Lights",
      "30W IP65 LED Flood Lights",
      "RGB LED Flood Lights",
      "Solar LED Flood Lights",
    ],
    productNames: [
      "50W IP66 LED Flood Light, Black Cast-Aluminum Housing, Bridgelux 5050 Chip",
      "100W IP66 LED Flood Light, SMD 2835 Chip, 50,000-Hour Lifespan",
      "200W Stadium LED Flood Light, 22,000lm, IP66",
      "30W COB LED Flood Light, US Bridgelux Chip, 0-10V Dimmable",
      "30W LED Flood Light, 12m PIR Motion Sensor, IP65",
      "50W RGB LED Flood Light, App + Remote, 16M Colors, IP65",
      "60W Solar LED Flood Light, Detachable Panel, 12000mAh Lithium Battery",
      "150W LED Flood Light, for Warehouses, IK10 Impact-Resistant",
    ],
    styles: ["Industrial", "Modern", "Stadium"],
    materials: ["Cast-Aluminum Housing", "Powder-Coated Aluminum Housing", "Tempered Glass"],
    extraFilters: [
      { title: "Power", options: ["10-30W", "30-50W", "50-100W", "100-200W", "Over 200W"] },
      { title: "IP Rating", options: ["IP65", "IP66", "IP67", "IP68"] },
      { title: "Power Source", options: ["AC 220V", "DC 24V", "Integrated Solar"] },
    ],
  },

  "den-cam-co": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor Lighting",
    title: "Spike Lights",
    resultsCount: "24,130",
    chips: ["304 Stainless Steel", "Aluminum Housing", "3W LED", "5W LED", "Solar", "With Sensor"],
    trendingChips: [
      "304 Stainless Steel Spike Lights",
      "Solar LED Spike Lights",
      "Aluminum-Housing Spike Lights",
      "Plant-Lighting Spike Lights",
      "Sensor Spike Lights",
      "12V DC Spike Lights",
      "3000K Warm Spike Lights",
      "Set of 6 Spike Lights",
    ],
    productNames: [
      "304 Stainless Steel Spike Light, 3W LED, IP65, 3000K Warm Light, Set of 6",
      "Matte-Black Aluminum Spike Light, 5W, IP66, 24° Beam",
      "304 Stainless Steel Solar Spike Light, Integrated Mono Panel, 1500mAh Battery",
      "Plant-Lighting Spike Light, 12V DC, 7W, IP67, with Controller",
      "PIR Motion-Sensor Spike Light, 5m Range, Rechargeable Battery, IP65",
      "Salt-Resistant 316 Stainless Steel Spike Light, for Beach Resorts, 3W, IP67",
      "Uplight Wall-Washing Spike Light, 9W, IP65, 60° Beam",
      "Mini Decorative Spike Light, 1W Warm White, Set of 10, IP44",
    ],
    styles: ["Modern", "Minimalist", "Industrial"],
    materials: ["304 Stainless Steel", "316 Stainless Steel", "Cast-Aluminum Housing"],
    extraFilters: [
      { title: "Power", options: ["1-3W", "3-5W", "5-9W", "Over 9W"] },
      { title: "Power Source", options: ["AC 220V", "DC 12V", "Solar"] },
    ],
  },

  "den-canh-quan-day": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor Lighting",
    title: "String Landscape Lights",
    resultsCount: "31,420",
    chips: ["5m String", "10m String", "20m String", "S14 G40", "Fairy Lights", "IP44"],
    trendingChips: [
      "10m Outdoor LED String Lights",
      "25-Bulb S14 Vintage String Lights",
      "G40 Cafe Garden String Lights",
      "20m Fairy String Lights",
      "100-Bulb Solar LED String Lights",
      "Outdoor Icicle String Lights",
      "8-Mode Color-Changing LED String Lights",
      "Warm-White IP65 String Lights",
    ],
    productNames: [
      "10m Outdoor LED String Light, 100 Warm-White Bulbs, IP65, AC Plug",
      "25-Bulb S14 Vintage String Light, E27 1W LED, 7.5m, IP44",
      "G40 Cafe Garden String Light, 15m, 30 1W LED Bulbs, Plug + Extendable",
      "20m Fairy String Light, 200 Copper-Filament LEDs, IP44 Decorative",
      "100-Bulb Solar LED String Light, 12m, 8 Flash Modes, IP65",
      "5m Outdoor Icicle String Light, 96 LEDs, Rain Curtain, IP44",
      "10m RGB LED String Light, 60 Bulbs, App Control, IP65",
      "30m Warm-White String Light, 300 Bulbs, IP65, for Festival Decor",
    ],
    styles: ["Vintage", "Cafe Garden", "Modern", "Holiday"],
    materials: ["Heat-Resistant PVC Housing", "Copper-Filament Wire", "Silicone Housing"],
    extraFilters: [
      { title: "Length", options: ["<5m", "5-10m", "10-20m", "Over 20m"] },
      { title: "Power Source", options: ["AC 220V Plug", "Solar", "Battery", "USB DC"] },
    ],
  },

  "den-chieu-cay": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor Lighting",
    title: "Tree Lights",
    resultsCount: "12,840",
    chips: ["Uplight", "Spotlight", "12W", "18W", "24V DC", "IP66"],
    trendingChips: [
      "18W Tree-Base Lights",
      "IP66 Tree Uplights",
      "12V Tree Spotlights",
      "Copper-Housing Tree Lights",
      "24° Beam Tree Lights",
      "Dimmable Tree Lights",
      "RGB Tree Lights",
      "Solar Tree Lights",
    ],
    productNames: [
      "18W Tree-Base Light, IP66, Black Aluminum Housing, 24° Beam",
      "30cm Tree Uplight, 12W, Cree Chip, Spike + Base",
      "12V DC Tree Spotlight, 7W, IP67, 0-10V Dimmer",
      "Patina Copper-Housing Tree Light, 9W, 3000K Warm, Vintage Style",
      "24V DC Tree Light, 24W, 60° Beam, for Large 4-6m Trees",
      "RGB Tree Light, 18W, App + Remote, 16M Colors, IP66",
      "Solar Tree Light, 8W, Detachable Panel, for 3-4m Trees",
      "Tree-Lighting Kit: 6 Lights 9W 12V + 60W Transformer + 30m Cable",
    ],
    styles: ["Modern", "Vintage", "Minimalist"],
    materials: ["Cast-Aluminum Housing", "Patina Copper Housing", "316 Stainless Steel"],
    extraFilters: [
      { title: "Power", options: ["3-9W", "9-18W", "18-30W", "Over 30W"] },
      { title: "Power Source", options: ["AC 220V", "DC 12V", "DC 24V", "Solar"] },
      { title: "Beam Angle", options: ["15° Narrow", "24°", "38°", "60° Wide"] },
    ],
  },

  "den-motif-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor Lighting",
    title: "Decorative Motif Lights",
    resultsCount: "9,520",
    chips: ["Christmas Motifs", "Reindeer Motifs", "Star Motifs", "Letter Motifs", "Animal Motifs", "Arch Motifs"],
    trendingChips: [
      "LED Reindeer Christmas Motifs",
      "3D Star Motifs",
      "Gateway Arch Motifs",
      "LOVE Letter Motifs",
      "Garden Animal Motifs",
      "Paper-Flower Motifs",
      "Street-Festival Motifs",
      "RGB Controllable Motifs",
    ],
    productNames: [
      "1.2m LED Reindeer Christmas Motif, 240 Warm-White LEDs, IP44",
      "3D Star Motif, 60cm Diameter, 200 LEDs, Gate-Mounted",
      "Gateway Arch Motif, 2.5×3m, 1,500 LEDs, for Events",
      "LOVE Letter Motif, 50cm, Warm-White LED, IP44",
      "Sheep Animal Motif, 1m, Warm LED, for Year-Round Garden Use",
      "Large Paper-Flower Motif, 80cm Diameter, RGB App Control",
      "Street-Festival Motif, Pole-Mounted, 3m, 2000lm LED",
      "Reindeer + Sleigh Motif, 600 LEDs, for Christmas",
    ],
    styles: ["Holiday", "Event Gateway Arch", "Modern", "Kids"],
    materials: ["Powder-Coated Metal Frame", "Galvanized Steel-Wire Frame", "RGB LED 5050 Chip"],
    extraFilters: [
      { title: "Occasion", options: ["Christmas", "New Year", "Halloween", "Wedding Events", "Year-Round Street"] },
    ],
  },

  // ===========================================================================
  // Section 6 — Household & sundries (household)
  // ===========================================================================
  "san-pham-to-chuc-tu": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Household & Sundries",
    title: "Closet Organizers",
    resultsCount: "33,620",
    chips: ["Drawer Organizers", "Divider Boxes", "Sorting Trays", "Fabric", "PP Plastic", "Set of 6"],
    trendingChips: [
      "Plastic Drawer Organizers",
      "Folding Clothes Divider Boxes",
      "Underwear Sorting Trays",
      "Set of 6 Organizer Boxes",
      "Kitchen Cabinet Organizers",
      "Desk Drawer Organizers",
      "Bathroom Cabinet Organizer Trays",
      "Shoe Cabinet Organizers",
    ],
    productNames: [
      "Modular PP Plastic Drawer Organizer Set, 6 Flexible Interlocking Compartments",
      "Set of 6 Foldable Non-Woven Fabric Clothes Divider Boxes",
      "24-Compartment Underwear Sorting Tray, 600D Fabric, Folds Flat When Not in Use",
      "Set of 6 Clear PP Plastic Kitchen Cabinet Organizers, 2.5L",
      "Plastic Desk Drawer Organizer, 8 Separate Compartments, L+T Interlocking",
      "Waterproof PP Plastic Bathroom Cabinet Organizer Tray, 4 Compartments",
      "Set of 6 Clear PP Stackable Lidded Shoe Cabinet Organizers",
      "Set of 4 Waterproof Canvas Travel Packing Cubes",
    ],
    styles: ["Minimalist", "Modern", "Scandinavian"],
    materials: ["PP Plastic", "Non-Woven Fabric", "Canvas 600D Fabric", "Natural Bamboo"],
    extraFilters: [
      { title: "Area of Use", options: ["Wardrobe", "Desk Drawer", "Kitchen Cabinet", "Bathroom Cabinet", "Shoe Cabinet"] },
    ],
  },

  "hop-dung-do": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Household & Sundries",
    title: "Storage Boxes",
    resultsCount: "47,840",
    chips: ["Clear PP Boxes", "Stackable Boxes", "Fabric Boxes", "Wood Boxes", "With Lid", "Foldable"],
    trendingChips: [
      "Set of 5 PP Plastic Storage Boxes",
      "Clear Lidded Storage Boxes",
      "Foldable Fabric Storage Boxes",
      "Kids' Toy Storage Boxes",
      "Stackable Storage Boxes",
      "Large 50L Storage Boxes",
      "Storage Boxes with Wheels",
      "Industrial Stainless Steel Storage Boxes",
    ],
    productNames: [
      "Set of 5 PP Plastic Storage Boxes, 5L-10L-20L-30L-50L, Locking Lids",
      "Clear PP Storage Box, 30L, Stacks 5 High, with Wheels",
      "Foldable Canvas 600D Storage Box, 38×38×38cm, with Lid",
      "Kids' Toy PP Plastic Storage Box, Cartoon Print, 28L",
      "Set of 4 Clear PP Stackable Storage Boxes, 5L, for Bathroom Cabinets",
      "Extra-Large 70L Storage Box, Locking Lid, for Seasonal Clothing",
      "Under-Bed Storage Box with Wheels, 35L, Clear PP",
      "Industrial 304 Stainless Steel Storage Box, 60L, Safety Lock",
    ],
    styles: ["Minimalist", "Modern", "Scandinavian", "Kids"],
    materials: ["PP Plastic", "Canvas 600D Fabric", "304 Stainless Steel", "Bamboo"],
    extraFilters: [
      { title: "Capacity", options: ["<5L", "5-15L", "15-30L", "30-50L", "Over 50L"] },
      { title: "Features", options: ["Locking Lid", "Stackable", "Foldable", "With Wheels", "Clear"] },
    ],
  },

  "moc-treo-ke-tuong": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Household & Sundries",
    title: "Hooks & Wall Shelves",
    resultsCount: "26,150",
    chips: ["Adhesive Hooks", "Screw-Mount Hooks", "Wall-Mounted Shelves", "Bathroom Shelves", "304 Stainless Steel", "ABS Plastic"],
    trendingChips: [
      "5kg Adhesive Wall Hooks",
      "304 Stainless Steel Screw-Mount Hooks",
      "3-Tier Wood + Iron Wall Shelves",
      "Adhesive Bathroom Shelves",
      "Over-Door Hooks",
      "Hexagon Wall Shelves",
      "Stainless Steel Kitchen-Cabinet Hooks",
      "Set of 6 Adhesive Hooks",
    ],
    productNames: [
      "5kg Adhesive Wall Hook, ABS Plastic, Set of 6, No Drilling",
      "304 Stainless Steel U-Shaped Screw-Mount Hook, 15kg Load, for Home Gardens",
      "3-Tier Pine-Wood + Iron Industrial Wall Shelf, 60×60cm",
      "2-Tier Adhesive Bathroom Shelf, 304 Stainless Steel, 40cm Long",
      "Over-Door Hook, 6 Prongs, Powder-Coated Steel, No Drilling",
      "Set of 6 Hexagon Wood + Iron Wall Shelves, Decor + Storage",
      "Set of 10 Adhesive 304 Stainless Steel Hooks, for Kitchen Cabinets",
      "Wall-Mounted Microwave Shelf, 304 Stainless Steel, 25kg Load",
    ],
    styles: ["Industrial", "Scandinavian", "Minimalist"],
    materials: ["304 Stainless Steel", "ABS Plastic", "Pine Wood + Iron", "Zinc Alloy"],
    extraFilters: [
      { title: "Mounting Method", options: ["3M Adhesive", "Screw-Mount", "Over-Door"] },
      { title: "Area", options: ["Bathroom", "Kitchen Cabinet", "Living Room", "Back of Door"] },
    ],
  },

  "tui-vai-gio-dung": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Household & Sundries",
    title: "Fabric Bags & Baskets",
    resultsCount: "19,420",
    chips: ["Cotton", "Canvas 12oz", "Non-Woven", "With Handles", "Foldable", "Multi-Purpose"],
    trendingChips: [
      "Foldable Cotton Fabric Baskets",
      "Canvas 12oz Shopping Bags",
      "Rattan Toy Baskets",
      "Logo-Printed Non-Woven Bags",
      "Cotton Laundry Baskets",
      "Printed Canvas Tote Bags",
      "Dirty-Laundry Baskets",
      "Multi-Purpose Zippered Bags",
    ],
    productNames: [
      "Foldable Cotton + Steel Fabric Basket, 38×38×38cm, with Lid + Handles",
      "Canvas 12oz Shopping Bag, OEM Logo Print, 60cm Long Handles",
      "Kids' Toy Basket, Woven Rattan, 35cm",
      "Non-Woven Fabric Bag, 80g, 4-Color Print, 40×30cm",
      "Cotton + Iron Laundry Basket, 65cm Tall, with Lid + Wheels",
      "Handmade Painted Canvas Tote Bag, 38×42cm",
      "Foldable Mesh Dirty-Laundry Basket, 65L, 2 Sorting Compartments",
      "Multi-Purpose Zippered Canvas 600D Bag, 45L Capacity",
    ],
    styles: ["Scandinavian", "Vintage", "Modern", "Bohemian"],
    materials: ["100% Cotton", "Canvas 12oz", "Non-Woven 80g", "Woven Rattan", "Mesh Fabric"],
    extraFilters: [
      { title: "Function", options: ["Shopping", "Toy Storage", "Laundry", "Decor", "Travel"] },
    ],
  },

  "san-pham-giat-la": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Household & Sundries",
    title: "Laundry Products",
    resultsCount: "14,380",
    chips: ["Drying Racks", "Laundry Baskets", "Clothespins", "Stainless Steel Racks", "Foldable Racks", "With Wheels"],
    trendingChips: [
      "Foldable Stainless Steel Drying Racks",
      "3-Tier Drying Racks with Wheels",
      "Cotton Laundry Baskets",
      "Set of 30 Clothespins",
      "Wall-Mounted Balcony Drying Racks",
      "Small X-Style Folding Racks",
      "3-Compartment Laundry Sorters",
      "16-Prong Sock Hangers",
    ],
    productNames: [
      "Foldable 2-Tier 304 Stainless Steel Drying Rack, 1.6m Long, 30kg Load",
      "3-Tier 304 Stainless Steel Drying Rack with Wheels, Folds to 50cm Wide",
      "Cotton + Iron Laundry Basket, 65L, with Lid + Handles",
      "Set of 30 PP Plastic Clothespins, Stainless Steel Springs",
      "Wall-Mounted Retractable Aluminum Balcony Drying Rack, 1.4m",
      "Small X-Style Folding 304 Stainless Steel Rack, for Apartment Balconies",
      "3-Compartment Canvas + Iron Laundry Sorter",
      "16-Prong ABS Plastic Sock Hanger, Stainless Steel Spring Clips",
    ],
    styles: ["Minimalist", "Industrial", "Modern"],
    materials: ["304 Stainless Steel", "Retractable Aluminum", "ABS Plastic", "Cotton + Iron"],
    extraFilters: [
      { title: "Product Type", options: ["Drying Rack", "Laundry Basket", "Clothespins", "Sock Hanger"] },
      { title: "Location", options: ["Floor", "Wall-Mounted Balcony", "Ceiling", "Mobile with Wheels"] },
    ],
  },

  "san-pham-ve-sinh-nha-cua": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Household & Sundries",
    title: "Home Cleaning Products",
    resultsCount: "23,640",
    chips: ["Mops", "Brooms", "Microfiber Cloths", "Spray Bottles", "Cloth Caddies", "Cleaning Sets"],
    trendingChips: [
      "360° Spin Mops",
      "Steam Mops",
      "Dust-Free Brooms",
      "Set of 6 Microfiber Cloths",
      "Foaming Spray Bottles",
      "6-Piece Multi-Purpose Cleaning Sets",
      "Double-Sided Magnetic Window Cleaners",
      "Anti-Static Dust Brooms",
    ],
    productNames: [
      "360° Self-Wringing Spin Mop, Microfiber Head, Set of 4 Replacements",
      "1500W Steam Mop, 350ml Tank, for Sanitizing",
      "Dust-Free Broom, Synthetic Fiber + 1.2m Aluminum Handle",
      "Set of 6 Microfiber Cloths, 30×30cm, 300gsm, Multi-Purpose",
      "Foaming Spray Bottle, PP Plastic, 500ml, for Soap + Chemicals",
      "6-Piece Multi-Purpose Cleaning Set: Mop + Broom + Cloth + Wringer Bucket",
      "Double-Sided Magnetic Window Cleaner, for High-Rise Apartment Windows",
      "Anti-Static Dust Broom, Wood + Synthetic Fiber, 80cm Long",
    ],
    styles: ["Modern", "Minimalist"],
    materials: ["Microfiber", "ABS Plastic", "Retractable Aluminum", "304 Stainless Steel"],
    extraFilters: [
      { title: "Product Type", options: ["Mop", "Broom", "Cloth", "Spray Bottle", "Multi-Purpose Set"] },
    ],
  },

  // ===========================================================================
  // Section 7 — Gifts & crafts (festive)
  // ===========================================================================
  "qua-tang-thu-cong-noel": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Gifts & Crafts",
    title: "Christmas Gifts & Crafts",
    resultsCount: "84,620",
    chips: ["Christmas Trees", "Door Wreaths", "Ornaments", "Christmas LED Lights", "Reindeer Figures", "Decor Sets"],
    trendingChips: [
      "1.8m PVC Christmas Trees",
      "Handmade Christmas Door Wreaths",
      "50-Piece Tree Decoration Sets",
      "Set of 24 Christmas Ornaments",
      "10m IP44 Christmas LED Lights",
      "Reindeer Door-Decor Figures",
      "2.1m Pre-Lit Christmas Trees",
      "Handmade Christmas Stockings",
    ],
    productNames: [
      "1.8m PVC Christmas Tree, 1,200 Branches, Metal Base, Gift Box",
      "Handmade Christmas Door Wreath, 50cm Diameter, Pine + Ornaments",
      "50-Piece Tree Decoration Set: Ornaments + Ribbon + Topper + Garland",
      "Set of 24 Christmas Ornaments, 6cm Diameter, Matte Gold, Gift Box",
      "10m Christmas LED String Light, 100 Warm-White Bulbs, IP44, Plug",
      "Set of 3 Reindeer Door-Decor Figures, 30-50-70cm",
      "2.1m Pre-Lit Christmas Tree, 350 Built-In Warm LEDs",
      "Set of 6 Handmade Velvet Christmas Stockings, Personalized Embroidery",
    ],
    styles: ["Traditional Red & Gold", "Scandinavian White", "Vintage", "Glam Gold", "Rustic"],
    materials: ["PVC", "Felt + Fabric", "Resin", "LED 5050"],
    extraFilters: [
      { title: "Product Type", options: ["Christmas Trees", "Door Wreaths", "LED Lights", "Ornaments", "Decor Figures"] },
      { title: "Tree Height", options: ["1.2-1.5m", "1.8-2.1m", "2.4-3m", "Over 3m"] },
    ],
  },

  "do-thu-cong-halloween": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Gifts & Crafts",
    title: "Halloween Crafts",
    resultsCount: "32,140",
    chips: ["LED Pumpkins", "Resin Ghost Figures", "Spider Webs", "Spooky LED Lights", "Masks", "Door Decor Sets"],
    trendingChips: [
      "LED Plastic Halloween Pumpkins",
      "Resin Ghost Figures",
      "Decorative Spider Webs",
      "Orange-Purple Halloween LED Lights",
      "Rubber Halloween Masks",
      "Halloween Door Decor Sets",
      "Halloween Door Wreaths",
      "Inflatable Garden Pumpkins",
    ],
    productNames: [
      "LED Plastic Halloween Pumpkin, 25cm Diameter, Orange-Yellow Glow",
      "Handmade Resin Ghost Figure, 50cm, Built-In LED Light",
      "Halloween Spider Web Decoration, 3.6×3.6m + 100 Plastic Spiders",
      "Orange + Purple Halloween LED String Light, 10m, 100 Bulbs, IP44",
      "Latex Rubber Halloween Mask, Zombie Design, 8 Styles",
      "8-Piece Halloween Door Decor Set: Pumpkin + Ghost + Spider Web",
      "Halloween Door Wreath, 45cm Diameter, with LED + Pumpkins",
      "Inflatable Garden Pumpkin, 2.4m, with LED + 12V Fan",
    ],
    styles: ["Traditional Orange & Black", "Glam", "Fun Kids", "Spooky"],
    materials: ["PE Plastic", "Resin", "Mesh Fabric", "Latex Rubber"],
    extraFilters: [
      { title: "Product Type", options: ["Pumpkins", "Ghost Figures", "Spider Webs", "LED Lights", "Masks"] },
    ],
  },

  "do-tiec-trang-tri-su-kien": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Gifts & Crafts",
    title: "Party & Event Decorations",
    resultsCount: "41,620",
    chips: ["Balloons", "Birthday Banners", "Foil Balloons", "Flower Arches", "Confetti", "Paper Cups & Plates"],
    trendingChips: [
      "Happy Birthday Balloon Sets",
      "1m Number Foil Balloons",
      "Artificial Flower Event Backdrops",
      "Vintage Birthday Banners",
      "Confetti Party Sets",
      "Themed Paper Cups & Plates",
      "Baby Shower Balloon Sets",
      "Artificial Flower Wedding Backdrops",
    ],
    productNames: [
      "Happy Birthday Balloon Set, 50 Balloons + Banner + Ribbon, Gold & Black Theme",
      "1m Number Foil Balloon, Helium-Grade, with LED Fill",
      "Artificial Flower Event Backdrop, 2.5m, Silk Flowers + Green Foliage",
      "Vintage Birthday Banner, Kraft Paper + Ribbon, Name + Age Printing",
      "Confetti Party Set, 5 Colors, 1,000 Pieces + 6 Poppers",
      "Baby Shower Paper Cup & Plate Set, 60 Pieces, 4 Pastel Colors",
      "Baby Shower Balloon Set, 70 Balloons, 4 Sizes + Arch Kit",
      "Artificial Flower Wedding Backdrop, 2×2.4m, High Flower Density + Iron Base",
    ],
    styles: ["Vintage", "Pastel", "Glam Gold", "Boho Wedding", "Kids"],
    materials: ["Latex", "Mylar/Foil", "Silk Flowers", "Kraft Paper"],
    extraFilters: [
      { title: "Event Type", options: ["Birthday", "Wedding", "Baby Shower", "Graduation", "Year-End Party"] },
    ],
  },

  "thu-cong-nhua-resin": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Gifts & Crafts",
    title: "Resin Crafts",
    resultsCount: "12,840",
    chips: ["Resin Statues", "Resin Frames", "Resin Jewelry", "Resin Coasters", "Gold-Plated", "Multicolor"],
    trendingChips: [
      "Resin Angel Statue Crafts",
      "Handmade Resin Art Frames",
      "Gold-Plated Resin Coasters",
      "Epoxy Resin Jewelry",
      "Tabletop Resin Statues",
      "Mini Resin Animal Decor",
      "Preserved Dried-Flower Resin",
      "Resin Lucky-Cat Trio Sets",
    ],
    productNames: [
      "Handmade Resin Angel Statue Craft, 30cm, Metallic Gold Finish",
      "Handmade Resin Art Frame, A4, Gold Border + Embedded Pearls",
      "Set of 6 Gold-Plated Epoxy Resin Coasters, 10cm Diameter",
      "Epoxy Resin Jewelry Set Including Ring + Necklace + Earrings",
      "Set of 3 Resin Lion + Elephant + Horse Tabletop Statues",
      "Set of 6 Mini Resin Animal Decor, 8-12cm, for Terrariums",
      "Epoxy Resin Vase with Preserved Pink Roses + Baby's Breath",
      "Set of 3 Pearl-Gold Maneki-Neko Lucky-Cat Resin Statues, 18cm",
    ],
    styles: ["Modern", "Vintage", "Glam Gold", "Scandinavian"],
    materials: ["Epoxy Resin", "Polyester Resin", "Resin + Embedded Pearls"],
    extraFilters: [
      { title: "Product Type", options: ["Decor Statues", "Art Frames", "Coasters", "Jewelry", "Vases"] },
    ],
  },

  "thu-cong-kim-loai": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Gifts & Crafts",
    title: "Metal Crafts",
    resultsCount: "9,310",
    chips: ["Cast Brass", "Art Iron", "Decorative Stainless Steel", "Gold-Plated", "Antique Patina", "Wall Art"],
    trendingChips: [
      "Metal Wall Art",
      "Cast Brass Decor",
      "Art Iron Wall Art",
      "Mini Metal Statues",
      "Brass Tea Sets",
      "Artistic Metal Hooks",
      "Metal Art Frames",
      "Handmade Metal Lamps",
    ],
    productNames: [
      "Hand-Cut Metal Wall Art, 80×120cm, Antique Patina Finish",
      "Handmade Cast Brass Statue, 40cm, Solid Brass Finish",
      "Hand-Forged Art Iron Wall Art, 1×1m, Floral Design",
      "Mini Metal Tabletop Decor Statue, 25cm, Red-Copper Tone",
      "Handmade Cast Brass Tea Set with 6 Cups, Gift Box",
      "Set of 6 S-Shaped Artistic Metal Hooks, Gold Finish",
      "Hand-Cut Metal Art Frame, 60cm Diameter",
      "Handmade Industrial Cage-Style Metal Lamp, 60cm",
    ],
    styles: ["Industrial", "Vintage", "Neoclassical", "Scandinavian"],
    materials: ["Cast Brass", "Wrought Iron", "Hand-Cut 304 Stainless Steel", "Gold-Plated Alloy"],
    extraFilters: [
      { title: "Finish", options: ["Antique Brass", "Patina", "PVD Gold Plated", "Matte-Black Powder Coat"] },
    ],
  },

  "thu-cong-go": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Gifts & Crafts",
    title: "Wood Crafts",
    resultsCount: "11,520",
    chips: ["Pyrography", "Hand-Carved Wood", "Natural Wood", "Cutting Board Sets", "Decor Trays", "Wood Art"],
    trendingChips: [
      "Pyrography Wood Crafts",
      "Hand-Carved Wood Art",
      "Olive-Wood Cutting Board Sets",
      "Decor Wood Trays",
      "Handmade Wood Statues",
      "Natural Wood Boxes",
      "Walnut Wood Decor",
      "Carved Wood Hooks",
    ],
    productNames: [
      "Pyrography Wood Craft, Fire-Etched Art, 30×40cm, Pine Wood",
      "Italian Olive-Wood Cutting Board Set, 3 Pieces, Decor + Functional",
      "Handmade Walnut Decor Tray, 40×25cm, Linseed-Oil Finish",
      "Handmade Hand-Carved Teak Decor Statue, 35cm",
      "Natural Ash-Wood Decor Box with Lid, 25×15×10cm",
      "Hand-Carved Wood Art, 40×60cm, Mountain Scene, Oil Finish",
      "Set of 3 Solid Walnut Cat Decor Pieces",
      "Hand-Carved Wood Hook, 6 Prongs, 50cm Long",
    ],
    styles: ["Scandinavian", "Rustic", "Vintage", "East Asian"],
    materials: ["Pine Wood", "Walnut", "Teak", "Italian Olive Wood", "Ash Wood"],
    extraFilters: [
      { title: "Wood Type", options: ["Pine", "Ash", "Teak", "Walnut", "Olive"] },
    ],
  },

  // ===========================================================================
  // Section 8 — Outdoor living & patio (outdoor-living)
  // ===========================================================================
  "ban-ghe-san-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor Living & Patio",
    title: "Garden Furniture Sets",
    resultsCount: "47,320",
    chips: ["PE Rattan", "Aluminum", "Teak", "4-Seat Sets", "6-Seat Sets", "Sectional Sofas"],
    trendingChips: [
      "4-Seat PE Rattan Sets",
      "6-Seat Aluminum Sofa Sets",
      "8-Seat Teak Garden Sets",
      "L-Shape Outdoor Sectional Sofas",
      "Aluminum + Textilene Chair Sets",
      "6-Seat Outdoor Dining Tables",
      "Aluminum Sun Loungers",
      "Set of 4 Outdoor Bar Chairs",
    ],
    productNames: [
      "4-Seat PE Rattan Set + Tempered-Glass Table, Waterproof Cushions",
      "6-Seat L-Shape Aluminum + PE Rattan Sofa Set, Rain-Resistant Olefin Cushions",
      "8-Seat Teak Garden Set — 2.4m Table + 8 Indonesian Folding Teak Chairs",
      "L-Shape Outdoor Sectional Rattan Sofa, 7 Seats + Glass Coffee Table",
      "4-Seat Aluminum + Textilene Dining Set, for Resorts + Villas",
      "6-Seat Outdoor Dining Table, Aluminum Legs + UV-Resistant HPL Top",
      "Foldable Aluminum + Textilene Sun Lounger, with Headrest",
      "Set of 4 PE Rattan Outdoor Bar Chairs + Aluminum-Leg High Table",
    ],
    styles: ["Modern", "Scandinavian", "Mediterranean", "Resort"],
    materials: ["PE Rattan + Aluminum", "Cast Aluminum", "Indonesian Teak", "316 Stainless Steel + Textilene"],
    extraFilters: [
      { title: "Number of Seats", options: ["2 Seats", "4 Seats", "6 Seats", "8 Seats", "10+ Seats"] },
      { title: "Set Type", options: ["Dining Set", "Sofa", "L-Shape Sectional", "Sun Lounger", "Bar Set"] },
    ],
  },

  "o-du-leu-bai": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor Living & Patio",
    title: "Umbrellas & Tents",
    resultsCount: "16,940",
    chips: ["Cantilever Umbrellas", "Center-Pole Umbrellas", "Event Tents", "Camping Tents", "3m Diameter", "With LED"],
    trendingChips: [
      "3m Cross-Base Garden Umbrellas",
      "3.5m Hand-Crank Cantilever Umbrellas",
      "Waterproof 3×3m Event Tents",
      "4-Person Rain-Resistant Camping Tents",
      "4m Umbrellas with LED",
      "3m Cantilever Parasols",
      "2×2m Beach Pop-Up Tents",
      "Fixed Outdoor Resort Umbrellas",
    ],
    productNames: [
      "3m Garden Umbrella, Cross Base, 250D Polyester Fabric",
      "3.5m Cantilever Hand-Crank Umbrella, Anthracite-Painted Aluminum Finish",
      "3×3m Event Tent, Powder-Coated Steel Frame, Oxford 600D Fabric",
      "4-Person Double-Layer Camping Tent, 3000mm Rain Resistance, Double Door",
      "4m Umbrella with 32 Warm-White LEDs, Rechargeable Battery",
      "3×4m Half-Moon Cantilever Parasol, 70kg Granite Base",
      "2×2m Beach Pop-Up Tent, UPF50 UV-Resistant, with Anchor Stakes",
      "Fixed Resort Umbrella, 3m Tall, In-Ground Concrete Base, 4m Diameter",
    ],
    styles: ["Resort", "Scandinavian", "Modern"],
    materials: ["250D Polyester Fabric", "Oxford 600D Fabric", "Sunbrella Fabric", "Aluminum Frame", "Steel Frame"],
    extraFilters: [
      { title: "Diameter", options: ["<2.5m", "2.5-3m", "3-3.5m", "3.5-4m", "Over 4m"] },
      { title: "Base Type", options: ["Cross Base", "Offset Cantilever", "Center-Pole", "In-Ground Concrete Base"] },
    ],
  },

  "bep-bbq-ngoai-troi": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor Living & Patio",
    title: "Outdoor BBQ Grills",
    resultsCount: "8,640",
    chips: ["Charcoal", "Gas", "Electric", "With Smoker", "304 Stainless Steel", "60cm Diameter"],
    trendingChips: [
      "Stainless Steel Charcoal BBQ Grills",
      "4-Burner Gas BBQ Grills",
      "Outdoor Electric BBQ Grills",
      "BBQ Grills with Smoker",
      "Mobile-Leg BBQ Grills",
      "57cm Kettle BBQ Grills",
      "Ceramic Kamado BBQ Grills",
      "Fixed Outdoor BBQ Grills",
    ],
    productNames: [
      "304 Stainless Steel Charcoal BBQ Grill, 60cm Diameter, with Lid + Thermometer",
      "4-Burner Gas BBQ Grill, 430 Stainless Steel, 80×40cm Surface, for Resorts",
      "2200W Outdoor Electric BBQ Grill, Non-Stick Grate, for Balconies",
      "Charcoal BBQ Grill with Smoker, 1.2m Tall, 304 Stainless Steel",
      "Mobile-Leg BBQ Grill, Stainless Steel Wheels, Stainless Pot + Glass Lid",
      "57cm Kettle BBQ Grill, Epoxy Paint, with Stainless Grate + Steel Legs",
      "18-inch Ceramic Kamado BBQ Grill, Heat-Resistant to 400°C",
      "Fixed Outdoor 304 Stainless Steel BBQ Grill, 80×60cm, with Storage Cabinet",
    ],
    styles: ["Resort", "Modern", "Classic Kettle"],
    materials: ["304 Stainless Steel", "430 Stainless Steel", "Kamado Ceramic", "Heat-Resistant Epoxy Paint"],
    extraFilters: [
      { title: "Fuel Type", options: ["Charcoal", "Gas", "Electric", "Pellet"] },
      { title: "Grilling Surface Size", options: ["<40cm", "40-55cm", "55-70cm", "Over 70cm"] },
    ],
  },

  "be-boi-phao-spa": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor Living & Patio",
    title: "Inflatable Pools & Spas",
    resultsCount: "6,430",
    chips: ["3m Pools", "4.5m Pools", "Inflatable Spas", "4-Person Spas", "Metal Frame", "Filter Systems"],
    trendingChips: [
      "3m Family Inflatable Pools",
      "4.5m Metal-Frame Pools",
      "6-Person Inflatable Spas",
      "4-Person Air-Jet Spas",
      "Rectangular Kids' Pools",
      "Portable Inflatable Spas",
      "In-Ground Composite Pools",
      "1HP Pool Filters",
    ],
    productNames: [
      "3m Family Inflatable Pool, 76cm Deep, 3-Layer PVC",
      "4.5m × 1.2m Deep Metal-Frame Pool, with 0.5HP Filter",
      "6-Person Inflatable Spa, 2m Diameter, 130-Bubble Massage System",
      "4-Person Portable Inflatable Spa, 1.85m, Heats to 40°C",
      "Rectangular Kids' Pool, 2.6×1.6×0.65m, 3-Layer PVC",
      "800L Portable Inflatable Spa, with Pump + Cover + Chemical Kit",
      "In-Ground Composite Pool, 4×3m, 1.5m Deep, Fiberglass + GFRC",
      "1HP Sand + Ozone Pool Filter, for Pools up to 50m³ of Water",
    ],
    styles: ["Family", "Resort", "Kids"],
    materials: ["3-Layer PVC", "Epoxy-Painted Metal Frame", "Composite Fiberglass"],
    extraFilters: [
      { title: "Size", options: ["<3m", "3-4m", "4-5m", "Over 5m"] },
      { title: "Type", options: ["Inflatable Pool", "Frame Pool", "Portable Spa", "In-Ground Composite Pool"] },
    ],
  },

  "nha-kinh-trong-cay": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor Living & Patio",
    title: "Greenhouses",
    resultsCount: "4,820",
    chips: ["Mini 2×3m", "Medium 3×4m", "Large 6×8m", "Aluminum Frame", "Steel Frame", "PE/PC"],
    trendingChips: [
      "Mini 2×3m PE Greenhouses",
      "3×4m Aluminum-Frame Greenhouses",
      "Twin-Wall PC Greenhouses",
      "Family Vegetable Greenhouses",
      "1×2m Balcony Greenhouses",
      "6×8m Agricultural Greenhouses",
      "Multi-Span Greenhouses",
      "Greenhouses with Irrigation Systems",
    ],
    productNames: [
      "Mini PE Greenhouse, 2×3×2.1m, Galvanized Steel Frame, for Home Gardens",
      "Aluminum-Frame Greenhouse, 3×4×2.4m, 6mm Twin-Wall PC Roof",
      "Twin-Wall PC Greenhouse, 4×6×2.5m, with Sliding Door + Vent Window",
      "Balcony Greenhouse, 1×2×1.8m PE, for Year-Round Vegetables",
      "Agricultural Greenhouse, 6×8×3m, Galvanized Steel Frame + PE Film",
      "Multi-Span Greenhouse, 8×30m, Steel Frame, with Mist Irrigation",
      "Greenhouse with Drip Irrigation + Exhaust Fan, 4×6m",
      "Tunnel Greenhouse, 5×10m PE Film, for Strawberries + Leafy Vegetables",
    ],
    styles: ["Family", "Semi-Professional", "Farm"],
    materials: ["Galvanized Steel Frame", "Aluminum Frame", "Twin-Wall PC Sheet", "PE Film"],
    extraFilters: [
      { title: "Area", options: ["<5m²", "5-15m²", "15-50m²", "Over 50m²"] },
      { title: "Roof Material", options: ["PE Film", "Twin-Wall PC Sheet", "Solid PC Sheet", "Tempered Glass"] },
    ],
  },

  "xe-day-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Outdoor Living & Patio",
    title: "Garden Carts",
    resultsCount: "5,320",
    chips: ["4-Wheel", "1-Wheel", "Removable Tub", "Mesh Sides", "200kg Load", "300kg Load"],
    trendingChips: [
      "4-Wheel 200kg Garden Carts",
      "1-Wheel Steel Wheelbarrows",
      "Garden Carts with Dump Tub",
      "Foldable Carts",
      "Mesh-Side Carts",
      "24V Electric Carts",
      "Landscape Warehouse Carts",
      "Flat-Free Pneumatic-Tire Carts",
    ],
    productNames: [
      "4-Wheel Garden Cart, 200kg Load, 90L PE Tub, Folding Pull Handle",
      "1-Wheel Powder-Coated Steel Wheelbarrow, 100L Tub, 150kg Load",
      "Garden Cart with Removable Dump Tub, for Manure and Soil",
      "Foldable 4-Wheel Cart, Oxford 600D Fabric, 100kg Load",
      "4-Wheel Mesh-Side Cart, 300kg Load, for Farms",
      "24V Electric Cart, 200kg Load, 30Ah Lithium Battery, 25° Climb",
      "Landscape Warehouse Cart, 4-Wheel, Rigid Handle, 350kg Load",
      "Flat-Free 16-inch Pneumatic-Tire Cart, Solid PU Tires, 150kg Load",
    ],
    styles: ["Family", "Semi-Professional", "Farm"],
    materials: ["Powder-Coated Steel Frame", "PE Tub", "Oxford 600D Fabric", "Solid PU Wheels"],
    extraFilters: [
      { title: "Load Capacity", options: ["<100kg", "100-200kg", "200-300kg", "Over 300kg"] },
      { title: "Wheel Type", options: ["1-Wheel (Wheelbarrow)", "2-Wheel", "4-Wheel", "Motorized"] },
    ],
  },

  // ===========================================================================
  // Overview-card cross-sections — By area of use
  // ===========================================================================
  "trang-tri-trong-nha": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Decoration by Area",
    title: "Indoor Decoration",
    resultsCount: "184,620",
    chips: [
      "Decorative Statues",
      "Vases & Vessels",
      "Artificial Green Walls",
      "Canvas Art Frames",
      "Decorative Clocks",
      "Decorative Mirrors",
    ],
    trendingChips: [
      "Jade Buddha Statues",
      "Jingdezhen Ceramic Vases",
      "60×60 Artificial Green Walls",
      "Abstract Art Frames",
      "Round Scandinavian Mirrors",
      "Ceramic Table Lamps",
      "Tabletop Resin Objects",
      "Lucky-Cat Trio Sets",
    ],
    productNames: [
      "Hand-Carved Jade Amitabha Buddha Statue, 30cm, Rosewood Base",
      "Crackle-Glaze Jingdezhen Ceramic Vase, 45cm, Hand-Painted Ink Wash",
      "Aluminum-Frame Artificial Green Wall, 60×60cm, UV EVA Leaves, 5-Year Fade-Free",
      "Set of 3 Abstract Canvas Art Frames, 40×60cm, Oak Border",
      "Round Scandinavian Decorative Mirror, Φ80cm, PVD Gold-Plated 304 Stainless Steel Frame",
      "Curved Ceramic Table Lamp, 45cm, Linen Shade, E27 Bulb",
      "Set of 3 Pearl-Gold Maneki-Neko Lucky-Cat Resin Statues, 18cm, Moisture-Resistant",
      "MDF Slat Wall Clock, 50cm, Genuine Japanese Sweep Movement",
    ],
    styles: ["Modern", "Scandinavian", "Neoclassical", "Minimalist", "Buddhist", "Light Luxury"],
    materials: ["Resin", "Ceramic", "304 Stainless Steel", "Composite", "Acrylic-Coated MDF", "Polyester Silk"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Area of Use", options: ["Living Room", "Bedroom", "Dining Room", "Lobby", "Home Office"] },
    ],
  },

  "trang-tri-san-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Decoration by Area",
    title: "Garden Decoration",
    resultsCount: "96,480",
    chips: [
      "Garden Statues",
      "Fountains",
      "Solar Lights",
      "Reflective Gazing Balls",
      "Wall Reliefs",
      "Decorative Flags",
    ],
    trendingChips: [
      "Granite Stone Lion Statues",
      "3-Tier Fountains",
      "Solar LED Spike Lights",
      "Stainless Steel Gazing Balls",
      "PU Reliefs",
      "Feng Shui Carp Statues",
      "Polyester Garden Flags",
      "Metal Wind Chimes",
    ],
    productNames: [
      "Solid Granite Lion Statue, 1.2m, 20-Year Weather Resistance",
      "3-Tier Fountain, 1.5m Diameter, Faux-Stone-Coated Composite",
      "Set of 6 Solar LED Spike Lights, 1W, IP65, 1200mAh Lithium Battery",
      "Garden Reflective Gazing Ball, Mirror-Polished 304 Stainless Steel, Φ30cm",
      "Greek PU Garden Wall Relief, 80×120cm, Waterproof",
      "Composite Leaping Carp Statue, 60cm, Faux-Stone Finish",
      "Polyester Garden Flag Set, 30×45cm, UV Print, Four-Season",
      "Brass Metal Wind Chime, 60cm, 6 Tubes, Tibetan Tone",
    ],
    styles: ["Neoclassical", "Scandinavian", "Mediterranean", "Natural", "Chinese", "Tropical"],
    materials: ["Granite", "Composite", "PU Plastic", "304 Stainless Steel", "Cast Brass", "Outdoor-Glazed Ceramic"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Installation Location", options: ["Front Yard", "Backyard", "Pond", "Garden Path", "Patio"] },
    ],
  },

  "phong-khach-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Decoration by Area",
    title: "Living Room Decoration",
    resultsCount: "142,305",
    chips: [
      "Large Vases",
      "Canvas Art",
      "Console Statues",
      "Large Artificial Plants",
      "Floor Lamps",
      "Floor Rugs",
    ],
    trendingChips: [
      "1.8m Lobby Artificial Olive Trees",
      "80cm Floor Vases",
      "Abstract Canvas Art Sets",
      "1.6m Standing Floor Lamps",
      "200×290 Persian Rugs",
      "White Abstract Resin Statues",
      "Ceramic Console Pieces",
      "Coffee-Table Decor Sets",
    ],
    productNames: [
      "Ceramic Floor Vase, 80cm, Longquan Celadon Glaze",
      "Tuscany Artificial Olive Tree, 180cm, 1,200 Real-Touch Latex Leaves, Cement Pot",
      "Set of 3 Abstract Canvas Art, 60×90cm, Real-Grain Oak Frame",
      "Standing Corner Floor Lamp for Living Room, 1.6m, Marble Base, Linen Shade",
      "Polypropylene Persian Rug, 200×290cm, Hand-Woven Traditional Pattern",
      "White Abstract Face Resin Statue, 35cm, Matte Epoxy Finish",
      "5-Piece Coffee-Table Decor Set: Wood Tray + Candle + Statue + Vase + Book",
      "4-Panel Oak-Frame Divider, 1.8m, Frosted Gold-Tinted Film Panels",
    ],
    styles: ["Modern", "Neoclassical", "Scandinavian", "Industrial", "Light Luxury", "Boho"],
    materials: ["Ceramic", "Resin", "Linen", "Oak", "Marble", "Polypropylene"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Position in Room", options: ["Console Table", "Coffee Table", "Room Corner", "On Wall", "TV Cabinet"] },
    ],
  },

  "phong-an-khach-san": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Decoration by Area",
    title: "Hotel Dining Room Decoration",
    resultsCount: "58,940",
    chips: [
      "Table Centerpieces",
      "Pendant Chandeliers",
      "Decorative Dividers",
      "Serving Trays",
      "Dining-Table Vases",
      "F&B Wall Art",
    ],
    trendingChips: [
      "Ballroom Pendant Chandeliers",
      "3m Long-Table Centerpiece Sets",
      "35cm Dining-Table Vases",
      "CNC Artificial Green-Wall Dividers",
      "304 Stainless Steel Buffet Trays",
      "F&B Canvas Wall Art",
      "5-Arm Candelabras",
      "Ceramic Salt & Pepper Shakers",
    ],
    productNames: [
      "K9 Crystal Ballroom Chandelier, Φ1.2m, 24 E14 Bulbs + Dimmable LED",
      "3m Long-Table Centerpiece Set, 5 Pieces: Vase + Candles + Mirror Base",
      "Ceramic Dining-Table Vase, 35cm, Matte Beige, Wide Mouth for Fresh Flowers",
      "CNC Walnut-Veneer MDF Divider, Arabic Pattern, 2.4×1.2m",
      "304 Stainless Steel Buffet Tray, GN 1/1, 65mm Deep, Anti-Fingerprint Matte Surface",
      "Set of 3 F&B Canvas Wall Art, 60×90cm, East Asian Cuisine Theme",
      "5-Arm Brass Candelabra, 60cm, for Banquets",
      "Ceramic Salt & Pepper Shaker, 8cm Square, Set of 24 Pairs, 5-Star Hotel Logo",
    ],
    styles: ["International 5-Star", "Neoclassical", "East Asian", "Light Luxury", "F&B Industrial"],
    materials: ["K9 Crystal", "304 Stainless Steel", "Matte-Glaze Ceramic", "Cast Brass", "Walnut Veneer"],
    extraFilters: [
      { title: "F&B Space Type", options: ["Buffet Hall", "Fine Dining", "À la Carte", "Banquet", "Pool Bar"] },
      { title: "Certification", options: ["NSF (Food Safe)", "FDA", "LFGB EU", "ISO 22000", "CE"] },
    ],
    featuredSupplier: {
      name: "Foshan Hospitality Decor Factory",
      logo: "/img/sup-hotel-fs.jpg?v=6",
      loc: "Foshan, Guangdong",
      videoCaption: "5-star F&B decor factory — supplier to Marriott and Hilton",
      products: [
        { title: "K9 Ballroom Chandelier 1.2m", price: "$420–680/pc" },
        { title: "3m Banquet Centerpiece Set", price: "$120–185/set" },
      ],
    },
  },

  "hanh-lang-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Decoration by Area",
    title: "Hallway Decoration",
    resultsCount: "32,180",
    chips: [
      "Narrow Console Tables",
      "Large Hanging Mirrors",
      "Long Runner Art",
      "Wall Sconces",
      "Slim Artificial Plants",
      "Runner Rugs",
    ],
    trendingChips: [
      "30cm Narrow Console Tables",
      "1.6m Wall-Hung Mirrors",
      "LED Wall Sconces",
      "30×120cm Runner Art",
      "Slim 1.2m ZZ Plants",
      "80×300cm Runner Rugs",
      "Set of 3 Hallway Art",
      "Slim Tall Decor Statues",
    ],
    productNames: [
      "Narrow Oak Hallway Console Table, 30×120cm, Black Metal Legs",
      "Hallway Wall Mirror, 60×160cm, Natural Oak Frame",
      "12W LED Wall Sconce, Black Metal Shade, 3000K Warm Light",
      "Set of 3 Hallway Canvas Art, 30×120cm, Tropical Leaves Theme",
      "Slim Artificial ZZ Plant, 1.2m, 18cm Square Cement Pot",
      "Hallway Runner Rug, 80×300cm, Anti-Slip Polypropylene",
      "Slim Tall Resin Decor Statue, 60cm, Abstract Artistic Shape",
      "Tall Standing Wall Clock, 80cm, Silent Japanese Movement",
    ],
    styles: ["Modern", "Minimalist", "Scandinavian", "Neoclassical", "Industrial"],
    materials: ["Oak", "Powder-Coated Metal", "Polypropylene", "Resin", "Canvas"],
    extraFilters: [
      { title: "Hallway Width", options: ["<1m", "1-1.5m", "1.5-2m", "Over 2m"] },
    ],
  },

  "ban-cong-san-thuong": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Decoration by Area",
    title: "Balcony & Patio Decoration",
    resultsCount: "76,215",
    chips: [
      "Outdoor Furniture Sets",
      "UV-Resistant Artificial Plants",
      "Fairy String Lights",
      "Hanging Planters",
      "Portable Pergolas",
      "WPC Decking Tiles",
    ],
    trendingChips: [
      "Bistro Balcony Furniture Sets",
      "UV Artificial Olive Trees in Cement Pots",
      "10m Solar String Lights",
      "Iron Railing Hanging Planters",
      "Foldable Portable 3×3m Pergolas",
      "30×30 WPC Decking Tiles",
      "70% HDPE Shade Nets",
      "Self-Watering Balcony Planters",
    ],
    productNames: [
      "Bistro Balcony Furniture Set, 1 Table 2 Chairs, Powder-Coated Steel Frame",
      "UV Artificial Olive Tree, 1.5m, 25cm Square Cement Pot, Rain-Resistant",
      "Solar Fairy LED String Light, 10m, 100 Bulbs, IP65, Lithium Battery",
      "Set of 4 Iron + PE Plastic Railing Hanging Planters, Adjustable Stainless Hooks",
      "Foldable Portable Pergola, 3×3m, Aluminum Frame, Oxford 600D Fabric Canopy",
      "WPC Decking Tile, 30×30cm, Click-Lock No-Screw Install, Anti-Slip",
      "70% UV HDPE Shade Net, 5×3m, Stainless Eyelets at 50cm Intervals",
      "PE Plastic Self-Watering Balcony Planter, 60×25cm, 4L Water Reservoir",
    ],
    styles: ["Tropical", "Scandinavian", "Mediterranean", "Industrial", "Boho"],
    materials: ["Aluminum Frame", "Powder-Coated Steel", "WPC", "PE Plastic", "Oxford 600D Fabric"],
    extraFilters: [
      { title: "Balcony Area", options: ["<5m²", "5-10m²", "10-20m²", "Over 20m²"] },
      { title: "Sun Orientation", options: ["East-Facing", "West-Facing", "South-Facing", "North-Facing"] },
    ],
  },

  "khu-vuc-sanh": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Decoration by Area",
    title: "Lobby Decoration",
    resultsCount: "44,760",
    chips: [
      "Large Lobby Artificial Plants",
      "Floor Vases",
      "Welcome Statues",
      "Lobby Chandeliers",
      "Reception Desks",
      "Round Lobby Rugs",
    ],
    trendingChips: [
      "2.5m Lobby Olive Trees",
      "1.2m Ceramic Lobby Vases",
      "Lobby-Entrance Feng Shui Statues",
      "Ballroom Lobby Chandeliers",
      "Hotel Reception Desks",
      "Φ3m Round Lobby Rugs",
      "Large Fiberglass Planters",
      "Reception Centerpiece Sets",
    ],
    productNames: [
      "Hotel-Lobby Olive Tree, 2.5m, 2,500 UV-Stable EVA Leaves",
      "Ceramic Floor Vase, 1.2m, Hand-Painted Jingdezhen Ink Wash",
      "Pair of Granite Lion Statues, 1.5m, for Both Sides of the Lobby Entrance",
      "K9 Crystal Lobby Chandelier, Φ1.5m, 36 Dimmable LED Bulbs",
      "3m Hotel Reception Desk, Walnut Veneer, White Solid-Surface Top",
      "Φ3m Round Lobby Rug, Polypropylene, Hand-Woven Hotel Logo",
      "Large Fiberglass Planter, Φ80×H100cm, EPDM Waterproof Liner",
      "7-Piece Reception Centerpiece Set: Vase + Statue + Candles + Mirror Tray",
    ],
    styles: ["International 5-Star", "Neoclassical", "Light Luxury", "Chinese", "Modern Luxury"],
    materials: ["K9 Crystal", "Granite", "Fiberglass", "Veneer", "Solid Surface"],
    extraFilters: [
      { title: "Lobby Type", options: ["Hotel", "Office", "Premium Apartment", "Showroom", "Resort"] },
      SIZE_FILTER,
    ],
    featuredSupplier: {
      name: "Guangzhou Lobby Decor Co., Ltd.",
      logo: "/img/sup-lobby-gz.jpg?v=6",
      loc: "Guangzhou, Guangdong",
      videoCaption: "Lobby decor factory tour — supplier to 200+ 5-star hotels across Asia",
      products: [
        { title: "1.2m Jingdezhen Floor Vase", price: "$185–280/pc" },
        { title: "2.5m UV EVA Lobby Olive Tree", price: "$320–450/tree" },
      ],
    },
  },

  "san-van-dong-cong-vien": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "Decoration by Area",
    title: "Stadium & Park Decoration",
    resultsCount: "28,430",
    chips: [
      "Mass-Use Park Benches",
      "Composite Trash Bins",
      "Stadium Flood Lights",
      "Landscape Light Poles",
      "Large Planters",
      "Signage",
    ],
    trendingChips: [
      "1.8m Steel-Composite Park Benches",
      "Composite Sorting Trash Bins",
      "400W Sports-Field Flood Lights",
      "4m Landscape Light Poles",
      "1m Large Fiberglass Planters",
      "CNC Park Signage",
      "WPC Decorative Railings",
      "Composite Arch Gateways",
    ],
    productNames: [
      "1.8m Park Bench, Powder-Coated Steel Frame, Rot-Resistant WPC Surface",
      "Composite Park Trash Bin, 240L, 3-Compartment Sorting, Flame-Retardant",
      "400W Sports-Field LED Flood Light, IP66, 50,000lm, 60° Glare-Free Beam",
      "4m Park Landscape Light Pole, Twin LED 60W, Solar Hybrid",
      "Large Fiberglass Planter, Φ100×H80cm, for Plaza Centerpieces",
      "CNC WPC Park Sign, 1.2×0.8m, In-Ground Steel Posts",
      "WPC Decorative Railing, 100m, 100×100mm Posts, 30×80mm Slats",
      "Composite Arch Gateway, 4m, Marine-Grade UV-Resistant Epoxy Paint",
    ],
    styles: ["Urban", "Eco", "Sports Venue", "Theme Park"],
    materials: ["Powder-Coated Steel", "WPC", "Composite", "Fiberglass", "Cast Brass", "Granite"],
    extraFilters: [
      { title: "Project Type", options: ["Stadium", "Urban Park", "Plaza", "School", "Residential Area"] },
      { title: "Certification", options: ["CE", "EN 1176 (Playground)", "ISO 9001", "RoHS", "FSC"] },
    ],
  },

  // ===========================================================================
  // Overview-card cross-sections — By product type
  // ===========================================================================
  "chau-hoa-bon-cay": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "By Product Type",
    title: "Planters & Flowerpots",
    resultsCount: "215,840",
    chips: [
      "Composite Planters",
      "PE Plastic Planters",
      "Ceramic Planters",
      "Cement Planters",
      "Stainless Steel Planters",
      "Fiberglass Planters",
    ],
    trendingChips: [
      "60cm Round Composite Planters",
      "Rectangular PE Plastic Planters",
      "40cm White-Glaze Ceramic Planters",
      "50cm Square Cement Planters",
      "Wood-Base 304 Stainless Steel Planters",
      "Self-Watering Balcony Planters",
      "Square Fiberglass Planters",
      "Railing Hanging Planters",
    ],
    productNames: [
      "Round Composite Planter, 60cm Tall, Φ50cm, Multicolor Epoxy Paint, Bottom Drainage",
      "Rectangular PE Plastic Planter, 80×30×35cm, 8-Year UV Resistance, Removable Legs",
      "White-Glaze Jingdezhen Ceramic Planter, 40cm, Hand-Painted Blue Pattern",
      "Square Cement Planter, 50×50×50cm, Natural Textured Anti-Mold Surface",
      "Round Column 304 Stainless Steel Planter, 70cm Tall, Rot-Resistant Natural Teak Base",
      "Square Fiberglass Planter, 40×40×40cm, Matte Finish, 12 Colors",
      "PP Self-Watering Balcony Planter, 60×25cm, 4L Reservoir, Capillary Wick",
      "Set of 3 ABS Plastic Railing Hanging Planters, Adjustable Stainless Hooks 0–180mm",
    ],
    styles: ["Modern", "Minimalist", "Scandinavian", "Mediterranean", "Industrial", "Tropical"],
    materials: ["Composite", "PE Plastic", "Ceramic", "Cement", "304 Stainless Steel", "Fiberglass"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Shape", options: ["Round", "Square", "Rectangular", "Tall Column", "Tapered"] },
      { title: "Location", options: ["Indoor", "Outdoor", "Railing-Hung", "Ceiling-Hung", "Lobby"] },
    ],
  },

  "binh-hoa": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "By Product Type",
    title: "Vases",
    resultsCount: "84,520",
    chips: [
      "Glass Vases",
      "Ceramic Vases",
      "Large Floor Vases",
      "Mini Tabletop Vases",
      "Metal Vases",
      "Resin Vases",
    ],
    trendingChips: [
      "25cm Hand-Blown Glass Vases",
      "Crackle-Glaze Jingdezhen Vases",
      "80cm Living-Room Floor Vases",
      "12cm Bedside Mini Vases",
      "Gold-Plated Brass Vases",
      "Matte Scandinavian Ceramic Vases",
      "Cut K9 Crystal Vases",
      "White Abstract Resin Vases",
    ],
    productNames: [
      "Hand-Blown Glass Vase, Flared Mouth, 25cm, Gold-Brass Base",
      "Crackle-Glaze Jingdezhen Ceramic Vase, 45cm, Hand-Painted Ink Wash",
      "Ceramic Living-Room Floor Vase, 80cm, Wide Mouth for Fresh Flowers",
      "12cm Bedside Mini Vase, Matte Beige, Set of 3 in Matching Tones",
      "PVD Gold-Plated Brass Vase, 30cm, Narrow Mouth for a Single Stem",
      "Matte Ribbed Scandinavian Ceramic Vase, 28cm, 6 Blended Pastel Colors",
      "Bohemia Cut K9 Crystal Vase, 22cm, 15mm Thick Base, Premium",
      "Modern White Abstract Face Resin Vase, 35cm, Matte Epoxy Finish",
    ],
    styles: ["Modern", "Scandinavian", "Neoclassical", "Chinese", "Vintage", "Light Luxury"],
    materials: ["Borosilicate Glass", "Ceramic", "Brass Metal", "K9 Crystal", "Resin"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Mouth Type", options: ["Wide Flared Mouth", "Narrow Mouth", "Straight Mouth", "Curved Mouth"] },
    ],
  },

  "vat-pham-trang-tri": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "By Product Type",
    title: "Decorative Objects",
    resultsCount: "168,940",
    chips: [
      "Tabletop Statues",
      "Decor Trays",
      "Candle Holders",
      "Decor Boxes",
      "Architectural Models",
      "Decorative Gazing Balls",
    ],
    trendingChips: [
      "Abstract Resin Statues",
      "Gold Mirror Decor Trays",
      "3-Arm Brass Candle Holders",
      "Ceramic Tissue Boxes",
      "Eiffel Tower Models",
      "Reflective Glass Gazing Balls",
      "Decorative Faux Books",
      "Set of 3 Matte Decorative Jars",
    ],
    productNames: [
      "White Abstract Face Resin Statue, 35cm, Fade-Free Matte Epoxy Finish",
      "PVD Gold-Plated Mirror Decor Tray, Rectangular 40×25cm, 304 Stainless Steel Border",
      "3-Arm Brass Candle Holder, 60cm, for Banquets or Console Tables",
      "Scandinavian Bear Ceramic Tissue Box, 25cm, White Matte Glaze",
      "Gold-Plated Eiffel Tower Model, 32cm, White Marble Base",
      "Reflective Glass Gazing Ball, Φ20cm, Round Walnut Base",
      "Set of 5 Vintage Hardcover Decorative Faux Books, for Display Cabinets",
      "Set of 3 Matte Ceramic Decorative Jars, 15-20-25cm in Matching Tones",
    ],
    styles: ["Modern", "Scandinavian", "Light Luxury", "Vintage", "Industrial", "Feng Shui"],
    materials: ["Resin", "Ceramic", "Brass Metal", "PVD 304 Stainless Steel", "Marble", "Walnut"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Decor Position", options: ["Console Table", "TV Cabinet", "Dining Table", "Desk", "Wall"] },
    ],
  },

  "den-san-vuon": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "By Product Type",
    title: "Garden Lights",
    resultsCount: "112,380",
    chips: [
      "Solar Lights",
      "In-Ground LED Lights",
      "Spike Lights",
      "LED Flood Lights",
      "Fairy String Lights",
      "Landscape Light Poles",
    ],
    trendingChips: [
      "1W Solar LED Spike Lights",
      "50W IP66 LED Flood Lights",
      "12V Deck In-Ground Lights",
      "10m Solar Fairy String Lights",
      "3m Landscape Light Poles",
      "Butterfly Motif Lights",
      "Tree Spotlights",
      "Solar Wall Lights",
    ],
    productNames: [
      "Set of 6 Solar LED Spike Lights, 1W, IP65, 1200mAh Lithium Battery, 8h Runtime",
      "50W IP66 Outdoor LED Flood Light, 6500K, Salt-Corrosion-Resistant Aluminum Housing",
      "12V DC Deck In-Ground Light, 1W, IP67, 304 Stainless Steel Face, 60mm Diameter",
      "Solar Fairy String Light, 10m, 100 LED Bulbs, 8 Flash Modes, IP65",
      "3m Park Landscape Light Pole, Twin LED 60W, Warm Light",
      "Butterfly Motif Light, 25W LED, IP65, Wall-Mounted, RGB Multicolor",
      "Tree Spotlight, 12W LED, IP66, Adjustable 360° Spike Mount",
      "Outdoor Solar Wall Light, 6W, IP65, PIR Motion Sensor",
    ],
    styles: ["Modern", "Classic", "Tropical", "Industrial", "Scandinavian"],
    materials: ["Cast-Aluminum Housing", "304 Stainless Steel", "UV-Resistant PC Plastic", "Pure Copper"],
    extraFilters: [
      { title: "Power Source", options: ["Solar", "220V Mains", "DC 12V", "DC 24V", "Rechargeable Lithium Battery"] },
      { title: "IP Rating", options: ["IP54", "IP65", "IP66", "IP67", "IP68"] },
      { title: "Power", options: ["<5W", "5-20W", "20-50W", "50-100W", "Over 100W"] },
    ],
  },

  // ===========================================================================
  // Overview-card cross-sections — By material
  // ===========================================================================
  "vat-lieu-composite": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "By Material",
    title: "Composite Products",
    resultsCount: "67,420",
    chips: [
      "Composite Planters",
      "Composite Statues",
      "WPC Furniture",
      "Composite Reliefs",
      "WPC Decking",
      "Composite Arch Gateways",
    ],
    trendingChips: [
      "60cm Round Composite Planters",
      "60cm Composite Carp Statues",
      "Outdoor WPC Furniture",
      "Greek Composite Reliefs",
      "30×30 WPC Decking",
      "Composite Garden Arch Gateways",
      "Stone-Coated Composite Lion Statues",
      "Rot-Resistant WPC Railings",
    ],
    productNames: [
      "Round Composite Planter, 60cm Tall, Φ50cm, 12-Color Epoxy Paint, 10-Year Sun Resistance",
      "Composite Leaping Carp Statue, 60cm, Faux-Stone Finish",
      "Outdoor WPC Furniture Set, 1+4, Aluminum Frame + Rot-Resistant WPC Slats",
      "Greek Composite Garden Wall Relief, 80×120cm, Antique Gold Finish",
      "Outdoor WPC Decking Tile, 30×30cm, Click-Lock No-Screw, Anti-Slip",
      "Composite Garden Arch Gateway, 4m, Marine-Grade UV-Resistant Epoxy Paint",
      "Faux-Stone-Coated Composite Lion Statue, 1m, 15-Year Durability",
      "WPC Railing, 100m, 100×100mm Posts + 30×80mm Slats, Rot-Resistant",
    ],
    styles: ["Modern", "Neoclassical", "Tropical", "Mediterranean"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Application", options: ["Garden", "Lobby", "Park", "Resort", "Villa"] },
      { title: "Warranty", options: ["3 yr", "5 yr", "10 yr", "15 yr"] },
    ],
  },

  "vat-lieu-nhua-pe": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "By Material",
    title: "PE Plastic Products",
    resultsCount: "94,260",
    chips: [
      "PE Planters",
      "Self-Watering PE Planters",
      "PE Rattan Furniture",
      "PE Trash Bins",
      "PE Shade Nets",
      "PE Seed Trays",
    ],
    trendingChips: [
      "40cm Round PE Planters",
      "Self-Watering PE Balcony Planters",
      "Outdoor PE Rattan Furniture",
      "240L Park Trash Bins",
      "70% HDPE Shade Nets",
      "105-Cell PE Seed Trays",
      "1000L PE Water Tanks",
      "Organic-Vegetable PE Boxes",
    ],
    productNames: [
      "Round PE Planter, 40cm Tall, Φ35cm, 8-Year UV Resistance, Bottom Drainage Hole",
      "Self-Watering PE Balcony Planter, 60×25cm, 4L Reservoir, Capillary Wick",
      "Outdoor PE Rattan Furniture Set, 1+4, Aluminum Frame, Olefin Fabric Cushions",
      "Park PE Trash Bin, 240L, 3-Compartment Sorting, V0 Flame-Retardant",
      "70% UV HDPE Shade Net, 5×3m, 0.45mm Thick, Stainless Eyelets",
      "105-Cell PE Seed Tray, 54×28cm, for Farm Seed Starting",
      "1000L PE Water Tank, 5mm Thick, Food-Grade, Algae-Resistant",
      "Organic-Vegetable PE Box, 30×30cm Square, with Legs + Bottom Tray",
    ],
    styles: ["Tropical", "Industrial", "Minimalist"],
    extraFilters: [
      SIZE_FILTER,
      { title: "PE Grade", options: ["LDPE", "HDPE", "LLDPE", "Roto-Mold PE", "Food-Grade PE"] },
      { title: "UV Resistance", options: ["3 yr", "5 yr", "8 yr", "10 yr"] },
    ],
  },

  "vat-lieu-gom-su": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "By Material",
    title: "Ceramic Products",
    resultsCount: "78,940",
    chips: [
      "Ceramic Vases",
      "Ceramic Planters",
      "Ceramic Statues",
      "Jingdezhen Decor",
      "Decorative Ceramic Tiles",
      "Matte Decorative Jars",
    ],
    trendingChips: [
      "Crackle-Glaze Jingdezhen Vases",
      "40cm White-Glaze Ceramic Planters",
      "Jade Ceramic Buddha Statues",
      "Hand-Painted Jingdezhen Ink-Wash Decor",
      "Decorative Moroccan Ceramic Tiles",
      "Matte Ribbed Scandinavian Jars",
      "Longquan Ceramic Tea Sets",
      "Scandinavian Ceramic Tissue Boxes",
    ],
    productNames: [
      "Crackle-Glaze Jingdezhen Ceramic Vase, 45cm, 100% Hand-Painted Ink Wash",
      "White-Glaze Ceramic Planter, 40cm, Wide Mouth, Hand-Painted Blue Pattern",
      "Celadon-Glaze Amitabha Buddha Ceramic Statue, 30cm, Rosewood Base",
      "Set of 6 Moroccan Ceramic Tiles, 20×20cm, Cobalt-Blue Glaze, for Wall Cladding",
      "Matte Ribbed Scandinavian Ceramic Jar, 28cm, 6 Pastel Colors",
      "9-Piece Longquan Celadon-Glaze Ceramic Tea Set, Wood Gift Box",
      "Scandinavian Bear Ceramic Tissue Box, White Matte Glaze, 25cm",
      "Crackle-Glaze Ceramic Table Lamp, 45cm, Linen Shade, E27 Bulb",
    ],
    styles: ["Classic Chinese", "Scandinavian", "Mediterranean", "Modern"],
    extraFilters: [
      { title: "Glaze Type", options: ["Crackle Glaze", "Celadon Glaze", "Matte Glaze", "Glossy Glaze", "Textured Glaze"] },
      { title: "Production Region", options: ["Jingdezhen", "Longquan", "Dehua", "Guangdong"] },
    ],
  },

  "vat-lieu-da-tu-nhien": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "By Material",
    title: "Natural Stone Products",
    resultsCount: "42,180",
    chips: [
      "Granite Statues",
      "Stone Fountains",
      "Stone Reliefs",
      "Travertine Planters",
      "Marble Tables",
      "Engraved Stone Steles",
    ],
    trendingChips: [
      "1.2m Granite Lion Statues",
      "3-Tier Stone Fountains",
      "Sandstone Garden Reliefs",
      "40cm Travertine Planters",
      "Round Marble Tables",
      "CNC Engraved Stone Steles",
      "Greek Granite Statues",
      "Vintage Hand Grinding Stones",
    ],
    productNames: [
      "Solid Granite Lion Statue, 1.2m, Polished/Flamed Two-Tone Finish",
      "3-Tier Stone Fountain, 1.5m Diameter, Shandong Granite",
      "Sandstone Garden Relief, 80×120cm, Hand-Carved Roman Pattern",
      "Round Travertine Planter, 40cm Tall, Φ35cm, Natural Honed Finish",
      "Round Marble Table, Φ80cm, 30mm Thick, Brass Metal Legs",
      "CNC Engraved Stone Stele, 60×40cm, Shandong Black Granite G684",
      "Greek Granite Goddess Statue, 1.5m, 100% Hand-Carved",
      "Vintage Hand Grinding Stone, Φ40cm, Natural Laterite, Garden Decor",
    ],
    styles: ["Classic Greek/Roman", "Classic Chinese", "Natural", "Vintage"],
    extraFilters: [
      { title: "Stone Type", options: ["Granite", "Marble", "Sandstone", "Travertine", "Limestone", "Bluestone"] },
      { title: "Finish", options: ["Polished", "Honed", "Flamed", "Bush-Hammered", "Sandblasted"] },
      SIZE_FILTER,
    ],
    featuredSupplier: {
      name: "Quanzhou Natural Stone Carving",
      logo: "/img/sup-stone-qz.jpg?v=6",
      loc: "Quanzhou, Fujian",
      videoCaption: "Quanzhou stone workshop — specialist in natural granite statues for export",
      products: [
        { title: "1.2m Granite Lion Statue", price: "$580–880/pair" },
        { title: "1.5m 3-Tier Stone Fountain", price: "$1,250–1,850/set" },
      ],
    },
  },

  "vat-lieu-kim-loai-son-tinh-dien": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "By Material",
    title: "Powder-Coated Metal Products",
    resultsCount: "58,620",
    chips: [
      "Powder-Coated Steel Furniture",
      "Powder-Coated Steel Railings",
      "Powder-Coated Steel Planters",
      "Painted Iron Gates",
      "Park Benches",
      "Outdoor Shelving",
    ],
    trendingChips: [
      "Powder-Coated Steel Bistro Furniture",
      "Black Powder-Coated Square Steel Railings",
      "Outdoor Powder-Coated Steel Planters",
      "Painted Art Iron Gates",
      "1.8m Park Benches",
      "Outdoor Powder-Coated Steel Shelving",
      "Powder-Coated Steel Pergola Frames",
      "3-Tier Plant Stand Sets",
    ],
    productNames: [
      "Black Powder-Coated Steel Bistro Balcony Furniture Set, 60cm Top",
      "Black Powder-Coated 40×40 Square Steel Railing, 2-Layer Anti-Rust",
      "Outdoor Powder-Coated Steel Planter, 50cm Tall, 8-Year UV-Resistant Epoxy Paint",
      "Powder-Coated Art Iron Gate, 1.5m Leaf, CNC Pattern",
      "1.8m Park Bench, Powder-Coated Steel Frame, Rot-Resistant WPC Surface",
      "Outdoor Powder-Coated Steel Shelving, 5-Tier, 60×30×180cm, 50kg/Tier Load",
      "Powder-Coated Steel Pergola Frame, 3×3m, Waterproof Oxford 600D Canopy",
      "3-Tier Black Metal Plant Stand Set, 80cm, Textured Epoxy Paint",
    ],
    styles: ["Industrial", "Modern", "French Vintage", "Minimalist"],
    extraFilters: [
      { title: "Coating Grade", options: ["1 Layer", "2-Layer Epoxy + Polyester", "3-Layer Marine", "Anti-Rust C5"] },
      { title: "Coating Color", options: ["Black RAL 9005", "White RAL 9010", "Gray RAL 7016", "Vintage Copper", "Custom"] },
      { title: "Warranty", options: ["2 yr", "5 yr", "10 yr"] },
    ],
  },

  "vat-lieu-soi-thuy-tinh": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "By Material",
    title: "Fiberglass Products",
    resultsCount: "38,940",
    chips: [
      "Fiberglass Planters",
      "Fiberglass Planters",
      "Fiberglass Statues",
      "Fiberglass Furniture",
      "Fiberglass Reliefs",
      "Large Lobby Planters",
    ],
    trendingChips: [
      "40cm Square Fiberglass Planters",
      "60cm Round Fiberglass Planters",
      "Lobby Fiberglass Statues",
      "Outdoor Fiberglass Furniture",
      "Fiberglass Wall Reliefs",
      "1m Large Lobby Planters",
      "Matte Fiberglass Planters, 12 Colors",
      "Tapered Fiberglass Planters",
    ],
    productNames: [
      "Square Fiberglass Planter, 40×40×40cm, Matte Finish, 12 Colors",
      "Round Fiberglass Planter, 60cm Tall, Φ50cm, Marine-Grade Gelcoat Layer",
      "Fiberglass Goddess Statue for Hotel Lobby, 1.8m, Faux-Marble Finish",
      "Outdoor Fiberglass Furniture Set, 1+4, Yellowing-Resistant White Gelcoat",
      "Fiberglass Wall Relief, 80×120cm, Fade-Free Antique Gold Finish",
      "Large Lobby Fiberglass Planter, Φ80×H100cm, EPDM Waterproof Liner",
      "Set of 3 Outdoor Matte Fiberglass Planters, Square 30/40/50cm in Matching Tones",
      "Tapered Fiberglass Planter, 70cm Tall, 50 Mouth/35 Base, Minimalist Decor",
    ],
    styles: ["Modern", "Minimalist", "Neoclassical", "Light Luxury"],
    extraFilters: [
      SIZE_FILTER,
      { title: "Finish", options: ["Matte", "Glossy", "Faux-Marble", "Faux-Stone", "Anti-Graffiti"] },
      { title: "Warranty", options: ["5 yr", "8 yr", "10 yr", "15 yr"] },
    ],
  },

  "vat-lieu-may-tre": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "By Material",
    title: "Rattan & Bamboo Products",
    resultsCount: "31,450",
    chips: [
      "Natural Rattan Furniture",
      "PE Rattan Furniture",
      "Bamboo Lamps",
      "Rattan Baskets",
      "Bamboo Dividers",
      "Boho Bamboo Decor",
    ],
    trendingChips: [
      "1+4 Natural Rattan Furniture",
      "Corner PE Rattan Sofa Sets",
      "Scandinavian Bamboo Pendant Lamps",
      "Hand-Woven Hatched Rattan Baskets",
      "1.8m Natural Bamboo Dividers",
      "Boho Bamboo Macramé Decor",
      "Rattan Rocking Chairs",
      "Handwoven Bamboo Trays",
    ],
    productNames: [
      "1+4 Natural Rattan Furniture Set, Hand-Woven Hardwood Rattan Frame, Cotton Cushions",
      "Outdoor Corner PE Rattan Sofa, 5 Seats + Table, Rust-Resistant Aluminum Frame",
      "Scandinavian Bamboo Pendant Lamp, Φ40cm, Hand-Woven, 1.5m Fabric Cord",
      "Set of 3 Hand-Woven Hatched Rattan Baskets, 30/40/50cm, Natural-Dyed",
      "Natural Bamboo Divider, 1.8×0.9m, 4 Folding Panels, Acacia Wood Frame",
      "Boho Bamboo Macramé Decor Set: 5 Wall + Ceiling-Hung Pieces, Mixed Sizes",
      "Natural Rattan Rocking Chair, 95cm, Hand-Woven Indonesia Style",
      "Handwoven Bamboo Serving Tray, Rectangular 40×25cm, Moisture-Resistant",
    ],
    styles: ["Tropical", "Boho", "Scandinavian", "East Asian", "Vintage"],
    extraFilters: [
      { title: "Rattan/Bamboo Type", options: ["Natural Rattan", "Synthetic PE Rattan", "Real Bamboo", "Pressed Bamboo"] },
      { title: "Origin", options: ["Indonesia Style", "Vietnam Style", "Chinese", "Bali"] },
      { title: "Application", options: ["Indoor", "Outdoor (PE)", "Resort", "Boho Cafe"] },
    ],
  },

  "vat-lieu-inox-304": {
    parentSlug: PARENT,
    parentName: PARENT_NAME,
    l2Name: "By Material",
    title: "304 Stainless Steel Products",
    resultsCount: "46,180",
    chips: [
      "304 Stainless Steel Planters",
      "Stainless Steel Railings",
      "Stainless Steel Furniture",
      "Polished Stainless Steel Statues",
      "Stainless Steel Buffet Trays",
      "Decorative Stainless Steel Gazing Balls",
    ],
    trendingChips: [
      "70cm Column 304 Stainless Steel Planters",
      "PVD Gold 304 Stainless Steel Railings",
      "Outdoor 304 Stainless Steel Furniture",
      "Mirror-Finish 304 Stainless Steel Statues",
      "GN 1/1 Stainless Steel Buffet Trays",
      "304 Stainless Steel Reflective Gazing Balls",
      "Brushed Satin Stainless Steel Handrails",
      "Stainless Steel Landscape Light Poles",
    ],
    productNames: [
      "Round Column 304 Stainless Steel Planter, 70cm Tall, Φ40cm, Rot-Resistant Teak Base",
      "PVD Gold 304 Stainless Steel Railing, 90cm, Φ50.8 Posts + Φ42.4 Handrail",
      "Outdoor 304 Stainless Steel Furniture Set, 1+4, Rain-Resistant HPL Compact-Stone Top",
      "Mirror-Finish 304 Stainless Steel Abstract Statue, 1.5m, Black Granite Base",
      "304 Stainless Steel Buffet Tray, GN 1/1, 65mm Deep, 0.8mm Thick, NSF Certified",
      "Garden Reflective 304 Stainless Steel Gazing Ball, Mirror-Polished, Φ30cm",
      "Brushed-Satin 304 Stainless Steel Handrail, Φ42.4, 6m, Flexible 90° Joint",
      "304 Stainless Steel Landscape Light Pole, 3m, Twin LED 60W, IP66",
    ],
    styles: ["Modern", "Industrial", "Light Luxury", "International 5-Star"],
    extraFilters: [
      { title: "Finish", options: ["Mirror", "Brushed Satin", "PVD Gold", "PVD Copper", "PVD Black"] },
      { title: "Stainless Steel Grade", options: ["304", "304L", "316", "316L (Marine Grade)"] },
      { title: "Certification", options: ["NSF (Food)", "ISO 9001", "EN 1090", "CE", "RoHS"] },
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

const DEFAULT_STYLES = ["Modern", "Classic", "Minimalist", "Industrial", "European"];
const DEFAULT_PRODUCT_VARIANTS = [
  "standard export version, 5-layer carton packaging",
  "premium version for 5-star hotel projects",
  "OEM custom size, color and logo",
  "2026 model, CE/RoHS/ISO 9001 certified",
  "eco-friendly series, FSC recycled materials",
  "in stock, ships within 7 days from Guangzhou",
  "2025 bestseller, free sample for new buyers",
  "OEM version for the EU market, heavy-duty high strength",
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
      "16A 250V IEC standard, V0 flame-retardant PC housing",
      "EU-standard flush-mount, nickel-plated copper body",
      "ELCB 30mA shock-protection technology",
      "outdoor IP65 waterproof version",
      "integrated USB-C 20W and Type-A 2.4A ports",
      "OEM logo printing, individual display-box packaging",
      "2026 model, with CE / CCC / TUV marks",
      "5-year warranty, flexible MOQ",
    ],
    styles: ["EU Standard", "US Style", "UK BS Style", "Japanese JIS Style", "China Standard"],
    materials: ["Flame-Retardant PC Plastic", "Aluminum Alloy", "Nickel-Plated Copper", "Stainless Steel", "Powder-Coated Metal"],
  },
  lighting: {
    variants: [
      "Bridgelux COB LED chip 9W-36W, CRI ≥80",
      "adjustable 3000K/4000K/6500K light",
      "heat-dissipating cast-aluminum housing, IP44 for bathrooms",
      "integrated dimmer + Tuya smart Wi-Fi",
      "50,000h lifespan, 3-year warranty",
      "OEM/ODM to order — logo on the driver",
      "CE / RoHS / FCC / SAA certified",
      "flicker under 8%, eye-safe",
    ],
    styles: ["Modern", "Scandinavian", "Industrial", "Classic", "Smart Home"],
    materials: ["Cast Aluminum", "Light Alloy", "PMMA Acrylic", "Borosilicate Glass", "Powder-Coated Steel"],
  },
  "bathroom-sanitary": {
    variants: [
      "solid brass, 5-layer PVD chrome plating",
      "thermostatic technology ±0.5°C",
      "antibacterial nano-glaze ceramic, easy to clean",
      "water-saving 3L/6L dual-flush design",
      "8mm self-cleaning scratch-resistant tempered glass",
      "OEM to drawing, MOQ 50-100 sets",
      "CE / WaterSense / WRAS certified",
      "10-year warranty on the faucet body, 5 years on the ceramic",
    ],
    styles: ["Modern", "Neoclassical", "Minimalist", "Luxury", "Spa"],
    materials: ["Brass", "Zinc Alloy", "Ceramic", "Faux Stone", "Acrylic", "Chrome-Plated Brass"],
  },
  "doors-windows": {
    variants: [
      "6063-T5 aluminum frame, 1.4mm thick, powder-coated",
      "double-glazed Low-E + argon, U=1.6 thermal insulation",
      "smooth dust-proof double-track slider, EPDM gasket",
      "premium Roto/Sheba/Hopo hardware",
      "custom sizes to drawing, MOQ 1 set",
      "IP65 waterproof, Grade-12 wind resistance",
      "OEM logo, export pallet packaging",
      "2026 model, CE / AAMA / WERS-A certified",
    ],
    styles: ["System Aluminum Doors", "Xingfa Aluminum Doors", "Bertelsmann Aluminum Doors", "Tempered-Glass Doors", "Engineered Wood Doors"],
    materials: ["6063 Aluminum", "Powder-Coated Steel", "Tempered Glass", "MDF Veneer", "uPVC"],
  },
  "construction-materials": {
    variants: [
      "porcelain 600×600 / 800×800 / 1000×1000mm",
      "matte / glossy / sand-stone glaze, R10 anti-slip",
      "flexural strength ≥35 N/mm², water absorption <0.5%",
      "marble / granite / cement-look tones for 2026",
      "1.4-ton pallet packaging, ships in a 40HQ container",
      "OEM model code + logo on the tile back",
      "CE / ISO 13006 / Class A1 fire certified",
      "25-year fade-resistance warranty",
    ],
    styles: ["Marble", "Granite", "Concrete", "Wood-Look", "Terrazzo"],
    materials: ["Porcelain", "Natural Stone", "Quartz Engineered Stone", "Composite Material", "Sintered Stone"],
  },
  "hardware-tools": {
    variants: [
      "304 / 316 stainless steel, salt-corrosion-resistant",
      "800-2200W brushed motor, variable speed",
      "18V/20V/40V Lithium battery, 2-6Ah, 1h fast charge",
      "impact-resistant magnesium-aluminum housing, IP54",
      "soft-grip rubber handle, 60% vibration reduction",
      "OEM laser-engraved logo on the body",
      "with blow-mold case, full accessory set",
      "CE / GS / EMC / RoHS certified / 2-year warranty",
    ],
    styles: ["Professional", "DIY Home", "Industrial"],
    materials: ["304 Stainless Steel", "Carbon Steel", "Aluminum Alloy", "ABS Plastic", "Brass"],
  },
  "kitchen-equipment": {
    variants: [
      "brushed 304 stainless steel body, easy to clean",
      "2200W inverter induction cooktop, 9 touch-control heat levels",
      "inverter refrigerator, A++ energy rating, multi-flow cooling",
      "14-place-setting dishwasher, 6 programs + hot dry",
      "950m³/h range hood, 304 stainless steel chimney",
      "OEM for hotels / restaurants / premium apartments",
      "CE / GS / EMC / ETL / NSF certified",
      "2-year motor warranty, 1-year parts warranty",
    ],
    styles: ["Kitchen Island", "Built-Under", "Built-In", "Free-Standing", "Commercial"],
    materials: ["304 Stainless Steel", "Powder-Coated Carbon Steel", "Quartz Engineered Stone", "Tempered Glass", "Aluminum"],
  },
  "hotel-supplies": {
    variants: [
      "100% Egyptian cotton 60S/2, 600 thread count",
      "white goose down 90/10, 200gsm thickness",
      "5cm polyester memory foam, ProBact antibacterial",
      "King 200×220cm / Queen 180×200cm sizes",
      "OEM embroidered logo, MOQ 50 sets for boutique hotels",
      "OEKO-TEX 100 / ISO 9001 / Greenguard certified",
      "individual polybag + export pallet packaging",
      "2-year warranty against pilling and fading",
    ],
    styles: ["5-Star Luxury", "Boutique", "Resort", "Business", "Eco-Friendly"],
    materials: ["100% Cotton", "Linen", "Microfiber", "Bamboo Fiber", "Memory Foam", "Down"],
  },
  decoration: {
    variants: [
      "solid wood frame + 380gsm canvas, 8-color giclée print",
      "antique vintage / brushed gold / matte black finish",
      "A0/A1/A2 sizes + custom to order",
      "MOQ 30-50 pc, individual 5-layer carton packaging",
      "OEM logo on the back, Adobe AI/PSD design support",
      "FSC / CE / California Prop 65 certified",
      "2025-2026 bestseller designs from a Hangzhou studio",
      "free sample shipping for projects ≥$5K",
    ],
    styles: ["Modern", "Scandinavian", "Neoclassical", "Industrial", "Boho"],
    materials: ["MDF", "Polyurethane Resin", "Composite", "Cast Brass", "Fiberglass", "Canvas"],
  },
  "outdoor-garden": {
    variants: [
      "6063-T5 aluminum frame, powder-coated, 7-year UV resistance",
      "PE-HDPE rattan, heat-resistant -20°C to +70°C",
      "Sunbrella® / Olefin cushions, water- and mold-resistant",
      "304 stainless steel BBQ, double lid, 4-6 burners, with cart",
      "cantilever shade umbrella 3×3m / 3.5×3.5m",
      "OEM for resorts / villas / outdoor restaurants",
      "container-saving flat-pack packaging, assembly instructions",
      "CE / TUV / SGS / corrosion-resistance certified",
    ],
    styles: ["Tropical Resort", "Mediterranean", "Modern Outdoor", "Industrial", "Scandinavian"],
    materials: ["6063 Aluminum", "PE-HDPE Rattan", "Natural Teak Wood", "304 Stainless Steel", "Polywood", "Granite"],
  },
  "noi-that": {
    variants: [
      "oak/walnut/MDF-veneer frame + natural-rubber cushion",
      "King/Queen/Single sizes + custom to drawing",
      "velvet/cotton-linen/PU leather/Italian cowhide upholstery",
      "Hettich/Blum slides, soft-close, 3-section",
      "OEM for hotel / apartment / showroom projects",
      "flat-pack packaging, assembly in under 30 minutes",
      "FSC / CARB-P2 / E0 formaldehyde emission certified",
      "10-year frame warranty, 3-year upholstery warranty",
    ],
    styles: ["Modern", "Scandinavian", "Neoclassical", "Japanese-Korean Minimal", "Industrial"],
    materials: ["Natural Oak", "Walnut", "MDF Veneer", "Natural-Rubber Cushion", "Velvet", "PU Leather"],
  },
  "home-garden": {
    variants: [
      "premium materials, 7-year fade-resistant powder coat",
      "200kg load-bearing structure, 10-year outdoor durability",
      "modular design, easy to combine in many configurations",
      "OEM logo, flexible MOQ 50-100 pc",
      "flat-pack packaging, self-assembly",
      "suited to Vietnam's humid tropical climate",
      "CE / TUV / SGS / UV-resistant certified",
      "5-year warranty, project consulting support",
    ],
    styles: ["Scandinavian", "Mediterranean", "Tropical", "Industrial", "Bohemian"],
    materials: ["Natural Wood", "PE Rattan", "Painted Aluminum", "Composite", "Faux Stone"],
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
      `${title} Premium`,
      `${title} Wholesale`,
      `${title} Sample`,
      `${title} for Projects`,
    ],
    trendingChips: [
      `${title} Best Price`,
      `${title} OEM Logo`,
      `${title} New 2026 Model`,
      `${title} In Stock`,
      `${title} for Projects`,
      `${title} EU Export`,
      `${title} International Standard`,
      `${title} CE Certified`,
    ],
    productNames: variants.map((v, i) => {
      const tag = (h + i) % 4 === 0 ? "Set" : (h + i) % 4 === 1 ? "Model" : (h + i) % 4 === 2 ? "Series" : "Line";
      return `${tag} ${lower} — ${v}`;
    }),
    styles,
    materials: tpl.materials,
  };
}

// Showcase products: 12 demo products (1 per main category) — used by all
// subcat product cards which redirect to /product/demo-<parent>-1.
const SHOWCASE_PRODUCTS: Record<string, { title: string; parentName: string }> = {
  "home-garden":            { title: "Premium 80cm Decorative Composite Planter Set with Premium Artificial Greenery",            parentName: "Home & Garden" },
  "construction-materials": { title: "Premium Calacatta Marble Porcelain Slab, 1200×2400mm, Gold-Gray Veining",                   parentName: "Building Materials" },
  "bathroom-sanitary":      { title: "Smart One-Piece Toilet with LED Bidet, Tankless, Touch Control",                            parentName: "Bathroom & Sanitary" },
  "noi-that":               { title: "L-Shape 6-Seat Sofa, Italian Velvet Upholstery, PVD Gold-Plated Metal Legs",               parentName: "Furniture" },
  "kitchen-equipment":      { title: "Custom OPPEIN Gloss Acrylic Modular Kitchen Cabinet, Modern Handleless",                    parentName: "Kitchen Equipment" },
  "lighting":               { title: "Premium Modern Crystal Chandelier, 12 Dimmable LED Bulbs, for Living Rooms",               parentName: "Lighting" },
  "doors-windows":          { title: "Xingfa System-55 Aluminum Door, 4-Panel, 12mm Tempered Glass, Charcoal-Gray Frame",        parentName: "Doors & Windows" },
  "hotel-supplies":         { title: "Premium 5-Star Hotel Bedding Set, 4 Pieces, 60s Cotton, 250 Thread Count",                 parentName: "Hotel Supplies" },
  "hardware-tools":         { title: "Luxury 304 Stainless Steel Cabinet Handle Set, PVD Brushed Gold, 10 Pieces",               parentName: "Hardware & Tools" },
  "decoration":             { title: "Minimalist Italian-Style Resin Art Statue Set, 3 Pieces, Cream-White",                     parentName: "Decoration" },
  "outdoor-garden":         { title: "6-Seat PE Rattan Garden Furniture Set, Sun-Resistant, with Premium Cushions",              parentName: "Outdoor & Garden" },
  "electrical":             { title: "Smart WiFi Touch Switch Set, 4-Gang, Tuya Smart Life, Tempered-Glass Panel",               parentName: "Electrical & Appliances" },
};

function buildShowcaseLeaf(parent: string): LeafCategoryPage | null {
  const sc = SHOWCASE_PRODUCTS[parent];
  if (!sc) return null;
  const supplier: Supplier = { name: "Huayuesc Demo Factory", audited: true, loc: "Guangdong, China" };
  const lp: ListingProduct = {
    id: `demo-${parent}-1`,
    title: sc.title,
    desc: `${sc.title}. Demo product representing the ${sc.parentName} category. Contact Huayuesc for the full catalog.`,
    priceFrom: "$120",
    priceTo: "$280",
    unit: "/ Set",
    moq: "10 Set",
    img: { src: `/img/demo-${parent}-1-1.jpg?v=6`, total: 8 },
    guaranteed: true,
    supplier,
  };
  return {
    slug: `demo-${parent}`,
    parentSlug: parent,
    parentName: sc.parentName,
    l2Name: "Demo Products",
    title: `Demo ${sc.parentName}`,
    resultsCount: "1",
    chips: [{ name: sc.title.split(" ").slice(0, 4).join(" "), active: true }],
    trendingChips: [],
    faqs: [],
    filters: [],
    featured: {
      logo: "/logo/cybersilkroads-icon.png?v=6",
      name: "Huayuesc Demo",
      audited: true,
      rating: 5,
      videoCaption: "Demo showcase",
      videoSrc: `/img/${parent}-sc-fvideo.jpg?v=6`,
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
