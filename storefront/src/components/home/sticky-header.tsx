"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV_MENU } from "@/data/home";
import { SubItemPanel } from "@/components/home/mega-submenu";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/products" },
  { label: "Nhà cung cấp", href: "/suppliers" },
  { label: "Hội chợ", href: "/trade-shows" },
  { label: "Kênh ngành", href: "/industry-channels" },
  { label: "Cảnh báo giao dịch", href: "/trade-alert" },
  { label: "Yêu cầu mua hàng", href: "/buying-request" },
  { label: "Bán trên CSR", href: "/sell-on-csr" },
];

export function StickyHeader() {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mega-menu when the user clicks outside of it.
  useEffect(() => {
    if (!menuOpen) return;
    const onDocPointer = (e: MouseEvent | TouchEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocPointer);
    document.addEventListener("touchstart", onDocPointer);
    return () => {
      document.removeEventListener("mousedown", onDocPointer);
      document.removeEventListener("touchstart", onDocPointer);
    };
  }, [menuOpen]);

  // Auto-close when the sticky bar slides back out of view.
  useEffect(() => {
    if (!show) setMenuOpen(false);
  }, [show]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-paper border-b-[3px] border-brand shadow-lg transition-transform duration-200 ${
        show ? "translate-y-0" : "-translate-y-full"
      } max-md:px-0`}
      aria-hidden={!show}
    >
      <div className="max-w-[1400px] mx-auto px-4 py-2 flex items-center gap-3 max-md:gap-2 max-md:px-2">
        {/* Logo (compact) — horizontal mark on desktop/tablet, icon-only on
            mobile (slim sticky bar prioritizes search width). */}
        <Link
          href="/"
          className="flex items-center flex-shrink-0"
          aria-label="Huayuesc — Trang chủ"
        >
          <img
            src="/logo/cybersilkroads-horizontal.png?v=5"
            alt="Huayuesc"
            width={400}
            height={200}
            className="h-9 w-auto max-md:hidden"
          />
          <img
            src="/logo/cybersilkroads-icon.png?v=5"
            alt="Huayuesc"
            width={300}
            height={300}
            className="hidden h-8 w-auto max-md:block"
          />
        </Link>

        {/* Search bar (form) */}
        <form
          action="/search"
          method="get"
          className="flex-1 flex items-center border-2 border-brand rounded-full overflow-hidden bg-white min-w-0"
        >
          <select
            name="type"
            className="px-3 py-1.5 text-[12.5px] text-mute bg-[#F5F7FA] border-r border-line outline-none cursor-pointer max-md:hidden"
            defaultValue="products"
          >
            <option value="products">Sản phẩm</option>
            <option value="suppliers">Nhà cung cấp</option>
            <option value="rfq">Yêu cầu báo giá</option>
          </select>
          <input
            name="q"
            placeholder="Nhập từ khoá để tìm sản phẩm..."
            className="flex-1 px-3 py-1.5 outline-none text-[13px] min-w-0 max-md:text-[12px]"
          />
          <button
            type="button"
            className="px-2.5 text-mute hover:text-brand cursor-pointer text-[16px] max-md:hidden"
            aria-label="Tìm bằng ảnh"
            title="Tìm bằng ảnh"
          >
            📷
          </button>
          <button
            type="submit"
            className="w-9 h-9 bg-brand text-white font-bold flex items-center justify-center hover:bg-brand-light cursor-pointer flex-shrink-0"
            aria-label="Tìm kiếm"
          >
            🔍
          </button>
        </form>

        {/* CTAs */}
        <Link
          href="/buying-request"
          className="flex items-center gap-1.5 text-[12.5px] text-accent font-semibold hover:text-[#B81827] flex-shrink-0 max-xl:hidden"
        >
          <span className="text-[16px]">📨</span>
          <span>Gửi RFQ</span>
        </Link>
        <Link
          href="/buyer-center/favorites"
          className="flex items-center gap-1.5 text-[12.5px] text-ink hover:text-brand flex-shrink-0 max-xl:hidden"
        >
          <span className="text-[16px]">🛒</span>
          <span>Giỏ hàng</span>
        </Link>
      </div>

      {/* Secondary row: condensed category nav so the sticky bar still
          surfaces primary navigation when the original NavBar is scrolled
          off-screen. Hidden on tablet/mobile to keep sticky height slim.

          The "TẤT CẢ DANH MỤC" trigger reuses the same mm-root/mm-wrap
          pattern as the original NavBar so hovering reveals the full
          mega-menu (2 main categories × N sub-items + a right-side
          SubItemPanel for the hovered sub). globals.css :has() rules are
          scoped per .mm-wrap, so this instance and the NavBar instance
          don't interfere with each other. */}
      <nav className="bg-brand text-white max-xl:hidden">
        {/* No overflow-x:auto here — that creates a containing block that
            clips the absolutely-positioned mm-wrap dropdown on its Y axis
            (overflow-x:auto implicitly sets overflow-y:auto), so hovering
            the dropdown body would never re-trigger .mm-root:hover. The
            xl: breakpoint guarantees the nav fits without scrolling. */}
        <div className="max-w-[1400px] mx-auto px-4 flex items-stretch gap-0">
          <div className="mm-root relative flex-shrink-0" ref={menuRef}>
            {/* Hover uses CSS :hover from globals.css (.mm-root:hover
                .mm-wrap → visibility:visible). CSS :hover correctly
                tracks descendants regardless of bounding-box overlap,
                so moving from the trigger down into the absolute
                dropdown works reliably. JS mouseenter/mouseleave don't,
                because the dropdown is visibility:hidden when the cursor
                arrives, so it never fires mouseenter.
                Click toggles React state for touch users; when menuOpen
                is true the inline style sticks the dropdown open until
                the user clicks outside. */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className={`px-4 py-2 text-white flex items-center gap-2 font-bold text-[12.5px] cursor-pointer h-full transition-colors ${
                menuOpen ? "bg-brand" : "bg-brand-dark hover:bg-brand"
              }`}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <span>☰</span> TẤT CẢ DANH MỤC{" "}
              <span className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}>▾</span>
            </button>
            <div
              className="mm-wrap absolute top-full left-0 flex items-stretch bg-paper text-ink border border-line shadow-lg z-40"
              style={menuOpen ? { visibility: "visible", opacity: 1, transform: "translateY(0)" } : undefined}
            >
              <aside className="mm-l1 w-[260px] border-r border-line py-2">
                {(() => {
                  let n = 0;
                  return NAV_MENU.map((group) => (
                    <div key={group.main.slug} className="mm-cat mb-2">
                      <Link
                        href={`/category/${group.main.slug}`}
                        className="flex justify-between items-center px-4 py-2 text-[13px] hover:bg-[#F5F5F5] font-semibold text-ink"
                      >
                        <b className="font-bold">{group.main.icon} {group.main.name}</b>
                        <span className="text-mute2 text-[11px]">▸</span>
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
              <div className="mm-panel w-[860px] grid">
                {(() => {
                  let idx = 0;
                  return NAV_MENU.flatMap((group) =>
                    group.items.map((item) => {
                      idx += 1;
                      return (
                        <div
                          key={`${group.main.slug}-${item.slug}`}
                          className={`mm-sub-panel mm-sub-panel-${idx} row-start-1 col-start-1`}
                        >
                          <SubItemPanel groupSlug={group.main.slug} item={item} />
                        </div>
                      );
                    })
                  );
                })()}
              </div>
            </div>
          </div>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="px-3.5 py-2 text-white text-[12.5px] font-medium border-b-[2px] border-transparent -mb-[2px] hover:bg-brand-dark hover:border-b-gold whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/factory-tour"
            className="px-3.5 py-2 text-gold text-[12.5px] font-medium border-b-[2px] border-transparent -mb-[2px] hover:bg-brand-dark hover:border-b-gold whitespace-nowrap"
          >
            🔥 Tham quan nhà máy
          </Link>
        </div>
      </nav>
    </div>
  );
}
