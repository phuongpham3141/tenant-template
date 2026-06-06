import fs from "node:fs";
const p = "/work/src/app/buying-request/page.tsx";
let s = fs.readFileSync(p, "utf8");
s = s.replace('import { getT } from "@/lib/t";', 'import { getT } from "@/lib/t";\nimport { getTd } from "@/lib/td";');
s = s.replace('const t = await getT();', 'const t = await getT();\n  const td = await getTd();');
s = s.replace('{c.icon} {c.name}', '{c.icon} {td(c.name)}');
fs.writeFileSync(p, s);
console.log("buying-request fixed:", s.includes("td(c.name)"));
