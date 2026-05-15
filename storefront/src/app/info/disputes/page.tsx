import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const HERO_STATS = [
  { n: "87%", l: "Khiếu nại có lợi cho buyer", icon: "⚖️" },
  { n: "3.2", l: "Ngày phản hồi trung bình", icon: "⏱" },
  { n: "$42M+", l: "Giá trị đơn được bảo vệ 2025", icon: "🛡" },
  { n: "24/7", l: "Hotline khẩn cấp", icon: "📞" },
];

const COMPLAINT_TYPES = [
  {
    icon: "🎨",
    color: "#DC2626",
    title: "Sai đặc tả kỹ thuật",
    desc: "Hàng giao không đúng spec đã ký trong PI/HĐ — sai size, màu, chất liệu, certification (CE, FCC, RoHS thiếu hoặc giả).",
    successRate: "94%",
    avgDays: "5",
    evidence: "Ảnh hàng tại kho · spec PO · báo cáo lab nếu cần",
  },
  {
    icon: "📊",
    color: "#7C2D12",
    title: "Chất lượng kém / lỗi AQL",
    desc: "Tỷ lệ lỗi major + minor vượt AQL 2.5 đã thoả thuận. Lỗi defect không nằm trong tolerance pre-production sample đã ký.",
    successRate: "82%",
    avgDays: "9",
    evidence: "Báo cáo SGS/BV · ảnh defect · sample so sánh · video unboxing",
  },
  {
    icon: "🔢",
    color: "#92400E",
    title: "Thiếu số lượng",
    desc: "Đếm thực tế ít hơn PO — không có thông báo trước. Tolerance cho phép thông thường ±2% (theo Incoterms 2020).",
    successRate: "96%",
    avgDays: "3",
    evidence: "Packing List · ảnh đếm · video unload container · biên bản kho",
  },
  {
    icon: "⏰",
    color: "#1E3A8A",
    title: "Trễ giao hàng",
    desc: "NCC không giao đúng thời hạn ghi trong PO mà không có thông báo lý do force majeure hợp lệ. Tolerance thông thường 14 ngày.",
    successRate: "78%",
    avgDays: "7",
    evidence: "PO ngày thời hạn · bằng chứng email/chat · loss tracker (nếu có khách hàng cuối cancel)",
  },
  {
    icon: "📦",
    color: "#0E7490",
    title: "Hư hỏng do đóng gói",
    desc: "Hư hỏng do NCC đóng gói sai chuẩn — carton ướt, không pallet, không corner protector cho hàng fragile, không bubble wrap...",
    successRate: "85%",
    avgDays: "11",
    evidence: "Ảnh tình trạng carton lúc unload · biên bản tại cảng · so sánh với packaging spec",
  },
  {
    icon: "🚢",
    color: "#0369A1",
    title: "Hư hỏng vận chuyển",
    desc: "Tổn thất trong hành trình do thiên tai, va chạm, hoả hoạn, đắm tàu — KHÔNG phải lỗi NCC. Xử lý qua Marine Insurance, không qua Bảo đảm Giao dịch.",
    successRate: "91%",
    avgDays: "21",
    evidence: "Bill of Lading · biên bản hãng tàu · ảnh tổn thất · survey report bảo hiểm",
  },
  {
    icon: "🚨",
    color: "#9F1239",
    title: "Gian lận / lừa đảo",
    desc: "NCC nhận tiền nhưng không sản xuất, biến mất, hoặc giao hàng giả mạo brand. Trường hợp nghiêm trọng nhất — escalate ngay.",
    successRate: "100%",
    avgDays: "5",
    evidence: "Toàn bộ giao tiếp · tracking thanh toán · báo cáo Tianyancha về NCC",
  },
  {
    icon: "©",
    color: "#581C87",
    title: "Vi phạm IP / sao chép",
    desc: "Hàng giao infringe trademark, design patent, copyright của bên thứ ba — buyer có rủi ro pháp lý nếu nhập khẩu. Xử lý ưu tiên cao.",
    successRate: "89%",
    avgDays: "15",
    evidence: "Tài liệu IP gốc · ảnh hàng vi phạm · thông báo từ cơ quan hải quan nếu có",
  },
];

