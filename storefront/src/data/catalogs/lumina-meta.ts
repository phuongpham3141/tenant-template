/**
 * Lumina Floor series metadata —— rich text for product detail pages.
 * Indexed by seriesOriginal: "spc" (stone-plastic click-lock flooring) / "lvt" (resilient flooring).
 * Source: Huayue Supply Chain - Lumina Floor product catalog (Chinese-Vietnamese bilingual edition) + common industry process parameters.
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

const BRAND_MFG = [
  "Lumina Floor is built by Huayue Supply Chain's in-house factory —— with full-chain control from core formulation and decorative-film printing to click-lock tooling, ensuring direct-from-source supply and reliable lead times",
  "Decorative films come from world-leading pattern suppliers, offering more than 800 patterns and colors spanning wood grain, stone pattern, herringbone, geometric motifs and other on-trend themes",
  "The stone-plastic core uses a calcium powder + high-purity PVC composite formula, formed in a single high-temperature, high-pressure pass for a flat surface, dimensional stability and warp resistance",
  "OEM / ODM supported: patterns, specifications, lock types and packaging can be customized per project, with flexible minimum order quantities suited to both project and distribution channels",
];
const BRAND_CARE = [
  { title: "Routine cleaning", desc: "Simply wipe with a wrung-out soft mop or cloth and a neutral cleaner; no waxing required and no polishing maintenance, for worry-free durability." },
  { title: "Scratch prevention", desc: "Add felt pads to furniture legs and use sliders when moving heavy items; placing a doormat at the entrance is recommended to reduce tracked-in grit." },
  { title: "Waterproofing", desc: "The stone-plastic core is inherently waterproof; just wipe up spills promptly. It can be used in kitchens, bathroom passageways and other moisture-prone areas." },
  { title: "Temperature tolerance", desc: "Avoid prolonged localized high heat (such as direct contact with an unshielded heater); it performs reliably at normal room temperature and with underfloor heating." },
];
const BRAND_INSTALL = [
  "Before installation, measure the room and draw a layout plan to optimize pattern matching and minimize cutting waste",
  "The base must be flat, dry and clean, with flatness deviation kept within 2mm per 2m; level any uneven spots with self-leveling compound first",
  "Click-lock versions require no glue: leave an 8–10mm expansion gap along the walls, assemble with staggered seams and tap into place; self-adhesive versions peel and stick, then roll out the air",
  "For large areas or underfloor-heating zones, install in sections per the manufacturer's recommendations; after installation, clean the floor and check that the seams are flat",
];
const BRAND_CERTS = [
  "Eco-friendly core —— formaldehyde emission meets E0 / E1 grade, safe for green home renovation",
  "Wear rating AC3–AC5 (depending on wear-layer thickness), suited to residential through commercial traffic intensities",
  "Anti-slip surface treatment (reference R9–R10), improving safety in homes and public spaces",
  "Fire-rated B1 flame-retardant core, resistant to flame spread with low smoke",
];
const BRAND_PACK = [
  { label: "Packaging", value: "Carton-packed with internal foam/corner protection; pallets shrink-wrapped for export" },
  { label: "Minimum order", value: "By container / square meter; mixed-pattern loading supported" },
  { label: "Lead time", value: "Fast shipping for in-stock patterns; custom patterns negotiated per order (reference 15–30 days)" },
  { label: "Samples", value: "Color cards and small samples provided to confirm pattern and feel before large orders" },
];

export const LUMINA_SERIES_META: Record<string, SeriesMeta> = {
  spc: {
    story:
      "Lumina Floor SPC stone-plastic click-lock flooring is built on stone and refined with plastic —— a rigid core composed of calcium powder and high-purity PVC gives the flooring outstanding dimensional stability and a solid, substantial feel underfoot. It is born waterproof and naturally wear-resistant, shedding the traditional wood-floor labels of being afraid of water, moisture and warping; its click-and-install design means renewing a whole room can be as fast as a single day. For young people who want both good looks and efficiency, this is a floor that stands up to daily life and still looks great on camera.",
    heritage:
      "SPC has become the trending floor material sweeping Europe, America and Asia in recent years. Lumina Floor has mastered the category —— using world-leading decorative films to reproduce authentic wood and stone textures, then leveraging the supply chain of Huayue's in-house factory to bring costs into a friendly range, so that a premium look is no longer reserved for premium prices.",
    technicalSpecs: [
      { label: "Type", value: "SPC stone-plastic click-lock flooring (rigid stone-plastic core)" },
      { label: "Board thickness", value: "4mm – 8mm" },
      { label: "Backing pad", value: "1.0 / 1.5 / 2.0mm EVA or IXPE sound-absorbing pad" },
      { label: "Wear layer", value: "0.2 / 0.3 / 0.5mm (clear PVC wear layer)" },
      { label: "Installation", value: "Single-sided lock / integrated lock, glue-free click-together" },
      { label: "Patterns", value: "Wood grain / stone pattern / herringbone and more, 800+ patterns" },
      { label: "Applications", value: "Residential, apartments, offices, retail, light commercial spaces" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "💧", title: "Naturally waterproof", desc: "The stone-plastic core doesn't swell or warp when wet, so it can be installed with confidence in kitchen/bathroom passageways and damp regions." },
      { icon: "🛡️", title: "Rigid and wear-resistant", desc: "A rigid core plus multiple wear-layer options resists compression and scratches with high durability, suited to high-traffic commercial spaces." },
      { icon: "⚡", title: "Fast click-lock install", desc: "Glue-free click-together assembly lays directly over old floors without removing the subfloor, taking you from bare floor to move-in faster." },
      { icon: "🌱", title: "Eco-friendly and quiet", desc: "An E0/E1 grade core paired with an EVA/IXPE sound-absorbing pad keeps footsteps quiet, for more reassuring green home renovation." },
      { icon: "🎨", title: "On-trend patterns", desc: "800+ wood-grain, stone-pattern and trend-driven textures, from raw-wood wabi-sabi to modern minimalism, all in one place." },
    ],
    projectShowcase: [
      "Whole-home renovations of young apartments and compact units",
      "Commercial spaces such as cafes, concept stores and studios",
      "Office, shared-space and showroom floors",
    ],
    faq: [
      { q: "Can SPC flooring be laid over underfloor heating?", a: "Yes. The stone-plastic core conducts heat stably with minimal deformation, suitable for hydronic/electric heating; install in sections per the manufacturer and control the heat-up rate." },
      { q: "Can it be laid directly over old tile/subfloor?", a: "As long as the base is flat and dry, the click-lock version can be laid directly without removing the old floor; just level any uneven spots with self-leveling compound first." },
      { q: "How do I choose the wear layer?", a: "0.3mm is recommended for home use, and 0.5mm for commercial and high-traffic spaces; the thicker the wear layer, the longer the service life." },
      { q: "Minimum order and samples?", a: "Orders by container/square meter and mixed-pattern loading are supported; we can send color cards and small samples first to confirm pattern and feel." },
    ],
  },
  lvt: {
    story:
      "Lumina Floor LVT resilient flooring takes softness to the extreme —— a multilayer PVC composite structure delivers a warm feel underfoot and excellent sound absorption; it feels like walking on a soft rug, yet is easier to care for than one. Thin and lightweight, it comes in dry-back, self-adhesive and click-lock forms, fitting every renovation and commercial scenario. When a space calls for quiet, comfort and design freedom, LVT is the premium touch hidden in the details.",
    heritage:
      "LVT (Luxury Vinyl Tile) is an evergreen mainstay of commercial flooring worldwide —— a long-standing choice for airports, hospitals and retail chains. Lumina Floor brings this professional category into young homes, with friendlier prices and more on-trend patterns, so commercial-grade durability becomes part of everyday life.",
    technicalSpecs: [
      { label: "Type", value: "LVT multilayer resilient flooring" },
      { label: "Board thickness", value: "2mm / 3mm (dry-back · self-adhesive); 4mm / 5mm (click-lock)" },
      { label: "Wear layer", value: "0.2 / 0.3 / 0.5mm" },
      { label: "Installation", value: "Dry-back full-spread glue / self-adhesive peel-and-stick / glue-free click-lock" },
      { label: "Patterns", value: "Wood grain / stone pattern / woven texture and more, 800+ patterns" },
      { label: "Features", value: "Quiet, comfortable underfoot, wear-resistant and easy to clean, flexible and anti-slip" },
      { label: "Applications", value: "Residential, offices, healthcare, education, retail commercial" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🤫", title: "Quiet underfoot", desc: "The multilayer resilient structure absorbs footstep noise with a soft, warm feel, keeping home and office quieter." },
      { icon: "🪶", title: "Thin and versatile", desc: "The 2–3mm ultra-thin version doesn't raise the floor height or catch on doors, making it especially friendly for renovating old homes and partial remodels." },
      { icon: "🧩", title: "Three installation methods", desc: "Full-spread glue/self-adhesive/click-lock can be chosen flexibly to suit the scenario, covering everything from quick renovations to long-term projects." },
      { icon: "🧽", title: "Wear-resistant and easy to clean", desc: "The commercial-grade wear layer resists foot traffic and scratches, stains wipe clean instantly, and maintenance costs are low." },
      { icon: "🦶", title: "Flexible and anti-slip", desc: "An anti-slip surface treatment plus a resilient feel makes homes safer for the elderly and children, and public spaces safer for everyone." },
    ],
    projectShowcase: [
      "Quiet, durable settings such as hospitals, clinics and elder care facilities",
      "Schools, training centers and mother-and-baby spaces",
      "Quick renovations for retail chains, offices and apartments",
    ],
    faq: [
      { q: "How do I choose between self-adhesive and click-lock?", a: "For ultra-fast renovation over a flat base, choose self-adhesive (peel and stick); if you want glue-free, removable and reusable, choose the click-lock version." },
      { q: "What's the difference between LVT and SPC?", a: "LVT is thinner and softer with quiet underfoot comfort; SPC has a harder core that is more dimensionally stable and waterproof. Choose LVT for comfort, SPC for stability and waterproofing." },
      { q: "Is it suitable for commercial spaces?", a: "Very much so. LVT is a common flooring material for airports, hospitals and retail chains —— wear-resistant, easy to clean, with single-plank replacement for maintenance." },
      { q: "Do you offer custom patterns?", a: "OEM/ODM pattern and specification customization is supported, with samples available for confirmation; minimum order quantities are flexible." },
    ],
  },
};

/** Helper: get metadata by seriesOriginal, defaulting back to spc. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return LUMINA_SERIES_META[seriesOriginal.trim().toLowerCase()] || LUMINA_SERIES_META.spc;
}
