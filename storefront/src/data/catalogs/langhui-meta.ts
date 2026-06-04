/**
 * Langhui 朗辉建材 (Guangdong Langhui Building Material Technology) metadata — shared brand meta.
 * Source: gdlanghui.com. Manufacturer of ALC/AAC autoclaved aerated concrete panels, Foshan – Gaoming.
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
    "Guangdong Langhui Building Material Technology Co., Ltd. (朗辉建材) is located in the key industrial development zone of Gaoming, Foshan — a modern production base of around 246 acres with total investment of roughly RMB 420 million. Langhui operates an advanced autoclaved aerated concrete panel production line and process, among the leading in China, and has achieved mass production of ultra-thin ALC/AAC wall panels.",
  heritage:
    "Langhui's ultra-thin ALC/AAC panels are widely used in lightweight steel-frame projects in Australia, Japan and South Korea, and have been exported in large volumes. Langhui's AAC roof panels offer high load capacity, good fire resistance and thermal insulation; the company sits at the heart of the Greater Bay Area.",
  technicalSpecs: [
    { label: "Brand", value: "Langhui 朗辉 (Guangdong Langhui Building Material)" },
    { label: "Products", value: "ALC/AAC wall/floor/roof panels, aerated concrete blocks" },
    { label: "Facility", value: "~246 acres (Gaoming, Foshan), investment ~RMB 420 million" },
    { label: "Properties", value: "Lightweight, high strength, fire-resistant, sound and thermal insulation" },
  ],
  manufacturing: [
    "Guangdong Langhui Building Material Technology (朗辉建材) — Gaoming, Foshan",
    "Advanced autoclaved aerated concrete panel production line; mass production of ultra-thin ALC/AAC panels",
    "Leverages Greater Bay Area advantages in manufacturing, logistics and engineering",
    "Exports ALC panels to Australia, Japan, South Korea and more",
  ],
  careGuide: [
    { title: "Storage", desc: "Store panels in a dry place on level supports, avoiding edge impacts and moisture ingress during warehousing." },
    { title: "Construction", desc: "Cut/drill with appropriate tools; use mortar/adhesive made for ALC panels." },
    { title: "Finishing", desc: "Apply thin plaster/skim coat suited to ALC surfaces; treat joints properly to prevent cracking." },
  ],
  installation: [
    "Identify the panel type by location: partition wall, exterior wall, floor, roof, fire-rated wall",
    "Assemble onto the framing/steel structure; connect with specialized fittings and adhesive",
    "Treat joints and connection points to ensure sound insulation, fire resistance and crack prevention",
    "Finish the surface (thin plaster/skim coat) per project requirements",
  ],
  certifications: [
    "Autoclaved aerated concrete panels to ALC/AAC standards",
    "Fire-resistance and load-bearing properties for floor/roof panels",
    "Products exported to Australia, Japan and Korea — meeting international market requirements",
  ],
  packaging: [
    { label: "Supply format", value: "By panel/specification, delivered per project" },
    { label: "Specifications", value: "Multiple thicknesses (e.g. 50/75mm) by agreement" },
    { label: "Application", value: "Walls, floors, roofs, fire-rated walls" },
  ],
  whyChoose: [
    { icon: "🧱", title: "ALC/AAC specialist", desc: "Advanced production line, mass production of ultra-thin panels." },
    { icon: "🔥", title: "Fire-resistant, lightweight", desc: "Lightweight, high strength, fire-resistant, with good sound and thermal insulation." },
    { icon: "🌏", title: "Export", desc: "Used in steel-frame projects in Australia, Japan and Korea." },
  ],
  projectShowcase: ["Lightweight steel-frame buildings", "Office towers and factories needing lightweight partitions", "Projects requiring fire resistance/sound insulation", "Prefabricated walls, floors and roofs"],
  faq: [
    { q: "What are Langhui's ALC/AAC panels?", a: "They are autoclaved lightweight concrete (ALC) panels — lightweight, high strength, fire-resistant, with sound and thermal insulation, used for prefabricated walls/floors/roofs." },
    { q: "What panel types are available?", a: "Ultra-thin wall panels, floor & roof panels, AAC blocks, fire-rated walls and wallboard — in various thicknesses on request." },
    { q: "Does Langhui supply to Vietnam?", a: "Contact Huayuesc for advice on supplying Langhui ALC/AAC panels for projects in Vietnam." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
