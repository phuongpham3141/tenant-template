"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

type Office = {
  id: string;
  flag: string;
  region: "VN" | "ASEAN";
  city: string;
  cityEn: string;
  role: string;
  isHQ?: boolean;
  address: string;
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
    id: "hn",
    flag: "🇻🇳",
    region: "VN",
    city: "Hà Nội",
    cityEn: "Hanoi",
    role: "Trụ sở chính",
    isHQ: true,
    address: "Tầng 21, Toà Diamond Flower, 48 Lê Văn Lương, Cầu Giấy, Hà Nội 100000",
    addressEn: "Floor 21, Diamond Flower Tower, 48 Le Van Luong, Cau Giay, Hanoi 100000, Vietnam",
    phone: "+84 24 3556 7788",
    hotline: "1900 6688",
    email: "hanoi@cybersilkroads.com",
    manager: { name: "Phạm Phương", title: "Founder & CEO", initials: "PP" },
    teamSize: 38,
    departments: ["Founder Office", "Engineering & Product", "Bảo đảm Giao dịch", "Pháp chế quốc tế", "HR & Tuyển dụng", "Marketing & Brand"],
    hours: "T2 – T6: 8:30 – 18:00 · T7: 9:00 – 12:00",
    timezone: "GMT+7 (Asia/Ho_Chi_Minh)",
    transit: "BRT 01 (Yên Nghĩa – Kim Mã), bến Diamond Flower · Buýt 24, 29, 32, 50 dừng trước toà · Cách ga Cát Linh 6 km",
    parking: "Tầng hầm B1 + B2 — miễn phí 2 giờ cho khách hẹn (ghi số xe + tên cuộc hẹn tại quầy lễ tân)",
    landmark: "Đối diện Đại học Thương mại, cách TTTM Indochina Plaza 200 m, gần ngã tư Lê Văn Lương – Hoàng Đạo Thúy",
    services: [
      "Tư vấn buyer toàn quốc & quốc tế",
      "Bảo đảm Giao dịch (tài khoản trung gian) & dispute mediation",
      "Engineering — nền tảng web, mobile, API",
      "Pháp chế — hợp đồng B2B, FTA tư vấn",
      "Tuyển dụng & văn hoá doanh nghiệp",
    ],
    googleMapsQuery: "Diamond+Flower+Tower+48+Le+Van+Luong+Hanoi",
  },
  {
    id: "hcm",
    flag: "🇻🇳",
    region: "VN",
    city: "TP Hồ Chí Minh",
    cityEn: "Ho Chi Minh City",
    role: "Văn phòng phía Nam",
    address: "Tầng 14, Bitexco Financial Tower, 2 Hải Triều, Bến Nghé, Quận 1, TP HCM 700000",
    addressEn: "Floor 14, Bitexco Financial Tower, 2 Hai Trieu, District 1, Ho Chi Minh City",
    phone: "+84 28 3823 6688",
    hotline: "1900 6688",
    email: "hcm@cybersilkroads.com",
    manager: { name: "Nguyễn Quang Vũ", title: "Southern Regional Director", initials: "NV" },
    teamSize: 24,
    departments: ["Sales B2B miền Nam", "Account Management", "Customer Success", "Logistics Cát Lái – Cái Mép"],
    hours: "T2 – T6: 8:30 – 18:00 · T7: 9:00 – 12:00",
    timezone: "GMT+7 (Asia/Ho_Chi_Minh)",
    transit: "Ga metro Ba Son cách 800 m (Tuyến Số 1) · BRT số 1 Bến Thành – An Lạc · Bến buýt Hàm Nghi 400 m",
    parking: "Hầm Bitexco B2 – B4 (30.000 đ/giờ) · Bãi đối diện Ba Son 1 km · Khu vực dành cho khách VIP cần hẹn trước",
    landmark: "Toà Bitexco — biểu tượng Quận 1, view sông Sài Gòn, cách phố đi bộ Nguyễn Huệ 5 phút đi bộ và chợ Bến Thành 800 m",
    services: [
      "Sales B2B cho 38 tỉnh miền Nam + Tây Nam Bộ",
      "Account Management cho 600+ dealer khu vực",
      "Logistics chuyên Cát Lái + Cái Mép – Thị Vải",
      "Customer training & on-site visit",
    ],
    googleMapsQuery: "Bitexco+Financial+Tower+2+Hai+Trieu+Ho+Chi+Minh+City",
  },
  {
    id: "dn",
    flag: "🇻🇳",
    region: "VN",
    city: "Đà Nẵng",
    cityEn: "Da Nang",
    role: "Văn phòng miền Trung",
    address: "Tầng 8, Indochina Riverside Tower, 74 Bạch Đằng, Hải Châu, Đà Nẵng 550000",
    addressEn: "Floor 8, Indochina Riverside Tower, 74 Bach Dang, Hai Chau, Da Nang",
    phone: "+84 236 3897 2233",
    hotline: "1900 6688",
    email: "danang@cybersilkroads.com",
    manager: { name: "Lê Hoàng Nam", title: "Central Region Manager", initials: "LN" },
    teamSize: 12,
    departments: ["Sales miền Trung – Tây Nguyên", "Logistics Tiên Sa – Đà Nẵng port", "Customer Support"],
    hours: "T2 – T6: 8:00 – 17:30 · T7: 9:00 – 12:00",
    timezone: "GMT+7 (Asia/Ho_Chi_Minh)",
    transit: "Bến xe buýt cách 200 m (tuyến 1, 7, 12) · Cách sân bay Đà Nẵng 4,5 km · Cầu Sông Hàn ngay đối diện",
    parking: "Tầng trệt + B1 — miễn phí cho khách hẹn",
    landmark: "Mặt tiền sông Hàn, view Cầu Sông Hàn quay (xoay tối thứ 7 - chủ nhật), gần Bảo tàng Chăm",
    services: [
      "Sales B2B 14 tỉnh miền Trung + 5 tỉnh Tây Nguyên",
      "Logistics hoá cảng Tiên Sa + Đà Nẵng",
      "Đại diện thương mại với KCN Hoà Khánh, Liên Chiểu",
    ],
    googleMapsQuery: "Indochina+Riverside+Tower+74+Bach+Dang+Da+Nang",
  },
  {
    id: "hp",
    flag: "🇻🇳",
    region: "VN",
    city: "Hải Phòng",
    cityEn: "Hai Phong",
    role: "Trung tâm Vận hành & Logistics",
    address: "Tầng 5, Pearl Plaza, 1A Trần Hưng Đạo, Hồng Bàng, Hải Phòng 180000",
    addressEn: "Floor 5, Pearl Plaza, 1A Tran Hung Dao, Hong Bang, Hai Phong",
    phone: "+84 225 3838 4422",
    hotline: "1900 6688",
    email: "haiphong@cybersilkroads.com",
    manager: { name: "Trần Quốc Việt", title: "Head of Logistics & Customs", initials: "TV" },
    teamSize: 16,
    departments: ["Customs Brokerage", "Container Inspection", "Freight Coordination", "Bonded Warehouse Liaison"],
    hours: "T2 – T7: 7:30 – 17:30 · CN: ca trực 8:00 – 12:00",
    timezone: "GMT+7 (Asia/Ho_Chi_Minh)",
    transit: "Cách cảng Lạch Huyện 28 km (45 phút lái xe qua cao tốc HP – HL) · Cảng Hải Phòng cũ 4 km · Ga Hải Phòng 6 km",
    parking: "Hầm Pearl Plaza B1 – B2 — miễn phí 2 giờ",
    landmark: "Trung tâm Quận Hồng Bàng, cách Bảo tàng Hải Phòng 800 m, gần Nhà hát lớn",
    services: [
      "Khai báo hải quan VNACCS/VCIS — 4 broker certified",
      "Inspection container tại cảng Lạch Huyện",
      "Phối hợp hãng tàu COSCO, MSC, OOCL, ONE",
      "Liaison với 12 kho ngoại quan khu vực Hải Phòng",
    ],
    googleMapsQuery: "Pearl+Plaza+1A+Tran+Hung+Dao+Hai+Phong",
  },
  {
    id: "ct",
    flag: "🇻🇳",
    region: "VN",
    city: "Cần Thơ",
    cityEn: "Can Tho",
    role: "Đại diện ĐBSCL",
    address: "Tầng 6, 209 Đường 30/4, Phường Xuân Khánh, Quận Ninh Kiều, Cần Thơ 900000",
    addressEn: "Floor 6, 209 Street 30/4, Xuan Khanh Ward, Ninh Kieu District, Can Tho",
    phone: "+84 292 3766 9988",
    hotline: "1900 6688",
    email: "cantho@cybersilkroads.com",
    manager: { name: "Phạm Văn Linh", title: "Mekong Delta Representative", initials: "PL" },
    teamSize: 6,
    departments: ["Sales miền Tây", "Customer Support", "Liaison Hiệp hội DNNVV ĐBSCL"],
    hours: "T2 – T6: 8:00 – 17:30 · T7: 8:30 – 11:30",
    timezone: "GMT+7 (Asia/Ho_Chi_Minh)",
    transit: "Bến Ninh Kiều cách 600 m · Bến xe Cần Thơ 3 km · Sân bay quốc tế Cần Thơ 12 km",
    parking: "Tầng trệt — miễn phí cho khách hẹn",
    landmark: "Trung tâm Ninh Kiều, gần đại lộ Hoà Bình, cách chợ nổi Cái Răng 6 km (đi tàu)",
    services: [
      "Sales B2B 13 tỉnh ĐBSCL",
      "Customer support nông thuỷ sản, gỗ chế biến, vật liệu",
      "Hợp tác Hiệp hội DNNVV ĐBSCL & VCCI Cần Thơ",
    ],
    googleMapsQuery: "209+Duong+30+thang+4+Xuan+Khanh+Ninh+Kieu+Can+Tho",
  },
  {
    id: "sg",
    flag: "🇸🇬",
    region: "ASEAN",
    city: "Singapore",
    cityEn: "Singapore",
    role: "Trung tâm khu vực ASEAN",
    address: "18 Cross Street, #14-01 Cross Street Exchange, Singapore 048423",
    addressEn: "18 Cross Street, #14-01 Cross Street Exchange, Singapore 048423",
    phone: "+65 6223 4567",
    email: "singapore@cybersilkroads.com",
    manager: { name: "Vincent Lim", title: "Regional Operations Director", initials: "VL" },
    teamSize: 9,
    departments: ["ASEAN Treasury", "Regional Partnership", "Financial Compliance", "Cross-border Tax"],
    hours: "Mon – Fri: 9:00 – 18:00",
    timezone: "GMT+8 (Asia/Singapore)",
    transit: "MRT Telok Ayer (DT18) – 2 phút đi bộ · Raffles Place (EW14/NS26) – 8 phút · Bus 80, 145, 196",
    parking: "Tầng hầm B1 – B3 (S$5/giờ) · ERP zone (phí cao điểm) · Khuyến nghị MRT",
    landmark: "Khu Tài chính CBD, cách Asian Civilisations Museum 600 m, Raffles Place 700 m",
    services: [
      "Treasury & cross-border banking ASEAN",
      "Đối tác Singapore Business Federation (SBF)",
      "Financial compliance MAS regulation",
      "Tax structure tư vấn cho buyer doanh nghiệp lớn",
    ],
    googleMapsQuery: "18+Cross+Street+Exchange+Singapore",
  },
  {
    id: "bkk",
    flag: "🇹🇭",
    region: "ASEAN",
    city: "Bangkok",
    cityEn: "Bangkok",
    role: "Đại diện thương mại Thái Lan · ASEAN Bắc",
    address: "23rd Floor, Sathorn Square Tower, 98 North Sathorn Road, Silom, Bangrak, Bangkok 10500",
    addressEn: "23rd Floor, Sathorn Square Tower, 98 North Sathorn Road, Silom, Bangrak, Bangkok 10500",
    phone: "+66 2 1098 1234",
    email: "bangkok@cybersilkroads.com",
    manager: { name: "Phạm Trang", title: "Thailand & Indochina Representative", initials: "PT" },
    teamSize: 5,
    departments: ["Trade liaison", "Customer success Thailand", "Translation TH–VI–EN"],
    hours: "Mon – Fri: 9:00 – 18:00 (giờ Bangkok)",
    timezone: "GMT+7 (Asia/Bangkok)",
    transit: "BTS Skytrain ga Chong Nonsi — đi bộ 3 phút · MRT Lumphini — 15 phút · Bus 162, 545",
    parking: "Hầm Sathorn Square (60฿/giờ) · Bãi đối diện Empire Tower 200 m",
    landmark: "Khu Sathorn — Silom CBD, cách Lumphini Park 1 km, Patpong Market 1,2 km",
    services: [
      "Liaison với Federation of Thai Industries (FTI)",
      "Hỗ trợ buyer doanh nghiệp Thailand vào Việt Nam",
      "Phiên dịch TH ↔ VI ↔ EN cho RFQ chuyên ngành",
      "Đối tác Thai Chamber of Commerce",
    ],
    googleMapsQuery: "Sathorn+Square+Tower+98+North+Sathorn+Road+Bangkok",
  },
  {
    id: "jkt",
    flag: "🇮🇩",
    region: "ASEAN",
    city: "Jakarta",
    cityEn: "Jakarta",
    role: "Đại diện Indonesia & quần đảo",
    address: "27th Floor, Sahid Sudirman Center, Jl. Jenderal Sudirman Kav 86, Jakarta Pusat 10220",
    addressEn: "27th Floor, Sahid Sudirman Center, Jl. Jenderal Sudirman Kav 86, Jakarta Pusat 10220",
    phone: "+62 21 2789 6677",
    email: "jakarta@cybersilkroads.com",
    manager: { name: "Linh Trần", title: "Indonesia & Maritime SE-Asia Representative", initials: "LT" },
    teamSize: 4,
    departments: ["Trade liaison", "Customer success Indonesia", "Translation ID–VI–EN"],
    hours: "Mon – Fri: 8:30 – 17:30 (giờ Jakarta)",
    timezone: "GMT+7 (Asia/Jakarta)",
    transit: "MRT Istora Mandiri Bakrie — 5 phút đi bộ · TransJakarta Bus Polda 200 m",
    parking: "Hầm Sahid Sudirman B1 – B5 (Rp 7.000/giờ) · Khuyến nghị MRT vào giờ cao điểm",
    landmark: "Khu CBD Sudirman, gần Plaza Senayan 1,5 km, Senayan Park 800 m",
    services: [
      "Liaison KADIN Indonesia (Kamar Dagang dan Industri Indonesia)",
      "Hỗ trợ buyer Indonesia, Philippines, Malaysia vào hệ thống CSR",
      "Phiên dịch ID ↔ VI ↔ EN",
      "Đại diện thương mại quần đảo Indonesia",
    ],
    googleMapsQuery: "Sahid+Sudirman+Center+Jl+Jenderal+Sudirman+Kav+86+Jakarta",
  },
];

