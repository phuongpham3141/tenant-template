import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const HERO_STATS = [
  { n: "8–12", l: "Days from order to in-hand", icon: "⏱" },
  { n: "$30-200", l: "Sample fee (refunded on MOQ)", icon: "💰" },
  { n: "100%", l: "Fee refunded when you place a MOQ", icon: "↩" },
  { n: "4%", l: "Complaint rate after sampling (vs. 22% without)", icon: "📉" },
];

const WHY_REASONS = [
  {
    icon: "🤲",
    title: "Feel the Real Material",
    desc: "Studio photos shot under 5,500K lighting + retouching can never replace holding it in your hand. Weight, smoothness, elasticity, thickness — only a sample reveals these.",
  },
  {
    icon: "📐",
    title: "Measure Dimensions Precisely",
    desc: "Dimensions on a website often vary by 2–5 mm from actual production. Order a sample to measure with calipers and check tolerance — avoiding packaging errors later when loading the container.",
  },
  {
    icon: "🌈",
    title: "Check Color Under Natural Light",
    desc: "RGB on screen ≠ real CMYK ≠ Pantone color. Especially for wood, fabric, and ceramics — grain/color differences under room light vs. sunlight can vary by 5–15%.",
  },
  {
    icon: "📦",
    title: "Assess Standard Packaging",
    desc: "Is the carton shock-resistant? Are there corner protectors? Enough layers of bubble wrap? Is the label export-grade (FRAGILE, multilingual)? A sample reveals the supplier's true packing standard.",
  },
  {
    icon: "📜",
    title: "Verify the Accompanying Paperwork",
    desc: "Is the manual translated into Vietnamese? Is the included certificate an original or a blurry copy? Is there an invoice? A warranty card? The professionalism of the paperwork reflects the supplier's maturity.",
  },
  {
    icon: "🛡",
    title: "Test Compliance Before MOQ",
    desc: "A sample can be sent to an independent lab (SGS/BV) to test heavy metals, formaldehyde, and durability. Passing the test = confidence to place a $50K MOQ — failing = switch suppliers.",
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    icon: "🔍",
    title: "Find the Product & Request a Sample",
    duration: "5 minutes",
    color: "#0E7490",
    desc: "On the product detail page, click the 'Request Sample' button — the form auto-fills the productId, supplier info, and reference MOQ price. The buyer only needs to enter the delivery address and select a variant if needed.",
    actions: [
      "Click 'Request Sample' on the product detail",
      "Or submit via the RFQ form (multi-product)",
      "Or copy the SKU into an inquiry chat with your account manager",
    ],
  },
  {
    n: "02",
    icon: "⚙️",
    title: "Configure the Sample — Variant / OEM",
    duration: "10–15 minutes",
    color: "#7C3AED",
    desc: "Choose the right sample type: Standard (as in the catalog) with a free mock-up · Variant (different color/size) +$0-50 · OEM (custom logo/brand) +$80-300 mock-up fee. Your CSR account manager reviews the configuration within 2–4 hours before forwarding it to the supplier.",
    actions: [
      "Standard: 1 standard sample from the supplier, no customization",
      "Variant: choose a different color/size from the supplier's catalog",
      "OEM: upload a logo file (vector .ai/.svg), specify Pantone brand colors",
      "Multi-supplier: request from 3–5 suppliers to compare",
    ],
  },
  {
    n: "03",
    icon: "💳",
    title: "Pay the Sample Fee Into Escrow",
    duration: "1–3 hours",
    color: "#16A34A",
    desc: "The $30-200 fee + $20-40 shipping is paid into Huayue's escrow account at a Vietnamese partner bank — not transferred directly to the supplier. Trade Assurance still applies: if the supplier ships the wrong sample, you get a 100% refund via escrow.",
    actions: [
      "Methods: TT bank wire / VietQR / credit card",
      "A unique order code is generated for each sample order",
      "Note: 100% of the sample fee is refunded when you place a MOQ with the same supplier",
    ],
  },
  {
    n: "04",
    icon: "🏭",
    title: "Supplier Produces the Sample",
    duration: "3–7 days",
    color: "#92400E",
    desc: "The supplier receives the order and begins preparing the sample. A Standard sample is pulled from finished-goods stock (1–2 days). A Variant requires running each unit custom (3–5 days). OEM requires tooling/logo printing (5–10 days). The supplier updates progress on the dashboard with production photos.",
    actions: [
      "The buyer is notified when the supplier accepts the order",
      "Progress updates with photos + video via Zalo OA / dashboard",
      "The buyer can chat directly with the supplier through Huayue (with a translator)",
      "Request a video call to view the mock-up before finalizing",
    ],
  },
  {
    n: "05",
    icon: "📦",
    title: "Huayue Guangzhou Office",
    duration: "1–3 days",
    color: "#A21CAF",
    desc: "The supplier ships the sample to the Huayue office in Guangzhou (in Haizhu District, connected to the Foshan and Dongguan clusters — most suppliers commit to delivery within 24–48h). CSR consolidates 8–15 samples each week into one master air shipment to Hanoi — saving buyers 50–60% on freight.",
    actions: [
      "The Guangzhou office is open Mon–Fri, shipping the batch every Friday",
      "Each sample is tagged with a QR code for individual tracking",
      "The Huayue Guangzhou team does a preliminary check: correct SKU, correct variant, export-grade packaging",
      "The buyer is notified when the sample arrives at the Huayue Guangzhou office",
    ],
  },
  {
    n: "06",
    icon: "✈️",
    title: "Air Shipment + Vietnam Last-Mile",
    duration: "3–5 days",
    color: "#DC2626",
    desc: "The master shipment goes by DHL/FedEx/UPS air (4–5 days Guangzhou → Hanoi), clears customs at Noi Bai or Tan Son Nhat, then forwards last-mile via GHN/J&T right to the buyer. Total delivery time is 8–12 days from order.",
    actions: [
      "Real-time tracking via Zalo OA + email",
      "Customs clearance: a sample under $200 = commercial sample, VAT-exempt",
      "Last-mile: 24–48h for Hanoi/Ho Chi Minh City, 2–4 days for distant provinces",
      "Buyer signs for receipt → close the order → begin inspection",
    ],
  },
];

