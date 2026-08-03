/**
 * Sofeyia (索菲亚 SOFEYIA) nội thất trọn gói — Siêu dữ liệu (metadata) cho nội
 * dung rich-text ở trang chi tiết sản phẩm. Khóa theo seriesOriginal (hạng mục).
 * Nguồn: catalogue chính bản quốc tế của SOFEYIA (2025.10). Thương hiệu nội thất
 * trọn gói với thiết kế đến từ Pháp và sản xuất tại Trung Quốc.
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
  "Cấp độ vật liệu nền thân thiện môi trường E0 / ENF —— lượng phát thải formaldehyde đạt và vượt tiêu chuẩn quốc gia, an tâm hơn trong nhà",
  "Phù hợp tiêu chuẩn quốc gia (GB) về nội thất tùy chỉnh / ván nhân tạo và nội thất gỗ",
  "Ngũ kim qua kiểm định độ bền đóng - mở —— bản lề, ray trượt trơn tru ổn định lâu dài",
  "Hệ thống quản lý chất lượng xây dựng theo tiêu chuẩn ISO 9001, kiểm soát toàn trình từ thiết kế - sản xuất - lắp đặt",
];
const MFG = [
  "Sofeyia —— thương hiệu nội thất trọn gói với thiết kế đến từ Pháp và sản xuất tại Trung Quốc (tủ quần áo, tủ bếp, cửa gỗ, tủ phòng tắm ...)",
  "Dây chuyền sản xuất linh hoạt số hóa, tùy chỉnh theo đơn —— mỗi người, mỗi nhà, mỗi phương án; ván cắt, dán cạnh, khoan lỗ theo bản vẽ",
  "Vật liệu nền thân thiện môi trường (cấp E0 / ENF) + ngũ kim nhập khẩu, cả nhà cùng tông cùng hệ, xuất xưởng đồng bộ từ nhà máy",
  "Chuỗi dịch vụ tích hợp «thiết kế → đo đạc → sản xuất → lắp đặt → hậu mãi», triển khai trọn nhà an tâm hơn",
];
const PACK = [
  { label: "Hình thức cung ứng", value: "Tùy chỉnh theo đơn, giao trọn bộ ván + ngũ kim + phụ kiện" },
  { label: "Tùy chỉnh", value: "Thiết kế riêng theo mặt bằng, luồng di chuyển và phong cách; tùy chọn màu sắc / ngũ kim / tạo hình" },
  { label: "Bảo vệ vận chuyển", value: "Ván đóng gói rời từng tấm, gia cố góc cạnh, ngũ kim đóng gói riêng, giảm va đập khi vận chuyển" },
  { label: "Dịch vụ", value: "Đo đạc tại nhà → sản xuất tại nhà máy → lắp đặt chuyên nghiệp → theo dõi hậu mãi" },
];
const INSTALL = [
  "Nhà thiết kế đến tận nơi đo đạc lại, kết hợp mặt bằng và nhu cầu để đưa ra phương án chi tiết và hình phối cảnh",
  "Sau khi chốt phương án, nhà máy cắt, dán cạnh, khoan lỗ theo đơn, ván được đánh số và giao trọn bộ",
  "Đội ngũ chuyên nghiệp đến lắp đặt, căn chỉnh độ cân bằng thân tủ, hiệu chỉnh bản lề và ray trượt",
  "Sau lắp đặt vệ sinh, nghiệm thu, hướng dẫn cách sử dụng và bảo dưỡng rồi bàn giao",
];
const CARE = [
  { title: "Vệ sinh hằng ngày", desc: "Lau theo chiều vân bằng khăn mềm ẩm, tránh vật cứng cào xước và chất tẩy axit - kiềm mạnh, giữ bề mặt sáng bóng." },
  { title: "Chống ẩm thông thoáng", desc: "Giữ phòng thông thoáng, tránh hơi nước và đọng nước kéo dài; thân tủ bếp / phòng tắm lưu ý lau khô kịp thời." },
  { title: "Bảo dưỡng ngũ kim", desc: "Định kỳ kiểm tra và hiệu chỉnh bản lề, ray trượt và tay nắm, giữ đóng - mở trơn tru, cánh tủ thẳng hàng." },
  { title: "Chịu lực hợp lý", desc: "Sử dụng mâm tầng và ngăn kéo đúng tải trọng khuyến nghị, đặt vật nặng gần hai bên thân tủ để kéo dài tuổi thọ." },
];
const FAQ = [
  { q: "Sofeyia là nội thất tùy chỉnh hay nội thất thành phẩm?", a: "Là nội thất trọn gói toàn nhà theo đơn —— thiết kế và sản xuất riêng theo mặt bằng, luồng di chuyển và phong cách; tủ quần áo, tủ bếp, cửa gỗ, tủ phòng tắm có thể thống nhất cả nhà, không phải hàng thành phẩm tiêu chuẩn." },
  { q: "Ván có thân thiện môi trường không?", a: "Sử dụng vật liệu nền thân thiện môi trường cấp E0 / ENF, lượng phát thải formaldehyde đạt và vượt tiêu chuẩn quốc gia; có thể cung cấp tài liệu về tính thân thiện môi trường của ván tương ứng theo từng dự án." },
  { q: "Có thể thống nhất phong cách cả nhà không?", a: "Có thể. Đây chính là cốt lõi của «nội thất trọn gói» Sofeyia —— tủ quần áo, tủ bếp, tủ phòng khách - phòng ăn, cửa gỗ và tủ phòng tắm có thể cùng tông cùng hệ, hòa hợp xuyên suốt." },
  { q: "Tại Việt Nam có cung cấp thiết kế và lắp đặt không?", a: "Vui lòng liên hệ Huayue để được tư vấn phương án thiết kế, đo đạc, cung ứng và lắp đặt nội thất trọn gói phù hợp với dự án." },
];

function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}

const WHY_BRAND = { icon: "🏛️", title: "Thiết kế Pháp · Sản xuất Trung Quốc", desc: "Ngôn ngữ thiết kế đến từ Pháp + sản xuất linh hoạt tại Trung Quốc, khiến nội thất trọn gói cao cấp dễ tiếp cận hơn." };
const WHY_ONESTOP = { icon: "🧩", title: "Trọn nhà một điểm dừng", desc: "Tủ quần áo, tủ bếp, cửa gỗ, tủ phòng tắm cùng tông cùng hệ, một ngôn ngữ thiết kế xuyên suốt cả nhà." };
const WHY_ECO = { icon: "🌿", title: "Vật liệu nền thân thiện môi trường", desc: "Vật liệu nền cấp E0 / ENF, lượng phát thải formaldehyde vượt tiêu chuẩn quốc gia, an tâm hơn trong nhà." };

export const SOFEYIA_SERIES_META: Record<string, SeriesMeta> = {
  "whole-home": mk({
    story:
      "Nội thất trọn gói Sofeyia xem «cả ngôi nhà» như một tác phẩm để thiết kế —— từ sảnh vào, phòng khách - phòng ăn đến phòng ngủ, nhà bếp và phòng tắm, tủ quần áo, tủ bếp, cửa gỗ, tủ phòng tắm được hợp nhất trong cùng một ngôn ngữ thiết kế, màu sắc, ngũ kim và vân gỗ hô ứng xuyên suốt, không còn là sự chắp vá rời rạc từng món. Tỷ lệ thanh lịch đến từ Pháp và đường nét tối giản hiện đại đưa nét cao cấp vào từng chi tiết thường nhật; các dòng thiết kế cấp thành phẩm (như Salon Gathering, Evening Dress) có thể triển khai trực tiếp cho cả nhà, bỏ qua nỗi phiền phối hợp lặp đi lặp lại. Quy trình thiết kế - đo đạc - sản xuất - lắp đặt một điểm dừng giúp «ngôi nhà mơ ước» đi từ hình phối cảnh đến hiện thực ít vòng vo hơn.",
    heritage:
      "Nội thất trọn gói là năng lực cốt lõi của Sofeyia —— với sản xuất linh hoạt «mỗi người, mỗi nhà, mỗi phương án», kết hợp thiết kế kiểu Pháp với chế tạo thông minh của Trung Quốc, phục vụ những gia đình theo đuổi sự đồng nhất tổng thể và chất lượng cao.",
    technicalSpecs: [
      { label: "Loại", value: "Nội thất trọn gói toàn nhà (giải pháp một điểm dừng)" },
      { label: "Hạng mục bao phủ", value: "Tủ quần áo · Tủ bếp · Tủ phòng khách - phòng ăn · Cửa gỗ · Tủ phòng tắm" },
      { label: "Dòng thiết kế", value: "Salon Gathering / Evening Dress / Michelin và nhiều dòng khác" },
      { label: "Vật liệu nền", value: "Vật liệu nền thân thiện môi trường cấp E0 / ENF + ngũ kim nhập khẩu" },
      { label: "Phong cách", value: "Thanh lịch kiểu Pháp · Tối giản hiện đại · Sang trọng tĩnh lặng" },
      { label: "Dịch vụ", value: "Tích hợp thiết kế → đo đạc → sản xuất → lắp đặt → hậu mãi" },
    ],
    whyChoose: [WHY_BRAND, WHY_ONESTOP, WHY_ECO, { icon: "📐", title: "Tùy chỉnh theo nhu cầu", desc: "Thiết kế chi tiết theo mặt bằng và luồng di chuyển, tận dụng không gian đầy đủ hơn." }],
    projectShowcase: ["Hoàn thiện nội thất nhà mới và nâng cấp căn hộ hoàn thiện", "Trọn nhà cho nhà ở và biệt thự cao cấp", "Nhà mẫu và dự án của nhà thiết kế"],
  }),
  wardrobe: mk({
    story:
      "Tủ quần áo tùy chỉnh và phòng thay đồ Sofeyia ra đời vì «trật tự và nghi thức của trang phục» —— tiêu biểu là dòng Evening Dress, thân tủ kịch trần tận dụng chiều cao đến tối đa, phòng thay đồ góc, ngăn kéo bàn đảo và tủ trưng bày cửa kính giúp mỗi món đồ về đúng vị trí. Đèn mâm tầng dịu sáng tự bật khi lấy cất, khu xếp gấp, khu treo, ngăn kéo và ô đựng phụ kiện phân khu rõ ràng; vân gỗ tinh tế và màu mờ mịn phối tay nắm kim loại biến việc thay đồ thành một nghi thức tinh tế mỗi ngày.",
    heritage:
      "Lưu trữ trang phục là hạng mục khởi nghiệp và thể hiện rõ tay nghề nhất của Sofeyia —— với công thái học và logic phân khu lưu trữ, khiến phòng thay đồ vừa chứa được nhiều, vừa lấy thuận tay, vừa đẹp mắt.",
    technicalSpecs: [
      { label: "Loại", value: "Tủ quần áo tùy chỉnh / Phòng thay đồ kiểu walk-in" },
      { label: "Dòng tiêu biểu", value: "Evening Dress và các dòng khác" },
      { label: "Cấu hình", value: "Thân tủ kịch trần · Phòng thay đồ góc · Ngăn kéo bàn đảo · Cửa kính trưng bày · Đèn mâm tầng dịu sáng" },
      { label: "Bề mặt", value: "Vân gỗ tinh tế / màu mờ mịn + tay nắm kim loại" },
      { label: "Vật liệu nền", value: "Vật liệu nền thân thiện môi trường cấp E0 / ENF" },
      { label: "Phù hợp", value: "Phòng ngủ chính, phòng ngủ phụ, phòng trẻ em, phòng thay đồ độc lập" },
    ],
    whyChoose: [WHY_BRAND, { icon: "👗", title: "Phân khu lưu trữ", desc: "Khu treo/xếp gấp/ngăn kéo/phụ kiện phân khu rõ ràng, lấy cất thuận tay hơn." }, { icon: "💡", title: "Đèn mâm tầng dịu sáng", desc: "Tự bật khi lấy cất, tủ sâu cũng nhìn rõ một lần là thấy." }, WHY_ECO],
    projectShowcase: ["Tủ quần áo kịch trần phòng ngủ chính", "Phòng thay đồ walk-in độc lập", "Lưu trữ phòng trẻ em và phòng ngủ phụ"],
  }),
  kitchen: mk({
    story:
      "Tủ bếp tùy chỉnh Sofeyia nâng cấp căn bếp từ «nơi nấu ăn» thành «sân khấu giao tiếp» —— dòng Party và Michelin tái cấu trúc luồng di chuyển bằng bàn đảo, bếp Á - Âu tách riêng và tủ cao đựng thiết bị điện, rửa - cắt - xào - chuẩn bị liền mạch. Vân gỗ va chạm cùng mặt panel mờ tạo cảm giác ấm áp cao cấp, mặt bàn liền mạch dễ vệ sinh, kháng bẩn bền bỉ, thiết bị âm tủ khiến mặt đứng gọn gàng. Hơi ấm của mâm cơm ngon và một không gian đãi khách chỉn chu hợp làm một tại đây.",
    heritage:
      "Tủ bếp là mắt xích then chốt trong nội thất trọn gói của Sofeyia —— với luồng di chuyển hợp lý và lưu trữ hợp nhất, biến căn bếp dùng tần suất cao thành nơi vừa tiện dụng vừa bền đẹp.",
    technicalSpecs: [
      { label: "Loại", value: "Tủ bếp tùy chỉnh (bếp trọn bộ)" },
      { label: "Dòng tiêu biểu", value: "Party / Michelin và các dòng khác" },
      { label: "Bố cục", value: "Chữ I / chữ L / bàn đảo / bếp Á - Âu tách riêng" },
      { label: "Cấu hình", value: "Thiết bị âm tủ · Tủ cao đựng thiết bị điện · Mặt bàn liền mạch · Giỏ kéo lưu trữ" },
      { label: "Bề mặt", value: "Phối màu cao cấp vân gỗ × panel mờ" },
      { label: "Phù hợp", value: "Bếp mở, bếp Á - Âu, căn hộ và biệt thự" },
    ],
    whyChoose: [WHY_BRAND, { icon: "🍳", title: "Luồng di chuyển thuận tay", desc: "Phân khu rửa cắt xào chuẩn bị hợp lý, bàn đảo mở rộng không gian thao tác và giao tiếp." }, { icon: "🧽", title: "Dễ vệ sinh bền bỉ", desc: "Mặt bàn liền mạch kháng bẩn chống mài mòn, chăm sóc hằng ngày nhàn tênh." }, WHY_ECO],
    projectShowcase: ["Bếp Á - Âu mở", "Bếp giao tiếp có bàn đảo", "Bếp trọn bộ căn hộ và biệt thự"],
  }),
  cabinet: mk({
    story:
      "Tủ phòng ăn và tủ rượu Sofeyia dành riêng một «góc lãng mạn ngà ngà nổi bật» cho ngôi nhà —— dòng Vacation thiết kế hợp nhất ô đựng rượu kịch trần, tủ rượu kính giữ nhiệt và quầy bar bàn đảo, gộp lưu trữ phòng ăn với thưởng rượu đãi khách làm một. Đường nét kim loại phác họa bề mặt tông tối, lưu trữ ẩn giấu đồ lặt vặt vào vô hình, bật đèn lên là một bức tường bình thường trở thành sân khấu của tiếp khách và nhâm nhi.",
    heritage:
      "Tủ phòng ăn và tủ rượu là hạng mục điểm nhấn giúp Sofeyia nâng tầm «nghi thức của cuộc sống» —— vừa giải quyết lưu trữ phòng ăn, vừa mang giá trị cảm xúc của tiếp khách và thưởng rượu.",
    technicalSpecs: [
      { label: "Loại", value: "Tủ phòng ăn / Tủ rượu / Tủ quầy bar" },
      { label: "Dòng tiêu biểu", value: "Vacation và các dòng khác" },
      { label: "Cấu hình", value: "Ô đựng rượu kịch trần · Cửa kính trưng bày · Lưu trữ ẩn · Quầy bar bàn đảo" },
      { label: "Bề mặt", value: "Vân gỗ tông tối / kính + đường nét kim loại" },
      { label: "Vật liệu nền", value: "Vật liệu nền thân thiện môi trường cấp E0 / ENF" },
      { label: "Phù hợp", value: "Phòng ăn, quầy bar gia đình, khu đãi khách và thưởng rượu" },
    ],
    whyChoose: [WHY_BRAND, { icon: "🍷", title: "Thưởng rượu đãi khách", desc: "Ô đựng rượu + tủ rượu kính + quầy bar, phòng ăn lập tức thành sân khấu giao tiếp." }, { icon: "🗄️", title: "Lưu trữ ẩn", desc: "Đồ lặt vặt giấu vào vô hình, mặt đứng luôn thoáng đãng chỉn chu." }, WHY_ONESTOP],
    projectShowcase: ["Tường lưu trữ tủ phòng ăn", "Quầy bar gia đình và góc hầm rượu", "Không gian đãi khách và thưởng rượu"],
  }),
  living: mk({
    story:
      "Tùy chỉnh phòng khách Sofeyia định nghĩa lại phòng khách bằng một mặt «tường biết thở» —— dòng Leisurely Duke gộp phông nền tivi, kệ sách, ô trưng bày và lưu trữ ẩn thành một mặt đứng hoàn chỉnh, dây cáp nghe nhìn và đồ lặt vặt đều được thu vào vô hình. Tông gỗ ấm áp phối nội thất mềm màu be hạnh nhân giúp phòng khách tìm được điểm cân bằng giữa bề thế và thong dong, vừa là trung tâm sum họp của gia đình, vừa là ô cửa khoe gu thẩm mỹ.",
    heritage:
      "Tùy chỉnh phòng khách là tiêu biểu cho việc Sofeyia thăng hoa «lưu trữ» thành «thiết kế mặt đứng» —— khiến tường tivi không còn đơn điệu mà trở thành điểm neo thị giác cho phong cách cả nhà.",
    technicalSpecs: [
      { label: "Loại", value: "Tùy chỉnh phòng khách (kệ tivi / lưu trữ trọn tường)" },
      { label: "Dòng tiêu biểu", value: "Leisurely Duke và các dòng khác" },
      { label: "Cấu hình", value: "Tường nền tivi · Kệ sách - ô trưng bày · Lưu trữ ẩn · Tích hợp nghe nhìn" },
      { label: "Phong cách", value: "Tông gỗ ấm áp · sang trọng nhẹ màu be hạnh nhân" },
      { label: "Vật liệu nền", value: "Vật liệu nền thân thiện môi trường cấp E0 / ENF" },
      { label: "Phù hợp", value: "Tường tivi phòng khách, phòng đọc sách, phòng tiếp khách" },
    ],
    whyChoose: [WHY_BRAND, { icon: "📺", title: "Tường tivi hợp nhất", desc: "Tường nền + lưu trữ + tích hợp nghe nhìn, mặt đứng hoàn chỉnh bề thế." }, { icon: "📚", title: "Trưng bày và lưu trữ", desc: "Vừa có kệ sách - ô trưng bày vừa có lưu trữ ẩn, phòng khách thêm phong cách." }, WHY_ONESTOP],
    projectShowcase: ["Tường nền tivi phòng khách", "Phòng đọc sách và phòng tiếp khách", "Mặt đứng lưu trữ trọn tường"],
  }),
  master: mk({
    story:
      "Tùy chỉnh phòng ngủ chính Sofeyia nâng cấp phòng ngủ thành «suite kiểu khách sạn» —— dòng Fayven Master quy hoạch thống nhất tường nền đầu giường, thân giường, tủ đầu giường và lưu trữ trang phục, tường nền bọc êm và dải đèn ẩn tạo bầu không khí tĩnh lặng, khu ngủ và khu thay đồ phân tách mà không cách biệt. Từ một mặt tường nền đến cả căn suite, kín đáo, thong dong và đầy nghi thức, khiến mỗi lần ngủ và thức dậy đều được nâng niu dịu dàng.",
    heritage:
      "Tùy chỉnh phòng ngủ chính là hạng mục nâng cao giúp Sofeyia biến «phòng ngủ» thành «trải nghiệm suite» —— thống nhất giấc ngủ, lưu trữ và bầu không khí bằng thiết kế hợp nhất.",
    technicalSpecs: [
      { label: "Loại", value: "Tùy chỉnh phòng ngủ chính (tường nền + thân giường + lưu trữ)" },
      { label: "Dòng tiêu biểu", value: "Fayven Master và các dòng khác" },
      { label: "Cấu hình", value: "Tường nền bọc êm · Dải đèn ẩn · Tủ quần áo kịch trần · Tủ đầu giường" },
      { label: "Phong cách", value: "Kiểu khách sạn · sang trọng tĩnh lặng" },
      { label: "Vật liệu nền", value: "Vật liệu nền thân thiện môi trường cấp E0 / ENF" },
      { label: "Phù hợp", value: "Suite phòng ngủ chính, phòng ngủ căn hộ cao cấp, phòng homestay" },
    ],
    whyChoose: [WHY_BRAND, { icon: "🛏️", title: "Trải nghiệm suite", desc: "Tường nền+thân giường+lưu trữ hợp nhất, triển khai phòng ngủ chính kiểu khách sạn." }, { icon: "🌙", title: "Bầu không khí tĩnh lặng", desc: "Dải đèn ẩn và tường nền bọc êm, tạo bầu không khí an giấc." }, WHY_ONESTOP],
    projectShowcase: ["Suite phòng ngủ chính kiểu khách sạn", "Phòng ngủ căn hộ và biệt thự cao cấp", "Phòng homestay tinh tế"],
  }),
  door: mk({
    story:
      "Cửa gỗ nội thất Sofeyia khiến «cửa» cũng trở thành một phần của thiết kế cả nhà —— bộ cửa gỗ trọn bộ cùng tông cùng hệ với thân tủ, nhiều lựa chọn cửa phẳng, cửa tạo hình và đường nét tối giản, khung cửa, tấm ốp tường và thân tủ hòa hợp xuyên suốt về màu sắc và chất cảm, từ biệt cảm giác rời rạc mỗi thứ lắp một kiểu. Bộ khóa êm và lõi cửa ổn định vừa giữ chất lượng vừa bền bỉ, đóng - mở chính là sự tiếp nối chỉn chu của phong cách cả nhà.",
    heritage:
      "Cửa gỗ trọn bộ là mảnh ghép quan trọng cho triết lý «cả nhà cùng tông cùng hệ» của Sofeyia —— đưa chiếc cửa thường bị bỏ quên vào ngôn ngữ thiết kế tổng thể.",
    technicalSpecs: [
      { label: "Loại", value: "Cửa nội thất / Cửa gỗ (trọn bộ)" },
      { label: "Kiểu dáng", value: "Cửa phẳng / cửa tạo hình / cửa đường nét tối giản" },
      { label: "Phối hợp", value: "Cùng tông cùng hệ với nội thất trọn gói, hòa hợp khung cửa + tấm ốp tường" },
      { label: "Cấu hình", value: "Bộ khóa êm · Lõi cửa ổn định" },
      { label: "Vật liệu nền", value: "Vật liệu nền lõi cửa thân thiện môi trường" },
      { label: "Phù hợp", value: "Phòng ngủ, phòng đọc sách, cửa gỗ trọn bộ cho hoàn thiện nội thất" },
    ],
    whyChoose: [WHY_BRAND, WHY_ONESTOP, { icon: "🔇", title: "Êm ái ổn định", desc: "Bộ khóa êm và lõi cửa ổn định, vừa có chất lượng vừa bền bỉ." }, WHY_ECO],
    projectShowcase: ["Cửa gỗ trọn bộ phòng ngủ và phòng đọc sách", "Công trình cửa nội thất hoàn thiện trọn gói", "Cửa nội thất nhà ở cao cấp"],
  }),
  vanity: mk({
    story:
      "Tủ phòng tắm Sofeyia mở rộng «cả nhà cùng hệ» đến không gian phòng tắm —— các dòng như NINI dùng vật liệu nền chống ẩm và chậu rửa liền khối bằng sứ/đá nung kết để tạo nên phòng tắm hiện đại: thân tủ treo tường giúp sàn dễ vệ sinh hơn, tủ gương thông minh và tháp lưu trữ bên cạnh kết hợp linh hoạt, đèn gương dịu sáng và tay nắm kim loại nâng tầm tinh tế. Vẫn ổn định và bền bỉ trong môi trường ẩm ướt, khiến phòng tắm cũng sở hữu chất cảm cao cấp đồng nhất với cả nhà.",
    heritage:
      "Tủ phòng tắm giúp nội thất trọn gói của Sofeyia bao phủ đến không gian cuối cùng —— mang tính thẩm mỹ và độ bền vào phòng tắm bằng công nghệ chống ẩm.",
    technicalSpecs: [
      { label: "Loại", value: "Tủ phòng tắm (tùy chỉnh thiết bị vệ sinh)" },
      { label: "Dòng tiêu biểu", value: "NINI và các dòng khác" },
      { label: "Cấu hình", value: "Thân tủ treo tường · Chậu rửa liền khối bằng sứ/đá nung kết · Tủ gương thông minh · Tháp lưu trữ bên cạnh" },
      { label: "Vật liệu nền", value: "Vật liệu nền chống ẩm, thích ứng môi trường ẩm ướt" },
      { label: "Bề mặt", value: "Đèn gương dịu sáng + tay nắm kim loại" },
      { label: "Phù hợp", value: "Phòng tắm chính, phòng tắm khách, phòng tắm nhà ở cao cấp" },
    ],
    whyChoose: [WHY_BRAND, { icon: "🚿", title: "Chống ẩm bền bỉ", desc: "Vật liệu nền chống ẩm thân tủ treo tường, vẫn ổn định trong môi trường ẩm ướt." }, { icon: "🪞", title: "Tủ gương thông minh", desc: "Tủ gương + tháp lưu trữ + đèn gương dịu sáng, vừa tinh tế vừa thiết thực." }, WHY_ONESTOP],
    projectShowcase: ["Tủ phòng tắm chính và phòng tắm khách", "Lưu trữ thiết bị vệ sinh kiểu treo tường", "Phòng tắm nhà ở cao cấp"],
  }),
};

/** Lấy metadata theo seriesOriginal, mặc định quay về whole-home. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return SOFEYIA_SERIES_META[seriesOriginal.trim()] || SOFEYIA_SERIES_META["whole-home"];
}
