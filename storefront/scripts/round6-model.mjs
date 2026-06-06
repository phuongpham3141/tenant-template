import fs from "node:fs";
const R = "/work";
function repl(p, a, b) {
  const s = fs.readFileSync(R + p, "utf8");
  const n = s.split(a).length - 1;
  if (n === 0) { console.log("  NF:", p); return; }
  fs.writeFileSync(R + p, s.split(a).join(b));
  console.log("  OK(" + n + "):", p.split("/").pop());
}
// Wrap model DISPLAY in td() (translates VI-phrase models on stub partners;
// real codes pass through unchanged). URL/slug/RFQ use raw product.model (skipped in tdDeep).
repl("/src/app/info/partners/[slug]/page.tsx", "{product.model}", "{td(product.model)}");
repl("/src/app/info/partners/[slug]/[productSlug]/page.tsx", "{product.model}", "{td(product.model)}");
console.log("ROUND6 DONE");
