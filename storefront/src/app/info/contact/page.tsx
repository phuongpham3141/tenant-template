import { getTd } from "@/lib/td";
import { tdDeep } from "@/lib/localize";
import ContactClient, {
  type Office,
  type Department,
  type Channel,
} from "./ContactClient";

const OFFICES_RAW: Office[] = [
  {
    id: "hn",
    flag: "🇻🇳",
    region: "VN",
    city: "Hà Nội",
    cityEn: "Hanoi",
    role: "Trụ sở chính — Vận hành, Bán hàng & Phân phối VN",
    isHQ: true,
    address: "Tầng 07, Toà Bảo Ngọc Building, số 02 phố Thanh Lâm, Phường Xuân Phương, Thành phố Hà Nội, Việt Nam",
    addressCn: "越南河内市春芳坊清林街2号宝玉大厦7楼",
    addressEn:
      "Floor 7, Bao Ngoc Building, No. 02 Thanh Lam Street, Xuan Phuong Ward, Hanoi, Vietnam",
    phone: "+86 181-2225-6999",
    hotline: "+86 181-2225-6999",
    email: "support@huayuesc.vn",
    manager: {
      name: "Đội vận hành Hà Nội",
      title: "Head of Operations & Distribution",
      initials: "HN",
    },
    teamSize: 20,
    departments: [
      "Khai báo hải quan VNACCS/VCIS (làm việc với cảng Hải Phòng)",
      "Phối hợp logistics & hãng tàu",
      "Phân phối VN (Hà Nội, HCM, 63 tỉnh)",
      "Sales B2B vật liệu xây dựng & nội thất",
      "Customer Success tiếng Việt",
      "Đối tác đại lý & nhà thầu xây dựng",
    ],
    hours: "T2 – T7: 8:00 – 17:30",
    timezone: "GMT+7 (Asia/Ho_Chi_Minh)",
    transit:
      "Toà Bảo Ngọc Building tại số 02 phố Thanh Lâm, Phường Xuân Phương — phía Tây Hà Nội, cách trung tâm Mỹ Đình ~3 km, cách sân bay Nội Bài ~30 km qua Đại lộ Thăng Long. Bus 27, 29, 32 dừng gần toà.",
    parking: "Bãi xe nội bộ Toà Bảo Ngọc — miễn phí cho khách hẹn (báo lễ tân trước qua hotline)",
    landmark:
      "Toà Bảo Ngọc Building, Phường Xuân Phương, thuộc khu vực Nam Từ Liêm phía Tây Hà Nội — gần các đại lý phân phối VLXD và showroom nội thất Hà Nội & các tỉnh phía Bắc",
    services: [
      "Quản lý chuỗi cung ứng đầu Việt Nam (logistics + thông quan + phân phối)",
      "Khai báo VNACCS/VCIS cho container nhập từ Trung Quốc (cảng Hải Phòng / Cát Lái)",
      "Vận chuyển nội địa DDP đến HN, HCM và 63 tỉnh thành",
      "Sales & tư vấn buyer Việt Nam qua hotline + email",
      "Đối tác đại lý, nhà thầu xây dựng, công ty thiết kế nội thất",
      "Hỗ trợ Customer Success tiếng Việt 24/7",
    ],
    googleMapsQuery: "Bao+Ngoc+Building+02+Thanh+Lam+Xuan+Phuong+Hanoi",
  },
  {
    id: "gz",
    flag: "🇨🇳",
    region: "CN",
    city: "Quảng Châu",
    cityEn: "Guangzhou",
    role: "Văn phòng đại diện — Thu mua, Audit nhà máy & Sourcing",
    address: "Tầng 3, Tòa 1, Cảng Shuyu Chuangxing, bến tàu phía Bắc làng Hoàng Phố, đường Tân Cảng Đông, quận Hải Châu, Quảng Châu, Trung Quốc",
    addressCn: "广州市海珠区新港东路黄埔村北码头数娱创兴港1号楼3楼",
    addressEn: "3F, Building 1, Shuyu Chuangxing Port, North Wharf of Huangpu Village, East Xingang Road, Haizhu District, Guangzhou, China",
    phone: "+86 181-2225-6999",
    email: "sales@huayuesc.vn",
    manager: { name: "Đội Sourcing Quảng Châu", title: "Sourcing & QC Team Lead", initials: "GZ" },
    teamSize: 15,
    departments: [
      "Sourcing & tinh chọn nguồn đầu mối",
      "QC Inspector tại nhà máy",
      "Audit thực địa NCC",
      "Phiên dịch Trung – Việt thương mại",
      "Quan hệ nhà máy & hiệp hội ngành tại Quảng Đông",
    ],
    hours: "T2 – T6: 9:00 – 18:00 · T7: 9:00 – 12:00 (giờ Bắc Kinh)",
    timezone: "GMT+8 (Asia/Shanghai)",
    transit: "Quận Hải Châu — trung tâm Quảng Châu cũ, cách ga tàu Quảng Châu Đông 6 km, cách sân bay quốc tế Bạch Vân 35 km. Gần các cụm sản xuất gốm sứ Phật Sơn (50 km), nội thất Lecong (40 km), đồ điện Mỹ Đích (30 km).",
    parking: "Bãi xe Cảng Shuyu Chuangxing — có chỗ đón khách hẹn",
    landmark: "Cảng số hoá – văn hoá Shuyu Chuangxing tại bến tàu phía Bắc làng Hoàng Phố, khu thương mại trung tâm quận Hải Châu, gần sông Châu Giang",
    services: [
      "Sàng lọc & audit nhà máy Trung Quốc tại 3 ngành Huayue (vật liệu xây dựng / vật liệu trang trí / điện gia dụng nhà bếp & phòng tắm)",
      "QC Inspector trước xuất xưởng — chuẩn AQL 2.5",
      "Phiên dịch Việt – Trung cho RFQ và đàm phán",
      "Đại diện Buyer Việt Nam đi thăm nhà máy",
      "Liaison với hiệp hội ngành Quảng Đông, Phật Sơn, Trung Sơn, Triều Châu",
    ],
    googleMapsQuery: "数娱创兴港+Shuyu+Chuangxing+Xingang+East+Road+Haizhu+Guangzhou",
  },
];

