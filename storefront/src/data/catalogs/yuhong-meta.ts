/**
 * Metadata for Yuhong 东方雨虹 waterproofing material lines — product detail page.
 * Keyed by seriesOriginal (key: "membrane-poly","membrane-bitumen","membrane-sa","pu","water","bitumen-coat","rigid").
 *
 * Honest sourcing: yuhong.com.cn — Beijing Oriental Yuhong (BOWS, SZSE 002271),
 * China's largest waterproofing manufacturer.
 */
export type SeriesMeta = {
  story: string; heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[];
  careGuide: { title: string; desc: string }[];
  installation: string[]; certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[]; faq: { q: string; a: string }[];
};
const CERTS = [
  "China national standard (GB) for waterproofing membranes and coatings",
  "ISO 9001 / ISO 14001 / ISO 45001",
  "Green product certification, low VOC content",
  "China Well-Known Trademark",
];
const MFG = [
  "Beijing Oriental Yuhong 东方雨虹 (SZSE 002271) — China's largest waterproofing manufacturer, founded 1995",
  "Dozens of production sites across China; a national-level R&D and testing lab system",
  "Automated lines for bitumen/polymer membranes and coatings; batch-by-batch quality control",
  "Supplier to mega infrastructure projects: high-speed rail, airports, metros, reservoirs",
];
const PACK = [
  { label: "Roll membrane", value: "1 m wide rolls, 10–20 m per roll; shrink-wrapped pallets" },
  { label: "Coating", value: "20 kg pails (or per manufacturer spec)" },
  { label: "MOQ", value: "By container; mixed SKUs OK" },
  { label: "Storage", value: "Cool, dry place out of sunlight; store membranes upright, keep coatings sealed" },
];
const INSTALL = [
  "Prepare a clean, dry, even surface free of dust and oil before application",
  "Torch-on/adhesive membranes: heat-weld or peel the self-adhesive layer per instructions; allow ample overlap",
  "Coatings: apply in several coats at the correct spread rate, with enough drying time between coats",
  "Run a water-immersion acceptance test before screeding the protective layer or tiling",
];
const CARE = [
  { title: "Storage", desc: "Keep in a dry place away from heat and open flame (bitumen membrane). Keep coatings sealed to prevent skinning." },
  { title: "Application", desc: "Observe the recommended spread rate and application temperature; do not apply in rain or high humidity." },
  { title: "Acceptance", desc: "Check overlaps, corner fillets and pipe collars; run a water test before covering." },
];
const FAQ = [
  { q: "Do Yuhong materials carry a GB standard for import?", a: "Yes. We provide the applicable standard (GB) plus test reports; Huayuesc supports import documentation." },
  { q: "Can you advise on the right waterproofing system for our application?", a: "Yes. Send your application (roof, basement, bathroom, water tank, etc.) and we will recommend the right membrane/coating." },
  { q: "MOQ and lead time?", a: "Calculated by container; delivery schedule quoted per order." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🏆", title: "China's No.1 in waterproofing", desc: "The leading brand, used on national mega infrastructure projects." };
const SHOW = ["Bird's Nest National Stadium", "High-speed rail and metros", "Airports, reservoirs, metro tunnels"];

export const YUHONG_SERIES_META: Record<string, SeriesMeta> = {
  "membrane-poly": mk({
    story: "Yuhong polymer waterproofing membranes (TPO, HDPE/PMH, PME) — high chemical and mechanical durability, watertight heat-welded seams, for roofs, basements, reservoirs and pre-applied items.",
    heritage: "The polymer line is the modern solution for projects demanding high durability and long service life.",
    technicalSpecs: [
      { label: "Material", value: "TPO / HDPE / PE polymer" },
      { label: "Common thickness", value: "1.2 – 2.0 mm" },
      { label: "Jointing", value: "Heat-welded / self-adhesive base layer" },
      { label: "Application", value: "Roofs, basements, reservoirs, pre-applied" },
    ],
    whyChoose: [WHY,
      { icon: "🔥", title: "Watertight heat-welding", desc: "Heat-welded seams form a monolithic, watertight bond." },
      { icon: "🛡️", title: "Chemical-resistant", desc: "Withstands the environment and aging well, with a long service life." }],
    projectShowcase: SHOW,
  }),
  "membrane-bitumen": mk({
    story: "Yuhong SBS/APP modified-bitumen membranes (TKB 太空堡, PMB, ARC lines) — highly elastic, heat- and cold-resistant, torch-applied, for roofs, basements and load-bearing items.",
    heritage: "Modified-bitumen membrane is Yuhong's traditional mainstay for residential and infrastructure projects.",
    technicalSpecs: [
      { label: "Material", value: "SBS / APP modified bitumen, polyester/fiberglass reinforced" },
      { label: "Thickness", value: "3 mm / 4 mm" },
      { label: "Application method", value: "Torch-on" },
      { label: "Properties", value: "Elastic, wide temperature range, root-penetration resistant (ARC)" },
    ],
    whyChoose: [WHY,
      { icon: "🌡️", title: "Wide temperature range", desc: "Stays elastic in both high heat and deep cold (specialty line)." },
      { icon: "🌿", title: "Root-penetration resistant", desc: "The ARC line resists root penetration for green roofs." }],
    projectShowcase: SHOW,
  }),
  "membrane-sa": mk({
    story: "Yuhong self-adhesive membranes (TKB 2xx/3xx/4xx, SAM) — peel-and-stick, cold-applied with no torch, safe to install, cold/wet-lay for basements, bathrooms and roofs.",
    heritage: "Self-adhesive technology enables fast, safe installation, ideal for enclosed spaces.",
    technicalSpecs: [
      { label: "Material", value: "Modified self-adhesive bitumen, with or without core" },
      { label: "Application method", value: "Cold peel-and-stick / wet-lay" },
      { label: "Advantages", value: "Flame-free, safe, fast" },
      { label: "Application", value: "Basements, bathrooms, roofs" },
    ],
    whyChoose: [WHY,
      { icon: "🧊", title: "Safe cold application", desc: "No torch needed; safe to install in enclosed spaces." },
      { icon: "⏱️", title: "Fast installation", desc: "Peel the release liner and stick, saving time." }],
    projectShowcase: SHOW,
  }),
  pu: mk({
    story: "Yuhong polyurethane (PU) waterproof coatings (SPU, GES) — highly elastic seamless membrane with good adhesion, for roofs, terraces, bathrooms and complex structures.",
    heritage: "PU coatings form a seamless film, ideal for detailed surfaces.",
    technicalSpecs: [
      { label: "Type", value: "One-component / two-component polyurethane" },
      { label: "Properties", value: "Highly elastic, seamless, good adhesion" },
      { label: "Application method", value: "Roll/brush several coats at the correct spread rate" },
      { label: "Application", value: "Roofs, terraces, bathrooms, balconies" },
    ],
    whyChoose: [WHY,
      { icon: "🎯", title: "Seamless", desc: "No joints; seals pipe collars and complex corners completely." },
      { icon: "💪", title: "Highly elastic", desc: "Stretches with the structure, resisting cracking along substrate cracks." }],
    projectShowcase: SHOW,
  }),
  water: mk({
    story: "Yuhong water-based waterproof coatings (JS/JSA polymer-cement, HCA acrylic, VPC) — environmentally friendly, applies to damp surfaces, for bathrooms, water tanks and exterior walls.",
    heritage: "The water-based line is safe and low-odor, suited to indoor residential projects.",
    technicalSpecs: [
      { label: "Type", value: "Polymer-cement (JS/JSA) / acrylic (HCA) / vapor-permeable (VPC)" },
      { label: "Properties", value: "Water-based, low-odor, applies to damp surfaces" },
      { label: "Application", value: "Bathrooms, water tanks, exterior walls, balconies" },
    ],
    whyChoose: [WHY,
      { icon: "🌱", title: "Environmentally friendly", desc: "Water-based, low VOC, safe for indoor application." },
      { icon: "💧", title: "Bonds to damp surfaces", desc: "Applies to damp substrates, ideal for wet areas." }],
    projectShowcase: SHOW,
  }),
  "bitumen-coat": mk({
    story: "Yuhong bituminous waterproof coatings (non-curing PBC, BBC, BCW) — extremely strong adhesion, self-healing of punctures, for basements, bridges/roads and buried items.",
    heritage: "Non-curing bituminous coating forms a permanently plastic layer that self-seals micro-cracks.",
    technicalSpecs: [
      { label: "Type", value: "Non-curing rubberized bitumen (PBC) / water-based (BCW)" },
      { label: "Properties", value: "Strong adhesion, permanently plastic, self-healing" },
      { label: "Application", value: "Basements, bridges/roads, buried items" },
    ],
    whyChoose: [WHY,
      { icon: "🩹", title: "Self-healing cracks", desc: "The non-curing plastic layer self-seals micro-cracks and punctures." },
      { icon: "🧲", title: "Strong adhesion", desc: "Bonds firmly to concrete and pairs well with roll membranes." }],
    projectShowcase: SHOW,
  }),
  rigid: mk({
    story: "Yuhong rigid waterproofing (PCC capillary crystalline cement) — penetrates deep into concrete, forms crystals that seal capillaries, waterproofs from within, for water tanks, basements and reservoirs.",
    heritage: "Capillary crystalline technology self-seals concrete for lasting, self-healing performance.",
    technicalSpecs: [
      { label: "Type", value: "Capillary crystalline cement" },
      { label: "Mechanism", value: "Forms crystals that seal capillaries within the concrete" },
      { label: "Application", value: "Water tanks, basements, reservoirs, concrete structures" },
    ],
    whyChoose: [WHY,
      { icon: "💎", title: "Self-sealing crystals", desc: "Crystals grow within the concrete, waterproofing from the inside out." },
      { icon: "♻️", title: "Self-healing", desc: "Re-crystallizes to seal new micro-cracks when exposed to water." }],
    projectShowcase: SHOW,
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return YUHONG_SERIES_META[seriesOriginal.trim()] || YUHONG_SERIES_META["membrane-bitumen"];
}
