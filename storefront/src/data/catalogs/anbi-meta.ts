/**
 * ANBI 安彼卫浴 sanitary ware metadata — product detail pages.
 * Keyed by seriesOriginal (catKey: "smart-toilet","toilet","basin","faucet","cabinet"...).
 * Sourcing: anbichina.com — model + real dimensions; material descriptions per sanitary-ware industry standards.
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
const CERTS = ["Chinese national standards (GB) for sanitary ware & faucets", "ISO 9001 quality management", "Stain-resistant, easy-clean glaze", "Durability & water-tightness testing"];
const MFG = [
  "ANBI 安彼卫浴 — Chinese sanitary ware brand (sanitary ceramic, faucets, vanity cabinets, bathroom fixtures)",
  "Full bathroom product range: toilets (standard & smart), basins, urinals, cabinets, faucets, bathtubs",
  "High-temperature fired ceramic with stain-resistant glaze; brass/alloy chrome-plated faucets",
  "Batch quality control: water-tightness testing, flush testing, glaze/plating durability",
];
const PACK = [
  { label: "Packaging", value: "Carton box + molded foam to protect the ceramic glaze" },
  { label: "MOQ", value: "By container; mixed models welcome" },
  { label: "Included accessories", value: "Drain kit, gaskets, mounting bolts per product" },
  { label: "Storage", value: "Keep dry, avoid impact to glazed edges, store upright" },
];
const INSTALL = [
  "Check the drain center / rough-in distance matches the product before installation",
  "Use the proper gaskets/silicone sealant; tighten bolts evenly to avoid cracking the ceramic",
  "Connect water supply & drainage correctly; perform flush and water-tightness tests after installation",
  "Smart toilets: ensure correct power & water supply with proper grounding",
];
const CARE = [
  { title: "Cleaning", desc: "Wipe with a soft cloth + neutral cleaner. The stain-resistant glaze makes cleaning easy; avoid abrasive powders & strong acids." },
  { title: "Faucet maintenance", desc: "Periodically clean the aerator to prevent limescale buildup; check gaskets to prevent leaks." },
  { title: "Smart toilets", desc: "Clean the wash nozzle & filter screen per the manual; check the power supply for safety." },
];
const FAQ = [
  { q: "Do ANBI products include full installation accessories?", a: "Yes. Each product comes with the appropriate drain kit/gaskets/bolts; Huayuesc provides rough-in guidance." },
  { q: "What are the toilet rough-in dimensions?", a: "L×W×H dimensions are listed for each product; standard drain center — please confirm by model." },
  { q: "MOQ & lead time?", a: "Calculated by container; delivery schedule quoted per order." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const SHOW = ["Hotels & serviced apartments", "Residential homes, villas", "Commercial & public projects"];
const WHY = { icon: "🛁", title: "Complete bathroom range", desc: "Coordinated toilets, basins, faucets, cabinets — one supplier." };
const TOILET = mk({
  story: "ANBI toilets — high-temperature fired sanitary ceramic with stain-resistant glaze, modern one-piece/wall-hung styles, quiet water-saving flush.",
  heritage: "Toilets are ANBI's core line, with many styles & sizes for every space.",
  technicalSpecs: [{ label: "Material", value: "Premium sanitary ceramic, stain-resistant glaze" }, { label: "Style", value: "One-piece / wall-hung" }, { label: "Dimensions", value: "Listed per model (L×W×H)" }],
  whyChoose: [WHY, { icon: "💧", title: "Quiet, water-saving flush", desc: "Efficient flush technology, low noise, water saving." }, { icon: "✨", title: "Stain-resistant glaze", desc: "Smooth glazed surface, quick to clean, resists buildup." }],
  projectShowcase: SHOW,
});
const BASIN = mk({
  story: "ANBI basins — art ceramic & countertop/pedestal basins in diverse styles for bathroom washbasins and vanity counters.",
  heritage: "The art basin line adds an aesthetic accent to the bathroom.",
  technicalSpecs: [{ label: "Material", value: "Premium sanitary ceramic" }, { label: "Mounting", value: "Countertop / undermount / pedestal" }, { label: "Dimensions", value: "Listed per model" }],
  whyChoose: [WHY, { icon: "🎨", title: "Highly aesthetic", desc: "Diverse designs, beautiful glaze, easy to match interiors." }, { icon: "🧼", title: "Easy to clean", desc: "Stain-resistant glaze, quick to wipe down." }],
  projectShowcase: SHOW,
});
const FAUCET = mk({
  story: "ANBI faucets — brass/alloy chrome-plated faucets & shower sets, durable ceramic cartridge, stable flow.",
  heritage: "Faucets complete the ANBI bathroom range in a matching style.",
  technicalSpecs: [{ label: "Material", value: "Brass/alloy, chrome-plated" }, { label: "Valve core", value: "Ceramic cartridge" }, { label: "Finish", value: "Bright chrome, tarnish-resistant" }],
  whyChoose: [WHY, { icon: "🚿", title: "Smooth flow", desc: "Ceramic cartridge opens/closes smoothly, minimizes leaks." }, { icon: "🛡️", title: "Durable plating", desc: "Tarnish-resistant chrome, stays bright over time." }],
  projectShowcase: SHOW,
});
const CABINET = mk({
  story: "ANBI vanity cabinets — moisture-resistant cabinet body with basin & mirror, optimizing storage for modern bathrooms.",
  heritage: "All-in-one vanity cabinets keep the bathroom tidy & add functionality.",
  technicalSpecs: [{ label: "Cabinet body", value: "Moisture-resistant material" }, { label: "Includes", value: "Basin + (mirror) depending on model" }, { label: "Dimensions", value: "Listed per model" }],
  whyChoose: [WHY, { icon: "🪞", title: "Complete set", desc: "Coordinated cabinet + basin + mirror, quick to install." }, { icon: "💧", title: "Moisture-resistant", desc: "Material that withstands the bathroom's humid environment." }],
  projectShowcase: SHOW,
});
export const ANBI_SERIES_META: Record<string, SeriesMeta> = {
  "smart-toilet": mk({
    story: "ANBI smart toilets — integrated electronic bidet seat: warm-water wash, air drying, odor removal, soft-close lid; some with auto open/close & sensor flush.",
    heritage: "ANBI's most premium line for a modern hygiene experience.",
    technicalSpecs: [{ label: "Type", value: "Smart toilet (electronic bidet seat)" }, { label: "Features", value: "Warm wash, drying, odor removal, soft-close lid" }, { label: "Material", value: "Sanitary ceramic + electronic board" }],
    whyChoose: [WHY, { icon: "🚽", title: "Warm wash – air drying", desc: "Adjustable warm-water wash and air drying for thorough hygiene." }, { icon: "🔆", title: "Convenience", desc: "Odor removal, soft-close lid; some models with automatic sensors." }],
    projectShowcase: SHOW,
  }),
  "smart-seat": mk({
    story: "ANBI smart bidet seats — upgrade a standard toilet into a smart toilet: warm wash, drying, soft-close lid.",
    heritage: "A convenient upgrade solution without replacing the whole toilet.",
    technicalSpecs: [{ label: "Type", value: "Replacement electronic bidet seat" }, { label: "Features", value: "Warm wash, drying, odor removal" }, { label: "Compatibility", value: "Standard toilets" }],
    whyChoose: [WHY, { icon: "♻️", title: "Easy upgrade", desc: "Replaces the standard seat, turning an old toilet into a smart one." }, { icon: "🌡️", title: "Warm wash", desc: "Warm-water wash and convenient air drying." }],
    projectShowcase: SHOW,
  }),
  toilet: TOILET, "wall-toilet": TOILET, squat: TOILET,
  kids: mk({
    story: "ANBI kids sanitary fixtures — small-size toilets & basins, safe, ideal for nurseries & families with young children.",
    heritage: "A dedicated line for children's restroom spaces.",
    technicalSpecs: [{ label: "Target user", value: "Children (small size)" }, { label: "Material", value: "Premium sanitary ceramic" }, { label: "Dimensions", value: "Listed per model" }],
    whyChoose: [WHY, { icon: "🧒", title: "Kid-sized", desc: "Dimensions & height suited to young children, safe." }, { icon: "🏫", title: "For nurseries", desc: "Ideal for kindergartens, nurseries, and homes." }],
    projectShowcase: SHOW,
  }),
  "art-basin": BASIN, basin: BASIN,
  urinal: mk({
    story: "ANBI urinals — sanitary ceramic for public & commercial restrooms; some with automatic sensor flush.",
    heritage: "A men's restroom solution for public buildings.",
    technicalSpecs: [{ label: "Material", value: "Premium sanitary ceramic" }, { label: "Application", value: "Public/commercial restrooms" }, { label: "Dimensions", value: "Listed per model" }],
    whyChoose: [WHY, { icon: "🏢", title: "For projects", desc: "Durable, easy to clean for high-traffic restrooms." }, { icon: "💧", title: "Water saving", desc: "Efficient flush design; some with sensors." }],
    projectShowcase: SHOW,
  }),
  cabinet: CABINET, faucet: FAUCET, "shower-set": FAUCET, shower: FAUCET,
  "shower-room": mk({
    story: "ANBI shower enclosures — tempered glass panels + aluminum frame, neat water containment for modern bathrooms.",
    heritage: "A wet/dry zoning solution for the bathroom.",
    technicalSpecs: [{ label: "Material", value: "Tempered glass + aluminum frame" }, { label: "Style", value: "Shower screen / walk-in enclosure" }, { label: "Dimensions", value: "By model/custom order" }],
    whyChoose: [WHY, { icon: "🚪", title: "Stays dry", desc: "Wet/dry zoning keeps the bathroom clean and dry." }, { icon: "🛡️", title: "Safety glass", desc: "Durable tempered glass, safe if it breaks." }],
    projectShowcase: SHOW,
  }),
  bathtub: mk({
    story: "ANBI bathtubs — heat-retaining acrylic material, modern styling for premium bathrooms.",
    heritage: "Bathtubs complete the bathroom's relaxation space.",
    technicalSpecs: [{ label: "Material", value: "Heat-retaining acrylic" }, { label: "Style", value: "Freestanding / drop-in" }, { label: "Dimensions", value: "By model" }],
    whyChoose: [WHY, { icon: "🛀", title: "Heat retention", desc: "Acrylic keeps water warm longer, smooth surface." }, { icon: "🧽", title: "Easy to clean", desc: "Smooth, stain-resistant surface, quick to wipe." }],
    projectShowcase: SHOW,
  }),
  "mop-basin": BASIN, other: TOILET,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return ANBI_SERIES_META[seriesOriginal.trim()] || ANBI_SERIES_META.toilet;
}
