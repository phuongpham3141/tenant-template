/**
 * Metadata Zhongju Yabai (Guangdong Zhongju Yabai Building Materials Technology) — general metadata.
 * Source: gdzjyb.com. Manufacturer of inorganic pre-coated boards / fire-and-water board / clean board / wall cladding, based in Sanshui, Foshan, Guangdong.
 * Rich content: covers all four product lines — fire-and-water board (wood grain), clean board (medical-grade solid colors), wall cladding (pastel multi-color), and inorganic fireproof pre-coated board.
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
    "Zhongju Yabai (Guangdong Zhongju Yabai Building Materials Technology) đã viết hai kẻ thù không đội trời chung — lửa và nước — vào cùng một tấm panel, và đó cũng chính là nguồn gốc tên gọi của dòng sản phẩm chủ lực: Tấm Chống cháy-Chống nước. Được tạo thành và phủ bề mặt từ khoáng chất vô cơ, tấm panel không chứa một chút vật liệu hữu cơ dễ cháy nào từ lõi đến bề mặt. Sản phẩm không bốc cháy, không nóng chảy, không nhỏ giọt khi tiếp xúc trực tiếp với ngọn lửa, nhưng vẫn thở đều giữa những hành lang ẩm thấp và khu vực nhà vệ sinh mà không bao giờ bị mốc hay hút ẩm. Dải sản phẩm trải dài từ Tấm Chống cháy-Chống nước vân gỗ chân thực, tấm sạch màu trơn đạt chuẩn y tế, tấm ốp tường pastel mềm mại, đến tấm phủ sẵn chống cháy vô cơ — bao phủ mọi bề mặt tường từ phòng mổ đến hành lang trường học. Trên các dây chuyền sản xuất tự động hóa tại Sanshui, Foshan, hoạt động R&D, sản xuất và bán hàng được tích hợp hoàn chỉnh, nhờ đó khả năng chống cháy loại A cộng với không phát thải formaldehyde cộng với kháng khuẩn không còn là vật trưng bày trong phòng thí nghiệm mà đã trở thành hiện thực hằng ngày trên những bức tường có độ sạch cao của các dự án như Qingdao University Affiliated Hospital và Huaxin Hospital. Khi một bức tường phải vừa vượt qua kiểm tra phòng cháy chữa cháy, vừa chịu được việc lau khử trùng mỗi ngày, câu trả lời của Zhongju Yabai là biến sự an tâm thành một tấm khoáng vô cơ mà bạn có thể gắn lên tường.",
  heritage:
    "Tọa lạc tại Quận Sanshui của Foshan, Quảng Đông, công ty là nhà sản xuất chuyên biệt về tấm phủ sẵn vô cơ, tích hợp R&D, sản xuất và bán hàng, được hậu thuẫn bởi đội ngũ kỹ thuật giàu kinh nghiệm cùng các dây chuyền sản xuất tự động hóa. Với đặc tính hoàn toàn vô cơ — chống cháy loại A, kháng ẩm và chống mốc, hiệu năng kháng khuẩn và phát thải formaldehyde bằng không — sản phẩm đã được triển khai quy mô lớn tại các dự án y tế độ sạch cao như Qingdao University Affiliated Hospital và Huaxin Hospital, trở thành vật liệu hoàn thiện được ưa chuộng cho phòng sạch và không gian chăm sóc sức khỏe.",
  technicalSpecs: [
    { label: "Vật liệu", value: "Tấm khoáng vô cơ phủ sẵn; cả lớp bề mặt và lõi đều là vô cơ (tấm chống cháy-chống nước / tấm sạch / tấm ốp tường / tấm phủ sẵn chống cháy)" },
    { label: "Kích thước", value: "Định dạng tấm tường và tấm trần tiêu chuẩn, được cắt và tùy chỉnh theo kích thước vách ngăn, hành lang và trần của dự án" },
    { label: "Độ dày", value: "Nhiều độ dày tấm theo từng dòng sản phẩm, phù hợp với yêu cầu kết cấu của vách ngăn, ốp tường và trần" },
    { label: "Cấp chống cháy", value: "Loại A không cháy (GB 8624 loại A); không bốc cháy, không nóng chảy, không nhỏ giọt trong đám cháy, phát thải khói thấp" },
    { label: "Bề mặt", value: "Vân gỗ tông sáng, màu trơn mờ và đa sắc pastel (be / xanh lá / xám / xanh dương / hồng / trắng) với hoàn thiện mịn, dễ lau chùi" },
    { label: "Ứng dụng", value: "Bệnh viện và phòng sạch, phòng mổ, phòng thí nghiệm, trường học, khách sạn, tòa nhà văn phòng và trần hành lang công cộng" },
  ],
  manufacturing: [
    "Guangdong Zhongju Yabai Building Materials Technology — đặt trụ sở tại Quận Sanshui của Foshan, Quảng Đông, tích hợp R&D, sản xuất và bán hàng",
    "Quy trình tấm phủ sẵn vô cơ: cả lớp bề mặt và lõi đều dùng vật liệu khoáng vô cơ không có thành phần hữu cơ dễ cháy, đạt khả năng không cháy loại A ngay từ gốc",
    "Bề mặt hoàn toàn vô cơ, đặc chắc khiến vi khuẩn không có gì để bám và không có chỗ để tồn tại, mang lại hiệu năng kháng khuẩn sạch đạt chuẩn y tế",
    "Hoàn thiện phủ sẵn một lần chạy: vân gỗ, màu trơn và đa sắc pastel đều được hoàn tất ngay trên dây chuyền, với màu sắc đồng đều và tính nhất quán giữa các lô",
    "Dây chuyền sản xuất tự động hóa kết hợp đội ngũ kỹ thuật giàu kinh nghiệm cho phép giao hàng số lượng lớn đáp ứng yêu cầu của các dự án bệnh viện, phòng sạch và tương tự",
  ],
  careGuide: [
    { title: "Vệ sinh thường nhật", desc: "Bề mặt vô cơ đặc chắc kháng bẩn và dễ lau sạch; một chiếc khăn ẩm đã vắt khô là đủ loại bỏ các vết bẩn thường ngày, không cần dùng chất tẩy rửa có tính axit hay kiềm mạnh." },
    { title: "Khử trùng y tế", desc: "Chịu được việc lau và xịt khử trùng lặp đi lặp lại bằng các chất khử trùng tiêu chuẩn của bệnh viện và phòng sạch; bề mặt không phai màu, không bong tróc, không mất đi độ sạch lâu dài." },
    { title: "Kháng ẩm và chống mốc", desc: "Nền khoáng vốn không hút ẩm và chống mốc, giữ cho bề mặt khô ráo và sạch sẽ về lâu dài ngay cả ở những hành lang ẩm thấp và khu vực nhà vệ sinh." },
    { title: "Lưu kho và vận chuyển", desc: "Bảo quản nằm phẳng nơi khô ráo; bảo vệ góc và cạnh của tấm trong quá trình lưu kho và vận chuyển để tránh va đập và hư hại do ẩm." },
  ],
  installation: [
    "Xác định vị trí và bố cục hoàn thiện: tường trong và ngoài, vách ngăn, trần, hành lang và tường phòng sạch; bố trí trước để tối ưu mạch nối và việc sử dụng vật liệu",
    "Lắp lên khung thép định hình nhẹ hoặc nền kết cấu, cố định bằng keo và phụ kiện chuyên dụng cho tấm vô cơ để đảm bảo bề mặt tấm phẳng và chắc chắn",
    "Xử lý cẩn thận mạch nối và các góc trong/ngoài để giữ bề mặt phẳng và kín khít, đồng thời duy trì hiệu năng chống cháy loại A tổng thể",
    "Trong môi trường phòng sạch/bệnh viện, làm kín và hoàn thiện cạnh theo yêu cầu vệ sinh, giữ mạch nối mịn màng không có góc chết bám bẩn để dễ lau khử trùng",
    "Sau khi lắp đặt, vệ sinh các bức tường, kiểm tra độ phẳng và độ kín của mạch nối, và bàn giao dự án khi các tiêu chí phòng cháy và độ sạch vượt qua kiểm tra",
  ],
  certifications: [
    "Vật liệu trang trí không cháy loại A (GB 8624 loại A) — không bốc cháy, không nóng chảy, không nhỏ giọt trong đám cháy, phát thải khói thấp",
    "Phát thải formaldehyde bằng không — đáp ứng yêu cầu chất lượng không khí trong nhà cho môi trường chăm sóc sức khỏe và phòng sạch",
    "Bề mặt kháng khuẩn — vi khuẩn không thể bám hay tồn tại, phù hợp cho phòng mổ, phòng thí nghiệm và phòng sạch",
    "Kháng ẩm và chống mốc — nền vô cơ không hút ẩm hay mọc mốc, thích hợp cho môi trường độ ẩm cao và độ vệ sinh cao",
    "Nền vô cơ xanh, thân thiện môi trường — công thức hoàn toàn vô cơ không có ô nhiễm bay hơi hữu cơ",
  ],
  packaging: [
    { label: "Phương thức cung ứng", value: "Giao theo tấm / kích thước phù hợp với dự án; có thể cung ứng trọn lô theo bảng kê vật liệu của dự án" },
    { label: "Tùy chọn bề mặt", value: "Có sẵn vân gỗ tông sáng, màu trơn và đa sắc pastel (be / xanh lá / xám / xanh dương / hồng / trắng)" },
    { label: "Phạm vi ứng dụng", value: "Tường trong và ngoài, vách ngăn, ốp tường, trần và hoàn thiện phòng sạch" },
    { label: "Bảo vệ", value: "Màng bảo vệ trên mặt tấm, nẹp bảo vệ góc cạnh, vận chuyển nằm phẳng và khô ráo để tránh va đập và ẩm" },
    { label: "Mẫu", value: "Có sẵn bảng màu và tấm mẫu để xác nhận hoa văn và cảm giác bề mặt trước khi đặt hàng số lượng lớn cho dự án" },
  ],
  whyChoose: [
    { icon: "🔥", title: "Không cháy loại A", desc: "Công thức khoáng hoàn toàn vô cơ không bốc cháy, không nóng chảy, không nhỏ giọt trong đám cháy, phát thải khói thấp — một lớp bảo vệ an toàn cho việc tuân thủ phòng cháy của dự án." },
    { icon: "🏥", title: "Sạch đạt chuẩn y tế", desc: "Kháng khuẩn và không formaldehyde, đã được dùng tại nhiều bệnh viện hàng đầu, đáp ứng tiêu chuẩn vệ sinh của phòng mổ và phòng sạch." },
    { icon: "💧", title: "Kháng ẩm và chống mốc", desc: "Nền khoáng không hút ẩm hay mọc mốc, giữ cho ngay cả những hành lang ẩm thấp và khu vực nhà vệ sinh luôn sạch sẽ và khô ráo về lâu dài." },
    { icon: "🎨", title: "Hoàn thiện đa sắc", desc: "Từ vân gỗ và màu trơn đến đa sắc pastel, luôn có một lựa chọn hoàn thiện cho mọi nhu cầu — ngay cả không gian sạch cũng có thể mang một bảng màu dịu nhẹ." },
    { icon: "🏭", title: "Trực tiếp từ nguồn", desc: "Dây chuyền sản xuất tự động hóa tại Sanshui, Foshan, với R&D, sản xuất và bán hàng tích hợp — các lô đồng nhất và thời gian giao dự án kiểm soát được." },
  ],
  projectShowcase: [
    "Tường và trần các cơ sở bệnh viện và chăm sóc sức khỏe, phòng mổ và phòng sạch",
    "Trường học, phòng thí nghiệm và không gian phòng sạch nghiên cứu",
    "Hoàn thiện nội thất cho khách sạn, căn hộ và tòa nhà văn phòng",
    "Các dự án hành lang công cộng, sảnh, trần và ốp tường",
  ],
  faq: [
    { q: "Tấm Chống cháy-Chống nước của Zhongju Yabai chính xác là gì?", a: "Đây là tấm trang trí phủ sẵn có lớp bề mặt và lõi đều là khoáng vô cơ — không cháy loại A, kháng ẩm và chống mốc, kháng khuẩn và không formaldehyde. Sản phẩm thường được làm với hoàn thiện vân gỗ tông sáng cho bề mặt tường và trần, cân bằng giữa an toàn cháy nổ và tính thẩm mỹ trang trí." },
    { q: "Sự khác biệt giữa tấm chống cháy-chống nước, tấm sạch, tấm ốp tường và tấm phủ sẵn chống cháy là gì?", a: "Tất cả đều thuộc dòng tấm phủ sẵn vô cơ của Zhongju Yabai: tấm chống cháy-chống nước chủ yếu là vân gỗ chân thực; tấm sạch thiên về màu trơn y tế và độ sạch cao; tấm ốp tường mang đến các tùy chọn đa sắc pastel như be, xanh lá, xám, xanh dương, hồng và trắng; còn tấm phủ sẵn chống cháy nhấn mạnh hoàn thiện không cháy loại A. Chúng có chung một lõi hiệu năng — chỉ cần chọn theo ứng dụng và diện mạo." },
    { q: "Vì sao bệnh viện và phòng sạch ưa chuộng sản phẩm này?", a: "Bởi vì nó đáp ứng đồng thời ba yêu cầu khắt khe: chống cháy loại A để vượt qua kiểm tra phòng cháy, không formaldehyde và hiệu năng kháng khuẩn để đạt tiêu chuẩn vệ sinh, cùng khả năng kháng ẩm và chống mốc để chịu được việc lau khử trùng lặp đi lặp lại. Sản phẩm đã được sử dụng quy mô lớn tại các dự án như Qingdao University Affiliated Hospital và Huaxin Hospital." },
    { q: "Có những màu sắc và họa tiết nào cho bề mặt?", a: "Các tùy chọn bao gồm vân gỗ tông sáng (vân sồi, vân gỗ tông ấm), màu trơn mờ và đa sắc pastel, với bảng màu trải dài từ be, xanh lá, xám, xanh dương, hồng và trắng để phù hợp với phong cách của không gian." },
    { q: "Zhongju Yabai có cung cấp cho Việt Nam không?", a: "Vui lòng liên hệ Huayuesc để được tư vấn. Chúng tôi có thể cung cấp tấm phủ sẵn vô cơ Zhongju Yabai cho các dự án y tế, giáo dục và công trình công cộng tại địa phương ở Việt Nam và hỗ trợ lựa chọn vật liệu." },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
