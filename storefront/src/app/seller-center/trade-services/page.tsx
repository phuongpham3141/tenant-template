import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const CATEGORIES = [
  {
    icon: "🏭",
    name: "Audit nhà máy",
    providers: ["TÜV Rheinland", "SGS Vietnam", "Bureau Veritas"],
    from: "$420",
    desc: "Báo cáo audit độc lập theo ISO 9001 / SA8000 — yêu cầu của 80% buyer Việt Nam.",
  },
  {
    icon: "🔬",
    name: "Kiểm định chất lượng hàng",
    providers: ["Intertek", "QIMA", "AsiaInspection"],
    from: "$220",
    desc: "Kiểm AQL 2.5 tại xưởng trước niêm phong container, gồm photo + video báo cáo trong 48h.",
  },
  {
    icon: "🚛",
    name: "Vận chuyển DDP tới VN",
    providers: ["VietExpress", "Cainiao Logistics", "DHL Trade"],
    from: "$1,800/cont",
    desc: "Trọn gói container 20'/40' từ kho NCC tới kho buyer Hà Nội/HCM, đã thông quan.",
  },
  {
    icon: "⚖",
    name: "Hợp đồng pháp lý song ngữ",
    providers: ["Baker McKenzie VN", "YKVN", "VILAF"],
    from: "$680",
    desc: "Soạn / review hợp đồng OEM, NDA, distribution VN-CN. Bảo vệ điều khoản phạt + trung gian.",
  },
  {
    icon: "🌐",
    name: "Dịch thuật chuyên ngành",
    providers: ["TransVN", "WordSworth Asia", "Yufan Translation"],
    from: "$0.05/từ",
    desc: "Dịch hợp đồng, CO/CQ, datasheet, brochure. Phiên dịch online họp với buyer.",
  },
  {
    icon: "📣",
    name: "Marketing OEM / B2B",
    providers: ["Nanjing Adsmile", "Asia Trade Media", "Hua Marketing"],
    from: "$1,200/tháng",
    desc: "Lead-gen Việt Nam: Facebook/Zalo Ads, email outreach 5K buyer, SEO landing tiếng Việt.",
  },
  {
    icon: "📷",
    name: "Photography sản phẩm",
    providers: ["Studio M.O.", "Shenzhen ProShot", "Liang Visual"],
    from: "$15/SKU",
    desc: "Chụp white-bg, lifestyle, 360°. Sửa hậu kỳ — chuẩn upload trang sản phẩm Cybersilkroads.",
  },
  {
    icon: "💳",
    name: "Tài chính trade finance",
    providers: ["HSBC China", "ICBC Trade", "Standard Chartered"],
    from: "Lãi 5.4%/năm",
    desc: "Tài trợ L/C, factoring, discounting. Giải phóng dòng tiền khi buyer trả 60-90 ngày.",
  },
  {
    icon: "🛡",
    name: "Bảo hiểm hàng hoá",
    providers: ["PingAn", "PVI", "Bảo Việt"],
    from: "1.1% giá FOB",
    desc: "Bảo hiểm All-Risk container, cover từ kho NCC tới kho buyer. Bồi thường 110% giá trị.",
  },
  {
    icon: "📦",
    name: "Khai báo hải quan",
    providers: ["Logistic VN", "Sino-VN Customs", "FastClear"],
    from: "$180/tờ",
    desc: "Khai HS code, C/O form E ASEAN-CN. Tối ưu thuế nhập khẩu cho buyer (giảm 5-15%).",
  },
  {
    icon: "🔢",
    name: "Mã vạch GS1 / EAN",
    providers: ["GS1 China", "GS1 Vietnam"],
    from: "$95/SKU",
    desc: "Đăng ký mã vạch quốc tế cho retail Việt Nam. Cần thiết bán Co.opmart, Bách Hoá Xanh.",
  },
  {
    icon: "✅",
    name: "Chứng nhận CE / RoHS / FDA",
    providers: ["TÜV SÜD", "SGS", "ICR Polska"],
    from: "$1,500",
    desc: "Test lab + cấp giấy CE/RoHS cho hàng điện, FDA cho hàng tiếp xúc thực phẩm.",
  },
];

