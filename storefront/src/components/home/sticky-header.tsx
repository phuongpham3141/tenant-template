"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          off-screen. Hidden on tablet/mobile to keep sticky height slim. */}
      <nav className="bg-brand text-white max-xl:hidden">
        <div className="max-w-[1400px] mx-auto px-4 flex items-stretch gap-0 overflow-x-auto">
          <Link
            href="/category"
            className="px-4 py-2 bg-brand-dark text-white flex items-center gap-2 font-bold text-[12.5px] cursor-pointer flex-shrink-0"
          >
            <span>☰</span> TẤT CẢ DANH MỤC
          </Link>
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
