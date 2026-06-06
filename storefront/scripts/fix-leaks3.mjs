import fs from "node:fs";
const H = "/work/src/components/home";
function edit(p, pairs) { let s = fs.readFileSync(p, "utf8"); for (const [a, b] of pairs) { if (s.includes(a)) s = s.split(a).join(b); else console.log("NF", p.split("/").slice(-1)[0], JSON.stringify(a.slice(0, 45))); } fs.writeFileSync(p, s); }
edit(`${H}/product-section.tsx`, [["{p.years}", "{td(p.years)}"]]);
edit(`${H}/top-strip.tsx`, [["{it.badge}", "{td(it.badge)}"]]);
edit(`${H}/factories.tsx`, [["    return f.facilities.length > 35\n      ? f.facilities.slice(0, 35) + \"…\"\n      : f.facilities;", "    return f.facilities;"]]);
edit(`${H}/sticky-header.tsx`, [
  ["aria-label=\"Tìm bằng hình ảnh\"", "aria-label={t(\"common.searchByImage\")}"],
  ["title=\"Tìm bằng hình ảnh\"", "title={t(\"common.searchByImage\")}"],
]);
console.log("done");
