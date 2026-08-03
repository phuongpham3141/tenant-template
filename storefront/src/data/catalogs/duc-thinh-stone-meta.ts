/**
 * Duc Thinh Stone — enriched metadata for the engineered-stone series (product detail pages).
 * Indexed by seriesOriginal (category: "quartz", "marble", "onyx").
 *
 * Sourcing notes:
 *   • Data and specifications: ducthinhstone.com (Duc Thinh Stone Technology Co., Ltd) + industry-standard process parameters.
 *   • Duc Thinh Stone is a member of the Pengxiang group, with its own factory in Nghe An, Vietnam, plus coordinated production capacity in Fujian, China.
 *   • The engineered-stone series is vacuum vibro-compressed from quartz powder / stone powder / mineral powder + resin.
 */

export type SeriesMeta = {
  story: string;
  heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[];
  careGuide: { title: string; desc: string }[];
  installation: string[];
  certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[];
  faq: { q: string; a: string }[];
};

export const DTS_SERIES_META: Record<string, SeriesMeta> = {
  quartz: {
    story:
      "Đá thạch anh nhân tạo Đức Thịnh được tạo nên từ khoảng 90% bột thạch anh tự nhiên làm cốt lõi và keo resin làm chất kết dính, định hình một lần duy nhất dưới chân không, áp lực cao và rung động — niêm phong độ cứng của đá núi vào từng tấc tấm đá. Đá vốn không lỗ rỗng: không bao giờ hút nước hay tích tụ bụi bẩn, nên cà phê, nước tương và rượu vang đỏ chỉ cần một lần lau khăn là sạch. Độ cứng Mohs sánh ngang thạch anh tự nhiên, vẫn nhẵn mịn hoàn hảo ngay cả dưới lưỡi dao và sự cọ xát của xoong nồi. Từ trắng tinh khôi như tuyết đến xám mực trầm tĩnh, từ vân vàng Calacatta cổ điển đến hồng Pengxiang tinh nghịch, dải màu đủ rộng để đáp ứng mọi sắc thái không gian. Tấm đá lớn tới 3200×1600mm cho phép đảo bếp và mặt bàn dài chạy liền một mạch, mối nối tối thiểu hoặc thậm chí liền mạch. Đây không phải vật thay thế rẻ tiền cho đá tự nhiên — mà là mặt bàn bền bỉ được thiết kế cho căn bếp hiện đại, đủ cứng cáp cho việc nấu nướng hằng ngày mà vẫn đủ tinh tế để hiện thực hóa tầm nhìn của nhà thiết kế.",
    heritage:
      "Đá thạch anh hiện là lựa chọn chủ đạo cho mặt bàn bếp cao cấp trên toàn thế giới, được ưa chuộng nhờ độ bền vượt trội so với đá tự nhiên cùng bề mặt không lỗ rỗng, kháng khuẩn — đã trở thành lời giải chung cho cả căn bếp của đầu bếp lẫn các không gian thương mại. Đức Thịnh kế thừa hệ thống sản xuất thạch anh của tập đoàn Pengxiang, cung ứng từ nhà máy riêng tại Nghệ An, Việt Nam phối hợp cùng năng lực sản xuất tại Phúc Kiến, Trung Quốc — biến độ bền đẳng cấp thế giới thành một thực tế sản xuất ổn định, đáng tin cậy.",
    technicalSpecs: [
      { label: "Vật liệu", value: "Khoảng 90% bột thạch anh tự nhiên + keo resin" },
      { label: "Kích thước tấm", value: "3200×1600 / 3000×1400 / 3000×1600 / 3000×1200 mm + cắt theo yêu cầu" },
      { label: "Độ dày", value: "20 – 30 mm" },
      { label: "Bề mặt", value: "Đánh bóng / mài mờ" },
      { label: "Màu sắc", value: "Trắng / xám / đen / be / xanh / hồng và nhiều màu khác, bao gồm bộ sưu tập vân vàng Calacatta" },
      { label: "Đặc tính nổi bật", value: "Kháng axit, chống bám bẩn, chịu nhiệt, chống trầy xước, không lỗ rỗng, kháng khuẩn, thân thiện môi trường với hàm lượng VOC thấp" },
    ],
    manufacturing: [
      "Đức Thịnh Stone — thành viên của tập đoàn Pengxiang, nhà cung cấp và gia công đá thạch anh nhân tạo phục vụ thị trường Việt Nam và xuất khẩu",
      "Khoảng 90% bột thạch anh tự nhiên trộn cùng keo resin tinh khiết cao, sau đó được dàn đều, hút chân không khử bọt và định hình trong một lần ép rung áp lực cao để tạo thân tấm đá đặc chắc, không lỗ rỗng",
      "Tấm đá thô được nung định hình ở nhiệt độ cao, rồi trải qua nhiều công đoạn từ mài thô đến đánh bóng tinh để đảm bảo độ phẳng đồng nhất và độ bóng đều",
      "Tấm khổ lớn với các kích thước như 3200×1600mm, độ dày 20–30mm, có gia công cắt theo yêu cầu",
      "Công suất hằng năm lên tới khoảng 2,5 triệu mét vuông, với nhà máy Nghệ An, Việt Nam và cơ sở tại Phúc Kiến, Trung Quốc vận hành song song để ổn định nguồn nguyên liệu và thời gian giao hàng",
    ],
    careGuide: [
      { title: "Vệ sinh hằng ngày", desc: "Lau bằng khăn mềm với nước ấm hoặc chất tẩy rửa trung tính để khôi phục độ sáng bóng — không cần đánh sáp hay đánh bóng, mang lại sự chăm sóc nhẹ nhàng, gần như không phải bảo trì." },
      { title: "Chăm sóc phòng ngừa", desc: "Đá thạch anh có khả năng chịu nhiệt tuyệt vời, nhưng nên dùng đế lót cho xoong nồi nóng để tránh sốc nhiệt cục bộ đột ngột gây ứng suất lên lớp keo." },
      { title: "Xử lý vết bẩn", desc: "Các vết bẩn cứng đầu có thể được làm sạch bằng dung dịch tẩy rửa nhẹ và miếng bọt biển không mài mòn, sau đó rửa sạch bằng nước và lau khô ngay." },
      { title: "Điều cần tránh", desc: "Tránh các loại axit hoặc kiềm mạnh nồng độ cao, bột tẩy rửa có tính mài mòn và bùi nhùi thép, vì chúng có thể làm hỏng lớp đánh bóng." },
    ],
    installation: [
      "Đo đạc thực tế tại công trình trước khi gia công và vẽ sơ đồ bố trí tấm để tối ưu hướng vân và vị trí mối nối",
      "Cắt bằng CNC và máy cưa cầu; sau khi khoan và tạo cạnh, đánh bóng tinh các cạnh để loại bỏ sứt mẻ và nứt do ứng suất",
      "Dùng keo chuyên dụng cho thạch anh đồng màu để trám mối nối, giữ các đường nối mặt bàn trong phạm vi khó nhận thấy",
      "Đảm bảo bề mặt đỡ của tủ phẳng và chịu tải đều; bổ sung thanh đỡ và gân gia cường tại các nhịp dài hoặc vị trí khoét lỗ",
      "Sau khi lắp đặt, làm sạch bề mặt, xử lý mối nối và đánh bóng lần cuối, kiểm tra độ phẳng từng tấm trước khi bàn giao",
    ],
    certifications: [
      "ISO 9001 — hệ thống quản lý chất lượng",
      "Kiểm soát nguyên liệu không phóng xạ (tham chiếu tiêu chuẩn NSF / Class A theo từng lô)",
      "Kiểm định định kỳ độ hút nước, độ bền uốn, khả năng chống mài mòn và kháng hóa chất",
      "Vật liệu thân thiện môi trường: keo resin hàm lượng VOC thấp đáp ứng yêu cầu hoàn thiện nội thất xanh",
      "Kiểm soát chất lượng xuất khẩu: phân loại, đối màu và kiểm tra độ phẳng từng tấm",
    ],
    packaging: [
      { label: "Đóng gói", value: "Giá thép chữ A + bảo vệ góc + màng co; đơn hàng xuất khẩu bổ sung thùng gỗ đóng đinh chắc chắn để gia cường" },
      { label: "Kích thước tấm", value: "3200×1600 / 3000×1400 / 3000×1600 / 3000×1200 mm + cắt theo yêu cầu" },
      { label: "Độ dày", value: "20 – 30 mm" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container, hỗ trợ trộn màu / kích thước" },
      { label: "Lưu ý bảo quản", value: "Bảo quản dựng đứng trên giá chữ A; tránh xếp chồng nằm và va đập vào cạnh, góc tấm đá" },
    ],
    whyChoose: [
      { icon: "💎", title: "Cứng cáp và bền bỉ", desc: "Cứng hơn hầu hết các loại đá tự nhiên, chống trầy xước và va đập, gần như không cần bảo trì." },
      { icon: "🛡️", title: "Không lỗ rỗng và kháng khuẩn", desc: "Đặc chắc, không lỗ rỗng, kháng nước và dầu nên vết bẩn không thể thấm vào và vi khuẩn khó sinh sôi, giúp việc lau dọn dễ dàng." },
      { icon: "🔥", title: "Kháng axit và chịu nhiệt", desc: "Ổn định trước axit, kiềm và nguồn nhiệt hằng ngày, luôn như mới ngay cả trong căn bếp nấu nướng bận rộn." },
      { icon: "🎨", title: "Màu sắc và vân phong phú", desc: "Bảng màu đầy đủ gồm trắng, xám, đen và be, từ vân vàng Calacatta đến hồng Pengxiang, phù hợp mọi phong cách." },
      { icon: "📐", title: "Tấm khổ lớn theo yêu cầu", desc: "Khổ lớn 3200×1600 cho mối nối tối thiểu, kèm gia công cắt và xử lý cạnh theo yêu cầu." },
    ],
    projectShowcase: [
      "Mặt bàn bếp trọn bộ, đảo bếp và quầy bar cho căn hộ và biệt thự",
      "Quầy lễ tân và mặt bàn thương mại cho khách sạn và trung tâm thương mại",
      "Ốp tường nội thất cao cấp (treo khô) và lát sàn",
      "Mặt bàn lavabo phòng tắm và cụm chậu rửa liền khối",
    ],
    faq: [
      { q: "Đá thạch anh Đức Thịnh có thể cắt theo kích thước riêng không?", a: "Có. Chúng tôi cung cấp gia công cắt theo yêu cầu cùng khoan lỗ, tạo cạnh và các công đoạn xử lý cạnh khác, phù hợp cho các công trình mặt bàn, tường và sàn." },
      { q: "Mặt bàn thạch anh có nhạy cảm với nhiệt không?", a: "Đá có khả năng chịu nhiệt tốt và chịu được tiếp xúc ngắn với nguồn nhiệt; tuy vậy, chúng tôi khuyến nghị dùng đế lót để tránh nhiệt cục bộ kéo dài hoặc sốc nhiệt đột ngột." },
      { q: "Ưu điểm so với đá cẩm thạch tự nhiên là gì?", a: "Đá không lỗ rỗng và không thấm, chống bám bẩn và kháng khuẩn, cứng hơn, đồng đều hơn về màu sắc và vân — dễ bảo dưỡng hằng ngày và rất phù hợp với những căn bếp tần suất sử dụng cao." },
      { q: "Số lượng đặt tối thiểu và thời gian giao hàng là bao nhiêu?", a: "Tính theo container / số lượng, thời gian giao hàng thỏa thuận theo từng đơn — thường khoảng 15 ngày để tham khảo, tùy theo lịch sản xuất thực tế trong mùa cao điểm." },
      { q: "Có cung cấp mẫu để xác nhận màu sắc không?", a: "Có. Chúng tôi có thể gửi mẫu nhỏ để quý khách xác nhận màu sắc và vân trước khi đặt hàng số lượng lớn." },
    ],
  },
  marble: {
    story:
      "Đá cẩm thạch nhân tạo Đức Thịnh được ép tổng hợp từ đá tự nhiên, bột cẩm thạch và keo resin — tái hiện vẻ thanh lịch ấm áp, tinh tế của đá cẩm thạch tự nhiên đồng thời xóa bỏ sự chênh lệch màu sắc và những vết nứt ẩn vốn khiến đá tự nhiên trở nên đau đầu. Vân đá mềm mại và uyển chuyển; trên diện tích lát lớn, sự chuyển tiếp giữa các tấm vẫn đều đặn và nhịp điệu liền mạch, để cả một sảnh lớn hiện lên như một mặt phẳng hài hòa, không gián đoạn. Với tỷ lệ lỗi thấp và hiệu suất cao, cùng khả năng cắt ghép linh hoạt, hao phí công trình thấp hơn nhiều so với khối đá tự nhiên — cho nhà thiết kế sự tự tin để thể hiện vẻ đẹp của đá ở quy mô hoành tráng. Bề mặt đánh bóng, mài mờ và phun cát đều có sẵn, biến chuyển sắc thái từ sang trọng như gương đến trầm mặc mờ lì để phù hợp mọi bối cảnh. Ở cùng một đẳng cấp thị giác, đá mang lại ngân sách dễ kiểm soát hơn, nguồn cung ổn định hơn và trải nghiệm lắp đặt thân thiện hơn — vẻ đẹp của cẩm thạch, không còn đắt đỏ và mong manh.",
    heritage:
      "Với vân đều, ổn định và tỷ lệ lỗi thấp hơn, đá cẩm thạch nhân tạo đã trở thành lựa chọn thiết thực cho các diện tích trang trí lớn ở khách sạn, trung tâm thương mại và biệt thự. Dựa trên hệ thống đá của tập đoàn Pengxiang và năng lực sản xuất hai dây chuyền tại Việt Nam và Trung Quốc, Đức Thịnh chuyển ngữ ngôn ngữ thẩm mỹ của đá tự nhiên thành một vật liệu nhân tạo có thể sản xuất hàng loạt, tùy biến linh hoạt.",
    technicalSpecs: [
      { label: "Vật liệu", value: "Đá tự nhiên + bột cẩm thạch + keo resin" },
      { label: "Kích thước tấm", value: "3200×1600 / 2400×1600 mm + cắt theo yêu cầu" },
      { label: "Độ dày", value: "18 – 30 mm" },
      { label: "Bề mặt", value: "Đánh bóng / mài mờ / phun cát, có thể tùy chỉnh" },
      { label: "Màu sắc", value: "Be nhạt / trắng tinh / đen mực và các vân giả cẩm thạch khác" },
      { label: "Ứng dụng", value: "Tường, sàn, phòng tắm, phòng khách, mặt bàn và các hạng mục trang trí nội thất khác" },
    ],
    manufacturing: [
      "Đức Thịnh Stone — nhà cung cấp và gia công đá cẩm thạch nhân tạo thuộc tập đoàn Pengxiang, chủ yếu phục vụ thị trường trang trí nội thất và xuất khẩu của Việt Nam",
      "Đá tự nhiên và bột cẩm thạch tổng hợp cùng keo resin và ép rung chân không, với hướng vân đều và tỷ lệ lỗi thấp hơn khối đá tự nhiên",
      "Tấm đá sau khi định hình được nung định hình, rồi đánh bóng, mài mờ hoặc phun cát theo yêu cầu để thể hiện vẻ cẩm thạch với các kết cấu đa dạng",
      "Tấm khổ lớn 3200×1600 / 2400×1600mm, độ dày 18–30mm, hỗ trợ gia công cắt theo yêu cầu và xử lý cạnh",
      "Nhà máy Nghệ An, Việt Nam và năng lực tại Phúc Kiến, Trung Quốc vận hành phối hợp để ổn định nguồn cung, với chu kỳ sản xuất tham khảo điển hình khoảng 15 ngày",
    ],
    careGuide: [
      { title: "Vệ sinh hằng ngày", desc: "Lau bằng khăn mềm với nước ấm hoặc chất tẩy rửa trung tính để giữ bề mặt khô, sạch và sáng bóng." },
      { title: "Chăm sóc phòng ngừa", desc: "Tránh để axit hoặc kiềm nồng độ cao đọng lâu trên bề mặt; bảo dưỡng cơ bản định kỳ cho tường và sàn giúp duy trì độ bóng." },
      { title: "Xử lý vết bẩn", desc: "Lau sạch kịp thời đồ uống, dầu mỡ và những thứ tương tự; xử lý các vết cứng đầu bằng dung dịch tẩy rửa nhẹ và miếng đệm mềm, rồi rửa sạch bằng nước." },
      { title: "Điều cần tránh", desc: "Tránh cào xước bằng vật cứng và va đập mạnh vào các góc; bảo vệ mặt và cạnh tấm đá trong quá trình vận chuyển và lắp đặt." },
    ],
    installation: [
      "Đo đạc công trình và vẽ sơ đồ bố trí tấm trước khi lắp đặt để hoạch định hướng ghép vân và hao phí khi cắt",
      "Với tường, ưu tiên hệ treo khô hoặc hệ kết dính chuyên dụng để đảm bảo chịu tải đều và tỷ lệ bộp thấp",
      "Với sàn, kiểm soát độ phẳng nền và chừa các khe co giãn cần thiết để ngăn phồng rộp do giãn nở nhiệt",
      "Trám mối nối bằng keo chuyên dụng đồng màu để có đường nối phẳng và dòng chảy thị giác liền mạch",
      "Sau khi lắp đặt, làm sạch các tấm, xử lý mối nối và đánh bóng tổng thể, kiểm tra độ phẳng và sự ghép vân của từng tấm",
    ],
    certifications: [
      "ISO 9001 — hệ thống quản lý chất lượng",
      "Kiểm soát nguyên liệu không phóng xạ (tham chiếu tiêu chuẩn NSF / Class A theo từng lô)",
      "Kiểm định vật lý định kỳ độ hút nước, độ bền uốn, khả năng chống mài mòn và nhiều chỉ tiêu khác",
      "Vật liệu thân thiện môi trường: keo resin hàm lượng VOC thấp đáp ứng yêu cầu hoàn thiện nội thất xanh",
      "Kiểm soát chất lượng xuất khẩu: kiểm tra đối màu, độ phẳng và khuyết tật từng tấm",
    ],
    packaging: [
      { label: "Đóng gói", value: "Giá thép chữ A + bảo vệ góc + màng co; đơn hàng xuất khẩu bổ sung thùng gỗ đóng đinh chắc chắn để gia cường" },
      { label: "Kích thước tấm", value: "3200×1600 / 2400×1600 mm + cắt theo yêu cầu" },
      { label: "Độ dày", value: "18 – 30 mm" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container, hỗ trợ trộn màu / kích thước" },
      { label: "Lưu ý bảo quản", value: "Bảo quản dựng đứng trên giá chữ A; tránh đè ép khi xếp chồng nằm và va đập vào góc" },
    ],
    whyChoose: [
      { icon: "🏛️", title: "Vẻ đẹp cẩm thạch", desc: "Vân cẩm thạch thanh lịch giữ được sự đều đặn và nhịp điệu liền mạch trên diện tích lát lớn." },
      { icon: "✂️", title: "Dễ gia công", desc: "Cắt ghép linh hoạt với hiệu suất cao, hao phí công trình thấp hơn nhiều so với khối đá tự nhiên." },
      { icon: "💰", title: "Giá trị vượt trội", desc: "Ở cùng một đẳng cấp thẩm mỹ, ngân sách và nguồn cung dễ kiểm soát hơn, và giá tốt hơn cẩm thạch tự nhiên." },
      { icon: "🎭", title: "Nhiều kết cấu bề mặt", desc: "Bề mặt đánh bóng / mài mờ / phun cát, từ gương sang trọng đến mờ lì trầm mặc, tùy lựa chọn." },
      { icon: "🧩", title: "Đều và ổn định", desc: "Vân đồng nhất và tỷ lệ lỗi thấp, không có sự chênh lệch màu sắc và vết nứt ẩn của đá tự nhiên." },
    ],
    projectShowcase: [
      "Tường điểm nhấn và ốp cột sảnh khách sạn",
      "Lát sàn phòng khách và phòng tiếp khách biệt thự",
      "Bề mặt tường-sàn phòng tắm liền khối và mặt bàn lavabo",
      "Mặt dựng thương mại bên ngoài và trang trí nội thất tinh tế",
    ],
    faq: [
      { q: "Làm sao để chọn giữa cẩm thạch nhân tạo và tự nhiên?", a: "Chọn nhân tạo nếu cần vân đều, ít khuyết tật cùng ngân sách và nguồn cung dễ kiểm soát; chọn tự nhiên nếu yêu thích vân độc bản và có ngân sách dư dả." },
      { q: "Có thể dùng cho sàn không?", a: "Có. Với độ phẳng nền và khe co giãn được kiểm soát tốt, đá phù hợp cho lát sàn phòng khách, sảnh và những nơi tương tự — bền bỉ và dễ bảo dưỡng." },
      { q: "Có những kiểu hoàn thiện bề mặt nào?", a: "Chúng tôi cung cấp các bề mặt đánh bóng, mài mờ, phun cát và nhiều kiểu khác, với kết cấu có thể tùy chỉnh theo nhu cầu công trình." },
      { q: "Có thể cắt theo kích thước không?", a: "Chúng tôi hỗ trợ gia công cắt theo yêu cầu và xử lý cạnh, phù hợp cho các công trình tường, sàn, mặt bàn và nhiều hạng mục khác." },
      { q: "Số lượng đặt tối thiểu và thời gian giao hàng là bao nhiêu?", a: "Tính theo container / số lượng, thời gian giao hàng thỏa thuận theo từng đơn — thường khoảng 15 ngày để tham khảo." },
    ],
  },
  onyx: {
    story:
      "Đá onyx nhân tạo Đức Thịnh được tổng hợp từ bột khoáng tuyển chọn và keo resin, tái hiện kết cấu nửa ẩn nửa hiện, xuyên sáng và vân mây mơ màng của đá onyx tự nhiên. Khi ánh sáng chiếu xuyên qua từ phía sau tấm đá, cả bức tường như bừng sáng, một làn ánh sáng ấm áp trôi chầm chậm qua từng đường vân — sang trọng mà vẫn tinh tế. Đá ổn định và bền hơn onyx tự nhiên: nơi các khối đá tự nhiên giòn, dễ nứt và khó kiểm soát vân, thì onyx nhân tạo mang lại độ dai tốt hơn cùng vân và màu sắc có thể lựa chọn, cải thiện đáng kể khả năng dự đoán trong gia công và ghép nối. Vân của mỗi tấm đá mang một nét riêng, nhưng vẫn nhất quán về cảm giác trong cùng một lô, mang đến cho vách ngăn chiếu sáng từ phía sau, mặt dựng quầy bar và mặt bàn trang trí một diện mạo thị giác cao cấp, đồng nhất. Đây là điểm nhấn ánh sáng tinh tế trong một không gian — vừa là vật liệu, vừa là bầu không khí.",
    heritage:
      "Onyx đã là biểu tượng của sự xa hoa và xuyên thấu từ thời cổ đại, nhưng các khối đá tự nhiên lại khan hiếm, dễ nứt và khó ứng dụng trên diện tích lớn. Đá onyx nhân tạo Đức Thịnh mang sự xuyên sáng mơ màng ấy vào thiết kế đương đại — vách ngăn chiếu sáng từ phía sau, quầy bar và các điểm nhấn cao cấp — với vân có thể kiểm soát và độ bền cao hơn.",
    technicalSpecs: [
      { label: "Vật liệu", value: "Bột khoáng tuyển chọn + keo resin (xuyên sáng giống onyx)" },
      { label: "Kích thước tấm", value: "Tấm khổ lớn, cắt theo yêu cầu" },
      { label: "Độ dày", value: "Khoảng 18 – 30 mm (tùy theo dòng sản phẩm)" },
      { label: "Bề mặt", value: "Chủ yếu đánh bóng, để tôn lên kết cấu xuyên sáng" },
      { label: "Đặc tính nổi bật", value: "Vân mây onyx, một số dòng có hiệu ứng xuyên sáng khi chiếu từ phía sau" },
      { label: "Ứng dụng", value: "Vách ngăn chiếu sáng từ phía sau, mặt dựng quầy bar, mặt bàn trang trí và tường điểm nhấn" },
    ],
    manufacturing: [
      "Đức Thịnh Stone — nhà cung cấp và gia công đá onyx nhân tạo thuộc tập đoàn Pengxiang, chuyên về các dòng trang trí xuyên sáng và điểm nhấn",
      "Bột khoáng tuyển chọn tổng hợp cùng keo resin và định hình, với hướng vân và lớp xuyên sáng được điều chỉnh để thể hiện kết cấu mờ ảo giống onyx tự nhiên",
      "Sau khi định hình, đánh bóng tinh để tối đa hóa khả năng xuyên sáng đồng đều, kiểm soát bọt khí và tạp chất bên trong nhằm đảm bảo diện mạo chiếu sáng từ phía sau trong trẻo",
      "Có sẵn tấm khổ lớn với gia công cắt theo yêu cầu, phù hợp cho các hình dạng tùy chỉnh của vách ngăn, quầy bar và nhiều hạng mục khác",
      "Nhà máy Nghệ An, Việt Nam và năng lực tại Phúc Kiến, Trung Quốc vận hành phối hợp, với vân, màu sắc và kích thước có thể tùy chỉnh theo từng công trình và thời gian giao hàng thỏa thuận theo từng đơn",
    ],
    careGuide: [
      { title: "Vệ sinh hằng ngày", desc: "Lau nhẹ bằng khăn mềm với nước ấm hoặc chất tẩy rửa trung tính, tránh các hạt mài mòn có thể làm trầy bề mặt đánh bóng, xuyên sáng." },
      { title: "Chăm sóc phòng ngừa", desc: "Khi chiếu sáng từ phía sau, kiểm soát nhiệt của đèn để tránh nhiệt độ cao cục bộ kéo dài ảnh hưởng đến keo resin và lớp xuyên sáng." },
      { title: "Xử lý vết bẩn", desc: "Xử lý các vết bẩn kịp thời bằng dung dịch tẩy rửa nhẹ và rửa sạch bằng nước, giữ bề mặt xuyên sáng trong trẻo và sáng bóng." },
      { title: "Điều cần tránh", desc: "Tránh cào xước bằng vật cứng và va đập mạnh; bảo vệ cạnh, góc và mặt tấm đá xuyên sáng trong quá trình vận chuyển và lắp đặt." },
    ],
    installation: [
      "Hoạch định vị trí đèn và sự phân chia tấm theo phương án chiếu sáng từ phía sau trước khi lắp đặt để đảm bảo xuyên sáng đồng đều, không có vùng tối",
      "Cắt bằng CNC và máy cưa cầu; sau khi khoan và tạo cạnh, đánh bóng tinh các cạnh để giữ các cạnh tấm đá xuyên sáng sạch sẽ",
      "Dùng dãy đèn LED khuếch tán đều cho các vùng chiếu sáng từ phía sau, kiểm soát khoảng cách giữa mặt sau tấm đá và đèn để làm dịu các điểm sáng",
      "Trám mối nối bằng keo chuyên dụng đồng màu, và kiểm chứng hiệu ứng thị giác của các mối nối dưới ánh sáng chiếu từ phía sau",
      "Sau khi lắp đặt, bật đèn và kiểm tra độ xuyên sáng đồng đều của từng tấm, rồi làm sạch bề mặt đánh bóng và thực hiện nghiệm thu lần cuối",
    ],
    certifications: [
      "ISO 9001 — hệ thống quản lý chất lượng",
      "Kiểm soát nguyên liệu không phóng xạ (tham chiếu tiêu chuẩn NSF / Class A theo từng lô)",
      "Kiểm định độ bền uốn, khả năng chống mài mòn, độ đồng đều xuyên sáng và nhiều chỉ tiêu khác",
      "Vật liệu thân thiện môi trường: keo resin hàm lượng VOC thấp đáp ứng yêu cầu trang trí xanh",
      "Kiểm soát chất lượng xuất khẩu: kiểm tra và đối màu từng tấm với bề mặt xuyên sáng và vân",
    ],
    packaging: [
      { label: "Đóng gói", value: "Giá thép chữ A + bảo vệ góc + màng co; đơn hàng xuất khẩu bổ sung thùng gỗ đóng đinh chắc chắn với lớp bảo vệ cạnh và góc tăng cường" },
      { label: "Kích thước tấm", value: "Tấm khổ lớn + cắt theo yêu cầu" },
      { label: "Độ dày", value: "Khoảng 18 – 30 mm (tùy theo dòng sản phẩm)" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container / số lượng, hỗ trợ vân và kích thước tùy chỉnh" },
      { label: "Lưu ý bảo quản", value: "Bảo quản dựng đứng trên giá chữ A; tránh đè ép khi xếp chồng nằm và làm trầy bề mặt xuyên sáng" },
    ],
    whyChoose: [
      { icon: "✨", title: "Xuyên sáng từ phía sau", desc: "Dưới ánh sáng chiếu từ phía sau, làn sáng trôi chảy và biến chuyển, tạo nên bầu không khí điểm nhấn thanh lịch, mơ màng." },
      { icon: "🎨", title: "Vân độc đáo", desc: "Vân mây onyx mang nét riêng, biến mỗi tấm đá thành một bức tranh độc bản." },
      { icon: "💪", title: "Bền hơn", desc: "Dai hơn onyx tự nhiên và ít bị nứt giòn hơn, cho gia công và ghép nối ổn định hơn." },
      { icon: "🔧", title: "Gia công linh hoạt", desc: "Hỗ trợ gia công cắt theo yêu cầu và tạo hình tùy chỉnh, dễ dàng thích ứng với thiết kế vách ngăn và quầy bar." },
      { icon: "🌈", title: "Vân và màu tùy chỉnh", desc: "Vân và tông màu có thể điều chỉnh theo từng công trình, giữ cả lô đồng nhất và kết quả dễ kiểm soát." },
    ],
    projectShowcase: [
      "Tường vách ngăn chiếu sáng từ phía sau cho sảnh khách sạn và câu lạc bộ",
      "Thiết kế xuyên sáng cho mặt dựng quầy bar, quầy lễ tân và đón tiếp",
      "Điểm nhấn trang trí cho phòng tiếp khách cao cấp và căn hộ mẫu",
      "Mặt bàn chiếu sáng từ phía sau và mặt dựng trưng bày cho nhà hàng / cửa hàng boutique",
    ],
    faq: [
      { q: "Có phải mọi tấm onyx nhân tạo đều xuyên sáng không?", a: "Một số dòng có hiệu ứng xuyên sáng khi chiếu từ phía sau; trước khi đặt hàng, vui lòng xác nhận đặc tính xuyên sáng và độ dày khuyến nghị của mẫu cụ thể." },
      { q: "Ưu điểm so với onyx tự nhiên là gì?", a: "Độ dai tốt hơn và ít nứt giòn hơn, vân và màu sắc có thể kiểm soát và tùy chỉnh, cùng hiệu suất cao — mang lại khả năng dự đoán cao hơn cho gia công và ứng dụng trên diện tích lớn." },
      { q: "Nên dùng loại đèn nào để chiếu sáng từ phía sau?", a: "Chúng tôi khuyến nghị dùng dãy đèn LED khuếch tán đều, với khoảng cách giữa mặt sau tấm đá và đèn được kiểm soát để làm dịu các điểm sáng và tránh vùng tối." },
      { q: "Có thể làm thành vách ngăn và thiết kế quầy bar không?", a: "Có. Chúng tôi hỗ trợ gia công cắt theo yêu cầu và tạo hình tùy chỉnh, phù hợp cho vách ngăn chiếu sáng từ phía sau, mặt dựng quầy bar, mặt bàn trang trí và nhiều thiết kế khác." },
      { q: "Số lượng đặt tối thiểu và thời gian giao hàng là bao nhiêu?", a: "Tính theo container / số lượng, có sẵn vân và kích thước tùy chỉnh và thời gian giao hàng thỏa thuận theo từng đơn." },
    ],
  },
};

/** Helper: get metadata by seriesOriginal (category). */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DTS_SERIES_META[seriesOriginal.trim()] || DTS_SERIES_META.quartz;
}
