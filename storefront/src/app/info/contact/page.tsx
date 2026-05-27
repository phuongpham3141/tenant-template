"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

type Office = {
  id: string;
  flag: string;
  region: "VN" | "CN";
  city: string;
  cityEn: string;
  role: string;
  isHQ?: boolean;
  address: string;
  addressCn?: string;
  addressEn: string;
  phone: string;
  hotline?: string;
  email: string;
  manager: { name: string; title: string; initials: string };
  teamSize: number;
  departments: string[];
  hours: string;
  timezone: string;
  transit: string;
  parking: string;
  landmark: string;
  services: string[];
  googleMapsQuery: string;
};

const OFFICES: Office[] = [
  {
    id: "hp",
    flag: "🇻🇳",
    region: "VN",
    city: "Hải Phòng",
    cityEn: "Hai Phong",
    role: "Trụ sở chính — Vận hành, Kho bãi, Thông quan & Phân phối VN",
    isHQ: true,
    address: "Khu công nghiệp Nam Đình Vũ, cảng Hải Phòng, Việt Nam",
    addressCn: "越南海防港南亭武工业区",
    addressEn: "Nam Dinh Vu Industrial Park, Hai Phong Port, Vietnam",
    phone: "+86 181-2225-6999",
    hotline: "+86 181-2225-6999",
    email: "support@huayuesc.vn",
    manager: { name: "Đội vận hành Hải Phòng", title: "Head of Operations & Customs", initials: "HQ" },
    teamSize: 20,
    departments: [
      "Khai báo hải quan VNACCS/VCIS",
      "Kho bãi & Container Inspection",
      "Phối hợp hãng tàu & cảng Hải Phòng",
      "Phân phối VN (HN, HCM, 63 tỉnh)",
      "Customer Success tiếng Việt",
      "Sales B2B vật liệu xây dựng & nội thất",
    ],
    hours: "T2 – T7: 8:00 – 17:30 · CN: ca trực 8:00 – 12:00",
    timezone: "GMT+7 (Asia/Ho_Chi_Minh)",
    transit: "Trong khu công nghiệp Nam Đình Vũ, kết nối trực tiếp cảng Hải Phòng (4 km) và cảng Lạch Huyện (đường nội bộ KCN). Cách trung tâm Hải Phòng ~12 km. Cao tốc Hà Nội – Hải Phòng dẫn thẳng vào KCN.",
    parking: "Bãi xe nội bộ kho — miễn phí cho khách hẹn (báo bảo vệ trước qua hotline)",
    landmark: "Nằm trong KCN Nam Đình Vũ — khu chuyên nhập khẩu hàng container từ Trung Quốc, gần kho ngoại quan và bãi container lớn nhất miền Bắc",
    services: [
      "Khai báo hải quan VNACCS/VCIS cho hàng nhập từ Trung Quốc",
      "Quản lý kho và inspection container tại cảng Hải Phòng",
      "Vận chuyển nội địa DDP đến HN, HCM và 63 tỉnh thành",
      "Tư vấn buyer Việt Nam toàn quốc qua hotline",
      "Hỗ trợ Customer Success tiếng Việt 24/7",
    ],
    googleMapsQuery: "Nam+Dinh+Vu+Industrial+Park+Hai+Phong",
  },
  {
    id: "gz",
    flag: "🇨🇳",
    region: "CN",
    city: "Quảng Châu",
    cityEn: "Guangzhou",
    role: "Văn phòng đại diện — Thu mua, Audit nhà máy & Sourcing",
    address: "Tầng 3, Tòa 1, Cảng Shuyu Chuangxing (数娱创兴港), bến tàu phía Bắc làng Hoàng Phố, đường Tân Cảng Đông (新港东路), quận Hải Châu, Quảng Châu, Trung Quốc",
    addressCn: "广州市海珠区新港东路黄埔村北码头数娱创兴港1号楼3楼",
    addressEn: "3F, Building 1, Shuyu Chuangxing Port, North Wharf of Huangpu Village, East Xingang Road, Haizhu District, Guangzhou, China",
    phone: "+86 181-2225-6999",
    email: "sales@huayuesc.vn",
    manager: { name: "Đội Sourcing Quảng Châu", title: "Sourcing & QC Team Lead", initials: "GZ" },
    teamSize: 15,
    departments: [
      "Sourcing & tinh chọn nguồn (源头精选)",
      "QC Inspector tại nhà máy",
      "Audit thực địa NCC",
      "Phiên dịch Trung – Việt thương mại",
      "Quan hệ nhà máy & hiệp hội ngành tại Quảng Đông",
    ],
    hours: "T2 – T6: 9:00 – 18:00 · T7: 9:00 – 12:00 (giờ Bắc Kinh)",
    timezone: "GMT+8 (Asia/Shanghai)",
    transit: "Quận Hải Châu (海珠区) — trung tâm Quảng Châu cũ, cách ga tàu Quảng Châu Đông 6 km, cách sân bay quốc tế Bạch Vân 35 km. Gần các cụm sản xuất gốm sứ Phật Sơn (50 km), nội thất Lecong (40 km), đồ điện Mỹ Đích (30 km).",
    parking: "Bãi xe Cảng Shuyu Chuangxing — có chỗ đón khách hẹn",
    landmark: "Cảng số hoá – văn hoá Shuyu Chuangxing (数娱创兴港) tại bến tàu phía Bắc làng Hoàng Phố (黄埔村北码头), khu thương mại trung tâm quận Hải Châu, gần sông Châu Giang",
    services: [
      "Sàng lọc & audit nhà máy Trung Quốc tại 3 ngành Huayue (建材 / 装饰材料 / 厨卫小家电)",
      "QC Inspector trước xuất xưởng — chuẩn AQL 2.5",
      "Phiên dịch Việt – Trung cho RFQ và đàm phán",
      "Đại diện Buyer Việt Nam đi thăm nhà máy",
      "Liaison với hiệp hội ngành Quảng Đông, Phật Sơn, Trung Sơn, Triều Châu",
    ],
    googleMapsQuery: "数娱创兴港+Shuyu+Chuangxing+Xingang+East+Road+Haizhu+Guangzhou",
  },
];

