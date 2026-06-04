/**
 * Blog data — articles for /info/industry-news.
 * Each article has slug, metadata, and full markdown-style content array.
 * Categories double as filter chips on the blog index.
 */

export type BlogCategory =
  | "xu-huong-gia"
  | "san-pham-moi"
  | "hoi-cho"
  | "chinh-sach-thue"
  | "case-study"
  | "phan-tich-thi-truong"
  | "huong-dan"
  | "ncc-profile";

export const CATEGORIES: Record<BlogCategory, { label: string; color: string }> = {
  "xu-huong-gia": { label: "Price Trends", color: "#E85D4E" },
  "san-pham-moi": { label: "New Products", color: "#2A9D8F" },
  "hoi-cho": { label: "Trade Shows & Events", color: "#F4A261" },
  "chinh-sach-thue": { label: "Tax Policy", color: "#6B7880" },
  "case-study": { label: "Success Stories", color: "#8B5CF6" },
  "phan-tich-thi-truong": { label: "Market Analysis", color: "#005F6B" },
  "huong-dan": { label: "Sourcing Guides", color: "#0EA5E9" },
  "ncc-profile": { label: "Supplier Profiles", color: "#D97706" },
};

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  authorRole: string;
  date: string;
  readMinutes: number;
  image: string;
  /** Tags for filtering and SEO. */
  tags: string[];
  /** Article body — array of paragraphs (string) or block objects. */
  content: BlogBlock[];
  featured?: boolean;
};

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "img"; src: string; caption?: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

