/**
 * LINVOL metadata — rich content for product detail pages. Keyed by seriesOriginal (villa/retrofit/escalator/passenger).
 * Source: linvol.midea.com.cn — the official elevator brand of the Midea Group (Midea Building Technologies).
 * Manufacturer: Lingwang Elevator Co., Ltd. Service hotline: 400-700-7722.
 * Technical specifications reflect typical industry ranges and are intended as engineering-selection references only;
 * the final configuration is determined by the on-site survey and the official quotation.
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

const CERTS = [
  "Giấy phép sản xuất thiết bị đặc thù — thang máy là thiết bị đặc thù được Nhà nước quản lý, và LINVOL sản xuất theo giấy phép, với thang nguyên chiếc cùng các linh kiện đều nằm trong danh mục quản lý",
  "Tuân thủ quy định giám sát và kiểm định định kỳ thang máy (TSG 7001) — hoạt động sản xuất, lắp đặt, cải tạo và bảo trì đều thuộc phạm vi chế độ kiểm định",
  "Tuân thủ tiêu chuẩn quốc gia về an toàn sản xuất và lắp đặt thang máy (GB 7588) — bao gồm máy kéo, bộ khống chế vượt tốc, bộ hãm an toàn, giảm chấn và các bộ phận an toàn khác",
  "Thang máy gia đình sản xuất theo tiêu chuẩn mới GB/T 21739-2025 — các dòng biệt thự và dân dụng được thiết kế, chế tạo theo tiêu chuẩn quốc gia hiện hành",
  "Hệ thống quản lý chất lượng được thiết lập theo tiêu chuẩn của Tập đoàn Midea — thiết kế, sản xuất, kiểm thử và bàn giao được kiểm soát và truy xuất nguồn gốc trọn vẹn từ đầu đến cuối",
];

const MFG = [
  "LINVOL — thương hiệu thang máy chính thức của Tập đoàn Midea (doanh nghiệp thuộc Fortune Global 500), hoạt động dưới sự điều hành của Midea Building Technologies",
  "Nhà sản xuất: Lingwang Elevator Co., Ltd. — nhiều thập kỷ chuyên môn trong lĩnh vực sản xuất thang máy nguyên chiếc, với năng lực được nâng tầm hơn nữa sau khi gia nhập hệ sinh thái Midea",
  "Được hậu thuẫn bởi trung tâm R&D thang máy số hóa của Midea và nhà máy trong khu công nghiệp Phật Sơn, với các linh kiện trọng yếu được nghiên cứu và sản xuất nội bộ, tích hợp điều khiển đồng bộ giữa máy kéo và hệ thống điều khiển",
  "Máy kéo không hộp số nam châm vĩnh cửu đồng bộ tự sản xuất — hiệu suất cao, tiết kiệm năng lượng, vận hành êm ái và độ ồn thấp, tạo nên cốt lõi của trải nghiệm hiệu quả và thoải mái",
  "Công nghệ số và AI xuyên suốt mọi công đoạn: thiết kế, sản xuất, tùy biến, R&D, vận hành và bảo trì, với mỗi thang được căn chỉnh và kiểm tra an toàn riêng biệt trước khi xuất xưởng",
];

const PACK = [
  { label: "Hình thức cung cấp", value: "Hệ thống thang máy hoàn chỉnh (cabin, hệ thống kéo, tủ điều khiển, bộ vận hành cửa, ray dẫn hướng và nhiều hơn nữa) được giao dưới dạng gói kỹ thuật trọn bộ" },
  { label: "Tùy biến", value: "Hoàn thiện cabin, cấu hình mở cửa, bảng điều khiển và hệ thống tín hiệu được thiết kế riêng theo giếng thang và số tầng của công trình" },
  { label: "Bảo vệ vận chuyển", value: "Linh kiện chính xác được gia cố trong thùng hoặc khung gỗ, vách cabin và tấm cửa bọc màng chống trầy, và pallet bọc màng co để vận chuyển" },
  { label: "Dịch vụ", value: "Mô hình quản gia kết hợp chuyên gia — bảo hành trọn đời cộng bảo trì, đường dây nóng dịch vụ 400-700-7722" },
  { label: "Mẫu thử", value: "Có sẵn bảng màu hoàn thiện cabin và phương án cấu hình, với phong cách và tính năng được xác nhận trước khi đặt đơn hàng kỹ thuật" },
];

const INSTALL = [
  "Khảo sát giếng thang trước khi lắp đặt: chiều sâu hố pit, khoảng trống đỉnh tầng trên cùng, chiều cao hành trình, kích thước thông thủy giếng thang và số tầng, đồng thời kiểm chứng lựa chọn tải trọng và tốc độ",
  "Đội lắp đặt có giấy phép huy động tại công trường để lắp ráp ray dẫn hướng, máy kéo, cabin và đối trọng theo bản vẽ, tuân thủ quy phạm lắp đặt thiết bị đặc thù trong suốt quá trình",
  "Kết nối đúng cách nguồn điện, dây điều khiển, mạch khóa liên động cửa và thiết bị cứu hộ khẩn cấp khi mất điện để đảm bảo cấp nguồn và tiếp địa an toàn",
  "Căn chỉnh bộ khống chế vượt tốc, bộ hãm an toàn, giảm chấn và các bộ phận an toàn khác, đồng thời kiểm chứng độ chính xác dừng tầng, tốc độ vận hành và thời gian đóng/mở cửa",
  "Hoàn tất chạy thử không tải và đầy tải trước khi nghiệm thu, và chỉ bàn giao cho hành khách sử dụng sau khi đạt nghiệm thu của cơ quan kiểm định",
];

const CARE = [
  { title: "Bảo trì định kỳ", desc: "Mô hình quản gia kết hợp chuyên gia thực hiện kiểm tra theo kế hoạch, rà soát cáp thép và ray dẫn hướng, máy kéo nam châm vĩnh cửu, phanh, hệ thống cửa và tủ điều khiển để đảm bảo vận hành tin cậy." },
  { title: "Giám sát số hóa", desc: "Công nghệ số và AI hỗ trợ giám sát từ xa trạng thái vận hành, cảnh báo sớm các bất thường ở bộ vận hành cửa, dừng tầng, rung động và nhiều hơn nữa, xử lý sự cố trước khi chúng xảy ra." },
  { title: "Kiểm định an toàn", desc: "Phối hợp kiểm định định kỳ theo quy định TSG, thay thế các bộ phận an toàn khi hết tuổi thọ; khi xảy ra bất thường vận hành, thang được dừng ngay lập tức để chẩn đoán và không bao giờ chạy khi đang gặp sự cố." },
  { title: "Vệ sinh và chăm sóc", desc: "Giữ cabin, guốc trượt cửa, màn chắn quang và hộp gọi tầng luôn sạch sẽ, và bôi trơn ray dẫn hướng định kỳ để kéo dài tuổi thọ linh kiện và sự thoải mái khi di chuyển." },
];

const FAQ = [
  { q: "LINVOL có phải là thương hiệu của Midea không?", a: "Đúng vậy. LINVOL là thương hiệu thang máy chính thức của Tập đoàn Midea (doanh nghiệp thuộc Fortune Global 500), hoạt động dưới sự điều hành của Midea Building Technologies, với nhà sản xuất là Lingwang Elevator Co., Ltd." },
  { q: "Thang máy sử dụng hệ truyền động nào? Có tiết kiệm năng lượng không?", a: "Thang sử dụng máy kéo không hộp số nam châm vĩnh cửu đồng bộ, hiệu quả hơn, êm hơn và tiết kiệm năng lượng hơn so với các dòng có hộp số truyền thống, trong khi điều khiển nhóm thông minh còn giảm thêm tiêu thụ năng lượng khi chờ và khi vận hành." },
  { q: "An toàn của thang máy được đảm bảo như thế nào?", a: "Mỗi thang đều tuân thủ quy phạm an toàn GB 7588 và được trang bị bộ khống chế vượt tốc, bộ hãm an toàn, giảm chấn cùng thiết bị cứu hộ khẩn cấp khi mất điện, đồng thời được đưa vào chế độ sản xuất, lắp đặt và kiểm định định kỳ theo quy định TSG." },
  { q: "Có dịch vụ lắp đặt và bảo trì tại Việt Nam không?", a: "Vui lòng liên hệ Huayue để được tư vấn giải pháp cung cấp, lắp đặt và bảo trì kỹ thuật thang máy phù hợp với công trình của bạn; chúng tôi sẽ đưa ra khuyến nghị lựa chọn dựa trên điều kiện giếng thang và số tầng của bạn." },
  { q: "Chính sách bảo hành như thế nào?", a: "LINVOL áp dụng mô hình quản gia kết hợp chuyên gia trọn vòng đời — bảo hành trọn đời cộng bảo trì, đường dây nóng dịch vụ 400-700-7722, đảm bảo vận hành thang máy an toàn lâu dài." },
];

function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}

const WHY_BRAND = { icon: "🛗", title: "Thương hiệu Midea", desc: "LINVOL — thang máy chính thức của Tập đoàn Midea (doanh nghiệp thuộc Fortune Global 500), với sự hậu thuẫn của một nhà sản xuất lớn và chất lượng đáng tin cậy." };
const WHY_DIGITAL = { icon: "🤖", title: "Được số hóa toàn diện", desc: "Công nghệ số và AI xuyên suốt toàn bộ vòng đời thang máy, với giám sát từ xa và cảnh báo sớm bất thường giúp vận hành thông minh và an tâm hơn." };

export const LINVOL_SERIES_META: Record<string, SeriesMeta> = {
  villa: mk({
    story:
      "Thang máy biệt thự LINVOL đưa tầm vóc của ngôi nhà vào từng hành trình — cabin và các linh kiện được thiết kế lại toàn diện, với kết cấu nhỏ gọn tận dụng tối đa giếng thang, để cả một ngôi nhà khiêm tốn cũng có thể bố trí thang máy một cách thoải mái. Truyền động nam châm vĩnh cửu đồng bộ mang lại vận hành gần như tĩnh lặng và êm ái, để việc trở về nhà không còn bị ngắt quãng bởi tiếng ồn cơ khí; thiết kế cabin phong cách cùng các tùy chọn tùy biến phong phú hòa quyện liền mạch với nội thất, trở thành một món đồ nội thất nơi sảnh. Đó không chỉ là phương tiện di chuyển giữa các tầng — đó là một thành viên của gia đình, san sẻ gánh nặng cho cha mẹ, chăm chút cho con trẻ và thêm phần thư thái cho cuộc sống thường nhật. Với sự hậu thuẫn của Tập đoàn Midea, LINVOL đang vươn lên thành thương hiệu thang máy gia đình được lựa chọn.",
    heritage:
      "Thang máy gia đình là dòng sản phẩm ưu tiên của LINVOL, với mỗi thang được sản xuất theo tiêu chuẩn thang máy gia đình mới GB/T 21739-2025 và các thông số cấu hình vượt trội trên nhiều hạng mục. Được hậu thuẫn bởi hệ thống R&D của Midea Building Technologies, thang đưa năng lực kỹ thuật và tiêu chuẩn chất lượng của một nhà sản xuất lớn vào những căn biệt thự và nhà thấp tầng của vô số gia đình.",
    technicalSpecs: [
      { label: "Tải trọng định mức", value: "Khoảng 250 – 400kg (2 – 5 người, tùy biến theo bố cục và giếng thang)" },
      { label: "Tốc độ vận hành", value: "Khoảng 0.3 – 0.4m/s (dải tốc độ thấp êm ái cho gia đình)" },
      { label: "Kiểu truyền động", value: "Máy kéo không hộp số nam châm vĩnh cửu đồng bộ (độ ồn thấp, tiết kiệm năng lượng, vận hành êm ái)" },
      { label: "Hệ thống điều khiển", value: "Điều khiển tốc độ biến tần bằng vi xử lý, dừng tầng chính xác và khởi động/dừng nhẹ nhàng" },
      { label: "Số tầng phù hợp", value: "2 – 6 tầng (biệt thự, nhà phố và nhà thấp tầng cao cấp)" },
      { label: "Phạm vi tùy biến", value: "Nhiều tùy chọn cho hoàn thiện cabin, cấu hình mở cửa, bảng điều khiển và hệ thống tín hiệu" },
    ],
    whyChoose: [
      WHY_BRAND,
      { icon: "🏡", title: "Thiết kế cho gia đình", desc: "Kết cấu nhỏ gọn tận dụng tối đa giếng thang trong nhà, để cả những giếng thang nhỏ cũng có thể lắp đặt thoải mái." },
      { icon: "🎨", title: "Tùy biến linh hoạt", desc: "Cabin và phần ngoại thất có nhiều tùy chọn để hòa hợp với phong cách nội thất của bạn, liền mạch với ngôi nhà." },
      { icon: "🤫", title: "Êm ái và mượt mà", desc: "Truyền động nam châm vĩnh cửu đồng bộ vận hành êm, để việc di chuyển giữa các tầng không làm xáo trộn giấc nghỉ của gia đình." },
      WHY_DIGITAL,
    ],
    projectShowcase: ["Biệt thự đơn lập và nhà tự xây", "Nhà phố nhiều tầng", "Nhà song lập cao cấp và nhà nâng cấp"],
  }),
  retrofit: mk({
    story:
      "Thang máy lắp thêm LINVOL được chế tạo riêng cho các tòa nhà cũ chưa có thang máy — kết hợp công nghệ số mới nhất và thiết kế lấy con người làm trung tâm vào một chiếc thang máy lắp bổ sung, cuối cùng mang lại sự tôn nghiêm của việc về nhà chỉ với một chạm cho những khu dân cư lâu đời đã leo cầu thang bộ suốt nhiều thập kỷ. Đối diện với thực tế giếng thang chật hẹp và ràng buộc kết cấu ở các tòa nhà cũ, giải pháp nổi bật với các dòng nhỏ gọn và bố cục linh hoạt, giảm thiểu xáo trộn cho cư dân hiện hữu. Truyền động nam châm vĩnh cửu đồng bộ tiết kiệm năng lượng và vận hành êm ái cho việc sử dụng lâu dài không lo lắng; cabin rộng rãi, ngưỡng cửa thấp với nút bấm và thông báo bằng giọng nói rõ ràng đặc biệt thân thiện với người cao tuổi và những gia đình di chuyển cùng trẻ nhỏ. Nó giải quyết nhiều hơn cả chiều cao vật lý của bậc thang — nó phản ánh sự ấm áp của một thành phố dành cho người cao tuổi và cộng đồng của mình.",
    heritage:
      "Dòng lắp thêm đáp ứng nhu cầu của cộng đồng về việc bổ sung thang máy cho các chung cư cũ và nhà không thang máy — trao cho công trình hiện hữu một chiếc thang máy hoàn toàn mới là một phần quan trọng của tái thiết đô thị và nâng cấp thân thiện với người cao tuổi. Dựa trên năng lực kỹ thuật của Midea Building Technologies, LINVOL mang lại sự tin cậy và tôn nghiêm cho mỗi tòa nhà cũ.",
    technicalSpecs: [
      { label: "Tải trọng định mức", value: "Khoảng 320 – 630kg (4 – 8 người, tùy biến theo tòa nhà và giếng thang)" },
      { label: "Tốc độ vận hành", value: "Khoảng 0.4 – 1.0m/s (phù hợp với chiều cao tầng)" },
      { label: "Kiểu truyền động", value: "Máy kéo không hộp số nam châm vĩnh cửu đồng bộ (tiết kiệm năng lượng, chiếm dụng buồng máy tối thiểu)" },
      { label: "Hệ thống điều khiển", value: "Điều khiển tốc độ biến tần cộng cứu hộ khẩn cấp khi mất điện, dừng tầng chính xác và khởi động/dừng ổn định" },
      { label: "Số tầng phù hợp", value: "5 – 9 tầng (chủ yếu lắp thêm cho nhà thấp tầng đã cũ)" },
      { label: "Tính năng thích ứng", value: "Các dòng nhỏ gọn và bố cục linh hoạt phù hợp với giếng thang chật hẹp và kết cấu hiện hữu" },
    ],
    whyChoose: [
      WHY_BRAND,
      { icon: "🏢", title: "Thiết kế cho tòa nhà cũ", desc: "Được thiết kế để lắp thêm thang máy cho nhà thấp tầng hiện hữu, nhỏ gọn và linh hoạt để vừa với giếng thang chật hẹp." },
      { icon: "👵", title: "Thân thiện với người cao tuổi", desc: "Cabin rộng rãi, ngưỡng cửa thấp với nút bấm và thông báo bằng giọng nói rõ ràng phục vụ người cao tuổi và gia đình có trẻ nhỏ." },
      { icon: "⚡", title: "Tiết kiệm năng lượng", desc: "Truyền động nam châm vĩnh cửu đồng bộ tiêu thụ năng lượng thấp, giảm chi phí vận hành cho các khu dân cư cũ về lâu dài." },
      WHY_DIGITAL,
    ],
    projectShowcase: ["Lắp thêm thang máy cho nhà thấp tầng đã cũ", "Nâng cấp thân thiện với người cao tuổi cho khu dân cư người cao tuổi", "Dự án tái thiết đô thị và cải tạo công trình hiện hữu"],
  }),
  escalator: mk({
    story:
      "Thang cuốn LINVOL được chế tạo cho những dòng người không ngơi nghỉ — cuối tuần ở trung tâm thương mại, giờ cao điểm buổi sáng ở ga tàu điện ngầm, dòng hành khách cuồn cuộn tại sân bay. Với kết cấu giàn chính xác và hệ truyền động bền vững, nó biến hàng chục nghìn bậc bước thành những hành trình lên xuống êm ái, nhẹ nhàng. Bậc thang và tấm răng lược ăn khớp hoàn hảo, tay vịn di chuyển đồng bộ với bậc thang như một thể thống nhất, và mỗi bước chân đều cảm thấy vững chãi, an toàn và liền mạch. Cảm biến thông minh làm chậm thang về chế độ chờ khi không có người và lập tức tăng tốc khi có khách — vừa tiết kiệm năng lượng vừa chu đáo; bảo vệ an toàn toàn diện và dừng khẩn cấp tạo lớp phòng vệ cho những không gian lưu lượng cao. Đó là trụ cột năng lực vận chuyển êm ái và tin cậy nhất trong các không gian công cộng lớn.",
    heritage:
      "Thang cuốn là dòng sản phẩm của LINVOL dành cho các không gian giao thông công cộng và thương mại lưu lượng cao, với mỗi thang được sản xuất theo quy phạm an toàn thang máy quốc gia. Được hậu thuẫn bởi hệ thống sản xuất của Midea Building Technologies, nó mang lại độ bền và sự ổn định cấp thương mại cho các nhà ga, sân bay và tổ hợp đa năng.",
    technicalSpecs: [
      { label: "Năng lực định mức", value: "Khoảng 6000 – 9000 người/giờ (theo bề rộng bậc thang và tốc độ)" },
      { label: "Tốc độ vận hành", value: "Khoảng 0.5 – 0.65m/s (dải tốc độ phổ biến cho không gian công cộng)" },
      { label: "Kiểu truyền động", value: "Truyền động nam châm vĩnh cửu đồng bộ cộng biến tần thông minh, làm chậm để tiết kiệm năng lượng khi không có người" },
      { label: "Góc nghiêng", value: "Khoảng 30 – 35 độ (tùy biến theo chiều cao nâng và mặt bằng)" },
      { label: "Không gian phù hợp", value: "Trung tâm thương mại, nhà ga, sân bay và các không gian công cộng lưu lượng cao khác" },
      { label: "Tính năng an toàn", value: "Bảo vệ tấm răng lược, chống đảo chiều, nút dừng khẩn cấp, chổi quét chân váy và các lớp bảo vệ đa tầng khác" },
    ],
    whyChoose: [
      WHY_BRAND,
      { icon: "🏬", title: "Thiết kế cho dự án lớn", desc: "Đáp ứng nhu cầu vận hành liên tục với lưu lượng cao của trung tâm thương mại, nhà ga và sân bay." },
      { icon: "🛡️", title: "An toàn đa tầng", desc: "Bảo vệ tấm răng lược, chống đảo chiều và dừng khẩn cấp mang lại an toàn đảm bảo trong không gian công cộng." },
      { icon: "⚡", title: "Thông minh và tiết kiệm năng lượng", desc: "Làm chậm về chế độ chờ khi không có người và khởi động tức thì khi có khách, tiết kiệm năng lượng mà không ảnh hưởng trải nghiệm." },
      WHY_DIGITAL,
    ],
    projectShowcase: ["Trung tâm thương mại và tổ hợp đa năng", "Ga tàu điện ngầm, ga đường sắt và sân bay", "Dự án hạ tầng đô thị và giao thông công cộng"],
  }),
  passenger: mk({
    story:
      "Thang máy chở khách số hóa LINVOL là kết tinh sức mạnh số hóa của LINVOL — phù hợp với khách sạn, tòa nhà văn phòng và khu dân cư, nó chắt lọc hiệu năng, an toàn và hiệu quả năng lượng vào từng hành trình êm ái. Máy kéo không hộp số nam châm vĩnh cửu đồng bộ mang lại trải nghiệm hiệu quả, êm ái và tiết kiệm năng lượng, với phần cơ khí gần như không thể cảm nhận khi bạn ra vào cabin; điều khiển nhóm thông minh phối hợp nhiều cabin trong giờ cao điểm, rút ngắn thời gian chờ và làm trơn lưu thông. Công nghệ số và AI xuyên suốt toàn bộ vòng đời thang máy, từ giám sát vận hành đến dự đoán sự cố, mang lại cho người quản lý sự minh bạch và an tâm. Dừng tầng chính xác, khởi động/dừng nhẹ nhàng cùng trải nghiệm cabin lấy con người làm trung tâm thêm phần thư thái và tôn nghiêm cho hành trình đi làm và trở về nhà mỗi ngày.",
    heritage:
      "Thang máy chở khách là sản phẩm chủ lực của LINVOL, thể hiện rõ nhất sức mạnh số hóa của LINVOL và Midea. Dựa trên hệ thống R&D và sản xuất của Midea Building Technologies, nó mang lại truyền động hiệu quả, điều khiển nhóm thông minh và quản lý số hóa trọn vòng đời cho các dự án khách sạn, văn phòng và dân cư.",
    technicalSpecs: [
      { label: "Tải trọng định mức", value: "Khoảng 630 – 1600kg (8 – 21 người, tùy biến theo tòa nhà)" },
      { label: "Tốc độ vận hành", value: "Khoảng 1.0 – 2.5m/s (dải tốc độ cao được cấu hình theo chiều cao tầng)" },
      { label: "Kiểu truyền động", value: "Máy kéo không hộp số nam châm vĩnh cửu đồng bộ (hiệu quả, độ ồn thấp, tiết kiệm năng lượng)" },
      { label: "Hệ thống điều khiển", value: "Điều khiển nhóm thông minh cộng điều khiển tốc độ biến tần, điều phối giờ cao điểm trơn tru và dừng tầng chính xác" },
      { label: "Số tầng phù hợp", value: "Tầm trung đến cao tầng (khách sạn, tòa nhà văn phòng, khu dân cư)" },
      { label: "Công nghệ số", value: "Công nghệ số và AI xuyên suốt toàn bộ vòng đời, với giám sát từ xa và cảnh báo sớm" },
    ],
    whyChoose: [
      WHY_BRAND,
      { icon: "🏨", title: "Đa dạng loại dự án", desc: "Phù hợp với khách sạn, tòa nhà văn phòng, khu dân cư và nhiều loại hình công trình khác." },
      { icon: "🧠", title: "Điều khiển nhóm thông minh", desc: "Điều phối nhiều cabin phối hợp trong giờ cao điểm rút ngắn thời gian chờ và làm trơn lưu thông." },
      { icon: "⚡", title: "Hiệu quả và tiết kiệm năng lượng", desc: "Truyền động nam châm vĩnh cửu đồng bộ mang lại hiệu năng cao và mức tiêu thụ năng lượng thấp cho vận hành êm ái, tin cậy." },
      WHY_DIGITAL,
    ],
    projectShowcase: ["Khách sạn xếp hạng sao và căn hộ dịch vụ", "Tòa nhà văn phòng và không gian làm việc thương mại", "Khu dân cư và nhà ở cao tầng"],
  }),
  mrl: mk({
    story:
      "Thang máy chở khách không buồng máy LINVOL đưa buồng máy rời khỏi đỉnh tòa nhà — máy kéo nam châm vĩnh cửu đồng bộ dạng thanh nhỏ gọn được khéo léo giấu ngay trong giếng thang, không còn chiếm thêm diện tích xây dựng ở tầng trên cùng, giúp những tòa nhà nơi tấc đất tấc vàng tiết kiệm được không gian và chi phí thực sự. Hiệu suất sử dụng giếng thang lên tới 58.9%, cùng một giếng thang nay đổi lấy cabin rộng hơn và trải nghiệm di chuyển thoải mái hơn; hố pit siêu nông chỉ từ 1200mm, để cả những dự án cải tạo nhà cũ và công trình hạn chế hố pit cũng có thể triển khai thuận lợi. Truyền động nam châm vĩnh cửu đồng bộ êm ái và tiết kiệm năng lượng, dừng tầng chính xác, khởi động/dừng nhẹ nhàng, mỗi hành trình đều vững vàng và tôn nghiêm. Đó là tác phẩm tiêu biểu cho tư duy 'đòi hiệu quả từ không gian' trong thời đại thang máy số hóa.",
    heritage:
      "Thang máy chở khách không buồng máy là dòng cốt lõi của LINVOL hướng tới hiệu quả không gian cho các tòa nhà hiện đại. Dựa trên hệ thống R&D và sản xuất của Midea Building Technologies, nó mang ưu thế kỹ thuật về hiệu suất sử dụng giếng thang cao và hố pit siêu nông vào các tòa nhà văn phòng, dân cư và dự án cải tạo.",
    technicalSpecs: [
      { label: "Loại hình", value: "Thang máy chở khách · không buồng máy (MRL)" },
      { label: "Hiệu suất sử dụng giếng thang", value: "Lên tới 58.9% (máy kéo dạng thanh nhỏ gọn đặt trong giếng thang)" },
      { label: "Chiều sâu hố pit", value: "Hố pit siêu nông chỉ từ 1200mm (truyền thống khoảng 1500mm)" },
      { label: "Tải trọng định mức", value: "Khoảng 630 – 1600kg (8 – 21 người, tùy biến theo tòa nhà)" },
      { label: "Tốc độ vận hành", value: "Khoảng 1.0 – 2.5m/s (cấu hình theo chiều cao tầng)" },
      { label: "Kiểu truyền động", value: "Máy kéo không hộp số nam châm vĩnh cửu đồng bộ (hiệu quả, độ ồn thấp, tiết kiệm năng lượng)" },
    ],
    whyChoose: [
      WHY_BRAND,
      { icon: "📐", title: "Tiết kiệm không gian", desc: "Không buồng máy cộng hiệu suất sử dụng giếng thang 58.9%, tiết kiệm diện tích xây dựng tầng trên cùng và giảm tổng chi phí." },
      { icon: "🕳️", title: "Hố pit siêu nông", desc: "Hố pit chỉ từ 1200mm, để cả dự án cải tạo nhà cũ và công trình hạn chế hố pit cũng lắp đặt được." },
      { icon: "⚡", title: "Hiệu quả và tiết kiệm năng lượng", desc: "Truyền động nam châm vĩnh cửu đồng bộ êm ái và tiết kiệm điện, dừng tầng chính xác, khởi động/dừng nhẹ nhàng." },
      WHY_DIGITAL,
    ],
    projectShowcase: ["Tòa nhà văn phòng và không gian làm việc thương mại", "Khu dân cư và chung cư", "Dự án cải tạo hạn chế đỉnh tầng/hố pit"],
  }),
  movingwalk: mk({
    story:
      "Băng tải đi bộ tự động LINVOL được sinh ra cho 'những chặng đi bộ đường dài cùng hành lý và xe đẩy mua sắm' — tại nhà ga sân bay, các siêu thị thương mại lớn và trung tâm hội chợ triển lãm, nó biến những hành lang dài đằng đẵng theo phương ngang hoặc dốc nhẹ thành một đoạn di chuyển nhẹ nhàng, trơn tru và đỡ tốn sức. Tấm bậc rộng rãi, phẳng phiu vững vàng đỡ được xe đẩy hàng, vali và xe đẩy mua sắm, để cả người già lẫn trẻ nhỏ cũng yên tâm bước lên; tấm răng lược ăn khớp khít khao, tay vịn và tấm bậc di chuyển đồng bộ, kết hợp với hệ bảo vệ an toàn toàn diện và thiết bị dừng khẩn cấp tạo lớp phòng vệ cho các không gian lưu lượng cao. Cảm biến thông minh làm chậm về chế độ chờ khi không có người và lập tức tăng tốc khi có khách, vừa tiết kiệm năng lượng vừa trọn vẹn trải nghiệm. Đó là 'năng lực vận chuyển theo phương ngang' thầm lặng mà hiệu quả trong các không gian công cộng lớn.",
    heritage:
      "Băng tải đi bộ tự động (dòng LTR) là sản phẩm vận chuyển theo phương ngang của LINVOL dành cho sân bay, không gian thương mại và đầu mối giao thông, với mỗi thiết bị tuân thủ quy phạm an toàn thang máy quốc gia. Được hậu thuẫn bởi hệ thống sản xuất của Midea Building Technologies, nó mang lại độ bền và sự ổn định cấp thương mại cho mỗi đoạn hành lang dài.",
    technicalSpecs: [
      { label: "Loại hình", value: "Băng tải đi bộ tự động (Moving Walk · LTR)" },
      { label: "Tốc độ vận hành", value: "Khoảng 0.5m/s (dải tốc độ phổ biến cho không gian công cộng)" },
      { label: "Góc nghiêng", value: "0° (phương ngang) / 10° – 12° (dốc nhẹ, theo mặt bằng)" },
      { label: "Bề rộng tấm bậc", value: "Khoảng 1000mm (có thể tùy biến theo lưu lượng khách)" },
      { label: "Không gian phù hợp", value: "Sân bay, trung tâm thương mại và siêu thị, hội chợ triển lãm và đầu mối giao thông" },
      { label: "Cấu hình an toàn", value: "Bảo vệ tấm răng lược, bảo vệ lối vào tay vịn, nút dừng khẩn cấp và nhiều lớp bảo vệ khác" },
    ],
    whyChoose: [
      WHY_BRAND,
      { icon: "🧳", title: "Chở được xe đẩy", desc: "Tấm bậc rộng phẳng chở được hành lý và xe đẩy mua sắm, đi lại đường dài đỡ tốn sức hơn." },
      { icon: "🛡️", title: "An toàn đa tầng", desc: "Tấm răng lược, bảo vệ lối vào tay vịn và dừng khẩn cấp mang lại an tâm cả khi lưu lượng cao." },
      { icon: "⚡", title: "Thông minh và tiết kiệm năng lượng", desc: "Làm chậm về chế độ chờ khi không có người và khởi động tức thì khi có khách, tiết kiệm năng lượng mà không ảnh hưởng trải nghiệm." },
      WHY_DIGITAL,
    ],
    projectShowcase: ["Nhà ga sân bay và đầu mối giao thông", "Trung tâm thương mại và siêu thị lớn", "Trung tâm hội chợ triển lãm và hành lang dài, cầu nối"],
  }),
  freight: mk({
    story:
      "Thang máy tải hàng/tải ô tô WINONE LINVOL là trụ cột năng lực vận chuyển được tạo ra cho 'tải nặng và những điều kiện làm việc khắc nghiệt' — từ hàng hóa tính bằng tấn trong xưởng nhà máy, đến việc nâng nguyên chiếc ô tô tại showroom 4S và nhà để xe, nó đều gánh nổi và giữ vững. Tải trọng trải dài từ 1600 đến 5500kg, với hai kết cấu có buồng máy (LTHX WIN1000) và không buồng máy (LTHW WIN1000) tùy biến linh hoạt theo mặt bằng; sàn cabin thép cường độ cao 3–6mm chống trượt chịu mài mòn, thiết kế đáy cabin gia cường bền bỉ lâu dài, khi cần còn có thể nâng cấp lên inox. Cửa đơn, cửa thông và nhiều kiểu mở cửa phù hợp với các luồng ra vào hàng khác nhau, toàn bộ thang đạt chuẩn an toàn EN81-1. Nó biến hai chữ 'tin cậy' mà hiện trường công nghiệp coi trọng nhất thành thực lực có thể giao phó ngày này qua ngày khác.",
    heritage:
      "Thang máy tải hàng/tải ô tô WINONE là dòng tải nặng của LINVOL dành cho công nghiệp, kho vận và bãi đỗ xe, với mỗi thang đạt chuẩn EN81-1 và quy phạm an toàn thang máy quốc gia. Dựa trên năng lực sản xuất của Midea Building Technologies, nó mang sự ổn định và độ bền của tải trọng lớn vào tuyến đầu sản xuất và vận chuyển hàng.",
    technicalSpecs: [
      { label: "Loại hình", value: "Thang máy tải hàng/tải ô tô (dòng WINONE)" },
      { label: "Tải trọng định mức", value: "1600 / 2000 / 3000 / 5000 / 5500kg, v.v." },
      { label: "Tốc độ vận hành", value: "0.5 – 1.0m/s (theo tải trọng và hành trình)" },
      { label: "Kết cấu", value: "LTHX WIN1000 có buồng máy / LTHW WIN1000 không buồng máy" },
      { label: "Sàn cabin", value: "Thép cường độ cao 3 – 6mm, chống trượt chịu mài mòn (tùy chọn inox)" },
      { label: "Quy phạm an toàn", value: "Đạt chuẩn EN81-1, chọn được cửa đơn/cửa thông, kiểu mở cửa S2/C4, v.v." },
    ],
    whyChoose: [
      WHY_BRAND,
      { icon: "🏋️", title: "Tải nặng tải trọng lớn", desc: "Tải trọng 1600 – 5500kg, gánh nổi cả tải hàng kho vận nhà máy lẫn nâng nguyên chiếc ô tô." },
      { icon: "🔩", title: "Cabin bền bỉ", desc: "Sàn thép chống trượt cường độ cao 3 – 6mm, đáy cabin gia cường bền bỉ lâu dài." },
      { icon: "🚪", title: "Cấu hình linh hoạt", desc: "Có/không buồng máy, cửa đơn/cửa thông và nhiều kiểu mở cửa phù hợp luồng di chuyển." },
      WHY_DIGITAL,
    ],
    projectShowcase: ["Tải hàng cho xưởng nhà máy và dây chuyền sản xuất", "Kho vận và trung tâm phân phối", "Showroom ô tô 4S và nhà để xe nhiều tầng"],
  }),
  dumbwaiter: mk({
    story:
      "Thang máy tải nhỏ/thang chuyển thức ăn LINVOL (dòng LTC) giao phó 'những chuyến chạy ngược xuôi theo phương thẳng đứng của hàng hóa nhỏ' cho một chiếc thang máy nhỏ tĩnh lặng và gọn gàng — món nóng từ bếp sau nhà hàng, sách vở trong thư viện, hồ sơ của ngân hàng và văn phòng, hàng hóa nhỏ của cửa hàng đều có thể được chuyển nhanh chóng, êm ái giữa các tầng, đỡ đi cảnh người phải lên xuống cầu thang vất vả. Kết cấu không buồng máy chiếm cực ít không gian, với hai kiểu nạp hàng là kiểu cửa sổ (mặt bàn) và kiểu chạm sàn (cửa sát sàn) phù hợp với các luồng di chuyển khác nhau; tải trọng 100–300kg, tốc độ 0.4m/s, phục vụ vừa khéo cho nhu cầu vận chuyển 'nhẹ và tần suất cao'. Nó không phô trương, nhưng giúp nhà hàng ra món nhanh hơn, vận hành khu hậu cần trơn tru hơn, là người trợ thủ vô hình đằng sau dịch vụ hiệu quả.",
    heritage:
      "Thang máy tải nhỏ (dòng LTC) là sản phẩm vận chuyển hàng nhỏ của LINVOL dành cho các không gian ẩm thực, thương mại và văn phòng, với thiết kế không buồng máy và lắp đặt linh hoạt. Dựa trên hệ thống sản xuất của Midea Building Technologies, nó mang sự tin cậy và hiệu quả vào mỗi lần 'chuyển thức ăn và chuyển hàng'.",
    technicalSpecs: [
      { label: "Loại hình", value: "Thang máy tải nhỏ/thang chuyển thức ăn (Dumbwaiter · LTC, không buồng máy)" },
      { label: "Tải trọng định mức", value: "100 / 200 / 250 / 300kg" },
      { label: "Tốc độ vận hành", value: "Khoảng 0.4m/s" },
      { label: "Kiểu nạp hàng", value: "Kiểu cửa sổ (mặt bàn) / kiểu chạm sàn (cửa sát sàn)" },
      { label: "Kích thước cabin", value: "Khoảng 600×600 đến 1000×1000×1200mm, nhiều quy cách" },
      { label: "Không gian phù hợp", value: "Chuyển thức ăn nhà hàng, sách lưu trữ, hồ sơ và hàng hóa nhỏ" },
    ],
    whyChoose: [
      WHY_BRAND,
      { icon: "🍽️", title: "Chuyển thức ăn hiệu quả", desc: "Chuyển nhanh món nóng từ bếp sau ra nhà hàng, ra món nhanh hơn, luồng di chuyển trơn tru hơn." },
      { icon: "📦", title: "Vận chuyển hàng nhỏ", desc: "Chuyển sách, hồ sơ và hàng hóa nhỏ theo phương thẳng đứng, đỡ phải lên xuống cầu thang." },
      { icon: "📐", title: "Tiết kiệm không gian", desc: "Kết cấu không buồng máy chiếm cực ít chỗ, hai kiểu nạp hàng cửa sổ/chạm sàn thích ứng linh hoạt." },
      WHY_DIGITAL,
    ],
    projectShowcase: ["Chuyển thức ăn cho bếp sau nhà hàng và khách sạn", "Thư viện và phòng lưu trữ", "Chuyển hồ sơ ngân hàng, văn phòng và hàng hóa nhỏ của cửa hàng"],
  }),
};

/** Helper: retrieve metadata by seriesOriginal, falling back to villa by default. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return LINVOL_SERIES_META[seriesOriginal.trim()] || LINVOL_SERIES_META["villa"];
}
