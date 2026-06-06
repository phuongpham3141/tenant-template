import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";
import { LOGIN_PROVIDERS } from "@/components/icons/social";
import { getT } from "@/lib/t";

const BENEFITS = [
  { icon: "🏭", title: "register_buyer.benefit_audit_title", desc: "register_buyer.benefit_audit_desc" },
  { icon: "💰", title: "register_buyer.benefit_discount_title", desc: "register_buyer.benefit_discount_desc" },
  { icon: "🚚", title: "register_buyer.benefit_ddp_title", desc: "register_buyer.benefit_ddp_desc" },
  { icon: "🛡", title: "register_buyer.benefit_assurance_title", desc: "register_buyer.benefit_assurance_desc" },
];

const TESTIMONIALS = [
  {
    quote: "register_buyer.testimonial1_quote",
    author: "Tran Quang Hung",
    role: "Phuong Nam Building Materials · Hanoi",
  },
  {
    quote: "register_buyer.testimonial2_quote",
    author: "Le Thu Hang",
    role: "Sai Gon Showroom · Ho Chi Minh City",
  },
];

const STEPS = [
  { n: 1, title: "register_buyer.step1_title", desc: "register_buyer.step1_desc" },
  { n: 2, title: "register_buyer.step2_title", desc: "register_buyer.step2_desc" },
  { n: 3, title: "register_buyer.step3_title", desc: "register_buyer.step3_desc" },
  { n: 4, title: "register_buyer.step4_title", desc: "register_buyer.step4_desc" },
];

