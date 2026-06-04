import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const UPCOMING = [
  { date: "Jun 12–16, 2026", title: "Furniture Asia Cloud Expo", topic: "Sofas · Bedroom · Office furniture", buyer: "Southeast Asia + Australia", img: 21 },
  { date: "Jun 20–24, 2026", title: "Smart Home & Lighting", topic: "LED · Smart switches · IoT", buyer: "Vietnam + Thailand", img: 22 },
  { date: "Jul 08–12, 2026", title: "Building Materials Asia", topic: "Tile · Sanitary · Doors & Windows", buyer: "Vietnam + Indonesia", img: 23 },
  { date: "Jul 22–26, 2026", title: "Garments & Textiles", topic: "Knitwear · Denim · Home textiles", buyer: "All of Southeast Asia", img: 24 },
];

const STEPS = [
  { n: 1, title: "Choose a booth package", desc: "Standard $480 · Premium $1,280 · Diamond $3,200 — includes 3D design, intro video, and a livestream slot." },
  { n: 2, title: "Upload SKUs + media", desc: "At least 12 hot products, one 60–90 second factory tour video, and a bilingual VI-ZH company profile." },
  { n: 3, title: "Go live + chat in real time", desc: "During the 5-day expo: 2 livestreams a day, AI chat with automatic VI ↔ ZH translation, and 1-on-1 buyer appointments." },
];

const BOOTHS = [
  { name: "KUKA Home Furniture", industry: "Sofas · Bedroom", visits: "2,840", img: 31 },
  { name: "Foshan Tile Master", industry: "Porcelain Tile", visits: "1,920", img: 32 },
  { name: "Shenzhen LED Co.", industry: "Smart Lighting", visits: "1,650", img: 33 },
  { name: "Ortonbaths Group", industry: "Sanitary Ware", visits: "2,210", img: 34 },
  { name: "Guangzhou Garment", industry: "Apparel OEM", visits: "1,480", img: 35 },
  { name: "Jiangsu Steel Door", industry: "Door & Window", visits: "1,180", img: 36 },
];

const STATS = [
  { v: "50K+", l: "Buyer visits/yr" },
  { v: "3.2K+", l: "Booths set up" },
  { v: "12", l: "Expos / yr by industry" },
  { v: "$48M", l: "GMV generated at 2025 expos" },
];

export default function SmartExpoPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Seller Center", href: "/seller-center" }, { label: "Smart Expo Cloud" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/smart-expo" />
        <div>
          <div className="bg-gradient-to-br from-accent/90 to-brand text-white rounded p-6 mb-4">
            <div className="inline-block bg-white text-accent px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🎪 SMART EXPO CLOUD</div>
            <h1 className="text-[26px] font-bold leading-tight">Virtual trade shows — like the Canton Fair, at one-eighth the cost</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              3D booths, livestreamed factory tours, AI chat with real-time VI-ZH translation, and 1-on-1 appointments with 50K+ buyers across Vietnam and Southeast Asia. One expo = 2–3 months of offline prospecting.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {STATS.map((s) => (
              <div key={s.l} className="bg-paper border border-line rounded p-4 text-center">
                <b className="block text-[24px] font-extrabold text-brand">{s.v}</b>
                <span className="text-[11.5px] text-mute mt-1 block">{s.l}</span>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">📅 Upcoming trade shows (next 4 expos)</b>
              <Link href="#" className="text-brand text-[12px]">Full-year calendar →</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              {UPCOMING.map((u) => (
                <div key={u.title} className="border border-line rounded overflow-hidden hover:border-brand grid grid-cols-[120px_1fr] max-md:grid-cols-1">
                  <img src={`/img/seller-expo-${u.img}.jpg?v=5`} alt="" className="w-full h-full object-cover max-md:h-[140px]" />
                  <div className="p-3">
                    <span className="text-[10.5px] text-accent font-bold uppercase tracking-wider">{u.date}</span>
                    <b className="block text-[13.5px] text-ink mt-1 mb-1">{u.title}</b>
                    <p className="text-[11.5px] text-mute mb-2">{u.topic}</p>
                    <p className="text-[11px] text-mute mb-3"><span className="font-semibold">Buyers:</span> {u.buyer}</p>
                    <button className="bg-brand text-white text-[11.5px] font-semibold px-3 py-1 rounded-sm">Register a booth →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🚀 Create a virtual booth — 3 steps</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-4">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold text-[16px] mb-3">{s.n}</div>
                  <b className="block text-[13px] text-ink mb-1">{s.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">🎨 Sample booths — 6 featured examples</b>
              <Link href="#" className="text-brand text-[12px]">View 3.2K other booths →</Link>
            </div>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2">
              {BOOTHS.map((b) => (
                <div key={b.name} className="border border-line rounded overflow-hidden hover:border-brand">
                  <div className="aspect-video bg-[#F5F5F5] relative">
                    <img src={`/img/seller-booth-${b.img}.jpg?v=5`} alt="" className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-success text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">3D</span>
                  </div>
                  <div className="p-3">
                    <b className="block text-[12.5px] text-ink leading-tight mb-0.5">{b.name}</b>
                    <span className="text-[11px] text-mute block mb-2">{b.industry}</span>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-mute">👁 {b.visits} visits</span>
                      <Link href="#" className="text-brand font-semibold">View booth →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-dark text-white rounded p-5 text-center">
            <b className="block text-[18px] mb-2">🎟 Register a booth for Furniture Asia, June 12–16</b>
            <p className="text-[12.5px] opacity-90 mb-4">Only 8 Diamond slots left — 24 Premium remaining. Register before May 25 for 30% off.</p>
            <button className="bg-gold text-brand-dark px-7 py-3 rounded-sm font-bold text-[14px]">Create a virtual booth now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Smart Expo — Cloud Trade Shows — Seller Center" };