const TOP_PROVIDERS = [
  { name: "TÜV Rheinland", rating: 4.9, jobs: "1,420 jobs", tag: "Audit · Cert" },
  { name: "QIMA", rating: 4.8, jobs: "2,310 jobs", tag: "Inspection" },
  { name: "VietExpress", rating: 4.8, jobs: "980 jobs", tag: "DDP Logistics" },
  { name: "Baker McKenzie", rating: 4.9, jobs: "320 jobs", tag: "Legal" },
  { name: "Studio M.O.", rating: 4.7, jobs: "640 jobs", tag: "Photo" },
  { name: "Sino-VN Customs", rating: 4.8, jobs: "1,180 jobs", tag: "Customs" },
];

export default function TradeServicesPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực nhà bán", href: "/seller-center" }, { label: "Sàn dịch vụ XNK" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/trade-services" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/15 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🛒 FOREIGN TRADE SERVICE MARKETPLACE</div>
            <h1 className="text-[22px] font-bold text-ink">Sàn dịch vụ xuất nhập khẩu</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              12 nhóm dịch vụ supplier cần để xuất khẩu sang Việt Nam — từ audit nhà máy, photography sản phẩm, vận chuyển DDP, đến chứng nhận CE/RoHS. Tất cả providers đã được Cybersilkroads audit và thanh toán qua tài khoản trung gian.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {CATEGORIES.map((c) => (
              <div key={c.name} className="bg-paper border border-line rounded p-4 hover:border-brand transition-colors">
                <div className="flex items-start gap-3 mb-2">
                  <div className="text-[28px]">{c.icon}</div>
                  <div className="flex-1">
                    <b className="block text-[13.5px] text-ink leading-tight">{c.name}</b>
                    <span className="text-[10.5px] text-mute">Từ <b className="text-accent">{c.from}</b></span>
                  </div>
                </div>
                <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                <div className="border-t border-line pt-2 mb-3">
                  <span className="text-[10.5px] text-mute">Provider hàng đầu:</span>
                  <ul className="mt-1 space-y-0.5">
                    {c.providers.map((p) => (
                      <li key={p} className="text-[11.5px] text-ink flex items-center gap-1">
                        <span className="text-success text-[10px]">●</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full bg-brand/10 text-brand text-[12px] font-semibold rounded-sm py-1.5 hover:bg-brand hover:text-white">
                  Xem dịch vụ →
                </button>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">⭐ Top providers tháng 5/2026</b>
              <Link href="#" className="text-brand text-[12px]">Xem tất cả →</Link>
            </div>
            <div className="grid grid-cols-6 gap-3 max-md:grid-cols-2">
              {TOP_PROVIDERS.map((p, i) => (
                <div key={p.name} className="border border-line rounded p-3 text-center hover:border-brand">
                  <img src={`/img/seller-trade-prov-${i}.jpg?v=3`} alt="" className="w-12 h-12 mx-auto mb-2 rounded object-cover" />
                  <b className="block text-[11.5px] text-ink leading-tight mb-1">{p.name}</b>
                  <div className="text-[10.5px] text-gold mb-1">★ {p.rating}</div>
                  <span className="text-[10px] text-mute block">{p.jobs}</span>
                  <span className="text-[9.5px] text-brand block mt-1 font-semibold">{p.tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-dark text-white rounded p-5 flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:text-center">
            <div>
              <b className="block text-[16px] mb-1">💼 Trở thành Service Provider trên Cybersilkroads</b>
              <p className="text-[12px] opacity-85">Bạn cung cấp dịch vụ XNK? Đăng ký để tiếp cận 4,200+ supplier đang xuất sang Việt Nam.</p>
            </div>
            <button className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[12.5px] whitespace-nowrap">
              Đăng ký Provider →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Sàn dịch vụ XNK — Seller Center" };
