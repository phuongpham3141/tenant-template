import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const CAPS = [
  { icon: "📨", title: "Automatic RFQ replies", desc: "Maike reads the RFQ, matches it to your catalog, and drafts a quote in under 60 seconds. You just review and send." },
  { icon: "🌐", title: "Real-time VI ↔ ZH chat translation", desc: "Vietnamese buyers type in Vietnamese, you read Chinese. You reply in Chinese, the buyer sees Vietnamese. No interpreter needed." },
  { icon: "💲", title: "Smart pricing suggestions", desc: "Analyzes competitor prices + your conversion history to suggest the optimal FOB price — winning the deal while protecting your margin." },
  { icon: "🔍", title: "Industry competitor analysis", desc: "Tracks 200+ suppliers in your industry — pricing, promotions, ratings, top SKUs. Weekly comparison table." },
  { icon: "📝", title: "Product description generation", desc: "Auto-writes SEO titles + bullet points + a bilingual VI-ZH spec sheet. Optimized for the Huayuesc search algorithm." },
];

const CHAT = [
  { who: "buyer", text: "Quick question — navy-blue velvet L-shape sofa, MOQ 30 sets, what's the FOB Guangzhou price?" },
  { who: "maike", text: "[Maike matched SKU SF-2840 in your catalog]\nSuggested quote:\n• MOQ 30: $420/set FOB Guangzhou\n• MOQ 50: $395/set (6% off)\n• Lead time: 25 days\n• Buyer needs to confirm the 240/280cm chaise direction\n→ Want to send this quote?" },
  { who: "user", text: "OK, send it, and add a note offering 5 free throw pillows for MOQ 30+" },
  { who: "maike", text: "✓ Sent PI #PI-9145 to buyer Tran Van A (Hanoi).\nBuyer read it at 14:23 (2 minutes ago).\nPredicted probability of signing: 68% — buyers usually sign within 8–12 hours on velvet sofa deals." },
];

const FAQ = [
  { q: "Will Maike replace my sales staff?", a: "No — Maike is an assistant. It automatically handles 70% of repetitive work (standard quotes, chat translation, buyer FAQs), freeing your sales team to focus on big deals and customer relationships. Most suppliers using Maike keep their team intact — but productivity rises 2.5×." },
  { q: "Is Maike's translation accurate? Could a mistranslation cause a misunderstanding?", a: "Maike uses a model fine-tuned on B2B import-export grammar (trained on 12 million MIC chats + 4 million PIs). Accuracy reaches 96.8% for the Chinese-Vietnamese pair. Complex sentences and critical figures always carry a 'Manual review needed' warning." },
  { q: "Will Maike share my quote data with other suppliers?", a: "Absolutely not. Your pricing and catalog are isolated — Maike only learns general (anonymized) industry patterns. Other suppliers cannot query your prices or SKUs through Maike." },
  { q: "Can I teach Maike my company's own writing style?", a: "Yes — the Diamond plan includes Custom Training. Upload 50–100 of your sample quotes and Maike learns your tone (formal/casual), fixed templates, and preferred format. Setup takes 2–3 days." },
  { q: "Does Maike support languages other than VI-ZH?", a: "Yes. The 2026 roadmap: English, Indonesian, Thai, and Malay. VI-ZH is the most stable today and covers 92% of RFQs on Huayuesc. English is in beta — you can enable it in Settings." },
];

export default function AiAssistantPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Seller Center", href: "/seller-center" }, { label: "Maike AI Assistant" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/ai-assistant" />
        <div>
          <div className="bg-gradient-to-br from-brand-dark to-accent text-white rounded p-6 mb-4">
            <div className="inline-block bg-white text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🤖 MAIKE AI ASSISTANT</div>
            <h1 className="text-[26px] font-bold leading-tight">Maike — the AI assistant for suppliers</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              Maike (麦可) is an AI specialized in B2B import-export — trained on 12M historical Made-in-China chats + 4M proforma invoices. Answers RFQs in 60 seconds, translates VI-ZH chats in real time, and suggests smart pricing. Free with the Gold plan.
            </p>
            <div className="flex gap-3 mt-4 max-md:flex-col">
              <button className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[12.5px]">Turn on Maike (Free with Gold)</button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-semibold text-[12.5px] border border-white/30">Watch demo (90 sec)</button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3 mb-4 max-md:grid-cols-1">
            {CAPS.map((c) => (
              <div key={c.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[26px] mb-2">{c.icon}</div>
                <b className="block text-[12.5px] text-ink mb-1">{c.title}</b>
                <p className="text-[11px] text-mute leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-4">
              <b className="block text-[14px] text-ink mb-3">💬 Demo: Maike handling a real RFQ</b>
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
                        {c.who === "buyer" ? "Buyer · Tran Van A" : c.who === "maike" ? "🤖 Maike" : "You"}
                      </span>
                      {c.text}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10.5px] text-mute mt-2 text-center">Mock demo — sign up to try it on your real data.</p>
            </div>

            <div className="bg-paper border border-line rounded p-5 flex flex-col">
              <b className="block text-[14px] text-ink mb-3">💰 Pricing</b>
              <div className="grid grid-cols-1 gap-3 flex-1">
                <div className="border-2 border-gold rounded p-4 bg-gold/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <b className="text-[14px] text-ink">Bundled with Gold Member</b>
                      <span className="text-[11px] text-mute block">All 5 capabilities · Unlimited quotes</span>
                    </div>
                    <span className="bg-gold text-brand-dark text-[10px] font-bold px-2 py-0.5 rounded-sm">FREE</span>
                  </div>
                  <p className="text-[11.5px] text-mute mt-2">Included in the $2,980/yr Gold Membership. Recommended for every serious supplier.</p>
                </div>
                <div className="border border-line rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <b className="text-[14px] text-ink">Standalone Maike</b>
                      <span className="text-[11px] text-mute block">For suppliers not yet on Gold</span>
                    </div>
                    <span className="text-[16px] font-extrabold text-accent">$29<small className="text-[11px] text-mute font-normal">/month</small></span>
                  </div>
                  <p className="text-[11.5px] text-mute mt-2">Capped at 200 RFQs/month. Removed when you join Gold.</p>
                </div>
                <div className="border border-line rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <b className="text-[14px] text-ink">Diamond Custom Training</b>
                      <span className="text-[11px] text-mute block">Train your own tone / templates</span>
                    </div>
                    <span className="text-[14px] font-extrabold text-brand">+$200<small className="text-[11px] text-mute font-normal">/month</small></span>
                  </div>
                  <p className="text-[11.5px] text-mute mt-2">2–3 day setup + 50–100 of your sample quotes.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">❓ Maike FAQ</b>
            <div className="space-y-2">
              {FAQ.map((f, i) => (
                <details key={i} className="border border-line rounded group">
                  <summary className="flex justify-between items-center p-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-[#FAFBFC]">
                    <b className="text-[12.5px] text-ink">{f.q}</b>
                    <span className="text-[12px] text-mute group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="text-[12px] text-mute leading-relaxed px-3 pb-3 border-t border-line pt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <Link href="/seller-center/gold-member" className="block bg-accent text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">🤖 Turn on Maike — cut RFQ handling time by 70%</b>
            <p className="text-[12.5px] opacity-90">Sign up for Gold to use Maike free, or try standalone at $29/month.</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Maike AI Assistant — Seller Center" };
