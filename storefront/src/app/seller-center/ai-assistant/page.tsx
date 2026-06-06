import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";
import { getT } from "@/lib/t";

const CAPS = [
  { icon: "📨", title: "seller_center_ai_assistant.cap_rfq_title", desc: "seller_center_ai_assistant.cap_rfq_desc" },
  { icon: "🌐", title: "seller_center_ai_assistant.cap_translate_title", desc: "seller_center_ai_assistant.cap_translate_desc" },
  { icon: "💲", title: "seller_center_ai_assistant.cap_pricing_title", desc: "seller_center_ai_assistant.cap_pricing_desc" },
  { icon: "🔍", title: "seller_center_ai_assistant.cap_competitor_title", desc: "seller_center_ai_assistant.cap_competitor_desc" },
  { icon: "📝", title: "seller_center_ai_assistant.cap_description_title", desc: "seller_center_ai_assistant.cap_description_desc" },
];

const CHAT = [
  { who: "buyer", text: "Cho hỏi sofa L-shape velvet bleu navy MOQ 30 set, FOB Quảng Châu giá nhiêu?" },
  { who: "maike", text: "[Maike đã match SKU SF-2840 trong catalog của bạn]\nGợi ý báo giá:\n• MOQ 30: $420/set FOB Quảng Châu\n• MOQ 50: $395/set (giảm 6%)\n• Thời gian giao: 25 ngày\n• Cần buyer xác nhận chiều ngả 240/280cm\n→ Bạn muốn gửi báo giá này?" },
  { who: "user", text: "OK gửi đi, thêm note tặng 5 gối tựa cho MOQ 30+" },
  { who: "maike", text: "✓ Đã gửi PI #PI-9145 cho buyer Trần Văn A (Hà Nội).\nBuyer đã đọc lúc 14:23 (cách đây 2 phút).\nDự đoán probability ký: 68% — buyer thường ký trong 8-12 giờ với deal velvet sofa." },
];

const FAQ = [
  { q: "seller_center_ai_assistant.faq_q1", a: "seller_center_ai_assistant.faq_a1" },
  { q: "seller_center_ai_assistant.faq_q2", a: "seller_center_ai_assistant.faq_a2" },
  { q: "seller_center_ai_assistant.faq_q3", a: "seller_center_ai_assistant.faq_a3" },
  { q: "seller_center_ai_assistant.faq_q4", a: "seller_center_ai_assistant.faq_a4" },
  { q: "seller_center_ai_assistant.faq_q5", a: "seller_center_ai_assistant.faq_a5" },
];