const DEPARTMENTS = [
  { icon: "💼", title: "Sales & Tư vấn sourcing", email: "sales@huayuesc.vn", desc: "Tư vấn RFQ, sàng lọc NCC Trung Quốc, đàm phán giá, hợp đồng PI/PO." },
  { icon: "🚚", title: "Logistics, Thông quan & Kho", email: "support@huayuesc.vn", desc: "DDP / FOB / CIF — đặt tàu, khai báo VNACCS, kho bãi Hải Phòng, tracking đơn." },
  { icon: "🔍", title: "QC & Audit nhà máy", email: "sales@huayuesc.vn", desc: "Kiểm hàng AQL 2.5 trước xuất xưởng, audit thực địa NCC tại Quảng Đông, báo cáo có ảnh/video." },
  { icon: "🛡", title: "Bảo đảm Giao dịch & Khiếu nại", email: "support@huayuesc.vn", desc: "Tài khoản tín thác, mediation tranh chấp, hoàn tiền hoặc đổi hàng theo Mục 7 Điều khoản." },
  { icon: "🤝", title: "Đối tác phân phối & Đại lý VN", email: "partnership@huayuesc.vn", desc: "Hợp tác đại lý phân phối, nhà thầu xây dựng, công ty thiết kế trang trí nội thất." },
  { icon: "👥", title: "Tuyển dụng & HR", email: "hr@huayuesc.vn", desc: "Hồ sơ ứng tuyển vị trí tại Hải Phòng và Quảng Châu, đào tạo nội bộ." },
  { icon: "🔒", title: "Bảo mật & DPO", email: "privacy@huayuesc.vn", desc: "Quyền chủ thể dữ liệu, NĐ 13/2023, breach notification < 72h." },
];

