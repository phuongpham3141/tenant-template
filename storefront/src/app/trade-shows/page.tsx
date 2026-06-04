import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const UPCOMING = [
  { name: "Vietnam Expo 2026", date: "12 - 15 Apr 2026", venue: "Hanoi ICE", industry: "General", country: "VN" },
  { name: "Furniture China 2026", date: "8 - 11 Sep 2026", venue: "Shanghai NECC", industry: "Furniture", country: "CN" },
  { name: "Ceramics China", date: "18 - 21 May 2026", venue: "Foshan Tanzhou", industry: "Tiles", country: "CN" },
  { name: "Hong Kong Lighting Fair", date: "27 - 30 Oct 2026", venue: "HKCEC", industry: "LED Lighting", country: "HK" },
  { name: "Bauma China 2026", date: "12 - 16 Oct 2026", venue: "Shanghai SNIEC", industry: "Building Materials", country: "CN" },
  { name: "Kitchen & Bath China", date: "1 - 4 Jun 2026", venue: "Shanghai NECC", industry: "Kitchen & Sanitary", country: "CN" },
];

export default function TradeShowsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Trade Shows" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[220px] bg-brand-dark">
          <img src="/img/tradeshow-hero.jpg?v=5" alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 px-8 py-7 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
            <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">⚡ TRADE SHOWS</span>
            <h1 className="text-[34px] font-extrabold leading-tight max-md:text-[24px]">Attend trade shows with Huayuesc</h1>
            <p className="text-[13.5px] opacity-90 max-w-[600px] mt-2">Ticketing, visa support, hotel booking, and factory tours. Attend 8+ major trade shows in China every year.</p>
          </div>
        </div>
      </div>

      {/* Featured Canton Fair */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <div className="bg-paper border-2 border-gold rounded p-5 grid grid-cols-[1fr_280px] gap-5 max-md:grid-cols-1">
          <div>
            <span className="inline-block bg-accent text-white px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2">FEATURED · LARGEST B2B TRADE SHOW</span>
            <h2 className="text-[22px] font-bold text-ink mb-1">🇨🇳 Canton Fair 2026 — Guangzhou Trade Show</h2>
            <p className="text-[13px] text-mute leading-relaxed mb-3">The world's largest B2B trade show — held twice a year at Guangzhou Pazhou with 60,000+ suppliers and 200,000+ international buyers. Huayuesc organizes a delegation of 50 VN dealers each session.</p>
            <div className="grid grid-cols-2 gap-3 mb-4 max-md:grid-cols-1">
              <div className="border border-line rounded p-3 bg-[#FAFBFC]">
                <b className="block text-[13px] text-ink">📅 Phase 1 — Spring 2026</b>
                <span className="text-[12px] text-mute">15 Apr – 5 May 2026 (3 sessions)</span>
                <p className="text-[11.5px] text-mute mt-1">Building materials, machinery, energy</p>
              </div>
              <div className="border border-line rounded p-3 bg-[#FAFBFC]">
                <b className="block text-[13px] text-ink">📅 Phase 2 — Autumn 2026</b>
                <span className="text-[12px] text-mute">15 Oct – 4 Nov 2026 (3 sessions)</span>
                <p className="text-[11.5px] text-mute mt-1">Furniture, sanitary ware, lighting, textiles</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link href="/buying-request" className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm font-bold text-[13px]">Book Canton Fair tickets →</Link>
              <Link href="/info/audit-process" className="px-5 py-2.5 border border-brand text-brand rounded-sm font-semibold text-[13px]">View Canton Fair history</Link>
            </div>
          </div>
          <img src="/img/cantonfair.jpg?v=5" alt="Canton Fair" className="w-full h-full object-cover rounded" />
        </div>
      </div>

      {/* Upcoming list */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">Upcoming Trade Shows</h2>
        <div className="bg-paper border border-line rounded overflow-hidden">
          {UPCOMING.map((s, i) => (
            <div key={s.name} className={`grid grid-cols-[1fr_180px_220px_140px_120px] gap-4 px-4 py-3.5 text-[13px] hover:bg-[#FAFBFC] max-md:grid-cols-1 max-md:gap-1 ${i > 0 ? "border-t border-line" : ""}`}>
              <b className="text-ink">{s.name}</b>
              <span className="text-mute">📅 {s.date}</span>
              <span className="text-mute">📍 {s.venue}</span>
              <span className="text-brand">{s.industry}</span>
              <Link href="/buying-request" className="text-brand text-[12px] font-semibold hover:underline">Book tickets →</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery past */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">Past Editions</h2>
        <div className="grid grid-cols-4 gap-2 max-md:grid-cols-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-video bg-[#F5F5F5] rounded overflow-hidden">
              <img src={`/img/tradeshow-past-${i}.jpg?v=5`} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5 mb-7">
        <div className="bg-brand-dark text-white rounded p-6 flex justify-between items-center max-md:flex-col max-md:gap-4 max-md:text-center">
          <div>
            <h3 className="text-[20px] font-bold mb-1">🎫 Book a supported visit package</h3>
            <p className="text-[13px] opacity-85">Huayuesc handles everything: tickets, visa, hotel, interpreter, and factory tours. From $890 for 3 days.</p>
          </div>
          <Link href="/buying-request" className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px]">Register for a tour →</Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Trade Shows — Huayuesc" };