const ESCALATION_TIERS = [
  {
    tier: "1",
    label: "Đối thoại trực tiếp",
    color: "#16A34A",
    duration: "0-3 ngày",
    bgRate: "62%",
    description: "Buyer mở dispute trên dashboard, NCC nhận thông báo trong 1 giờ. Hai bên thương lượng trực tiếp qua chat CSR (có translator), tìm giải pháp tự nguyện. ~62% case kết thúc tại tier này — NCC chấp nhận lỗi và đề xuất giải pháp (giảm giá, ship hàng bù, refund partial).",
    actions: [
      "Buyer mở dispute kèm bằng chứng",
      "NCC phản hồi trong 24-48h",
      "Đối thoại có dispatcher CSR theo dõi",
      "Đạt thoả thuận → đóng dispute",
    ],
  },
  {
    tier: "2",
    label: "CSR Mediation",
    color: "var(--color-brand)",
    duration: "3-14 ngày",
    bgRate: "31%",
    description: "Nếu tier 1 không đạt thoả thuận trong 5 ngày, dispute được nâng lên tier 2 — Dispute Officer của CSR (có chứng chỉ hoà giải thương mại theo NĐ 22/2017) takes over. Officer review bằng chứng, tổ chức call 3 phương Buyer-NCC-CSR, ra phán quyết ràng buộc theo điều khoản dịch vụ.",
    actions: [
      "Dispute Officer review case 2-3 ngày",
      "Call 3 phương 60-90 phút (có dịch song song)",
      "CSR ra phán quyết dựa trên evidence + điều khoản",
      "Thi hành: refund/replace/credit qua tài khoản trung gian",
    ],
  },
  {
    tier: "3",
    label: "Trọng tài VIAC / CIETAC",
    color: "#A21CAF",
    duration: "60-180 ngày",
    bgRate: "7%",
    description: "Nếu một bên không chấp nhận phán quyết tier 2, có quyền đưa ra trọng tài chính thức — VIAC (Vietnam International Arbitration Centre) cho luật Việt Nam, hoặc CIETAC (China International Economic and Trade Arbitration Commission) cho luật Trung Quốc, theo điều khoản đã chọn trong PI. Phán quyết trọng tài có giá trị thi hành quốc tế (Công ước New York 1958).",
    actions: [
      "Nộp đơn yêu cầu trọng tài + phí ~$2,000-8,000",
      "Hội đồng 1-3 trọng tài viên được chỉ định",
      "Phiên hearing online hoặc tại HQ trọng tài",
      "Phán quyết binding, thi hành quốc tế qua New York Convention",
    ],
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Phát hiện vấn đề",
    deadline: "Trong 7 ngày kể từ ngày nhận hàng",
    desc: "Buyer kiểm tra hàng tại kho riêng (không tại cảng — phải sau khi đã unload và setup). Inspection period 7 ngày là chuẩn được công khai trong điều khoản Bảo đảm Giao dịch — sau đó hệ thống auto-confirm và tài khoản trung gian giải ngân.",
    tips: [
      "Inspect 100% lô hàng nếu giá trị < $10K, sample 32 cái nếu > $10K (theo AQL 2.5)",
      "Quay video unboxing carton ngoài + sản phẩm bên trong tối thiểu 90 giây",
      "Đo kích thước random 5 cái, so với spec PO",
    ],
  },
  {
    n: "02",
    title: "Thu thập bằng chứng",
    deadline: "Trong 24 giờ sau phát hiện",
    desc: "Bằng chứng càng chi tiết, dispute càng nhanh được xử lý có lợi. Đầu tư 2-4 giờ làm bằng chứng tốt thường tăng win rate từ ~60% lên 90%+.",
    tips: [
      "8+ ảnh ở các góc, focus vào defect close-up",
      "Video 60-180 giây quay liên tục, không cắt",
      "Bảng so sánh spec PO vs thực tế (Excel/PDF)",
      "Khuyến nghị mạnh: report inspection bên thứ ba (SGS/BV) cho đơn > $20K",
    ],
  },
  {
    n: "03",
    title: "Mở dispute trên CSR Dashboard",
    deadline: "Trong 7 ngày",
    desc: "Đăng nhập vào /buyer-center/orders, chọn đơn → 'Mở khiếu nại' → upload toàn bộ bằng chứng. Hệ thống tự động khoá tài khoản trung gian ngay lập tức — NCC không thể nhận tiền cho đến khi giải quyết xong.",
    tips: [
      "Chọn đúng category (sai spec / chất lượng / số lượng / etc.)",
      "Mô tả vấn đề rõ ràng, không cảm xúc — nêu fact",
      "Ghi rõ kỳ vọng giải quyết (refund X% / replace / credit)",
    ],
  },
  {
    n: "04",
    title: "NCC phản hồi",
    deadline: "NCC có 48 giờ",
    desc: "NCC nhận thông báo (email + WeChat/DingTalk) và phải phản hồi trong 48 giờ làm việc. Không phản hồi = mất quyền tự bảo vệ, dispute auto-escalate lên tier 2 với giả định lỗi của NCC.",
    tips: [
      "Nếu NCC nhận lỗi → tier 1 thoả thuận trực tiếp",
      "Nếu NCC bác bỏ → upload bằng chứng phản biện trong 72h",
      "Buyer có thể yêu cầu video call 3 phương (có dịch)",
    ],
  },
  {
    n: "05",
    title: "Đối thoại trực tiếp (Tier 1)",
    deadline: "5 ngày",
    desc: "Hai bên đàm phán qua chat CSR có dispatcher theo dõi. ~62% case đạt thoả thuận tại đây. Phương án phổ biến: refund 15-50% + giữ hàng, refund 100% + return, ship hàng bù miễn phí, credit cho đơn sau.",
    tips: [
      "Đưa ra ít nhất 2 phương án để NCC chọn",
      "Ghi chép thoả thuận bằng văn bản trên CSR (auto-binding)",
      "Không thoả thuận private ngoài hệ thống — không có pháp lý protection",
    ],
  },
  {
    n: "06",
    title: "CSR Mediation (Tier 2)",
    deadline: "14 ngày",
    desc: "Nếu tier 1 fail, Dispute Officer của CSR (chứng chỉ hoà giải NĐ 22/2017) takes over. Review bằng chứng 2-3 ngày, tổ chức call 3 phương 60-90 phút, ra phán quyết dựa trên evidence + điều khoản dịch vụ. Phán quyết binding với cả hai bên qua điều khoản đã ký.",
    tips: [
      "Phán quyết dựa trên: spec PO, evidence quality, NCC track record, AQL standard",
      "NCC không thi hành → suspend account + reserved fund forfeit",
      "Buyer có 5 ngày kháng cáo trước khi phán quyết có hiệu lực",
    ],
  },
  {
    n: "07",
    title: "Thi hành & đóng dispute",
    deadline: "5-10 ngày",
    desc: "Phán quyết được thi hành: refund qua tài khoản trung gian trở lại tài khoản người mua, replacement được ship miễn phí kèm QC priority, hoặc credit ghi nhận trong CSR Wallet cho đơn sau. NCC vi phạm bị deduct rating và reserved fund.",
    tips: [
      "Refund chuyển về tài khoản gốc trong 5-10 ngày làm việc",
      "Replacement ship miễn phí express với QC trước xuất xưởng",
      "Credit dùng được trong 12 tháng, áp dụng cho mọi NCC trên CSR",
    ],
  },
];

