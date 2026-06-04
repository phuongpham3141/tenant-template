import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Breadcrumb } from "@/components/category/breadcrumb";

/**
 * Parse a plain-text string with limited inline markup into React nodes.
 * Currently supports:
 *   • <b>…</b> → <b className="font-semibold text-ink">…</b>
 *
 * Other HTML in the source is rendered as plain text (React escapes it).
 */
function renderInlineMarkup(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const rx = /<b>([\s\S]*?)<\/b>/g;
  let cursor = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = rx.exec(text)) !== null) {
    if (m.index > cursor) parts.push(text.slice(cursor, m.index));
    parts.push(
      <b key={`b-${key++}`} className="font-semibold text-ink">
        {m[1]}
      </b>,
    );
    cursor = m.index + m[0].length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

/**
 * Smart paragraph renderer.
 *
 * Scans the paragraph text for inline list markers and, if it finds at
 * least 2 consecutive markers, splits the paragraph into an intro
 * sentence + a `<ul>` of items + optional trailing prose.
 *
 * Patterns supported (tried in order, first match wins):
 *   • (Bước 1) (Bước 2) ...           → step list
 *   • (Cấp 1 — ...) (Cấp 2 — ...) ... → level list
 *   • (a) (b) (c) ...                 → letter list
 *   • (1) (2) (3) ...                 → number list
 *   • (i) (ii) (iii) ...              → roman list
 *
 * For each bullet body we re-run the parser once to catch one level of
 * nested lists (e.g. (Bước 3) contains (a)/(b)/(c) sub-items).
 *
 * Output: <p>intro</p><ul><li><b>marker</b> body</li>…</ul><p>trailing</p>
 */
type ParsedList = {
  intro: string;
  bullets: { label: string; body: string }[];
  trailing: string;
};

function parseInlineList(text: string): ParsedList | null {
  const patterns: { rx: RegExp; minItems: number }[] = [
    { rx: /\((Bước\s+\d+)\)\s+/g, minItems: 2 },
    { rx: /\((Cấp\s+\d+(?:\s+—[^)]*)?)\)\s+/g, minItems: 2 },
    { rx: /(?<=[.\s:;])\(([A-Z])\)\s+/g, minItems: 3 }, // (A) (B) (C) — uppercase letters
    { rx: /(?<=[.\s:;])\(([a-z])\)\s+/g, minItems: 3 }, // (a) (b) (c)
    { rx: /(?<=[.\s:;])\((\d{1,2})\)\s+/g, minItems: 3 }, // (1) (2) (3)
    { rx: /(?<=[.\s:;])\((i{1,3}|iv|v|vi{0,3}|ix|x)\)\s+/g, minItems: 3 }, // (i) (ii) (iii)
  ];

  for (const { rx, minItems } of patterns) {
    const matches = [...text.matchAll(rx)];
    if (matches.length < minItems) continue;

    // Optional: confirm markers are in expected sequence (a,b,c… / 1,2,3…)
    // — skipped here to keep parser permissive; trust the writer's intent.

    const firstStart = matches[0].index!;
    const intro = text.slice(0, firstStart).trim();

    const bullets: { label: string; body: string }[] = [];
    for (let i = 0; i < matches.length; i++) {
      const m = matches[i];
      const start = m.index! + m[0].length;
      const end = i + 1 < matches.length ? matches[i + 1].index! : text.length;
      bullets.push({ label: m[1], body: text.slice(start, end).trim() });
    }

    // We choose NOT to detect "trailing" as a separate paragraph — any
    // sentence after the last marker stays inside the final bullet body.
    return { intro, bullets, trailing: "" };
  }
  return null;
}

