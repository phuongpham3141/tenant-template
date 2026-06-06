/**
 * Metadata Sylvania (Feilo Sylvania) — trang chi tiết.
 * Một meta thương hiệu dùng chung cho mọi dòng sản phẩm/giải pháp.
 * Sourcing: sylvania-group.com — tập đoàn chiếu sáng quốc tế từ 1901.
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
    "Sylvania là một trong những thương hiệu chiếu sáng lâu đời và uy tín nhất thế giới, khởi nguồn từ năm 1901. Ngày nay thuộc tập đoàn Feilo Sylvania (sau khi sáp nhập với Tập đoàn Âm thanh Phi Lạc Thượng Hải), Sylvania kết hợp công nghệ chiếu sáng phương Tây với chuỗi cung ứng Trung Quốc, cung cấp danh mục toàn diện: đèn LED nội thất & công nghiệp, chiếu sáng thông minh (SylSmart), chiếu sáng khẩn cấp (LiFeSafe) và giải pháp năng lượng (Power).",
  heritage:
    "Hơn 120 năm lịch sử, hoạt động trên nhiều châu lục (châu Âu, châu Mỹ, châu Á, châu Phi). Danh mục phủ các phân khúc: kiến trúc, công nghiệp, bán lẻ, văn phòng và chiếu sáng đô thị.",
  technicalSpecs: [
    { label: "Thương hiệu", value: "Sylvania / Feilo Sylvania" },
    { label: "Thành lập", value: "1901 (hơn 120 năm)" },
    { label: "Phạm vi", value: "Đèn LED, chiếu sáng thông minh, khẩn cấp, năng lượng" },
    { label: "Vận hành", value: "Đa châu lục — công nghệ phương Tây + chuỗi cung ứng TQ" },
  ],
  manufacturing: [
    "Tập đoàn chiếu sáng quốc tế Feilo Sylvania — mạng lưới R&D + nhà máy đa châu lục",
    "Một số dòng sản xuất tại châu Âu (ví dụ OptiClip TERRA — nhà máy Saint Etienne, Pháp)",
    "Kết hợp công nghệ chiếu sáng phương Tây với chuỗi cung ứng Trung Quốc (Feilo)",
    "Nền tảng số SylSmart thiết kế theo nguyên tắc bảo mật ngay từ đầu (security by design)",
  ],
  careGuide: [
    { title: "Bảo trì", desc: "Đèn LED tuổi thọ cao, ít bảo trì; vệ sinh bề mặt và kiểm tra driver/định kỳ theo khuyến nghị." },
    { title: "Hệ thống thông minh", desc: "SylSmart cấu hình & giám sát qua app/nền tảng số — cập nhật, lập lịch và phân tích từ xa." },
    { title: "Khẩn cấp", desc: "LiFeSafe có chức năng Self-Test/DALI Self-Test giúp kiểm tra pin & đèn dự phòng tự động." },
  ],
  installation: [
    "Lựa chọn cấu hình theo ứng dụng (văn phòng, công nghiệp, bán lẻ, khẩn cấp...)",
    "Lắp đặt bởi kỹ thuật điện đạt chuẩn; đấu nối driver & điều khiển đúng kỹ thuật",
    "Với hệ thông minh: phân vùng, ghép mesh và cấu hình qua ứng dụng",
    "Nghiệm thu chiếu sáng (độ rọi, chống chói UGR) theo tiêu chuẩn công trình",
  ],
  certifications: [
    "Tuân thủ tiêu chuẩn chiếu sáng châu Âu (EN 60598-1...)",
    "Phòng sạch ISO 14644-1 (dòng LiteGuard)",
    "Khẩn cấp theo ISO7001 / BS3864 (dòng LiFeSafe)",
    "Hệ thống quản lý chất lượng theo chuẩn tập đoàn quốc tế",
  ],
  packaging: [
    { label: "Hình thức cung cấp", value: "Theo dự án / theo dòng sản phẩm" },
    { label: "Giải pháp", value: "Đèn + điều khiển thông minh + dịch vụ 360 Services" },
    { label: "Bảo hành", value: "Tuỳ dòng (ví dụ OptiClip TERRA bảo hành 5 năm)" },
  ],
  whyChoose: [
    { icon: "💡", title: "Di sản 120+ năm", desc: "Một trong những thương hiệu chiếu sáng lâu đời & uy tín nhất thế giới (từ 1901)." },
    { icon: "🌍", title: "Quốc tế", desc: "Công nghệ phương Tây + chuỗi cung ứng Trung Quốc (Feilo Sylvania)." },
    { icon: "🔗", title: "Hệ sinh thái", desc: "Từ đèn LED đến chiếu sáng thông minh, khẩn cấp và năng lượng." },
  ],
  projectShowcase: ["Văn phòng & toà nhà thương mại", "Công nghiệp & logistics", "Bán lẻ, khách sạn & giáo dục", "Chiếu sáng đô thị & ngoài trời"],
  faq: [
    { q: "Sylvania và Feilo Sylvania là gì?", a: "Sylvania là thương hiệu chiếu sáng quốc tế từ 1901; hiện thuộc tập đoàn Feilo Sylvania sau khi sáp nhập với Tập đoàn Âm thanh Phi Lạc Thượng Hải." },
    { q: "Có cung cấp tại Việt Nam không?", a: "Liên hệ Huayuesc để được tư vấn phương án cung cấp & dự án chiếu sáng phù hợp." },
    { q: "Sylvania có giải pháp chiếu sáng thông minh không?", a: "Có — nền tảng SylSmart (Standalone/Connected/Connected Pro/Energy) cùng dịch vụ số 360 Services." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
