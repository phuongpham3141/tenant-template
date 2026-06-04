import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";
import { LOGIN_PROVIDERS } from "@/components/icons/social";

const VALUE_PROPS = [
  {
    icon: "📈",
    title: "Reach 600+ VN dealers",
    desc: "Verified buyers with real revenue — no fake accounts.",
  },
  {
    icon: "🆓",
    title: "Free audit & onboarding",
    desc: "Our Guangzhou team visits your factory to audit and prepares your profile for you.",
  },
  {
    icon: "💼",
    title: "0% listing fee",
    desc: "Pay just 5% commission per order — no hidden fees, no subscription.",
  },
  {
    icon: "🌐",
    title: "Vietnamese-language marketing",
    desc: "Our content team writes landing pages, translates catalogs, and runs ads to VN buyers.",
  },
];

const STEPS = [
  { n: 1, title: "Submit your application", desc: "5-minute form + brochure / catalog (PDF)" },
  { n: 2, title: "Online interview", desc: "30-minute video call with the QC team — capability review" },
  { n: 3, title: "On-site audit", desc: "Our Guangzhou team spends a day at your factory — photos, video, documents" },
  { n: 4, title: "Listing onboarding", desc: "Create your profile + 10 flagship products, with 1-on-1 training" },
  { n: 5, title: "Go live & first RFQ", desc: "Around 30 days on average from the application date" },
];

const FAQ = [
  {
    q: "Are there any fees I have to pay?",
    a: "No. Registration, audit, onboarding, hosting, and marketing are all free. Huayuesc charges only 5% commission on successful orders.",
  },
  {
    q: "How long does the audit take?",
    a: "1 day on-site + 3-5 days to prepare the report. From scheduling to a finished audit report takes about 7-10 days in total.",
  },
  {
    q: "Do I need to speak Vietnamese?",
    a: "No. Our Guangzhou team speaks Chinese and handles all transactions with VN buyers. You can focus entirely on production.",
  },
  {
    q: "How many factories have gone live?",
    a: "40+ verified factories as of Q4/2025, onboarding an average of 8-12 new factories each quarter.",
  },
];