/** Render one paragraph. Recurses once for nested lists in bullet bodies. */
function RenderParagraph({ text, depth = 0 }: { text: string; depth?: number }) {
  const parsed = parseInlineList(text);
  if (!parsed) {
    return (
      <p className="text-[14px] text-ink leading-relaxed">
        {renderInlineMarkup(text)}
      </p>
    );
  }
  const { intro, bullets } = parsed;
  return (
    <>
      {intro && (
        <p className="text-[14px] text-ink leading-relaxed mb-2">
          {renderInlineMarkup(intro)}
        </p>
      )}
      <ul
        className={
          depth === 0
            ? "space-y-2 my-3 pl-1"
            : "space-y-1.5 mt-2 ml-2 pl-4 border-l-2 border-line"
        }
      >
        {bullets.map((b, i) => {
          // Recurse only one level to avoid runaway nesting.
          const nested = depth === 0 ? parseInlineList(b.body) : null;
          return (
            <li key={i} className="text-[14px] text-ink leading-relaxed flex gap-2.5">
              <span
                className="font-bold text-brand flex-shrink-0 mt-0.5 min-w-[26px]"
                aria-hidden="true"
              >
                {b.label}.
              </span>
              <div className="flex-1 min-w-0">
                {nested ? (
                  <RenderParagraph text={b.body} depth={1} />
                ) : (
                  <span>{renderInlineMarkup(b.body)}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

type Topic = {
  title: string;
  intro: string;
  paragraphs: string[];
  /** Optional emoji icon shown in the hero banner. */
  icon?: string;
  /** Optional category label for hero (e.g. "VỀ CHÚNG TÔI"). */
  category?: string;
  /** Quick-fact pills displayed under the hero (e.g. founded year, locations). */
  quickFacts?: { label: string; value: string }[];
  /** Optional headings for the body — splits paragraphs into sections of N
   *  Use null entry to keep paragraph without a heading. */
  sectionTitles?: (string | null)[];
  /** Optional pull-quote shown after the first section. */
  pullQuote?: { text: string; author?: string };
  /** Optional checklist bullets after main paragraphs. */
  checklist?: string[];
  faq?: { q: string; a: string }[];
  related?: { label: string; href: string }[];
  /** Primary call-to-action button at end of article. */
  primaryCta?: { label: string; href: string };
};

const TOPICS: Record<string, Topic> = {
  "about-us": {
    title: "Huayuesc 华越供应链 — China–Vietnam supply chain for building materials, furniture & home appliances",
    intro:
      "Huayuesc (华越供应链) is a one-stop supply chain service provider specializing in exporting high-quality building materials, decoration materials and kitchen and bathroom appliances from China into the Vietnamese market. We integrate everything from procurement, warehousing, logistics and customs clearance to distribution and localized marketing — delivering to customers a turnkey supply chain from the China factory to the final point of consumption in Vietnam.",
    icon: "🌏",
    category: "ABOUT HUAYUE",
    quickFacts: [
      { label: "Legal name", value: "Huayue Supply Chain (Vietnam) Co., Ltd." },
      { label: "Tax ID", value: "0111453693" },
      { label: "Vietnam headquarters", value: "Bao Ngoc Building, Xuan Phuong, Hanoi" },
      { label: "China office", value: "Haizhu, Guangzhou" },
      { label: "Hotline", value: "+86 181-2225-6999" },
      { label: "Domain", value: "huayuesc.vn" },
      { label: "Three core industries", value: "Building Materials · Decoration · Kitchen & Bathroom Appliances" },
      { label: "Model", value: "Turnkey B2B" },
    ],
    sectionTitles: [
      "1. Vision — Setting the standard for China–Vietnam supply chain services",
      "2. Four core services — a turnkey supply chain",
      "3. Product areas — three superior Chinese industries",
      "4. Warehousing · Logistics · Customs Clearance",
      "5. Exhibitions & market promotion in Vietnam",
      "6. Supply chain digitization — Data · Automation · Network",
      "7. Mission — Making Chinese manufacturing shine in Vietnam",
    ],
    paragraphs: [
      "Huayuesc's vision is to become a model company for China–Vietnam supply chain services, leading and shaping a new ecosystem for building materials, furniture and home appliance trade between the two countries (成为中越供应链服务的标杆企业, 引领中越建材家居贸易新生态). We are opening a new trade route — bringing high-quality Chinese products from the leading factory clusters of Guangdong, Fujian and Shandong directly to property developers, construction companies, interior design firms and distribution dealers in Vietnam. Customers do not need middlemen and do not need to fly to China; Huayuesc handles every step, from factory selection to delivery at your warehouse.",
      "Huayuesc provides a turnkey supply chain built on four core services. (1) Source vetting and procurement support (源头精选与采购支持) — we help customers screen competitive Chinese suppliers, control quality at the factory, and manage orders with centralized procurement to minimize both cost and risk. (2) Warehousing and consolidated shipping within China (中国境内仓储与集运) — we build or partner with modern warehouses in key industrial parks and ports, providing safe and efficient warehouse management services. (3) Efficient cross-border logistics and customs clearance (跨境物流与高效清关) — offering a range of door-to-door and port-to-port shipping options; in Vietnam, Huayuesc's customs team at Hai Phong port knows import/export law inside out, ensuring fast, compliant and cost-effective clearance. (4) Vietnam distribution channel development (本地化分销渠道拓展) — drawing on our extensive partner network in Vietnam, we bring Chinese brands and products into the main distribution channels in Hanoi, Ho Chi Minh City and key provinces.",
      "Chinese products have clear advantages in competitive pricing, a rich product range, mature production lines and rapid innovation (性价比高、品类丰富、产业链成熟、创新速度快). Huayuesc focuses on three core areas. (i) Building materials (建材) — porcelain ceramic tile, sanitaryware, hardware and metal fittings, door materials and aluminum/PVC profiles, paint and coatings, water pipes and fittings, and lighting fixtures. (ii) Interior decoration materials (装饰材料) — wallpaper and wall fabric, engineered/solid wood flooring, ceiling decoration materials, natural and artificial stone, and home decor items. (iii) Kitchen and bathroom appliances (厨卫小家电) — electric water heaters, gas cooktops, range hoods, rice cookers, high-speed blenders, smart toilet seats and other convenient bathroom devices. Each category has at least 20 partner factories that we have audited on-site and added to our whitelist.",
      "Huayuesc's warehouse infrastructure centers on 'bonded storage' (保税存储), running the entire 'inbound – storage – outbound – customs clearance' cycle on an automated, data-driven basis. We operate three dedicated warehouse types in China: ambient-temperature warehouses for general goods, separate fire-safety-compliant warehouses for flammable materials (paint, thinners, solvents), and climate-controlled warehouses for sensitive electronics. Each warehouse is equipped with container-standard loading docks, sorting and packing tables, and on-site logistics partners. In Vietnam, Huayuesc's customs team integrates directly with the customs system at Hai Phong port — declaration data is transmitted in real time and the declaration process is streamlined, significantly reducing clearance time compared with the traditional self-declaration model.",
      "Huayuesc runs its trade exhibition services on a model of 'contextual brand showcasing + comprehensive professional services' (品牌场景化展示 + 专业服务配套) — creating a convenient trading environment where customers can order directly at the showroom. Each year we host new product launch conferences for Chinese brands and topical forums on eco-friendly building materials and home appliance technology — attracting Vietnamese property developers, construction contractors and interior design firms to attend and place orders on the spot. In parallel, we run structured media campaigns across online and offline channels in Vietnam, bringing Chinese brands closer to local buyers and spreading the core message: 'With Huayue, you do not need to travel to China — you can still source superior Chinese products quickly and conveniently' (无需赴华, 一站式采购中国优质商品).",
      "Huayuesc's entire supply chain is digitized and transparently visible (全流程可视化) — customers track their orders end to end, from raw materials at the production plant to the final consumer in Vietnam. The platform integrates an intelligent, data-driven supply chain system supporting product and market information, payment and foreign-exchange services, and supply-chain finance solutions. Three technology pillars operate in sync: (a) Data-driven decisions (数据驱动决策) — big-data analytics to forecast market demand and optimize inventory; (b) Intelligent automation (智能自动化) — AI algorithms that automatically process orders, coordinate shipping and optimize logistics routes; (c) Collaborative network (协同网络) — a platform linking all suppliers, manufacturers, shipping companies and end retail channels. The result: lower operating costs, higher capital efficiency and sustainable revenue growth for partners.",
      "Huayuesc's mission is, through professional, highly efficient and reliable one-stop supply chain services, to help Chinese manufacturing shine in Vietnam while helping the Vietnamese market advance to a new level (助力中国制造闪耀越南, 赋能越南市场升级发展). We are Huayue Supply Chain (Vietnam) Co., Ltd. — Tax ID 0111453693, headquartered at Bao Ngoc Building, No. 02 Thanh Lam Street, Xuan Phuong Ward, Hanoi, connected directly to our Guangzhou office at 3rd Floor, Building 1, Shuyu Chuangxing Port, North Wharf, Huangpu Village, Xingang East Road (新港东路), Haizhu District, Guangzhou. Reach us directly via hotline +86 181-2225-6999 or send an RFQ on huayuesc.vn to get a DDP quote delivered to your warehouse in Vietnam from our team within 24 hours.",
    ],
    pullQuote: {
      text: "无需赴华，一站式采购中国优质商品 — With Huayue, you do not need to travel to China to source superior Chinese products quickly and conveniently.",
      author: "Huayuesc · 华越供应链",
    },
    checklist: [
      "🏭 Supplier screening + quality control at source (源头精选)",
      "📦 Bonded warehouse (保税仓) — 3 dedicated warehouse types in China's industrial parks and ports",
      "🚢 Door-to-door / port-to-port shipping, direct customs clearance at Hai Phong port",
      "🤝 Distribution network across Vietnam (Hanoi · Ho Chi Minh City · 63 provinces)",
      "🤖 AI route optimization + demand forecasting + inventory optimization",
      "💳 Payment & foreign exchange + supply-chain finance",
      "👁 Fully transparent supply chain — real-time order tracking",
      "📞 24/7 Vietnamese + Chinese support via hotline +86 181-2225-6999",
    ],
    related: [
      { label: "Contact Huayuesc", href: "/info/contact" },
      { label: "Partner Network", href: "/info/network" },
      { label: "Shipping & port policy", href: "/info/shipping-policy" },
      { label: "China factory tour", href: "/factory-tour" },
    ],
    primaryCta: { label: "Send a DDP RFQ", href: "/buying-request" },
  },
  "careers": {
    title: "Careers — Build the China–Vietnam bridge for building materials & furniture with Huayue",
    intro:
      "Huayue (Huayue Supply Chain (Vietnam) Co., Ltd., Tax ID 0111453693) is building a B2B supply chain from leading Guangdong factories to Vietnamese distributors — specializing in building materials, interior decoration materials and kitchen and bathroom appliances. We are looking for hands-on people: procurement staff who know Chinese factories, customs brokers fluent in VNACCS, dealer-channel salespeople who go deep into Vietnam's building materials/furniture distribution channels, and Vietnamese–Chinese interpreters who bind the Hanoi and Guangzhou teams together.",
    icon: "🚀",
    category: "CAREERS",
    quickFacts: [
      { label: "Open positions", value: "15-20 positions" },
      { label: "In Guangzhou", value: "8 Sourcing/QC/Audit roles" },
      { label: "In Hai Phong", value: "10 Operations/Sales/Warehouse roles" },
      { label: "Offices", value: "2 (Hai Phong + Guangzhou)" },
      { label: "Chinese", value: "HSK 4+ for Guangzhou roles" },
      { label: "China travel support", value: "100% covered for Hai Phong roles" },
      { label: "Onboarding", value: "1-month probation with a mentor" },
      { label: "HR contact", value: "hr@huayuesc.vn" },
    ],
    sectionTitles: [
      "1. Mission — Why join Huayue?",
      "2. Huayue culture — Professional · Trustworthy · Efficient",
      "3. Roles in Guangzhou (China) — Sourcing, QC, Audit",
      "4. Roles in Hai Phong (Vietnam) — Operations, Customs, Warehouse, Sales",
      "5. Salary, benefits & career path",
      "6. Application process — 4 steps, 2 weeks",
      "7. A day in the life at Huayue",
    ],
    paragraphs: [
      "Vietnam is one of Southeast Asia's fastest-growing markets for building materials and furniture, yet most businesses still import through middlemen with no quality control at source. Huayue sits in that gap: we are not just a B2B marketplace but a real supply chain — with a procurement team living in Guangzhou who visit factories weekly, and a warehouse and customs team right inside Bao Ngoc Building, Xuan Phuong, Hanoi. At Huayue, you will not 'sit in front of a screen' coding a platform; you will visit factories, inspect containers, negotiate prices by the ton, write Packing Lists in Chinese, file VNACCS declarations as the broker of record, and meet distribution dealers across 63 provinces. Real work — real results — measured by orders delivered on time and satisfied customers.",
      "Huayue's culture rests on three core values: <b>Professional</b> (every process from procurement to warehouse delivery has a clear SOP, cross-checks and written records); <b>Trustworthy</b> (we keep our word to factories and customers alike — never promising what we cannot deliver, never raising prices on the sly, never bypassing QC to rush an order); <b>Efficient</b> (cutting unnecessary steps, automating reports, using data to decide rather than gut feel). We do not enforce rigid hours — salespeople meeting clients can leave early; port brokers work afternoon shifts when containers arrive. No pointless meetings: every meeting of 4 or more people must have an agenda and minutes. The Guangzhou and Hai Phong teams meet weekly by video — Vietnamese in the morning, Chinese in the afternoon; a dedicated interpreter is on hand when needed.",
      "Roles at the Guangzhou office (3rd Floor, Shuyu Chuangxing Port, Haizhu District): <b>Sourcing Manager × 2</b> — responsible for screening and negotiating with Foshan ceramics / Lecong furniture / Zhongshan appliance factories; requires HSK 5+, 3+ years of China sourcing, having visited at least 20 factories. <b>QC Inspector × 3</b> — AQL 2.5 inspection before shipment, working directly at factories, writing photo/video reports; porcelain tile or wood furniture experience preferred. <b>Supplier Auditor × 1</b> — assessing production capacity, occupational health and safety, and environmental compliance; a technical background is required. <b>Vietnamese–Chinese Trade Interpreter × 1</b> — HSK 6, fluent in building materials/furniture industry terminology, accompanying Vietnamese buyer delegations to factories. <b>Logistics Coordinator (Guangzhou) × 1</b> — booking containers and working with carriers COSCO/MSC/OOCL out of Huangpu/Yantian/Shekou ports.",
      "Roles at the Hanoi headquarters (Bao Ngoc Building, No. 02 Thanh Lam Street, Xuan Phuong Ward): <b>Customs Broker × 2</b> — VNACCS/VCIS expert, 3+ years broker license, familiar with HS codes for Huayue's 3 industries and ACFTA/RCEP preferences. <b>Warehouse Manager × 1</b> — managing the bonded warehouse, inventory and container inspection; with fire-safety certification for the paint store. <b>Forklift Operator × 2</b> — class B/C license, experience in import-container warehouses. <b>Building Materials Distribution Sales × 2</b> — dealer sales of porcelain tile/sanitaryware/paint across the northern and central provinces; experience in building materials distribution preferred. <b>Furniture Distribution Sales × 2</b> — sales of wood furniture/sofas/kitchen cabinets to construction contractors, design firms and furniture dealers. <b>Appliance Distribution Sales × 1</b> — electric water heaters, gas cooktops, range hoods and smart toilet seats for appliance dealers. <b>B2B Marketing × 1</b> — Vietnamese-language content for the website, social media and product launch events in Vietnam. Full job descriptions with min/max salary are sent by email when you contact hr@huayuesc.vn.",
      "Salary & benefits (real Vietnam/China market rates): Guangzhou — base salary benchmarked to Guangdong rates for Vietnamese working in China (30-50% higher than the equivalent in Vietnam), with full room and board (dormitory or housing allowance) and China health insurance plus international health coverage. Hai Phong — base salary in the top 25% of the Hai Phong market for each role; salespeople also earn 1-3% commission on the value of successfully delivered orders, uncapped. Common benefits: full social/health/unemployment insurance under Vietnamese law (or Chinese law for Guangzhou roles), additional health insurance for family, a 13th-month Tet bonus, and quarterly KPI bonuses of 10-20% of salary. Chinese language support (HSK 4-6) for Hai Phong staff (Huayue funds 100% of tuition for courses in Hanoi/Hai Phong). Hai Phong staff travel to Guangzhou 1-2 times a year — Huayue covers 100% of visa, flights, hotel and per diem. Career path: Staff → Specialist → Team Lead → Department Head → Office Manager; a 15-25% salary increase per level; performance reviews every 6 months.",
      "Application process (4 steps, 2 weeks): (1) Send your CV by email to <b>hr@huayuesc.vn</b> with the subject '[Role title] - [Candidate name] - [Office applied for: Hai Phong or Guangzhou]'. Attach a CV in Vietnamese plus Chinese if applying for a Guangzhou role. (2) HR responds within 3-5 business days — we commit to a 100% response rate, no ghosting. (3) Interview in person/online with HR (30 minutes) plus the department head (60 minutes) — sales tested with a roleplay against a tough client, brokers tested with an HS-code declaration case, sourcing tested with a price-negotiation scenario with a factory. (4) A 1-month probation with 1-on-1 mentoring — an end-of-period review for conversion to permanent. An offer within 5-7 days of the final interview. Negotiable — Huayue respects transparent salary dialogue.",
      "A day at Huayue Guangzhou (Sourcing Manager): 8:30 arrive at the office on the 3rd Floor of Shuyu Chuangxing Port and check overnight emails from Vietnamese buyers. 9:00 head to a porcelain tile factory in Foshan (a 45-minute drive) with a QC Inspector — checking the quality of a 500 m² order for a Hanoi dealer. 12:00 lunch with the factory representative, negotiating the price of the next order. 14:30 back at the office, writing the PI in Chinese for the factory plus a Vietnamese translation for the buyer. 16:00 video call with the Hanoi team — syncing the status of containers in transit. 17:30 wrap up. A day at Huayue Hanoi (Customs Broker): 7:30 arrive at Bao Ngoc Building, Xuan Phuong, Hanoi, and review the list of containers arriving at port today. 8:30 receive documents from Guangzhou (B/L, Packing List, Invoice, C/O Form E). 9:00 file the VNACCS declaration — integrated directly with the General Department of Customs system, with clearance orders usually issued within 2-4 hours. 13:00 coordinate the warehouse team to unload the container and inspect the shipment. 15:00 hand the goods to trucks for delivery to customer warehouses in Hanoi/Ho Chi Minh City. 17:30 done.",
    ],
    pullQuote: {
      text: "We do not hire people to 'join a hot startup'. We hire people to bring every order home together — on time, to spec — and to keep doing that for the next 10 years. If you like real work, clear responsibilities and measurable results, send us your CV.",
      author: "Recruitment Team — Huayue Vietnam",
    },
    checklist: [
      "💰 Top 25% Hai Phong/Guangdong market salary + uncapped 1-3% sales commission",
      "🏥 Full social/health/unemployment insurance + additional family health coverage",
      "🇨🇳 100% funding for Chinese language study (HSK 4-6) for Hai Phong staff",
      "✈️ Guangzhou business trips 1-2 times a year — 100% covered by Huayue",
      "🏠 Guangzhou roles: dormitory or housing allowance + China health insurance",
      "📚 Internal SOP training + VNACCS broker certification (Hai Phong) + AQL Inspector (Guangzhou)",
      "🤝 Commitment to a 100% candidate response rate within 3-5 days, no ghosting",
      "📈 A clear career path — performance reviews every 6 months",
    ],
    faq: [
      {
        q: "I want to apply for a Guangzhou role — do I have to already live in China, or does Huayue help with relocation?",
        a: "Huayue helps arrange a work visa (Z-visa) and residence permit for candidates offered a Guangzhou role. There is a relocation package of VND 50-100 million (flights, moving belongings, first-month rental deposit). Requirements: HSK 5+ and having visited China at least once. Candidates with prior sourcing/QC experience in China are preferred.",
      },
      {
        q: "I do not speak Chinese — are there suitable roles in Hai Phong?",
        a: "Yes. Customs Broker, Warehouse Manager, Forklift Operator, Distribution Sales and B2B Marketing all do NOT require Chinese — only Vietnamese plus basic business English. Huayue funds Chinese language study (HSK 4-6) for staff who want to grow; after 1-2 years you may be transferred to a Guangzhou role.",
      },
      {
        q: "What is the specific salary for each role?",
        a: "Huayue sends the specific min-max salary by email when you apply, based on the Hai Phong market (for Vietnam roles) or the Guangdong market (for China roles) and your actual experience. For reference: Customs Broker VND 18-30 million + KPI bonus · Distribution Sales VND 12-20 million + 1-3% commission · Guangzhou Sourcing Manager CNY 12,000-20,000 + room and board + insurance.",
      },
      {
        q: "I currently work for a company in the same industry — is there a conflict of interest?",
        a: "When you accept an offer, you will sign a standard NDA covering factory/customer information. You are not barred from moving to a competitor after leaving (Huayue has no hard non-compete under Vietnamese law), but you are required to keep the supplier list and negotiated prices confidential for 12 months.",
      },
      {
        q: "Is there an internship / fresher program?",
        a: "Yes. We take on 4-6 interns a year for Sales/Marketing/Logistics roles in Hai Phong. The term is 3-6 months, with a salary of VND 5-8 million/month plus the chance to convert to a permanent role if it is a good fit. We recruit in March and September each year. Send your CV to hr@huayuesc.vn with a subject beginning '[Internship]'.",
      },
      {
        q: "Does Huayue hire foreign nationals?",
        a: "Yes for Guangzhou roles (local Chinese nationals are preferred). Hai Phong roles prioritize Vietnamese nationals because local market knowledge is required. In special cases (rare skills such as specialized bilingual interpreting), Huayue can sponsor a work permit per Ministry of Labour regulations.",
      },
    ],
    related: [
      { label: "Contact Huayue", href: "/info/contact" },
      { label: "Company profile", href: "/info/about-us" },
      { label: "Partner Network", href: "/info/network" },
      { label: "Two offices — Guangzhou + Hai Phong", href: "/info/contact" },
    ],
    primaryCta: { label: "Send your CV — hr@huayuesc.vn", href: "mailto:hr@huayuesc.vn" },
  },
  "terms-of-service": {
    title: "Terms of Service — Huayuesc",
    intro:
      "This is a binding legal agreement between you and Huayuesc — the trade name of Huayue Supply Chain (Vietnam) Co., Ltd. (Tax ID 0111453693), headquartered at Floor 07, Bao Ngoc Building, No. 02 Thanh Lam Street, Xuan Phuong Ward, Hanoi, Vietnam. Please read it carefully before using the platform. By registering an account, sending an RFQ, or making any transaction on the platform, you confirm that you have understood, accepted and agreed to be bound by all of the terms below.",
    icon: "📜",
    category: "LEGAL",
    quickFacts: [
      { label: "Version", value: "v1.0 (2026)" },
      { label: "Effective from", value: "01/01/2026" },
      { label: "Governing law", value: "Vietnamese law" },
      { label: "Arbitration", value: "VIAC Hanoi" },
      { label: "Liability cap", value: "$10,000 / transaction" },
      { label: "Notice period", value: "30 days" },
      { label: "Refund policy", value: "100% via Trade Assurance" },
      { label: "Legal entity", value: "Huayue Supply Chain (Vietnam) Co., Ltd. (Tax ID 0111453693)" },
    ],
    sectionTitles: [
      "1. Scope & Definitions",
      "2. Account Registration & Verification",
      "3. Buyer Rights & Obligations",
      "4. Supplier Rights & Obligations",
      "5. Transactions, Payment & Trade Assurance",
      "6. Shipping, Customs & Taxes",
      "7. Refunds, Exchanges & Compensation",
      "8. Intellectual Property & Prohibited Conduct",
      "9. Privacy, Cookies & Personal Data",
      "10. Liability & Legal Limitations",
      "11. Force Majeure",
      "12. Disputes, Arbitration & Governing Law",
      "13. Termination & Account Closure",
      "14. Amendments & Notices",
    ],
    paragraphs: [
      "Huayuesc (hereinafter 'Huayue' or the 'Platform') is a B2B supply chain platform connecting buyers in Vietnam with suppliers of building materials, interior decoration materials and kitchen and bathroom appliances in China. Huayue operates at the domain huayuesc.vn together with supporting mobile apps. Primary legal entity: Huayue Supply Chain (Vietnam) Co., Ltd. (Tax ID 0111453693), headquartered at Floor 07, Bao Ngoc Building, No. 02 Thanh Lam Street, Xuan Phuong Ward, Hanoi; with a procurement representative office at 3rd Floor, Building 1, Shuyu Chuangxing Port (数娱创兴港), Xingang East Road (新港东路), Haizhu District, Guangzhou, China. Huayue provides a turnkey service chain: source vetting and procurement support, warehousing in China, cross-border logistics and customs clearance, and distribution channel development in Vietnam — with Trade Assurance on every order. Huayue does NOT own suppliers' goods and is NOT a direct seller, but acts as an intermediary supply chain + logistics service + factory audit provider. Users fall into 4 groups: (a) Visitor — not registered, can view public content. (b) Buyer — Vietnamese individuals/businesses purchasing goods (must be 18 or older, with a legal representative if acting on behalf of a business). (c) Supplier — a supplier that Huayue has audited on-site at the factory. (d) Partner — a strategic partner (logistics, payment, certification, distribution).",
      "Account registration requires accurate information: full name, email, mobile phone number (OTP-verified), company and tax ID (for businesses), and a delivery address in Vietnam. Each individual may create at most 1 Buyer account; a business may have 1 master account plus up to 10 sub-accounts for staff. Huayue performs KYC (Know Your Customer) for every transaction of $10,000 USD or more under Vietnam's Anti-Money-Laundering Law — Buyers must provide a business license and the legal representative's national ID. You are responsible for keeping your password secure and not sharing your account — Huayue is not liable for losses caused by your disclosure of login credentials. We recommend enabling 2FA at /buyer-center/settings/security. Huayue may suspend or terminate an account (per the process in Section 13) for: fraudulent information, spam, copyright infringement, abuse of Trade Assurance, breach of these terms, or upon lawful request from the authorities.",
      "Buyer rights: (i) Free access to the entire platform — NO membership fee, transaction fee or commission. (ii) Unlimited RFQs to verified Suppliers. (iii) Free use of Trade Assurance on every order of $100 or more. (iv) Free on-site factory audits for orders of $5,000 USD or more (carried out by the Huayue Guangzhou team). (v) Vietnamese-language Customer Success support via hotline +86 181-2225-6999 and email support@huayuesc.vn. (vi) The right to file a complaint within 7 days of receiving goods. (vii) The right to access, correct and delete personal data under Decree 13/2023. Buyer obligations: (a) Provide accurate information at registration and during transactions. (b) Comply with Vietnamese law (in particular: no importing counterfeit, prohibited, or IP-infringing goods registered in Vietnam). (c) Pay in full and on time per the signed PI/PO. (d) Respond to goods-confirmation requests within 14 days of delivery (after which the system auto-releases). (e) Do NOT use the platform for illegal activity (money laundering, tax evasion, trade fraud).",
      "Supplier rights: (i) List products and receive RFQs from Vietnamese Buyers in Huayue's 3 focus industries (building materials, decoration materials, kitchen and bathroom appliances). (ii) Enjoy competitive commission rates (5% for standard orders, 3% for strategic partners). (iii) The right to pre-screen Buyers — declining orders beyond their production capacity. (iv) Marketing support in Vietnam (Vietnamese landing pages, catalog translation, participation in product launch conferences). (v) On-site audit reports that carry marketing value for buyers. Supplier obligations: (a) Pass the Huayue Guangzhou team's on-site audit before going live. (b) Keep prices, MOQ and lead times accurate. (c) Respond to RFQs within 24 hours. (d) Manufacture and deliver per the signed PO, with no unannounced spec changes. (e) Cooperate with Huayue's QC inspector before shipment. (f) Do not bypass the platform (contacting Buyers outside Huayue to transact directly is prohibited — a violation results in permanent loss of partner status plus a penalty of 5% of order value).",
      "Every transaction of $100 USD or more on Huayue is protected by Trade Assurance — the platform's core differentiator. Mechanism: (1) The Buyer pays a 30% T/T deposit plus the 70% balance into Huayue's escrow account at partner banks in Vietnam and China. (2) Funds are NOT released to the Supplier until: the Buyer confirms the goods match the description via the dashboard, OR 14 days pass after delivery without a Buyer response (auto-release), OR a dispute is resolved per Section 7. (3) Service fee: Huayue charges a 5% commission from the Supplier (NOT from the Buyer). (4) Supported payment methods: T/T (telegraphic transfer), Letter of Credit (L/C — for orders of $100K or more), international online banking via fintech partners (for small orders under $5K). (5) Exchange rate: per the real-time reference interbank rate, with a 0.5% buffer against fluctuation. (6) Bank fees: the Buyer pays the outgoing transfer fee (~0.1-0.3%); the Supplier pays the incoming receipt fee.",
      "Shipping complies with Incoterms 2020 (FOB / CIF / DDP) — details at /info/shipping-policy. Customs: Huayue's customs team at Hai Phong port acts as the declaring entity of record (under the Buyer's authorization), integrated directly with Vietnam's General Department of Customs e-customs system (VNACCS/VCIS). Import duty: calculated by the exact HS code plus the Ministry of Finance's MFN tariff (goods from China enjoy ACFTA and RCEP preferences — a reduction of 0-10%). VAT: 10% on the CIF price plus import duty. Special consumption tax: not applicable to Huayue's 3 industries (building materials, interior decoration, kitchen and bathroom appliances). Clearance fee: $80-150 per shipment, already included in DDP. Buyer responsibilities: provide accurate HS-code information, ensure goods are not on the Prohibited Imports List (Appendix to Decree 69/2018/NĐ-CP), and pay the difference if customs re-classifies the HS code into a higher duty (Huayue notifies in advance; the Buyer has 7 days to respond).",
      "Trade Assurance — Refund Policy: The Buyer may request a refund, exchange or compensation if goods do not match what was promised. Process: (Step 1) File a complaint via the dashboard or support@huayuesc.vn WITHIN 7 DAYS of receiving goods, with evidence (photos, video, acceptance record). (Step 2) Huayue's Trade Assurance team reviews within 24 hours and contacts the Buyer and Supplier to verify; the Guangzhou team may inspect the factory if needed. (Step 3) A decision within 3-7 business days with 4 options: (a) 100% refund from escrow — if goods seriously misrepresent the description (wrong SKU, wrong type). (b) Free exchange — the Supplier re-manufactures plus free DDP to Vietnam, with a committed new delivery time. (c) Negotiated compensation — an X% discount if the defect is minor and the Buyer agrees to keep the goods. (d) A discount credit on the next order — the Buyer applies credit to a later purchase. If a dispute cannot be settled within 21 days, it escalates to VIAC arbitration per Section 12.",
      "All content created by Huayue (interface, code, brand identity, documents, original images, video, blog posts) is copyrighted by Huayue Supply Chain (Vietnam) Co., Ltd. Users may view and print it for personal or internal business use; they may NOT copy, distribute, modify or reverse-engineer it without written consent. Product images uploaded by Suppliers are copyrighted by the Supplier — Buyers may use them only to resell that Supplier's product (not for other products). The 'Huayuesc' and '华越供应链' logos are in the process of trademark registration at the Intellectual Property Office of Vietnam. Prohibited conduct: scraping the platform (rate limit + WAF), mass-creating fake accounts, disorganized RFQ spam, posting content that infringes IP/is pornographic/violent, defrauding other Buyers, threatening or harassing Huayue staff. Violations are handled under Vietnam's Intellectual Property Law plus the Criminal Code where necessary.",
      "Huayue collects and processes personal data per the detailed Privacy Policy at /info/privacy-policy — complying with Decree 13/2023/NĐ-CP, PIPL 2021 and GDPR where applicable. Users have 11 basic rights (access, correction, deletion, restriction of processing, portability, etc.) — send requests to privacy@huayuesc.vn. Cross-border Vietnam–China data transfers between the Hanoi headquarters and the Guangzhou representative office are protected by Standard Contractual Clauses (SCCs); Huayue is in the process of completing its cross-border data transfer registration with the Authority of Information Security under Article 25 of Decree 13/2023. Cookies: 4 groups (essential / analytics / marketing / partner), with a consent banner offering 3 options. Huayue does NOT sell data to data brokers. Transaction records are retained for 10 years under Vietnam's Tax Administration Law. When a Buyer closes their account: hard-delete within 30 days plus a Certificate of Erasure on request.",
      "Huayue's liability is limited to providing the platform plus supply chain services under these terms. Huayue targets uptime of 99.5% or higher (measured on huayuesc-status.io) but does NOT guarantee 100% continuity — interruptions for scheduled maintenance are announced 48 hours in advance. Huayue provides Supplier information based on actual factory audits but does NOT guarantee it absolutely — Buyers are responsible for additional due diligence where needed (especially for orders of $50K or more). Huayue's maximum compensation liability per transaction is limited to: (a) the value of that transaction, or (b) $10,000 USD, whichever is lower. Huayue is NOT liable for indirect damages such as: lost expected revenue, brand reputation damage, loss of end customers, opportunity cost, or interest incurred due to delay. Where Huayue commits a willful breach (gross negligence/willful misconduct), this limit does not apply, per Article 442 of Vietnam's Civil Code.",
      "Force Majeure: Huayue, the Buyer and the Supplier are released from liability for failure to perform obligations due to events beyond their reasonable control, including but not limited to: (i) Natural disasters (earthquake, flood, storm, fire). (ii) War, terrorism, riots, public strikes. (iii) National infrastructure failures (international internet cable cuts, widespread power outages, closure of the Huu Nghi / Mong Cai border gates or Hai Phong port). (iv) Large-scale pandemic (COVID-style lockdown). (v) Government decisions/orders (embargoes, sudden tax policy changes, temporary suspension of a manufacturing sector). (vi) National-scale cyberattacks. The party affected by force majeure must notify the other within 5 days of the event. If the event lasts more than 60 days, the parties may negotiate to cancel the contract plus refund deposits in proportion to work completed.",
      "Disputes are resolved in 3 tiers: (Tier 1 — Mediation at Huayue) Huayue's Dispute Resolution team mediates between Buyer and Supplier within 7 business days; the Guangzhou team helps verify at the factory if needed. Free. (Tier 2 — VIAC Arbitration) If no settlement is reached, the case escalates to the Vietnam International Arbitration Centre (VIAC) in Hanoi under the current VIAC rules of arbitration. Language: Vietnamese (default) or English (by agreement). Number of arbitrators: 1 (for disputes under $50K), 3 (for $50K or more). Arbitration fees follow the VIAC fee schedule (~3-5% of the disputed value), allocated by the ruling. The VIAC decision is FINAL and BINDING, enforceable in Vietnam and China under the 1958 New York Convention. (Tier 3 — Courts) Disputes between Users and Huayue (unrelated to transactions) are governed by Vietnamese law, with the competent court being the People's Court of Hanoi. Huayue does NOT accept class-action lawsuits — each dispute is resolved individually.",
      "Account termination: (a) Voluntary closure by the User — at any time via /buyer-center/settings, completed within 7 business days, with data retained 90 days to finish any pending transactions and then hard-deleted. (b) Termination by Huayue for User breach — written notice by email 7 days before it takes effect, except in emergencies (fraud, cyberattack). The User has 7 days to explain or remediate. (c) Termination by Huayue for legal violations — applied immediately, without prior notice; Huayue may cooperate with investigative authorities. After termination: the account is deactivated and cannot log in; pending transactions are still completed per the escrow status; the Buyer's deposit is refunded per Section 7; the Supplier's commission is settled per POs signed before termination.",
      "Huayue may amend these terms to keep them in line with the law, technology and business realities. Process: (i) Drafting plus internal review plus legal counsel sign-off. (ii) Notifying users 30 DAYS before the change takes effect via: email to every active account, a banner on the website and app, and a mobile app push notification. (iii) Continued use of the platform after the effective date = acceptance of the new terms. Users who disagree may close their account before the effective date — with no fee, and data fully deleted per Section 13. (iv) Old versions are archived at /info/terms-of-service/lich-su for reference. (v) For material changes affecting user rights (e.g. raising the commission rate, changing the liability cap), Huayue requires explicit re-consent — they do not apply automatically.",
    ],
    pullQuote: {
      text: "Terms of service are not about protecting us from you — they are about clearly defining how Huayue, Buyer and Supplier collaborate fairly. Transparency is the foundation of B2B trust.",
      author: "Legal Counsel — Huayue Vietnam",
    },
    checklist: [
      "Legal entity Huayue Supply Chain (Vietnam) Co., Ltd. — Tax ID 0111453693, fully registered",
      "Headquarters: Bao Ngoc Building, Xuan Phuong, Hanoi · Representative office: Guangzhou, China",
      "Compliance with Vietnamese law: Civil Code, Commercial Law, Tax Administration Law, Decree 13/2023, Decree 69/2018",
      "Trade Assurance via escrow at partner banks in Vietnam and China",
      "3-tier arbitration: Huayue Mediation → VIAC Hanoi → People's Court of Hanoi",
      "Liability cap of $10K or the transaction value (whichever is lower) — per Article 442 of Vietnam's Civil Code",
      "Comprehensive force majeure clause — protecting all 3 parties in uncontrollable events",
      "30-day notice for material changes + explicit re-consent",
    ],
    faq: [
      {
        q: "Can I decline the terms?",
        a: "Yes. If you do not agree, do not register an account or transact. You can still view public content (products, blog, info pages) as a Visitor without being bound by the transaction terms.",
      },
      {
        q: "Do the terms apply to individual Buyers?",
        a: "Yes, but Huayue prioritizes service for business Buyers (with a tax ID). Individual Buyers may transact but are limited to $5,000 USD per order (per anti-money-laundering rules), and some enterprise services (free factory audits, a dedicated account manager) do not apply.",
      },
      {
        q: "Does the $10K liability cap apply in all cases?",
        a: "No. The cap does not apply when Huayue commits a willful breach (gross negligence/willful misconduct) or where Vietnamese law imposes unlimited liability (Article 442 of the Civil Code — contract breach involving fraud).",
      },
      {
        q: "Can I sue Huayue in China?",
        a: "Under these terms, all disputes are resolved in Vietnam (VIAC Hanoi or the People's Court of Hanoi). However, VIAC decisions are enforceable in China under the 1958 New York Convention, so a Buyer can seek enforcement in China if needed.",
      },
      {
        q: "Can Huayue change the commission rate suddenly?",
        a: "No. Changing the commission rate (currently 5%) is a material change affecting Supplier rights — it requires 30 days' notice plus the right to opt out (closing the account before the effective date, with no penalty).",
      },
    ],
    related: [
      { label: "Privacy Policy", href: "/info/privacy-policy" },
      { label: "Payment Protection", href: "/info/payment-protection" },
      { label: "Complaints & Disputes", href: "/info/disputes" },
      { label: "Shipping Policy", href: "/info/shipping-policy" },
      { label: "Contact Huayue", href: "/info/contact" },
    ],
    primaryCta: { label: "Have questions? Contact Legal", href: "/info/contact" },
  },
  "privacy-policy": {
    title: "Privacy Policy & Personal Data Protection",
    intro:
      "Huayuesc — the trade name of Huayue Supply Chain (Vietnam) Co., Ltd. (Tax ID 0111453693) — is committed to protecting user data to the ISO/IEC 27001:2022 standard, Vietnam's Decree 13/2023/NĐ-CP, China's Personal Information Protection Law (PIPL) and the EU's GDPR where applicable. This policy describes how we collect, use, store, share and protect your personal data — in clear language, with nothing hidden.",
    icon: "🔒",
    category: "LEGAL",
    quickFacts: [
      { label: "Version", value: "v1.0 (2026)" },
      { label: "Effective from", value: "01/01/2026" },
      { label: "Controlling entity", value: "Huayue Supply Chain (Vietnam) Co., Ltd. (Tax ID 0111453693)" },
      { label: "Vietnam compliance", value: "Decree 13/2023" },
      { label: "China compliance", value: "PIPL 2021" },
      { label: "Encryption", value: "TLS 1.3 + AES-256" },
      { label: "DPO email", value: "privacy@huayuesc.vn" },
      { label: "DPO hotline", value: "+86 181-2225-6999" },
    ],
    sectionTitles: [
      "1. Scope & Definitions",
      "2. Information We Collect",
      "3. Purposes & Legal Basis for Processing",
      "4. Cookies & Tracking Technologies",
      "5. Sharing with Third Parties",
      "6. Cross-Border Vietnam–China Data Transfers",
      "7. Storage & Data Lifecycle",
      "8. Technical & Organizational Security Measures",
      "9. Your 11 Rights under Decree 13/2023",
      "10. Protection of Children Under 16",
      "11. Data Incidents & Notification Process",
      "12. Policy Amendments & DPO Contact",
    ],
    paragraphs: [
      "This policy applies to all services at Huayuesc (huayuesc.vn), including the B2B website, the mobile app (iOS/Android coming soon), and every offline interaction with the Huayue team at the Hanoi headquarters and the Guangzhou procurement representative office. Definitions: 'Personal data' = information that can directly or indirectly identify an individual (per Article 2 of Decree 13/2023). 'User' = Buyer (Vietnamese individual/business), Supplier (Chinese supplier), Visitor (not registered). 'Data controller' = Huayue Supply Chain (Vietnam) Co., Ltd. (Tax ID 0111453693, headquartered at Bao Ngoc Building, Xuan Phuong, Hanoi). 'Data processor' = authorized service providers (cloud hosting, payment processors, logistics partners). 'Consent' = informed, voluntary and explicit approval per Article 11 of Decree 13/2023.",
      "We collect 5 main data groups: (A) Account information — full name, email, phone number, company, tax ID, delivery address, password (bcrypt-hashed). (B) Transaction information — RFQs, orders, favorited products, payment history (status only, no card numbers stored — handled by the partner payment processor), tracking numbers, dispute history. (C) Device & log information — IP address, user agent, OS, browser, language, access time, pages viewed (kept 90 days for analytics and security audit). (D) Communication content — chat with suppliers via the platform, video call transcripts (saved only when the user confirms), email sent through the system, and review comments. (E) Third-party information — when signing in via Google/Apple/Facebook, Huayue receives: email, name, avatar (only the fields you agree to share via the OAuth consent screen). We do NOT collect: national ID/passport numbers (except when KYC is required for transactions of $10K or more), biometric data, medical data, religion or political opinions (per the definition of 'sensitive personal data' in Article 2.4 of Decree 13/2023).",
      "Huayue processes data on 4 legal bases under Article 11 of Decree 13/2023: (1) Consent — you check 'I agree' at registration and may withdraw at any time. (2) Contract performance — processing data needed to provide the agreed B2B services (RFQs, ordering, shipping, after-sales). (3) Legal obligation — retaining tax records for 10 years under Vietnam's Tax Administration Law, and storing e-invoices under Decree 123/2020/NĐ-CP. (4) Legitimate interest — fraud prevention, system security, product improvement (only where it does not infringe your fundamental rights). Specific purposes: providing and personalizing services, connecting Buyers and Suppliers, processing payment and shipping, sending transaction notifications, preventing fraud/abuse, improving products through aggregate-data analysis, marketing (only with the Buyer's opt-in consent), and complying with the law and requests from authorities.",
      "Huayuesc uses 4 cookie groups with a clear policy and a cookie management panel at /info/quan-ly-cookies: (a) Essential cookies — maintain login, the RFQ cart and language; no consent required under Article 6 of Decree 13/2023 (necessary for service). Examples: csr_session, csr_locale, csr_csrf. (b) Analytics cookies — Google Analytics 4 (anonymized IP), Hotjar session replay (masks sensitive fields), Mixpanel funnel. Opt-in required. Kept 24 months. (c) Marketing cookies — Facebook Pixel, Google Ads, LinkedIn Insight, TikTok Pixel. Opt-in required. Kept 12 months. (d) Supplier partner cookies — activated only when you click into a Supplier's product page (rare). A cookie consent banner appears on your first visit, with 3 options: Accept all / Essential only / Customize. You can change your choice at any time at /buyer-center/settings/privacy.",
      "Huayue shares data with 5 third-party groups, each bound by a Data Processing Agreement (DPA) requiring compliance with Decree 13/2023 plus GDPR-equivalent standards: (1) Suppliers — only the minimum information needed to complete the order is shared (contact name, company, delivery address, requested SKU); email and phone are NOT shared directly — all communication goes through Huayue's relay. (2) Partner banks in Vietnam and China for the Trade Assurance escrow service; payment processors for international payments — they see only the minimum information needed to process the transaction and meet KYC. (3) Logistics partners and the Hai Phong port customs partner — delivery address, tracking number and customs declaration contents are shared. (4) Service providers — AWS Singapore (hosting), Cloudflare (CDN, anti-DDoS), Twilio (SMS OTP), SendGrid (transactional email), Sentry (error tracking, scrubs PII). (5) Government authorities — only upon a lawful written request (a search order, a prosecution notice); Huayue publishes an annual Transparency Report on the number of requests received. We NEVER sell data to data brokers or third parties for marketing.",
      "Huayue operates across the Vietnam–China border: Vietnamese Buyer data may be transferred to the Guangzhou procurement representative office so the Huayue team can support sourcing, factory audits, goods inspection and dispute handling. Cross-border data transfers are protected by 3 layers: (i) Standard Contractual Clauses (SCCs) — an internal instrument between the Hanoi headquarters and the Guangzhou representative office of Huayue Supply Chain (Vietnam) Co., Ltd., conforming to the reference template from Vietnam's Ministry of Justice. (ii) Encryption-in-transit — all Vietnam↔China traffic over TLS 1.3 with certificate pinning, cannot be intercepted. (iii) Cross-border data transfer registration with the Authority of Information Security under Article 25 of Decree 13/2023 — Huayue is in the process of completing this registration. You have the right to ask Huayue NOT to transfer your data to China — we will respect this but may have to limit the on-site factory audit service (which is carried out by the Guangzhou team).",
      "Personal data lifecycle at Huayue follows the 'minimum necessary' principle: (a) Active accounts — stored continuously, updated at your request. (b) Accounts inactive for 18 months or more — a warning email is sent plus automatic deletion if there is no response within the next 90 days. (c) Completed orders — details kept 7 years per Vietnamese tax obligations, then anonymized. (d) Transaction records and invoices — kept 10 years under the Tax Administration Law. (e) Communication logs (chat, email) — kept 24 months for dispute resolution, then permanently deleted. (f) Server logs — 90 days, then aggregated into analytics reports (no PII). (g) Cookies — per the time-to-live noted in Section 4. When you request account deletion (a right in Section 9), Huayue hard-deletes within 30 days plus email confirmation plus a 'Certificate of Erasure' on request (for businesses that need an audit trail).",
      "Technical security measures: (1) Transport encryption — TLS 1.3 with forward secrecy, HSTS preload, certificate transparency monitoring. (2) Storage encryption — AES-256-GCM for the database at rest, key management via AWS KMS with 90-day key rotation. (3) Password hashing — bcrypt with work factor 12 plus per-user salt plus pepper. (4) Intrusion detection — Cloudflare layer-7 WAF, AI anomaly detection for login patterns, rate limiting that automatically blocks brute-force attacks. (5) Internal access control — principle of least privilege, role-based access control (RBAC), mandatory 2FA for every Huayue employee with production access. (6) Audit logging — all data access is logged with timestamp, IP, user and action; logs are kept on a write-once system for 12 months. (7) Penetration testing — twice a year by an independent security partner. (8) Bug bounty program — report vulnerabilities to privacy@huayuesc.vn for a reward of $100-5,000 depending on severity. Organizational measures: Huayue staff sign an NDA and attend quarterly security training; the AWS Singapore and Vietnam data centers are ISO 27001 certified; the incident response process has an RTO of 4h and RPO of 1h; automatic backups run hourly plus offsite daily.",
      "Under Articles 9–22 of Decree 13/2023, you have 11 basic rights over your personal data: (1) Right to be informed — knowing what data is collected, why, and for how long. (2) Right to consent — approving or declining processing. (3) Right of access — requesting to view your data (exported as JSON/CSV within 30 days). (4) Right to withdraw consent — at any time, without explanation. (5) Right to erasure — 'right to be forgotten', deleting your account and all data within 30 days (except records that must be kept under tax law). (6) Right to restrict processing — asking Huayue to temporarily halt data processing while a complaint is resolved. (7) Right to data portability — requesting transfer of your data to another provider. (8) Right to object — objecting to processing for marketing or profiling. (9) Right to complain — filing a complaint with the Authority of Information Security (Ministry of Information & Communications) or with us. (10) Right to claim damages — if a Huayue violation causes harm. (11) Right to self-protection — taking your own data protection measures (changing your password, enabling 2FA, opting out of cookies). To exercise any right, email privacy@huayuesc.vn — a response within 7 business days, fully processed within 30 days.",
      "Huayuesc is a B2B platform for businesses and is NOT directed at children under 16. At registration, users must confirm they are 18 or older (or the age of majority under the law of their country of residence). If a child's account is found, Huayue will deactivate it immediately and delete all data within 7 days. Parents who discover their child has created an account can contact privacy@huayuesc.vn — we verify and delete on a priority basis at no charge.",
      "Our Data Breach Response Plan complies with Article 23 of Decree 13/2023: (Step 1) Detection — a 24/7 Security team monitors year-round, or receives reports from the Bug Bounty program / staff / partners. (Step 2) Containment — within 4 hours, identify the scope, stop the leak, lock affected systems. (Step 3) Assessment — security forensics determine how many users are affected, what data, and the severity. (Step 4) Notify the authorities — within 72 hours of detection, file a report with the Authority of Information Security (Ministry of Information & Communications) using the standard template. (Step 5) Notify users — email/SMS to every affected user within 72 hours, describing the incident plus the exposed data plus remediation plus recommendations (change password, enable 2FA, monitor your account). (Step 6) Remediation — fix the vulnerability, audit the whole system, publish a public post-mortem within 30 days. (Step 7) Compensation — if a user proves direct harm, Huayue has a transparent compensation policy.",
      "Huayue reviews this policy at least once a year and updates it when the law, technology or services change. The current version is v1.0, effective 01/01/2026. Old versions are archived at /info/privacy-policy/lich-su for reference. For material changes (affecting user rights), Huayue notifies users via: (a) Email to every active user at least 30 days before it takes effect. (b) A banner on the website/app for 60 days. (c) A request for user re-consent if the purpose of data processing changes. Contact the DPO (Data Protection Officer): email privacy@huayuesc.vn (response within 72h), hotline +86 181-2225-6999 (business hours), or by post to 'DPO — Huayue Supply Chain (Vietnam) Co., Ltd.', Floor 07, Bao Ngoc Building, No. 02 Thanh Lam Street, Xuan Phuong Ward, Hanoi, Vietnam. Independent complaints authority: the Authority of Information Security (Ministry of Information & Communications), 18 Nguyen Du, Hanoi — website ais.gov.vn.",
    ],
    pullQuote: {
      text: "Privacy is not a checkbox — it is a process. Huayue is committed to being transparent about how Vietnamese Buyers' data is handled across the Vietnam–China border, with no secrets and no legal language designed to trick you.",
      author: "Information Security Team — Huayue Vietnam",
    },
    checklist: [
      "Data controlling entity: Huayue Supply Chain (Vietnam) Co., Ltd. (Tax ID 0111453693)",
      "Compliance with Decree 13/2023/NĐ-CP (Vietnam) + PIPL 2021 (China) + GDPR where applicable",
      "Working toward ISO/IEC 27001:2022 certification",
      "TLS 1.3 (transit) + AES-256-GCM (rest) encryption, bcrypt for passwords",
      "11 data-subject rights — response in 7 days, processed in 30 days",
      "Cross-border Vietnam–China transfers via SCCs + registration with the Authority of Information Security in progress",
      "Pen-tests twice a year + Bug Bounty $100-5,000",
      "Data breach notification within 72 hours per Article 23 of Decree 13/2023",
      "DPO: privacy@huayuesc.vn — hotline +86 181-2225-6999",
    ],
    faq: [
      {
        q: "Does Huayue sell my data to third parties?",
        a: "ABSOLUTELY NOT. Huayue's business model is based on supply chain services (transaction commission, logistics fees, customs fees), NOT on selling data. We do not share data with data brokers, marketing aggregators, or any third party not directly involved in your transaction.",
      },
      {
        q: "Can I request deletion of all my data?",
        a: "Yes. Email privacy@huayuesc.vn with the subject 'Data deletion request — [account name/email]'. Huayue verifies your identity (via OTP), hard-deletes within 30 days, and sends a 'Certificate of Erasure' on request. Note: tax records (invoices) must be kept 10 years under Vietnam's Tax Administration Law — that portion cannot be deleted.",
      },
      {
        q: "Is my data transferred to China?",
        a: "Possibly, if your transaction needs support from Huayue's Guangzhou representative office (factory audit, goods inspection, dispute handling). Cross-border Vietnam–China transfers are protected by internal Standard Contractual Clauses (SCCs) and TLS 1.3 encryption; Huayue is in the process of completing its registration with Vietnam's Authority of Information Security under Article 25 of Decree 13/2023. You have the right to ask us NOT to transfer — email the DPO, and we will respect it, though we may have to limit the on-site audit service.",
      },
      {
        q: "Is my password safe if Huayue is hacked?",
        a: "Yes. Huayue uses bcrypt hashing with work factor 12 plus per-user salt plus pepper — even if the database leaks, the passwords would take billions of years of computing power to crack. Still, we recommend you: (1) set a strong, unique password, (2) enable 2FA at /buyer-center/settings/security, (3) change your password if you hear of an incident at other sites where you use the same email.",
      },
      {
        q: "I received a suspicious email claiming to be from Huayue — how do I verify it?",
        a: "Official Huayue email always comes from the @huayuesc.vn domain. Transactional email comes from no-reply@huayuesc.vn. DPO/HR email uses the @huayuesc.vn domain. If in doubt, forward the email to privacy@huayuesc.vn and we will verify it within 4 hours. The golden rule: Huayue will NEVER ask for your password by email or phone.",
      },
    ],
    related: [
      { label: "Terms of Service", href: "/info/terms-of-service" },
      { label: "Payment Protection", href: "/info/payment-protection" },
      { label: "Complaints & Disputes", href: "/info/disputes" },
      { label: "Contact the DPO", href: "/info/contact" },
    ],
    primaryCta: { label: "Contact the DPO now", href: "/info/contact" },
  },
  "import-guide": {
    title: "Guide to Importing from China",
    intro: "A 5-step B2B import process — from finding a supplier to receiving goods at your warehouse. 32-48 days on average.",
    icon: "📦",
    category: "GUIDE",
    quickFacts: [
      { label: "Steps", value: "5" },
      { label: "Production", value: "20-30 days" },
      { label: "Shipping", value: "12-18 days" },
      { label: "Total", value: "32-48 days" },
      { label: "T/T deposit", value: "30%" },
      { label: "T/T balance", value: "70%" },
    ],
    sectionTitles: [
      "Step 1 — Find Products & Send an RFQ",
      "Step 2 — Place a Sample Order",
      "Step 3 — Pay a 30% T/T Deposit via Escrow",
      "Step 4 — On-Site Inspection & 70% Payment",
      "Step 5 — DDP Shipping & Customs Clearance",
      "Step 6 — Receive Goods & Confirm Quality",
      "Documents to prepare",
      "A real tax calculation example (Excel-style breakdown)",
      "ACFTA + RCEP tax preferences — Form E and Form RCEP",
    ],
    paragraphs: [
      "Browse products across 12 main categories on Huayuesc (huayuesc.vn/products), or send a detailed RFQ via /buying-request. Within 24 hours, the AI matching system sends the RFQ to the 5-10 most suitable verified suppliers. Each quote you receive includes: FOB price plus DDP price to your Vietnam warehouse, MOQ, lead time, sample policy and payment terms. Buyers can video-call suppliers directly through Huayuesc to see the factory and actual products before ordering a sample. Tip: the more detailed your RFQ (dimensions, materials, OEM logo, target retail price), the more accurate the quote and the less re-negotiation needed.",
      "Requesting a sample is a step you should NEVER SKIP when sourcing for the first time with a supplier. Process: (1) Click 'Request a Sample' on the product detail page. (2) Sample fee $30-200 plus shipping $20-40 (combined with other samples via Huayue's Guangzhou office). (3) Lead time 8-12 days from order to receipt at your Vietnam warehouse. (4) Test the sample for 2-4 weeks with real-world use. (5) The sample fee is 100% refunded when you place the MOQ with the same supplier. Huayuesc recommends ordering 3-5 samples of the same SKU to test the supplier's consistency. For OEM products (logo, custom color/size), request an 'OEM sample' for $80-300 — verify the customization capability before placing the MOQ. (See details at /info/sample-orders).",
      "After the sample meets requirements and the formal PO (Purchase Order) is confirmed, the Buyer pays a 30% T/T (Telegraphic Transfer) deposit into Huayuesc's Trade Assurance escrow account at partner banks in Vietnam (for VND) and China (for USD/CNY). Funds do NOT go directly to the supplier — they sit in Huayuesc's escrow until the transaction is complete. The supplier receives the PO and confirms escrow, then starts production immediately. The Buyer receives a PI (Proforma Invoice) by email within 24 hours detailing: total value, SKU breakdown, expected shipment date and shipping terms. Production lead time: 20-30 days for standard goods, 30-45 days for OEM custom. T/T bank transfer fee: ~0.1-0.3% plus $20-50 fixed, paid by the Buyer (already included in DDP).",
      "Before shipment (1-2 days prior), the Huayuesc QC team in Guangzhou visits the factory for an on-site inspection — FREE for orders of $5,000 USD or more, $200 per inspection for smaller orders. Inspection process: (i) Quantity — 100% count (for orders under 500 units) or AQL 2.5 sampling (for orders of 500 or more). (ii) Quality — measure dimensions, check materials against the PO spec, functionally test 10% of random samples. (iii) Packaging — verify export-standard cartons, correct labels and a matching packing list. (iv) Documents — Form E (Certificate of Origin), Commercial Invoice, Packing List, B/L or AWB. QC report: 100+ photos plus 5-10 videos, sent to the Buyer within 4 hours. After the Buyer approves the QC, they pay the 70% balance by T/T via escrow and the supplier releases the container. If it does not pass, the supplier fixes it for free (a 5-10 day delay) or the Buyer refuses the goods (Trade Assurance refunds 100% of the deposit).",
      "Huayuesc Logistics handles the entire process from pickup at the factory to delivery at the Buyer's warehouse (Incoterm DDP — Delivered Duty Paid). Process: (1) Pickup of the container/shipment at the factory. (2) Transport to a China export port (Foshan/Shenzhen/Ningbo) or the Huu Nghi border gate (by road). (3) China export declaration plus booking a vessel/truck. (4) Transit of 5-22 days depending on the route (see /info/shipping-policy). (5) Vietnam customs clearance via VNACCS/VCIS e-customs — 75% of goods from verified suppliers go through the green lane within 2 hours. (6) Payment of import duty plus 10% VAT (already included in DDP). (7) Domestic Vietnam transport to the Buyer's warehouse (1-2 days). Total lead time: 5-7 days via the Lang Son road route, 18-22 days by sea. Real-time tracking via /buyer-center/orders plus Zalo OA push.",
      "The Buyer receives the goods at their warehouse and signs a delivery record with the Huayue partner driver. Recommended: (a) Check the carton count against the packing list before signing. (b) Film an unboxing video of 1-2 random cartons as evidence in case of a dispute. (c) Inspect quality and quantity in detail within 7 days of receipt — this is the Trade Assurance complaint window. After 7 days, the system auto-releases funds to the supplier. If you find a defect: file a complaint via /buyer-center/orders/[order-id]/dispute with photo/video evidence, and the Trade Assurance team handles it within 3-5 days — most cases go in the Buyer's favor when the evidence is complete (100% refund, exchange, or negotiated compensation). After confirming the goods are OK, the Buyer rates the order 1-5 stars and writes a review (to help other Buyers).",
      "Standard documents for every B2B import order from China to Vietnam (Huayuesc provides 90% — the Buyer only signs and keeps them): (1) Commercial Invoice — an English-language commercial invoice, signed and stamped by the supplier, declaring the actual value (Huayuesc forbids under-invoicing). (2) Packing List — detailing carton count, net/gross weight, dimensions and SKU breakdown. (3) Bill of Lading (B/L) for sea or CMR for road — the international waybill, original sent to the Buyer or telex release. (4) Certificate of Origin — Form E (ACFTA) or Form RCEP (RCEP) to claim tax preferences. (5) Quality Certificate — factory certification, ISO 9001 if available. (6) Test Report — for goods with technical requirements (CE, RoHS, FDA, FCC). (7) Phytosanitary Certificate — for agricultural goods and timber. (8) Insurance Policy — for CIF/DDP, purchased by Huayuesc through Bảo Việt/PVI. (9) Customs Declaration (Vietnam customs declaration) — filed by Huayuesc under authorization. (10) VAT e-invoice — issued to business Buyers for tax deduction.",
      "A real tax calculation example for a wood furniture order, HS 9403.50, from KUKA Hangzhou, valued at $20,000 FOB, shipped CIF to Lach Huyen, Buyer in Hanoi: (a) FOB Foshan price: $20,000. (b) Sea freight plus insurance to CIF: $4,000, giving CIF $24,000. (c) MFN import duty for HS 9403.50: 20% (reduced from 25% by Circular 12/2026), giving $4,800. With an ACFTA Form E: 0% (duty-free!), saving $4,800. (d) VAT 10% × (CIF + import duty) = 10% × $28,800 = $2,880 (without Form E) or 10% × $24,000 = $2,400 (with Form E). (e) Clearance fee: $120. (f) Domestic transport Hai Phong to the Hanoi warehouse: $280. (g) Huayuesc service fee (5% commission paid by the supplier, NOT charged to the Buyer): $0. TOTAL DDP WITHOUT Form E: $20,000 + $4,000 + $4,800 + $2,880 + $120 + $280 = $32,080. TOTAL DDP WITH Form E: $20,000 + $4,000 + $0 + $2,400 + $120 + $280 = $26,800. Savings: $5,280 = 16.5%.",
      "ACFTA (ASEAN-China FTA, effective 2010) plus RCEP (Regional Comprehensive Economic Partnership, effective 01/01/2022) tax preferences are KEY to cutting import duty by 5-15%. To claim the preference, the Buyer needs: (i) Form E (for ACFTA) — a Certificate of Origin issued by a competent Chinese authority (CCPIT, AQSIQ), free for Huayuesc's verified suppliers. (ii) Form RCEP — for the 15 RCEP countries (China, Japan, Korea, Australia, New Zealand, ASEAN). Some goods (electronic components, machinery) benefit more from RCEP than ACFTA. Huayuesc auto-picks the best FTA for each order. Note: goods must meet the Rules of Origin (RoO) — primary materials from China or an FTA member country. Huayuesc's verified suppliers can all issue a compliant Form E/RCEP so the Buyer claims the full preference. For some specific HS codes (timber, textiles), Form E cuts duty from 25% to 0% — enormous savings.",
    ],
    pullQuote: {
      text: "A transparent 6-step process plus properly claimed ACFTA/RCEP preferences — Vietnamese buyers cut costs 30-40% versus buying through a traditional broker. That is the Huayuesc difference.",
      author: "Huayuesc Customer Success Team",
    },
    checklist: [
      "Free quotes within 24h from 5-10 verified suppliers",
      "Sample $30-200, 100% refunded when you place the MOQ — Sample Center consolidates shipping",
      "Trade Assurance (escrow) at partner banks in Vietnam and China — never lose your deposit",
      "Free on-site inspection for orders of $5K or more — a report with 100+ photos plus video",
      "All-in-one DDP — no worrying about taxes, customs or domestic transport",
      "Form E + Form RCEP — save 5-15% import duty",
      "VNACCS/VCIS e-customs — 75% of goods go through the green lane within 2 hours",
      "Real-time tracking + Marine insurance at 0.5% of value",
    ],
    faq: [
      {
        q: "What is the smallest MOQ?",
        a: "It depends on the factory — typically $500-2000 or 50-100 units. Some suppliers accept a $200 MOQ for new buyers via Huayuesc. Huayuesc has a 'Combine MOQ' program that lets 2-3 buyers in the same industry pool an order to reach a better-priced MOQ while each takes only a third.",
      },
      {
        q: "Do I need an import license?",
        a: "Most building materials, furniture, sanitaryware, LED lighting and home appliances do NOT need a license. Licenses are required for: dietary supplements, cosmetics, medical devices, chemicals, pharmaceuticals, books and vehicles. Huayuesc advises specifically by HS code before you order. New buyers can email legal@huayuesc.vn for free advice.",
      },
      {
        q: "What is the specific import duty for each type of goods?",
        a: "Building materials (tile, stone, cement) HS 6907-6914: 5-10% MFN, 0% with Form E. Wood furniture HS 9403: 20% MFN (reduced from 25% by Circular 12/2026), 0% with Form E. LED lighting HS 9405: 5% MFN, 0% with Form E. Sanitaryware HS 6911-6912: 15-20% MFN, 0% with Form E. Electronics HS 8536-8543: 0-15% MFN, 0% with Form E. Buyers should always prefer suppliers who can issue Form E to save on duty.",
      },
      {
        q: "Do I have to be a business Buyer, or can individuals import too?",
        a: "Individuals may import up to $5,000 USD per order under anti-money-laundering rules. Businesses (with a tax ID) may import without limit and can deduct input VAT (10%). We recommend frequent Buyers (3 or more orders a year) register as a business to optimize taxes.",
      },
      {
        q: "Can delivery be faster than 5-7 days?",
        a: "Yes, with Air Freight Express (DHL/FedEx) — 2-4 days Foshan to Hanoi. Freight is $8-15/kg (5-7x more than sea freight). Suitable for samples, hotfix items and small high-value goods. Minimum charge $100 per order. Contact logistics@huayuesc.vn to book.",
      },
      {
        q: "How does Huayuesc charge the Buyer?",
        a: "COMPLETELY FREE for Buyers. Huayuesc charges a 5% commission from the Supplier on a successful transaction. Buyers pay only: the goods price (per the PO with the supplier) plus DDP freight (a transparent breakdown). There is no membership fee, transaction fee, intermediary fee, or on-site inspection fee (free for orders of $5K or more).",
      },
    ],
    related: [
      { label: "DDP Cost Calculator", href: "/info/ddp-calculator" },
      { label: "Payment Protection", href: "/info/payment-protection" },
      { label: "Sample Orders", href: "/info/sample-orders" },
      { label: "Audit Process", href: "/info/audit-process" },
      { label: "Shipping Policy", href: "/info/shipping-policy" },
    ],
    primaryCta: { label: "Get started — Send an RFQ", href: "/buying-request" },
  },
  "ddp-calculator": {
    title: "DDP Cost Calculator",
    intro: "DDP (Delivered Duty Paid) cost already includes import duty, VAT and delivery to your warehouse.",
    paragraphs: [
      "DDP = goods price + freight + import duty + 10% VAT + clearance fee + delivery to your warehouse. Nothing extra.",
      "For reference: a 20ft container (~28 m³) from Foshan to Hanoi = $1,800-2,400. A 40ft container (~58 m³) = $2,800-3,500. LCL loose cargo: $90-130/m³.",
      "Import duty depends on the HS code. Huayuesc provides an online cost calculator — just enter the FOB price and HS code, and the system estimates the DDP in 30 seconds.",
    ],
    related: [{ label: "Send an RFQ for an exact DDP quote", href: "/buying-request" }],
  },
  "payment-protection": {
    title: "Payment Protection — Trade Assurance",
    intro: "Your money is held in Huayuesc's escrow account. 100% refund if the goods do not match the description.",
    icon: "🛡",
    category: "TRANSACTION SAFETY",
    quickFacts: [
      { label: "Refund", value: "100%" },
      { label: "Complaint window", value: "7 days" },
      { label: "Processing", value: "3 days" },
      { label: "Win rate", value: "87%" },
    ],
    sectionTitles: ["How Trade Assurance works", "When something goes wrong", "Resolution options"],
    paragraphs: [
      "Every transaction on Huayuesc is protected by Trade Assurance. Your 30% T/T deposit and the 70% balance sit in a partner-bank escrow account (not in Huayuesc's hands, not in the supplier's hands). The supplier only receives the funds after you confirm you have received goods of acceptable quality. If you do not confirm within 14 days of delivery, the system auto-releases to avoid holding funds unreasonably.",
      "If the goods do not match the description, are late or are defective, file a complaint within 7 days of receipt. Attach photo/video proof, the order number and the shipping invoice. The Huayuesc dispute team acknowledges within 24 hours and begins investigating. We contact the supplier in Chinese and audit the product at the buyer's warehouse if needed. A resolution is proposed within 3-5 business days.",
      "3 resolution options: (1) 100% refund from escrow — if the goods seriously misrepresent the description. (2) Free exchange — the supplier re-manufactures plus free DDP to Vietnam. (3) Negotiated compensation — an X% discount if the defect is minor and the buyer agrees to keep the goods. Huayuesc handles the resolution directly with the supplier; the buyer does not need to speak Chinese. The rate of complaints resolved in the buyer's favor: 87% (Q3/2025 report).",
    ],
    pullQuote: {
      text: "Trade Assurance is Huayuesc's number-one differentiator. A new buyer can place a $50K order with the same peace of mind as ordering from a domestic Vietnamese supplier.",
      author: "Trade Assurance Team",
    },
    checklist: [
      "Deposit held in partner-bank escrow (not by Huayuesc)",
      "The supplier only receives funds when the buyer confirms acceptable quality",
      "7-day complaint window, 3-5 business days to resolve",
      "Buyer refund/replace rate: 87%",
      "Huayuesc negotiates with the supplier in Chinese on your behalf",
    ],
    related: [
      { label: "Complaints & Disputes", href: "/info/disputes" },
      { label: "Import Guide", href: "/info/import-guide" },
      { label: "Audit Process", href: "/info/audit-process" },
    ],
    primaryCta: { label: "Place a safe order now", href: "/buying-request" },
  },
  "disputes": {
    title: "Complaints & Disputes — 3-tier resolution",
    intro: "Buyers may file a complaint within 7 days of receiving goods. Huayue resolves disputes in 3 tiers: internal mediation (Hanoi + Guangzhou teams) → VIAC arbitration → People's Court of Hanoi. SLA: 6 hours by email, 1 hour via hotline +86 181-2225-6999.",
    icon: "⚖",
    category: "TRANSACTION SAFETY",
    quickFacts: [
      { label: "Complaint window", value: "7 days from receipt" },
      { label: "Email SLA", value: "<6 hours" },
      { label: "Hotline SLA", value: "<1 hour" },
      { label: "Tier 1 — Huayue mediation", value: "Free, 7-14 days" },
      { label: "Tier 2 — Arbitration", value: "VIAC Hanoi" },
      { label: "Tier 3 — Courts", value: "People's Court of Hanoi" },
    ],
    paragraphs: [
      "Tier 1 — Mediation at Huayue (free, 7-14 days): The Buyer files a complaint via the dashboard or support@huayuesc.vn WITHIN 7 DAYS of receiving goods, with evidence (photos, video, acceptance record, order number). The Huayue Hanoi Dispute Resolution team responds within 6 hours and contacts the buyer and factory to verify. The Guangzhou team can visit the factory to inspect directly if needed (for manufacturing defects). A decision within 7 business days with 4 options: (a) 100% refund from escrow if the goods seriously misrepresent the description. (b) Free exchange — the factory re-manufactures plus free DDP to Vietnam. (c) Negotiated compensation — an X% discount if the defect is minor and the buyer agrees to keep the goods. (d) Credit on the next order.",
      "Tier 2 — VIAC Arbitration: If Tier 1 mediation reaches no settlement within 14 days, the buyer or Huayue may escalate the case to the Vietnam International Arbitration Centre (VIAC) in Hanoi under the current VIAC rules of arbitration. Number of arbitrators: 1 (for disputes under $50K), 3 (for $50K or more). Language: Vietnamese (default) or English (by agreement). Arbitration fees ~3-5% of the disputed value, allocated by the ruling. The VIAC decision is FINAL and BINDING, enforceable in Vietnam and China under the 1958 New York Convention.",
      "Tier 3 — Vietnamese Courts: Disputes between users and Huayue (unrelated to factory transactions) are governed by Vietnamese law, with the competent court being the People's Court of Hanoi. Huayue does not accept class-action lawsuits — each dispute is resolved individually per the Terms of Service.",
    ],
    pullQuote: {
      text: "A complaint is nothing to be ashamed of — it is the mechanism by which a supply chain corrects itself. Huayue commits to handling every dispute with transparent information and standing by the buyer to the end.",
      author: "Dispute Resolution Team — Huayue",
    },
    checklist: [
      "📞 Hotline +86 181-2225-6999 — response in <1 hour",
      "✉ support@huayuesc.vn — response in <6 hours",
      "🆓 Tier 1 mediation completely free",
      "🏛 Tier 2: VIAC Hanoi — rulings enforceable in Vietnam + China (1958 New York Convention)",
      "⚖ Tier 3: People's Court of Hanoi for disputes with Huayue (no class actions)",
      "📋 4 resolution options: Refund · Exchange · Compensation · Credit",
    ],
    related: [
      { label: "Trade Assurance", href: "/info/trade-assurance" },
      { label: "Terms of Service", href: "/info/terms-of-service" },
      { label: "Contact Huayue", href: "/info/contact" },
    ],
    primaryCta: { label: "File a complaint — support@huayuesc.vn", href: "mailto:support@huayuesc.vn" },
  },
  "sample-orders": {
    title: "Sample Orders — Before placing the MOQ",
    intro:
      "Ordering a sample is a step you cannot skip when sourcing for the first time with a supplier. A sample fee of $30-200 is far smaller than the risk of importing a whole container of the wrong goods. Huayuesc streamlines this into a 4-day workflow, consolidates multiple samples to save on freight, and refunds 100% of the fee when you place the MOQ.",
    icon: "📦",
    category: "BUYER SERVICES",
    quickFacts: [
      { label: "Sample fee", value: "$30-200" },
      { label: "Shipping fee", value: "$20-40 (consolidated)" },
      { label: "Lead time", value: "8-12 days" },
      { label: "Refund", value: "100% on MOQ" },
      { label: "Samples per order", value: "Unlimited" },
      { label: "OEM samples", value: "Supported" },
    ],
    sectionTitles: [
      "Why order a sample?",
      "The 4-step sample ordering process",
      "Cost optimization — Combine sample shipping",
      "OEM samples — Customize before the MOQ",
    ],
    paragraphs: [
      "Products on Huayuesc have full photos, video and specs — but nothing replaces holding the product in your hands. Buyers can check: the actual material quality (feel the weight, smoothness, durability), dimensional accuracy, color under natural light (versus studio photos, which often differ), packaging (does the carton protect against impact?), and accompanying documents (manual, certificate, invoice). Per Huayuesc statistics, 22% of MOQ orders placed without a prior sample lead to quality complaints — that figure drops to 4% when the buyer orders a sample first. A sample fee of $50-150 is far smaller than the risk of importing a whole container of misdescribed goods.",
      "The sample ordering process on Huayuesc: (1) Find a product and click 'Request a Sample' on the product detail page — the form pre-fills the productId and supplier information. (2) Enter your Vietnam delivery address and choose the sample (the standard sample by default — you can choose a variant: different color, different size, OEM logo if needed). (3) Pay the sample fee via Huayuesc escrow — product fee $30-200 plus shipping fee $20-40. (4) Receive tracking within 24h; the sample is consolidated with other samples that week into one air shipment to Huayuesc Hanoi, then forwarded to the buyer's address. Total lead time 8-12 days: 3-7 days production + 4-5 days air transit + 1 day domestic forwarding.",
      "Rather than ship each sample separately ($40-80 air freight per batch), Huayuesc uses a 'Sample Center' model at the Guangzhou office: suppliers ship samples to Huayuesc Guangzhou, and the logistics team consolidates 8-15 samples each week into one master air shipment to Hanoi (a single $80-150 freight charge split evenly among the buyers). The result: buyers pay only $20-40 per sample instead of $40-80 if shipping on their own. For buyers who order samples frequently (5+ samples a month), Huayuesc offers a 'Sample Subscription' at $99/month — unlimited samples, paying only the product fee.",
      "Huayuesc supports ordering OEM samples (custom logo, custom color, small custom sizing) before placing the MOQ. The supplier charges a mock-up fee of $80-300 plus the regular sample fee, and the lead time increases 5-10 days to make the mold/print the logo. This is the safe way to verify a supplier's OEM capability before committing to a large order. After receiving an OEM sample that meets requirements, the buyer can place the MOQ — the entire sample fee (including the mock-up fee) is 100% refunded against the MOQ invoice. The buyer can also request a video call with the supplier to see the mock-up before production, avoiding mistakes.",
    ],
    pullQuote: {
      text: "A $50 sample fee is the cheapest investment a new buyer can make. It lets you check real quality, get to know the supplier, and above all — feel confident placing the next $50,000 MOQ.",
      author: "Huayuesc Customer Success Team",
    },
    checklist: [
      "Sample fee $30-200, 100% refunded when you place the MOQ with the same supplier",
      "Huayue's Guangzhou office — consolidated shipping saves 50-60%",
      "Lead time 8-12 days from order to receipt in Vietnam",
      "OEM sample support (logo, color, size) before placing the MOQ",
      "Sample subscription at $99/month for power-user buyers",
    ],
    faq: [
      {
        q: "Can I order a sample outside Huayuesc?",
        a: "You can, but it is not recommended. Ordering directly with the supplier means negotiating in Chinese, paying full air freight, and no Trade Assurance. Through Huayuesc it is 30-50% cheaper and safer.",
      },
      {
        q: "Does the sample differ from the MOQ goods?",
        a: "The standard sample equals the MOQ goods. However, some suppliers make samples by hand rather than on the production line, so there may be minor finish differences. When you place the MOQ, Huayuesc always performs QC before shipment to ensure consistency.",
      },
      {
        q: "Is there VAT on the sample fee?",
        a: "No. Samples under $200 are declared as a 'commercial sample', exempt from import duty and VAT under Vietnamese rules. Above $200, normal taxes apply.",
      },
    ],
    related: [
      { label: "Find products to sample", href: "/products" },
      { label: "Import Guide", href: "/info/import-guide" },
      { label: "Payment Protection", href: "/info/payment-protection" },
    ],
    primaryCta: { label: "Find products to sample", href: "/products" },
  },
  "order-tracking": {
    title: "Order Tracking — Real-time tracking",
    intro:
      "Huayuesc provides 5-stage real-time tracking from deposit to delivery at the buyer's warehouse. Every step has photos/video from the supplier, from the Huayuesc Guangzhou warehouse, from the shipping carrier, all the way to domestic Vietnam. Buyers never have to ask 'where is my order now?'.",
    icon: "📍",
    category: "BUYER SERVICES",
    quickFacts: [
      { label: "Stages", value: "5" },
      { label: "Photos/order", value: "30-80" },
      { label: "Videos/order", value: "5-15" },
      { label: "Update freq.", value: "2-3 times/day" },
      { label: "Channels", value: "Email + Zalo OA" },
      { label: "API tracking", value: "Available for enterprise" },
    ],
    sectionTitles: [
      "5 statuses — the order lifecycle",
      "Photo/video updates — see it for yourself",
      "Multi-channel notification",
      "When something goes wrong — fast response",
    ],
    paragraphs: [
      "Every order on Huayuesc goes through 5 clear statuses, each with a timestamp plus photo/video evidence at every milestone: (1) 30% T/T deposit — escrow receives the funds, the supplier receives the formal PO. (2) Production — the supplier starts production, with a production plan and expected completion date. (3) Inspection — the Huayuesc QC team visits the factory 1-2 days before shipment, audits the goods against the PO and spec, and sends a report plus photos/video. (4) Shipping — goods are loaded onto a container/truck, with an international tracking number (for sea: Bill of Lading; for road: vehicle plate plus GPS), with real-time location updates every 6h. (5) Delivered — goods arrive at the Huayuesc Huu Nghi warehouse (road) or Hai Phong/Cat Lai (sea), customs clearance is complete, and domestic transport to the buyer's warehouse follows. The buyer signs, the order closes, and escrow disburses.",
      "Huayuesc's biggest difference versus other platforms: we provide REAL photos/video at every milestone, not just status text. Specifically: Production — 5-10 photos of the line running your batch plus 2-3 production timelapse videos. Inspection — 30-50 photos plus 5-8 detailed videos (measuring dimensions, checking materials, counting quantity, checking packaging). Shipping — photos of the sealed container plus a loading video plus the CMR photo (international waybill) plus customs photos plus warehouse arrival photos. Delivered — photos of the delivery to the buyer plus the acceptance record plus a barcode scan. In total 30-80 photos plus 5-15 videos per order, stored in the cloud, downloadable by the buyer at any time.",
      "Update notifications across multiple channels at once: (1) Email — full content plus a detail link plus thumbnail photos. (2) Zalo OA Huayuesc — real-time push notifications, fastest on mobile. (3) SMS for key milestones (delivery) — concise content. (4) Dashboard /buyer-center/orders — an overview of all orders, filter by status, search by PO number/product/supplier. (5) API tracking for enterprise (Buyers of $100K/year or more) — a real-time webhook to integrate into the company's internal ERP.",
      "When something goes wrong (supplier delay, goods damaged in transit, customs holdups, etc.), Huayue notifies proactively within 2 hours of detection — without waiting for the buyer to ask. Each incident has a response plan: supplier delay, and Huayuesc negotiates a penalty plus expedites, proposing compensation for the buyer (discount, free shipping). Goods damaged in transit, and CIF insurance covers 100%, the supplier reships for free, and a new delivery time is communicated. Customs holdups, and the Huayue Logistics team handles it, with 24/7 support, and a new estimate is provided. The buyer has a direct point of contact at Huayue Hanoi for every order.",
    ],
    pullQuote: {
      text: "Vietnamese buyers need to know where their goods are — not because they distrust Huayuesc, but because they have end customers waiting. Real-time tracking is how we respect your business plan.",
      author: "Huayuesc Logistics Team",
    },
    checklist: [
      "5 clear statuses from deposit to delivery",
      "30-80 REAL photos plus 5-15 videos per order",
      "Multi-channel notification: email + Zalo + SMS + dashboard",
      "Proactive alert within 2h when something goes wrong",
      "API tracking for enterprise ERP integration",
    ],
    related: [
      { label: "Go to your orders", href: "/buyer-center/orders" },
      { label: "Payment Protection", href: "/info/payment-protection" },
      { label: "Complaints", href: "/info/disputes" },
    ],
    primaryCta: { label: "View your orders dashboard", href: "/buyer-center/orders" },
  },
  "find-products": {
    title: "Finding Products on Huayuesc",
    intro: "The 4 most effective ways to find products — Huayue focuses on 3 core industries (Building Materials · Decoration Materials · Kitchen & Bathroom Appliances).",
    paragraphs: [
      "Method 1 — Browse categories: 3 core industries, each with ~8 sub-categories and dozens of sub-sub-categories. Best when you know exactly what you need (e.g. 60×60 porcelain tile, a 3-seat leather sofa, a 30L water heater).",
      "Method 2 — Keyword search: enter a Vietnamese or English keyword. The system automatically translates it into Chinese and searches Huayue's partner-factory database across Guangdong, Fujian and Shandong.",
      "Method 3 — Search by image: upload a reference product photo. The AI matching system finds similar SKUs in the database — best when you have a competitor's catalog but want to find the original manufacturing source.",
      "Method 4 — Call a sourcing manager: hotline +86 181-2225-6999. The Huayue team at the Guangzhou office advises directly, sends a list of audited suppliers, orders samples and negotiates prices on your behalf. The fastest route for large orders (over $10K) or products needing OEM customization.",
    ],
    related: [
      { label: "Browse categories", href: "/products" },
      { label: "Send an RFQ", href: "/buying-request" },
      { label: "Contact a sourcing manager", href: "/info/contact" },
    ],
  },
  "network": {
    title: "Partner Network — Vietnam Distribution & China Factories",
    intro:
      "Huayue builds its supply chain on two networks: (1) a network of distributors, construction contractors and interior design firms in Vietnam — the output for Chinese products; (2) a network of partner factories and industry associations in Guangdong, Fujian and Shandong — the input source of goods. This is how Huayue delivers '本地化分销渠道拓展' (Vietnam distribution channel development) alongside '源头精选' (source vetting), per the brochure.",
    icon: "🤝",
    category: "PARTNER NETWORK",
    quickFacts: [
      { label: "Vietnam distributors", value: "Expanding across 63 provinces" },
      { label: "Contractors & designers", value: "Strategic partners" },
      { label: "China factory clusters", value: "Guangdong · Fujian · Shandong" },
      { label: "Trade fairs attended", value: "Canton Fair · CIFF · VIETBUILD" },
      { label: "Product launch conferences", value: "Annually in Vietnam" },
      { label: "Liaison offices", value: "Hai Phong + Guangzhou" },
      { label: "Partner support", value: "Training + bilingual catalogs" },
      { label: "Contact", value: "partnership@huayuesc.vn" },
    ],
    sectionTitles: [
      "1. Two networks — Vietnam distribution & China sourcing",
      "2. Distribution partners in Vietnam (output)",
      "3. Factory partners & industry associations in China (input)",
      "4. Partnership mechanisms — Bilingual catalogs, training, product launches",
      "5. Benefits for buyers & Vietnam distribution partners",
      "6. Key trade fairs Huayue attends each year",
    ],
    paragraphs: [
      "Huayue's supply chain model rests on two complementary partner networks. Input (the source of goods): we do not manufacture ourselves — we screen and partner with leading factories in China's 3 manufacturing clusters: Guangdong (Foshan for ceramics and sanitaryware, Lecong for furniture, Zhongshan for lighting and appliances), Fujian (natural stone, wood flooring) and Shandong (machinery, hardware). Output (the sales channel): a network of distributors, construction contractors and interior design firms across 63 provinces in Vietnam. Unlike a 'buy-and-resell' marketplace model, Huayue is a real B2B supply chain — goods flow from the factory to the Guangzhou bonded warehouse to Hai Phong port to the Huayue warehouse (Bao Ngoc, Xuan Phuong, Hanoi) to the final point of consumption.",
      "Distribution partners in Vietnam (output) fall into 4 main groups: (1) <b>Building materials dealers</b> — building materials store chains, tile showrooms and provincial/city materials warehouses. Huayue provides DDP pricing to the warehouse, factory warranty, and returns support via the Hanoi team. (2) <b>Construction contractors</b> — residential construction companies, property project contractors and social housing contractors. Huayue sends project-based quotes, supports phased delivery by construction schedule, and provides free samples for orders of 30 sets or more. (3) <b>Interior design firms</b> — design studios and interior design companies. Huayue provides Vietnamese catalogs for each brand, wood/stone/fabric samples, and free 3D visual support for their VIP clients. (4) <b>Appliance & kitchen equipment dealers</b> — appliance chains, water heater dealers and smart toilet seat dealers. Huayue signs exclusive regional dealership contracts with certain China brands. To become a Huayue distribution partner: email partnership@huayuesc.vn with your business license, the Huayue Hanoi team visits/calls to verify, and you sign a partnership contract.",
      "Factory partners & industry associations in China (input): Huayue's Guangzhou representative office (3rd Floor, Shuyu Chuangxing Port) is the direct point of contact with the 3 manufacturing clusters. <b>Guangdong</b> — Foshan (佛山) is the 'ceramics capital' with 1,200+ factories making porcelain ceramics, sanitaryware and tile around the Nanzhuang and Lecong districts; Lecong (乐从) is China's largest wood furniture market with 3,000+ furniture factories; Zhongshan (中山, especially Guzhen) is the LED lighting and home appliance cluster; Dongguan (东莞) covers kitchen cabinets, wardrobes and premium MDF. <b>Fujian</b> — Jinjiang (晋江) specializes in natural stone and engineered wood flooring; Xiamen (厦门) for processed imported timber. <b>Shandong</b> — Yongkang (永康) for machinery and hardware, Qinhuangdao for construction glass. The Huayue sourcing team maintains relationships with local industry associations (the Foshan Chamber, the Guangdong Federation of Industry and Commerce, and regional ceramics and furniture associations) to get introductions to new factories and attend trade fairs.",
      "Partnership mechanisms (per the brochure sections 'Trade Exhibition Services' and 'Market Promotion'): (a) <b>Bilingual Chinese–Vietnamese catalogs</b> — Huayue translates and publishes Chinese product catalogs into Vietnamese, ready for dealers/partners to print or share. (b) <b>Annual new product launch conferences</b> — Huayue hosts them in Hanoi and Ho Chi Minh City, inviting Chinese brands to unveil new products and attracting property developers, construction companies and interior design firms to order on the spot. (c) <b>Topical forums</b> — on eco-friendly building materials and home appliance technology — meeting experts from both countries. (d) <b>Online + offline media in Vietnam</b> — Huayue runs campaigns promoting Chinese brands in Vietnamese trade press, on Facebook/Zalo and at live events — bringing Chinese brands to local buyers. (e) <b>Factory tours</b> — Huayue organizes Vietnamese buyer delegations to visit factories in China 2-4 times a year (Canton Fair in April and October, CIFF in March and September). Huayue shares the cost with large customers, or it is included in the partnership package.",
      "Benefits for buyers & Vietnam distribution partners working with Huayue: (1) <b>True factory-gate pricing</b> — no middlemen, no hidden markups, with a full audit trail from the factory. (2) <b>Quality inspected at source</b> — Huayue's Guangzhou QC team performs AQL 2.5 inspection before shipment, so you do not discover defects only after receiving the goods. (3) <b>Turnkey DDP to Vietnam</b> — includes logistics, customs clearance, duties and delivery to your warehouse. No worrying about booking vessels, customs procedures or exchange-rate risk. (4) <b>Vietnamese-language support</b> — all communication via the Hanoi team, no Chinese required. (5) <b>Free samples & 3D</b> for customers ordering 30 sets or more (per the brochure: 'Free 3D design on orders of 30 sets or more'). (6) <b>Market updates</b> — Huayue sends monthly factory price reports, CNY/VND exchange-rate movements and new Vietnamese tax policies.",
      "Key trade fairs Huayue attends each year (as a representative or co-organizing a delegation): <b>Canton Fair</b> (Guangzhou, April + October) — China's largest B2B trade fair; Huayue has a representative booth and organizes Vietnamese buyer delegations. <b>CIFF (China International Furniture Fair)</b> (Guangzhou in March, Shanghai in September) — the furniture industry fair, a key partner for the Furniture category. <b>Foshan Pottery Show</b> (Foshan, April and October) — specializing in porcelain tile and sanitaryware. <b>VIETBUILD</b> (Ho Chi Minh City in June, Hanoi in November) — Vietnam's building materials fair, where Huayue invites China factories to attend alongside the Hai Phong delegation. <b>Vietnam Expo</b> (Hanoi in April) — Huayue takes part in the Chinese products exhibition. Register to join a Huayue buyer delegation via partnership@huayuesc.vn or hotline +86 181-2225-6999.",
    ],
    pullQuote: {
      text: "Huayue is not a product-listing marketplace — we are a supply chain. Goods move through real warehouses, real containers and a real customs team. The partner network is the lifeblood of the operation: take one side away and the chain breaks.",
      author: "Partnership Team — Huayue Vietnam",
    },
    checklist: [
      "🏪 Building materials and furniture dealers across 63 provinces in Vietnam (expanding)",
      "🏗 Construction contractors + interior design firms — strategic partners",
      "🏭 3 China factory clusters: Guangdong + Fujian + Shandong",
      "🤝 Partnerships with industry associations in Foshan, Lecong, Zhongshan",
      "📚 Bilingual Chinese–Vietnamese catalogs for distribution partners",
      "🎤 Product launch conferences + topical forums in Vietnam each year",
      "✈️ Buyer delegations to Canton Fair, CIFF, Foshan Pottery 2-4 times a year",
      "📞 Contact partnership@huayuesc.vn · +86 181-2225-6999",
    ],
    faq: [
      {
        q: "I want to become a Huayue distribution dealer in my province — what is the process?",
        a: "Email partnership@huayuesc.vn with your business license, details of your existing showroom/warehouse, the category you currently distribute (building materials / furniture / appliances) and your coverage area. The Huayue Hanoi team will call you within 5 business days and can visit in person if needed. After verification, you sign a dealership contract — no membership fee, just commission shared by sales volume.",
      },
      {
        q: "I am a construction contractor — what support does Huayue offer for my projects?",
        a: "Huayue sends DDP quotes delivered to the job site for the building materials and interior finishes categories (tile, sanitaryware, cladding stone, paint, wood flooring). Support includes: (1) free samples for orders of 30 sets or more, (2) delivery aligned to the construction schedule (in multiple phases), (3) warranty from the original factory plus Huayue's responsibility for returns on defects. Contact sales@huayuesc.vn or +86 181-2225-6999.",
      },
      {
        q: "I run an interior design firm — are there offers for my VIP clients?",
        a: "Yes. Huayue offers a partnership package for design firms: (a) Vietnamese catalogs for China brands, (b) wood/stone/fabric samples, (c) free 3D visual support for your premium clients (orders of 30 sets or more), (d) preferential discounts on turnkey projects. Contact partnership@huayuesc.vn.",
      },
      {
        q: "I want to visit factories in China — does Huayue organize delegations?",
        a: "Yes. Huayue organizes Vietnamese buyer delegations to the Canton Fair (April and October), CIFF Guangzhou (March and September) and the Foshan Pottery Show (April and October). Each delegation has 10-25 buyers, with industry interpreters and the Huayue Guangzhou sourcing team to host you. Book factory business matching ahead of the trip. Contact partnership@huayuesc.vn for the schedule and specific costs.",
      },
      {
        q: "Why should I buy through Huayue instead of going to China myself or buying through a broker?",
        a: "Going to China yourself means you need to speak Chinese, know the market, have factory relationships and handle logistics and customs. Buying through a broker means no quality control at source, vulnerability to hidden markups and no clear legal standing. With Huayue: a registered Vietnamese legal entity (Tax ID 0111453693), goods inspected at the factory before shipment, DDP delivery to your warehouse, 24/7 Vietnamese-language support and Trade Assurance — you are refunded if goods do not match what was promised.",
      },
      {
        q: "Does Huayue provide Chinese-language support for Vietnamese buyers?",
        a: "Yes. All communication with Chinese factories is handled by the Huayue Guangzhou team — you only work in Vietnamese with the Hanoi team. When you need to visit a factory in person (for large orders or OEM customization), Huayue provides an industry interpreter to accompany you.",
      },
    ],
    related: [
      { label: "Factory Audit Process", href: "/info/audit-process" },
      { label: "Trade Shows Huayue attends", href: "/trade-shows" },
      { label: "Market Reports", href: "/info/market-reports" },
      { label: "Contact Partnership", href: "/info/contact" },
    ],
    primaryCta: { label: "Contact partnership@huayuesc.vn", href: "mailto:partnership@huayuesc.vn" },
  },
  "audit-process": {
    title: "Factory Audit Process — The first shield for Vietnamese buyers",
    intro:
      "Before a Chinese factory becomes a Huayue partner, the sourcing team at the Guangzhou office (3rd Floor, Shuyu Chuangxing Port) conducts a 5-step on-site audit over 10-15 days: legal cross-checks via Tianyancha + GACC, a factory visit to inspect the production line and labor conditions, and third-party lab testing of product samples (SGS / Bureau Veritas) when needed. Factories that do not pass are not added to the list sold to Vietnamese buyers. Re-audits take place every 12 months.",
    icon: "🔍",
    category: "AUDIT PROCESS",
    quickFacts: [
      { label: "Steps", value: "5" },
      { label: "Duration", value: "10-15 days" },
      { label: "On-site audit by", value: "Huayue Guangzhou team" },
      { label: "Lab test partners", value: "SGS · Bureau Veritas (when needed)" },
      { label: "Re-audit", value: "Every 12 months" },
      { label: "Cost to supplier", value: "Huayue covers year one" },
    ],
    sectionTitles: [
      "1. Why the audit is the first shield for buyers",
      "2. Step 1 — Registration & legal cross-check",
      "3. Step 2 — Factory document audit",
      "4. Step 3 — On-site factory audit (Guangzhou team)",
      "5. Step 4 — Third-party product lab testing",
      "6. Step 5 — Onboarding as a Huayue partner + periodic re-audit",
    ],
    paragraphs: [
      "Cross-border sourcing has one core problem: most of the risk a buyer faces lies not in price or logistics but in the factory itself — who they really are, their actual capacity versus website claims, whether they have labor or environmental violations, and whether product quality is consistent across batches. On global B2B marketplaces, any supplier can create a Verified badge by paying a fee and submitting paperwork — with no real on-site audit. Huayue takes a different approach: the sourcing team at the Guangzhou office visits factories in person, checks everything, and only agrees to work with factories that meet the standard. This is the first shield protecting Vietnamese buyers, before the second layer (Trade Assurance) and the third layer (AQL 2.5 QC before shipment).",
      "Step 1 — Registration & legal cross-check (2-3 days): The factory registers via /sell-on-csr or is scouted by the Huayue Guangzhou team at the Canton Fair / CIFF / Foshan Pottery show. The audit team cross-checks 3 public data sources: (a) <b>Tianyancha</b> (天眼查) and <b>Qichacha</b> (企查查) — for the business license, capital change history, litigation and blacklists. (b) <b>GACC</b> (China Customs, 中国海关) — to check the actual export license and previously declared HS codes. (c) <b>China Court Open Database</b> (中国裁判文书网) — for administrative penalties, IP violations and payment fraud. A factory with a 'red flag' (excessive litigation, GACC blacklist, labor violations) is rejected immediately with a clear response letter.",
      "Step 2 — Document audit (2-3 days): The factory submits full official documents including: Business License (营业执照), Tax Registration (税务登记证), Unified Social Credit Code (统一社会信用代码), Foreign Trade Operator Registration (对外贸易经营者备案登记表), Customs Declaration Registration (报关单位注册登记证书), an ISO 9001:2015 Quality Management certificate, industry product certifications (CE / RoHS / FDA / FSC / GREENGUARD / OEKO-TEX depending on the industry), 3 months of bank statements (proving real operating cash flow — not a shell company), the most recent month's worker payroll (verifying headcount versus claims), 30+ factory photos, and a list of the 5 largest customers over the past 3 years. The audit team cross-checks over 2-3 days to weed out disguised brokers and shell companies.",
      "Step 3 — On-site factory audit (1-2 days): The Huayue Guangzhou QC team (2-3 people, including a Lead Auditor plus a Sector Specialist depending on the industry) visits the factory on schedule — with no more than 5 days' notice to prevent staging. Direct checks: (i) Overall layout plus emergency exits; (ii) The main production line (counting actual machines versus claims, checking idle/active rate); (iii) Workers (actual count, minimum-age check of 16+, sample ID checks); (iv) Raw materials warehouse (origin tracking, supplier list); (v) Finished goods warehouse (packaging specs, palletization); (vi) Internal QC lab (equipment calibration, SOP, AQL sampling rate); (vii) Fire-safety room plus emergency exits per GB 50016-2014; (viii) Worker rest area plus canteen (living conditions). The audit team takes 100+ evidence photos, films 360° video, records observed defects, and randomly interviews 5-8 workers about working conditions. The report is written within 5 days of the audit and digitally signed with Huayue's company certificate.",
      "Step 4 — Third-party product lab testing (5-7 days, when needed): For products with high safety requirements (porcelain tile — water absorption and bending strength per ISO 10545; sanitaryware — lead and cadmium leaching; paint — VOC and formaldehyde; appliances — CCC and CE EMC; smart toilet seats — IP rating and leak test), the factory sends 3-5 flagship product samples to an SGS or Bureau Veritas branch lab in Guangzhou or Shanghai. Testing follows industry standards (ASTM, ISO, GB, EN depending on the target market). The lab is independent (Huayue cannot collude because the lab is a third party), and the results serve as a baseline to monitor consistency at re-audit. For simple products (e.g. basic ceramic tile, ordinary wood flooring), Huayue accepts the factory's most recent test report (6 months old or less) instead of retesting — saving onboarding time.",
      "Step 5 — Onboarding as a Huayue partner + periodic re-audit: A factory that passes all 4 steps above is invited to sign a partnership contract with Huayue — no membership fee, just a 3-5% per-order commission agreement. Onboarding includes: training on Huayue SOPs (responding to RFQs within 24h, DDP-standard packaging, dispute handling), shooting marketing-standard product photos, a 90-180 second factory tour video, listing flagship products with a Vietnamese + English title and description, and setting up an account to receive escrow disbursements. <b>Periodic re-audit every 12 months</b> — the Huayue Guangzhou team returns to the factory to check: (a) Production capacity has not dropped more than 25% from baseline. (b) Headcount is stable. (c) Complaint rate over 12 months &lt;5%. (d) AQL pass rate of 98% or higher across QC inspection batches. (e) No new legal violations. If it fails seriously (e.g. discovery of child labor, fraud, IP infringement): partner status is revoked immediately, with a 100% refund of every order still in Trade Assurance.",
    ],
    pullQuote: {
      text: "The Huayue Guangzhou team visits factories almost every week — not for a checklist, but because it is the only way to know whether the factory today is any different from yesterday. Vietnamese buyers cannot reach the factory floor, so we go in their place.",
      author: "Sourcing Team — Huayue Guangzhou",
    },
    checklist: [
      "🏭 On-site audit by the Huayue Guangzhou team — not a paper audit",
      "📋 Cross-check Tianyancha · GACC · China Court Open Database",
      "🧪 Third-party lab testing by SGS / Bureau Veritas when needed (high-safety products)",
      "👷 Labor-condition checks: minimum age 16+, fire safety, worker rest area",
      "🔄 Re-audit every 12 months — there is no 'pass once and done'",
      "💸 Huayue fully covers the audit cost for partner factories in year one",
      "📞 Buyers can request a random audit of a factory they are working with (cost shared)",
    ],
    faq: [
      {
        q: "Is the factory notified before an audit?",
        a: "Periodic re-audits are announced only 5 days in advance — enough for the factory to arrange staff to host you, but not enough to 'stage' (clean up, hire temporary workers). The initial audit for a new factory can be scheduled further ahead (10-14 days) because logistics coordination is needed. Huayue reserves the right to a surprise audit for factories whose complaint rate spikes — with no prior notice.",
      },
      {
        q: "Can buyers see the full audit report?",
        a: "An 8-12 page summary (including the pass/fail decision, company profile, working conditions and lab results) is provided to business-account buyers considering a large order. The full report containing sensitive financial/ownership information is kept only by Huayue — shared with the buyer only in a dispute or with the factory's consent.",
      },
      {
        q: "Does the audit cost the factory anything?",
        a: "In year one, Huayue covers 100% of the audit cost (~$1,500-3,000 per audit). From year 2 onward, the partner factory contributes 50% for re-audits if lab testing is required. Huayue invests in audits because it is an important competitive moat — a factory that does not earn trust easily will not survive a real dispute.",
      },
      {
        q: "If a factory passes the audit and then quality declines — how does Huayue find out?",
        a: "5 mechanisms: (a) Re-audit every 12 months. (b) AQL 2.5 QC before shipment on every order — catching deviations early. (c) Buyer ratings plus dispute rate are monitored, with a 5% dispute threshold triggering a sourcing-team investigation. (d) Buyers can request a random audit of the factory they work with. (e) The Guangzhou team makes unscheduled visits to partner factories each quarter.",
      },
      {
        q: "I want an independent audit of a Chinese factory outside the Huayue system — can I do that?",
        a: "Yes. Huayue offers a 'Standalone Factory Audit' service for large business buyers who want to audit a factory they found themselves — costing $1,800-3,500 depending on the industry, delivered in 10-15 days, with a full digitally signed report. Ideal when a buyer already has a shortlist of 5-10 factories from the Canton Fair and needs to filter before signing a contract. Contact sales@huayuesc.vn.",
      },
    ],
    related: [
      { label: "Partner Network", href: "/info/network" },
      { label: "Trade Assurance", href: "/info/trade-assurance" },
      { label: "Register as a Huayue partner factory", href: "/sell-on-csr" },
      { label: "Real-time order tracking", href: "/info/order-tracking" },
    ],
    primaryCta: { label: "Find products from audited factories", href: "/products" },
  },
  "industry-news": {
    title: "Sourcing Industry News",
    intro: "Updates on price trends, new products and trade shows.",
    paragraphs: [
      "Each week, the Huayuesc content team publishes 8-12 articles on raw-material price trends, newly launched products, trade show events and tax policy changes.",
      "Subscribe to Trade Alert to receive the weekly newsletter by email and Zalo OA. Over 12,000 Vietnamese buyers have already subscribed.",
    ],
    related: [{ label: "Subscribe to Trade Alert", href: "/trade-alert" }],
  },
  "contact": {
    title: "Contact Huayuesc",
    intro: "Hanoi · Guangzhou · Online 24/7. Choose the right channel for the fastest response.",
    icon: "📞",
    category: "CONTACT",
    quickFacts: [
      { label: "Offices", value: "2 (Hanoi + Guangzhou)" },
      { label: "Online support", value: "24/7" },
      { label: "Email response", value: "<6 hours" },
      { label: "Chat response", value: "<5 minutes" },
    ],
    sectionTitles: [
      "🇻🇳 Hanoi Office",
      "🇨🇳 Guangzhou Office",
      "💬 Online support 24/7",
    ],
    paragraphs: [
      "Floor 12, Huayuesc Building, 26 Pham Hung, Cau Giay, Hanoi. Tel: +84 24 1234 5678. Email: hanoi@huayuesc.vn. Hours: 8:00am-6:00pm, Monday to Saturday. The Hanoi team handles: advising Vietnamese buyers, after-sales, disputes and Vietnam customs documents. Everyone speaks native Vietnamese. There is a free sample showroom for buyers to visit.",
      "26/F, Tianhe Plaza, Tianhe District, Guangzhou, China. Tel: +86 20 1234 5678. WeChat: huayuesc_qc. Email: guangzhou@huayuesc.vn. The Guangzhou team handles: factory audits, on-site inspection, new sourcing and supplier partners. It has 8 full-time auditors covering 30+ cities in China. Vietnamese buyers can request a direct video call with the QC team at the factory.",
      "Instant support across multiple channels: Email support@huayuesc.vn (response in <6 hours), live chat on the website (5 minutes), Zalo OA: Huayuesc (Vietnamese chat 24/7), Facebook Messenger: fb.com/huayuesc. The 12-person support team works in 3 shifts, ensuring someone responds outside business hours, including holidays.",
    ],
    checklist: [
      "Sales / Sourcing advice: sales@huayuesc.vn",
      "Trade Assurance / Disputes: dispute@huayuesc.vn",
      "Careers: hr@huayuesc.vn",
      "Press / PR: pr@huayuesc.vn",
      "Privacy DPO: privacy@huayuesc.vn",
    ],
    related: [
      { label: "Careers", href: "/info/careers" },
      { label: "Association partner network", href: "/info/network" },
      { label: "Help Center", href: "/help" },
    ],
    primaryCta: { label: "Send an RFQ now", href: "/buying-request" },
  },
  "shipping-policy": {
    title: "Shipping Policy — Huayuesc",
    intro:
      "B2B shipping from China to Vietnam complies with Incoterms 2020 across 4 main methods: EXW, FOB, CIF, DDP. Huayuesc operates with 2 strategic logistics partners (Sinotrans + Vinatrans) and 5 destination ports in Vietnam, ensuring optimal lead times for any order size.",
    icon: "🚚",
    category: "SHIPPING",
    quickFacts: [
      { label: "Incoterms", value: "2020" },
      { label: "Methods", value: "EXW · FOB · CIF · DDP" },
      { label: "Vietnam destination ports", value: "5 ports + 1 road route" },
      { label: "DDP lead time", value: "5-22 days" },
      { label: "Logistics partners", value: "Sinotrans + Vinatrans" },
      { label: "Insurance", value: "0.5% of goods value" },
      { label: "Insurance carrier", value: "Bảo Việt + PVI" },
      { label: "Tracking support", value: "Real-time API" },
    ],
    sectionTitles: [
      "1. Incoterms 2020 — 4 methods at Huayuesc",
      "2. Detailed comparison EXW · FOB · CIF · DDP",
      "3. Vietnam destination port network",
      "4. Road via the Huu Nghi border gate (Lang Son)",
      "5. Detailed lead times by route",
      "6. Cargo insurance & Shipping claims",
      "7. Vietnam customs procedures",
      "8. ACFTA + RCEP tax preferences",
      "9. Real-time tracking & Notification",
      "10. Special cases — Dangerous goods, oversize, fragile",
    ],
    paragraphs: [
      "Huayuesc applies Incoterms 2020 — the International Chamber of Commerce (ICC) standard for international sales contracts. 4 methods are supported on the platform (in order of decreasing Buyer responsibility): (a) EXW (Ex Works) — the Buyer collects the goods at the factory themselves and handles freight, taxes, customs and domestic transport. (b) FOB (Free on Board) — the Supplier delivers the goods onto the vessel at the export port, after which the Buyer takes responsibility. (c) CIF (Cost, Insurance & Freight) — the Supplier delivers the goods at the Vietnam import port, including sea freight and insurance; the Buyer handles taxes, customs and domestic transport. (d) DDP (Delivered Duty Paid) — the Supplier/Huayuesc delivers to the Buyer's warehouse, including everything: freight, taxes, customs, domestic transport and insurance. This is the most popular Incoterm at Huayuesc (78% of 2025 orders used DDP).",
      "A detailed comparison to help the Buyer choose:",
      // Note: paragraphs not directly support tables — but for now just inline as text. Could use 'list' block in future.
      "DDP (recommended default): Huayuesc handles EVERYTHING — calling a truck to pick up at the factory, transporting to the port/border, completing the China export procedures, booking a vessel/truck across the border, Vietnam customs clearance (Huayuesc acts as the declaring entity of record), paying import duty plus 10% VAT, and domestic Vietnam transport to the Buyer's warehouse. The Buyer simply signs for the goods at their warehouse. Suitable for 90% of new Buyers, especially anyone without their own forwarder. Cost: $400-700/CBM depending on the destination port, all-in-one. Lead time: 5-7 days via Lang Son, 18-22 days by sea.",
      "CIF (for Buyers with a forwarder and customs broker): the Supplier/Huayuesc ships the goods to a Vietnam port (Hai Phong/Cat Lai/Da Nang), with Marine Insurance covering the goods to the port. The Buyer hires their own customs broker for clearance, pays the VAT, and brings the goods to their warehouse. Saves 15-25% versus DDP if you already have domestic logistics infrastructure. Cost: $250-400/CBM. Lead time: 12-15 days to the Vietnam port. Suitable for businesses with 3+ years of import experience and an internal logistics team.",
      "FOB (for professional Buyers): the Supplier/Huayuesc delivers the goods to a China export port (Foshan/Shenzhen/Ningbo/Shanghai), after which the Buyer hires their own vessel, insurance and Vietnam customs clearance. Saves 30-40% versus DDP but requires high logistics capability. Cost: $80-150/CBM for pickup plus handling at the export port. Lead time: 1-2 days to the port. Suitable for highly professional buyers or corporations with a sister company in Hong Kong/Singapore handling logistics.",
      "EXW (special — not recommended): the Buyer collects the goods at the factory themselves; not recommended for 99% of Vietnamese Buyers. Only suitable for: (i) Buyers with a representative office in China, (ii) highly specialized goods the Buyer must inspect directly at the factory, (iii) small orders under $1K. Huayuesc still supports EXW, but the Buyer bears all shipping risk from the factory to the port/border.",
      "Huayuesc's Vietnam destination port network: (1) Lach Huyen Port (Hai Phong, North) — a new deep-water port, high throughput, little congestion, ideal for northern and central Buyers. CIF cost $280/CBM. Fast e-customs clearance of 0.5-1 day. (2) Cat Lai Port (Ho Chi Minh City, South) — Vietnam's largest port, mature infrastructure, for southern Buyers. CIF cost $320/CBM. Customs often congested 2-3 days at peak. (3) Da Nang Port (Central) — for central Vietnam and Central Highlands Buyers. CIF cost $350/CBM. Lead time similar to Hai Phong. (4) Tien Sa Port (Da Nang secondary) — specializing in special containers. (5) Cai Mep - Thi Vai Port (Vung Tau) — a deep-water port for mega-vessels, typically used for orders of 40HQ or more. Huayuesc is investing in opening an office in Hai Phong (Q3/2026) to shorten DDP delivery to northern Buyers' warehouses to 7-9 days.",
      "Road via the Huu Nghi border gate (Lang Son) — the fastest option for northern Buyers and small orders. Route: Foshan/Guangzhou/Nanning to Huu Nghi (China) to Huu Nghi (Vietnam) to Hanoi to the Buyer's warehouse. Lead time 5-7 days total (versus 18-22 days by sea). Cost 30-45% higher: $130-160/CBM for LCL, $3,200-3,800 for FCL 20-40HQ. Suitable for: hot-trend goods, samples, urgent replenishment orders and short-lifecycle goods. The Huu Nghi border gate was upgraded in February 2026 with a new e-customs system — clearance cut from 2-3 days to 0.5-1 day. Huayuesc has signed MOUs with 2 road forwarders (Sinotrans + Vinatrans) to guarantee capacity and stable pricing.",
      "Detailed lead times by common route (to the Buyer's Hanoi warehouse): (i) Foshan/Guangzhou to Huu Nghi (road): 5-7 days. (ii) Foshan to Lach Huyen (sea): 12-15 days, plus 1-2 days to Hanoi. (iii) Shanghai to Lach Huyen (sea): 9-12 days, plus 1-2 days to Hanoi. (iv) Dongguan/Shenzhen to Cat Lai (sea): 10-12 days, plus 5-7 days to Hanoi. (v) Air freight Foshan to Hanoi: 2-4 days (for ultra-urgent goods, samples, $8-15/kg). Lead time includes: pickup at the factory (1-2 days), transport to the export port (0.5-1 day), vessel/truck (5-12 days), Vietnam customs (0.5-2 days), domestic Vietnam (0.5-2 days). A ±2 day buffer for weather, port congestion and surprise inspections.",
      "Automatic cargo insurance on every DDP/CIF order: (a) Marine Cargo Insurance — a fee of 0.5% of the CIF value, purchased by Huayuesc through partners Bảo Việt (for VND) plus PVI Insurance (for USD). (b) Compensation of 110% of goods value in case of total loss (general average + particular average + total loss). (c) Coverage scope: damage from natural disaster, sinking, collision, piracy, and force majeure in transit. NOT covered: damage from poor supplier packaging quality (handled via Trade Assurance), natural wear and tear, or dishonest declaration. Insurance claims: file notice within 7 days of receipt plus the acceptance record plus photo/video evidence. Processing time 14-21 business days. Huayuesc helps the Buyer prepare the file — at no charge.",
      "Vietnam customs procedures: the Huayue customs team at Hai Phong port acts as the declaring entity of record (under the Buyer's authorization through the logistics service contract) using the VNACCS/VCIS system — the General Department of Customs e-customs platform since 2014. Process: (1) Electronic declaration within 24h before the vessel/truck reaches the port/border. (2) Customs automatically assigns a lane (green — clear through, yellow — document check, red — physical inspection). Goods from Huayue partner factories with a good declaration history usually go through the green lane quickly. (3) Payment of import duty plus VAT by transfer through the partner bank. (4) Obtain the Delivery Order (D/O), pick up the container/shipment. (5) Domestic transport to the Buyer's warehouse. The Huayue customs team at Hai Phong port holds a Ministry of Finance broker certificate — ensuring clearance even on holidays.",
      "Special tax preferences under Free Trade Agreements (FTAs): (a) ACFTA (ASEAN-China FTA) — goods of Chinese origin entering Vietnam are duty-free or significantly reduced for 7,000+ HS codes. Requires Form E (CO Form E — Certificate of Origin from China). Huayuesc's verified suppliers all provide Form E free of charge. Saves an average of 5-15% on import duty. (b) RCEP (Regional Comprehensive Economic Partnership) — effective January 2022, with preferences for 92% of the tariff schedule among the 15 RCEP countries. Form RCEP. Some products benefit more from RCEP than ACFTA (especially machinery and electronic components). Huayuesc auto-picks the best FTA for each order. (c) EVFTA, CPTPP — not applicable to goods from China to Vietnam, only for EU/CPTPP members. Huayuesc advises on the exact HS code so the Buyer claims the maximum preference.",
      "Real-time tracking plus multi-channel notification on every order: (i) Dashboard /buyer-center/orders — an overview, filter by status. (ii) Email — updates at each milestone (pickup, shipment, port arrival, customs, warehouse delivery). (iii) Zalo OA Huayuesc — real-time push notifications. (iv) SMS — only for 2 key milestones (about to deliver plus delivered). (v) API tracking webhook — for enterprise Buyers ($100K/year or more) to integrate into their internal ERP. (vi) Vehicle GPS — for road cargo via Lang Son, view the real-time location on a map. Each order has 30-80 photos plus 5-15 videos of evidence at the milestones, stored in the cloud, downloadable by the Buyer at any time.",
      "Special cases: (a) Dangerous Goods (IMDG) — lithium batteries, chemicals, paint, solvents. Huayuesc requires an MSDS (Material Safety Data Sheet), UN classification and specialized packaging. A surcharge of 30-80% over standard freight. Only 5 of 40 verified suppliers support DG. (b) Oversize goods — dimensions of 12m or more, or weight of 30 tons or more per unit. Requires a special truck (low-bed trailer) and an oversize transport permit. A surcharge of 50-150%. (c) Fragile goods (ceramics, glass, natural stone) — packed on wood pallets plus multi-layer foam plus corner protectors plus a multilingual 'Fragile' label. A surcharge of 5-10%. (d) Cold-chain goods (requiring temperature control) — a refrigerated container at 0-25°C, costing 2-3x normal. (e) High-value goods ($50K+ per shipment) — insurance raised to 1% of value, a GPS-locked container, and an escort across the border.",
    ],
    pullQuote: {
      text: "Logistics is the core of cross-border B2B. A container 5 days late can make a Buyer lose their end customer — we invest heavily in partnerships and infrastructure to ensure predictability.",
      author: "Dang Thanh Ha — Huayuesc Logistics Coordinator",
    },
    checklist: [
      "ICC-standard Incoterms 2020 — 4 methods EXW · FOB · CIF · DDP",
      "5 Vietnam destination ports: Lach Huyen · Cat Lai · Da Nang · Tien Sa · Cai Mep",
      "Lang Son road route 5-7 days — ideal for hot-trend goods",
      "Automatic Marine Insurance via Bảo Việt + PVI — 0.5% of value, 110% compensation",
      "VNACCS/VCIS e-customs — 75% of goods go through the green lane within 2 hours",
      "ACFTA + RCEP preferences — save 5-15% import duty",
      "5-channel tracking: Dashboard + Email + Zalo + SMS + API webhook",
      "Support for DG · Oversize · Fragile · Cold chain · High-value",
    ],
    faq: [
      {
        q: "Is DDP cheaper than handling logistics myself?",
        a: "It depends on the Buyer. If you already have a customs broker and forwarder, DDP costs 12-18% more. If you are a new Buyer or have no logistics team, DDP is 5-15% cheaper than hiring an outside forwarder (Huayuesc has good rates due to high volume). 78% of Huayuesc Buyers choose DDP for the convenience plus transparent pricing.",
      },
      {
        q: "Can I split an order into smaller shipments to dodge taxes?",
        a: "NO. This (under-invoicing, splitting shipments) violates Vietnam's Customs Law — a penalty of 1-3x the evaded tax value plus possible criminal prosecution. Huayuesc absolutely does not support it. However, there is a legal way: claim the ACFTA/RCEP preference (save 5-15% on tax).",
      },
      {
        q: "Is the 5-7 day lead time via Lang Son accurate?",
        a: "Yes, that is the lead time from factory pickup to the Buyer's Hanoi warehouse (including customs plus domestic transport). Da Nang/Ho Chi Minh City Buyers add 1-2 days of domestic transport. A ±2 day buffer for weather or surprise inspections.",
      },
      {
        q: "Does insurance cover goods damaged by poor packaging?",
        a: "No. Marine Cargo insurance only covers losses from natural disaster, collision and force majeure in transit. Damage from poor packaging = supplier fault, handled via Trade Assurance with a 100% refund (see /info/payment-protection). That is why Huayuesc audits export-standard packaging before agreeing to ship.",
      },
      {
        q: "Can I track my order via API?",
        a: "Yes, for enterprise Buyers of $100K/year or more. Contact sales@huayuesc.vn to be issued an API key plus webhook URL. Documentation at docs.huayuesc.vn/api/tracking. Free tier 1000 requests/day, Pro $99/month for unlimited.",
      },
      {
        q: "Is there an ultra-urgent shipping service?",
        a: "Yes, Air Freight Express via partners DHL/FedEx. Lead time 2-4 days Foshan to Hanoi. Freight $8-15/kg (5-7x more than sea freight). Suitable for samples, hotfix items and small high-value goods. Minimum charge $100 per order.",
      },
    ],
    related: [
      { label: "DDP Cost Calculator", href: "/info/ddp-calculator" },
      { label: "Import Guide", href: "/info/import-guide" },
      { label: "Payment Protection", href: "/info/payment-protection" },
      { label: "Order Tracking", href: "/info/order-tracking" },
    ],
    primaryCta: { label: "Calculate DDP cost for your order", href: "/info/ddp-calculator" },
  },
  "trade-assurance": {
    title: "Trade Assurance — Cross-border payment protection",
    intro:
      "An escrow mechanism operated by Huayuesc together with partner banks in Vietnam and China — the buyer pays into escrow, and the supplier only receives the funds after the goods are delivered to the agreed quality and specification. Every dollar the buyer sends has a legal shield.",
    icon: "🛡",
    category: "TRANSACTION PROTECTION",
    quickFacts: [
      { label: "Buyer fee", value: "0%" },
      { label: "Supplier fee", value: "1.5% / order" },
      { label: "Escrow banks", value: "Partner banks in Vietnam + China" },
      { label: "Inspection period", value: "7 days" },
      { label: "Max compensation", value: "100% of value" },
      { label: "Protection scope", value: "Growing cumulatively" },
    ],
    sectionTitles: [
      "What Trade Assurance is & why Vietnamese buyers need it",
      "How it works — 5 steps from PO to disbursement",
      "Protection scope — covered & not covered",
      "How to open a dispute & evidence",
      "Fees, limits & banking partners",
    ],
    paragraphs: [
      "Traditional cross-border B2B has a dangerous gap: the buyer usually has to wire a 30% deposit before the supplier starts production, and the remaining 70% before the supplier hands over the B/L. If the supplier ships the wrong spec, the wrong quality, or worst of all does not ship at all, the buyer has almost no international legal tool to quickly recover the money — cross-border litigation takes 12-24 months and lawyer fees usually exceed the value of orders under $50K. Trade Assurance closes this gap: instead of paying the supplier directly, the buyer pays into an escrow account controlled by a third party — Huayuesc's partner banking system. The supplier sees the money only after the buyer confirms the goods were received correctly. This model has become the standard for serious B2B platforms worldwide (Alibaba Trade Assurance, Made-in-China Secure Trade), and Huayuesc operates a localized version for the Vietnamese market — using Vietnamese banks for the payment side and partner Chinese banks for the disbursement side.",
      "The 5-step process: (1) The Buyer creates a PO on Huayuesc and ticks the 'Protect with Trade Assurance' checkbox — 0% fee for the buyer, with the supplier having included 1.5% in the list price. (2) The Buyer wires funds (TT bank wire or ACH) into the escrow account at a partner bank in Vietnam — the account number and order code are generated uniquely for each PO, with full IBAN/SWIFT. (3) Huayuesc notifies the supplier that the funds are locked, the supplier starts production and ships per the agreed Incoterms; for FOB/CIF, the original B/L is held by Huayuesc; for DDP, the tracking code is monitored continuously. (4) The Buyer receives the goods at the Vietnam port or their own warehouse, with 7 days to inspect (the inspection period); if the goods are satisfactory, the buyer signs to confirm on the dashboard or by email confirmation — Huayuesc disburses to the supplier via the partner Chinese bank within 24 business hours. (5) If within 7 days the buyer finds a problem — wrong spec, wrong quantity, poor quality — the buyer opens a dispute on the dashboard with evidence; the funds stay locked until the dispute is resolved.",
      "Trade Assurance protects the buyer in these cases: (a) Goods delivered that do not match the technical specification in the Contract/PI — wrong size, wrong color, wrong material, wrong certification (CE, FCC, RoHS missing or fake). (b) Quantity delivered short of the PO (e.g. a PO for 1,000 units, with 850 delivered without notice). (c) Poor quality by the AQL 2.5 standard — too many major/minor defects versus the signed pre-production sample. (d) Supplier default — failure to deliver on time (14-day tolerance), no response after collecting the money. (e) Goods damaged by non-standard packaging (wet or torn cartons, no proper pallets). Trade Assurance does NOT protect: (a) Goods damaged by the shipping line — that is the scope of Marine Insurance via Bảo Việt/PVI, which the buyer must purchase separately. (b) The buyer changing their mind after signing off the sample — an approved sample (by handwritten/email confirmation) is considered binding. (c) The buyer failing to inspect within 7 days, in which case the system auto-disburses per the terms (silence = acceptance). (d) Force majeure — storms, floods, pandemic, war — which has its own clause in the Terms of Service.",
      "When there is a problem, the buyer opens a dispute via the Huayuesc Dashboard, Orders, Open Dispute. The system requires uploading at a minimum: (a) Photos of the actual product at the warehouse (not at the port — they must be after unloading), at least 8 photos from various angles plus a close-up of the defect. (b) A 60-180 second unboxing video showing the outer carton condition plus the product inside. (c) A detailed table comparing the PO spec versus the actual spec. (d) Strongly recommended: a third-party inspection report (SGS, Bureau Veritas, TÜV Rheinland) — costing $200-450 per container, considered the strongest evidence in a dispute. The Huayuesc Dispute Officer reviews within 3 business days, holds a 3-way buyer-supplier-Huayuesc call (Vietnamese plus Chinese with simultaneous interpretation), and seeks a settlement: partial refund, free replacement, or credit on a later order. If no settlement is reached within 14 days, Huayuesc rules based on the evidence and terms — the buyer is refunded (full or partial) within 5-10 business days; the supplier loses rating points, has 10% of their reserved fund frozen, and on repeat offenses may lose their Verified tier.",
      "Fees and limits: Buyer 0% fee — Huayuesc charges nothing extra. The supplier pays 1.5% of the order value, already included in the public list price (not a hidden fee). Per-order limit: $1,000,000 for Free and Pro buyer tiers, $5,000,000 for large enterprise contracts (with full business KYC). Annual limit: $5M/buyer/year for Free + Pro, $50M/year for enterprise contracts — beyond that requires a separate contract and an escrow account via a partner bank through the Huayue Guangzhou office. Banking partner on the Vietnam side: a Vietnamese commercial bank; on the China side: a partner bank in China (via the Huayue Guangzhou office). 2025 figures: Huayue has protected order value for Vietnamese buyers, a dispute rate of 2.3%, an average resolution time of 11 business days, with most cases that have complete evidence resulting in a refund to the buyer.",
    ],
    pullQuote: {
      text: "Every dollar a Vietnamese buyer pays is protected by bank-grade legal assurance — that is the prerequisite for the cross-border trade bridge to stand, not an add-on feature.",
      author: "Huayuesc Trade Assurance Team",
    },
    checklist: [
      "🏦 Escrow via partner banks in Vietnam and China",
      "💸 Buyer pays 0% fee — the supplier pays 1.5%, already included in the price",
      "🛡 Protection of up to 100% of order value",
      "🔍 7-day inspection period after receiving goods",
      "⚖ Dispute mediation in 3 days, resolved in 11 days on average",
      "📊 Order value protected for Vietnamese buyers (growing steadily)",
    ],
    faq: [
      {
        q: "Does every order on Huayuesc have to use Trade Assurance?",
        a: "Not mandatory — buyers can turn off Trade Assurance if they have a long-standing relationship with the supplier and want to T/T directly. But we strongly recommend using it for the first order with any new supplier, or any order worth over $5,000. About 78% of orders on Huayuesc use Trade Assurance.",
      },
      {
        q: "If the buyer and supplier arrange payment outside Huayuesc, is it protected?",
        a: "No. Trade Assurance only applies to payments through Huayuesc's escrow account. Any P2P transaction between buyer and supplier outside the system is outside the protection scope. This is also why Huayuesc advises against personal transfers — always pay into the unique order-code account.",
      },
      {
        q: "Is a third-party inspection report (SGS, Bureau Veritas) mandatory when opening a dispute?",
        a: "Not mandatory for orders under $20,000 — detailed photos and video are enough. For orders over $20,000 or complex AQL/quality disputes, we strongly recommend a third-party report ($200-450 per container) — this evidence carries the most weight in the Dispute Officer's ruling.",
      },
      {
        q: "Does Trade Assurance cover logistics costs?",
        a: "Not directly. Trade Assurance only covers the goods value (FOB or CIF value). Shipping fees, customs duty and fees at the Vietnam port are not held in escrow. However, if an order is ruled for a refund due to the supplier's full fault, the supplier must additionally compensate the freight loss per the terms — this is negotiated case by case.",
      },
      {
        q: "If the supplier goes bankrupt or shuts down during production, what does the buyer get?",
        a: "The money is still in escrow, not with the supplier. Huayuesc refunds the buyer 100% within 7 business days (just needing legal confirmation that the supplier has ceased operations via Tianyancha or an official notice). This is one of the biggest advantages of escrow over direct T/T — the money is never part of the supplier's seizable assets.",
      },
    ],
    related: [
      { label: "Factory Audit Process", href: "/info/audit-process" },
      { label: "Real-time order tracking", href: "/info/order-tracking" },
      { label: "Terms of Service", href: "/info/terms-of-service" },
      { label: "Shipping Policy", href: "/info/shipping-policy" },
    ],
    primaryCta: { label: "Create a Trade Assurance protected order", href: "/buying-request" },
  },
  "market-reports": {
    title: "Market Reports — Market Intelligence for Vietnamese buyers",
    intro:
      "12-18 reports published each year for Huayue's 3 focus industries (Building Materials · Decoration Materials · Kitchen & Bathroom Appliances) — from Guangdong factory prices, CNY/VND exchange-rate movements and Shanghai Futures raw-material indices to the latest tax policies from Vietnam's General Department of Customs and GACC. Vietnamese buyers get the data to negotiate as equals with Chinese factories.",
    icon: "📊",
    category: "RESEARCH RESOURCES",
    quickFacts: [
      { label: "Reports / year", value: "12-18 (1-1.5/month)" },
      { label: "Industries covered", value: "3 (Building Materials · Decoration · Kitchen & Bathroom)" },
      { label: "Clusters covered", value: "Guangdong · Fujian · Shandong" },
      { label: "Audience", value: "Huayue buyers & distribution partners" },
      { label: "Fee", value: "Free for buyers who purchase" },
      { label: "Updated", value: "Start of each month" },
    ],
    sectionTitles: [
      "Why Vietnamese buyers need Market Intelligence",
      "3 report types across Huayue's 3 industries",
      "Report content — Factory prices, exchange rates, tax policy",
      "Methodology & data sources",
      "How to access",
    ],
    paragraphs: [
      "Sourcing B2B from China has long been a game in which the factory holds all the information and the Vietnamese buyer follows along. A Foshan factory knows exactly today's clay price, this week's CNY/VND rate and the upcoming VAT refund policy change — and all of this is used to price for the Vietnamese buyer. Meanwhile, the buyer sees only the final number the factory quotes, with no way to verify it. Huayue publishes Market Intelligence Reports to level the playing field: aggregating data from Huayue's own partner factories, the Shanghai Futures Exchange (SHFE), Vietnam's General Department of Customs and China's Ministry of Commerce (MOFCOM) — edited into easy-to-read Vietnamese reports with charts and actionable insights for buyers.",
      "Huayue focuses on 3 reports across its 3 core industries: <b>(1) Building materials</b> — prices of porcelain tile, sanitaryware, natural stone and construction steel from the Foshan, Chaozhou, Jinjiang and Fujian clusters. <b>(2) Interior decoration materials</b> — prices of sofas, kitchen cabinets, wood flooring, cladding stone and MDF/HDF from Lecong, Dongguan and Zhongshan. <b>(3) Kitchen & bathroom appliances</b> — prices of water heaters, gas cooktops, range hoods and smart toilet seats from Zhongshan and Midea. Each industry publishes 4-6 reports a year (monthly + quarterly + annual). Each report is 15-40 pages, with a Vietnamese version and a Chinese version (for the Guangzhou sourcing team).",
      "Each month's report content includes: (a) Factory price movements across the 3 industries — versus the previous month and the same period last year, with data from Huayue's own partner factories (anonymized aggregate). (b) CNY/VND/USD exchange rates — weekly movements, a short-term forecast of 1-2 months. (c) Key raw-material prices — ceramic clay, MDF/HDF timber, steel coil, copper, aluminum — from SHFE and related exchanges. (d) Import/export tax policy — updates on ACFTA/RCEP preferences for the 3 industries' HS codes, alerts when there are changes from Vietnam's General Department of Customs or GACC. (e) Industry news — newly opened factories, new technology (nano coating, 600×1200 ceramics, COB LED lighting), upcoming trade fairs. (f) Recommendations for buyers — good times to order (when raw materials are down), times to prepare for price rises (new tax policy).",
      "Methodology: triple-source validation — every critical figure has at least 3 independent sources in agreement. Factory price data: aggregated from 20+ Huayue partner suppliers (anonymized, aggregate only) plus crawling public prices from 1688.com and Made-in-China.com plus reports from Guangdong industry associations (the Foshan Chamber, the Guangdong Federation). Exchange rates: the reference interbank rate, the PBOC fix rate, Reuters spot. Raw materials: SHFE Shanghai Futures (steel, copper, aluminum), Bloomberg for oil. Policy: Vietnam's General Department of Customs, GACC, MOFCOM, Vietnam's Ministry of Finance. Editorial team: the Guangzhou sourcing team (factory expertise) plus the Hanoi team (Vietnam market expertise) plus a dedicated foreign-trade economist advisor.",
      "How to access reports: Huayue's Market Intelligence reports are <b>free for every buyer currently purchasing from Huayue</b> (added value of the partnership). Log in at huayuesc.vn, go to Buyer Center, and open the 'Market Reports' tab. Distribution partners with a signed partnership contract receive the reports plus an analysis for their business area. Prospective customers (not yet transacting) can view the Weekly Pulse (4-6 pages a week, free). Contact research@huayuesc.vn or sales@huayuesc.vn to receive a sample of the latest report.",
    ],
    pullQuote: {
      text: "A $50,000 sourcing decision cannot rest on gut feel or a single quote. Huayue provides the data for Vietnamese buyers to negotiate as equals with Chinese factories — that is the core of fair trade.",
      author: "Research Team — Huayue Vietnam",
    },
    checklist: [
      "📅 12-18 reports a year for Huayue's 3 focus industries",
      "🏭 Clusters covered: Foshan · Lecong · Dongguan · Zhongshan · Jinjiang",
      "💰 Free for buyers who purchase and Huayue distribution partners",
      "✅ Triple-source validation — figures verified from 3+ sources",
      "🔔 HS-code alerts when there are tax or policy changes",
      "🌐 Vietnamese version + Chinese version (for the sourcing team)",
    ],
    faq: [
      {
        q: "Are Huayue's reports translated into English?",
        a: "Currently Huayue publishes only in Vietnamese and Chinese. Buyers who need an English version for foreign partners/investors can email research@huayuesc.vn to request one — the Research team translates by hand for specific requests.",
      },
      {
        q: "I am not a Huayue buyer — can I still see the reports?",
        a: "Yes. The Weekly Pulse (4-6 pages a week) is free for every newsletter subscriber. The full monthly and quarterly reports are only for buyers currently transacting or for distribution partners — this is added value of working with Huayue, not a separate commercial product.",
      },
      {
        q: "Is the data updated in real time?",
        a: "PDF reports are updated on a cadence (weekly/monthly). The CNY/VND rate and certain key indices are updated automatically every day on the Buyer Center dashboard. Urgent information (e.g. a sudden tax change) is sent by email plus Zalo to active buyers.",
      },
      {
        q: "Do the reports share specific factory prices (by name)?",
        a: "No. Huayue only aggregates (e.g. 'the top 10 Foshan porcelain tile factories have an average price of $X/m², range $Y-Z'). If a buyer wants a specific quote from a particular factory, please use an RFQ on huayuesc.vn or contact a sourcing manager — that is the official, transparent channel.",
      },
      {
        q: "I subscribed to the Weekly Pulse but am not receiving emails?",
        a: "Email from research@huayuesc.vn may land in Spam/Promotions. Whitelist the domain. If you still do not receive it, contact support@huayuesc.vn — we will resend a login link so you can read it on the web.",
      },
    ],
    related: [
      { label: "Industry News (blog)", href: "/info/industry-news" },
      { label: "Subscribe to Trade Alert", href: "/trade-alert" },
      { label: "Association partner network", href: "/info/network" },
      { label: "Contact the Research team", href: "/info/contact" },
    ],
    primaryCta: { label: "View a free Weekly Pulse sample", href: "/info/industry-news" },
  },
  "api-integration": {
    title: "API Integration — REST API & Webhook for enterprises",
    intro:
      "Huayue is developing a REST API + Webhook so large enterprise buyers can integrate Huayue orders directly into their internal ERP (Misa, Bravo, FAST, SAP B1, Oracle NetSuite) — pushing orders to accounting, syncing inventory and issuing e-invoices per Decree 123/2020. The first version is expected in Q4 2026. Register for free 6-month early access at partnership@huayuesc.vn.",
    icon: "⚙️",
    category: "SYSTEM INTEGRATION",
    quickFacts: [
      { label: "Status", value: "In development — Coming Q4 2026" },
      { label: "Primary use case", value: "ERP integration for enterprise buyers" },
      { label: "Goal", value: "Sync Huayue orders ↔ the buyer's ERP" },
      { label: "Early registration", value: "partnership@huayuesc.vn" },
    ],
    sectionTitles: [
      "ERP & Webhook integration roadmap",
      "Use cases that will be supported",
      "Register to be notified at launch",
    ],
    paragraphs: [
      "Currently Huayue works with Vietnamese buyers mainly via the website, email and hotline. However, for large businesses (distributors, construction contractors, sizable interior design firms) that already have an internal ERP — Misa, Bravo, FAST, AccNet, SAP B1, or Oracle NetSuite — manually re-keying from Huayue into the ERP to issue e-invoices (per Decree 123/2020/NĐ-CP), sync inventory, or pull orders to trigger an internal workflow costs 20-40 admin hours a month. Huayue is building a REST API + Webhook to solve this.",
      "Use cases supported in the first API version (expected Q4 2026): (a) Pull orders from Huayue into the buyer's ERP (automatically triggering an internal PO, accounting, VAT invoice issuance). (b) Push order status from Huayue (production, container loading, port arrival, customs, warehouse delivery) into the buyer's ERP dashboard. (c) Event-driven webhooks for: order.created, order.shipped, order.delivered, dispute.opened, refund.processed. (d) Sync the catalog and partner DDP pricing. Built-in integration for ERPs popular in Vietnam: Misa SME, Bravo, FAST Accounting, KiotViet, Sapo, Haravan; SAP B1 and Oracle NetSuite for large enterprises (Q2 2027).",
      "Register to be notified at API launch: email partnership@huayuesc.vn with the subject 'API Integration Interest' and the following: company name, industry, current ERP, and expected orders per month. Huayue will give priority to buyers/partners who have already transacted to join the early access program (free for the first 6 months). For now, if you need integration urgently, the Huayue team can export orders to Excel/CSV on a schedule (daily/weekly) by email — a temporary solution until the official API launches.",
    ],
    pullQuote: {
      text: "We do not build an API to chase a trend — we build it when partners genuinely need it. The current priority: make the physical supply chain run well first, with software automation following.",
      author: "Operations Team — Huayue Vietnam",
    },
    checklist: [
      "🛠 REST API & Webhook on the roadmap — expected Q4 2026",
      "🎯 Goal: integrate enterprise buyers' ERPs (Misa, Bravo, FAST, SAP B1...)",
      "📥 Register for free 6-month early access: partnership@huayuesc.vn",
      "📊 Temporary solution: scheduled order export to Excel/CSV by email",
      "🆓 Free tier for buyers/distribution partners currently transacting with Huayue",
    ],
    faq: [
      {
        q: "I use Misa/Bravo/FAST — when will Huayue support automatic integration?",
        a: "Connectors for Misa SME, Bravo and FAST Accounting are in the first wave of the API release in Q4 2026. For now, if it is urgent, the Huayue technical team can export orders to Excel/CSV on a custom schedule (daily/weekly) by email — you import them manually into the ERP. Send a request to support@huayuesc.vn.",
      },
      {
        q: "When should I consider API integration?",
        a: "If your business processes more than 50 orders a month from Huayue, or needs to issue e-invoices within 24h per Decree 123/2020, or manages inventory via its own WMS — API integration saves 20-40 admin hours a month. Smaller businesses should use the web dashboard.",
      },
      {
        q: "Is there a cost for the API?",
        a: "Huayue is still designing the pricing model. Buyers and distribution partners currently transacting will get the first 6 months free (early access). After that, the plan is a free tier for up to 1,000 calls/day and a paid tier for enterprise. Details will be announced at launch.",
      },
    ],
    related: [
      { label: "Trade Assurance", href: "/info/trade-assurance" },
      { label: "Real-time order tracking", href: "/info/order-tracking" },
      { label: "Contact Partnership", href: "/info/contact" },
    ],
    primaryCta: { label: "Register to be notified at API launch", href: "mailto:partnership@huayuesc.vn?subject=API%20Integration%20Interest" },
  },
  "locale": {
    title: "Language & Currency",
    intro: "Huayuesc supports Vietnamese (default) and English. Currencies: VND, USD.",
    paragraphs: [
      "Vietnamese is the primary language. English is for international buyers interested in the Vietnamese market.",
      "Currency is displayed by your choice: VND (default), USD. Exchange rates update against the real-time reference interbank rate.",
      "A Chinese version will launch in Q3/2026 for suppliers reaching mainland Chinese buyers.",
    ],
  },
};

const SOCIAL_TOPICS = ["social-f", "social-y", "social-l", "social-z", "social-t"];

function getTopic(topic: string): Topic {
  if (TOPICS[topic]) return TOPICS[topic];
  if (SOCIAL_TOPICS.includes(topic)) {
    const platform: Record<string, string> = { "social-f": "Facebook", "social-y": "YouTube", "social-l": "LinkedIn", "social-z": "Zalo OA", "social-t": "TikTok" };
    const name = platform[topic] || "Social";
    return {
      title: `Huayuesc on ${name}`,
      intro: `Follow Huayuesc on ${name} for updates on new products, offers and industry news.`,
      paragraphs: [
        `Huayuesc's official ${name} channel updates content daily: factory tour videos, Canton Fair livestreams, sourcing guides and dealer success stories.`,
        `Join a community of 50,000+ Vietnamese buyers interested in B2B importing from China.`,
      ],
      related: [{ label: "Subscribe to Trade Alert", href: "/trade-alert" }],
    };
  }
  return {
    title: topic.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" "),
    intro: "This content page is being finalized.",
    paragraphs: [
      "The Huayuesc team is editing detailed content for this topic. Please check back later or send a specific request via RFQ.",
      "In the meantime, you can browse products by category or send an RFQ for direct support.",
    ],
    related: [
      { label: "Browse products", href: "/products" },
      { label: "Send an RFQ", href: "/buying-request" },
      { label: "Help Center", href: "/help" },
    ],
  };
}

/* Build a slug-friendly anchor id from a section heading. */
function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const t = getTopic(topic);

  // Pair section titles with paragraphs (1:1, with title=null meaning no header)
  const sections = t.paragraphs.map((p, i) => ({
    title: t.sectionTitles?.[i] ?? null,
    paragraph: p,
    id: slugify(t.sectionTitles?.[i] ?? `phan-${i + 1}`),
  }));
  const tocItems = sections.filter((s) => s.title);

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Information", href: "/help" },
          { label: t.title },
        ]}
      />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
      >
        <div className="max-w-[1100px] mx-auto px-4 py-10 max-md:py-7 grid grid-cols-[auto_1fr] gap-6 items-center max-md:grid-cols-1 max-md:gap-3">
          <div className="w-20 h-20 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-[40px] flex-shrink-0 max-md:w-14 max-md:h-14 max-md:text-[28px]">
            {t.icon || "📄"}
          </div>
          <div>
            {t.category && (
              <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2.5">
                {t.category}
              </span>
            )}
            <h1 className="text-[32px] font-extrabold leading-tight mb-2 max-md:text-[22px]">
              {t.title}
            </h1>
            <p className="text-[14px] opacity-90 leading-relaxed max-w-[680px] max-md:text-[12.5px]">
              {t.intro}
            </p>
          </div>
        </div>
        {/* Quick facts strip */}
        {t.quickFacts && t.quickFacts.length > 0 && (
          <div className="border-t border-white/10 bg-black/15">
            <div className="max-w-[1100px] mx-auto px-4 py-3 grid grid-cols-6 gap-3 text-center max-md:grid-cols-3 max-md:gap-2 max-md:py-2.5">
              {t.quickFacts.map((f) => (
                <div key={f.label} className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
                  <b className="block text-[15px] text-gold leading-tight max-md:text-[13px]">{f.value}</b>
                  <small className="text-[10.5px] opacity-75 uppercase tracking-wider max-md:text-[10px]">{f.label}</small>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* === BODY: article + sticky sidebar ================================ */}
      <div className="max-w-[1100px] mx-auto px-4 mt-6 mb-10 grid grid-cols-[1fr_280px] gap-7 max-lg:grid-cols-1 max-md:mt-4 max-md:mb-7">
        {/* === Article column =========================================== */}
        <article className="bg-paper border border-line rounded p-7 max-md:p-4">
          {/* Sections */}
          {sections.map((s, i) => (
            <div key={i} className={i > 0 ? "mt-6" : ""}>
              {s.title && (
                <h2 id={s.id} className="text-[19px] font-bold text-ink mb-3 pb-2 border-b border-line scroll-mt-20 max-md:text-[16px]">
                  {s.title}
                </h2>
              )}
              {/* Smart paragraph renderer — detects inline lists and breaks
                  them into <ul>. Falls back to a plain <p> when no list
                  patterns are found. */}
              <Fragment>
                <RenderParagraph text={s.paragraph} />
              </Fragment>

              {/* Pull-quote after first section */}
              {i === 0 && t.pullQuote && (
                <blockquote className="my-6 border-l-4 border-gold pl-5 py-2 italic text-[16px] text-ink leading-relaxed max-md:text-[14.5px]">
                  &ldquo;{t.pullQuote.text}&rdquo;
                  {t.pullQuote.author && (
                    <footer className="mt-2 text-[12.5px] text-mute not-italic">— {t.pullQuote.author}</footer>
                  )}
                </blockquote>
              )}
            </div>
          ))}

          {/* Checklist */}
          {t.checklist && t.checklist.length > 0 && (
            <div className="mt-7 bg-bg border-l-4 border-brand rounded-r p-5 max-md:p-3.5">
              <b className="block text-[14px] text-ink mb-3">✨ Huayuesc's Commitment</b>
              <ul className="space-y-2">
                {t.checklist.map((c, i) => (
                  <li key={i} className="flex gap-2.5 text-[13.5px] text-ink leading-relaxed">
                    <span className="text-success font-bold flex-shrink-0">✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ */}
          {t.faq && t.faq.length > 0 && (
            <div className="mt-8 pt-6 border-t-2 border-line">
              <h2 className="text-[19px] font-bold text-ink mb-4 max-md:text-[16px]">❓ Frequently Asked Questions</h2>
              <div className="space-y-2">
                {t.faq.map((q, i) => (
                  <details key={i} {...(i === 0 ? { open: true } : {})} className="border border-line rounded group/faq">
                    <summary className="px-4 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden flex justify-between items-center hover:bg-bg">
                      <b className="text-[13.5px] text-ink leading-snug">{q.q}</b>
                      <span className="text-mute2 text-[14px] group-open/faq:rotate-180 transition-transform flex-shrink-0 ml-3">▾</span>
                    </summary>
                    <p className="px-4 pb-4 pt-3 text-[13px] text-mute leading-relaxed border-t border-line">{q.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA card */}
          <div
            className="mt-8 rounded p-6 text-white max-md:p-4"
            style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
          >
            <div className="grid grid-cols-[1fr_auto] gap-4 items-center max-md:grid-cols-1">
              <div>
                <b className="block text-[16px] mb-1">Ready to start sourcing?</b>
                <p className="text-[12.5px] opacity-85 leading-snug">
                  Send a free RFQ and get quotes from 5-10 suppliers within 24h. No middlemen, no hidden fees.
                </p>
              </div>
              <div className="flex gap-2 max-md:flex-col">
                <Link
                  href={t.primaryCta?.href || "/buying-request"}
                  className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm font-bold text-[13px] hover:bg-[#E8943A] cursor-pointer text-center inline-block whitespace-nowrap"
                >
                  📩 {t.primaryCta?.label || "Send an RFQ now"}
                </Link>
                <Link
                  href="/help"
                  className="px-5 py-2.5 border-2 border-white/40 text-white rounded-sm font-bold text-[13px] hover:bg-white/10 cursor-pointer text-center inline-block whitespace-nowrap"
                >
                  💬 Help
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* === Sticky sidebar =========================================== */}
        <aside className="space-y-4 max-lg:hidden">
          <div className="bg-paper border border-line rounded p-4 sticky top-[5rem]">
            {tocItems.length > 0 && (
              <>
                <b className="block text-[12px] uppercase tracking-wider text-mute font-bold mb-2.5">
                  📑 Table of Contents
                </b>
                <ul className="space-y-1.5 mb-4 pb-4 border-b border-line">
                  {tocItems.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-[12.5px] text-ink hover:text-brand cursor-pointer block py-0.5"
                      >
                        → {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <b className="block text-[12px] uppercase tracking-wider text-mute font-bold mb-2.5">
              🔗 Related Links
            </b>
            <ul className="space-y-1.5">
              {(t.related && t.related.length > 0
                ? t.related
                : [
                    { label: "Help Center", href: "/help" },
                    { label: "Contact", href: "/info/contact" },
                  ]
              ).map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-[12.5px] text-brand hover:underline cursor-pointer block py-0.5">
                    → {r.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/buying-request"
              className="mt-4 block text-center py-2 bg-accent text-white rounded-sm font-bold text-[12.5px] cursor-pointer hover:opacity-90"
            >
              🚀 Send an RFQ
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const t = getTopic(topic);
  return { title: `${t.title} — Huayuesc` };
}
