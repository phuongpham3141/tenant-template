import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";

const STEPS = [
  {
    n: 1,
    title: "Create a buyer account",
    desc: "Sign up with your company email, verify by OTP, and fill in your business details (Tax ID, address, industry). Takes about 3 minutes.",
    cta: "Create account →",
    href: "/account/register",
  },
  {
    n: 2,
    title: "Verify your buyer profile",
    desc: "Upload your Business License to unlock Trade Assurance, priority RFQs, and factory-direct pricing. Approved within 24 business hours.",
    cta: "Complete profile →",
    href: "/account/verify",
  },
  {
    n: 3,
    title: "Send your first RFQ",
    desc: "Describe it once — the system routes it to 5–10 matching factories. Quotes come with samples, lead times, and DDP to Vietnam within 24 hours.",
    cta: "Send RFQ →",
    href: "/buying-request",
  },
  {
    n: 4,
    title: "Track & close the quote",
    desc: "Compare quotes, chat directly with suppliers, order samples, and sign the contract. The entire flow is protected by Trade Assurance.",
    cta: "Go to dashboard →",
    href: "/buyer-center",
  },
];

const FAQS = [
  {
    q: "How is Huayuesc different from Alibaba.com or Made-in-China.com?",
    a: "Huayuesc is a China–Vietnam B2B gateway built for the Vietnamese market: 24/7 Vietnamese-language support, DDP quotes to Vietnamese warehouses, Vietnamese-language contracts, and a handling team across Cat Lai – Hai Phong – Pingxiang. You don't need China or English to trade.",
  },
  {
    q: "Do I need a deposit to send an RFQ?",
    a: "No. Sending an RFQ and receiving quotes is completely free with no commitment. You only pay once you've chosen a supplier, signed the contract, and confirmed the deposit through Trade Assurance (escrow holds the funds until the goods pass QC).",
  },
  {
    q: "What is the MOQ on Huayuesc?",
    a: "MOQ depends on the factory and product — typically 50–500 pieces, or 100–500 m² for building materials. Some audited suppliers allow a lower MOQ for new buyers, or shared-container consolidation (LCL) when you don't yet have a full container.",
  },
  {
    q: "How long does DDP delivery to Vietnam take, and how much does it cost?",
    a: "Production averages 15–30 days. Sea freight from Foshan to Cat Lai takes 7–10 days, and road transport from Pingxiang to Hanoi takes 3–5 days. The DDP fee already includes import duty + VAT + warehousing, averaging 8–15% of the FOB price depending on the goods.",
  },
  {
    q: "If the goods don't meet quality standards, will I get a refund?",
    a: "Yes. Every order through Trade Assurance has three layers of protection: (1) escrow holds the funds at Huayuesc; (2) QC inspection before the goods leave the factory (optional, $300 per inspection); (3) shipping insurance. If the goods don't match the description or have technical defects, you get a 100% refund or a replacement batch.",
  },
];

const DOWNLOADS = [
  {
    icon: "📕",
    title: "China Import Handbook 2026",
    desc: "84 pages · HS codes · import duty by product group · Vietnam customs paperwork checklist",
    size: "PDF · 4.2 MB",
  },
  {
    icon: "📘",
    title: "DDP Process – from factory to Vietnamese warehouse",
    desc: "12-step diagram · sample timeline · checkpoints at Pingxiang and Cat Lai",
    size: "PDF · 2.8 MB",
  },
  {
    icon: "📗",
    title: "Bilingual Vietnamese–Chinese contract templates",
    desc: "5 contract templates: sales, OEM, processing, exclusive dealer, NDA — legally reviewed",
    size: "PDF · 1.5 MB",
  },
];

export default function NewUserGuidePage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Buyer Center", href: "/buyer-center" }, { label: "New Buyer Guide" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/new-user-guide" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📖 BUYER ONBOARDING</div>
            <h1 className="text-[22px] font-bold text-ink">New Buyer Guide</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              First time buying wholesale from China? Huayuesc has standardized the entire process — from creating an account to receiving goods at a Vietnamese warehouse — into four clear steps. After reading this page, you'll be ready to send your first RFQ in 10 minutes.
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🚀 4-step process</b>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              {STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-4 hover:border-brand transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-brand text-white rounded-full flex items-center justify-center font-bold text-[14px] flex-shrink-0">{s.n}</div>
                    <b className="text-[14px] text-ink">{s.title}</b>
                  </div>
                  <p className="text-[12.5px] text-mute leading-relaxed mb-3">{s.desc}</p>
                  <Link href={s.href} className="text-brand text-[12.5px] font-semibold hover:underline">{s.cta}</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-3">❓ Frequently asked questions for new buyers</b>
            <div className="space-y-2">
              {FAQS.map((f, i) => (
                <details key={i} className="border border-line rounded group" open={i === 0}>
                  <summary className="px-4 py-3 cursor-pointer text-[13px] font-semibold text-ink list-none flex justify-between items-center hover:bg-[#FAFBFC]">
                    <span>{f.q}</span>
                    <span className="text-mute text-[16px] group-open:rotate-180 transition-transform">⌃</span>
                  </summary>
                  <div className="px-4 pb-3 text-[12.5px] text-mute leading-relaxed border-t border-line pt-3">{f.a}</div>
                </details>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 max-md:grid-cols-1">
            {DOWNLOADS.map((d) => (
              <div key={d.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[28px] mb-2">{d.icon}</div>
                <b className="block text-[13px] text-ink leading-tight mb-1">{d.title}</b>
                <p className="text-[11.5px] text-mute leading-snug mb-2">{d.desc}</p>
                <div className="flex justify-between items-center pt-2 border-t border-line">
                  <span className="text-[10.5px] text-mute">{d.size}</span>
                  <button className="text-brand text-[11.5px] font-semibold hover:underline">Download ↓</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand-dark text-white rounded p-5 flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start">
            <div>
              <b className="block text-[16px] mb-1">Need direct support?</b>
              <p className="text-[12.5px] opacity-90">Our Vietnamese-speaking Buyer Success team is in Hanoi & Ho Chi Minh City. Hotline 8:00–22:00 every day.</p>
            </div>
            <Link href="/buyer-center/contact" className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[13px] hover:opacity-90 whitespace-nowrap">📞 Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "New Buyer Guide — Buyer Center" };
