import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { FACTORIES } from "@/data/home";

const TOURS = FACTORIES.slice(0, 8).map((f, i) => ({
  factory: f,
  duration: ["12:30", "8:45", "15:20", "9:10", "11:55", "7:30", "13:40", "10:25"][i],
}));

export default function FactoryTourPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Factory Tour" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[240px] bg-brand-dark">
          <img src="https://picsum.photos/seed/factory-tour/1400/300" alt="" className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 px-8 py-7 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
            <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🏭 FACTORY TOUR</span>
            <h1 className="text-[30px] font-extrabold leading-tight max-md:text-[22px]">Khám phá nhà máy trực tuyến</h1>
            <p className="text-[13.5px] opacity-90 max-w-[640px] mt-2">Video tour 360° quay tại 40+ nhà máy đối tác. Tự tin đặt hàng — biết chính xác hàng làm ở đâu, ai làm.</p>
          </div>
        </div>
      </div>

      {/* Featured tour */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">🎬 Tour featured tuần này</h2>
        <div className="bg-paper border border-line rounded overflow-hidden grid grid-cols-[1fr_320px] max-md:grid-cols-1">
          <div className="relative aspect-video bg-brand-dark">
            <img src="https://picsum.photos/seed/factory-tour-featured/900/500" alt="Featured tour" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center text-[34px] cursor-pointer hover:scale-110 transition">
                ▶
              </div>
            </div>
            <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[12px] px-2 py-1 rounded-sm">15:42</span>
          </div>
          <div className="p-5 flex flex-col justify-center">
            <span className="inline-block self-start bg-accent text-white px-2 py-0.5 text-[10.5px] font-bold rounded-sm tracking-wider mb-2">FEATURED</span>
            <h3 className="text-[20px] font-bold text-ink mb-1">Dongpeng Ceramics — Foshan Plant 3</h3>
            <p className="text-[12.5px] text-mute leading-relaxed mb-4">Tour dây chuyền porcelain mới đầu tư 2025: máy ép Sacmi 30,000 ton, in 8 màu HD digital, lò nung 250m. Sản lượng 50M m²/năm.</p>
            <div className="flex gap-3 text-[11.5px] text-mute mb-4 flex-wrap">
              <span>📍 Foshan</span>
              <span>•</span>
              <span>⏱ 15:42</span>
              <span>•</span>
              <span>👁 24,300 lượt xem</span>
            </div>
            <Link href="/supplier/dongpeng-ceramics" className="px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] text-center">Xem chi tiết NCC →</Link>
          </div>
        </div>
      </div>

      {/* Tour grid */}
      <div className="max-w-[1400px] mx-auto px-4 mt-7">
        <h2 className="text-[18px] font-bold text-ink mb-3">Tất cả Factory Tour</h2>
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
          {TOURS.map(({ factory, duration }) => (
            <Link key={factory.slug} href={`/supplier/${factory.slug}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand block">
              <div className="relative aspect-video bg-[#F5F5F5]">
                <img src={`https://picsum.photos/seed/tour-${factory.slug}/400/240`} alt={factory.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                  <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center text-[18px]">▶</div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] px-1.5 py-0.5 rounded-sm">{duration}</span>
              </div>
              <div className="p-2.5">
                <h4 className="text-[12.5px] font-semibold text-ink line-clamp-1">{factory.name}</h4>
                <div className="text-[11px] text-mute mt-0.5 flex justify-between">
                  <span>{factory.location.split(",")[0]}</span>
                  <span>★ {factory.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Booking */}
      <div className="max-w-[1400px] mx-auto px-4 mt-7 mb-7">
        <div className="bg-paper border border-line rounded p-6">
          <div className="flex justify-between items-end mb-4 max-md:flex-col max-md:items-start max-md:gap-3">
            <div>
              <h2 className="text-[20px] font-bold text-ink">📅 Đặt tour trực tiếp</h2>
              <p className="text-[12.5px] text-mute mt-1">Chúng tôi tổ chức tour 1-on-1 tại nhà máy thực tế. Có dịch giả, xe đưa đón sân bay Quảng Châu.</p>
            </div>
            <Link href="/buying-request" className="px-5 py-2.5 bg-accent text-white rounded-sm font-semibold text-[13px]">Yêu cầu booking →</Link>
          </div>
          <div className="grid grid-cols-5 gap-3 max-md:grid-cols-2">
            {FACTORIES.slice(0, 5).map((f) => (
              <Link key={f.slug} href={`/supplier/${f.slug}`} className="border border-line rounded p-3 text-center hover:border-brand block">
                <div className="w-12 h-12 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[16px] text-brand mx-auto mb-2">{f.initials}</div>
                <b className="block text-[11.5px] text-ink line-clamp-2 leading-tight mb-1">{f.name}</b>
                <span className="text-[10.5px] text-mute">{f.location.split(",")[0]}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Factory Tour — AlibabaVN" };
