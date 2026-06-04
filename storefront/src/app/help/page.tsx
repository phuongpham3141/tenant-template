import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

/**
 * /help — Huayuesc Help Center.
 *
 * Layout structured like enterprise B2B help portals (Alibaba, MIC, AWS):
 *   - Hero with global search
 *   - Quick stats (response time, channels, languages)
 *   - 6 topic categories (3×2 grid) with sub-articles
 *   - Featured guide cards (top 4 most-read)
 *   - Comprehensive FAQ (16 Q&A organized by buyer journey stage)
 *   - Status page link + System health indicator
 *   - 4 contact channels: chat, phone, email, video call
 */

const TOPIC_CATEGORIES = [
  {
    icon: "🛒",
    title: "Finding Products & Ordering",
    desc: "RFQ, MOQ, sample orders, OEM/ODM, AI matching",
    color: "#005F6B",
    articles: [
      { label: "How to send an effective RFQ", href: "/info/find-products" },
      { label: "6-step import guide", href: "/info/import-guide" },
      { label: "Order a sample before MOQ", href: "/info/sample-orders" },
      { label: "Custom OEM / ODM", href: "/info/import-guide" },
    ],
  },
  {
    icon: "💳",
    title: "Payment & Trade Assurance",
    desc: "T/T escrow, refunds, dispute resolution, payment methods",
    color: "#E85D4E",
    articles: [
      { label: "What is Trade Assurance (escrow)?", href: "/info/payment-protection" },
      { label: "T/T payment method", href: "/info/payment-protection" },
      { label: "Complaints & refunds", href: "/info/disputes" },
      { label: "Exchange rate + bank fees", href: "/info/payment-protection" },
    ],
  },
  {
    icon: "🚚",
    title: "Shipping & Logistics",
    desc: "Incoterms, DDP/CIF/FOB, customs, delivery time",
    color: "#F4A261",
    articles: [
      { label: "Full shipping policy", href: "/info/shipping-policy" },
      { label: "Quick DDP cost calculation", href: "/info/ddp-calculator" },
      { label: "Lang Son overland route, 5–7 days", href: "/info/shipping-policy" },
      { label: "Real-time order tracking", href: "/info/order-tracking" },
    ],
  },
  {
    icon: "🛡",
    title: "Audit & Quality",
    desc: "5-step verification process, QC inspection, certifications",
    color: "#2A9D8F",
    articles: [
      { label: "5-step verification process", href: "/info/audit-process" },
      { label: "Partner association network", href: "/info/network" },
      { label: "Supplier certifications: ISO, CE, RoHS", href: "/info/audit-process" },
      { label: "Blockchain audit reports", href: "/info/audit-process" },
    ],
  },
  {
    icon: "👤",
    title: "Account & Security",
    desc: "Sign-up, 2FA, KYC, settings, sub-accounts",
    color: "#8B5CF6",
    articles: [
      { label: "Buyer sign-up guide", href: "/register/buyer" },
      { label: "Enable 2FA to protect your account", href: "/info/privacy-policy" },
      { label: "Manage sub-accounts", href: "/buyer-center" },
      { label: "Forgot password", href: "/info/quen-mat-khau" },
    ],
  },
  {
    icon: "⚖",
    title: "Legal & Compliance",
    desc: "Terms, privacy, NĐ 13/2023, Incoterms 2020",
    color: "#6B7880",
    articles: [
      { label: "Terms of Service", href: "/info/terms-of-service" },
      { label: "Privacy Policy", href: "/info/privacy-policy" },
      { label: "11 rights under NĐ 13/2023", href: "/info/privacy-policy" },
      { label: "VIAC arbitration in Hanoi", href: "/info/terms-of-service" },
    ],
  },
];

