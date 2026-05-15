"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type PointerEvent } from "react";

type HeroSlide = {
  badge: string;
  titleStart: string;
  titleGold: string;
  titleEnd: string;
  desc: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  image: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    badge: "⚡ Canton Fair 2026",
    titleStart: "Tìm nhà máy tốt nhất\ntừ ",
    titleGold: "Trung Quốc",
    titleEnd: ".",
    desc: "2,400+ sản phẩm từ 40+ nhà máy đã được kiểm định. Báo giá trực tiếp, không qua trung gian.",
    primary: { label: "📨 Gửi yêu cầu báo giá", href: "/buying-request" },
    secondary: { label: "🏭 Xem nhà máy →", href: "/suppliers" },
    image: "/img/heroint.jpg?v=2",
  },
  {
    badge: "🎁 Ưu đãi buyer mới",
    titleStart: "Audit nhà máy ",
    titleGold: "miễn phí",
    titleEnd: "\n+ giảm 10% đơn đầu.",
    desc: "Đăng ký buyer mới nhận audit nhà máy trị giá $300 miễn phí, miễn phí vận chuyển DDP và giảm 10% đơn hàng đầu tiên.",
    primary: { label: "🎁 Đăng ký Người mua", href: "/register/buyer" },
    secondary: { label: "Tìm hiểu thêm →", href: "/info/gold-membership" },
    image: "/img/hero-buyer-promo.jpg?v=2",
  },
  {
    badge: "📹 Smart Expo Online",
    titleStart: "Tham quan ",
    titleGold: "nhà máy 360°",
    titleEnd: "\nkhông cần bay.",
    desc: "Live video factory tour, gặp QC manager, xem dây chuyền sản xuất real-time. Tiết kiệm 5-7 ngày so với đi thực tế.",
    primary: { label: "🏭 Tham quan ngay", href: "/factory-tour" },
    secondary: { label: "Đặt lịch tour →", href: "/buyer-center/meet-suppliers" },
    image: "/img/hero-factory-tour.jpg?v=2",
  },
  {
    badge: "🚢 Logistics DDP",
    titleStart: "DDP tận kho ",
    titleGold: "Hà Nội/HCM",
    titleEnd: "\ntrong 18 ngày.",
    desc: "Trọn gói: vận chuyển + thuế + thông quan. LCL/FCL từ Quảng Châu, Ninh Ba, Hạ Môn. Báo giá cước trong 1h.",
    primary: { label: "💰 Tính cước DDP", href: "/info/ddp-calculator" },
    secondary: { label: "Xem cảng đi →", href: "/info/shipping-policy" },
    image: "/img/hero-ddp-logistics.jpg?v=2",
  },
];

const AUTO_INTERVAL = 3000;
const SWIPE_THRESHOLD = 50;
const N = HERO_SLIDES.length;

