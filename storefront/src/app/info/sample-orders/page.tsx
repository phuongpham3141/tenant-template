import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const HERO_STATS = [
  { n: "8-12", l: "Ngày từ đặt đến nhận tay", icon: "⏱" },
  { n: "$30-200", l: "Phí mẫu (hoàn khi MOQ)", icon: "💰" },
  { n: "100%", l: "Hoàn phí khi đặt MOQ", icon: "↩" },
  { n: "4%", l: "Tỷ lệ khiếu nại sau khi đặt mẫu (vs 22% nếu không)", icon: "📉" },
];

const WHY_REASONS = [
  {
    icon: "🤲",
    title: "Cảm nhận chất liệu thật",
    desc: "Ảnh studio dùng đèn 5,500K + retouching không thể thay thế được trải nghiệm cầm trên tay. Trọng lượng, độ mịn, độ đàn hồi, độ dày — chỉ có sample mới cho biết.",
  },
  {
    icon: "📐",
    title: "Đo kích thước chính xác",
    desc: "Dimension trên website thường có sai số 2-5 mm so với production thực. Đặt sample để đo bằng thước cặp, kiểm tolerance — tránh lỗi packaging sau này khi đóng container.",
  },
  {
    icon: "🌈",
    title: "Kiểm tra màu sắc dưới ánh sáng tự nhiên",
    desc: "Màu trên screen RGB ≠ màu thực CMYK ≠ màu Pantone. Đặc biệt với gỗ, vải, gốm — sai biệt vân/màu dưới ánh sáng phòng và ánh nắng có thể khác 5-15%.",
  },
  {
    icon: "📦",
    title: "Đánh giá packaging tiêu chuẩn",
    desc: "Carton có chống va đập? Có corner protector? Bubble wrap đủ lớp? Label có chuẩn xuất khẩu (FRAGILE, đa ngôn ngữ)? Sample cho thấy chuẩn đóng gói thật của NCC.",
  },
  {
    icon: "📜",
    title: "Verify giấy tờ kèm theo",
    desc: "Manual có dịch tiếng Việt không? Certificate kèm là bản gốc hay copy mờ? Có hoá đơn? Có warranty card? Mức độ chuyên nghiệp của paperwork phản ánh maturity NCC.",
  },
  {
    icon: "🛡",
    title: "Test compliance trước MOQ",
    desc: "Sample có thể gửi lab độc lập (SGS/BV) test heavy metals, formaldehyde, formaldehyde, durability. Pass test = tự tin khi đặt 50K USD MOQ — không pass = đổi NCC.",
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    icon: "🔍",
    title: "Tìm sản phẩm & request sample",
    duration: "5 phút",
    color: "#0E7490",
    desc: "Trên trang chi tiết sản phẩm, click nút 'Yêu cầu mẫu' — form auto-fill productId, NCC info, MOQ price tham chiếu. Buyer chỉ cần điền địa chỉ giao hàng và lựa chọn variant nếu cần.",
    actions: [
      "Click 'Yêu cầu mẫu' trên product detail",
      "Hoặc gửi qua RFQ form (multi-product)",
      "Hoặc copy SKU sang inquiry chat với quản lý tài khoản",
    ],
  },
  {
    n: "02",
    icon: "⚙️",
    title: "Configure mẫu — variant / OEM",
    duration: "10-15 phút",
    color: "#7C3AED",
    desc: "Chọn loại mẫu phù hợp: Standard (như catalog) miễn phí mock-up · Variant (màu/size khác) +$0-50 · OEM (logo/brand custom) +$80-300 mock-up fee. CSR quản lý tài khoản review configure trong 2-4 giờ trước khi forward NCC.",
    actions: [
      "Standard: 1 mẫu chuẩn từ NCC, không tuỳ chỉnh",
      "Variant: chọn màu/size khác trong catalog NCC",
      "OEM: upload logo file (vector .ai/.svg), spec brand colors Pantone",
      "Multi-supplier: yêu cầu từ 3-5 NCC để so sánh",
    ],
  },
  {
    n: "03",
    icon: "💳",
    title: "Thanh toán phí mẫu vào tài khoản trung gian",
    duration: "1-3 giờ",
    color: "#16A34A",
    desc: "Phí $30-200 + ship $20-40 thanh toán qua tài khoản trung gian CSR (Vietcombank/BIDV) — không chuyển trực tiếp NCC. Giữ nguyên Bảo đảm Giao dịch: nếu sample bị NCC giao sai, refund 100% qua tài khoản trung gian.",
    actions: [
      "Phương thức: TT bank wire / VietQR / thẻ tín dụng",
      "Mã đơn unique generated cho từng sample order",
      "Ghi chú: Phí mẫu 100% sẽ được hoàn khi đặt MOQ với cùng NCC",
    ],
  },
  {
    n: "04",
    icon: "🏭",
    title: "NCC sản xuất sample",
    duration: "3-7 ngày",
    color: "#92400E",
    desc: "NCC nhận order, bắt đầu chuẩn bị mẫu. Standard sample lấy từ kho thành phẩm (1-2 ngày). Variant cần custom chạy từng cái (3-5 ngày). OEM cần làm khuôn/in logo (5-10 ngày). NCC update tiến độ qua dashboard với ảnh production.",
    actions: [
      "Buyer nhận thông báo khi NCC accept order",
      "Update tiến độ ảnh + video qua Zalo OA / dashboard",
      "Buyer có thể chat trực tiếp NCC qua CSR (có translator)",
      "Yêu cầu video call để xem mock-up trước khi finalize",
    ],
  },
  {
    n: "05",
    icon: "📦",
    title: "Trung tâm Mẫu gom hàng tại Quảng Châu",
    duration: "1-3 ngày",
    color: "#A21CAF",
    desc: "NCC ship sample về kho CSR Trung tâm Mẫu tại Quảng Châu (cách Foshan 25 km, Đông Quan 80 km — đa số NCC đã ký giao trong 24-48h). CSR gom 8-15 sample mỗi tuần thành 1 master shipment air về Hà Nội — tiết kiệm 50-60% cước cho buyer.",
    actions: [
      "Trung tâm Mẫu mở thứ 2 - thứ 6, ship batch thứ 6 hàng tuần",
      "Mỗi sample được tag QR code cho tracking riêng",
      "Trung tâm Mẫu kiểm sơ bộ: đúng SKU, đúng variant, packaging chuẩn xuất khẩu",
      "Buyer nhận thông báo khi hàng mẫu về Trung tâm Mẫu",
    ],
  },
  {
    n: "06",
    icon: "✈️",
    title: "Air shipment + last-mile VN",
    duration: "3-5 ngày",
    color: "#DC2626",
    desc: "Master shipment qua DHL/FedEx/UPS air (4-5 ngày Quảng Châu → Hà Nội), thông quan tại Nội Bài hoặc Tân Sơn Nhất, sau đó forward last-mile bằng GHN/J&T đến tận tay buyer. Tổng thời gian giao 8-12 ngày từ lúc đặt.",
    actions: [
      "Tracking realtime qua Zalo OA + email",
      "Customs clearance: sample <$200 = commercial sample, miễn VAT",
      "Last-mile: 24-48h cho HN/HCM, 2-4 ngày cho tỉnh xa",
      "Buyer ký nhận → đóng order → bắt đầu inspection",
    ],
  },
];

