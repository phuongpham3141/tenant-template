/**
 * Metadata MIJIC 民洁 (Guangdong Minjie Sanitary Ware) — shared brand meta.
 * Source: mijic.cn. Sanitary ware manufacturer since 1992, Guangdong.
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
    "Guangdong Minjie Sanitary Ware (广东民洁卫浴) is a sanitary ware manufacturer driven by the mission to build a national brand and create a cleaner world. Since its founding in 1992, Minjie has consistently delivered high-quality, user-friendly sanitary solutions. In 2002 it formally established its ceramic production base; in 2019 it carried out a comprehensive brand upgrade under the slogan that Minjie products are global products; and in 2022 it focused on human-centered sanitary ware.",
  heritage:
    "Minjie operates two modern ceramic factories (one of which has reached smart manufacturing standards) along with a factory dedicated to made-to-order bathroom cabinets, forming a complete production chain spanning ceramic sanitary ware, bathroom cabinets, and customized bathroom-space solutions.",
  technicalSpecs: [
    { label: "Brand", value: "Mijic 民洁 (Guangdong Minjie Sanitary Ware)" },
    { label: "Founded", value: "1992 (Guangdong)" },
    { label: "Products", value: "Smart and ceramic toilets, washbasins, faucets/showers, cabinets, bathtubs, glass shower enclosures" },
    { label: "Factories", value: "2 ceramic factories + 1 bathroom cabinet factory" },
  ],
  manufacturing: [
    "Guangdong Minjie Sanitary Ware (民洁卫浴) — since 1992",
    "Two modern ceramic factories (one at smart-manufacturing level)",
    "Dedicated made-to-order bathroom cabinet factory",
    "Complete product chain: ceramic sanitary ware + cabinets + bathroom-space solutions",
  ],
  careGuide: [
    { title: "Cleaning ceramics", desc: "Wipe the glazed surface with a soft cloth and a neutral cleaner; avoid abrasive powders and strong acids that scratch the glaze." },
    { title: "Smart toilets", desc: "Clean the wash nozzle and filter regularly; use a stable power supply and keep moisture away from the circuit board." },
    { title: "Faucets & showers", desc: "Clean the aerator and showerhead regularly to keep an even spray; wipe the plated finish with a damp cloth." },
  ],
  installation: [
    "Determine the mounting type by product (floor-mounted/wall-hung toilet, counter-top/pedestal washbasin, wall-hung cabinet, etc.)",
    "Install by a professional; smart toilets require a ground-fault outlet near the installation point",
    "Connect the water supply and drainage, check for leaks, and center the flush outlet at the correct distance from the wall",
    "Run a test of flushing, washing, and drying (for smart toilets) before handover",
  ],
  certifications: [
    "Participant in setting water-saving sanitary ware industry standards (reference)",
    "Glaze and materials meet hygiene and safety requirements",
    "Smart manufacturing at one of the ceramic factories",
  ],
  packaging: [
    { label: "Supply format", value: "Per SKU / complete bathroom set" },
    { label: "Product range", value: "Smart and ceramic toilets, washbasins, faucets/showers, cabinets, bathtubs, glass shower enclosures, accessories" },
    { label: "Customization", value: "Made-to-order bathroom cabinets and space solutions" },
  ],
  whyChoose: [
    { icon: "🚽", title: "Complete bathroom set", desc: "From smart and ceramic toilets to washbasins, faucets/showers, cabinets, bathtubs, and glass shower enclosures." },
    { icon: "🏭", title: "In-house manufacturing", desc: "2 ceramic factories + a dedicated cabinet factory for end-to-end quality control." },
    { icon: "✨", title: "Human-centered design", desc: "A people-first approach to sanitary ware, with continuous innovation since 1992." },
  ],
  projectShowcase: ["Residential bathrooms", "Hotels & apartments", "Residential & commercial projects", "Public restrooms"],
  faq: [
    { q: "What brand is Mijic?", a: "Mijic (广东民洁卫浴 / Guangdong Minjie) is a Chinese sanitary ware manufacturer founded in 1992, producing ceramic sanitary ware, bathroom cabinets, and bathroom-space solutions." },
    { q: "What product types does Mijic offer?", a: "Smart and ceramic toilets, washbasins (art/pedestal/counter-top), faucets and showers, stainless steel sinks, bathroom cabinets, bathtubs, glass shower enclosures, and accessories." },
    { q: "Does Mijic supply to Vietnam?", a: "Contact Huayuesc for advice on supplying Mijic sanitary ware for projects and dealers in Vietnam." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
