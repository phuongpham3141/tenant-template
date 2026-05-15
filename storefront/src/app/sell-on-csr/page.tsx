import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const HERO_STATS = [
  { n: "1.840+", l: "Nhà cung cấp đã xác minh", icon: "🏭" },
  { n: "600+", l: "Đại lý doanh nghiệp Việt Nam", icon: "🇻🇳" },
  { n: "42 triệu $", l: "Giá trị đơn được bảo đảm 2025", icon: "🛡" },
  { n: "32%", l: "Tỷ lệ vượt kiểm định nhà máy", icon: "✅" },
];

const VALUE_PROPS = [
  {
    icon: "🇻🇳",
    title: "600+ đại lý Việt Nam đã xác minh",
    desc: "Đại lý đã xác minh doanh nghiệp đầy đủ, có lịch sử nhập khẩu thực. Phân bố theo ngành: nội thất 35%, vật liệu xây dựng 22%, thiết bị vệ sinh 15%, điện gia dụng 12%, các ngành khác 16%.",
  },
  {
    icon: "🤝",
    title: "Đội ngũ song ngữ Trung – Việt",
    desc: "8 nhân sự chuyên trách thị trường Việt Nam tại văn phòng Quảng Châu Tianhe + 6 tại Hà Nội. Hỗ trợ qua WeChat, DingTalk, Zalo — phản hồi trong giờ làm việc dưới 30 phút.",
  },
  {
    icon: "🛡",
    title: "Bảo đảm Giao dịch — người mua trả 0% phí",
    desc: "Tài khoản trung gian qua Vietcombank · BIDV · Bank of China. Nhà cung cấp đóng 1,5% (đã bao gồm trong giá niêm yết). Loại bỏ rào cản tin tưởng — đại lý Việt Nam tự tin đặt đơn lớn.",
  },
  {
    icon: "🚢",
    title: "Kết nối 5 cảng biển + đường bộ biên giới",
    desc: "Lạch Huyện · Cát Lái · Đà Nẵng · Tiên Sa · Cái Mép, kèm tuyến đường bộ Hữu Nghị (Lạng Sơn) 5–7 ngày cho đơn nhỏ. Đối tác vận chuyển sẵn: COSCO, MSC, OOCL, ONE.",
  },
  {
    icon: "📊",
    title: "Bảng phân tích chi tiết",
    desc: "Lượt xem theo SKU, tỷ lệ chuyển đổi RFQ → báo giá → đơn hàng, top đại lý theo doanh số, đề xuất SKU bán chạy theo mùa, thử nghiệm A/B hình ảnh. Xuất Excel, CSV, hoặc tự động qua API.",
  },
  {
    icon: "💸",
    title: "Mô hình Win-Win — chia sẻ rủi ro thị trường",
    desc: "Niêm yết, kiểm định, ghép nối RFQ, banner — miễn phí 100%. Phí duy nhất 1,5% Bảo đảm Giao dịch chỉ phát sinh khi đơn đã thành công. Cam kết hoàn 100% phí nếu nhà cung cấp chưa có lợi nhuận sau 12 tháng đầu.",
  },
];

