/**
 * Duc Thinh Stone — enriched metadata for the engineered-stone series (product detail pages).
 * Indexed by seriesOriginal (category: "quartz", "marble", "onyx").
 *
 * Sourcing notes:
 *   • Data and specifications: ducthinhstone.com (Duc Thinh Stone Technology Co., Ltd) + industry-standard process parameters.
 *   • Duc Thinh Stone is a member of the Pengxiang group, with its own factory in Nghe An, Vietnam, plus coordinated production capacity in Fujian, China.
 *   • The engineered-stone series is vacuum vibro-compressed from quartz powder / stone powder / mineral powder + resin.
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

export const DTS_SERIES_META: Record<string, SeriesMeta> = {
  quartz: {
    story:
      "Duc Thinh engineered quartz is built on roughly 90% natural quartz powder as its backbone and resin as its binder, formed in a single pass under vacuum, high pressure and vibration — sealing the hardness of mountain rock into every inch of the slab. It is born non-porous: it never absorbs water or harbors grime, so coffee, soy sauce and red wine wipe away with a single pass of the cloth. Its Mohs hardness rivals natural quartz, staying flawlessly smooth even under knife blades and the scrape of cookware. From pure snow white to calm ink gray, from the classic Calacatta gold veining to a playful Pengxiang pink, the color range is broad enough to answer any spatial mood. Slabs up to 3200×1600mm let islands and long countertops run in one continuous sweep, with minimal or even seamless joints. This is no cheap stand-in for natural stone — it is a hard-working countertop engineered for the modern kitchen, tough enough for everyday cooking yet refined enough to carry a designer's vision.",
    heritage:
      "Quartz is today's mainstream choice for high-end kitchen countertops worldwide, prized for durability that surpasses natural stone and a non-porous, antibacterial surface that has become the shared answer for chefs' homes and commercial spaces alike. Duc Thinh draws on the Pengxiang group's quartz manufacturing system, supplying from its own factory in Nghe An, Vietnam in coordination with production capacity in Fujian, China — turning world-class durability into a stable, dependable production reality.",
    technicalSpecs: [
      { label: "Material", value: "Approx. 90% natural quartz powder + resin" },
      { label: "Slab sizes", value: "3200×1600 / 3000×1400 / 3000×1600 / 3000×1200 mm + cut-to-size on request" },
      { label: "Thickness", value: "20 – 30 mm" },
      { label: "Finish", value: "Polished / honed" },
      { label: "Colors", value: "White / gray / black / beige / blue / pink and more, including the Calacatta gold-vein collection" },
      { label: "Key properties", value: "Acid-resistant, stain-resistant, heat-resistant, scratch-resistant, non-porous, antibacterial, eco-friendly low-VOC" },
    ],
    manufacturing: [
      "Duc Thinh Stone — a member of the Pengxiang group, an engineered-quartz supplier and fabricator serving Vietnam and export markets",
      "Roughly 90% natural quartz powder blended with high-purity resin, then distributed, vacuum-degassed and formed in a single high-pressure vibration pass for a dense, void-free slab body",
      "Raw slabs are kiln-cured and set at high temperature, then run through multiple stages from coarse grinding to fine polishing to ensure consistent flatness and uniform gloss",
      "Large-format slabs in sizes such as 3200×1600mm, thicknesses of 20–30mm, with cut-to-size fabrication available",
      "Annual capacity of up to roughly 2.5 million square meters, with the Nghe An, Vietnam factory and the Fujian, China base running in tandem for stable raw materials and lead times",
    ],
    careGuide: [
      { title: "Everyday cleaning", desc: "Wipe with a soft cloth and warm water or a neutral cleaner to restore its shine — no waxing or polishing required, for carefree, maintenance-free upkeep." },
      { title: "Preventive care", desc: "Quartz has excellent heat resistance, but use trivets for hot pots and pans to avoid sudden local thermal shock that can stress the resin." },
      { title: "Stain removal", desc: "Stubborn marks can be lifted with a mild cleaning solution and a non-abrasive sponge, then rinsed clean with water and dried immediately." },
      { title: "What to avoid", desc: "Avoid highly concentrated strong acids or alkalis, abrasive scouring powders and steel wool, which can damage the polished layer." },
    ],
    installation: [
      "Take on-site measurements before fabrication and draw a nesting layout to optimize vein direction and seam placement",
      "Cut with CNC and bridge saws; after drilling and edge-profiling, finely polish the edges to eliminate chipping and stress cracks",
      "Use color-matched quartz-specific adhesive to fill seams, keeping countertop joints within a low-visibility range",
      "Ensure the cabinet support surface is flat and evenly loaded; add support strips and reinforcing ribs at long spans or cutouts",
      "After installation, clean the surface, dress the joints and apply a final polish, inspecting each slab for flatness before handover",
    ],
    certifications: [
      "ISO 9001 — quality management system",
      "Radioactivity-free raw-material control (per-batch reference to NSF / Class A standards)",
      "Routine testing of water absorption, flexural strength, abrasion resistance and chemical resistance",
      "Eco-friendly materials: low-VOC resin meeting green interior-finishing requirements",
      "Export quality control: per-slab grading, color matching and flatness inspection",
    ],
    packaging: [
      { label: "Packaging", value: "Steel A-frame + corner protectors + stretch wrap; export orders add fully nailed wooden crates for reinforcement" },
      { label: "Slab sizes", value: "3200×1600 / 3000×1400 / 3000×1600 / 3000×1200 mm + cut-to-size on request" },
      { label: "Thickness", value: "20 – 30 mm" },
      { label: "MOQ", value: "By container, with mixed colors / sizes supported" },
      { label: "Storage tips", value: "Store upright on A-frames; avoid flat stacking and impacts to slab edges and corners" },
    ],
    whyChoose: [
      { icon: "💎", title: "Hard and durable", desc: "Harder than most natural stones, scratch- and impact-resistant, and virtually maintenance-free." },
      { icon: "🛡️", title: "Non-porous and antibacterial", desc: "Dense and non-porous, it resists water and oil so stains can't penetrate and bacteria struggle to grow, making cleanup effortless." },
      { icon: "🔥", title: "Acid- and heat-resistant", desc: "Stable under everyday acids, alkalis and heat sources, staying like-new even in a busy cooking kitchen." },
      { icon: "🎨", title: "Rich colors and veining", desc: "A full palette of white, gray, black and beige, from Calacatta gold veining to Pengxiang pink, to suit any style." },
      { icon: "📐", title: "Large-format custom slabs", desc: "Large 3200×1600 formats for minimal-seam joinery, with cut-to-size and edge fabrication available." },
    ],
    projectShowcase: [
      "Full kitchen countertops, islands and bar tops for apartments and villas",
      "Reception desks and commercial countertops for hotels and shopping centers",
      "High-end interior wall cladding (dry-hang) and floor paving",
      "Bathroom vanity tops and integrated washbasin units",
    ],
    faq: [
      { q: "Can Duc Thinh quartz be cut to custom sizes?", a: "Yes. We offer cut-to-size fabrication along with drilling, edge-profiling and other edge work, suiting countertop, wall and floor projects." },
      { q: "Is a quartz countertop sensitive to heat?", a: "It has good heat resistance and can withstand brief contact with heat sources; still, we recommend using trivets to avoid prolonged local heat or sudden thermal shock." },
      { q: "What are its advantages over natural marble?", a: "It is non-porous and impermeable, stain- and bacteria-resistant, harder, and more uniform in color and veining — easier to maintain day to day and well suited to high-traffic kitchens." },
      { q: "What are the minimum order quantity and lead time?", a: "Calculated by container / quantity, with lead time agreed per order — typically around 15 days as a reference, subject to actual production scheduling in peak season." },
      { q: "Do you provide samples to confirm color?", a: "Yes. We can ship small sample tiles so you can confirm color and veining before placing a bulk order." },
    ],
  },
  marble: {
    story:
      "Duc Thinh engineered (artificial) marble is composite-pressed from natural stone, marble powder and resin — recreating the warm, refined elegance of natural marble while smoothing away the color variation and hidden cracks that make natural stone such a headache. Its veining is soft and flowing; across large paved areas, slab-to-slab transitions stay even and the rhythm continuous, so an entire lobby reads as one composed, unbroken expanse. With a low defect rate and high yield, and with flexible cutting and joining, project waste is far lower than with natural blocks — giving designers the confidence to express the beauty of stone at grand scale. Polished, honed and sandblasted finishes are all available, shifting in character from mirror-like luxury to understated matte to match any setting. At an equivalent visual tier, it delivers a more controllable budget, more stable supply and a friendlier installation experience — the beauty of marble, no longer expensive and delicate.",
    heritage:
      "With even, stable veining and a lower defect rate, engineered marble has become the practical choice for large decorative areas in hotels, shopping centers and villas. Building on the Pengxiang group's stone system and dual-line capacity across Vietnam and China, Duc Thinh translates the aesthetic language of natural stone into a mass-producible, customizable engineered material.",
    technicalSpecs: [
      { label: "Material", value: "Natural stone + marble powder + resin" },
      { label: "Slab sizes", value: "3200×1600 / 2400×1600 mm + cut-to-size on request" },
      { label: "Thickness", value: "18 – 30 mm" },
      { label: "Finish", value: "Polished / honed / sandblasted, customizable" },
      { label: "Colors", value: "Light beige / pure white / ink black and other marble-look veining" },
      { label: "Applications", value: "Walls, floors, bathrooms, living rooms, countertops and other interior decoration" },
    ],
    manufacturing: [
      "Duc Thinh Stone — an engineered-marble supplier and fabricator under the Pengxiang group, primarily serving Vietnam's interior-decoration and export markets",
      "Natural stone and marble powder composited with resin and vacuum vibro-compressed, with even vein direction and a defect rate lower than natural blocks",
      "Formed slabs are cured and set, then polished, honed or sandblasted as required to present marble looks with varied textures",
      "Large-format slabs of 3200×1600 / 2400×1600mm, thicknesses of 18–30mm, with cut-to-size fabrication and edge work supported",
      "The Nghe An, Vietnam factory and Fujian, China capacity run in coordination for stable supply, with a typical reference production cycle of around 15 days",
    ],
    careGuide: [
      { title: "Everyday cleaning", desc: "Wipe with a soft cloth and warm water or a neutral cleaner to keep the surface dry, clean and bright." },
      { title: "Preventive care", desc: "Avoid leaving highly concentrated acids or alkalis on the surface for long; periodic basic maintenance of walls and floors helps preserve the gloss." },
      { title: "Stain removal", desc: "Wipe away drinks, oils and the like promptly; treat stubborn marks with a mild cleaning solution and a soft pad, then rinse clean with water." },
      { title: "What to avoid", desc: "Avoid scraping with hard objects and heavy impacts to corners; protect slab faces and edges during transport and installation." },
    ],
    installation: [
      "Measure the site and draw a nesting layout before installation to plan vein-matching direction and cutting waste",
      "For walls, prefer a dry-hang or dedicated bonding system to ensure even loading and a low hollow-drum rate",
      "For floors, control substrate flatness and leave the necessary expansion joints to prevent thermal-movement buckling",
      "Fill seams with color-matched, dedicated adhesive for flat joints and a continuous visual flow",
      "After installation, clean the slabs, dress the joints and apply an overall polish, inspecting each slab for flatness and vein-matching",
    ],
    certifications: [
      "ISO 9001 — quality management system",
      "Radioactivity-free raw-material control (per-batch reference to NSF / Class A standards)",
      "Routine physical testing of water absorption, flexural strength, abrasion resistance and more",
      "Eco-friendly materials: low-VOC resin meeting green interior-finishing requirements",
      "Export quality control: per-slab inspection of color matching, flatness and defects",
    ],
    packaging: [
      { label: "Packaging", value: "Steel A-frame + corner protectors + stretch wrap; export orders add fully nailed wooden crates for reinforcement" },
      { label: "Slab sizes", value: "3200×1600 / 2400×1600 mm + cut-to-size on request" },
      { label: "Thickness", value: "18 – 30 mm" },
      { label: "MOQ", value: "By container, with mixed colors / sizes supported" },
      { label: "Storage tips", value: "Store upright on A-frames; avoid flat-stack pressure and corner impacts" },
    ],
    whyChoose: [
      { icon: "🏛️", title: "The beauty of marble", desc: "Elegant marble veining that stays even and continuous in rhythm across large paved areas." },
      { icon: "✂️", title: "Easy to fabricate", desc: "Flexible cutting and joining with high yield, and project waste far lower than natural blocks." },
      { icon: "💰", title: "Great value", desc: "At an equivalent aesthetic tier, budget and supply are more controllable, and the price beats natural marble." },
      { icon: "🎭", title: "Multiple textures", desc: "Polished / honed / sandblasted finishes, from luxurious mirror to understated matte, your choice." },
      { icon: "🧩", title: "Even and stable", desc: "Consistent veining and a low defect rate, free of the color variation and hidden cracks of natural stone." },
    ],
    projectShowcase: [
      "Hotel lobby feature walls and column cladding",
      "Villa living-room and reception-room floor paving",
      "Integrated bathroom wall-and-floor surfaces and vanity tops",
      "Commercial exterior facades and fine interior decoration",
    ],
    faq: [
      { q: "How do I choose between engineered and natural marble?", a: "Choose engineered for even veining, few defects and controllable budget and supply; choose natural if you love one-of-a-kind veining and have an ample budget." },
      { q: "Can it be used on floors?", a: "Yes. With well-controlled substrate flatness and expansion joints, it works for floor paving in living rooms, lobbies and the like — durable and easy to maintain." },
      { q: "What surface finishes are available?", a: "We offer polished, honed, sandblasted and other finishes, with textures customizable to project needs." },
      { q: "Can it be cut to size?", a: "We support cut-to-size fabrication and edge work, suiting wall, floor, countertop and other projects." },
      { q: "What are the minimum order quantity and lead time?", a: "Calculated by container / quantity, with lead time agreed per order — typically around 15 days as a reference." },
    ],
  },
  onyx: {
    story:
      "Duc Thinh engineered onyx is composited from select mineral powder and resin, recreating the half-hidden, light-transmitting texture and dreamlike cloud-veining of natural onyx. When light shines through from behind the slab, the entire wall seems to come alight, a warm glow drifting slowly through the veining — luxurious yet understated. It is more stable and durable than natural onyx: where natural blocks are brittle, prone to cracking and hard to control in veining, engineered onyx offers better toughness and selectable veining and color, greatly improving the predictability of fabrication and joining. Each slab's veining carries its own character, yet stays consistent in feel within a single batch, giving backlit partitions, bar-front facades and decorative countertops a unified, high-end visual presence. It is that finishing touch of light in a space — at once a material and an atmosphere.",
    heritage:
      "Onyx has been a symbol of luxury and translucence since antiquity, yet natural blocks are scarce, prone to cracking and hard to apply over large areas. Duc Thinh engineered onyx brings that dreamlike translucence into contemporary design — backlit partitions, bars and high-end accents — with controllable veining and higher durability.",
    technicalSpecs: [
      { label: "Material", value: "Select mineral powder + resin (onyx-like light transmission)" },
      { label: "Slab sizes", value: "Large-format slabs, cut-to-size on request" },
      { label: "Thickness", value: "Approx. 18 – 30 mm (varies by series)" },
      { label: "Finish", value: "Primarily polished, to accentuate the translucent texture" },
      { label: "Key properties", value: "Onyx cloud-veining, with some series offering backlit light-transmission effects" },
      { label: "Applications", value: "Backlit partitions, bar-front facades, decorative countertops and accent walls" },
    ],
    manufacturing: [
      "Duc Thinh Stone — an engineered-onyx supplier and fabricator under the Pengxiang group, specializing in translucent decorative and accent series",
      "Select mineral powder composited with resin and formed, with vein direction and translucency layers tuned to present a natural onyx-like misty texture",
      "After forming, finely polished to maximize uniform light transmission, with internal bubbles and impurities controlled to ensure a clean backlit appearance",
      "Large-format slabs available with cut-to-size fabrication, suiting custom shapes for partitions, bars and more",
      "The Nghe An, Vietnam factory and Fujian, China capacity run in coordination, with veining, color and sizes customizable per project and lead time agreed per order",
    ],
    careGuide: [
      { title: "Everyday cleaning", desc: "Wipe gently with a soft cloth and warm water or a neutral cleaner, avoiding abrasive particles that could scratch the polished, light-transmitting surface." },
      { title: "Preventive care", desc: "When backlit, control fixture heat to avoid prolonged local high temperatures affecting the resin and translucent layer." },
      { title: "Stain removal", desc: "Treat marks promptly with a mild cleaning solution and rinse clean with water, keeping the translucent surface clear and bright." },
      { title: "What to avoid", desc: "Avoid scratching with hard objects and heavy impacts; protect edges, corners and the translucent slab face during transport and installation." },
    ],
    installation: [
      "Plan fixture placement and slab division per the backlighting scheme before installation to ensure even transmission with no dark zones",
      "Cut with CNC and bridge saws; after drilling and edge-profiling, finely polish the edges to keep the translucent slab edges clean",
      "Use evenly diffusing LED light arrays for backlit zones, controlling the gap between slab back and fixtures to soften hotspots",
      "Fill seams with color-matched dedicated adhesive, and verify the visual effect of the joints under backlighting",
      "After installation, power on and inspect each slab for even light transmission, then clean the polished surface and perform a final acceptance check",
    ],
    certifications: [
      "ISO 9001 — quality management system",
      "Radioactivity-free raw-material control (per-batch reference to NSF / Class A standards)",
      "Testing of flexural strength, abrasion resistance, light-transmission uniformity and more",
      "Eco-friendly materials: low-VOC resin meeting green decoration requirements",
      "Export quality control: per-slab inspection and color matching of the translucent surface and veining",
    ],
    packaging: [
      { label: "Packaging", value: "Steel A-frame + corner protectors + stretch wrap; export orders add fully nailed wooden crates with extra edge and corner protection" },
      { label: "Slab sizes", value: "Large-format slabs + cut-to-size on request" },
      { label: "Thickness", value: "Approx. 18 – 30 mm (varies by series)" },
      { label: "MOQ", value: "By container / quantity, with custom veining and sizes supported" },
      { label: "Storage tips", value: "Store upright on A-frames; avoid flat-stack pressure and scratching the translucent surface" },
    ],
    whyChoose: [
      { icon: "✨", title: "Backlit translucence", desc: "Under backlighting, the glow flows and shifts, creating an elegant, dreamlike finishing-touch atmosphere." },
      { icon: "🎨", title: "Unique veining", desc: "Onyx cloud-veining with its own character, making every slab a one-of-a-kind picture." },
      { icon: "💪", title: "More durable", desc: "Tougher than natural onyx and less prone to brittle cracking, for steadier fabrication and joining." },
      { icon: "🔧", title: "Flexible fabrication", desc: "Supports cut-to-size and custom-shape fabrication, easily adapting to partition and bar designs." },
      { icon: "🌈", title: "Customizable veining and color", desc: "Veining and tone can be tuned per project, keeping the whole batch consistent and the result controllable." },
    ],
    projectShowcase: [
      "Backlit partition walls for hotel lobbies and clubs",
      "Translucent designs for bar fronts, reception and welcome desks",
      "Decorative accents for high-end reception rooms and show units",
      "Backlit countertops and display facades for restaurants / boutiques",
    ],
    faq: [
      { q: "Do all engineered onyx slabs transmit light?", a: "Some series offer backlit light-transmission effects; before ordering, please confirm the specific model's transmission characteristics and recommended thickness." },
      { q: "What are its advantages over natural onyx?", a: "Better toughness and less brittle cracking, controllable and customizable veining and color, and high yield — giving greater predictability for fabrication and large-area applications." },
      { q: "What lighting should be used for backlighting?", a: "We recommend evenly diffusing LED light arrays, with the gap between slab back and fixtures controlled to soften hotspots and avoid dark zones." },
      { q: "Can it be made into partitions and bar designs?", a: "Yes. We support cut-to-size and custom-shape fabrication, suiting backlit partitions, bar fronts, decorative countertops and other designs." },
      { q: "What are the minimum order quantity and lead time?", a: "Calculated by container / quantity, with custom veining and sizes available and lead time agreed per order." },
    ],
  },
};

/** Helper: get metadata by seriesOriginal (category). */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DTS_SERIES_META[seriesOriginal.trim()] || DTS_SERIES_META.quartz;
}
