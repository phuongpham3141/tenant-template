/**
 * Metadata CareLighting (Zhejiang Xuguang / Kaier Lighting) — meta thương hiệu dùng chung.
 * Nguồn: care-china.en.made-in-china.com. Nhà sản xuất đèn LED, niêm yết New Third Board (839762).
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
    "CareLighting thuộc Zhejiang Xuguang Electronic Technology Co., Ltd. — doanh nghiệp công nghệ cao tích hợp R&D, sản xuất, kinh doanh và dịch vụ đèn LED cùng thiết bị gia dụng. Công ty niêm yết trên sàn New Third Board năm 2016 (mã 839762); thương hiệu «Kaier Lighting» là thương hiệu đèn LED có tiếng tại Trung Quốc, sản phẩm phủ 5 lĩnh vực: chiếu sáng lưu thông/tổng hợp, gia dụng, thương mại, thiết bị tích hợp và thiết bị điện.",
  heritage:
    "Hơn 90.000 m² nhà xưởng sản xuất hiện đại, năng lực ~100 triệu bộ đèn LED/năm. Đã được vinh danh «Top 10 thương hiệu nguồn sáng» Trung Quốc 4 năm liên tiếp; mạng lưới 26 trung tâm vận hành cấp tỉnh, 500+ điểm phân phối cấp 1, phủ hơn 100.000 điểm bán lẻ.",
  technicalSpecs: [
    { label: "Thương hiệu", value: "CareLighting (Kaier / Zhejiang Xuguang)" },
    { label: "Niêm yết", value: "New Third Board 2016 (mã 839762)" },
    { label: "Sản phẩm", value: "Bóng LED, đèn GX53/âm trần, đèn khẩn cấp" },
    { label: "Năng lực", value: "~100 triệu bộ đèn/năm, 90.000 m² nhà xưởng" },
  ],
  manufacturing: [
    "Zhejiang Xuguang Electronic Technology (Kaier Lighting)",
    "Nhà xưởng hiện đại >90.000 m², công suất ~100 triệu bộ đèn LED/năm",
    "122 đơn đăng ký sáng chế (82 được cấp); ISO 9001:2015 & ISO 14001:2015",
    "«Top 10 thương hiệu nguồn sáng» Trung Quốc 4 năm liên tiếp",
  ],
  careGuide: [
    { title: "Đèn LED", desc: "Tuổi thọ cao, ít bảo trì; lau bụi bề mặt định kỳ, tránh ẩm với loại trong nhà." },
    { title: "Đui đèn", desc: "Lắp đúng loại đui (E27/E14/B22/GX53); không chạm tay ướt khi thay bóng." },
    { title: "Loại sạc/khẩn cấp", desc: "Sạc đầy trước lần dùng đầu; định kỳ xả-sạc để giữ tuổi thọ pin." },
  ],
  installation: [
    "Chọn bóng/đèn theo đui và công suất phù hợp đui đèn hiện có",
    "Đèn GX53 âm trần/ốp tủ: lắp theo lỗ khoét tiêu chuẩn GX53",
    "Đấu nối đúng điện áp (thường AC220-240V); dùng driver/nguồn phù hợp",
    "Đảm bảo tản nhiệt cho đèn công suất cao",
  ],
  certifications: [
    "ISO 9001:2015 (chất lượng) & ISO 14001:2015 (môi trường)",
    "Chứng nhận CE cho dòng xuất khẩu",
    "Doanh nghiệp công nghệ cao, niêm yết New Third Board (839762)",
  ],
  packaging: [
    { label: "Hình thức cung cấp", value: "Theo SKU / đóng gói tuỳ chỉnh (OEM)" },
    { label: "Dải sản phẩm", value: "Bóng G45, đèn GX53, downlight, đèn khẩn cấp" },
    { label: "Đui đèn", value: "E27 / E14 / B22 / GX53 (tuỳ SKU)" },
  ],
  whyChoose: [
    { icon: "💡", title: "Thương hiệu LED lớn", desc: "Kaier Lighting — «Top 10 nguồn sáng» TQ 4 năm liên tiếp, niêm yết." },
    { icon: "🏭", title: "Quy mô lớn", desc: "90.000 m² nhà xưởng, ~100 triệu bộ đèn/năm." },
    { icon: "✅", title: "Chuẩn quốc tế", desc: "ISO 9001/14001, nhiều sáng chế, đạt CE xuất khẩu." },
  ],
  projectShowcase: ["Nhà ở & chung cư", "Văn phòng, phòng khách", "Tủ bếp, tủ trưng bày (đèn GX53)", "Bán lẻ & thương mại"],
  faq: [
    { q: "CareLighting (Kaier) là hãng nào?", a: "Là thương hiệu đèn LED của Zhejiang Xuguang Electronic, doanh nghiệp công nghệ cao niêm yết New Third Board (839762), «Top 10 nguồn sáng» TQ." },
    { q: "Có những loại đèn gì?", a: "Bóng LED G45 (E27/E14/B22), đèn GX53 âm trần/ốp tủ, downlight, đèn khẩn cấp sạc USB." },
    { q: "Có cung cấp tại Việt Nam không?", a: "Liên hệ Huayuesc để được tư vấn cung cấp đèn CareLighting cho dự án/đại lý tại Việt Nam." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
