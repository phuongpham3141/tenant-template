import fs from 'node:fs';
const R = '/work/src';
let warn = 0;
function edit(path, pairs, opt = {}) {
  const p = `${R}/${path}`;
  let s = fs.readFileSync(p, 'utf8');
  for (const [a, b, all] of pairs) {
    if (!s.includes(a)) { console.log('NOT FOUND', path, '::', a.slice(0, 50)); warn++; continue; }
    s = all ? s.split(a).join(b) : s.replace(a, b);
  }
  fs.writeFileSync(p, s);
}

const KEYED_LINKS = `[
  { key: "nav.home", href: "/" },
  { key: "nav.products", href: "/products" },
  { key: "nav.suppliers", href: "/suppliers" },
  { key: "nav.tradeShows", href: "/trade-shows" },
  { key: "nav.industryChannels", href: "/industry-channels" },
  { key: "nav.tradeAlert", href: "/trade-alert" },
  { key: "nav.buyingRequest", href: "/buying-request" },
  { key: "nav.sellOnCsr", href: "/sell-on-csr" },
]`;
const CAT = '{t(`cat.${group.main.slug}`)}';

// ---------- layout.tsx ----------
edit('app/layout.tsx', [
  [`import { StickyHeader } from "@/components/home/sticky-header";`,
   `import { StickyHeader } from "@/components/home/sticky-header";\nimport { getLocale } from "@/lib/t";\nimport { getMessages } from "@/messages";\nimport { I18nProvider } from "@/components/i18n-provider";`],
  [`export default function RootLayout({`, `export default async function RootLayout({`],
  [`}>) {\n  return (`, `}>) {\n  const locale = await getLocale();\n  const messages = getMessages(locale);\n  return (`],
  [`<html lang="vi" className=`, `<html lang={locale} className=`],
  [`<body className="min-h-full flex flex-col bg-bg text-ink">\n        <StickyHeader />`,
   `<body className="min-h-full flex flex-col bg-bg text-ink">\n        <I18nProvider messages={messages}>\n        <StickyHeader />`],
  [`<MobileBottomNav />\n      </body>`, `<MobileBottomNav />\n        </I18nProvider>\n      </body>`],
]);

// ---------- navbar.tsx (Server Component) ----------
edit('components/home/navbar.tsx', [
  [`import { CategoryOverviewPanel } from "@/components/home/mega-submenu";`,
   `import { CategoryOverviewPanel } from "@/components/home/mega-submenu";\nimport { getT } from "@/lib/t";`],
  [`export function NavBar() {`, `export async function NavBar() {\n  const t = await getT();`],
  [`const links: { label: string; href: string }[] = [\n    { label: "Trang chủ", href: "/" },\n    { label: "Sản phẩm", href: "/products" },\n    { label: "Đối tác", href: "/suppliers" },\n    { label: "Hội chợ", href: "/trade-shows" },\n    { label: "Kênh ngành hàng", href: "/industry-channels" },\n    { label: "Cảnh báo giao dịch", href: "/trade-alert" },\n    { label: "Yêu cầu mua hàng", href: "/buying-request" },\n    { label: "Bán hàng trên CSR", href: "/sell-on-csr" },\n  ];`,
   `const links: { key: string; href: string }[] = ${KEYED_LINKS};`],
  [`key={l.label}`, `key={l.key}`, true],
  [`{l.label}`, `{t(l.key)}`, true],
  [`☰</span> TẤT CẢ DANH MỤC <span`, `☰</span> {t("nav.allCategories")} <span`],
  [`<span className="flex-1">TẤT CẢ DANH MỤC</span>`, `<span className="flex-1">{t("nav.allCategories")}</span>`],
  [`🔥 Tham quan nhà máy`, `🔥 {t("nav.factoryTour")}`],
  [`🔥 Nhà máy`, `🔥 {t("nav.factoryShort")}`],
  [`{group.main.name}`, CAT, true],
]);

// ---------- sticky-header.tsx (Client Component) ----------
edit('components/home/sticky-header.tsx', [
  [`import { CategoryOverviewPanel } from "@/components/home/mega-submenu";`,
   `import { CategoryOverviewPanel } from "@/components/home/mega-submenu";\nimport { useT } from "@/components/i18n-provider";`],
  [`const NAV_LINKS: { label: string; href: string }[] = [\n  { label: "Trang chủ", href: "/" },\n  { label: "Sản phẩm", href: "/products" },\n  { label: "Đối tác", href: "/suppliers" },\n  { label: "Hội chợ", href: "/trade-shows" },\n  { label: "Kênh ngành hàng", href: "/industry-channels" },\n  { label: "Cảnh báo giao thương", href: "/trade-alert" },\n  { label: "Yêu cầu mua hàng", href: "/buying-request" },\n  { label: "Bán hàng trên CSR", href: "/sell-on-csr" },\n];`,
   `const NAV_LINKS: { key: string; href: string }[] = ${KEYED_LINKS};`],
  [`const menuRef = useRef<HTMLDivElement>(null);`, `const menuRef = useRef<HTMLDivElement>(null);\n  const t = useT();`],
  [`<option value="products">Sản phẩm</option>`, `<option value="products">{t("common.tabProducts")}</option>`],
  [`<option value="suppliers">Đối tác</option>`, `<option value="suppliers">{t("common.tabSuppliers")}</option>`],
  [`<option value="rfq">Báo giá</option>`, `<option value="rfq">{t("common.tabQuote")}</option>`],
  [`placeholder="Nhập từ khoá để tìm sản phẩm..."`, `placeholder={t("common.searchPlaceholder")}`],
  [`<span>Gửi yêu cầu báo giá</span>`, `<span>{t("common.sendRfq")}</span>`],
  [`<span>Giỏ hàng</span>`, `<span>{t("common.cart")}</span>`],
  [`☰</span> TẤT CẢ DANH MỤC{" "}`, `☰</span> {t("nav.allCategories")}{" "}`],
  [`🔥 Tham quan nhà máy`, `🔥 {t("nav.factoryTour")}`],
  [`key={l.label}`, `key={l.key}`, true],
  [`{l.label}`, `{t(l.key)}`, true],
  [`{group.main.name}`, CAT, true],
]);

// ---------- banner-section.tsx (Server Component) ----------
edit('components/home/banner-section.tsx', [
  [`import { CategoryOverviewPanel } from "@/components/home/mega-submenu";`,
   `import { CategoryOverviewPanel } from "@/components/home/mega-submenu";\nimport { getT } from "@/lib/t";`],
  [`function CategoryMenu() {\n  return (`, `async function CategoryMenu() {\n  const t = await getT();\n  return (`],
  [`{group.main.name}`, CAT, true],
]);

console.log(warn === 0 ? 'ALL MATCHED ✓' : `DONE with ${warn} NOT-FOUND warnings`);
