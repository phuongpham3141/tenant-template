/**
 * Guangri 广日电梯 metadata — detail pages. Keyed by seriesOriginal (home-cabin/home-elevator/escalator).
 * Sourcing: guangri.com.cn — Guangzhou Guangri Elevator (广州广日电梯).
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
const CERTS = ["Chinese national elevator safety standard (GB 7588)", "ISO 9001 quality management", "Elevator safety inspection & acceptance testing", "Installation & maintenance certification"];
const MFG = [
  "Guangri 广日电梯 (Guangzhou) — one of China's major elevator manufacturers",
  "Product range: passenger elevators, home elevators, escalators & moving walkways, freight, medical, and firefighting elevators",
  "Nationwide installation, maintenance & technical service network",
  "Many premium cabin design options for home elevators",
];
const PACK = [
  { label: "Supply format", value: "Complete elevator + installation per project" },
  { label: "Cabin options", value: "Many cabin interior design styles" },
  { label: "Services", value: "Survey, installation, maintenance, modernization" },
];
const INSTALL = [
  "Survey the pit, travel height, and load capacity before selecting a configuration",
  "Installed by trained technicians; safety acceptance per standards",
  "Connect electrical wiring, the rescue system, and door interlocks correctly",
  "Run a test and safety inspection before putting into service",
];
const CARE = [
  { title: "Scheduled maintenance", desc: "Maintenance on schedule (typically monthly): check cables/rails, brakes, doors, the control system, and lubrication." },
  { title: "Safety", desc: "Periodic safety inspection per regulations; address any operating anomaly immediately." },
  { title: "Cabin cleaning", desc: "Clean cabin surfaces with a solution suited to the material (stainless steel/glass/wood)." },
];
const FAQ = [
  { q: "Does Guangri provide installation & maintenance in Vietnam?", a: "Contact Huayuesc for advice on the supply, installation, and technical service plan that fits your project." },
  { q: "Are custom cabin designs available?", a: "Yes — many premium cabin styles are available; we can advise on the selection to match the project's interior style." },
  { q: "Lead time & installation?", a: "Depends on configuration & scope; a specific schedule is quoted based on the on-site survey." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🛗", title: "Major elevator brand", desc: "Guangri — a reputable Chinese elevator manufacturer with a complete product range." };
export const GUANGRI_SERIES_META: Record<string, SeriesMeta> = {
  "home-cabin": mk({
    story: "Guangri home elevator cabin designs — a collection of premium cabin interiors (Roman, Gothic, Verdant Waters, and more) for villa & townhouse elevators, elevating the aesthetics of the space.",
    heritage: "The cabin design is the centerpiece of a home elevator — Guangri offers many decorative styles.",
    technicalSpecs: [{ label: "Type", value: "Home elevator cabin" }, { label: "Style", value: "Many designs: classic, modern, artistic" }, { label: "Material", value: "Premium decorative stainless steel/glass/wood" }],
    whyChoose: [WHY, { icon: "🎨", title: "Diverse styles", desc: "Many cabin designs to match any interior." }, { icon: "💎", title: "Premium", desc: "Luxurious materials & finishes for villas." }],
    projectShowcase: ["Upscale villas & townhouses", "Penthouses", "Multi-story residential projects"],
  }),
  "home-elevator": mk({
    story: "Guangri home elevators — an elevator solution for villas and townhouses: smooth operation, energy efficient, small footprint, with many cabin options.",
    heritage: "Home elevators are a fast-growing line meeting the needs of multi-story homes.",
    technicalSpecs: [{ label: "Type", value: "Home elevator" }, { label: "Application", value: "Villas, townhouses" }, { label: "Advantages", value: "Smooth, efficient, small footprint" }],
    whyChoose: [WHY, { icon: "🏡", title: "For homes", desc: "Compact design that fits small in-home hoistways." }, { icon: "🔇", title: "Smooth operation", desc: "Smooth drive technology, energy efficient." }],
    projectShowcase: ["Villas", "Multi-story townhouses", "Family homes"],
  }),
  escalator: mk({
    story: "Guangri automatic escalators & moving walkways — for shopping malls, metro stations, airports, and high-traffic public buildings.",
    heritage: "Escalators & moving walkways are Guangri's core public-transit line.",
    technicalSpecs: [{ label: "Type", value: "Escalator / automatic moving walkway" }, { label: "Application", value: "Malls, train stations, airports, public spaces" }, { label: "Features", value: "High capacity, safe continuous operation" }],
    whyChoose: [WHY, { icon: "🏬", title: "For large projects", desc: "Handles high traffic at malls, stations, and airports." }, { icon: "🛡️", title: "Safety", desc: "Safety and emergency-stop systems per standards." }],
    projectShowcase: ["Shopping malls", "Metro stations & airports", "Public buildings"],
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return GUANGRI_SERIES_META[seriesOriginal.trim()] || GUANGRI_SERIES_META["home-cabin"];
}
