import Link from "next/link";
import { NAV_MENU } from "@/data/home";
import { HeroSlider } from "@/components/home/hero-slider";
import { SubItemPanel } from "@/components/home/mega-submenu";

/**
 * BannerSection sidebar — mirrors the main NavBar "TẤT CẢ DANH MỤC"
 * mega-menu: each main category is a heading with its sub-items listed
 * underneath (mm-sub-N). Hovering a sub-item reveals its detail panel
 * (mm-sub-panel-N) to the right, overlaying the hero. globals.css
 * `.mm-sub-N` / `.mm-sub-panel-N` rules drive the toggle via :has() —
 * no JS needed. Identical markup/behaviour to NavBar so the home
 * sidebar and the main menu look the same.
 */
function CategoryMenu() {
  // Flatten sub-items with a continuous global index so each sidebar
  // link (mm-sub-N) maps to exactly one detail panel (mm-sub-panel-N).
  const flatSubs: {
    groupSlug: string;
    idx: number;
    item: typeof NAV_MENU[number]["items"][number];
  }[] = [];
  let g = 0;
  for (const group of NAV_MENU) {
    for (const item of group.items) {
      g += 1;
      flatSubs.push({ groupSlug: group.main.slug, idx: g, item });
    }
  }

  return (
    <div className="mm-wrap relative h-full">
      <aside className="mm-l1 bg-paper border border-line rounded h-full overflow-y-auto py-2">
        {(() => {
          let n = 0;
          return NAV_MENU.map((group) => (
            <div key={group.main.slug} className="mm-cat mb-2">
              <Link
                href={`/category/${group.main.slug}`}
                className="flex justify-between items-center px-3.5 py-2 text-[13px] hover:bg-[#F5F5F5] font-semibold text-ink"
              >
                <b className="font-bold flex items-center gap-2 min-w-0">
                  <span className="text-[15px] flex-shrink-0">{group.main.icon}</span>
                  <span className="truncate">{group.main.name}</span>
                </b>
                <span className="text-mute2 text-[11px] flex-shrink-0">▸</span>
              </Link>
              <ul className="pl-7 pr-3 mt-0.5">
                {group.items.map((it) => {
                  n += 1;
                  return (
                    <li key={it.slug}>
                      <Link
                        href={`/category/${group.main.slug}/${it.slug}`}
                        className={`mm-sub mm-sub-${n} flex items-center gap-1.5 py-[3px] text-[12.5px] text-ink font-bold hover:text-brand leading-snug truncate`}
                      >
                        <span className="flex-shrink-0">{it.icon}</span>
                        <span className="truncate">{it.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ));
        })()}
      </aside>
      {/* Right panel: 860px wide. One SubItemPanel per sub-item; CSS
          reveals only the one whose .mm-sub-N is hovered (default: the
          first). Absolute left-full so it overlays the hero on hover. */}
      <div className="mm-panel absolute left-full top-0 ml-[12px] w-[860px] h-full bg-paper border border-line rounded shadow-xl z-50 grid overflow-hidden">
        {flatSubs.map(({ groupSlug, idx, item }) => (
          <div
            key={`${groupSlug}-${item.slug}`}
            className={`mm-sub-panel mm-sub-panel-${idx} row-start-1 col-start-1 h-full overflow-hidden`}
          >
            <SubItemPanel groupSlug={groupSlug} item={item} />
          </div>
        ))}
      </div>
    </div>
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
            Gửi yêu cầu đến nhiều nhà cung cấp cùng lúc. Nhận báo giá trong vòng 24 giờ.
          </p>
          <input
            name="q"
            placeholder="Sản phẩm bạn đang tìm..."
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
          <b className="block text-[15px] font-bold mb-1">🎁 Ưu đãi cho đại lý mới</b>
          <p className="text-[11.5px] opacity-90 mb-2.5 leading-snug">
            Miễn phí thẩm định nhà máy + giảm 10% đơn hàng đầu tiên + miễn phí vận chuyển DDP
          </p>
        </div>
        <Link href="/register/dealer" className="inline-block px-3.5 py-1.5 bg-gold text-brand-dark text-[12px] font-bold rounded-sm cursor-pointer">
          Đăng ký ngay →
        </Link>
      </div>
    </aside>
  );
}

export function BannerSection() {
  return (
    <section className="py-4 bg-paper max-md:py-2">
      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-[240px_1fr_240px] gap-3 items-stretch h-[504px] max-[1280px]:grid-cols-1 max-[1280px]:h-auto max-md:gap-2 max-md:px-3">
        {/* CategoryMenu ẩn trên tablet & mobile — mega-panel 860px sẽ
            tràn ngoài viewport iPad. Tablet/mobile có drawer ở NavBar. */}
        <div className="max-xl:hidden h-full relative" style={{ zIndex: 10 }}>
          <CategoryMenu />
        </div>
        <div className="relative" style={{ zIndex: 1 }}>
          <HeroSlider />
        </div>
        <RightWidgets />
      </div>
    </section>
  );
}
