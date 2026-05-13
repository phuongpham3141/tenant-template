import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { ZONES } from "@/data/home";

const ZONE_DESC: Record<string, string> = {
  "foshan-ceramic": "Trung tâm gốm sứ lớn nhất Trung Quốc — chiếm 60% sản lượng porcelain toàn cầu.",
  "taizhou-faucet": "Thủ phủ vòi nước & sanitary fittings — 480 nhà máy xuất khẩu khắp thế giới.",
  "foshan-furniture": "Cluster nội thất lớn nhất châu Á — 3,000+ nhà máy với chuỗi cung ứng đầy đủ.",
  "zhongshan-light": "Vương quốc đèn LED — 2,200 nhà máy chiếu sáng dân dụng và thương mại.",
  "jinjiang-wood": "Trung tâm sàn gỗ và đồ gỗ engineered — 340 nhà máy chuyên xuất khẩu.",
  "chaozhou-sanitary": "Thủ phủ sanitary ceramic — toilet, basin, bathtub cao cấp xuất khẩu.",
};

export default function ZonesPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Trading Zones" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5">
          <h1 className="text-[24px] font-extrabold text-ink leading-tight">🗺️ Trading Zones — Cluster công nghiệp Trung Quốc</h1>
          <p className="text-[13px] text-mute mt-1">6 cluster lớn nhất chuyên ngành vật liệu, nội thất, sanitary, đèn LED. Mua trực tiếp tại nguồn — giá tốt nhất.</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {ZONES.map((z) => (
            <Link key={z.slug} href={`/zone/${z.slug}`} className="bg-paper border border-line rounded overflow-hidden hover:border-brand block group">
              <div className="aspect-[16/9] bg-[#F5F5F5] relative overflow-hidden">
                {z.image ? <img src={z.image} alt={z.name} className="w-full h-full object-cover group-hover:scale-105 transition" /> : null}
                <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 60%, rgba(0,37,87,0.85))" }} />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <b className="block text-[18px] font-bold leading-tight">{z.name}</b>
                  <span className="text-[12px] opacity-90">{z.count}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[12.5px] text-mute leading-relaxed">{ZONE_DESC[z.slug] ?? "Cụm công nghiệp chuyên ngành với nhiều nhà máy đối tác đã audit."}</p>
                <span className="text-brand text-[12.5px] font-semibold mt-3 block">Khám phá cluster →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5 mb-7">
        <h2 className="text-[18px] font-bold text-ink mb-3">📍 Bản đồ cluster Trung Quốc</h2>
        <div className="relative rounded overflow-hidden h-[420px] bg-brand-dark">
          <img src="/img/china-map.jpg?v=3" alt="map" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center text-white" style={{ background: "rgba(0,37,87,0.5)" }}>
            <div className="text-center">
              <div className="text-[42px] mb-2">🗺️</div>
              <b className="block text-[20px] font-bold">6 cluster trên bản đồ</b>
              <p className="text-[12.5px] opacity-90 max-w-[480px] mx-auto mt-2">Bản đồ tương tác với pin location cho từng cluster sẽ ra mắt Q2/2026. Hiện tại click vào card phía trên để xem chi tiết.</p>
            </div>
          </div>
          {/* dot markers */}
          {ZONES.map((z, i) => (
            <span
              key={z.slug}
              className="absolute w-3 h-3 bg-gold rounded-full ring-4 ring-gold/40"
              style={{
                top: `${30 + (i % 3) * 18}%`,
                left: `${20 + i * 12}%`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Trading Zones — Cybersilkroads" };
