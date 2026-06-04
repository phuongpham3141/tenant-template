import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

const RECENT_RFQS = [
  { id: "RFQ-8421", title: "Porcelain tile 600x1200 for a 2,000m² project", time: "12 minutes ago", quotes: 7 },
  { id: "RFQ-8417", title: "L-shape velvet sofa for an HCMC showroom", time: "45 minutes ago", quotes: 5 },
  { id: "RFQ-8412", title: "Smart toilet for a 4-star hotel, MOQ 80pc", time: "2 hours ago", quotes: 9 },
  { id: "RFQ-8408", title: "LED downlight 12W, 1000pc", time: "3 hours ago", quotes: 12 },
  { id: "RFQ-8401", title: "Kitchen cabinet OEM, custom drawing", time: "5 hours ago", quotes: 4 },
];

export default async function BuyingRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; qty?: string; desc?: string }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Request for Quotation" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[180px] bg-brand-dark">
          <img src="/img/rfq-hero.jpg?v=5" alt="" className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 px-8 py-6 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
            <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📨 RFQ — REQUEST FOR QUOTATION</span>
            <h1 className="text-[30px] font-extrabold leading-tight max-md:text-[22px]">Send a request — Get quotes within 24h</h1>
            <p className="text-[13.5px] opacity-90 mt-1">Describe it once — sent to 5-10 matching factories. Quotes include samples, lead times, and DDP to Vietnam.</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-5 grid grid-cols-[1fr_340px] gap-5 max-md:grid-cols-1 mb-7">
        {/* Form */}
        <form action="/buying-request" method="get" className="bg-paper border border-line rounded p-5">
          <h2 className="text-[18px] font-bold text-ink mb-4">Request for Quotation Form</h2>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Product you need <span className="text-accent">*</span></label>
              <input name="q" defaultValue={sp.q ?? ""} placeholder="e.g. porcelain tile 600x1200 calacatta white" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Category</label>
              <select name="category" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                <option value="">-- Select category --</option>
                {NAV_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Quantity + unit <span className="text-accent">*</span></label>
              <input name="qty" defaultValue={sp.qty ?? ""} placeholder="e.g. 500 m² or 30 sets" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
            </div>
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Detailed description</label>
              <textarea name="desc" defaultValue={sp.desc ?? ""} rows={5} placeholder="Describe the product: dimensions, color, material, standards, deadline..." className="w-full px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand resize-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Reference images</label>
              <div className="border-2 border-dashed border-line rounded p-4 text-center text-[12.5px] text-mute hover:border-brand cursor-pointer">
                📎 Drag &amp; drop images or <a className="text-brand underline">click to choose files</a> — up to 5 images, under 5MB each
              </div>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Destination port</label>
              <select name="port" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                <option>Cat Lai – HCMC</option>
                <option>Hai Phong – HP</option>
                <option>Da Nang – DN</option>
                <option>DDP to warehouse (recommended)</option>
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Budget / unit</label>
              <select name="budget" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                <option>Flexible</option>
                <option>Under $10</option>
                <option>$10 – $50</option>
                <option>$50 – $200</option>
                <option>Over $200</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Urgency</label>
              <div className="flex gap-3 flex-wrap text-[12.5px]">
                {["Standard (24h)", "Fast (12h)", "Urgent (6h)"].map((u, i) => (
                  <label key={u} className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-sm cursor-pointer hover:border-brand">
                    <input type="radio" name="urgency" defaultChecked={i === 0} className="accent-brand" /> {u}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-line flex gap-3 items-center">
            <button type="submit" className="px-7 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90">🚀 Send RFQ Now</button>
            <span className="text-[12px] text-mute">Free · No registration required · Quotes within 24h</span>
          </div>
          {sp.q && (
            <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded text-[12.5px] text-success">
              ✓ Your RFQ has been sent to matching suppliers. We&apos;ll respond by email within 24h.
            </div>
          )}
        </form>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[14px] font-bold text-ink mb-3">3-Step Process</b>
            {[
              { n: 1, t: "Send RFQ", d: "Describe it once; the system matches suitable factories automatically" },
              { n: 2, t: "Receive 5-10 quotes", d: "Within 24h, with sample images, lead times, and DDP" },
              { n: 3, t: "Choose the best supplier", d: "Compare, chat directly, order samples, and confirm your order" },
            ].map((s) => (
              <div key={s.n} className="flex gap-3 mb-3 last:mb-0">
                <div className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0">{s.n}</div>
                <div>
                  <b className="block text-[13px] text-ink">{s.t}</b>
                  <p className="text-[11.5px] text-mute leading-snug">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-bold text-ink mb-2">🛡 The Huayuesc Promise</b>
            <ul className="text-[12px] text-mute space-y-1.5">
              <li>✓ Free quotes, no purchase commitment</li>
              <li>✓ Free factory audit before ordering</li>
              <li>✓ Trade Assurance payment protection</li>
              <li>✓ Vietnamese-language support 24/7</li>
            </ul>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-bold text-ink mb-2">Recent RFQs</b>
            <div className="space-y-2.5 text-[11.5px]">
              {RECENT_RFQS.map((r) => (
                <div key={r.id} className="border-b border-dashed border-line pb-2 last:border-0">
                  <div className="flex justify-between text-[10.5px] text-mute mb-0.5">
                    <span>{r.id}</span>
                    <span>{r.time}</span>
                  </div>
                  <b className="block text-[12px] text-ink leading-snug mb-0.5">{r.title}</b>
                  <span className="text-success text-[11px]">✓ {r.quotes} quotes received</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export const metadata = { title: "Send a Request for Quotation — Huayuesc" };