const PRICING_PILLARS = [
  {
    badge: "Trước khi có đơn",
    price: "0 đ",
    priceSub: "Hoàn toàn miễn phí",
    color: "#16A34A",
    headline: "Niêm yết, kiểm định và mọi công cụ marketing — miễn phí 100%",
    desc: "Cybersilkroads tin rằng giá trị phải được chứng minh trước khi yêu cầu thu phí. Toàn bộ hạ tầng — từ kiểm định tại nhà máy, niêm yết không giới hạn sản phẩm, ghép nối RFQ bằng AI, đến banner trang chủ — đều miễn phí cho mọi nhà cung cấp đã pass kiểm định.",
    items: [
      "Đăng ký nhà máy & sàng lọc pháp lý",
      "Kiểm định tại nhà máy (chuẩn ISO 19011)",
      "Niêm yết sản phẩm không giới hạn",
      "Hộp thư RFQ + ghép nối AI top 3",
      "Quản lý tài khoản song ngữ Trung – Việt",
      "Banner ngành & banner trang chủ",
      "Báo cáo đại lý Việt Nam hàng quý",
      "Đại diện tại hội chợ (Canton Fair, VIETBUILD)",
    ],
    accent: false,
  },
  {
    badge: "Khi có đơn thành công",
    price: "1,5%",
    priceSub: "Trên giá trị đơn",
    color: "#005F6B",
    headline: "Bảo đảm Giao dịch — phí duy nhất, chỉ thu khi đã giao hàng thành công",
    desc: "Chúng tôi chỉ kiếm tiền khi nhà cung cấp đã nhận được đơn hàng và đại lý Việt Nam đã xác nhận. Phí 1,5% bao trọn dịch vụ tài khoản trung gian qua Vietcombank · BIDV · Bank of China — bảo vệ niềm tin cho người mua. Người mua trả 0 đ, nhà cung cấp đã bao gồm 1,5% trong giá niêm yết, không phí ẩn.",
    items: [
      "Tài khoản trung gian qua 3 ngân hàng quốc tế",
      "Người mua Việt Nam trả 0% phí — yên tâm đặt đơn lớn",
      "Chỉ giải ngân sau khi đại lý xác nhận hàng đúng",
      "Bảo vệ tranh chấp — hoàn tiền nếu sai cam kết",
      "Mức phí công khai, không có khoản nào ngoài 1,5%",
      "Tự động khấu trừ — nhà cung cấp không phải làm gì thêm",
    ],
    accent: true,
  },
  {
    badge: "Cam kết của chúng tôi",
    price: "Không lãi",
    priceSub: "Không thu phí",
    color: "#9C6A1F",
    headline: "Nếu nhà cung cấp chưa có lợi nhuận, Cybersilkroads miễn phí toàn bộ",
    desc: "Chúng tôi tin vào mô hình các bên cùng có lợi. Nếu sau 12 tháng đầu nhà cung cấp chưa thu được lợi nhuận thực từ Cybersilkroads, chúng tôi hoàn 100% phí Bảo đảm Giao dịch đã đóng — hoặc tiếp tục miễn phí thêm 6 tháng để cùng tìm hướng tối ưu. Đây không phải khuyến mại — đây là triết lý vận hành.",
    items: [
      "Cam kết ràng buộc trong hợp đồng dịch vụ",
      "Hoàn 100% phí Bảo đảm Giao dịch sau 12 tháng nếu chưa lãi",
      "Hoặc tiếp tục miễn phí thêm 6 tháng — nhà cung cấp chọn",
      "Quản lý tài khoản chủ động đề xuất tối ưu giá, sản phẩm",
      "Cybersilkroads chia sẻ rủi ro thị trường cùng nhà cung cấp",
      "Triết lý: chúng ta thắng cùng — không thắng riêng",
    ],
    accent: false,
  },
];

const STEPS = [
  {
    n: 1,
    icon: "📝",
    color: "#0E7490",
    title: "Đăng ký & Sàng lọc trước",
    duration: "1–2 ngày",
    desc: "Điền biểu mẫu trực tuyến (10 phút) — tải lên giấy phép kinh doanh, ISO 9001/14001, năng lực sản xuất. Cybersilkroads sàng lọc trong 24–48 giờ: kiểm tra Tianyancha, giấy phép xuất khẩu GACC, lịch sử khiếu nại. Khoảng 32% hồ sơ vượt qua bước sàng lọc trước.",
    actions: [
      "Điền 32 câu hỏi về quy mô, sản phẩm, doanh thu",
      "Kiểm tra chéo từ 5 nguồn dữ liệu công khai",
      "Phản hồi 100% hồ sơ — không bao giờ bỏ rơi",
    ],
  },
  {
    n: 2,
    icon: "🔍",
    color: "#7C2D12",
    title: "Kiểm định nhà máy tại chỗ",
    duration: "7–15 ngày",
    desc: "Đội kiểm định Cybersilkroads (4 nhân sự QC tại Quảng Châu) đến trực tiếp nhà máy: kiểm tra dây chuyền sản xuất thực tế, năng lực, hệ thống QC, chứng chỉ gốc, điều kiện lao động (chuẩn ILO). Kiểm định 1–2 ngày tại nhà máy. Báo cáo PDF 28–45 trang ký số trên blockchain.",
    actions: [
      "Tham quan 12 hạng mục theo chuẩn ISO 19011",
      "Phỏng vấn ngẫu nhiên 5–8 công nhân (riêng tư)",
      "Quay video 360° + 100–180 ảnh chứng cứ",
      "Kiểm tra lô sản phẩm đang chạy thực tế",
    ],
  },
  {
    n: 3,
    icon: "🚀",
    color: "#16A34A",
    title: "Lên gian hàng & đào tạo",
    duration: "3–5 ngày",
    desc: "Quản lý tài khoản hướng dẫn 1-1: đăng SKU với tiêu đề tối ưu cho tìm kiếm tiếng Việt, chuẩn hoá hình ảnh (chụp lại nếu cần), thiết lập MOQ và bậc giá, kết nối API/ERP nội bộ nếu có. Đào tạo qua video 8 buổi bằng tiếng Trung + tiếng Việt.",
    actions: [
      "Đăng 10–30 sản phẩm chủ lực với hình + video",
      "Thiết lập tài khoản ngân hàng nhận giải ngân",
      "Đào tạo quy trình: thời gian phản hồi, tranh chấp, đóng gói",
      "Tích hợp API hoặc connector ERP (tuỳ chọn)",
    ],
  },
  {
    n: 4,
    icon: "💼",
    color: "#9C6A1F",
    title: "Bán hàng & nhận đơn đầu tiên",
    duration: "7–30 ngày",
    desc: "Gian hàng công khai, AI ghép nối tự động đẩy SKU đến đại lý Việt Nam phù hợp. Trung bình nhà cung cấp nhận RFQ đầu tiên trong 7–14 ngày. Đơn hàng đầu trung bình 30 ngày. Quản lý tài khoản theo dõi và tối ưu liên tục.",
    actions: [
      "RFQ tự động chuyển đến nhà cung cấp phù hợp nhất",
      "Báo giá qua bảng điều khiển hoặc ứng dụng di động",
      "Theo dõi đơn 5 trạng thái với ảnh/video",
      "Giải ngân qua tài khoản trung gian sau khi đại lý xác nhận",
    ],
  },
];

