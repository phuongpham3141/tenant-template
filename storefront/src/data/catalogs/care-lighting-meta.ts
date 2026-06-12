/**
 * Metadata for CareLighting (Zhejiang Xuguang / Kaier Lighting) — shared brand metadata.
 * Source: care-china.en.made-in-china.com. LED lighting manufacturer, listed on China's NEEQ board (839762).
 * Product range covers G45 LED bulbs, GX53 recessed/cabinet lights, downlights and spotlights, USB rechargeable emergency lamps, and more.
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
    "When night falls, the right light defines the warmth of a space. CareLighting is part of Zhejiang Xuguang Electronic Technology Co., Ltd. — a national-level high-tech enterprise that keeps R&D, manufacturing, sales, and service all under one roof. From a 45mm G45 mini bulb, to a slim GX53 downlight set into the ceiling, to a USB rechargeable emergency lamp that lights up automatically the moment the power cuts out, CareLighting has turned LED light into an everyday choice that can replace the traditional bulbs in millions of homes. The brand does not chase flashy shapes; instead, it focuses its energy on even light distribution, frugal power consumption, and long service life — so every kilowatt-hour shines with greater value.",
  heritage:
    "The company was listed on China's NEEQ board in 2016 (code 839762), and its Kaier Lighting label is a well-known Chinese LED lighting brand that earned a place among China's Top 10 Light Source Brands for four consecutive years. Backed by modern production facilities of more than 90,000 square meters and an annual capacity of roughly 100 million lighting units, CareLighting has built a distribution network spanning 26 provincial operations centers, more than 500 primary distribution points, and reaching over 100,000 retail outlets.",
  technicalSpecs: [
    { label: "Power", value: "G45 bulbs from 3W; GX53 recessed lights 5W / 7W / 9W; T-shaped corn bulbs 20W-50W" },
    { label: "Efficacy", value: "High-lumen SMD chip light sources, with whole-fixture efficacy typically 80-100 lm/W (depending on model)" },
    { label: "Color Temperature", value: "Available in warm white around 2700-3000K, natural white around 4000K, and cool white around 6000K" },
    { label: "Color Rendering Index (CRI)", value: "Ra greater than 80; eye-friendly flicker-free models reproduce true object colors more faithfully" },
    { label: "IP Rating", value: "Indoor models rated IP20; outdoor emergency versions offer a degree of moisture and splash resistance" },
    { label: "Rated Lifespan", value: "Approximately 25,000-30,000 hours, sparing you the hassle of frequent bulb replacement" },
  ],
  manufacturing: [
    "Zhejiang Xuguang Electronic Technology (CareLighting / Kaier Lighting) owns modern production facilities of more than 90,000 square meters, with an annual capacity of roughly 100 million LED lighting units",
    "Multiple production lines for G45 bulbs, GX53 recessed lights, downlights, spotlights, and emergency lamps run in parallel; SMD chip mounting, potting, aging, and color binning are all completed in-house",
    "A cumulative 122 patent applications, of which 82 have been granted; certified to ISO 9001:2015 quality and ISO 14001:2015 environmental management systems",
    "The thermal structure of the aluminum housing and plastic/PC diffuser is optimized through thermal simulation and paired with a matched constant-current driver to ensure flicker-free operation and long service life",
    "Every unit undergoes a 100% power-on sampling inspection before leaving the factory, along with high-temperature aging tests to weed out early failures and ensure batch-to-batch consistency",
  ],
  careGuide: [
    { title: "Routine Cleaning", desc: "After switching off the power, wipe dust from the fixture with a dry or slightly damp soft cloth; keep indoor fixtures away from moisture and never rinse them directly with water." },
    { title: "Choose the Right Base", desc: "Before replacing a bulb, confirm the socket type (E27 / E14 / B22 / GX53) and that the wattage matches; never touch the metal base with wet hands during installation or replacement." },
    { title: "Rechargeable Emergency Models", desc: "Fully charge via USB before first use; we recommend a full charge-discharge cycle at regular intervals to maintain battery capacity and emergency reliability." },
    { title: "Heat Dissipation Environment", desc: "Avoid running high-power fixtures at full load for extended periods inside sealed, non-ventilated enclosures; leaving room for heat dissipation can significantly extend service life." },
  ],
  installation: [
    "Select a matching bulb or fixture based on the base type and rated power of your existing socket, and avoid operating above rated wattage",
    "For GX53 recessed/surface-mount cabinet lights, prepare the cut-out to the standard GX53 opening dimensions, then twist into place and gently snap to secure",
    "Wire at the correct voltage (typically AC220-240V); dimmable models must be paired with a compatible dimmer, and non-dimmable models must not be connected to a dimming circuit",
    "When installing recessed downlights/spotlights, correctly distinguish live and neutral wires, and ensure reliable grounding for metal-housing models",
    "Provide good heat dissipation and ventilation for high-power fixtures, and route in-ceiling wiring away from high heat and sharp edges",
  ],
  certifications: [
    "Certified to the ISO 9001:2015 quality management system and the ISO 14001:2015 environmental management system",
    "Complete fixtures for the domestic market meet CCC mandatory product certification requirements; export series are certified to CE, RoHS, ERP, and more",
    "Meets LED energy efficiency grade requirements — energy-saving and power-efficient, satisfying green lighting procurement standards",
    "Passed LED photobiological safety assessment; flicker-free / low-flicker models effectively reduce visual fatigue",
    "Holds high-tech enterprise qualification and is listed on China's NEEQ board (code 839762), providing complete-fixture warranty service",
  ],
  packaging: [
    { label: "Supply Options", value: "Standard packaging by SKU or custom packaging (OEM/ODM); G45 bulbs support custom color boxes" },
    { label: "Product Line", value: "G45 LED bulbs, T-shaped corn bulbs, GX53 recessed/cabinet lights, downlights and spotlights, USB rechargeable emergency lamps" },
    { label: "Base/Interface", value: "E27 / E14 / B22 / GX53 (depending on SKU); emergency models come with a USB charging port" },
    { label: "Protection", value: "Individual color boxes with cushioning inserts, and partitioned master cartons that resist crushing to reduce breakage on long-distance shipping" },
    { label: "Samples", value: "Sample lamps are available for trial installation — confirm light color and brightness before placing a bulk order" },
  ],
  whyChoose: [
    { icon: "💡", title: "Well-Known LED Brand", desc: "Kaier Lighting earned a place among China's Top 10 Light Source Brands for four consecutive years, with a quality reputation proven in the market." },
    { icon: "🏭", title: "Scale Manufacturing", desc: "Over 90,000 square meters of facilities and an annual capacity of roughly 100 million units, with stable lead times through direct factory supply." },
    { icon: "✅", title: "Comprehensive Certification", desc: "ISO 9001/14001 systems, plus CCC and CE/RoHS/ERP export certifications — energy-efficient and compliant." },
    { icon: "🌙", title: "Eye-Friendly & Flicker-Free", desc: "High CRI paired with a constant-current driver delivers soft, stable light that is easy on the eyes for long viewing and renders true colors." },
    { icon: "🔋", title: "Uninterrupted in Emergencies", desc: "USB rechargeable emergency bulbs light up automatically during a power outage — ideal for outdoor camping and areas with frequent blackouts." },
  ],
  projectShowcase: [
    "Main and decorative lighting retrofits for homes and apartments",
    "Recessed ceiling and point-source lighting for living rooms, bedrooms, and offices",
    "Slim GX53 accent lighting for cabinets, display cases, and shelving",
    "Emergency backup lighting for blackout-prone areas and outdoor camping",
  ],
  faq: [
    { q: "What kind of brand is CareLighting (Kaier)?", a: "It is the LED lighting brand of Zhejiang Xuguang Electronic Technology, a high-tech enterprise listed on China's NEEQ board (839762) that has been named one of China's Top 10 Light Source Brands." },
    { q: "What types of fixtures are available?", a: "They include G45 LED bulbs (E27/E14/B22), T-shaped high-power corn bulbs, GX53 recessed/cabinet lights, downlights and spotlights, and USB rechargeable emergency LED bulbs." },
    { q: "How do I choose between dimmable and non-dimmable GX53 lights?", a: "If you need to adjust brightness with a dimmer, choose the dimmable model and pair it with a compatible dimmer; for a standard switch circuit, the non-dimmable model is fine. Never connect a non-dimmable light to a dimming circuit." },
    { q: "How long do the fixtures last?", a: "The rated lifespan is approximately 25,000-30,000 hours, reaching several years under normal use; ensuring good heat dissipation and avoiding frequent on/off switching can extend service life further." },
    { q: "Do you supply to Vietnam?", a: "Please contact Huayuesc Supply Chain to inquire about supplying CareLighting fixtures to Vietnamese projects and distributors, including pricing." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