export default function RegisterFactoryPage() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Sell on CSR", href: "/sell-on-csr" },
          { label: "Register Your Factory" },
        ]}
      />
      <div className="max-w-[1200px] mx-auto px-4 mt-6 mb-10">
        {/* HEADER BANNER */}
        <div
          className="rounded text-white px-7 py-6 mb-5 grid grid-cols-[1fr_auto] gap-5 items-center max-md:grid-cols-1 max-md:px-5 max-md:py-4"
          style={{ background: "linear-gradient(135deg, #003A42 0%, #001F26 100%)" }}
        >
          <div>
            <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2.5">
              🏭 REGISTER AS A SUPPLIER
            </span>
            <h1 className="text-[26px] font-extrabold leading-tight mb-1.5 max-md:text-[22px]">
              Register your factory on <span className="text-gold">Huayuesc</span>
            </h1>
            <p className="text-[13px] opacity-90 leading-relaxed max-w-[680px]">
              Reach 600+ Vietnamese dealers actively sourcing Chinese suppliers.
              Free on-site audit, 1-on-1 onboarding, no listing fees — just 5% commission per order.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-[12px] opacity-90 min-w-[200px]">
            <div className="flex justify-between">
              <span>🏭 Suppliers verified</span>
              <b>40+</b>
            </div>
            <div className="flex justify-between">
              <span>📦 RFQs / month</span>
              <b>1,200+</b>
            </div>
            <div className="flex justify-between">
              <span>💰 GMV 2025</span>
              <b>$8.2M</b>
            </div>
            <div className="flex justify-between">
              <span>⏱ Time to go-live</span>
              <b>~30 days</b>
            </div>
          </div>
        </div>

        {/* VALUE PROPS */}
        <div className="grid grid-cols-4 gap-3 mb-5 max-md:grid-cols-2">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className="bg-paper border border-line rounded p-3.5">
              <div className="text-[26px] mb-1.5">{v.icon}</div>
              <b className="block text-[13px] text-ink mb-1">{v.title}</b>
              <p className="text-[11.5px] text-mute leading-snug">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_320px] gap-6 max-md:grid-cols-1">
          {/* === LEFT: form ============================================== */}
          <div className="bg-paper border border-line rounded p-6 max-md:p-4">
            {/* Quick OAuth signup */}
            <div className="mb-5">
              <p className="text-[12.5px] text-mute mb-2.5">
                ⚡ Get started quickly with a company account:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {LOGIN_PROVIDERS.map((p) => (
                  <Link
                    key={p.name}
                    href={`/register/oauth/${p.name.toLowerCase()}?role=supplier`}
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
                Or fill out the detailed application
              </span>
              <div className="flex-1 h-px bg-line" />
            </div>

            <form action="/sell-on-csr" method="get" className="space-y-4">
              {/* Section: Company info */}
              <div>
                <b className="block text-[12px] uppercase tracking-wider text-brand mb-2">
                  ① Company Information
                </b>
                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                  <div className="col-span-2">
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Company name <span className="text-accent">*</span>
                    </label>
                    <input
                      name="company"
                      required
                      placeholder="Foshan ABC Industrial Co., Ltd."
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Year founded <span className="text-accent">*</span>
                    </label>
                    <input
                      name="founded"
                      type="number"
                      placeholder="2010"
                      required
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Business type <span className="text-accent">*</span>
                    </label>
                    <select
                      name="businessType"
                      required
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                    >
                      <option>Manufacturer</option>
                      <option>Manufacturer + Trading</option>
                      <option>Trading Company</option>
                      <option>Distributor / Agent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Province / City <span className="text-accent">*</span>
                    </label>
                    <select
                      name="province"
                      required
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                    >
                      <option value="">-- Select province --</option>
                      <option>Foshan, Guangdong</option>
                      <option>Guangzhou, Guangdong</option>
                      <option>Shenzhen, Guangdong</option>
                      <option>Dongguan, Guangdong</option>
                      <option>Hangzhou, Zhejiang</option>
                      <option>Ningbo, Zhejiang</option>
                      <option>Taizhou, Zhejiang</option>
                      <option>Yiwu, Zhejiang</option>
                      <option>Shanghai</option>
                      <option>Tianjin</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Number of employees
                    </label>
                    <select
                      name="employees"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                    >
                      <option>&lt; 100</option>
                      <option>100 – 500</option>
                      <option>500 – 2000</option>
                      <option>&gt; 2000</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section: Production capability */}
              <div className="pt-3 border-t border-line">
                <b className="block text-[12px] uppercase tracking-wider text-brand mb-2">
                  ② Production Capability
                </b>
                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Factory area (m²)
                    </label>
                    <input
                      name="area"
                      type="number"
                      placeholder="50000"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Capacity / month
                    </label>
                    <input
                      name="capacity"
                      placeholder="e.g. 200,000 pcs / month"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Typical MOQ
                    </label>
                    <input
                      name="moq"
                      placeholder="e.g. 500 pcs / 50 kg / 1x 20ft container"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Average lead time
                    </label>
                    <select
                      name="leadTime"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                    >
                      <option>7 – 15 days</option>
                      <option>15 – 30 days</option>
                      <option>30 – 45 days</option>
                      <option>45 – 60 days</option>
                      <option>&gt; 60 days</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Main products <span className="text-accent">*</span>{" "}
                      <span className="text-mute2 font-normal text-[11px]">(select multiple)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2">
                      {NAV_CATEGORIES.map((c) => (
                        <label
                          key={c.slug}
                          className="flex items-center gap-1.5 text-[12px] text-mute cursor-pointer px-2 py-1.5 border border-line rounded-sm hover:border-brand hover:bg-bg"
                        >
                          <input
                            type="checkbox"
                            name="products"
                            value={c.slug}
                            className="accent-brand"
                          />
                          <span className="text-[14px]">{c.icon}</span>
                          <span>{c.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Year export began
                    </label>
                    <input
                      name="exportYear"
                      type="number"
                      placeholder="2015"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Annual revenue (USD)
                    </label>
                    <select
                      name="revenue"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                    >
                      <option>&lt; $1M</option>
                      <option>$1M – $10M</option>
                      <option>$10M – $50M</option>
                      <option>&gt; $50M</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Existing certifications{" "}
                      <span className="text-mute2 font-normal text-[11px]">(select multiple)</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2 max-md:grid-cols-2">
                      {[
                        "ISO 9001",
                        "ISO 14001",
                        "BSCI",
                        "Sedex",
                        "CE",
                        "RoHS",
                        "FDA",
                        "Other",
                      ].map((cert) => (
                        <label
                          key={cert}
                          className="flex items-center gap-1.5 text-[12px] text-mute cursor-pointer px-2 py-1.5 border border-line rounded-sm hover:border-brand hover:bg-bg"
                        >
                          <input
                            type="checkbox"
                            name="cert"
                            value={cert}
                            className="accent-brand"
                          />
                          <span>{cert}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Contact + documents */}
              <div className="pt-3 border-t border-line">
                <b className="block text-[12px] uppercase tracking-wider text-brand mb-2">
                  ③ Contact & Documents
                </b>
                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Contact person <span className="text-accent">*</span>
                    </label>
                    <input
                      name="contactName"
                      required
                      placeholder="Contact name at the factory"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Job title
                    </label>
                    <input
                      name="contactRole"
                      placeholder="Sales Manager / Export Director"
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
                      placeholder="export@company.com"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      WeChat / WhatsApp
                    </label>
                    <input
                      name="im"
                      placeholder="WeChat ID or WhatsApp number"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Upload capability documents (PDF, brochure, catalog)
                    </label>
                    <div className="border-2 border-dashed border-line rounded p-5 text-center text-[12.5px] text-mute hover:border-brand cursor-pointer">
                      📎 Click or drag &amp; drop a PDF or ZIP file — up to 20MB
                      <br />
                      <small className="text-[11px] text-mute2">
                        Recommended: product catalog + business license + factory photos
                      </small>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      Existing website (if any)
                    </label>
                    <input
                      name="website"
                      type="url"
                      placeholder="https://yourcompany.com"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-2 text-[12px] text-mute mt-4">
                <input type="checkbox" required className="accent-brand mt-0.5" />
                <span>
                  I authorize Huayuesc to conduct an on-site audit and agree to the{" "}
                  <Link
                    href="/info/terms-of-service"
                    className="text-brand cursor-pointer hover:underline"
                  >
                    Supplier Terms
                  </Link>{" "}
                  (5% commission on successful orders).
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 bg-brand text-white rounded-sm font-bold text-[14px] cursor-pointer hover:bg-brand-light mt-3"
              >
                Submit Factory Application →
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
              <b className="block text-[14px] font-bold text-ink mb-3">📋 5-Step Process</b>
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
              <b className="block text-[14px] font-bold text-ink mb-3">❓ Quick FAQ</b>
              <div className="space-y-3">
                {FAQ.map((f) => (
                  <details key={f.q} className="group">
                    <summary className="flex justify-between items-start gap-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <b className="text-[12.5px] text-ink leading-snug">{f.q}</b>
                      <span className="text-mute text-[11px] group-open:rotate-180 transition-transform flex-shrink-0">
                        ▾
                      </span>
                    </summary>
                    <p className="text-[11.5px] text-mute leading-relaxed mt-1.5">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div
              className="rounded p-4 text-white"
              style={{ background: "linear-gradient(135deg,#005F6B,#003A42)" }}
            >
              <b className="block text-[14px] font-bold mb-1">💬 Need to talk first?</b>
              <p className="text-[11.5px] opacity-90 leading-snug mb-2.5">
                Our Guangzhou team is ready for a video call (in Chinese).
              </p>
              <div className="text-[11.5px] opacity-90 space-y-1">
                <div>📞 +86 20 1234 5678</div>
                <div>📧 supplier@alibabavn.com</div>
                <div>💬 WeChat: alibabavn_sup</div>
              </div>
            </div>

            <div className="bg-paper border border-line rounded p-4">
              <b className="block text-[12.5px] text-ink mb-1">🛍 Are you a buyer?</b>
              <p className="text-[11.5px] text-mute leading-snug mb-2">
                Register as a Buyer to send RFQs and get a free audit.
              </p>
              <Link
                href="/register/buyer"
                className="text-[12px] text-brand font-semibold cursor-pointer hover:underline"
              >
                Register as Buyer →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Register Your Factory — Huayuesc" };
