"use client";

import Link from "next/link";
import { useRef } from "react";

export type CarouselItem = {
  name: string;
  image: string;
  href: string;
};

export function MegaCarousel({ items }: { items: CarouselItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    // Scroll by ~5 cards at a time (each ~76px wide + gap)
    el.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Cuộn trái"
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-paper border border-line shadow-sm flex items-center justify-center text-[14px] text-ink hover:bg-brand hover:text-white hover:border-brand cursor-pointer"
      >
        ‹
      </button>
      <div
        ref={trackRef}
        className="overflow-x-auto flex gap-2.5 px-9 scroll-smooth snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it, i) => (
          <Link
            key={`${it.href}-${i}`}
            href={it.href}
            className="flex-shrink-0 w-[68px] text-center snap-start group/cm"
          >
            <div className="w-[68px] h-[68px] bg-surface-1 rounded overflow-hidden border border-line">
              <img
                src={it.image}
                alt={it.name}
                className="w-full h-full object-cover group-hover/cm:scale-105 transition-transform"
                loading="lazy"
              />
            </div>
            <span className="block text-[10px] text-ink mt-1 leading-tight line-clamp-2 group-hover/cm:text-brand h-7">
              {it.name}
            </span>
          </Link>
        ))}
      </div>
      <button
        type="button"
        aria-label="Cuộn phải"
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-paper border border-line shadow-sm flex items-center justify-center text-[14px] text-ink hover:bg-brand hover:text-white hover:border-brand cursor-pointer"
      >
        ›
      </button>
    </div>
  );
}