const SAMPLE_TYPES = [
  {
    type: "Standard",
    color: "#0E7490",
    icon: "📦",
    fee: "$30-100",
    leadtime: "8–10 days",
    desc: "A sample identical to the catalog, no customization. Best when you want to verify baseline quality before placing a standard MOQ.",
    bestFor: "First-time sourcing with a new supplier · Verify baseline quality · Test standard packaging",
    pros: ["Cheapest and fastest", "Supplier pulls from finished-goods stock", "Mock-up fee = $0"],
    cons: ["No customization", "May not match the exact color/size you need"],
  },
  {
    type: "Variant",
    color: "#7C3AED",
    icon: "🎨",
    fee: "$50-150",
    leadtime: "10–12 days",
    desc: "Choose a different color / size / material from the supplier's catalog, but not yet OEM. Best when you need to verify a specific variant before MOQ.",
    bestFor: "Verify a specific variant · Compare 2–3 colors of the same SKU · Test a special size",
    pros: ["Closer to the real MOQ than Standard", "Supplier runs 3–5 custom units", "Full Trade Assurance protection"],
    cons: ["30–50% pricier than Standard", "Delivery time +2–3 days", "Some suppliers decline if the variant MOQ is over 1,000"],
  },
  {
    type: "OEM",
    color: "#A21CAF",
    icon: "🏷",
    fee: "$80-300 + mock-up",
    leadtime: "12–21 days",
    desc: "Custom own-brand logo, custom Pantone color, and optionally custom packaging. This sample is mandatory before placing an OEM MOQ — it cannot be skipped.",
    bestFor: "Own-brand OEM · Test logo print quality · Custom packaging · Private label",
    pros: ["A finished product carrying your brand", "You can shoot marketing photos before MOQ", "Verify the supplier's real OEM capability"],
    cons: ["Most expensive, longest lead time", "The $80-300 mock-up fee is not refunded immediately (only on MOQ)", "Requires a proper vector logo file"],
  },
];

