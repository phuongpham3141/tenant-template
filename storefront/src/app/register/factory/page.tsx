import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";
import { LOGIN_PROVIDERS } from "@/components/icons/social";

import { FactoryApplicationForm } from "./FactoryApplicationForm";
const VALUE_PROPS = [
  {
    icon: "📈",
    title: "Tiếp cận 600+ dealer VN",
    desc: "Buyer đã verified, có doanh thu thực, không phải tài khoản fake.",
  },
  {
    icon: "🆓",
    title: "Audit & onboarding free",
    desc: "Đội ngũ tại Quảng Châu đến tận nhà máy audit, làm hồ sơ giùm bạn.",
  },
  {
    icon: "💼",
    title: "0% phí listing",
    desc: "Chỉ trả 5% commission khi có đơn — không có phí ẩn, không thuê bao.",
  },
  {
    icon: "🌐",
    title: "Marketing tiếng Việt",
    desc: "Đội content viết landing page, dịch catalogue, chạy ads tới buyer VN.",
  },
];

const STEPS = [
  { n: 1, title: "Gửi hồ sơ", desc: "Form 5 phút + brochure / catalogue (PDF)" },
  { n: 2, title: "Phỏng vấn online", desc: "Video call 30 phút với QC team — kiểm tra capability" },
  { n: 3, title: "Audit on-site", desc: "Đội tại Quảng Châu đến nhà máy 1 ngày — chụp ảnh, video, tài liệu" },
  { n: 4, title: "Onboarding listing", desc: "Tạo profile + 10 sản phẩm chủ lực, training 1-on-1" },
  { n: 5, title: "Go-live & RFQ đầu tiên", desc: "Trung bình 30 ngày từ ngày gửi hồ sơ" },
];

const FAQ = [
  {
    q: "Tôi có phải trả phí gì không?",
    a: "Không. Đăng ký, audit, onboarding, hosting, marketing — tất cả free. Cybersilkroads chỉ tính 5% commission khi có đơn hàng thành công.",
  },
  {
    q: "Audit mất bao lâu?",
    a: "1 ngày on-site + 3-5 ngày làm báo cáo. Tổng từ lúc đặt lịch đến khi có báo cáo audit khoảng 7-10 ngày.",
  },
  {
    q: "Tôi có cần biết tiếng Việt?",
    a: "Không. Đội tại Quảng Châu nói tiếng Trung và xử lý mọi giao dịch với buyer VN. Bạn chỉ cần tập trung vào sản xuất.",
  },
  {
    q: "Bao nhiêu nhà máy đã go-live?",
    a: "40+ nhà máy verified tính tới Q4/2025, trung bình mỗi quý onboard thêm 8-12 nhà máy.",
  },
];

