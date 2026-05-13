import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";

const STEPS = [
  {
    n: 1,
    title: "Tạo tài khoản buyer",
    desc: "Đăng ký bằng email công ty, xác thực OTP, điền thông tin doanh nghiệp (MST, địa chỉ, ngành nghề). Mất khoảng 3 phút.",
    cta: "Tạo tài khoản →",
    href: "/account/register",
  },
  {
    n: 2,
    title: "Xác thực buyer & hoàn thiện hồ sơ",
    desc: "Tải lên Giấy phép kinh doanh để mở khoá Bảo đảm Giao dịch, RFQ ưu tiên và giá factory-direct. Duyệt trong 24h làm việc.",
    cta: "Hoàn thiện hồ sơ →",
    href: "/account/verify",
  },
  {
    n: 3,
    title: "Gửi RFQ đầu tiên",
    desc: "Mô tả 1 lần — hệ thống tự gửi đến 5–10 nhà máy phù hợp. Báo giá kèm sample, thời gian giao, DDP về VN trong 24h.",
    cta: "Gửi RFQ →",
    href: "/buying-request",
  },
  {
    n: 4,
    title: "Theo dõi & chốt báo giá",
    desc: "So sánh báo giá, chat trực tiếp NCC, đặt sample, ký hợp đồng. Toàn bộ luồng được bảo vệ bởi Dịch vụ giao dịch bảo đảm.",
    cta: "Vào dashboard →",
    href: "/buyer-center",
  },
];

const FAQS = [
  {
    q: "Cybersilkroads khác Alibaba.com hay Made-in-China.com như thế nào?",
    a: "Cybersilkroads là cổng B2B Việt-Trung được vận hành cho thị trường VN: hỗ trợ tiếng Việt 24/7, báo giá DDP về kho VN, hợp đồng tiếng Việt, và đội xử lý Cát Lái – Hải Phòng – Bằng Tường. Bạn không cần Trung Quốc hay tiếng Anh để giao dịch.",
  },
  {
    q: "Tôi có cần đặt cọc để gửi RFQ không?",
    a: "Không. Gửi RFQ và nhận báo giá hoàn toàn miễn phí, không cam kết. Bạn chỉ thanh toán khi đã chọn NCC, ký hợp đồng và xác nhận đặt cọc qua Dịch vụ giao dịch bảo đảm (tài khoản trung gian giữ tiền cho đến khi giao hàng đạt QC).",
  },
  {
    q: "MOQ trên Cybersilkroads là bao nhiêu?",
    a: "MOQ phụ thuộc nhà máy và sản phẩm — thường 50–500 sản phẩm hoặc 100–500 m² đối với vật liệu xây dựng. Một số NCC đã thẩm định cho phép MOQ thấp hơn cho buyer mới, hoặc gộp container chia sẻ (LCL) khi bạn chưa đủ nguyên container.",
  },
  {
    q: "Thời gian giao và phí vận chuyển DDP về VN là bao lâu, bao nhiêu?",
    a: "Sản xuất trung bình 15–30 ngày. Vận chuyển sea freight Foshan–Cát Lái 7–10 ngày, đường bộ Bằng Tường–Hà Nội 3–5 ngày. Phí DDP đã bao gồm thuế nhập khẩu + VAT + chi phí kho bãi, trung bình 8–15% giá FOB tuỳ loại hàng.",
  },
  {
    q: "Nếu hàng không đạt chất lượng tôi có được hoàn tiền không?",
    a: "Có. Tất cả đơn qua Dịch vụ giao dịch bảo đảm đều có 3 lớp bảo vệ: (1) Tài khoản trung gian giữ tiền tại Cybersilkroads; (2) QC kiểm hàng trước khi xuất xưởng (tuỳ chọn $300/lần); (3) Bảo hiểm vận chuyển. Nếu hàng sai mô tả hoặc lỗi kỹ thuật, bạn được hoàn 100% tiền hoặc đổi lô mới.",
  },
];

