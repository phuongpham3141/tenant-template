import fs from "node:fs";
const p = "/work/src/components/seller/sidebar.tsx";
let s = fs.readFileSync(p, "utf8");
function rep(old, neu, label) {
  if (!s.includes(old)) { console.log("NO MATCH:", label); return; }
  s = s.split(old).join(neu);
  console.log("OK:", label);
}

// 1. imports: add after the Link import line
rep(
  'import Link from "@/components/i18n-link";\n',
  'import Link from "@/components/i18n-link";\nimport { getTd } from "@/lib/td";\nimport { tdDeep } from "@/lib/localize";\n',
  "imports"
);

// 2. rename module const
rep("const NAV_GROUPS = [", "const NAV_GROUPS_RAW = [", "rename NAV_GROUPS");

// 3. make async + inject td/NAV_GROUPS alias
rep(
  "export function SellerSidebar({ active }: { active?: string }) {\n  return (",
  "export async function SellerSidebar({ active }: { active?: string }) {\n  const td = await getTd();\n  const NAV_GROUPS = tdDeep(NAV_GROUPS_RAW, td);\n  return (",
  "async + td alias"
);

// 4. wrap hardcoded company name
rep(
  '<b className="block text-[14px] text-ink">Công ty TNHH KUKA Home</b>',
  '<b className="block text-[14px] text-ink">{td("Công ty TNHH KUKA Home")}</b>',
  "company name"
);

// 5. wrap Vàng badge
rep(
  'font-bold mr-1">Vàng</span>',
  'font-bold mr-1">{td("Vàng")}</span>',
  "Vàng badge"
);

fs.writeFileSync(p, s);
console.log("WROTE", p);
