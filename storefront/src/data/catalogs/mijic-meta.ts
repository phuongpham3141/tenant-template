/**
 * Metadata MIJIC 民洁 (Guangdong Minjie Sanitary Ware) — meta thương hiệu dùng chung.
 * Nguồn: mijic.cn. Doanh nghiệp sứ vệ sinh từ 1992, Quảng Đông.
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
    "Guangdong Minjie Sanitary Ware là doanh nghiệp thiết bị vệ sinh với sứ mệnh «xây dựng thương hiệu quốc gia, tạo môi trường thế giới sạch». Từ khi thành lập năm 1992, Minjie luôn cung cấp giải pháp thiết bị vệ sinh chất lượng cao, thân thiện với người dùng. Năm 2002 chính thức lập cơ sở sản xuất gốm sứ; năm 2019 nâng cấp thương hiệu toàn diện với khẩu hiệu «Sản phẩm Minjie là sản phẩm toàn cầu»; năm 2022 tập trung vào «thiết bị vệ sinh lấy con người làm trung tâm».",
  heritage:
    "Minjie sở hữu hai nhà máy gốm sứ hiện đại (một trong đó đã đạt sản xuất thông minh) cùng một nhà máy chuyên sản xuất tủ phòng tắm theo yêu cầu — tạo thành chuỗi sản xuất hoàn chỉnh từ thiết bị vệ sinh gốm sứ, tủ phòng tắm đến giải pháp không gian tắm tuỳ biến.",
  technicalSpecs: [
    { label: "Thương hiệu", value: "Mijic (Guangdong Minjie Sanitary Ware)" },
    { label: "Thành lập", value: "1992 (Quảng Đông)" },
    { label: "Sản phẩm", value: "Bồn cầu thông minh/sứ, lavabo, vòi/sen, tủ, bồn tắm, phòng tắm kính" },
    { label: "Nhà máy", value: "2 nhà máy gốm sứ + 1 nhà máy tủ phòng tắm" },
  ],
  manufacturing: [
    "Guangdong Minjie Sanitary Ware — từ 1992",
    "Hai nhà máy gốm sứ hiện đại (một đạt sản xuất thông minh)",
    "Nhà máy tủ phòng tắm tuỳ biến riêng",
    "Chuỗi sản phẩm hoàn chỉnh: sứ vệ sinh + tủ + giải pháp không gian tắm",
  ],
  careGuide: [
    { title: "Vệ sinh sứ", desc: "Lau men sứ bằng khăn mềm + chất tẩy trung tính; tránh bột mài/axit mạnh làm xước men." },
    { title: "Bồn cầu thông minh", desc: "Vệ sinh vòi rửa & lọc định kỳ; dùng nguồn điện ổn định, tránh ẩm vào bo mạch." },
    { title: "Vòi & sen", desc: "Vệ sinh đầu sục & bát sen định kỳ để giữ tia nước đều; lau lớp mạ bằng khăn ẩm." },
  ],
  installation: [
    "Xác định kiểu lắp theo loại (bồn cầu đặt sàn/treo tường, lavabo đặt bàn/chân đứng, tủ treo...)",
    "Lắp bởi thợ chuyên nghiệp; bồn cầu thông minh cần ổ cắm chống giật gần vị trí lắp",
    "Đấu nối cấp/thoát nước, kiểm tra độ kín; căn tâm xả đúng khoảng cách tường",
    "Chạy thử xả, rửa, sấy (với bồn cầu thông minh) trước khi bàn giao",
  ],
  certifications: [
    "Thành viên xây dựng tiêu chuẩn ngành sứ vệ sinh tiết kiệm nước (tham chiếu)",
    "Men sứ & vật liệu đạt yêu cầu vệ sinh, an toàn",
    "Sản xuất thông minh tại một trong các nhà máy gốm sứ",
  ],
  packaging: [
    { label: "Hình thức cung cấp", value: "Theo SKU / trọn bộ phòng tắm" },
    { label: "Dải sản phẩm", value: "Bồn cầu thông minh & sứ, lavabo, vòi/sen, tủ, bồn tắm, phòng tắm kính, phụ kiện" },
    { label: "Tuỳ biến", value: "Tủ phòng tắm & giải pháp không gian theo yêu cầu" },
  ],
  whyChoose: [
    { icon: "🚽", title: "Trọn bộ phòng tắm", desc: "Từ bồn cầu thông minh/sứ đến lavabo, vòi/sen, tủ, bồn tắm, phòng tắm kính." },
    { icon: "🏭", title: "Tự sản xuất", desc: "2 nhà máy gốm sứ + nhà máy tủ riêng, kiểm soát chất lượng chuỗi." },
    { icon: "✨", title: "«Lấy con người làm trung tâm»", desc: "Định hướng thiết bị vệ sinh nhân văn, liên tục đổi mới từ 1992." },
  ],
  projectShowcase: ["Phòng tắm gia đình", "Khách sạn & căn hộ", "Công trình dân dụng & thương mại", "Khu vệ sinh công cộng"],
  faq: [
    { q: "Mijic là thương hiệu nào?", a: "Mijic (Guangdong Minjie) là doanh nghiệp thiết bị vệ sinh TQ từ 1992, sản xuất sứ vệ sinh, tủ phòng tắm và giải pháp không gian tắm." },
    { q: "Mijic có những loại sản phẩm gì?", a: "Bồn cầu thông minh & sứ, lavabo (nghệ thuật/chân đứng/đặt bàn), vòi & sen, chậu inox, tủ phòng tắm, bồn tắm, phòng tắm kính và phụ kiện." },
    { q: "Mijic có cung cấp tại Việt Nam không?", a: "Liên hệ Huayuesc để được tư vấn cung cấp thiết bị vệ sinh Mijic cho dự án/đại lý tại Việt Nam." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
