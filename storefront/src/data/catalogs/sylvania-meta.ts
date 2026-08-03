/**
 * Sylvania (Feilo Sylvania) series metadata — rich content for product detail pages.
 * A single set of brand-wide metadata shared across all product / solution series
 * (indoor LED luminaires, downlights, panels, industrial and sports-hall lighting,
 * human-centric lighting, smart controls, emergency and energy solutions).
 * Source: sylvania-group.com — an international lighting group founded in 1901,
 * plus industry-standard engineering parameters.
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
const BRAND: SeriesMeta = {
  story:
    "Sylvania là vệt sáng trải dài hơn một thế kỷ. Kể từ khoảnh khắc sợi tóc bóng đèn đầu tiên bừng sáng vào năm 1901, công ty đã xem ánh sáng như một bộ môn khoa học — sự nghiên cứu về con người, về không gian và về hiệu quả. Ngày nay, Sylvania không chỉ là một chiếc đèn đơn lẻ; đó là một ngôn ngữ chuyên nghiệp hoàn chỉnh, đi từ nguồn sáng đến môi trường được chiếu sáng. Concord Equinox xóa tan những khoảng trần tối bằng vầng hào quang ánh sáng mà bạn không thể nhìn thấy nguồn phát. Optix sử dụng quang học kiểm soát chói cao cấp để đưa độ chói trong văn phòng không gian mở xuống mức UGR dưới 19. Luminature mang ánh sáng tự nhiên ban ngày từ bên ngoài cửa sổ vào trong các showroom và lớp học. Đối với kiến trúc sư, nhà thiết kế chiếu sáng và nhà thầu, Sylvania mang đến thứ ánh sáng có thể tính toán, vận hành và tin cậy lâu dài — chứ không phải một luồng sáng chói lóa thoáng qua. Khi một công trình cần hệ thống chiếu sáng vừa tiết kiệm năng lượng vừa dễ chịu, vừa trang nhã vừa bền bỉ, Sylvania thường là cái tên được ghi vào hồ sơ thiết kế kỹ thuật.",
  heritage:
    "Với hơn 120 năm lịch sử, Sylvania hoạt động trên khắp châu Âu, châu Mỹ, châu Á và châu Phi. Sau khi sáp nhập với Shanghai Feilo Acoustics Group để hình thành Feilo Sylvania Group, Sylvania đã kết hợp công nghệ chiếu sáng phương Tây đã chín muồi với năng lực chuỗi cung ứng của Trung Quốc, tạo nên một ma trận sản phẩm hoàn chỉnh trải dài trên các lĩnh vực chiếu sáng kiến trúc, công nghiệp, bán lẻ, văn phòng, giáo dục và đô thị. Danh mục sản phẩm trải rộng từ những đổi mới tiên phong như đèn OptiClip TERRA với khung giấy bền vững, cho đến các giải pháp mở rộng có hệ thống như nền tảng thông minh SylSmart và các giải pháp năng lượng Power.",
  technicalSpecs: [
    { label: "Dải công suất", value: "Khoảng 8W – 200W (tùy theo dòng đèn và kiểu phân bố ánh sáng)" },
    { label: "Hiệu suất phát sáng", value: "Thường đạt 100 – 130 lm/W (các dòng hiệu suất cao như OptiClip TERRA còn vượt trội hơn)" },
    { label: "Nhiệt độ màu", value: "3000K / 4000K / 6500K; Luminature hỗ trợ ánh sáng phổ đầy đủ điều chỉnh được nhiệt độ màu (tunable white)" },
    { label: "Chỉ số hoàn màu", value: "CRI 80 cơ bản, tùy chọn độ trung thực cao CRI90+ (tái hiện chính xác chất liệu và tông da)" },
    { label: "Cấp bảo vệ chống xâm nhập", value: "Từ IP20 dùng trong nhà; bóng tuýp Helios được hàn kín hoàn toàn, vượt mức IP68" },
    { label: "Tuổi thọ định mức", value: "Từ khoảng 50.000 giờ; OptiClip TERRA đạt tới 100.000 giờ (L80B10)" },
  ],
  manufacturing: [
    "Tập đoàn chiếu sáng quốc tế Feilo Sylvania — mạng lưới R&D và cơ sở sản xuất trải rộng trên nhiều châu lục, kết hợp công nghệ chiếu sáng phương Tây với sức mạnh hợp lực từ chuỗi cung ứng Trung Quốc",
    "Một số dòng cao cấp được sản xuất tại châu Âu, chẳng hạn OptiClip TERRA từ nhà máy Saint-Etienne ở Pháp, với khung làm từ 60% vật liệu giấy bền vững được chứng nhận và có thể tái chế hoàn toàn",
    "OptiClip TERRA sử dụng thiết kế hai mô-đun LED tháo rời được, giúp giảm khoảng 80% lượng phát thải carbon trong sản xuất và khoảng 40% lượng phát thải carbon trong vận chuyển so với các loại đèn khung thép tương đương",
    "Linh kiện quang học tự sản xuất: từ chóa phản quang dạng mô-đun và tấm khuếch tán quang học vi lăng kính (MPO) cho đến chóa phản quang bất đối xứng, tương thích phân bố ánh sáng và kiểm soát chói theo từng bối cảnh sử dụng",
    "Nền tảng số SylSmart tuân theo nguyên tắc bảo mật ngay từ khâu thiết kế (security-by-design), với mỗi bộ đèn được tích hợp cảm biến thông minh, vi xử lý và bộ nhớ để xử lý tức thời ngay tại biên",
  ],
  careGuide: [
    { title: "Bảo trì định kỳ", desc: "Đèn LED có tuổi thọ dài và ít cần bảo trì; định kỳ lau sạch thấu kính và chóa phản quang bằng khăn mềm sạch để duy trì hiệu suất chiếu sáng, và kiểm tra tình trạng hoạt động của bộ nguồn (driver) theo lịch trình thường xuyên." },
    { title: "Hệ thống thông minh", desc: "SylSmart được cấu hình và giám sát thông qua ứng dụng và nền tảng số, cho phép cập nhật firmware từ xa, lên lịch và thiết lập kịch bản chiếu sáng, cũng như xem các phân tích về điện năng, độ rọi và sự hiện diện của người dùng." },
    { title: "Tự kiểm tra khẩn cấp", desc: "Đèn khẩn cấp LiFeSafe có tính năng Self-Test / DALI Self-Test, tự động kiểm tra tình trạng pin và đèn dự phòng; thay thế theo nhật ký trước khi pin suy giảm để đảm bảo 3 giờ chiếu sáng dự phòng khi mất điện." },
    { title: "Vệ sinh phòng sạch", desc: "Bề mặt đèn phòng sạch (LiteGuard) và đèn sân thể thao (Rocks) dễ làm sạch, có thể lau và khử trùng theo yêu cầu của tiêu chuẩn EN 60598-1 mà không ảnh hưởng đến cấp độ sạch." },
  ],
  installation: [
    "Lựa chọn theo ứng dụng: văn phòng và giáo dục ưu tiên kiểm soát chói và hoàn màu, công nghiệp và sân thể thao ưu tiên khả năng chống va đập và độ bền, bán lẻ và lưu trú ưu tiên không khí thẩm mỹ, trong khi đèn khẩn cấp và năng lượng được cấu hình theo quy chuẩn",
    "Lắp đặt bởi kỹ thuật viên điện có chuyên môn, đấu nối chính xác bộ nguồn LED bên ngoài và các mạch điều khiển, đồng thời xác nhận điện áp, cực tính và tiếp địa",
    "Đèn downlight / panel âm trần tuân theo kích thước lỗ khoét trần với khoảng hở để tản nhiệt; bóng tuýp Helios là loại thay thế kiểu retrofit một đầu, có kích thước tương thích với bóng huỳnh quang tuýp tiêu chuẩn",
    "Đối với hệ thống thông minh, trước tiên phân vùng bố trí, sau đó xây dựng mạng Bluetooth Mesh, hoàn tất việc ghép nối, vận hành thử và thiết lập kịch bản qua ứng dụng di động, có hỗ trợ công tắc tường không dây không cần pin",
    "Khi hoàn tất, thực hiện nghiệm thu chiếu sáng theo tiêu chuẩn kỹ thuật: kiểm tra độ rọi (Lux), chỉ số chói (UGR), độ đồng đều và tính nhất quán của nhiệt độ màu, đồng thời lưu trữ các thông số vận hành thử",
  ],
  certifications: [
    "Dấu CE — tuân thủ Chỉ thị Điện áp thấp (LVD) và Chỉ thị Tương thích điện từ (EMC) của EU, đáp ứng các tiêu chuẩn an toàn chiếu sáng như EN 60598-1",
    "Chứng nhận bắt buộc CCC của Trung Quốc (áp dụng cho các mẫu bán tại Trung Quốc), đáp ứng các yêu cầu an toàn điện trong nước",
    "Chứng nhận hiệu quả năng lượng — thiết kế hiệu suất cao đáp ứng các yêu cầu về nhãn năng lượng / cấp năng lượng, hỗ trợ tiết kiệm năng lượng cho công trình và các mục tiêu phát thải ròng bằng không",
    "An toàn quang sinh học — được đánh giá theo IEC/EN 62471 về các nguy cơ như ánh sáng xanh; độ nhấp nháy thấp và êm dịu cho mắt trong môi trường văn phòng và giáo dục",
    "Bảo hành nhà máy — tùy theo dòng sản phẩm, OptiClip TERRA cung cấp bảo hành 5 năm, và các dòng chuyên nghiệp nhìn chung đi kèm cam kết bảo hành dài hạn",
  ],
  packaging: [
    { label: "Hình thức cung cấp", value: "Cung cấp theo dự án hoặc theo dòng sản phẩm, hỗ trợ các gói trọn gói chìa khóa trao tay bao gồm đèn + điều khiển thông minh + dịch vụ" },
    { label: "Đóng gói", value: "Đóng gói riêng trong thùng carton của nhà máy với mút xốp / góc bảo vệ; đèn được giao kèm bộ nguồn tương thích, và các đơn hàng dự án số lượng lớn được bọc màng co trên pallet" },
    { label: "Thời gian giao hàng", value: "Các mẫu tiêu chuẩn được lưu kho để xuất hàng nhanh; hàng sản xuất tại châu Âu và cấu hình theo yêu cầu được thương lượng theo từng đơn (tham chiếu tiến độ dự án)" },
    { label: "Bảo hành", value: "Tùy theo dòng sản phẩm; đèn chuyên nghiệp nhìn chung đi kèm bảo hành dài hạn (ví dụ OptiClip TERRA bảo hành 5 năm)" },
    { label: "Dịch vụ gia tăng", value: "Bao gồm 360 Services và nền tảng số SylSmart, bao quát đánh giá, triển khai, quản lý và hỗ trợ hậu mãi" },
  ],
  whyChoose: [
    { icon: "💡", title: "Hơn 120 năm di sản", desc: "Một trong những thương hiệu chiếu sáng lâu đời và được kính trọng nhất thế giới, biến ánh sáng thành một nghề chuyên môn kể từ năm 1901." },
    { icon: "🌍", title: "Hệ thống quốc tế", desc: "Feilo Sylvania Group trải rộng trên nhiều châu lục, kết hợp công nghệ chiếu sáng phương Tây với chuỗi cung ứng Trung Quốc để mang lại nguồn cung ổn định, đáng tin cậy." },
    { icon: "👁️", title: "Độ trung thực cao, không gây chói", desc: "Quang học cao cấp đưa UGR xuống dưới 19, trong khi CRI90+ tái hiện chính xác chất liệu và tông da, mang lại trải nghiệm nhìn dễ chịu, không mỏi mắt." },
    { icon: "🔗", title: "Hệ sinh thái hoàn chỉnh", desc: "Từ đèn LED đến điều khiển thông minh SylSmart, đèn khẩn cấp LiFeSafe và các giải pháp năng lượng Power, tất cả kết nối trong cùng một nơi." },
    { icon: "♻️", title: "Bền vững & ít carbon", desc: "Khung giấy của OptiClip TERRA có thể tái chế với lượng phát thải carbon giảm mạnh, giúp các công trình tiến gần hơn tới mục tiêu phát thải ròng bằng không." },
  ],
  projectShowcase: [
    "Tòa nhà văn phòng và thương mại — chiếu sáng độ trung thực cao, không gây chói cho văn phòng không gian mở, phòng họp, sảnh và khu bán lẻ",
    "Công nghiệp và logistics — nhà máy, kho bãi, trung tâm dữ liệu và sân thể thao, cùng các không gian lớn và môi trường khắt khe khác",
    "Bán lẻ, lưu trú và giáo dục — trưng bày cao cấp, không khí phòng khách sạn, và môi trường ánh sáng lành mạnh cho lớp học và thư viện",
    "Đô thị, khẩn cấp và năng lượng — chiếu sáng ngoài trời và công cộng, chiếu sáng khẩn cấp thoát hiểm, cùng các giải pháp lưu trữ điện mặt trời và giám sát năng lượng",
  ],
  faq: [
    { q: "Mối quan hệ giữa Sylvania và Feilo Sylvania là gì?", a: "SYLVANIA là thương hiệu chiếu sáng quốc tế được thành lập năm 1901; hiện nay thuộc về Feilo Sylvania Group, được hình thành sau khi sáp nhập với Shanghai Feilo Acoustics Group, kết hợp công nghệ chiếu sáng phương Tây với chuỗi cung ứng Trung Quốc." },
    { q: "Đèn có hiệu năng như thế nào về hoàn màu và kiểm soát chói?", a: "Các dòng chuyên nghiệp nhìn chung mang lại độ trung thực cao CRI90+ kết hợp với quang học kiểm soát chói, với UGR văn phòng điển hình dưới 19 và độ nhấp nháy thấp êm dịu cho mắt, phù hợp với môi trường văn phòng, giáo dục và trưng bày bán lẻ đòi hỏi tập trung thị giác trong thời gian dài." },
    { q: "Sylvania có cung cấp giải pháp chiếu sáng thông minh không?", a: "Có. Nền tảng SylSmart trải rộng từ Standalone, Connected, Connected Pro đến Energy, được xây dựng trên mạng không dây Bluetooth Mesh để điều khiển từ xa, lên lịch và phân tích năng lượng, bổ trợ thêm bằng các dịch vụ số 360 Services." },
    { q: "Tuổi thọ và bảo hành của đèn là bao nhiêu?", a: "Đèn LED nhìn chung có tuổi thọ định mức từ 50.000 giờ, với OptiClip TERRA đạt tới 100.000 giờ (L80B10) và được bảo hành 5 năm; tuổi thọ và bảo hành thực tế được xác định theo thông số kỹ thuật của dòng sản phẩm tương ứng." },
    { q: "Có hỗ trợ cung ứng và thi công tại Việt Nam không?", a: "Vui lòng liên hệ chuỗi cung ứng Huayuesc để được tư vấn lựa chọn, báo giá và tư vấn thi công chiếu sáng, cũng như phối hợp cung ứng sản phẩm và dịch vụ hậu mãi." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
