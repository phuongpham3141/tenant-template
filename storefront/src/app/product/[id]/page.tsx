import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SECTIONS, FACTORIES } from "@/data/home";
import type { Product } from "@/data/home";

function findProduct(id: string): { product: Product; sectionId: string } | null {
  for (const s of SECTIONS) {
    const p = s.products.find((x) => x.id === id);
    if (p) return { product: p, sectionId: s.id };
  }
  return null;
}

function tierTable(price: string) {
  const num = parseFloat(price.replace(/[^0-9.]/g, "")) || 10;
  const tiers = [
    { range: "1 – 49", price: num.toFixed(2) },
    { range: "50 – 99", price: (num * 0.92).toFixed(2) },
    { range: "100 – 499", price: (num * 0.85).toFixed(2) },
    { range: "500+", price: (num * 0.78).toFixed(2) },
  ];
  return tiers;
}

const SPECS: [string, string][] = [
  ["Xuất xứ", "Trung Quốc (China)"],
  ["Thương hiệu", "OEM/ODM hỗ trợ"],
  ["Vật liệu", "Cao cấp – Grade A"],
  ["Tiêu chuẩn", "ISO 9001, CE, RoHS"],
  ["Đóng gói", "Carton + pallet xuất khẩu"],
  ["Cảng xuất", "Foshan / Shenzhen / Ningbo"],
  ["Thời gian sản xuất", "20 – 30 ngày"],
  ["Hình thức thanh toán", "T/T 30% trả trước, 70% trước khi xuất"],
  ["Vận chuyển", "FOB / CIF / DDP về Việt Nam"],
  ["Bảo hành", "12 tháng tại Việt Nam"],
];

