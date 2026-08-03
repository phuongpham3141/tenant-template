/**
 * Dulux Professional (AkzoNobel) series metadata — rich content for product detail pages.
 * Indexed by seriesOriginal (catKey): interior / exterior / real-stone / texture /
 * mineral / primer / metal / waterproof / other.
 * Sources: duluxpro.com.cn product technical data + AkzoNobel public brand information + industry-standard coating application parameters.
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

export const DULUX_PRO_SERIES_META: Record<string, SeriesMeta> = {
  interior: {
    story:
      "Sơn nội thất Dulux Professional là bức tường được tạo ra cho các dự án thi công và hoàn thiện cao cấp. Từ dòng đa năng 5-trong-1, dòng ít mùi chống nứt cho đến dòng kháng khuẩn ít mùi, dòng chống ẩm chống mốc hiệu năng cao và dòng silicat vô cơ, chỉ một tuyến sản phẩm đã bao trùm mọi nhu cầu tường nội thất ở mọi phân khúc ngân sách và ứng dụng. Công thức gốc nước ít mùi chào đón hơi thở đầu tiên của người mới về ở; độ che phủ vượt trội phủ kín bề mặt loang lổ chỉ trong một lớp; còn lớp màng mịn, chịu chà rửa đứng vững trước nét vẽ nguệch ngoạc của trẻ thơ và dấu vân tay theo năm tháng. Ở miền nam ẩm ướt, công nghệ vi lỗ thoáng ẩm để hơi ẩm trong tường được thở; trong bệnh viện và trường học, khả năng kháng khuẩn bền lâu khiến mỗi bức tường thêm an tâm. Đây không đơn thuần là một thùng sơn nhũ tương, mà là một giải pháp tường nội thất đã được kiểm chứng kỹ lưỡng.",
    heritage:
      "Sơn nội thất là dòng cốt lõi của Dulux Professional, được xây dựng trên nền tảng công nghệ sơn phủ toàn cầu của AkzoNobel cùng hơn một thế kỷ kinh nghiệm về màu sắc và công thức của tập đoàn dẫn đầu ngành sơn phủ đến từ Hà Lan này. Từ dòng đa năng và cao cấp đến dòng tiện nghi và khoáng vô cơ, mỗi sản phẩm đều được bảo chứng bởi cùng một tiêu chuẩn chất lượng đã được thị trường thi công liên tục kiểm nghiệm.",
    technicalSpecs: [
      { label: "Loại", value: "Sơn nhũ tương nội thất gốc nước / sơn phủ silicat vô cơ (tùy dòng)" },
      { label: "Độ bóng", value: "Chủ yếu mờ — êm dịu, không phản chiếu" },
      { label: "VOC", value: "VOC thấp, ít mùi và thân thiện môi trường, tuân thủ tiêu chuẩn GB 18582-2020 cho vật liệu trang trí và sửa chữa nội thất" },
      { label: "Độ che phủ", value: "Vượt trội — hầu hết các dòng đạt bề mặt đồng đều chỉ trong một lớp" },
      { label: "Bề mặt phù hợp", value: "Tường trát nội thất, tấm thạch cao, bề mặt bột bả gốc xi măng và trần nhà" },
      { label: "Định mức lý thuyết", value: "Khoảng 10-15 m² mỗi lít mỗi lớp (thay đổi theo độ nhám bề mặt và phương pháp thi công)" },
    ],
    manufacturing: [
      "Được xây dựng trên hệ thống R&D sơn phủ toàn cầu của AkzoNobel, với nhũ tương, bột màu và phụ gia được phối trộn và đóng gói theo công thức chính xác trên dây chuyền sản xuất sơn chuyên nghiệp",
      "Nhiều công thức ít mùi, kháng khuẩn, chống mốc và chống ẩm được phát triển chuyên biệt cho các môi trường khác nhau như nhà ở, khách sạn, trường học, bệnh viện",
      "Dòng nội thất vô cơ sử dụng nhựa silicat vô cơ làm chất tạo màng chính, với VOC thấp hơn nhiều so với sơn nhũ tương thông thường và đạt hiệu năng không cháy (cấp A1)",
      "Mỗi lô đều được kiểm nghiệm trước khi xuất xưởng về hàm lượng chất rắn theo thể tích, độ che phủ, khả năng chịu chà rửa và các chỉ tiêu khác, đảm bảo nguồn cung ổn định và đồng nhất cho các dự án khối lượng lớn",
      "Có dịch vụ pha màu tại nhà máy: trắng là màu tiêu chuẩn, kèm pha màu chính xác theo bảng màu Dulux Professional hoặc theo yêu cầu của khách hàng",
    ],
    careGuide: [
      { title: "Vệ sinh thường ngày", desc: "Khi màng sơn đã đóng rắn hoàn toàn, lau nhẹ bằng khăn mềm vắt ráo với nước sạch hoặc chất tẩy trung tính để loại bỏ dấu vân tay và vết bẩn nhẹ. Tránh axit mạnh, kiềm mạnh và miếng chà nhám." },
      { title: "Thông gió và đóng rắn", desc: "Giữ không khí lưu thông sau khi thi công để đẩy nhanh quá trình đóng rắn màng sơn và tan mùi. Với không gian vừa hoàn thiện, hãy thông gió một thời gian trước khi vào ở." },
      { title: "Chống ẩm và chống mốc", desc: "Dùng dòng chống ẩm chống mốc ở những khu vực dễ ẩm như bếp, phòng tắm và tầng hầm. Nếu xuất hiện thấm nước, hãy truy nguồn kịp thời, lau khô và giữ cho bề mặt tường khô ráo." },
      { title: "Dặm vá và sửa chữa", desc: "Sửa các vết sứt, va đập cục bộ bằng sơn cùng mã và cùng lô. Với dự án, hãy dự trữ một lượng nhỏ sơn và ghi lại mã pha màu để các lần dặm vá sau khớp với màu gốc." },
    ],
    installation: [
      "Chuẩn bị bề mặt: tường phải sạch, khô, phẳng và chắc; loại bỏ bụi rời, dầu mỡ và các lớp bong tróc, đồng thời xác nhận độ ẩm và độ kiềm nằm trong giới hạn cho phép trước khi thi công",
      "Lớp bột bả: làm phẳng và chà nhám bằng bột bả nội thất tương thích; chỉ chuyển sang sơn khi độ phẳng đạt yêu cầu. Gia cố trước các bề mặt bị rời hoặc phấn hóa bằng sơn lót trong suốt",
      "Lớp sơn lót: thi công một lớp đầy sơn lót chống kiềm để khóa độ kiềm, tăng độ bám dính và nâng cao độ phủ lớp hoàn thiện, sau đó để khô trước khi sơn phủ",
      "Thi công sơn phủ: khuấy đều, pha loãng với nước theo tỷ lệ khuyến nghị (thường không quá 20%) và thi công hai lớp bằng cọ, con lăn, súng phun thông thường hoặc súng phun không khí nén, để đủ thời gian giữa các lớp (khoảng 2-3 giờ)",
      "Đóng rắn màng sơn: tránh thi công vào những ngày độ ẩm cao và mưa, duy trì thông gió và để màng sơn đóng rắn tự nhiên đạt độ cứng và khả năng chịu chà rửa tối ưu",
    ],
    certifications: [
      "Tuân thủ tiêu chuẩn môi trường nội thất GB 18582-2020 'Giới hạn chất độc hại trong sơn phủ tường kiến trúc'",
      "Sản phẩm Nhãn Môi trường Trung Quốc (chứng nhận 十环) / VOC thấp — lựa chọn tự tin cho cải tạo nhà ở xanh",
      "Hệ thống chất lượng toàn cầu AkzoNobel + hệ thống quản lý chất lượng và môi trường ISO 9001 / ISO 14001",
      "Sản phẩm bột bả đạt cấp chất lượng tương ứng của JG/T 298-2010; màng sơn dòng vô cơ đạt tiêu chuẩn không cháy cấp A1",
      "Cung cấp phiếu dữ liệu kỹ thuật sản phẩm và cam kết bảo hành; có sẵn báo cáo thử nghiệm phục vụ cung ứng dự án",
    ],
    packaging: [
      { label: "Quy cách đóng gói", value: "Sơn nhũ tương chủ yếu trong thùng 20L / 15L; bột bả trong bao 25KG / 24KG" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container / pallet, có thể đặt hỗn hợp nhiều mã để phù hợp kênh thi công và phân phối" },
      { label: "Hạn sử dụng", value: "Khoảng 36 tháng khi chưa mở nắp (12 tháng với một số dòng); xem nhãn trên thùng" },
      { label: "Bảo quản", value: "Bảo quản kín ở nơi khô ráo, thoáng mát, tránh ánh nắng và sương giá; sau khi mở dùng ngay và đậy kín lại" },
      { label: "Mẫu", value: "Có sẵn bảng màu Dulux Professional và mẫu nhỏ để xác nhận màu và độ che phủ trước khi đặt hàng dự án" },
    ],
    whyChoose: [
      { icon: "🌬️", title: "Ít mùi và thân thiện môi trường", desc: "Công thức gốc nước VOC thấp với hương nhẹ, đạt tiêu chuẩn môi trường nội thất để an tâm hơn khi vào ở." },
      { icon: "🎨", title: "Độ che phủ cao", desc: "Độ che phủ vượt trội; hầu hết các dòng phủ kín bề mặt chỉ trong một lớp, tiết kiệm sơn và công với màu đồng đều." },
      { icon: "🧽", title: "Chịu chà rửa", desc: "Màng sơn mịn kháng bẩn và chịu chà rửa; dấu vân tay và vết bẩn dễ dàng lau sạch, giữ tường luôn như mới." },
      { icon: "🍃", title: "Kháng khuẩn và chống mốc", desc: "Dải sản phẩm đầy đủ với các tùy chọn kháng khuẩn, chống mốc và chống ẩm, cùng công thức chuyên biệt cho cả môi trường ẩm và môi trường yêu cầu vệ sinh cao." },
      { icon: "🏢", title: "Chất lượng cấp dự án", desc: "Công nghệ toàn cầu AkzoNobel, được thiết kế cho thi công dự án, với nguồn cung khối lượng lớn ổn định và đáng tin cậy." },
    ],
    projectShowcase: [
      "Hoàn thiện tường nội thất cho căn hộ, nhà ở và biệt thự hoàn thiện cao cấp",
      "Tường nội thất thi công diện rộng cho khách sạn, tòa văn phòng và công trình thương mại",
      "Công trình công cộng như trường học và bệnh viện với yêu cầu cao hơn về môi trường và kháng khuẩn/chống mốc",
      "Xử lý ẩm cho bếp, phòng tắm, tầng hầm và tường khuất nắng trong nhà ở vùng ẩm",
    ],
    faq: [
      { q: "Sơn nội thất có chứng nhận môi trường không?", a: "Có. Nhiều sản phẩm tuân thủ tiêu chuẩn môi trường nội thất GB 18582-2020 và mang Nhãn Môi trường Trung Quốc (十环) / VOC thấp; phiếu dữ liệu kỹ thuật có sẵn theo từng sản phẩm." },
      { q: "Nên chọn sản phẩm nào cho phòng ẩm?", a: "Chúng tôi khuyến nghị dòng chống ẩm chống mốc hiệu năng cao. Công nghệ vi lỗ thoáng ẩm giải phóng hơi ẩm trong tường, còn khả năng chống nước và chống thấm sánh ngang sơn ngoại thất, ức chế nấm mốc hiệu quả." },
      { q: "Tôi có cần thi công sơn lót trước không?", a: "Chúng tôi khuyến nghị bả bột trước và thi công một lớp đầy sơn lót chống kiềm để khóa độ kiềm, tăng độ bám dính và nâng cao độ phủ cùng độ bền của lớp hoàn thiện." },
      { q: "Có dịch vụ pha màu tại nhà máy không?", a: "Có. Trắng là màu tiêu chuẩn, kèm pha màu chính xác theo bảng màu Dulux Professional hoặc theo yêu cầu của khách hàng; nên ghi lại mã pha màu để dễ dặm vá về sau." },
      { q: "Số lượng đặt tối thiểu và thời gian giao hàng là bao nhiêu?", a: "Đặt theo container / pallet, có thể đặt hỗn hợp nhiều mã. Thời gian giao hàng được xác nhận theo từng đơn; các mã có sẵn hàng giao nhanh hơn." },
    ],
  },

  exterior: {
    story:
      "Sơn ngoại thất Dulux Professional là tuyến phòng thủ đầu tiên giữa mặt đứng công trình và các yếu tố thời tiết. Các dòng ngoại thất đa dụng chống chọi nắng, mưa và bụi tích tụ ngày qua ngày, trong khi dòng đàn hồi — phủ mờ đàn hồi cao cấp và phủ vân đàn hồi — dùng lớp màng mềm dẻo để bắc cầu thoải mái qua các vết nứt tường nhỏ ở cả nhiệt độ thường lẫn nhiệt độ thấp. Nó phải chịu được nhiều năm thiêu đốt của tia UV mà không dễ phấn hóa hay phai màu, và giữ khả năng tự làm sạch sau một cơn mưa ngay cả giữa khói bụi đô thị. Công nghệ làm cứng bằng UV tiên tiến giúp màng đàn hồi kháng bẩn và dễ rửa hơn, còn bột bả ngoại thất linh hoạt và sơn lót chống kiềm tương ứng tích hợp khả năng làm phẳng, chống nứt và chống thấm muối vào một hệ thống. Từ bờ biển ẩm ướt đến biên độ nhiệt cao của vùng nội địa, nó giữ vững phong thái của công trình trước thử thách thời gian.",
    heritage:
      "Dòng ngoại thất kế thừa nhiều năm kinh nghiệm sơn phủ ngoại thất chuyên sâu của Dulux Professional, đặt nền trên công nghệ chống chịu thời tiết toàn cầu của AkzoNobel. Từ bột bả và sơn lót đến lớp phủ đàn hồi, nó tạo thành một hệ thống sơn phủ ngoại thất hoàn chỉnh đã phục vụ lâu dài các dự án mặt đứng cho công trình nhà ở, thương mại và công cộng.",
    technicalSpecs: [
      { label: "Loại", value: "Sơn nhũ tương ngoại thất gốc nước (bao gồm dòng đàn hồi acrylic)" },
      { label: "Độ bóng", value: "Chủ yếu mờ; một số dòng có tùy chọn vân mờ" },
      { label: "VOC", value: "Công thức gốc nước VOC thấp, không chì, thủy ngân và các chất độc hại khác" },
      { label: "Độ che phủ", value: "Vượt trội; công thức chống chịu thời tiết đảm bảo độ tươi màu bền lâu" },
      { label: "Bề mặt phù hợp", value: "Bê tông xi măng, tường gạch và xây, tấm thạch cao và hệ thống cách nhiệt ngoài nhà EIFS" },
      { label: "Định mức lý thuyết", value: "Khoảng 10-12 m² mỗi lít mỗi lớp (thay đổi theo bề mặt và phương pháp thi công)" },
    ],
    manufacturing: [
      "Sử dụng nhựa chống chịu thời tiết và công nghệ chống bám bẩn của AkzoNobel, với độ ổn định công thức được tối ưu cho phơi nắng ngoài trời lâu dài",
      "Dòng đàn hồi sử dụng nhũ tương đàn hồi cao cấp, mang lại cho màng sơn độ giãn dài ở cả nhiệt độ thường và nhiệt độ thấp để bắc cầu các vết nứt sợi tóc trên tường",
      "Áp dụng công nghệ làm cứng bằng UV tiên tiến để cải thiện khả năng chống bám bẩn của màng đàn hồi, giúp dễ rửa và dễ bảo trì hơn",
      "Bột bả ngoại thất linh hoạt và sơn lót chống kiềm tương ứng được phát triển cùng trong một hệ thống, cùng nhau nâng cao độ bền từ làm phẳng, chống nứt đến chống thấm muối",
      "Mỗi lô được kiểm nghiệm về khả năng chống chịu thời tiết, chống bám bẩn, hàm lượng chất rắn và các chỉ tiêu khác trước khi xuất xưởng, đảm bảo nguồn cung ổn định cho các dự án ngoại thất diện rộng",
    ],
    careGuide: [
      { title: "Kiểm tra định kỳ", desc: "Kiểm tra mặt đứng hàng năm xem có nứt, bộp hay thấm không. Xử lý kịp thời bằng cách dặm vá cục bộ để vấn đề nhỏ không trở thành đại tu lớn." },
      { title: "Tự làm sạch nhờ mưa", desc: "Công thức chống bám bẩn để mưa cuốn đi bụi bám bề mặt. Ở khu vực bụi tích tụ nhiều hơn, xối nước sạch từ trên xuống; tránh áp lực cao hoặc chải cứng có thể làm xước màng sơn." },
      { title: "Sửa vết nứt", desc: "Khi tường xuất hiện vết nứt mới, trước tiên tìm hiểu nguyên nhân kết cấu, sau đó sửa bằng sản phẩm đàn hồi tương ứng để khôi phục độ đàn hồi của màng sơn." },
      { title: "Chăm sóc màu", desc: "Phơi nắng lâu dài trên các mặt hướng nắng tất yếu gây thay đổi màu nhẹ. Khi sơn lại, hãy thi công trên toàn bộ bề mặt để giữ màu đồng đều và nhất quán." },
    ],
    installation: [
      "Chuẩn bị bề mặt: tường ngoại thất phải sạch, khô và chắc; loại bỏ phần bong tróc, bộp và dầu mỡ, đồng thời xác nhận độ kiềm và độ ẩm nằm trong giới hạn cho phép trước khi thi công",
      "Làm phẳng bằng bột bả: làm phẳng và sửa chữa bằng bột bả ngoại thất linh hoạt (ví dụ loại P / loại R) để giảm hiệu quả các vết nứt sợi tóc và tăng độ bám dính chống nước",
      "Sơn lót: thi công một lớp đầy sơn lót chống kiềm để khóa độ kiềm, ngăn thấm muối và tăng độ bám dính của lớp phủ",
      "Lớp lót giữa đàn hồi (khi cần): với hệ thống đàn hồi, thi công thêm một lớp lót giữa đàn hồi hoặc dùng con lăn tạo vân để tạo họa tiết nổi ba chiều",
      "Lớp phủ hoàn thiện: tuân theo trình tự lót-lớp giữa-phủ và thi công hai lớp phủ bằng cọ, con lăn hoặc súng phun không khí nén, để đủ khoảng cách thời gian giữa các lớp",
    ],
    certifications: [
      "Tuân thủ yêu cầu giới hạn chất độc hại của các tiêu chuẩn quốc gia liên quan (GB) cho sơn phủ tường ngoại thất kiến trúc",
      "Nhãn Môi trường Trung Quốc (十环) / VOC thấp, không chì, thủy ngân và các chất độc hại khác",
      "Hệ thống chất lượng toàn cầu AkzoNobel + hệ thống quản lý chất lượng và môi trường ISO 9001 / ISO 14001",
      "Bột bả ngoại thất đạt cấp chất lượng tương ứng của JG/T 24-2018 và tương tự; cung cấp dữ liệu kỹ thuật liên quan đến chống chịu thời tiết",
      "Cung cấp cam kết bảo hành dự án, kèm báo cáo thử nghiệm sản phẩm để hỗ trợ nghiệm thu",
    ],
    packaging: [
      { label: "Quy cách đóng gói", value: "Lớp phủ chủ yếu trong thùng 20L / 15L; bột bả ngoại thất trong bao 25KG" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container / pallet, có thể đặt hỗn hợp nhiều mã để phù hợp các dự án ngoại thất diện rộng" },
      { label: "Hạn sử dụng", value: "Lớp phủ khoảng 36 tháng khi chưa mở nắp; xem nhãn trên thùng" },
      { label: "Bảo quản", value: "Bảo quản kín ở nơi khô ráo, thoáng mát, tránh ánh nắng và sương giá; dùng ngay sau khi mở" },
      { label: "Mẫu", value: "Có sẵn bảng màu và tấm mẫu; thi công thử một diện tích nhỏ có thể xác nhận hiệu quả trước khi đặt hàng dự án" },
    ],
    whyChoose: [
      { icon: "☀️", title: "Chống chịu thời tiết bền lâu", desc: "Chống nắng mưa mà không dễ phấn hóa hay phai màu, mang lại sự bảo vệ và trang trí lâu dài cho mặt đứng." },
      { icon: "🧱", title: "Độ đàn hồi bắc cầu vết nứt", desc: "Dòng đàn hồi giữ độ giãn dài ở cả nhiệt độ thường và nhiệt độ thấp, bắc cầu hiệu quả qua các vết nứt tường nhỏ." },
      { icon: "💧", title: "Chống bám bẩn tự làm sạch", desc: "Được tăng cường bởi công nghệ làm cứng bằng UV — kháng bẩn, dễ rửa và được giữ sạch nhờ mưa tự làm sạch." },
      { icon: "🛡️", title: "Hệ thống hoàn chỉnh", desc: "Bột bả, sơn lót, lớp giữa và lớp phủ phối hợp trong một hệ thống để chống kiềm và chống thấm muối đáng tin cậy hơn." },
      { icon: "🎨", title: "Vân phong phú", desc: "Các dòng trang trí như vân và họa tiết nổi tạo hiệu ứng ba chiều, mang lại cho mặt đứng sức biểu cảm lớn hơn." },
    ],
    projectShowcase: [
      "Hoàn thiện mặt đứng cho khu dân cư, căn hộ và biệt thự",
      "Công trình tường ngoại thất cho tổ hợp thương mại, tòa văn phòng và khách sạn",
      "Hoàn thiện ngoại thất cho công trình tiết kiệm năng lượng sử dụng hệ thống cách nhiệt ngoài nhà EIFS",
      "Cải tạo mặt đứng và sửa chữa vết nứt cho công trình cũ",
    ],
    faq: [
      { q: "Sơn ngoại thất có bắc cầu được vết nứt không?", a: "Dòng đàn hồi giữ độ đàn hồi ở cả nhiệt độ thường và nhiệt độ thấp và có thể bắc cầu hiệu quả qua các vết nứt sợi tóc trên tường; vết nứt kết cấu cần xử lý chuyên biệt trước." },
      { q: "Có phù hợp cho hệ thống cách nhiệt ngoài nhà không?", a: "Có. Nhiều loại bột bả, sơn lót và lớp phủ ngoại thất có thể dùng trên hệ thống cách nhiệt ngoài nhà EIFS; chúng tôi khuyến nghị thi công toàn bộ hệ thống tương ứng." },
      { q: "Sơn ngoại thất có phai màu nhanh không?", a: "Sản phẩm dùng công thức chống chịu thời tiết và không dễ phấn hóa hay phai màu trong điều kiện sử dụng thông thường; các mặt hướng nắng có thể đổi màu nhẹ theo thời gian, nên khuyến nghị thi công toàn bộ bề mặt khi sơn lại." },
      { q: "Làm sao giữ tường ngoại thất sạch?", a: "Công thức chống bám bẩn tự làm sạch nhờ mưa; với bụi nhiều hơn, chỉ cần xối nước sạch từ trên xuống, tránh áp lực cao hoặc chải cứng có thể làm xước màng sơn." },
      { q: "Số lượng đặt tối thiểu và thời gian giao hàng là bao nhiêu?", a: "Đặt theo container / pallet, có thể đặt hỗn hợp nhiều mã; thời gian giao hàng được xác nhận theo từng đơn." },
    ],
  },

  primer: {
    story:
      "Sơn lót Dulux Professional là nền móng vô hình nhưng quan trọng bậc nhất của toàn bộ hệ thống sơn phủ. Sơn lót chà nhám, sơn lót trong suốt, sơn lót nội thất chống kiềm hiệu năng cao, sơn lót chống kiềm đục, sơn lót chống kiềm hệ vô cơ, sơn lót khóa kín — mỗi loại đều thuần hóa các điểm yếu ẩn giấu của bề mặt trước khi lớp phủ lên sân khấu. Nó thấm vào tường để khóa các chất kiềm tự do, ngăn thấm muối và đọng muối; nó gia cố các bề mặt cũ rời rạc, phấn hóa để mỗi điểm bong tróc trở nên rắn chắc lại; và nó dựng một cây cầu vững chắc giữa bột bả và lớp phủ, nâng cao đồng thời độ bám dính và tuổi thọ lớp phủ. Khi sơn lót được làm tốt, lớp phủ tiết kiệm hơn, đồng đều hơn và bền lâu hơn. Chỉ một lớp sơn lót đã quyết định liệu một bức tường có thể đứng vững qua thử thách của một thập kỷ hay không.",
    heritage:
      "Sơn lót là mắt xích nền tảng trong hệ thống sơn phủ Dulux Professional, bảo vệ độ bền và thẩm mỹ. Xây dựng trên công nghệ tương hỗ của AkzoNobel, các loại sơn lót chuyên dụng được phát triển cho các hệ thống lớp phủ khác nhau — nội thất, ngoại thất, khoáng vô cơ, hiệu ứng đá và hơn thế — tạo thành một giải pháp sơn phủ hoàn chỉnh, đầu cuối tới đầu cuối.",
    technicalSpecs: [
      { label: "Loại", value: "Sơn lót chống kiềm khóa kín nội thất / ngoại thất, sơn lót trong suốt, sơn lót chà nhám (tùy mã)" },
      { label: "Độ bóng", value: "Mờ (loại trong suốt gần như không màu sau khi tạo màng)" },
      { label: "VOC", value: "Công thức gốc nước VOC thấp, tuân thủ tiêu chuẩn môi trường tương ứng (ví dụ GB 18582-2020)" },
      { label: "Độ che phủ", value: "Loại chống kiềm đục có độ che phủ nhất định; loại trong suốt tập trung chủ yếu vào khả năng thẩm thấu và khóa kín" },
      { label: "Bề mặt phù hợp", value: "Tường xây, bê tông, tấm xi măng sợi, tấm thạch cao, bề mặt bột bả và các bề mặt mới hoặc rời rạc khác" },
      { label: "Định mức lý thuyết", value: "Khoảng 9-17 m² mỗi lít mỗi lớp (loại trong suốt cho độ phủ cao hơn)" },
    ],
    manufacturing: [
      "Sử dụng nhũ tương đồng trùng hợp acrylic làm chất kết dính chính, kết hợp với bột màu không chì và phụ gia chức năng, với công thức khóa kín chống kiềm được điều chỉnh riêng cho từng hệ thống lớp phủ",
      "Sơn lót trong suốt được thiết kế chuyên cho bề mặt phấn hóa nhẹ; với khả năng thẩm thấu mạnh, nó ngấm vào các lớp rời rạc và liên kết lại các hạt rời thành một bề mặt ổn định",
      "Sơn lót hệ vô cơ được phát triển cho hệ thống sơn phủ khoáng vô cơ, tương thích với lớp phủ silicat và cải thiện tình trạng phấn hóa, rời rạc của bề mặt",
      "Sơn lót chà nhám cân bằng giữa khóa kín chống kiềm và tăng cường độ bám dính, đặc biệt phù hợp khi dùng với các lớp hoàn thiện dạng bột nhão dày như sơn vân và sơn hiệu ứng đá",
      "Mỗi lô được kiểm nghiệm về hàm lượng chất rắn theo thể tích, khả năng chống kiềm và độ bám dính trước khi xuất xưởng, đảm bảo tương thích hệ thống và hiệu năng bền lâu với lớp phủ phía trên",
    ],
    careGuide: [
      { title: "Khô hoàn toàn", desc: "Sau khi thi công sơn lót, tuân thủ khoảng thời gian sơn lại quy định (thường 1-3 giờ, tùy sản phẩm và nhiệt độ/độ ẩm) trước khi sơn phủ để tránh bong tróc." },
      { title: "Đậy kín sau khi dùng", desc: "Sau khi mở, dùng ngay và đậy kín nắp để ngăn đóng váng, ngấm ẩm và nhiễm bẩn có thể ảnh hưởng đến quá trình tạo màng." },
      { title: "Vệ sinh dụng cụ", desc: "Sau khi thi công sơn lót gốc nước, rửa ngay cọ, con lăn và súng phun bằng nước sạch để tránh cặn cứng lại khó loại bỏ." },
      { title: "Tương thích bề mặt", desc: "Chọn đúng mã cho các vấn đề bề mặt khác nhau như phấn hóa, thấm muối và ẩm, để đảm bảo khóa kín và bám dính hiệu quả." },
    ],
    installation: [
      "Kiểm tra bề mặt: xác nhận tường sạch, khô và chắc; loại bỏ bụi rời, dầu mỡ và phần bong tróc; gia cố trước các bề mặt phấn hóa nặng bằng sơn lót trong suốt",
      "Khuấy và pha loãng: khuấy đều trước khi dùng và pha loãng với lượng nước thích hợp theo hướng dẫn sản phẩm, không vượt quá tỷ lệ khuyến nghị để không làm giảm khả năng khóa kín",
      "Thi công đều: thi công một lớp đầy bằng cọ, con lăn, súng phun thông thường hoặc súng phun không khí nén, đảm bảo không bỏ sót, không đọng và phủ kín hoàn toàn",
      "Khóa kiềm: tập trung khóa kín các khu vực kiềm mạnh hoặc dễ thấm muối, thi công thêm lớp cục bộ ở những nơi cần để đảm bảo khóa kiềm triệt để",
      "Chuyển tiếp sơn lại: khi sơn lót đạt khoảng thời gian sơn lại, thi công lớp phủ tương ứng để đảm bảo độ bám dính hệ thống và độ bền tổng thể",
    ],
    certifications: [
      "Tuân thủ các tiêu chuẩn quốc gia tương ứng về giới hạn chất độc hại trong sơn phủ kiến trúc, như GB 18582-2020",
      "Nhãn Môi trường Trung Quốc (十环) / công thức gốc nước thân thiện môi trường VOC thấp",
      "Hệ thống chất lượng toàn cầu AkzoNobel + hệ thống quản lý chất lượng và môi trường ISO 9001 / ISO 14001",
      "Cung cấp dữ liệu kỹ thuật về chống kiềm và bám dính tương ứng theo từng hệ thống lớp phủ",
      "Cung cấp phiếu dữ liệu kỹ thuật sản phẩm và cam kết bảo hành; có sẵn báo cáo thử nghiệm phục vụ cung ứng dự án",
    ],
    packaging: [
      { label: "Quy cách đóng gói", value: "Chủ yếu thùng 20L / 25L (mã chà nhám, trong suốt và chống kiềm có quy cách hơi khác nhau)" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container / pallet; có thể đặt hỗn hợp cùng lớp phủ tương ứng" },
      { label: "Hạn sử dụng", value: "Thường khoảng 12-36 tháng khi chưa mở nắp; xem nhãn trên thùng" },
      { label: "Bảo quản", value: "Bảo quản kín ở nơi khô ráo, thoáng mát, tránh ánh nắng và sương giá, để ngăn đóng váng và ngấm ẩm" },
      { label: "Mẫu", value: "Có sẵn mẫu nhỏ để thi công thử với lớp phủ tương ứng nhằm xác nhận khả năng khóa kín và bám dính" },
    ],
    whyChoose: [
      { icon: "🛡️", title: "Chống kiềm hiệu năng cao", desc: "Khóa kín sâu các chất kiềm tự do trong tường, ngăn ngừa hiệu quả tình trạng thấm muối và đọng muối." },
      { icon: "🧷", title: "Tăng cường bám dính", desc: "Dựng một cây cầu vững chắc giữa bề mặt và lớp phủ, nâng cao đáng kể độ bám dính và tuổi thọ lớp phủ." },
      { icon: "🪵", title: "Gia cố bề mặt", desc: "Sơn lót trong suốt thẩm thấu và liên kết lại các lớp rời rạc, phấn hóa, khôi phục độ rắn chắc cho bề mặt cũ, mủn." },
      { icon: "🧩", title: "Tương thích hệ thống", desc: "Các loại sơn lót chuyên dụng được phát triển cho hệ thống lớp phủ nội thất, ngoại thất, vô cơ, hiệu ứng đá và khác, phối hợp nhịp nhàng." },
      { icon: "🍃", title: "Gốc nước thân thiện môi trường", desc: "Công thức gốc nước VOC thấp với hương nhẹ để thi công xanh, an tâm hơn." },
    ],
    projectShowcase: [
      "Khóa kín nền cho tường nội ngoại thất của nhà ở và căn hộ mới",
      "Gia cố bề mặt rời rạc, phấn hóa và thấm muối khi cải tạo tường cũ",
      "Lớp nền chà nhám tương ứng cho hệ thống lớp phủ hiệu ứng đá / vân",
      "Lớp nền chống kiềm tương ứng cho hệ thống lớp phủ khoáng vô cơ",
    ],
    faq: [
      { q: "Tại sao sơn lót là không thể thiếu?", a: "Sơn lót khóa kín độ kiềm, gia cố bề mặt và tăng độ bám dính cùng độ phủ của lớp phủ. Đây là nền tảng then chốt cho độ bền và thẩm mỹ của hệ thống sơn phủ và không thể bỏ qua." },
      { q: "Nếu tường cũ phấn hóa nghiêm trọng thì sao?", a: "Chúng tôi khuyến nghị trước tiên thẩm thấu và gia cố bằng sơn lót trong suốt để liên kết lại lớp rời rạc, phấn hóa thành một bề mặt ổn định trước khi bả bột và thi công lớp phủ." },
      { q: "Có thể dùng sơn lót trực tiếp làm lớp phủ không?", a: "Không khuyến nghị. Sơn lót tập trung vào khóa kín và bám dính; độ che phủ và khả năng chống chịu thời tiết không sánh được với lớp phủ, nên cần dùng cùng lớp phủ tương ứng trong hệ thống." },
      { q: "Cần bao nhiêu lớp sơn lót?", a: "Thường một lớp đầy là đủ; các khu vực thấm muối hoặc rời rạc nghiêm trọng có thể cần thêm lớp cục bộ. Luôn chờ hết khoảng thời gian sơn lại trước khi sơn phủ." },
      { q: "Số lượng đặt tối thiểu và thời gian giao hàng là bao nhiêu?", a: "Đặt theo container / pallet, có thể đặt hỗn hợp cùng lớp phủ tương ứng; thời gian giao hàng được xác nhận theo từng đơn." },
    ],
  },

  "real-stone": {
    story:
      "Sơn hiệu ứng đá Dulux Professional mang cả một mỏ đá tự nhiên lên mặt đứng công trình. Sơn hiệu ứng đá tự nhiên cao cấp, sơn hiệu ứng đá cao cấp và sơn hiệu ứng đá cấp dự án sử dụng nhũ tương acrylic gốc nước cao cấp để chuyên chở cát màu tự nhiên và mảnh đá, tái hiện vân và màu sống động của đá granite và đá tự nhiên qua một quy trình đặc biệt. Từ xa, đó là sự vững chãi và thanh lịch của mảng đá ốp; lại gần, đó là vân thật của từng lớp cát màu chồng lớp — nhưng nó nhẹ hơn, kinh tế hơn và dễ thi công, dễ sửa chữa hơn đá thật. Nó chống chịu thời tiết, thoáng khí và chống nứt, đứng vững trước gió nắng ngoài trời; với độ chân thực cao và dải vân, màu phong phú, nó mang đến cho mặt đứng cao cấp sự hiện diện của đá với chi phí hợp lý. Một bức tường, được phun lên kết cấu của núi đá.",
    heritage:
      "Dòng hiệu ứng đá trình hiện hiệu ứng đá tự nhiên thế hệ mới với công nghệ sơn phủ gốc nước của AkzoNobel, đạt cấp chất lượng ngoại thất JG/T 24-2018. Được ứng dụng lâu dài cho mặt đứng của công trình nhà ở, thương mại và công cộng cao cấp, nó mang vẻ đẹp của đá tự nhiên đến với nhiều dự án hơn với chi phí hợp lý hơn.",
    technicalSpecs: [
      { label: "Loại", value: "Sơn hiệu ứng đá gốc nước (polymer acrylic + cát màu tự nhiên / mảnh đá)" },
      { label: "Độ bóng", value: "Có sẵn lớp phủ hoàn thiện bóng và mờ" },
      { label: "VOC", value: "Công thức gốc nước thân thiện môi trường, tuân thủ yêu cầu môi trường tương ứng cho sơn phủ ngoại thất" },
      { label: "Độ che phủ", value: "Lớp hoàn thiện dạng bột nhão dày; vân đá hình thành chỉ trong một lần thi công với khả năng che phủ mạnh" },
      { label: "Bề mặt phù hợp", value: "Bê tông xi măng, tường gạch và xây, tấm thạch cao và hệ thống cách nhiệt ngoài nhà EIFS" },
      { label: "Định mức lý thuyết", value: "Trung bình khoảng 3.0-5.5 kg/m² (thay đổi theo hiệu ứng đá và bề mặt)" },
    ],
    manufacturing: [
      "Dựa trên nhũ tương acrylic gốc nước cao cấp, pha hợp với cát màu tự nhiên, mảnh đá và phụ gia chức năng, với vân đá sống động được phối trộn qua một quy trình đặc biệt",
      "Cát màu được phân cấp, sàng lọc và phối màu để tái hiện vân và màu của nhiều loại đá tự nhiên như granite, mè đen và be, với độ chân thực cao",
      "Công thức cân bằng khả năng chống chịu thời tiết, thoáng khí và chống nứt, giữ màng dạng bột nhão dày ổn định về màu và bám dính dưới phơi nắng ngoài trời lâu dài",
      "Đạt cấp chất lượng ngoại thất JG/T 24-2018, với kiểm nghiệm theo từng lô được kiểm soát theo các chỉ tiêu như khoảng 75% chất rắn theo khối lượng",
      "Có pha màu theo bảng màu tiêu chuẩn hoặc theo yêu cầu của khách hàng, với sơn lót và lớp phủ trong suốt tương ứng tạo thành một hệ thống hiệu ứng đá hoàn chỉnh",
    ],
    careGuide: [
      { title: "Bảo vệ bằng lớp phủ trong suốt", desc: "Thi công một lớp phủ trong suốt tương ứng sau khi thi công sẽ tăng khả năng chống chịu thời tiết, chống bám bẩn và chống ố trắng, giữ vân và màu đá bền lâu hơn." },
      { title: "Vệ sinh thường ngày", desc: "Bụi bề mặt tự làm sạch nhờ mưa, hoặc xối nước sạch ở áp lực thấp từ trên xuống; tránh tia nước áp lực cao và bàn chải cứng làm hỏng lớp cát màu." },
      { title: "Sửa chữa cục bộ", desc: "Sửa các khu vực sứt hoặc rụng cát bằng sản phẩm cùng mã và cùng lô theo kỹ thuật vân gốc, và làm mờ chuyển tiếp lớp phủ để giảm thiểu khác biệt về màu và kết cấu." },
      { title: "Kiểm tra thấm", desc: "Định kỳ kiểm tra các mạch nối và mép xem có nứt và thấm không, và sửa chữa, khóa kín kịp thời để bảo vệ lớp cát màu và bức tường." },
    ],
    installation: [
      "Chuẩn bị bề mặt: tường sạch, khô và chắc; làm phẳng và sửa chữa bằng bột bả ngoại thất linh hoạt, với việc xử lý vết nứt được thực hiện đúng cách",
      "Sơn lót khóa kín: thi công một lớp đầy sơn lót chống kiềm khóa kín tương ứng (như sơn lót chà nhám) để khóa độ kiềm, tăng độ bám dính và chống thấm muối",
      "Bố trí và chia ô: bật mực bố trí và dán băng che theo thiết kế; nơi cần, dùng sơn kẻ chỉ để đánh dấu các đường chia tạo hiệu ứng tổng thể gọn gàng",
      "Phun hiệu ứng đá: phun lớp cát màu theo từng lượt bằng súng phun hiệu ứng đá cho đến khi đều và đầy, kiểm soát vân và độ dày, sau đó tháo băng che để hoàn thiện mép",
      "Đóng rắn lớp phủ: khi sơn hiệu ứng đá đã khô hoàn toàn, thi công một đến hai lớp phủ trong suốt để tăng khả năng chống chịu thời tiết và chống bẩn, và đóng rắn tự nhiên để tạo màng",
    ],
    certifications: [
      "Đạt cấp chất lượng ngoại thất liên quan đến hiệu ứng đá theo JG/T 24-2018 'Bột bả tường ngoại thất công trình'",
      "Tuân thủ các tiêu chuẩn quốc gia tương ứng (GB) về giới hạn chất độc hại trong sơn phủ tường ngoại thất kiến trúc",
      "Nhãn Môi trường Trung Quốc (十环) / công thức gốc nước thân thiện môi trường VOC thấp",
      "Hệ thống chất lượng toàn cầu AkzoNobel + hệ thống quản lý chất lượng và môi trường ISO 9001 / ISO 14001",
      "Cung cấp phiếu dữ liệu kỹ thuật sản phẩm và cam kết bảo hành dự án; có sẵn báo cáo thử nghiệm",
    ],
    packaging: [
      { label: "Quy cách đóng gói", value: "Sơn hiệu ứng đá chủ yếu trong thùng 30KG; sơn lót / lớp phủ trong suốt tương ứng trong thùng" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container / pallet; có thể đặt theo mã màu kết hợp với các sản phẩm tương ứng" },
      { label: "Hạn sử dụng", value: "Thường khoảng 12 tháng khi chưa mở nắp; xem nhãn trên thùng" },
      { label: "Bảo quản", value: "Bảo quản kín ở nơi khô ráo, thoáng mát, tránh ánh nắng, sương giá và đè nén" },
      { label: "Mẫu", value: "Có sẵn tấm mẫu vân đá và bảng màu; có thể làm mẫu lớn trước dự án để xác nhận hiệu ứng đá" },
    ],
    whyChoose: [
      { icon: "🪨", title: "Sánh ngang đá thật", desc: "Cát màu tự nhiên tái hiện vân và màu của granite và đá với độ chân thực cao, mang lại cho mặt đứng vẻ thanh lịch tinh tế." },
      { icon: "🪶", title: "Nhẹ và tiết kiệm chi phí", desc: "Mang đến sự hiện diện của đá với chi phí hợp lý, nhẹ hơn, kinh tế hơn và dễ thi công hơn mảng đá ốp thật." },
      { icon: "☀️", title: "Chống chịu thời tiết ngoài trời", desc: "Chống chịu thời tiết, thoáng khí và chống nứt, giữ màu ổn định và bám dính chắc dưới nắng mưa." },
      { icon: "🛠️", title: "Dễ sửa chữa", desc: "Thi công đơn giản với vân có thể kiểm soát; các khu vực sứt có thể sửa cục bộ và làm mờ chuyển tiếp theo kỹ thuật gốc." },
      { icon: "🧱", title: "Hệ thống hoàn chỉnh", desc: "Sơn lót, sơn hiệu ứng đá và lớp phủ trong suốt phối hợp để mang lại khóa kiềm, trang trí và bảo vệ trong một." },
    ],
    projectShowcase: [
      "Mặt đứng kết cấu đá cho nhà ở, biệt thự và câu lạc bộ cao cấp",
      "Hoàn thiện hiệu ứng đá cho công trình thương mại, khách sạn và kiến trúc văn hóa-du lịch",
      "Hoàn thiện ngoại thất vân đá cho công trình tiết kiệm năng lượng sử dụng hệ thống cách nhiệt ngoài nhà EIFS",
      "Dự án trang trí hiệu ứng đá cho cảnh quan đô thị, tường rào và cổng vào",
    ],
    faq: [
      { q: "Sơn hiệu ứng đá khác đá thật ở điểm nào?", a: "Sơn hiệu ứng đá tái hiện vân đá bằng cát màu; từ xa hiệu ứng gần với đá thật, nhưng nhẹ hơn, kinh tế hơn, thi công nhanh hơn, dễ sửa chữa và chi phí tổng thể thấp hơn." },
      { q: "Có cần lớp phủ trong suốt không?", a: "Rất khuyến nghị. Một lớp phủ trong suốt tương ứng cải thiện đáng kể khả năng chống chịu thời tiết, chống bám bẩn và chống ố trắng, giữ vân và màu đá bền lâu hơn." },
      { q: "Sơn hiệu ứng đá có dùng được trên tường cách nhiệt không?", a: "Có. Nhiều loại sơn hiệu ứng đá phù hợp với hệ thống cách nhiệt ngoài nhà EIFS; chúng tôi khuyến nghị thi công hệ thống hoàn chỉnh lót-đá-phủ." },
      { q: "Cát màu có bị rụng không?", a: "Với thi công và phủ lớp đúng cách, độ bám dính rất chắc; các vết sứt cục bộ kèm rụng cát có thể sửa bằng cùng lô theo vân gốc rồi làm mờ chuyển tiếp bằng lớp phủ." },
      { q: "Số lượng đặt tối thiểu và thời gian giao hàng là bao nhiêu?", a: "Đặt theo container / pallet, theo mã màu kết hợp với các sản phẩm tương ứng; thời gian giao hàng được xác nhận theo từng đơn." },
    ],
  },

  texture: {
    story:
      "Sơn vân trang trí Dulux Professional là cơ hội để trao cho một bức tường tiếng nói của riêng nó. Sơn vân linh hoạt cao cấp, sơn màu đá đàn hồi cao cấp và sơn lót giữa họa tiết nổi cao cấp dùng vân kết cấu, hiệu ứng đá màu đá và họa tiết nổi ba chiều để biến một bức tường trơn thành nghệ thuật có thể chạm vào. Sơn vân linh hoạt dùng nhũ tương linh hoạt cao cấp để chống nứt và chống thấm, nên vân giữ được không nứt qua năm tháng; sơn màu đá đàn hồi được phun và hình thành chỉ trong một lượt, với độ giống đá cao và độ đàn hồi đầy đủ; còn sơn lót giữa họa tiết nổi vẽ nên những họa tiết sắc nét, tinh xảo bằng kỹ thuật phun, với lựa chọn vân phong phú. Nó phải có lớp lang đẹp đẽ nhưng vẫn chịu được gió, mưa và tia UV ngoài trời. Khi một không gian cần một điểm nhấn thị giác khiến người ta dừng lại, sơn vân là phông nền cao cấp đang thở ấy.",
    heritage:
      "Dòng vân trang trí kế thừa tay nghề tích lũy của AkzoNobel trong lĩnh vực sơn phủ trang trí, dùng một vốn từ vựng vân phong phú để tạo điểm nhấn thẩm mỹ cho các không gian nội ngoại thất cao cấp. Nó đã phục vụ lâu dài các dự án nhà ở, thương mại và công cộng theo đuổi tính thiết kế và chất lượng.",
    technicalSpecs: [
      { label: "Loại", value: "Vân trang trí / màu đá / lớp lót giữa họa tiết nổi (acrylic gốc nước)" },
      { label: "Độ bóng", value: "Chủ yếu vân mờ; có thể điều chỉnh bằng lớp phủ bóng" },
      { label: "VOC", value: "Công thức gốc nước thân thiện môi trường, an toàn và VOC thấp" },
      { label: "Độ che phủ", value: "Biên dạng dạng bột nhão dày; kết cấu và vân hình thành chỉ trong một lần thi công với khả năng che phủ mạnh" },
      { label: "Bề mặt phù hợp", value: "Bê tông xi măng, tường gạch và xây, tấm thạch cao và hệ thống cách nhiệt ngoài nhà EIFS" },
      { label: "Định mức lý thuyết", value: "Khoảng 0.5-3.5 kg/m² (thay đổi theo độ dày họa tiết và hiệu ứng biên dạng)" },
    ],
    manufacturing: [
      "Dựa trên nhũ tương acrylic linh hoạt / đàn hồi cao cấp, pha hợp với vật liệu vân vô cơ và bột màu, tạo thành công thức vân chống nứt qua một quy trình đặc biệt",
      "Dòng màu đá được pha trộn với bột màu vô cơ cao cấp để tạo màu vân hiệu ứng đá; có thể phun và hình thành chỉ trong một lượt với độ chân thực cao và màu ổn định",
      "Lớp lót giữa họa tiết nổi dùng kỹ thuật phun và con lăn chuyên dụng để tạo đa dạng họa tiết ba chiều sắc nét, tinh xảo và phân lớp rõ ràng",
      "Công thức cân bằng giữa chống nứt đàn hồi, chống nước và chống thấm, và thoáng khí, giữ các kết cấu dạng bột nhão dày không dễ nứt hay bong dưới sử dụng ngoài trời lâu dài",
      "Có pha màu theo màu nền hoặc theo yêu cầu của khách hàng, với sơn lót và lớp phủ trong suốt tương ứng tạo thành một hệ thống sơn phủ trang trí hoàn chỉnh",
    ],
    careGuide: [
      { title: "Đóng rắn lớp phủ", desc: "Với bề mặt vân ngoại thất, khuyến nghị một lớp phủ trong suốt tương ứng để tăng khả năng chống chịu thời tiết và chống bẩn; các vùng lồi lõm của vân đặc biệt cần được bảo vệ để kéo dài tuổi thọ lớp hoàn thiện." },
      { title: "Phủi bụi và vệ sinh", desc: "Vân ba chiều dễ bám bụi; vệ sinh bằng bàn chải mềm hoặc nước sạch áp lực thấp từ trên xuống, tránh vật cứng có thể cào xước và làm hỏng vân." },
      { title: "Sửa chữa vân", desc: "Sửa hư hỏng cục bộ bằng cùng mã theo kỹ thuật biên dạng gốc, khôi phục hướng vân càng sát càng tốt và làm mờ chuyển tiếp lớp phủ để giảm thiểu vết." },
      { title: "Chống ẩm và chống nứt", desc: "Định kỳ kiểm tra các khu vực ẩm nội thất và bề mặt hướng nắng ngoài trời; xử lý kịp thời mọi tình trạng bộp hoặc nứt để giữ lớp vân nguyên vẹn." },
    ],
    installation: [
      "Chuẩn bị bề mặt: tường sạch, khô, chắc và phẳng; làm phẳng và xử lý vết nứt đúng cách để đảm bảo bám dính chắc cho vân dạng bột nhão dày",
      "Sơn lót khóa kín: thi công một lớp đầy sơn lót chống kiềm khóa kín tương ứng để khóa độ kiềm, tăng độ bám dính và ngăn thấm muối ảnh hưởng đến màu vân",
      "Thi công biên dạng: theo thiết kế, dùng kỹ thuật phun hoặc con lăn chuyên dụng để tạo vân kết cấu, màu đá, họa tiết nổi và các vân khác, kiểm soát độ dày và sự đồng nhất họa tiết",
      "Điều chỉnh họa tiết: khi còn ướt, dùng dụng cụ để hoàn thiện, ấn hoặc vẽ họa tiết tạo hiệu ứng ba chiều và phân lớp mong muốn, lưu ý làm mờ chuyển tiếp đều",
      "Tạo màng lớp phủ: khi lớp vân đã khô hoàn toàn, thi công lớp phủ trong suốt để tăng khả năng chống chịu thời tiết và chống bẩn, và đóng rắn tự nhiên đạt độ cứng tối ưu",
    ],
    certifications: [
      "Tuân thủ các tiêu chuẩn quốc gia tương ứng (GB) về giới hạn chất độc hại trong sơn phủ trang trí kiến trúc",
      "Nhãn Môi trường Trung Quốc (十环) / công thức gốc nước thân thiện môi trường VOC thấp",
      "Hệ thống chất lượng toàn cầu AkzoNobel + hệ thống quản lý chất lượng và môi trường ISO 9001 / ISO 14001",
      "Hiệu năng đàn hồi / chống nứt được hỗ trợ bởi phiếu dữ liệu kỹ thuật sản phẩm",
      "Cung cấp cam kết bảo hành dự án, kèm báo cáo thử nghiệm sản phẩm",
    ],
    packaging: [
      { label: "Quy cách đóng gói", value: "Vân / màu đá chủ yếu trong thùng 20KG / 30KG; lớp lót giữa họa tiết nổi trong thùng 20L" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container / pallet; có thể đặt theo họa tiết kết hợp với các sản phẩm tương ứng" },
      { label: "Hạn sử dụng", value: "Thường khoảng 12 tháng khi chưa mở nắp; xem nhãn trên thùng" },
      { label: "Bảo quản", value: "Bảo quản kín ở nơi khô ráo, thoáng mát, tránh ánh nắng, sương giá và đè nén gây vón cục" },
      { label: "Mẫu", value: "Có sẵn tấm mẫu vân và bảng màu; có thể làm mẫu lớn trước dự án để xác nhận hiệu ứng biên dạng" },
    ],
    whyChoose: [
      { icon: "✨", title: "Thẩm mỹ cao cấp", desc: "Nhiều loại vân — vân kết cấu, màu đá và họa tiết nổi — tạo điểm nhấn thị giác khiến người ta dừng lại." },
      { icon: "🖌️", title: "Hiệu ứng phong phú", desc: "Lựa chọn họa tiết và mô-típ đa dạng đáp ứng biểu đạt thiết kế của các dự án cá nhân hóa và đặt riêng cao cấp." },
      { icon: "🧱", title: "Độ đàn hồi chống nứt", desc: "Công thức linh hoạt / đàn hồi chống nứt tường hiệu quả, giúp vân dạng bột nhão dày bền hơn." },
      { icon: "💧", title: "Chống nước và thoáng khí", desc: "Kết hợp chống nước, chống thấm với thoáng khí; vân ngoài trời giữ ổn định và đẹp qua gió mưa." },
      { icon: "🔫", title: "Tạo hình hiệu quả", desc: "Màu đá được phun và hình thành chỉ trong một lượt, họa tiết nổi dùng kỹ thuật phun — thi công hiệu quả và có thể kiểm soát." },
    ],
    projectShowcase: [
      "Tường điểm nhấn vân đặc trưng cho nhà ở, biệt thự và câu lạc bộ cao cấp",
      "Mặt đứng biên dạng nghệ thuật cho khách sạn, văn phòng bán hàng và không gian thương mại",
      "Hoàn thiện ngoại thất vân cho công trình sử dụng hệ thống cách nhiệt ngoài nhà EIFS",
      "Biên dạng trang trí họa tiết nổi cho dự án văn hóa, cảnh quan và cổng vào",
    ],
    faq: [
      { q: "Sơn vân có dùng được ngoài trời không?", a: "Có. Nhiều sản phẩm vân và màu đá phù hợp với tường ngoại thất và hệ thống cách nhiệt EIFS; khuyến nghị một lớp phủ trong suốt để tăng khả năng chống chịu thời tiết và chống bẩn." },
      { q: "Sơn màu đá và sơn hiệu ứng đá khác nhau thế nào?", a: "Sơn màu đá thiên về kết cấu giống đá với độ đàn hồi rõ nét hơn và có thể phun-tạo hình chỉ trong một lượt; sơn hiệu ứng đá trình hiện cảm giác đá hạt, nặng hơn với cát màu tự nhiên." },
      { q: "Vân ba chiều có khó vệ sinh không?", a: "Các vùng lõm dễ bám bụi; chỉ cần vệ sinh bằng bàn chải mềm hoặc nước sạch áp lực thấp từ trên xuống. Sau khi phủ lớp, nó kháng bẩn hơn và dễ bảo trì hơn." },
      { q: "Có thể đặt họa tiết theo yêu cầu không?", a: "Có. Có thể pha màu theo đơn, và đạt được nhiều hiệu ứng cá nhân hóa thông qua phun, con lăn và kỹ thuật hoàn thiện." },
      { q: "Số lượng đặt tối thiểu và thời gian giao hàng là bao nhiêu?", a: "Đặt theo container / pallet, theo họa tiết kết hợp với các sản phẩm tương ứng; thời gian giao hàng được xác nhận theo từng đơn." },
    ],
  },

  mineral: {
    story:
      "Sơn khoáng vô cơ Dulux Professional đưa các bức tường công trình trở về bản chất nguyên sơ nhất của đá và khoáng chất. Với nhựa silicat vô cơ làm chất tạo màng, nó không dựa vào nhựa hữu cơ như sơn nhũ tương thông thường — thay vào đó nó trải qua phản ứng silic hóa với bề mặt khoáng, trở thành một phần của chính bức tường. Nó vốn không cháy, với màng đạt tiêu chuẩn chống cháy cấp A1; nó vốn thoáng khí, để hơi ẩm trong tường thở tự do mà không dễ sinh mốc; và hàm lượng VOC thấp hơn nhiều so với sơn phủ thông thường, đưa tính thân thiện môi trường vào tận xương cốt của công thức. Dù cho nhà ở và khách sạn, hay cho trường học và bệnh viện với yêu cầu nghiêm ngặt về sạch sẽ và an toàn, nó canh giữ mỗi bức tường một cách điềm tĩnh, bền vững. Đây là sự trở về với thiên nhiên và sức khỏe của sơn phủ.",
    heritage:
      "Dòng khoáng vô cơ đại diện cho hành trình khám phá của Dulux Professional trong lĩnh vực sơn phủ bền vững, đạt được khả năng tạo màng silicat vô cơ với công nghệ AkzoNobel. Cân bằng giữa tính không cháy, thoáng khí, VOC thấp và độ bền màu, nó phù hợp với các dự án có yêu cầu cao hơn về môi trường và an toàn.",
    technicalSpecs: [
      { label: "Loại", value: "Sơn phủ khoáng silicat vô cơ (nội thất / ngoại thất)" },
      { label: "Độ bóng", value: "Mờ, trình hiện kết cấu khoáng mộc mạc" },
      { label: "VOC", value: "VOC thấp hơn nhiều so với sơn nhũ tương thông thường; ít mùi và thân thiện môi trường" },
      { label: "Độ che phủ", value: "Tốt, với hàm lượng chất rắn theo thể tích tương đối cao (ví dụ khoảng 55% với màu trắng)" },
      { label: "Bề mặt phù hợp", value: "Tường xây, tường bê tông, bề mặt bột bả gốc xi măng và các bề mặt khoáng khác" },
      { label: "Định mức lý thuyết", value: "Khoảng 11-13 m² mỗi lít mỗi lớp (thay đổi theo bề mặt và phương pháp thi công)" },
    ],
    manufacturing: [
      "Sử dụng nhựa silicat vô cơ làm chất tạo màng chính, trải qua phản ứng silic hóa với bề mặt khoáng để liên kết màng sơn chắc chắn với bức tường",
      "Công thức đạt hiệu năng không cháy, với màng đạt tiêu chuẩn chống cháy cấp A1 để an toàn cháy nổ cao hơn trong công trình công cộng",
      "Cấu trúc thoáng khí cao để hơi ẩm bên trong tường giải phóng tự do, giảm vết ố nước và sự phát triển của mốc cho tường khỏe mạnh hơn",
      "Hàm lượng VOC thấp hơn nhiều so với sơn nhũ tương thông thường, kết hợp với sơn lót chống kiềm vô cơ tương ứng tạo thành một hệ thống sơn phủ phát thải thấp, bền vững",
      "Mỗi lô được kiểm nghiệm về hàm lượng chất rắn theo thể tích, tính không cháy, khả năng chống mốc và các chỉ tiêu khác, đảm bảo nguồn cung ổn định, đồng nhất cho các dự án khối lượng lớn",
    ],
    careGuide: [
      { title: "Sơn lót tương ứng", desc: "Dùng sơn lót chống kiềm vô cơ tương ứng trước khi thi công để khóa độ kiềm và làm cứng bề mặt, đảm bảo độ bám dính và tạo màng của lớp phủ vô cơ." },
      { title: "Thông gió và tạo màng", desc: "Duy trì thông gió sau khi thi công để phản ứng silic hóa diễn ra đầy đủ và màng sơn đóng rắn đạt độ cứng và độ thoáng khí tối ưu." },
      { title: "Vệ sinh nhẹ nhàng", desc: "Lau nhẹ vết bẩn bề mặt nhẹ bằng khăn mềm vắt ráo với nước sạch, tránh axit mạnh, kiềm mạnh và dụng cụ cứng có thể làm hỏng màng khoáng." },
      { title: "Giữ khô ráo", desc: "Dù thoáng khí và chống mốc, bạn vẫn nên truy và xử lý mọi nguồn thấm đang diễn ra, giữ tường khô ráo lâu dài." },
    ],
    installation: [
      "Chuẩn bị bề mặt: tường sạch, khô và chắc; với bề mặt khoáng, loại bỏ bụi rời, dầu mỡ và các lớp bong tróc",
      "Sơn lót tương ứng: thi công một lớp đầy sơn lót chống kiềm vô cơ tương ứng để khóa độ kiềm, cải thiện tình trạng phấn hóa và rời rạc của bề mặt, và tăng độ bám dính",
      "Khuấy và pha loãng: khuấy đều trước khi dùng; có thể thêm một lượng nước sạch thích hợp để pha loãng (thường không quá 5%, theo hướng dẫn sản phẩm)",
      "Thi công lớp phủ: thi công hai lớp bằng cọ, con lăn, súng phun thông thường hoặc súng phun không khí nén, để đủ khoảng cách thời gian giữa các lớp (khoảng 2-3 giờ)",
      "Thông gió và đóng rắn: duy trì thông gió để quá trình tạo màng silic hóa hoàn tất đầy đủ; tránh thi công trong điều kiện độ ẩm cao hoặc thời tiết mưa",
    ],
    certifications: [
      "Màng sơn không cháy, đạt tiêu chuẩn chống cháy cấp A1 (theo dữ liệu kỹ thuật sản phẩm)",
      "VOC thấp hơn nhiều so với sơn nhũ tương thông thường, tuân thủ tiêu chuẩn môi trường nội thất GB 18582-2020",
      "Nhãn Môi trường Trung Quốc (十环) / VOC thấp — một giải pháp sơn phủ bền vững",
      "Hệ thống chất lượng toàn cầu AkzoNobel + hệ thống quản lý chất lượng và môi trường ISO 9001 / ISO 14001",
      "Cung cấp phiếu dữ liệu kỹ thuật sản phẩm và cam kết bảo hành; có sẵn báo cáo thử nghiệm phục vụ cung ứng dự án",
    ],
    packaging: [
      { label: "Quy cách đóng gói", value: "Chủ yếu thùng 20L; sơn lót vô cơ tương ứng trong thùng" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container / pallet; có thể đặt kết hợp với sơn lót tương ứng" },
      { label: "Hạn sử dụng", value: "Thường khoảng 12-36 tháng khi chưa mở nắp; xem nhãn trên thùng" },
      { label: "Bảo quản", value: "Bảo quản kín ở nơi khô ráo, thoáng mát, tránh ánh nắng và sương giá; dùng ngay sau khi mở" },
      { label: "Mẫu", value: "Có sẵn bảng màu và tấm mẫu; thi công thử có thể xác nhận độ che phủ và kết cấu trước dự án" },
    ],
    whyChoose: [
      { icon: "🔥", title: "Không cháy và chống cháy", desc: "Màng sơn đạt tiêu chuẩn không cháy cấp A1, mang lại an toàn cháy nổ cao hơn cho công trình công cộng." },
      { icon: "🌬️", title: "Thoáng khí và chống mốc", desc: "Cấu trúc thoáng khí cao giải phóng hơi ẩm trong tường, giảm vết ố nước và mốc cho tường khỏe mạnh hơn." },
      { icon: "🌱", title: "Bền vững và thân thiện môi trường", desc: "Nền khoáng vô cơ với VOC thấp hơn nhiều so với sơn nhũ tương thông thường — xanh và phát thải thấp." },
      { icon: "🧱", title: "Bền màu", desc: "Chống kiềm và chống chịu thời tiết; màng khoáng giữ màu lâu dài mà không dễ phai." },
      { icon: "🏫", title: "Sẵn sàng cho dự án", desc: "Phù hợp cho nhà ở, khách sạn, trường học, bệnh viện và các dự án khác có yêu cầu cao về môi trường và an toàn." },
    ],
    projectShowcase: [
      "Công trình công cộng như trường học và bệnh viện với yêu cầu nghiêm ngặt về môi trường, phòng cháy và chống mốc",
      "Sơn phủ bền vững cho tường nội thất diện rộng của khách sạn, văn phòng và tương tự",
      "Cải tạo thoáng khí cho công trình lịch sử và tường bề mặt khoáng",
      "Dự án nhà ở và hoàn thiện cao cấp theo đuổi giải pháp xanh, phát thải thấp",
    ],
    faq: [
      { q: "Sơn khoáng vô cơ có ưu điểm độc đáo gì?", a: "Nó tạo màng qua silicat vô cơ, vốn không cháy (đạt cấp A1), thoáng khí cao và chống sự phát triển của mốc, với VOC thấp hơn nhiều so với sơn nhũ tương thông thường." },
      { q: "Có thể thi công trực tiếp lên tường cũ không?", a: "Bề mặt trước tiên phải được xử lý bằng sơn lót chống kiềm vô cơ tương ứng để khóa độ kiềm và làm cứng, trước khi thi công lớp phủ vô cơ để đảm bảo độ bám dính và tạo màng." },
      { q: "Vì sao sơn vô cơ chống mốc tốt hơn?", a: "Cấu trúc thoáng khí cao của nó để hơi ẩm trong tường giải phóng tự do, giảm tích tụ nước và nhờ đó ức chế sự phát triển của mốc." },
      { q: "Có phù hợp cho bệnh viện và trường học không?", a: "Rất phù hợp. Đặc tính không cháy, thoáng khí, VOC thấp của nó khiến nó là lựa chọn lý tưởng cho công trình công cộng có yêu cầu cao về phòng cháy và môi trường." },
      { q: "Số lượng đặt tối thiểu và thời gian giao hàng là bao nhiêu?", a: "Đặt theo container / pallet, kết hợp với sơn lót tương ứng; thời gian giao hàng được xác nhận theo từng đơn." },
    ],
  },

  metal: {
    story:
      "Sơn hiệu ứng kim loại Dulux Professional khoác lên các mặt đứng cao cấp và không gian trang trí một lớp lấp lánh. Công thức kim loại gốc nước trải một lớp ánh kim mịn trên tường, biến chuyển độ sâu khi góc sáng thay đổi, mang lại cho bề mặt phẳng một kết cấu giống kim loại và cảm giác tinh tế. Nó có thể thắp lên một điểm nhấn bắt mắt trên mặt đứng hoặc vẽ nên chi tiết trang trí tinh xảo trong nhà, lặng lẽ nâng một không gian lên một bậc phong cách. Xây dựng trên công nghệ sơn phủ của AkzoNobel, nó theo đuổi một thẩm mỹ riêng biệt đồng thời cân bằng độ bền và tính thân thiện môi trường, để sự lạnh lẽo của kim loại cùng tồn tại với sự an tâm của gốc nước. Khi một thiết kế cần một chút ánh kim độc đáo, sơn hiệu ứng kim loại là điểm nhấn được đặt đúng chỗ ấy.",
    heritage:
      "Sơn hiệu ứng kim loại tiếp nối chuyên môn kỹ thuật của AkzoNobel trong lĩnh vực sơn phủ trang trí, trình hiện một ánh kim đặc trưng với công thức gốc nước và mang lại biểu đạt thẩm mỹ khác biệt cho các dự án cao cấp và hoàn thiện.",
    technicalSpecs: [
      { label: "Loại", value: "Sơn trang trí hiệu ứng kim loại gốc nước" },
      { label: "Độ bóng", value: "Ánh kim biến chuyển độ sâu theo góc sáng" },
      { label: "VOC", value: "Công thức gốc nước thân thiện môi trường, VOC thấp" },
      { label: "Độ che phủ", value: "Tốt; khuyến nghị sơn lót tương ứng để đạt màu nền kim loại đồng đều" },
      { label: "Bề mặt phù hợp", value: "Hoàn thiện mặt đứng, tường trang trí nội thất và các bề mặt phẳng đã chuẩn bị khác" },
      { label: "Định mức lý thuyết", value: "Thay đổi theo hiệu ứng kim loại và phương pháp thi công; xem phiếu dữ liệu kỹ thuật sản phẩm" },
    ],
    manufacturing: [
      "Sử dụng công nghệ sơn phủ gốc nước của AkzoNobel, pha hợp với bột màu kim loại để phối ra hiệu ứng ánh kim mịn, biến chuyển",
      "Công thức cân bằng giữa chất lượng trang trí và độ bền, giữ ánh kim của màng kim loại ổn định trong môi trường sử dụng",
      "Công thức gốc nước thân thiện môi trường, VOC thấp — thân thiện môi trường hơn và dễ thi công, bảo trì hơn so với sơn kim loại gốc dung môi",
      "Có thể kết hợp với hệ thống sơn lót và lớp phủ để cải thiện độ đồng đều màu nền và khả năng chống chịu thời tiết, chống bẩn của màng sơn",
      "Được kiểm soát chất lượng theo các chỉ tiêu như độ bóng và độ bám dính, đảm bảo tính nhất quán của hiệu ứng trang trí",
    ],
    careGuide: [
      { title: "Vệ sinh nhẹ nhàng", desc: "Lau nhẹ bụi bề mặt bằng khăn mềm vắt ráo với nước sạch, tránh dụng cụ cứng và dung môi mạnh có thể cào xước và làm hỏng lớp ánh kim." },
      { title: "Bảo vệ bằng lớp phủ", desc: "Để tăng khả năng chống chịu thời tiết và chống bẩn, có thể thêm một lớp phủ trong suốt tương ứng để bảo vệ hiệu ứng kim loại và kéo dài tuổi thọ lớp hoàn thiện." },
      { title: "Thi công đều", desc: "Hiệu ứng kim loại nhạy cảm với kỹ thuật thi công; trong quá trình bảo trì, theo dõi xem ánh kim có đều không, và làm mờ chuyển tiếp theo hướng khi sửa chữa cục bộ." },
      { title: "Tránh phơi lộ và mài mòn", desc: "Định kỳ kiểm tra các khu vực mài mòn cao và bề mặt chịu nắng gắt lâu dài, bảo trì kịp thời để giữ ánh kim nhất quán." },
    ],
    installation: [
      "Chuẩn bị bề mặt: tường sạch, khô, phẳng và chắc, để đảm bảo hiệu ứng kim loại được trình hiện đồng đều",
      "Sơn lót khóa kín: thi công một lớp đầy sơn lót tương ứng để khóa độ kiềm, tăng độ bám dính và tạo nền màu đồng đều, tránh loang lổ ở lớp kim loại",
      "Lớp phủ kim loại: khuấy đều và thi công theo phương pháp phun hoặc cọ khuyến nghị, giữ kỹ thuật và hướng nhất quán để có ánh kim đồng đều",
      "Làm mờ chuyển tiếp hiệu ứng: với công trình diện rộng, lưu ý làm mờ chuyển tiếp các mạch nối và chỗ chồng lớp cho đều, tránh khác biệt màu rõ rệt và đứt ánh kim",
      "Đóng rắn lớp phủ: thi công lớp phủ trong suốt khi cần để tăng khả năng chống chịu thời tiết và chống bẩn, và đóng rắn tự nhiên để tạo màng",
    ],
    certifications: [
      "Tuân thủ các tiêu chuẩn quốc gia tương ứng (GB) về giới hạn chất độc hại trong sơn phủ trang trí kiến trúc",
      "Nhãn Môi trường Trung Quốc (十环) / công thức gốc nước thân thiện môi trường VOC thấp",
      "Hệ thống chất lượng toàn cầu AkzoNobel + hệ thống quản lý chất lượng và môi trường ISO 9001 / ISO 14001",
      "Cung cấp phiếu dữ liệu kỹ thuật sản phẩm để hỗ trợ hiệu năng trang trí và độ bền",
      "Cung cấp cam kết bảo hành dự án, kèm báo cáo thử nghiệm sản phẩm",
    ],
    packaging: [
      { label: "Quy cách đóng gói", value: "Trong thùng; quy cách cụ thể theo nhãn sản phẩm" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container / pallet; có thể đặt kết hợp với sơn lót / lớp phủ tương ứng" },
      { label: "Hạn sử dụng", value: "Khi chưa mở nắp theo nhãn trên thùng; dùng ngay sau khi mở" },
      { label: "Bảo quản", value: "Bảo quản kín ở nơi khô ráo, thoáng mát, tránh ánh nắng và sương giá" },
      { label: "Mẫu", value: "Có sẵn tấm mẫu hiệu ứng kim loại; có thể làm mẫu lớn trước dự án để xác nhận ánh kim" },
    ],
    whyChoose: [
      { icon: "🥇", title: "Ánh kim", desc: "Kết cấu kim loại mịn biến chuyển theo ánh sáng, lập tức nâng tầm sự tinh tế của không gian và mặt đứng." },
      { icon: "✨", title: "Trang trí cao cấp", desc: "Phù hợp cho các điểm nhấn cao cấp và hoàn thiện, tạo nên một tâm điểm thị giác khác biệt." },
      { icon: "🍃", title: "Gốc nước và thân thiện môi trường", desc: "Công thức gốc nước VOC thấp — thân thiện môi trường hơn và dễ thi công, bảo trì hơn so với gốc dung môi." },
      { icon: "🛡️", title: "Bền và ổn định", desc: "Cân bằng giữa chất lượng trang trí và độ bền, và có thể phủ lớp để tăng khả năng chống chịu thời tiết và chống bẩn." },
      { icon: "🎨", title: "Hiệu ứng có thể kiểm soát", desc: "Sơn lót tương ứng và kỹ thuật thi công đảm bảo màu nền đồng đều và ánh kim nhất quán." },
    ],
    projectShowcase: [
      "Điểm nhấn mặt đứng kim loại cho công trình thương mại và khách sạn cao cấp",
      "Tường điểm nhấn trang trí cho văn phòng bán hàng, phòng trưng bày và cửa hàng cao cấp",
      "Trang trí kết cấu kim loại cho biệt thự, câu lạc bộ và nhà ở cao cấp khác",
      "Trang trí chi tiết cần ánh kim, như biển hiệu, biên dạng và cổng vào",
    ],
    faq: [
      { q: "Sơn hiệu ứng kim loại được dùng ở đâu?", a: "Chủ yếu cho các điểm nhấn trang trí mặt đứng và nội thất cao cấp, như phòng trưng bày, văn phòng bán hàng và cửa hàng cao cấp nơi tường điểm nhấn cần ánh kim." },
      { q: "Có cần sơn lót tương ứng không?", a: "Chúng tôi khuyến nghị trước tiên thi công sơn lót tương ứng để khóa độ kiềm và tạo nền màu đồng đều, giúp tránh loang lổ ở lớp kim loại và làm ánh kim đều hơn." },
      { q: "Ánh kim có đều không?", a: "Hiệu ứng kim loại nhạy cảm với kỹ thuật thi công; giữ hướng phun hoặc cọ nhất quán và theo dõi các mạch nối, và phủ lớp để đồng nhất ánh kim ở nơi cần." },
      { q: "Có dùng được trong nhà không?", a: "Có. Công thức gốc nước VOC thấp phù hợp cho các điểm nhấn trang trí nội thất, và kết hợp với một lớp phủ giúp nó bền hơn và dễ bảo trì hơn." },
      { q: "Số lượng đặt tối thiểu và thời gian giao hàng là bao nhiêu?", a: "Đặt theo container / pallet, kết hợp với các sản phẩm tương ứng; thời gian giao hàng được xác nhận theo từng đơn." },
    ],
  },

  waterproof: {
    story:
      "Sơn chống thấm Dulux Professional là một hàng rào âm thầm, vững chãi giữa công trình và nước. Được thiết kế thành các loại sơn chống thấm và giải pháp cho tường, mái và khu vực ẩm, nó giữ nước thấm bên ngoài kết cấu nhờ độ đàn hồi, bám dính và chống nước tốt. Nó trải dọc theo bề mặt thành một màng chống thấm liên tục, bịt kín mọi khe hở nơi hơi ẩm có thể xâm nhập; nó chịu nắng mưa trên mái, và canh giữ ngày qua ngày ở các khu vực ẩm như phòng tắm, ban công và tầng hầm. Chống thấm là công việc giấu mặt — làm đúng thì không ai để ý; làm sai thì vết thấm hiện lên khắp nơi. Giá trị của sơn chống thấm Dulux Professional nằm chính ở việc giữ nước luôn ở nơi nó thuộc về, để sự an tâm của một công trình bắt đầu từ những nơi bạn không thể nhìn thấy.",
    heritage:
      "Dòng chống thấm, xây dựng trên công nghệ sơn phủ AkzoNobel, cung cấp các giải pháp bảo vệ chống thấm cho tường, mái và khu vực ẩm trong các dự án xây dựng. Phối hợp nhịp nhàng với hệ thống sơn lót, bột bả và lớp phủ, nó tạo thành một chuỗi dự án hoàn chỉnh từ chống thấm đến hoàn thiện.",
    technicalSpecs: [
      { label: "Loại", value: "Sơn chống thấm công trình / giải pháp chống thấm" },
      { label: "Độ bóng", value: "Chủ yếu là lớp phủ chức năng sau khi tạo màng, nhằm được che phủ bởi lớp hoàn thiện" },
      { label: "VOC", value: "Công thức gốc nước thân thiện môi trường, VOC thấp (tùy sản phẩm)" },
      { label: "Độ che phủ", value: "Tập trung vào tạo màng liên tục để khóa kín chống thấm, chú trọng độ dày và tính toàn vẹn của màng" },
      { label: "Bề mặt phù hợp", value: "Tường, mái, phòng tắm, ban công, tầng hầm và các khu vực ẩm, tiếp xúc nước khác" },
      { label: "Định mức lý thuyết", value: "Thay đổi theo yêu cầu độ dày màng và bề mặt; xem phiếu dữ liệu kỹ thuật sản phẩm" },
    ],
    manufacturing: [
      "Sử dụng công thức chống thấm đàn hồi để màng giãn theo biến dạng nhỏ của bề mặt, bịt kín các đường xâm nhập của hơi ẩm",
      "Chú trọng độ bám dính và chống nước, giữ màng chống thấm chắc chắn và ổn định mà không bị bộp trong điều kiện ẩm, tiếp xúc nước lâu dài",
      "Cung cấp các sản phẩm chống thấm và phương án thi công tương ứng cho các khu vực khác nhau như tường, mái và vùng ẩm",
      "Có thể phối hợp nhịp nhàng với hệ thống sơn lót, bột bả và lớp phủ để tạo thành một chuỗi dự án hoàn chỉnh từ chống thấm đến hoàn thiện",
      "Được kiểm soát chất lượng theo các chỉ tiêu như độ đàn hồi, độ bám dính và chống nước, đảm bảo chống thấm dự án đáng tin cậy và bền lâu",
    ],
    careGuide: [
      { title: "Nghiệm thu thử ngâm nước", desc: "Sau khi thi công lớp chống thấm, tiến hành thử ngâm nước để xác nhận không thấm trước khi chuyển sang công việc tiếp theo, phát hiện vấn đề ẩn ngay từ đầu." },
      { title: "Bảo vệ phần đã thi công", desc: "Trước khi màng chống thấm đóng rắn, tránh giẫm đạp, đâm thủng và đè nén nặng; bảo vệ phần đã thi công để giữ màng liên tục và nguyên vẹn." },
      { title: "Kiểm tra chi tiết", desc: "Tập trung kiểm tra các chi tiết như chân ống, góc trong/ngoài và phễu thu sàn; sửa chữa và gia cố kịp thời mọi vết nứt hoặc bộp." },
      { title: "Xử lý từ nguồn", desc: "Khi xảy ra thấm, trước tiên truy nguyên nhân gốc ở bề mặt tiếp xúc nước và các chi tiết, và sửa chữa tương ứng để tránh vá lại lặp đi lặp lại chỉ chữa phần ngọn." },
    ],
    installation: [
      "Chuẩn bị bề mặt: nền sạch, chắc và phẳng; loại bỏ bụi rời và dầu mỡ, bo tròn các góc trong/ngoài, và gia cố trước các chi tiết chân ống",
      "Làm ẩm và lót: xử lý độ ẩm của bề mặt theo yêu cầu sản phẩm, làm ẩm hoặc khóa kín khi cần để đảm bảo màng chống thấm bám dính tốt",
      "Gia cố chi tiết: trước tiên thi công một lớp gia cố cho các chi tiết yếu như chân ống, góc và phễu thu sàn trước khi thi công diện rộng",
      "Thi công nhiều lượt: thi công sơn chống thấm theo từng lượt, ngang và dọc với khoảng cách thời gian thích hợp, để đạt độ dày màng thiết kế, liên tục và không lỗ kim",
      "Bảo vệ sau thử ngâm nước: sau khi đóng rắn, thực hiện thử ngâm nước để nghiệm thu; khi đạt, thi công lớp bảo vệ trước khi hoàn thiện hoặc lát gạch tiếp theo",
    ],
    certifications: [
      "Tuân thủ các tiêu chuẩn quốc gia tương ứng (GB) về giới hạn chất độc hại trong vật liệu chống thấm xây dựng",
      "Nhãn Môi trường Trung Quốc (十环) / công thức gốc nước thân thiện môi trường VOC thấp (tùy sản phẩm)",
      "Hệ thống chất lượng toàn cầu AkzoNobel + hệ thống quản lý chất lượng và môi trường ISO 9001 / ISO 14001",
      "Cung cấp phiếu dữ liệu kỹ thuật sản phẩm để hỗ trợ hiệu năng đàn hồi, bám dính và chống nước",
      "Cung cấp cam kết bảo hành dự án, kèm báo cáo thử nghiệm sản phẩm",
    ],
    packaging: [
      { label: "Quy cách đóng gói", value: "Thùng / bộ kit (một số sản phẩm hai thành phần theo tỷ lệ trộn); theo nhãn sản phẩm" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container / pallet; có thể đặt kết hợp với các sản phẩm hệ thống tương ứng" },
      { label: "Hạn sử dụng", value: "Khi chưa mở nắp theo nhãn trên thùng; dùng ngay sau khi mở" },
      { label: "Bảo quản", value: "Bảo quản kín ở nơi khô ráo, thoáng mát, tránh ánh nắng và sương giá" },
      { label: "Mẫu", value: "Có sẵn mẫu nhỏ để thi công thử một chi tiết nhằm xác nhận khả năng tạo màng và bám dính" },
    ],
    whyChoose: [
      { icon: "💧", title: "Chống thấm bền lâu", desc: "Tạo màng liên tục bịt kín sự xâm nhập của hơi ẩm, mang lại sự bảo vệ đáng tin cậy cho tường, mái và khu vực ẩm." },
      { icon: "🧬", title: "Giãn nở đàn hồi", desc: "Giãn theo biến dạng nhỏ của bề mặt mà không dễ nứt, duy trì tính toàn vẹn của màng chống thấm lâu dài." },
      { icon: "🧷", title: "Bám dính mạnh", desc: "Độ bám dính vượt trội; chắc chắn và ổn định trong môi trường ẩm, tiếp xúc nước mà không bị bộp hay bong." },
      { icon: "🧩", title: "Phối hợp hệ thống", desc: "Kết hợp với sơn lót, bột bả và lớp phủ để tạo thành một chuỗi hoàn chỉnh từ chống thấm đến hoàn thiện." },
      { icon: "🍃", title: "Gốc nước và thân thiện môi trường", desc: "Công thức gốc nước VOC thấp với hương thi công nhẹ — an tâm và thân thiện môi trường hơn." },
    ],
    projectShowcase: [
      "Chống thấm cho các khu vực ẩm nội thất như phòng tắm, bếp và ban công",
      "Bảo vệ chống thấm cho mái, sân thượng và tường ngoại thất tiếp xúc nước",
      "Chống ẩm và chống thấm cho không gian ngầm như tầng hầm và nhà để xe",
      "Khắc phục thấm và cải tạo chống thấm cho công trình cũ",
    ],
    faq: [
      { q: "Sơn chống thấm được dùng ở đâu?", a: "Thường dùng ở các khu vực ẩm và dễ thấm như phòng tắm, bếp, ban công, mái, tầng hầm và tường ngoại thất tiếp xúc nước." },
      { q: "Lớp chống thấm cần bao nhiêu lượt?", a: "Thường thi công theo từng lượt, ngang và dọc, để đạt độ dày màng thiết kế, đảm bảo liên tục và không lỗ kim, với một lớp gia cố tại các chi tiết." },
      { q: "Có cần thử ngâm nước sau khi thi công không?", a: "Có. Sau khi lớp chống thấm đóng rắn, nên thực hiện thử ngâm nước để nghiệm thu nhằm xác nhận không thấm trước khi thi công lớp bảo vệ và lớp hoàn thiện tiếp theo." },
      { q: "Sau khi chống thấm có còn lát gạch hay sơn được không?", a: "Có. Là công việc giấu mặt, khi lớp chống thấm đã nghiệm thu đạt và có lớp bảo vệ, công việc lát gạch hoặc hoàn thiện có thể tiến hành." },
      { q: "Số lượng đặt tối thiểu và thời gian giao hàng là bao nhiêu?", a: "Đặt theo container / pallet, kết hợp với các sản phẩm hệ thống tương ứng; thời gian giao hàng được xác nhận theo từng đơn." },
    ],
  },

  other: {
    story:
      "Các sản phẩm sơn phủ khác của Dulux Professional là những vai phụ khiêm nhường nhưng không thể thiếu của toàn bộ hệ thống sơn phủ. Sơn kẻ chỉ cao cấp vẽ nên các đường chia, giữ cho tường hiệu ứng đá và tường vân được phân khối gọn gàng, phân lớp rõ ràng; lớp phủ trong suốt cao cấp nằm trong vắt trên sơn hiệu ứng đá và sơn vân, chống ố trắng và chống bám bẩn và tự làm sạch tươi mới nhờ mưa; còn lớp lót giữa đàn hồi cao cấp và lớp lót giữa họa tiết nổi nâng đỡ một lớp chuyển tiếp đàn hồi và biên dạng giữa sơn lót và lớp phủ. Dù là vẽ chỉ, phủ lớp hay dựng biên dạng nền, mỗi loại đều đóng vai trò của mình để hoàn thiện chi tiết của một bức tường. Chính sự phối hợp ăn ý của các sản phẩm tương ứng này đã giúp các hệ thống sơn hiệu ứng đá và sơn vân thực sự đứng vững với sự hiện diện từ xa và sự tinh tế khi lại gần.",
    heritage:
      "Các sản phẩm sơn phủ khác là những mắt xích hỗ trợ của hệ thống sơn phủ Dulux Professional, hoàn thiện các bước then chốt như kẻ chỉ, phủ lớp và lót giữa đàn hồi với công nghệ AkzoNobel. Phối hợp nhịp nhàng với các hệ thống hiệu ứng đá, vân và ngoại thất, chúng đảm bảo lớp hoàn thiện tổng thể gọn gàng, bền và đẹp.",
    technicalSpecs: [
      { label: "Loại", value: "Sơn kẻ chỉ / lớp phủ trong suốt / lớp lót giữa đàn hồi và các sản phẩm tương ứng khác" },
      { label: "Độ bóng", value: "Lớp phủ trong suốt có loại bóng và mờ; sơn kẻ chỉ chủ yếu mờ" },
      { label: "VOC", value: "Công thức gốc nước thân thiện môi trường, VOC thấp" },
      { label: "Độ che phủ", value: "Tùy chức năng (lớp phủ tập trung vào bảo vệ trong suốt; sơn kẻ chỉ vào vẽ đường và che phủ)" },
      { label: "Bề mặt phù hợp", value: "Hệ thống sơn hiệu ứng đá / vân, tường gạch-bê tông, hệ thống cách nhiệt ngoài nhà EIFS" },
      { label: "Định mức lý thuyết", value: "Lớp phủ khoảng 0.12-0.15 kg/m² hoặc 8-15 m² mỗi lít; kẻ chỉ khoảng 0.2-0.25 kg/m² (thay đổi theo sản phẩm)" },
    ],
    manufacturing: [
      "Lớp phủ trong suốt dựa trên polymer nhũ tương acrylic nguyên chất với công thức gốc nước thân thiện môi trường, mang lại cho màng một lớp bảo vệ trong vắt",
      "Dòng lớp phủ mang đến hiệu năng chống chịu thời tiết, chống bám bẩn và chống ố trắng, chặn sự bám dính của chất gây bẩn và tự làm sạch nhờ mưa để bảo vệ lớp hoàn thiện bên dưới",
      "Sơn kẻ chỉ được thiết kế chuyên để kết hợp với sơn vân trang trí và sơn hiệu ứng đá, với độ bám dính và che phủ tốt cùng khả năng chống chịu thời tiết bền lâu giúp vẽ đường dễ dàng",
      "Lớp lót giữa đàn hồi dùng công thức đàn hồi acrylic, tạo họa tiết nổi ba chiều hoặc hiệu ứng mịn bằng con lăn chuyên dụng hoặc súng phun không khí nén",
      "Mỗi lô được kiểm nghiệm về độ bóng, hàm lượng chất rắn, khả năng chống chịu thời tiết và các chỉ tiêu khác, đảm bảo tương thích hệ thống và hiệu năng bền lâu với các sản phẩm phía trên và phía dưới",
    ],
    careGuide: [
      { title: "Dùng như một hệ thống", desc: "Sơn kẻ chỉ, lớp phủ trong suốt và tương tự phải được kết hợp với hệ thống sơn hiệu ứng đá / vân tương ứng và thi công theo trình tự quy định để phát huy tác dụng." },
      { title: "Đóng rắn lớp phủ", desc: "Khi lớp phủ trong suốt đóng rắn, khả năng chống chịu thời tiết và chống bẩn cải thiện rõ rệt; tự làm sạch thường ngày nhờ mưa là đủ — tránh bàn chải cứng và dung môi mạnh." },
      { title: "Bảo trì đường chỉ", desc: "Nếu các đường chia có dấu hiệu mòn, vẽ lại và sửa bằng cùng mã sơn kẻ chỉ để giữ biên dạng tổng thể gọn gàng." },
      { title: "Khô hoàn toàn", desc: "Để đủ khoảng cách thời gian giữa mỗi bước của lớp giữa và lớp phủ, chờ đến khi khô hoàn toàn trước lượt tiếp theo để tránh bong tróc và ố trắng." },
    ],
    installation: [
      "Xác định trình tự: dựa trên hệ thống sơn hiệu ứng đá / vân, xác định vị trí của kẻ chỉ, lớp giữa và lớp phủ trong trình tự tổng thể",
      "Lớp lót giữa đàn hồi: thi công lớp lót giữa đàn hồi lên sơn lót, dùng con lăn chuyên dụng để tạo biên dạng hoặc súng phun không khí nén để đạt hiệu ứng mịn / họa tiết nổi",
      "Kẻ chỉ: theo thiết kế, vẽ bằng sơn kẻ chỉ dọc theo các đường chia đã chừa, giữ cho tường được phân khối gọn gàng, phân lớp rõ ràng",
      "Bảo vệ bằng lớp phủ: khi lớp hoàn thiện đã khô hoàn toàn, thi công một đến hai lớp phủ trong suốt, chọn bóng / mờ theo yêu cầu, để tăng khả năng chống chịu thời tiết và chống bẩn",
      "Đóng rắn màng: để đủ khoảng cách thời gian giữa mỗi bước, giữ môi trường thi công thông thoáng và khô ráo, và tránh độ ẩm cao và thời tiết mưa",
    ],
    certifications: [
      "Tuân thủ các tiêu chuẩn quốc gia tương ứng (GB) về giới hạn chất độc hại trong sơn phủ trang trí kiến trúc",
      "Nhãn Môi trường Trung Quốc (十环) / công thức gốc nước thân thiện môi trường VOC thấp",
      "Hệ thống chất lượng toàn cầu AkzoNobel + hệ thống quản lý chất lượng và môi trường ISO 9001 / ISO 14001",
      "Lớp phủ, lớp giữa và các sản phẩm tương tự cung cấp dữ liệu kỹ thuật về chống chịu thời tiết và chống bám bẩn",
      "Cung cấp cam kết bảo hành dự án, kèm báo cáo thử nghiệm sản phẩm",
    ],
    packaging: [
      { label: "Quy cách đóng gói", value: "Chủ yếu trong thùng (ví dụ 20L / 20KG / 25KG); theo nhãn sản phẩm" },
      { label: "Số lượng đặt tối thiểu", value: "Theo container / pallet; có thể đặt kết hợp với hệ thống sơn hiệu ứng đá / vân" },
      { label: "Hạn sử dụng", value: "Thường khoảng 12 tháng khi chưa mở nắp; xem nhãn trên thùng" },
      { label: "Bảo quản", value: "Bảo quản kín ở nơi khô ráo, thoáng mát, tránh ánh nắng và sương giá; dùng ngay sau khi mở" },
      { label: "Mẫu", value: "Có sẵn mẫu nhỏ để chạy thử hệ thống nhằm xác nhận độ bóng lớp phủ và hiệu ứng kẻ chỉ" },
    ],
    whyChoose: [
      { icon: "💎", title: "Lớp phủ trong vắt", desc: "Lớp phủ trong suốt bảo vệ màu bằng sự trong suốt, tôn lên hiệu ứng lớp phủ bên dưới và tăng khả năng chống chịu thời tiết và chống bẩn." },
      { icon: "🌧️", title: "Chống ố trắng tự làm sạch", desc: "Chống ố trắng trong dải nhiệt độ rộng và tự làm sạch nhờ mưa, giữ lớp hoàn thiện đúng màu thật lâu dài." },
      { icon: "📐", title: "Kẻ chỉ gọn gàng", desc: "Sơn kẻ chỉ vẽ nên các đường chia, giữ cho tường hiệu ứng đá và tường vân phân lớp rõ ràng và phân khối gọn gàng." },
      { icon: "🧱", title: "Lớp lót giữa đàn hồi", desc: "Lớp lót giữa đàn hồi chống nứt và dựng biên dạng, bắc cầu chuyển tiếp bền lâu giữa sơn lót và lớp phủ." },
      { icon: "🧩", title: "Tương thích hệ thống", desc: "Phối hợp nhịp nhàng với các hệ thống hiệu ứng đá, vân và ngoại thất cho trình tự đầu cuối tới đầu cuối, bền hơn." },
    ],
    projectShowcase: [
      "Kẻ chỉ và bảo vệ bằng lớp phủ cho mặt đứng sơn hiệu ứng đá / vân",
      "Dự án tạo biên dạng tổng thể cho hoàn thiện hiệu ứng đá trong bối cảnh thương mại và khách sạn cao cấp",
      "Lớp nền lót giữa đàn hồi ngoại thất và công việc tạo biên dạng họa tiết nổi",
      "Lớp giữa và lớp phủ tương ứng cho hệ thống cách nhiệt ngoài nhà EIFS",
    ],
    faq: [
      { q: "Lớp phủ trong suốt có cần thiết không?", a: "Khuyến nghị phủ lớp. Nó cải thiện đáng kể khả năng chống chịu thời tiết, chống bám bẩn và chống ố trắng của sơn hiệu ứng đá / vân, giữ màu bền lâu hơn." },
      { q: "Sơn kẻ chỉ dùng để làm gì?", a: "Nó được dùng để vẽ dọc theo các đường chia đã chừa trên tường hiệu ứng đá và tường vân, giữ cho tường được phân khối gọn gàng và phân lớp rõ ràng, đồng thời tôn lên biên dạng tổng thể." },
      { q: "Chọn bóng hay mờ cho lớp phủ trong suốt?", a: "Chọn theo hiệu ứng thiết kế: muốn vẻ trong, sáng thì chọn bóng; muốn kết cấu êm dịu thì chọn mờ; cả hai đều có thể phối trong hệ thống." },
      { q: "Lớp lót giữa đàn hồi dùng ở bước nào?", a: "Nó được thi công lên sơn lót và bên dưới lớp phủ, mang lại một lớp chuyển tiếp đàn hồi chống nứt, và có thể tạo họa tiết nổi ba chiều bằng con lăn chuyên dụng." },
      { q: "Số lượng đặt tối thiểu và thời gian giao hàng là bao nhiêu?", a: "Đặt theo container / pallet, kết hợp với hệ thống sơn hiệu ứng đá / vân; thời gian giao hàng được xác nhận theo từng đơn." },
    ],
  },
};

export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DULUX_PRO_SERIES_META[seriesOriginal.trim()] || DULUX_PRO_SERIES_META.interior;
}
