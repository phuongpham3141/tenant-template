/**
 * Pengxiang recycled stone series metadata — rich content for product detail pages.
 * Indexed by seriesOriginal: quartz (engineered quartz) / marble (engineered marble) / other (same as marble) / onyx (engineered onyx) / terrazzo (engineered terrazzo).
 * Source: px-stone.com — Fujian Pengxiang Industrial, Nan'an Shuitou, Fujian (China's stone capital).
 * Pengxiang is the parent group of Desheng Stone (the Vietnamese legal entity operating the Nghe An plant). Data drawn from Pengxiang product catalogs and standard industry process parameters.
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

export const PENGXIANG_SERIES_META: Record<string, SeriesMeta> = {
  quartz: {
    story:
      "Pengxiang engineered quartz is the craft of reawakening the hard quartz crystals locked deep within the earth. Roughly ninety percent natural quartz powder and high-purity resin are vibration-compacted under vacuum and high pressure, fusing into a single slab that is rock-hard, dense, and non-porous. It is born scratch-resistant, stain-proof, and acid-resistant — coffee, soy sauce, and red wine are merely passing visitors on its surface, wiped clean in a single stroke and leaving no trace of time. From understated off-white to deep, pure black, from gray-veined Calacatta to the radiant gold-veined series, every slab is like a canvas color-tuned by a designer. When a quartz slab is cut into a kitchen countertop, it takes on the warmth of daily meals and supports a family's every aspiration for a quality life.",
    heritage:
      "With its hard, non-porous, virtually maintenance-free surface, quartz has held the top position in engineered countertop materials for years and remains the surface of choice for premium kitchens across Europe, America, and Asia. Rooted in Nan'an Shuitou, China's stone capital, Pengxiang has mastered this category in depth — delivering stable slab supply and a continuously updated Calacatta vein library that brings import-grade quality within reach of everyday homes.",
    technicalSpecs: [
      { label: "Material", value: "Approx. 90% natural quartz powder bonded with high-purity resin" },
      { label: "Slab Sizes", value: "3200×1600mm / 3000×1600mm / 3000×1400mm / 3000×1200mm, cut to size on request" },
      { label: "Thickness", value: "12 – 30mm (18mm / 20mm most common)" },
      { label: "Finish", value: "Polished / matte / sandblasted, customizable" },
      { label: "Properties", value: "Highly resistant to acids, stains, heat, and scratches; non-porous, impermeable surface" },
      { label: "Color Range", value: "White, gray, black, beige, plus gray-veined and gold-veined Calacatta series" },
    ],
    manufacturing: [
      "Founded in 2006 in Nan'an Shuitou, Fujian — China's stone capital — Fujian Pengxiang Industrial is a leading domestic manufacturer of engineered stone and quartz",
      "Quartz aggregate is crushed, screened, and color-matched, then blended with resin and hardener in precise proportions before vacuum vibration pressing into a single form, ensuring a dense, void-free slab body",
      "Pressed blanks are cured and set in high-temperature furnaces, then progressively coarse-ground and fine-ground to a mirror polish on multi-head grinding lines, producing flat slabs with uniform gloss",
      "The full line performs infrared thickness calibration, precision cutting, and four-edge trimming, with strict control of thickness tolerance and diagonal error to ease downstream fabrication",
      "OEM / ODM and made-to-order supported: color, vein, thickness, and surface finish can all be tailored, with monthly capacity reaching several thousand square meters",
    ],
    careGuide: [
      { title: "Daily Cleaning", desc: "Wipe with a soft cloth dampened with warm water or a neutral cleaner to restore the shine — no waxing or sealing required, low-maintenance and durable." },
      { title: "Preventive Care", desc: "Use a cutting board for chopping and a trivet under hot pots to avoid stress damage caused by sudden, localized temperature changes." },
      { title: "Stain Removal", desc: "Treat stubborn stains with a mild cleaner and a non-abrasive pad, wiping gently, then rinse clean with water immediately afterward." },
      { title: "Things to Avoid", desc: "Avoid prolonged contact with concentrated acids or alkalis, strong oxidizers, and abrasive scouring powders to protect the surface gloss." },
    ],
    installation: [
      "Measure the actual site dimensions before fabrication and draw a layout plan to optimize vein direction and cutout positions, reducing cutting waste",
      "Cut blanks with a CNC waterjet or bridge saw, round the corners of sink and cooktop cutouts, and chamfer edges by grinding per the drawing",
      "Ensure the cabinetry or support surface is flat and evenly loaded; add support battens or backing panels to reinforce overhangs and long spans",
      "Bond seams with color-matched quartz adhesive aligned to the veining, level under pressure, and remove excess adhesive",
      "After installation, clean the countertop, grind and polish the seams, and check overall flatness and seam consistency",
    ],
    certifications: [
      "ISO 9001 quality management system certification",
      "Non-radioactive material testing (referencing Class A decorative materials)",
      "Routine testing of water absorption, Mohs hardness, flexural strength, and wear resistance",
      "Eco-friendly low-VOC resin bonding, meeting green building material requirements",
      "Test reports for acid/alkali resistance, stain resistance, and high-temperature resistance",
    ],
    packaging: [
      { label: "Packaging", value: "A-frame steel racks + timber battens + corner guards + stretch film; reinforced wooden crates for export" },
      { label: "Slab Sizes", value: "Large slabs such as 3200×1600mm / 3000×1600mm, cut to size on request" },
      { label: "MOQ", value: "By container / square meter, with mixed loading of multiple colors and sizes supported" },
      { label: "Lead Time", value: "Standard colors ship from stock first; custom colors negotiated per order (15–30 days for reference)" },
      { label: "Samples", value: "Swatches and color cards provided to confirm pattern and surface feel before bulk ordering" },
    ],
    whyChoose: [
      { icon: "💎", title: "Hard & Scratch-Resistant", desc: "Mohs hardness exceeds most natural stone — everyday friction from keys, knives, and forks leaves no marks." },
      { icon: "🛡️", title: "Non-Porous & Impermeable", desc: "The dense, non-porous structure blocks water and oil; grease, wine, and stains wipe clean and harbor no bacteria." },
      { icon: "🔥", title: "Acid & Heat Resistant", desc: "Handles fruit acids, cleaners, and brief high heat with ease, well suited to busy kitchens." },
      { icon: "🎨", title: "Rich Patterns & Colors", desc: "From solid tones to gray- and gold-veined Calacatta, satisfying tastes from minimalist to understated luxury." },
      { icon: "🧼", title: "Easy Care", desc: "No sealing or waxing needed — a quick wipe with a neutral cleaner keeps it looking new for years." },
    ],
    projectShowcase: [
      "Kitchen countertops, island tops, and full cabinetry surfaces in apartments and villas",
      "Hotel and restaurant reception desks, and bars and front counters in commercial spaces",
      "Bathroom vanity tops, shower partitions, windowsills, and interior wall décor",
    ],
    faq: [
      { q: "Will a quartz countertop get scratched by knives?", a: "Quartz is very hard, and everyday friction from knives, forks, and keys rarely leaves marks — but a cutting board is still recommended to protect both the surface and your knives." },
      { q: "Can I place hot pots directly on it?", a: "It tolerates brief high heat, but sudden temperature swings can create stress, so a trivet is recommended — good habits bring peace of mind." },
      { q: "Can it be cut to my kitchen dimensions?", a: "Yes. We support cut-to-size fabrication with cutting, cutouts, and edge profiling to fit any cabinetry layout." },
      { q: "What advantages does it have over natural marble?", a: "Quartz is non-porous and impermeable, stain- and scratch-resistant, with even, stable color — virtually maintenance-free and better suited to high-traffic kitchen countertops." },
      { q: "How are MOQ and lead times calculated?", a: "Ordered by container or square meter, with mixed-color loading supported; standard colors ship quickly from stock, while custom colors are scheduled per order." },
    ],
  },
  marble: {
    story:
      "Pengxiang engineered marble is the answer for those who love marble but fear its fragility — natural stone, marble powder, and resin are composite-pressed to capture cloud-like veining within a uniform, stable slab. Unlike natural marble, with its hard-to-control color variation and prone-to-crack veins, every batch offers predictable, reproducible patterns, so even large-area installations flow seamlessly from wall to floor. Fine-grained crystal white is as warm and gentle as fresh snow, gray veining brings a calm, restrained modernity, and pure black carries a composed grandeur that elevates an entire feature wall. Affordably priced and easy to cut and fabricate, it brings marble's elegance from luxury goods into everyday spaces.",
    heritage:
      "With its beautiful veining, uniform low-blemish surface, and low waste, engineered marble has become the workhorse material for large-area interior décor. Pengxiang's fine-grain series carries forward the stone-fabrication heritage of Nan'an Shuitou, serving home renovation and project work over the long term thanks to its re-polishable, cut-to-size process characteristics.",
    technicalSpecs: [
      { label: "Material", value: "Natural stone + marble powder + resin composite" },
      { label: "Slab Sizes", value: "3200×1600mm / 2400×1600mm, cut to size on request" },
      { label: "Thickness", value: "12 – 30mm (18mm / 20mm most common)" },
      { label: "Finish", value: "Polished / matte / sandblasted, customizable" },
      { label: "Properties", value: "Uniform veining, re-polishable, stain-resistant, easy to clean, excellent value" },
      { label: "Color Range", value: "White (crystal white), gray, black, beige, and more" },
    ],
    manufacturing: [
      "Founded in 2006 in Nan'an Shuitou, Fujian, Fujian Pengxiang Industrial is a leading manufacturer of engineered marble and quartz",
      "Natural stone and marble powder are crushed, batched, and mixed with resin, then vibration-pressed into form; veining is uniformly controlled by formulation and material-spreading techniques for batch consistency",
      "After curing, blanks are progressively processed on grinding and polishing lines, with surfaces available in polished, matte, sandblasted, and other finishes",
      "The full line offers thickness and size calibration with high slab yield, supporting downstream cut-to-size fabrication and edge profiling",
      "OEM / ODM customization of veining, color, dimensions, and surface finish is supported, flexibly serving both project and distribution channels",
    ],
    careGuide: [
      { title: "Daily Cleaning", desc: "Wipe with a soft cloth and warm water or a neutral cleaner, avoiding strong acids, strong alkalis, and concentrated cleaners." },
      { title: "Preventive Care", desc: "Use a cutting board and a trivet when chopping or setting down hot pots, and avoid sudden temperature swings and hard impacts." },
      { title: "Stain Removal", desc: "Treat stubborn stains with a mild cleaner and a non-abrasive pad, then wipe clean immediately." },
      { title: "Refinishing & Care", desc: "If the surface loses its shine after years of use, a professional can re-grind and re-polish it to restore a like-new appearance." },
    ],
    installation: [
      "Measure and draw a layout plan before fabrication to optimize vein matching and bookmatch direction",
      "Cut with CNC and chamfer edges by grinding, with rounded corners at cutouts",
      "Ensure the support surface is flat and evenly loaded, with added backing reinforcement at long spans and overhangs",
      "Bond seams with engineered-stone adhesive aligned to the veining, level, and remove excess adhesive",
      "After installation, clean the slab surface and polish the seams, checking overall flatness and consistency",
    ],
    certifications: [
      "ISO 9001 quality management system certification",
      "Non-radioactive material testing (referencing Class A decorative materials)",
      "Routine testing of water absorption, flexural strength, and wear resistance",
      "Eco-friendly low-VOC resin bonding, meeting green building material requirements",
      "Verified re-polishing refinishing process",
    ],
    packaging: [
      { label: "Packaging", value: "A-frame steel racks + timber battens + corner guards + stretch film; reinforced wooden crates for export" },
      { label: "Slab Sizes", value: "3200×1600mm / 2400×1600mm, cut to size on request" },
      { label: "MOQ", value: "By container / square meter, with mixed loading of multiple colors and sizes supported" },
      { label: "Lead Time", value: "Standard colors ship from stock first; custom colors negotiated per order (from 15 days for reference)" },
      { label: "Samples", value: "Swatches and color cards provided; bulk production begins after pattern and veining are confirmed" },
    ],
    whyChoose: [
      { icon: "🏛️", title: "The Beauty of Marble", desc: "Elegant veining installs uniformly across large areas, lending a premium feel to entire walls and floors." },
      { icon: "✂️", title: "Easy to Fabricate", desc: "Flexible cutting and joining with high slab yield, far less waste than natural stone blocks." },
      { icon: "💰", title: "Excellent Value", desc: "For the same aesthetic effect, the price beats natural marble, making it more project-friendly." },
      { icon: "🔁", title: "Re-Polishable", desc: "Worn surfaces can be re-ground and re-polished to refresh them, extending service life." },
      { icon: "🎯", title: "Stable Patterns", desc: "Formula-controlled veining and color variation ensure batch consistency for worry-free installation." },
    ],
    projectShowcase: [
      "Full-wall installations for living rooms, entryways, and TV feature walls",
      "Hotel and commercial lobby floors and exterior façade cladding",
      "Bathroom walls and floors, shower partitions, and windowsill tops",
    ],
    faq: [
      { q: "How do I choose between engineered and natural marble?", a: "Choose engineered for uniform veining, low color variation, low waste, and controllable cost; choose natural if you prefer one-of-a-kind natural veining and have ample budget." },
      { q: "Can a dulled surface be restored after long use?", a: "Yes. Engineered marble can be re-ground and re-polished to refresh it; a professional can restore the gloss." },
      { q: "Can it be cut to size?", a: "Cut-to-size fabrication and edge profiling are supported per drawing, suiting wall and floor installations and various custom shapes." },
      { q: "Is it suitable for humid bathroom environments?", a: "It is well suited to bathroom walls, floors, partitions, and windowsills — just attend to seam treatment and routine drying." },
      { q: "What are the MOQ and lead time?", a: "Ordered by container or square meter, with mixed-color loading supported; standard colors ship quickly from stock, and custom orders are confirmed per order." },
    ],
  },
  onyx: {
    story:
      "Pengxiang engineered onyx turns light itself into a decorative material — composited from mineral powder and resin, it recreates the dreamlike, translucent, warm, inner-lit quality of natural onyx. When a beam of light shines through from behind the slab, the onyx veining flows like glowing clouds, and an entire partition transforms in an instant from a cold, hard wall into a luminous work of art. More durable, more available, and more controllable in pattern than natural onyx, it makes the rare beauty of onyx no longer the exclusive preserve of a few collectors. On bars, backlit walls, and decorative countertops, it pushes a space's sense of style to its climax.",
    heritage:
      "Natural onyx is rare and delicate; engineered onyx brings this dreamlike beauty into far broader design scenarios through controllable translucency and distinctive veining, making it a favorite for accent lighting in premium commercial and boutique spaces.",
    technicalSpecs: [
      { label: "Material", value: "Mineral powder + resin (translucent onyx effect)" },
      { label: "Slab Sizes", value: "Cut to size on request, with standard large slabs supplied" },
      { label: "Thickness", value: "12 – 30mm (depending on backlighting design)" },
      { label: "Finish", value: "Polished / matte" },
      { label: "Properties", value: "Select series offer a backlit translucent effect with distinctive veining" },
      { label: "Applications", value: "Backlit partitions, bars, decorative countertops, and accent façades" },
    ],
    manufacturing: [
      "Founded in 2006 in Nan'an Shuitou, Fujian, Fujian Pengxiang Industrial has accumulated formulation and pressing expertise for engineered onyx",
      "Mineral powder and resin are blended to a translucent formula and vibration-pressed into form, controlling slab density and translucency uniformity",
      "After curing, blanks are ground and polished, with thickness and surface gloss controlled for backlit applications to highlight the onyx quality",
      "Cut-to-size fabrication and slab joining are supported, with vein alignment matched to the backlight light-box structure",
      "OEM / ODM customization of veining and thickness is supported, serving accent lighting and artistic décor projects",
    ],
    careGuide: [
      { title: "Daily Cleaning", desc: "Wipe gently with a soft cloth and warm water or a neutral cleaner, avoiding strong acids or alkalis that could corrode the surface." },
      { title: "Preventive Care", desc: "Avoid hard impacts and heavy loads; for backlit areas, mind fixture heat dissipation and keep away from sustained high temperatures." },
      { title: "Stain Removal", desc: "Treat stains with a mild cleaner and a soft cloth, then wipe clean immediately to keep the translucency clear." },
    ],
    installation: [
      "Measure and draw a layout plan before fabrication, aligning veining for backlit areas",
      "Cut with CNC and finely grind the edges, with rounded corners at cutouts",
      "Backlit applications require a uniform light-box structure to ensure soft, even light with no visible hotspots",
      "Bond seams with dedicated adhesive aligned to the veining, level, and remove excess adhesive",
      "After installation, clean the slab surface and check translucency uniformity and seam consistency",
    ],
    certifications: [
      "ISO 9001 quality management system certification",
      "Non-radioactive material testing (referencing Class A decorative materials)",
      "Testing of translucency uniformity and flexural strength",
      "Eco-friendly low-VOC resin bonding",
    ],
    packaging: [
      { label: "Packaging", value: "A-frame steel racks + timber battens + corner guards + stretch film; reinforced wooden crates for export" },
      { label: "Slab Sizes", value: "Standard large slabs, cut to size on request" },
      { label: "MOQ", value: "By container / square meter, customization supported" },
      { label: "Lead Time", value: "Negotiated and confirmed per order and custom requirements" },
    ],
    whyChoose: [
      { icon: "✨", title: "Striking Translucency", desc: "Under backlighting, the onyx veins flow like glowing clouds, creating an elegant, dreamlike atmosphere." },
      { icon: "🎨", title: "Distinctive Veining", desc: "Onyx veining differs from slab to slab, giving each project a one-of-a-kind artistic quality." },
      { icon: "🛡️", title: "More Durable", desc: "Stronger and more stable than natural onyx, resistant to cracking and well suited to public spaces." },
      { icon: "🔧", title: "Easy to Fabricate", desc: "Cut to size and joined into slabs, flexibly paired with light boxes and custom shapes." },
      { icon: "🌱", title: "Eco-Friendly & Stable", desc: "Low-VOC resin bonding with controllable batch pattern and color for smoother project delivery." },
    ],
    projectShowcase: [
      "Backlit partitions and artistic feature walls in hotels and clubs",
      "Illuminated countertops for bars, reception desks, and showrooms",
      "Accent façade décor in boutique retail and model homes",
    ],
    faq: [
      { q: "Can all engineered onyx be backlit?", a: "Select series offer a translucent effect suited to backlighting; please confirm the model's translucency characteristics and thickness requirements before ordering." },
      { q: "What should I keep in mind for a backlit wall?", a: "A uniform light-box structure should be provided and fixture heat dissipation considered; using an even light source is recommended to avoid visible hotspots." },
      { q: "Is it more durable than natural onyx?", a: "Engineered onyx is stronger and more stable, resistant to cracking, with more controllable veining and supply, making it well suited to public and commercial spaces." },
      { q: "Can it be customized to size?", a: "Cut-to-size fabrication, slab joining, and edge profiling are supported, paired with backlighting and custom-shape designs." },
    ],
  },
  terrazzo: {
    story:
      "Pengxiang engineered terrazzo turns a retro material back into the star of the trend — stone and glass aggregates of varying sizes are scattered evenly across a clean base, fusing into a slab speckled with starlike points in artful disarray. It carries terrazzo's signature aggregate aesthetic while being flatter, more wear-resistant, and easier to install than traditional cast-in-place terrazzo. From minimalist gray-and-white flecks to lively contrasting color schemes, it can lay an understated premium feel across a floor or piece together the designer's desired character on walls and countertops. Wear- and traffic-resistant, it stays composed even in high-traffic commercial spaces.",
    heritage:
      "With its distinctive aggregate aesthetic and outstanding durability, terrazzo has returned to modern design trends and is widely seen in art galleries, cafés, and boutique retail spaces. Pengxiang replaces cumbersome cast-in-place processes with slab-format terrazzo products, making this retro-chic quality far easier to realize.",
    technicalSpecs: [
      { label: "Material", value: "Stone / glass aggregate + resin or cement base" },
      { label: "Slab Sizes", value: "Standard large slabs, cut to size on request" },
      { label: "Thickness", value: "12 – 30mm (depending on application)" },
      { label: "Finish", value: "Polished / matte" },
      { label: "Properties", value: "Colorful aggregate effect, wear- and traffic-resistant, flat and easy to install" },
      { label: "Applications", value: "Floors, walls, countertops" },
    ],
    manufacturing: [
      "Founded in 2006 in Nan'an Shuitou, Fujian, Fujian Pengxiang Industrial has the batching and pressing expertise for terrazzo slabs",
      "Stone and glass aggregates are evenly mixed per a color formula, composited with a resin or cement base, then vibration-pressed into form for even aggregate distribution",
      "After curing, blanks are ground and polished to expose the cross-sectional aggregate for the classic terrazzo effect, with a flat, smooth surface",
      "The full line offers thickness and size calibration, supporting downstream cut-to-size fabrication and edge profiling",
      "OEM / ODM customization of aggregate size, color scheme, and base type is supported, serving floor, wall, and countertop applications",
    ],
    careGuide: [
      { title: "Daily Cleaning", desc: "Wipe with a soft cloth or mop and a neutral cleaner, avoiding strong acids or alkalis that could damage the base." },
      { title: "Preventive Care", desc: "Place mats at floor entrances to reduce grit being tracked in, and avoid dragging heavy objects that could scratch the surface." },
      { title: "Stain Removal", desc: "Treat stains promptly with a mild cleaner and wipe clean to keep the aggregate cross-section clear and bright." },
    ],
    installation: [
      "Measure and draw a layout plan before fabrication, planning aggregate distribution and seam direction",
      "Cut with CNC and grind the edges, with rounded corners at cutouts",
      "Ensure the substrate is flat and evenly loaded, with leveling work done for floor areas",
      "Bond seams with dedicated adhesive, level, and remove excess adhesive",
      "After installation, clean and polish the seams, checking overall flatness and consistency",
    ],
    certifications: [
      "ISO 9001 quality management system certification",
      "Non-radioactive material testing (referencing Class A decorative materials)",
      "Testing of wear resistance, flexural strength, and water absorption",
      "Eco-friendly low-VOC resin bonding",
    ],
    packaging: [
      { label: "Packaging", value: "A-frame steel racks + timber battens + corner guards + stretch film; reinforced wooden crates for export" },
      { label: "Slab Sizes", value: "Standard large slabs, cut to size on request" },
      { label: "MOQ", value: "By container / square meter, with mixed loading of multiple color schemes supported" },
      { label: "Lead Time", value: "Negotiated and confirmed per order and custom color scheme" },
    ],
    whyChoose: [
      { icon: "🎯", title: "Terrazzo Style", desc: "Modern aggregate aesthetics align with design trends, bringing character to floors, walls, and countertops alike." },
      { icon: "💪", title: "Strong & Durable", desc: "Wear- and traffic-resistant, ideal for high-traffic floors in malls, showrooms, and beyond." },
      { icon: "🪄", title: "Flat & Easy to Install", desc: "Slab format replaces cast-in-place processes for faster installation and a flatter surface." },
      { icon: "🎨", title: "Free Color Choice", desc: "Aggregate size and color scheme are customizable, satisfying tastes from understated to bold contrast." },
      { icon: "🌱", title: "Eco-Friendly & Stable", desc: "Low-VOC resin bonding with even aggregate distribution and controllable batch quality." },
    ],
    projectShowcase: [
      "Floor installations in art galleries, cafés, and concept stores",
      "Floors in high-traffic public spaces such as malls and showrooms",
      "Wall mosaics, bars, and custom countertop décor",
    ],
    faq: [
      { q: "What is the difference between slab terrazzo and cast-in-place terrazzo?", a: "Slab terrazzo is factory-prefabricated with a flatter surface and faster installation, can be cut to size, and spares you the hassle and dust of on-site grinding." },
      { q: "Is it suitable for high-traffic floors?", a: "Very much so. Terrazzo is wear- and traffic-resistant and is a common flooring material for public spaces such as malls, showrooms, and cafés." },
      { q: "Can the aggregate color scheme be customized?", a: "Aggregate size, color scheme, and base type can all be customized, from understated flecks to bold contrasting styles." },
      { q: "Can it be used on walls and countertops?", a: "Yes. Beyond floors, it also suits wall mosaics, bars, and custom countertop décor." },
    ],
  },
};
// other reuses marble metadata (aligning with potentially uncategorized entries in the product data).
PENGXIANG_SERIES_META.other = PENGXIANG_SERIES_META.marble;

export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return PENGXIANG_SERIES_META[seriesOriginal.trim()] || PENGXIANG_SERIES_META.marble;
}