const FEATURED_GUIDES = [
  {
    icon: "🎯",
    title: "New Buyer Guide — Your First 30 Days",
    desc: "From sign-up to first order: safe steps and how to avoid common mistakes.",
    href: "/info/import-guide",
    readTime: "8 min",
  },
  {
    icon: "💰",
    title: "Save 22% on Costs — Case Study",
    desc: "A Saigon showroom switched from a broker to Huayuesc and saved VND 2.7 billion/year.",
    href: "/info/industry-news/case-study-showroom-sai-gon-tiet-kiem-22-percent",
    readTime: "7 min",
  },
  {
    icon: "📦",
    title: "5 Mistakes When Ordering Samples — New Buyers Beware",
    desc: "A sample is $200 insurance on a $20,000 order — but get it wrong and you still lose money.",
    href: "/info/industry-news/5-sai-lam-pho-bien-khi-dat-sample",
    readTime: "5 min",
  },
  {
    icon: "📊",
    title: "Lach Huyen vs. Cat Lai Port — Which Should Northern Buyers Choose?",
    desc: "A detailed analysis of freight, delivery time, and congestion. Save $1,350/40HQ.",
    href: "/info/industry-news/phan-tich-cang-lach-huyen-vs-cat-lai-2026",
    readTime: "8 min",
  },
];

