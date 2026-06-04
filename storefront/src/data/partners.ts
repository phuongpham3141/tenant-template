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
      "Midea is a leading Chinese multi-brand home appliance group with a strategic brand portfolio spanning the mid-range to the high end. Midea's air conditioners, refrigerators, washing machines, kitchen appliances and small appliances hold leading market share in China and are exported to more than 200 countries.",
    founded: "1968",
    listed: "SZSE 000333",
    factory: {
      location: "Headquarters: Foshan, Guangdong, China",
      facilities: "30+ factories + 35+ R&D centers worldwide",
      employees: "180,000+ employees (group-wide)",
    },
    highlights: [
      "Fortune Global 500 (listed every year since 2016)",
      "7 strategic sub-brands: Midea, Little Swan, COLMO (premium AI), Toshiba (Japanese premium), Cuckoo, Hualing (young + great value), Comfee (export)",
      "Distribution network across 200+ countries",
      "Listed on the Shenzhen Stock Exchange, ticker 000333",
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
      "Toshiba Home Appliances is a premium Japanese appliance brand with more than a century of history. Its China appliance business is operated by Midea Group and focuses on the high-end market, combining Japanese technology, refined craftsmanship and outstanding food-freshness performance.",
    founded: "1875 (Toshiba Corp)",
    factory: {
      location: "Operated by Midea Group in Foshan, Guangdong, China",
      facilities: "Shares Midea Group's production facilities",
    },
    highlights: [
      "Japanese brand with more than 150 years of heritage (Toshiba Corporation founded in 1875)",
      "Appliance business operated by Midea Group since 2016 —— R&D retained in Tokyo",
      "Full product line: air conditioners, refrigerators, washing machines, dryers, cooktops, water purifiers, fans, vacuum cleaners",
      "Distributed in Vietnam as genuine products by Toshiba Lifestyle (toshiba-lifestyle.com/vn)",
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
      "Lesso is a large Chinese building materials, home and supply chain group whose businesses span plastic piping, wires and cables, building materials, environmental protection, new energy and more, serving the residential, industrial, agricultural and municipal infrastructure markets.",
    factory: {
      location: "Headquarters: Longjiang, Shunde District, Foshan, Guangdong, China",
      facilities: "30+ large factories in China and Southeast Asia",
    },
    highlights: [
      "Nationwide 24/7 hotline: 400-168-2128",
      "Presence in 7 international markets: English-speaking regions, UAE, United States, Indonesia, India, Malaysia, Cambodia",
      "6 product systems: municipal works, residential, agriculture, industrial & commercial, fire protection, gas",
      "Full-container shipping direct from the factory to Vietnam",
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
      "Teka is a Spanish kitchen and bathroom equipment group with more than a century of history and a portfolio of 3 brands: Teka (1924, German origin), Küppersbusch (1875, German premium, multiple Red Dot and IF Design awards) and Intra (1871, Swedish stainless steel sinks). It now belongs to parent company German Heritage B.",
    founded: "1924 (Teka)",
    factory: {
      location: "Headquarters: Germany (Teka), Spain (main operations)",
      facilities: "15 factories worldwide",
      employees: "5,000 employees",
      capacity: "Serving 120+ countries and 100 million households worldwide",
    },
    highlights: [
      "About 50% of Spanish households use Teka products",
      "A 3-brand portfolio: Teka (1924), Küppersbusch (1875), Intra (1871)",
      "Küppersbusch has won multiple Red Dot, IF Design and ADEX Platinum Excellence awards",
      "Küppersbusch is a founding member of the German Design Council (2016)",
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
      "Toshiba Elevator (China) is the China arm of Japan's Toshiba Group, focused on premium elevator solutions built on advanced Japanese technology. In 2024 Toshiba Elevator ranked among the world's top 7 elevator manufacturers, renowned for its magnetic-levitation guide technology, double-deck elevators and high-speed elevator records.",
    factory: {
      location: "Headquarters: Shanghai, China",
      facilities: "Production plants in Shenyang and Suzhou",
    },
    highlights: [
      "Nationwide technical hotline: 400-700-5680",
      "Top 7 elevator manufacturers worldwide (2024)",
      "12 core technologies: ultra-high speed, FLOORNAVI destination-floor group control, AI group elevator management, BIM design, magnetic-levitation guide shoes and more",
      "Recent reference projects: Inner Mongolia CT Medical Hospital, Shanxi Lu'an Huadu Phase 5 (67 units)",
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
      "Guangri Elevator is a listed company and a key subsidiary of Guangzhou Industrial Investment Holding Group (Fortune Global 500). Founded in 1956 and manufacturing freight elevators since 1973, Guangri has accumulated more than 50 years of experience and grown into a modern enterprise integrating R&D, production, installation and maintenance.",
    founded: "1956",
    factory: {
      location: "No. 636 Guomao South Avenue, Shilou Town, Panyu District, Guangzhou",
      facilities: "Main production in Guangzhou, with auxiliary sites nationwide",
    },
    highlights: [
      "Technical hotline: 400-8866-130",
      "Email: grdt@guangri.com.cn",
      "Parent company ranks among the Fortune Global 500",
      "More than 50 years of elevator manufacturing experience",
      "Full-spectrum solutions: R&D, design, production, installation, maintenance, training",
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
      "TEEHO is a best-selling smart lock brand on Amazon US, focused on the design and manufacture of fingerprint locks, keypad locks and Wi-Fi locks. Its products combine modern technology with a friendly user experience, serving the North American home, hotel and Airbnb short-stay markets.",
    factory: {
      location: "Production plant in Guangdong, China",
    },
    highlights: [
      "Best-seller in the smart lock category on Amazon US",
      "All products rated IP54 (dust and splash protection) or IP55",
      "4×AA batteries last 1 year, with no frequent recharging",
      "Operating temperature: -30°C to 70°C (suited to Vietnam's climate)",
      "30-day return policy and 24/7 customer support",
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
      "ANBI is a sanitary ceramics brand based in Chaozhou, Guangdong —— one of China's largest sanitary ceramics production bases. The brand focuses on smart toilets and integrated bathroom space design, aiming to become a home brand for the national market.",
    founded: "2021",
    factory: {
      location: "Guxiang Town, Chao'an District, Chaozhou, Guangdong, China",
    },
    highlights: [
      "Hotline: 400-8308-789",
      "Brand slogan: Smart by ANBI, enjoy with peace of mind",
      "Named one of Chaozhou's Top 10 Bathroom Brands 2024",
      "2024 Consumer Favorite Brand",
      "Selected for China's government energy-saving procurement catalog",
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
      "Guangdong Minjie is a bathroom company with the mission of building a national brand and a clean world environment. Since its founding in 1992, it has been committed to providing high-quality, human-centered bathroom solutions for users worldwide. In 2002 it formally established a ceramics production base and embarked on large-scale growth; in 2019 the brand was fully upgraded under the slogan What is Mijic is the world's; and in 2022 it further focused on human-centered bathrooms, positioning itself as the bathroom expert who better understands people. The company operates two modern ceramics factories (one with smart production) and a dedicated bathroom-cabinet customization plant, covering ceramic sanitaryware, bathroom cabinets and full bathroom space customization to form a complete industry chain.",
    founded: "1992",
    factory: {
      location: "Guangdong, China",
      facilities: "Two modern ceramics factories (including smart manufacturing) + bathroom-cabinet customization plant",
    },
    highlights: [
      "Founded in 1992 —— more than 30 years of bathroom manufacturing expertise",
      "Brand slogan: What is Mijic is the world's",
      "Focused on human-centered bathrooms —— the bathroom expert who better understands people",
      "Full product line: smart toilets, ceramic sanitaryware, bathroom cabinets, bathtubs, shower enclosures, hardware accessories",
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
      "Dulux Professional is the professional coatings product line of the AkzoNobel group (Netherlands, founded in 1792 with more than 230 years of history). The group owns globally renowned coatings brands such as Dulux, International, Sikkens and Interpon, operates in more than 150 countries and employs 34,000 people.",
    founded: "1792 (AkzoNobel)",
    factory: {
      location: "AkzoNobel headquarters: Amsterdam, Netherlands",
      facilities: "Production in more than 150 countries",
      employees: "About 34,000 worldwide",
    },
    highlights: [
      "The world's oldest coatings group —— more than 230 years",
      "Multi-brand portfolio: Dulux, International, Sikkens, Interpon",
      "Positioned as a professional solutions partner —— one-stop solutions, technology and color services for B2B",
      "Key China clients: Vanke, Longfor, China Resources, Country Garden, China Merchants Shekou, Yuexiu Property",
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
      "Oriental Yuhong is a leading Chinese group in waterproofing, thermal insulation and residential building coatings, listed on the Shenzhen Stock Exchange under ticker 002271. 2023 revenue was about RMB 32.8 billion, with 1,916 patents and 68 production, R&D and logistics bases (3 of them outside China).",
    founded: "1995",
    listed: "SZSE 002271",
    factory: {
      location: "Headquarters: Beijing, China",
      facilities: "68 bases (production, R&D, logistics, including 3 overseas)",
      capacity: "Waterproof membranes 1.5 billion m²/yr · waterproof coatings 5 million tons/yr · mortar 20+ million tons/yr · insulation 10+ million m³/yr",
    },
    highlights: [
      "Listed on the SZSE —— ticker 002271",
      "2023 revenue: about RMB 32.8 billion, net profit about RMB 2.27 billion",
      "1,916 patents (group-wide)",
      "Operates a State Key Laboratory for advanced waterproofing materials",
      "Provided waterproofing for the Bird's Nest, the Water Cube (2008 Beijing Olympics) and the National Center for the Performing Arts",
      "Hotlines by product line: engineering 400-779-1975 / residential 400-700-5756 / repair 400-995-8686 / mortar 400-685-0885",
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
      "Langhui (Guangdong Langhui Building Materials) is a specialist manufacturer of autoclaved aerated concrete ALC/AAC panels based in Guangdong, China. Its production park covers 246 mu (about 166 hectares), represents an investment of about RMB 4.2 billion, and runs more than 120 sets of highly automated equipment with an annual capacity of over 1 million cubic meters.",
    factory: {
      location: "No. 133-8 Mingba Road, Gaoming Industrial Park, Foshan, Guangdong",
      area: "246 mu (about 166 hectares)",
      capacity: "1 million+ m³/yr",
      facilities: "120+ sets of automated equipment",
      investment: "About RMB 4.2 billion",
    },
    highlights: [
      "Sales hotline: 133-1632-2103 / email: salesem@gdlanghui.com",
      "Firewall products with fire resistance over 4 hours",
      "50/75mm ultra-thin panels exported to Australia, Japan and South Korea",
      "Reference projects: Longfor Properties, Agile Xiyuefu",
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
      "Duc Thinh Stone Technology is the Vietnam-incorporated company of the Pengxiang Group (Fujian, China) —— Pengxiang is one of Asia's leading manufacturers of premium engineered stone. The factory is located in the Nghia Dan Industrial Park, Nghe An province, Vietnam, with a USD 25 million investment, around 800-1,000 employees and an annual output of 8.5 million m² of slabs. Its products serve the Vietnam domestic market and are exported to 120+ countries.",
    factory: {
      location: "Nghia Tho Commune, Nghia Dan Industrial Park, Nghe An, Vietnam",
      area: "400,000 m² (about 40 hectares)",
      employees: "About 800–1,000 people",
      capacity: "8.5 million m² of slabs/yr",
      investment: "USD 25 million",
    },
    highlights: [
      "Vietnam-incorporated company —— produced locally in Vietnam, with convenient logistics",
      "Hotline: (+84) 238-863-9666 / email: office@ducthinhstone.com",
      "Parent company Pengxiang Group (Fujian, China) —— a top-tier Asian engineered stone manufacturer",
      "Exported to more than 120 countries",
      "Applications: kitchen countertops, bathroom cabinets, wall finishes, staircases, premium home interiors, shopping malls, hotels",
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
      "Foshan Lighting (FSL) is one of China's oldest lighting companies, founded in 1958. The company now owns a complete LED industry chain —— from upstream chips, to mid-stream LED packaging, to downstream LED luminaire applications. FSL continues to expand into new fields such as smart lighting, health, marine, aviation, sports, agriculture and aquaculture.",
    founded: "1958",
    factory: {
      location: "Headquarters: Foshan, Guangdong, China",
      facilities: "Complete LED industry chain: chips + packaging + applications",
    },
    highlights: [
      "China's first listed lighting company —— recognized as a China Time-Honored Brand",
      "Complete in-house LED industry chain (chips → packaging → applications)",
      "3 core businesses: general lighting, electrical engineering, automotive lighting",
      "Expanding into smart lighting, healthcare, marine, aviation and sports",
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
      "CareLighting belongs to Zhejiang Xuguang Electronic Co., Ltd. —— a supplier of LED luminaire application solutions integrating R&D + production + sales + service. The company listed on the NEEQ (New Third Board) in 2016 under ticker 839762, was named one of China's Top 10 LED Brands, and is a drafting unit for the national safety standard for self-ballasted LED lamps above 50V.",
    founded: "1995 (CareLighting brand)",
    listed: "NEEQ 839762",
    factory: {
      location: "Headquarters: Zhejiang, China",
      facilities: "Production base in Zhejiang, distribution network across 26 provinces/cities",
    },
    highlights: [
      "Listed on the NEEQ (New Third Board) —— ticker 839762 (2016)",
      "One of China's Top 10 LED Brands",
      "National-standard drafting unit: safety requirements for self-ballasted LED lamps above 50V",
      "A network of 500 distribution stores across 26 provinces, municipalities and autonomous regions",
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
      "Kaiping Daweier is a China-US joint venture specializing in premium stainless steel sinks + faucets + stainless steel floor drains + kitchen and bathroom accessories. Integrating design + R&D + production + marketing + service, Daweier is a leader in China's sink market and earned ISO 9001 and UPC certification early on.",
    factory: {
      location: "Shuikou Town, Kaiping, Guangdong, China",
      facilities: "Modern 60,000+ m² factory in Kaiping —— China's Bathroom Kingdom",
    },
    highlights: [
      "China-US joint venture, founded in 1998 —— more than 25 years of expertise",
      "Earned ISO 9001 (quality) + UPC (US uPVC product certification) early on",
      "A leader in China's stainless steel sink market",
      "Products exported to more than 30 countries and regions",
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
      "Dongyuan Kitchenware is a modern enterprise based in Shunde District, Foshan —— one of China's largest manufacturing industry clusters. Founded in 1993, it integrates R&D + production + sales and focuses on stainless steel sinks, kitchen utensils + hardware products. Annual output exceeds 1.8 million units, exported to more than 30 countries.",
    founded: "1993",
    factory: {
      location: "Shunde District, Foshan, Guangdong, China",
      area: "About 60,000 m²",
      capacity: "1.8 million+ units/yr",
    },
    highlights: [
      "30+ years of expertise (since 1993) —— deep experience in sinks + kitchen hardware",
      "Annual output exceeds 1.8 million units",
      "Exported to more than 30 countries and regions worldwide",
      "Shunde industry cluster —— China's leading metalworking hub",
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
      "Fujian Pengxiang Industry is a premium stone manufacturing group based in Fujian, China, and one of Asia's leading engineered stone manufacturers. Its main products include engineered quartz, reconstituted marble, terrazzo and 3D quartz. The group is also the parent company of Duc Thinh Stone in Nghe An, Vietnam (its Vietnam-incorporated company).",
    factory: {
      location: "Fujian, China + factory in the Nghia Dan Industrial Park, Nghe An, Vietnam (via Duc Thinh Stone)",
      facilities: "Fully automated engineered stone production technology —— meets international standards",
    },
    highlights: [
      "One of Asia's largest engineered stone manufacturers",
      "Operates a Vietnam-incorporated company (Duc Thinh Stone) in the Nghia Dan Industrial Park, Nghe An, Vietnam",
      "Vietnam factory investment: USD 25 million, annual capacity 8.5 million m²",
      "Exported to more than 120 countries worldwide",
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
      "Guangdong Zhongju Yabai Building Materials specializes in inorganic pre-coated boards —— also known as ice-and-fire boards —— a premium finishing material for interior and exterior partition walls and ceilings. The products are fireproof, moisture-resistant, mildew-resistant, antibacterial and emit no formaldehyde.",
    factory: {
      location: "Guangdong, China",
      facilities: "Fully automated production line —— inorganic pre-coated boards",
    },
    highlights: [
      "Inorganic pre-coated boards —— fireproof + moisture-resistant + mildew-resistant",
      "Antibacterial, zero-formaldehyde products —— meet hospital + cleanroom standards",
      "Applications: interior and exterior partition walls, ceilings, medical walls, laboratories",
      "Ice-and-fire board products —— heat- and low-temperature resistant",
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
      "LINVOL is the official elevator brand of Midea Group —— focused on villa elevators, retrofit elevators for older buildings, escalators and passenger elevators. Guided by the philosophy that every trip is a better arrival, LINVOL integrates digital technology + AI across the full elevator life cycle: design → production → customization → R&D → operation → maintenance.",
    factory: {
      location: "R&D + factory zone: Guangdong, China (Midea campus)",
      facilities: "Midea Digital Elevator R&D Center + Foshan campus factory",
    },
    highlights: [
      "Official elevator brand of Midea Group (Fortune Global 500)",
      "Concierge + expert full life cycle —— lifetime warranty + maintenance",
      "Digital technology + AI throughout the entire elevator life cycle",
      "4 product lines: villa, retrofit, escalator, passenger elevator",
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
      "TTLock (developed by Sciener) is a leading global supplier of smart lock solutions —— including PCBA hardware that fits all types of door locks + a management software platform + integrated systems for hotels, Airbnb, serviced apartments and enterprises. The TTLock ecosystem connects more than 30 Chinese software partners, serving the apartment rental + property management markets.",
    factory: {
      location: "R&D + production headquarters: China —— global distribution",
      facilities: "R&D center + dedicated PCBA production line for smart locks",
    },
    highlights: [
      "A leading global supplier of smart lock solutions (self-described)",
      "PCBA integrates into all types of door locks —— upgrading ordinary locks into smart locks",
      "An ecosystem of 30+ software partners serving the rental + property management markets",
      "Dedicated software: TTLock app, TTRenting, TTHotel Pro, TTology",
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
      "KITO (Guangdong KITO Ceramics Group) is a leading Chinese manufacturer of tiles + sintered stone slabs —— self-described as the pioneer of textured tiles in China. Its operating headquarters is at Tower T6, Xincheng Zhihui, No. 28 Jihua Road, Chancheng District, Foshan, Guangdong. KITO is positioned in the mid-to-high-end segment, offers 6 art-tile series and provides one-stop, full-package delivery for interior design.",
    factory: {
      location: "Foshan, Guangdong, China (No. 28 Jihua Road, Chancheng —— Xincheng Zhihui T6)",
      facilities: "Foshan industry cluster —— China's Tile Capital",
    },
    highlights: [
      "Pioneer of textured tiles in China",
      "6 exclusive art-tile series —— mid-to-high-end positioning",
      "One-stop, full-package delivery for interior design",
      "Also operates the export brand KITO Ceramics (kitoceramics.com)",
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
      "3TREES (SKSHU Paint) is a listed Chinese coatings group whose brand slogan is rooted between heaven and earth, greening the world. The company offers a complete home-decoration product system (interior wall paint + art paint + Little Forest panels) and an engineering product system (waterproof coatings + industrial coatings). 3TREES launched its Move In Now service —— a fast-turnaround home-decoration and construction package.",
    listed: "SSE 603737 (reference)",
    factory: {
      location: "Headquarters: Putian, Fujian, China",
      facilities: "SSE-listed group —— large-scale coatings production cluster system",
    },
    highlights: [
      "Large listed Chinese coatings group —— stock ticker SSE 603737",
      "Move In Now one-stop service —— fast-turnaround painting delivery",
      "Complete product system: home decoration + engineering + industrial + waterproofing",
      "Brand slogan: rooted between heaven and earth, greening the world",
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
    introduction:
      "BRAVAT is a premium bathroom brand under the Dietsche Group —— a German bathroom group with more than a century of history. Positioned around the idea that life truly begins here, BRAVAT offers complete bathroom solutions: smart products + hardware + toilets + bathroom furniture + basins + bathtubs + shower enclosures + accessories. It serves global markets (Germany, United States, China, Brazil, Australia, Singapore, Vietnam, Russia, Mexico).",
    factory: {
      location: "China headquarters: BRAVAT China",
      facilities: "China factory + R&D —— part of Dietsche's global system",
    },
    highlights: [
      "Parent company Dietsche —— a German bathroom group with more than a century of history",
      "Complete product system: 8 series, from smart products to accessories",
      "Reference projects: Marriott, Hyatt Da Nang (Vietnam), Sber City",
      "Distribution in 10+ markets: Germany, United States, China, Brazil, Australia, Singapore, Vietnam, Russia, Mexico",
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
      "Sylvania Group (Feilo Sylvania) is an international lighting group dating back to 1901 and one of the world's oldest and most respected lighting brands. It operates across Europe, Latin America, Asia and Africa, with a product portfolio covering architectural, industrial, retail, office and urban lighting. After merging with Shanghai Feilo Acoustics Group, Sylvania joined a China-international ecosystem, combining Western lighting technology with the Chinese supply chain.",
    founded: "1901",
    factory: {
      location: "Multinational operations —— European headquarters + China factory (Feilo)",
      facilities: "Multi-continent R&D + factory network (Europe, the Americas, Asia)",
    },
    highlights: [
      "International lighting brand dating back to 1901 —— more than 120 years of history",
      "Cross-continent operations: Europe + the Americas + Asia + Africa",
      "Product portfolio covers: architectural, industrial, retail, office, urban",
      "Part of the Feilo Sylvania group —— combining Western technology + the Chinese supply chain",
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
