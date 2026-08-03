/**
 * TEEHO smart lock series metadata — rich content for product detail pages.
 * Indexed by seriesOriginal (catKey): keypad-deadbolt / lever-lock / handle-set /
 * wifi-lock / wifi-handle / smart-handle / gateway / other.
 * Sources: teeho.com (official Shopify storefront, export-grade electronic / smart
 * door locks, primarily serving the US market), verified product specifications
 * plus general smart-door-lock industry process notes.
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

const BRAND_MFG = [
  "TEEHO là thương hiệu chuyên về khóa cửa điện tử và khóa cửa thông minh cấp tiêu dùng, phân phối qua cả kênh D2C lẫn B2B, với mỗi sản phẩm — từ thân khóa cơ khí đến bo mạch điện tử chính — đều được thiết kế và kiểm soát chất lượng theo tiêu chuẩn khóa cửa điện tử dân dụng",
  "Dải sản phẩm đầy đủ trải dài từ khóa chốt bàn phím, khóa tay gạt bàn phím, bộ tay nắm, khóa thông minh WiFi, tay nắm thông minh cho đến gateway đi kèm, với logic mở khóa thống nhất và phụ kiện có thể thay thế lẫn nhau, giúp việc giao trọn bộ và bảo trì lâu dài trở nên đơn giản",
  "Thân khóa thường kết hợp mặt khóa hợp kim kẽm / hợp kim nhôm đúc áp lực với chốt thép không gỉ, cung cấp ba lớp hoàn thiện — Đen Mờ, Niken Satin và Đồng Cổ — cân bằng giữa độ bền và vẻ ngoài hiện đại",
  "Phần điện tử vận hành trên bộ điều khiển chính tiêu thụ điện thấp, dùng nguồn 4 pin AA, kèm cảnh báo đèn đỏ pin yếu cùng chìa cơ dự phòng / cổng cấp nguồn khẩn cấp, nên bạn không bao giờ bị nhốt ngoài cửa khi hết pin",
  "Cung cấp theo đơn hàng tối thiểu số lượng lớn / nguyên container, hỗ trợ giao hàng trộn nhiều model, đồng thời lớp hoàn thiện và bao bì bán lẻ có thể phối hợp theo yêu cầu dự án",
];

const BRAND_CARE = [
  { title: "Chăm sóc pin", desc: "Sử dụng pin kiềm AA chính hãng để vận hành khoảng một năm; thay nguyên bộ ngay khi bảng điều khiển hiện đèn đỏ hoặc cảnh báo pin yếu, và tránh trộn pin cũ với pin mới vì sẽ khiến nguồn điện không ổn định." },
  { title: "Vệ sinh cảm biến và bàn phím", desc: "Lau cảm biến vân tay và bàn phím bằng khăn mềm khô; loại bỏ dầu mỡ và dấu vân tay còn sót giúp cải thiện khả năng nhận diện. Tuyệt đối không rửa bằng nước hay xịt dung dịch tẩy rửa chứa cồn hoặc dung môi mạnh." },
  { title: "Bảo mật mã và quyền truy cập", desc: "Thay đổi mã quản trị định kỳ và xóa kịp thời mã khách dùng một lần ngay sau khi sử dụng; tận dụng tối đa tính năng mã mồi chống nhìn trộm bằng cách thêm các chữ số ngẫu nhiên trước hoặc sau mã thật để đánh lừa người đứng quan sát." },
  { title: "Bảo vệ ngoài trời", desc: "Đối với cửa hướng ra ngoài, hãy xác nhận cấp độ bảo vệ (IP54 / IP55); trong mùa mưa, kiểm tra tình trạng gioăng chống thời tiết và tránh để nước đọng tì lên bàn phím và lỗ khóa trong thời gian dài." },
];

const BRAND_INSTALL = [
  "Trước khi đặt hàng, hãy xác minh thông số cửa: phạm vi lắp phổ biến độ dày cửa 35-50mm (khoảng 1-3/8 đến 2 inch) và khoảng lùi chốt, đồng thời xác nhận chiều mở cửa (dùng được cho cả cửa mở trái lẫn mở phải)",
  "Tháo bỏ phần cứng hiện có và xác định các lỗ lắp đặt theo hướng dẫn; hầu hết các model tận dụng lỗ khoan tiêu chuẩn, nên không cần khoan mới khi thay khóa cũ",
  "Việc lắp đặt cơ khí chỉ cần một chiếc tua vít — không đi dây, không cần dụng cụ chuyên dụng — và một người có thể hoàn thành trong khoảng 15-30 phút (dễ tự lắp)",
  "Sau khi cấp nguồn, đăng ký vân tay / mã quản trị; với các model có kết nối, làm theo hướng dẫn để liên kết WiFi / Bluetooth và ứng dụng di động, rồi gắn kết tài khoản hộ gia đình",
  "Chạy kiểm tra đầy đủ trước khi bàn giao: đóng / mở khóa, thời gian tự khóa, chế độ luôn mở, chìa cơ dự phòng và đèn báo pin đều cần được xác nhận từng mục một",
];

const BRAND_CERTS = [
  "Chứng nhận an toàn điện cho khóa cửa điện tử — bộ điều khiển chính và mạch nguồn được thiết kế theo tiêu chuẩn an toàn điện tử quốc tế, với nguồn DC điện áp thấp an toàn và đáng tin cậy",
  "Tiêu chuẩn cơ khí khóa cửa dân dụng — độ bền thân khóa tham chiếu các cấp ANSI/BHMA (một số model đạt Grade 3), với chốt khóa bền bỉ",
  "Hạn chế chất nguy hại RoHS — chế tạo từ vật liệu thân thiện môi trường, an toàn, đáp ứng yêu cầu môi trường của thị trường xuất khẩu",
  "Mã hóa dữ liệu vân tay / mã — thông tin sinh trắc học và mã số được mã hóa và lưu trữ cục bộ, với nhiều lần nhập sai sẽ kích hoạt cơ chế khóa bàn phím bảo vệ",
  "Tuân thủ module không dây — phần RF của dòng WiFi / Bluetooth đáp ứng các tiêu chuẩn vô tuyến điện chung (như quy định cấp CCC / FCC)",
];

const BRAND_PACK = [
  { label: "Bao bì bán lẻ", value: "Hộp màu bán lẻ chứa thân khóa, mặt khóa, phụ kiện lắp đặt và hướng dẫn, có lớp xốp đúc khuôn bảo vệ" },
  { label: "Phụ kiện kèm theo", value: "Vít lắp đặt, chìa cơ dự phòng, dưỡng lắp đặt và hướng dẫn; pin kèm theo tùy model" },
  { label: "Đơn hàng tối thiểu", value: "Báo giá theo số lượng lớn / nguyên container, hỗ trợ giao hàng trộn nhiều model và nhiều lớp hoàn thiện" },
  { label: "Thời gian giao hàng", value: "Các model có sẵn giao nhanh; lớp hoàn thiện / bao bì tùy chỉnh được xác nhận qua thương lượng cùng đơn hàng" },
  { label: "Hàng mẫu", value: "Có thể cung cấp khóa mẫu để kiểm tra độ vừa khít và trải nghiệm thực tế trước khi đặt đơn số lượng lớn" },
];

export const TEEHO_SERIES_META: Record<string, SeriesMeta> = {
  "keypad-deadbolt": {
    story:
      "Khóa chốt bàn phím TEEHO là dòng đơn giản và đáng tin cậy nhất trong toàn bộ dải sản phẩm — không kết nối internet, không phụ thuộc điện thoại và không cần gateway. Cửa mở bằng một mã trong đầu hoặc một dấu vân tay trên đầu ngón tay. Bàn phím có đèn nền vẫn rõ ràng dễ đọc trong đêm; TE001 chỉ dùng mã trong khi TE002 bổ sung nhận diện vân tay, đọc vân tay trong khoảng 0,3 giây và mở trong khoảng 1 giây cho thao tác vào nhà dứt khoát, gọn gàng. Sản phẩm được làm để chịu đựng cả mùa đông khắc nghiệt phương bắc lẫn mùa mưa ẩm phương nam: bảo vệ IP54, vận hành ổn định từ âm ba mươi đến bảy mươi độ C, và 4 pin AA dùng trọn một năm. Với những ai không muốn vướng bận hệ sinh thái thông minh mà chỉ cần một chiếc khóa cửa trước an tâm, dễ dùng, đây chính là câu trả lời.",
    heritage:
      "Khóa chốt bàn phím là model nền tảng bán chạy nhất, ổn định nhất của TEEHO cho cửa chính và cửa thông phòng, và là điểm khởi đầu cho danh tiếng thương hiệu. Nó biến trải nghiệm không cần chìa trở nên cực kỳ đơn giản — không cần học hỏi, không cần thiết lập, chỉ lắp vào và dùng.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Vân tay (TE002), mã PIN bàn phím, mã dùng một lần, 2 chìa cơ dự phòng" },
      { label: "Vật liệu", value: "Mặt khóa hợp kim kẽm / nhôm đúc áp lực + chốt thép không gỉ; Đen Mờ / Niken Satin / Đồng Cổ" },
      { label: "Nguồn điện", value: "Dùng nguồn 4 pin AA, kèm cảnh báo đèn đỏ khi dưới 15% dung lượng (thiết kế không dùng lithium)" },
      { label: "Thời lượng vận hành", value: "Khoảng 12 tháng khi dùng bình thường; cảnh báo pin yếu giúp bạn không bao giờ bị nhốt ngoài cửa" },
      { label: "Kết nối", value: "Không — vận hành hoàn toàn offline, không phụ thuộc ứng dụng / WiFi / Bluetooth" },
      { label: "Cửa tương thích", value: "Cửa chính / cửa thông phòng tiêu chuẩn, dày khoảng 35-50mm, dùng được cho cửa mở trái và mở phải" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🔐", title: "Vân tay + Mã", desc: "TE002 hỗ trợ tới 20 vân tay và 20 bộ mã, cho mỗi thành viên trong nhà một cách vào riêng, chỉ trong khoảng một giây." },
      { icon: "📴", title: "Hoàn toàn offline", desc: "Không internet, không gắn kết ứng dụng — không lo lắng về quyền riêng tư và không phiền hà khi mất mạng. Dùng được ngay khi mở hộp và không bao giờ thu phí." },
      { icon: "🔄", title: "Tự khóa", desc: "Tự khóa lại sau 10-99 giây kể từ khi cửa đóng, hoặc khóa tức thì bằng cách nhấn giữ bất kỳ phím nào — không bao giờ phải lo quên khóa cửa nữa." },
      { icon: "❄️", title: "Độ bền chịu mọi thời tiết", desc: "Bảo vệ IP54 cùng vận hành ổn định từ âm ba mươi đến bảy mươi độ C, xử lý nhẹ nhàng giá rét, nắng gắt và mưa." },
      { icon: "🔑", title: "Chìa cơ dự phòng", desc: "Đi kèm 2 chìa dự phòng nên bạn vẫn vào được nhà bình thản dù pin bất ngờ hết — thêm một lớp an tâm." },
    ],
    projectShowcase: [
      "Cửa chính nhà ở tự dùng — nâng cấp không cần chìa, offline, an tâm",
      "Hộ gia đình có người cao tuổi sống một mình — vân tay + chìa dự phòng đảm bảo kép, không thành vấn đề ngay cả khi quên mã",
      "Cửa trước của biệt thự / nhà nông thôn không có phủ sóng mạng",
    ],
    faq: [
      { q: "Khóa chốt bàn phím có cần internet hay ứng dụng không?", a: "Không. Đây là khóa độc lập hoàn toàn offline — mọi vân tay và mã đều lưu cục bộ, không WiFi, không Bluetooth hay phí hàng tháng, và vẫn hoạt động bình thường ngay cả khi mất mạng." },
      { q: "Nếu tôi quên mã hoặc pin hết thì sao?", a: "2 chìa cơ dự phòng đi kèm mở cửa trực tiếp; khi dung lượng tụt dưới 15%, đèn đỏ trên bảng điều khiển sẽ cảnh báo sớm, nên chỉ cần thay nguyên bộ 4 pin AA kịp thời." },
      { q: "Tôi nên chọn giữa TE001 và TE002 thế nào?", a: "Nếu bạn chỉ cần mã + chìa, hãy chọn TE001; nếu muốn vào nhà bằng vân tay chạm một lần và quản lý vân tay theo từng thành viên, hãy chọn TE002 có nhận diện vân tay." },
      { q: "Khóa có vừa với cửa hiện có của tôi không?", a: "Khóa vừa với cửa tiêu chuẩn dày khoảng 35-50mm, tận dụng lỗ khoan phổ biến, và dùng được cho cửa mở trái và mở phải; chỉ cần xác minh độ dày cửa và khoảng lùi chốt theo model trước khi đặt hàng." },
    ],
  },

  "lever-lock": {
    story:
      "Không phải cửa nào cũng hợp với núm chốt bàn tròn, to bản — cửa phòng ngủ, cửa văn phòng và cửa thông phòng hướng ra ngoài hợp hơn với tay gạt nhấn xuống là mở. Khóa tay gạt bàn phím TEEHO gói gọn cơ chế mở khóa điện tử vào một tay gạt tiện dụng: nhập mã PIN trên bàn phím có đèn nền để vào nhà không cần chìa, trong khi TE003 / TE004 còn bổ sung mã mồi chống nhìn trộm và chế độ vắng nhà. Khi có khách đến, hãy gửi một mã dùng một lần tự hết hạn sau khi dùng. Tay gạt liền khối với độ nắm chắc chắn, và khả năng chống thời tiết IP54 cho phép nó vững vàng ngay cả trên cửa hướng ra ngoài. Khóa giấu sự tiện lợi của khóa thông minh ngay trong động tác mở cửa quen thuộc nhất của bạn.",
    heritage:
      "Dòng khóa tay gạt phục vụ những cánh cửa cần tay nắm thay vì chốt đơn thuần — trong môi trường nhà ở và văn phòng phương Tây, tay gạt là cách mở cửa tự nhiên nhất. Với dòng này, TEEHO hoàn thiện độ phủ từ cửa chính đến các cửa nội thất.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Mã PIN bàn phím, mã khách dùng một lần, chìa cơ dự phòng; mã mồi chống nhìn trộm" },
      { label: "Vật liệu", value: "Tay gạt hợp kim liền khối + cấu trúc chốt thép không gỉ; Đen Mờ / Niken Satin" },
      { label: "Nguồn điện", value: "Dùng nguồn 4 pin AA, kèm cảnh báo đèn đỏ pin yếu (thiết kế không dùng lithium)" },
      { label: "Thời lượng vận hành", value: "Khoảng một năm hoặc hơn khi dùng bình thường, có cảnh báo pin yếu" },
      { label: "Kết nối", value: "Không — khóa bàn phím độc lập, không phụ thuộc ứng dụng / WiFi / Bluetooth" },
      { label: "Cửa tương thích", value: "Cửa phòng ngủ / cửa chính / cửa văn phòng; chống thời tiết IP54 cho cửa hướng ra ngoài, khoảng -31°F đến 150°F" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🚪", title: "Vào nhà bằng tay gạt", desc: "Nhấn tay gạt là mở, đúng cách hầu hết mọi người mở cửa — lý tưởng cho cửa phòng ngủ, cửa văn phòng và cửa thông phòng." },
      { icon: "🔢", title: "Mã không cần chìa", desc: "Nhập mã PIN trên bàn phím có đèn nền để vào nhà, bỏ lại phía sau nỗi phiền mang theo, tìm kiếm và sao chép chìa." },
      { icon: "👁️", title: "Mã chống nhìn trộm", desc: "Thêm các chữ số gây nhiễu ngẫu nhiên trước hoặc sau mã thật để người quan sát không đoán được, giúp cửa nơi công cộng an toàn hơn." },
      { icon: "🏃", title: "Chế độ vắng nhà", desc: "Bật chế độ vắng nhà tiết kiệm năng lượng chỉ với một chạm khi rời nhà, vô hiệu hóa các mã tạm thời để vừa an toàn vừa tiết kiệm điện." },
      { icon: "🔑", title: "Chìa dự phòng", desc: "Đi kèm chìa cơ dự phòng nên bạn vẫn mở được cửa thủ công nếu phần điện tử trục trặc — yên tâm trong sử dụng hằng ngày." },
    ],
    projectShowcase: [
      "Cửa phòng ngủ / cửa nội thất nhà ở — vào nhà bằng tay nắm thoải mái hơn",
      "Văn phòng nhỏ và lối vào studio — quản lý mã cho nhiều người truy cập",
      "Cửa sân / cửa hông hướng ra ngoài — chống thời tiết IP54 trụ vững trước gió mưa",
    ],
    faq: [
      { q: "Khóa tay gạt khác khóa chốt như thế nào?", a: "Khóa chốt dựa vào núm + chốt, trong khi khóa tay gạt tích hợp cơ chế mở khóa điện tử vào tay gạt để nhấn là mở, phù hợp hơn với cửa phòng ngủ và cửa văn phòng nơi người dùng đã quen với tay nắm." },
      { q: "Tôi có thể cấp quyền truy cập tạm thời cho khách không?", a: "Có. Khóa hỗ trợ tạo mã PIN khách dùng một lần, tự xóa sau một lần sử dụng, nên người dọn dẹp, đội sửa chữa và khách đến có thể ra vào tạm thời mà không lộ mã quản trị của bạn." },
      { q: "Mã mồi chống nhìn trộm là gì?", a: "Nhập một chuỗi chữ số bất kỳ không liên quan trước hoặc sau mã thật; miễn là mã đúng nằm bên trong chuỗi đó, khóa sẽ mở — nên dù người quan sát có nhìn thấy, họ cũng không thể nhớ được mã thật của bạn." },
      { q: "Khóa có lắp được trên cửa phơi mưa không?", a: "Có. Khóa tay gạt đạt khả năng chống thời tiết IP54 với phạm vi vận hành khoảng -31°F đến 150°F, phù hợp cho cửa thông phòng hướng ra ngoài, tuy vậy nên tránh ngâm nước đọng kéo dài." },
    ],
  },

  "handle-set": {
    story:
      "Cửa chính là gương mặt của ngôi nhà và là tuyến phòng thủ đầu tiên. Bộ tay nắm TEEHO kết hợp khóa chốt bàn phím / vân tay với bộ tay nắm đồng bộ — một khóa canh giữ sự an toàn bên trong, một tay nắm phối màu mang lại sự trang trọng bên ngoài. TE001L / TE002K / TE002L / TE004 / TK001H trải từ chỉ dùng mã đến nhận diện vân tay: một dấu vân tay mở cửa trong khoảng một giây, 20 bộ mã có thể phân cho cả nhà, tự khóa tự bảo vệ cửa, và mã khách dùng một lần tự hủy sau khi dùng. Lõi khóa đạt ANSI Grade 3 và thân khóa hợp kim chịu được sử dụng hằng ngày, một chiếc tua vít lắp bộ mới trong khoảng mười lăm phút. Thứ mà nó mang đến cho cửa chính là vẻ đẹp hữu hình và sự an tâm vô hình.",
    heritage:
      "Bộ tay nắm là giải pháp trọn vẹn cho cửa chính — trong các ngôi nhà Bắc Mỹ, một khóa chốt cộng tay nắm đồng bộ là cặp đôi tiêu chuẩn cho cửa trước. TEEHO biến sự kết hợp này thành một bộ liền khối với mở khóa đồng bộ và vẻ ngoài phối hợp, giúp việc nâng cấp hoàn tất chỉ trong một bước.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Vân tay (model chọn lọc), mã PIN bàn phím, mã dùng một lần, chìa cơ dự phòng" },
      { label: "Vật liệu", value: "Thân khóa chốt + bộ tay nắm đồng bộ; lõi khóa hợp kim bền bỉ, nhiều lớp hoàn thiện" },
      { label: "Nguồn điện", value: "Dùng nguồn 4 pin AA, kèm cảnh báo đèn đỏ pin yếu (thiết kế không dùng lithium)" },
      { label: "Thời lượng vận hành", value: "Khoảng một năm hoặc hơn khi dùng bình thường, có cảnh báo pin yếu sớm" },
      { label: "Kết nối", value: "Không — bộ offline, không phụ thuộc ứng dụng / WiFi / Bluetooth" },
      { label: "Cửa tương thích", value: "Cửa chính / cửa mặt tiền ngoài, dày khoảng 35-50mm; chống thời tiết IP54, khoảng -22°F đến 158°F" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🏠", title: "Bảo vệ kép", desc: "Khóa chốt bàn phím / vân tay + tay nắm đồng bộ canh giữ cả hai phía của cửa, giúp cửa chính an toàn hơn." },
      { icon: "✨", title: "Vẻ ngoài phối hợp", desc: "Thân khóa và tay nắm chung một lớp hoàn thiện đồng nhất cho tổng thể cửa phối hợp, trang trọng, nâng tầm ấn tượng đầu tiên của lối vào." },
      { icon: "👆", title: "Vân tay một giây", desc: "Các model vân tay nhận diện nhanh và mở trong khoảng một giây, nên bạn vào nhà dễ dàng ngay cả khi tay đang bận." },
      { icon: "🛡️", title: "ANSI Grade 3", desc: "Lõi khóa đạt Grade 3 dân dụng cùng thân khóa hợp kim — chắc chắn, bền bỉ và an tâm trước các nỗ lực cạy phá." },
      { icon: "⏱️", title: "Lắp đặt nhanh", desc: "Hoàn thành trong khoảng 15 phút chỉ với một chiếc tua vít, dùng được cho cửa mở trái và mở phải, và thay trực tiếp khóa cũ." },
    ],
    projectShowcase: [
      "Nâng cấp trọn gói cho cửa chính nhà ở tự dùng — an toàn và thẩm mỹ mặt tiền trong một bước",
      "Cửa trước nhà phố / nhà liền thổ — bộ tay nắm đồng bộ nâng tầm cảm giác chất lượng của mặt tiền",
      "Hộ gia đình lớn cần phân nhiều mã / vân tay cho các thành viên",
    ],
    faq: [
      { q: "Bộ sản phẩm gồm những gì?", a: "Bộ gồm một khóa chốt bàn phím / vân tay và một bộ tay nắm đồng bộ (chẳng hạn hai tay gạt trong hoặc một bộ tay nắm ngoài), với mở khóa liên kết và lớp hoàn thiện thống nhất — một lần lắp đặt hoàn tất cả cánh cửa." },
      { q: "Model vân tay nhanh thế nào, và lưu được bao nhiêu?", a: "Các model vân tay đọc trong khoảng 0,3 giây và mở khóa trong khoảng 1 giây, lưu tới khoảng 20 vân tay và 20 bộ mã — đủ để quản lý riêng cả nhà và khách thường xuyên." },
      { q: "Việc lắp đặt có phức tạp không, có cần thợ chuyên không?", a: "Không. Khóa tận dụng lỗ khoan tiêu chuẩn và mất khoảng 15 phút chỉ với một chiếc tua vít, dùng được cho cửa mở trái và mở phải, và dễ tự lắp." },
      { q: "Cấp độ an toàn của khóa là gì?", a: "Lõi khóa chốt đạt tiêu chuẩn dân dụng ANSI Grade 3, kết hợp với thân khóa hợp kim bền bỉ và chống thời tiết IP54, phù hợp dùng lâu dài cho cửa chính." },
    ],
  },

  "wifi-lock": {
    story:
      "Giữ chìa trong đầu thôi là chưa đủ — khóa thông minh WiFi TEEHO cho phép bạn đặt cả cánh cửa vào trong điện thoại. TE011W / TE012W tích hợp sẵn WiFi, nên bạn có thể mở khóa từ xa, cấp mã từ xa và kiểm tra ai đã vào lúc nào, tất cả mà không cần thêm gateway. Cấp cho người dọn dẹp một mã dùng một lần khi bạn đi vắng, nhận thông báo trên điện thoại khi con bạn đi học về, xác nhận lúc đêm khuya rằng bạn không quên khóa cửa — tất cả chỉ với một chạm. Khóa tương thích với Alexa và Google Assistant để khóa bằng giọng nói, và TE012W còn bổ sung nhận diện vân tay cùng chống nước IP55, dệt sự tiện lợi, an toàn và thông minh vào làm một. Đây là chiếc khóa cửa tự báo cáo và nhận lệnh từ xa.",
    heritage:
      "Dòng WiFi chính thức kết nối khóa TEEHO với hệ sinh thái nhà thông minh — nâng cấp từ một chiếc khóa cửa độc lập lên một điểm vào nhà thông minh có thể quản lý từ xa, liên kết bằng giọng nói và ghi lại nhật ký. Đây là bước then chốt trong hành trình của thương hiệu hướng tới ngôi nhà thông minh trọn vẹn.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Vân tay (TE012W), mã bàn phím, mở khóa từ xa qua ứng dụng, chìa cơ dự phòng" },
      { label: "Vật liệu", value: "Mặt khóa hợp kim + chốt thép không gỉ; Đen Mờ / Niken Satin, chống nước IP55 (TE012W)" },
      { label: "Nguồn điện", value: "Dùng nguồn 4 pin AA, cảnh báo pin yếu kép qua ứng dụng / đèn đỏ (thiết kế không dùng lithium)" },
      { label: "Thời lượng vận hành", value: "Khoảng một năm khi dùng bình thường; kết nối làm hao pin hơi nhiều hơn, có cảnh báo pin yếu kịp thời" },
      { label: "Kết nối", value: "WiFi tích hợp để điều khiển từ xa mà không cần gateway riêng; tương thích Alexa / Google" },
      { label: "Cửa tương thích", value: "Cửa chính tiêu chuẩn, dày khoảng 35-50mm, dùng được cho cửa mở trái và mở phải" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "📱", title: "Điều khiển từ xa", desc: "WiFi tích hợp không cần gateway — mở khóa, đẩy mã và kiểm tra trạng thái khóa từ điện thoại mọi lúc, mọi nơi." },
      { icon: "📋", title: "Nhật ký truy cập", desc: "Ứng dụng tự động ghi lại ai đã mở cửa lúc nào, giúp việc con về nhà hay khách đến rõ ràng trong nháy mắt để hoàn toàn an tâm." },
      { icon: "🗣️", title: "Điều khiển bằng giọng nói", desc: "Tương thích với Alexa và Google Assistant để khóa bằng một câu nói, hòa vào các kịch bản thông minh toàn nhà." },
      { icon: "👆", title: "Vân tay + Mã", desc: "TE012W bổ sung nhận diện vân tay và mã bàn phím, mang lại nhiều cách mở khóa cục bộ nên bạn vẫn vào được nhà ngay cả khi mất mạng." },
      { icon: "💧", title: "Chống nước IP55", desc: "TE012W đạt cấp bảo vệ IP55, trụ vững trước gió mưa trên cửa chính hướng ra ngoài để dùng ngoài trời đáng tin cậy hơn." },
    ],
    projectShowcase: [
      "Dự án bàn giao nhà thông minh toàn nhà — cửa chính tích hợp vào kịch bản giọng nói và tự động hóa",
      "Chủ nhà ở xa / hộ gia đình đi công tác thường xuyên — cấp quyền vào nhà từ xa cho gia đình, bạn bè và người dọn dẹp",
      "Nhà ở và văn phòng nhỏ cần lưu vết nhật ký truy cập",
    ],
    faq: [
      { q: "Tôi có cần mua gateway riêng để điều khiển từ xa không?", a: "Không. Dòng WiFi có module WiFi tích hợp sẵn — kết nối nó với router gia đình là bạn có thể trực tiếp mở khóa từ xa, đẩy mã và xem nhật ký, không cần gateway hay hub bổ sung nào." },
      { q: "Tôi có vẫn mở được cửa khi mất mạng hoặc mất điện không?", a: "Có. Mã bàn phím cục bộ, vân tay (TE012W) và chìa cơ dự phòng không phụ thuộc mạng, nên cửa vẫn mở bình thường khi offline; nếu pin hết, chỉ cần dùng chìa dự phòng." },
      { q: "Khóa kết nối được với Alexa hay Google không?", a: "Có. Dòng WiFi tương thích với Amazon Alexa và Google Assistant; sau khi liên kết, bạn có thể khóa bằng giọng nói và đưa vào các kịch bản tự động hóa nhà thông minh." },
      { q: "Kết nối có tốn nhiều pin không?", a: "Các model có kết nối tiêu thụ điện hơi nhiều hơn so với model hoàn toàn offline, nhưng một bộ 4 pin AA vẫn dùng được khoảng một năm khi sử dụng bình thường, và cả ứng dụng lẫn bảng điều khiển đều nhắc thay pin sớm khi pin yếu." },
    ],
  },

  "wifi-handle": {
    story:
      "Lấy sức mạnh điều khiển từ xa của một khóa thông minh WiFi và đặt vào bộ tay nắm trang trọng nhất trên cửa chính — đó chính là khóa tay nắm WiFi TEEHO. TE012W-H đi kèm tay gạt liền khối, TE012W-K đi kèm bộ tay nắm núm đôi, cả hai đều tích hợp sẵn WiFi để khóa từ xa, đẩy mã và xem truy cập mà không cần gateway, và TE012W-K còn hỗ trợ vào nhà bằng vân tay một giây. Khóa có vẻ ngoài trọn vẹn và chất lượng cửa chính của một bộ tay nắm cùng khả năng điều khiển từ xa và nhật ký truy cập của một khóa có kết nối, với lớp hoàn thiện Đen Mờ và Niken Satin để hợp với mặt tiền của bạn. Khi bạn muốn một cửa trước vừa đẹp, vừa thông minh, vừa quản lý được từ xa, khóa lo trọn cả ba điều cùng lúc.",
    heritage:
      "Khóa tay nắm WiFi là sự hợp nhất của bộ tay nắm và khóa thông minh WiFi — kết nối với nhà thông minh mà vẫn giữ trọn vẻ ngoài của cửa chính, nên việc quản lý từ xa không còn phải đánh đổi bằng thẩm mỹ mặt tiền. Đây là tổ hợp đầu bảng của TEEHO cho các cửa chính cao cấp.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Vân tay (TE012W-K), mã bàn phím, mở khóa từ xa qua ứng dụng, chìa cơ dự phòng" },
      { label: "Vật liệu", value: "Khóa chốt + bộ tay nắm đồng bộ, mặt khóa hợp kim; Đen Mờ / Niken Satin" },
      { label: "Nguồn điện", value: "Dùng nguồn 4 pin AA, kèm cảnh báo pin yếu qua ứng dụng / đèn đỏ (thiết kế không dùng lithium)" },
      { label: "Thời lượng vận hành", value: "Khoảng một năm khi dùng bình thường; kết nối làm hao pin hơi nhiều hơn, có cảnh báo pin yếu kịp thời" },
      { label: "Kết nối", value: "WiFi tích hợp để điều khiển từ xa qua ứng dụng và đẩy mã mà không cần gateway riêng" },
      { label: "Cửa tương thích", value: "Cửa chính / cửa mặt tiền ngoài tiêu chuẩn, dày khoảng 35-50mm, dùng được cho cửa mở trái và mở phải" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "📲", title: "Tay nắm + Kết nối", desc: "Mặt tiền trọn vẹn của một bộ tay nắm cộng với khóa từ xa WiFi tích hợp — bạn có cả thẩm mỹ và trí tuệ." },
      { icon: "🏠", title: "Bộ cửa chính trọn vẹn", desc: "Khóa chốt + bộ tay nắm đồng bộ với vẻ ngoài phối hợp, trang trọng, được tạo riêng cho chất lượng cửa chính." },
      { icon: "👆", title: "Vân tay một giây", desc: "TE012W-K hỗ trợ mở khóa bằng vân tay không cần chìa để vào nhà nhanh, dễ dàng ngay cả khi tay đang bận." },
      { icon: "📡", title: "Điều khiển từ xa không cần gateway", desc: "WiFi tích hợp kết nối thẳng với router, nên bạn mở khóa từ xa, cấp quyền và xem nhật ký mà không cần gateway bổ sung." },
      { icon: "🎨", title: "Hai lớp hoàn thiện", desc: "Lớp hoàn thiện Đen Mờ và Niken Satin linh hoạt hợp với màu cửa và phong cách mặt tiền khác nhau." },
    ],
    projectShowcase: [
      "Cửa chính nhà ở cao cấp — khi bạn muốn cả thẩm mỹ mặt tiền lẫn quản lý từ xa",
      "Nhà mẫu thông minh / công trình trọn gói — khóa tay nắm có kết nối làm điểm nhấn lối vào",
      "Cửa trước biệt thự cần cấp quyền từ xa cho gia đình và khách",
    ],
    faq: [
      { q: "Khóa tay nắm WiFi khác khóa thông minh WiFi thông thường thế nào?", a: "Ngoài khả năng điều khiển từ xa qua WiFi, khóa còn bổ sung tay nắm / bộ tay nắm đồng bộ cho vẻ ngoài trọn vẹn hơn và cảm giác chất lượng cửa chính mạnh hơn, khiến nó lý tưởng cho cửa trước nơi ngoại hình quan trọng." },
      { q: "Khóa có cũng cần gateway riêng không?", a: "Không. Khóa cũng tích hợp sẵn WiFi — kết nối nó với router để mở khóa từ xa, đẩy mã và xem nhật ký, giúp bạn khỏi cần thêm gateway và đi dây." },
      { q: "Tôi nên chọn giữa TE012W-H và TE012W-K thế nào?", a: "TE012W-H là tay gạt liền khối với vẻ ngoài gọn gàng; TE012W-K đi kèm bộ tay nắm núm đôi và hỗ trợ vân tay, với tính năng đầy đủ hơn và bộ trọn vẹn hơn — chọn theo loại cửa và ngân sách." },
      { q: "Có những màu nào?", a: "Khóa cung cấp lớp hoàn thiện Đen Mờ và Niken Satin, bạn có thể phối với màu cửa và tổng thể phong cách mặt tiền của mình." },
    ],
  },

  "smart-handle": {
    story:
      "Tay nắm thông minh TEEHO cô đọng cả một chiếc khóa thông minh vào một tay nắm cửa nhỏ gọn. TE018 tích hợp bàn phím và tay gạt cùng điều khiển qua ứng dụng, trong khi TE019 đi theo hướng ứng dụng Bluetooth với bàn phím số và chế độ luôn mở — nhập mã trên bàn phím, chia sẻ mã dùng một lần từ xa qua điện thoại và tự khóa khi đóng cửa, tất cả gói gọn trong một tay nắm tiện dụng. Khóa nhẹ và nhỏ gọn, dễ lắp, không chiếm chỗ cũng không lấn át, nên đặc biệt hợp với cửa phòng ngủ, căn hộ cho thuê và những cửa nhỏ cần cấp quyền linh hoạt. Gửi một mã tạm thời cho khách thuê ngắn ngày, trao cho bạn bè quyền truy cập từ xa — tất cả gọn trong tầm tay. Nhỏ về kích thước, lớn về trí tuệ.",
    heritage:
      "Tay nắm thông minh là dòng khóa thông minh nhẹ nhất của TEEHO, làm cho những cửa không cần khóa chốt nặng nề mà vẫn muốn có trải nghiệm thông minh — phòng ngủ, phòng làm việc và phòng cho thuê, nơi một tay nắm lo trọn việc vào nhà không cần chìa và cấp quyền từ xa.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Mã PIN bàn phím, điều khiển qua ứng dụng, mã dùng một lần / tạm thời, chìa cơ (tùy model)" },
      { label: "Vật liệu", value: "Tay nắm tay gạt / núm liền khối với bàn phím tích hợp; Đen Mờ / Niken Satin" },
      { label: "Nguồn điện", value: "Dùng nguồn pin AA, kèm cảnh báo pin yếu (thiết kế không dùng lithium)" },
      { label: "Thời lượng vận hành", value: "Khoảng một năm khi dùng bình thường, có nhắc thay pin kịp thời khi pin yếu" },
      { label: "Kết nối", value: "Điều khiển qua ứng dụng (TE019 qua Bluetooth; có thể thêm gateway để mở rộng sang điều khiển WiFi từ xa)" },
      { label: "Cửa tương thích", value: "Cửa nội thất như cửa phòng ngủ / cửa phòng / cửa cho thuê, lắp đặt nhỏ gọn" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🤚", title: "Nhẹ & Nhỏ gọn", desc: "Cả chiếc khóa tích hợp vào tay nắm, không chiếm chỗ cửa và lắp đặt đơn giản — đặc biệt hợp với cửa phòng ngủ và cửa phòng." },
      { icon: "🔢", title: "Bàn phím không cần chìa", desc: "Nhập mã trên bàn phím tích hợp để mở, chấm dứt nỗi phiền mang chìa cho cửa phòng và khiến việc ra vào thảnh thơi hơn." },
      { icon: "📤", title: "Chia sẻ mã từ xa", desc: "Gửi một mã dùng một lần cho khách hoặc người thuê từ xa qua ứng dụng — cấp quyền tạm thời mà không cần có mặt." },
      { icon: "🔄", title: "Tự khóa", desc: "Tự khóa lại sau khi cửa đóng, tự bảo vệ cửa phòng và cửa cho thuê — an toàn không phụ thuộc trí nhớ." },
      { icon: "🛏️", title: "Thân thiện cho thuê", desc: "Chế độ luôn mở và mã tạm thời hợp với kịch bản lưu trú ngắn ngày / cho thuê phòng — đổi mã với mỗi khách mới." },
    ],
    projectShowcase: [
      "Cửa phòng ngủ / cửa phòng làm việc — nâng cấp không cần chìa, nhẹ nhàng",
      "Phòng cho thuê đơn lẻ / phòng trong nhà ở chung — mã tạm thời đổi theo mỗi khách",
      "Cửa khách lưu trú ngắn ngày tại nhà nghỉ — chia sẻ mã dùng một lần từ xa tránh việc trao chìa",
    ],
    faq: [
      { q: "Tay nắm thông minh hợp với loại cửa nào?", a: "Khóa hợp với cửa nội thất như cửa phòng ngủ, cửa phòng làm việc và cửa phòng cho thuê — nhỏ gọn và dễ lắp; với cửa chính, nên dùng dòng khóa chốt hoặc bộ tay nắm để có cấp độ an toàn cao hơn." },
      { q: "Tôi có thể mở cửa cho khách hoặc người thuê từ xa không?", a: "Có. Chia sẻ một mã dùng một lần / tạm thời từ xa qua ứng dụng, và khách hoặc người thuê nhập mã đó để vào mà không cần trao chìa trực tiếp; có thể đặt mã tự hết hạn sau khi dùng." },
      { q: "TE018 và TE019 khác nhau thế nào?", a: "TE018 tích hợp bàn phím và hỗ trợ điều khiển qua ứng dụng; TE019 dùng ứng dụng Bluetooth với bàn phím số và chế độ luôn mở. Chọn dựa trên việc bạn có cần chế độ luôn mở hay không và phương thức điều khiển ưa thích." },
      { q: "Model Bluetooth có điều khiển từ xa được không?", a: "TE019 được điều khiển bằng ứng dụng qua Bluetooth ở cự ly gần; để điều khiển từ xa ngoài hiện trường, hãy ghép nó với một gateway TEEHO để bắc cầu Bluetooth sang WiFi cho khả năng khóa từ xa thực sự." },
    ],
  },

  gateway: {
    story:
      "Gateway TEEHO G1 là trung tâm thầm lặng làm việc hậu trường trong hệ thống khóa thông minh — nó bắc cầu những khóa chỉ chạy Bluetooth không vươn tới router để kết nối với WiFi gia đình, mang lại tầm với từ xa cho những khóa trước đây chỉ điều khiển được ở cự ly gần. Khi đã lắp G1, một khóa Bluetooth có thể được khóa, mở khóa và kiểm tra trạng thái trong ứng dụng bất cứ lúc nào, và hòa vào nhà thông minh cùng KK Home App và giọng nói Alexa. Hay hơn nữa, G1 còn tích hợp một ổ cắm thông minh điều khiển được qua ứng dụng, nên một chiếc hộp nhỏ vừa là cầu nối khóa vừa là cách tiện lợi để đưa đèn hay quạt vào tầm kiểm soát. Nó không tranh ánh đèn sân khấu, nhưng lại làm cả hệ thống khóa sống động lên.",
    heritage:
      "Gateway là phụ kiện mở rộng kết nối cho hệ thống khóa của TEEHO — nó hoàn thiện chặng cuối của tầm với từ xa cho các khóa Bluetooth, là cầu nối then chốt nâng cấp một khóa thông minh độc lập thành một nút nhà thông minh quản lý được từ xa.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Không tự mở khóa; cung cấp kênh khóa / mở khóa từ xa cho các khóa Bluetooth tương thích" },
      { label: "Vật liệu", value: "Vỏ nhựa cắm điện với ổ cắm thông minh tích hợp, cắm là dùng" },
      { label: "Nguồn điện", value: "Cắm điện lưới trực tiếp (thiết kế không dùng pin / không dùng lithium)" },
      { label: "Thời lượng vận hành", value: "Nguồn điện lưới liên tục, luôn trực tuyến và không có pin để thay" },
      { label: "Kết nối", value: "Bắc cầu WiFi: Bluetooth sang WiFi, đưa các khóa Bluetooth cự ly gần vào tầm điều khiển từ xa" },
      { label: "Cửa tương thích", value: "Hoạt động với các khóa Bluetooth TEEHO tương thích gateway; dùng cùng KK Home App" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "📡", title: "Bluetooth sang từ xa", desc: "Bắc cầu những khóa chỉ chạy Bluetooth sang WiFi, biến một khóa từng chỉ ở cự ly gần thành điều khiển từ xa mọi lúc, mọi nơi." },
      { icon: "🔌", title: "Ổ cắm tích hợp", desc: "Một gateway còn mang theo một ổ cắm thông minh điều khiển được qua ứng dụng, xử lý cả cầu nối khóa lẫn điều khiển thiết bị trong một chiếc hộp." },
      { icon: "🗣️", title: "Giọng nói Alexa", desc: "Hỗ trợ điều khiển bằng giọng nói Alexa, đưa cả khóa lẫn ổ cắm vào trợ lý giọng nói và nhà thông minh của bạn." },
      { icon: "🏠", title: "Hub thông minh", desc: "Hoạt động cùng KK Home App như trung tâm điều khiển của khóa, hợp nhất quản lý trạng thái và vận hành từ xa." },
      { icon: "⚡", title: "Cắm là dùng", desc: "Cắm điện lưới trực tiếp với thiết lập mạng đơn giản, bổ sung khả năng từ xa cho một khóa Bluetooth hiện có mà không cần đi dây." },
    ],
    projectShowcase: [
      "Hộ gia đình đã lắp khóa Bluetooth muốn nâng cấp lên điều khiển từ xa",
      "Dự án cải tạo nhà thông minh — hợp nhất các nút khóa và ổ cắm",
      "Căn hộ cho thuê / nhà nghỉ — quản lý từ xa nhiều cửa khóa Bluetooth",
    ],
    faq: [
      { q: "Gateway có tự mở cửa được không?", a: "Gateway không mở cửa trực tiếp; vai trò của nó là bắc cầu một khóa Bluetooth sang WiFi để bạn có thể khóa, mở khóa và kiểm tra trạng thái từ xa qua ứng dụng, còn việc mở khóa vẫn do chính khóa thực hiện." },
      { q: "Những khóa nào cần gateway?", a: "Các khóa TEEHO hỗ trợ Bluetooth nhưng không tích hợp WiFi (như một số tay nắm thông minh) là loại cần gateway; các model có WiFi tích hợp sẵn có thể điều khiển từ xa trực tiếp, không cần gateway." },
      { q: "Gateway dùng nguồn thế nào, và tôi có cần thay pin không?", a: "G1 dùng nguồn cắm điện lưới trực tiếp và luôn trực tuyến lâu dài, không có pin để thay; nó cũng tích hợp một ổ cắm thông minh điều khiển được qua ứng dụng." },
      { q: "Gateway có hỗ trợ điều khiển bằng giọng nói không?", a: "Có. Dùng cùng KK Home App và tương thích với điều khiển giọng nói Alexa, nó có thể đưa cả khóa lẫn ổ cắm tích hợp vào các kịch bản giọng nói nhà thông minh." },
    ],
  },

  other: {
    story:
      "Toàn bộ dải khóa thông minh TEEHO trải dài từ khóa chốt bàn phím chỉ dùng mã, khóa tay gạt bàn phím và bộ tay nắm cửa chính, qua khóa thông minh từ xa hỗ trợ WiFi, tay nắm thông minh gọn nhẹ và một gateway đi kèm — được xây dựng quanh bốn phương thức mở khóa (vân tay, mã, ứng dụng và chìa cơ) thành một hệ thống khóa với logic thống nhất và phụ kiện thay thế lẫn nhau. Dù bạn muốn một khóa cửa trước hoàn toàn offline, lắp là dùng, an tâm, hay một điểm vào nhà thông minh cấp quyền từ xa, ghi nhật ký truy cập và liên kết bằng giọng nói, bạn sẽ tìm thấy model phù hợp ở đây. Với trải nghiệm mở khóa nhất quán và việc lắp đặt cũng đơn giản như nhau, việc nâng cấp trọn bộ mọi cánh cửa trong nhà trở nên dễ dàng.",
    heritage:
      "Là cái nhìn tổng quan về hệ thống sản phẩm TEEHO, dòng này quy tụ bố cục đầy đủ của thương hiệu trong khóa cửa điện tử / thông minh — từ khóa offline cơ bản đến những model đầu bảng có kết nối, bao phủ nhu cầu theo loại cửa của nhà ở, căn hộ và nhà cho thuê ngắn ngày.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Vân tay, mã PIN bàn phím, ứng dụng / từ xa, chìa cơ dự phòng (kết hợp theo model)" },
      { label: "Vật liệu", value: "Mặt khóa hợp kim kẽm / nhôm + chốt thép không gỉ; Đen Mờ / Niken Satin / Đồng Cổ" },
      { label: "Nguồn điện", value: "Dùng nguồn 4 pin AA, kèm cảnh báo pin yếu (model gateway dùng nguồn điện lưới)" },
      { label: "Thời lượng vận hành", value: "Khoảng một năm khi dùng bình thường đối với khóa, có cảnh báo pin yếu" },
      { label: "Kết nối", value: "Offline / WiFi tích hợp / Bluetooth + gateway, tùy theo dòng" },
      { label: "Cửa tương thích", value: "Cửa chính / cửa phòng ngủ / cửa nội thất, dày khoảng 35-50mm, dùng được cho cửa mở trái và mở phải" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🔐", title: "Nhiều phương thức mở khóa", desc: "Vân tay, mã, ứng dụng / thẻ và chìa cơ dự phòng, kết hợp theo nhu cầu để vừa tiện lợi vừa an toàn." },
      { icon: "🧩", title: "Hệ thống trọn vẹn", desc: "Khóa chốt, khóa tay gạt, bộ tay nắm, khóa WiFi, tay nắm thông minh và phụ kiện gateway đều phối hợp với nhau cho việc nâng cấp trọn bộ toàn nhà." },
      { icon: "🛠️", title: "Lắp đặt dễ dàng", desc: "Hầu hết các model tự lắp được với một chiếc tua vít trong khoảng 15-30 phút, không cần đi dây." },
      { icon: "📱", title: "Có kết nối hoặc offline", desc: "Có những model hoàn toàn offline an tâm cũng như những model có kết nối với khóa từ xa và nhật ký truy cập — chọn theo nhu cầu." },
      { icon: "🔑", title: "Dự phòng an tâm", desc: "Chìa cơ dự phòng và cảnh báo pin yếu mang lại đảm bảo kép, nên một lần mất điện hay mất mạng không bao giờ nhốt bạn ngoài cửa." },
    ],
    projectShowcase: [
      "Nâng cấp khóa cửa trọn bộ toàn nhà — một hệ thống thống nhất từ cửa chính đến cửa nội thất",
      "Căn hộ / cho thuê dài hạn — giao hàng và quản lý số lượng lớn trên nhiều cửa và nhiều căn",
      "Nhà nghỉ và cho thuê ngắn ngày — cấp quyền từ xa và mã dùng một lần tránh việc trao chìa",
    ],
    faq: [
      { q: "Các dòng TEEHO chính là gì?", a: "Gồm khóa chốt bàn phím, khóa tay gạt bàn phím, bộ tay nắm khóa tay gạt, khóa thông minh WiFi, khóa tay nắm WiFi, tay nắm thông minh và phụ kiện gateway, bao phủ mọi thứ từ cửa chính đến cửa nội thất." },
      { q: "Tôi nên chọn giữa khóa offline và khóa có kết nối thế nào?", a: "Để đơn giản mà không cần gắn kết ứng dụng, hãy chọn khóa chốt / khóa tay gạt offline; để cấp quyền từ xa, ghi nhật ký truy cập và liên kết giọng nói, hãy chọn khóa thông minh có WiFi tích hợp hoặc model Bluetooth ghép cùng gateway." },
      { q: "Những khóa này có vừa với cửa của tôi không?", a: "Hầu hết các model hợp với cửa tiêu chuẩn dày khoảng 35-50mm, tận dụng lỗ khoan phổ biến và dùng được cho cửa mở trái và mở phải; chỉ cần xác minh độ dày cửa và khoảng lùi chốt theo model cụ thể trước khi đặt hàng." },
      { q: "Mất điện hay mất mạng có nhốt tôi ngoài cửa không?", a: "Không. Các khóa đi kèm chìa cơ dự phòng và cảnh báo pin yếu, model offline vốn không phụ thuộc mạng ngay từ đầu, và model có kết nối vẫn mở khóa cục bộ được bằng mã / vân tay khi offline." },
    ],
  },
};

/** Helper: get metadata by seriesOriginal, falling back to keypad-deadbolt by default. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TEEHO_SERIES_META[seriesOriginal.trim()] || TEEHO_SERIES_META["keypad-deadbolt"];
}