const CHANNELS = [
  { icon: "📞", title: "Hotline", desc: "+86 181-2225-6999 — hỗ trợ tiếng Việt + tiếng Trung, 8h–22h", action: "Gọi ngay", href: "tel:+8618122256999" },
  { icon: "✉", title: "Email", desc: "support@huayuesc.vn — phản hồi <6 giờ giờ hành chính", action: "Soạn email", href: "mailto:support@huayuesc.vn" },
  { icon: "💬", title: "Live Chat website", desc: "Phản hồi <5 phút trong giờ làm việc; AI 24/7 ngoài giờ", action: "Mở chat", href: "#chat" },
  { icon: "📱", title: "Zalo OA", desc: "Huayuesc — chat tiếng Việt nhanh nhất", action: "Mở Zalo", href: "https://zalo.me/huayuesc" },
];

function MapCard({ office }: { office: Office }) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${office.googleMapsQuery}`;
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${office.googleMapsQuery}`;
  return (
    <div className="bg-bg border border-line rounded p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-brand text-white rounded flex items-center justify-center flex-shrink-0 text-[20px]">
          📍
        </div>
        <div className="flex-1">
          <b className="block text-[13px] text-ink mb-1">{office.flag} {office.city}</b>
          <p className="text-[12.5px] text-mute leading-relaxed">{office.address}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center py-2 bg-paper border border-line rounded-sm text-[12px] text-ink font-semibold cursor-pointer hover:border-brand hover:text-brand"
        >
          🗺 Mở Google Maps
        </a>
        <a
          href={dirUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center py-2 bg-brand text-white rounded-sm text-[12px] font-bold cursor-pointer hover:bg-brand-light"
        >
          🧭 Lấy chỉ đường
        </a>
      </div>
    </div>
  );
}

