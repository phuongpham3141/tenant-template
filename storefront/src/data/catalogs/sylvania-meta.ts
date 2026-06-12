/**
 * Sylvania (Feilo Sylvania) series metadata — rich content for product detail pages.
 * A single set of brand-wide metadata shared across all product / solution series
 * (indoor LED luminaires, downlights, panels, industrial and sports-hall lighting,
 * human-centric lighting, smart controls, emergency and energy solutions).
 * Source: sylvania-group.com — an international lighting group founded in 1901,
 * plus industry-standard engineering parameters.
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
    "Sylvania is a beam of light that spans more than a century. From the moment its first incandescent filament glowed in 1901, the company has treated light as a discipline — a study of people, of space, and of efficiency. Today Sylvania is far more than a single lamp; it is a complete professional language that runs from light source to lit environment. Concord Equinox erases dark ceilings with a halo of light whose source you cannot see. Optix uses premium glare-control optics to push open-plan office glare to UGR below 19. Luminature brings the natural daylight from outside the window into showrooms and classrooms. For architects, lighting designers and contractors, Sylvania delivers light that can be calculated, commissioned and trusted for the long term — not a fleeting burst of brightness. When a building needs lighting that is energy-efficient yet comfortable, dignified yet durable, Sylvania is often the name written into the specification.",
  heritage:
    "With more than 120 years of history, Sylvania operates across Europe, the Americas, Asia and Africa. Following its merger with Shanghai Feilo Acoustics Group to form the Feilo Sylvania Group, Sylvania united mature Western lighting technology with Chinese supply-chain capability, creating a complete product matrix spanning architectural, industrial, retail, office, education and urban lighting. The portfolio ranges from leading-edge innovations such as the sustainable paper-frame OptiClip TERRA luminaire to systematic extensions like the SylSmart smart platform and Power energy solutions.",
  technicalSpecs: [
    { label: "Power Range", value: "Approx. 8W – 200W (depending on luminaire model and light distribution)" },
    { label: "Efficacy", value: "Typically 100 – 130 lm/W (high-efficiency series such as OptiClip TERRA perform even better)" },
    { label: "Color Temperature", value: "3000K / 4000K / 6500K; Luminature supports tunable white full-spectrum light" },
    { label: "Color Rendering Index", value: "CRI 80 baseline, CRI90+ high-fidelity option (accurate rendering of materials and skin tones)" },
    { label: "Ingress Protection", value: "From IP20 indoor; the Helios tube is hermetically welded to exceed IP68" },
    { label: "Rated Lifetime", value: "From approx. 50,000 hours; OptiClip TERRA reaches 100,000 hours (L80B10)" },
  ],
  manufacturing: [
    "International lighting group Feilo Sylvania — an R&D network and manufacturing base spanning multiple continents, combining Western lighting technology with Chinese supply-chain synergy",
    "Select premium series are produced in Europe, such as OptiClip TERRA from the Saint-Etienne plant in France, with frames made from 60% certified sustainable paper material and fully recyclable",
    "OptiClip TERRA uses a removable dual-LED-module design, reducing manufacturing carbon emissions by approximately 80% and shipping carbon emissions by approximately 40% versus comparable steel-frame luminaires",
    "In-house optical components: from modular reflectors and micro-prismatic optical (MPO) flat diffusers to asymmetric reflectors, matching light distribution and glare control to each scenario",
    "The SylSmart digital platform follows a security-by-design principle, with every luminaire embedding smart sensors, a microprocessor and storage for instant edge-side processing",
  ],
  careGuide: [
    { title: "Routine Maintenance", desc: "LED luminaires offer long life and low maintenance; periodically clean the lens and reflector with a clean soft cloth to preserve output efficiency, and check driver operating status on a regular schedule." },
    { title: "Smart Systems", desc: "SylSmart is configured and monitored through the app and digital platform, allowing remote firmware updates, scheduling and scene setup, and review of power, illuminance and occupancy analytics." },
    { title: "Emergency Self-Test", desc: "LiFeSafe emergency luminaires feature Self-Test / DALI Self-Test, automatically checking battery and backup-light status; replace per the log before battery degradation to ensure 3 hours of backup during a power outage." },
    { title: "Cleanroom Hygiene", desc: "Cleanroom (LiteGuard) and sports-hall (Rocks) luminaire surfaces clean easily and can be wiped and disinfected per EN 60598-1 requirements without affecting cleanliness class." },
  ],
  installation: [
    "Select by application: office and education prioritize glare control and color rendering, industrial and sports halls prioritize impact resistance and durability, retail and hospitality prioritize ambiance, while emergency and energy are configured to code",
    "Install by a qualified electrical technician, correctly wiring the external LED driver and control circuits, and confirming voltage, polarity and grounding",
    "Recessed downlights / panels follow the ceiling cut-out dimensions with clearance for heat dissipation; the Helios tube is a single-ended retrofit replacement sized to standard linear fluorescent tubes",
    "For smart systems, first zone the layout, then build the Bluetooth Mesh network, completing pairing, commissioning and scene setup via the mobile app, with support for battery-free wireless wall switches",
    "On completion, perform lighting acceptance to engineering standards: verify illuminance (Lux), glare index (UGR), uniformity and color-temperature consistency, and archive the commissioning parameters",
  ],
  certifications: [
    "CE marking — compliant with the EU Low Voltage Directive (LVD) and Electromagnetic Compatibility (EMC) Directive, meeting lighting safety standards such as EN 60598-1",
    "CCC China Compulsory Certification (applicable to models sold in China), meeting domestic electrical safety requirements",
    "Energy-efficiency certification — high-efficacy design meets energy-label / energy-class requirements, supporting building energy savings and net-zero goals",
    "Photobiological safety — assessed per IEC/EN 62471 for blue-light and other hazards; low flicker and eye comfort for office and education environments",
    "Factory warranty — depending on the series, OptiClip TERRA offers a 5-year warranty, and professional series generally carry long-term warranty commitments",
  ],
  packaging: [
    { label: "Supply Format", value: "Supplied by project or by product series, supporting bundled turnkey packages of luminaires + smart controls + services" },
    { label: "Packaging", value: "Individually packed in factory cartons with foam / corner protection; luminaires shipped with matched drivers, and bulk project orders shrink-wrapped on pallets" },
    { label: "Lead Time", value: "Standard models held in stock for fast dispatch; European-made and custom configurations negotiated per order (referencing the project schedule)" },
    { label: "Warranty", value: "Depending on the series; professional luminaires generally carry a long-term warranty (e.g., OptiClip TERRA at 5 years)" },
    { label: "Value-Added Services", value: "Includes 360 Services and the SylSmart digital platform, covering assessment, implementation, management and after-sales support" },
  ],
  whyChoose: [
    { icon: "💡", title: "120+ Years of Heritage", desc: "One of the world's longest-established and most respected lighting brands, turning light into a profession since 1901." },
    { icon: "🌍", title: "International System", desc: "The Feilo Sylvania Group spans multiple continents, combining Western lighting technology with the Chinese supply chain for stable, reliable delivery." },
    { icon: "👁️", title: "Glare-Free High Fidelity", desc: "Premium optics push UGR below 19, while CRI90+ accurately renders materials and skin tones for comfortable, fatigue-free viewing." },
    { icon: "🔗", title: "Complete Ecosystem", desc: "From LED luminaires to SylSmart smart control, LiFeSafe emergency and Power energy solutions, all connected in one place." },
    { icon: "♻️", title: "Sustainable & Low-Carbon", desc: "OptiClip TERRA's paper frame is recyclable with sharply reduced carbon emissions, helping buildings advance toward net-zero goals." },
  ],
  projectShowcase: [
    "Office and commercial buildings — glare-free, high-fidelity lighting for open-plan offices, meeting rooms, lobbies and retail spaces",
    "Industrial and logistics — factories, warehouses, data centers and sports halls, and other large spaces and demanding environments",
    "Retail, hospitality and education — premium displays, guest-room ambiance, and healthy light environments for classrooms and libraries",
    "Urban, emergency and energy — outdoor and public lighting, evacuation emergency lighting, and photovoltaic storage plus energy-monitoring solutions",
  ],
  faq: [
    { q: "What is the relationship between Sylvania and Feilo Sylvania?", a: "SYLVANIA is an international lighting brand founded in 1901; it now belongs to the Feilo Sylvania Group, formed after the merger with Shanghai Feilo Acoustics Group, fusing Western lighting technology with the Chinese supply chain." },
    { q: "How do the luminaires perform on color rendering and glare control?", a: "Professional series generally offer CRI90+ high fidelity paired with glare-control optics, with a typical office UGR below 19 and low-flicker eye comfort, suiting office, education and retail-display environments that require long periods of visual focus." },
    { q: "Does Sylvania offer smart lighting solutions?", a: "Yes. The SylSmart platform spans Standalone, Connected, Connected Pro and Energy, built on Bluetooth Mesh wireless networking for remote control, scheduling and energy analytics, complemented by 360 Services digital services." },
    { q: "What are the luminaire lifetime and warranty?", a: "LED luminaires are generally rated from 50,000 hours, with OptiClip TERRA reaching 100,000 hours (L80B10) and offering a 5-year warranty; actual lifetime and warranty are determined by the corresponding series specifications." },
    { q: "Is there supply and engineering support in Vietnam?", a: "Please contact Huayuesc supply chain for selection advice, quotations and lighting engineering consulting, as well as coordination of product supply and after-sales service." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