const DEPARTMENTS_RAW: Department[] = [
  { icon: "💼", title: "Sales & Tư vấn sourcing", email: "sales@huayuesc.vn", desc: "Tư vấn RFQ, sàng lọc NCC Trung Quốc, đàm phán giá, hợp đồng PI/PO." },
  { icon: "🚚", title: "Logistics, Thông quan & Kho", email: "support@huayuesc.vn", desc: "DDP / FOB / CIF — đặt tàu, khai báo VNACCS (cảng Hải Phòng & Cát Lái), tracking đơn." },
  { icon: "🔍", title: "QC & Audit nhà máy", email: "sales@huayuesc.vn", desc: "Kiểm hàng AQL 2.5 trước xuất xưởng, audit thực địa NCC tại Quảng Đông, báo cáo có ảnh/video." },
  { icon: "🛡", title: "Bảo đảm Giao dịch & Khiếu nại", email: "support@huayuesc.vn", desc: "Tài khoản tín thác, mediation tranh chấp, hoàn tiền hoặc đổi hàng theo Mục 7 Điều khoản." },
  { icon: "🤝", title: "Đối tác phân phối & Đại lý VN", email: "partnership@huayuesc.vn", desc: "Hợp tác đại lý phân phối, nhà thầu xây dựng, công ty thiết kế trang trí nội thất." },
  { icon: "👥", title: "Tuyển dụng & HR", email: "hr@huayuesc.vn", desc: "Hồ sơ ứng tuyển vị trí tại Hà Nội và Quảng Châu, đào tạo nội bộ." },
  { icon: "🔒", title: "Bảo mật & DPO", email: "privacy@huayuesc.vn", desc: "Quyền chủ thể dữ liệu, NĐ 13/2023, breach notification < 72h." },
];

const CHANNELS_RAW: Channel[] = [
  { icon: "📞", title: "Hotline", desc: "+86 181-2225-6999 — hỗ trợ tiếng Việt + tiếng Trung, 8h–22h", action: "Gọi ngay", href: "tel:+8618122256999" },
  { icon: "✉", title: "Email", desc: "support@huayuesc.vn — phản hồi <6 giờ giờ hành chính", action: "Soạn email", href: "mailto:support@huayuesc.vn" },
  { icon: "💬", title: "Live Chat website", desc: "Phản hồi <5 phút trong giờ làm việc; AI 24/7 ngoài giờ", action: "Mở chat", href: "#chat" },
  { icon: "📱", title: "Zalo OA", desc: "Huayuesc — chat tiếng Việt nhanh nhất", action: "Mở Zalo", href: "https://zalo.me/huayuesc" },
];

export async function generateMetadata() {
  const td = await getTd();
  return {
    title: td("Liên hệ Huayuesc — Hai văn phòng, một chuỗi cung ứng") + " · Huayuesc",
    description: td(
      "Trụ sở chính tại Hà Nội phụ trách kho bãi, thông quan VNACCS và phân phối tại Việt Nam. Văn phòng đại diện thu mua tại Quảng Châu phụ trách sourcing, audit nhà máy và QC trước xuất xưởng."
    ),
  };
}

export default async function LienHePage() {
  const td = await getTd();
  const offices = tdDeep(OFFICES_RAW, td);
  const departments = tdDeep(DEPARTMENTS_RAW, td);
  const channels = tdDeep(CHANNELS_RAW, td);

  const tx = {
    bcHome: td("Trang chủ"),
    bcInfo: td("Thông tin"),
    bcContact: td("Liên hệ"),
    heroTitle: td("Liên hệ Huayuesc — Hai văn phòng, một chuỗi cung ứng"),
    heroP1: td("Trụ sở chính tại"),
    heroAddrHn: td("Tầng 07, Toà Bảo Ngọc Building, số 02 phố Thanh Lâm, Phường Xuân Phương, Hà Nội"),
    heroP2: td("phụ trách kho bãi, thông quan VNACCS và phân phối tại Việt Nam. Văn phòng đại diện thu mua tại"),
    heroAddrGz: td("Tầng 3, Cảng Shuyu Chuangxing, quận Hải Châu, Quảng Châu"),
    heroP3: td("phụ trách sourcing, audit nhà máy và QC trước xuất xưởng. Hotline duy nhất:"),
    heroP4: td("— hỗ trợ tiếng Việt và tiếng Trung."),
    unitPeople: td("người"),
  };

  return (
    <ContactClient
      offices={offices}
      departments={departments}
      channels={channels}
      tx={tx}
    />
  );
}
