import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const TOPICS = [
  { icon: "📦", title: "Đặt hàng", slug: "tim-san-pham", desc: "Tìm sản phẩm, gửi RFQ, đặt mẫu, MOQ, OEM/ODM" },
  { icon: "💳", title: "Thanh toán", slug: "bao-ve-thanh-toan", desc: "T/T, escrow, Trade Assurance, hoàn tiền" },
  { icon: "🚚", title: "Vận chuyển", slug: "chinh-sach-van-chuyen", desc: "DDP, FOB, CIF, lead time, kho Bằng Tường" },
  { icon: "⚖", title: "Khiếu nại", slug: "khieu-nai", desc: "Quy trình tranh chấp, hoàn tiền, đổi hàng" },
  { icon: "👤", title: "Tài khoản", slug: "gioi-thieu", desc: "Đăng ký, đăng nhập, bảo mật, settings" },
  { icon: "🔧", title: "OEM/ODM", slug: "huong-dan-nhap-khau", desc: "Đặt hàng theo bản vẽ, branding, packaging" },
];

const FAQ = [
  { q: "Làm sao để gửi RFQ trên AlibabaVN?", a: "Click 'Gửi RFQ' ở header trang chủ hoặc vào /buying-request, mô tả sản phẩm + số lượng + deadline, hệ thống tự động gửi đến 5-10 NCC phù hợp. Báo giá nhận trong 24h." },
  { q: "MOQ tối thiểu là bao nhiêu?", a: "Tùy nhà máy — phổ biến từ $500-2000 hoặc 50-100 đơn vị. Một số NCC chấp nhận MOQ thấp $200 cho buyer mới qua chương trình audit miễn phí." },
  { q: "Có cần giấy phép nhập khẩu?", a: "Phần lớn vật liệu xây dựng, nội thất, sanitary không cần giấy phép. AlibabaVN tư vấn theo HS code cụ thể trước khi đặt hàng." },
  { q: "Vận chuyển DDP mất bao lâu?", a: "Từ Foshan: 5-7 ngày về kho VN. Từ Thượng Hải: 8-12 ngày. Đã bao gồm hải quan, thuế, giao tận kho — không phát sinh thêm." },
  { q: "Chính sách hoàn tiền như thế nào?", a: "Trade Assurance hoàn 100% nếu hàng không đúng mô tả. Khiếu nại trong 7 ngày kể từ ngày nhận. Đội tranh chấp xử lý trong 3-5 ngày." },
  { q: "Có thể audit nhà máy trước khi đặt không?", a: "Có. Audit on-site free cho đơn $5K+, $200 cho đơn nhỏ hơn. Báo cáo audit kèm 100+ ảnh, video 360°, đo lường thực tế." },
  { q: "Hỗ trợ ngôn ngữ gì?", a: "Tiếng Việt 24/7 cho buyer. Đội Quảng Châu chat tiếng Trung trực tiếp với NCC. Hỗ trợ tiếng Anh cho buyer quốc tế." },
  { q: "Phí dịch vụ AlibabaVN là bao nhiêu?", a: "MIỄN PHÍ cho buyer. Chúng tôi thu phí từ NCC (commission 2-5% hoặc subscription). Bạn không trả thêm gì — báo giá NCC đã là giá cuối." },
];

export default function HelpPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Trung tâm trợ giúp" }]} />
      <div className="max-w-[1100px] mx-auto px-4 mt-4 mb-7">
        <div className="bg-paper border border-line rounded p-7 text-center mb-5">
          <h1 className="text-[28px] font-extrabold text-ink mb-2">Trung tâm trợ giúp</h1>
          <p className="text-[13px] text-mute mb-4">Trả lời câu hỏi phổ biến về sourcing B2B từ Trung Quốc.</p>
          <form action="/search" method="get" className="flex max-w-[500px] mx-auto border-2 border-brand rounded overflow-hidden">
            <input name="q" placeholder="Tìm kiếm: cách đặt hàng, MOQ, vận chuyển..." className="flex-1 px-3.5 py-2.5 outline-none text-[13.5px]" />
            <button type="submit" className="px-6 bg-brand text-white font-bold text-[13px]">🔍 Tìm</button>
          </form>
        </div>

        {/* Topics */}
        <div className="grid grid-cols-3 gap-3 mb-7 max-md:grid-cols-1">
          {TOPICS.map((t) => (
            <Link key={t.title} href={`/info/${t.slug}`} className="bg-paper border border-line rounded p-4 hover:border-brand block">
              <div className="text-[28px] mb-1">{t.icon}</div>
              <b className="block text-[14px] text-ink mb-1">{t.title}</b>
              <p className="text-[12px] text-mute leading-snug">{t.desc}</p>
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-paper border border-line rounded p-6">
          <h2 className="text-[18px] font-bold text-ink mb-4">Câu hỏi thường gặp</h2>
          <div className="space-y-2.5">
            {FAQ.map((f, i) => (
              <details key={i} className="border border-line rounded group">
                <summary className="px-4 py-3 cursor-pointer flex justify-between items-center text-[13px] font-semibold text-ink hover:bg-[#FAFBFC]">
                  <span>{f.q}</span>
                  <span className="text-mute group-open:rotate-180 transition">▾</span>
                </summary>
                <div className="px-4 pb-3.5 pt-1 text-[12.5px] text-mute leading-relaxed border-t border-line">{f.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-brand-dark text-white rounded p-5 mt-5 flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:text-center">
          <div>
            <b className="block text-[16px] mb-1">Vẫn cần hỗ trợ?</b>
            <span className="text-[12.5px] opacity-85">Liên hệ trực tiếp với đội AlibabaVN — phản hồi trong giờ hành chính.</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link href="/info/lien-he" className="px-4 py-2 bg-gold text-brand-dark rounded-sm font-bold text-[12.5px]">📞 Liên hệ</Link>
            <Link href="/buying-request" className="px-4 py-2 border border-white/40 text-white rounded-sm font-semibold text-[12.5px]">📨 Gửi RFQ</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Trung tâm trợ giúp — AlibabaVN" };
