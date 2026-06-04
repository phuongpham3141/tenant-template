/**
 * Metadata Dulux Professional 多乐士专业 — detail page. Keyed by seriesOriginal (catKey).
 * Sourcing: duluxpro.com.cn — Dulux Professional (an AkzoNobel brand).
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
const CERTS = ["China national standard (GB) for paints", "Environmental label (Ten Ring) / Low VOC", "AkzoNobel global quality system", "ISO 9001 / ISO 14001"];
const MFG = [
  "Dulux Professional 多乐士专业 — the professional/project paint line from AkzoNobel (Dutch paint group)",
  "Product range: interior/exterior paints, real-stone paints, artistic texture paints, inorganic mineral paints, primers, putties",
  "AkzoNobel global paint technology; many odor-neutralizing, antibacterial and anti-mold lines",
  "Professional color systems and project solutions",
];
const PACK = [
  { label: "Pack size", value: "Pails/buckets by line (e.g. 18L, 5L); putty by bag" },
  { label: "MOQ", value: "By container/pallet; mixed SKUs OK" },
  { label: "Storage", value: "Cool, dry place, away from sunlight and freezing; reseal after use" },
];
const INSTALL = [
  "Prepare a clean, dry, even surface; apply putty and primer before the topcoat",
  "Apply at the correct spread rate and coat count, allowing enough drying time between coats",
  "Thin to the manufacturer's recommended ratio; stir thoroughly before use",
  "Exterior/real-stone systems: follow the correct primer – topcoat – protective coat process",
];
const CARE = [
  { title: "Storage", desc: "Reseal tightly and store in a cool, dry place away from sunlight and freezing; use within shelf life." },
  { title: "Application", desc: "Observe the recommended temperature/humidity conditions; do not apply in rain or high humidity." },
  { title: "Cleaning", desc: "Clean tools with water (water-based paint) immediately after use." },
];
const FAQ = [
  { q: "Does Dulux Pro carry an environmental label?", a: "Yes. Many lines hold green/low-VOC labels; technical documentation is provided per product." },
  { q: "Can you advise on the right paint system for our application?", a: "Yes. Send your application (interior/exterior, real stone, waterproofing, etc.) and we will recommend the right line." },
  { q: "MOQ and lead time?", a: "Calculated by container/pallet; delivery schedule quoted per order." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🎨", title: "AkzoNobel global", desc: "Dulux Pro — AkzoNobel's professional line, international quality." };
const SHOW = ["Residential, apartment and villa projects", "Commercial and public buildings", "Handover projects and premium facades"];
const INTERIOR = mk({
  story: "Dulux Professional interior paint — odor-neutralizing water-based paint with antibacterial/anti-mold/moisture-resistant lines, high coverage, durable color, easy to clean.",
  heritage: "Interior paint is the core line, built on AkzoNobel technology.",
  technicalSpecs: [{ label: "Type", value: "Water-based interior paint" }, { label: "Properties", value: "Odor-neutralizing, antibacterial/anti-mold (line-dependent), high coverage" }, { label: "Application", value: "Interior walls and ceilings" }],
  whyChoose: [WHY, { icon: "🌬️", title: "Odor-neutralizing & safe", desc: "Low VOC, some lines antibacterial, safe for indoor use." }, { icon: "🎨", title: "Durable color, good coverage", desc: "High coverage, beautiful durable color, easy to clean." }],
  projectShowcase: SHOW,
});
const EXTERIOR = mk({
  story: "Dulux Professional exterior paint — weather-resistant, dirt-resistant, color-fast under sun and rain; elastomeric lines bridge cracks on facades.",
  heritage: "The exterior line protects and beautifies building facades.",
  technicalSpecs: [{ label: "Type", value: "Water-based exterior paint (elastomeric lines available)" }, { label: "Properties", value: "Weather-resistant, dirt-resistant, color-fast, crack-bridging (elastomeric line)" }, { label: "Application", value: "Exterior walls, facades" }],
  whyChoose: [WHY, { icon: "☀️", title: "Weather-durable", desc: "Withstands sun and rain, minimal fading, resists moss and mold." }, { icon: "🧱", title: "Crack-bridging", desc: "Elastomeric line bridges fine cracks and protects the wall." }],
  projectShowcase: SHOW,
});
const PRIMER = mk({
  story: "Dulux Professional primer — alkali-resistant, improves adhesion, blocks reverse seepage and builds a durable base for the topcoat; dedicated real-stone/mineral primer lines available.",
  heritage: "The primer is the key base layer for a durable, beautiful paint system.",
  technicalSpecs: [{ label: "Type", value: "Interior/exterior primer" }, { label: "Function", value: "Alkali-resistant, improves adhesion, blocks reverse seepage" }, { label: "Application", value: "Base layer before topcoat" }],
  whyChoose: [WHY, { icon: "🛡️", title: "Durable base", desc: "Alkali-resistant, boosts adhesion and topcoat lifespan." }],
  projectShowcase: SHOW,
});
export const DULUX_PRO_SERIES_META: Record<string, SeriesMeta> = {
  interior: INTERIOR, exterior: EXTERIOR, primer: PRIMER,
  "real-stone": mk({
    story: "Dulux Professional real-stone paint (真石漆) — recreates the look of natural stone (granite, real stone) for premium facades, with a wide range of grains and colors.",
    heritage: "Real-stone paint brings the beauty of natural stone at a reasonable cost.",
    technicalSpecs: [{ label: "Type", value: "Real-stone paint" }, { label: "Effect", value: "Natural stone grain, granite" }, { label: "Application", value: "Facades, premium decorative cladding" }],
    whyChoose: [WHY, { icon: "🪨", title: "Looks like real stone", desc: "Luxurious natural-stone effect for facades." }, { icon: "☀️", title: "Outdoor-durable", desc: "Weather-resistant, keeps its beauty for years." }],
    projectShowcase: SHOW,
  }),
  texture: mk({
    story: "Dulux Professional artistic texture paint (质感/岩彩/浮雕) — decorative surface effects (texture, raised grain, relief) for striking spaces.",
    heritage: "Artistic paint creates a premium aesthetic highlight.",
    technicalSpecs: [{ label: "Type", value: "Artistic texture/relief paint" }, { label: "Effect", value: "Texture, raised grain, relief" }, { label: "Application", value: "Interior/exterior accents" }],
    whyChoose: [WHY, { icon: "✨", title: "High aesthetics", desc: "Unique, luxurious surface effects." }, { icon: "🖌️", title: "Multi-effect", desc: "Many grain styles and layers for a custom design." }],
    projectShowcase: SHOW,
  }),
  mineral: mk({
    story: "Dulux Professional inorganic mineral paint (无机矿物) — inorganic-mineral-based, environmentally friendly, breathable, color-fast, with good alkali resistance for interior/exterior.",
    heritage: "The inorganic mineral line offers a sustainable paint solution.",
    technicalSpecs: [{ label: "Type", value: "Inorganic mineral paint" }, { label: "Properties", value: "Breathable, color-fast, environmentally friendly" }, { label: "Application", value: "Interior/exterior, sustainable projects" }],
    whyChoose: [WHY, { icon: "🌱", title: "Sustainable", desc: "Inorganic-mineral-based, breathable, environmentally friendly." }, { icon: "🧱", title: "Color-fast", desc: "Resists alkali aging and holds color for years." }],
    projectShowcase: SHOW,
  }),
  metal: mk({
    story: "Dulux Professional metallic-effect paint — metallic-sheen coating for premium facades and decoration.",
    heritage: "Metallic paint delivers a special aesthetic effect.",
    technicalSpecs: [{ label: "Type", value: "Metallic-effect paint (water-based)" }, { label: "Effect", value: "Decorative metallic sheen" }, { label: "Application", value: "Facades, premium accents" }],
    whyChoose: [WHY, { icon: "🥇", title: "Luxe metallic sheen", desc: "Unique metallic effect for premium buildings." }],
    projectShowcase: SHOW,
  }),
  waterproof: mk({
    story: "Dulux Professional waterproofing — paints/solutions for walls, roofs and wet areas; protects the building from leaks and seepage.",
    heritage: "The waterproofing line protects the building.",
    technicalSpecs: [{ label: "Type", value: "Waterproofing paint/solution" }, { label: "Properties", value: "Elastic, good adhesion, water-durable" }, { label: "Application", value: "Walls, roofs, wet areas" }],
    whyChoose: [WHY, { icon: "💧", title: "Durable waterproofing", desc: "Watertight coating that protects the structure." }],
    projectShowcase: SHOW,
  }),
  other: INTERIOR,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DULUX_PRO_SERIES_META[seriesOriginal.trim()] || DULUX_PRO_SERIES_META.interior;
}
