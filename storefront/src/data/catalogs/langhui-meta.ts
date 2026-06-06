/**
 * Metadata Langhui 朗辉建材 (Guangdong Langhui Building Material Technology) — meta dùng chung.
 * Nguồn: gdlanghui.com. Nhà sản xuất tấm bê tông khí chưng áp ALC/AAC, Phật Sơn - Cao Minh.
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
const BRAND: SeriesMeta = {
  story:
    "Guangdong Langhui Building Material Technology Co., Ltd. đặt tại khu phát triển công nghiệp trọng điểm Cao Minh (Gaoming), Phật Sơn — cơ sở sản xuất hiện đại rộng khoảng 246 mẫu (acres), tổng đầu tư ~420 triệu nhân dân tệ. Langhui sở hữu dây chuyền và quy trình sản xuất tấm bê tông khí chưng áp tiên tiến hàng đầu Trung Quốc, đã đạt năng lực sản xuất hàng loạt tấm tường ALC/AAC siêu mỏng.",
  heritage:
    "Tấm ALC/AAC siêu mỏng của Langhui được dùng nhiều trong các công trình khung thép nhẹ tại Úc, Nhật Bản, Hàn Quốc và đã xuất khẩu số lượng lớn. Tấm mái AAC của Langhui có khả năng chịu tải cao, chống cháy và cách nhiệt tốt; nằm ở trung tâm Khu vực Vịnh Lớn (Greater Bay Area).",
  technicalSpecs: [
    { label: "Thương hiệu", value: "Langhui (Guangdong Langhui Building Material)" },
    { label: "Sản phẩm", value: "Tấm tường/sàn/mái ALC-AAC, block bê tông khí" },
    { label: "Cơ sở", value: "~246 mẫu (Cao Minh, Phật Sơn), đầu tư ~420 triệu CNY" },
    { label: "Đặc tính", value: "Nhẹ, cường độ cao, chống cháy, cách âm-cách nhiệt" },
  ],
  manufacturing: [
    "Guangdong Langhui Building Material Technology — Cao Minh, Phật Sơn",
    "Dây chuyền sản xuất tấm bê tông khí chưng áp tiên tiến; sản xuất hàng loạt tấm ALC/AAC siêu mỏng",
    "Tận dụng lợi thế Khu vực Vịnh Lớn (Greater Bay Area) về sản xuất, vận chuyển, kỹ thuật",
    "Xuất khẩu tấm ALC sang Úc, Nhật Bản, Hàn Quốc...",
  ],
  careGuide: [
    { title: "Bảo quản", desc: "Để tấm nơi khô ráo, kê lót phẳng, tránh va đập cạnh và ẩm thấm khi lưu kho." },
    { title: "Thi công", desc: "Cắt/khoan bằng dụng cụ phù hợp; dùng vữa/keo chuyên dụng cho tấm ALC." },
    { title: "Hoàn thiện", desc: "Trát mỏng/bả phù hợp bề mặt ALC; xử lý mạch ghép đúng kỹ thuật để chống nứt." },
  ],
  installation: [
    "Xác định loại tấm theo vị trí: tường ngăn, tường ngoài, sàn, mái, tường chống cháy",
    "Lắp ghép theo hệ khung/thép; liên kết bằng phụ kiện & keo chuyên dụng",
    "Xử lý mạch ghép & điểm liên kết để đảm bảo cách âm, chống cháy, chống nứt",
    "Hoàn thiện bề mặt (trát mỏng/bả) theo yêu cầu công trình",
  ],
  certifications: [
    "Tấm bê tông khí chưng áp theo tiêu chuẩn ALC/AAC",
    "Đặc tính chống cháy & chịu tải cho tấm sàn/mái",
    "Sản phẩm xuất khẩu sang Úc, Nhật, Hàn — đạt yêu cầu thị trường quốc tế",
  ],
  packaging: [
    { label: "Hình thức cung cấp", value: "Theo tấm/quy cách, giao theo dự án" },
    { label: "Quy cách", value: "Nhiều độ dày (ví dụ 50/75mm...) theo thoả thuận" },
    { label: "Ứng dụng", value: "Tường, sàn, mái, tường chống cháy" },
  ],
  whyChoose: [
    { icon: "🧱", title: "Tấm ALC/AAC chuyên sâu", desc: "Dây chuyền tiên tiến, sản xuất hàng loạt tấm siêu mỏng." },
    { icon: "🔥", title: "Chống cháy, nhẹ", desc: "Nhẹ, cường độ cao, chống cháy, cách âm-cách nhiệt tốt." },
    { icon: "🌏", title: "Xuất khẩu", desc: "Dùng cho công trình khung thép tại Úc, Nhật, Hàn." },
  ],
  projectShowcase: ["Nhà khung thép nhẹ", "Cao ốc, nhà xưởng cần tường ngăn nhẹ", "Công trình yêu cầu chống cháy/cách âm", "Tường, sàn, mái lắp ghép"],
  faq: [
    { q: "Tấm ALC/AAC của Langhui là gì?", a: "Là tấm bê tông khí chưng áp (Autoclaved Lightweight Concrete) — nhẹ, cường độ cao, chống cháy, cách âm và cách nhiệt, dùng cho tường/sàn/mái lắp ghép." },
    { q: "Có những loại tấm nào?", a: "Tấm tường siêu mỏng, tấm sàn & mái, block AAC, tường chống cháy, wallboard — nhiều độ dày theo yêu cầu." },
    { q: "Langhui có cung cấp tại Việt Nam không?", a: "Liên hệ Huayuesc để được tư vấn cung cấp tấm ALC/AAC Langhui cho dự án tại Việt Nam." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
