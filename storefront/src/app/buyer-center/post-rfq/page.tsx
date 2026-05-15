import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { NAV_CATEGORIES } from "@/data/home";
import { submitRfqForm } from "./action";

const TIPS = [
  { icon: "📐", t: "Mô tả kỹ thông số kỹ thuật", d: "Kích thước, vật liệu, màu, trọng lượng — càng cụ thể, báo giá càng chính xác." },
  { icon: "🖼", t: "Đính kèm ảnh tham khảo", d: "1 ảnh đáng giá 1.000 chữ — NCC sẽ hiểu nhanh hơn 10x." },
  { icon: "📅", t: "Ghi rõ thời hạn", d: "Có thời hạn cụ thể (vd: nhận hàng trước 15/06) giúp NCC từ chối sớm nếu không kịp." },
  { icon: "💵", t: "Cho khoảng ngân sách", d: "Báo trước budget giúp NCC chọn đúng phân khúc — tránh báo giá quá cao/thấp lệch lạc." },
];

export default async function PostRfqPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; qty?: string; desc?: string }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực người mua", href: "/buyer-center" }, { label: "Đăng yêu cầu báo giá" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/post-rfq" />
        <div>
          <div className="bg-brand-dark text-white rounded p-5 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📨 RFQ — REQUEST FOR QUOTATION</div>
            <h1 className="text-[22px] font-bold leading-tight">Đăng yêu cầu báo giá</h1>
            <p className="text-[13px] opacity-90 mt-2 leading-relaxed">
              Mô tả 1 lần — gửi đến 5–10 nhà máy phù hợp. Báo giá kèm sample, thời gian giao, DDP về VN trong 24h. Free, không cần đặt cọc.
            </p>
          </div>

          <div className="grid grid-cols-[1fr_280px] gap-4 max-md:grid-cols-1">
            <form action={submitRfqForm} className="bg-paper border border-line rounded p-5">
              <h2 className="text-[16px] font-bold text-ink mb-4">Form RFQ chuẩn</h2>
              <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">Sản phẩm cần tìm <span className="text-accent">*</span></label>
                  <input name="title_vi" defaultValue={sp.q ?? ""} placeholder="Vd: gạch porcelain 600x1200 calacatta white" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" required />
                  <input type="hidden" name="title_en" value="" />
                  <input type="hidden" name="title_cn" value="" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">Danh mục</label>
                  <select name="category_id" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white" defaultValue="">
                    <option value="">-- Chọn danh mục --</option>
                    {NAV_CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">Số lượng <span className="text-accent">*</span></label>
                  <div className="grid grid-cols-[1fr_120px] gap-2">
                    <input name="target_quantity" type="number" min="1" defaultValue={sp.qty ?? ""} placeholder="Vd: 500" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" required />
                    <select name="target_unit_code" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white" defaultValue="pcs">
                      <option value="pcs">pcs</option>
                      <option value="set">set</option>
                      <option value="m2">m²</option>
                      <option value="m3">m³</option>
                      <option value="kg">kg</option>
                      <option value="container20">cont 20'</option>
                      <option value="container40">cont 40'</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">Mô tả chi tiết</label>
                  <textarea name="description_vi" defaultValue={sp.desc ?? ""} rows={5} placeholder="Mô tả sản phẩm: kích thước, màu sắc, vật liệu, tiêu chuẩn, thời hạn..." className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand resize-none" />
                  <input type="hidden" name="description_en" value="" />
                  <input type="hidden" name="description_cn" value="" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">Ảnh tham khảo</label>
                  <div className="border-2 border-dashed border-line rounded p-3 text-center text-[12px] text-mute hover:border-brand cursor-pointer">
                    📎 Kéo thả ảnh hoặc <a className="text-brand underline">click chọn file</a> — tối đa 5 ảnh, mỗi ảnh dưới 5MB
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">Cảng đích</label>
                  <select name="destination_port" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white" defaultValue="catlai">
                    <option value="catlai">Cát Lái – HCM</option>
                    <option value="haiphong">Hải Phòng – HP</option>
                    <option value="danang">Đà Nẵng – ĐN</option>
                    <option value="ddp_warehouse">DDP về kho (khuyến nghị)</option>
                  </select>
                  <input type="hidden" name="destination_country" value="VN" />
                  <input type="hidden" name="invite_mode" value="open" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">Ngân sách / đơn vị</label>
                  <select name="budget" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white">
                    <option>Linh hoạt</option>
                    <option>Dưới $10</option>
                    <option>$10 – $50</option>
                    <option>$50 – $200</option>
                    <option>Trên $200</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">Mức độ khẩn</label>
                  <div className="flex gap-2 flex-wrap text-[12px]">
                    {["Bình thường (24h)", "Nhanh (12h)", "Khẩn (6h)"].map((u, i) => (
                      <label key={u} className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-sm cursor-pointer hover:border-brand">
                        <input type="radio" name="urgency" defaultChecked={i === 0} className="accent-brand" /> {u}
                      </label>
                    ))}
                  </div>
                </div>
                <label className="col-span-2 flex items-center gap-2 text-[12px] text-mute pt-2">
                  <input type="checkbox" defaultChecked className="accent-brand" /> Bật <b className="text-ink">Dịch vụ giao dịch bảo đảm</b> cho RFQ này (trung gian + QC + bảo hiểm)
                </label>
              </div>
              <div className="mt-4 pt-3 border-t border-line flex gap-3 items-center max-md:flex-col max-md:items-start">
                <button type="submit" className="px-6 py-2.5 bg-accent text-white rounded-sm font-bold text-[13px] hover:opacity-90">🚀 Gửi RFQ</button>
                <span className="text-[11.5px] text-mute">Free · Không cần đặt cọc · Báo giá trong 24h</span>
              </div>
              {sp.q && (
                <div className="mt-3 p-3 bg-success/10 border border-success/30 rounded text-[12px] text-success">
                  ✓ RFQ đã được gửi đi. Chúng tôi sẽ phản hồi qua email trong 24h.
                </div>
              )}
            </form>

            <aside className="space-y-3">
              <div className="bg-paper border border-line rounded p-4">
                <b className="block text-[13px] font-bold text-ink mb-3">💡 Mẹo viết RFQ tốt</b>
                <div className="space-y-3">
                  {TIPS.map((tip) => (
                    <div key={tip.t} className="flex gap-2.5">
                      <span className="text-[18px] flex-shrink-0">{tip.icon}</span>
                      <div>
                        <b className="block text-[12px] text-ink">{tip.t}</b>
                        <p className="text-[11px] text-mute leading-snug">{tip.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-success/5 border border-success/30 rounded p-4">
                <b className="block text-[13px] text-success mb-2">🛡 Cam kết Cybersilkroads</b>
                <ul className="text-[11.5px] text-ink space-y-1">
                  <li>✓ Báo giá free, không cam kết đặt</li>
                  <li>✓ Audit nhà máy miễn phí trước đặt</li>
                  <li>✓ Bảo vệ thanh toán Bảo đảm Giao dịch</li>
                  <li>✓ Hỗ trợ tiếng Việt 24/7</li>
                </ul>
              </div>

              <Link href="/buyer-center/secured-trading" className="block bg-brand text-white rounded p-3 hover:opacity-95 text-center">
                <b className="block text-[12.5px]">🔒 Tìm hiểu Secured Trading</b>
                <span className="text-[10.5px] opacity-90">Tiền của bạn an toàn 100%</span>
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Đăng yêu cầu báo giá — Trung tâm Buyer" };
