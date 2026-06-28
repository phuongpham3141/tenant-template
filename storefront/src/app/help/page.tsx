import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

/**
 * /help — Cybersilkroads Help Center.
 *
 * Layout structured like enterprise B2B help portals (Alibaba, MIC, AWS):
 *   - Hero with global search
 *   - Quick stats (response time, channels, languages)
 *   - 6 topic categories (3×2 grid) with sub-articles
 *   - Featured guide cards (top 4 most-read)
 *   - Comprehensive FAQ (16 Q&A organized by buyer journey stage)
 *   - Status page link + System health indicator
 *   - 4 contact channels: chat, phone, email, video call
 */

const TOPIC_CATEGORIES = [
  {
    icon: "🛒",
    title: "Tìm sản phẩm & Đặt hàng",
    desc: "RFQ, MOQ, sample order, OEM/ODM, AI matching",
    color: "var(--color-brand)",
    articles: [
      { label: "Cách gửi RFQ hiệu quả", href: "/info/find-products" },
      { label: "Hướng dẫn nhập khẩu 6 bước", href: "/info/import-guide" },
      { label: "Đặt mẫu trước khi MOQ", href: "/info/sample-orders" },
      { label: "OEM / ODM tuỳ chỉnh", href: "/info/import-guide" },
    ],
  },
  {
    icon: "💳",
    title: "Thanh toán & Bảo đảm Giao dịch",
    desc: "T/T trung gian, hoàn tiền, dispute resolution, payment methods",
    color: "var(--color-accent)",
    articles: [
      { label: "Bảo đảm Giao dịch (Trung gian) là gì?", href: "/info/payment-protection" },
      { label: "Phương thức thanh toán T/T", href: "/info/payment-protection" },
      { label: "Khiếu nại & hoàn tiền", href: "/info/disputes" },
      { label: "Tỷ giá + phí ngân hàng", href: "/info/payment-protection" },
    ],
  },
  {
    icon: "🚚",
    title: "Vận chuyển & Logistics",
    desc: "Incoterms, DDP/CIF/FOB, hải quan, thời gian giao",
    color: "#F4A261",
    articles: [
      { label: "Chính sách vận chuyển đầy đủ", href: "/info/shipping-policy" },
      { label: "Tính cước DDP nhanh", href: "/info/ddp-calculator" },
      { label: "Đường bộ qua Lạng Sơn 5-7 ngày", href: "/info/shipping-policy" },
      { label: "Theo dõi đơn realtime", href: "/info/order-tracking" },
    ],
  },
  {
    icon: "🛡",
    title: "Audit & Chất lượng",
    desc: "Quy trình kiểm định 5 bước, QC inspection, certifications",
    color: "#2A9D8F",
    articles: [
      { label: "Quy trình kiểm định 5 bước", href: "/info/audit-process" },
      { label: "Mạng lưới hiệp hội đối tác", href: "/info/network" },
      { label: "Chứng chỉ NCC: ISO, CE, RoHS", href: "/info/audit-process" },
      { label: "Báo cáo audit blockchain", href: "/info/audit-process" },
    ],
  },
  {
    icon: "👤",
    title: "Tài khoản & Bảo mật",
    desc: "Đăng ký, 2FA, KYC, settings, sub-accounts",
    color: "#8B5CF6",
    articles: [
      { label: "Hướng dẫn đăng ký Buyer", href: "/register/buyer" },
      { label: "Bật 2FA bảo vệ tài khoản", href: "/info/privacy-policy" },
      { label: "Quản lý sub-account", href: "/buyer-center" },
      { label: "Quên mật khẩu", href: "/info/quen-mat-khau" },
    ],
  },
  {
    icon: "⚖",
    title: "Pháp lý & Compliance",
    desc: "Điều khoản, bảo mật, NĐ 13/2023, Incoterms 2020",
    color: "#6B7880",
    articles: [
      { label: "Điều khoản sử dụng", href: "/info/terms-of-service" },
      { label: "Chính sách bảo mật", href: "/info/privacy-policy" },
      { label: "11 quyền theo NĐ 13/2023", href: "/info/privacy-policy" },
      { label: "Trọng tài VIAC Hà Nội", href: "/info/terms-of-service" },
    ],
  },
];