const SAMPLE_TYPES = [
  {
    type: "Standard",
    color: "#0E7490",
    icon: "📦",
    fee: "$30-100",
    leadtime: "8-10 ngày",
    desc: "Mẫu giống hệt catalog, không tuỳ chỉnh. Phù hợp khi buyer muốn verify chất lượng baseline trước khi đặt MOQ chuẩn.",
    bestFor: "Lần đầu sourcing với NCC mới · Verify chất lượng baseline · Test packaging tiêu chuẩn",
    pros: ["Rẻ nhất, nhanh nhất", "NCC lấy từ kho thành phẩm sẵn", "Mock-up fee = $0"],
    cons: ["Không tuỳ chỉnh được", "Có thể không match exact màu/size buyer cần"],
  },
  {
    type: "Variant",
    color: "#7C3AED",
    icon: "🎨",
    fee: "$50-150",
    leadtime: "10-12 ngày",
    desc: "Chọn màu / size / vật liệu khác trong catalog NCC nhưng chưa OEM. Phù hợp khi buyer cần verify một variant cụ thể trước MOQ.",
    bestFor: "Verify variant cụ thể · So sánh 2-3 màu cùng SKU · Test size đặc biệt",
    pros: ["Sát với MOQ thực tế hơn Standard", "NCC chạy custom 3-5 cái", "Full Bảo đảm Giao dịch protection"],
    cons: ["Đắt hơn Standard 30-50%", "Thời gian giao +2-3 ngày", "Một số NCC từ chối nếu MOQ variant >1000"],
  },
  {
    type: "OEM",
    color: "#A21CAF",
    icon: "🏷",
    fee: "$80-300 + mock-up",
    leadtime: "12-21 ngày",
    desc: "Custom logo brand riêng, custom màu Pantone, có thể custom packaging. Đây là sample bắt buộc trước khi đặt OEM MOQ — không skip được.",
    bestFor: "OEM brand riêng · Test logo printing chất lượng · Custom packaging · Private label",
    pros: ["Sản phẩm hoàn chỉnh có brand buyer", "Có thể chụp ảnh marketing trước MOQ", "Verify khả năng OEM thực của NCC"],
    cons: ["Đắt nhất, lâu nhất", "Mock-up fee 80-300 USD không hoàn ngay (chỉ khi MOQ)", "Cần file logo vector chuẩn"],
  },
];

