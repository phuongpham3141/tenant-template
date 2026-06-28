import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const TIERS = [
  {
    name: "Free",
    price: "0 NDT",
    sub: "/năm",
    desc: "Listing cơ bản, phù hợp NCC mới muốn thử nghiệm",
    features: ["Listing 20 sản phẩm", "Inbox RFQ cơ bản", "Hồ sơ NCC chuẩn", "Hỗ trợ email", "—", "—", "—"],
    accent: false,
  },
  {
    name: "Verified",
    price: "8,000 NDT",
    sub: "/năm",
    desc: "Audited tier, ưu tiên trên search, account manager",
    features: ["Listing không giới hạn", "Inbox RFQ ưu tiên", "Audited badge", "Hỗ trợ tiếng Việt 24/7", "Account manager", "Banner ngành", "—"],
    accent: true,
  },
  {
    name: "Gold",
    price: "50,000 NDT",
    sub: "/năm",
    desc: "Top tier — featured banner trang chủ, ưu tiên match RFQ top 3",
    features: ["Listing không giới hạn", "Top 3 match RFQ", "Gold + Audited badge", "Account manager riêng", "Featured trang chủ", "Audit free 2 lần/năm", "Trade show đại diện"],
    accent: false,
  },
];

const STEPS = [
  { n: 1, t: "Đăng ký", d: "Điền form, nộp giấy phép kinh doanh và ISO. 10 phút." },
  { n: 2, t: "Audit", d: "Đội AlibabaVN đến nhà máy kiểm tra. 7-15 ngày." },
  { n: 3, t: "Listing", d: "Onboarding sản phẩm, training 1-on-1. 3-5 ngày." },
  { n: 4, t: "Bán hàng", d: "Nhận RFQ, báo giá, đóng đơn. Bắt đầu xuất khẩu." },
];

const STORIES = [
  { name: "Foshan Hanse Industrial", loc: "Foshan", before: "20 đơn / tháng", after: "85 đơn / tháng", lift: "+325%", years: "6Y on AVN" },
  { name: "OPPEIN Home Group", loc: "Guangzhou", before: "$80K / tháng", after: "$420K / tháng", lift: "+425%", years: "5Y on AVN" },
  { name: "Taizhou Faucet Group", loc: "Taizhou", before: "0 dealer VN", after: "32 dealer VN", lift: "+32 dealers", years: "4Y on AVN" },
  { name: "Landbond Furniture", loc: "Foshan", before: "$60K / tháng", after: "$280K / tháng", lift: "+367%", years: "7Y on AVN" },
  { name: "Ortonbaths Group", loc: "Shenzhen", before: "5% xuất khẩu VN", after: "32% xuất khẩu VN", lift: "+540%", years: "3Y on AVN" },
  { name: "Monalisa Ceramic", loc: "Foshan", before: "$120K / tháng", after: "$680K / tháng", lift: "+466%", years: "8Y on AVN" },
];

