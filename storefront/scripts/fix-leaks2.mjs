import fs from "node:fs";
const H = "/work/src/components/home";
function edit(p, pairs) { let s = fs.readFileSync(p, "utf8"); for (const [a, b] of pairs) { if (s.includes(a)) s = s.split(a).join(b); else console.log("NF", p.split("/").slice(-1)[0], JSON.stringify(a.slice(0, 45))); } fs.writeFileSync(p, s); }
edit(`${H}/navbar.tsx`, [
  ["<span className=\"flex-1 truncate\">{it.name}</span>", "<span className=\"flex-1 truncate\">{td(it.name)}</span>"],
]);
edit(`${H}/top-strip.tsx`, [
  ["import { getT } from \"@/lib/t\";", "import { getT } from \"@/lib/t\";\nimport { getTd } from \"@/lib/td\";"],
  ["function LinkList({ items }: { items: LinkRow[] }) {", "async function LinkList({ items }: { items: LinkRow[] }) {\n  const td = await getTd();"],
  ["<span className=\"text-[12.5px] text-ink font-medium truncate\">{it.label}</span>", "<span className=\"text-[12.5px] text-ink font-medium truncate\">{td(it.label)}</span>"],
  ["<span className=\"block text-[11px] text-mute mt-0.5 truncate\">{it.desc}</span>", "<span className=\"block text-[11px] text-mute mt-0.5 truncate\">{td(it.desc)}</span>"],
]);
console.log("done");