const COST_TABLE = [
  { item: "Phí sample (Standard)", range: "$30-100", note: "Tuỳ ngành — gốm sứ rẻ nhất, điện tử đắt nhất" },
  { item: "Phí sample (Variant)", range: "$50-150", note: "Cộng 30-50% so với Standard cho custom màu/size" },
  { item: "Phí sample (OEM)", range: "$80-300", note: "Cộng phí mock-up logo $80-300" },
  { item: "Phí vận chuyển Trung tâm Mẫu → VN (gộp)", range: "$20-40", note: "Per sample khi gom batch. Tiết kiệm 50-60% so với ship riêng" },
  { item: "Phí ship riêng (express)", range: "$60-120", note: "Nếu buyer cần gấp, không gom batch" },
  { item: "Last-mile nội địa VN", range: "$2-5", note: "GHN/J&T tới tận kho buyer, đã include trong ship fee" },
  { item: "Gói đăng ký mẫu", range: "$99/tháng", note: "Mẫu không giới hạn, chỉ trả phí sản phẩm — cho buyer >5 sample/tháng" },
  { item: "Customs duty / VAT", range: "$0", note: "Sample <$200 = commercial sample, miễn theo NĐ 134/2016" },
];

const PRE_MOQ_CHECKLIST = [
  {
    category: "Vật liệu",
    icon: "🧪",
    items: [
      "Trọng lượng thực tế đo bằng cân điện tử (so với spec)",
      "Độ dày material đo bằng thước cặp (caliper) tại 5 điểm khác nhau",
      "Test bend/scratch — material có dễ bị xước, gãy không?",
      "(Optional) Gửi lab SGS test heavy metals + formaldehyde — $200-450",
    ],
  },
  {
    category: "Kích thước",
    icon: "📐",
    items: [
      "Đo full dimension theo spec PO (length × width × height)",
      "Kiểm tolerance: ±2 mm cho hàng hardware, ±5 mm cho hàng gỗ, ±1 mm cho electronics",
      "Đo 3-5 điểm khác nhau trên 1 sample để verify consistency",
      "So với mẫu OEM gửi lần trước (nếu reorder)",
    ],
  },
  {
    category: "Hoàn thiện & Màu",
    icon: "🎨",
    items: [
      "Kiểm tra finish: smooth/matte/glossy — đúng spec PI?",
      "Kiểm màu dưới 3 điều kiện: phòng (3000K) + ánh nắng (5500K) + đèn LED trắng (4000K)",
      "Verify Pantone color value bằng spectrophotometer hoặc color card vật lý",
      "Kiểm xem có scratch, dent, defect bề mặt không",
    ],
  },
  {
    category: "Packaging",
    icon: "📦",
    items: [
      "Carton có đủ độ cứng? Test bằng cách ấn từ trên xuống",
      "Có corner protector cho hàng fragile?",
      "Bubble wrap / foam — đủ lớp bảo vệ?",
      "Label có đa ngôn ngữ (Trung-Anh-Việt)? Có FRAGILE, THIS SIDE UP, MAX STACK?",
    ],
  },
  {
    category: "Tài liệu & Cert",
    icon: "📜",
    items: [
      "Manual có tiếng Việt hoặc tiếng Anh? Có chỉ dẫn an toàn?",
      "Certificate (CE/FCC/RoHS/CB) — bản gốc hay scan? Có verify QR code?",
      "Hoá đơn / Commercial Invoice có đầy đủ HS code, FOB price, weight?",
      "Test report SGS/BV nếu có — verify trên portal lab độc lập",
    ],
  },
];

