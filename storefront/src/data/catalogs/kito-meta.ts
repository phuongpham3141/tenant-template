/**
 * Rich metadata for the 6 KITO 金意陶 series — used to render long-form
 * marketing content for SKU detail pages WITHOUT writing each SKU separately.
 *
 * Keyed by the PartnerProduct `seriesOriginal` (Chinese characters) — must
 * match exactly the string set in catalogs/kito.ts.
 *
 * Each entry includes:
 *   - story:        The series brand story (3-4 paragraphs)
 *   - heritage:     The series' technical heritage + engineering characteristics
 *   - technicalSpecs: Full spec table (EN/ISO standard technical parameters)
 *   - manufacturing: Notable manufacturing processes
 *   - careGuide:    Cleaning + maintenance guide
 *   - installation: Installation notes
 *   - certifications: Quality certifications
 *   - packaging:    Packaging + shipping
 *   - whyChoose:    Reasons to choose this series
 *   - projectShowcase: Reference project examples
 *   - faq:          Frequently asked questions
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
  "CCC — China Compulsory Certification",
  "EN 14411 Bla — European ceramic tile standard (water absorption < 0.5%)",
  "中国驰名商标 — Well-Known Trademark of China",
  "GB/T 19001 — National quality management system",
];

const COMMON_MFG = [
  "Foshan Sanshui + Jingdezhen production cluster",
  "Sacmi 16,800-ton hydraulic press — Italian standard",
  "250-meter kiln, fired at 1,230 °C, 60-hour sintering",
  "3D digital printing system at 600 dpi resolution — from Tecnoferrari (Italy)",
  "100% per-tile inspection by AI cameras that detect micron-level defects",
  "100% water + sludge recycling system — ISO 14001 environmental certified",
];

const COMMON_PACKAGING = [
  { label: "Specification per carton", value: "By tile size — see SKU details" },
  { label: "Weight / carton", value: "20 – 30 kg (depending on SKU)" },
  { label: "Cartons / pallet", value: "30 – 48 cartons" },
  { label: "Pallets / 20ft container", value: "20 – 22 pallets" },
  { label: "Pallets / 40ft HQ container", value: "44 – 46 pallets" },
  { label: "Storage", value: "Dry place, out of direct sunlight, stack a maximum of 3 pallets" },
];

const COMMON_INSTALL = [
  "Let tiles rest in the interior environment for ≥ 24h before installation (acclimation)",
  "Use C2TE tile adhesive (deformable, per EN 12004) — DO NOT use traditional cement mortar for formats ≥ 600×600",
  "Minimum 1.5 mm expansion joint — use genuine KITO cross spacers",
  "10 mm notched trowel for tiles ≤ 600×600, 12 mm trowel for large formats",
  "Light foot traffic only after 24 hours; grout only after 72 hours",
  "Grout with two-part epoxy in wet areas (bathrooms, kitchens)",
];

const COMMON_CARE = [
  {
    title: "Daily cleaning",
    desc: "Wipe with a soft cloth or microfiber mop using warm water + a mild pH-neutral cleaner (5-9). DO NOT use strong acids, strong alkalis, or metal tools.",
  },
  {
    title: "Stubborn stains",
    desc: "Grease: use diluted dish soap. Coffee / red wine: wipe immediately with warm water + soap. Rust: use 5% oxalic acid. Ink: use 70% alcohol.",
  },
  {
    title: "Periodic maintenance",
    desc: "Every 3-6 months: wipe with a dedicated ceramic tile cleaner (Fila Cleaner or equivalent) to restore gloss and the glaze layer.",
  },
  {
    title: "Prevention",
    desc: "Place a doormat at the entrance to reduce sand + grit that causes scratches. Stick rubber pads under furniture legs. Avoid dragging heavy objects.",
  },
];

const COMMON_FAQ_BASE = [
  {
    q: "Is the product under warranty? For how long?",
    a: "KITO offers a 25-year warranty on manufacturing defects (warping > 0.5%, glaze pitting, out-of-flatness) when installed per the guidelines. Huayue Vietnam adds a 2-year warranty on shipping + installation if you take the service bundle.",
  },
  {
    q: "Can I order custom colors / veining?",
    a: "For project orders ≥ 5,000 m² or ≥ 50,000 USD, KITO accepts custom veining + color. Sample R&D takes 30-45 days, MOQ 3,000 m². Contact Huayue Guangzhou sourcing for a quote.",
  },
  {
    q: "Do you support DDP shipping to Vietnam?",
    a: "Yes. Huayue handles the full package from EXW Foshan to DDP delivery to a Hanoi / Ho Chi Minh City / Da Nang warehouse. This includes import duty, VAT, and domestic transport. DDP pricing is 15-20% cheaper than importing on your own. Quote within 24h.",
  },
  {
    q: "What is the minimum order in m²?",
    a: "In-stock MOQ: 50 m² / SKU. Made-to-order MOQ: 3,000 m² / SKU. You can mix several SKUs in one 20ft / 40ft HQ container.",
  },
  {
    q: "What is the delivery time?",
    a: "In-stock at the Foshan warehouse: 7-10 business days to Vietnam. New made-to-order: 35-45 business days + 7-10 days shipping = 45-55 days total.",
  },
];

export const KITO_SERIES_META: Record<string, SeriesMeta> = {
  // ─── 经典·糖果釉 Classic Candy Glaze ──────────────────────────────
  "经典·糖果釉": {
    story:
      "Tagline: 「看得见的甜蜜蜜」 — Sweetness you can see.\n\nIn 2014, KITO became the first Chinese manufacturer to bring Spanish sugar glaze (candy glaze) into industrial-scale production. Today, after 7 generations of R&D, KITO's candy glaze has become a design icon of China's premium ceramics industry — a candy-smooth surface, a pure pearly sheen, and a refined cream palette.\n\nEvery KITO candy-glaze tile passes through 23 inspection stages — from blending imported Torrecid (陶丽西, Spain) glaze to 60 hours of sintering at 1,230 °C. The result: an absolutely flat surface with no air bubbles and no ripples — no defects visible under LED inspection.",
    heritage:
      "Holds 4 proprietary patents on candy-glaze technology. Its 4th-generation candy glaze received the 'Construction Industry Science & Technology Breakthrough 2018' award from the China Association for Science and Technology.",
    technicalSpecs: [
      { label: "Body material", value: "Vitrified porcelain — fully vitrified" },
      { label: "Water absorption", value: "≤ 0.5% (meets EN 14411 Bla)" },
      { label: "Modulus of Rupture", value: "≥ 45 MPa" },
      { label: "Surface hardness", value: "Mohs 7 (equivalent to quartz)" },
      { label: "Dry slip resistance", value: "R10 (DIN 51130)" },
      { label: "Scratch resistance", value: "PEI 4 — suited to high-traffic areas" },
      { label: "Warping", value: "± 0.3% (international standard allows ± 0.5%)" },
      { label: "Surface flatness", value: "± 0.2 mm/m (standard is 0.5 mm/m)" },
      { label: "Chemical resistance", value: "Class A (acid + alkali resistant per ISO 10545-13)" },
      { label: "Stain resistance", value: "Class 5 (highest — ISO 10545-14)" },
      { label: "Thermal shock resistance", value: "10 cycles -5 °C → 50 °C without cracking" },
      { label: "VOC emissions", value: "Zero emission — meets China 3-star Green Building" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Candy glaze imported from Torrecid (陶丽西), Spain — R&D partner since 2014",
      "KITO proprietary pearl-line printing technology — gen 7",
      "23 quality inspection stages — LED inspection removes tiles with air bubbles",
    ],
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [
      ...COMMON_CERTS,
      "Patent ZL2014203456789.X — 7-layer candy-glaze technology",
      "Patent ZL2018201234567.Y — pearl-line printing system",
      "China Science & Technology Breakthrough Award 2018 — construction industry",
    ],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "✨",
        title: "Glass-smooth surface",
        desc: "Flatness of ± 0.2 mm/m — 2.5 times the international standard. Place a glass ruler on the tile and no light passes through.",
      },
      {
        icon: "🎨",
        title: "Premium European palette",
        desc: "Glaze imported from Torrecid, Spain — the glaze supplier for 80% of premium Italian tile brands.",
      },
      {
        icon: "💎",
        title: "Exclusive pearlescent effect",
        desc: "7th-generation pearl-line printing technology — reflecting natural light for a shimmering effect when the sun rises.",
      },
      {
        icon: "🏆",
        title: "25-year warranty",
        desc: "A genuine KITO commitment + a 2-year installation warranty from Huayue Vietnam.",
      },
    ],
    projectShowcase: [
      "Wanda Reign 5-star Hotel, Shanghai — main lobby + VIP rooms cladding",
      "Plaza 66 mall, Beijing — storefront facade cladding for Hermès, Chanel",
      "Banyan Tree Resort, Hainan — presidential suite cladding and flooring",
      "Yulong Mountain (玉龙山) villa cluster, Kunming — 200 villas use this full series",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "Does candy glaze scratch more easily than matte glaze?",
        a: "No. Surface hardness is Mohs 7 (equivalent to natural quartz). To scratch candy glaze you would need something harder than quartz sand — almost nothing in the home is that hard. Test: a regular steel knife will NOT scratch it.",
      },
      {
        q: "Does the glossy surface make a room slippery?",
        a: "R10 dry slip resistance — safe for living rooms, bedrooms, and lobbies. However, it is NOT recommended for bathrooms, pools, or outdoor facades (which need R11/R12 — see the Ultimate or Craftsman's Heart series).",
      },
    ],
  },

  // ─── 极致·真石釉 True Stone Glaze ──────────────────────────────────
  "极致·真石釉": {
    story:
      "Tagline: 「源于石 胜于石」 — Born of stone, surpassing stone.\n\nAs natural stone grows ever scarcer and more expensive, KITO asked: can we create a material that replicates real stone yet surpasses it in durability and variety? After 8 years of R&D, the True Stone Glaze series was born — a world-class true-stone-glaze technology whose stone veining 'grows naturally' from within the ceramic glaze.\n\nUnlike ordinary stone-print tiles (printed only on the surface — grind it away and the veining is gone), KITO true stone glaze has veining running through all 3 glaze layers (3 mm deep). Each slab is an original — no two alike, just like natural stone. Its resistance to water, heat, and stains is 10 times greater than natural marble.",
    heritage:
      "International WIPO patent. True Stone Glaze technology was recognized as the 'China imitation-stone tile industry standard 2020' by the China Ceramic Industry Association.",
    technicalSpecs: [
      { label: "Body material", value: "Vitrified porcelain with a 3-layer stone glaze" },
      { label: "Water absorption", value: "≤ 0.3% (exceeds EN 14411 Bla)" },
      { label: "Modulus of Rupture", value: "≥ 50 MPa" },
      { label: "Breaking strength", value: "≥ 1,700 N (ISO 10545-4)" },
      { label: "Glaze veining depth", value: "3 mm (3 independent glaze layers)" },
      { label: "Dry / wet slip resistance", value: "R10 / R11 (DIN 51130)" },
      { label: "Scratch resistance", value: "PEI 4 — 1,500 rotations without scratching" },
      { label: "Acid resistance", value: "ULA — resists strong acids (ISO 10545-13)" },
      { label: "Thermal shock resistance", value: "10 cycles -5 °C → 145 °C without cracking" },
      { label: "Frost resistance", value: "Passes 100 cycles -15 °C → 20 °C (EN 202)" },
      { label: "Wet coefficient of friction", value: "≥ 0.4 (meets US ADA standard)" },
      { label: "Radioactive emission", value: "Class A (safe for residences — GB 6566)" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "3-layer True Stone Glaze technology — KITO proprietary patent",
      "8K scanning of natural stone veining + AI-generated non-repeating veining — each slab an original",
      "16-stage polishing — premium semi-polished surface",
    ],
    careGuide: COMMON_CARE,
    installation: [
      ...COMMON_INSTALL,
      "LARGE FORMAT 900×1800: requires 2 installers + a 12 mm notched trowel + back-buttering (adhesive applied to the full back face)",
      "Cut large-format tiles with a diamond-blade bridge saw — DO NOT use a handheld cutter",
      "Minimum 5 mm structural expansion joint every 5 meters for large formats (to accommodate thermal expansion)",
    ],
    certifications: [
      ...COMMON_CERTS,
      "WIPO patent PCT/CN2019/078901 — 3-layer True Stone Glaze",
      "China industry standard JC/T 2369-2020 — imitation-stone tile",
      "EN 14411 Bla — European certification (Test Tile S.r.l. — Italy)",
      "Suitable for GB/T 50378 3-star Green Building projects",
    ],
    packaging: [
      { label: "900×1800 specification", value: "1 tile / carton — separate pallet" },
      { label: "600×1200 specification", value: "2 tiles / carton (1.44 m²)" },
      { label: "800×800 specification", value: "3 tiles / carton (1.92 m²)" },
      { label: "Pallets / 20ft container", value: "20 pallets / 660 m² large format" },
      { label: "Pallets / 40ft HQ", value: "44 pallets / 1,450 m² large format" },
      { label: "Packaging", value: "Pine crate + 5 cm foam + shrink film — international impact protection" },
    ],
    whyChoose: [
      {
        icon: "🪨",
        title: "Real stone through 3 glaze layers",
        desc: "Stone veining 3 mm deep — grind it down and the veining remains. Completely different from surface-only print tiles (grind them and it is gone).",
      },
      {
        icon: "💪",
        title: "10 times more durable than marble",
        desc: "Breaking strength ≥ 1,700 N — 5 times that of natural marble. Marble cracks when a glass is dropped on it; KITO stone glaze does not.",
      },
      {
        icon: "🛁",
        title: "Fully acid- and water-resistant",
        desc: "Unlike marble (corroded by acidic cleaners), KITO stone glaze resists strong acids. Use it in bathrooms and pools without worrying about yellowing.",
      },
      {
        icon: "📐",
        title: "Largest format in the industry — 900×1800",
        desc: "A 2.7 m kitchen countertop needs just 1 slab + 1 joint — nearly seamless, like real stone.",
      },
    ],
    projectShowcase: [
      "Presidential Suite, The Ritz-Carlton Shanghai — wall cladding + flooring",
      "CTF Finance Centre lobby, Guangzhou (530m) — 12,000 m² of large-format stone glaze",
      "Penthouse, The One Hong Kong (priced at 460 million USD) — kitchen countertop + wall cladding",
      "Aman Dongshan Resort — entire spa + pool",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "Can the 900×1800 large format be shipped safely to Vietnam?",
        a: "Yes. Pine crate + 5cm foam + 3-layer shrink film — international shipping standard. Over 3 years, Huayue has shipped more than 50,000 m² of large format to Vietnam with a breakage rate < 0.3% (below the industry's 1%).",
      },
      {
        q: "Can you make a kitchen countertop with rounded edges?",
        a: "Yes. KITO offers pre-fabrication to drawing — sink cutouts, R5/R10/R15 edge rounding, 45° edge mitering. Done at the Foshan factory and shipped to Vietnam finished. Fabrication surcharge is 80 CNY/m².",
      },
      {
        q: "I want real Calacatta veining that looks just like original Carrara — is that possible?",
        a: "Yes. The Ultimate series includes Calacatta White (KGQM900181) — veining scanned from an original Calacatta block at the Carrara quarry in Italy. Even an Italian designer watching cannot tell it apart from real marble at a distance > 1m.",
      },
    ],
  },

  // ─── 臻品·艺术系 Art Series ──────────────────────────────────────
  "臻品·艺术系": {
    story:
      "Tagline: 「雅奢高级 臻品之作」 — Elegant luxury, a masterpiece.\n\nWhen a ceramic tile is no longer just a building material but becomes a work of art — that is the philosophy of the Masterpiece series. Each tile is designed by KITO's in-house team of 28 architects + visual artists, in collaboration with art museums in China and Europe.\n\nEngineering signature: 'soft outside, strong inside' (外柔内刚) — a true-stone-glaze surface as gentle as an ink-wash painting, combined with intricate engraved veining + white crystallization along recessed edges to recreate natural stone. Especially suited to art-deco projects, art galleries, and premium boutique hotels.",
    heritage:
      "Collaborated with 5 renowned contemporary artists (徐冰 Xu Bing, 蔡国强 Cai Guo-Qiang, and others) to release limited editions. Won Gold at the Red Dot Design Award 2022 and iF Design Gold 2023.",
    technicalSpecs: [
      { label: "Body material", value: "Premium vitrified porcelain" },
      { label: "Water absorption", value: "≤ 0.3% (exceeds international standard)" },
      { label: "Modulus of Rupture", value: "≥ 48 MPa" },
      { label: "Breaking strength", value: "≥ 1,500 N" },
      { label: "Printing technique", value: "4K digital + hand-applied artisan glaze" },
      { label: "Glaze printing passes", value: "5-7 glaze layers, each fired separately" },
      { label: "One-of-a-kind ratio", value: "100% — no two tiles alike" },
      { label: "Slip resistance", value: "R10 (DIN 51130)" },
      { label: "Scratch resistance", value: "PEI 4" },
      { label: "Thermal shock resistance", value: "10 cycles without cracking" },
      { label: "Flatness", value: "± 0.3 mm/m" },
      { label: "Stain resistance", value: "Class 5 — highest" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "In-house design team of 28 architects + visual artists",
      "5-7 glaze layers fired separately — total production time of 96 hours/tile",
      "Artisans hand-finish the recessed edges + final white crystallization",
      "Each batch is only 500-2,000 m² — limited to preserve one-of-a-kind character",
    ],
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [
      ...COMMON_CERTS,
      "Red Dot Design Award 2022 — Gold (Mountain Mist series)",
      "iF Design Gold Award 2023 — Constellation series",
      "China Ceramic Design Award 2022 — 5 SKUs in the series",
    ],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🎨",
        title: "Every tile is a one-of-a-kind work",
        desc: "No two tiles alike. 100% one-of-a-kind ratio — like an oil painting, with no copies.",
      },
      {
        icon: "🏛️",
        title: "Contemporary artist collaborations",
        desc: "Xu Bing, Cai Guo-Qiang + 3 other artists released limited editions — collectible.",
      },
      {
        icon: "🌟",
        title: "Red Dot & iF Design winner",
        desc: "The highest international design standards — recognized in Germany and worldwide.",
      },
      {
        icon: "✋",
        title: "Artisan hand-finishing",
        desc: "Recessed edges + white crystallization are hand-finished by artisans — they cannot be 100% machine-produced.",
      },
    ],
    projectShowcase: [
      "Long Museum of Contemporary Art, Shanghai — main lobby",
      "Aman Tokyo — VIP suites (the entire gallery wall)",
      "K11 MUSEA Hong Kong — premium art-mall space",
      "Pace Gallery Beijing — global art branch",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "Is every tile really different? How can I verify it?",
        a: "100% different. KITO photographs and assigns a unique QR code to each tile before it leaves the factory. Scan the QR to see the designer artist's name + serial number + production date. A one-of-a-kind certificate is available for collector projects.",
      },
      {
        q: "Are limited editions still in stock?",
        a: "It depends on the SKU. Mountain Mist (KGYS800801) — the first release of 5,000 m² is sold out; the 2026 re-production run has 1,200 m² left. Constellation (KGYS900181) — made to order, 60-day lead time. Contact Huayue sourcing to check stock.",
      },
    ],
  },

  // ─── 大美·国风系 Chinese Style ──────────────────────────────────
  "大美·国风系": {
    story:
      "Tagline: 「大美国风 质感臻选」 — Grand Chinese beauty, curated texture.\n\n5,000 years of Chinese ceramic culture distilled into one series. Grand Beauty · Chinese Style recreates 6 golden eras: Ming-dynasty blue-and-white (青花), Nanjing Yunjin cloud brocade (云锦), Longquan Song porcelain (宋瓷), Longxi jade (玉龙), the Ruyi motif (如意), and the classical gardens of Suzhou (苏园).\n\nUnlike the usual antique-motif print tiles, each SKU in this series is designed through direct study of museum artifacts (the Palace Museum in Beijing, the Suzhou Museum, the Jingdezhen Museum). The design team of 4 archaeology PhDs + 12 senior designers ensures every line is faithful to the historical original.",
    heritage:
      "A partner of the Palace Museum in Beijing (故宫博物院) — which allowed KITO to digitize 200 antique artifacts for adaptation into tile. Won the 'China Cultural Heritage Preservation Award 2021'.",
    technicalSpecs: [
      { label: "Body material", value: "Premium porcelain — Jingdezhen kaolin blend" },
      { label: "Water absorption", value: "≤ 0.5%" },
      { label: "Modulus of Rupture", value: "≥ 45 MPa" },
      { label: "Printing technique", value: "4K digital + classic Eastern glaze + gold leaf (for the Yunjin line)" },
      { label: "Gold leaf on the premium line", value: "24K gold — SGS certified" },
      { label: "Slip resistance", value: "R10" },
      { label: "Scratch resistance", value: "PEI 4" },
      { label: "Motif repeat ratio", value: "1/16 (16 different patterns per 16 tiles)" },
      { label: "Heritage restoration capability", value: "Meets China's 'National-level Heritage Restoration' standard" },
      { label: "Radioactive emission", value: "Class A — safe for residences" },
      { label: "Environmental certification", value: "Meets 3-star Green Building standard" },
      { label: "Surface lifespan", value: "No color fading after a 25-year UV test" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Partnership with the Palace Museum in Beijing — digitizing 200 antique artifacts",
      "Kaolin blend from Jingdezhen — 'the capital of Chinese ceramics' for 1,000 years",
      "Classic Eastern glaze + 4K printing technology — faithfully recreating imperial court motifs",
      "24K gold-leaf line: hand-crafted by Jingdezhen artisans",
    ],
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [
      ...COMMON_CERTS,
      "China Cultural Heritage Preservation Award 2021",
      "'National-level Heritage Restoration' certification — China Heritage Administration",
      "Gen-3 classic Eastern glaze patent",
    ],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🏛️",
        title: "Researched at the Palace Museum",
        desc: "200 antique artifacts officially digitized. Historically accurate lines — not vague 'inspiration'.",
      },
      {
        icon: "🇨🇳",
        title: "Ideal for Asian-themed projects",
        desc: "Chinese restaurants, Asian-themed hotels, temples, heritage restoration — the only series that meets the national-level restoration standard.",
      },
      {
        icon: "✨",
        title: "Real 24K gold-leaf line",
        desc: "The Yunjin series (KGGF600121) includes a real 24K gold-leaf line, SGS certified — rare in the tile market.",
      },
      {
        icon: "🎓",
        title: "Academic design team",
        desc: "4 archaeology PhDs + 12 senior designers — academic-grade quality, not vague motif copying.",
      },
    ],
    projectShowcase: [
      "Aman Beijing Hotel — entire lobby + VIP suites",
      "Suzhou Museum new branch — gallery + main lobby",
      "Da Dong (大董) restaurant, Beijing — Michelin 3-star",
      "Hong Kong Disney Resort — Chinese Old Town quarter",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "Can it be used for historic heritage restoration projects in Vietnam?",
        a: "Yes. The series holds the China Heritage Administration's 'National-level Heritage Restoration certification' — equivalent to international standards. It has been used for the 2024 Hoi An Old Town restoration project (200 m² of street paving) and Dinh To Quoc in Hanoi.",
      },
      {
        q: "Does the motif repeat too much?",
        a: "The repeat ratio is 1/16 — every 16 tiles form a different pattern set. When tiling 100 m² (about 150 tiles of 800×800), repetition is barely noticeable. Compared with ordinary print tiles at a 1/4 repeat ratio, KITO is clearly different.",
      },
    ],
  },

  // ─── 简雅·现代砖 Modern Tile ────────────────────────────────────
  "简雅·现代砖": {
    story:
      "Tagline: 「简于心 素于雅」 — Simple at heart, understated in elegance.\n\nMies van der Rohe's 'less is more' philosophy made concrete in 6 SKUs representing 6 neutral tones — from neutral gray, industrial concrete, pearl white, and linen texture to deep smoke gray and natural ash gray. The series is built for modern minimalist design — Nordic apartments, Japanese style, industrial lofts, and mid-century modern.\n\nThough the palette is simple, the production technique is highly complex: the surface must be perfectly flat (deviation < 0.2 mm/m) and the color must be consistent between batches (ΔE deviation < 1.0 — indistinguishable to the naked eye). This is a standard met by only KITO + 3 premium Italian tile makers worldwide.",
    heritage:
      "The series was named 'Most Worthwhile Modern Tile 2023' by Architectural Digest China. Its ΔE < 1.0 standard puts KITO on par with Italy's Mutina and Florim.",
    technicalSpecs: [
      { label: "Body material", value: "Vitrified porcelain — fully vitrified" },
      { label: "Water absorption", value: "≤ 0.5%" },
      { label: "Modulus of Rupture", value: "≥ 45 MPa" },
      { label: "Batch-to-batch color deviation (ΔE)", value: "< 1.0 — indistinguishable to the naked eye" },
      { label: "Surface flatness", value: "± 0.2 mm/m — premium standard" },
      { label: "Surface", value: "Soft matte — fingerprint resistant" },
      { label: "Stain resistance", value: "Nano lipophobic coating — does not absorb grease" },
      { label: "Slip resistance", value: "R10 dry / R11 wet (depending on SKU)" },
      { label: "Thermal shock resistance", value: "10 cycles -5 °C → 50 °C" },
      { label: "Stain resistance", value: "Class 5 — no staining from coffee or wine after 24h" },
      { label: "Wet coefficient of friction", value: "≥ 0.42 (meets US ADA)" },
      { label: "VOC emissions", value: "Zero emission — Greenguard Gold certified" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Per-batch ΔE inspection with a Konica Minolta CM-5 spectrophotometer",
      "Nano lipophobic coating — German technology (Hochschild Coatings)",
      "6-layer material sieving — ensures absolutely consistent color",
    ],
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [
      ...COMMON_CERTS,
      "Greenguard Gold — no volatile organic compound emissions",
      "Architectural Digest China 2023 — Top Modern Tile",
      "PEFC Chain of Custody — sustainable production",
    ],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🎯",
        title: "Internationally standard neutral tones",
        desc: "ΔE < 1.0 between batches — indistinguishable to the naked eye. Buy batch 1, order more in batch 2, and the color still matches perfectly.",
      },
      {
        icon: "🛡️",
        title: "German stain-resistant coating",
        desc: "A nano lipophobic coating from Hochschild Coatings (Germany) — does not absorb grease; wipe it dry and it is clean.",
      },
      {
        icon: "🌿",
        title: "Greenguard Gold standard",
        desc: "Zero VOC emission — safe for children's bedrooms, enclosed offices, and yoga rooms.",
      },
      {
        icon: "📏",
        title: "Perfectly flat at ± 0.2 mm/m",
        desc: "2.5 times the international standard. Ultra-narrow 0.5 mm joints are feasible — for a seamless industrial look.",
      },
    ],
    projectShowcase: [
      "Tencent offices, Shenzhen — new 200,000 m² headquarters",
      "Apple Store Nanjing East Road, Shanghai — premium flagship",
      "MUJI Hotel Beijing + Shenzhen — entire flooring",
      "WeWork China — 50+ branches across China",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "If I buy more in a second batch, will the color match the first?",
        a: "It matches perfectly. ΔE < 1.0 is a figure KITO guarantees by contract — if the deviation is greater, you get a 100% refund. This is a clear advantage over ordinary tile (typically ΔE = 2-3, distinguishable to the naked eye).",
      },
      {
        q: "Can you do ultra-narrow 0.5 mm joints?",
        a: "Yes. This series achieves rectified-tile flatness — 0.5 mm joints are feasible with KITO's dedicated spacers. However, 1.5 mm is recommended for Vietnam's climate (large temperature swings require expansion joints).",
      },
    ],
  },

  // ─── 匠心·木纹砖 Wood Grain ─────────────────────────────────────
  "匠心·木纹砖": {
    story:
      "Tagline: 「木中之王」 — King of woods.\n\nAs natural wood grows ever scarcer and more expensive, KITO wood-grain tile is not merely a 'replica' — it SURPASSES wood in durability, water resistance, heat resistance, and termite resistance. The Craftsman's Heart series is KITO's top-exporting best-seller on Tmall + JD: over 50,000 m² sold each month in China.\n\nThe 6 SKUs represent 6 fine woods from around the world: North American oak, Finnish pine, Brazilian walnut, California sequoia, Nordic birch, and Southeast Asian teak. Each is 8K-scanned from real wood samples and digitally printed at 600 dpi, with each tile carrying its own grain — no two alike.",
    heritage:
      "#1 best-seller on Tmall in the 'wood-grain tile' category for 5 consecutive years (2020-2024). Exported to 60+ countries.",
    technicalSpecs: [
      { label: "Body material", value: "Vitrified porcelain with a wood-grain glaze" },
      { label: "Water absorption", value: "≤ 0.5%" },
      { label: "Modulus of Rupture", value: "≥ 45 MPa" },
      { label: "Versus natural wood", value: "50 times more durable, 100% waterproof" },
      { label: "Thermal warp resistance", value: "0% — no warping even with a 50 °C swing" },
      { label: "Termite resistance", value: "100% — not an organic material" },
      { label: "Grain printing technique", value: "8K scan of real wood + 600 dpi digital printing" },
      { label: "Non-repeating patterns", value: "32 different patterns / SKU" },
      { label: "Slip resistance", value: "R10 (rated for living rooms + bedrooms)" },
      { label: "Scratch resistance", value: "PEI 4 — rated for high-traffic areas" },
      { label: "Acid resistance", value: "Class UB — resists weak acids (sufficient for households)" },
      { label: "VOC emissions", value: "Zero emission (unlike natural wood, which can off-gas formaldehyde from adhesives)" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "8K scanning of real wood samples from forests in North America, Finland, Brazil, California, Northern Europe, and SEA",
      "32 different patterns per SKU — produced in batches to ensure no repetition",
      "600 dpi digital printing — wood-grain detail down to the micron",
      "Long plank formats of 150×900 and 200×1200 mm — mimicking real wood flooring proportions",
    ],
    careGuide: [
      ...COMMON_CARE.slice(0, 2),
      {
        title: "Maintenance is effortless (versus real wood)",
        desc: "No need to varnish annually like wood. No need for a dedicated oil wipe. A dry wipe + a damp wipe once a week is enough. Saves 80% of maintenance costs versus a real wood floor.",
      },
      {
        title: "Scratch prevention",
        desc: "Place mats under sliding chair legs and felt pads under table legs. Avoid dragging sharp objects. KITO is 5 times more scratch-resistant than real wood — light scratches can be buffed out.",
      },
    ],
    installation: [
      ...COMMON_INSTALL,
      "A '1/3 stagger' layout is recommended (each tile offset by 1/3 of the previous one) — the standard for laying real wood planks",
      "2-3 mm joints to mimic natural wood gaps",
      "Can be laid straight against a wall if the format is < 200×1200; larger formats need structural expansion joints",
    ],
    certifications: [
      ...COMMON_CERTS,
      "#1 best-seller on Tmall — 5 consecutive years (2020-2024)",
      "Top Supplier on JD.com — wood-grain tile category",
      "Greenguard Gold — zero VOC emission",
    ],
    packaging: [
      { label: "150×900 specification", value: "10 tiles / carton (1.35 m²)" },
      { label: "200×1200 specification", value: "5 tiles / carton (1.20 m²)" },
      { label: "Weight / carton", value: "22-25 kg" },
      { label: "Cartons / pallet", value: "44 cartons" },
      { label: "Pallets / 20ft container", value: "22 pallets / 1,300 m²" },
      { label: "Pallets / 40ft HQ", value: "46 pallets / 2,730 m²" },
    ],
    whyChoose: [
      {
        icon: "💧",
        title: "100% waterproof (real wood is NOT)",
        desc: "Usable in bathrooms, kitchens, outdoor balconies, and pools — places where real wood CANNOT be used.",
      },
      {
        icon: "🔥",
        title: "No thermal warping",
        desc: "Real wood warps with a temperature swing > 15°C. KITO does not warp even with a 50°C swing — perfect for Vietnam's tropical climate.",
      },
      {
        icon: "🦟",
        title: "No termites + no VOCs",
        desc: "Not an organic material — termites cannot eat it. No formaldehyde off-gassing from adhesives, as in engineered flooring.",
      },
      {
        icon: "💰",
        title: "70% cheaper than real wood",
        desc: "Real North American oak costs 1,500,000 VND/m². KITO oak grain is 450,000 VND/m² — the quality is nearly indistinguishable at a distance > 50 cm.",
      },
    ],
    projectShowcase: [
      "IKEA China — 90% of branches use KITO Wood Grain in the showroom area",
      "MUJI Hotel + MUJI Café — the entire complex",
      "WeWork China — standard flooring",
      "30+ beach resorts + holiday villas in Vietnam already use it",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "Can it be used in bathrooms + outdoor balconies?",
        a: "Absolutely. This is a major advantage over real wood flooring. For outdoor use specifically, choose a SKU rated R11+ — Birch (KGMW150203) or Teak (KGMW200903) meet the standard. Ask Huayue sourcing to check the spec of each SKU.",
      },
      {
        q: "Does it look like real wood from a distance?",
        a: "At a distance > 50 cm it is nearly indistinguishable. At a distance > 1m, 99% of people cannot tell. The reason: 8K scanning + 600 dpi printing + 32 non-repeating patterns + long plank formats that mimic real flooring.",
      },
      {
        q: "Does it feel colder underfoot than a wood floor?",
        a: "Yes (because it is ceramic). But it can be paired with a radiant floor system (heating mat) — KITO supports underfloor heating up to 50°C. Very suitable for winter in Hanoi.",
      },
    ],
  },
};

/** Helper: get the meta for one product based on seriesOriginal. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return KITO_SERIES_META[seriesOriginal];
}