const FAQ_BY_STAGE = [
  {
    stage: "Before You Sign Up",
    faqs: [
      {
        q: "How is Huayuesc different from Alibaba.com or Made-in-China?",
        a: "CSR focuses 100% on Vietnamese buyers: 24/7 Vietnamese-language support, VND payments, escrow accounts at Vietcombank/BIDV, DDP shipping right to your Vietnamese warehouse, free on-site audits for orders of $5K or more, and Vietnamese-language dispute support via VIAC in Hanoi. Alibaba and MIC are global platforms, great for buyers in the US/EU/Middle East, but they lack the infrastructure and team dedicated to the Vietnamese market.",
      },
      {
        q: "What is the Huayuesc service fee?",
        a: "COMPLETELY FREE for the buyer. No membership fee, no transaction fee, no escrow fee, no on-site audit fee (for orders of $5K or more). Huayuesc only collects a 5% commission from the supplier on a successful transaction. The buyer pays only: the goods price (per the PO) + transparent DDP freight.",
      },
      {
        q: "Do I have to be a registered business to sign up?",
        a: "Not required. Individuals can sign up and transact up to $5,000 USD/order (per Vietnam's Anti-Money Laundering Law). However, a registered business (with a Tax ID) has 2 advantages: importing with no value limit + deducting 10% input VAT. Frequent buyers (3+ orders/year) are advised to register as a business.",
      },
    ],
  },
  {
    stage: "Finding Products & Sending an RFQ",
    faqs: [
      {
        q: "How do I send an effective RFQ?",
        a: "Click 'Send RFQ' in the homepage header, or go to /buying-request. Describe it in as much detail as possible: product name + dimensions + material + quantity + target retail + OEM requirements (logo, custom color) + deadline. Within 24 hours, the AI matching system sends your RFQ to 5–10 suitable verified suppliers. Tip: attach reference photos / a sample product so suppliers understand it better.",
      },
      {
        q: "What is the MOQ on Huayuesc?",
        a: "It depends on the factory — commonly from $500-2000 or 50–100 units. Some suppliers accept a low MOQ of $200 for new buyers through the free audit program. CSR offers 'Combine MOQ' to help 2–3 buyers in the same industry pool an order to reach a better MOQ price while each takes only one-third.",
      },
      {
        q: "I want OEM/ODM to my own drawing — is that supported?",
        a: "Yes. CSR supports OEM (printing your logo, changing colors, small custom sizing) and ODM (a design fully based on the buyer's technical drawing). The sample mock-up fee is $80-300, and delivery time increases by 5–10 days. Order an OEM sample before placing the MOQ to verify the actual customization capability. All mock-up costs are refunded 100% when you place the MOQ.",
      },
    ],
  },
  {
    stage: "Payment & Trade Assurance",
    faqs: [
      {
        q: "How does Trade Assurance (escrow) work?",
        a: "The buyer's 30% T/T deposit and 70% balance are held in CSR's escrow account at Vietcombank/BIDV (for VND) or Bank of China/HSBC (for USD) — they do NOT go directly to the supplier. The supplier only receives payment after: (a) the buyer confirms the goods match the description, or (b) 14 days pass from delivery with no buyer response (auto-release). If the goods do not match what was promised, the buyer files a complaint within 7 days → CSR investigates → refund/replacement/compensation.",
      },
      {
        q: "Which payment methods are supported?",
        a: "T/T (Telegraphic Transfer) — the most common, available for all orders. L/C (Letter of Credit) — for orders of $100K or more, the most secure but with higher fees. International online banking via Wise/Payoneer — for small orders under $5K, with low fees. NOT supported: PayPal (high fees), Western Union (no escrow), cash (violates AML regulations).",
      },
      {
        q: "Can I pay in VND?",
        a: "Yes. The buyer pays VND into CSR's Vietcombank/BIDV account, and CSR converts it to USD at the real-time Vietcombank rate + a 0.5% buffer against fluctuation (stated clearly in the contract). Bank fees: ~0.1–0.3% transfer fee + $20-50 fixed. Some small orders (under $10K) can be paid 100% in domestic VND with no foreign currency — saving on bank fees.",
      },
    ],
  },
  {
    stage: "Shipping & Customs",
    faqs: [
      {
        q: "How long does DDP shipping to Vietnam take?",
        a: "DDP delivery time to a Hanoi buyer's warehouse: (a) Overland via Lang Son, 5–7 days — the fastest, suited to small orders and hot trends. (b) Ocean Foshan → Lach Huyen → Hanoi: 13–17 days total. (c) Ocean Dongguan/Shenzhen → Cat Lai → Hanoi: 15–19 days. (d) Air freight DHL/FedEx: 2–4 days, $8-15/kg. The buyer picks the optimal route in the calculator at /info/ddp-calculator.",
      },
      {
        q: "Do I need an import license?",
        a: "Most building materials, furniture, sanitary ware, LED lights, and home appliances do NOT need a license. A license is required for: dietary supplements, cosmetics, medical devices, chemicals, pharmaceuticals, books, and vehicles. CSR advises for free by HS code — email legal@huayuesc.vn.",
      },
      {
        q: "Does DDP already include import duty + VAT?",
        a: "YES. All-in-one DDP includes: ocean/overland freight, 0.5% Marine insurance, import duty (by HS code, with ACFTA/RCEP preferences), 10% VAT, customs clearance fees, and Vietnam domestic shipping. The buyer simply signs for the goods at the warehouse. In special cases (customs re-classifying the HS code and applying a higher duty): CSR notifies you in advance, and the buyer has 7 days to respond.",
      },
    ],
  },
  {
    stage: "After You Receive the Goods",
    faqs: [
      {
        q: "I found the goods do not match the description — what should I do?",
        a: "File a Trade Assurance complaint WITHIN 7 DAYS of receiving the goods. The path: /buyer-center/orders/{order-id}/dispute. Attach evidence: photos, an unboxing video, and the acceptance report. The Trade Assurance team responds within 24 hours and decides within 3–5 days: 100% refund, replacement, or agreed compensation. Q1–Q3 2025 history: 87% of cases resolved in the buyer's favor.",
      },
      {
        q: "I want to place another order after a good first one — what is the process?",
        a: "It is 50% faster than the first order! Repeat order: select 'Reorder' in the dashboard → CSR automatically creates a new PO with the same spec → the buyer just confirms the quantity + delivery date. No need to re-audit the supplier (already verified). No need to re-test a sample (already done). Delivery time is still 5–22 days depending on the route. Many Vietnamese buyers place 6–12 orders/year with 2–3 main suppliers — the process is very smooth.",
      },
      {
        q: "Will a VAT invoice be issued?",
        a: "Yes. CSR issues a 10% VAT e-invoice for every DDP order through the Ministry of Finance's e-invoice system (under Decree 123/2020/NĐ-CP). The invoice is sent to the buyer's email within 3 days of delivery. Business buyers use this invoice to deduct 10% input VAT — saving significantly on tax.",
      },
    ],
  },
];

const SYSTEM_STATUS = [
  { service: "Website + App", status: "Operational", uptime: "99.97%" },
  { service: "Trade Assurance (Escrow)", status: "Operational", uptime: "100%" },
  { service: "AI Sourcing Matching", status: "Operational", uptime: "99.94%" },
  { service: "DDP Logistics", status: "Operational", uptime: "99.91%" },
];