const SAMPLE_SUB_FEATURES = [
  { icon: "♾", title: "Mẫu không giới hạn", desc: "Không giới hạn số sample/tháng — chỉ trả phí sản phẩm" },
  { icon: "🚀", title: "Priority shipping", desc: "Sample của bạn được ưu tiên gom batch 2 lần/tuần thay vì 1 lần" },
  { icon: "🤝", title: "Quản lý chuyên trách", desc: "Quản lý tài khoản riêng phụ trách sample order, response 4 giờ" },
  { icon: "📞", title: "Video call NCC free", desc: "Lên lịch video call review mock-up với NCC qua dispatcher CSR" },
  { icon: "📊", title: "Dashboard tracking", desc: "Theo dõi tất cả sample đang chạy, ETA, supplier comparison" },
  { icon: "↩", title: "Hoàn 100% khi MOQ", desc: "Toàn bộ phí sample của tháng được hoàn khi đặt MOQ ≥$5K" },
];

const PITFALLS = [
  {
    icon: "🚫",
    title: "Tự liên hệ NCC trực tiếp để giảm phí",
    why: "Mất Bảo đảm Giao dịch protection, không có translator chuyên ngành, không tận dụng được Trung tâm Mẫu gom hàng. Tiết kiệm $20-40 nhưng rủi ro cao hơn.",
  },
  {
    icon: "⚠️",
    title: "Đặt sample của 1 NCC duy nhất rồi đặt MOQ ngay",
    why: "Không có baseline so sánh. Best practice: đặt sample 3-5 NCC cùng SKU, so sánh chất lượng + giá + thời gian giao, rồi mới đặt MOQ với NCC tốt nhất.",
  },
  {
    icon: "🔇",
    title: "Không kiểm sample kỹ trước khi đặt MOQ",
    why: "Sample đẹp nhưng MOQ chạy line khác có thể khác đáng kể. Đầu tư 1-2 giờ đo + chụp ảnh + lab test sample = tránh thiệt hại $50K+ khi MOQ.",
  },
  {
    icon: "💸",
    title: "Tiếc $80-300 mock-up cho mẫu OEM",
    why: "OEM không sample = đặt mù. Logo có thể in lệch, màu có thể không đúng Pantone, packaging có thể không in được — phát hiện sau khi đã production 5,000 đơn vị thì quá muộn.",
  },
  {
    icon: "📵",
    title: "Bỏ qua video call review mock-up",
    why: "Free service nhưng nhiều buyer skip. 15 phút video call với NCC trước khi finalize sample có thể tránh sai sót cơ bản (logo size, colour mode, font).",
  },
  {
    icon: "📅",
    title: "Đặt sample sát ngày Tết / Quốc Khánh TQ",
    why: "Tết Trung Quốc (Spring Festival) tháng 1-2 → NCC nghỉ 7-15 ngày. Quốc Khánh đầu tháng 10 → 7 ngày. Thời gian giao có thể tăng gấp đôi. Plan trước 4-6 tuần.",
  },
];