const AUDIT_CRITERIA = [
  { label: "Giấy phép kinh doanh Trung Quốc", required: true },
  { label: "Giấy phép xuất khẩu GACC", required: true },
  { label: "ISO 9001:2015 hoặc tương đương", required: true },
  { label: "Năng lực sản xuất ≥ ngưỡng ngành", required: true },
  { label: "Hệ thống kiểm soát chất lượng có quy trình văn bản", required: true },
  { label: "Tuân thủ tiêu chuẩn lao động ILO cơ bản", required: true },
  { label: "ISO 14001 (môi trường)", required: false },
  { label: "BSCI hoặc SEDEX (kiểm định xã hội)", required: false },
  { label: "Chứng chỉ ngành (CE, FCC, RoHS, FDA)", required: false },
  { label: "Điểm tín dụng Tianyancha ≥ 70", required: false },
];

const MARKETING_TOOLS = [
  {
    icon: "📢",
    title: "Ghép nối RFQ bằng AI",
    desc: "Khi đại lý Việt Nam gửi yêu cầu báo giá, hệ thống xếp hạng AI đẩy nhà cung cấp phù hợp nhất vào top 3 — dựa trên lịch sử bán, đánh giá, năng lực, thời gian phản hồi. Gói Cao cấp được ưu tiên top 3 khi có nhiều ứng viên cùng điểm.",
  },
  {
    icon: "🏠",
    title: "Banner trang chủ nổi bật",
    desc: "Nhà cung cấp gói Cao cấp có banner luân phiên trên trang chủ Cybersilkroads — hiển thị 100.000+ lượt xem mỗi tuần, tỷ lệ nhấp chuột trung bình 4,2%. Lịch luân phiên 8 giờ một lần giữa các nhà cung cấp Cao cấp.",
  },
  {
    icon: "📧",
    title: "Cảnh báo Thương mại — bản tin tuần",
    desc: "Bản tin tuần gửi đến 12.000 đại lý đã đăng ký. Nhà cung cấp Cao cấp được giới thiệu trong mục 'Nhà cung cấp mới' (1 lần/tháng) hoặc 'Ưu đãi tốt nhất' (theo ngành). Tỷ lệ mở 38%, tỷ lệ nhấp 8,5%.",
  },
  {
    icon: "🎯",
    title: "Đại diện tại hội chợ thương mại",
    desc: "Cybersilkroads đại diện nhà cung cấp Cao cấp tại Canton Fair (Quảng Châu, 2 lần/năm), VIETBUILD HCM, VIIF Hà Nội — thu thập danh thiếp đại lý, chuyển khách tiềm năng về nhà cung cấp trong 48 giờ. Miễn phí 2 hội chợ/năm cho gói Cao cấp.",
  },
  {
    icon: "🎬",
    title: "Video tham quan nhà máy",
    desc: "Cybersilkroads sản xuất video tham quan nhà máy 90–180 giây cho nhà cung cấp Cao cấp (1 lần/năm miễn phí, sau đó 800 USD/video). Đặt trong gian hàng và chia sẻ qua Cảnh báo Thương mại — tăng độ tin cậy với đại lý mới.",
  },
  {
    icon: "📈",
    title: "Báo cáo đại lý Việt Nam hàng quý",
    desc: "Nhà cung cấp gói Đã xác minh trở lên nhận báo cáo quý: top 20 đại lý Việt Nam của ngành, biến động doanh số, dự báo rủi ro mất khách, cơ hội thị trường (SKU đang thiếu). 30+ trang, do đội Nghiên cứu biên soạn.",
  },
];