const COST_TABLE = [
  { item: "Sample fee (Standard)", range: "$30-100", note: "Varies by industry — ceramics cheapest, electronics priciest" },
  { item: "Sample fee (Variant)", range: "$50-150", note: "Add 30–50% over Standard for custom color/size" },
  { item: "Sample fee (OEM)", range: "$80-300", note: "Plus an $80-300 logo mock-up fee" },
  { item: "Shipping, Huayue Guangzhou Office → Vietnam (consolidated)", range: "$20-40", note: "Per sample when batched. Saves 50–60% vs. shipping separately" },
  { item: "Separate shipping (express)", range: "$60-120", note: "If you need it urgently, not batched" },
  { item: "Vietnam domestic last-mile", range: "$2-5", note: "GHN/J&T right to the buyer's warehouse, already included in the ship fee" },
  { item: "Sample subscription plan", range: "$99/month", note: "Unlimited samples, pay only the product fee — for buyers placing over 5 samples/month" },
  { item: "Customs duty / VAT", range: "$0", note: "A sample under $200 = commercial sample, exempt under NĐ 134/2016" },
];

const PRE_MOQ_CHECKLIST = [
  {
    category: "Material",
    icon: "🧪",
    items: [
      "Actual weight measured on a digital scale (vs. spec)",
      "Material thickness measured with calipers at 5 different points",
      "Bend/scratch test — does the material scratch or break easily?",
      "(Optional) Send to an SGS lab to test heavy metals + formaldehyde — $200-450",
    ],
  },
  {
    category: "Dimensions",
    icon: "📐",
    items: [
      "Measure the full dimension per the PO spec (length × width × height)",
      "Check tolerance: ±2 mm for hardware, ±5 mm for wood, ±1 mm for electronics",
      "Measure 3–5 different points on one sample to verify consistency",
      "Compare against the OEM sample sent last time (if reordering)",
    ],
  },
  {
    category: "Finish & Color",
    icon: "🎨",
    items: [
      "Check the finish: smooth/matte/glossy — matching the PI spec?",
      "Check color under 3 conditions: room (3000K) + sunlight (5500K) + white LED (4000K)",
      "Verify the Pantone color value with a spectrophotometer or a physical color card",
      "Check for scratches, dents, or surface defects",
    ],
  },
  {
    category: "Packaging",
    icon: "📦",
    items: [
      "Is the carton rigid enough? Test by pressing down from the top",
      "Are there corner protectors for fragile goods?",
      "Bubble wrap / foam — enough protective layers?",
      "Is the label multilingual (Chinese-English-Vietnamese)? Does it show FRAGILE, THIS SIDE UP, MAX STACK?",
    ],
  },
  {
    category: "Documents & Certs",
    icon: "📜",
    items: [
      "Is the manual in Vietnamese or English? Are there safety instructions?",
      "Certificate (CE/FCC/RoHS/CB) — original or scan? Can you verify the QR code?",
      "Does the invoice / Commercial Invoice have the full HS code, FOB price, weight?",
      "SGS/BV test report if any — verify it on the independent lab's portal",
    ],
  },
];

const SAMPLE_SUB_FEATURES = [
  { icon: "♾", title: "Unlimited Samples", desc: "No limit on samples per month — pay only the product fee" },
  { icon: "🚀", title: "Priority Shipping", desc: "Your samples get priority batching twice a week instead of once" },
  { icon: "🤝", title: "Dedicated Manager", desc: "A dedicated account manager handles your sample orders, responding in 4 hours" },
  { icon: "📞", title: "Free Supplier Video Calls", desc: "Schedule a video call to review the mock-up with the supplier via the Huayue Guangzhou team" },
  { icon: "📊", title: "Dashboard Tracking", desc: "Track all in-progress samples, ETAs, and supplier comparison" },
  { icon: "↩", title: "100% Refund on MOQ", desc: "All of the month's sample fees are refunded when you place a MOQ of $5K or more" },
];