export function HeroSlider() {
  const radiosRef = useRef<(HTMLInputElement | null)[]>([]);
  const [paused, setPaused] = useState(false);
  const pointerStartX = useRef<number | null>(null);

  const goTo = (idx: number) => {
    const safe = ((idx % N) + N) % N;
    for (let i = 0; i < N; i++) {
      const r = radiosRef.current[i];
      if (r) r.checked = i === safe;
    }
  };
  const currentIdx = () => {
    const i = radiosRef.current.findIndex((r) => r?.checked);
    return i < 0 ? 0 : i;
  };

  // Auto-rotate every 3s — JS only, pause when user is hovering
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goTo(currentIdx() + 1), AUTO_INTERVAL);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  // Swipe gestures (pointer = mouse + touch unified)
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = e.clientX;
    setPaused(true);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const dx = e.clientX - pointerStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      goTo(dx < 0 ? currentIdx() + 1 : currentIdx() - 1);
    }
    pointerStartX.current = null;
    setTimeout(() => setPaused(false), 250);
  };
  const onPointerCancel = () => {
    pointerStartX.current = null;
    setPaused(false);
  };

  return (
    <div
      className="hero-root group/hero relative rounded overflow-hidden h-full bg-brand-dark touch-pan-y select-none max-md:h-auto max-md:aspect-[5/4]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      {/* Hidden radios. CSS :has(#hs-N:checked) drives:
          - slide visibility (.hero-slide-N)
          - active dot styling (.hero-dot-N)
          - which prev/next pair is shown (.hero-prev-N, .hero-next-N) */}
      {HERO_SLIDES.map((_, i) => (
        <input
          key={`r-${i}`}
          ref={(el) => {
            radiosRef.current[i] = el;
          }}
          type="radio"
          name="hs"
          id={`hs-${i + 1}`}
          defaultChecked={i === 0}
          className="hidden"
        />
      ))}

      {/* Slides stacked at inset:0 */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={`slide-${i}`}
          className={`hero-slide hero-slide-${i + 1} absolute inset-0`}
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover opacity-70 pointer-events-none"
            draggable={false}
          />
          <div
            className="absolute inset-0 px-12 py-10 flex flex-col justify-center text-white max-md:px-4 max-md:py-4"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,37,87,0.9), rgba(0,37,87,0.3))",
            }}
          >
            <span className="inline-block self-start bg-gold text-brand-dark px-3 py-1 rounded-sm text-[11px] font-bold tracking-wider uppercase mb-3.5">
              {slide.badge}
            </span>
            <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-tight mb-3.5 whitespace-pre-line max-md:text-[24px]">
              {slide.titleStart}
              <span className="text-gold">{slide.titleGold}</span>
              {slide.titleEnd}
            </h1>
            <p className="text-[14px] opacity-90 max-w-[440px] mb-5 max-md:text-[12.5px]">
              {slide.desc}
            </p>
            <div className="flex gap-2.5 max-md:flex-col max-md:gap-2 max-md:w-full">
              <Link
                href={slide.primary.href}
                className="px-6 py-3 font-semibold text-[13.5px] rounded-sm bg-gold text-brand-dark text-center cursor-pointer hover:bg-warm max-md:px-4 max-md:py-2.5 max-md:text-[12.5px]"
              >
                {slide.primary.label}
              </Link>
              <Link
                href={slide.secondary.href}
                className="px-6 py-3 font-semibold text-[13.5px] rounded-sm bg-white/15 text-white border border-white/30 text-center cursor-pointer hover:bg-white/25 max-md:px-4 max-md:py-2.5 max-md:text-[12.5px]"
              >
                {slide.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Prev/Next as label-htmlFor pairs (pure CSS, no JS dependency).
          For each slide N, render one prev (→ N-1) and one next (→ N+1).
          CSS shows only the pair matching the currently :checked radio. */}
      {HERO_SLIDES.map((_, i) => {
        const idx = i + 1;
        const prevTarget = ((i - 1 + N) % N) + 1;
        const nextTarget = ((i + 1) % N) + 1;
        return (
          <Fragment key={`nav-${idx}`}>
            <label
              htmlFor={`hs-${prevTarget}`}
              aria-label="Slide trước"
              className={`hero-prev hero-prev-${idx} absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-md bg-black/40 backdrop-blur-sm text-white text-[22px] font-bold items-center justify-center cursor-pointer hover:bg-black/60 transition-opacity max-md:w-9 max-md:h-9 max-md:text-[18px]`}
            >
              ‹
            </label>
            <label
              htmlFor={`hs-${nextTarget}`}
              aria-label="Slide sau"
              className={`hero-next hero-next-${idx} absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-md bg-black/40 backdrop-blur-sm text-white text-[22px] font-bold items-center justify-center cursor-pointer hover:bg-black/60 transition-opacity max-md:w-9 max-md:h-9 max-md:text-[18px]`}
            >
              ›
            </label>
          </Fragment>
        );
      })}

      {/* Dots: pure CSS via labels htmlFor */}
      <div className="absolute bottom-5 left-12 flex gap-2 z-20 max-md:left-5 max-md:bottom-3">
        {HERO_SLIDES.map((_, i) => (
          <label
            key={i}
            htmlFor={`hs-${i + 1}`}
            aria-label={`Slide ${i + 1}`}
            className={`hero-dot hero-dot-${i + 1} h-[3px] rounded-sm cursor-pointer transition-all`}
          />
        ))}
      </div>
    </div>
  );
}
