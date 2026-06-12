/**
 * Guangri elevator series metadata — rich content for product detail pages.
 * Indexed by seriesOriginal: "home-cabin" (home-elevator cabin styles) / "home-elevator" (complete home elevators) / "escalator" (escalators and moving walks).
 * Source: guangri.com.cn — Guangzhou Guangri Elevator. Technical specifications represent typical industry ranges; actual figures depend on site survey and configuration.
 */

export type SeriesMeta = {
  story: string;
  heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[];
  careGuide: { title: string; desc: string }[];
  installation: string[];
  certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[];
  faq: { q: string; a: string }[];
};

const BRAND_MFG = [
  "Founded in Guangzhou, Guangri Elevator is one of China's earliest-established and largest full-line elevator manufacturers, with a product range spanning passenger elevators, home elevators, freight elevators, hospital elevators, fire-service elevators, escalators and moving walks",
  "Backed by a complete in-house elevator R&D and manufacturing system — core components from traction machines and control cabinets to cabin interiors are self-developed and self-produced, with every unit individually commissioned and routine-tested before leaving the factory",
  "The traction machines use permanent-magnet synchronous gearless drive technology paired with a VVVF (variable-voltage, variable-frequency) speed-control system, delivering smooth running, lower energy consumption and a more compact hoistway footprint",
  "For home elevators, dozens of premium cabin interior schemes are available (Gothic Elegance, Roman Romance, Verdant Serenity, Crimson Goddess, Radiant Pillar and more) that can be selected and combined to match interior design styles",
  "Supported by a nationwide network for installation, maintenance and technical service, providing end-to-end support from site survey and selection, complete-unit supply, installation and commissioning, through to scheduled maintenance and modernization of aging elevators",
];

const BRAND_CERTS = [
  "Special Equipment Manufacturing License (Elevators) — production is licensed in accordance with China's special-equipment safety supervision requirements",
  "Compliant with elevator manufacturing and installation safety standards (the GB/T 7588 series) and the TSG elevator safety technical regulations",
  "ISO 9001 quality management system certification, with every unit individually routine-tested and trial-run before shipment",
  "Each completed installation may only be placed into service after passing supervisory inspection by an authorized special-equipment inspection body",
  "The complete unit and core components carry a warranty period, with manufacturer maintenance and spare-parts support provided during that period",
];

const BRAND_PACK = [
  { label: "Supply Model", value: "Complete elevators supplied per project configuration, with accompanying installation and commissioning services" },
  { label: "Shipping", value: "Traction machine, cabin, guide rails and control cabinet packed separately in wooden crates/frames, delivered in batches according to floor count and hoistway dimensions" },
  { label: "Site Requirements", value: "A pit, top-floor headroom and machine-room / machine-room-less space must be reserved; civil-works reservation drawings are provided for coordination" },
  { label: "Services", value: "Integrated site survey and selection, installation and commissioning, supervisory inspection, scheduled maintenance and modernization" },
  { label: "Samples", value: "Cabin interior samples, renderings and color cards are provided to confirm style and materials before finalizing the specification" },
];

const BRAND_INSTALL = [
  "Before selection, the technical team conducts an on-site survey: verifying pit depth, top-floor headroom, clear hoistway dimensions, travel height and rated load",
  "Civil-works coordination: the hoistway, pit and machine room (or machine-room-less load-bearing beam) are built per the reservation drawings, with embedded parts and rail brackets positioned",
  "A trained, certified technical team hoists the traction machine, installs the guide rails and cabin, and properly completes the electrical wiring, door-operator interlock, and overspeed-governor / safety-gear commissioning",
  "Emergency rescue systems (power-failure leveling / manual hand-winding) and the five-party intercom are connected, with the safety circuit and brake verified item by item",
  "After completion, no-load and full-load trial runs are performed; following a passing supervisory inspection by an authorized special-equipment inspection body, the use registration is filed before the elevator may be handed over for service",
];

