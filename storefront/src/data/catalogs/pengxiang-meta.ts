/**
 * Pengxiang 鹏翔 engineered stone metadata — detail page. Keyed by seriesOriginal (quartz/marble/onyx/terrazzo).
 * Sourcing: px-stone.com — Fujian Pengxiang Industrial (福建鹏翔实业), Nan'an, Fujian.
 * Pengxiang is the parent group of Đức Thịnh Stone (Vietnamese entity).
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
const CERTS = ["ISO 9001 — Quality management", "Non-radioactive material certification", "Tested for water absorption, flexural strength, abrasion resistance", "Eco-friendly materials (low-VOC resin)"];
const MFG = [
  "Fujian Pengxiang Industrial 福建鹏翔实业 — founded 2006, Nan'an, Fujian (China's stone capital)",
  "A leading engineered stone manufacturer: artificial marble, quartz, onyx, terrazzo",
  "Parent group of Đức Thịnh Stone (Vietnamese entity, Nghe An factory)",
  "Engineered stone pressed from ~90% stone/quartz powder + resin; large-format slabs, cut to size",
];
const PACK = [
  { label: "Packaging", value: "Steel A-frame + corner protectors + wrap film; export wooden crates" },
  { label: "Slab size", value: "3200×1600mm / 2400×1600mm + cut to size" },
  { label: "Thickness", value: "12 – 30mm depending on line" },
  { label: "MOQ", value: "By container; mixed colors/sizes OK" },
];
const INSTALL = [
  "Measure & prepare a cutting (nesting) plan to optimize stone veining before fabrication",
  "CNC cutting + edge polishing; use engineered-stone adhesive for joints",
  "Ensure a flat, evenly load-bearing substrate; reinforce wide spans",
  "Clean & polish the joints after installation",
];
const CARE = [
  { title: "Daily cleaning", desc: "Wipe with a soft cloth + warm water/neutral cleaner. Avoid harsh cleaners and concentrated acids/alkalis." },
  { title: "Prevention", desc: "Use a cutting board/trivet when cutting & placing hot pots; avoid sudden thermal shock." },
  { title: "Stain removal", desc: "For stubborn stains use a mild cleaning solution + a non-scratch pad; wipe clean immediately." },
];
const FAQ = [
  { q: "Can Pengxiang stone be cut to size on request?", a: "Yes. We support cut-to-size service and edge fabrication per drawings." },
  { q: "Relationship with Đức Thịnh Stone?", a: "Pengxiang is the parent group; Đức Thịnh Stone is the Vietnamese entity (Nghe An factory) with the same product range." },
  { q: "MOQ & lead time?", a: "Priced by container; delivery schedule quoted per order." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const SHOW = ["Apartment & villa countertops", "Premium interior wall cladding & flooring", "Hotel lobbies, commercial facades"];
const QUARTZ = mk({
  story: "Pengxiang engineered quartz — pressed from ~90% quartz powder + resin: high hardness, scratch resistant, non-porous, acid resistant. Ideal for countertops, vanities, flooring and wall cladding.",
  heritage: "Quartz is the most popular engineered stone for countertops thanks to its durability & non-porous surface.",
  technicalSpecs: [{ label: "Material", value: "Quartz powder ~90% + resin" }, { label: "Slab size", value: "3200×1600 / 3000×1600 mm" }, { label: "Thickness", value: "12 – 30 mm" }, { label: "Surface", value: "Polished / honed" }, { label: "Features", value: "Acid, stain, heat & scratch resistant" }],
  whyChoose: [{ icon: "💎", title: "Hard & durable", desc: "Harder than natural stone, scratch resistant, low maintenance." }, { icon: "🛡️", title: "Non-porous", desc: "Non-porous surface that won't absorb water or oil." }, { icon: "🎨", title: "Varied veining & colors", desc: "Many tones plus the Calacatta gold-veined line." }],
  projectShowcase: SHOW,
});
const MARBLE = mk({
  story: "Pengxiang engineered/artificial marble — recreates natural marble veining with high consistency, easy to fabricate, and affordable for wall cladding, flooring and interiors.",
  heritage: "Artificial marble offers beautiful, consistent veining with few defects, ideal for large areas.",
  technicalSpecs: [{ label: "Material", value: "Natural stone + marble powder + resin" }, { label: "Slab size", value: "3200×1600 / 2400×1600 mm + cut to size" }, { label: "Thickness", value: "12 – 30 mm" }, { label: "Surface", value: "Polished / honed" }, { label: "Applications", value: "Wall cladding, flooring, bathrooms, lobbies" }],
  whyChoose: [{ icon: "🏛️", title: "Marble beauty", desc: "Elegant marble veining, consistent across large areas." }, { icon: "✂️", title: "Easy to fabricate", desc: "Flexible cutting/joining with less waste than stone blocks." }, { icon: "💰", title: "Affordable", desc: "Better value than natural marble with the same aesthetic." }],
  projectShowcase: SHOW,
});
export const PENGXIANG_SERIES_META: Record<string, SeriesMeta> = {
  quartz: QUARTZ, marble: MARBLE, other: MARBLE,
  onyx: mk({
    story: "Pengxiang artificial onyx — translucent effect & unique onyx veining for accent features, backlit panels and bar counters.",
    heritage: "Artificial onyx recreates the ethereal look of natural onyx with greater durability.",
    technicalSpecs: [{ label: "Material", value: "Mineral powder + resin (onyx effect)" }, { label: "Features", value: "Onyx veining, some lines translucent (backlit)" }, { label: "Applications", value: "Accent panels, bar counters, decorative tabletops" }],
    whyChoose: [{ icon: "✨", title: "Translucent", desc: "Beautiful when backlit — luxurious." }, { icon: "🎨", title: "Unique veining", desc: "Ethereal onyx veining, every slab one of a kind." }],
    projectShowcase: SHOW,
  }),
  terrazzo: mk({
    story: "Pengxiang artificial terrazzo — stone/glass chips evenly scattered through the base, a modern terrazzo style for flooring, wall cladding and tabletops.",
    heritage: "Terrazzo is back in modern design trends with durability & aesthetics.",
    technicalSpecs: [{ label: "Material", value: "Stone/glass chips + resin/cement base" }, { label: "Effect", value: "Scattered-chip terrazzo, multicolor" }, { label: "Applications", value: "Flooring, wall cladding, tabletops" }],
    whyChoose: [{ icon: "🎯", title: "Terrazzo style", desc: "A modern scattered-chip look that fits current design trends." }, { icon: "💪", title: "Durable", desc: "Strong abrasion resistance for high-traffic floors." }],
    projectShowcase: SHOW,
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return PENGXIANG_SERIES_META[seriesOriginal.trim()] || PENGXIANG_SERIES_META.marble;
}
