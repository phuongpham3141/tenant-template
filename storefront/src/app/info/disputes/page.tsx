import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const HERO_STATS = [
  { n: "Majority", l: "Of disputes resolved in the buyer's favor with full evidence", icon: "⚖️" },
  { n: "<24h", l: "Average response time", icon: "⏱" },
  { n: "Cumulative", l: "Order value protected by Huayue", icon: "🛡" },
  { n: "24/7", l: "Emergency hotline", icon: "📞" },
];

const COMPLAINT_TYPES = [
  {
    icon: "🎨",
    color: "#DC2626",
    title: "Wrong Technical Specification",
    desc: "Goods delivered do not match the spec signed in the PI/contract — wrong size, color, material, or missing/forged certification (CE, FCC, RoHS).",
    successRate: "94%",
    avgDays: "5",
    evidence: "Photos of goods at warehouse · PO spec · lab report if needed",
  },
  {
    icon: "📊",
    color: "#7C2D12",
    title: "Poor Quality / AQL Failure",
    desc: "Major + minor defect rate exceeds the agreed AQL 2.5. Defects fall outside the tolerance of the signed pre-production sample.",
    successRate: "82%",
    avgDays: "9",
    evidence: "SGS/BV report · defect photos · comparison sample · unboxing video",
  },
  {
    icon: "🔢",
    color: "#92400E",
    title: "Short Quantity",
    desc: "Actual count is lower than the PO with no prior notice. The usual allowed tolerance is ±2% (per Incoterms 2020).",
    successRate: "96%",
    avgDays: "3",
    evidence: "Packing List · count photos · container unload video · warehouse report",
  },
  {
    icon: "⏰",
    color: "#1E3A8A",
    title: "Late Delivery",
    desc: "The supplier failed to deliver by the deadline stated in the PO without a valid force majeure notice. Usual tolerance is 14 days.",
    successRate: "78%",
    avgDays: "7",
    evidence: "PO deadline date · email/chat evidence · loss tracker (if an end customer canceled)",
  },
  {
    icon: "📦",
    color: "#0E7490",
    title: "Damage From Packaging",
    desc: "Damage caused by the supplier packing below standard — wet cartons, no pallet, no corner protectors for fragile goods, no bubble wrap, and so on.",
    successRate: "85%",
    avgDays: "11",
    evidence: "Photos of carton condition at unload · report at port · comparison with packaging spec",
  },
  {
    icon: "🚢",
    color: "#0369A1",
    title: "Shipping Damage",
    desc: "Loss in transit due to natural disaster, collision, fire, or sinking — NOT the supplier's fault. Handled via Marine Insurance, not Trade Assurance.",
    successRate: "91%",
    avgDays: "21",
    evidence: "Bill of Lading · carrier report · loss photos · insurance survey report",
  },
  {
    icon: "🚨",
    color: "#9F1239",
    title: "Fraud / Scam",
    desc: "The supplier took payment but never produced, disappeared, or delivered counterfeit-brand goods. The most serious case — escalate immediately.",
    successRate: "100%",
    avgDays: "5",
    evidence: "All communications · payment tracking · Tianyancha report on the supplier",
  },
  {
    icon: "©",
    color: "#581C87",
    title: "IP Infringement / Copying",
    desc: "Delivered goods infringe a third party's trademark, design patent, or copyright — the buyer faces legal risk on import. Handled as high priority.",
    successRate: "89%",
    avgDays: "15",
    evidence: "Original IP documents · photos of infringing goods · notice from customs authority if any",
  },
];

