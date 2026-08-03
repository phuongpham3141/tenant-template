import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";
import { getT } from "@/lib/t";

export default async function RegisterDealerPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("register_dealer.breadcrumb_home"), href: "/" }, { label: t("register_dealer.breadcrumb_register") }]} />
      <div className="max-w-[1100px] mx-auto px-4 mt-6 mb-10 grid grid-cols-[1fr_320px] gap-6 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-6">
          <span className="inline-block bg-accent text-white px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">{t("register_dealer.badge_offer")}</span>
          <h1 className="text-[24px] font-extrabold text-ink mb-1">{t("register_dealer.title")}</h1>
          <p className="text-[13px] text-mute mb-5">{t("register_dealer.subtitle")}</p>

          <form action="/buyer-center" method="get" className="space-y-4">
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("register_dealer.label_name")} <span className="text-accent">*</span></label>
                <input name="name" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("register_dealer.label_company")} <span className="text-accent">*</span></label>
                <input name="company" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("register_dealer.label_email")} <span className="text-accent">*</span></label>
                <input name="email" type="email" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("register_dealer.label_phone")} <span className="text-accent">*</span></label>
                <input name="phone" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("register_dealer.label_tax")}</label>
                <input name="tax" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("register_dealer.label_revenue")}</label>
                <select name="revenue" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                  <option>{t("register_dealer.revenue_under1")}</option>
                  <option>{t("register_dealer.revenue_1to5")}</option>
                  <option>{t("register_dealer.revenue_5to20")}</option>
                  <option>{t("register_dealer.revenue_over20")}</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("register_dealer.label_sector")}</label>
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
              <span>{t("register_dealer.agree_pre")} <Link href="/info/terms-of-service" className="text-brand">{t("register_dealer.agree_terms")}</Link> {t("register_dealer.agree_post")}</span>
            </label>
            <button type="submit" className="w-full py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90 mt-3">{t("register_dealer.submit")}</button>
          </form>
        </div>

        <aside className="bg-paper border border-line rounded p-5 self-start">
          <b className="block text-[14px] font-bold text-ink mb-3">{t("register_dealer.testimonials_title")}</b>
          <div className="space-y-3 text-[12px] text-ink">
            <div className="border-l-2 border-gold pl-3">
              <p className="leading-relaxed">&ldquo;{t("register_dealer.testimonial1_quote")}&rdquo;</p>
              <span className="text-[11px] text-mute mt-1 block">{t("register_dealer.testimonial1_author")}</span>
            </div>
            <div className="border-l-2 border-gold pl-3">
              <p className="leading-relaxed">&ldquo;{t("register_dealer.testimonial2_quote")}&rdquo;</p>
              <span className="text-[11px] text-mute mt-1 block">{t("register_dealer.testimonial2_author")}</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export const metadata = { title: "Register as Dealer — Huayuesc" };
