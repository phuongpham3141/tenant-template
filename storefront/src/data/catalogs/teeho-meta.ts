/**
 * Metadata khoá thông minh TEEHO — trang chi tiết. Keyed by seriesOriginal (catKey).
 * Sourcing: teeho.com (Shopify). Khoá cửa điện tử/thông minh xuất khẩu (chủ yếu thị trường Mỹ).
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
const CERTS = ["Chứng nhận an toàn điện tử quốc tế", "Tiêu chuẩn khoá cửa dân dụng (ANSI/BHMA tham chiếu)", "RoHS — vật liệu an toàn", "Bảo mật mã hoá dữ liệu vân tay/mật khẩu"];
const MFG = [
  "TEEHO — thương hiệu khoá cửa thông minh/điện tử, phân phối qua kênh D2C/B2B (Shopify, thị trường Mỹ)",
  "Dải sản phẩm: khoá chốt bàn phím, khoá tay gạt, bộ tay nắm, khoá WiFi/Bluetooth, gateway",
  "Mở khoá đa phương thức: vân tay, mật mã, thẻ/app, chìa cơ dự phòng",
  "Kiểm soát chất lượng & bảo mật theo tiêu chuẩn khoá điện tử dân dụng",
];
const PACK = [
  { label: "Đóng gói", value: "Hộp bán lẻ kèm phụ kiện lắp đặt & pin" },
  { label: "Phụ kiện kèm", value: "Ốc vít, chìa cơ dự phòng, hướng dẫn, (pin)" },
  { label: "MOQ", value: "Theo lô/container; mix nhiều model OK" },
];
const INSTALL = [
  "Phù hợp cửa tiêu chuẩn (độ dày & khoảng backset thông dụng); kiểm tra trước khi đặt",
  "Lắp đặt tự làm (DIY) với tua-vít theo hướng dẫn; không cần đi dây",
  "Cài đặt vân tay/mật mã & kết nối app (dòng WiFi/Bluetooth) sau khi lắp",
  "Kiểm tra mở/khoá, tự động khoá, pin trước khi bàn giao",
];
const CARE = [
  { title: "Pin", desc: "Dùng pin AA chất lượng; thay khi báo yếu. Có cổng nguồn khẩn cấp (tuỳ model)." },
  { title: "Vệ sinh", desc: "Lau cảm biến vân tay & bàn phím bằng khăn mềm khô; tránh nước/hoá chất mạnh." },
  { title: "Bảo mật", desc: "Đổi mật mã định kỳ, xoá mã tạm sau khi dùng; cập nhật app (dòng WiFi)." },
];
const FAQ = [
  { q: "Khoá TEEHO lắp được cho cửa Việt Nam không?", a: "Phù hợp cửa tiêu chuẩn theo độ dày & backset; vui lòng xác nhận thông số cửa theo từng model trước khi đặt." },
  { q: "Có chìa cơ dự phòng & nguồn khẩn cấp không?", a: "Phần lớn model có chìa cơ dự phòng và/hoặc cổng nguồn khẩn cấp; chi tiết theo từng sản phẩm." },
  { q: "MOQ & thời gian giao?", a: "Tính theo lô; lịch giao báo theo đơn." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🔐", title: "Mở khoá đa phương thức", desc: "Vân tay, mật mã, thẻ/app & chìa cơ dự phòng — tiện lợi & an toàn." };
const SHOW = ["Nhà ở, căn hộ, biệt thự", "Văn phòng, homestay/Airbnb", "Dự án bàn giao nhà thông minh"];
const DEADBOLT = mk({
  story: "Khoá chốt bàn phím TEEHO (TE001/TE002) — khoá chốt điện tử mở bằng vân tay & mật mã, chìa cơ dự phòng, lắp DIY không đi dây, tự động khoá.",
  heritage: "Dòng deadbolt là sản phẩm phổ thông nhất của TEEHO cho cửa ra vào.",
  technicalSpecs: [{ label: "Loại", value: "Khoá chốt (deadbolt) điện tử" }, { label: "Mở khoá", value: "Vân tay, mật mã, chìa cơ" }, { label: "Lắp đặt", value: "DIY, không đi dây" }, { label: "Nguồn", value: "Pin AA + cổng khẩn cấp (tuỳ model)" }],
  whyChoose: [WHY, { icon: "🛠️", title: "Lắp DIY dễ", desc: "Tự lắp bằng tua-vít, phù hợp cửa tiêu chuẩn." }, { icon: "🔄", title: "Tự động khoá", desc: "Tự khoá sau khi đóng, an tâm không quên." }],
  projectShowcase: SHOW,
});
const WIFI = mk({
  story: "Khoá WiFi thông minh TEEHO (TE011W/TE012W) — điều khiển & cấp mã từ xa qua app, lịch sử ra vào, tích hợp trợ lý ảo, mở bằng vân tay/mật mã/app/chìa.",
  heritage: "Dòng WiFi mang khoá TEEHO vào hệ sinh thái nhà thông minh.",
  technicalSpecs: [{ label: "Loại", value: "Khoá thông minh WiFi" }, { label: "Kết nối", value: "WiFi (một số kèm Bluetooth)" }, { label: "Điều khiển", value: "App từ xa, cấp/khoá mã, lịch sử" }, { label: "Mở khoá", value: "Vân tay, mật mã, app, chìa cơ" }],
  whyChoose: [WHY, { icon: "📱", title: "Điều khiển từ xa", desc: "Cấp mã & mở khoá qua app mọi lúc mọi nơi." }, { icon: "🗣️", title: "Nhà thông minh", desc: "Tích hợp trợ lý ảo (Alexa/Google tuỳ model)." }],
  projectShowcase: SHOW,
});
export const TEEHO_SERIES_META: Record<string, SeriesMeta> = {
  "keypad-deadbolt": DEADBOLT,
  "lever-lock": mk({
    story: "Khoá tay gạt bàn phím TEEHO (TE001L/TE002L/TE003/TE004) — khoá tay gạt điện tử cho cửa phòng/cửa chính, mở vân tay & mật mã, chìa cơ dự phòng.",
    heritage: "Dòng tay gạt phù hợp cửa cần tay nắm thay vì chốt đơn.",
    technicalSpecs: [{ label: "Loại", value: "Khoá tay gạt (lever) điện tử" }, { label: "Mở khoá", value: "Vân tay, mật mã, chìa cơ" }, { label: "Ứng dụng", value: "Cửa phòng, cửa chính, văn phòng" }],
    whyChoose: [WHY, { icon: "🚪", title: "Tay gạt tiện lợi", desc: "Đóng mở bằng tay gạt, phù hợp nhiều loại cửa." }, { icon: "🔑", title: "Chìa dự phòng", desc: "Có chìa cơ khi cần, an tâm sử dụng." }],
    projectShowcase: SHOW,
  }),
  "handle-set": mk({
    story: "Bộ khoá tay nắm TEEHO (TE001K/TE002K/TE001H) — combo chốt deadbolt + tay nắm/handle set đồng bộ cho cửa chính, mở vân tay & mật mã.",
    heritage: "Bộ handle set mang lại vẻ ngoài hoàn chỉnh & an ninh kép cho cửa chính.",
    technicalSpecs: [{ label: "Loại", value: "Bộ chốt + tay nắm (handle set)" }, { label: "Mở khoá", value: "Vân tay, mật mã, chìa cơ" }, { label: "Ứng dụng", value: "Cửa chính, mặt tiền" }],
    whyChoose: [WHY, { icon: "🏠", title: "An ninh kép", desc: "Chốt deadbolt + tay nắm đồng bộ cho cửa chính." }, { icon: "✨", title: "Thẩm mỹ", desc: "Bộ hoàn chỉnh, mặt ngoài sang trọng." }],
    projectShowcase: SHOW,
  }),
  "wifi-lock": WIFI, "wifi-handle": WIFI,
  "smart-handle": mk({
    story: "Tay nắm thông minh TEEHO (TE018) — tay nắm cửa tích hợp vân tay/mật mã, gọn gàng cho cửa phòng.",
    heritage: "Tay nắm thông minh cho giải pháp khoá gọn nhẹ.",
    technicalSpecs: [{ label: "Loại", value: "Tay nắm thông minh" }, { label: "Mở khoá", value: "Vân tay, mật mã, chìa cơ" }, { label: "Ứng dụng", value: "Cửa phòng" }],
    whyChoose: [WHY, { icon: "🤚", title: "Gọn nhẹ", desc: "Tay nắm tích hợp khoá, lắp gọn cho cửa phòng." }],
    projectShowcase: SHOW,
  }),
  gateway: mk({
    story: "Gateway TEEHO (G1) — bộ kết nối/hub giúp các khoá Bluetooth điều khiển từ xa qua WiFi, mở rộng tính năng nhà thông minh.",
    heritage: "Gateway là phụ kiện mở rộng kết nối cho hệ khoá TEEHO.",
    technicalSpecs: [{ label: "Loại", value: "Gateway / Hub kết nối" }, { label: "Chức năng", value: "Cầu nối Bluetooth ↔ WiFi điều khiển từ xa" }, { label: "Tương thích", value: "Khoá TEEHO hỗ trợ gateway" }],
    whyChoose: [{ icon: "📡", title: "Điều khiển từ xa", desc: "Biến khoá Bluetooth thành điều khiển được qua app từ xa." }, WHY],
    projectShowcase: SHOW,
  }),
  other: DEADBOLT,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TEEHO_SERIES_META[seriesOriginal.trim()] || TEEHO_SERIES_META["keypad-deadbolt"];
}
