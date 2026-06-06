import fs from "node:fs";
import path from "node:path";
const BS = String.fromCharCode(92);
const DIRS = ["/work/src/data", "/work/src/data/catalogs"];
const VI_RE = /[À-ɏḀ-ỿ]/;
function extractStrings(src) {
  const out = [];
  for (let i = 0; i < src.length; i++) {
    if (src[i] !== '"') continue;
    let j = i + 1, buf = "";
    while (j < src.length) {
      const c = src[j];
      if (c === BS) { buf += src[j] + (src[j + 1] || ""); j += 2; continue; }
      if (c === '"') break;
      if (c === "\n") { buf = null; break; }
      buf += c; j++;
    }
    if (buf) out.push(buf);
    i = j;
  }
  return out;
}
const set = new Set();
try { for (const k of Object.keys(JSON.parse(fs.readFileSync("/work/scripts/gen-out/data-vi.json", "utf8")))) set.add(k); } catch {}
const before = set.size;
for (const d of DIRS) {
  if (!fs.existsSync(d)) continue;
  for (const e of fs.readdirSync(d)) {
    if (!e.endsWith(".ts")) continue;
    const src = fs.readFileSync(path.join(d, e), "utf8");
    for (const raw of extractStrings(src)) {
      if (!VI_RE.test(raw)) continue;
      let v;
      try { v = JSON.parse('"' + raw + '"'); } catch { continue; }
      v = v.trim();
      if (!v) continue;
      if (/^https?:\/\//.test(v)) continue;
      if (/^\/(img|logo)\//.test(v)) continue;
      if (/\.(jpg|jpeg|png|webp|svg|gif)(\?|$)/i.test(v)) continue;
      set.add(v);
    }
  }
}
const obj = {};
for (const s of [...set]) obj[s] = s;
fs.writeFileSync("/work/scripts/gen-out/data-vi.json", JSON.stringify(obj, null, 2));
console.log("seed", before, "-> total", set.size, "| NEW (escaped-quote strings)", set.size - before);