export default function SellOnAVNPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Sell on AVN" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[260px] bg-brand-dark">
          <img src="https://picsum.photos/seed/sell-on-avn/1400/320" alt="" className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 px-8 py-7 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
            <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🏭 SELL ON ALIBABAVN</span>
            <h1 className="text-[34px] font-extrabold leading-tight max-md:text-[24px]">Bán hàng trên AlibabaVN<br className="max-md:hidden" /> — Tiếp cận 600+ dealer Việt Nam</h1>
            <p className="text-[14px] opacity-90 max-w-[640px] mt-2">Nền tảng B2B số 1 tại Việt Nam cho ngành vật liệu, nội thất và sanitary. Đã có 40+ nhà máy đối tác đạt tăng trưởng 300%+ sau khi join.</p>
            <div className="mt-4 flex gap-2.5">
              <Link href="/register/factory" className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px]">🚀 Đăng ký nhà máy ngay</Link>
              <Link href="/info/quy-trinh-audit" className="px-6 py-3 border border-white/40 text-white rounded-sm font-semibold text-[13.5px]">Xem quy trình audit</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tier plans */}
      <div className="max-w-[1400px] mx-auto px-4 mt-7">
        <h2 className="text-[22px] font-bold text-ink text-center mb-1">Chọn gói phù hợp</h2>
        <p className="text-[13px] text-mute text-center mb-5">Mọi tier đều có audit free, hỗ trợ tiếng Việt, không phí giao dịch.</p>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {TIERS.map((t) => (
            <div key={t.name} className={`bg-paper border-2 rounded p-5 ${t.accent ? "border-brand" : "border-line"}`}>
              {t.accent && <span className="inline-block bg-brand text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider mb-2">RECOMMENDED</span>}
              <h3 className="text-[20px] font-bold text-ink">{t.name}</h3>
              <div className="mt-2 mb-3">
                <span className="text-[28px] font-extrabold text-brand">{t.price}</span>
                <span className="text-[12px] text-mute ml-1">{t.sub}</span>
              </div>
              <p className="text-[12.5px] text-mute mb-4 leading-snug">{t.desc}</p>
              <ul className="space-y-2 text-[12.5px] text-ink mb-5">
                {t.features.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    {f === "—" ? <span className="text-mute2">✕</span> : <span className="text-success">✓</span>} <span className={f === "—" ? "text-mute2" : ""}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register/factory" className={`block w-full text-center py-2.5 rounded-sm font-semibold text-[13px] ${t.accent ? "bg-brand text-white" : "border border-brand text-brand"}`}>
                Bắt đầu {t.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="max-w-[1400px] mx-auto px-4 mt-7">
        <h2 className="text-[22px] font-bold text-ink text-center mb-5">Quy trình 4 bước</h2>
        <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-paper border border-line rounded p-5 text-center">
              <div className="w-12 h-12 bg-gold text-brand-dark rounded-full flex items-center justify-center font-extrabold text-[20px] mx-auto mb-3">{s.n}</div>
              <b className="block text-[15px] text-ink mb-1">{s.t}</b>
              <p className="text-[12px] text-mute leading-snug">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stories */}
      <div className="max-w-[1400px] mx-auto px-4 mt-7">
        <h2 className="text-[22px] font-bold text-ink text-center mb-5">Câu chuyện thành công</h2>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {STORIES.map((s) => (
            <div key={s.name} className="bg-paper border border-line rounded p-4">
              <div className="flex justify-between items-start mb-2">
                <b className="text-[14px] text-ink">{s.name}</b>
                <span className="text-[10.5px] text-mute">{s.years}</span>
              </div>
              <span className="text-[11.5px] text-mute">📍 {s.loc}</span>
              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-line text-[12px]">
                <div>
                  <div className="text-mute">Trước</div>
                  <b className="text-ink">{s.before}</b>
                </div>
                <div>
                  <div className="text-mute">Sau</div>
                  <b className="text-success">{s.after}</b>
                </div>
              </div>
              <div className="mt-2 text-center bg-success/10 text-success font-bold py-1.5 rounded-sm text-[13px]">{s.lift}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Big CTA */}
      <div className="max-w-[1400px] mx-auto px-4 mt-7 mb-7">
        <div className="bg-brand-dark text-white rounded p-7 text-center">
          <h3 className="text-[24px] font-bold mb-2">Sẵn sàng tăng doanh thu xuất khẩu Việt Nam?</h3>
          <p className="text-[13.5px] opacity-85 mb-4 max-w-[600px] mx-auto">Đăng ký miễn phí, audit miễn phí. Trung bình 30 ngày để go-live và nhận đơn đầu tiên.</p>
          <Link href="/register/factory" className="inline-block px-8 py-3.5 bg-gold text-brand-dark rounded-sm font-bold text-[15px]">🚀 Đăng ký nhà máy ngay</Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Sell on AVN — Bán hàng trên AlibabaVN" };
