import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

export default function AppPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Tải app" }]} />
      <div className="max-w-[1200px] mx-auto px-4 mt-6 mb-10">
        <div className="bg-paper border border-line rounded grid grid-cols-[1fr_360px] gap-7 p-7 max-md:grid-cols-1 max-md:p-5">
          <div className="flex flex-col justify-center">
            <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">📱 ỨNG DỤNG CYBERSILKROADS</span>
            <h1 className="text-[34px] font-extrabold text-ink leading-tight mb-3 max-md:text-[24px]">
              Sourcing tận tay — <span className="text-brand">không lỡ deal</span>
            </h1>
            <p className="text-[14px] text-mute leading-relaxed mb-5 max-w-[520px]">
              Nhận thông báo báo giá tức thì, chat NCC realtime, theo dõi đơn hàng. Tải ngay để được giảm thêm 5% đơn đầu trên app.
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-[420px] max-md:grid-cols-1">
              <a className="border border-line rounded p-3 flex items-center gap-3 bg-black text-white cursor-pointer hover:opacity-90">
                <span className="text-[28px]">🍎</span>
                <div>
                  <div className="text-[10px] opacity-80">Tải về trên</div>
                  <b className="block text-[15px]">App Store</b>
                </div>
              </a>
              <a className="border border-line rounded p-3 flex items-center gap-3 bg-black text-white cursor-pointer hover:opacity-90">
                <span className="text-[28px]">🤖</span>
                <div>
                  <div className="text-[10px] opacity-80">Tải về trên</div>
                  <b className="block text-[15px]">Google Play</b>
                </div>
              </a>
            </div>
            <div className="mt-5 pt-5 border-t border-line flex items-center gap-4 max-md:flex-col max-md:items-start">
              <div className="w-28 h-28 bg-paper border border-line rounded p-1.5 flex-shrink-0">
                <img src="/img/qrcode.jpg?v=3" alt="QR" className="w-full h-full object-cover rounded-sm" />
              </div>
              <div>
                <b className="block text-[13px] text-ink mb-1">Quét mã QR để tải nhanh</b>
                <p className="text-[12px] text-mute leading-relaxed">App hỗ trợ iOS 14+, Android 9+. Notification real-time, dark mode, đa ngôn ngữ.</p>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-line">
              <b className="block text-[13px] text-ink mb-2">Tính năng chính</b>
              <div className="grid grid-cols-2 gap-2 text-[12.5px] text-mute max-md:grid-cols-1">
                <span>📨 Gửi RFQ qua app, đính kèm ảnh</span>
                <span>💬 Chat NCC realtime, dịch tự động</span>
                <span>📦 Theo dõi đơn realtime, ETA chính xác</span>
                <span>🔔 Thông báo báo giá mới &lt;1 phút</span>
                <span>🛒 Đặt mẫu 1 chạm</span>
                <span>📊 Lịch sử đơn, tải hóa đơn</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <img src="/img/app-phone.jpg?v=3" alt="App screenshot" className="w-full max-w-[320px] rounded-2xl shadow-[0_20px_60px_rgba(0,37,87,0.3)]" />
              <div className="absolute -top-3 -right-3 bg-gold text-brand-dark px-3 py-1.5 rounded-full text-[11px] font-bold rotate-12 shadow">
                +5% OFF
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 max-md:grid-cols-1">
          {[
            { v: "60K+", l: "Lượt tải" },
            { v: "4.7 ★", l: "Đánh giá App Store" },
            { v: "32K+", l: "RFQ qua app/tháng" },
          ].map((s) => (
            <div key={s.l} className="bg-paper border border-line rounded p-4 text-center">
              <b className="block text-[26px] font-extrabold text-brand">{s.v}</b>
              <span className="text-[12px] text-mute">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Tải app — Cybersilkroads" };
