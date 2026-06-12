/**
 * Daweier series metadata — rich text for product detail pages.
 * Indexed by seriesOriginal (catKey): sink / basin / other (drawn/pressed sinks, etc.) / faucet / drain / accessory.
 * Source: daweier.cn — Kaiping Daweier Kitchen & Bath, Guangdong.
 * Core business: handcrafted stainless-steel sinks, nano-embossed sinks, undermount basins, kitchen faucets, anti-odor floor drains, and matching accessories.
 * Reference: Huayue Supply Chain — Daweier product documentation + standard process parameters for the stainless-steel kitchen & bath industry.
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

export const DAWEIER_SERIES_META: Record<string, SeriesMeta> = {
  sink: {
    story:
      "The Daweier handcrafted stainless-steel sink is the centerpiece of the kitchen — a single SUS304 sheet folded into shape by a craftsman's hands. Unlike single-press drawn sinks, it is formed by welding to achieve crisp, near-square R10 corners, giving the basin a clean, squared profile and greater capacity, so a stockpot and a stack of bowls all sit securely inside. The 3.0mm reinforced basin walls, paired with a bottom nano-coating and a thick sound-deadening pad, turn the clatter of running water into a quiet, subdued hush. The surface is finished by hand brushing or nano embossing, so fingerprints and water spots no longer steal the show — instead, the finish develops a warm, mellow glow over time. For families who take cooking seriously, this is a place for water and work that can stand up to the heat and still look the part.",
    heritage:
      "Handcrafted sinks are the flagship product line that has rooted Daweier in Kaiping for many years — single and double bowls, universal models, plus American and European designs exported to the U.S. and EU markets, all available. From a flat sheet to a finished square basin, welding, grinding, and polishing are carried out by hand across multiple stages, distilling years of OEM experience into the confidence of an own-brand product.",
    technicalSpecs: [
      { label: "Material", value: "Food-grade SUS304 stainless steel (reinforced single sheet)" },
      { label: "Specification", value: "Single / double bowl, common 50–80cm bowl widths, customizable" },
      { label: "Process", value: "Handcrafted welded construction, crisp R10 corners" },
      { label: "Surface", value: "Hand-brushed / nano-embossed, fingerprint-resistant and easy to clean" },
      { label: "Corner radius", value: "R10 corners — squared profile, large capacity, no grime buildup at transitions" },
      { label: "Configuration", value: "Bottom nano-coating + reinforced sound-deadening pad + large-diameter drain assembly" },
    ],
    manufacturing: [
      "Daweier (Kaiping, Guangdong) — years of dedicated focus on handcrafted stainless-steel sinks, fully in-house from sheet cutting through welding, grinding, and polishing",
      "Built from a single food-grade SUS304 sheet, with basin walls reinforced to 3.0mm and hand-refined weld seams that are virtually invisible",
      "Basin interior finished by brushing or nano embossing; bottom sprayed with an anti-condensation nano coating and fitted with a sound-deadening, anti-vibration pad",
      "Every sink is individually water-tested for leaks and fully inspected for appearance — only watertight, passing units enter inventory",
      "OEM / ODM supported: basin shape, dimensions, accessories, and packaging can be customized to client drawings, suited to project and export orders",
    ],
    careGuide: [
      { title: "Clean with the grain", desc: "Use a soft cloth or sponge with a neutral dish soap and wipe along the brushed grain. Avoid steel wool and strong acidic or alkaline cleaners, which can scratch the finish or corrode the surface." },
      { title: "Dry after use", desc: "Wipe away standing water with a dry cloth after each use to keep water spots and scale from building up on the basin. In hard-water areas especially, keeping it dry preserves the shine longer." },
      { title: "Prevent rust transfer", desc: "Do not leave rust-prone metals such as iron pots or nails sitting in the basin for long periods. If outside rust stains appear, remove them early with a light rub of stainless-steel cleaning paste." },
      { title: "Keep the drain clear", desc: "Periodically remove the strainer basket to clear debris, and check whether the drain seal ring has aged, keeping drainage smooth and free of odor backflow." },
    ],
    installation: [
      "Mark and cut the countertop opening to the sink's profile; undermount basins require an installation allowance and confirmed countertop load capacity",
      "For top-mount basins, apply silicone along the rim and press into the opening; for undermount basins, fasten from below with dedicated clips and reapply waterproof sealant",
      "Install the drain assembly and connect the drainpipe, wrapping the hose-to-wall-drain joint with thread-seal tape to prevent leaks",
      "Test with water and check the basin bottom, drain assembly, and hose joints for any seepage, then wipe off excess silicone",
      "Before handover, perform a full-basin water-hold pressure test to confirm the R-corner drainage is smooth with no pooling",
    ],
    certifications: [
      "Food-grade SUS304 stainless steel, meeting hygiene requirements for kitchen utensils",
      "Kitchen & bath equipment complies with the relevant Chinese national standards (GB)",
      "Production control under the ISO 9001 quality management system",
      "Pre-shipment water leak and watertightness testing on every unit",
      "Salt-spray corrosion testing to verify rust resistance and durability",
    ],
    packaging: [
      { label: "Packaging", value: "Individual carton + EPE foam / protective film wrap, shielding the brushed basin surface and four corners" },
      { label: "Included accessories", value: "Large-diameter drain assembly, lift-out strainer basket, seal rings, fixing clips (model-dependent)" },
      { label: "Minimum order quantity", value: "By batch / container, mixed-model container loading supported" },
      { label: "Lead time", value: "Standard models ship from stock; custom basin shapes negotiated per order" },
      { label: "Samples", value: "Sample sinks available to confirm basin depth, feel, and surface finish" },
    ],
    whyChoose: [
      { icon: "🍳", title: "Reinforced SUS304", desc: "Food-grade 304 single sheet reinforced to 3.0mm — firm, dent- and pressure-resistant basin walls that last and never impart taste." },
      { icon: "🔇", title: "Quiet operation", desc: "Bottom nano-coating plus a thick sound-deadening pad effectively absorb the noise of running water and impacts, keeping the kitchen quieter." },
      { icon: "📐", title: "R10 large capacity", desc: "Hand-formed crisp corners give the basin a squared profile and greater capacity — pots, pans, and bowls all fit in one go." },
      { icon: "✋", title: "Hand-welded", desc: "Each unit is welded and refined by a craftsman, with fine, nearly invisible seams — workmanship that holds up to close inspection." },
      { icon: "🧽", title: "Easy-clean, anti-mark", desc: "Brushed / nano surfaces play down fingerprints and water spots; a single wipe along the grain leaves it clean, making everyday care effortless." },
    ],
    projectShowcase: [
      "Residential fitted cabinetry and open-kitchen remodels",
      "Volume fit-outs for apartments, guesthouses, and turnkey-finished homes",
      "Commercial kitchen wash stations for restaurants, canteens, and more",
      "Custom American / European export projects for foreign trade",
    ],
    faq: [
      { q: "How do I choose between a handcrafted sink and a drawn sink?", a: "Handcrafted sinks are welded, with thicker basin walls, tighter R-corners, greater capacity, and better sound insulation — a more premium choice. Drawn sinks are single-press formed, offering great value with rounder transitions that are easier to clean. Choose handcrafted for quality, drawn for budget." },
      { q: "What kind of stainless steel does the sink use?", a: "A single sheet of food-grade SUS304 stainless steel — rust- and corrosion-resistant, taste-neutral, and suited to high-frequency kitchen use." },
      { q: "Do you provide countertop cutout dimensions?", a: "Yes. Each model comes with its corresponding cutout and external dimensions; undermount basins also include an installation allowance, and Huayue Supply Chain can assist with installation drawings." },
      { q: "Will the bottom condense and drip?", a: "The basin bottom is sprayed with an anti-condensation nano coating and fitted with a sound-deadening pad, which markedly reduces condensation and lowers the risk of cabinet moisture damage." },
      { q: "What about minimum order quantity and lead time?", a: "By batch / container, with multiple models mixed in one load; standard models ship from stock, while custom basin shapes have lead times confirmed per order." },
    ],
  },

  faucet: {
    story:
      "The Daweier kitchen faucet is the finishing stroke on a complete sink setup. Built for washing vegetables and rinsing rice, its tall gooseneck arc lets a large pot turn freely in the basin, while the pull-out or swivel spout sends water to every corner of the bowl. The built-in ceramic cartridge opens and closes smoothly with clear hot-cold control, and after hundreds of thousands of cycles it still neither drips nor seeps. The brass or stainless-steel body is finished with multiple electroplated layers, so even years of constant exposure to moisture leave it bright and untarnished. The aerator softens the stream into a fine, gentle flow that saves water and cuts down on splashing. In a single turn, it delivers both convenience and durability.",
    heritage:
      "The faucet is a natural extension of Daweier's sink range — a sink and faucet from the same brand echo each other in size and style, sparing you the hassle of piecing together mismatched parts. Years of accumulated expertise in kitchen & bath hardware make this matching product line especially meticulous in the details of sealing and plating.",
    technicalSpecs: [
      { label: "Material", value: "Brass body / plated stainless steel, multi-layer electroplated surface" },
      { label: "Cartridge", value: "Import-grade ceramic cartridge, smooth and wear-resistant operation" },
      { label: "Process", value: "One-piece casting + fine polishing + anti-oxidation electroplating" },
      { label: "Spout", value: "Tall gooseneck, pull-out / swivel spout" },
      { label: "Configuration", value: "Aerator, hot & cold supply hoses, fixing base" },
      { label: "Application", value: "Hot-and-cold mixed water for kitchen sinks" },
    ],
    manufacturing: [
      "Daweier (Kaiping, Guangdong) — a kitchen faucet line built to match the sinks, designed in a unified style with the basins",
      "The body is cast brass or plated stainless steel, ensuring strength and corrosion resistance",
      "A ceramic cartridge tested through tens of thousands of open-close fatigue cycles ensures smooth feel and reliable sealing",
      "The surface is ground, polished, and multi-layer electroplated, passing salt-spray testing and resisting oxidation and discoloration",
      "Every unit is flow- and pressure-tested before shipment, checking hot-cold switching and the seal at each joint",
    ],
    careGuide: [
      { title: "Plating care", desc: "Wipe the plated surface with a soft cloth and clean water or a neutral cleaner; avoid abrasive or strongly acidic cleaners to prevent scratching and dulling of the plating." },
      { title: "Remove scale", desc: "The spout aerator scales up easily — unscrew it periodically and soak/rinse it in clean water or diluted white vinegar to restore smooth flow." },
      { title: "Inspect hoses", desc: "Regularly check the supply hoses and connections for seepage or aging; if leaks appear, replace the seal ring or hose promptly." },
    ],
    installation: [
      "Confirm the faucet hole diameter pre-cut in the sink or countertop and clear any burrs around the opening",
      "Insert the faucet into the hole, fasten from below with the base and lock nut, and align the direction",
      "Connect the hot and cold supply hoses to the angle valves, wrapping joints with thread-seal tape and tightening",
      "Run water and pressure-test, checking that cartridge switching is smooth and all joints are leak-free",
      "Wipe fingerprints and water spots off the faucet surface before handover",
    ],
    certifications: [
      "Kitchen & bath hardware complies with the relevant Chinese national standards (GB)",
      "Ceramic cartridge passes endurance open-close testing",
      "Production control under the ISO 9001 quality management system",
      "Plating salt-spray corrosion testing",
      "Flow/pressure and seal testing on every unit",
    ],
    packaging: [
      { label: "Packaging", value: "Color box / carton + foam lining, protecting the plated surface and spout" },
      { label: "Included accessories", value: "Hot & cold supply hoses, fixing base and lock nut, aerator" },
      { label: "Minimum order quantity", value: "By batch, can be container-loaded together with sinks" },
      { label: "Lead time", value: "Standard models ship from stock; custom items negotiated per order" },
      { label: "Samples", value: "Samples available to confirm feel and plating tone" },
    ],
    whyChoose: [
      { icon: "🚿", title: "Ceramic cartridge", desc: "Smooth operation with clear hot-cold control; still no drip or seep after hundreds of thousands of cycles." },
      { icon: "🛡️", title: "Durable plating", desc: "Multi-layer electroplating resists oxidation and discoloration, staying bright as new through years of moisture exposure." },
      { icon: "💧", title: "Water-saving aerator", desc: "The aerator softens the stream into a fine, dense flow, saving water and reducing splashing." },
      { icon: "🔄", title: "Flexible spout", desc: "A tall gooseneck with a pull-out / swivel spout makes turning large pots and rinsing tight corners effortless." },
      { icon: "🧩", title: "Matched set", desc: "Made by the same source as Daweier sinks, echoing each other in size and style for easier, more coordinated installation." },
    ],
    projectShowcase: [
      "Hot-and-cold mixer pairing for residential kitchen sinks",
      "Volume hardware fit-outs for apartments and turnkey-finished homes",
      "Wash-station faucets for restaurants and commercial kitchens",
      "Project deliveries paired in sets with Daweier sinks",
    ],
    faq: [
      { q: "What cartridge does the faucet use?", a: "A ceramic cartridge — smooth operation with reliable sealing, tested through tens of thousands of open-close fatigue cycles, so it is unlikely to drip over long-term use." },
      { q: "Will the plating tarnish or discolor over time?", a: "The surface is multi-layer electroplated and passes salt-spray testing, so with normal use and everyday wiping it stays bright for a long time — just avoid strong acids and abrasive cleaners." },
      { q: "Can it be paired with Daweier sinks?", a: "Yes. The faucet and sink come from the same source, with matching hole diameters and styles, so buying them as a set makes installation more seamless." },
      { q: "What about minimum order quantity and lead time?", a: "By batch, and it can be container-loaded together with sinks; standard models ship from stock, while custom items have lead times confirmed per order." },
    ],
  },

  drain: {
    story:
      "The Daweier floor drain is a hidden door that keeps household damp and odor pinned underground. Built from SUS304 stainless steel or solid copper, its substantial heft means it resists deformation and rusting through. Multiple structures are available — bottom outlet and side outlet (E series) — paired with a deepened P-trap or flip-valve anti-odor core, blocking sewer backflow while catching hair and debris. The high-flow drainage design clears standing water quickly after a shower, so the floor no longer stays wet. Whether in the bathroom, on the balcony, or in the kitchen, it sits quietly beneath the floor, keeping dryness and freshness right at your feet.",
    heritage:
      "Floor drains are Daweier's strongest, most finely honed product line, cultivated over many years — from the classic bottom outlet to the side-outlet E series and the square L05 model, covering all kinds of drain-port types and renovation scenarios. Years of accumulated know-how let it strike just the right balance between anti-odor structure and drainage efficiency.",
    technicalSpecs: [
      { label: "Material", value: "SUS304 stainless steel / solid copper, corrosion-resistant and rust-resistant" },
      { label: "Specification", value: "Bottom outlet / side outlet (E series) / square (L05), multiple sizes" },
      { label: "Process", value: "Brushed or electroplated panel, one-piece formed body" },
      { label: "Anti-odor", value: "Deep P-trap / flip-valve anti-odor core, blocking odor backflow" },
      { label: "Drainage", value: "High-flow drainage design, fast water clearance to prevent pooling" },
      { label: "Configuration", value: "Anti-odor core, filter screen, removable washable panel" },
    ],
    manufacturing: [
      "Daweier (Kaiping, Guangdong) — a flagship floor-drain line cultivated over years, with a full range of structures and styles",
      "The body is SUS304 stainless steel or solid copper, resisting corrosion in damp environments and unlikely to rust through",
      "The panel is brushed or electroplated, with an internal deep P-trap or flip-valve anti-odor core",
      "Independent structures are developed for the different installation scenarios of bottom and side outlets, suiting all kinds of drain-port types",
      "Drainage-flow and anti-odor seal testing is performed before shipment to ensure fast drainage and firm odor blocking",
    ],
    careGuide: [
      { title: "Clean out regularly", desc: "Remove the panel and filter screen to clear accumulated hair and debris, keeping drainage smooth without clogging or overflow." },
      { title: "Anti-odor core upkeep", desc: "If the flip-valve or P-trap anti-odor core deforms or sticks, clean and reseat it or replace it promptly to prevent odor backflow." },
      { title: "Panel cleaning", desc: "Wipe the stainless-steel panel with a soft cloth along the grain, avoiding steel wool; keep copper panels away from strong acids to preserve their shine." },
    ],
    installation: [
      "Choose a bottom-outlet or side-outlet model based on the floor drain-port type and confirm the pipe diameter matches",
      "Install the drain to the finished floor level, allowing for and ensuring the drainage slope",
      "Apply waterproof sealing at the drain-to-pipe joint and fit the tile edge snugly against the panel",
      "Install the anti-odor core and filter screen, then pour water to test drainage speed and the anti-odor seal",
      "Before handover, confirm the panel is flush with the floor and there is no seepage or pooling around it",
    ],
    certifications: [
      "SUS304 stainless steel / solid copper, corrosion-resistant and meeting bathroom-use requirements",
      "Bathroom drainage hardware complies with the relevant Chinese national standards (GB)",
      "Production control under the ISO 9001 quality management system",
      "Anti-odor seal and drainage-flow testing passed",
      "Salt-spray corrosion testing to verify durability in damp environments",
    ],
    packaging: [
      { label: "Packaging", value: "Individual box + foam, protecting the panel and anti-odor core" },
      { label: "Included accessories", value: "Anti-odor core, filter screen, removable washable panel (model-dependent)" },
      { label: "Minimum order quantity", value: "By batch / container, mixed-style loading supported" },
      { label: "Lead time", value: "Standard models ship from stock; custom items negotiated per order" },
      { label: "Samples", value: "Samples available to confirm structure, size, and anti-odor method" },
    ],
    whyChoose: [
      { icon: "👃", title: "Effective odor control", desc: "A deep P-trap or flip-valve anti-odor core provides dual control, firmly blocking sewer odor from backflowing." },
      { icon: "💧", title: "High-flow drainage", desc: "An optimized drainage channel clears standing water quickly after a shower, so the floor dries faster." },
      { icon: "🛡️", title: "Stainless / copper body", desc: "A SUS304 or solid-copper body resists damp and corrosion, unlikely to rust through or deform even under long-term water exposure." },
      { icon: "🔧", title: "Versatile fit", desc: "Bottom outlet, side-outlet E series, and square L05 — multiple structures to suit all kinds of drain-port types." },
      { icon: "🧼", title: "Removable and easy to clean", desc: "The panel and filter screen detach, so clearing hair and debris is done in one step, making maintenance easy." },
    ],
    projectShowcase: [
      "Floor drainage for residential bathrooms and shower rooms",
      "Floor drainage for balconies, laundry areas, and kitchens",
      "Volume fit-outs for apartments, hotels, and turnkey-finished homes",
      "Commercial bathroom settings requiring fast drainage",
    ],
    faq: [
      { q: "How do I choose between bottom outlet and side outlet (E series)?", a: "Choose the bottom outlet when the drainpipe is directly beneath the drain; choose the side-outlet E series when the pipe opening is offset to one side or the installation layer is shallow. Decide based on the on-site drain-port position and reserved depth." },
      { q: "How is the anti-odor effect achieved?", a: "By sealing the air path with a deep P-trap or flip-valve anti-odor core, blocking sewer odor from backflowing; periodically cleaning the anti-odor core keeps the odor-blocking effect long-lasting." },
      { q: "Does it clog easily with hair?", a: "It comes with a filter screen to catch hair and debris, and the removable panel allows regular cleaning; the high-flow channel design also reduces the risk of clogging." },
      { q: "Is the material stainless steel or copper?", a: "Both SUS304 stainless steel and solid-copper bodies are available — both resist damp and corrosion, so you can choose by budget and style." },
      { q: "What about minimum order quantity and lead time?", a: "By batch / container, with multiple styles mixed in one load; standard models ship from stock, while custom items have lead times confirmed per order." },
    ],
  },

  accessory: {
    story:
      "Daweier sink accessories are the behind-the-scenes players that make a sink truly easy to use. Drain assemblies, drain heads, drainpipes, lift-out strainer baskets, and inset storage trays — each is tailored to the dimensions of Daweier's own sinks, fitting perfectly on installation, so you never have to chase down adapters. The large-diameter drain assembly clears water fast, the lift-out strainer basket catches debris in the basin and lifts out for easy disposal, and the inset storage tray keeps the drying rack and soap bottle neatly in order. Unassuming, yet effortless at every turn — the polish of a good kitchen often hides in details like these.",
    heritage:
      "Accessories are the final piece of the Daweier sink system. Years of experience in supplying complete sets make these drainage and storage parts a high match with the basin in size, sealing, and material pairing, sparing users the trouble of piecing together mismatched parts.",
    technicalSpecs: [
      { label: "Material", value: "SUS304 stainless steel / alloy / ABS engineering plastic" },
      { label: "Specification", value: "Standard drain diameter, matched to all Daweier sink models" },
      { label: "Process", value: "Brushed/polished stainless steel, injection-molded plastic parts" },
      { label: "Surface", value: "Brushed or electroplated, fingerprint-resistant and easy to clean" },
      { label: "Anti-odor", value: "Drainpipe with P-trap structure, blocking odors" },
      { label: "Configuration", value: "Drain assembly, drain head, drainpipe, lift-out strainer basket, storage tray" },
    ],
    manufacturing: [
      "Daweier (Kaiping, Guangdong) — a drainage and storage accessory line produced as complete sets with the sinks",
      "Metal parts use SUS304 stainless steel or alloy, plastic parts use ABS engineering plastic, pairing hard and soft to each part's strengths",
      "The drain assembly and drain head are tooled to the sink's standard diameter, ensuring a perfect fit with the basin",
      "The drainpipe is designed with a P-trap anti-odor structure, and seal rings are leak-tested on every unit",
      "Supports set-matched supply by sink model, reducing on-site adapter and fitting hassles",
    ],
    careGuide: [
      { title: "Clean with the grain", desc: "Wipe stainless-steel parts along the grain with a soft cloth and clean plastic parts with a neutral cleaner; avoid steel wool and strong acids to preserve the surface and shine." },
      { title: "Clear the strainer basket", desc: "Periodically remove the lift-out strainer basket to clear debris and rinse the drain assembly, preventing grease buildup and clogging." },
      { title: "Check the seals", desc: "Watch for aging or deformation of the seal rings at the drain assembly and drainpipe joints, and replace promptly if leaks appear." },
    ],
    installation: [
      "Confirm the accessory diameter matches the sink drain hole and prepare seal rings and thread-seal tape",
      "Install the drain assembly / drain head into the basin-bottom hole, clamping the seal rings top and bottom and tightening",
      "Connect the drainpipe to the wall or floor drain, wrapping joints with thread-seal tape and aligning the P-trap direction",
      "Install the lift-out strainer basket, storage tray, and so on, checking that placement is secure",
      "Run a water leak test, confirming all joints are leak-free before handover",
    ],
    certifications: [
      "SUS304 stainless steel and food-grade plastic parts, meeting kitchen & bath hygiene requirements",
      "Kitchen & bath accessories comply with the relevant Chinese national standards (GB)",
      "Production control under the ISO 9001 quality management system",
      "Seal-ring leak and watertightness testing on every unit",
      "Corrosion testing to verify durability in long-term damp environments",
    ],
    packaging: [
      { label: "Packaging", value: "Bagged / boxed + foam, packed by set to protect the accessories" },
      { label: "Included accessories", value: "Seal rings, fixing lock nuts, installation instructions (model-dependent)" },
      { label: "Minimum order quantity", value: "By batch, can be container-loaded as a set with sinks" },
      { label: "Lead time", value: "Standard parts ship from stock; custom items negotiated per order" },
      { label: "Samples", value: "Sample parts available to confirm diameter and matching dimensions" },
    ],
    whyChoose: [
      { icon: "🧩", title: "Precise matching", desc: "Tooled to Daweier sink dimensions for a perfect fit on installation, sparing you the search for adapters." },
      { icon: "💧", title: "Fast drainage", desc: "A large-diameter drain assembly and anti-odor drainpipe drain fast and block odors for smoother flow." },
      { icon: "🧺", title: "Tidy storage", desc: "The lift-out strainer basket and inset storage tray keep draining and storage neatly in order, leaving the countertop cleaner." },
      { icon: "🛡️", title: "Durable materials", desc: "SUS304 stainless steel paired with engineering plastic balances hard and soft, resisting damp and corrosion for long service." },
      { icon: "🔧", title: "Effortless installation", desc: "Set-matched supply with unified diameters means fewer on-site adapters and a one-time installation done right." },
    ],
    projectShowcase: [
      "Complete drainage and storage setups for residential sinks",
      "Volume cabinetry fit-outs for apartments and turnkey-finished homes",
      "Wash-station accessories for restaurants and commercial kitchens",
      "Project deliveries paired in sets with Daweier sinks",
    ],
    faq: [
      { q: "Can the accessories be used with other brands' sinks?", a: "When diameters are close they often can, but Daweier accessories are tooled to its own sinks, so buying them as a set is more reliable in size and sealing and easier to install." },
      { q: "Can the drainpipe block odors?", a: "Yes. The drainpipe has a P-trap structure that seals the air path and blocks sewer odor from backflowing, and regular cleaning keeps the effect long-lasting." },
      { q: "What is the inset storage tray for?", a: "It fits into the sink edge or inside the basin to hold the drying rack, soap bottle, cutlery, and so on, helping keep the countertop and sink area tidy and organized." },
      { q: "What about minimum order quantity and lead time?", a: "By batch, and it can be container-loaded as a set with sinks; standard parts ship from stock, while custom items have lead times confirmed per order." },
    ],
  },

  other: {
    story:
      "The Daweier drawn sink is the effortless choice, formed in a single seamless press. A whole SUS304 sheet is drawn into shape in one stroke under a high-tonnage hydraulic press, so the basin is one continuous piece with no weld seams, and the natural curve at the corners leaves grease and water spots nowhere to hide — a single wipe and it is clean. Compared with the handcrafted sink, its process is simpler and its value higher, yet it holds onto the same food-grade stainless-steel durability and hygiene. Universal, American, and European designs cover different countertops and tastes, and with bottom sound insulation and anti-condensation treatment, water runs quietly and the cabinet stays dry. For families and projects that value practicality and efficiency, this is a sink that fits any setting and is always easy to use.",
    heritage:
      "Drawn sinks stand alongside handcrafted sinks as another core series for Daweier. The single-press process draws on years of foreign-trade OEM experience, keeping quality assured while pushing cost into a friendly range, with exports reaching the American and European markets.",
    technicalSpecs: [
      { label: "Material", value: "Food-grade SUS304 stainless steel (single sheet)" },
      { label: "Specification", value: "Single / double bowl, universal / American / European designs, multiple sizes" },
      { label: "Process", value: "Single-sheet single-draw press forming, no weld seams" },
      { label: "Surface", value: "Brushed / nano finish, curved transitions that are easy to clean" },
      { label: "Corner radius", value: "Natural large-radius curves, no grime buildup at corners" },
      { label: "Configuration", value: "Bottom sound-deadening pad + anti-condensation coating + drain assembly" },
    ],
    manufacturing: [
      "Daweier (Kaiping, Guangdong) — a core drawn-sink line standing alongside the handcrafted sinks",
      "Built from a whole food-grade SUS304 sheet, drawn into shape in one stroke under a high-tonnage hydraulic press, with a seamless basin",
      "The basin surface is brushed or nano-finished, with the bottom sprayed with an anti-condensation coating and fitted with a sound-deadening, anti-vibration pad",
      "Each unit is water-tested for leaks and fully inspected for appearance — only watertight, passing units enter inventory",
      "Supports OEM / ODM customization of basin shape, dimensions, and packaging, suited to export and project orders",
    ],
    careGuide: [
      { title: "Clean with the grain", desc: "Wipe along the grain with a soft cloth and neutral dish soap, avoiding steel wool and strong acids or alkalis to protect the brushed surface from scratching and corrosion." },
      { title: "Dry after use", desc: "Wipe away standing water after use to keep water spots and scale from forming; in hard-water areas, keeping it dry leaves the basin brighter." },
      { title: "Prevent rust transfer", desc: "Do not leave iron items in the basin for long; remove outside rust stains early with a light rub of stainless-steel cleaning paste." },
      { title: "Keep the drain clear", desc: "Periodically clear the strainer basket and drain assembly and check the seal ring, keeping drainage smooth and odor-free." },
    ],
    installation: [
      "Mark and cut the countertop opening to the basin shape, confirming countertop load capacity and opening allowance",
      "For top-mount basins, apply silicone along the rim and press into the opening; for undermount basins, fasten with clips and reapply waterproof sealant",
      "Install the drain assembly, connect the drainpipe, and wrap hose joints with thread-seal tape to prevent leaks",
      "Test with water and check the basin bottom, drain assembly, and hose joints for any seepage, then wipe off excess sealant",
      "Before handover, perform a water-hold pressure test to confirm drainage is smooth with no pooling",
    ],
    certifications: [
      "Food-grade SUS304 stainless steel, meeting hygiene requirements for kitchen utensils",
      "Kitchen & bath equipment complies with the relevant Chinese national standards (GB)",
      "Production control under the ISO 9001 quality management system",
      "Pre-shipment water leak and watertightness testing on every unit",
      "Salt-spray corrosion testing to verify rust resistance and durability",
    ],
    packaging: [
      { label: "Packaging", value: "Individual carton + EPE foam / protective film, protecting the basin surface and four corners" },
      { label: "Included accessories", value: "Drain assembly, strainer basket, seal rings, fixing clips (model-dependent)" },
      { label: "Minimum order quantity", value: "By batch / container, mixed-model container loading supported" },
      { label: "Lead time", value: "Standard models ship from stock; custom basin shapes negotiated per order" },
      { label: "Samples", value: "Sample sinks available to confirm basin depth, feel, and surface finish" },
    ],
    whyChoose: [
      { icon: "🍳", title: "SUS304 single sheet", desc: "Food-grade 304 single sheet pressed in one stroke, one continuous piece — durable, hygienic, and taste-neutral." },
      { icon: "💰", title: "Great value", desc: "Single-draw press forming keeps the process simpler and the cost friendly — a practical choice." },
      { icon: "🧽", title: "Curved and easy to clean", desc: "Natural rounded transitions run smooth, leaving grease and water spots nowhere to hide — a single wipe cleans it." },
      { icon: "🔇", title: "Quiet and moisture-resistant", desc: "A bottom sound-deadening pad plus anti-condensation coating keep water quiet and the cabinet less prone to moisture." },
      { icon: "🌍", title: "Versatile designs", desc: "Universal / American / European designs cover different countertops and tastes, exported to both domestic and overseas markets." },
    ],
    projectShowcase: [
      "Wash stations for residential kitchens and bathrooms",
      "Volume sink fit-outs for apartments and turnkey-finished homes",
      "Commercial wash settings for dining venues, canteens, and more",
      "American / European foreign-trade export projects",
    ],
    faq: [
      { q: "What is the difference between a drawn sink and a handcrafted sink?", a: "The drawn sink is single-press formed from one sheet, seamless, with rounded transitions and great value; the handcrafted sink is welded, with thicker basin walls, tighter R-corners, greater capacity, and better sound insulation. Choose drawn for budget, handcrafted for quality." },
      { q: "What kind of stainless steel does it use?", a: "A single sheet of food-grade SUS304 — rust- and corrosion-resistant, taste-neutral, and suited to kitchen and bathroom use." },
      { q: "Do you provide cutout dimensions?", a: "Yes. Each basin shape comes with its corresponding cutout and external dimensions, and Huayue Supply Chain can assist with installation drawings." },
      { q: "Will the bottom condense?", a: "The basin bottom has an anti-condensation coating and a sound-deadening pad, which markedly reduce condensation and lower the risk of cabinet moisture damage." },
      { q: "What about minimum order quantity and lead time?", a: "By batch / container, with multiple models mixed in one load; standard models ship from stock, while custom basin shapes have lead times confirmed per order." },
    ],
  },
};

// basin shares the same source as sink (handcrafted stainless-steel basin) — reuse sink metadata.
DAWEIER_SERIES_META.basin = DAWEIER_SERIES_META.sink;

/** Helper: get metadata by seriesOriginal, falling back to sink by default. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DAWEIER_SERIES_META[seriesOriginal.trim()] || DAWEIER_SERIES_META.sink;
}