const PITFALLS = [
  {
    icon: "🚫",
    title: "Contacting the supplier directly to cut fees",
    why: "You lose Trade Assurance protection, have no industry translator, and cannot leverage the Huayue Guangzhou office for consolidation. You save $20-40 but take on far more risk.",
  },
  {
    icon: "⚠️",
    title: "Sampling a single supplier and placing the MOQ right away",
    why: "There is no baseline for comparison. Best practice: sample 3–5 suppliers for the same SKU, compare quality + price + delivery time, then place the MOQ with the best supplier.",
  },
  {
    icon: "🔇",
    title: "Not inspecting the sample carefully before placing the MOQ",
    why: "A beautiful sample but an MOQ run on a different line can differ significantly. Investing 1–2 hours to measure + photograph + lab-test the sample avoids losses of $50K+ on the MOQ.",
  },
  {
    icon: "💸",
    title: "Begrudging the $80-300 mock-up for an OEM sample",
    why: "OEM with no sample = ordering blind. The logo may print off-center, the color may not match Pantone, the packaging may not print — discovering it after 5,000 units are produced is far too late.",
  },
  {
    icon: "📵",
    title: "Skipping the mock-up review video call",
    why: "It is a free service, yet many buyers skip it. A 15-minute video call with the supplier before finalizing the sample can avoid basic errors (logo size, color mode, font).",
  },
  {
    icon: "📅",
    title: "Ordering a sample right before Chinese New Year / National Day",
    why: "Chinese New Year (Spring Festival) in January-February → suppliers close for 7–15 days. National Day in early October → 7 days. Delivery time can double. Plan 4–6 weeks ahead.",
  },
];

const FAQ = [
  {
    q: "Can I order a sample directly from the supplier instead of through Huayue?",
    a: "Technically yes, but it is not recommended. Ordering yourself from the supplier means: negotiating in Chinese, paying full air freight ($60-120 instead of $20-40), no Trade Assurance protection (a wrong sample = lost money), and no Huayue Guangzhou team tracking progress. Through CSR it is 30–50% cheaper and safer — that is the value of the Huayue Guangzhou office.",
  },
  {
    q: "How does a sample differ from MOQ goods?",
    a: "A Standard sample is a product pulled from finished-goods stock or run on a small trial line — essentially the same as MOQ goods. However, some suppliers make samples on a manual machine (sample line) rather than the automated production line, which can cause minor differences in finish and uniformity. When you place a MOQ, CSR always runs pre-shipment QC (pre-shipment inspection AQL 2.5) to ensure the MOQ is consistent with the signed sample.",
  },
  {
    q: "Can I request samples from several suppliers at once to compare?",
    a: "Absolutely you should. The best practice of a professional buyer: 'Multi-supplier sampling' — order 3–5 samples of the same SKU from different suppliers via an RFQ on Huayue. Huayue consolidates them all into one master air shipment to Vietnam, and the buyer receives them on the same day to compare side by side. The ship fee is still only $20-40/sample (consolidated), not $60-120 if shipped separately from each supplier.",
  },
  {
    q: "100% of the sample fee is refunded on MOQ — how exactly does that work?",
    a: "When the buyer places a MOQ with the same supplier within 90 days of receiving the sample, the entire sample fee (product + mock-up for OEM, NOT including the ship fee) is deducted directly from the MOQ invoice. For example: you pay a $250 sample fee + $30 ship → place a $5,000 MOQ → you only pay $4,750 (250 deducted). The $30 ship fee is not refunded because it is a logistics cost already incurred.",
  },
  {
    q: "Does a sample owe duty / VAT when imported into Vietnam?",
    a: "No, if the sample value is under $200 USD. Under NĐ 134/2016/NĐ-CP on import-export tax administration, a commercial sample valued under $200 is exempt from import duty and VAT. CSR declares the sample as 'Commercial Sample, No Commercial Value' with the real value to clear customs quickly. Over $200, normal import duty + 10% VAT applies.",
  },
  {
    q: "Is the $99/month sample subscription worth it?",
    a: "Yes, for buyers placing over 5 samples/month. For example: a trader sourcing many new SKUs each month, a design studio ordering samples to show clients, or a buying agent for tier-2 dealers. A single sample costs $50-150 in product fees + $20-40 ship → 5 samples = $350-950. The subscription is just $99 + product fees, saving 70%+. For frequent buyers, the ROI is clear from the second month.",
  },
  {
    q: "I received the sample and it looks great — should I place the MOQ now or wait and test more?",
    a: "We recommend 7–14 more days of testing before placing the MOQ. Specifically: (1) Durability test — does the sample hold up to a week of real use? (2) Test with end customers — show the sample to 3–5 potential customers and gather feedback. (3) Lab test (optional, $200-450) for material safety if the product is for children / food contact / electrical. (4) Verify the supplier still has capacity and the MOQ delivery time. Investing these 2 weeks avoids 90% of MOQ risk.",
  },
  {
    q: "If the sample is damaged in transit — how is it handled?",
    a: "CSR ships samples via DHL/FedEx/UPS with full insurance. If a sample is damaged in shipping (wet, crushed, or dented carton): the buyer photographs it + files a report at the time of receipt and sends it to dispute@huayuesc.vn. Trade Assurance refunds 100% of the sample fee (including shipping) within 5–7 business days. The supplier ships a new sample free with a 5–7 day delivery time. This incident is rare — under 1% in 2025.",
  },
];

