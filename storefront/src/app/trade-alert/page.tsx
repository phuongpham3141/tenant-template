import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

const SAMPLE_ALERTS = [
  { tag: "PRICE", title: "Porcelain tile prices drop 8% in November", time: "2 days ago", text: "A 15% rise in Foshan output is pushing prices down. A chance to stock up for Tet." },
  { tag: "NEW SUPPLIER", title: "30 new ceramic factories join Huayuesc", time: "3 days ago", text: "All audited, concentrated in the Tan Hung cluster. MOQ from 100m²." },
  { tag: "TREND", title: "Smart toilets grow 240% in 2025", time: "5 days ago", text: "Ortonbaths, TOTO, and Kohler lead the way. Price range $150-450/pc for the VN market." },
  { tag: "FAIR", title: "Canton Fair Phase 2 registration opens", time: "1 week ago", text: "5-day tour with visa support, hotel, and visits to 3 factories. 15% off for the first 50 buyers to register." },
  { tag: "POLICY", title: "Furniture import duty drops to 15% from 2026", time: "1 week ago", text: "A new decree takes effect on 1/1/2026 — saving furniture dealers 5-10% on costs." },
  { tag: "DEAL", title: "Dongpeng offers 12% off on 500m²+ orders", time: "2 weeks ago", text: "Applies to the Calacatta porcelain line. Expires 30/11/2026." },
];

const TAG_COLORS: Record<string, string> = {
  PRICE: "bg-accent",
  "NEW SUPPLIER": "bg-success",
  TREND: "bg-brand",
  FAIR: "bg-gold text-brand-dark",
  POLICY: "bg-mute",
  DEAL: "bg-accent",
};

export default function TradeAlertPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Trade Alert" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 grid grid-cols-[1fr_360px] gap-5 max-md:grid-cols-1">
        <div>
          <div className="relative rounded overflow-hidden h-[200px] bg-brand-dark">
            <img src="/img/tradealert.jpg?v=5" alt="" className="w-full h-full object-cover opacity-55" />
            <div className="absolute inset-0 px-7 py-6 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
              <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📬 NEWSLETTER B2B</span>
              <h1 className="text-[28px] font-extrabold leading-tight max-md:text-[22px]">Get weekly product and industry trend alerts</h1>
              <p className="text-[13px] opacity-90 mt-2">12,000+ Vietnamese buyers receive our Trade Alert. Completely free, unsubscribe anytime.</p>
            </div>
          </div>

          {/* Sample alerts */}
          <h2 className="text-[16px] font-bold text-ink mt-5 mb-3">Recent Trade Alert samples</h2>
          <div className="space-y-3">
            {SAMPLE_ALERTS.map((a) => (
              <div key={a.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="flex justify-between items-start gap-3 mb-1.5">
                  <span className={`text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider ${TAG_COLORS[a.tag] ?? "bg-brand"}`}>{a.tag}</span>
                  <span className="text-[11.5px] text-mute">{a.time}</span>
                </div>
                <b className="block text-[14px] text-ink mb-1">{a.title}</b>
                <p className="text-[12.5px] text-mute leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <form action="/trade-alert" method="get" className="bg-paper border border-line rounded overflow-hidden sticky top-4">
            <div className="bg-brand text-white px-4 py-3 font-semibold text-[14px]">📬 Subscribe to Trade Alert</div>
            <div className="p-4">
              <p className="text-[12px] text-mute mb-3">Enter your email + industry of interest. 1-2 emails per week, no spam.</p>
              <input name="email" type="email" placeholder="email@example.com" className="w-full px-3 py-2 border border-line rounded-sm text-[13px] mb-2 outline-none focus:border-brand" />
              <select name="industry" className="w-full px-3 py-2 border border-line rounded-sm text-[13px] mb-2 bg-white">
                <option value="">-- Industry of interest --</option>
                {NAV_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                ))}
              </select>
              <select name="lang" className="w-full px-3 py-2 border border-line rounded-sm text-[13px] mb-3 bg-white">
                <option value="vi">🇻🇳 Tiếng Việt</option>
                <option value="en">🇬🇧 English</option>
              </select>
              <button type="submit" className="w-full py-2.5 bg-accent text-white rounded-sm font-bold text-[13px]">Subscribe for Free</button>
              <p className="text-[11px] text-mute text-center mt-3">
                Already have an account? <Link href="/login" className="text-brand">Sign In</Link>
              </p>
            </div>
          </form>

          <div className="bg-paper border border-line rounded p-4 mt-4 text-[12px] text-mute leading-relaxed">
            <b className="block text-[13px] text-ink mb-2">Subscriber benefits</b>
            <ul className="space-y-1.5">
              <li>✓ Weekly raw-material price alerts</li>
              <li>✓ Reports on newly joined suppliers</li>
              <li>✓ Canton Fair tour discount codes</li>
              <li>✓ One free webinar per month</li>
            </ul>
          </div>
        </aside>
      </div>
      <div className="mb-7" />
    </>
  );
}

export const metadata = { title: "Trade Alert — Huayuesc" };