const OUTCOMES = [
  { icon: "💰", title: "Hoàn tiền 100%", pct: "38%", desc: "Refund đầy đủ giá trị đơn qua tài khoản trung gian. Áp dụng cho gian lận, sai spec nghiêm trọng, NCC không giao hàng." },
  { icon: "📊", title: "Hoàn tiền partial", pct: "27%", desc: "Refund 15-70% tuỳ mức độ. Buyer giữ hàng, áp dụng cho lỗi không nghiêm trọng nhưng có thể bán giảm giá." },
  { icon: "🔄", title: "Replacement", pct: "19%", desc: "NCC ship hàng bù miễn phí với QC priority. Áp dụng khi buyer cần hàng đúng spec để bán cho khách cuối." },
  { icon: "🎟", title: "Credit / Voucher", pct: "11%", desc: "Credit ghi nhận trong CSR Wallet cho đơn sau, thường 100-150% giá trị thiệt hại để giữ buyer." },
  { icon: "⚖️", title: "Trọng tài", pct: "5%", desc: "Đưa ra VIAC / CIETAC cho dispute lớn không đạt thoả thuận. Phán quyết binding quốc tế." },
];

const CASE_STUDIES = [
  {
    title: "Đơn $42K nội thất gỗ — sai vân gỗ",
    industry: "Nội thất",
    days: "11 ngày",
    outcome: "Refund 35% + giữ hàng",
    detail: "Buyer Hà Nội đặt 220 tủ kệ, NCC Foshan giao đúng size nhưng vân gỗ 'walnut dark' nhạt hơn sample đã ký. Buyer mở dispute với 24 ảnh + bảng so sánh Pantone. NCC ban đầu bác bỏ ('vân gỗ tự nhiên có sai số'). Tier 2 mediation review batch sample lưu trữ tại CSR — xác định lệch màu vượt tolerance. Phán quyết refund 35% giá trị, buyer giữ hàng bán giá thấp hơn cho dealer cấp 2.",
  },
  {
    title: "Đơn $18K đèn LED — 12% đèn không sáng",
    industry: "Electronics",
    days: "7 ngày",
    outcome: "Replacement free + bồi thường",
    detail: "Buyer HCM đặt 1,200 đèn LED panel, kiểm tra random 100 cái phát hiện 12% không sáng (defect rate vượt AQL 2.5). Báo cáo SGS xác nhận lỗi mạch. Tier 1: NCC chấp nhận ngay, ship 150 đèn bù miễn phí express + voucher $500 cho lần sau. Đóng dispute trong 7 ngày — không cần lên tier 2.",
  },
  {
    title: "Đơn $76K sanitary — NCC default",
    industry: "Sanitary",
    days: "21 ngày",
    outcome: "Refund 100%",
    detail: "Buyer Hải Phòng đặt 380 bồn cầu Foshan. Sau khi nhận đặt cọc 30%, NCC dừng phản hồi 14 ngày, Tianyancha cho thấy NCC vào diện cảnh báo phá sản. CSR escalate ngay, niêm phong tài khoản trung gian, tier 2 mediation auto-trigger sau 5 ngày NCC không phản hồi. Refund 100% trong 14 ngày làm việc qua Vietcombank. NCC bị suspended khỏi CSR vĩnh viễn.",
  },
  {
    title: "Đơn $135K dệt may — vi phạm IP",
    industry: "Textile",
    days: "28 ngày",
    outcome: "Refund 100% + bồi thường legal",
    detail: "Buyer Đà Nẵng đặt 5,000 áo sơ mi. Khi hàng về cảng Tiên Sa, customs giữ lô hàng do detect logo gần giống brand đã đăng ký Madrid Protocol. NCC ban đầu phủ nhận, nhưng tier 3 trọng tài VIAC xét xử trong 28 ngày, buộc NCC refund 100% + bồi thường $14K phí customs storage + legal fees. Phán quyết được thi hành qua New York Convention tại Trung Quốc.",
  },
];

