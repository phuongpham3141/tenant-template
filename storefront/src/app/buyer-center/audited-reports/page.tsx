import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";

const TABS = ["Tất cả", "TÜV Rheinland", "SGS", "Bureau Veritas", "Intertek", "Cybersilkroads Internal"];

const REPORTS = [
  {
    initials: "DP",
    name: "Guangdong Dongpeng Ceramics",
    location: "Foshan · Guangdong",
    date: "12/03/2026",
    auditor: "TÜV Rheinland",
    score: 92,
    kpi: { quality: 95, capacity: 90, compliance: 91 },
    slug: "dongpeng-ceramics",
  },
  {
    initials: "KK",
    name: "Hangzhou KUKA Home",
    location: "Hangzhou · Zhejiang",
    date: "08/03/2026",
    auditor: "SGS",
    score: 89,
    kpi: { quality: 90, capacity: 92, compliance: 85 },
    slug: "kuka-home",
  },
  {
    initials: "OP",
    name: "OPPEIN Home Group",
    location: "Guangzhou",
    date: "01/03/2026",
    auditor: "Bureau Veritas",
    score: 96,
    kpi: { quality: 97, capacity: 95, compliance: 96 },
    slug: "oppein-home",
  },
  {
    initials: "MN",
    name: "Monalisa Group",
    location: "Foshan · Guangdong",
    date: "24/02/2026",
    auditor: "TÜV Rheinland",
    score: 91,
    kpi: { quality: 93, capacity: 88, compliance: 92 },
    slug: "monalisa-group",
  },
  {
    initials: "OB",
    name: "Ortonbaths Group",
    location: "Shenzhen",
    date: "18/02/2026",
    auditor: "Intertek",
    score: 88,
    kpi: { quality: 92, capacity: 84, compliance: 88 },
    slug: "ortonbaths-group",
  },
  {
    initials: "LB",
    name: "Landbond Furniture Group",
    location: "Foshan & Linyi",
    date: "10/02/2026",
    auditor: "Cybersilkroads Internal",
    score: 90,
    kpi: { quality: 91, capacity: 89, compliance: 90 },
    slug: "landbond-furniture",
  },
  {
    initials: "NP",
    name: "NewPearl Ceramics Group",
    location: "Foshan",
    date: "02/02/2026",
    auditor: "SGS",
    score: 87,
    kpi: { quality: 89, capacity: 85, compliance: 87 },
    slug: "newpearl-ceramics",
  },
  {
    initials: "ZY",
    name: "ZuoYou Furniture",
    location: "Shenzhen",
    date: "28/01/2026",
    auditor: "Cybersilkroads Internal",
    score: 85,
    kpi: { quality: 86, capacity: 84, compliance: 85 },
    slug: "zuoyou-furniture",
  },
];

function ScoreBadge({ s }: { s: number }) {
  const color = s >= 90 ? "bg-success/20 text-success" : s >= 85 ? "bg-gold/40 text-brand-dark" : "bg-mute2/30 text-mute";
  return <span className={`text-[11px] font-bold px-2 py-0.5 rounded-sm ${color}`}>{s}/100</span>;
}

function Bar({ v }: { v: number }) {
  return (
    <div className="h-1.5 bg-line rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${v >= 90 ? "bg-success" : v >= 85 ? "bg-gold" : "bg-brand"}`} style={{ width: `${v}%` }} />
    </div>
  );
}

export default function AuditedReportsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực người mua", href: "/buyer-center" }, { label: "Báo cáo nhà máy đã thẩm định" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/audited-reports" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-success/15 text-success px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🛡 BÁO CÁO KIỂM ĐỊNH NHÀ MÁY</div>
            <h1 className="text-[22px] font-bold text-ink">Báo cáo nhà máy đã thẩm định</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              Truy cập miễn phí {REPORTS.length}+ báo cáo audit do TÜV Rheinland, SGS, Bureau Veritas, Intertek và đội Cybersilkroads Internal thực hiện trong 12 tháng gần nhất. Mỗi báo cáo đánh giá 3 trục: chất lượng sản xuất, năng lực cung ứng và tuân thủ.
            </p>
          </div>

          <div className="bg-paper border border-line rounded">
            <div className="flex gap-0 border-b border-line px-2 overflow-x-auto">
              {TABS.map((t, i) => (
                <a key={t} className={`px-4 py-3 text-[12.5px] cursor-pointer border-b-2 -mb-px whitespace-nowrap ${i === 0 ? "text-brand border-brand font-semibold" : "text-mute border-transparent hover:text-brand"}`}>
                  {t}
                </a>
              ))}
            </div>
            <div className="p-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">
              {REPORTS.map((r) => (
                <div key={r.slug} className="border border-line rounded p-4 hover:border-brand transition-colors">
                  <div className="flex gap-3 items-start mb-3">
                    <div className="w-12 h-12 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[15px] text-brand flex-shrink-0">{r.initials}</div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/supplier/${r.slug}`} className="block">
                        <b className="block text-[13px] text-ink leading-tight hover:text-brand line-clamp-2">{r.name}</b>
                      </Link>
                      <span className="text-[11px] text-mute">{r.location}</span>
                    </div>
                    <ScoreBadge s={r.score} />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-mute mb-3">
                    <span>📅 {r.date}</span>
                    <span className="text-brand font-semibold">{r.auditor}</span>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1"><span className="text-ink">Chất lượng</span><span className="text-mute">{r.kpi.quality}</span></div>
                      <Bar v={r.kpi.quality} />
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1"><span className="text-ink">Năng lực</span><span className="text-mute">{r.kpi.capacity}</span></div>
                      <Bar v={r.kpi.capacity} />
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1"><span className="text-ink">Tuân thủ</span><span className="text-mute">{r.kpi.compliance}</span></div>
                      <Bar v={r.kpi.compliance} />
                    </div>
                  </div>
                  <button className="w-full px-3 py-2 bg-brand text-white rounded-sm text-[12px] font-semibold hover:opacity-90">📄 Tải báo cáo PDF</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mt-4">
            <b className="block text-[15px] text-ink mb-1">📋 Đăng ký báo cáo audit theo nhu cầu</b>
            <p className="text-[12px] text-mute mb-4">Chưa thấy NCC bạn cần? Yêu cầu audit riêng — chúng tôi sẽ điều phối auditor đến nhà máy trong 30 ngày, chia sẻ kết quả riêng cho bạn.</p>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              <input placeholder="Ngành hàng (vd: gốm sứ)" className="px-3 py-2.5 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
              <input placeholder="Sản lượng/tháng (vd: 5,000 m²)" className="px-3 py-2.5 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
              <input placeholder="Email liên hệ" className="px-3 py-2.5 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
            </div>
            <button className="mt-3 px-5 py-2.5 bg-accent text-white rounded-sm font-bold text-[12.5px] hover:opacity-90">Gửi yêu cầu audit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Báo cáo nhà máy đã thẩm định — Buyer Center" };
