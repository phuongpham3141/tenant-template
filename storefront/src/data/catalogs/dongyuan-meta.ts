/**
 * Dongyuan 东原厨具 (Guangdong Dongyuan Kitchenware) metadata — shared brand meta.
 * Source: dongyuan.en.made-in-china.com. Manufacturer of 304 stainless steel sinks, since 1993, Shunde – Foshan.
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
    "Guangdong Dongyuan Kitchenware Industrial Co., Ltd. (东原厨具) was founded in 1993, with a factory of around 25,000 m² in Shunde district, Foshan — a key industrial area of the Pearl River Delta. Dongyuan specializes in stainless steel kitchen sinks, kitchen cabinets and sanitary ware; all products use premium imported, corrosion-resistant stainless steel sheet.",
  heritage:
    "More than 30 years of experience, a team of 400+ skilled workers and an in-house tooling design group. Core products: SUS 304 stainless steel sinks (undermount/topmount, single/double, handmade), with export certifications (UPC, CSA).",
  technicalSpecs: [
    { label: "Brand", value: "Dongyuan 东原 (Guangdong Dongyuan Kitchenware)" },
    { label: "Founded", value: "1993 (Shunde, Foshan)" },
    { label: "Products", value: "SUS 304 stainless steel sinks, kitchen cabinets" },
    { label: "Factory", value: "~25,000 m², 400+ workers" },
  ],
  manufacturing: [
    "Guangdong Dongyuan Kitchenware (东原厨具) — since 1993, Shunde, Foshan",
    "Specializes in stainless steel sinks: undermount, topmount, handmade",
    "Uses imported SUS 304 stainless steel sheet, corrosion-resistant; has an in-house tooling design group",
    "Holds export certifications (UPC, CSA) — serving international markets",
  ],
  careGuide: [
    { title: "Cleaning", desc: "Wipe with a soft cloth and neutral detergent; avoid metal scouring pads that scratch the stainless surface." },
    { title: "Stain prevention", desc: "Dry after use to prevent water spots; periodically use a dedicated stainless steel cleaner." },
    { title: "Drainage", desc: "Clean the strainer basket & trap regularly for good drainage and to avoid clogs." },
  ],
  installation: [
    "Choose the mounting style for your countertop: undermount, topmount or flushmount",
    "Cut the countertop opening to the correct sink size; use dedicated adhesive & support clips",
    "Install the faucet, drain pipe and trap; check for water tightness",
    "For undermount sinks: ensure the stone countertop is thick enough and reinforce the support to bear the weight",
  ],
  certifications: [
    "SUS 304 stainless steel — food-contact material standard",
    "UPC / CSA export certifications",
    "Quality control for international markets",
  ],
  packaging: [
    { label: "Supply format", value: "By sink SKU" },
    { label: "Type", value: "Undermount / topmount / handmade, single & double" },
    { label: "Material", value: "Imported SUS 304 stainless steel" },
  ],
  whyChoose: [
    { icon: "🥘", title: "Sink specialist", desc: "Over 30 years dedicated to manufacturing stainless steel kitchen sinks." },
    { icon: "🛡️", title: "304 stainless steel", desc: "Imported SUS 304 sheet, corrosion-resistant, durable and attractive." },
    { icon: "🌍", title: "Export-grade", desc: "UPC/CSA certified, serving multiple markets." },
  ],
  projectShowcase: ["Home kitchens", "Apartments & townhouses", "Commercial kitchens, restaurants", "Kitchen interior projects"],
  faq: [
    { q: "What material are Dongyuan sinks made of?", a: "Mainly imported SUS 304 stainless steel — corrosion-resistant and food-contact safe." },
    { q: "Do you offer undermount and topmount types?", a: "Yes, the full range: undermount, topmount, handmade, single and double." },
    { q: "Does Dongyuan supply to Vietnam?", a: "Contact Huayuesc for advice on supplying Dongyuan sinks for projects/dealers in Vietnam." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
