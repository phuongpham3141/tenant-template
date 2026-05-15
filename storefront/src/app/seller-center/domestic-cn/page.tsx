import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const CHANNELS = [
  {
    name: "Tmall (天猫)",
    operator: "Alibaba Group",
    audience: "Trung lưu + cao cấp đô thị",
    pros: ["1.2 tỷ user Taobao/Tmall", "Brand-friendly, phù hợp thương hiệu lớn", "Big sales 11.11, 6.18 doanh số 10× ngày thường"],
    cons: ["Phí setup ~ ¥60K + bảo lãnh ¥50K", "Cần TM trademark TQ", "Cạnh tranh khốc liệt"],
    fee: "¥60K setup · 0.5-5% commission",
    img: 81,
  },
  {
    name: "JD.com (京东)",
    operator: "JD Group",
    audience: "Tech-savvy, electronics, FMCG",
    pros: ["Logistics riêng — giao 1-2 ngày 90% TQ", "Chất lượng tốt, ít hàng giả", "Dữ liệu khách hàng minh bạch hơn Tmall"],
    cons: ["Phí setup ¥30-100K tuỳ ngành", "JD ưu tiên brand đã có chứng nhận", "Cần kho ở TQ"],
    fee: "¥30-100K setup · 2-8% commission",
    img: 82,
  },
  {
    name: "1688.com",
    operator: "Alibaba B2B",
    audience: "B2B nội địa, phân phối, OEM",
    pros: ["Chuyên B2B — phù hợp NCC sản xuất", "Phí thấp ~ ¥1,688/năm", "Dễ lên đơn lớn từ wholesalers"],
    cons: ["Margin thấp (B2B = giá sỉ)", "Cần catalog & mẫu phong phú", "Phải đầu tư showroom 1688"],
    fee: "¥1,688/năm · 0% commission",
    img: 83,
  },
];

const COMPARE = [
  { feature: "Phí setup ban đầu", tmall: "¥60K", jd: "¥30-100K", c1688: "¥1,688/năm" },
  { feature: "Commission", tmall: "0.5-5%", jd: "2-8%", c1688: "0%" },
  { feature: "Audience", tmall: "B2C đô thị", jd: "B2C tech", c1688: "B2B sỉ + OEM" },
  { feature: "Traffic miễn phí", tmall: "Trung bình", jd: "Cao", c1688: "Cao (B2B)" },
  { feature: "Phí marketing tối thiểu", tmall: "¥30K/tháng", jd: "¥15K/tháng", c1688: "¥5K/tháng" },
  { feature: "ROI điển hình năm đầu", tmall: "1.4-2.2×", jd: "1.6-2.5×", c1688: "1.8-3.0×" },
];

const SERVICES = [
  { icon: "🏪", title: "Đăng ký shop trọn gói", desc: "Lo đăng ký kinh doanh TQ (nếu chưa có), TM trademark, bảo lãnh ngân hàng." },
  { icon: "✨", title: "Listing optimization", desc: "Viết tiêu đề SEO theo Taobao algorithm, ảnh A+ chuẩn marketplace, video sản phẩm 30s." },
  { icon: "📢", title: "Quảng cáo Taobao Zhitongche", desc: "Đội quảng cáo chuyên Taobao — keyword bidding, super recommend, brand zone. ROI mục tiêu 3.5×." },
  { icon: "💬", title: "Customer service tiếng Trung", desc: "Đội Wangwang chat 16h/ngày — DSR rating mục tiêu ≥ 4.85 (yêu cầu Tmall T-Mall Premium)." },
  { icon: "📈", title: "Reporting & analytics", desc: "Dashboard tổng hợp 3 nền tảng — doanh thu, conversion, return rate, top SKU. Báo cáo tuần qua DingTalk." },
];

const CASES = [
  {
    company: "OPPEIN Home (kitchen cabinet)",
    desc: "Trước đây 100% xuất khẩu, mở Tmall + 1688 năm 2024. Sau 18 tháng nội địa chiếm 32% doanh thu, giúp ổn định khi xuất khẩu chậm Q2/2025.",
    metric: "Nội địa = 32% revenue",
    img: 91,
  },
  {
    company: "KUKA Home (sofa)",
    desc: "Triển khai song song Tmall (B2C) + 1688 (showroom đại lý) + xuất khẩu Cybersilkroads. 3 kênh share warehouse + share QC team — giảm 18% cost overhead.",
    metric: "−18% overhead",
    img: 92,
  },
];

