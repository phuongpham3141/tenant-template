import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const MODES = [
  {
    icon: "📦",
    title: "LCL Sea (less-than-container load)",
    leadtime: "10–14 days",
    cost: "$45-70/CBM",
    bestFor: "Small orders under 15 CBM, furniture/textile MOQ",
    pros: ["Lowest cost", "No need to fill a container", "Great for new suppliers"],
  },
  {
    icon: "🚢",
    title: "FCL Sea (full container)",
    leadtime: "8–12 days",
    cost: "$1,800-3,200/cont 40'",
    bestFor: "Large orders over 28 CBM, hotel chains, projects",
    pros: ["Cheapest unit price per m³", "Safe (not consolidated with other cargo)", "Real-time tracking"],
  },
  {
    icon: "✈",
    title: "Air Express",
    leadtime: "2–4 days",
    cost: "$5.8-9.2/kg",
    bestFor: "Samples, premium goods, urgent orders",
    pros: ["Fastest", "Detailed hour-by-hour tracking", "Great for electronics, jewelry"],
  },
];

const FORWARDERS = [
  { name: "Maersk", coverage: "Global", img: 51 },
  { name: "COSCO Shipping", coverage: "China-Southeast Asia", img: 52 },
  { name: "DHL Express", coverage: "Global air", img: 53 },
  { name: "FedEx", coverage: "Priority air", img: 54 },
  { name: "VietExpress", coverage: "China-Vietnam DDP", img: 55 },
  { name: "Cainiao Logistics", coverage: "China-SEA consolidation", img: 56 },
  { name: "Yang Ming", coverage: "Taiwan-Vietnam sea", img: 57 },
  { name: "Evergreen", coverage: "Sea container", img: 58 },
];

const ROUTES = [
  { from: "Guangzhou", to: "Hai Phong", mode: "FCL 40'", time: "8 days", price: "$1,950" },
  { from: "Ningbo", to: "Ho Chi Minh City (Cat Lai)", mode: "FCL 40'", time: "11 days", price: "$2,420" },
  { from: "Xiamen", to: "Da Nang", mode: "FCL 20'", time: "9 days", price: "$1,180" },
  { from: "Shenzhen", to: "Hanoi (Noi Bai)", mode: "Air Express", time: "3 days", price: "$6.4/kg" },
  { from: "Shanghai", to: "Hai Phong", mode: "LCL", time: "12 days", price: "$58/CBM" },
  { from: "Pingxiang", to: "Lang Son (Huu Nghi)", mode: "Road", time: "1 day", price: "$680/truck" },
];

export default function LogisticsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Seller Center", href: "/seller-center" }, { label: "International Logistics" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/logistics" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/15 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🚢 INTERNATIONAL LOGISTICS</div>
            <h1 className="text-[22px] font-bold text-ink">International logistics for suppliers</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              3 shipping modes + 8 forwarders + 6 popular China-Vietnam routes. Real-time quotes, 24/7 tracking, and a DDP option so buyers never worry about customs clearance. STS escrow integrated on every shipment.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {MODES.map((m) => (
              <div key={m.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[32px] mb-2">{m.icon}</div>
                <b className="block text-[14px] text-ink mb-2">{m.title}</b>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-[#FAFBFC] rounded p-2">
                    <span className="text-[10px] text-mute block">Delivery time</span>
                    <b className="text-[12px] text-brand">{m.leadtime}</b>
                  </div>
                  <div className="bg-[#FAFBFC] rounded p-2">
                    <span className="text-[10px] text-mute block">Cost</span>
                    <b className="text-[12px] text-accent">{m.cost}</b>
                  </div>
                </div>
                <p className="text-[11px] text-mute mb-2"><b className="text-ink">Best for:</b> {m.bestFor}</p>
                <ul className="space-y-1 border-t border-line pt-2">
                  {m.pros.map((p) => (
                    <li key={p} className="text-[11.5px] text-ink flex gap-1.5"><span className="text-success">✓</span> {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🧮 Quick freight calculator (mock)</b>
            <div className="grid grid-cols-5 gap-3 max-md:grid-cols-1">
              <select className="border border-line rounded-sm px-3 py-2 text-[12.5px]">
                <option>Origin port: Guangzhou</option>
                <option>Ningbo</option>
                <option>Shenzhen</option>
              </select>
              <select className="border border-line rounded-sm px-3 py-2 text-[12.5px]">
                <option>Destination port: Hai Phong</option>
                <option>Ho Chi Minh City</option>
                <option>Da Nang</option>
              </select>
              <input type="text" placeholder="Volume (CBM)" className="border border-line rounded-sm px-3 py-2 text-[12.5px]" />
              <input type="text" placeholder="Weight (kg)" className="border border-line rounded-sm px-3 py-2 text-[12.5px]" />
              <button className="bg-brand text-white rounded-sm px-3 py-2 text-[12.5px] font-semibold">Calculate →</button>
            </div>
            <p className="text-[11px] text-mute mt-3">An estimate appears instantly — the official quote, including surcharges, follows from the forwarder within 2 hours.</p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🤝 8 shipping partners</b>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {FORWARDERS.map((f) => (
                <div key={f.name} className="border border-line rounded p-3 flex items-center gap-3 hover:border-brand">
                  <img src={`/img/seller-fwd-${f.img}.jpg?v=5`} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <b className="block text-[12.5px] text-ink truncate">{f.name}</b>
                    <span className="text-[10.5px] text-mute">{f.coverage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🗺 Popular China → Vietnam routes</b>
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">Origin port</th>
                  <th className="text-left px-3 py-2.5 font-medium">Destination port</th>
                  <th className="text-left px-3 py-2.5 font-medium">Mode</th>
                  <th className="text-left px-3 py-2.5 font-medium">Time</th>
                  <th className="text-left px-3 py-2.5 font-medium">Reference price</th>
                </tr>
              </thead>
              <tbody>
                {ROUTES.map((r, i) => (
                  <tr key={i} className="border-t border-line hover:bg-[#FAFBFC]">
                    <td className="px-3 py-2.5 text-ink font-semibold">{r.from}</td>
                    <td className="px-3 py-2.5 text-ink">{r.to}</td>
                    <td className="px-3 py-2.5 text-mute">{r.mode}</td>
                    <td className="px-3 py-2.5 text-brand">{r.time}</td>
                    <td className="px-3 py-2.5 text-accent font-semibold">{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-3">📍 Live tracking (demo)</b>
            <div className="border border-line rounded p-4 bg-[#FAFBFC]">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <b className="text-[13px] text-ink">Container TEMU-928412 · MAEU-7821</b>
                  <span className="text-[11px] text-mute block">FCL 40' HQ · Guangzhou → Hai Phong · ETD May 02 · ETA May 10</span>
                </div>
                <span className="bg-success text-white text-[10.5px] font-bold px-2 py-0.5 rounded-sm">In transit</span>
              </div>
              <div className="grid grid-cols-5 gap-1 mt-3">
                {["Factory pickup", "Yantian Port", "At sea", "Hai Phong", "Buyer warehouse"].map((stage, i) => (
                  <div key={stage} className="text-center">
                    <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold ${i <= 2 ? "bg-success text-white" : "bg-mute2/30 text-mute"}`}>{i + 1}</div>
                    <span className={`text-[10.5px] mt-1 block ${i <= 2 ? "text-ink font-semibold" : "text-mute"}`}>{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href="#" className="block bg-brand text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">📦 Book shipping for your next order</b>
            <p className="text-[12.5px] opacity-90">Automatic quotes within 5 minutes from 8 forwarders — pick the cheapest or the fastest.</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "International Logistics — Seller Center" };
