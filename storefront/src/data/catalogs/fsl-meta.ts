/**
 * Metadata FSL Foshan Lighting — brand-wide metadata (rich text).
 * Source: chinafsl.com (international site). A large, publicly listed Chinese lighting manufacturer founded in 1958.
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
    "Năm 1958, FSL Foshan Lighting thắp sáng chiếc đèn đầu tiên tại Phật Sơn, Quảng Đông, từ một xưởng điện địa phương vươn lên trở thành thương hiệu chiếu sáng quen thuộc trong mỗi gia đình như ngày nay. Suốt hơn sáu thập kỷ, FSL đã đồng hành cùng Trung Quốc đi qua thời kỳ đèn sợi đốt và đèn huỳnh quang cho đến kỷ nguyên LED — bóng đèn chống nước A70, đèn tuýp T5/T8 và máng đèn liền khối, đèn rọi GU10, dòng đèn downlight âm trần Crown và Xifan, đèn panel siêu mỏng và đèn ốp trần thông minh RGBTW, phủ kín gần như mọi ngóc ngách của ngôi nhà và văn phòng. Bước ra ngoài trời, dòng đèn pha FSF, dòng đèn đường FSS, đèn sân vườn cắm cọc và đèn lối đi mang ánh sáng trải khắp các con phố, công viên và cảnh quan đô thị về đêm. Ngày nay FSL là một doanh nghiệp lớn đã niêm yết, từng luồng sáng bền bỉ và rực rỡ đã viết nên một chương dài trong lịch sử ngành chiếu sáng Trung Quốc.",
  heritage:
    "Là một trong những nhà sản xuất chiếu sáng lớn nhất và lâu đời nhất Trung Quốc, FSL vận hành 5 cơ sở sản xuất, hơn 200 dây chuyền sản xuất và trên 10.000 nhân viên, sản phẩm có mặt tại khoảng 80 quốc gia và phục vụ hơn 200 khách hàng ở nước ngoài. Từ một bóng đèn đơn lẻ đến giải pháp chiếu sáng thông minh trọn gói, sự tự tin của một nhà sản xuất kỳ cựu được khắc ghi trong từng dòng thông số kỹ thuật.",
  technicalSpecs: [
    { label: "Thương hiệu", value: "FSL Foshan Lighting" },
    { label: "Công suất tiêu biểu", value: "Bóng đèn/đèn downlight 3-18W, máng đèn/đèn tuýp 9-40W, đèn pha 30-50W, đèn đường thiết kế riêng theo từng dự án" },
    { label: "Hiệu suất phát quang", value: "Các sản phẩm LED chủ lực đạt khoảng 90-130 lm/W; đèn tuýp T5/T8 và đèn panel cho ánh sáng đều, hiệu quả" },
    { label: "Nhiệt độ màu", value: "Trắng ấm 2700-3000K, trắng tự nhiên 4000K, trắng lạnh 6000-6500K; dòng RGBTW có khả năng điều chỉnh tông trắng và đổi màu" },
    { label: "Chỉ số hoàn màu (CRI)", value: "Thông thường Ra trên 80; đèn rọi thương mại/trưng bày đạt Ra 90 trở lên cho màu sắc chân thực như thật" },
    { label: "Cấp bảo vệ (IP)", value: "Đèn trong nhà IP20; đèn pha/đèn đường ngoài trời IP65-66, chịu được nắng mưa" },
    { label: "Tuổi thọ định mức", value: "Sản phẩm LED khoảng 25.000-50.000 giờ — bền lâu và ít phải bảo trì" },
  ],
  manufacturing: [
    "Sản xuất bởi Foshan Electrical and Lighting Co., Ltd. (FSL) — một doanh nghiệp đã niêm yết, thành lập năm 1958, với di sản thương hiệu sâu dày",
    "5 cơ sở sản xuất và hơn 200 dây chuyền sản xuất trên khắp Trung Quốc; quy mô sản xuất lớn bảo đảm thời gian giao hàng ổn định và chất lượng đồng đều",
    "Tự nghiên cứu và sản xuất chip/module LED, bộ nguồn và thấu kính quang học — kiểm soát trực tiếp các công đoạn cốt lõi",
    "Thân đèn nhôm đúc áp lực với mặt kính cường lực/khuếch tán, kết hợp giải pháp tản nhiệt được thiết kế tối ưu nhằm cân bằng giữa hiệu suất và tuổi thọ",
    "Xuất khẩu tới hơn 80 quốc gia, với hệ thống kiểm soát chất lượng quy mô lớn được tổ chức theo các tiêu chuẩn an toàn và tiết kiệm năng lượng quốc tế",
  ],
  careGuide: [
    { title: "Vệ sinh định kỳ", desc: "Sau khi ngắt nguồn điện, dùng khăn mềm khô lau sạch bụi trên tấm khuếch tán và bề mặt phát sáng. Giữ đèn trong nhà tránh xa nước và ẩm ướt để duy trì luồng sáng trong trẻo, không bị cản trở." },
    { title: "Bảo dưỡng ngoài trời", desc: "Đối với các sản phẩm IP65-66 như đèn pha và đèn đường, hãy định kỳ kiểm tra gioăng đệm, đầu nối và các lá tản nhiệt, đồng thời dọn sạch bụi bẩn và cặn bám tích tụ." },
    { title: "Bộ nguồn và điều chỉnh độ sáng", desc: "Chọn bộ nguồn phù hợp với công suất định mức. Với các mẫu thông minh/RGBTW, hãy cất giữ điều khiển từ xa cẩn thận và thay pin kịp thời khi pin yếu." },
    { title: "Xử lý sự cố", desc: "Nếu đèn nhấp nháy hoặc không sáng, trước tiên hãy kiểm tra nguồn điện và dây dẫn. Sau khi đã xác nhận lỗi nằm ở bộ đèn, hãy liên hệ bộ phận hậu mãi chuỗi cung ứng Huayuesc. Tuyệt đối không thao tác trên bộ đèn khi đang có điện." },
  ],
  installation: [
    "Lựa chọn theo ứng dụng: đèn downlight âm trần/đèn panel, đèn ốp trần, máng đèn liền khối, đèn pha, đèn đường và đèn sân vườn, mỗi loại phù hợp với một kịch bản khác nhau",
    "Để thợ điện có chứng chỉ thực hiện đấu nối, xác nhận điện áp (thường là AC220-240V), trang bị bộ nguồn phù hợp với công suất và bảo đảm tiếp đất đúng cách",
    "Lắp đèn downlight âm trần và đèn panel theo đúng kích thước lỗ khoét; lò xo kẹp sẽ tự động bám chặt vào tấm trần. Các mẫu gắn nổi được bắt vít trực tiếp lên trần",
    "Cố định đèn pha/đèn đường ngoài trời bằng giá đỡ đi kèm và điều chỉnh góc chiếu, xác nhận khả năng chống nước IP và đủ không gian để tản nhiệt",
    "Với đèn sân vườn cắm cọc và đèn lối đi, hãy cắm phần đế nhọn xuống đất và sắp xếp gọn dây cáp; với các mẫu RGB, ghép nối điều khiển từ xa là đèn sẵn sàng hoạt động",
  ],
  certifications: [
    "Chứng nhận CCC bắt buộc của Trung Quốc — đáp ứng các yêu cầu an toàn về điện và chiếu sáng trong nước",
    "Nhãn năng lượng Trung Quốc (ghi nhãn cấp hiệu suất năng lượng) — hiệu quả năng lượng có thể kiểm chứng và so sánh được",
    "Đánh giá an toàn quang sinh học (phân loại nguy cơ ánh sáng xanh) — quan tâm đến sức khỏe đôi mắt",
    "CE và các tiêu chuẩn an toàn cùng tương thích điện từ quốc tế khác, hỗ trợ xuất khẩu tới khoảng 80 quốc gia",
    "Chính sách bảo hành toàn bộ đèn (theo từng dòng sản phẩm), được bảo chứng bởi hệ thống quản lý chất lượng của một công ty niêm yết",
  ],
  packaging: [
    { label: "Đóng gói lẻ", value: "Hộp màu hoặc hộp trung tính có sẵn lớp đệm và vách ngăn; bóng đèn và đèn tuýp được bảo vệ chống va đập và đè nén" },
    { label: "Thùng carton lớn", value: "Thùng carton được xếp pallet và dán nhãn ghi model, công suất, nhiệt độ màu và số lượng để dễ dàng lưu kho và soạn hàng" },
    { label: "Hình thức cung ứng", value: "Cung cấp theo SKU hoặc theo dòng sản phẩm, cho cả kênh dự án lẫn kênh phân phối" },
    { label: "Dải sản phẩm", value: "Bóng đèn, đèn tuýp, máng đèn, đèn downlight, đèn panel, đèn ốp trần, đèn pha, đèn đường, đèn sân vườn, đèn ray/đèn thả, dây đèn LED, công tắc và ổ cắm, cùng các loại đèn sưởi chuyên dụng" },
    { label: "Xuất khẩu", value: "Phủ khoảng 80 quốc gia, hỗ trợ cả cung ứng số lượng lớn lẫn cung ứng theo dự án" },
  ],
  whyChoose: [
    { icon: "💡", title: "Thương hiệu lâu đời từ năm 1958", desc: "Một trong những nhà sản xuất chiếu sáng lớn nhất và lâu đời nhất Trung Quốc — đã niêm yết và là thương hiệu được tin cậy." },
    { icon: "🏭", title: "Quy mô sản xuất khổng lồ", desc: "5 cơ sở sản xuất, hơn 200 dây chuyền sản xuất và trên 10.000 nhân viên, mang lại cả năng lực sản xuất ổn định lẫn chất lượng." },
    { icon: "🌍", title: "Phủ trọn mọi kịch bản", desc: "Từ bóng đèn LED gia dụng đến đèn panel, đèn pha, đèn đường và chiếu sáng thông minh — tất cả tại một nơi." },
    { icon: "✅", title: "Chứng nhận đầy đủ", desc: "CCC, nhãn năng lượng, an toàn quang sinh học và CE cùng nhiều chứng nhận khác — an toàn, tiết kiệm năng lượng và dịu mắt." },
    { icon: "🔧", title: "Lắp đặt không phiền hà", desc: "Lò xo kẹp, máng đèn liền khối và giá đỡ điều chỉnh được giúp lắp đặt nhanh chóng, bảo trì tối thiểu và tuổi thọ dài lâu." },
  ],
  projectShowcase: [
    "Chiếu sáng trọn nhà cho nhà ở, căn hộ và biệt thự",
    "Văn phòng, cửa hàng bán lẻ và không gian thương mại",
    "Chiếu sáng đường phố, công viên và cảnh quan đô thị về đêm",
    "Nhà máy, kho bãi, gara và cơ sở nông nghiệp/chăn nuôi",
  ],
  faq: [
    { q: "FSL là nhà sản xuất nào?", a: "FSL là viết tắt của Foshan Lighting, một nhà sản xuất chiếu sáng lớn của Trung Quốc thành lập năm 1958. Hãng đã niêm yết và xuất khẩu tới khoảng 80 quốc gia." },
    { q: "FSL cung cấp những loại đèn nào?", a: "Một dải sản phẩm trọn vẹn: bóng đèn LED, đèn tuýp T5/T8 và máng đèn liền khối, đèn rọi GU10, đèn downlight, đèn panel, đèn ốp trần, đèn pha, đèn đường, đèn sân vườn/lối đi, đèn ray và đèn thả, dây đèn LED, công tắc và ổ cắm, cùng các loại đèn chuyên dụng như đèn sưởi hồng ngoại." },
    { q: "Đèn ngoài trời có chịu được mưa không?", a: "Dòng đèn pha FSF, dòng đèn đường FSS và đèn sân vườn cắm cọc phần lớn đạt chuẩn IP65-66 và chịu được nắng mưa; dù vậy, chúng tôi khuyến nghị định kỳ kiểm tra gioăng đệm và đầu nối sau khi lắp đặt." },
    { q: "Làm thế nào để chọn nhiệt độ màu và độ hoàn màu?", a: "Chọn trắng ấm 2700-3000K cho phòng ngủ và phòng khách, trắng tự nhiên 4000K cho văn phòng, bếp và phòng tắm, và trắng lạnh 6000K cho nhà máy và gara; với khu vực trưng bày và trang điểm, hãy chọn các mẫu CRI cao đạt Ra 90 trở lên." },
    { q: "FSL có bán tại Việt Nam không?", a: "Vui lòng liên hệ chuỗi cung ứng Huayuesc để được tư vấn lựa chọn đèn FSL, báo giá và cung ứng phù hợp với các dự án và kênh phân phối tại Việt Nam." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
