import Link from "next/link";
import { NAV_MENU } from "@/data/home";
import { HeroSlider } from "@/components/home/hero-slider";

/**
 * BannerSection sidebar — same mega-menu pattern as NavBar dropdown.
 * Hovering a sub-item in mm-l1 reveals its dedicated mm-sub-panel-N
 * positioned to the right (absolute, overlays the hero).
 */
function CategoryMenu() {
  const flatSubs: { groupSlug: string; idx: number; item: typeof NAV_MENU[number]["items"][number] }[] = [];
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
                <b className="font-bold">{group.main.icon} {group.main.name}</b>
                <span className="text-mute2 text-[11px]">▸</span>
              </Link>
              <ul className="pl-6 pr-2">
                {group.items.map((it) => {
                  n += 1;
                  return (
                    <li key={it.slug}>
                      <Link
                        href={`/category/${group.main.slug}/${it.slug}`}
                        className={`mm-sub mm-sub-${n} block py-[3px] text-[12px] text-accent hover:text-brand hover:font-semibold leading-snug truncate`}
                      >
                        - {it.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ));
        })()}
      </aside>
      {/* Panel: absolute, pops out to the right of sidebar (240px),
          overlays hero area. 720px wide, full sidebar height with scroll. */}
      <div className="mm-panel absolute left-full top-0 ml-[12px] w-[720px] h-full bg-paper border border-line rounded shadow-xl z-50 grid overflow-hidden">
        {flatSubs.map(({ groupSlug, idx, item }) => (
          <div
            key={`${groupSlug}-${item.slug}`}
            className={`mm-sub-panel mm-sub-panel-${idx} row-start-1 col-start-1 p-4 overflow-y-auto`}
          >
            <Link
              href={`/category/${groupSlug}/${item.slug}`}
              className="block relative aspect-[16/6] rounded overflow-hidden mb-3 group/hero"
            >
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover/hero:scale-105 transition-transform" loading="lazy" />
              <div
                className="absolute inset-0 px-4 py-3 flex flex-col justify-end text-white"
                style={{ background: "linear-gradient(180deg, rgba(0,37,87,0.0) 40%, rgba(0,37,87,0.85) 100%)" }}
              >
                <h3 className="text-[15px] font-bold leading-tight">{item.name}</h3>
                <p className="text-[11px] opacity-90 leading-snug line-clamp-2 mt-0.5">
                  {item.tagline}
                </p>
              </div>
            </Link>
            <div className="grid grid-cols-3 gap-2.5">
              {item.highlights.slice(0, 6).map((h) => (
                <Link
                  key={h.name}
                  href={
                    h.slug
                      ? `/category/${groupSlug}/${h.slug}`
                      : `/category/${groupSlug}/${item.slug}`
                  }
                  className="group/h flex flex-col"
                >
                  <div className="aspect-square bg-[#F5F5F5] rounded-sm overflow-hidden border border-line group-hover/h:border-brand transition-colors">
                    <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover/h:scale-105 transition-transform" loading="lazy" />
                  </div>
                  <span className="text-[11px] text-ink group-hover/h:text-brand mt-1 leading-snug line-clamp-2">
                    {h.name}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-3 pt-2 border-t border-line flex justify-between items-center">
              <span className="text-[10.5px] text-mute">{item.highlights.length}+ sản phẩm</span>
              <Link
                href={`/category/${groupSlug}/${item.slug}`}
                className="text-[11.5px] text-accent font-semibold hover:underline"
              >
                Xem toàn bộ {item.name} →
              </Link>
            </div>
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
        <div className="max-xl:hidden h-full relative z-50">
          <CategoryMenu />
        </div>
        <HeroSlider />
        <RightWidgets />
      </div>
    </section>
  );
}