const STORIES = [
  {
    name: "Foshan Hanse Industrial",
    loc: "Foshan",
    category: "Nội thất văn phòng",
    before: "20 đơn / tháng",
    after: "85 đơn / tháng",
    lift: "+325%",
    years: "6 năm trên CSR",
    quote: "Trước Cybersilkroads, chúng tôi vào Việt Nam qua đại lý trung gian, biên lợi nhuận 8–12%. Giờ trực tiếp, biên 22% và quan hệ dài hạn.",
  },
  {
    name: "OPPEIN Home Group",
    loc: "Quảng Châu",
    category: "Tủ bếp & nội thất",
    before: "80.000 USD / tháng",
    after: "420.000 USD / tháng",
    lift: "+425%",
    years: "5 năm trên CSR",
    quote: "Việt Nam là thị trường tăng trưởng nhanh nhất của OPPEIN trong 3 năm — vượt cả Indonesia và Philippines.",
  },
  {
    name: "Taizhou Faucet Group",
    loc: "Đài Châu",
    category: "Vòi nước & thiết bị vệ sinh",
    before: "0 đại lý Việt Nam",
    after: "32 đại lý Việt Nam",
    lift: "+32 đại lý",
    years: "4 năm trên CSR",
    quote: "Quản lý tài khoản Cybersilkroads giúp chúng tôi xử lý quy định VAT Việt Nam — điều chúng tôi không thể tự làm từ Trung Quốc.",
  },
  {
    name: "Landbond Furniture",
    loc: "Foshan",
    category: "Nội thất gỗ trung – cao cấp",
    before: "60.000 USD / tháng",
    after: "280.000 USD / tháng",
    lift: "+367%",
    years: "7 năm trên CSR",
    quote: "Gói Cao cấp rất xứng đáng — banner trang chủ tạo ra 40% RFQ chất lượng cao của chúng tôi.",
  },
  {
    name: "Ortonbaths Group",
    loc: "Thâm Quyến",
    category: "Bồn cầu & lavabo",
    before: "5% xuất khẩu sang Việt Nam",
    after: "32% xuất khẩu sang Việt Nam",
    lift: "+540%",
    years: "3 năm trên CSR",
    quote: "Trong 3 năm, Việt Nam từ thị trường thứ 8 lên thứ 2 (sau Mỹ). Cybersilkroads là kênh chủ lực.",
  },
  {
    name: "Monalisa Ceramic",
    loc: "Foshan",
    category: "Gạch men & lát nền",
    before: "120.000 USD / tháng",
    after: "680.000 USD / tháng",
    lift: "+466%",
    years: "8 năm trên CSR",
    quote: "Chuỗi 24 đại lý gạch men ở Việt Nam đều biết Monalisa qua Cybersilkroads. Xây dựng thương hiệu hiệu quả hơn quảng cáo truyền thống.",
  },
];

