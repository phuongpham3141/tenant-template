import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";

const CHANNELS = [
  {
    icon: "📧",
    title: "Email hỗ trợ",
    primary: "buyer@alibabavn.com",
    secondary: "support@alibabavn.com",
    hours: "Phản hồi trong 4h làm việc · 7h–22h hàng ngày",
    color: "bg-brand/10 text-brand",
  },
  {
    icon: "📞",
    title: "Hotline 24/7",
    primary: "1900 6868 (VN)",
    secondary: "+86 020 8888 6868 (CN)",
    hours: "Tiếng Việt · Tiếng Trung · Tiếng Anh",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: "💬",
    title: "Chat trực tiếp",
    primary: "Zalo: AlibabaVN-Buyer",
    secondary: "WeChat: AlibabaVN_Service",
    hours: "Online 8h–22h · phản hồi < 5 phút",
    color: "bg-success/10 text-success",
  },
];

const OFFICES = [
  {
    flag: "🇻🇳",
    city: "Văn phòng Hà Nội",
    address: "Tầng 18, Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội",
    phone: "+84 24 3939 6868",
    email: "hanoi@alibabavn.com",
    hours: "Thứ 2 – Thứ 7: 8:00 – 18:00",
  },
  {
    flag: "🇻🇳",
    city: "Văn phòng TP.HCM",
    address: "Tầng 12, Toà Bitexco Financial Tower, 2 Hải Triều, Quận 1, TP.HCM",
    phone: "+84 28 3868 6868",
    email: "hcm@alibabavn.com",
    hours: "Thứ 2 – Thứ 7: 8:00 – 18:00",
  },
  {
    flag: "🇨🇳",
    city: "Văn phòng Quảng Châu",
    address: "Room 1808, R&F Center, No.10 Huaxia Rd, Tianhe District, Guangzhou",
    phone: "+86 020 8888 6868",
    email: "guangzhou@alibabavn.com",
    hours: "Thứ 2 – Thứ 6: 9:00 – 18:00 (GMT+8)",
  },
  {
    flag: "🇨🇳",
    city: "Đại diện Phật Sơn (Foshan)",
    address: "Tầng 5, China Ceramics City, Chancheng District, Foshan, Guangdong",
    phone: "+86 0757 8222 6868",
    email: "foshan@alibabavn.com",
    hours: "Thứ 2 – Thứ 6: 9:00 – 18:00 (GMT+8)",
  },
];

const SUBJECTS = [
  "Hỗ trợ chung",
  "Vấn đề về RFQ / báo giá",
  "Vấn đề về đơn hàng đang xử lý",
  "Khiếu nại chất lượng / vận chuyển",
  "Yêu cầu audit nhà máy",
  "Yêu cầu QC kiểm hàng",
  "Hỗ trợ thanh toán / Secured Trading",
  "Báo cáo lỗi hệ thống",
  "Đề xuất / phản hồi sản phẩm",
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Buyer Center", href: "/buyer-center" }, { label: "Liên hệ chúng tôi" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/contact" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📞 CONTACT US</div>
            <h1 className="text-[22px] font-bold text-ink">Liên hệ chúng tôi</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              Đội Buyer Success của AlibabaVN có mặt tại Hà Nội, TP.HCM, Quảng Châu và Phật Sơn. Mọi yêu cầu của bạn đều được xử lý bởi người Việt nói tiếng Việt — không qua chatbot, không lạc dịch.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 max-md:grid-cols-1">
            {CHANNELS.map((c) => (
              <div key={c.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className={`inline-flex w-12 h-12 rounded-full items-center justify-center text-[22px] mb-3 ${c.color}`}>{c.icon}</div>
                <b className="block text-[14px] text-ink mb-2">{c.title}</b>
                <div className="text-[13px] text-brand font-semibold">{c.primary}</div>
                <div className="text-[12.5px] text-mute mb-2">{c.secondary}</div>
                <div className="text-[11px] text-mute pt-2 border-t border-line">{c.hours}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            {OFFICES.map((o) => (
              <div key={o.city} className="bg-paper border border-line rounded p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[20px]">{o.flag}</span>
                  <b className="text-[14px] text-ink">{o.city}</b>
                </div>
                <div className="text-[12.5px] text-ink mb-1">📍 {o.address}</div>
                <div className="text-[12.5px] text-mute mb-1">📞 {o.phone}</div>
                <div className="text-[12.5px] text-mute mb-1">✉️ {o.email}</div>
                <div className="text-[11.5px] text-mute pt-2 border-t border-line mt-2">🕘 {o.hours}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#F5F7FA] border border-line rounded p-3 mb-4 text-center">
            <div className="aspect-[3/1] bg-paper border border-dashed border-line rounded flex items-center justify-center text-mute text-[13px]">
              🗺️ Bản đồ Google Maps – văn phòng Hà Nội (Lotte Center)
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-1">✉️ Gửi tin nhắn cho chúng tôi</b>
            <p className="text-[12px] text-mute mb-4">Phản hồi trong 4h làm việc — kèm số ticket để bạn theo dõi.</p>
            <form className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              <input placeholder="Họ và tên *" className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <input placeholder="Email *" type="email" className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <input placeholder="Số điện thoại" className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <input placeholder="Công ty (tuỳ chọn)" className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <select className="col-span-2 px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white outline-none focus:border-brand">
                <option value="">-- Chủ đề liên hệ * --</option>
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>
              <textarea placeholder="Nội dung chi tiết *" rows={5} className="col-span-2 px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand resize-none" />
              <label className="col-span-2 flex items-center gap-2 text-[12px] text-mute">
                <input type="checkbox" className="accent-brand" /> Tôi đồng ý cho AlibabaVN sử dụng email/số điện thoại để liên hệ về vấn đề này.
              </label>
              <button type="button" className="col-span-2 px-5 py-3 bg-accent text-white rounded-sm font-bold text-[13.5px] hover:opacity-90 max-md:col-span-1">Gửi tin nhắn 📨</button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link href="/buyer-center/contact?subject=bug" className="bg-paper border border-line rounded p-4 hover:border-accent">
              <b className="block text-[13px] text-ink mb-1">🐞 Báo cáo sự cố hệ thống</b>
              <p className="text-[11.5px] text-mute leading-snug">Gặp lỗi khi đặt RFQ, thanh toán, xem báo cáo? Báo cho team kỹ thuật xử lý ưu tiên trong 2h.</p>
            </Link>
            <Link href="/info/cau-hoi-thuong-gap" className="bg-paper border border-line rounded p-4 hover:border-brand">
              <b className="block text-[13px] text-ink mb-1">❓ FAQ – câu hỏi thường gặp</b>
              <p className="text-[11.5px] text-mute leading-snug">90% câu hỏi của buyer đã có sẵn câu trả lời chi tiết — kiểm tra trước khi gửi ticket.</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Liên hệ chúng tôi — Buyer Center" };
