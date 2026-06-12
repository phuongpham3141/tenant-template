/**
 * Toshiba Elevator series metadata — rich content for product detail pages.
 * Keyed by seriesOriginal (catKey): high-speed / passenger / escalator / moving-walk / home / retrofit.
 * Sources: toshiba-elevator.com.cn (Toshiba Elevator (China) Co., Ltd. product pages) + industry-standard elevator engineering and specification references.
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

const BRAND_MFG = [
  "Toshiba Elevator inherits the century-old precision engineering DNA of the Toshiba Group — Toshiba has been developing electric motors since 1895, and the three core components (traction machine, control cabinet and door control system) are all designed and manufactured in Toshiba's own facilities, ensuring quality control from the source",
  "The permanent-magnet synchronous gearless traction machine (PMSM) undergoes winding, potting and dynamic balancing inspection on Toshiba's own production lines, paired with a dual-circuit brake system to deliver energy efficiency, low noise and high safety in one unified package",
  "The control cabinet uses a new generation of multifunctional lead-free, eco-friendly circuit boards with relays integrated on-board and highly modularized components, exceeding RoHS environmental standards for more stable performance in a more compact footprint",
  "The door control system integrates dual closed-loop control with a high-performance encoder, continuously monitoring door-motor current to intelligently detect obstructions and stop automatically while closing — each unit precision-tuned with Japanese craftsmanship",
  "Before leaving the factory, every unit undergoes full-load trial operation, noise and vibration testing and complete visual inspection, upholding Toshiba's unified global quality standards so that every elevator is delivered with confidence",
];
const BRAND_CARE = [
  { title: "Scheduled Maintenance", desc: "Inspect each item according to Toshiba's maintenance program: wire rope / traction rope wear, guide rail oil film, brake clearance, door-machine belt and control-system self-test, with periodic replenishment of dedicated lubricant." },
  { title: "Safety Inspection", desc: "Comply with periodic statutory inspection of special equipment (annual inspection); the overspeed governor, safety gear, buffer and overload device must pass inspection before continued use, and any anomaly must trigger immediate shutdown and remediation." },
  { title: "Cleaning & Upkeep", desc: "Promptly clear debris from the car sill and door guide groove to prevent jamming; wipe stainless-steel car walls along the grain with a neutral cleaner, keeping away from strong acids, alkalis and hard-object scratches." },
  { title: "Remote Monitoring", desc: "Can connect to the Toshiba remote monitoring platform to transmit operating data and fault alerts in real time, enabling early detection of issues, proactive parts stocking and shorter downtime." },
];
const BRAND_INSTALL = [
  "Survey hoistway dimensions, travel height, overhead and pit depth, and load requirements on-site to determine the machine-room / machine-room-less configuration",
  "A Toshiba-authorized, trained and qualified installation team mobilizes on-site, setting out per drawings and hoisting guide rails and the traction machine, with standardized procedures and clear individual accountability",
  "Complete electrical wiring, traction rope reeving, and car and counterweight assembly, verifying each safety circuit and limit switch item by item",
  "Perform balance-coefficient testing, overload and overspeed governor interlock tests, and leveling-accuracy adjustment to ensure smooth operation and accurate leveling",
  "Before being put into service, the unit must pass acceptance by a special-equipment inspection body; only after obtaining the inspection certificate may it be officially handed over for passenger use",
];
const BRAND_CERTS = [
  "Special Equipment Manufacturing License — elevators are classified as state-regulated special equipment, and complete-unit manufacturing requires the corresponding manufacturing license qualification",
  "Conforms to GB/T 7588 Safety Rules for the Construction and Installation of Elevators and the TSG Elevator Safety Technical Supervision Regulations",
  "Certified to the ISO 9001 quality management system and ISO 14001 environmental management system",
  "Circuit boards and materials exceed RoHS environmental standards, reducing multiple classes of specified hazardous chemical substances",
  "Factory inspection certificate for the complete unit + post-installation acceptance certificate from a special-equipment inspection body, plus a factory warranty",
];
const BRAND_PACK = [
  { label: "Supply Method", value: "Complete elevator supply, including the traction machine, control cabinet, car, door system and other full-set components, delivered to site in project batches" },
  { label: "Transport Protection", value: "Precision components secured in wooden crates / steel frames, guide rails film-wrapped and bundled, control cabinets packed moisture-proof and shock-proof for export" },
  { label: "Scope of Service", value: "Integrated service covering survey, design selection, installation, commissioning, maintenance and modernization of existing elevators" },
  { label: "Lead Time", value: "Depends on configuration and project; a production and installation schedule is issued based on the on-site survey (lead times are shorter for standard configurations)" },
  { label: "Warranty", value: "Factory warranty and spare-parts support provided, with long-term maintenance agreements available to safeguard full-lifecycle operation" },
];

function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase" | "faq">): SeriesMeta {
  return {
    story: p.story, heritage: p.heritage, technicalSpecs: p.technicalSpecs,
    manufacturing: BRAND_MFG, careGuide: BRAND_CARE, installation: BRAND_INSTALL,
    certifications: BRAND_CERTS, packaging: BRAND_PACK,
    whyChoose: p.whyChoose, projectShowcase: p.projectShowcase, faq: p.faq,
  };
}

const PASS = mk({
  story:
    "Toshiba passenger elevators (the ELCOSMO compact machine-room series and the SPACEL machine-room-less series) embody a century of Toshiba technical heritage, writing Japanese precision and restraint into every detail. The traction machine, control cabinet and door control system are all designed and built in Toshiba's own facilities, while a compact permanent-magnet synchronous motor makes operation as quiet as a whisper, bringing the car to a steady, precise stop underfoot. The energy regeneration system captures and reuses braking energy for greener operation while lowering the building's electricity bill. Minimalist yet inviting car finishes paired with people-first, human-centered design make every ride a relaxed, comfortable journey. From commercial buildings to premium residences, it is the elevator you can entrust with a building's vertical circulation.",
  heritage:
    "ELCOSMO and SPACEL are Toshiba Elevator's flagship passenger elevator lines, deeply rooted in the Chinese market. The former saves construction space with a compact machine room, while the latter frees up rooftop area with a machine-room-less (MRL) design; together they carry forward Toshiba's product philosophy of energy efficiency, quiet operation and peace of mind.",
  technicalSpecs: [
    { label: "Capacity", value: "Standard 630 / 800 / 1000 / 1350 kg (per project configuration)" },
    { label: "Speed", value: "Multiple ratings such as 1.0 / 1.6 / 1.75 m/s" },
    { label: "Drive", value: "Compact permanent-magnet synchronous gearless traction machine (PMSM), dual-circuit braking" },
    { label: "Control", value: "VVVF variable-frequency control + dual closed-loop door control, with energy regeneration and group control optional" },
    { label: "Machine Room", value: "ELCOSMO compact machine room / SPACEL machine-room-less (MRL)" },
    { label: "Applications", value: "Commercial buildings, office towers, premium residences, apartments" },
  ],
  whyChoose: [
    { icon: "🇯🇵", title: "Genuine Toshiba of Japan", desc: "Three core components designed and built in-house — Japanese quality that is quiet, safe and energy-efficient." },
    { icon: "🔇", title: "Quiet & Smooth", desc: "Permanent-magnet synchronous traction with vibration-damping technology delivers quiet operation and precise, comfortable leveling." },
    { icon: "⚡", title: "Energy Regeneration", desc: "The energy regeneration system recovers braking energy for green operation and lower building energy consumption." },
    { icon: "🛡️", title: "Dual Braking", desc: "Dual-circuit braking + door-current monitoring intelligently stops the door on obstruction for greater peace of mind." },
    { icon: "📐", title: "Space-Saving", desc: "Compact machine-room / machine-room-less designs optimize hoistway and rooftop footprint for more flexible construction." },
  ],
  projectShowcase: ["Grade-A office towers and urban commercial complexes", "High-end residences and fully fitted apartments", "Hotels, hospitals and government office buildings"],
  faq: [
    { q: "How do I choose between compact machine room and machine-room-less?", a: "The ELCOSMO compact machine room is friendlier on cost and maintenance; the SPACEL machine-room-less design eliminates the rooftop machine room and frees up floor area, ideal for projects constrained by floor height or building form." },
    { q: "What energy-saving features do the passenger elevators offer?", a: "VVVF variable-frequency drive and permanent-magnet synchronous traction come standard, with optional energy regeneration, standby sleep mode and LED lighting for significantly lower overall energy use." },
    { q: "Is supply and technical support available in Vietnam?", a: "Please contact Hua Yue Supply Chain for selection, supply, installation and maintenance consulting tailored to your project." },
    { q: "What are the delivery and installation timelines?", a: "They depend on configuration and site conditions, with shorter lead times for standard configurations; the production and installation schedule issued after the on-site survey is authoritative." },
  ],
});

export const TOSHIBA_ELEVATOR_SERIES_META: Record<string, SeriesMeta> = {
  "high-speed": mk({
    story:
      "New ELBRIGHT is Toshiba's high-speed flagship for super-high-rise and landmark buildings, fusing Toshiba's years of high-speed traction expertise with a pursuit of ultimate performance. A permanent-magnet synchronous motor paired with a PWM energy regeneration unit recovers energy at high speed and saves power in silence, running fast yet remaining as smooth as ever. The intelligent door system introduces image recognition and touchless boarding technology, while group-control algorithms dispatch the elevator group with precision, so morning rush-hour crowds no longer face anxious waits. Roller guide shoes and vibration-damping technology smooth out every acceleration and deceleration, so passengers traveling a hundred meters in the air feel only calm and quiet. This is Toshiba's answer for skyscrapers — speed and comfort, both fully delivered.",
    heritage:
      "The ELBRIGHT series is the top-tier high-speed product line in Toshiba Elevator's portfolio, purpose-built for super-high-rise offices, urban landmarks and mixed-use complexes — representing Toshiba's technical pinnacle in high-speed traction, group-control dispatching and ride comfort.",
    technicalSpecs: [
      { label: "Capacity", value: "High-capacity configurations such as 1000 / 1350 / 1600 kg" },
      { label: "Speed", value: "High-speed ratings (2.5 m/s and above, per project configuration)" },
      { label: "Drive", value: "Permanent-magnet synchronous motor (PMSM) + PWM energy regeneration unit" },
      { label: "Control", value: "Variable-frequency control + intelligent elevator group control, roller guide shoe vibration damping" },
      { label: "Door System", value: "Intelligent door: image recognition + touchless boarding technology" },
      { label: "Applications", value: "Super-high-rise office towers, urban landmarks, commercial complexes" },
    ],
    whyChoose: [
      { icon: "🇯🇵", title: "Toshiba Japan Technology", desc: "Core high-speed traction technology built in-house, combining speed and quality." },
      { icon: "🚀", title: "Fast & Smooth", desc: "Stable and quiet even at high speed, with vibration damping that smooths acceleration and deceleration." },
      { icon: "🏙️", title: "Built for Skyscrapers", desc: "High capacity + group-control dispatching calmly handle super-high-rise rush-hour crowds." },
      { icon: "♻️", title: "Energy Regeneration", desc: "The PWM regeneration unit recovers and reuses energy, saving power even at high speed." },
      { icon: "👋", title: "Smart & Touchless", desc: "Image-recognition smart doors and touchless boarding for a more hygienic, reassuring experience." },
    ],
    projectShowcase: ["Super-high-rise Grade-A offices and urban landmarks", "Large commercial complexes and five-star hotels", "Financial centers, headquarters towers and other premium buildings"],
    faq: [
      { q: "What is the benefit of group control on high-speed elevators?", a: "Intelligent group control dispatches multiple elevators in real time based on calls from each floor, shortening waiting and travel times and significantly improving throughput during morning and evening peaks." },
      { q: "Will high-speed travel cause jolting or ear discomfort?", a: "ELBRIGHT features roller guide shoe vibration damping and pressure/speed-optimized control for gentler acceleration and deceleration and a smooth ride, noticeably easing the discomfort that high speed can bring." },
      { q: "What does the smart door's touchless technology refer to?", a: "Using image recognition and sensing technology, passengers can reduce direct contact with buttons while obstructions at the door are precisely detected, balancing hygiene and safety." },
      { q: "Is supply and technical support available in Vietnam?", a: "Please contact Hua Yue Supply Chain to arrange selection, supply, installation and maintenance solutions for Toshiba's premium high-speed elevators." },
    ],
  }),
  passenger: PASS, "passenger-elevator": PASS,
  escalator: mk({
    story:
      "The KINDMOVER escalator carries forward Toshiba's reassuring quality and people-first design philosophy — the reliable circulation line that runs quietly in malls, stations and airports, carrying millions of footsteps. The truss is assembled from dedicated forming materials using large purpose-built tooling, giving it a solid structure and reliable precision that stays composed under continuous heavy passenger traffic. Flexible vibration-damping steps raise safety to a new level, with a smooth tread and fine gaps so even children and travelers with rolling luggage can step on with confidence. EMC electromagnetic compatibility and eco-friendly processing that meet Toshiba's standards keep it running cleanly and friendly to surrounding equipment. Backed by an attentive maintenance service system, KINDMOVER writes Japanese care and devotion into every step.",
    heritage:
      "KINDMOVER is Toshiba Elevator's flagship escalator line, widely serving large commercial venues, rail transit and transportation hubs. Renowned for being stable, durable, safe and energy-efficient, it is Toshiba's signature offering in public-space passenger transport.",
    technicalSpecs: [
      { label: "Carrying Capacity", value: "High continuous throughput matched to step width and speed" },
      { label: "Speed", value: "0.5 m/s standard operating speed (intelligent variable speed optional)" },
      { label: "Drive", value: "Energy-efficient drive + dedicated forming material for truss structure" },
      { label: "Control", value: "EMC electromagnetic compatibility + intelligent standby energy-saving control" },
      { label: "Safety", value: "Flexible vibration-damping steps, anti-trap and emergency-stop protection" },
      { label: "Applications", value: "Malls, metro stations, railway stations, airports and other public spaces" },
    ],
    whyChoose: [
      { icon: "🇯🇵", title: "Toshiba Japan Technology", desc: "In-house truss and drive engineering for a solid structure and reliable operation." },
      { icon: "🏬", title: "Built for Heavy Traffic", desc: "Stable and durable for continuous operation, calmly handling mall and station peaks." },
      { icon: "🌱", title: "Smart Energy Saving", desc: "Intelligent standby mode slows down to save power when idle — green and cost-saving." },
      { icon: "🛡️", title: "Flexible Safety", desc: "Flexible vibration-damping steps and multiple safeguards bring safety down to the finest detail." },
      { icon: "🔧", title: "Attentive Maintenance", desc: "A comprehensive maintenance service system ensures stable, long-cycle operation." },
    ],
    projectShowcase: ["Large shopping malls and commercial complexes", "Metro stations, railway stations and other rail transit hubs", "Airport terminals and convention centers"],
    faq: [
      { q: "How does the escalator's intelligent standby save energy?", a: "Sensors detect passenger flow; when no one is riding, it automatically slows down or enters standby and resumes operation as a passenger approaches — significantly saving power without affecting the experience." },
      { q: "What are the benefits of flexible vibration-damping steps?", a: "The steps provide a degree of cushioning under load, reducing tread impact and noise; combined with fine comb teeth they lower the risk of trapping, making the ride smoother and safer." },
      { q: "Is it suitable for outdoor or semi-outdoor settings?", a: "Waterproofing, anti-corrosion and lighting options can be specified per project, with EMC electromagnetic compatibility provided; the on-site survey solution is authoritative." },
      { q: "Is supply and maintenance available in Vietnam?", a: "Please contact Hua Yue Supply Chain for selection, supply, installation and long-term maintenance support for Toshiba escalators." },
    ],
  }),
  "moving-walk": mk({
    story:
      "The Toshiba Moving Walk upholds Toshiba's global quality standards and people-first design philosophy — the horizontal circulation line that gently carries passengers and luggage through airport concourses and station halls. Available in horizontal and inclined styles, it shortens long walks on the level and smoothly bridges floors on gentle slopes. Variable-frequency control with Toshiba energy-saving technology flexibly adjusts operation to passenger flow and lowers energy use; the energy-efficient, durable LED lighting system keeps the tread and handrail bright and clear at all times. Its eco-friendly process exceeds RoHS standards, reducing multiple classes of specified chemicals for clean, environmentally friendly operation. It is understated, yet it makes every long-distance walk effortless and relaxed.",
    heritage:
      "The Toshiba Moving Walk provides horizontal and gentle-slope passenger assistance for airports, stations and large malls. A key part of Toshiba's public-transport conveyance product family, it is renowned for stable, energy-efficient and reassuring service.",
    technicalSpecs: [
      { label: "Style", value: "Horizontal moving walk / inclined moving walk" },
      { label: "Speed", value: "Standard continuous operating speed (configured to the setting)" },
      { label: "Drive", value: "Variable-frequency control + Toshiba energy-saving drive technology" },
      { label: "Lighting", value: "LED lighting system — energy-efficient, attractive and durable" },
      { label: "Environmental", value: "Exceeds RoHS standards, reducing multiple classes of specified chemicals" },
      { label: "Applications", value: "Airports, railway stations, large malls, convention centers" },
    ],
    whyChoose: [
      { icon: "🇯🇵", title: "Toshiba Japan Technology", desc: "Unified global quality standards for stable, reliable and reassuring operation." },
      { icon: "🧳", title: "Effortless Transport", desc: "Horizontal / gentle-slope long-distance conveyance of passengers and luggage — effortless and relaxed." },
      { icon: "⚡", title: "Variable-Frequency Efficiency", desc: "Flexibly adjusts operation to passenger flow, with Toshiba energy-saving technology cutting consumption." },
      { icon: "💡", title: "LED Lighting", desc: "Energy-efficient, durable lighting keeps the tread and handrail clear and bright." },
      { icon: "🌱", title: "Eco-Friendly Process", desc: "Exceeds RoHS by reducing hazardous substances for cleaner, friendlier operation." },
    ],
    projectShowcase: ["Airport terminals and check-in concourses", "Railway stations, metro stations and other transport hubs", "Horizontal circulation in large malls and convention centers"],
    faq: [
      { q: "How do I choose between horizontal and inclined styles?", a: "Choose horizontal for long-distance travel on a single level; choose inclined when you need a gentle-slope connection between floors that can carry carts/luggage trolleys — the exact choice is determined by on-site grade and requirements." },
      { q: "Is the moving walk energy-efficient?", a: "It uses variable-frequency control and Toshiba energy-saving technology, adjusting operation to passenger flow and supporting standby power reduction, with LED lighting further lowering overall energy use." },
      { q: "Can it carry shopping carts and luggage trolleys?", a: "Inclined moving walks have a flat tread with anti-slip design, suitable for shopping carts and luggage trolleys; exact load capacity and gradient depend on the project configuration." },
      { q: "Is supply and support available in Vietnam?", a: "Please contact Hua Yue Supply Chain to arrange selection, supply, installation and maintenance services for the Toshiba Moving Walk." },
    ],
  }),
  home: mk({
    story:
      "SPACEL-H is the home elevator Toshiba crafted with care for villas and townhouses, built around the core promise of a century of Toshiba quality and an elevated quality of life — bringing Japanese refinement home. Compact in body with a friendly hoistway footprint, it nonetheless delivers safety, flexibility, quiet operation and smooth running across the board, turning moving between floors into a relaxed pleasure. Toshiba's in-house traction and control technology make it run as quietly as silk, never disturbing the family's daily rhythm; rich car interior options let the elevator become an extension of home aesthetics rather than an intrusive machine. Whether transporting elders, moving heavy items, or adding modern convenience to a multi-story home, it fits just right. Premium living space and refined finishes tuck thoughtful care for the home into every ride.",
    heritage:
      "SPACEL-H distills Toshiba's mature passenger elevator technology into a residential scale — Toshiba's home elevator line for the premium private-home market, bringing a century of Toshiba quality into the daily life of villas and townhouses.",
    technicalSpecs: [
      { label: "Capacity", value: "Suited to small home loads (approx. 250–400 kg, per home layout)" },
      { label: "Speed", value: "Smooth residential speed (approx. 0.4 m/s, per project configuration)" },
      { label: "Drive", value: "Compact permanent-magnet synchronous traction — space-saving and low-noise" },
      { label: "Control", value: "Toshiba in-house control system for precise leveling and smooth running" },
      { label: "Hoistway", value: "Compact body suited to small villa/townhouse hoistways for flexible construction" },
      { label: "Applications", value: "Villas, townhouses, multi-story private residences" },
    ],
    whyChoose: [
      { icon: "🇯🇵", title: "Toshiba Japan Technology", desc: "A century of Toshiba quality brought home — safe, quiet and worthy of trust." },
      { icon: "🏡", title: "Built for Private Homes", desc: "A compact body suits small villa hoistways for more flexible installation." },
      { icon: "🔇", title: "Quiet & Smooth", desc: "In-house traction runs quietly, never disturbing the family's daily routine." },
      { icon: "🛡️", title: "Safe & Reassuring", desc: "Multiple safety features meeting Toshiba standards bring peace of mind for old and young alike." },
      { icon: "✨", title: "Refined Finishes", desc: "Rich interior options make the elevator part of the home's aesthetic." },
    ],
    projectShowcase: ["Detached villas and premium private homes", "Multi-story townhouses", "Age-friendly retrofits of multi-story self-built homes"],
    faq: [
      { q: "Does a home elevator need a separate machine room?", a: "SPACEL-H uses compact permanent-magnet synchronous traction with a compact body and friendly footprint, requiring no large machine room and fitting the limited hoistway space of villas and townhouses." },
      { q: "I have elderly family members — is it safe enough?", a: "It is equipped with multiple safety protections meeting Toshiba standards and smooth leveling, runs quietly and smoothly, and pairs handrails with anti-trap design so elders can use it with greater confidence." },
      { q: "Can the interior be customized?", a: "A rich selection of car finishes and materials is offered to coordinate with your home style, making the elevator an extension of the space's aesthetic." },
      { q: "Can it be purchased in Vietnam?", a: "Please contact Hua Yue Supply Chain for selection, pricing, and installation and maintenance consulting for the SPACEL-H home elevator." },
    ],
  }),
  retrofit: mk({
    story:
      "An elevator-addition solution for existing buildings — Toshiba's thoughtful answer for older walk-up buildings, bringing the reassurance of easy floor-to-floor travel back into the daily lives of upper-floor residents. The solution uses Toshiba's own traction machine, control cabinet and door control system: Toshiba, which has worked deeply with electric motors since 1895, delivers energy-efficient, low-noise and space-saving operation with a compact permanent-magnet synchronous motor. The control cabinet carries a new generation of lead-free, eco-friendly circuit boards with modularized components for stable performance; the door control system integrates dual closed-loop control with a high-performance encoder, continuously monitoring door-motor current and intelligently stopping on obstruction to safeguard every entry and exit. It optimizes the existing structure with simple construction, keeping disruption to the original building to a minimum. A single installed elevator resolves the difficulty older residents face moving between floors while raising the value and quality of life of the entire property.",
    heritage:
      "The elevator-addition solution is Toshiba's dedicated product line for upgrading vertical transportation in existing buildings, focused on older residential blocks and elevator-less multi-story buildings. With in-house core components and simple construction, it lets older buildings gain the reassurance of a Toshiba-quality elevator.",
    technicalSpecs: [
      { label: "Capacity", value: "Standard small-to-medium loads configured to the existing hoistway / building conditions" },
      { label: "Speed", value: "Smooth low-speed ratings such as 1.0 m/s (per project configuration)" },
      { label: "Drive", value: "Compact permanent-magnet synchronous motor (PMSM), dual-circuit braking" },
      { label: "Control", value: "Lead-free eco-friendly control cabinet + dual closed-loop door control with door-current monitoring" },
      { label: "Structure", value: "Optimizes the existing building structure with a steel-structure hoistway for simple construction" },
      { label: "Applications", value: "Older residential blocks, elevator-less multi-story buildings, existing public buildings" },
    ],
    whyChoose: [
      { icon: "🇯🇵", title: "Toshiba Japan Technology", desc: "Genuine materials and in-house core components even for retrofits — quality assured." },
      { icon: "🏗️", title: "Built for Older Buildings", desc: "Adds an elevator to existing buildings that have none, fulfilling easy floor-to-floor access." },
      { icon: "🧩", title: "Structure Optimization", desc: "Fits the existing space and structure for simple construction with minimal disruption." },
      { icon: "🛡️", title: "Safe Entry & Exit", desc: "Door-current monitoring and stop-on-obstruction safeguard every passage through the lobby." },
      { icon: "📈", title: "Value Enhancement", desc: "Solves age-friendly mobility challenges, improving daily life and raising property value." },
    ],
    projectShowcase: ["Elevator additions and retrofits for older multi-story residential communities", "Age-friendly upgrades for elevator-less apartment blocks", "Vertical transportation retrofits for existing office/public buildings"],
    faq: [
      { q: "Will retrofitting an older building damage its original structure?", a: "The solution optimizes the existing structure and mostly uses an independent steel-structure hoistway, with simple construction and minimal disruption to the main building; the on-site survey and structural assessment are authoritative." },
      { q: "What problem does an added elevator mainly solve?", a: "It primarily resolves the difficulty that upper-floor elderly residents and people with limited mobility face moving between floors, improving quality of life while helping raise the value of the entire property." },
      { q: "Does it also use genuine Toshiba components?", a: "The traction machine, control cabinet and door control system are all designed and built by Toshiba — the core components share the same origin as new elevators, ensuring consistent, reliable quality and safety." },
      { q: "Is retrofit service available in Vietnam?", a: "Please contact Hua Yue Supply Chain for an integrated service covering survey, design, supply, construction and maintenance for elevator additions to existing buildings." },
    ],
  }),
  freight: PASS, observation: PASS,
};

export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TOSHIBA_ELEVATOR_SERIES_META[seriesOriginal.trim()] || TOSHIBA_ELEVATOR_SERIES_META.passenger;
}