const ESCALATION_TIERS = [
  {
    tier: "1",
    label: "Direct Dialogue",
    color: "#16A34A",
    duration: "0–3 days",
    bgRate: "62%",
    description: "The buyer opens a dispute on the dashboard, and the supplier receives notice within 1 hour. Both sides negotiate directly via CSR chat (with a translator) to reach a voluntary resolution. About 62% of cases close at this tier — the supplier accepts fault and proposes a solution (discount, replacement shipment, partial refund).",
    actions: [
      "Buyer opens the dispute with evidence attached",
      "Supplier responds within 24–48h",
      "Dialogue monitored by the Huayue Guangzhou team",
      "Agreement reached → close the dispute",
    ],
  },
  {
    tier: "2",
    label: "Huayue Mediation",
    color: "#005F6B",
    duration: "3–14 days",
    bgRate: "31%",
    description: "If tier 1 reaches no agreement within 5 days, the dispute is escalated to tier 2 — a Huayue Dispute Officer (certified in commercial mediation under NĐ 22/2017) takes over. The officer reviews the evidence, organizes a three-way Buyer–Supplier–CSR call, and issues a binding ruling under the terms of service.",
    actions: [
      "Dispute Officer reviews the case in 2–3 days",
      "Three-way call of 60–90 minutes (with simultaneous interpretation)",
      "CSR issues a ruling based on evidence + terms",
      "Enforcement: refund/replace/credit via escrow account",
    ],
  },
  {
    tier: "3",
    label: "VIAC / CIETAC Arbitration",
    color: "#A21CAF",
    duration: "60–180 days",
    bgRate: "7%",
    description: "If either party rejects the tier 2 ruling, they may bring the matter to formal arbitration — VIAC (Vietnam International Arbitration Centre) under Vietnamese law, or CIETAC (China International Economic and Trade Arbitration Commission) under Chinese law, per the clause chosen in the PI. An arbitral award is internationally enforceable (New York Convention 1958).",
    actions: [
      "File the arbitration request + fee of ~$2,000–8,000",
      "A panel of 1–3 arbitrators is appointed",
      "Hearing held online or at the arbitration HQ",
      "Binding award, internationally enforceable via the New York Convention",
    ],
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Identify the Problem",
    deadline: "Within 7 days of receiving the goods",
    desc: "The buyer inspects the goods at their own warehouse (not at the port — only after unloading and setup). The 7-day inspection period is the standard published in the Trade Assurance terms — after that, the system auto-confirms and the escrow account releases payment.",
    tips: [
      "Inspect 100% of the shipment if value is under $10K, or a 32-pc sample if over $10K (per AQL 2.5)",
      "Record an unboxing video of the outer carton + the product inside, at least 90 seconds",
      "Measure 5 random units and compare against the PO spec",
    ],
  },
  {
    n: "02",
    title: "Gather Evidence",
    deadline: "Within 24 hours of discovery",
    desc: "The more detailed the evidence, the faster the dispute is resolved in your favor. Investing 2–4 hours in solid evidence typically raises the win rate from about 60% to 90%+.",
    tips: [
      "8+ photos from multiple angles, focusing on close-ups of the defect",
      "A 60–180 second video, recorded continuously without cuts",
      "A spec comparison table, PO vs. actual (Excel/PDF)",
      "Strongly recommended: a third-party inspection report (SGS/BV) for orders over $20K",
    ],
  },
  {
    n: "03",
    title: "Open a Dispute on the Huayue Dashboard",
    deadline: "Within 7 days",
    desc: "Sign in at /buyer-center/orders, select the order → 'Open a Complaint' → upload all evidence. The system instantly locks the escrow account — the supplier cannot receive payment until the matter is resolved.",
    tips: [
      "Choose the correct category (wrong spec / quality / quantity / etc.)",
      "Describe the issue clearly and without emotion — state the facts",
      "Specify your expected resolution (refund X% / replace / credit)",
    ],
  },
  {
    n: "04",
    title: "Supplier Responds",
    deadline: "The supplier has 48 hours",
    desc: "The supplier receives notice (email + WeChat/DingTalk) and must respond within 48 business hours. No response = loss of the right to self-defense, and the dispute auto-escalates to tier 2 with a presumption of supplier fault.",
    tips: [
      "If the supplier accepts fault → tier 1 direct settlement",
      "If the supplier disputes it → upload counter-evidence within 72h",
      "The buyer may request a three-way video call (with interpretation)",
    ],
  },
  {
    n: "05",
    title: "Direct Dialogue (Tier 1)",
    deadline: "5 days",
    desc: "Both sides negotiate via CSR chat with a dispatcher monitoring. About 62% of cases reach agreement here. Common solutions: 15–50% refund + keep the goods, 100% refund + return, free replacement shipment, or credit toward a future order.",
    tips: [
      "Offer at least 2 options for the supplier to choose from",
      "Record the agreement in writing on Huayue (auto-binding)",
      "Do not settle privately outside the system — there is no legal protection",
    ],
  },
  {
    n: "06",
    title: "Huayue Mediation (Tier 2)",
    deadline: "14 days",
    desc: "If tier 1 fails, a Huayue Dispute Officer (certified in mediation under NĐ 22/2017) takes over. They review evidence for 2–3 days, hold a three-way call of 60–90 minutes, and issue a ruling based on evidence + the terms of service. The ruling is binding on both parties under the signed terms.",
    tips: [
      "Ruling is based on: PO spec, evidence quality, supplier track record, AQL standard",
      "Supplier fails to comply → account suspension + reserved fund forfeit",
      "The buyer has 5 days to appeal before the ruling takes effect",
    ],
  },
  {
    n: "07",
    title: "Enforce & Close the Dispute",
    deadline: "5–10 days",
    desc: "The ruling is enforced: a refund is returned from the escrow account to the buyer's account, a replacement is shipped free with priority QC, or a credit is recorded in the CSR Wallet for a future order. Suppliers in breach have their rating and reserved fund deducted.",
    tips: [
      "Refund is returned to the original account within 5–10 business days",
      "Replacement ships free by express with pre-shipment QC",
      "Credit is valid for 12 months and applies to any supplier on Huayue",
    ],
  },
];

