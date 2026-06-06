import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { NAV_CATEGORIES } from "@/data/home";
import { getT } from "@/lib/t";

const TIPS = [
  { icon: "📐", t: "buyer_center_post_rfq.tip_specs_title", d: "buyer_center_post_rfq.tip_specs_desc" },
  { icon: "🖼", t: "buyer_center_post_rfq.tip_photos_title", d: "buyer_center_post_rfq.tip_photos_desc" },
  { icon: "📅", t: "buyer_center_post_rfq.tip_deadline_title", d: "buyer_center_post_rfq.tip_deadline_desc" },
  { icon: "💵", t: "buyer_center_post_rfq.tip_budget_title", d: "buyer_center_post_rfq.tip_budget_desc" },
];

export default async function PostRfqPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; qty?: string; desc?: string }>;
}) {
  const sp = await searchParams;
  const t = await getT();

  return (
    <>
      <Breadcrumb trail={[{ label: t("buyer_center_post_rfq.crumb_home"), href: "/" }, { label: t("buyer_center_post_rfq.crumb_buyer_center"), href: "/buyer-center" }, { label: t("buyer_center_post_rfq.crumb_post_rfq") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/post-rfq" />
        <div>
          <div className="bg-brand-dark text-white rounded p-5 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">{t("buyer_center_post_rfq.badge_rfq")}</div>
            <h1 className="text-[22px] font-bold leading-tight">{t("buyer_center_post_rfq.heading")}</h1>
            <p className="text-[13px] opacity-90 mt-2 leading-relaxed">
              {t("buyer_center_post_rfq.intro")}
            </p>
          </div>

          <div className="grid grid-cols-[1fr_280px] gap-4 max-md:grid-cols-1">
            <form action="/buying-request" method="get" className="bg-paper border border-line rounded p-5">
              <h2 className="text-[16px] font-bold text-ink mb-4">{t("buyer_center_post_rfq.form_title")}</h2>
              <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">{t("buyer_center_post_rfq.label_product")} <span className="text-accent">*</span></label>
                  <input name="q" defaultValue={sp.q ?? ""} placeholder={t("buyer_center_post_rfq.ph_product")} className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">{t("buyer_center_post_rfq.label_category")}</label>
                  <select name="category" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white">
                    <option value="">{t("buyer_center_post_rfq.option_select_category")}</option>
                    {NAV_CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">{t("buyer_center_post_rfq.label_quantity")} <span className="text-accent">*</span></label>
                  <input name="qty" defaultValue={sp.qty ?? ""} placeholder={t("buyer_center_post_rfq.ph_quantity")} className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">{t("buyer_center_post_rfq.label_description")}</label>
                  <textarea name="desc" defaultValue={sp.desc ?? ""} rows={5} placeholder={t("buyer_center_post_rfq.ph_description")} className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand resize-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">{t("buyer_center_post_rfq.label_photos")}</label>
                  <div className="border-2 border-dashed border-line rounded p-3 text-center text-[12px] text-mute hover:border-brand cursor-pointer">
                    📎 {t("buyer_center_post_rfq.dropzone_text")} <a className="text-brand underline">{t("buyer_center_post_rfq.dropzone_link")}</a> {t("buyer_center_post_rfq.dropzone_limit")}
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">{t("buyer_center_post_rfq.label_port")}</label>
                  <select name="port" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white">
                    <option>Cat Lai – HCM</option>
                    <option>Hai Phong – HP</option>
                    <option>Da Nang – DN</option>
                    <option>{t("buyer_center_post_rfq.option_port_ddp")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">{t("buyer_center_post_rfq.label_budget")}</label>
                  <select name="budget" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white">
                    <option>{t("buyer_center_post_rfq.option_budget_flexible")}</option>
                    <option>Under $10</option>
                    <option>$10 – $50</option>
                    <option>$50 – $200</option>
                    <option>Over $200</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">{t("buyer_center_post_rfq.label_urgency")}</label>
                  <div className="flex gap-2 flex-wrap text-[12px]">
                    {["buyer_center_post_rfq.urgency_standard", "buyer_center_post_rfq.urgency_fast", "buyer_center_post_rfq.urgency_urgent"].map((u, i) => (
                      <label key={u} className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-sm cursor-pointer hover:border-brand">
                        <input type="radio" name="urgency" defaultChecked={i === 0} className="accent-brand" /> {t(u)}
                      </label>
                    ))}
                  </div>
                </div>
                <label className="col-span-2 flex items-center gap-2 text-[12px] text-mute pt-2">
                  <input type="checkbox" defaultChecked className="accent-brand" /> {t("buyer_center_post_rfq.trade_assurance_label")} <b className="text-ink">Trade Assurance</b> {t("buyer_center_post_rfq.trade_assurance_label2")}
                </label>
              </div>
              <div className="mt-4 pt-3 border-t border-line flex gap-3 items-center max-md:flex-col max-md:items-start">
                <button type="submit" className="px-6 py-2.5 bg-accent text-white rounded-sm font-bold text-[13px] hover:opacity-90">{t("buyer_center_post_rfq.btn_send")}</button>
                <span className="text-[11.5px] text-mute">{t("buyer_center_post_rfq.free_note")}</span>
              </div>
              {sp.q && (
                <div className="mt-3 p-3 bg-success/10 border border-success/30 rounded text-[12px] text-success">
                  {t("buyer_center_post_rfq.sent_note")}
                </div>
              )}
            </form>

            <aside className="space-y-3">
              <div className="bg-paper border border-line rounded p-4">
                <b className="block text-[13px] font-bold text-ink mb-3">{t("buyer_center_post_rfq.tips_heading")}</b>
                <div className="space-y-3">
                  {TIPS.map((tip) => (
                    <div key={tip.t} className="flex gap-2.5">
                      <span className="text-[18px] flex-shrink-0">{tip.icon}</span>
                      <div>
                        <b className="block text-[12px] text-ink">{t(tip.t)}</b>
                        <p className="text-[11px] text-mute leading-snug">{t(tip.d)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-success/5 border border-success/30 rounded p-4">
                <b className="block text-[13px] text-success mb-2">{t("buyer_center_post_rfq.promise_heading")}</b>
                <ul className="text-[11.5px] text-ink space-y-1">
                  <li>{t("buyer_center_post_rfq.promise_1")}</li>
                  <li>{t("buyer_center_post_rfq.promise_2")}</li>
                  <li>{t("buyer_center_post_rfq.promise_3")}</li>
                  <li>{t("buyer_center_post_rfq.promise_4")}</li>
                </ul>
              </div>

              <Link href="/buyer-center/secured-trading" className="block bg-brand text-white rounded p-3 hover:opacity-95 text-center">
                <b className="block text-[12.5px]">{t("buyer_center_post_rfq.ta_card_title")}</b>
                <span className="text-[10.5px] opacity-90">{t("buyer_center_post_rfq.ta_card_sub")}</span>
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Post an RFQ — Buyer Center" };
