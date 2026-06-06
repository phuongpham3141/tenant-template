/**
 * Metadata FSL 佛山照明 (Foshan Lighting) — meta thương hiệu dùng chung.
 * Nguồn: chinafsl.com (site quốc tế). Hãng đèn lớn TQ, niêm yết, từ 1958.
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
    "FSL (Foshan Electrical and Lighting Co., Ltd.) thành lập năm 1958 tại Phật Sơn (Foshan), Quảng Đông — một trong những nhà sản xuất chiếu sáng lớn và lâu đời nhất Trung Quốc, niêm yết trên sàn chứng khoán. FSL sở hữu 5 cơ sở sản xuất, hơn 200 dây chuyền và trên 10.000 nhân viên, cung cấp danh mục đầy đủ: chiếu sáng dân dụng, thương mại, ngoài trời, công nghiệp, đèn xe, đèn chuyên dụng và chiếu sáng thông minh.",
  heritage:
    "Thương hiệu nổi tiếng trong nước và quốc tế, phục vụ hơn 200 khách hàng tại khoảng 80 quốc gia. Sản phẩm trải dài từ bóng đèn LED, tuýp/máng, downlight, panel đến đèn pha, đèn đường và giải pháp chiếu sáng thông minh.",
  technicalSpecs: [
    { label: "Thương hiệu", value: "FSL (Foshan Lighting)" },
    { label: "Thành lập", value: "1958 (Phật Sơn, Quảng Đông)" },
    { label: "Quy mô", value: "5 cơ sở SX, 200+ dây chuyền, 10.000+ nhân viên" },
    { label: "Phạm vi", value: "Dân dụng, thương mại, ngoài trời, công nghiệp, đèn xe, smart" },
  ],
  manufacturing: [
    "Foshan Electrical and Lighting Co., Ltd. (FSL) — niêm yết, từ 1958",
    "5 cơ sở sản xuất + hơn 200 dây chuyền tại Trung Quốc",
    "Tự nghiên cứu & sản xuất chip/module LED, driver, quang học",
    "Xuất khẩu hơn 80 quốc gia — kiểm soát chất lượng quy mô lớn",
  ],
  careGuide: [
    { title: "Đèn LED", desc: "Tuổi thọ cao, ít bảo trì; lau bụi bề mặt định kỳ, tránh ẩm với loại trong nhà." },
    { title: "Đèn ngoài trời", desc: "Loại IP65-66 chịu mưa nắng; vẫn nên kiểm tra gioăng & đầu nối định kỳ." },
    { title: "Lắp đặt", desc: "Dùng đúng driver/nguồn theo công suất; đảm bảo tản nhiệt cho đèn pha/đường." },
  ],
  installation: [
    "Chọn loại đèn theo ứng dụng (âm trần, ốp trần, máng, pha, đường...)",
    "Đấu nối bởi thợ điện; đúng điện áp (thường AC220-240V) và driver",
    "Đèn âm trần dùng lò xo kẹp; đèn pha/đường cần giá đỡ & tản nhiệt phù hợp",
    "Kiểm tra IP & chống nước cho lắp đặt ngoài trời",
  ],
  certifications: [
    "Tiêu chuẩn chiếu sáng & an toàn điện TQ/quốc tế (CE...)",
    "Doanh nghiệp niêm yết — hệ thống quản lý chất lượng quy mô lớn",
    "Cấp bảo vệ IP65-66 cho dòng ngoài trời",
  ],
  packaging: [
    { label: "Hình thức cung cấp", value: "Theo SKU / theo dòng sản phẩm" },
    { label: "Dải sản phẩm", value: "Bóng, tuýp, downlight, panel, pha, đường, smart, đèn xe" },
    { label: "Xuất khẩu", value: "Hơn 80 quốc gia" },
  ],
  whyChoose: [
    { icon: "💡", title: "Hãng lớn từ 1958", desc: "Một trong những nhà sản xuất chiếu sáng lớn & lâu đời nhất TQ, niêm yết." },
    { icon: "🏭", title: "Quy mô khổng lồ", desc: "5 cơ sở SX, 200+ dây chuyền, 10.000+ nhân viên." },
    { icon: "🌍", title: "Toàn diện", desc: "Từ bóng LED dân dụng đến đèn đường, đèn xe và chiếu sáng thông minh." },
  ],
  projectShowcase: ["Nhà ở & chung cư", "Văn phòng, bán lẻ, thương mại", "Đường phố & chiếu sáng đô thị", "Nhà xưởng, logistics, nông nghiệp"],
  faq: [
    { q: "FSL là hãng nào?", a: "FSL (Foshan Lighting) là nhà sản xuất chiếu sáng lớn của Trung Quốc, thành lập 1958, niêm yết, xuất khẩu hơn 80 quốc gia." },
    { q: "FSL có bán tại Việt Nam không?", a: "Liên hệ Huayuesc để được tư vấn cung cấp đèn FSL cho dự án/đại lý tại Việt Nam." },
    { q: "FSL có những loại đèn gì?", a: "Đầy đủ: bóng LED, tuýp/máng, downlight, panel, đèn pha, đèn đường, đèn sân vườn, công tắc/ổ cắm, LED dây, đèn thông minh và đèn chuyên dụng." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
