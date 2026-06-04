import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const CHANNELS = [
  {
    name: "Tmall (天猫)",
    operator: "Alibaba Group",
    audience: "Urban middle to high-end",
    pros: ["1.2 billion Taobao/Tmall users", "Brand-friendly, suited to major brands", "Big sales on 11.11 and 6.18 drive 10× normal-day volume"],
    cons: ["~¥60K setup fee + ¥50K deposit", "Requires a China trademark", "Fierce competition"],
    fee: "¥60K setup · 0.5-5% commission",
    img: 81,
  },
  {
    name: "JD.com (京东)",
    operator: "JD Group",
    audience: "Tech-savvy, electronics, FMCG",
    pros: ["Own logistics — 1–2 day delivery to 90% of China", "High quality, few counterfeits", "More transparent customer data than Tmall"],
    cons: ["¥30-100K setup fee depending on category", "JD favors already-certified brands", "Requires a warehouse in China"],
    fee: "¥30-100K setup · 2-8% commission",
    img: 82,
  },
  {
    name: "1688.com",
    operator: "Alibaba B2B",
    audience: "Domestic B2B, distribution, OEM",
    pros: ["B2B-focused — ideal for manufacturers", "Low fee ~¥1,688/yr", "Easy to land big orders from wholesalers"],
    cons: ["Low margins (B2B = wholesale pricing)", "Needs a rich catalog & samples", "Requires investing in a 1688 showroom"],
    fee: "¥1,688/yr · 0% commission",
    img: 83,
  },
];

const COMPARE = [
  { feature: "Initial setup fee", tmall: "¥60K", jd: "¥30-100K", c1688: "¥1,688/yr" },
  { feature: "Commission", tmall: "0.5-5%", jd: "2-8%", c1688: "0%" },
  { feature: "Audience", tmall: "Urban B2C", jd: "Tech B2C", c1688: "Wholesale B2B + OEM" },
  { feature: "Free traffic", tmall: "Moderate", jd: "High", c1688: "High (B2B)" },
  { feature: "Minimum marketing spend", tmall: "¥30K/month", jd: "¥15K/month", c1688: "¥5K/month" },
  { feature: "Typical first-year ROI", tmall: "1.4-2.2×", jd: "1.6-2.5×", c1688: "1.8-3.0×" },
];

const SERVICES = [
  { icon: "🏪", title: "Full shop registration", desc: "Handle China business registration (if not yet held), trademark, and bank deposit." },
  { icon: "✨", title: "Listing optimization", desc: "Write SEO titles to the Taobao algorithm, A+ marketplace-standard images, and a 30s product video." },
  { icon: "📢", title: "Taobao Zhitongche advertising", desc: "A Taobao-focused ad team — keyword bidding, super recommend, and brand zone. Target ROI 3.5×." },
  { icon: "💬", title: "Chinese customer service", desc: "A Wangwang chat team 16 hrs/day — target DSR rating ≥ 4.85 (a Tmall T-Mall Premium requirement)." },
  { icon: "📈", title: "Reporting & analytics", desc: "A unified dashboard across all 3 platforms — revenue, conversion, return rate, and top SKUs. Weekly reports via DingTalk." },
];

const CASES = [
  {
    company: "OPPEIN Home (kitchen cabinet)",
    desc: "Previously 100% export, the company opened Tmall + 1688 in 2024. After 18 months, domestic sales made up 32% of revenue, providing stability when exports slowed in Q2 2025.",
    metric: "Domestic = 32% of revenue",
    img: 91,
  },
  {
    company: "KUKA Home (sofa)",
    desc: "Ran Tmall (B2C) + 1688 (dealer showroom) + Huayuesc exports in parallel. The 3 channels share a warehouse + QC team — cutting overhead cost by 18%.",
    metric: "−18% overhead",
    img: 92,
  },
];

