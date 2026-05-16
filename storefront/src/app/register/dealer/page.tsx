import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { DealerRegisterForm } from "./DealerRegisterForm";

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
              { icon: "🏭", t: "Kiểm định miễn phí", d: "1 lần kiểm định tại chỗ nhà máy bạn chọn (giá trị $400)" },
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

          <DealerRegisterForm />
          <p className="text-[11.5px] text-mute text-center mt-3">Đã có tài khoản? <a href="/login" className="text-brand font-semibold hover:underline">Đăng nhập</a></p>
        </div>

        <aside className="bg-paper border border-line rounded p-5 self-start">
          <b className="block text-[14px] font-bold text-ink mb-3">🎯 Dealer khác nói gì</b>
          <div className="space-y-3 text-[12px] text-ink">
            <div className="border-l-2 border-gold pl-3">
              <p className="leading-relaxed">&ldquo;Kiểm định miễn phí giúp tôi tránh được 1 NCC giả mạo — giá trị hơn $400 thực tế.&rdquo;</p>
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

export const metadata = { title: "Đăng ký Dealer — Cybersilkroads" };