const DEPARTMENTS = [
  { icon: "💼", title: "Sales & Tư vấn sourcing", email: "sales@cybersilkroads.com", desc: "Tư vấn RFQ, matching NCC, đàm phán giá, hợp đồng PI." },
  { icon: "🛡", title: "Bảo đảm Giao dịch & Dispute", email: "dispute@cybersilkroads.com", desc: "Mediation tranh chấp, claim bồi thường, trung gian VCB·BIDV·BoC." },
  { icon: "🚚", title: "Logistics & Customs", email: "logistics@cybersilkroads.com", desc: "DDP, FOB, CIF — booking tàu, customs broker, tracking." },
  { icon: "👥", title: "Tuyển dụng & HR", email: "hr@cybersilkroads.com", desc: "Hồ sơ ứng tuyển, internship, đối tác đào tạo." },
  { icon: "📰", title: "Báo chí & PR", email: "press@cybersilkroads.com", desc: "Phỏng vấn, thông cáo, tài liệu doanh nghiệp." },
  { icon: "🔒", title: "Bảo mật & DPO", email: "privacy@cybersilkroads.com", desc: "Quyền chủ thể dữ liệu, NĐ 13/2023, breach notification." },
  { icon: "⚙️", title: "Developer & API", email: "developer@cybersilkroads.com", desc: "API key, ERP integration, technical partnership." },
  { icon: "🤝", title: "Đối tác & Hiệp hội", email: "partnership@cybersilkroads.com", desc: "Hợp tác hiệp hội, MOU, trade fair, ecosystem." },
];

