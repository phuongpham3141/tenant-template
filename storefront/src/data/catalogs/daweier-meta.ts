/**
 * Daweier series metadata — rich text for product detail pages.
 * Indexed by seriesOriginal (catKey): sink / basin / other (drawn/pressed sinks, etc.) / faucet / drain / accessory.
 * Source: daweier.cn — Kaiping Daweier Kitchen & Bath, Guangdong.
 * Core business: handcrafted stainless-steel sinks, nano-embossed sinks, undermount basins, kitchen faucets, anti-odor floor drains, and matching accessories.
 * Reference: Huayue Supply Chain — Daweier product documentation + standard process parameters for the stainless-steel kitchen & bath industry.
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

export const DAWEIER_SERIES_META: Record<string, SeriesMeta> = {
  sink: {
    story:
      "Chậu rửa bếp inox thủ công Daweier là điểm nhấn trung tâm của gian bếp — một tấm SUS304 nguyên khối được bàn tay người thợ gấp định hình. Khác với chậu dập liền một khối, sản phẩm được tạo hình bằng kỹ thuật hàn để đạt góc bo R10 sắc nét, gần như vuông vắn, mang lại lòng chậu gọn gàng, vuông vức và dung tích lớn hơn, đủ chỗ cho cả nồi to lẫn chồng bát xếp gọn bên trong. Thành lòng chậu gia cường 3.0mm, kết hợp lớp phủ nano dưới đáy và tấm tiêu âm dày, biến tiếng nước va đập ồn ã thành âm thanh êm ái, trầm lắng. Bề mặt được hoàn thiện bằng đánh xước thủ công hoặc dập nổi nano, nên dấu vân tay và vệt nước không còn là điểm gây chú ý — thay vào đó, lớp hoàn thiện càng dùng càng lên nước, sáng đẹp ấm áp theo thời gian. Với những gia đình xem trọng việc bếp núc, đây là không gian rửa và làm bếp vừa bền bỉ trước nhiệt độ vừa đẹp đúng tầm.",
    heritage:
      "Chậu rửa thủ công là dòng sản phẩm chủ lực đã giúp Daweier bám rễ tại Khai Bình suốt nhiều năm — chậu đơn và chậu đôi, mẫu thông dụng, cùng các thiết kế kiểu Mỹ và châu Âu xuất khẩu sang thị trường Hoa Kỳ và EU, đều có sẵn. Từ tấm phẳng đến lòng chậu vuông hoàn thiện, công đoạn hàn, mài và đánh bóng đều được thực hiện thủ công qua nhiều bước, kết tinh nhiều năm kinh nghiệm gia công OEM thành sự tự tin của một thương hiệu riêng.",
    technicalSpecs: [
      { label: "Chất liệu", value: "Inox SUS304 đạt chuẩn thực phẩm (tấm nguyên khối gia cường)" },
      { label: "Quy cách", value: "Chậu đơn / chậu đôi, bề rộng lòng chậu thông dụng 50–80cm, có thể tùy chỉnh" },
      { label: "Công nghệ", value: "Cấu trúc hàn thủ công, góc bo R10 sắc nét" },
      { label: "Bề mặt", value: "Đánh xước thủ công / dập nổi nano, kháng vân tay và dễ lau chùi" },
      { label: "Bán kính góc bo", value: "Góc bo R10 — dáng vuông vức, dung tích lớn, không đọng cặn bẩn ở các điểm chuyển tiếp" },
      { label: "Cấu hình", value: "Lớp phủ nano đáy chậu + tấm tiêu âm gia cường + bộ xả đường kính lớn" },
    ],
    manufacturing: [
      "Daweier (Khai Bình, Quảng Đông) — nhiều năm chuyên tâm vào chậu rửa inox thủ công, tự chủ toàn bộ từ cắt tấm đến hàn, mài và đánh bóng tại nhà máy",
      "Chế tạo từ một tấm SUS304 đạt chuẩn thực phẩm, thành lòng chậu gia cường đến 3.0mm và đường hàn được tinh chỉnh thủ công gần như vô hình",
      "Lòng chậu hoàn thiện bằng đánh xước hoặc dập nổi nano; đáy phun lớp phủ nano chống đọng sương và gắn tấm tiêu âm, chống rung",
      "Mỗi chậu được kiểm tra rò rỉ bằng nước riêng lẻ và soi xét toàn diện về ngoại quan — chỉ những sản phẩm kín nước, đạt chuẩn mới được nhập kho",
      "Hỗ trợ OEM / ODM: hình dáng lòng chậu, kích thước, phụ kiện và bao bì đều có thể tùy chỉnh theo bản vẽ của khách hàng, phù hợp đơn hàng dự án và xuất khẩu",
    ],
    careGuide: [
      { title: "Lau theo vân xước", desc: "Dùng khăn mềm hoặc miếng bọt biển với nước rửa chén trung tính và lau dọc theo vân xước. Tránh búi thép và các chất tẩy có tính axit hoặc kiềm mạnh vì có thể làm xước lớp hoàn thiện hoặc ăn mòn bề mặt." },
      { title: "Lau khô sau khi dùng", desc: "Lau sạch nước đọng bằng khăn khô sau mỗi lần sử dụng để tránh vệt nước và cặn vôi tích tụ trên lòng chậu. Đặc biệt ở khu vực nước cứng, giữ khô ráo giúp duy trì độ sáng bóng lâu hơn." },
      { title: "Ngừa lây gỉ sét", desc: "Không để các kim loại dễ gỉ như nồi sắt hay đinh nằm trong lòng chậu thời gian dài. Nếu xuất hiện vệt gỉ từ bên ngoài, hãy xử lý sớm bằng cách chà nhẹ với kem làm sạch inox." },
      { title: "Giữ thông thoáng bộ xả", desc: "Định kỳ tháo giỏ lọc để dọn cặn rác và kiểm tra xem vòng ron của bộ xả có bị lão hóa hay không, giúp thoát nước thông suốt và không bị mùi hôi trào ngược." },
    ],
    installation: [
      "Đánh dấu và cắt lỗ mặt bàn theo biên dạng chậu; chậu lắp âm cần chừa khoảng cách lắp đặt và xác nhận khả năng chịu tải của mặt bàn",
      "Với chậu lắp dương, bơm keo silicone dọc theo vành và ấn vào lỗ; với chậu lắp âm, cố định từ bên dưới bằng kẹp chuyên dụng và bơm lại keo chống thấm",
      "Lắp bộ xả và nối ống thoát nước, quấn băng keo lụa tại mối nối giữa ống mềm và ống thoát trên tường để chống rò rỉ",
      "Thử nước và kiểm tra đáy chậu, bộ xả cùng các mối nối ống mềm xem có rò rỉ không, sau đó lau sạch silicone thừa",
      "Trước khi bàn giao, thực hiện kiểm tra áp lực giữ nước đầy chậu để xác nhận thoát nước tại góc bo R thông suốt, không đọng nước",
    ],
    certifications: [
      "Inox SUS304 đạt chuẩn thực phẩm, đáp ứng yêu cầu vệ sinh đối với dụng cụ nhà bếp",
      "Thiết bị nhà bếp và phòng tắm tuân thủ các tiêu chuẩn quốc gia Trung Quốc liên quan (GB)",
      "Kiểm soát sản xuất theo hệ thống quản lý chất lượng ISO 9001",
      "Kiểm tra rò rỉ và độ kín nước trước khi xuất xưởng trên từng sản phẩm",
      "Kiểm tra ăn mòn phun muối để xác minh khả năng chống gỉ và độ bền",
    ],
    packaging: [
      { label: "Bao bì", value: "Thùng carton riêng lẻ + mút xốp EPE / màng bọc bảo vệ, che chắn bề mặt lòng chậu đánh xước và bốn góc" },
      { label: "Phụ kiện đi kèm", value: "Bộ xả đường kính lớn, giỏ lọc rút lên, vòng ron, kẹp cố định (tùy theo model)" },
      { label: "Số lượng đặt hàng tối thiểu", value: "Theo lô / container, hỗ trợ xếp container ghép nhiều model" },
      { label: "Thời gian giao hàng", value: "Model tiêu chuẩn giao từ kho; hình dáng lòng chậu tùy chỉnh thỏa thuận theo từng đơn" },
      { label: "Hàng mẫu", value: "Có sẵn chậu mẫu để xác nhận độ sâu lòng chậu, cảm giác và độ hoàn thiện bề mặt" },
    ],
    whyChoose: [
      { icon: "🍳", title: "SUS304 gia cường", desc: "Tấm 304 đạt chuẩn thực phẩm gia cường đến 3.0mm — thành lòng chậu chắc chắn, chống móp và chịu lực, bền lâu và không gây ám mùi." },
      { icon: "🔇", title: "Vận hành êm ái", desc: "Lớp phủ nano đáy chậu cùng tấm tiêu âm dày hấp thụ hiệu quả tiếng nước chảy và va đập, giữ gian bếp yên tĩnh hơn." },
      { icon: "📐", title: "R10 dung tích lớn", desc: "Góc bo sắc nét tạo hình thủ công mang lại lòng chậu vuông vức và dung tích lớn hơn — nồi, chảo và bát đều vừa trong một lần." },
      { icon: "✋", title: "Hàn thủ công", desc: "Mỗi sản phẩm được người thợ hàn và tinh chỉnh, đường hàn mảnh, gần như vô hình — tay nghề chịu được sự soi xét kỹ lưỡng." },
      { icon: "🧽", title: "Dễ lau, kháng vết bẩn", desc: "Bề mặt đánh xước / nano làm mờ dấu vân tay và vệt nước; chỉ một lần lau dọc vân là sạch, giúp việc chăm sóc hằng ngày thật nhẹ nhàng." },
    ],
    projectShowcase: [
      "Cải tạo tủ bếp đặt làm sẵn và bếp mở cho nhà ở",
      "Lắp đặt số lượng lớn cho căn hộ, nhà nghỉ và nhà bàn giao hoàn thiện",
      "Khu rửa bếp thương mại cho nhà hàng, căng-tin và nhiều nơi khác",
      "Dự án xuất khẩu kiểu Mỹ / châu Âu đặt làm theo yêu cầu cho ngoại thương",
    ],
    faq: [
      { q: "Làm sao chọn giữa chậu thủ công và chậu dập?", a: "Chậu thủ công được hàn, thành lòng chậu dày hơn, góc bo R chặt hơn, dung tích lớn hơn và cách âm tốt hơn — lựa chọn cao cấp hơn. Chậu dập được tạo hình bằng một lần ép, đem lại giá trị tốt với các điểm chuyển tiếp tròn hơn, dễ lau chùi hơn. Chọn thủ công nếu ưu tiên chất lượng, chọn dập nếu ưu tiên ngân sách." },
      { q: "Chậu rửa dùng loại inox nào?", a: "Một tấm inox SUS304 đạt chuẩn thực phẩm nguyên khối — chống gỉ và chống ăn mòn, không ám mùi vị, phù hợp với tần suất sử dụng cao trong nhà bếp." },
      { q: "Có cung cấp kích thước cắt lỗ mặt bàn không?", a: "Có. Mỗi model đều kèm kích thước cắt lỗ và kích thước ngoài tương ứng; chậu lắp âm còn bao gồm khoảng chừa lắp đặt, và Huayue Supply Chain có thể hỗ trợ bản vẽ lắp đặt." },
      { q: "Đáy chậu có đọng sương và nhỏ giọt không?", a: "Đáy chậu được phun lớp phủ nano chống đọng sương và gắn tấm tiêu âm, giúp giảm đáng kể hiện tượng đọng sương và hạ thấp nguy cơ ẩm mốc hư hỏng tủ bếp." },
      { q: "Số lượng đặt hàng tối thiểu và thời gian giao hàng thì sao?", a: "Theo lô / container, có thể ghép nhiều model trong một lần xếp hàng; model tiêu chuẩn giao từ kho, còn hình dáng lòng chậu tùy chỉnh có thời gian giao xác nhận theo từng đơn." },
    ],
  },

  faucet: {
    story:
      "Vòi rửa bếp Daweier là nét hoàn thiện cuối cùng cho một bộ chậu rửa trọn vẹn. Được thiết kế để rửa rau và vo gạo, vòi cổ ngỗng vòng cung cao cho phép nồi to xoay thoải mái trong lòng chậu, trong khi vòi rút hoặc vòi xoay đưa nước tới mọi góc của chậu. Lõi van gốm tích hợp đóng mở trơn tru với khả năng điều khiển nóng-lạnh rõ ràng, và sau hàng trăm nghìn lần đóng mở vẫn không nhỏ giọt hay rỉ nước. Thân bằng đồng thau hoặc inox được hoàn thiện qua nhiều lớp mạ điện, nên dù tiếp xúc liên tục với hơi ẩm nhiều năm vẫn sáng bóng, không xỉn màu. Bộ sục khí làm dòng nước mềm mịn, êm dịu, vừa tiết kiệm nước vừa giảm văng bắn. Chỉ một thao tác xoay, vòi mang lại cả sự tiện lợi lẫn độ bền.",
    heritage:
      "Vòi rửa là phần mở rộng tự nhiên của dòng chậu rửa Daweier — chậu và vòi cùng một thương hiệu tương xứng nhau về kích thước và phong cách, giúp bạn khỏi phải ghép nối những bộ phận không đồng bộ. Nhiều năm tích lũy chuyên môn về phụ kiện nhà bếp và phòng tắm khiến dòng sản phẩm đồng bộ này đặc biệt tỉ mỉ ở các chi tiết về khả năng kín khít và lớp mạ.",
    technicalSpecs: [
      { label: "Chất liệu", value: "Thân đồng thau / inox mạ, bề mặt mạ điện nhiều lớp" },
      { label: "Lõi van", value: "Lõi van gốm cấp nhập khẩu, vận hành trơn tru và chống mài mòn" },
      { label: "Công nghệ", value: "Đúc liền khối + đánh bóng tinh xảo + mạ điện chống oxy hóa" },
      { label: "Vòi nước", value: "Cổ ngỗng cao, vòi rút / vòi xoay" },
      { label: "Cấu hình", value: "Bộ sục khí, ống cấp nước nóng & lạnh, đế cố định" },
      { label: "Ứng dụng", value: "Pha trộn nước nóng-lạnh cho chậu rửa bếp" },
    ],
    manufacturing: [
      "Daweier (Khai Bình, Quảng Đông) — dòng vòi rửa bếp được chế tạo để tương xứng với các chậu rửa, thiết kế đồng bộ về phong cách với lòng chậu",
      "Thân được đúc đồng thau hoặc inox mạ, đảm bảo độ chắc chắn và khả năng chống ăn mòn",
      "Lõi van gốm được thử nghiệm qua hàng chục nghìn chu kỳ đóng-mở mỏi đảm bảo cảm giác trơn tru và độ kín đáng tin cậy",
      "Bề mặt được mài, đánh bóng và mạ điện nhiều lớp, đạt kiểm tra phun muối và chống oxy hóa, biến màu",
      "Mỗi sản phẩm được kiểm tra lưu lượng và áp lực trước khi xuất xưởng, soát lại việc chuyển nóng-lạnh và độ kín tại từng mối nối",
    ],
    careGuide: [
      { title: "Chăm sóc lớp mạ", desc: "Lau bề mặt mạ bằng khăn mềm với nước sạch hoặc chất tẩy trung tính; tránh chất tẩy có hạt mài hoặc axit mạnh để không làm xước và xỉn lớp mạ." },
      { title: "Loại bỏ cặn vôi", desc: "Bộ sục khí ở đầu vòi dễ bám cặn vôi — định kỳ tháo ra và ngâm/rửa trong nước sạch hoặc giấm trắng pha loãng để dòng nước chảy đều trở lại." },
      { title: "Kiểm tra ống mềm", desc: "Thường xuyên kiểm tra ống cấp nước và các mối nối xem có rỉ nước hoặc lão hóa không; nếu xuất hiện rò rỉ, hãy thay vòng ron hoặc ống mềm kịp thời." },
    ],
    installation: [
      "Xác nhận đường kính lỗ vòi đã cắt sẵn trên chậu hoặc mặt bàn và làm sạch các ba-via quanh lỗ",
      "Đưa vòi vào lỗ, cố định từ bên dưới bằng đế và đai ốc khóa, rồi căn chỉnh hướng",
      "Nối ống cấp nước nóng và lạnh vào van góc, quấn băng keo lụa tại mối nối và siết chặt",
      "Mở nước và thử áp lực, kiểm tra việc chuyển van trơn tru và tất cả mối nối không rò rỉ",
      "Lau sạch dấu vân tay và vệt nước trên bề mặt vòi trước khi bàn giao",
    ],
    certifications: [
      "Phụ kiện nhà bếp và phòng tắm tuân thủ các tiêu chuẩn quốc gia Trung Quốc liên quan (GB)",
      "Lõi van gốm đạt kiểm tra độ bền đóng-mở",
      "Kiểm soát sản xuất theo hệ thống quản lý chất lượng ISO 9001",
      "Kiểm tra ăn mòn phun muối lớp mạ",
      "Kiểm tra lưu lượng/áp lực và độ kín trên từng sản phẩm",
    ],
    packaging: [
      { label: "Bao bì", value: "Hộp màu / thùng carton + lót xốp, bảo vệ bề mặt mạ và vòi nước" },
      { label: "Phụ kiện đi kèm", value: "Ống cấp nước nóng & lạnh, đế cố định và đai ốc khóa, bộ sục khí" },
      { label: "Số lượng đặt hàng tối thiểu", value: "Theo lô, có thể xếp container chung với chậu rửa" },
      { label: "Thời gian giao hàng", value: "Model tiêu chuẩn giao từ kho; hàng tùy chỉnh thỏa thuận theo từng đơn" },
      { label: "Hàng mẫu", value: "Có sẵn hàng mẫu để xác nhận cảm giác và tông màu lớp mạ" },
    ],
    whyChoose: [
      { icon: "🚿", title: "Lõi van gốm", desc: "Vận hành trơn tru với điều khiển nóng-lạnh rõ ràng; vẫn không nhỏ giọt hay rỉ nước sau hàng trăm nghìn lần đóng mở." },
      { icon: "🛡️", title: "Lớp mạ bền bỉ", desc: "Mạ điện nhiều lớp chống oxy hóa và biến màu, giữ sáng như mới qua nhiều năm tiếp xúc hơi ẩm." },
      { icon: "💧", title: "Sục khí tiết kiệm nước", desc: "Bộ sục khí làm dòng nước mềm mịn, đều dày, tiết kiệm nước và giảm văng bắn." },
      { icon: "🔄", title: "Vòi linh hoạt", desc: "Cổ ngỗng cao với vòi rút / vòi xoay giúp xoay nồi to và rửa các góc hẹp thật dễ dàng." },
      { icon: "🧩", title: "Bộ đồng bộ", desc: "Cùng nguồn gốc với chậu rửa Daweier, tương xứng nhau về kích thước và phong cách giúp lắp đặt dễ dàng và đồng bộ hơn." },
    ],
    projectShowcase: [
      "Ghép vòi pha nóng-lạnh cho chậu rửa bếp nhà ở",
      "Lắp đặt phụ kiện số lượng lớn cho căn hộ và nhà bàn giao hoàn thiện",
      "Vòi khu rửa cho nhà hàng và bếp thương mại",
      "Bàn giao dự án ghép thành bộ với chậu rửa Daweier",
    ],
    faq: [
      { q: "Vòi rửa dùng lõi van loại nào?", a: "Lõi van gốm — vận hành trơn tru với độ kín đáng tin cậy, được thử nghiệm qua hàng chục nghìn chu kỳ đóng-mở mỏi, nên khó nhỏ giọt trong suốt quá trình dùng lâu dài." },
      { q: "Lớp mạ có bị xỉn hay biến màu theo thời gian không?", a: "Bề mặt được mạ điện nhiều lớp và đạt kiểm tra phun muối, nên với việc sử dụng bình thường và lau chùi hằng ngày, vòi giữ sáng bóng trong thời gian dài — chỉ cần tránh axit mạnh và chất tẩy có hạt mài." },
      { q: "Có thể ghép với chậu rửa Daweier không?", a: "Có. Vòi và chậu cùng một nguồn gốc, với đường kính lỗ và phong cách tương xứng, nên mua thành bộ giúp lắp đặt liền mạch hơn." },
      { q: "Số lượng đặt hàng tối thiểu và thời gian giao hàng thì sao?", a: "Theo lô, và có thể xếp container chung với chậu rửa; model tiêu chuẩn giao từ kho, còn hàng tùy chỉnh có thời gian giao xác nhận theo từng đơn." },
    ],
  },

  drain: {
    story:
      "Phễu thoát sàn Daweier là cánh cửa ẩn giữ cho ẩm thấp và mùi hôi trong nhà bị ghìm chặt dưới lòng đất. Chế tạo từ inox SUS304 hoặc đồng đặc, trọng lượng đầm chắc giúp sản phẩm chống biến dạng và gỉ thủng. Có sẵn nhiều cấu trúc — thoát đáy và thoát ngang (dòng E) — kết hợp với bẫy nước P sâu hơn hoặc lõi chống mùi van lật, vừa chặn nước cống trào ngược vừa giữ lại tóc và cặn rác. Thiết kế thoát nước lưu lượng cao giúp dọn nhanh nước đọng sau khi tắm, để sàn không còn ướt nhẹp. Dù ở phòng tắm, ban công hay nhà bếp, phễu vẫn lặng lẽ nằm dưới sàn, giữ khô ráo và tươi mới ngay dưới chân bạn.",
    heritage:
      "Phễu thoát sàn là dòng sản phẩm mạnh nhất, được mài giũa tinh xảo nhất của Daweier, vun đắp qua nhiều năm — từ kiểu thoát đáy cổ điển đến dòng E thoát ngang và model L05 vuông, bao quát mọi loại miệng thoát và tình huống cải tạo. Bí quyết tích lũy qua nhiều năm cho phép sản phẩm cân bằng vừa khéo giữa cấu trúc chống mùi và hiệu suất thoát nước.",
    technicalSpecs: [
      { label: "Chất liệu", value: "Inox SUS304 / đồng đặc, chống ăn mòn và chống gỉ" },
      { label: "Quy cách", value: "Thoát đáy / thoát ngang (dòng E) / vuông (L05), nhiều kích cỡ" },
      { label: "Công nghệ", value: "Mặt nắp đánh xước hoặc mạ điện, thân tạo hình liền khối" },
      { label: "Chống mùi", value: "Bẫy nước P sâu / lõi chống mùi van lật, chặn mùi trào ngược" },
      { label: "Thoát nước", value: "Thiết kế thoát nước lưu lượng cao, dọn nước nhanh để tránh đọng" },
      { label: "Cấu hình", value: "Lõi chống mùi, lưới lọc, mặt nắp tháo rời rửa được" },
    ],
    manufacturing: [
      "Daweier (Khai Bình, Quảng Đông) — dòng phễu thoát sàn chủ lực vun đắp qua nhiều năm, với đầy đủ cấu trúc và kiểu dáng",
      "Thân làm bằng inox SUS304 hoặc đồng đặc, chống ăn mòn trong môi trường ẩm và khó gỉ thủng",
      "Mặt nắp được đánh xước hoặc mạ điện, bên trong là bẫy nước P sâu hoặc lõi chống mùi van lật",
      "Các cấu trúc độc lập được phát triển cho từng tình huống lắp đặt khác nhau của thoát đáy và thoát ngang, phù hợp mọi loại miệng thoát",
      "Kiểm tra lưu lượng thoát nước và độ kín chống mùi được thực hiện trước khi xuất xưởng để đảm bảo thoát nhanh và chặn mùi chắc chắn",
    ],
    careGuide: [
      { title: "Dọn sạch định kỳ", desc: "Tháo mặt nắp và lưới lọc để dọn tóc và cặn rác tích tụ, giữ thoát nước thông suốt không tắc nghẽn hay tràn ngược." },
      { title: "Bảo dưỡng lõi chống mùi", desc: "Nếu lõi chống mùi van lật hoặc bẫy nước P bị biến dạng hay kẹt, hãy làm sạch và lắp lại hoặc thay mới kịp thời để ngăn mùi trào ngược." },
      { title: "Vệ sinh mặt nắp", desc: "Lau mặt nắp inox bằng khăn mềm dọc theo vân, tránh búi thép; giữ mặt nắp đồng tránh xa axit mạnh để bảo toàn độ sáng bóng." },
    ],
    installation: [
      "Chọn model thoát đáy hoặc thoát ngang dựa trên loại miệng thoát của sàn và xác nhận đường kính ống khớp nhau",
      "Lắp phễu thoát ngang với cao độ sàn hoàn thiện, dự trù và đảm bảo độ dốc thoát nước",
      "Bơm keo chống thấm tại mối nối giữa phễu và ống, rồi ốp cạnh gạch sát khít vào mặt nắp",
      "Lắp lõi chống mùi và lưới lọc, sau đó đổ nước để thử tốc độ thoát và độ kín chống mùi",
      "Trước khi bàn giao, xác nhận mặt nắp bằng phẳng với sàn và không có rỉ nước hay đọng nước xung quanh",
    ],
    certifications: [
      "Inox SUS304 / đồng đặc, chống ăn mòn và đáp ứng yêu cầu sử dụng trong phòng tắm",
      "Phụ kiện thoát nước phòng tắm tuân thủ các tiêu chuẩn quốc gia Trung Quốc liên quan (GB)",
      "Kiểm soát sản xuất theo hệ thống quản lý chất lượng ISO 9001",
      "Đạt kiểm tra độ kín chống mùi và lưu lượng thoát nước",
      "Kiểm tra ăn mòn phun muối để xác minh độ bền trong môi trường ẩm",
    ],
    packaging: [
      { label: "Bao bì", value: "Hộp riêng lẻ + xốp, bảo vệ mặt nắp và lõi chống mùi" },
      { label: "Phụ kiện đi kèm", value: "Lõi chống mùi, lưới lọc, mặt nắp tháo rời rửa được (tùy theo model)" },
      { label: "Số lượng đặt hàng tối thiểu", value: "Theo lô / container, hỗ trợ xếp ghép nhiều kiểu dáng" },
      { label: "Thời gian giao hàng", value: "Model tiêu chuẩn giao từ kho; hàng tùy chỉnh thỏa thuận theo từng đơn" },
      { label: "Hàng mẫu", value: "Có sẵn hàng mẫu để xác nhận cấu trúc, kích thước và phương thức chống mùi" },
    ],
    whyChoose: [
      { icon: "👃", title: "Kiểm soát mùi hiệu quả", desc: "Bẫy nước P sâu hoặc lõi chống mùi van lật mang lại kiểm soát kép, chặn chắc chắn mùi cống trào ngược." },
      { icon: "💧", title: "Thoát nước lưu lượng cao", desc: "Rãnh thoát nước được tối ưu giúp dọn nhanh nước đọng sau khi tắm, để sàn khô nhanh hơn." },
      { icon: "🛡️", title: "Thân inox / đồng", desc: "Thân SUS304 hoặc đồng đặc chống ẩm và chống ăn mòn, khó gỉ thủng hay biến dạng dù tiếp xúc nước lâu dài." },
      { icon: "🔧", title: "Lắp vừa đa năng", desc: "Thoát đáy, dòng E thoát ngang và L05 vuông — nhiều cấu trúc phù hợp mọi loại miệng thoát." },
      { icon: "🧼", title: "Tháo rời và dễ vệ sinh", desc: "Mặt nắp và lưới lọc tháo rời được, nên dọn tóc và cặn rác chỉ trong một bước, giúp bảo trì dễ dàng." },
    ],
    projectShowcase: [
      "Thoát sàn cho phòng tắm và phòng tắm đứng nhà ở",
      "Thoát sàn cho ban công, khu giặt và nhà bếp",
      "Lắp đặt số lượng lớn cho căn hộ, khách sạn và nhà bàn giao hoàn thiện",
      "Không gian phòng tắm thương mại đòi hỏi thoát nước nhanh",
    ],
    faq: [
      { q: "Làm sao chọn giữa thoát đáy và thoát ngang (dòng E)?", a: "Chọn thoát đáy khi ống thoát nằm ngay bên dưới phễu; chọn dòng E thoát ngang khi miệng ống lệch sang một bên hoặc lớp lắp đặt nông. Quyết định dựa trên vị trí miệng thoát thực tế và độ sâu chừa sẵn." },
      { q: "Hiệu quả chống mùi đạt được bằng cách nào?", a: "Bằng cách bịt kín đường khí với bẫy nước P sâu hoặc lõi chống mùi van lật, chặn mùi cống trào ngược; định kỳ vệ sinh lõi chống mùi giúp hiệu quả chặn mùi bền lâu." },
      { q: "Có dễ bị tắc do tóc không?", a: "Sản phẩm đi kèm lưới lọc để giữ tóc và cặn rác, mặt nắp tháo rời cho phép vệ sinh định kỳ; thiết kế rãnh lưu lượng cao cũng giảm nguy cơ tắc nghẽn." },
      { q: "Chất liệu là inox hay đồng?", a: "Có sẵn cả thân inox SUS304 lẫn đồng đặc — cả hai đều chống ẩm và chống ăn mòn, nên bạn có thể chọn theo ngân sách và phong cách." },
      { q: "Số lượng đặt hàng tối thiểu và thời gian giao hàng thì sao?", a: "Theo lô / container, có thể ghép nhiều kiểu dáng trong một lần xếp hàng; model tiêu chuẩn giao từ kho, còn hàng tùy chỉnh có thời gian giao xác nhận theo từng đơn." },
    ],
  },

  accessory: {
    story:
      "Phụ kiện chậu rửa Daweier là những nhân tố thầm lặng phía sau làm cho một chiếc chậu thật sự dễ dùng. Bộ xả, đầu xả, ống thoát nước, giỏ lọc rút lên và khay đựng gác trên chậu — mỗi món đều được làm vừa khít kích thước của chính các chậu rửa Daweier, lắp vào là khớp ngay, nên bạn không bao giờ phải đi tìm đầu nối chuyển đổi. Bộ xả đường kính lớn dọn nước nhanh, giỏ lọc rút lên giữ cặn rác trong lòng chậu rồi nhấc lên đổ bỏ dễ dàng, còn khay đựng gác trên giúp giá úp và chai xà phòng được sắp xếp gọn gàng. Khiêm tốn, nhưng nhẹ nhàng ở mọi thao tác — sự chỉn chu của một gian bếp tốt thường ẩn trong những chi tiết như thế này.",
    heritage:
      "Phụ kiện là mảnh ghép cuối cùng của hệ chậu rửa Daweier. Nhiều năm kinh nghiệm cung ứng trọn bộ khiến các bộ phận thoát nước và lưu trữ này tương thích cao với lòng chậu về kích thước, độ kín và sự kết hợp chất liệu, giúp người dùng khỏi phiền toái ghép nối những bộ phận không đồng bộ.",
    technicalSpecs: [
      { label: "Chất liệu", value: "Inox SUS304 / hợp kim / nhựa kỹ thuật ABS" },
      { label: "Quy cách", value: "Đường kính xả tiêu chuẩn, khớp với mọi model chậu rửa Daweier" },
      { label: "Công nghệ", value: "Inox đánh xước/đánh bóng, chi tiết nhựa ép phun" },
      { label: "Bề mặt", value: "Đánh xước hoặc mạ điện, kháng vân tay và dễ lau chùi" },
      { label: "Chống mùi", value: "Ống thoát nước có cấu trúc bẫy nước P, chặn mùi" },
      { label: "Cấu hình", value: "Bộ xả, đầu xả, ống thoát nước, giỏ lọc rút lên, khay đựng" },
    ],
    manufacturing: [
      "Daweier (Khai Bình, Quảng Đông) — dòng phụ kiện thoát nước và lưu trữ sản xuất thành trọn bộ với các chậu rửa",
      "Chi tiết kim loại dùng inox SUS304 hoặc hợp kim, chi tiết nhựa dùng nhựa kỹ thuật ABS, kết hợp cứng và mềm theo thế mạnh của từng bộ phận",
      "Bộ xả và đầu xả được gia công theo đường kính tiêu chuẩn của chậu rửa, đảm bảo khớp hoàn hảo với lòng chậu",
      "Ống thoát nước được thiết kế với cấu trúc chống mùi bẫy nước P, và vòng ron được kiểm tra rò rỉ trên từng sản phẩm",
      "Hỗ trợ cung ứng trọn bộ theo model chậu rửa, giảm phiền toái về đầu nối chuyển đổi và phụ kiện lắp ráp tại công trình",
    ],
    careGuide: [
      { title: "Lau theo vân xước", desc: "Lau chi tiết inox dọc theo vân bằng khăn mềm và làm sạch chi tiết nhựa bằng chất tẩy trung tính; tránh búi thép và axit mạnh để bảo toàn bề mặt và độ sáng bóng." },
      { title: "Dọn giỏ lọc", desc: "Định kỳ tháo giỏ lọc rút lên để dọn cặn rác và rửa bộ xả, ngăn dầu mỡ tích tụ và tắc nghẽn." },
      { title: "Kiểm tra vòng ron", desc: "Theo dõi vòng ron tại mối nối bộ xả và ống thoát nước xem có lão hóa hay biến dạng không, và thay kịp thời nếu xuất hiện rò rỉ." },
    ],
    installation: [
      "Xác nhận đường kính phụ kiện khớp với lỗ xả của chậu và chuẩn bị vòng ron cùng băng keo lụa",
      "Lắp bộ xả / đầu xả vào lỗ đáy chậu, kẹp vòng ron trên và dưới rồi siết chặt",
      "Nối ống thoát nước với phễu thoát trên tường hoặc sàn, quấn băng keo lụa tại mối nối và căn hướng bẫy nước P",
      "Lắp giỏ lọc rút lên, khay đựng và những thứ tương tự, kiểm tra việc đặt để chắc chắn",
      "Chạy thử rò rỉ bằng nước, xác nhận tất cả mối nối không rò rỉ trước khi bàn giao",
    ],
    certifications: [
      "Inox SUS304 và chi tiết nhựa đạt chuẩn thực phẩm, đáp ứng yêu cầu vệ sinh nhà bếp và phòng tắm",
      "Phụ kiện nhà bếp và phòng tắm tuân thủ các tiêu chuẩn quốc gia Trung Quốc liên quan (GB)",
      "Kiểm soát sản xuất theo hệ thống quản lý chất lượng ISO 9001",
      "Kiểm tra rò rỉ vòng ron và độ kín nước trên từng sản phẩm",
      "Kiểm tra ăn mòn để xác minh độ bền trong môi trường ẩm lâu dài",
    ],
    packaging: [
      { label: "Bao bì", value: "Đóng túi / đóng hộp + xốp, đóng gói theo bộ để bảo vệ phụ kiện" },
      { label: "Phụ kiện đi kèm", value: "Vòng ron, đai ốc khóa cố định, hướng dẫn lắp đặt (tùy theo model)" },
      { label: "Số lượng đặt hàng tối thiểu", value: "Theo lô, có thể xếp container thành bộ với chậu rửa" },
      { label: "Thời gian giao hàng", value: "Linh kiện tiêu chuẩn giao từ kho; hàng tùy chỉnh thỏa thuận theo từng đơn" },
      { label: "Hàng mẫu", value: "Có sẵn linh kiện mẫu để xác nhận đường kính và kích thước tương xứng" },
    ],
    whyChoose: [
      { icon: "🧩", title: "Tương xứng chính xác", desc: "Gia công theo kích thước chậu rửa Daweier để khớp hoàn hảo khi lắp đặt, giúp bạn khỏi đi tìm đầu nối chuyển đổi." },
      { icon: "💧", title: "Thoát nước nhanh", desc: "Bộ xả đường kính lớn và ống thoát chống mùi thoát nhanh và chặn mùi để dòng chảy thông suốt hơn." },
      { icon: "🧺", title: "Lưu trữ gọn gàng", desc: "Giỏ lọc rút lên và khay đựng gác trên giữ việc thoát nước và lưu trữ ngăn nắp, để mặt bàn sạch sẽ hơn." },
      { icon: "🛡️", title: "Chất liệu bền bỉ", desc: "Inox SUS304 kết hợp nhựa kỹ thuật cân bằng cứng và mềm, chống ẩm và chống ăn mòn cho tuổi thọ dài lâu." },
      { icon: "🔧", title: "Lắp đặt nhẹ nhàng", desc: "Cung ứng trọn bộ với đường kính đồng nhất giúp giảm đầu nối chuyển đổi tại công trình và lắp đặt đúng ngay từ lần đầu." },
    ],
    projectShowcase: [
      "Bộ thoát nước và lưu trữ trọn vẹn cho chậu rửa nhà ở",
      "Lắp đặt tủ bếp số lượng lớn cho căn hộ và nhà bàn giao hoàn thiện",
      "Phụ kiện khu rửa cho nhà hàng và bếp thương mại",
      "Bàn giao dự án ghép thành bộ với chậu rửa Daweier",
    ],
    faq: [
      { q: "Phụ kiện có dùng được với chậu rửa thương hiệu khác không?", a: "Khi đường kính gần nhau thì thường dùng được, nhưng phụ kiện Daweier được gia công theo chính các chậu rửa của hãng, nên mua thành bộ đáng tin cậy hơn về kích thước và độ kín, đồng thời dễ lắp đặt hơn." },
      { q: "Ống thoát nước có chặn được mùi không?", a: "Có. Ống thoát nước có cấu trúc bẫy nước P bịt kín đường khí và chặn mùi cống trào ngược, và vệ sinh định kỳ giúp hiệu quả bền lâu." },
      { q: "Khay đựng gác trên dùng để làm gì?", a: "Nó gác vào cạnh chậu hoặc trong lòng chậu để đựng giá úp, chai xà phòng, dao thìa và những thứ tương tự, giúp giữ khu vực mặt bàn và chậu rửa gọn gàng, ngăn nắp." },
      { q: "Số lượng đặt hàng tối thiểu và thời gian giao hàng thì sao?", a: "Theo lô, và có thể xếp container thành bộ với chậu rửa; linh kiện tiêu chuẩn giao từ kho, còn hàng tùy chỉnh có thời gian giao xác nhận theo từng đơn." },
    ],
  },

  other: {
    story:
      "Chậu rửa dập Daweier là lựa chọn nhẹ nhàng, được tạo hình bằng một lần ép liền mạch. Một tấm SUS304 nguyên khối được dập định hình trong một lần ép dưới máy ép thủy lực công suất lớn, nên lòng chậu là một khối liền không đường hàn, và đường cong tự nhiên ở các góc khiến dầu mỡ và vệt nước không còn chỗ ẩn náu — chỉ một lần lau là sạch. So với chậu thủ công, quy trình của nó đơn giản hơn và giá trị cao hơn, nhưng vẫn giữ nguyên độ bền và sự vệ sinh của inox đạt chuẩn thực phẩm. Các thiết kế thông dụng, kiểu Mỹ và châu Âu bao quát những loại mặt bàn và gu thẩm mỹ khác nhau, cùng với cách âm đáy chậu và xử lý chống đọng sương, nước chảy êm và tủ bếp giữ khô ráo. Với những gia đình và dự án coi trọng tính thực dụng và hiệu quả, đây là chiếc chậu hợp với mọi bối cảnh và luôn dễ dùng.",
    heritage:
      "Chậu rửa dập sánh ngang với chậu rửa thủ công như một dòng cốt lõi khác của Daweier. Quy trình dập một lần ép đúc rút từ nhiều năm kinh nghiệm OEM ngoại thương, vừa đảm bảo chất lượng vừa đẩy chi phí về mức dễ chịu, với hàng xuất khẩu vươn tới thị trường Mỹ và châu Âu.",
    technicalSpecs: [
      { label: "Chất liệu", value: "Inox SUS304 đạt chuẩn thực phẩm (tấm nguyên khối)" },
      { label: "Quy cách", value: "Chậu đơn / chậu đôi, thiết kế thông dụng / kiểu Mỹ / kiểu châu Âu, nhiều kích cỡ" },
      { label: "Công nghệ", value: "Tạo hình ép dập một lần từ tấm nguyên khối, không đường hàn" },
      { label: "Bề mặt", value: "Hoàn thiện đánh xước / nano, điểm chuyển tiếp bo cong dễ lau chùi" },
      { label: "Bán kính góc bo", value: "Đường cong bán kính lớn tự nhiên, không đọng cặn bẩn ở các góc" },
      { label: "Cấu hình", value: "Tấm tiêu âm đáy chậu + lớp phủ chống đọng sương + bộ xả" },
    ],
    manufacturing: [
      "Daweier (Khai Bình, Quảng Đông) — dòng chậu rửa dập cốt lõi sánh ngang với các chậu rửa thủ công",
      "Chế tạo từ một tấm SUS304 đạt chuẩn thực phẩm nguyên khối, dập định hình trong một lần ép dưới máy ép thủy lực công suất lớn, với lòng chậu liền mạch",
      "Bề mặt lòng chậu được đánh xước hoặc hoàn thiện nano, đáy phun lớp phủ chống đọng sương và gắn tấm tiêu âm, chống rung",
      "Mỗi sản phẩm được kiểm tra rò rỉ bằng nước và soi xét toàn diện về ngoại quan — chỉ những sản phẩm kín nước, đạt chuẩn mới được nhập kho",
      "Hỗ trợ tùy chỉnh OEM / ODM về hình dáng lòng chậu, kích thước và bao bì, phù hợp đơn hàng xuất khẩu và dự án",
    ],
    careGuide: [
      { title: "Lau theo vân xước", desc: "Lau dọc theo vân bằng khăn mềm và nước rửa chén trung tính, tránh búi thép và axit hoặc kiềm mạnh để bảo vệ bề mặt đánh xước khỏi trầy xước và ăn mòn." },
      { title: "Lau khô sau khi dùng", desc: "Lau sạch nước đọng sau khi dùng để tránh vệt nước và cặn vôi hình thành; ở khu vực nước cứng, giữ khô ráo giúp lòng chậu sáng hơn." },
      { title: "Ngừa lây gỉ sét", desc: "Không để vật bằng sắt trong lòng chậu thời gian dài; xử lý sớm vệt gỉ từ bên ngoài bằng cách chà nhẹ với kem làm sạch inox." },
      { title: "Giữ thông thoáng bộ xả", desc: "Định kỳ dọn giỏ lọc và bộ xả và kiểm tra vòng ron, giữ thoát nước thông suốt và không mùi hôi." },
    ],
    installation: [
      "Đánh dấu và cắt lỗ mặt bàn theo hình dáng lòng chậu, xác nhận khả năng chịu tải của mặt bàn và khoảng chừa khi mở lỗ",
      "Với chậu lắp dương, bơm keo silicone dọc theo vành và ấn vào lỗ; với chậu lắp âm, cố định bằng kẹp và bơm lại keo chống thấm",
      "Lắp bộ xả, nối ống thoát nước và quấn băng keo lụa tại mối nối ống mềm để chống rò rỉ",
      "Thử nước và kiểm tra đáy chậu, bộ xả cùng các mối nối ống mềm xem có rò rỉ không, sau đó lau sạch keo thừa",
      "Trước khi bàn giao, thực hiện kiểm tra áp lực giữ nước để xác nhận thoát nước thông suốt, không đọng nước",
    ],
    certifications: [
      "Inox SUS304 đạt chuẩn thực phẩm, đáp ứng yêu cầu vệ sinh đối với dụng cụ nhà bếp",
      "Thiết bị nhà bếp và phòng tắm tuân thủ các tiêu chuẩn quốc gia Trung Quốc liên quan (GB)",
      "Kiểm soát sản xuất theo hệ thống quản lý chất lượng ISO 9001",
      "Kiểm tra rò rỉ và độ kín nước trước khi xuất xưởng trên từng sản phẩm",
      "Kiểm tra ăn mòn phun muối để xác minh khả năng chống gỉ và độ bền",
    ],
    packaging: [
      { label: "Bao bì", value: "Thùng carton riêng lẻ + mút xốp EPE / màng bảo vệ, bảo vệ bề mặt lòng chậu và bốn góc" },
      { label: "Phụ kiện đi kèm", value: "Bộ xả, giỏ lọc, vòng ron, kẹp cố định (tùy theo model)" },
      { label: "Số lượng đặt hàng tối thiểu", value: "Theo lô / container, hỗ trợ xếp container ghép nhiều model" },
      { label: "Thời gian giao hàng", value: "Model tiêu chuẩn giao từ kho; hình dáng lòng chậu tùy chỉnh thỏa thuận theo từng đơn" },
      { label: "Hàng mẫu", value: "Có sẵn chậu mẫu để xác nhận độ sâu lòng chậu, cảm giác và độ hoàn thiện bề mặt" },
    ],
    whyChoose: [
      { icon: "🍳", title: "SUS304 tấm nguyên khối", desc: "Tấm 304 đạt chuẩn thực phẩm dập trong một lần ép, một khối liền mạch — bền, vệ sinh và không ám mùi vị." },
      { icon: "💰", title: "Giá trị tốt", desc: "Tạo hình ép dập một lần giúp quy trình đơn giản hơn và chi phí dễ chịu — một lựa chọn thực dụng." },
      { icon: "🧽", title: "Bo cong dễ lau chùi", desc: "Các điểm chuyển tiếp bo tròn tự nhiên chạy mượt, để dầu mỡ và vệt nước không còn chỗ ẩn náu — chỉ một lần lau là sạch." },
      { icon: "🔇", title: "Êm ái và kháng ẩm", desc: "Tấm tiêu âm đáy chậu cùng lớp phủ chống đọng sương giữ nước êm và tủ bếp ít bị ẩm hơn." },
      { icon: "🌍", title: "Thiết kế đa năng", desc: "Các thiết kế thông dụng / kiểu Mỹ / kiểu châu Âu bao quát những loại mặt bàn và gu thẩm mỹ khác nhau, xuất khẩu sang cả thị trường trong nước lẫn nước ngoài." },
    ],
    projectShowcase: [
      "Khu rửa cho nhà bếp và phòng tắm nhà ở",
      "Lắp đặt chậu rửa số lượng lớn cho căn hộ và nhà bàn giao hoàn thiện",
      "Không gian rửa thương mại cho địa điểm ăn uống, căng-tin và nhiều nơi khác",
      "Dự án xuất khẩu ngoại thương kiểu Mỹ / châu Âu",
    ],
    faq: [
      { q: "Khác biệt giữa chậu rửa dập và chậu rửa thủ công là gì?", a: "Chậu rửa dập được tạo hình bằng một lần ép từ một tấm, liền mạch, với các điểm chuyển tiếp bo tròn và giá trị tốt; chậu rửa thủ công được hàn, với thành lòng chậu dày hơn, góc bo R chặt hơn, dung tích lớn hơn và cách âm tốt hơn. Chọn dập nếu ưu tiên ngân sách, chọn thủ công nếu ưu tiên chất lượng." },
      { q: "Sản phẩm dùng loại inox nào?", a: "Một tấm inox SUS304 đạt chuẩn thực phẩm nguyên khối — chống gỉ và chống ăn mòn, không ám mùi vị, phù hợp sử dụng trong nhà bếp và phòng tắm." },
      { q: "Có cung cấp kích thước cắt lỗ không?", a: "Có. Mỗi hình dáng lòng chậu đều kèm kích thước cắt lỗ và kích thước ngoài tương ứng, và Huayue Supply Chain có thể hỗ trợ bản vẽ lắp đặt." },
      { q: "Đáy chậu có đọng sương không?", a: "Đáy chậu có lớp phủ chống đọng sương và tấm tiêu âm, giúp giảm đáng kể hiện tượng đọng sương và hạ thấp nguy cơ ẩm mốc hư hỏng tủ bếp." },
      { q: "Số lượng đặt hàng tối thiểu và thời gian giao hàng thì sao?", a: "Theo lô / container, có thể ghép nhiều model trong một lần xếp hàng; model tiêu chuẩn giao từ kho, còn hình dáng lòng chậu tùy chỉnh có thời gian giao xác nhận theo từng đơn." },
    ],
  },
};

// basin shares the same source as sink (handcrafted stainless-steel basin) — reuse sink metadata.
DAWEIER_SERIES_META.basin = DAWEIER_SERIES_META.sink;

/** Helper: get metadata by seriesOriginal, falling back to sink by default. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return DAWEIER_SERIES_META[seriesOriginal.trim()] || DAWEIER_SERIES_META.sink;
}
