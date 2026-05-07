import Link from "next/link";
import { NAV_CATEGORIES } from "@/data/home";

function CategoryMenu() {
  return (
    <aside className="bg-paper border border-line rounded overflow-hidden">
      {NAV_CATEGORIES.map((c) => (
        <Link
          key={c.name}
          href={`/category/${c.slug}`}
          className="flex justify-between items-center px-3.5 py-2.5 text-[13px] text-ink border-b border-[#F5F5F5] last:border-b-0 cursor-pointer hover:bg-brand hover:text-white group"
        >
          <b className="font-medium">
            {c.icon} {c.name}
            {c.isNew && (
              <span className="bg-accent text-white text-[9px] px-1.5 py-px rounded-sm ml-1.5">
                NEW
              </span>
            )}
          </b>
          <span className="text-mute2 text-[11px] group-hover:text-white">▸</span>
        </Link>
      ))}
    </aside>
  );
}

function Hero() {
  return (
    <div className="relative rounded overflow-hidden aspect-[16/9] bg-brand-dark max-md:aspect-[5/4]">
      <img
        src="https://picsum.photos/seed/heroint/1200/675"
        alt=""
        className="w-full h-full object-cover opacity-70"
      />
      <div
        className="absolute inset-0 px-12 py-10 flex flex-col justify-center text-white max-md:px-4 max-md:py-4"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,37,87,0.9), rgba(0,37,87,0.3))",
        }}
      >
        <span className="inline-block self-start bg-gold text-brand-dark px-3 py-1 rounded-sm text-[11px] font-bold tracking-wider uppercase mb-3.5">
          ⚡ Canton Fair 2026
        </span>
        <h1 className="text-[44px] font-extrabold leading-[1.05] tracking-tight mb-3.5 max-md:text-[26px]">
          Tìm nhà máy tốt nhất
          <br />
          từ <span className="text-gold">Trung Quốc</span>.
        </h1>
        <p className="text-[14px] opacity-90 max-w-[420px] mb-5.5 max-md:text-[12.5px]">
          2,400+ sản phẩm từ 40+ nhà máy đã được audit. Báo giá trực tiếp, không
          qua trung gian.
        </p>
        <div className="flex gap-2.5 max-md:flex-col max-md:gap-2 max-md:w-full">
          <Link href="/buying-request" className="px-6 py-3 font-semibold text-[13.5px] rounded-sm bg-gold text-brand-dark text-center cursor-pointer max-md:px-4 max-md:py-2.5 max-md:text-[12.5px]">
            📨 Gửi yêu cầu báo giá
          </Link>
          <Link href="/suppliers" className="px-6 py-3 font-semibold text-[13.5px] rounded-sm bg-white/15 text-white border border-white/30 text-center cursor-pointer max-md:px-4 max-md:py-2.5 max-md:text-[12.5px]">
            🏭 Xem nhà máy →
          </Link>
        </div>
      </div>
      <div className="absolute bottom-5 left-12 flex gap-2 z-10 max-md:left-5">
        <span className="w-7 h-[3px] bg-gold rounded-sm"></span>
        <span className="w-7 h-[3px] bg-white/40 rounded-sm"></span>
        <span className="w-7 h-[3px] bg-white/40 rounded-sm"></span>
        <span className="w-7 h-[3px] bg-white/40 rounded-sm"></span>
      </div>
    </div>
  );
}

function RightWidgets() {
  return (
    <aside>
      <form action="/buying-request" method="get" className="bg-paper border border-line rounded mb-2.5 overflow-hidden">
        <div className="bg-brand text-white px-3.5 py-2.5 font-semibold text-[13px] flex items-center gap-1.5">
          📋 Yêu cầu báo giá nhanh
        </div>
        <div className="p-3.5">
          <p className="text-[11.5px] text-mute mb-2.5">
            Gửi yêu cầu tới nhiều NCC cùng lúc. Nhận báo giá trong 24h.
          </p>
          <input
            name="q"
            placeholder="Sản phẩm cần tìm..."
            className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand"
          />
          <input
            name="qty"
            placeholder="Số lượng + đơn vị (vd: 500 m²)"
            className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand"
          />
          <textarea
            name="desc"
            placeholder="Mô tả chi tiết..."
            className="w-full px-2.5 py-1.5 border border-line rounded-sm text-[12px] mb-2 outline-none focus:border-brand resize-none min-h-[60px]"
          />
          <button type="submit" className="w-full py-2.5 bg-accent text-white border-0 rounded-sm font-bold text-[12.5px] cursor-pointer hover:bg-[#B81827]">
            🚀 GỬI NGAY
          </button>
        </div>
      </form>
      <div
        className="text-white p-4 rounded mb-2.5"
        style={{ background: "linear-gradient(135deg,#E85D4E,#E8364A)" }}
      >
        <b className="block text-[15px] font-bold mb-1">🎁 Ưu đãi dealer mới</b>
        <p className="text-[11.5px] opacity-90 mb-2.5 leading-snug">
          Audit nhà máy miễn phí + giảm 10% đơn đầu + free shipping DDP
        </p>
        <Link href="/register/dealer" className="inline-block px-3.5 py-1.5 bg-gold text-brand-dark text-[12px] font-bold rounded-sm cursor-pointer">
          Đăng ký →
        </Link>
      </div>
    </aside>
  );
}

export function BannerSection() {
  return (
    <section className="py-4 bg-paper max-md:py-2">
      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-[240px_1fr_240px] gap-3 min-h-[380px] max-[1100px]:grid-cols-1 max-md:gap-2 max-md:min-h-0 max-md:px-3">
        {/* CategoryMenu ẩn trên mobile — đã có ở NavBar drawer */}
        <div className="max-md:hidden">
          <CategoryMenu />
        </div>
        <Hero />
        <RightWidgets />
      </div>
    </section>
  );
}
