import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const KPIS = [
  { v: "187", l: "Orders in May 2026", c: "text-brand", trend: "+12%" },
  { v: "23", l: "Unanswered RFQs", c: "text-accent", trend: "Needs attention" },
  { v: "412", l: "SKUs for sale", c: "text-success", trend: "+5 this week" },
  { v: "4.8 ★", l: "Average rating", c: "text-gold", trend: "Top 8% Gold" },
];

const ACTIVITY = [
  { time: "8 min ago", text: "New RFQ #RFQ-9145 from buyer Tran Van A — 200 L-shape velvet sofas" },
  { time: "32 min ago", text: "Order AVN-9018 paid 30% deposit — production started" },
  { time: "1 hr 20 min ago", text: "5★ review from Ha Dong Furniture for the April bedroom set batch" },
  { time: "3 hr ago", text: "Scheduled TÜV factory audit set for May 18 — prepare QC documents" },
  { time: "Yesterday", text: "Message from a Ho Chi Minh City buyer asking about MOQ on oak veneer TV cabinets" },
];

const QUICK = [
  { label: "Answer RFQ", icon: "📨", href: "/seller-center/trade-ehome", color: "bg-accent" },
  { label: "Update FOB Price", icon: "💲", href: "/seller-center/trade-ehome", color: "bg-brand" },
  { label: "Post New Product", icon: "➕", href: "/seller-center/trade-ehome", color: "bg-success" },
  { label: "View Sales Report", icon: "📊", href: "/seller-center/trade-ehome", color: "bg-gold text-brand-dark" },
];

const CHART = [
  { m: "Dec", v: 42 },
  { m: "Jan", v: 58 },
  { m: "Feb", v: 65 },
  { m: "Mar", v: 78 },
  { m: "Apr", v: 124 },
  { m: "May", v: 187 },
];

export default function SellerCenterPage() {
  const max = Math.max(...CHART.map((c) => c.v));
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Seller Center" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4 flex justify-between items-start max-md:flex-col max-md:gap-3">
            <div>
              <h1 className="text-[20px] font-bold text-ink">Welcome, KUKA Home Co., Ltd. 🏭</h1>
              <p className="text-[12.5px] text-mute mt-1">
                Supplier activity overview · <span className="bg-gold/30 text-brand-dark px-1.5 py-0.5 rounded-sm font-bold">Gold Tier 3</span> · 6 consecutive years
              </p>
            </div>
            <Link href="/seller-center/gold-member" className="text-[12px] bg-brand text-white px-3 py-2 rounded-sm font-semibold whitespace-nowrap">⭐ Upgrade to Diamond</Link>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {KPIS.map((s) => (
              <div key={s.l} className="bg-paper border border-line rounded p-4">
                <b className={`block text-[24px] font-extrabold ${s.c}`}>{s.v}</b>
                <span className="text-[11.5px] text-mute mt-1 block">{s.l}</span>
                <span className="text-[10.5px] text-success block mt-1.5 font-semibold">{s.trend}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-4">
              <div className="flex justify-between items-center mb-3">
                <b className="text-[14px] text-ink">6-month performance (order count)</b>
                <span className="text-[10.5px] text-mute">updated 12:30</span>
              </div>
              <svg viewBox="0 0 320 140" className="w-full h-[140px]">
                {CHART.map((c, i) => {
                  const h = (c.v / max) * 110;
                  const x = 20 + i * 50;
                  return (
                    <g key={c.m}>
                      <rect x={x} y={120 - h} width="34" height={h} fill={i === CHART.length - 1 ? "#E8302C" : "#1F4F8E"} rx="2" />
                      <text x={x + 17} y={135} fontSize="10" textAnchor="middle" fill="#6B7280">{c.m}</text>
                      <text x={x + 17} y={115 - h} fontSize="9.5" textAnchor="middle" fill="#0B1220" fontWeight="bold">{c.v}</text>
                    </g>
                  );
                })}
              </svg>
              <p className="text-[11px] text-mute mt-2">Up 145% versus the same period in Q4 2025 — Tet 2026 and wedding season drove furniture orders.</p>
            </div>

            <div className="bg-paper border border-line rounded p-4">
              <b className="block text-[14px] text-ink mb-3">Recent activity</b>
              <ul className="space-y-2.5">
                {ACTIVITY.map((a, i) => (
                  <li key={i} className="text-[12.5px] border-b border-dashed border-line pb-2 last:border-0">
                    <span className="text-mute text-[11px] block">{a.time}</span>
                    <span className="text-ink">{a.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-4 mb-4">
            <b className="block text-[14px] text-ink mb-3">Quick actions</b>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {QUICK.map((q) => (
                <Link key={q.label} href={q.href} className={`${q.color} text-white rounded-sm p-3 hover:opacity-95 flex items-center gap-3`}>
                  <span className="text-[22px]">{q.icon}</span>
                  <b className="text-[12.5px] leading-tight">{q.label}</b>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link href="/seller-center/smart-expo" className="bg-gold/20 border border-gold rounded p-4 hover:bg-gold/30">
              <b className="block text-[14px] text-ink mb-1">🎪 June Smart Expo registration is open</b>
              <p className="text-[12px] text-mute">Furniture Asia Cloud Expo, June 12–16 — 8K+ Southeast Asian buyers attending. Register your booth now for free design support.</p>
            </Link>
            <Link href="/seller-center/ai-assistant" className="bg-brand/10 border border-brand rounded p-4 hover:bg-brand/15">
              <b className="block text-[14px] text-ink mb-1">🤖 Maike AI: automatic RFQ replies</b>
              <p className="text-[12px] text-mute">Turn on Maike to cut response time by 70% — buyers get a quote in 5 minutes instead of 6 hours. Free with the Gold plan.</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Seller Center — Huayuesc" };
