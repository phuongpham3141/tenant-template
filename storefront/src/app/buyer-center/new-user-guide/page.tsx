import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { getT } from "@/lib/t";

const STEPS = [
  {
    n: 1,
    title: "buyer_center_new_user_guide.step1_title",
    desc: "buyer_center_new_user_guide.step1_desc",
    cta: "buyer_center_new_user_guide.step1_cta",
    href: "/account/register",
  },
  {
    n: 2,
    title: "buyer_center_new_user_guide.step2_title",
    desc: "buyer_center_new_user_guide.step2_desc",
    cta: "buyer_center_new_user_guide.step2_cta",
    href: "/account/verify",
  },
  {
    n: 3,
    title: "buyer_center_new_user_guide.step3_title",
    desc: "buyer_center_new_user_guide.step3_desc",
    cta: "buyer_center_new_user_guide.step3_cta",
    href: "/buying-request",
  },
  {
    n: 4,
    title: "buyer_center_new_user_guide.step4_title",
    desc: "buyer_center_new_user_guide.step4_desc",
    cta: "buyer_center_new_user_guide.step4_cta",
    href: "/buyer-center",
  },
];

const FAQS = [
  {
    q: "buyer_center_new_user_guide.faq1_q",
    a: "buyer_center_new_user_guide.faq1_a",
  },
  {
    q: "buyer_center_new_user_guide.faq2_q",
    a: "buyer_center_new_user_guide.faq2_a",
  },
  {
    q: "buyer_center_new_user_guide.faq3_q",
    a: "buyer_center_new_user_guide.faq3_a",
  },
  {
    q: "buyer_center_new_user_guide.faq4_q",
    a: "buyer_center_new_user_guide.faq4_a",
  },
  {
    q: "buyer_center_new_user_guide.faq5_q",
    a: "buyer_center_new_user_guide.faq5_a",
  },
];

const DOWNLOADS = [
  {
    icon: "📕",
    title: "buyer_center_new_user_guide.download1_title",
    desc: "buyer_center_new_user_guide.download1_desc",
    size: "PDF · 4.2 MB",
  },
  {
    icon: "📘",
    title: "buyer_center_new_user_guide.download2_title",
    desc: "buyer_center_new_user_guide.download2_desc",
    size: "PDF · 2.8 MB",
  },
  {
    icon: "📗",
    title: "buyer_center_new_user_guide.download3_title",
    desc: "buyer_center_new_user_guide.download3_desc",
    size: "PDF · 1.5 MB",
  },
];

export default async function NewUserGuidePage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("buyer_center_new_user_guide.bc_home"), href: "/" }, { label: t("buyer_center_new_user_guide.bc_buyer_center"), href: "/buyer-center" }, { label: t("buyer_center_new_user_guide.bc_new_buyer_guide") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/new-user-guide" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">{t("buyer_center_new_user_guide.badge_onboarding")}</div>
            <h1 className="text-[22px] font-bold text-ink">{t("buyer_center_new_user_guide.h1")}</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              {t("buyer_center_new_user_guide.intro")}
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("buyer_center_new_user_guide.process_heading")}</b>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              {STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-4 hover:border-brand transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-brand text-white rounded-full flex items-center justify-center font-bold text-[14px] flex-shrink-0">{s.n}</div>
                    <b className="text-[14px] text-ink">{t(s.title)}</b>
                  </div>
                  <p className="text-[12.5px] text-mute leading-relaxed mb-3">{t(s.desc)}</p>
                  <Link href={s.href} className="text-brand text-[12.5px] font-semibold hover:underline">{t(s.cta)}</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-3">{t("buyer_center_new_user_guide.faq_heading")}</b>
            <div className="space-y-2">
              {FAQS.map((f, i) => (
                <details key={i} className="border border-line rounded group" open={i === 0}>
                  <summary className="px-4 py-3 cursor-pointer text-[13px] font-semibold text-ink list-none flex justify-between items-center hover:bg-[#FAFBFC]">
                    <span>{t(f.q)}</span>
                    <span className="text-mute text-[16px] group-open:rotate-180 transition-transform">⌃</span>
                  </summary>
                  <div className="px-4 pb-3 text-[12.5px] text-mute leading-relaxed border-t border-line pt-3">{t(f.a)}</div>
                </details>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 max-md:grid-cols-1">
            {DOWNLOADS.map((d) => (
              <div key={d.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[28px] mb-2">{d.icon}</div>
                <b className="block text-[13px] text-ink leading-tight mb-1">{t(d.title)}</b>
                <p className="text-[11.5px] text-mute leading-snug mb-2">{t(d.desc)}</p>
                <div className="flex justify-between items-center pt-2 border-t border-line">
                  <span className="text-[10.5px] text-mute">{d.size}</span>
                  <button className="text-brand text-[11.5px] font-semibold hover:underline">{t("buyer_center_new_user_guide.download_btn")}</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand-dark text-white rounded p-5 flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start">
            <div>
              <b className="block text-[16px] mb-1">{t("buyer_center_new_user_guide.support_title")}</b>
              <p className="text-[12.5px] opacity-90">{t("buyer_center_new_user_guide.support_desc")}</p>
            </div>
            <Link href="/buyer-center/contact" className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[13px] hover:opacity-90 whitespace-nowrap">{t("buyer_center_new_user_guide.contact_btn")}</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "New Buyer Guide — Buyer Center" };
