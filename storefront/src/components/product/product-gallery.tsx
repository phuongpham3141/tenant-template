"use client";

import { useCallback, useEffect, useState } from "react";

type Props = {
  images: string[];
  alt: string;
};

/**
 * Image gallery for the product detail page.
 *
 * - Click main image → open full-screen lightbox modal
 * - Thumbnail row below switches the main image (highlights active)
 * - In lightbox: keyboard ← → Esc, click outside to close
 */
export function ProductGallery({ images, alt }: Props) {
  const safe = images.filter(Boolean);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(
    () => setActive((i) => (i - 1 + safe.length) % safe.length),
    [safe.length]
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % safe.length),
    [safe.length]
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [lightbox, prev, next]);

  if (safe.length === 0) {
    return (
      <div className="aspect-[4/3] bg-bg border border-line rounded-lg flex items-center justify-center text-[80px] text-mute2">
        📦
      </div>
    );
  }

  return (
    <>
      {/* Main image — click to zoom */}
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="block w-full aspect-[4/3] bg-bg border border-line rounded-lg overflow-hidden relative group cursor-zoom-in"
        aria-label="打开放大查看"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={safe[active]}
          alt={`${alt} — 图片 ${active + 1}`}
          className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        <span className="absolute bottom-2 right-2 bg-black/55 text-white text-[11px] px-2 py-1 rounded backdrop-blur-sm flex items-center gap-1">
          🔍 点击放大
        </span>
        {safe.length > 1 && (
          <span className="absolute top-2 right-2 bg-black/55 text-white text-[11px] px-2 py-0.5 rounded backdrop-blur-sm">
            {active + 1} / {safe.length}
          </span>
        )}
      </button>

      {/* Thumbnails */}
      {safe.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mt-3">
          {safe.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={
                "aspect-square w-full overflow-hidden rounded border-2 transition-all " +
                (i === active
                  ? "border-brand shadow-sm"
                  : "border-line hover:border-brand/50 opacity-80 hover:opacity-100")
              }
              aria-label={`查看图片 ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-[20px] flex items-center justify-center backdrop-blur transition-colors"
            aria-label="关闭"
          >
            ✕
          </button>

          {/* Counter */}
          {safe.length > 1 && (
            <div className="absolute top-4 left-4 bg-white/10 backdrop-blur text-white text-[13px] px-3 py-1.5 rounded">
              {active + 1} / {safe.length}
            </div>
          )}

          {/* Prev / Next */}
          {safe.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-[24px] flex items-center justify-center backdrop-blur transition-colors"
                aria-label="上一张"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-[24px] flex items-center justify-center backdrop-blur transition-colors"
                aria-label="下一张"
              >
                ›
              </button>
            </>
          )}

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={safe[active]}
            alt={`${alt} — 放大`}
            className="max-w-[92vw] max-h-[88vh] object-contain"
            referrerPolicy="no-referrer"
          />

          {/* Caption */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur text-white text-[12.5px] px-3 py-1.5 rounded max-w-[80%] truncate">
            {alt}
          </div>
        </div>
      )}
    </>
  );
}
