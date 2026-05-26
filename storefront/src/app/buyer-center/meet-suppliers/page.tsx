import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { FACTORIES } from "@/data/home";

const EVENTS = [
  {
    badge: "TRỰC TIẾP",
    title: "Canton Fair Mùa Xuân 2026",
    date: "15/04 – 19/04/2026",
    location: "Quảng Châu · Trung Quốc",
    desc: "Hội chợ XNK lớn nhất châu Á — 25,000 NCC, 5 ngành hàng. Cybersilkroads tổ chức tour đoàn buyer Việt với phiên dịch + đặt lịch họp 1-1 trước.",
    color: "bg-accent",
    cta: "Đăng ký đoàn",
  },
  {
    badge: "VIRTUAL",
    title: "Vietnam Expo 2026 – Booth Trung Quốc",
    date: "08/05 – 11/05/2026",
    location: "Trung tâm Triển lãm Giảng Võ · Hà Nội",
    desc: "120 nhà máy gốm sứ, nội thất, vệ sinh có booth tại Hà Nội. Đăng ký vé miễn phí cho buyer Cybersilkroads, đặt lịch họp 30 phút/booth.",
    color: "bg-brand",
    cta: "Lấy vé miễn phí",
  },
  {
    badge: "OEM FOCUS",
    title: "Furniture China 2026 – Shanghai",
    date: "10/09 – 13/09/2026",
    location: "Thượng Hải · NECC Hongqiao",
    desc: "Riêng cho ngành nội thất: KUKA, Landbond, OPPEIN, ZuoYou đều có booth. Cybersilkroads tổ chức factory tour Phật Sơn ngay sau hội chợ (3 ngày).",
    color: "bg-gold text-brand-dark",
    cta: "Xem chi tiết tour",
  },
];

const BOOKING_STEPS = [
  { n: 1, title: "Chọn NCC bạn quan tâm", desc: "Lọc theo ngành / vùng sản xuất / năm lập, tick chọn 1–3 nhà máy." },
  { n: 2, title: "Chọn khung giờ họp", desc: "Đặt 30–60 phút, qua Zoom/Teams hoặc gặp trực tiếp tại Foshan/Shenzhen." },
  { n: 3, title: "Gửi agenda + tài liệu", desc: "Yêu cầu báo giá, sample, capacity report — chuẩn bị trước cho buổi họp hiệu quả." },
  { n: 4, title: "Họp 1-1 với phiên dịch", desc: "Cybersilkroads cung cấp phiên dịch Việt–Trung free cho 60 phút đầu tiên." },
];

const SUPPLIERS = FACTORIES.slice(0, 6);

export default function MeetSuppliersPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực người mua", href: "/buyer-center" }, { label: "Gặp nhà cung cấp" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/meet-suppliers" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/10 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🤝 GẶP NHÀ CUNG CẤP</div>
            <h1 className="text-[22px] font-bold text-ink">Gặp nhà cung cấp</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              Gặp trực tiếp luôn hiệu quả hơn email. Từ hội chợ ngành đến phòng họp video 1-1, Cybersilkroads giúp bạn tiếp cận nhà máy đúng cách: phiên dịch sẵn, agenda chuẩn, follow-up rõ ràng.
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">📅 Sự kiện sắp tới</b>
              <Link href="/factory-tour" className="text-brand text-[12px] hover:underline">Xem tất cả →</Link>
            </div>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {EVENTS.map((e) => (
                <div key={e.title} className="border border-line rounded overflow-hidden hover:border-brand">
                  <div className={`${e.color} text-white px-3 py-1.5 text-[10.5px] font-bold tracking-wider`}>{e.badge}</div>
                  <div className="p-4">
                    <b className="block text-[14px] text-ink leading-tight mb-1.5">{e.title}</b>
                    <div className="text-[11.5px] text-mute mb-1">📅 {e.date}</div>
                    <div className="text-[11.5px] text-mute mb-3">📍 {e.location}</div>
                    <p className="text-[12px] text-ink leading-relaxed mb-3">{e.desc}</p>
                    <button className="w-full px-3 py-2 bg-brand text-white rounded-sm text-[12px] font-semibold hover:opacity-90">{e.cta} →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-1">🎯 Đặt lịch họp 1-1 với nhà máy</b>
            <p className="text-[12px] text-mute mb-4">Quy trình 4 bước, Cybersilkroads lo logistics + phiên dịch.</p>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 mb-5">
              {BOOKING_STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-3">
                  <div className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold text-[13px] mb-2">{s.n}</div>
                  <b className="block text-[12.5px] text-ink leading-tight mb-1">{s.title}</b>
                  <p className="text-[11px] text-mute leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>

            <b className="block text-[13px] text-ink mb-2">Chọn nhà máy bạn muốn gặp:</b>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {SUPPLIERS.map((f) => (
                <label key={f.slug} className="border border-line rounded p-3 hover:border-brand cursor-pointer flex gap-3 items-start">
                  <input type="checkbox" className="mt-1 accent-brand" />
                  <div className="w-10 h-10 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[13px] text-brand flex-shrink-0">{f.initials}</div>
                  <div className="min-w-0 flex-1">
                    <b className="block text-[12.5px] text-ink leading-tight line-clamp-2">{f.name}</b>
                    <span className="text-[10.5px] text-mute">{f.location}</span>
                    <div className="text-[10.5px] text-success mt-0.5">★ {f.rating} · {f.badges.years}</div>
                  </div>
                </label>
              ))}
            </div>
            <button className="mt-4 px-5 py-2.5 bg-accent text-white rounded-sm font-bold text-[12.5px] hover:opacity-90">📅 Yêu cầu lịch họp</button>
          </div>

          <Link href="/factory-tour" className="block bg-brand-dark text-white rounded p-5 hover:opacity-95">
            <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-3">
              <div>
                <div className="inline-block bg-gold text-brand-dark px-2 py-0.5 text-[10px] font-bold rounded-sm tracking-wider mb-2">🆕 360° VR</div>
                <b className="block text-[16px] mb-1">Tour nhà máy 360°</b>
                <p className="text-[12.5px] opacity-90">Chưa thể bay sang Foshan? Tham quan dây chuyền, kho thành phẩm, phòng QC qua camera 360° + livestream với QC manager.</p>
              </div>
              <span className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[13px] whitespace-nowrap">Bắt đầu tour →</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Gặp nhà cung cấp — Buyer Center" };
