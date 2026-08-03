/**
 * Pengxiang recycled stone series metadata — rich content for product detail pages.
 * Indexed by seriesOriginal: quartz (engineered quartz) / marble (engineered marble) / other (same as marble) / onyx (engineered onyx) / terrazzo (engineered terrazzo).
 * Source: px-stone.com — Fujian Pengxiang Industrial, Nan'an Shuitou, Fujian (China's stone capital).
 * Pengxiang is the parent group of Desheng Stone (the Vietnamese legal entity operating the Nghe An plant). Data drawn from Pengxiang product catalogs and standard industry process parameters.
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

export const PENGXIANG_SERIES_META: Record<string, SeriesMeta> = {
  quartz: {
    story:
      "Đá thạch anh nhân tạo Pengxiang là nghệ thuật đánh thức những tinh thể thạch anh cứng cáp ẩn sâu trong lòng đất. Khoảng chín mươi phần trăm bột thạch anh tự nhiên cùng nhựa resin độ tinh khiết cao được rung ép trong môi trường chân không và áp suất cao, kết hợp thành một tấm đá liền khối cứng như đá, đặc chắc và không thấm. Đá ra đời với khả năng chống xước, chống ố và kháng axit — cà phê, nước tương hay rượu vang chỉ là những vị khách thoáng qua trên bề mặt, lau sạch chỉ trong một đường tay mà không để lại dấu vết thời gian. Từ tông trắng ngà trang nhã đến đen tuyền sâu lắng, từ Calacatta vân xám đến dòng vân vàng rạng rỡ, mỗi tấm đá như một tấm toan được nhà thiết kế phối màu. Khi tấm thạch anh được cắt thành mặt bếp, nó mang theo hơi ấm của những bữa cơm thường nhật và nâng đỡ mọi khát vọng về một cuộc sống chất lượng của cả gia đình.",
    heritage:
      "Với bề mặt cứng, không thấm và gần như không cần bảo dưỡng, đá thạch anh đã giữ vững vị trí dẫn đầu trong nhóm vật liệu mặt bàn nhân tạo suốt nhiều năm và vẫn là lựa chọn hàng đầu cho những căn bếp cao cấp khắp châu Âu, châu Mỹ và châu Á. Bắt rễ tại Nam An Thủy Đầu — thủ phủ đá của Trung Quốc, Pengxiang đã làm chủ chuyên sâu dòng sản phẩm này — mang đến nguồn cung tấm đá ổn định cùng thư viện vân Calacatta liên tục được cập nhật, đưa chất lượng tầm nhập khẩu đến gần với mọi mái ấm thường nhật.",
    technicalSpecs: [
      { label: "Vật liệu", value: "Khoảng 90% bột thạch anh tự nhiên liên kết với nhựa resin độ tinh khiết cao" },
      { label: "Kích thước tấm", value: "3200×1600mm / 3000×1600mm / 3000×1400mm / 3000×1200mm, cắt theo kích thước yêu cầu" },
      { label: "Độ dày", value: "12 – 30mm (18mm / 20mm phổ biến nhất)" },
      { label: "Bề mặt hoàn thiện", value: "Đánh bóng / mờ / phun cát, tùy chỉnh theo yêu cầu" },
      { label: "Đặc tính", value: "Kháng axit, chống ố, chịu nhiệt và chống xước vượt trội; bề mặt không lỗ rỗng, không thấm" },
      { label: "Dải màu", value: "Trắng, xám, đen, be, cùng dòng Calacatta vân xám và vân vàng" },
    ],
    manufacturing: [
      "Thành lập năm 2006 tại Nam An Thủy Đầu, Phúc Kiến — thủ phủ đá của Trung Quốc — Fujian Pengxiang Industrial là nhà sản xuất đá nhân tạo và thạch anh hàng đầu trong nước",
      "Cốt liệu thạch anh được nghiền, sàng lọc và phối màu, sau đó pha trộn với resin cùng chất đóng rắn theo tỷ lệ chính xác trước khi rung ép chân không thành một khối liền mạch, bảo đảm thân tấm đặc chắc, không bọt khí",
      "Phôi sau ép được làm cứng và định hình trong lò nhiệt độ cao, rồi mài thô và mài tinh tuần tự đến độ bóng gương trên dây chuyền mài nhiều đầu, tạo ra những tấm phẳng có độ bóng đồng đều",
      "Toàn bộ dây chuyền thực hiện hiệu chỉnh độ dày bằng hồng ngoại, cắt chính xác và xén bốn cạnh, kiểm soát chặt dung sai độ dày và sai số đường chéo nhằm thuận tiện cho gia công hạ nguồn",
      "Hỗ trợ OEM / ODM và sản xuất theo đơn đặt hàng: màu sắc, vân, độ dày và bề mặt hoàn thiện đều có thể tùy chỉnh, công suất hằng tháng đạt tới vài nghìn mét vuông",
    ],
    careGuide: [
      { title: "Vệ sinh hằng ngày", desc: "Lau bằng khăn mềm thấm nước ấm hoặc dung dịch tẩy rửa trung tính để khôi phục độ bóng — không cần đánh sáp hay phủ chống thấm, ít bảo dưỡng và bền lâu." },
      { title: "Chăm sóc phòng ngừa", desc: "Dùng thớt khi thái chặt và lót đế cách nhiệt dưới nồi nóng để tránh tổn hại do ứng suất sinh ra từ thay đổi nhiệt độ cục bộ đột ngột." },
      { title: "Xử lý vết bẩn", desc: "Xử lý vết bẩn cứng đầu bằng chất tẩy nhẹ và miếng cọ không mài mòn, lau nhẹ nhàng, sau đó rửa lại ngay bằng nước." },
      { title: "Những điều cần tránh", desc: "Tránh để bề mặt tiếp xúc lâu với axit hoặc kiềm đậm đặc, chất oxy hóa mạnh và bột tẩy mài mòn nhằm bảo vệ độ bóng." },
    ],
    installation: [
      "Đo kích thước thực tế tại công trình trước khi gia công và vẽ bản bố trí để tối ưu hướng vân cùng vị trí khoét lỗ, giảm hao phí khi cắt",
      "Cắt phôi bằng máy cắt tia nước CNC hoặc máy cưa cầu, bo tròn góc tại các lỗ khoét bồn rửa và bếp nấu, vát cạnh bằng mài theo bản vẽ",
      "Bảo đảm tủ bếp hoặc bề mặt đỡ phẳng và chịu tải đều; bổ sung thanh đỡ hoặc tấm lót gia cố cho phần đua ra và nhịp dài",
      "Dán mạch bằng keo thạch anh đồng màu khớp với hướng vân, ép phẳng và loại bỏ keo thừa",
      "Sau khi lắp đặt, vệ sinh mặt bàn, mài và đánh bóng mạch nối, kiểm tra độ phẳng tổng thể và độ đồng nhất của mạch",
    ],
    certifications: [
      "Chứng nhận hệ thống quản lý chất lượng ISO 9001",
      "Kiểm nghiệm vật liệu không phóng xạ (tham chiếu vật liệu trang trí loại A)",
      "Kiểm nghiệm định kỳ độ hút nước, độ cứng Mohs, cường độ uốn và khả năng chống mài mòn",
      "Liên kết bằng resin thân thiện môi trường, hàm lượng VOC thấp, đáp ứng yêu cầu vật liệu xây dựng xanh",
      "Báo cáo kiểm nghiệm khả năng kháng axit/kiềm, chống ố và chịu nhiệt độ cao",
    ],
    packaging: [
      { label: "Đóng gói", value: "Giá thép chữ A + thanh gỗ kê + nẹp góc bảo vệ + màng co; thùng gỗ gia cố cho hàng xuất khẩu" },
      { label: "Kích thước tấm", value: "Tấm lớn như 3200×1600mm / 3000×1600mm, cắt theo kích thước yêu cầu" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container / mét vuông, hỗ trợ ghép tải nhiều màu và nhiều kích thước" },
      { label: "Thời gian giao hàng", value: "Màu tiêu chuẩn ưu tiên giao từ kho; màu tùy chỉnh thỏa thuận theo đơn (tham khảo 15–30 ngày)" },
      { label: "Mẫu", value: "Cung cấp mẫu nhỏ và bảng màu để xác nhận hoa văn và cảm giác bề mặt trước khi đặt hàng số lượng lớn" },
    ],
    whyChoose: [
      { icon: "💎", title: "Cứng & chống xước", desc: "Độ cứng Mohs vượt phần lớn đá tự nhiên — ma sát hằng ngày từ chìa khóa, dao, nĩa không để lại vết." },
      { icon: "🛡️", title: "Không lỗ rỗng & không thấm", desc: "Cấu trúc đặc chắc, không lỗ rỗng ngăn nước và dầu; dầu mỡ, rượu vang, vết bẩn lau sạch và không cho vi khuẩn trú ngụ." },
      { icon: "🔥", title: "Kháng axit & chịu nhiệt", desc: "Xử lý nhẹ nhàng axit trái cây, dung dịch tẩy rửa và nhiệt độ cao trong thời gian ngắn, rất hợp với những căn bếp bận rộn." },
      { icon: "🎨", title: "Hoa văn & màu sắc phong phú", desc: "Từ tông màu trơn đến Calacatta vân xám và vân vàng, đáp ứng gu thẩm mỹ từ tối giản đến sang trọng tinh tế." },
      { icon: "🧼", title: "Dễ chăm sóc", desc: "Không cần phủ chống thấm hay đánh sáp — chỉ một đường lau với chất tẩy trung tính là giữ được vẻ như mới suốt nhiều năm." },
    ],
    projectShowcase: [
      "Mặt bếp, mặt đảo bếp và toàn bộ bề mặt tủ bếp trong căn hộ và biệt thự",
      "Quầy lễ tân khách sạn, nhà hàng cùng quầy bar và quầy tiếp đón trong không gian thương mại",
      "Mặt bàn lavabo phòng tắm, vách ngăn buồng tắm, bệ cửa sổ và trang trí tường nội thất",
    ],
    faq: [
      { q: "Mặt bàn thạch anh có bị dao làm xước không?", a: "Thạch anh rất cứng, ma sát hằng ngày từ dao, nĩa, chìa khóa hiếm khi để lại vết — nhưng vẫn nên dùng thớt để bảo vệ cả bề mặt lẫn lưỡi dao." },
      { q: "Tôi có thể đặt nồi nóng trực tiếp lên không?", a: "Đá chịu được nhiệt độ cao trong thời gian ngắn, nhưng thay đổi nhiệt độ đột ngột có thể gây ứng suất, vì vậy nên dùng đế cách nhiệt — thói quen tốt mang lại sự an tâm." },
      { q: "Có cắt được theo kích thước bếp của tôi không?", a: "Có. Chúng tôi hỗ trợ gia công cắt theo kích thước với cắt, khoét lỗ và tạo cạnh để vừa với mọi bố trí tủ bếp." },
      { q: "So với đá cẩm thạch tự nhiên thì có ưu điểm gì?", a: "Thạch anh không lỗ rỗng và không thấm, chống ố và chống xước, màu sắc đều và ổn định — gần như không cần bảo dưỡng và phù hợp hơn cho mặt bếp sử dụng với cường độ cao." },
      { q: "Số lượng đặt tối thiểu và thời gian giao hàng tính thế nào?", a: "Đặt theo container hoặc mét vuông, hỗ trợ ghép tải nhiều màu; màu tiêu chuẩn giao nhanh từ kho, còn màu tùy chỉnh được sắp xếp theo đơn." },
    ],
  },
  marble: {
    story:
      "Đá cẩm thạch nhân tạo Pengxiang là lời giải cho những ai yêu cẩm thạch nhưng e ngại sự mong manh của nó — đá tự nhiên, bột cẩm thạch và resin được ép tổng hợp để giữ lại những đường vân tựa mây trời trong một tấm đá đồng nhất, ổn định. Khác với cẩm thạch tự nhiên vốn khó kiểm soát độ chênh màu và dễ nứt vân, mỗi mẻ đều cho hoa văn dự đoán được và tái lập được, nên ngay cả khi lắp đặt trên diện tích lớn vẫn liền mạch từ tường xuống sàn. Trắng pha lê hạt mịn ấm áp dịu dàng như tuyết mới, vân xám mang nét hiện đại điềm tĩnh và tiết chế, còn đen tuyền toát lên sự bề thế trầm ổn nâng tầm cả một mảng tường điểm nhấn. Giá thành phải chăng, dễ cắt và dễ gia công, vật liệu này đưa vẻ thanh lịch của cẩm thạch từ hàng xa xỉ bước vào những không gian thường nhật.",
    heritage:
      "Với đường vân đẹp, bề mặt đồng đều ít khuyết tật và hao phí thấp, đá cẩm thạch nhân tạo đã trở thành vật liệu chủ lực cho trang trí nội thất diện tích lớn. Dòng hạt mịn của Pengxiang kế thừa di sản gia công đá của Nam An Thủy Đầu, phục vụ lâu dài cho cải tạo nhà ở và công trình dự án nhờ đặc tính có thể đánh bóng lại và cắt theo kích thước.",
    technicalSpecs: [
      { label: "Vật liệu", value: "Đá tự nhiên + bột cẩm thạch + resin tổng hợp" },
      { label: "Kích thước tấm", value: "3200×1600mm / 2400×1600mm, cắt theo kích thước yêu cầu" },
      { label: "Độ dày", value: "12 – 30mm (18mm / 20mm phổ biến nhất)" },
      { label: "Bề mặt hoàn thiện", value: "Đánh bóng / mờ / phun cát, tùy chỉnh theo yêu cầu" },
      { label: "Đặc tính", value: "Vân đồng đều, có thể đánh bóng lại, chống ố, dễ vệ sinh, giá trị vượt trội" },
      { label: "Dải màu", value: "Trắng (trắng pha lê), xám, đen, be và nhiều màu khác" },
    ],
    manufacturing: [
      "Thành lập năm 2006 tại Nam An Thủy Đầu, Phúc Kiến, Fujian Pengxiang Industrial là nhà sản xuất đá cẩm thạch nhân tạo và thạch anh hàng đầu",
      "Đá tự nhiên và bột cẩm thạch được nghiền, phối liệu và trộn với resin, sau đó rung ép thành hình; đường vân được kiểm soát đồng đều nhờ công thức và kỹ thuật rải liệu để đồng nhất giữa các mẻ",
      "Sau khi đóng rắn, phôi được xử lý tuần tự trên dây chuyền mài và đánh bóng, với bề mặt có sẵn các kiểu đánh bóng, mờ, phun cát và nhiều dạng hoàn thiện khác",
      "Toàn bộ dây chuyền hỗ trợ hiệu chỉnh độ dày và kích thước với tỷ lệ thành phẩm cao, hỗ trợ gia công cắt theo kích thước và tạo cạnh ở hạ nguồn",
      "Hỗ trợ tùy chỉnh OEM / ODM về vân, màu, kích thước và bề mặt hoàn thiện, linh hoạt phục vụ cả kênh dự án lẫn phân phối",
    ],
    careGuide: [
      { title: "Vệ sinh hằng ngày", desc: "Lau bằng khăn mềm với nước ấm hoặc chất tẩy trung tính, tránh axit mạnh, kiềm mạnh và chất tẩy đậm đặc." },
      { title: "Chăm sóc phòng ngừa", desc: "Dùng thớt và đế cách nhiệt khi thái chặt hoặc đặt nồi nóng, tránh thay đổi nhiệt độ đột ngột và va đập mạnh." },
      { title: "Xử lý vết bẩn", desc: "Xử lý vết bẩn cứng đầu bằng chất tẩy nhẹ và miếng cọ không mài mòn, sau đó lau sạch ngay." },
      { title: "Tân trang & chăm sóc", desc: "Nếu bề mặt mất độ bóng sau nhiều năm sử dụng, đơn vị chuyên môn có thể mài và đánh bóng lại để khôi phục vẻ như mới." },
    ],
    installation: [
      "Đo đạc và vẽ bản bố trí trước khi gia công để tối ưu việc khớp vân và hướng ghép đối xứng",
      "Cắt bằng CNC và vát cạnh bằng mài, bo tròn góc tại các lỗ khoét",
      "Bảo đảm bề mặt đỡ phẳng và chịu tải đều, bổ sung tấm lót gia cố tại nhịp dài và phần đua ra",
      "Dán mạch bằng keo đá nhân tạo khớp với hướng vân, ép phẳng và loại bỏ keo thừa",
      "Sau khi lắp đặt, vệ sinh bề mặt tấm và đánh bóng mạch nối, kiểm tra độ phẳng và độ đồng nhất tổng thể",
    ],
    certifications: [
      "Chứng nhận hệ thống quản lý chất lượng ISO 9001",
      "Kiểm nghiệm vật liệu không phóng xạ (tham chiếu vật liệu trang trí loại A)",
      "Kiểm nghiệm định kỳ độ hút nước, cường độ uốn và khả năng chống mài mòn",
      "Liên kết bằng resin thân thiện môi trường, hàm lượng VOC thấp, đáp ứng yêu cầu vật liệu xây dựng xanh",
      "Quy trình tân trang bằng đánh bóng lại đã được kiểm chứng",
    ],
    packaging: [
      { label: "Đóng gói", value: "Giá thép chữ A + thanh gỗ kê + nẹp góc bảo vệ + màng co; thùng gỗ gia cố cho hàng xuất khẩu" },
      { label: "Kích thước tấm", value: "3200×1600mm / 2400×1600mm, cắt theo kích thước yêu cầu" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container / mét vuông, hỗ trợ ghép tải nhiều màu và nhiều kích thước" },
      { label: "Thời gian giao hàng", value: "Màu tiêu chuẩn ưu tiên giao từ kho; màu tùy chỉnh thỏa thuận theo đơn (tham khảo từ 15 ngày)" },
      { label: "Mẫu", value: "Cung cấp mẫu nhỏ và bảng màu; sản xuất số lượng lớn bắt đầu sau khi xác nhận hoa văn và đường vân" },
    ],
    whyChoose: [
      { icon: "🏛️", title: "Vẻ đẹp của cẩm thạch", desc: "Đường vân thanh lịch lắp đặt đồng đều trên diện tích lớn, mang lại cảm giác cao cấp cho toàn bộ tường và sàn." },
      { icon: "✂️", title: "Dễ gia công", desc: "Cắt và ghép linh hoạt với tỷ lệ thành phẩm cao, ít hao phí hơn nhiều so với khối đá tự nhiên." },
      { icon: "💰", title: "Giá trị vượt trội", desc: "Cùng một hiệu ứng thẩm mỹ, mức giá lợi thế hơn cẩm thạch tự nhiên, thân thiện hơn với dự án." },
      { icon: "🔁", title: "Có thể đánh bóng lại", desc: "Bề mặt mòn có thể mài và đánh bóng lại để làm mới, kéo dài tuổi thọ sử dụng." },
      { icon: "🎯", title: "Hoa văn ổn định", desc: "Vân và độ chênh màu được kiểm soát bằng công thức, bảo đảm đồng nhất giữa các mẻ cho việc lắp đặt an tâm." },
    ],
    projectShowcase: [
      "Ốp toàn bộ tường cho phòng khách, sảnh vào và tường trang trí TV",
      "Sàn sảnh khách sạn, sảnh thương mại và ốp mặt ngoài công trình",
      "Tường và sàn phòng tắm, vách ngăn buồng tắm và mặt bệ cửa sổ",
    ],
    faq: [
      { q: "Làm sao chọn giữa cẩm thạch nhân tạo và tự nhiên?", a: "Chọn nhân tạo nếu cần vân đồng đều, ít chênh màu, ít hao phí và chi phí kiểm soát được; chọn tự nhiên nếu bạn ưa đường vân độc bản và có ngân sách dư dả." },
      { q: "Bề mặt mờ đi sau thời gian dài có khôi phục được không?", a: "Có. Cẩm thạch nhân tạo có thể mài và đánh bóng lại để làm mới; đơn vị chuyên môn có thể khôi phục độ bóng." },
      { q: "Có cắt theo kích thước được không?", a: "Hỗ trợ gia công cắt theo kích thước và tạo cạnh theo bản vẽ, phù hợp với lắp đặt tường, sàn và nhiều dạng tạo hình tùy chỉnh." },
      { q: "Có phù hợp với môi trường phòng tắm ẩm ướt không?", a: "Rất phù hợp với tường, sàn, vách ngăn và bệ cửa sổ phòng tắm — chỉ cần lưu ý xử lý mạch nối và lau khô định kỳ." },
      { q: "Số lượng đặt tối thiểu và thời gian giao hàng là bao nhiêu?", a: "Đặt theo container hoặc mét vuông, hỗ trợ ghép tải nhiều màu; màu tiêu chuẩn giao nhanh từ kho, còn đơn tùy chỉnh được xác nhận theo từng đơn." },
    ],
  },
  onyx: {
    story:
      "Đá onyx nhân tạo Pengxiang biến chính ánh sáng thành vật liệu trang trí — được tổng hợp từ bột khoáng và resin, nó tái hiện vẻ mờ ảo, xuyên sáng, ấm áp và tỏa sáng từ bên trong của onyx tự nhiên. Khi một luồng sáng chiếu xuyên từ phía sau tấm đá, đường vân onyx chảy trôi như mây phát quang, và cả một vách ngăn trong khoảnh khắc biến từ bức tường lạnh lẽo, cứng cáp thành một tác phẩm nghệ thuật phát sáng. Bền hơn, sẵn nguồn cung hơn và kiểm soát hoa văn tốt hơn onyx tự nhiên, nó khiến vẻ đẹp hiếm có của onyx không còn là đặc quyền riêng của một số ít nhà sưu tầm. Trên quầy bar, tường chiếu sáng từ sau và mặt bàn trang trí, nó đẩy cảm giác phong cách của không gian lên đến cao trào.",
    heritage:
      "Onyx tự nhiên hiếm và mong manh; onyx nhân tạo đưa vẻ đẹp mờ ảo này vào những bối cảnh thiết kế rộng lớn hơn nhiều nhờ độ xuyên sáng kiểm soát được và đường vân đặc trưng, trở thành lựa chọn được ưa chuộng để tạo ánh sáng điểm nhấn trong không gian thương mại cao cấp và boutique.",
    technicalSpecs: [
      { label: "Vật liệu", value: "Bột khoáng + resin (hiệu ứng onyx xuyên sáng)" },
      { label: "Kích thước tấm", value: "Cắt theo kích thước yêu cầu, cung cấp tấm lớn tiêu chuẩn" },
      { label: "Độ dày", value: "12 – 30mm (tùy theo thiết kế chiếu sáng từ sau)" },
      { label: "Bề mặt hoàn thiện", value: "Đánh bóng / mờ" },
      { label: "Đặc tính", value: "Một số dòng chọn lọc cho hiệu ứng xuyên sáng khi chiếu từ sau với đường vân đặc trưng" },
      { label: "Ứng dụng", value: "Vách ngăn chiếu sáng từ sau, quầy bar, mặt bàn trang trí và mặt ngoài điểm nhấn" },
    ],
    manufacturing: [
      "Thành lập năm 2006 tại Nam An Thủy Đầu, Phúc Kiến, Fujian Pengxiang Industrial đã tích lũy chuyên môn về công thức và ép cho đá onyx nhân tạo",
      "Bột khoáng và resin được pha trộn theo công thức xuyên sáng và rung ép thành hình, kiểm soát mật độ tấm và độ đồng đều của khả năng xuyên sáng",
      "Sau khi đóng rắn, phôi được mài và đánh bóng, với độ dày và độ bóng bề mặt được kiểm soát cho ứng dụng chiếu sáng từ sau nhằm tôn lên chất onyx",
      "Hỗ trợ gia công cắt theo kích thước và ghép tấm, với việc khớp vân phù hợp với cấu trúc hộp đèn chiếu sáng từ sau",
      "Hỗ trợ tùy chỉnh OEM / ODM về vân và độ dày, phục vụ các dự án chiếu sáng điểm nhấn và trang trí nghệ thuật",
    ],
    careGuide: [
      { title: "Vệ sinh hằng ngày", desc: "Lau nhẹ bằng khăn mềm với nước ấm hoặc chất tẩy trung tính, tránh axit hoặc kiềm mạnh có thể ăn mòn bề mặt." },
      { title: "Chăm sóc phòng ngừa", desc: "Tránh va đập mạnh và tải nặng; với khu vực chiếu sáng từ sau, lưu ý tản nhiệt đèn và tránh xa nhiệt độ cao kéo dài." },
      { title: "Xử lý vết bẩn", desc: "Xử lý vết bẩn bằng chất tẩy nhẹ và khăn mềm, sau đó lau sạch ngay để giữ độ xuyên sáng trong trẻo." },
    ],
    installation: [
      "Đo đạc và vẽ bản bố trí trước khi gia công, khớp đường vân cho khu vực chiếu sáng từ sau",
      "Cắt bằng CNC và mài tinh các cạnh, bo tròn góc tại các lỗ khoét",
      "Ứng dụng chiếu sáng từ sau cần cấu trúc hộp đèn đồng đều để bảo đảm ánh sáng mềm, đều, không có điểm sáng lóa",
      "Dán mạch bằng keo chuyên dụng khớp với hướng vân, ép phẳng và loại bỏ keo thừa",
      "Sau khi lắp đặt, vệ sinh bề mặt tấm và kiểm tra độ đồng đều của khả năng xuyên sáng cùng độ đồng nhất của mạch",
    ],
    certifications: [
      "Chứng nhận hệ thống quản lý chất lượng ISO 9001",
      "Kiểm nghiệm vật liệu không phóng xạ (tham chiếu vật liệu trang trí loại A)",
      "Kiểm nghiệm độ đồng đều của khả năng xuyên sáng và cường độ uốn",
      "Liên kết bằng resin thân thiện môi trường, hàm lượng VOC thấp",
    ],
    packaging: [
      { label: "Đóng gói", value: "Giá thép chữ A + thanh gỗ kê + nẹp góc bảo vệ + màng co; thùng gỗ gia cố cho hàng xuất khẩu" },
      { label: "Kích thước tấm", value: "Tấm lớn tiêu chuẩn, cắt theo kích thước yêu cầu" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container / mét vuông, hỗ trợ tùy chỉnh" },
      { label: "Thời gian giao hàng", value: "Thỏa thuận và xác nhận theo đơn và yêu cầu tùy chỉnh" },
    ],
    whyChoose: [
      { icon: "✨", title: "Độ xuyên sáng ấn tượng", desc: "Dưới ánh sáng chiếu từ sau, các đường vân onyx chảy trôi như mây phát quang, tạo nên bầu không khí thanh lịch, mờ ảo." },
      { icon: "🎨", title: "Đường vân đặc trưng", desc: "Vân onyx khác nhau giữa từng tấm, mang lại cho mỗi dự án một chất nghệ thuật độc bản." },
      { icon: "🛡️", title: "Bền hơn", desc: "Chắc và ổn định hơn onyx tự nhiên, chống nứt và rất phù hợp với không gian công cộng." },
      { icon: "🔧", title: "Dễ gia công", desc: "Cắt theo kích thước và ghép thành tấm, kết hợp linh hoạt với hộp đèn và các dạng tạo hình tùy chỉnh." },
      { icon: "🌱", title: "Thân thiện môi trường & ổn định", desc: "Liên kết bằng resin hàm lượng VOC thấp với hoa văn và màu sắc theo mẻ kiểm soát được, giúp bàn giao dự án mượt mà hơn." },
    ],
    projectShowcase: [
      "Vách ngăn chiếu sáng từ sau và tường nghệ thuật điểm nhấn trong khách sạn và câu lạc bộ",
      "Mặt bàn phát sáng cho quầy bar, quầy lễ tân và showroom",
      "Trang trí mặt ngoài điểm nhấn trong cửa hàng bán lẻ boutique và nhà mẫu",
    ],
    faq: [
      { q: "Tất cả onyx nhân tạo đều chiếu sáng từ sau được không?", a: "Một số dòng chọn lọc cho hiệu ứng xuyên sáng phù hợp với chiếu sáng từ sau; vui lòng xác nhận đặc tính xuyên sáng và yêu cầu độ dày của mẫu trước khi đặt hàng." },
      { q: "Cần lưu ý gì với tường chiếu sáng từ sau?", a: "Cần bố trí cấu trúc hộp đèn đồng đều và cân nhắc tản nhiệt đèn; nên dùng nguồn sáng đều để tránh các điểm sáng lóa." },
      { q: "Có bền hơn onyx tự nhiên không?", a: "Onyx nhân tạo chắc và ổn định hơn, chống nứt, với đường vân và nguồn cung kiểm soát được tốt hơn, rất phù hợp với không gian công cộng và thương mại." },
      { q: "Có tùy chỉnh theo kích thước được không?", a: "Hỗ trợ gia công cắt theo kích thước, ghép tấm và tạo cạnh, kết hợp với thiết kế chiếu sáng từ sau và các dạng tạo hình tùy chỉnh." },
    ],
  },
  terrazzo: {
    story:
      "Đá terrazzo nhân tạo Pengxiang biến một vật liệu hoài cổ trở lại thành ngôi sao của xu hướng — các hạt cốt liệu đá và thủy tinh với kích thước khác nhau được rải đều trên nền sạch, hòa quyện thành một tấm đá lấm tấm những điểm sáng như sao trong sự ngẫu hứng đầy nghệ thuật. Nó mang đặc trưng thẩm mỹ cốt liệu của terrazzo trong khi phẳng hơn, chống mài mòn hơn và dễ lắp đặt hơn so với terrazzo đổ tại chỗ truyền thống. Từ những đốm xám trắng tối giản đến bảng phối màu tương phản sống động, nó có thể trải một cảm giác cao cấp tinh tế khắp mặt sàn hoặc ghép nên đúng cá tính mà nhà thiết kế mong muốn trên tường và mặt bàn. Chống mài mòn và chịu được lượng người qua lại đông, nó vẫn điềm tĩnh ngay cả trong không gian thương mại đông đúc.",
    heritage:
      "Với thẩm mỹ cốt liệu đặc trưng và độ bền vượt trội, terrazzo đã quay lại các xu hướng thiết kế hiện đại và xuất hiện rộng rãi trong phòng trưng bày nghệ thuật, quán cà phê và cửa hàng bán lẻ boutique. Pengxiang thay thế quy trình đổ tại chỗ rườm rà bằng sản phẩm terrazzo dạng tấm, khiến chất hoài cổ thời thượng này dễ hiện thực hóa hơn nhiều.",
    technicalSpecs: [
      { label: "Vật liệu", value: "Cốt liệu đá / thủy tinh + nền resin hoặc xi măng" },
      { label: "Kích thước tấm", value: "Tấm lớn tiêu chuẩn, cắt theo kích thước yêu cầu" },
      { label: "Độ dày", value: "12 – 30mm (tùy theo ứng dụng)" },
      { label: "Bề mặt hoàn thiện", value: "Đánh bóng / mờ" },
      { label: "Đặc tính", value: "Hiệu ứng cốt liệu nhiều màu, chống mài mòn và chịu người qua lại, phẳng và dễ lắp đặt" },
      { label: "Ứng dụng", value: "Sàn, tường, mặt bàn" },
    ],
    manufacturing: [
      "Thành lập năm 2006 tại Nam An Thủy Đầu, Phúc Kiến, Fujian Pengxiang Industrial sở hữu chuyên môn phối liệu và ép cho tấm terrazzo",
      "Cốt liệu đá và thủy tinh được trộn đều theo công thức màu, tổng hợp với nền resin hoặc xi măng, rồi rung ép thành hình để phân bố cốt liệu đồng đều",
      "Sau khi đóng rắn, phôi được mài và đánh bóng để lộ mặt cắt cốt liệu cho hiệu ứng terrazzo kinh điển, với bề mặt phẳng, mịn",
      "Toàn bộ dây chuyền hỗ trợ hiệu chỉnh độ dày và kích thước, hỗ trợ gia công cắt theo kích thước và tạo cạnh ở hạ nguồn",
      "Hỗ trợ tùy chỉnh OEM / ODM về kích thước cốt liệu, bảng phối màu và loại nền, phục vụ ứng dụng sàn, tường và mặt bàn",
    ],
    careGuide: [
      { title: "Vệ sinh hằng ngày", desc: "Lau bằng khăn mềm hoặc cây lau với chất tẩy trung tính, tránh axit hoặc kiềm mạnh có thể làm hỏng nền." },
      { title: "Chăm sóc phòng ngừa", desc: "Đặt thảm tại lối vào sàn để giảm bụi cát bị mang vào, và tránh kéo lê vật nặng có thể làm xước bề mặt." },
      { title: "Xử lý vết bẩn", desc: "Xử lý vết bẩn kịp thời bằng chất tẩy nhẹ và lau sạch để giữ mặt cắt cốt liệu trong trẻo, sáng đẹp." },
    ],
    installation: [
      "Đo đạc và vẽ bản bố trí trước khi gia công, hoạch định phân bố cốt liệu và hướng mạch nối",
      "Cắt bằng CNC và mài các cạnh, bo tròn góc tại các lỗ khoét",
      "Bảo đảm nền phẳng và chịu tải đều, thực hiện cán phẳng cho khu vực sàn",
      "Dán mạch bằng keo chuyên dụng, ép phẳng và loại bỏ keo thừa",
      "Sau khi lắp đặt, vệ sinh và đánh bóng mạch nối, kiểm tra độ phẳng và độ đồng nhất tổng thể",
    ],
    certifications: [
      "Chứng nhận hệ thống quản lý chất lượng ISO 9001",
      "Kiểm nghiệm vật liệu không phóng xạ (tham chiếu vật liệu trang trí loại A)",
      "Kiểm nghiệm khả năng chống mài mòn, cường độ uốn và độ hút nước",
      "Liên kết bằng resin thân thiện môi trường, hàm lượng VOC thấp",
    ],
    packaging: [
      { label: "Đóng gói", value: "Giá thép chữ A + thanh gỗ kê + nẹp góc bảo vệ + màng co; thùng gỗ gia cố cho hàng xuất khẩu" },
      { label: "Kích thước tấm", value: "Tấm lớn tiêu chuẩn, cắt theo kích thước yêu cầu" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container / mét vuông, hỗ trợ ghép tải nhiều bảng phối màu" },
      { label: "Thời gian giao hàng", value: "Thỏa thuận và xác nhận theo đơn và bảng phối màu tùy chỉnh" },
    ],
    whyChoose: [
      { icon: "🎯", title: "Phong cách terrazzo", desc: "Thẩm mỹ cốt liệu hiện đại hòa hợp với xu hướng thiết kế, mang cá tính đến cho cả sàn, tường lẫn mặt bàn." },
      { icon: "💪", title: "Chắc & bền", desc: "Chống mài mòn và chịu người qua lại, lý tưởng cho sàn lưu lượng cao tại trung tâm thương mại, showroom và hơn thế." },
      { icon: "🪄", title: "Phẳng & dễ lắp đặt", desc: "Dạng tấm thay thế quy trình đổ tại chỗ để lắp đặt nhanh hơn và bề mặt phẳng hơn." },
      { icon: "🎨", title: "Tự do lựa chọn màu", desc: "Kích thước cốt liệu và bảng phối màu tùy chỉnh được, đáp ứng gu thẩm mỹ từ tinh tế đến tương phản táo bạo." },
      { icon: "🌱", title: "Thân thiện môi trường & ổn định", desc: "Liên kết bằng resin hàm lượng VOC thấp với cốt liệu phân bố đều và chất lượng theo mẻ kiểm soát được." },
    ],
    projectShowcase: [
      "Lát sàn trong phòng trưng bày nghệ thuật, quán cà phê và cửa hàng concept",
      "Sàn trong không gian công cộng lưu lượng cao như trung tâm thương mại và showroom",
      "Khảm tường, quầy bar và trang trí mặt bàn tùy chỉnh",
    ],
    faq: [
      { q: "Terrazzo dạng tấm khác gì terrazzo đổ tại chỗ?", a: "Terrazzo dạng tấm được đúc sẵn tại nhà máy với bề mặt phẳng hơn và lắp đặt nhanh hơn, có thể cắt theo kích thước, giúp bạn tránh được sự phiền toái và bụi của việc mài tại công trường." },
      { q: "Có phù hợp với sàn lưu lượng cao không?", a: "Rất phù hợp. Terrazzo chống mài mòn và chịu người qua lại, là vật liệu lát sàn phổ biến cho không gian công cộng như trung tâm thương mại, showroom và quán cà phê." },
      { q: "Bảng phối màu cốt liệu có tùy chỉnh được không?", a: "Kích thước cốt liệu, bảng phối màu và loại nền đều có thể tùy chỉnh, từ những đốm tinh tế đến phong cách tương phản táo bạo." },
      { q: "Có dùng được trên tường và mặt bàn không?", a: "Có. Ngoài sàn, nó còn phù hợp với khảm tường, quầy bar và trang trí mặt bàn tùy chỉnh." },
    ],
  },
};
// other reuses marble metadata (aligning with potentially uncategorized entries in the product data).
PENGXIANG_SERIES_META.other = PENGXIANG_SERIES_META.marble;

export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return PENGXIANG_SERIES_META[seriesOriginal.trim()] || PENGXIANG_SERIES_META.marble;
}
