/**
 * LINVOL 领沃 metadata — detail page. Keyed by seriesOriginal (villa/retrofit/escalator/passenger).
 * Sourcing: linvol.midea.com.cn — the official elevator brand of the Midea Group.
 * Manufacturer: 菱王电梯有限公司 (Lingwang Elevator). Service hotline: 400-700-7722.
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
const CERTS = [
  "China national elevator safety standard (GB 7588)",
  "New GB/T 21739-2025 standard for home elevators",
  "Elevator safety inspection & acceptance testing",
  "Quality management system to Midea Group standards",
];
const MFG = [
  "LINVOL 领沃 — the official elevator brand of the Midea Group (Midea Building Technologies)",
  "Manufacturer: 菱王电梯有限公司 (Lingwang Elevator)",
  "Midea digital elevator R&D center + factory in the Foshan industrial park",
  "Digital + AI technology applied end to end: design → manufacturing → customization → R&D → operation → maintenance",
];
const PACK = [
  { label: "Supply format", value: "Complete elevator + project-based installation" },
  { label: "Customization", value: "Cabin & configuration tailored to the project" },
  { label: "Service", value: "Concierge + expert support — lifetime warranty + maintenance (hotline 400-700-7722)" },
];
const INSTALL = [
  "Survey the pit, travel height, and load capacity before selecting the configuration",
  "Installed by a trained technical team; safety acceptance testing to standard",
  "Proper wiring, rescue system, and door interlock connections",
  "Test run & safety inspection before commissioning",
];
const CARE = [
  { title: "Lifetime maintenance", desc: "LINVOL's concierge + expert model: scheduled maintenance and inspection of cables/rails, brakes, doors, and the control system." },
  { title: "Digital monitoring", desc: "Digital + AI technology helps track operating condition and provides early warning of anomalies." },
  { title: "Safety", desc: "Periodic safety inspection per regulations; immediate response to any operating anomaly." },
];
const FAQ = [
  { q: "Is LINVOL a Midea brand?", a: "Yes. LINVOL 领沃 is the official elevator brand of the Midea Group (Midea Building Technologies), and the manufacturer is 菱王电梯有限公司 (Lingwang Elevator)." },
  { q: "Does LINVOL offer installation & maintenance in Vietnam?", a: "Contact Huayuesc for advice on the right supply, installation, and technical service plan for your project." },
  { q: "What is the warranty policy?", a: "LINVOL applies a full-lifecycle concierge + expert model — lifetime warranty + maintenance." },
];
function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🛗", title: "Midea brand", desc: "LINVOL — the official elevator brand of the Midea Group (Fortune Global 500)." };
export const LINVOL_SERIES_META: Record<string, SeriesMeta> = {
  villa: mk({
    story: "The LINVOL Villa Elevator features a comprehensively redesigned cabin and components that make the most of the shaft, with a fashionable look and rich customization. It is a buyer-preferred home elevator brand backed by the Midea Group.",
    heritage: "Home elevators are a fast-growing line for LINVOL — meeting the new GB/T 21739-2025 standard and exceeding it on many configuration specs.",
    technicalSpecs: [
      { label: "Type", value: "Home / villa elevator" },
      { label: "Applications", value: "Villas and multi-story townhouses" },
      { label: "Advantages", value: "Efficient use of the shaft, fashionable look, high customization" },
    ],
    whyChoose: [WHY, { icon: "🏡", title: "Built for homes", desc: "Compact design that makes the most of the indoor shaft." }, { icon: "🎨", title: "Customizable", desc: "Rich cabin & finish options to match your interior." }],
    projectShowcase: ["Villas", "Multi-story townhouses", "Premium family homes"],
  }),
  retrofit: mk({
    story: "The LINVOL Retrofit Elevator is purpose-built for adding elevators to older buildings, combining the latest digital technology with people-centered design to serve residential communities and elderly residents.",
    heritage: "The retrofit line meets the need to add elevators to older apartments and buildings — an urban quality-of-life challenge.",
    technicalSpecs: [
      { label: "Type", value: "Retrofit elevator for older buildings" },
      { label: "Applications", value: "Adding an elevator to older apartments/buildings" },
      { label: "Highlights", value: "Latest digital technology + people-centered design" },
    ],
    whyChoose: [WHY, { icon: "🏢", title: "For older buildings", desc: "A solution for adding an elevator to existing structures." }, { icon: "👵", title: "People-centered", desc: "Serving residential communities & elderly residents." }],
    projectShowcase: ["Older apartments adding an elevator", "Residential areas with many elderly residents", "Renovation of existing buildings"],
  }),
  escalator: mk({
    story: "The LINVOL Escalator is built for shopping malls, train stations, and airports: precision construction, smooth operation, and energy efficiency.",
    heritage: "Escalators are the high-traffic public-transit line in the LINVOL portfolio.",
    technicalSpecs: [
      { label: "Type", value: "Escalator" },
      { label: "Applications", value: "Malls, train stations, airports, public spaces" },
      { label: "Features", value: "Precision construction, smooth operation, energy efficiency" },
    ],
    whyChoose: [WHY, { icon: "🏬", title: "For large projects", desc: "Handles high traffic at malls, stations, and airports." }, { icon: "🛡️", title: "Safety", desc: "Safety and emergency-stop systems to standard." }],
    projectShowcase: ["Shopping malls", "Train stations & airports", "Public facilities"],
  }),
  passenger: mk({
    story: "The digital LINVOL Passenger Elevator is built for hotels, offices, and apartments: outstanding performance, high safety, and energy efficiency, with digital + AI technology across the elevator's entire lifecycle.",
    heritage: "The passenger line is a core product that clearly showcases the digital capabilities of LINVOL/Midea.",
    technicalSpecs: [
      { label: "Type", value: "Passenger elevator" },
      { label: "Applications", value: "Hotels, offices, apartments" },
      { label: "Technology", value: "Digital + AI across the full lifecycle" },
    ],
    whyChoose: [WHY, { icon: "🏨", title: "Versatile", desc: "Suited to hotels, offices, and apartments." }, { icon: "⚡", title: "Efficient", desc: "High performance, energy efficiency, and safety." }],
    projectShowcase: ["Hotels", "Office buildings", "Apartments & residences"],
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return LINVOL_SERIES_META[seriesOriginal.trim()] || LINVOL_SERIES_META["villa"];
}
