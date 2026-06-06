import fs from 'node:fs';
const TITLE = 'Huayuesc — Chuỗi cung ứng VLXD & nội thất Trung – Việt';
const DESC = 'Chuỗi cung ứng một trạm Trung – Việt cho vật liệu xây dựng, vật liệu trang trí nội thất và đồ điện gia dụng nhà bếp – phòng tắm. Sourcing tại Trung Quốc, kho bãi tập trung, vận chuyển xuyên biên giới và thông quan tại cảng Hải Phòng.';

// 1) add meta keys
const vp = '/work/scripts/vi-src.json';
const vi = JSON.parse(fs.readFileSync(vp, 'utf8'));
vi['meta.title'] = TITLE;
vi['meta.desc'] = DESC;
fs.writeFileSync(vp, JSON.stringify(vi, null, 2));

// 2) transform layout.tsx
const p = '/work/src/app/layout.tsx';
let s = fs.readFileSync(p, 'utf8');
const pairs = [
  ['import { getLocale } from "@/lib/t";', 'import { getLocale, getT } from "@/lib/t";'],
  [`export const metadata: Metadata = {\n  title: "${TITLE}",\n  description:\n    "${DESC}",`,
   `export async function generateMetadata(): Promise<Metadata> {\n  const t = await getT();\n  return {\n  title: t("meta.title"),\n  description: t("meta.desc"),`],
  [`    apple: { url: "/logo/apple-touch-icon.png?v=6", sizes: "180x180" },\n  },\n};`,
   `    apple: { url: "/logo/apple-touch-icon.png?v=6", sizes: "180x180" },\n  },\n  };\n}`],
];
let n = 0;
for (const [a, b] of pairs) { if (s.includes(a)) { s = s.replace(a, b); n++; } else console.log('NF:', JSON.stringify(a.slice(0, 45))); }
fs.writeFileSync(p, s);
console.log('layout edits', n, '/ 3');
