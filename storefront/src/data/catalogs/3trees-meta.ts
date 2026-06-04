/**
 * Metadata for 3TREES 三棵树 (SKSHU) paints — detail page. Keyed by seriesOriginal (catKey).
 * Sourcing: 3treesgroup.com — SKSHU Paint (三棵树涂料, Shanghai-listed 603737).
 */
export type SeriesMeta = {
  story: string; heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[]; careGuide: { title: string; desc: string }[];
  installation: string[]; certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[]; faq: { q: string; a: string }[];
};
const CERTS = ["China national standard (GB) for paints and waterproofing", "Green environmental label (Ten Ring)", "Low VOC content / odor-neutralizing", "ISO 9001 / ISO 14001"];
const MFG = [
  "3TREES 三棵树 (SKSHU Paint) — one of China's largest paint makers, Shanghai-listed under code 603737, founded 2002 in Fujian",
  "Product range: interior/exterior paints, real-stone paints, artistic paints, waterproofing, adhesives, tile grout, putties",
  "A green-paint focus — odor-neutralizing, low-VOC; many antibacterial/anti-mold/formaldehyde-absorbing lines",
  "An R&D and quality-inspection system to national standards",
];
const PACK = [
  { label: "Pack size", value: "Pails/buckets by line (e.g. 18L, 5L); adhesives by tube/pail" },
  { label: "MOQ", value: "By container/pallet; mixed SKUs OK" },
  { label: "Storage", value: "Cool, dry place, away from sunlight and freezing; reseal after use" },
];
const INSTALL = [
  "Prepare a clean, dry, even surface; apply putty and primer before the topcoat",
  "Apply at the correct spread rate and coat count, allowing enough drying time between coats",
  "Thin to the recommended ratio; stir thoroughly before use",
  "Waterproofing: apply in several coats and run a water test before covering",
];
const CARE = [
  { title: "Storage", desc: "Reseal tightly and store in a cool, dry place away from sunlight and freezing; use up within shelf life." },
  { title: "Application", desc: "Observe the temperature/humidity conditions; do not apply in rain or high humidity." },
  { title: "Cleaning", desc: "Clean tools with water (water-based paint) immediately after use." },
];
const FAQ = [
  { q: "Does 3TREES paint carry an environmental label?", a: "Yes. Many lines hold green, odor-neutralizing, low-VOC labels; technical documentation is provided per product." },
  { q: "Can you advise on the right paint/waterproofing system for our application?", a: "Yes. Send your application (interior/exterior, roof, bathroom, etc.) and we will recommend the right line." },
  { q: "MOQ and lead time?", a: "Calculated by container/pallet; delivery schedule quoted per order." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🌳", title: "China's leading green paint", desc: "3TREES — a major paint brand focused on healthy, environmentally friendly products." };
const SHOW = ["Homes, apartments, villas", "Commercial and public buildings", "Handover and renovation projects"];
const INTERIOR = mk({
  story: "3TREES interior paint — odor-neutralizing low-VOC latex (water-based) paint with many antibacterial/anti-mold/formaldehyde-absorbing lines, good coverage and durable color.",
  heritage: "Interior paint is 3TREES' core line, built around a healthy-paint focus.",
  technicalSpecs: [{ label: "Type", value: "Water-based interior paint (latex)" }, { label: "Properties", value: "Odor-neutralizing, low-VOC, antibacterial/anti-mold (line-dependent)" }, { label: "Application", value: "Interior walls and ceilings" }],
  whyChoose: [WHY, { icon: "🌬️", title: "Odor-neutralizing & safe", desc: "Low VOC, some lines absorb formaldehyde, safe for indoor use." }, { icon: "🎨", title: "Durable color, good coverage", desc: "High coverage, beautiful durable color, easy to clean." }],
  projectShowcase: SHOW,
});
export const TREES_SERIES_META: Record<string, SeriesMeta> = {
  interior: INTERIOR,
  exterior: mk({
    story: "3TREES exterior paint — weather-resistant, dirt-resistant, color-fast under sun and rain, protecting building facades.",
    heritage: "The exterior line protects and beautifies building facades.",
    technicalSpecs: [{ label: "Type", value: "Water-based exterior paint" }, { label: "Properties", value: "Weather-resistant, dirt-resistant, color-fast" }, { label: "Application", value: "Exterior walls, facades" }],
    whyChoose: [WHY, { icon: "☀️", title: "Weather-durable", desc: "Withstands sun and rain, minimal fading, resists moss and mold." }, { icon: "🧱", title: "Wall protection", desc: "Protects facades and extends the building's lifespan." }],
    projectShowcase: SHOW,
  }),
  "faux-stone": mk({
    story: "3TREES faux-stone paint (Tiancai Stone) — recreates the look of natural stone for facades, with diverse grains and colors, a cost-saving alternative to stone cladding.",
    heritage: "Faux-stone paint brings the beauty of natural stone at a reasonable cost.",
    technicalSpecs: [{ label: "Type", value: "Faux-stone paint" }, { label: "Effect", value: "Diverse natural stone grains" }, { label: "Application", value: "Facades, decorative cladding" }],
    whyChoose: [WHY, { icon: "🪨", title: "Looks like real stone", desc: "Luxurious natural-stone effect for facades." }, { icon: "💰", title: "Cost-saving", desc: "A lightweight, reasonably priced alternative to stone cladding." }],
    projectShowcase: SHOW,
  }),
  artistic: mk({
    story: "3TREES artistic paint — premium decorative surface effects (texture, grain, metallic) for striking interior/exterior spaces.",
    heritage: "Artistic paint creates a premium aesthetic highlight.",
    technicalSpecs: [{ label: "Type", value: "Decorative artistic paint" }, { label: "Effect", value: "Texture, grain, metallic (line-dependent)" }, { label: "Application", value: "Interior/exterior accents" }],
    whyChoose: [WHY, { icon: "✨", title: "High aesthetics", desc: "Unique, luxurious surface effects." }, { icon: "🖌️", title: "Multi-effect", desc: "Many grain styles and colors for a custom design." }],
    projectShowcase: SHOW,
  }),
  waterproof: mk({
    story: "3TREES waterproofing — waterproof paints and membranes (JS polymer-cement, self-adhesive membrane, flexible coating) for roofs, walls, bathrooms and basements.",
    heritage: "The waterproofing line protects the building from leaks and seepage.",
    technicalSpecs: [{ label: "Type", value: "Waterproof paint/membrane (JS, self-adhesive, elastomeric)" }, { label: "Properties", value: "Elastic, good adhesion, water-durable" }, { label: "Application", value: "Roofs, walls, bathrooms, basements" }],
    whyChoose: [WHY, { icon: "💧", title: "Durable waterproofing", desc: "Watertight coating that flexes with the structure." }, { icon: "🏠", title: "Multi-application", desc: "For roofs, walls, wet areas and basements." }],
    projectShowcase: SHOW,
  }),
  joint: mk({
    story: "3TREES tile grout / joint beautifier (Meifeng grout) — fills tile joints beautifully, waterproof, stain-resistant, in many colors including metallic.",
    heritage: "Tile grout finishes and protects the joints of tile cladding.",
    technicalSpecs: [{ label: "Type", value: "Tile grout / joint beautifier (epoxy/PU)" }, { label: "Properties", value: "Waterproof, stain-resistant, many colors" }, { label: "Application", value: "Tile and floor joints" }],
    whyChoose: [WHY, { icon: "✨", title: "Beautiful, clean joints", desc: "Fills joints beautifully, resisting stains and mold." }, { icon: "🌈", title: "Many colors", desc: "Many colors including metallic, suited to any tile." }],
    projectShowcase: SHOW,
  }),
  adhesive: mk({
    story: "3TREES adhesives (no-nail adhesive, etc.) — versatile no-nail adhesives with strong bonding for fast, tidy interior installation.",
    heritage: "Adhesives support convenient finishing work.",
    technicalSpecs: [{ label: "Type", value: "Versatile / no-nail adhesive" }, { label: "Properties", value: "Strong bonding, multi-material" }, { label: "Application", value: "Bonding cornices, skirting, decorative items" }],
    whyChoose: [WHY, { icon: "🔩", title: "No nails needed", desc: "Bonds firmly without drilling, fast and tidy." }],
    projectShowcase: SHOW,
  }),
  primer: mk({
    story: "3TREES primer — builds an adhesive base layer, alkali-resistant, blocks reverse seepage, and boosts the durability of the topcoat.",
    heritage: "The primer is the key base layer for a durable, beautiful paint system.",
    technicalSpecs: [{ label: "Type", value: "Interior/exterior primer" }, { label: "Function", value: "Alkali-resistant, improves adhesion, blocks reverse seepage" }, { label: "Application", value: "Base layer before topcoat" }],
    whyChoose: [WHY, { icon: "🛡️", title: "Durable base", desc: "Alkali-resistant, boosts adhesion and topcoat lifespan." }],
    projectShowcase: SHOW,
  }),
  floor: mk({
    story: "3TREES floor paint — ultra-durable epoxy/PU paint for industrial floors, workshops and garages: abrasion-resistant and easy to clean.",
    heritage: "Floor paint for industrial and commercial projects.",
    technicalSpecs: [{ label: "Type", value: "Epoxy / PU floor paint" }, { label: "Properties", value: "Ultra-durable, abrasion-resistant, easy to clean" }, { label: "Application", value: "Workshops, garages, warehouses, industrial floors" }],
    whyChoose: [WHY, { icon: "🏭", title: "Ultra-durable", desc: "Abrasion- and load-resistant for industrial floors." }],
    projectShowcase: SHOW,
  }),
  putty: mk({
    story: "3TREES putty & mortar — wall skim putty for leveling and dedicated mortars to prepare the base for the finishing topcoat.",
    heritage: "Putty and mortar form the finishing base for the paint system.",
    technicalSpecs: [{ label: "Type", value: "Wall putty / mortar" }, { label: "Function", value: "Leveling, base adhesion" }, { label: "Application", value: "Surface preparation before painting" }],
    whyChoose: [WHY, { icon: "🧱", title: "Smooth, even base", desc: "Creates a smooth, even surface for a beautiful coat of paint." }],
    projectShowcase: SHOW,
  }),
  tool: mk({
    story: "3TREES application tools — rollers and primer/topcoat tools that support efficient application.",
    heritage: "Matched tools for the paint application system.",
    technicalSpecs: [{ label: "Type", value: "Application tools (rollers, etc.)" }, { label: "Function", value: "Efficient, even paint application" }],
    whyChoose: [WHY, { icon: "🧰", title: "Efficient application", desc: "Matched tools help apply paint evenly and fast." }],
    projectShowcase: SHOW,
  }),
  insulation: mk({
    story: "3TREES insulation materials — mineral wool boards and EIFS insulation materials for walls, for paint-plus-insulation systems.",
    heritage: "External-system materials for an insulation-plus-paint solution.",
    technicalSpecs: [{ label: "Type", value: "Insulation material (mineral wool)" }, { label: "Function", value: "Thermal insulation, fire resistance" }, { label: "Application", value: "External wall insulation systems" }],
    whyChoose: [WHY, { icon: "🔥", title: "Insulating & fire-resistant", desc: "Mineral wool that insulates and resists fire for walls." }],
    projectShowcase: SHOW,
  }),
  other: INTERIOR,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TREES_SERIES_META[seriesOriginal.trim()] || TREES_SERIES_META.interior;
}
