import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { SECTIONS } from "@/data/home";

const STATS = [
  { v: "12", l: "Orders in progress", c: "text-brand" },
  { v: "5", l: "RFQs awaiting quotes", c: "text-accent" },
  { v: "$12,420", l: "Total value Q4/2026", c: "text-success" },
  { v: "23", l: "Favorite products", c: "text-gold" },
];

const RECENT_RFQS = [
  { id: "RFQ-8421", product: "Porcelain tile 600×1200 calacatta", qty: "2,000 m²", quotes: 7, status: "Pending" },
  { id: "RFQ-8417", product: "Navy velvet L-shape sofa", qty: "30 set", quotes: 5, status: "Pending" },
  { id: "RFQ-8412", product: "4-star hotel smart toilet", qty: "80 pc", quotes: 9, status: "Ordered" },
];

const ACTIVITY = [
  { time: "12 min ago", text: "Dongpeng Ceramics sent a quote for RFQ-8421" },
  { time: "1 hour ago", text: "Order AVN-7820 arrived at the Pingxiang warehouse" },
  { time: "3 hours ago", text: "KUKA Home replied to your message" },
  { time: "Yesterday", text: "RFQ-8412 changed status to Ordered" },
];

const FEATURED = SECTIONS[0].products.slice(0, 4);

export default function BuyerCenterPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Buyer Center" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <h1 className="text-[20px] font-bold text-ink">Hi, Tran Van A 👋</h1>
            <p className="text-[12.5px] text-mute mt-1">Here is an overview of your activity this month.</p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {STATS.map((s) => (
              <div key={s.l} className="bg-paper border border-line rounded p-4">
                <b className={`block text-[24px] font-extrabold ${s.c}`}>{s.v}</b>
                <span className="text-[11.5px] text-mute mt-1 block">{s.l}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-4">
              <div className="flex justify-between items-center mb-3">
                <b className="text-[14px] text-ink">Recent RFQs</b>
                <Link href="/buying-request" className="text-brand text-[12px]">+ New RFQ</Link>
              </div>
              <table className="w-full text-[12.5px]">
                <thead className="text-mute">
                  <tr className="border-b border-line">
                    <th className="text-left py-1.5 font-medium">ID</th>
                    <th className="text-left py-1.5 font-medium">Product</th>
                    <th className="text-left py-1.5 font-medium">Quotes</th>
                    <th className="text-left py-1.5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_RFQS.map((r) => (
                    <tr key={r.id} className="border-b border-line last:border-0">
                      <td className="py-2 text-brand">{r.id}</td>
                      <td className="py-2 text-ink truncate max-w-[180px]">{r.product}</td>
                      <td className="py-2 text-success font-semibold">{r.quotes}</td>
                      <td className="py-2 text-mute">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

          <div className="bg-paper border border-line rounded p-4">
            <div className="flex justify-between items-center mb-3">
              <b className="text-[14px] text-ink">Recommended for you</b>
              <Link href="/products" className="text-brand text-[12px]">View More →</Link>
            </div>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {FEATURED.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="border border-line rounded-sm overflow-hidden hover:border-brand block">
                  <div className="aspect-square bg-[#F5F5F5]">
                    {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
                  </div>
                  <div className="p-2">
                    <h4 className="text-[12px] text-ink line-clamp-2 mb-1">{p.title}</h4>
                    <div className="text-accent font-bold text-[13px]">{p.price}<small className="text-mute font-normal text-[10px]">{p.unit}</small></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Buyer Center — Huayuesc" };