const FEATURED_GUIDES = [
  {
    icon: "🎯",
    title: "Guide cho Buyer mới — 30 ngày đầu",
    desc: "Từ đăng ký tới đơn đầu tiên: bước đi an toàn, tránh sai lầm phổ biến.",
    href: "/info/import-guide",
    readTime: "8 phút",
  },
  {
    icon: "💰",
    title: "Tiết kiệm 22% chi phí — Case study",
    desc: "Showroom Sài Gòn chuyển từ broker sang Cybersilkroads, tiết kiệm 2.7 tỷ/năm.",
    href: "/info/industry-news/case-study-showroom-sai-gon-tiet-kiem-22-percent",
    readTime: "7 phút",
  },
  {
    icon: "📦",
    title: "5 sai lầm khi đặt sample — Buyer mới cần tránh",
    desc: "Sample là bảo hiểm $200 cho đơn $20,000 — nhưng làm sai vẫn mất tiền.",
    href: "/info/industry-news/5-sai-lam-pho-bien-khi-dat-sample",
    readTime: "5 phút",
  },
  {
    icon: "📊",
    title: "Cảng Lạch Huyện vs Cát Lái — Buyer Bắc nên chọn?",
    desc: "Phân tích chi tiết cước, thời gian giao, congestion. Tiết kiệm $1,350/40HQ.",
    href: "/info/industry-news/phan-tich-cang-lach-huyen-vs-cat-lai-2026",
    readTime: "8 phút",
  },
];