export default function DomesticCnPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Seller Center", href: "/seller-center" }, { label: "China Domestic" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/domestic-cn" />
        <div>
          <div className="bg-gradient-to-br from-red-700 to-yellow-500 text-white rounded p-6 mb-4" style={{ background: "linear-gradient(135deg,#b91c1c,#eab308)" }}>
            <div className="inline-block bg-white text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🇨🇳 MIC DOMESTIC TRADE</div>
            <h1 className="text-[26px] font-bold leading-tight">Selling on China's domestic market</h1>
            <p className="text-[14px] opacity-95 mt-2 leading-relaxed max-w-[680px]">
              Chinese factories can sell domestically alongside exporting — diversifying revenue and steadying cash flow when export markets fluctuate. Huayuesc helps export-only suppliers onboard to Tmall, JD, and 1688.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {CHANNELS.map((c) => (
              <div key={c.name} className="bg-paper border border-line rounded overflow-hidden hover:border-brand">
                <img src={`/img/seller-cn-${c.img}.jpg?v=5`} alt="" className="w-full h-[120px] object-cover" />
                <div className="p-4">
                  <b className="block text-[14px] text-ink">{c.name}</b>
                  <span className="text-[11px] text-mute mb-2 block">Operated by: {c.operator}</span>
                  <p className="text-[11.5px] text-ink mb-2"><b>Audience:</b> {c.audience}</p>
                  <div className="border-t border-line pt-2">
                    <span className="text-[10.5px] text-mute font-semibold uppercase tracking-wider">Pros</span>
                    <ul className="mt-1 mb-2 space-y-0.5">
                      {c.pros.map((p) => <li key={p} className="text-[11.5px] text-ink flex gap-1"><span className="text-success">✓</span> {p}</li>)}
                    </ul>
                    <span className="text-[10.5px] text-mute font-semibold uppercase tracking-wider">Consider</span>
                    <ul className="mt-1 mb-2 space-y-0.5">
                      {c.cons.map((p) => <li key={p} className="text-[11.5px] text-mute flex gap-1"><span className="text-accent">!</span> {p}</li>)}
                    </ul>
                  </div>
                  <div className="bg-[#FAFBFC] rounded-sm px-2 py-1.5 text-[11px] text-accent font-semibold">{c.fee}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4 overflow-x-auto">
            <b className="block text-[15px] text-ink mb-4">📊 Comparing the 3 domestic channels</b>
            <table className="w-full text-[12.5px] min-w-[560px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">Factor</th>
                  <th className="text-left px-3 py-2.5 font-medium">Tmall</th>
                  <th className="text-left px-3 py-2.5 font-medium">JD.com</th>
                  <th className="text-left px-3 py-2.5 font-medium">1688</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((c) => (
                  <tr key={c.feature} className="border-t border-line">
                    <td className="px-3 py-2.5 text-ink font-semibold">{c.feature}</td>
                    <td className="px-3 py-2.5 text-mute">{c.tmall}</td>
                    <td className="px-3 py-2.5 text-mute">{c.jd}</td>
                    <td className="px-3 py-2.5 text-mute">{c.c1688}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🛠 Onboarding support — 5 services</b>
            <div className="grid grid-cols-5 gap-3 max-md:grid-cols-2">
              {SERVICES.map((s) => (
                <div key={s.title} className="border border-line rounded p-3 hover:border-brand">
                  <div className="text-[24px] mb-2">{s.icon}</div>
                  <b className="block text-[12.5px] text-ink mb-1">{s.title}</b>
                  <p className="text-[11px] text-mute leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🏆 Case studies — successful multi-channel suppliers</b>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.company} className="border border-line rounded overflow-hidden hover:border-brand grid grid-cols-[140px_1fr] max-md:grid-cols-1">
                  <img src={`/img/seller-cn-case-${c.img}.jpg?v=5`} alt="" className="w-full h-full object-cover max-md:h-[140px]" />
                  <div className="p-4">
                    <b className="block text-[13px] text-ink mb-2">{c.company}</b>
                    <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                    <div className="border-t border-line pt-2 flex justify-between items-baseline">
                      <span className="text-[10.5px] text-mute">Result</span>
                      <b className="text-[13px] text-success">{c.metric}</b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="#" className="block bg-brand text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">🇨🇳 Free domestic onboarding consultation</b>
            <p className="text-[12.5px] opacity-90">Our Tmall/JD/1688 team analyzes your catalog — choosing the right channel and a 6-month roadmap.</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "China Domestic Sales — Seller Center" };