const EMERGENCY_CHANNELS = [
  { icon: "🚨", title: "Hotline khẩn cấp 24/7", value: "1900 6688", desc: "Cho gian lận, IP infringement, customs giữ hàng — gọi ngay, response trong 30 phút" },
  { icon: "💬", title: "Live Chat dispute", value: "dashboard /buyer-center", desc: "Click 'Mở khiếu nại' trên đơn — chat trực tiếp Dispute Officer" },
  { icon: "✉", title: "Email Dispute team", value: "dispute@cybersilkroads.com", desc: "Gửi case complex, đính kèm bằng chứng — phản hồi <2 giờ trong giờ làm việc" },
  { icon: "📱", title: "WhatsApp / Zalo", value: "+84 1900 6688", desc: "Cho buyer ở vùng sâu không stable internet, escalation manager phụ trách" },
];

const FAQ = [
  {
    q: "Tôi đã nhận hàng được 10 ngày mới phát hiện lỗi — còn mở khiếu nại được không?",
    a: "Inspection period chính thức là 7 ngày kể từ ngày nhận hàng. Sau 7 ngày, tài khoản trung gian tự động giải ngân và quyền khiếu nại qua Bảo đảm Giao dịch hết hiệu lực. Tuy nhiên, nếu lỗi là defect ẩn (ví dụ máy chạy 30 ngày mới phát hiện hỏng do material kém), bạn vẫn có thể mở dispute trong 30 ngày — nhưng burden of proof cao hơn, cần báo cáo lab độc lập chứng minh lỗi từ NCC. Trên 30 ngày: chỉ còn cách trọng tài VIAC theo Luật Thương mại 2005 (thời hiệu khiếu nại 6 tháng theo Điều 318).",
  },
  {
    q: "Phí khiếu nại là bao nhiêu?",
    a: "Tier 1 (đối thoại trực tiếp) và Tier 2 (CSR mediation) — HOÀN TOÀN MIỄN PHÍ cho buyer. CSR đầu tư hệ thống dispute như là một phần của Bảo đảm Giao dịch. Tier 3 (trọng tài VIAC/CIETAC) — phí trọng tài $2,000-8,000 tuỳ giá trị tranh chấp, thông thường bên thua chịu (loser pays). CSR hỗ trợ chi phí pháp lý cho tier 3 nếu buyer thắng — không tính phí thêm.",
  },
  {
    q: "Tôi có cần thuê luật sư không?",
    a: "Không bắt buộc. Tier 1 và Tier 2 chỉ cần buyer làm việc trực tiếp với Dispute Officer của CSR — họ có chứng chỉ hoà giải thương mại theo NĐ 22/2017 và xử lý hàng nghìn case. Tier 3 (VIAC) thì khuyến nghị có luật sư cho đơn > $50K — CSR có danh sách law firm partner với rate ưu đãi cho khách hàng (Baker McKenzie, YKVN, VILAF... — rate $200-450/giờ).",
  },
  {
    q: "NCC giao hàng đã 5 ngày nhưng tôi cần thêm thời gian để kiểm tra (kho ở tỉnh xa, chưa đến) — làm sao gia hạn?",
    a: "Trên dashboard /buyer-center/orders chọn đơn → 'Yêu cầu gia hạn inspection period'. Hệ thống cho phép gia hạn tự động lên đến 21 ngày tổng cộng (7 + 14 ngày bonus) miễn phí — chỉ cần lý do hợp lệ (kho xa, đang đi công tác, lễ Tết). NCC nhận thông báo gia hạn nhưng không có quyền phủ quyết. Sau 21 ngày là hết, tài khoản trung gian tự giải ngân.",
  },
  {
    q: "Nếu phán quyết không có lợi cho tôi, có quyền kháng cáo không?",
    a: "Có. Phán quyết Tier 2 (CSR Mediation) có 5 ngày kháng cáo trước khi có hiệu lực thi hành. Buyer nộp đơn kháng cáo kèm bằng chứng mới hoặc lập luận pháp lý mới — Senior Dispute Officer (cấp cao hơn) review lại 7-10 ngày. Nếu vẫn không đồng ý, buyer có quyền đưa ra Tier 3 — trọng tài VIAC/CIETAC theo điều khoản trong PI. Phán quyết trọng tài là final, không kháng cáo (theo Luật Trọng tài Thương mại 2010).",
  },
  {
    q: "Tôi sợ NCC trả thù sau khi mở dispute (blacklist tôi, nâng giá đơn sau...)",
    a: "Điều khoản dịch vụ CSR cấm tuyệt đối hành vi retaliation. NCC bị phát hiện nâng giá hoặc từ chối đơn của buyer đã từng mở dispute (mà phán quyết đã có hiệu lực) sẽ bị suspended ngay 90 ngày + đóng băng 25% reserved fund. Buyer có thể report retaliation qua dispute@cybersilkroads.com — CSR điều tra và xử lý độc lập. Trên thực tế, retaliation rất hiếm vì NCC sợ mất tier Verified.",
  },
  {
    q: "Khiếu nại có ảnh hưởng đến rating của tôi với tư cách buyer không?",
    a: "Không. CSR chỉ track NCC rating dựa trên dispute history, KHÔNG track buyer rating dựa trên việc mở dispute. Buyer được khuyến khích mở dispute khi có vấn đề thực sự — đó là cách hệ thống tự cải thiện. Tuy nhiên, buyer mở dispute giả mạo (false claim) có thể bị buyer rating giảm và mất quyền truy cập tier Premium NCC.",
  },
  {
    q: "Trường hợp đặc biệt: hàng cấm hoặc vi phạm pháp luật Việt Nam — sao xử lý?",
    a: "Nếu lô hàng vi phạm NĐ 69/2018 (cấm nhập), Luật An toàn thực phẩm, hoặc các quy định chuyên ngành (CQ thuốc, hoá chất nguy hiểm...): customs giữ hàng, CSR escalate ngay tier 3 trọng tài VIAC + báo cáo Cục Hải quan. Buyer được full refund 100% + bồi thường legal expenses. NCC bị suspended khỏi platform vĩnh viễn và đưa vào blacklist công khai trustpage.cybersilkroads.com.",
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

export default function KhieuNaiPage() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Thông tin", href: "/help" },
          { label: "Khiếu nại & tranh chấp" },
        ]}
      />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, var(--color-brand) 50%, #001A3F 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-brand-light blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-12 max-md:py-8">
          <span className="inline-block bg-gold text-brand-dark text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wider mb-3">
            ⚖️ KHIẾU NẠI & TRANH CHẤP
          </span>
          <h1 className="text-[40px] font-extrabold leading-[1.1] mb-4 max-md:text-[26px]">
            Khi mọi thứ không đúng kế hoạch<br />
            <span className="text-gold">Cybersilkroads đứng về phía bạn</span>
          </h1>
          <p className="text-[15px] opacity-90 max-w-[780px] leading-relaxed mb-7 max-md:text-[13px]">
            Hệ thống giải quyết tranh chấp 3 cấp độ — từ đối thoại trực tiếp, qua CSR Mediation theo NĐ 22/2017, đến trọng tài quốc tế VIAC/CIETAC theo Công ước New York 1958. Buyer Việt Nam được bảo vệ bằng pháp lý, không phải bằng lời hứa. 87% case kết thúc có lợi cho buyer trong trung bình 3.2 ngày.
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {HERO_STATS.map((s) => (
              <StatTile key={s.l} {...s} />
            ))}
          </div>
          <div className="mt-6 flex gap-3 flex-wrap">
            <a
              href="#mo-disputes"
              className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              📝 Mở khiếu nại ngay
            </a>
            <a
              href="tel:19006688"
              className="px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90"
            >
              🚨 Hotline khẩn cấp 1900 6688
            </a>
          </div>
        </div>
      </section>

      {/* === When to file =================================================== */}
      <div className="max-w-[1200px] mx-auto px-4 mt-7">
        <div className="bg-paper border-l-4 border-gold rounded-r p-5">
          <div className="flex items-start gap-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-[26px] flex-shrink-0">
              ⏰
            </div>
            <div className="flex-1">
              <h2 className="text-[18px] font-bold text-ink mb-2">Inspection Period — 7 ngày kể từ khi nhận hàng</h2>
              <p className="text-[13px] text-mute leading-relaxed mb-3">
                Đây là khoảng thời gian buyer có quyền kiểm tra và mở khiếu nại miễn phí qua Bảo đảm Giao dịch. Sau 7 ngày, tài khoản trung gian tự động giải ngân cho NCC và quyền khiếu nại chuyển sang chế độ bằng chứng cao hơn (defect ẩn 30 ngày, hoặc trọng tài theo Luật Thương mại 2005 — thời hiệu 6 tháng).
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-[12px] max-md:grid-cols-1">
                <div className="bg-success/10 border border-success/30 rounded-sm p-3">
                  <div className="font-bold text-success">0-7 ngày</div>
                  <div className="text-mute">Bảo đảm Giao dịch · Free · Win rate 87%</div>
                </div>
                <div className="bg-gold/10 border border-gold/30 rounded-sm p-3">
                  <div className="font-bold text-[#9C6A1F]">8-30 ngày</div>
                  <div className="text-mute">Defect ẩn · Cần lab report · Win rate 71%</div>
                </div>
                <div className="bg-mute/10 border border-mute2/30 rounded-sm p-3">
                  <div className="font-bold text-mute">31 ngày - 6 tháng</div>
                  <div className="text-mute">Trọng tài VIAC · Phí $2-8K · Win rate 54%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Complaint types ================================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">8 LOẠI KHIẾU NẠI</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">Phân loại khiếu nại — Mỗi loại có quy trình riêng</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Win rate, thời gian giải quyết và bằng chứng yêu cầu khác nhau theo từng loại. Chọn đúng category khi mở dispute giúp xử lý nhanh hơn 30-40%.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {COMPLAINT_TYPES.map((t) => (
            <article key={t.title} className="bg-paper border border-line rounded overflow-hidden hover:border-brand hover:shadow-md transition flex flex-col">
              <div className="px-4 pt-3 pb-2 border-b border-line" style={{ background: `linear-gradient(135deg, ${t.color}10, ${t.color}03)` }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[26px]">{t.icon}</span>
                  <span className="text-[10.5px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: t.color, color: "#fff" }}>
                    {t.successRate} thắng
                  </span>
                </div>
                <b className="block text-[14px] font-bold text-ink leading-tight">{t.title}</b>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[12px] text-mute leading-relaxed mb-3 flex-1">{t.desc}</p>
                <div className="text-[11px] space-y-1 border-t border-line pt-2.5">
                  <div className="flex justify-between"><span className="text-mute">⏱ TB giải quyết</span><b className="text-ink">{t.avgDays} ngày</b></div>
                  <div className="text-mute pt-1">📎 <span className="text-ink">{t.evidence}</span></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === 3-tier escalation =============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">3 CẤP ĐỘ GIẢI QUYẾT</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">Hệ thống escalation — Càng cao càng formal</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Mỗi case đều bắt đầu ở Tier 1 (đối thoại trực tiếp). Chỉ escalate lên cao hơn nếu không đạt thoả thuận. Nguyên tắc: nhanh — rẻ — tự nguyện trước, formal sau.
          </p>
        </div>
        <div className="space-y-4">
          {ESCALATION_TIERS.map((t) => (
            <div key={t.tier} className="bg-paper border-l-4 rounded-r p-5 max-md:p-4" style={{ borderColor: t.color }}>
              <div className="flex items-start gap-4 max-md:flex-col">
                <div className="w-16 h-16 rounded flex items-center justify-center font-extrabold text-[32px] flex-shrink-0 text-white shadow-md" style={{ backgroundColor: t.color }}>
                  {t.tier}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <div>
                      <span className="text-[10.5px] uppercase tracking-wider font-bold" style={{ color: t.color }}>TIER {t.tier}</span>
                      <h3 className="text-[20px] font-bold text-ink leading-tight">{t.label}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-[10px] text-mute uppercase">Thời gian</div>
                        <b className="text-[14px] text-ink">{t.duration}</b>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-mute uppercase">% Case xử lý tại tier này</div>
                        <b className="text-[18px] font-extrabold" style={{ color: t.color }}>{t.bgRate}</b>
                      </div>
                    </div>
                  </div>
                  <p className="text-[13px] text-mute leading-relaxed mb-3">{t.description}</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] max-md:grid-cols-1">
                    {t.actions.map((a, i) => (
                      <li key={i} className="flex gap-2 text-ink">
                        <span style={{ color: t.color }} className="flex-shrink-0">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === Process steps ================================================== */}
      <section id="mo-disputes" className="max-w-[1200px] mx-auto px-4 mt-12 scroll-mt-20">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">QUY TRÌNH 7 BƯỚC</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">Từ phát hiện vấn đề đến đóng dispute</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Trung bình toàn quy trình kết thúc trong 3.2 ngày cho case đơn giản, 11-21 ngày cho case phức tạp cần mediation tier 2.
          </p>
        </div>
        <div className="space-y-3">
          {PROCESS_STEPS.map((s, idx) => (
            <article key={s.n} className="bg-paper border border-line rounded p-5 max-md:p-4 flex gap-4 max-md:flex-col">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-[16px] shadow-md">
                  {s.n}
                </div>
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="flex-1 w-0.5 bg-line mt-2 min-h-[20px] max-md:hidden" aria-hidden="true" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                  <h3 className="text-[16px] font-bold text-ink">{s.title}</h3>
                  <span className="text-[10.5px] bg-accent/15 text-accent px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                    🕒 {s.deadline}
                  </span>
                </div>
                <p className="text-[13px] text-mute leading-relaxed mb-3">{s.desc}</p>
                <div className="bg-bg border border-line rounded p-3">
                  <b className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1.5 block">💡 TIPS QUAN TRỌNG</b>
                  <ul className="space-y-1 text-[12px]">
                    {s.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-ink">
                        <span className="text-brand flex-shrink-0">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === Outcomes distribution ========================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">KẾT QUẢ KHẢ THI</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">Phân bố kết quả dispute 2025</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Dữ liệu từ 1,840+ dispute đã giải quyết trên CSR — 87% có lợi cho buyer dưới các hình thức khác nhau.
          </p>
        </div>
        <div className="grid grid-cols-5 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {OUTCOMES.map((o) => (
            <div key={o.title} className="bg-paper border border-line rounded p-4 hover:border-brand transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[28px]">{o.icon}</span>
                <span className="text-[20px] font-extrabold text-brand">{o.pct}</span>
              </div>
              <b className="block text-[14px] text-ink mb-2 leading-tight">{o.title}</b>
              <p className="text-[11.5px] text-mute leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Case studies =================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-wider text-brand font-bold">TÌNH HUỐNG ĐIỂN HÌNH</span>
          <h2 className="text-[26px] font-bold text-ink mt-1 max-md:text-[20px]">4 case có thật (đã anonymize)</h2>
          <p className="text-[13px] text-mute mt-2 max-w-[700px] mx-auto">
            Lựa chọn từ 1,840+ dispute đã đóng — đại diện cho 4 loại tình huống thường gặp nhất với buyer Việt Nam.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {CASE_STUDIES.map((c) => (
            <article key={c.title} className="bg-paper border border-line rounded p-5">
              <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                <div>
                  <span className="inline-block text-[10px] uppercase tracking-wider font-bold bg-bg border border-line px-2 py-0.5 rounded-sm text-mute mb-1">
                    {c.industry}
                  </span>
                  <h3 className="text-[15px] font-bold text-ink leading-tight">{c.title}</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3 text-[12px]">
                <div className="bg-bg border border-line rounded p-2">
                  <div className="text-mute uppercase tracking-wider text-[10px]">⏱ Thời gian</div>
                  <b className="text-ink">{c.days}</b>
                </div>
                <div className="bg-success/10 border border-success/30 rounded p-2">
                  <div className="text-success uppercase tracking-wider text-[10px]">✓ Kết quả</div>
                  <b className="text-success">{c.outcome}</b>
                </div>
              </div>
              <p className="text-[12.5px] text-ink leading-relaxed">{c.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* === Emergency channels ============================================ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="rounded p-5 max-md:p-4 border-2 border-accent" style={{ background: "linear-gradient(135deg, #DC262610, #DC262603)" }}>
          <div className="flex items-start gap-4 mb-4 max-md:flex-col">
            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-[26px] text-white flex-shrink-0 animate-pulse">
              🚨
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-ink mb-1">Trường hợp khẩn cấp — Liên hệ ngay</h2>
              <p className="text-[13px] text-mute leading-relaxed">
                Cho gian lận, vi phạm IP nghiêm trọng, customs giữ hàng, NCC biến mất — không đợi quy trình tự động, gọi/chat ngay 24/7 để được Senior Dispute Officer xử lý ưu tiên.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
            {EMERGENCY_CHANNELS.map((c) => (
              <div key={c.title} className="bg-paper border border-line rounded p-3.5">
                <div className="text-[24px] mb-1.5">{c.icon}</div>
                <b className="block text-[13px] text-ink mb-1">{c.title}</b>
                <div className="text-[12.5px] text-accent font-bold mb-1.5 break-all">{c.value}</div>
                <p className="text-[11px] text-mute leading-snug">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Legal references =============================================== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-12">
        <div className="bg-paper border border-line rounded p-5">
          <h2 className="text-[18px] font-bold text-ink mb-3">📚 Cơ sở pháp lý — Tham chiếu</h2>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 text-[12.5px]">
            <div>
              <b className="block text-[11px] uppercase tracking-wider text-brand font-bold mb-2">Luật Việt Nam</b>
              <ul className="space-y-1.5 text-mute">
                <li>• Luật Thương mại 2005 — Điều 318 (thời hiệu khiếu nại)</li>
                <li>• Luật Trọng tài Thương mại 2010</li>
                <li>• NĐ 22/2017/NĐ-CP về hoà giải thương mại</li>
                <li>• Bộ luật Dân sự 2015 — chế định hợp đồng</li>
                <li>• NĐ 13/2023/NĐ-CP — bảo vệ dữ liệu cá nhân</li>
              </ul>
            </div>
            <div>
              <b className="block text-[11px] uppercase tracking-wider text-brand font-bold mb-2">Quốc tế</b>
              <ul className="space-y-1.5 text-mute">
                <li>• Công ước New York 1958 — thi hành phán quyết trọng tài</li>
                <li>• UNCITRAL Model Law on International Commercial Arbitration</li>
                <li>• ICC Rules of Arbitration 2021</li>
                <li>• Incoterms 2020 (ICC) — phân chia trách nhiệm</li>
                <li>• CISG 1980 — Hợp đồng mua bán hàng hoá quốc tế</li>
              </ul>
            </div>
            <div>
              <b className="block text-[11px] uppercase tracking-wider text-brand font-bold mb-2">Tổ chức trọng tài</b>
              <ul className="space-y-1.5 text-mute">
                <li>• <b className="text-ink">VIAC</b> — Vietnam International Arbitration Centre (Hà Nội + HCM)</li>
                <li>• <b className="text-ink">CIETAC</b> — China International Economic and Trade Arbitration Commission (Bắc Kinh)</li>
                <li>• <b className="text-ink">SIAC</b> — Singapore International Arbitration Centre (cho case ASEAN)</li>
                <li>• <b className="text-ink">HKIAC</b> — Hong Kong International Arbitration Centre</li>
              </ul>
            </div>
          </div>
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
          style={{ background: "linear-gradient(135deg, #002557 0%, var(--color-brand) 50%, #001A3F 100%)" }}
        >
          <h3 className="text-[28px] font-extrabold mb-2 max-md:text-[22px]">Cần mở khiếu nại ngay bây giờ?</h3>
          <p className="text-[14px] opacity-90 mb-6 max-w-[660px] mx-auto leading-relaxed">
            Đăng nhập dashboard buyer, chọn đơn cần khiếu nại, click 'Mở khiếu nại'. Hệ thống tự động khoá tài khoản trung gian và kích hoạt quy trình 7 bước. Hoặc gọi hotline khẩn cấp 24/7 nếu trường hợp nghiêm trọng.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/buyer-center/orders"
              className="inline-block px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              📝 Đi tới Buyer Dashboard
            </Link>
            <a
              href="mailto:dispute@cybersilkroads.com"
              className="inline-block px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              ✉ dispute@cybersilkroads.com
            </a>
            <a
              href="tel:19006688"
              className="inline-block px-6 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90"
            >
              🚨 1900 6688 — 24/7
            </a>
          </div>
          <div className="mt-5 pt-5 border-t border-white/15 text-[11.5px] opacity-75 max-w-[680px] mx-auto leading-relaxed">
            Tier 1 (đối thoại) và Tier 2 (CSR Mediation) hoàn toàn miễn phí. Tier 3 (trọng tài VIAC/CIETAC) có phí $2,000-8,000 — bên thua chịu theo phán quyết. CSR đầu tư hệ thống dispute như một phần cốt lõi của Bảo đảm Giao dịch, không tính phí thêm.
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "Khiếu nại & tranh chấp — Cybersilkroads Dispute Resolution",
  description: "Hệ thống giải quyết tranh chấp 3 cấp độ: đối thoại trực tiếp, CSR Mediation theo NĐ 22/2017, trọng tài VIAC/CIETAC theo Công ước New York 1958. 87% case có lợi cho buyer trong 3.2 ngày trung bình. Hotline 24/7: 1900 6688.",
};
