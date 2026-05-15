"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyHeader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-paper border-b border-line shadow-md transition-transform duration-200 ${
        show ? "translate-y-0" : "-translate-y-full"
      } max-md:px-2`}
      aria-hidden={!show}
    >
      <div className="max-w-[1400px] mx-auto px-4 py-2 flex items-center gap-3 max-md:gap-2 max-md:px-2">
        {/* Logo (compact) — horizontal mark on desktop/tablet, icon-only on
            mobile (slim sticky bar prioritizes search width). */}
        <Link
          href="/"
          className="flex items-center flex-shrink-0"
          aria-label="Cybersilkroads — Trang chủ"
        >
          <img
            src="/logo/cybersilkroads-horizontal.png?v=5"
            alt="Cybersilkroads"
            width={400}
            height={200}
            className="h-9 w-auto max-md:hidden"
          />
          <img
            src="/logo/cybersilkroads-icon.png?v=5"
            alt="Cybersilkroads"
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
            className="px-3 py-1.5 text-[12.5px] text-mute bg-surface-3 border-r border-line outline-none cursor-pointer max-md:hidden"
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
    </div>
  );
}
