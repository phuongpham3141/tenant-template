/**
 * Toshiba Home Appliances product-line rich metadata — used for rich text on product detail pages.
 *
 * Indexed by seriesOriginal (character-for-character identical to the values in toshiba.ts):
 *   "空调 · 家用" / "冰箱" / "洗衣机" / "洗衣机 · 干衣机" /
 *   "厨房电器" / "厨房电器 · 洗碗机" / "净水" /
 *   "小家电·风扇" / "小家电 · 吸尘器"
 *
 * Sourcing notes — only real, verifiable information is used:
 *   • Toshiba Corporation was founded in Japan in 1875, with over 150 years of history
 *   • The home-appliance business (Toshiba Lifestyle Products & Services) has been
 *     operated by Midea Group since 2016 (which acquired an 80.1% stake for USD 537 million),
 *     while Tokyo R&D and Japanese quality standards are retained
 *   • In Vietnam, products are distributed as genuine articles by Toshiba Lifestyle (toshiba-lifestyle.com/vn)
 *   • Technical specifications are given as engineering ranges that are common and verifiable
 *     across each product line; the exact specs of a specific model still follow the real specs
 *     scraped on the detail page — this metadata does not fabricate single-unit data.
 *
 * Copy is written in English, with a premium Japanese + freshness-preservation narrative, and fabricates no awards.
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
  "Toshiba Corporation được thành lập năm 1875 — hơn 150 năm di sản kỹ thuật Nhật Bản, là người tiên phong tạo ra chiếc tủ lạnh, máy giặt và lò vi sóng đầu tiên của Nhật Bản",
  "Mảng đồ gia dụng do Tập đoàn Midea vận hành từ năm 2016 (sở hữu 80,1%), kết hợp công nghệ Nhật Bản với năng lực sản xuất Trung Quốc để mang lại mức giá cạnh tranh hơn",
  "Hoạt động R&D vẫn đặt tại các phòng thí nghiệm Tokyo — đội ngũ kỹ sư Nhật Bản định hình công nghệ cốt lõi, tiêu chuẩn chất lượng và ngôn ngữ thiết kế",
  "Sản xuất quy mô lớn với sản lượng ổn định thông qua mạng lưới nhà máy toàn cầu và chuỗi cung ứng của Midea, kiểm tra an toàn điện và hiệu suất năng lượng theo từng lô",
  "Các công nghệ cốt lõi được tích lũy theo thời gian: biến tần tiết kiệm điện, bảo quản tươi (NaturePURE, PureBIO) và tinh thần thủ công Takumi của Nhật Bản",
];

const BRAND_PACK = [
  { label: "Đóng gói tiêu chuẩn", value: "Thùng carton chịu lực + mút định hình + góc chống va đập + đai chống sốc; mỗi sản phẩm đều được cấp nguồn kiểm tra trước khi xuất xưởng" },
  { label: "Bảo vệ trong vận chuyển", value: "Bồi thường đối với hư hỏng ngoại quan/chức năng được xác minh là phát sinh trong quá trình vận chuyển; phiếu đóng gói kèm theo và mã vạch sản phẩm đảm bảo truy xuất nguồn gốc đầy đủ" },
  { label: "Số lượng nhập tối thiểu", value: "1 container 20ft / 40ft HQ — có thể gộp nhiều SKU và nhiều nhóm sản phẩm trong cùng một lô hàng" },
  { label: "Tài liệu trong hộp", value: "Sách hướng dẫn song ngữ (Trung-Việt) + phiếu bảo hành + giấy chứng nhận hợp quy; hỗ trợ phát hành chứng từ nhập khẩu (CO/CQ)" },
  { label: "Lưu kho & xử lý", value: "Giữ khô ráo, tránh ánh sáng trực tiếp và nguồn nhiệt; dựng đứng theo dấu hiệu hướng đặt trên thân máy, không xếp chồng quá cao hoặc đè nén" },
];

const BRAND_CERTS_BASE = [
  "Thương hiệu Nhật Bản chính hãng — Toshiba Corporation (từ năm 1875), với tiêu chuẩn chất lượng Nhật Bản và R&D tại Tokyo",
  "Phân phối chính hãng tại Việt Nam bởi Toshiba Lifestyle (toshiba-lifestyle.com/vn)",
  "Tuân thủ quy định dán nhãn hiệu suất năng lượng của Bộ Công Thương Việt Nam (mức hiệu suất được ghi theo từng nhóm sản phẩm)",
  "Các model xuất sang thị trường Trung Quốc đáp ứng yêu cầu chứng nhận bắt buộc CCC (theo từng nhóm sản phẩm tương ứng)",
  "Bảo hành chính hãng qua kênh Toshiba Lifestyle chính hãng + Hua Yue DDP, với linh kiện zin đầy đủ",
];

const BRAND_FAQ_TAIL = [
  {
    q: "Sau khi Midea mua lại, Toshiba có còn là thương hiệu Nhật Bản không?",
    a: "Có. Midea mua lại 80,1% cổ phần mảng đồ gia dụng vào năm 2016, nhưng Toshiba vẫn giữ thương hiệu, R&D tại Tokyo, công nghệ cốt lõi và tiêu chuẩn chất lượng Nhật Bản. Midea đảm nhận sản xuất quy mô lớn và chuỗi cung ứng, giúp giá cả cạnh tranh hơn trong khi chất lượng vẫn ở chuẩn Nhật Bản.",
  },
  {
    q: "Quý khách có cung cấp dịch vụ giao hàng, lắp đặt tận nơi và báo giá DDP tại Việt Nam không?",
    a: "Có. Hua Yue cung cấp dịch vụ trọn gói: nhập khẩu đúng quy định về kho tại Hà Nội / TP. Hồ Chí Minh / Đà Nẵng, kèm giao hàng tận cửa cùng lắp đặt và vận hành chạy thử. Dù là một sản phẩm đơn lẻ hay dự án nguyên container, chúng tôi đều cung cấp báo giá DDP đã bao gồm thuế và cước vận chuyển trong vòng 24 giờ.",
  },
  {
    q: "Số lượng đặt tối thiểu (MOQ) và thời gian giao hàng là bao lâu?",
    a: "MOQ là 1 container 20ft (có thể gộp nhiều SKU). Các model có sẵn trong kho giao trong 7-10 ngày làm việc; sản phẩm dự án sản xuất theo đơn mất khoảng 30-45 ngày; đơn hàng dự án lớn được ưu tiên giao hàng.",
  },
  {
    q: "Các model, mô tả và thông số kỹ thuật trên trang có chính xác không?",
    a: "Toàn bộ tên sản phẩm, mô tả, hình ảnh và thông số được lấy trực tiếp từ website chính thức của Toshiba Lifestyle tại Việt Nam. Mỗi trang chi tiết đều kèm liên kết Nguồn, không chỉnh sửa và không hư cấu; metadata thương hiệu này chỉ bổ sung câu chuyện thương hiệu và cam kết dịch vụ.",
  },
];

export const TOSHIBA_SERIES_META: Record<string, SeriesMeta> = {
  // ─── 空调 · 家用 ───────────────────────────────
  "空调 · 家用": {
    story:
      "Điều hòa gia đình Toshiba đưa sự tận tâm của người Nhật với không khí vào từng làn gió. Thiết kế luồng gió dịu từ trên xuống giúp khí mát lan tỏa như một làn sương mịn, phủ đều khắp phòng, tránh thổi gió lạnh trực tiếp vào da nên dù dùng lâu cũng không hề khô rát hay buốt lạnh. Đường thân máy liền mạch, không cắt khúc cùng tấm mặt mờ bóng nhẹ giúp dàn lạnh trở thành một khoảng tường lặng yên. Máy nén biến tần điều chỉnh tốc độ tinh tế theo nhiệt độ phòng, nên về đêm bạn gần như không nghe thấy tiếng máy chạy, và thức dậy với căn phòng vẫn giữ đúng độ mát bạn đã cài. Với một mái nhà đề cao sự tĩnh lặng, sạch sẽ và gu thẩm mỹ tốt, đây là chiếc điều hòa hiểu thế nào là chừng mực.",
    heritage:
      "Toshiba có chuyên môn sâu về nén khí làm lạnh và điều khiển biến tần, và dòng Daiseikai từ lâu đã là sản phẩm cao cấp đầu bảng trong điều hòa gia đình. Công nghệ do Nhật Bản định hình và R&D tại Tokyo giám sát, sau đó được hệ thống sản xuất của Midea đưa vào quy mô lớn.",
    technicalSpecs: [
      { label: "Loại máy", value: "Điều hòa gia đình treo tường (hai chiều nóng-lạnh / một chiều lạnh tùy model)" },
      { label: "Công suất làm lạnh", value: "Khoảng 1,5 HP / 2,0 HP (phù hợp từ phòng ngủ cỡ nhỏ-vừa đến phòng khách)" },
      { label: "Máy nén", value: "Máy nén biến tần DC điều chỉnh tốc độ tinh tế theo nhiệt độ phòng" },
      { label: "Hiệu suất năng lượng", value: "Tiết kiệm điện nhờ biến tần, xếp hạng theo nhãn hiệu suất năng lượng của Việt Nam" },
      { label: "Luồng gió", value: "Thiết kế luồng gió dịu từ trên xuống, tránh thổi gió lạnh trực tiếp vào người" },
      { label: "Nguồn điện", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Vệ sinh màng lọc", desc: "Mỗi 2-3 tuần, tháo màng lọc, rửa bằng nước ấm, để khô tự nhiên rồi lắp lại để duy trì luồng gió và không khí sạch; tuyệt đối không xịt nước lên tấm mặt hoặc bo mạch." },
      { title: "Bảo dưỡng dàn nóng", desc: "Thường xuyên dọn bụi và lá rụng khỏi các lá tản nhiệt của dàn nóng để đảm bảo trao đổi nhiệt thông suốt và không làm giảm hiệu suất." },
      { title: "Bảo dưỡng theo mùa", desc: "Trước khi ngừng dùng dài ngày, chạy chế độ quạt để làm khô bên trong, tránh nấm mốc; cứ 12 tháng, đề nghị trung tâm bảo hành ủy quyền của Toshiba kiểm tra gas và cảm biến." },
    ],
    installation: [
      "Trước khi lắp đặt, đối chiếu diện tích phòng với công suất ngựa của máy, xác nhận tường chịu được tải trọng và đã chừa khoảng trống bảo trì",
      "Để kỹ thuật viên của trung tâm bảo hành ủy quyền Toshiba thực hiện lắp đặt, loe ống và hút chân không đúng cách để loại bỏ rò rỉ gas",
      "Trước khi cấp nguồn, kiểm tra điện áp, đường điện riêng, tiếp địa chắc chắn và công suất ổn áp",
      "Sau khi lắp đặt, khuyến nghị để máy nghỉ khoảng 24 giờ trước khi cấp nguồn để gas ổn định",
      "Giữ hóa đơn và phiếu bảo hành để được hưởng chính sách bảo hành chính hãng",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🇯🇵", title: "Công nghệ Nhật Bản", desc: "Khởi nguồn từ Toshiba năm 1875, với R&D tại Tokyo định hình logic luồng gió dịu và điều khiển biến tần." },
      { icon: "🌬️", title: "Gió dịu, không thổi thẳng", desc: "Cấp gió từ trên xuống giúp khí mát lan tỏa đều, bảo vệ làn da cho cảm giác dễ chịu hơn." },
      { icon: "🔇", title: "Biến tần vận hành êm", desc: "Biến tần DC điều chỉnh tốc độ tinh tế theo nhiệt độ phòng cho hoạt động êm về đêm và nhiệt độ ổn định hơn." },
      { icon: "⚡", title: "Tiết kiệm điện", desc: "Hiệu suất biến tần cao giữ chi phí điện thân thiện khi dùng lâu, xếp hạng theo nhãn hiệu suất năng lượng của Việt Nam." },
      { icon: "🛡️", title: "Bảo hành chính hãng", desc: "Phân phối chính hãng + bảo hành Hua Yue DDP, với linh kiện zin và lắp đặt ủy quyền sẵn sàng." },
    ],
    projectShowcase: [
      "Giải pháp luồng gió tiện nghi toàn phòng cho phòng ngủ và phòng khách căn hộ",
      "Gói điều hòa êm ái cho phòng khách sạn và căn hộ dịch vụ",
      "Dự án bàn giao nhà ở cần một thương hiệu thiết bị Nhật Bản cao cấp đồng nhất",
    ],
    faq: [
      { q: "Làm sao chọn giữa 1,5 HP và 2,0 HP?", a: "Chọn 1,5 HP cho phòng ngủ khoảng 15㎡, và 2,0 HP cho phòng khách hoặc phòng ngủ chính khoảng 18-25㎡; lựa chọn chính xác có thể được Hua Yue hỗ trợ tính toán dựa trên chiều cao trần, hướng nhà và khả năng cách nhiệt." },
      { q: "Điều hòa biến tần có thực sự tiết kiệm điện hơn không?", a: "Có. Sau khi đạt nhiệt độ cài đặt, máy nén biến tần giảm tốc độ để duy trì, tránh chu trình bật-tắt lặp đi lặp lại; qua thời gian chạy dài, máy tiết kiệm điện hơn loại cố định tốc độ và giữ nhiệt độ ổn định hơn." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 冰箱 ───────────────────────────────
  "冰箱": {
    story:
      "Với người Nhật, tủ lạnh không phải là một chiếc tủ chứa đồ mà là một buồng giữ tươi giúp thực phẩm sống lâu hơn. Tủ lạnh Toshiba viết nỗi ám ảnh ấy vào từng ngăn kéo: NaturePURE, PureBIO và OriginPURE+ phối hợp khử mùi và diệt khuẩn, giữ mùi hôi và vi khuẩn bên ngoài cánh cửa, để cá của hôm qua và rau của sáng nay vẫn giòn tươi như lúc vừa cho vào. Ngăn tươi cấp đông nhẹ giữ nhiệt độ chính xác ở khoảng -1°C, khóa độ tươi của thịt cá mà không đông cứng thành đá, nên có thể cho thẳng vào nồi không cần rã đông. Từ vẻ tối giản trắng mây của thiết kế âm tủ JAPANDi đến tay nắm kim loại lấy cảm hứng từ kiếm Nhật, mỗi đường nét đều nói lên cùng một điều — sang trọng là giấu sự tinh tế trong điều thường nhật.",
    heritage:
      "Toshiba đã chế tạo chiếc tủ lạnh điện đầu tiên của Nhật Bản, và bảo quản tươi cùng khử mùi là thế mạnh cốt lõi suốt một thế kỷ. Các công nghệ như NaturePURE, PureBIO và OriginPURE+ liên tục được đội ngũ Tokyo hoàn thiện để giữ trọn hương vị và dinh dưỡng của thực phẩm tốt nhất có thể.",
    technicalSpecs: [
      { label: "Loại máy", value: "Nhiều cửa / side-by-side / ngăn đá trên / ngăn đá dưới / âm tủ / tủ đông nằm — dải sản phẩm đầy đủ" },
      { label: "Dung tích", value: "Khoảng 143L đến 700L+, phù hợp từ người độc thân đến gia đình lớn và bếp âm tủ" },
      { label: "Công nghệ giữ tươi", value: "Khử mùi và diệt khuẩn NaturePURE, PureBIO / Dual PureBIO GO (tỷ lệ diệt khuẩn lên tới 99,99%)" },
      { label: "Ngăn tươi cấp đông nhẹ", value: "Ngăn cấp đông nhẹ khoảng -1°C, khóa độ tươi thịt cá mà không cần rã đông" },
      { label: "Máy nén", value: "Máy nén Origin Inverter — tiết kiệm điện, êm ái, nhiệt độ ổn định hơn" },
      { label: "Nguồn điện", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Vệ sinh bên trong", desc: "Hằng tháng, lau thành trong và các ngăn bằng khăn mềm, nước ấm và chất tẩy nhẹ, kịp thời loại bỏ thực phẩm quá hạn để hệ thống khử mùi luôn hiệu quả." },
      { title: "Chăm sóc gioăng cửa", desc: "Thường xuyên lau sạch gioăng và kiểm tra độ kín khít để ngăn rò khí lạnh và lãng phí điện; không để cặn nước sốt ăn mòn gioăng." },
      { title: "Sắp xếp hợp lý", desc: "Tách riêng thực phẩm sống và chín, chừa khoảng trống cho khí lạnh lưu thông, để đồ nóng nguội rồi mới cất, và tránh chắn cửa thoát khí để làm lạnh đều." },
      { title: "Khử mùi định kỳ", desc: "Bảo dưỡng module PureBIO / khử mùi theo hướng dẫn để bên trong luôn tươi mới, không lẫn mùi về lâu dài." },
    ],
    installation: [
      "Giữ tủ thẳng đứng trong suốt quá trình di chuyển và lắp đặt, tránh nghiêng quá mức làm hỏng máy nén",
      "Đặt trên mặt phẳng bằng, thông thoáng, chừa khoảng tản nhiệt ở hai bên và phía sau",
      "Trước khi cấp nguồn, kiểm tra điện áp và tiếp địa chắc chắn; khuyến nghị dùng ổ cắm riêng",
      "Sau khi lắp đặt/di chuyển, để máy nghỉ khoảng 24 giờ trước khi cấp nguồn để gas và dầu máy nén ổn định",
      "Giữ hóa đơn và phiếu bảo hành để được bảo hành theo chính sách nhà sản xuất",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "❄️", title: "Khóa độ tươi", desc: "Ngăn cấp đông nhẹ khoảng -1°C khóa độ tươi thịt cá mà không cần rã đông, trong khi luồng gió đa hướng làm lạnh đều hơn." },
      { icon: "🦠", title: "Khử mùi & diệt khuẩn", desc: "PureBIO / NaturePURE phối hợp khử mùi và diệt khuẩn lên tới 99,99%, ngăn lẫn mùi." },
      { icon: "🔇", title: "Biến tần êm ái", desc: "Máy nén Origin Inverter tiết kiệm điện và êm ái, với biến động nhiệt độ nhỏ hơn." },
      { icon: "🎨", title: "Thẩm mỹ Nhật Bản", desc: "Các thiết kế như kiểu âm tủ trắng mây JAPANDi và tay nắm kiếm Nhật biến tủ lạnh thành điểm nhấn của gian bếp." },
      { icon: "🛡️", title: "Bảo hành chính hãng", desc: "Phân phối chính hãng + bảo hành Hua Yue DDP, với bảo hành máy nén dài hạn và linh kiện đầy đủ." },
    ],
    projectShowcase: [
      "Giải pháp tủ lạnh âm tủ JAPANDi cho bếp căn hộ và biệt thự cao cấp",
      "Gói dung tích cho phòng khách và khu sơ chế của khách sạn, căn hộ dịch vụ",
      "Dự án nhà ở cần một thương hiệu bảo quản tươi Nhật Bản cao cấp đồng nhất",
    ],
    faq: [
      { q: "Ngăn tươi cấp đông nhẹ có làm thực phẩm đông cứng không?", a: "Không. Ngăn cấp đông nhẹ khoảng -1°C giữ thịt cá ở trạng thái đông nhẹ, khóa độ tươi mà không tạo thành đá cứng, nên có thể thái và nấu ngay, tiết kiệm thời gian rã đông." },
      { q: "Tôi cần chừa bao nhiêu không gian cho tủ lạnh âm tủ?", a: "Vui lòng theo kích thước lắp âm trên trang chi tiết của model tương ứng và chừa khoảng tản nhiệt khi thiết kế tủ bếp; Hua Yue có thể cung cấp bản vẽ kích thước lắp đặt trước khi đặt hàng để giúp bạn kiểm tra." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 洗衣机 ───────────────────────────────
  "洗衣机": {
    story:
      "Máy giặt Toshiba tin rằng giặt sạch quần áo chỉ là điểm khởi đầu — hương thơm bền lâu và sự nâng niu mới làm nên một mẻ giặt thực sự kiểu Nhật. Công nghệ Aroma+ điều chỉnh chính xác nhiệt độ nước và thời gian ngâm nước xả, để quần áo mềm mại hơn và mùi hương lưu lâu hơn, như gói trọn mùi nắng của quần áo phơi khô vào từng sợi vải. Động cơ truyền động trực tiếp Origin Inverter êm mà mạnh mẽ, với bọt siêu mịn len sâu vào kết cấu sợi vải để nhẹ nhàng cuốn đi vết bẩn cứng đầu mà không hại quần áo. Dòng T37, với tấm mặt vân gỗ kiểu JAPANDi và màn hình màu cảm ứng toàn phần, biến việc giặt giũ thành một nghi thức tĩnh tại — sạch, thơm, và thú vị ngay cả khi thao tác.",
    heritage:
      "Toshiba tạo ra chiếc máy giặt đầu tiên của Nhật Bản và đã dày công nuôi dưỡng công nghệ động cơ và giặt giũ. Truyền động trực tiếp Origin Inverter và công nghệ hương thơm Aroma+, do đội ngũ Tokyo định hình, cân bằng giữa sức giặt, độ êm và sự nâng niu quần áo.",
    technicalSpecs: [
      { label: "Loại máy", value: "Lồng ngang cửa trước / lồng đứng cửa trên, với nhiều mức dung tích" },
      { label: "Động cơ", value: "Động cơ biến tần DC Origin Inverter (truyền động trực tiếp) — êm ái và bền bỉ" },
      { label: "Công nghệ giặt", value: "Hương thơm Aroma+, làm sạch sâu bằng bọt siêu mịn" },
      { label: "Điều khiển", value: "Màn hình cảm ứng màu / bảng cảm ứng toàn phần với biểu tượng rõ ràng, dễ hiểu" },
      { label: "Hiệu suất năng lượng", value: "Tiết kiệm điện nhờ biến tần, xếp hạng theo nhãn hiệu suất năng lượng của Việt Nam" },
      { label: "Nguồn điện", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Tự vệ sinh lồng giặt", desc: "Chạy chu trình vệ sinh lồng / tự làm sạch ở nhiệt độ cao mỗi tháng một lần và thường xuyên lau gioăng cửa bên trong để ngăn mùi và nấm mốc." },
      { title: "Vệ sinh bộ lọc", desc: "Thường xuyên vệ sinh bộ lọc bơm xả và bộ lọc cấp nước để xả và cấp nước thông suốt, tránh báo lỗi." },
      { title: "Định lượng đúng", desc: "Cho bột giặt và nước xả theo vạch định mức, vì cho quá nhiều sẽ để lại cặn; sau khi giặt, mở cửa để lồng giặt thông gió khô ráo." },
      { title: "Cân chỉnh chân máy", desc: "Giữ thân máy cân bằng và khóa chân máy để giảm rung và tiếng ồn trong chu trình vắt." },
    ],
    installation: [
      "Nhất định tháo bu lông vận chuyển trước khi lắp đặt, nếu không chu trình vắt sẽ rung dữ dội và có thể gây hỏng hóc",
      "Đặt trên sàn phẳng và cân chỉnh bằng chân máy sao cho cả bốn góc chịu lực đều nhau",
      "Đấu nối ống cấp/xả nước và kiểm tra các mối nối kín khít cùng độ cao đường xả đạt yêu cầu",
      "Trước khi cấp nguồn, kiểm tra điện áp, đường điện riêng và tiếp địa chắc chắn",
      "Chạy một chu trình vệ sinh không tải trước lần dùng đầu tiên, và giữ hóa đơn cùng phiếu bảo hành",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🌸", title: "Hương thơm Aroma+", desc: "Tối ưu nhiệt độ nước và thời gian ngâm nước xả để quần áo mềm hơn và mùi hương lưu lâu hơn." },
      { icon: "🫧", title: "Làm sạch sâu", desc: "Bọt siêu mịn len vào kết cấu sợi vải để loại bỏ vết bẩn cứng đầu, giặt sạch mà không hại quần áo." },
      { icon: "🔇", title: "Biến tần êm ái", desc: "Động cơ truyền động trực tiếp Origin Inverter tiết kiệm điện, êm ái và ổn định trong chu trình vắt." },
      { icon: "🖐️", title: "Cảm ứng dễ dùng", desc: "Biểu tượng rõ ràng trên màn hình cảm ứng màu, với tấm mặt vân gỗ JAPANDi đẹp mắt." },
      { icon: "🛡️", title: "Bảo hành chính hãng", desc: "Phân phối chính hãng + bảo hành Hua Yue DDP, với bảo hành động cơ dài hạn và linh kiện đầy đủ." },
    ],
    projectShowcase: [
      "Giải pháp chăm sóc giặt giũ gia đình cho căn hộ và nhà phố",
      "Bố trí khu giặt riêng phòng hoặc dùng chung cho khách sạn và căn hộ dịch vụ",
      "Dự án bàn giao nhà ở cần một thương hiệu máy giặt Nhật Bản cao cấp đồng nhất",
    ],
    faq: [
      { q: "Hương thơm Aroma+ có ảnh hưởng đến khả năng giặt sạch không?", a: "Không. Aroma+ tối ưu nhiệt độ nước và thời điểm ngâm nước xả trên nền giặt thông thường, nên sức giặt không hề suy giảm trong khi quần áo mềm hơn và giữ hương lâu hơn." },
      { q: "Tôi nên chọn máy lồng ngang hay lồng đứng?", a: "Nếu ưu tiên nâng niu quần áo, hương thơm và độ êm, lại có thể đặt máy đứng trên ban công, hãy chọn lồng ngang cửa trước; nếu ưu tiên sức giặt, giá thành và xử lý đồ to bẩn nhiều, hãy chọn lồng đứng cửa trên. Hua Yue có thể tư vấn theo nhu cầu sử dụng của bạn." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 洗衣机 · 干衣机 ───────────────────────────────
  "洗衣机 · 干衣机": {
    story:
      "Trong khí hậu mưa nhiều, ẩm ướt, máy sấy Toshiba mang đến cho quần áo một buổi chiều luôn nắng. Công nghệ bơm nhiệt dùng máy nén để làm ấm luồng khí và sấy nhẹ nhàng ở nhiệt độ thấp đến vừa, không làm cháy sợi vải hay co rút biến dạng đồ cotton và lanh, nên quần áo thành phẩm bồng bềnh, mềm mại và dễ chịu khi tiếp xúc với da. Cảm biến nhiệt độ và độ ẩm đọc trạng thái lồng sấy theo thời gian thực và kết thúc sấy đúng thời điểm, không bao giờ tiêu hao năng lượng quá mức. So với cách cũ chỉ thổi khí nóng ồ ạt, bơm nhiệt tái sử dụng phần lớn nhiệt lượng, tiết kiệm điện một cách an tâm. Từ nay, dây phơi nghỉ hưu, trong tủ chỉ còn sự khô ráo và tươi mới.",
    heritage:
      "Toshiba mở rộng hệ thống chăm sóc giặt giũ sang sấy bằng bơm nhiệt hiệu suất cao, tiếp nối chuyên môn về động cơ và kiểm soát nhiệt độ. Khả năng chăm sóc ở nhiệt độ thấp bằng bơm nhiệt và điều khiển sấy chính xác dựa trên cảm biến được đội ngũ Tokyo tinh chỉnh để cân bằng giữa nâng niu quần áo và tiết kiệm năng lượng.",
    technicalSpecs: [
      { label: "Loại máy", value: "Máy sấy bơm nhiệt / máy sấy ngưng tụ" },
      { label: "Nguyên lý sấy", value: "Máy nén làm ấm luồng khí để sấy nhẹ ở nhiệt độ thấp đến vừa, tái sử dụng nhiệt lượng" },
      { label: "Điều khiển sấy thông minh", value: "Cảm biến nhiệt độ và độ ẩm tối ưu thời gian sấy và tránh sấy quá khô" },
      { label: "Nâng niu quần áo", value: "Nhiệt độ vừa phải bảo vệ màu và sợi vải, giảm co rút và nhăn nhúm" },
      { label: "Hiệu suất năng lượng", value: "Hiệu suất bơm nhiệt cao với mức tiết kiệm năng lượng đáng kể, xếp hạng theo nhãn hiệu suất năng lượng của Việt Nam" },
      { label: "Nguồn điện", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Vệ sinh xơ vải", desc: "Vệ sinh lưới lọc xơ vải sau mỗi chu trình sấy và định kỳ vệ sinh bộ ngưng tụ/trao đổi nhiệt để duy trì hiệu suất và an toàn khi sấy." },
      { title: "Xử lý nước ngưng", desc: "Kịp thời đổ khay chứa nước ngưng hoặc giữ ống xả thông thoáng để tránh tràn và mùi hôi." },
      { title: "Cho tải đúng cách", desc: "Cho tải theo dung tích định mức và giũ tơi quần áo; cho quá đầy sẽ kéo dài thời gian sấy và sấy không đều." },
      { title: "Thông gió làm khô", desc: "Mở cửa cho thoáng sau khi dùng để lồng sấy khô ráo, và sấy thật khô trước khi ngừng dùng dài ngày." },
    ],
    installation: [
      "Đặt trên mặt phẳng bằng, thông thoáng, cân chỉnh thân máy để cả bốn góc chịu lực đều nhau",
      "Với model bơm nhiệt, chừa khoảng hút/xả khí để đảm bảo tản nhiệt và lưu thông thông suốt",
      "Đấu nối ống xả nước theo model hoặc xác nhận khay chứa nước ngưng đã ở đúng vị trí",
      "Trước khi cấp nguồn, kiểm tra điện áp, đường điện riêng và tiếp địa chắc chắn",
      "Giữ hóa đơn và phiếu bảo hành để được bảo hành theo chính sách nhà sản xuất",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🌡️", title: "Bơm nhiệt nhiệt độ thấp", desc: "Sấy nhẹ ở nhiệt độ thấp đến vừa bảo vệ màu và sợi vải, nâng niu từng món đồ." },
      { icon: "💡", title: "Cảm biến điều khiển sấy", desc: "Cảm biến nhiệt độ và độ ẩm kết thúc sấy chính xác, tránh tiêu hao năng lượng dư thừa và co rút." },
      { icon: "⚡", title: "Tiết kiệm điện", desc: "Nhờ tái sử dụng nhiệt, máy tiết kiệm điện hơn máy sấy điện trở truyền thống và kinh tế hơn khi dùng lâu." },
      { icon: "👕", title: "Bồng bềnh và mềm mại", desc: "Quần áo ra bồng bềnh mềm mại với ít nếp nhăn hơn, đỡ phải ủi và phơi dây." },
      { icon: "🛡️", title: "Bảo hành chính hãng", desc: "Phân phối chính hãng + bảo hành Hua Yue DDP, với bảo hành máy nén dài hạn và linh kiện đầy đủ." },
    ],
    projectShowcase: [
      "Giải pháp sấy cho căn hộ và nhà ở tại các vùng ẩm ướt, mưa nhiều",
      "Gói sấy đồ vải phòng khách cho khách sạn, homestay và căn hộ dịch vụ",
      "Dự án bàn giao chăm sóc giặt giũ trọn gói xếp chồng cùng máy giặt Toshiba",
    ],
    faq: [
      { q: "Vì sao máy sấy bơm nhiệt tiết kiệm điện hơn?", a: "Bơm nhiệt tái sử dụng nhiệt lượng sinh ra trong quá trình sấy, nên không cần liên tục đốt nóng công suất cao như máy sấy điện trở truyền thống; với cùng một tải sấy, lượng điện tiêu thụ thấp hơn rõ rệt và nhiệt độ nhẹ nhàng hơn với quần áo." },
      { q: "Có thể xếp chồng máy sấy lên trên máy giặt không?", a: "Hầu hết máy giặt và máy sấy lồng ngang đều có thể kết hợp và lắp đặt cùng bộ gá xếp chồng chính hãng để tiết kiệm không gian; vui lòng xác nhận theo kích thước và phụ kiện của model tương ứng, và Hua Yue có thể hỗ trợ tư vấn lựa chọn." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 厨房电器 ───────────────────────────────
  "厨房电器": {
    story:
      "Đồ bếp Toshiba mang sự chừng mực và chính xác của tinh thần Takumi Nhật Bản lên bàn ăn. Lò vi sóng gương Mirror Lake được đúc thành một mặt gương đen liền khối, hòa nhập lặng lẽ vào mọi phong cách bếp, làm nóng đều và thao tác dứt khoát. Nồi cơm điện là tuyệt kỹ làm nên tên tuổi Toshiba — ngâm chân không kết hợp nấu IH áp suất cao, lấy từ những bí quyết nấu cơm lâu đời của người Nhật, giúp mỗi hạt gạo hút đủ nước và nở đều, rồi công nghệ kích hoạt enzyme đánh thức vị ngọt tự nhiên sâu trong lõi hạt, cho cơm bóng đẹp từng hạt, ngọt hậu. Trong mắt Toshiba, một bát cơm ngon và một mặt gương tinh xảo đều là sự trân trọng cảm thức về chừng mực trong đời sống thường nhật.",
    heritage:
      "Toshiba tạo ra chiếc lò vi sóng đầu tiên của Nhật Bản và sở hữu di sản sâu sắc về điều khiển làm nóng và nấu nướng. Kỹ thuật chế tác mặt gương Mirror Lake và công nghệ nấu cơm IH áp suất cao chân không tiếp nối tinh thần Takumi, được đội ngũ Tokyo trau chuốt.",
    technicalSpecs: [
      { label: "Loại máy", value: "Lò vi sóng mặt gương / nồi cơm điện tử / nồi cơm IH áp suất cao chân không" },
      { label: "Lò vi sóng", value: "Thiết kế gương đen liền khối Mirror Lake, với điều khiển nhiệt độ bằng máy tính cho làm nóng đều" },
      { label: "Nồi cơm điện", value: "Ngâm chân không + nấu IH áp suất cao + công nghệ kích hoạt enzyme tạo vị ngọt" },
      { label: "Điều khiển", value: "Điều khiển điện tử kỹ thuật số với các thực đơn cài sẵn đa năng" },
      { label: "Chế tác", value: "Tay nghề Takumi với lớp hoàn thiện gương hiện đại sang trọng" },
      { label: "Nguồn điện", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Vệ sinh mặt gương", desc: "Lau nhẹ mặt gương lò vi sóng bằng khăn mềm ẩm và chất tẩy dịu, tránh chất mài mòn và vật cứng có thể gây trầy xước; lau dầu mỡ bên trong kịp thời khi còn ấm." },
      { title: "Chăm sóc nồi trong", desc: "Rửa và làm khô lòng nồi cùng van hơi trên nắp nồi cơm sau mỗi lần dùng, và không chà lớp chống dính bằng búi thép." },
      { title: "Kiểm tra gioăng", desc: "Thường xuyên kiểm tra vòng đệm kín và van áp suất của nồi cơm luôn sạch và lắp đúng vị trí để đảm bảo hiệu năng nấu áp suất cao và an toàn." },
      { title: "Đặt nơi khô ráo", desc: "Đặt ở nơi khô ráo, thông thoáng, tránh hơi nước và khói nấu trực tiếp để giữ bo mạch và bảng cảm ứng khô ráo." },
    ],
    installation: [
      "Đặt trên mặt bếp phẳng, chịu nhiệt, thông thoáng, chừa khoảng tản nhiệt quanh lò vi sóng",
      "Không vận hành lò vi sóng không âm tủ trong tủ kín, tránh tản nhiệt kém",
      "Trước khi cấp nguồn, kiểm tra điện áp và tiếp địa chắc chắn; khuyến nghị dùng ổ cắm riêng",
      "Rửa và làm khô lòng nồi cùng phụ kiện trước khi dùng nồi cơm lần đầu",
      "Giữ hóa đơn và phiếu bảo hành để được bảo hành theo chính sách nhà sản xuất",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🍚", title: "Nấu cơm bí truyền", desc: "Ngâm chân không + IH áp suất cao + kích hoạt enzyme cho cơm bóng đẹp từng hạt với vị ngọt tự nhiên." },
      { icon: "🪞", title: "Thẩm mỹ mặt gương", desc: "Thiết kế gương đen liền khối Mirror Lake mang tay nghề Takumi vào mọi gian bếp." },
      { icon: "♨️", title: "Làm nóng đều", desc: "Lò vi sóng điều khiển bằng máy tính làm nóng đều, hâm nóng hằng ngày nhanh, dứt khoát, không có điểm lạnh." },
      { icon: "🎛️", title: "Cài sẵn đa năng", desc: "Thực đơn số một chạm giúp nấu cơm, hâm nóng và rã đông dễ dàng, dễ sử dụng." },
      { icon: "🛡️", title: "Bảo hành chính hãng", desc: "Phân phối chính hãng + bảo hành Hua Yue DDP, với linh kiện zin đầy đủ và dịch vụ hậu mãi." },
    ],
    projectShowcase: [
      "Bộ đồ gia dụng nhỏ hoàn thiện mặt gương cho bếp căn hộ và biệt thự cao cấp",
      "Gói sơ chế và nấu cơm cho phòng khách sạn và căn hộ dịch vụ",
      "Bàn giao nhà ở và nhà mẫu cần một thương hiệu đồ bếp Nhật Bản đồng nhất",
    ],
    faq: [
      { q: "Nồi cơm IH áp suất cao chân không có thực sự nấu cơm ngon hơn không?", a: "Ngâm chân không giúp hạt gạo hút đủ nước trước khi nấu, IH áp suất cao làm nóng đều hơn để lõi hạt chín tới, và kích hoạt enzyme tăng vị ngọt, cho cơm bóng và tơi hơn với hậu vị ngọt — khác biệt rõ rệt so với nồi cơm thông thường." },
      { q: "Lò vi sóng mặt gương có dễ bám vân tay không?", a: "Mặt gương đen có thể lộ vân tay dưới ánh sáng mạnh; chỉ cần lau nhẹ bằng khăn mềm ẩm và chất tẩy dịu, lau theo vân để khôi phục độ bóng, và tránh chất tẩy mài mòn." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 厨房电器 · 洗碗机 ───────────────────────────────
  "厨房电器 · 洗碗机": {
    story:
      "Máy rửa bát Toshiba Originclean biến nỗi ám ảnh về sự sạch sẽ của người Nhật thành khoảng nghỉ trang nhã nhất sau mỗi bữa ăn. Tia nước mạnh mẽ kết hợp các chương trình rửa nhiều giai đoạn len sâu vào kẽ bát đĩa để cuốn trôi dầu mỡ và cặn bẩn, chăm chút cả những hoa văn tinh tế của đồ sứ Nhật, để mọi thứ sạch bóng sau khi sấy ở nhiệt độ cao. Máy quan tâm hơn cả sự sạch — nó quan tâm đến chừng mực: thiết kế tiết kiệm nước và điện khiến mỗi chu trình đều dè sẻn, và vận hành êm ái không hề làm phiền sự yên tĩnh trong nhà. Giải phóng đôi tay khỏi bồn rửa nhờn mỡ để dành thời gian cho điều thực sự quan trọng — và đó là món quà dịu dàng mà Toshiba muốn trao cho gian bếp.",
    heritage:
      "Toshiba bước vào lĩnh vực thiết bị rửa âm tủ bếp với dòng Originclean, tiếp nối chuyên môn kỹ thuật về làm sạch và kiểm soát tiết kiệm năng lượng, với các chương trình rửa và logic hiệu suất do đội ngũ Tokyo định hình.",
    technicalSpecs: [
      { label: "Loại máy", value: "Máy rửa bát Originclean (âm tủ / độc lập tùy model)" },
      { label: "Chương trình rửa", value: "Chương trình và chức năng nhiều giai đoạn cho các mức dầu mỡ và tổ hợp bát đĩa khác nhau" },
      { label: "Rửa & sấy", value: "Tia nước mạnh làm sạch sâu + sấy nhiệt độ cao để bát đĩa sạch như mới" },
      { label: "Tiết kiệm", value: "Thiết kế tiết kiệm nước và điện, kinh tế và thiết thực khi dùng lâu" },
      { label: "Độ bền", value: "Kết cấu bền bỉ cao với vận hành êm ái" },
      { label: "Nguồn điện", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Vệ sinh bộ lọc", desc: "Thường xuyên tháo và rửa bộ lọc đáy để loại bỏ cặn, giữ tia phun và đường xả thông thoáng, làm sạch không suy giảm." },
      { title: "Thông tay phun", desc: "Thường xuyên kiểm tra các lỗ phun trên tay phun có bị tắc không và thông bằng kim mảnh nếu cần, đảm bảo nước phủ đều." },
      { title: "Bổ sung vật tư", desc: "Bổ sung muối rửa bát và nước trợ xả khi máy nhắc để làm mềm nước và tăng hiệu quả sấy khô cùng độ bóng bát đĩa." },
      { title: "Thông gió gioăng cửa", desc: "Hé cửa cho thoáng sau khi rửa và lau sạch gioăng cửa để ngăn ẩm và mùi bên trong." },
    ],
    installation: [
      "Với model âm tủ, kiểm tra hốc tủ khớp với kích thước lắp âm",
      "Đấu nối cấp nước, xả nước và nguồn điện, kiểm tra các mối nối kín khít và độ cao đường xả đạt chuẩn",
      "Trước khi cấp nguồn, kiểm tra điện áp, đường điện riêng và tiếp địa chắc chắn",
      "Chạy một chu trình không tải và thêm vật tư trước lần dùng đầu tiên",
      "Giữ hóa đơn và phiếu bảo hành để được bảo hành theo chính sách nhà sản xuất",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "💦", title: "Làm sạch sâu", desc: "Tia nước mạnh và chương trình nhiều giai đoạn cuốn trôi dầu mỡ và cặn bẩn sạch trong một lần rửa, để bát đĩa sáng bóng." },
      { icon: "🌡️", title: "Sấy nhiệt độ cao", desc: "Rửa và sấy ở nhiệt độ cao để bát đĩa sạch như mới — khô ráo và không vệt nước." },
      { icon: "💧", title: "Tiết kiệm nước & điện", desc: "Thiết kế tiết kiệm nước và điện dùng ít nước hơn rửa tay và kinh tế hơn về lâu dài." },
      { icon: "🔇", title: "Êm ái và bền bỉ", desc: "Kết cấu bền bỉ cao với vận hành êm ái giữ gìn sự yên tĩnh trong nhà." },
      { icon: "🛡️", title: "Bảo hành chính hãng", desc: "Phân phối chính hãng + bảo hành Hua Yue DDP, với linh kiện zin đầy đủ và dịch vụ hậu mãi." },
    ],
    projectShowcase: [
      "Gói máy rửa bát âm tủ cho bếp căn hộ và biệt thự",
      "Giải pháp làm sạch cho bếp sau và khu sơ chế của khách sạn, căn hộ dịch vụ",
      "Dự án bàn giao bếp trọn gói cần một thương hiệu đồ bếp Nhật Bản đồng nhất",
    ],
    faq: [
      { q: "Máy rửa bát có sạch hơn rửa tay không?", a: "Có. Tia nước mạnh ở nhiệt độ cao đạt mức nhiệt làm sạch và diệt khuẩn khó duy trì bằng tay, kết hợp sấy nhiệt độ cao nên bát đĩa sạch hơn và khô hơn trong khi tổng thể dùng ít nước hơn." },
      { q: "Tôi có cần vật tư chuyên dụng cho máy rửa bát không?", a: "Chúng tôi khuyến nghị viên/bột rửa chuyên dụng cho máy rửa bát, muối rửa bát và nước trợ xả; muối làm mềm nước để ngăn cặn vôi, còn nước trợ xả cải thiện độ sấy khô và độ bóng bát đĩa." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 净水 ───────────────────────────────
  "净水": {
    story:
      "Tại Nhật Bản, nước sạch là điểm khởi đầu của việc nấu nướng và nền tảng của đời sống thường nhật. Thiết bị lọc nước Toshiba mang sự tinh tế ấy vào từng ly nước: lọc nhiều cấp loại bỏ tạp chất và mùi từng lớp một, để lại vị thanh ngọt, và một số model còn tạo đá tinh khiết trực tiếp để thưởng thức đồ uống lạnh hoàn toàn an tâm. Máy nước nóng, với dáng hình hiện đại sang trọng, tích hợp hệ thống an toàn bảo vệ nhiều lớp đặt sự an toàn của người dùng lên hàng đầu trong mỗi lần sử dụng. Dù là ly nước nơi cửa nhà hay hơi ấm dưới vòi sen, Toshiba bảo vệ sự sạch sẽ và ấm áp của tổ ấm bằng sự chăm chút tỉ mỉ kiểu Nhật.",
    heritage:
      "Toshiba đưa lọc nước gia đình và nước nóng vào danh mục thiết bị đời sống, tiếp nối chuyên môn về xử lý nước và an toàn điện. Các giải pháp bảo vệ nhiều lớp và lọc nước được đội ngũ Tokyo giám sát và thiết kế theo tiêu chuẩn chất lượng Nhật Bản.",
    technicalSpecs: [
      { label: "Loại máy", value: "Máy lọc nước / máy lọc nước làm đá / máy nước nóng" },
      { label: "Lọc nước", value: "Lọc nhiều cấp loại bỏ tạp chất và mùi cho vị thanh ngọt" },
      { label: "Làm đá", value: "Một số model tích hợp làm đá, cung cấp viên đá đạt chuẩn tinh khiết" },
      { label: "An toàn máy nước nóng", value: "Hệ thống an toàn bảo vệ nhiều lớp, chế tạo theo tiêu chuẩn an toàn nghiêm ngặt" },
      { label: "Thiết kế", value: "Kiểu dáng hiện đại sang trọng hòa hợp vào không gian bếp và phòng tắm" },
      { label: "Nguồn điện", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Thay lõi lọc", desc: "Thay lõi lọc kịp thời theo chu kỳ sử dụng hoặc cảnh báo chất lượng nước để duy trì hiệu năng lọc và vị nước." },
      { title: "Vệ sinh đường ống", desc: "Thường xuyên vệ sinh/xả vòi nước và đường nước theo hướng dẫn để tránh tái nhiễm bẩn và mùi hôi." },
      { title: "Tẩy cặn máy nước nóng", desc: "Thường xuyên kiểm tra và loại bỏ cặn trong bình máy nước nóng, kiểm tra thanh magie để kéo dài tuổi thọ và duy trì hiệu suất gia nhiệt." },
      { title: "Kiểm tra an toàn", desc: "Thường xuyên kiểm tra chống giật và tiếp địa của máy nước nóng; nếu phát hiện bất thường, ngừng dùng ngay và liên hệ dịch vụ hậu mãi." },
    ],
    installation: [
      "Để thợ chuyên nghiệp lắp đặt theo hướng dẫn, đấu nối đường ống cấp/thoát và đường xả đạt chuẩn",
      "Máy nước nóng phải được tiếp địa chắc chắn và lắp chống giật, có van xả áp ở phía đường vào",
      "Trước khi cấp nguồn / cấp nước, kiểm tra các mối nối kín khít, áp lực nước và điện áp đạt chuẩn",
      "Sau khi lắp máy lọc nước, xả lõi lọc cho đến khi nước trong rồi mới dùng bình thường",
      "Giữ hóa đơn và phiếu bảo hành để được bảo hành theo chính sách nhà sản xuất",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "💧", title: "Lọc nhiều cấp", desc: "Lọc từng lớp loại bỏ tạp chất và mùi cho nước thanh ngọt, an tâm." },
      { icon: "🧊", title: "Làm đá tinh khiết", desc: "Một số model tích hợp làm đá, để đồ uống lạnh cũng dùng viên đá đạt chuẩn tinh khiết." },
      { icon: "🛡️", title: "Bảo vệ nhiều lớp", desc: "Hệ thống an toàn nhiều lớp của máy nước nóng được chế tạo theo tiêu chuẩn an toàn nghiêm ngặt." },
      { icon: "✨", title: "Thiết kế sang trọng", desc: "Kiểu dáng hiện đại, tinh tế hòa hợp liền mạch vào không gian bếp và phòng tắm." },
      { icon: "🔧", title: "Bảo hành chính hãng", desc: "Phân phối chính hãng + bảo hành Hua Yue DDP, với lõi lọc và linh kiện zin có sẵn." },
    ],
    projectShowcase: [
      "Gói nước uống trực tiếp tại bếp và nước nóng phòng tắm cho căn hộ và biệt thự",
      "Giải pháp lọc nước và nước nóng phòng khách cho khách sạn và căn hộ dịch vụ",
      "Dự án bàn giao nhà ở cần một thương hiệu lọc nước/nước nóng Nhật Bản đồng nhất",
    ],
    faq: [
      { q: "Bao lâu nên thay lõi lọc của máy lọc nước một lần?", a: "Tùy thuộc vào chất lượng nước đầu vào và lượng sử dụng; thông thường thay theo lưu lượng định mức hoặc chu kỳ sử dụng ghi cho model. Hãy thay sớm nếu dòng nước chậm lại hoặc vị nước kém đi, và Hua Yue có thể hỗ trợ cung cấp lõi lọc zin phù hợp." },
      { q: "Lắp đặt máy nước nóng có yêu cầu an toàn gì?", a: "Phải được tiếp địa chắc chắn, lắp aptomat chống giật và có van xả áp (an toàn) ở phía đường vào; nên do thợ chuyên nghiệp lắp đặt và kiểm tra định kỳ để đảm bảo an toàn điện và nước." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 小家电 · 风扇 ───────────────────────────────
  "小家电·风扇": {
    story:
      "Điều quạt Toshiba theo đuổi không phải một cơn gió mạnh dữ dội mà là làn gió vừa vặn như chính tự nhiên. Quạt đối lưu không khí, với công nghệ mô phỏng gió tự nhiên độc đáo, mang đến luồng gió mát dịu và liền mạch, đưa không khí cả phòng lặng lẽ chuyển động, xua đi sự bí bách và oi dính cục bộ. Cánh quạt của dòng Turbo, lấy cảm hứng từ máy bay phản lực, kết hợp cùng cánh dẫn dòng xoắn ốc AirBoost để đưa luồng gió mạnh đi xa tới khoảng 12 mét, làm mát đều cả những không gian lớn. Từ đứng sàn đến treo tường, từ phòng ngủ đến gian bếp, Toshiba gói trọn sự tinh tế kiểu Nhật vào từng cánh quạt — êm ái, tiết kiệm điện, và mang đến sự điềm tĩnh của cả một mùa hè.",
    heritage:
      "Toshiba xuất sắc về công nghệ động cơ và luồng gió, và mở rộng sang quạt gia đình, với các thiết kế như mô phỏng gió tự nhiên và dẫn dòng gió xoắn ốc AirBoost được đội ngũ Nhật Bản tinh chỉnh để cân bằng giữa luồng gió dễ chịu và hiệu suất năng lượng.",
    technicalSpecs: [
      { label: "Loại máy", value: "Quạt đứng sàn / treo tường, quạt đối lưu không khí, quạt turbo" },
      { label: "Công nghệ luồng gió", value: "Mô phỏng gió tự nhiên + dẫn dòng gió xoắn ốc AirBoost (dòng Turbo đạt khoảng 12 mét)" },
      { label: "Động cơ", value: "Động cơ hiệu suất cao, một số model có luồng gió mạnh công suất lớn" },
      { label: "Mức gió", value: "Nhiều mức gió điều chỉnh được, bao gồm chế độ thông minh/gió tự nhiên" },
      { label: "Cánh quạt", value: "Nhiều cánh (ví dụ 5 cánh) tối ưu luồng gió và độ êm" },
      { label: "Nguồn điện", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Lau bụi cánh quạt", desc: "Thường xuyên tháo lồng và cánh quạt rồi lau sạch bụi bám bằng khăn mềm để duy trì luồng gió và không khí sạch." },
      { title: "Chăm sóc động cơ", desc: "Giữ khe hút khí của động cơ thông thoáng, không để bụi làm tắc tản nhiệt, và bảo dưỡng kịp thời nếu có tiếng kêu lạ khi vận hành." },
      { title: "Cất giữ nơi khô ráo", desc: "Vệ sinh và làm khô trước khi cất theo mùa và giữ ở nơi khô ráo để chống ẩm và bụi." },
      { title: "Kiểm tra dây điện", desc: "Thường xuyên kiểm tra dây nguồn và phích cắm xem có hư hỏng không để đảm bảo an toàn điện." },
    ],
    installation: [
      "Lắp đế và trụ của quạt đứng sàn theo hướng dẫn, đảm bảo vững chắc và không bị đổ",
      "Lắp quạt treo tường trên tường chịu lực, siết chặt vít, và chừa khoảng trống cho quạt đảo",
      "Trước khi cấp nguồn, kiểm tra điện áp và phích cắm tiếp xúc tốt",
      "Đặt/lắp ở nơi phẳng, thông thoáng, tránh ẩm và vật cản như rèm cửa",
      "Giữ hóa đơn và phiếu bảo hành để được bảo hành theo chính sách nhà sản xuất",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🍃", title: "Gió dịu tự nhiên", desc: "Công nghệ mô phỏng gió tự nhiên mang đến luồng gió mát dịu, tươi mới và không gây khó chịu ngay cả khi dùng lâu." },
      { icon: "🌪️", title: "Tầm gió mạnh mẽ", desc: "Turbo + dẫn dòng gió xoắn ốc AirBoost vươn xa khoảng 12 mét, làm mát đều cả những không gian lớn." },
      { icon: "🎚️", title: "Nhiều mức điều chỉnh", desc: "Nhiều mức gió và chế độ thông minh/gió tự nhiên giúp bạn tùy chỉnh luồng gió dễ chịu theo nhu cầu." },
      { icon: "🔇", title: "Êm ái và tiết kiệm điện", desc: "Động cơ hiệu suất cao chạy êm với mức điện thấp, thoải mái dùng suốt đêm." },
      { icon: "🛡️", title: "Bảo hành chính hãng", desc: "Phân phối chính hãng + bảo hành Hua Yue DDP, với linh kiện zin đầy đủ và dịch vụ hậu mãi." },
    ],
    projectShowcase: [
      "Giải pháp đối lưu không khí và làm mát cho phòng ngủ và phòng khách căn hộ",
      "Không gian cần luồng gió định hướng, chẳng hạn như bếp và phòng ăn",
      "Triển khai quạt Nhật Bản đồng nhất cho khách sạn, văn phòng và cửa hàng bán lẻ",
    ],
    faq: [
      { q: "Quạt đối lưu không khí khác quạt thường thế nào?", a: "Quạt đối lưu không khí dùng luồng gió tập trung dạng cột để đẩy không khí cả phòng vào tuần hoàn, tăng tốc trao đổi không khí và làm đều nhiệt độ — phù hợp hơn để dùng kèm điều hòa nhằm cải thiện cảm giác dễ chịu; quạt thường tập trung vào cảm giác mát cục bộ thổi thẳng vào người." },
      { q: "Quạt turbo có rất ồn không?", a: "Trong khi mang đến tầm gió mạnh khoảng 12 mét, dòng Turbo tối ưu động cơ và cánh quạt để giảm tiếng ồn, chạy êm ở mức thấp; để có luồng gió cực mạnh, các mức cao sẽ ồn hơn tương ứng, nên bạn có thể chọn mức phù hợp với nhu cầu." },
      ...BRAND_FAQ_TAIL,
    ],
  },

  // ─── 小家电 · 吸尘器 ───────────────────────────────
  "小家电 · 吸尘器": {
    story:
      "Máy hút bụi Toshiba chắt lọc sự tận tâm với sạch sẽ của người Nhật thành một công cụ thường nhật nhẹ nhàng, tiện tay. Đa dạng đầu bàn chải và chức năng phù hợp cho từng loại sàn và góc cạnh, trong khi lực hút mạnh mẽ cuốn đi bụi và tóc trong kẽ sàn, dưới ghế sofa và nơi góc khuất, để bụi bẩn không nhìn thấy trong nhà không còn chỗ trốn. Thân máy nhẹ và thao tác mượt mà, nên xoay trở, vào góc và lên xuống cầu thang đều nhẹ nhàng, làm việc dọn dẹp trở nên dễ dàng, nhanh chóng, dứt khoát. Toshiba tin rằng sự sang trọng thực sự không nằm ở tiếng ồn mà ở sự tĩnh lặng sạch bong — hãy giao phiền toái cho cỗ máy, và trả lại sự gọn gàng cho cuộc sống.",
    heritage:
      "Toshiba áp dụng công nghệ động cơ và luồng gió vào thiết bị làm sạch sàn, với tính thực dụng, độ bền và sự dễ dùng làm trọng tâm thiết kế, tiếp nối tiêu chuẩn chất lượng Nhật Bản.",
    technicalSpecs: [
      { label: "Loại máy", value: "Máy hút bụi gia đình kiểu hộp / kiểu trụ" },
      { label: "Lực hút", value: "Lực hút mạnh làm sạch bụi và tóc trong kẽ sàn và góc cạnh" },
      { label: "Đầu bàn chải & phụ kiện", value: "Đa dạng đầu bàn chải và chức năng phù hợp cho các loại sàn và tình huống khác nhau" },
      { label: "Điều khiển", value: "Thân máy nhẹ, di chuyển mượt mà, dọn dẹp nhẹ nhàng và hiệu quả" },
      { label: "Bảo trì", value: "Cốc/hộp chứa bụi dễ tháo, dễ vệ sinh, tiện lợi khi sử dụng" },
      { label: "Nguồn điện", value: "220-240V / 50Hz" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: [
      { title: "Đổ bụi", desc: "Đổ cốc bụi / thay túi bụi kịp thời để tránh thùng đầy làm giảm lực hút và tản nhiệt động cơ." },
      { title: "Bảo dưỡng bộ lọc", desc: "Thường xuyên vệ sinh hoặc thay bộ lọc để duy trì lực hút và khí thải sạch, ngăn bụi thứ cấp." },
      { title: "Chăm sóc đầu bàn chải", desc: "Loại bỏ tóc và sợi chỉ quấn trên chổi cuốn để đảm bảo hiệu năng làm sạch và cuốn trơn tru." },
      { title: "Cất giữ dây điện", desc: "Cuộn gọn dây nguồn sau khi dùng để tránh hư hỏng do kéo giật và đè ép." },
    ],
    installation: [
      "Lắp ráp thân máy, ống mềm và các đầu bàn chải cần thiết theo hướng dẫn",
      "Trước khi dùng, kiểm tra bộ lọc và bộ phận chứa bụi đã lắp đúng cách",
      "Trước khi cấp nguồn, kiểm tra điện áp và phích cắm tiếp xúc tốt",
      "Chọn đầu bàn chải tương ứng theo chất liệu sàn để tránh chổi cứng làm trầy sàn",
      "Giữ hóa đơn và phiếu bảo hành để được bảo hành theo chính sách nhà sản xuất",
    ],
    certifications: BRAND_CERTS_BASE,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🌀", title: "Lực hút mạnh mẽ", desc: "Len sâu vào kẽ hở và góc cạnh, cuốn đi bụi và tóc trong một lượt cho việc dọn dẹp triệt để hơn." },
      { icon: "🧹", title: "Nhiều đầu bàn chải", desc: "Đa dạng đầu bàn chải và chức năng phù hợp cho các loại sàn và tình huống khác nhau, làm sạch trọn vẹn hơn." },
      { icon: "🪶", title: "Nhẹ nhàng dễ dùng", desc: "Thân máy nhẹ di chuyển mượt mà, giúp vào góc và lên cầu thang dễ dàng, không mỏi tay." },
      { icon: "♻️", title: "Dễ bảo trì", desc: "Cốc bụi/bộ lọc dễ tháo và vệ sinh, giúp việc bảo dưỡng hằng ngày đơn giản, an tâm." },
      { icon: "🛡️", title: "Bảo hành chính hãng", desc: "Phân phối chính hãng + bảo hành Hua Yue DDP, với linh kiện zin đầy đủ và dịch vụ hậu mãi." },
    ],
    projectShowcase: [
      "Giải pháp làm sạch sàn thường nhật cho căn hộ và nhà ở",
      "Bố trí dọn phòng cho phòng khách của khách sạn và homestay",
      "Dự án nhà ở và thương mại cần một thương hiệu đồ gia dụng nhỏ Nhật Bản đồng nhất",
    ],
    faq: [
      { q: "Máy hút bụi phù hợp với loại sàn nào?", a: "Bằng cách đổi đầu bàn chải tương ứng, máy phù hợp với nhiều loại sàn như gạch, sàn gỗ và thảm; với bề mặt cứng như sàn gỗ, khuyến nghị đầu sàn lông mềm / có thanh chổi để tránh trầy xước." },
      { q: "Bao lâu nên vệ sinh bộ lọc một lần?", a: "Chúng tôi khuyến nghị thường xuyên vệ sinh hoặc thay bộ lọc tùy theo tần suất sử dụng; không vệ sinh trong thời gian dài sẽ làm giảm lực hút và khí thải xấu đi. Giữ bộ lọc sạch sẽ duy trì lực hút và giảm bụi thứ cấp." },
      ...BRAND_FAQ_TAIL,
    ],
  },
};

/**
 * Helper: get Toshiba product-line metadata by seriesOriginal.
 * It matches exactly first; on a miss, it falls back to the first segment
 * (e.g., "厨房电器 · 洗碗机" falls back to "厨房电器"), and on a continued miss,
 * it falls back to "冰箱" as the brand's general story.
 */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  const key = seriesOriginal.trim();
  if (TOSHIBA_SERIES_META[key]) return TOSHIBA_SERIES_META[key];
  const head = key.split(/[·\/\s]/)[0].trim();
  return TOSHIBA_SERIES_META[head] || TOSHIBA_SERIES_META["冰箱"];
}