const REVIEWS = [
  { name: "Trần Minh Huy", company: "Showroom Nội thất Sài Gòn", rating: 5, text: "Hàng nhận đúng mẫu, lead time nhanh. Đợt 2 sẽ đặt thêm 2 container." },
  { name: "Phạm Quốc Anh", company: "Vật liệu xây dựng Phương Nam", rating: 5, text: "Báo giá nhanh trong 6 tiếng. NCC hỗ trợ video call kiểm hàng trước xuất." },
  { name: "Nguyễn Thu Hằng", company: "Hotel Group HCM", rating: 4, text: "Chất lượng tốt, đóng gói chuẩn xuất khẩu. Giá cạnh tranh hơn nội địa 30%." },
  { name: "Lê Văn Đức", company: "Đại lý Đà Nẵng", rating: 5, text: "Audit nhà máy do AlibabaVN tổ chức rất chuyên nghiệp. Yên tâm đặt hàng." },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const found = findProduct(id);

  if (!found) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-16">
        <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm", href: "/products" }, { label: id }]} />
        <div className="bg-paper border border-line rounded p-12 mt-6 text-center">
          <div className="text-[48px] mb-3">📦</div>
          <h1 className="text-[24px] font-bold text-ink mb-2">Sản phẩm đang được cập nhật</h1>
          <p className="text-[13px] text-mute mb-5">Mã sản phẩm <b>{id}</b> chưa có sẵn. Vui lòng quay lại sau.</p>
          <Link href="/products" className="inline-block px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] hover:bg-brand-light">
            ← Xem tất cả sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const { product: p, sectionId } = found;
  const section = SECTIONS.find((s) => s.id === sectionId)!;
  const supplier = FACTORIES.find((f) => f.name.toLowerCase().includes(p.seller.split(" ")[0].toLowerCase())) ?? FACTORIES[0];
  const tiers = tierTable(p.price);
  const sameSection = section.products.filter((x) => x.id !== p.id).slice(0, 4);
  const otherSection = SECTIONS.filter((s) => s.id !== sectionId).flatMap((s) => s.products).slice(0, 4);

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: section.title, href: `/category/${section.categorySlug}` },
          { label: p.title },
        ]}
      />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 grid grid-cols-[1fr_360px] gap-5 max-md:grid-cols-1">
        {/* Left: gallery + info */}
        <div className="bg-paper border border-line rounded p-5">
          <div className="grid grid-cols-[1fr_80px] gap-3 max-md:grid-cols-1">
            <div className="aspect-square bg-[#F5F5F5] rounded overflow-hidden">
              {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
            </div>
            <div className="flex flex-col gap-2 max-md:flex-row max-md:overflow-x-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square w-full bg-[#F5F5F5] rounded overflow-hidden border border-line max-md:w-[80px] max-md:flex-shrink-0">
                  <img src={`https://picsum.photos/seed/${p.id}-${i}/200/200`} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <h1 className="text-[22px] font-bold text-ink mt-5 leading-tight">{p.title}</h1>
          <div className="flex items-center gap-3 mt-2 text-[12.5px] text-mute">
            <span>★ {p.rating} (124 đánh giá)</span>
            <span>•</span>
            <span>340 đơn đã hoàn thành</span>
            <span>•</span>
            <span className="text-success font-semibold">Còn hàng</span>
          </div>

          {/* Tier table */}
          <div className="mt-5 border border-line rounded">
            <div className="bg-paper px-4 py-2.5 border-b border-line text-[13px] font-semibold text-ink">
              Bảng giá theo MOQ
            </div>
            <table className="w-full text-[13px]">
              <thead className="bg-[#F5F7FA]">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-mute">Số lượng</th>
                  <th className="text-left px-4 py-2 font-medium text-mute">Giá / đơn vị</th>
                  <th className="text-left px-4 py-2 font-medium text-mute">Tiết kiệm</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t, i) => (
                  <tr key={t.range} className="border-t border-line">
                    <td className="px-4 py-2 text-ink">{t.range} {p.unit}</td>
                    <td className="px-4 py-2 text-accent font-bold">${t.price}{p.unit}</td>
                    <td className="px-4 py-2 text-success">{i === 0 ? "Giá gốc" : `-${[8, 15, 22][i - 1]}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Variants */}
          <div className="mt-5 grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <div>
              <label className="block text-[12px] font-semibold text-ink mb-1.5">Màu sắc</label>
              <select className="w-full px-3 py-2 border border-line rounded-sm text-[13px]">
                <option>Trắng cẩm thạch</option>
                <option>Xám đậm</option>
                <option>Be vàng</option>
                <option>Nâu walnut</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-ink mb-1.5">Kích thước</label>
              <select className="w-full px-3 py-2 border border-line rounded-sm text-[13px]">
                <option>Tiêu chuẩn</option>
                <option>Custom theo bản vẽ</option>
              </select>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-2 mt-5 flex-wrap">
            <Link href="/buying-request" className="px-5 py-2.5 bg-accent text-white rounded-sm font-semibold text-[13px] hover:opacity-90">
              💬 Liên hệ ngay
            </Link>
            <Link href="/buying-request" className="px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] hover:bg-brand-light">
              📦 Yêu cầu mẫu
            </Link>
            <button className="px-5 py-2.5 border border-line rounded-sm font-semibold text-[13px] text-ink hover:border-brand hover:text-brand">
              ❤ Thêm vào ưa thích
            </button>
          </div>

          {/* Specs */}
          <h2 className="text-[16px] font-bold text-ink mt-7 mb-3">Thông số kỹ thuật</h2>
          <div className="border border-line rounded">
            {SPECS.map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-[180px_1fr] text-[13px] ${i % 2 === 0 ? "bg-[#FAFBFC]" : "bg-white"}`}>
                <div className="px-4 py-2 text-mute border-r border-line">{k}</div>
                <div className="px-4 py-2 text-ink">{v}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <h2 className="text-[16px] font-bold text-ink mt-7 mb-3">Mô tả sản phẩm</h2>
          <p className="text-[13px] text-ink leading-relaxed mb-3">
            {p.title} được sản xuất bởi {p.seller}, một trong những nhà máy hàng đầu tại Trung Quốc với {p.years} kinh nghiệm xuất khẩu. Sản phẩm đạt tiêu chuẩn quốc tế, phù hợp cho dự án thương mại và dân dụng cao cấp.
          </p>
          <img src={`https://picsum.photos/seed/${p.id}-desc1/800/400`} alt="" className="w-full rounded mb-3" />
          <p className="text-[13px] text-ink leading-relaxed mb-3">
            Quy trình kiểm soát chất lượng nghiêm ngặt theo ISO 9001:2015. Mỗi lô hàng đều được audit bởi đội ngũ AlibabaVN tại Quảng Châu trước khi xuất xưởng. Hỗ trợ OEM/ODM theo bản vẽ khách hàng, MOQ linh hoạt, lead time 20-30 ngày.
          </p>
          <img src={`https://picsum.photos/seed/${p.id}-desc2/800/400`} alt="" className="w-full rounded mb-3" />
          <p className="text-[13px] text-ink leading-relaxed">
            Vận chuyển DDP về Việt Nam — không phải lo thủ tục hải quan, không phát sinh phí. Kho trung chuyển tại Bằng Tường (Lạng Sơn) và Hữu Nghị (cảng Hải Phòng) đảm bảo lead time 5-7 ngày từ Trung Quốc.
          </p>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-4">
          <div className="bg-paper border border-line rounded p-4">
            <Link href={`/supplier/${supplier.slug}`} className="flex gap-3 items-start mb-3">
              <div className="w-12 h-12 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[16px] text-brand flex-shrink-0">
                {supplier.initials}
              </div>
              <div>
                <b className="block text-[13px] font-semibold text-ink leading-tight">{supplier.name}</b>
                <span className="text-[11.5px] text-mute">{supplier.location}</span>
              </div>
            </Link>
            <div className="flex gap-1 mb-3 flex-wrap">
              {supplier.badges.gold && <span className="bg-gold text-brand-dark text-[10px] px-1.5 py-0.5 rounded-sm font-bold">GOLD</span>}
              {supplier.badges.audited && <span className="bg-success text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">AUDITED</span>}
              <span className="bg-brand text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">{supplier.badges.years}</span>
            </div>
            <div className="text-[11.5px] text-mute mb-3">★ {supplier.rating} ({supplier.reviews} reviews) · {supplier.meta}</div>
            <Link href={`/supplier/${supplier.slug}`} className="block w-full text-center py-2 bg-brand text-white rounded-sm font-semibold text-[12.5px]">
              Xem nhà máy →
            </Link>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-semibold text-ink mb-3">🛡 Bảo vệ AlibabaVN</b>
            <ul className="text-[12px] text-mute space-y-1.5">
              <li>✓ Hoàn tiền nếu không nhận hàng</li>
              <li>✓ Audit nhà máy miễn phí trước khi đặt</li>
              <li>✓ Hỗ trợ tranh chấp 24/7</li>
              <li>✓ Vận chuyển DDP — đã bao gồm thuế</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Same factory rail */}
      <div className="max-w-[1400px] mx-auto px-4 mt-7">
        <h2 className="text-[16px] font-bold text-ink mb-3">Sản phẩm cùng nhà máy</h2>
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
          {sameSection.map((x) => (
            <Link key={x.id} href={`/product/${x.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand block">
              <div className="aspect-square bg-[#F5F5F5]">
                {x.image ? <img src={x.image} alt={x.title} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="p-2.5">
                <h4 className="text-[12.5px] text-ink line-clamp-2 mb-1">{x.title}</h4>
                <div className="text-accent font-bold text-[14px]">{x.price}<small className="text-mute font-normal text-[11px]">{x.unit}</small></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-[1400px] mx-auto px-4 mt-7">
        <h2 className="text-[16px] font-bold text-ink mb-3">Đánh giá từ buyer</h2>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-paper border border-line rounded p-4">
              <div className="flex justify-between mb-1.5">
                <b className="text-[13px] text-ink">{r.name}</b>
                <span className="text-gold text-[12px]">{"★".repeat(r.rating)}</span>
              </div>
              <div className="text-[11.5px] text-mute mb-2">{r.company}</div>
              <p className="text-[12.5px] text-ink leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Other section rail */}
      <div className="max-w-[1400px] mx-auto px-4 mt-7 mb-7">
        <h2 className="text-[16px] font-bold text-ink mb-3">Có thể bạn quan tâm</h2>
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
          {otherSection.map((x) => (
            <Link key={x.id} href={`/product/${x.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand block">
              <div className="aspect-square bg-[#F5F5F5]">
                {x.image ? <img src={x.image} alt={x.title} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="p-2.5">
                <h4 className="text-[12.5px] text-ink line-clamp-2 mb-1">{x.title}</h4>
                <div className="text-accent font-bold text-[14px]">{x.price}<small className="text-mute font-normal text-[11px]">{x.unit}</small></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = findProduct(id);
  return {
    title: found ? `${found.product.title} — AlibabaVN` : `Sản phẩm ${id} — AlibabaVN`,
  };
}
