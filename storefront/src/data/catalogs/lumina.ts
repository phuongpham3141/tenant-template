import type { PartnerProduct } from "@/data/partners";

/**
 * Lumina Floor product catalog —— a young flooring brand from Huayue Supply Chain's in-house factory.
 * Built around eco-friendly SPC stone-plastic composite and high-resilience LVT; 800+ patterns/colors, multiple thicknesses and wear-layer options.
 * Source: Huayue Supply Chain - Lumina Floor product catalog (Chinese-Vietnamese bilingual edition). Images rendered page by page from the catalog.
 */

const SPC_SPECS = [
  { k: "Type", v: "SPC stone-plastic flooring (rigid stone-plastic core)" },
  { k: "Thickness", v: "4mm – 8mm" },
  { k: "Backing pad", v: "1.0 / 1.5 / 2.0mm EVA or IXPE sound-absorbing pad" },
  { k: "Wear layer", v: "0.2 / 0.3 / 0.5mm clear PVC" },
  { k: "Installation", v: "Click-lock (click-together), glue-free" },
  { k: "Eco rating", v: "E0 / E1 grade" },
  { k: "Applications", v: "Residential, apartments, offices, retail, light commercial" },
];
const LVT_SPECS = [
  { k: "Type", v: "LVT multilayer resilient flooring" },
  { k: "Wear layer", v: "0.2 / 0.3 / 0.5mm" },
  { k: "Surface", v: "Anti-slip treatment · realistic wood/stone pattern" },
  { k: "Eco rating", v: "E0 / E1 grade" },
  { k: "Applications", v: "Residential, offices, healthcare, education, retail" },
];

