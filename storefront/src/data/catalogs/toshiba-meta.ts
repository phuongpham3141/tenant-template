/**
 * Brand metadata for Toshiba Home Appliances (东芝家电).
 *
 * Honest sourcing — only REAL, verifiable facts:
 *   • Toshiba Corporation founded in 1875 in Japan
 *   • Home-appliance business (Toshiba Lifestyle Products & Services)
 *     acquired 80.1% by the Midea Group in 2016 (USD 537 million), retaining Tokyo R&D +
 *     brand + Japanese quality standards
 *   • Officially distributed in Vietnam through Toshiba Lifestyle (toshiba-lifestyle.com/vn)
 *
 * Do NOT fabricate per-series spec tables — each product already has real specs
 * and real descriptions crawled from the PDP. The meta only provides a brand story + service
 * commitments + operational FAQ (accurate to B2B reality). The brand story is shared across all
 * Toshiba product lines (technicalSpecs left empty → the page shows the real specs).
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

const TOSHIBA_BRAND: SeriesMeta = {
  story:
    "Tagline: 「Leading Innovation」 — Leading innovation.\n\nToshiba Corporation was founded in 1875 in Japan — one of the oldest and most respected technology groups in the Land of the Rising Sun, with more than 150 years of history. Toshiba pioneered many firsts: Japan's first refrigerator, washing machine and microwave oven.\n\nIn 2016, the Midea Group acquired 80.1% of Toshiba's home-appliance business (Toshiba Lifestyle Products & Services) for USD 537 million. Under the agreement, Toshiba retains its brand, core technology and Japanese quality standards, while Midea handles large-scale manufacturing and the global supply chain — combining Japanese technology with Chinese manufacturing at more accessible prices.\n\nIn Vietnam, Toshiba is officially distributed through Toshiba Lifestyle with a full product range: air conditioners, refrigerators, washing machines, dryers, kitchen appliances, water purifiers and household goods — focused on freshness-keeping technology, energy-saving inverters and refined Japanese craftsmanship.",
  heritage:
    "More than 150 years of Japanese technology heritage (since 1875). The maker of Japan's first refrigerator, washing machine and microwave oven. R&D remains in Tokyo after Midea's 2016 acquisition — safeguarding Japanese quality and core technology.",
  technicalSpecs: [],
  manufacturing: [
    "Toshiba Corporation, founded in 1875 — over 150 years of Japanese technology history",
    "Home-appliance business operated by the Midea Group since 2016 (80.1% ownership)",
    "R&D retained at the Tokyo Lab — Japanese technology and quality standards",
    "Large-scale production through Midea's global factory network and supply chain",
    "Core technology: energy-saving inverters, freshness-keeping (NaturePURE, PureBIO) and refined craftsmanship",
  ],
  careGuide: [
    {
      title: "Daily cleaning",
      desc: "Wipe with a soft cloth, warm water and a mild pH-neutral cleaner. Do NOT spray water directly onto the control panel or power outlet.",
    },
    {
      title: "Periodic cleaning",
      desc: "Every 3 months: clean the filters (air conditioner, washing machine, water purifier, vacuum cleaner). Toshiba designs them for easy removal and reinstallation.",
    },
    {
      title: "Technical maintenance",
      desc: "Every 12 months: call a Toshiba Service Center (toshiba-lifestyle.com/vn/support) to check refrigerant, clean the cavity and calibrate sensors. Free during the warranty period.",
    },
    {
      title: "Genuine spare parts",
      desc: "Use genuine Toshiba parts and components to maintain performance and warranty. Contact a Service Center or Huayue to order.",
    },
  ],
  installation: [
    "Read the user manual (bilingual) carefully before installation",
    "Install through a Toshiba Authorized Service Center technician",
    "Check the voltage, grounding and stabilizer capacity before plugging in",
    "Wait 24 hours after installing a refrigerator or air conditioner before powering on (to let the refrigerant settle)",
    "Keep the invoice and warranty card to qualify for the official warranty",
  ],
  certifications: [
    "An authentic Japanese brand — Toshiba Corporation (since 1875)",
    "Officially distributed in Vietnam through Toshiba Lifestyle",
    "Energy Label per Vietnam Ministry of Industry & Trade regulations",
    "Japanese quality standards — Tokyo R&D",
  ],
  packaging: [
    { label: "Standard packaging", value: "Carton + foam padding + straps for impact protection" },
    { label: "Transit warranty", value: "Compensation for transit damage" },
    { label: "Import MOQ", value: "1 x 20ft / 40ft HQ container — mixed SKUs OK" },
    { label: "Warehouse storage", value: "Dry place, out of direct sunlight, stacked as recommended" },
  ],
  whyChoose: [
    {
      icon: "🇯🇵",
      title: "Japanese technology since 1875",
      desc: "Over 150 years of heritage. Tokyo R&D. The maker of Japan's first refrigerator, washing machine and microwave oven.",
    },
    {
      icon: "🏭",
      title: "Operated by the Midea Group",
      desc: "Since 2016, Midea's manufacturing and supply-chain strength keeps prices more accessible while preserving Japanese quality.",
    },
    {
      icon: "❄️",
      title: "Freshness-keeping + inverter technology",
      desc: "NaturePURE and PureBIO deodorize and sanitize; energy-saving inverters; refined Japanese craftsmanship.",
    },
    {
      icon: "🛡️",
      title: "Official Vietnam warranty",
      desc: "Officially distributed through Toshiba Lifestyle, with DDP-backed warranty from Huayue. Full range of genuine parts.",
    },
  ],
  projectShowcase: [
    "Official nationwide distribution through the Toshiba Lifestyle Vietnam network",
    "Full product range: air conditioners, refrigerators, washing machines, cooking appliances and water purifiers",
    "Suited to apartment, hotel and townhouse projects that need a premium Japanese brand",
    "Huayue provides DDP import and installation solutions for large-volume projects",
  ],
  faq: [
    {
      q: "Is Toshiba still a Japanese brand after the Midea acquisition?",
      a: "Yes. Midea acquired 80.1% of the home-appliance business in 2016, but Toshiba retains its brand, Tokyo R&D, core technology and Japanese quality standards. Midea handles large-scale manufacturing and the supply chain, so prices are more accessible while quality stays at Japanese standards.",
    },
    {
      q: "What is Toshiba's warranty in Vietnam?",
      a: "Officially distributed through Toshiba Lifestyle with a nationwide Service Center network (toshiba-lifestyle.com/vn/support). Huayue and the Service Centers together provide in-home warranty service. Each product has a source link on its detail page so you can verify the official specifications.",
    },
    {
      q: "Do you offer delivery, in-home installation and DDP quotes to Vietnam?",
      a: "Yes. Huayue handles the full package: official import → Hanoi/Ho Chi Minh City/Da Nang warehouse → delivery and in-home installation. DDP quotes (taxes + shipping included) within 24 hours for both single orders and container-scale projects.",
    },
    {
      q: "MOQ and delivery lead time?",
      a: "MOQ: one 20ft container (mixed SKUs OK). In-stock items: 7–10 business days. Project orders: 30–45 days. Large projects receive priority lead times.",
    },
    {
      q: "Are the technical specs on the page accurate?",
      a: "All product names, descriptions, specs and images are taken directly from the official Toshiba Lifestyle Vietnam site (with a source link on every detail page). Nothing is altered or fabricated.",
    },
  ],
};

/** All Toshiba product lines share the same brand story (a unified brand). */
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return TOSHIBA_BRAND;
}
