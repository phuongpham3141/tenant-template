import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

export default function RegisterFactoryPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Sell on AVN", href: "/sell-on-avn" }, { label: "Đăng ký nhà máy" }]} />
      <div className="max-w-[1100px] mx-auto px-4 mt-6 mb-10 grid grid-cols-[1fr_320px] gap-6 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-6">
          <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">🏭 SUPPLIER REGISTRATION</span>
          <h1 className="text-[24px] font-extrabold text-ink mb-1">Đăng ký nhà máy trên AlibabaVN</h1>
          <p className="text-[13px] text-mute mb-5">Free đăng ký và audit. Trung bình 30 ngày để go-live.</p>

          <form action="/sell-on-avn" method="get" className="space-y-4">
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              <div className="col-span-2">
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Tên công ty / 公司名称 <span className="text-accent">*</span></label>
                <input name="company" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Năm thành lập <span className="text-accent">*</span></label>
                <input name="founded" type="number" placeholder="Vd: 2010" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Tỉnh / Thành <span className="text-accent">*</span></label>
                <select name="province" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                  <option value="">-- Chọn tỉnh --</option>
                  <option>Foshan, Guangdong</option>
                  <option>Guangzhou, Guangdong</option>
                  <option>Shenzhen, Guangdong</option>
                  <option>Dongguan, Guangdong</option>
                  <option>Hangzhou, Zhejiang</option>
                  <option>Taizhou, Zhejiang</option>
                  <option>Shanghai</option>
                  <option>Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Diện tích nhà máy (m²)</label>
                <input name="area" type="number" placeholder="Vd: 50000" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Số nhân viên</label>
                <select name="employees" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                  <option>&lt; 100</option>
                  <option>100 – 500</option>
                  <option>500 – 2000</option>
                  <option>&gt; 2000</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Sản phẩm chính (chọn nhiều)</label>
                <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2">
                  {NAV_CATEGORIES.map((c) => (
                    <label key={c.slug} className="flex items-center gap-1.5 text-[12px] text-mute cursor-pointer">
                      <input type="checkbox" name="products" value={c.slug} className="accent-brand" /> {c.icon} {c.name}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Năm bắt đầu xuất khẩu</label>
                <input name="exportYear" type="number" placeholder="Vd: 2015" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Kim ngạch / năm (USD)</label>
                <select name="revenue" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                  <option>&lt; $1M</option>
                  <option>$1M – $10M</option>
                  <option>$10M – $50M</option>
                  <option>&gt; $50M</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Email liên hệ <span className="text-accent">*</span></label>
                <input name="email" type="email" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div className="col-span-2">
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Tải hồ sơ năng lực (PDF, brochure)</label>
                <div className="border-2 border-dashed border-line rounded p-4 text-center text-[12.5px] text-mute hover:border-brand cursor-pointer">
                  📎 Click hoặc kéo thả file PDF, ZIP — tối đa 20MB
                </div>
              </div>
            </div>
            <label className="flex items-start gap-2 text-[12px] text-mute mt-4">
              <input type="checkbox" required className="accent-brand mt-0.5" />
              <span>Đồng ý cho AlibabaVN thực hiện audit on-site và đồng ý <Link href="/info/dieu-khoan" className="text-brand">Điều khoản NCC</Link>.</span>
            </label>
            <button type="submit" className="w-full py-3 bg-brand text-white rounded-sm font-bold text-[14px] hover:bg-brand-light mt-3">Gửi đăng ký nhà máy →</button>
          </form>
        </div>

        <aside className="bg-paper border border-line rounded p-5 self-start space-y-4">
          <div>
            <b className="block text-[14px] font-bold text-ink mb-3">Tiếp theo là gì?</b>
            <ol className="text-[12px] text-ink space-y-2 list-decimal list-inside">
              <li>Đội audit tại Quảng Châu liên hệ trong 48h</li>
              <li>Lịch audit on-site (free, 1 ngày)</li>
              <li>Báo cáo audit + tier đề xuất</li>
              <li>Onboarding listing + training 1-on-1</li>
              <li>Go-live, nhận RFQ đầu tiên</li>
            </ol>
          </div>
          <div className="pt-4 border-t border-line">
            <b className="block text-[13px] text-ink mb-2">Cần hỗ trợ?</b>
            <p className="text-[11.5px] text-mute leading-relaxed">📞 +86 20 1234 5678 (Quảng Châu, tiếng Trung)<br />📧 supplier@alibabavn.com</p>
          </div>
        </aside>
      </div>
    </>
  );
}

export const metadata = { title: "Đăng ký nhà máy — AlibabaVN" };