export default function RegisterFactoryPage() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Bán trên CSR", href: "/sell-on-csr" },
          { label: "Đăng ký nhà máy" },
        ]}
      />
      <div className="max-w-[1200px] mx-auto px-4 mt-6 mb-10">
        {/* HEADER BANNER */}
        <div
          className="rounded text-white px-7 py-6 mb-5 grid grid-cols-[1fr_auto] gap-5 items-center max-md:grid-cols-1 max-md:px-5 max-md:py-4"
          style={{ background: "linear-gradient(135deg, var(--color-brand-dark) 0%, #001F26 100%)" }}
        >
          <div>
            <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2.5">
              🏭 ĐĂNG KÝ NHÀ CUNG CẤP
            </span>
            <h1 className="text-[26px] font-extrabold leading-tight mb-1.5 max-md:text-[22px]">
              Đăng ký nhà máy trên <span className="text-gold">Cybersilkroads</span>
            </h1>
            <p className="text-[13px] opacity-90 leading-relaxed max-w-[680px]">
              Tiếp cận 600+ đại lý Việt Nam đang chủ động tìm nhà cung cấp Trung Quốc.
              Kiểm định tại chỗ miễn phí, onboarding 1-on-1, không phí listing, chỉ trả 5% commission khi có đơn.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-[12px] opacity-90 min-w-[200px]">
            <div className="flex justify-between">
              <span>🏭 Suppliers verified</span>
              <b>40+</b>
            </div>
            <div className="flex justify-between">
              <span>📦 RFQ / tháng</span>
              <b>1,200+</b>
            </div>
            <div className="flex justify-between">
              <span>💰 GMV 2025</span>
              <b>$8.2M</b>
            </div>
            <div className="flex justify-between">
              <span>⏱ Time to go-live</span>
              <b>~30 ngày</b>
            </div>
          </div>
        </div>

        {/* VALUE PROPS */}
        <div className="grid grid-cols-4 gap-3 mb-5 max-md:grid-cols-2">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className="bg-paper border border-line rounded p-3.5">
              <div className="text-[26px] mb-1.5">{v.icon}</div>
              <b className="block text-[13px] text-ink mb-1">{v.title}</b>
              <p className="text-[11.5px] text-mute leading-snug">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_320px] gap-6 max-md:grid-cols-1">
          {/* === LEFT: form ============================================== */}
          <div className="bg-paper border border-line rounded p-6 max-md:p-4">
            {/* Quick OAuth signup */}
            <div className="mb-5">
              <p className="text-[12.5px] text-mute mb-2.5">
                ⚡ Bắt đầu nhanh với tài khoản công ty:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {LOGIN_PROVIDERS.map((p) => (
                  <Link
                    key={p.name}
                    href={`/register/oauth/${p.name.toLowerCase()}?role=supplier`}
                    className="flex items-center justify-center gap-2 py-2.5 border border-line rounded-sm text-[12.5px] font-semibold text-ink cursor-pointer hover:border-brand hover:bg-bg"
                    aria-label={`Đăng ký với ${p.name}`}
                  >
                    <span className="flex-shrink-0">{p.icon}</span>
                    <span>{p.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-line" />
              <span className="text-[10.5px] text-mute2 uppercase tracking-wider">
                Hoặc điền hồ sơ chi tiết
              </span>
              <div className="flex-1 h-px bg-line" />
            </div>

            <FactoryApplicationForm />
          </div>

          {/* === RIGHT: side info ======================================== */}
          <aside className="space-y-4 self-start">
            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[14px] font-bold text-ink mb-3">📋 Quy trình 5 bước</b>
              <ol className="space-y-3">
                {STEPS.map((s) => (
                  <li key={s.n} className="flex gap-2.5">
                    <span className="w-6 h-6 flex-shrink-0 rounded-full bg-brand text-white text-[12px] font-bold flex items-center justify-center">
                      {s.n}
                    </span>
                    <div>
                      <b className="block text-[12.5px] text-ink">{s.title}</b>
                      <p className="text-[11px] text-mute leading-snug">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[14px] font-bold text-ink mb-3">❓ FAQ ngắn</b>
              <div className="space-y-3">
                {FAQ.map((f) => (
                  <details key={f.q} className="group">
                    <summary className="flex justify-between items-start gap-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <b className="text-[12.5px] text-ink leading-snug">{f.q}</b>
                      <span className="text-mute text-[11px] group-open:rotate-180 transition-transform flex-shrink-0">
                        ▾
                      </span>
                    </summary>
                    <p className="text-[11.5px] text-mute leading-relaxed mt-1.5">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div
              className="rounded p-4 text-white"
              style={{ background: "linear-gradient(135deg,var(--color-brand),var(--color-brand-dark))" }}
            >
              <b className="block text-[14px] font-bold mb-1">💬 Cần tư vấn trước?</b>
              <p className="text-[11.5px] opacity-90 leading-snug mb-2.5">
                Đội tại Quảng Châu sẵn sàng video call (tiếng Trung).
              </p>
              <div className="text-[11.5px] opacity-90 space-y-1">
                <div>📞 +86 20 1234 5678</div>
                <div>📧 supplier@alibabavn.com</div>
                <div>💬 WeChat: alibabavn_sup</div>
              </div>
            </div>

            <div className="bg-paper border border-line rounded p-4">
              <b className="block text-[12.5px] text-ink mb-1">🛍 Bạn là người mua?</b>
              <p className="text-[11.5px] text-mute leading-snug mb-2">
                Đăng ký Người mua để gửi RFQ và nhận audit miễn phí.
              </p>
              <Link
                href="/register/buyer"
                className="text-[12px] text-brand font-semibold cursor-pointer hover:underline"
              >
                Đăng ký Người mua →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Đăng ký nhà máy — Cybersilkroads" };
