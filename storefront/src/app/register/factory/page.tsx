import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";
import { LOGIN_PROVIDERS } from "@/components/icons/social";
import { getT } from "@/lib/t";

const VALUE_PROPS = [
  {
    icon: "📈",
    title: "register_factory.vp1_title",
    desc: "register_factory.vp1_desc",
  },
  {
    icon: "🆓",
    title: "register_factory.vp2_title",
    desc: "register_factory.vp2_desc",
  },
  {
    icon: "💼",
    title: "register_factory.vp3_title",
    desc: "register_factory.vp3_desc",
  },
  {
    icon: "🌐",
    title: "register_factory.vp4_title",
    desc: "register_factory.vp4_desc",
  },
];

const STEPS = [
  { n: 1, title: "register_factory.step1_title", desc: "register_factory.step1_desc" },
  { n: 2, title: "register_factory.step2_title", desc: "register_factory.step2_desc" },
  { n: 3, title: "register_factory.step3_title", desc: "register_factory.step3_desc" },
  { n: 4, title: "register_factory.step4_title", desc: "register_factory.step4_desc" },
  { n: 5, title: "register_factory.step5_title", desc: "register_factory.step5_desc" },
];

const FAQ = [
  {
    q: "register_factory.faq1_q",
    a: "register_factory.faq1_a",
  },
  {
    q: "register_factory.faq2_q",
    a: "register_factory.faq2_a",
  },
  {
    q: "register_factory.faq3_q",
    a: "register_factory.faq3_a",
  },
  {
    q: "register_factory.faq4_q",
    a: "register_factory.faq4_a",
  },
];

