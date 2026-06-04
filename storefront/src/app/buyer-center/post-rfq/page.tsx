import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { NAV_CATEGORIES } from "@/data/home";

const TIPS = [
  { icon: "📐", t: "Describe the specs in detail", d: "Dimensions, material, color, weight — the more specific you are, the more accurate the quote." },
  { icon: "🖼", t: "Attach reference photos", d: "A picture is worth 1,000 words — suppliers will understand 10x faster." },
  { icon: "📅", t: "State your deadline clearly", d: "A specific deadline (e.g. delivery before 15/06) lets suppliers decline early if they can't make it." },
  { icon: "💵", t: "Give a budget range", d: "Sharing your budget upfront helps suppliers target the right tier — and avoids quotes that are wildly high or low." },
];

export default async function PostRfqPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; qty?: string; desc?: string }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Buyer Center", href: "/buyer-center" }, { label: "Post an RFQ" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/post-rfq" />
        <div>
          <div className="bg-brand-dark text-white rounded p-5 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📨 RFQ — REQUEST FOR QUOTATION</div>
            <h1 className="text-[22px] font-bold leading-tight">Post an RFQ</h1>
            <p className="text-[13px] opacity-90 mt-2 leading-relaxed">
              Describe it once — sent to 5–10 matching factories. Quotes with samples, lead times, and DDP to Vietnam within 24 hours. Free, no deposit required.
            </p>
          </div>

          <div className="grid grid-cols-[1fr_280px] gap-4 max-md:grid-cols-1">
            <form action="/buying-request" method="get" className="bg-paper border border-line rounded p-5">
              <h2 className="text-[16px] font-bold text-ink mb-4">Standard RFQ form</h2>
              <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">Product you're looking for <span className="text-accent">*</span></label>
                  <input name="q" defaultValue={sp.q ?? ""} placeholder="e.g. porcelain tile 600x1200 calacatta white" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">Category</label>
                  <select name="category" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white">
                    <option value="">-- Select a category --</option>
                    {NAV_CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">Quantity + unit <span className="text-accent">*</span></label>
                  <input name="qty" defaultValue={sp.qty ?? ""} placeholder="e.g. 500 m² or 30 set" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">Detailed description</label>
                  <textarea name="desc" defaultValue={sp.desc ?? ""} rows={5} placeholder="Describe the product: dimensions, color, material, standards, deadline..." className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand resize-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">Reference photos</label>
                  <div className="border-2 border-dashed border-line rounded p-3 text-center text-[12px] text-mute hover:border-brand cursor-pointer">
                    📎 Drag and drop photos or <a className="text-brand underline">click to choose a file</a> — up to 5 photos, each under 5MB
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">Destination port</label>
                  <select name="port" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white">
                    <option>Cat Lai – HCM</option>
                    <option>Hai Phong – HP</option>
                    <option>Da Nang – DN</option>
                    <option>DDP to warehouse (recommended)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">Budget / unit</label>
                  <select name="budget" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white">
                    <option>Flexible</option>
                    <option>Under $10</option>
                    <option>$10 – $50</option>
                    <option>$50 – $200</option>
                    <option>Over $200</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">Urgency</label>
                  <div className="flex gap-2 flex-wrap text-[12px]">
                    {["Standard (24h)", "Fast (12h)", "Urgent (6h)"].map((u, i) => (
                      <label key={u} className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-sm cursor-pointer hover:border-brand">
                        <input type="radio" name="urgency" defaultChecked={i === 0} className="accent-brand" /> {u}
                      </label>
                    ))}
                  </div>
                </div>
                <label className="col-span-2 flex items-center gap-2 text-[12px] text-mute pt-2">
                  <input type="checkbox" defaultChecked className="accent-brand" /> Enable <b className="text-ink">Trade Assurance</b> for this RFQ (escrow + QC + insurance)
                </label>
              </div>
              <div className="mt-4 pt-3 border-t border-line flex gap-3 items-center max-md:flex-col max-md:items-start">
                <button type="submit" className="px-6 py-2.5 bg-accent text-white rounded-sm font-bold text-[13px] hover:opacity-90">🚀 Send RFQ</button>
                <span className="text-[11.5px] text-mute">Free · No deposit required · Quotes within 24h</span>
              </div>
              {sp.q && (
                <div className="mt-3 p-3 bg-success/10 border border-success/30 rounded text-[12px] text-success">
                  ✓ Your RFQ has been sent. We'll reply by email within 24 hours.
                </div>
              )}
            </form>

            <aside className="space-y-3">
              <div className="bg-paper border border-line rounded p-4">
                <b className="block text-[13px] font-bold text-ink mb-3">💡 Tips for a great RFQ</b>
                <div className="space-y-3">
                  {TIPS.map((tip) => (
                    <div key={tip.t} className="flex gap-2.5">
                      <span className="text-[18px] flex-shrink-0">{tip.icon}</span>
                      <div>
                        <b className="block text-[12px] text-ink">{tip.t}</b>
                        <p className="text-[11px] text-mute leading-snug">{tip.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-success/5 border border-success/30 rounded p-4">
                <b className="block text-[13px] text-success mb-2">🛡 The Huayuesc promise</b>
                <ul className="text-[11.5px] text-ink space-y-1">
                  <li>✓ Free quotes, no obligation to order</li>
                  <li>✓ Free factory audit before you order</li>
                  <li>✓ Trade Assurance payment protection</li>
                  <li>✓ 24/7 Vietnamese support</li>
                </ul>
              </div>

              <Link href="/buyer-center/secured-trading" className="block bg-brand text-white rounded p-3 hover:opacity-95 text-center">
                <b className="block text-[12.5px]">🔒 Learn about Trade Assurance</b>
                <span className="text-[10.5px] opacity-90">Your money is 100% safe</span>
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Post an RFQ — Buyer Center" };