export const LUMINA_PRODUCTS: PartnerProduct[] = [
  // ─── SPC stone-plastic click-lock flooring ───────────────────────────────
  {
    model: "771476",
    slug: "lumina-spc-771476",
    name: "Lumina SPC Stone-Plastic Click-Lock Flooring 771476",
    nameOriginal: "LuminaFloor SPC 771476",
    series: "SPC Stone-Plastic Flooring",
    seriesOriginal: "spc",
    desc: "Eco-friendly stone-plastic composite (SPC) click-lock flooring with a rigid core, ready to install, waterproof and wear-resistant, with 800+ patterns to choose from.",
    longDesc:
      "771476 is the popular entry-level model in Lumina Floor's SPC series. Its rigid core, a composite of calcium powder and high-purity PVC, makes it inherently waterproof, moisture-proof and resistant to warping. The high-definition decorative film on the surface reproduces authentic wood-grain texture, while the UV wear-resistant coating stands up to scratches and foot traffic. Single-sided click-lock allows glue-free, click-together installation: once an old tile or subfloor is leveled, you can lay it directly on top, taking you from bare floor to move-in faster. Whether you're updating a rental or fully outfitting a new home, it delivers a premium look on a friendly budget.",
    image: "/img/products/lumina/page-4.png",
    features: ["Rigid stone-plastic core, waterproof and warp-resistant", "High-definition wood-grain decorative film, lifelike texture", "Glue-free click-lock, lays directly over old floors", "UV wear layer, resists scratches and foot traffic"],
    applications: ["Whole-home apartments / compact units", "Fast rental renovations", "Offices and shared spaces", "Retail and showroom floors"],
    specs: SPC_SPECS,
    sourceUrl: "",
  },
  {
    model: "771478",
    slug: "lumina-spc-771478",
    name: "Lumina SPC Stone-Plastic Click-Lock Flooring 771478",
    nameOriginal: "LuminaFloor SPC 771478",
    series: "SPC Stone-Plastic Flooring",
    seriesOriginal: "spc",
    desc: "SPC stone-plastic click-lock flooring with a realistic wood/stone-pattern surface, scratch- and wear-resistant, waterproof and moisture-proof, ideal for large-area installation.",
    longDesc:
      "771478 features calm, timeless neutral wood grain, a reassuring choice for laying large continuous areas across living rooms and bedrooms. The rigid core is dimensionally stable and resists expansion and contraction in hot or cold conditions; paired with an EVA / IXPE sound-absorbing underlay, footsteps are quieter and the surface feels solid underfoot. Click-lock staggered-seam assembly taps neatly into place, leaving smooth, natural seams that connect into one expansive surface like a solid-wood floor.",
    image: "/img/products/lumina/page-5.png",
    features: ["Neutral wood grain, versatile and timeless", "Dimensionally stable, no warping in heat or cold", "Sound-absorbing underlay, comfortable underfoot", "Natural seams across large continuous areas"],
    applications: ["Living room / bedroom wall-to-wall", "Apartments and finished homes", "Guesthouses and hotel rooms", "Open-plan office areas"],
    specs: SPC_SPECS,
    sourceUrl: "",
  },
  {
    model: "771497",
    slug: "lumina-spc-771497",
    name: "Lumina SPC Stone-Plastic Click-Lock Flooring 771497",
    nameOriginal: "LuminaFloor SPC 771497",
    series: "SPC Stone-Plastic Flooring",
    seriesOriginal: "spc",
    desc: "SPC stone-plastic click-lock flooring with on-trend patterns, eco-friendly and formaldehyde-free, a top pick for green home renovation.",
    longDesc:
      "771497 is made for bold, individual spaces —— striking textures and trend-driven colors turn the floor itself into part of the design. The E0 / E1 grade eco-friendly core is formaldehyde-free for greater peace of mind once you move in, while the commercial-grade wear layer handles heavy foot traffic and stays looking new for years. Use it as the foundation for a cafe, concept store or studio, and the atmosphere instantly comes alive.",
    image: "/img/products/lumina/page-6.png",
    features: ["On-trend textures, strong design presence", "E0/E1 eco-friendly, formaldehyde-free", "Commercial-grade wear resistance, stays like new", "Waterproof and easy to clean, low maintenance"],
    applications: ["Cafes / concept stores", "Studios and exhibition spaces", "Trend-forward retail stores", "Young, individual living spaces"],
    specs: SPC_SPECS,
    sourceUrl: "",
  },
  // ─── LVT resilient flooring ───────────────────────────────
  {
    model: "771500",
    slug: "lumina-lvt-771500",
    name: "Lumina LVT Resilient Flooring (Dry-Back)",
    nameOriginal: "LuminaFloor LVT",
    series: "LVT Resilient Flooring",
    seriesOriginal: "lvt",
    desc: "High-resilience LVT flooring, comfortable underfoot, quiet and wear-resistant; the dry-back version is laid over a self-leveling base.",
    longDesc:
      "Lumina's dry-back LVT wins with softness —— its multilayer resilient structure delivers a warm, comfortable feel and excellent sound absorption, quiet and pleasant to walk on. The ultra-thin 2mm / 3mm design doesn't raise the floor height or catch on doors, making it a friendly choice for renovating older homes and partial remodels. Full-spread glued onto a smooth, self-leveled base, it sits flat and lasts, while the commercial-grade wear layer keeps its composure in high-traffic settings.",
    image: "/img/products/lumina/page-7.png",
    features: ["Multilayer resilient structure, quiet underfoot", "2–3mm ultra-thin, won't catch on doors", "Commercial-grade wear resistance, easy to clean", "Flexible and anti-slip for added safety"],
    applications: ["Hospitals / clinics / elder care facilities", "Schools and training centers", "Offices and open workstations", "Retail chain stores"],
    specs: [{ k: "Thickness", v: "2mm / 3mm (dry-back)" }, ...LVT_SPECS],
    sourceUrl: "",
  },
  {
    model: "771518",
    slug: "lumina-lvt-771518",
    name: "Lumina LVT Self-Adhesive Resilient Flooring 771518",
    nameOriginal: "LuminaFloor LVT 771518",
    series: "LVT Resilient Flooring",
    seriesOriginal: "lvt",
    desc: "Self-adhesive LVT resilient flooring, peel and stick for fast installation, wear-resistant, anti-slip and easy to clean.",
    longDesc:
      "771518 is a gift to fast-install fans —— a built-in adhesive layer on the back means you simply peel off the film, stick it down and roll out the air; one person can renovate a whole room in an afternoon, no professional installer needed. Ultra-thin and lightweight, it's easy to cut and works around pipes and wall corners with ease. The wear-resistant, anti-slip surface makes it just as suited to home updates as to quick makeovers of offices and shops.",
    image: "/img/products/lumina/page-8.png",
    features: ["Self-adhesive backing, peel and stick", "No professional tools required, DIY-friendly", "Ultra-thin and lightweight, easy to cut", "Wear-resistant, anti-slip, easy to clean"],
    applications: ["Fast rental renovations", "Partial office remodels", "Quick shop fit-outs", "DIY home makeovers"],
    specs: [{ k: "Thickness", v: "2mm / 3mm (self-adhesive)" }, ...LVT_SPECS],
    sourceUrl: "",
  },
  {
    model: "771560",
    slug: "lumina-lvt-771560",
    name: "Lumina LVT Click-Lock Resilient Flooring 771560",
    nameOriginal: "LuminaFloor LVT 771560",
    series: "LVT Resilient Flooring",
    seriesOriginal: "lvt",
    desc: "Click-lock LVT resilient flooring (4mm / 5mm click-together), glue-free installation, removable and reusable, comfortable underfoot.",
    longDesc:
      "771560 combines the comfort underfoot of LVT with the convenience of click-lock —— a 4mm / 5mm click-together locking structure means glue-free installation that can be taken apart and reused, so you can even take it with you and re-lay it after a move. The multilayer resilient body balances quietness and durability, and the anti-slip surface suits homes with elderly residents and children, as well as commercial spaces that need flexible maintenance with single-plank replacement.",
    image: "/img/products/lumina/page-9.png",
    features: ["Click-lock, glue-free with no adhesive odor", "Removable and reusable, flexible to relocate", "Resilient and quiet, comfortable underfoot", "Single-plank replacement, easy maintenance"],
    applications: ["Homes with elderly residents and children", "Offices and meeting spaces", "Retail chains and showrooms", "Commercial floors needing flexible maintenance"],
    specs: [{ k: "Thickness", v: "4mm / 5mm (click-lock)" }, ...LVT_SPECS],
    sourceUrl: "",
  },
];
