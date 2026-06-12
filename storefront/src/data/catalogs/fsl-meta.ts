/**
 * Metadata FSL Foshan Lighting — brand-wide metadata (rich text).
 * Source: chinafsl.com (international site). A large, publicly listed Chinese lighting manufacturer founded in 1958.
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
    "In 1958, FSL Foshan Lighting lit its first lamp in Foshan, Guangdong, growing from a local electrical works into the household-name lighting brand it is today. For more than six decades it has accompanied China from the incandescent and fluorescent eras all the way into the age of LED — A70 waterproof bulbs, T5/T8 linear tubes and integrated batten fixtures, GU10 spotlights, the Crown and Xifan recessed downlight series, ultra-slim panel lights, and RGBTW smart ceiling lights, covering virtually every corner of the home and office. Stepping outdoors, the FSF floodlight series, the FSS street-light series, spike-mounted garden lights and pathway lights carry illumination across streets, parks and urban nightscapes. Today FSL is a large, publicly traded enterprise that, beam by steady and brilliant beam, has written a long chapter in the history of China's lighting industry.",
  heritage:
    "As one of the largest and longest-established lighting manufacturers in China, FSL operates 5 production bases, more than 200 production lines and over 10,000 employees, with products sold to roughly 80 countries and serving more than 200 overseas customers. From a single bulb to a complete smart-lighting solution, the confidence of a veteran manufacturer is written into every line of the specifications.",
  technicalSpecs: [
    { label: "Brand", value: "FSL Foshan Lighting" },
    { label: "Typical wattage", value: "Bulbs/downlights 3-18W, batten fixtures/tubes 9-40W, floodlights 30-50W, street lights custom-engineered per project" },
    { label: "Luminous efficacy", value: "Core LED products around 90-130 lm/W; T5/T8 tubes and panel lights deliver even, efficient output" },
    { label: "Color temperature", value: "Warm white 2700-3000K, natural white 4000K, cool white 6000-6500K; RGBTW series offers tunable white and color-changing" },
    { label: "Color rendering index (CRI)", value: "Typically Ra above 80; commercial/display spotlights reach Ra 90 or higher for true-to-life color" },
    { label: "Ingress protection (IP)", value: "Indoor fixtures IP20; outdoor floodlights/street lights IP65-66, built to withstand sun and rain" },
    { label: "Rated lifespan", value: "LED products around 25,000-50,000 hours — long-lasting and low-maintenance" },
  ],
  manufacturing: [
    "Made by Foshan Electrical and Lighting Co., Ltd. (FSL) — a publicly listed enterprise founded in 1958, with deep brand heritage",
    "5 production bases and more than 200 production lines across China; large-scale production ensures reliable lead times and consistent quality",
    "In-house R&D and manufacturing of LED chips/modules, drivers and optical lenses — core stages kept under direct control",
    "Die-cast aluminum bodies with tempered/diffused glass covers, paired with engineered thermal management to balance efficacy and long life",
    "Exported to over 80 countries, with large-scale quality control organized to international safety and energy-efficiency standards",
  ],
  careGuide: [
    { title: "Routine cleaning", desc: "After switching off the power, wipe dust from the diffuser and emitting surface with a dry soft cloth. Keep indoor fixtures away from water and damp to maintain clear, unobstructed light output." },
    { title: "Outdoor maintenance", desc: "For IP65-66 products such as floodlights and street lights, periodically inspect the gaskets, connectors and heat-sink fins, and clear away accumulated dust and debris." },
    { title: "Drivers and dimming", desc: "Match the driver to the rated wattage. For smart/RGBTW models, keep the remote control safe and replace the batteries promptly when they run low." },
    { title: "Troubleshooting", desc: "If a light flickers or fails to come on, first check the power supply and wiring. Once you have confirmed the fault lies with the fixture, contact Huayuesc supply-chain after-sales support. Never work on the fixture while it is live." },
  ],
  installation: [
    "Select by application: recessed downlights/panel lights, ceiling lights, integrated batten fixtures, floodlights, street lights and garden lights each suit different scenarios",
    "Have a licensed electrician do the wiring, confirm the voltage (typically AC220-240V), provide a matching driver for the wattage, and ensure proper grounding",
    "Position recessed downlights and panel lights to the cutout dimensions; spring clips automatically grip the ceiling panel. Surface-mounted models fasten directly to the ceiling",
    "Secure outdoor floodlights/street lights with the supplied bracket and adjust the beam angle, confirming IP waterproofing and adequate space for heat dissipation",
    "For spike-mounted garden lights and pathway lights, push the pointed base into the soil and tidy the cabling; for RGB models, pair the remote control and the light is ready to go",
  ],
  certifications: [
    "CCC China Compulsory Certification — meets domestic electrical and lighting safety requirements",
    "China Energy Label (energy-efficiency grade marking) — verifiable, comparable energy performance",
    "Photobiological safety assessment (blue-light hazard classification) — mindful of eye health",
    "CE and other international safety and electromagnetic-compatibility standards, supporting export to roughly 80 countries",
    "Whole-fixture warranty policy (by product series), backed by a listed company's quality management system",
  ],
  packaging: [
    { label: "Individual packaging", value: "Color box or neutral box with built-in cushioning and dividers; bulbs and tubes protected against knocks and crushing" },
    { label: "Master carton", value: "Cartons palletized and labeled with model, wattage, color temperature and quantity for easy warehousing and picking" },
    { label: "Supply format", value: "Supplied by SKU or by product series, for both project and distribution channels" },
    { label: "Product range", value: "Bulbs, tubes, batten fixtures, downlights, panel lights, ceiling lights, floodlights, street lights, garden lights, track/pendant lights, light strips, switches and sockets, and specialty heat lamps" },
    { label: "Export", value: "Covering roughly 80 countries, supporting both bulk and project supply" },
  ],
  whyChoose: [
    { icon: "💡", title: "An established name since 1958", desc: "One of the largest and longest-running lighting manufacturers in China — publicly listed and a trusted brand." },
    { icon: "🏭", title: "Vast manufacturing scale", desc: "5 production bases, 200+ production lines and 10,000+ employees, delivering steady capacity and quality alike." },
    { icon: "🌍", title: "Full-scenario coverage", desc: "From home LED bulbs to panel lights, floodlights, street lights and smart lighting — everything in one place." },
    { icon: "✅", title: "Fully certified", desc: "CCC, energy labeling, photobiological safety and CE among multiple certifications — safe, energy-saving and easy on the eyes." },
    { icon: "🔧", title: "Hassle-free installation", desc: "Spring clips, integrated battens and adjustable brackets make installation fast, maintenance minimal and lifespan long." },
  ],
  projectShowcase: [
    "Whole-home lighting for residences, apartments and villas",
    "Offices, retail stores and commercial spaces",
    "Street, park and urban nightscape lighting",
    "Factories, warehousing, garages and agricultural/livestock facilities",
  ],
  faq: [
    { q: "Which manufacturer is FSL?", a: "FSL stands for Foshan Lighting, a large Chinese lighting manufacturer founded in 1958. It is publicly listed and exports to roughly 80 countries." },
    { q: "What types of fixtures does FSL offer?", a: "A complete range: LED bulbs, T5/T8 tubes and integrated batten fixtures, GU10 spotlights, downlights, panel lights, ceiling lights, floodlights, street lights, garden/pathway lights, track and pendant lights, LED light strips, switches and sockets, and specialty fixtures such as infrared heat lamps." },
    { q: "Can the outdoor fixtures be exposed to rain?", a: "The FSF floodlight series, the FSS street-light series and spike-mounted garden lights are mostly rated IP65-66 and can withstand sun and rain; even so, we recommend inspecting the seals and connectors periodically after installation." },
    { q: "How do I choose color temperature and color rendering?", a: "Choose warm white 2700-3000K for bedrooms and living rooms, natural white 4000K for offices, kitchens and bathrooms, and cool white 6000K for factories and garages; for display and makeup areas, opt for high-CRI models of Ra 90 or above." },
    { q: "Is FSL available in Vietnam?", a: "Please contact Huayuesc supply chain for FSL fixture selection, quotations and supply inquiries tailored to Vietnamese projects and distribution channels." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