const OUTCOMES = [
  { icon: "💰", title: "100% Refund", pct: "38%", desc: "Full refund of the order value via escrow account. Applies to fraud, severe spec mismatch, and supplier non-delivery." },
  { icon: "📊", title: "Partial Refund", pct: "27%", desc: "A 15–70% refund depending on severity. The buyer keeps the goods; applies to non-serious defects that can still be sold at a discount." },
  { icon: "🔄", title: "Replacement", pct: "19%", desc: "The supplier ships a free replacement with priority QC. Applies when the buyer needs goods that match spec to sell to end customers." },
  { icon: "🎟", title: "Credit / Voucher", pct: "11%", desc: "A credit recorded in the CSR Wallet for a future order, typically 100–150% of the loss value to retain the buyer." },
  { icon: "⚖️", title: "Arbitration", pct: "5%", desc: "Brought to VIAC / CIETAC for large disputes with no agreement. Internationally binding award." },
];

const CASE_STUDIES = [
  {
    title: "$42K wooden furniture order — wrong wood grain",
    industry: "Furniture",
    days: "11 days",
    outcome: "35% refund + keep the goods",
    detail: "A Hanoi buyer ordered 220 cabinets; the Foshan supplier delivered the correct size, but the 'walnut dark' grain was lighter than the signed sample. The buyer opened a dispute with 24 photos + a Pantone comparison chart. The supplier initially rejected it ('natural wood grain varies'). Tier 2 mediation reviewed the batch sample archived at CSR — and found the color deviation exceeded tolerance. The ruling was a 35% refund, with the buyer keeping the goods to sell at a lower price to a tier-2 dealer.",
  },
  {
    title: "$18K LED order — 12% of lights did not turn on",
    industry: "Electronics",
    days: "7 days",
    outcome: "Free replacement + compensation",
    detail: "A Ho Chi Minh City buyer ordered 1,200 LED panel lights; a random check of 100 units found 12% would not turn on (defect rate exceeding AQL 2.5). An SGS report confirmed a circuit fault. Tier 1: the supplier accepted immediately, shipped 150 replacement lights free by express + a $500 voucher for next time. The dispute closed in 7 days — no need to reach tier 2.",
  },
  {
    title: "$76K sanitary order — supplier default",
    industry: "Sanitary",
    days: "21 days",
    outcome: "100% refund",
    detail: "A Hai Phong buyer ordered 380 toilets from Foshan. After receiving a 30% deposit, the supplier went silent for 14 days, and Tianyancha showed the supplier was flagged for bankruptcy risk. CSR escalated immediately, sealed the escrow account, and tier 2 mediation auto-triggered after 5 days of no supplier response. A 100% refund was issued within 14 business days through a Vietnamese partner bank. The supplier was permanently suspended from CSR.",
  },
  {
    title: "$135K textile order — IP infringement",
    industry: "Textile",
    days: "28 days",
    outcome: "100% refund + legal compensation",
    detail: "A Da Nang buyer ordered 5,000 shirts. When the goods arrived at Tien Sa port, customs held the shipment after detecting a logo too similar to a brand registered under the Madrid Protocol. The supplier initially denied it, but tier 3 VIAC arbitration ruled within 28 days, ordering the supplier to refund 100% + pay $14K in customs storage fees + legal fees. The award was enforced via the New York Convention in China.",
  },
];

