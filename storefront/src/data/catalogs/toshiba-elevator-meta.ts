/**
 * Toshiba Elevator series metadata — rich content for product detail pages.
 * Keyed by seriesOriginal (catKey): high-speed / passenger / escalator / moving-walk / home / retrofit.
 * Sources: toshiba-elevator.com.cn (Toshiba Elevator (China) Co., Ltd. product pages) + industry-standard elevator engineering and specification references.
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

const BRAND_MFG = [
  "Toshiba Elevator kế thừa DNA kỹ thuật chính xác hàng thế kỷ của Tập đoàn Toshiba — Toshiba đã phát triển động cơ điện từ năm 1895, và ba bộ phận cốt lõi (máy kéo, tủ điều khiển và hệ thống điều khiển cửa) đều được thiết kế và sản xuất tại chính các nhà máy của Toshiba, đảm bảo kiểm soát chất lượng ngay từ gốc",
  "Máy kéo đồng bộ nam châm vĩnh cửu không hộp số (PMSM) trải qua các công đoạn quấn dây, đổ keo và kiểm tra cân bằng động trên chính dây chuyền sản xuất của Toshiba, kết hợp với hệ thống phanh kép hai mạch để mang lại hiệu suất năng lượng, độ ồn thấp và độ an toàn cao trong một khối thống nhất",
  "Tủ điều khiển sử dụng thế hệ bảng mạch đa chức năng không chì, thân thiện môi trường mới với rơ-le tích hợp trên bo mạch và linh kiện được module hóa cao, vượt tiêu chuẩn môi trường RoHS để vận hành ổn định hơn trong không gian gọn gàng hơn",
  "Hệ thống điều khiển cửa tích hợp điều khiển vòng kín kép cùng bộ mã hóa hiệu suất cao, liên tục giám sát dòng điện động cơ cửa để thông minh phát hiện vật cản và tự động dừng khi đóng cửa — mỗi thiết bị được tinh chỉnh chính xác với tay nghề thủ công Nhật Bản",
  "Trước khi xuất xưởng, mỗi thiết bị đều trải qua vận hành thử đầy tải, kiểm tra độ ồn và độ rung cùng kiểm tra ngoại quan toàn diện, tuân thủ tiêu chuẩn chất lượng toàn cầu thống nhất của Toshiba để mỗi chiếc thang máy đều được bàn giao với sự an tâm",
];
const BRAND_CARE = [
  { title: "Bảo trì định kỳ", desc: "Kiểm tra từng hạng mục theo chương trình bảo trì của Toshiba: độ mòn cáp thép / cáp kéo, màng dầu ray dẫn hướng, khe hở phanh, dây đai máy cửa và tự kiểm tra hệ thống điều khiển, đồng thời định kỳ bổ sung dầu bôi trơn chuyên dụng." },
  { title: "Kiểm định an toàn", desc: "Tuân thủ kiểm định định kỳ theo luật định đối với thiết bị đặc thù (kiểm định hàng năm); bộ khống chế vượt tốc, bộ hãm an toàn, bộ giảm chấn và thiết bị quá tải phải đạt yêu cầu kiểm định mới được tiếp tục sử dụng, và mọi bất thường phải kích hoạt dừng ngay lập tức để khắc phục." },
  { title: "Vệ sinh & bảo dưỡng", desc: "Kịp thời dọn sạch mảnh vụn trên ngưỡng cửa cabin và rãnh dẫn hướng cửa để tránh kẹt; lau tường cabin inox dọc theo vân với chất tẩy rửa trung tính, tránh xa axit, kiềm mạnh và các vết xước do vật cứng." },
  { title: "Giám sát từ xa", desc: "Có thể kết nối nền tảng giám sát từ xa của Toshiba để truyền dữ liệu vận hành và cảnh báo sự cố theo thời gian thực, giúp phát hiện sớm vấn đề, chủ động dự trữ linh kiện và rút ngắn thời gian ngừng máy." },
];
const BRAND_INSTALL = [
  "Khảo sát kích thước giếng thang, hành trình nâng, khoảng vượt đỉnh và độ sâu hố pit, cùng yêu cầu tải trọng tại hiện trường để xác định cấu hình có phòng máy / không phòng máy",
  "Đội lắp đặt được Toshiba ủy quyền, đào tạo và có chứng chỉ tập kết tại hiện trường, định vị theo bản vẽ và cẩu lắp ray dẫn hướng cùng máy kéo, với quy trình chuẩn hóa và phân công trách nhiệm cá nhân rõ ràng",
  "Hoàn thiện đấu nối điện, luồn cáp kéo, lắp ráp cabin và đối trọng, kiểm tra từng hạng mục mạch an toàn và công tắc hành trình",
  "Thực hiện kiểm tra hệ số cân bằng, thử khóa liên động quá tải và bộ khống chế vượt tốc, cùng hiệu chỉnh độ chính xác dừng tầng để đảm bảo vận hành êm ái và dừng tầng chuẩn xác",
  "Trước khi đưa vào sử dụng, thiết bị phải vượt qua nghiệm thu của cơ quan kiểm định thiết bị đặc thù; chỉ sau khi có giấy chứng nhận kiểm định mới được chính thức bàn giao cho hành khách sử dụng",
];
const BRAND_CERTS = [
  "Giấy phép sản xuất thiết bị đặc thù — thang máy được xếp loại thiết bị đặc thù do nhà nước quản lý, và việc sản xuất thiết bị hoàn chỉnh đòi hỏi chứng nhận giấy phép sản xuất tương ứng",
  "Phù hợp với GB/T 7588 Quy tắc an toàn về cấu tạo và lắp đặt thang máy cùng Quy định giám sát kỹ thuật an toàn thang máy TSG",
  "Được chứng nhận hệ thống quản lý chất lượng ISO 9001 và hệ thống quản lý môi trường ISO 14001",
  "Bảng mạch và vật liệu vượt tiêu chuẩn môi trường RoHS, giảm thiểu nhiều nhóm chất hóa học nguy hại được quy định",
  "Giấy chứng nhận kiểm tra xuất xưởng cho thiết bị hoàn chỉnh + giấy chứng nhận nghiệm thu sau lắp đặt từ cơ quan kiểm định thiết bị đặc thù, cùng bảo hành chính hãng",
];
const BRAND_PACK = [
  { label: "Phương thức cung cấp", value: "Cung cấp thang máy hoàn chỉnh, bao gồm máy kéo, tủ điều khiển, cabin, hệ thống cửa và các bộ phận trọn bộ khác, giao đến công trường theo từng đợt của dự án" },
  { label: "Bảo vệ vận chuyển", value: "Linh kiện chính xác được cố định trong thùng gỗ / khung thép, ray dẫn hướng được bọc màng và đóng bó, tủ điều khiển đóng gói chống ẩm và chống sốc cho xuất khẩu" },
  { label: "Phạm vi dịch vụ", value: "Dịch vụ trọn gói bao gồm khảo sát, thiết kế lựa chọn, lắp đặt, vận hành thử, bảo trì và hiện đại hóa thang máy hiện hữu" },
  { label: "Thời gian giao hàng", value: "Tùy thuộc vào cấu hình và dự án; lịch sản xuất và lắp đặt được ban hành dựa trên khảo sát thực tế (thời gian giao hàng ngắn hơn đối với cấu hình tiêu chuẩn)" },
  { label: "Bảo hành", value: "Cung cấp bảo hành chính hãng và hỗ trợ phụ tùng, kèm theo các hợp đồng bảo trì dài hạn để đảm bảo vận hành trong suốt vòng đời" },
];

function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase" | "faq">): SeriesMeta {
  return {
    story: p.story, heritage: p.heritage, technicalSpecs: p.technicalSpecs,
    manufacturing: BRAND_MFG, careGuide: BRAND_CARE, installation: BRAND_INSTALL,
    certifications: BRAND_CERTS, packaging: BRAND_PACK,
    whyChoose: p.whyChoose, projectShowcase: p.projectShowcase, faq: p.faq,
  };
}

const PASS = mk({
  story:
    "Thang máy chở khách Toshiba (dòng ELCOSMO phòng máy nhỏ gọn và dòng SPACEL không phòng máy) thể hiện một thế kỷ di sản kỹ thuật của Toshiba, khắc ghi sự chính xác và tinh tế tiết chế của Nhật Bản vào từng chi tiết. Máy kéo, tủ điều khiển và hệ thống điều khiển cửa đều được thiết kế và chế tạo tại chính các nhà máy của Toshiba, trong khi động cơ đồng bộ nam châm vĩnh cửu nhỏ gọn giúp vận hành êm như tiếng thì thầm, đưa cabin dừng lại vững vàng và chính xác dưới chân. Hệ thống tái tạo năng lượng thu hồi và tái sử dụng năng lượng phanh để vận hành xanh hơn đồng thời giảm hóa đơn tiền điện của tòa nhà. Nội thất cabin tối giản nhưng vẫn mời gọi kết hợp với thiết kế lấy con người làm trung tâm khiến mỗi chuyến đi trở thành một hành trình thư thái, thoải mái. Từ tòa nhà thương mại đến biệt thự cao cấp, đây là chiếc thang máy bạn có thể tin tưởng giao phó giao thông đứng của cả tòa nhà.",
  heritage:
    "ELCOSMO và SPACEL là những dòng thang máy chở khách chủ lực của Toshiba Elevator, bén rễ sâu trong thị trường Trung Quốc. Dòng đầu tiên tiết kiệm không gian xây dựng nhờ phòng máy nhỏ gọn, trong khi dòng thứ hai giải phóng diện tích mái nhờ thiết kế không phòng máy (MRL); cùng nhau, chúng tiếp nối triết lý sản phẩm của Toshiba về hiệu suất năng lượng, vận hành êm ái và sự an tâm.",
  technicalSpecs: [
    { label: "Tải trọng", value: "Tiêu chuẩn 630 / 800 / 1000 / 1350 kg (theo cấu hình dự án)" },
    { label: "Tốc độ", value: "Nhiều mức như 1.0 / 1.6 / 1.75 m/s" },
    { label: "Hệ truyền động", value: "Máy kéo đồng bộ nam châm vĩnh cửu không hộp số nhỏ gọn (PMSM), phanh kép hai mạch" },
    { label: "Điều khiển", value: "Điều khiển biến tần VVVF + điều khiển cửa vòng kín kép, tùy chọn tái tạo năng lượng và điều khiển nhóm" },
    { label: "Phòng máy", value: "ELCOSMO phòng máy nhỏ gọn / SPACEL không phòng máy (MRL)" },
    { label: "Ứng dụng", value: "Tòa nhà thương mại, cao ốc văn phòng, biệt thự cao cấp, căn hộ" },
  ],
  whyChoose: [
    { icon: "🇯🇵", title: "Toshiba chính hãng Nhật Bản", desc: "Ba bộ phận cốt lõi được thiết kế và chế tạo nội bộ — chất lượng Nhật Bản êm ái, an toàn và tiết kiệm năng lượng." },
    { icon: "🔇", title: "Êm ái & mượt mà", desc: "Máy kéo đồng bộ nam châm vĩnh cửu với công nghệ giảm chấn mang lại vận hành êm ái và dừng tầng chính xác, thoải mái." },
    { icon: "⚡", title: "Tái tạo năng lượng", desc: "Hệ thống tái tạo năng lượng thu hồi năng lượng phanh để vận hành xanh và giảm tiêu thụ năng lượng của tòa nhà." },
    { icon: "🛡️", title: "Phanh kép", desc: "Phanh kép hai mạch + giám sát dòng điện cửa thông minh dừng cửa khi gặp vật cản để an tâm hơn." },
    { icon: "📐", title: "Tiết kiệm không gian", desc: "Thiết kế phòng máy nhỏ gọn / không phòng máy tối ưu hóa diện tích giếng thang và mái cho việc xây dựng linh hoạt hơn." },
  ],
  projectShowcase: ["Cao ốc văn phòng hạng A và tổ hợp thương mại đô thị", "Biệt thự cao cấp và căn hộ hoàn thiện đầy đủ", "Khách sạn, bệnh viện và trụ sở cơ quan nhà nước"],
  faq: [
    { q: "Làm thế nào để chọn giữa phòng máy nhỏ gọn và không phòng máy?", a: "Phòng máy nhỏ gọn ELCOSMO thân thiện hơn về chi phí và bảo trì; thiết kế không phòng máy SPACEL loại bỏ phòng máy trên mái và giải phóng diện tích sàn, lý tưởng cho các dự án bị giới hạn về chiều cao tầng hoặc hình thái tòa nhà." },
    { q: "Thang máy chở khách có những tính năng tiết kiệm năng lượng nào?", a: "Hệ truyền động biến tần VVVF và máy kéo đồng bộ nam châm vĩnh cửu là tiêu chuẩn, kèm tùy chọn tái tạo năng lượng, chế độ ngủ chờ và đèn LED để giảm đáng kể mức tiêu thụ năng lượng tổng thể." },
    { q: "Có cung cấp và hỗ trợ kỹ thuật tại Việt Nam không?", a: "Vui lòng liên hệ Hua Yue Supply Chain để được tư vấn lựa chọn, cung cấp, lắp đặt và bảo trì phù hợp với dự án của bạn." },
    { q: "Thời gian giao hàng và lắp đặt là bao lâu?", a: "Tùy thuộc vào cấu hình và điều kiện hiện trường, với thời gian giao hàng ngắn hơn cho cấu hình tiêu chuẩn; lịch sản xuất và lắp đặt ban hành sau khảo sát thực tế là căn cứ chính thức." },
  ],
});

export const TOSHIBA_ELEVATOR_SERIES_META: Record<string, SeriesMeta> = {
  "high-speed": mk({
    story:
      "New ELBRIGHT là dòng thang máy tốc độ cao chủ lực của Toshiba dành cho các tòa nhà siêu cao tầng và công trình điểm nhấn, kết hợp nhiều năm chuyên môn về máy kéo tốc độ cao của Toshiba với khát vọng hiệu năng tột đỉnh. Động cơ đồng bộ nam châm vĩnh cửu ghép cùng bộ tái tạo năng lượng PWM thu hồi năng lượng ở tốc độ cao và tiết kiệm điện trong tĩnh lặng, chạy nhanh mà vẫn êm ái như mọi khi. Hệ thống cửa thông minh đưa vào công nghệ nhận diện hình ảnh và lên thang không chạm, trong khi thuật toán điều khiển nhóm điều phối cụm thang máy với độ chính xác cao, để dòng người giờ cao điểm buổi sáng không còn phải chờ đợi sốt ruột. Guốc trượt con lăn và công nghệ giảm chấn làm dịu mọi gia tốc và giảm tốc, để hành khách di chuyển hàng trăm mét trên không chỉ cảm nhận sự bình yên và tĩnh lặng. Đây là lời giải của Toshiba cho các tòa nhà chọc trời — tốc độ và sự thoải mái, cả hai đều được trọn vẹn.",
    heritage:
      "Dòng ELBRIGHT là dòng sản phẩm tốc độ cao cấp cao nhất trong danh mục của Toshiba Elevator, được chế tạo riêng cho văn phòng siêu cao tầng, công trình điểm nhấn đô thị và tổ hợp đa chức năng — đại diện cho đỉnh cao kỹ thuật của Toshiba về máy kéo tốc độ cao, điều phối nhóm và sự êm ái khi di chuyển.",
    technicalSpecs: [
      { label: "Tải trọng", value: "Cấu hình tải trọng lớn như 1000 / 1350 / 1600 kg" },
      { label: "Tốc độ", value: "Các mức tốc độ cao (2.5 m/s trở lên, theo cấu hình dự án)" },
      { label: "Hệ truyền động", value: "Động cơ đồng bộ nam châm vĩnh cửu (PMSM) + bộ tái tạo năng lượng PWM" },
      { label: "Điều khiển", value: "Điều khiển biến tần + điều khiển nhóm thang máy thông minh, giảm chấn guốc trượt con lăn" },
      { label: "Hệ thống cửa", value: "Cửa thông minh: nhận diện hình ảnh + công nghệ lên thang không chạm" },
      { label: "Ứng dụng", value: "Cao ốc văn phòng siêu cao tầng, công trình điểm nhấn đô thị, tổ hợp thương mại" },
    ],
    whyChoose: [
      { icon: "🇯🇵", title: "Công nghệ Toshiba Nhật Bản", desc: "Công nghệ máy kéo tốc độ cao cốt lõi được chế tạo nội bộ, kết hợp tốc độ và chất lượng." },
      { icon: "🚀", title: "Nhanh & mượt mà", desc: "Ổn định và êm ái ngay cả ở tốc độ cao, với giảm chấn làm dịu gia tốc và giảm tốc." },
      { icon: "🏙️", title: "Dành cho tòa nhà chọc trời", desc: "Tải trọng lớn + điều phối nhóm xử lý điềm tĩnh dòng người giờ cao điểm ở siêu cao tầng." },
      { icon: "♻️", title: "Tái tạo năng lượng", desc: "Bộ tái tạo PWM thu hồi và tái sử dụng năng lượng, tiết kiệm điện ngay cả ở tốc độ cao." },
      { icon: "👋", title: "Thông minh & không chạm", desc: "Cửa thông minh nhận diện hình ảnh và lên thang không chạm cho trải nghiệm vệ sinh, an tâm hơn." },
    ],
    projectShowcase: ["Văn phòng hạng A siêu cao tầng và công trình điểm nhấn đô thị", "Tổ hợp thương mại quy mô lớn và khách sạn năm sao", "Trung tâm tài chính, tòa nhà trụ sở và các công trình cao cấp khác"],
    faq: [
      { q: "Điều khiển nhóm trên thang máy tốc độ cao mang lại lợi ích gì?", a: "Điều khiển nhóm thông minh điều phối nhiều thang máy theo thời gian thực dựa trên lệnh gọi từ mỗi tầng, rút ngắn thời gian chờ và di chuyển, đồng thời cải thiện đáng kể lưu lượng vận chuyển trong giờ cao điểm sáng và tối." },
      { q: "Di chuyển tốc độ cao có gây giật cục hay khó chịu ở tai không?", a: "ELBRIGHT trang bị giảm chấn guốc trượt con lăn và điều khiển tối ưu áp suất/tốc độ cho gia tốc và giảm tốc nhẹ nhàng hơn cùng chuyến đi êm ái, giảm rõ rệt cảm giác khó chịu mà tốc độ cao có thể gây ra." },
      { q: "Công nghệ không chạm của cửa thông minh là gì?", a: "Sử dụng công nghệ nhận diện hình ảnh và cảm biến, hành khách có thể giảm tiếp xúc trực tiếp với nút bấm trong khi vật cản tại cửa được phát hiện chính xác, cân bằng giữa vệ sinh và an toàn." },
      { q: "Có cung cấp và hỗ trợ kỹ thuật tại Việt Nam không?", a: "Vui lòng liên hệ Hua Yue Supply Chain để sắp xếp giải pháp lựa chọn, cung cấp, lắp đặt và bảo trì cho thang máy tốc độ cao cao cấp của Toshiba." },
    ],
  }),
  passenger: PASS, "passenger-elevator": PASS,
  escalator: mk({
    story:
      "Thang cuốn KINDMOVER tiếp nối chất lượng đáng tin cậy và triết lý thiết kế lấy con người làm trung tâm của Toshiba — tuyến giao thông đáng tin cậy vận hành êm thầm trong các trung tâm thương mại, nhà ga và sân bay, vận chuyển hàng triệu bước chân. Khung giàn được lắp ghép từ vật liệu định hình chuyên dụng bằng dây chuyền chế tạo lớn chuyên biệt, mang lại kết cấu vững chắc và độ chính xác đáng tin cậy luôn điềm tĩnh dưới luồng hành khách liên tục đông đúc. Bậc thang giảm chấn linh hoạt nâng độ an toàn lên một tầm cao mới, với mặt bậc êm ái và khe hở tinh tế để cả trẻ em lẫn du khách kéo vali đều có thể bước lên một cách an tâm. Tương thích điện từ EMC và quy trình thân thiện môi trường đạt tiêu chuẩn Toshiba giữ cho thang vận hành sạch sẽ và thân thiện với thiết bị xung quanh. Được hỗ trợ bởi hệ thống dịch vụ bảo trì tận tâm, KINDMOVER khắc ghi sự chăm chút và tận tụy của Nhật Bản vào từng bậc thang.",
    heritage:
      "KINDMOVER là dòng thang cuốn chủ lực của Toshiba Elevator, phục vụ rộng rãi các trung tâm thương mại lớn, đường sắt đô thị và đầu mối giao thông. Nổi tiếng với sự ổn định, bền bỉ, an toàn và tiết kiệm năng lượng, đây là sản phẩm đặc trưng của Toshiba trong vận chuyển hành khách tại không gian công cộng.",
    technicalSpecs: [
      { label: "Năng lực vận chuyển", value: "Lưu lượng liên tục cao tương ứng với chiều rộng bậc và tốc độ" },
      { label: "Tốc độ", value: "0.5 m/s tốc độ vận hành tiêu chuẩn (tùy chọn biến tốc thông minh)" },
      { label: "Hệ truyền động", value: "Hệ truyền động hiệu suất cao + vật liệu định hình chuyên dụng cho kết cấu khung giàn" },
      { label: "Điều khiển", value: "Tương thích điện từ EMC + điều khiển tiết kiệm năng lượng chế độ chờ thông minh" },
      { label: "An toàn", value: "Bậc thang giảm chấn linh hoạt, chống kẹt và bảo vệ dừng khẩn cấp" },
      { label: "Ứng dụng", value: "Trung tâm thương mại, ga tàu điện ngầm, nhà ga đường sắt, sân bay và các không gian công cộng khác" },
    ],
    whyChoose: [
      { icon: "🇯🇵", title: "Công nghệ Toshiba Nhật Bản", desc: "Kỹ thuật khung giàn và truyền động nội bộ cho kết cấu vững chắc và vận hành đáng tin cậy." },
      { icon: "🏬", title: "Dành cho lưu lượng lớn", desc: "Ổn định và bền bỉ cho vận hành liên tục, xử lý điềm tĩnh giờ cao điểm tại trung tâm thương mại và nhà ga." },
      { icon: "🌱", title: "Tiết kiệm năng lượng thông minh", desc: "Chế độ chờ thông minh giảm tốc để tiết kiệm điện khi rảnh — xanh và tiết kiệm chi phí." },
      { icon: "🛡️", title: "An toàn linh hoạt", desc: "Bậc thang giảm chấn linh hoạt và nhiều cơ chế bảo vệ đưa an toàn xuống đến từng chi tiết nhỏ nhất." },
      { icon: "🔧", title: "Bảo trì tận tâm", desc: "Hệ thống dịch vụ bảo trì toàn diện đảm bảo vận hành ổn định, chu kỳ dài." },
    ],
    projectShowcase: ["Trung tâm thương mại lớn và tổ hợp thương mại", "Ga tàu điện ngầm, nhà ga đường sắt và các đầu mối đường sắt đô thị khác", "Nhà ga sân bay và trung tâm hội nghị"],
    faq: [
      { q: "Chế độ chờ thông minh của thang cuốn tiết kiệm năng lượng như thế nào?", a: "Cảm biến phát hiện lưu lượng hành khách; khi không có người đi, thang tự động giảm tốc hoặc chuyển sang chế độ chờ và khôi phục vận hành khi hành khách đến gần — tiết kiệm điện đáng kể mà không ảnh hưởng trải nghiệm." },
      { q: "Bậc thang giảm chấn linh hoạt có lợi ích gì?", a: "Bậc thang tạo độ đệm nhất định khi chịu tải, giảm va đập mặt bậc và độ ồn; kết hợp với răng lược tinh tế giúp giảm nguy cơ kẹt, làm cho chuyến đi mượt mà và an toàn hơn." },
      { q: "Thang cuốn có phù hợp với môi trường ngoài trời hoặc bán ngoài trời không?", a: "Có thể chỉ định tùy chọn chống thấm, chống ăn mòn và chiếu sáng theo dự án, kèm tương thích điện từ EMC; giải pháp khảo sát thực tế là căn cứ chính thức." },
      { q: "Có cung cấp và bảo trì tại Việt Nam không?", a: "Vui lòng liên hệ Hua Yue Supply Chain để được hỗ trợ lựa chọn, cung cấp, lắp đặt và bảo trì dài hạn cho thang cuốn Toshiba." },
    ],
  }),
  "moving-walk": mk({
    story:
      "Thang băng chuyền Toshiba duy trì tiêu chuẩn chất lượng toàn cầu và triết lý thiết kế lấy con người làm trung tâm của Toshiba — tuyến giao thông ngang nhẹ nhàng đưa hành khách và hành lý qua các sảnh sân bay và đại sảnh nhà ga. Có sẵn kiểu nằm ngang và kiểu dốc nghiêng, thang rút ngắn những quãng đường dài trên mặt phẳng và kết nối mượt mà giữa các tầng trên độ dốc thoải. Điều khiển biến tần cùng công nghệ tiết kiệm năng lượng Toshiba linh hoạt điều chỉnh vận hành theo lưu lượng hành khách và giảm tiêu thụ năng lượng; hệ thống chiếu sáng LED hiệu suất cao, bền bỉ giữ cho mặt bậc và tay vịn luôn sáng rõ. Quy trình thân thiện môi trường vượt tiêu chuẩn RoHS, giảm thiểu nhiều nhóm chất quy định để vận hành sạch sẽ, thân thiện với môi trường. Thang khiêm tốn, nhưng khiến mọi quãng đi bộ đường dài trở nên nhẹ nhàng và thư thái.",
    heritage:
      "Thang băng chuyền Toshiba cung cấp hỗ trợ di chuyển cho hành khách theo phương ngang và độ dốc thoải tại sân bay, nhà ga và trung tâm thương mại lớn. Là một phần quan trọng trong dòng sản phẩm vận chuyển giao thông công cộng của Toshiba, thang nổi tiếng với dịch vụ ổn định, tiết kiệm năng lượng và an tâm.",
    technicalSpecs: [
      { label: "Kiểu dáng", value: "Thang băng chuyền nằm ngang / thang băng chuyền dốc nghiêng" },
      { label: "Tốc độ", value: "Tốc độ vận hành liên tục tiêu chuẩn (cấu hình theo thiết lập)" },
      { label: "Hệ truyền động", value: "Điều khiển biến tần + công nghệ truyền động tiết kiệm năng lượng Toshiba" },
      { label: "Chiếu sáng", value: "Hệ thống chiếu sáng LED — hiệu suất cao, thẩm mỹ và bền bỉ" },
      { label: "Môi trường", value: "Vượt tiêu chuẩn RoHS, giảm thiểu nhiều nhóm chất quy định" },
      { label: "Ứng dụng", value: "Sân bay, nhà ga đường sắt, trung tâm thương mại lớn, trung tâm hội nghị" },
    ],
    whyChoose: [
      { icon: "🇯🇵", title: "Công nghệ Toshiba Nhật Bản", desc: "Tiêu chuẩn chất lượng toàn cầu thống nhất cho vận hành ổn định, đáng tin cậy và an tâm." },
      { icon: "🧳", title: "Vận chuyển nhẹ nhàng", desc: "Vận chuyển đường dài hành khách và hành lý theo phương ngang / độ dốc thoải — nhẹ nhàng và thư thái." },
      { icon: "⚡", title: "Hiệu quả biến tần", desc: "Linh hoạt điều chỉnh vận hành theo lưu lượng hành khách, với công nghệ tiết kiệm năng lượng Toshiba cắt giảm tiêu thụ." },
      { icon: "💡", title: "Chiếu sáng LED", desc: "Chiếu sáng hiệu suất cao, bền bỉ giữ cho mặt bậc và tay vịn rõ ràng và sáng rõ." },
      { icon: "🌱", title: "Quy trình thân thiện môi trường", desc: "Vượt RoHS bằng cách giảm chất nguy hại cho vận hành sạch sẽ, thân thiện hơn." },
    ],
    projectShowcase: ["Nhà ga sân bay và sảnh làm thủ tục", "Nhà ga đường sắt, ga tàu điện ngầm và các đầu mối giao thông khác", "Giao thông ngang trong trung tâm thương mại lớn và trung tâm hội nghị"],
    faq: [
      { q: "Làm thế nào để chọn giữa kiểu nằm ngang và kiểu dốc nghiêng?", a: "Chọn kiểu nằm ngang cho di chuyển đường dài trên một mặt phẳng; chọn kiểu dốc nghiêng khi cần kết nối độ dốc thoải giữa các tầng có thể chở xe đẩy/xe hành lý — lựa chọn cụ thể được xác định theo độ dốc và yêu cầu thực tế." },
      { q: "Thang băng chuyền có tiết kiệm năng lượng không?", a: "Thang sử dụng điều khiển biến tần và công nghệ tiết kiệm năng lượng Toshiba, điều chỉnh vận hành theo lưu lượng hành khách và hỗ trợ giảm công suất chế độ chờ, với đèn LED giảm thêm mức tiêu thụ năng lượng tổng thể." },
      { q: "Thang có thể chở xe đẩy mua hàng và xe hành lý không?", a: "Thang băng chuyền dốc nghiêng có mặt bậc phẳng với thiết kế chống trượt, phù hợp cho xe đẩy mua hàng và xe hành lý; năng lực tải và độ dốc cụ thể tùy thuộc vào cấu hình dự án." },
      { q: "Có cung cấp và hỗ trợ tại Việt Nam không?", a: "Vui lòng liên hệ Hua Yue Supply Chain để sắp xếp dịch vụ lựa chọn, cung cấp, lắp đặt và bảo trì cho thang băng chuyền Toshiba." },
    ],
  }),
  home: mk({
    story:
      "SPACEL-H là thang máy gia đình mà Toshiba chế tác chăm chút cho biệt thự và nhà phố, được xây dựng quanh lời cam kết cốt lõi về một thế kỷ chất lượng Toshiba và chất lượng cuộc sống nâng tầm — mang sự tinh tế Nhật Bản về tận nhà. Với thân thang nhỏ gọn và diện tích giếng thang thân thiện, thang vẫn mang lại an toàn, linh hoạt, vận hành êm ái và chạy mượt mà trên mọi phương diện, biến việc di chuyển giữa các tầng thành niềm vui thư thái. Công nghệ máy kéo và điều khiển nội bộ của Toshiba giúp thang chạy êm như tơ lụa, không bao giờ làm phiền nhịp sống thường nhật của gia đình; nhiều tùy chọn nội thất cabin phong phú cho phép thang máy trở thành phần nối dài của thẩm mỹ ngôi nhà thay vì một cỗ máy xâm nhập. Dù để đưa người cao tuổi, di chuyển vật nặng, hay thêm sự tiện nghi hiện đại cho ngôi nhà nhiều tầng, thang đều vừa khít. Không gian sống cao cấp và nội thất tinh tế gói trọn sự quan tâm chu đáo dành cho ngôi nhà vào từng chuyến đi.",
    heritage:
      "SPACEL-H chắt lọc công nghệ thang máy chở khách hoàn thiện của Toshiba xuống quy mô gia đình — dòng thang máy gia đình của Toshiba cho thị trường nhà ở tư nhân cao cấp, mang một thế kỷ chất lượng Toshiba vào cuộc sống thường nhật của biệt thự và nhà phố.",
    technicalSpecs: [
      { label: "Tải trọng", value: "Phù hợp tải trọng gia đình nhỏ (khoảng 250–400 kg, theo bố cục nhà)" },
      { label: "Tốc độ", value: "Tốc độ êm ái cho nhà ở (khoảng 0.4 m/s, theo cấu hình dự án)" },
      { label: "Hệ truyền động", value: "Máy kéo đồng bộ nam châm vĩnh cửu nhỏ gọn — tiết kiệm không gian và độ ồn thấp" },
      { label: "Điều khiển", value: "Hệ thống điều khiển nội bộ Toshiba cho dừng tầng chính xác và chạy mượt mà" },
      { label: "Giếng thang", value: "Thân thang nhỏ gọn phù hợp với giếng thang nhỏ của biệt thự/nhà phố cho việc xây dựng linh hoạt" },
      { label: "Ứng dụng", value: "Biệt thự, nhà phố, nhà ở tư nhân nhiều tầng" },
    ],
    whyChoose: [
      { icon: "🇯🇵", title: "Công nghệ Toshiba Nhật Bản", desc: "Một thế kỷ chất lượng Toshiba mang về tận nhà — an toàn, êm ái và đáng tin cậy." },
      { icon: "🏡", title: "Dành cho nhà ở tư nhân", desc: "Thân thang nhỏ gọn phù hợp với giếng thang biệt thự nhỏ cho việc lắp đặt linh hoạt hơn." },
      { icon: "🔇", title: "Êm ái & mượt mà", desc: "Máy kéo nội bộ chạy êm, không bao giờ làm phiền nhịp sinh hoạt thường nhật của gia đình." },
      { icon: "🛡️", title: "An toàn & an tâm", desc: "Nhiều tính năng an toàn đạt tiêu chuẩn Toshiba mang lại sự an tâm cho cả người già lẫn trẻ nhỏ." },
      { icon: "✨", title: "Nội thất tinh tế", desc: "Nhiều tùy chọn nội thất phong phú biến thang máy thành một phần thẩm mỹ của ngôi nhà." },
    ],
    projectShowcase: ["Biệt thự đơn lập và nhà ở tư nhân cao cấp", "Nhà phố nhiều tầng", "Cải tạo thân thiện với người cao tuổi cho nhà tự xây nhiều tầng"],
    faq: [
      { q: "Thang máy gia đình có cần phòng máy riêng không?", a: "SPACEL-H sử dụng máy kéo đồng bộ nam châm vĩnh cửu nhỏ gọn với thân thang nhỏ gọn và diện tích thân thiện, không cần phòng máy lớn và phù hợp với không gian giếng thang hạn chế của biệt thự và nhà phố." },
      { q: "Gia đình tôi có người cao tuổi — thang có đủ an toàn không?", a: "Thang được trang bị nhiều cơ chế bảo vệ an toàn đạt tiêu chuẩn Toshiba và dừng tầng êm ái, chạy êm và mượt mà, kết hợp tay vịn với thiết kế chống kẹt để người cao tuổi sử dụng với sự an tâm hơn." },
      { q: "Nội thất có thể tùy chỉnh không?", a: "Thang cung cấp nhiều lựa chọn phong phú về nội thất và vật liệu cabin để hài hòa với phong cách ngôi nhà, biến thang máy thành phần nối dài của thẩm mỹ không gian." },
      { q: "Có thể mua tại Việt Nam không?", a: "Vui lòng liên hệ Hua Yue Supply Chain để được tư vấn lựa chọn, báo giá, lắp đặt và bảo trì cho thang máy gia đình SPACEL-H." },
    ],
  }),
  retrofit: mk({
    story:
      "Giải pháp lắp đặt thêm thang máy cho các tòa nhà hiện hữu — lời giải chu đáo của Toshiba cho các tòa nhà cũ không có thang máy, mang lại sự an tâm khi di chuyển dễ dàng giữa các tầng trở lại cuộc sống thường nhật của cư dân tầng trên. Giải pháp sử dụng chính máy kéo, tủ điều khiển và hệ thống điều khiển cửa của Toshiba: Toshiba, hãng đã gắn bó sâu sắc với động cơ điện từ năm 1895, mang lại vận hành tiết kiệm năng lượng, độ ồn thấp và tiết kiệm không gian với động cơ đồng bộ nam châm vĩnh cửu nhỏ gọn. Tủ điều khiển mang thế hệ bảng mạch không chì, thân thiện môi trường mới với linh kiện được module hóa cho hiệu suất ổn định; hệ thống điều khiển cửa tích hợp điều khiển vòng kín kép cùng bộ mã hóa hiệu suất cao, liên tục giám sát dòng điện động cơ cửa và thông minh dừng khi gặp vật cản để bảo vệ mọi lượt ra vào. Giải pháp tối ưu hóa kết cấu hiện hữu với thi công đơn giản, giảm thiểu tối đa ảnh hưởng đến tòa nhà gốc. Một chiếc thang máy được lắp đặt giải quyết khó khăn mà cư dân cao tuổi gặp phải khi di chuyển giữa các tầng đồng thời nâng cao giá trị và chất lượng cuộc sống của toàn bộ tòa nhà.",
    heritage:
      "Giải pháp lắp đặt thêm thang máy là dòng sản phẩm chuyên dụng của Toshiba để nâng cấp giao thông đứng trong các tòa nhà hiện hữu, tập trung vào các khu nhà ở cũ và tòa nhà nhiều tầng không có thang máy. Với các bộ phận cốt lõi chế tạo nội bộ và thi công đơn giản, giải pháp giúp các tòa nhà cũ có được sự an tâm của một chiếc thang máy chất lượng Toshiba.",
    technicalSpecs: [
      { label: "Tải trọng", value: "Tải trọng nhỏ đến vừa tiêu chuẩn được cấu hình theo điều kiện giếng thang / tòa nhà hiện hữu" },
      { label: "Tốc độ", value: "Các mức tốc độ thấp êm ái như 1.0 m/s (theo cấu hình dự án)" },
      { label: "Hệ truyền động", value: "Động cơ đồng bộ nam châm vĩnh cửu nhỏ gọn (PMSM), phanh kép hai mạch" },
      { label: "Điều khiển", value: "Tủ điều khiển không chì thân thiện môi trường + điều khiển cửa vòng kín kép với giám sát dòng điện cửa" },
      { label: "Kết cấu", value: "Tối ưu hóa kết cấu tòa nhà hiện hữu với giếng thang kết cấu thép cho thi công đơn giản" },
      { label: "Ứng dụng", value: "Khu nhà ở cũ, tòa nhà nhiều tầng không có thang máy, công trình công cộng hiện hữu" },
    ],
    whyChoose: [
      { icon: "🇯🇵", title: "Công nghệ Toshiba Nhật Bản", desc: "Vật liệu chính hãng và bộ phận cốt lõi nội bộ ngay cả khi cải tạo — chất lượng được đảm bảo." },
      { icon: "🏗️", title: "Dành cho tòa nhà cũ", desc: "Lắp thêm thang máy cho các tòa nhà hiện hữu chưa có, đáp ứng việc tiếp cận dễ dàng giữa các tầng." },
      { icon: "🧩", title: "Tối ưu hóa kết cấu", desc: "Phù hợp với không gian và kết cấu hiện hữu cho thi công đơn giản với ảnh hưởng tối thiểu." },
      { icon: "🛡️", title: "Ra vào an toàn", desc: "Giám sát dòng điện cửa và dừng khi gặp vật cản bảo vệ mọi lượt đi qua sảnh." },
      { icon: "📈", title: "Nâng cao giá trị", desc: "Giải quyết thách thức di chuyển thân thiện với người cao tuổi, cải thiện cuộc sống thường nhật và nâng cao giá trị tòa nhà." },
    ],
    projectShowcase: ["Lắp thêm và cải tạo thang máy cho khu dân cư nhiều tầng cũ", "Nâng cấp thân thiện với người cao tuổi cho các khối chung cư không có thang máy", "Cải tạo giao thông đứng cho tòa nhà văn phòng/công cộng hiện hữu"],
    faq: [
      { q: "Cải tạo tòa nhà cũ có làm hư hại kết cấu gốc không?", a: "Giải pháp tối ưu hóa kết cấu hiện hữu và chủ yếu sử dụng giếng thang kết cấu thép độc lập, với thi công đơn giản và ảnh hưởng tối thiểu đến kết cấu chính của tòa nhà; khảo sát thực tế và đánh giá kết cấu là căn cứ chính thức." },
      { q: "Thang máy lắp thêm chủ yếu giải quyết vấn đề gì?", a: "Thang chủ yếu giải quyết khó khăn mà cư dân cao tuổi tầng trên và người hạn chế khả năng vận động gặp phải khi di chuyển giữa các tầng, cải thiện chất lượng cuộc sống đồng thời góp phần nâng cao giá trị của toàn bộ tòa nhà." },
      { q: "Thang có sử dụng linh kiện Toshiba chính hãng không?", a: "Máy kéo, tủ điều khiển và hệ thống điều khiển cửa đều được Toshiba thiết kế và chế tạo — các bộ phận cốt lõi cùng nguồn gốc với thang máy mới, đảm bảo chất lượng và an toàn nhất quán, đáng tin cậy." },
      { q: "Có dịch vụ cải tạo tại Việt Nam không?", a: "Vui lòng liên hệ Hua Yue Supply Chain để được dịch vụ trọn gói bao gồm khảo sát, thiết kế, cung cấp, thi công và bảo trì cho việc lắp thêm thang máy vào các tòa nhà hiện hữu." },
    ],
  }),
  freight: PASS, observation: PASS,
};

export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TOSHIBA_ELEVATOR_SERIES_META[seriesOriginal.trim()] || TOSHIBA_ELEVATOR_SERIES_META.passenger;
}