export default async function RegisterFactoryPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb
        trail={[
          { label: t("register_factory.bc_home"), href: "/" },
          { label: t("register_factory.bc_sell"), href: "/sell-on-csr" },
          { label: t("register_factory.bc_register") },
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
              {t("register_factory.badge")}
            </span>
            <h1 className="text-[26px] font-extrabold leading-tight mb-1.5 max-md:text-[22px]">
              {t("register_factory.hero_title_pre")} <span className="text-gold">Huayuesc</span>
            </h1>
            <p className="text-[13px] opacity-90 leading-relaxed max-w-[680px]">
              {t("register_factory.hero_desc")}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-[12px] opacity-90 min-w-[200px]">
            <div className="flex justify-between">
              <span>{t("register_factory.stat_suppliers")}</span>
              <b>40+</b>
            </div>
            <div className="flex justify-between">
              <span>{t("register_factory.stat_rfqs")}</span>
              <b>1,200+</b>
            </div>
            <div className="flex justify-between">
              <span>{t("register_factory.stat_gmv")}</span>
              <b>$8.2M</b>
            </div>
            <div className="flex justify-between">
              <span>{t("register_factory.stat_golive")}</span>
              <b>~30 days</b>
            </div>
          </div>
        </div>

        {/* VALUE PROPS */}
        <div className="grid grid-cols-4 gap-3 mb-5 max-md:grid-cols-2">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className="bg-paper border border-line rounded p-3.5">
              <div className="text-[26px] mb-1.5">{v.icon}</div>
              <b className="block text-[13px] text-ink mb-1">{t(v.title)}</b>
              <p className="text-[11.5px] text-mute leading-snug">{t(v.desc)}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_320px] gap-6 max-md:grid-cols-1">
          {/* === LEFT: form ============================================== */}
          <div className="bg-paper border border-line rounded p-6 max-md:p-4">
            {/* Quick OAuth signup */}
            <div className="mb-5">
              <p className="text-[12.5px] text-mute mb-2.5">
                {t("register_factory.oauth_intro")}
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
                {t("register_factory.divider_or")}
              </span>
              <div className="flex-1 h-px bg-line" />
            </div>

            <form action="/sell-on-csr" method="get" className="space-y-4">
              {/* Section: Company info */}
              <div>
                <b className="block text-[12px] uppercase tracking-wider text-brand mb-2">
                  {t("register_factory.sec_company")}
                </b>
                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                  <div className="col-span-2">
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      {t("register_factory.lbl_company")} <span className="text-accent">*</span>
                    </label>
                    <input
                      name="company"
                      required
                      placeholder={t("register_factory.ph_company")}
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      {t("register_factory.lbl_founded")} <span className="text-accent">*</span>
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
                      {t("register_factory.lbl_biztype")} <span className="text-accent">*</span>
                    </label>
                    <select
                      name="businessType"
                      required
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                    >
                      <option>{t("register_factory.opt_manufacturer")}</option>
                      <option>{t("register_factory.opt_manufacturer_trading")}</option>
                      <option>{t("register_factory.opt_trading")}</option>
                      <option>{t("register_factory.opt_distributor")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      {t("register_factory.lbl_province")} <span className="text-accent">*</span>
                    </label>
                    <select
                      name="province"
                      required
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                    >
                      <option value="">{t("register_factory.opt_select_province")}</option>
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
                      <option>{t("register_factory.opt_other")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      {t("register_factory.lbl_employees")}
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
                  {t("register_factory.sec_production")}
                </b>
                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      {t("register_factory.lbl_area")}
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
                      {t("register_factory.lbl_capacity")}
                    </label>
                    <input
                      name="capacity"
                      placeholder={t("register_factory.ph_capacity")}
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      {t("register_factory.lbl_moq")}
                    </label>
                    <input
                      name="moq"
                      placeholder={t("register_factory.ph_moq")}
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      {t("register_factory.lbl_leadtime")}
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
                      {t("register_factory.lbl_main_products")} <span className="text-accent">*</span>{" "}
                      <span className="text-mute2 font-normal text-[11px]">{t("register_factory.hint_select_multiple")}</span>
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
                      {t("register_factory.lbl_export_year")}
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
                      {t("register_factory.lbl_revenue")}
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
                      {t("register_factory.lbl_certs")}{" "}
                      <span className="text-mute2 font-normal text-[11px]">{t("register_factory.hint_select_multiple")}</span>
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
                  {t("register_factory.sec_contact")}
                </b>
                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      {t("register_factory.lbl_contact_person")} <span className="text-accent">*</span>
                    </label>
                    <input
                      name="contactName"
                      required
                      placeholder={t("register_factory.ph_contact_name")}
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      {t("register_factory.lbl_job_title")}
                    </label>
                    <input
                      name="contactRole"
                      placeholder={t("register_factory.ph_job_title")}
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      {t("register_factory.lbl_email")} <span className="text-accent">*</span>
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
                      {t("register_factory.lbl_im")}
                    </label>
                    <input
                      name="im"
                      placeholder={t("register_factory.ph_im")}
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      {t("register_factory.lbl_upload")}
                    </label>
                    <div className="border-2 border-dashed border-line rounded p-5 text-center text-[12.5px] text-mute hover:border-brand cursor-pointer">
                      {t("register_factory.upload_drop")}
                      <br />
                      <small className="text-[11px] text-mute2">
                        {t("register_factory.upload_hint")}
                      </small>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      {t("register_factory.lbl_website")}
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
                  {t("register_factory.consent_pre")}{" "}
                  <Link
                    href="/info/terms-of-service"
                    className="text-brand cursor-pointer hover:underline"
                  >
                    {t("register_factory.consent_terms_link")}
                  </Link>{" "}
                  {t("register_factory.consent_post")}
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 bg-brand text-white rounded-sm font-bold text-[14px] cursor-pointer hover:bg-brand-light mt-3"
              >
                {t("register_factory.btn_submit")}
              </button>
              <p className="text-[12px] text-mute text-center">
                {t("register_factory.have_account")}{" "}
                <Link href="/login" className="text-brand font-semibold cursor-pointer hover:underline">
                  {t("register_factory.sign_in")}
                </Link>
              </p>
            </form>
          </div>

          {/* === RIGHT: side info ======================================== */}
          <aside className="space-y-4 self-start">
            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[14px] font-bold text-ink mb-3">{t("register_factory.side_process_title")}</b>
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
              <b className="block text-[14px] font-bold text-ink mb-3">{t("register_factory.side_faq_title")}</b>
              <div className="space-y-3">
                {FAQ.map((f) => (
                  <details key={f.q} className="group">
                    <summary className="flex justify-between items-start gap-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <b className="text-[12.5px] text-ink leading-snug">{t(f.q)}</b>
                      <span className="text-mute text-[11px] group-open:rotate-180 transition-transform flex-shrink-0">
                        ▾
                      </span>
                    </summary>
                    <p className="text-[11.5px] text-mute leading-relaxed mt-1.5">{t(f.a)}</p>
                  </details>
                ))}
              </div>
            </div>

            <div
              className="rounded p-4 text-white"
              style={{ background: "linear-gradient(135deg,#005F6B,#003A42)" }}
            >
              <b className="block text-[14px] font-bold mb-1">{t("register_factory.side_talk_title")}</b>
              <p className="text-[11.5px] opacity-90 leading-snug mb-2.5">
                {t("register_factory.side_talk_desc")}
              </p>
              <div className="text-[11.5px] opacity-90 space-y-1">
                <div>📞 000-000-000</div>
                <div>📧 supplier@alibabavn.com</div>
                <div>💬 WeChat: alibabavn_sup</div>
              </div>
            </div>

            <div className="bg-paper border border-line rounded p-4">
              <b className="block text-[12.5px] text-ink mb-1">{t("register_factory.side_buyer_title")}</b>
              <p className="text-[11.5px] text-mute leading-snug mb-2">
                {t("register_factory.side_buyer_desc")}
              </p>
              <Link
                href="/register/buyer"
                className="text-[12px] text-brand font-semibold cursor-pointer hover:underline"
              >
                {t("register_factory.side_buyer_link")}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Register Your Factory — Huayuesc" };
