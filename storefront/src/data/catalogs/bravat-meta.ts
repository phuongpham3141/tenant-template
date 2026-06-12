/**
 * Metadata for Bravat — rich text content for product detail pages.
 * Indexed by seriesOriginal: faucet (faucets and showers) / shower (showers) / basin (basin wastes) /
 * toilet (toilets) / bathtub (bathtubs) / cabinet (bathroom cabinets) / accessory (bathroom accessories).
 * Sources: bravathcm.com (Bravat's official distributor in Vietnam) + bravat.com + general industry sanitary-ware specifications.
 * Bravat belongs to Roman Dietsche (Germany) — over 145 years of history (founded in 1873, in the Black Forest region).
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

/* ── Brand-level shared content (reused across most series, overridden individually by a few) ─────────── */

const BRAND_MFG = [
  "Built on over 145 years of manufacturing expertise from Germany's Roman Dietsche — from a family workshop in the Black Forest in 1873, bringing Europe's exacting sanitary-ware standards to every single component",
  "Faucet bodies are predominantly gravity-cast in a single piece from low-lead brass, then CNC-turned and milled, vibratory-polished, and electroplated through multiple stages, ensuring a dense brass body and a mirror-like surface",
  "Core cartridges use ceramic-disc cartridges from brands such as Fluhs and Kerox, paired with Neoperl aerators, for smooth operation and a soft, stable, water-saving flow",
  "Surface finishes span polished chrome, gold plating, PVD brushed nickel, matte black, gunmetal black, and more, with salt-spray testing and adhesion checks ensuring stain resistance, durability, and no yellowing",
  "Supports complete bathroom solution packages and project customization: from faucets and showers to toilets, basins, bathtubs, bathroom cabinets, and hardware accessories, all available as coordinated sets in a unified style",
];

const BRAND_CARE = [
  { title: "Surface Cleaning", desc: "Wipe with a soft damp cloth dampened with clean water or a neutral cleaner, then dry. Never use steel wool, or cleaners containing acids, alkalis, or abrasive particles, as these can scratch the plated finish." },
  { title: "Cartridge Maintenance", desc: "Ceramic-disc cartridges are durable and smooth. If dripping occurs or the action feels stiff, it is usually due to cartridge wear; simply replace it with a genuine cartridge of the same model to restore performance — no need to replace the entire unit." },
  { title: "Aerator Descaling", desc: "If the flow weakens or splays, unscrew the Neoperl aerator and rinse it with water or soak it in white vinegar to remove scale, keeping the flow even, soft, and water-saving." },
  { title: "Humid-Environment Care", desc: "Bathrooms stay damp for long periods, so we recommend good ventilation and regularly drying residual water from surfaces. This effectively slows scale buildup and extends both shine and service life." },
];

const BRAND_INSTALL = [
  "Before installation, confirm the mounting type based on the product's number of holes and spacing (deck-mounted, vessel, concealed in-wall, or wall-mounted), and verify the countertop or wall hole dimensions",
  "Professional installation by a qualified plumber is recommended. Connect the braided stainless-steel supply hoses (commonly G1/2 or G3/4) with correct threading, applying thread-seal tape properly to prevent leaks",
  "Before turning on the water, flush the pipework to clear out debris and iron filings, then connect the faucet or valve body to prevent grit from lodging in the cartridge and affecting operation and sealing",
  "Check the recommended working pressure (generally around 0.1–0.3MPa), confirm the hot and cold supply lines are positioned correctly, and after turning on the water, inspect each connection for sealing and smooth flow",
  "When installing special finishes such as gold plating, brushed nickel, or matte black, work with a soft cloth underneath to avoid scratches from tools striking the surface directly",
];

const BRAND_CERTS = [
  "Water-saving certification — dual-flush/flow-limiting design paired with Neoperl aerators meets mainstream market water-conservation standards",
  "Ceramic glaze — sanitary ceramics are high-temperature fired with a dense, smooth glaze that is stain-resistant, easy to clean, and resistant to staining",
  "Brass valve body — low-lead brass body with ceramic-disc cartridge, meeting common requirements for sanitary hardware in contact with drinking water",
  "Plating adhesion — surface finishes pass salt-spray and adhesion testing, with corrosion resistance, no yellowing, and tolerance for daily wiping",
  "Warranty period — the complete unit and cartridge are covered under the brand's warranty policy, with after-sales support available through authorized genuine channels",
];

const BRAND_PACK = [
  { label: "Supply Format", value: "Supplied as individual SKUs, and can also be assembled into complete sets as part of a full bathroom solution" },
  { label: "Included Accessories", value: "Braided stainless-steel supply hose, aerator, mounting screws, and sealing components (depending on the specific SKU)" },
  { label: "Outer Carton Protection", value: "Individual color box with foam/EPE inner lining, protective film on plated parts to prevent scratches, and shrink-wrapped, palletized outer cartons" },
  { label: "Included Documentation", value: "Installation manual, certificate of conformity, and genuine-product identification, for easy verification and installation" },
  { label: "Vietnam Market", value: "Showrooms in Hanoi and Da Nang, supplied by the official distributor, with project consultation and delivery support" },
];

/* ── Per-series metadata ─────────────────────────────────────────── */

