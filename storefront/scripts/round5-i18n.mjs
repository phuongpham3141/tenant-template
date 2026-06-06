import fs from "node:fs";
const R = "/work";
const read = (p) => fs.readFileSync(R + p, "utf8");
const write = (p, s) => fs.writeFileSync(R + p, s);
let nf = 0;
function repl(p, a, b, all = false) {
  let s = read(p);
  const n = s.split(a).length - 1;
  if (n === 0) { console.log("  NF:", p.split("/").pop(), "::", JSON.stringify(a.slice(0, 45))); nf++; return; }
  write(p, all ? s.split(a).join(b) : s.replace(a, b));
  console.log("  OK(" + n + "):", p.split("/").pop(), "::", a.slice(0, 30).replace(/\n/g, "\n"));
}
const GAL = "/src/components/product/product-gallery.tsx";
const PROD = "/src/app/info/partners/[slug]/[productSlug]/page.tsx";
const SUP = "/src/app/suppliers/page.tsx";
const BDD = "/scripts/build-data-dict.mjs";

// ProductGallery: add zoomLabel prop (client, label passed from server)
repl(GAL, "  alt: string;\n};", "  alt: string;\n  zoomLabel?: string;\n};");
repl(GAL, "export function ProductGallery({ images, alt }: Props) {", "export function ProductGallery({ images, alt, zoomLabel }: Props) {");
repl(GAL, "🔍 Bấm để phóng to", '🔍 {zoomLabel ?? "Bấm để phóng to"}');

// Product page: pass zoomLabel + RelatedProducts async + headings
repl(PROD, "alt={`${product.name} (${product.model})`} />", 'alt={`${product.name} (${product.model})`} zoomLabel={td("Bấm để phóng to")} />');
repl(PROD, "function RelatedProducts({", "async function RelatedProducts({");
repl(PROD, "seriesName?: string;\n}) {\n  return (", "seriesName?: string;\n}) {\n  const td = await getTd();\n  return (");
repl(PROD, "Các mã SKU khác trong dòng sản phẩm này", '{td("Các mã SKU khác trong dòng sản phẩm này")}');
repl(PROD, "Xem toàn bộ danh mục →", '{td("Xem toàn bộ danh mục →")}');

// Suppliers: Quảng Cương
repl(SUP, "<b>Quảng Cương (Gise-Gnm)</b>", '<b>{td("Quảng Cương (Gise-Gnm)")}</b>');

// build-data-dict supplement
repl(BDD, "  'Danh bạ nhà cung cấp': 'Supplier directory',", "  'Danh bạ nhà cung cấp': 'Supplier directory',\n  'Bấm để phóng to': 'Click to zoom', 'Quảng Cương (Gise-Gnm)': 'Guangjiang (Gise-Gnm)',\n  'Các mã SKU khác trong dòng sản phẩm này': 'Other SKUs in this series', 'Xem toàn bộ danh mục →': 'View full catalog →',");
repl(BDD, "  'Danh bạ nhà cung cấp': '供应商目录',", "  'Danh bạ nhà cung cấp': '供应商目录',\n  'Bấm để phóng to': '点击放大', 'Quảng Cương (Gise-Gnm)': '广疆 (Gise-Gnm)',\n  'Các mã SKU khác trong dòng sản phẩm này': '本系列其他SKU', 'Xem toàn bộ danh mục →': '查看全部目录 →',");

console.log(nf === 0 ? "ALL OK" : ("!!! " + nf + " NF"));
