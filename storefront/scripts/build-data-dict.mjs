import fs from 'node:fs';
const en = JSON.parse(fs.readFileSync('/work/scripts/gen-out/data.en.json', 'utf8'));
const cn = JSON.parse(fs.readFileSync('/work/scripts/gen-out/data.cn.json', 'utf8'));
// Manual supplement: computed/hardcoded UI strings not present in the data files.
const DESC = 'Danh bạ nhà máy + thương hiệu Trung – Việt mà Huayue đã thẩm định: vị trí nhà máy, năm thành lập, quy mô, số mã SKU và mã chứng khoán nếu niêm yết.';
Object.assign(en, {
  '12 năm': '12 years',
  'KIM CƯƠNG': 'DIAMOND', 'Đối tác': 'Partner', 'Xem →': 'View →',
  'Xem chi tiết →': 'View details →', 'Đối tác khác trong ngành': 'Other partners in',
  '2 lần/năm tại chỗ': '2×/year on-site', '60+ quốc gia': '60+ countries',
  'Danh bạ nhà cung cấp': 'Supplier directory',
  'Thương hiệu': 'Brand', 'Ngành': 'Industry', 'Vị trí nhà máy': 'Factory location', 'Thành lập': 'Founded',
  'Quy mô / Năng lực': 'Scale / Capacity', 'Niêm yết': 'Listed', 'Chi tiết': 'Details', 'Đối tác sản xuất': 'Manufacturing partners',
  'Danh sách 24 thương hiệu đối tác chính thức của Huayue Chuỗi Cung Ứng tại Việt Nam — đã thẩm định nhà máy, có catalog phân phối ưu đãi cho thị trường Việt.': 'List of 24 official partner brands of Huayue Supply Chain in Vietnam — factory-audited, with preferential distribution catalogs.',
  'Bấm để phóng to': 'Click to zoom', 'Quảng Cương (Gise-Gnm)': 'Guangjiang (Gise-Gnm)',
  'Các mã SKU khác trong dòng sản phẩm này': 'Other SKUs in this series', 'Xem toàn bộ danh mục →': 'View full catalog →',
  [DESC]: 'Directory of China–Vietnam factories & brands audited by Huayue: factory location, founding year, scale, SKU count and stock code if listed.',
});
Object.assign(cn, {
  '12 năm': '12年',
  'KIM CƯƠNG': '钻石', 'Đối tác': '合作伙伴', 'Xem →': '查看 →',
  'Xem chi tiết →': '查看详情 →', 'Đối tác khác trong ngành': '同行业其他合作伙伴',
  '2 lần/năm tại chỗ': '每年2次现场审核', '60+ quốc gia': '60+ 个国家',
  'Danh bạ nhà cung cấp': '供应商目录',
  'Thương hiệu': '品牌', 'Ngành': '行业', 'Vị trí nhà máy': '工厂位置', 'Thành lập': '成立',
  'Quy mô / Năng lực': '规模 / 产能', 'Niêm yết': '上市', 'Chi tiết': '详情', 'Đối tác sản xuất': '制造合作伙伴',
  'Danh sách 24 thương hiệu đối tác chính thức của Huayue Chuỗi Cung Ứng tại Việt Nam — đã thẩm định nhà máy, có catalog phân phối ưu đãi cho thị trường Việt.': '华越供应链在越南的24家官方合作品牌列表 —— 已审核工厂，提供面向越南市场的优惠分销目录。',
  'Bấm để phóng to': '点击放大', 'Quảng Cương (Gise-Gnm)': '广疆 (Gise-Gnm)',
  'Các mã SKU khác trong dòng sản phẩm này': '本系列其他SKU', 'Xem toàn bộ danh mục →': '查看全部目录 →',
  [DESC]: '华越审核的中越工厂与品牌目录：工厂位置、成立年份、规模、SKU 数量及上市股票代码（如已上市）。',
});
const lit = (o) => Object.entries(o).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join('\n');
fs.writeFileSync('/work/src/messages/data.ts',
`// Auto-generated data dictionary (keyed by Vietnamese source string).
import type { LocaleCode } from "@/lib/i18n";
const EN: Record<string, string> = {
${lit(en)}
};
const CN: Record<string, string> = {
${lit(cn)}
};
const DATA: Partial<Record<LocaleCode, Record<string, string>>> = { en: EN, cn: CN };
export function dataDict(locale: LocaleCode): Record<string, string> { return DATA[locale] ?? {}; }
`);
console.log('data dict written; en', Object.keys(en).length, 'cn', Object.keys(cn).length, '(td.ts left as-is)');
