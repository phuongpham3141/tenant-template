/**
 * LINVOL metadata — rich content for product detail pages. Keyed by seriesOriginal (villa/retrofit/escalator/passenger).
 * Source: linvol.midea.com.cn — the official elevator brand of the Midea Group (Midea Building Technologies).
 * Manufacturer: Lingwang Elevator Co., Ltd. Service hotline: 400-700-7722.
 * Technical specifications reflect typical industry ranges and are intended as engineering-selection references only;
 * the final configuration is determined by the on-site survey and the official quotation.
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
  "Special Equipment Manufacturing License — elevators are nationally regulated special equipment, and LINVOL produces under license, with complete units and components all within the regulatory catalog",
  "Compliant with elevator supervisory and periodic inspection rules (TSG 7001) — manufacturing, installation, modernization, and maintenance are all covered by the inspection regime",
  "Compliant with the national standard for elevator manufacturing and installation safety (GB 7588) — covering the traction machine, overspeed governor, safety gear, buffers, and other safety components",
  "Home elevators built to the new standard GB/T 21739-2025 — villa and residential models designed and manufactured to the current national standard",
  "Quality management system established to Midea Group standards — design, production, testing, and delivery are controlled and fully traceable end to end",
];

const MFG = [
  "LINVOL — the official elevator brand of the Midea Group (a Fortune Global 500 company), operating under Midea Building Technologies",
  "Manufacturer: Lingwang Elevator Co., Ltd. — decades of expertise in complete-unit elevator manufacturing, with strengths further elevated after joining the Midea ecosystem",
  "Backed by Midea's digital elevator R&D center and Foshan industrial-park factory, with key components developed and produced in-house and integrated control of the traction machine and control system",
  "In-house permanent-magnet synchronous gearless traction machines — highly efficient, energy-saving, smooth-running, and low-noise, forming the core of an efficient and comfortable experience",
  "Digital technology and AI run through every stage: design, production, customization, R&D, operation, and maintenance, with each unit individually commissioned and safety-tested before leaving the factory",
];

const PACK = [
  { label: "Supply format", value: "Complete elevator system (car, traction system, control cabinet, door operator, guide rails, and more) shipped as an engineered package" },
  { label: "Customization", value: "Car finishes, door-opening configuration, control panel, and signaling system tailored to the project's hoistway and floors" },
  { label: "Transit protection", value: "Precision components reinforced in wooden crates or frames, car walls and door panels film-wrapped against scratches, and pallets shrink-wrapped for shipment" },
  { label: "Service", value: "A steward-plus-expert model — lifetime warranty plus maintenance, service hotline 400-700-7722" },
  { label: "Samples", value: "Car finish color swatches and configuration proposals available, with style and features confirmed before the engineering order is placed" },
];

const INSTALL = [
  "Survey the hoistway before installation: pit depth, top-floor headroom, travel height, clear hoistway dimensions, and number of floors, and verify the load and speed selection",
  "A licensed installation team mobilizes on-site to assemble the guide rails, traction machine, car, and counterweight per drawings, following special-equipment installation codes throughout",
  "Properly connect the power supply, control wiring, door-interlock circuits, and power-failure emergency rescue device to ensure safe power supply and grounding",
  "Commission the overspeed governor, safety gear, buffers, and other safety components, and verify leveling accuracy, running speed, and door open/close timing",
  "Complete no-load and full-load test runs before commissioning, and hand over for passenger use only after passing inspection-authority acceptance",
];

const CARE = [
  { title: "Scheduled maintenance", desc: "The steward-plus-expert model carries out planned inspections, checking the steel ropes and guide rails, permanent-magnet traction machine, brake, door system, and control cabinet to ensure reliable operation." },
  { title: "Digital monitoring", desc: "Digital technology and AI support remote monitoring of operating status, providing early warnings for anomalies in the door operator, leveling, vibration, and more, resolving faults before they occur." },
  { title: "Safety inspection", desc: "Coordinate periodic inspections per TSG rules, replacing safety components as they reach end of life; in the event of an operating anomaly, the elevator is stopped immediately for diagnosis and never run while compromised." },
  { title: "Cleaning and upkeep", desc: "Keep the car, door guide shoes, light curtain, and call boxes clean, and regularly lubricate the guide rails to extend component life and ride comfort." },
];

const FAQ = [
  { q: "Is LINVOL a Midea brand?", a: "Yes. LINVOL is the official elevator brand of the Midea Group (a Fortune Global 500 company), operating under Midea Building Technologies, with Lingwang Elevator Co., Ltd. as the manufacturer." },
  { q: "What drive does the elevator use? Is it energy-efficient?", a: "It uses a permanent-magnet synchronous gearless traction machine, which is more efficient, quieter, and more energy-saving than traditional geared models, while intelligent group control further reduces standby and operating energy consumption." },
  { q: "How is elevator safety ensured?", a: "Every unit complies with the GB 7588 safety code and is equipped with an overspeed governor, safety gear, buffers, and a power-failure emergency rescue device, and is brought into the manufacturing, installation, and periodic inspection regime per TSG rules." },
  { q: "Are installation and maintenance available in Vietnam?", a: "Please contact Huayue for a consultation on elevator supply, installation, and technical maintenance solutions suited to your project; we will provide selection recommendations based on your hoistway and floor conditions." },
  { q: "What is the warranty policy?", a: "LINVOL uses a steward-plus-expert full-lifecycle model — lifetime warranty plus maintenance, service hotline 400-700-7722, safeguarding safe elevator operation over the long term." },
];

function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}

const WHY_BRAND = { icon: "🛗", title: "Midea brand", desc: "LINVOL — the official elevator of the Midea Group (a Fortune Global 500 company), with the backing of a major manufacturer and quality you can trust." };
const WHY_DIGITAL = { icon: "🤖", title: "Digitally empowered", desc: "Digital technology and AI run through the entire elevator lifecycle, with remote monitoring and early anomaly warnings for smarter, more reassuring operation." };

export const LINVOL_SERIES_META: Record<string, SeriesMeta> = {
  villa: mk({
    story:
      "The LINVOL villa elevator brings the scale of home into every ride — the car and components are comprehensively redesigned, with a compact structure that maximizes use of the hoistway, so even a modest home can comfortably accommodate an elevator. Permanent-magnet synchronous drive delivers near-silent, smooth operation, so coming home is no longer interrupted by mechanical noise; the stylish car design and rich customization options blend seamlessly with the interior decor, becoming a piece of furniture in the entryway. It is more than a means to travel between floors — it is a member of the family that lightens the load for parents, watches over children, and adds a measure of ease to daily life. With the support of the Midea Group, LINVOL is growing into a home elevator brand of choice.",
    heritage:
      "Home elevators are a priority series for LINVOL, with every unit built to the new home elevator standard GB/T 21739-2025 and superior configuration parameters across many specifications. Backed by the R&D system of Midea Building Technologies, it brings the engineering capability and quality standards of a major manufacturer into the villas and low-rise homes of countless families.",
    technicalSpecs: [
      { label: "Rated load", value: "Approx. 250 – 400kg (2 – 5 persons, customized to layout and hoistway)" },
      { label: "Running speed", value: "Approx. 0.3 – 0.4m/s (smooth low-speed range for home use)" },
      { label: "Drive type", value: "Permanent-magnet synchronous gearless traction (low-noise, energy-saving, smooth-running)" },
      { label: "Control system", value: "Microprocessor variable-frequency speed control, with precise leveling and gentle start/stop" },
      { label: "Applicable floors", value: "2 – 6 floors (villas, townhouses, and premium low-rise homes)" },
      { label: "Customization scope", value: "Extensive options for car finishes, door-opening configuration, control panel, and signaling" },
    ],
    whyChoose: [
      WHY_BRAND,
      { icon: "🏡", title: "Built for homes", desc: "A compact structure maximizes use of the indoor hoistway, so even small hoistways can be fitted comfortably." },
      { icon: "🎨", title: "Customizable", desc: "The car and exterior offer extensive options to match your interior decor style, blending seamlessly with the home." },
      { icon: "🤫", title: "Quiet and smooth", desc: "Permanent-magnet synchronous drive runs quietly, so traveling between floors doesn't disturb the family's rest." },
      WHY_DIGITAL,
    ],
    projectShowcase: ["Detached villas and self-built homes", "Multi-story townhouses", "Premium duplexes and upgraded homes"],
  }),
  retrofit: mk({
    story:
      "The LINVOL retrofit elevator is purpose-built for older buildings without elevators — it weaves the latest digital technology and human-centered design into an add-on elevator, finally bringing the dignity of one-touch home access to long-established communities that have climbed stairs for decades. Addressing the reality of cramped hoistways and structural constraints in older buildings, the solution excels with compact models and flexible layouts, minimizing disruption to existing residents. Permanent-magnet synchronous drive is energy-saving and smooth-running for worry-free long-term use; a spacious, low-threshold car with clear voice prompts and buttons is especially friendly to seniors and families traveling with children. It solves more than the physical height of the climb — it reflects a city's warmth toward its elders and its people.",
    heritage:
      "The retrofit series responds to the public need to add elevators to aging apartments and walk-up buildings — giving existing structures a brand-new elevator is a key part of urban renewal and age-friendly upgrades. Drawing on the engineering capability of Midea Building Technologies, LINVOL brings reliability and dignity to every older building.",
    technicalSpecs: [
      { label: "Rated load", value: "Approx. 320 – 630kg (4 – 8 persons, customized to building and hoistway)" },
      { label: "Running speed", value: "Approx. 0.4 – 1.0m/s (matched to floor height)" },
      { label: "Drive type", value: "Permanent-magnet synchronous gearless traction (energy-saving, minimal machine-room footprint)" },
      { label: "Control system", value: "Variable-frequency speed control plus power-failure emergency rescue, with precise leveling and stable start/stop" },
      { label: "Applicable floors", value: "5 – 9 floors (primarily retrofits for aging low-rise homes)" },
      { label: "Adaptation features", value: "Compact models and flexible layouts that fit cramped hoistways and existing structures" },
    ],
    whyChoose: [
      WHY_BRAND,
      { icon: "🏢", title: "Built for older buildings", desc: "Designed to add elevators to existing low-rise homes, compact and flexible to fit cramped hoistways." },
      { icon: "👵", title: "Age-friendly and human-centered", desc: "A low-threshold, spacious car with clear buttons and voice prompts serves seniors and families with children." },
      { icon: "⚡", title: "Energy-saving", desc: "Permanent-magnet synchronous drive draws low energy, lowering operating costs for older communities over the long term." },
      WHY_DIGITAL,
    ],
    projectShowcase: ["Elevator retrofits for aging low-rise homes", "Age-friendly upgrades for senior communities", "Urban renewal and existing-building retrofit projects"],
  }),
  escalator: mk({
    story:
      "The LINVOL escalator is built for ceaseless streams of people — weekends at the shopping mall, the morning rush at the subway station, the torrent of travelers at the airport. With a precision truss structure and robust transmission, it turns tens of thousands of steps into smooth, effortless ascents and descents. The steps and comb plates mesh perfectly, the handrail moves in sync with the steps as one, and every step feels stable, secure, and seamless. Intelligent sensing slows the unit to standby when no one is present and instantly accelerates when riders arrive — both energy-saving and considerate; comprehensive safety protection and emergency stopping provide a backstop for high-traffic settings. It is the quietest and most reliable backbone of capacity in large public spaces.",
    heritage:
      "The escalator is LINVOL's product series for high-traffic public-transit and commercial settings, with every unit built to national elevator safety codes. Backed by the manufacturing system of Midea Building Technologies, it brings commercial-grade durability and stability to stations, airports, and mixed-use complexes.",
    technicalSpecs: [
      { label: "Rated capacity", value: "Approx. 6000 – 9000 persons/hour (by step width and speed)" },
      { label: "Running speed", value: "Approx. 0.5 – 0.65m/s (common speed range for public spaces)" },
      { label: "Drive type", value: "Permanent-magnet synchronous drive plus intelligent variable frequency, slowing to save energy when unoccupied" },
      { label: "Inclination angle", value: "Approx. 30 – 35 degrees (customized to rise height and site)" },
      { label: "Applicable settings", value: "Shopping malls, stations, airports, and other high-traffic public spaces" },
      { label: "Safety features", value: "Comb-plate protection, anti-reversal, emergency-stop buttons, skirt brushes, and other multi-layer safeguards" },
    ],
    whyChoose: [
      WHY_BRAND,
      { icon: "🏬", title: "Built for large projects", desc: "Meets the continuous high-traffic operating demands of shopping malls, stations, and airports." },
      { icon: "🛡️", title: "Multi-layer safety", desc: "Comb-plate protection, anti-reversal, and emergency stopping provide assured safety in public settings." },
      { icon: "⚡", title: "Smart and energy-saving", desc: "Slows to standby when unoccupied and starts instantly when riders arrive, saving energy without compromising the experience." },
      WHY_DIGITAL,
    ],
    projectShowcase: ["Shopping malls and mixed-use complexes", "Subway stations, railway stations, and airports", "Municipal and public-transit projects"],
  }),
  passenger: mk({
    story:
      "The LINVOL digital passenger elevator is the culmination of LINVOL's digital strength — suited to hotels, office buildings, and residential communities, it distills performance, safety, and energy efficiency into every smooth ride. Permanent-magnet synchronous gearless traction delivers an efficient, quiet, and energy-saving experience, with the machinery barely perceptible as you enter and exit the car; intelligent group control coordinates multiple cars during peak hours, shortening waits and smoothing throughput. Digital technology and AI run through the entire elevator lifecycle, from operational monitoring to fault prediction, giving managers visibility and peace of mind. Precise leveling, gentle start/stop, and a human-centered car experience add a measure of ease and dignity to the daily commute and the journey home.",
    heritage:
      "The passenger elevator is LINVOL's flagship product, best embodying the digital strength of LINVOL and Midea. Drawing on the R&D and manufacturing system of Midea Building Technologies, it brings efficient drive, intelligent group control, and full-lifecycle digital management to hotel, office, and residential projects.",
    technicalSpecs: [
      { label: "Rated load", value: "Approx. 630 – 1600kg (8 – 21 persons, customized to the building)" },
      { label: "Running speed", value: "Approx. 1.0 – 2.5m/s (high-speed range configured to floor height)" },
      { label: "Drive type", value: "Permanent-magnet synchronous gearless traction (efficient, low-noise, energy-saving)" },
      { label: "Control system", value: "Intelligent group control plus variable-frequency speed control, with smooth peak-hour dispatching and precise leveling" },
      { label: "Applicable floors", value: "Mid-rise to high-rise (hotels, office buildings, residential communities)" },
      { label: "Digital technology", value: "Digital technology and AI run through the entire lifecycle, with remote monitoring and early warnings" },
    ],
    whyChoose: [
      WHY_BRAND,
      { icon: "🏨", title: "Many project types", desc: "Suited to hotels, office buildings, residential communities, and many other building types." },
      { icon: "🧠", title: "Intelligent group control", desc: "Coordinated multi-car dispatching during peak hours shortens waits and smooths throughput." },
      { icon: "⚡", title: "Efficient and energy-saving", desc: "Permanent-magnet synchronous drive delivers high performance and low energy use for quiet, reliable operation." },
      WHY_DIGITAL,
    ],
    projectShowcase: ["Star-rated hotels and serviced apartments", "Office buildings and commercial workplaces", "Residential communities and high-rise housing"],
  }),
};

/** Helper: retrieve metadata by seriesOriginal, falling back to villa by default. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return LINVOL_SERIES_META[seriesOriginal.trim()] || LINVOL_SERIES_META["villa"];
}
