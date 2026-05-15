import Link from "next/link";
import { NAV_CATEGORIES } from "@/data/home";
import { SubmenuContent } from "@/components/home/mega-submenu";
import { HeroSlider } from "@/components/home/hero-slider";

function CategoryMenu() {
  return (
    // mm-wrap = sidebar (mm-l1) + shared panel (mm-panel). Panel is fixed
    // 720px on the right, all 12 submenus stacked at inset:0; only the
    // hovered one is shown (via .mm-wrap:has(:nth-child(N):hover) rule).
    <div className="mm-wrap relative h-full">
      <aside className="mm-l1 bg-paper border border-line rounded h-full flex flex-col">
        {NAV_CATEGORIES.map((c) => (
          <div key={c.slug} className="mm-cat flex-1 min-h-0">
            <Link
              href={`/category/${c.slug}`}
              className="flex justify-between items-center h-full px-3.5 py-2 text-[13px] text-ink border-b border-[#F5F5F5] last:border-b-0 cursor-pointer hover:bg-brand hover:text-white"
            >
              <b className="font-medium">
                {c.icon} {c.name}
                {c.isNew && (
                  <span className="bg-accent text-white text-[9px] px-1.5 py-px rounded-sm ml-1.5">
                    MỚI
                  </span>
                )}
              </b>
              <span className="text-mute2 text-[11px]">▸</span>
            </Link>
          </div>
        ))}
      </aside>
      <div className="mm-panel absolute left-full top-0 w-[720px] grid bg-paper border border-line rounded shadow-xl z-50">
        {NAV_CATEGORIES.map((c) => (
          <div
            key={c.slug}
            className="mm-l2 row-start-1 col-start-1 p-5 grid-cols-4 gap-x-4 gap-y-3"
          >
            <SubmenuContent slug={c.slug} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Hero slider lives in ./hero-slider.tsx as a client component (auto-rotate
// + swipe require JS state). Imported as <HeroSlider /> below.

function RightWidgets() {
  return (
    <aside className="h-full flex flex-col gap-2.5 max-md:h-auto">
      <form action="/buying-request" method="get" className="bg-paper border border-line rounded overflow-hidden flex-shrink-0">
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
        className="text-white p-4 rounded flex-1 flex flex-col justify-between min-h-[120px]"
        style={{ background: "linear-gradient(135deg,#E85D4E,#E8364A)" }}
      >
        <div>
          <b className="block text-[15px] font-bold mb-1">🎁 Ưu đãi đại lý mới</b>
          <p className="text-[11.5px] opacity-90 mb-2.5 leading-snug">
            Kiểm định nhà máy miễn phí + giảm 10% đơn đầu + miễn phí vận chuyển DDP
          </p>
        </div>
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
      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-[240px_1fr_240px] gap-3 items-stretch h-[504px] max-[1280px]:grid-cols-1 max-[1280px]:h-auto max-md:gap-2 max-md:px-3">
        {/* CategoryMenu ẩn trên tablet & mobile — mega-panel 720px sẽ
            tràn ngoài viewport iPad. Tablet/mobile có drawer ở NavBar. */}
        <div className="max-xl:hidden h-full">
          <CategoryMenu />
        </div>
        <HeroSlider />
        <RightWidgets />
      </div>
    </section>
  );
}