const CONTACT_CHANNELS = [
  { icon: "💬", title: "Live Chat", desc: "Response under 5 min", info: "8am-10pm daily", href: "#chat" },
  { icon: "📞", title: "Hotline", desc: "+84 24 1234 5678", info: "8am-6pm Mon-Sat", href: "tel:+842412345678" },
  { icon: "📧", title: "Email Support", desc: "Response under 6 hours", info: "support@huayuesc.vn", href: "mailto:support@huayuesc.vn" },
  { icon: "📹", title: "Video Call", desc: "Book in advance", info: "1-on-1 with an account manager", href: "/info/contact" },
];

export default function HelpPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Help Center" }]} />

      {/* === HERO + Search ============================================== */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
      >
        <div className="max-w-[1100px] mx-auto px-4 py-12 max-md:py-7 text-center">
          <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">
            🆘 HELP CENTER · HUAYUESC
          </span>
          <h1 className="text-[34px] font-extrabold leading-tight mb-3 max-md:text-[24px]">
            Welcome to the Help Center
          </h1>
          <p className="text-[14px] opacity-90 leading-relaxed mb-5 max-md:text-[12.5px] max-w-[680px] mx-auto">
            300+ guides, 80+ FAQs, and 24/7 Vietnamese-language support. Find an answer now, or contact the Huayuesc team in Hanoi + Guangzhou directly.
          </p>
          <form action="/search" method="get" className="flex max-w-[640px] mx-auto bg-white rounded-md overflow-hidden shadow-lg">
            <input
              name="q"
              placeholder="e.g. how to send an RFQ, MOQ, DDP shipping, Trade Assurance..."
              className="flex-1 px-4 py-3 outline-none text-[14px] text-ink"
            />
            <button type="submit" className="px-6 bg-accent text-white font-bold text-[13.5px] cursor-pointer hover:opacity-90">
              🔍 Search
            </button>
          </form>

          {/* Quick stats strip */}
          <div className="grid grid-cols-4 gap-4 mt-7 text-center max-md:grid-cols-2 max-md:gap-3">
            <div className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
              <b className="block text-[18px] text-gold leading-tight">300+</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">Guides</small>
            </div>
            <div className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
              <b className="block text-[18px] text-gold leading-tight">&lt;5 min</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">Chat response</small>
            </div>
            <div className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
              <b className="block text-[18px] text-gold leading-tight">24/7</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">Vietnamese support</small>
            </div>
            <div>
              <b className="block text-[18px] text-gold leading-tight">99.97%</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">Uptime last month</small>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-4 mt-7 mb-10 max-md:mt-4">
        {/* === 6 Topic Categories ========================================= */}
        <h2 className="text-[20px] font-bold text-ink mb-4 max-md:text-[17px]">📚 Browse by Topic</h2>
        <div className="grid grid-cols-3 gap-3 mb-8 max-md:grid-cols-1">
          {TOPIC_CATEGORIES.map((c) => (
            <div key={c.title} className="bg-paper border border-line rounded p-4 hover:border-brand hover:shadow-sm transition">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded flex items-center justify-center text-[22px] flex-shrink-0"
                  style={{ backgroundColor: c.color + "15", color: c.color }}
                >
                  {c.icon}
                </div>
                <div>
                  <b className="block text-[14px] text-ink">{c.title}</b>
                  <p className="text-[11.5px] text-mute leading-snug mt-0.5">{c.desc}</p>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                {c.articles.map((a) => (
                  <li key={a.label}>
                    <Link href={a.href} className="text-[12.5px] text-brand hover:underline cursor-pointer">
                      → {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* === Featured Guides ============================================ */}
        <h2 className="text-[20px] font-bold text-ink mb-4 max-md:text-[17px]">⭐ Featured Guides</h2>
        <div className="grid grid-cols-2 gap-3 mb-8 max-md:grid-cols-1">
          {FEATURED_GUIDES.map((g) => (
            <Link
              key={g.title}
              href={g.href}
              className="bg-paper border border-line rounded p-4 hover:border-brand hover:shadow-sm transition cursor-pointer flex gap-3 items-start group/guide"
            >
              <div className="w-12 h-12 bg-bg rounded flex items-center justify-center text-[24px] flex-shrink-0">
                {g.icon}
              </div>
              <div className="flex-1 min-w-0">
                <b className="block text-[14px] text-ink leading-snug mb-1 group-hover/guide:text-brand">{g.title}</b>
                <p className="text-[12px] text-mute leading-relaxed mb-1.5">{g.desc}</p>
                <span className="text-[11px] text-mute2">⏱ {g.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* === FAQ by Stage ============================================== */}
        <h2 className="text-[20px] font-bold text-ink mb-4 max-md:text-[17px]">❓ FAQs by Stage</h2>
        <div className="space-y-5 mb-8">
          {FAQ_BY_STAGE.map((stage) => (
            <div key={stage.stage} className="bg-paper border border-line rounded p-5 max-md:p-3.5">
              <b className="block text-[14px] text-brand uppercase tracking-wider mb-3 pb-2 border-b border-line">
                {stage.stage}
              </b>
              <div className="space-y-2">
                {stage.faqs.map((f, i) => (
                  <details key={i} className="border border-line rounded group/faq">
                    <summary className="px-4 py-3 cursor-pointer flex justify-between items-start gap-3 list-none [&::-webkit-details-marker]:hidden hover:bg-bg">
                      <b className="text-[13.5px] text-ink leading-snug flex-1">{f.q}</b>
                      <span className="text-mute2 text-[14px] group-open/faq:rotate-180 transition-transform flex-shrink-0">▾</span>
                    </summary>
                    <p className="px-4 pb-4 pt-3 text-[13px] text-mute leading-relaxed border-t border-line">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* === System Status ============================================= */}
        <div className="bg-paper border border-line rounded p-5 mb-6 max-md:p-3.5">
          <div className="flex justify-between items-center mb-3 max-md:flex-col max-md:items-start max-md:gap-2">
            <h2 className="text-[16px] font-bold text-ink flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              System Status — All Services Operating Normally
            </h2>
            <Link
              href="https://huayuesc-status.io"
              className="text-[12px] text-brand hover:underline cursor-pointer"
            >
              Detailed status page →
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 max-md:gap-2">
            {SYSTEM_STATUS.map((s) => (
              <div key={s.service} className="border border-line rounded p-2.5 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <small className="text-[11px] text-mute">{s.service}</small>
                </div>
                <b className="block text-[14px] text-success">{s.uptime}</b>
              </div>
            ))}
          </div>
        </div>

        {/* === Contact Channels ========================================== */}
        <div
          className="rounded p-6 text-white max-md:p-4"
          style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
        >
          <h2 className="text-[18px] font-bold mb-1 max-md:text-[16px]">Still need direct support?</h2>
          <p className="text-[12.5px] opacity-85 mb-4 max-md:text-[12px]">
            The Huayuesc Customer Success team in Hanoi + Guangzhou — responding 24/7, 100% in Vietnamese for buyers.
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {CONTACT_CHANNELS.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="bg-white/10 hover:bg-white/15 border border-white/20 rounded p-3 cursor-pointer transition block"
              >
                <div className="text-[24px] mb-1.5">{c.icon}</div>
                <b className="block text-[13px] mb-0.5">{c.title}</b>
                <p className="text-[11px] opacity-85 leading-snug">{c.desc}</p>
                <small className="text-[10.5px] opacity-70 mt-1 block truncate">{c.info}</small>
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/15 flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:text-center">
            <span className="text-[12.5px] opacity-85">
              📍 Hanoi office: 26 Pham Hung, Cau Giay · 26/F Tianhe Plaza, Guangzhou
            </span>
            <Link
              href="/buying-request"
              className="px-4 py-2 bg-gold text-brand-dark rounded-sm font-bold text-[12.5px] cursor-pointer hover:bg-[#E8943A] whitespace-nowrap"
            >
              🚀 Send an RFQ Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: "Help Center — Huayuesc",
  description:
    "300+ guides and 80+ FAQs on B2B sourcing from China to Vietnam. RFQ, Trade Assurance, DDP, customs. 24/7 Vietnamese-language support.",
};
