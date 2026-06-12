import Link from "@/components/i18n-link";
import { getT } from "@/lib/t";
import { getTd } from "@/lib/td";
import { tdDeep } from "@/lib/localize";
import { Fragment, type ReactNode } from "react";
import { Breadcrumb } from "@/components/category/breadcrumb";

/**
 * Parse a plain-text string with limited inline markup into React nodes.
 * Currently supports:
 *   • <b>…</b> → <b className="font-semibold text-ink">…</b>
 *
 * Other HTML in the source is rendered as plain text (React escapes it).
 */
function renderInlineMarkup(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const rx = /<b>([\s\S]*?)<\/b>/g;
  let cursor = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = rx.exec(text)) !== null) {
    if (m.index > cursor) parts.push(text.slice(cursor, m.index));
    parts.push(
      <b key={`b-${key++}`} className="font-semibold text-ink">
        {m[1]}
      </b>,
    );
    cursor = m.index + m[0].length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

/**
 * Smart paragraph renderer.
 *
 * Scans the paragraph text for inline list markers and, if it finds at
 * least 2 consecutive markers, splits the paragraph into an intro
 * sentence + a `<ul>` of items + optional trailing prose.
 *
 * Patterns supported (tried in order, first match wins):
 *   • (Bước 1) (Bước 2) ...           → step list
 *   • (Cấp 1 — ...) (Cấp 2 — ...) ... → level list
 *   • (a) (b) (c) ...                 → letter list
 *   • (1) (2) (3) ...                 → number list
 *   • (i) (ii) (iii) ...              → roman list
 *
 * For each bullet body we re-run the parser once to catch one level of
 * nested lists (e.g. (Bước 3) contains (a)/(b)/(c) sub-items).
 *
 * Output: <p>intro</p><ul><li><b>marker</b> body</li>…</ul><p>trailing</p>
 */
type ParsedList = {
  intro: string;
  bullets: { label: string; body: string }[];
  trailing: string;
};

function parseInlineList(text: string): ParsedList | null {
  const patterns: { rx: RegExp; minItems: number }[] = [
    { rx: /\((Bước\s+\d+)\)\s+/g, minItems: 2 },
    { rx: /\((Cấp\s+\d+(?:\s+—[^)]*)?)\)\s+/g, minItems: 2 },
    { rx: /(?<=[.\s:;])\(([A-Z])\)\s+/g, minItems: 3 }, // (A) (B) (C) — uppercase letters
    { rx: /(?<=[.\s:;])\(([a-z])\)\s+/g, minItems: 3 }, // (a) (b) (c)
    { rx: /(?<=[.\s:;])\((\d{1,2})\)\s+/g, minItems: 3 }, // (1) (2) (3)
    { rx: /(?<=[.\s:;])\((i{1,3}|iv|v|vi{0,3}|ix|x)\)\s+/g, minItems: 3 }, // (i) (ii) (iii)
  ];

  for (const { rx, minItems } of patterns) {
    const matches = [...text.matchAll(rx)];
    if (matches.length < minItems) continue;

    // Optional: confirm markers are in expected sequence (a,b,c… / 1,2,3…)
    // — skipped here to keep parser permissive; trust the writer's intent.

    const firstStart = matches[0].index!;
    const intro = text.slice(0, firstStart).trim();

    const bullets: { label: string; body: string }[] = [];
    for (let i = 0; i < matches.length; i++) {
      const m = matches[i];
      const start = m.index! + m[0].length;
      const end = i + 1 < matches.length ? matches[i + 1].index! : text.length;
      bullets.push({ label: m[1], body: text.slice(start, end).trim() });
    }

    // We choose NOT to detect "trailing" as a separate paragraph — any
    // sentence after the last marker stays inside the final bullet body.
    return { intro, bullets, trailing: "" };
  }
  return null;
}