const CHANNELS = [
  { icon: "💬", title: "Live Chat", desc: "Phản hồi <5 phút trong giờ làm việc, AI 24/7", action: "Mở chat", href: "#chat" },
  { icon: "📞", title: "Hotline", desc: "1900 6688 — miễn phí trong nước, 8h–22h hàng ngày", action: "Gọi ngay", href: "tel:19006688" },
  { icon: "✉", title: "Email", desc: "support@cybersilkroads.com — phản hồi <6 giờ", action: "Soạn email", href: "mailto:support@cybersilkroads.com" },
  { icon: "📱", title: "Zalo OA", desc: "Cybersilkroads — chat tiếng Việt 24/7", action: "Mở Zalo", href: "https://zalo.me/cybersilkroads" },
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
  const [region, setRegion] = useState<"all" | "VN" | "ASEAN">("all");
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
            Mạng lưới văn phòng Cybersilkroads
          </h1>
          <p className="text-[14.5px] opacity-90 max-w-[720px] leading-relaxed mb-5 max-md:text-[13px]">
            5 văn phòng tại Việt Nam (Hà Nội, TP HCM, Đà Nẵng, Hải Phòng, Cần Thơ) và 3 văn phòng đại diện ASEAN (Singapore, Bangkok, Jakarta). Mỗi văn phòng đều có quản lý tài khoản nói tiếng địa phương, sẵn sàng tiếp đón doanh nghiệp đến trao đổi trực tiếp.
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
              <p className="text-[12.5px] text-mute mt-0.5">8 văn phòng — chọn theo khu vực hoặc dropdown bên dưới</p>
            </div>
            {/* Region filter chips */}
            <div className="flex gap-1.5 bg-bg border border-line rounded-sm p-1">
              {(["all", "VN", "ASEAN"] as const).map((r) => (
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
                  {r === "all" ? "Tất cả (8)" : r === "VN" ? "🇻🇳 Việt Nam (5)" : "🌏 ASEAN (3)"}
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
            style={{ background: "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)" }}
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
                  <li className="flex justify-between"><span className="text-mute">Khu vực</span><b className="text-ink">{active.region === "VN" ? "Việt Nam" : "ASEAN"}</b></li>
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
              className="inline-block px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-warm"
            >
              🚀 Gửi RFQ ngay
            </Link>
            <a
              href="mailto:hello@cybersilkroads.com"
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