const FAQ = [
  {
    q: "Tôi không nói tiếng Việt — có vấn đề gì không?",
    a: "Không. Quản lý tài khoản Cybersilkroads thông thạo tiếng Trung + tiếng Việt + tiếng Anh, đóng vai cầu nối toàn bộ giao tiếp. Gian hàng được tự động dịch sang tiếng Việt (đội biên dịch người soát lại chứ không thuần AI). Tin nhắn từ đại lý qua quản lý tài khoản — nhà cung cấp nhận tin đã được dịch và tóm tắt.",
  },
  {
    q: "Kiểm định nhà máy mất bao lâu và tốn chi phí gì?",
    a: "Kiểm định 1–2 ngày tại nhà máy, tổng chu trình 7–15 ngày từ khi đặt lịch. Miễn phí cho mọi gói — Cybersilkroads chịu chi phí đội kiểm định và di chuyển. Nhà cung cấp chỉ cần sắp xếp nhân sự hỗ trợ (1 quản lý QC + 1 quản lý sản xuất trong ngày kiểm định). Gói Cao cấp được thêm 1 lần kiểm định miễn phí mỗi năm để duy trì chứng nhận.",
  },
  {
    q: "Tôi đã có gian hàng trên Alibaba.com — có cần thêm Cybersilkroads không?",
    a: "Có nếu thị trường Việt Nam quan trọng với chiến lược của bạn. Alibaba.com là sàn toàn cầu chung; Cybersilkroads là kênh chuyên biệt cho Việt Nam — hồ sơ đại lý khác (doanh nghiệp B2B vừa – lớn của Việt Nam, không phải dropshipper), giá và Incoterms khác (mạnh DDP, ít FOB), cơ chế tin tưởng khác (Bảo đảm Giao dịch qua Vietcombank/BIDV thay vì Alipay). Nhiều nhà cung cấp dùng cả hai song song.",
  },
  {
    q: "Cybersilkroads kiếm tiền bằng cách nào nếu mọi thứ đều miễn phí?",
    a: "Chúng tôi chỉ thu phí 1,5% trên giá trị đơn hàng đã thành công, qua dịch vụ Bảo đảm Giao dịch — phí này nhà cung cấp đã bao gồm trong giá niêm yết, không phải phí ẩn. Người mua trả 0 đ. Mô hình của chúng tôi gắn liền với thành công của nhà cung cấp: chúng tôi chỉ kiếm tiền khi nhà cung cấp đã bán được hàng. Nếu nhà cung cấp chưa có lợi nhuận, chúng tôi không thu gì cả.",
  },
  {
    q: "Cam kết &ldquo;Không Lãi Không Thu&rdquo; hoạt động cụ thể như thế nào?",
    a: "Sau 12 tháng kể từ khi nhà cung cấp lên gian hàng chính thức, nếu tổng lợi nhuận từ các đơn hàng trên Cybersilkroads (sau khi trừ chi phí sản xuất, vận chuyển, phí 1,5%) chưa dương, nhà cung cấp có quyền yêu cầu một trong hai phương án: (1) Hoàn 100% phí Bảo đảm Giao dịch đã đóng trong 12 tháng đó. (2) Tiếp tục miễn phí Bảo đảm Giao dịch thêm 6 tháng — Cybersilkroads chia sẻ rủi ro thị trường cùng nhà cung cấp. Cam kết này được ghi rõ trong hợp đồng dịch vụ — không phải lời hứa marketing.",
  },
  {
    q: "Tôi có thể rút khỏi Cybersilkroads bất kỳ lúc nào không?",
    a: "Có. Nhà cung cấp tự khoá gian hàng trong bảng điều khiển, có hiệu lực ngay — không hợp đồng ràng buộc dài hạn, không phí huỷ. Vì niêm yết miễn phí 100%, không có khoản nào để hoàn lại. Đơn đang trong Bảo đảm Giao dịch phải hoàn tất chu trình trung gian (giải ngân hoặc xử lý tranh chấp) trước khi tài khoản đóng hoàn toàn.",
  },
  {
    q: "Yêu cầu pháp lý đặc biệt khi xuất khẩu sang Việt Nam qua Cybersilkroads?",
    a: "Nhà cung cấp cần: (1) Giấy phép xuất khẩu GACC (cấp Form E cho ưu đãi ACFTA). (2) Hoá đơn thương mại và Phiếu đóng gói đúng chuẩn hải quan Việt Nam. (3) Giấy chứng nhận xuất xứ (Form E hoặc RCEP nếu áp dụng). (4) Với hàng đặc thù: chứng chỉ chất lượng, bản đặc tính an toàn (cho hoá chất), báo cáo kiểm định (cho điện/điện tử). Quản lý tài khoản Cybersilkroads xét duyệt hồ sơ trước mỗi lô hàng — miễn phí.",
  },
  {
    q: "Tôi muốn bán cho đại lý Việt Nam nhưng không xuất khẩu trực tiếp — có mô hình thay thế không?",
    a: "Có mô hình 'CSR Fulfilled' đang triển khai từ quý 3/2026: nhà cung cấp giao hàng FOB cho Cybersilkroads Logistics tại Hong Kong hoặc Quảng Châu, Cybersilkroads lo toàn bộ vận chuyển + thông quan + giao đến đại lý Việt Nam. Nhà cung cấp chỉ cần ship đến cửa ngõ. Phí logistics 8–15% (tuỳ ngành), không phí thiết lập. Hiện đang chạy thử với 8 nhà cung cấp Cao cấp.",
  },
  {
    q: "Bảo đảm Giao dịch có bắt buộc không?",
    a: "Khuyến nghị mạnh nhưng không bắt buộc. Khoảng 78% đơn trên Cybersilkroads đang dùng Bảo đảm Giao dịch. Nhà cung cấp tham gia giúp tăng tỷ lệ chốt đơn (đại lý tin tưởng cao hơn 3,4 lần theo dữ liệu nội bộ), đặc biệt với đơn đầu tiên với đại lý mới. Phí 1,5% mỗi đơn đã bao gồm trong giá niêm yết, không phí ẩn.",
  },
];

function StatTile({ n, l, icon }: { n: string; l: string; icon: string }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded p-4 backdrop-blur-sm">
      <div className="text-[20px] mb-1">{icon}</div>
      <div className="text-[24px] font-extrabold leading-none">{n}</div>
      <div className="text-[11px] opacity-85 mt-1">{l}</div>
    </div>
  );
}

