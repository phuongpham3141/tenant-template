import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SECTIONS, NAV_CATEGORIES } from "@/data/home";

const ALL_PRODUCTS = SECTIONS.flatMap((s) => s.products);

const FILTERS = [
  { title: "Danh mục", options: NAV_CATEGORIES.slice(0, 6).map((c) => c.name) },
  { title: "Vật liệu", options: ["Gốm sứ", "Đá tự nhiên", "Gỗ", "Kim loại", "Da", "Nhựa cao cấp"] },
  { title: "Phong cách", options: ["Hiện đại", "Cổ điển", "Tối giản", "Industrial", "Bắc Âu", "Luxury"] },
  { title: "Giá", options: ["< $10", "$10 – $50", "$50 – $200", "$200 – $1000", "> $1000"] },
  { title: "Nơi xuất xứ", options: ["Foshan", "Quảng Châu", "Đông Quan", "Hàng Châu", "Thượng Hải"] },
];

export default function ProductsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Tất cả sản phẩm" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5 flex justify-between items-end max-md:flex-col max-md:items-start max-md:gap-3">
          <div>
            <h1 className="text-[24px] font-extrabold text-ink leading-tight">Tất cả sản phẩm</h1>
            <p className="text-[13px] text-mute mt-1">2,400+ sản phẩm từ 40+ nhà máy đã audit · Báo giá trong 24h · Vận chuyển DDP về VN</p>
          </div>
          <div className="flex gap-2">
            {["All", "Hot", "New", "Featured", "OEM"].map((t, i) => (
              <a key={t} className={`px-4 py-2 text-[12.5px] rounded-sm cursor-pointer ${i === 0 ? "bg-brand text-white font-semibold" : "border border-line text-mute hover:border-brand"}`}>{t}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 mt-4 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        {/* Sidebar filters */}
        <aside className="bg-paper border border-line rounded p-4 self-start space-y-5">
          {FILTERS.map((f) => (
            <div key={f.title}>
              <b className="block text-[13px] font-semibold text-ink mb-2">{f.title}</b>
              <ul className="space-y-1.5">
                {f.options.map((o) => (
                  <li key={o} className="flex items-center gap-2 text-[12.5px] text-mute hover:text-brand cursor-pointer">
                    <input type="checkbox" className="accent-brand" /> {o}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Grid */}
        <div>
          <div className="text-[12px] text-mute mb-2">Hiển thị 24 / 2,400 sản phẩm</div>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {ALL_PRODUCTS.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand block">
                <div className="aspect-square bg-[#F5F5F5]">
                  {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
                </div>
                <div className="p-2.5">
                  <h4 className="text-[12.5px] text-ink line-clamp-2 mb-1 min-h-[32px]">{p.title}</h4>
                  <div className="text-accent font-bold text-[14px] mb-1">{p.price}<small className="text-mute font-normal text-[11px]">{p.unit}</small></div>
                  <div className="text-[11px] text-mute flex justify-between">
                    <span>{p.moq}</span>
                    <span>★{p.rating}</span>
                  </div>
                  <div className="text-[11px] text-mute mt-1.5 pt-1.5 border-t border-dashed border-line truncate">{p.seller}</div>
                </div>
              </Link>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center gap-1 mt-6 mb-7">
            {[1, 2, 3, 4, 5, "...", 100].map((p, i) => (
              <a key={i} className={`min-w-[34px] px-2.5 py-1.5 text-[12.5px] rounded-sm cursor-pointer ${p === 1 ? "bg-brand text-white font-semibold" : "border border-line text-mute hover:border-brand"}`}>{p}</a>
            ))}
            <a className="px-3 py-1.5 text-[12.5px] rounded-sm border border-line text-mute hover:border-brand cursor-pointer">Sau →</a>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Tất cả sản phẩm — AlibabaVN" };