/** Render one paragraph. Recurses once for nested lists in bullet bodies. */
function RenderParagraph({ text, depth = 0 }: { text: string; depth?: number }) {
  const parsed = parseInlineList(text);
  if (!parsed) {
    return (
      <p className="text-[14px] text-ink leading-relaxed">
        {renderInlineMarkup(text)}
      </p>
    );
  }
  const { intro, bullets } = parsed;
  return (
    <>
      {intro && (
        <p className="text-[14px] text-ink leading-relaxed mb-2">
          {renderInlineMarkup(intro)}
        </p>
      )}
      <ul
        className={
          depth === 0
            ? "space-y-2 my-3 pl-1"
            : "space-y-1.5 mt-2 ml-2 pl-4 border-l-2 border-line"
        }
      >
        {bullets.map((b, i) => {
          // Recurse only one level to avoid runaway nesting.
          const nested = depth === 0 ? parseInlineList(b.body) : null;
          return (
            <li key={i} className="text-[14px] text-ink leading-relaxed flex gap-2.5">
              <span
                className="font-bold text-brand flex-shrink-0 mt-0.5 min-w-[26px]"
                aria-hidden="true"
              >
                {b.label}.
              </span>
              <div className="flex-1 min-w-0">
                {nested ? (
                  <RenderParagraph text={b.body} depth={1} />
                ) : (
                  <span>{renderInlineMarkup(b.body)}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

type Topic = {
  title: string;
  intro: string;
  paragraphs: string[];
  /** Optional emoji icon shown in the hero banner. */
  icon?: string;
  /** Optional category label for hero (e.g. "VỀ CHÚNG TÔI"). */
  category?: string;
  /** Quick-fact pills displayed under the hero (e.g. founded year, locations). */
  quickFacts?: { label: string; value: string }[];
  /** Optional headings for the body — splits paragraphs into sections of N
   *  Use null entry to keep paragraph without a heading. */
  sectionTitles?: (string | null)[];
  /** Optional pull-quote shown after the first section. */
  pullQuote?: { text: string; author?: string };
  /** Optional checklist bullets after main paragraphs. */
  checklist?: string[];
  faq?: { q: string; a: string }[];
  related?: { label: string; href: string }[];
  /** Primary call-to-action button at end of article. */
  primaryCta?: { label: string; href: string };
};

const TOPICS: Record<string, Topic> = {
  "about-us": {
    title: "Huayuesc — Chuỗi cung ứng Trung-Việt cho VLXD, Nội thất & Đồ điện gia dụng",
    intro:
      "Huayuesc là nhà cung cấp dịch vụ chuỗi cung ứng toàn diện, chuyên xuất khẩu vật liệu xây dựng, vật liệu trang trí và thiết bị điện gia dụng nhà bếp – phòng tắm chất lượng cao từ Trung Quốc vào thị trường Việt Nam. Chúng tôi tích hợp từ khâu thu mua, kho bãi, logistics, thông quan, phân phối đến tiếp thị bản địa hóa — đưa đến khách hàng chuỗi cung ứng trọn gói từ nhà máy Trung Quốc đến điểm tiêu thụ cuối cùng tại Việt Nam.",
    icon: "🌏",
    category: "VỀ HUAYUE",
    quickFacts: [
      { label: "Tên pháp lý", value: "Công ty TNHH Chuỗi Cung Ứng Huayue Việt Nam" },
      { label: "Mã số thuế", value: "0111453693" },
      { label: "Trụ sở Việt Nam", value: "Toà Bảo Ngọc Building, Xuân Phương, Hà Nội" },
      { label: "Văn phòng Trung Quốc", value: "Hải Châu, Quảng Châu" },
      { label: "Hotline", value: "000-000-000" },
      { label: "Domain", value: "huayuesc.vn" },
      { label: "Ba ngành chính", value: "VLXD · Trang trí · Đồ điện bếp & vệ sinh" },
      { label: "Mô hình", value: "B2B trọn gói" },
    ],
    sectionTitles: [
      "1. Tầm nhìn — Chuẩn mực dịch vụ chuỗi cung ứng Trung-Việt",
      "2. Bốn dịch vụ trọng tâm — Chuỗi cung ứng trọn gói",
      "3. Lĩnh vực sản phẩm — Ba ngành Trung Quốc ưu việt",
      "4. Kho bãi · Vận chuyển · Thông quan",
      "5. Triển lãm & Quảng bá thị trường tại Việt Nam",
      "6. Số hóa chuỗi cung ứng — Dữ liệu · Tự động hóa · Mạng lưới",
      "7. Sứ mệnh — Đưa chế tạo Trung Quốc tỏa sáng tại Việt Nam",
    ],
    paragraphs: [
      "Tầm nhìn của Huayuesc là trở thành công ty kiểu mẫu về dịch vụ chuỗi cung ứng Trung Quốc – Việt Nam, dẫn dắt và kiến tạo nền sinh thái mới cho thương mại vật liệu xây dựng, đồ nội thất và đồ điện gia dụng giữa hai quốc gia. Chúng tôi mở ra con đường thương mại mới — đưa sản phẩm Trung Quốc chất lượng cao từ các cụm nhà máy hàng đầu Quảng Đông, Phúc Kiến, Sơn Đông trực tiếp đến tay nhà đầu tư bất động sản, công ty xây dựng, công ty thiết kế trang trí nội thất và đại lý phân phối tại Việt Nam. Khách hàng không cần qua trung gian, không cần phải bay sang Trung Quốc; mọi khâu từ chọn nhà máy đến giao hàng tận kho đều do Huayuesc đảm nhiệm.",
      "Huayuesc cung cấp chuỗi cung ứng trọn gói gồm bốn dịch vụ trọng tâm. (1) Tinh chọn nguồn gốc và hỗ trợ thu mua — chúng tôi giúp khách hàng sàng lọc nhà cung cấp Trung Quốc có sức cạnh tranh, kiểm soát chất lượng tại xưởng, quản lý đơn hàng và thu mua tập trung để giảm thiểu giá thành lẫn rủi ro. (2) Kho bãi tại Trung Quốc và tập trung vận chuyển — chúng tôi xây dựng hoặc hợp tác với các kho hiện đại đặt tại các khu công nghiệp và bến cảng chủ chốt, cung cấp dịch vụ quản lý kho chứa an toàn và hiệu quả. (3) Vận chuyển xuyên biên giới và thông quan hiệu quả — cung cấp nhiều loại hình vận chuyển door-to-door và port-to-port; tại Việt Nam, đội ngũ thông quan của Huayuesc tại cảng Hải Phòng am hiểu luật xuất nhập khẩu, đảm bảo thông quan nhanh chóng, đúng pháp luật và tiết kiệm chi phí. (4) Phát triển kênh phân phối Việt Nam — dựa vào hệ thống đối tác rộng lớn tại Việt Nam, chúng tôi đưa thương hiệu và sản phẩm Trung Quốc thâm nhập các kênh phân phối chính tại Hà Nội, Hồ Chí Minh và các tỉnh trọng điểm.",
      "Sản phẩm Trung Quốc có ưu thế rõ rệt về giá thành cạnh tranh, chủng loại phong phú, dây chuyền sản xuất thành thạo và tốc độ đổi mới nhanh. Huayuesc tập trung vào ba lĩnh vực chính. (i) Vật liệu xây dựng — gạch men sứ porcelain, thiết bị vệ sinh sanitaryware, kim khí ngũ kim, vật liệu cửa và profile nhôm/PVC, sơn và lớp phủ, ống nước cùng phụ kiện đường ống, thiết bị chiếu sáng. (ii) Vật liệu trang trí nội thất — giấy dán tường và vải dán tường, sàn gỗ công nghiệp/sàn gỗ tự nhiên, vật liệu trang trí trần, đá tự nhiên và đá nhân tạo, đồ trang trí nội thất gia đình. (iii) Đồ điện nhà bếp và phòng tắm — bình nóng lạnh điện, bếp gas, máy hút mùi, nồi cơm điện, máy ép phá tế bào, nắp bồn cầu thông minh cùng các thiết bị nhà tắm tiện ích khác. Mỗi danh mục đều có ít nhất 20 nhà máy đối tác đã được chúng tôi audit thực địa và đưa vào danh sách trắng.",
      "Hạ tầng kho bãi của Huayuesc lấy 'kho bảo thuế' làm trọng tâm, vận hành toàn bộ chu trình 'nhập kho – lưu trữ – xuất kho – thông quan' theo hướng tự động hóa và dữ liệu hóa. Chúng tôi vận hành ba loại kho chuyên dụng tại Trung Quốc: kho nhiệt độ thường cho hàng hóa phổ thông, kho riêng đạt chuẩn an toàn PCCC dành cho chất dễ cháy (sơn, chất pha loãng, dung môi), và kho nhiệt độ – độ ẩm ổn định dành cho thiết bị điện tử nhạy cảm. Mỗi kho được trang bị cửa dỡ hàng chuẩn container, bàn phân loại và đóng gói, cùng đối tác vận chuyển trực trú tại chỗ. Tại Việt Nam, đội ngũ thông quan của Huayuesc tích hợp trực tiếp với hệ thống hải quan tại cảng Hải Phòng — dữ liệu báo quan được truyền tải theo thời gian thực, quy trình khai báo tối giản, giảm đáng kể thời gian thông quan so với mô hình tự khai báo truyền thống.",
      "Huayuesc tổ chức dịch vụ triển lãm thương mại theo mô hình 'trưng bày thương hiệu theo bối cảnh + phục vụ chuyên nghiệp tổng hợp' — tạo nên môi trường giao dịch tiện lợi nơi khách hàng có thể đặt hàng trực tiếp ngay tại showroom. Hằng năm, chúng tôi tổ chức hội nghị giới thiệu sản phẩm mới của các thương hiệu Trung Quốc, diễn đàn chuyên đề về vật liệu xây dựng thân thiện môi trường và kỹ thuật đồ điện gia dụng — thu hút nhà đầu tư bất động sản Việt Nam, các nhà thầu xây dựng, công ty thiết kế trang trí nội thất đến tham dự và đặt hàng tại chỗ. Song song, chúng tôi vận hành chiến dịch truyền thông bài bản trên các kênh online và offline tại Việt Nam, đưa thương hiệu Trung Quốc đến gần hơn với người mua bản địa và lan tỏa thông điệp cốt lõi: 'Đến với Huayue, bạn không cần đi Trung Quốc — vẫn mua được sản phẩm Trung Quốc ưu việt một cách nhanh chóng và tiện lợi'.",
      "Toàn bộ chuỗi cung ứng của Huayuesc được số hóa và hiển thị minh bạch — khách hàng theo dõi đơn hàng xuyên suốt từ khâu nguyên vật liệu tại xưởng sản xuất đến tay người tiêu dùng cuối tại Việt Nam. Nền tảng tích hợp hệ thống chuỗi cung ứng dữ liệu hóa thông minh, hỗ trợ thông tin sản phẩm – thị trường, dịch vụ thanh toán và quy đổi ngoại tệ, cùng giải pháp tài chính chuỗi cung ứng (supply-chain finance). Ba trụ cột công nghệ vận hành đồng bộ: (a) Quyết sách dữ liệu hóa — phân tích big data để dự báo nhu cầu thị trường và tối ưu kho chứa; (b) Tự động hóa thông minh — thuật toán AI tự động xử lý đơn hàng, điều phối vận chuyển và tối ưu lộ trình logistics; (c) Mạng lưới hợp tác — nền tảng liên kết toàn bộ nhà cung cấp, nhà sản xuất, công ty vận chuyển và kênh bán lẻ cuối cùng. Kết quả: chi phí vận hành giảm, hiệu quả sử dụng vốn tăng, doanh thu kinh doanh của đối tác tăng trưởng bền vững.",
      "Sứ mệnh của Huayuesc là thông qua dịch vụ chuỗi cung ứng một trạm chuyên nghiệp, hiệu quả cao và đáng tin cậy, giúp ngành chế tạo Trung Quốc tỏa sáng tại Việt Nam, đồng thời giúp thị trường Việt Nam phát triển lên tầng cao mới. Chúng tôi là CÔNG TY TNHH CHUỖI CUNG ỨNG HUAYUE VIỆT NAM — mã số thuế 0111453693, trụ sở chính tại Toà Bảo Ngọc Building, số 02 phố Thanh Lâm, Phường Xuân Phương, Hà Nội, kết nối trực tiếp với văn phòng Quảng Châu đặt tại Tầng 3, Tòa 1, cảng Shuyu Chuangxing, bến tàu phía Bắc, làng Hoàng Phố, đường Tân Cảng Đông, quận Hải Châu, thành phố Quảng Châu. Liên hệ trực tiếp qua hotline 000-000-000 hoặc gửi yêu cầu báo giá trên huayuesc.vn để được đội ngũ tư vấn báo giá DDP tận kho Việt Nam trong 24 giờ.",
    ],
    pullQuote: {
      text: "Đến với Huayue, bạn không cần đi Trung Quốc cũng mua được sản phẩm Trung Quốc ưu việt một cách nhanh chóng và tiện lợi.",
      author: "Huayuesc",
    },
    checklist: [
      "🏭 Sàng lọc nhà cung cấp + kiểm soát chất lượng tại nguồn",
      "📦 Kho bảo thuế — 3 loại kho chuyên dụng tại khu CN và bến cảng",
      "🚢 Vận chuyển door-to-door / port-to-port, thông quan trực tiếp cảng Hải Phòng",
      "🤝 Mạng lưới phân phối rộng khắp Việt Nam (Hà Nội · HCM · 63 tỉnh)",
      "🤖 AI tối ưu lộ trình + dự báo nhu cầu + tối ưu kho chứa",
      "💳 Thanh toán & quy đổi ngoại tệ + tài chính chuỗi cung ứng",
      "👁 Toàn bộ chuỗi cung ứng hiển thị minh bạch — theo dõi đơn theo thời gian thực",
      "📞 Hỗ trợ tiếng Việt + tiếng Trung 24/7 qua hotline 000-000-000",
    ],
    related: [
      { label: "Liên hệ Huayuesc", href: "/info/contact" },
      { label: "Mạng lưới đối tác", href: "/info/network" },
      { label: "Chính sách vận chuyển & cảng", href: "/info/shipping-policy" },
      { label: "Tham quan nhà máy Trung Quốc", href: "/factory-tour" },
    ],
    primaryCta: { label: "Gửi yêu cầu báo giá DDP", href: "/buying-request" },
  },
  "careers": {
    title: "Tuyển dụng — Cùng Huayue xây cầu Trung-Việt cho VLXD & Nội thất",
    intro:
      "Huayue (CT TNHH Chuỗi Cung Ứng Huayue Việt Nam, MST 0111453693) đang xây dựng chuỗi cung ứng B2B từ các nhà máy hàng đầu Quảng Đông đến nhà phân phối Việt Nam — chuyên về vật liệu xây dựng, vật liệu trang trí nội thất và đồ điện gia dụng nhà bếp – phòng tắm. Chúng tôi tìm những người thực chiến: nhân viên thu mua am hiểu nhà máy Trung Quốc, broker thông quan thuộc lòng VNACCS, sales đại lý đi sâu vào kênh phân phối VLXD/nội thất tại Việt Nam, và phiên dịch Việt-Trung gắn kết hai đội Hà Nội + Quảng Châu.",
    icon: "🚀",
    category: "TUYỂN DỤNG",
    quickFacts: [
      { label: "Vị trí đang tuyển", value: "15-20 vị trí" },
      { label: "Tại Quảng Châu", value: "8 vị trí Sourcing/QC/Audit" },
      { label: "Tại Hải Phòng", value: "10 vị trí Vận hành/Sales/Kho" },
      { label: "Văn phòng", value: "2 (Hải Phòng + Quảng Châu)" },
      { label: "Tiếng Trung", value: "HSK 4+ cho vị trí Quảng Châu" },
      { label: "Hỗ trợ đi TQ", value: "100% chi phí cho vị trí Hải Phòng" },
      { label: "Onboarding", value: "1 tháng thử việc có mentor" },
      { label: "Liên hệ HR", value: "hr@huayuesc.vn" },
    ],
    sectionTitles: [
      "1. Sứ mệnh — Vì sao gia nhập Huayue?",
      "2. Văn hoá Huayue — Chuyên nghiệp · Tin cậy · Hiệu quả",
      "3. Vị trí tại Quảng Châu (Trung Quốc) — Sourcing, QC, Audit",
      "4. Vị trí tại Hải Phòng (Việt Nam) — Vận hành, Thông quan, Kho, Sales",
      "5. Lương, phúc lợi & lộ trình phát triển",
      "6. Quy trình ứng tuyển — 4 bước, 2 tuần",
      "7. Một ngày làm việc tại Huayue",
    ],
    paragraphs: [
      "Việt Nam đang là thị trường tiêu thụ vật liệu xây dựng và đồ nội thất tăng trưởng nhanh hàng đầu Đông Nam Á, nhưng phần lớn doanh nghiệp vẫn nhập khẩu qua trung gian không kiểm soát chất lượng tại gốc. Huayue đứng giữa khoảng trống ấy: chúng tôi không chỉ là một sàn B2B, mà là một chuỗi cung ứng thật — có đội thu mua sống tại Quảng Châu thăm xưởng hàng tuần, có kho và đội thông quan đặt ngay trong Toà Bảo Ngọc Building, Xuân Phương, Hà Nội. Gia nhập Huayue, bạn không 'ngồi trước màn hình' code platform; bạn đi nhà máy, kiểm container, đàm phán giá theo tấn, viết Packing List bằng tiếng Trung, đứng tên broker khai báo VNACCS, gặp đại lý phân phối tại 63 tỉnh. Công việc thật — kết quả thật — đo bằng đơn hàng được giao đúng hạn và khách hàng hài lòng.",
      "Văn hoá Huayue dựa trên ba giá trị cốt lõi: <b>Chuyên nghiệp</b> (mỗi quy trình từ thu mua đến giao kho khách đều có SOP rõ ràng, kiểm tra chéo, ghi nhận bằng văn bản); <b>Tin cậy</b> (giữ lời với cả nhà máy và khách hàng — không hứa cái không làm được, không tăng giá ngầm, không bypass quy trình QC để chiều đơn gấp); <b>Hiệu quả</b> (cắt tối thiểu bước thừa, tự động hoá báo cáo, dùng dữ liệu để quyết định thay vì cảm tính). Chúng tôi không ép giờ máy móc — sales đi gặp khách có thể về sớm; broker cảng có ca chiều khi container về. Không meeting vô nghĩa: mọi cuộc họp ≥4 người phải có agenda và biên bản. Đội Quảng Châu và Hải Phòng họp tuần qua video — buổi sáng tiếng Việt, buổi chiều tiếng Trung; phiên dịch chuyên trách sẵn khi cần.",
      "Vị trí tại văn phòng Quảng Châu (Tầng 3 Cảng Shuyu Chuangxing, quận Hải Châu): <b>Sourcing Manager × 2</b> — phụ trách sàng lọc và đàm phán với nhà máy gốm sứ Phật Sơn / nội thất Lecong / đồ điện Trung Sơn; yêu cầu HSK 5+, 3+ năm sourcing TQ, đã đi ít nhất 20 nhà máy. <b>QC Inspector × 3</b> — kiểm hàng AQL 2.5 trước xuất xưởng, làm việc trực tiếp tại nhà máy, viết báo cáo ảnh/video; ưu tiên có kinh nghiệm gạch porcelain hoặc nội thất gỗ. <b>NCC Auditor × 1</b> — đánh giá năng lực sản xuất, vệ sinh an toàn lao động, môi trường; cần background kỹ thuật. <b>Phiên dịch Việt-Trung Thương mại × 1</b> — HSK 6, hiểu thuật ngữ ngành VLXD/nội thất, đi cùng đoàn buyer Việt Nam đến nhà máy. <b>Logistics Coordinator (Quảng Châu) × 1</b> — đặt container, làm việc với hãng tàu COSCO/MSC/OOCL từ cảng Hoàng Phố/Yantian/Shekou.",
      "Vị trí tại trụ sở Hà Nội (Toà Bảo Ngọc Building, số 02 phố Thanh Lâm, Phường Xuân Phương): <b>Customs Broker × 2</b> — VNACCS/VCIS expert, 3+ năm broker license, am hiểu HS code 3 ngành Huayue và ưu đãi ACFTA/RCEP. <b>Warehouse Manager × 1</b> — quản kho ngoại quan, inventory, inspection container; có chứng chỉ PCCC cho kho chứa sơn. <b>Forklift Operator × 2</b> — bằng B/C, đã làm kho container hàng nhập khẩu. <b>Distribution Sales VLXD × 2</b> — sales đại lý gạch porcelain/sanitary/sơn tại các tỉnh phía Bắc và Trung; ưu tiên đã làm phân phối VLXD. <b>Distribution Sales Nội thất × 2</b> — sales nội thất gỗ/sofa/tủ bếp cho nhà thầu xây dựng, công ty thiết kế, đại lý nội thất. <b>Distribution Sales Đồ điện × 1</b> — bình nóng lạnh, bếp gas, máy hút mùi, nắp bồn cầu thông minh cho dealer điện máy. <b>Marketing B2B × 1</b> — content tiếng Việt cho website, mạng xã hội, hội nghị giới thiệu sản phẩm tại VN. Tất cả JD chi tiết kèm mức lương min/max gửi qua email khi liên hệ hr@huayuesc.vn.",
      "Lương & phúc lợi (thực tế thị trường VN/TQ): Quảng Châu — lương cứng theo benchmark Quảng Đông cho người Việt làm việc tại TQ (cao hơn mức tương đương tại VN 30-50%), bao trọn gói ăn ở (ký túc xá hoặc trợ cấp thuê nhà), bảo hiểm y tế TQ + bảo hiểm sức khoẻ quốc tế. Hải Phòng — lương cứng theo Top 25% thị trường Hải Phòng cho từng vị trí; sales hưởng thêm hoa hồng 1-3% giá trị đơn hàng đã giao thành công, không cap. Phúc lợi chung: BHXH/BHYT/BHTN đầy đủ theo luật VN (hoặc luật TQ với vị trí Quảng Châu), bảo hiểm sức khoẻ thêm cho gia đình, thưởng Tết tháng 13, thưởng KPI quý 10-20% lương. Hỗ trợ học tiếng Trung HSK 4-6 cho nhân viên Hải Phòng (Huayue tài trợ 100% học phí khoá tại Hà Nội/Hải Phòng). Vị trí Hải Phòng được công tác Quảng Châu 1-2 lần/năm — Huayue chi trả 100% visa, vé, khách sạn, per diem. Lộ trình phát triển: Nhân viên → Chuyên viên → Trưởng nhóm → Trưởng bộ phận → Quản lý văn phòng; tăng 15-25% lương mỗi cấp; đánh giá năng lực 6 tháng/lần.",
      "Quy trình ứng tuyển (4 bước, 2 tuần): (1) Gửi CV qua email <b>hr@huayuesc.vn</b> với tiêu đề '[Tên vị trí] - [Họ tên ứng viên] - [Văn phòng ứng tuyển: Hải Phòng hoặc Quảng Châu]'. Đính kèm CV tiếng Việt + tiếng Trung nếu ứng tuyển vị trí Quảng Châu. (2) HR phản hồi trong 3-5 ngày làm việc — cam kết 100% phản hồi, không ghosting. (3) Phỏng vấn trực tiếp/online với HR (30 phút) + trưởng bộ phận (60 phút) — sales test bằng roleplay với khách khó tính, broker test bằng case khai báo HS code, sourcing test bằng tình huống đàm phán giá với nhà máy. (4) Thử việc 1 tháng với mentor 1-1 — cuối kỳ đánh giá để chuyển chính thức. Offer trong 5-7 ngày kể từ buổi phỏng vấn cuối. Negotiate được — Huayue tôn trọng đối thoại lương minh bạch.",
      "Một ngày tại Huayue Quảng Châu (Sourcing Manager): 8:30 đến văn phòng Tầng 3 Cảng Shuyu Chuangxing, check email từ buyer Việt Nam đêm qua. 9:00 đi nhà máy gạch porcelain tại Phật Sơn (45 phút lái xe) cùng QC Inspector — kiểm chất lượng đơn hàng 500 m² của một đại lý Hà Nội. 12:00 ăn trưa với đại diện nhà máy, đàm phán giá đơn tiếp theo. 14:30 về văn phòng, viết PI tiếng Trung gửi nhà máy + bản dịch tiếng Việt gửi buyer. 16:00 video call với đội Hà Nội — đồng bộ trạng thái container đang trên đường. 17:30 xong việc. Một ngày tại Huayue Hà Nội (Customs Broker): 7:30 đến Toà Bảo Ngọc Building, Xuân Phương, Hà Nội, kiểm danh sách container về cảng hôm nay. 8:30 nhận chứng từ từ Quảng Châu (BL, Packing List, Invoice, C/O Form E). 9:00 khai báo VNACCS — tích hợp trực tiếp với hệ thống Tổng cục Hải quan, lệnh thông quan thường ra trong 2-4 giờ. 13:00 phối hợp đội kho dỡ container, inspection lô hàng. 15:00 bàn giao hàng cho xe đi giao tận kho khách tại HN/HCM. 17:30 về.",
    ],
    pullQuote: {
      text: "Chúng tôi không tuyển người để 'gia nhập startup hot'. Chúng tôi tuyển người để cùng xây từng đơn hàng đến nơi, đúng hạn, đúng chất lượng — và làm thế trong 10 năm tới. Nếu bạn thích công việc thật, có trách nhiệm rõ ràng và kết quả đo được, hãy gửi CV.",
      author: "Đội tuyển dụng — Huayue Việt Nam",
    },
    checklist: [
      "💰 Lương Top 25% thị trường Hải Phòng/Quảng Đông + hoa hồng sales 1-3% không cap",
      "🏥 BHXH/BHYT/BHTN đầy đủ + bảo hiểm sức khoẻ thêm cho gia đình",
      "🇨🇳 Tài trợ 100% học tiếng Trung HSK 4-6 cho nhân viên Hải Phòng",
      "✈️ Công tác Quảng Châu 1-2 lần/năm — chi phí Huayue 100%",
      "🏠 Vị trí Quảng Châu: ký túc xá hoặc trợ cấp thuê nhà + bảo hiểm y tế TQ",
      "📚 Đào tạo SOP nội bộ + chứng chỉ VNACCS broker (Hải Phòng) + AQL Inspector (Quảng Châu)",
      "🤝 Cam kết phản hồi 100% ứng viên trong 3-5 ngày, không ghosting",
      "📈 Lộ trình phát triển rõ ràng — review năng lực 6 tháng/lần",
    ],
    faq: [
      {
        q: "Tôi muốn ứng tuyển vị trí Quảng Châu — phải sống ở TQ chưa hay Huayue hỗ trợ chuyển?",
        a: "Huayue hỗ trợ làm thị thực lao động (Z-visa) và thẻ tạm trú cho ứng viên được offer vị trí Quảng Châu. Có gói relocation 50-100 triệu VNĐ (vé, vận chuyển đồ, đặt cọc thuê nhà tháng đầu). Yêu cầu: HSK 5+ và đã từng đi TQ ít nhất 1 lần. Ưu tiên người đã có kinh nghiệm sourcing/QC tại TQ.",
      },
      {
        q: "Tôi không biết tiếng Trung — có vị trí phù hợp tại Hải Phòng không?",
        a: "Có. Customs Broker, Warehouse Manager, Forklift Operator, Distribution Sales, Marketing B2B đều KHÔNG yêu cầu tiếng Trung — chỉ cần tiếng Việt + tiếng Anh thương mại cơ bản. Huayue tài trợ học tiếng Trung HSK 4-6 cho nhân viên muốn phát triển; sau 1-2 năm có thể được điều chuyển sang vị trí Quảng Châu.",
      },
      {
        q: "Mức lương cụ thể từng vị trí là bao nhiêu?",
        a: "Huayue gửi mức lương min-max cụ thể qua email khi bạn ứng tuyển, dựa trên thị trường Hải Phòng (cho vị trí VN) hoặc Quảng Đông (cho vị trí TQ) và kinh nghiệm thực tế. Ví dụ tham khảo: Customs Broker 18-30 triệu VNĐ + thưởng KPI · Distribution Sales 12-20 triệu VNĐ + hoa hồng 1-3% · Sourcing Manager Quảng Châu CNY 12,000-20,000 + ăn ở + bảo hiểm.",
      },
      {
        q: "Tôi đang làm cho công ty cùng ngành — có conflict of interest không?",
        a: "Khi nhận offer, bạn sẽ ký NDA tiêu chuẩn về thông tin nhà máy/khách hàng. Không cấm bạn rời sang đối thủ sau khi nghỉ việc (Huayue không có non-compete cứng theo luật VN), nhưng yêu cầu giữ bí mật danh sách NCC và giá thoả thuận trong 12 tháng.",
      },
      {
        q: "Có chương trình thực tập / fresher không?",
        a: "Có. Chúng tôi nhận 4-6 thực tập sinh mỗi năm cho vị trí Sales/Marketing/Logistics tại Hải Phòng. Thời gian 3-6 tháng, lương 5-8 triệu VNĐ/tháng + cơ hội chuyển nhân viên chính thức nếu phù hợp. Recruit tháng 3 và tháng 9 hàng năm. Gửi CV qua hr@huayuesc.vn với tiêu đề bắt đầu '[Thực tập]'.",
      },
      {
        q: "Huayue có tuyển người nước ngoài không?",
        a: "Có cho vị trí Quảng Châu (người Trung Quốc bản địa được ưu tiên). Vị trí Hải Phòng ưu tiên người Việt Nam vì cần am hiểu thị trường địa phương. Trường hợp đặc biệt (kỹ năng hiếm như phiên dịch song ngữ chuyên ngành), Huayue có thể sponsor work permit theo quy định Bộ LĐ-TBXH.",
      },
    ],
    related: [
      { label: "Liên hệ Huayue", href: "/info/contact" },
      { label: "Giới thiệu công ty", href: "/info/about-us" },
      { label: "Mạng lưới đối tác", href: "/info/network" },
      { label: "Hai văn phòng — Quảng Châu + Hải Phòng", href: "/info/contact" },
    ],
    primaryCta: { label: "Gửi CV — hr@huayuesc.vn", href: "mailto:hr@huayuesc.vn" },
  },
  "terms-of-service": {
    title: "Điều khoản sử dụng — Huayuesc",
    intro:
      "Đây là thoả thuận pháp lý ràng buộc giữa bạn và Huayuesc — tên thương mại của CÔNG TY TNHH CHUỖI CUNG ỨNG HUAYUE VIỆT NAM (mã số thuế 0111453693), trụ sở chính tại Tầng 07, Toà Bảo Ngọc Building, số 02 phố Thanh Lâm, Phường Xuân Phương, Thành phố Hà Nội, Việt Nam. Vui lòng đọc kỹ trước khi sử dụng nền tảng. Bằng việc đăng ký tài khoản, gửi RFQ, hoặc bất kỳ giao dịch nào trên nền tảng, bạn xác nhận đã hiểu, chấp nhận và đồng ý chịu sự ràng buộc của toàn bộ điều khoản dưới đây.",
    icon: "📜",
    category: "PHÁP LÝ",
    quickFacts: [
      { label: "Phiên bản", value: "v1.0 (2026)" },
      { label: "Hiệu lực từ", value: "01/01/2026" },
      { label: "Pháp luật áp dụng", value: "Pháp luật Việt Nam" },
      { label: "Trọng tài", value: "VIAC Hà Nội" },
      { label: "Liability cap", value: "$10,000 / giao dịch" },
      { label: "Notice period", value: "30 ngày" },
      { label: "Refund policy", value: "100% qua Bảo đảm Giao dịch" },
      { label: "Pháp nhân", value: "CT TNHH Chuỗi Cung Ứng Huayue VN (MST 0111453693)" },
    ],
    sectionTitles: [
      "1. Phạm vi áp dụng & Định nghĩa",
      "2. Đăng ký tài khoản & Xác minh",
      "3. Quyền & Nghĩa vụ Buyer (Người mua)",
      "4. Quyền & Nghĩa vụ Supplier (NCC)",
      "5. Giao dịch, Thanh toán & Bảo đảm Giao dịch",
      "6. Vận chuyển, Hải quan & Thuế",
      "7. Hoàn tiền, Đổi hàng & Bồi thường",
      "8. Sở hữu trí tuệ & Cấm hành vi",
      "9. Bảo mật, Cookies & Dữ liệu cá nhân",
      "10. Trách nhiệm & Giới hạn pháp lý",
      "11. Bất khả kháng (Force Majeure)",
      "12. Tranh chấp, Trọng tài & Luật áp dụng",
      "13. Chấm dứt & Đóng tài khoản",
      "14. Sửa đổi điều khoản & Thông báo",
    ],
    paragraphs: [
      "Huayuesc (sau đây gọi tắt 'Huayue' hoặc 'Nền tảng') là nền tảng B2B chuỗi cung ứng kết nối người mua tại Việt Nam với nhà cung cấp vật liệu xây dựng, vật liệu trang trí nội thất và đồ điện gia dụng nhà bếp – phòng tắm tại Trung Quốc. Huayue vận hành tại tên miền huayuesc.vn cùng các mobile app phụ trợ. Pháp nhân chính: CÔNG TY TNHH CHUỖI CUNG ỨNG HUAYUE VIỆT NAM (MST 0111453693), trụ sở chính tại Tầng 07, Toà Bảo Ngọc Building, số 02 phố Thanh Lâm, Phường Xuân Phương, Hà Nội; văn phòng đại diện thu mua tại Tầng 3, Tòa 1, Cảng Shuyu Chuangxing, đường Tân Cảng Đông, quận Hải Châu, Quảng Châu, Trung Quốc. Huayue cung cấp chuỗi dịch vụ trọn gói: tinh chọn nguồn gốc và hỗ trợ thu mua, kho bãi tại Trung Quốc, vận chuyển xuyên biên giới và thông quan, phát triển kênh phân phối tại Việt Nam — kèm Bảo đảm Giao dịch cho mọi đơn hàng. Huayue KHÔNG sở hữu hàng hoá của nhà cung cấp, KHÔNG là bên bán hàng trực tiếp, mà đóng vai trò chuỗi cung ứng trung gian + dịch vụ logistics + audit nhà máy. Người dùng phân thành 4 nhóm: (a) Visitor — chưa đăng ký, xem được nội dung công khai. (b) Buyer — cá nhân/doanh nghiệp Việt Nam mua hàng (yêu cầu đủ 18 tuổi, đại diện pháp lý nếu thay mặt doanh nghiệp). (c) Supplier — NCC đã được Huayue audit thực địa tại nhà máy. (d) Partner — đối tác chiến lược (logistics, payment, certification, distribution).",
      "Đăng ký tài khoản yêu cầu cung cấp thông tin chính xác: họ tên, email, số điện thoại di động (xác minh OTP), công ty + mã số thuế (cho doanh nghiệp), địa chỉ giao hàng tại Việt Nam. Mỗi cá nhân chỉ được tạo tối đa 1 tài khoản Buyer; doanh nghiệp có thể có 1 master account + tối đa 10 sub-account cho nhân viên. Huayue thực hiện KYC (Know Your Customer) cho mọi giao dịch ≥$10,000 USD theo Luật Phòng chống rửa tiền VN — Buyer cần cung cấp giấy phép kinh doanh + CCCD đại diện pháp lý. Bạn có trách nhiệm bảo mật mật khẩu, không chia sẻ tài khoản — Huayue không chịu trách nhiệm cho thiệt hại do bạn để lộ thông tin đăng nhập. Khuyến nghị bật 2FA tại /buyer-center/settings/security. Huayue có quyền tạm khoá hoặc chấm dứt tài khoản (theo quy trình ở Mục 13) nếu: thông tin gian lận, hành vi spam, vi phạm bản quyền, lạm dụng Bảo đảm Giao dịch, vi phạm điều khoản này, hoặc theo yêu cầu hợp pháp của cơ quan chức năng.",
      "Quyền của Buyer: (i) Truy cập miễn phí toàn bộ nền tảng — KHÔNG có phí thành viên, phí giao dịch hoặc commission. (ii) Gửi không giới hạn RFQ tới Supplier verified. (iii) Sử dụng dịch vụ Bảo đảm Giao dịch miễn phí cho mọi đơn ≥$100. (iv) Yêu cầu audit nhà máy on-site miễn phí cho đơn ≥$5,000 USD (đội Huayue tại Quảng Châu thực hiện). (v) Hỗ trợ Customer Success tiếng Việt qua hotline 000-000-000 và email support@huayuesc.vn. (vi) Quyền khiếu nại trong 7 ngày kể từ ngày nhận hàng. (vii) Quyền truy cập, sửa, xoá dữ liệu cá nhân theo NĐ 13/2023. Nghĩa vụ của Buyer: (a) Cung cấp thông tin chính xác khi đăng ký + giao dịch. (b) Tuân thủ pháp luật Việt Nam (đặc biệt: cấm nhập hàng giả, hàng cấm, hàng vi phạm sở hữu trí tuệ đã đăng ký tại VN). (c) Thanh toán đầy đủ, đúng hạn theo PI/PO đã ký. (d) Phản hồi yêu cầu xác nhận hàng trong 14 ngày kể từ ngày giao (sau đó hệ thống auto-release). (e) KHÔNG sử dụng nền tảng cho hoạt động bất hợp pháp (rửa tiền, trốn thuế, gian lận thương mại).",
      "Quyền của Supplier: (i) Hiển thị sản phẩm + nhận RFQ từ Buyer Việt Nam thuộc 3 ngành Huayue tập trung (vật liệu xây dựng, vật liệu trang trí, đồ điện gia dụng nhà bếp – phòng tắm). (ii) Hưởng commission rate cạnh tranh (5% cho đơn thông thường, 3% cho đối tác chiến lược). (iii) Quyền pre-screen Buyer — từ chối đơn không phù hợp năng lực sản xuất. (iv) Hỗ trợ marketing tại Việt Nam (landing page tiếng Việt, dịch catalogue, tham gia hội nghị giới thiệu sản phẩm). (v) Báo cáo audit thực địa có giá trị marketing cho buyer. Nghĩa vụ của Supplier: (a) Pass quy trình audit thực địa của đội Huayue Quảng Châu trước khi go-live. (b) Cập nhật giá + MOQ + thời gian giao chính xác. (c) Phản hồi RFQ trong 24 giờ. (d) Sản xuất + giao hàng đúng PO đã ký, không thay đổi spec không thông báo. (e) Hợp tác với QC inspector của Huayue trước xuất xưởng. (f) Không bypass nền tảng (cấm liên hệ Buyer ngoài Huayue để giao dịch trực tiếp — vi phạm bị huỷ tư cách đối tác vĩnh viễn + phạt 5% giá trị đơn).",
      "Mọi giao dịch ≥$100 USD trên Huayue được bảo vệ bởi Bảo đảm Giao dịch — đây là điểm khác biệt cốt lõi của nền tảng. Cơ chế: (1) Buyer thanh toán T/T 30% deposit + 70% balance vào tài khoản tín thác của Huayue tại ngân hàng đối tác tại Việt Nam và Trung Quốc. (2) Tiền KHÔNG được release cho Supplier cho đến khi: Buyer xác nhận hàng đúng mô tả qua dashboard, HOẶC 14 ngày kể từ ngày giao mà Buyer không phản hồi (auto-release), HOẶC dispute được giải quyết theo Mục 7. (3) Phí dịch vụ: Huayue thu 5% commission từ Supplier (KHÔNG thu Buyer). (4) Phương thức thanh toán hỗ trợ: T/T (telegraphic transfer), Letter of Credit (L/C — cho đơn ≥$100K), Online Banking quốc tế qua đối tác fintech (cho đơn nhỏ <$5K). (5) Tỷ giá: theo tỷ giá liên ngân hàng tham chiếu realtime, có buffer 0.5% phòng biến động. (6) Phí ngân hàng: Buyer trả phí chuyển tiền đi (~0.1-0.3%), Supplier trả phí nhận tiền về.",
      "Vận chuyển hàng hoá tuân thủ Incoterms 2020 (FOB / CIF / DDP) — chi tiết tại /info/shipping-policy. Hải quan: đội thông quan của Huayue đặt tại cảng Hải Phòng đứng tên doanh nghiệp khai báo (theo uỷ quyền của Buyer), tích hợp trực tiếp với e-customs Tổng cục Hải quan Việt Nam (VNACCS/VCIS). Thuế nhập khẩu: tính theo HS code chính xác + biểu thuế MFN của Bộ Tài chính (riêng hàng từ Trung Quốc có ưu đãi ACFTA, RCEP — giảm 0-10%). VAT: 10% trên giá CIF + thuế nhập khẩu. Thuế tiêu thụ đặc biệt: không áp dụng cho 3 ngành Huayue kinh doanh (VLXD, trang trí nội thất, đồ điện gia dụng nhà bếp – phòng tắm). Phí thông quan: $80-150/lô, đã bao gồm trong DDP. Buyer chịu trách nhiệm: cung cấp thông tin HS code chính xác, đảm bảo hàng không thuộc Danh mục cấm nhập (Phụ lục Nghị định 69/2018/NĐ-CP), thanh toán bổ sung nếu hải quan re-classify HS code dẫn đến thuế cao hơn (Huayue thông báo trước, Buyer có 7 ngày phản hồi).",
      "Bảo đảm Giao dịch — Refund Policy: Buyer có quyền yêu cầu hoàn tiền/đổi hàng/bồi thường nếu hàng không đúng cam kết. Quy trình: (Bước 1) Gửi khiếu nại qua dashboard hoặc support@huayuesc.vn TRONG 7 NGÀY kể từ ngày nhận hàng, kèm chứng cứ (ảnh, video, biên bản nghiệm thu). (Bước 2) Đội Bảo đảm Giao dịch của Huayue review trong 24 giờ, liên hệ Buyer + Supplier để xác minh; đội Quảng Châu có thể đến nhà máy kiểm tra nếu cần. (Bước 3) Quyết định trong 3-7 ngày làm việc với 4 phương án: (a) Hoàn 100% từ tài khoản tín thác — nếu hàng sai mô tả nghiêm trọng (sai SKU, sai chủng loại). (b) Đổi hàng miễn phí — Supplier sản xuất lại + free DDP về VN, thời gian giao mới được commit. (c) Bồi thường thoả thuận — giảm giá X% nếu lỗi nhỏ và Buyer chấp nhận giữ hàng. (d) Hỗ trợ giảm giá đơn tiếp — Buyer dùng credit cho lần sau. Trường hợp dispute không thoả thuận được trong 21 ngày → chuyển lên trọng tài VIAC theo Mục 12.",
      "Toàn bộ nội dung do Huayue tạo ra (giao diện, code, brand identity, tài liệu, hình ảnh original, video, blog post) thuộc bản quyền của CÔNG TY TNHH CHUỖI CUNG ỨNG HUAYUE VIỆT NAM. Người dùng được phép xem, in cho mục đích cá nhân/doanh nghiệp nội bộ; KHÔNG được sao chép, phân phối, sửa đổi, reverse-engineer mà không có văn bản đồng ý. Hình ảnh sản phẩm do Supplier upload thuộc bản quyền của Supplier — Buyer chỉ được dùng cho mục đích bán lại sản phẩm đó của Supplier (không dùng cho sản phẩm khác). Logo 'Huayuesc' đang trong quá trình đăng ký bảo hộ nhãn hiệu tại Cục Sở hữu trí tuệ Việt Nam. Cấm hành vi: scraping nền tảng (rate limit + WAF), tạo tài khoản fake hàng loạt, spam RFQ vô tổ chức, đăng nội dung vi phạm IP/khiêu dâm/bạo lực, lừa đảo Buyer khác, đe doạ/quấy rối nhân viên Huayue. Vi phạm bị xử lý theo Luật Sở hữu trí tuệ VN + Bộ luật Hình sự nếu cần.",
      "Huayue thu thập, xử lý dữ liệu cá nhân theo Chính sách bảo mật chi tiết tại /info/privacy-policy — tuân thủ NĐ 13/2023/NĐ-CP, PIPL 2021 và GDPR khi áp dụng. Người dùng có 11 quyền cơ bản (xem, sửa, xoá, hạn chế xử lý, portability, etc.) — gửi yêu cầu tới privacy@huayuesc.vn. Truyền dữ liệu xuyên biên giới VN–CN giữa trụ sở Hà Nội và văn phòng đại diện Quảng Châu được bảo vệ qua Standard Contractual Clauses (SCCs); Huayue đang trong quá trình hoàn tất đăng ký truyền dữ liệu xuyên biên giới với Cục An toàn thông tin theo Điều 25 NĐ 13/2023. Cookies: 4 nhóm (thiết yếu / phân tích / marketing / partner), banner consent với 3 lựa chọn. Huayue KHÔNG bán dữ liệu cho data broker. Lưu giữ chứng từ giao dịch 10 năm theo Luật Quản lý thuế VN. Khi Buyer đóng tài khoản: hard-delete trong 30 ngày + cấp Certificate of Erasure nếu yêu cầu.",
      "Trách nhiệm của Huayue giới hạn ở việc cung cấp nền tảng + dịch vụ chuỗi cung ứng theo điều khoản này. Huayue cam kết uptime ≥99.5% (đo trên huayuesc-status.io) nhưng KHÔNG bảo đảm liên tục 100% — gián đoạn do bảo trì định kỳ được thông báo 48h trước. Huayue cung cấp thông tin Supplier dựa trên audit thực tế tại nhà máy nhưng KHÔNG bảo đảm tuyệt đối — Buyer có trách nhiệm tự thẩm định bổ sung khi cần (đặc biệt với đơn ≥$50K). Trách nhiệm bồi thường tối đa của Huayue cho mỗi giao dịch giới hạn ở: (a) Giá trị giao dịch đó, hoặc (b) $10,000 USD, tuỳ theo số nào nhỏ hơn. Huayue KHÔNG chịu trách nhiệm cho thiệt hại gián tiếp như: mất doanh thu kỳ vọng, thiệt hại uy tín thương hiệu, mất khách hàng cuối, chi phí cơ hội, lãi vay phát sinh do delay. Trường hợp Huayue cố ý vi phạm (gross negligence/willful misconduct), giới hạn này không áp dụng theo Điều 442 Bộ luật Dân sự VN.",
      "Bất khả kháng (Force Majeure): Huayue, Buyer và Supplier được miễn trách nhiệm nếu không thực hiện được nghĩa vụ do sự kiện vượt khả năng kiểm soát hợp lý, bao gồm nhưng không giới hạn: (i) Thiên tai (động đất, lũ lụt, bão, hoả hoạn). (ii) Chiến tranh, khủng bố, bạo loạn, đình công công cộng. (iii) Sự cố hạ tầng quốc gia (đứt cáp internet quốc tế, mất điện diện rộng, đóng cửa khẩu Hữu Nghị / Móng Cái / cảng Hải Phòng). (iv) Đại dịch quy mô lớn (COVID-style lockdown). (v) Quyết định/lệnh của cơ quan nhà nước (cấm vận, thay đổi chính sách thuế đột ngột, đình chỉ tạm thời ngành sản xuất). (vi) Sự cố cyberattack quy mô quốc gia. Bên gặp force majeure phải thông báo bên kia trong 5 ngày kể từ khi sự kiện xảy ra. Nếu sự kiện kéo dài >60 ngày, các bên có quyền đàm phán huỷ hợp đồng + hoàn cọc theo tỉ lệ hoàn thành công việc.",
      "Tranh chấp 3 cấp giải quyết: (Cấp 1 — Mediation tại Huayue) Đội Dispute Resolution của Huayue trung gian đàm phán Buyer + Supplier trong 7 ngày làm việc; đội Quảng Châu hỗ trợ verify tại nhà máy nếu cần. Miễn phí. (Cấp 2 — Trọng tài VIAC) Nếu không thoả thuận được, vụ việc được chuyển lên Trung tâm Trọng tài Quốc tế Việt Nam (VIAC) tại Hà Nội theo Quy tắc tố tụng VIAC hiện hành. Ngôn ngữ: tiếng Việt (mặc định) hoặc tiếng Anh (theo thoả thuận). Số trọng tài viên: 1 (cho tranh chấp <$50K), 3 (cho ≥$50K). Phí trọng tài theo biểu phí VIAC (~3-5% giá trị tranh chấp), phân chia theo phán quyết. Quyết định VIAC là CUỐI CÙNG và RÀNG BUỘC, có giá trị thi hành tại Việt Nam và Trung Quốc theo Công ước New York 1958. (Cấp 3 — Toà án) Tranh chấp giữa Người dùng và Huayue (không liên quan giao dịch) áp dụng luật Việt Nam, toà án có thẩm quyền là TAND TP Hà Nội. Huayue KHÔNG chấp nhận đơn kiện tập thể (class-action) — mỗi tranh chấp giải quyết cá nhân.",
      "Chấm dứt tài khoản: (a) Người dùng tự nguyện đóng — bất cứ lúc nào qua /buyer-center/settings, hoàn tất trong 7 ngày làm việc, dữ liệu lưu 90 ngày để xử lý nốt giao dịch đang dở rồi hard-delete. (b) Huayue chấm dứt do người dùng vi phạm — thông báo bằng văn bản qua email 7 ngày trước khi áp dụng, trừ trường hợp khẩn cấp (gian lận, cyberattack). Người dùng có 7 ngày để giải trình hoặc khôi phục. (c) Huayue chấm dứt do vi phạm pháp luật — áp dụng ngay, không thông báo trước; Huayue có thể hợp tác với cơ quan điều tra. Sau chấm dứt: tài khoản vô hiệu hoá, không đăng nhập được; giao dịch đang xử lý vẫn được hoàn tất theo trạng thái tài khoản tín thác; tiền cọc của Buyer được hoàn theo Mục 7; commission của Supplier được giải quyết theo PO ký trước thời điểm chấm dứt.",
      "Huayue có quyền sửa đổi điều khoản này để phù hợp với pháp luật, công nghệ và thực tế kinh doanh. Quy trình: (i) Soạn thảo + review nội bộ + cố vấn pháp lý ký duyệt. (ii) Thông báo người dùng 30 NGÀY trước khi áp dụng qua: email cho mọi tài khoản đang hoạt động, banner trên website + app, push notification mobile app. (iii) Người dùng tiếp tục sử dụng nền tảng sau ngày hiệu lực = chấp nhận điều khoản mới. Người dùng không đồng ý có quyền đóng tài khoản trước ngày hiệu lực — không bị tính phí, dữ liệu hoàn tất xoá theo Mục 13. (iv) Phiên bản cũ được archive tại /info/terms-of-service/lich-su để tham chiếu. (v) Trường hợp thay đổi material ảnh hưởng quyền lợi (vd: tăng commission rate, thay đổi liability cap), Huayue yêu cầu re-consent rõ ràng — không tự động áp dụng.",
    ],
    pullQuote: {
      text: "Điều khoản sử dụng không phải để bảo vệ chúng tôi khỏi bạn — mà để định nghĩa rõ ràng cách Huayue, Buyer và Supplier hợp tác công bằng. Sự minh bạch là nền tảng của niềm tin B2B.",
      author: "Cố vấn pháp lý — Huayue Việt Nam",
    },
    checklist: [
      "Pháp nhân CT TNHH Chuỗi Cung Ứng Huayue Việt Nam — MST 0111453693, đăng ký kinh doanh đầy đủ",
      "Trụ sở chính: Toà Bảo Ngọc Building, Xuân Phương, Hà Nội · Văn phòng đại diện: Quảng Châu, Trung Quốc",
      "Tuân thủ pháp luật Việt Nam: Bộ luật Dân sự, Luật Thương mại, Luật Quản lý thuế, NĐ 13/2023, NĐ 69/2018",
      "Bảo đảm Giao dịch qua tài khoản tín thác tại ngân hàng đối tác Việt Nam và Trung Quốc",
      "Trọng tài 3 cấp: Mediation Huayue → VIAC Hà Nội → TAND Hà Nội",
      "Liability cap $10K hoặc giá trị giao dịch (tuỳ thấp hơn) — tuân thủ Điều 442 BLDS VN",
      "Force majeure clause đầy đủ — bảo vệ cả 3 bên khi sự cố ngoài kiểm soát",
      "Notice 30 ngày khi sửa đổi material + re-consent rõ ràng",
    ],
    faq: [
      {
        q: "Tôi có thể từ chối điều khoản không?",
        a: "Có. Nếu không đồng ý, đừng đăng ký tài khoản hoặc giao dịch. Bạn vẫn có thể xem nội dung công khai (sản phẩm, blog, info pages) như Visitor mà không bị ràng buộc bởi điều khoản giao dịch.",
      },
      {
        q: "Điều khoản có áp dụng cho Buyer cá nhân không?",
        a: "Có, nhưng Huayue ưu tiên dịch vụ cho Buyer doanh nghiệp (có MST). Buyer cá nhân được phép giao dịch nhưng giới hạn $5,000 USD/đơn (theo quy định Phòng chống rửa tiền) và một số dịch vụ enterprise (audit nhà máy miễn phí, quản lý tài khoản dedicated) không áp dụng.",
      },
      {
        q: "Liability cap $10K có áp dụng cho mọi trường hợp không?",
        a: "Không. Cap không áp dụng khi Huayue cố ý vi phạm (gross negligence/willful misconduct) hoặc trong trường hợp pháp luật VN buộc trách nhiệm vô hạn (Điều 442 BLDS — vi phạm hợp đồng có yếu tố lừa đảo).",
      },
      {
        q: "Tôi muốn kiện Huayue ở Trung Quốc được không?",
        a: "Theo điều khoản này, mọi tranh chấp giải quyết tại Việt Nam (VIAC Hà Nội hoặc TAND Hà Nội). Tuy nhiên, quyết định VIAC có hiệu lực thi hành tại Trung Quốc theo Công ước New York 1958, nên Buyer có thể yêu cầu enforcement tại Trung Quốc nếu cần.",
      },
      {
        q: "Huayue có thể đổi commission rate đột ngột không?",
        a: "Không. Thay đổi commission rate (hiện 5%) là thay đổi material ảnh hưởng quyền lợi của Supplier — phải thông báo 30 ngày trước + có quyền opt-out (đóng tài khoản trước ngày hiệu lực, không bị penalty).",
      },
    ],
    related: [
      { label: "Chính sách bảo mật", href: "/info/privacy-policy" },
      { label: "Bảo vệ thanh toán", href: "/info/payment-protection" },
      { label: "Khiếu nại & tranh chấp", href: "/info/disputes" },
      { label: "Chính sách vận chuyển", href: "/info/shipping-policy" },
      { label: "Liên hệ Huayue", href: "/info/contact" },
    ],
    primaryCta: { label: "Có thắc mắc? Liên hệ Legal", href: "/info/contact" },
  },
  "privacy-policy": {
    title: "Chính sách bảo mật & Bảo vệ dữ liệu cá nhân",
    intro:
      "Huayuesc — tên thương mại của CÔNG TY TNHH CHUỖI CUNG ỨNG HUAYUE VIỆT NAM (MST 0111453693) — cam kết bảo mật dữ liệu người dùng theo tiêu chuẩn ISO/IEC 27001:2022, Nghị định 13/2023/NĐ-CP của Việt Nam, Personal Information Protection Law (PIPL) của Trung Quốc và GDPR (EU) khi áp dụng. Chính sách này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ, chia sẻ và bảo vệ dữ liệu cá nhân của bạn — bằng ngôn ngữ rõ ràng, không ẩn ý.",
    icon: "🔒",
    category: "PHÁP LÝ",
    quickFacts: [
      { label: "Phiên bản", value: "v1.0 (2026)" },
      { label: "Hiệu lực từ", value: "01/01/2026" },
      { label: "Pháp nhân kiểm soát", value: "CT TNHH Chuỗi Cung Ứng Huayue VN (MST 0111453693)" },
      { label: "Tuân thủ VN", value: "NĐ 13/2023" },
      { label: "Tuân thủ CN", value: "PIPL 2021" },
      { label: "Mã hoá", value: "TLS 1.3 + AES-256" },
      { label: "DPO email", value: "privacy@huayuesc.vn" },
      { label: "DPO hotline", value: "000-000-000" },
    ],
    sectionTitles: [
      "1. Phạm vi & Định nghĩa",
      "2. Thông tin chúng tôi thu thập",
      "3. Mục đích & Cơ sở pháp lý xử lý",
      "4. Cookies & Công nghệ theo dõi",
      "5. Chia sẻ với bên thứ ba",
      "6. Truyền dữ liệu xuyên biên giới VN–CN",
      "7. Lưu trữ & Vòng đời dữ liệu",
      "8. Biện pháp bảo mật kỹ thuật & tổ chức",
      "9. 11 Quyền của bạn theo NĐ 13/2023",
      "10. Bảo vệ trẻ em dưới 16 tuổi",
      "11. Sự cố dữ liệu & Quy trình thông báo",
      "12. Sửa đổi chính sách & Liên hệ DPO",
    ],
    paragraphs: [
      "Chính sách này áp dụng cho toàn bộ dịch vụ tại Huayuesc (huayuesc.vn), bao gồm website B2B, mobile app (iOS/Android sắp ra mắt), và mọi tương tác offline với đội Huayue tại trụ sở chính Hà Nội + văn phòng đại diện thu mua Quảng Châu. Định nghĩa: 'Dữ liệu cá nhân' = thông tin có thể nhận dạng trực tiếp/gián tiếp một cá nhân (theo Điều 2 NĐ 13/2023). 'Người dùng' = Buyer (cá nhân/doanh nghiệp Việt Nam), Supplier (NCC Trung Quốc), Visitor (chưa đăng ký). 'Bên kiểm soát dữ liệu' = CÔNG TY TNHH CHUỖI CUNG ỨNG HUAYUE VIỆT NAM (MST 0111453693, trụ sở Toà Bảo Ngọc Building, Xuân Phương, Hà Nội). 'Bên xử lý dữ liệu' = các nhà cung cấp dịch vụ được ủy quyền (cloud hosting, payment processors, logistics partners). 'Đồng thuận' = sự chấp thuận có hiểu biết, tự nguyện và rõ ràng theo Điều 11 NĐ 13/2023.",
      "Chúng tôi thu thập 5 nhóm dữ liệu chính: (A) Thông tin tài khoản — họ tên, email, số điện thoại, công ty, mã số thuế, địa chỉ giao hàng, mật khẩu (đã hash bcrypt). (B) Thông tin giao dịch — RFQ, đơn hàng, sản phẩm yêu thích, lịch sử thanh toán (chỉ status, không lưu số thẻ — payment processor đối tác xử lý), tracking number, dispute history. (C) Thông tin thiết bị & log — địa chỉ IP, user agent, OS, browser, ngôn ngữ, thời gian truy cập, các trang đã xem (lưu 90 ngày phục vụ analytics + security audit). (D) Nội dung giao tiếp — chat với supplier qua nền tảng, transcript video call (chỉ lưu khi người dùng confirm), email gửi qua hệ thống, comments trên review. (E) Thông tin bên thứ ba — khi đăng nhập qua Google/Apple/Facebook, Huayue nhận: email, tên, avatar (chỉ những trường bạn đồng ý chia sẻ qua OAuth consent screen). KHÔNG thu thập: số CMND/CCCD/passport (trừ khi yêu cầu KYC cho giao dịch ≥$10K), thông tin sinh trắc học, dữ liệu y tế, tôn giáo, quan điểm chính trị (theo định nghĩa 'dữ liệu cá nhân nhạy cảm' tại Điều 2.4 NĐ 13/2023).",
      "Huayue xử lý dữ liệu dựa trên 4 cơ sở pháp lý theo Điều 11 NĐ 13/2023: (1) Sự đồng thuận — bạn check 'Tôi đồng ý' khi đăng ký, có quyền rút lại bất cứ lúc nào. (2) Thực hiện hợp đồng — xử lý dữ liệu cần thiết để cung cấp dịch vụ B2B đã thoả thuận (RFQ, đặt hàng, vận chuyển, after-sales). (3) Nghĩa vụ pháp lý — lưu trữ chứng từ thuế 10 năm theo Luật Quản lý thuế VN, lưu hoá đơn điện tử theo Nghị định 123/2020/NĐ-CP. (4) Lợi ích chính đáng — phòng chống gian lận, bảo mật hệ thống, cải thiện sản phẩm (chỉ áp dụng khi không xâm phạm quyền lợi căn bản của bạn). Mục đích cụ thể: cung cấp & cá nhân hoá dịch vụ, kết nối Buyer–Supplier, xử lý thanh toán & vận chuyển, gửi notification giao dịch, ngăn chặn gian lận / abuse, cải tiến sản phẩm thông qua phân tích aggregate data, marketing (chỉ với Buyer đồng ý opt-in), tuân thủ pháp luật + yêu cầu cơ quan chức năng.",
      "Huayuesc sử dụng 4 nhóm cookies với chính sách rõ ràng và bảng quản lý cookies tại /info/quan-ly-cookies: (a) Cookies thiết yếu — duy trì đăng nhập, giỏ hàng RFQ, ngôn ngữ, không yêu cầu đồng thuận theo Điều 6 NĐ 13/2023 (necessary for service). Ví dụ: csr_session, csr_locale, csr_csrf. (b) Cookies phân tích — Google Analytics 4 (anonymized IP), Hotjar session replay (mask sensitive fields), Mixpanel funnel. Yêu cầu opt-in. Lưu 24 tháng. (c) Cookies marketing — Facebook Pixel, Google Ads, LinkedIn Insight, TikTok Pixel. Yêu cầu opt-in. Lưu 12 tháng. (d) Cookies từ NCC partner — chỉ kích hoạt khi bạn click vào product page của Supplier (cá biệt). Banner cookie consent xuất hiện khi truy cập lần đầu, có 3 lựa chọn: Đồng ý tất cả / Chỉ thiết yếu / Tuỳ chỉnh. Có thể đổi lựa chọn bất cứ lúc nào tại /buyer-center/settings/privacy.",
      "Huayue chia sẻ dữ liệu với 5 nhóm bên thứ ba, mỗi nhóm có hợp đồng Data Processing Agreement (DPA) ràng buộc tuân thủ NĐ 13/2023 + GDPR-equivalent: (1) Suppliers/NCC — chỉ chia sẻ thông tin tối thiểu cần thiết để hoàn tất đơn hàng (tên người liên hệ, công ty, địa chỉ giao, SKU yêu cầu); KHÔNG chia sẻ email/số điện thoại trực tiếp — mọi giao tiếp đi qua relay của Huayue. (2) Ngân hàng đối tác tại Việt Nam và Trung Quốc cho dịch vụ tài khoản tín thác Bảo đảm Giao dịch; payment processors cho thanh toán quốc tế — họ chỉ thấy thông tin tối thiểu để xử lý giao dịch + tuân thủ KYC. (3) Đối tác logistics + đối tác thông quan cảng Hải Phòng — chia sẻ địa chỉ giao + tracking number + nội dung kê khai hải quan. (4) Service providers — AWS Singapore (hosting), Cloudflare (CDN, anti-DDoS), Twilio (SMS OTP), SendGrid (email transactional), Sentry (error tracking, scrubs PII). (5) Cơ quan nhà nước — chỉ khi có yêu cầu hợp pháp bằng văn bản (lệnh khám xét, công văn truy tố), Huayue công bố báo cáo Transparency Report hàng năm về số lượng yêu cầu nhận được. KHÔNG bao giờ bán dữ liệu cho data broker hoặc bên thứ ba để marketing.",
      "Huayue vận hành xuyên biên giới Việt Nam – Trung Quốc: dữ liệu Buyer Việt Nam có thể được transfer sang văn phòng đại diện thu mua tại Quảng Châu để đội Huayue hỗ trợ sourcing, audit nhà máy, kiểm hàng và xử lý dispute. Truyền dữ liệu xuyên biên giới được bảo vệ bởi 3 lớp: (i) Standard Contractual Clauses (SCCs) — văn bản nội bộ giữa trụ sở Hà Nội và văn phòng đại diện Quảng Châu của CT TNHH Chuỗi Cung Ứng Huayue Việt Nam, tuân thủ template tham chiếu của Bộ Tư pháp Việt Nam. (ii) Encryption-in-transit — tất cả traffic VN↔CN qua TLS 1.3, certificate pinning, không thể intercept. (iii) Đăng ký Truyền dữ liệu xuyên biên giới với Cục An toàn thông tin theo Điều 25 NĐ 13/2023 — Huayue đang trong quá trình hoàn tất thủ tục đăng ký. Bạn có quyền yêu cầu Huayue KHÔNG transfer dữ liệu sang Trung Quốc — chúng tôi sẽ tôn trọng nhưng có thể giới hạn dịch vụ audit nhà máy on-site (vốn do đội Quảng Châu thực hiện).",
      "Vòng đời dữ liệu cá nhân tại Huayue theo nguyên tắc 'tối thiểu cần thiết': (a) Tài khoản đang hoạt động — lưu trữ liên tục, cập nhật theo yêu cầu của bạn. (b) Tài khoản không hoạt động ≥18 tháng — gửi email cảnh báo + tự động xoá nếu không phản hồi trong 90 ngày tiếp theo. (c) Đơn hàng đã hoàn thành — lưu chi tiết 7 năm theo nghĩa vụ thuế Việt Nam, sau đó anonymize. (d) Chứng từ giao dịch + hoá đơn — lưu 10 năm theo Luật Quản lý thuế. (e) Communication logs (chat, email) — lưu 24 tháng cho dispute resolution, sau đó xoá vĩnh viễn. (f) Server logs — 90 ngày, sau đó aggregate vào báo cáo analytics (không có PII). (g) Cookies — theo time-to-live đã nêu ở Mục 4. Khi bạn yêu cầu xoá tài khoản (quyền tại Mục 9), Huayue thực hiện hard-delete trong 30 ngày + xác nhận qua email + cấp 'Certificate of Erasure' nếu yêu cầu (cho doanh nghiệp cần audit trail).",
      "Biện pháp bảo mật kỹ thuật: (1) Mã hoá truyền tải — TLS 1.3 với forward secrecy, HSTS preload, certificate transparency monitoring. (2) Mã hoá lưu trữ — AES-256-GCM cho database tại nghỉ, key management qua AWS KMS với key rotation 90 ngày. (3) Hashing mật khẩu — bcrypt với work factor 12 + per-user salt + pepper. (4) Phát hiện xâm nhập — WAF Cloudflare layer 7, anomaly detection AI cho login patterns, rate limiting tự động block brute-force. (5) Phân quyền truy cập nội bộ — principle of least privilege, role-based access control (RBAC), 2FA bắt buộc cho mọi nhân viên Huayue có quyền truy cập production. (6) Audit logging — mọi truy cập dữ liệu được log với timestamp, IP, user, action; logs được lưu trên hệ thống write-once 12 tháng. (7) Penetration testing — 2 lần/năm bởi đối tác an ninh độc lập. (8) Bug bounty program — báo cáo lỗ hổng tới privacy@huayuesc.vn + thưởng $100-5,000 tuỳ severity. Biện pháp tổ chức: nhân viên Huayue ký NDA + tham gia training bảo mật mỗi quý; data center AWS Singapore + Việt Nam đạt ISO 27001; quy trình incident response có RTO 4h, RPO 1h; backup tự động hàng giờ + offsite hàng ngày.",
      "Theo Điều 9–22 NĐ 13/2023, bạn có 11 quyền cơ bản với dữ liệu cá nhân của mình: (1) Quyền được biết — biết dữ liệu nào được thu thập, mục đích, thời gian lưu trữ. (2) Quyền đồng ý — chấp thuận hoặc từ chối xử lý. (3) Quyền truy cập — yêu cầu xem dữ liệu của mình (xuất file JSON/CSV trong 30 ngày). (4) Quyền rút lại đồng ý — bất cứ lúc nào, không cần giải thích. (5) Quyền xoá — 'right to erasure', xoá tài khoản + toàn bộ dữ liệu trong 30 ngày (trừ chứng từ phải lưu theo luật thuế). (6) Quyền hạn chế xử lý — yêu cầu Huayue ngừng tạm xử lý dữ liệu trong khi giải quyết khiếu nại. (7) Quyền cung cấp dữ liệu — yêu cầu chuyển dữ liệu sang nhà cung cấp khác (data portability). (8) Quyền phản đối — phản đối xử lý cho mục đích marketing, profiling. (9) Quyền khiếu nại — gửi khiếu nại tới Cục An toàn thông tin (Bộ TT&TT) hoặc tới chúng tôi. (10) Quyền yêu cầu bồi thường thiệt hại — nếu Huayue vi phạm gây thiệt hại. (11) Quyền tự bảo vệ — tự thực hiện các biện pháp bảo vệ dữ liệu (đổi mật khẩu, bật 2FA, opt-out cookie). Để thực hiện bất kỳ quyền nào, gửi email tới privacy@huayuesc.vn — phản hồi trong 7 ngày làm việc, xử lý hoàn tất trong 30 ngày.",
      "Huayuesc là nền tảng B2B dành cho doanh nghiệp, KHÔNG hướng tới trẻ em dưới 16 tuổi. Khi đăng ký, người dùng phải xác nhận đủ 18 tuổi (hoặc tuổi thành niên theo pháp luật quốc gia cư trú). Nếu phát hiện tài khoản của trẻ em, Huayue sẽ vô hiệu hoá ngay và xoá toàn bộ dữ liệu trong 7 ngày. Phụ huynh phát hiện con em mình đã tạo tài khoản có thể liên hệ privacy@huayuesc.vn — chúng tôi xác minh và xoá ưu tiên không tính phí.",
      "Quy trình ứng phó sự cố dữ liệu (Data Breach Response Plan) tuân thủ Điều 23 NĐ 13/2023: (Bước 1) Phát hiện — đội Security 24/7 monitor 365/365, hoặc nhận report từ Bug Bounty / nhân viên / đối tác. (Bước 2) Khoanh vùng — trong 4h, identify scope, ngừng leak, lock affected systems. (Bước 3) Đánh giá — security forensic xác định bao nhiêu user bị ảnh hưởng, dữ liệu nào, mức độ nghiêm trọng. (Bước 4) Thông báo cơ quan chức năng — trong 72 giờ kể từ phát hiện, gửi báo cáo cho Cục An toàn thông tin (Bộ TT&TT) theo template chuẩn. (Bước 5) Thông báo người dùng — gửi email/SMS cho mọi user bị ảnh hưởng trong 72 giờ, mô tả sự cố + dữ liệu bị lộ + biện pháp khắc phục + khuyến nghị (đổi mật khẩu, bật 2FA, monitoring tài khoản). (Bước 6) Khắc phục — fix vulnerability, audit toàn hệ thống, post-mortem report public trong 30 ngày. (Bước 7) Bồi thường — nếu user chứng minh thiệt hại trực tiếp, Huayue có chính sách bồi thường minh bạch.",
      "Chính sách này được Huayue review tối thiểu 1 lần/năm và cập nhật khi có thay đổi pháp luật, công nghệ hoặc dịch vụ. Phiên bản hiện tại là v1.0, hiệu lực 01/01/2026. Phiên bản cũ được archive tại /info/privacy-policy/lich-su để tham chiếu. Khi có thay đổi material (ảnh hưởng quyền lợi user), Huayue thông báo qua: (a) Email tới mọi user đang hoạt động ít nhất 30 ngày trước khi áp dụng. (b) Banner hiển thị trên website/app trong 60 ngày. (c) Yêu cầu user re-consent nếu thay đổi mục đích xử lý dữ liệu. Liên hệ DPO (Data Protection Officer): Email privacy@huayuesc.vn (phản hồi <72h), hotline 000-000-000 (giờ hành chính), thư tay 'DPO — CT TNHH Chuỗi Cung Ứng Huayue Việt Nam', Tầng 07, Toà Bảo Ngọc Building, số 02 phố Thanh Lâm, Phường Xuân Phương, Thành phố Hà Nội, Việt Nam. Cơ quan chức năng để khiếu nại độc lập: Cục An toàn thông tin (Bộ TT&TT), 18 Nguyễn Du, Hà Nội — website ais.gov.vn.",
    ],
    pullQuote: {
      text: "Bảo mật không phải checkbox — nó là một quá trình. Huayue cam kết minh bạch về cách dữ liệu của Buyer Việt Nam được xử lý xuyên biên giới VN-TQ, không có bí mật, không có ngôn ngữ pháp lý đánh đố.",
      author: "Đội An toàn thông tin — Huayue Việt Nam",
    },
    checklist: [
      "Pháp nhân kiểm soát dữ liệu: CT TNHH Chuỗi Cung Ứng Huayue VN (MST 0111453693)",
      "Tuân thủ NĐ 13/2023/NĐ-CP (Việt Nam) + PIPL 2021 (Trung Quốc) + GDPR khi áp dụng",
      "Hướng tới đạt chuẩn ISO/IEC 27001:2022",
      "Mã hoá TLS 1.3 (transit) + AES-256-GCM (rest), bcrypt cho mật khẩu",
      "11 quyền của chủ thể dữ liệu — phản hồi 7 ngày, xử lý 30 ngày",
      "Truyền xuyên biên giới VN-CN qua SCCs + đang đăng ký Cục An toàn thông tin",
      "Pen-test 2 lần/năm + Bug Bounty $100-5,000",
      "Data breach notification trong 72 giờ theo Điều 23 NĐ 13/2023",
      "DPO: privacy@huayuesc.vn — hotline 000-000-000",
    ],
    faq: [
      {
        q: "Huayue có bán dữ liệu của tôi cho bên thứ ba không?",
        a: "TUYỆT ĐỐI KHÔNG. Mô hình kinh doanh của Huayue dựa vào dịch vụ chuỗi cung ứng (commission từ giao dịch, phí logistics, phí thông quan), KHÔNG dựa vào bán dữ liệu. Chúng tôi không chia sẻ dữ liệu với data broker, marketing aggregator, hay bất kỳ bên thứ ba nào không liên quan trực tiếp đến giao dịch của bạn.",
      },
      {
        q: "Tôi có thể yêu cầu xoá toàn bộ dữ liệu không?",
        a: "Có. Gửi email privacy@huayuesc.vn với subject 'Yêu cầu xoá dữ liệu — [tên/email tài khoản]'. Huayue xác minh danh tính (qua OTP), thực hiện hard-delete trong 30 ngày, và gửi 'Certificate of Erasure' nếu yêu cầu. Lưu ý: chứng từ thuế (hoá đơn) phải được lưu 10 năm theo Luật Quản lý thuế VN — phần này không thể xoá.",
      },
      {
        q: "Dữ liệu của tôi có được transfer sang Trung Quốc không?",
        a: "Có thể, nếu giao dịch của bạn cần văn phòng đại diện Quảng Châu của Huayue hỗ trợ (audit nhà máy, kiểm hàng, xử lý dispute). Truyền dữ liệu xuyên biên giới VN-CN được bảo vệ bởi Standard Contractual Clauses (SCCs) nội bộ và TLS 1.3 encryption; Huayue đang trong quá trình hoàn tất đăng ký với Cục An toàn thông tin VN theo Điều 25 NĐ 13/2023. Bạn có quyền yêu cầu KHÔNG transfer — gửi email DPO, chúng tôi sẽ tôn trọng dù có thể giới hạn dịch vụ audit on-site.",
      },
      {
        q: "Mật khẩu của tôi có an toàn nếu Huayue bị hack?",
        a: "Có. Huayue sử dụng bcrypt hashing với work factor 12 + per-user salt + pepper — kể cả nếu database bị leak, mật khẩu cần hàng tỷ năm computer power để crack. Tuy nhiên, khuyến nghị bạn vẫn nên: (1) đặt mật khẩu mạnh + duy nhất, (2) bật 2FA tại /buyer-center/settings/security, (3) đổi mật khẩu nếu nghe có sự cố tại các site khác bạn dùng email tương tự.",
      },
      {
        q: "Tôi nhận email lạ tự xưng là Huayue — làm sao xác minh?",
        a: "Email chính thức của Huayue luôn từ domain @huayuesc.vn. Email giao dịch từ no-reply@huayuesc.vn. Email từ DPO/HR có domain @huayuesc.vn. Nếu nghi ngờ, forward email đó tới privacy@huayuesc.vn để chúng tôi verify trong 4 giờ. Nguyên tắc vàng: Huayue KHÔNG BAO GIỜ yêu cầu mật khẩu qua email/điện thoại.",
      },
    ],
    related: [
      { label: "Điều khoản sử dụng", href: "/info/terms-of-service" },
      { label: "Bảo vệ thanh toán", href: "/info/payment-protection" },
      { label: "Khiếu nại & tranh chấp", href: "/info/disputes" },
      { label: "Liên hệ DPO", href: "/info/contact" },
    ],
    primaryCta: { label: "Liên hệ DPO ngay", href: "/info/contact" },
  },
  "import-guide": {
    title: "Hướng dẫn nhập khẩu từ Trung Quốc",
    intro: "Quy trình nhập khẩu B2B 5 bước — từ tìm NCC đến nhận hàng tại kho. Trung bình 32-48 ngày.",
    icon: "📦",
    category: "HƯỚNG DẪN",
    quickFacts: [
      { label: "Số bước", value: "5" },
      { label: "Sản xuất", value: "20-30 ngày" },
      { label: "Vận chuyển", value: "12-18 ngày" },
      { label: "Tổng", value: "32-48 ngày" },
      { label: "T/T cọc", value: "30%" },
      { label: "T/T cuối", value: "70%" },
    ],
    sectionTitles: [
      "Bước 1 — Tìm sản phẩm & Gửi RFQ",
      "Bước 2 — Đặt mẫu (Sample Order)",
      "Bước 3 — Đặt cọc T/T 30% qua Tài khoản trung gian",
      "Bước 4 — Kiểm hàng on-site & Thanh toán 70%",
      "Bước 5 — Vận chuyển DDP & Thông quan",
      "Bước 6 — Nhận hàng & Xác nhận chất lượng",
      "Hồ sơ chứng từ cần chuẩn bị",
      "Ví dụ tính thuế thực tế (Excel-style breakdown)",
      "Ưu đãi thuế ACFTA + RCEP — Form E và Form RCEP",
    ],
    paragraphs: [
      "Duyệt sản phẩm theo 12 danh mục chính trên Huayuesc (huayuesc.vn/products), hoặc gửi RFQ chi tiết qua /buying-request. Trong 24 giờ, hệ thống AI matching gửi RFQ tới 5-10 NCC verified phù hợp nhất. Mỗi báo giá nhận về có: giá FOB + giá DDP về kho VN, MOQ, thời gian giao, sample policy, payment terms. Buyer có thể gọi video trực tiếp với NCC qua Huayuesc để xem nhà máy + sản phẩm thực tế trước khi đặt mẫu. Tip: gửi RFQ càng chi tiết (kích thước, vật liệu, OEM logo, target retail) — báo giá càng chính xác, ít cần đàm phán lại.",
      "Yêu cầu sample là bước KHÔNG THỂ BỎ QUA khi sourcing lần đầu với một NCC. Quy trình: (1) Click 'Yêu cầu mẫu' trên trang chi tiết sản phẩm. (2) Phí sample $30-200 + ship $20-40 (combined với sample khác qua văn phòng Quảng Châu của Huayue). (3) Thời gian giao 8-12 ngày từ lúc đặt đến nhận tại kho VN. (4) Test sample 2-4 tuần với chức năng thực tế. (5) Phí sample được hoàn 100% khi đặt MOQ với cùng NCC. CSR khuyến nghị đặt 3-5 mẫu cùng SKU để test consistency của NCC. Đối với sản phẩm OEM (logo, custom màu/size), yêu cầu thêm 'sample OEM' phí $80-300 — verify khả năng tuỳ chỉnh trước khi đặt MOQ. (Xem chi tiết tại /info/sample-orders).",
      "Sau khi sample đạt yêu cầu và xác nhận PO (Purchase Order) chính thức, Buyer thanh toán 30% deposit T/T (Telegraphic Transfer) vào tài khoản trung gian Bảo đảm Giao dịch của CSR tại ngân hàng đối tác tại Việt Nam (cho VND) và tại Trung Quốc (cho USD/CNY). Tiền KHÔNG đi trực tiếp tới NCC — nằm tại tài khoản trung gian của CSR cho tới khi giao dịch hoàn tất. NCC nhận PO + xác nhận tài khoản trung gian → bắt đầu sản xuất ngay. Buyer nhận PI (Proforma Invoice) qua email trong 24 giờ với chi tiết: tổng giá trị, breakdown theo SKU, ngày dự kiến xuất xưởng, terms vận chuyển. Thời gian giao sản xuất: 20-30 ngày cho hàng standard, 30-45 ngày cho OEM custom. Phí ngân hàng chuyển T/T: ~0.1-0.3% + $20-50 fixed, do Buyer chịu (đã include trong DDP).",
      "Trước khi xuất xưởng (1-2 ngày), đội QC Huayuesc tại Quảng Châu đến nhà máy kiểm hàng on-site — MIỄN PHÍ cho đơn ≥$5,000 USD, $200/lần cho đơn nhỏ hơn. Quy trình kiểm: (i) Số lượng — đếm 100% (cho đơn <500 unit) hoặc AQL 2.5 sample (cho đơn ≥500). (ii) Chất lượng — đo kích thước, kiểm material theo spec PO, test functional 10% mẫu ngẫu nhiên. (iii) Đóng gói — verify carton chuẩn xuất khẩu, label đúng, packing list khớp. (iv) Tài liệu — Form E (Certificate of Origin), Commercial Invoice, Packing List, BL/AWB. Báo cáo QC: 100+ ảnh + 5-10 video, gửi Buyer trong 4 giờ. Sau khi Buyer approve QC, thanh toán 70% balance T/T qua tài khoản trung gian → NCC release container. Nếu không đạt, NCC sửa miễn phí (lùi 5-10 ngày) hoặc Buyer từ chối nhận hàng (Bảo đảm Giao dịch hoàn 100% deposit).",
      "Huayuesc Logistics lo toàn bộ thủ tục từ pickup tại nhà máy đến giao kho Buyer (Incoterm DDP — Delivered Duty Paid). Quy trình: (1) Pickup container/lô hàng tại nhà máy. (2) Vận chuyển ra cảng xuất TQ (Foshan/Shenzhen/Ningbo) hoặc cửa khẩu Hữu Nghị (đường bộ). (3) Khai báo xuất khẩu TQ + thuê tàu/xe tải. (4) Vận chuyển 5-22 ngày tuỳ route (xem /info/shipping-policy). (5) Thông quan VN qua e-customs VNACCS/VCIS — 75% hàng từ NCC verified đi luồng xanh trong 2 giờ. (6) Thanh toán thuế nhập khẩu + VAT 10% (đã include trong DDP). (7) Vận chuyển nội địa VN tới kho Buyer (1-2 ngày). Thời gian giao tổng: 5-7 ngày qua đường bộ Lạng Sơn, 18-22 ngày qua đường biển. Tracking realtime qua /buyer-center/orders + Zalo OA push.",
      "Buyer nhận hàng tại kho, ký biên bản giao nhận với tài xế đối tác Huayue. Khuyến nghị: (a) Kiểm số kiện theo packing list trước khi ký nhận. (b) Quay video unboxing 1-2 carton ngẫu nhiên để có chứng cứ trong trường hợp dispute. (c) Kiểm chất lượng + số lượng chi tiết trong 7 ngày kể từ ngày nhận — đây là cửa sổ khiếu nại Bảo đảm Giao dịch. Sau 7 ngày, hệ thống auto-release tiền cho NCC. Nếu phát hiện sai sót: gửi khiếu nại qua /buyer-center/orders/{order-id}/dispute kèm ảnh/video chứng cứ → đội Bảo đảm Giao dịch xử lý trong 3-5 ngày → đa số case có lợi cho Buyer khi evidence đầy đủ (refund 100%, đổi hàng, hoặc bồi thường thoả thuận). Sau khi confirm hàng OK, Buyer rate đơn 1-5 sao + viết review (giúp Buyer khác tham khảo).",
      "Hồ sơ chứng từ chuẩn cho mọi đơn nhập khẩu B2B từ TQ về VN (CSR cung cấp 90% — Buyer chỉ cần ký + giữ): (1) Commercial Invoice — hóa đơn thương mại tiếng Anh, có ký + đóng dấu NCC, declare giá trị thực tế (CSR cấm under-invoicing). (2) Packing List — chi tiết số kiện, trọng lượng net/gross, kích thước, SKU breakdown. (3) Bill of Lading (B/L) cho đường biển hoặc CMR cho đường bộ — vận đơn quốc tế, original gửi Buyer hoặc telex release. (4) Certificate of Origin — Form E (ACFTA) hoặc Form RCEP (RCEP) để hưởng ưu đãi thuế. (5) Quality Certificate — chứng nhận xuất xưởng, ISO 9001 nếu có. (6) Test Report — cho hàng có yêu cầu kỹ thuật (CE, RoHS, FDA, FCC). (7) Phytosanitary Certificate — cho hàng nông sản, gỗ. (8) Insurance Policy — cho CIF/DDP, do CSR mua qua Bảo Việt/PVI. (9) Customs Declaration (Tờ khai hải quan VN) — CSR khai theo uỷ quyền. (10) E-invoice VAT — phát hành cho Buyer doanh nghiệp để khấu trừ thuế.",
      "Ví dụ tính thuế thực tế cho đơn nội thất gỗ HS 9403.50 từ KUKA Hangzhou, giá trị $20,000 FOB, vận chuyển CIF Lạch Huyện, Buyer Hà Nội: (a) Giá FOB Foshan: $20,000. (b) Cước biển + bảo hiểm CIF: $4,000 → CIF $24,000. (c) Thuế nhập khẩu MFN HS 9403.50: 20% (sau Thông tư 12/2026 giảm từ 25%) → $4,800. Nếu có Form E ACFTA: 0% (miễn thuế!) → tiết kiệm $4,800. (d) VAT 10% × (CIF + Thuế NK) = 10% × $28,800 = $2,880 (nếu không Form E) hoặc 10% × $24,000 = $2,400 (nếu có Form E). (e) Phí thông quan: $120. (f) Vận chuyển nội địa Hải Phòng → kho HN: $280. (g) Phí dịch vụ CSR (5% commission do NCC trả, KHÔNG tính Buyer): $0. TỔNG DDP nếu KHÔNG Form E: $20,000 + $4,000 + $4,800 + $2,880 + $120 + $280 = $32,080. TỔNG DDP NẾU CÓ Form E: $20,000 + $4,000 + $0 + $2,400 + $120 + $280 = $26,800. Tiết kiệm: $5,280 = 16.5%.",
      "Ưu đãi thuế ACFTA (ASEAN-China FTA, hiệu lực 2010) + RCEP (Regional Comprehensive Economic Partnership, hiệu lực 01/01/2022) là CHÌA KHOÁ giảm 5-15% thuế nhập khẩu. Để hưởng ưu đãi, Buyer cần: (i) Form E (cho ACFTA) — Certificate of Origin do cơ quan có thẩm quyền TQ cấp (CCPIT, AQSIQ), miễn phí cho NCC verified của CSR. (ii) Form RCEP — cho 15 nước RCEP (TQ, Nhật, Hàn, Úc, NZ, ASEAN). Một số mặt hàng (linh kiện điện tử, máy móc) hưởng RCEP có lợi hơn ACFTA. CSR auto pick FTA tốt nhất cho mỗi đơn. Lưu ý: hàng phải đáp ứng Quy tắc Xuất xứ (RoO) — nguyên liệu chính từ TQ hoặc nước thành viên FTA. NCC verified của CSR đều có khả năng cấp Form E/RCEP đúng quy chuẩn để Buyer hưởng full ưu đãi. Đối với một số HS code đặc thù (gỗ, dệt may), Form E giảm thuế từ 25% xuống 0% — tiết kiệm khổng lồ.",
    ],
    pullQuote: {
      text: "Quy trình 6 bước minh bạch + ưu đãi ACFTA/RCEP đúng cách — buyer Việt Nam giảm 30-40% chi phí so với mua qua broker truyền thống. Đó là sự khác biệt của Huayuesc.",
      author: "Đội Customer Success Huayuesc",
    },
    checklist: [
      "Báo giá miễn phí trong 24h từ 5-10 NCC verified",
      "Sample $30-200, hoàn 100% khi đặt MOQ — Trung tâm Mẫu gom vận chuyển",
      "Bảo đảm Giao dịch (Trung gian) tại ngân hàng đối tác VN và TQ — không mất tiền cọc",
      "Kiểm định tại chỗ miễn phí cho đơn ≥$5K — báo cáo 100+ ảnh + video",
      "DDP all-in-one — không phải lo thuế, hải quan, nội địa",
      "Form E + Form RCEP — tiết kiệm 5-15% thuế NK",
      "E-customs VNACCS/VCIS — 75% hàng đi luồng xanh trong 2 giờ",
      "Tracking realtime + bảo hiểm Marine 0.5% giá trị",
    ],
    faq: [
      {
        q: "MOQ nhỏ nhất là bao nhiêu?",
        a: "Tùy nhà máy — phổ biến từ $500-2000 hoặc 50-100 đơn vị. Một số NCC chấp nhận MOQ $200 cho buyer mới qua Huayuesc. CSR có chương trình 'Combine MOQ' giúp 2-3 buyer cùng ngành gộp đơn để đạt MOQ giá tốt mà mỗi bên chỉ lấy 1/3.",
      },
      {
        q: "Có cần giấy phép nhập khẩu không?",
        a: "Phần lớn vật liệu xây dựng, nội thất, sanitary, đèn LED, điện gia dụng KHÔNG cần giấy phép. Cần giấy phép cho: thực phẩm chức năng, mỹ phẩm, thiết bị y tế, hoá chất, dược phẩm, sách, phương tiện. Huayuesc tư vấn cụ thể theo HS code trước khi đặt hàng. Buyer mới có thể email legal@huayuesc.vn để được tư vấn miễn phí.",
      },
      {
        q: "Thuế nhập khẩu cụ thể bao nhiêu cho từng loại hàng?",
        a: "Vật liệu xây dựng (gạch, đá, xi măng) HS 6907-6914: 5-10% MFN, 0% với Form E. Nội thất gỗ HS 9403: 20% MFN (giảm từ 25% theo TT 12/2026), 0% với Form E. Đèn LED HS 9405: 5% MFN, 0% với Form E. Sanitary HS 6911-6912: 15-20% MFN, 0% với Form E. Điện tử HS 8536-8543: 0-15% MFN, 0% với Form E. Buyer luôn nên ưu tiên NCC cấp được Form E để tiết kiệm thuế.",
      },
      {
        q: "Có cần Buyer doanh nghiệp hay cá nhân cũng được?",
        a: "Cá nhân được nhập với hạn mức $5,000 USD/đơn theo quy định Phòng chống rửa tiền. Doanh nghiệp (có MST) được nhập không giới hạn + có thể khấu trừ VAT đầu vào (10%). Khuyến nghị Buyer thường xuyên (≥3 đơn/năm) đăng ký doanh nghiệp để tối ưu thuế.",
      },
      {
        q: "Thời gian giao có thể nhanh hơn 5-7 ngày không?",
        a: "Có với Air Freight Express (DHL/FedEx) — 2-4 ngày Foshan → Hà Nội. Cước $8-15/kg (đắt gấp 5-7x sea freight). Phù hợp sample, hàng hotfix, hàng giá trị cao kích thước nhỏ. Min charge $100/đơn. Liên hệ logistics@huayuesc.vn để booking.",
      },
      {
        q: "Huayuesc thu phí thế nào với Buyer?",
        a: "MIỄN PHÍ HOÀN TOÀN cho Buyer. Huayuesc thu 5% commission từ Supplier khi giao dịch thành công. Buyer chỉ trả: giá hàng (theo PO với NCC) + cước DDP (transparent breakdown). Không có phí thành viên, phí giao dịch, phí trung gian, phí kiểm định tại chỗ (miễn phí cho đơn ≥$5K).",
      },
    ],
    related: [
      { label: "Tính cước DDP", href: "/info/ddp-calculator" },
      { label: "Bảo vệ thanh toán", href: "/info/payment-protection" },
      { label: "Đặt mẫu", href: "/info/sample-orders" },
      { label: "Quy trình kiểm định", href: "/info/audit-process" },
      { label: "Chính sách vận chuyển", href: "/info/shipping-policy" },
    ],
    primaryCta: { label: "Bắt đầu — Gửi RFQ", href: "/buying-request" },
  },
  "ddp-calculator": {
    title: "Tính cước DDP",
    intro: "Cước DDP (Delivered Duty Paid) đã bao gồm thuế nhập khẩu, VAT, vận chuyển về kho.",
    paragraphs: [
      "DDP = giá hàng + phí vận chuyển + thuế nhập khẩu + VAT 10% + phí thông quan + giao tận kho. Không phát sinh thêm.",
      "Tham khảo: container 20ft (~28 m³) từ Foshan về Hà Nội = $1,800-2,400. Container 40ft (~58 m³) = $2,800-3,500. Hàng lẻ LCL: $90-130/m³.",
      "Thuế nhập khẩu phụ thuộc HS code. Huayuesc cung cấp công cụ tính cước online — chỉ cần nhập giá FOB và HS code, hệ thống ước tính DDP trong 30 giây.",
    ],
    related: [{ label: "Gửi RFQ để có báo giá DDP chính xác", href: "/buying-request" }],
  },
  "payment-protection": {
    title: "Bảo vệ thanh toán — Bảo đảm Giao dịch",
    intro: "Tiền của bạn được giữ tại tài khoản trung gian của Huayuesc. Hoàn 100% nếu hàng không như mô tả.",
    icon: "🛡",
    category: "AN TOÀN GIAO DỊCH",
    quickFacts: [
      { label: "Hoàn tiền", value: "100%" },
      { label: "Cửa sổ KN", value: "7 ngày" },
      { label: "Xử lý", value: "3 ngày" },
      { label: "Tỷ lệ thắng", value: "87%" },
    ],
    sectionTitles: ["Cơ chế Bảo đảm Giao dịch", "Khi có sự cố", "Phương án xử lý"],
    paragraphs: [
      "Mọi giao dịch trên Huayuesc đều được bảo vệ bởi Bảo đảm Giao dịch. Tiền cọc T/T 30% và 70% còn lại của bạn nằm trong tài khoản tài khoản trung gian ngân hàng đối tác (không trong tay Huayuesc, không trong tay NCC). NCC chỉ nhận tiền sau khi bạn xác nhận đã nhận hàng đạt chất lượng. Nếu bạn không xác nhận sau 14 ngày kể từ ngày giao, hệ thống tự động release để tránh giam tiền vô lý.",
      "Nếu hàng không đúng mô tả, chậm trễ hoặc lỗi, gửi khiếu nại trong 7 ngày kể từ ngày nhận hàng. Đính kèm ảnh/video chứng minh, số đơn hàng, hoá đơn vận chuyển. Đội tranh chấp Huayuesc xác nhận trong 24 giờ và bắt đầu điều tra. Liên hệ NCC bằng tiếng Trung, audit sản phẩm tại kho buyer nếu cần. Đưa ra phương án xử lý trong 3-5 ngày làm việc.",
      "3 phương án xử lý: (1) Hoàn tiền 100% từ tài khoản trung gian — nếu hàng sai mô tả nghiêm trọng. (2) Đổi hàng miễn phí — NCC sản xuất lại + free DDP về VN. (3) Bồi thường thỏa thuận — giảm giá X% nếu lỗi nhỏ buyer chấp nhận giữ lại. Huayuesc trực tiếp đứng ra giải quyết với NCC, buyer không cần biết tiếng Trung. Tỷ lệ khiếu nại được xử lý có lợi cho buyer: 87% (báo cáo Q3/2025).",
    ],
    pullQuote: {
      text: "Bảo đảm Giao dịch là 'điểm khác biệt số 1' của Huayuesc. Buyer mới có thể đặt đơn $50K mà yên tâm như đặt với nhà cung cấp nội địa Việt Nam.",
      author: "Đội Bảo đảm Giao dịch",
    },
    checklist: [
      "Tiền cọc giữ tại tài khoản trung gian ngân hàng đối tác (không phải Huayuesc)",
      "NCC chỉ nhận tiền khi buyer xác nhận hàng đạt chất lượng",
      "Cửa sổ khiếu nại 7 ngày, xử lý 3-5 ngày làm việc",
      "Tỷ lệ refund/replace cho buyer: 87%",
      "Huayuesc đứng ra negotiate với NCC bằng tiếng Trung",
    ],
    related: [
      { label: "Khiếu nại & tranh chấp", href: "/info/disputes" },
      { label: "Hướng dẫn nhập khẩu", href: "/info/import-guide" },
      { label: "Quy trình kiểm định", href: "/info/audit-process" },
    ],
    primaryCta: { label: "Đặt đơn an toàn ngay", href: "/buying-request" },
  },
  "disputes": {
    title: "Khiếu nại & tranh chấp — 3 cấp giải quyết",
    intro: "Buyer có quyền khiếu nại trong 7 ngày kể từ ngày nhận hàng. Huayue giải quyết theo 3 cấp: Mediation nội bộ (đội Hà Nội + Quảng Châu) → Trọng tài VIAC → TAND Hà Nội. SLA: 6 giờ email, 1 giờ qua hotline 000-000-000.",
    icon: "⚖",
    category: "AN TOÀN GIAO DỊCH",
    quickFacts: [
      { label: "Cửa sổ khiếu nại", value: "7 ngày kể từ nhận hàng" },
      { label: "SLA email", value: "<6 giờ" },
      { label: "SLA hotline", value: "<1 giờ" },
      { label: "Cấp 1 — Mediation Huayue", value: "Miễn phí, 7-14 ngày" },
      { label: "Cấp 2 — Trọng tài", value: "VIAC Hà Nội" },
      { label: "Cấp 3 — Toà án", value: "TAND Hà Nội" },
    ],
    paragraphs: [
      "Cấp 1 — Mediation tại Huayue (miễn phí, 7-14 ngày): Buyer gửi khiếu nại qua dashboard hoặc support@huayuesc.vn TRONG 7 NGÀY kể từ ngày nhận hàng, kèm chứng cứ (ảnh, video, biên bản nghiệm thu, số đơn). Đội Dispute Resolution của Huayue Hà Nội tiếp nhận trong 6 giờ, liên hệ buyer + nhà máy để xác minh. Đội Quảng Châu có thể visit nhà máy kiểm tra trực tiếp nếu cần (cho lỗi sản xuất). Quyết định trong 7 ngày làm việc với 4 phương án: (a) Hoàn 100% từ tài khoản tín thác nếu hàng sai mô tả nghiêm trọng. (b) Đổi hàng miễn phí — nhà máy sản xuất lại + free DDP về VN. (c) Bồi thường thoả thuận — giảm giá X% nếu lỗi nhỏ buyer chấp nhận giữ. (d) Credit cho đơn tiếp.",
      "Cấp 2 — Trọng tài VIAC: Nếu Mediation cấp 1 không đạt thoả thuận trong 14 ngày, buyer hoặc Huayue có quyền chuyển vụ việc lên Trung tâm Trọng tài Quốc tế Việt Nam (VIAC) tại Hà Nội theo Quy tắc tố tụng VIAC hiện hành. Số trọng tài viên: 1 (cho tranh chấp <$50K), 3 (cho ≥$50K). Ngôn ngữ: tiếng Việt (mặc định) hoặc tiếng Anh (theo thoả thuận). Phí trọng tài ~3-5% giá trị tranh chấp, phân chia theo phán quyết. Quyết định VIAC là CUỐI CÙNG và RÀNG BUỘC, có giá trị thi hành tại Việt Nam và Trung Quốc theo Công ước New York 1958.",
      "Cấp 3 — Toà án Việt Nam: Tranh chấp giữa người dùng và Huayue (không liên quan giao dịch nhà máy) áp dụng luật Việt Nam, toà án có thẩm quyền là TAND TP Hà Nội. Huayue không chấp nhận đơn kiện tập thể (class-action) — mỗi tranh chấp giải quyết cá nhân theo Điều khoản dịch vụ.",
    ],
    pullQuote: {
      text: "Khiếu nại không phải là chuyện xấu hổ — là cơ chế để chuỗi cung ứng tự sửa. Huayue cam kết xử lý từng dispute với thông tin minh bạch và cùng buyer đến cuối.",
      author: "Đội Dispute Resolution — Huayue",
    },
    checklist: [
      "📞 Hotline 000-000-000 — phản hồi <1 giờ",
      "✉ support@huayuesc.vn — phản hồi <6 giờ",
      "🆓 Mediation cấp 1 hoàn toàn miễn phí",
      "🏛 Cấp 2: VIAC Hà Nội — phán quyết có hiệu lực thi hành tại VN + TQ (Công ước NY 1958)",
      "⚖ Cấp 3: TAND Hà Nội cho tranh chấp với Huayue (không kiện tập thể)",
      "📋 4 phương án giải quyết: Hoàn tiền · Đổi hàng · Bồi thường · Credit",
    ],
    related: [
      { label: "Bảo đảm Giao dịch", href: "/info/trade-assurance" },
      { label: "Điều khoản dịch vụ", href: "/info/terms-of-service" },
      { label: "Liên hệ Huayue", href: "/info/contact" },
    ],
    primaryCta: { label: "Gửi khiếu nại — support@huayuesc.vn", href: "mailto:support@huayuesc.vn" },
  },
  "sample-orders": {
    title: "Đặt hàng mẫu — Trước khi đặt MOQ",
    intro:
      "Đặt mẫu là bước không thể bỏ qua khi sourcing lần đầu với một NCC. Phí sample $30-200 nhỏ hơn rất nhiều so với rủi ro nhập 1 container hàng sai. CSR tối ưu quá trình này thành workflow 4 ngày, gom nhiều mẫu để tiết kiệm cước, và hoàn 100% phí khi đặt MOQ.",
    icon: "📦",
    category: "DỊCH VỤ BUYER",
    quickFacts: [
      { label: "Phí mẫu", value: "$30-200" },
      { label: "Phí ship", value: "$20-40 (gộp)" },
      { label: "Thời gian giao", value: "8-12 ngày" },
      { label: "Hoàn phí", value: "100% khi MOQ" },
      { label: "Số mẫu/đơn", value: "Không giới hạn" },
      { label: "OEM mẫu", value: "Có hỗ trợ" },
    ],
    sectionTitles: [
      "Tại sao phải đặt mẫu?",
      "Quy trình đặt mẫu 4 bước",
      "Tối ưu chi phí — Combine sample shipping",
      "Sample OEM — Tuỳ chỉnh trước MOQ",
    ],
    paragraphs: [
      "Sản phẩm trên Huayuesc có ảnh, video, spec đầy đủ — nhưng không gì thay thế được việc cầm sản phẩm trên tay. Buyer có thể kiểm tra: chất lượng vật liệu thực tế (cảm nhận trọng lượng, độ mịn, độ bền), độ chính xác kích thước, màu sắc dưới ánh sáng tự nhiên (so với ảnh studio thường lệch), packaging (carton có chống va đập đủ?), tài liệu kèm theo (manual, certificate, hoá đơn). Theo thống kê CSR, 22% đơn MOQ không đặt mẫu trước có khiếu nại về chất lượng — con số này giảm xuống 4% khi buyer đặt mẫu trước. Phí mẫu $50-150 nhỏ hơn nhiều so với rủi ro nhập 1 container hàng sai mô tả.",
      "Quy trình đặt mẫu trên CSR: (1) Tìm sản phẩm và click 'Yêu cầu mẫu' trên trang chi tiết sản phẩm — form pre-fill productId + thông tin NCC. (2) Điền địa chỉ giao hàng VN, chọn mẫu nào (default mẫu chuẩn — có thể chọn variant: màu khác, size khác, OEM logo nếu cần). (3) Thanh toán phí sample qua tài khoản trung gian CSR — phí sản phẩm $30-200 + phí ship $20-40. (4) Nhận tracking trong 24h, mẫu được gom với các sample khác trong tuần thành 1 chuyến hàng air về CSR Hà Nội, sau đó forward đến địa chỉ buyer. Tổng thời gian giao 8-12 ngày: 3-7 ngày sản xuất + 4-5 ngày vận chuyển air + 1 ngày forward nội địa.",
      "Thay vì mỗi sample shipping riêng (mỗi lô $40-80 cước air), CSR áp dụng mô hình 'Trung tâm Mẫu' tại văn phòng Quảng Châu: NCC ship sample về CSR Quảng Châu, đội logistics gom 8-15 sample mỗi tuần thành 1 master shipment air về Hà Nội (chỉ 1 lần cước $80-150 chia đều cho các buyer). Kết quả: buyer chỉ trả $20-40/sample thay vì $40-80 nếu tự ship. Đối với buyer thường xuyên đặt mẫu (5+ sample/tháng), CSR cung cấp 'Gói đăng ký mẫu' $99/tháng — không giới hạn sample, chỉ trả phí sản phẩm.",
      "CSR hỗ trợ đặt sample OEM (custom logo, custom màu, custom kích thước nhỏ) trước khi đặt MOQ. NCC yêu cầu phí mock-up $80-300 + phí mẫu thường, thời gian giao tăng 5-10 ngày để làm khuôn/in logo. Đây là cách an toàn để verify khả năng OEM của NCC trước khi commit đơn lớn. Sau khi nhận sample OEM đạt yêu cầu, buyer có thể đặt MOQ — toàn bộ phí sample (gồm phí mock-up) được hoàn 100% vào hoá đơn MOQ. Buyer cũng có thể yêu cầu video call với NCC để xem mock-up trước khi production, tránh sai sót.",
    ],
    pullQuote: {
      text: "$50 phí sample là khoản đầu tư rẻ nhất cho buyer mới. Nó giúp bạn kiểm tra chất lượng thật, hiểu NCC, và nhất là — yên tâm khi đặt 50,000 USD MOQ tiếp theo.",
      author: "Đội Customer Success CSR",
    },
    checklist: [
      "Phí sample $30-200, hoàn 100% khi đặt MOQ với cùng NCC",
      "Văn phòng Quảng Châu của Huayue — gom shipping tiết kiệm 50-60%",
      "Thời gian giao 8-12 ngày từ lúc đặt đến nhận tay tại VN",
      "Hỗ trợ sample OEM (logo, màu, size) trước khi đặt MOQ",
      "Gói đăng ký mẫu $99/tháng cho buyer power-user",
    ],
    faq: [
      {
        q: "Có thể đặt sample không qua CSR không?",
        a: "Có thể nhưng không khuyến nghị. Tự đặt với NCC sẽ phải đàm phán bằng tiếng Trung, trả cước air đầy đủ, không có Bảo đảm Giao dịch. Qua CSR rẻ hơn 30-50% và an toàn hơn.",
      },
      {
        q: "Sample có khác hàng MOQ không?",
        a: "Mẫu chuẩn = giống hàng MOQ. Tuy nhiên, một số NCC làm sample bằng máy thủ công thay vì line sản xuất, có thể có khác biệt nhỏ về finish. Khi đặt MOQ, CSR luôn QC trước xuất xưởng để đảm bảo đồng nhất.",
      },
      {
        q: "Phí mẫu có VAT không?",
        a: "Không. Sample dưới $200 được khai như 'commercial sample' miễn thuế nhập khẩu + VAT theo quy định Việt Nam. Trên $200, áp dụng thuế bình thường.",
      },
    ],
    related: [
      { label: "Tìm sản phẩm để đặt mẫu", href: "/products" },
      { label: "Hướng dẫn nhập khẩu", href: "/info/import-guide" },
      { label: "Bảo vệ thanh toán", href: "/info/payment-protection" },
    ],
    primaryCta: { label: "Tìm sản phẩm để đặt mẫu", href: "/products" },
  },
  "order-tracking": {
    title: "Theo dõi đơn hàng — Realtime tracking",
    intro:
      "CSR cung cấp 5-stage realtime tracking từ lúc đặt cọc đến lúc hàng vào kho buyer. Mỗi bước đều có ảnh/video từ NCC, từ kho CSR Quảng Châu, từ shipping carrier, đến tận nội địa Việt Nam. Buyer không bao giờ phải hỏi 'đơn hàng giờ ở đâu?'.",
    icon: "📍",
    category: "DỊCH VỤ BUYER",
    quickFacts: [
      { label: "Stages", value: "5" },
      { label: "Ảnh/đơn", value: "30-80" },
      { label: "Video/đơn", value: "5-15" },
      { label: "Update freq.", value: "2-3 lần/ngày" },
      { label: "Channels", value: "Email + Zalo OA" },
      { label: "API tracking", value: "Có cho enterprise" },
    ],
    sectionTitles: [
      "5 trạng thái — Vòng đời đơn hàng",
      "Cập nhật ảnh/video — Tận mắt thấy",
      "Multi-channel notification",
      "Khi có sự cố — Phản ứng nhanh",
    ],
    paragraphs: [
      "Mỗi đơn hàng trên CSR đi qua 5 trạng thái rõ ràng, có timestamp + chứng cứ ảnh/video tại mỗi mốc: (1) Đặt cọc T/T 30% — tài khoản trung gian nhận tiền, NCC nhận PO chính thức. (2) Sản xuất — NCC bắt đầu production, có kế hoạch sản xuất + ngày dự kiến hoàn thành. (3) Kiểm hàng — đội QC CSR đến nhà máy 1-2 ngày trước xuất xưởng, audit hàng theo PO + spec, gửi báo cáo + ảnh/video. (4) Vận chuyển — hàng load lên container/xe tải, có tracking number quốc tế (cho hàng biển: Bill of Lading; cho hàng bộ: vehicle plate + GPS), realtime location update mỗi 6h. (5) Đã giao — hàng vào kho CSR Hữu Nghị (đường bộ) hoặc Hải Phòng/Cát Lái (đường biển), thông quan hoàn tất, vận chuyển nội địa đến kho buyer. Buyer ký nhận → đơn đóng → tài khoản trung gian giải ngân.",
      "Khác biệt lớn nhất của CSR vs các nền tảng khác: chúng tôi cung cấp ảnh/video THỰC TẾ tại mỗi mốc, không chỉ status text. Cụ thể: Sản xuất — 5-10 ảnh dây chuyền đang chạy lô của bạn + 2-3 video timelapse production. Kiểm hàng — 30-50 ảnh + 5-8 video chi tiết (đo kích thước, kiểm material, đếm số lượng, kiểm packaging). Vận chuyển — ảnh container đóng kín + video load hàng + ảnh CMR (vận đơn quốc tế) + ảnh thông quan + ảnh vào kho. Đã giao — ảnh giao tận nơi cho buyer + biên bản nghiệm thu + barcode scan. Tổng cộng 30-80 ảnh + 5-15 video cho mỗi đơn, lưu trên cloud, buyer download bất cứ lúc nào.",
      "Thông báo cập nhật qua nhiều kênh đồng thời: (1) Email — nội dung đầy đủ + link xem chi tiết + ảnh thumbnail. (2) Zalo OA Huayuesc — push notification realtime, nhanh nhất trên mobile. (3) SMS cho các mốc quan trọng (giao hàng) — nội dung ngắn gọn. (4) Dashboard /buyer-center/orders — view tổng quan tất cả đơn, filter theo trạng thái, search theo PO number/sản phẩm/NCC. (5) API tracking cho enterprise (Buyer ≥$100K/năm) — webhook real-time để integrate vào ERP nội bộ của doanh nghiệp.",
      "Khi có sự cố (NCC trễ thời hạn, hàng hỏng trong vận chuyển, vướng hải quan, etc.), Huayue thông báo proactive trong vòng 2 giờ kể từ lúc phát hiện — không đợi buyer hỏi. Mỗi sự cố có response plan: NCC trễ → CSR đàm phán phạt + tăng tốc, đề xuất compensation cho buyer (giảm giá, miễn phí vận chuyển). Hàng hỏng vận chuyển → bảo hiểm CIF cover 100%, NCC ship bù miễn phí, thời gian giao mới được communicate. Vướng hải quan → đội Logistics Huayue xử lý, support 24/7, thời hạn mới được ước tính. Buyer có người liên hệ trực tiếp tại Huayue Hà Nội cho mọi đơn.",
    ],
    pullQuote: {
      text: "Buyer Việt Nam cần biết hàng đang ở đâu — không phải vì không tin tưởng CSR, mà vì họ có khách hàng cuối đang chờ. Realtime tracking là cách chúng tôi tôn trọng kế hoạch kinh doanh của bạn.",
      author: "Đội Logistics Huayuesc",
    },
    checklist: [
      "5 trạng thái rõ ràng từ đặt cọc đến giao hàng",
      "30-80 ảnh + 5-15 video THỰC TẾ mỗi đơn",
      "Notification multi-channel: email + Zalo + SMS + dashboard",
      "Proactive alert trong 2h khi có sự cố",
      "API tracking cho enterprise integrate ERP",
    ],
    related: [
      { label: "Vào trang đơn hàng", href: "/buyer-center/orders" },
      { label: "Bảo vệ thanh toán", href: "/info/payment-protection" },
      { label: "Khiếu nại", href: "/info/disputes" },
    ],
    primaryCta: { label: "Xem dashboard đơn hàng", href: "/buyer-center/orders" },
  },
  "find-products": {
    title: "Tìm sản phẩm trên Huayuesc",
    intro: "4 cách tìm sản phẩm hiệu quả nhất — Huayue tập trung vào 3 ngành chính (Vật liệu xây dựng · Vật liệu trang trí · Đồ điện gia dụng nhà bếp – phòng tắm).",
    paragraphs: [
      "Cách 1 — Duyệt danh mục: 3 ngành chính, mỗi ngành ~8 sub-categories và hàng chục sub-sub-categories. Phù hợp khi bạn biết rõ loại sản phẩm cần (vd: gạch porcelain 60×60, sofa da 3 chỗ, bình nóng lạnh 30L).",
      "Cách 2 — Search keyword: nhập từ khóa tiếng Việt hoặc tiếng Anh. Hệ thống tự động dịch sang tiếng Trung và search trên kho dữ liệu nhà máy đối tác của Huayue tại Quảng Đông, Phúc Kiến, Sơn Đông.",
      "Cách 3 — Tìm bằng hình ảnh: upload ảnh sản phẩm tham khảo. Hệ thống AI matching tìm các SKU tương tự trong kho dữ liệu — phù hợp khi bạn có catalogue của đối thủ nhưng muốn tìm nguồn sản xuất gốc.",
      "Cách 4 — Gọi sourcing manager: hotline 000-000-000. Đội Huayue tại văn phòng Quảng Châu trực tiếp tư vấn, gửi danh sách NCC đã audit, đặt mẫu, đàm phán giá thay bạn. Cách nhanh nhất cho đơn lớn (>$10K) hoặc sản phẩm cần tuỳ chỉnh OEM.",
    ],
    related: [
      { label: "Duyệt danh mục", href: "/products" },
      { label: "Gửi RFQ", href: "/buying-request" },
      { label: "Liên hệ sourcing manager", href: "/info/contact" },
    ],
  },
  "network": {
    title: "Mạng lưới đối tác — Phân phối Việt Nam & Nhà máy Trung Quốc",
    intro:
      "Huayue xây dựng chuỗi cung ứng dựa trên hai mạng lưới: (1) Hệ thống nhà phân phối, nhà thầu xây dựng, công ty thiết kế nội thất tại Việt Nam — đầu ra cho sản phẩm Trung Quốc; (2) Mạng lưới nhà máy đối tác và hiệp hội ngành tại Quảng Đông, Phúc Kiến, Sơn Đông — đầu vào nguồn hàng. Đây là cách Huayue triển khai dịch vụ phát triển kênh phân phối Việt Nam song song với tinh chọn nguồn gốc theo brochure.",
    icon: "🤝",
    category: "MẠNG LƯỚI ĐỐI TÁC",
    quickFacts: [
      { label: "Nhà phân phối VN", value: "Đang mở rộng 63 tỉnh" },
      { label: "Nhà thầu & thiết kế", value: "Đối tác chiến lược" },
      { label: "Cluster nhà máy TQ", value: "Quảng Đông · Phúc Kiến · Sơn Đông" },
      { label: "Trade fair tham gia", value: "Canton Fair · CIFF · VIETBUILD" },
      { label: "Hội nghị giới thiệu SP", value: "Hằng năm tại VN" },
      { label: "Văn phòng liaison", value: "Hải Phòng + Quảng Châu" },
      { label: "Hỗ trợ đối tác", value: "Đào tạo + catalog song ngữ" },
      { label: "Liên hệ", value: "partnership@huayuesc.vn" },
    ],
    sectionTitles: [
      "1. Hai mạng lưới — Phân phối VN & Sourcing TQ",
      "2. Đối tác phân phối tại Việt Nam (đầu ra)",
      "3. Đối tác nhà máy & hiệp hội ngành tại Trung Quốc (đầu vào)",
      "4. Cơ chế hợp tác — Catalog song ngữ, đào tạo, hội nghị giới thiệu sản phẩm",
      "5. Lợi ích cho buyer & đối tác phân phối Việt Nam",
      "6. Các trade fair quan trọng Huayue tham gia hàng năm",
    ],
    paragraphs: [
      "Mô hình chuỗi cung ứng của Huayue dựa trên hai mạng lưới đối tác bổ sung lẫn nhau. Đầu vào (nguồn hàng): chúng tôi không tự sản xuất — chúng tôi sàng lọc và hợp tác với các nhà máy hàng đầu tại 3 cluster sản xuất Trung Quốc: Quảng Đông (Phật Sơn cho gốm sứ + sanitary, Lecong cho nội thất, Trung Sơn cho đèn và đồ điện), Phúc Kiến (đá tự nhiên, sàn gỗ), Sơn Đông (cơ khí, kim khí). Đầu ra (kênh tiêu thụ): mạng lưới nhà phân phối, nhà thầu xây dựng và công ty thiết kế trang trí nội thất tại 63 tỉnh thành Việt Nam. Khác với mô hình marketplace 'mua đi bán lại', Huayue là chuỗi cung ứng B2B thật — hàng đi từ xưởng → kho ngoại quan Quảng Châu → cảng Hải Phòng → kho Huayue (Toà Bảo Ngọc, Xuân Phương, Hà Nội) → giao tận điểm tiêu thụ cuối.",
      "Đối tác phân phối tại Việt Nam (đầu ra) gồm 4 nhóm chính: (1) <b>Đại lý phân phối VLXD</b> — chuỗi cửa hàng vật liệu xây dựng, showroom gạch men, kho VLXD theo tỉnh/thành. Huayue cung cấp giá DDP tận kho, bảo hành theo nhà máy, hỗ trợ đổi trả qua đội Hà Nội. (2) <b>Nhà thầu xây dựng</b> — công ty xây dựng dân dụng, nhà thầu dự án bất động sản, nhà thầu nhà ở xã hội. Huayue gửi báo giá theo dự án, hỗ trợ giao theo tiến độ thi công, cung cấp sample miễn phí cho 30 bộ trở lên. (3) <b>Công ty thiết kế trang trí nội thất</b> — studio thiết kế, công ty interior design. Huayue cung cấp catalogue tiếng Việt cho từng nhãn hàng, sample wood/stone/fabric, hỗ trợ visual 3D miễn phí cho khách hàng VIP của họ. (4) <b>Đại lý điện máy & thiết bị nhà bếp</b> — chuỗi điện máy, đại lý bình nóng lạnh, đại lý nắp bồn cầu thông minh. Huayue ký hợp đồng đại lý độc quyền theo khu vực với một số thương hiệu TQ. Trở thành đối tác phân phối Huayue: gửi email partnership@huayuesc.vn kèm giấy phép kinh doanh, đội Huayue Hà Nội visit/gọi xác minh, ký hợp đồng partnership.",
      "Đối tác nhà máy & hiệp hội ngành tại Trung Quốc (đầu vào): văn phòng đại diện Quảng Châu của Huayue (Tầng 3 Cảng Shuyu Chuangxing) là điểm tiếp xúc trực tiếp với 3 cluster sản xuất. <b>Quảng Đông</b> — Phật Sơn là 'thủ phủ gốm sứ' với 1,200+ nhà máy gốm porcelain, sanitary, gạch men quanh các huyện Nanzhuang và Lecong; Lecong là chợ nội thất gỗ lớn nhất TQ với 3,000+ nhà máy nội thất; Trung Sơn (đặc biệt Cổ Trấn) là cluster đèn LED và đồ điện gia dụng; Đông Quan bao trùm tủ bếp, tủ áo, gỗ MDF cao cấp. <b>Phúc Kiến</b> — Tấn Giang chuyên đá tự nhiên và sàn gỗ kỹ thuật; Hạ Môn cho gỗ nhập khẩu chế biến. <b>Sơn Đông</b> — Vĩnh Khang cho cơ khí ngũ kim, Tần Hoàng Đảo cho kính xây dựng. Đội sourcing Huayue duy trì quan hệ với các hiệp hội ngành địa phương (Foshan Chamber, Guangdong Federation of Industry and Commerce, các hiệp hội ngành gốm sứ và nội thất khu vực) để được giới thiệu nhà máy mới và tham gia hội chợ chuyên ngành.",
      "Cơ chế hợp tác đối tác (theo brochure section 'Dịch vụ triển lãm thương mại' và 'Quảng bá thị trường'): (a) <b>Catalogue song ngữ Việt-Trung</b> — Huayue dịch và xuất bản catalogue sản phẩm Trung Quốc sang tiếng Việt, có sẵn cho đại lý/đối tác in/share. (b) <b>Hội nghị giới thiệu sản phẩm mới hằng năm</b> — Huayue tổ chức tại Hà Nội và HCM, mời các thương hiệu Trung Quốc giới thiệu sản phẩm mới, thu hút nhà đầu tư BĐS, công ty xây dựng, công ty thiết kế trang trí nội thất tới đặt hàng tại chỗ. (c) <b>Diễn đàn chuyên đề</b> — về vật liệu xây dựng thân thiện môi trường, kỹ thuật đồ điện gia dụng — gặp gỡ chuyên gia hai nước. (d) <b>Truyền thông online + offline tại Việt Nam</b> — Huayue chạy chiến dịch quảng bá thương hiệu TQ trên báo chí ngành VN, Facebook/Zalo, sự kiện trực tiếp — đưa thương hiệu TQ tiếp cận buyer bản địa. (e) <b>Tour nhà máy</b> — Huayue tổ chức đoàn buyer Việt Nam đi thăm nhà máy Trung Quốc 2-4 lần/năm (Canton Fair tháng 4 và 10, CIFF tháng 3 và 9). Chi phí Huayue chia sẻ với khách hàng lớn, hoặc nằm trong gói partnership.",
      "Lợi ích cho buyer & đối tác phân phối Việt Nam khi hợp tác với Huayue: (1) <b>Giá thật, tại gốc</b> — không qua tay trung gian, không markup ngầm, có audit trail từ xưởng. (2) <b>Chất lượng được kiểm tại nguồn</b> — đội QC Quảng Châu của Huayue kiểm hàng AQL 2.5 trước xuất xưởng, không phải nhận hàng rồi mới biết lỗi. (3) <b>Trọn gói DDP về Việt Nam</b> — bao gồm logistics + thông quan + thuế + giao tận kho. Không phải lo đặt tàu, làm thủ tục hải quan, hay rủi ro tỷ giá. (4) <b>Hỗ trợ tiếng Việt</b> — toàn bộ giao tiếp qua đội Hà Nội, không cần biết tiếng Trung. (5) <b>Sample & 3D miễn phí</b> cho khách hàng đặt từ 30 bộ trở lên (theo brochure: 'Thiết kế 3D miễn phí với đơn ≥ 30 bộ'). (6) <b>Cập nhật thị trường</b> — Huayue gửi báo cáo giá nhà máy hàng tháng, biến động tỷ giá CNY/VND, chính sách thuế VN mới.",
      "Trade fair quan trọng Huayue tham gia hằng năm (đại diện hoặc đồng tổ chức đoàn): <b>Canton Fair</b> (Quảng Châu, tháng 4 + tháng 10) — hội chợ B2B lớn nhất Trung Quốc, Huayue có gian hàng đại diện và tổ chức đoàn buyer Việt Nam. <b>CIFF (China International Furniture Fair)</b> (Quảng Châu tháng 3, Thượng Hải tháng 9) — chuyên ngành nội thất, đối tác chính cho danh mục Nội thất. <b>Foshan Pottery Show</b> (Phật Sơn, tháng 4 và 10) — chuyên gạch porcelain và sanitary. <b>VIETBUILD</b> (HCM tháng 6, Hà Nội tháng 11) — hội chợ vật liệu xây dựng Việt Nam, Huayue mời các nhà máy TQ đến tham dự cùng với đoàn Hải Phòng. <b>Vietnam Expo</b> (Hà Nội tháng 4) — Huayue tham gia phần triển lãm sản phẩm Trung Quốc. Đăng ký tham gia đoàn buyer Huayue qua partnership@huayuesc.vn hoặc hotline 000-000-000.",
    ],
    pullQuote: {
      text: "Huayue không phải sàn niêm yết sản phẩm — chúng tôi là chuỗi cung ứng. Hàng đi qua kho thật, container thật, đội thông quan thật. Mạng lưới đối tác chính là mạch máu vận hành: thiếu một bên là chuỗi đứt.",
      author: "Đội Partnership — Huayue Việt Nam",
    },
    checklist: [
      "🏪 Đại lý phân phối VLXD và nội thất tại 63 tỉnh thành Việt Nam (mở rộng)",
      "🏗 Nhà thầu xây dựng + công ty thiết kế trang trí nội thất — đối tác chiến lược",
      "🏭 3 cluster nhà máy Trung Quốc: Quảng Đông + Phúc Kiến + Sơn Đông",
      "🤝 Hợp tác với hiệp hội ngành tại Phật Sơn, Lecong, Trung Sơn",
      "📚 Catalogue song ngữ Việt-Trung cho đối tác phân phối",
      "🎤 Hội nghị giới thiệu sản phẩm + diễn đàn chuyên đề tại VN hằng năm",
      "✈️ Đoàn buyer đi Canton Fair, CIFF, Foshan Pottery 2-4 lần/năm",
      "📞 Liên hệ partnership@huayuesc.vn · 000-000-000",
    ],
    faq: [
      {
        q: "Tôi muốn trở thành đại lý phân phối của Huayue tại tỉnh tôi — quy trình thế nào?",
        a: "Gửi email partnership@huayuesc.vn kèm: giấy phép kinh doanh, thông tin showroom/kho hiện có, ngành đang phân phối (VLXD / nội thất / điện máy), khu vực coverage. Đội Huayue Hà Nội liên hệ qua điện thoại trong 5 ngày làm việc, có thể đến thăm trực tiếp nếu cần. Sau khi xác minh, ký hợp đồng đại lý — không phí thành viên, chỉ chia commission theo doanh số.",
      },
      {
        q: "Tôi là nhà thầu xây dựng — Huayue hỗ trợ gì cho dự án của tôi?",
        a: "Huayue gửi báo giá DDP tận công trình cho danh mục VLXD và trang trí nội thất (gạch, sanitary, đá ốp lát, sơn, sàn gỗ). Hỗ trợ: (1) gửi sample miễn phí cho đơn ≥30 bộ, (2) giao hàng theo tiến độ thi công (chia làm nhiều đợt), (3) bảo hành theo nhà máy gốc + Huayue chịu trách nhiệm đổi trả nếu lỗi. Liên hệ sales@huayuesc.vn hoặc 000-000-000.",
      },
      {
        q: "Tôi là công ty thiết kế nội thất — có ưu đãi cho khách VIP của tôi không?",
        a: "Có. Huayue cung cấp gói partnership cho công ty thiết kế: (a) catalogue tiếng Việt cho nhãn hàng TQ, (b) sample wood/stone/fabric, (c) hỗ trợ visual 3D miễn phí cho khách hàng cao cấp của bạn (đơn ≥30 bộ), (d) chiết khấu ưu đãi cho dự án trọn gói. Liên hệ partnership@huayuesc.vn.",
      },
      {
        q: "Tôi muốn đi thăm nhà máy Trung Quốc — Huayue có tổ chức đoàn không?",
        a: "Có. Huayue tổ chức đoàn buyer Việt Nam đi Canton Fair (tháng 4 và 10), CIFF Quảng Châu (tháng 3 và 9), Foshan Pottery Show (tháng 4 và 10). Mỗi đoàn 10-25 buyer, có phiên dịch chuyên ngành và đội sourcing Huayue Quảng Châu đón. Đặt lịch business matching với nhà máy trước chuyến đi. Liên hệ partnership@huayuesc.vn để biết lịch và chi phí cụ thể.",
      },
      {
        q: "Tại sao tôi nên mua qua Huayue thay vì tự đi Trung Quốc hoặc mua qua broker?",
        a: "Tự đi TQ: phải biết tiếng Trung, am hiểu thị trường, có quan hệ với nhà máy, lo logistics + thông quan. Mua qua broker: không kiểm soát chất lượng tại nguồn, dễ bị markup ngầm, không có pháp lý rõ ràng. Huayue: có pháp nhân VN đăng ký (MST 0111453693), kiểm hàng tại xưởng trước xuất, giao DDP tận kho, hỗ trợ tiếng Việt 24/7, có Bảo đảm Giao dịch — bạn được hoàn tiền nếu hàng sai cam kết.",
      },
      {
        q: "Huayue có hỗ trợ tiếng Trung cho buyer Việt Nam không?",
        a: "Có. Mọi giao tiếp với nhà máy Trung Quốc đều do đội Huayue Quảng Châu xử lý — bạn chỉ làm việc tiếng Việt với đội Hà Nội. Khi cần đi nhà máy trực tiếp (cho đơn lớn hoặc OEM tuỳ chỉnh), Huayue cung cấp phiên dịch chuyên ngành đi cùng.",
      },
    ],
    related: [
      { label: "Quy trình kiểm định nhà máy", href: "/info/audit-process" },
      { label: "Trade Show Huayue tham gia", href: "/trade-shows" },
      { label: "Báo cáo thị trường", href: "/info/market-reports" },
      { label: "Liên hệ Partnership", href: "/info/contact" },
    ],
    primaryCta: { label: "Liên hệ partnership@huayuesc.vn", href: "mailto:partnership@huayuesc.vn" },
  },
  "audit-process": {
    title: "Quy trình kiểm định nhà máy — Tấm khiên đầu tiên cho buyer Việt Nam",
    intro:
      "Trước khi một nhà máy Trung Quốc trở thành đối tác của Huayue, đội sourcing tại văn phòng Quảng Châu (Tầng 3 Cảng Shuyu Chuangxing) thực hiện audit thực địa 5 bước trong 10-15 ngày: cross-check pháp lý qua Tianyancha + GACC, đi nhà máy kiểm tra dây chuyền và điều kiện lao động, lab test mẫu sản phẩm với đối tác bên thứ ba (SGS / Bureau Veritas) khi cần. Nhà máy không đạt — không được đưa vào danh sách bán cho buyer Việt Nam. Audit lại định kỳ 12 tháng/lần.",
    icon: "🔍",
    category: "QUY TRÌNH KIỂM ĐỊNH",
    quickFacts: [
      { label: "Số bước", value: "5" },
      { label: "Thời gian", value: "10-15 ngày" },
      { label: "Audit on-site bởi", value: "Đội Huayue Quảng Châu" },
      { label: "Lab test đối tác", value: "SGS · Bureau Veritas (khi cần)" },
      { label: "Audit lại", value: "12 tháng/lần" },
      { label: "Chi phí cho NCC", value: "Huayue chịu năm đầu" },
    ],
    sectionTitles: [
      "1. Vì sao audit là tấm khiên đầu tiên cho buyer",
      "2. Bước 1 — Đăng ký & cross-check pháp lý",
      "3. Bước 2 — Audit hồ sơ tài liệu nhà máy",
      "4. Bước 3 — Audit on-site tại xưởng (đội Quảng Châu)",
      "5. Bước 4 — Lab test sản phẩm với đối tác bên thứ ba",
      "6. Bước 5 — Onboarding làm đối tác Huayue + re-audit định kỳ",
    ],
    paragraphs: [
      "Sourcing xuyên biên giới có một bài toán: phần lớn rủi ro buyer gặp không nằm ở giá hay logistics, mà ở chính nhà máy — họ thực sự là ai, năng lực thực vs claim trên website, có vi phạm lao động hay môi trường không, sản phẩm có đạt chất lượng đồng nhất qua các batch không. Trên các sàn B2B global, mọi NCC có thể tự tạo Verified badge bằng cách trả phí và submit giấy tờ — không có audit on-site thực. Huayue chọn cách khác: đội sourcing tại văn phòng Quảng Châu thăm trực tiếp xưởng, kiểm tra mọi thứ, và chỉ chấp nhận làm việc với những nhà máy đủ chuẩn. Đây là tấm khiên đầu tiên bảo vệ buyer Việt Nam, trước khi đến tầng thứ hai (Bảo đảm Giao dịch) và tầng thứ ba (QC AQL 2.5 trước xuất xưởng).",
      "Bước 1 — Đăng ký & cross-check pháp lý (2-3 ngày): Nhà máy đăng ký qua /sell-on-csr hoặc được đội Huayue Quảng Châu scout tại hội chợ Canton Fair / CIFF / Foshan Pottery. Đội audit cross-check 3 nguồn dữ liệu công khai: (a) <b>Tianyancha</b> và <b>Qichacha</b> — tra giấy phép kinh doanh, lịch sử thay đổi vốn, kiện tụng, blacklist. (b) <b>GACC</b> (China Customs) — kiểm tra license xuất khẩu thực tế và HS code đã từng khai báo. (c) <b>China Court Open Database</b> — án phạt hành chính, vi phạm IP, gian lận thanh toán. Nhà máy có 'red flag' (kiện tụng quá nhiều, blacklist GACC, vi phạm lao động) bị reject ngay với thư phản hồi rõ ràng.",
      "Bước 2 — Audit hồ sơ tài liệu (2-3 ngày): Nhà máy nộp đầy đủ tài liệu chính thức gồm: Business License, Tax Registration, Unified Social Credit Code, Foreign Trade Operator Registration, Customs Declaration Registration, ISO 9001:2015 Quality Management certificate, các product certifications theo ngành (CE / RoHS / FDA / FSC / GREENGUARD / OEKO-TEX tuỳ ngành), sao kê ngân hàng 3 tháng (chứng minh dòng tiền vận hành thực — không phải shell company), bảng lương công nhân tháng gần nhất (verify số nhân lực vs claim), 30+ ảnh nhà máy, danh sách 5 khách hàng lớn nhất 3 năm gần. Đội audit cross-check trong 2-3 ngày để loại broker đội lốt và shell company.",
      "Bước 3 — Audit on-site tại xưởng (1-2 ngày): Đội QC của Huayue Quảng Châu (2-3 người, gồm Lead Auditor + Sector Specialist tuỳ ngành) đến nhà máy theo lịch — không báo trước quá 5 ngày để tránh staging. Kiểm tra trực tiếp: (i) Mặt bằng tổng thể + thoát hiểm; (ii) Dây chuyền sản xuất chính (đếm máy thực vs claim, kiểm idle/active rate); (iii) Công nhân (đếm thực, kiểm độ tuổi minimum 16+, ID check sample); (iv) Kho nguyên liệu (origin tracking, supplier list); (v) Kho thành phẩm (quy cách đóng gói, palletization); (vi) Lab QC nội bộ (thiết bị calibration, SOP, sampling rate AQL); (vii) Phòng PCCC + thoát hiểm theo GB 50016-2014; (viii) Khu nghỉ + canteen công nhân (điều kiện sống). Đội audit chụp 100+ ảnh evidence, quay video 360°, ghi nhận sai lỗi quan sát được, và interview ngẫu nhiên 5-8 công nhân về điều kiện làm việc. Báo cáo viết trong 5 ngày sau audit, ký số bằng chứng chỉ doanh nghiệp Huayue.",
      "Bước 4 — Lab test sản phẩm với đối tác bên thứ ba (5-7 ngày, khi cần): Cho các sản phẩm có yêu cầu an toàn cao (gạch porcelain — kiểm độ hút nước, độ bền uốn theo ISO 10545; sanitary — kiểm chì + cadmium leaching; sơn — kiểm VOC, formaldehyde; đồ điện — CCC + CE EMC; nắp bồn cầu thông minh — IP rating + leak test), nhà máy gửi 3-5 mẫu sản phẩm chủ lực về phòng test SGS hoặc Bureau Veritas branch tại Quảng Châu hoặc Thượng Hải. Test theo tiêu chuẩn ngành (ASTM, ISO, GB, EN tuỳ thị trường đích). Lab độc lập (Huayue không thông đồng được vì lab là bên thứ ba), kết quả là baseline để monitor consistency qua re-audit. Đối với sản phẩm đơn giản (vd: gạch men cơ bản, sàn gỗ thường), Huayue chấp nhận test report mới nhất của nhà máy (≤6 tháng) thay vì test lại — tiết kiệm thời gian onboarding.",
      "Bước 5 — Onboarding làm đối tác Huayue + re-audit định kỳ: Nhà máy pass cả 4 bước trên được mời ký hợp đồng partnership với Huayue — không phí thành viên, chỉ thoả thuận commission 3-5%/đơn. Onboarding gồm: training về SOP Huayue (response RFQ trong 24h, packaging chuẩn DDP, dispute handling), shoot ảnh sản phẩm chuẩn marketing, video factory tour 90-180 giây, listing sản phẩm chủ lực với title + description tiếng Việt + tiếng Anh, setup tài khoản nhận giải ngân tín thác. <b>Re-audit định kỳ 12 tháng/lần</b> — đội Huayue Quảng Châu quay lại xưởng kiểm: (a) Production capacity không giảm >25% so với baseline. (b) Số nhân sự ổn định. (c) Complaint rate trong 12 tháng &lt;5%. (d) AQL pass rate ≥98% qua các batch QC inspection. (e) Không có vi phạm pháp luật mới. Nếu fail nghiêm trọng (vd: phát hiện child labour, fraud, IP infringement): huỷ tư cách đối tác ngay lập tức, refund 100% mọi đơn đang trong Bảo đảm Giao dịch.",
    ],
    pullQuote: {
      text: "Đội Huayue Quảng Châu đi nhà máy gần như mỗi tuần — không phải vì check-list, mà vì đó là cách duy nhất để biết nhà máy hôm nay khác hôm qua chưa. Buyer Việt Nam không đến được tận xưởng, nên chúng tôi phải đến thay.",
      author: "Đội Sourcing — Huayue Quảng Châu",
    },
    checklist: [
      "🏭 Audit on-site bởi đội Huayue Quảng Châu — không phải audit qua giấy tờ",
      "📋 Cross-check Tianyancha · GACC · China Court Open Database",
      "🧪 Lab test bên thứ ba SGS / Bureau Veritas khi cần (sản phẩm an toàn cao)",
      "👷 Kiểm tra điều kiện lao động: tuổi tối thiểu 16+, PCCC, khu nghỉ công nhân",
      "🔄 Re-audit 12 tháng/lần — không có 'pass thì xong'",
      "💸 Năm đầu Huayue chịu chi phí audit hoàn toàn cho nhà máy đối tác",
      "📞 Buyer có thể request audit ngẫu nhiên cho nhà máy đang làm việc (chi phí chia sẻ)",
    ],
    faq: [
      {
        q: "Audit có báo trước cho nhà máy không?",
        a: "Re-audit định kỳ chỉ thông báo trước 5 ngày — đủ để nhà máy sắp xếp staff đón tiếp nhưng không đủ để 'staging' (dọn dẹp, tuyển công nhân tạm). Audit ban đầu cho nhà máy mới có thể schedule trước hơn (10-14 ngày) vì cần phối hợp logistics. Huayue có quyền surprise audit cho các nhà máy có complaint rate tăng đột biến — không cần báo trước.",
      },
      {
        q: "Buyer có được xem báo cáo audit đầy đủ không?",
        a: "Bản tóm tắt 8-12 trang (gồm pass/fail decision, công ty profile, điều kiện làm việc, kết quả lab) được cung cấp cho buyer business account khi cân nhắc đặt đơn lớn. Bản đầy đủ chứa thông tin nhạy cảm về tài chính/ownership chỉ Huayue giữ — share với buyer chỉ trong dispute hoặc với consent của nhà máy.",
      },
      {
        q: "Audit có chi phí gì cho nhà máy không?",
        a: "Năm đầu Huayue chịu 100% chi phí audit (~$1,500-3,000/audit). Từ năm 2 trở đi, nhà máy đối tác đóng góp 50% cho audit lại nếu cần lab test. Huayue đầu tư vào audit vì đó là moat cạnh tranh quan trọng — nhà máy không tin tưởng dễ dàng sẽ không đứng vững được sau dispute thực tế.",
      },
      {
        q: "Nếu nhà máy pass audit rồi sau đó chất lượng giảm — Huayue biết bằng cách nào?",
        a: "5 cơ chế: (a) Re-audit 12 tháng/lần. (b) QC AQL 2.5 trước xuất xưởng cho mọi đơn — phát hiện sớm lệch chuẩn. (c) Buyer rating + dispute rate được monitor, threshold 5% mở dispute → đội sourcing investigate. (d) Buyer có thể request audit ngẫu nhiên cho nhà máy mình đang làm việc. (e) Đội Quảng Châu visit không định kỳ các nhà máy đối tác mỗi quý.",
      },
      {
        q: "Tôi muốn audit độc lập một nhà máy Trung Quốc ngoài hệ thống Huayue — có làm được không?",
        a: "Có. Huayue cung cấp 'Standalone Factory Audit' service cho buyer doanh nghiệp lớn muốn audit nhà máy tự tìm — chi phí $1,800-3,500 tuỳ ngành, deliverable trong 10-15 ngày, full report ký số. Phù hợp khi buyer đã có shortlist 5-10 nhà máy từ Canton Fair và cần lọc trước khi ký hợp đồng. Liên hệ sales@huayuesc.vn.",
      },
    ],
    related: [
      { label: "Mạng lưới đối tác", href: "/info/network" },
      { label: "Bảo đảm Giao dịch", href: "/info/trade-assurance" },
      { label: "Đăng ký nhà máy hợp tác Huayue", href: "/sell-on-csr" },
      { label: "Theo dõi đơn realtime", href: "/info/order-tracking" },
    ],
    primaryCta: { label: "Tìm sản phẩm từ nhà máy đã audit", href: "/products" },
  },
  "industry-news": {
    title: "Tin tức ngành sourcing",
    intro: "Cập nhật xu hướng giá cả, sản phẩm mới, hội chợ.",
    paragraphs: [
      "Mỗi tuần, đội nội dung Huayuesc xuất bản 8-12 bài về xu hướng giá nguyên liệu, sản phẩm mới ra mắt, sự kiện hội chợ, thay đổi chính sách thuế.",
      "Đăng ký Cảnh báo Thương mại để nhận newsletter hàng tuần qua email và Zalo OA. Đã có 12,000+ buyer Việt Nam đăng ký.",
    ],
    related: [{ label: "Đăng ký Cảnh báo Thương mại", href: "/trade-alert" }],
  },
  "contact": {
    title: "Liên hệ Huayuesc",
    intro: "Hà Nội · Quảng Châu · Online 24/7. Chọn kênh phù hợp để được phản hồi nhanh nhất.",
    icon: "📞",
    category: "LIÊN HỆ",
    quickFacts: [
      { label: "Văn phòng", value: "2 (HN + QC)" },
      { label: "Hỗ trợ online", value: "24/7" },
      { label: "Phản hồi email", value: "<6 giờ" },
      { label: "Phản hồi chat", value: "<5 phút" },
    ],
    sectionTitles: [
      "🇻🇳 Văn phòng Hà Nội",
      "🇨🇳 Văn phòng Quảng Châu",
      "💬 Hỗ trợ online 24/7",
    ],
    paragraphs: [
      "Tầng 12, Tòa nhà Huayuesc, 26 Phạm Hùng, Cầu Giấy, Hà Nội. Tel: 000-000-000. Email: hanoi@huayuesc.vn. Giờ làm việc: 8h00-18h00 thứ 2 - thứ 7. Đội Hà Nội phụ trách: tư vấn buyer Việt Nam, after-sales, tranh chấp, chứng từ hải quan VN. Tất cả nói tiếng Việt thuần. Có khu trưng bày sample miễn phí cho buyer ghé thăm.",
      "26/F, Tianhe Plaza, Tianhe District, Guangzhou, China. Tel: 000-000-000. WeChat: huayuesc_qc. Email: guangzhou@huayuesc.vn. Đội Quảng Châu phụ trách: audit nhà máy, kiểm hàng on-site, sourcing mới, đối tác NCC. Có 8 auditor full-time đi 30+ thành phố Trung Quốc. Buyer Việt Nam có thể yêu cầu video call trực tiếp với đội QC tại nhà máy.",
      "Hỗ trợ tức thì qua nhiều kênh: Email support@huayuesc.vn (phản hồi <6 giờ), Live chat trên website (5 phút), Zalo OA: Huayuesc (chat tiếng Việt 24/7), Facebook Messenger: fb.com/huayuesc. Đội support 12 người chia 3 ca, đảm bảo có người phản hồi cả ngoài giờ hành chính, kể cả ngày nghỉ lễ.",
    ],
    checklist: [
      "Sales / Tư vấn sourcing: sales@huayuesc.vn",
      "Bảo đảm Giao dịch / Tranh chấp: dispute@huayuesc.vn",
      "Tuyển dụng: hr@huayuesc.vn",
      "Báo chí / PR: pr@huayuesc.vn",
      "DPO bảo mật: privacy@huayuesc.vn",
    ],
    related: [
      { label: "Tuyển dụng", href: "/info/careers" },
      { label: "Mạng lưới kết nối hiệp hội", href: "/info/network" },
      { label: "Trung tâm trợ giúp", href: "/help" },
    ],
    primaryCta: { label: "Gửi RFQ ngay", href: "/buying-request" },
  },
  "shipping-policy": {
    title: "Chính sách vận chuyển — Huayuesc",
    intro:
      "Vận chuyển hàng hoá B2B từ Trung Quốc về Việt Nam tuân thủ Incoterms 2020 với 4 phương thức chính: EXW, FOB, CIF, DDP. Huayuesc vận hành với 2 đối tác logistics chiến lược (Sinotrans + Vinatrans) và 5 cảng đích Việt Nam, đảm bảo thời gian giao tối ưu cho mọi quy mô đơn hàng.",
    icon: "🚚",
    category: "VẬN CHUYỂN",
    quickFacts: [
      { label: "Incoterms", value: "2020" },
      { label: "Phương thức", value: "EXW · FOB · CIF · DDP" },
      { label: "Cảng đích VN", value: "5 cảng + 1 đường bộ" },
      { label: "Thời gian giao DDP", value: "5-22 ngày" },
      { label: "Đối tác logistics", value: "Sinotrans + Vinatrans" },
      { label: "Bảo hiểm", value: "0.5% giá trị hàng" },
      { label: "Insurance carrier", value: "Bảo Việt + PVI" },
      { label: "Hỗ trợ tracking", value: "Realtime API" },
    ],
    sectionTitles: [
      "1. Incoterms 2020 — 4 phương thức tại CSR",
      "2. So sánh chi tiết EXW · FOB · CIF · DDP",
      "3. Mạng lưới cảng đích Việt Nam",
      "4. Đường bộ qua cửa khẩu Hữu Nghị (Lạng Sơn)",
      "5. Thời gian giao chi tiết theo route",
      "6. Bảo hiểm hàng hoá & Khiếu nại vận chuyển",
      "7. Thủ tục hải quan Việt Nam",
      "8. Ưu đãi thuế ACFTA + RCEP",
      "9. Tracking realtime & Notification",
      "10. Trường hợp đặc biệt — Hàng nguy hiểm, oversize, fragile",
    ],
    paragraphs: [
      "Huayuesc áp dụng Incoterms 2020 — chuẩn quốc tế của Phòng Thương mại Quốc tế (ICC) cho hợp đồng mua bán quốc tế. 4 phương thức được hỗ trợ trên nền tảng (theo thứ tự trách nhiệm Buyer giảm dần): (a) EXW (Ex Works) — Buyer tự đến nhà máy lấy hàng, tự lo cước + thuế + thông quan + nội địa. (b) FOB (Free on Board) — Supplier giao hàng lên tàu tại cảng xuất, từ đó Buyer chịu trách nhiệm. (c) CIF (Cost, Insurance & Freight) — Supplier giao hàng tại cảng nhập VN đã gồm cước biển + bảo hiểm; Buyer lo thuế + thông quan + nội địa. (d) DDP (Delivered Duty Paid) — Supplier/CSR giao hàng tận kho Buyer, đã gồm tất cả: cước, thuế, thông quan, nội địa, bảo hiểm. Đây là Incoterm phổ biến nhất tại CSR (78% đơn 2025 dùng DDP).",
      "Bảng so sánh chi tiết để Buyer chọn phù hợp:",
      // Note: paragraphs not directly support tables — but for now just inline as text. Could use 'list' block in future.
      "DDP (khuyến nghị mặc định): CSR lo TOÀN BỘ — gọi xe tải đến nhà máy pickup, vận chuyển ra cảng/biên giới, làm thủ tục xuất khẩu CN, thuê tàu/xe tải qua biên giới, thông quan VN (CSR đứng tên doanh nghiệp khai báo), thanh toán thuế nhập khẩu + VAT 10%, vận chuyển nội địa VN tới kho Buyer. Buyer chỉ ký nhận hàng tại kho. Phù hợp 90% Buyer mới, đặc biệt ai chưa có forwarder riêng. Chi phí: $400-700/CBM tuỳ cảng đích, đã include all-in-one. Thời gian giao: 5-7 ngày qua Lạng Sơn, 18-22 ngày qua đường biển.",
      "CIF (cho Buyer có forwarder + customs broker): Supplier/CSR ship hàng đến cảng VN (Hải Phòng/Cát Lái/Đà Nẵng), bảo hiểm Marine Insurance bao hàng đến cảng. Buyer tự thuê customs broker làm thủ tục thông quan + thanh toán thuế VAT + đưa hàng về kho. Tiết kiệm 15-25% so với DDP nếu đã có hạ tầng logistics nội địa. Chi phí: $250-400/CBM. Thời gian giao: 12-15 ngày tới cảng VN. Phù hợp doanh nghiệp ≥3 năm kinh nghiệm nhập khẩu, có team logistics nội bộ.",
      "FOB (cho Buyer chuyên nghiệp): Supplier/CSR giao hàng đến cảng xuất Trung Quốc (Foshan/Shenzhen/Ningbo/Shanghai), từ đó Buyer tự thuê tàu + bảo hiểm + thông quan VN. Tiết kiệm 30-40% so với DDP nhưng cần năng lực logistics cao. Chi phí: $80-150/CBM phí pickup + handling tại cảng xuất. Thời gian giao: 1-2 ngày tới cảng. Phù hợp với buyer cực kỳ chuyên nghiệp hoặc tổng công ty có sister company tại HK/Singapore xử lý logistics.",
      "EXW (đặc biệt — không khuyến nghị): Buyer tự đến nhà máy lấy hàng, không khuyến nghị cho 99% Buyer Việt Nam. Chỉ phù hợp với: (i) Buyer có văn phòng đại diện tại Trung Quốc, (ii) hàng siêu đặc thù cần Buyer kiểm trực tiếp tại nhà máy, (iii) đơn nhỏ <$1K. CSR vẫn hỗ trợ EXW nhưng Buyer chịu mọi rủi ro vận chuyển từ nhà máy đến cảng/biên giới.",
      "Mạng lưới cảng đích Việt Nam của CSR: (1) Cảng Lạch Huyện (Hải Phòng, Bắc) — port deep-water mới, throughput cao, ít tắc nghẽn, lý tưởng cho Buyer Bắc + Trung. Cước CIF $280/CBM. Thông quan e-customs nhanh 0.5-1 ngày. (2) Cảng Cát Lái (TP HCM, Nam) — port lớn nhất VN, infrastructure mature, cho Buyer Nam. Cước CIF $320/CBM. Thông quan thường tắc nghẽn cao điểm 2-3 ngày. (3) Cảng Đà Nẵng (Trung) — cho Buyer miền Trung + Tây Nguyên. Cước CIF $350/CBM. Thời gian giao tương tự Hải Phòng. (4) Cảng Tiên Sa (Đà Nẵng phụ) — chuyên container đặc biệt. (5) Cảng Cái Mép - Thị Vải (Vũng Tàu) — port nước sâu cho mega-vessel, thường dùng cho đơn ≥40HQ. CSR đang đầu tư mở văn phòng tại Hải Phòng (Q3/2026) để rút ngắn thời gian giao DDP về kho Buyer Bắc xuống 7-9 ngày.",
      "Đường bộ qua cửa khẩu Hữu Nghị (Lạng Sơn) — lựa chọn tốc độ nhất cho Buyer Bắc + đơn nhỏ. Tuyến: Foshan/Quảng Châu/Nam Ninh → Hữu Nghị (TQ) → Hữu Nghị (VN) → Hà Nội → kho Buyer. Thời gian giao 5-7 ngày tổng (vs 18-22 ngày đường biển). Cước cao hơn 30-45%: $130-160/CBM cho LCL, $3,200-3,800 cho FCL 20-40HQ. Phù hợp: hàng hot trend, sample, đơn replenishment khẩn, hàng có vòng đời ngắn. Cửa khẩu Hữu Nghị nâng cấp 02/2026 với hệ thống e-customs mới — thông quan giảm từ 2-3 ngày xuống 0.5-1 ngày. CSR ký MOU với 2 forwarder đường bộ (Sinotrans + Vinatrans) để guarantee năng lực và giá ổn định.",
      "Thời gian giao chi tiết theo route phổ biến (đến kho Buyer Hà Nội): (i) Foshan/Quảng Châu → Hữu Nghị (đường bộ): 5-7 ngày. (ii) Foshan → Lạch Huyện (biển): 12-15 ngày, +1-2 ngày đến HN. (iii) Thượng Hải → Lạch Huyện (biển): 9-12 ngày, +1-2 ngày đến HN. (iv) Đông Quan/Thâm Quyến → Cát Lái (biển): 10-12 ngày, +5-7 ngày đến HN. (v) Air freight Foshan → Hà Nội: 2-4 ngày (cho hàng siêu khẩn, sample, $8-15/kg). Thời gian giao bao gồm: pickup tại nhà máy (1-2 ngày), vận chuyển đến cảng xuất (0.5-1 ngày), tàu/xe tải (5-12 ngày), thông quan VN (0.5-2 ngày), nội địa VN (0.5-2 ngày). Buffer ±2 ngày cho yếu tố thời tiết, tắc cảng, kiểm hoá đột xuất.",
      "Bảo hiểm hàng hoá tự động cho mọi đơn DDP/CIF: (a) Marine Cargo Insurance — phí 0.5% giá trị CIF, do CSR mua qua đối tác Bảo Việt (cho VND) + PVI Insurance (cho USD). (b) Mức bồi thường 110% giá trị hàng trong trường hợp tổn thất toàn bộ (general average + particular average + total loss). (c) Phạm vi bao: hư hỏng do thiên tai, đắm tàu, va chạm, cướp biển, force majeure trong vận chuyển. KHÔNG bao: hư hỏng do chất lượng đóng gói kém của NCC (xử lý qua Bảo đảm Giao dịch), hao mòn tự nhiên, khai báo không trung thực. Khiếu nại bảo hiểm: gửi thông báo trong 7 ngày kể từ ngày nhận hàng + biên bản nghiệm thu + ảnh/video chứng cứ. Thời gian xử lý 14-21 ngày làm việc. CSR hỗ trợ Buyer làm hồ sơ — không tính phí.",
      "Thủ tục hải quan Việt Nam: đội thông quan Huayue tại cảng Hải Phòng đứng tên doanh nghiệp khai báo (theo uỷ quyền của Buyer qua hợp đồng dịch vụ logistics) sử dụng hệ thống VNACCS/VCIS — nền tảng e-customs của Tổng cục Hải quan từ 2014. Quy trình: (1) Khai báo điện tử trong 24h trước khi tàu/xe đến cảng/biên giới. (2) Hải quan tự động phân loại luồng (xanh — thông qua, vàng — kiểm hồ sơ, đỏ — kiểm thực tế). Hàng từ nhà máy đối tác Huayue có lịch sử khai báo tốt thường đi luồng xanh nhanh chóng. (3) Thanh toán thuế nhập khẩu + VAT qua chuyển khoản ngân hàng đối tác. (4) Lấy lệnh giao hàng (D/O), pick up container/lô hàng. (5) Vận chuyển nội địa đến kho Buyer. đội thông quan Huayue tại cảng Hải Phòng có chứng chỉ broker Bộ Tài chính — đảm bảo thông quan kể cả ngày nghỉ lễ.",
      "Ưu đãi thuế ưu đãi đặc biệt theo các Hiệp định Thương mại Tự do (FTA): (a) ACFTA (ASEAN-China FTA) — hàng từ Trung Quốc nguyên xứ vào VN được miễn thuế hoặc giảm thuế đáng kể cho 7,000+ HS code. Yêu cầu Form E (CO Form E — Certificate of Origin from China). NCC verified của CSR đều cung cấp Form E miễn phí. Tiết kiệm trung bình 5-15% thuế nhập khẩu. (b) RCEP (Regional Comprehensive Economic Partnership) — hiệu lực 01/2022, ưu đãi cho 92% biểu thuế giữa 15 nước RCEP. Form RCEP. Một số sản phẩm hưởng RCEP có lợi hơn ACFTA (đặc biệt: máy móc, linh kiện điện tử). CSR auto-pick FTA tốt nhất cho mỗi đơn. (c) EVFTA, CPTPP — không áp dụng cho hàng từ TQ về VN, chỉ cho EU/CPTPP members. Huayuesc tư vấn HS code chính xác để Buyer hưởng được ưu đãi tối đa.",
      "Tracking realtime + notification multi-channel cho mọi đơn: (i) Dashboard /buyer-center/orders — view tổng quan, filter theo status. (ii) Email — cập nhật theo từng mốc (pickup, xuất xưởng, nhập cảng, thông quan, giao kho). (iii) Zalo OA Huayuesc — push notification realtime. (iv) SMS — chỉ cho 2 mốc quan trọng (sắp giao + đã giao). (v) API tracking webhook — cho Buyer enterprise (≥$100K/năm) tích hợp ERP nội bộ. (vi) Vehicle GPS — cho hàng đường bộ qua Lạng Sơn, view location realtime trên bản đồ. Mỗi đơn có 30-80 ảnh + 5-15 video chứng cứ tại các mốc, lưu cloud, Buyer download bất cứ lúc nào.",
      "Trường hợp đặc biệt: (a) Hàng nguy hiểm (Dangerous Goods — IMDG) — pin lithium, hoá chất, sơn, dung môi. CSR yêu cầu MSDS (Material Safety Data Sheet), UN classification, đóng gói chuyên dụng. Phụ phí 30-80% cước thông thường. Chỉ có 5/40 NCC verified hỗ trợ DG. (b) Hàng oversize — kích thước ≥12m hoặc trọng lượng ≥30 tấn/đơn vị. Yêu cầu xe tải đặc biệt (low-bed trailer), giấy phép vận chuyển quá khổ. Phụ phí 50-150%. (c) Hàng fragile (gốm sứ, kính, đá tự nhiên) — đóng gói pallet gỗ + foam đa lớp + corner protector + 'Fragile' label đa ngôn ngữ. Phụ phí 5-10%. (d) Hàng cold chain (yêu cầu nhiệt độ kiểm soát) — refrigerated container 0-25°C, chi phí gấp 2-3x normal. (e) Hàng có giá trị cao ($50K+/lô) — bảo hiểm tăng 1% giá trị, container có GPS lock, hộ tống qua biên giới.",
    ],
    pullQuote: {
      text: "Logistics là cốt lõi của B2B cross-border. Một container chậm 5 ngày có thể làm Buyer mất khách hàng cuối — chúng tôi đầu tư mạnh vào partnership và infrastructure để đảm bảo predictability.",
      author: "Đặng Thanh Hà — Logistics Coordinator Huayuesc",
    },
    checklist: [
      "Incoterms 2020 chuẩn ICC — 4 phương thức EXW · FOB · CIF · DDP",
      "5 cảng đích VN: Lạch Huyện · Cát Lái · Đà Nẵng · Tiên Sa · Cái Mép",
      "Đường bộ Lạng Sơn 5-7 ngày — lý tưởng cho hàng hot trend",
      "Marine Insurance auto qua Bảo Việt + PVI — 0.5% giá trị, bồi thường 110%",
      "E-customs VNACCS/VCIS — 75% hàng đi luồng xanh trong 2 giờ",
      "Ưu đãi ACFTA + RCEP — tiết kiệm 5-15% thuế NK",
      "Tracking 5 kênh: Dashboard + Email + Zalo + SMS + API webhook",
      "Hỗ trợ DG · Oversize · Fragile · Cold chain · High-value",
    ],
    faq: [
      {
        q: "DDP có rẻ hơn tự lo logistics không?",
        a: "Tuỳ Buyer. Nếu Buyer có sẵn customs broker + forwarder, DDP đắt hơn 12-18%. Nếu Buyer mới hoặc không có team logistics, DDP rẻ hơn 5-15% so với thuê forwarder ngoài (CSR có giá tốt do volume lớn). 78% Buyer CSR chọn DDP vì sự tiện lợi + transparent pricing.",
      },
      {
        q: "Có thể chia nhỏ đơn hàng để né thuế không?",
        a: "KHÔNG. Hành vi này (under-invoicing, splitting shipment) vi phạm Luật Hải quan VN — phạt 1-3x giá trị thuế trốn + có thể truy cứu hình sự. CSR tuyệt đối không hỗ trợ. Tuy nhiên, có cách hợp pháp: claim ưu đãi ACFTA/RCEP (tiết kiệm 5-15% thuế).",
      },
      {
        q: "Thời gian giao 5-7 ngày qua Lạng Sơn có chính xác không?",
        a: "Có, đó là thời gian giao từ pickup tại nhà máy đến kho Buyer Hà Nội (đã bao gồm thông quan + nội địa). Buyer Đà Nẵng/HCM cộng thêm 1-2 ngày vận chuyển nội địa. Buffer ±2 ngày cho điều kiện thời tiết hoặc kiểm hoá đột xuất.",
      },
      {
        q: "Bảo hiểm có bao hàng hỏng do đóng gói kém không?",
        a: "Không. Bảo hiểm Marine Cargo chỉ bao tổn thất do thiên tai, va chạm, force majeure trong vận chuyển. Hỏng do đóng gói kém = lỗi NCC, xử lý qua Bảo đảm Giao dịch refund 100% (xem /info/payment-protection). Vì vậy CSR audit packaging chuẩn xuất khẩu trước khi đồng ý ship.",
      },
      {
        q: "Tôi có thể tracking đơn hàng qua API không?",
        a: "Có, dành cho Buyer enterprise ≥$100K/năm. Liên hệ sales@huayuesc.vn để được cấp API key + webhook URL. Documentation tại docs.huayuesc.vn/api/tracking. Free tier 1000 requests/ngày, Pro $99/tháng cho unlimited.",
      },
      {
        q: "Có dịch vụ vận chuyển hàng siêu khẩn không?",
        a: "Có, Air Freight Express qua đối tác DHL/FedEx. Thời gian giao 2-4 ngày Foshan → Hà Nội. Cước $8-15/kg (đắt gấp 5-7x sea freight). Phù hợp sample, hàng hotfix, hàng giá trị cao kích thước nhỏ. Min charge $100/đơn.",
      },
    ],
    related: [
      { label: "Tính cước DDP", href: "/info/ddp-calculator" },
      { label: "Hướng dẫn nhập khẩu", href: "/info/import-guide" },
      { label: "Bảo vệ thanh toán", href: "/info/payment-protection" },
      { label: "Theo dõi đơn hàng", href: "/info/order-tracking" },
    ],
    primaryCta: { label: "Tính cước DDP cho đơn của bạn", href: "/info/ddp-calculator" },
  },
  "trade-assurance": {
    title: "Bảo đảm Giao dịch — Bảo vệ thanh toán xuyên biên giới",
    intro:
      "Cơ chế trung gian do Huayuesc vận hành cùng ngân hàng đối tác tại Việt Nam và Trung Quốc — buyer thanh toán vào tài khoản trung gian, NCC chỉ nhận tiền sau khi hàng đã giao đúng chất lượng và đặc tả. Mỗi đồng buyer chuyển đi đều có lá chắn pháp lý.",
    icon: "🛡",
    category: "BẢO VỆ GIAO DỊCH",
    quickFacts: [
      { label: "Phí cho buyer", value: "0%" },
      { label: "Phí cho NCC", value: "1.5% / đơn" },
      { label: "Ngân hàng trung gian", value: "Ngân hàng đối tác VN+TQ" },
      { label: "Inspection period", value: "7 ngày" },
      { label: "Bồi hoàn tối đa", value: "100% giá trị" },
      { label: "Phạm vi bảo vệ", value: "Tích luỹ tăng dần" },
    ],
    sectionTitles: [
      "Bảo đảm Giao dịch là gì & vì sao buyer Việt Nam cần",
      "Cách hoạt động — 5 bước từ PO đến giải ngân",
      "Phạm vi bảo vệ — được & không được",
      "Quy trình mở tranh chấp (dispute) & bằng chứng",
      "Mức phí, giới hạn & các đối tác ngân hàng",
    ],
    paragraphs: [
      "B2B xuyên biên giới truyền thống có một khoảng trống nguy hiểm: buyer thường phải chuyển 30% đặt cọc trước khi NCC bắt đầu sản xuất, và 70% còn lại trước khi NCC giao B/L. Nếu NCC giao sai spec, sai chất lượng, hoặc tệ nhất là không giao hàng, buyer gần như không có công cụ pháp lý quốc tế nào để lấy lại tiền nhanh chóng — kiện tụng xuyên biên giới mất 12-24 tháng và chi phí luật sư thường vượt giá trị đơn dưới $50K. Bảo đảm Giao dịch giải quyết khoảng trống này: thay vì chuyển trực tiếp cho NCC, buyer chuyển vào tài khoản trung gian do bên thứ ba — hệ thống ngân hàng đối tác của Huayuesc — kiểm soát. NCC chỉ thấy được tiền sau khi buyer xác nhận hàng đã nhận đúng. Mô hình này đã trở thành chuẩn mực cho các nền tảng B2B nghiêm túc trên thế giới (Alibaba Bảo đảm Giao dịch, Made-in-China Secure Trade) và Huayuesc vận hành phiên bản nội địa hoá cho thị trường Việt Nam — sử dụng ngân hàng Việt Nam cho đầu thanh toán và ngân hàng đối tác Trung Quốc cho đầu giải ngân.",
      "Quy trình 5 bước: (1) Buyer tạo PO trên Huayuesc, chọn checkbox 'Bảo vệ bằng Bảo đảm Giao dịch' — phí 0% cho buyer, NCC đã bao gồm 1.5% trong giá list. (2) Buyer chuyển tiền (TT bank wire hoặc ACH) vào tài khoản trung gian tại ngân hàng đối tác tại Việt Nam — số tài khoản và mã đơn được sinh ra duy nhất cho từng PO, có IBAN/SWIFT đầy đủ. (3) Huayuesc thông báo NCC tiền đã được khoá, NCC bắt đầu sản xuất và giao hàng theo Incoterms thoả thuận; với FOB/CIF, B/L gốc được Huayuesc giữ; với DDP, mã tracking được monitor liên tục. (4) Buyer nhận hàng tại cảng VN hoặc kho riêng, có 7 ngày để kiểm tra (inspection period); nếu hàng đạt yêu cầu, buyer ký xác nhận trên dashboard hoặc qua email confirm — Huayuesc giải ngân cho NCC qua ngân hàng đối tác Trung Quốc trong vòng 24 giờ làm việc. (5) Nếu trong 7 ngày buyer phát hiện vấn đề — sai spec, sai số lượng, kém chất lượng — buyer mở dispute trên dashboard kèm bằng chứng; tiền tiếp tục bị khoá cho đến khi tranh chấp được giải quyết.",
      "Bảo đảm Giao dịch bảo vệ buyer trong các trường hợp: (a) Hàng giao không đúng đặc tả kỹ thuật trong Hợp đồng/PI — sai size, sai màu, sai chất liệu, sai chứng nhận (CE, FCC, RoHS thiếu hoặc giả). (b) Số lượng giao thiếu so với PO (ví dụ PO 1000 cái, giao 850 cái mà không thông báo). (c) Chất lượng kém theo tiêu chuẩn AQL 2.5 — quá nhiều lỗi major/minor so với mẫu pre-production đã ký. (d) NCC default — không giao hàng đúng thời hạn (tolerance 14 ngày), không phản hồi sau khi đã thu tiền. (e) Hàng hư hỏng do đóng gói sai standards (carton ướt, rách, không có pallet đúng quy cách). Bảo đảm Giao dịch KHÔNG bảo vệ: (a) Hàng hư hỏng do shipping line — đó là phạm vi của Marine Insurance qua Bảo Việt/PVI mà buyer phải mua riêng. (b) Buyer đổi ý sau khi đã ký off mẫu — sample đã được approved bằng văn bản tay/email coi như binding. (c) Buyer không thực hiện inspection trong 7 ngày, hệ thống tự động giải ngân theo điều khoản (silence = acceptance). (d) Force majeure — bão lũ, đại dịch, chiến tranh — đã có điều khoản riêng trong Điều khoản dịch vụ.",
      "Khi có vấn đề, buyer mở dispute trên CSR Dashboard → Orders → Open Dispute. Hệ thống yêu cầu upload tối thiểu: (a) Hình ảnh sản phẩm thực tế tại kho (không phải tại cảng — phải sau khi đã unload), tối thiểu 8 ảnh ở các góc và close-up lỗi. (b) Video unboxing 60-180 giây cho thấy điều kiện carton ngoài + sản phẩm bên trong. (c) Bảng so sánh chi tiết spec PO vs spec thực tế. (d) Khuyến nghị mạnh: báo cáo inspection của bên thứ ba (SGS, Bureau Veritas, TÜV Rheinland) — chi phí $200-450 cho 1 container, được coi là evidence cao nhất trong dispute. Huayuesc Dispute Officer sẽ review trong 3 ngày làm việc, tổ chức call 3 phương buyer-NCC-CSR (tiếng Việt + tiếng Trung dịch song song), tìm phương án thoả thuận: refund partial, replacement free, hoặc credit cho đơn sau. Nếu không đạt thoả thuận trong 14 ngày, CSR ra phán quyết dựa trên bằng chứng và điều khoản — buyer được hoàn tiền (full hoặc partial) trong 5-10 ngày làm việc; NCC bị trừ rating, đóng băng 10% reserved fund, và nếu tái phạm có thể bị huỷ tier Verified.",
      "Mức phí và giới hạn: Buyer 0% phí — Huayuesc không thu thêm. NCC trả 1.5% giá trị đơn, đã bao gồm trong giá list công khai (không phải phí ẩn). Giới hạn mỗi đơn: $1.000.000 cho tier Free và Pro buyer, $5.000.000 cho hợp đồng doanh nghiệp lớn (đã KYC doanh nghiệp đầy đủ). Giới hạn theo năm: $5M/buyer/năm cho Free + Pro, $50M/năm cho hợp đồng doanh nghiệp — vượt phải mở contract riêng và tài khoản trung gian qua ngân hàng đối tác qua văn phòng Huayue Quảng Châu. Đối tác ngân hàng đầu Việt Nam: ngân hàng thương mại Việt Nam; đầu Trung Quốc: ngân hàng đối tác tại Trung Quốc (qua văn phòng Huayue Quảng Châu). Số liệu 2025: Huayue đã bảo vệ giá trị đơn cho buyer Việt Nam, tỷ lệ dispute 2.3%, thời gian giải quyết trung bình 11 ngày làm việc, đa số vụ có evidence đầy đủ được hoàn tiền cho buyer.",
    ],
    pullQuote: {
      text: "Mỗi đồng buyer Việt Nam thanh toán đều được bảo vệ bằng pháp lý ngân hàng — đó là điều kiện tiên quyết để cây cầu thương mại xuyên biên giới đứng vững, không phải là tính năng cộng thêm.",
      author: "Đội Bảo đảm Giao dịch Huayuesc",
    },
    checklist: [
      "🏦 Trung gian qua ngân hàng đối tác tại VN và TQ",
      "💸 Buyer trả 0% phí — NCC trả 1.5% đã bao gồm trong giá",
      "🛡 Bảo vệ tối đa 100% giá trị đơn",
      "🔍 Inspection period 7 ngày sau khi nhận hàng",
      "⚖ Dispute mediation 3 ngày, giải quyết trung bình 11 ngày",
      "📊 Đã bảo vệ đơn hàng buyer Việt Nam (giá trị tích luỹ tăng đều)",
    ],
    faq: [
      {
        q: "Mọi đơn trên Huayuesc đều phải dùng Bảo đảm Giao dịch?",
        a: "Không bắt buộc — buyer có thể tắt Bảo đảm Giao dịch nếu đã có quan hệ lâu năm với NCC và muốn TT trực tiếp. Nhưng chúng tôi khuyến nghị mạnh sử dụng cho đơn đầu tiên với mọi NCC mới, hoặc đơn có giá trị > $5,000. Khoảng 78% đơn trên CSR đang dùng Bảo đảm Giao dịch.",
      },
      {
        q: "Nếu buyer và NCC tự thoả thuận thanh toán ngoài CSR, có được bảo vệ không?",
        a: "Không. Bảo đảm Giao dịch chỉ áp dụng cho thanh toán đi qua tài khoản trung gian của CSR. Mọi giao dịch P2P giữa buyer và NCC bên ngoài hệ thống đều nằm ngoài phạm vi bảo vệ. Đây cũng là lý do CSR khuyến cáo không chuyển khoản cá nhân — luôn chuyển vào account mã đơn riêng.",
      },
      {
        q: "Báo cáo inspection bên thứ ba (SGS, Bureau Veritas) có bắt buộc khi mở dispute không?",
        a: "Không bắt buộc cho đơn dưới $20,000 — ảnh và video chi tiết là đủ. Với đơn trên $20,000 hoặc tranh chấp phức tạp về AQL/chất lượng, chúng tôi khuyến nghị mạnh có báo cáo bên thứ ba (chi phí $200-450/container) — evidence này có trọng số cao nhất trong phán quyết của Dispute Officer.",
      },
      {
        q: "Bảo đảm Giao dịch có cover phí logistics không?",
        a: "Không trực tiếp. Bảo đảm Giao dịch chỉ cover giá trị hàng (FOB hoặc CIF value). Phí shipping, customs duty, và các phí tại cảng VN không nằm tại tài khoản trung gian. Tuy nhiên, nếu đơn được phán quyết hoàn tiền do lỗi hoàn toàn của NCC, NCC sẽ phải bồi thường thêm freight loss theo điều khoản — phần này thương lượng case-by-case.",
      },
      {
        q: "Nếu NCC phá sản hoặc đóng cửa trong khi đang sản xuất, buyer được gì?",
        a: "Tiền vẫn nằm trong tài khoản trung gian chứ không phải ở NCC. CSR sẽ refund 100% cho buyer trong vòng 7 ngày làm việc (chỉ cần xác nhận pháp lý NCC đã ngừng hoạt động qua Tianyancha hoặc thông báo chính thức). Đây là một trong những lợi ích lớn nhất của tài khoản trung gian so với TT trực tiếp — tiền không bao giờ thuộc tài sản kê biên của NCC.",
      },
    ],
    related: [
      { label: "Quy trình kiểm định nhà máy", href: "/info/audit-process" },
      { label: "Theo dõi đơn realtime", href: "/info/order-tracking" },
      { label: "Điều khoản dịch vụ", href: "/info/terms-of-service" },
      { label: "Chính sách vận chuyển", href: "/info/shipping-policy" },
    ],
    primaryCta: { label: "Tạo đơn được bảo vệ Bảo đảm Giao dịch", href: "/buying-request" },
  },
  "market-reports": {
    title: "Báo cáo thị trường — Market Intelligence cho buyer Việt Nam",
    intro:
      "12-18 báo cáo phát hành mỗi năm cho 3 ngành Huayue tập trung (Vật liệu xây dựng · Vật liệu trang trí · Đồ điện gia dụng nhà bếp – phòng tắm) — từ giá nhà máy Quảng Đông, biến động tỷ giá CNY/VND, chỉ số nguyên liệu Shanghai Futures cho đến chính sách thuế mới của Tổng cục Hải quan VN và GACC. Buyer Việt Nam có dữ liệu để đàm phán ngang hàng với nhà máy Trung Quốc.",
    icon: "📊",
    category: "TÀI LIỆU NGHIÊN CỨU",
    quickFacts: [
      { label: "Báo cáo / năm", value: "12-18 (1-1.5/tháng)" },
      { label: "Ngành cover", value: "3 (VLXD · Trang trí · Đồ điện bếp-VS)" },
      { label: "Cluster cover", value: "Quảng Đông · Phúc Kiến · Sơn Đông" },
      { label: "Đối tượng", value: "Buyer & đại lý phân phối Huayue" },
      { label: "Phí", value: "Miễn phí cho buyer mua hàng" },
      { label: "Cập nhật", value: "Đầu mỗi tháng" },
    ],
    sectionTitles: [
      "Vì sao buyer Việt Nam cần Market Intelligence",
      "3 loại báo cáo theo 3 ngành Huayue",
      "Nội dung báo cáo — Giá nhà máy, tỷ giá, chính sách thuế",
      "Phương pháp thu thập & nguồn dữ liệu",
      "Cách truy cập",
    ],
    paragraphs: [
      "Sourcing B2B từ Trung Quốc lâu nay là cuộc chơi mà nhà máy nắm hết thông tin và buyer Việt Nam đi theo. Nhà máy Phật Sơn biết chính xác giá đất sét hôm nay, tỷ giá CNY/VND tuần này, chính sách hoàn thuế GTGT sắp đổi — và tất cả thông tin này được dùng để định giá cho buyer Việt Nam. Trong khi đó, buyer chỉ thấy con số cuối cùng nhà máy báo, không có cách nào kiểm chứng. Huayue phát hành Market Intelligence Reports để cân bằng sân chơi: tổng hợp dữ liệu từ chính các nhà máy đối tác của Huayue, Shanghai Futures Exchange (SHFE), Tổng cục Hải quan Việt Nam, Bộ Thương mại Trung Quốc (MOFCOM) — biên tập thành báo cáo tiếng Việt dễ hiểu, có chart và actionable insights cho buyer.",
      "Huayue tập trung vào 3 báo cáo theo 3 ngành kinh doanh chính: <b>(1) Vật liệu xây dựng</b> — giá gạch porcelain, sanitary, đá tự nhiên, thép xây dựng từ các cluster Phật Sơn, Triều Châu, Tấn Giang, Phúc Kiến. <b>(2) Vật liệu trang trí nội thất</b> — giá sofa, tủ bếp, sàn gỗ, đá ốp lát, MDF/HDF từ Lecong, Đông Quan, Trung Sơn. <b>(3) Đồ điện gia dụng nhà bếp & phòng tắm</b> — giá bình nóng lạnh, bếp gas, máy hút mùi, nắp bồn cầu thông minh từ Trung Sơn, Mỹ Đích. Mỗi ngành phát hành 4-6 báo cáo/năm (báo cáo tháng + báo cáo quý + Annual). Mỗi báo cáo dài 15-40 trang, có bản tiếng Việt và bản tiếng Trung (cho đội sourcing Quảng Châu).",
      "Nội dung báo cáo mỗi tháng gồm: (a) Biến động giá nhà máy 3 ngành — so với tháng trước và cùng kỳ năm trước, dữ liệu lấy từ chính các nhà máy đối tác Huayue (anonymized aggregate). (b) Tỷ giá CNY/VND/USD — diễn biến tuần, dự báo ngắn hạn 1-2 tháng. (c) Giá nguyên liệu chính — đất sét gốm, gỗ MDF/HDF, thép cuộn, đồng, nhôm — lấy từ SHFE và các sàn liên quan. (d) Chính sách thuế xuất nhập khẩu — cập nhật ưu đãi ACFTA/RCEP cho HS code 3 ngành, alerts khi có thay đổi từ Tổng cục Hải quan VN hoặc GACC. (e) Tin tức ngành — nhà máy mới mở, công nghệ mới (mạ nano, gốm 600×1200, đèn LED COB), trade fair sắp đến. (f) Khuyến nghị cho buyer — thời điểm tốt để đặt hàng (nguyên liệu xuống), thời điểm chuẩn bị tăng giá (chính sách thuế mới).",
      "Phương pháp luận: triple-source validation — mọi số liệu critical có ít nhất 3 nguồn độc lập đồng thuận. Dữ liệu giá nhà máy: tổng hợp từ 20+ NCC đối tác Huayue (anonymized, chỉ aggregate) + crawl giá public từ 1688.com và Made-in-China.com + báo cáo từ hiệp hội ngành Quảng Đông (Foshan Chamber, Guangdong Federation). Tỷ giá: tỷ giá liên ngân hàng tham chiếu, PBOC fix rate, Reuters spot. Nguyên liệu: SHFE Shanghai Futures (thép, đồng, nhôm), Bloomberg cho dầu mỏ. Chính sách: Tổng cục Hải quan VN, GACC, MOFCOM, Bộ Tài chính VN. Đội ngũ biên tập: đội sourcing Quảng Châu (am hiểu nhà máy) + đội Hà Nội (am hiểu thị trường VN) + 1 chuyên gia kinh tế đối ngoại tư vấn cố định.",
      "Cách truy cập báo cáo: Báo cáo Market Intelligence của Huayue là <b>miễn phí cho mọi buyer đang mua hàng từ Huayue</b> (giá trị bổ sung của partnership). Đăng nhập tài khoản tại huayuesc.vn → Buyer Center → Tab 'Market Reports'. Đối tác phân phối ký hợp đồng partnership được nhận báo cáo + bản phân tích cho khu vực kinh doanh của mình. Khách hàng tiềm năng (chưa giao dịch): xem được Weekly Pulse (4-6 trang/tuần, free). Liên hệ research@huayuesc.vn hoặc sales@huayuesc.vn để nhận sample báo cáo gần nhất.",
    ],
    pullQuote: {
      text: "Quyết định sourcing $50,000 không thể dựa vào cảm tính hay 1 báo giá đơn lẻ. Huayue cung cấp dữ liệu để buyer Việt Nam đàm phán ngang hàng với nhà máy Trung Quốc — đó là cốt lõi của thương mại công bằng.",
      author: "Đội Research — Huayue Việt Nam",
    },
    checklist: [
      "📅 12-18 báo cáo/năm cho 3 ngành Huayue tập trung",
      "🏭 Cluster cover: Phật Sơn · Lecong · Đông Quan · Trung Sơn · Tấn Giang",
      "💰 Miễn phí cho buyer mua hàng và đối tác phân phối Huayue",
      "✅ Triple-source validation — số liệu kiểm chứng từ ≥3 nguồn",
      "🔔 Alerts theo HS code khi có thay đổi thuế hoặc chính sách",
      "🌐 Bản tiếng Việt + bản tiếng Trung (cho đội sourcing)",
    ],
    faq: [
      {
        q: "Báo cáo của Huayue có dịch tiếng Anh không?",
        a: "Hiện tại Huayue chỉ xuất bản tiếng Việt và tiếng Trung. Buyer cần bản tiếng Anh cho đối tác/đầu tư nước ngoài có thể gửi email research@huayuesc.vn để yêu cầu — đội Research dịch bằng tay cho yêu cầu cụ thể.",
      },
      {
        q: "Tôi không phải buyer của Huayue — có xem được báo cáo không?",
        a: "Có. Weekly Pulse (4-6 trang/tuần) miễn phí cho mọi đăng ký newsletter. Báo cáo tháng và quý đầy đủ chỉ dành cho buyer đang giao dịch hoặc đối tác phân phối — đây là giá trị bổ sung của việc làm việc với Huayue, không phải sản phẩm thương mại riêng.",
      },
      {
        q: "Dữ liệu có cập nhật realtime không?",
        a: "Báo cáo PDF cập nhật theo nhịp (tuần/tháng). Tỷ giá CNY/VND và một số chỉ số chính được Huayue tự động cập nhật hàng ngày trên Buyer Center dashboard. Thông tin gấp/khẩn cấp (ví dụ thay đổi thuế đột ngột) được gửi qua email + Zalo cho buyer active.",
      },
      {
        q: "Báo cáo có chia sẻ giá nhà máy cụ thể (theo tên) không?",
        a: "Không. Huayue chỉ aggregate (ví dụ 'top 10 nhà máy gạch porcelain Phật Sơn có giá trung bình $X/m², range $Y-Z'). Nếu buyer muốn quote cụ thể từ một nhà máy nào, vui lòng dùng RFQ trên huayuesc.vn hoặc liên hệ sourcing manager — đó là kênh chính thức và minh bạch.",
      },
      {
        q: "Tôi đã đăng ký Weekly Pulse nhưng không nhận email?",
        a: "Email từ research@huayuesc.vn có thể vào Spam/Promotions. Whitelist domain. Nếu vẫn không nhận, liên hệ support@huayuesc.vn — chúng tôi gửi lại link đăng nhập để bạn xem trên web.",
      },
    ],
    related: [
      { label: "Tin tức ngành (blog)", href: "/info/industry-news" },
      { label: "Đăng ký Cảnh báo Thương mại", href: "/trade-alert" },
      { label: "Mạng lưới kết nối hiệp hội", href: "/info/network" },
      { label: "Liên hệ Research team", href: "/info/contact" },
    ],
    primaryCta: { label: "Xem mẫu Weekly Pulse miễn phí", href: "/info/industry-news" },
  },
  "api-integration": {
    title: "Tích hợp API — REST API & Webhook cho doanh nghiệp",
    intro:
      "Huayue đang phát triển REST API + Webhook để buyer doanh nghiệp lớn tích hợp đơn hàng Huayue trực tiếp vào ERP nội bộ (Misa, Bravo, FAST, SAP B1, Oracle NetSuite) — đẩy đơn về kế toán, đồng bộ kho, issue hoá đơn điện tử theo NĐ 123/2020. Dự kiến ra mắt phiên bản đầu Q4 2026. Đăng ký early access miễn phí 6 tháng tại partnership@huayuesc.vn.",
    icon: "⚙️",
    category: "TÍCH HỢP HỆ THỐNG",
    quickFacts: [
      { label: "Trạng thái", value: "Đang phát triển — Coming Q4 2026" },
      { label: "Use case chính", value: "ERP integration cho buyer doanh nghiệp" },
      { label: "Mục tiêu", value: "Đồng bộ đơn hàng Huayue ↔ ERP của buyer" },
      { label: "Đăng ký sớm", value: "partnership@huayuesc.vn" },
    ],
    sectionTitles: [
      "Roadmap tích hợp ERP & Webhook",
      "Use case sẽ hỗ trợ",
      "Đăng ký nhận thông báo khi ra mắt",
    ],
    paragraphs: [
      "Hiện tại Huayue làm việc với buyer Việt Nam chủ yếu qua website, email và hotline. Tuy nhiên với các doanh nghiệp lớn (đại lý phân phối, nhà thầu xây dựng, công ty thiết kế nội thất quy mô) đã có ERP nội bộ — Misa, Bravo, FAST, AccNet, SAP B1, hoặc Oracle NetSuite — việc nhập tay từ Huayue sang ERP để issue hoá đơn điện tử (theo NĐ 123/2020/NĐ-CP), đồng bộ kho hàng, hay pull đơn hàng về để trigger workflow nội bộ tốn 20-40 giờ admin/tháng. Huayue đang xây dựng REST API + Webhook để giải quyết vấn đề này.",
      "Use case sẽ được hỗ trợ trong phiên bản API đầu tiên (dự kiến Q4 2026): (a) Pull đơn hàng từ Huayue về ERP của buyer (tự động trigger PO nội bộ, kế toán, issue VAT invoice). (b) Push trạng thái đơn từ Huayue (sản xuất → đóng container → cập cảng → thông quan → giao kho) về dashboard ERP của buyer. (c) Webhook event-driven cho: order.created, order.shipped, order.delivered, dispute.opened, refund.processed. (d) Đồng bộ catalogue và giá DDP đối tác. Tích hợp sẵn cho ERP phổ biến tại Việt Nam: Misa SME, Bravo, FAST Accounting, KiotViet, Sapo, Haravan; SAP B1 và Oracle NetSuite cho doanh nghiệp lớn (Q2 2027).",
      "Đăng ký nhận thông báo khi API ra mắt: gửi email partnership@huayuesc.vn với tiêu đề 'API Integration Interest' kèm thông tin: tên doanh nghiệp, ngành kinh doanh, ERP đang dùng, số đơn dự kiến/tháng. Huayue sẽ ưu tiên cho buyer/đối tác đã giao dịch tham gia chương trình early access (free trong 6 tháng đầu). Hiện tại nếu cần tích hợp gấp, đội Huayue có thể export đơn hàng định kỳ ra Excel/CSV theo lịch (hàng ngày/tuần) gửi email — đây là giải pháp tạm thời cho đến khi API chính thức ra mắt.",
    ],
    pullQuote: {
      text: "Chúng tôi không xây API để chạy theo trend — chúng tôi xây khi đối tác thực sự cần. Ưu tiên hiện tại: làm cho chuỗi cung ứng vật lý chạy tốt trước, tự động hoá phần mềm theo sau.",
      author: "Đội Vận hành — Huayue Việt Nam",
    },
    checklist: [
      "🛠 API REST & Webhook đang trong roadmap — dự kiến Q4 2026",
      "🎯 Mục tiêu: tích hợp ERP của buyer doanh nghiệp (Misa, Bravo, FAST, SAP B1...)",
      "📥 Đăng ký early access miễn phí 6 tháng: partnership@huayuesc.vn",
      "📊 Giải pháp tạm thời: export đơn hàng định kỳ ra Excel/CSV qua email",
      "🆓 Free tier cho buyer/đối tác phân phối đang giao dịch với Huayue",
    ],
    faq: [
      {
        q: "Tôi đang dùng Misa/Bravo/FAST — Huayue hỗ trợ tích hợp tự động khi nào?",
        a: "Connector cho Misa SME, Bravo, FAST Accounting nằm trong wave đầu tiên của API release Q4 2026. Hiện tại nếu khẩn cấp, đội kỹ thuật Huayue có thể export đơn hàng ra Excel/CSV theo lịch tuỳ chỉnh (hàng ngày/tuần) gửi qua email — bạn import thủ công vào ERP. Gửi yêu cầu qua support@huayuesc.vn.",
      },
      {
        q: "Khi nào tôi nên cân nhắc tích hợp API?",
        a: "Nếu doanh nghiệp bạn xử lý >50 đơn/tháng từ Huayue, hoặc cần issue hoá đơn điện tử trong 24h theo NĐ 123/2020, hoặc đang quản trị kho qua WMS riêng — tích hợp API tiết kiệm 20-40 giờ admin/tháng. Doanh nghiệp nhỏ hơn nên dùng web dashboard.",
      },
      {
        q: "Có chi phí gì cho API không?",
        a: "Huayue đang thiết kế model pricing. Buyer và đối tác phân phối đang giao dịch sẽ được miễn phí 6 tháng đầu (early access). Sau đó dự kiến free tier cho ≤1,000 calls/ngày, paid tier cho enterprise. Chi tiết công bố khi API ra mắt.",
      },
    ],
    related: [
      { label: "Bảo đảm Giao dịch", href: "/info/trade-assurance" },
      { label: "Theo dõi đơn realtime", href: "/info/order-tracking" },
      { label: "Liên hệ Partnership", href: "/info/contact" },
    ],
    primaryCta: { label: "Đăng ký nhận thông báo khi API ra mắt", href: "mailto:partnership@huayuesc.vn?subject=API%20Integration%20Interest" },
  },
  "locale": {
    title: "Ngôn ngữ & Tiền tệ",
    intro: "Huayuesc hỗ trợ tiếng Việt (mặc định) và tiếng Anh. Tiền tệ: VND, USD.",
    paragraphs: [
      "Tiếng Việt là ngôn ngữ chính. Tiếng Anh dành cho người mua quốc tế quan tâm thị trường VN.",
      "Tiền tệ hiển thị theo lựa chọn: VND (mặc định), USD. Tỷ giá cập nhật theo liên ngân hàng tham chiếu realtime.",
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
      title: `Huayuesc trên ${name}`,
      intro: `Theo dõi Huayuesc trên ${name} để cập nhật sản phẩm mới, ưu đãi và tin tức ngành.`,
      paragraphs: [
        `Kênh ${name} chính thức của Huayuesc cập nhật nội dung mỗi ngày: video factory tour, livestream Canton Fair, hướng dẫn sourcing, story dealer thành công.`,
        `Tham gia cộng đồng 50,000+ buyer Việt Nam quan tâm đến nhập khẩu B2B từ Trung Quốc.`,
      ],
      related: [{ label: "Đăng ký Cảnh báo Thương mại", href: "/trade-alert" }],
    };
  }
  return {
    title: topic.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" "),
    intro: "Trang nội dung này đang được hoàn thiện.",
    paragraphs: [
      "Đội ngũ Huayuesc đang biên tập nội dung chi tiết cho chủ đề này. Vui lòng quay lại sau hoặc gửi yêu cầu cụ thể qua RFQ.",
      "Trong lúc chờ, bạn có thể duyệt sản phẩm theo danh mục hoặc gửi yêu cầu báo giá để được hỗ trợ trực tiếp.",
    ],
    related: [
      { label: "Duyệt sản phẩm", href: "/products" },
      { label: "Gửi RFQ", href: "/buying-request" },
      { label: "Trung tâm trợ giúp", href: "/help" },
    ],
  };
}

/* Build a slug-friendly anchor id from a section heading. */
function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const td = await getTd();
  const t = tdDeep(getTopic(topic), td);
  const tr = await getT();

  // Pair section titles with paragraphs (1:1, with title=null meaning no header)
  const sections = t.paragraphs.map((p, i) => ({
    title: t.sectionTitles?.[i] ?? null,
    paragraph: p,
    id: slugify(t.sectionTitles?.[i] ?? `phan-${i + 1}`),
  }));
  const tocItems = sections.filter((s) => s.title);

  return (
    <>
      <Breadcrumb
        trail={[
          { label: tr("info_topic.breadcrumb_home"), href: "/" },
          { label: tr("info_topic.breadcrumb_info"), href: "/help" },
          { label: t.title },
        ]}
      />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
      >
        <div className="max-w-[1100px] mx-auto px-4 py-10 max-md:py-7 grid grid-cols-[auto_1fr] gap-6 items-center max-md:grid-cols-1 max-md:gap-3">
          <div className="w-20 h-20 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-[40px] flex-shrink-0 max-md:w-14 max-md:h-14 max-md:text-[28px]">
            {t.icon || "📄"}
          </div>
          <div>
            {t.category && (
              <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2.5">
                {t.category}
              </span>
            )}
            <h1 className="text-[32px] font-extrabold leading-tight mb-2 max-md:text-[22px]">
              {t.title}
            </h1>
            <p className="text-[14px] opacity-90 leading-relaxed max-w-[680px] max-md:text-[12.5px]">
              {t.intro}
            </p>
          </div>
        </div>
        {/* Quick facts strip */}
        {t.quickFacts && t.quickFacts.length > 0 && (
          <div className="border-t border-white/10 bg-black/15">
            <div className="max-w-[1100px] mx-auto px-4 py-3 grid grid-cols-6 gap-3 text-center max-md:grid-cols-3 max-md:gap-2 max-md:py-2.5">
              {t.quickFacts.map((f) => (
                <div key={f.label} className="border-r border-white/15 last:border-r-0 max-md:border-r-0">
                  <b className="block text-[15px] text-gold leading-tight max-md:text-[13px]">{f.value}</b>
                  <small className="text-[10.5px] opacity-75 uppercase tracking-wider max-md:text-[10px]">{f.label}</small>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* === BODY: article + sticky sidebar ================================ */}
      <div className="max-w-[1100px] mx-auto px-4 mt-6 mb-10 grid grid-cols-[1fr_280px] gap-7 max-lg:grid-cols-1 max-md:mt-4 max-md:mb-7">
        {/* === Article column =========================================== */}
        <article className="bg-paper border border-line rounded p-7 max-md:p-4">
          {/* Sections */}
          {sections.map((s, i) => (
            <div key={i} className={i > 0 ? "mt-6" : ""}>
              {s.title && (
                <h2 id={s.id} className="text-[19px] font-bold text-ink mb-3 pb-2 border-b border-line scroll-mt-20 max-md:text-[16px]">
                  {s.title}
                </h2>
              )}
              {/* Smart paragraph renderer — detects inline lists and breaks
                  them into <ul>. Falls back to a plain <p> when no list
                  patterns are found. */}
              <Fragment>
                <RenderParagraph text={s.paragraph} />
              </Fragment>

              {/* Pull-quote after first section */}
              {i === 0 && t.pullQuote && (
                <blockquote className="my-6 border-l-4 border-gold pl-5 py-2 italic text-[16px] text-ink leading-relaxed max-md:text-[14.5px]">
                  &ldquo;{t.pullQuote.text}&rdquo;
                  {t.pullQuote.author && (
                    <footer className="mt-2 text-[12.5px] text-mute not-italic">— {t.pullQuote.author}</footer>
                  )}
                </blockquote>
              )}
            </div>
          ))}

          {/* Checklist */}
          {t.checklist && t.checklist.length > 0 && (
            <div className="mt-7 bg-bg border-l-4 border-brand rounded-r p-5 max-md:p-3.5">
              <b className="block text-[14px] text-ink mb-3">✨ {tr("info_topic.commitment_title")}</b>
              <ul className="space-y-2">
                {t.checklist.map((c, i) => (
                  <li key={i} className="flex gap-2.5 text-[13.5px] text-ink leading-relaxed">
                    <span className="text-success font-bold flex-shrink-0">✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ */}
          {t.faq && t.faq.length > 0 && (
            <div className="mt-8 pt-6 border-t-2 border-line">
              <h2 className="text-[19px] font-bold text-ink mb-4 max-md:text-[16px]">❓ {tr("info_topic.faq_title")}</h2>
              <div className="space-y-2">
                {t.faq.map((q, i) => (
                  <details key={i} {...(i === 0 ? { open: true } : {})} className="border border-line rounded group/faq">
                    <summary className="px-4 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden flex justify-between items-center hover:bg-bg">
                      <b className="text-[13.5px] text-ink leading-snug">{q.q}</b>
                      <span className="text-mute2 text-[14px] group-open/faq:rotate-180 transition-transform flex-shrink-0 ml-3">▾</span>
                    </summary>
                    <p className="px-4 pb-4 pt-3 text-[13px] text-mute leading-relaxed border-t border-line">{q.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA card */}
          <div
            className="mt-8 rounded p-6 text-white max-md:p-4"
            style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
          >
            <div className="grid grid-cols-[1fr_auto] gap-4 items-center max-md:grid-cols-1">
              <div>
                <b className="block text-[16px] mb-1">{tr("info_topic.cta_ready_title")}</b>
                <p className="text-[12.5px] opacity-85 leading-snug">
                  {tr("info_topic.cta_desc")}
                </p>
              </div>
              <div className="flex gap-2 max-md:flex-col">
                <Link
                  href={t.primaryCta?.href || "/buying-request"}
                  className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm font-bold text-[13px] hover:bg-[#E8943A] cursor-pointer text-center inline-block whitespace-nowrap"
                >
                  📩 {t.primaryCta?.label || tr("info_topic.cta_primary_fallback")}
                </Link>
                <Link
                  href="/help"
                  className="px-5 py-2.5 border-2 border-white/40 text-white rounded-sm font-bold text-[13px] hover:bg-white/10 cursor-pointer text-center inline-block whitespace-nowrap"
                >
                  💬 {tr("info_topic.help")}
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* === Sticky sidebar =========================================== */}
        <aside className="space-y-4 max-lg:hidden">
          <div className="bg-paper border border-line rounded p-4 sticky top-[5rem]">
            {tocItems.length > 0 && (
              <>
                <b className="block text-[12px] uppercase tracking-wider text-mute font-bold mb-2.5">
                  📑 {tr("info_topic.toc")}
                </b>
                <ul className="space-y-1.5 mb-4 pb-4 border-b border-line">
                  {tocItems.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-[12.5px] text-ink hover:text-brand cursor-pointer block py-0.5"
                      >
                        → {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <b className="block text-[12px] uppercase tracking-wider text-mute font-bold mb-2.5">
              🔗 {tr("info_topic.related_links")}
            </b>
            <ul className="space-y-1.5">
              {(t.related && t.related.length > 0
                ? t.related
                : [
                    { label: "Trung tâm trợ giúp", href: "/help" },
                    { label: "Liên hệ", href: "/info/contact" },
                  ]
              ).map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-[12.5px] text-brand hover:underline cursor-pointer block py-0.5">
                    → {r.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/buying-request"
              className="mt-4 block text-center py-2 bg-accent text-white rounded-sm font-bold text-[12.5px] cursor-pointer hover:opacity-90"
            >
              🚀 {tr("info_topic.send_rfq")}
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const td = await getTd();
  const t = tdDeep(getTopic(topic), td);
  const tr = await getT();
  return { title: `${t.title} — Huayuesc` };
}
