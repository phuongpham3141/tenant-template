/**
 * Metadata Toshiba Elevator 东芝电梯 — trang chi tiết. Keyed by seriesOriginal (catKey).
 * Sourcing: toshiba-elevator.com.cn — Toshiba Elevator (China) Co., Ltd.
 */
export type SeriesMeta = {
  story: string; heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[]; careGuide: { title: string; desc: string }[];
  installation: string[]; certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[]; faq: { q: string; a: string }[];
};
const CERTS = ["Tiêu chuẩn an toàn thang máy quốc tế & GB 7588", "ISO 9001 / ISO 14001", "Công nghệ Toshiba Nhật Bản", "Kiểm định an toàn & nghiệm thu"];
const MFG = [
  "Toshiba Elevator — thương hiệu thang máy của tập đoàn Toshiba (Nhật Bản), vận hành tại Trung Quốc",
  "Công nghệ dẫn động & điều khiển Toshiba: êm, tiết kiệm năng lượng, an toàn cao",
  "Dải sản phẩm: thang tốc độ cao, thang khách, thang cuốn, băng tải, thang gia đình, lắp thêm",
  "Hệ thống lắp đặt & dịch vụ kỹ thuật chuyên nghiệp",
];
const PACK = [
  { label: "Hình thức cung cấp", value: "Trọn bộ thang máy + lắp đặt theo dự án" },
  { label: "Dịch vụ", value: "Khảo sát, lắp đặt, bảo trì, hiện đại hoá" },
];
const INSTALL = [
  "Khảo sát hố thang, hành trình, tải trọng để chọn cấu hình",
  "Lắp đặt bởi đội kỹ thuật được đào tạo; nghiệm thu an toàn theo tiêu chuẩn",
  "Chạy thử & kiểm định an toàn trước khi đưa vào sử dụng",
];
const CARE = [
  { title: "Bảo trì định kỳ", desc: "Bảo trì theo lịch: kiểm tra cáp/ray, phanh, cửa, hệ điều khiển, bôi trơn." },
  { title: "An toàn", desc: "Kiểm định an toàn định kỳ; xử lý ngay khi có bất thường." },
];
const FAQ = [
  { q: "Toshiba Elevator có hỗ trợ tại Việt Nam không?", a: "Liên hệ Huayuesc để tư vấn cung cấp, lắp đặt & dịch vụ kỹ thuật phù hợp dự án." },
  { q: "Thời gian giao & lắp đặt?", a: "Tuỳ cấu hình & hạng mục; báo lịch theo khảo sát thực tế." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🇯🇵", title: "Công nghệ Toshiba Nhật Bản", desc: "Thương hiệu thang máy Nhật, êm – an toàn – tiết kiệm năng lượng." };
const SHOW = ["Toà nhà văn phòng & TTTM", "Chung cư cao tầng", "Ga tàu, sân bay, công trình công cộng"];
const PASS = mk({
  story: "Thang máy khách Toshiba (ELCOSMO có buồng máy nhỏ, SPACEL không buồng máy) — vận hành êm, tiết kiệm điện, tối ưu không gian giếng thang, cho toà nhà & chung cư.",
  heritage: "ELCOSMO & SPACEL là các dòng thang khách chủ lực của Toshiba Elevator.",
  technicalSpecs: [{ label: "Loại", value: "Thang máy khách (có/không buồng máy)" }, { label: "Công nghệ", value: "Dẫn động không hộp số, điều khiển VVVF" }, { label: "Ứng dụng", value: "Văn phòng, chung cư, thương mại" }],
  whyChoose: [WHY, { icon: "🔇", title: "Vận hành êm", desc: "Công nghệ dẫn động êm ái, êm & ổn định." }, { icon: "⚡", title: "Tiết kiệm điện", desc: "Điều khiển tối ưu năng lượng, có thu hồi điện năng." }],
  projectShowcase: SHOW,
});
export const TOSHIBA_ELEVATOR_SERIES_META: Record<string, SeriesMeta> = {
  "high-speed": mk({
    story: "Thang máy tốc độ cao Toshiba (New ELBRIGHT) — cho nhà siêu cao tầng, vận tốc lớn, êm và ổn định ngay ở tốc độ cao, công nghệ giảm rung & cân bằng áp suất.",
    heritage: "ELBRIGHT là dòng cao cấp nhất cho toà nhà chọc trời.",
    technicalSpecs: [{ label: "Loại", value: "Thang máy tốc độ cao" }, { label: "Ứng dụng", value: "Nhà siêu cao tầng, landmark" }, { label: "Công nghệ", value: "Giảm rung, ổn định tốc độ cao" }],
    whyChoose: [WHY, { icon: "🚀", title: "Tốc độ cao êm", desc: "Vận tốc lớn vẫn êm & ổn định, thoải mái." }, { icon: "🏙️", title: "Cho nhà chọc trời", desc: "Giải pháp cho toà nhà siêu cao tầng." }],
    projectShowcase: SHOW,
  }),
  passenger: PASS, "passenger-elevator": PASS,
  escalator: mk({
    story: "Thang cuốn Toshiba (KINDMOVER) — cho TTTM, ga tàu, sân bay; vận hành liên tục, an toàn, tiết kiệm năng lượng với chế độ chờ thông minh.",
    heritage: "KINDMOVER là dòng thang cuốn chủ lực của Toshiba.",
    technicalSpecs: [{ label: "Loại", value: "Thang cuốn" }, { label: "Ứng dụng", value: "TTTM, ga tàu, sân bay" }, { label: "Đặc tính", value: "Tiết kiệm năng lượng, chế độ chờ" }],
    whyChoose: [WHY, { icon: "🏬", title: "Cho công trình lớn", desc: "Đáp ứng lưu lượng cao, vận hành liên tục." }, { icon: "🌱", title: "Tiết kiệm điện", desc: "Chế độ chờ thông minh giảm tiêu thụ điện." }],
    projectShowcase: SHOW,
  }),
  "moving-walk": mk({
    story: "Băng tải tự động (đường đi bộ) Toshiba — di chuyển hành khách & hành lý trên mặt phẳng/dốc nhẹ cho sân bay, ga tàu, TTTM lớn.",
    heritage: "Băng tải tự động bổ trợ giao thông ngang cho công trình quy mô lớn.",
    technicalSpecs: [{ label: "Loại", value: "Băng tải tự động (moving walk)" }, { label: "Ứng dụng", value: "Sân bay, ga tàu, TTTM" }, { label: "Đặc tính", value: "Di chuyển ngang, an toàn, liên tục" }],
    whyChoose: [WHY, { icon: "🧳", title: "Cho sân bay/ga", desc: "Di chuyển hành khách & hành lý quãng dài tiện lợi." }, { icon: "🛡️", title: "An toàn", desc: "Hệ thống an toàn & dừng khẩn cấp theo chuẩn." }],
    projectShowcase: SHOW,
  }),
  home: mk({
    story: "Thang máy gia đình Toshiba (SPACEL-H) — cho biệt thự & nhà phố: nhỏ gọn, êm, an toàn với công nghệ Toshiba, nhiều tuỳ chọn nội thất.",
    heritage: "SPACEL-H mang công nghệ Toshiba vào không gian nhà ở.",
    technicalSpecs: [{ label: "Loại", value: "Thang máy gia đình (SPACEL-H)" }, { label: "Ứng dụng", value: "Biệt thự, nhà phố" }, { label: "Ưu điểm", value: "Nhỏ gọn, êm, an toàn" }],
    whyChoose: [WHY, { icon: "🏡", title: "Cho nhà ở", desc: "Thiết kế gọn, êm, phù hợp giếng thang nhỏ." }, { icon: "🛡️", title: "An toàn Toshiba", desc: "Tính năng an toàn theo chuẩn Toshiba." }],
    projectShowcase: ["Biệt thự", "Nhà phố nhiều tầng"],
  }),
  retrofit: mk({
    story: "Giải pháp lắp thêm thang máy Toshiba — bổ sung thang cho công trình hiện hữu (chung cư cũ, nhà phố), tối ưu kết cấu sẵn có, thi công gọn.",
    heritage: "Giải pháp retrofit đáp ứng nhu cầu nâng cấp công trình cũ.",
    technicalSpecs: [{ label: "Loại", value: "Lắp thêm thang (retrofit)" }, { label: "Ứng dụng", value: "Chung cư cũ, công trình hiện hữu" }, { label: "Ưu điểm", value: "Tối ưu kết cấu sẵn có, thi công gọn" }],
    whyChoose: [WHY, { icon: "🏗️", title: "Cho nhà cũ", desc: "Lắp thêm thang cho công trình chưa có sẵn." }, { icon: "🧩", title: "Tối ưu kết cấu", desc: "Giải pháp phù hợp không gian & kết cấu hiện hữu." }],
    projectShowcase: ["Chung cư cũ cải tạo", "Nhà phố nâng cấp"],
  }),
  freight: PASS, observation: PASS,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TOSHIBA_ELEVATOR_SERIES_META[seriesOriginal.trim()] || TOSHIBA_ELEVATOR_SERIES_META.passenger;
}
