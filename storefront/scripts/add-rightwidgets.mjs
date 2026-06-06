import fs from 'node:fs';
// 1) add RightWidgets keys to vi-src
const viPath = '/work/scripts/vi-src.json';
const vi = JSON.parse(fs.readFileSync(viPath, 'utf8'));
Object.assign(vi, {
  'rfq.title': 'Yêu cầu báo giá nhanh',
  'rfq.desc': 'Gửi yêu cầu đến nhiều nhà cung cấp cùng lúc. Nhận báo giá trong vòng 24 giờ.',
  'rfq.ph_product': 'Sản phẩm bạn đang tìm...',
  'rfq.ph_qty': 'Số lượng + đơn vị (vd: 500 m²)',
  'rfq.ph_desc': 'Mô tả chi tiết...',
  'rfq.submit': 'GỬI NGAY',
  'promo.title': 'Ưu đãi cho đại lý mới',
  'promo.desc': 'Miễn phí thẩm định nhà máy + giảm 10% đơn hàng đầu tiên + miễn phí vận chuyển DDP',
  'promo.cta': 'Đăng ký ngay',
});
fs.writeFileSync(viPath, JSON.stringify(vi, null, 2));

// 2) transform banner-section RightWidgets
const p = '/work/src/components/home/banner-section.tsx';
let s = fs.readFileSync(p, 'utf8');
const pairs = [
  ['function RightWidgets() {', 'async function RightWidgets() {\n  const t = await getT();'],
  ['📋 Yêu cầu báo giá nhanh', '📋 {t("rfq.title")}'],
  ['Gửi yêu cầu đến nhiều nhà cung cấp cùng lúc. Nhận báo giá trong vòng 24 giờ.', '{t("rfq.desc")}'],
  ['placeholder="Sản phẩm bạn đang tìm..."', 'placeholder={t("rfq.ph_product")}'],
  ['placeholder="Số lượng + đơn vị (vd: 500 m²)"', 'placeholder={t("rfq.ph_qty")}'],
  ['placeholder="Mô tả chi tiết..."', 'placeholder={t("rfq.ph_desc")}'],
  ['🚀 GỬI NGAY', '🚀 {t("rfq.submit")}'],
  ['🎁 Ưu đãi cho đại lý mới', '🎁 {t("promo.title")}'],
  ['Miễn phí thẩm định nhà máy + giảm 10% đơn hàng đầu tiên + miễn phí vận chuyển DDP', '{t("promo.desc")}'],
  ['Đăng ký ngay →', '{t("promo.cta")} →'],
];
let n = 0;
for (const [a, b] of pairs) { if (s.includes(a)) { s = s.replace(a, b); n++; } else console.log('NF:', JSON.stringify(a.slice(0, 40))); }
fs.writeFileSync(p, s);
console.log('vi keys now', Object.keys(vi).length, '| banner edits', n);
