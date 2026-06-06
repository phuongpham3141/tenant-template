import fs from "node:fs";
const R = "/app";
const read = (p) => fs.readFileSync(R + p, "utf8");
const write = (p, s) => fs.writeFileSync(R + p, s);
function repl(p, oldS, newS, opts = {}) {
  let s = read(p);
  const n = s.split(oldS).length - 1;
  if (n === 0) { console.log("  SKIP not-found:", p, "::", JSON.stringify(oldS.slice(0, 48))); return; }
  if (!opts.all && n > 1) console.log("  WARN multiple(" + n + "):", p);
  s = opts.all ? s.split(oldS).join(newS) : s.replace(oldS, newS);
  write(p, s);
  console.log("  OK(" + n + "):", p, "::", oldS.slice(0, 38).replace(/\n/g, "\n"));
}

// 1. Extract nav region -> data/nav.ts
{
  const p = "/src/data/home.ts";
  const lines = read(p).split("\n");
  const iStart = lines.findIndex((l) => l.startsWith("export const HOT_SEARCHES"));
  const iNav = lines.findIndex((l) => l.startsWith("export const NAV_MENU"));
  let iEnd = -1;
  for (let i = iNav; i < lines.length; i++) { if (lines[i] === "];") { iEnd = i; break; } }
  if (iStart < 0 || iNav < 0 || iEnd < 0) { console.log("  FATAL nav-extract idx:", iStart, iNav, iEnd); }
  else {
    const region = lines.slice(iStart, iEnd + 1).join("\n");
    write("/src/data/nav.ts",
      "// Navigation constants (HOT_SEARCHES, NAV_CATEGORIES, NavSubItem, NAV_MENU).\n" +
      "// FREE of any @/data/partners import so client components (sticky-header)\n" +
      "// can import these WITHOUT dragging the ~1.5MB product catalog into client JS.\n\n" +
      region + "\n");
    const reexport = 'export { HOT_SEARCHES, NAV_CATEGORIES, NAV_MENU } from "./nav";\nexport type { NavSubItem } from "./nav";';
    write(p, lines.slice(0, iStart).concat([reexport], lines.slice(iEnd + 1)).join("\n"));
    console.log("  OK nav.ts extracted lines", iStart + 1, "-", iEnd + 1, "(" + (iEnd - iStart + 1) + " lines)");
  }
}

// 2. Repoint client importers
repl("/src/components/home/sticky-header.tsx", 'import { NAV_MENU } from "@/data/home";', 'import { NAV_MENU } from "@/data/nav";');
repl("/src/components/home/mega-submenu.tsx", 'import type { NavSubItem, NAV_MENU } from "@/data/home";', 'import type { NavSubItem, NAV_MENU } from "@/data/nav";');

// 3. i18n-provider: drop 262KB vi catalog from client bundle
repl("/src/components/i18n-provider.tsx", '\nimport { vi } from "@/messages/vi";', '');
repl("/src/components/i18n-provider.tsx", '{ messages: vi, locale: "vi" }', '{ messages: {} as Messages, locale: "vi" }');

// 4. banner-section: preload hero (LCP)
repl("/src/components/home/banner-section.tsx", 'import Link from "@/components/i18n-link";', 'import Link from "@/components/i18n-link";\nimport { preload } from "react-dom";');
repl("/src/components/home/banner-section.tsx", 'export function BannerSection() {\n  return (', 'export function BannerSection() {\n  preload("/img/heroint.jpg?v=7", { as: "image", fetchPriority: "high" });\n  return (');

// 5. hero-slider: width/height (CLS) + tablet aspect-ratio (collapse fix)
repl("/src/components/home/hero-slider.tsx", 'fetchPriority={i === 0 ? "high" : "auto"} decoding="async"', 'fetchPriority={i === 0 ? "high" : "auto"} decoding="async" width={1536} height={1024}');
repl("/src/components/home/hero-slider.tsx", 'max-md:h-auto max-md:aspect-[5/4]', 'max-xl:h-auto max-xl:aspect-[5/4]');

// 6. header logos: above-fold -> eager, low priority
repl("/src/components/home/header.tsx", '<img loading="lazy" decoding="async"', '<img loading="eager" fetchPriority="low" decoding="async"', { all: true });

console.log("ROUND2 DONE");
