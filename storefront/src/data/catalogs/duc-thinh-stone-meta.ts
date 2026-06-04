/**
 * Rich metadata for the Đức Thịnh Stone engineered-stone lines — product detail page.
 * Keyed by seriesOriginal (category: "quartz", "marble", "onyx").
 *
 * Honest sourcing:
 *   • Profile & specs: ducthinhstone.com (Duc Thinh Stone Technology Co., Ltd).
 *   • Engineered-stone lines made from quartz/stone powder + resin.
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
  "ISO 9001 — Quality management",
  "Non-radioactive material certification (NSF/Class A by batch)",
  "Testing of water absorption, flexural strength, and abrasion resistance",
  "Environmentally friendly material (low-VOC resin)",
];
const COMMON_MFG = [
  "Đức Thịnh Stone — supplier & fabricator of engineered stone for the Vietnamese interiors market",
  "Engineered stone pressed from ~90% quartz / stone powder + resin under vacuum vibro-compaction",
  "Large-format slabs 3200×1600mm, 3000×1400/1600mm; thickness 18–30mm; cut to size on request",
  "Large supply capacity (millions of m² per year), with a stable raw-material source",
];
const COMMON_PACKAGING = [
  { label: "Packaging", value: "Steel A-frame + corner protectors + wrap film; wooden crates for export" },
  { label: "Slab format", value: "3200×1600mm / 3000×1400mm / 3000×1600mm / 3000×1200mm + cut to size" },
  { label: "Thickness", value: "18 – 30mm depending on the line" },
  { label: "MOQ", value: "By container; mixing colors/sizes is fine" },
  { label: "Storage", value: "Stand upright on an A-frame; avoid impact to slab edges" },
];
const COMMON_INSTALL = [
  "Measure & create a cut (nesting) layout to optimize veining before fabrication",
  "CNC cutting + edge polishing; use dedicated engineered-stone adhesive for joints",
  "Ensure a flat, evenly load-bearing substrate; reinforce at large spans (countertops)",
  "Clean & polish the joints after installation",
];
const COMMON_CARE = [
  { title: "Daily cleaning", desc: "Wipe with a soft cloth + warm water/neutral cleaner. Avoid harsh cleaners and concentrated acids/alkalis." },
  { title: "Prevention", desc: "Use a cutting board/trivet when cutting and placing hot pots. Quartz is heat-resistant but avoid sudden thermal shock." },
  { title: "Stain removal", desc: "For stubborn stains use a mild cleaning solution + a non-scratch scrub pad; wipe clean immediately." },
];
const COMMON_FAQ = [
  { q: "Does Đức Thịnh engineered stone come cut to size?", a: "Yes. We support cut-to-size and edge fabrication per drawings." },
  { q: "What is the minimum order and delivery time?", a: "Calculated by container/volume; delivery time is negotiated per order (reference ~15 days)." },
  { q: "Do you provide samples for color approval?", a: "Yes. We provide small slab samples to approve color/veining before placing a large order." },
];
function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: COMMON_MFG, careGuide: COMMON_CARE, installation: COMMON_INSTALL,
    certifications: COMMON_CERTS, packaging: COMMON_PACKAGING, faq: COMMON_FAQ };
}

export const DTS_SERIES_META: Record<string, SeriesMeta> = {
  quartz: mk({
    story: "Đức Thịnh engineered quartz — pressed from ~90% quartz powder + resin for high hardness, scratch resistance, water resistance, and good acid resistance. Suited to countertops, vanity tops, floors, and wall cladding.",
    heritage: "Quartz is the most popular engineered-stone line for countertops thanks to durability that surpasses natural stone and a non-porous, antibacterial surface.",
    technicalSpecs: [
      { label: "Material", value: "~90% quartz powder + resin" },
      { label: "Slab format", value: "3200×1600 / 3000×1400 / 3000×1600 mm" },
      { label: "Thickness", value: "20 – 30 mm" },
      { label: "Surface", value: "Polished / honed" },
      { label: "Properties", value: "Resistant to acids, stains, heat, and scratches" },
    ],
    whyChoose: [
      { icon: "💎", title: "Hard & durable", value: undefined as never, desc: "Harder than natural stone, scratch-resistant, low maintenance." } as never,
      { icon: "🛡️", title: "Non-porous, antibacterial", desc: "Non-porous surface that does not absorb water/oil, easy to clean." },
      { icon: "🎨", title: "Variety of veins and colors", desc: "Many white/gray/black/beige tones & the gold-veined Calacatta line." },
    ],
    projectShowcase: ["Countertops in apartments & villas", "Reception counters, commercial worktops", "Premium interior wall cladding & flooring"],
  }),
  marble: mk({
    story: "Đức Thịnh engineered/artificial marble — recreates the beauty of natural marble veining with high consistency, easy fabrication, and a reasonable price for wall cladding, floors, and interiors.",
    heritage: "Artificial marble offers veining as beautiful as natural stone but more uniform and with fewer defects, well suited to large areas.",
    technicalSpecs: [
      { label: "Material", value: "Natural stone + marble powder + resin" },
      { label: "Slab format", value: "3200×1600 / 2400×1600 mm + cut to size" },
      { label: "Thickness", value: "18 – 30 mm" },
      { label: "Surface", value: "Polished / honed / sandblasted" },
      { label: "Applications", value: "Wall cladding, floors, bathrooms, living rooms" },
    ],
    whyChoose: [
      { icon: "🏛️", title: "Marble beauty", desc: "Elegant marble veining, consistent across large areas." },
      { icon: "✂️", title: "Easy to fabricate", desc: "Flexible cutting/joining with less waste than natural stone blocks." },
      { icon: "💰", title: "Reasonable cost", desc: "Better price than natural marble for the same aesthetic effect." },
    ],
    projectShowcase: ["Hotel lobbies & wall cladding", "Villa living-room floors", "Commercial facades & interiors"],
  }),
  onyx: mk({
    story: "Đức Thịnh artificial onyx — a translucent effect and unique onyx veining for accent decor features, backlit panels, and bar counters.",
    heritage: "Artificial onyx recreates the dreamy look of natural onyx with greater durability, well suited to backlit applications.",
    technicalSpecs: [
      { label: "Material", value: "Mineral powder + resin (onyx effect)" },
      { label: "Slab format", value: "Large slabs, cut to size" },
      { label: "Properties", value: "Onyx veining; some lines are translucent (backlit)" },
      { label: "Applications", value: "Accent panels, bar counters, decorative worktops" },
    ],
    whyChoose: [
      { icon: "✨", title: "Translucent effect", desc: "Beautiful when backlit for a luxurious accent." },
      { icon: "🎨", title: "Unique veining", desc: "Dreamy onyx veining, with each slab one of a kind." },
      { icon: "💪", title: "More durable than natural onyx", desc: "Less prone to cracking and easier to install than stone blocks." },
    ],
    projectShowcase: ["Backlit panels in hotel lobbies", "Bar & reception counters", "Premium interior accents"],
  }),
};

/** Helper: get meta by seriesOriginal (category). */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DTS_SERIES_META[seriesOriginal.trim()] || DTS_SERIES_META.quartz;
}
