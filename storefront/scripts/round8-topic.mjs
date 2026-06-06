import fs from "node:fs";
const R = "/work";
function repl(p, a, b, all = false) {
  const s = fs.readFileSync(R + p, "utf8");
  const n = s.split(a).length - 1;
  if (n === 0) { console.log("  NF:", JSON.stringify(a.slice(0, 40))); return; }
  fs.writeFileSync(R + p, all ? s.split(a).join(b) : s.replace(a, b));
  console.log("  OK(" + n + "):", a.slice(0, 30).replace(/\n/g, "\n"));
}
const T = "/src/app/info/[topic]/page.tsx";
repl(T, 'import { getT } from "@/lib/t";', 'import { getT } from "@/lib/t";\nimport { getTd } from "@/lib/td";\nimport { tdDeep } from "@/lib/localize";');
repl(T, "const t = getTopic(topic);", "const td = await getTd();\n  const t = tdDeep(getTopic(topic), td);", true);
console.log("ROUND8 DONE");