const DOWNLOADS = [
  {
    icon: "📕",
    title: "Cẩm nang nhập khẩu Trung Quốc 2026",
    desc: "84 trang · HS code · thuế nhập khẩu theo nhóm hàng · checklist hồ sơ hải quan VN",
    size: "PDF · 4.2 MB",
  },
  {
    icon: "📘",
    title: "Quy trình DDP – từ xưởng đến kho VN",
    desc: "Sơ đồ 12 bước · timeline mẫu · điểm cần check tại Bằng Tường và Cát Lái",
    size: "PDF · 2.8 MB",
  },
  {
    icon: "📗",
    title: "Mẫu hợp đồng song ngữ Việt – Trung",
    desc: "5 mẫu hợp đồng: mua bán, OEM, gia công, đại lý độc quyền, NDA — đã review pháp lý",
    size: "PDF · 1.5 MB",
  },
];

export default function NewUserGuidePage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực người mua", href: "/buyer-center" }, { label: "Hướng dẫn người mua mới" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/new-user-guide" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📖 BUYER ONBOARDING</div>
            <h1 className="text-[22px] font-bold text-ink">Hướng dẫn người mua mới</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              Lần đầu mua sỉ từ Trung Quốc? Cybersilkroads đã chuẩn hoá toàn bộ quy trình — từ tạo tài khoản đến nhận hàng tại kho VN — thành 4 bước rõ ràng. Đọc xong trang này, bạn sẽ tự tin gửi RFQ đầu tiên trong 10 phút.
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🚀 Quy trình 4 bước</b>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              {STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-4 hover:border-brand transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-brand text-white rounded-full flex items-center justify-center font-bold text-[14px] flex-shrink-0">{s.n}</div>
                    <b className="text-[14px] text-ink">{s.title}</b>
                  </div>
                  <p className="text-[12.5px] text-mute leading-relaxed mb-3">{s.desc}</p>
                  <Link href={s.href} className="text-brand text-[12.5px] font-semibold hover:underline">{s.cta}</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-3">❓ Câu hỏi thường gặp dành cho buyer mới</b>
            <div className="space-y-2">
              {FAQS.map((f, i) => (
                <details key={i} className="border border-line rounded group" open={i === 0}>
                  <summary className="px-4 py-3 cursor-pointer text-[13px] font-semibold text-ink list-none flex justify-between items-center hover:bg-[#FAFBFC]">
                    <span>{f.q}</span>
                    <span className="text-mute text-[16px] group-open:rotate-180 transition-transform">⌃</span>
                  </summary>
                  <div className="px-4 pb-3 text-[12.5px] text-mute leading-relaxed border-t border-line pt-3">{f.a}</div>
                </details>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 max-md:grid-cols-1">
            {DOWNLOADS.map((d) => (
              <div key={d.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[28px] mb-2">{d.icon}</div>
                <b className="block text-[13px] text-ink leading-tight mb-1">{d.title}</b>
                <p className="text-[11.5px] text-mute leading-snug mb-2">{d.desc}</p>
                <div className="flex justify-between items-center pt-2 border-t border-line">
                  <span className="text-[10.5px] text-mute">{d.size}</span>
                  <button className="text-brand text-[11.5px] font-semibold hover:underline">Tải về ↓</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand-dark text-white rounded p-5 flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start">
            <div>
              <b className="block text-[16px] mb-1">Cần hỗ trợ trực tiếp?</b>
              <p className="text-[12.5px] opacity-90">Đội Buyer Success nói tiếng Việt, có mặt tại Hà Nội & TP.HCM. Hotline 8h–22h mỗi ngày.</p>
            </div>
            <Link href="/buyer-center/contact" className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[13px] hover:opacity-90 whitespace-nowrap">📞 Liên hệ chúng tôi</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Hướng dẫn người mua mới — Buyer Center" };
