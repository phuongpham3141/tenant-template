/**
 * Metadata LINVOL — trang chi tiết. Keyed by seriesOriginal (villa/retrofit/escalator/passenger).
 * Sourcing: linvol.midea.com.cn — thương hiệu thang máy chính thức của Tập đoàn Midea.
 * Nhà sản xuất: Lingwang Elevator. Hotline dịch vụ: 000-000-000.
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
const CERTS = [
  "Tiêu chuẩn an toàn thang máy quốc gia TQ (GB 7588)",
  "Tiêu chuẩn mới GB/T 21739-2025 về thang máy gia đình",
  "Kiểm định an toàn & nghiệm thu thang máy",
  "Hệ thống quản lý chất lượng theo chuẩn Tập đoàn Midea",
];
const MFG = [
  "LINVOL — thương hiệu thang máy chính thức của Tập đoàn Midea (Midea Building Technologies)",
  "Nhà sản xuất: Lingwang Elevator",
  "Trung tâm R&D thang máy số hoá Midea + nhà máy khu công nghiệp Phật Sơn (Foshan)",
  "Ứng dụng công nghệ số + AI xuyên suốt: thiết kế → sản xuất → tuỳ biến → R&D → vận hành → bảo trì",
];
const PACK = [
  { label: "Hình thức cung cấp", value: "Trọn bộ thang máy + lắp đặt theo dự án" },
  { label: "Tuỳ biến", value: "Cabin & cấu hình theo công trình" },
  { label: "Dịch vụ", value: "«Quản gia + chuyên gia» — bảo hành trọn đời + bảo trì (hotline 000-000-000)" },
];
const INSTALL = [
  "Khảo sát hố thang (pit), hành trình, tải trọng trước khi chọn cấu hình",
  "Lắp đặt bởi đội kỹ thuật được đào tạo; nghiệm thu an toàn theo tiêu chuẩn",
  "Đấu nối điện, hệ thống cứu hộ, liên động cửa đúng kỹ thuật",
  "Chạy thử & kiểm định an toàn trước khi đưa vào sử dụng",
];
const CARE = [
  { title: "Bảo trì trọn đời", desc: "Mô hình «quản gia + chuyên gia» của LINVOL: bảo trì theo lịch, kiểm tra cáp/ray, phanh, cửa, hệ điều khiển." },
  { title: "Giám sát số hoá", desc: "Công nghệ số + AI hỗ trợ theo dõi tình trạng vận hành, cảnh báo sớm bất thường." },
  { title: "An toàn", desc: "Kiểm định an toàn định kỳ theo quy định; xử lý ngay khi có bất thường về vận hành." },
];
const FAQ = [
  { q: "LINVOL có phải thương hiệu của Midea không?", a: "Đúng. LINVOL là thương hiệu thang máy chính thức của Tập đoàn Midea (Midea Building Technologies), nhà sản xuất là Lingwang Elevator." },
  { q: "LINVOL có hỗ trợ lắp đặt & bảo trì tại Việt Nam không?", a: "Liên hệ Huayuesc để được tư vấn phương án cung cấp, lắp đặt và dịch vụ kỹ thuật phù hợp dự án." },
  { q: "Chính sách bảo hành thế nào?", a: "LINVOL áp dụng mô hình «quản gia + chuyên gia» trọn vòng đời — bảo hành trọn đời + bảo trì." },
];
function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🛗", title: "Thương hiệu Midea", desc: "LINVOL — thang máy chính thức của Tập đoàn Midea (Fortune Global 500)." };
export const LINVOL_SERIES_META: Record<string, SeriesMeta> = {
  villa: mk({
    story: "Thang máy biệt thự LINVOL — cabin và linh kiện nâng cấp thiết kế toàn diện, tận dụng tối đa giếng thang, ngoại hình thời thượng, tuỳ biến phong phú. Là «thương hiệu thang máy gia đình được người dùng ưu tiên» dưới sự hậu thuẫn của Tập đoàn Midea.",
    heritage: "Thang gia đình là dòng phát triển mạnh của LINVOL — đáp ứng tiêu chuẩn mới GB/T 21739-2025 và vượt nhiều thông số cấu hình.",
    technicalSpecs: [
      { label: "Loại", value: "Thang máy gia đình / biệt thự" },
      { label: "Ứng dụng", value: "Biệt thự, nhà phố nhiều tầng" },
      { label: "Ưu điểm", value: "Tận dụng giếng thang, ngoại hình thời thượng, tuỳ biến cao" },
    ],
    whyChoose: [WHY, { icon: "🏡", title: "Cho nhà ở", desc: "Thiết kế gọn, tận dụng tối đa giếng thang trong nhà." }, { icon: "🎨", title: "Tuỳ biến", desc: "Cabin & ngoại hình tuỳ chọn phong phú theo nội thất." }],
    projectShowcase: ["Biệt thự", "Nhà phố nhiều tầng", "Nhà ở gia đình cao cấp"],
  }),
  retrofit: mk({
    story: "Thang máy lắp thêm/cải tạo LINVOL — chuyên cho các toà nhà cũ lắp đặt thêm thang máy, kết hợp công nghệ số mới với thiết kế nhân văn, phục vụ cộng đồng dân cư và người cao tuổi.",
    heritage: "Dòng cải tạo đáp ứng nhu cầu lắp thêm thang cho chung cư/nhà cũ — bài toán dân sinh đô thị.",
    technicalSpecs: [
      { label: "Loại", value: "Thang máy lắp thêm cho nhà cũ" },
      { label: "Ứng dụng", value: "Chung cư/toà nhà cũ lắp thêm thang" },
      { label: "Đặc điểm", value: "Công nghệ số mới + thiết kế nhân văn" },
    ],
    whyChoose: [WHY, { icon: "🏢", title: "Cho nhà cũ", desc: "Giải pháp lắp thêm thang cho công trình hiện hữu." }, { icon: "👵", title: "Nhân văn", desc: "Phục vụ cộng đồng dân cư & người cao tuổi." }],
    projectShowcase: ["Chung cư cũ lắp thêm thang", "Khu dân cư đông người cao tuổi", "Cải tạo toà nhà hiện hữu"],
  }),
  escalator: mk({
    story: "Thang cuốn tự động LINVOL — cho trung tâm thương mại, nhà ga, sân bay: kết cấu chính xác, vận hành êm ái, tiết kiệm điện.",
    heritage: "Thang cuốn là dòng giao thông công cộng lưu lượng lớn trong danh mục LINVOL.",
    technicalSpecs: [
      { label: "Loại", value: "Thang cuốn tự động" },
      { label: "Ứng dụng", value: "TTTM, ga tàu, sân bay, công cộng" },
      { label: "Đặc tính", value: "Kết cấu chính xác, vận hành êm, tiết kiệm điện" },
    ],
    whyChoose: [WHY, { icon: "🏬", title: "Cho công trình lớn", desc: "Đáp ứng lưu lượng cao tại TTTM, ga, sân bay." }, { icon: "🛡️", title: "An toàn", desc: "Hệ thống an toàn & dừng khẩn cấp theo tiêu chuẩn." }],
    projectShowcase: ["Trung tâm thương mại", "Ga tàu & sân bay", "Công trình công cộng"],
  }),
  passenger: mk({
    story: "Thang máy chở khách số hoá LINVOL — cho khách sạn, văn phòng, chung cư: hiệu năng vượt trội, an toàn cao, tiết kiệm năng lượng; công nghệ số + AI xuyên suốt vòng đời thang.",
    heritage: "Dòng chở khách là sản phẩm cốt lõi, thể hiện rõ năng lực số hoá của LINVOL/Midea.",
    technicalSpecs: [
      { label: "Loại", value: "Thang máy chở khách" },
      { label: "Ứng dụng", value: "Khách sạn, văn phòng, chung cư" },
      { label: "Công nghệ", value: "Số hoá + AI xuyên suốt vòng đời" },
    ],
    whyChoose: [WHY, { icon: "🏨", title: "Đa công trình", desc: "Phù hợp khách sạn, văn phòng, chung cư." }, { icon: "⚡", title: "Tiết kiệm", desc: "Hiệu năng cao, tiết kiệm năng lượng, an toàn." }],
    projectShowcase: ["Khách sạn", "Toà nhà văn phòng", "Chung cư & nhà ở"],
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return LINVOL_SERIES_META[seriesOriginal.trim()] || LINVOL_SERIES_META["villa"];
}
