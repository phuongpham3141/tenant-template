import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";
import { LOGIN_PROVIDERS } from "@/components/icons/social";

const BENEFITS = [
  { icon: "🏭", title: "FREE FACTORY AUDIT", desc: "One on-site audit of a factory of your choice — a $400 value" },
  { icon: "💰", title: "10% off your first order", desc: "Applies to $5K+ orders from verified suppliers" },
  { icon: "🚚", title: "Free DDP on first order", desc: "Free DDP freight to Hanoi/HCMC (up to $300)" },
  { icon: "🛡", title: "Trade Assurance", desc: "100% refund if goods arrive off-spec — no negotiation needed" },
];

const TESTIMONIALS = [
  {
    quote: "The free audit helped me avoid a fraudulent supplier — worth far more than $400 in reality.",
    author: "Tran Quang Hung",
    role: "Phuong Nam Building Materials · Hanoi",
  },
  {
    quote: "Free DDP on my first order saved me 22 million VND on a 5K-meter batch of Oxford fabric.",
    author: "Le Thu Hang",
    role: "Sai Gon Showroom · Ho Chi Minh City",
  },
];

const STEPS = [
  { n: 1, title: "Fill in your details", desc: "60-second form — name, company, industry" },
  { n: 2, title: "Verify email/phone", desc: "OTP sent via Zalo or email" },
  { n: 3, title: "Activate your buyer dashboard", desc: "Access RFQs, audits, and Trade Assurance" },
  { n: 4, title: "Start sourcing", desc: "One-on-one consultation with our experts in Guangzhou" },
];

