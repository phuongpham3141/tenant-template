import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";

const LAYERS = [
  {
    icon: "💰",
    title: "Trung gian thanh toán",
    desc: "Tiền của bạn được giữ tại tài khoản ký quỹ Cybersilkroads, chỉ giải ngân cho NCC khi hàng đạt QC và bạn xác nhận đã nhận đủ.",
    bullets: ["Ký quỹ tại ngân hàng đối tác (Vietcombank / BIDV)", "Giải ngân theo milestone: 30% cọc – 40% xuất xưởng – 30% nhận hàng", "Hoàn 100% nếu giao trễ > 30 ngày"],
  },
  {
    icon: "🔍",
    title: "QC kiểm hàng tại xưởng",
    desc: "Đội QC độc lập kiểm tra ngẫu nhiên 10% sản lượng theo AQL 2.5 trước khi container niêm phong.",
    bullets: ["Báo cáo ảnh + video chi tiết trong 48h", "Test theo tiêu chuẩn ISO/EN/ASTM phù hợp", "Buyer có quyền từ chối lô không đạt"],
  },
  {
    icon: "🚢",
    title: "Bảo hiểm vận chuyển",
    desc: "Mọi container đi qua Dịch vụ giao dịch bảo đảm đều được mua bảo hiểm All-Risk với mức bồi thường lên đến 110% giá trị hàng.",
    bullets: ["Bảo hiểm hợp tác cùng PVI / Bảo Việt", "Cover từ kho NCC đến kho buyer (DDP)", "Khiếu nại xử lý trong 14 ngày"],
  },
];

const TIMELINE = [
  { n: 1, title: "Ký hợp đồng & cọc qua tài khoản trung gian", desc: "Buyer chuyển 30% giá trị đơn vào tài khoản ký quỹ. NCC thấy 'đã đặt cọc' và bắt đầu sản xuất." },
  { n: 2, title: "Sản xuất + theo dõi tiến độ", desc: "NCC update ảnh dây chuyền hàng tuần. Bạn có thể đặt thêm QC giai đoạn (in-line inspection) tuỳ chọn." },
  { n: 3, title: "QC kiểm hàng trước xuất", desc: "Sau khi NCC báo hoàn thành, đội QC Cybersilkroads đến xưởng kiểm 10% lô. Đạt → niêm phong container." },
  { n: 4, title: "Vận chuyển + bảo hiểm", desc: "Container ra cảng Yantian/Shanghai. Tự động kích hoạt bảo hiểm All-Risk. Tracking realtime trên Buyer Center." },
  { n: 5, title: "Nhận hàng & xác nhận", desc: "Bạn kiểm hàng tại kho VN. Bấm 'Xác nhận đã nhận đủ' → tài khoản trung gian giải ngân nốt cho NCC. Đơn đóng." },
];

const FEES = [
  { service: "Dịch vụ trung gian", fee: "0.5%", per: "trên giá trị giao dịch", note: "Áp dụng tự động cho mọi đơn STS" },
  { service: "Bảo hiểm All-Risk", fee: "1.2%", per: "trên giá trị FOB", note: "Có thể tăng/giảm tuỳ tuyến và giá trị hàng" },
  { service: "QC kiểm hàng tại xưởng", fee: "$300", per: "/lần kiểm 1 nhà máy", note: "Tuỳ chọn — buyer có thể bỏ qua nếu NCC đã có chứng chỉ" },
  { service: "QC giai đoạn (in-line)", fee: "$220", per: "/lần", note: "Khuyến nghị cho đơn > $50,000 hoặc OEM" },
  { service: "Phiên dịch hợp đồng VN-CN", fee: "Miễn phí", per: "60 phút đầu", note: "$50/giờ tiếp theo" },
];