export default async function AiAssistantPage() {
  const t = await getT();
  return (
    <>
      <Breadcrumb trail={[{ label: t("seller_center_ai_assistant.breadcrumb_home"), href: "/" }, { label: t("seller_center_ai_assistant.breadcrumb_seller"), href: "/seller-center" }, { label: t("seller_center_ai_assistant.breadcrumb_current") }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/ai-assistant" />
        <div>
          <div className="bg-gradient-to-br from-brand-dark to-accent text-white rounded p-6 mb-4">
            <div className="inline-block bg-white text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🤖 MAIKE AI ASSISTANT</div>
            <h1 className="text-[26px] font-bold leading-tight">{t("seller_center_ai_assistant.hero_title")}</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              {t("seller_center_ai_assistant.hero_desc")}
            </p>
            <div className="flex gap-3 mt-4 max-md:flex-col">
              <button className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[12.5px]">{t("seller_center_ai_assistant.hero_btn_enable")}</button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-semibold text-[12.5px] border border-white/30">{t("seller_center_ai_assistant.hero_btn_demo")}</button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3 mb-4 max-md:grid-cols-1">
            {CAPS.map((c) => (
              <div key={c.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[26px] mb-2">{c.icon}</div>
                <b className="block text-[12.5px] text-ink mb-1">{t(c.title)}</b>
                <p className="text-[11px] text-mute leading-relaxed">{t(c.desc)}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-4">
              <b className="block text-[14px] text-ink mb-3">{t("seller_center_ai_assistant.demo_title")}</b>
              <div className="bg-[#F5F7FA] rounded p-3 space-y-2 max-h-[420px] overflow-y-auto">
                {CHAT.map((c, i) => (
                  <div key={i} className={`flex ${c.who === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-md p-2.5 text-[12px] leading-relaxed whitespace-pre-line ${
                      c.who === "buyer" ? "bg-white border border-line text-ink" :
                      c.who === "maike" ? "bg-accent/10 border border-accent text-ink" :
                      "bg-brand text-white"
                    }`}>
                      <span className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                        c.who === "buyer" ? "text-mute" :
                        c.who === "maike" ? "text-accent" :
                        "text-white/80"
                      }`}>
                        {c.who === "buyer" ? "Buyer · Trần Văn A" : c.who === "maike" ? "🤖 Maike" : "Bạn"}
                      </span>
                      {c.text}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10.5px] text-mute mt-2 text-center">{t("seller_center_ai_assistant.demo_note")}</p>
            </div>

            <div className="bg-paper border border-line rounded p-5 flex flex-col">
              <b className="block text-[14px] text-ink mb-3">{t("seller_center_ai_assistant.pricing_title")}</b>
              <div className="grid grid-cols-1 gap-3 flex-1">
                <div className="border-2 border-gold rounded p-4 bg-gold/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <b className="text-[14px] text-ink">{t("seller_center_ai_assistant.pricing_gold_title")}</b>
                      <span className="text-[11px] text-mute block">{t("seller_center_ai_assistant.pricing_gold_sub")}</span>
                    </div>
                    <span className="bg-gold text-brand-dark text-[10px] font-bold px-2 py-0.5 rounded-sm">{t("seller_center_ai_assistant.pricing_gold_badge")}</span>
                  </div>
                  <p className="text-[11.5px] text-mute mt-2">{t("seller_center_ai_assistant.pricing_gold_desc")}</p>
                </div>
                <div className="border border-line rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <b className="text-[14px] text-ink">{t("seller_center_ai_assistant.pricing_standalone_title")}</b>
                      <span className="text-[11px] text-mute block">{t("seller_center_ai_assistant.pricing_standalone_sub")}</span>
                    </div>
                    <span className="text-[16px] font-extrabold text-accent">$29<small className="text-[11px] text-mute font-normal">/tháng</small></span>
                  </div>
                  <p className="text-[11.5px] text-mute mt-2">{t("seller_center_ai_assistant.pricing_standalone_desc")}</p>
                </div>
                <div className="border border-line rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <b className="text-[14px] text-ink">{t("seller_center_ai_assistant.pricing_diamond_title")}</b>
                      <span className="text-[11px] text-mute block">{t("seller_center_ai_assistant.pricing_diamond_sub")}</span>
                    </div>
                    <span className="text-[14px] font-extrabold text-brand">+$200<small className="text-[11px] text-mute font-normal">/tháng</small></span>
                  </div>
                  <p className="text-[11.5px] text-mute mt-2">{t("seller_center_ai_assistant.pricing_diamond_desc")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">{t("seller_center_ai_assistant.faq_section_title")}</b>
            <div className="space-y-2">
              {FAQ.map((f, i) => (
                <details key={i} className="border border-line rounded group">
                  <summary className="flex justify-between items-center p-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-[#FAFBFC]">
                    <b className="text-[12.5px] text-ink">{t(f.q)}</b>
                    <span className="text-[12px] text-mute group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="text-[12px] text-mute leading-relaxed px-3 pb-3 border-t border-line pt-2">{t(f.a)}</p>
                </details>
              ))}
            </div>
          </div>

          <Link href="/seller-center/gold-member" className="block bg-accent text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">{t("seller_center_ai_assistant.cta_title")}</b>
            <p className="text-[12.5px] opacity-90">{t("seller_center_ai_assistant.cta_desc")}</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Trợ lý AI Maike — Seller Center" };
