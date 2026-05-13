import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

const RECENT_RFQS = [
  { id: "RFQ-8421", title: "Porcelain tile 600x1200 cho dự án 2,000m²", time: "12 phút trước", quotes: 7 },
  { id: "RFQ-8417", title: "Sofa L-shape velvet cho showroom HCM", time: "45 phút trước", quotes: 5 },
  { id: "RFQ-8412", title: "Smart toilet hotel 4-sao, MOQ 80pc", time: "2 giờ trước", quotes: 9 },
  { id: "RFQ-8408", title: "LED downlight 12W, 1000pc", time: "3 giờ trước", quotes: 12 },
  { id: "RFQ-8401", title: "Kitchen cabinet OEM bản vẽ riêng", time: "5 giờ trước", quotes: 4 },
];

export default async function BuyingRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; qty?: string; desc?: string }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Yêu cầu báo giá" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[180px] bg-brand-dark">
          <img src="/img/rfq-hero.jpg?v=3" alt="" className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 px-8 py-6 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
            <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📨 RFQ — REQUEST FOR QUOTATION</span>
            <h1 className="text-[30px] font-extrabold leading-tight max-md:text-[22px]">Gửi yêu cầu — Nhận báo giá trong 24h</h1>
            <p className="text-[13.5px] opacity-90 mt-1">Mô tả 1 lần — gửi đến 5-10 nhà máy phù hợp. Báo giá kèm sample, thời gian giao, DDP về VN.</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-5 grid grid-cols-[1fr_340px] gap-5 max-md:grid-cols-1 mb-7">
        {/* Form */}
        <form action="/buying-request" method="get" className="bg-paper border border-line rounded p-5">
          <h2 className="text-[18px] font-bold text-ink mb-4">Form yêu cầu báo giá</h2>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Sản phẩm cần tìm <span className="text-accent">*</span></label>
              <input name="q" defaultValue={sp.q ?? ""} placeholder="Vd: gạch porcelain 600x1200 calacatta white" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Danh mục</label>
              <select name="category" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                <option value="">-- Chọn danh mục --</option>
                {NAV_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Số lượng + đơn vị <span className="text-accent">*</span></label>
              <input name="qty" defaultValue={sp.qty ?? ""} placeholder="Vd: 500 m² hoặc 30 set" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
            </div>
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Mô tả chi tiết</label>
              <textarea name="desc" defaultValue={sp.desc ?? ""} rows={5} placeholder="Mô tả sản phẩm: kích thước, màu sắc, vật liệu, tiêu chuẩn, thời hạn..." className="w-full px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand resize-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Ảnh tham khảo</label>
              <div className="border-2 border-dashed border-line rounded p-4 text-center text-[12.5px] text-mute hover:border-brand cursor-pointer">
                📎 Kéo thả ảnh hoặc <a className="text-brand underline">click chọn file</a> — tối đa 5 ảnh, mỗi ảnh dưới 5MB
              </div>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Cảng đích</label>
              <select name="port" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                <option>Cát Lái – HCM</option>
                <option>Hải Phòng – HP</option>
                <option>Đà Nẵng – ĐN</option>
                <option>DDP về kho (khuyến nghị)</option>
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Ngân sách / đơn vị</label>
              <select name="budget" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                <option>Linh hoạt</option>
                <option>Dưới $10</option>
                <option>$10 – $50</option>
                <option>$50 – $200</option>
                <option>Trên $200</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Mức độ khẩn</label>
              <div className="flex gap-3 flex-wrap text-[12.5px]">
                {["Bình thường (24h)", "Nhanh (12h)", "Khẩn (6h)"].map((u, i) => (
                  <label key={u} className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-sm cursor-pointer hover:border-brand">
                    <input type="radio" name="urgency" defaultChecked={i === 0} className="accent-brand" /> {u}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-line flex gap-3 items-center">
            <button type="submit" className="px-7 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90">🚀 Gửi RFQ ngay</button>
            <span className="text-[12px] text-mute">Free · Không cần đăng ký · Báo giá trong 24h</span>
          </div>
          {sp.q && (
            <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded text-[12.5px] text-success">
              ✓ RFQ đã được gửi tới các NCC phù hợp. Chúng tôi sẽ phản hồi qua email trong 24h.
            </div>
          )}
        </form>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[14px] font-bold text-ink mb-3">Quy trình 3 bước</b>
            {[
              { n: 1, t: "Gửi RFQ", d: "Mô tả 1 lần, hệ thống tự match nhà máy phù hợp" },
              { n: 2, t: "Nhận 5-10 báo giá", d: "Trong 24h, kèm sample image, thời gian giao, DDP" },
              { n: 3, t: "Chọn NCC tốt nhất", d: "So sánh, chat trực tiếp, đặt sample, xác nhận đơn" },
            ].map((s) => (
              <div key={s.n} className="flex gap-3 mb-3 last:mb-0">
                <div className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0">{s.n}</div>
                <div>
                  <b className="block text-[13px] text-ink">{s.t}</b>
                  <p className="text-[11.5px] text-mute leading-snug">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-bold text-ink mb-2">🛡 Cam kết Cybersilkroads</b>
            <ul className="text-[12px] text-mute space-y-1.5">
              <li>✓ Báo giá free, không cam kết đặt</li>
              <li>✓ Audit nhà máy miễn phí trước đặt</li>
              <li>✓ Bảo vệ thanh toán Bảo đảm Giao dịch</li>
              <li>✓ Hỗ trợ tiếng Việt 24/7</li>
            </ul>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-bold text-ink mb-2">RFQ gần đây</b>
            <div className="space-y-2.5 text-[11.5px]">
              {RECENT_RFQS.map((r) => (
                <div key={r.id} className="border-b border-dashed border-line pb-2 last:border-0">
                  <div className="flex justify-between text-[10.5px] text-mute mb-0.5">
                    <span>{r.id}</span>
                    <span>{r.time}</span>
                  </div>
                  <b className="block text-[12px] text-ink leading-snug mb-0.5">{r.title}</b>
                  <span className="text-success text-[11px]">✓ {r.quotes} báo giá đã nhận</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export const metadata = { title: "Gửi yêu cầu báo giá — Cybersilkroads" };
