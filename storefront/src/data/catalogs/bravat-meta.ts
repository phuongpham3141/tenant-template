/**
 * Metadata cho Bravat — nội dung văn bản phong phú cho các trang chi tiết sản phẩm.
 * Lập chỉ mục theo seriesOriginal: faucet (vòi và sen) / shower (sen tắm) / basin (xi-phông chậu rửa) /
 * toilet (bồn cầu) / bathtub (bồn tắm) / cabinet (tủ phòng tắm) / accessory (phụ kiện phòng tắm).
 * Nguồn: bravathcm.com (nhà phân phối chính thức của Bravat tại Việt Nam) + bravat.com + thông số kỹ thuật thiết bị vệ sinh chung của ngành.
 * Bravat thuộc Roman Dietsche (Đức) — hơn 145 năm lịch sử (thành lập năm 1873, tại vùng Rừng Đen Black Forest).
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

/* ── Nội dung dùng chung ở cấp thương hiệu (tái sử dụng cho hầu hết các dòng, một số dòng ghi đè riêng) ─────────── */

const BRAND_MFG = [
  "Kế thừa hơn 145 năm tinh hoa sản xuất của Roman Dietsche từ nước Đức — khởi nguồn từ một xưởng gia đình tại vùng Rừng Đen Black Forest năm 1873, mang tiêu chuẩn thiết bị vệ sinh khắt khe của châu Âu vào từng chi tiết linh kiện",
  "Thân vòi chủ yếu được đúc trọng lực nguyên khối từ đồng thau ít chì, sau đó tiện và phay CNC, đánh bóng rung, mạ điện qua nhiều công đoạn, bảo đảm thân đồng đặc chắc và bề mặt sáng bóng như gương",
  "Lõi van sử dụng lõi sứ đĩa gốm từ các thương hiệu như Fluhs và Kerox, kết hợp đầu sục Neoperl, cho thao tác mượt mà và dòng nước mềm mại, ổn định, tiết kiệm",
  "Lớp hoàn thiện bề mặt đa dạng từ mạ crôm bóng, mạ vàng, mạ PVD niken chải, đen mờ, đen súng và nhiều màu khác, qua kiểm tra phun muối và kiểm tra độ bám dính bảo đảm chống bám bẩn, bền bỉ và không ố vàng",
  "Hỗ trợ trọn gói giải pháp phòng tắm hoàn chỉnh và tùy biến theo dự án: từ vòi và sen đến bồn cầu, chậu rửa, bồn tắm, tủ phòng tắm và phụ kiện kim khí, tất cả đều có sẵn theo bộ đồng bộ cùng một phong cách thống nhất",
];

const BRAND_CARE = [
  { title: "Vệ sinh bề mặt", desc: "Lau bằng khăn mềm thấm nước sạch hoặc dung dịch tẩy rửa trung tính, sau đó lau khô. Tuyệt đối không dùng búi thép, hay dung dịch chứa axit, kiềm hoặc hạt mài mòn, vì chúng có thể làm xước lớp mạ." },
  { title: "Bảo dưỡng lõi van", desc: "Lõi sứ đĩa gốm bền bỉ và trơn mượt. Nếu xuất hiện rò rỉ nhỏ giọt hoặc thao tác bị cứng, thông thường là do lõi van hao mòn; chỉ cần thay bằng lõi van chính hãng cùng model để khôi phục hiệu năng — không cần thay cả bộ sản phẩm." },
  { title: "Tẩy cặn đầu sục", desc: "Nếu dòng nước yếu đi hoặc tóe ra, hãy tháo đầu sục Neoperl và rửa bằng nước hoặc ngâm trong giấm trắng để loại bỏ cặn vôi, giữ cho dòng nước đều, mềm và tiết kiệm." },
  { title: "Chăm sóc trong môi trường ẩm", desc: "Phòng tắm thường xuyên ẩm ướt trong thời gian dài, vì vậy chúng tôi khuyến nghị thông gió tốt và thường xuyên lau khô nước đọng trên bề mặt. Việc này giúp làm chậm hiệu quả sự tích tụ cặn vôi và kéo dài cả độ bóng lẫn tuổi thọ sử dụng." },
];

const BRAND_INSTALL = [
  "Trước khi lắp đặt, xác nhận kiểu lắp dựa trên số lỗ và khoảng cách của sản phẩm (lắp trên mặt bàn, đặt nổi, âm tường hoặc gắn tường), và kiểm tra kích thước lỗ trên mặt bàn hoặc trên tường",
  "Khuyến nghị lắp đặt chuyên nghiệp bởi thợ ống nước có tay nghề. Kết nối các dây cấp nước bọc thép không gỉ (thường là G1/2 hoặc G3/4) với ren đúng chuẩn, quấn băng tan ren đúng cách để chống rò rỉ",
  "Trước khi mở nước, xả đường ống để loại bỏ cặn bẩn và mạt sắt, sau đó mới kết nối vòi hoặc thân van nhằm tránh sạn cát kẹt vào lõi van làm ảnh hưởng đến thao tác và độ kín",
  "Kiểm tra áp suất làm việc khuyến nghị (thường khoảng 0,1–0,3MPa), xác nhận đường cấp nóng và lạnh được bố trí đúng vị trí, và sau khi mở nước, kiểm tra từng mối nối về độ kín và độ thông thoáng của dòng chảy",
  "Khi lắp các lớp hoàn thiện đặc biệt như mạ vàng, niken chải hay đen mờ, hãy làm việc với một tấm khăn mềm lót bên dưới để tránh trầy xước do dụng cụ va trực tiếp vào bề mặt",
];

const BRAND_CERTS = [
  "Chứng nhận tiết kiệm nước — thiết kế xả kép/giới hạn lưu lượng kết hợp đầu sục Neoperl đáp ứng các tiêu chuẩn tiết kiệm nước phổ biến của thị trường",
  "Men gốm — gốm sứ vệ sinh được nung ở nhiệt độ cao với lớp men đặc, mịn, chống bám bẩn, dễ lau chùi và chống ố",
  "Thân van đồng thau — thân đồng thau ít chì với lõi sứ đĩa gốm, đáp ứng các yêu cầu chung đối với kim khí vệ sinh tiếp xúc với nước uống",
  "Độ bám dính lớp mạ — lớp hoàn thiện bề mặt vượt qua kiểm tra phun muối và độ bám dính, có khả năng chống ăn mòn, không ố vàng và chịu được việc lau chùi hằng ngày",
  "Thời hạn bảo hành — toàn bộ sản phẩm và lõi van được bảo hành theo chính sách của thương hiệu, với hỗ trợ hậu mãi qua các kênh chính hãng được ủy quyền",
];

const BRAND_PACK = [
  { label: "Hình thức cung cấp", value: "Cung cấp theo từng mã SKU riêng lẻ, đồng thời có thể lắp ghép thành bộ hoàn chỉnh trong giải pháp phòng tắm trọn gói" },
  { label: "Phụ kiện kèm theo", value: "Dây cấp nước bọc thép không gỉ, đầu sục, vít lắp đặt và các chi tiết làm kín (tùy theo từng mã SKU cụ thể)" },
  { label: "Bảo vệ thùng carton ngoài", value: "Hộp màu riêng có lót xốp/EPE bên trong, màng bảo vệ trên các chi tiết mạ để chống trầy, và thùng carton ngoài bọc màng co, xếp pallet" },
  { label: "Tài liệu đi kèm", value: "Hướng dẫn lắp đặt, giấy chứng nhận hợp chuẩn và tem nhận diện hàng chính hãng, giúp dễ dàng kiểm tra và lắp đặt" },
  { label: "Thị trường Việt Nam", value: "Showroom tại Hà Nội và Đà Nẵng, do nhà phân phối chính thức cung cấp, có tư vấn dự án và hỗ trợ giao hàng" },
];

/* ── Metadata theo từng dòng sản phẩm ─────────────────────────────────────────── */

