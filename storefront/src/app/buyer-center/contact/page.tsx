import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { getT } from "@/lib/t";

const CHANNELS = [
  {
    icon: "📧",
    title: "buyer_center_contact.channel_email_title",
    primary: "buyer@alibabavn.com",
    secondary: "support@alibabavn.com",
    hours: "buyer_center_contact.channel_email_hours",
    color: "bg-brand/10 text-brand",
  },
  {
    icon: "💬",
    title: "buyer_center_contact.channel_chat_title",
    primary: "Zalo: Huayuesc-Buyer",
    secondary: "WeChat: Huayuesc_Service",
    hours: "buyer_center_contact.channel_chat_hours",
    color: "bg-success/10 text-success",
  },
];

const OFFICES = [
  {
    flag: "🇻🇳",
    city: "buyer_center_contact.office_hanoi_city",
    address: "18th Floor, Lotte Center, 54 Lieu Giai, Ba Dinh, Hanoi",
    phone: "",
    email: "hanoi@alibabavn.com",
    hours: "buyer_center_contact.office_hanoi_hours",
  },
  {
    flag: "🇻🇳",
    city: "buyer_center_contact.office_hcm_city",
    address: "12th Floor, Bitexco Financial Tower, 2 Hai Trieu, District 1, Ho Chi Minh City",
    phone: "",
    email: "hcm@alibabavn.com",
    hours: "buyer_center_contact.office_hanoi_hours",
  },
  {
    flag: "🇨🇳",
    city: "buyer_center_contact.office_guangzhou_city",
    address: "Room 1808, R&F Center, No.10 Huaxia Rd, Tianhe District, Guangzhou",
    phone: "",
    email: "guangzhou@alibabavn.com",
    hours: "buyer_center_contact.office_guangzhou_hours",
  },
  {
    flag: "🇨🇳",
    city: "buyer_center_contact.office_foshan_city",
    address: "5th Floor, China Ceramics City, Chancheng District, Foshan, Guangdong",
    phone: "",
    email: "foshan@alibabavn.com",
    hours: "buyer_center_contact.office_guangzhou_hours",
  },
];

const SUBJECTS = [
  "buyer_center_contact.subject_general",
  "buyer_center_contact.subject_rfq",
  "buyer_center_contact.subject_order",
  "buyer_center_contact.subject_quality",
  "buyer_center_contact.subject_audit",
  "buyer_center_contact.subject_qc",
  "buyer_center_contact.subject_payment",
  "buyer_center_contact.subject_bug",
  "buyer_center_contact.subject_feedback",
];

export default async function ContactPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("buyer_center_contact.crumb_home"), href: "/" }, { label: t("buyer_center_contact.crumb_buyer_center"), href: "/buyer-center" }, { label: t("buyer_center_contact.crumb_contact") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/contact" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">{t("buyer_center_contact.badge")}</div>
            <h1 className="text-[22px] font-bold text-ink">{t("buyer_center_contact.heading")}</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              {t("buyer_center_contact.intro")}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 max-md:grid-cols-1">
            {CHANNELS.map((c) => (
              <div key={c.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className={`inline-flex w-12 h-12 rounded-full items-center justify-center text-[22px] mb-3 ${c.color}`}>{c.icon}</div>
                <b className="block text-[14px] text-ink mb-2">{t(c.title)}</b>
                <div className="text-[13px] text-brand font-semibold">{c.primary}</div>
                <div className="text-[12.5px] text-mute mb-2">{c.secondary}</div>
                <div className="text-[11px] text-mute pt-2 border-t border-line">{t(c.hours)}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            {OFFICES.map((o) => (
              <div key={o.city} className="bg-paper border border-line rounded p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[20px]">{o.flag}</span>
                  <b className="text-[14px] text-ink">{t(o.city)}</b>
                </div>
                <div className="text-[12.5px] text-ink mb-1">📍 {o.address}</div>
                <div className="text-[12.5px] text-mute mb-1">✉️ {o.email}</div>
                <div className="text-[11.5px] text-mute pt-2 border-t border-line mt-2">🕘 {t(o.hours)}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#F5F7FA] border border-line rounded p-3 mb-4 text-center">
            <div className="aspect-[3/1] bg-paper border border-dashed border-line rounded flex items-center justify-center text-mute text-[13px]">
              {t("buyer_center_contact.map_caption")}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-1">{t("buyer_center_contact.form_title")}</b>
            <p className="text-[12px] text-mute mb-4">{t("buyer_center_contact.form_subtitle")}</p>
            <form className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              <input placeholder={t("buyer_center_contact.ph_fullname")} className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <input placeholder={t("buyer_center_contact.ph_email")} type="email" className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <input placeholder={t("buyer_center_contact.ph_phone")} className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <input placeholder={t("buyer_center_contact.ph_company")} className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <select className="col-span-2 px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white outline-none focus:border-brand">
                <option value="">{t("buyer_center_contact.opt_subject")}</option>
                {SUBJECTS.map((s) => <option key={s}>{t(s)}</option>)}
              </select>
              <textarea placeholder={t("buyer_center_contact.ph_message")} rows={5} className="col-span-2 px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand resize-none" />
              <label className="col-span-2 flex items-center gap-2 text-[12px] text-mute">
                <input type="checkbox" className="accent-brand" /> {t("buyer_center_contact.consent")}
              </label>
              <button type="button" className="col-span-2 px-5 py-3 bg-accent text-white rounded-sm font-bold text-[13.5px] hover:opacity-90 max-md:col-span-1">{t("buyer_center_contact.btn_send")}</button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link href="/buyer-center/contact?subject=bug" className="bg-paper border border-line rounded p-4 hover:border-accent">
              <b className="block text-[13px] text-ink mb-1">{t("buyer_center_contact.report_title")}</b>
              <p className="text-[11.5px] text-mute leading-snug">{t("buyer_center_contact.report_desc")}</p>
            </Link>
            <Link href="/info/cau-hoi-thuong-gap" className="bg-paper border border-line rounded p-4 hover:border-brand">
              <b className="block text-[13px] text-ink mb-1">{t("buyer_center_contact.faq_title")}</b>
              <p className="text-[11.5px] text-mute leading-snug">{t("buyer_center_contact.faq_desc")}</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Contact Us — Buyer Center" };
