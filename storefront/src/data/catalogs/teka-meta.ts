/**
 * Rich metadata for Teka kitchen appliance lines — for product detail pages.
 *
 * Keyed by seriesOriginal (category: "oven", "range-hood", "hob"...).
 *
 * Honest sourcing:
 *   - Company profile: Teka Group (Spain) — 3 brands, Teka (1924),
 *     Küppersbusch (1875), Intra (1871). Data published on teka.com.
 *   - Product specs: teka.com/zh-cn detail pages (real crawl).
 *   - Standards: CE/CB/GB + EU energy label (EEI) per product.
 */

export type SeriesMeta = {
  story: string;
  heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[];
  careGuide: { title: string; desc: string }[];
  installation: string[];
  certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[];
  faq: { q: string; a: string }[];
};

const COMMON_CERTS = [
  "CE — European certification",
  "CB Scheme — international electrical safety certification (IEC)",
  "EU energy label — graded A to G by EEI",
  "ISO 9001 — Quality management",
  "ISO 14001 — Environmental management",
  "RoHS — Free of hazardous heavy metals",
  "Red Dot & iF Design (premium Küppersbusch line)",
];

const COMMON_MFG = [
  "Teka Group — a European-origin kitchen & bathroom appliance group, owner of 3 brands: Teka (1924), Küppersbusch (1875, premium German), Intra (1871, Swedish stainless-steel sinks)",
  "15 factories worldwide — serving more than 120 countries",
  "~5,000 employees; about 50% of Spanish households use Teka products",
  "European R&D & design center — numerous Red Dot and iF Design awards (Küppersbusch)",
  "Manufacturing & testing to EU standards; per-batch electrical safety and energy efficiency testing",
];

const COMMON_PACKAGING = [
  { label: "Packaging", value: "Multi-layer carton + molded foam + protective corners" },
  { label: "Shipping warranty", value: "Compensation for transit damage" },
  { label: "Import MOQ", value: "1 20ft/40ft container — mixing multiple models is OK" },
  { label: "Documentation", value: "Manual + warranty card; import paperwork support" },
  { label: "Warehouse storage", value: "Dry place, out of sunlight; store upright, do not overload stacking" },
];

const COMMON_INSTALL = [
  "Installed by qualified technicians per the Teka manual",
  "Verify the cabinet cut-out matches the product's built-in dimensions",
  "Ensure the power supply / gas line / water supply-drainage meet standards before connecting",
  "For range hoods: install the exhaust duct at the correct diameter, minimizing sharp bends to preserve airflow",
  "Commission and test all functions before handover",
];

const COMMON_CARE = [
  { title: "Daily cleaning", desc: "Wipe surfaces with a soft damp cloth + a neutral solution. Do not use abrasive cleaners or hard objects that scratch glass/stainless steel." },
  { title: "Periodic cleaning", desc: "Periodically clean the grease filter (range hood), tray/cavity (oven), and filter (washer). The oven has a steam self-cleaning mode (AquaClean) or pyrolytic cleaning." },
  { title: "Technical maintenance", desc: "Periodically check the door gasket, burners, and gas/water lines; call a technician for anything unusual to maintain performance & safety." },
];

const COMMON_FAQ = [
  { q: "Are Teka products compatible with Vietnam's 220V power?", a: "Yes. The models crawled here list 220-240V / 50-60Hz, compatible with Vietnam's grid. Huayuesc advises on configurations for each project." },
  { q: "Do you support import paperwork & warranty?", a: "Yes. We provide CO/CQ and technical documents; we support import paperwork and the manufacturer's warranty policy." },
  { q: "What is the minimum order and delivery time?", a: "Calculated by container; multiple models can be mixed. Specific delivery schedules are quoted per order." },
];

function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: COMMON_MFG, careGuide: COMMON_CARE, installation: COMMON_INSTALL,
    certifications: COMMON_CERTS, packaging: COMMON_PACKAGING, faq: COMMON_FAQ };
}

const WHY_EU = { icon: "🇪🇺", title: "European design & standards", desc: "European brand origin (1924), EU safety & performance standards." };

