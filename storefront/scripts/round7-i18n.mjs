import fs from "node:fs";
const R = "/work";
let nf = 0;
function repl(p, a, b, all = false) {
  const s = fs.readFileSync(R + p, "utf8");
  const n = s.split(a).length - 1;
  if (n === 0) { console.log("  NF:", p.split("/").pop(), "::", JSON.stringify(a.slice(0, 40))); nf++; return; }
  fs.writeFileSync(R + p, all ? s.split(a).join(b) : s.replace(a, b));
  console.log("  OK(" + n + "):", p.split("/").pop(), "::", a.slice(0, 26).replace(/\n/g, "\n"));
}
const SUP = "/src/app/suppliers/page.tsx";
const IDX = "/src/app/info/partners/page.tsx";
const BDD = "/scripts/build-data-dict.mjs";

// ── Suppliers TableView: async + td + wrap headers ──
repl(SUP, "function TableView({ list }: { list: PartnerBrand[] }) {\n  return (", "async function TableView({ list }: { list: PartnerBrand[] }) {\n  const td = await getTd();\n  return (");
repl(SUP, ">Thương hiệu</th>", '>{td("Thương hiệu")}</th>');
repl(SUP, ">Ngành</th>", '>{td("Ngành")}</th>');
repl(SUP, ">Vị trí nhà máy</th>", '>{td("Vị trí nhà máy")}</th>');
repl(SUP, "\n                Thành lập\n", '\n                {td("Thành lập")}\n');
repl(SUP, ">Quy mô / Năng lực</th>", '>{td("Quy mô / Năng lực")}</th>');
repl(SUP, ">Niêm yết</th>", '>{td("Niêm yết")}</th>');
repl(SUP, ">Chi tiết</th>", '>{td("Chi tiết")}</th>');

// ── Partners INDEX page ──
repl(IDX, 'import { getT } from "@/lib/t";', 'import { getT } from "@/lib/t";\nimport { getTd } from "@/lib/td";\nimport { tdDeep } from "@/lib/localize";');
repl(IDX, 'export const metadata = {\n  title: "Đối tác sản xuất — Huayuesc",\n  description:\n    "Danh sách 24 thương hiệu đối tác chính thức của Huayue Chuỗi Cung Ứng tại Việt Nam — đã thẩm định nhà máy, có catalog phân phối ưu đãi cho thị trường Việt.",\n};', 'export async function generateMetadata() {\n  const td = await getTd();\n  return {\n    title: td("Đối tác sản xuất") + " · Huayuesc",\n    description: td(\n      "Danh sách 24 thương hiệu đối tác chính thức của Huayue Chuỗi Cung Ứng tại Việt Nam — đã thẩm định nhà máy, có catalog phân phối ưu đãi cho thị trường Việt."\n    ),\n  };\n}');
repl(IDX, "const t = await getT();\n  ", "const t = await getT();\n  const td = await getTd();\n  ");
repl(IDX, "name={cat.name}", "name={td(cat.name)}");
repl(IDX, "<span>{c.name}</span>", "<span>{td(c.name)}</span>");
repl(IDX, "async function PartnerCard({ partner }: { partner: PartnerBrand }) {\n  const t = await getT();", "async function PartnerCard({ partner: rawP }: { partner: PartnerBrand }) {\n  const t = await getT();\n  const td = await getTd();\n  const partner = tdDeep(rawP, td);");

// ── dict supplement ──
const enAdd = "  'Danh bạ nhà cung cấp': 'Supplier directory',\n  'Thương hiệu': 'Brand', 'Ngành': 'Industry', 'Vị trí nhà máy': 'Factory location', 'Thành lập': 'Founded',\n  'Quy mô / Năng lực': 'Scale / Capacity', 'Niêm yết': 'Listed', 'Chi tiết': 'Details', 'Đối tác sản xuất': 'Manufacturing partners',\n  'Danh sách 24 thương hiệu đối tác chính thức của Huayue Chuỗi Cung Ứng tại Việt Nam — đã thẩm định nhà máy, có catalog phân phối ưu đãi cho thị trường Việt.': 'List of 24 official partner brands of Huayue Supply Chain in Vietnam — factory-audited, with preferential distribution catalogs.',";
const cnAdd = "  'Danh bạ nhà cung cấp': '供应商目录',\n  'Thương hiệu': '品牌', 'Ngành': '行业', 'Vị trí nhà máy': '工厂位置', 'Thành lập': '成立',\n  'Quy mô / Năng lực': '规模 / 产能', 'Niêm yết': '上市', 'Chi tiết': '详情', 'Đối tác sản xuất': '制造合作伙伴',\n  'Danh sách 24 thương hiệu đối tác chính thức của Huayue Chuỗi Cung Ứng tại Việt Nam — đã thẩm định nhà máy, có catalog phân phối ưu đãi cho thị trường Việt.': '华越供应链在越南的24家官方合作品牌列表 —— 已审核工厂，提供面向越南市场的优惠分销目录。',";
repl(BDD, "  'Danh bạ nhà cung cấp': 'Supplier directory',", enAdd);
repl(BDD, "  'Danh bạ nhà cung cấp': '供应商目录',", cnAdd);

console.log(nf === 0 ? "ALL OK" : ("!!! " + nf + " NF"));
