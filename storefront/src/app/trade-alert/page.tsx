import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

const SAMPLE_ALERTS = [
  { tag: "PRICE", title: "Giá porcelain tile giảm 8% trong tháng 11", time: "2 ngày trước", text: "Sản lượng tăng 15% tại Foshan đẩy giá xuống. Cơ hội nhập kho cho Tết." },
  { tag: "NEW SUPPLIER", title: "30 nhà máy ceramic mới gia nhập AlibabaVN", time: "3 ngày trước", text: "Toàn bộ đã qua audit, tập trung tại cluster Tân Hưng. MOQ từ 100m²." },
  { tag: "TREND", title: "Smart toilet tăng trưởng 240% năm 2025", time: "5 ngày trước", text: "Ortonbaths, TOTO, Kohler dẫn đầu. Mức giá $150-450/pc cho thị trường VN." },
  { tag: "FAIR", title: "Canton Fair Phase 2 mở đăng ký", time: "1 tuần trước", text: "Tour 5 ngày, hỗ trợ visa, khách sạn, tour 3 nhà máy. Giảm 15% cho 50 buyer đăng ký sớm." },
  { tag: "POLICY", title: "Thuế nhập khẩu nội thất giảm về 15% từ 2026", time: "1 tuần trước", text: "Nghị định mới có hiệu lực 1/1/2026 — tiết kiệm 5-10% chi phí cho dealer nội thất." },
  { tag: "DEAL", title: "Dongpeng giảm 12% cho đơn 500m²+", time: "2 tuần trước", text: "Áp dụng cho dòng porcelain Calacatta. Hết hạn 30/11/2026." },
];

const TAG_COLORS: Record<string, string> = {
  PRICE: "bg-accent",
  "NEW SUPPLIER": "bg-success",
  TREND: "bg-brand",
  FAIR: "bg-gold text-brand-dark",
  POLICY: "bg-mute",
  DEAL: "bg-accent",
};

export default function TradeAlertPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Trade Alert" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 grid grid-cols-[1fr_360px] gap-5 max-md:grid-cols-1">
        <div>
          <div className="relative rounded overflow-hidden h-[200px] bg-brand-dark">
            <img src="https://picsum.photos/seed/tradealert/900/280" alt="" className="w-full h-full object-cover opacity-55" />
            <div className="absolute inset-0 px-7 py-6 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
              <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📬 NEWSLETTER B2B</span>
              <h1 className="text-[28px] font-extrabold leading-tight max-md:text-[22px]">Nhận thông báo sản phẩm & xu hướng ngành mỗi tuần</h1>
              <p className="text-[13px] opacity-90 mt-2">12,000+ buyer Việt Nam đang nhận Trade Alert. Hoàn toàn miễn phí, hủy đăng ký bất cứ lúc nào.</p>
            </div>
          </div>

          {/* Sample alerts */}
          <h2 className="text-[16px] font-bold text-ink mt-5 mb-3">Mẫu nội dung Trade Alert gần đây</h2>
          <div className="space-y-3">
            {SAMPLE_ALERTS.map((a) => (
              <div key={a.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="flex justify-between items-start gap-3 mb-1.5">
                  <span className={`text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider ${TAG_COLORS[a.tag] ?? "bg-brand"}`}>{a.tag}</span>
                  <span className="text-[11.5px] text-mute">{a.time}</span>
                </div>
                <b className="block text-[14px] text-ink mb-1">{a.title}</b>
                <p className="text-[12.5px] text-mute leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <form action="/trade-alert" method="get" className="bg-paper border border-line rounded overflow-hidden sticky top-4">
            <div className="bg-brand text-white px-4 py-3 font-semibold text-[14px]">📬 Đăng ký Trade Alert</div>
            <div className="p-4">
              <p className="text-[12px] text-mute mb-3">Nhập email + ngành quan tâm. 1-2 email/tuần, không spam.</p>
              <input name="email" type="email" placeholder="email@example.com" className="w-full px-3 py-2 border border-line rounded-sm text-[13px] mb-2 outline-none focus:border-brand" />
              <select name="industry" className="w-full px-3 py-2 border border-line rounded-sm text-[13px] mb-2 bg-white">
                <option value="">-- Ngành quan tâm --</option>
                {NAV_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                ))}
              </select>
              <select name="lang" className="w-full px-3 py-2 border border-line rounded-sm text-[13px] mb-3 bg-white">
                <option value="vi">🇻🇳 Tiếng Việt</option>
                <option value="en">🇬🇧 English</option>
              </select>
              <button type="submit" className="w-full py-2.5 bg-accent text-white rounded-sm font-bold text-[13px]">Đăng ký miễn phí</button>
              <p className="text-[11px] text-mute text-center mt-3">
                Bạn đã có tài khoản? <Link href="/login" className="text-brand">Đăng nhập</Link>
              </p>
            </div>
          </form>

          <div className="bg-paper border border-line rounded p-4 mt-4 text-[12px] text-mute leading-relaxed">
            <b className="block text-[13px] text-ink mb-2">Quyền lợi subscriber</b>
            <ul className="space-y-1.5">
              <li>✓ Cảnh báo giá nguyên liệu mỗi tuần</li>
              <li>✓ Báo cáo NCC mới gia nhập</li>
              <li>✓ Mã giảm Canton Fair tour</li>
              <li>✓ Webinar miễn phí 1 lần/tháng</li>
            </ul>
          </div>
        </aside>
      </div>
      <div className="mb-7" />
    </>
  );
}

export const metadata = { title: "Trade Alert — AlibabaVN" };
