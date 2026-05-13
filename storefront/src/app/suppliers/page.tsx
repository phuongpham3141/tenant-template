import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { FACTORIES } from "@/data/home";

const FILTERS = [
  { title: "Ngành", options: ["Gốm sứ & Đá", "Nội thất", "Thiết bị vệ sinh", "Chiếu sáng", "Bếp", "Thiết bị khách sạn"] },
  { title: "Tỉnh/Thành", options: ["Foshan", "Guangzhou", "Hangzhou", "Dongguan", "Shenzhen", "Hong Kong"] },
  { title: "Quy mô (nhân viên)", options: ["< 100", "100 – 500", "500 – 2000", "2000+"] },
  { title: "Năm thành lập", options: ["< 5Y", "5 – 10Y", "10 – 20Y", "> 20Y"] },
];

export default function SuppliersPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Nhà cung cấp" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5 flex justify-between items-end max-md:flex-col max-md:items-start max-md:gap-3">
          <div>
            <h1 className="text-[24px] font-extrabold text-ink leading-tight">40+ nhà máy đã thẩm định</h1>
            <p className="text-[13px] text-mute mt-1">Tất cả nhà máy trên Cybersilkroads đều được audit on-site 2 lần/năm bởi đội ngũ Quảng Châu của chúng tôi.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Tất cả", "NCC Vàng", "Đã kiểm định", "Giao dịch đã xác minh"].map((t, i) => (
              <a key={t} className={`px-4 py-2 text-[12.5px] rounded-sm cursor-pointer ${i === 0 ? "bg-brand text-white font-semibold" : "border border-line text-mute hover:border-brand"}`}>{t}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 mt-4 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
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

        <div>
          <div className="text-[12px] text-mute mb-2">Hiển thị 9 / 40+ nhà máy</div>
          <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
            {FACTORIES.map((f) => (
              <Link key={f.slug} href={`/supplier/${f.slug}`} className="border border-line rounded-sm p-3.5 bg-paper hover:border-brand block">
                <div className="flex gap-3 items-start mb-3">
                  <div className="w-14 h-14 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[18px] text-brand flex-shrink-0">{f.initials}</div>
                  <div className="flex-1 min-w-0">
                    <b className="block text-[13px] font-semibold text-ink leading-tight mb-0.5 line-clamp-2">{f.name}</b>
                    <span className="text-[11.5px] text-mute"><span className="cn-flag" /> {f.location}</span>
                  </div>
                </div>
                <div className="flex gap-1 mb-2.5 flex-wrap">
                  {f.badges.gold && <span className="bg-gold text-brand-dark text-[10px] px-1.5 py-0.5 rounded-sm font-bold">VÀNG</span>}
                  {f.badges.audited && <span className="bg-success text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">ĐÃ KIỂM ĐỊNH</span>}
                  <span className="bg-brand text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">{f.badges.years}</span>
                </div>
                <div className="flex gap-3 text-[11.5px] text-mute mb-2.5 pb-2.5 border-b border-dashed border-line">
                  <span><b className="text-accent">★ {f.rating}</b> ({f.reviews} đánh giá)</span>
                  <span>{f.meta}</span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {f.tags.map((t) => (
                    <span key={t} className="text-[10.5px] bg-[#F5F5F5] text-mute px-2 py-0.5 rounded-sm">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center gap-1 mt-6 mb-7">
            {[1, 2, 3, 4, 5].map((p, i) => (
              <a key={i} className={`min-w-[34px] px-2.5 py-1.5 text-[12.5px] rounded-sm cursor-pointer ${p === 1 ? "bg-brand text-white font-semibold" : "border border-line text-mute hover:border-brand"}`}>{p}</a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Nhà cung cấp — Cybersilkroads" };
