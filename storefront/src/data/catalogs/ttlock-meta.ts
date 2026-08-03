/**
 * TTLock smart lock series metadata — rich content for product detail pages.
 * Indexed by seriesOriginal (catKey): smart-lock / lever / cylinder / outdoor / gateway, etc.
 * Sources: ttlock.eu (European distributor) + public materials from TTLock / Sciener (Shenzhen) platform + common industry parameters.
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
  "TTLock được phát triển bởi Sciener (Thâm Quyến) — một nền tảng kiểm soát ra vào thông minh toàn cầu bao gồm ứng dụng di động, API đám mây và bộ SDK mở, với phần cứng và phần mềm phát triển từ cùng một nguồn nhằm mang lại trải nghiệm nhất quán, liền mạch",
  "Mặt khóa được đúc áp lực từ hợp kim kẽm và nhôm cấp hàng không, hoàn thiện bằng kính cường lực hoặc kim loại xước, cân bằng giữa độ bền kết cấu và cảm giác cao cấp, luôn chắc chắn qua quá trình sử dụng hằng ngày với tần suất cao",
  "Mô-đun điện tử lõi tích hợp chip Bluetooth 5.0 tiết kiệm năng lượng, cảm biến vân tay bán dẫn và mạch báo động chống phá khóa, mọi linh kiện đều vượt qua kiểm tra lão hóa và kiểm tra nhiệt độ cao/thấp trước khi lắp ráp",
  "Nhà máy hỗ trợ OEM / ODM: màu mặt khóa, kiểu tay nắm, tổ hợp phương thức mở khóa và giao diện thương hiệu trên App đều có thể tùy chỉnh theo từng dự án, với số lượng đặt hàng tối thiểu linh hoạt, phù hợp cả với dự án và kênh phân phối",
  "Tận dụng hệ sinh thái mở TTLock, một chiếc khóa có thể kết nối với gateway, chuông cửa, cảm biến cửa, camera thông minh và các phụ kiện khác để tạo thành giải pháp kiểm soát ra vào thông minh tích hợp",
];

const BRAND_CARE = [
  { title: "Chăm sóc pin", desc: "Sử dụng pin kiềm hoặc pin lithium chính hãng và thay thế kịp thời khi App cảnh báo pin yếu; một số model có cổng cấp nguồn khẩn cấp Type-C hoặc 9V ở mặt dưới, cho phép cấp nguồn tạm thời để mở cửa ngay cả khi pin đã cạn hoàn toàn." },
  { title: "Bảo mật App và chìa khóa", desc: "Luôn cập nhật App TTLock lên phiên bản mới nhất, cấp hoặc thu hồi eKey từ xa khi cần; xóa mật khẩu tạm thời và mật khẩu dùng một lần ngay sau khi sử dụng, đồng thời định kỳ dọn dẹp các quyền truy cập đã hết hạn." },
  { title: "Vệ sinh cảm biến", desc: "Lau cửa sổ đọc vân tay và bàn phím cảm ứng bằng khăn mềm, khô để giữ sạch và nâng cao độ chính xác nhận diện; tuyệt đối không rửa bằng nước hay tiếp xúc với cồn, dung môi mạnh và các hóa chất khác." },
  { title: "Bảo dưỡng bộ phận chuyển động", desc: "Nếu tay nắm, núm vặn hoặc chốt cửa bắt đầu bị kẹt, tra một lượng nhỏ dầu bôi trơn chuyên dụng lên các rãnh dẫn kim loại; tránh va đập mạnh vào mặt khóa, và trong mùa mưa cần chú ý đến gioăng kín của thân khóa lắp ngoài trời." },
];

const BRAND_INSTALL = [
  "Trước khi đặt hàng, dùng thước cặp để kiểm tra độ dày cửa, khoảng cách lỗ khoan và loại khóa (thân khóa âm / lõi Euro / tiêu chuẩn Mỹ), đồng thời xác nhận chiều đóng mở trái/phải và khả năng tương thích với kích thước khung cửa",
  "Lắp đặt thân khóa và các mặt khóa theo từng bước trong sách hướng dẫn đi kèm, giữ dây dẫn gọn gàng để tránh bị kẹp; cấp nguồn để tự kiểm tra sau khi lắp pin nhằm đảm bảo mặt trước và mặt sau giao tiếp chính xác",
  "Bật Bluetooth và ghép nối ở khoảng cách gần, sau đó thêm khóa vào App TTLock, hoàn tất khởi tạo và đăng ký vân tay, mật khẩu cùng thẻ của quản trị viên",
  "Đối với các tính năng từ xa, thêm một gateway WiFi đặt gần và kết nối với mạng; sau khi liên kết, bạn có thể cấp mật khẩu từ xa, xem nhật ký ra vào và kiểm tra mức pin",
  "Trước khi bàn giao, kiểm tra nhiều lần việc mở khóa bằng vân tay, mật khẩu, quẹt thẻ, App và chìa khóa cơ, hiệu chỉnh hành trình chốt cửa và khả năng khóa hoàn toàn, đồng thời xác nhận báo động và mức pin hoạt động bình thường",
];

const BRAND_CERTS = [
  "Chứng nhận bắt buộc của Trung Quốc CCC — yêu cầu cơ bản để sản phẩm khóa cửa điện tử được phép lưu hành hợp lệ trên thị trường",
  "An toàn điện đáp ứng yêu cầu CE / RoHS, linh kiện không chứa chất độc hại, vận hành điện áp thấp an toàn và đáng tin cậy",
  "Truyền dữ liệu sử dụng mã hóa AES, giao tiếp giữa đám mây và App được bảo vệ, mật khẩu tạm thời và eKey có thể thu hồi từ xa để bảo vệ dữ liệu ra vào",
  "Tương thích với App TTLock và nền tảng đám mây Sciener, với API / SDK mở tích hợp được với hệ thống quản lý khách sạn PMS, quản lý căn hộ và các hệ thống nhà thông minh của bên thứ ba",
  "Toàn bộ sản phẩm và mô-đun điện tử lõi được bảo hành, với hỗ trợ hậu mãi và phụ tùng thay thế theo hợp đồng mua bán",
];

const BRAND_PACK = [
  { label: "Đóng gói", value: "Hộp màu bán lẻ kèm xốp EPE và các khoang ngăn cách, mặt trước và mặt sau được cố định trong các ngăn riêng biệt để tránh hư hỏng do va đập" },
  { label: "Phụ kiện đi kèm", value: "Bộ vít lắp đặt, chìa khóa cơ khẩn cấp, pin, thẻ từ và sách hướng dẫn song ngữ (Trung/Anh) (tùy theo model)" },
  { label: "Đặt hàng tối thiểu", value: "Định giá theo số lượng; hỗ trợ đặt hàng kết hợp nhiều model và màu sắc, đơn hàng dự án có thể thương lượng" },
  { label: "Thời gian giao hàng", value: "Các model tiêu chuẩn giao nhanh từ kho; mặt khóa tùy chỉnh và đơn hàng OEM được thương lượng theo từng đơn (tham khảo 15–30 ngày)" },
  { label: "Hàng mẫu", value: "Có sẵn khóa mẫu hoàn chỉnh và tài khoản demo, giúp bạn trải nghiệm quy trình mở khóa và quản lý qua App trước khi đặt hàng số lượng lớn" },
];

const LOCK: SeriesMeta = {
  story:
      "Khóa thông minh TTLock biến một cánh cửa thông thường thành cổng vào thấu hiểu chiếc điện thoại của bạn — chọn bất kỳ phương thức nào trong năm cách: vân tay, mật khẩu, quẹt thẻ, Bluetooth qua App hay chìa khóa cơ, chỉ một thao tác nhẹ là chốt cửa trượt mở. Từ BOSS và MYSTIC đến RIO và SPIN, TTLock kết nối toàn bộ dòng khóa qua một App thống nhất, vì vậy dù bạn chọn màu đen, trắng hay bạc, tất cả đều được quản lý từ cùng một giao diện. Thêm một gateway WiFi và, từ cách xa ngàn dặm, bạn có thể cấp từ xa một mật khẩu giới hạn thời gian cho vị khách vừa đến dưới nhà, đồng thời theo dõi thời gian thực chính xác thời điểm cánh cửa đó được mở. Đây không chỉ là an toàn hơn — nó biến hành động nhỏ là mở một cánh cửa thành trải nghiệm kiểm soát nhẹ nhàng, trọn vẹn.",
    heritage:
      "Khóa thông minh là trái tim và bộ mặt của hệ sinh thái TTLock — nền tảng mở rộng ra từ đó đến gateway, chuông cửa, cảm biến cửa và camera, tạo nên bức tranh kiểm soát ra vào thông minh hoàn chỉnh. Qua nhiều năm, TTLock đã được hàng chục nghìn căn hộ, nhà cho thuê nghỉ dưỡng và văn phòng trên khắp thế giới tin dùng, xây dựng nên thành tích mở khóa ổn định, đáng tin cậy cùng hệ thống quản trị hậu trường hoàn thiện.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Vân tay / mật khẩu / quẹt thẻ / Bluetooth qua App / chìa khóa cơ (tùy theo model)" },
      { label: "Giao tiếp Bluetooth", value: "Bluetooth 5.0 tiết kiệm năng lượng, ghép nối ở khoảng cách gần với điện thoại, mở khóa và cấu hình cục bộ ngay cả khi không có mạng" },
      { label: "Gateway WiFi", value: "Thêm gateway WiFi để cấp mật khẩu từ xa, mở khóa từ xa và tải lên nhật ký ra vào" },
      { label: "Nguồn điện", value: "Dùng pin khô với cảnh báo pin yếu qua App; một số model có cổng cấp nguồn khẩn cấp Type-C / 9V" },
      { label: "Vật liệu và gia công", value: "Mặt khóa hợp kim kẽm / hợp kim nhôm, hoàn thiện kính cường lực hoặc kim loại xước, đầu đọc vân tay bán dẫn" },
      { label: "Ứng dụng", value: "Căn hộ cho thuê, nhà nghỉ dưỡng, khách sạn, văn phòng và cửa ra vào nhà thông minh" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "📲", title: "Quản lý từ xa qua App", desc: "Kết hợp với gateway WiFi, cấp mật khẩu từ xa, mở khóa từ xa và xem nhật ký ra vào — chiếc khóa của bạn nằm gọn trong lòng bàn tay." },
      { icon: "🔑", title: "Mở khóa năm trong một", desc: "Vân tay / mật khẩu / thẻ / App / chìa khóa — người nhà và khách mỗi người dùng cách phù hợp với mình, vừa tiện lợi vừa an toàn." },
      { icon: "🏨", title: "Mỗi phòng một mã", desc: "Cấp cho khách một mật khẩu dùng một lần hoặc giới hạn thời gian, tự động hết hạn khi trả phòng, đơn giản hóa việc quản lý cho thuê và lưu trú ngắn ngày." },
      { icon: "🔋", title: "Nguồn điện bền bỉ", desc: "Thiết kế tiết kiệm điện với cảnh báo pin yếu, cùng cổng cấp nguồn khẩn cấp để bạn không bao giờ bị nhốt ngoài cửa." },
      { icon: "🛡️", title: "Báo động chống phá khóa", desc: "Cạy phá hay nhập sai liên tục sẽ kích hoạt báo động tại chỗ và thông báo đẩy qua App, bổ sung thêm một lớp phòng vệ." },
    ],
    projectShowcase: [
      "Thay khóa toàn bộ tòa nhà cho thuê dài hạn và lưu trú ngắn ngày Airbnb, với quản lý tập trung mỗi phòng một mã",
      "Tự nhận phòng cho nhà nghỉ dưỡng và nhà trọ boutique, với cấp mã từ xa loại bỏ thời gian chờ ở quầy lễ tân",
      "Phân quyền theo từng cá nhân cho văn phòng và không gian làm việc chung, thu hồi quyền tức thì khi rời đi",
    ],
    faq: [
      { q: "Khóa thông minh TTLock có thể điều khiển từ xa không?", a: "Có. Bản thân chiếc khóa được quản lý ở khoảng cách gần qua Bluetooth, và khi bạn thêm một gateway WiFi có kết nối mạng, bạn có thể cấp mật khẩu từ xa, mở khóa từ xa và xem nhật ký ra vào từ App." },
      { q: "Khóa có phù hợp để quản lý căn hộ cho thuê hay khách sạn không?", a: "Rất phù hợp. Bạn có thể cấp cho mỗi khách một mật khẩu dùng một lần hoặc giới hạn thời gian tự động hết hạn, đồng thời quản lý nhiều khóa và phân quyền tập trung từ một hệ thống quản trị duy nhất." },
      { q: "Tôi có bị nhốt ngoài cửa nếu hết pin không?", a: "Không. App sẽ cảnh báo trước về tình trạng pin yếu; hầu hết các model có cổng cấp nguồn khẩn cấp Type-C hoặc 9V ở mặt dưới, cho phép cấp nguồn tạm thời để mở cửa, và chìa khóa cơ đóng vai trò phương án dự phòng cuối cùng." },
      { q: "Số lượng đặt hàng tối thiểu và thời gian giao hàng là bao nhiêu?", a: "Định giá theo số lượng, hỗ trợ đặt hàng kết hợp nhiều model và màu sắc; các model tiêu chuẩn giao nhanh từ kho, trong khi mặt khóa tùy chỉnh có thời gian giao hàng thương lượng theo từng đơn." },
    ],
};

export const TTLOCK_SERIES_META: Record<string, SeriesMeta> = {
  "smart-lock": LOCK,
  deadbolt: LOCK,
  other: LOCK,
  lever: {
    story:
      "Khóa tay gạt thông minh TTLock (HANDLE) gói gọn trí thông minh của một chiếc khóa điện tử vào tay nắm thoải mái, sẵn sàng để cầm — thiết kế tay gạt tích hợp tất cả trong một, chỉ cần ấn xuống là cửa mở, đúng với động tác bản năng của những cánh cửa thường ngày. Khóa được tạo ra để dễ lắp đặt và dễ sử dụng, nâng cấp cửa nội thất và cửa ra vào lên phương thức mở khóa đa dạng bằng vân tay, mật khẩu, thẻ và App mà không cần cải tạo lớn cánh cửa. Các tông màu đen trắng tinh tế hòa hợp ở mọi nơi, từ cửa căn hộ đến vách ngăn văn phòng. Với bất kỳ không gian nào muốn nâng cấp thông minh nhanh chóng, chi phí thấp, đây là điểm khởi đầu nhẹ nhàng nhất.",
    heritage:
      "Khóa tay gạt là thành viên gần gũi nhất với nhịp sống hằng ngày trong gia đình TTLock — nó mang trọn vẹn khả năng mở khóa thông minh thông qua động tác ấn xuống quen thuộc nhất. Điều đó có nghĩa là việc đi theo hướng thông minh không còn đòi hỏi lập kế hoạch từ đầu; ngay cả một cánh cửa cũ cũng có thể được nâng cấp một cách tao nhã.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Vân tay / mật khẩu / quẹt thẻ / Bluetooth qua App / chìa khóa cơ (tùy theo model)" },
      { label: "Giao tiếp Bluetooth", value: "Bluetooth 5.0 ghép nối gần, đăng ký vân tay, mật khẩu và thẻ cục bộ qua App" },
      { label: "Gateway WiFi", value: "Gateway WiFi tùy chọn để cấp mật khẩu từ xa và xem nhật ký ra vào" },
      { label: "Nguồn điện", value: "Dùng pin khô, cảnh báo pin yếu qua App, cổng cấp nguồn khẩn cấp làm dự phòng" },
      { label: "Kiểu dáng", value: "Tay gạt tích hợp tất cả trong một, ấn xuống để mở, dễ lắp đặt mà không cần cải tạo lớn cánh cửa" },
      { label: "Ứng dụng", value: "Cửa phòng, cửa ra vào, vách ngăn văn phòng và các loại cửa khác" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🚪", title: "Ấn để mở", desc: "Ấn tay nắm xuống để mở là động tác trực quan, nên người già lẫn trẻ nhỏ đều dễ dàng làm quen." },
      { icon: "🔧", title: "Dễ lắp đặt và cải tạo", desc: "Không cần cải tạo lớn cánh cửa, nên ngay cả cửa cũ cũng nhanh chóng nâng cấp thành khóa thông minh." },
      { icon: "📲", title: "Quản lý qua App", desc: "Với gateway, cấp mật khẩu từ xa và xem nhật ký, quản lý nhiều cửa tập trung." },
      { icon: "🔑", title: "Nhiều phương thức mở khóa", desc: "Chọn vân tay / mật khẩu / thẻ / App / chìa khóa — tiện lợi cho cả người nhà lẫn khách." },
      { icon: "🎨", title: "Đen trắng linh hoạt", desc: "Tông màu tinh tế hòa vào mọi phong cách trang trí, phù hợp cả ở căn hộ lẫn văn phòng." },
    ],
    projectShowcase: [
      "Nâng cấp hàng loạt cửa căn hộ cho thuê, để người thuê tự quản lý mật khẩu",
      "Phân quyền vân tay và thẻ theo từng người cho văn phòng và vách ngăn phòng họp",
      "Nâng cấp thông minh nhanh chóng cho phòng nhà nghỉ dưỡng, lắp đặt không cần cải tạo lớn cánh cửa",
    ],
    faq: [
      { q: "Khóa tay gạt có khó lắp đặt không?", a: "Không. Thiết kế tay gạt tích hợp tất cả trong một không cần cải tạo lớn cánh cửa — chỉ cần lắp đặt theo từng bước trong sách hướng dẫn, và nó vừa với hầu hết cửa phòng và cửa ra vào tiêu chuẩn." },
      { q: "Tôi có thể cấp mật khẩu từ xa không?", a: "Khóa được quản lý cục bộ qua Bluetooth, và với gateway WiFi tùy chọn có kết nối mạng, bạn có thể cấp mật khẩu từ xa và xem nhật ký ra vào." },
      { q: "Khóa hỗ trợ những phương thức mở khóa nào?", a: "Khóa hỗ trợ vân tay, mật khẩu, quẹt thẻ, Bluetooth qua App và chìa khóa cơ, với tổ hợp cụ thể tùy theo model." },
      { q: "Còn về đặt hàng tối thiểu và tùy chỉnh thì sao?", a: "Định giá theo số lượng, hỗ trợ tông màu đen trắng và kết hợp nhiều model; đơn hàng dự án cho phép thương lượng cấu hình tùy chỉnh." },
    ],
  },
  cylinder: {
    story:
      "Lõi khóa thông minh TTLock (SMART CYLINDER) là một bản nâng cấp nhẹ nhàng cho cánh cửa cũ — không cần thay toàn bộ bộ khóa, nó hoán đổi lõi Euro tầm thường ấy thành một lõi thông minh có thể lên mạng và cấp mã. Chỉ một cú vặn, App, mật khẩu hay chìa khóa cơ đều mở được cửa, trong khi mặt cửa và thân cửa nguyên bản vẫn được giữ nguyên. Lõi khóa đặc biệt phù hợp với khách sạn và căn hộ nơi quy cách khóa đã được chuẩn hóa: chỉ một lần thay lõi và toàn bộ cửa của cả tòa nhà gia nhập hệ thống quản lý thông minh. Đây là con đường số hóa kín đáo nhất — và cũng thông minh nhất: thay đổi nhỏ nhất để có quyền kiểm soát lớn nhất.",
    heritage:
      "Lõi khóa thông minh khiến việc nâng cấp khóa cũ trở nên dễ dàng — nó cô đọng sức mạnh của kiểm soát ra vào thông minh vào một lõi khóa tiêu chuẩn, tiết kiệm chi phí và công sức thay toàn bộ cánh cửa. Với các tòa nhà hiện hữu và chuỗi khách sạn, đây là giải pháp chuyển tiếp thực dụng nhất.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Bluetooth qua App / mật khẩu (model có bàn phím) / chìa khóa cơ (tùy theo model)" },
      { label: "Giao tiếp Bluetooth", value: "Bluetooth 5.0 ghép nối gần, việc phân quyền và quản lý mật khẩu thực hiện trong App" },
      { label: "Gateway WiFi", value: "Với gateway WiFi, hỗ trợ cấp mật khẩu từ xa và nhật ký mở khóa" },
      { label: "Nguồn điện", value: "Pin cúc tích hợp / pin sạc, cảnh báo pin yếu qua App" },
      { label: "Quy cách", value: "Kích thước lõi Euro, có nhiều độ dài (ví dụ 35+35), thay thế trực tiếp cho lõi tiêu chuẩn" },
      { label: "Ứng dụng", value: "Nâng cấp khóa khách sạn và căn hộ hiện hữu mà không cần thay toàn bộ bộ khóa" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "♻️", title: "Thay lõi, nâng cấp tức thì", desc: "Chỉ thay lõi khóa, không thay toàn bộ bộ khóa, giữ nguyên mặt cửa và thân cửa như cũ." },
      { icon: "💰", title: "Cải tạo tiết kiệm chi phí", desc: "Nâng cấp hàng loạt cho các tòa nhà hiện hữu và chuỗi khách sạn giúp giảm mạnh nhân công và chi phí." },
      { icon: "📲", title: "Điều khiển tập trung qua App", desc: "Với gateway, cấp mã và kiểm tra nhật ký từ xa, quản lý cửa của cả tòa nhà tại một nơi." },
      { icon: "🔑", title: "Dự phòng bằng chìa khóa", desc: "Vẫn giữ lại khả năng mở khóa bằng chìa cơ, cung cấp phương án dự phòng đáng tin cậy ngay cả khi gặp sự cố pin." },
      { icon: "📐", title: "Tương thích chuẩn Euro", desc: "Kích thước chuẩn Euro với nhiều độ dài, khả năng tương thích cao và thay thế dễ dàng." },
    ],
    projectShowcase: [
      "Thay hàng loạt lõi khóa theo quy cách tiêu chuẩn trên các chuỗi khách sạn, gia nhập hệ thống quản lý ra vào tập trung",
      "Nâng cấp thông minh chi phí thấp cho căn hộ hiện hữu mà vẫn giữ nguyên mặt cửa gốc",
      "Nâng cấp lõi khóa tiêu chuẩn cho tòa nhà văn phòng, với việc cấp quyền theo từng bộ phận",
    ],
    faq: [
      { q: "Lõi khóa thông minh có cần thay toàn bộ khóa không?", a: "Không. Nó thay thế trực tiếp một lõi Euro tiêu chuẩn, giữ nguyên thân cửa, mặt cửa và tay nắm như cũ — cách nâng cấp ít phiền phức nhất." },
      { q: "Làm sao để xác nhận đúng kích thước?", a: "Đo chiều dài lõi gốc trước khi đặt hàng (ví dụ 35+35) và chọn quy cách phù hợp; nếu không chắc chắn, cung cấp độ dày cửa và kích thước lõi hiện có, chúng tôi sẽ kiểm tra giúp bạn." },
      { q: "Lõi khóa có hỗ trợ quản lý từ xa không?", a: "Lõi khóa được quản lý cục bộ qua Bluetooth của App, và khi thêm một gateway WiFi, bạn có thể cấp mật khẩu từ xa và xem nhật ký mở khóa." },
      { q: "Lõi khóa có phù hợp dùng hàng loạt cho khách sạn không?", a: "Rất phù hợp. Khách sạn có quy cách khóa chuẩn hóa có thể gia nhập quản lý thông minh trên toàn bộ tòa nhà chỉ với một lần thay lõi, cấp và thu hồi quyền tập trung." },
    ],
  },
  padlock: {
    story:
      "Khóa móc thông minh TTLock (PADLOCK) giải phóng việc mở khóa khỏi chùm chìa trong túi bạn — chỉ một lần chạm vân tay hay một thao tác trong App là quai khóa bật mở. Khóa sinh ra để đương đầu với nắng mưa, với thân khóa chống nước, chịu thời tiết xử lý môi trường ngoài trời một cách nhẹ nhàng và pin sạc tích hợp giúp bạn khỏi phải thay pin thường xuyên. Từ nhà kho, tủ điện đến tủ khóa và phương tiện, bất cứ nơi nào cần khóa linh hoạt mà lại ngại mất chìa, nó đều lấp được khoảng trống. Đây là chiếc chìa khóa bạn có thể mang theo bất cứ đâu, dùng ở bất cứ đâu và cấp quyền từ xa.",
    heritage:
      "Khóa móc thông minh là thành viên cơ động nhất trong hệ sinh thái TTLock — nó mang sự tiện lợi của việc mở khóa không cần chìa đến những tình huống di động và ngoài trời mà khóa cửa cố định không thể với tới, để bán kính quản lý của bạn không còn bị bó hẹp trong một cánh cửa duy nhất.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Vân tay / Bluetooth qua App (tùy theo model)" },
      { label: "Giao tiếp Bluetooth", value: "Bluetooth 5.0 ghép nối gần, phân quyền qua App và chia sẻ được quyền mở khóa" },
      { label: "Gateway WiFi", value: "Gateway tùy chọn để cấp quyền từ xa và tải lên nhật ký mở khóa" },
      { label: "Nguồn điện", value: "Pin lithium sạc tích hợp, sạc qua USB, thời lượng pin dài" },
      { label: "Khả năng bảo vệ", value: "Thân khóa chống nước, chịu thời tiết với quai khóa tôi cứng, phù hợp với môi trường ngoài trời" },
      { label: "Ứng dụng", value: "Kiểm soát ra vào, tủ khóa, nhà kho, tủ điện, phương tiện và các tình huống di động, ngoài trời khác" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🔒", title: "Mở khóa không cần chìa", desc: "Mở bằng vân tay hoặc App — tạm biệt nỗi lo mất chìa và phiền toái sao chép chìa." },
      { icon: "💧", title: "Chống nước, chịu thời tiết", desc: "Không ngại gió, mưa, nắng ngoài trời, đáng tin cậy cho nhà kho, phương tiện và tủ điện." },
      { icon: "🔋", title: "Thời lượng pin sạc", desc: "Pin sạc tích hợp với nguồn USB, bền bỉ và không phải thay pin thường xuyên." },
      { icon: "📲", title: "Cấp quyền từ xa", desc: "Với gateway, chia sẻ hoặc thu hồi quyền mở khóa từ xa để quản lý linh hoạt." },
      { icon: "🧳", title: "Linh hoạt mang đi bất cứ đâu", desc: "Mang theo bên mình và khóa ở bất cứ đâu, phù hợp với các tình huống di động và tạm thời." },
    ],
    projectShowcase: [
      "Quản lý không cần chìa cho nhà kho và tủ điện, với việc phân phối quyền từ xa",
      "Khóa chống nước cho tủ ngoài trời và hộp thiết bị, với cấp quyền tạm thời cho nhiều người dùng",
      "Khóa linh hoạt cho phương tiện và tài sản di động, với nhật ký mở khóa truy vết được",
    ],
    faq: [
      { q: "Khóa móc thông minh có dùng được ngoài trời không?", a: "Có. Thân khóa chống nước, chịu thời tiết và quai khóa được tôi cứng, phù hợp với gió, mưa, nắng, và thường được dùng cho nhà kho, tủ điện và tủ khóa thiết bị." },
      { q: "Khóa sạc như thế nào?", a: "Khóa có pin lithium sạc tích hợp và sạc qua USB, với thời lượng pin dài giúp bạn khỏi phải thay pin thường xuyên." },
      { q: "Nhiều người có thể dùng chung không?", a: "Có. Cấp quyền cho nhiều người dùng mở khóa qua App, và với gateway, bạn cũng có thể chia sẻ hoặc thu hồi quyền từ xa." },
      { q: "Còn về đặt hàng tối thiểu và thời gian giao hàng thì sao?", a: "Định giá theo số lượng, hỗ trợ kết hợp nhiều model; hàng tiêu chuẩn giao nhanh từ kho, và hàng tùy chỉnh được thương lượng theo từng đơn." },
    ],
  },
  outdoor: {
    story:
      "Dòng khóa và kiểm soát ra vào ngoài trời TTLock (gateway dòng G và kiểm soát ra vào) là mắt xích then chốt đưa kiểm soát ra vào thông minh vươn ra giữa gió mưa — thân khóa chịu thời tiết bền bỉ với nắng mưa, trong khi mở khóa bằng App và mật khẩu đưa cổng sân và lối ra vào khuôn viên vào hệ thống quản lý thống nhất. Từ kết nối WiFi của G2 đến cổng LAN có dây của G3, mạng di động GSM của G4 và WiFi băng tần kép của G5, các tùy chọn kết nối khác nhau bao phủ mọi nơi từ nhà ở đến khuôn viên. Ngay cả khi một chiếc cổng cách xa router, nó vẫn tìm được đường để lên mạng. Đây là một ranh giới thông minh ngăn được thời tiết bên ngoài mà vẫn kết nối với đám mây.",
    heritage:
      "Dòng ngoài trời chịu đựng được các môi trường khắc nghiệt — nó đưa kiểm soát ra vào thông minh của TTLock vượt ra ngoài cửa ra vào trong nhà, mở rộng đến sân vườn, khuôn viên và lối vào công cộng, mang kết nối và quản lý từ xa đến một ranh giới rộng lớn hơn.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Bluetooth qua App / mật khẩu / quẹt thẻ (tùy theo model)" },
      { label: "Giao tiếp Bluetooth", value: "Quản lý qua ghép nối Bluetooth ở khoảng cách gần, mở khóa cục bộ ngay cả khi không có mạng" },
      { label: "Gateway WiFi", value: "G2 WiFi / G3 cổng LAN / G4 GSM / G5 WiFi băng tần kép, có nhiều tùy chọn kết nối" },
      { label: "Nguồn điện", value: "Cấp nguồn bằng adapter, với một số model hỗ trợ cấp nguồn PoE qua dây mạng" },
      { label: "Khả năng bảo vệ", value: "Thân khóa chịu thời tiết, chống nước và chống bụi, phù hợp với cổng ngoài trời và lối vào khuôn viên" },
      { label: "Ứng dụng", value: "Cổng sân, kiểm soát ra vào khuôn viên, lối vào ngoài trời và các khu vực ngoại thất khác" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🌧️", title: "Chịu thời tiết, chống nước", desc: "Chịu được gió, nắng và mưa, phù hợp với cổng sân và kiểm soát ra vào ngoài trời." },
      { icon: "📡", title: "Nhiều phương thức kết nối", desc: "Tùy chọn WiFi / cổng LAN / GSM / băng tần kép — ngay cả cổng cách xa router cũng có thể lên mạng." },
      { icon: "📲", title: "Mở cửa từ xa", desc: "Mở khóa từ xa và cấp mật khẩu qua App, để khách không cần được đón tại chỗ." },
      { icon: "🔌", title: "Cấp nguồn linh hoạt", desc: "Cấp nguồn bằng adapter hoặc PoE qua dây mạng, làm dễ dàng nhiều tình huống đi dây khác nhau." },
      { icon: "🏘️", title: "Sẵn sàng cho khuôn viên", desc: "Bao phủ nhiều tình huống kiểm soát ra vào ngoài trời từ sân nhà đến lối vào khuôn viên." },
    ],
    projectShowcase: [
      "Mở khóa từ xa cho sân biệt thự và cổng sân, không cần đón khách tại chỗ",
      "Lối vào khuôn viên và nhà máy kết nối qua gateway để quản lý mạng thống nhất",
      "Triển khai kết nối mạng linh hoạt cho lối vào công cộng ngoài trời qua GSM hoặc PoE",
    ],
    faq: [
      { q: "Làm sao để lên mạng khi cổng ngoài trời cách xa router?", a: "Chọn phương thức kết nối phù hợp với môi trường: chọn G2 / G5 khi gần WiFi, G3 nơi có cổng LAN, hoặc mạng di động GSM của G4 nơi không có phủ sóng đường truyền cố định." },
      { q: "Khóa ngoài trời có chống nước không?", a: "Thân khóa chống nước, chịu thời tiết được thiết kế riêng cho ngoài trời, chịu được gió, nắng và mưa, phù hợp với cổng sân và lối vào khuôn viên." },
      { q: "Tôi có thể mở cửa từ xa cho khách không?", a: "Có. Khi đã lên mạng, mở khóa từ xa hoặc cấp một mật khẩu tạm thời qua App, và khách có thể vào ngay khi vừa đến cổng." },
      { q: "Nguồn điện được xử lý như thế nào?", a: "Cấp nguồn bằng adapter, với một số model gateway hỗ trợ cấp nguồn PoE qua dây mạng để đi dây linh hoạt hơn." },
    ],
  },
  motorlock: {
    story:
      "Khóa mô-tơ TTLock (MOTOR LOCK) được tạo ra cho các cánh cửa kính và nhôm hiện đại — mô-tơ tích hợp dẫn động chốt cửa tự động đẩy ra và rút vào, đóng mở mượt mà và êm ái, không hề có sự ì ạch của thao tác thủ công. Một lệnh App hay một mật khẩu là cửa mở hoặc đóng dứt khoát, một sự kết hợp hoàn hảo cho mặt dựng kính thoáng đãng, trong suốt của cửa hàng và tòa nhà văn phòng. Khóa mở rộng kiểm soát ra vào thông minh từ những cánh cửa ra vào nặng nề đến các không gian thương mại hiện đại, biến chính hành động đóng mở một cánh cửa thành điều gì đó thanh thoát. Khi một không gian theo đuổi sự nhẹ nhàng, trong suốt và tự động hóa, khóa mô-tơ chính là người thực thi thầm lặng, quả quyết.",
    heritage:
      "Khóa mô-tơ phù hợp với cửa thương mại và cửa kính hiện đại — bằng cách đóng mở tự động bằng mô-tơ, nó lấp khoảng trống kiểm soát ra vào thông minh cho cửa kính và cửa nhôm, để các không gian thương mại trong suốt cũng được tận hưởng quản lý không cần chìa.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Bluetooth qua App / mật khẩu / quẹt thẻ (tùy theo model)" },
      { label: "Giao tiếp Bluetooth", value: "Quản lý qua ghép nối Bluetooth ở khoảng cách gần, đăng ký và phân quyền trong App" },
      { label: "Gateway WiFi", value: "Với gateway WiFi, mở khóa từ xa, cấp mật khẩu và kiểm tra nhật ký" },
      { label: "Nguồn điện", value: "Cấp nguồn bằng adapter, với mô-tơ dẫn động chốt cửa tự động đẩy ra và rút vào" },
      { label: "Kết cấu", value: "Đóng mở tự động bằng mô-tơ, êm ái và mượt mà, phù hợp với cửa kính / cửa nhôm" },
      { label: "Ứng dụng", value: "Cửa kính và cửa nhôm tại cửa hàng, tòa nhà văn phòng và showroom" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "⚙️", title: "Tự động hóa bằng mô-tơ", desc: "Mô-tơ dẫn động chốt cửa tự động đẩy ra và rút vào — mượt mà, êm ái và nhẹ nhàng." },
      { icon: "🚪", title: "Sẵn sàng cho cửa kính", desc: "Thiết kế cho cửa kính và cửa nhôm, hòa vào mặt dựng thương mại trong suốt." },
      { icon: "📲", title: "Mở khóa từ xa", desc: "Với gateway, mở cửa, cấp mật khẩu và xem nhật ký từ xa qua App." },
      { icon: "🏢", title: "Lựa chọn hàng đầu cho thương mại", desc: "Phù hợp với cửa hàng, tòa nhà văn phòng và showroom, nâng tầm trải nghiệm thông minh của mọi mặt dựng." },
      { icon: "🔑", title: "Nhiều phương thức mở khóa", desc: "Kết hợp linh hoạt App / mật khẩu / quẹt thẻ, phục vụ cả khách lẫn nhân viên." },
    ],
    projectShowcase: [
      "Đóng mở tự động cửa kính tại cửa hàng và cửa hàng thương hiệu, nâng tầm trải nghiệm mặt tiền",
      "Quản lý phân quyền cho cửa nhôm tại sảnh văn phòng và khu vực họp",
      "Điều khiển từ xa việc đóng mở cửa kính tại showroom và không gian trưng bày",
    ],
    faq: [
      { q: "Khóa mô-tơ có lắp được trên cửa kính không?", a: "Có. Khóa mô-tơ được thiết kế cho cửa kính và cửa nhôm, với mô-tơ dẫn động chốt cửa tự động để vận hành mượt mà, êm ái, phù hợp với mặt dựng thương mại trong suốt." },
      { q: "Khóa mô-tơ khác gì so với khóa thông minh thông thường?", a: "Khóa mô-tơ hoàn tất việc đóng mở tự động qua mô-tơ tích hợp, không cần thao tác thủ công — phù hợp hơn với thói quen sử dụng của cửa kính thương mại hiện đại." },
      { q: "Khóa có hỗ trợ điều khiển từ xa không?", a: "Khóa được quản lý cục bộ qua Bluetooth của App, và khi thêm một gateway WiFi, bạn có thể mở khóa từ xa, cấp mật khẩu và xem nhật ký." },
      { q: "Phương thức cấp nguồn là gì?", a: "Khóa dùng adapter để dẫn động mô-tơ; chỉ cần đi dây theo sách hướng dẫn khi lắp đặt, và nó vận hành đáng tin cậy." },
    ],
  },
  gateway: {
    story:
      "Gateway TTLock (GATEWAY) là trung tâm kết nối từ xa của toàn bộ hệ thống khóa thông minh — nó bắc cầu giữa các khóa Bluetooth và WiFi gia đình của bạn, kết nối những chiếc khóa vốn chỉ quản lý được ở khoảng cách gần với đám mây. Cắm nguồn, kết nối với mạng, và chiếc khóa giờ đây có thể được cấp mật khẩu và mở khóa từ xa, với nhật ký ra vào tải lên App theo thời gian thực. Từ một gateway phổ thông như RENTY WiFi đến các tùy chọn kết nối đa dạng của dòng G, nó mở rộng tầm với của chiếc khóa từ trước cửa nhà bạn đến tận chân trời xa. Không có nó, một chiếc khóa là một hòn đảo; có nó, cả hệ thống kiểm soát ra vào mới thực sự sống động.",
    heritage:
      "Gateway là trung tâm kết nối từ xa của hệ thống TTLock — nó nâng cấp khả năng cục bộ của một chiếc khóa Bluetooth thành quản lý từ xa có thể vươn tới qua đám mây, một mắt xích không thể thiếu cho căn hộ và khách sạn vận hành kiểm soát ra vào tập trung.",
    technicalSpecs: [
      { label: "Phương thức mở khóa", value: "Không trực tiếp mở khóa; cung cấp kênh mở khóa từ xa và cấp mã cho khóa" },
      { label: "Giao tiếp Bluetooth", value: "Kết nối với các khóa TTLock lân cận qua Bluetooth, bắc cầu cho giao tiếp cục bộ của chúng" },
      { label: "Gateway WiFi", value: "Kết nối lên WiFi gia đình / dự án, bắc cầu giữa Bluetooth và WiFi để vươn tới đám mây" },
      { label: "Nguồn điện", value: "Cấp nguồn bằng adapter cắm điện, luôn duy trì kết nối trực tuyến liên tục" },
      { label: "Khả năng tương thích", value: "Tương thích với khóa TTLock, khóa tay gạt, lõi khóa, khóa móc và các thiết bị khác" },
      { label: "Ứng dụng", value: "Căn hộ, khách sạn, văn phòng và các tình huống cần quản lý khóa từ xa và tập trung" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "📡", title: "Kết nối từ xa", desc: "Khóa Bluetooth gia nhập WiFi qua gateway, nên việc mở khóa và cấp mã không còn bị giới hạn khoảng cách." },
      { icon: "📲", title: "Tải lên nhật ký", desc: "Nhật ký ra vào tải lên App theo thời gian thực, nên ai vào và lúc nào đều rõ ràng trong nháy mắt." },
      { icon: "🏨", title: "Quản lý tập trung", desc: "Căn hộ và khách sạn vận hành nhiều khóa từ một hệ thống quản trị, cấp và thu hồi quyền hiệu quả." },
      { icon: "🔌", title: "Cắm là chạy", desc: "Chỉ cần cắm nguồn, kết nối với mạng và liên kết — đơn giản để lắp đặt và luôn trực tuyến." },
      { icon: "🧩", title: "Tương thích hệ sinh thái", desc: "Tương thích với khóa, khóa tay gạt, lõi khóa và khóa móc, mở rộng cả hệ thống kiểm soát ra vào." },
    ],
    projectShowcase: [
      "Triển khai gateway tập trung cho nhà cho thuê dài hạn, với cấp mã và quản lý từ xa cho cả tòa nhà",
      "Nhận phòng từ xa cho nhà nghỉ dưỡng và khách sạn, với nhật ký ra vào tải lên theo thời gian thực",
      "Phối hợp nhiều cửa cho không gian văn phòng, với quyền được cấp và thu hồi tập trung tại hệ thống quản trị",
    ],
    faq: [
      { q: "Gateway dùng để làm gì?", a: "Nó là cầu nối giữa các khóa Bluetooth và WiFi; khi một chiếc khóa gia nhập đám mây qua gateway, bạn có thể cấp mật khẩu từ xa, mở khóa từ xa và tải lên nhật ký ra vào." },
      { q: "Một gateway hỗ trợ được bao nhiêu khóa?", a: "Nó có thể kết nối với nhiều khóa TTLock trong tầm phủ sóng; số lượng cụ thể tùy thuộc vào model và tín hiệu tại chỗ, và các tình huống mật độ cao có thể bổ sung thêm gateway." },
      { q: "Gateway được lắp đặt như thế nào?", a: "Cắm nguồn, kết nối với WiFi và liên kết các khóa lân cận trong App — không cần đi dây phức tạp, và nó luôn trực tuyến liên tục để duy trì kết nối." },
      { q: "Khóa có còn dùng được nếu mất mạng không?", a: "Có. Việc mở khóa cục bộ bằng vân tay, mật khẩu, quẹt thẻ và Bluetooth của khóa không bị ảnh hưởng; chỉ các tính năng từ xa tạm thời không khả dụng trong thời gian mất mạng và tự động đồng bộ ngay khi kết nối được khôi phục." },
    ],
  },
};

/** Helper: retrieve metadata by seriesOriginal, falling back to smart-lock by default. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TTLOCK_SERIES_META[seriesOriginal.trim()] || TTLOCK_SERIES_META["smart-lock"];
}