const FAQ_BY_STAGE = [
  {
    stage: "Trước khi đăng ký",
    faqs: [
      {
        q: "Cybersilkroads (CSR) khác gì với Alibaba.com hay Made-in-China?",
        a: "CSR tập trung 100% vào Buyer Việt Nam: tiếng Việt support 24/7, thanh toán VND, tài khoản trung gian tại Vietcombank/BIDV, vận chuyển DDP về tận kho VN, audit on-site free cho đơn ≥$5K, hỗ trợ tranh chấp bằng tiếng Việt qua VIAC Hà Nội. Alibaba và MIC là nền tảng global, tốt cho buyer Mỹ/EU/Trung Đông nhưng không có infra/team chuyên cho thị trường VN.",
      },
      {
        q: "Phí dịch vụ Cybersilkroads là bao nhiêu?",
        a: "MIỄN PHÍ HOÀN TOÀN cho Buyer. Không phí thành viên, không phí giao dịch, không phí trung gian, không phí audit on-site (cho đơn ≥$5K). Cybersilkroads chỉ thu 5% commission từ Supplier khi giao dịch thành công. Buyer chỉ trả: giá hàng (theo PO) + cước DDP (transparent).",
      },
      {
        q: "Tôi có cần là doanh nghiệp mới đăng ký được không?",
        a: "Không bắt buộc. Cá nhân đăng ký được, có thể giao dịch tới $5,000 USD/đơn (theo Luật Phòng chống rửa tiền VN). Tuy nhiên, doanh nghiệp (có MST) có 2 lợi thế: nhập không giới hạn giá trị + khấu trừ VAT đầu vào 10%. Buyer thường xuyên (≥3 đơn/năm) khuyến nghị đăng ký doanh nghiệp.",
      },
    ],
  },
  {
    stage: "Tìm sản phẩm & Gửi RFQ",
    faqs: [
      {
        q: "Làm sao để gửi RFQ hiệu quả?",
        a: "Click 'Gửi RFQ' ở header trang chủ hoặc /buying-request. Mô tả càng chi tiết càng tốt: tên sản phẩm + kích thước + vật liệu + số lượng + target retail + OEM yêu cầu (logo, custom màu) + thời hạn. Trong 24 giờ, hệ thống AI matching gửi RFQ tới 5-10 NCC verified phù hợp. Tip: đính kèm ảnh tham khảo / sản phẩm mẫu để NCC hiểu rõ hơn.",
      },
      {
        q: "MOQ trên Cybersilkroads là bao nhiêu?",
        a: "Tùy nhà máy — phổ biến từ $500-2000 hoặc 50-100 đơn vị. Một số NCC chấp nhận MOQ thấp $200 cho Buyer mới qua chương trình audit miễn phí. CSR có 'Combine MOQ' giúp 2-3 buyer cùng ngành gộp đơn để đạt MOQ giá tốt mà mỗi bên chỉ lấy 1/3.",
      },
      {
        q: "Tôi muốn OEM/ODM theo bản vẽ của mình — có hỗ trợ không?",
        a: "Có. CSR hỗ trợ OEM (in logo, đổi màu, custom kích thước nhỏ) và ODM (thiết kế hoàn toàn theo bản vẽ kỹ thuật của Buyer). Phí mock-up sample $80-300, thời gian giao tăng 5-10 ngày. Đặt sample OEM trước khi đặt MOQ — verify khả năng tuỳ chỉnh thực tế. Toàn bộ chi phí mock-up được hoàn 100% khi đặt MOQ.",
      },
    ],
  },
  {
    stage: "Thanh toán & Bảo đảm Giao dịch",
    faqs: [
      {
        q: "Bảo đảm Giao dịch (Trung gian) hoạt động thế nào?",
        a: "Tiền cọc T/T 30% và 70% balance của Buyer được giữ trong tài khoản trung gian của CSR tại Vietcombank/BIDV (cho VND) hoặc Bank of China/HSBC (cho USD) — KHÔNG đi trực tiếp tới NCC. NCC chỉ nhận tiền sau khi: (a) Buyer xác nhận hàng đúng mô tả, hoặc (b) 14 ngày kể từ ngày giao mà Buyer không phản hồi (auto-release). Nếu hàng sai cam kết, Buyer khiếu nại trong 7 ngày → CSR điều tra → refund/đổi/bồi thường.",
      },
      {
        q: "Phương thức thanh toán nào được hỗ trợ?",
        a: "T/T (Telegraphic Transfer) — phổ biến nhất, áp dụng cho mọi đơn. L/C (Letter of Credit) — cho đơn ≥$100K, an toàn cao nhất nhưng phí cao. Online Banking quốc tế qua Wise/Payoneer — cho đơn nhỏ <$5K, phí thấp. KHÔNG hỗ trợ: PayPal (phí cao), Western Union (không trung gian), Tiền mặt (vi phạm quy định AML).",
      },
      {
        q: "Tôi muốn thanh toán bằng VND có được không?",
        a: "Có. Buyer thanh toán VND vào tài khoản Vietcombank/BIDV của CSR, CSR convert sang USD theo tỷ giá Vietcombank realtime + buffer 0.5% phòng biến động (ghi rõ trong hợp đồng). Phí ngân hàng: ~0.1-0.3% phí chuyển + $20-50 fixed. Một số đơn nhỏ (<$10K) có thể thanh toán 100% VND nội địa, không qua ngoại tệ — tiết kiệm phí ngân hàng.",
      },
    ],
  },
  {
    stage: "Vận chuyển & Hải quan",
    faqs: [
      {
        q: "Vận chuyển DDP về VN mất bao lâu?",
        a: "Thời gian giao DDP đến kho Buyer Hà Nội: (a) Đường bộ qua Lạng Sơn 5-7 ngày — nhanh nhất, phù hợp đơn nhỏ và hot trend. (b) Đường biển Foshan → Lạch Huyện → HN: 13-17 ngày tổng. (c) Đường biển Đông Quan/Thâm Quyến → Cát Lái → HN: 15-19 ngày. (d) Air freight DHL/FedEx: 2-4 ngày, $8-15/kg. Buyer chọn route tối ưu trong calculator /info/ddp-calculator.",
      },
      {
        q: "Có cần giấy phép nhập khẩu không?",
        a: "Phần lớn vật liệu xây dựng, nội thất, sanitary, đèn LED, điện gia dụng KHÔNG cần giấy phép. Cần giấy phép cho: thực phẩm chức năng, mỹ phẩm, thiết bị y tế, hoá chất, dược phẩm, sách, phương tiện. CSR tư vấn miễn phí theo HS code — email legal@cybersilkroads.com.",
      },
      {
        q: "DDP đã bao gồm thuế nhập khẩu + VAT chưa?",
        a: "RỒI. DDP all-in-one bao gồm: cước biển/đường bộ, bảo hiểm Marine 0.5%, thuế nhập khẩu (theo HS code, có ưu đãi ACFTA/RCEP), VAT 10%, phí thông quan, vận chuyển nội địa VN. Buyer chỉ ký nhận hàng tại kho. Trường hợp đặc biệt (hải quan re-classify HS, áp thuế cao hơn): CSR thông báo trước, Buyer có 7 ngày phản hồi.",
      },
    ],
  },
  {
    stage: "Sau khi nhận hàng",
    faqs: [
      {
        q: "Tôi phát hiện hàng không đúng mô tả — phải làm gì?",
        a: "Gửi khiếu nại Bảo đảm Giao dịch TRONG 7 NGÀY kể từ ngày nhận hàng. Đường dẫn: /buyer-center/orders/{order-id}/dispute. Đính kèm chứng cứ: ảnh, video unboxing, biên bản nghiệm thu. Đội Bảo đảm Giao dịch phản hồi trong 24 giờ và quyết định trong 3-5 ngày: hoàn 100%, đổi hàng, hoặc bồi thường thoả thuận. Lịch sử Q1-Q3/2025: 87% case có lợi cho Buyer.",
      },
      {
        q: "Tôi muốn đặt thêm đơn sau khi đơn đầu OK — quy trình thế nào?",
        a: "Nhanh hơn 50% so với đơn đầu! Repeat order: chọn 'Reorder' trong dashboard → CSR tự động tạo PO mới với cùng spec → Buyer chỉ cần xác nhận quantity + ngày giao. Không cần audit lại NCC (đã verified). Không cần test sample lại (đã có). Thời gian giao vẫn 5-22 ngày tuỳ route. Nhiều Buyer Việt Nam đặt 6-12 đơn/năm với 2-3 NCC chính — quy trình rất smooth.",
      },
      {
        q: "Hoá đơn VAT có được phát hành không?",
        a: "Có. CSR phát hành hoá đơn điện tử VAT 10% cho mọi đơn DDP qua hệ thống e-invoice của Bộ Tài chính (theo Nghị định 123/2020/NĐ-CP). Hoá đơn được gửi tới email Buyer trong 3 ngày kể từ ngày giao hàng. Buyer doanh nghiệp dùng hoá đơn này để khấu trừ VAT đầu vào 10% — tiết kiệm thuế đáng kể.",
      },
    ],
  },
];

