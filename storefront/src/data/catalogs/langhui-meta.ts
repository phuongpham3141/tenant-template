/**
 * Metadata Langhui (Guangdong Langhui Building Material Technology) — shared brand metadata.
 * Source: gdlanghui.com. ALC/AAC autoclaved aerated concrete panel manufacturer, Foshan-Gaoming.
 * Rich-content version: covers AAC blocks, fire-rated walls, floor/roof panels, ultra-thin wall panels, and the full product range.
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
    "Công ty TNHH Công nghệ Vật liệu Xây dựng Quảng Đông Langhui (Langhui) biến cát, vôi và xi măng thông thường thành những bức tường vừa thở được vừa vững chãi không gì phá vỡ nổi. Quy trình cốt lõi của hãng là bê tông khí chưng áp (Autoclaved Lightweight Concrete, gọi tắt là ALC/AAC) — bên trong các lò chưng áp nhiệt độ cao, áp suất cao, vô số bọt khí mịn phân bố đều được niêm phong vĩnh viễn trong khối bê tông, tạo ra những tấm panel nhẹ đến mức một người có thể bê được nhưng vẫn đủ sức chống chịu lửa dữ dội, cách âm và ngăn nóng lạnh. Từ tấm vách ngăn siêu mỏng 50mm, đến tấm panel kết cấu đỡ sàn và mái, cho tới tường chống cháy bao bọc cột và dầm thép, Langhui đáp ứng mọi yêu cầu mà các công trình khung thép hiện đại đặt ra về sự nhẹ nhàng, tốc độ, an toàn và hiệu quả năng lượng bằng một ngôn ngữ bê tông khí nhất quán. Với những dự án coi trọng tiến độ và chất lượng ngang nhau, đây là vật liệu đặt cả tốc độ thi công lẫn tuổi thọ công trình vào tay bạn cùng lúc.",
  heritage:
    "Langhui tọa lạc tại khu phát triển công nghiệp trọng điểm Gaoming của Foshan. Cơ sở sản xuất hiện đại của hãng trải rộng khoảng 246 mu (chừng 16,4 hectares) với tổng vốn đầu tư khoảng 420 triệu RMB, nằm ngay trung tâm khu vực Greater Bay Area và tận dụng triệt để sự cộng hưởng của vùng về sản xuất, logistics và công nghệ. Được hậu thuẫn bởi một trong những dây chuyền sản xuất tấm ALC/AAC siêu mỏng hàng đầu Trung Quốc, tấm panel Langhui đã được xuất khẩu với số lượng lớn sang các dự án khung thép nhẹ tại Úc, Nhật Bản và Hàn Quốc, gây dựng được uy tín vững chắc trên thị trường quốc tế.",
  technicalSpecs: [
    { label: "Thương hiệu", value: "Langhui (Công nghệ Vật liệu Xây dựng Quảng Đông Langhui)" },
    { label: "Loại vật liệu", value: "Bê tông khí chưng áp ALC/AAC, bao gồm tấm tường, tấm sàn, tấm mái, tấm tường chống cháy và gạch block AAC" },
    { label: "Độ dày phổ biến", value: "Tấm tường siêu mỏng 50mm / 75mm; tấm sàn, tấm mái và gạch block lựa chọn theo ứng dụng và tải trọng" },
    { label: "Cấp khối lượng riêng khô", value: "Cấp B05 đến B07 (khoảng 500 đến 700 kg/m³), thuộc nhóm vật liệu tường nhẹ" },
    { label: "Khả năng chống cháy", value: "Vật liệu vô cơ không cháy, không bắt lửa hay thải khói độc khi tiếp xúc với lửa, phù hợp cho bao bọc chống cháy và vách ngăn chống cháy" },
    { label: "Đặc tính vật lý", value: "Nhẹ, cường độ cao, cách nhiệt, cách âm, chống đóng băng, chống thấm và chống động đất, với hệ số hóa mềm cao và khả năng chống nứt khi treo vật nặng" },
  ],
  manufacturing: [
    "Công nghệ Vật liệu Xây dựng Quảng Đông Langhui (Langhui) vận hành cơ sở sản xuất riêng tại Foshan Gaoming, trải rộng khoảng 246 mu (chừng 16,4 hectares) với vốn đầu tư khoảng 420 triệu RMB",
    "Lấy trung tâm là một trong những dây chuyền sản xuất ALC/AAC siêu mỏng hàng đầu Trung Quốc, kiểm soát toàn diện khâu phối trộn, đổ khuôn, cắt và dưỡng hộ chưng áp ngay trong nội bộ",
    "Cát, vôi, xi măng và tác nhân tạo bọt được đổ theo tỷ lệ hiệu chỉnh khoa học, sau đó được dưỡng hộ và định hình trong lò chưng áp nhiệt độ cao, áp suất cao để tạo bọt khí mịn, đồng đều và kích thước ổn định",
    "Tận dụng lợi thế của Greater Bay Area về sản xuất, logistics và công nghệ để cung ứng ổn định, số lượng lớn các loại tấm tường siêu mỏng, tấm sàn, tấm mái và tấm tường chống cháy",
    "Hỗ trợ tùy biến biên dạng và độ dày tấm theo ứng dụng; tấm ALC Langhui đã được xuất khẩu với số lượng lớn sang Úc, Nhật Bản, Hàn Quốc và các thị trường nước ngoài khác",
  ],
  careGuide: [
    { title: "Bảo quản tránh ẩm", desc: "Xếp tấm nằm phẳng tại khu vực khô ráo, có mái che, kê cao khỏi mặt đất; trong quá trình lưu kho, bảo vệ cạnh và góc tấm khỏi va đập, mưa và thấm ẩm." },
    { title: "Cắt và khoan", desc: "Dùng cưa tay, cưa máy hoặc mũi khoan lỗ chuyên dụng để có vết cắt sạch, thẳng; sau khi tạo rãnh đi đường ống, kịp thời chèn lấp đầy rãnh bằng vữa để tránh điểm rỗng." },
    { title: "Xử lý hoàn thiện", desc: "Dùng lớp lót kết dính và vữa trát mỏng phù hợp với nền AAC; trám mạch theo đúng quy cách và đặt lưới gia cố để ngăn lớp hoàn thiện bị nứt hiệu quả." },
    { title: "Bảo vệ phần việc đã hoàn thiện", desc: "Sau khi lắp đặt, bảo vệ bề mặt tường và cạnh tấm khỏi va đập mạnh; ở khu vực ẩm ướt, thi công lớp chống thấm nền trước khi hoàn thiện để kéo dài tuổi thọ của tường." },
  ],
  installation: [
    "Lựa chọn loại tấm theo ứng dụng: vách ngăn trong và ngoài, tường ngoài, sàn, mái, và bao bọc chống cháy cột và dầm thép, chọn độ dày dựa trên tải trọng và cấp chống cháy",
    "Tấm tường được cố định vào dầm và bản sàn bằng liên kết kẹp (panel clip), sử dụng đinh bắn L=25mm và bu lông nở kim loại M8; tấm tường chống cháy được lắp trên khung xương thép nhẹ và khóa bằng vít tự khoan",
    "Tấm sàn và mái được đặt trên dầm thép và liên kết bằng bản mã thép góc và bu lông hóa chất M12, kiểm soát độ chồng và độ neo theo bản vẽ kỹ thuật",
    "Chèn chặt mạch tấm bằng vữa xi măng và xử lý các nút liên kết đúng cách để đảm bảo khả năng cách âm, chống cháy và chống nứt liên tục, đáng tin cậy",
    "Khi mạch đã khô, bả phẳng bằng bột trét và sơn tường nội thất, hoặc hoàn thiện lớp trát mỏng theo yêu cầu dự án, mang lại bức tường phẳng đẹp",
  ],
  certifications: [
    "Tấm bê tông khí chưng áp, tuân thủ tiêu chuẩn kỹ thuật sản phẩm ALC/AAC và yêu cầu vật liệu tường nhẹ",
    "Vật liệu vô cơ không cháy với khả năng chống cháy và chịu lửa, phù hợp cho bao bọc chống cháy kết cấu thép và vách ngăn chống cháy",
    "Tấm sàn và mái được kiểm chứng qua tính toán kết cấu để mang lại khả năng chịu tải và chống nứt tương ứng, tương thích với thi công khung thép và bê tông",
    "Vật liệu xây dựng tiết kiệm năng lượng, thân thiện môi trường, cách nhiệt và cách âm — xanh và carbon thấp, phù hợp với yêu cầu hiệu quả năng lượng của công trình hiện đại",
    "Sản phẩm xuất khẩu số lượng lớn sang Úc, Nhật Bản và Hàn Quốc, đáp ứng yêu cầu cung ứng và chất lượng của các thị trường quốc tế đó",
  ],
  packaging: [
    { label: "Phương thức cung ứng", value: "Cung cấp theo tấm và theo quy cách, giao đến công trường theo từng đợt đồng bộ với tiến độ dự án" },
    { label: "Quy cách phổ biến", value: "Tấm tường siêu mỏng 50mm / 75mm; tấm sàn, tấm mái, tấm tường chống cháy và gạch block AAC lựa chọn theo ứng dụng" },
    { label: "Bảo vệ vận chuyển", value: "Xếp thành bó nguyên kiện, bọc màng co và cố định chắc chắn, ngăn cách bằng kê gỗ để tránh hư hại cạnh góc và ẩm ướt trong quá trình vận chuyển" },
    { label: "Phụ kiện liên kết đi kèm", value: "Kẹp tấm, đinh bắn, bu lông nở kim loại, bản mã thép góc, bu lông hóa chất và các phụ kiện lắp đặt khác có thể cung cấp kèm theo tấm" },
    { label: "Ứng dụng", value: "Vách ngăn trong và ngoài, tường ngoài, sàn, mái, tường chống cháy, và bao bọc chống cháy cột và dầm thép" },
  ],
  whyChoose: [
    { icon: "🧱", title: "Chuyên sâu về ALC/AAC", desc: "Cơ sở do công ty sở hữu tại Foshan Gaoming với dây chuyền tấm siêu mỏng hàng đầu, bao phủ trọn dải tấm tường, sàn, mái và tường chống cháy." },
    { icon: "🪶", title: "Nhẹ mà chắc", desc: "Các bọt khí mịn mang lại trọng lượng bản thân thấp với cường độ đáng kể, giảm tải trọng kết cấu và giúp tấm dễ thao tác, lắp ráp nhanh." },
    { icon: "🔥", title: "An toàn cháy", desc: "Vật liệu vô cơ không cháy, không bắt lửa hay thải khói độc khi tiếp xúc với lửa — lựa chọn đáng tin cậy để bao bọc chống cháy cột và dầm thép và làm vách ngăn chống cháy." },
    { icon: "🌡️", title: "Cách nhiệt và cách âm", desc: "Cấu trúc bọt khí kín mang lại khả năng cách nhiệt và cách âm xuất sắc, giúp tường tiết kiệm năng lượng hơn và không gian bên trong yên tĩnh hơn." },
    { icon: "🌏", title: "Chất lượng xuất khẩu", desc: "Xuất khẩu số lượng lớn sang các dự án khung thép tại Úc, Nhật Bản và Hàn Quốc, được kiểm chứng lâu dài trên thị trường quốc tế." },
  ],
  projectShowcase: [
    "Vách ngăn trong và ngoài, lắp dựng sàn và mái cho nhà ở khung thép nhẹ",
    "Tòa nhà văn phòng, nhà xưởng và các dự án khác cần vách ngăn nhẹ và thi công khô nhanh",
    "Bao bọc chống cháy cột và dầm thép, và các dự án vách ngăn chống cháy",
    "Nâng tầng và cải tạo các công trình hiện hữu, và các dự án có yêu cầu về cách âm, an toàn cháy và hiệu quả năng lượng",
  ],
  faq: [
    { q: "Tấm ALC/AAC của Langhui thực chất là gì?", a: "ALC/AAC là bê tông khí chưng áp (Autoclaved Lightweight Concrete) — cát, vôi, xi măng và tác nhân tạo bọt được dưỡng hộ và định hình trong lò chưng áp, niêm phong các bọt khí mịn bên trong. Vật liệu này nhẹ, cường độ cao, chống cháy, cách âm và cách nhiệt, có thể dùng cho tường, sàn, mái và bao bọc chống cháy." },
    { q: "Langhui cung cấp những loại tấm nào?", a: "Bao gồm tấm tường siêu mỏng 50mm / 75mm, tấm tường ALC/AAC tiêu chuẩn, tấm sàn và mái, tấm tường chống cháy (bao bọc cột và dầm thép), và gạch block AAC độ chính xác cao, lựa chọn theo ứng dụng, tải trọng và cấp chống cháy." },
    { q: "Các tấm được lắp đặt và liên kết tại công trường như thế nào?", a: "Tấm tường chủ yếu được cố định vào dầm và bản sàn bằng kẹp tấm cùng đinh bắn và bu lông nở kim loại; tấm sàn và mái được đặt trên dầm thép và liên kết bằng bản mã thép góc và bu lông hóa chất; tấm tường chống cháy được lắp trên khung xương thép nhẹ và khóa bằng vít tự khoan. Mạch được chèn vữa xi măng trước khi hoàn thiện." },
    { q: "Vì sao các công trình khung thép thường chọn tấm ALC/AAC?", a: "Bởi vì chúng nhẹ, giảm tải trọng kết cấu, đồng thời chống cháy, cách âm và cách nhiệt, và chống động đất; kết hợp với lắp ráp khô có thể đẩy nhanh tiến độ đáng kể, trở thành giải pháp giá trị cao cho tường, sàn và mái trong nhà ở khung thép nhẹ và khung thép." },
    { q: "Langhui có thể cung cấp cho các dự án tại Việt Nam không?", a: "Tấm panel Langhui đã được xuất khẩu sang nhiều quốc gia với số lượng lớn. Để cung cấp tấm tường, tấm sàn, tấm mái hoặc tấm tường chống cháy ALC/AAC của Langhui cho các dự án tại Việt Nam, vui lòng liên hệ chuỗi cung ứng Huayuesc để trao đổi về lựa chọn và giao hàng." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
