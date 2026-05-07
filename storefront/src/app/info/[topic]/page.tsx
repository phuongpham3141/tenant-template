import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

type Topic = {
  title: string;
  intro: string;
  paragraphs: string[];
  faq?: { q: string; a: string }[];
  related?: { label: string; href: string }[];
};

const TOPICS: Record<string, Topic> = {
  "gioi-thieu": {
    title: "Giới thiệu AlibabaVN",
    intro: "Nền tảng B2B kết nối nhà bán Việt Nam với 40+ nhà máy đã được audit tại Trung Quốc.",
    paragraphs: [
      "AlibabaVN ra đời năm 2018, vận hành bởi Huayue SC với hai văn phòng tại Hà Nội và Quảng Châu. Sứ mệnh của chúng tôi là rút ngắn khoảng cách giữa người mua Việt Nam và nhà sản xuất Trung Quốc — không qua trung gian, không phụ phí ẩn.",
      "Sau 8 năm hoạt động, AlibabaVN đã giúp hơn 600 dealer Việt Nam nhập khẩu trực tiếp từ Foshan, Quảng Châu, Thượng Hải, Đông Quan với tổng kim ngạch trên $400M. Mỗi nhà máy trên nền tảng đều được đội Quảng Châu của chúng tôi audit trực tiếp 2 lần/năm.",
      "Khác với các nền tảng quốc tế, AlibabaVN tập trung 100% vào thị trường Việt Nam: hỗ trợ tiếng Việt, thanh toán VND, vận chuyển DDP về tận kho, hỗ trợ tranh chấp 24/7 bằng tiếng Việt, chứng từ hải quan VN-CN đầy đủ.",
      "Tầm nhìn 2030: trở thành nền tảng B2B số 1 cho ngành vật liệu xây dựng, nội thất và sanitary giữa hai nước.",
    ],
  },
  "tuyen-dung": {
    title: "Tuyển dụng",
    intro: "Gia nhập đội ngũ AlibabaVN tại Hà Nội và Quảng Châu.",
    paragraphs: [
      "Chúng tôi đang tuyển 15+ vị trí tại Hà Nội (sales, account manager, content) và 8+ vị trí tại Quảng Châu (auditor, sourcing, QC).",
      "Đặc biệt ưu tiên ứng viên có kinh nghiệm sourcing tại Trung Quốc, biết tiếng Trung hoặc tiếng Anh thương mại tốt, có kinh nghiệm xuất nhập khẩu B2B.",
      "Quyền lợi: lương cứng + commission, BHXH đầy đủ, công tác phí Trung Quốc, đào tạo audit tại Quảng Châu, lộ trình thăng tiến rõ ràng.",
    ],
    related: [{ label: "Liên hệ HR", href: "/info/lien-he" }],
  },
  "dieu-khoan": {
    title: "Điều khoản sử dụng",
    intro: "Quy định khi sử dụng nền tảng AlibabaVN.",
    paragraphs: [
      "Bằng việc sử dụng AlibabaVN, bạn đồng ý với các điều khoản sau. Nền tảng đóng vai trò trung gian kết nối, không sở hữu hàng hóa của các nhà cung cấp.",
      "Người dùng cam kết cung cấp thông tin chính xác khi đăng ký và đặt hàng. AlibabaVN có quyền tạm khóa tài khoản nếu phát hiện gian lận.",
      "Mọi giao dịch trên nền tảng được bảo vệ bởi Trade Assurance — hoàn 100% tiền nếu hàng không đúng mô tả. Tranh chấp được xử lý bởi đội ngũ AlibabaVN trong 7 ngày làm việc.",
      "Điều khoản có thể thay đổi mà không cần thông báo trước. Phiên bản mới nhất luôn có hiệu lực.",
    ],
  },
  "chinh-sach-bao-mat": {
    title: "Chính sách bảo mật",
    intro: "AlibabaVN cam kết bảo mật thông tin người dùng theo tiêu chuẩn quốc tế.",
    paragraphs: [
      "Chúng tôi thu thập thông tin tối thiểu cần thiết: email, số điện thoại, công ty, địa chỉ giao hàng. Không thu thập thông tin tài chính nhạy cảm.",
      "Dữ liệu được mã hóa SSL khi truyền và lưu trữ trên hạ tầng đạt chuẩn ISO 27001. Không chia sẻ với bên thứ ba ngoại trừ NCC liên quan trực tiếp đến đơn hàng của bạn.",
      "Bạn có quyền yêu cầu xóa tài khoản và toàn bộ dữ liệu cá nhân bất cứ lúc nào qua email privacy@alibabavn.com.",
      "Tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân tại Việt Nam.",
    ],
  },
  "huong-dan-nhap-khau": {
    title: "Hướng dẫn nhập khẩu từ Trung Quốc",
    intro: "Quy trình nhập khẩu B2B chi tiết — từ tìm NCC đến nhận hàng tại kho.",
    paragraphs: [
      "Bước 1 — Tìm sản phẩm: duyệt theo danh mục hoặc gửi RFQ. Trong 24h, bạn sẽ nhận 5-10 báo giá từ các nhà máy phù hợp.",
      "Bước 2 — Đặt mẫu: yêu cầu sample trước khi đặt hàng lớn. Phí sample thường $50-200, hoàn lại khi đặt MOQ.",
      "Bước 3 — Đặt cọc: chuyển 30% T/T vào tài khoản escrow của AlibabaVN. NCC bắt đầu sản xuất.",
      "Bước 4 — Kiểm hàng: trước khi xuất xưởng, AlibabaVN audit chất lượng (phí free cho đơn $5K+). Nếu không đạt, bạn có quyền từ chối.",
      "Bước 5 — Vận chuyển DDP: AlibabaVN lo toàn bộ thủ tục hải quan, thuế, vận chuyển về kho bạn. Lead time 5-7 ngày từ Foshan.",
    ],
    faq: [
      { q: "MOQ nhỏ nhất là bao nhiêu?", a: "Tùy nhà máy — phổ biến từ $500-2000 hoặc 50-100 đơn vị. Một số NCC chấp nhận MOQ $200 cho buyer mới." },
      { q: "Có cần giấy phép nhập khẩu không?", a: "Phần lớn hàng hóa (vật liệu xây dựng, nội thất, sanitary) không cần giấy phép. AlibabaVN sẽ tư vấn cụ thể theo HS code." },
      { q: "Thuế nhập khẩu khoảng bao nhiêu?", a: "Vật liệu xây dựng 5-10%, nội thất 20-25%, đèn LED 5%, sanitary 15-20%. AlibabaVN tính cước DDP đã bao gồm thuế." },
    ],
  },
  "tinh-cuoc-ddp": {
    title: "Tính cước DDP",
    intro: "Cước DDP (Delivered Duty Paid) đã bao gồm thuế nhập khẩu, VAT, vận chuyển về kho.",
    paragraphs: [
      "DDP = giá hàng + phí vận chuyển + thuế nhập khẩu + VAT 10% + phí thông quan + giao tận kho. Không phát sinh thêm.",
      "Tham khảo: container 20ft (~28 m³) từ Foshan về Hà Nội = $1,800-2,400. Container 40ft (~58 m³) = $2,800-3,500. Hàng lẻ LCL: $90-130/m³.",
      "Thuế nhập khẩu phụ thuộc HS code. AlibabaVN cung cấp công cụ tính cước online — chỉ cần nhập giá FOB và HS code, hệ thống ước tính DDP trong 30 giây.",
    ],
    related: [{ label: "Gửi RFQ để có báo giá DDP chính xác", href: "/buying-request" }],
  },
  "bao-ve-thanh-toan": {
    title: "Bảo vệ thanh toán",
    intro: "Trade Assurance — hoàn 100% nếu hàng không như mô tả.",
    paragraphs: [
      "Mọi giao dịch trên AlibabaVN đều được bảo vệ bởi Trade Assurance. Tiền của bạn nằm trong tài khoản escrow của chúng tôi cho đến khi bạn xác nhận đã nhận hàng đạt chất lượng.",
      "Nếu hàng không đúng mô tả, chậm trễ hoặc lỗi, gửi khiếu nại trong 7 ngày kể từ ngày nhận. AlibabaVN sẽ điều tra trong 3 ngày làm việc.",
      "Phương án xử lý: hoàn tiền 100%, đổi hàng miễn phí, hoặc bồi thường thỏa thuận. AlibabaVN trực tiếp đứng ra giải quyết với NCC bằng tiếng Trung.",
    ],
  },
  "khieu-nai": {
    title: "Khiếu nại & tranh chấp",
    intro: "Quy trình khiếu nại 7 ngày — đảm bảo công bằng cho buyer.",
    paragraphs: [
      "Gửi khiếu nại qua email dispute@alibabavn.com hoặc chat trực tiếp trong dashboard buyer. Đính kèm ảnh/video chứng minh, số đơn hàng, hóa đơn.",
      "Đội tranh chấp xác nhận nhận khiếu nại trong 24h. Liên hệ NCC, audit sản phẩm tại kho VN nếu cần. Đưa ra phương án xử lý trong 3-5 ngày.",
      "Tỷ lệ khiếu nại được xử lý thắng cho buyer: 87% (báo cáo Q3/2025). Trung bình 3.2 ngày để có phản hồi.",
    ],
  },
  "dat-mau": {
    title: "Đặt mẫu (Sample order)",
    intro: "Lấy mẫu trước khi đặt MOQ — giảm rủi ro, hiểu chất lượng thực tế.",
    paragraphs: [
      "Mẫu thường có giá $30-200 tùy sản phẩm. AlibabaVN gom nhiều mẫu trong 1 chuyến hàng để tiết kiệm cước (chỉ trả 1 lần phí ship $20-40).",
      "Lead time mẫu: 3-7 ngày sản xuất + 5 ngày vận chuyển. Tổng 8-12 ngày từ lúc đặt đến nhận tay.",
      "Phí sample được hoàn lại 100% khi bạn đặt đơn MOQ với cùng NCC.",
    ],
    related: [{ label: "Tìm sản phẩm để đặt mẫu", href: "/products" }],
  },
  "theo-doi-don": {
    title: "Theo dõi đơn hàng",
    intro: "Theo dõi trạng thái sản xuất, kiểm hàng, vận chuyển realtime.",
    paragraphs: [
      "Dashboard buyer hiển thị 5 trạng thái: Đặt cọc → Sản xuất → Kiểm hàng → Vận chuyển → Đã giao. Mỗi bước đều có ảnh/video từ NCC hoặc kho AlibabaVN.",
      "Thông báo qua email và Zalo OA khi có cập nhật. Bạn có thể yêu cầu video call với QC tại nhà máy bất cứ lúc nào.",
      "Số tracking quốc tế và nội địa VN đều được cập nhật. Lái xe giao hàng sẽ gọi trước 30 phút.",
    ],
    related: [{ label: "Vào trang đơn hàng", href: "/buyer-center/orders" }],
  },
  "tim-san-pham": {
    title: "Tìm sản phẩm trên AlibabaVN",
    intro: "3 cách tìm sản phẩm hiệu quả nhất.",
    paragraphs: [
      "Cách 1 — Duyệt danh mục: 12 ngành chính, hơn 932 phân loại con. Phù hợp khi bạn biết rõ loại sản phẩm cần.",
      "Cách 2 — Search: nhập từ khóa tiếng Việt hoặc tiếng Anh. Hệ thống tự động dịch sang tiếng Trung và search trên kho dữ liệu nhà máy.",
      "Cách 3 — Gửi RFQ: mô tả nhu cầu, hệ thống AI matching gửi đến 5-10 NCC phù hợp nhất. Bạn nhận báo giá trong 24h.",
    ],
    related: [
      { label: "Duyệt danh mục", href: "/products" },
      { label: "Gửi RFQ", href: "/buying-request" },
    ],
  },
  "doi-ngu-quang-chau": {
    title: "Đội ngũ tại Quảng Châu",
    intro: "12 người, làm việc trực tiếp với 40+ nhà máy đối tác.",
    paragraphs: [
      "Văn phòng AlibabaVN tại Quảng Châu thành lập từ 2018, hiện có 12 nhân sự bao gồm sourcing manager, auditor, QC inspector và logistics coordinator.",
      "Đội audit nhà máy 2 lần/năm cho mỗi NCC: kiểm tra dây chuyền sản xuất, chứng nhận, năng lực, lao động. Báo cáo audit có sẵn cho buyer xem.",
      "QC inspector sẽ đến nhà máy kiểm hàng trước khi xuất xưởng cho mọi đơn hàng $5K+. Báo cáo QC kèm 100+ ảnh, 5-10 video, đo lường thực tế.",
    ],
  },
  "quy-trinh-audit": {
    title: "Quy trình audit nhà máy",
    intro: "Quy trình 5 bước — đảm bảo chỉ NCC chất lượng được lên nền tảng.",
    paragraphs: [
      "Bước 1 — Đăng ký: NCC nộp giấy phép kinh doanh, ISO, năng lực sản xuất. AlibabaVN xác minh trên hệ thống doanh nghiệp Trung Quốc.",
      "Bước 2 — Audit hồ sơ: kiểm tra chứng nhận, hợp đồng xuất khẩu, lịch sử khiếu nại. NCC có scandal lớn bị từ chối ngay.",
      "Bước 3 — Audit on-site: đội QC đến nhà máy kiểm tra dây chuyền, công nhân, quản lý chất lượng. Quay video 360°.",
      "Bước 4 — Test sample: NCC gửi 5 mẫu sản phẩm chủ lực, AlibabaVN test lab tại Quảng Châu.",
      "Bước 5 — Onboarding: NCC qua audit được lên nền tảng tier Verified. Audit lại 2 lần/năm để giữ trạng thái.",
    ],
  },
  "tin-tuc-nganh": {
    title: "Tin tức ngành sourcing",
    intro: "Cập nhật xu hướng giá cả, sản phẩm mới, hội chợ.",
    paragraphs: [
      "Mỗi tuần, đội nội dung AlibabaVN xuất bản 8-12 bài về xu hướng giá nguyên liệu, sản phẩm mới ra mắt, sự kiện hội chợ, thay đổi chính sách thuế.",
      "Đăng ký Trade Alert để nhận newsletter hàng tuần qua email và Zalo OA. Đã có 12,000+ buyer Việt Nam đăng ký.",
    ],
    related: [{ label: "Đăng ký Trade Alert", href: "/trade-alert" }],
  },
  "lien-he": {
    title: "Liên hệ AlibabaVN",
    intro: "Hà Nội · Quảng Châu · Online 24/7.",
    paragraphs: [
      "Văn phòng Hà Nội: Tầng 12, Tòa nhà X, đường Y, Cầu Giấy, Hà Nội. Tel: +84 24 1234 5678. Giờ làm việc: 8h-18h thứ 2-7.",
      "Văn phòng Quảng Châu: 26/F, Tianhe Plaza, Tianhe District, Guangzhou. Tel: +86 20 1234 5678.",
      "Hỗ trợ online 24/7: support@alibabavn.com, Zalo OA: AlibabaVN, Facebook: fb.com/alibabavn",
    ],
  },
  "chinh-sach-van-chuyen": {
    title: "Chính sách vận chuyển",
    intro: "Vận chuyển DDP, FOB, CIF, EXW — tùy chọn linh hoạt theo nhu cầu.",
    paragraphs: [
      "DDP (khuyến nghị): AlibabaVN lo toàn bộ — vận chuyển, hải quan, thuế, giao tận kho. Lead time 5-7 ngày từ Foshan, 8-12 ngày từ Thượng Hải.",
      "FOB: bạn tự thuê forwarder, AlibabaVN giao hàng tới cảng xuất Trung Quốc. Phù hợp khi có forwarder riêng.",
      "EXW: bạn tự đến lấy hàng tại nhà máy. Phù hợp đơn hàng đặc thù, không khuyến nghị cho buyer mới.",
    ],
  },
  "gold-membership": {
    title: "Gold Membership cho NCC",
    intro: "Tier cao nhất cho nhà cung cấp — featured banner, ưu tiên matching RFQ.",
    paragraphs: [
      "Gold member nhận: featured banner trên trang chủ, ưu tiên match RFQ (top 3), audit miễn phí 2 lần/năm, account manager riêng.",
      "Phí Gold: 50.000 NDT/năm (~$7,000). Yêu cầu: đã verified 2+ năm, rating >= 4.7, kim ngạch xuất khẩu $1M+/năm.",
    ],
    related: [{ label: "Đăng ký nhà máy", href: "/sell-on-avn" }],
  },
  "quang-cao": {
    title: "Quảng cáo trên AlibabaVN",
    intro: "Banner, sponsored listing, email newsletter — tiếp cận 600+ dealer VN.",
    paragraphs: [
      "Hero banner trang chủ: $2,000/tuần, hiển thị ~50,000 view.",
      "Sponsored listing top tìm kiếm: pay-per-click $0.5-2/click tùy ngành.",
      "Sponsored email: $1,500/lần gửi đến 12,000 subscriber Trade Alert.",
    ],
  },
  "api-integration": {
    title: "API integration cho NCC",
    intro: "REST API + Webhook — đồng bộ inventory, đơn hàng tự động.",
    paragraphs: [
      "API endpoints: GET/POST products, orders, RFQ. Webhook event: order.created, order.shipped, dispute.opened.",
      "Tài liệu: docs.alibabavn.com/api. Hỗ trợ Postman collection. Sandbox môi trường test miễn phí.",
      "Pricing: free tier 1000 calls/ngày. Pro $99/tháng cho unlimited. Enterprise custom.",
    ],
  },
  "locale": {
    title: "Ngôn ngữ & Tiền tệ",
    intro: "AlibabaVN hỗ trợ tiếng Việt (mặc định) và tiếng Anh. Tiền tệ: VND, USD.",
    paragraphs: [
      "Tiếng Việt là ngôn ngữ chính. Tiếng Anh dành cho người mua quốc tế quan tâm thị trường VN.",
      "Tiền tệ hiển thị theo lựa chọn: VND (mặc định), USD. Tỷ giá cập nhật theo Vietcombank realtime.",
      "Phiên bản tiếng Trung sẽ ra mắt Q3/2026 cho NCC tiếp cận buyer Trung Quốc đại lục.",
    ],
  },
};

