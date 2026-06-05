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
  "large-format marble slab",
  "sofa set",
  "kitchen cabinet",
  "engineered wood flooring",
  "hotel bed",
];

export const NAV_CATEGORIES = [
  { icon: "🏠", name: "Home & Garden", slug: "home-garden" },
  { icon: "🧱", name: "Building Materials", slug: "construction-materials" },
  { icon: "🚿", name: "Bathroom & Sanitary", slug: "bathroom-sanitary" },
  { icon: "🛋", name: "Furniture", slug: "noi-that" },
  { icon: "🍳", name: "Kitchen Equipment", slug: "kitchen-equipment" },
  { icon: "💡", name: "Lighting", slug: "lighting" },
  { icon: "🪟", name: "Doors & Locks", slug: "doors-windows" },
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
        image: "/img/nm-home-garden-0.jpg?v=8",
        tagline: "Passenger elevators / escalators / fire-rated elevators — full range of capacities and applications.",
        highlights: [
          { name: "Passenger elevator",       image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "thang-may-cho-khach" },
          { name: "Escalator",                image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "thang-cuon" },
          { name: "Fire-rated elevator",      image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "thang-chong-chay" },
          { name: "6-person elevator",        image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "thang-may-cho-khach" },
          { name: "13-person elevator",       image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "thang-may-cho-khach" },
          { name: "Airport escalator",        image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "thang-cuon" },
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
            { name: "Airports / metro", slug: "thang-cuon" },
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
        image: "/img/nm-construction-materials-0.jpg?v=8",
        tagline: "H/I/U/V section steel, steel pipe, steel plate, color-coated steel — quoted by the ton FOB Guangzhou.",
        highlights: [
          { name: "H/I/U/V section steel",  image: "/img/thep-hinh-h-i-u-v.jpg?v=6", slug: "ket-cau-thep-khung" },
          { name: "Black / galvanized steel pipe",  image: "/img/ceramic-1-2.jpg?v=6", slug: "ket-cau-thep-khung" },
          { name: "Steel plate coil",      image: "/img/ceramic-1-3.jpg?v=6", slug: "ket-cau-thep-khung" },
          { name: "Square steel tube",      image: "/img/ceramic-1-4.jpg?v=6", slug: "ket-cau-thep-khung" },
          { name: "Color-coated steel",     image: "/img/ceramic-1-5.jpg?v=6", slug: "ton-lanh" },
          { name: "I-beam steel",   image: "/img/cer3.jpg?v=6", slug: "ket-cau-thep-khung" },
        ],
        sections: [
          { title: "Steel", items: [
            { name: "Color-coated steel", slug: "ton-lanh" },
            { name: "I-beam steel", slug: "ket-cau-thep-khung" },
          ]},
          { title: "By Shape", items: [
            { name: "H/I section steel", slug: "ket-cau-thep-khung" },
            { name: "U/V section steel", slug: "ket-cau-thep-khung" },
            { name: "Square steel tube", slug: "ket-cau-thep-khung" },
            { name: "Round steel pipe", slug: "ket-cau-thep-khung" },
          ]},
          { title: "By Finish", items: [
            { name: "Black steel", slug: "ket-cau-thep-khung" },
            { name: "Hot-dip galvanized", slug: "ket-cau-thep-khung" },
            { name: "Powder coated", slug: "ket-cau-thep-khung" },
            { name: "Stainless 304/316", slug: "ket-cau-thep-khung" },
          ]},
          { title: "By Standard", items: [
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
        image: "/img/nm-construction-materials-1.jpg?v=8",
        tagline: "Porcelain panels, ceramic, MDF — interior design solutions for hotels and villas.",
        highlights: [
          { name: "Large-format porcelain panel",  image: "/img/cer6.jpg?v=6", slug: "tam-op-tuong-tran" },
          { name: "3D wall panel",       image: "/img/cer4.jpg?v=6", slug: "tam-op-tuong-tran" },
          { name: "Gypsum ceiling",     image: "/img/cer5.jpg?v=6", slug: "tam-op-tuong-tran" },
          { name: "MDF wood cladding",          image: "/img/cer8.jpg?v=6", slug: "tam-op-tuong-tran" },
          { name: "Acoustic panel",  image: "/img/cer3.jpg?v=6", slug: "tam-cach-am" },
          { name: "ALC block", image: "/img/cer2.jpg?v=6", slug: "gach-alc-acc" },
        ],
        sections: [
          { title: "Wall Materials", items: [
            { name: "Acoustic panel", slug: "tam-cach-am" },
            { name: "ALC / ACC block", slug: "gach-alc-acc" },
          ]},
          { title: "Wall Panels", items: [
            { name: "Large-format porcelain panel", slug: "tam-op-tuong-tran" },
            { name: "3D PVC panel", slug: "tam-op-tuong-tran" },
            { name: "Composite panel", slug: "tam-op-tuong-tran" },
            { name: "Glossy acrylic panel", slug: "tam-op-tuong-tran" },
          ]},
          { title: "Gypsum Ceiling", items: [
            { name: "Flush concealed ceiling", slug: "tam-op-tuong-tran" },
            { name: "60×60 drop ceiling", slug: "tam-op-tuong-tran" },
            { name: "60×120 drop ceiling", slug: "tam-op-tuong-tran" },
            { name: "Perforated nano ceiling", slug: "tam-op-tuong-tran" },
          ]},
          { title: "Decorative Wood Cladding", items: [
            { name: "Oak veneer MDF", slug: "tam-op-tuong-tran" },
            { name: "Moisture-resistant HDF", slug: "tam-op-tuong-tran" },
            { name: "WPC wood-plastic", slug: "tam-op-tuong-tran" },
            { name: "Pine wood molding", slug: "tam-op-tuong-tran" },
          ]},
          { title: "Accessories", items: [
            { name: "Galvanized framing", slug: "tam-op-tuong-tran" },
            { name: "Panel adhesive", slug: "tam-op-tuong-tran" },
            { name: "Recessed LED light", slug: "tam-op-tuong-tran" },
            { name: "PVC molding", slug: "tam-op-tuong-tran" },
          ]},
        ],
      },
      {
        name: "Flooring Materials", slug: "vat-lieu-lat-san", icon: "🟫",
        image: "/img/nm-construction-materials-2.jpg?v=8",
        tagline: "SPC + LVT flooring, natural wood, floor tile — DDP within 18 days.",
        highlights: [
          { name: "SPC + LVT flooring",          image: "/img/cer7.jpg?v=6", slug: "san-go-spc-lvt" },
          { name: "Engineered wood flooring", image: "/img/cer8.jpg?v=6", slug: "san-go-engineered" },
          { name: "Solid hardwood flooring",   image: "/img/cer2.jpg?v=6", slug: "san-go-tu-nhien" },
          { name: "Floor tile",          image: "/img/cer1.jpg?v=6", slug: "gach-op-lat" },
          { name: "Granite slab",            image: "/img/da-granite-tu-nhien.jpg?v=6", slug: "vat-lieu-lat-san" },
          { name: "Outdoor flooring",            image: "/img/cer5.jpg?v=6", slug: "vat-lieu-lat-san" },
        ],
        sections: [
          { title: "Wood Flooring", items: [
            { name: "SPC + LVT flooring", slug: "san-go-spc-lvt" },
            { name: "Multi-layer engineered wood flooring", slug: "san-go-engineered" },
            { name: "Solid hardwood flooring", slug: "san-go-tu-nhien" },
          ]},
          { title: "Flooring Materials", items: [
            { name: "Floor tile", slug: "gach-op-lat" },
          ]},
          { title: "Porcelain Tile", items: [
            { name: "Polished glaze", slug: "vat-lieu-lat-san" },
            { name: "Matte textured", slug: "vat-lieu-lat-san" },
            { name: "3D pattern", slug: "vat-lieu-lat-san" },
            { name: "Mosaic", slug: "vat-lieu-lat-san" },
          ]},
          { title: "Wood Flooring", items: [
            { name: "3-layer engineered", slug: "vat-lieu-lat-san" },
            { name: "AC4 laminate", slug: "vat-lieu-lat-san" },
            { name: "SPC vinyl", slug: "vat-lieu-lat-san" },
            { name: "Carbonized bamboo", slug: "vat-lieu-lat-san" },
          ]},
          { title: "Natural Stone", items: [
            { name: "Carrara marble", slug: "vat-lieu-lat-san" },
            { name: "Black granite", slug: "vat-lieu-lat-san" },
            { name: "Travertine", slug: "vat-lieu-lat-san" },
            { name: "Chinese black slate", slug: "vat-lieu-lat-san" },
          ]},
          { title: "Accessories", items: [
            { name: "Skirting board", slug: "vat-lieu-lat-san" },
            { name: "Door threshold trim", slug: "vat-lieu-lat-san" },
            { name: "Floor adhesive", slug: "vat-lieu-lat-san" },
            { name: "Floor underlay", slug: "vat-lieu-lat-san" },
          ]},
        ],
      },
      {
        name: "Natural & Engineered Stone", slug: "da-op-lat", icon: "⛰️",
        image: "/img/nm-construction-materials-3.jpg?v=8",
        tagline: "Fujian marble, granite, quartz — large slabs for countertops and lobbies.",
        highlights: [
          { name: "Natural marble",                  image: "/img/da-marble-tu-nhien.jpg?v=6", slug: "da-op-lat" },
          { name: "Granite slab",                      image: "/img/da-granite-tu-nhien.jpg?v=6", slug: "da-op-lat" },
          { name: "Natural quartz stone",  image: "/img/da-quartz-nhan-tao.jpg?v=6", slug: "da-thach-anh-tu-nhien" },
          { name: "Engineered quartz stone", image: "/img/da-mosaic-trang-tri.jpg?v=6", slug: "da-thach-anh-nhan-tao" },
          { name: "Inorganic terrazzo",     image: "/img/da-op-ngoai-that.jpg?v=6", slug: "da-mai-vo-co" },
          { name: "Sintered stone",                       image: "/img/da-sintered-da-thieu-ket.jpg?v=6", slug: "da-op-lat" },
        ],
        sections: [
          { title: "Specialty Stone", items: [
            { name: "Natural quartz stone", slug: "da-thach-anh-tu-nhien" },
            { name: "Engineered quartz / marble", slug: "da-thach-anh-nhan-tao" },
            { name: "Inorganic terrazzo", slug: "da-mai-vo-co" },
          ]},
          { title: "Natural Marble", items: [
            { name: "Carrara White", slug: "da-op-lat" },
            { name: "Marquina Black", slug: "da-op-lat" },
            { name: "Beige Gold", slug: "da-op-lat" },
            { name: "Rosa Portugal Pink", slug: "da-op-lat" },
          ]},
          { title: "Granite", items: [
            { name: "Absolute Black", slug: "da-op-lat" },
            { name: "Brazil Red", slug: "da-op-lat" },
            { name: "Sardo Gray", slug: "da-op-lat" },
            { name: "Tropical Yellow", slug: "da-op-lat" },
          ]},
          { title: "Engineered Stone", items: [
            { name: "Marble-pattern quartz", slug: "da-op-lat" },
            { name: "Metallic-pattern quartz", slug: "da-op-lat" },
            { name: "Solid acrylic surface", slug: "da-op-lat" },
            { name: "Engineered terrazzo", slug: "da-op-lat" },
          ]},
          { title: "Sintered Stone", items: [
            { name: "Neolith", slug: "da-op-lat" },
            { name: "Dekton", slug: "da-op-lat" },
            { name: "Lapitec", slug: "da-op-lat" },
            { name: "MaxFine", slug: "da-op-lat" },
          ]},
        ],
      },
      {
        name: "Paint & Coatings", slug: "son-lop-phu", icon: "🎨",
        image: "/img/nm-construction-materials-4.jpg?v=8",
        tagline: "Epoxy floor paint, fireproof paint, decorative render — QCVN compliant.",
        highlights: [
          { name: "Interior / artistic wall paint", image: "/img/son-epoxy-san.jpg?v=6", slug: "son-tuong-trong-nghe-thuat" },
          { name: "Stone-texture exterior paint",  image: "/img/ceramic-2-1.jpg?v=6", slug: "son-mat-tuong-ngoai" },
          { name: "Tile adhesive",                     image: "/img/ceramic-2-2.jpg?v=6", slug: "keo-gach-op" },
          { name: "Decorative tile grout",         image: "/img/ceramic-2-3.jpg?v=6", slug: "keo-chit-mach" },
          { name: "Waterproof paint",                image: "/img/ceramic-2-5.jpg?v=6", slug: "son-chong-tham" },
          { name: "Epoxy floor paint",                            image: "/img/ceramic-2-4.jpg?v=6", slug: "son-lop-phu" },
        ],
        sections: [
          { title: "Paint", items: [
            { name: "Interior / artistic latex paint", slug: "son-tuong-trong-nghe-thuat" },
            { name: "Stone-texture exterior paint", slug: "son-mat-tuong-ngoai" },
            { name: "Tile adhesive", slug: "keo-gach-op" },
            { name: "Decorative tile grout", slug: "keo-chit-mach" },
            { name: "Waterproof paint", slug: "son-chong-tham" },
          ]},
          { title: "Interior Paint", items: [
            { name: "Anti-alkali primer", slug: "son-lop-phu" },
            { name: "Glossy topcoat", slug: "son-lop-phu" },
            { name: "Textured paint", slug: "son-lop-phu" },
            { name: "Anti-mold paint", slug: "son-lop-phu" },
          ]},
          { title: "Exterior Paint", items: [
            { name: "Ultra-durable nano paint", slug: "son-lop-phu" },
            { name: "Heat-reflective paint", slug: "son-lop-phu" },
            { name: "Road / line marking paint", slug: "son-lop-phu" },
            { name: "Epoxy floor paint", slug: "son-lop-phu" },
          ]},
          { title: "Specialty Paint", items: [
            { name: "Fireproof paint", slug: "son-lop-phu" },
            { name: "Waterproof paint", slug: "son-lop-phu" },
            { name: "Anti-static paint", slug: "son-lop-phu" },
            { name: "Thermal insulation paint", slug: "son-lop-phu" },
          ]},
          { title: "Paint Accessories", items: [
            { name: "Masking tape", slug: "son-lop-phu" },
            { name: "Roller / paint brush", slug: "son-lop-phu" },
            { name: "Floor protection sheeting", slug: "son-lop-phu" },
            { name: "Wall putty", slug: "son-lop-phu" },
          ]},
        ],
      },
      {
        name: "Acoustic & Thermal Insulation", slug: "vat-lieu-cach-am-cach-nhiet", icon: "🧊",
        image: "/img/nm-construction-materials-5.jpg?v=8",
        tagline: "Rock wool, EPS/XPS, rubber foam — for karaoke rooms, factories, cold storage.",
        highlights: [
          { name: "Rockwool mineral wool", image: "/img/bong-khoang-rockwool.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Acoustic wall panel",   image: "/img/tam-cach-am.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Glass wool",      image: "/img/bong-thuy-tinh-cach-nhiet.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Polyester wool",      image: "/img/bong-polyester.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "EPS/XPS board",         image: "/img/ceramic-3-1.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "Thermal insulation membrane",     image: "/img/ceramic-3-2.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
        ],
        sections: [
          { title: "Mineral Wool", items: [
            { name: "Rockwool mineral wool board", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Glass wool roll", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Heat-resistant ceramic wool", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Silica aerogel wool", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "Foam", items: [
            { name: "PE foam roll", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Spray PU foam", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Phenolic foam", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Molded EPP", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "EPS / XPS", items: [
            { name: "Standard EPS board", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Compression-resistant XPS board", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Molded EPS SIP board", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "XPS roofing", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "Insulation Accessories", items: [
            { name: "Heat-reflective aluminum foil", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Insulation wool adhesive", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Galvanized brace / framing", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "Specialty anchor screws", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
        ],
      },
      {
        name: "Waterproofing", slug: "vat-lieu-chong-tham", icon: "💧",
        image: "/img/nm-construction-materials-6.jpg?v=8",
        tagline: "Self-adhesive bitumen membrane, polyurethane coating, PU sealant — 10–15 yr warranty.",
        highlights: [
          { name: "Self-adhesive bitumen membrane",  image: "/img/mang-chong-tham-bitum.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "PU waterproof coating",   image: "/img/ceramic-4-1.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "Silicone sealant",        image: "/img/ceramic-4-2.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "Cement additive",     image: "/img/ceramic-4-3.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "PVC waterstop",   image: "/img/ceramic-4-4.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "Waterproof mortar",      image: "/img/ceramic-4-5.jpg?v=6", slug: "vat-lieu-chong-tham" },
        ],
        sections: [
          { title: "Bitumen Membrane", items: [
            { name: "Self-adhesive SBS", slug: "vat-lieu-chong-tham" },
            { name: "Torch-applied APP", slug: "vat-lieu-chong-tham" },
            { name: "3mm-thick roll", slug: "vat-lieu-chong-tham" },
            { name: "4mm-thick roll", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "Waterproof Coating", items: [
            { name: "1-component elastic PU", slug: "vat-lieu-chong-tham" },
            { name: "2-component elastic PU", slug: "vat-lieu-chong-tham" },
            { name: "Water-based acrylic", slug: "vat-lieu-chong-tham" },
            { name: "High-pressure spray polyurea", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "Sealants & Additives", items: [
            { name: "Neutral silicone", slug: "vat-lieu-chong-tham" },
            { name: "MS Polymer", slug: "vat-lieu-chong-tham" },
            { name: "Cement waterproofing additive", slug: "vat-lieu-chong-tham" },
            { name: "2-component waterproof mortar", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "Installation Accessories", items: [
            { name: "PVC waterstop", slug: "vat-lieu-chong-tham" },
            { name: "Reinforcing fiber mesh", slug: "vat-lieu-chong-tham" },
            { name: "Butyl tape", slug: "vat-lieu-chong-tham" },
            { name: "Non-shrink grout", slug: "vat-lieu-chong-tham" },
          ]},
        ],
      },
      {
        name: "Cement & Mortar", slug: "vat-lieu-kho-xi-mang-vua", icon: "🏗️",
        image: "/img/nm-construction-materials-7.jpg?v=8",
        tagline: "Ha Tien cement, ready-mix dry mortar, concrete additives — delivered to site.",
        highlights: [
          { name: "General-purpose cement",     image: "/img/chau-xi-mang.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Ready-mix mortar",        image: "/img/ceramic-5-1.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Concrete additive",     image: "/img/ceramic-5-2.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Non-shrink grout",  image: "/img/ceramic-5-3.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Tile adhesive",        image: "/img/ceramic-5-4.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "Acid-resistant mortar",      image: "/img/ceramic-5-5.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
        ],
        sections: [
          { title: "Bagged Cement", items: [
            { name: "PCB30 general-purpose", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCB40 high-compression", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCB50 high-strength", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "White cement", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "Ready-Mix Dry Mortar", items: [
            { name: "Masonry & plaster mortar", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Bonding mortar", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Finishing mortar", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Self-leveling mortar", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "Concrete Additives", items: [
            { name: "Rapid-setting", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Retarder", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCE superplasticizer", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "Concrete waterproofing", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "Adhesives & Grout", items: [
            { name: "1-component tile adhesive", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "2-component tile adhesive", slug: "vat-lieu-kho-xi-mang-vua" },
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
        image: "/img/nm-bathroom-sanitary-0.jpg?v=8",
        tagline: "One-piece, two-piece, wall-hung toilets — glazed ceramic, quiet siphon flush.",
        highlights: [
          { name: "One-piece siphon toilet",  image: "/img/bathroom-1-1.jpg?v=6", slug: "bon-cau-su" },
          { name: "Standard two-piece toilet", image: "/img/bathroom-1-2.jpg?v=6", slug: "bon-cau-su" },
          { name: "Wall-hung toilet",       image: "/img/bathroom-1-3.jpg?v=6", slug: "bon-cau-su" },
          { name: "Ceramic squat toilet",            image: "/img/bathroom-1-4.jpg?v=6", slug: "bon-cau-su" },
        ],
        sections: [
          { title: "Flush Type", items: [
            { name: "Quiet siphon", slug: "bon-cau-su" },
            { name: "Direct flush", slug: "bon-cau-su" },
            { name: "Pressure flush", slug: "bon-cau-su" },
          ]},
          { title: "Installation Type", items: [
            { name: "One-piece", slug: "bon-cau-su" },
            { name: "Two-piece with tank", slug: "bon-cau-su" },
            { name: "Wall-hung", slug: "bon-cau-su" },
          ]},
          { title: "Water Standard", items: [
            { name: "Water-saving 3/6L", slug: "bon-cau-su" },
            { name: "WaterSense", slug: "bon-cau-su" },
            { name: "CUPC", slug: "bon-cau-su" },
          ]},
        ],
      },
      {
        name: "Smart Toilets", slug: "bon-cau-thong-minh", icon: "🤖",
        image: "/img/nm-bathroom-sanitary-1.jpg?v=8",
        tagline: "Smart toilets with wash + dry + heated seat + automatic odor removal.",
        highlights: [
          { name: "Smart one-piece",   image: "/img/bathroom-2-1.jpg?v=6", slug: "bon-cau-thong-minh" },
          { name: "Add-on smart bidet seat",         image: "/img/bathroom-2-2.jpg?v=6", slug: "bon-cau-thong-minh" },
          { name: "Smart wall-hung", image: "/img/bathroom-2-3.jpg?v=6", slug: "bon-cau-thong-minh" },
          { name: "Premium Japanese-grade",   image: "/img/bathroom-2-4.jpg?v=6", slug: "bon-cau-thong-minh" },
        ],
        sections: [
          { title: "Features", items: [
            { name: "Warm-water wash", slug: "bon-cau-thong-minh" },
            { name: "Air drying", slug: "bon-cau-thong-minh" },
            { name: "Heated seat + odor removal", slug: "bon-cau-thong-minh" },
          ]},
          { title: "Controls", items: [
            { name: "Proximity sensor", slug: "bon-cau-thong-minh" },
            { name: "Infrared control", slug: "bon-cau-thong-minh" },
            { name: "Side panel + voice", slug: "bon-cau-thong-minh" },
          ]},
          { title: "Energy Saving", items: [
            { name: "Ultra-efficient 3L flush", slug: "bon-cau-thong-minh" },
            { name: "Eco mode", slug: "bon-cau-thong-minh" },
            { name: "Auto power-off", slug: "bon-cau-thong-minh" },
          ]},
        ],
      },
      {
        name: "Ceramic Basins", slug: "lavabo-su", icon: "🪣",
        image: "/img/nm-bathroom-sanitary-2.jpg?v=8",
        tagline: "Wall-hung, undermount and countertop ceramic basins — many styles.",
        highlights: [
          { name: "Round countertop",   image: "/img/bathroom-3-1.jpg?v=6", slug: "lavabo-su" },
          { name: "Wall-hung",     image: "/img/bathroom-3-2.jpg?v=6", slug: "lavabo-su" },
          { name: "Vessel basin", image: "/img/bathroom-3-3.jpg?v=6", slug: "lavabo-su" },
          { name: "Undermount",          image: "/img/bathroom-3-4.jpg?v=6", slug: "lavabo-su" },
        ],
        sections: [
          { title: "Installation Type", items: [
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
            { name: "Artistic stone-pattern finish", slug: "lavabo-su" },
          ]},
        ],
      },
      {
        name: "Bathroom Cabinets", slug: "tu-phong-tam", icon: "🪞",
        image: "/img/nm-bathroom-sanitary-3.jpg?v=8",
        tagline: "Vanity + mirror + lighting — waterproof wood + stainless steel.",
        highlights: [
          { name: "600 mm cabinet",       image: "/img/bathroom-4-1.jpg?v=6", slug: "tu-phong-tam" },
          { name: "800 mm cabinet with mirror", image: "/img/bathroom-4-2.jpg?v=6", slug: "tu-phong-tam" },
          { name: "1200 mm double vanity",   image: "/img/bathroom-4-3.jpg?v=6", slug: "tu-phong-tam" },
          { name: "Stainless 304 cabinet",       image: "/img/bathroom-4-4.jpg?v=6", slug: "tu-phong-tam" },
        ],
        sections: [
          { title: "Material", items: [
            { name: "Melamine-faced plywood", slug: "tu-phong-tam" },
            { name: "Waterproof PVC", slug: "tu-phong-tam" },
            { name: "Stainless 304", slug: "tu-phong-tam" },
          ]},
          { title: "Size", items: [
            { name: "600 mm", slug: "tu-phong-tam" },
            { name: "800 mm", slug: "tu-phong-tam" },
            { name: "1200 mm double basin", slug: "tu-phong-tam" },
          ]},
          { title: "Accessories", items: [
            { name: "Touch mirror + lighting", slug: "tu-phong-tam" },
            { name: "Hydraulic lift door", slug: "tu-phong-tam" },
            { name: "Rose gold handle", slug: "tu-phong-tam" },
          ]},
        ],
      },
      {
        name: "Faucets & Showers", slug: "voi-nuoc", icon: "🚰",
        image: "/img/nm-bathroom-sanitary-4.jpg?v=8",
        tagline: "Shower mixers, basin faucets and kitchen faucets — brass with chrome / gold / matte finish.",
        highlights: [
          { name: "Tall basin faucet", image: "/img/bathroom-5-1.jpg?v=6", slug: "voi-nuoc" },
          { name: "Concealed shower mixer", image: "/img/bathroom-5-2.jpg?v=6", slug: "voi-nuoc" },
          { name: "Gooseneck kitchen faucet", image: "/img/bathroom-5-3.jpg?v=6", slug: "voi-nuoc" },
          { name: "Shower set",   image: "/img/bathroom-5-4.jpg?v=6", slug: "voi-nuoc" },
        ],
        sections: [
          { title: "Installation Location", items: [
            { name: "Basin", slug: "voi-nuoc" },
            { name: "Bathtub / shower", slug: "voi-nuoc" },
            { name: "Kitchen", slug: "voi-nuoc" },
          ]},
          { title: "Material", items: [
            { name: "Chrome-plated brass", slug: "voi-nuoc" },
            { name: "Stainless 304", slug: "voi-nuoc" },
            { name: "Budget zinc alloy", slug: "voi-nuoc" },
          ]},
          { title: "Finish Color", items: [
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
        image: "/img/nm-noi-that-0.jpg?v=8",
        tagline: "Sofas, coffee tables, TV units — complete sets for villas and premium apartments.",
        highlights: [
          { name: "Modern sofa",       image: "/img/fur1.jpg?v=6", slug: "phong-khach" },
          { name: "Classic sofa",        image: "/img/fur2.jpg?v=6", slug: "phong-khach" },
          { name: "Coffee table",          image: "/img/ban-ca-phe.jpg?v=6", slug: "phong-khach" },
          { name: "TV unit",               image: "/img/fur4.jpg?v=6", slug: "phong-khach" },
          { name: "Lounge chair",        image: "/img/fur5.jpg?v=6", slug: "phong-khach" },
          { name: "Console table",         image: "/img/furniture-1-3.jpg?v=6", slug: "phong-khach" },
        ],
        sections: [
          { title: "Sofas", items: [
            { name: "Modern sofa", slug: "phong-khach" },
            { name: "Classic sofa", slug: "phong-khach" },
            { name: "Italian leather sofa", slug: "phong-khach" },
            { name: "Linen sofa", slug: "phong-khach" },
          ]},
          { title: "Tables & Units", items: [
            { name: "Coffee table", slug: "phong-khach" },
            { name: "Console table", slug: "phong-khach" },
            { name: "Wall-mounted TV unit", slug: "phong-khach" },
            { name: "Freestanding TV unit", slug: "phong-khach" },
          ]},
          { title: "Lounge Chairs", items: [
            { name: "Armchair", slug: "phong-khach" },
            { name: "Reclining lounge chair", slug: "phong-khach" },
            { name: "Hanging egg chair", slug: "phong-khach" },
            { name: "Ottoman", slug: "phong-khach" },
          ]},
          { title: "Lighting & Decor", items: [
            { name: "Floor lamp", slug: "phong-khach" },
            { name: "Sofa side table lamp", slug: "phong-khach" },
            { name: "Living room rug", slug: "phong-khach" },
            { name: "Premium curtains", slug: "phong-khach" },
          ]},
        ],
      },
      {
        name: "Bedroom", slug: "phong-ngu", icon: "🛏️",
        image: "/img/nm-noi-that-1.jpg?v=8",
        tagline: "Beds, wardrobes, dressing tables — modern and neoclassical styles.",
        highlights: [
          { name: "Bed",          image: "/img/fur3.jpg?v=6", slug: "phong-ngu" },
          { name: "Wardrobe",          image: "/img/fur8.jpg?v=6", slug: "phong-ngu" },
          { name: "Dressing table",      image: "/img/furniture-2-1.jpg?v=6", slug: "phong-ngu" },
          { name: "Nightstand",      image: "/img/furniture-2-2.jpg?v=6", slug: "phong-ngu" },
          { name: "Latex mattress",           image: "/img/dem-latex-memory-foam.jpg?v=6", slug: "phong-ngu" },
          { name: "Pocket-spring mattress",   image: "/img/dem-pocket-spring.jpg?v=6", slug: "phong-ngu" },
        ],
        sections: [
          { title: "Beds", items: [
            { name: "1.6m bed", slug: "phong-ngu" },
            { name: "1.8m bed", slug: "phong-ngu" },
            { name: "2m king bed", slug: "phong-ngu" },
            { name: "Bunk bed", slug: "phong-ngu" },
          ]},
          { title: "Wardrobes", items: [
            { name: "Sliding-door wardrobe", slug: "phong-ngu" },
            { name: "Swing-door wardrobe", slug: "phong-ngu" },
            { name: "Walk-in closet", slug: "phong-ngu" },
            { name: "Wardrobe with mirror", slug: "phong-ngu" },
          ]},
          { title: "Premium Mattresses", items: [
            { name: "Natural latex mattress", slug: "phong-ngu" },
            { name: "Pocket-spring mattress", slug: "phong-ngu" },
            { name: "Memory foam mattress", slug: "phong-ngu" },
            { name: "7-zone latex mattress", slug: "phong-ngu" },
          ]},
          { title: "Tables / Accessories", items: [
            { name: "Dressing table with mirror", slug: "phong-ngu" },
            { name: "Nightstand", slug: "phong-ngu" },
            { name: "Bed-end bench", slug: "phong-ngu" },
            { name: "Touch night light", slug: "phong-ngu" },
          ]},
        ],
      },
      {
        name: "Dining Room", slug: "phong-an", icon: "🍽️",
        image: "/img/nm-noi-that-2.jpg?v=8",
        tagline: "Dining sets, wine cabinets, dining chairs — solid wood and premium MDF veneer.",
        highlights: [
          { name: "6–8 seat dining table",      image: "/img/ban-an.jpg?v=6", slug: "phong-an" },
          { name: "Dining chair",              image: "/img/ghe-an.jpg?v=6", slug: "phong-an" },
          { name: "Coffee table",          image: "/img/ban-ca-phe.jpg?v=6", slug: "phong-an" },
          { name: "Bar stool",             image: "/img/ghe-bar.jpg?v=6", slug: "phong-an" },
          { name: "Crystal chandelier",     image: "/img/den-pha-le-k9.jpg?v=6", slug: "phong-an" },
          { name: "Pendant light",         image: "/img/den-pendant.jpg?v=6", slug: "phong-an" },
        ],
        sections: [
          { title: "Dining Tables", items: [
            { name: "4-seat table", slug: "phong-an" },
            { name: "6-seat table", slug: "phong-an" },
            { name: "8-seat table", slug: "phong-an" },
            { name: "Extendable table", slug: "phong-an" },
          ]},
          { title: "Dining Chairs", items: [
            { name: "Solid wood chair", slug: "phong-an" },
            { name: "Leather-upholstered chair", slug: "phong-an" },
            { name: "Fabric-upholstered chair", slug: "phong-an" },
            { name: "Premium plastic chair", slug: "phong-an" },
          ]},
          { title: "Wine & Buffet Cabinets", items: [
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
        image: "/img/nm-noi-that-3.jpg?v=8",
        tagline: "OPPEIN kitchen cabinets, acrylic and laminate finishes — free 3D design from 30-set orders.",
        highlights: [
          { name: "L-shaped kitchen",        image: "/img/fur7.jpg?v=6", slug: "tu-bep" },
          { name: "U-shaped kitchen",        image: "/img/furniture-7-1.jpg?v=6", slug: "tu-bep" },
          { name: "Kitchen island",             image: "/img/furniture-7-2.jpg?v=6", slug: "tu-bep" },
          { name: "Quartz countertop",       image: "/img/da-quartz-nhan-tao.jpg?v=6", slug: "tu-bep" },
          { name: "Cabinet hinge",       image: "/img/ban-le-tu-bep.jpg?v=6", slug: "tu-bep" },
          { name: "Soft-close hinge",    image: "/img/ban-le-tu-giam-chan.jpg?v=6", slug: "tu-bep" },
        ],
        sections: [
          { title: "Layout", items: [
            { name: "Basic straight-line", slug: "tu-bep" },
            { name: "L-shaped corner kitchen", slug: "tu-bep" },
            { name: "Enclosed U-shape", slug: "tu-bep" },
            { name: "With kitchen island", slug: "tu-bep" },
          ]},
          { title: "Door Material", items: [
            { name: "Glossy acrylic", slug: "tu-bep" },
            { name: "Wood-grain laminate", slug: "tu-bep" },
            { name: "MFC melamine", slug: "tu-bep" },
            { name: "Solid oak / walnut", slug: "tu-bep" },
          ]},
          { title: "Countertop", items: [
            { name: "Engineered quartz", slug: "tu-bep" },
            { name: "Natural granite", slug: "tu-bep" },
            { name: "White marble", slug: "tu-bep" },
            { name: "Corian solid surface", slug: "tu-bep" },
          ]},
          { title: "Accessories", items: [
            { name: "Blum soft-close hinge", slug: "tu-bep" },
            { name: "3-tier drawer slide", slug: "tu-bep" },
            { name: "Cabinet handle", slug: "tu-bep" },
            { name: "Under-cabinet LED light", slug: "tu-bep" },
          ]},
        ],
      },
      {
        name: "Wardrobes", slug: "tu-quan-ao", icon: "👔",
        image: "/img/nm-noi-that-4.jpg?v=8",
        tagline: "Built-in wardrobes, walk-in closets — OEM to your room dimensions.",
        highlights: [
          { name: "Sliding-door wardrobe",    image: "/img/fur8.jpg?v=6", slug: "tu-quan-ao" },
          { name: "Walk-in closet",      image: "/img/furniture-8-1.jpg?v=6", slug: "tu-quan-ao" },
          { name: "Kids' wardrobe",        image: "/img/furniture-8-2.jpg?v=6", slug: "tu-quan-ao" },
          { name: "Shoe cabinet",             image: "/img/furniture-8-3.jpg?v=6", slug: "tu-quan-ao" },
          { name: "Cabinet hinge",           image: "/img/ban-le.jpg?v=6", slug: "tu-quan-ao" },
          { name: "Door hinge",          image: "/img/ban-le-cua.jpg?v=6", slug: "tu-quan-ao" },
        ],
        sections: [
          { title: "Wardrobe Type", items: [
            { name: "Sliding door", slug: "tu-quan-ao" },
            { name: "Swing door", slug: "tu-quan-ao" },
            { name: "Walk-in closet", slug: "tu-quan-ao" },
            { name: "Built-in module", slug: "tu-quan-ao" },
          ]},
          { title: "Material", items: [
            { name: "MDF veneer", slug: "tu-quan-ao" },
            { name: "Moisture-resistant HDF", slug: "tu-quan-ao" },
            { name: "Solid wood", slug: "tu-quan-ao" },
            { name: "Glossy acrylic", slug: "tu-quan-ao" },
          ]},
          { title: "Interior Accessories", items: [
            { name: "Hafele pull-out basket", slug: "tu-quan-ao" },
            { name: "Rotating tie rack", slug: "tu-quan-ao" },
            { name: "Motion-sensor LED light", slug: "tu-quan-ao" },
            { name: "In-cabinet safe", slug: "tu-quan-ao" },
          ]},
          { title: "Matching Cabinets", items: [
            { name: "Matching shoe cabinet", slug: "tu-quan-ao" },
            { name: "Nightstand", slug: "tu-quan-ao" },
            { name: "Drawer chest", slug: "tu-quan-ao" },
            { name: "Built-in jewelry tray", slug: "tu-quan-ao" },
          ]},
        ],
      },
      {
        name: "Home Office", slug: "van-phong-tai-nha", icon: "💼",
        image: "/img/nm-noi-that-5.jpg?v=8",
        tagline: "Desks, ergonomic chairs, bookshelves — for flexible home offices.",
        highlights: [
          { name: "Desk",        image: "/img/ban-lam-viec.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "Office chair",       image: "/img/ghe-van-phong.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "Folding picnic table",      image: "/img/ban-picnic-gap-gon.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "LED desk lamp",         image: "/img/den-ban-de-ban.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "Floor lamp",      image: "/img/den-san-floor-lamp.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "Smart Wi-Fi light",     image: "/img/den-smart-wi-fi.jpg?v=6", slug: "van-phong-tai-nha" },
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
            { name: "Mesh office chair", slug: "van-phong-tai-nha" },
          ]},
          { title: "Storage", items: [
            { name: "Open bookshelf", slug: "van-phong-tai-nha" },
            { name: "Glass-door filing cabinet", slug: "van-phong-tai-nha" },
            { name: "Document storage box", slug: "van-phong-tai-nha" },
            { name: "Mobile drawer cabinet", slug: "van-phong-tai-nha" },
          ]},
          { title: "Work Accessories", items: [
            { name: "Touch LED desk lamp", slug: "van-phong-tai-nha" },
            { name: "Monitor stand", slug: "van-phong-tai-nha" },
            { name: "Smart Wi-Fi light", slug: "van-phong-tai-nha" },
            { name: "Vertical laptop stand", slug: "van-phong-tai-nha" },
          ]},
        ],
      },
      {
        name: "Hotel Furniture", slug: "noi-that-khach-san", icon: "🏨",
        image: "/img/nm-noi-that-6.jpg?v=8",
        tagline: "Turnkey 3–5 star FF&E — designed to Marriott/Hilton standards.",
        highlights: [
          { name: "Hotel bed",    image: "/img/fur6.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "Lobby table",           image: "/img/furniture-6-1.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "Lounge chair",        image: "/img/furniture-6-2.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "Crystal chandelier", image: "/img/den-chum-chandelier.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "Wall sconce",     image: "/img/den-tuong-wall-sconce.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "Ceiling light",         image: "/img/den-op-tran.jpg?v=6", slug: "noi-that-khach-san" },
        ],
        sections: [
          { title: "Hotel Bedroom", items: [
            { name: "King/Queen bed", slug: "noi-that-khach-san" },
            { name: "Upholstered headboard", slug: "noi-that-khach-san" },
            { name: "In-room work desk", slug: "noi-that-khach-san" },
            { name: "Wood-veneer minibar cabinet", slug: "noi-that-khach-san" },
          ]},
          { title: "Hotel Bathroom", items: [
            { name: "100% cotton towels", slug: "noi-that-khach-san" },
            { name: "Packaged amenity set", slug: "noi-that-khach-san" },
            { name: "Waffle bathrobe", slug: "noi-that-khach-san" },
            { name: "In-room slippers", slug: "noi-that-khach-san" },
          ]},
          { title: "Lobby & Waiting Area", items: [
            { name: "Lounge chair", slug: "noi-that-khach-san" },
            { name: "Reception counter", slug: "noi-that-khach-san" },
            { name: "Crystal chandelier", slug: "noi-that-khach-san" },
            { name: "Glass display cabinet", slug: "noi-that-khach-san" },
          ]},
          { title: "Dining / Bar Area", items: [
            { name: "Stainless steel buffet table", slug: "noi-that-khach-san" },
            { name: "Premium restaurant chair", slug: "noi-that-khach-san" },
            { name: "Bar counter pendant light", slug: "noi-that-khach-san" },
            { name: "Solid-surface bar counter", slug: "noi-that-khach-san" },
          ]},
        ],
      },
      {
        name: "Kids & Baby", slug: "tre-em-em-be", icon: "🧸",
        image: "/img/nm-noi-that-7.jpg?v=8",
        tagline: "Kids' beds, study desks, safe toys — E0/E1 certified.",
        highlights: [
          { name: "Kids' bed",       image: "/img/furniture-3-1.jpg?v=6", slug: "tre-em-em-be" },
          { name: "Study desk",             image: "/img/furniture-3-2.jpg?v=6", slug: "tre-em-em-be" },
          { name: "Toy cabinet",          image: "/img/furniture-3-3.jpg?v=6", slug: "tre-em-em-be" },
          { name: "Adjustable kids' chair",        image: "/img/ghe-tam-nang.jpg?v=6", slug: "tre-em-em-be" },
          { name: "Kids' desk lamp",   image: "/img/den-ban-de-ban.jpg?v=6", slug: "tre-em-em-be" },
          { name: "Decorative LED strip light", image: "/img/den-led-day.jpg?v=6", slug: "tre-em-em-be" },
        ],
        sections: [
          { title: "Kids' Bedroom", items: [
            { name: "Safe bunk bed", slug: "tre-em-em-be" },
            { name: "MDF baby crib", slug: "tre-em-em-be" },
            { name: "Kids' wardrobe", slug: "tre-em-em-be" },
            { name: "Touch night light", slug: "tre-em-em-be" },
          ]},
          { title: "Study Corner", items: [
            { name: "Posture-correcting desk", slug: "tre-em-em-be" },
            { name: "Adjustable study chair", slug: "tre-em-em-be" },
            { name: "Kids' bookshelf", slug: "tre-em-em-be" },
            { name: "Eye-protection LED desk lamp", slug: "tre-em-em-be" },
          ]},
          { title: "Toys & Storage", items: [
            { name: "Modular toy cabinet", slug: "tre-em-em-be" },
            { name: "E0 wooden toys", slug: "tre-em-em-be" },
            { name: "Educational building blocks", slug: "tre-em-em-be" },
            { name: "Fabric storage box", slug: "tre-em-em-be" },
          ]},
          { title: "Hygiene & Feeding", items: [
            { name: "Baby high chair", slug: "tre-em-em-be" },
            { name: "Kids' cotton towel", slug: "tre-em-em-be" },
            { name: "Silicone feeding bib", slug: "tre-em-em-be" },
            { name: "Mini baby wash basin", slug: "tre-em-em-be" },
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
        image: "/img/nm-kitchen-equipment-0.jpg?v=8",
        tagline: "Single / double / 3–4 zone induction cooktops — Schott glass surface, 3500W+ power.",
        highlights: [
          { name: "Double cooking zone",   image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "bep-tu" },
          { name: "3 cooking zones",     image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "bep-tu" },
          { name: "4 cooking zones",     image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "bep-tu" },
          { name: "Portable single burner",    image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "bep-tu" },
        ],
        sections: [
          { title: "Number of Zones", items: [
            { name: "Single 1-zone", slug: "bep-tu" },
            { name: "Double 2-zone", slug: "bep-tu" },
            { name: "Built-in 3–4 zone", slug: "bep-tu" },
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
        image: "/img/nm-kitchen-equipment-1.jpg?v=8",
        tagline: "Wall-mounted, built-in and island range hoods — airflow 700–1300 m³/h.",
        highlights: [
          { name: "Diamond wall-mounted", image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "may-hut-mui" },
          { name: "Classic built-in",   image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "may-hut-mui" },
          { name: "Ceiling-mounted island", image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "may-hut-mui" },
          { name: "Remote touch control",     image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "may-hut-mui" },
        ],
        sections: [
          { title: "By Installation", items: [
            { name: "Wall / wall-mounted", slug: "may-hut-mui" },
            { name: "Classic built-in", slug: "may-hut-mui" },
            { name: "Ceiling-mounted island", slug: "may-hut-mui" },
          ]},
          { title: "Airflow", items: [
            { name: "700 m³/h", slug: "may-hut-mui" },
            { name: "1000 m³/h", slug: "may-hut-mui" },
            { name: "1300+ m³/h", slug: "may-hut-mui" },
          ]},
          { title: "Material", items: [
            { name: "Stainless 304", slug: "may-hut-mui" },
            { name: "Tempered glass", slug: "may-hut-mui" },
            { name: "Artistic milled copper", slug: "may-hut-mui" },
          ]},
        ],
      },
      {
        name: "Microwave Ovens", slug: "lo-vi-song", icon: "📡",
        image: "/img/nm-kitchen-equipment-2.jpg?v=8",
        tagline: "Manual, electronic and grill microwave ovens — 20–42L capacity.",
        highlights: [
          { name: "Manual 20L",     image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "lo-vi-song" },
          { name: "Electronic 25L",    image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "lo-vi-song" },
          { name: "Grill 30L",   image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "lo-vi-song" },
          { name: "Steam combo", image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "lo-vi-song" },
        ],
        sections: [
          { title: "Capacity", items: [
            { name: "20L household", slug: "lo-vi-song" },
            { name: "25–30L", slug: "lo-vi-song" },
            { name: "42L+ professional", slug: "lo-vi-song" },
          ]},
          { title: "Type", items: [
            { name: "Manual", slug: "lo-vi-song" },
            { name: "Electronic touch", slug: "lo-vi-song" },
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
        image: "/img/nm-kitchen-equipment-3.jpg?v=8",
        tagline: "Electric and multi-function pressure cookers — 4–10L capacity.",
        highlights: [
          { name: "Electric 5L",       image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "noi-ap-suat" },
          { name: "Multi-function 6L",    image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "noi-ap-suat" },
          { name: "Large stainless 8L",      image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "noi-ap-suat" },
          { name: "Traditional manual", image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "noi-ap-suat" },
        ],
        sections: [
          { title: "Capacity", items: [
            { name: "4–5L household", slug: "noi-ap-suat" },
            { name: "6–8L", slug: "noi-ap-suat" },
            { name: "10L+ eatery", slug: "noi-ap-suat" },
          ]},
          { title: "Type", items: [
            { name: "Electric", slug: "noi-ap-suat" },
            { name: "Manual", slug: "noi-ap-suat" },
            { name: "12-in-1 multi-function", slug: "noi-ap-suat" },
          ]},
          { title: "Inner Pot Material", items: [
            { name: "Non-stick ceramic", slug: "noi-ap-suat" },
            { name: "Stainless 304", slug: "noi-ap-suat" },
            { name: "Thick aluminum alloy", slug: "noi-ap-suat" },
          ]},
        ],
      },
      {
        name: "Rice Cookers", slug: "noi-com-dien", icon: "🍚",
        image: "/img/nm-kitchen-equipment-4.jpg?v=8",
        tagline: "Manual, electronic and IH high-frequency rice cookers — 1.8–5L for home and restaurant.",
        highlights: [
          { name: "Manual 1.8L",   image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "noi-com-dien" },
          { name: "Electronic 2L",    image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "noi-com-dien" },
          { name: "IH high-frequency",    image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "noi-com-dien" },
          { name: "Commercial 5L",image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "noi-com-dien" },
        ],
        sections: [
          { title: "Technology", items: [
            { name: "Manual", slug: "noi-com-dien" },
            { name: "Electronic", slug: "noi-com-dien" },
            { name: "IH high-frequency", slug: "noi-com-dien" },
          ]},
          { title: "Capacity", items: [
            { name: "1.0–1.8L", slug: "noi-com-dien" },
            { name: "2.0–3.0L", slug: "noi-com-dien" },
            { name: "5L+ restaurant", slug: "noi-com-dien" },
          ]},
          { title: "Modes", items: [
            { name: "Cook rice", slug: "noi-com-dien" },
            { name: "Steam", slug: "noi-com-dien" },
            { name: "Porridge / stew", slug: "noi-com-dien" },
          ]},
        ],
      },
      {
        name: "Dishwashers", slug: "may-rua-bat", icon: "🍽️",
        image: "/img/nm-kitchen-equipment-5.jpg?v=8",
        tagline: "Freestanding, built-in and mini dishwashers — 6–14 place settings.",
        highlights: [
          { name: "Freestanding 14 settings",  image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "may-rua-bat" },
          { name: "Built-in 12 settings",    image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "may-rua-bat" },
          { name: "Countertop mini 6 settings",  image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "may-rua-bat" },
          { name: "Semi-built-in",          image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "may-rua-bat" },
        ],
        sections: [
          { title: "Installation Type", items: [
            { name: "Freestanding", slug: "may-rua-bat" },
            { name: "Built-in", slug: "may-rua-bat" },
            { name: "Countertop mini", slug: "may-rua-bat" },
          ]},
          { title: "Place Settings", items: [
            { name: "6 settings mini", slug: "may-rua-bat" },
            { name: "8–10 settings", slug: "may-rua-bat" },
            { name: "13–14 settings professional", slug: "may-rua-bat" },
          ]},
          { title: "Features", items: [
            { name: "Heat drying", slug: "may-rua-bat" },
            { name: "UV sterilization", slug: "may-rua-bat" },
            { name: "Wi-Fi control", slug: "may-rua-bat" },
          ]},
        ],
      },
      {
        name: "Stainless Steel Sinks", slug: "chau-rua-inox", icon: "🍽️",
        image: "/img/nm-kitchen-equipment-6.jpg?v=8",
        tagline: "Single / double / triple bowl stainless 304 sinks — smooth handmade / noise-dampened.",
        highlights: [
          { name: "Single bowl 50×40",   image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "chau-rua-inox" },
          { name: "Double bowl 78×42",   image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "chau-rua-inox" },
          { name: "Square handmade",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "chau-rua-inox" },
          { name: "Triple bowl commercial", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "chau-rua-inox" },
        ],
        sections: [
          { title: "Number of Bowls", items: [
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
        name: "Hardware & Accessories", slug: "kim-khi-bep", icon: "🔧",
        image: "/img/nm-kitchen-equipment-7.jpg?v=8",
        tagline: "Cabinet hinges, drawer slides, handles, stainless accessories — order by container.",
        highlights: [
          { name: "Soft-close hinge", image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "kim-khi-bep" },
          { name: "Concealed undermount slide",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "kim-khi-bep" },
          { name: "Alloy handle",  image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "kim-khi-bep" },
          { name: "Stainless accessories",    image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "kim-khi-bep" },
        ],
        sections: [
          { title: "Hinges & Slides", items: [
            { name: "35 mm cup hinge", slug: "kim-khi-bep" },
            { name: "3-tier drawer slide", slug: "kim-khi-bep" },
            { name: "Hydraulic cabinet lift", slug: "kim-khi-bep" },
          ]},
          { title: "Stainless Accessories", items: [
            { name: "Dish rack", slug: "kim-khi-bep" },
            { name: "Spice rack", slug: "kim-khi-bep" },
            { name: "In-cabinet trash bin", slug: "kim-khi-bep" },
          ]},
          { title: "Handles", items: [
            { name: "Square stainless handle", slug: "kim-khi-bep" },
            { name: "Round brass knob", slug: "kim-khi-bep" },
            { name: "Flush recessed handle", slug: "kim-khi-bep" },
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
        image: "/img/nm-lighting-0.jpg?v=8",
        tagline: "Full range of LED light sources — drivers, modules, COB, specialty SMD.",
        highlights: [
          { name: "COB chip",      image: "/img/ceramic-2-1.jpg?v=6", slug: "den-led" },
          { name: "SMD 2835/5050", image: "/img/ceramic-2-2.jpg?v=6", slug: "den-led" },
          { name: "Driver module",  image: "/img/ceramic-2-3.jpg?v=6", slug: "den-led" },
          { name: "LED filament bulb", image: "/img/ceramic-2-4.jpg?v=6", slug: "den-led" },
        ],
        sections: [
          { title: "Chip Type", items: [
            { name: "COB", slug: "den-led" },
            { name: "SMD", slug: "den-led" },
            { name: "Filament", slug: "den-led" },
          ]},
          { title: "Color Temperature", items: [
            { name: "Warm white 3000K", slug: "den-led" },
            { name: "Neutral white 4000K", slug: "den-led" },
            { name: "Cool white 6500K", slug: "den-led" },
          ]},
          { title: "CRI Color Rendering", items: [
            { name: "Ra >80", slug: "den-led" },
            { name: "Ra >90", slug: "den-led" },
            { name: "Ra >95 for art display", slug: "den-led" },
          ]},
        ],
      },
      {
        name: "Residential LED Lighting", slug: "den-led-gia-dung", icon: "🏠",
        image: "/img/nm-lighting-1.jpg?v=8",
        tagline: "Ceiling lights, downlights, panels, LED strips — for living and family rooms.",
        highlights: [
          { name: "Ceiling light",  image: "/img/ceramic-2-2.jpg?v=6", slug: "den-led-gia-dung" },
          { name: "Recessed downlight", image: "/img/ceramic-2-3.jpg?v=6", slug: "den-led-gia-dung" },
          { name: "Square panel",  image: "/img/ceramic-2-4.jpg?v=6", slug: "den-led-gia-dung" },
          { name: "Decorative LED strip", image: "/img/ceramic-2-5.jpg?v=6", slug: "den-led-gia-dung" },
        ],
        sections: [
          { title: "By Location", items: [
            { name: "Living room", slug: "den-led-gia-dung" },
            { name: "Bedroom", slug: "den-led-gia-dung" },
            { name: "Hallway / staircase", slug: "den-led-gia-dung" },
          ]},
          { title: "By Type", items: [
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
        image: "/img/nm-lighting-2.jpg?v=8",
        tagline: "Floodlights, industrial tube lights, spotlights — IP65/66.",
        highlights: [
          { name: "100W LED floodlight",  image: "/img/ceramic-2-3.jpg?v=6", slug: "den-led-thuong-mai" },
          { name: "T8 tube light",       image: "/img/ceramic-2-4.jpg?v=6", slug: "den-led-thuong-mai" },
          { name: "Track spotlight", image: "/img/ceramic-2-5.jpg?v=6", slug: "den-led-thuong-mai" },
          { name: "UFO high-bay light", image: "/img/ceramic-2-1.jpg?v=6", slug: "den-led-thuong-mai" },
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
          { title: "IP Protection Rating", items: [
            { name: "IP44 indoor", slug: "den-led-thuong-mai" },
            { name: "IP65 outdoor", slug: "den-led-thuong-mai" },
            { name: "IP66 dust/water-proof", slug: "den-led-thuong-mai" },
          ]},
        ],
      },
      {
        name: "Electrical Supplies", slug: "vat-tu-dien", icon: "⚙️",
        image: "/img/nm-lighting-3.jpg?v=8",
        tagline: "Sockets, switches, MCBs, ATS — accessories to complete your lighting system.",
        highlights: [
          { name: "Flush-mount socket",  image: "/img/ceramic-2-4.jpg?v=6", slug: "vat-tu-dien" },
          { name: "Touch switch", image: "/img/ceramic-2-5.jpg?v=6", slug: "vat-tu-dien" },
          { name: "MCB / RCBO",       image: "/img/ceramic-2-1.jpg?v=6", slug: "vat-tu-dien" },
          { name: "Junction box",      image: "/img/ceramic-2-2.jpg?v=6", slug: "vat-tu-dien" },
        ],
        sections: [
          { title: "Switchgear", items: [
            { name: "MCB 6/10/16A", slug: "vat-tu-dien" },
            { name: "RCBO", slug: "vat-tu-dien" },
            { name: "Automatic circuit breaker", slug: "vat-tu-dien" },
          ]},
          { title: "Sockets & Switches", items: [
            { name: "Square flush plate", slug: "vat-tu-dien" },
            { name: "Smart touch", slug: "vat-tu-dien" },
            { name: "USB socket", slug: "vat-tu-dien" },
          ]},
          { title: "Accessories", items: [
            { name: "Flush-mount back box", slug: "vat-tu-dien" },
            { name: "Grounding bolt", slug: "vat-tu-dien" },
            { name: "Quick cable clamp", slug: "vat-tu-dien" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🪟", name: "Doors & Locks", slug: "doors-windows" },
    items: [
      {
        name: "3D Face Recognition Lock", slug: "khoa-3d-face", icon: "📹",
        image: "/img/nm-doors-windows-0.jpg?v=8",
        tagline: "3D face recognition lock + video calling — IP68 waterproof.",
        highlights: [
          { name: "3D face + video",  image: "/img/ceramic-3-1.jpg?v=6", slug: "khoa-3d-face" },
          { name: "1080p camera",     image: "/img/ceramic-3-2.jpg?v=6", slug: "khoa-3d-face" },
          { name: "5000 mAh rechargeable battery", image: "/img/ceramic-3-3.jpg?v=6", slug: "khoa-3d-face" },
          { name: "Wi-Fi + 4G",        image: "/img/ceramic-3-4.jpg?v=6", slug: "khoa-3d-face" },
        ],
        sections: [
          { title: "Sensors", items: [
            { name: "3D dot recognition", slug: "khoa-3d-face" },
            { name: "Night infrared", slug: "khoa-3d-face" },
            { name: "Backup fingerprint sensor", slug: "khoa-3d-face" },
          ]},
          { title: "Unlocking", items: [
            { name: "Face recognition", slug: "khoa-3d-face" },
            { name: "Fingerprint", slug: "khoa-3d-face" },
            { name: "PIN / NFC", slug: "khoa-3d-face" },
          ]},
          { title: "Connectivity", items: [
            { name: "Wi-Fi 2.4 GHz", slug: "khoa-3d-face" },
            { name: "Bluetooth 5.0", slug: "khoa-3d-face" },
            { name: "Backup 4G module", slug: "khoa-3d-face" },
          ]},
        ],
      },
      {
        name: "Smart Wi-Fi Lock", slug: "khoa-wifi", icon: "📶",
        image: "/img/nm-doors-windows-1.jpg?v=8",
        tagline: "Fingerprint lock + remote control via Wi-Fi app.",
        highlights: [
          { name: "Tuya Smart app",  image: "/img/ceramic-3-2.jpg?v=6", slug: "khoa-wifi" },
          { name: "1-year AA battery life", image: "/img/ceramic-3-3.jpg?v=6", slug: "khoa-wifi" },
          { name: "One-time code",         image: "/img/ceramic-3-4.jpg?v=6", slug: "khoa-wifi" },
          { name: "Dual anti-pry deadbolt", image: "/img/ceramic-3-5.jpg?v=6", slug: "khoa-wifi" },
        ],
        sections: [
          { title: "Unlocking", items: [
            { name: "Fingerprint", slug: "khoa-wifi" },
            { name: "PIN code", slug: "khoa-wifi" },
            { name: "NFC card", slug: "khoa-wifi" },
          ]},
          { title: "Smart Home", items: [
            { name: "Tuya / Smart Life", slug: "khoa-wifi" },
            { name: "Google Home", slug: "khoa-wifi" },
            { name: "Alexa", slug: "khoa-wifi" },
          ]},
          { title: "Lock Body Material", items: [
            { name: "Zinc alloy", slug: "khoa-wifi" },
            { name: "Stainless 304", slug: "khoa-wifi" },
            { name: "Anodized aluminum", slug: "khoa-wifi" },
          ]},
        ],
      },
      {
        name: "Wi-Fi Gate Lock", slug: "khoa-don-cong-wifi", icon: "🚪",
        image: "/img/nm-doors-windows-2.jpg?v=8",
        tagline: "Outdoor gate lock, fingerprint + Wi-Fi — designed for villas.",
        highlights: [
          { name: "Villa iron gate",  image: "/img/ceramic-3-3.jpg?v=6", slug: "khoa-don-cong-wifi" },
          { name: "Stainless folding gate",      image: "/img/ceramic-3-4.jpg?v=6", slug: "khoa-don-cong-wifi" },
          { name: "Automatic sliding gate", image: "/img/ceramic-3-5.jpg?v=6", slug: "khoa-don-cong-wifi" },
          { name: "Euro aluminum gate",     image: "/img/ceramic-3-1.jpg?v=6", slug: "khoa-don-cong-wifi" },
        ],
        sections: [
          { title: "Unlocking", items: [
            { name: "Fingerprint", slug: "khoa-don-cong-wifi" },
            { name: "PIN code", slug: "khoa-don-cong-wifi" },
            { name: "App + remote control", slug: "khoa-don-cong-wifi" },
          ]},
          { title: "IP Protection Rating", items: [
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
        name: "Fingerprint Locks", slug: "khoa-van-tay", icon: "👆",
        image: "/img/nm-doors-windows-3.jpg?v=8",
        tagline: "Electronic fingerprint locks for wood, aluminum and steel doors — standard range.",
        highlights: [
          { name: "Standard wood door",  image: "/img/ceramic-3-4.jpg?v=6", slug: "khoa-van-tay" },
          { name: "Xingfa aluminum door",   image: "/img/ceramic-3-5.jpg?v=6", slug: "khoa-van-tay" },
          { name: "Fire-rated steel door", image: "/img/ceramic-3-1.jpg?v=6", slug: "khoa-van-tay" },
          { name: "Pivot glass door",      image: "/img/ceramic-3-2.jpg?v=6", slug: "khoa-van-tay" },
        ],
        sections: [
          { title: "Sensor Type", items: [
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
            { name: "Emergency USB-C power bank", slug: "khoa-van-tay" },
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
        image: "/img/nm-electrical-0.jpg?v=8",
        tagline: "Wall-mounted, ceiling cassette and floor-standing inverter ACs — full power range.",
        highlights: [
          { name: "Wall-mounted inverter", image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "dieu-hoa" },
          { name: "Ceiling cassette",    image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "dieu-hoa" },
          { name: "Commercial floor-standing", image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "dieu-hoa" },
          { name: "Multi-split",         image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "dieu-hoa" },
        ],
        sections: [
          { title: "By Capacity", items: [
            { name: "9,000 BTU", slug: "dieu-hoa" },
            { name: "12,000 BTU", slug: "dieu-hoa" },
            { name: "18,000–24,000 BTU", slug: "dieu-hoa" },
          ]},
          { title: "By Installation", items: [
            { name: "Wall-mounted", slug: "dieu-hoa" },
            { name: "Ceiling cassette", slug: "dieu-hoa" },
            { name: "Floor-standing", slug: "dieu-hoa" },
          ]},
          { title: "Technology", items: [
            { name: "R32 inverter", slug: "dieu-hoa" },
            { name: "Wi-Fi control", slug: "dieu-hoa" },
            { name: "PM2.5 filter", slug: "dieu-hoa" },
          ]},
        ],
      },
      {
        name: "Refrigerators", slug: "tu-lanh", icon: "🧊",
        image: "/img/nm-electrical-1.jpg?v=8",
        tagline: "Side-by-side, French door and mini bar refrigerators — quoted by FCL lot.",
        highlights: [
          { name: "Side-by-side",  image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "tu-lanh" },
          { name: "French door",   image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "tu-lanh" },
          { name: "Top freezer",  image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "tu-lanh" },
          { name: "Mini bar",      image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "tu-lanh" },
        ],
        sections: [
          { title: "By Capacity", items: [
            { name: "< 200L", slug: "tu-lanh" },
            { name: "200–400L", slug: "tu-lanh" },
            { name: "> 500L", slug: "tu-lanh" },
          ]},
          { title: "By Type", items: [
            { name: "Side-by-side", slug: "tu-lanh" },
            { name: "French door", slug: "tu-lanh" },
            { name: "Multi-door", slug: "tu-lanh" },
          ]},
          { title: "Features", items: [
            { name: "Energy-saving inverter", slug: "tu-lanh" },
            { name: "Frost-free", slug: "tu-lanh" },
            { name: "Smart Wi-Fi", slug: "tu-lanh" },
          ]},
        ],
      },
      {
        name: "Washing Machines", slug: "may-giat", icon: "🧺",
        image: "/img/nm-electrical-2.jpg?v=8",
        tagline: "Front-load, top-load and washer-dryers — full range for home and hotel.",
        highlights: [
          { name: "Front-load inverter",  image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "may-giat" },
          { name: "Top-load",            image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "may-giat" },
          { name: "Combo washer-dryer",      image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "may-giat" },
          { name: "Commercial hotel", image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "may-giat" },
        ],
        sections: [
          { title: "By Capacity", items: [
            { name: "7–9 kg", slug: "may-giat" },
            { name: "10–12 kg", slug: "may-giat" },
            { name: "Commercial >15 kg", slug: "may-giat" },
          ]},
          { title: "Type", items: [
            { name: "Front-load", slug: "may-giat" },
            { name: "Top-load", slug: "may-giat" },
            { name: "Combo washer-dryer", slug: "may-giat" },
          ]},
          { title: "Features", items: [
            { name: "Inverter", slug: "may-giat" },
            { name: "Steam sterilization", slug: "may-giat" },
            { name: "Wi-Fi control", slug: "may-giat" },
          ]},
        ],
      },
      {
        name: "Heaters", slug: "may-suoi", icon: "🔥",
        image: "/img/nm-electrical-3.jpg?v=8",
        tagline: "Oil heaters, halogen and fan heaters — 1500–2500 W power.",
        highlights: [
          { name: "9-fin oil heater",  image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "may-suoi" },
          { name: "Halogen tower",      image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "may-suoi" },
          { name: "Mini fan heater",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "may-suoi" },
          { name: "Carbon infrared heater", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "may-suoi" },
        ],
        sections: [
          { title: "Type", items: [
            { name: "Oil heater", slug: "may-suoi" },
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
        image: "/img/nm-electrical-4.jpg?v=8",
        tagline: "Instant, storage and solar water heaters.",
        highlights: [
          { name: "Instant 3500W",     image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "binh-nong-lanh" },
          { name: "Storage 30L",       image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "binh-nong-lanh" },
          { name: "Solar", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "binh-nong-lanh" },
          { name: "Heat pump",           image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "binh-nong-lanh" },
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
          { title: "Tank Material", items: [
            { name: "Enamel-lined tank", slug: "binh-nong-lanh" },
            { name: "Stainless steel tank", slug: "binh-nong-lanh" },
            { name: "Copper tank", slug: "binh-nong-lanh" },
          ]},
        ],
      },
      {
        name: "Wires & Cables", slug: "day-dien-cap", icon: "🔌",
        image: "/img/nm-electrical-5.jpg?v=8",
        tagline: "Single-core, multi-core wire, control cable — pure copper, EN compliant.",
        highlights: [
          { name: "Single-core 1.5–4 mm²",  image: "/img/ceramic-4-1.jpg?v=6", slug: "day-dien-cap" },
          { name: "Flexible multi-core 2.5–10",   image: "/img/ceramic-4-2.jpg?v=6", slug: "day-dien-cap" },
          { name: "Power cable 25–95 mm²",   image: "/img/ceramic-4-3.jpg?v=6", slug: "day-dien-cap" },
          { name: "CY control cable",    image: "/img/ceramic-4-4.jpg?v=6", slug: "day-dien-cap" },
        ],
        sections: [
          { title: "By Cross-Section", items: [
            { name: "1.5 mm²", slug: "day-dien-cap" },
            { name: "2.5 mm²", slug: "day-dien-cap" },
            { name: "4–10 mm²", slug: "day-dien-cap" },
          ]},
          { title: "By Type", items: [
            { name: "Rigid single-core VCm", slug: "day-dien-cap" },
            { name: "Flexible multi-core", slug: "day-dien-cap" },
            { name: "Fire-resistant LSZH", slug: "day-dien-cap" },
          ]},
          { title: "Standards", items: [
            { name: "IEC 60227", slug: "day-dien-cap" },
            { name: "EN 50525", slug: "day-dien-cap" },
            { name: "TCVN 5934", slug: "day-dien-cap" },
          ]},
        ],
      },
      {
        name: "Electrical Conduit", slug: "ong-dan-dien", icon: "📏",
        image: "/img/nm-electrical-6.jpg?v=8",
        tagline: "PVC, PE and metal conduit — fire-resistant + load-bearing.",
        highlights: [
          { name: "White PVC conduit",   image: "/img/ceramic-4-2.jpg?v=6", slug: "ong-dan-dien" },
          { name: "Flexible PE conduit",  image: "/img/ceramic-4-3.jpg?v=6", slug: "ong-dan-dien" },
          { name: "GI steel conduit",     image: "/img/ceramic-4-4.jpg?v=6", slug: "ong-dan-dien" },
          { name: "Flexible aluminum conduit",    image: "/img/ceramic-4-5.jpg?v=6", slug: "ong-dan-dien" },
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
            { name: "T/L connector", slug: "ong-dan-dien" },
            { name: "Flush-mount back box", slug: "ong-dan-dien" },
            { name: "Ceiling hanging clamp", slug: "ong-dan-dien" },
          ]},
        ],
      },
      {
        name: "Cable Trays", slug: "mang-day-dien", icon: "🛤️",
        image: "/img/nm-electrical-7.jpg?v=8",
        tagline: "Steel, stainless and aluminum cable trays — cabling for factory corridors and offices.",
        highlights: [
          { name: "Epoxy-coated steel tray", image: "/img/ceramic-4-3.jpg?v=6", slug: "mang-day-dien" },
          { name: "Stainless 304 tray",       image: "/img/ceramic-4-4.jpg?v=6", slug: "mang-day-dien" },
          { name: "Galvanized cable ladder",  image: "/img/ceramic-4-5.jpg?v=6", slug: "mang-day-dien" },
          { name: "Curved plastic trunking",       image: "/img/ceramic-4-1.jpg?v=6", slug: "mang-day-dien" },
        ],
        sections: [
          { title: "Material", items: [
            { name: "Epoxy-coated steel", slug: "mang-day-dien" },
            { name: "Stainless 304", slug: "mang-day-dien" },
            { name: "Hot-dip galvanized", slug: "mang-day-dien" },
          ]},
          { title: "Type", items: [
            { name: "Solid tray", slug: "mang-day-dien" },
            { name: "Perforated tray", slug: "mang-day-dien" },
            { name: "Industrial cable ladder", slug: "mang-day-dien" },
          ]},
          { title: "Accessories", items: [
            { name: "T/Y connector", slug: "mang-day-dien" },
            { name: "Cover", slug: "mang-day-dien" },
            { name: "Ceiling hanger", slug: "mang-day-dien" },
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
  { value: "300+", label: "Dealers in Vietnam" },
  { value: "12 years", label: "Years of experience" },
];

// ── Homepage product sections — computed from real PARTNERS (single source of truth).
//    Auto-updates for future partners too; each card links to the real product detail page. ──
function homeYears(founded?: string): string {
  const m = founded?.match(/(\d{4})/);
  if (!m) return "Authentic";
  const d = 2026 - parseInt(m[1], 10);
  return d > 0 ? `${d} years` : "Authentic";
}
function partnerCard(p: PartnerBrand, prod: PartnerProduct): Product {
  const ps = productSlug(prod);
  return {
    id: `${p.slug}-${ps}`,
    href: `/info/partners/${p.slug}/${ps}`,
    title: prod.name,
    price: "Contact",
    unit: "",
    moq: prod.series ?? "In stock",
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
  { slug: "noi-that", title: "Furniture & Decor" },
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
    const featuredImg = `/img/feat-${cat.slug}.jpg?v=2`;
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
        desc: featured.name,
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
  { initials: "DP", slug: "dongpeng-ceramics", name: "Guangdong Dongpeng Ceramics Co., Ltd.", location: "Foshan, Guangdong · CN", rating: 4.9, reviews: "2,340", meta: "50 million m²/yr", badges: { gold: true, audited: true, years: "12 years" }, tags: ["Porcelain tile", "Marble", "Wall & floor tile"] },
  { initials: "MN", slug: "monalisa-group", name: "Monalisa Group Co., Ltd.", location: "Foshan, Guangdong · CN", rating: 4.9, reviews: "1,540", meta: "25 million m²/yr", badges: { gold: true, audited: true, years: "10 years" }, tags: ["Ceramics", "Large-format panels", "Stone slabs"] },
  { initials: "NP", slug: "newpearl-ceramics", name: "NewPearl Ceramics Group", location: "Foshan · CN", rating: 4.7, reviews: "680", meta: "200 million m²/yr", badges: { audited: true, years: "11 years" }, tags: ["Wall tile", "Floor tile", "Porcelain tile"] },
  // Furniture
  { initials: "KK", slug: "kuka-home", name: "Hangzhou KUKA Home Co., Ltd.", location: "Hangzhou, Zhejiang · CN", rating: 4.8, reviews: "1,810", meta: "6K+ stores", badges: { gold: true, audited: true, years: "9 years" }, tags: ["Sofas", "Lounge chairs", "Hotel furniture"] },
  { initials: "OP", slug: "oppein-home", name: "OPPEIN Home Group Inc.", location: "Guangzhou · CN", rating: 5.0, reviews: "3,120", meta: "Asia's No. 1 — kitchen cabinets", badges: { gold: true, audited: true, years: "15 years" }, tags: ["Kitchen cabinets", "Wardrobes", "Whole-home furniture"], vr360ComId: "eKtTcaCAvhrm" },
  { initials: "LB", slug: "landbond-furniture", name: "Landbond Furniture Group", location: "Foshan & Linyi · CN", rating: 5.0, reviews: "1,230", meta: "40 years of solid wood", badges: { gold: true, audited: true, years: "14 years" }, tags: ["Solid wood", "Bedroom", "Living room"] },
  { initials: "ZY", slug: "zuoyou-furniture", name: "ZuoYou Furniture Co., Ltd.", location: "Shenzhen · CN", rating: 4.8, reviews: "540", meta: "Design-focused", badges: { audited: true, years: "8 years" }, tags: ["Upholstery", "Sofas", "Modern"] },
  { initials: "RA", slug: "redapple-furniture", name: "RedApple Furniture (HK)", location: "Hong Kong · CN", rating: 4.9, reviews: "1,050", meta: "Since 1981", badges: { audited: true, years: "18 years" }, tags: ["Custom-made", "Mattresses", "Hotel"] },
];

export const ZONES: Zone[] = [
  { slug: "foshan-ceramic", name: "Foshan — Ceramics", count: "1,200 factories", image: "/img/zk-ceramic.jpg?v=1" },
  { slug: "foshan-furniture", name: "Foshan — Furniture", count: "3,000+ factories", image: "/img/zk-furniture.jpg?v=1" },
  { slug: "jinjiang-wood", name: "Jinjiang — Wood", count: "340 factories", image: "/img/zk-wood.jpg?v=1" },
  { slug: "guangzhou-appliance", name: "Guangzhou — Appliances", count: "2,000+ factories", image: "/img/zk-appliance.jpg?v=1" },
  { slug: "guzhen-lighting", name: "Guzhen — Lighting", count: "8,000+ facilities", image: "/img/zk-lighting.jpg?v=1" },
  { slug: "chaozhou-sanitary", name: "Chaozhou — Sanitary Ware", count: "1,500+ factories", image: "/img/zk-sanitary.jpg?v=1" },
];
