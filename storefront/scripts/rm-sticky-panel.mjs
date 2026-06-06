import fs from "node:fs";
const p = "/work/src/components/home/sticky-header.tsx";
let s = fs.readFileSync(p, "utf8");
const block = `              <div className="mm-panel w-[860px] h-[504px] grid">
                {NAV_MENU.map((group, idx) => (
                  <div
                    key={group.main.slug}
                    className={\`mm-cat-panel mm-cat-panel-\${idx + 1} row-start-1 col-start-1 h-full overflow-hidden\`}
                  >
                    <CategoryOverviewPanel group={group} t={t} td={(s: string) => s} />
                  </div>
                ))}
              </div>
`;
let ok = 0;
if (s.includes(block)) { s = s.replace(block, ""); ok++; } else console.log("block NF");
s = s.replace(`import { CategoryOverviewPanel } from "@/components/home/mega-submenu";\n`, "");
fs.writeFileSync(p, s);
console.log("removed sticky mm-panel:", ok, "| CategoryOverviewPanel still referenced:", s.includes("CategoryOverviewPanel"));
