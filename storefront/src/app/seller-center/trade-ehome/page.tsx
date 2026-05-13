import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const TOOLS = [
  { icon: "📦", name: "Quản lý sản phẩm", desc: "Upload bulk CSV, gán thuộc tính theo ngành, version pricing OEM/ODM, kiểm tra chuẩn Cybersilkroads listing.", count: "412 SKU đang hoạt động" },
  { icon: "📋", name: "Quản lý đơn hàng", desc: "Pipeline kanban: RFQ → Báo giá → PI → Cọc → Sản xuất → Xuất xưởng → Giao. Tích hợp trung gian.", count: "23 đơn đang xử lý" },
  { icon: "📨", name: "RFQ inbox", desc: "Toàn bộ yêu cầu báo giá từ buyer Việt Nam, lọc theo ngành/giá trị/MOQ. AI gợi ý template trả lời.", count: "23 RFQ chưa trả lời" },
  { icon: "💲", name: "Báo giá nhanh", desc: "Tạo PI / quote chuyên nghiệp song ngữ VN-CN trong 30 giây. Tự sync với pricing matrix.", count: "Trung bình 18 phút/quote" },
  { icon: "🚚", name: "Theo dõi vận chuyển", desc: "Tracking realtime container từ Yantian/Shanghai → Hải Phòng/HCM. Auto cập nhật buyer.", count: "8 container in-transit" },
  { icon: "📊", name: "Báo cáo doanh số", desc: "Doanh thu, margin, top buyer, top SKU, conversion RFQ→Order. Export Excel/PDF cho boss.", count: "$187K tháng 5" },
];

const INTEGRATIONS = [
  { name: "SAP Business One", type: "ERP", logo: 11 },
  { name: "Oracle NetSuite", type: "ERP", logo: 12 },
  { name: "Kingdee K3", type: "ERP nội địa CN", logo: 13 },
  { name: "Manhattan WMS", type: "Kho", logo: 14 },
  { name: "Cainiao Fulfillment", type: "Fulfillment", logo: 15 },
  { name: "Salesforce CRM", type: "CRM", logo: 16 },
  { name: "WeCom (企业微信)", type: "Chat NV", logo: 17 },
  { name: "DingTalk", type: "Chat NV", logo: 18 },
];

const STEPS = [
  { n: 1, title: "Đăng nhập một lần", desc: "Đăng nhập một lần (SSO) với tài khoản Vàng Cybersilkroads" },
  { n: 2, title: "Kết nối ERP/WMS", desc: "Wizard tự động map fields, đồng bộ sản phẩm + tồn kho 2 chiều" },
  { n: 3, title: "Vận hành thống nhất", desc: "Toàn bộ team thấy cùng pipeline đơn hàng — không còn Excel rời rạc" },
];

export default function TradeEhomePage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực nhà bán", href: "/seller-center" }, { label: "Foreign Trade e-Home" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/trade-ehome" />
        <div>
          <div className="bg-gradient-to-br from-brand to-brand-dark text-white rounded p-6 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🏡 ALL-IN-ONE PORTAL</div>
            <h1 className="text-[26px] font-bold leading-tight">Foreign Trade e-Home</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              "Ngôi nhà số" của nhà cung cấp xuất khẩu — 6 công cụ tích hợp một dashboard, kết nối ERP/WMS/CRM nội bộ. Toàn bộ vòng đời đơn hàng từ RFQ đến giao container đi qua một nơi duy nhất.
            </p>
            <div className="flex gap-3 mt-4 max-md:flex-col">
              <button className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[12.5px]">Trải nghiệm miễn phí 14 ngày</button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-semibold text-[12.5px] border border-white/30">Xem demo (3 phút)</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {TOOLS.map((t) => (
              <div key={t.name} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[28px] mb-2">{t.icon}</div>
                <b className="block text-[14px] text-ink mb-1">{t.name}</b>
                <p className="text-[11.5px] text-mute leading-relaxed mb-3">{t.desc}</p>
                <div className="bg-success/10 text-success text-[11px] font-semibold px-2 py-1 rounded-sm inline-block">
                  {t.count}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🔗 Tích hợp với 8 hệ thống doanh nghiệp</b>
            <p className="text-[12px] text-mute mb-4">e-Home không thay thế ERP của bạn — nó là cầu nối giữa hệ nội bộ và buyer Việt Nam.</p>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {INTEGRATIONS.map((i) => (
                <div key={i.name} className="border border-line rounded p-3 flex items-center gap-3 hover:border-brand">
                  <img src={`/img/seller-ehome-int-${i.logo}.jpg?v=3`} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <b className="block text-[12px] text-ink truncate">{i.name}</b>
                    <span className="text-[10.5px] text-mute">{i.type}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="#" className="text-brand text-[12px] font-semibold">+ Yêu cầu tích hợp ERP riêng (tuỳ chỉnh)</Link>
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">⚙ Setup chỉ 3 bước</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-4 text-center">
                  <div className="w-12 h-12 bg-brand text-white rounded-full mx-auto flex items-center justify-center font-bold text-[18px] mb-3">{s.n}</div>
                  <b className="block text-[13px] text-ink mb-1">{s.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-2">
            <div className="bg-paper border border-line rounded p-4 text-center">
              <b className="block text-[24px] text-brand">−68%</b>
              <span className="text-[11px] text-mute">thời gian xử lý đơn</span>
            </div>
            <div className="bg-paper border border-line rounded p-4 text-center">
              <b className="block text-[24px] text-success">+34%</b>
              <span className="text-[11px] text-mute">conversion RFQ → Order</span>
            </div>
            <div className="bg-paper border border-line rounded p-4 text-center">
              <b className="block text-[24px] text-accent">14 ngày</b>
              <span className="text-[11px] text-mute">trial miễn phí, không thẻ</span>
            </div>
          </div>

          <div className="bg-brand-dark text-white rounded p-5 text-center">
            <b className="block text-[18px] mb-2">🏡 Vào e-Home — vận hành như công ty xuất khẩu lớn</b>
            <p className="text-[12.5px] opacity-90 mb-4">Free 14 ngày · Free khi đăng ký Gold · Hủy bất cứ lúc nào</p>
            <button className="bg-gold text-brand-dark px-7 py-3 rounded-sm font-bold text-[14px] hover:opacity-95">
              Bắt đầu trải nghiệm e-Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Foreign Trade e-Home — Seller Center" };
