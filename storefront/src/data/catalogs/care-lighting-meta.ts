/**
 * CareLighting 开尔照明 (Zhejiang Xuguang / Kaier Lighting) metadata — shared brand meta.
 * Source: care-china.en.made-in-china.com. LED lighting manufacturer, listed on the New Third Board (839762).
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
    "CareLighting (开尔照明) belongs to Zhejiang Xuguang Electronic Technology Co., Ltd. — a high-tech enterprise integrating R&D, manufacturing, sales and service of LED lighting and home appliances. The company was listed on the New Third Board in 2016 (code 839762); the 'Kaier Lighting' brand is a well-known LED lighting brand in China, with products spanning 5 areas: traffic/general lighting, residential, commercial, integrated devices and electrical equipment.",
  heritage:
    "Over 90,000 m² of modern production facilities, with a capacity of around 100 million LED light sets per year. Honored as one of China's 'Top 10 Light Source Brands' for 4 consecutive years; a network of 26 provincial-level operation centers, 500+ tier-1 distributors, covering more than 100,000 retail points.",
  technicalSpecs: [
    { label: "Brand", value: "CareLighting 开尔照明 (Kaier / Zhejiang Xuguang)" },
    { label: "Listing", value: "New Third Board 2016 (code 839762)" },
    { label: "Products", value: "LED bulbs, GX53/recessed lamps, emergency lights" },
    { label: "Capacity", value: "~100 million light sets/yr, 90,000 m² facility" },
  ],
  manufacturing: [
    "Zhejiang Xuguang Electronic Technology (开尔照明 / Kaier Lighting)",
    "Modern facility >90,000 m², capacity ~100 million LED light sets/yr",
    "122 patent applications (82 granted); ISO 9001:2015 & ISO 14001:2015",
    "China's 'Top 10 Light Source Brands' for 4 consecutive years",
  ],
  careGuide: [
    { title: "LED lamps", desc: "Long lifespan, low maintenance; dust the surface periodically and keep indoor types away from moisture." },
    { title: "Lamp base", desc: "Fit the correct base (E27/E14/B22/GX53); don't touch with wet hands when changing bulbs." },
    { title: "Rechargeable/emergency types", desc: "Fully charge before first use; periodically discharge-recharge to maintain battery life." },
  ],
  installation: [
    "Choose the bulb/lamp by base and wattage matching the existing fixture",
    "GX53 recessed/cabinet lamps: install to the standard GX53 cutout",
    "Wire at the correct voltage (usually AC220-240V); use a suitable driver/power supply",
    "Ensure adequate heat dissipation for high-power lamps",
  ],
  certifications: [
    "ISO 9001:2015 (quality) & ISO 14001:2015 (environment)",
    "CE certification for the export range",
    "High-tech enterprise, listed on the New Third Board (839762)",
  ],
  packaging: [
    { label: "Supply format", value: "By SKU / custom packaging (OEM)" },
    { label: "Product range", value: "G45 bulbs, GX53 lamps, downlights, emergency lights" },
    { label: "Lamp base", value: "E27 / E14 / B22 / GX53 (by SKU)" },
  ],
  whyChoose: [
    { icon: "💡", title: "Major LED brand", desc: "Kaier Lighting — China's 'Top 10 Light Source' for 4 consecutive years, publicly listed." },
    { icon: "🏭", title: "Large scale", desc: "90,000 m² facility, ~100 million light sets/yr." },
    { icon: "✅", title: "International standards", desc: "ISO 9001/14001, numerous patents, CE-certified for export." },
  ],
  projectShowcase: ["Homes & apartments", "Offices, living rooms", "Kitchen cabinets, display cabinets (GX53 lamps)", "Retail & commercial"],
  faq: [
    { q: "Who is CareLighting (Kaier)?", a: "It is the LED lighting brand 开尔照明 of Zhejiang Xuguang Electronic, a high-tech enterprise listed on the New Third Board (839762), one of China's 'Top 10 Light Source' brands." },
    { q: "What lamp types are available?", a: "G45 LED bulbs (E27/E14/B22), GX53 recessed/cabinet lamps, downlights and USB-rechargeable emergency lights." },
    { q: "Does it supply to Vietnam?", a: "Contact Huayuesc for advice on supplying CareLighting products for projects/dealers in Vietnam." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
