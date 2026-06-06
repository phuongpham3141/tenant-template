/**
 * Metadata Guangri 广日电梯 — trang chi tiết. Keyed by seriesOriginal (home-cabin/home-elevator/escalator).
 * Sourcing: guangri.com.cn — Guangzhou Guangri Elevator (广州广日电梯).
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
const CERTS = ["Tiêu chuẩn an toàn thang máy quốc gia TQ (GB 7588)", "ISO 9001 quản lý chất lượng", "Kiểm định an toàn & nghiệm thu thang máy", "Chứng nhận lắp đặt & bảo trì"];
const MFG = [
  "Guangri (Quảng Châu) — một trong những nhà sản xuất thang máy lớn của Trung Quốc",
  "Dải sản phẩm: thang máy khách, thang máy gia đình, thang cuốn & băng tải, thang tải hàng, y tế, cứu hoả",
  "Hệ thống lắp đặt, bảo trì & dịch vụ kỹ thuật trên toàn quốc",
  "Nhiều tuỳ chọn thiết kế cabin cao cấp cho thang gia đình",
];
const PACK = [
  { label: "Hình thức cung cấp", value: "Trọn bộ thang máy + lắp đặt theo dự án" },
  { label: "Tuỳ chọn cabin", value: "Nhiều mẫu thiết kế nội thất cabin" },
  { label: "Dịch vụ", value: "Khảo sát, lắp đặt, bảo trì, nâng cấp" },
];
const INSTALL = [
  "Khảo sát hố thang (pit), hành trình, tải trọng trước khi chọn cấu hình",
  "Lắp đặt bởi đội kỹ thuật được đào tạo; nghiệm thu an toàn theo tiêu chuẩn",
  "Đấu nối điện, hệ thống cứu hộ, liên động cửa đúng kỹ thuật",
  "Chạy thử & kiểm định an toàn trước khi đưa vào sử dụng",
];
const CARE = [
  { title: "Bảo trì định kỳ", desc: "Bảo trì theo lịch (thường hằng tháng): kiểm tra cáp/ray, phanh, cửa, hệ điều khiển, bôi trơn." },
  { title: "An toàn", desc: "Kiểm định an toàn định kỳ theo quy định; xử lý ngay khi có bất thường về vận hành." },
  { title: "Vệ sinh cabin", desc: "Vệ sinh bề mặt cabin bằng dung dịch phù hợp vật liệu (inox/kính/gỗ)." },
];
const FAQ = [
  { q: "Guangri có hỗ trợ lắp đặt & bảo trì tại Việt Nam không?", a: "Liên hệ Huayuesc để được tư vấn phương án cung cấp, lắp đặt và dịch vụ kỹ thuật phù hợp dự án." },
  { q: "Có tuỳ chọn thiết kế cabin theo yêu cầu không?", a: "Có nhiều mẫu cabin cao cấp; có thể tư vấn lựa chọn theo phong cách nội thất công trình." },
  { q: "Thời gian giao & lắp đặt?", a: "Tuỳ cấu hình & hạng mục; báo lịch cụ thể theo khảo sát thực tế." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🛗", title: "Thương hiệu thang máy lớn", desc: "Guangri — nhà sản xuất thang máy uy tín Trung Quốc, dải sản phẩm đầy đủ." };
export const GUANGRI_SERIES_META: Record<string, SeriesMeta> = {
  "home-cabin": mk({
    story: "Mẫu cabin thang máy gia đình Guangri — bộ sưu tập thiết kế nội thất cabin cao cấp (Roman, Gothic, Thủy Mộc Thanh Hoa...) cho thang máy biệt thự & nhà phố, nâng tầm thẩm mỹ không gian.",
    heritage: "Thiết kế cabin là điểm nhấn của thang máy gia đình — Guangri cung cấp nhiều phong cách trang trí.",
    technicalSpecs: [{ label: "Loại", value: "Cabin thang máy gia đình" }, { label: "Phong cách", value: "Nhiều mẫu: cổ điển, hiện đại, nghệ thuật" }, { label: "Vật liệu", value: "Inox/kính/gỗ trang trí cao cấp" }],
    whyChoose: [WHY, { icon: "🎨", title: "Đa dạng phong cách", desc: "Nhiều mẫu thiết kế cabin phối hợp mọi nội thất." }, { icon: "💎", title: "Cao cấp", desc: "Vật liệu & hoàn thiện sang trọng cho biệt thự." }],
    projectShowcase: ["Biệt thự & nhà phố cao cấp", "Penthouse", "Công trình nhà ở nhiều tầng"],
  }),
  "home-elevator": mk({
    story: "Thang máy gia đình Guangri — giải pháp thang máy cho biệt thự, nhà phố: vận hành êm, tiết kiệm điện, chiếm ít diện tích, nhiều tuỳ chọn cabin.",
    heritage: "Thang gia đình là dòng phát triển mạnh đáp ứng nhu cầu nhà ở nhiều tầng.",
    technicalSpecs: [{ label: "Loại", value: "Thang máy gia đình" }, { label: "Ứng dụng", value: "Biệt thự, nhà phố" }, { label: "Ưu điểm", value: "Êm, tiết kiệm, ít chiếm diện tích" }],
    whyChoose: [WHY, { icon: "🏡", title: "Cho nhà ở", desc: "Thiết kế gọn, phù hợp giếng thang nhỏ trong nhà." }, { icon: "🔇", title: "Vận hành êm", desc: "Công nghệ dẫn động êm ái, tiết kiệm điện." }],
    projectShowcase: ["Biệt thự", "Nhà phố nhiều tầng", "Nhà ở gia đình"],
  }),
  escalator: mk({
    story: "Thang cuốn & băng tải tự động Guangri — cho trung tâm thương mại, ga tàu điện, sân bay và công trình công cộng lưu lượng lớn.",
    heritage: "Thang cuốn & băng tải là dòng giao thông công cộng chủ lực của Guangri.",
    technicalSpecs: [{ label: "Loại", value: "Thang cuốn / băng tải tự động" }, { label: "Ứng dụng", value: "TTTM, ga tàu, sân bay, công cộng" }, { label: "Đặc tính", value: "Tải lớn, vận hành liên tục an toàn" }],
    whyChoose: [WHY, { icon: "🏬", title: "Cho công trình lớn", desc: "Đáp ứng lưu lượng cao tại TTTM, ga, sân bay." }, { icon: "🛡️", title: "An toàn", desc: "Hệ thống an toàn & dừng khẩn cấp theo tiêu chuẩn." }],
    projectShowcase: ["Trung tâm thương mại", "Ga tàu điện ngầm & sân bay", "Công trình công cộng"],
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return GUANGRI_SERIES_META[seriesOriginal.trim()] || GUANGRI_SERIES_META["home-cabin"];
}