const FAQ = [
  {
    q: "Tôi có thể đặt sample không qua CSR, trực tiếp với NCC được không?",
    a: "Có thể về kỹ thuật, nhưng không khuyến nghị. Tự đặt với NCC: phải đàm phán bằng tiếng Trung, trả cước air đầy đủ ($60-120 thay vì $20-40), không có Bảo đảm Giao dịch protection (NCC giao sai sample = mất tiền), không có dispatcher CSR theo dõi tiến độ. Qua CSR rẻ hơn 30-50% và an toàn hơn — đó là giá trị của Trung tâm Mẫu.",
  },
  {
    q: "Sample khác hàng MOQ như thế nào?",
    a: "Mẫu chuẩn (Standard) là sản phẩm được lấy từ kho thành phẩm hoặc chạy thử trên line nhỏ — về cơ bản giống hàng MOQ. Tuy nhiên, một số NCC làm sample bằng máy thủ công (sample line) thay vì line production tự động → có thể có khác biệt nhỏ về finish và độ đồng nhất. Khi đặt MOQ, CSR luôn QC trước xuất xưởng (pre-shipment inspection AQL 2.5) để đảm bảo MOQ đồng nhất với sample đã ký.",
  },
  {
    q: "Tôi có thể yêu cầu sample của nhiều NCC cùng lúc để so sánh không?",
    a: "Hoàn toàn nên. Best practice của professional buyer: 'Mẫu đa nhà cung cấp' — đặt 3-5 mẫu cùng SKU từ các NCC khác nhau qua RFQ trên CSR. Trung tâm Mẫu gộp tất cả vào 1 master shipment air về VN, buyer nhận được trong cùng 1 ngày để so sánh trực tiếp. Phí ship vẫn chỉ $20-40/sample (gộp), không phải $60-120 nếu ship riêng từng NCC.",
  },
  {
    q: "Phí sample 100% được hoàn khi MOQ — cụ thể như thế nào?",
    a: "Khi buyer đặt MOQ với cùng NCC trong vòng 90 ngày kể từ khi nhận sample, toàn bộ phí sample (sản phẩm + mock-up cho OEM, KHÔNG bao gồm phí ship) được trừ thẳng vào hoá đơn MOQ. Ví dụ: bạn trả $250 sample fee + $30 ship → đặt MOQ $5,000 → chỉ phải trả $4,750 (250 được trừ). Phí ship $30 không hoàn vì đó là chi phí logistics đã phát sinh.",
  },
  {
    q: "Sample có phải đóng thuế / VAT khi nhập về Việt Nam không?",
    a: "Không, nếu giá trị sample dưới $200 USD. Theo NĐ 134/2016/NĐ-CP về quản lý thuế xuất nhập khẩu, hàng mẫu thương mại (commercial sample) trị giá dưới $200 được miễn thuế nhập khẩu và VAT. CSR khai báo sample là 'Commercial Sample, No Commercial Value' với giá trị thực để qua customs nhanh. Trên $200, áp dụng thuế nhập khẩu + VAT 10% bình thường.",
  },
  {
    q: "Gói đăng ký mẫu $99/tháng có đáng không?",
    a: "Có, cho buyer đặt >5 sample/tháng. Ví dụ: trader sourcing nhiều SKU mới mỗi tháng, cửa hàng thiết kế đặt sample để show client, buying agent cho dealer cấp 2. Một sample đơn lẻ tốn $50-150 phí sản phẩm + $20-40 ship → 5 sample = $350-950. Subscription chỉ $99 + phí sản phẩm, save 70%+. Cho buyer thường xuyên, trở thành ROI rõ ràng từ tháng thứ 2.",
  },
  {
    q: "Tôi đã nhận sample, kiểm thấy đẹp — nên đặt MOQ ngay hay chờ test thêm?",
    a: "Khuyến nghị test thêm 7-14 ngày trước khi đặt MOQ. Cụ thể: (1) Test durability — sample chịu được sử dụng thực tế trong 1 tuần không? (2) Test với khách hàng cuối — show sample cho 3-5 khách potential, nhận feedback. (3) Lab test (optional, $200-450) cho material safety nếu sản phẩm cho trẻ em / food contact / electrical. (4) Verify NCC còn capacity và thời gian giao MOQ. Đầu tư 2 tuần này tránh được 90% rủi ro MOQ.",
  },
  {
    q: "Nếu sample bị hỏng trong vận chuyển — sao xử lý?",
    a: "CSR ship sample qua DHL/FedEx/UPS với insurance đầy đủ. Nếu sample bị hỏng do shipping (carton ướt, đổ, móp): buyer chụp ảnh + biên bản tại lúc nhận, gửi qua dispute@cybersilkroads.com. Bảo đảm Giao dịch refund 100% phí sample (gồm ship) trong 5-7 ngày làm việc. NCC ship sample mới miễn phí với thời gian giao 5-7 ngày. Sự cố này hiếm — tỷ lệ <1% trong 2025.",
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

export default function DatMauPage() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Thông tin", href: "/help" },
          { label: "Đặt mẫu (Sample Order)" },
        ]}
      />

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
            📦 ĐẶT MẪU
          </span>
          <h1 className="text-[40px] font-extrabold leading-[1.1] mb-4 max-md:text-[26px]">
            $50 phí sample — bảo hiểm rẻ nhất<br />
            <span className="text-gold">cho 50,000 USD MOQ tiếp theo</span>
          </h1>
          <p className="text-[15px] opacity-90 max-w-[780px] leading-relaxed mb-7 max-md:text-[13px]">
            Đặt mẫu là bước không thể bỏ qua khi sourcing lần đầu với NCC. Theo dữ liệu CSR 2025: <b className="text-gold">22% đơn MOQ không đặt sample</b> trước có khiếu nại chất lượng — con số này <b className="text-gold">giảm xuống 4% khi buyer đặt sample</b>. Trung tâm Mẫu tại Quảng Châu gom shipping tiết kiệm 50-60% cước, thời gian giao 8-12 ngày, hoàn 100% phí khi đặt MOQ với cùng NCC.
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {HERO_STATS.map((s) => (
              <StatTile key={s.l} {...s} />
            ))}
          </div>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link
              href="/products"
              className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              🔍 Tìm sản phẩm để đặt mẫu
            </Link>
            <a
              href="#sample-subscription"
              className="px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              ♾ Gói đăng ký mẫu $99/tháng
            </a>
          </div>
        </div>
      </section>

      {/* === Why samples matter ============================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-9">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">VÌ SAO ĐẶT MẪU</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">6 thứ bạn không thể biết qua ảnh / spec</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Catalog có đầy đủ thông số, ảnh studio đẹp, video factory tour chi tiết — nhưng vẫn còn 6 yếu tố chỉ có thể verify khi cầm sample trên tay.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {WHY_REASONS.map((r) => (
            <div key={r.title} className="bg-paper border border-line rounded p-5 hover:border-brand transition">
              <div className="text-[32px] mb-2">{r.icon}</div>
              <b className="block text-[15px] text-ink mb-2 leading-tight">{r.title}</b>
              <p className="text-[12.5px] text-mute leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Big comparison stat */}
        <div className="mt-6 bg-paper border-2 border-gold rounded p-5 grid grid-cols-2 gap-4 items-center max-md:grid-cols-1">
          <div className="text-center border-r border-line pr-4 max-md:border-r-0 max-md:border-b max-md:pr-0 max-md:pb-4">
            <div className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1">Không đặt sample trước MOQ</div>
            <div className="text-[48px] font-extrabold text-accent leading-none">22%</div>
            <div className="text-[12px] text-mute mt-1">đơn MOQ có khiếu nại chất lượng</div>
          </div>
          <div className="text-center">
            <div className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1">Đặt sample đầy đủ trước MOQ</div>
            <div className="text-[48px] font-extrabold text-success leading-none">4%</div>
            <div className="text-[12px] text-mute mt-1">— giảm 5.5× rủi ro chỉ với $50-200</div>
          </div>
        </div>
      </section>

      {/* === Process steps ================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">QUY TRÌNH 6 BƯỚC</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">Từ click 'Yêu cầu mẫu' đến cầm sample trên tay</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Trung bình 8-12 ngày toàn quy trình. Buyer chỉ làm 2 bước (request + thanh toán). 4 bước còn lại do NCC + Trung tâm Mẫu + CSR Logistics tự động thực hiện.
          </p>
        </div>
        <div className="space-y-3">
          {PROCESS_STEPS.map((s, idx) => (
            <article key={s.n} className="bg-paper border-l-4 rounded-r p-5 max-md:p-4" style={{ borderColor: s.color }}>
              <div className="flex gap-4 max-md:flex-col">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded flex items-center justify-center font-extrabold text-white text-[18px] shadow-md"
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
                        <span className="text-[10.5px] uppercase tracking-wider font-bold" style={{ color: s.color }}>BƯỚC {s.n}</span>
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

      {/* === Giải thích Trung tâm Mẫu ========================================= */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="rounded p-6 max-md:p-4 border-2 border-[#A21CAF]" style={{ background: "linear-gradient(135deg, #A21CAF08, #A21CAF02)" }}>
          <div className="flex items-start gap-4 max-md:flex-col">
            <div className="w-16 h-16 rounded-md flex items-center justify-center text-[30px] flex-shrink-0" style={{ background: "#A21CAF20" }}>
              🏪
            </div>
            <div className="flex-1">
              <span className="inline-block bg-[#A21CAF] text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm mb-2">
                INNOVATION CỦA CSR
              </span>
              <h2 className="text-[20px] font-bold text-ink mb-2">Trung tâm Mẫu Quảng Châu — Gom shipping tiết kiệm 50-60%</h2>
              <p className="text-[13px] text-ink leading-relaxed mb-3">
                Thay vì mỗi sample được ship riêng (cước air $60-120/lô), CSR vận hành Trung tâm Mẫu tại Quảng Châu (cách Foshan 25 km, Đông Quan 80 km). NCC giao sample về Hub trong 24-48h. Mỗi tuần, Hub gom <b>8-15 sample từ nhiều buyer Việt Nam</b> thành <b>1 master shipment air</b> qua DHL/FedEx về Hà Nội — chỉ <b>1 lần cước $80-150 chia đều</b> cho các buyer.
              </p>
              <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
                <div className="bg-paper border border-line rounded p-3 text-center">
                  <div className="text-[22px] font-extrabold text-[#A21CAF]">$60-120</div>
                  <div className="text-[11px] text-mute">Ship riêng (per sample)</div>
                </div>
                <div className="bg-paper border border-line rounded p-3 text-center">
                  <div className="text-[22px] font-extrabold text-[#A21CAF]">$20-40</div>
                  <div className="text-[11px] text-mute">Qua Trung tâm Mẫu (gom)</div>
                </div>
                <div className="bg-success/10 border border-success/30 rounded p-3 text-center">
                  <div className="text-[22px] font-extrabold text-success">−60%</div>
                  <div className="text-[11px] text-success">Tiết kiệm trung bình</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === 3 sample types ================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">3 LOẠI MẪU</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">Standard · Variant · OEM — Chọn đúng mục đích</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Mỗi loại có chi phí, thời gian giao và mức độ chính xác khác nhau. Chọn sai loại có thể làm bạn tốn $300 cho một sample không phù hợp với mục đích thực.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {SAMPLE_TYPES.map((s) => (
            <article key={s.type} className="bg-paper border-2 rounded overflow-hidden flex flex-col" style={{ borderColor: s.color }}>
              <div className="px-5 py-4 text-white" style={{ background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}DD 100%)` }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[28px]">{s.icon}</span>
                  <h3 className="text-[20px] font-extrabold">{s.type}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
                  <div>
                    <div className="opacity-80">Phí</div>
                    <b className="text-[14px]">{s.fee}</b>
                  </div>
                  <div>
                    <div className="opacity-80">Thời gian giao</div>
                    <b className="text-[14px]">{s.leadtime}</b>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[12.5px] text-mute leading-relaxed mb-3">{s.desc}</p>
                <div className="bg-bg border border-line rounded p-2.5 mb-3">
                  <b className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1 block">PHÙ HỢP CHO</b>
                  <p className="text-[11.5px] text-ink leading-snug">{s.bestFor}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <b className="block text-success mb-1">✓ Pros</b>
                    <ul className="space-y-0.5 text-mute">
                      {s.pros.map((p, i) => <li key={i}>• {p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <b className="block text-accent mb-1">✕ Cons</b>
                    <ul className="space-y-0.5 text-mute">
                      {s.cons.map((c, i) => <li key={i}>• {c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === Cost breakdown table =========================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">CHI PHÍ MINH BẠCH</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">Bảng phí chi tiết — Không phí ẩn</h2>
        </div>
        <div className="bg-paper border border-line rounded overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-bg border-b-2 border-brand">
                <th className="text-left px-4 py-3 font-bold text-ink">Hạng mục</th>
                <th className="text-left px-4 py-3 font-bold text-ink">Phí</th>
                <th className="text-left px-4 py-3 font-bold text-ink max-md:hidden">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {COST_TABLE.map((c, i) => (
                <tr key={i} className="border-b border-line hover:bg-bg/50">
                  <td className="px-4 py-2.5 text-ink font-semibold">{c.item}</td>
                  <td className="px-4 py-2.5 text-brand font-bold">{c.range}</td>
                  <td className="px-4 py-2.5 text-mute text-[12px] max-md:hidden">{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11.5px] text-mute mt-3 italic text-center">
          💡 Toàn bộ phí sản phẩm + mock-up được hoàn 100% khi đặt MOQ ≥$5K với cùng NCC trong 90 ngày. Phí ship không hoàn (đã phát sinh).
        </p>
      </section>

      {/* === Pre-MOQ checklist ============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">DANH MỤC KIỂM TRA TRƯỚC MOQ</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">5 nhóm cần kiểm khi nhận sample</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Đầu tư 1-2 giờ kiểm sample chi tiết theo checklist này có thể tránh được 90% rủi ro khi đặt MOQ. In ra giấy hoặc save làm template.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {PRE_MOQ_CHECKLIST.map((c) => (
            <article key={c.category} className="bg-paper border border-line rounded p-5">
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-line">
                <div className="w-12 h-12 rounded-md bg-brand/10 border border-brand/30 flex items-center justify-center text-[24px] flex-shrink-0">
                  {c.icon}
                </div>
                <h3 className="text-[16px] font-bold text-ink">{c.category}</h3>
              </div>
              <ul className="space-y-2 text-[12.5px]">
                {c.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-ink leading-relaxed">
                    <input type="checkbox" className="mt-0.5 flex-shrink-0 cursor-pointer" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* === Gói đăng ký mẫu ============================================ */}
      <section id="sample-subscription" className="max-w-[1200px] mx-auto px-4 mt-12 scroll-mt-20">
        <div className="rounded overflow-hidden border-2 border-gold">
          <div className="px-6 py-5 text-brand-dark bg-gold">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="text-[36px]">♾</span>
                <div>
                  <span className="text-[10.5px] uppercase tracking-wider font-bold">CHƯƠNG TRÌNH NGƯỜI DÙNG NÂNG CAO</span>
                  <h2 className="text-[24px] font-extrabold leading-tight">Gói đăng ký mẫu</h2>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[36px] font-extrabold leading-none">$99</div>
                <div className="text-[12px]">/tháng — không cam kết</div>
              </div>
            </div>
          </div>
          <div className="p-6 max-md:p-4 bg-paper">
            <p className="text-[13px] text-ink leading-relaxed mb-4">
              Cho buyer đặt &gt;5 sample/tháng (trader, design studio, buying agent, dealer chuyên sourcing). Trả $99 cố định — chỉ trả phí sản phẩm cho từng sample, không trả phí ship Hub. ROI thường rõ ràng từ tháng 2.
            </p>
            <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
              {SAMPLE_SUB_FEATURES.map((f) => (
                <div key={f.title} className="bg-bg border border-line rounded p-3 hover:border-gold transition">
                  <div className="text-[24px] mb-1.5">{f.icon}</div>
                  <b className="block text-[13px] text-ink mb-1 leading-tight">{f.title}</b>
                  <p className="text-[11.5px] text-mute leading-snug">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <a
                href="mailto:sales@cybersilkroads.com?subject=Gói đăng ký mẫu"
                className="inline-block px-6 py-3 bg-brand text-white rounded-sm font-bold text-[14px] hover:bg-brand-light"
              >
                🚀 Đăng ký Gói đăng ký mẫu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === Common pitfalls ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-accent font-bold">⚠️ TRÁNH NHỮNG ĐIỀU NÀY</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">6 sai lầm thường gặp khi đặt mẫu</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Tổng hợp từ feedback của 600+ buyer CSR. Tránh được 6 điều này = save trung bình $1,200/năm và rất nhiều thời gian.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {PITFALLS.map((p) => (
            <div key={p.title} className="bg-paper border border-line rounded p-4 hover:border-accent transition">
              <div className="flex gap-3 items-start">
                <span className="text-[24px] flex-shrink-0">{p.icon}</span>
                <div className="flex-1">
                  <b className="block text-[13.5px] text-ink mb-1.5 leading-tight">{p.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{p.why}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === FAQ =========================================================== */}
      <section className="max-w-[900px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">CÂU HỎI THƯỜNG GẶP</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">8 câu hỏi quan trọng nhất</h2>
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
          <h3 className="text-[28px] font-extrabold mb-2 max-md:text-[22px]">Đặt sample đầu tiên ngay hôm nay</h3>
          <p className="text-[14px] opacity-90 mb-6 max-w-[660px] mx-auto leading-relaxed">
            Tìm sản phẩm trong catalog 200K+ SKU, click 'Yêu cầu mẫu' — Trung tâm Mẫu gom vận chuyển, thời gian giao 8-12 ngày, hoàn 100% phí khi đặt MOQ. Không có lý do nào để skip bước này.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              🔍 Browse 200K+ sản phẩm
            </Link>
            <Link
              href="/buying-request"
              className="inline-block px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              📝 Multi-supplier RFQ
            </Link>
            <a
              href="mailto:sales@cybersilkroads.com"
              className="inline-block px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90"
            >
              💬 Tư vấn 1-1 với AM
            </a>
          </div>
          <div className="mt-5 pt-5 border-t border-white/15 text-[11.5px] opacity-75 max-w-[680px] mx-auto leading-relaxed">
            Sample &lt;$200 miễn thuế nhập khẩu + VAT theo NĐ 134/2016. Bảo đảm Giao dịch protection áp dụng cho mọi sample. Hoàn 100% phí sản phẩm + mock-up khi đặt MOQ ≥$5K trong 90 ngày.
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "Đặt mẫu (Sample Order) — Cybersilkroads",
  description: "Quy trình 6 bước đặt sample từ NCC Trung Quốc về Việt Nam. Trung tâm Mẫu Quảng Châu gom shipping tiết kiệm 50-60% cước, thời gian giao 8-12 ngày, hoàn 100% phí khi đặt MOQ. 22%→4% giảm rủi ro khiếu nại nhờ sample.",
};