const u = (id: string, w = 1200, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=70`;

export const ARTICLES: BlogArticle[] = [
  {
    slug: "xu-huong-gia-gom-su-foshan-q1-2026",
    title: "Foshan Ceramics Price Trend Q1/2026 — Up 8% on Fuel Costs",
    excerpt: "Analysis of raw material, gas and electricity price swings and their impact on Foshan ceramics factories. Forecast for Vietnamese buyers and the right time to place orders.",
    category: "xu-huong-gia",
    author: "Trần Phương Thảo",
    authorRole: "Senior Sourcing Manager",
    date: "2026-04-28",
    readMinutes: 6,
    image: u("1565008447742-97f6f38c985c"),
    tags: ["Foshan", "Ceramics", "Price", "Q1/2026"],
    featured: true,
    content: [
      { type: "p", text: "In March 2026, the Guangdong Ceramics Association announced that the average ex-factory price of the Foshan ceramics industry rose 8% year over year. Over the past 4 weeks, the Huayuesc Sourcing team worked directly with 14 partner factories in Foshan to understand the causes and provide recommendations for Vietnamese buyers." },
      { type: "h2", text: "3 main causes" },
      { type: "p", text: "First, the price of natural gas (LNG) used for kilns rose 22% since November 2025 as geopolitical tensions disrupted supply from Australia and Qatar. Gas consumed by ceramic kilns accounts for 18-25% of production cost, so this was a direct hit." },
      { type: "p", text: "Second, industrial electricity costs in Guangdong rose 6% after the tier-2 electricity pricing reform (for large enterprises) took effect in Q1/2026. Ceramics factories are typical tier-2 customers." },
      { type: "p", text: "Third, skilled-worker wages rose 4-5% due to competition from Shenzhen's electronics and new-energy industries. Top-tier suppliers (Dongpeng, Monalisa, NewPearl) had to raise wages to retain skilled labor." },
      { type: "img", src: u("1551434678-e076c223a692", 1200, 500), caption: "Ceramic kiln line in Foshan — energy costs account for 25% of the production cost" },
      { type: "h2", text: "Recommendations for Vietnamese buyers" },
      { type: "list", items: [
        "Place your MOQ before June 2026 — prices may rise another 3-5% in Q3 if gas remains volatile.",
        "Prioritize suppliers with electric kilns over gas kilns — costs are more stable (Monalisa and Foshan Orient Bath have converted 60% of their kilns to electric).",
        "Negotiate annual contracts — Huayuesc is helping 8 Vietnamese dealers lock in prices via annual contracts with 3 top-tier suppliers.",
        "Combine orders — lower shipping costs offset the price increase. Orders of 40HQ or more have DDP prices 12-15% cheaper than LCL.",
      ]},
      { type: "quote", text: "An 8% increase is significant but not a crisis. Smart buyers will use it as an opportunity to negotiate long-term contracts with suppliers and lock in prices for the next 12 months.", author: "Wang Lei — Country Manager, Guangzhou" },
      { type: "h2", text: "Short-term vs long-term impact" },
      { type: "p", text: "In the short term (Q2-Q3/2026), buyers importing ceramics from Foshan will see DDP prices rise about 3-5% (assuming shipping rates stay flat). For a $50K order, a buyer may pay an extra $1,500-2,500." },
      { type: "p", text: "In the long term (2027+), Huayuesc forecasts prices will stabilize as LNG gains new supply from the US and suppliers switch to electric kilns. This is also an opportunity for mid-to-small suppliers to adopt new technology, potentially cutting costs 5-10% and becoming more competitive." },
    ],
  },
  {
    slug: "canton-fair-2026-phase-1-5-san-pham-viet-nam-nen-san",
    title: "Canton Fair 2026 — 5 Products Vietnamese Buyers Should Hunt For",
    excerpt: "From April 15 to May 5, Canton Fair phase 1 will showcase thousands of new products. Huayuesc is leading a delegation of 30 Vietnamese buyers — here are the 5 categories forecast to be hottest.",
    category: "hoi-cho",
    author: "Nguyễn Văn Đức",
    authorRole: "Sourcing Director",
    date: "2026-04-25",
    readMinutes: 5,
    image: u("1505373877841-8d25f7d46678"),
    tags: ["Canton Fair", "2026", "Guangzhou", "Trade Show"],
    content: [
      { type: "p", text: "Canton Fair (Guangzhou Spring Fair) phase 1 runs from April 15 to May 5, 2026 at the Pazhou Complex, Guangzhou — the world's largest B2B event, with 25,000+ exhibitors and 200,000+ buyers worldwide. Huayuesc is leading a delegation of 30 Vietnamese buyers, including visa support and a B2B match-making schedule with 80+ pre-screened suppliers." },
      { type: "h2", text: "1. LED Smart Lighting — Tuya Wi-Fi integration" },
      { type: "p", text: "60×60 LED panels with Wi-Fi control via the Tuya/Smart Life app are trending for office and hotel projects. DDP price to Hanoi is $13-18/pc for orders of 500 pcs or more. Top suppliers: Zhongshan Light, Foshan Lighting, Opple." },
      { type: "h2", text: "2. Smart toilets — Mid-range segment" },
      { type: "p", text: "Smart toilets with air-drying + warm water are no longer just premium; they are now mainstream for mid-range Vietnamese apartments. The $180-280/pc segment has 14 competitive suppliers in Foshan. Ortonbaths, NewPearl and Dongpeng lead in Vietnamese-buyer share." },
      { type: "h2", text: "3. Modular sofas — Nordic dimensions" },
      { type: "p", text: "Modular sofas of 4-7 seats with Nordic design (clean straight edges, velvet/bouclé upholstery) are popular in young apartments. Saigon showrooms report sales up 40% YoY. KUKA, ZuoYou and Landbond all have large booths at Canton Fair." },
      { type: "img", src: u("1540575467063-178a50c2df87", 1200, 500), caption: "Pazhou Complex — Canton Fair phase 1 specializes in electronics, lighting and home appliances" },
      { type: "h2", text: "4. Aluminum door hardware — Hopo, Roto" },
      { type: "p", text: "Vietnam is seeing a wave of Xingfa Class 100 aluminum door systems. Premium hardware from Hopo (China) and Roto (German, made in China) is a key selling point for competitive contractors. Orders of 500+ sets are 18-22% cheaper than buying through domestic Vietnamese distribution." },
      { type: "h2", text: "5. Studio LED lights for TikTok creators" },
      { type: "p", text: "Niche but growing fast — ring LED panel lights + softboxes for content creators. Suppliers in Shenzhen (Godox, Aputure first-tier) and Guangzhou (private label) release new models every quarter. Orders of 100-300 units at a unit price of $35-65 retail for $80-120 in Vietnam." },
      { type: "quote", text: "Canton Fair is not a place to buy goods — it is where you meet suppliers, see samples and negotiate annual contracts. This year Huayuesc's 30-buyer delegation is focused on long-term negotiation rather than spot orders.", author: "Nguyễn Văn Đức — Sourcing Director" },
      { type: "h2", text: "Register to join the delegation" },
      { type: "p", text: "Huayuesc supports 30 spots; each includes: free China visa, round-trip Hanoi-Guangzhou flight, 5 nights at a 4-star hotel near Pazhou, a 1-on-1 B2B match-making schedule with 80+ suppliers, a Chinese interpreter (one per buyer), and shuttle transfer to the fair. Delegation fee is $850/person (market price $2,500). Register before March 31." },
    ],
  },
  {
    slug: "thue-nhap-khau-noi-that-go-q1-2026-giam-5",
    title: "Wood Furniture Import Tax Q1/2026 — Down 5%",
    excerpt: "The Ministry of Finance issued a new circular cutting the MFN tariff on wood furniture HS 9403 from 25% to 20%. An impact analysis for buyers importing from China.",
    category: "chinh-sach-thue",
    author: "Lê Hoàng Quân",
    authorRole: "Legal Counsel",
    date: "2026-04-20",
    readMinutes: 4,
    image: u("1556745757-8d76bdb6984b"),
    tags: ["Tax", "Wood Furniture", "HS 9403", "MFN"],
    content: [
      { type: "p", text: "Circular 12/2026/TT-BTC, issued on April 15, 2026, officially cuts the MFN import tariff on the HS 9403 group (wood furniture and accessories) from 25% to 20%, effective May 1, 2026. This is positive news for Vietnamese buyers importing wood furniture from China, especially for hotel-interior projects and premium showrooms." },
      { type: "h2", text: "Scope of application" },
      { type: "table", headers: ["HS Code", "Description", "Old Tax", "New Tax"], rows: [
        ["9403.30", "Office wood desks & chairs", "25%", "20%"],
        ["9403.40", "Kitchen wood cabinets", "25%", "20%"],
        ["9403.50", "Bedroom wood furniture", "25%", "20%"],
        ["9403.60", "Dining room wood furniture", "25%", "20%"],
        ["9403.90", "Other wood accessories", "25%", "20%"],
      ]},
      { type: "p", text: "Note: HS 9403.10 (metal-and-wood furniture) keeps the 25% tariff; HS 4419 (small wooden kitchenware) stays at 30%. Buyers should verify the exact HS code with the Huayuesc logistics team before ordering." },
      { type: "h2", text: "Impact on DDP price" },
      { type: "p", text: "For a $20,000 living-room sofa order from KUKA Hangzhou, the before/after calculation is:" },
      { type: "p", text: "BEFORE (25% tax): FOB price $20,000 + CIF freight $4,000 = CIF $24,000. Import duty $24,000 × 25% = $6,000. VAT 10% × ($24,000+$6,000) = $3,000. Total DDP $33,000." },
      { type: "p", text: "AFTER (20% tax): FOB price $20,000 + CIF freight $4,000 = CIF $24,000. Import duty $24,000 × 20% = $4,800. VAT 10% × ($24,000+$4,800) = $2,880. Total DDP $31,680." },
      { type: "p", text: "Buyers save $1,320 (nearly 4%) per $20K wood furniture order. For a showroom doing 5-10 orders/year, the savings are $7,000-13,000 — exactly the cost of a Huayuesc Premium Membership." },
      { type: "img", src: u("1567789884554-0b844b597180", 1200, 500), caption: "For a project showroom, a 5% tax cut equals 4% of the DDP price — a meaningful margin" },
      { type: "h2", text: "Recommendations" },
      { type: "list", items: [
        "Wood furniture orders being signed with ex-factory dates AFTER May 1 — negotiate to delay ex-factory to qualify for the new tariff.",
        "Annual contracts with KUKA / Landbond / RedApple — request a DDP price adjustment under the new policy.",
        "Mixed metal + wood furniture orders — declare the HS code accurately to avoid being assigned a higher tier.",
        "Huayuesc has updated the DDP calculator with the new tariff — see /info/ddp-calculator.",
      ]},
    ],
  },
  {
    slug: "case-study-showroom-sai-gon-tiet-kiem-22-percent",
    title: "Case study: A Saigon showroom saves 22% by switching to Huayuesc",
    excerpt: "A Saigon showroom (Ho Chi Minh City) switched from a traditional broker to Huayuesc for 18 orders in 2025. A detailed analysis: source price, freight, tax, disputes.",
    category: "case-study",
    author: "Phạm Quốc Anh",
    authorRole: "Customer Success Lead",
    date: "2026-04-15",
    readMinutes: 7,
    image: u("1517245386807-bb43f82c33c4"),
    tags: ["Case study", "Showroom", "Ho Chi Minh City", "Sofa"],
    content: [
      { type: "p", text: "The Saigon showroom (real name withheld on request) is a 6-store furniture chain in Ho Chi Minh City with 2025 revenue of VND 45 billion, specializing in sofas + dining sets imported from China. Before 2024, they worked through a broker in Guangzhou (12% commission, not transparent). In 2025, they moved 18 orders (total value $480K) to Huayuesc. Here is a detailed analysis." },
      { type: "h2", text: "Cost structure before (traditional broker)" },
      { type: "table", headers: ["Item", "% of import price", "Notes"], rows: [
        ["FOB goods price, Foshan", "100%", "Quoted via broker, unverifiable"],
        ["Broker fee", "12%", "Hidden inside the goods price"],
        ["CIF freight to Cat Lai", "15%", "Handled by broker, not transparent"],
        ["Tax + VAT", "33%", "Often declared ~3% higher than actual"],
        ["Domestic shipping", "4%", "Self-arranged"],
        ["Dispute cost (1 defective order in 2024)", "8%", "Broker offered no support, money lost"],
        ["TOTAL OVERHEAD on FOB", "+72%", "For a $20K order → DDP ~$34.4K"],
      ]},
      { type: "h2", text: "Cost structure after (Huayuesc)" },
      { type: "table", headers: ["Item", "% of import price", "Notes"], rows: [
        ["FOB goods price, Foshan", "100%", "Quoted directly from suppliers via RFQ"],
        ["Huayuesc commission", "0%", "Paid 5% by the supplier, not charged to buyer"],
        ["DDP freight", "20%", "Transparent breakdown"],
        ["Tax + VAT", "30%", "Correct per HS code, with documentation"],
        ["Domestic shipping", "0%", "Already included in DDP"],
        ["Dispute cost (0 defective orders in 2025)", "0%", "Trade Assurance — full refund"],
        ["TOTAL OVERHEAD on FOB", "+50%", "For a $20K order → DDP ~$30K"],
      ]},
      { type: "p", text: "Savings: 22% (from 72% down to 50% overhead). Across 18 orders worth $480K, the showroom saved about $107K = VND 2.7 billion in 2025." },
      { type: "img", src: u("1493946740644-2d8a1f1a6aff", 1200, 500), caption: "The Saigon showroom's first container was audited on-site in Foshan by CSR before export" },
      { type: "h2", text: "Transition process" },
      { type: "list", items: [
        "Weeks 1-2: The showroom shared its 2024 order history with CSR — analyzing MOQ, suppliers, products and peak seasons.",
        "Week 3: CSR proposed 4 alternative suppliers for 3 core products — free samples shipped to SGN.",
        "Weeks 4-6: The showroom tested the samples and compared quality with the old goods. 3 of 4 suppliers met requirements.",
        "Week 7: Placed the first $25K order (modular sofas) through CSR — Trade Assurance (escrow).",
        "Weeks 8-12: Production + audit + DDP. The order reached the HCM warehouse on time, with 0 complaints.",
        "April-December 2025: Gradually moved the remaining orders. By the end of 2025: 100% of sourcing through CSR.",
      ]},
      { type: "quote", text: "Trade Assurance (the escrow account) was the deciding factor. I used to constantly worry the broker would disappear with my 30% deposit — now the money sits in a partner bank's escrow account, and the supplier only gets paid once I confirm the goods are OK.", author: "Owner of the Saigon showroom (anonymous)" },
      { type: "h2", text: "Lessons learned" },
      { type: "p", text: "Vietnamese buyers with 5+ showroom stores should reassess their supply chain every 6 months. A traditional broker is good enough for small buyers ($5-15K/order), but for a showroom with revenue over VND 30 billion/year, a broker's 10-12% commission equals the salary of 2-3 full-time employees. CSR provides transparent pricing + Trade Assurance + a Guangzhou team — turning broker costs into a tangible service." },
    ],
  },
  {
    slug: "phan-tich-cang-lach-huyen-vs-cat-lai-2026",
    title: "Analysis: Lach Huyen vs Cat Lai port — where should Northern buyers ship?",
    excerpt: "Lach Huyen port (Hai Phong) vs Cat Lai (Ho Chi Minh City) — comparing freight, delivery time, congestion and customs services for Northern Vietnamese buyers in Q1/2026.",
    category: "phan-tich-thi-truong",
    author: "Đặng Thanh Hà",
    authorRole: "Logistics Coordinator",
    date: "2026-04-10",
    readMinutes: 8,
    image: u("1581092335397-9583eb92d232"),
    tags: ["Logistics", "Port", "Hai Phong", "Cat Lai", "DDP"],
    content: [
      { type: "p", text: "Vietnamese buyers in the North often face one question: import through Lach Huyen port (Hai Phong), or stick with the habit of going through Cat Lai (Ho Chi Minh City) and then trucking goods north? A detailed Q1/2026 analysis based on data from 240 Huayuesc DDP orders." },
      { type: "h2", text: "Freight comparison (1×40HQ order from Foshan)" },
      { type: "table", headers: ["Item", "Lach Huyen (HP)", "Cat Lai (HCM)"], rows: [
        ["Ocean freight from Foshan/Shekou", "$2,200", "$2,400"],
        ["Customs clearance fee", "$120", "$150"],
        ["Domestic shipping to Hanoi", "$280", "$1,400 (HCM→Hanoi)"],
        ["Total DDP to Hanoi", "$2,600", "$3,950"],
        ["Ocean transit time", "7-9 days", "10-12 days"],
        ["Total delivery time (to Hanoi warehouse)", "10-12 days", "14-17 days"],
        ["Congestion rate (Q1/2026)", "Low (8%)", "High (32%)"],
      ]},
      { type: "p", text: "Savings via Lach Huyen: $1,350/40HQ and 4-5 days of delivery time. For a Northern buyer importing 12 containers/year, that is $16,200/year in savings = ~VND 410 million." },
      { type: "img", src: u("1565008447742-97f6f38c985c", 1200, 500), caption: "Lach Huyen port — 2x growth over 2023, increasingly attracting Northern Vietnamese buyers" },
      { type: "h2", text: "Why is Lach Huyen cheaper?" },
      { type: "list", items: [
        "Hanoi to Hai Phong is only 120km, just 2-3 hours by road on the 5B expressway. Cat Lai is ~1,800km from Hanoi, a 2-day truck trip.",
        "Lach Huyen port has operated since 2018 with modern capacity (HBP Cube cranes), high throughput and little congestion.",
        "Cat Lai has been overloaded since 2022 — frequent congestion surcharges of $80-150/container because ships have to wait at anchor.",
        "Hai Phong customs has had e-customs since 2021, clearing 30% faster than Cat Lai.",
      ]},
      { type: "h2", text: "When should you use Cat Lai?" },
      { type: "p", text: "Cat Lai is still a good choice when: (1) The buyer is in the South — trucking back north is uneconomical. (2) The supplier is in Dongguan/Shenzhen — closer to Hong Kong/Yantian, more convenient than the Foshan→Lach Huyen route. (3) Oversized/overweight cargo — Cat Lai has special equipment to lift 50+ ton containers. (4) Urgent cargo needing air freight — Tan Son Nhat airport is 30 minutes from Cat Lai." },
      { type: "h2", text: "Lang Son overland — a third option" },
      { type: "p", text: "For small cargo (under 5 CBM) or when you need an extremely short delivery time (5-7 days total), Huayuesc offers an overland route through the Huu Nghi border gate (Lang Son). Freight is $80-120/CBM, double the ocean rate but 5-7 days faster. Suitable for showrooms that need to refresh samples quickly or move hot items." },
      { type: "quote", text: "80% of Huayuesc's Northern buyers switched to Lach Huyen in 2025. Real savings average $1,200-1,500/container — use that to upgrade packaging or cut retail prices.", author: "Đặng Thanh Hà — Logistics Coordinator" },
      { type: "h2", text: "2026 plan" },
      { type: "p", text: "Huayuesc is investing in a representative office in Hai Phong (Q3/2026) to shorten DDP delivery to Northern buyers' warehouses to 7-9 days. It is also signing MOUs with 2 large forwarders at Lach Huyen to secure fixed freight discounts for Huayuesc buyers. Buyers on the platform will receive this benefit automatically." },
    ],
  },
  {
    slug: "huayuesc-ai-sourcing-llm-matching-beta",
    title: "Huayuesc launches AI Sourcing — LLM matching beta",
    excerpt: "CSR has released an AI Sourcing tool that uses an LLM to automatically match buyer RFQs with 4,000+ suppliers in the database. Free beta test for the first 100 buyers.",
    category: "san-pham-moi",
    author: "Vũ Mạnh Hùng",
    authorRole: "AI Engineer Lead",
    date: "2026-04-05",
    readMinutes: 5,
    image: u("1581092446327-9b52bd1570c2"),
    tags: ["AI", "LLM", "RAG", "Sourcing", "Beta"],
    content: [
      { type: "p", text: "Huayuesc has officially released its AI Sourcing feature — using an LLM (large language model) to understand complex Vietnamese RFQs and automatically match them with the most suitable suppliers in a database of 4,200+ partner factories. A free beta test is open to the first 100 buyers who sign up from April 5, 2026." },
      { type: "h2", text: "The old problem: keyword search does not understand context" },
      { type: "p", text: "Previously, a Vietnamese buyer would send an RFQ with a complex description such as 'Need to source 500 ergonomic mesh chairs with aluminum bases and headrests, target retail 4-5 million/pc, OEM logo printed on the side' — the old keyword search only matched 'mesh chair' and 'ergonomic', ignoring the price, OEM and target-retail requirements. The result: the buyer received 30+ irrelevant quotes and wasted time filtering them manually." },
      { type: "h2", text: "The solution: AI Sourcing with LLM + RAG" },
      { type: "p", text: "CSR's AI Sourcing uses a RAG (Retrieval-Augmented Generation) architecture: (1) A Vietnamese-tuned LLM (custom fine-tuned on 50,000+ historical CSR RFQs) understands context, target retail, OEM requirements and implicit priorities. (2) A vector database of 4,200 suppliers with embeddings of their capabilities, main products, price range and MOQ flexibility. (3) A re-ranking layer that uses business signals (rating, audit score, response time, dispute history) to select the top 5-7 best-matching suppliers." },
      { type: "img", src: u("1565793298595-6a879b1d9492", 1200, 500), caption: "AI Sourcing dashboard — the buyer sees matched suppliers with a confidence score, match reasons and a comparison table" },
      { type: "h2", text: "Beta results (40 buyers tested in March 2026)" },
      { type: "table", headers: ["Metric", "Old keyword search", "AI Sourcing"], rows: [
        ["Suppliers matched (average)", "28", "5-7"],
        ["Relevant supplier rate", "31%", "94%"],
        ["Time to find a suitable supplier", "3.2 days", "8 minutes"],
        ["Buyers purchasing from top match", "12%", "58%"],
        ["Buyer satisfaction", "3.4/5", "4.7/5"],
      ]},
      { type: "p", text: "Especially impressive: AI Sourcing matched many complex RFQs that keyword search missed. For example, a buyer needed 'a 4-7 seat Nordic modular sofa in gray/beige for an 80m² apartment, target retail 25-40 million' — the AI understood the Nordic style (straight legs, bouclé fabric), the dimensions suited to a small apartment, the mid-to-high price, and correctly matched KUKA Hangzhou + ZuoYou Shenzhen." },
      { type: "h2", text: "How to use it" },
      { type: "list", items: [
        "Go to /buying-request and click 'Use AI Sourcing (BETA)' in the top right corner.",
        "Describe your needs in natural Vietnamese — the more detail the better (target retail, customer demographic, OEM requirements).",
        "The AI returns the top 5-7 suppliers in 60 seconds + match reasons + a price/MOQ/delivery-time comparison.",
        "Click 'Send RFQ to all matched' — the RFQ is automatically forwarded to the suppliers, with responses within 24h.",
      ]},
      { type: "quote", text: "AI Sourcing does not replace people — it lets the CSR Sourcing team focus on hard cases (custom OEM, large orders) instead of manually screening every RFQ. Efficiency is up 4x.", author: "Vũ Mạnh Hùng — AI Engineer Lead" },
      { type: "h2", text: "Roadmap" },
      { type: "p", text: "Q3/2026: AI Pricing — predicting DDP prices with accuracy above 92% based on historical prices + real-time ocean freight + exchange rates. Q4/2026: AI Negotiation Assistant — suggesting negotiation replies to Chinese suppliers in Chinese. 2027: Multi-modal AI — buyers upload a photo of the product they want and the AI finds suppliers + compares visual similarity against the 4,200-supplier catalog." },
    ],
  },
  {
    slug: "ddp-lang-son-lead-time-5-7-ngay",
    title: "Overland DDP via Lang Son — new 5-7 day delivery time",
    excerpt: "The Huu Nghi border gate upgraded its infrastructure in Q1/2026; Huayuesc signed MOUs with 2 forwarders to offer overland DDP in 5-7 days from Foshan/Guangzhou.",
    category: "san-pham-moi",
    author: "Đặng Thanh Hà",
    authorRole: "Logistics Coordinator",
    date: "2026-03-30",
    readMinutes: 4,
    image: u("1559223607-a43c990c692c"),
    tags: ["DDP", "Lang Son", "Overland", "Logistics"],
    content: [
      { type: "p", text: "After the renovation of the Huu Nghi international border gate (Lang Son) was completed in February 2026 with a new e-customs system, Huayuesc signed MOUs with 2 large forwarders (Sinotrans + Vinatrans) to offer an overland DDP package with a 5-7 day delivery time — 7-10 days faster than ocean freight." },
      { type: "h2", text: "Route + delivery time" },
      { type: "list", items: [
        "Foshan/Guangzhou → Nanning (China): 1 day, by expressway.",
        "Nanning → Huu Nghi border gate (China): 0.5 days.",
        "Huu Nghi China + Vietnam customs clearance: 0.5-1 day (new e-customs).",
        "Huu Nghi → Hanoi: 1 day, on the Hanoi-Lang Son expressway.",
        "Hanoi → buyer warehouse (across the North): 0.5-1 day.",
        "TOTAL: 5-7 days from pickup in Foshan to the buyer's warehouse.",
      ]},
      { type: "h2", text: "Freight vs ocean" },
      { type: "table", headers: ["Cargo type", "Ocean (Cat Lai/HP)", "Lang Son overland"], rows: [
        ["LCL under 3 CBM", "$120/CBM, 14-18 days", "$160/CBM, 5-7 days"],
        ["LCL 3-10 CBM", "$95/CBM, 12-15 days", "$130/CBM, 5-7 days"],
        ["FCL 20HQ", "$2,400, 10-12 days", "$3,200, 6-7 days"],
        ["FCL 40HQ", "$2,600, 10-12 days", "$3,800, 6-7 days"],
      ]},
      { type: "p", text: "Overland is 30-45% more expensive but 7-10 days faster. Suitable for: hot trending items that need fast restocking, sample orders, small orders (under 3 CBM), and showrooms that need high-speed inventory turnover." },
      { type: "img", src: u("1492684223066-81342ee5ff30", 1200, 500), caption: "The new Huu Nghi border gate — e-customs cuts clearance from 2-3 days down to 0.5-1 day" },
      { type: "h2", text: "Recommendations" },
      { type: "p", text: "Use overland when: (a) The product has a short life cycle (smart devices, fashion accessories) — a 1-month delay can make it outdated. (b) Sample orders — always prioritize overland to test quickly. (c) Replenishment orders — restock in time for peak season. (d) High-value, compact cargo — the freight percentage is high but the absolute cost is small." },
      { type: "p", text: "To book overland DDP through Huayuesc, select 'Lang Son overland' in the calculator at /info/ddp-calculator or note it clearly in the RFQ. The CSR Logistics team automatically analyzes and recommends the optimal route." },
    ],
  },
  {
    slug: "oppein-home-profile-top-1-chau-a",
    title: "OPPEIN Home — Profile of Asia's No. 1 kitchen cabinet supplier",
    excerpt: "OPPEIN Home Group (Guangzhou) is Asia's No. 1 kitchen cabinet manufacturer, with $4.2B revenue in 2025. Huayuesc interviewed the CEO and toured the 200,000m² factory.",
    category: "ncc-profile",
    author: "Trần Phương Thảo",
    authorRole: "Senior Sourcing Manager",
    date: "2026-03-25",
    readMinutes: 6,
    image: u("1493946740644-2d8a1f1a6aff"),
    tags: ["OPPEIN", "Kitchen Cabinets", "Guangzhou", "Supplier profile"],
    content: [
      { type: "p", text: "OPPEIN Home Group (欧派家居集团) was founded in 1994 in Guangzhou and is now Asia's largest manufacturer of kitchen cabinets + wardrobes + whole-home furniture. 2025 revenue was $4.2B, with 6,200+ employees and 4 production complexes totaling 200,000m². Huayuesc just completed its periodic Q1/2026 audit and interviewed deputy CEO Mr. Chen Liang. Here is a detailed profile." },
      { type: "h2", text: "Scale + production capacity" },
      { type: "list", items: [
        "4 factories: Guangzhou (HQ, 80,000m²), Qingyuan (60,000m²), Wuxi (35,000m²), Tianjin (25,000m²).",
        "Capacity: 8,000 kitchen cabinet sets/day, 5,000 wardrobe sets/day, 12,000 auxiliary furniture sets/day.",
        "Industry 4.0 automated lines — 65% robot ratio, being raised to 80% by 2027.",
        "Skilled labor: 4,200 carpenters + metalworkers (average wage 12,000 RMB/month = 1,650 USD).",
        "R&D: 280 engineers + designers, releasing new models every 14 days.",
      ]},
      { type: "h2", text: "Flagship products" },
      { type: "p", text: "The 'Modern Italian' kitchen cabinet line — made of E0 MDF + UV finish, with Hettich/Blum hardware and EU-standard soft-close drawers. The Vietnam retail price range is 35-95 million per 4m kitchen. OPPEIN also has an entry-level 'Compact' line for 60-80m² apartments targeting $800-1,200 per kitchen. Vietnamese buyers typically order 50-200 kitchens per order for apartment projects." },
      { type: "img", src: u("1567789884554-0b844b597180", 1200, 500), caption: "OPPEIN Guangzhou showroom — 12,000m² displaying 200+ kitchen cabinet designs" },
      { type: "h2", text: "Why work with OPPEIN through Huayuesc" },
      { type: "list", items: [
        "On-site audits twice a year by the CSR Guangzhou team — ensuring consistent quality.",
        "Transparent pricing — CSR negotiates B2B prices for Vietnamese buyers, typically 8-12% cheaper than approaching directly.",
        "Flexible OEM — OPPEIN has an MOQ of 30 sets for custom designs, with a 25-35 day delivery time.",
        "Trade Assurance — escrow + inspection + dispute resolution. Especially important for orders of $50K+.",
        "DDP delivery time to Hanoi: 28-32 days (production 22-25 + shipping 6-7 via Lang Son or Lach Huyen).",
      ]},
      { type: "quote", text: "Vietnamese buyers are OPPEIN's fastest-growing segment — 2025 Vietnam revenue rose 67%. We are committed to offering the Vietnam market preferential prices and priority delivery.", author: "Chen Liang — Deputy CEO, OPPEIN" },
      { type: "h2", text: "Success case: a 280-unit West Lake apartment complex" },
      { type: "p", text: "In Q4/2025, an apartment developer in West Lake (Hanoi) ordered 280 OPPEIN Modern Italian kitchens through Huayuesc. Total value $410,000 DDP. Delivery time: 32 days from PO signing to delivery of all 4×40HQ containers to the project warehouse. Savings of $58,000 (~14%) versus importing through Vietnamese distribution. The developer commented: 'The CSR on-site audit at OPPEIN Guangzhou gave us confidence in the quality — the investor was even invited over to see the production line.'" },
      { type: "p", text: "Huayuesc forecasts OPPEIN will hold its No. 1 position in Asia for another 5-7 years thanks to strong R&D and industry-leading automation. Vietnamese buyers with apartment projects of 50+ units should consider OPPEIN in their sourcing shortlist." },
    ],
  },
  {
    slug: "5-sai-lam-pho-bien-khi-dat-sample",
    title: "5 common mistakes when ordering samples — what new buyers should avoid",
    excerpt: "Ordering samples is an essential step when sourcing for the first time. But 5 common mistakes can make a sample fail to reflect the true MOQ quality. The CSR team shares its experience.",
    category: "huong-dan",
    author: "Phạm Quốc Anh",
    authorRole: "Customer Success Lead",
    date: "2026-03-20",
    readMinutes: 5,
    image: u("1559223607-a43c990c692c"),
    tags: ["Sample", "Guide", "New Buyers"],
    content: [
      { type: "p", text: "Ordering samples is the best insurance for a new buyer. But the Huayuesc Customer Success team regularly sees cases where the sample is 'a dream' yet the MOQ that arrives is 'a disappointment'. An analysis of the 5 most common mistakes and how to fix them." },
      { type: "h2", text: "Mistake 1: Ordering only a single sample" },
      { type: "p", text: "New buyers often order just one representative sample. The problem: the supplier may carefully cherry-pick that sample (a golden sample) that differs from batch production. Recommendation: order 3-5 samples of the same SKU from one supplier — if all 5 are OK, you can trust it. If only 1 of 5 looks good, that is a red flag. The extra cost is only 2-3x the initial sample but cuts risk by 80%." },
      { type: "h2", text: "Mistake 2: Not requesting samples with full packaging" },
      { type: "p", text: "Many buyers only test the product and ignore the packaging. The supplier ships the sample in nice bubble wrap, but at MOQ it packs in thin, fragile cartons. Recommendation: ask the supplier to ship the sample with EXACTLY the MOQ packaging (carton, foam, label, manual included). Test the whole box so it matches actual production." },
      { type: "h2", text: "Mistake 3: Only testing the new sample — not testing a 'used sample'" },
      { type: "p", text: "Especially for functional products (LED lights, smart home, faucets, electrical devices): testing a sample only when it arrives is only good for 'day one'. You should use the sample continuously for 2-4 weeks to catch durability problems, dimming (LED), leaks (faucets) and so on. This is the best way to detect hidden QC issues." },
      { type: "img", src: u("1556745757-8d76bdb6984b", 1200, 500), caption: "Test samples for 2-4 weeks before ordering the MOQ — a small investment to avoid large losses" },
      { type: "h2", text: "Mistake 4: Not keeping a reference sample" },
      { type: "p", text: "Buyers test the sample and then throw it away. When the MOQ arrives with a quality problem, there is no sample to compare against to claim with the supplier. Recommendation: NEVER throw the sample away — store it in a cabinet, clearly labeled 'SAMPLE REF: PO-XXX, date YYYY-MM-DD'. When the MOQ deviates, you have immediate evidence for CSR to negotiate a refund/replacement." },
      { type: "h2", text: "Mistake 5: Not recording an unboxing video of the sample" },
      { type: "p", text: "Huayuesc recommends that buyers record an unboxing video of the sample (5-10 minutes) — evidence of the condition on arrival, packaging, label and product. In a dispute, this video is worth 10x a photo. Huayuesc also records an inspection video in Guangzhou — buyers compare the 2 videos to verify the supplier shipped to spec." },
      { type: "h2", text: "Best practices summary" },
      { type: "list", items: [
        "Order 3-5 samples of the same SKU from one supplier (test consistency)",
        "Request samples with full export-standard packaging",
        "Test the sample continuously for 2-4 weeks, including its functions",
        "Keep a reference sample in a cabinet with a clear label",
        "Record an unboxing video — evidence for disputes",
        "Order samples through CSR for Trade Assurance + the Sample Center's consolidated shipping",
      ]},
      { type: "quote", text: "$200 spent on 5 samples beats $20,000 in losses on one wrong MOQ order. Investing in samples is the cheapest investment a new buyer can make.", author: "Phạm Quốc Anh — Customer Success Lead" },
    ],
  },
  {
    slug: "vietnam-expo-2026-doan-huayuesc-30-buyer",
    title: "Vietnam Expo 2026 — Huayuesc leads a delegation of 30 buyers",
    excerpt: "April 9-12 at the Hanoi International Exhibition Center. The Huayuesc delegation hosts B2B match-making with 50+ Chinese suppliers visiting Vietnam. Free registration for buyers.",
    category: "hoi-cho",
    author: "CSR Marketing Team",
    authorRole: "Huayuesc",
    date: "2026-03-15",
    readMinutes: 4,
    image: u("1540575467063-178a50c2df87"),
    tags: ["Vietnam Expo", "Hanoi", "B2B", "Match-making"],
    content: [
      { type: "p", text: "Vietnam Expo 2026 — Vietnam's largest international trade event — will run from April 9 to 12, 2026 at the Hanoi International Exhibition Center (148 Giang Vo). Huayuesc will have a booth in hall A2-15 and will host a B2B match-making program for 30 Vietnamese buyers to meet 50+ Chinese suppliers visiting Vietnam." },
      { type: "h2", text: "Why does Vietnam Expo matter?" },
      { type: "p", text: "This is the one time each year when top-tier Chinese suppliers come all the way to Hanoi — buyers do not need to fly to China. In 2026, 50+ suppliers from the Huayuesc ecosystem (Foshan, Guangzhou, Shenzhen, Hangzhou) will attend, bringing new samples and ready to negotiate MOQs directly." },
      { type: "h2", text: "Huayuesc booth program" },
      { type: "list", items: [
        "9am-12pm daily: A sample showcase of 200+ best-selling products for buyers to view in person.",
        "1pm-5pm: B2B match-making — book a 30-minute slot in advance and meet suppliers in your category of interest.",
        "Live audit demo: April 11 and 12, the CSR QC team demonstrates the factory audit process live for buyers.",
        "Networking dinner: April 11, 7pm at the JW Marriott — 100 buyers + 50 suppliers + Huayuesc representatives.",
      ]},
      { type: "img", src: u("1505373877841-8d25f7d46678", 1200, 500), caption: "Vietnam Expo Hanoi 2025 — the Huayuesc booth drew 800+ buyers over 4 days" },
      { type: "h2", text: "30 free delegation spots" },
      { type: "p", text: "Huayuesc sponsors 30 free delegation spots for Vietnamese buyers; each includes: a VIP admission ticket (market price 500K), a 1-on-1 B2B match-making schedule with 5-8 suppliers in your category of interest, a Chinese interpreter (one per buyer) during meetings, the April 11 networking dinner (market price 1.5 million), and 30 days of follow-up support after the Expo." },
      { type: "h2", text: "Registration" },
      { type: "p", text: "Register via /buying-request with the note 'Vietnam Expo 2026' or email events@huayuesc.vn. Priority goes to buyers with revenue of VND 10 billion+/year who are sourcing orders of $20K+. Deadline: March 25, 2026 or when all 30 spots are filled." },
      { type: "quote", text: "Vietnam Expo is home turf for Vietnamese buyers. We bring suppliers all the way to Vietnam instead of making buyers fly to China — saving on visas, flights and time.", author: "Huayuesc Marketing Team" },
    ],
  },
  {
    slug: "phan-tich-pricing-tier-moq-500-vs-100",
    title: "Pricing tier analysis — when should you order MOQ 500 vs 100?",
    excerpt: "The tiered price table is clear, but the decision to order MOQ 100 or 500 is not simple. A detailed analysis of cash flow, warehousing and capital turnover for Vietnamese buyers.",
    category: "huong-dan",
    author: "Lê Hoàng Quân",
    authorRole: "Finance Advisor",
    date: "2026-03-10",
    readMinutes: 6,
    image: u("1565008447742-97f6f38c985c"),
    tags: ["MOQ", "Pricing", "Cash flow", "Guide"],
    content: [
      { type: "p", text: "Most product pages on Huayuesc have a pricing tier with 4 MOQ levels: 1-49, 50-99, 100-499, 500+. New buyers often think 'the 500 tier is 22% cheaper — saving 22% surely means I should order 500'. But the decision is not that simple." },
      { type: "h2", text: "Case analysis: ordering 500 vs 100 office chairs" },
      { type: "p", text: "Suppose buyer A is a Hanoi showroom weighing MOQ 100 chairs ($30/pc = $3,000) against MOQ 500 chairs ($23/pc = $11,500, 22% off)." },
      { type: "table", headers: ["Factor", "MOQ 100", "MOQ 500"], rows: [
        ["T/T deposit 30%", "$900", "$3,450"],
        ["Total capital locked", "$3,000", "$11,500"],
        ["DDP freight to Hanoi", "$320 (~10%)", "$580 (~5%)"],
        ["Total DDP cost", "$3,320", "$12,080"],
        ["DDP cost per chair", "$33.20", "$24.16"],
        ["Savings if fully sold", "—", "$4,520 (27%)"],
        ["Time to sell out (1 chair/day)", "100 days", "500 days = 16 months"],
        ["Warehouse cost over 16 months", "$0 (existing warehouse)", "$1,800 (rent extra space)"],
        ["Capital cost over 16 months (8%/yr interest)", "$0", "$1,200"],
        ["ACTUAL savings", "—", "$1,520 (13%)"],
      ]},
      { type: "p", text: "Analysis: the actual savings are only 13% (not the advertised 22%) after accounting for warehouse cost and 16 months of locked capital. For a slow-turnover showroom, MOQ 500 may be $1,520 CHEAPER but may also be MORE EXPENSIVE if the product goes out of style after 6 months." },
      { type: "h2", text: "When to order a higher MOQ" },
      { type: "list", items: [
        "Core products (office chairs, basic sofas) that sell steadily for 12+ months — turnover is assured.",
        "You have a chain of 5+ showroom stores — splitting MOQ 500 into 100/store sells faster.",
        "Products with a long life cycle (hardware, building materials) — no risk of going out of style.",
        "The buyer has reserve capital — not dependent on the cash flow of this MOQ.",
        "The supplier is running a year-end discount — opportunistic, not always available.",
      ]},
      { type: "img", src: u("1556745757-8d76bdb6984b", 1200, 500), caption: "The MOQ decision is a balance between price savings and inventory risk" },
      { type: "h2", text: "When to order a lower MOQ" },
      { type: "list", items: [
        "Trial products — you do not yet know how the market will respond.",
        "Trend-driven products — fashion, smart devices that can go out of style in 6-9 months.",
        "Newly opened showrooms — need to test demand before committing big.",
        "Tight cash flow — capital should turn over quickly, not be locked up.",
        "A supplier you have never worked with — first-time sourcing, prioritize testing the relationship.",
      ]},
      { type: "h2", text: "Hybrid model: combine 2 buyers into 1 order" },
      { type: "p", text: "Huayuesc often helps 2-3 buyers in the same industry combine orders to reach MOQ 500 and get the better price, while each buyer takes only 100-200. For example: 2 Hanoi showrooms + 1 Hai Phong showroom all order sofas, 150-200 pcs each → 500 total → tier-4 price. The benefit is shared evenly and inventory risk is low. Contact your CSR account manager to arrange it." },
      { type: "quote", text: "Smart buyers do not optimize unit price — they optimize cash-on-cash return. MOQ 100 with a 90-day turnover usually beats MOQ 500 with a 500-day turnover, even at a higher unit price.", author: "Lê Hoàng Quân — Finance Advisor" },
    ],
  },
  {
    slug: "trade-alert-newsletter-12000-buyer-dang-ky",
    title: "Trade Alert — 12,000+ Vietnamese buyers subscribe to the weekly newsletter",
    excerpt: "Trade Alert is Huayuesc's free email newsletter, sent every Thursday with price trends, new products and limited deals. 12,000+ buyers have already subscribed.",
    category: "san-pham-moi",
    author: "CSR Content Team",
    authorRole: "Huayuesc",
    date: "2026-03-05",
    readMinutes: 3,
    image: u("1493946740644-2d8a1f1a6aff"),
    tags: ["Newsletter", "Trade Alert", "Email"],
    content: [
      { type: "p", text: "Huayuesc launched Trade Alert in 2023, and 12,000+ Vietnamese buyers have subscribed to the weekly newsletter. It is a free email channel that keeps buyers up to date on sourcing-industry trends without having to search actively." },
      { type: "h2", text: "What is in each issue" },
      { type: "list", items: [
        "📊 Price trends for 5 key materials (ceramics, wood, metal, plastic, fabric) — updated from the Guangzhou Spot Price Index.",
        "🆕 5 newly launched products from top-tier suppliers — with photos, reference prices and MOQ.",
        "🎯 3-5 limited deals of the week — an 8-15% discount for the first 10 buyers to submit an RFQ.",
        "📅 Trade shows + events in the next 7 days — Vietnam Expo, Canton Fair, ProPak.",
        "📈 1 buyer success case study — learn from other buyers.",
        "❓ Weekly FAQ — questions from other buyers that you may also be wondering about.",
      ]},
      { type: "h2", text: "Send schedule" },
      { type: "p", text: "Every Thursday at 2pm (Hanoi time). The email comes from trade-alert@huayuesc.vn, subject 'Trade Alert #XXX — [weekly highlight]'. Read time 5-7 minutes, a mobile-optimized HTML email with images and CTA links." },
      { type: "h2", text: "Subscribe" },
      { type: "p", text: "Subscribe for free via the Trade Alert banner in the website footer or at /trade-alert. You can unsubscribe at any time — no spam. Bonus: 3 new subscribers each week receive a $50 credit toward their first order (random drawing)." },
      { type: "img", src: u("1497366216548-37526070297c", 1200, 500), caption: "Trade Alert mobile preview — short, scannable, actionable" },
      { type: "p", text: "Trade Alert is part of the Huayuesc spirit: freely sharing knowledge among digital traders. Both new and long-time buyers can learn from it and avoid missing market opportunities." },
    ],
  },
];

export function getArticle(slug: string): BlogArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(cat?: BlogCategory): BlogArticle[] {
  if (!cat) return ARTICLES;
  return ARTICLES.filter((a) => a.category === cat);
}

export function getRelatedArticles(slug: string, limit = 3): BlogArticle[] {
  const article = getArticle(slug);
  if (!article) return [];
  return ARTICLES
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, limit);
}
