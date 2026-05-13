import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const MODES = [
  {
    icon: "📦",
    title: "LCL Sea (gom hàng lẻ)",
    leadtime: "10-14 ngày",
    cost: "$45-70/CBM",
    bestFor: "Đơn nhỏ < 15 CBM, MOQ furniture/textile",
    pros: ["Chi phí thấp nhất", "Không cần đầy container", "Phù hợp NCC mới"],
  },
  {
    icon: "🚢",
    title: "FCL Sea (full container)",
    leadtime: "8-12 ngày",
    cost: "$1,800-3,200/cont 40'",
    bestFor: "Đơn lớn > 28 CBM, chuỗi khách sạn, dự án",
    pros: ["Đơn giá rẻ nhất tính theo m³", "An toàn (không gom với hàng khác)", "Tracking realtime"],
  },
  {
    icon: "✈",
    title: "Air Express",
    leadtime: "2-4 ngày",
    cost: "$5.8-9.2/kg",
    bestFor: "Sample, hàng cao cấp, đơn gấp",
    pros: ["Nhanh nhất", "Tracking chi tiết từng giờ", "Phù hợp electronics, jewelry"],
  },
];

const FORWARDERS = [
  { name: "Maersk", coverage: "Toàn cầu", img: 51 },
  { name: "COSCO Shipping", coverage: "TQ-Đông Nam Á", img: 52 },
  { name: "DHL Express", coverage: "Air toàn cầu", img: 53 },
  { name: "FedEx", coverage: "Air ưu tiên", img: 54 },
  { name: "VietExpress", coverage: "TQ-VN DDP", img: 55 },
  { name: "Cainiao Logistics", coverage: "TQ-ĐNA gom hàng", img: 56 },
  { name: "Yang Ming", coverage: "Sea Đài Loan-VN", img: 57 },
  { name: "Evergreen", coverage: "Sea container", img: 58 },
];

const ROUTES = [
  { from: "Quảng Châu", to: "Hải Phòng", mode: "FCL 40'", time: "8 ngày", price: "$1,950" },
  { from: "Ninh Ba", to: "TP.HCM (Cát Lái)", mode: "FCL 40'", time: "11 ngày", price: "$2,420" },
  { from: "Hạ Môn", to: "Đà Nẵng", mode: "FCL 20'", time: "9 ngày", price: "$1,180" },
  { from: "Thâm Quyến", to: "Hà Nội (Nội Bài)", mode: "Air Express", time: "3 ngày", price: "$6.4/kg" },
  { from: "Thượng Hải", to: "Hải Phòng", mode: "LCL", time: "12 ngày", price: "$58/CBM" },
  { from: "Bằng Tường", to: "Lạng Sơn (Hữu Nghị)", mode: "Đường bộ", time: "1 ngày", price: "$680/xe" },
];

