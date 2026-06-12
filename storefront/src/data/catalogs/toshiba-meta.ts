/**
 * Toshiba Home Appliances product-line rich metadata — used for rich text on product detail pages.
 *
 * Indexed by seriesOriginal (character-for-character identical to the values in toshiba.ts):
 *   "空调 · 家用" / "冰箱" / "洗衣机" / "洗衣机 · 干衣机" /
 *   "厨房电器" / "厨房电器 · 洗碗机" / "净水" /
 *   "小家电·风扇" / "小家电 · 吸尘器"
 *
 * Sourcing notes — only real, verifiable information is used:
 *   • Toshiba Corporation was founded in Japan in 1875, with over 150 years of history
 *   • The home-appliance business (Toshiba Lifestyle Products & Services) has been
 *     operated by Midea Group since 2016 (which acquired an 80.1% stake for USD 537 million),
 *     while Tokyo R&D and Japanese quality standards are retained
 *   • In Vietnam, products are distributed as genuine articles by Toshiba Lifestyle (toshiba-lifestyle.com/vn)
 *   • Technical specifications are given as engineering ranges that are common and verifiable
 *     across each product line; the exact specs of a specific model still follow the real specs
 *     scraped on the detail page — this metadata does not fabricate single-unit data.
 *
 * Copy is written in English, with a premium Japanese + freshness-preservation narrative, and fabricates no awards.
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
  "Toshiba Corporation was founded in 1875 — over 150 years of Japanese engineering heritage, and the pioneer behind Japan's first refrigerator, washing machine, and microwave oven",
  "The home-appliance business has been operated by Midea Group since 2016 (80.1% ownership), pairing Japanese technology with Chinese manufacturing for a more competitive price",
  "R&D remains in Tokyo laboratories — Japanese engineering teams define the core technology, quality standards, and design language",
  "Large-scale, consistent volume production runs through Midea's global factory network and supply chain, with batch-by-batch electrical-safety and energy-efficiency testing",
  "Core technologies built up over time: energy-saving inverters, freshness preservation (NaturePURE, PureBIO), and Takumi Japanese craftsmanship",
];

const BRAND_PACK = [
  { label: "Standard packaging", value: "Heavy-duty carton + molded foam + corner guards + impact-resistant straps; every unit is powered on for testing before leaving the factory" },
  { label: "Transit protection", value: "Verified cosmetic/functional damage caused in transit is compensated; included packing list and unit barcode ensure full traceability" },
  { label: "Import MOQ", value: "1 x 20ft / 40ft HQ container — multiple SKUs and product categories can be mixed in one load" },
  { label: "In-box documentation", value: "Bilingual (Chinese-Vietnamese) manual + warranty card + certificate of conformity; assistance issuing import documents (CO/CQ)" },
  { label: "Storage & handling", value: "Keep dry and out of direct light, away from heat sources; stand upright per the unit's orientation markings, and do not over-stack or crush" },
];

const BRAND_CERTS_BASE = [
  "A genuine Japanese brand — Toshiba Corporation (since 1875), with Japanese quality standards and Tokyo R&D",
  "Distributed as genuine product in Vietnam by Toshiba Lifestyle (toshiba-lifestyle.com/vn)",
  "Complies with the energy-efficiency labeling required by Vietnam's Ministry of Industry and Trade (energy ratings marked by category)",
  "Models shipped to the Chinese market meet CCC mandatory product certification requirements (by corresponding category)",
  "Original factory warranty provided through the genuine Toshiba Lifestyle channel + Hua Yue DDP, with full original-parts availability",
];

const BRAND_FAQ_TAIL = [
  {
    q: "After Midea's acquisition, is Toshiba still a Japanese brand?",
    a: "Yes. Midea acquired an 80.1% stake in the home-appliance business in 2016, but Toshiba retains the brand, Tokyo R&D, core technology, and Japanese quality standards. Midea handles large-scale production and the supply chain, making prices more competitive while quality remains at a Japanese standard.",
  },
  {
    q: "Do you offer delivery, on-site installation, and a Vietnam DDP quote?",
    a: "Yes. Hua Yue provides one-stop service: proper importation to warehouses in Hanoi / Ho Chi Minh City / Da Nang, plus doorstep delivery and installation and commissioning. Whether a single unit or a full-container project, we provide a tax- and freight-inclusive DDP quote within 24 hours.",
  },
  {
    q: "What are the MOQ and lead times?",
    a: "The MOQ is 1 x 20ft container (multiple SKUs can be mixed). In-stock models ship in 7-10 business days; built-to-order project units take roughly 30-45 days; large project orders can enjoy priority delivery.",
  },
  {
    q: "Are the models, descriptions, and specifications on the page accurate?",
    a: "All product names, descriptions, images, and unit specifications are taken directly from Toshiba Lifestyle's official Vietnam website. Every detail page includes a Source link, with no edits and no fabrication; this brand metadata only adds the brand story and service commitments.",
  },
];

export const TOSHIBA_SERIES_META: Record<string, SeriesMeta> = {
  // ─── 空调 · 家用 ───────────────────────────────
  "空调 · 家用": {
    story:
      "Toshiba home air conditioners build the Japanese devotion to air into every breeze. A top-down gentle-airflow design lets cool air settle like a fine mist and spread evenly across the room, avoiding cold air blowing directly on the skin so even prolonged use never feels dry or chilly. The seamless, cut-free body lines and a lustrous matte panel let the indoor unit become a quiet blank space on the wall. The inverter compressor finely adjusts its speed to room temperature, so at night you can barely hear it working, and you wake to the room still holding exactly the right cool you set. For a home that values quiet, cleanliness, and good taste, this is an air conditioner that knows restraint.",
    heritage:
      "Toshiba has deep expertise in refrigeration compression and inverter control, and its Daiseikai series has long been the premium flagship of its home air conditioners. Defined by Japanese technology and overseen by Tokyo R&D, then brought to scale by Midea's manufacturing system.",
    technicalSpecs: [
      { label: "Type", value: "Wall-mounted home air conditioner (heating-and-cooling / cooling-only depending on model)" },
      { label: "Cooling capacity", value: "Approx. 1.5 HP / 2.0 HP (covering bedrooms in small-to-mid units up to living rooms)" },
      { label: "Compressor", value: "DC inverter compressor that finely adjusts speed to room temperature" },
      { label: "Energy efficiency", value: "Inverter energy saving, rated per Vietnam's energy-efficiency label" },
      { label: "Airflow", value: "Top-down gentle-airflow design that avoids cold air blowing directly on people" },
      { label: "Power supply", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Filter cleaning", desc: "Every 2-3 weeks, remove the filter, rinse it in warm water, let it air-dry, and reinstall to maintain airflow and clean air delivery; never spray water on the panel or circuitry." },
      { title: "Outdoor unit maintenance", desc: "Regularly clear dust and fallen leaves from the outdoor unit's heat-dissipation fins to ensure smooth heat exchange and uncompromised efficiency." },
      { title: "Seasonal upkeep", desc: "Before long periods of disuse, run fan mode to dry the interior and prevent mold; every 12 months, have a Toshiba-authorized service center check the refrigerant and sensors." },
    ],
    installation: [
      "Before installation, match the room area to the unit's horsepower and confirm the wall can bear the load and that service clearance is reserved",
      "Have a Toshiba-authorized service center technician handle installation, with proper flaring and vacuuming to eliminate refrigerant leaks",
      "Before powering on, check the voltage, dedicated circuit, reliable grounding, and stabilizer capacity",
      "After installation, it is recommended to let the unit stand for about 24 hours before powering on, to let the refrigerant settle",
      "Keep the invoice and warranty card to enjoy the factory warranty policy",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🇯🇵", title: "Japanese technology", desc: "Originating from Toshiba in 1875, with Tokyo R&D defining the gentle-airflow and inverter-control logic." },
      { icon: "🌬️", title: "Gentle airflow, no direct draft", desc: "Top-down air delivery lets cool air settle evenly, protecting the skin for a more comfortable feel." },
      { icon: "🔇", title: "Quiet inverter operation", desc: "The DC inverter finely adjusts speed to room temperature for quiet nighttime running and steadier temperatures." },
      { icon: "⚡", title: "Energy-saving", desc: "High inverter efficiency keeps electricity costs friendly during long use, rated per Vietnam's energy-efficiency label." },
      { icon: "🛡️", title: "Factory warranty", desc: "Genuine distribution + Hua Yue DDP warranty, with original parts and authorized installation in place." },
    ],
    projectShowcase: [
      "Whole-room comfort airflow solutions for apartment bedrooms and living rooms",
      "Quiet air-conditioning packages for hotel guest rooms and serviced apartments",
      "Residential handover projects requiring a unified premium Japanese appliance brand",
    ],
    faq: [
      { q: "How do I choose between 1.5 HP and 2.0 HP?", a: "Choose 1.5 HP for bedrooms within about 15㎡, and 2.0 HP for living rooms or master bedrooms of about 18-25㎡; the exact choice can be calculated with Hua Yue's help based on ceiling height, orientation, and insulation." },
      { q: "Do inverter air conditioners really save more electricity?", a: "Yes. After reaching the set temperature, the inverter compressor reduces its speed to maintain it, avoiding repeated start-stop cycles; over long run times it saves more electricity than a fixed-speed unit and holds temperature more steadily." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 冰箱 ───────────────────────────────
  "冰箱": {
    story:
      "To the Japanese, a refrigerator is not a storage cabinet but a freshness chamber that lets food live longer. Toshiba refrigerators write that obsession into every drawer: NaturePURE, PureBIO, and OriginPURE+ work together to deodorize and sterilize, keeping odors and bacteria outside the door so yesterday's fish and this morning's produce stay as crisp as the moment they went in. The mild-freezing fresh zone holds the temperature precisely at about -1°C, locking in the freshness of meat and fish without freezing them into hard ice, so they can go straight into the pot without thawing. From the cloud-white minimalism of JAPANDi built-in design to the katana-inspired metal handles, every line says the same thing — luxury is hiding refinement within the everyday.",
    heritage:
      "Toshiba built Japan's first electric refrigerator, and freshness preservation and deodorization are its century-old core strengths. Technologies such as NaturePURE, PureBIO, and OriginPURE+ are continuously refined by the Tokyo team to keep food flavor and nutrition as intact as possible.",
    technicalSpecs: [
      { label: "Type", value: "Multi-door / side-by-side / top-freezer / bottom-freezer / built-in / chest freezer — a full lineup" },
      { label: "Capacity", value: "Approx. 143L to 700L+, covering singles to large families and built-in kitchens" },
      { label: "Freshness technology", value: "NaturePURE, PureBIO / Dual PureBIO GO deodorization and sterilization (up to 99.99% sterilization rate)" },
      { label: "Mild-freeze fresh zone", value: "Approx. -1°C mild-freeze zone, locking in meat and fish freshness without thawing" },
      { label: "Compressor", value: "Origin Inverter compressor — energy-saving, quiet, with steadier temperatures" },
      { label: "Power supply", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Interior cleaning", desc: "Monthly, wipe the inner walls and drawers with a soft cloth, warm water, and a mild cleaner, and promptly remove expired food to keep the deodorizing system efficient." },
      { title: "Door-seal care", desc: "Regularly wipe the gasket clean and check that it seals tightly to prevent cold-air leakage and wasted electricity; do not let sauce residue corrode the seal." },
      { title: "Sensible storage", desc: "Separate raw and cooked food, leave gaps for cold-air circulation, let hot food cool before storing, and avoid blocking the air outlet to keep cooling even." },
      { title: "Regular deodorizing", desc: "Maintain the PureBIO / deodorizing module per the instructions to keep the interior fresh and free of mingled odors over the long term." },
    ],
    installation: [
      "Keep the unit upright throughout moving and installation to avoid excessive tilting that could damage the compressor",
      "Place it on a level, well-ventilated spot, leaving heat-dissipation clearance on both sides and the back",
      "Before powering on, check the voltage and reliable grounding; a dedicated outlet is recommended",
      "After installation/moving, let it stand for about 24 hours before powering on, to let the refrigerant and compressor oil settle",
      "Keep the invoice and warranty card to enjoy the warranty per factory policy",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "❄️", title: "Freshness lock-in", desc: "The approx. -1°C mild-freeze zone locks meat and fish freshness without thawing, while multi-directional airflow cools more evenly." },
      { icon: "🦠", title: "Deodorize & sterilize", desc: "PureBIO / NaturePURE work together to deodorize and sterilize at up to 99.99%, preventing mingled odors." },
      { icon: "🔇", title: "Quiet inverter", desc: "The Origin Inverter compressor is energy-saving and quiet, with smaller temperature fluctuations." },
      { icon: "🎨", title: "Japanese aesthetics", desc: "Designs like JAPANDi cloud-white built-in styling and katana handles make the fridge a kitchen centerpiece." },
      { icon: "🛡️", title: "Factory warranty", desc: "Genuine distribution + Hua Yue DDP warranty, with a long compressor warranty and full parts availability." },
    ],
    projectShowcase: [
      "Built-in JAPANDi refrigeration solutions for premium apartment and villa kitchens",
      "Capacity packages for hotel and serviced-apartment guest rooms and prep areas",
      "Residential projects requiring a unified premium Japanese freshness-preservation brand",
    ],
    faq: [
      { q: "Will the mild-freeze fresh zone freeze food solid?", a: "No. The approx. -1°C mild-freeze zone keeps meat and fish in a lightly frozen, freshness-locked state without forming hard ice, so they can be sliced and cooked right away, saving thawing time." },
      { q: "How much space do I need to reserve for a built-in refrigerator?", a: "Please follow the built-in dimensions on the corresponding model's detail page and reserve heat-dissipation clearance during cabinet design; Hua Yue can provide installation dimension drawings before ordering to help you verify." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 洗衣机 ───────────────────────────────
  "洗衣机": {
    story:
      "Toshiba washing machines believe that getting clothes clean is only the baseline — lasting fragrance and gentle care are what make a wash truly Japanese. Aroma+ technology precisely tunes water temperature and the soak time of the softener, leaving clothes softer and the scent longer-lasting, as if folding the smell of sun-dried laundry into every fiber. The Origin Inverter direct-drive motor is quiet yet powerful, with ultra-fine bubbles reaching deep into the fabric weave to carry away stubborn stains gently, without harming the garments. The T37 series, with its JAPANDi-style wood-grain panel and full-touch color screen, turns laundry into a quiet ritual — clean, fragrant, and a pleasure even to operate.",
    heritage:
      "Toshiba created Japan's first washing machine and has long cultivated motor and washing technology. The Origin Inverter direct drive and Aroma+ fragrance technology, defined by the Tokyo team, balance cleaning power, quietness, and garment care.",
    technicalSpecs: [
      { label: "Type", value: "Front-load drum / top-load pulsator, with multiple capacity tiers" },
      { label: "Motor", value: "Origin Inverter DC inverter (direct-drive) motor — quiet and durable" },
      { label: "Cleaning technology", value: "Aroma+ fragrance, ultra-fine bubble deep cleaning" },
      { label: "Controls", value: "Color touchscreen / full-touch panel with clear, easy-to-understand icons" },
      { label: "Energy efficiency", value: "Inverter energy saving, rated per Vietnam's energy-efficiency label" },
      { label: "Power supply", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Drum self-clean", desc: "Run a tub-clean / high-temperature self-clean cycle once a month and regularly wipe the inner door seal to prevent odors and mildew." },
      { title: "Filter cleaning", desc: "Regularly clean the drain-pump filter and water-inlet filter to keep drainage and water intake smooth and avoid error codes." },
      { title: "Proper dosing", desc: "Add detergent and softener per the markings, as overdosing leaves residue; after washing, open the door and air the drum to dry." },
      { title: "Leveling the feet", desc: "Keep the body level and lock the feet to reduce spin-cycle vibration and noise." },
    ],
    installation: [
      "Be sure to remove the transit bolts before installation, otherwise the spin cycle will vibrate violently and may cause damage",
      "Place it on a level floor and level it with the feet so all four corners bear weight evenly",
      "Connect the water-inlet/drain hoses and check that the connections are sealed and the drain height meets requirements",
      "Before powering on, check the voltage, dedicated circuit, and reliable grounding",
      "Run an empty cleaning cycle before first use, and keep the invoice and warranty card",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🌸", title: "Aroma+ fragrance", desc: "Optimizes water temperature and softener soak time for softer clothes and longer-lasting scent." },
      { icon: "🫧", title: "Deep cleaning", desc: "Ultra-fine bubbles penetrate the fabric weave to remove stubborn stains, cleaning without harming garments." },
      { icon: "🔇", title: "Quiet inverter", desc: "The Origin Inverter direct-drive motor is energy-saving, quiet, and stable during the spin cycle." },
      { icon: "🖐️", title: "Easy touch controls", desc: "Clear icons on the color touchscreen, with a pleasing wood-grain JAPANDi panel." },
      { icon: "🛡️", title: "Factory warranty", desc: "Genuine distribution + Hua Yue DDP warranty, with a long motor warranty and full parts availability." },
    ],
    projectShowcase: [
      "Family laundry-care solutions for apartments and townhouse residences",
      "Guest-room or shared laundry-area setups for hotels and serviced apartments",
      "Residential handover projects requiring a unified premium Japanese washing-machine brand",
    ],
    faq: [
      { q: "Will Aroma+ fragrance affect cleaning?", a: "No. Aroma+ optimizes water temperature and softener soak timing on top of normal washing, so cleaning power is uncompromised while clothes come out softer and stay fragrant longer." },
      { q: "How do I choose between a drum and a pulsator machine?", a: "If you prioritize garment care, fragrance, and quietness and can stand the unit upright on a balcony, choose a front-load drum; if you prioritize cleaning power, price, and handling large, heavily soiled items, choose a top-load pulsator. Hua Yue can advise based on your use case." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 洗衣机 · 干衣机 ───────────────────────────────
  "洗衣机 · 干衣机": {
    story:
      "In a rainy, humid climate, the Toshiba dryer gives your clothes a forever-sunny afternoon. Heat-pump technology uses the compressor to warm the airflow and dries gently at low-to-medium heat, neither scorching fibers nor shrinking and deforming cotton and linen, so finished laundry comes out fluffy, soft, and comfortable against the skin. Temperature and humidity sensors read the drum's state in real time and end drying at just the right moment, never over-consuming energy. Compared with the old method of simply blasting hot air, the heat pump recycles most of the heat, saving electricity in a way that puts your mind at ease. From now on, the clothesline retires, and only dryness and freshness remain in the closet.",
    heritage:
      "Toshiba extends its laundry-care system to high-efficiency heat-pump drying, continuing its expertise in motors and temperature control. The heat-pump low-temperature care and sensor-based precise dry control are tuned by the Tokyo team to balance garment care and energy saving.",
    technicalSpecs: [
      { label: "Type", value: "Heat-pump dryer / condenser dryer" },
      { label: "Drying principle", value: "The compressor heats the airflow for gentle low-to-medium-temperature drying, recycling the heat" },
      { label: "Smart dry control", value: "Temperature and humidity sensors optimize drying time and avoid over-drying" },
      { label: "Garment care", value: "Moderate temperature protects color and fibers, reducing shrinkage and wrinkles" },
      { label: "Energy efficiency", value: "High heat-pump efficiency with significant energy savings, rated per Vietnam's energy-efficiency label" },
      { label: "Power supply", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Lint cleaning", desc: "Clean the lint filter after every drying cycle and periodically clean the condenser/heat exchanger to maintain drying efficiency and safety." },
      { title: "Condensate handling", desc: "Promptly empty the condensate tank or keep the drain hose clear to prevent overflow and odors." },
      { title: "Proper loading", desc: "Load to the rated capacity and shake out the garments; overfilling lengthens drying time and dries unevenly." },
      { title: "Ventilated drying", desc: "Open the door to air it out after use to keep the drum dry, and dry it thoroughly before long periods of disuse." },
    ],
    installation: [
      "Place it on a level, well-ventilated spot, level the body, and bear weight evenly across all four corners",
      "For heat-pump models, reserve intake/exhaust clearance to ensure smooth heat dissipation and circulation",
      "Connect the drain hose per the model or confirm the condensate tank is in place",
      "Before powering on, check the voltage, dedicated circuit, and reliable grounding",
      "Keep the invoice and warranty card to enjoy the warranty per factory policy",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🌡️", title: "Heat-pump low temperature", desc: "Gentle low-to-medium-temperature drying protects color and fibers, caring for every garment." },
      { icon: "💡", title: "Sensor dry control", desc: "Temperature and humidity sensors end drying precisely, avoiding excess energy use and shrinkage." },
      { icon: "⚡", title: "Energy-saving", desc: "By recycling heat, it saves more electricity than traditional heater dryers and is more economical over long use." },
      { icon: "👕", title: "Fluffy and soft", desc: "Clothes come out fluffy and soft with fewer wrinkles, sparing you ironing and line-drying." },
      { icon: "🛡️", title: "Factory warranty", desc: "Genuine distribution + Hua Yue DDP warranty, with a long compressor warranty and full parts availability." },
    ],
    projectShowcase: [
      "Drying solutions for apartments and homes in humid, rainy regions",
      "Guest-room linen drying packages for hotels, homestays, and serviced apartments",
      "Complete laundry-care handover projects stacked with Toshiba washing machines",
    ],
    faq: [
      { q: "Why does a heat-pump dryer save more electricity?", a: "The heat pump recycles the heat produced during drying, so it doesn't need to continuously heat at high power like traditional heater dryers; for the same drying load, electricity use is noticeably lower and the temperature is gentler on garments." },
      { q: "Can the dryer be stacked on top of the washing machine?", a: "Most drum washers and dryers can be combined and installed with an original stacking kit to save space; please confirm based on the corresponding model's dimensions and accessories, and Hua Yue can assist with selection." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 厨房电器 ───────────────────────────────
  "厨房电器": {
    story:
      "Toshiba kitchen appliances bring the restraint and precision of the Japanese Takumi to the dining table. The Mirror Lake mirror-finish microwave is molded as a single black mirror surface, blending quietly into any kitchen style, heating evenly and operating crisply. The rice cooker is Toshiba's signature feat — vacuum soaking combined with high-pressure IH cooking, drawn from age-old Japanese rice-cooking secrets, lets every grain fully absorb water and swell evenly, then enzyme-activation technology awakens the natural sweetness deep in the grain's core, producing rice that is glossy, grain by grain, with a sweet aftertaste. In Toshiba's view, a good bowl of rice and a fine mirror surface are both a respect for the sense of measure in daily life.",
    heritage:
      "Toshiba created Japan's first microwave oven and holds deep heritage in heating and cooking control. The Mirror Lake mirror-finish craftsmanship and vacuum high-pressure IH rice-cooking technology continue the Takumi spirit, polished by the Tokyo team.",
    technicalSpecs: [
      { label: "Type", value: "Mirror-finish microwave oven / computerized rice cooker / vacuum high-pressure IH rice cooker" },
      { label: "Microwave oven", value: "Mirror Lake one-piece black mirror design, with computer-controlled temperature for even heating" },
      { label: "Rice cooker", value: "Vacuum soaking + high-pressure IH cooking + enzyme-activation sweetness technology" },
      { label: "Controls", value: "Digital computer control with multifunction preset menus" },
      { label: "Craftsmanship", value: "Takumi craftsmanship with a luxurious modern mirror finish" },
      { label: "Power supply", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Mirror cleaning", desc: "Wipe the microwave's mirror surface gently with a damp soft cloth and a mild cleaner, avoiding abrasives and hard objects that could scratch it; wipe grease from the interior promptly while it is still warm." },
      { title: "Inner-pot care", desc: "Wash and dry the rice cooker's inner pot and lid steam valve after each use, and do not scrub the non-stick coating with steel wool." },
      { title: "Seal inspection", desc: "Regularly check that the rice cooker's sealing ring and pressure valve are clean and properly seated to ensure high-pressure cooking performance and safety." },
      { title: "Moisture-free placement", desc: "Place it in a dry, ventilated spot away from direct steam and cooking fumes to keep the circuitry and touch panel dry." },
    ],
    installation: [
      "Place it on a level, heat-resistant, ventilated countertop, leaving heat-dissipation clearance around the microwave",
      "Do not run a non-built-in microwave inside a closed cabinet, to avoid poor heat dissipation",
      "Before powering on, check the voltage and reliable grounding; a dedicated outlet is recommended",
      "Wash and dry the inner pot and accessories before using the rice cooker for the first time",
      "Keep the invoice and warranty card to enjoy the warranty per factory policy",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🍚", title: "Time-honored rice cooking", desc: "Vacuum soaking + high-pressure IH + enzyme activation produce glossy, grain-by-grain rice with natural sweetness." },
      { icon: "🪞", title: "Mirror aesthetics", desc: "The Mirror Lake one-piece black mirror design brings Takumi craftsmanship into any kitchen." },
      { icon: "♨️", title: "Even heating", desc: "Computer-controlled microwave heating is even, with fast, crisp daily reheating and no cold spots." },
      { icon: "🎛️", title: "Multifunction presets", desc: "Digital one-touch menus make cooking rice, reheating, and defrosting effortless and easy to use." },
      { icon: "🛡️", title: "Factory warranty", desc: "Genuine distribution + Hua Yue DDP warranty, with full original parts and after-sales service." },
    ],
    projectShowcase: [
      "Mirror-finish small-appliance pairings for premium apartment and villa kitchens",
      "Prep and rice-cooking packages for hotel guest rooms and serviced apartments",
      "Residential and model-home handovers requiring a unified Japanese kitchen-appliance brand",
    ],
    faq: [
      { q: "Does a vacuum high-pressure IH rice cooker really cook better rice?", a: "Vacuum soaking lets the grains fully absorb water before cooking, high-pressure IH heats them more evenly so the core is fully cooked, and enzyme activation adds sweetness, producing rice that is glossier and fluffier with a sweet aftertaste — a clear difference from an ordinary rice cooker." },
      { q: "Does the mirror-finish microwave show fingerprints easily?", a: "The black mirror surface may show fingerprints under bright light; just wipe gently with a damp soft cloth and a mild cleaner, following the grain, to restore its shine, and avoid abrasive cleaners." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 厨房电器 · 洗碗机 ───────────────────────────────
  "厨房电器 · 洗碗机": {
    story:
      "The Toshiba Originclean dishwasher turns the Japanese obsession with cleanliness into the most dignified pause after a meal. Powerful water jets paired with multi-stage wash programs reach deep into the crevices of dishes to flush away grease and residue, attending even to the delicate patterns of Japanese tableware, leaving everything spotless after a high-temperature dry. It cares about more than just clean — it cares about measure: water- and energy-saving design makes every cycle thrifty, and quiet operation never disturbs the household calm. Freeing your hands from a greasy sink leaves you time for what truly matters — and that is the gentle gift Toshiba wants to give the kitchen.",
    heritage:
      "Toshiba enters built-in kitchen washing appliances with the Originclean series, continuing its technical expertise in cleaning and energy-saving control, with wash programs and energy-efficiency logic defined by the Tokyo team.",
    technicalSpecs: [
      { label: "Type", value: "Originclean dishwasher (built-in / freestanding depending on model)" },
      { label: "Wash programs", value: "Multi-stage programs and functions for different grease levels and tableware combinations" },
      { label: "Clean & dry", value: "Powerful water jets for deep cleaning + high-temperature drying that leaves dishes like new" },
      { label: "Energy saving", value: "Water- and energy-saving design, economical and practical over long use" },
      { label: "Durability", value: "Highly durable construction with quiet operation" },
      { label: "Power supply", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Filter cleaning", desc: "Regularly remove and rinse the bottom filter to clear residue, keeping the spray and drainage clear and cleaning uncompromised." },
      { title: "Spray-arm clearing", desc: "Regularly check the spray-arm nozzles for clogs and clear them with a fine needle if needed, ensuring even water coverage." },
      { title: "Consumable refills", desc: "Refill dishwasher salt and rinse aid as prompted to soften the water and enhance drying and dish-shine results." },
      { title: "Door-seal ventilation", desc: "Crack the door open to air it out after washing and wipe the door seal clean to prevent interior dampness and odors." },
    ],
    installation: [
      "For built-in models, verify the cabinet opening matches the built-in dimensions",
      "Connect the water inlet, drain, and power, and check that the connections are sealed and the drain height is compliant",
      "Before powering on, check the voltage, dedicated circuit, and reliable grounding",
      "Run an empty cycle and add consumables before first use",
      "Keep the invoice and warranty card to enjoy the warranty per factory policy",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "💦", title: "Deep cleaning", desc: "Powerful water jets and multi-stage programs flush grease and residue clean in one wash, leaving dishes bright." },
      { icon: "🌡️", title: "High-temperature drying", desc: "High-temperature washing and drying leave dishes like new — dry and free of water spots." },
      { icon: "💧", title: "Water- and energy-saving", desc: "Water- and energy-saving design uses less water than hand-washing and is more economical over the long term." },
      { icon: "🔇", title: "Quiet and durable", desc: "A highly durable construction with quiet operation keeps the household calm." },
      { icon: "🛡️", title: "Factory warranty", desc: "Genuine distribution + Hua Yue DDP warranty, with full original parts and after-sales service." },
    ],
    projectShowcase: [
      "Built-in dishwasher packages for apartment and villa kitchens",
      "Cleaning solutions for hotel and serviced-apartment back kitchens and prep areas",
      "Whole-kitchen handover projects requiring a unified Japanese kitchen-appliance brand",
    ],
    faq: [
      { q: "Does a dishwasher clean better than hand-washing?", a: "Yes. High-temperature, powerful water jets reach cleaning and sterilizing temperatures hard to maintain by hand, and paired with high-temperature drying, dishes come out cleaner and drier while overall using less water." },
      { q: "Do I need special dishwasher consumables?", a: "We recommend dishwasher-specific tablets/powder, dishwasher salt, and rinse aid; the salt softens the water to prevent scale, and the rinse aid improves drying and dish shine." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 净水 ───────────────────────────────
  "净水": {
    story:
      "In Japan, clean water is the starting point of cooking and the foundation of daily life. Toshiba water-purification equipment brings that refinement into every glass: multi-stage filtration screens out impurities and odors layer by layer, leaving a crisp, sweet taste, and some models even make pure ice directly so chilled drinks can be enjoyed with peace of mind. The electric water heater, in a luxurious modern form, integrates a multi-layer protective safety system that puts the user's safety first with every use. Whether it's the glass of water at the door or the warmth in the shower, Toshiba safeguards the home's cleanliness and warmth with Japanese attention to detail.",
    heritage:
      "Toshiba brings home water purification and hot water into its lifestyle-appliance portfolio, continuing its expertise in water treatment and electrical safety. The multi-layer protection and purification solutions are overseen by the Tokyo team and designed to Japanese quality standards.",
    technicalSpecs: [
      { label: "Type", value: "Water purifier / ice-making purifier / electric water heater" },
      { label: "Purification", value: "Multi-stage filtration removes impurities and odors for a crisp, sweet taste" },
      { label: "Ice making", value: "Some models integrate ice making, providing pure-grade ice cubes" },
      { label: "Water-heater safety", value: "Multi-layer protective safety system, built to stringent safety standards" },
      { label: "Design", value: "Luxurious modern styling that blends into kitchen and bathroom spaces" },
      { label: "Power supply", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Filter replacement", desc: "Replace the filter cartridge promptly per the usage cycle or water-quality prompt to maintain purification performance and water taste." },
      { title: "Pipeline cleaning", desc: "Regularly clean/flush the water outlet and waterway per the instructions to avoid secondary contamination and odors." },
      { title: "Water-heater descaling", desc: "Regularly inspect and remove scale from the electric water heater's tank and check the magnesium anode to extend its life and maintain heating efficiency." },
      { title: "Safety inspection", desc: "Regularly check the electric water heater's leakage protection and grounding; if any abnormality is found, stop use immediately and contact after-sales service." },
    ],
    installation: [
      "Have a professional install per the instructions, connecting compliant inlet/outlet and drainage piping",
      "The electric water heater must be reliably grounded and fitted with leakage protection, with a pressure-relief valve on the inlet side",
      "Before powering on / supplying water, check that the connection seals, water pressure, and voltage are compliant",
      "After installing the water purifier, flush the filter until the water runs clear before normal use",
      "Keep the invoice and warranty card to enjoy the warranty per factory policy",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "💧", title: "Multi-stage purification", desc: "Layer-by-layer filtration removes impurities and odors for crisp, sweet, worry-free water." },
      { icon: "🧊", title: "Pure ice making", desc: "Some models integrate ice making, so chilled drinks use pure-grade ice cubes too." },
      { icon: "🛡️", title: "Multi-layer protection", desc: "The electric water heater's multi-layer safety system is built to stringent safety standards." },
      { icon: "✨", title: "Luxurious design", desc: "Modern, refined styling blends seamlessly into kitchen and bathroom spaces." },
      { icon: "🔧", title: "Factory warranty", desc: "Genuine distribution + Hua Yue DDP warranty, with filters and original parts in stock." },
    ],
    projectShowcase: [
      "Kitchen direct-drinking and bathroom hot-water packages for apartments and villas",
      "Guest-room water-purification and hot-water solutions for hotels and serviced apartments",
      "Residential handover projects requiring a unified Japanese water-purification/hot-water brand",
    ],
    faq: [
      { q: "How often should the water purifier's filter be replaced?", a: "It depends on the inlet water quality and usage volume; generally replace per the rated throughput or usage cycle marked for the model. Replace it early if the water flow slows or the taste worsens, and Hua Yue can help supply matching original filters." },
      { q: "What safety requirements apply to electric water heater installation?", a: "It must be reliably grounded, fitted with a leakage-protection breaker, and have a pressure-relief (safety) valve on the inlet side; it should be installed by a professional and inspected regularly to ensure electrical and water safety." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 小家电 · 风扇 ───────────────────────────────
  "小家电·风扇": {
    story:
      "What Toshiba fans pursue is not a fierce gale but a breeze as just-right as nature's own. The air-circulator fan, with its unique natural-wind simulation technology, delivers a soft, cool, unbroken airflow that gets the whole room's air quietly moving, banishing localized stuffiness and stickiness. The Turbo series' fan blades, inspired by jet aircraft, work with the AirBoost spiral guide vane to send a powerful airflow up to about 12 meters, cooling even large spaces evenly. From floor-standing to wall-mounted, from bedroom to kitchen, Toshiba tucks Japanese refinement into every blade — quiet, energy-saving, and bringing the composure of an entire summer.",
    heritage:
      "Toshiba excels in motor and airflow technology and extends it to home fans, with designs like natural-wind simulation and AirBoost spiral airflow guidance tuned by the Japanese team to balance comfortable airflow with energy efficiency.",
    technicalSpecs: [
      { label: "Type", value: "Floor-standing / wall-mounted fan, air-circulator fan, turbo fan" },
      { label: "Airflow technology", value: "Natural-wind simulation + AirBoost spiral airflow guidance (Turbo series reaches about 12 meters)" },
      { label: "Motor", value: "High-efficiency motor, with high-power strong airflow on some models" },
      { label: "Speed settings", value: "Multiple adjustable speeds, including smart/natural-wind modes" },
      { label: "Blades", value: "Multiple blades (e.g., 5) optimize airflow and quietness" },
      { label: "Power supply", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Blade dusting", desc: "Regularly remove the guard and blades and wipe off accumulated dust with a soft cloth to maintain airflow and clean air delivery." },
      { title: "Motor care", desc: "Keep the motor's air intake clear, don't let dust clog heat dissipation, and have it serviced promptly if it makes abnormal noises during operation." },
      { title: "Dry storage", desc: "Clean and dry it before seasonal storage and keep it in a dry place to guard against moisture and dust." },
      { title: "Cable inspection", desc: "Regularly check the power cord and plug for damage to ensure electrical safety." },
    ],
    installation: [
      "Assemble the base and pole of a floor-standing fan per the instructions, ensuring it is stable and won't tip over",
      "Mount a wall fan on a load-bearing wall, tighten the screws, and reserve clearance for oscillation",
      "Before powering on, check the voltage and that the plug makes good contact",
      "Place/install it on a level, ventilated spot, away from moisture and obstructions like curtains",
      "Keep the invoice and warranty card to enjoy the warranty per factory policy",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🍃", title: "Natural gentle wind", desc: "Natural-wind simulation technology delivers a soft, cool airflow that stays fresh and non-irritating even after long use." },
      { icon: "🌪️", title: "Powerful reach", desc: "Turbo + AirBoost spiral airflow guidance reaches about 12 meters, cooling even large spaces evenly." },
      { icon: "🎚️", title: "Multiple settings", desc: "Multiple speeds and smart/natural-wind modes let you tune comfortable airflow as needed." },
      { icon: "🔇", title: "Quiet and energy-saving", desc: "The high-efficiency motor runs quietly with low energy use, comfortable for all-night use." },
      { icon: "🛡️", title: "Factory warranty", desc: "Genuine distribution + Hua Yue DDP warranty, with full original parts and after-sales service." },
    ],
    projectShowcase: [
      "Air-circulation and cooling solutions for apartment bedrooms and living rooms",
      "Spaces requiring directed airflow, such as kitchens and dining rooms",
      "Unified Japanese fan deployments for hotels, offices, and retail stores",
    ],
    faq: [
      { q: "What's the difference between an air-circulator fan and an ordinary fan?", a: "An air-circulator fan uses a concentrated, column-like airflow to push the whole room's air into circulation, speeding up air exchange and temperature evening — better suited to pairing with an air conditioner to improve perceived comfort; an ordinary fan focuses on a localized cool sensation blown directly at people." },
      { q: "Is a turbo fan very loud?", a: "While delivering a powerful reach of about 12 meters, the Turbo series optimizes the motor and blades for quietness, running quietly on low settings; for ultimate airflow, the high settings will be correspondingly louder, so you can choose the setting to suit your needs." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 小家电 · 吸尘器 ───────────────────────────────
  "小家电 · 吸尘器": {
    story:
      "Toshiba vacuum cleaners distill the Japanese devotion to cleanliness into a light, handy everyday tool. A variety of brush heads and functions suit different floors and corners, while powerful suction lifts away the dust and hair in floor crevices, under sofas, and in corners, leaving the unseen dirt at home nowhere to hide. The body is light and operation is smooth, so turning, cornering, and going up and down stairs are all effortless, making cleaning easy, quick, and crisp. Toshiba believes true luxury lies not in the noise but in the spotless quiet — hand the hassle to the machine, and give the tidiness back to life.",
    heritage:
      "Toshiba applies its motor and airflow technology to floor-cleaning appliances, with practicality, durability, and ease of use at the heart of the design, continuing Japanese quality standards.",
    technicalSpecs: [
      { label: "Type", value: "Canister / cylinder home vacuum cleaner" },
      { label: "Suction", value: "Powerful suction that clears dust and hair from floor crevices and corners" },
      { label: "Brush heads & accessories", value: "Various brush heads and functions to suit different floors and scenarios" },
      { label: "Controls", value: "Lightweight body, smooth movement, effortless and efficient cleaning" },
      { label: "Maintenance", value: "Easy-to-remove, easy-to-clean dust cup/collection for convenient use" },
      { label: "Power supply", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Dust disposal", desc: "Empty the dust cup / replace the dust bag promptly to avoid a full bin reducing suction and motor heat dissipation." },
      { title: "Filter maintenance", desc: "Regularly clean or replace the filter to maintain suction and clean exhaust and prevent secondary dust." },
      { title: "Brush-head care", desc: "Remove hair and threads tangled on the roller brush to ensure cleaning performance and smooth rolling." },
      { title: "Cable storage", desc: "Neatly store the power cord after use to avoid damage from pulling and crushing." },
    ],
    installation: [
      "Assemble the body, hose, and required brush heads per the instructions",
      "Before use, check that the filter and dust-collection parts are properly installed",
      "Before powering on, check the voltage and that the plug makes good contact",
      "Choose the corresponding brush head based on floor material to avoid hard brushes scratching the floor",
      "Keep the invoice and warranty card to enjoy the warranty per factory policy",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🌀", title: "Powerful suction", desc: "Reaches deep into crevices and corners, lifting away dust and hair in one pass for more thorough cleaning." },
      { icon: "🧹", title: "Multiple brush heads", desc: "Various brush heads and functions suit different floors and scenarios for more complete cleaning." },
      { icon: "🪶", title: "Light and effortless", desc: "A lightweight body that moves smoothly, making cornering and stair-climbing easy and tireless." },
      { icon: "♻️", title: "Easy to maintain", desc: "The dust cup/filter is easy to remove and clean, making daily upkeep simple and worry-free." },
      { icon: "🛡️", title: "Factory warranty", desc: "Genuine distribution + Hua Yue DDP warranty, with full original parts and after-sales service." },
    ],
    projectShowcase: [
      "Everyday floor-cleaning solutions for apartments and homes",
      "Housekeeping setups for hotel and homestay guest rooms",
      "Residential and commercial projects requiring a unified Japanese small-appliance brand",
    ],
    faq: [
      { q: "Which floors is the vacuum cleaner suitable for?", a: "By switching the corresponding brush head, it suits various floors such as tile, wood flooring, and carpet; for hard surfaces like wood flooring, a soft-bristle / brush-bar floor head is recommended to avoid scratching." },
      { q: "How often should the filter be cleaned?", a: "We recommend regularly cleaning or replacing the filter based on usage frequency; not cleaning it for a long time will reduce suction and worsen exhaust. Keeping the filter clean maintains suction and reduces secondary dust." },
      ...BRAND_FAQ_TAIL,
    ],
  },
};

/**
 * Helper: get Toshiba product-line metadata by seriesOriginal.
 * It matches exactly first; on a miss, it falls back to the first segment
 * (e.g., "厨房电器 · 洗碗机" falls back to "厨房电器"), and on a continued miss,
 * it falls back to "冰箱" as the brand's general story.
 */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  const key = seriesOriginal.trim();
  if (TOSHIBA_SERIES_META[key]) return TOSHIBA_SERIES_META[key];
  const head = key.split(/[·\/\s]/)[0].trim();
  return TOSHIBA_SERIES_META[head] || TOSHIBA_SERIES_META["冰箱"];
}
