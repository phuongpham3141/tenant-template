import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const TIERS = [
  {
    name: "Niêm yết",
    price: "0 đ",
    sub: "miễn phí",
    desc: "Niêm yết, kiểm định và mọi công cụ marketing — miễn phí 100%, không thu trước",
    features: ["Listing không giới hạn", "Inbox RFQ + ghép nối AI", "Hồ sơ NCC đã xác minh", "Hỗ trợ tiếng Việt 24/7", "Account manager song ngữ", "Banner ngành", "—"],
    accent: false,
  },
  {
    name: "Phí dịch vụ",
    price: "2%",
    sub: "/giá trị đơn phát sinh",
    desc: "Phí dịch vụ duy nhất theo Hợp đồng Quảng bá & Kết nối khách hàng Việt Nam — chỉ thu khi có đơn thành công",
    features: ["Chia sẻ doanh thu theo kết quả", "Chỉ thu khi đơn thành công", "Tài khoản trung gian Bảo đảm Giao dịch", "Người mua trả 0% phí", "Mức phí công khai, không phí ẩn", "Tự động khấu trừ", "Không phí thành viên hằng năm"],
    accent: true,
  },
  {
    name: "Hội nghị B2B Matching",
    price: "Miễn phí",
    sub: "theo từng lĩnh vực",
    desc: "Kết nối trực tiếp đại lý Việt Nam, kích hoạt theo điểm bùng phát dữ liệu nhu cầu — tham dự miễn phí",
    features: ["Tham dự miễn phí 100%", "Tổ chức theo từng lĩnh vực", "Top 3 ghép nối RFQ", "Account manager đồng hành", "Featured trang chủ", "Kiểm định miễn phí", "Trade show đại diện"],
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
        <h2 className="text-[22px] font-bold text-ink text-center mb-1">Mô hình phí thống nhất — minh bạch một mức</h2>
        <p className="text-[13px] text-mute text-center mb-5">Niêm yết và dự Hội nghị B2B Matching miễn phí 100%. Phí dịch vụ duy nhất 2% trên giá trị đơn hàng phát sinh, chỉ thu khi có đơn thành công.</p>
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
                Đăng ký miễn phí
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

      {/* B2B Matching conference */}
      <div className="max-w-[1400px] mx-auto px-4 mt-7">
        <div className="bg-paper border border-line rounded p-6 max-md:p-4">
          <h2 className="text-[22px] font-bold text-ink text-center mb-1">Điều kiện tham dự Hội nghị B2B Matching (miễn phí)</h2>
          <p className="text-[13px] text-mute text-center mb-5 max-w-[760px] mx-auto leading-relaxed">
            Hội nghị B2B Matching tổ chức theo từng lĩnh vực, kích hoạt theo &ldquo;điểm bùng phát&rdquo; dữ liệu nhu cầu của đại lý Việt Nam. Tham dự miễn phí. Nhà máy Trung Quốc khi tham dự BẮT BUỘC đáp ứng đủ 4 yêu cầu sau.
          </p>
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
            {[
              { icon: "🧑‍💼", t: "Hiện diện trực tiếp", d: "Đại diện có thẩm quyền của nhà máy tham dự trực tiếp tại hội nghị." },
              { icon: "📦", t: "Sản phẩm mẫu vật lý", d: "Mang sản phẩm mẫu vật lý để đại lý kiểm tra chất lượng tại chỗ." },
              { icon: "🎬", t: "Video dây chuyền nhà xưởng", d: "Chuẩn bị video dây chuyền sản xuất nhà xưởng thực tế." },
              { icon: "📖", t: "Catalog", d: "Mang catalog sản phẩm đầy đủ với thông số, MOQ và bậc giá." },
            ].map((r) => (
              <div key={r.t} className="bg-bg border border-line rounded p-4 text-center">
                <div className="text-[26px] mb-2">{r.icon}</div>
                <b className="block text-[13.5px] text-ink mb-1 leading-tight">{r.t}</b>
                <p className="text-[12px] text-mute leading-snug">{r.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center bg-success/10 border border-success/25 text-success font-semibold py-2.5 rounded-sm text-[13px]">
            Niêm yết và tham dự Hội nghị B2B Matching đều MIỄN PHÍ — chỉ thu phí dịch vụ 2% khi có đơn hàng thành công.
          </div>
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
          <p className="text-[13.5px] opacity-85 mb-4 max-w-[600px] mx-auto">Đăng ký miễn phí, kiểm định miễn phí. Niêm yết và dự Hội nghị B2B Matching miễn phí — chỉ thu phí dịch vụ 2% trên giá trị đơn hàng phát sinh khi có đơn thành công. Trung bình 30 ngày để go-live và nhận đơn đầu tiên.</p>
          <p className="text-[11.5px] opacity-70 mb-4 max-w-[640px] mx-auto leading-relaxed">Phí dịch vụ 2% theo Hợp đồng Quảng bá &amp; Kết nối khách hàng Việt Nam (chia sẻ doanh thu theo kết quả), bảo hộ [5 năm — placeholder, cần xác nhận pháp lý]; hành vi né phí chịu phạt [8% — placeholder, cần xác nhận pháp lý] theo điều khoản hợp đồng.</p>
          <Link href="/register/factory" className="inline-block px-8 py-3.5 bg-gold text-brand-dark rounded-sm font-bold text-[15px]">🚀 Đăng ký nhà máy ngay</Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Sell on AVN — Bán hàng trên AlibabaVN" };