export default function SellOnCsrPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Bán Trên CSR" }]} />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #001A3F 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-brand-light blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-12 max-md:py-8">
          <span className="inline-block bg-gold text-brand-dark text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wider mb-3">
            🏭 BÁN TRÊN CSR · DÀNH CHO NHÀ CUNG CẤP
          </span>
          <h1 className="text-[42px] font-extrabold leading-[1.1] mb-4 max-md:text-[26px]">
            Bán hàng B2B sang Việt Nam<br />
            <span className="text-gold">qua nền tảng chuyên biệt số 1</span>
          </h1>
          <p className="text-[15px] opacity-90 max-w-[760px] leading-relaxed mb-7 max-md:text-[13px]">
            Nền tảng B2B chuyên thị trường Việt Nam – Trung Quốc cho ngành nội thất, vật liệu, thiết bị vệ sinh, điện gia dụng. <b className="text-gold">Niêm yết miễn phí 100%</b> — chúng tôi chỉ thu phí khi nhà cung cấp đã có đơn thành công. Cam kết &ldquo;Không Lãi Không Thu&rdquo;: nếu chưa có lợi nhuận, Cybersilkroads miễn phí toàn bộ. 40+ nhà máy đối tác đạt tăng trưởng 300%+ sau 24 tháng cùng mô hình các bên cùng có lợi.
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {HERO_STATS.map((s) => (
              <StatTile key={s.l} {...s} />
            ))}
          </div>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link href="/register/factory" className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]">
              🚀 Đăng ký nhà máy ngay
            </Link>
            <Link href="/info/audit-process" className="px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10">
              📋 Xem quy trình kiểm định
            </Link>
            <Link href="/info/contact" className="px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90">
              💬 Đặt lịch tư vấn 30 phút
            </Link>
          </div>
        </div>
      </section>

      {/* === Why Cybersilkroads ============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-9">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">VÌ SAO CHỌN CYBERSILKROADS</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">6 lý do 1.840+ nhà máy chọn nền tảng của chúng tôi</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Không phải sàn toàn cầu — Cybersilkroads là kênh chuyên sâu cho thị trường Việt Nam với hạ tầng và đội ngũ riêng cho mỗi giao dịch.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className="bg-paper border border-line rounded p-5 hover:border-brand transition">
              <div className="text-[32px] mb-2">{v.icon}</div>
              <b className="block text-[15px] text-ink mb-2 leading-tight">{v.title}</b>
              <p className="text-[12.5px] text-mute leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Pricing philosophy ============================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">CHÍNH SÁCH PHÍ · MÔ HÌNH WIN-WIN</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">
            Niêm yết miễn phí 100% — chỉ thu phí khi giao dịch thành công
          </h2>
          <p className="text-[13.5px] text-mute mt-2 max-w-[760px] mx-auto leading-relaxed">
            Cybersilkroads hỗ trợ kết nối các bên giao thương theo nguyên tắc <b className="text-ink">tất cả cùng có lợi</b>. Chúng tôi không thu phí đăng ký, không thu phí kiểm định, không thu phí thành viên hằng năm. Phí duy nhất là 1,5% Bảo đảm Giao dịch — chỉ phát sinh khi nhà cung cấp đã có đơn thành công và đại lý xác nhận hàng. <b className="text-ink">Nếu nhà cung cấp chưa có lợi nhuận, Cybersilkroads cam kết miễn phí toàn bộ.</b>
          </p>
        </div>

        {/* Top callout — big "100% free" stripe */}
        <div className="rounded p-5 mb-5 border-2 border-success bg-success/5 flex items-center justify-between gap-5 max-md:flex-col max-md:text-center">
          <div className="flex items-center gap-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-success text-white flex items-center justify-center text-[26px] flex-shrink-0">
              🎁
            </div>
            <div>
              <b className="block text-[18px] text-ink leading-tight">Toàn bộ quy trình đăng ký, kiểm định và niêm yết — MIỄN PHÍ 100%</b>
              <p className="text-[12.5px] text-mute mt-1">
                Không phí ẩn, không hợp đồng ràng buộc dài hạn, không yêu cầu đặt cọc. Nhà cung cấp có thể rút khỏi nền tảng bất kỳ lúc nào.
              </p>
            </div>
          </div>
          <Link
            href="/register/factory"
            className="px-5 py-2.5 bg-success text-white rounded-sm font-bold text-[13px] hover:opacity-90 whitespace-nowrap"
          >
            Đăng ký miễn phí →
          </Link>
        </div>

        {/* 3 pricing pillars */}
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {PRICING_PILLARS.map((p) => (
            <div
              key={p.headline}
              className={`bg-paper border-2 rounded p-5 flex flex-col ${
                p.accent ? "shadow-md ring-1" : ""
              }`}
              style={{
                borderColor: p.accent ? p.color : "#E5E7EB",
                ...(p.accent ? { boxShadow: `0 4px 12px ${p.color}20` } : {}),
              }}
            >
              <span
                className="inline-block self-start text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm mb-3"
                style={{ background: `${p.color}15`, color: p.color }}
              >
                {p.badge}
              </span>
              <div className="mb-3">
                <span className="text-[40px] font-extrabold leading-none" style={{ color: p.color }}>
                  {p.price}
                </span>
                <div className="text-[12px] text-mute mt-1">{p.priceSub}</div>
              </div>
              <h3 className="text-[15px] font-bold text-ink leading-tight mb-2 min-h-[3em]">
                {p.headline}
              </h3>
              <p className="text-[12px] text-mute leading-relaxed mb-4 flex-shrink-0">{p.desc}</p>
              <ul className="space-y-2 text-[12.5px] text-ink mb-1 flex-1">
                {p.items.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="flex-shrink-0" style={{ color: p.color }}>
                      ✓
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom commitment banner */}
        <div
          className="mt-5 rounded p-5 text-white max-md:p-4"
          style={{ background: "linear-gradient(135deg, #9C6A1F 0%, #7C5A1F 100%)" }}
        >
          <div className="flex items-start gap-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-white/15 border-2 border-gold flex items-center justify-center text-[26px] flex-shrink-0">
              🤝
            </div>
            <div className="flex-1">
              <b className="block text-[16px] mb-1">Cam kết &ldquo;Không Lãi Không Thu&rdquo; — bằng văn bản trong hợp đồng dịch vụ</b>
              <p className="text-[13px] opacity-90 leading-relaxed">
                Nếu sau 12 tháng đầu nhà cung cấp chưa có lợi nhuận thực từ Cybersilkroads, chúng tôi <b>hoàn 100% phí Bảo đảm Giao dịch</b> đã đóng — hoặc tiếp tục miễn phí thêm 6 tháng để cùng tìm hướng tối ưu. Chúng tôi tin nền tảng B2B chỉ có giá trị khi mọi bên cùng thắng.
              </p>
            </div>
            <Link
              href="/info/contact"
              className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm font-bold text-[13px] hover:bg-[#E8943A] whitespace-nowrap"
            >
              Trao đổi với BD →
            </Link>
          </div>
        </div>
      </section>

      {/* === Process steps ================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">QUY TRÌNH 4 BƯỚC</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">Trung bình 30 ngày từ đăng ký đến đơn đầu tiên</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Kiểm định miễn phí, quản lý tài khoản 1-1 hướng dẫn xuyên suốt từ ngày đầu đến khi nhận đơn đầu.
          </p>
        </div>
        <div className="space-y-3">
          {STEPS.map((s) => (
            <article key={s.n} className="bg-paper border-l-4 rounded-r p-5 max-md:p-4" style={{ borderColor: s.color }}>
              <div className="flex gap-4 max-md:flex-col">
                <div className="flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded flex items-center justify-center font-extrabold text-white text-[20px] shadow-md"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.n}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[28px]">{s.icon}</span>
                      <div>
                        <h3 className="text-[17px] font-bold text-ink leading-tight">{s.title}</h3>
                        <span className="text-[10.5px] uppercase tracking-wider font-bold" style={{ color: s.color }}>
                          BƯỚC {s.n}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] bg-bg border border-line px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider text-mute">
                      🕒 {s.duration}
                    </span>
                  </div>
                  <p className="text-[13px] text-mute leading-relaxed mb-3">{s.desc}</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] max-md:grid-cols-1">
                    {s.actions.map((a, i) => (
                      <li key={i} className="flex gap-2 text-ink">
                        <span style={{ color: s.color }} className="flex-shrink-0">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === Audit criteria ================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="bg-paper border border-line rounded p-6 max-md:p-4">
          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-brand font-bold">TIÊU CHÍ KIỂM ĐỊNH</span>
              <h2 className="text-[22px] font-bold text-ink mt-1 max-md:text-[18px]">Bộ tiêu chí 10 mục — bắt buộc + cộng điểm</h2>
              <p className="text-[13px] text-mute mt-1">Tỷ lệ vượt trung bình 32% — chuẩn nghiêm để bảo vệ đại lý Việt Nam</p>
            </div>
            <Link
              href="/info/audit-process"
              className="text-[12.5px] text-brand font-semibold hover:underline whitespace-nowrap"
            >
              Xem chi tiết quy trình →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 max-md:grid-cols-1">
            {AUDIT_CRITERIA.map((c) => (
              <div key={c.label} className="flex items-center gap-2.5 text-[13px]">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                    c.required ? "bg-brand text-white" : "bg-bg border border-line text-mute"
                  }`}
                >
                  {c.required ? "✓" : "+"}
                </span>
                <span className="text-ink flex-1">{c.label}</span>
                {c.required ? (
                  <span className="text-[10px] text-accent font-bold">BẮT BUỘC</span>
                ) : (
                  <span className="text-[10px] text-mute2">CỘNG ĐIỂM</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Marketing tools ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">CÔNG CỤ MARKETING</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">Cybersilkroads chủ động đẩy nhà cung cấp đến đại lý</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Không chỉ là gian hàng thụ động — chúng tôi vận hành 6 kênh marketing chủ động đưa nhà cung cấp tiếp cận đúng đại lý có nhu cầu.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {MARKETING_TOOLS.map((m) => (
            <div key={m.title} className="bg-paper border border-line rounded p-5 hover:border-brand transition">
              <div className="text-[28px] mb-2">{m.icon}</div>
              <b className="block text-[15px] text-ink mb-2 leading-tight">{m.title}</b>
              <p className="text-[12.5px] text-mute leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Success stories ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">CÂU CHUYỆN THÀNH CÔNG</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">6 nhà máy đối tác lâu năm — số liệu thực</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Chia sẻ trực tiếp từ giám đốc các nhà máy đã đồng hành cùng Cybersilkroads từ 3 đến 8 năm.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {STORIES.map((s) => (
            <article key={s.name} className="bg-paper border border-line rounded p-5">
              <div className="flex justify-between items-start mb-2 flex-wrap gap-1">
                <b className="text-[14.5px] text-ink leading-tight">{s.name}</b>
                <span className="text-[10.5px] text-mute2 whitespace-nowrap">{s.years}</span>
              </div>
              <div className="flex justify-between text-[11.5px] text-mute mb-3 flex-wrap gap-1">
                <span>📍 {s.loc}</span>
                <span>· {s.category}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-line text-[12px]">
                <div>
                  <div className="text-mute text-[10.5px] uppercase tracking-wider">Trước CSR</div>
                  <b className="text-ink text-[12.5px]">{s.before}</b>
                </div>
                <div>
                  <div className="text-mute text-[10.5px] uppercase tracking-wider">Sau CSR</div>
                  <b className="text-success text-[12.5px]">{s.after}</b>
                </div>
              </div>
              <div className="mt-2 text-center bg-success/10 border border-success/25 text-success font-bold py-1.5 rounded-sm text-[13px]">
                {s.lift}
              </div>
              <p className="text-[11.5px] text-mute italic mt-3 leading-relaxed border-l-2 border-gold pl-2.5">
                &ldquo;{s.quote}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* === FAQ =========================================================== */}
      <section className="max-w-[900px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">CÂU HỎI THƯỜNG GẶP</span>
          <h2 className="text-[28px] font-bold text-ink mt-1 max-md:text-[22px]">8 câu hỏi quan trọng nhất từ nhà cung cấp</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Tổng hợp từ phỏng vấn 600+ nhà cung cấp đã đăng ký và 1.840+ đối tác hiện hữu trong 12 tháng qua.
          </p>
        </div>
        <div className="space-y-2">
          {FAQ.map((f, i) => (
            <details key={i} className="group bg-paper border border-line rounded">
              <summary className="cursor-pointer px-4 py-3 flex justify-between items-center gap-3 list-none">
                <b className="text-[13.5px] text-ink flex-1">{f.q}</b>
                <span className="text-mute group-open:rotate-180 transition-transform text-[12px]">▾</span>
              </summary>
              <div className="px-4 pb-4 pt-1 text-[13px] text-mute leading-relaxed border-t border-line">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* === Final CTA ====================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12 mb-10">
        <div
          className="rounded p-8 text-white text-center max-md:p-5"
          style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #001A3F 100%)" }}
        >
          <h3 className="text-[30px] font-extrabold mb-3 max-md:text-[22px]">
            Sẵn sàng tăng doanh thu xuất khẩu Việt Nam?
          </h3>
          <p className="text-[14px] opacity-90 mb-6 max-w-[680px] mx-auto leading-relaxed">
            Đăng ký miễn phí, kiểm định miễn phí. Trung bình 30 ngày để lên gian hàng và nhận đơn đầu tiên. 1.840+ nhà cung cấp đã chọn Cybersilkroads — không phí giao dịch ẩn, quản lý tài khoản 1-1 song ngữ Trung – Việt.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/register/factory"
              className="inline-block px-8 py-3.5 bg-gold text-brand-dark rounded-sm font-bold text-[15px] hover:bg-[#E8943A]"
            >
              🚀 Đăng ký nhà máy ngay
            </Link>
            <Link
              href="/info/contact"
              className="inline-block px-8 py-3.5 border-2 border-white/40 text-white rounded-sm font-bold text-[15px] hover:bg-white/10"
            >
              💬 Đặt lịch tư vấn 30 phút
            </Link>
          </div>
          <div className="mt-6 pt-5 border-t border-white/15 text-[12px] opacity-80 flex justify-center gap-5 flex-wrap">
            <span>📞 +86 20 8888 1234 (Quảng Châu)</span>
            <span>📞 +84 24 3556 7788 (Hà Nội)</span>
            <span>✉ supplier@cybersilkroads.com</span>
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "Bán Trên CSR — Bán hàng B2B sang Việt Nam qua Cybersilkroads",
  description:
    "Nền tảng B2B chuyên thị trường Việt Nam – Trung Quốc. 600+ đại lý Việt Nam đã xác minh, Bảo đảm Giao dịch qua Vietcombank · BIDV · Bank of China, quản lý tài khoản song ngữ Trung – Việt. 1.840+ nhà cung cấp đã đăng ký, kiểm định miễn phí, 30 ngày từ đăng ký đến đơn đầu.",
};
