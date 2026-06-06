import fs from "node:fs";
import path from "node:path";
const BS = String.fromCharCode(92);
const DIRS = ["/work/src/data", "/work/src/app", "/work/src/lib", "/work/src/components"];
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
const files = [];
function walk(d) {
  if (!fs.existsSync(d)) return;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(e.name)) files.push(p);
  }
}
for (const d of DIRS) walk(d);
const set = new Set();
try { for (const k of Object.keys(JSON.parse(fs.readFileSync("/work/scripts/gen-out/data-vi.json", "utf8")))) set.add(k); } catch {}
const before = set.size;
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  for (const raw of extractStrings(src)) {
    if (!VI_RE.test(raw)) continue;
    let v;
    try { v = JSON.parse('"' + raw + '"'); } catch { continue; }
    v = v.trim();
    if (!v) continue;
    if (/^https?:\/\//.test(v)) continue;
    if (/^\/(img|logo)\//.test(v)) continue;
    if (/\.(jpg|jpeg|png|webp|svg|gif)(\?|$)/i.test(v)) continue;
    if (/^[a-z0-9_]+\.[a-z0-9_.]+$/i.test(v)) continue;   // dotted t() keys
    set.add(v);
  }
}
const obj = {};
for (const s of [...set]) obj[s] = s;
fs.writeFileSync("/work/scripts/gen-out/data-vi.json", JSON.stringify(obj, null, 2));
console.log("files", files.length, "| seed", before, "-> total", set.size, "| NEW", set.size - before);