const SOCIAL_TOPICS = ["social-f", "social-y", "social-l", "social-z", "social-t"];

function getTopic(topic: string): Topic {
  if (TOPICS[topic]) return TOPICS[topic];
  if (SOCIAL_TOPICS.includes(topic)) {
    const platform: Record<string, string> = { "social-f": "Facebook", "social-y": "YouTube", "social-l": "LinkedIn", "social-z": "Zalo OA", "social-t": "TikTok" };
    const name = platform[topic] || "Social";
    return {
      title: `AlibabaVN trên ${name}`,
      intro: `Theo dõi AlibabaVN trên ${name} để cập nhật sản phẩm mới, ưu đãi và tin tức ngành.`,
      paragraphs: [
        `Kênh ${name} chính thức của AlibabaVN cập nhật nội dung mỗi ngày: video factory tour, livestream Canton Fair, hướng dẫn sourcing, story dealer thành công.`,
        `Tham gia cộng đồng 50,000+ buyer Việt Nam quan tâm đến nhập khẩu B2B từ Trung Quốc.`,
      ],
      related: [{ label: "Đăng ký Trade Alert", href: "/trade-alert" }],
    };
  }
  return {
    title: topic.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" "),
    intro: "Trang nội dung này đang được hoàn thiện.",
    paragraphs: [
      "Đội ngũ AlibabaVN đang biên tập nội dung chi tiết cho chủ đề này. Vui lòng quay lại sau hoặc gửi yêu cầu cụ thể qua RFQ.",
      "Trong lúc chờ, bạn có thể duyệt sản phẩm theo danh mục hoặc gửi yêu cầu báo giá để được hỗ trợ trực tiếp.",
    ],
    related: [
      { label: "Duyệt sản phẩm", href: "/products" },
      { label: "Gửi RFQ", href: "/buying-request" },
      { label: "Trung tâm trợ giúp", href: "/help" },
    ],
  };
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const t = getTopic(topic);

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Thông tin", href: "/help" },
          { label: t.title },
        ]}
      />
      <div className="max-w-[900px] mx-auto px-4 mt-5 mb-7">
        <div className="bg-paper border border-line rounded p-7 max-md:p-4">
          <h1 className="text-[28px] font-extrabold text-ink leading-tight mb-2">{t.title}</h1>
          <p className="text-[14px] text-mute leading-relaxed mb-5">{t.intro}</p>
          <img src={`https://picsum.photos/seed/info-${topic}/900/300`} alt="" className="w-full rounded mb-5" />
          <div className="space-y-4 text-[13.5px] text-ink leading-relaxed">
            {t.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {t.faq && t.faq.length > 0 && (
            <>
              <h2 className="text-[16px] font-bold text-ink mt-7 mb-3">Câu hỏi thường gặp</h2>
              <div className="space-y-3">
                {t.faq.map((q, i) => (
                  <div key={i} className="border border-line rounded p-3.5">
                    <b className="block text-[13px] text-ink mb-1.5">Q: {q.q}</b>
                    <p className="text-[12.5px] text-mute leading-relaxed">A: {q.a}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="mt-7 pt-5 border-t border-line flex flex-wrap gap-3 items-center">
            <span className="text-[13px] text-mute">Liên kết liên quan:</span>
            <Link href="/buying-request" className="text-[13px] text-brand hover:underline">Gửi RFQ →</Link>
            <Link href="/help" className="text-[13px] text-brand hover:underline">Trung tâm trợ giúp →</Link>
            {t.related?.map((r) => (
              <Link key={r.href} href={r.href} className="text-[13px] text-brand hover:underline">{r.label} →</Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const t = getTopic(topic);
  return { title: `${t.title} — AlibabaVN` };
}
