/**
 * Metadata for Toshiba Elevator (东芝电梯) — detail page. Keyed by seriesOriginal (catKey).
 * Sourcing: toshiba-elevator.com.cn — Toshiba Elevator (China) Co., Ltd.
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
const CERTS = ["International elevator safety standards & GB 7588", "ISO 9001 / ISO 14001", "Japanese Toshiba technology", "Safety inspection & commissioning"];
const MFG = [
  "Toshiba Elevator 东芝电梯 — the elevator brand of the Toshiba group (Japan), operated in China",
  "Toshiba drive & control technology: quiet, energy-efficient and highly safe",
  "Product range: high-speed elevators, passenger elevators, escalators, moving walks, home elevators and retrofit solutions",
  "Professional installation and technical service network",
];
const PACK = [
  { label: "Supply format", value: "Complete elevator package + project-based installation" },
  { label: "Services", value: "Site survey, installation, maintenance and modernization" },
];
const INSTALL = [
  "Survey the hoistway, travel height and load capacity to select the right configuration",
  "Installed by trained technicians; safety acceptance to standard",
  "Test run & safety inspection before commissioning",
];
const CARE = [
  { title: "Scheduled maintenance", desc: "Maintain on schedule: inspect ropes/guide rails, brakes, doors and the control system, and lubricate." },
  { title: "Safety", desc: "Periodic safety inspections; address any abnormality immediately." },
];
const FAQ = [
  { q: "Does Toshiba Elevator offer support in Vietnam?", a: "Contact Huayuesc for advice on supply, installation and technical services tailored to your project." },
  { q: "Delivery & installation lead time?", a: "Depends on configuration and scope; schedule is confirmed after an on-site survey." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🇯🇵", title: "Japanese Toshiba technology", desc: "Japanese elevator brand — quiet, safe and energy-efficient." };
const SHOW = ["Office buildings & shopping malls", "High-rise apartment buildings", "Train stations, airports and public facilities"];
const PASS = mk({
  story: "Toshiba passenger elevators (ELCOSMO with a compact machine room, SPACEL machine-room-less) — quiet, energy-saving operation that optimizes hoistway space, ideal for office and apartment buildings.",
  heritage: "ELCOSMO and SPACEL are Toshiba Elevator's flagship passenger elevator lines.",
  technicalSpecs: [{ label: "Type", value: "Passenger elevator (with or without machine room)" }, { label: "Technology", value: "Gearless drive, VVVF control" }, { label: "Applications", value: "Offices, apartments and commercial buildings" }],
  whyChoose: [WHY, { icon: "🔇", title: "Quiet operation", desc: "Smooth drive technology for quiet, stable operation." }, { icon: "⚡", title: "Energy saving", desc: "Energy-optimized control with power regeneration." }],
  projectShowcase: SHOW,
});
export const TOSHIBA_ELEVATOR_SERIES_META: Record<string, SeriesMeta> = {
  "high-speed": mk({
    story: "Toshiba high-speed elevators (New ELBRIGHT) — for super-tall buildings, with high travel speed that stays quiet and stable even at top speed, using vibration-damping and pressure-balancing technology.",
    heritage: "ELBRIGHT is the top-tier line for skyscrapers.",
    technicalSpecs: [{ label: "Type", value: "High-speed elevator" }, { label: "Applications", value: "Super-tall buildings and landmarks" }, { label: "Technology", value: "Vibration damping, high-speed stability" }],
    whyChoose: [WHY, { icon: "🚀", title: "Quiet at high speed", desc: "Quiet, stable and comfortable even at high travel speed." }, { icon: "🏙️", title: "For skyscrapers", desc: "A solution for super-tall buildings." }],
    projectShowcase: SHOW,
  }),
  passenger: PASS, "passenger-elevator": PASS,
  escalator: mk({
    story: "Toshiba escalators (KINDMOVER) — for shopping malls, train stations and airports; continuous, safe operation with energy-saving thanks to an intelligent standby mode.",
    heritage: "KINDMOVER is Toshiba's flagship escalator line.",
    technicalSpecs: [{ label: "Type", value: "Escalator" }, { label: "Applications", value: "Shopping malls, train stations and airports" }, { label: "Features", value: "Energy saving, standby mode" }],
    whyChoose: [WHY, { icon: "🏬", title: "For large facilities", desc: "Handles high passenger traffic with continuous operation." }, { icon: "🌱", title: "Energy saving", desc: "Intelligent standby mode reduces power consumption." }],
    projectShowcase: SHOW,
  }),
  "moving-walk": mk({
    story: "Toshiba moving walks — transport passengers and luggage across flat or gently inclined surfaces in airports, train stations and large shopping malls.",
    heritage: "Moving walks support horizontal circulation in large-scale facilities.",
    technicalSpecs: [{ label: "Type", value: "Moving walk" }, { label: "Applications", value: "Airports, train stations and shopping malls" }, { label: "Features", value: "Horizontal travel, safe and continuous" }],
    whyChoose: [WHY, { icon: "🧳", title: "For airports/stations", desc: "Conveniently moves passengers and luggage over long distances." }, { icon: "🛡️", title: "Safety", desc: "Safety and emergency-stop systems to standard." }],
    projectShowcase: SHOW,
  }),
  home: mk({
    story: "Toshiba home elevators (SPACEL-H) — for villas and townhouses: compact, quiet and safe, built on Toshiba technology with a wide choice of interior finishes.",
    heritage: "SPACEL-H brings Toshiba technology into the home.",
    technicalSpecs: [{ label: "Type", value: "Home elevator (SPACEL-H)" }, { label: "Applications", value: "Villas and townhouses" }, { label: "Advantages", value: "Compact, quiet and safe" }],
    whyChoose: [WHY, { icon: "🏡", title: "For homes", desc: "Compact, quiet design that fits a small hoistway." }, { icon: "🛡️", title: "Toshiba safety", desc: "Safety features to Toshiba standards." }],
    projectShowcase: ["Villas", "Multi-story townhouses"],
  }),
  retrofit: mk({
    story: "Toshiba elevator retrofit solutions — add an elevator to existing buildings (older apartment blocks, townhouses), making the most of the existing structure with compact installation.",
    heritage: "Retrofit solutions that meet the need to upgrade older buildings.",
    technicalSpecs: [{ label: "Type", value: "Elevator retrofit" }, { label: "Applications", value: "Older apartment blocks and existing buildings" }, { label: "Advantages", value: "Makes the most of the existing structure with compact installation" }],
    whyChoose: [WHY, { icon: "🏗️", title: "For older buildings", desc: "Add an elevator to buildings that do not yet have one." }, { icon: "🧩", title: "Structure optimized", desc: "A solution that suits the existing space and structure." }],
    projectShowcase: ["Renovated older apartment blocks", "Upgraded townhouses"],
  }),
  freight: PASS, observation: PASS,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TOSHIBA_ELEVATOR_SERIES_META[seriesOriginal.trim()] || TOSHIBA_ELEVATOR_SERIES_META.passenger;
}
