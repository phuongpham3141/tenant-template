import fs from 'node:fs';
const f = '/work/src/data/home.ts';
let s = fs.readFileSync(f, 'utf8');
const ZONES = `export const ZONES: Zone[] = [
  { slug: "foshan-ceramic", name: "Phật Sơn — Gốm sứ", count: "1,200 nhà máy", image: "/img/zk-ceramic.jpg?v=1" },
  { slug: "foshan-furniture", name: "Phật Sơn — Nội thất", count: "3,000+ nhà máy", image: "/img/zk-furniture.jpg?v=1" },
  { slug: "jinjiang-wood", name: "Tấn Giang — Gỗ", count: "340 nhà máy", image: "/img/zk-wood.jpg?v=1" },
  { slug: "guangzhou-appliance", name: "Quảng Châu — Điện gia dụng", count: "2,000+ nhà máy", image: "/img/zk-appliance.jpg?v=1" },
  { slug: "guzhen-lighting", name: "Cổ Trấn — Đèn chiếu sáng", count: "8,000+ cơ sở", image: "/img/zk-lighting.jpg?v=1" },
  { slug: "chaozhou-sanitary", name: "Triều Châu — Thiết bị vệ sinh", count: "1,500+ nhà máy", image: "/img/zk-sanitary.jpg?v=1" },
];`;
const m = s.match(/export const ZONES: Zone\[\] = \[[\s\S]*?\];/);
if (!m) { console.error('ZONES not found'); process.exit(1); }
s = s.replace(/export const ZONES: Zone\[\] = \[[\s\S]*?\];/, ZONES);
fs.writeFileSync(f, s);
console.log('zones replaced; zk-ceramic present:', s.includes('zk-ceramic'), '| count zk-:', (s.match(/zk-/g) || []).length);