const CASES = [
  {
    title: "Showroom HCM mua $42K gạch porcelain",
    desc: "QC phát hiện 8% lô hàng nứt do vận chuyển nội địa CN. Buyer được đổi 100% lô lỗi, NCC phải chịu phí, tài khoản trung gian giữ tiền cho đến khi nhận lô mới đạt QC.",
    saved: "$3,360",
  },
  {
    title: "Hotel 4-sao Đà Nẵng đặt 80 smart toilet",
    desc: "Container bị cháy 1 phần khi quá cảnh Singapore. Bảo hiểm Cybersilkroads bồi thường $14,400 (110% giá FOB) trong 9 ngày — buyer kịp đặt lại lô mới cho khai trương.",
    saved: "$14,400",
  },
  {
    title: "Đại lý nội thất Hà Nội ký hợp đồng OEM $120K",
    desc: "NCC chậm sản xuất 45 ngày so với hợp đồng. Buyer kích hoạt điều khoản phạt — tài khoản trung gian tự động hoàn 30% giá trị về buyer, đơn được huỷ không phí.",
    saved: "$36,000",
  },
];

export default function SecuredTradingPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực người mua", href: "/buyer-center" }, { label: "Dịch vụ giao dịch bảo đảm" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/secured-trading" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-success/15 text-success px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🔒 GIAO DỊCH BẢO ĐẢM</div>
            <h1 className="text-[22px] font-bold text-ink">Dịch vụ giao dịch bảo đảm</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              Mua sỉ xuyên biên giới — rủi ro thường lớn hơn lợi nhuận: hàng giả mô tả, chậm giao, NCC ôm tiền, container hỏng. STS là lá chắn 3 lớp giúp bạn yên tâm chuyển khoản: tiền chỉ đến NCC khi hàng đến tay bạn đúng cam kết.
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🛡 3 lớp bảo vệ buyer</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {LAYERS.map((l) => (
                <div key={l.title} className="border border-line rounded p-4 hover:border-brand">
                  <div className="text-[32px] mb-2">{l.icon}</div>
                  <b className="block text-[14px] text-ink mb-2">{l.title}</b>
                  <p className="text-[12px] text-mute leading-relaxed mb-3">{l.desc}</p>
                  <ul className="space-y-1 border-t border-line pt-3">
                    {l.bullets.map((b) => (
                      <li key={b} className="text-[11.5px] text-ink flex gap-1.5"><span className="text-success">✓</span> {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🔄 Quy trình 5 bước</b>
            <div className="space-y-3">
              {TIMELINE.map((t, i) => (
                <div key={t.n} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 bg-brand text-white rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0">{t.n}</div>
                    {i < TIMELINE.length - 1 && <div className="flex-1 w-px bg-line mt-1 min-h-[20px]" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <b className="block text-[13px] text-ink mb-1">{t.title}</b>
                    <p className="text-[12px] text-mute leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">💵 Bảng phí dịch vụ</b>
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#FAFBFC] text-mute text-[11.5px]">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">Dịch vụ</th>
                  <th className="text-left px-3 py-2.5 font-medium">Phí</th>
                  <th className="text-left px-3 py-2.5 font-medium">Đơn vị</th>
                  <th className="text-left px-3 py-2.5 font-medium">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((f) => (
                  <tr key={f.service} className="border-t border-line">
                    <td className="px-3 py-3 text-ink font-semibold">{f.service}</td>
                    <td className="px-3 py-3 text-accent font-bold">{f.fee}</td>
                    <td className="px-3 py-3 text-mute">{f.per}</td>
                    <td className="px-3 py-3 text-mute text-[11.5px]">{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">📋 Case studies thực tế</b>
              <span className="text-[11px] text-mute">3 vụ tiêu biểu trong 6 tháng qua</span>
            </div>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.title} className="border border-line rounded p-4 bg-[#FAFBFC]">
                  <b className="block text-[13px] text-ink leading-tight mb-2">{c.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                  <div className="border-t border-line pt-2 flex justify-between items-baseline">
                    <span className="text-[10.5px] text-mute">Buyer được bảo vệ</span>
                    <b className="text-[16px] text-success">{c.saved}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/buying-request" className="block bg-accent text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">🚀 Mở đơn STS đầu tiên của bạn</b>
            <p className="text-[12.5px] opacity-90">Gửi RFQ → Chọn NCC → Bật STS — tiền của bạn an toàn từ giây đầu tiên.</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Dịch vụ giao dịch bảo đảm — Buyer Center" };
