/**
 * Metadata Bravat 贝朗 — trang chi tiết. Một meta thương hiệu dùng chung cho mọi nhóm.
 * Nguồn: bravathcm.com (NPP chính thức Bravat Việt Nam) + bravat.com.
 * Bravat thuộc Roman Dietsche (Đức) — hơn 145 năm lịch sử (từ 1873, vùng Rừng Đen).
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
    "Bravat là thương hiệu thiết bị vệ sinh cao cấp thuộc Roman Dietsche — tập đoàn sứ vệ sinh Đức với hơn 145 năm lịch sử, khởi nguồn từ xưởng gia đình tại vùng Rừng Đen (Black Forest), bang Baden-Württemberg, Đức năm 1873. Bravat cung cấp giải pháp phòng tắm trọn gói: vòi & sen, bồn cầu, lavabo, bồn tắm, phòng tắm kính, tủ phòng tắm và phụ kiện — định vị phân khúc cao cấp.",
  heritage:
    "Bravat phân phối tại hơn 10 thị trường (Đức, Mỹ, Trung Quốc, Brazil, Úc, Singapore, Việt Nam, Nga, Mexico). Tại Việt Nam có showroom ở Hà Nội và Đà Nẵng, cùng nhà phân phối chính thức.",
  technicalSpecs: [
    { label: "Thương hiệu", value: "Bravat (Roman Dietsche, Đức)" },
    { label: "Lịch sử", value: "Hơn 145 năm (từ 1873)" },
    { label: "Phạm vi", value: "Vòi/sen, bồn cầu, lavabo, bồn tắm, tủ, phụ kiện" },
    { label: "Chất liệu", value: "Thân đồng thau (brass), van gốm, lớp mạ cao cấp" },
  ],
  manufacturing: [
    "Bravat thuộc tập đoàn Đức Roman Dietsche — hơn 145 năm kinh nghiệm sứ vệ sinh",
    "Thân vòi bằng đồng thau (brass); van gốm (ceramic cartridge) Flush/Kerox bền bỉ",
    "Đầu sục khí Neoperl, lớp hoàn thiện mạ Chrome / vàng / Niken chải PVD / đen",
    "Hệ thống nhà máy + R&D phục vụ thị trường toàn cầu",
  ],
  careGuide: [
    { title: "Vệ sinh bề mặt", desc: "Lau bằng khăn mềm ẩm; tránh hoá chất tẩy mạnh/ăn mòn làm hỏng lớp mạ." },
    { title: "Bảo dưỡng van", desc: "Van gốm bền; nếu rò rỉ có thể thay lõi (cartridge) chính hãng." },
    { title: "Đầu sục khí", desc: "Vệ sinh/thay đầu sục Neoperl định kỳ để giữ tia nước đều, tiết kiệm nước." },
  ],
  installation: [
    "Xác định loại lắp đặt (gắn thành bồn, âm tường, đặt bàn...) theo số lỗ khoan",
    "Lắp bởi thợ chuyên nghiệp; đấu nối dây cấp inox đúng ren (G1/2, G3/4)",
    "Kiểm tra áp lực nước khuyến nghị (thường ~0.3MPa) và độ kín",
    "Vệ sinh đường ống trước khi lắp để tránh cặn làm kẹt van",
  ],
  certifications: [
    "Tiêu chuẩn sứ vệ sinh & vòi nước quốc tế (theo từng thị trường)",
    "Thương hiệu Đức Roman Dietsche — kiểm soát chất lượng theo chuẩn châu Âu",
    "Dự án tham chiếu: Marriott, Hyatt Đà Nẵng (Việt Nam), Sber City",
  ],
  packaging: [
    { label: "Hình thức cung cấp", value: "Theo SKU / trọn bộ phòng tắm" },
    { label: "Phụ kiện kèm", value: "Dây cấp inox, đầu sục, ốc vít lắp đặt (tuỳ SKU)" },
    { label: "Thị trường VN", value: "Showroom Hà Nội & Đà Nẵng, NPP chính thức" },
  ],
  whyChoose: [
    { icon: "🇩🇪", title: "Thương hiệu Đức 145+ năm", desc: "Thuộc Roman Dietsche — di sản sứ vệ sinh Đức từ 1873." },
    { icon: "🛁", title: "Trọn bộ phòng tắm", desc: "Từ vòi/sen đến bồn cầu, lavabo, bồn tắm, tủ, phụ kiện." },
    { icon: "💎", title: "Cao cấp", desc: "Thân đồng thau, van gốm, lớp mạ bền đẹp; có dòng đính pha lê Swarovski." },
  ],
  projectShowcase: ["Khách sạn 4-5 sao (Marriott, Hyatt Đà Nẵng)", "Căn hộ & biệt thự cao cấp", "Resort, spa", "Nhà ở gia đình"],
  faq: [
    { q: "Bravat là thương hiệu nước nào?", a: "Bravat thuộc tập đoàn Đức Roman Dietsche, hơn 145 năm lịch sử (từ 1873). Có nhà máy & hệ thống phân phối toàn cầu." },
    { q: "Bravat có bán tại Việt Nam không?", a: "Có. Bravat có showroom tại Hà Nội và Đà Nẵng cùng nhà phân phối chính thức; liên hệ Huayuesc để được tư vấn." },
    { q: "Chất liệu vòi Bravat là gì?", a: "Đa số thân vòi bằng đồng thau (brass), dùng van gốm (ceramic cartridge) bền, lớp hoàn thiện mạ Chrome/vàng/Niken/đen tuỳ dòng." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
