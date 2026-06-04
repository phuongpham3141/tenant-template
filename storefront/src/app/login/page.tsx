import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { LOGIN_PROVIDERS } from "@/components/icons/social";

/**
 * /login — full standalone page (used when user lands here directly).
 * Layout: 2 columns on desktop. Left = login card (social + form), right
 * = value props + 2 register CTAs (Buyer + Supplier). Mobile collapses
 * to single column with right column moving below.
 */

const VALUE_PROPS = [
  {
    icon: "🏭",
    title: "40+ audited factories",
    desc: "Verified suppliers with on-site inspection reports, photos and production line videos.",
  },
  {
    icon: "💰",
    title: "Quotes in < 24h",
    desc: "Send one RFQ, receive 5–10 quotes from matching factories within one business day.",
  },
  {
    icon: "🛡",
    title: "Trade Assurance",
    desc: "100% refund if goods are delivered off-spec, short on quantity, or past the agreed deadline.",
  },
  {
    icon: "🚚",
    title: "DDP to warehouse in 18 days",
    desc: "All-inclusive shipping + duties + customs clearance from Guangzhou/Ningbo to Hanoi/HCMC.",
  },
];

export default function LoginPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Sign In" }]} />
      <div className="max-w-[1100px] mx-auto px-4 mt-6 mb-10 grid grid-cols-[480px_1fr] gap-8 max-md:grid-cols-1 max-md:gap-5">
        {/* === LEFT: login card =========================================== */}
        <div className="bg-paper border border-line rounded p-6 max-md:p-4">
          {/* Tabs */}
          <div className="flex border-b border-line mb-5 -mx-6 -mt-6 max-md:-mx-4 max-md:-mt-4">
            <span className="flex-1 px-4 py-3 text-center text-[14px] font-bold border-b-2 border-brand text-brand cursor-default">
              Sign In
            </span>
            <Link
              href="/register/buyer"
              className="flex-1 px-4 py-3 text-center text-[14px] font-semibold border-b-2 border-transparent text-mute hover:text-brand cursor-pointer"
            >
              Sign Up
            </Link>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {LOGIN_PROVIDERS.map((p) => (
              <Link
                key={p.name}
                href={`/login/oauth/${p.name.toLowerCase()}`}
                className="flex items-center justify-center gap-2 py-2.5 border border-line rounded-sm text-[12.5px] font-semibold text-ink cursor-pointer hover:border-brand hover:bg-bg"
                aria-label={`Sign in with ${p.name}`}
              >
                <span className="flex-shrink-0">{p.icon}</span>
                <span>{p.name}</span>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-line" />
            <span className="text-[10.5px] text-mute2 uppercase tracking-wider">
              Or sign in with email
            </span>
            <div className="flex-1 h-px bg-line" />
          </div>

          {/* Form */}
          <form action="/buyer-center" method="get" className="space-y-3">
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                Email or phone number
              </label>
              <input
                name="login"
                placeholder="email@example.com or 09xx xxx xxx"
                className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
            </div>
            <div className="flex justify-between items-center text-[12px]">
              <label className="flex items-center gap-1.5 text-mute cursor-pointer">
                <input type="checkbox" className="accent-brand" />
                Remember me
              </label>
              <Link href="/info/quen-mat-khau" className="text-brand hover:underline cursor-pointer">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-brand text-white rounded-sm font-bold text-[14px] cursor-pointer hover:bg-brand-light"
            >
              Sign In
            </button>
          </form>

          {/* Register CTAs */}
          <div className="mt-6 pt-5 border-t border-line">
            <p className="text-[12.5px] text-mute mb-3 text-center">Don&apos;t have an account?</p>
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/register/buyer"
                className="flex flex-col items-center text-center px-3 py-3.5 border-2 border-brand rounded-sm cursor-pointer hover:bg-brand/5 transition"
              >
                <span className="text-[22px] mb-1">🛍</span>
                <b className="block text-[13px] text-brand mb-0.5">Register as Buyer</b>
                <small className="text-[10.5px] text-mute leading-tight">
                  Vietnamese buyers and dealers
                </small>
              </Link>
              <Link
                href="/register/factory"
                className="flex flex-col items-center text-center px-3 py-3.5 border-2 border-gold rounded-sm bg-gold/5 cursor-pointer hover:bg-gold/15 transition"
              >
                <span className="text-[22px] mb-1">🏭</span>
                <b className="block text-[13px] text-brand-dark mb-0.5">Register as Supplier</b>
                <small className="text-[10.5px] text-mute leading-tight">
                  Chinese factories
                </small>
              </Link>
            </div>
          </div>

          {/* Help links */}
          <div className="mt-5 pt-4 border-t border-line text-[11.5px] text-mute text-center space-x-3">
            <Link href="/help" className="hover:text-brand cursor-pointer">Help Center</Link>
            <span>·</span>
            <Link href="/info/terms-of-service" className="hover:text-brand cursor-pointer">Terms</Link>
            <span>·</span>
            <Link href="/info/privacy-policy" className="hover:text-brand cursor-pointer">Privacy</Link>
          </div>
        </div>

        {/* === RIGHT: value props ========================================== */}
        <aside className="space-y-4">
          {/* Hero card */}
          <div
            className="rounded text-white p-5 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
          >
            <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">
              ⚡ Huayuesc 2026
            </span>
            <h2 className="text-[22px] font-extrabold leading-tight mb-2">
              Your gateway to direct imports <br />from <span className="text-gold">40+ factories</span> in China
            </h2>
            <p className="text-[12.5px] opacity-85 leading-relaxed">
              Sign in to resume open RFQs, track orders, save favorite products,
              and manage contracts — all in one place.
            </p>
          </div>

          {/* Value props grid */}
          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            {VALUE_PROPS.map((v) => (
              <div key={v.title} className="bg-paper border border-line rounded p-3.5">
                <div className="text-[24px] mb-1.5">{v.icon}</div>
                <b className="block text-[13px] text-ink mb-1">{v.title}</b>
                <p className="text-[11.5px] text-mute leading-snug">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div className="bg-paper border border-line rounded p-4 grid grid-cols-3 gap-3 text-center">
            <div>
              <b className="block text-[18px] text-brand font-extrabold">600+</b>
              <small className="text-[11px] text-mute">Registered VN dealers</small>
            </div>
            <div className="border-x border-line">
              <b className="block text-[18px] text-brand font-extrabold">2,400+</b>
              <small className="text-[11px] text-mute">Verified products</small>
            </div>
            <div>
              <b className="block text-[18px] text-brand font-extrabold">$8.2M</b>
              <small className="text-[11px] text-mute">GMV in 2025</small>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 text-[11px] text-mute">
            <span className="px-2.5 py-1 bg-bg border border-line rounded-sm">✓ Vietnam Ministry of Industry &amp; Trade</span>
            <span className="px-2.5 py-1 bg-bg border border-line rounded-sm">✓ ISO 27001</span>
            <span className="px-2.5 py-1 bg-bg border border-line rounded-sm">✓ SSL Secured</span>
            <span className="px-2.5 py-1 bg-bg border border-line rounded-sm">✓ TUV Audited</span>
          </div>
        </aside>
      </div>
    </>
  );
}

export const metadata = { title: "Sign In — Huayuesc" };