export const BRAVAT_SERIES_META: Record<string, SeriesMeta> = {
  faucet: {
    story:
      "Dòng vòi và sen Bravat là nơi triều đại thiết bị phòng tắm danh giá của Đức thể hiện tay nghề tinh xảo nhất — một chiếc vòi, từ đồng thau nóng chảy đến lớp mạ sáng bóng như gương, kết tinh hơn một thế kỷ tận tâm với dòng nước và cảm giác sử dụng. Đồng thau ít chì đúc trọng lực nguyên khối mang lại độ chắc tay, đặc và bề thế, lõi sứ đĩa gốm giúp chuyển đổi giữa nóng và lạnh mượt như lụa, còn đầu sục Neoperl hòa từng dòng nước thành một dòng chảy mềm mại, không bắn tóe. Từ mạ crôm bóng và mạ vàng đến các phiên bản xa xỉ đính pha lê Swarovski, đây vừa là công cụ điều khiển nước vừa là một món trang sức trên bàn lavabo. Được tạo ra cho những người tin rằng chi tiết làm nên phong cách, và xem mỗi lần vặn vòi mỗi ngày như một nghi thức.",
    heritage:
      "Bravat được phân phối tại hơn một chục thị trường gồm Đức, Hoa Kỳ, Trung Quốc, Brazil, Úc, Singapore và Việt Nam, với những chiếc vòi cao cấp hiện diện trong không gian khách sạn bốn và năm sao như Marriott và Hyatt. Dòng máu Đức bắt nguồn từ vùng Rừng Đen Black Forest, kết hợp với hệ thống cung ứng toàn cầu, mang đến cho vòi Bravat cả chất lượng châu Âu lẫn khả năng giao hàng đáng tin cậy.",
    technicalSpecs: [
      { label: "Loại", value: "Vòi bồn tắm lắp mặt bàn/đặt nổi, vòi chậu rửa, vòi sen tắm (loại nhiều lỗ tách rời và một lỗ)" },
      { label: "Chất liệu thân", value: "Đồng thau ít chì đúc trọng lực nguyên khối với nắp đồng; một số tay gạt bằng hợp kim kẽm" },
      { label: "Lõi van", value: "Lõi sứ đĩa gốm Fluhs / Kerox / Yiming (G3/4, v.v.), có bộ chia dòng xoay" },
      { label: "Lưu lượng nước", value: "Vòi xả khoảng 20L/phút, sen khoảng 12L/phút @ 0,3MPa" },
      { label: "Lớp hoàn thiện bề mặt", value: "Mạ crôm bóng / mạ vàng / mạ PVD niken chải / đen vàng / đen súng" },
      { label: "Phụ kiện kèm theo", value: "Đầu sục Neoperl, dây cấp nước bọc thép không gỉ, vòi sen cầm tay (tùy theo model)" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🇩🇪", title: "Hơn 145 năm Đức", desc: "Mang trong mình dòng máu sản xuất Rừng Đen Black Forest của Roman Dietsche, với tiêu chuẩn châu Âu chi phối chất lượng của từng chiếc vòi." },
      { icon: "🔧", title: "Lõi sứ đĩa gốm", desc: "Lõi sứ gốm Fluhs/Kerox vận hành mượt mà với độ bền lâu dài; nếu phát sinh rò rỉ, chỉ cần thay lõi van là mới như ban đầu." },
      { icon: "💧", title: "Mềm mại, tiết kiệm nước", desc: "Đầu sục Neoperl hòa thêm không khí cho dòng nước mềm mại, không bắn tóe, cân bằng giữa cảm giác dễ chịu và hiệu năng tiết kiệm nước." },
      { icon: "💎", title: "Lớp hoàn thiện xa xỉ", desc: "Từ mạ crôm bóng đến mạ vàng, niken chải và đen vàng, cùng các phiên bản pha lê Swarovski làm bừng sáng bàn lavabo." },
      { icon: "🛡️", title: "Cốt lõi đồng thau", desc: "Thân đồng thau ít chì đúc trọng lực nguyên khối đặc chắc và chống ăn mòn, luôn như mới ngay cả trong phòng tắm ẩm ướt." },
    ],
    projectShowcase: ["Phòng tắm phòng khách sạn bốn và năm sao (Marriott, Hyatt Đà Nẵng)", "Phòng tắm chính của căn hộ cao cấp và biệt thự", "Khu nghỉ dưỡng và trung tâm spa", "Phòng tắm nhà ở hoàn thiện trọn gói"],
    faq: [
      { q: "Thân vòi Bravat làm bằng chất liệu gì?", a: "Tuyệt đại đa số sử dụng thân đồng thau ít chì đúc trọng lực nguyên khối kết hợp lõi sứ đĩa gốm, với bề mặt hoàn thiện mạ crôm bóng, mạ vàng, niken chải hoặc đen tùy theo dòng — chắc chắn, chống ăn mòn và bắt mắt." },
      { q: "Vòi nhiều lỗ tách rời và vòi một lỗ khác nhau như thế nào?", a: "Vòi tách rời (lắp rộng) có vòi xả và tay gạt nóng lạnh lắp thành các bộ phận riêng biệt, phù hợp với mặt bàn rộng và mặt bồn tắm với vẻ ngoài ấn tượng; vòi một lỗ/ba lỗ gọn gàng hơn và vừa với chậu rửa tiêu chuẩn. Hãy chọn dựa trên số lỗ." },
      { q: "Tôi nên làm gì nếu vòi nhỏ giọt hoặc thao tác bị cứng?", a: "Điều này thường do lõi sứ gốm hao mòn; thay bằng lõi van chính hãng cùng model sẽ khôi phục thao tác mượt mà, không cần thay cả bộ. Nếu đầu sục bị tắc, hãy tháo ra vệ sinh để loại bỏ cặn vôi." },
      { q: "Các phiên bản đính pha lê hoặc mạ vàng có bị phai màu khi dùng hằng ngày không?", a: "Với sử dụng và vệ sinh bình thường theo hướng dẫn bảo dưỡng, chúng sẽ không phai màu; chỉ cần tránh các chất tẩy rửa có tính axit, kiềm và mài mòn, đồng thời lau khô vết nước kịp thời để giữ độ bóng lâu dài." },
      { q: "Áp suất làm việc khuyến nghị là bao nhiêu?", a: "Thường khuyến nghị 0,1–0,3MPa; áp suất quá thấp ảnh hưởng đến cảm giác sen tắm, còn nếu quá cao chúng tôi khuyến nghị lắp van giảm áp để bảo đảm dòng chảy ổn định và tuổi thọ làm kín lâu dài." },
    ],
  },

  shower: {
    story:
      "Dòng sen tắm Bravat biến thói quen tắm rửa hằng ngày thành một khoảnh khắc được chăm sóc. Dòng sản phẩm gồm cả sen tắm thông thường cho nước đổ xuống như mưa lẫn ghế tắm có sen cầm tay được thiết kế riêng cho người cao tuổi và người hạn chế vận động — khung thép không gỉ SUS304 chắc chắn và chống gỉ, mặt ghế bằng nhựa kỹ thuật chống tia UV không phai màu theo thời gian, cùng mô-đun cảm biến ánh sáng tích hợp và sen cầm tay năm chế độ mang lại sự an toàn và phẩm giá song hành. Đây là sự ấm áp hiếm thấy ở thiết bị phòng tắm Đức: trong khi theo đuổi sự tinh tế, sản phẩm còn lồng ghép khả năng tiếp cận và sự quan tâm. Phù hợp với mọi gia đình và mọi không gian mong muốn tất cả thành viên ở mọi lứa tuổi đều có thể tắm rửa an tâm.",
    heritage:
      "Được hậu thuẫn bởi mạng lưới phân phối toàn cầu và uy tín chất lượng Đức của Bravat, các sản phẩm sen tắm và hỗ trợ tắm rửa được sử dụng rộng rãi trong khách sạn, căn hộ và các không gian thân thiện với người cao tuổi. Bạn có thể trực tiếp trải nghiệm các giải pháp sen tắm tiếp cận tại showroom Hà Nội và Đà Nẵng ở Việt Nam.",
    technicalSpecs: [
      { label: "Loại", value: "Sen cầm tay, bộ sen, ghế tắm có sen cầm tay (hỗ trợ tắm rửa)" },
      { label: "Chất liệu khung", value: "Thép không gỉ SUS304, chắc chắn và chống gỉ" },
      { label: "Mặt ghế/Tay vịn", value: "Nhựa kỹ thuật ASA UMG chống tia UV, không phai màu và dễ lau chùi" },
      { label: "Sen cầm tay", value: "Phun năm chế độ bằng nhựa ABS, kèm dây sen dài" },
      { label: "Mô-đun chức năng", value: "Mô-đun điện tử cảm biến ánh sáng tích hợp (model ghế tắm)" },
      { label: "Kích thước tham khảo", value: "Ghế tắm khoảng 728 × 176 × 1230 mm" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Tẩy cặn bát sen", desc: "Khi các lỗ phun bị bám cặn, hãy chà các đầu phun silicon bằng ngón tay hoặc bàn chải mềm, hoặc tháo bát sen ra ngâm trong giấm trắng, dòng nước sẽ trở lại đều đặn." },
      { title: "Chăm sóc dây sen", desc: "Sau khi dùng, hãy cất dây sen ở trạng thái thẳng và tránh để gập và kéo căng kéo dài, việc này giúp kéo dài tuổi thọ dây sen bọc thép không gỉ và ngăn nứt vỡ, rò rỉ." },
      { title: "Vệ sinh ghế tắm", desc: "Lau mặt ghế và tay vịn bằng dung dịch tẩy rửa trung tính rồi lau khô; định kỳ kiểm tra các vít khung đã siết chặt để bảo đảm chịu lực an toàn." },
      { title: "Bảo dưỡng chống trượt", desc: "Giữ khu vực hỗ trợ tắm rửa sạch sẽ và chống trượt, đồng thời sử dụng kết hợp với tay vịn để mang lại điểm tựa vững chắc hơn cho người cao tuổi và người hạn chế vận động." },
    ],
    installation: [
      "Với bộ sen, hãy xác định độ cao thanh trượt/giá đỡ dựa trên vị trí đầu cấp nước trên tường, chừa khoảng trống để bảo trì và kết nối nóng/lạnh",
      "Lắp đúng các vòng đệm làm kín ở hai đầu dây sen cầm tay và vặn chặt bằng tay đến khi không rò rỉ, tránh dùng lực quá mạnh làm hỏng ren",
      "Lắp ghế tắm cần tìm điểm chịu lực chắc chắn trong tường và cố định thật chắc bằng nở ốc kèm theo để bảo đảm mặt ghế chịu được trọng lượng",
      "Trước khi mở nước, xả đường ống để loại bỏ cặn bẩn, sau đó kiểm tra các mối nối dây sen và dòng nước sen thông thoáng, không rò rỉ",
      "Đối với không gian thân thiện với người cao tuổi, chúng tôi khuyến nghị quy hoạch đồng thời tay vịn và sàn chống trượt để tạo nên lối tắm tiếp cận hoàn chỉnh",
    ],
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🚿", title: "Cảm giác nước dễ chịu", desc: "Sen cầm tay năm chế độ chuyển đổi giữa các kiểu phun, kết hợp cảm giác sục khí và mưa rào để buổi tắm thêm thư thái." },
      { icon: "♿", title: "Chăm sóc tiếp cận", desc: "Ghế tắm có sen cầm tay được thiết kế riêng cho người cao tuổi và người hạn chế vận động, đạt được cả sự an toàn lẫn phẩm giá." },
      { icon: "🛡️", title: "Khung thép không gỉ", desc: "Khung SUS304 chắc chắn và chống gỉ, chịu lực bền bỉ về lâu dài ngay cả trong môi trường sen tắm ẩm ướt." },
      { icon: "☀️", title: "Chống tia UV, không phai màu", desc: "Mặt ghế và tay vịn bằng nhựa kỹ thuật ASA UMG chống tia cực tím và không bị ố vàng hay phai màu khi sử dụng lâu dài." },
      { icon: "💡", title: "Chi tiết tinh tế", desc: "Những thiết kế hướng tới con người như mô-đun điện tử cảm biến ánh sáng tích hợp mở rộng sự tinh tế kiểu Đức đến từng khoảnh khắc của buổi tắm." },
    ],
    projectShowcase: ["Phòng tắm cơ sở chăm sóc và nhà ở thân thiện với người cao tuổi", "Phòng khách sạn tiếp cận và khu sen tắm công cộng", "Phòng tắm bệnh viện và trung tâm phục hồi chức năng", "Phòng tắm gia đình hướng tới chăm sóc người cao tuổi"],
    faq: [
      { q: "Ghế tắm có sen cầm tay phù hợp với ai?", a: "Sản phẩm được thiết kế riêng cho người cao tuổi, phụ nữ mang thai, người hồi phục sau phẫu thuật và người hạn chế vận động, mang lại tư thế tắm ngồi ổn định và điểm bám an toàn để những người cần hỗ trợ cũng có thể tự chủ trong phẩm giá." },
      { q: "Dòng nước sen yếu đi có phải dấu hiệu hỏng không?", a: "Thường là do cặn vôi tích tụ trong các lỗ phun. Đầu phun silicon có thể vệ sinh bằng cách chà ngón tay, còn bát sen kim loại có thể tháo ra ngâm giấm trắng để tẩy cặn; sau khi vệ sinh, dòng nước sẽ trở lại đều đặn như trước." },
      { q: "Lắp ghế tắm có yêu cầu gì về tường không?", a: "Phải cố định vào tường chịu lực chắc chắn bằng nở ốc kèm theo; tường ngăn nhẹ cần bổ sung tấm gia cố phía sau trước để bảo đảm mặt ghế và tay vịn chịu lực ổn định cho trọng lượng người lớn." },
      { q: "Bao lâu thì cần thay dây sen?", a: "Dây sen bọc thép không gỉ chính hãng có tuổi thọ dài; nếu thấy lớp ngoài phồng lên, bị gỉ hoặc các mối nối rò rỉ, hãy thay ngay để tránh nứt vỡ. Việc cất giữ ở trạng thái thẳng hằng ngày sẽ giúp kéo dài tuổi thọ." },
    ],
  },

  basin: {
    story:
      "Dòng chậu rửa Bravat và phụ kiện tập trung vào những bộ phận không nhìn thấy nhưng quan trọng nhất của khu vực lavabo — xi-phông xả nhấn. Cơ cấu xả nhấn nhìn có vẻ đơn giản, nhưng phải luôn trơn mượt, kín và không hôi qua những lần đóng mở hằng ngày. Bravat dựa trên thân đồng thau cao cấp kết hợp giỏ lọc thép không gỉ SUS304 để chống gỉ, chống ăn mòn và bền bỉ lâu dài trong môi trường ẩm; những lớp hoàn thiện như mạ crôm bóng, mạ crôm và vàng hồng khiến ngay cả chiếc xi-phông nhỏ bé này cũng trở thành điểm nhấn hoàn thiện trên chậu rửa. Sản phẩm dành cho những người thấu hiểu rằng 'sự sang trọng ẩn trong chi tiết' — muốn ngay cả bộ xả cũng được chế tác đẹp đẽ và an tâm khi sử dụng.",
    heritage:
      "Là phụ kiện then chốt trong giải pháp phòng tắm hoàn chỉnh của Bravat, xi-phông chậu rửa được kết hợp rộng rãi với chậu của thương hiệu và chậu của bên thứ ba, hiện diện tại khách sạn, căn hộ cao cấp và nhà ở hoàn thiện trọn gói. Tiêu chuẩn chất lượng Đức bảo đảm độ kín và độ bền của từng bộ xi-phông.",
    technicalSpecs: [
      { label: "Loại", value: "Xi-phông chậu rửa xả nhấn, có loại kèm hoặc không kèm lỗ tràn" },
      { label: "Chất liệu thân", value: "Đồng thau cao cấp, một số loại có giỏ lọc thép không gỉ SUS304" },
      { label: "Cơ cấu xả", value: "Xả nhấn, thoát nước nhanh với chống trào ngược kín" },
      { label: "Lớp hoàn thiện bề mặt", value: "Mạ crôm bóng / mạ crôm / vàng hồng, v.v." },
      { label: "Chậu tương thích", value: "Có sẵn các model cho cả chậu có lỗ tràn và chậu không lỗ tràn" },
      { label: "Hiệu năng", value: "Chống trào ngược, chống rò rỉ, chống hôi và chống ăn mòn trong môi trường ẩm" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Vệ sinh hằng ngày", desc: "Lau các phần lộ ra của xi-phông bằng khăn ẩm và dung dịch tẩy rửa trung tính, sau đó lau khô; tránh các chất tẩy rửa mài mòn có thể làm xước lớp mạ." },
      { title: "Loại bỏ cặn trong giỏ lọc", desc: "Định kỳ tháo hoặc vặn giỏ lọc ra để loại bỏ tóc và cặn bẩn, giữ cho việc thoát nước thông thoáng và giảm tắc nghẽn, mùi hôi." },
      { title: "Chăm sóc làm kín", desc: "Nếu nút nhấn bật lại bị cứng hoặc khả năng làm kín suy giảm, hãy vệ sinh lõi xả nhấn và bôi một loại dầu bôi trơn chuyên dụng cho phòng tắm để khôi phục cảm giác." },
      { title: "Ngăn ngừa mùi hôi", desc: "Sử dụng kết hợp với bẫy nước hình S/P để chặn mùi cống; nếu lâu không sử dụng, hãy châm thêm nước vào phễu thoát sàn/bẫy nước để duy trì lớp nước chặn mùi." },
    ],
    installation: [
      "Chọn model tương ứng dựa trên việc chậu có lỗ tràn hay không (model có lỗ tràn giữ lại rãnh tràn và không thể dùng thay thế cho nhau)",
      "Trong quá trình lắp đặt, bôi keo làm kín hoặc lắp vòng đệm giữa đáy chậu và mặt bích xi-phông, đồng thời siết đai ốc khóa để bảo đảm làm kín không rò rỉ",
      "Căn chỉnh ống đuôi xi-phông với bẫy nước và mối nối thoát nước trên tường/sàn, bảo đảm khoảng cách hợp lý và độ dốc thông thoáng",
      "Sau khi lắp đặt, mở nước thử xem nút nhấn xả có hoạt động trơn tru không, thoát nước có nhanh không và các mối nối có rò rỉ không",
      "Khi lắp các lớp hoàn thiện đặc biệt (như vàng hồng), hãy làm việc với tấm khăn mềm lót bên dưới để tránh dấu vết do dụng cụ va vào bề mặt",
    ],
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🔘", title: "Xả nhấn một chạm", desc: "Cơ cấu xả nhấn đóng mở trơn tru, thoát nước nhanh và làm kín đáng tin cậy — tạm biệt sự lích kích của loại cần kéo." },
      { icon: "🛡️", title: "Đồng thau chống ăn mòn", desc: "Thân đồng thau cao cấp chống gỉ và chống ăn mòn trong phòng tắm ẩm ướt, bền hơn nhiều so với xi-phông nhựa." },
      { icon: "🧽", title: "Dễ vệ sinh, chống hôi", desc: "Giỏ lọc SUS304 giúp dễ dàng loại bỏ tóc và cặn bẩn, kết hợp với bẫy nước chặn mùi cống hiệu quả." },
      { icon: "✨", title: "Hoàn thiện tinh tế", desc: "Từ mạ crôm bóng và mạ crôm đến vàng hồng, nhiều lớp hoàn thiện biến chi tiết thoát nước thành điểm nhấn trên bàn lavabo." },
      { icon: "🔗", title: "Tương thích linh hoạt", desc: "Đầy đủ các model có và không lỗ tràn, phù hợp với chậu của thương hiệu và đa dạng chậu của bên thứ ba." },
    ],
    projectShowcase: ["Phòng khách sạn và khu lavabo công cộng", "Khu chậu rửa căn hộ cao cấp và biệt thự", "Khu rửa của khu nghỉ dưỡng và trung tâm spa", "Phụ kiện đồng bộ cho phòng tắm nhà ở hoàn thiện trọn gói"],
    faq: [
      { q: "Tôi nên chọn xi-phông có lỗ tràn hay không lỗ tràn?", a: "Điều này phụ thuộc vào bản thân chiếc chậu: nếu có một lỗ tràn nhỏ ở phần trên của chậu, hãy chọn model có lỗ tràn (xi-phông giữ lại rãnh tràn); với chậu không có lỗ tràn, hãy chọn model không lỗ tràn. Hai loại này không thể dùng thay thế cho nhau." },
      { q: "Điều gì khiến xi-phông đồng thau tốt hơn loại nhựa?", a: "Thân đồng thau có độ bền cao, chống ăn mòn và chống gỉ, chịu lực tốt, không bị lão hóa giòn gãy trong môi trường ẩm lâu dài; bản nhựa nhẹ hơn và kinh tế hơn. Để đạt độ bền và cảm giác chất lượng, nên chọn đồng thau." },
      { q: "Tôi xử lý thế nào khi nút nhấn bật lại bị cứng?", a: "Điều này thường do bám cặn bẩn hoặc thiếu bôi trơn ở lõi xả nhấn; hãy tháo ra, dọn sạch tóc và cặn bẩn, rồi bôi dầu bôi trơn chuyên dụng cho phòng tắm để khôi phục thao tác trơn tru — không cần thay cả bộ." },
      { q: "Mùi hôi từ cống có phải do xi-phông gây ra không?", a: "Bản thân xi-phông đã chống trào ngược; mùi hôi thường đến từ việc thiếu bẫy nước hoặc lớp nước chặn mùi bị khô cạn. Vui lòng xác nhận bẫy nước hình S/P phù hợp và duy trì lớp nước chặn mùi để chặn mùi hiệu quả." },
    ],
  },

  toilet: {
    story:
      "Dòng bồn cầu Bravat là câu trả lời tối thượng của truyền thống phòng tắm Đức cho ba điều: sạch, êm và tiết kiệm nước. Từ bồn cầu một khối đặt sàn cổ điển đến bồn cầu thông minh xả xi-phông phun mạnh mẽ, Bravat sử dụng cơ chế tiết kiệm nước xả kép (thấp đến 3/4,5L) cùng công nghệ xả tống/xi-phông phun để mỗi lần xả đều dứt khoát và tiết kiệm; nắp đóng êm UF/PP đóng nhẹ nhàng và êm ái, loại bỏ sự bối rối của những chiếc nắp đập sầm. Các model thông minh cao cấp còn tích hợp chức năng điện tử, chống nước IPX4 và khả năng thích ứng dải áp suất rộng, nâng tầm trải nghiệm bồn cầu thành một trải nghiệm được công nghệ chăm sóc. Sản phẩm phù hợp với các gia đình và khách sạn hiện đại theo đuổi chất lượng sạch sẽ và trách nhiệm tiết kiệm nước, mong muốn một phòng tắm vừa hiệu quả vừa yên tĩnh.",
    heritage:
      "Gốm sứ vệ sinh Bravat được sản xuất theo tiêu chuẩn chất lượng Đức, với lớp men đặc và khả năng xả đáng tin cậy. Bồn cầu đặt sàn và bồn cầu thông minh được sử dụng rộng rãi tại khách sạn bốn và năm sao, căn hộ cao cấp và các dự án nhà ở, đồng thời được cung cấp và hỗ trợ bởi nhà phân phối chính thức tại thị trường Việt Nam.",
    technicalSpecs: [
      { label: "Loại", value: "Bồn cầu một khối đặt sàn, bồn cầu liền khối, bồn cầu thông minh không két nước" },
      { label: "Công nghệ xả", value: "Xả tống Wash Down / Xi-phông phun Jet Siphonic" },
      { label: "Lượng nước xả", value: "Xả kép 3/4,5L, 3,5/5L; model xi-phông thông minh khoảng 5,0L" },
      { label: "Đường thoát", value: "Thoát ngang P-trap (khoảng cách khoảng 180mm) / S-trap (tâm thoát khoảng 305mm)" },
      { label: "Nắp ngồi", value: "Chất liệu UF / PP, đóng êm và yên tĩnh" },
      { label: "Điện model thông minh", value: "AC220V 50Hz, khoảng 650W, chống nước IPX4, áp suất nước khoảng 0,15–0,75MPa" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Vệ sinh men", desc: "Vệ sinh bằng dung dịch tẩy rửa trung tính chuyên dụng cho bồn cầu và bàn chải mềm, tránh axit mạnh, kiềm mạnh và vật cứng gây trầy, để giữ lớp men mịn và không bám bẩn." },
      { title: "Chăm sóc nắp đóng êm", desc: "Hãy để nắp đóng êm hạ xuống tự nhiên; không ấn mạnh xuống. Nếu bản lề bị lỏng, hãy điều chỉnh hoặc thay các chi tiết giảm chấn đóng êm để khôi phục việc đóng nhẹ nhàng, yên tĩnh." },
      { title: "Bảo dưỡng model thông minh", desc: "Định kỳ vệ sinh vòi rửa và lưới lọc, và thay lõi lọc khi có thông báo; trước khi tắt nguồn hoặc không sử dụng lâu dài, hãy xả nước trong các đường ống bên trong theo hướng dẫn để chống đóng băng và đóng cặn." },
      { title: "Chi tiết két nước/bộ xả", desc: "Van cấp nước và van xả là các chi tiết hao mòn; nếu dòng nước bất thường hoặc có rò rỉ, chỉ cần thay bằng chi tiết cùng model, và kiểm tra các vòng làm kín định kỳ." },
    ],
    installation: [
      "Trước khi lắp đặt, nhất thiết phải kiểm tra kiểu đường thoát và khoảng cách của bồn cầu (P-trap khoảng 180mm / S-trap khoảng 305mm) và căn chỉnh với tâm thoát của hệ thống thoát nước",
      "Bôi keo làm kín hoặc lắp vòng đệm giữa đế bồn cầu và sàn để cố định, bảo đảm chắc chắn không lung lay, và đường thoát được làm kín chống mùi",
      "Kết nối van góc cấp nước và dây dẫn, sau khi lắp đặt, xả thử nhiều lần để kiểm tra khả năng xả, nắp đóng êm và toàn bộ các điểm làm kín",
      "Bồn cầu thông minh cần ổ cắm riêng có tiếp địa tốt, với đường dây đi theo yêu cầu chống nước để ngăn nước vào ổ cắm",
      "Với các model thông minh, hãy lắp bộ lọc kèm theo và xả đường ống trước khi mở nước để ngăn cặn bẩn làm hỏng van điện từ và vòi rửa",
    ],
    certifications: BRAND_CERTS,
    packaging: [
      { label: "Hình thức cung cấp", value: "Cung cấp dưới dạng bộ hoàn chỉnh (gồm nắp ngồi và phụ kiện) hoặc thân bồn cầu riêng, có sẵn theo bộ đồng bộ" },
      { label: "Phụ kiện kèm theo", value: "Nắp ngồi đóng êm, vít lắp đặt/nở ốc, vòng làm kín, dây cấp nước (tùy theo model)" },
      { label: "Bảo vệ thùng carton ngoài", value: "Các chi tiết gốm sứ có xốp dày cùng góc giấy tổ ong bảo vệ, chống ép và va đập, vận chuyển xếp pallet" },
      { label: "Tài liệu đi kèm", value: "Hướng dẫn lắp đặt, giấy chứng nhận hợp chuẩn; model thông minh kèm hướng dẫn điện và vận hành" },
      { label: "Thị trường Việt Nam", value: "Showroom Hà Nội và Đà Nẵng cho trải nghiệm trực tiếp, do nhà phân phối chính thức cung cấp và hỗ trợ hậu mãi" },
    ],
    whyChoose: [
      { icon: "💧", title: "Xả kép tiết kiệm nước", desc: "Xả kép thấp đến 3/4,5L tiết kiệm nước không thỏa hiệp, với lực xả vẫn dứt khoát và sạch triệt để." },
      { icon: "🌀", title: "Xả mạnh mẽ", desc: "Công nghệ xả tống và xi-phông phun kết hợp lớp men đặc xả sạch và chống bám bẩn." },
      { icon: "🤫", title: "Đóng êm yên tĩnh", desc: "Nắp đóng êm UF/PP đóng nhẹ nhàng và yên tĩnh, loại bỏ tiếng nắp đập để cả gia đình an tâm sử dụng." },
      { icon: "🤖", title: "Trải nghiệm thông minh", desc: "Model thông minh không két nước tích hợp chức năng điện tử và chống nước IPX4, nâng tầm bồn cầu thành một trải nghiệm công nghệ." },
      { icon: "🇩🇪", title: "Chất lượng Đức", desc: "Sản xuất theo tiêu chuẩn Roman Dietsche, với men và khả năng xả đáng tin cậy cùng độ bền cấp dự án khách sạn." },
    ],
    projectShowcase: ["Phòng tắm phòng khách sạn bốn và năm sao", "Căn hộ cao cấp, biệt thự và nhà ở hoàn thiện trọn gói", "Khu nghỉ dưỡng và trung tâm spa", "Dự án phụ trợ thương mại và nhà ở"],
    faq: [
      { q: "Tôi nên xác nhận điều gì trước khi mua bồn cầu?", a: "Điều quan trọng nhất là kiểu đường thoát và khoảng cách: P-trap ngang thường khoảng 180mm, còn S-trap thoát sàn khoảng 305mm. Nhất thiết phải đo chính xác tâm thoát trước khi chọn, nếu không sẽ không thể căn chỉnh để lắp đặt." },
      { q: "Lắp bồn cầu thông minh có yêu cầu đặc biệt gì không?", a: "Cần một ổ cắm chống nước riêng có tiếp địa tốt, một bộ lọc lắp ở phía cấp nước, và đường dây đi theo yêu cầu chống nước IPX4; chúng tôi khuyến nghị lắp đặt chuyên nghiệp và xả đường ống trước khi mở nước." },
      { q: "Xả kép 3/4,5L có bị xả không sạch không?", a: "Không. Bravat sử dụng cơ chế xả xi-phông phun/xả tống kết hợp lớp men đặc để tối ưu đường xả — lần xả nhỏ dùng cho nhu cầu hằng ngày và lần xả lớn xử lý tải nặng, vừa tiết kiệm nước vừa xả triệt để." },
      { q: "Nắp đóng êm có thể thay riêng nếu hỏng không?", a: "Có. Nắp ngồi và các chi tiết giảm chấn đóng êm là các chi tiết hao mòn; chỉ cần mua và thay cùng model theo mã số chi tiết, không cần thay cả chiếc bồn cầu." },
      { q: "Có thể chuyển đổi P-trap sang S-trap không?", a: "Một số model có thể chuyển từ thoát ngang sang thoát sàn bằng phụ kiện chuyển đổi chuyên dụng (như P60391N); vui lòng tham khảo hướng dẫn sản phẩm để xác nhận liệu có hỗ trợ hay không và khoảng cách sau khi chuyển đổi." },
    ],
  },

  bathtub: {
    story:
      "Phụ kiện dòng bồn tắm Bravat bảo vệ những chi tiết an toàn và thoát nước dễ bị bỏ qua nhất trong lúc tắm — xi-phông bồn tắm bằng đồng thau, tay vịn và bộ xả. Một bộ xả chất lượng phải luôn kín, trơn mượt và thoát sạch qua những lần xả đầy và xả cạn lặp đi lặp lại; một tay vịn đồng thau chắc chắn là điểm tựa vững vàng bạn nương vào khi bước vào và ra khỏi bồn. Bravat chế tác thân từ đồng thau đặc để chống gỉ và chống ăn mòn cùng khả năng chịu lực bền bỉ trong môi trường ẩm; bề mặt mạ crôm bóng và những đường nét tinh tế mang đến cho cả những chi tiết chức năng một dáng vẻ sang trọng. Sản phẩm dành cho những người xem việc tắm là một nghi thức thư giãn và cũng quan tâm đến sự an toàn và chất lượng.",
    heritage:
      "Là một phần trong giải pháp phòng tắm hoàn chỉnh của Bravat, xi-phông bồn tắm và tay vịn được kết hợp rộng rãi với bồn tắm đặt sàn và bồn tắm âm, hiện diện tại khách sạn, biệt thự và không gian spa. Tiêu chuẩn kim khí Đức bảo đảm độ tin cậy lâu dài về độ kín và khả năng chịu lực.",
    technicalSpecs: [
      { label: "Loại", value: "Xi-phông/bộ xả bồn tắm (có hoặc không lỗ tràn), tay vịn bồn tắm" },
      { label: "Chất liệu thân", value: "Đồng thau; một số chi tiết xả dùng nhựa ABS cao cấp" },
      { label: "Chiều dài xi-phông", value: "Khoảng 650mm / 900mm (tùy loại bồn và có lỗ tràn hay không)" },
      { label: "Kích thước tay vịn", value: "Khoảng 420 × 270 × 112 mm, kèm giá lắp" },
      { label: "Lớp hoàn thiện bề mặt", value: "Mạ crôm bóng / mạ crôm, chống ăn mòn và bền bỉ trong môi trường ẩm" },
      { label: "Hiệu năng", value: "Thoát nước nhanh, kín và chống rò rỉ, với tay vịn chịu lực chắc chắn, chống trượt" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Vệ sinh xi-phông", desc: "Định kỳ tháo giỏ lọc/nút xi-phông để loại bỏ tóc và cặn bẩn, giữ cho việc thoát nước thông thoáng; lau các phần lộ ra bằng khăn ẩm rồi lau khô." },
      { title: "Kiểm tra làm kín", desc: "Khi xả nước, hãy quan sát rò rỉ tại đầu tràn và mối nối xi-phông, đồng thời kịp thời thay các vòng làm kín bằng chi tiết cùng loại khi chúng cứng lại theo thời gian." },
      { title: "Chăm sóc tay vịn", desc: "Định kỳ kiểm tra các vít giá tay vịn có lỏng không và siết lại, đồng thời lau bề mặt đồng thau bằng khăn mềm để giữ khả năng chịu lực đáng tin cậy và bề mặt sáng bóng." },
      { title: "Ngăn ngừa cặn vôi và ăn mòn", desc: "Ở khu vực nước cứng, bề mặt dễ đóng cặn, vì vậy lau khô vết nước kịp thời và vệ sinh thường xuyên giúp làm chậm tích tụ cặn vôi và giữ lớp mạ sáng." },
    ],
    installation: [
      "Chọn bộ xả tương ứng dựa trên việc bồn tắm có lỗ tràn hay không và dựa trên khoảng cách, đồng thời kiểm tra kích thước lỗ ở đáy bồn",
      "Lắp vòng đệm hoặc bôi keo làm kín giữa mặt bích xi-phông và thân bồn, siết đai ốc khóa, và căn chỉnh kết nối ống tràn để bảo đảm làm kín không rò rỉ",
      "Kết nối ống đuôi xi-phông với hệ thống thoát nước/bẫy nước, bảo đảm độ dốc thông thoáng, thoát nước nhanh và lớp nước chặn mùi",
      "Tay vịn bồn tắm phải được cố định vào tường chịu lực chắc chắn và lắp thật chắc bằng nở ốc kèm theo để bảo đảm chịu lực an toàn khi bước vào và ra khỏi bồn",
      "Sau khi lắp đặt, xả đầy nước để thử thoát nước và các điểm làm kín tại từng mối nối, và xác nhận khả năng chịu lực của tay vịn trước khi đưa vào sử dụng",
    ],
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🛁", title: "Thoát nước trơn tru", desc: "Bộ xả chất lượng xả đầy và xả cạn dễ dàng với khả năng làm kín chống rò rỉ, thoát nhanh và sạch sau khi tắm mà không đọng nước." },
      { icon: "🛡️", title: "Đồng thau chống ăn mòn", desc: "Thân đồng thau đặc chống gỉ và chống ăn mòn trong môi trường bồn tắm ẩm ướt với khả năng chịu lực bền bỉ, bền hơn các chi tiết nhựa." },
      { icon: "🤝", title: "Tay vịn an toàn", desc: "Tay vịn đồng thau chắc chắn mang lại điểm tựa đáng tin cậy khi bước vào và ra khỏi bồn, giúp việc tắm an tâm và an toàn hơn." },
      { icon: "✨", title: "Chi tiết tinh tế", desc: "Bề mặt mạ crôm bóng và những đường nét sắc nét mang đến cho cả phụ kiện chức năng vẻ sang trọng của một phòng tắm hoàn chỉnh." },
      { icon: "🔗", title: "Lắp đặt linh hoạt", desc: "Có hoặc không lỗ tràn cùng nhiều chiều dài, phù hợp với bồn tắm đặt sàn và bồn tắm âm trên đa dạng kiểu lắp đặt." },
    ],
    projectShowcase: ["Khu tắm của biệt thự và căn hộ cao cấp", "Không gian bồn tắm của khu nghỉ dưỡng và trung tâm spa", "Phòng tắm phòng suite khách sạn năm sao", "Giải pháp bồn tắm thân thiện với người cao tuổi và an toàn"],
    faq: [
      { q: "Tôi nên chọn xi-phông bồn tắm 650mm hay 900mm?", a: "Điều này phụ thuộc vào kích thước bồn tắm, khoảng cách từ đầu thoát đến đầu tràn, và việc có lỗ tràn hay không. Bồn lớn hơn / loại có lỗ tràn thường dùng bản dài hơn; vui lòng chọn sau khi đo lỗ và khoảng cách của bồn." },
      { q: "Tôi nên chọn xi-phông đồng thau hay xi-phông ABS?", a: "Bản đồng thau có độ bền cao, khả năng chống ăn mòn và chịu lực tốt, cùng cảm giác chất lượng tinh tế, phù hợp cho phân khúc cao cấp và sử dụng lâu dài; bản ABS nhẹ, kinh tế và cũng chống ăn mòn. Ngân sách và định vị quyết định lựa chọn." },
      { q: "Tay vịn bồn tắm có thể lắp trên bất kỳ tường nào không?", a: "Phải cố định vào tường chịu lực chắc chắn bằng nở ốc kèm theo; các khu vực tường ngăn nhẹ hoặc gạch ốp gõ vào nghe rỗng cần bổ sung tấm gia cố phía sau trước để chịu lực ổn định cho trọng lượng người lớn." },
      { q: "Tôi nên làm gì với mùi hôi sau khi xả nước?", a: "Bản thân xi-phông đã chống trào ngược; mùi hôi chủ yếu đến từ việc thiếu bẫy nước hoặc lớp nước chặn mùi bị khô cạn. Hãy xác nhận bẫy nước phù hợp và duy trì lớp nước chặn mùi để chặn mùi, và nhớ châm thêm nước khi lâu không sử dụng." },
    ],
  },

  cabinet: {
    story:
      "Dòng tủ phòng tắm Bravat là nghệ thuật biến 'lưu trữ' thành 'trang trí mềm' — tủ gương, tủ lavabo và chậu liền khối được trình bày theo bộ đồng bộ, mang đến cho khu vực rửa một phong cách vượt trên công năng. Thân tủ sử dụng ván dán phủ melamine 16mm chống ẩm và chống xước cùng màu sắc ổn định, không phai, có sẵn các lớp hoàn thiện từ tông đen đến vân gỗ sâu và vân đá; gương thông minh chống mờ sương LED giữ cho hình phản chiếu buổi sáng luôn rõ ràng và không bị mờ sương, đá nhân tạo/đá phiến kết hợp chậu sứ có vành chống tràn, cùng bản lề và ray giảm chấn yên tĩnh DTC đóng mở trơn tru. Sản phẩm dành cho những người tin rằng 'phòng tắm cũng là bộ mặt của ngôi nhà' và muốn cả lưu trữ lẫn vẻ đẹp.",
    heritage:
      "Là một khối cốt lõi trong giải pháp phòng tắm hoàn chỉnh của Bravat, các bộ tủ phòng tắm đồng bộ thống nhất phong cách của vòi, chậu rửa và kim khí theo ngôn ngữ thiết kế Đức, được sử dụng rộng rãi tại khách sạn, căn hộ cao cấp và nhà ở hoàn thiện trọn gói, và có thể trải nghiệm trực tiếp tại showroom Hà Nội và Đà Nẵng ở Việt Nam.",
    technicalSpecs: [
      { label: "Cấu hình bộ", value: "Gương thông minh/tủ gương LED + tủ lavabo + chậu liền khối, cung cấp theo bộ đồng bộ" },
      { label: "Chất liệu tủ", value: "Ván dán phủ melamine 16mm, chống ẩm và chống xước; kính gương thân thiện môi trường 4mm" },
      { label: "Chất liệu chậu", value: "Đá nhân tạo/đá phiến kết hợp chậu sứ, có vành chống tràn" },
      { label: "Chức năng gương", value: "Đèn LED, chống mờ sương (một số model), tủ gương hai cánh có ngăn lưu trữ" },
      { label: "Kim khí", value: "Bản lề giảm chấn yên tĩnh DTC + ray trượt, kèm chân/ngăn kéo" },
      { label: "Tông màu hoàn thiện", value: "Đen / vân gỗ sâu / Lund Marble, Deep Ink Fly và các vân đá khác" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Vệ sinh tủ", desc: "Lau các tấm phủ bằng khăn mềm đã vắt ráo, tránh để lượng nước lớn đọng lại trong thời gian dài; không lau ướt nhiều lần lên dải cạnh, để tránh hư hỏng do ẩm và phồng rộp." },
      { title: "Chăm sóc chậu", desc: "Vệ sinh chậu đá nhân tạo/đá phiến/sứ bằng dung dịch tẩy rửa trung tính, tránh vết xước dao và axit, kiềm mạnh; vệ sinh vành chống tràn thường xuyên để duy trì độ kín." },
      { title: "Bảo dưỡng gương", desc: "Với gương thông minh LED, hãy xịt dung dịch lau kính chuyên dụng lên khăn rồi lau; không xịt trực tiếp lên khung; nhẹ nhàng lau khu vực màng chống mờ sương và tránh dùng vật cứng làm xước." },
      { title: "Bảo dưỡng kim khí", desc: "Định kỳ kiểm tra bản lề và ray DTC có đóng mở trơn tru không, tinh chỉnh vít khi bị lỏng, và thêm một chút dầu bôi trơn để giữ chúng yên tĩnh và mượt mà." },
    ],
    installation: [
      "Xác nhận vị trí thoát nước trên tường/sàn và van góc cấp nước trước, đồng thời bố trí các đường ống nước căn chỉnh với các lỗ của tủ và chậu",
      "Thân tủ treo tường phải được cố định vào tường chịu lực chắc chắn hoặc tấm gia cố, và treo thật chắc bằng giá đỡ/nở ốc kèm theo",
      "Kết nối xi-phông chậu và bẫy nước đúng cách với vòng làm kín đã lắp, và sau khi lắp đặt, mở nước kiểm tra không rò rỉ",
      "Với gương thông minh LED, hãy cấp nguồn/đi dây chống nước theo hướng dẫn với tiếp địa đáng tin cậy và đường dây tránh xa nước, sau đó cố định vào tường",
      "Sau khi mọi thứ đã lắp xong, điều chỉnh khe hở cánh tủ/ngăn kéo và kiểm tra bản lề và ray trơn tru, đèn gương và chức năng chống mờ sương hoạt động bình thường",
    ],
    certifications: [
      "Cốt liệu chống ẩm — ván dán phủ melamine 16mm có dán cạnh, phù hợp với môi trường phòng tắm ẩm ướt",
      "Gương thân thiện môi trường — gương bạc thân thiện môi trường 4mm, hình ảnh rõ nét, có xử lý chống ẩm ở mặt sau gương",
      "Men gốm — chậu sứ/đá phiến liền khối có lớp men đặc chống bám bẩn và dễ lau chùi",
      "Bảo hành kim khí — bản lề/ray giảm chấn yên tĩnh DTC bền bỉ và được bảo hành theo chính sách của thương hiệu",
      "An toàn điện — gương thông minh LED được thiết kế theo yêu cầu chống nước và an toàn điện (model chống mờ sương)",
    ],
    packaging: [
      { label: "Hình thức cung cấp", value: "Cung cấp theo bộ đồng bộ (gương + chậu + thân tủ), lắp ghép theo một phong cách thống nhất" },
      { label: "Phụ kiện kèm theo", value: "Giá đỡ/nở ốc, xi-phông, các chi tiết làm kín, hướng dẫn lắp đặt (tùy theo model)" },
      { label: "Bảo vệ thùng carton ngoài", value: "Gương và chậu sứ có xốp dày cùng góc bảo vệ, thân tủ bọc màng chống xước, đóng gói thành từng kiện riêng chống ép và va đập" },
      { label: "Tài liệu đi kèm", value: "Hướng dẫn lắp đặt, giấy chứng nhận hợp chuẩn; gương thông minh kèm hướng dẫn điện" },
      { label: "Thị trường Việt Nam", value: "Showroom Hà Nội và Đà Nẵng cho trải nghiệm trực tiếp, do nhà phân phối chính thức cung cấp" },
    ],
    whyChoose: [
      { icon: "🪞", title: "Tủ gương thông minh", desc: "Đèn LED cùng chống mờ sương giữ cho hình phản chiếu buổi sáng rõ ràng; tủ gương hai cánh kết hợp chiếu sáng với lưu trữ ẩn." },
      { icon: "🗄️", title: "Thẩm mỹ đồng bộ", desc: "Gương + chậu + thân tủ theo phong cách thống nhất, hòa quyện liền mạch với vòi và kim khí — khu vực rửa là bộ mặt của ngôi nhà." },
      { icon: "💧", title: "Bền bỉ chống ẩm", desc: "Tấm phủ chống ẩm 16mm cùng kỹ thuật dán cạnh xử lý độ ẩm phòng tắm dễ dàng, với màu sắc ổn định, không phai." },
      { icon: "🪨", title: "Chậu đá", desc: "Đá nhân tạo/đá phiến kết hợp chậu sứ và vành chống tràn, với cảm giác sang trọng, chống bám bẩn và dễ lau chùi." },
      { icon: "🔇", title: "Kim khí yên tĩnh", desc: "Bản lề và ray giảm chấn DTC đóng mở trơn tru và yên tĩnh, vẫn dễ sử dụng về lâu dài." },
    ],
    projectShowcase: ["Khu rửa của căn hộ cao cấp và biệt thự", "Phụ kiện phòng tắm đồng bộ của phòng khách sạn", "Khu nghỉ dưỡng và trung tâm spa", "Giải pháp phòng tắm đồng bộ cho nhà ở hoàn thiện trọn gói"],
    faq: [
      { q: "Tấm phủ melamine có hút ẩm và cong vênh trong phòng tắm không?", a: "Ván dán 16mm có xử lý dán cạnh chống ẩm; với sử dụng bình thường, thông gió tốt và lau khô nước đọng kịp thời, nó sẽ không hút ẩm; chỉ cần đừng bao giờ để thân tủ ngâm trong nước lâu hay để nước thấm vào qua dải cạnh bị hỏng." },
      { q: "Tủ phòng tắm treo tường có yêu cầu gì về tường không?", a: "Phải cố định vào tường chịu lực chắc chắn hoặc tấm gia cố chôn sẵn, treo thật chắc bằng giá đỡ kèm theo; với tường gạch rỗng/tường nhẹ chúng tôi khuyến nghị gia cố trước để bảo đảm chịu được trọng lượng của tủ và chậu." },
      { q: "Chậu bằng đá nhân tạo, đá phiến hay sứ thì tốt hơn?", a: "Men sứ cổ điển, dễ lau chùi và giá trị tốt; đá nhân tạo/đá phiến có cảm giác liền khối mạnh mẽ, chất lượng sang trọng hơn và chống xước. Cả ba đều có vành chống tràn, vì vậy hãy chọn dựa trên ngân sách và phong cách." },
      { q: "Chức năng chống mờ sương và chiếu sáng của gương thông minh có bị hỏng không?", a: "Đây là các chi tiết điện; nếu lắp đặt theo quy định chống nước và điện và giữ khung tránh nước, chúng có thể được sử dụng ổn định về lâu dài; mọi sự cố chủ yếu là vấn đề đường dây hoặc dải đèn, có thể khắc phục bằng cách thay các chi tiết tương ứng." },
    ],
  },

  accessory: {
    story:
      "Dòng phụ kiện phòng tắm Bravat là nét chấm phá hoàn thiện của một phòng tắm trọn vẹn — móc treo áo choàng, móc và các phụ kiện kim khí khác tuy nhỏ, nhưng lại quyết định mức độ tinh tế và sự nhất quán cuối cùng của không gian. Dòng sản phẩm được chế tác chủ yếu từ thép không gỉ và hợp kim kẽm để chống oxy hóa và chống ăn mòn, với bề mặt hoàn thiện mạ crôm cao cấp, đen mờ, đen súng và nhiều màu khác — chống bám bẩn và dấu vân tay, dễ lau và không ố vàng. Những đường nét tối giản, cạnh sắc gọn giúp mọi phụ kiện hô ứng liền mạch với phong cách của vòi và tủ. Sản phẩm dành cho những người luôn giữ cuộc sống ngăn nắp và không thỏa hiệp dù chỉ với một chiếc móc.",
    heritage:
      "Là yếu tố hoàn thiện trong giải pháp phòng tắm hoàn chỉnh của Bravat, các phụ kiện kim khí hô ứng phong cách của cả phòng tắm với lớp hoàn thiện bề mặt và ngôn ngữ thiết kế thống nhất, được sử dụng rộng rãi tại khách sạn, căn hộ cao cấp, trung tâm spa và nhà ở hoàn thiện trọn gói.",
    technicalSpecs: [
      { label: "Loại", value: "Móc treo áo choàng/móc áo choàng tắm, móc khăn và các phụ kiện kim khí phòng tắm khác" },
      { label: "Chất liệu thân", value: "Thép không gỉ / hợp kim kẽm (một số model kết hợp SUS304 để chống gỉ)" },
      { label: "Lớp hoàn thiện bề mặt", value: "Mạ crôm cao cấp / đen mờ / đen súng" },
      { label: "Hiệu năng bề mặt", value: "Chống bám bẩn, dấu vân tay và bụi, dễ lau, không ố vàng" },
      { label: "Kiểu dáng", value: "Tối giản hiện đại với cạnh sắc gọn, hô ứng phong cách của cả phòng tắm" },
      { label: "Tương thích lắp đặt", value: "Gắn tường, bằng nở ốc/vít hoặc keo dán (tùy theo model)" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Lau chùi hằng ngày", desc: "Lau bằng khăn mềm ẩm để loại bỏ vết nước và dấu vân tay; với bề mặt đen mờ/đen súng, hãy tránh chất mài mòn để không làm hỏng kết cấu mờ." },
      { title: "Chăm sóc chống ăn mòn", desc: "Giữ bề mặt khô ráo và lau khô nước bắn kịp thời, việc này làm chậm cặn vôi và oxy hóa, giữ lớp mạ sáng hoặc bề mặt mờ đều màu về lâu dài." },
      { title: "Kiểm tra siết chặt", desc: "Định kỳ kiểm tra các vít đế của móc chịu lực có lỏng không và siết lại, tránh treo những vật quá nặng có thể làm chúng lỏng ra." },
    ],
    installation: [
      "Xác định độ cao và vị trí lắp đặt dựa trên nhu cầu treo, tránh khu vực gạch ốp gõ nghe rỗng và đường nước, đường điện trong tường",
      "Với kiểu lắp khoan, hãy khoan vào mạch gạch hoặc phần giữa dưới của viên gạch và cố định bằng nở ốc để tránh nứt vỡ; với model dùng keo, hãy ép vào vị trí và để cứng theo hướng dẫn",
      "Bảo đảm đế áp phẳng vào tường với độ kín, và ở khu vực ẩm ướt hãy ngăn nước thấm vào phía sau gây gỉ",
      "Sau khi lắp đặt, hãy kiểm tra chịu lực nhẹ để bảo đảm móc chắc chắn và không lung lay trước khi đưa vào sử dụng",
      "Khi lắp các lớp hoàn thiện đặc biệt (đen mờ/đen súng), hãy làm việc với tấm khăn mềm lót bên dưới để tránh dụng cụ làm xước lớp phủ",
    ],
    certifications: [
      "Chất liệu chống ăn mòn — thân thép không gỉ/hợp kim kẽm chống oxy hóa và ăn mòn, phù hợp với môi trường phòng tắm ẩm ướt",
      "Độ bám dính lớp mạ — lớp hoàn thiện bề mặt vượt qua kiểm tra phun muối và độ bám dính, chống bám bẩn và không ố vàng",
      "Lớp phủ mờ — bề mặt đen mờ/đen súng chống dấu vân tay, dễ lau và có màu đều",
      "Hỗ trợ bảo hành — được bảo hành theo chính sách của thương hiệu, với hậu mãi qua các kênh chính hãng được ủy quyền",
    ],
    packaging: [
      { label: "Hình thức cung cấp", value: "Cung cấp riêng lẻ, và có thể phối thành bộ theo dòng cho một phong cách thống nhất" },
      { label: "Phụ kiện kèm theo", value: "Nở ốc/vít lắp đặt hoặc phụ kiện keo dán, các chi tiết làm kín đế (tùy theo model)" },
      { label: "Bảo vệ thùng carton ngoài", value: "Hộp màu riêng cùng lót xốp bên trong, có màng bảo vệ trên bề mặt chống xước" },
      { label: "Tài liệu đi kèm", value: "Hướng dẫn lắp đặt và tem nhận diện hàng chính hãng" },
      { label: "Thị trường Việt Nam", value: "Showroom Hà Nội và Đà Nẵng cho trải nghiệm trực tiếp, do nhà phân phối chính thức cung cấp" },
    ],
    whyChoose: [
      { icon: "🪝", title: "Lưu trữ tinh tế", desc: "Móc treo áo choàng tối giản, sắc gọn xếp gọn khăn tắm và áo choàng đúng chỗ, nâng cao sự ngăn nắp của không gian." },
      { icon: "🖤", title: "Lớp hoàn thiện đa năng", desc: "Lớp hoàn thiện mạ crôm, đen mờ và đen súng dễ dàng hô ứng phong cách trang trí mềm của cả phòng tắm." },
      { icon: "🛡️", title: "Bền bỉ chống ăn mòn", desc: "Thân thép không gỉ/hợp kim kẽm chống oxy hóa và ăn mòn, luôn như mới ngay cả trong môi trường phòng tắm ẩm ướt." },
      { icon: "🧽", title: "Chống bám bẩn, dễ vệ sinh", desc: "Bề mặt chống bám bẩn, dấu vân tay và bụi; chỉ một lần lau nhẹ là sạch, khiến việc bảo dưỡng trở nên nhẹ nhàng." },
      { icon: "🎯", title: "Đồng bộ thống nhất", desc: "Nhất quán với ngôn ngữ thiết kế vòi và tủ Bravat, các phụ kiện giúp chi tiết phòng tắm hô ứng từ đầu đến cuối cho vẻ ngoài sang trọng tổng thể." },
    ],
    projectShowcase: ["Trang trí mềm cho phòng khách sạn và khu thay đồ", "Phòng tắm căn hộ cao cấp và biệt thự", "Trung tâm spa và khu nghỉ dưỡng", "Phòng tắm nhà ở hoàn thiện trọn gói phong cách hiện đại"],
    faq: [
      { q: "Phụ kiện phòng tắm nên lắp bằng cách khoan hay dùng keo dán?", a: "Với các móc chịu lực, chúng tôi khuyến nghị khoan bằng nở ốc để chắc chắn và bền bỉ nhất; với tải nhẹ, hoặc khi bạn không muốn làm hỏng gạch, hãy chọn model dùng keo và ép vào vị trí để cứng theo hướng dẫn." },
      { q: "Bề mặt đen mờ/đen súng có bị phai màu không?", a: "Lớp phủ chính hãng bám chắc và sẽ không phai khi lau chùi bình thường; chỉ cần tránh chất tẩy rửa mài mòn và làm xước bằng vật cứng, đồng thời giữ khô ráo để luôn đều màu và như mới về lâu dài." },
      { q: "Phụ kiện hợp kim kẽm hay thép không gỉ thì tốt hơn?", a: "Thép không gỉ có khả năng chống gỉ mạnh hơn và cảm giác nhẹ; hợp kim kẽm có thể được đúc thành những hình dáng phong phú hơn và có cảm giác đặc chắc. Cả hai đều có lớp hoàn thiện bề mặt chống ăn mòn, vì vậy hãy chọn dựa trên kiểu dáng và ngân sách." },
      { q: "Phụ kiện có thể phối thành bộ với vòi và tủ không?", a: "Có. Phụ kiện Bravat chia sẻ ngôn ngữ thiết kế và lớp hoàn thiện bề mặt với vòi và tủ; chúng tôi khuyến nghị phối chúng cùng một màu bề mặt (như tất cả đen súng/mạ crôm bóng) để có vẻ ngoài tổng thể hài hòa hơn." },
    ],
  },
};

/** Helper: lấy metadata theo seriesOriginal, mặc định quay về faucet. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return BRAVAT_SERIES_META[seriesOriginal.trim().toLowerCase()] || BRAVAT_SERIES_META.faucet;
}