const EMERGENCY_CHANNELS = [
  { icon: "🚨", title: "24/7 Emergency Hotline", value: "+86 181-2225-6999", desc: "For fraud, IP infringement, or customs holds — call now, response within 30 minutes" },
  { icon: "💬", title: "Dispute Live Chat", value: "dashboard /buyer-center", desc: "Click 'Open a Complaint' on the order — chat directly with a Dispute Officer" },
  { icon: "✉", title: "Dispute Team Email", value: "dispute@huayuesc.vn", desc: "Send complex cases with evidence attached — response under 2 hours during business hours" },
  { icon: "📱", title: "WhatsApp / Zalo", value: "+84 +86 181-2225-6999", desc: "For buyers in remote areas without stable internet, handled by an escalation manager" },
];

const FAQ = [
  {
    q: "I received the goods 10 days ago and only just found a defect — can I still file a complaint?",
    a: "The official inspection period is 7 days from receipt of the goods. After 7 days, the escrow account auto-releases payment and the right to claim through Trade Assurance expires. However, if the defect is hidden (for example, a machine that runs for 30 days before failing due to poor material), you can still open a dispute within 30 days — but the burden of proof is higher and requires an independent lab report proving the fault lies with the supplier. Beyond 30 days: the only option is VIAC arbitration under the Commercial Law 2005 (a 6-month limitation period for claims under Article 318).",
  },
  {
    q: "How much does filing a complaint cost?",
    a: "Tier 1 (direct dialogue) and Tier 2 (CSR mediation) are COMPLETELY FREE for the buyer. CSR invests in the dispute system as part of Trade Assurance. Tier 3 (VIAC arbitration in Hanoi) carries an arbitration fee of $2,000–8,000 depending on the value in dispute, and the loser typically pays. CSR supports the legal costs for tier 3 if the buyer wins — at no extra charge.",
  },
  {
    q: "Do I need to hire a lawyer?",
    a: "Not required. For Tier 1 and Tier 2, the buyer simply works directly with a Huayue Dispute Officer — they are certified in commercial mediation under NĐ 22/2017 and have handled thousands of cases. For Tier 3 (VIAC), a lawyer is recommended for orders over $50K — CSR maintains a list of partner law firms with preferred rates for clients (Baker McKenzie, YKVN, VILAF, and others — rates of $200–450/hour).",
  },
  {
    q: "The supplier delivered 5 days ago but I need more time to inspect (my warehouse is in a distant province and the goods have not arrived) — how do I get an extension?",
    a: "On the dashboard at /buyer-center/orders, select the order → 'Request an inspection period extension'. The system automatically grants an extension up to 21 days total (7 + a 14-day bonus) free of charge — you just need a valid reason (distant warehouse, business travel, public holiday). The supplier is notified of the extension but cannot veto it. After 21 days it ends, and the escrow account auto-releases.",
  },
  {
    q: "If the ruling is not in my favor, do I have the right to appeal?",
    a: "Yes. A Tier 2 (Huayue Mediation) ruling has a 5-day appeal window before it takes effect. The buyer files an appeal with new evidence or new legal arguments — a Senior Dispute Officer (a higher level) reviews it again over 7–10 days. If you still disagree, you have the right to bring the matter to Tier 3 — VIAC arbitration in Hanoi per the clause in the PI. An arbitral award is final and cannot be appealed (under the Commercial Arbitration Law 2010).",
  },
  {
    q: "I'm worried the supplier will retaliate after I open a dispute (blacklist me, raise prices on future orders, etc.).",
    a: "The CSR terms of service strictly prohibit retaliation. A supplier found raising prices or refusing orders from a buyer who previously opened a dispute (with a ruling that took effect) is immediately suspended for 90 days + has 25% of its reserved fund frozen. Buyers can report retaliation to dispute@huayuesc.vn — CSR investigates and handles it independently. In practice, retaliation is very rare because suppliers fear losing their Verified tier.",
  },
  {
    q: "Does filing a complaint affect my rating as a buyer?",
    a: "No. CSR only tracks supplier ratings based on dispute history; it does NOT track buyer ratings based on opening disputes. Buyers are encouraged to open a dispute whenever there is a real problem — that is how the system improves itself. However, a buyer who opens a fraudulent dispute (a false claim) may have their buyer rating lowered and lose access to Premium-tier suppliers.",
  },
  {
    q: "Special case: goods are prohibited or violate Vietnamese law — how is this handled?",
    a: "If the shipment violates NĐ 69/2018 (import ban), the Food Safety Law, or sector-specific regulations (drug authorities, hazardous chemicals, etc.): customs holds the goods, and CSR immediately escalates to Tier 3 VIAC arbitration + reports to the Customs Department. The buyer receives a full 100% refund + compensation for legal expenses. The supplier is permanently suspended from the platform and added to the public blacklist at trustpage.huayuesc.vn.",
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

export default function KhieuNaiPage() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Information", href: "/help" },
          { label: "Complaints & Disputes" },
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
            ⚖️ COMPLAINTS & DISPUTES
          </span>
          <h1 className="text-[40px] font-extrabold leading-[1.1] mb-4 max-md:text-[26px]">
            When things do not go to plan<br />
            <span className="text-gold">Huayuesc stands on your side</span>
          </h1>
          <p className="text-[15px] opacity-90 max-w-[780px] leading-relaxed mb-7 max-md:text-[13px]">
            A 3-tier dispute resolution system — from direct dialogue, through Huayue Mediation under NĐ 22/2017, to international VIAC arbitration in Hanoi under the New York Convention 1958. Vietnamese buyers are protected by law, not by promises. Most cases close in the buyer's favor when the evidence is complete.
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {HERO_STATS.map((s) => (
              <StatTile key={s.l} {...s} />
            ))}
          </div>
          <div className="mt-6 flex gap-3 flex-wrap">
            <a
              href="#mo-disputes"
              className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              📝 Open a Complaint Now
            </a>
            <a
              href="tel:19006688"
              className="px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90"
            >
              🚨 Emergency Hotline +86 181-2225-6999
            </a>
          </div>
        </div>
      </section>

      {/* === When to file =================================================== */}
      <div className="max-w-[1200px] mx-auto px-4 mt-7">
        <div className="bg-paper border-l-4 border-gold rounded-r p-5">
          <div className="flex items-start gap-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-[26px] flex-shrink-0">
              ⏰
            </div>
            <div className="flex-1">
              <h2 className="text-[18px] font-bold text-ink mb-2">Inspection Period — 7 days from receipt of goods</h2>
              <p className="text-[13px] text-mute leading-relaxed mb-3">
                This is the window in which the buyer has the right to inspect and file a complaint for free through Trade Assurance. After 7 days, the escrow account auto-releases payment to the supplier, and the right to claim shifts to a higher-evidence mode (30-day hidden defect, or arbitration under the Commercial Law 2005 — a 6-month limitation period).
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-[12px] max-md:grid-cols-1">
                <div className="bg-success/10 border border-success/30 rounded-sm p-3">
                  <div className="font-bold text-success">0–7 days</div>
                  <div className="text-mute">Trade Assurance · Free · Mostly in the buyer's favor</div>
                </div>
                <div className="bg-gold/10 border border-gold/30 rounded-sm p-3">
                  <div className="font-bold text-[#9C6A1F]">8–30 days</div>
                  <div className="text-mute">Hidden defect · Lab report required · Win rate 71%</div>
                </div>
                <div className="bg-mute/10 border border-mute2/30 rounded-sm p-3">
                  <div className="font-bold text-mute">31 days – 6 months</div>
                  <div className="text-mute">VIAC arbitration · Fee $2–8K · Win rate 54%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Complaint types ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">8 COMPLAINT TYPES</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">Complaint Categories — Each Has Its Own Process</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Win rate, resolution time, and required evidence differ by type. Choosing the right category when you open a dispute speeds resolution by 30–40%.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {COMPLAINT_TYPES.map((t) => (
            <article key={t.title} className="bg-paper border border-line rounded overflow-hidden hover:border-brand hover:shadow-md transition flex flex-col">
              <div className="px-4 pt-3 pb-2 border-b border-line" style={{ background: `linear-gradient(135deg, ${t.color}10, ${t.color}03)` }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[26px]">{t.icon}</span>
                  <span className="text-[10.5px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: t.color, color: "#fff" }}>
                    {t.successRate} win
                  </span>
                </div>
                <b className="block text-[14px] font-bold text-ink leading-tight">{t.title}</b>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[12px] text-mute leading-relaxed mb-3 flex-1">{t.desc}</p>
                <div className="text-[11px] space-y-1 border-t border-line pt-2.5">
                  <div className="flex justify-between"><span className="text-mute">⏱ Avg. resolution</span><b className="text-ink">{t.avgDays} days</b></div>
                  <div className="text-mute pt-1">📎 <span className="text-ink">{t.evidence}</span></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === 3-tier escalation =============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">3 RESOLUTION TIERS</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">Escalation System — The Higher the Tier, the More Formal</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Every case begins at Tier 1 (direct dialogue). It escalates only when no agreement is reached. The principle: fast, cheap, and voluntary first; formal later.
          </p>
        </div>
        <div className="space-y-4">
          {ESCALATION_TIERS.map((t) => (
            <div key={t.tier} className="bg-paper border-l-4 rounded-r p-5 max-md:p-4" style={{ borderColor: t.color }}>
              <div className="flex items-start gap-4 max-md:flex-col">
                <div className="w-16 h-16 rounded flex items-center justify-center font-extrabold text-[32px] flex-shrink-0 text-white shadow-md" style={{ backgroundColor: t.color }}>
                  {t.tier}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <div>
                      <span className="text-[10.5px] uppercase tracking-wider font-bold" style={{ color: t.color }}>TIER {t.tier}</span>
                      <h3 className="text-[20px] font-bold text-ink leading-tight">{t.label}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-[10px] text-mute uppercase">Duration</div>
                        <b className="text-[14px] text-ink">{t.duration}</b>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-mute uppercase">% of cases resolved at this tier</div>
                        <b className="text-[18px] font-extrabold" style={{ color: t.color }}>{t.bgRate}</b>
                      </div>
                    </div>
                  </div>
                  <p className="text-[13px] text-mute leading-relaxed mb-3">{t.description}</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] max-md:grid-cols-1">
                    {t.actions.map((a, i) => (
                      <li key={i} className="flex gap-2 text-ink">
                        <span style={{ color: t.color }} className="flex-shrink-0">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === Process steps ================================================== */}
      <section id="mo-disputes" className="max-w-[1200px] mx-auto px-4 mt-12 scroll-mt-20">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">7-STEP PROCESS</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">From Identifying the Problem to Closing the Dispute</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            On average the full process wraps up in 3.2 days for simple cases, and 11–21 days for complex cases that require tier 2 mediation.
          </p>
        </div>
        <div className="space-y-3">
          {PROCESS_STEPS.map((s, idx) => (
            <article key={s.n} className="bg-paper border border-line rounded p-5 max-md:p-4 flex gap-4 max-md:flex-col">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-[16px] shadow-md">
                  {s.n}
                </div>
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="flex-1 w-0.5 bg-line mt-2 min-h-[20px] max-md:hidden" aria-hidden="true" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                  <h3 className="text-[16px] font-bold text-ink">{s.title}</h3>
                  <span className="text-[10.5px] bg-accent/15 text-accent px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                    🕒 {s.deadline}
                  </span>
                </div>
                <p className="text-[13px] text-mute leading-relaxed mb-3">{s.desc}</p>
                <div className="bg-bg border border-line rounded p-3">
                  <b className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1.5 block">💡 KEY TIPS</b>
                  <ul className="space-y-1 text-[12px]">
                    {s.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-ink">
                        <span className="text-brand flex-shrink-0">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === Outcomes distribution ========================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">POSSIBLE OUTCOMES</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">2025 Dispute Outcome Distribution</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Data from resolved disputes at Huayue — most resolve in the buyer's favor, in various forms, when the evidence is complete.
          </p>
        </div>
        <div className="grid grid-cols-5 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {OUTCOMES.map((o) => (
            <div key={o.title} className="bg-paper border border-line rounded p-4 hover:border-brand transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[28px]">{o.icon}</span>
                <span className="text-[20px] font-extrabold text-brand">{o.pct}</span>
              </div>
              <b className="block text-[14px] text-ink mb-2 leading-tight">{o.title}</b>
              <p className="text-[11.5px] text-mute leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Case studies =================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">REPRESENTATIVE CASES</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">4 Real Cases (Anonymized)</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Selected from closed disputes — representing the 4 most common situations Vietnamese buyers face.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {CASE_STUDIES.map((c) => (
            <article key={c.title} className="bg-paper border border-line rounded p-5">
              <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                <div>
                  <span className="inline-block text-[10px] uppercase tracking-wider font-bold bg-bg border border-line px-2 py-0.5 rounded-sm text-mute mb-1">
                    {c.industry}
                  </span>
                  <h3 className="text-[15px] font-bold text-ink leading-tight">{c.title}</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3 text-[12px]">
                <div className="bg-bg border border-line rounded p-2">
                  <div className="text-mute uppercase tracking-wider text-[10px]">⏱ Duration</div>
                  <b className="text-ink">{c.days}</b>
                </div>
                <div className="bg-success/10 border border-success/30 rounded p-2">
                  <div className="text-success uppercase tracking-wider text-[10px]">✓ Outcome</div>
                  <b className="text-success">{c.outcome}</b>
                </div>
              </div>
              <p className="text-[12.5px] text-ink leading-relaxed">{c.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* === Emergency channels ============================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="rounded p-5 max-md:p-4 border-2 border-accent" style={{ background: "linear-gradient(135deg, #DC262610, #DC262603)" }}>
          <div className="flex items-start gap-4 mb-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-[26px] text-white flex-shrink-0 animate-pulse">
              🚨
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-ink mb-1">Emergency Cases — Contact Now</h2>
              <p className="text-[13px] text-mute leading-relaxed">
                For fraud, serious IP infringement, customs holds, or a supplier that disappears — do not wait for the automated process; call or chat 24/7 to have a Senior Dispute Officer handle it as a priority.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
            {EMERGENCY_CHANNELS.map((c) => (
              <div key={c.title} className="bg-paper border border-line rounded p-3.5">
                <div className="text-[24px] mb-1.5">{c.icon}</div>
                <b className="block text-[13px] text-ink mb-1">{c.title}</b>
                <div className="text-[12.5px] text-accent font-bold mb-1.5 break-all">{c.value}</div>
                <p className="text-[11px] text-mute leading-snug">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Legal references =============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="bg-paper border border-line rounded p-5">
          <h2 className="text-[18px] font-bold text-ink mb-3">📚 Legal Basis — References</h2>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 text-[12.5px]">
            <div>
              <b className="block text-[11px] uppercase tracking-wider text-brand font-bold mb-2">Vietnamese Law</b>
              <ul className="space-y-1.5 text-mute">
                <li>• Commercial Law 2005 — Article 318 (claim limitation period)</li>
                <li>• Commercial Arbitration Law 2010</li>
                <li>• NĐ 22/2017/NĐ-CP on commercial mediation</li>
                <li>• Civil Code 2015 — contract provisions</li>
                <li>• NĐ 13/2023/NĐ-CP — personal data protection</li>
              </ul>
            </div>
            <div>
              <b className="block text-[11px] uppercase tracking-wider text-brand font-bold mb-2">International</b>
              <ul className="space-y-1.5 text-mute">
                <li>• New York Convention 1958 — enforcement of arbitral awards</li>
                <li>• UNCITRAL Model Law on International Commercial Arbitration</li>
                <li>• ICC Rules of Arbitration 2021</li>
                <li>• Incoterms 2020 (ICC) — allocation of responsibility</li>
                <li>• CISG 1980 — international sale of goods contracts</li>
              </ul>
            </div>
            <div>
              <b className="block text-[11px] uppercase tracking-wider text-brand font-bold mb-2">Arbitration Institutions</b>
              <ul className="space-y-1.5 text-mute">
                <li>• <b className="text-ink">VIAC</b> — Vietnam International Arbitration Centre (Hanoi + Ho Chi Minh City)</li>
                <li>• <b className="text-ink">CIETAC</b> — China International Economic and Trade Arbitration Commission (Beijing)</li>
                <li>• <b className="text-ink">SIAC</b> — Singapore International Arbitration Centre (for ASEAN cases)</li>
                <li>• <b className="text-ink">HKIAC</b> — Hong Kong International Arbitration Centre</li>
              </ul>
            </div>
          </div>
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
          <h3 className="text-[28px] font-extrabold mb-2 max-md:text-[22px]">Need to open a complaint right now?</h3>
          <p className="text-[14px] opacity-90 mb-6 max-w-[660px] mx-auto leading-relaxed">
            Sign in to your buyer dashboard, select the order to dispute, and click 'Open a Complaint'. The system automatically locks the escrow account and triggers the 7-step process. Or call the 24/7 emergency hotline for serious cases.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/buyer-center/orders"
              className="inline-block px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              📝 Go to Buyer Dashboard
            </Link>
            <a
              href="mailto:dispute@huayuesc.vn"
              className="inline-block px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              ✉ dispute@huayuesc.vn
            </a>
            <a
              href="tel:19006688"
              className="inline-block px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90"
            >
              🚨 +86 181-2225-6999 — 24/7
            </a>
          </div>
          <div className="mt-5 pt-5 border-t border-white/15 text-[11.5px] opacity-75 max-w-[680px] mx-auto leading-relaxed">
            Tier 1 (dialogue) and Tier 2 (Huayue Mediation) are completely free. Tier 3 (VIAC arbitration in Hanoi) carries a $2,000–8,000 fee — paid by the losing party per the award. CSR invests in the dispute system as a core part of Trade Assurance, at no extra charge.
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "Complaints & Disputes — Huayuesc Dispute Resolution",
  description: "A 3-tier dispute resolution system: direct dialogue, Huayue Mediation under NĐ 22/2017, and VIAC arbitration in Hanoi under the New York Convention 1958. Most cases resolve in the buyer's favor when evidence is complete, in 3.2 days on average. 24/7 hotline: +86 181-2225-6999.",
};