const SYSTEM_STATUS = [
  { service: "Website + App", status: "Operational", uptime: "99.97%" },
  { service: "Bảo đảm Giao dịch (Trung gian)", status: "Operational", uptime: "100%" },
  { service: "AI Sourcing Matching", status: "Operational", uptime: "99.94%" },
  { service: "DDP Logistics", status: "Operational", uptime: "99.91%" },
];

const CONTACT_CHANNELS = [
  { icon: "💬", title: "Live Chat", desc: "Phản hồi <5 phút", info: "8h-22h hàng ngày", href: "#chat" },
  { icon: "📞", title: "Hotline", desc: "+84 24 1234 5678", info: "8h-18h thứ 2-7", href: "tel:+842412345678" },
  { icon: "📧", title: "Email Support", desc: "Phản hồi <6 giờ", info: "support@cybersilkroads.com", href: "mailto:support@cybersilkroads.com" },
  { icon: "📹", title: "Video Call", desc: "Đặt lịch trước", info: "1-on-1 với Quản lý tài khoản", href: "/info/contact" },
];

export default function HelpPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Trung tâm trợ giúp" }]} />

      {/* === HERO + Search ============================================== */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)" }}
      >
        <div className="max-w-[1100px] mx-auto px-4 py-12 max-md:py-7 text-center">
          <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">
            🆘 TRUNG TÂM TRỢ GIÚP · CYBERSILKROADS
          </span>
          <h1 className="text-[34px] font-extrabold leading-tight mb-3 max-md:text-[24px]">
            Chào mừng đến trung tâm trợ giúp
          </h1>
          <p className="text-[14px] opacity-90 leading-relaxed mb-5 max-md:text-[12.5px] max-w-[680px] mx-auto">
            300+ bài hướng dẫn, 80+ FAQ, support 24/7 tiếng Việt. Tìm câu trả lời ngay hoặc liên hệ trực tiếp đội Cybersilkroads tại Hà Nội + Quảng Châu.
          </p>
          <form action="/search" method="get" className="flex max-w-[640px] mx-auto bg-white rounded-md overflow-hidden shadow-lg">
            <input
              name="q"
              placeholder="Ví dụ: cách đặt RFQ, MOQ, vận chuyển DDP, Bảo đảm Giao dịch..."
              className="flex-1 px-4 py-3 outline-none text-[14px] text-ink"
            />
            <button type="submit" className="px-6 bg-accent text-white font-bold text-[13.5px] cursor-pointer hover:opacity-90">
              🔍 Tìm kiếm
            </button>
          </form>

          {/* Quick stats strip */}
          <div className="grid grid-cols-4 gap-4 mt-7 text-center max-md:grid-cols-2 max-md:gap-3">
            <div className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
              <b className="block text-[18px] text-gold leading-tight">300+</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">Bài hướng dẫn</small>
            </div>
            <div className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
              <b className="block text-[18px] text-gold leading-tight">&lt;5 phút</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">Phản hồi chat</small>
            </div>
            <div className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
              <b className="block text-[18px] text-gold leading-tight">24/7</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">Hỗ trợ tiếng Việt</small>
            </div>
            <div>
              <b className="block text-[18px] text-gold leading-tight">99.97%</b>
              <small className="text-[10.5px] opacity-75 uppercase tracking-wider">Uptime tháng qua</small>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-4 mt-7 mb-10 max-md:mt-4">
        {/* === 6 Topic Categories ========================================= */}
        <h2 className="text-[20px] font-bold text-ink mb-4 max-md:text-[17px]">📚 Duyệt theo chủ đề</h2>
        <div className="grid grid-cols-3 gap-3 mb-8 max-md:grid-cols-1">
          {TOPIC_CATEGORIES.map((c) => (
            <div key={c.title} className="bg-paper border border-line rounded p-4 hover:border-brand hover:shadow-sm transition">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded flex items-center justify-center text-[22px] flex-shrink-0"
                  style={{ backgroundColor: c.color + "15", color: c.color }}
                >
                  {c.icon}
                </div>
                <div>
                  <b className="block text-[14px] text-ink">{c.title}</b>
                  <p className="text-[11.5px] text-mute leading-snug mt-0.5">{c.desc}</p>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                {c.articles.map((a) => (
                  <li key={a.label}>
                    <Link href={a.href} className="text-[12.5px] text-brand hover:underline cursor-pointer">
                      → {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* === Featured Guides ============================================ */}
        <h2 className="text-[20px] font-bold text-ink mb-4 max-md:text-[17px]">⭐ Hướng dẫn nổi bật</h2>
        <div className="grid grid-cols-2 gap-3 mb-8 max-md:grid-cols-1">
          {FEATURED_GUIDES.map((g) => (
            <Link
              key={g.title}
              href={g.href}
              className="bg-paper border border-line rounded p-4 hover:border-brand hover:shadow-sm transition cursor-pointer flex gap-3 items-start group/guide"
            >
              <div className="w-12 h-12 bg-bg rounded flex items-center justify-center text-[24px] flex-shrink-0">
                {g.icon}
              </div>
              <div className="flex-1 min-w-0">
                <b className="block text-[14px] text-ink leading-snug mb-1 group-hover/guide:text-brand">{g.title}</b>
                <p className="text-[12px] text-mute leading-relaxed mb-1.5">{g.desc}</p>
                <span className="text-[11px] text-mute2">⏱ {g.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* === FAQ by Stage ============================================== */}
        <h2 className="text-[20px] font-bold text-ink mb-4 max-md:text-[17px]">❓ Câu hỏi thường gặp theo giai đoạn</h2>
        <div className="space-y-5 mb-8">
          {FAQ_BY_STAGE.map((stage) => (
            <div key={stage.stage} className="bg-paper border border-line rounded p-5 max-md:p-3.5">
              <b className="block text-[14px] text-brand uppercase tracking-wider mb-3 pb-2 border-b border-line">
                {stage.stage}
              </b>
              <div className="space-y-2">
                {stage.faqs.map((f, i) => (
                  <details key={i} className="border border-line rounded group/faq">
                    <summary className="px-4 py-3 cursor-pointer flex justify-between items-start gap-3 list-none [&::-webkit-details-marker]:hidden hover:bg-bg">
                      <b className="text-[13.5px] text-ink leading-snug flex-1">{f.q}</b>
                      <span className="text-mute2 text-[14px] group-open/faq:rotate-180 transition-transform flex-shrink-0">▾</span>
                    </summary>
                    <p className="px-4 pb-4 pt-3 text-[13px] text-mute leading-relaxed border-t border-line">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* === System Status ============================================= */}
        <div className="bg-paper border border-line rounded p-5 mb-6 max-md:p-3.5">
          <div className="flex justify-between items-center mb-3 max-md:flex-col max-md:items-start max-md:gap-2">
            <h2 className="text-[16px] font-bold text-ink flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Tình trạng hệ thống — Tất cả dịch vụ hoạt động bình thường
            </h2>
            <Link
              href="https://cybersilkroads-status.io"
              className="text-[12px] text-brand hover:underline cursor-pointer"
            >
              Status page chi tiết →
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 max-md:gap-2">
            {SYSTEM_STATUS.map((s) => (
              <div key={s.service} className="border border-line rounded p-2.5 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <small className="text-[11px] text-mute">{s.service}</small>
                </div>
                <b className="block text-[14px] text-success">{s.uptime}</b>
              </div>
            ))}
          </div>
        </div>

        {/* === Contact Channels ========================================== */}
        <div
          className="rounded p-6 text-white max-md:p-4"
          style={{ background: "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)" }}
        >
          <h2 className="text-[18px] font-bold mb-1 max-md:text-[16px]">Vẫn cần hỗ trợ trực tiếp?</h2>
          <p className="text-[12.5px] opacity-85 mb-4 max-md:text-[12px]">
            Đội Customer Success Cybersilkroads tại Hà Nội + Quảng Châu — phản hồi 24/7, 100% tiếng Việt cho Buyer.
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {CONTACT_CHANNELS.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="bg-white/10 hover:bg-white/15 border border-white/20 rounded p-3 cursor-pointer transition block"
              >
                <div className="text-[24px] mb-1.5">{c.icon}</div>
                <b className="block text-[13px] mb-0.5">{c.title}</b>
                <p className="text-[11px] opacity-85 leading-snug">{c.desc}</p>
                <small className="text-[10.5px] opacity-70 mt-1 block truncate">{c.info}</small>
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/15 flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:text-center">
            <span className="text-[12.5px] opacity-85">
              📍 Văn phòng Hà Nội: 26 Phạm Hùng, Cầu Giấy · 26/F Tianhe Plaza, Quảng Châu
            </span>
            <Link
              href="/buying-request"
              className="px-4 py-2 bg-gold text-brand-dark rounded-sm font-bold text-[12.5px] cursor-pointer hover:bg-warm whitespace-nowrap"
            >
              🚀 Gửi RFQ ngay
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: "Trung tâm trợ giúp — Cybersilkroads (CSR)",
  description:
    "300+ bài hướng dẫn, 80+ FAQ về sourcing B2B từ Trung Quốc về Việt Nam. RFQ, Bảo đảm Giao dịch, DDP, hải quan. Hỗ trợ 24/7 tiếng Việt.",
};
