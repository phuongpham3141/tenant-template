/**
 * Guangri elevator series metadata — rich content for product detail pages.
 * Indexed by seriesOriginal: "home-cabin" (home-elevator cabin styles) / "home-elevator" (complete home elevators) / "escalator" (escalators and moving walks).
 * Source: guangri.com.cn — Guangzhou Guangri Elevator. Technical specifications represent typical industry ranges; actual figures depend on site survey and configuration.
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
  "Được thành lập tại Quảng Châu, Thang máy Guangri (Quảng Nhật) là một trong những nhà sản xuất thang máy trọn dòng quy mô lớn và ra đời sớm nhất tại Trung Quốc, với dải sản phẩm trải rộng từ thang máy chở khách, thang máy gia đình, thang máy chở hàng, thang máy bệnh viện, thang máy cứu hỏa cho đến thang cuốn và băng tải chở người",
  "Được hậu thuẫn bởi một hệ thống nghiên cứu phát triển và sản xuất thang máy khép kín nội bộ — các linh kiện cốt lõi từ máy kéo, tủ điều khiển cho đến nội thất cabin đều do Guangri tự nghiên cứu và tự sản xuất, mỗi sản phẩm đều được hiệu chỉnh riêng và kiểm tra định kỳ trước khi xuất xưởng",
  "Máy kéo sử dụng công nghệ dẫn động không hộp số đồng bộ nam châm vĩnh cửu kết hợp với hệ thống điều khiển tốc độ VVVF (điều chế điện áp và tần số), mang lại vận hành êm ái, mức tiêu thụ năng lượng thấp hơn và giếng thang nhỏ gọn hơn",
  "Đối với thang máy gia đình, có hàng chục phương án nội thất cabin cao cấp (Sang trọng Gothic, Lãng mạn La Mã, Thanh bình Xanh ngọc, Nữ thần Đỏ thắm, Trụ cột Rạng ngời và nhiều phương án khác) để lựa chọn và phối hợp phù hợp với phong cách thiết kế nội thất",
  "Được hỗ trợ bởi một mạng lưới toàn quốc về lắp đặt, bảo trì và dịch vụ kỹ thuật, cung cấp sự hỗ trợ trọn gói từ khảo sát hiện trường và tư vấn lựa chọn, cung ứng nguyên bộ, lắp đặt và chạy thử, cho đến bảo trì định kỳ và hiện đại hóa các thang máy đã cũ",
];

const BRAND_CERTS = [
  "Giấy phép Sản xuất Thiết bị Đặc thù (Thang máy) — hoạt động sản xuất được cấp phép theo các yêu cầu giám sát an toàn thiết bị đặc thù của Trung Quốc",
  "Tuân thủ các tiêu chuẩn an toàn về sản xuất và lắp đặt thang máy (bộ tiêu chuẩn GB/T 7588) cùng các quy định kỹ thuật an toàn thang máy TSG",
  "Chứng nhận hệ thống quản lý chất lượng ISO 9001, với mỗi sản phẩm đều được kiểm tra định kỳ riêng lẻ và chạy thử trước khi giao hàng",
  "Mỗi công trình lắp đặt hoàn thiện chỉ được đưa vào sử dụng sau khi vượt qua kiểm định giám sát bởi một cơ quan kiểm định thiết bị đặc thù có thẩm quyền",
  "Nguyên bộ thiết bị và các linh kiện cốt lõi đi kèm thời hạn bảo hành, với dịch vụ bảo trì và cung cấp phụ tùng từ nhà sản xuất trong suốt thời hạn đó",
];

const BRAND_PACK = [
  { label: "Hình thức cung ứng", value: "Thang máy nguyên bộ được cung cấp theo cấu hình của từng dự án, kèm theo dịch vụ lắp đặt và chạy thử" },
  { label: "Vận chuyển", value: "Máy kéo, cabin, ray dẫn hướng và tủ điều khiển được đóng gói riêng trong thùng/khung gỗ, giao hàng theo từng đợt tùy theo số tầng và kích thước giếng thang" },
  { label: "Yêu cầu hiện trường", value: "Cần chừa sẵn hố pit, khoảng thông thủy tầng trên cùng và không gian phòng máy / không phòng máy; bản vẽ chừa sẵn phần xây dựng được cung cấp để phối hợp thi công" },
  { label: "Dịch vụ", value: "Tích hợp khảo sát hiện trường và tư vấn lựa chọn, lắp đặt và chạy thử, kiểm định giám sát, bảo trì định kỳ và hiện đại hóa" },
  { label: "Mẫu thử", value: "Mẫu nội thất cabin, hình ảnh phối cảnh và bảng màu được cung cấp để xác nhận phong cách và vật liệu trước khi chốt quy cách kỹ thuật" },
];

const BRAND_INSTALL = [
  "Trước khi lựa chọn, đội ngũ kỹ thuật tiến hành khảo sát tại hiện trường: xác minh chiều sâu hố pit, khoảng thông thủy tầng trên cùng, kích thước thông thủy giếng thang, hành trình di chuyển và tải trọng định mức",
  "Phối hợp phần xây dựng: giếng thang, hố pit và phòng máy (hoặc dầm chịu lực cho loại không phòng máy) được thi công theo bản vẽ chừa sẵn, với các chi tiết chôn sẵn và giá đỡ ray được định vị",
  "Đội ngũ kỹ thuật được đào tạo và cấp chứng chỉ tiến hành cẩu lắp máy kéo, lắp đặt ray dẫn hướng và cabin, đồng thời hoàn thiện đúng cách phần đấu nối điện, khóa liên động cửa tự động cùng việc hiệu chỉnh bộ khống chế vượt tốc / thắng cơ an toàn",
  "Hệ thống cứu hộ khẩn cấp (tự cân bằng tầng khi mất điện / quay tay thủ công) và bộ liên lạc nội bộ năm bên được kết nối, với mạch an toàn và phanh được kiểm tra từng hạng mục một",
  "Sau khi hoàn thành, tiến hành chạy thử không tải và đầy tải; tiếp đó, sau khi vượt qua kiểm định giám sát bởi một cơ quan kiểm định thiết bị đặc thù có thẩm quyền, hồ sơ đăng ký sử dụng được lập trước khi thang máy được bàn giao đưa vào vận hành",
];

const BRAND_CARE = [
  { title: "Bảo trì định kỳ", desc: "Theo các chu kỳ quy định (thường là 15 ngày đến 1 tháng một lần), một đơn vị bảo trì được cấp phép sẽ kiểm tra và bôi trơn cáp tải / ray dẫn hướng, phanh, hệ thống cửa và tủ điều khiển." },
  { title: "Kiểm định an toàn", desc: "Kiểm định an toàn hằng năm được thực hiện theo yêu cầu của cơ quan quản lý thiết bị đặc thù địa phương; nếu xuất hiện tiếng ồn bất thường, rung lắc hoặc dừng tầng không chính xác trong quá trình vận hành, hãy dừng thang máy ngay lập tức và gọi dịch vụ." },
  { title: "Thiết bị khẩn cấp", desc: "Thường xuyên kiểm tra hệ thống tự cân bằng tầng khẩn cấp khi mất điện, bộ liên lạc nội bộ và hệ thống báo động để đảm bảo liên lạc và cứu hộ kịp thời trong trường hợp bị kẹt trong cabin." },
  { title: "Bảo dưỡng cabin", desc: "Vệ sinh bằng dung dịch tẩy rửa phù hợp với chất liệu cabin (thép không gỉ / kính / lớp hoàn thiện gỗ), tránh làm trầy xước bề mặt gương và các tấm khắc bằng vật cứng." },
];

const BRAND_WHY = {
  icon: "🛗",
  title: "Thương hiệu nội địa lâu đời",
  desc: "Guangri là một trong những nhà sản xuất thang máy quy mô lớn ra đời sớm nhất và luôn được đánh giá cao tại Trung Quốc, với năng lực tự phát triển nguyên bộ thiết bị cùng mạng lưới dịch vụ trên toàn quốc.",
};

export const GUANGRI_SERIES_META: Record<string, SeriesMeta> = {
  "home-cabin": {
    story:
      "Các phong cách cabin thang máy gia đình Guangri là một loại hình nghệ thuật chắt lọc nét tinh tế của không gian sống biệt thự vào một khoảng không nhỏ gọn — từ sự trang nghiêm, lộng lẫy của Sang trọng Gothic và nét lãng mạn, tinh tế của Lãng mạn La Mã cho đến sự thanh bình, giàu cảm xúc của Thanh bình Xanh ngọc và vẻ rạng ngời, lộng lẫy của Nữ thần Đỏ thắm, mỗi phong cách đều nắm bắt một thái độ sống riêng biệt. Thép không gỉ khắc hoa văn, bề mặt gương, kính cường lực và các tấm veneer gỗ xếp lớp tạo nên kết cấu giàu chiều sâu dưới ánh sáng, biến hành động đơn giản là di chuyển giữa các tầng thành một phòng trưng bày riêng tư mà bạn đi qua mỗi ngày. Đó không đơn thuần là lớp vỏ của một phương tiện di chuyển; đó là ấn tượng đầu tiên mà khách hình thành ngay khoảnh khắc họ bước qua cửa chính. Đối với những gia chủ biệt thự sành điệu, việc chọn đúng cabin chẳng khác nào trao cho cả ngôi nhà một đôi mắt.",
    heritage:
      "Nội thất cabin là nét chấm phá hoàn thiện của một thang máy gia đình — qua nhiều năm tập trung làm việc trong phân khúc nhà ở cao cấp, Guangri đã nuôi dưỡng một ngôn ngữ thiết kế cabin hoàn chỉnh, lấy cảm hứng từ cả những ý vị nghệ thuật phương Đông lẫn thẩm mỹ hiện đại, trải rộng các phong cách từ cổ điển đến đương đại.",
    technicalSpecs: [
      { label: "Loại", value: "Phong cách nội thất cabin thang máy gia đình (trang trí cabin)" },
      { label: "Phong cách tiêu biểu", value: "Sang trọng Gothic / Lãng mạn La Mã / Thanh bình Xanh ngọc / Nữ thần Đỏ thắm / Trụ cột Rạng ngời và nhiều phong cách khác" },
      { label: "Vật liệu chính", value: "Thép không gỉ xước / gương, tấm thép khắc hoa văn, kính cường lực, tấm trang trí gỗ" },
      { label: "Tải trọng tương thích", value: "Khoảng 250 – 400kg (tùy theo cấu hình máy của thang máy gia đình)" },
      { label: "Chiếu sáng & trần cabin", value: "Trần LED / trần bầu trời sao, kèm tùy chọn ánh sáng môi trường và các tấm ốp gương phía sau" },
      { label: "Ứng dụng", value: "Thang máy gia đình cao cấp cho biệt thự, nhà phố, căn hộ thông tầng tầng trên cùng và các loại hình nhà ở tương tự" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      BRAND_WHY,
      { icon: "🎨", title: "Đa dạng phong cách", desc: "Các cabin theo chủ đề cổ điển, hiện đại và nghệ thuật giúp bạn luôn tìm được một lựa chọn phù hợp với phong cách nội thất của mình." },
      { icon: "💎", title: "Vật liệu cao cấp", desc: "Thép không gỉ gương / khắc hoa văn, kính cường lực và các tấm veneer gỗ kết hợp kết cấu giàu chiều sâu với độ bền cao." },
      { icon: "✨", title: "Không gian ánh sáng", desc: "Thiết kế trần LED và trần bầu trời sao thắp sáng không gian đầy phong cách và nâng tầm trải nghiệm di chuyển." },
      { icon: "📐", title: "Phối hợp tùy chỉnh", desc: "Có thể cung cấp tư vấn lựa chọn cabin và phối màu phù hợp với mặt bằng và thiết kế nội thất, tạo nên một tổng thể hài hòa." },
    ],
    projectShowcase: [
      "Thang máy đón khách cho biệt thự và nhà phố cao cấp",
      "Thang máy riêng cho căn hộ penthouse tầng trên cùng",
      "Nhà tự xây nhiều tầng và các dự án nâng cấp nhà ở",
    ],
    faq: [
      { q: "Có thể thay thế hoặc tân trang riêng phong cách cabin không?", a: "Khi điều kiện giếng thang và máy hiện hữu cho phép, một số nội thất cabin có thể được tân trang hoặc đổi mới phong cách; phương án cụ thể cần được xác nhận sau khi khảo sát kỹ thuật." },
      { q: "Làm sao chọn phong cách cabin phù hợp với ngôi nhà của tôi?", a: "Chúng tôi khuyến nghị lựa chọn dựa trên chủ đề thiết kế của sảnh chính và giếng cầu thang — nhà ở cổ điển thường hướng tới phong cách Gothic / La Mã, trong khi nhà tối giản hiện đại thường hướng tới Thanh bình Xanh ngọc / Vệt Bạc; bạn có thể yêu cầu hình ảnh phối cảnh từ Chuỗi Cung ứng Huayue." },
      { q: "Cabin kính có an toàn không?", a: "Cabin sử dụng kính an toàn cường lực tuân thủ các tiêu chuẩn an toàn thang máy, đảm bảo độ bền đồng thời tạo nên tầm nhìn toàn cảnh thoáng đãng." },
      { q: "Cabin cần được bảo dưỡng hằng ngày như thế nào?", a: "Lau bề mặt thép không gỉ và gương theo chiều vân với dung dịch tẩy rửa trung tính phù hợp, giữ cho lớp hoàn thiện gỗ không ngâm nước, và kiểm tra các tấm ốp cùng tay vịn định kỳ kết hợp với việc bảo trì thường xuyên của thiết bị." },
    ],
  },
  "home-elevator": {
    story:
      "Thang máy gia đình Guangri được tạo ra dành cho biệt thự và nhà phố — chúng biết cách tận dụng tối đa một giếng thang hạn hẹp, và biết cách khiến mỗi lần lên xuống gần như tĩnh lặng không một tiếng động. Máy kéo không hộp số đồng bộ nam châm vĩnh cửu kết hợp điều khiển tốc độ theo tần số mang lại khởi động và dừng dịu dàng cùng độ dừng tầng chính xác, để người cao tuổi lẫn trẻ nhỏ đều có thể di chuyển nhẹ nhàng; thiết kế nhỏ gọn, mức tiêu thụ điện thấp, cùng tùy chọn không phòng máy giúp việc chừa sẵn phần xây dựng trở nên linh hoạt hơn. Tính năng tự cân bằng tầng khẩn cấp khi mất điện và hệ thống liên lạc nội bộ lặng lẽ giữ vững phòng tuyến an toàn. Từ tầng trệt lên đến tầng trên cùng, nó biến sự mệt nhọc của cầu thang thành vài giây nhẹ nhõm, để cuộc sống nhiều tầng thực sự không còn rào cản về độ cao.",
    heritage:
      "Khi biệt thự và nhà tự xây nhiều tầng ngày càng phổ biến, thang máy gia đình đã trở thành một trang bị tiêu chuẩn của không gian sống nâng cấp — Guangri đã đáp ứng nhu cầu này bằng việc hoàn thiện một dòng thang máy gia đình nhỏ gọn, êm ái và tiết kiệm năng lượng, thích ứng với đa dạng mặt bằng nhờ tuyển chọn phong phú các phương án cabin.",
    technicalSpecs: [
      { label: "Loại", value: "Thang máy gia đình (thang máy chở khách nhỏ gọn)" },
      { label: "Tải trọng định mức", value: "Khoảng 250 – 400kg (tương đương khoảng 3 – 5 người)" },
      { label: "Tốc độ định mức", value: "Khoảng 0.4 m/s (một số cấu hình lên đến 1.0 m/s)" },
      { label: "Phương thức dẫn động", value: "Kéo không hộp số đồng bộ nam châm vĩnh cửu + điều khiển tốc độ theo tần số VVVF" },
      { label: "Phương thức điều khiển", value: "Điều khiển gom chiều theo vi xử lý, có tùy chọn không phòng máy / hố pit nông" },
      { label: "Số tầng áp dụng", value: "Khoảng 2 – 6 tầng cho biệt thự, nhà phố và nhà tự xây" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      BRAND_WHY,
      { icon: "🏡", title: "Phù hợp với nhà ở", desc: "Kết cấu nhỏ gọn phù hợp với giếng thang nhỏ, hố pit nông và bố trí không phòng máy, giúp việc chừa sẵn phần xây dựng linh hoạt hơn." },
      { icon: "🔇", title: "Êm ái & yên tĩnh", desc: "Máy kéo không hộp số đồng bộ nam châm vĩnh cửu với điều khiển tốc độ theo tần số mang lại khởi động và dừng dịu dàng, dừng tầng chính xác và độ ồn thấp." },
      { icon: "🌱", title: "Tiết kiệm năng lượng", desc: "Hệ truyền động hiệu suất cao và thiết kế tiết kiệm điện ở chế độ chờ giúp chi phí điện về lâu dài luôn dễ chịu." },
      { icon: "🆘", title: "An toàn khẩn cấp", desc: "Được trang bị tính năng tự cân bằng tầng khẩn cấp khi mất điện và bộ liên lạc nội bộ năm bên, để người dùng có thể liên lạc và được cứu hộ kịp thời, an tâm hơn." },
    ],
    projectShowcase: [
      "Thang máy gia đình đón khách cho biệt thự độc lập",
      "Nhà phố nhiều tầng và biệt thự xếp tầng",
      "Nâng cấp nhà tự xây và thang máy cải tạo thân thiện với người cao tuổi",
    ],
    faq: [
      { q: "Guangri có cung cấp hỗ trợ lắp đặt và bảo trì tại Việt Nam không?", a: "Vui lòng liên hệ Chuỗi Cung ứng Huayue để được tư vấn phương án cung ứng, lắp đặt và dịch vụ kỹ thuật phù hợp với dự án; việc lắp đặt và bảo trì được thực hiện bởi đội ngũ đủ điều kiện tại địa phương." },
      { q: "Có lắp đặt được không nếu giếng thang của tôi rất nhỏ?", a: "Guangri cung cấp các tùy chọn nhỏ gọn như hố pit nông và thiết kế không phòng máy; kích thước có thể lắp đặt cần được xác nhận sau khi khảo sát tại chỗ kiểm tra hố pit, khoảng thông thủy tầng trên cùng và kích thước thông thủy giếng thang." },
      { q: "Tôi có bị kẹt bên trong khi mất điện không?", a: "Tính năng tự cân bằng tầng khẩn cấp khi mất điện là trang bị tiêu chuẩn; sau khi mất điện, thang máy có thể tự động cân bằng đến tầng gần nhất và mở cửa, đồng thời bộ liên lạc nội bộ được trang bị để dễ dàng liên hệ cứu hộ." },
      { q: "Thời gian giao hàng và lắp đặt là bao lâu?", a: "Điều này tùy thuộc vào cấu hình, phong cách cabin và tiến độ phần xây dựng; việc sản xuất và lắp đặt thường được lên lịch sau khi hoàn tất khảo sát và chừa sẵn phần xây dựng, với chi tiết được xác nhận theo dự án thực tế." },
      { q: "Việc bảo trì lâu dài được sắp xếp như thế nào?", a: "Thang máy là thiết bị đặc thù và phải được bảo trì định kỳ bởi một đơn vị bảo trì được cấp phép cùng kiểm định an toàn hằng năm; Chuỗi Cung ứng Huayue có thể giúp kết nối bạn với các dịch vụ bảo trì tại địa phương." },
    ],
  },
  escalator: {
    story:
      "Thang cuốn và băng tải chở người Guangri là dòng sông thép chảy mãi không ngừng trong những không gian đông đúc — nhẹ nhàng đưa dòng người đến từng tầng trong trung tâm thương mại, giữ cho những bước chân vội vã không vấp ngã trên bậc thang ở ga tàu điện và sân bay, và lặng lẽ chuyên chở những đợt người như thủy triều qua các trung tâm triển lãm và đầu mối giao thông. Kết cấu khung giàn chắc chắn, bền bỉ, hệ xích bậc thang và tay vịn đồng bộ êm ái, cùng điều khiển tiết kiệm năng lượng theo tần số giúp thang tự động giảm về chế độ chờ khi vắng người và vận hành ổn định ở mức đầy tải khi đông đúc. Nhiều lớp bảo vệ an toàn — phát hiện thiếu bậc, giám sát tốc độ tay vịn, nút dừng khẩn cấp và chổi chống kẹt — giữ cho mỗi bước lên xuống luôn nằm trong biên độ an toàn. Nó không phô trương ầm ĩ, nhưng lại là đoạn hành trình đáng tin cậy nhất trong bất kỳ công trình công cộng nào.",
    heritage:
      "Thang cuốn và băng tải chở người là dòng sản phẩm chủ lực của Guangri cho lĩnh vực giao thông công cộng và công trình thương mại — nhiều năm phục vụ trong các môi trường đông đúc như trung tâm thương mại, giao thông đường sắt và sân bay đã hun đúc nên kinh nghiệm dày dạn trong vận hành liên tục công suất lớn.",
    technicalSpecs: [
      { label: "Loại", value: "Thang cuốn / băng tải chở người (băng chuyền)" },
      { label: "Tốc độ định mức", value: "Khoảng 0.5 m/s (băng tải chở người khoảng 0.5 – 0.65 m/s)" },
      { label: "Chiều rộng bậc / tấm", value: "Các tùy chọn khoảng 600 / 800 / 1000mm" },
      { label: "Góc nghiêng", value: "Thang cuốn khoảng 30° / 35°; băng tải chở người khoảng 0° – 12°" },
      { label: "Điều khiển dẫn động", value: "Dẫn động theo tần số + thay đổi tốc độ theo cảm biến lưu lượng để tiết kiệm năng lượng — đầy tải khi đông, giảm về chế độ chờ khi vắng" },
      { label: "Ứng dụng", value: "Trung tâm thương mại, ga tàu điện ngầm, ga đường sắt, sân bay và các không gian công trình công cộng đông đúc" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      BRAND_WHY,
      { icon: "🏬", title: "Tạo ra cho lưu lượng lớn", desc: "Được thiết kế cho các môi trường đông người như trung tâm thương mại, nhà ga và sân bay, với vận hành liên tục công suất lớn ổn định." },
      { icon: "🛡️", title: "An toàn nhiều lớp", desc: "Phát hiện thiếu bậc, giám sát tốc độ tay vịn, dừng khẩn cấp và bảo vệ chống kẹt giúp an toàn toàn diện hơn." },
      { icon: "💡", title: "Thay đổi tốc độ tiết kiệm năng lượng", desc: "Điều khiển theo tần số cảm biến lưu lượng giảm về chế độ chờ khi vắng hoặc không có người, vận hành lâu dài tiết kiệm hơn." },
      { icon: "🔧", title: "Bền bỉ & dễ bảo dưỡng", desc: "Kết cấu khung giàn và xích bậc thang chắc chắn cùng các cụm linh kiện dạng mô-đun giúp việc kiểm tra, bảo trì và thay thế phụ tùng dễ dàng." },
    ],
    projectShowcase: [
      "Thang cuốn liên kết các tầng trong trung tâm thương mại và tổ hợp thương mại",
      "Hành lang chở khách tại ga tàu điện ngầm, ga đường sắt và sân bay",
      "Trung tâm hội nghị, khu khám ngoại trú bệnh viện và đầu mối giao thông công cộng",
    ],
    faq: [
      { q: "Thang cuốn đảm bảo an toàn cho hành khách như thế nào?", a: "Thang được trang bị nhiều thiết bị an toàn bao gồm phát hiện thiếu bậc, giám sát tốc độ tay vịn, nút dừng khẩn cấp ở trên và dưới, chổi chống kẹt và bảo vệ tấm chắn chân, đồng thời được kiểm tra định kỳ theo quy định." },
      { q: "Thang có buộc phải chạy hết tốc độ mọi lúc kể cả khi vắng người không?", a: "Có tính năng điều khiển thay đổi tốc độ theo cảm biến lưu lượng; thang tự động giảm tốc hoặc chuyển về chế độ chờ khi vắng hoặc không có người và trở lại tốc độ bình thường khi có người tiến đến, cân bằng giữa tiết kiệm năng lượng và trải nghiệm." },
      { q: "Băng tải chở người khác thang cuốn ở điểm nào?", a: "Thang cuốn là thiết bị vận chuyển nghiêng có bậc thang dùng để kết nối các tầng; băng tải chở người sử dụng các tấm gần như nằm ngang và phù hợp để di chuyển trên quãng đường dài bằng phẳng hoặc chở hành lý / xe đẩy hàng." },
      { q: "Thang có phù hợp với những địa điểm như bệnh viện hay sân bay không?", a: "Có. Thang cuốn và băng tải chở người Guangri từ lâu đã được sử dụng trong các công trình công cộng đông đúc như sân bay, nhà ga, bệnh viện và trung tâm thương mại, với trọng tâm là vận hành an toàn liên tục và dễ bảo trì." },
      { q: "Việc bảo trì và kiểm định lâu dài được sắp xếp như thế nào?", a: "Là thiết bị đặc thù, thang phải được bảo trì định kỳ bởi một đơn vị được cấp phép cùng kiểm định an toàn hằng năm; Chuỗi Cung ứng Huayue có thể giúp kết nối bạn với các dịch vụ bảo trì và kỹ thuật tại địa phương." },
    ],
  },
};

/** Helper: retrieve metadata by seriesOriginal, falling back to home-cabin by default. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return GUANGRI_SERIES_META[seriesOriginal.trim()] || GUANGRI_SERIES_META["home-cabin"];
}
