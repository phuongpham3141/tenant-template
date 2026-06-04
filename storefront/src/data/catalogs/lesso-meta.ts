/**
 * Rich metadata for Lesso 联塑 pipe lines — for product detail pages.
 *
 * Keyed by seriesOriginal (original Chinese tag: "给水", "排水", "电力通信"...).
 *
 * Honest sourcing:
 *   - Company profile: China Liansu Group Holdings (中国联塑集团控股)
 *     — listed on the HKEX under code 2128, per published annual reports.
 *   - Technical standards: China's national GB/T + applicable ISO standards for
 *     each pipe type (PVC-U / PE / PP-R / PE-RT).
 *   - Product specs: the official lessopipe.com product pages.
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
  "ISO 9001 — Quality management system",
  "ISO 14001 — Environmental management system",
  "ISO 45001 — Occupational health & safety",
  "CCC — China Compulsory Certification",
  "中国名牌产品 — China Famous-Brand Product",
  "国家免检产品 — National Inspection-Exempt Product",
  "GB/T compliance — China's national standards for each pipe type",
];

const COMMON_MFG = [
  "China Liansu Group (中国联塑) — Asia's largest plastic pipe manufacturer, listed on the HKEX under code 2128 since 2010",
  "Founded in 1986 in Foshan, Guangdong — more than 30 production facilities across China + overseas",
  "Plastic pipe capacity > 3 million tons/year — the world's largest scale for plastic pipe",
  "An integrated building-materials ecosystem: pipes & fittings, valves, finishing materials, sanitary ware",
  "Automated extrusion lines with online inspection of diameter, wall thickness, and pressure on every meter of pipe",
  "A national-level materials laboratory — hydrostatic pressure, impact, and thermal-aging testing",
];

const COMMON_PACKAGING = [
  { label: "Bundling/packaging", value: "Pipe bundles wrapped in PE film + plastic straps; fittings packed in cartons" },
  { label: "Standard length", value: "Rigid pipe is typically 4m or 6m; PE coil pipe by the coil" },
  { label: "Identification printing", value: "Printed directly on the pipe body: brand, specification, standard, pressure" },
  { label: "Import MOQ", value: "1 20ft / 40ft HQ container — mixing multiple specifications is OK" },
  { label: "Warehouse storage", value: "Dry place, out of direct sunlight; lay flat, do not stack too high" },
];

const COMMON_INSTALL = [
  "Carefully read the installation standard for the corresponding pipe type before installing",
  "Cut pipe square, chamfer the edge, and remove burrs before joining",
  "Choose the correct joining method by material: heat fusion (PP-R/PE-RT), butt/electrofusion welding (PE), solvent gluing (PVC-U), press-fit (stainless steel)",
  "Pressure-test the entire line after installation before commissioning & backfilling",
  "For buried pipe: create a sand bedding, then backfill & compact per procedure to avoid deformation",
];

const COMMON_CARE = [
  {
    title: "Before installation",
    desc: "Check that the pipe body is not cracked or dented and that connectors and rubber gaskets are intact. Let the pipe acclimate to the installation environment's temperature.",
  },
  {
    title: "During operation",
    desc: "Operate within the rated pressure & permitted temperature of each pipe line. Avoid strong mechanical impact on exposed pipe runs.",
  },
  {
    title: "Periodic maintenance",
    desc: "Check for leaks at joints and valves; clean the strainer at the line head. For hot-water systems, check thermal expansion & supports.",
  },
];

const COMMON_FAQ = [
  {
    q: "Do Lesso products have the standards paperwork to import into Vietnam?",
    a: "Yes. Lesso provides a CO (certificate of origin), a CQ (certificate of quality), and test reports per the corresponding GB/T standards. Huayuesc supports import paperwork & conformity certification in Vietnam.",
  },
  {
    q: "What is the minimum order (MOQ) and the delivery time?",
    a: "MOQ is usually calculated by container; multiple specifications can be mixed in one container. Production + shipping time to Vietnam depends on the type; Huayuesc quotes a specific schedule per order.",
  },
  {
    q: "Do you advise on choosing the right pressure rating / material?",
    a: "Yes. Send your operating conditions (medium, temperature, pressure, buried or exposed), and our engineering team will recommend the right pipe line & fittings.",
  },
];

function mk(
  partial: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">
): SeriesMeta {
  return {
    ...partial,
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    faq: COMMON_FAQ,
  };
}

export const LESSO_SERIES_META: Record<string, SeriesMeta> = {
  // 给水 — Water Supply
  给水: mk({
    story:
      "Lesso's water supply pipe range includes PVC-U, PE, and PP-R — serving everything from municipal and building water mains to indoor hot-and-cold water systems. This is the core product group behind Lesso's position as Asia's largest plastic pipe manufacturer.",
    heritage:
      "Lesso has developed water supply pipe since 1986, continually expanding its material range PVC-U → PE100 → PP-R to cover the full spectrum of residential, municipal, and industrial water supply needs.",
    technicalSpecs: [
      { label: "Material", value: "PVC-U / PE80 / PE100 / PP-R" },
      { label: "Pressure rating", value: "0.63 – 2.5 MPa depending on the line" },
      { label: "Connection", value: "Solvent gluing (PVC-U), heat fusion (PP-R), butt/electrofusion welding (PE)" },
      { label: "Hot-water temperature (PP-R)", value: "up to 70°C long-term, 95°C short-term" },
      { label: "Standard", value: "GB/T 10002 (PVC-U), GB/T 13663 (PE), GB/T 18742 (PP-R)" },
    ],
    whyChoose: [
      { icon: "💧", title: "Safe, clean water", desc: "Materials meet drinking-water contact requirements, with no heavy-metal leaching." },
      { icon: "🔧", title: "Matched pipe + fittings", desc: "Pipes and fittings from the same system, with tight tolerances and sealed, durable joints." },
      { icon: "🏭", title: "#1 scale in Asia", desc: "Large, stable supply capacity for high-volume projects." },
    ],
    projectShowcase: [
      "Water supply for urban districts & high-rise apartments",
      "PP-R hot-and-cold water systems in homes and hotels",
      "Buried water supply lines for industrial parks",
    ],
  }),

  // 排水 — Drainage
  排水: mk({
    story:
      "Lesso's drainage group spans indoor PVC-U drainage pipe, HDPE/PVC-U double-wall corrugated pipe, profiled-wall wound pipe (Krah pipe), siphonic roof drainage systems, and plastic inspection chambers — covering building, municipal, and underground-infrastructure drainage.",
    heritage:
      "Corrugated pipe and profiled-wall wound pipe are Lesso's infrastructure strengths, widely used in large-scale drainage & municipal projects in China.",
    technicalSpecs: [
      { label: "Material", value: "PVC-U / HDPE" },
      { label: "Ring stiffness (SN)", value: "SN4 / SN8 depending on the corrugated line" },
      { label: "Construction", value: "Solid wall / double-wall corrugated / hollow wound wall" },
      { label: "Medium temperature", value: "≤ 40°C (standard drainage)" },
      { label: "Standard", value: "GB/T 5836 (PVC-U), GB/T 19472 (HDPE corrugated)" },
    ],
    whyChoose: [
      { icon: "🌀", title: "High ring-stiffness corrugation", desc: "Handles soil loads well, lightweight, fast to install for buried runs." },
      { icon: "🏗️", title: "For large-scale infrastructure", desc: "Krah & wound-wall pipe for large-diameter sewers and municipal lines." },
      { icon: "🏠", title: "Matched indoor systems", desc: "Same-floor drainage & siphonic roof systems for modern buildings." },
    ],
    projectShowcase: [
      "Stormwater & wastewater drainage for residential areas and municipalities",
      "Siphonic roof drainage for exhibition centers and stations",
      "Large-diameter infrastructure sewer lines (Krah pipe)",
    ],
  }),

  // 电力通信 — Power & Telecom Conduit
  电力通信: mk({
    story:
      "Lesso's cable conduit range includes power-cable protection pipe, telecom pipe (solid-wall, multi-bore, honeycomb, grid-cell), and MPP pipe for trenchless installation — protecting underground cable runs in urban infrastructure.",
    heritage:
      "Lesso provides integrated cable-conduit solutions for underground power and telecom networks, tied to China's wave of urban-infrastructure undergrounding.",
    technicalSpecs: [
      { label: "Material", value: "PE / PVC / PVC-C / MPP (modified PP)" },
      { label: "Construction", value: "Solid wall / multi-bore / honeycomb / grid-cell" },
      { label: "Installation", value: "Open-cut & trenchless (high-tensile MPP)" },
      { label: "Characteristics", value: "Insulating, flame-retardant (specialized lines)" },
      { label: "Standard", value: "China national GB/T for cable protection pipe" },
    ],
    whyChoose: [
      { icon: "⚡", title: "Long-lasting cable protection", desc: "Insulating and corrosion-resistant, protecting cable in underground environments." },
      { icon: "🛠️", title: "Trenchless (MPP)", desc: "High-tensile MPP pipe for directional drilling, reducing road excavation." },
      { icon: "🧩", title: "Multiple structures", desc: "Honeycomb / multi-bore / grid-cell optimizes the number of cable runs per cross-section." },
    ],
    projectShowcase: [
      "Undergrounding of urban power & telecom cables",
      "Utility trenches, tunnels, metro lines",
      "Trenchless directional-drilling road crossings (MPP)",
    ],
  }),

  // 采暖 — Heating
  采暖: mk({
    story:
      "Lesso's heating range includes PE-RT underfloor heating pipe, oxygen-barrier pipe, secondary-network district heating pipe, and fittings (manifolds, filter valves) — for residential underfloor heating and district heating.",
    heritage:
      "PE-RT is the core material for underfloor heating thanks to its flexibility, heat resistance, and bendability — Lesso has developed several premium consumer series for the heating market.",
    technicalSpecs: [
      { label: "Material", value: "PE-RT (Type I/II), with an oxygen-barrier layer (EVOH)" },
      { label: "Working temperature", value: "up to 70°C long-term" },
      { label: "Application", value: "Underfloor heating, wall heating, secondary district heating" },
      { label: "Connection", value: "Heat fusion / press-fit via fittings" },
      { label: "Standard", value: "GB/T 28799 (PE-RT heating)" },
    ],
    whyChoose: [
      { icon: "🔥", title: "Smooth, flexible underfloor heating", desc: "PE-RT bends well with a small bend radius, easy to lay out heating loops." },
      { icon: "🛡️", title: "Oxygen barrier", desc: "The EVOH layer blocks oxygen, protecting metal equipment in the heating system." },
      { icon: "🧰", title: "Matched fittings", desc: "Manifolds and filter valves from the same system for a turnkey installation." },
    ],
    projectShowcase: [
      "Underfloor heating for homes and villas",
      "Secondary district heating networks for residential areas",
      "Heating for public buildings in northern China",
    ],
  }),

  // 通风 — Ventilation
  通风: mk({
    story:
      "Lesso's ventilation group includes PE fresh-air supply pipe, PVC-U air ducts, aluminum-foil composite ducts, and various clamps/support fittings — for ventilation & fresh-air supply in residential buildings and livestock farming.",
    heritage:
      "In line with the trend toward indoor fresh-air supply in modern homes, Lesso added a range of air ducts and mounting fittings for ventilation systems.",
    technicalSpecs: [
      { label: "Material", value: "PE / PVC-U / aluminum-foil composite" },
      { label: "Application", value: "Residential fresh-air supply, building air ducts, livestock ventilation" },
      { label: "Fittings", value: "Quick-fit pipe clamps, rubber-lined stainless-steel clamps, swallowtail tees" },
      { label: "Characteristics", value: "Lightweight, smooth surface that reduces pressure loss" },
      { label: "Standard", value: "Per the corresponding plastic pipe standards" },
    ],
    whyChoose: [
      { icon: "🌬️", title: "Clean fresh-air supply", desc: "Smooth interior surface, little dust buildup, easy to clean air ducts." },
      { icon: "🔩", title: "Diverse mounting fittings", desc: "Quick-fit clamps & support fittings for neat, secure installation." },
      { icon: "🪶", title: "Lightweight", desc: "Fast to install, reducing hanging loads on ceilings & walls." },
    ],
    projectShowcase: [
      "Fresh-air supply systems for apartments and villas",
      "Air ducts for commercial buildings",
      "Ventilation for livestock farms",
    ],
  }),

  // 农业 — Agriculture & Aquaculture
  农业: mk({
    story:
      "Lesso's agriculture & aquaculture group includes PE water-conveyance pipe, low-pressure irrigation pipe, drip-irrigation tubing, reinforced flexible hose, growing troughs/pipes, and net-cage / cage-frame / floating-house solutions for marine aquaculture.",
    heritage:
      "Lesso expanded from irrigation pipe into high-tech agriculture solutions (substrate cultivation) and seafood farming (wave-resistant HDPE cages).",
    technicalSpecs: [
      { label: "Material", value: "PE / HDPE / PVC-U / reinforcing fiber" },
      { label: "Application", value: "Irrigation, water conveyance, substrate cultivation, aquaculture cages" },
      { label: "Product range", value: "Irrigation pipe, drip tubing, flexible hose, cage frames & cages" },
      { label: "Characteristics", value: "Weather-resistant, UV-resistant (outdoor lines)" },
      { label: "Standard", value: "GB/T for PE/PVC irrigation pipe" },
    ],
    whyChoose: [
      { icon: "🌾", title: "Water-saving irrigation", desc: "Drip & sprinkler irrigation reduces water use and improves cultivation efficiency." },
      { icon: "🐟", title: "Wave-resistant cages", desc: "HDPE frames & cages withstand the marine environment and resist UV." },
      { icon: "🌱", title: "High-tech cultivation", desc: "Growing troughs & substrate pipes for urban agriculture and greenhouses." },
    ],
    projectShowcase: [
      "Drip-irrigation systems for fields and orchards",
      "Marine farms — circular HDPE cages",
      "Greenhouse substrate-cultivation setups",
    ],
  }),

  // 工业 — Industrial
  工业: mk({
    story:
      "Lesso's specialized industrial group includes US-standard PVC SCH80 pipe, industrial PVC-U pipe, RTP/steel-fiber composite pipe for oil & gas and mining, and high-barrier hydrogen-conveyance hose — for harsh high-pressure & corrosive environments.",
    heritage:
      "Lesso serves heavy industries (chemicals, mining, oil & gas) with specialized pressure- and corrosion-resistant pipe lines, including hydrogen-conveyance solutions for new energy.",
    technicalSpecs: [
      { label: "Material", value: "PVC SCH80 / PVC-U / RTP composite (fiberglass) / steel-fiber reinforced" },
      { label: "Application", value: "Oil & gas, chemicals, mining, hydrogen conveyance" },
      { label: "Characteristics", value: "High pressure resistance, chemical corrosion resistance" },
      { label: "Hydrogen conveyance", value: "High-barrier hose for hydrogen systems (≤10 MPa, -20~65°C)" },
      { label: "Standard", value: "ASTM (SCH80) + industrial GB/T" },
    ],
    whyChoose: [
      { icon: "🛢️", title: "Pressure & corrosion resistant", desc: "For harsh chemical, oil & gas, and ore-slurry media." },
      { icon: "🧪", title: "International standards", desc: "US-standard PVC SCH80 for export-grade industrial systems." },
      { icon: "🔋", title: "New energy", desc: "Hydrogen-conveyance pipe solutions for clean-energy infrastructure." },
    ],
    projectShowcase: [
      "Chemical & industrial water-treatment lines",
      "Oil & gas field gathering pipelines (RTP)",
      "Hydrogen storage & transport systems",
    ],
  }),

  // 消防 — Fire Protection
  消防: mk({
    story:
      "Lesso's fire protection group includes PVC-C fire pipe, EP-coated steel-plastic composite pipe, reel-type fire hose, and specialized galvanized/fire-resistant cable conduit — for fire protection systems and fire-safe electrical runs.",
    heritage:
      "Lesso provides integrated fire protection solutions from fire-water supply pipe to fire-resistant cable conduit for commercial & public buildings.",
    technicalSpecs: [
      { label: "Material", value: "PVC-C / EP-coated steel-plastic composite / galvanized steel" },
      { label: "Application", value: "Fire-water supply, fire-resistant cable conduit" },
      { label: "Cable conduit grade", value: "Light / medium / heavy / extra-heavy (galvanized)" },
      { label: "Characteristics", value: "Heat-resistant, flame-retardant, insulating" },
      { label: "Standard", value: "GB/T for fire pipe & metal cable conduit" },
    ],
    whyChoose: [
      { icon: "🧯", title: "Fire safety", desc: "Flame-retardant materials for water-supply & electrical runs in fire systems." },
      { icon: "🔩", title: "Multiple strength grades", desc: "Galvanized cable conduit in several grades per project requirements." },
      { icon: "🏢", title: "For large buildings", desc: "Integrated for hotels, commercial complexes, and public facilities." },
    ],
    projectShowcase: [
      "Fire-water supply systems for high-rise buildings",
      "Fire-resistant electrical runs for shopping centers",
      "Galvanized cable conduit for public infrastructure",
    ],
  }),

  // 燃气 — Gas
  燃气: mk({
    story:
      "Lesso's gas range includes buried PE gas pipe and aluminum-plastic composite pipe for gas — for safe urban and residential gas distribution systems.",
    heritage:
      "PE gas pipe is the standard for underground gas distribution networks thanks to its tightness, flexibility, and long life; Lesso manufactures to specialized gas-pipe standards.",
    technicalSpecs: [
      { label: "Material", value: "PE (gas-grade) / aluminum-plastic composite" },
      { label: "Working temperature", value: "-20 ~ 40°C (PE gas pipe)" },
      { label: "Pressure", value: "long-term maximum ≤ 0.7 MPa (depending on the line)" },
      { label: "Identification color", value: "Yellow or black with a yellow stripe for gas lines" },
      { label: "Standard", value: "GB 15558 (PE gas pipe)" },
    ],
    whyChoose: [
      { icon: "🔥", title: "Gas safety", desc: "Sealed fusion joints with no leakage for gas distribution networks." },
      { icon: "♻️", title: "Long service life", desc: "Buried PE pipe with a 50-year design life, corrosion resistant." },
      { icon: "🚧", title: "Clear identification", desc: "Dedicated colors help identify gas lines for safe installation." },
    ],
    projectShowcase: [
      "Urban gas distribution networks",
      "Residential gas lines for housing areas",
      "Industrial gas supply",
    ],
  }),
};

/** Helper: get the meta by seriesOriginal (Lesso's original Chinese tag). */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  const key = seriesOriginal.split(/[·\/\s]/)[0].trim();
  return LESSO_SERIES_META[key];
}
