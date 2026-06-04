/**
 * Daweier 达威尔 metadata — detail pages. Keyed by seriesOriginal (catKey: sink/faucet/drain/accessory...).
 * Sourcing: daweier.cn — Kaiping Daweier Kitchen & Bath (开平达威尔厨卫), Guangdong. Stainless steel sinks, faucets, floor drains.
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
const CERTS = ["Chinese national standards (GB) for kitchen & bath equipment", "Food-grade SUS304 stainless steel", "ISO 9001 quality management", "Corrosion-resistance & water-tightness testing"];
const MFG = [
  "Daweier 达威尔 (Kaiping, Guangdong) — specializes in handmade stainless steel sinks, kitchen faucets, floor drains & accessories",
  "Food-grade SUS304 stainless steel sinks; handmade & pressed (drawn) lines",
  "Floor drains are a flagship line — many side-outlet/bottom-outlet anti-odor designs",
  "Quality control: water-tightness testing, corrosion resistance, stainless steel gauge thickness",
];
const PACK = [
  { label: "Packaging", value: "Carton box + foam/film to protect the stainless steel surface" },
  { label: "Included accessories", value: "Drain kit, strainer basket, gaskets (depending on product)" },
  { label: "MOQ", value: "By batch/container; mixed SKUs welcome" },
];
const INSTALL = [
  "Sinks: cut the countertop to the correct cut-out size, fit the clips & apply silicone around the edge",
  "Faucets: install into the pre-cut hole, connect hot/cold water supply, check for leaks",
  "Floor drains: install at the correct floor level, ensure drainage slope & anti-odor trap",
  "Run a water acceptance test before handover",
];
const CARE = [
  { title: "Cleaning stainless steel", desc: "Wipe with a soft cloth + neutral cleaner along the grain; avoid steel wool & strong acids that cause scratching/corrosion." },
  { title: "Prevent water spots", desc: "Wipe dry after use to avoid water marks/stains; clear the strainer basket & drain trap periodically." },
  { title: "Faucets/floor drains", desc: "Clean the aerator to prevent limescale; check gaskets & the floor drain's anti-odor trap." },
];
const FAQ = [
  { q: "What type of stainless steel do Daweier sinks use?", a: "Food-grade SUS304 stainless steel — rust-resistant & durable in the kitchen environment." },
  { q: "Do you provide countertop cut-out dimensions?", a: "Yes. Dimensions are specified per model; Huayuesc provides installation drawings." },
  { q: "MOQ & lead time?", a: "Calculated by batch/container; delivery schedule quoted per order." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🍳", title: "Durable SUS304 stainless steel", desc: "Food-grade 304 stainless steel sinks/accessories — rust-resistant, durable, attractive." };
const SHOW = ["Home & apartment kitchens", "Restaurants, commercial kitchens", "Kitchen & bath handover projects"];
const SINK = mk({
  story: "Daweier stainless steel sinks — handmade (R10) & drawn lines, thick SUS304 stainless steel, sound-dampening base, many single/double bowl styles for home & commercial kitchens.",
  heritage: "Handmade stainless steel sinks are Daweier's core line.",
  technicalSpecs: [{ label: "Material", value: "Food-grade SUS304 stainless steel" }, { label: "Process", value: "Handmade / pressed (drawn)" }, { label: "Features", value: "Sound-dampening base, rust-resistant, easy to clean" }, { label: "Style", value: "Single/double bowl, undermount/topmount" }],
  whyChoose: [WHY, { icon: "🔇", title: "Sound dampening", desc: "A base coating reduces noise during draining for quieter use." }, { icon: "🧽", title: "Easy to clean", desc: "Well-proportioned corner radius, smooth surface, quick to wipe." }],
  projectShowcase: SHOW,
});
export const DAWEIER_SERIES_META: Record<string, SeriesMeta> = {
  sink: SINK, basin: SINK, other: SINK,
  faucet: mk({
    story: "Daweier kitchen faucets — hot/cold faucets for sinks, durable ceramic cartridge, stable flow, tarnish-resistant plating.",
    heritage: "Kitchen faucets complete the Daweier sink set.",
    technicalSpecs: [{ label: "Material", value: "Plated brass/stainless steel" }, { label: "Valve core", value: "Ceramic cartridge" }, { label: "Application", value: "Kitchen sinks" }],
    whyChoose: [WHY, { icon: "🚿", title: "Smooth flow", desc: "Ceramic cartridge opens/closes smoothly, few leaks." }, { icon: "🛡️", title: "Durable plating", desc: "Tarnish-resistant plating, stays bright over time." }],
    projectShowcase: SHOW,
  }),
  drain: mk({
    story: "Daweier floor drains — stainless steel/brass anti-odor floor drains, many side-outlet & bottom-outlet designs, high drainage flow for bathrooms, balconies, kitchens.",
    heritage: "Floor drains are Daweier's specialized flagship line.",
    technicalSpecs: [{ label: "Material", value: "SUS304 stainless steel / brass" }, { label: "Style", value: "Side outlet (E) / bottom outlet; square (L05)" }, { label: "Features", value: "Anti-odor, high drainage flow" }, { label: "Application", value: "Bathrooms, balconies, kitchens" }],
    whyChoose: [WHY, { icon: "👃", title: "Anti-odor", desc: "Effective anti-odor trap blocks sewer gas backflow." }, { icon: "💧", title: "Fast drainage", desc: "High drainage flow, minimizes standing water on the floor." }],
    projectShowcase: SHOW,
  }),
  accessory: mk({
    story: "Daweier sink accessories — drain kits, strainers, drain pipes, baskets & coordinated accessories for stainless steel sinks.",
    heritage: "Coordinated accessories complete the sink system.",
    technicalSpecs: [{ label: "Material", value: "Stainless steel / alloy / ABS plastic" }, { label: "Includes", value: "Drain kit, strainer, drain pipe, basket" }, { label: "Application", value: "Kitchen sinks" }],
    whyChoose: [WHY, { icon: "🧩", title: "Coordinated", desc: "Accessories fit Daweier sinks precisely, quick to install." }],
    projectShowcase: SHOW,
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DAWEIER_SERIES_META[seriesOriginal.trim()] || DAWEIER_SERIES_META.sink;
}
