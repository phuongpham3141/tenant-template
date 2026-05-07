import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

export default function RegisterDealerPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Đăng ký Dealer" }]} />
      <div className="max-w-[1100px] mx-auto px-4 mt-6 mb-10 grid grid-cols-[1fr_320px] gap-6 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-6">
          <span className="inline-block bg-accent text-white px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">🎁 ƯU ĐÃI DEALER MỚI</span>
          <h1 className="text-[24px] font-extrabold text-ink mb-1">Đăng ký Dealer — Nhận 3 ưu đãi đặc biệt</h1>
          <p className="text-[13px] text-mute mb-5">Chương trình giới hạn cho 100 dealer đầu tiên Q1/2026. Đăng ký miễn phí.</p>

          <div className="grid grid-cols-3 gap-3 mb-5 max-md:grid-cols-1">
            {[
              { icon: "🏭", t: "Audit miễn phí", d: "1 lần audit on-site nhà máy bạn chọn (giá trị $400)" },
              { icon: "💰", t: "Giảm 10% đơn đầu", d: "Áp dụng cho đơn $5K+ từ NCC trong nền tảng" },
              { icon: "🚚", t: "Free DDP", d: "Miễn cước DDP đơn đầu (tối đa $300)" },
            ].map((p) => (
              <div key={p.t} className="border border-line rounded p-3 bg-[#FFF7E6]">
                <div className="text-[26px] mb-1">{p.icon}</div>
                <b className="block text-[13px] text-ink mb-1">{p.t}</b>
                <p className="text-[11.5px] text-mute leading-snug">{p.d}</p>
              </div>
            ))}
          </div>

          <form action="/buyer-center" method="get" className="space-y-4">
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Họ tên <span className="text-accent">*</span></label>
                <input name="name" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Công ty <span className="text-accent">*</span></label>
                <input name="company" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Email <span className="text-accent">*</span></label>
                <input name="email" type="email" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Điện thoại / Zalo <span className="text-accent">*</span></label>
                <input name="phone" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Mã số thuế</label>
                <input name="tax" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Doanh thu / năm</label>
                <select name="revenue" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                  <option>Dưới 1 tỷ</option>
                  <option>1 – 5 tỷ</option>
                  <option>5 – 20 tỷ</option>
                  <option>Trên 20 tỷ</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Ngành kinh doanh</label>
                <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2">
                  {NAV_CATEGORIES.slice(0, 9).map((c) => (
                    <label key={c.slug} className="flex items-center gap-1.5 text-[12px] text-mute cursor-pointer">
                      <input type="checkbox" name="industry" value={c.slug} className="accent-brand" /> {c.icon} {c.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <label className="flex items-start gap-2 text-[12px] text-mute mt-4">
              <input type="checkbox" required className="accent-brand mt-0.5" />
              <span>Đồng ý <Link href="/info/dieu-khoan" className="text-brand">Điều khoản</Link> và sử dụng audit miễn phí trong 90 ngày.</span>
            </label>
            <button type="submit" className="w-full py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90 mt-3">Đăng ký Dealer & Nhận ưu đãi →</button>
          </form>
        </div>

        <aside className="bg-paper border border-line rounded p-5 self-start">
          <b className="block text-[14px] font-bold text-ink mb-3">🎯 Dealer khác nói gì</b>
          <div className="space-y-3 text-[12px] text-ink">
            <div className="border-l-2 border-gold pl-3">
              <p className="leading-relaxed">&ldquo;Audit miễn phí giúp tôi tránh được 1 NCC fake — giá trị hơn $400 thực tế.&rdquo;</p>
              <span className="text-[11px] text-mute mt-1 block">— Trần Quang Hưng, VLXD Phương Nam</span>
            </div>
            <div className="border-l-2 border-gold pl-3">
              <p className="leading-relaxed">&ldquo;DDP free và giảm 10% đơn đầu đã tiết kiệm cho tôi 22 triệu cho lô đầu.&rdquo;</p>
              <span className="text-[11px] text-mute mt-1 block">— Lê Thu Hằng, Showroom Sài Gòn</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export const metadata = { title: "Đăng ký Dealer — AlibabaVN" };