const BRAND_CARE = [
  { title: "Scheduled Maintenance", desc: "At the prescribed intervals (typically once every 15 days to once a month), a licensed maintenance provider inspects and lubricates the wire ropes / guide rails, brake, door system and control cabinet." },
  { title: "Safety Inspection", desc: "Annual safety inspections are carried out as required by local special-equipment authorities; if abnormal noise, vibration or inaccurate leveling occurs during operation, stop the elevator immediately and call for service." },
  { title: "Emergency Devices", desc: "Regularly test the power-failure emergency leveling, intercom and alarm systems to ensure prompt communication and rescue in the event of entrapment." },
  { title: "Cabin Upkeep", desc: "Clean using the cleaner appropriate to the cabin material (stainless steel / glass / wood finish), and avoid scratching mirror surfaces and etched panels with hard objects." },
];

const BRAND_WHY = {
  icon: "🛗",
  title: "Established Domestic Brand",
  desc: "Guangri is one of China's earliest-established and most consistently regarded large-scale elevator manufacturers, with in-house complete-unit development and a nationwide service network.",
};

export const GUANGRI_SERIES_META: Record<string, SeriesMeta> = {
  "home-cabin": {
    story:
      "Guangri home-elevator cabin styles are an art form that distills the elegance of villa living into a compact space — from the stately, opulent Gothic Elegance and the romantic, refined Roman Romance to the serene, expressive Verdant Serenity and the luminous, radiant Crimson Goddess, each one captures a distinct attitude toward living. Etched stainless steel, mirror finishes, tempered glass and wood-veneer panels layer rich texture under the lighting, turning the simple act of moving between floors into a private gallery you pass through every day. It is not merely the shell of a means of transport; it is the first impression a guest forms the moment they step through the front door. For discerning villa owners, choosing the right cabin is like giving the whole house a pair of eyes.",
    heritage:
      "The cabin interior is the finishing touch of a home elevator — through years of focused work in premium residential settings, Guangri has cultivated a complete cabin design language named for both Eastern artistic moods and modern aesthetics, spanning styles from classical to contemporary.",
    technicalSpecs: [
      { label: "Type", value: "Home-elevator cabin interior style (cabin decor)" },
      { label: "Signature Styles", value: "Gothic Elegance / Roman Romance / Verdant Serenity / Crimson Goddess / Radiant Pillar and more" },
      { label: "Primary Materials", value: "Hairline / mirror stainless steel, etched steel plate, tempered glass, wood decorative panels" },
      { label: "Compatible Load", value: "Approx. 250 – 400kg (depending on the home-elevator machine configuration)" },
      { label: "Lighting & Ceiling", value: "LED ceiling / starry-sky ceiling, with optional ambient lighting and mirrored back panels" },
      { label: "Applications", value: "Premium home elevators for villas, townhouses, top-floor duplexes and similar residences" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      BRAND_WHY,
      { icon: "🎨", title: "Full Range of Styles", desc: "Classical, modern and artistic theme cabins mean there is always one to suit your interior style." },
      { icon: "💎", title: "Premium Materials", desc: "Mirror / etched stainless steel, tempered glass and wood-veneer panels combine rich texture with durability." },
      { icon: "✨", title: "Lighting Ambiance", desc: "LED ceiling and starry-sky ceiling designs light up the space with style and elevate the riding experience." },
      { icon: "📐", title: "Custom Coordination", desc: "Cabin selection and color advice can be provided to match the floor plan and interior design, for a coordinated whole." },
    ],
    projectShowcase: [
      "Entry elevators for premium villas and townhouses",
      "Private elevators for top-floor penthouses",
      "Multi-story owner-built homes and upgrade-residence projects",
    ],
    faq: [
      { q: "Can the cabin style be replaced or refurbished on its own?", a: "Where the existing hoistway and machine conditions allow, some cabin interiors can be refurbished or restyled; the specific plan must be confirmed after a technical survey." },
      { q: "How do I choose a cabin style that suits my home?", a: "We recommend selecting based on the design theme of your entrance hall and stairwell — classical residences lean toward Gothic / Roman, while modern minimalist homes lean toward Verdant Serenity / Silver Trail; you can request renderings from Huayue Supply Chain." },
      { q: "Are glass cabins safe?", a: "They use tempered safety glass that complies with elevator safety standards, ensuring strength while creating an open, panoramic view." },
      { q: "How should the cabin be maintained day to day?", a: "Wipe stainless steel and mirror surfaces along the grain with a suitable neutral cleaner, keep wood finishes from water immersion, and check the panels and handrails periodically together with the unit's regular maintenance." },
    ],
  },
  "home-elevator": {
    story:
      "Guangri home elevators are made for villas and townhouses — they know how to make the most of a limited hoistway, and how to make every ascent and descent almost inaudibly quiet. A permanent-magnet synchronous gearless machine paired with variable-frequency speed control delivers gentle starts and stops and precise leveling, so the elderly and children alike can ride with ease; the compact footprint and low energy use, plus the machine-room-less option, make civil-works reservations more flexible. Power-failure emergency leveling and the intercom system quietly hold the line on safety. From the ground floor to the top, it turns the fatigue of the stairs into a few effortless seconds, so multi-story living truly knows no height.",
    heritage:
      "As villas and multi-story owner-built homes have become more common, the home elevator has become a standard feature of upgraded living — Guangri has answered this demand by refining a compact, smooth and energy-efficient home-elevator line, adapting to a wide range of floor plans with its rich selection of cabin schemes.",
    technicalSpecs: [
      { label: "Type", value: "Home elevator (compact passenger elevator)" },
      { label: "Rated Load", value: "Approx. 250 – 400kg (about 3 – 5 persons)" },
      { label: "Rated Speed", value: "Approx. 0.4 m/s (some configurations up to 1.0 m/s)" },
      { label: "Drive Method", value: "Permanent-magnet synchronous gearless traction + VVVF variable-frequency speed control" },
      { label: "Control Method", value: "Microprocessor collective-selective control, available with machine-room-less / shallow-pit options" },
      { label: "Applicable Floors", value: "Approx. 2 – 6 floors in villas, townhouses and owner-built homes" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      BRAND_WHY,
      { icon: "🏡", title: "Residential Fit", desc: "A compact structure that fits small hoistways, shallow pits and machine-room-less layouts, making civil-works reservations more flexible." },
      { icon: "🔇", title: "Smooth & Quiet", desc: "A permanent-magnet synchronous gearless machine with variable-frequency speed control delivers gentle starts and stops, precise leveling and low noise." },
      { icon: "🌱", title: "Energy-Saving", desc: "Efficient traction and standby energy-saving design keep long-term electricity costs friendly." },
      { icon: "🆘", title: "Emergency Safety", desc: "Equipped with power-failure emergency leveling and a five-party intercom, so occupants can communicate and be rescued promptly for greater peace of mind." },
    ],
    projectShowcase: [
      "Entry home elevators for detached villas",
      "Multi-story townhouses and stacked-villa residences",
      "Upgrade owner-built homes and age-friendly retrofit elevators",
    ],
    faq: [
      { q: "Does Guangri provide installation and maintenance support in Vietnam?", a: "Please contact Huayue Supply Chain for project-appropriate supply, installation and technical service plans; installation and maintenance are carried out by a locally qualified team." },
      { q: "Can it be installed if my hoistway is very small?", a: "Guangri offers compact options such as shallow pits and machine-room-less designs; the installable dimensions must be confirmed after an on-site survey verifies the pit, top-floor headroom and clear hoistway dimensions." },
      { q: "Will I be trapped inside during a power outage?", a: "Power-failure emergency leveling is standard equipment; after a power loss the elevator can automatically level to the nearest floor and open the doors, and an intercom system is provided to easily contact rescue." },
      { q: "How long are the delivery and installation lead times?", a: "This depends on the configuration, cabin style and civil-works progress; production and installation are generally scheduled after the survey and civil-works reservation are complete, with specifics confirmed per the actual project." },
      { q: "How is ongoing maintenance arranged?", a: "Elevators are special equipment and must be maintained on a scheduled basis by a licensed maintenance provider and undergo annual safety inspections; Huayue Supply Chain can help connect you with local maintenance services." },
    ],
  },
  escalator: {
    story:
      "Guangri escalators and moving walks are the ever-flowing river of steel in high-traffic spaces — gently guiding crowds to every level in a shopping mall, keeping hurried footsteps from stumbling on steps in metro stations and airports, and quietly carrying tide-like flows of people through exhibition halls and transit terminals. The sturdy, durable truss structure, the smoothly synchronized step chain and handrail, and the variable-frequency energy-saving control let it automatically slow to standby when traffic is sparse and run steadily at full load when busy. Multiple safety protections — missing-step detection, handrail-speed monitoring, emergency-stop buttons and anti-trap brushes — keep every step on and off within a margin of safety. It makes no fanfare, yet it is the most trusted stretch of the journey in any public building.",
    heritage:
      "Escalators and moving walks are Guangri's flagship product line for the public-transit and commercial-building sectors — years of service in high-traffic settings such as malls, rail transit and airports have built up mature experience in high-capacity continuous operation.",
    technicalSpecs: [
      { label: "Type", value: "Escalator / moving walk (travelator)" },
      { label: "Rated Speed", value: "Approx. 0.5 m/s (moving walk approx. 0.5 – 0.65 m/s)" },
      { label: "Step / Pallet Width", value: "Approx. 600 / 800 / 1000mm options" },
      { label: "Inclination Angle", value: "Escalators approx. 30° / 35°; moving walks approx. 0° – 12°" },
      { label: "Drive Control", value: "Variable-frequency drive + traffic-sensing variable speed for energy saving — full load when busy, slowing to standby when idle" },
      { label: "Applications", value: "Shopping malls, metro stations, railway stations, airports and high-traffic public-building spaces" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      BRAND_WHY,
      { icon: "🏬", title: "Built for Heavy Traffic", desc: "Designed for high-footfall settings such as malls, stations and airports, with stable continuous high-capacity operation." },
      { icon: "🛡️", title: "Layered Safety", desc: "Missing-step detection, handrail-speed monitoring, emergency stop and anti-trap protection make safety more comprehensive." },
      { icon: "💡", title: "Energy-Saving Variable Speed", desc: "Traffic-sensing variable-frequency control slows to standby when few or no people are present, for more economical long-term operation." },
      { icon: "🔧", title: "Durable & Serviceable", desc: "A sturdy truss and step-chain structure with modular components makes inspection, maintenance and spare-parts replacement easy." },
    ],
    projectShowcase: [
      "Floor-linking escalators in shopping malls and commercial complexes",
      "Passenger corridors in metro stations, railway stations and airports",
      "Convention centers, hospital outpatient buildings and public-transit hubs",
    ],
    faq: [
      { q: "How does the escalator ensure passenger safety?", a: "It is equipped with multiple safety devices including missing-step detection, handrail-speed monitoring, top-and-bottom emergency-stop buttons, anti-trap brushes and skirt-panel protection, and is inspected regularly per regulations." },
      { q: "Does it have to run at full speed all the time even when traffic is light?", a: "Traffic-sensing variable-speed control is available; it automatically slows or goes to standby when few or no people are present and returns to normal speed when someone approaches, balancing energy saving and experience." },
      { q: "What is the difference between a moving walk and an escalator?", a: "An escalator is an inclined transport device with steps used to connect floors; a moving walk uses near-horizontal pallets and is suited to long-distance level travel or carrying luggage / shopping carts." },
      { q: "Is it suitable for venues like hospitals or airports?", a: "Yes. Guangri escalators and walks have long been used in high-traffic public buildings such as airports, stations, hospitals and malls, with an emphasis on continuous safe operation and easy maintenance." },
      { q: "How are ongoing maintenance and inspection arranged?", a: "As special equipment, it must be maintained on a scheduled basis by a licensed provider and undergo annual safety inspections; Huayue Supply Chain can help connect you with local maintenance and technical services." },
    ],
  },
};

/** Helper: retrieve metadata by seriesOriginal, falling back to home-cabin by default. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return GUANGRI_SERIES_META[seriesOriginal.trim()] || GUANGRI_SERIES_META["home-cabin"];
}
