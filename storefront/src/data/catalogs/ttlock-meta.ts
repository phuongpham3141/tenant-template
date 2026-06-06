/**
 * Metadata khoá thông minh TTLock — trang chi tiết. Keyed by seriesOriginal (catKey).
 * Sourcing: ttlock.eu (nhà phân phối châu Âu). TTLock/Sciener (Thâm Quyến) — nền tảng khoá thông minh toàn cầu.
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
const CERTS = ["Chứng nhận an toàn điện tử quốc tế (CE)", "Bảo mật mã hoá dữ liệu (AES)", "RoHS — vật liệu an toàn", "Tương thích app TTLock & nền tảng Sciener"];
const MFG = [
  "TTLock / Sciener (Thâm Quyến) — nền tảng khoá thông minh toàn cầu (App + Cloud API + SDK)",
  "Hệ sinh thái: khoá cửa, tay gạt, ruột khoá, khoá treo, khoá motor, gateway WiFi",
  "Mở khoá đa phương thức: vân tay, mật mã, thẻ, app/Bluetooth, chìa cơ; cấp mã từ xa qua gateway",
  "Tích hợp quản lý khoá tập trung cho căn hộ cho thuê, khách sạn, văn phòng",
];
const PACK = [
  { label: "Đóng gói", value: "Hộp bán lẻ kèm phụ kiện lắp đặt & pin" },
  { label: "Phụ kiện kèm", value: "Ốc vít, chìa cơ, hướng dẫn (tuỳ sản phẩm)" },
  { label: "MOQ", value: "Theo lô; mix nhiều model OK" },
];
const INSTALL = [
  "Kiểm tra độ dày cửa & loại khoá (mortise/euro cylinder) tương thích trước khi đặt",
  "Lắp đặt theo hướng dẫn; kết nối app TTLock qua Bluetooth",
  "Cài vân tay/mật mã/thẻ; thêm gateway WiFi để điều khiển & cấp mã từ xa",
  "Kiểm tra mở/khoá & pin trước khi bàn giao",
];
const CARE = [
  { title: "Pin", desc: "Dùng pin chất lượng; thay khi app báo yếu. Một số model có nguồn khẩn cấp." },
  { title: "App & bảo mật", desc: "Cập nhật app TTLock; cấp/thu hồi mã eKey từ xa; xoá mã tạm sau khi dùng." },
  { title: "Vệ sinh", desc: "Lau cảm biến vân tay & bàn phím bằng khăn mềm khô; tránh nước/hoá chất mạnh." },
];
const FAQ = [
  { q: "TTLock điều khiển từ xa được không?", a: "Có, khi thêm Gateway WiFi — cấp mã, mở khoá & xem lịch sử ra vào từ xa qua app TTLock." },
  { q: "Phù hợp quản lý căn hộ cho thuê/khách sạn?", a: "Rất phù hợp — cấp mã một lần/theo thời gian cho khách, quản lý tập trung nhiều khoá." },
  { q: "MOQ & thời gian giao?", a: "Tính theo lô; lịch giao báo theo đơn." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "📲", title: "Hệ sinh thái TTLock", desc: "App + gateway: cấp mã & quản lý từ xa, tích hợp nhiều khoá." };
const SHOW = ["Căn hộ cho thuê / Airbnb", "Khách sạn, văn phòng", "Nhà ở thông minh"];
const LOCK = mk({
  story: "Khoá cửa thông minh TTLock (ENTR, RIO...) — mở bằng vân tay, mật mã, thẻ, app/Bluetooth & chìa cơ; cấp mã từ xa khi có gateway, lịch sử ra vào.",
  heritage: "Dòng khoá cửa là sản phẩm lõi của hệ sinh thái TTLock.",
  technicalSpecs: [{ label: "Loại", value: "Khoá cửa điện tử thông minh" }, { label: "Mở khoá", value: "Vân tay, mật mã, thẻ, app/Bluetooth, chìa cơ" }, { label: "Điều khiển từ xa", value: "Qua Gateway WiFi (app TTLock)" }, { label: "Nguồn", value: "Pin + cổng khẩn cấp (tuỳ model)" }],
  whyChoose: [WHY, { icon: "🔐", title: "Đa phương thức", desc: "Nhiều cách mở khoá tiện lợi & an toàn." }, { icon: "🏨", title: "Cho cho thuê", desc: "Cấp mã theo thời gian cho khách, quản lý tập trung." }],
  projectShowcase: SHOW,
});
export const TTLOCK_SERIES_META: Record<string, SeriesMeta> = {
  "smart-lock": LOCK, deadbolt: LOCK, other: LOCK,
  lever: mk({
    story: "Khoá tay gạt thông minh TTLock (Handle) — tay gạt tích hợp mở vân tay/mật mã/thẻ/app, phù hợp cửa phòng & cửa chính.",
    heritage: "Tay gạt thông minh cho giải pháp khoá gọn & tiện.",
    technicalSpecs: [{ label: "Loại", value: "Khoá tay gạt thông minh" }, { label: "Mở khoá", value: "Vân tay, mật mã, thẻ, app, chìa cơ" }, { label: "Ứng dụng", value: "Cửa phòng, cửa chính" }],
    whyChoose: [WHY, { icon: "🚪", title: "Tay gạt tiện", desc: "Đóng mở bằng tay gạt, phù hợp nhiều cửa." }],
    projectShowcase: SHOW,
  }),
  cylinder: mk({
    story: "Ruột khoá thông minh TTLock (Euro Cylinder) — thay ruột khoá cửa thường thành khoá thông minh, mở app/mật mã/chìa, không đổi cả bộ khoá.",
    heritage: "Ruột khoá thông minh nâng cấp khoá cũ dễ dàng.",
    technicalSpecs: [{ label: "Loại", value: "Ruột khoá thông minh (Euro cylinder)" }, { label: "Mở khoá", value: "App/Bluetooth, mật mã (model có keypad), chìa cơ" }, { label: "Ứng dụng", value: "Thay ruột khoá euro tiêu chuẩn" }],
    whyChoose: [WHY, { icon: "♻️", title: "Nâng cấp dễ", desc: "Chỉ thay ruột khoá, không đổi cả bộ." }],
    projectShowcase: SHOW,
  }),
  padlock: mk({
    story: "Khoá treo thông minh TTLock (Padlock) — mở bằng vân tay/app, chống nước, cho cổng, tủ, kho, xe.",
    heritage: "Khoá treo thông minh cho ứng dụng di động & ngoài trời.",
    technicalSpecs: [{ label: "Loại", value: "Khoá treo (padlock) thông minh" }, { label: "Mở khoá", value: "Vân tay / app Bluetooth" }, { label: "Đặc tính", value: "Chống nước, pin sạc" }],
    whyChoose: [WHY, { icon: "🔒", title: "Linh hoạt", desc: "Cho cổng, tủ, kho, xe — mở không cần chìa." }],
    projectShowcase: SHOW,
  }),
  outdoor: mk({
    story: "Khoá ngoài trời / cổng TTLock — chống chịu thời tiết, mở app/mật mã cho cổng, sân, khu ngoài trời.",
    heritage: "Dòng ngoài trời chịu môi trường khắc nghiệt.",
    technicalSpecs: [{ label: "Loại", value: "Khoá ngoài trời / cổng" }, { label: "Đặc tính", value: "Chống nước, chịu thời tiết" }, { label: "Mở khoá", value: "App, mật mã" }],
    whyChoose: [WHY, { icon: "🌧️", title: "Chịu thời tiết", desc: "Bền với mưa nắng cho cổng & khu ngoài trời." }],
    projectShowcase: SHOW,
  }),
  motorlock: mk({
    story: "Khoá motor TTLock — khoá điện tử cho cửa kính/nhôm, tích hợp motor đóng/mở tự động điều khiển qua app.",
    heritage: "Khoá motor cho cửa thương mại & cửa kính hiện đại.",
    technicalSpecs: [{ label: "Loại", value: "Khoá motor (cửa kính/nhôm)" }, { label: "Đặc tính", value: "Đóng/mở motor tự động" }, { label: "Mở khoá", value: "App, mật mã, thẻ" }],
    whyChoose: [WHY, { icon: "⚙️", title: "Motor tự động", desc: "Đóng/mở êm, phù hợp cửa kính thương mại." }],
    projectShowcase: SHOW,
  }),
  gateway: mk({
    story: "Gateway / phụ kiện TTLock — cầu nối WiFi cho khoá Bluetooth, giúp điều khiển & cấp mã từ xa, mở rộng hệ thông minh.",
    heritage: "Gateway là trung tâm kết nối từ xa của hệ TTLock.",
    technicalSpecs: [{ label: "Loại", value: "Gateway WiFi / phụ kiện" }, { label: "Chức năng", value: "Cầu nối Bluetooth ↔ WiFi điều khiển từ xa" }, { label: "Tương thích", value: "Khoá TTLock" }],
    whyChoose: [{ icon: "📡", title: "Điều khiển từ xa", desc: "Biến khoá Bluetooth thành điều khiển được qua app." }, WHY],
    projectShowcase: SHOW,
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TTLOCK_SERIES_META[seriesOriginal.trim()] || TTLOCK_SERIES_META["smart-lock"];
}