export default function RegisterBuyerPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Register as Buyer" }]} />
      <div className="max-w-[1200px] mx-auto px-4 mt-6 mb-10">
        {/* HEADER BANNER */}
        <div
          className="rounded text-white px-7 py-6 mb-5 grid grid-cols-[1fr_auto] gap-5 items-center max-md:grid-cols-1 max-md:px-5 max-md:py-4"
          style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
        >
          <div>
            <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2.5">
              🎁 NEW BUYER OFFER Q1/2026
            </span>
            <h1 className="text-[26px] font-extrabold leading-tight mb-1.5 max-md:text-[22px]">
              Register as a Buyer for free — <span className="text-gold">get 4 perks</span>
            </h1>
            <p className="text-[13px] opacity-90 leading-relaxed max-w-[600px]">
              Join 600+ Vietnamese dealers importing directly from Guangzhou, Ningbo, and Xiamen.
              Quotes in &lt; 24h, free factory audits, and DDP delivery to your warehouse.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-[12px] opacity-90 min-w-[180px]">
            <div className="flex justify-between">
              <span>👥 Registered buyers</span>
              <b>600+</b>
            </div>
            <div className="flex justify-between">
              <span>🏭 Verified suppliers</span>
              <b>40+</b>
            </div>
            <div className="flex justify-between">
              <span>💰 GMV 2025</span>
              <b>$8.2M</b>
            </div>
          </div>
        </div>

        {/* BENEFITS */}
        <div className="grid grid-cols-4 gap-3 mb-5 max-md:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-[#FFF7E6] border border-gold/40 rounded p-3.5">
              <div className="text-[26px] mb-1.5">{b.icon}</div>
              <b className="block text-[13px] text-ink mb-1">{b.title}</b>
              <p className="text-[11.5px] text-mute leading-snug">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_320px] gap-6 max-md:grid-cols-1">
          {/* === LEFT: form ============================================== */}
          <div className="bg-paper border border-line rounded p-6 max-md:p-4">
            {/* Quick social signup */}
            <div className="mb-5">
              <p className="text-[12.5px] text-mute mb-2.5">
                ⚡ Sign up in 5 seconds with:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {LOGIN_PROVIDERS.map((p) => (
                  <Link
                    key={p.name}
                    href={`/register/oauth/${p.name.toLowerCase()}?role=buyer`}
                    className="flex items-center justify-center gap-2 py-2.5 border border-line rounded-sm text-[12.5px] font-semibold text-ink cursor-pointer hover:border-brand hover:bg-bg"
                    aria-label={`Sign up with ${p.name}`}
                  >
                    <span className="flex-shrink-0">{p.icon}</span>
                    <span>{p.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-line" />
              <span className="text-[10.5px] text-mute2 uppercase tracking-wider">
                Or fill out the form
              </span>
              <div className="flex-1 h-px bg-line" />
            </div>

            <form action="/buyer-center" method="get" className="space-y-4">
              <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Nguyen Van A"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Company
                  </label>
                  <input
                    name="company"
                    placeholder="ABC Co., Ltd."
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Phone / Zalo <span className="text-accent">*</span>
                  </label>
                  <input
                    name="phone"
                    required
                    placeholder="09xx xxx xxx"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Password <span className="text-accent">*</span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="At least 8 characters"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    City / Province
                  </label>
                  <select
                    name="city"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>Hanoi</option>
                    <option>Ho Chi Minh City</option>
                    <option>Da Nang</option>
                    <option>Hai Phong</option>
                    <option>Can Tho</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Company size
                  </label>
                  <select
                    name="size"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>Individual / Sole proprietor</option>
                    <option>Under 10 employees</option>
                    <option>10 – 50 employees</option>
                    <option>50 – 200 employees</option>
                    <option>Over 200 employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Annual revenue
                  </label>
                  <select
                    name="revenue"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>Under 1 billion VND</option>
                    <option>1 – 5 billion VND</option>
                    <option>5 – 20 billion VND</option>
                    <option>Over 20 billion VND</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Industries of interest <span className="text-mute2 font-normal text-[11px]">(select multiple)</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2">
                    {NAV_CATEGORIES.slice(0, 9).map((c) => (
                      <label
                        key={c.slug}
                        className="flex items-center gap-1.5 text-[12px] text-mute cursor-pointer px-2 py-1.5 border border-line rounded-sm hover:border-brand hover:bg-bg"
                      >
                        <input
                          type="checkbox"
                          name="industry"
                          value={c.slug}
                          className="accent-brand"
                        />
                        <span className="text-[14px]">{c.icon}</span>
                        <span>{c.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    How did you hear about Huayuesc?
                  </label>
                  <select
                    name="source"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>Google search</option>
                    <option>Facebook / Zalo group</option>
                    <option>Referral from a friend</option>
                    <option>Trade show / event</option>
                    <option>Email marketing</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <label className="flex items-start gap-2 text-[12px] text-mute mt-4">
                <input type="checkbox" required className="accent-brand mt-0.5" />
                <span>
                  I agree to Huayuesc&apos;s{" "}
                  <Link href="/info/terms-of-service" className="text-brand cursor-pointer hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/info/privacy-policy" className="text-brand cursor-pointer hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              <label className="flex items-start gap-2 text-[12px] text-mute">
                <input type="checkbox" defaultChecked className="accent-brand mt-0.5" />
                <span>Receive the weekly Trade Alert — price trends, best sellers, and industry events.</span>
              </label>

              <button
                type="submit"
                className="w-full py-3 bg-brand text-white rounded-sm font-bold text-[14px] cursor-pointer hover:bg-brand-light mt-3"
              >
                Register as Buyer &amp; Get Perks →
              </button>
              <p className="text-[12px] text-mute text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-brand font-semibold cursor-pointer hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          </div>

          {/* === RIGHT: side info ======================================== */}
          <aside className="space-y-4 self-start">
            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[14px] font-bold text-ink mb-3">📋 4-Step Process</b>
              <ol className="space-y-3">
                {STEPS.map((s) => (
                  <li key={s.n} className="flex gap-2.5">
                    <span className="w-6 h-6 flex-shrink-0 rounded-full bg-brand text-white text-[12px] font-bold flex items-center justify-center">
                      {s.n}
                    </span>
                    <div>
                      <b className="block text-[12.5px] text-ink">{s.title}</b>
                      <p className="text-[11px] text-mute leading-snug">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[14px] font-bold text-ink mb-3">💬 What other buyers say</b>
              <div className="space-y-3 text-[12px] text-ink">
                {TESTIMONIALS.map((t) => (
                  <div key={t.author} className="border-l-2 border-gold pl-3">
                    <p className="leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                    <span className="text-[11px] text-mute mt-1 block">
                      — {t.author}, <i>{t.role}</i>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded p-4 text-white"
              style={{ background: "linear-gradient(135deg,#E85D4E,#E8364A)" }}
            >
              <b className="block text-[14px] font-bold mb-1">🏭 Are you a factory?</b>
              <p className="text-[11.5px] opacity-90 leading-snug mb-2.5">
                Register as a verified supplier to receive RFQs directly from 600+ Vietnamese dealers.
              </p>
              <Link
                href="/register/factory"
                className="inline-block px-3 py-1.5 bg-white text-accent text-[12px] font-bold rounded-sm cursor-pointer hover:bg-bg"
              >
                Register as Supplier →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Register as Buyer — Huayuesc" };