export const TEKA_SERIES_META: Record<string, SeriesMeta> = {
  oven: mk({
    story: "Teka built-in ovens — from the versatile iOven/iOven P to HLB/HSB/HLC and SteakMaster — stand out with multi-directional hot-air cooking (MultiFunction), the AquaClean steam self-cleaning system, and a TFT touch control panel.",
    heritage: "Ovens have been a core Teka product since the 1920s, with continual upgrades to hot-air, combi-steam, and self-cleaning technology.",
    technicalSpecs: [
      { label: "Capacity", value: "63 – 71 L (60cm line)" },
      { label: "Built-in dimensions", value: "595 × 595 × ~560 mm" },
      { label: "Temperature", value: "30°C – 270°C" },
      { label: "Self-cleaning", value: "AquaClean (steam) / Pyrolytic" },
      { label: "Power", value: "220-240V / 50-60Hz" },
      { label: "Energy efficiency", value: "commonly A / A+" },
    ],
    whyChoose: [WHY_EU,
      { icon: "♨️", title: "Multi-directional hot air", desc: "Even heat distribution across multiple levels, baking several trays at once." },
      { icon: "💧", title: "AquaClean self-cleaning", desc: "Softens grime with steam for fast, chemical-free cleaning." }],
    projectShowcase: ["Premium apartment and villa kitchens", "Furniture showroom kitchen areas", "Turnkey kitchen handover projects"],
  }),
  "steam-oven": mk({
    story: "Teka steam & combi steam-bake ovens (HLC/HSC 847, HSB, and others) — steam cooking that retains full nutrition, combined with baking for a wide range of dishes.",
    heritage: "Teka developed its steam line to meet the trend toward healthy cooking, integrated within the same standard built-in dimensions.",
    technicalSpecs: [
      { label: "Type", value: "Steam oven / combi steam-bake oven" },
      { label: "Size", value: "45cm or 60cm built-in" },
      { label: "Power", value: "220-240V / 50-60Hz" },
      { label: "Controls", value: "TFT / LED touch" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🥗", title: "Retains nutrition", desc: "Steam cooking preserves vitamins & food moisture." },
      { icon: "🍞", title: "Steam + bake", desc: "One appliance for both steaming and convection baking." }],
    projectShowcase: ["Premium home kitchens", "Serviced apartments", "Kitchen appliance showrooms"],
  }),
  "microwave-oven": mk({
    story: "Teka built-in microwaves (MS/MC/HLC 847 C/HSC 644 C) — fast heating, some models combine grilling, flush-fitted to match the kitchen cabinetry.",
    heritage: "Teka offers built-in microwaves designed to match ovens in the same series.",
    technicalSpecs: [
      { label: "Type", value: "Built-in microwave / microwave-grill" },
      { label: "Installation", value: "Built-in" },
      { label: "Power", value: "220-240V / 50-60Hz" },
    ],
    whyChoose: [WHY_EU,
      { icon: "⚡", title: "Fast heating", desc: "Convenient for everyday quick reheating/cooking." },
      { icon: "🧩", title: "Matches the cabinetry", desc: "Flush-fitted, with glass fronts that match the oven." }],
    projectShowcase: ["Apartment kitchens", "Office/pantry kitchens", "Interior projects"],
  }),
  "range-hood": mk({
    story: "Teka range hoods — the side-draft line (CXW-220 DLV/iHood) and wall-mounted T-shape (DH/GFH) — strong suction, quiet operation, and removable stainless-steel grease filters.",
    heritage: "Range hoods are a longstanding Teka strength, with many shapes for every kitchen layout.",
    technicalSpecs: [
      { label: "Type", value: "Side-draft / wall-mounted T-shape" },
      { label: "Chinese standard code", value: "CXW-220 (kitchen smoke extraction type)" },
      { label: "Power", value: "220-240V / 50Hz" },
      { label: "Filter", value: "Removable, washable stainless-steel grease filter" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🌪️", title: "Strong suction", desc: "Effectively clears oily smoke from greasy Asian cooking." },
      { icon: "🔇", title: "Quiet operation", desc: "Noise-optimized motor with multiple speed levels." }],
    projectShowcase: ["Apartment & townhouse kitchens", "Small restaurants", "Kitchen showrooms"],
  }),
  hob: mk({
    story: "Teka hobs — gas hobs (IG/GFH/JZT) and built-in induction/electric hobs — toughened glass, high-efficiency burners, and gas safety cut-off.",
    heritage: "Teka offers a wide range of built-in hobs for the gas and electric/induction markets.",
    technicalSpecs: [
      { label: "Type", value: "Gas hob / induction hob / built-in electric hob" },
      { label: "Cooktop", value: "Ceramic glass / stainless steel" },
      { label: "Safety", value: "Flame-failure gas cut-off sensor (gas line)" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🔥", title: "High-efficiency burners", desc: "Strong, evenly distributed heat that saves gas." },
      { icon: "🛡️", title: "Safety", desc: "Automatic gas cut-off, heat-resistant glass surface." }],
    projectShowcase: ["Home kitchens", "Apartments", "Kitchen handover projects"],
  }),
  "coffee-machine": mk({
    story: "Teka built-in coffee machine (CLC 855 GM) — integrated bean grinder, automatic espresso/cappuccino, flush-fitted to match the kitchen cabinetry.",
    heritage: "Teka expanded into premium integrated beverage appliances for the modern kitchen.",
    technicalSpecs: [
      { label: "Type", value: "Built-in coffee machine with integrated grinder" },
      { label: "Installation", value: "Built-in" },
      { label: "Power", value: "220-240V / 50-60Hz" },
    ],
    whyChoose: [WHY_EU,
      { icon: "☕", title: "Automatic grind & brew", desc: "From bean to espresso/cappuccino at one touch." },
      { icon: "🧩", title: "Elegant built-in fit", desc: "Design matches ovens and microwaves in the same series." }],
    projectShowcase: ["Penthouse kitchens", "Hotels/serviced apartments", "Premium showrooms"],
  }),
  refrigerator: mk({
    story: "Teka refrigerators — including the hand-crafted multi-door stainless-steel line (RMF) and built-in/freestanding units (RFD/RFC) in a European style.",
    heritage: "Teka offers integrated cold-storage solutions for premium kitchens.",
    technicalSpecs: [
      { label: "Type", value: "Freestanding / built-in / multi-door stainless-steel refrigerator" },
      { label: "Power", value: "220-240V / 50Hz" },
      { label: "Energy efficiency", value: "per the EU energy label" },
    ],
    whyChoose: [WHY_EU,
      { icon: "❄️", title: "Optimal preservation", desc: "Temperature zoning keeps food fresh longer." },
      { icon: "✨", title: "Premium stainless steel", desc: "The hand-crafted RMF stainless-steel line is elegant and durable." }],
    projectShowcase: ["Villa kitchens", "Premium apartments", "Furniture showrooms"],
  }),
  washer: mk({
    story: "Teka washing machines (WML/WDL) — front-loading, energy-saving inverter, with many wash programs for the household.",
    heritage: "Teka offers laundry appliances for modern living spaces.",
    technicalSpecs: [
      { label: "Type", value: "Front-loading washer / washer-dryer" },
      { label: "Power", value: "220-240V / 50Hz" },
      { label: "Energy efficiency", value: "per the EU energy label" },
    ],
    whyChoose: [WHY_EU,
      { icon: "💧", title: "Efficient, clean washing", desc: "Quiet inverter that saves electricity and water." },
      { icon: "🌀", title: "Many programs", desc: "Multiple modes for each fabric type." }],
    projectShowcase: ["Apartments", "Townhouses", "Serviced apartments"],
  }),
  dryer: mk({
    story: "Teka heat-pump dryers (SHL) — gentle drying, energy-saving, fabric-protecting.",
    heritage: "Teka added a high-efficiency heat-pump dryer line to its laundry system.",
    technicalSpecs: [
      { label: "Type", value: "Heat-pump dryer" },
      { label: "Power", value: "220-240V / 50Hz" },
      { label: "Energy efficiency", value: "high (heat pump)" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🌡️", title: "Heat-pump drying", desc: "Low heat protects fabrics and saves energy." },
      { icon: "👕", title: "Protects fibers", desc: "Even drying, reducing wrinkling and shrinkage." }],
    projectShowcase: ["Premium apartments", "Townhouses", "Apartment-building laundry rooms"],
  }),
  sink: mk({
    story: "Teka/Intra sinks — the Square/ForSquare/Stone lines — stainless steel and granite, a modern square design, some with an automatic drain valve.",
    heritage: "Intra (1871, Sweden) is the longstanding stainless-steel sink brand in the Teka Group.",
    technicalSpecs: [
      { label: "Material", value: "Stainless steel / granite (Tegranite)" },
      { label: "Type", value: "Undermount / drop-in, 1-2 bowls" },
      { label: "Line", value: "Square, ForSquare, Stone" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🪣", title: "Durable & easy to clean", desc: "Stainless steel/granite resists grime and scratches well." },
      { icon: "📐", title: "Square design", desc: "A modern small-radius corner that maximizes bowl area." }],
    projectShowcase: ["Home kitchens", "Kitchen showrooms", "Interior projects"],
  }),
  vacuum: mk({
    story: "Teka food vacuum sealer (VS 152) — vacuum packaging that extends storage, fitted as a built-in drawer.",
    heritage: "Teka added professional preservation appliances for premium kitchens.",
    technicalSpecs: [
      { label: "Type", value: "Built-in drawer vacuum sealer" },
      { label: "Power", value: "220-240V / 50-60Hz" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🧪", title: "Longer preservation", desc: "Vacuum sealing keeps food fresh longer." },
      { icon: "🍳", title: "Sous-vide ready", desc: "Supports low-temperature sous-vide cooking." }],
    projectShowcase: ["Penthouse kitchens", "Premium restaurants", "Showrooms"],
  }),
  "warming-drawer": mk({
    story: "Teka warming drawer (CP 15 GS) — push-pull style, keeps plates/food warm, fitted as a built-in to match the cabinetry.",
    heritage: "A finishing accessory for Teka's premium built-in kitchen system.",
    technicalSpecs: [
      { label: "Type", value: "Push-pull warming drawer" },
      { label: "Installation", value: "Built-in" },
      { label: "Power", value: "220-240V / 50-60Hz" },
    ],
    whyChoose: [WHY_EU,
      { icon: "🍽️", title: "Keeps food warm", desc: "Warms plates and keeps food hot before serving." },
      { icon: "🧩", title: "Matches the cabinetry", desc: "Flush-fitted with ovens and appliances in the same series." }],
    projectShowcase: ["Premium kitchens", "Hotels", "Showrooms"],
  }),
};

/** Helper: get the meta by Teka's seriesOriginal (category). */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  const key = seriesOriginal.trim();
  return TEKA_SERIES_META[key] || TEKA_SERIES_META[key.split(/[·\/\s]/)[0].trim()];
}