export default function DomesticCnPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực nhà bán", href: "/seller-center" }, { label: "Nội địa Trung Quốc" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/domestic-cn" />
        <div>
          <div className="bg-gradient-to-br from-red-700 to-yellow-500 text-white rounded p-6 mb-4">
            <div className="inline-block bg-white text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🇨🇳 MIC DOMESTIC TRADE</div>
            <h1 className="text-[26px] font-bold leading-tight">Bán hàng nội địa Trung Quốc</h1>
            <p className="text-[14px] opacity-95 mt-2 leading-relaxed max-w-[680px]">
              Nhà máy TQ có thể bán nội địa song song với xuất khẩu — đa dạng hoá doanh thu, ổn định dòng tiền khi thị trường XK biến động. Cybersilkroads hỗ trợ on-board Tmall, JD, 1688 cho NCC đang chỉ làm xuất khẩu.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {CHANNELS.map((c) => (
              <div key={c.name} className="bg-paper border border-line rounded overflow-hidden hover:border-brand">
                <img src={`/img/seller-cn-${c.img}.jpg?v=3`} alt="" className="w-full h-[120px] object-cover" />
                <div className="p-4">
                  <b className="block text-[14px] text-ink">{c.name}</b>
                  <span className="text-[11px] text-mute mb-2 block">Vận hành: {c.operator}</span>
                  <p className="text-[11.5px] text-ink mb-2"><b>Audience:</b> {c.audience}</p>
                  <div className="border-t border-line pt-2">
                    <span className="text-[10.5px] text-mute font-semibold uppercase tracking-wider">Ưu điểm</span>
                    <ul className="mt-1 mb-2 space-y-0.5">
                      {c.pros.map((p) => <li key={p} className="text-[11.5px] text-ink flex gap-1"><span className="text-success">✓</span> {p}</li>)}
                    </ul>
                    <span className="text-[10.5px] text-mute font-semibold uppercase tracking-wider">Cần cân nhắc</span>
                    <ul className="mt-1 mb-2 space-y-0.5">
                      {c.cons.map((p) => <li key={p} className="text-[11.5px] text-mute flex gap-1"><span className="text-accent">!</span> {p}</li>)}
                    </ul>
                  </div>
                  <div className="bg-surface-2 rounded-sm px-2 py-1.5 text-[11px] text-accent font-semibold">{c.fee}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4 overflow-x-auto">
            <b className="block text-[15px] text-ink mb-4">📊 So sánh 3 kênh nội địa</b>
            <table className="w-full text-[12.5px] min-w-[560px]">
              <thead className="bg-surface-2 text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">Yếu tố</th>
                  <th className="text-left px-3 py-2.5 font-medium">Tmall</th>
                  <th className="text-left px-3 py-2.5 font-medium">JD.com</th>
                  <th className="text-left px-3 py-2.5 font-medium">1688</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((c) => (
                  <tr key={c.feature} className="border-t border-line">
                    <td className="px-3 py-2.5 text-ink font-semibold">{c.feature}</td>
                    <td className="px-3 py-2.5 text-mute">{c.tmall}</td>
                    <td className="px-3 py-2.5 text-mute">{c.jd}</td>
                    <td className="px-3 py-2.5 text-mute">{c.c1688}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🛠 Hỗ trợ on-board — 5 dịch vụ</b>
            <div className="grid grid-cols-5 gap-3 max-md:grid-cols-2">
              {SERVICES.map((s) => (
                <div key={s.title} className="border border-line rounded p-3 hover:border-brand">
                  <div className="text-[24px] mb-2">{s.icon}</div>
                  <b className="block text-[12.5px] text-ink mb-1">{s.title}</b>
                  <p className="text-[11px] text-mute leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🏆 Case studies — NCC đa kênh thành công</b>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.company} className="border border-line rounded overflow-hidden hover:border-brand grid grid-cols-[140px_1fr] max-md:grid-cols-1">
                  <img src={`/img/seller-cn-case-${c.img}.jpg?v=3`} alt="" className="w-full h-full object-cover max-md:h-[140px]" />
                  <div className="p-4">
                    <b className="block text-[13px] text-ink mb-2">{c.company}</b>
                    <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                    <div className="border-t border-line pt-2 flex justify-between items-baseline">
                      <span className="text-[10.5px] text-mute">Kết quả</span>
                      <b className="text-[13px] text-success">{c.metric}</b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="#" className="block bg-brand text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">🇨🇳 Tư vấn on-board nội địa miễn phí</b>
            <p className="text-[12.5px] opacity-90">Đội Tmall/JD/1688 phân tích catalog của bạn — chọn kênh phù hợp + lộ trình 6 tháng.</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Bán hàng nội địa Trung Quốc — Seller Center" };
