/**
 * Metadata Dongyuan 东原厨具 (Guangdong Dongyuan Kitchenware) — meta thương hiệu dùng chung.
 * Nguồn: dongyuan.en.made-in-china.com. Nhà sản xuất chậu rửa inox 304, từ 1993, Thuận Đức - Phật Sơn.
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
    "Guangdong Dongyuan Kitchenware Industrial Co., Ltd. thành lập năm 1993, nhà xưởng rộng khoảng 25.000 m² tại quận Thuận Đức (Shunde), thành phố Phật Sơn (Foshan) — vùng công nghiệp trọng điểm của đồng bằng Châu Giang. Dongyuan chuyên sản xuất chậu rửa bếp bằng inox, tủ bếp và thiết bị vệ sinh; toàn bộ sản phẩm dùng tấm inox cao cấp nhập khẩu, chống ăn mòn.",
  heritage:
    "Hơn 30 năm kinh nghiệm, đội ngũ 400+ nhân công lành nghề cùng tổ thiết kế khuôn riêng. Sản phẩm chính: chậu rửa inox SUS 304 (âm bàn/dương bàn, đơn/đôi, thủ công), đạt các chứng nhận xuất khẩu (UPC, CSA).",
  technicalSpecs: [
    { label: "Thương hiệu", value: "Dongyuan (Guangdong Dongyuan Kitchenware)" },
    { label: "Thành lập", value: "1993 (Thuận Đức, Phật Sơn)" },
    { label: "Sản phẩm", value: "Chậu rửa inox SUS 304, tủ bếp" },
    { label: "Nhà xưởng", value: "~25.000 m², 400+ nhân công" },
  ],
  manufacturing: [
    "Guangdong Dongyuan Kitchenware — từ 1993, Thuận Đức, Phật Sơn",
    "Chuyên chậu rửa inox: âm bàn (undermount), dương bàn (topmount), thủ công (handmade)",
    "Dùng tấm inox SUS 304 nhập khẩu, chống ăn mòn; có tổ thiết kế khuôn riêng",
    "Đạt chứng nhận xuất khẩu (UPC, CSA) — phục vụ thị trường quốc tế",
  ],
  careGuide: [
    { title: "Vệ sinh", desc: "Lau bằng khăn mềm + nước rửa trung tính; tránh miếng cọ kim loại gây xước bề mặt inox." },
    { title: "Chống ố", desc: "Lau khô sau khi dùng để tránh đọng nước; định kỳ dùng dung dịch chuyên dụng cho inox." },
    { title: "Đường thoát", desc: "Vệ sinh giỏ lọc & xi-phông định kỳ để thoát nước tốt, tránh tắc nghẽn." },
  ],
  installation: [
    "Chọn kiểu lắp theo mặt bàn đá: âm bàn (undermount), dương bàn (topmount) hoặc cân bằng (flushmount)",
    "Khoét lỗ mặt bàn đúng kích thước chậu; dùng keo & ke đỡ chuyên dụng",
    "Lắp vòi, ống thải, xi-phông; kiểm tra độ kín nước",
    "Với chậu âm bàn: đảm bảo mặt bàn đá đủ dày & gia cố đỡ trọng lượng",
  ],
  certifications: [
    "Inox SUS 304 — tiêu chuẩn vật liệu tiếp xúc thực phẩm",
    "Chứng nhận xuất khẩu UPC / CSA",
    "Kiểm soát chất lượng cho thị trường quốc tế",
  ],
  packaging: [
    { label: "Hình thức cung cấp", value: "Theo SKU chậu rửa" },
    { label: "Loại", value: "Âm bàn / dương bàn / thủ công, đơn & đôi" },
    { label: "Vật liệu", value: "Inox SUS 304 nhập khẩu" },
  ],
  whyChoose: [
    { icon: "🥘", title: "Chuyên chậu rửa", desc: "Hơn 30 năm chuyên sản xuất chậu rửa inox cho bếp." },
    { icon: "🛡️", title: "Inox 304", desc: "Tấm inox SUS 304 nhập khẩu, chống ăn mòn, bền đẹp." },
    { icon: "🌍", title: "Đạt chuẩn xuất khẩu", desc: "Chứng nhận UPC/CSA, phục vụ nhiều thị trường." },
  ],
  projectShowcase: ["Bếp gia đình", "Căn hộ & nhà phố", "Bếp thương mại, nhà hàng", "Dự án nội thất bếp"],
  faq: [
    { q: "Chậu Dongyuan làm bằng vật liệu gì?", a: "Chủ yếu inox SUS 304 nhập khẩu, chống ăn mòn, an toàn tiếp xúc thực phẩm." },
    { q: "Có loại âm bàn và dương bàn không?", a: "Có đủ: âm bàn (undermount), dương bàn (topmount), chậu thủ công (handmade), đơn và đôi." },
    { q: "Dongyuan có cung cấp tại Việt Nam không?", a: "Liên hệ Huayuesc để được tư vấn cung cấp chậu rửa Dongyuan cho dự án/đại lý tại Việt Nam." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
