"use client";

import { Img } from "@/components/ui/img";
import Link from "@/components/i18n-link";
import { useEffect, useRef, useState } from "react";
import { NAV_MENU } from "@/data/nav";
import { useT } from "@/components/i18n-provider";

const NAV_LINKS: { key: string; href: string }[] = [
  { key: "nav.home", href: "/" },
  { key: "nav.products", href: "/products" },
  { key: "nav.suppliers", href: "/suppliers" },
  { key: "nav.tradeShows", href: "/trade-shows" },
  { key: "nav.industryChannels", href: "/industry-channels" },
  { key: "nav.tradeAlert", href: "/trade-alert" },
  { key: "nav.buyingRequest", href: "/buying-request" },
  { key: "nav.sellOnCsr", href: "/sell-on-csr" },
];

export function StickyHeader() {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useT();

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
          <Img loading="lazy" decoding="async"
            src="/logo/cybersilkroads-horizontal.png?v=6"
            alt="Huayuesc"
            width={400}
            height={200}
            className="h-9 w-auto max-md:hidden"
          />
          <Img loading="lazy" decoding="async"
            src="/logo/cybersilkroads-icon.png?v=6"
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
            <option value="products">{t("common.tabProducts")}</option>
            <option value="suppliers">{t("common.tabSuppliers")}</option>
            <option value="rfq">{t("common.tabQuote")}</option>
          </select>
          <input
            name="q"
            placeholder={t("common.searchPlaceholder")}
            className="flex-1 px-3 py-1.5 outline-none text-[13px] min-w-0 max-md:text-[12px]"
          />
          <button
            type="button"
            className="px-2.5 text-mute hover:text-brand cursor-pointer text-[16px] max-md:hidden"
            aria-label={t("common.searchByImage")}
            title={t("common.searchByImage")}
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
          <span>{t("common.sendRfq")}</span>
        </Link>
        <Link
          href="/buyer-center/favorites"
          className="flex items-center gap-1.5 text-[12.5px] text-ink hover:text-brand flex-shrink-0 max-xl:hidden"
        >
          <span className="text-[16px]">🛒</span>
          <span>{t("common.cart")}</span>
        </Link>
      </div>

      {/* Secondary row: condensed category nav so the sticky bar still
          surfaces primary navigation when the original NavBar is scrolled
          off-screen. Hidden on tablet/mobile to keep sticky height slim.

          The "ALL CATEGORIES" trigger reuses the same mm-root/mm-wrap
          pattern as the original NavBar — a clean list of the 8 main
          categories (mm-cat-N); hovering one reveals its
          CategoryOverviewPanel (mm-cat-panel-N). globals.css :has() rules
          are scoped per .mm-wrap, so this instance and the NavBar instance
          don't interfere with each other. */}
      <nav className="bg-brand text-white max-xl:hidden">
        <div className="max-w-[1400px] mx-auto px-4 flex items-stretch gap-0">
          <div className="mm-root relative flex-shrink-0" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className={`px-4 py-2 text-white flex items-center gap-2 font-bold text-[12.5px] cursor-pointer h-full transition-colors ${
                menuOpen ? "bg-brand" : "bg-brand-dark hover:bg-brand"
              }`}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <span>☰</span> {t("nav.allCategories")}{" "}
              <span className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}>▾</span>
            </button>
            <div
              className="mm-wrap absolute top-full left-0 flex items-stretch bg-paper text-ink border border-line shadow-lg z-40"
              style={menuOpen ? { visibility: "visible", opacity: 1, transform: "translateY(0)" } : undefined}
            >
              <aside className="mm-l1 w-[260px] border-r border-line">
                {NAV_MENU.map((group, idx) => (
                  <Link
                    key={group.main.slug}
                    href={`/category/${group.main.slug}`}
                    className={`mm-cat mm-cat-${idx + 1} flex justify-between items-center px-3.5 py-2.5 text-[13px] hover:bg-[#F5F5F5] font-semibold text-ink border-b border-[#F5F5F5] last:border-0`}
                  >
                    <b className="font-bold flex items-center gap-2 min-w-0">
                      <span className="text-[16px] flex-shrink-0">{group.main.icon}</span>
                      <span className="truncate">{t(`cat.${group.main.slug}`)}</span>
                    </b>
                    <span className="text-mute2 text-[11px] flex-shrink-0">▸</span>
                  </Link>
                ))}
              </aside>
            </div>
          </div>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className="px-3.5 py-2 text-white text-[12.5px] font-medium border-b-[2px] border-transparent -mb-[2px] hover:bg-brand-dark hover:border-b-gold whitespace-nowrap"
            >
              {t(l.key)}
            </Link>
          ))}
          <Link
            href="/factory-tour"
            className="px-3.5 py-2 text-gold text-[12.5px] font-medium border-b-[2px] border-transparent -mb-[2px] hover:bg-brand-dark hover:border-b-gold whitespace-nowrap"
          >
            🔥 {t("nav.factoryTour")}
          </Link>
        </div>
      </nav>
    </div>
  );
}