export default function LienHePage() {
  const [activeId, setActiveId] = useState("hn");
  const [region, setRegion] = useState<"all" | "VN" | "CN">("all");
  const filtered = region === "all" ? OFFICES : OFFICES.filter((o) => o.region === region);
  const active = OFFICES.find((o) => o.id === activeId) ?? OFFICES[0];

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Thông tin", href: "/help" },
          { label: "Liên hệ" },
        ]}
      />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, #001A3F 100%)" }}
      >
        <div className="max-w-[1100px] mx-auto px-4 py-10 max-md:py-7">
          <span className="inline-block bg-gold text-brand-dark text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wider mb-3">
            📍 LIÊN HỆ · CONTACT
          </span>
          <h1 className="text-[34px] font-extrabold leading-tight mb-3 max-md:text-[24px]">
            Liên hệ Huayuesc — Hai văn phòng, một chuỗi cung ứng
          </h1>
          <p className="text-[14.5px] opacity-90 max-w-[720px] leading-relaxed mb-5 max-md:text-[13px]">
            Trụ sở chính tại <b>Khu công nghiệp Nam Đình Vũ, cảng Hải Phòng</b> phụ trách kho bãi, thông quan VNACCS và phân phối tại Việt Nam. Văn phòng đại diện thu mua tại <b>Tầng 3, Cảng Shuyu Chuangxing, quận Hải Châu, Quảng Châu</b> phụ trách sourcing, audit nhà máy và QC trước xuất xưởng. Hotline duy nhất: <b>+86 181-2225-6999</b> — hỗ trợ tiếng Việt và tiếng Trung.
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {[
              { n: "8", l: "Văn phòng" },
              { n: "114", l: "Nhân sự" },
              { n: "5", l: "Quốc gia" },
              { n: "24/7", l: "Hỗ trợ online" },
            ].map((s) => (
              <div key={s.l} className="bg-white/10 border border-white/20 rounded p-3 text-center backdrop-blur">
                <div className="text-[22px] font-extrabold">{s.n}</div>
                <div className="text-[11px] opacity-85 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Office selector ================================================ */}
      <div className="max-w-[1100px] mx-auto px-4 mt-7">
        <div className="bg-paper border border-line rounded p-5 max-md:p-4">
          <div className="flex justify-between items-end gap-4 mb-4 flex-wrap">
            <div>
              <h2 className="text-[18px] font-bold text-ink">Chọn văn phòng để xem chi tiết</h2>
              <p className="text-[12.5px] text-mute mt-0.5">2 văn phòng — trụ sở Hải Phòng (Việt Nam) và văn phòng đại diện Quảng Châu (Trung Quốc)</p>
            </div>
            {/* Region filter chips */}
            <div className="flex gap-1.5 bg-bg border border-line rounded-sm p-1">
              {(["all", "VN", "CN"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRegion(r);
                    const next = r === "all" ? OFFICES[0] : OFFICES.find((o) => o.region === r);
                    if (next) setActiveId(next.id);
                  }}
                  className={`px-3 py-1.5 text-[12px] font-semibold rounded-sm cursor-pointer transition ${
                    region === r ? "bg-brand text-white" : "text-mute hover:text-brand"
                  }`}
                >
                  {r === "all" ? "Tất cả (2)" : r === "VN" ? "🇻🇳 Việt Nam (1)" : "🇨🇳 Trung Quốc (1)"}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: native dropdown */}
          <div className="md:hidden mb-3">
            <select
              value={activeId}
              onChange={(e) => setActiveId(e.target.value)}
              className="w-full px-3 py-2.5 border border-line rounded-sm bg-bg text-[13.5px] text-ink font-semibold outline-none focus:border-brand cursor-pointer"
            >
              {filtered.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.flag} {o.city} — {o.role}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop: tab pills */}
          <div className="hidden md:grid grid-cols-4 gap-2 mb-1">
            {filtered.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setActiveId(o.id)}
                className={`text-left p-3 border rounded-sm cursor-pointer transition ${
                  activeId === o.id
                    ? "border-brand bg-brand/5 ring-1 ring-brand"
                    : "border-line bg-bg hover:border-brand/40"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[16px]">{o.flag}</span>
                  <b className={`text-[13px] ${activeId === o.id ? "text-brand" : "text-ink"}`}>{o.city}</b>
                  {o.isHQ && (
                    <span className="text-[9px] bg-gold text-brand-dark font-bold px-1.5 py-0.5 rounded-sm tracking-wide ml-auto">HQ</span>
                  )}
                </div>
                <div className="text-[11px] text-mute leading-tight line-clamp-2">{o.role}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === Active office detail ========================================== */}
      <div className="max-w-[1100px] mx-auto px-4 mt-5 mb-9">
        <div className="bg-paper border border-line rounded overflow-hidden">
          {/* Office header */}
          <div
            className="px-6 py-5 text-white max-md:px-4 max-md:py-4"
            style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[34px]">{active.flag}</span>
                  <div>
                    <h2 className="text-[24px] font-extrabold leading-tight max-md:text-[20px]">
                      {active.city}
                      {active.isHQ && (
                        <span className="ml-2 text-[10px] bg-gold text-brand-dark font-bold px-2 py-0.5 rounded-sm tracking-wider align-middle">
                          GLOBAL HQ
                        </span>
                      )}
                    </h2>
                    <p className="text-[13px] opacity-90">{active.role}</p>
                  </div>
                </div>
              </div>
              <div className="text-right max-md:text-left">
                <div className="text-[11px] opacity-80 uppercase tracking-wider">Đội ngũ</div>
                <div className="text-[20px] font-extrabold">{active.teamSize} người</div>
                <div className="text-[11px] opacity-80">{active.timezone}</div>
              </div>
            </div>
          </div>

          {/* Office body */}
          <div className="p-6 max-md:p-4 grid grid-cols-[1fr_360px] gap-6 max-lg:grid-cols-1">
            {/* Left column — info */}
            <div className="space-y-5">
              {/* Address */}
              <div>
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1.5">📍 Địa chỉ</b>
                <p className="text-[14px] text-ink leading-relaxed">{active.address}</p>
                <p className="text-[12px] text-mute italic mt-0.5">{active.addressEn}</p>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div>
                  <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1.5">📞 Điện thoại</b>
                  <a href={`tel:${active.phone.replace(/\s/g, "")}`} className="text-[13.5px] text-brand font-semibold hover:underline">
                    {active.phone}
                  </a>
                  {active.hotline && (
                    <div className="text-[12px] text-mute mt-0.5">Hotline VN: <b className="text-ink">{active.hotline}</b></div>
                  )}
                </div>
                <div>
                  <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1.5">✉ Email</b>
                  <a href={`mailto:${active.email}`} className="text-[13.5px] text-brand font-semibold hover:underline break-all">
                    {active.email}
                  </a>
                </div>
              </div>

              {/* Manager + Hours */}
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div className="bg-bg border border-line rounded p-3 flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center font-extrabold text-[15px] flex-shrink-0">
                    {active.manager.initials}
                  </div>
                  <div>
                    <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold">Người phụ trách</b>
                    <div className="text-[13.5px] text-ink font-semibold">{active.manager.name}</div>
                    <div className="text-[11.5px] text-mute">{active.manager.title}</div>
                  </div>
                </div>
                <div className="bg-bg border border-line rounded p-3">
                  <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1">⏰ Giờ làm việc</b>
                  <div className="text-[12.5px] text-ink leading-relaxed">{active.hours}</div>
                </div>
              </div>

              {/* Departments */}
              <div>
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">🏢 Bộ phận tại văn phòng</b>
                <div className="flex flex-wrap gap-1.5">
                  {active.departments.map((d) => (
                    <span key={d} className="text-[11.5px] bg-brand/8 text-brand border border-brand/20 px-2 py-1 rounded-sm font-semibold">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">⚡ Dịch vụ chính tại {active.city}</b>
                <ul className="space-y-1.5">
                  {active.services.map((s, i) => (
                    <li key={i} className="flex gap-2 text-[13px] text-ink leading-relaxed">
                      <span className="text-success flex-shrink-0">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Transit + Parking + Landmark */}
              <div className="border-t border-line pt-4">
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">🧭 Cách di chuyển</b>
                <div className="space-y-2 text-[12.5px] text-ink leading-relaxed">
                  <div><b className="text-mute">Phương tiện công cộng:</b> {active.transit}</div>
                  <div><b className="text-mute">Đỗ xe:</b> {active.parking}</div>
                  <div><b className="text-mute">Mốc nổi bật:</b> {active.landmark}</div>
                </div>
              </div>
            </div>

            {/* Right column — map + CTA */}
            <div className="space-y-4">
              <MapCard office={active} />

              {/* Schedule visit CTA */}
              <div className="bg-bg border border-line rounded p-4">
                <b className="block text-[13px] text-ink mb-1">📅 Đặt lịch ghé thăm</b>
                <p className="text-[11.5px] text-mute leading-relaxed mb-3">
                  Văn phòng tiếp đón buyer doanh nghiệp đến trao đổi trực tiếp. Đặt lịch trước 24h để được chuẩn bị room riêng và tài liệu phù hợp với ngành.
                </p>
                <Link
                  href="/info/contact#dat-lich"
                  className="block text-center py-2 bg-brand text-white rounded-sm text-[12px] font-bold cursor-pointer hover:bg-brand-light"
                >
                  Đặt lịch online →
                </Link>
              </div>

              {/* Quick stats */}
              <div className="bg-paper border border-line rounded p-4">
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">Thông tin nhanh</b>
                <ul className="space-y-1.5 text-[12px]">
                  <li className="flex justify-between"><span className="text-mute">Khu vực</span><b className="text-ink">{active.region === "VN" ? "Việt Nam" : "Trung Quốc"}</b></li>
                  <li className="flex justify-between"><span className="text-mute">Vai trò</span><b className="text-ink text-right text-[11.5px]">{active.role.split(" · ")[0]}</b></li>
                  <li className="flex justify-between"><span className="text-mute">Đội ngũ</span><b className="text-ink">{active.teamSize} người</b></li>
                  <li className="flex justify-between"><span className="text-mute">Múi giờ</span><b className="text-ink">{active.timezone.split(" ")[0]}</b></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Contact channels =============================================== */}
      <div className="max-w-[1100px] mx-auto px-4 mb-9">
        <div className="text-center mb-5">
          <h2 className="text-[22px] font-bold text-ink max-md:text-[18px]">Kênh liên hệ tức thì</h2>
          <p className="text-[13px] text-mute mt-1">Không tới được văn phòng? Chọn kênh phù hợp dưới đây — đa số phản hồi trong vài phút</p>
        </div>
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
          {CHANNELS.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="block bg-paper border border-line rounded p-4 cursor-pointer hover:border-brand transition group"
            >
              <div className="text-[28px] mb-2">{c.icon}</div>
              <b className="block text-[14px] text-ink mb-1 group-hover:text-brand">{c.title}</b>
              <p className="text-[11.5px] text-mute leading-snug mb-3">{c.desc}</p>
              <span className="text-[12px] text-brand font-semibold">{c.action} →</span>
            </a>
          ))}
        </div>
      </div>

      {/* === Departments =================================================== */}
      <div className="max-w-[1100px] mx-auto px-4 mb-9">
        <div className="text-center mb-5">
          <h2 className="text-[22px] font-bold text-ink max-md:text-[18px]">Email theo bộ phận</h2>
          <p className="text-[13px] text-mute mt-1">8 đầu mối chuyên trách — chọn đúng bộ phận để được phản hồi nhanh nhất</p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {DEPARTMENTS.map((d) => (
            <a
              key={d.email}
              href={`mailto:${d.email}`}
              className="bg-paper border border-line rounded p-4 flex gap-3 items-start cursor-pointer hover:border-brand group"
            >
              <span className="w-12 h-12 bg-brand/8 border border-brand/20 rounded flex items-center justify-center text-[20px] flex-shrink-0">
                {d.icon}
              </span>
              <div className="flex-1 min-w-0">
                <b className="block text-[14px] text-ink group-hover:text-brand">{d.title}</b>
                <div className="text-[12px] text-brand font-semibold break-all">{d.email}</div>
                <p className="text-[11.5px] text-mute leading-snug mt-1">{d.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* === FAQ + CTA ===================================================== */}
      <div className="max-w-[1100px] mx-auto px-4 mb-10">
        <div
          className="rounded p-7 text-white text-center max-md:p-5"
          style={{ background: "linear-gradient(135deg, #002557 0%, #001A3F 100%)" }}
        >
          <h3 className="text-[24px] font-bold mb-2 max-md:text-[20px]">Cần tư vấn doanh nghiệp 1-1?</h3>
          <p className="text-[13.5px] opacity-85 mb-5 max-w-[640px] mx-auto leading-relaxed">
            Đặt lịch tư vấn 30 phút với đội kinh doanh — phân tích nhu cầu sourcing, lựa chọn tier phù hợp, giới thiệu Bảo đảm Giao dịch và Báo cáo thị trường. Miễn phí cho doanh nghiệp ≥3 năm hoạt động.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/buying-request"
              className="inline-block px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              🚀 Gửi RFQ ngay
            </Link>
            <a
              href="mailto:hello@huayuesc.vn"
              className="inline-block px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              📧 Đặt lịch tư vấn
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
