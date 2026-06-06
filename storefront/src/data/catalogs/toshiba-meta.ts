/**
 * Brand metadata cho Toshiba Home Appliances.
 *
 * Honest sourcing — chỉ dùng dữ kiện THẬT, kiểm chứng được:
 *   • Toshiba Corporation thành lập 1875 tại Nhật Bản
 *   • Mảng điện gia dụng (Toshiba Lifestyle Products & Services) được
 *     Midea Group mua 80.1% năm 2016 (537 triệu USD), giữ R&D Tokyo +
 *     thương hiệu + tiêu chuẩn chất lượng Nhật
 *   • Phân phối chính hãng tại VN qua Toshiba Lifestyle (toshiba-lifestyle.com/vn)
 *
 * KHÔNG bịa bảng thông số kỹ thuật per-series — mỗi sản phẩm đã có specs
 * thật + mô tả thật crawl từ PDP. Meta chỉ cung cấp brand story + cam kết
 * dịch vụ + FAQ vận hành (đúng thực tế B2B). Brand story dùng chung cho mọi
 * dòng sản phẩm Toshiba (technicalSpecs để rỗng → trang hiển thị specs thật).
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

const TOSHIBA_BRAND: SeriesMeta = {
  story:
    "Tagline: 「Leading Innovation」 — Dẫn đầu đổi mới.\n\nToshiba Corporation thành lập năm 1875 tại Nhật Bản — một trong những tập đoàn công nghệ lâu đời và uy tín nhất xứ sở mặt trời mọc, với hơn 150 năm lịch sử. Toshiba là cha đẻ của nhiều phát minh tiên phong: tủ lạnh, máy giặt, lò vi sóng đầu tiên của Nhật Bản.\n\nNăm 2016, Tập đoàn Midea mua lại 80.1% mảng điện gia dụng Toshiba (Toshiba Lifestyle Products & Services) với giá 537 triệu USD. Theo thoả thuận, Toshiba giữ nguyên thương hiệu, công nghệ lõi và tiêu chuẩn chất lượng Nhật Bản; Midea quản lý sản xuất quy mô lớn và chuỗi cung ứng toàn cầu — tạo nên sự kết hợp 'công nghệ Nhật + sản xuất Trung Quốc' với giá hợp lý hơn.\n\nTại Việt Nam, Toshiba được phân phối chính hãng qua Toshiba Lifestyle, với dải sản phẩm đầy đủ: điều hoà, tủ lạnh, máy giặt, máy sấy, thiết bị bếp, máy lọc nước và đồ gia dụng — tập trung công nghệ giữ tươi, inverter tiết kiệm điện và gia công tinh xảo kiểu Nhật.",
  heritage:
    "Hơn 150 năm di sản công nghệ Nhật Bản (từ 1875). Cha đẻ tủ lạnh + máy giặt + lò vi sóng đầu tiên của Nhật. R&D vẫn đặt tại Tokyo sau khi Midea tiếp quản 2016 — đảm bảo chất lượng + công nghệ lõi Nhật Bản.",
  technicalSpecs: [],
  manufacturing: [
    "Toshiba Corporation thành lập 1875 — hơn 150 năm lịch sử công nghệ Nhật",
    "Mảng điện gia dụng do Midea Group vận hành từ 2016 (sở hữu 80.1%)",
    "R&D giữ tại Tokyo Lab — công nghệ + tiêu chuẩn chất lượng Nhật Bản",
    "Sản xuất quy mô lớn qua hệ thống nhà máy + chuỗi cung ứng Midea toàn cầu",
    "Công nghệ lõi: inverter tiết kiệm điện, giữ tươi (NaturePURE, PureBIO), gia công tinh xảo",
  ],
  careGuide: [
    {
      title: "Vệ sinh hàng ngày",
      desc: "Lau bằng vải mềm + nước ấm + chất tẩy nhẹ pH trung tính. KHÔNG xịt nước trực tiếp vào bảng điều khiển hoặc ngõ cắm điện.",
    },
    {
      title: "Vệ sinh định kỳ",
      desc: "3 tháng/lần: vệ sinh bộ lọc (điều hoà, máy giặt, máy lọc nước, máy hút bụi). Toshiba thiết kế cơ chế tháo lắp dễ dàng.",
    },
    {
      title: "Bảo dưỡng kỹ thuật",
      desc: "Mỗi 12 tháng: gọi Trung tâm bảo hành Toshiba (toshiba-lifestyle.com/vn/support) kiểm tra gas điều hoà, vệ sinh khoang, hiệu chỉnh cảm biến. Miễn phí trong thời gian bảo hành.",
    },
    {
      title: "Phụ tùng chính hãng",
      desc: "Sử dụng phụ tùng + linh kiện chính hãng Toshiba để giữ hiệu năng + bảo hành. Liên hệ Service Center hoặc Huayue để đặt.",
    },
  ],
  installation: [
    "Đọc kỹ hướng dẫn sử dụng (manual song ngữ) trước khi lắp đặt",
    "Lắp đặt bởi kỹ thuật viên Toshiba Authorized Service Center",
    "Kiểm tra điện áp + tiếp đất + công suất ổn áp trước khi cắm",
    "Đợi 24h sau lắp đặt mới cắm điện với tủ lạnh + điều hoà (để gas ổn định)",
    "Lưu hoá đơn + phiếu bảo hành để hưởng chính sách bảo hành chính hãng",
  ],
  certifications: [
    "Thương hiệu Nhật Bản chính thống — Toshiba Corporation (từ 1875)",
    "Phân phối chính hãng tại VN qua Toshiba Lifestyle",
    "Nhãn năng lượng (Energy Label) theo quy định Bộ Công Thương VN",
    "Tiêu chuẩn chất lượng Nhật Bản — R&D Tokyo",
  ],
  packaging: [
    { label: "Đóng gói chuẩn", value: "Carton + xốp foam + dây đai chống va đập" },
    { label: "Bảo hành vận chuyển", value: "Bồi thường nếu lỗi do vận chuyển" },
    { label: "MOQ nhập khẩu", value: "1 container 20ft / 40ft HQ — mix SKU OK" },
    { label: "Bảo quản kho", value: "Nơi khô ráo, tránh ánh nắng, chồng theo khuyến nghị" },
  ],
  whyChoose: [
    {
      icon: "🇯🇵",
      title: "Công nghệ Nhật Bản từ 1875",
      desc: "Hơn 150 năm di sản. R&D Tokyo. Cha đẻ tủ lạnh + máy giặt + lò vi sóng đầu tiên của Nhật.",
    },
    {
      icon: "🏭",
      title: "Vận hành bởi Midea Group",
      desc: "Từ 2016, sức mạnh sản xuất + chuỗi cung ứng Midea giúp giá hợp lý hơn mà giữ chất lượng Nhật.",
    },
    {
      icon: "❄️",
      title: "Công nghệ giữ tươi + inverter",
      desc: "NaturePURE, PureBIO khử mùi diệt khuẩn; inverter tiết kiệm điện; gia công tinh xảo kiểu Nhật.",
    },
    {
      icon: "🛡️",
      title: "Bảo hành chính hãng VN",
      desc: "Phân phối chính hãng qua Toshiba Lifestyle + bảo hành DDP từ Huayue. Phụ tùng chính hãng đầy đủ.",
    },
  ],
  projectShowcase: [
    "Phân phối chính hãng toàn quốc qua hệ thống Toshiba Lifestyle Việt Nam",
    "Dải sản phẩm đầy đủ: điều hoà, tủ lạnh, máy giặt, bếp, lọc nước",
    "Phù hợp dự án căn hộ + khách sạn + nhà phố cần thương hiệu Nhật cao cấp",
    "Huayue cung cấp giải pháp DDP nhập khẩu + lắp đặt cho dự án số lượng lớn",
  ],
  faq: [
    {
      q: "Toshiba có còn là thương hiệu Nhật không sau khi Midea mua lại?",
      a: "Có. Midea mua 80.1% mảng điện gia dụng năm 2016 nhưng Toshiba giữ nguyên thương hiệu, R&D tại Tokyo, công nghệ lõi và tiêu chuẩn chất lượng Nhật Bản. Midea phụ trách sản xuất quy mô lớn + chuỗi cung ứng → giá hợp lý hơn mà chất lượng vẫn chuẩn Nhật.",
    },
    {
      q: "Bảo hành Toshiba ở Việt Nam thế nào?",
      a: "Phân phối chính hãng qua Toshiba Lifestyle với Trung tâm bảo hành toàn quốc (toshiba-lifestyle.com/vn/support). Huayue + Service Center kết hợp bảo hành tận nhà. Mỗi sản phẩm có link nguồn trên trang chi tiết để tra cứu thông số chính thức.",
    },
    {
      q: "Có giao hàng + lắp đặt tận nhà + báo giá DDP về VN không?",
      a: "Có. Huayue làm trọn gói: nhập khẩu chính ngạch → kho HN/HCM/Đà Nẵng → giao + lắp đặt tận nhà. Báo giá DDP (bao thuế + vận chuyển) trong 24h cho cả đơn lẻ và dự án container.",
    },
    {
      q: "MOQ + thời gian giao hàng?",
      a: "MOQ: 1 container 20ft (mix SKU OK). Hàng có sẵn: 7-10 ngày làm việc. Đặt theo dự án: 30-45 ngày. Đặt dự án lớn được ưu tiên lead time.",
    },
    {
      q: "Thông số kỹ thuật trên trang có chính xác không?",
      a: "Toàn bộ tên + mô tả + thông số + ảnh sản phẩm được lấy trực tiếp từ trang chính thức Toshiba Lifestyle Việt Nam (có link 'nguồn' trên mỗi trang chi tiết). Không chỉnh sửa, không bịa.",
    },
  ],
};

/** Mọi dòng sản phẩm Toshiba dùng chung brand story (thương hiệu thống nhất). */
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return TOSHIBA_BRAND;
}
