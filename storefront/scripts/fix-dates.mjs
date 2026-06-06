import fs from "node:fs";
const files = ["/work/src/app/info/industry-news/page.tsx", "/work/src/app/info/industry-news/[slug]/page.tsx"];
const OLD = 'd.toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" })';
const NEW = 'd.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })';
for (const p of files) {
  let s = fs.readFileSync(p, "utf8");
  const had = s.includes(OLD);
  s = s.split(OLD).join(NEW);
  fs.writeFileSync(p, s);
  console.log(p.split("/").slice(-2).join("/"), had ? "fixed" : "NO MATCH");
}