export const BRAVAT_SERIES_META: Record<string, SeriesMeta> = {
  faucet: {
    story:
      "The Bravat faucet and shower series is where this German bathroom dynasty shows its finest craftsmanship — a single faucet, from molten brass to mirror plating, embodies over a century of dedication to water flow and feel. The single-piece gravity-cast low-lead brass gives it a substantial, solid heft, the ceramic-disc cartridge makes switching between hot and cold as smooth as silk, and the Neoperl aerator blends every stream into a soft, splash-free flow. From polished chrome and gold plating to luxurious editions set with Swarovski crystals, it is both a tool for controlling water and a piece of jewelry on the vanity. Made for those who believe details define style, and who treat each day's turn of the tap as a ritual.",
    heritage:
      "Bravat is sold in more than a dozen markets including Germany, the United States, China, Brazil, Australia, Singapore, and Vietnam, with its premium faucets featured in four- and five-star hotel spaces such as Marriott and Hyatt. German DNA rooted in the Black Forest, combined with a global supply system, gives Bravat faucets both European quality and reliable delivery.",
    technicalSpecs: [
      { label: "Type", value: "Deck-mounted/vessel bathtub faucets, basin faucets, shower faucets (multi-hole split and single-hole)" },
      { label: "Body Material", value: "Single-piece gravity-cast low-lead brass with brass cap; some handles are zinc alloy" },
      { label: "Cartridge", value: "Fluhs / Kerox / Yiming ceramic-disc cartridges (G3/4, etc.), with rotary diverter" },
      { label: "Flow Rate", value: "Spout approximately 20L/min, shower approximately 12L/min @ 0.3MPa" },
      { label: "Surface Finish", value: "Polished chrome / gold plating / PVD brushed nickel / black-and-gold / gunmetal black" },
      { label: "Included Accessories", value: "Neoperl aerator, braided stainless-steel supply hose, handheld shower (depending on model)" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🇩🇪", title: "145+ Years German", desc: "Carrying the Black Forest manufacturing DNA of Roman Dietsche, with European standards governing the quality of every faucet." },
      { icon: "🔧", title: "Ceramic-Disc Cartridge", desc: "Fluhs/Kerox ceramic cartridges operate smoothly with long-lasting durability; if a leak develops, simply swap the cartridge to make it like new." },
      { icon: "💧", title: "Soft Water-Saving", desc: "The Neoperl aerator mixes in air for a soft, splash-free flow, balancing comfortable feel with water-saving performance." },
      { icon: "💎", title: "Luxurious Finishes", desc: "From polished chrome to gold plating, brushed nickel, and black-and-gold, plus Swarovski crystal editions that light up the vanity." },
      { icon: "🛡️", title: "Brass Backbone", desc: "The single-piece gravity-cast low-lead brass body is solid and corrosion-resistant, staying like new even in a damp bathroom." },
    ],
    projectShowcase: ["Four- and five-star hotel guest bathrooms (Marriott, Hyatt Da Nang)", "Premium apartments and villa master bathrooms", "Resorts and spa centers", "Fully fitted residential bathrooms"],
    faq: [
      { q: "What material is the Bravat faucet body?", a: "The vast majority feature a single-piece gravity-cast low-lead brass body paired with a ceramic-disc cartridge, with surfaces finished in polished chrome, gold plating, brushed nickel, or black depending on the series — solid, corrosion-resistant, and attractive." },
      { q: "What is the difference between a multi-hole split faucet and a single-hole faucet?", a: "A split (widespread) faucet has the spout and the hot and cold handles installed as separate pieces, suited to large countertops and bathtub decks with an impressive look; single-hole/three-hole faucets are more compact and fit standard basins. Choose based on the number of holes." },
      { q: "What should I do if the faucet drips or the action feels stiff?", a: "This is usually caused by ceramic cartridge wear; replacing it with a genuine cartridge of the same model restores smooth operation, with no need to replace the whole unit. If the aerator is clogged, unscrew and clean it to remove scale." },
      { q: "Will crystal-set or gold-plated editions fade with daily use?", a: "With normal use and cleaning per the care guidelines, they will not fade; simply avoid acidic, alkaline, and abrasive cleaners and dry water spots promptly to maintain the shine for a long time." },
      { q: "What is the recommended working pressure?", a: "Generally 0.1–0.3MPa is recommended; pressure that is too low affects the shower feel, while if it is too high we recommend fitting a pressure-reducing valve to ensure stable flow and a long sealing life." },
    ],
  },

  shower: {
    story:
      "The Bravat shower series turns the everyday routine of showering into a moment of being cared for. The series includes both conventional showers that let water pour down like rain and handheld-shower shower chairs designed specifically for the elderly and people with limited mobility — the SUS304 stainless-steel frame is sturdy and rust-resistant, the UV-resistant engineering-plastic seat does not fade over time, and an integrated light-sensing module and five-function handheld shower bring safety and dignity together. This is a warmth rarely seen in German bathroom ware: while pursuing refinement, it also builds accessibility and care into the product. It suits every household and venue that wants everyone in the family, of all ages, to shower with peace of mind.",
    heritage:
      "Backed by Bravat's global distribution network and German quality credentials, the shower and assisted-bathing products are widely used in hotels, apartments, and age-friendly spaces. The accessible shower solutions can be experienced firsthand at the Hanoi and Da Nang showrooms in Vietnam.",
    technicalSpecs: [
      { label: "Type", value: "Handheld shower, shower set, handheld-shower shower chair (assisted bathing)" },
      { label: "Frame Material", value: "SUS304 stainless steel, sturdy and rust-resistant" },
      { label: "Seat/Handrail", value: "UV-resistant ASA UMG engineering plastic, fade-free and easy to clean" },
      { label: "Handheld Shower", value: "ABS five-function spray, with long hose" },
      { label: "Functional Module", value: "Integrated light-sensing electronic module (shower chair model)" },
      { label: "Reference Dimensions", value: "Shower chair approximately 728 × 176 × 1230 mm" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Showerhead Descaling", desc: "When the spray holes scale up, rub the silicone spray points with your fingers or a soft brush, or remove the showerhead and soak it in white vinegar, and the flow will return to even." },
      { title: "Hose Care", desc: "After use, store the hose straight and avoid prolonged kinking and pulling, which extends the life of the braided stainless-steel hose and prevents bursting and leaks." },
      { title: "Shower Chair Cleaning", desc: "Wipe the seat and handrails with a neutral cleaner and dry them; periodically check that the frame screws are tight to ensure safe load-bearing." },
      { title: "Anti-Slip Maintenance", desc: "Keep the assisted-bathing area clean and non-slip, and use it together with the handrails to give the elderly and those with limited mobility steadier support." },
    ],
    installation: [
      "For shower sets, determine the slide-bar/holder height based on the wall supply outlet position, leaving space for servicing and hot/cold connections",
      "Fit the sealing washers at both ends of the handheld shower hose properly and hand-tighten until leak-free, avoiding excessive force that could damage the threads",
      "Shower chair installation requires finding a solid load-bearing point in the wall and securing it firmly with the supplied expansion anchors to ensure the seat can bear weight",
      "Before turning on the water, flush the pipework to clear out debris, then check that the hose connections and shower flow are smooth and leak-free",
      "For age-friendly settings, we recommend planning handrails and non-slip flooring at the same time to form a complete accessible shower route",
    ],
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🚿", title: "Comfortable Water Feel", desc: "The five-function handheld shower switches between spray modes, combining aerated and rainfall feels for a more enjoyable shower." },
      { icon: "♿", title: "Accessible Care", desc: "The handheld-shower shower chair is designed specifically for the elderly and those with limited mobility, achieving both safety and dignity." },
      { icon: "🛡️", title: "Stainless-Steel Frame", desc: "The SUS304 frame is sturdy and rust-resistant, holding weight reliably over the long term even in a damp shower environment." },
      { icon: "☀️", title: "UV-Resistant, Fade-Free", desc: "The ASA UMG engineering-plastic seat and handrails resist ultraviolet light and will not yellow or fade with long-term use." },
      { icon: "💡", title: "Thoughtful Details", desc: "Human-centered designs such as the integrated light-sensing electronic module extend German refinement to every moment of the shower." },
    ],
    projectShowcase: ["Care facility and age-friendly residential bathrooms", "Hotel accessible guest rooms and public shower areas", "Hospital and rehabilitation center shower rooms", "Family bathrooms with elder care in mind"],
    faq: [
      { q: "Who is the handheld-shower shower chair suitable for?", a: "It is designed specifically for the elderly, pregnant women, post-surgery recovery, and those with limited mobility, providing a stable seated shower and a safe grip so that those needing assistance can also manage with dignity." },
      { q: "Is a weakening shower flow a sign it is broken?", a: "It is usually scale buildup in the spray holes. Silicone spray points can be cleaned by rubbing with your fingers, and metal showerheads can be removed and soaked in white vinegar to descale; once cleaned, the flow returns to even as before." },
      { q: "Are there wall requirements for installing the shower chair?", a: "It must be fixed to a solid load-bearing wall using the supplied expansion anchors; lightweight partition walls need a reinforcing backing board added first to ensure the seat and handrails can stably support an adult's weight." },
      { q: "How often does the hose need replacing?", a: "Genuine braided stainless-steel hoses have a long life; if you notice the outer layer bulging, rusting, or the connections leaking, replace it promptly to prevent bursting. Storing it straight day to day will extend its life." },
    ],
  },

  basin: {
    story:
      "The Bravat basin series and accessories focus on the parts of the washbasin area that are unseen yet most critical — the push-button pop-up waste. The pop-up drain mechanism may look simple, but it must stay smooth, sealed, and odor-free through daily opening and closing. Bravat builds on a premium brass body paired with a SUS304 stainless-steel strainer basket for rust resistance, corrosion resistance, and lasting durability in damp environments; finishes such as polished chrome, chrome plating, and rose gold make even this small waste a finishing touch on the basin. It is written for those who understand that 'luxury hides in the details' — wanting even the drain to be beautifully crafted and reassuring to use.",
    heritage:
      "As a key accessory in Bravat's complete bathroom solutions, the basin waste is widely paired with brand basins and third-party basins, reaching hotels, premium apartments, and fully fitted homes. German quality standards ensure the sealing and durability of every waste.",
    technicalSpecs: [
      { label: "Type", value: "Push-button pop-up basin waste, available with or without overflow" },
      { label: "Body Material", value: "Premium brass, some with SUS304 stainless-steel strainer basket" },
      { label: "Drain Mechanism", value: "Push-button pop-up, fast draining with sealed backflow prevention" },
      { label: "Surface Finish", value: "Polished chrome / chrome plating / rose gold, etc." },
      { label: "Compatible Basins", value: "Models available for both overflow and non-overflow basins" },
      { label: "Performance", value: "Backflow-resistant, leak-resistant, odor-resistant, and corrosion-resistant in damp environments" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Daily Cleaning", desc: "Wipe the visible parts of the waste with a damp cloth and a neutral cleaner, then dry; avoid abrasive cleaners that can scratch the plated finish." },
      { title: "Strainer Debris Removal", desc: "Periodically remove or unscrew the strainer basket to clear hair and debris, keeping drainage smooth and reducing clogs and odors." },
      { title: "Seal Care", desc: "If the push-button rebound becomes stiff or the seal weakens, clean the pop-up core and apply a bathroom-specific lubricant to restore the feel." },
      { title: "Odor Prevention", desc: "Use it together with an S/P trap to block sewer odors; if it is unused for a long time, top up the floor drain/trap to maintain the water seal." },
    ],
    installation: [
      "Choose the corresponding model based on whether the basin has an overflow (overflow models retain an overflow channel and cannot be used interchangeably)",
      "During installation, apply sealant or fit a sealing washer between the basin bottom and the waste flange, and tighten the lock nut to ensure a leak-free seal",
      "Align the waste tailpipe with the trap and the wall/floor drain connection, ensuring proper spacing and a smooth slope",
      "After installation, run water to test whether the push-button pop-up operates smoothly, whether draining is fast, and whether any connection leaks",
      "When installing special finishes (such as rose gold), work with a soft cloth underneath to avoid marks from tools striking the surface",
    ],
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🔘", title: "One-Push Pop-Up", desc: "The push-button pop-up mechanism opens and closes smoothly, with fast draining and a reliable seal — goodbye to the fuss of lift-rod types." },
      { icon: "🛡️", title: "Brass Corrosion Resistance", desc: "The premium brass body resists rust and corrosion in a damp bathroom, far more durable than plastic wastes." },
      { icon: "🧽", title: "Easy-Clean, Odor-Resistant", desc: "The SUS304 strainer makes it easy to clear hair and debris, and together with the trap it effectively blocks sewer odors." },
      { icon: "✨", title: "Refined Finish", desc: "From polished chrome and chrome plating to rose gold, multiple finishes make the drainage detail a highlight on the vanity." },
      { icon: "🔗", title: "Flexible Compatibility", desc: "A full range of overflow and non-overflow models fits brand basins and a variety of third-party basins." },
    ],
    projectShowcase: ["Hotel guest rooms and public washbasins", "Premium apartment and villa basin areas", "Resort and spa center washing areas", "Coordinated fittings for fully fitted residential bathrooms"],
    faq: [
      { q: "How do I choose between an overflow and non-overflow waste?", a: "It depends on the basin itself: if there is a small overflow hole on the upper side of the basin, choose the overflow model (the waste retains an overflow channel); for basins without an overflow, choose the non-overflow model. The two cannot be used interchangeably." },
      { q: "What makes a brass waste better than a plastic one?", a: "The brass body has high strength, resists corrosion and rust, and bears load well, without aging and becoming brittle in long-term damp environments; plastic versions are lighter and more economical. For durability and a quality feel, brass is recommended." },
      { q: "How do I handle a stiff push-button rebound?", a: "This is usually due to grime buildup or lack of lubrication on the pop-up core; remove it, clear away hair and debris, and apply a bathroom-specific lubricant to restore smooth operation — no need to replace the whole unit." },
      { q: "Is a drain odor a problem with the waste?", a: "The waste itself prevents backflow; odors usually come from a missing trap or a dried-out water seal. Please confirm the matching S/P trap and maintain the water seal to effectively block odors." },
    ],
  },

  toilet: {
    story:
      "The Bravat toilet series is the German bathroom tradition's ultimate answer to three things: clean, quiet, and water-saving. From the classic floor-standing one-piece toilet to powerful jet-siphonic smart toilets, Bravat uses dual-flush water-saving (as low as 3/4.5L) along with wash-down/jet-siphonic technology to make every flush crisp and economical; UF/PP soft-close lids close gently and silently, eliminating the awkwardness of slamming lids. Premium smart models further integrate electronic functions, IPX4 waterproofing, and wide pressure adaptability, upgrading the toilet experience into one cared for by technology. It suits modern households and hotels that pursue clean quality and water-saving responsibility, and want a bathroom that is both efficient and quiet.",
    heritage:
      "Bravat sanitary ceramics are produced to German quality standards, with dense glazes and reliable flushing. Floor-standing and smart toilets are widely used in four- and five-star hotels, premium apartments, and residential projects, and are supplied and supported by the official distributor in the Vietnam market.",
    technicalSpecs: [
      { label: "Type", value: "Floor-standing one-piece toilet, one-piece bowl, tankless smart toilet" },
      { label: "Flushing Technology", value: "Wash Down / Jet Siphonic" },
      { label: "Flush Volume", value: "Dual-flush 3/4.5L, 3.5/5L; smart siphonic model approximately 5.0L" },
      { label: "Waste Outlet", value: "Horizontal P-trap (spacing approximately 180mm) / S-trap (rough-in approximately 305mm)" },
      { label: "Seat Lid", value: "UF / PP material, soft-close and silent" },
      { label: "Smart Model Electrical", value: "AC220V 50Hz, approximately 650W, IPX4 waterproof, water pressure approximately 0.15–0.75MPa" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Glaze Cleaning", desc: "Clean with a toilet-specific neutral cleaner and a soft brush, avoiding strong acids, strong alkalis, and hard objects that scratch, to keep the glaze smooth and stain-free." },
      { title: "Soft-Close Lid Care", desc: "Let the soft-close lid fall naturally; do not force it down. If the hinges loosen, adjust or replace the soft-close damper components to restore quiet, gentle closing." },
      { title: "Smart Model Maintenance", desc: "Periodically clean the spray wand and filter screen, and replace the filter cartridge as prompted; before power-off or extended non-use, drain the internal water lines per the instructions to prevent freezing and scaling." },
      { title: "Tank/Flush Components", desc: "The fill valve and flush valve are wearing parts; if the water flow is abnormal or there is a leak, simply replace them with components of the same model, and check the sealing rings periodically." },
    ],
    installation: [
      "Before installation, be sure to verify the toilet's waste outlet type and spacing (P-trap approximately 180mm / S-trap approximately 305mm) and align it with the drain rough-in",
      "Apply sealant or fit a sealing washer between the toilet base and the floor to secure it, ensuring it is stable and does not wobble, and that the waste outlet is sealed against odors",
      "Connect the supply angle valve and hose, and after installation, test-flush several times to check the flushing performance, the soft-close lid, and all the seals",
      "Smart toilets require a dedicated, well-grounded outlet, with wiring run to waterproof requirements to prevent water entering the outlet",
      "For smart models, install the supplied filter and flush the pipework before turning on the water to prevent debris from damaging the solenoid valve and spray wand",
    ],
    certifications: BRAND_CERTS,
    packaging: [
      { label: "Supply Format", value: "Supplied as a complete unit (including seat lid and accessories) or as a standalone bowl, available as coordinated sets" },
      { label: "Included Accessories", value: "Soft-close seat lid, mounting screws/expansion anchors, sealing ring, supply hose (depending on model)" },
      { label: "Outer Carton Protection", value: "Ceramic parts with thickened foam plus honeycomb-paper corner guards, protected against pressure and impact, shipped palletized" },
      { label: "Included Documentation", value: "Installation manual, certificate of conformity; smart models include electrical and operating instructions" },
      { label: "Vietnam Market", value: "The Hanoi and Da Nang showrooms offer hands-on experience, with supply and after-sales by the official distributor" },
    ],
    whyChoose: [
      { icon: "💧", title: "Dual-Flush Water Saving", desc: "Dual-flush as low as 3/4.5L saves water without compromise, with flushing power that remains crisp and thorough." },
      { icon: "🌀", title: "Powerful Flush", desc: "Wash-down and jet-siphonic technology combined with a dense glaze flush cleanly and resist staining." },
      { icon: "🤫", title: "Quiet Soft-Close", desc: "The UF/PP soft-close lid closes gently and silently, eliminating slamming-lid noise so the whole family can use it with peace of mind." },
      { icon: "🤖", title: "Smart Experience", desc: "The tankless smart model integrates electronic functions and IPX4 waterproofing, upgrading the toilet into a tech-enabled experience." },
      { icon: "🇩🇪", title: "German Quality", desc: "Produced to Roman Dietsche standards, with reliable glaze and flushing and hotel-project-grade durability." },
    ],
    projectShowcase: ["Four- and five-star hotel guest bathrooms", "Premium apartments, villas, and fully fitted homes", "Resorts and spa centers", "Commercial and residential support projects"],
    faq: [
      { q: "What should I confirm before buying a toilet?", a: "The most important thing is the waste outlet type and spacing: horizontal P-trap is usually about 180mm, and floor S-trap is about 305mm. Be sure to measure the rough-in distance accurately before selecting, otherwise it cannot be aligned for installation." },
      { q: "Are there special requirements for installing a smart toilet?", a: "It requires a dedicated, well-grounded waterproof outlet, a filter installed on the supply side, and wiring run to IPX4 waterproof requirements; we recommend professional installation and flushing the pipework before turning on the water." },
      { q: "Will dual-flush 3/4.5L fail to flush clean?", a: "No. Bravat uses jet-siphonic/wash-down flushing combined with a dense glaze to optimize the flush path — the small flush handles daily use and the large flush handles heavy loads, saving water while flushing thoroughly." },
      { q: "Can the soft-close lid be replaced on its own if it breaks?", a: "Yes. The seat lid and soft-close damper components are wearing parts; simply purchase and replace the same model by part number, with no need to replace the entire toilet." },
      { q: "Can a P-trap be converted to an S-trap?", a: "Some models can be converted from horizontal to floor drainage with a dedicated conversion accessory (such as P60391N); please refer to the product instructions to confirm whether it is supported and the spacing after conversion." },
    ],
  },

  bathtub: {
    story:
      "The Bravat bathtub series accessories protect the safety and drainage details most easily overlooked during a bath — the brass bathtub waste, handrails, and drain kits. A quality waste must stay sealed, smooth, and draining cleanly through repeated filling and emptying; a sturdy brass handrail is the steady support you rely on when getting in and out of the tub. Bravat crafts the body from solid brass for rust and corrosion resistance and robust load-bearing in damp environments; the polished chrome surface and refined lines give even functional parts an air of luxury. It is written for those who treat bathing as a relaxing ritual and also care about safety and quality.",
    heritage:
      "As part of Bravat's complete bathroom solutions, the bathtub wastes and handrails are widely paired with freestanding and built-in bathtubs, reaching hotels, villas, and spa spaces. German hardware standards ensure long-term reliability of sealing and load-bearing.",
    technicalSpecs: [
      { label: "Type", value: "Bathtub waste/drain kit (with or without overflow), bathtub handrail" },
      { label: "Body Material", value: "Brass; some drain parts use premium ABS" },
      { label: "Waste Length", value: "Approximately 650mm / 900mm (depending on tub type and whether it has an overflow)" },
      { label: "Handrail Dimensions", value: "Approximately 420 × 270 × 112 mm, with mounting brackets" },
      { label: "Surface Finish", value: "Polished chrome / chrome plating, corrosion-resistant and durable in damp environments" },
      { label: "Performance", value: "Fast draining, sealed and leak-proof, with a sturdy, anti-slip load-bearing handrail" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Waste Cleaning", desc: "Periodically remove the waste strainer/plug to clear hair and debris, keeping drainage smooth; wipe the visible parts with a damp cloth and dry." },
      { title: "Seal Inspection", desc: "When draining, watch for leaks at the overflow outlet and waste connection, and promptly replace the sealing rings with the same parts when they harden with age." },
      { title: "Handrail Care", desc: "Periodically check whether the handrail bracket screws are loose and tighten them, and wipe the brass surface with a soft cloth to keep load-bearing reliable and the finish shiny." },
      { title: "Scale and Corrosion Prevention", desc: "In hard-water areas the surface scales easily, so drying water spots promptly and cleaning regularly slows scale buildup and keeps the plating bright." },
    ],
    installation: [
      "Choose the corresponding waste kit based on whether the bathtub has an overflow and on the spacing, and verify the tub-bottom hole dimensions",
      "Fit a sealing washer or apply sealant between the waste flange and the tub body, tighten the lock nut, and align and connect the overflow pipe to ensure a leak-free seal",
      "Connect the waste tailpipe to the drain/trap, ensuring a smooth slope, fast draining, and a water seal against odors",
      "The bathtub handrail must be fixed to a solid load-bearing wall and installed firmly with the supplied expansion anchors to ensure safe load-bearing when getting in and out",
      "After installation, fill with water to test draining and the seals at each connection, and confirm the handrail's load-bearing before putting it into use",
    ],
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🛁", title: "Smooth Drainage", desc: "The quality waste kit fills and empties freely with a leak-proof seal, draining fast and clean after a bath with no standing water." },
      { icon: "🛡️", title: "Brass Corrosion Resistance", desc: "The solid brass body resists rust and corrosion in the damp bathtub environment with robust load-bearing, more durable than plastic parts." },
      { icon: "🤝", title: "Safety Handrail", desc: "The sturdy brass handrail provides reliable support for getting in and out of the tub, making bathing more reassuring and safer." },
      { icon: "✨", title: "Refined Details", desc: "The polished chrome surface and crisp lines give even functional accessories the luxurious quality of a complete bathroom." },
      { icon: "🔗", title: "Flexible Fitting", desc: "With or without overflow and multiple lengths available, fitting freestanding and built-in bathtubs across various installations." },
    ],
    projectShowcase: ["Villa and premium apartment bathing areas", "Resort and spa center bathtub spaces", "Five-star hotel suite bathrooms", "Age-friendly and safety bathtub solutions"],
    faq: [
      { q: "Should I choose a 650mm or 900mm bathtub waste?", a: "It depends on the bathtub size, the distance from the drain outlet to the overflow outlet, and whether it has an overflow. Larger tubs / those with overflow usually use the longer version; please select after measuring the tub holes and spacing." },
      { q: "How do I choose between a brass waste and an ABS waste?", a: "The brass version has high strength, good corrosion resistance and load-bearing, and a fine quality feel, suited to premium and long-term use; the ABS version is light, economical, and also corrosion-resistant. Budget and positioning determine the choice." },
      { q: "Can a bathtub handrail be installed on any wall?", a: "It must be fixed to a solid load-bearing wall using the supplied expansion anchors; lightweight partitions or hollow-sounding tile areas need a reinforcing backing board added first to stably support an adult's weight." },
      { q: "What should I do about an odor after draining?", a: "The waste itself prevents backflow; odors mostly come from a missing trap or a dried-out water seal. Confirm the matching trap and maintain the water seal to block odors, and remember to top up the water when it is unused for a long time." },
    ],
  },

  cabinet: {
    story:
      "The Bravat bathroom cabinet series is the art of turning 'storage' into 'soft furnishing' — mirror cabinets, vanity units, and integrated basins presented as coordinated sets, giving the washing area style beyond function. The cabinet body uses 16mm melamine-faced plywood for moisture and scratch resistance and stable, fade-free color, available in finishes from black tones to deep wood grain and stone patterns; the LED anti-fog smart mirror keeps the morning reflection clear and unfogged, the engineered-stone/rock-plate combined with the ceramic basin features an anti-overflow ring, and DTC silent hinges and slides open and close smoothly. It is written for those who believe 'the bathroom is also the face of the home' and want both storage and good looks.",
    heritage:
      "As a core unit of Bravat's complete bathroom solutions, the coordinated bathroom cabinets unify the style of faucets, basins, and hardware in a German design language, widely used in hotels, premium apartments, and fully fitted homes, and can be experienced firsthand at the Hanoi and Da Nang showrooms in Vietnam.",
    technicalSpecs: [
      { label: "Set Configuration", value: "LED smart mirror/mirror cabinet + vanity unit + integrated basin, supplied as a coordinated set" },
      { label: "Cabinet Material", value: "16mm melamine-faced plywood, moisture- and scratch-resistant; 4mm eco-friendly mirror glass" },
      { label: "Basin Material", value: "Engineered stone/rock plate combined with ceramic basin, with anti-overflow ring" },
      { label: "Mirror Functions", value: "LED lighting, anti-fog (select models), double-door mirror cabinet with storage" },
      { label: "Hardware", value: "DTC silent hinges + slides, with legs/drawers" },
      { label: "Finish Tones", value: "Black / deep wood grain / Lund Marble, Deep Ink Fly, and other stone patterns" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Cabinet Cleaning", desc: "Wipe the faced panels with a wrung-out soft cloth, avoiding leaving large amounts of water standing for long periods; do not repeatedly soak the edge banding with a wet cloth, to prevent moisture damage and swelling." },
      { title: "Basin Care", desc: "Clean the engineered-stone/rock-plate/ceramic basin with a neutral cleaner, avoiding knife scratches and strong acids and alkalis; clean the anti-overflow ring regularly to maintain the seal." },
      { title: "Mirror Maintenance", desc: "For the LED smart mirror, spray a dedicated glass cleaner onto a cloth and wipe; do not spray directly onto the frame; gently wipe the anti-fog film area and avoid scratching with hard objects." },
      { title: "Hardware Maintenance", desc: "Periodically check whether the DTC hinges and slides open and close smoothly, fine-tune the screws when loose, and add a little lubricant to keep them silent and smooth." },
    ],
    installation: [
      "Confirm the positions of the wall/floor drain and supply angle valve first, and lay out the water lines aligned with the cabinet and basin holes",
      "Wall-mounted cabinet bodies must be fixed to a solid load-bearing wall or a reinforcing backing board, and hung firmly using the supplied brackets/expansion anchors",
      "Connect the basin waste and trap properly with the sealing ring fitted, and after installation, run water to check for no leaks",
      "For the LED smart mirror, provide a waterproof power supply/wiring per the instructions with reliable grounding and wiring kept clear of water, then fix it to the wall",
      "After everything is installed, adjust the cabinet door/drawer gaps and check that the hinges and slides are smooth and the mirror lighting and anti-fog functions work normally",
    ],
    certifications: [
      "Moisture-resistant substrate — 16mm melamine-faced plywood with edge banding, suited to the damp bathroom environment",
      "Eco-friendly mirror — 4mm eco-friendly silver mirror, clear imaging, with moisture-resistant treatment on the mirror back",
      "Ceramic glaze — the integrated ceramic/rock-plate basin has a dense glaze that is stain-resistant and easy to clean",
      "Hardware warranty — DTC silent hinges/slides are durable and covered under the brand's warranty policy",
      "Electrical safety — the LED smart mirror is designed to waterproof and electrical-safety requirements (anti-fog models)",
    ],
    packaging: [
      { label: "Supply Format", value: "Supplied as a coordinated set (mirror + basin + cabinet body), assembled in a unified style" },
      { label: "Included Accessories", value: "Brackets/expansion anchors, waste, sealing components, installation instructions (depending on model)" },
      { label: "Outer Carton Protection", value: "Mirror and ceramic basin with thickened foam plus corner guards, cabinet body film-wrapped against scratches, packed in separate pieces against pressure and impact" },
      { label: "Included Documentation", value: "Installation manual, certificate of conformity; smart mirrors include electrical instructions" },
      { label: "Vietnam Market", value: "The Hanoi and Da Nang showrooms offer hands-on experience, supplied by the official distributor" },
    ],
    whyChoose: [
      { icon: "🪞", title: "Smart Mirror Cabinet", desc: "LED lighting plus anti-fog keeps the morning reflection clear; the double-door mirror cabinet combines lighting with hidden storage." },
      { icon: "🗄️", title: "Coordinated Aesthetics", desc: "Mirror + basin + cabinet body in a unified style, flowing seamlessly with the faucets and hardware — the washing area is the face of the home." },
      { icon: "💧", title: "Moisture-Resistant Durability", desc: "16mm moisture-resistant faced panels plus edge-banding craftsmanship handle bathroom damp with ease, with stable, fade-free color." },
      { icon: "🪨", title: "Stone Basin", desc: "Engineered stone/rock plate combined with a ceramic basin and anti-overflow ring, with a luxurious feel that is stain-resistant and easy to clean." },
      { icon: "🔇", title: "Silent Hardware", desc: "DTC soft-close hinges and slides open and close smoothly and silently, remaining easy to use over the long term." },
    ],
    projectShowcase: ["Premium apartment and villa washing areas", "Hotel guest room coordinated bathroom fittings", "Resorts and spa centers", "Coordinated bathroom solutions for fully fitted homes"],
    faq: [
      { q: "Will melamine-faced panels absorb moisture and warp in the bathroom?", a: "The 16mm plywood has moisture-resistant edge-banding treatment; with normal use, good ventilation, and prompt drying of standing water, it will not absorb moisture; just never let the cabinet body soak in water for long or let water enter through broken edge banding." },
      { q: "Are there wall requirements for a wall-mounted bathroom cabinet?", a: "It must be fixed to a solid load-bearing wall or a pre-embedded reinforcing backing board, hung firmly using the supplied brackets; for hollow brick/lightweight walls we recommend reinforcing first to ensure they can bear the weight of the cabinet and basin." },
      { q: "Is the basin better in engineered stone, rock plate, or ceramic?", a: "The ceramic glaze is classic, easy to clean, and great value; engineered stone/rock plate has a strong integrated feel, a more luxurious quality, and scratch resistance. All three feature an anti-overflow ring, so choose based on budget and style." },
      { q: "Will the smart mirror's anti-fog and lighting break?", a: "These are electrical parts; installed to waterproof and electrical regulations and with the frame kept free of water, they can be used stably over the long term; any faults are mostly wiring or light-strip issues, which can be fixed by replacing the corresponding components." },
    ],
  },

  accessory: {
    story:
      "The Bravat bathroom accessory series is the finishing touch of the complete bathroom — robe hooks, hooks, and other hardware may be small, but they determine the final measure of refinement and consistency in the space. The series is built primarily from stainless steel and zinc alloy for oxidation and corrosion resistance, with surfaces finished in premium chrome plating, matte black, gunmetal black, and more — stain- and fingerprint-resistant, easy to wipe, and non-yellowing. The minimalist, crisp-edged lines let every accessory echo the style of the faucets and cabinets seamlessly. It is written for those who keep life in good order and will not settle for even a single hook.",
    heritage:
      "As the finishing element of Bravat's complete bathroom solutions, the hardware accessories echo the whole-bathroom style with unified surface finishes and design language, widely used in hotels, premium apartments, spa centers, and fully fitted homes.",
    technicalSpecs: [
      { label: "Type", value: "Robe hooks/bathrobe hooks, towel hooks, and other bathroom hardware accessories" },
      { label: "Body Material", value: "Stainless steel / zinc alloy (some models combine SUS304 for rust resistance)" },
      { label: "Surface Finish", value: "Premium chrome plating / matte black / gunmetal black" },
      { label: "Surface Performance", value: "Stain-, fingerprint-, and dust-resistant, easy to wipe, non-yellowing" },
      { label: "Styling", value: "Minimalist modern with crisp edges, echoing the whole-bathroom style" },
      { label: "Mounting Compatibility", value: "Wall-mounted, with expansion anchors/screws or adhesive (depending on model)" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Daily Wiping", desc: "Wipe with a soft damp cloth to remove water spots and fingerprints; for matte black/gunmetal black surfaces, avoid abrasives so as not to damage the matte texture." },
      { title: "Corrosion-Prevention Care", desc: "Keep the surface dry and dry off splashes promptly, which slows scale and oxidation and keeps the plating bright or the matte finish even over the long term." },
      { title: "Fastening Check", desc: "Periodically check whether the base screws of load-bearing hooks are loose and tighten them, avoiding hanging overly heavy items that could cause them to come loose." },
    ],
    installation: [
      "Determine the installation height and position based on hanging needs, avoiding hollow-sounding tile and the wall's water and electrical lines",
      "For drilled installation, drill into the tile joint or the mid-lower part of the tile and secure with expansion anchors to avoid chipping; for adhesive models, press in place and let cure per the instructions",
      "Ensure the base fits flat against the wall with a seal, and in damp areas prevent water entering the back and causing rust",
      "After installation, do a light load-bearing check to ensure the hook is secure and does not wobble before putting it into use",
      "When installing special finishes (matte black/gunmetal black), work with a soft cloth underneath to avoid tools scratching the coating",
    ],
    certifications: [
      "Corrosion-resistant material — stainless steel/zinc alloy body resists oxidation and corrosion, suited to the damp bathroom environment",
      "Plating adhesion — surface finishes pass salt-spray and adhesion testing, stain-resistant and non-yellowing",
      "Matte coating — matte black/gunmetal black surfaces resist fingerprints, are easy to wipe, and have an even color",
      "Warranty support — covered under the brand's warranty policy, with after-sales through authorized genuine channels",
    ],
    packaging: [
      { label: "Supply Format", value: "Supplied individually, and can be coordinated into sets by series for a unified style" },
      { label: "Included Accessories", value: "Expansion anchors/mounting screws or adhesive accessories, base sealing components (depending on model)" },
      { label: "Outer Carton Protection", value: "Individual color box plus foam inner lining, with protective film on the surface against scratches" },
      { label: "Included Documentation", value: "Installation instructions and genuine-product identification" },
      { label: "Vietnam Market", value: "The Hanoi and Da Nang showrooms offer hands-on experience, supplied by the official distributor" },
    ],
    whyChoose: [
      { icon: "🪝", title: "Refined Storage", desc: "The minimalist, crisp robe hooks neatly put bath towels and robes in their place, improving the tidiness of the space." },
      { icon: "🖤", title: "Versatile Finishes", desc: "Chrome plating, matte black, and gunmetal black finishes easily echo the whole-bathroom soft-furnishing style." },
      { icon: "🛡️", title: "Corrosion-Resistant Durability", desc: "The stainless steel/zinc alloy body resists oxidation and corrosion, staying like new even in a damp bathroom environment." },
      { icon: "🧽", title: "Stain-Resistant, Easy-Clean", desc: "The surface resists stains, fingerprints, and dust; a gentle wipe cleans it, making maintenance effortless." },
      { icon: "🎯", title: "Coordinated Unity", desc: "Consistent with the Bravat faucet and cabinet design language, the accessories let bathroom details echo from start to finish for an overall luxurious look." },
    ],
    projectShowcase: ["Hotel guest room and changing area soft furnishings", "Premium apartment and villa bathrooms", "Spa centers and resorts", "Modern-style fully fitted residential bathrooms"],
    faq: [
      { q: "Should bathroom accessories be installed by drilling or with adhesive?", a: "For load-bearing hooks, we recommend drilling with expansion anchors for the most secure and durable fit; for light loads, or when you do not want to damage the tile, choose the adhesive model and press in place to cure per the instructions." },
      { q: "Will matte black/gunmetal black surfaces fade?", a: "The genuine coating adheres firmly and will not fade with normal wiping; just avoid abrasive cleaners and scratching with hard objects, and keep it dry to stay even and like new over the long term." },
      { q: "Which is better, zinc alloy or stainless steel accessories?", a: "Stainless steel has stronger rust resistance and a light feel; zinc alloy can be molded into richer shapes and has a substantial feel. Both have corrosion-resistant surface finishes, so choose based on styling and budget." },
      { q: "Can accessories be matched into a set with the faucets and cabinets?", a: "Yes. Bravat accessories share a design language and surface finish with the faucets and cabinets; we recommend coordinating them in the same surface color (such as all gunmetal black/polished chrome) for a more harmonious overall look." },
    ],
  },
};

/** Helper: get metadata by seriesOriginal, defaulting back to faucet. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return BRAVAT_SERIES_META[seriesOriginal.trim().toLowerCase()] || BRAVAT_SERIES_META.faucet;
}
