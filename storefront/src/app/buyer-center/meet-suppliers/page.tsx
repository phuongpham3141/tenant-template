import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { FACTORIES } from "@/data/home";

const EVENTS = [
  {
    badge: "IN PERSON",
    title: "Canton Fair Spring 2026",
    date: "15/04 – 19/04/2026",
    location: "Guangzhou · China",
    desc: "Asia's largest import-export trade show — 25,000 suppliers, 5 industries. Huayuesc runs a Vietnamese buyer-delegation tour with interpreters and pre-booked 1-on-1 meetings.",
    color: "bg-accent",
    cta: "Register delegation",
  },
  {
    badge: "VIRTUAL",
    title: "Vietnam Expo 2026 – China Booth",
    date: "08/05 – 11/05/2026",
    location: "Giang Vo Exhibition Center · Hanoi",
    desc: "120 ceramics, furniture, and sanitaryware factories with booths in Hanoi. Free tickets for Huayuesc buyers, with 30-minute meeting slots per booth.",
    color: "bg-brand",
    cta: "Get free tickets",
  },
  {
    badge: "OEM FOCUS",
    title: "Furniture China 2026 – Shanghai",
    date: "10/09 – 13/09/2026",
    location: "Shanghai · NECC Hongqiao",
    desc: "Furniture industry only: KUKA, Landbond, OPPEIN, and ZuoYou all have booths. Huayuesc runs a 3-day Foshan factory tour right after the fair.",
    color: "bg-gold text-brand-dark",
    cta: "View tour details",
  },
];

const BOOKING_STEPS = [
  { n: 1, title: "Pick the suppliers you're interested in", desc: "Filter by industry / production region / year founded, then select 1–3 factories." },
  { n: 2, title: "Choose a meeting slot", desc: "Book 30–60 minutes via Zoom/Teams or meet in person in Foshan/Shenzhen." },
  { n: 3, title: "Send your agenda + documents", desc: "RFQ, samples, capacity report — prepare ahead for a productive meeting." },
  { n: 4, title: "1-on-1 meeting with an interpreter", desc: "Huayuesc provides a free Vietnamese–Chinese interpreter for the first 60 minutes." },
];

const SUPPLIERS = FACTORIES.slice(0, 6);

export default function MeetSuppliersPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Buyer Center", href: "/buyer-center" }, { label: "Meet Suppliers" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/meet-suppliers" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/10 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🤝 MEET SUPPLIERS</div>
            <h1 className="text-[22px] font-bold text-ink">Meet Suppliers</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              Meeting in person always beats email. From industry trade shows to 1-on-1 video rooms, Huayuesc helps you reach factories the right way: interpreters ready, a solid agenda, and clear follow-up.
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">📅 Upcoming events</b>
              <Link href="/factory-tour" className="text-brand text-[12px] hover:underline">View All →</Link>
            </div>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {EVENTS.map((e) => (
                <div key={e.title} className="border border-line rounded overflow-hidden hover:border-brand">
                  <div className={`${e.color} text-white px-3 py-1.5 text-[10.5px] font-bold tracking-wider`}>{e.badge}</div>
                  <div className="p-4">
                    <b className="block text-[14px] text-ink leading-tight mb-1.5">{e.title}</b>
                    <div className="text-[11.5px] text-mute mb-1">📅 {e.date}</div>
                    <div className="text-[11.5px] text-mute mb-3">📍 {e.location}</div>
                    <p className="text-[12px] text-ink leading-relaxed mb-3">{e.desc}</p>
                    <button className="w-full px-3 py-2 bg-brand text-white rounded-sm text-[12px] font-semibold hover:opacity-90">{e.cta} →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-1">🎯 Book a 1-on-1 meeting with a factory</b>
            <p className="text-[12px] text-mute mb-4">A 4-step process — Huayuesc handles logistics and interpretation.</p>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 mb-5">
              {BOOKING_STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-3">
                  <div className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold text-[13px] mb-2">{s.n}</div>
                  <b className="block text-[12.5px] text-ink leading-tight mb-1">{s.title}</b>
                  <p className="text-[11px] text-mute leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>

            <b className="block text-[13px] text-ink mb-2">Choose the factories you want to meet:</b>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {SUPPLIERS.map((f) => (
                <label key={f.slug} className="border border-line rounded p-3 hover:border-brand cursor-pointer flex gap-3 items-start">
                  <input type="checkbox" className="mt-1 accent-brand" />
                  <div className="w-10 h-10 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[13px] text-brand flex-shrink-0">{f.initials}</div>
                  <div className="min-w-0 flex-1">
                    <b className="block text-[12.5px] text-ink leading-tight line-clamp-2">{f.name}</b>
                    <span className="text-[10.5px] text-mute">{f.location}</span>
                    <div className="text-[10.5px] text-success mt-0.5">★ {f.rating} · {f.badges.years}</div>
                  </div>
                </label>
              ))}
            </div>
            <button className="mt-4 px-5 py-2.5 bg-accent text-white rounded-sm font-bold text-[12.5px] hover:opacity-90">📅 Request a meeting</button>
          </div>

          <Link href="/factory-tour" className="block bg-brand-dark text-white rounded p-5 hover:opacity-95">
            <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-3">
              <div>
                <div className="inline-block bg-gold text-brand-dark px-2 py-0.5 text-[10px] font-bold rounded-sm tracking-wider mb-2">🆕 360° VR</div>
                <b className="block text-[16px] mb-1">360° Factory Tour</b>
                <p className="text-[12.5px] opacity-90">Can't fly to Foshan yet? Tour the production lines, finished-goods warehouse, and QC room via 360° cameras plus a livestream with the QC manager.</p>
              </div>
              <span className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[13px] whitespace-nowrap">Start tour →</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Meet Suppliers — Buyer Center" };
