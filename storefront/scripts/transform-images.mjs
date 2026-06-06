import fs from "node:fs";
import path from "node:path";
const SRC = "/app/src";
const files = [];
(function walk(d){ for (const e of fs.readdirSync(d,{withFileTypes:true})){ const p=path.join(d,e.name); if (e.isDirectory()) walk(p); else if (/\.(tsx|jsx)$/.test(e.name)) files.push(p); } })(SRC);

let imgCount=0, fileCount=0;
for (const f of files) {
  const s = fs.readFileSync(f,"utf8");
  const isHero = f.endsWith("hero-slider.tsx");
  let out="", idx=0;
  while (true) {
    const m = s.indexOf("<img", idx);
    if (m < 0) { out += s.slice(idx); break; }
    out += s.slice(idx, m+4);
    const end = s.indexOf(">", m+4);
    if (end < 0) { out += s.slice(m+4); break; }
    let tag = s.slice(m+4, end);
    if (!/\bloading[=\s]/.test(tag)) {
      let ins = isHero
        ? " loading={i === 0 ? \"eager\" : \"lazy\"} fetchPriority={i === 0 ? \"high\" : \"auto\"}"
        : " loading=\"lazy\"";
      if (!/\bdecoding[=\s]/.test(tag)) ins += " decoding=\"async\"";
      tag = ins + tag;
      imgCount++;
    }
    out += tag;
    idx = end;
  }
  if (out !== s) { fs.writeFileSync(f, out); fileCount++; }
}
console.log(`added loading to ${imgCount} <img> across ${fileCount} files`);
