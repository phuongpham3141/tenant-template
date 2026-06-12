/**
 * Brand metadata — Dongyuan (Guangdong Dongyuan Kitchenware) — shared brand-level metadata.
 * Source: dongyuan.en.made-in-china.com. A SUS 304 stainless-steel kitchen sink manufacturer, founded in 1993 in Shunde, Foshan.
 * Sources: Dongyuan official product pages (made-in-china.com) + industry-standard process parameters for stainless-steel kitchenware.
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
    "The soul of the kitchen lives at the edge of the sink — rinsing vegetables, scrubbing pots, prepping meals, and cleaning up afterward. The everyday warmth of a family's three daily meals ultimately flows into this single basin of stainless steel. Guangdong Dongyuan Kitchenware Industrial Co., Ltd. was founded in 1993, rooted in Shunde District, Foshan — the core industrial belt of China's home-appliance and kitchen-and-bath manufacturing. For more than three decades, Dongyuan has perfected one thing: forging a sheet of imported premium stainless steel into a kitchen sink that withstands oil, salt, and seasoning while standing the test of time. Across a modern campus of roughly 25,000 square meters, more than 400 skilled workers and an in-house mold-design team keep every step in their own hands — from blanking and stamping to welding, brushing, and polishing. To Dongyuan, a sink is not merely a piece of hardware; it is the dependable foundation of the kitchen, trusted, used, and remembered day after day.",
  heritage:
    "With more than 30 years focused on stainless-steel kitchen sinks, Dongyuan builds on a foundation of imported SUS 304 steel and in-house molds, spanning the full range of top-mount, undermount, single-bowl, double-bowl, and handmade sinks. Holding export certifications such as UPC and CSA, the company serves markets worldwide. From a small workshop in Shunde to a professional manufacturer serving global project and distribution channels, what has carried through is a lasting dedication to the time-honored craft of working stainless steel.",
  technicalSpecs: [
    { label: "Brand", value: "Dongyuan (Guangdong Dongyuan Kitchenware Industrial Co., Ltd.)" },
    { label: "Founded / Origin", value: "1993, Shunde, Foshan, Guangdong, China" },
    { label: "Core Products", value: "SUS 304 stainless-steel kitchen sinks (top-mount/undermount, single/double bowl, handmade)" },
    { label: "Sheet Material", value: "Imported premium SUS 304 stainless steel — corrosion-resistant and food-contact safe" },
    { label: "Process Type", value: "Dual production lines: one-piece deep-drawn forming and handmade welded construction" },
    { label: "Facility Scale", value: "Approx. 25,000 square meters, 400+ skilled workers, in-house mold-design team" },
  ],
  manufacturing: [
    "Guangdong Dongyuan Kitchenware was founded in 1993 in Shunde, Foshan — the core kitchen-and-bath and home-appliance industrial cluster of the Pearl River Delta, with a mature supporting supply chain",
    "All sinks use imported premium SUS 304 stainless-steel sheet with stable chromium and nickel content — corrosion-resistant, rust-resistant, and long-lasting in its bright finish",
    "An in-house mold-design team independently develops molds across multiple specifications — top-mount, undermount, single and double bowl — keeping dimensional accuracy and consistency under control",
    "Handmade models are welded and formed by hand with tight right-angle R corners; drawn models are stamped one-piece on high-tonnage presses — two lines running in parallel to suit different applications",
    "In-house production lines cover blanking, stamping/welding, grinding, brushed polishing, bottom sound-dampening treatment, and water-tightness testing — direct factory supply with reliable lead times",
  ],
  careGuide: [
    { title: "Daily Cleaning", desc: "Wipe along the brushed grain with a soft cloth or sponge and a neutral detergent; avoid steel wool and strong acids or alkalis to prevent scratching or corroding the stainless-steel surface." },
    { title: "Preventing Water Spots and Limescale", desc: "Wipe dry promptly after use and avoid standing water for long periods; in hard-water areas, use a dedicated stainless-steel cleaner periodically to restore luster and suppress limescale buildup." },
    { title: "Keeping Drainage Free-Flowing", desc: "Regularly clear food scraps and grease from the strainer basket and clear the P-trap to prevent clogs and odors, extending the life of the drain fittings." },
    { title: "Avoiding High Heat and Heavy Impact", desc: "Do not leave scalding-hot cookware resting on the sink bottom for extended periods; set heavy items down gently to avoid localized heat discoloration or dents from hard impacts." },
  ],
  installation: [
    "Determine the mounting method based on the countertop material (quartz, sintered stone, solid surface, etc.) and the cutout drawing: top-mount, undermount, or flush-mount",
    "Cut the countertop opening precisely to the sink's outer dimensions; undermount installations require pre-positioned mounting clips and a countertop thick enough to bear the load",
    "Top-mount sinks are pressed and sealed at the rim with mildew-resistant silicone; undermount sinks are fixed beneath the countertop with dedicated adhesive and support clips to ensure a secure, sag-free fit",
    "Install the faucet, drain assembly, drainpipe, and P-trap, connect the hot and cold supply lines, then fill with water to test all joints for leaks and sealing",
    "Clean off residual adhesive, inspect the sink's level, drainage slope, and odor-blocking P-trap, and run a full fill-and-drain test before handover",
  ],
  certifications: [
    "Material: imported SUS 304 stainless steel — meets food-contact material safety requirements",
    "Export certifications: UPC (North American plumbing standard) / CSA (Canadian safety certification)",
    "Process control: water-tightness testing, spot inspection of stainless-steel sheet thickness, and quality inspection of welds and deep-drawn forming",
    "Surface safety: brushed/polished finish with deburred corners and edges — safe and snag-free in daily use",
    "Whole-sink warranty: product quality guarantee provided, with warranty period and terms confirmed per order",
  ],
  packaging: [
    { label: "Packaging Format", value: "Individual carton + foam/corner protectors + surface protective film to prevent transit scratches" },
    { label: "Included Accessories", value: "Drain assembly, strainer basket, sealing ring, mounting clips (configuration varies by model)" },
    { label: "Supply Unit", value: "Supplied by sink SKU/model; supports mixed loads across single/double bowl and top-mount/undermount models" },
    { label: "Minimum Order Quantity", value: "By batch/container; flexible negotiation for project and distribution orders" },
    { label: "Samples", value: "Sample sinks available to confirm feel, sheet thickness, and brushed finish before placing a bulk order" },
  ],
  whyChoose: [
    { icon: "🛡️", title: "Imported 304 Stainless Steel", desc: "Imported premium SUS 304 sheet — corrosion-resistant, food-contact safe, lasting and rust-free without dulling, and built to handle the daily demands of the kitchen." },
    { icon: "🥘", title: "30 Years on Sinks Alone", desc: "Founded in 1993, with more than 30 years devoted to stainless-steel kitchen sinks — deep craft expertise, a full range of models, and the reliability that comes with specialization." },
    { icon: "🔧", title: "In-House Molds and Production", desc: "An in-house mold-design team plus a 25,000-square-meter company-owned factory deliver precise dimensions, strong consistency, and stable lead times — straight from the source." },
    { icon: "✋", title: "Handmade and Drawn — Dual Process", desc: "High-capacity handmade welded right-angle sinks alongside smooth one-piece deep-drawn styles — choose top-mount, undermount, single bowl, or double bowl to suit your kitchen." },
    { icon: "🌍", title: "Export-Grade Quality Certified", desc: "Holding export certifications such as UPC and CSA, with quality controlled to international market standards — confidence for both project and distribution channels." },
  ],
  projectShowcase: ["Full-cabinet residential kitchens", "Premium fit-outs for apartments and townhouses", "Restaurants, eateries, and commercial kitchens", "Kitchen projects for hotels, canteens, and more"],
  faq: [
    { q: "What material are Dongyuan sinks made of?", a: "Primarily imported premium SUS 304 stainless steel, with stable chromium and nickel content — corrosion-resistant, rust-resistant, food-contact safe, and suited to long-term kitchen environments." },
    { q: "How do I choose between top-mount and undermount?", a: "Top-mount sinks press onto the countertop surface — easy to install and renovation-friendly; undermount sinks fit beneath the countertop for a flush, seamless surface that is easy to clean, but require a sufficiently thick, reinforced countertop to bear the load." },
    { q: "What is the difference between handmade and drawn sinks?", a: "Handmade sinks are welded by hand with tight right-angle R corners and deeper bowls for greater capacity; drawn sinks are stamped one-piece with smooth rounded corner transitions and excellent structural integrity. Choose handmade for capacity, drawn for a smooth one-piece look." },
    { q: "Do the sinks come with drain fittings?", a: "They typically include basic accessories such as a drain assembly, strainer basket, and sealing ring (configuration varies by model), along with cutout dimensions and mounting clips for easy on-site installation." },
    { q: "Is Dongyuan available in Vietnam?", a: "Please contact Huayuesc supply chain for quotations, minimum order quantities, and lead-time inquiries on supplying Dongyuan stainless-steel sinks for Vietnamese projects and distributors." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