export default async function RegisterBuyerPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("register_buyer.breadcrumb_home"), href: "/" }, { label: t("register_buyer.breadcrumb_current") }]} />
      <div className="max-w-[1200px] mx-auto px-4 mt-6 mb-10">
        {/* HEADER BANNER */}
        <div
          className="rounded text-white px-7 py-6 mb-5 grid grid-cols-[1fr_auto] gap-5 items-center max-md:grid-cols-1 max-md:px-5 max-md:py-4"
          style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
        >
          <div>
            <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2.5">
              {t("register_buyer.banner_badge")}
            </span>
            <h1 className="text-[26px] font-extrabold leading-tight mb-1.5 max-md:text-[22px]">
              {t("register_buyer.banner_title_pre")}<span className="text-gold">{t("register_buyer.banner_title_highlight")}</span>
            </h1>
            <p className="text-[13px] opacity-90 leading-relaxed max-w-[600px]">
              {t("register_buyer.banner_subtitle")}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-[12px] opacity-90 min-w-[180px]">
            <div className="flex justify-between">
              <span>{t("register_buyer.stat_buyers")}</span>
              <b>600+</b>
            </div>
            <div className="flex justify-between">
              <span>{t("register_buyer.stat_suppliers")}</span>
              <b>40+</b>
            </div>
            <div className="flex justify-between">
              <span>{t("register_buyer.stat_gmv")}</span>
              <b>$8.2M</b>
            </div>
          </div>
        </div>

        {/* BENEFITS */}
        <div className="grid grid-cols-4 gap-3 mb-5 max-md:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-[#FFF7E6] border border-gold/40 rounded p-3.5">
              <div className="text-[26px] mb-1.5">{b.icon}</div>
              <b className="block text-[13px] text-ink mb-1">{t(b.title)}</b>
              <p className="text-[11.5px] text-mute leading-snug">{t(b.desc)}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_320px] gap-6 max-md:grid-cols-1">
          {/* === LEFT: form ============================================== */}
          <div className="bg-paper border border-line rounded p-6 max-md:p-4">
            {/* Quick social signup */}
            <div className="mb-5">
              <p className="text-[12.5px] text-mute mb-2.5">
                {t("register_buyer.social_prompt")}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {LOGIN_PROVIDERS.map((p) => (
                  <Link
                    key={p.name}
                    href={`/register/oauth/${p.name.toLowerCase()}?role=buyer`}
                    className="flex items-center justify-center gap-2 py-2.5 border border-line rounded-sm text-[12.5px] font-semibold text-ink cursor-pointer hover:border-brand hover:bg-bg"
                    aria-label={`${t("register_buyer.social_aria")} ${p.name}`}
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
                {t("register_buyer.divider_or")}
              </span>
              <div className="flex-1 h-px bg-line" />
            </div>

            <form action="/buyer-center" method="get" className="space-y-4">
              <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    {t("register_buyer.label_name")} <span className="text-accent">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    placeholder={t("register_buyer.placeholder_name")}
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    {t("register_buyer.label_company")}
                  </label>
                  <input
                    name="company"
                    placeholder={t("register_buyer.placeholder_company")}
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    {t("register_buyer.label_email")} <span className="text-accent">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={t("register_buyer.placeholder_email")}
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    {t("register_buyer.label_phone")} <span className="text-accent">*</span>
                  </label>
                  <input
                    name="phone"
                    required
                    placeholder={t("register_buyer.placeholder_phone")}
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    {t("register_buyer.label_password")} <span className="text-accent">*</span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder={t("register_buyer.placeholder_password")}
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    {t("register_buyer.label_city")}
                  </label>
                  <select
                    name="city"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>{t("register_buyer.city_hanoi")}</option>
                    <option>{t("register_buyer.city_hcmc")}</option>
                    <option>{t("register_buyer.city_danang")}</option>
                    <option>{t("register_buyer.city_haiphong")}</option>
                    <option>{t("register_buyer.city_cantho")}</option>
                    <option>{t("register_buyer.city_other")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    {t("register_buyer.label_size")}
                  </label>
                  <select
                    name="size"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>{t("register_buyer.size_individual")}</option>
                    <option>{t("register_buyer.size_under10")}</option>
                    <option>{t("register_buyer.size_10_50")}</option>
                    <option>{t("register_buyer.size_50_200")}</option>
                    <option>{t("register_buyer.size_over200")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    {t("register_buyer.label_revenue")}
                  </label>
                  <select
                    name="revenue"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>{t("register_buyer.revenue_under1")}</option>
                    <option>{t("register_buyer.revenue_1_5")}</option>
                    <option>{t("register_buyer.revenue_5_20")}</option>
                    <option>{t("register_buyer.revenue_over20")}</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    {t("register_buyer.label_industries")} <span className="text-mute2 font-normal text-[11px]">{t("register_buyer.industries_hint")}</span>
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
                    {t("register_buyer.label_source")}
                  </label>
                  <select
                    name="source"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>{t("register_buyer.source_google")}</option>
                    <option>{t("register_buyer.source_facebook")}</option>
                    <option>{t("register_buyer.source_referral")}</option>
                    <option>{t("register_buyer.source_tradeshow")}</option>
                    <option>{t("register_buyer.source_email")}</option>
                    <option>{t("register_buyer.source_other")}</option>
                  </select>
                </div>
              </div>

              <label className="flex items-start gap-2 text-[12px] text-mute mt-4">
                <input type="checkbox" required className="accent-brand mt-0.5" />
                <span>
                  I agree to Huayuesc&apos;s{" "}
                  <Link href="/info/terms-of-service" className="text-brand cursor-pointer hover:underline">
                    {t("register_buyer.terms_link")}
                  </Link>{" "}
                  {t("register_buyer.terms_and")}{" "}
                  <Link href="/info/privacy-policy" className="text-brand cursor-pointer hover:underline">
                    {t("register_buyer.privacy_link")}
                  </Link>
                  .
                </span>
              </label>
              <label className="flex items-start gap-2 text-[12px] text-mute">
                <input type="checkbox" defaultChecked className="accent-brand mt-0.5" />
                <span>{t("register_buyer.newsletter_label")}</span>
              </label>

              <button
                type="submit"
                className="w-full py-3 bg-brand text-white rounded-sm font-bold text-[14px] cursor-pointer hover:bg-brand-light mt-3"
              >
                {t("register_buyer.submit_button")}
              </button>
              <p className="text-[12px] text-mute text-center">
                {t("register_buyer.already_account")}{" "}
                <Link href="/login" className="text-brand font-semibold cursor-pointer hover:underline">
                  {t("register_buyer.sign_in")}
                </Link>
              </p>
            </form>
          </div>

          {/* === RIGHT: side info ======================================== */}
          <aside className="space-y-4 self-start">
            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[14px] font-bold text-ink mb-3">{t("register_buyer.process_heading")}</b>
              <ol className="space-y-3">
                {STEPS.map((s) => (
                  <li key={s.n} className="flex gap-2.5">
                    <span className="w-6 h-6 flex-shrink-0 rounded-full bg-brand text-white text-[12px] font-bold flex items-center justify-center">
                      {s.n}
                    </span>
                    <div>
                      <b className="block text-[12.5px] text-ink">{t(s.title)}</b>
                      <p className="text-[11px] text-mute leading-snug">{t(s.desc)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[14px] font-bold text-ink mb-3">{t("register_buyer.testimonials_heading")}</b>
              <div className="space-y-3 text-[12px] text-ink">
                {TESTIMONIALS.map((tm) => (
                  <div key={tm.author} className="border-l-2 border-gold pl-3">
                    <p className="leading-relaxed">&ldquo;{t(tm.quote)}&rdquo;</p>
                    <span className="text-[11px] text-mute mt-1 block">
                      — {tm.author}, <i>{tm.role}</i>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded p-4 text-white"
              style={{ background: "linear-gradient(135deg,#E85D4E,#E8364A)" }}
            >
              <b className="block text-[14px] font-bold mb-1">{t("register_buyer.factory_heading")}</b>
              <p className="text-[11.5px] opacity-90 leading-snug mb-2.5">
                {t("register_buyer.factory_desc")}
              </p>
              <Link
                href="/register/factory"
                className="inline-block px-3 py-1.5 bg-white text-accent text-[12px] font-bold rounded-sm cursor-pointer hover:bg-bg"
              >
                {t("register_buyer.factory_cta")}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Register as Buyer — Huayuesc" };