export default function LogisticsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực nhà bán", href: "/seller-center" }, { label: "Logistics quốc tế" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/logistics" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/15 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🚢 INTERNATIONAL LOGISTICS</div>
            <h1 className="text-[22px] font-bold text-ink">Logistics quốc tế cho NCC</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              3 phương thức vận chuyển + 8 forwarders + 6 lộ trình phổ biến TQ-VN. Báo giá real-time, tracking 24/7, DDP option giúp buyer không lo thông quan. Tích hợp trung gian STS cho mọi đơn vận.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {MODES.map((m) => (
              <div key={m.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[32px] mb-2">{m.icon}</div>
                <b className="block text-[14px] text-ink mb-2">{m.title}</b>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-[#FAFBFC] rounded p-2">
                    <span className="text-[10px] text-mute block">Thời gian giao</span>
                    <b className="text-[12px] text-brand">{m.leadtime}</b>
                  </div>
                  <div className="bg-[#FAFBFC] rounded p-2">
                    <span className="text-[10px] text-mute block">Chi phí</span>
                    <b className="text-[12px] text-accent">{m.cost}</b>
                  </div>
                </div>
                <p className="text-[11px] text-mute mb-2"><b className="text-ink">Phù hợp:</b> {m.bestFor}</p>
                <ul className="space-y-1 border-t border-line pt-2">
                  {m.pros.map((p) => (
                    <li key={p} className="text-[11.5px] text-ink flex gap-1.5"><span className="text-success">✓</span> {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🧮 Tính cước nhanh (mock)</b>
            <div className="grid grid-cols-5 gap-3 max-md:grid-cols-1">
              <select className="border border-line rounded-sm px-3 py-2 text-[12.5px]">
                <option>Cảng đi: Quảng Châu</option>
                <option>Ninh Ba</option>
                <option>Thâm Quyến</option>
              </select>
              <select className="border border-line rounded-sm px-3 py-2 text-[12.5px]">
                <option>Cảng đến: Hải Phòng</option>
                <option>TP.HCM</option>
                <option>Đà Nẵng</option>
              </select>
              <input type="text" placeholder="Volume (CBM)" className="border border-line rounded-sm px-3 py-2 text-[12.5px]" />
              <input type="text" placeholder="Weight (kg)" className="border border-line rounded-sm px-3 py-2 text-[12.5px]" />
              <button className="bg-brand text-white rounded-sm px-3 py-2 text-[12.5px] font-semibold">Tính cước →</button>
            </div>
            <p className="text-[11px] text-mute mt-3">Kết quả estimate hiển thị ngay — chính thức sẽ được forwarder báo trong 2 giờ kèm phí phụ.</p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🤝 8 đối tác vận chuyển</b>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {FORWARDERS.map((f) => (
                <div key={f.name} className="border border-line rounded p-3 flex items-center gap-3 hover:border-brand">
                  <img src={`/img/seller-fwd-${f.img}.jpg?v=3`} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <b className="block text-[12.5px] text-ink truncate">{f.name}</b>
                    <span className="text-[10.5px] text-mute">{f.coverage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🗺 Lộ trình phổ biến TQ → VN</b>
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">Cảng đi</th>
                  <th className="text-left px-3 py-2.5 font-medium">Cảng đến</th>
                  <th className="text-left px-3 py-2.5 font-medium">Phương thức</th>
                  <th className="text-left px-3 py-2.5 font-medium">Thời gian</th>
                  <th className="text-left px-3 py-2.5 font-medium">Giá tham khảo</th>
                </tr>
              </thead>
              <tbody>
                {ROUTES.map((r, i) => (
                  <tr key={i} className="border-t border-line hover:bg-[#FAFBFC]">
                    <td className="px-3 py-2.5 text-ink font-semibold">{r.from}</td>
                    <td className="px-3 py-2.5 text-ink">{r.to}</td>
                    <td className="px-3 py-2.5 text-mute">{r.mode}</td>
                    <td className="px-3 py-2.5 text-brand">{r.time}</td>
                    <td className="px-3 py-2.5 text-accent font-semibold">{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-3">📍 Tracking trực tuyến (demo)</b>
            <div className="border border-line rounded p-4 bg-[#FAFBFC]">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <b className="text-[13px] text-ink">Container TEMU-928412 · MAEU-7821</b>
                  <span className="text-[11px] text-mute block">FCL 40' HQ · Quảng Châu → Hải Phòng · ETD 02/05 · ETA 10/05</span>
                </div>
                <span className="bg-success text-white text-[10.5px] font-bold px-2 py-0.5 rounded-sm">In transit</span>
              </div>
              <div className="grid grid-cols-5 gap-1 mt-3">
                {["Pickup factory", "Cảng Yantian", "Trên biển", "Hải Phòng", "Kho buyer"].map((stage, i) => (
                  <div key={stage} className="text-center">
                    <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold ${i <= 2 ? "bg-success text-white" : "bg-mute2/30 text-mute"}`}>{i + 1}</div>
                    <span className={`text-[10.5px] mt-1 block ${i <= 2 ? "text-ink font-semibold" : "text-mute"}`}>{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href="#" className="block bg-brand text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">📦 Đặt vận chuyển cho đơn tiếp theo</b>
            <p className="text-[12.5px] opacity-90">Báo giá tự động trong 5 phút từ 8 forwarders — chọn rẻ nhất hoặc nhanh nhất.</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Logistics quốc tế — Seller Center" };
