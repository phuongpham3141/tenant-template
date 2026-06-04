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

export const HOT_SEARCHES = [
  "porcelain tile",
  "large marble slabs",
  "sofa set",
  "kitchen cabinets",
  "engineered wood flooring",
  "hotel beds",
];

export const NAV_CATEGORIES = [
  { icon: "🏠", name: "Home & Garden", slug: "home-garden" },
  { icon: "🧱", name: "Building Materials", slug: "construction-materials" },
  { icon: "🚿", name: "Bathroom & Sanitary", slug: "bathroom-sanitary" },
  { icon: "🛋", name: "Furniture", slug: "noi-that" },
  { icon: "🍳", name: "Kitchen Equipment", slug: "kitchen-equipment" },
  { icon: "💡", name: "Lighting", slug: "lighting" },
  { icon: "🪟", name: "Doors & Windows", slug: "doors-windows" },
  { icon: "⚡", name: "Electrical & Appliances", slug: "electrical" },
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
    main: { icon: "🏠", name: "Home & Garden", slug: "home-garden" },
    items: [
      {
        name: "Elevators", slug: "thang-may", icon: "🛗",
        image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5",
        tagline: "Passenger elevators / escalators / fire-rated elevators — full range of capacities and applications.",
        highlights: [
          { name: "Passenger elevators",       image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "thang-may-cho-khach" },
          { name: "Escalators",                image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "thang-cuon" },
          { name: "Fire-rated elevators",      image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "thang-chong-chay" },
          { name: "6-person elevators",        image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "thang-may-cho-khach" },
          { name: "13-person elevators",       image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "thang-may-cho-khach" },
          { name: "Airport escalators",        image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "thang-cuon" },
        ],
        sections: [
          { title: "Passenger Elevators", items: [
            { name: "6-person cabin (450 kg)", slug: "thang-may-cho-khach" },
            { name: "13-person cabin (1000 kg)", slug: "thang-may-cho-khach" },
            { name: "21-person cabin (1600 kg)", slug: "thang-may-cho-khach" },
            { name: "Speed 1.0–2.5 m/s", slug: "thang-may-cho-khach" },
          ]},
          { title: "Escalators", items: [
            { name: "Step width 600–1000 mm", slug: "thang-cuon" },
            { name: "Incline 30° / 35°", slug: "thang-cuon" },
            { name: "Shopping malls", slug: "thang-cuon" },
            { name: "Airport / metro", slug: "thang-cuon" },
          ]},
          { title: "Fire-Rated Elevators", items: [
            { name: "120-minute fire-rated cabin", slug: "thang-chong-chay" },
            { name: "Heat-resistant doors", slug: "thang-chong-chay" },
            { name: "Backup UPS power", slug: "thang-chong-chay" },
            { name: "EN 81-72 / TCVN 6396", slug: "thang-chong-chay" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🧱", name: "Building Materials", slug: "construction-materials" },
    items: [
      {
        name: "Steel & Metal", slug: "ket-cau-thep-khung", icon: "🔩",
        image: "/img/thep-hinh-h-i-u-v.jpg?v=5",
        tagline: "H/I/U/V-section steel, steel pipe, steel plate, color-coated roofing — quoted per ton FOB Guangzhou.",
        highlights: [
          { name: "H/I/U/V-section steel",  image: "/img/thep-hinh-h-i-u-v.jpg?v=5", slug: "ket-cau-thep-khung" },
          { name: "Black / galvanized steel pipe",  image: "/img/ceramic-1-2.jpg?v=5", slug: "ket-cau-thep-khung" },
          { name: "Steel coil plate",      image: "/img/ceramic-1-3.jpg?v=5", slug: "ket-cau-thep-khung" },
          { name: "Box section steel",      image: "/img/ceramic-1-4.jpg?v=5", slug: "ket-cau-thep-khung" },
          { name: "Color-coated roofing",     image: "/img/ceramic-1-5.jpg?v=5", slug: "ton-lanh" },
          { name: "I-beam steel",   image: "/img/cer3.jpg?v=5", slug: "ket-cau-thep-khung" },
        ],
        sections: [
          { title: "Steel", items: [
            { name: "Color-coated roofing", slug: "ton-lanh" },
            { name: "I-beam steel", slug: "ket-cau-thep-khung" },
          ]},
          { title: "By shape", items: [
            { name: "H/I-section steel", slug: "ket-cau-thep-khung" },
            { name: "U/V-section steel", slug: "ket-cau-thep-khung" },
            { name: "Square box section", slug: "ket-cau-thep-khung" },
            { name: "Round steel pipe", slug: "ket-cau-thep-khung" },
          ]},
          { title: "By surface", items: [
            { name: "Black steel", slug: "ket-cau-thep-khung" },
            { name: "Hot-dip galvanized", slug: "ket-cau-thep-khung" },
            { name: "Powder coating", slug: "ket-cau-thep-khung" },
            { name: "Stainless steel 304/316", slug: "ket-cau-thep-khung" },
          ]},
          { title: "By standard", items: [
            { name: "JIS SS400", slug: "ket-cau-thep-khung" },
            { name: "EN S275JR", slug: "ket-cau-thep-khung" },
            { name: "GB Q235", slug: "ket-cau-thep-khung" },
            { name: "ASTM A36", slug: "ket-cau-thep-khung" },
          ]},
          { title: "Accessories", items: [
            { name: "Anchor bolts M16+", slug: "ket-cau-thep-khung" },
            { name: "High-strength bolts", slug: "ket-cau-thep-khung" },
            { name: "Welded steel mesh", slug: "ket-cau-thep-khung" },
            { name: "Steel rivets", slug: "ket-cau-thep-khung" },
          ]},
        ],
      },
      {
        name: "Wall & Ceiling Panels", slug: "tam-op-tuong-tran", icon: "🟦",
        image: "/img/cer6.jpg?v=5",
        tagline: "Porcelain panels, ceramics, MDF — interior design for hotels and villas.",
        highlights: [
          { name: "Large porcelain panels",  image: "/img/cer6.jpg?v=5", slug: "tam-op-tuong-tran" },
          { name: "3D wall panels",       image: "/img/cer4.jpg?v=5", slug: "tam-op-tuong-tran" },
          { name: "Gypsum ceilings",     image: "/img/cer5.jpg?v=5", slug: "tam-op-tuong-tran" },
          { name: "MDF wood cladding",          image: "/img/cer8.jpg?v=5", slug: "tam-op-tuong-tran" },
          { name: "Acoustic panels",  image: "/img/cer3.jpg?v=5", slug: "tam-cach-am" },
          { name: "ALC blocks", image: "/img/cer2.jpg?v=5", slug: "gach-alc-acc" },
        ],
        sections: [
          { title: "Wall Materials", items: [
            { name: "Acoustic panels", slug: "tam-cach-am" },
            { name: "ALC / ACC blocks", slug: "gach-alc-acc" },
          ]},
          { title: "Wall panels", items: [
            { name: "Large porcelain panels", slug: "tam-op-tuong-tran" },
            { name: "3D PVC panels", slug: "tam-op-tuong-tran" },
            { name: "Composite panels", slug: "tam-op-tuong-tran" },
            { name: "Gloss acrylic panels", slug: "tam-op-tuong-tran" },
          ]},
          { title: "Gypsum ceilings", items: [
            { name: "Flush concealed ceiling", slug: "tam-op-tuong-tran" },
            { name: "60×60 drop ceiling", slug: "tam-op-tuong-tran" },
            { name: "60×120 grid ceiling", slug: "tam-op-tuong-tran" },
            { name: "Perforated nano ceiling", slug: "tam-op-tuong-tran" },
          ]},
          { title: "Decorative wood cladding", items: [
            { name: "Oak veneer MDF", slug: "tam-op-tuong-tran" },
            { name: "Moisture-resistant HDF", slug: "tam-op-tuong-tran" },
            { name: "WPC wood-plastic", slug: "tam-op-tuong-tran" },
            { name: "Pine trim molding", slug: "tam-op-tuong-tran" },
          ]},
          { title: "Accessories", items: [
            { name: "Galvanized framing", slug: "tam-op-tuong-tran" },
            { name: "Panel adhesive", slug: "tam-op-tuong-tran" },
            { name: "Recessed LED lighting", slug: "tam-op-tuong-tran" },
            { name: "PVC trim molding", slug: "tam-op-tuong-tran" },
          ]},
        ],
      },
      {
        name: "Flooring Materials", slug: "vat-lieu-lat-san", icon: "🟫",
        image: "/img/cer7.jpg?v=5",
        tagline: "SPC + LVT flooring, solid wood, floor tiles — DDP in 18 days.",
        highlights: [
          { name: "SPC + LVT flooring",          image: "/img/cer7.jpg?v=5", slug: "san-go-spc-lvt" },
          { name: "Engineered flooring", image: "/img/cer8.jpg?v=5", slug: "san-go-engineered" },
          { name: "Solid wood flooring",   image: "/img/cer2.jpg?v=5", slug: "san-go-tu-nhien" },
          { name: "Floor tiles",          image: "/img/cer1.jpg?v=5", slug: "gach-op-lat" },
          { name: "Granite slabs",            image: "/img/da-granite-tu-nhien.jpg?v=5", slug: "vat-lieu-lat-san" },
          { name: "Outdoor flooring",            image: "/img/cer5.jpg?v=5", slug: "vat-lieu-lat-san" },
        ],
        sections: [
          { title: "Wood Flooring", items: [
            { name: "SPC + LVT flooring", slug: "san-go-spc-lvt" },
            { name: "Multi-layer engineered flooring", slug: "san-go-engineered" },
            { name: "Solid hardwood flooring", slug: "san-go-tu-nhien" },
          ]},
          { title: "Floor materials", items: [
            { name: "Floor tiles", slug: "gach-op-lat" },
          ]},
          { title: "Porcelain tile", items: [
            { name: "Polished glossy", slug: "vat-lieu-lat-san" },
            { name: "Matte", slug: "vat-lieu-lat-san" },
            { name: "3D texture", slug: "vat-lieu-lat-san" },
            { name: "Mosaic", slug: "vat-lieu-lat-san" },
          ]},
          { title: "Wood flooring", items: [
            { name: "3-layer engineered", slug: "vat-lieu-lat-san" },
            { name: "Laminate AC4", slug: "vat-lieu-lat-san" },
            { name: "Vinyl SPC", slug: "vat-lieu-lat-san" },
            { name: "Carbonized bamboo", slug: "vat-lieu-lat-san" },
          ]},
          { title: "Natural stone", items: [
            { name: "Carrara marble", slug: "vat-lieu-lat-san" },
            { name: "Black granite", slug: "vat-lieu-lat-san" },
            { name: "Travertine", slug: "vat-lieu-lat-san" },
            { name: "Chinese black slate", slug: "vat-lieu-lat-san" },
          ]},
          { title: "Accessories", items: [
            { name: "Skirting molding", slug: "vat-lieu-lat-san" },
            { name: "Door threshold trim", slug: "vat-lieu-lat-san" },
            { name: "Floor adhesive", slug: "vat-lieu-lat-san" },
            { name: "Underlay", slug: "vat-lieu-lat-san" },
          ]},
        ],
      },
      {
        name: "Stone & Engineered Stone", slug: "da-op-lat", icon: "⛰️",
        image: "/img/da-marble-tu-nhien.jpg?v=5",
        tagline: "Fujian marble, granite, quartz — large slabs for kitchen countertops and lobbies.",
        highlights: [
          { name: "Natural marble",                  image: "/img/da-marble-tu-nhien.jpg?v=5", slug: "da-op-lat" },
          { name: "Granite slabs",                      image: "/img/da-granite-tu-nhien.jpg?v=5", slug: "da-op-lat" },
          { name: "Natural quartz stone",  image: "/img/da-quartz-nhan-tao.jpg?v=5", slug: "da-thach-anh-tu-nhien" },
          { name: "Engineered quartz stone", image: "/img/da-mosaic-trang-tri.jpg?v=5", slug: "da-thach-anh-nhan-tao" },
          { name: "Inorganic terrazzo stone",     image: "/img/da-op-ngoai-that.jpg?v=5", slug: "da-mai-vo-co" },
          { name: "Sintered stone",                       image: "/img/da-sintered-da-thieu-ket.jpg?v=5", slug: "da-op-lat" },
        ],
        sections: [
          { title: "Specialty Stone", items: [
            { name: "Natural quartz stone", slug: "da-thach-anh-tu-nhien" },
            { name: "Engineered quartz / marble", slug: "da-thach-anh-nhan-tao" },
            { name: "Inorganic terrazzo stone", slug: "da-mai-vo-co" },
          ]},
          { title: "Natural marble", items: [
            { name: "White Carrara", slug: "da-op-lat" },
            { name: "Black Marquina", slug: "da-op-lat" },
            { name: "Yellow beige", slug: "da-op-lat" },
            { name: "Rosa Portugal pink", slug: "da-op-lat" },
          ]},
          { title: "Granite", items: [
            { name: "Pure black", slug: "da-op-lat" },
            { name: "Brazil red", slug: "da-op-lat" },
            { name: "Sardo gray", slug: "da-op-lat" },
            { name: "Tropic yellow", slug: "da-op-lat" },
          ]},
          { title: "Engineered stone", items: [
            { name: "Marble-look quartz", slug: "da-op-lat" },
            { name: "Metallic-look quartz", slug: "da-op-lat" },
            { name: "Acrylic solid surface", slug: "da-op-lat" },
            { name: "Engineered terrazzo", slug: "da-op-lat" },
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
        name: "Paint & Coatings", slug: "son-lop-phu", icon: "🎨",
        image: "/img/son-epoxy-san.jpg?v=5",
        tagline: "Epoxy floor paint, fire-retardant paint, decorative render — meets QCVN standards.",
        highlights: [
          { name: "Interior / art wall paint", image: "/img/son-epoxy-san.jpg?v=5", slug: "son-tuong-trong-nghe-thuat" },
          { name: "Exterior stone-look paint",  image: "/img/ceramic-2-1.jpg?v=5", slug: "son-mat-tuong-ngoai" },
          { name: "Tile adhesive",                     image: "/img/ceramic-2-2.jpg?v=5", slug: "keo-gach-op" },
          { name: "Decorative grout sealant",         image: "/img/ceramic-2-3.jpg?v=5", slug: "keo-chit-mach" },
          { name: "Waterproofing paint",                image: "/img/ceramic-2-5.jpg?v=5", slug: "son-chong-tham" },
          { name: "Epoxy floor paint",                            image: "/img/ceramic-2-4.jpg?v=5", slug: "son-lop-phu" },
        ],
        sections: [
          { title: "Paint", items: [
            { name: "Interior / art latex paint", slug: "son-tuong-trong-nghe-thuat" },
            { name: "Exterior stone-look paint", slug: "son-mat-tuong-ngoai" },
            { name: "Tile adhesive", slug: "keo-gach-op" },
            { name: "Decorative grout sealant", slug: "keo-chit-mach" },
            { name: "Waterproofing paint", slug: "son-chong-tham" },
          ]},
          { title: "Interior paint", items: [
            { name: "Alkali-resistant primer", slug: "son-lop-phu" },
            { name: "Gloss topcoat", slug: "son-lop-phu" },
            { name: "Textured paint", slug: "son-lop-phu" },
            { name: "Anti-mold paint", slug: "son-lop-phu" },
          ]},
          { title: "Exterior paint", items: [
            { name: "Ultra-durable nano paint", slug: "son-lop-phu" },
            { name: "Heat-reflective paint", slug: "son-lop-phu" },
            { name: "Pavement / line-marking paint", slug: "son-lop-phu" },
            { name: "Epoxy floor paint", slug: "son-lop-phu" },
          ]},
          { title: "Specialty paint", items: [
            { name: "Fire-retardant paint", slug: "son-lop-phu" },
            { name: "Waterproof paint", slug: "son-lop-phu" },
            { name: "Anti-static paint", slug: "son-lop-phu" },
            { name: "Insulating paint", slug: "son-lop-phu" },
          ]},
          { title: "Paint accessories", items: [
            { name: "Masking tape", slug: "son-lop-phu" },
            { name: "Rollers / brushes", slug: "son-lop-phu" },
            { name: "Floor protection sheeting", slug: "son-lop-phu" },
            { name: "Wall putty", slug: "son-lop-phu" },
          ]},
        ],
      },
      {
        name: "Acoustic & Thermal Insulation", slug: "vat-lieu-cach-am-cach-nhiet", icon: "🧊",
        image: "/img/tam-cach-am.jpg?v=5",
        tagline: "Mineral wool, EPS/XPS, rubber foam — for karaoke rooms, factories, cold storage.",
        highlights: [
          { name: "Rockwool mineral wool", image: "/img/bong-khoang-rockwool.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Acoustic wall panels",   image: "/img/tam-cach-am.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Glass wool",      image: "/img/bong-thuy-tinh-cach-nhiet.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Polyester wool",      image: "/img/bong-polyester.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "EPS/XPS boards",         image: "/img/ceramic-3-1.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Insulation foil",     image: "/img/ceramic-3-2.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
        ],
        sections: [
          { title: "Mineral wool", items: [
            { name: "Rockwool boards", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Glass wool rolls", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Heat-resistant ceramic wool", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Silica aerogel wool", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "Foam", items: [
            { name: "PE foam rolls", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Spray PU foam", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Phenolic foam", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Molded EPP", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "EPS / XPS", items: [
            { name: "Standard EPS boards", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Compression-rated XPS boards", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Molded EPS SIPs", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "XPS roofing", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "Insulation accessories", items: [
            { name: "Heat-reflective aluminum foil", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Insulation wool adhesive", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Bracing bars / galvanized framing", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Specialty anchor screws", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
        ],
      },
      {
        name: "Waterproofing", slug: "vat-lieu-chong-tham", icon: "💧",
        image: "/img/mang-chong-tham-bitum.jpg?v=5",
        tagline: "Self-adhesive bitumen membrane, polyurethane coating, PU sealant — 10–15 year warranty.",
        highlights: [
          { name: "Self-adhesive bitumen membrane",  image: "/img/mang-chong-tham-bitum.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "PU waterproofing coating",   image: "/img/ceramic-4-1.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "Silicone sealant",        image: "/img/ceramic-4-2.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "Cement additive",     image: "/img/ceramic-4-3.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "PVC waterstop",   image: "/img/ceramic-4-4.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "Waterproofing mortar",      image: "/img/ceramic-4-5.jpg?v=5", slug: "vat-lieu-chong-tham" },
        ],
        sections: [
          { title: "Bitumen membrane", items: [
            { name: "Self-adhesive SBS", slug: "vat-lieu-chong-tham" },
            { name: "Torch-applied APP", slug: "vat-lieu-chong-tham" },
            { name: "3mm-thick roll", slug: "vat-lieu-chong-tham" },
            { name: "4mm-thick roll", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "Waterproofing coating", items: [
            { name: "Elastomeric PU 1K", slug: "vat-lieu-chong-tham" },
            { name: "Elastomeric PU 2K", slug: "vat-lieu-chong-tham" },
            { name: "Water-based acrylic", slug: "vat-lieu-chong-tham" },
            { name: "High-pressure spray polyurea", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "Sealants & Additives", items: [
            { name: "Neutral silicone", slug: "vat-lieu-chong-tham" },
            { name: "MS Polymer", slug: "vat-lieu-chong-tham" },
            { name: "Cement waterproofing additive", slug: "vat-lieu-chong-tham" },
            { name: "2K waterproofing slurry", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "Installation accessories", items: [
            { name: "PVC waterstop", slug: "vat-lieu-chong-tham" },
            { name: "Reinforcing fiber mesh", slug: "vat-lieu-chong-tham" },
            { name: "Butyl tape", slug: "vat-lieu-chong-tham" },
            { name: "Non-shrink grout", slug: "vat-lieu-chong-tham" },
          ]},
        ],
      },
      {
        name: "Cement & Mortar", slug: "vat-lieu-kho-xi-mang-vua", icon: "🏗️",
        image: "/img/chau-xi-mang.jpg?v=5",
        tagline: "Ha Tien cement, pre-mixed dry mortar, concrete additives — delivered to the job site.",
        highlights: [
          { name: "General-purpose cement",     image: "/img/chau-xi-mang.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Pre-mixed mortar",        image: "/img/ceramic-5-1.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Concrete additives",     image: "/img/ceramic-5-2.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Non-shrink grout",  image: "/img/ceramic-5-3.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Tile adhesive",        image: "/img/ceramic-5-4.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Acid-resistant mortar",      image: "/img/ceramic-5-5.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
        ],
        sections: [
          { title: "Bagged cement", items: [
            { name: "PCB30 general-purpose", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCB40 high-compression", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCB50 high-strength", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "White cement", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "Pre-mixed dry mortar", items: [
            { name: "Masonry & rendering mortar", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Bonding mortar", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Finishing render", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Self-leveling compound", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "Concrete additives", items: [
            { name: "Fast-setting", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Slow-setting", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCE superplasticizer", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Concrete waterproofing", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "Adhesives & Grout", items: [
            { name: "1K tile adhesive", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "2K tile adhesive", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Epoxy grout", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Anti-mold cement grout", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🚿", name: "Bathroom & Sanitary", slug: "bathroom-sanitary" },
    items: [
      {
        name: "Ceramic Toilets", slug: "bon-cau-su", icon: "🚽",
        image: "/img/bathroom-1-1.jpg?v=5",
        tagline: "One-piece, two-piece, wall-hung toilets — glazed ceramic with quiet siphon flush.",
        highlights: [
          { name: "One-piece siphon toilet",  image: "/img/bathroom-1-1.jpg?v=5", slug: "bon-cau-su" },
          { name: "Standard two-piece toilet", image: "/img/bathroom-1-2.jpg?v=5", slug: "bon-cau-su" },
          { name: "Wall-hung toilet",       image: "/img/bathroom-1-3.jpg?v=5", slug: "bon-cau-su" },
          { name: "Ceramic squat pan",            image: "/img/bathroom-1-4.jpg?v=5", slug: "bon-cau-su" },
        ],
        sections: [
          { title: "Flush type", items: [
            { name: "Quiet siphon", slug: "bon-cau-su" },
            { name: "Direct flush", slug: "bon-cau-su" },
            { name: "Pressure-assisted", slug: "bon-cau-su" },
          ]},
          { title: "Installation type", items: [
            { name: "One-piece", slug: "bon-cau-su" },
            { name: "Two-piece with tank", slug: "bon-cau-su" },
            { name: "Wall-hung", slug: "bon-cau-su" },
          ]},
          { title: "Water standard", items: [
            { name: "3/6L water-saving", slug: "bon-cau-su" },
            { name: "WaterSense", slug: "bon-cau-su" },
            { name: "CUPC", slug: "bon-cau-su" },
          ]},
        ],
      },
      {
        name: "Smart Toilets", slug: "bon-cau-thong-minh", icon: "🤖",
        image: "/img/bathroom-2-1.jpg?v=5",
        tagline: "Smart toilets with washing + drying + heated seat + auto deodorizing.",
        highlights: [
          { name: "Smart one-piece",   image: "/img/bathroom-2-1.jpg?v=5", slug: "bon-cau-thong-minh" },
          { name: "Add-on smart seat",         image: "/img/bathroom-2-2.jpg?v=5", slug: "bon-cau-thong-minh" },
          { name: "Smart wall-hung", image: "/img/bathroom-2-3.jpg?v=5", slug: "bon-cau-thong-minh" },
          { name: "Premium Japanese-grade",   image: "/img/bathroom-2-4.jpg?v=5", slug: "bon-cau-thong-minh" },
        ],
        sections: [
          { title: "Features", items: [
            { name: "Warm-water wash", slug: "bon-cau-thong-minh" },
            { name: "Air drying", slug: "bon-cau-thong-minh" },
            { name: "Heated seat + deodorizing", slug: "bon-cau-thong-minh" },
          ]},
          { title: "Controls", items: [
            { name: "Proximity sensor", slug: "bon-cau-thong-minh" },
            { name: "IR remote", slug: "bon-cau-thong-minh" },
            { name: "Side panel + voice", slug: "bon-cau-thong-minh" },
          ]},
          { title: "Energy saving", items: [
            { name: "Ultra-low 3L flush", slug: "bon-cau-thong-minh" },
            { name: "Eco mode", slug: "bon-cau-thong-minh" },
            { name: "Auto power-off", slug: "bon-cau-thong-minh" },
          ]},
        ],
      },
      {
        name: "Ceramic Basins", slug: "lavabo-su", icon: "🪣",
        image: "/img/bathroom-3-1.jpg?v=5",
        tagline: "Wall-hung, countertop, and above-counter ceramic basins — many styles.",
        highlights: [
          { name: "Round above-counter",   image: "/img/bathroom-3-1.jpg?v=5", slug: "lavabo-su" },
          { name: "Wall-hung",     image: "/img/bathroom-3-2.jpg?v=5", slug: "lavabo-su" },
          { name: "Above-counter vessel", image: "/img/bathroom-3-3.jpg?v=5", slug: "lavabo-su" },
          { name: "Undermount",          image: "/img/bathroom-3-4.jpg?v=5", slug: "lavabo-su" },
        ],
        sections: [
          { title: "Installation type", items: [
            { name: "Countertop", slug: "lavabo-su" },
            { name: "Wall-hung", slug: "lavabo-su" },
            { name: "Undermount", slug: "lavabo-su" },
          ]},
          { title: "Material", items: [
            { name: "Sanitary ceramic", slug: "lavabo-su" },
            { name: "Composite", slug: "lavabo-su" },
            { name: "Engineered stone", slug: "lavabo-su" },
          ]},
          { title: "Finish", items: [
            { name: "Classic white glaze", slug: "lavabo-su" },
            { name: "Matte black glaze", slug: "lavabo-su" },
            { name: "Stone-look art finish", slug: "lavabo-su" },
          ]},
        ],
      },
      {
        name: "Bathroom Cabinets", slug: "tu-phong-tam", icon: "🪞",
        image: "/img/bathroom-4-1.jpg?v=5",
        tagline: "Vanity cabinet + mirror + light — waterproof wood + stainless steel.",
        highlights: [
          { name: "600 mm cabinet",       image: "/img/bathroom-4-1.jpg?v=5", slug: "tu-phong-tam" },
          { name: "800 mm cabinet with mirror", image: "/img/bathroom-4-2.jpg?v=5", slug: "tu-phong-tam" },
          { name: "1200 mm double cabinet",   image: "/img/bathroom-4-3.jpg?v=5", slug: "tu-phong-tam" },
          { name: "Stainless steel 304 cabinet",       image: "/img/bathroom-4-4.jpg?v=5", slug: "tu-phong-tam" },
        ],
        sections: [
          { title: "Material", items: [
            { name: "Melamine-faced plywood", slug: "tu-phong-tam" },
            { name: "Waterproof PVC", slug: "tu-phong-tam" },
            { name: "Stainless steel 304", slug: "tu-phong-tam" },
          ]},
          { title: "Size", items: [
            { name: "600 mm", slug: "tu-phong-tam" },
            { name: "800 mm", slug: "tu-phong-tam" },
            { name: "1200 mm double basin", slug: "tu-phong-tam" },
          ]},
          { title: "Accessories", items: [
            { name: "Touch mirror + light", slug: "tu-phong-tam" },
            { name: "Hydraulic lift-up door", slug: "tu-phong-tam" },
            { name: "Rose-gold handles", slug: "tu-phong-tam" },
          ]},
        ],
      },
      {
        name: "Faucets & Mixers", slug: "voi-nuoc", icon: "🚰",
        image: "/img/bathroom-5-1.jpg?v=5",
        tagline: "Shower, basin, and kitchen faucets — brass with chrome / gold / matte finish.",
        highlights: [
          { name: "Tall basin faucet", image: "/img/bathroom-5-1.jpg?v=5", slug: "voi-nuoc" },
          { name: "Concealed shower faucet", image: "/img/bathroom-5-2.jpg?v=5", slug: "voi-nuoc" },
          { name: "Gooseneck kitchen faucet", image: "/img/bathroom-5-3.jpg?v=5", slug: "voi-nuoc" },
          { name: "Shower mixer set",   image: "/img/bathroom-5-4.jpg?v=5", slug: "voi-nuoc" },
        ],
        sections: [
          { title: "Installation location", items: [
            { name: "Basin", slug: "voi-nuoc" },
            { name: "Bathtub / shower", slug: "voi-nuoc" },
            { name: "Kitchen", slug: "voi-nuoc" },
          ]},
          { title: "Material", items: [
            { name: "Chrome-plated brass", slug: "voi-nuoc" },
            { name: "Stainless steel 304", slug: "voi-nuoc" },
            { name: "Budget zinc alloy", slug: "voi-nuoc" },
          ]},
          { title: "Finish color", items: [
            { name: "Polished chrome", slug: "voi-nuoc" },
            { name: "Matte black", slug: "voi-nuoc" },
            { name: "Rose gold / brushed gold", slug: "voi-nuoc" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🛋", name: "Furniture", slug: "noi-that" },
    items: [
      {
        name: "Living Room", slug: "phong-khach", icon: "🛋️",
        image: "/img/phong-khach.jpg?v=5",
        tagline: "Sofas, coffee tables, TV units — complete sets for villas and premium apartments.",
        highlights: [
          { name: "Modern sofa",       image: "/img/fur1.jpg?v=5", slug: "phong-khach" },
          { name: "Classic sofa",        image: "/img/fur2.jpg?v=5", slug: "phong-khach" },
          { name: "Coffee table",          image: "/img/ban-ca-phe.jpg?v=5", slug: "phong-khach" },
          { name: "TV unit",               image: "/img/fur4.jpg?v=5", slug: "phong-khach" },
          { name: "Recliner",        image: "/img/fur5.jpg?v=5", slug: "phong-khach" },
          { name: "Console table",         image: "/img/furniture-1-3.jpg?v=5", slug: "phong-khach" },
        ],
        sections: [
          { title: "Sofas", items: [
            { name: "Modern sofa", slug: "phong-khach" },
            { name: "Classic sofa", slug: "phong-khach" },
            { name: "Italian leather sofa", slug: "phong-khach" },
            { name: "Linen fabric sofa", slug: "phong-khach" },
          ]},
          { title: "Tables & Units", items: [
            { name: "Coffee table", slug: "phong-khach" },
            { name: "Console table", slug: "phong-khach" },
            { name: "Wall-mounted TV unit", slug: "phong-khach" },
            { name: "Freestanding TV unit", slug: "phong-khach" },
          ]},
          { title: "Lounge chairs", items: [
            { name: "Armchair", slug: "phong-khach" },
            { name: "Reclining lounge chair", slug: "phong-khach" },
            { name: "Egg swing chair", slug: "phong-khach" },
            { name: "Footstool", slug: "phong-khach" },
          ]},
          { title: "Lighting & Decor", items: [
            { name: "Floor lamp", slug: "phong-khach" },
            { name: "Sofa-side table lamp", slug: "phong-khach" },
            { name: "Living room rug", slug: "phong-khach" },
            { name: "Premium curtains", slug: "phong-khach" },
          ]},
        ],
      },
      {
        name: "Bedroom", slug: "phong-ngu", icon: "🛏️",
        image: "/img/phong-ngu.jpg?v=5",
        tagline: "Beds, wardrobes, dressing tables — modern and neoclassical styles.",
        highlights: [
          { name: "Bed",          image: "/img/fur3.jpg?v=5", slug: "phong-ngu" },
          { name: "Wardrobe",          image: "/img/fur8.jpg?v=5", slug: "phong-ngu" },
          { name: "Dressing table",      image: "/img/furniture-2-1.jpg?v=5", slug: "phong-ngu" },
          { name: "Nightstand",      image: "/img/furniture-2-2.jpg?v=5", slug: "phong-ngu" },
          { name: "Latex mattress",           image: "/img/dem-latex-memory-foam.jpg?v=5", slug: "phong-ngu" },
          { name: "Pocket spring mattress",   image: "/img/dem-pocket-spring.jpg?v=5", slug: "phong-ngu" },
        ],
        sections: [
          { title: "Beds", items: [
            { name: "1.6m bed", slug: "phong-ngu" },
            { name: "1.8m bed", slug: "phong-ngu" },
            { name: "2m King bed", slug: "phong-ngu" },
            { name: "Bunk bed", slug: "phong-ngu" },
          ]},
          { title: "Wardrobes", items: [
            { name: "Sliding-door wardrobe", slug: "phong-ngu" },
            { name: "Hinged-door wardrobe", slug: "phong-ngu" },
            { name: "Walk-in closet", slug: "phong-ngu" },
            { name: "Wardrobe with mirror", slug: "phong-ngu" },
          ]},
          { title: "Premium mattresses", items: [
            { name: "Natural latex mattress", slug: "phong-ngu" },
            { name: "Pocket spring mattress", slug: "phong-ngu" },
            { name: "Memory foam mattress", slug: "phong-ngu" },
            { name: "7-zone latex mattress", slug: "phong-ngu" },
          ]},
          { title: "Tables / Accessories", items: [
            { name: "Dressing table with mirror", slug: "phong-ngu" },
            { name: "Nightstand", slug: "phong-ngu" },
            { name: "End-of-bed bench", slug: "phong-ngu" },
            { name: "Touch night light", slug: "phong-ngu" },
          ]},
        ],
      },
      {
        name: "Dining Room", slug: "phong-an", icon: "🍽️",
        image: "/img/phong-an.jpg?v=5",
        tagline: "Dining sets, wine cabinets, dining chairs — solid wood and premium MDF veneer.",
        highlights: [
          { name: "6–8 seat dining table",      image: "/img/ban-an.jpg?v=5", slug: "phong-an" },
          { name: "Dining chair",              image: "/img/ghe-an.jpg?v=5", slug: "phong-an" },
          { name: "Coffee table",          image: "/img/ban-ca-phe.jpg?v=5", slug: "phong-an" },
          { name: "Bar stool",             image: "/img/ghe-bar.jpg?v=5", slug: "phong-an" },
          { name: "Crystal chandelier",     image: "/img/den-pha-le-k9.jpg?v=5", slug: "phong-an" },
          { name: "Pendant light",         image: "/img/den-pendant.jpg?v=5", slug: "phong-an" },
        ],
        sections: [
          { title: "Dining tables", items: [
            { name: "4-seat table", slug: "phong-an" },
            { name: "6-seat table", slug: "phong-an" },
            { name: "8-seat table", slug: "phong-an" },
            { name: "Extendable table", slug: "phong-an" },
          ]},
          { title: "Dining chairs", items: [
            { name: "Solid wood chair", slug: "phong-an" },
            { name: "Leather-upholstered chair", slug: "phong-an" },
            { name: "Fabric-upholstered chair", slug: "phong-an" },
            { name: "Premium plastic chair", slug: "phong-an" },
          ]},
          { title: "Wine & Buffet cabinets", items: [
            { name: "Glass-door wine cabinet", slug: "phong-an" },
            { name: "Modular wine cabinet", slug: "phong-an" },
            { name: "Display buffet cabinet", slug: "phong-an" },
            { name: "Mini bar cabinet", slug: "phong-an" },
          ]},
          { title: "Lighting & Decor", items: [
            { name: "Crystal chandelier", slug: "phong-an" },
            { name: "Single pendant light", slug: "phong-an" },
            { name: "Dining table vase", slug: "phong-an" },
            { name: "Decorative artwork", slug: "phong-an" },
          ]},
        ],
      },
      {
        name: "Kitchen Cabinets", slug: "tu-bep", icon: "🍳",
        image: "/img/fur7.jpg?v=5",
        tagline: "OPPEIN kitchen cabinets, acrylic and laminate finishes — free 3D design from orders of 30 sets.",
        highlights: [
          { name: "L-shaped kitchen",        image: "/img/fur7.jpg?v=5", slug: "tu-bep" },
          { name: "U-shaped kitchen",        image: "/img/furniture-7-1.jpg?v=5", slug: "tu-bep" },
          { name: "Kitchen island",             image: "/img/furniture-7-2.jpg?v=5", slug: "tu-bep" },
          { name: "Quartz countertop",       image: "/img/da-quartz-nhan-tao.jpg?v=5", slug: "tu-bep" },
          { name: "Kitchen cabinet hinges",       image: "/img/ban-le-tu-bep.jpg?v=5", slug: "tu-bep" },
          { name: "Soft-close hinges",    image: "/img/ban-le-tu-giam-chan.jpg?v=5", slug: "tu-bep" },
        ],
        sections: [
          { title: "Layout", items: [
            { name: "Basic I-shape", slug: "tu-bep" },
            { name: "L-shape corner kitchen", slug: "tu-bep" },
            { name: "Enclosed U-shape", slug: "tu-bep" },
            { name: "With kitchen island", slug: "tu-bep" },
          ]},
          { title: "Door material", items: [
            { name: "Gloss acrylic", slug: "tu-bep" },
            { name: "Wood-grain laminate", slug: "tu-bep" },
            { name: "Melamine MFC", slug: "tu-bep" },
            { name: "Solid oak / walnut", slug: "tu-bep" },
          ]},
          { title: "Countertops", items: [
            { name: "Engineered quartz", slug: "tu-bep" },
            { name: "Natural granite", slug: "tu-bep" },
            { name: "White marble", slug: "tu-bep" },
            { name: "Corian solid surface", slug: "tu-bep" },
          ]},
          { title: "Accessories", items: [
            { name: "Blum soft-close hinges", slug: "tu-bep" },
            { name: "3-tier drawer slides", slug: "tu-bep" },
            { name: "Cabinet handles", slug: "tu-bep" },
            { name: "Under-cabinet LED lighting", slug: "tu-bep" },
          ]},
        ],
      },
      {
        name: "Wardrobes", slug: "tu-quan-ao", icon: "👔",
        image: "/img/fur8.jpg?v=5",
        tagline: "Built-in wardrobes, walk-in closets — OEM to your room dimensions.",
        highlights: [
          { name: "Sliding-door wardrobe",    image: "/img/fur8.jpg?v=5", slug: "tu-quan-ao" },
          { name: "Walk-in closet",      image: "/img/furniture-8-1.jpg?v=5", slug: "tu-quan-ao" },
          { name: "Children's wardrobe",        image: "/img/furniture-8-2.jpg?v=5", slug: "tu-quan-ao" },
          { name: "Shoe cabinet",             image: "/img/furniture-8-3.jpg?v=5", slug: "tu-quan-ao" },
          { name: "Cabinet hinges",           image: "/img/ban-le.jpg?v=5", slug: "tu-quan-ao" },
          { name: "Door hinges",          image: "/img/ban-le-cua.jpg?v=5", slug: "tu-quan-ao" },
        ],
        sections: [
          { title: "Wardrobe type", items: [
            { name: "Sliding door", slug: "tu-quan-ao" },
            { name: "Hinged door", slug: "tu-quan-ao" },
            { name: "Walk-in closet", slug: "tu-quan-ao" },
            { name: "Built-in module", slug: "tu-quan-ao" },
          ]},
          { title: "Material", items: [
            { name: "MDF veneer", slug: "tu-quan-ao" },
            { name: "Moisture-resistant HDF", slug: "tu-quan-ao" },
            { name: "Solid wood", slug: "tu-quan-ao" },
            { name: "Gloss acrylic", slug: "tu-quan-ao" },
          ]},
          { title: "Interior fittings", items: [
            { name: "Hafele pull-out basket", slug: "tu-quan-ao" },
            { name: "Swivel tie rack", slug: "tu-quan-ao" },
            { name: "LED motion light", slug: "tu-quan-ao" },
            { name: "In-wardrobe safe", slug: "tu-quan-ao" },
          ]},
          { title: "Matching cabinets", items: [
            { name: "Matching shoe cabinet", slug: "tu-quan-ao" },
            { name: "Nightstand", slug: "tu-quan-ao" },
            { name: "Drawer chest", slug: "tu-quan-ao" },
            { name: "Built-in jewelry tray", slug: "tu-quan-ao" },
          ]},
        ],
      },
      {
        name: "Home Office", slug: "van-phong-tai-nha", icon: "💼",
        image: "/img/van-phong-tai-nha.jpg?v=5",
        tagline: "Desks, ergonomic chairs, bookshelves — built for the hybrid home office.",
        highlights: [
          { name: "Desk",        image: "/img/ban-lam-viec.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "Office chair",       image: "/img/ghe-van-phong.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "Folding picnic table",      image: "/img/ban-picnic-gap-gon.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "LED desk lamp",         image: "/img/den-ban-de-ban.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "Floor lamp",      image: "/img/den-san-floor-lamp.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "Smart Wi-Fi light",     image: "/img/den-smart-wi-fi.jpg?v=5", slug: "van-phong-tai-nha" },
        ],
        sections: [
          { title: "Desks", items: [
            { name: "Standing desk", slug: "van-phong-tai-nha" },
            { name: "L-shaped desk", slug: "van-phong-tai-nha" },
            { name: "Minimalist straight desk", slug: "van-phong-tai-nha" },
            { name: "Desk with bookshelf", slug: "van-phong-tai-nha" },
          ]},
          { title: "Seating", items: [
            { name: "Ergonomic chair", slug: "van-phong-tai-nha" },
            { name: "Gaming chair", slug: "van-phong-tai-nha" },
            { name: "Executive leather chair", slug: "van-phong-tai-nha" },
            { name: "Office mesh chair", slug: "van-phong-tai-nha" },
          ]},
          { title: "Storage", items: [
            { name: "Open bookshelf", slug: "van-phong-tai-nha" },
            { name: "Glass-door filing cabinet", slug: "van-phong-tai-nha" },
            { name: "Document storage box", slug: "van-phong-tai-nha" },
            { name: "Mobile drawer unit", slug: "van-phong-tai-nha" },
          ]},
          { title: "Work accessories", items: [
            { name: "Touch LED desk lamp", slug: "van-phong-tai-nha" },
            { name: "Monitor stand", slug: "van-phong-tai-nha" },
            { name: "Smart Wi-Fi light", slug: "van-phong-tai-nha" },
            { name: "Vertical laptop stand", slug: "van-phong-tai-nha" },
          ]},
        ],
      },
      {
        name: "Hotel Furniture", slug: "noi-that-khach-san", icon: "🏨",
        image: "/img/noi-that-khach-san.jpg?v=5",
        tagline: "Complete 3–5 star FF&E — designed to meet Marriott/Hilton standards.",
        highlights: [
          { name: "Hotel bed",    image: "/img/fur6.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "Lobby table",           image: "/img/furniture-6-1.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "Lounge chair",        image: "/img/furniture-6-2.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "Crystal chandelier", image: "/img/den-chum-chandelier.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "Wall sconce",     image: "/img/den-tuong-wall-sconce.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "Ceiling light",         image: "/img/den-op-tran.jpg?v=5", slug: "noi-that-khach-san" },
        ],
        sections: [
          { title: "Hotel bedroom", items: [
            { name: "King/queen bed", slug: "noi-that-khach-san" },
            { name: "Upholstered headboard", slug: "noi-that-khach-san" },
            { name: "In-room desk", slug: "noi-that-khach-san" },
            { name: "Wood veneer minibar cabinet", slug: "noi-that-khach-san" },
          ]},
          { title: "Hotel bathroom", items: [
            { name: "100% cotton towels", slug: "noi-that-khach-san" },
            { name: "Packaged amenities", slug: "noi-that-khach-san" },
            { name: "Waffle bathrobe", slug: "noi-that-khach-san" },
            { name: "In-room slippers", slug: "noi-that-khach-san" },
          ]},
          { title: "Lobby & Waiting area", items: [
            { name: "Lounge chair", slug: "noi-that-khach-san" },
            { name: "Reception desk", slug: "noi-that-khach-san" },
            { name: "Crystal chandelier", slug: "noi-that-khach-san" },
            { name: "Glass display cabinet", slug: "noi-that-khach-san" },
          ]},
          { title: "Dining / Bar", items: [
            { name: "Stainless steel buffet table", slug: "noi-that-khach-san" },
            { name: "Premium restaurant chair", slug: "noi-that-khach-san" },
            { name: "Bar pendant light", slug: "noi-that-khach-san" },
            { name: "Monolithic bar counter", slug: "noi-that-khach-san" },
          ]},
        ],
      },
      {
        name: "Kids & Baby", slug: "tre-em-em-be", icon: "🧸",
        image: "/img/tre-em-em-be.jpg?v=5",
        tagline: "Kids' beds, study desks, safe toys — E0/E1 certified.",
        highlights: [
          { name: "Kids' bed",       image: "/img/furniture-3-1.jpg?v=5", slug: "tre-em-em-be" },
          { name: "Study desk",             image: "/img/furniture-3-2.jpg?v=5", slug: "tre-em-em-be" },
          { name: "Toy cabinet",          image: "/img/furniture-3-3.jpg?v=5", slug: "tre-em-em-be" },
          { name: "Adjustable kids' chair",        image: "/img/ghe-tam-nang.jpg?v=5", slug: "tre-em-em-be" },
          { name: "Kids' desk lamp",   image: "/img/den-ban-de-ban.jpg?v=5", slug: "tre-em-em-be" },
          { name: "Decorative LED strip light", image: "/img/den-led-day.jpg?v=5", slug: "tre-em-em-be" },
        ],
        sections: [
          { title: "Kids' bedroom", items: [
            { name: "Safe bunk bed", slug: "tre-em-em-be" },
            { name: "MDF baby crib", slug: "tre-em-em-be" },
            { name: "Children's wardrobe", slug: "tre-em-em-be" },
            { name: "Touch night light", slug: "tre-em-em-be" },
          ]},
          { title: "Study", items: [
            { name: "Posture-correcting desk", slug: "tre-em-em-be" },
            { name: "Adjustable study chair", slug: "tre-em-em-be" },
            { name: "Children's bookshelf", slug: "tre-em-em-be" },
            { name: "Eye-care LED desk lamp", slug: "tre-em-em-be" },
          ]},
          { title: "Toys & Storage", items: [
            { name: "Modular toy cabinet", slug: "tre-em-em-be" },
            { name: "E0 wooden toys", slug: "tre-em-em-be" },
            { name: "Educational building blocks", slug: "tre-em-em-be" },
            { name: "Fabric storage box", slug: "tre-em-em-be" },
          ]},
          { title: "Hygiene & Feeding", items: [
            { name: "Baby high chair", slug: "tre-em-em-be" },
            { name: "Kids' cotton towels", slug: "tre-em-em-be" },
            { name: "Silicone feeding bib", slug: "tre-em-em-be" },
            { name: "Mini baby washbasin", slug: "tre-em-em-be" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🍳", name: "Kitchen Equipment", slug: "kitchen-equipment" },
    items: [
      {
        name: "Induction Cooktops", slug: "bep-tu", icon: "♨️",
        image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5",
        tagline: "Single / double / 3–4 zone induction cooktops — Schott ceramic glass, 3500W+ power.",
        highlights: [
          { name: "Double zone",   image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "bep-tu" },
          { name: "3 zones",     image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "bep-tu" },
          { name: "4 zones",     image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "bep-tu" },
          { name: "Portable single",    image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "bep-tu" },
        ],
        sections: [
          { title: "Number of zones", items: [
            { name: "Single 1 zone", slug: "bep-tu" },
            { name: "Double 2 zones", slug: "bep-tu" },
            { name: "3–4 built-in zones", slug: "bep-tu" },
          ]},
          { title: "Power", items: [
            { name: "≤ 2000 W", slug: "bep-tu" },
            { name: "2000–3500 W", slug: "bep-tu" },
            { name: "Booster > 3500 W", slug: "bep-tu" },
          ]},
          { title: "Features", items: [
            { name: "Child lock", slug: "bep-tu" },
            { name: "Auto shut-off (empty pot)", slug: "bep-tu" },
            { name: "9 heat levels", slug: "bep-tu" },
          ]},
        ],
      },
      {
        name: "Range Hoods", slug: "may-hut-mui", icon: "💨",
        image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5",
        tagline: "Wall-mount, under-cabinet, and island range hoods — airflow 700–1300 m³/h.",
        highlights: [
          { name: "Diamond wall-mount", image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "may-hut-mui" },
          { name: "Classic under-cabinet",   image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "may-hut-mui" },
          { name: "Ceiling-mounted island", image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "may-hut-mui" },
          { name: "Remote touch control",     image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "may-hut-mui" },
        ],
        sections: [
          { title: "By installation", items: [
            { name: "Wall / wall-mount", slug: "may-hut-mui" },
            { name: "Classic under-cabinet", slug: "may-hut-mui" },
            { name: "Ceiling-mounted island", slug: "may-hut-mui" },
          ]},
          { title: "Airflow", items: [
            { name: "700 m³/h", slug: "may-hut-mui" },
            { name: "1000 m³/h", slug: "may-hut-mui" },
            { name: "1300+ m³/h", slug: "may-hut-mui" },
          ]},
          { title: "Material", items: [
            { name: "Stainless steel 304", slug: "may-hut-mui" },
            { name: "Tempered glass", slug: "may-hut-mui" },
            { name: "Art-milled copper", slug: "may-hut-mui" },
          ]},
        ],
      },
      {
        name: "Microwave Ovens", slug: "lo-vi-song", icon: "📡",
        image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5",
        tagline: "Mechanical, digital, and grill microwave ovens — 20–42L capacity.",
        highlights: [
          { name: "Mechanical 20L",     image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "lo-vi-song" },
          { name: "Digital 25L",    image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "lo-vi-song" },
          { name: "Grill 30L",   image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "lo-vi-song" },
          { name: "Steam combo", image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "lo-vi-song" },
        ],
        sections: [
          { title: "Capacity", items: [
            { name: "20L household", slug: "lo-vi-song" },
            { name: "25–30L", slug: "lo-vi-song" },
            { name: "42L+ professional", slug: "lo-vi-song" },
          ]},
          { title: "Type", items: [
            { name: "Mechanical", slug: "lo-vi-song" },
            { name: "Digital touch", slug: "lo-vi-song" },
            { name: "Microwave + grill + steam", slug: "lo-vi-song" },
          ]},
          { title: "Power", items: [
            { name: "700 W", slug: "lo-vi-song" },
            { name: "900 W", slug: "lo-vi-song" },
            { name: "1200 W+", slug: "lo-vi-song" },
          ]},
        ],
      },
      {
        name: "Pressure Cookers", slug: "noi-ap-suat", icon: "🍲",
        image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5",
        tagline: "Electric and multi-cook pressure cookers — 4–10L capacity.",
        highlights: [
          { name: "Electric 5L",       image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "noi-ap-suat" },
          { name: "Multi-cook 6L",    image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "noi-ap-suat" },
          { name: "Large stainless 8L",      image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "noi-ap-suat" },
          { name: "Traditional mechanical", image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "noi-ap-suat" },
        ],
        sections: [
          { title: "Capacity", items: [
            { name: "4–5L household", slug: "noi-ap-suat" },
            { name: "6–8L", slug: "noi-ap-suat" },
            { name: "10L+ eatery", slug: "noi-ap-suat" },
          ]},
          { title: "Type", items: [
            { name: "Electric", slug: "noi-ap-suat" },
            { name: "Mechanical", slug: "noi-ap-suat" },
            { name: "Multi-cook 12-in-1", slug: "noi-ap-suat" },
          ]},
          { title: "Inner pot material", items: [
            { name: "Non-stick ceramic", slug: "noi-ap-suat" },
            { name: "Stainless steel 304", slug: "noi-ap-suat" },
            { name: "Thick aluminum alloy", slug: "noi-ap-suat" },
          ]},
        ],
      },
      {
        name: "Rice Cookers", slug: "noi-com-dien", icon: "🍚",
        image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5",
        tagline: "Mechanical, digital, and IH induction rice cookers — 1.8–5L for home and restaurant.",
        highlights: [
          { name: "Mechanical 1.8L",   image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "noi-com-dien" },
          { name: "Digital 2L",    image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "noi-com-dien" },
          { name: "IH induction",    image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "noi-com-dien" },
          { name: "Commercial 5L",image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "noi-com-dien" },
        ],
        sections: [
          { title: "Technology", items: [
            { name: "Mechanical", slug: "noi-com-dien" },
            { name: "Digital", slug: "noi-com-dien" },
            { name: "IH induction", slug: "noi-com-dien" },
          ]},
          { title: "Capacity", items: [
            { name: "1.0–1.8L", slug: "noi-com-dien" },
            { name: "2.0–3.0L", slug: "noi-com-dien" },
            { name: "5L+ restaurant", slug: "noi-com-dien" },
          ]},
          { title: "Modes", items: [
            { name: "Cook rice", slug: "noi-com-dien" },
            { name: "Steam", slug: "noi-com-dien" },
            { name: "Porridge / slow cook", slug: "noi-com-dien" },
          ]},
        ],
      },
      {
        name: "Dishwashers", slug: "may-rua-bat", icon: "🍽️",
        image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5",
        tagline: "Freestanding, built-in, and mini dishwashers — 6–14 place settings.",
        highlights: [
          { name: "Freestanding 14 settings",  image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "may-rua-bat" },
          { name: "Built-in 12 settings",    image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "may-rua-bat" },
          { name: "Countertop mini 6 settings",  image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "may-rua-bat" },
          { name: "Semi-integrated",          image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "may-rua-bat" },
        ],
        sections: [
          { title: "Installation type", items: [
            { name: "Freestanding", slug: "may-rua-bat" },
            { name: "Built-in", slug: "may-rua-bat" },
            { name: "Countertop mini", slug: "may-rua-bat" },
          ]},
          { title: "Place settings", items: [
            { name: "6 settings mini", slug: "may-rua-bat" },
            { name: "8–10 settings", slug: "may-rua-bat" },
            { name: "13–14 settings professional", slug: "may-rua-bat" },
          ]},
          { title: "Features", items: [
            { name: "Heated drying", slug: "may-rua-bat" },
            { name: "UV sanitizing", slug: "may-rua-bat" },
            { name: "Wi-Fi control", slug: "may-rua-bat" },
          ]},
        ],
      },
      {
        name: "Stainless Steel Sinks", slug: "chau-rua-inox", icon: "🍽️",
        image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5",
        tagline: "Single / double / triple-bowl 304 stainless steel sinks — handmade smooth / sound-dampened.",
        highlights: [
          { name: "Single bowl 50×40",   image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "chau-rua-inox" },
          { name: "Double bowl 78×42",   image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "chau-rua-inox" },
          { name: "Square handmade",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "chau-rua-inox" },
          { name: "Triple-bowl commercial", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "chau-rua-inox" },
        ],
        sections: [
          { title: "Number of bowls", items: [
            { name: "1 bowl", slug: "chau-rua-inox" },
            { name: "2 bowls", slug: "chau-rua-inox" },
            { name: "3 bowls", slug: "chau-rua-inox" },
          ]},
          { title: "Type", items: [
            { name: "Top-mount", slug: "chau-rua-inox" },
            { name: "Undermount", slug: "chau-rua-inox" },
            { name: "Semi-undermount", slug: "chau-rua-inox" },
          ]},
          { title: "Finish", items: [
            { name: "Silk brushed", slug: "chau-rua-inox" },
            { name: "Matte black nano", slug: "chau-rua-inox" },
            { name: "Handmade R10", slug: "chau-rua-inox" },
          ]},
        ],
      },
      {
        name: "Hardware & Fittings", slug: "kim-khi-bep", icon: "🔧",
        image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5",
        tagline: "Cabinet hinges, drawer slides, handles, stainless steel fittings — order by the container.",
        highlights: [
          { name: "Soft-close hinges", image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "kim-khi-bep" },
          { name: "Bottom-mount slides",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "kim-khi-bep" },
          { name: "Alloy handles",  image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "kim-khi-bep" },
          { name: "Stainless steel fittings",    image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "kim-khi-bep" },
        ],
        sections: [
          { title: "Hinges & Slides", items: [
            { name: "35 mm cup hinges", slug: "kim-khi-bep" },
            { name: "3-tier drawer slides", slug: "kim-khi-bep" },
            { name: "Lift-up cabinet piston", slug: "kim-khi-bep" },
          ]},
          { title: "Stainless steel fittings", items: [
            { name: "Dish rack", slug: "kim-khi-bep" },
            { name: "Spice rack", slug: "kim-khi-bep" },
            { name: "In-cabinet trash bin", slug: "kim-khi-bep" },
          ]},
          { title: "Handles", items: [
            { name: "Square stainless steel handle", slug: "kim-khi-bep" },
            { name: "Round brass knob", slug: "kim-khi-bep" },
            { name: "Recessed flush handle", slug: "kim-khi-bep" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "💡", name: "Lighting", slug: "lighting" },
    items: [
      {
        name: "LED Light Sources", slug: "den-led", icon: "💡",
        image: "/img/ceramic-2-1.jpg?v=5",
        tagline: "All types of LED light sources — drivers, modules, COB, specialty SMD.",
        highlights: [
          { name: "COB chip",      image: "/img/ceramic-2-1.jpg?v=5", slug: "den-led" },
          { name: "SMD 2835/5050", image: "/img/ceramic-2-2.jpg?v=5", slug: "den-led" },
          { name: "Driver module",  image: "/img/ceramic-2-3.jpg?v=5", slug: "den-led" },
          { name: "Filament LED bulb", image: "/img/ceramic-2-4.jpg?v=5", slug: "den-led" },
        ],
        sections: [
          { title: "Chip type", items: [
            { name: "COB", slug: "den-led" },
            { name: "SMD", slug: "den-led" },
            { name: "Filament", slug: "den-led" },
          ]},
          { title: "Color temperature", items: [
            { name: "Warm white 3000K", slug: "den-led" },
            { name: "Neutral white 4000K", slug: "den-led" },
            { name: "Cool white 6500K", slug: "den-led" },
          ]},
          { title: "CRI", items: [
            { name: "Ra >80", slug: "den-led" },
            { name: "Ra >90", slug: "den-led" },
            { name: "Ra >95 for art display", slug: "den-led" },
          ]},
        ],
      },
      {
        name: "Residential LED Lighting", slug: "den-led-gia-dung", icon: "🏠",
        image: "/img/ceramic-2-2.jpg?v=5",
        tagline: "Ceiling lights, downlights, panels, LED strips — for living and family rooms.",
        highlights: [
          { name: "Ceiling light",  image: "/img/ceramic-2-2.jpg?v=5", slug: "den-led-gia-dung" },
          { name: "Recessed downlight", image: "/img/ceramic-2-3.jpg?v=5", slug: "den-led-gia-dung" },
          { name: "Square panel",  image: "/img/ceramic-2-4.jpg?v=5", slug: "den-led-gia-dung" },
          { name: "Decorative LED strip", image: "/img/ceramic-2-5.jpg?v=5", slug: "den-led-gia-dung" },
        ],
        sections: [
          { title: "By location", items: [
            { name: "Living room", slug: "den-led-gia-dung" },
            { name: "Bedroom", slug: "den-led-gia-dung" },
            { name: "Hallway / staircase", slug: "den-led-gia-dung" },
          ]},
          { title: "By type", items: [
            { name: "Ceiling-mounted", slug: "den-led-gia-dung" },
            { name: "Recessed downlight", slug: "den-led-gia-dung" },
            { name: "Ultra-slim panel", slug: "den-led-gia-dung" },
          ]},
          { title: "Features", items: [
            { name: "3 color modes", slug: "den-led-gia-dung" },
            { name: "Dimmable", slug: "den-led-gia-dung" },
            { name: "Smart Wi-Fi", slug: "den-led-gia-dung" },
          ]},
        ],
      },
      {
        name: "Commercial LED Lighting", slug: "den-led-thuong-mai", icon: "🏢",
        image: "/img/ceramic-2-3.jpg?v=5",
        tagline: "Floodlights, industrial tube lights, spotlights — IP65/66.",
        highlights: [
          { name: "100W LED floodlight",  image: "/img/ceramic-2-3.jpg?v=5", slug: "den-led-thuong-mai" },
          { name: "T8 tube light",       image: "/img/ceramic-2-4.jpg?v=5", slug: "den-led-thuong-mai" },
          { name: "Track spotlight", image: "/img/ceramic-2-5.jpg?v=5", slug: "den-led-thuong-mai" },
          { name: "UFO high-bay light", image: "/img/ceramic-2-1.jpg?v=5", slug: "den-led-thuong-mai" },
        ],
        sections: [
          { title: "Application", items: [
            { name: "Showroom", slug: "den-led-thuong-mai" },
            { name: "Office", slug: "den-led-thuong-mai" },
            { name: "Factory", slug: "den-led-thuong-mai" },
          ]},
          { title: "Power", items: [
            { name: "≤ 50 W", slug: "den-led-thuong-mai" },
            { name: "50–150 W", slug: "den-led-thuong-mai" },
            { name: "> 200 W", slug: "den-led-thuong-mai" },
          ]},
          { title: "IP rating", items: [
            { name: "IP44 indoor", slug: "den-led-thuong-mai" },
            { name: "IP65 outdoor", slug: "den-led-thuong-mai" },
            { name: "IP66 dust/water-resistant", slug: "den-led-thuong-mai" },
          ]},
        ],
      },
      {
        name: "Electrical Supplies", slug: "vat-tu-dien", icon: "⚙️",
        image: "/img/ceramic-2-4.jpg?v=5",
        tagline: "Sockets, switches, MCBs, ATS — accessories to complete your lighting system.",
        highlights: [
          { name: "Recessed socket",  image: "/img/ceramic-2-4.jpg?v=5", slug: "vat-tu-dien" },
          { name: "Touch switch", image: "/img/ceramic-2-5.jpg?v=5", slug: "vat-tu-dien" },
          { name: "MCB / RCBO",       image: "/img/ceramic-2-1.jpg?v=5", slug: "vat-tu-dien" },
          { name: "Junction box",      image: "/img/ceramic-2-2.jpg?v=5", slug: "vat-tu-dien" },
        ],
        sections: [
          { title: "Switchgear", items: [
            { name: "MCB 6/10/16A", slug: "vat-tu-dien" },
            { name: "RCBO", slug: "vat-tu-dien" },
            { name: "Automatic circuit breaker", slug: "vat-tu-dien" },
          ]},
          { title: "Sockets & Switches", items: [
            { name: "Square recessed faceplate", slug: "vat-tu-dien" },
            { name: "Smart touch", slug: "vat-tu-dien" },
            { name: "USB socket", slug: "vat-tu-dien" },
          ]},
          { title: "Accessories", items: [
            { name: "Wall mounting box", slug: "vat-tu-dien" },
            { name: "Grounding bolt", slug: "vat-tu-dien" },
            { name: "Quick cable clamp", slug: "vat-tu-dien" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🪟", name: "Doors & Windows", slug: "doors-windows" },
    items: [
      {
        name: "3D Face Recognition Lock", slug: "khoa-3d-face", icon: "📹",
        image: "/img/ceramic-3-1.jpg?v=5",
        tagline: "3D face recognition lock + video call — IP68 waterproof.",
        highlights: [
          { name: "3D face + video",  image: "/img/ceramic-3-1.jpg?v=5", slug: "khoa-3d-face" },
          { name: "1080p camera",     image: "/img/ceramic-3-2.jpg?v=5", slug: "khoa-3d-face" },
          { name: "5000 mAh rechargeable battery", image: "/img/ceramic-3-3.jpg?v=5", slug: "khoa-3d-face" },
          { name: "Wi-Fi + 4G",        image: "/img/ceramic-3-4.jpg?v=5", slug: "khoa-3d-face" },
        ],
        sections: [
          { title: "Sensors", items: [
            { name: "3D dot recognition", slug: "khoa-3d-face" },
            { name: "Night infrared", slug: "khoa-3d-face" },
            { name: "Backup fingerprint sensor", slug: "khoa-3d-face" },
          ]},
          { title: "Unlocking", items: [
            { name: "Face ID", slug: "khoa-3d-face" },
            { name: "Fingerprint", slug: "khoa-3d-face" },
            { name: "PIN code / NFC", slug: "khoa-3d-face" },
          ]},
          { title: "Connectivity", items: [
            { name: "Wi-Fi 2.4 GHz", slug: "khoa-3d-face" },
            { name: "Bluetooth 5.0", slug: "khoa-3d-face" },
            { name: "Backup 4G module", slug: "khoa-3d-face" },
          ]},
        ],
      },
      {
        name: "Wi-Fi Smart Lock", slug: "khoa-wifi", icon: "📶",
        image: "/img/ceramic-3-2.jpg?v=5",
        tagline: "Fingerprint lock + Wi-Fi remote control via app.",
        highlights: [
          { name: "Tuya Smart app",  image: "/img/ceramic-3-2.jpg?v=5", slug: "khoa-wifi" },
          { name: "1-year AA battery life", image: "/img/ceramic-3-3.jpg?v=5", slug: "khoa-wifi" },
          { name: "One-time code",         image: "/img/ceramic-3-4.jpg?v=5", slug: "khoa-wifi" },
          { name: "Dual anti-pry lock", image: "/img/ceramic-3-5.jpg?v=5", slug: "khoa-wifi" },
        ],
        sections: [
          { title: "Unlocking", items: [
            { name: "Fingerprint", slug: "khoa-wifi" },
            { name: "PIN code", slug: "khoa-wifi" },
            { name: "NFC card", slug: "khoa-wifi" },
          ]},
          { title: "Smart home", items: [
            { name: "Tuya / Smart Life", slug: "khoa-wifi" },
            { name: "Google Home", slug: "khoa-wifi" },
            { name: "Alexa", slug: "khoa-wifi" },
          ]},
          { title: "Body material", items: [
            { name: "Zinc alloy", slug: "khoa-wifi" },
            { name: "Stainless steel 304", slug: "khoa-wifi" },
            { name: "Anodized aluminum", slug: "khoa-wifi" },
          ]},
        ],
      },
      {
        name: "Wi-Fi Gate Lock", slug: "khoa-don-cong-wifi", icon: "🚪",
        image: "/img/ceramic-3-3.jpg?v=5",
        tagline: "Outdoor gate lock, fingerprint + Wi-Fi — designed for villas.",
        highlights: [
          { name: "Villa iron gate",  image: "/img/ceramic-3-3.jpg?v=5", slug: "khoa-don-cong-wifi" },
          { name: "Stainless steel folding gate",      image: "/img/ceramic-3-4.jpg?v=5", slug: "khoa-don-cong-wifi" },
          { name: "Automatic sliding gate", image: "/img/ceramic-3-5.jpg?v=5", slug: "khoa-don-cong-wifi" },
          { name: "Euro aluminum gate",     image: "/img/ceramic-3-1.jpg?v=5", slug: "khoa-don-cong-wifi" },
        ],
        sections: [
          { title: "Unlocking", items: [
            { name: "Fingerprint", slug: "khoa-don-cong-wifi" },
            { name: "PIN code", slug: "khoa-don-cong-wifi" },
            { name: "App + remote", slug: "khoa-don-cong-wifi" },
          ]},
          { title: "IP rating", items: [
            { name: "IP65", slug: "khoa-don-cong-wifi" },
            { name: "IP67", slug: "khoa-don-cong-wifi" },
            { name: "IP68 submersible", slug: "khoa-don-cong-wifi" },
          ]},
          { title: "Power", items: [
            { name: "Alkaline battery", slug: "khoa-don-cong-wifi" },
            { name: "Rechargeable lithium battery", slug: "khoa-don-cong-wifi" },
            { name: "Solar power", slug: "khoa-don-cong-wifi" },
          ]},
        ],
      },
      {
        name: "Fingerprint Lock", slug: "khoa-van-tay", icon: "👆",
        image: "/img/ceramic-3-4.jpg?v=5",
        tagline: "Electronic fingerprint locks for wood, aluminum, and steel doors — mass market.",
        highlights: [
          { name: "Standard wood door",  image: "/img/ceramic-3-4.jpg?v=5", slug: "khoa-van-tay" },
          { name: "Xingfa aluminum door",   image: "/img/ceramic-3-5.jpg?v=5", slug: "khoa-van-tay" },
          { name: "Fire-rated steel door", image: "/img/ceramic-3-1.jpg?v=5", slug: "khoa-van-tay" },
          { name: "Pivot glass door",      image: "/img/ceramic-3-2.jpg?v=5", slug: "khoa-van-tay" },
        ],
        sections: [
          { title: "Sensor type", items: [
            { name: "Capacitive", slug: "khoa-van-tay" },
            { name: "Optical", slug: "khoa-van-tay" },
            { name: "Semiconductor", slug: "khoa-van-tay" },
          ]},
          { title: "Unlocking", items: [
            { name: "Fingerprint (≤100)", slug: "khoa-van-tay" },
            { name: "PIN code", slug: "khoa-van-tay" },
            { name: "Mechanical key", slug: "khoa-van-tay" },
          ]},
          { title: "Battery", items: [
            { name: "4 × AA", slug: "khoa-van-tay" },
            { name: "Rechargeable lithium battery", slug: "khoa-van-tay" },
            { name: "USB-C emergency power bank", slug: "khoa-van-tay" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "⚡", name: "Electrical & Appliances", slug: "electrical" },
    items: [
      {
        name: "Air Conditioners", slug: "dieu-hoa", icon: "❄️",
        image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5",
        tagline: "Inverter wall-mount, cassette, and floor-standing AC — full power range.",
        highlights: [
          { name: "Inverter wall-mount", image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "dieu-hoa" },
          { name: "Cassette",    image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "dieu-hoa" },
          { name: "Commercial floor-standing", image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "dieu-hoa" },
          { name: "Multi-split",         image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "dieu-hoa" },
        ],
        sections: [
          { title: "By capacity", items: [
            { name: "9,000 BTU", slug: "dieu-hoa" },
            { name: "12,000 BTU", slug: "dieu-hoa" },
            { name: "18,000–24,000 BTU", slug: "dieu-hoa" },
          ]},
          { title: "By installation", items: [
            { name: "Wall-mount", slug: "dieu-hoa" },
            { name: "Cassette", slug: "dieu-hoa" },
            { name: "Floor-standing", slug: "dieu-hoa" },
          ]},
          { title: "Technology", items: [
            { name: "Inverter R32", slug: "dieu-hoa" },
            { name: "Wi-Fi control", slug: "dieu-hoa" },
            { name: "PM2.5 filter", slug: "dieu-hoa" },
          ]},
        ],
      },
      {
        name: "Refrigerators", slug: "tu-lanh", icon: "🧊",
        image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5",
        tagline: "Side-by-side, French door, and mini bar refrigerators — quoted per FCL lot.",
        highlights: [
          { name: "Side-by-side",  image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "tu-lanh" },
          { name: "French door",   image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "tu-lanh" },
          { name: "Top freezer",  image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "tu-lanh" },
          { name: "Mini bar",      image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "tu-lanh" },
        ],
        sections: [
          { title: "By capacity", items: [
            { name: "< 200L", slug: "tu-lanh" },
            { name: "200–400L", slug: "tu-lanh" },
            { name: "> 500L", slug: "tu-lanh" },
          ]},
          { title: "By type", items: [
            { name: "Side-by-side", slug: "tu-lanh" },
            { name: "French door", slug: "tu-lanh" },
            { name: "Multi-door", slug: "tu-lanh" },
          ]},
          { title: "Features", items: [
            { name: "Energy-saving inverter", slug: "tu-lanh" },
            { name: "No-frost", slug: "tu-lanh" },
            { name: "Smart Wi-Fi", slug: "tu-lanh" },
          ]},
        ],
      },
      {
        name: "Washing Machines", slug: "may-giat", icon: "🧺",
        image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5",
        tagline: "Front-load, top-load, and washer-dryer machines — full range for home and hotel.",
        highlights: [
          { name: "Front-load inverter",  image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "may-giat" },
          { name: "Top-load",            image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "may-giat" },
          { name: "Washer-dryer combo",      image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "may-giat" },
          { name: "Commercial hotel", image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "may-giat" },
        ],
        sections: [
          { title: "By load", items: [
            { name: "7–9 kg", slug: "may-giat" },
            { name: "10–12 kg", slug: "may-giat" },
            { name: "Commercial >15 kg", slug: "may-giat" },
          ]},
          { title: "Type", items: [
            { name: "Front-load", slug: "may-giat" },
            { name: "Top-load", slug: "may-giat" },
            { name: "Washer-dryer combo", slug: "may-giat" },
          ]},
          { title: "Features", items: [
            { name: "Inverter", slug: "may-giat" },
            { name: "Steam sanitizing", slug: "may-giat" },
            { name: "Wi-Fi control", slug: "may-giat" },
          ]},
        ],
      },
      {
        name: "Heaters", slug: "may-suoi", icon: "🔥",
        image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5",
        tagline: "Oil-filled, halogen, and fan heaters — 1500–2500 W power.",
        highlights: [
          { name: "9-fin oil heater",  image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "may-suoi" },
          { name: "Halogen tower",      image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "may-suoi" },
          { name: "Mini fan heater",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "may-suoi" },
          { name: "Carbon infrared", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "may-suoi" },
        ],
        sections: [
          { title: "Type", items: [
            { name: "Oil-filled heater", slug: "may-suoi" },
            { name: "Halogen tower", slug: "may-suoi" },
            { name: "Fan heater", slug: "may-suoi" },
          ]},
          { title: "Power", items: [
            { name: "1500 W", slug: "may-suoi" },
            { name: "2000 W", slug: "may-suoi" },
            { name: "2500 W", slug: "may-suoi" },
          ]},
          { title: "Features", items: [
            { name: "Auto-off timer", slug: "may-suoi" },
            { name: "Remote control", slug: "may-suoi" },
            { name: "Overheat protection", slug: "may-suoi" },
          ]},
        ],
      },
      {
        name: "Water Heaters", slug: "binh-nong-lanh", icon: "🚿",
        image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5",
        tagline: "Instant, storage, and solar water heaters.",
        highlights: [
          { name: "Instant 3500W",     image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "binh-nong-lanh" },
          { name: "Storage 30L",       image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "binh-nong-lanh" },
          { name: "Solar", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "binh-nong-lanh" },
          { name: "Heat pump",           image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "binh-nong-lanh" },
        ],
        sections: [
          { title: "Type", items: [
            { name: "Instant", slug: "binh-nong-lanh" },
            { name: "Storage", slug: "binh-nong-lanh" },
            { name: "Solar", slug: "binh-nong-lanh" },
          ]},
          { title: "Capacity", items: [
            { name: "15–20L", slug: "binh-nong-lanh" },
            { name: "30L", slug: "binh-nong-lanh" },
            { name: "50L+ hotel", slug: "binh-nong-lanh" },
          ]},
          { title: "Tank material", items: [
            { name: "Enamel-lined tank", slug: "binh-nong-lanh" },
            { name: "Stainless steel tank", slug: "binh-nong-lanh" },
            { name: "Copper tank", slug: "binh-nong-lanh" },
          ]},
        ],
      },
      {
        name: "Wires & Cables", slug: "day-dien-cap", icon: "🔌",
        image: "/img/ceramic-4-1.jpg?v=5",
        tagline: "Single-core, multi-core wires, control cables — pure copper, EN-certified.",
        highlights: [
          { name: "Single-core 1.5–4 mm²",  image: "/img/ceramic-4-1.jpg?v=5", slug: "day-dien-cap" },
          { name: "Flexible multi-core 2.5–10",   image: "/img/ceramic-4-2.jpg?v=5", slug: "day-dien-cap" },
          { name: "Power cable 25–95 mm²",   image: "/img/ceramic-4-3.jpg?v=5", slug: "day-dien-cap" },
          { name: "CY control cable",    image: "/img/ceramic-4-4.jpg?v=5", slug: "day-dien-cap" },
        ],
        sections: [
          { title: "By cross-section", items: [
            { name: "1.5 mm²", slug: "day-dien-cap" },
            { name: "2.5 mm²", slug: "day-dien-cap" },
            { name: "4–10 mm²", slug: "day-dien-cap" },
          ]},
          { title: "By type", items: [
            { name: "Single-core rigid VCm", slug: "day-dien-cap" },
            { name: "Flexible multi-core", slug: "day-dien-cap" },
            { name: "Fire-resistant LSZH", slug: "day-dien-cap" },
          ]},
          { title: "Standard", items: [
            { name: "IEC 60227", slug: "day-dien-cap" },
            { name: "EN 50525", slug: "day-dien-cap" },
            { name: "TCVN 5934", slug: "day-dien-cap" },
          ]},
        ],
      },
      {
        name: "Conduit", slug: "ong-dan-dien", icon: "📏",
        image: "/img/ceramic-4-2.jpg?v=5",
        tagline: "PVC, PE, and metal wiring conduit — fire-resistant + load-bearing.",
        highlights: [
          { name: "White PVC conduit",   image: "/img/ceramic-4-2.jpg?v=5", slug: "ong-dan-dien" },
          { name: "Flexible PE conduit",  image: "/img/ceramic-4-3.jpg?v=5", slug: "ong-dan-dien" },
          { name: "GI steel conduit",     image: "/img/ceramic-4-4.jpg?v=5", slug: "ong-dan-dien" },
          { name: "Flexible aluminum conduit",    image: "/img/ceramic-4-5.jpg?v=5", slug: "ong-dan-dien" },
        ],
        sections: [
          { title: "Material", items: [
            { name: "Rigid PVC", slug: "ong-dan-dien" },
            { name: "Flexible PE", slug: "ong-dan-dien" },
            { name: "Galvanized GI steel", slug: "ong-dan-dien" },
          ]},
          { title: "Diameter", items: [
            { name: "Ø16 mm", slug: "ong-dan-dien" },
            { name: "Ø20 mm", slug: "ong-dan-dien" },
            { name: "Ø25–32 mm", slug: "ong-dan-dien" },
          ]},
          { title: "Accessories", items: [
            { name: "T/L elbow fittings", slug: "ong-dan-dien" },
            { name: "Wall mounting box", slug: "ong-dan-dien" },
            { name: "Ceiling hanger clamp", slug: "ong-dan-dien" },
          ]},
        ],
      },
      {
        name: "Cable Trays", slug: "mang-day-dien", icon: "🛤️",
        image: "/img/ceramic-4-3.jpg?v=5",
        tagline: "Steel, stainless steel, and aluminum cable trays — wiring for factory corridors and offices.",
        highlights: [
          { name: "Epoxy-coated steel tray", image: "/img/ceramic-4-3.jpg?v=5", slug: "mang-day-dien" },
          { name: "Stainless steel 304 tray",       image: "/img/ceramic-4-4.jpg?v=5", slug: "mang-day-dien" },
          { name: "Galvanized cable ladder",  image: "/img/ceramic-4-5.jpg?v=5", slug: "mang-day-dien" },
          { name: "Curved plastic tray",       image: "/img/ceramic-4-1.jpg?v=5", slug: "mang-day-dien" },
        ],
        sections: [
          { title: "Material", items: [
            { name: "Epoxy-coated steel", slug: "mang-day-dien" },
            { name: "Stainless steel 304", slug: "mang-day-dien" },
            { name: "Hot-dip galvanized", slug: "mang-day-dien" },
          ]},
          { title: "Type", items: [
            { name: "Solid tray", slug: "mang-day-dien" },
            { name: "Perforated tray", slug: "mang-day-dien" },
            { name: "Industrial cable ladder", slug: "mang-day-dien" },
          ]},
          { title: "Accessories", items: [
            { name: "T/Y fittings", slug: "mang-day-dien" },
            { name: "Cover", slug: "mang-day-dien" },
            { name: "Ceiling hanger support", slug: "mang-day-dien" },
          ]},
        ],
      },
    ],
  },
];

export const STATS = [
  { value: "960+", label: "SKUs for sale" },
  { value: "20+", label: "Verified factories" },
  { value: "<24h", label: "Quote turnaround" },
  { value: "300+", label: "Vietnam dealers" },
  { value: "12 yrs", label: "Trading history" },
];

// ── Homepage product sections — computed from real PARTNERS (single source of truth).
//    Auto-updates for future partners too; each card links to the real product detail page. ──
function homeYears(founded?: string): string {
  const m = founded?.match(/(\d{4})/);
  if (!m) return "Genuine";
  const d = 2026 - parseInt(m[1], 10);
  return d > 0 ? `${d} yrs` : "Genuine";
}
function partnerCard(p: PartnerBrand, prod: PartnerProduct): Product {
  const ps = productSlug(prod);
  return {
    id: `${p.slug}-${ps}`,
    href: `/info/partners/${p.slug}/${ps}`,
    title: prod.name,
    price: "Negotiable",
    unit: "",
    moq: prod.series ?? "In Stock",
    rating: 5,
    seller: p.name,
    years: homeYears(p.founded),
    image: prod.image,
    tags: [p.name],
  };
}
const HOME_CATS: { slug: string; title: string }[] = [
  { slug: "electrical", title: "Electrical & Appliances" },
  { slug: "kitchen-equipment", title: "Kitchen Equipment" },
  { slug: "bathroom-sanitary", title: "Bathroom & Sanitary" },
  { slug: "lighting", title: "Lighting" },
  { slug: "construction-materials", title: "Building Materials" },
  { slug: "noi-that", title: "Furniture & Interior" },
  { slug: "home-garden", title: "Home & Garden" },
  { slug: "doors-windows", title: "Doors, Windows & Smart Locks" },
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
    const featuredImg = featured.products.find((pr) => pr.image)?.image;
    out.push({
      id: cat.slug,
      num: out.length + 1,
      title: cat.title,
      cn: cat.title,
      tabs: ["All", ...brands.slice(0, 7).map((b) => b.name)],
      totalCount: String(brands.reduce((s, b) => s + b.products.length, 0)),
      categorySlug: cat.slug,
      featureSlug: featured.slug,
      feature: {
        badge: "PARTNER",
        title: featured.name,
        desc: featured.nameOriginal,
        cta: "View Products →",
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
  { initials: "DP", slug: "dongpeng-ceramics", name: "Guangdong Dongpeng Ceramics Co., Ltd.", location: "Foshan, Guangdong · CN", rating: 4.9, reviews: "2,340", meta: "50M m²/yr", badges: { gold: true, audited: true, years: "12 yrs" }, tags: ["Porcelain", "Marble", "Floor & Wall Tile"] },
  { initials: "MN", slug: "monalisa-group", name: "Monalisa Group Co., Ltd.", location: "Foshan, Guangdong · CN", rating: 4.9, reviews: "1,540", meta: "25M m²/yr", badges: { gold: true, audited: true, years: "10 yrs" }, tags: ["Ceramics", "Large Slabs", "Stone Slabs"] },
  { initials: "NP", slug: "newpearl-ceramics", name: "NewPearl Ceramics Group", location: "Foshan · CN", rating: 4.7, reviews: "680", meta: "200M m²/yr", badges: { audited: true, years: "11 yrs" }, tags: ["Wall Tile", "Floor Tile", "Porcelain"] },
  // Furniture
  { initials: "KK", slug: "kuka-home", name: "Hangzhou KUKA Home Co., Ltd.", location: "Hangzhou, Zhejiang · CN", rating: 4.8, reviews: "1,810", meta: "6K+ stores", badges: { gold: true, audited: true, years: "9 yrs" }, tags: ["Sofas", "Recliners", "Hotel Furniture"] },
  { initials: "OP", slug: "oppein-home", name: "OPPEIN Home Group Inc.", location: "Guangzhou · CN", rating: 5.0, reviews: "3,120", meta: "#1 in Asia — cabinets", badges: { gold: true, audited: true, years: "15 yrs" }, tags: ["Kitchen Cabinets", "Wardrobes", "Whole-Home Furniture"], vr360ComId: "eKtTcaCAvhrm" },
  { initials: "LB", slug: "landbond-furniture", name: "Landbond Furniture Group", location: "Foshan & Linyi · CN", rating: 5.0, reviews: "1,230", meta: "40 yrs in solid wood", badges: { gold: true, audited: true, years: "14 yrs" }, tags: ["Solid Wood", "Bedroom", "Living Room"] },
  { initials: "ZY", slug: "zuoyou-furniture", name: "ZuoYou Furniture Co., Ltd.", location: "Shenzhen · CN", rating: 4.8, reviews: "540", meta: "Design-focused", badges: { audited: true, years: "8 yrs" }, tags: ["Upholstered", "Sofas", "Modern"] },
  { initials: "RA", slug: "redapple-furniture", name: "RedApple Furniture (HK)", location: "Hong Kong · CN", rating: 4.9, reviews: "1,050", meta: "Since 1981", badges: { audited: true, years: "18 yrs" }, tags: ["Custom", "Mattresses", "Hotel"] },
];

export const ZONES: Zone[] = [
  { slug: "foshan-ceramic", name: "Foshan — Ceramics", count: "1,200 factories", image: "/img/zone1.jpg?v=5" },
  { slug: "foshan-furniture", name: "Foshan — Furniture", count: "3,000+ factories", image: "/img/zone3.jpg?v=5" },
  { slug: "jinjiang-wood", name: "Jinjiang — Wood", count: "340 factories", image: "/img/zone5.jpg?v=5" },
];
