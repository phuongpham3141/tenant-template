import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const BENEFITS = [
  { icon: "💰", title: "Đảm bảo thanh toán", desc: "Buyer đặt cọc 30% vào tài khoản trung gian ngay khi ký PI — bạn yên tâm sản xuất, không lo bị huỷ giữa chừng." },
  { icon: "🛡", title: "Bảo hiểm rủi ro vận chuyển", desc: "Cybersilkroads mua bảo hiểm All-Risk cho mọi đơn STS — bồi thường 110% giá FOB nếu container hỏng/cháy/mất." },
  { icon: "⚖", title: "Hỗ trợ pháp lý song ngữ", desc: "Đội Baker McKenzie + YKVN hỗ trợ tranh chấp hợp đồng. Phiên dịch họp với buyer miễn phí 60 phút/đơn." },
  { icon: "📈", title: "Mở rộng buyer pool", desc: "Đơn STS hiển thị badge 'Verified Trade' → ưu tiên xếp hạng tìm kiếm. Buyer Việt Nam thích đơn STS hơn 4× đơn thường." },
];

const STEPS = [
  { n: 1, title: "Buyer gửi RFQ → bạn báo giá", desc: "Buyer thấy badge 'Đăng ký STS' trên profile của bạn. Báo giá kèm điều khoản 30-40-30." },
  { n: 2, title: "Ký PI + Đã nạp tài khoản trung gian", desc: "Buyer ký PI điện tử và chuyển 30% cọc vào tài khoản ký quỹ Vietcombank. Bạn nhận thông báo, bắt đầu sản xuất." },
  { n: 3, title: "Sản xuất + cập nhật milestone", desc: "Upload ảnh dây chuyền hàng tuần lên e-Home. Tới hạn xuất xưởng → buyer release 40% tiếp." },
  { n: 4, title: "QC kiểm hàng + niêm phong", desc: "QIMA/SGS kiểm 10% lô theo AQL 2.5 — đạt → niêm phong container. Phí QC buyer trả." },
  { n: 5, title: "Vận chuyển — bạn nhận 70%", desc: "Container ra cảng → tài khoản trung gian tự giải ngân 70% (cọc 30% + xuất xưởng 40%) cho bạn ngay khi B/L phát hành." },
  { n: 6, title: "Buyer nhận hàng → payout 30% cuối", desc: "Buyer xác nhận trên app trong 14 ngày → tài khoản trung gian giải ngân nốt 30%. Đơn đóng, bạn được rating + STS credit." },
];

const FEES = [
  { item: "Phí trung gian STS", v: "0.5%", per: "trên giá trị đơn", note: "Có thể chia 50/50 với buyer (deal phổ biến)" },
  { item: "Phí dịch báo giá AI", v: "Miễn phí", per: "—", note: "Tích hợp sẵn cho NCC Vàng" },
  { item: "Phiên dịch hợp đồng VN-CN", v: "Miễn phí", per: "60 phút đầu", note: "$50/giờ tiếp theo" },
  { item: "QC kiểm hàng tại xưởng", v: "Buyer trả", per: "—", note: "Bạn không gánh phí, chỉ đón đoàn QC" },
];

const CASES = [
  {
    title: "Foshan Tile — đơn $84K không lo công nợ",
    desc: "NCC sản xuất 4,200m² porcelain cho chuỗi khách sạn VN. Người mua chậm giải ngân 30% cuối → tài khoản trung gian tự động chuyển sau 14 ngày. NCC nhận đủ tiền không cần đòi nợ.",
    metric: "100% thanh toán đúng hạn",
  },
  {
    title: "Shenzhen LED — bứt phá 6× đơn nhờ STS badge",
    desc: "Sau 3 tháng đăng ký STS, profile NCC được đề xuất cho 320 buyer mới. Conversion RFQ → Order tăng từ 8% lên 23%.",
    metric: "+520% doanh thu",
  },
  {
    title: "KUKA Home — bồi thường $12K container hỏng",
    desc: "Container 30 sofa va đập tại cảng Singapore. Bảo hiểm Cybersilkroads đền $12,400 trong 11 ngày — KUKA kịp gửi lô thay thế giữ uy tín với buyer.",
    metric: "Đền $12K trong 11 ngày",
  },
];

export default function TradingServicePage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực nhà bán", href: "/seller-center" }, { label: "Dịch vụ giao dịch" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/trading-service" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-success/15 text-success px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🔒 GIAO DỊCH BẢO ĐẢM — DÀNH CHO NHÀ BÁN</div>
            <h1 className="text-[22px] font-bold text-ink">Dịch vụ giao dịch (góc nhìn nhà bán)</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              STS không chỉ bảo vệ buyer — nó bảo vệ <b>bạn</b>. Người mua cọc thật vào tài khoản trung gian trước khi bạn cắt vải/đổ phôi/đặt nguyên liệu. Container hỏng? Bảo hiểm đền. Buyer chậm trả? Tài khoản trung gian tự giải ngân theo timeline. Tranh chấp? Có hỗ trợ pháp lý song ngữ.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[28px] mb-2">{b.icon}</div>
                <b className="block text-[13.5px] text-ink mb-1">{b.title}</b>
                <p className="text-[11.5px] text-mute leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🔄 Quy trình 6 bước (góc nhìn supplier)</b>
            <div className="space-y-3">
              {STEPS.map((s, i) => (
                <div key={s.n} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 bg-success text-white rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0">{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px bg-line mt-1 min-h-[20px]" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <b className="block text-[13px] text-ink mb-1">{s.title}</b>
                    <p className="text-[12px] text-mute leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-3">💵 Phí — chỉ 0.5% cho NCC</b>
            <p className="text-[12px] text-mute mb-4">Phí trung gian rất thấp so với chi phí công nợ và rủi ro thông thường. Hầu hết NCC chia 50/50 với buyer — chỉ trả 0.25% thực tế.</p>
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">Khoản phí</th>
                  <th className="text-left px-3 py-2.5 font-medium">Giá</th>
                  <th className="text-left px-3 py-2.5 font-medium">Tính theo</th>
                  <th className="text-left px-3 py-2.5 font-medium">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((f) => (
                  <tr key={f.item} className="border-t border-line">
                    <td className="px-3 py-3 text-ink font-semibold">{f.item}</td>
                    <td className="px-3 py-3 text-accent font-bold">{f.v}</td>
                    <td className="px-3 py-3 text-mute">{f.per}</td>
                    <td className="px-3 py-3 text-mute text-[11.5px]">{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">📋 Case studies — NCC đã hưởng lợi</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.title} className="border border-line rounded p-4 bg-[#FAFBFC]">
                  <b className="block text-[13px] text-ink leading-tight mb-2">{c.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                  <div className="border-t border-line pt-2 flex justify-between items-baseline">
                    <span className="text-[10.5px] text-mute">Kết quả</span>
                    <b className="text-[13px] text-success">{c.metric}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/seller-center/trade-ehome" className="block bg-success text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">🔒 Bật STS cho tất cả đơn của bạn</b>
            <p className="text-[12.5px] opacity-90">Vào e-Home → Cài đặt → Auto-enable STS. Buyer thấy badge "Giao dịch đã xác minh" trên mọi listing của bạn.</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Dịch vụ giao dịch — Seller Center" };
