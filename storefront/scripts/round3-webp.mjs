import fs from "node:fs"; import path from "node:path";
const SRC = "/app/src";

// 1. Create <Img> wrapper (drop-in, webp via <picture>, display:contents)
fs.mkdirSync(SRC + "/components/ui", { recursive: true });
fs.writeFileSync(SRC + "/components/ui/img.tsx",
`import type { ImgHTMLAttributes } from "react";

/** Drop-in <img> replacement. Serves a sibling .webp via <picture> when src is a
 *  local optimized asset (/img or /logo, .jpg/.jpeg/.png), original as fallback.
 *  display:contents keeps parent layout + CSS selectors identical to a bare <img>.
 *  Non-local / non-jpg-png / dynamic srcs render a plain <img>. */
export function Img({ src, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof src !== "string" || !/^\/(img|logo)\//.test(src) || !/\.(jpe?g|png)(\?|$)/i.test(src)) {
    return <img src={src} {...rest} />;
  }
  const webp = src.replace(/\.(jpe?g|png)(\?.*)?$/i, ".webp$2");
  return (
    <picture style={{ display: "contents" }}>
      <source srcSet={webp} type="image/webp" />
      <img src={src} {...rest} />
    </picture>
  );
}
`);
console.log("created components/ui/img.tsx");

// 2. Codemod: <img  ->  <Img  + ensure import (skip img.tsx)
const files = [];
(function walk(d){ for(const e of fs.readdirSync(d,{withFileTypes:true})){ const p=path.join(d,e.name); if(e.isDirectory()) walk(p); else if(/\.(tsx|jsx)$/.test(e.name)) files.push(p); } })(SRC);
let changed=0, tags=0;
for (const f of files) {
  if (f.endsWith("/components/ui/img.tsx")) continue;
  let s = fs.readFileSync(f, "utf8");
  if (!s.includes("<img ")) continue;
  const n = s.split("<img ").length - 1;
  s = s.split("<img ").join("<Img ");
  if (!s.includes('from "@/components/ui/img"')) {
    const imp = 'import { Img } from "@/components/ui/img";\n';
    if (/^"use client";?\s*\n/.test(s)) s = s.replace(/^("use client";?\s*\n)/, "$1" + imp);
    else s = imp + s;
  }
  fs.writeFileSync(f, s);
  changed++; tags += n;
}
console.log(`codemod: ${tags} <img> -> <Img> across ${changed} files`);

// 3. Update banner preload jpg -> webp + type (match new <picture>, avoid double-download)
{
  const p = SRC + "/components/home/banner-section.tsx";
  let s = fs.readFileSync(p, "utf8");
  const old = 'preload("/img/heroint.jpg?v=7", { as: "image", fetchPriority: "high" });';
  const neu = 'preload("/img/heroint.webp?v=7", { as: "image", fetchPriority: "high", type: "image/webp" });';
  if (s.includes(old)) { fs.writeFileSync(p, s.replace(old, neu)); console.log("  preload -> webp+type OK"); }
  else console.log("  preload SKIP not-found");
}
console.log("ROUND3 DONE");