function StatTile({ n, l, icon }: { n: string; l: string; icon: string }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded p-4 backdrop-blur-sm">
      <div className="text-[20px] mb-1">{icon}</div>
      <div className="text-[24px] font-extrabold leading-none">{n}</div>
      <div className="text-[11px] opacity-85 mt-1">{l}</div>
    </div>
  );
}

export default function DatMauPage() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Information", href: "/help" },
          { label: "Sample Orders" },
        ]}
      />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #001A3F 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-brand-light blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-12 max-md:py-8">
          <span className="inline-block bg-gold text-brand-dark text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wider mb-3">
            📦 SAMPLE ORDERS
          </span>
          <h1 className="text-[40px] font-extrabold leading-[1.1] mb-4 max-md:text-[26px]">
            A $50 sample fee — the cheapest insurance<br />
            <span className="text-gold">for your next $50,000 MOQ</span>
          </h1>
          <p className="text-[15px] opacity-90 max-w-[780px] leading-relaxed mb-7 max-md:text-[13px]">
            Sampling is a step you cannot skip when sourcing from a supplier for the first time. Per 2025 CSR data: <b className="text-gold">22% of MOQ orders placed without a prior sample</b> have a quality complaint — a figure that <b className="text-gold">drops to 4% when the buyer samples first</b>. The Huayue Guangzhou office in Guangzhou consolidates shipping to save 50–60% on freight, delivers in 8–12 days, and refunds 100% of the fee when you place a MOQ with the same supplier.
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {HERO_STATS.map((s) => (
              <StatTile key={s.l} {...s} />
            ))}
          </div>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link
              href="/products"
              className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              🔍 Find a product to sample
            </Link>
            <a
              href="#sample-subscription"
              className="px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              ♾ Sample subscription $99/month
            </a>
          </div>
        </div>
      </section>

      {/* === Why samples matter ============================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-9">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">WHY SAMPLE</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">6 Things You Cannot Tell From Photos / Specs</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            The catalog has full specs, beautiful studio photos, and a detailed factory tour video — but there are still 6 factors you can only verify with a sample in hand.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {WHY_REASONS.map((r) => (
            <div key={r.title} className="bg-paper border border-line rounded p-5 hover:border-brand transition">
              <div className="text-[32px] mb-2">{r.icon}</div>
              <b className="block text-[15px] text-ink mb-2 leading-tight">{r.title}</b>
              <p className="text-[12.5px] text-mute leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Big comparison stat */}
        <div className="mt-6 bg-paper border-2 border-gold rounded p-5 grid grid-cols-2 gap-4 items-center max-md:grid-cols-1">
          <div className="text-center border-r border-line pr-4 max-md:border-r-0 max-md:border-b max-md:pr-0 max-md:pb-4">
            <div className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1">No sample before MOQ</div>
            <div className="text-[48px] font-extrabold text-accent leading-none">22%</div>
            <div className="text-[12px] text-mute mt-1">of MOQ orders have a quality complaint</div>
          </div>
          <div className="text-center">
            <div className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1">Full sampling before MOQ</div>
            <div className="text-[48px] font-extrabold text-success leading-none">4%</div>
            <div className="text-[12px] text-mute mt-1">— 5.5× lower risk for just $50-200</div>
          </div>
        </div>
      </section>

      {/* === Process steps ================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">6-STEP PROCESS</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">From Clicking 'Request Sample' to Holding It in Hand</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            On average 8–12 days for the full process. The buyer handles only 2 steps (request + payment). The other 4 steps are carried out automatically by the supplier + Huayue Guangzhou office + CSR Logistics.
          </p>
        </div>
        <div className="space-y-3">
          {PROCESS_STEPS.map((s, idx) => (
            <article key={s.n} className="bg-paper border-l-4 rounded-r p-5 max-md:p-4" style={{ borderColor: s.color }}>
              <div className="flex gap-4 max-md:flex-col">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded flex items-center justify-center font-extrabold text-white text-[18px] shadow-md"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.n}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[28px]">{s.icon}</span>
                      <div>
                        <h3 className="text-[17px] font-bold text-ink leading-tight">{s.title}</h3>
                        <span className="text-[10.5px] uppercase tracking-wider font-bold" style={{ color: s.color }}>STEP {s.n}</span>
                      </div>
                    </div>
                    <span className="text-[11px] bg-bg border border-line px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider text-mute">
                      🕒 {s.duration}
                    </span>
                  </div>
                  <p className="text-[13px] text-mute leading-relaxed mb-3">{s.desc}</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] max-md:grid-cols-1">
                    {s.actions.map((a, i) => (
                      <li key={i} className="flex gap-2 text-ink">
                        <span style={{ color: s.color }} className="flex-shrink-0">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === Huayue Guangzhou Office explanation ========================================= */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="rounded p-6 max-md:p-4 border-2 border-[#A21CAF]" style={{ background: "linear-gradient(135deg, #A21CAF08, #A21CAF02)" }}>
          <div className="flex items-start gap-4 max-md:flex-col">
            <div className="w-16 h-16 rounded-md flex items-center justify-center text-[30px] flex-shrink-0" style={{ background: "#A21CAF20" }}>
              🏪
            </div>
            <div className="flex-1">
              <span className="inline-block bg-[#A21CAF] text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm mb-2">
                A CSR INNOVATION
              </span>
              <h2 className="text-[20px] font-bold text-ink mb-2">Huayue Guangzhou Office — Consolidated shipping that saves 50–60%</h2>
              <p className="text-[13px] text-ink leading-relaxed mb-3">
                Instead of shipping each sample separately (air freight of $60-120 per shipment), CSR runs the Huayue Guangzhou office in Guangzhou (in Haizhu District, connected to the Foshan and Dongguan clusters). Suppliers deliver samples to the Hub within 24–48h. Each week the Hub consolidates <b>8–15 samples from many Vietnamese buyers</b> into <b>one master air shipment</b> via DHL/FedEx to Hanoi — just <b>one freight charge of $80-150 split evenly</b> across the buyers.
              </p>
              <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
                <div className="bg-paper border border-line rounded p-3 text-center">
                  <div className="text-[22px] font-extrabold text-[#A21CAF]">$60-120</div>
                  <div className="text-[11px] text-mute">Shipped separately (per sample)</div>
                </div>
                <div className="bg-paper border border-line rounded p-3 text-center">
                  <div className="text-[22px] font-extrabold text-[#A21CAF]">$20-40</div>
                  <div className="text-[11px] text-mute">Via Huayue Guangzhou Office (consolidated)</div>
                </div>
                <div className="bg-success/10 border border-success/30 rounded p-3 text-center">
                  <div className="text-[22px] font-extrabold text-success">−60%</div>
                  <div className="text-[11px] text-success">Average savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === 3 sample types ================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">3 SAMPLE TYPES</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">Standard · Variant · OEM — Choose the Right Purpose</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Each type has a different cost, delivery time, and level of accuracy. Choosing the wrong type can cost you $300 for a sample that does not fit your real purpose.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {SAMPLE_TYPES.map((s) => (
            <article key={s.type} className="bg-paper border-2 rounded overflow-hidden flex flex-col" style={{ borderColor: s.color }}>
              <div className="px-5 py-4 text-white" style={{ background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}DD 100%)` }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[28px]">{s.icon}</span>
                  <h3 className="text-[20px] font-extrabold">{s.type}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
                  <div>
                    <div className="opacity-80">Fee</div>
                    <b className="text-[14px]">{s.fee}</b>
                  </div>
                  <div>
                    <div className="opacity-80">Lead time</div>
                    <b className="text-[14px]">{s.leadtime}</b>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[12.5px] text-mute leading-relaxed mb-3">{s.desc}</p>
                <div className="bg-bg border border-line rounded p-2.5 mb-3">
                  <b className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1 block">BEST FOR</b>
                  <p className="text-[11.5px] text-ink leading-snug">{s.bestFor}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <b className="block text-success mb-1">✓ Pros</b>
                    <ul className="space-y-0.5 text-mute">
                      {s.pros.map((p, i) => <li key={i}>• {p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <b className="block text-accent mb-1">✕ Cons</b>
                    <ul className="space-y-0.5 text-mute">
                      {s.cons.map((c, i) => <li key={i}>• {c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === Cost breakdown table =========================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">TRANSPARENT PRICING</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">Detailed Fee Table — No Hidden Charges</h2>
        </div>
        <div className="bg-paper border border-line rounded overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-bg border-b-2 border-brand">
                <th className="text-left px-4 py-3 font-bold text-ink">Item</th>
                <th className="text-left px-4 py-3 font-bold text-ink">Fee</th>
                <th className="text-left px-4 py-3 font-bold text-ink max-md:hidden">Note</th>
              </tr>
            </thead>
            <tbody>
              {COST_TABLE.map((c, i) => (
                <tr key={i} className="border-b border-line hover:bg-bg/50">
                  <td className="px-4 py-2.5 text-ink font-semibold">{c.item}</td>
                  <td className="px-4 py-2.5 text-brand font-bold">{c.range}</td>
                  <td className="px-4 py-2.5 text-mute text-[12px] max-md:hidden">{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11.5px] text-mute mt-3 italic text-center">
          💡 All product + mock-up fees are refunded 100% when you place a MOQ of $5K or more with the same supplier within 90 days. Ship fees are not refunded (already incurred).
        </p>
      </section>

      {/* === Pre-MOQ checklist ============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">PRE-MOQ CHECKLIST</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">5 Groups to Check When You Receive the Sample</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Investing 1–2 hours to inspect the sample in detail per this checklist can avoid 90% of MOQ risk. Print it out or save it as a template.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {PRE_MOQ_CHECKLIST.map((c) => (
            <article key={c.category} className="bg-paper border border-line rounded p-5">
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-line">
                <div className="w-12 h-12 rounded-md bg-brand/10 border border-brand/30 flex items-center justify-center text-[24px] flex-shrink-0">
                  {c.icon}
                </div>
                <h3 className="text-[16px] font-bold text-ink">{c.category}</h3>
              </div>
              <ul className="space-y-2 text-[12.5px]">
                {c.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-ink leading-relaxed">
                    <input type="checkbox" className="mt-0.5 flex-shrink-0 cursor-pointer" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* === Sample subscription plan ============================================ */}
      <section id="sample-subscription" className="max-w-[1200px] mx-auto px-4 mt-12 scroll-mt-20">
        <div className="rounded overflow-hidden border-2 border-gold">
          <div className="px-6 py-5 text-brand-dark bg-gold">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="text-[36px]">♾</span>
                <div>
                  <span className="text-[10.5px] uppercase tracking-wider font-bold">POWER-USER PROGRAM</span>
                  <h2 className="text-[24px] font-extrabold leading-tight">Sample Subscription Plan</h2>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[36px] font-extrabold leading-none">$99</div>
                <div className="text-[12px]">/month — no commitment</div>
              </div>
            </div>
          </div>
          <div className="p-6 max-md:p-4 bg-paper">
            <p className="text-[13px] text-ink leading-relaxed mb-4">
              For buyers placing more than 5 samples/month (traders, design studios, buying agents, dealers focused on sourcing). Pay a fixed $99 — pay only the product fee for each sample, with no Hub ship fee. The ROI is usually clear from month 2.
            </p>
            <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
              {SAMPLE_SUB_FEATURES.map((f) => (
                <div key={f.title} className="bg-bg border border-line rounded p-3 hover:border-gold transition">
                  <div className="text-[24px] mb-1.5">{f.icon}</div>
                  <b className="block text-[13px] text-ink mb-1 leading-tight">{f.title}</b>
                  <p className="text-[11.5px] text-mute leading-snug">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <a
                href="mailto:sales@huayuesc.vn?subject=Sample subscription plan"
                className="inline-block px-6 py-3 bg-brand text-white rounded-sm font-bold text-[14px] hover:bg-brand-light"
              >
                🚀 Sign up for the Sample Subscription
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === Common pitfalls ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-accent font-bold">⚠️ AVOID THESE</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">6 Common Mistakes When Ordering Samples</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Compiled from feedback from 600+ CSR buyers. Avoiding these 6 = saving an average of $1,200/year and a lot of time.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {PITFALLS.map((p) => (
            <div key={p.title} className="bg-paper border border-line rounded p-4 hover:border-accent transition">
              <div className="flex gap-3 items-start">
                <span className="text-[24px] flex-shrink-0">{p.icon}</span>
                <div className="flex-1">
                  <b className="block text-[13.5px] text-ink mb-1.5 leading-tight">{p.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{p.why}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === FAQ =========================================================== */}
      <section className="max-w-[900px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">The 8 Most Important Questions</h2>
        </div>
        <div className="space-y-2">
          {FAQ.map((f, i) => (
            <details key={i} className="group bg-paper border border-line rounded">
              <summary className="cursor-pointer px-4 py-3 flex justify-between items-center gap-3 list-none">
                <b className="text-[13.5px] text-ink flex-1">{f.q}</b>
                <span className="text-mute group-open:rotate-180 transition-transform text-[12px]">▾</span>
              </summary>
              <div className="px-4 pb-4 pt-1 text-[13px] text-mute leading-relaxed border-t border-line">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* === Final CTA ====================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 mb-10">
        <div
          className="rounded p-8 text-white text-center max-md:p-5"
          style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #001A3F 100%)" }}
        >
          <h3 className="text-[28px] font-extrabold mb-2 max-md:text-[22px]">Order your first sample today</h3>
          <p className="text-[14px] opacity-90 mb-6 max-w-[660px] mx-auto leading-relaxed">
            Find a product in the 200K+ SKU catalog and click 'Request Sample' — the Huayue Guangzhou office consolidates shipping, delivers in 8–12 days, and refunds 100% of the fee when you place a MOQ. There is no reason to skip this step.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              🔍 Browse 200K+ products
            </Link>
            <Link
              href="/buying-request"
              className="inline-block px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              📝 Multi-supplier RFQ
            </Link>
            <a
              href="mailto:sales@huayuesc.vn"
              className="inline-block px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90"
            >
              💬 1-on-1 consultation with an AM
            </a>
          </div>
          <div className="mt-5 pt-5 border-t border-white/15 text-[11.5px] opacity-75 max-w-[680px] mx-auto leading-relaxed">
            A sample under $200 is exempt from import duty + VAT under NĐ 134/2016. Trade Assurance protection applies to every sample. 100% of product + mock-up fees are refunded when you place a MOQ of $5K or more within 90 days.
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "Sample Orders — Huayuesc",
  description: "A 6-step process to order samples from Chinese suppliers to Vietnam. The Huayue Guangzhou office consolidates shipping to save 50–60% on freight, delivers in 8–12 days, and refunds 100% of the fee on MOQ. 22%→4% lower complaint risk thanks to sampling.",
};
