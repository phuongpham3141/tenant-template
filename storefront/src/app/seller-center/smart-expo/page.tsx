import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const UPCOMING = [
  { date: "12-16/06/2026", title: "Furniture Asia Cloud Expo", topic: "Sofa · Phòng ngủ · Nội thất văn phòng", buyer: "Đông Nam Á + Úc", img: 21 },
  { date: "20-24/06/2026", title: "Smart Home & Lighting", topic: "LED · Smart switches · IoT", buyer: "Việt Nam + Thái Lan", img: 22 },
  { date: "08-12/07/2026", title: "Building Materials Asia", topic: "Gạch · Sanitary · Cửa & Cửa sổ", buyer: "Việt Nam + Indonesia", img: 23 },
  { date: "22-26/07/2026", title: "Garments & Textiles", topic: "Đồ dệt kim · Denim · Vải gia dụng", buyer: "Toàn Đông Nam Á", img: 24 },
];

const STEPS = [
  { n: 1, title: "Chọn gói gian hàng", desc: "Tiêu chuẩn $480 · Cao cấp $1,280 · Kim cương $3,200 — bao gồm thiết kế 3D, video intro, livestream slot." },
  { n: 2, title: "Upload SKU + media", desc: "Tối thiểu 12 sản phẩm hot, 1 video factory tour 60-90 giây, profile công ty song ngữ VN-CN." },
  { n: 3, title: "Live + chat realtime", desc: "Trong 5 ngày expo: 2 buổi livestream/ngày, chat AI dịch tự động VN ↔ CN, lịch hẹn 1-1 với buyer." },
];

const BOOTHS = [
  { name: "KUKA Home Furniture", industry: "Sofa · Phòng ngủ", visits: "2,840", img: 31 },
  { name: "Foshan Tile Master", industry: "Porcelain Tile", visits: "1,920", img: 32 },
  { name: "Shenzhen LED Co.", industry: "Smart Lighting", visits: "1,650", img: 33 },
  { name: "Ortonbaths Group", industry: "Sanitary Ware", visits: "2,210", img: 34 },
  { name: "Guangzhou Garment", industry: "Apparel OEM", visits: "1,480", img: 35 },
  { name: "Jiangsu Steel Door", industry: "Door & Window", visits: "1,180", img: 36 },
];

const STATS = [
  { v: "50K+", l: "Buyer ghé thăm/năm" },
  { v: "3.2K+", l: "Gian hàng đã setup" },
  { v: "12", l: "Expo / năm theo ngành" },
  { v: "$48M", l: "GMV phát sinh tại expo 2025" },
];

export default function SmartExpoPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực nhà bán", href: "/seller-center" }, { label: "Smart Expo đám mây" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/smart-expo" />
        <div>
          <div className="bg-gradient-to-br from-accent/90 to-brand text-white rounded p-6 mb-4">
            <div className="inline-block bg-white text-accent px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🎪 SMART EXPO CLOUD</div>
            <h1 className="text-[26px] font-bold leading-tight">Hội chợ ảo — Bằng Canton Fair, chỉ 1/8 chi phí</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              Gian hàng 3D, livestream factory tour, chat AI dịch realtime VN-CN, lịch hẹn 1-1 với 50K+ buyer Việt Nam và Đông Nam Á. Một expo = 2-3 tháng prospecting offline.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {STATS.map((s) => (
              <div key={s.l} className="bg-paper border border-line rounded p-4 text-center">
                <b className="block text-[24px] font-extrabold text-brand">{s.v}</b>
                <span className="text-[11.5px] text-mute mt-1 block">{s.l}</span>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">📅 Hội chợ sắp diễn ra (4 expo gần nhất)</b>
              <Link href="#" className="text-brand text-[12px]">Lịch cả năm →</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              {UPCOMING.map((u) => (
                <div key={u.title} className="border border-line rounded overflow-hidden hover:border-brand grid grid-cols-[120px_1fr] max-md:grid-cols-1">
                  <img src={`/img/seller-expo-${u.img}.jpg?v=3`} alt="" className="w-full h-full object-cover max-md:h-[140px]" />
                  <div className="p-3">
                    <span className="text-[10.5px] text-accent font-bold uppercase tracking-wider">{u.date}</span>
                    <b className="block text-[13.5px] text-ink mt-1 mb-1">{u.title}</b>
                    <p className="text-[11.5px] text-mute mb-2">{u.topic}</p>
                    <p className="text-[11px] text-mute mb-3"><span className="font-semibold">Buyer:</span> {u.buyer}</p>
                    <button className="bg-brand text-white text-[11.5px] font-semibold px-3 py-1 rounded-sm">Đăng gian hàng →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🚀 Tạo gian hàng ảo — 3 bước</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-4">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold text-[16px] mb-3">{s.n}</div>
                  <b className="block text-[13px] text-ink mb-1">{s.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">🎨 Gian hàng mẫu — 6 booth tiêu biểu</b>
              <Link href="#" className="text-brand text-[12px]">Xem 3.2K booth khác →</Link>
            </div>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2">
              {BOOTHS.map((b) => (
                <div key={b.name} className="border border-line rounded overflow-hidden hover:border-brand">
                  <div className="aspect-video bg-[#F5F5F5] relative">
                    <img src={`/img/seller-booth-${b.img}.jpg?v=3`} alt="" className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-success text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">3D</span>
                  </div>
                  <div className="p-3">
                    <b className="block text-[12.5px] text-ink leading-tight mb-0.5">{b.name}</b>
                    <span className="text-[11px] text-mute block mb-2">{b.industry}</span>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-mute">👁 {b.visits} visits</span>
                      <Link href="#" className="text-brand font-semibold">Xem booth →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-dark text-white rounded p-5 text-center">
            <b className="block text-[18px] mb-2">🎟 Đăng gian hàng cho Furniture Asia 12-16/06</b>
            <p className="text-[12.5px] opacity-90 mb-4">Slot Kim cương chỉ còn 8 — Premium còn 24. Đăng trước 25/05 giảm 30%.</p>
            <button className="bg-gold text-brand-dark px-7 py-3 rounded-sm font-bold text-[14px]">Tạo gian hàng ảo ngay</button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Smart Expo — Hội chợ đám mây — Seller Center" };
