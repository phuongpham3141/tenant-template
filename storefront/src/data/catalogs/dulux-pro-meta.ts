/**
 * Dulux Professional (AkzoNobel) series metadata — rich content for product detail pages.
 * Indexed by seriesOriginal (catKey): interior / exterior / real-stone / texture /
 * mineral / primer / metal / waterproof / other.
 * Sources: duluxpro.com.cn product technical data + AkzoNobel public brand information + industry-standard coating application parameters.
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

export const DULUX_PRO_SERIES_META: Record<string, SeriesMeta> = {
  interior: {
    story:
      "Dulux Professional interior paint is the wall built for contract and high-end fit-out projects. From the 5-in-1 multi-function line and the low-odor anti-crack range to anti-bacterial low-odor, high-performance moisture-and-mildew protection, and inorganic silicate finishes, a single product line covers every interior wall need across budgets and applications. Its low-odor water-based formula welcomes the first breath of a new occupant; its outstanding hide covers a patchy substrate in a single coat; and its smooth, scrub-resistant film stands up to children's scribbles and the fingerprints of passing years. In the humid south, its micro-porous moisture technology lets wall moisture breathe; in hospitals and schools, its lasting anti-bacterial performance makes every wall more reassuring. This is not a simple can of emulsion paint, but a thoroughly proven interior wall solution.",
    heritage:
      "Interior paint is Dulux Professional's core range, built on AkzoNobel's global coatings technology and the more than a century of color and formulation expertise of this Dutch coatings leader. From the multi-function and premium lines to the comfort and inorganic mineral ranges, every product is backed by the same quality standards repeatedly validated by the contract market.",
    technicalSpecs: [
      { label: "Type", value: "Water-based interior emulsion paint / inorganic silicate coating (depending on series)" },
      { label: "Sheen", value: "Predominantly matt — soft and non-reflective" },
      { label: "VOC", value: "Low VOC, low-odor and eco-friendly, compliant with GB 18582-2020 standard for indoor decorating and refurbishing materials" },
      { label: "Hide", value: "Outstanding — most series achieve a uniform finish in a single coat" },
      { label: "Suitable substrates", value: "Interior plaster, gypsum board, cement-based putty surfaces, and ceilings" },
      { label: "Theoretical coverage", value: "Approx. 10-15 sqm per liter per coat (varies with substrate roughness and application method)" },
    ],
    manufacturing: [
      "Built on AkzoNobel's global coatings R&D system, with emulsion, pigments, and additives blended and filled to precise formulations on professional coating production lines",
      "Multiple low-odor, anti-bacterial, anti-mildew, and moisture-resistant formulations are purpose-developed for residential, hotel, school, hospital, and other distinct environments",
      "The inorganic interior range uses inorganic silicate resin as its primary film-former, with VOC far below conventional emulsion paints and non-combustible (Class A1) performance",
      "Every batch is tested before leaving the factory for volume solids, hide, scrub resistance, and other metrics, ensuring consistent, stable supply for high-volume projects",
      "Factory tinting service available: white is the standard color, with precise color matching to the Dulux Professional color card or to customer requirements",
    ],
    careGuide: [
      { title: "Routine cleaning", desc: "Once the film is fully cured, wipe gently with a wrung-out soft cloth using clean water or a neutral detergent to remove fingerprints and light soiling. Avoid strong acids, strong alkalis, and abrasive scouring pads." },
      { title: "Ventilation and curing", desc: "Keep the air circulating after application to speed film curing and odor dissipation. For newly decorated spaces, allow a period of ventilation before occupancy." },
      { title: "Moisture and mildew protection", desc: "Use the moisture-and-mildew range in damp-prone areas such as kitchens, bathrooms, and basements. If water seepage appears, trace the source promptly, wipe dry, and keep the wall surface dry." },
      { title: "Touch-ups and repairs", desc: "Repair local chips and knocks with paint of the same model and batch. For projects, keep a small reserve of paint and record the tint code so future touch-ups match the original color." },
    ],
    installation: [
      "Substrate preparation: walls must be clean, dry, level, and sound; remove loose dust, oil, and flaking layers, and confirm moisture content and alkalinity are within spec before applying",
      "Putty skim coat: level and sand with matching interior putty; only proceed to painting once flatness is acceptable. Reinforce loose or chalking substrates first with a clear sealer primer",
      "Primer coat: apply one full coat of alkali-resistant sealer primer to seal alkalinity, improve adhesion, and enhance topcoat build, then allow to dry before topcoating",
      "Topcoat application: stir thoroughly, dilute with water at the recommended ratio (generally no more than 20%), and apply two coats by brush, roller, conventional spray, or airless spray, allowing adequate recoat time between coats (approx. 2-3 hours)",
      "Film curing: avoid high humidity and rainy days during application, maintain ventilation, and let the film cure naturally to optimal hardness and scrub resistance",
    ],
    certifications: [
      "Compliant with GB 18582-2020 'Limits of Harmful Substances in Architectural Wall Coatings' indoor environmental standard",
      "China Environmental Label product (十环 certification) / low VOC — a confident choice for green home renovation",
      "AkzoNobel global quality system + ISO 9001 / ISO 14001 quality and environmental management systems",
      "Putty products meet the corresponding quality grade of JG/T 298-2010; inorganic series films achieve Class A1 non-combustible standard",
      "Product technical data sheets and warranty commitments provided; test reports available for project supply",
    ],
    packaging: [
      { label: "Pack sizes", value: "Emulsion paint mostly in 20L / 15L pails; putty in 25KG / 24KG bags" },
      { label: "MOQ", value: "By container / pallet, with mixed-model loads available to suit contract and distribution channels" },
      { label: "Shelf life", value: "Approx. 36 months unopened (12 months for some series); refer to the marking on the pail" },
      { label: "Storage", value: "Store sealed in a cool, dry place, away from sunlight and frost; once opened, use promptly and reseal" },
      { label: "Samples", value: "Dulux Professional color cards and small samples available to confirm color and hide before project ordering" },
    ],
    whyChoose: [
      { icon: "🌬️", title: "Low-odor and eco-friendly", desc: "Low-VOC water-based formula with a light scent, meeting indoor environmental standards for more reassuring occupancy." },
      { icon: "🎨", title: "High hide", desc: "Outstanding hide; most series cover the substrate in a single coat, saving paint and labor with even color." },
      { icon: "🧽", title: "Scrub-resistant", desc: "A smooth film resists staining and scrubbing; fingerprints and stains wipe away easily, keeping walls looking new." },
      { icon: "🍃", title: "Anti-bacterial and anti-mildew", desc: "A complete range of anti-bacterial, anti-mildew, and moisture-resistant options, with dedicated formulas for both humid and high-hygiene environments." },
      { icon: "🏢", title: "Contract-grade quality", desc: "AkzoNobel global technology, engineered for project application, with stable and reliable high-volume supply." },
    ],
    projectShowcase: [
      "Interior wall finishing for premium fit-out apartments, residences, and villas",
      "Large-area contract interior walls for hotels, office towers, and commercial buildings",
      "Public buildings such as schools and hospitals with higher environmental and anti-bacterial/anti-mildew requirements",
      "Moisture treatment for kitchens, bathrooms, basements, and shaded walls in humid-region homes",
    ],
    faq: [
      { q: "Does the interior paint carry environmental certification?", a: "Yes. Many products comply with the GB 18582-2020 indoor environmental standard and carry the China Environmental Label (十环) / low VOC; technical data sheets are available by product." },
      { q: "Which product should I choose for damp rooms?", a: "We recommend the high-performance moisture-and-mildew range. Its micro-porous moisture technology releases wall moisture, and its water and seepage resistance rivals exterior paint, effectively inhibiting mold." },
      { q: "Do I need to apply a primer first?", a: "We recommend skimming putty first and applying one full coat of alkali-resistant sealer primer to seal alkalinity, improve adhesion, and enhance topcoat build and durability." },
      { q: "Is factory tinting available?", a: "Yes. White is the standard color, with precise color matching to the Dulux Professional color card or to customer requirements; recording the tint code is recommended for easy future touch-ups." },
      { q: "What are the MOQ and lead time?", a: "Ordered by container / pallet, with mixed-model loads available. Lead time is confirmed with each order; in-stock models ship faster." },
    ],
  },

  exterior: {
    story:
      "Dulux Professional exterior paint is the first line of defense between a building facade and the elements. The all-purpose exterior ranges hold off sun, rain, and accumulating dust day after day, while the elastomeric series — premium matt elastomeric and elastomeric textured finishes — use a supple film to comfortably bridge fine wall cracks at both ambient and low temperatures. It must withstand years of UV scorching without easily chalking or fading, and stay self-cleaning after a single rain even amid urban haze. Advanced UV-curing technology makes the elastomeric film more dirt-resistant and washable, while the matching flexible exterior putty and alkali-resistant primer bring leveling, crack resistance, and efflorescence protection into one system. From the humid coast to the high temperature swings of the interior, it keeps a building's dignity standing the test of time.",
    heritage:
      "The exterior range carries Dulux Professional's many years of specialist exterior coatings experience, grounded in AkzoNobel's global weathering technology. From putty and primer to elastomeric topcoats, it forms a complete exterior coating system that has long served facade projects for residential, commercial, and public buildings.",
    technicalSpecs: [
      { label: "Type", value: "Water-based exterior emulsion paint (including acrylic elastomeric series)" },
      { label: "Sheen", value: "Predominantly matt; some series offer a matt textured option" },
      { label: "VOC", value: "Low-VOC water-based formula, free of lead, mercury, and other harmful substances" },
      { label: "Hide", value: "Outstanding; weathering formula ensures long-lasting color saturation" },
      { label: "Suitable substrates", value: "Cement concrete, brick and masonry walls, gypsum board, and EIFS exterior insulation systems" },
      { label: "Theoretical coverage", value: "Approx. 10-12 sqm per liter per coat (varies with substrate and application method)" },
    ],
    manufacturing: [
      "Uses AkzoNobel weathering resin and anti-fouling technology, with formula stability optimized for long-term outdoor sun exposure",
      "The elastomeric series uses premium elastomeric emulsion, giving the film elongation at both ambient and low temperatures to bridge hairline cracks in walls",
      "Advanced UV-curing technology is introduced to improve the anti-fouling performance of the elastomeric film, making it washable and easier to maintain",
      "Matching flexible exterior putty and alkali-resistant sealer primer are co-developed within the same system, jointly improving durability from leveling and crack resistance to efflorescence protection",
      "Every batch is tested for weathering, anti-fouling, solids content, and other metrics before leaving the factory, ensuring consistent supply for large-area exterior projects",
    ],
    careGuide: [
      { title: "Periodic inspection", desc: "Inspect the facade annually for cracking, hollowing, or seepage. Address any issues with local repairs promptly to keep small problems from becoming major overhauls." },
      { title: "Rain self-cleaning", desc: "The anti-fouling formula lets rain carry away surface dust. In areas with heavier dust buildup, rinse from top to bottom with clean water; avoid high-pressure or stiff brushing that can scratch the film." },
      { title: "Crack repair", desc: "When new cracks appear in the wall, first investigate the structural cause, then repair with matching elastomeric products to restore the film's elasticity." },
      { title: "Color care", desc: "Long-term sun exposure on sun-facing surfaces inevitably causes slight color change. When recoating, apply across the full surface to keep the color even and consistent." },
    ],
    installation: [
      "Substrate preparation: exterior walls must be clean, dry, and sound; remove flaking, hollowing, and oil, and confirm alkalinity and moisture content are within spec before applying",
      "Putty leveling: level and repair with flexible exterior putty (e.g., type P / type R) to effectively reduce hairline cracks and improve water-resistant adhesion",
      "Sealer primer: apply one full coat of alkali-resistant sealer primer to seal alkalinity, prevent efflorescence, and improve topcoat adhesion",
      "Elastomeric mid-coat (as needed): for elastomeric systems, apply an additional elastomeric mid-coat or use a textured roller to create a three-dimensional relief pattern",
      "Topcoat finish: follow the primer-midcoat-topcoat sequence and apply two topcoat coats by brush, roller, or airless spray, allowing adequate recoat intervals",
    ],
    certifications: [
      "Compliant with the harmful-substance limit requirements of the relevant national standards (GB) for architectural exterior wall coatings",
      "China Environmental Label (十环) / low VOC, free of lead, mercury, and other harmful substances",
      "AkzoNobel global quality system + ISO 9001 / ISO 14001 quality and environmental management systems",
      "Exterior putty meets the corresponding quality grade of JG/T 24-2018 and similar; weathering-related technical data provided",
      "Project warranty commitment provided, with product test reports available to support acceptance",
    ],
    packaging: [
      { label: "Pack sizes", value: "Topcoats mostly in 20L / 15L pails; exterior putty in 25KG bags" },
      { label: "MOQ", value: "By container / pallet, with mixed-model loads available to suit large-area exterior projects" },
      { label: "Shelf life", value: "Topcoats approx. 36 months unopened; refer to the marking on the pail" },
      { label: "Storage", value: "Store sealed in a cool, dry place, away from sunlight and frost; use promptly once opened" },
      { label: "Samples", value: "Color cards and sample boards available; a small trial application can confirm the effect before project ordering" },
    ],
    whyChoose: [
      { icon: "☀️", title: "Lasting weather resistance", desc: "Resists sun and rain without easily chalking or fading, providing long-term protection and decoration for facades." },
      { icon: "🧱", title: "Crack-bridging elasticity", desc: "The elastomeric series retains elongation at both ambient and low temperatures, effectively bridging fine wall cracks." },
      { icon: "💧", title: "Anti-fouling self-cleaning", desc: "Enhanced by UV-curing technology — dirt-resistant, washable, and kept clean by rain self-cleaning." },
      { icon: "🛡️", title: "Complete system", desc: "Putty, primer, mid-coat, and topcoat work together within one system for more reliable alkali and efflorescence protection." },
      { icon: "🎨", title: "Rich textures", desc: "Decorative ranges such as textured and relief finishes create three-dimensional effects, giving facades greater expressiveness." },
    ],
    projectShowcase: [
      "Facade finishing for residential communities, apartments, and villas",
      "Exterior wall projects for commercial complexes, office buildings, and hotels",
      "Exterior finishes for energy-efficient buildings using EIFS exterior insulation systems",
      "Facade renovation and crack-repair retrofits for older buildings",
    ],
    faq: [
      { q: "Can exterior paint bridge cracks?", a: "The elastomeric series retains elasticity at both ambient and low temperatures and can effectively bridge hairline cracks in walls; structural cracks require dedicated treatment first." },
      { q: "Is it suitable for exterior insulation systems?", a: "Yes. Many exterior putties, primers, and topcoats can be used on EIFS exterior insulation systems; we recommend applying the matching system as a whole." },
      { q: "Will exterior paint fade quickly?", a: "It uses a weathering formula and does not easily chalk or fade under normal use; sun-facing surfaces may show slight color change over time, so full-surface application is recommended when recoating." },
      { q: "How do I keep the exterior wall clean?", a: "The anti-fouling formula self-cleans with rain; for heavier dust, simply rinse from top to bottom with clean water, avoiding high-pressure or stiff brushing that can scratch the film." },
      { q: "What are the MOQ and lead time?", a: "Ordered by container / pallet, with mixed-model loads available; lead time is confirmed with each order." },
    ],
  },

  primer: {
    story:
      "Dulux Professional primer is the invisible yet most critical cornerstone of the entire coating system. Sanded primer, clear primer, high-performance alkali-resistant interior primer, alkali-resistant opaque primer, inorganic-system alkali-resistant primer, sealing primer — each one tames the hidden weaknesses of the substrate before the topcoat takes the stage. It penetrates the wall to seal free alkaline substances, holding back efflorescence and salt deposits; it reinforces loose, chalking old substrates so every flaking spot becomes solid again; and it builds a firm bridge between putty and topcoat, lifting both adhesion and coating life together. When the primer is done well, the topcoat is more economical, more even, and longer-lasting. A single primer coat determines whether a wall can stand the test of a decade.",
    heritage:
      "Primer is the foundational link in the Dulux Professional coating system that safeguards durability and appearance. Built on AkzoNobel's complementary technology, dedicated primers are developed for different topcoat systems — interior, exterior, inorganic mineral, stone-effect, and more — forming a complete, end-to-end coating solution.",
    technicalSpecs: [
      { label: "Type", value: "Interior / exterior alkali-resistant sealer primer, clear primer, sanded primer (depending on model)" },
      { label: "Sheen", value: "Matt (clear types are near-colorless once filmed)" },
      { label: "VOC", value: "Low-VOC water-based formula, compliant with the corresponding environmental standard (e.g., GB 18582-2020)" },
      { label: "Hide", value: "Alkali-resistant opaque types offer some hide; clear types focus mainly on penetration and sealing" },
      { label: "Suitable substrates", value: "Masonry, concrete, fiber cement board, gypsum board, putty surfaces, and other new or loose substrates" },
      { label: "Theoretical coverage", value: "Approx. 9-17 sqm per liter per coat (clear types offer higher coverage)" },
    ],
    manufacturing: [
      "Uses acrylic copolymer emulsion as the primary binder, combined with lead-free pigments and functional additives, with alkali-resistant sealing formulas tailored to each topcoat system",
      "Clear primer is designed specifically for lightly chalking substrates; with strong penetration, it soaks into loose layers and re-bonds loose particles into a stable surface",
      "The inorganic-system primer is developed for inorganic mineral coating systems, matching silicate topcoats and improving chalking and looseness in the substrate",
      "Sanded primer balances alkali-resistant sealing with enhanced adhesion, making it especially suitable for use with thick-paste finishes such as textured and stone-effect coatings",
      "Every batch is tested for volume solids, alkali resistance, and adhesion before leaving the factory, ensuring system compatibility and durable performance with the topcoat above",
    ],
    careGuide: [
      { title: "Fully dry", desc: "After applying the primer, observe the specified recoat interval (generally 1-3 hours, depending on the product and temperature/humidity) before topcoating to avoid lifting." },
      { title: "Seal after use", desc: "Once opened, use promptly and reseal the lid to prevent skinning, moisture ingress, and contamination that can affect film formation." },
      { title: "Clean tools", desc: "After applying water-based primer, immediately wash brushes, rollers, and spray guns with clean water to prevent hardened residue that is difficult to remove." },
      { title: "Match the substrate", desc: "Select the appropriate model for different substrate issues such as chalking, efflorescence, and damp, to ensure effective sealing and adhesion." },
    ],
    installation: [
      "Substrate inspection: confirm the wall is clean, dry, and sound; remove loose dust, oil, and flaking; reinforce heavily chalking substrates first with clear primer",
      "Stir and dilute: stir thoroughly before use and dilute with the appropriate amount of water per the product instructions, not exceeding the recommended ratio so as not to impair sealing",
      "Even application: apply one full coat by brush, roller, conventional spray, or airless spray, ensuring no missed areas, no buildup, and complete coverage",
      "Alkali sealing: focus on sealing areas with strong alkalinity or prone to efflorescence, applying additional coats locally where needed to ensure thorough alkali sealing",
      "Recoat transition: once the primer reaches the recoat interval, apply the matching topcoat to ensure system adhesion and overall durability",
    ],
    certifications: [
      "Compliant with the corresponding national standards for harmful-substance limits in architectural coatings, such as GB 18582-2020",
      "China Environmental Label (十环) / low-VOC eco-friendly water-based formula",
      "AkzoNobel global quality system + ISO 9001 / ISO 14001 quality and environmental management systems",
      "Matching alkali-resistance and adhesion technical data provided per topcoat system",
      "Product technical data sheets and warranty commitments provided; test reports available for project supply",
    ],
    packaging: [
      { label: "Pack sizes", value: "Mostly 20L / 25L pails (sanded, clear, and alkali-resistant models vary slightly in size)" },
      { label: "MOQ", value: "By container / pallet; can be ordered in mixed loads with matching topcoats" },
      { label: "Shelf life", value: "Generally approx. 12-36 months unopened; refer to the marking on the pail" },
      { label: "Storage", value: "Store sealed in a cool, dry place, away from sunlight and frost, to prevent skinning and moisture ingress" },
      { label: "Samples", value: "Small samples available for trial application with matching topcoats to confirm sealing and adhesion" },
    ],
    whyChoose: [
      { icon: "🛡️", title: "High-performance alkali resistance", desc: "Deeply seals free alkaline substances in the wall, effectively preventing efflorescence and salt deposits." },
      { icon: "🧷", title: "Enhanced adhesion", desc: "Builds a firm bridge between substrate and topcoat, significantly improving coating adhesion and service life." },
      { icon: "🪵", title: "Substrate reinforcement", desc: "Clear primer penetrates and re-bonds loose, chalking layers, restoring soundness to aged, friable substrates." },
      { icon: "🧩", title: "System matching", desc: "Dedicated primers developed for interior, exterior, inorganic, stone-effect, and other topcoat systems, working hand in hand." },
      { icon: "🍃", title: "Eco-friendly water-based", desc: "Low-VOC water-based formula with a light scent for more reassuring green application." },
    ],
    projectShowcase: [
      "Base sealing for interior and exterior walls of new residences and apartments",
      "Reinforcement of loose, chalking, and efflorescent substrates during renovation of older walls",
      "Matching sanded base layer for stone-effect / textured coating systems",
      "Matching alkali-resistant base layer for inorganic mineral coating systems",
    ],
    faq: [
      { q: "Why is a primer essential?", a: "The primer seals alkalinity, reinforces the substrate, and improves topcoat adhesion and build. It is the key foundation for the durability and appearance of the coating system and cannot be skipped." },
      { q: "What if the old wall is severely chalking?", a: "We recommend first penetrating and reinforcing with clear primer to re-bond the loose, chalking layer into a stable surface before skimming putty and applying the topcoat." },
      { q: "Can the primer be used directly as a topcoat?", a: "Not recommended. The primer focuses on sealing and adhesion; its hide and weathering performance are not on par with topcoats, so it should be paired with the corresponding topcoat in the system." },
      { q: "How many coats of primer are needed?", a: "Generally one full coat is sufficient; areas with efflorescence or severe looseness may need additional local coats. Always wait for the recoat interval before topcoating." },
      { q: "What are the MOQ and lead time?", a: "Ordered by container / pallet, with mixed loads alongside matching topcoats available; lead time is confirmed with each order." },
    ],
  },

  "real-stone": {
    story:
      "Dulux Professional stone-effect coating brings a quarry of natural stone onto the building facade. The premium natural stone-effect, premium stone-effect, and project-grade stone-effect coatings use premium water-based acrylic emulsion to carry natural colored sand and stone chips, recreating the lifelike texture and color of granite and natural stone through a special process. From a distance it is the weight and elegance of a stone curtain wall; up close it is the genuine grain of layer upon layer of colored sand — yet it is lighter, more economical, and easier to apply and repair than real stone. It is weather-resistant, breathable, and crack-resistant, standing up to outdoor wind and sun; with high realism and a wide range of grains and colors, it gives high-end facades the presence of stone at a reasonable cost. One wall, sprayed with the texture of a mountain.",
    heritage:
      "The stone-effect range presents a new generation of natural stone effects with AkzoNobel water-based coating technology, achieving the JG/T 24-2018 exterior quality grade. Long applied to the facades of premium residential, commercial, and public buildings, it brings the beauty of natural stone to more projects at a more reasonable cost.",
    technicalSpecs: [
      { label: "Type", value: "Water-based stone-effect coating (acrylic polymer + natural colored sand / stone chips)" },
      { label: "Sheen", value: "Available in gloss and matt topcoat finishes" },
      { label: "VOC", value: "Water-based eco-friendly formula, compliant with the corresponding exterior coating environmental requirements" },
      { label: "Hide", value: "Thick-paste finish; stone grain is formed in a single application with strong coverage" },
      { label: "Suitable substrates", value: "Cement concrete, brick and masonry walls, gypsum board, and EIFS exterior insulation systems" },
      { label: "Theoretical coverage", value: "Average approx. 3.0-5.5 kg/sqm (varies with stone effect and substrate)" },
    ],
    manufacturing: [
      "Based on premium water-based acrylic emulsion, compounded with natural colored sand, stone chips, and functional additives, with lifelike stone grain blended through a special process",
      "Colored sand is graded, screened, and color-matched to recreate the grain and color of various natural stones such as granite, black sesame, and beige, with high realism",
      "The formula balances weather resistance, breathability, and crack resistance, keeping the thick-paste film stable in color and adhesion under long-term outdoor exposure",
      "Meets the JG/T 24-2018 exterior quality grade, with batch-by-batch testing controlled to metrics such as approx. 75% solids by weight",
      "Tinting available to standard color-card colors or to customer requirements, with matching primer and clear topcoat forming a complete stone-effect system",
    ],
    careGuide: [
      { title: "Topcoat protection", desc: "Applying a matching clear topcoat after application enhances weather resistance, anti-fouling, and anti-blushing performance, keeping the stone grain and color longer-lasting." },
      { title: "Routine cleaning", desc: "Surface dust self-cleans with rain, or rinse at low pressure from top to bottom with clean water; avoid high-pressure water jets and stiff brushes that damage the colored sand layer." },
      { title: "Local repair", desc: "Repair chipped or sand-loss areas with the same model and batch following the original grain technique, and feather in the topcoat to minimize color and texture differences." },
      { title: "Seepage inspection", desc: "Periodically inspect joints and edges for cracking and seepage, and repair and seal promptly to protect the colored sand layer and the wall." },
    ],
    installation: [
      "Substrate preparation: walls clean, dry, and sound; level and repair with flexible exterior putty, with crack treatment properly carried out",
      "Sealer primer: apply a full coat of matching alkali-resistant sealer primer (such as sanded primer) to seal alkalinity, enhance adhesion, and resist efflorescence",
      "Layout and dividing: snap layout lines and apply masking tape per the design; where needed, use joint paint to mark dividing lines for a clean overall effect",
      "Stone-effect spraying: spray the colored sand layer in passes with a stone-effect spray gun until even and full, controlling grain and thickness, then remove the masking tape to finish edges",
      "Topcoat curing: once the stone-effect coating is fully dry, apply one to two clear topcoats to improve weather and stain resistance, and cure naturally to film",
    ],
    certifications: [
      "Meets the JG/T 24-2018 'Putties for Building Exterior Walls' / stone-effect-related exterior quality grade",
      "Compliant with the corresponding national standards (GB) for harmful-substance limits in architectural exterior wall coatings",
      "China Environmental Label (十环) / low-VOC water-based eco-friendly formula",
      "AkzoNobel global quality system + ISO 9001 / ISO 14001 quality and environmental management systems",
      "Product technical data sheets and project warranty commitments provided; test reports available",
    ],
    packaging: [
      { label: "Pack sizes", value: "Stone-effect coating mostly in 30KG pails; matching primer / clear topcoat in pails" },
      { label: "MOQ", value: "By container / pallet; can be ordered by color number combined with matching products" },
      { label: "Shelf life", value: "Generally approx. 12 months unopened; refer to the marking on the pail" },
      { label: "Storage", value: "Store sealed in a cool, dry place, away from sunlight, frost, and compression" },
      { label: "Samples", value: "Stone-grain sample boards and color cards available; a large sample can be made before the project to confirm the stone effect" },
    ],
    whyChoose: [
      { icon: "🪨", title: "Rivals real stone", desc: "Natural colored sand recreates the grain and color of granite and stone with high realism, giving facades a refined elegance." },
      { icon: "🪶", title: "Lightweight and cost-saving", desc: "Delivers the presence of stone at a reasonable cost, lighter, more economical, and easier to apply than a real stone curtain wall." },
      { icon: "☀️", title: "Outdoor weather resistance", desc: "Weather-resistant, breathable, and crack-resistant, staying stable in color and firmly adhered under sun and rain." },
      { icon: "🛠️", title: "Easy to repair", desc: "Simple application with controllable grain; chipped areas can be locally repaired and feathered in using the original technique." },
      { icon: "🧱", title: "Complete system", desc: "Primer, stone-effect coating, and clear topcoat work together to deliver alkali sealing, decoration, and protection in one." },
    ],
    projectShowcase: [
      "Stone-textured facades for premium residences, villas, and clubhouses",
      "Stone-effect finishes for commercial buildings, hotels, and cultural-tourism architecture",
      "Stone-grain exterior finishes for energy-efficient buildings using EIFS exterior insulation systems",
      "Stone-effect decorative projects for municipal landscapes, boundary walls, and entrances",
    ],
    faq: [
      { q: "What is the difference between stone-effect coating and real stone?", a: "Stone-effect coating recreates stone grain with colored sand; from a distance the effect is close to real stone, yet it is lighter, more economical, faster to apply, easy to repair, and lower in overall cost." },
      { q: "Is a clear topcoat needed?", a: "Strongly recommended. A matching clear topcoat significantly improves weather resistance, anti-fouling, and anti-blushing performance, keeping the stone grain and color longer-lasting." },
      { q: "Can stone-effect coating be used on insulated walls?", a: "Yes. Many stone-effect coatings are suitable for EIFS exterior insulation systems; we recommend applying the complete primer-stone-topcoat system." },
      { q: "Will the colored sand come off?", a: "With proper application and topcoating, adhesion is firm; local chips with sand loss can be repaired with the same batch following the original grain and then feathered in with topcoat." },
      { q: "What are the MOQ and lead time?", a: "Ordered by container / pallet, by color number combined with matching products; lead time is confirmed with each order." },
    ],
  },

  texture: {
    story:
      "Dulux Professional decorative texture coating is a chance to give a wall a voice of its own. The premium flexible texture coating, premium elastomeric stone-color paint, and premium relief mid-coat use textured grains, stone-color stone effects, and three-dimensional relief to turn a plain wall into touchable art. The flexible texture coating uses premium flexible emulsion for crack resistance and waterproofing, so the texture stays crack-free over the years; the elastomeric stone-color paint is spray-applied and formed in a single pass, with high stone-like realism and full elasticity; and the relief mid-coat traces crisp, exquisite patterns through spray technique, with a rich choice of grains. It must be beautifully layered yet endure outdoor wind, rain, and UV. When a space needs a visual focal point that makes people pause, texture coating is that breathing, high-end backdrop.",
    heritage:
      "The decorative texture range carries AkzoNobel's accumulated craftsmanship in decorative coatings, using a rich vocabulary of textures to create aesthetic highlights for premium interior and exterior spaces. It has long served residential, commercial, and public projects that pursue a sense of design and quality.",
    technicalSpecs: [
      { label: "Type", value: "Decorative texture / stone-color / relief mid-coat (water-based acrylic)" },
      { label: "Sheen", value: "Predominantly matt texture; adjustable with a gloss topcoat" },
      { label: "VOC", value: "Water-based eco-friendly formula, safe and low VOC" },
      { label: "Hide", value: "Thick-paste profile; texture and grain formed in a single application with strong coverage" },
      { label: "Suitable substrates", value: "Cement concrete, brick and masonry walls, gypsum board, and EIFS exterior insulation systems" },
      { label: "Theoretical coverage", value: "Approx. 0.5-3.5 kg/sqm (varies with pattern thickness and profile effect)" },
    ],
    manufacturing: [
      "Based on premium flexible / elastomeric acrylic emulsion, compounded with inorganic texture materials and pigments, made into a crack-resistant texture formula through a special process",
      "The stone-color series is blended with premium inorganic pigments to create stone-effect grain colors; it can be spray-applied and formed in a single pass with high realism and stable color",
      "The relief mid-coat uses spray technique and dedicated rollers to create a variety of crisp, exquisite, and clearly layered three-dimensional patterns",
      "The formula balances elastomeric crack resistance, water and seepage resistance, and breathability, keeping thick-paste textures from easily cracking or peeling under long-term outdoor use",
      "Tinting available to the base color or to customer requirements, with matching primer and clear topcoat forming a complete decorative coating system",
    ],
    careGuide: [
      { title: "Topcoat curing", desc: "For exterior textured surfaces, a matching clear topcoat is recommended to enhance weather and stain resistance; the raised and recessed areas of the texture especially need protection to extend finish life." },
      { title: "Dusting and cleaning", desc: "Three-dimensional texture catches dust easily; clean with a soft brush or low-pressure clean water from top to bottom, avoiding hard objects that can scrape and damage the grain." },
      { title: "Texture repair", desc: "Repair local damage with the same model following the original profile technique, restoring the grain direction as closely as possible and feathering in the topcoat to minimize marks." },
      { title: "Moisture and crack protection", desc: "Periodically inspect interior damp areas and outdoor sun-facing surfaces; address any hollowing or cracking promptly to keep the texture layer intact." },
    ],
    installation: [
      "Substrate preparation: walls clean, dry, sound, and level; level and crack-treat properly to ensure firm adhesion of the thick-paste texture",
      "Sealer primer: apply a full coat of matching alkali-resistant sealer primer to seal alkalinity, enhance adhesion, and prevent efflorescence from affecting the texture color",
      "Profile application: per the design, use spray technique or a dedicated roller to create texture, stone-color, relief, and other grains, controlling thickness and pattern consistency",
      "Pattern adjustment: while wet, use tools to finish, press, or draw the pattern to form the intended three-dimensional effect and layering, taking care to feather evenly",
      "Topcoat film: once the texture layer is fully dry, apply a clear topcoat to improve weather and stain resistance, and cure naturally to optimal hardness",
    ],
    certifications: [
      "Compliant with the corresponding national standards (GB) for harmful-substance limits in architectural decorative coatings",
      "China Environmental Label (十环) / low-VOC water-based eco-friendly formula",
      "AkzoNobel global quality system + ISO 9001 / ISO 14001 quality and environmental management systems",
      "Elasticity / crack-resistance performance supported by product technical data sheets",
      "Project warranty commitment provided, with product test reports available",
    ],
    packaging: [
      { label: "Pack sizes", value: "Texture / stone-color mostly in 20KG / 30KG pails; relief mid-coat in 20L pails" },
      { label: "MOQ", value: "By container / pallet; can be ordered by pattern combined with matching products" },
      { label: "Shelf life", value: "Generally approx. 12 months unopened; refer to the marking on the pail" },
      { label: "Storage", value: "Store sealed in a cool, dry place, away from sunlight, frost, and compression that causes caking" },
      { label: "Samples", value: "Texture sample boards and color cards available; a large sample can be made before the project to confirm the profile effect" },
    ],
    whyChoose: [
      { icon: "✨", title: "High-end aesthetics", desc: "Multiple textures — texture, stone-color, and relief — create a visual focal point that makes people pause." },
      { icon: "🖌️", title: "Rich effects", desc: "A diverse choice of patterns and motifs meets the design expression of personalized and high-end custom projects." },
      { icon: "🧱", title: "Crack-resistant elasticity", desc: "Flexible / elastomeric formulas effectively resist wall cracking, making thick-paste textures more durable." },
      { icon: "💧", title: "Water-resistant and breathable", desc: "Combines water and seepage resistance with breathability; outdoor textures stay stable and beautiful through wind and rain." },
      { icon: "🔫", title: "Efficient forming", desc: "Stone-color is spray-applied and formed in a single pass, relief uses spray technique — efficient and controllable application." },
    ],
    projectShowcase: [
      "Signature textured feature walls for premium residences, villas, and clubhouses",
      "Artistic profiled facades for hotels, sales offices, and commercial spaces",
      "Textured exterior finishes for buildings using EIFS exterior insulation systems",
      "Relief decorative profiles for cultural, landscape, and entrance projects",
    ],
    faq: [
      { q: "Can texture coating be used outdoors?", a: "Yes. Many texture and stone-color products are suitable for exterior walls and EIFS insulation systems; a clear topcoat is recommended to enhance weather and stain resistance." },
      { q: "How do stone-color paint and stone-effect coating differ?", a: "Stone-color paint leans toward stone-like texture with more pronounced elasticity and can be spray-formed in a single pass; stone-effect coating presents a heavier, granular stone feel with natural colored sand." },
      { q: "Is three-dimensional texture hard to clean?", a: "Recesses catch dust easily; simply clean with a soft brush or low-pressure clean water from top to bottom. After topcoating it is more dirt-resistant and easier to maintain." },
      { q: "Can patterns be customized?", a: "Yes. Colors can be tinted to order, and a variety of personalized effects can be achieved through spraying, rollers, and finishing techniques." },
      { q: "What are the MOQ and lead time?", a: "Ordered by container / pallet, by pattern combined with matching products; lead time is confirmed with each order." },
    ],
  },

  mineral: {
    story:
      "Dulux Professional inorganic mineral paint brings building walls back to the most authentic essence of stone and minerals. With inorganic silicate resin as its film-former, it does not rely on organic resin like ordinary emulsion paint — instead it undergoes a silicification reaction with the mineral substrate, becoming part of the wall itself. It is inherently non-combustible, with a film that achieves the Class A1 flame-retardant standard; it is inherently breathable, letting wall moisture breathe freely without easily fostering mold; and its VOC content is far below conventional coatings, building eco-friendliness into the bones of the formula. Whether for residences and hotels, or for schools and hospitals with strict cleanliness and safety demands, it guards every wall in a calm, sustainable way. This is coating's return to nature and health.",
    heritage:
      "The inorganic mineral range represents Dulux Professional's exploration in sustainable coatings, achieving inorganic silicate film formation with AkzoNobel technology. Balancing non-combustibility, breathability, low VOC, and lasting color, it suits projects with higher environmental and safety requirements.",
    technicalSpecs: [
      { label: "Type", value: "Inorganic silicate mineral coating (interior / exterior)" },
      { label: "Sheen", value: "Matt, presenting an unpretentious mineral texture" },
      { label: "VOC", value: "VOC far below conventional emulsion paint; low-odor and eco-friendly" },
      { label: "Hide", value: "Good, with relatively high volume solids (e.g., approx. 55% for white)" },
      { label: "Suitable substrates", value: "Masonry, concrete walls, cement-based putty surfaces, and other mineral substrates" },
      { label: "Theoretical coverage", value: "Approx. 11-13 sqm per liter per coat (varies with substrate and application method)" },
    ],
    manufacturing: [
      "Uses inorganic silicate resin as its primary film-former, undergoing a silicification reaction with the mineral substrate to firmly bond the film to the wall",
      "The formula achieves non-combustible performance, with the film reaching the Class A1 flame-retardant standard for higher fire safety in public buildings",
      "A highly breathable structure lets moisture inside the wall release freely, reducing water staining and mold growth for healthier walls",
      "VOC content far below conventional emulsion paint, combined with a matching inorganic alkali-resistant primer to form a low-emission, sustainable coating system",
      "Every batch is tested for volume solids, non-combustibility, mildew resistance, and other metrics, ensuring stable, consistent supply for high-volume projects",
    ],
    careGuide: [
      { title: "Matching primer", desc: "Use the inorganic matching alkali-resistant primer before application to seal alkalinity and cure the substrate, ensuring the inorganic topcoat's adhesion and film formation." },
      { title: "Ventilation and film formation", desc: "Maintain ventilation after application so the silicification reaction proceeds fully and the film cures to optimal hardness and breathability." },
      { title: "Gentle cleaning", desc: "Wipe light surface soiling gently with a wrung-out soft cloth and clean water, avoiding strong acids, strong alkalis, and hard tools that can damage the mineral film." },
      { title: "Keep dry", desc: "Although it is breathable and mildew-resistant, you should still trace and resolve any ongoing seepage source, keeping the wall dry over the long term." },
    ],
    installation: [
      "Substrate preparation: walls clean, dry, and sound; for mineral substrates, remove loose dust, oil, and flaking layers",
      "Matching primer: apply a full coat of inorganic matching alkali-resistant primer to seal alkalinity, improve chalking and looseness of the substrate, and enhance adhesion",
      "Stir and dilute: stir thoroughly before use; an appropriate amount of clean water may be added to dilute (generally no more than 5%, per the product instructions)",
      "Topcoat application: apply two coats by brush, roller, conventional spray, or airless spray, allowing adequate recoat intervals between coats (approx. 2-3 hours)",
      "Ventilation and curing: maintain ventilation so silicification film formation completes fully; avoid applying in high humidity or rainy weather",
    ],
    certifications: [
      "Non-combustible film, achieving the Class A1 flame-retardant standard (per product technical data)",
      "VOC far below conventional emulsion paint, compliant with the GB 18582-2020 indoor environmental standard",
      "China Environmental Label (十环) / low VOC — a sustainable coating solution",
      "AkzoNobel global quality system + ISO 9001 / ISO 14001 quality and environmental management systems",
      "Product technical data sheets and warranty commitments provided; test reports available for project supply",
    ],
    packaging: [
      { label: "Pack sizes", value: "Mostly 20L pails; matching inorganic primer in pails" },
      { label: "MOQ", value: "By container / pallet; can be ordered combined with the matching primer" },
      { label: "Shelf life", value: "Generally approx. 12-36 months unopened; refer to the marking on the pail" },
      { label: "Storage", value: "Store sealed in a cool, dry place, away from sunlight and frost; use promptly once opened" },
      { label: "Samples", value: "Color cards and sample boards available; a trial application can confirm hide and texture before the project" },
    ],
    whyChoose: [
      { icon: "🔥", title: "Non-combustible and flame-retardant", desc: "The film achieves the Class A1 non-combustible standard, providing higher fire safety for public buildings." },
      { icon: "🌬️", title: "Breathable and mildew-resistant", desc: "A highly breathable structure releases wall moisture, reducing water staining and mold for healthier walls." },
      { icon: "🌱", title: "Sustainable and eco-friendly", desc: "Inorganic mineral base with VOC far below conventional emulsion paint — green and low-emission." },
      { icon: "🧱", title: "Lasting color", desc: "Alkali- and weather-resistant; the mineral film keeps its color for the long term without easily fading." },
      { icon: "🏫", title: "Project-ready", desc: "Suitable for residences, hotels, schools, hospitals, and other projects with high environmental and safety requirements." },
    ],
    projectShowcase: [
      "Public buildings such as schools and hospitals with strict environmental, fire, and mildew requirements",
      "Sustainable coating for large-area interior walls of hotels, office buildings, and the like",
      "Breathable renovation of historic buildings and mineral-substrate walls",
      "Premium residential and fit-out projects pursuing green, low-emission solutions",
    ],
    faq: [
      { q: "What are the unique advantages of inorganic mineral paint?", a: "It forms a film through inorganic silicate, is inherently non-combustible (achieving Class A1), highly breathable, and resistant to mold growth, with VOC far below conventional emulsion paint." },
      { q: "Can it be applied directly over an old wall?", a: "The substrate must first be treated with the inorganic matching alkali-resistant primer to seal alkalinity and cure, before applying the inorganic topcoat to ensure adhesion and film formation." },
      { q: "Why is inorganic paint more mildew-resistant?", a: "Its highly breathable structure lets wall moisture release freely, reducing water accumulation and thereby inhibiting mold growth." },
      { q: "Is it suitable for hospitals and schools?", a: "Very suitable. Its non-combustible, breathable, low-VOC characteristics make it an ideal choice for public buildings with high fire and environmental requirements." },
      { q: "What are the MOQ and lead time?", a: "Ordered by container / pallet, combined with the matching primer; lead time is confirmed with each order." },
    ],
  },

  metal: {
    story:
      "Dulux Professional metallic effect paint drapes a layer of shimmer over premium facades and decorative spaces. The water-based metallic formula spreads a fine metallic sheen across the wall, shifting in depth as the light angle changes, giving a flat surface a metal-like texture and a sense of refinement. It can light up an eye-catching highlight on a facade or trace exquisite decorative detail indoors, quietly lifting a space up a level in style. Built on AkzoNobel's coating technology, it pursues a distinctive aesthetic while balancing durability and eco-friendliness, letting the coolness of metal coexist with the reassurance of water-based. When a design needs a touch of unique sheen, metallic effect paint is that perfectly placed highlight.",
    heritage:
      "Metallic effect paint continues AkzoNobel's technical expertise in decorative coatings, presenting a distinctive metallic sheen with a water-based formula and providing differentiated aesthetic expression for premium and fit-out projects.",
    technicalSpecs: [
      { label: "Type", value: "Water-based metallic effect decorative paint" },
      { label: "Sheen", value: "Metallic sheen that shifts in depth with the light angle" },
      { label: "VOC", value: "Water-based eco-friendly formula, low VOC" },
      { label: "Hide", value: "Good; a matching primer is recommended to achieve an even metallic base color" },
      { label: "Suitable substrates", value: "Facade finishes, interior decorative walls, and other prepared level substrates" },
      { label: "Theoretical coverage", value: "Varies with metallic effect and application method; refer to the product technical data sheet" },
    ],
    manufacturing: [
      "Uses AkzoNobel water-based coating technology, compounded with metallic pigments to blend a fine, shifting metallic sheen effect",
      "The formula balances decorative quality and durability, keeping the metallic film's sheen stable in service environments",
      "Water-based eco-friendly formula, low VOC — more environmentally friendly and easier to apply and maintain than solvent-based metallic paints",
      "Can be paired with primer and topcoat systems to improve base-color uniformity and the film's weather and stain resistance",
      "Quality controlled to metrics such as sheen and adhesion, ensuring consistency of the decorative effect",
    ],
    careGuide: [
      { title: "Gentle cleaning", desc: "Wipe surface dust gently with a wrung-out soft cloth and clean water, avoiding hard tools and strong solvents that can scrape and damage the metallic sheen layer." },
      { title: "Topcoat protection", desc: "For stronger weather and stain resistance, a matching clear topcoat can be added to protect the metallic effect and extend finish life." },
      { title: "Even application", desc: "The metallic effect is sensitive to application technique; during maintenance, watch whether the sheen is even, and feather in the direction when making local repairs." },
      { title: "Avoid exposure and abrasion", desc: "Periodically inspect high-abrasion areas and surfaces under long-term intense sun, maintaining them promptly to keep the sheen consistent." },
    ],
    installation: [
      "Substrate preparation: walls clean, dry, level, and sound, to ensure the metallic effect is evenly presented",
      "Sealer primer: apply a full coat of matching primer to seal alkalinity, enhance adhesion, and lay an even base color, avoiding patchiness in the metallic layer",
      "Metallic topcoat: stir thoroughly and apply by the recommended spray or brush method, keeping technique and direction consistent for an even sheen",
      "Effect feathering: for large-area work, take care to feather joints and overlaps evenly, avoiding obvious color differences and sheen breaks",
      "Topcoat curing: apply a clear topcoat as needed to improve weather and stain resistance, and cure naturally to film",
    ],
    certifications: [
      "Compliant with the corresponding national standards (GB) for harmful-substance limits in architectural decorative coatings",
      "China Environmental Label (十环) / low-VOC water-based eco-friendly formula",
      "AkzoNobel global quality system + ISO 9001 / ISO 14001 quality and environmental management systems",
      "Product technical data sheets provided to support decorative and durability performance",
      "Project warranty commitment provided, with product test reports available",
    ],
    packaging: [
      { label: "Pack sizes", value: "In pails; specific sizes per the product marking" },
      { label: "MOQ", value: "By container / pallet; can be ordered combined with matching primer / topcoat" },
      { label: "Shelf life", value: "Unopened per the marking on the pail; use promptly once opened" },
      { label: "Storage", value: "Store sealed in a cool, dry place, away from sunlight and frost" },
      { label: "Samples", value: "Metallic effect sample boards available; a large sample can be made before the project to confirm the sheen" },
    ],
    whyChoose: [
      { icon: "🥇", title: "Metallic sheen", desc: "A fine metallic texture shifts with the light, instantly elevating the refinement of spaces and facades." },
      { icon: "✨", title: "High-end decoration", desc: "Suited to premium and fit-out highlights, creating a distinctive visual focal point." },
      { icon: "🍃", title: "Water-based and eco-friendly", desc: "Water-based low-VOC formula — more environmentally friendly and easier to apply and maintain than solvent-based." },
      { icon: "🛡️", title: "Durable and stable", desc: "Balances decorative quality and durability, and can be topcoated to enhance weather and stain resistance." },
      { icon: "🎨", title: "Controllable effect", desc: "Matching primer and application technique ensure an even base color and consistent sheen." },
    ],
    projectShowcase: [
      "Metallic facade highlights for premium commercial buildings and hotels",
      "Decorative feature walls for sales offices, showrooms, and boutiques",
      "Metallic-textured decoration for villas, clubhouses, and other premium residences",
      "Detail decoration requiring a metallic sheen, such as signage, profiles, and entrances",
    ],
    faq: [
      { q: "Where is metallic effect paint used?", a: "Mostly for premium facade and interior decorative highlights, such as showrooms, sales offices, and boutiques where feature walls call for a metallic sheen." },
      { q: "Is a matching primer needed?", a: "We recommend first applying a matching primer to seal alkalinity and lay an even base color, which avoids patchiness in the metallic layer and makes the sheen more even." },
      { q: "Will the metallic sheen be even?", a: "The metallic effect is sensitive to application technique; keep the spray or brush direction consistent and watch the joints, and topcoat to unify the sheen where needed." },
      { q: "Can it be used indoors?", a: "Yes. The water-based low-VOC formula suits interior decorative highlights, and pairing it with a topcoat makes it more durable and easier to maintain." },
      { q: "What are the MOQ and lead time?", a: "Ordered by container / pallet, combined with matching products; lead time is confirmed with each order." },
    ],
  },

  waterproof: {
    story:
      "Dulux Professional waterproofing is a silent, steadfast barrier between a project and water. Designed as waterproof coatings and solutions for walls, roofs, and damp areas, it holds seepage outside the structure with sound elasticity, adhesion, and water resistance. It spreads along the substrate into a continuous waterproof membrane, sealing every gap where moisture might intrude; it endures sun and rain on the roof, and stands guard day after day in damp areas such as bathrooms, balconies, and basements. Waterproofing is concealed work — done right, no one notices; done wrong, seepage marks appear everywhere. The value of Dulux Professional waterproofing lies precisely in keeping water always where it belongs, so a building's peace of mind begins in the places you cannot see.",
    heritage:
      "The waterproofing range, built on AkzoNobel coating technology, provides waterproof protection solutions for walls, roofs, and damp areas in construction projects. Working in concert with primer, putty, and topcoat systems, it forms a complete project chain from waterproofing to finish.",
    technicalSpecs: [
      { label: "Type", value: "Construction waterproof coating / waterproofing solution" },
      { label: "Sheen", value: "Primarily a functional coating once filmed, intended to be covered by the finish layer" },
      { label: "VOC", value: "Water-based eco-friendly formula, low VOC (depending on product)" },
      { label: "Hide", value: "Centered on continuous film formation for waterproof sealing, emphasizing membrane thickness and integrity" },
      { label: "Suitable substrates", value: "Walls, roofs, bathrooms, balconies, basements, and other damp and water-facing areas" },
      { label: "Theoretical coverage", value: "Varies with membrane thickness requirements and substrate; refer to the product technical data sheet" },
    ],
    manufacturing: [
      "Uses an elastic waterproof formula so the film extends with minor substrate deformation, sealing off the paths of moisture intrusion",
      "Emphasizes adhesion and water resistance, keeping the waterproof membrane firm and stable without hollowing under long-term damp and water-facing conditions",
      "Provides corresponding waterproof products and application schemes for different areas such as walls, roofs, and damp zones",
      "Can work in concert with primer, putty, and topcoat systems to form a complete project chain from waterproofing to finish",
      "Quality controlled to metrics such as elasticity, adhesion, and water resistance, ensuring reliable and durable project waterproofing",
    ],
    careGuide: [
      { title: "Flood-test acceptance", desc: "After the waterproof layer is applied, conduct a flood test to confirm there is no seepage before proceeding to subsequent work, catching hidden problems at the front end." },
      { title: "Protect the finished work", desc: "Before the waterproof membrane cures, avoid trampling, puncturing, and heavy compression; protect the finished work to keep the membrane continuous and intact." },
      { title: "Detail inspection", desc: "Focus inspection on details such as pipe roots, internal/external corners, and floor drains; repair and reinforce any cracking or hollowing promptly." },
      { title: "Source treatment", desc: "When seepage occurs, first trace the root cause at the water-facing surface and details, and repair accordingly to avoid repeated patching that treats only the symptom." },
    ],
    installation: [
      "Substrate preparation: base clean, sound, and level; remove loose dust and oil, round the internal/external corners, and pre-reinforce pipe-root details",
      "Wetting and priming: handle substrate moisture content per the product requirements, wetting or sealing as needed to ensure good waterproof-membrane adhesion",
      "Detail reinforcement: first apply a reinforcing layer to weak details such as pipe roots, corners, and floor drains before large-area application",
      "Multi-pass application: apply the waterproof coating in passes, crosswise and lengthwise with adequate intervals, to reach the design membrane thickness, continuous and pinhole-free",
      "Flood-test protection: after curing, perform a flood test for acceptance; once passed, apply a protective layer before subsequent finishing or tiling work",
    ],
    certifications: [
      "Compliant with the corresponding national standards (GB) for harmful-substance limits in construction waterproofing materials",
      "China Environmental Label (十环) / low-VOC water-based eco-friendly formula (depending on product)",
      "AkzoNobel global quality system + ISO 9001 / ISO 14001 quality and environmental management systems",
      "Product technical data sheets provided to support elasticity, adhesion, and water-resistance performance",
      "Project warranty commitment provided, with product test reports available",
    ],
    packaging: [
      { label: "Pack sizes", value: "Pails / kits (some two-component products by mixing ratio); per the product marking" },
      { label: "MOQ", value: "By container / pallet; can be ordered combined with matching system products" },
      { label: "Shelf life", value: "Unopened per the marking on the pail; use promptly once opened" },
      { label: "Storage", value: "Store sealed in a cool, dry place, away from sunlight and frost" },
      { label: "Samples", value: "Small samples available for a trial detail run to confirm film formation and adhesion" },
    ],
    whyChoose: [
      { icon: "💧", title: "Lasting waterproofing", desc: "Continuous film formation seals off moisture intrusion, providing reliable protection for walls, roofs, and damp areas." },
      { icon: "🧬", title: "Elastic extension", desc: "Extends with minor substrate deformation without easily cracking, maintaining the integrity of the waterproof membrane over the long term." },
      { icon: "🧷", title: "Strong adhesion", desc: "Outstanding adhesion; firm and stable in damp and water-facing environments without hollowing or peeling." },
      { icon: "🧩", title: "System synergy", desc: "Pairs with primer, putty, and topcoat to form a complete chain from waterproofing to finish." },
      { icon: "🍃", title: "Water-based and eco-friendly", desc: "Low-VOC water-based formula with a light application scent — more reassuring and eco-friendly." },
    ],
    projectShowcase: [
      "Waterproofing for interior damp areas such as bathrooms, kitchens, and balconies",
      "Waterproof protection for roofs, terraces, and water-facing exterior walls",
      "Moisture and seepage protection for underground spaces such as basements and garages",
      "Seepage remediation and waterproofing renovation for older buildings",
    ],
    faq: [
      { q: "Where is waterproof coating used?", a: "Commonly used in damp and seepage-prone areas such as bathrooms, kitchens, balconies, roofs, basements, and water-facing exterior walls." },
      { q: "How many passes does the waterproof layer need?", a: "It is usually applied in passes, crosswise and lengthwise, to reach the design membrane thickness, ensuring it is continuous and pinhole-free, with a reinforcing layer at details." },
      { q: "Is a flood test required after application?", a: "Yes. After the waterproof layer cures, a flood test should be performed for acceptance to confirm there is no seepage before applying the protective layer and subsequent finish." },
      { q: "Can I still tile or paint after waterproofing?", a: "Yes. As concealed work, once the waterproof layer passes acceptance and has a protective layer, tiling or finishing work can proceed." },
      { q: "What are the MOQ and lead time?", a: "Ordered by container / pallet, combined with matching system products; lead time is confirmed with each order." },
    ],
  },

  other: {
    story:
      "Dulux Professional's other coating products are the unassuming yet indispensable supporting players of the entire coating system. The premium joint paint traces dividing lines, keeping stone-effect and textured walls neatly blocked and clearly layered; the premium clear topcoat sits crystal-clear over stone-effect and texture coatings, resisting blushing and staining and self-cleaning fresh with rain; and the premium elastomeric mid-coat and relief mid-coat hold up a transitional layer of elasticity and profile between primer and topcoat. Whether tracing lines, topcoating, or building the base profile, each plays its role to perfect the details of a wall. It is precisely the seamless cooperation of these matching products that lets stone-effect and texture coating systems truly stand up to presence from afar and refinement up close.",
    heritage:
      "The other coating products are the supporting links of the Dulux Professional coating system, completing key steps such as jointing, topcoating, and elastomeric mid-coating with AkzoNobel technology. Working in concert with the stone-effect, texture, and exterior systems, they ensure the overall finish is neat, durable, and beautiful.",
    technicalSpecs: [
      { label: "Type", value: "Joint paint / clear topcoat / elastomeric mid-coat and other matching products" },
      { label: "Sheen", value: "Clear topcoat available in gloss and matt; joint paint mostly matt" },
      { label: "VOC", value: "Water-based eco-friendly formula, low VOC" },
      { label: "Hide", value: "Depends on function (topcoat focuses on transparent protection; joint paint on line tracing and hide)" },
      { label: "Suitable substrates", value: "Stone-effect / texture coating systems, brick-and-concrete walls, EIFS exterior insulation systems" },
      { label: "Theoretical coverage", value: "Topcoat approx. 0.12-0.15 kg/sqm or 8-15 sqm per liter; jointing approx. 0.2-0.25 kg/sqm (varies by product)" },
    ],
    manufacturing: [
      "The clear topcoat is based on a pure acrylic emulsion polymer with a water-based eco-friendly formula, giving the film a crystal-clear protective layer",
      "The topcoat series offers weather resistance, anti-fouling, and anti-blushing performance, blocking contaminant adhesion and self-cleaning with rain to protect the underlying finish",
      "The joint paint is designed specifically to pair with decorative texture coatings and stone-effect coatings, with good adhesion and hide and lasting weather resistance for easy line tracing",
      "The elastomeric mid-coat uses an acrylic elastomeric formula, creating three-dimensional relief patterns or a smooth effect with a dedicated roller or airless spray",
      "Every batch is tested for sheen, solids content, weather resistance, and other metrics, ensuring system compatibility and durable performance with the products above and below",
    ],
    careGuide: [
      { title: "Use as a system", desc: "Joint paint, clear topcoat, and the like must be paired with the corresponding stone-effect / texture coating system and applied in the specified sequence to take effect." },
      { title: "Topcoat curing", desc: "Once the clear topcoat cures, weather and stain resistance improve markedly; routine self-cleaning with rain is enough — avoid stiff brushes and strong solvents." },
      { title: "Joint maintenance", desc: "If dividing lines show wear, retrace and repair with the same model of joint paint to keep the overall profile neat." },
      { title: "Fully dry", desc: "Allow adequate recoat intervals between each step of the mid-coat and topcoat, waiting until fully dry before the next pass to avoid lifting and blushing." },
    ],
    installation: [
      "Define the sequence: based on the stone-effect / texture coating system, determine the position of jointing, mid-coat, and topcoat in the overall sequence",
      "Elastomeric mid-coat: apply the elastomeric mid-coat over the primer, using a dedicated roller to profile or airless spray to achieve a smooth / relief effect",
      "Joint tracing: per the design, trace with joint paint along the reserved dividing lines, keeping the wall neatly blocked and clearly layered",
      "Topcoat protection: once the finish layer is fully dry, apply one to two clear topcoats, selecting gloss / matt per requirement, to improve weather and stain resistance",
      "Film curing: allow adequate recoat intervals between each step, keep the application environment ventilated and dry, and avoid high humidity and rainy weather",
    ],
    certifications: [
      "Compliant with the corresponding national standards (GB) for harmful-substance limits in architectural decorative coatings",
      "China Environmental Label (十环) / low-VOC water-based eco-friendly formula",
      "AkzoNobel global quality system + ISO 9001 / ISO 14001 quality and environmental management systems",
      "Topcoat, mid-coat, and similar products provide weather-resistance and anti-fouling technical data",
      "Project warranty commitment provided, with product test reports available",
    ],
    packaging: [
      { label: "Pack sizes", value: "Mostly in pails (e.g., 20L / 20KG / 25KG); per the product marking" },
      { label: "MOQ", value: "By container / pallet; can be ordered combined with the stone-effect / texture coating system" },
      { label: "Shelf life", value: "Generally approx. 12 months unopened; refer to the marking on the pail" },
      { label: "Storage", value: "Store sealed in a cool, dry place, away from sunlight and frost; use promptly once opened" },
      { label: "Samples", value: "Small samples available for a system trial run to confirm topcoat sheen and jointing effect" },
    ],
    whyChoose: [
      { icon: "💎", title: "Crystal-clear topcoat", desc: "The clear topcoat protects color with transparency, enhancing the underlying coating effect and improving weather and stain resistance." },
      { icon: "🌧️", title: "Anti-blushing self-cleaning", desc: "Resists blushing across a wide temperature range and self-cleans with rain, keeping the finish in its true color for the long term." },
      { icon: "📐", title: "Neat jointing", desc: "Joint paint traces dividing lines, keeping stone-effect and textured walls clearly layered and neatly blocked." },
      { icon: "🧱", title: "Elastomeric mid-coat", desc: "The elastomeric mid-coat resists cracking and builds profile, bridging a durable transition between primer and topcoat." },
      { icon: "🧩", title: "System matching", desc: "Works in concert with stone-effect, texture, and exterior systems for an end-to-end, more durable sequence." },
    ],
    projectShowcase: [
      "Jointing and topcoat protection for stone-effect / texture coating facades",
      "Overall profiling projects for stone-effect finishes in premium commercial and hotel settings",
      "Exterior elastomeric mid-coat base and relief profiling work",
      "Matching mid-coat and topcoat for EIFS exterior insulation systems",
    ],
    faq: [
      { q: "Is the clear topcoat necessary?", a: "Topcoating is recommended. It significantly improves the weather resistance, anti-fouling, and anti-blushing performance of stone-effect / texture coatings, keeping the color longer-lasting." },
      { q: "What is joint paint for?", a: "It is used to trace along the reserved dividing lines on stone-effect and textured walls, keeping the wall neatly blocked and clearly layered and enhancing the overall profile." },
      { q: "How do I choose gloss or matt for the clear topcoat?", a: "Choose by design effect: for a clear, bright look choose gloss; for a soft texture choose matt; both can be matched within the system." },
      { q: "At which step is the elastomeric mid-coat used?", a: "It is applied over the primer and beneath the topcoat, providing an elastomeric crack-resistant transition, and can create three-dimensional relief patterns with a dedicated roller." },
      { q: "What are the MOQ and lead time?", a: "Ordered by container / pallet, combined with the stone-effect / texture coating system; lead time is confirmed with each order." },
    ],
  },
};

export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DULUX_PRO_SERIES_META[seriesOriginal.trim()] || DULUX_PRO_SERIES_META.interior;
}
