import Link from "next/link";
import { NAV_MENU } from "@/data/home";
import { HeroSlider } from "@/components/home/hero-slider";

/**
 * Left sidebar in BannerSection — static categorized link list.
 * The interactive mega-menu lives in NavBar's TẤT CẢ DANH MỤC dropdown;
 * this sidebar just gives quick visual access to the 2 industries.
 */
function CategoryMenu() {
  return (
    <aside className="bg-paper border border-line rounded h-full overflow-y-auto py-2">
      {NAV_MENU.map((group) => (
        <div key={group.main.slug} className="mb-2">
          <Link
            href={`/category/${group.main.slug}`}
            className="flex justify-between items-center px-3.5 py-2 text-[13px] hover:bg-[#F5F5F5] font-semibold text-ink"
          >
            <b className="font-bold">{group.main.icon} {group.main.name}</b>
            <span className="text-mute2 text-[11px]">▸</span>
          </Link>
          <ul className="pl-6 pr-2">
            {group.items.map((it) => (
              <li key={it.slug}>
                <Link
                  href={`/category/${group.main.slug}/${it.slug}`}
                  className="block py-[3px] text-[12px] text-accent hover:text-brand hover:font-semibold leading-snug truncate"
                >
                  - {it.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

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
        <div className="max-xl:hidden h-full">
          <CategoryMenu />
        </div>
        <HeroSlider />
        <RightWidgets />
      </div>
    </section>
  );
}
