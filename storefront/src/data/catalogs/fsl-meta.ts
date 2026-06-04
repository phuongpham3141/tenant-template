/**
 * FSL 佛山照明 (Foshan Lighting) metadata — shared brand meta.
 * Source: chinafsl.com (international site). Major listed Chinese lighting maker, since 1958.
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
const BRAND: SeriesMeta = {
  story:
    "FSL (佛山照明 — Foshan Electrical and Lighting Co., Ltd.) was founded in 1958 in Foshan, Guangdong — one of the largest and longest-established lighting manufacturers in China, publicly listed. FSL operates 5 production bases, over 200 production lines and more than 10,000 employees, offering a full portfolio: residential, commercial, outdoor, industrial, automotive, specialty and smart lighting.",
  heritage:
    "A brand well known at home and abroad, serving more than 200 customers in around 80 countries. Products span LED bulbs, tubes/battens, downlights and panels through to floodlights, street lights and smart lighting solutions.",
  technicalSpecs: [
    { label: "Brand", value: "FSL 佛山照明 (Foshan Lighting)" },
    { label: "Founded", value: "1958 (Foshan, Guangdong)" },
    { label: "Scale", value: "5 production bases, 200+ lines, 10,000+ employees" },
    { label: "Scope", value: "Residential, commercial, outdoor, industrial, automotive, smart" },
  ],
  manufacturing: [
    "Foshan Electrical and Lighting Co., Ltd. (FSL) — listed, since 1958",
    "5 production bases + over 200 production lines in China",
    "In-house R&D and production of LED chips/modules, drivers and optics",
    "Exports to over 80 countries — large-scale quality control",
  ],
  careGuide: [
    { title: "LED lamps", desc: "Long lifespan, low maintenance; dust the surface periodically and keep indoor types away from moisture." },
    { title: "Outdoor lamps", desc: "IP65-66 types withstand the weather; still inspect gaskets & connectors periodically." },
    { title: "Installation", desc: "Use the correct driver/power supply for the wattage; ensure heat dissipation for floodlights/street lights." },
  ],
  installation: [
    "Choose the lamp type by application (recessed, surface-mounted, batten, floodlight, street light, etc.)",
    "Wired by an electrician; at the correct voltage (usually AC220-240V) and driver",
    "Recessed lamps use spring clips; floodlights/street lights need suitable brackets & heat dissipation",
    "Check the IP rating & water resistance for outdoor installation",
  ],
  certifications: [
    "Chinese/international lighting & electrical-safety standards (CE, etc.)",
    "Publicly listed company — large-scale quality management system",
    "IP65-66 protection rating for the outdoor range",
  ],
  packaging: [
    { label: "Supply format", value: "By SKU / by product line" },
    { label: "Product range", value: "Bulbs, tubes, downlights, panels, floodlights, street lights, smart, automotive" },
    { label: "Export", value: "Over 80 countries" },
  ],
  whyChoose: [
    { icon: "💡", title: "Major brand since 1958", desc: "One of China's largest and longest-established lighting makers, publicly listed." },
    { icon: "🏭", title: "Massive scale", desc: "5 production bases, 200+ lines, 10,000+ employees." },
    { icon: "🌍", title: "Comprehensive", desc: "From residential LED bulbs to street lights, automotive lamps and smart lighting." },
  ],
  projectShowcase: ["Homes & apartments", "Offices, retail, commercial", "Streets & urban lighting", "Factories, logistics, agriculture"],
  faq: [
    { q: "Who is FSL?", a: "FSL (佛山照明 Foshan Lighting) is a major Chinese lighting manufacturer, founded in 1958, publicly listed, exporting to over 80 countries." },
    { q: "Does FSL supply to Vietnam?", a: "Contact Huayuesc for advice on supplying FSL lighting for projects/dealers in Vietnam." },
    { q: "What lamp types does FSL offer?", a: "A full range: LED bulbs, tubes/battens, downlights, panels, floodlights, street lights, garden lights, switches/sockets, LED strips, smart lamps and specialty lamps." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
