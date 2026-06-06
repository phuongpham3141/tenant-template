import fs from 'node:fs';
const p = '/work/src/components/home/top-strip.tsx';
let s = fs.readFileSync(p, 'utf8');
const pairs = [
  ['const host = (await headers()).get("host");', 'const host = (await headers()).get("host");\n  const t = await getT();'],
  ['<span>Người mua</span>', '<span>{t("topstrip.buyer")}</span>'],
  ['<span>Đối tác</span>', '<span>{t("topstrip.partner")}</span>'],
  ['<span>Tài khoản</span>', '<span>{t("topstrip.account")}</span>'],
  ['<span>Đơn hàng</span>', '<span>{t("topstrip.orders")}</span>'],
  ['<span>Yêu thích</span>', '<span>{t("topstrip.favorites")}</span>'],
  ['Quên mật khẩu?', '{t("topstrip.forgot_password")}'],
  ['Đăng ký mua hàng →', '{t("topstrip.register_buyer")} →'],
  ['Đăng ký nhà cung cấp', '{t("topstrip.register_supplier")}'],
  ['Mã QR', '{t("topstrip.qr_code")}'],
  ['Quét để tải về', '{t("topstrip.scan_to_download")}'],
];
let n = 0;
for (const [a, b] of pairs) {
  if (s.includes(a)) { s = s.split(a).join(b); n++; }
  else console.log('still NF:', JSON.stringify(a.slice(0, 40)));
}
fs.writeFileSync(p, s);
console.log('topstrip fixes applied:', n, '| remaining "Đăng nhập" count:', (s.match(/Đăng nhập/g) || []).length);
