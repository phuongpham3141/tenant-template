import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

export default function RegisterDealerPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Register as Dealer" }]} />
      <div className="max-w-[1100px] mx-auto px-4 mt-6 mb-10 grid grid-cols-[1fr_320px] gap-6 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-6">
          <span className="inline-block bg-accent text-white px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">🎁 NEW DEALER OFFER</span>
          <h1 className="text-[24px] font-extrabold text-ink mb-1">Register as a Dealer — Get 3 special perks</h1>
          <p className="text-[13px] text-mute mb-5">Limited program for the first 100 dealers in Q1/2026. Free to register.</p>

          <div className="grid grid-cols-3 gap-3 mb-5 max-md:grid-cols-1">
            {[
              { icon: "🏭", t: "Free factory audit", d: "One on-site audit of a factory of your choice (a $400 value)" },
              { icon: "💰", t: "10% off first order", d: "Applies to $5K+ orders from suppliers on the platform" },
              { icon: "🚚", t: "Free DDP", d: "Free DDP freight on your first order (up to $300)" },
            ].map((p) => (
              <div key={p.t} className="border border-line rounded p-3 bg-[#FFF7E6]">
                <div className="text-[26px] mb-1">{p.icon}</div>
                <b className="block text-[13px] text-ink mb-1">{p.t}</b>
                <p className="text-[11.5px] text-mute leading-snug">{p.d}</p>
              </div>
            ))}
          </div>

          <form action="/buyer-center" method="get" className="space-y-4">
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Name <span className="text-accent">*</span></label>
                <input name="name" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Company <span className="text-accent">*</span></label>
                <input name="company" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Email <span className="text-accent">*</span></label>
                <input name="email" type="email" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Phone / Zalo <span className="text-accent">*</span></label>
                <input name="phone" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Tax ID</label>
                <input name="tax" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Annual revenue</label>
                <select name="revenue" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                  <option>Under 1 billion VND</option>
                  <option>1 – 5 billion VND</option>
                  <option>5 – 20 billion VND</option>
                  <option>Over 20 billion VND</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Business sector</label>
                <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2">
                  {NAV_CATEGORIES.slice(0, 9).map((c) => (
                    <label key={c.slug} className="flex items-center gap-1.5 text-[12px] text-mute cursor-pointer">
                      <input type="checkbox" name="industry" value={c.slug} className="accent-brand" /> {c.icon} {c.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <label className="flex items-start gap-2 text-[12px] text-mute mt-4">
              <input type="checkbox" required className="accent-brand mt-0.5" />
              <span>I agree to the <Link href="/info/terms-of-service" className="text-brand">Terms</Link> and to using the free audit within 90 days.</span>
            </label>
            <button type="submit" className="w-full py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90 mt-3">Register as Dealer &amp; Get Perks →</button>
          </form>
        </div>

        <aside className="bg-paper border border-line rounded p-5 self-start">
          <b className="block text-[14px] font-bold text-ink mb-3">🎯 What other dealers say</b>
          <div className="space-y-3 text-[12px] text-ink">
            <div className="border-l-2 border-gold pl-3">
              <p className="leading-relaxed">&ldquo;The free audit helped me avoid a fraudulent supplier — worth well over $400 in reality.&rdquo;</p>
              <span className="text-[11px] text-mute mt-1 block">— Tran Quang Hung, Phuong Nam Building Materials</span>
            </div>
            <div className="border-l-2 border-gold pl-3">
              <p className="leading-relaxed">&ldquo;Free DDP and 10% off my first order saved me 22 million VND on the first batch.&rdquo;</p>
              <span className="text-[11px] text-mute mt-1 block">— Le Thu Hang, Sai Gon Showroom</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export const metadata = { title: "Register as Dealer — Huayuesc" };
