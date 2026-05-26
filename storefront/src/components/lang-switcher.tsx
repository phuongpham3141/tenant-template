"use client";

import { useEffect, useState } from "react";
import {
  LOCALE_LIST,
  detectLocaleFromHost,
  localeHref,
  type LocaleCode,
} from "@/lib/i18n";

/**
 * Language + currency switcher — subdomain-aware.
 *
 * Reads `window.location.host` on the client to build cross-subdomain
 * URLs (e.g. clicking 🇬🇧 from shop.huayuesc.local jumps to
 * en.huayuesc.local). During SSR / first paint we render the buttons
 * with the path-only fallback; the real cross-host hrefs upgrade on
 * hydration via useEffect.
 */

type Variant = "trigger" | "compact" | "full";

export function LangSwitcher({ variant = "full" }: { variant?: Variant }) {
  const [host, setHost] = useState<string | null>(null);
  const [path, setPath] = useState<string>("/");

  useEffect(() => {
    setHost(window.location.host);
    setPath(window.location.pathname || "/");
  }, []);

  const active: LocaleCode = detectLocaleFromHost(host);

  if (variant === "trigger") {
    const cur = LOCALE_LIST.find((l) => l.code === active)!;
    return (
      <span>
        {cur.shortLabel} <span className="opacity-60">·</span> {cur.currency}
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-1.5">
        {LOCALE_LIST.map((l) => {
          const isActive = l.code === active;
          return (
            <a
              key={l.code}
              href={localeHref(l.code, path, host)}
              hrefLang={l.code}
              aria-current={isActive ? "true" : undefined}
              className={`px-2 py-1 text-[11px] font-semibold rounded-sm border transition cursor-pointer ${
                isActive
                  ? "bg-gold text-brand-dark border-gold"
                  : "bg-transparent text-white/80 border-white/30 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="mr-1">{l.flag}</span>
              {l.shortLabel}
            </a>
          );
        })}
      </div>
    );
  }

  // Full variant: language + currency grids inside the header dropdown
  return (
    <div className="p-4 space-y-3">
      <div>
        <div className="text-[11px] text-mute uppercase tracking-wider mb-1.5">
          Ngôn ngữ
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {LOCALE_LIST.map((l) => {
            const isActive = l.code === active;
            return (
              <a
                key={l.code}
                href={localeHref(l.code, path, host)}
                hrefLang={l.code}
                aria-current={isActive ? "true" : undefined}
                className={`px-2.5 py-1.5 text-[12px] rounded-sm cursor-pointer text-center font-semibold transition ${
                  isActive
                    ? "border-2 border-brand bg-brand/5 text-brand"
                    : "border border-line text-ink hover:border-brand"
                }`}
              >
                {l.flag} {l.label}
              </a>
            );
          })}
        </div>
      </div>
      <div>
        <div className="text-[11px] text-mute uppercase tracking-wider mb-1.5">
          Tiền tệ
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {LOCALE_LIST.map((l) => {
            const isActive = l.code === active;
            return (
              <a
                key={l.code}
                href={localeHref(l.code, path, host)}
                hrefLang={l.code}
                className={`px-2 py-1.5 text-[12px] rounded-sm cursor-pointer text-center font-semibold transition ${
                  isActive
                    ? "border-2 border-brand bg-brand/5 text-brand"
                    : "border border-line text-ink hover:border-brand"
                }`}
              >
                {l.currency}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
