import fs from "node:fs";
const R = "/work";
const read = (p) => fs.readFileSync(R + p, "utf8");
const write = (p, s) => fs.writeFileSync(R + p, s);
let nf = 0;
function repl(p, oldS, newS, all = false) {
  let s = read(p);
  const n = s.split(oldS).length - 1;
  if (n === 0) { console.log("  NF:", p, "::", JSON.stringify(oldS.slice(0, 55))); nf++; return; }
  s = all ? s.split(oldS).join(newS) : s.replace(oldS, newS);
  write(p, s);
  console.log("  OK(" + n + "):", p.split("/").pop(), "::", oldS.slice(0, 32).replace(/\n/g, "\n"));
}

const PROD = "/src/app/info/partners/[slug]/[productSlug]/page.tsx";
const PART = "/src/app/info/partners/[slug]/page.tsx";
const SUP = "/src/app/suppliers/page.tsx";

// ===== PRODUCT DETAIL =====
repl(PROD, 'import { getT } from "@/lib/t";', 'import { getT } from "@/lib/t";\nimport { getTd } from "@/lib/td";\nimport { tdDeep } from "@/lib/localize";');
repl(PROD, 'if (!hit) return { title: "Sản phẩm — Huayue" };', 'if (!hit) return { title: "Huayuesc" };');
repl(PROD, 'const { partner, product } = hit;\n  return {', 'const { partner: rp, product: rpr } = hit;\n  const td = await getTd();\n  const partner = tdDeep(rp, td);\n  const product = tdDeep(rpr, td);\n  return {');
repl(PROD, 'const { partner, product } = hit;\n  const t = await getT();', 'const { partner: rawPartner, product: rawProduct } = hit;\n  const t = await getT();\n  const td = await getTd();\n  const partner = tdDeep(rawPartner, td);\n  const product = tdDeep(rawProduct, td);');
repl(PROD, 'const meta = lookup ? lookup(product.seriesOriginal) : undefined;', 'const meta = lookup ? tdDeep(lookup(rawProduct.seriesOriginal), td) : undefined;');
repl(PROD, 'value={category.name}', 'value={td(category.name)}');
repl(PROD, 'value="25 năm"', 'value={td("25 năm")}');
repl(PROD, 'value="2 lần/năm tại chỗ"', 'value={td("2 lần/năm tại chỗ")}');
repl(PROD, 'value="60+ quốc gia"', 'value={td("60+ quốc gia")}');

// ===== PARTNER DETAIL =====
repl(PART, 'import { getT } from "@/lib/t";', 'import { getT } from "@/lib/t";\nimport { getTd } from "@/lib/td";\nimport { tdDeep } from "@/lib/localize";');
repl(PART, '  if (!p) return { title: "Đối tác — Huayuesc" };\n  return {\n    title: `${p.name} — Đối tác sản xuất Huayuesc`,\n    description: p.introduction.slice(0, 160),\n  };', '  if (!p) return { title: "Huayuesc" };\n  const td = await getTd();\n  return {\n    title: `${td(p.name)} · Huayuesc`,\n    description: td(p.introduction).slice(0, 160),\n  };');
repl(PART, 'const partner = getPartner(slug);\n  if (!partner) return notFound();', 'const raw = getPartner(slug);\n  if (!raw) return notFound();\n  const td = await getTd();\n  const partner = tdDeep(raw, td);');
repl(PART, '<span>{category.name}</span>', '<span>{td(category.name)}</span>');
repl(PART, 'function ProductCard({', 'async function ProductCard({');
repl(PART, '}) {\n  const detailHref = ', '}) {\n  const td = await getTd();\n  const detailHref = ');
repl(PART, 'Xem chi tiết →', '{td("Xem chi tiết →")}');
repl(PART, 'function RelatedPartnersSection({', 'async function RelatedPartnersSection({');
repl(PART, 'const cat = NAV_CATEGORIES.find((c) => c.slug === category);\n\n  return (', 'const cat = NAV_CATEGORIES.find((c) => c.slug === category);\n  const td = await getTd();\n\n  return (');
repl(PART, 'Đối tác khác trong ngành {cat?.icon} {cat?.name}', '{td("Đối tác khác trong ngành")} {cat?.icon} {cat?.name && td(cat.name)}');
repl(PART, '{p.name}', '{td(p.name)}', true);
repl(PART, '{p.products.length} SKU · {p.factory.location.split(",")[0]}', '{p.products.length} SKU · {td(p.factory.location).split(",")[0]}');

// ===== SUPPLIERS =====
repl(SUP, 'import { getTd } from "@/lib/td";', 'import { getTd } from "@/lib/td";\nimport { tdDeep } from "@/lib/localize";');
repl(SUP, 'export const metadata = {\n  title: "Danh bạ nhà cung cấp — Huayuesc",\n  description:\n    "Danh bạ nhà máy + thương hiệu Trung – Việt mà Huayue đã thẩm định: vị trí nhà máy, năm thành lập, quy mô, số mã SKU và mã chứng khoán nếu niêm yết.",\n};', 'export async function generateMetadata() {\n  const td = await getTd();\n  return {\n    title: td("Danh bạ nhà cung cấp") + " · Huayuesc",\n    description: td(\n      "Danh bạ nhà máy + thương hiệu Trung – Việt mà Huayue đã thẩm định: vị trí nhà máy, năm thành lập, quy mô, số mã SKU và mã chứng khoán nếu niêm yết."\n    ),\n  };\n}');
repl(SUP, 'const listed = list.filter((p) => p.listed).length;', 'const listed = list.filter((p) => p.listed).length;\n  const tList = list.map((p) => tdDeep(p, td));');
repl(SUP, '<TableView list={list} />', '<TableView list={tList} />');
repl(SUP, '<CardsView list={list} />', '<CardsView list={tList} />');
repl(SUP, '💎 KIM CƯƠNG', '💎 {td("KIM CƯƠNG")}');
repl(SUP, 'rounded-sm font-bold">\n          Đối tác\n        </span>', 'rounded-sm font-bold">\n          {td("Đối tác")}\n        </span>');
repl(SUP, 'Xem →', '{td("Xem →")}');

console.log(nf === 0 ? "ALL OK" : ("!!! " + nf + " NOT FOUND"));
