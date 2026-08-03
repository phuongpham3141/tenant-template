/**
 * Metadata cho CareLighting (Zhejiang Xuguang / Kaier Lighting) — metadata thương hiệu dùng chung.
 * Nguồn: care-china.en.made-in-china.com. Nhà sản xuất đèn LED, niêm yết trên sàn NEEQ của Trung Quốc (839762).
 * Dải sản phẩm bao gồm bóng đèn LED G45, đèn âm tủ/âm trần GX53, đèn downlight và spotlight, đèn sạc khẩn cấp USB và nhiều loại khác.
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
    "Khi màn đêm buông xuống, ánh sáng phù hợp chính là yếu tố làm nên sự ấm áp cho không gian. CareLighting là một phần của Công ty TNHH Công nghệ Điện tử Zhejiang Xuguang — doanh nghiệp công nghệ cao cấp quốc gia, quy tụ trọn vẹn R&D, sản xuất, kinh doanh và dịch vụ dưới cùng một mái nhà. Từ bóng đèn mini G45 đường kính 45mm, đến đèn downlight GX53 mỏng gắn âm vào trần, cho tới đèn sạc khẩn cấp USB tự động bật sáng ngay khoảnh khắc mất điện, CareLighting đã biến ánh sáng LED thành lựa chọn quen thuộc hằng ngày, thay thế những bóng đèn truyền thống trong hàng triệu gia đình. Thương hiệu không chạy theo những kiểu dáng hào nhoáng; thay vào đó, dồn toàn bộ tâm huyết vào sự phân bổ ánh sáng đồng đều, mức tiêu thụ điện tiết kiệm và tuổi thọ bền bỉ — để mỗi kilowatt-giờ tỏa sáng với giá trị lớn hơn.",
  heritage:
    "Công ty được niêm yết trên sàn NEEQ của Trung Quốc vào năm 2016 (mã 839762), và nhãn hiệu Kaier Lighting của công ty là thương hiệu đèn LED nổi tiếng tại Trung Quốc, đã giành vị trí trong Top 10 Thương hiệu Nguồn sáng của Trung Quốc bốn năm liên tiếp. Được hậu thuẫn bởi cơ sở sản xuất hiện đại rộng hơn 90.000 mét vuông và công suất hằng năm khoảng 100 triệu sản phẩm chiếu sáng, CareLighting đã xây dựng mạng lưới phân phối trải khắp 26 trung tâm vận hành cấp tỉnh, hơn 500 điểm phân phối cấp một, vươn tới hơn 100.000 điểm bán lẻ.",
  technicalSpecs: [
    { label: "Công suất", value: "Bóng G45 từ 3W; đèn âm GX53 5W / 7W / 9W; bóng bắp ngô dạng T 20W-50W" },
    { label: "Hiệu suất phát sáng", value: "Nguồn sáng chip SMD lumen cao, hiệu suất toàn bộ đèn thường đạt 80-100 lm/W (tùy theo model)" },
    { label: "Nhiệt độ màu", value: "Có sẵn các tùy chọn trắng ấm khoảng 2700-3000K, trắng tự nhiên khoảng 4000K và trắng lạnh khoảng 6000K" },
    { label: "Chỉ số hoàn màu (CRI)", value: "Ra lớn hơn 80; các model chống nhấp nháy, thân thiện với mắt tái hiện màu sắc vật thể chân thực hơn" },
    { label: "Cấp bảo vệ IP", value: "Các model trong nhà đạt chuẩn IP20; phiên bản khẩn cấp ngoài trời có khả năng chống ẩm và chống bắn nước ở mức độ nhất định" },
    { label: "Tuổi thọ định mức", value: "Khoảng 25.000-30.000 giờ, giúp bạn không phải bận tâm chuyện thay bóng đèn thường xuyên" },
  ],
  manufacturing: [
    "Zhejiang Xuguang Electronic Technology (CareLighting / Kaier Lighting) sở hữu cơ sở sản xuất hiện đại rộng hơn 90.000 mét vuông, với công suất hằng năm khoảng 100 triệu sản phẩm chiếu sáng LED",
    "Nhiều dây chuyền sản xuất bóng G45, đèn âm GX53, downlight, spotlight và đèn khẩn cấp vận hành song song; gắn chip SMD, đổ keo, lão hóa và phân loại màu đều được hoàn thiện nội bộ",
    "Tổng cộng 122 đơn đăng ký sáng chế, trong đó 82 đơn đã được cấp; đạt chứng nhận hệ thống quản lý chất lượng ISO 9001:2015 và hệ thống quản lý môi trường ISO 14001:2015",
    "Cấu trúc tản nhiệt của vỏ nhôm và bộ khuếch tán nhựa/PC được tối ưu thông qua mô phỏng nhiệt, kết hợp với driver dòng điện không đổi tương thích để đảm bảo vận hành không nhấp nháy và tuổi thọ bền bỉ",
    "Mỗi sản phẩm đều trải qua kiểm tra lấy mẫu cấp điện 100% trước khi xuất xưởng, cùng với các bài kiểm tra lão hóa ở nhiệt độ cao nhằm loại bỏ lỗi sớm và đảm bảo sự đồng nhất giữa các lô hàng",
  ],
  careGuide: [
    { title: "Vệ sinh định kỳ", desc: "Sau khi ngắt nguồn điện, lau bụi trên đèn bằng khăn mềm khô hoặc hơi ẩm; giữ đèn trong nhà tránh xa nơi ẩm ướt và tuyệt đối không xối nước trực tiếp." },
    { title: "Chọn đúng đui đèn", desc: "Trước khi thay bóng, hãy xác nhận loại đui (E27 / E14 / B22 / GX53) và công suất phù hợp; tuyệt đối không chạm vào phần đui kim loại bằng tay ướt trong khi lắp đặt hoặc thay thế." },
    { title: "Model khẩn cấp sạc điện", desc: "Hãy sạc đầy qua cổng USB trước lần sử dụng đầu tiên; chúng tôi khuyến nghị thực hiện một chu kỳ sạc-xả đầy đủ định kỳ để duy trì dung lượng pin và độ tin cậy khi khẩn cấp." },
    { title: "Môi trường tản nhiệt", desc: "Tránh vận hành đèn công suất cao ở tải tối đa trong thời gian dài bên trong các vỏ kín, không thông gió; chừa khoảng trống cho việc tản nhiệt có thể kéo dài đáng kể tuổi thọ." },
  ],
  installation: [
    "Chọn bóng đèn hoặc đèn phù hợp dựa trên loại đui và công suất định mức của đui đèn hiện có, tránh vận hành vượt công suất định mức",
    "Đối với đèn âm tủ/gắn nổi GX53, hãy chuẩn bị lỗ khoét theo kích thước khoét chuẩn GX53, sau đó vặn vào vị trí và nhẹ nhàng gài để cố định",
    "Đấu nối ở đúng điện áp (thường là AC220-240V); các model có thể điều chỉnh độ sáng phải kết hợp với bộ điều chỉnh độ sáng tương thích, và các model không điều chỉnh được độ sáng không được đấu nối vào mạch điều chỉnh độ sáng",
    "Khi lắp đặt downlight/spotlight âm trần, hãy phân biệt chính xác dây nóng và dây nguội, đồng thời đảm bảo tiếp đất đáng tin cậy cho các model vỏ kim loại",
    "Đảm bảo tản nhiệt và thông gió tốt cho đèn công suất cao, và đi dây trong trần tránh xa nguồn nhiệt cao và các cạnh sắc",
  ],
  certifications: [
    "Đạt chứng nhận hệ thống quản lý chất lượng ISO 9001:2015 và hệ thống quản lý môi trường ISO 14001:2015",
    "Đèn hoàn chỉnh cho thị trường nội địa đáp ứng yêu cầu chứng nhận sản phẩm bắt buộc CCC; các dòng xuất khẩu đạt chứng nhận CE, RoHS, ERP và nhiều chứng nhận khác",
    "Đáp ứng các yêu cầu về cấp hiệu suất năng lượng LED — tiết kiệm năng lượng và hiệu quả về điện, thỏa mãn tiêu chuẩn mua sắm chiếu sáng xanh",
    "Đã vượt qua đánh giá an toàn quang sinh học LED; các model không nhấp nháy / nhấp nháy thấp giúp giảm hiệu quả tình trạng mỏi mắt",
    "Sở hữu chứng nhận doanh nghiệp công nghệ cao và được niêm yết trên sàn NEEQ của Trung Quốc (mã 839762), cung cấp dịch vụ bảo hành toàn bộ đèn",
  ],
  packaging: [
    { label: "Tùy chọn cung ứng", value: "Đóng gói tiêu chuẩn theo SKU hoặc đóng gói theo yêu cầu (OEM/ODM); bóng G45 hỗ trợ hộp màu tùy chỉnh" },
    { label: "Dòng sản phẩm", value: "Bóng đèn LED G45, bóng bắp ngô dạng T, đèn âm tủ/âm trần GX53, đèn downlight và spotlight, đèn sạc khẩn cấp USB" },
    { label: "Đui/Giao tiếp", value: "E27 / E14 / B22 / GX53 (tùy theo SKU); các model khẩn cấp đi kèm cổng sạc USB" },
    { label: "Bảo vệ", value: "Hộp màu riêng từng sản phẩm có miếng đệm chống sốc, và thùng carton chính chia ngăn chống đè giúp giảm vỡ hỏng khi vận chuyển đường dài" },
    { label: "Hàng mẫu", value: "Có sẵn đèn mẫu để lắp thử — xác nhận màu sáng và độ sáng trước khi đặt hàng số lượng lớn" },
  ],
  whyChoose: [
    { icon: "💡", title: "Thương hiệu LED nổi tiếng", desc: "Kaier Lighting đã giành vị trí trong Top 10 Thương hiệu Nguồn sáng của Trung Quốc bốn năm liên tiếp, với uy tín chất lượng được chứng minh trên thị trường." },
    { icon: "🏭", title: "Sản xuất quy mô lớn", desc: "Cơ sở rộng hơn 90.000 mét vuông và công suất hằng năm khoảng 100 triệu sản phẩm, với thời gian giao hàng ổn định nhờ cung ứng trực tiếp từ nhà máy." },
    { icon: "✅", title: "Chứng nhận toàn diện", desc: "Hệ thống ISO 9001/14001, cùng chứng nhận CCC và chứng nhận xuất khẩu CE/RoHS/ERP — tiết kiệm năng lượng và tuân thủ quy chuẩn." },
    { icon: "🌙", title: "Thân thiện với mắt & không nhấp nháy", desc: "CRI cao kết hợp với driver dòng điện không đổi mang lại ánh sáng dịu, ổn định, dễ chịu cho mắt khi nhìn lâu và tái hiện màu sắc chân thực." },
    { icon: "🔋", title: "Không gián đoạn khi khẩn cấp", desc: "Bóng đèn khẩn cấp sạc USB tự động bật sáng khi mất điện — lý tưởng cho cắm trại ngoài trời và những khu vực thường xuyên mất điện." },
  ],
  projectShowcase: [
    "Cải tạo chiếu sáng chính và chiếu sáng trang trí cho nhà ở và căn hộ",
    "Chiếu sáng âm trần và chiếu sáng điểm cho phòng khách, phòng ngủ và văn phòng",
    "Chiếu sáng tạo điểm nhấn GX53 mỏng cho tủ, tủ trưng bày và kệ",
    "Chiếu sáng dự phòng khẩn cấp cho các khu vực dễ mất điện và cắm trại ngoài trời",
  ],
  faq: [
    { q: "CareLighting (Kaier) là thương hiệu như thế nào?", a: "Đây là thương hiệu đèn LED của Zhejiang Xuguang Electronic Technology, một doanh nghiệp công nghệ cao niêm yết trên sàn NEEQ của Trung Quốc (839762) và đã được vinh danh là một trong Top 10 Thương hiệu Nguồn sáng của Trung Quốc." },
    { q: "Có những loại đèn nào?", a: "Bao gồm bóng đèn LED G45 (E27/E14/B22), bóng bắp ngô dạng T công suất cao, đèn âm tủ/âm trần GX53, đèn downlight và spotlight, cùng bóng đèn LED khẩn cấp sạc USB." },
    { q: "Làm sao để chọn giữa đèn GX53 điều chỉnh và không điều chỉnh độ sáng?", a: "Nếu bạn cần điều chỉnh độ sáng bằng bộ điều chỉnh, hãy chọn model điều chỉnh được độ sáng và kết hợp với bộ điều chỉnh tương thích; với mạch công tắc thông thường thì model không điều chỉnh độ sáng là phù hợp. Tuyệt đối không đấu nối đèn không điều chỉnh độ sáng vào mạch điều chỉnh độ sáng." },
    { q: "Đèn có tuổi thọ bao lâu?", a: "Tuổi thọ định mức khoảng 25.000-30.000 giờ, đạt nhiều năm trong điều kiện sử dụng bình thường; đảm bảo tản nhiệt tốt và tránh bật/tắt thường xuyên có thể kéo dài tuổi thọ hơn nữa." },
    { q: "Có cung ứng sang Việt Nam không?", a: "Vui lòng liên hệ Huayuesc Supply Chain để tìm hiểu về việc cung ứng đèn CareLighting cho các dự án và nhà phân phối tại Việt Nam, bao gồm cả báo giá." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
