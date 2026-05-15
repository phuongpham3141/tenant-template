import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const CAPS = [
  { icon: "📨", title: "Tự động trả lời RFQ", desc: "Maike đọc RFQ, match với catalog của bạn, tạo báo giá draft trong < 60 giây. Bạn chỉ cần review + gửi." },
  { icon: "🌐", title: "Dịch chat realtime VN ↔ CN", desc: "Buyer Việt Nam gõ tiếng Việt, bạn đọc tiếng Trung. Bạn trả tiếng Trung, buyer thấy tiếng Việt. Không cần phiên dịch." },
  { icon: "💲", title: "Đề xuất pricing thông minh", desc: "Phân tích giá đối thủ + lịch sử conversion của bạn → gợi ý FOB tối ưu để vừa thắng deal vừa giữ margin." },
  { icon: "🔍", title: "Phân tích đối thủ ngành", desc: "Theo dõi 200+ NCC cùng ngành — pricing, promotions, ratings, top SKU. Bảng so sánh hàng tuần." },
  { icon: "📝", title: "Tạo product description", desc: "Tự viết tiêu đề SEO + bullet points + spec sheet song ngữ VN-CN. Tối ưu cho thuật toán tìm kiếm Cybersilkroads." },
];

const CHAT = [
  { who: "buyer", text: "Cho hỏi sofa L-shape velvet bleu navy MOQ 30 set, FOB Quảng Châu giá nhiêu?" },
  { who: "maike", text: "[Maike đã match SKU SF-2840 trong catalog của bạn]\nGợi ý báo giá:\n• MOQ 30: $420/set FOB Quảng Châu\n• MOQ 50: $395/set (giảm 6%)\n• Thời gian giao: 25 ngày\n• Cần buyer xác nhận chiều ngả 240/280cm\n→ Bạn muốn gửi báo giá này?" },
  { who: "user", text: "OK gửi đi, thêm note tặng 5 gối tựa cho MOQ 30+" },
  { who: "maike", text: "✓ Đã gửi PI #PI-9145 cho buyer Trần Văn A (Hà Nội).\nBuyer đã đọc lúc 14:23 (cách đây 2 phút).\nDự đoán probability ký: 68% — buyer thường ký trong 8-12 giờ với deal velvet sofa." },
];

const FAQ = [
  { q: "Maike có thay thế nhân viên sales của tôi không?", a: "Không — Maike là trợ lý. Tự động xử lý 70% việc lặp lại (báo giá tiêu chuẩn, dịch chat, FAQ buyer), giúp sales tập trung vào deal lớn và quan hệ khách hàng. Hầu hết NCC dùng Maike vẫn giữ nguyên team — nhưng productivity tăng 2.5×." },
  { q: "Maike dịch có chính xác không? Có dịch sai gây hiểu lầm?", a: "Maike dùng model tinh chỉnh chuyên ngữ pháp B2B XNK (dùng dữ liệu 12 triệu chat MIC + 4 triệu PI). Độ chính xác đạt 96.8% với cặp Trung-Việt. Câu phức tạp / số liệu quan trọng đều có cảnh báo 'Cần review thủ công'." },
  { q: "Dữ liệu báo giá của tôi có bị Maike chia sẻ với NCC khác?", a: "Tuyệt đối không. Pricing & catalog của bạn được isolate — Maike chỉ học pattern chung của ngành (anonymized). NCC khác không thể truy vấn giá hay SKU của bạn qua Maike." },
  { q: "Tôi có thể dạy Maike phong cách viết riêng của công ty?", a: "Có — gói Kim cương cho phép Đào tạo Tùy chỉnh. Upload 50-100 báo giá mẫu của bạn, Maike sẽ học tone (formal/casual), template cố định, format ưu thích. Setup trong 2-3 ngày." },
  { q: "Maike có hỗ trợ ngôn ngữ khác ngoài VN-CN?", a: "Có. Roadmap 2026: Anh, Indo, Thái, Mã Lai. Hiện tại VN-CN ổn định nhất, dùng cho 92% RFQ trên Cybersilkroads. Tiếng Anh đang beta — bạn có thể bật trong Settings." },
];

export default function AiAssistantPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực nhà bán", href: "/seller-center" }, { label: "Trợ lý AI Maike" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/ai-assistant" />
        <div>
          <div className="bg-gradient-to-br from-brand-dark to-accent text-white rounded p-6 mb-4">
            <div className="inline-block bg-white text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🤖 MAIKE AI ASSISTANT</div>
            <h1 className="text-[26px] font-bold leading-tight">Maike — Trợ lý AI cho nhà cung cấp</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              Maike (麦可) là AI chuyên ngành B2B XNK — train trên 12M chat lịch sử Made-in-China + 4M proforma invoice. Trả lời RFQ trong 60 giây, dịch chat VN-CN realtime, gợi ý pricing thông minh. Miễn phí với gói Vàng.
            </p>
            <div className="flex gap-3 mt-4 max-md:flex-col">
              <button className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[12.5px]">Bật Maike (Free với Gold)</button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-semibold text-[12.5px] border border-white/30">Xem demo (90 giây)</button>
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
              <b className="block text-[14px] text-ink mb-3">💬 Demo: Maike xử lý RFQ thực tế</b>
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
              <p className="text-[10.5px] text-mute mt-2 text-center">Demo mock — đăng ký để trải nghiệm thực tế trên dữ liệu của bạn.</p>
            </div>

            <div className="bg-paper border border-line rounded p-5 flex flex-col">
              <b className="block text-[14px] text-ink mb-3">💰 Pricing</b>
              <div className="grid grid-cols-1 gap-3 flex-1">
                <div className="border-2 border-gold rounded p-4 bg-gold/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <b className="text-[14px] text-ink">Bundled với Gold Member</b>
                      <span className="text-[11px] text-mute block">Tất cả 5 năng lực · Không giới hạn quote</span>
                    </div>
                    <span className="bg-gold text-brand-dark text-[10px] font-bold px-2 py-0.5 rounded-sm">MIỄN PHÍ</span>
                  </div>
                  <p className="text-[11.5px] text-mute mt-2">Đã bao gồm trong $2,980/năm Gold Membership. Khuyến nghị cho mọi NCC nghiêm túc.</p>
                </div>
                <div className="border border-line rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <b className="text-[14px] text-ink">Standalone Maike</b>
                      <span className="text-[11px] text-mute block">Cho NCC chưa muốn Gold</span>
                    </div>
                    <span className="text-[16px] font-extrabold text-accent">$29<small className="text-[11px] text-mute font-normal">/tháng</small></span>
                  </div>
                  <p className="text-[11.5px] text-mute mt-2">Giới hạn 200 RFQ/tháng. Bypass khi join Gold.</p>
                </div>
                <div className="border border-line rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <b className="text-[14px] text-ink">Đào tạo Tùy chỉnh Kim cương</b>
                      <span className="text-[11px] text-mute block">Train tone / template riêng</span>
                    </div>
                    <span className="text-[14px] font-extrabold text-brand">+$200<small className="text-[11px] text-mute font-normal">/tháng</small></span>
                  </div>
                  <p className="text-[11.5px] text-mute mt-2">Setup 2-3 ngày + 50-100 báo giá mẫu của bạn.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">❓ FAQ về Maike</b>
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
            <b className="block text-[18px] mb-1">🤖 Bật Maike — giảm 70% thời gian xử lý RFQ</b>
            <p className="text-[12.5px] opacity-90">Đăng ký Gold để dùng Maike free, hoặc thử standalone $29/tháng.</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Trợ lý AI Maike — Seller Center" };
