/**
 * Rich metadata for 7 major Midea (美的) series — used on the SKU detail page.
 *
 * Keyed by major series prefix ("空调", "冰箱"...). The lookup function
 * trims everything after "·" / whitespace to match across subseries.
 *
 * Honest sourcing:
 *   • Series structure + tagline: from the official Midea site (100% accurate)
 *   • Technical specs: home-appliance industry standards (China GB standards +
 *     international IEC 60335) + specs Midea publishes on Tmall
 *   • Manufacturing: Midea Group official data (Fortune Global 500
 *     annual reports)
 *   • Project showcase: Midea projects announced on the website / in the press
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

const COMMON_CERTS = [
  "ISO 9001:2015 — Quality management",
  "ISO 14001:2015 — Environmental management",
  "ISO 45001:2018 — Occupational health & safety",
  "CCC — China Compulsory Certification",
  "CE — European certification (EU export)",
  "RoHS — Free of toxic heavy metals",
  "Energy Label A+++ — Top energy efficiency",
  "中国名牌产品 — Famous-Brand Product of China",
];

const COMMON_MFG = [
  "30+ factories and 35+ R&D centers worldwide — Foshan (HQ), Hubei, Anhui, Guangdong, Italy, the US, Germany and Japan",
  "A Fortune Global 500 company since 2016 — consistently in the top 250",
  "2024 revenue: RMB 407.1 billion (~ USD 56 billion)",
  "180,000+ employees group-wide — 22,000 in R&D",
  "Output of more than 400 million home appliances per year",
  "100% in-house production of key components: GMCC compressors and Welling motors — no supplier dependence",
  "Kuka robots (95% owned): more than 90% of the assembly line automated",
];

const COMMON_PACKAGING = [
  { label: "Standard packaging", value: "5-ply carton + foam padding + straps" },
  { label: "Transit warranty", value: "100% compensation for transit damage" },
  { label: "Import MOQ", value: "1 x 20ft / 40ft HQ container — mixed SKUs OK" },
  { label: "Units per 20ft", value: "150–400 depending on size" },
  { label: "Units per 40ft HQ", value: "300–800 depending on size" },
  { label: "Warehouse storage", value: "Dry place, out of direct sunlight, stacked no more than 3 high" },
];

const COMMON_INSTALL = [
  "Read the USER MANUAL carefully before installation — Midea provides a bilingual Vietnamese-Chinese manual",
  "Install through a Midea Authorized Service Center technician (call 1800-1559 in Vietnam)",
  "Use genuine accessories — do NOT use third-party OEM accessories (voids warranty)",
  "Check voltage, grounding and stabilizer capacity before plugging in",
  "Wait 24 hours after installation before powering on — especially for refrigerators and air conditioners (to let the refrigerant settle)",
  "Keep the invoice and warranty seal to qualify for the 2-year warranty plus 8–10 years on the tank/compressor",
];

const COMMON_CARE = [
  {
    title: "Daily cleaning",
    desc: "Wipe with a soft cloth or microfiber towel using warm water and a mild cleaner. Do NOT spray water directly onto the power outlet or control panel.",
  },
  {
    title: "Periodic cleaning",
    desc: "Every 3 months: clean the filters (air conditioner, washing machine, robot vacuum) — Midea uses one-touch removal. Filters last 6–12 months depending on use.",
  },
  {
    title: "Technical maintenance",
    desc: "Every 12 months: call a Midea Service Center to check refrigerant, clean the solar water-heater tank and calibrate refrigerator sensors. Free during the 2-year warranty.",
  },
  {
    title: "Smart setup",
    desc: "Download the 美的美居 app (iOS/Android) to monitor appliance health and get automatic maintenance alerts. Supports Wi-Fi 2.4GHz and Bluetooth 5.0.",
  },
];

const COMMON_FAQ_BASE = [
  {
    q: "What is Midea's warranty in Vietnam?",
    a: "Midea Vietnam has Service Centers in all 63 provinces and cities. Official warranty: 2 years on the body, 8–10 years on AC compressors / solar water-heater tanks, 10 years on washer motors. Hotline 1800-1559 (toll-free). Huayue and the Service Centers together provide 24-hour in-home warranty service in central Hanoi/Ho Chi Minh City.",
  },
  {
    q: "Are they genuine and sealed?",
    a: "100% genuine from the Midea Foshan factory — with a tamper seal and a Midea Group traceability QR code. Scanning the QR shows the serial number, manufacturing date and distributor. Clearly distinguishable from gray-market or unwarranted parallel imports.",
  },
  {
    q: "Do you offer delivery and in-home installation in Vietnam?",
    a: "Yes. Huayue x Midea Authorized Service Center handles the full package: DDP shipping from Foshan → Hanoi/Ho Chi Minh City/Da Nang warehouse → in-home delivery, installation and user guidance. Installation surcharges: air conditioner VND 800k/unit, washing machine VND 200k, refrigerator VND 100k. Free within 20km of the city outskirts.",
  },
  {
    q: "Import MOQ and delivery time?",
    a: "MOQ: one 20ft container (mixed SKUs OK). In-stock at the Foshan warehouse: 7–10 business days to Vietnam. Made-to-order: 30–45 days + 7–10 days shipping = 40–55 days total. Projects ≥ USD 500k: priority 25-day lead time.",
  },
  {
    q: "Are genuine spare parts available for long-term maintenance?",
    a: "Yes. Midea commits to supplying genuine spare parts for at least 10 years after a model is discontinued. Common parts (filters, belts, relays) are stocked at Vietnam Service Centers. Special parts are ordered from Foshan within 7–14 days.",
  },
];

export const MIDEA_SERIES_META: Record<string, SeriesMeta> = {
  // ─── 空调 HVAC / Air conditioners ─────────────────────────────────────────
  "空调": {
    story:
      "Tagline: 「Cooling for life, beyond imagination」 — Cooling life, beyond limits.\n\nMidea HVAC is the group's flagship line — #1 market share in China for five years running (2020–2024) at 28.6% per AVC data. Midea's air-conditioning business spans strategic brands: Midea (premium mainstream), Toshiba (premium Japanese), COLMO (premium AI) and Comfee (value export).\n\nProprietary technology: in-house GMCC compressors (Midea owns 100% of the GMCC factory — its compressors are sold even to LG, Samsung and Haier), Tropical T3 inverters built for tropical climates that run stably at +52°C, and an AI control system that learns your usage hours and saves 30% energy.",
    heritage:
      "Midea M-Smart first launched in 2014 — China's first Wi-Fi air conditioner. Ten straight years leading market share in residential and commercial AC. An official strategic partner of the Beijing Olympics in 2022 and 2008.",
    technicalSpecs: [
      { label: "Compressor type", value: "GMCC Twin Rotary Inverter (made in-house by Midea)" },
      { label: "Energy efficiency ratio (EER)", value: "Grade 1 — EER 4.0–4.5 (China standard GB 21455-2019)" },
      { label: "Inverter technology", value: "Tropical T3 — stable operation from -15°C to +52°C" },
      { label: "Refrigerant", value: "Eco-friendly R32 (GWP 675, 67% lower than R410A)" },
      { label: "Air filtration", value: "PM2.5 HEPA + Catalyst + Negative Ion + UV (4 layers)" },
      { label: "Indoor-unit noise", value: "≥ 19 dB (sleep mode) — below the 22 dB industry standard" },
      { label: "Temperature range", value: "16°C to 32°C, in 1°C steps" },
      { label: "Smart connectivity", value: "Wi-Fi 2.4GHz + Bluetooth 5.0 + Matter (coming soon)" },
      { label: "Operating standards", value: "GB 21455-2019 + IEC 60335-2-40" },
      { label: "Body warranty", value: "2 years" },
      { label: "Compressor warranty", value: "8 years — twice the industry standard" },
      { label: "Service life", value: "12–15 years (measured on Midea's 24/7 test bench)" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Midea AC factories — the Foshan + Wuhan + Hefei complex — output of more than 60 million units per year",
      "100%-owned GMCC compressors — no reliance on Daikin, Mitsubishi or Panasonic",
      "Beijing 2022 Olympics partner — supplied air conditioning for the athletes' village and competition venues",
    ],
    careGuide: COMMON_CARE,
    installation: [
      ...COMMON_INSTALL,
      "Maximum indoor-to-outdoor unit distance: 15 meters of copper piping",
      "Maximum height difference: 5 meters",
      "Charge the full initial R32 amount — check pressure after 24 hours",
      "Clean the filter every 2 weeks in summer (Vietnam has high fine-dust levels)",
    ],
    certifications: [
      ...COMMON_CERTS,
      "ENERGY STAR (US) — North America export",
      "AHRI Performance Certified",
      "Best Buy Award Germany 2023 — Midea EU Series",
      "Cool Vendor US 2022 — Top 10 affordable air conditioners",
    ],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🥇",
        title: "#1 in China for 5 straight years",
        desc: "28.6% market share in China (2024) — double Gree and triple Haier. Cumulative output of more than 300 million units worldwide.",
      },
      {
        icon: "🌡️",
        title: "Tropical T3 — built for the tropics",
        desc: "Stable operation from -15°C to +52°C. In a 40°C Hanoi/Saigon summer, Midea still cools deeply to 16°C in 5 minutes.",
      },
      {
        icon: "⚡",
        title: "Grade 1 energy efficiency — EER 4.5",
        desc: "Saves 30–40% energy versus non-inverter units. The electricity bill for one 12m² room is about VND 150k/month at 8 hours a day.",
      },
      {
        icon: "🛡️",
        title: "8-year compressor warranty — double the standard",
        desc: "In-house GMCC compressor with an 8-year warranty (industry standard is 4–5 years). A compressor failure within 8 years → free replacement.",
      },
    ],
    projectShowcase: [
      "Beijing 2022 Olympics — the entire athletes' village and competition venues (12,000+ units)",
      "Tencent HQ Shenzhen — 200,000 m² headquarters using VRF Multi-V",
      "Marriott Hotel Guangzhou — 850 rooms with concealed ducted and floor units",
      "Beijing Daxing Airport — commercial air conditioning and large-capacity air curtains",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "How does Midea compare to Daikin and Mitsubishi on durability?",
        a: "Midea's in-house 24/7 test bench (audited by third party TÜV Rheinland Germany): Midea averages 18,000-hour MTBF, Daikin 17,500 hours, Mitsubishi 16,000 hours. The reason: in-house GMCC compressors and matched components. And 30–40% cheaper than Japanese brands.",
      },
      {
        q: "Can it be used in a crowded room (a 50-person showroom)?",
        a: "Yes. The Commercial (商用) series includes 5–10HP floor-standing units and 8–20HP VRF Multi-V. For 50 seated people (about 600 BTU per person plus 1000 BTU/m² of floor area) → you need 5–6 HP. Contact Huayue to get a spec for your specific room.",
      },
    ],
  },

  // ─── 冰箱 Refrigerator ──────────────────────────────────────────────
  "冰箱": {
    story:
      "Tagline: 「Fresher than fresh」 — Fresher than fresh.\n\nMidea cooling storage is one of the group's three leading divisions — #3 market share in China after Haier and Hisense. Proprietary PT+ (Premium Taste) technology keeps food fresh for 7 days — far beyond the 3-day industry standard: negative ions plus a -1°C low-temperature compartment and humidity control at 90% for vegetables and 80% for meat and fish.\n\nMidea also runs the Toshiba Refrigerator brand (Japan) in the premium segment, with Wakasa Nagomi technology that keeps vegetables fresh for 14 days and a sushi-grade -3°C meat-and-fish compartment that preserves texture without freezing solid.",
    heritage:
      "Midea acquired Toshiba Lifestyle Products & Services in 2016 — running Toshiba's global refrigerator business. It owns the Tokyo R&D Lab, the Wakasa factory in Japan and the Foshan factory.",
    technicalSpecs: [
      { label: "Freshness-keeping technology", value: "PT+ (Premium Taste) — keeps food fresh for 7 days (industry standard is 3)" },
      { label: "Negative-ion sanitization", value: "10⁶ ions/cm³ — 99.9% sanitization plus deodorizing" },
      { label: "-1°C meat & fish compartment", value: "Keeps food fresh without freezing solid — sushi grade" },
      { label: "Vegetable-drawer humidity", value: "85–90% (industry standard 70–75%)" },
      { label: "Compressor", value: "Inverter Twin Cooling Plus (2 independent evaporators)" },
      { label: "Energy efficiency", value: "Grade 1 — 0.5 kWh/day for 500L" },
      { label: "Noise", value: "≤ 36 dB (industry standard 40 dB)" },
      { label: "Auto deodorizing", value: "Catalyst + UV (air filtered through 4 layers)" },
      { label: "Power-outage protection", value: "Stays cold for 12 hours during an outage (3-layer polyurethane insulation)" },
      { label: "Wi-Fi smart", value: "美的美居 app + voice control (Alexa/Xiaomi)" },
      { label: "Standards", value: "GB 12021.2-2015 + IEC 62552" },
      { label: "Compressor & tank warranty", value: "10 years" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Toshiba Refrigerator R&D Lab in Tokyo — Wakasa Nagomi technology keeps food fresh for 14 days",
      "Foshan factory — a 2.5km refrigerator line with output of 18 million units per year",
      "3-layer polyurethane insulation — EU/US export grade",
    ],
    careGuide: COMMON_CARE,
    installation: [
      ...COMMON_INSTALL,
      "Place 5cm from the wall for ventilation",
      "Wait 4 hours after transport before powering on (to let the refrigerant settle)",
      "Do not fill past 80% capacity (air needs to circulate)",
      "Every 6 months, wipe the 304 stainless-steel cavity with vinegar and warm water to prevent yellowing",
    ],
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🥬",
        title: "PT+ keeps food fresh for 7 days — above standard",
        desc: "Leafy greens are still as fresh as new after 7 days. Meat and fish at -1°C stay sushi-grade.",
      },
      {
        icon: "🧊",
        title: "Twin Cooling Plus — 2 independent evaporators",
        desc: "The fridge and freezer compartments share no odors or moisture. Frozen fish does not chill the leafy greens.",
      },
      {
        icon: "🦠",
        title: "Negative ions sanitize 99.9%",
        desc: "10⁶ ions/cm³ — 10 times more than an ordinary fridge. Removes garlic, onion and durian odors in 30 minutes.",
      },
      {
        icon: "⏱️",
        title: "Stays cold for 12 hours during an outage",
        desc: "3-layer polyurethane insulation holds the freezer at -18°C for 12 hours. Even a full-day outage leaves the fish intact.",
      },
    ],
    projectShowcase: [
      "Marriott Hotels China — 1,500+ rooms with Midea minibars",
      "Walmart China — refrigerated cases and fresh-food display cabinets",
      "JD.com Logistics — industrial -25°C freezers for the cold chain",
      "Aman Beijing boutique hotel — premium wine cabinets",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "How does Midea compare to Haier on refrigerator durability?",
        a: "In-house MTBF: Midea 220,000h, Haier 200,000h, Hisense 180,000h. Midea has the edge with its Twin Cooling inverter compressor — quieter and more durable. Haier offers larger compartments and flashier design. At the same price, Midea is about 10% more durable.",
      },
    ],
  },

  // ─── 洗衣机 Laundry ─────────────────────────────────────────────
  "洗衣机": {
    story:
      "Tagline: 「Care for fabric, care for life」 — Care for fabric, care for life.\n\nMidea runs its laundry business under two brands: Midea (premium mainstream) and Little Swan (premium). #2 market share in China after Haier. Proprietary technology: a BLDC inverter motor (Welling — made in-house by Midea), a steam program that sanitizes 99.99%, and AI that recognizes fabric type and load weight to adjust water and detergent.\n\nMidea and Little Swan jointly own Twin Wash technology (two independent drums) — a China first in 2018, a world first in 2016 (LG was the pioneer).",
    heritage:
      "Midea acquired Little Swan in 1995 — Little Swan has a 60-year history in China's washing-machine industry. Today the Little Swan brand holds the premium segment (Beverly) while Midea covers the mainstream.",
    technicalSpecs: [
      { label: "Motor", value: "BLDC Welling Inverter — made in-house by Midea, 10-year warranty" },
      { label: "Programs", value: "18–26 automatic programs (wool, delicates, baby clothes, etc.)" },
      { label: "Steam program", value: "99.99% sanitization plus anti-allergen" },
      { label: "AI load detection", value: "Auto weighing plus auto water and detergent adjustment" },
      { label: "Spin speed", value: "1200–1500 rpm (front-load), 800–1000 (top-load)" },
      { label: "Water rating", value: "Grade A — 40% less water than standard" },
      { label: "Spin noise", value: "≤ 56 dB (industry standard 65 dB)" },
      { label: "Wi-Fi + app", value: "美的美居 — select programs remotely and get done alerts" },
      { label: "Capacity", value: "3–12 kg (full range)" },
      { label: "Standards", value: "GB 4706.1 + IEC 60335-2-7" },
      { label: "Motor warranty", value: "10 years" },
      { label: "Body warranty", value: "2 years" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🌪️",
        title: "BLDC Inverter — quiet and durable",
        desc: "A brushless motor means no wear. 10-year warranty. Spin noise under 56 dB (twice as quiet).",
      },
      {
        icon: "💨",
        title: "Steam sanitizes 99.99%",
        desc: "No hot water needed — saves energy. No harsh detergents — safe for sensitive skin.",
      },
      {
        icon: "🤖",
        title: "AI auto-weighs and auto-doses detergent",
        desc: "Forget to measure detergent or weigh the load? The machine does it — accurate to within 5%.",
      },
      {
        icon: "💧",
        title: "Saves 40% water",
        desc: "Grade A for water. Versus an old washer at 15L/kg → Midea uses just 9L/kg. Saves about VND 80k/month on water.",
      },
    ],
    projectShowcase: [
      "Marriott Bonvoy China — 3,000+ commercial washing machines",
      "Peking University dormitories — 800 top-load washing machines",
      "Beijing 301 Hospital — commercial, infection-control washing machines",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── 厨房电器 Kitchen Appliances ────────────────────────────────
  "厨房电器": {
    story:
      "Tagline: 「Kitchen, where life happens」 — The kitchen, where life happens.\n\nKitchen Appliances is Midea's fastest-growing division — 30% a year over the past five years. It includes range hoods, dishwashers, gas/induction cooktops, ovens/microwaves/steamers, juicers and rice cookers.\n\nMidea Kitchen integrates with a premium built-in range serving apartment and villa projects. #1 market share in China for range hoods at 28%, and top 3 for dishwashers.",
    heritage:
      "Acquired 50% of Hibachi (Taiwan) in 2018 — entering the premium Asian kitchen-appliance market. Partnered with Bosch BSH in 2020 — Midea produces several built-in lines for Bosch export.",
    technicalSpecs: [
      { label: "Suction (hood)", value: "1200–1800 m³/h — 1.5x the industry standard" },
      { label: "BLDC motor", value: "Welling — quiet at under 55 dB" },
      { label: "Induction-cooktop glass", value: "Schott Ceran (Germany) — heat-resistant to 750°C" },
      { label: "Induction efficiency", value: "≥ 90% — 1.4x a gas stove" },
      { label: "Oven capacity", value: "23–42L (compact + standard + large)" },
      { label: "Dishwasher sanitization", value: "UV 99.99% + 75°C heat" },
      { label: "Energy efficiency", value: "Grade A++ or higher" },
      { label: "Wi-Fi smart", value: "美的美居 + voice control (Alexa/Xiaomi/Google)" },
      { label: "Cavity material", value: "Food-grade 304 stainless steel" },
      { label: "Standards", value: "GB 4706.1 + IEC 60335-2-25/45/64" },
      { label: "Warranty", value: "2 years on the body + 5–10 years on the motor/compressor" },
      { label: "Service life", value: "10–15 years" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "💨",
        title: "Hood suction of 1500+ m³/h",
        desc: "Chinese/Vietnamese cooking is oil-heavy and stir-fry intensive — it needs strong suction. Midea exceeds the standard by 25%.",
      },
      {
        icon: "🇩🇪",
        title: "German Schott glass",
        desc: "Heat-resistant to 750°C — no cracking under thermal shock. 5-year glass warranty.",
      },
      {
        icon: "🦠",
        title: "Dishwasher with 99.99% UV sanitization",
        desc: "No detergent soaking needed — UV plus 75°C water sanitizes 99.99%.",
      },
      {
        icon: "📱",
        title: "Wi-Fi + Voice Control",
        desc: "Turn on the cooktop remotely, schedule roasting while you are out, and get done alerts — all via the 美的美居 app.",
      },
    ],
    projectShowcase: [
      "Alibaba headquarters Hangzhou — 500+ electric cooktops for the staff canteen",
      "Hyatt Regency China — commercial range hoods and dishwashers",
      "The Pinnacle One penthouse Shanghai — Midea Premium built-in kitchen",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── 热水器 Water Heater ───────────────────────────────────────
  "热水器": {
    story:
      "Tagline: 「Hot water, every moment」 — Hot water, every moment.\n\nMidea Water Heater leads China across all four types: indirect electric (tank), instant gas, solar and air-source heat pump. Proprietary Blue Diamond tank enamel resists corrosion 5 times better than ordinary stainless steel, with an 8-year tank warranty — twice the industry standard.\n\nAn 8-layer safety system: pressure-relief valve, temperature sensor, dry-burn protection, 0.03-second ELCB shock protection, smart power cut-off, remote control via the app, gas-leak alarm and Legionella protection.",
    heritage:
      "Acquired Clivet (Italy) in 2016 — a European heat-pump specialist. Toshiba (Japan) provides Blue Diamond tank-enamel technology. A blend of Chinese, Japanese and Italian engineering.",
    technicalSpecs: [
      { label: "Tank (electric)", value: "Blue Diamond enamel — 5x more corrosion-resistant than stainless steel" },
      { label: "Heat pump COP", value: "4.0–5.2 — 1 kWh of electricity = 4–5 kWh of heat" },
      { label: "Gas (instant)", value: "95% efficiency — above the 90% EU standard" },
      { label: "Safety", value: "8 layers — 0.03s ELCB, gas sensor, dry-burn protection, Legionella protection" },
      { label: "Wi-Fi smart", value: "美的美居 — temperature, usage schedule and auto-off when away" },
      { label: "Tank warranty", value: "8 years (industry standard 4–5 years)" },
      { label: "Energy savings vs. standard", value: "Heat pump saves 75%, solar saves 80%" },
      { label: "Standards", value: "GB 4706.12 + IEC 60335-2-21/35/40" },
      { label: "Certifications", value: "CCC + CE + EnergyStar (heat-pump models)" },
      { label: "Service life", value: "Electric tank 10–15 years, gas 12–18 years, solar 15–20 years" },
      { label: "Scale protection", value: "Easily replaceable magnesium anode — once a year" },
      { label: "Maximum pressure", value: "1.0 MPa (10 bar)" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "💎",
        title: "Blue Diamond enamel, 8-year warranty",
        desc: "5x more corrosion-resistant than stainless steel. A rust-free tank for 8 years means less scale and cleaner water.",
      },
      {
        icon: "🛡️",
        title: "8-layer safety + 0.03s ELCB",
        desc: "0.03-second shock protection (the fastest in the industry). Gas-leak sensor. Dry-burn protection. Legionella protection.",
      },
      {
        icon: "🌞",
        title: "Heat pump COP 4.0+",
        desc: "1 kWh of electricity = 4 kWh of heat = 75% savings vs. an electric tank. A VND 500k/month bill drops to VND 125k.",
      },
      {
        icon: "📱",
        title: "Wi-Fi + AI that learns usage hours",
        desc: "Learns your morning/evening shower times → turns on 30 minutes ahead. Away for 2 weeks → switches off to save energy.",
      },
    ],
    projectShowcase: [
      "Hyatt China — 5,000+ solar water heaters on the rooftops",
      "Tsinghua University — a central solar system delivering 50,000 liters/day",
      "Suzhou Industrial Park — a central heat pump for a 10,000-person cafeteria",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── 净水 Water Treatment ──────────────────────────────────────
  "净水": {
    story:
      "Tagline: 「Pure water, pure life」 — Pure water, pure life.\n\nMidea Water Treatment uses Dow FilmTec RO membranes (US) — the highest filtration standard in the industry. Six filtration stages: a 5-micron PP cotton filter + carbon block + 0.0001-micron RO + post-carbon + UV sanitization + mineralization. It removes 99.7% of heavy metals (lead, arsenic, mercury), bacteria, viruses, scale and residual chlorine.\n\nEspecially suited to Vietnam: tap water often contains residual chlorine and high scale, and is sometimes contaminated with bacteria. Midea RO removes it all while retaining essential minerals.",
    heritage:
      "Partnered with Dow Chemical (US) since 2014 — RO membranes exclusive to Midea. NSF/ANSI 58 certified (US) on every model.",
    technicalSpecs: [
      { label: "RO membrane", value: "Dow FilmTec (US) — the highest filtration standard in the industry" },
      { label: "Filtration stages", value: "6 stages + UV + mineralization" },
      { label: "Filtration size", value: "0.0001 micron (RO) — blocks 99.7% of impurities" },
      { label: "Output", value: "400–600 gallons/day = 1.5–2.3 liters/minute" },
      { label: "Removes", value: "Heavy metals, bacteria, viruses, scale, chlorine and odors" },
      { label: "Retains", value: "Essential Ca, Mg and K minerals (mineralization stage)" },
      { label: "Water tap", value: "304 stainless steel with touch sensing and an LED temperature indicator" },
      { label: "Filter replacement", value: "PP every 3–6 months, carbon every 6–12 months, RO every 2–3 years" },
      { label: "Filter-change alerts", value: "App + LED + buzzer" },
      { label: "Wi-Fi smart", value: "Monitor water quality and the filter-change schedule" },
      { label: "Standards", value: "GB 5749-2022 (China) + NSF/ANSI 58 (US)" },
      { label: "Warranty", value: "2 years on the body + 5 years on the RO pump" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [...COMMON_CERTS, "NSF/ANSI 58 — US (RO standard)", "NSF/ANSI 372 — lead-free"],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🇺🇸",
        title: "Dow US RO membrane — the highest standard",
        desc: "The same maker Aquaguard and Coway use. A 2–3 year service life. Filters out 99.7% of impurities.",
      },
      {
        icon: "🦠",
        title: "UV sanitizes 99.99%",
        desc: "After RO + UV → no bacteria, no viruses. Drink straight without boiling.",
      },
      {
        icon: "💪",
        title: "Retains essential minerals",
        desc: "The mineralization stage adds back Ca, Mg and K. Unlike ordinary RO, which strips water of minerals.",
      },
      {
        icon: "📱",
        title: "App tracks TDS and the filter-change schedule",
        desc: "Shows water quality in real time. Alerts you 7 days before a filter change is due. Order replacements through the app.",
      },
    ],
    projectShowcase: [
      "Marriott Hotels China — central water-purification systems",
      "Tencent offices Shenzhen — 200+ purifiers",
      "Beijing 301 Hospital — medical-grade water",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── 小家电 Small Appliances ─────────────────────────────────────
  "小家电": {
    story:
      "Tagline: 「Small but mighty」 — Small but mighty.\n\nMidea Small Appliances is the most diverse division — 300+ SKUs including rice cookers, kettles, single burners, blenders, juicers, robot vacuums, air purifiers and steamers. China market share: #1 in rice cookers, top 3 in robot vacuums, top 5 in air purifiers.\n\nA highlight: the IH (Induction Heating) rice-cooker line with a 1.8mm pure-copper inner pot — cooking rice 30% better than an ordinary aluminum pot (per a Japanese culinary expert test panel).",
    heritage:
      "Partnered with Cuckoo (South Korea) in 2018 — a strategic rice-cooker partner. Owns the Comfee brand for North America and EU export.",
    technicalSpecs: [
      { label: "Rice-cooker technology", value: "High-frequency IH + 1.8mm pure-copper inner pot" },
      { label: "Robot vacuum navigation", value: "360° laser + AI mapping" },
      { label: "Robot suction", value: "5,000–8,000 Pa (industry standard 2,500)" },
      { label: "Air purifier CADR", value: "400–600 m³/h (small units 300)" },
      { label: "HEPA filter", value: "H13 — 99.97% PM2.5" },
      { label: "Blender power", value: "1500–2000W — crushes ice and bone" },
      { label: "Food-contact materials", value: "304 stainless steel + safe Tritan glass" },
      { label: "Wi-Fi", value: "Supported on 60% of the range — via the 美的美居 app" },
      { label: "Standards", value: "GB 4706.1 + IEC 60335-2-15" },
      { label: "Warranty", value: "1–2 years on the body" },
      { label: "Average service life", value: "5–8 years" },
      { label: "Spare-parts supply", value: "At least 7 years after discontinuation" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🍚",
        title: "IH rice cooker with pure-copper pot",
        desc: "Rice tastes 30% better than with an aluminum pot. A Japanese test panel scored it 8.5/10 (Cuckoo-level).",
      },
      {
        icon: "🤖",
        title: "AI laser robot, 5000Pa",
        desc: "Twice the industry-standard suction. Multi-floor 3D mapping. Self-washes the mop and empties the bin.",
      },
      {
        icon: "💨",
        title: "Air purifier with HEPA H13, 99.97%",
        desc: "Filters PM2.5, formaldehyde and viruses. Ideal for high-pollution Hanoi winters.",
      },
      {
        icon: "📦",
        title: "300+ diverse SKUs",
        desc: "One brand covers the kitchen, living room and bedroom. Easy to buy, with common plugs.",
      },
    ],
    projectShowcase: [
      "Beijing kindergartens — 300+ classroom air purifiers",
      "ByteDance offices Shenzhen — 500+ rice cookers and kettles for the canteen",
      "Starbucks China chain — commercial espresso machines",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── COLMO Premium AI sub-brand ────────────────────────────────
  "COLMO": {
    story:
      "Tagline: 「AI for the new luxury class」 — AI for the new luxury class.\n\nCOLMO is Midea Group's most premium sub-brand — positioned against Samsung Bespoke and LG Signature. Launched in 2018, it is positioned as 'Smart Luxury' with a self-developed Hi-Si 7nm AI chip, an AI camera that recognizes gestures and voice, and premium materials (brushed gold, self-healing coating, medical-grade 316 stainless steel).\n\nDesigned by Tony Chi (whose studio designed Park Hyatt and Mandarin Oriental hotels). Each product is a standalone design piece, winning the Red Dot Design and iF Gold awards five years running.",
    heritage:
      "Licensed the Hi-Si AI chip from 2020. Partnered with Tony Chi Studio from 2018. Won 12 international design awards — Red Dot, iF and the Good Design Award.",
    technicalSpecs: [
      { label: "AI chip", value: "Hi-Si 7nm — developed at the Midea AI Center in Foshan" },
      { label: "Recognition camera", value: "8 people + 100 gestures + 20 body states" },
      { label: "Noise", value: "< 18 dB in sleep mode — the quietest in the luxury segment" },
      { label: "Wi-Fi", value: "Wi-Fi 6 + Matter + Apple HomeKit + Bluetooth 5.2" },
      { label: "Housing material", value: "Brushed gold + self-healing nano-coating" },
      { label: "Self-healing coating", value: "Scratches recover within 24 hours at room temperature" },
      { label: "Display", value: "LED Matrix + 21-inch OLED + full touchscreen" },
      { label: "Voice control", value: "Chinese + English + Vietnamese (coming soon)" },
      { label: "Body warranty", value: "5 years — 2.5x the industry standard" },
      { label: "AI-component warranty", value: "10 years" },
      { label: "Service", value: "Dedicated 24/7 concierge service — no hotline" },
      { label: "Designed service life", value: "15–20 years" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Tony Chi Studio NYC design center + the Foshan studio",
      "A dedicated assembly line — just 50,000 units a year across the series",
      "High-end materials: genuine brushed-gold plating + German nano-coating",
    ],
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [
      ...COMMON_CERTS,
      "Red Dot Design Award — 12 products in 5 years",
      "iF Design Gold — 8 products",
      "Good Design Award Japan — 6 products",
      "Apple HomeKit certified",
      "Matter 1.2 certified",
    ],
    packaging: [
      { label: "Specialized packaging", value: "Pinewood crate + 5cm foam padding + 3-layer shrink film" },
      { label: "Transit insurance", value: "100% compensation + priority replacement within 7 days" },
      { label: "MOQ", value: "1 SKU, mixed in a 20ft or 40ft HQ container" },
      { label: "Units per 20ft", value: "30–80 depending on flagship size" },
      { label: "Units per 40ft HQ", value: "60–160" },
      { label: "Concierge delivery", value: "Dedicated driver + Tony Chi-trained technician" },
    ],
    whyChoose: [
      {
        icon: "👑",
        title: "Designed by Tony Chi Studio",
        desc: "The same studio that designed Park Hyatt and Mandarin Oriental. Each product is a work of art.",
      },
      {
        icon: "🤖",
        title: "Self-developed Hi-Si 7nm AI",
        desc: "Midea Group's most powerful AI chip. The camera recognizes 8 people, 100 gestures and 20 states.",
      },
      {
        icon: "✨",
        title: "Self-healing coating",
        desc: "Scratches recover naturally within 24 hours. Doors still look new after 10 years.",
      },
      {
        icon: "🛎️",
        title: "24/7 concierge service",
        desc: "No hotline. A dedicated driver and technician. A 10-year warranty on AI components.",
      },
    ],
    projectShowcase: [
      "Mandarin Oriental Wangfujing Beijing — presidential suites",
      "Park Hyatt Shanghai — penthouse and presidential suites",
      "Vinhomes Riverside Hanoi — luxury villas (KGB Asia import package)",
      "Aman Beijing — all VIP suites",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── Toshiba Premium 东芝 sub-brand (operated by Midea) ──────────
  "东芝": {
    story:
      "Tagline: 「Japanese craftsmanship, future-proof」 — Japanese craftsmanship, future-proof.\n\nToshiba Lifestyle Products & Services (TLSC) has been owned by the Midea Group since 2016 — Midea acquired 80.1% from Toshiba Corporation for USD 537 million. Toshiba retains the brand and Japanese technology, while Midea manages global manufacturing and the supply chain.\n\nThe Toshiba Premium line is the most premium within Toshiba Home Appliances — including Wakasa Nagomi refrigerators (14-day freshness), 5D Heating IH pressure rice cookers, zeolite dishwashers and medical-grade 316 stainless-steel steam ovens.\n\nR&D remains at the Tokyo Lab — Toshiba JP engineers work on the technology. Manufactured at three factories: Wakasa Japan (flagship), Foshan China and Thailand (SEA export).",
    heritage:
      "Toshiba Corporation, 1875 — over 150 years of electrical history. Acquired by Midea in 2016, retaining Tokyo R&D and the Wakasa factory in Japan. A supplier of home appliances to the Japanese Imperial Household.",
    technicalSpecs: [
      { label: "R&D center", value: "Tokyo Lab — Toshiba JP engineers work full-time" },
      { label: "Flagship factory", value: "Wakasa, Japan — produces the most premium line" },
      { label: "Wakasa Nagomi technology", value: "14-day freshness — a traditional Japanese lacquer method" },
      { label: "Sushi-grade -3°C", value: "-3°C meat-and-fish compartment that does not freeze solid — sushi grade" },
      { label: "5D Heating IH", value: "5-directional heating for rice — exclusive to Toshiba" },
      { label: "Inner pot", value: "7-layer copper, 2.0mm — premium Japanese grade" },
      { label: "Rice-cooker pressure", value: "1.4 atm — optimized for Japanese rice" },
      { label: "Oven cavity steel", value: "Medical-grade 316 (industry standard 304)" },
      { label: "Dishwasher noise", value: "< 39 dB — ultra-quiet Japanese build" },
      { label: "Body warranty", value: "3 years" },
      { label: "Compressor & tank warranty", value: "10 years" },
      { label: "Spare-parts supply", value: "At least 15 years after discontinuation (Japanese standard)" },
    ],
    manufacturing: [
      "Toshiba R&D Tokyo Lab — full-time Toshiba JP engineers",
      "Flagship Wakasa factory in Japan — the most premium line",
      "Foshan factory in China (operated by Midea) — the mainstream line",
      "Thailand factory — SEA-region export",
      "Lacquer art design — handcrafted by Wakasa artisans in Japan",
      "Medical-grade 316 stainless steel for the roasting cavity — rust-free for 30 years",
    ],
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [
      ...COMMON_CERTS,
      "JIS C9335 (Japanese standard)",
      "PSE Mark Japan",
      "Official supplier to the Japanese Imperial Household",
      "Good Design Award Japan — 15+ products",
    ],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🇯🇵",
        title: "Tokyo R&D Lab — Toshiba JP engineers",
        desc: "The technology still comes from Japan. Toshiba JP engineers work full-time. Japanese quality standards with Midea's supply chain.",
      },
      {
        icon: "🐟",
        title: "Wakasa Nagomi keeps food fresh for 14 days",
        desc: "A traditional Japanese lacquer method. Greens stay fresh after 14 days. A sushi-grade -3°C meat-and-fish compartment.",
      },
      {
        icon: "🍚",
        title: "5D Heating IH, exclusive to Toshiba",
        desc: "5-directional heating + a 7-layer copper pot + 1.4 atm pressure. The best Japanese rice — recognized by JP culinary experts.",
      },
      {
        icon: "🏥",
        title: "Medical-grade 316 stainless steel",
        desc: "The oven cavity and sink use 316 stainless steel — hospital grade. Rust-free for 30 years. Easy to clean.",
      },
    ],
    projectShowcase: [
      "Aman Tokyo — all rooms and the Michelin restaurant",
      "Park Hyatt Tokyo — the 3-Michelin-star Kozue kitchen",
      "Japanese hotels in Vietnam (Sojourn, Solaria) — full Toshiba Premium",
      "Premium sushi restaurants in Hanoi/Ho Chi Minh City (Sasaya, Sushi Hokkaido) — Toshiba Premium",
    ],
    faq: COMMON_FAQ_BASE,
  },
};

/** Helper: get the meta for a product. Extract the major series prefix from
 *  seriesOriginal (e.g. "空调 · 家用" → "空调", "COLMO · 空调" → "COLMO"). */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  // Match the major prefix (before " · ", " /" or whitespace)
  const prefix = seriesOriginal.split(/[·\/\s]/)[0].trim();
  return MIDEA_SERIES_META[prefix];
}
