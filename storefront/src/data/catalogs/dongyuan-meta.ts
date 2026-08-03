/**
 * Brand metadata — Dongyuan (Guangdong Dongyuan Kitchenware) — shared brand-level metadata.
 * Source: dongyuan.en.made-in-china.com. A SUS 304 stainless-steel kitchen sink manufacturer, founded in 1993 in Shunde, Foshan.
 * Sources: Dongyuan official product pages (made-in-china.com) + industry-standard process parameters for stainless-steel kitchenware.
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
    "Linh hồn của gian bếp nằm ngay nơi mép chậu rửa — nơi vo rau, cọ nồi, sơ chế thức ăn và dọn dẹp sau bữa cơm. Hơi ấm thường nhật của ba bữa cơm gia đình rốt cuộc đều chảy về một lòng chậu inox duy nhất ấy. Công ty TNHH Công nghiệp Đồ bếp Dongyuan Quảng Đông (Guangdong Dongyuan Kitchenware) được thành lập năm 1993, bắt rễ tại quận Shunde, Foshan — vành đai công nghiệp cốt lõi của ngành sản xuất đồ gia dụng và thiết bị bếp - vệ sinh của Trung Quốc. Suốt hơn ba thập kỷ, Dongyuan chỉ chuyên tâm hoàn thiện một việc: tôi luyện một tấm inox cao cấp nhập khẩu thành chiếc chậu rửa chịu được dầu mỡ, muối và gia vị, đồng thời vững bền trước thử thách của thời gian. Trên một khuôn viên hiện đại rộng khoảng 25.000 mét vuông, hơn 400 thợ lành nghề cùng đội ngũ thiết kế khuôn nội bộ tự nắm giữ từng công đoạn — từ cắt phôi, dập tạo hình đến hàn, đánh xước và đánh bóng. Với Dongyuan, một chiếc chậu rửa không đơn thuần là một món phụ kiện; đó là nền tảng đáng tin cậy của gian bếp, được tin dùng và ghi nhớ qua từng ngày.",
  heritage:
    "Với hơn 30 năm tập trung vào chậu rửa bếp bằng inox, Dongyuan xây dựng trên nền tảng thép SUS 304 nhập khẩu và khuôn tự sản xuất, bao trùm trọn dải sản phẩm chậu lắp dương, lắp âm, chậu đơn, chậu đôi và chậu thủ công. Sở hữu các chứng nhận xuất khẩu như UPC và CSA, công ty phục vụ thị trường trên toàn thế giới. Từ một xưởng nhỏ tại Shunde đến một nhà sản xuất chuyên nghiệp phục vụ các kênh dự án và phân phối toàn cầu, điều xuyên suốt vẫn là sự tận tâm bền bỉ với nghề chế tác inox lâu đời.",
  technicalSpecs: [
    { label: "Thương hiệu", value: "Dongyuan (Công ty TNHH Công nghiệp Đồ bếp Dongyuan Quảng Đông)" },
    { label: "Thành lập / Xuất xứ", value: "Năm 1993, Shunde, Foshan, Quảng Đông, Trung Quốc" },
    { label: "Sản phẩm chủ lực", value: "Chậu rửa bếp inox SUS 304 (lắp dương/lắp âm, chậu đơn/đôi, thủ công)" },
    { label: "Vật liệu tấm", value: "Inox SUS 304 cao cấp nhập khẩu — chống ăn mòn và an toàn tiếp xúc thực phẩm" },
    { label: "Kiểu quy trình", value: "Hai dây chuyền sản xuất: dập sâu nguyên khối và hàn ghép thủ công" },
    { label: "Quy mô nhà máy", value: "Khoảng 25.000 mét vuông, hơn 400 thợ lành nghề, đội thiết kế khuôn nội bộ" },
  ],
  manufacturing: [
    "Công nghiệp Đồ bếp Dongyuan Quảng Đông được thành lập năm 1993 tại Shunde, Foshan — cụm công nghiệp đồ bếp - vệ sinh và gia dụng cốt lõi của vùng đồng bằng châu thổ Châu Giang, với chuỗi cung ứng phụ trợ trưởng thành",
    "Toàn bộ chậu rửa dùng tấm inox SUS 304 cao cấp nhập khẩu với hàm lượng crôm và niken ổn định — chống ăn mòn, chống gỉ và giữ độ sáng bóng bền lâu",
    "Đội ngũ thiết kế khuôn nội bộ tự phát triển khuôn trên nhiều quy cách — lắp dương, lắp âm, chậu đơn và chậu đôi — kiểm soát độ chính xác kích thước và tính đồng nhất",
    "Các mẫu thủ công được hàn và tạo hình bằng tay với góc vuông bo R sắc nét; các mẫu dập được dập nguyên khối trên máy ép lực lớn — hai dây chuyền vận hành song song phù hợp với từng nhu cầu sử dụng",
    "Các dây chuyền nội bộ bao gồm cắt phôi, dập/hàn, mài, đánh bóng xước, xử lý chống ồn đáy chậu và kiểm tra độ kín nước — cung cấp trực tiếp từ nhà máy với thời gian giao hàng đáng tin cậy",
  ],
  careGuide: [
    { title: "Vệ sinh hằng ngày", desc: "Lau theo chiều vân xước bằng khăn mềm hoặc miếng bọt biển và dung dịch tẩy rửa trung tính; tránh dùng búi thép và axit hay kiềm mạnh để không làm trầy xước hoặc ăn mòn bề mặt inox." },
    { title: "Ngăn vết nước và cặn vôi", desc: "Lau khô ngay sau khi sử dụng và tránh để đọng nước lâu; ở khu vực nước cứng, định kỳ dùng dung dịch chuyên dụng cho inox để phục hồi độ sáng và hạn chế tích tụ cặn vôi." },
    { title: "Giữ thoát nước thông suốt", desc: "Thường xuyên loại bỏ vụn thức ăn và dầu mỡ khỏi giỏ lọc rác và thông xi phông P-trap để ngăn tắc nghẽn và mùi hôi, kéo dài tuổi thọ bộ phụ kiện thoát nước." },
    { title: "Tránh nhiệt cao và va đập mạnh", desc: "Không để dụng cụ nấu còn nóng bỏng đặt lâu trên đáy chậu; đặt vật nặng nhẹ nhàng để tránh ố màu do nhiệt cục bộ hoặc móp méo do va đập mạnh." },
  ],
  installation: [
    "Xác định phương thức lắp đặt dựa trên chất liệu mặt bàn bếp (đá thạch anh, đá nung kết, bề mặt liền khối, v.v.) và bản vẽ khoét lỗ: lắp dương, lắp âm hoặc lắp phẳng",
    "Khoét lỗ mặt bàn chính xác theo kích thước ngoài của chậu; lắp âm cần định vị sẵn các kẹp lắp và mặt bàn đủ dày để chịu tải",
    "Chậu lắp dương được ép và làm kín tại viền bằng keo silicone chống mốc; chậu lắp âm được cố định bên dưới mặt bàn bằng keo chuyên dụng và kẹp đỡ để đảm bảo lắp chắc chắn, không bị xệ",
    "Lắp vòi, bộ xả, ống thoát và xi phông P-trap, kết nối đường cấp nước nóng và lạnh, sau đó cấp đầy nước để kiểm tra rò rỉ và độ kín tại tất cả các mối nối",
    "Lau sạch keo thừa, kiểm tra độ cân bằng của chậu, độ dốc thoát nước và xi phông P-trap chặn mùi, rồi chạy thử cấp đầy và xả hết nước trước khi bàn giao",
  ],
  certifications: [
    "Vật liệu: inox SUS 304 nhập khẩu — đáp ứng yêu cầu an toàn của vật liệu tiếp xúc thực phẩm",
    "Chứng nhận xuất khẩu: UPC (tiêu chuẩn cấp thoát nước Bắc Mỹ) / CSA (chứng nhận an toàn Canada)",
    "Kiểm soát quy trình: kiểm tra độ kín nước, kiểm tra xác suất độ dày tấm inox, và kiểm định chất lượng mối hàn cùng tạo hình dập sâu",
    "An toàn bề mặt: hoàn thiện đánh xước/đánh bóng với góc và cạnh được làm sạch ba via — an toàn, không vướng víu khi dùng hằng ngày",
    "Bảo hành toàn chậu: có cam kết chất lượng sản phẩm, với thời hạn và điều khoản bảo hành được xác nhận theo từng đơn hàng",
  ],
  packaging: [
    { label: "Quy cách đóng gói", value: "Thùng carton riêng + mút/góc bảo vệ + màng bảo vệ bề mặt để chống trầy xước khi vận chuyển" },
    { label: "Phụ kiện kèm theo", value: "Bộ xả, giỏ lọc rác, vòng đệm kín, kẹp lắp (cấu hình thay đổi theo mẫu)" },
    { label: "Đơn vị cung cấp", value: "Cung cấp theo SKU/mẫu chậu; hỗ trợ ghép tải đa dạng giữa các mẫu chậu đơn/đôi và lắp dương/lắp âm" },
    { label: "Số lượng đặt tối thiểu", value: "Theo lô/container; thương lượng linh hoạt cho đơn hàng dự án và phân phối" },
    { label: "Hàng mẫu", value: "Có chậu mẫu để xác nhận cảm giác cầm, độ dày tấm và hoàn thiện đánh xước trước khi đặt số lượng lớn" },
  ],
  whyChoose: [
    { icon: "🛡️", title: "Inox 304 nhập khẩu", desc: "Tấm SUS 304 cao cấp nhập khẩu — chống ăn mòn, an toàn tiếp xúc thực phẩm, bền lâu và không gỉ không xỉn màu, được tạo nên để đáp ứng nhu cầu khắt khe hằng ngày của gian bếp." },
    { icon: "🥘", title: "30 năm chỉ làm chậu rửa", desc: "Thành lập năm 1993, với hơn 30 năm chuyên tâm vào chậu rửa bếp bằng inox — bề dày tay nghề, dải sản phẩm trọn vẹn và sự đáng tin cậy đến từ chuyên môn hóa." },
    { icon: "🔧", title: "Khuôn và sản xuất nội bộ", desc: "Đội thiết kế khuôn nội bộ cùng nhà máy sở hữu rộng 25.000 mét vuông mang lại kích thước chính xác, tính đồng nhất cao và thời gian giao hàng ổn định — trực tiếp từ nguồn." },
    { icon: "✋", title: "Thủ công và dập — quy trình kép", desc: "Chậu thủ công hàn góc vuông năng suất cao song hành cùng các kiểu dập sâu nguyên khối mượt mà — chọn lắp dương, lắp âm, chậu đơn hay chậu đôi phù hợp với gian bếp của bạn." },
    { icon: "🌍", title: "Chứng nhận chất lượng đạt chuẩn xuất khẩu", desc: "Sở hữu các chứng nhận xuất khẩu như UPC và CSA, với chất lượng được kiểm soát theo tiêu chuẩn thị trường quốc tế — sự an tâm cho cả kênh dự án lẫn phân phối." },
  ],
  projectShowcase: ["Bếp gia đình trọn bộ tủ", "Hoàn thiện cao cấp cho căn hộ và nhà phố", "Nhà hàng, quán ăn và bếp thương mại", "Dự án bếp cho khách sạn, căng tin và nhiều hơn nữa"],
  faq: [
    { q: "Chậu rửa Dongyuan được làm từ vật liệu gì?", a: "Chủ yếu là inox SUS 304 cao cấp nhập khẩu, với hàm lượng crôm và niken ổn định — chống ăn mòn, chống gỉ, an toàn tiếp xúc thực phẩm và phù hợp với môi trường bếp dùng lâu dài." },
    { q: "Tôi nên chọn lắp dương hay lắp âm?", a: "Chậu lắp dương đặt áp lên bề mặt mặt bàn — dễ lắp đặt và thuận tiện khi cải tạo; chậu lắp âm gắn bên dưới mặt bàn tạo bề mặt phẳng liền mạch dễ lau chùi, nhưng cần mặt bàn đủ dày và được gia cố để chịu tải." },
    { q: "Khác biệt giữa chậu thủ công và chậu dập là gì?", a: "Chậu thủ công được hàn bằng tay với góc vuông bo R sắc nét và lòng chậu sâu hơn để tăng dung tích; chậu dập được dập nguyên khối với các chuyển góc bo tròn mượt mà và độ vững kết cấu xuất sắc. Chọn thủ công để có dung tích, chọn dập để có vẻ liền khối mượt mà." },
    { q: "Chậu rửa có kèm phụ kiện thoát nước không?", a: "Thường bao gồm các phụ kiện cơ bản như bộ xả, giỏ lọc rác và vòng đệm kín (cấu hình thay đổi theo mẫu), kèm kích thước khoét lỗ và kẹp lắp để dễ dàng lắp đặt tại công trình." },
    { q: "Dongyuan có bán tại Việt Nam không?", a: "Vui lòng liên hệ chuỗi cung ứng Huayuesc để được báo giá, số lượng đặt tối thiểu và thông tin thời gian giao hàng cho việc cung cấp chậu rửa inox Dongyuan cho các dự án và nhà phân phối tại Việt Nam." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
