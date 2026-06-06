import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";
import { getT } from "@/lib/t";

const RECENT_RFQS = [
  { id: "RFQ-8421", title: "buying_request.rfq_8421", time: "buying_request.time_12min", quotes: 7 },
  { id: "RFQ-8417", title: "buying_request.rfq_8417", time: "buying_request.time_45min", quotes: 5 },
  { id: "RFQ-8412", title: "buying_request.rfq_8412", time: "buying_request.time_2h", quotes: 9 },
  { id: "RFQ-8408", title: "buying_request.rfq_8408", time: "buying_request.time_3h", quotes: 12 },
  { id: "RFQ-8401", title: "buying_request.rfq_8401", time: "buying_request.time_5h", quotes: 4 },
];

export default async function BuyingRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; qty?: string; desc?: string }>;
}) {
  const sp = await searchParams;
  const t = await getT();

  return (
    <>
      <Breadcrumb trail={[{ label: t("buying_request.bc_home"), href: "/" }, { label: t("buying_request.bc_rfq") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[180px] bg-brand-dark">
          <img src="/img/rfq-hero.jpg?v=6" alt="" className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 px-8 py-6 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
            <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">{t("buying_request.hero_badge")}</span>
            <h1 className="text-[30px] font-extrabold leading-tight max-md:text-[22px]">{t("buying_request.hero_title")}</h1>
            <p className="text-[13.5px] opacity-90 mt-1">{t("buying_request.hero_desc")}</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-5 grid grid-cols-[1fr_340px] gap-5 max-md:grid-cols-1 mb-7">
        {/* Form */}
        <form action="/buying-request" method="get" className="bg-paper border border-line rounded p-5">
          <h2 className="text-[18px] font-bold text-ink mb-4">{t("buying_request.form_title")}</h2>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("buying_request.label_product")} <span className="text-accent">*</span></label>
              <input name="q" defaultValue={sp.q ?? ""} placeholder={t("buying_request.ph_product")} className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("buying_request.label_category")}</label>
              <select name="category" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                <option value="">{t("buying_request.opt_select_category")}</option>
                {NAV_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("buying_request.label_qty")} <span className="text-accent">*</span></label>
              <input name="qty" defaultValue={sp.qty ?? ""} placeholder={t("buying_request.ph_qty")} className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
            </div>
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("buying_request.label_desc")}</label>
              <textarea name="desc" defaultValue={sp.desc ?? ""} rows={5} placeholder={t("buying_request.ph_desc")} className="w-full px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand resize-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("buying_request.label_ref_images")}</label>
              <div className="border-2 border-dashed border-line rounded p-4 text-center text-[12.5px] text-mute hover:border-brand cursor-pointer">
                📎 Drag &amp; drop images or <a className="text-brand underline">{t("buying_request.dropzone_choose")}</a>{t("buying_request.dropzone_hint_after")}
              </div>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("buying_request.label_dest_port")}</label>
              <select name="port" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                <option>{t("buying_request.opt_port_catlai")}</option>
                <option>{t("buying_request.opt_port_haiphong")}</option>
                <option>{t("buying_request.opt_port_danang")}</option>
                <option>{t("buying_request.opt_port_ddp")}</option>
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("buying_request.label_budget")}</label>
              <select name="budget" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                <option>{t("buying_request.opt_budget_flexible")}</option>
                <option>{t("buying_request.opt_budget_under10")}</option>
                <option>{t("buying_request.opt_budget_10_50")}</option>
                <option>{t("buying_request.opt_budget_50_200")}</option>
                <option>{t("buying_request.opt_budget_over200")}</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">{t("buying_request.label_urgency")}</label>
              <div className="flex gap-3 flex-wrap text-[12.5px]">
                {["buying_request.urgency_standard", "buying_request.urgency_fast", "buying_request.urgency_urgent"].map((u, i) => (
                  <label key={u} className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-sm cursor-pointer hover:border-brand">
                    <input type="radio" name="urgency" defaultChecked={i === 0} className="accent-brand" /> {t(u)}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-line flex gap-3 items-center">
            <button type="submit" className="px-7 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90">{t("buying_request.btn_send")}</button>
            <span className="text-[12px] text-mute">{t("buying_request.note_free")}</span>
          </div>
          {sp.q && (
            <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded text-[12.5px] text-success">
              {t("buying_request.sent_success")}
            </div>
          )}
        </form>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[14px] font-bold text-ink mb-3">{t("buying_request.process_title")}</b>
            {[
              { n: 1, t: t("buying_request.step1_t"), d: t("buying_request.step1_d") },
              { n: 2, t: t("buying_request.step2_t"), d: t("buying_request.step2_d") },
              { n: 3, t: t("buying_request.step3_t"), d: t("buying_request.step3_d") },
            ].map((s) => (
              <div key={s.n} className="flex gap-3 mb-3 last:mb-0">
                <div className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0">{s.n}</div>
                <div>
                  <b className="block text-[13px] text-ink">{s.t}</b>
                  <p className="text-[11.5px] text-mute leading-snug">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-bold text-ink mb-2">{t("buying_request.promise_title")}</b>
            <ul className="text-[12px] text-mute space-y-1.5">
              <li>{t("buying_request.promise_1")}</li>
              <li>{t("buying_request.promise_2")}</li>
              <li>{t("buying_request.promise_3")}</li>
              <li>{t("buying_request.promise_4")}</li>
            </ul>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-bold text-ink mb-2">{t("buying_request.recent_title")}</b>
            <div className="space-y-2.5 text-[11.5px]">
              {RECENT_RFQS.map((r) => (
                <div key={r.id} className="border-b border-dashed border-line pb-2 last:border-0">
                  <div className="flex justify-between text-[10.5px] text-mute mb-0.5">
                    <span>{r.id}</span>
                    <span>{t(r.time)}</span>
                  </div>
                  <b className="block text-[12px] text-ink leading-snug mb-0.5">{t(r.title)}</b>
                  <span className="text-success text-[11px]">✓ {r.quotes} {t("buying_request.quotes_received_suffix")}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export const metadata = { title: "Send a Request for Quotation — Huayuesc" };
