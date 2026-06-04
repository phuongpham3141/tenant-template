/**
 * Bravat 贝朗 metadata — detail page. One shared brand meta for all groups.
 * Source: bravathcm.com (official Bravat Vietnam distributor) + bravat.com.
 * Bravat belongs to Roman Dietsche (Germany) — over 145 years of history (since 1873, Black Forest region).
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
    "Bravat (贝朗) is a premium sanitary ware brand belonging to Roman Dietsche — a German sanitary ware group with over 145 years of history, originating from a family workshop in the Black Forest region of Baden-Württemberg, Germany in 1873. Bravat offers complete bathroom solutions: faucets & showers, toilets, basins, bathtubs, glass shower enclosures, bathroom cabinets and accessories — positioned in the premium segment.",
  heritage:
    "Bravat is distributed across more than 10 markets (Germany, the US, China, Brazil, Australia, Singapore, Vietnam, Russia, Mexico). In Vietnam it has showrooms in Hanoi and Da Nang, together with an official distributor.",
  technicalSpecs: [
    { label: "Brand", value: "Bravat 贝朗 (Roman Dietsche, Germany)" },
    { label: "History", value: "Over 145 years (since 1873)" },
    { label: "Scope", value: "Faucets/showers, toilets, basins, bathtubs, cabinets, accessories" },
    { label: "Material", value: "Brass body, ceramic cartridge, premium plating" },
  ],
  manufacturing: [
    "Bravat belongs to the German group Roman Dietsche — over 145 years of sanitary ware experience",
    "Brass faucet bodies; durable Flush/Kerox ceramic cartridges",
    "Neoperl aerators, finishes in Chrome / gold / PVD brushed nickel / black",
    "A network of factories + R&D serving the global market",
  ],
  careGuide: [
    { title: "Surface cleaning", desc: "Wipe with a soft damp cloth; avoid strong/corrosive cleaners that damage the plating." },
    { title: "Valve maintenance", desc: "Ceramic valves are durable; if leaking, the cartridge can be replaced with a genuine part." },
    { title: "Aerator", desc: "Clean/replace the Neoperl aerator periodically to maintain an even, water-saving stream." },
  ],
  installation: [
    "Determine the installation type (deck-mounted, wall-mounted, on-counter, etc.) by the number of drilled holes",
    "Install by a professional; connect stainless steel supply hoses to the correct thread (G1/2, G3/4)",
    "Check the recommended water pressure (typically ~0.3MPa) and tightness",
    "Flush the pipework before installation to prevent debris from jamming the valve",
  ],
  certifications: [
    "International sanitary ware & faucet standards (per market)",
    "German brand Roman Dietsche — quality control to European standards",
    "Reference projects: Marriott, Hyatt Da Nang (Vietnam), Sber City",
  ],
  packaging: [
    { label: "Supply format", value: "By SKU / complete bathroom sets" },
    { label: "Included accessories", value: "Stainless steel supply hoses, aerators, mounting hardware (by SKU)" },
    { label: "Vietnam market", value: "Hanoi & Da Nang showrooms, official distributor" },
  ],
  whyChoose: [
    { icon: "🇩🇪", title: "German brand, 145+ years", desc: "Part of Roman Dietsche — German sanitary ware heritage since 1873." },
    { icon: "🛁", title: "Complete bathroom", desc: "From faucets/showers to toilets, basins, bathtubs, cabinets and accessories." },
    { icon: "💎", title: "Premium", desc: "Brass body, ceramic cartridge, durable attractive plating; with a Swarovski crystal-inlaid line." },
  ],
  projectShowcase: ["4-5 star hotels (Marriott, Hyatt Da Nang)", "Premium apartments & villas", "Resorts, spas", "Family homes"],
  faq: [
    { q: "What country is Bravat from?", a: "Bravat (贝朗) belongs to the German group Roman Dietsche, with over 145 years of history (since 1873). It has factories & a global distribution network." },
    { q: "Does Bravat sell in Vietnam?", a: "Yes. Bravat has showrooms in Hanoi and Da Nang plus an official distributor; contact Huayuesc for advice." },
    { q: "What is a Bravat faucet made of?", a: "Most faucet bodies are brass, using durable ceramic cartridges, with Chrome/gold/nickel/black finishes depending on the line." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
