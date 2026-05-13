import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { NAV_CATEGORIES } from "@/data/home";

const EXTRA_CATEGORIES = [
  { name: "Bao bì & In ấn", slug: "packaging-printing" },
  { name: "Bể bơi & Spa", slug: "pool-spa" },
  { name: "Cảnh quan sân vườn", slug: "landscape-garden" },
  { name: "Cửa cuốn & cổng tự động", slug: "rolling-door" },
  { name: "Đá granite & marble", slug: "stone-granite" },
  { name: "Điều hoà & thông gió", slug: "hvac" },
  { name: "Đồ chơi trẻ em", slug: "toys" },
  { name: "Đồng phục & vải", slug: "uniform-fabric" },
  { name: "Gạch men & Mosaic", slug: "tile-mosaic" },
  { name: "Hệ thống camera & an ninh", slug: "security-camera" },
  { name: "Inox & kim loại tấm", slug: "metal-sheet" },
  { name: "Khoá điện tử thông minh", slug: "smart-lock" },
  { name: "Kính & gương trang trí", slug: "glass-mirror" },
  { name: "Lò nướng & bếp công nghiệp", slug: "oven-stove" },
  { name: "Máy phát điện", slug: "generator" },
  { name: "Máy lọc nước công nghiệp", slug: "water-purifier" },
  { name: "Năng lượng mặt trời", slug: "solar" },
  { name: "Nhôm kính cao cấp", slug: "aluminum-glass" },
  { name: "Ống nhựa & van", slug: "pipe-valve" },
  { name: "Quạt công nghiệp", slug: "industrial-fan" },
  { name: "Rèm & vật liệu trang trí", slug: "curtain-decor" },
  { name: "Sàn gỗ kỹ thuật", slug: "engineered-wood" },
  { name: "Sơn & vật liệu hoàn thiện", slug: "paint-finish" },
  { name: "Sắt thép xây dựng", slug: "steel" },
  { name: "Thang máy & thang cuốn", slug: "elevator" },
  { name: "Thiết bị nhà thông minh", slug: "smart-home" },
  { name: "Thiết bị pha chế cafe", slug: "coffee-equipment" },
  { name: "Tủ đông & tủ lạnh công nghiệp", slug: "freezer" },
  { name: "Tủ trưng bày kính", slug: "display-cabinet" },
  { name: "Vải bọc nội thất", slug: "upholstery-fabric" },
  { name: "Vật liệu chống thấm", slug: "waterproof" },
  { name: "Xe điện & xe nâng", slug: "electric-vehicle" },
];

const ALL_CATEGORIES = [
  ...NAV_CATEGORIES.map((c) => ({ name: c.name, slug: c.slug })),
  ...EXTRA_CATEGORIES,
];

const VN_LETTER_ORDER = "ABCDEĐEGHIKLMNOPQRSTUVXY";

function firstLetter(name: string): string {
  const first = name.trim()[0]?.toUpperCase() ?? "Z";
  const normalized = first.normalize("NFD").replace(/[̀-ͯ]/g, "");
  return normalized || first;
}

const grouped: Record<string, { name: string; slug: string }[]> = {};
for (const c of ALL_CATEGORIES) {
  const l = firstLetter(c.name);
  if (!grouped[l]) grouped[l] = [];
  grouped[l].push(c);
}
for (const l of Object.keys(grouped)) {
  grouped[l].sort((a, b) => a.name.localeCompare(b.name, "vi"));
}
const LETTERS = Array.from(new Set(VN_LETTER_ORDER.split(""))).filter((l) => grouped[l]);

const VERTICALS = [
  { icon: "🏨", name: "Khách sạn & Resort", count: "240+ NCC" },
  { icon: "🏢", name: "Văn phòng & Co-working", count: "180+ NCC" },
  { icon: "🏠", name: "Chung cư & Căn hộ", count: "320+ NCC" },
  { icon: "🍽️", name: "Nhà hàng & Cafe", count: "150+ NCC" },
  { icon: "🏥", name: "Y tế & Bệnh viện", count: "90+ NCC" },
  { icon: "🏫", name: "Trường học & Đào tạo", count: "75+ NCC" },
  { icon: "🛍️", name: "Bán lẻ & Showroom", count: "210+ NCC" },
  { icon: "🏗️", name: "Dự án & Xây dựng", count: "400+ NCC" },
];

export default function ProductDirectoryPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực người mua", href: "/buyer-center" }, { label: "Danh bạ sản phẩm" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/product-directory" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/10 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🗂 DANH BẠ SẢN PHẨM</div>
            <h1 className="text-[22px] font-bold text-ink">Danh bạ sản phẩm</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              Tra cứu nhanh hơn 2.400 SKU theo bảng chữ cái A–Z. Bấm chữ cái để cuộn đến nhóm tương ứng, hoặc xem theo ngành dọc bên phải nếu bạn đang phục vụ một loại dự án cụ thể.
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-3 mb-4 sticky top-2 z-10">
            <div className="flex flex-wrap gap-1 justify-center">
              {LETTERS.map((l) => (
                <a key={l} href={`#letter-${l}`} className="w-8 h-8 flex items-center justify-center text-[13px] font-bold text-brand border border-line rounded-sm hover:bg-brand hover:text-white">{l}</a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[1fr_240px] gap-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-5">
              {LETTERS.map((l) => (
                <section key={l} id={`letter-${l}`} className="mb-5 last:mb-0 scroll-mt-20">
                  <div className="flex items-center gap-3 mb-2 pb-2 border-b border-line">
                    <div className="w-9 h-9 bg-brand text-white rounded-sm flex items-center justify-center font-extrabold text-[16px]">{l}</div>
                    <span className="text-[12px] text-mute">{grouped[l].length} danh mục</span>
                  </div>
                  <div className="grid grid-cols-3 gap-x-4 gap-y-1.5 max-md:grid-cols-2">
                    {grouped[l].map((c) => (
                      <Link key={c.slug} href={`/category/${c.slug}`} className="text-[12.5px] text-ink hover:text-brand py-1 border-b border-dashed border-line">
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <aside className="bg-paper border border-line rounded p-4 self-start">
              <b className="block text-[13px] text-ink mb-3">🏷 Xem theo ngành dọc</b>
              <ul className="space-y-1">
                {VERTICALS.map((v) => (
                  <li key={v.name}>
                    <Link href={`/category/${v.name.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "")}`} className="flex items-center gap-2 px-2 py-1.5 rounded-sm text-[12px] text-ink hover:bg-[#F5F7FA]">
                      <span className="w-5 text-center">{v.icon}</span>
                      <span className="flex-1 leading-tight">{v.name}</span>
                      <span className="text-[10px] text-mute">{v.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/buying-request" className="mt-3 block text-center px-3 py-2 bg-accent text-white rounded-sm text-[12px] font-bold hover:opacity-90">+ Gửi RFQ</Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Danh bạ sản phẩm — Buyer Center" };
