import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

/**
 * /info/ddp-calculator — DDP / CIF / FOB cost calculator.
 *
 * Reads `mode`, `port`, `qty` (CBM), `value` (USD) from query params and
 * shows a deterministic cost breakdown. Falls back to a generic info
 * page when no inputs are provided. This static route takes precedence
 * over the catch-all `/info/[topic]` route for the same path.
 */

const PORTS: Record<string, { label: string; cifPerCbm: number; ddpPerCbm: number; days: string }> = {
  haiphong: { label: "Hải Phòng (Bắc)",      cifPerCbm: 280, ddpPerCbm: 480, days: "12-15 / 18-22" },
  catlai:   { label: "Cát Lái (TP HCM)",     cifPerCbm: 320, ddpPerCbm: 540, days: "14-17 / 20-24" },
  danang:   { label: "Đà Nẵng (Trung)",      cifPerCbm: 350, ddpPerCbm: 580, days: "13-16 / 19-23" },
  langson:  { label: "Đường bộ Lạng Sơn",    cifPerCbm: 220, ddpPerCbm: 420, days: "5-8 / 10-12" },
};

const MODES: Record<string, { label: string; desc: string }> = {
  fob: { label: "FOB Trung Quốc",            desc: "Pickup tại cảng/nhà máy. Buyer tự lo cước, thuế." },
  cif: { label: "CIF Cảng Việt Nam",         desc: "Đã gồm cước biển + bảo hiểm tới cảng VN. Buyer tự lo thuế + nội địa." },
  ddp: { label: "DDP Tận kho Việt Nam",      desc: "Trọn gói: cước + thuế + thông quan + nội địa. Không phát sinh." },
};

const VND_RATE = 25500; // 1 USD ≈ 25500 VND

function fmt(n: number) {
  return n.toLocaleString("vi-VN", { maximumFractionDigits: 0 });
}

export default async function CalcPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; port?: string; qty?: string; value?: string; productId?: string }>;
}) {
  const sp = await searchParams;
  const mode = (sp.mode && MODES[sp.mode] ? sp.mode : "ddp") as keyof typeof MODES;
  const portKey = (sp.port && PORTS[sp.port] ? sp.port : "haiphong") as keyof typeof PORTS;
  const qty = sp.qty ? parseFloat(sp.qty) : 0;
  const value = sp.value ? parseFloat(sp.value) : 0;
  const port = PORTS[portKey];
  const hasInputs = qty > 0 || value > 0;

  // Cost breakdown
  const goodsCost = value;
  const oceanFreight = mode === "fob" ? 0 : Math.round(qty * (mode === "ddp" ? port.ddpPerCbm * 0.5 : port.cifPerCbm));
  const insurance = mode === "fob" ? 0 : Math.round(value * 0.005);
  const importDuty = mode === "ddp" ? Math.round(value * 0.10) : 0;
  const vat = mode === "ddp" ? Math.round((value + oceanFreight + insurance + importDuty) * 0.10) : 0;
  const customsClearance = mode === "ddp" ? 80 : 0;
  const domesticDelivery = mode === "ddp" ? Math.round(qty * (port.ddpPerCbm - port.cifPerCbm) * 0.6) : 0;
  const platformFee = mode === "ddp" ? Math.round(value * 0.02) : 0;
  const total = goodsCost + oceanFreight + insurance + importDuty + vat + customsClearance + domesticDelivery + platformFee;

  const trail = [
    { label: "Trang chủ", href: "/" },
    { label: "Hỗ trợ", href: "/help" },
    { label: "Tính cước DDP" },
  ];

  return (
    <>
      <Breadcrumb trail={trail} />

      <div className="max-w-[1100px] mx-auto px-4 mt-4 mb-7">
        {/* === Calculator form (always visible — easy to re-tune) === */}
        <div className="bg-paper border border-line rounded p-5 mb-4">
          <h1 className="text-[20px] font-bold text-ink mb-1">⚡ Tính cước DDP / CIF / FOB</h1>
          <p className="text-[12.5px] text-mute mb-4">
            Ước tính chi phí trọn gói nhập khẩu từ Trung Quốc về Việt Nam. Dùng tham khảo, báo giá chính thức gửi qua{" "}
            <Link href="/buying-request" className="text-brand font-semibold cursor-pointer hover:underline">RFQ</Link>.
          </p>

          <form action="/info/ddp-calculator" method="get" className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {sp.productId && <input type="hidden" name="productId" value={sp.productId} />}

            <div>
              <label className="block text-[11.5px] font-semibold text-ink mb-1">Phương thức</label>
              <select name="mode" defaultValue={mode} className="w-full px-3 py-2 border border-line rounded-sm text-[13px] bg-white outline-none focus:border-brand cursor-pointer">
                {Object.entries(MODES).map(([k, m]) => (
                  <option key={k} value={k}>{m.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold text-ink mb-1">Cảng đích</label>
              <select name="port" defaultValue={portKey} className="w-full px-3 py-2 border border-line rounded-sm text-[13px] bg-white outline-none focus:border-brand cursor-pointer">
                {Object.entries(PORTS).map(([k, p]) => (
                  <option key={k} value={k}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold text-ink mb-1">Khối lượng (CBM)</label>
              <input
                name="qty"
                type="number"
                step="0.1"
                min="0"
                defaultValue={qty || ""}
                placeholder="VD: 5.5"
                className="w-full px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold text-ink mb-1">Giá trị hàng (USD)</label>
              <input
                name="value"
                type="number"
                step="1"
                min="0"
                defaultValue={value || ""}
                placeholder="VD: 8500"
                className="w-full px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
            </div>

            <button
              type="submit"
              className="col-span-4 py-2.5 bg-brand text-white rounded-sm font-bold text-[13.5px] cursor-pointer hover:bg-brand-light max-md:col-span-2"
            >
              Tính cước →
            </button>
          </form>
        </div>

        {/* === Result breakdown ============================================ */}
        {hasInputs ? (
          <div className="bg-paper border-2 border-brand rounded p-5 mb-4">
            <div className="flex justify-between items-baseline mb-3 pb-3 border-b border-line max-md:flex-col max-md:gap-2">
              <h2 className="text-[16px] font-bold text-ink">
                Ước tính {MODES[mode].label} → {port.label}
              </h2>
              <div className="text-[11.5px] text-mute">
                {qty > 0 && <>📦 {qty} CBM · </>}{value > 0 && <>💰 ${fmt(value)} · </>}⏱ {port.days} ngày
              </div>
            </div>

            <table className="w-full text-[13px]">
              <tbody>
                <Row label="Giá trị hàng (FOB)" v={goodsCost} />
                {oceanFreight > 0 && <Row label="Cước biển + xếp dỡ" v={oceanFreight} />}
                {insurance > 0 && <Row label="Bảo hiểm hàng hoá (0.5%)" v={insurance} />}
                {importDuty > 0 && <Row label="Thuế nhập khẩu (~10% trung bình)" v={importDuty} />}
                {vat > 0 && <Row label="VAT 10%" v={vat} />}
                {customsClearance > 0 && <Row label="Phí thông quan + chứng từ" v={customsClearance} />}
                {domesticDelivery > 0 && <Row label="Vận chuyển nội địa Việt Nam" v={domesticDelivery} />}
                {platformFee > 0 && <Row label="Phí dịch vụ Cybersilkroads (2%)" v={platformFee} />}
                <tr className="border-t-2 border-brand">
                  <td className="py-3 text-ink font-bold text-[14px]">Tổng cộng</td>
                  <td className="py-3 text-right text-accent font-extrabold text-[20px]">${fmt(total)}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="py-1 text-right text-[11.5px] text-mute">
                    ≈ {fmt(total * VND_RATE)} VNĐ (tỉ giá 1 USD = {fmt(VND_RATE)} VND)
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 grid grid-cols-2 gap-2 max-md:grid-cols-1">
              <Link
                href={`/buying-request${sp.productId ? `?productId=${sp.productId}` : ""}&intent=rfq&mode=${mode}&port=${portKey}&qty=${qty}&value=${value}`}
                className="px-5 py-2.5 bg-accent text-white rounded-sm font-bold text-[13px] text-center cursor-pointer hover:opacity-90"
              >
                🚀 Gửi RFQ với báo giá DDP chính xác
              </Link>
              <Link
                href="/info/shipping-policy"
                className="px-5 py-2.5 border-2 border-brand text-brand rounded-sm font-bold text-[13px] text-center cursor-pointer hover:bg-brand hover:text-white"
              >
                📖 Chi tiết chính sách vận chuyển
              </Link>
            </div>

            <p className="text-[11px] text-mute mt-3 leading-relaxed">
              <b>Lưu ý:</b> đây là ước tính theo công thức trung bình. Báo giá chính thức phụ thuộc HS code thật, trọng lượng,
              loại hàng (đặc biệt: dễ vỡ, lạnh, nguy hiểm) và mùa cao điểm. Sai số ±15-20%.
            </p>
          </div>
        ) : (
          <div className="bg-paper border border-line rounded p-5 mb-4 text-[13px] text-mute leading-relaxed space-y-3">
            <p>
              <b className="text-ink">DDP (Delivered Duty Paid)</b> là incoterm cao cấp nhất — NCC chịu mọi chi phí và rủi ro
              tới khi hàng đặt tại kho buyer ở Việt Nam, đã thanh toán mọi loại thuế.
            </p>
            <p>
              Cybersilkroads quản lý DDP qua 3 cảng chính: <b className="text-ink">Hải Phòng</b> (đối với khách miền Bắc),{" "}
              <b className="text-ink">Cát Lái HCM</b> (miền Nam) và <b className="text-ink">Đà Nẵng</b> (miền Trung).
              Đường bộ qua Lạng Sơn nhanh hơn (5-8 ngày) cho hàng nhỏ &lt; 3 CBM.
            </p>
            <p>
              Nhập <b>khối lượng</b> (CBM hoặc tương đương kg/167) và <b>giá trị FOB</b> ở form trên để xem ngay tổng chi phí ước tính.
            </p>
          </div>
        )}

        {/* === Methodology ================================================== */}
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[14px] font-bold text-ink mb-3">📋 Cách tính chi phí DDP</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12.5px] text-ink max-md:grid-cols-1">
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">Cước biển trung bình</span><b>$280-350/CBM</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">Bảo hiểm hàng hoá</span><b>0.5% giá trị</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">Thuế nhập khẩu (NK)</span><b>0-30% theo HS</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">VAT</span><b>10% (giá trị + NK)</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">Phí thông quan</span><b>$80-150 / lô</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">Vận chuyển nội địa</span><b>$60-120/CBM</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">Phí Cybersilkroads</span><b>2% (trung gian + tranh chấp)</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">Tổng overhead DDP</span><b className="text-accent">+25-35% giá FOB</b></div>
          </div>
        </div>
      </div>
    </>
  );
}

function Row({ label, v }: { label: string; v: number }) {
  return (
    <tr className="border-b border-line">
      <td className="py-2 text-ink">{label}</td>
      <td className="py-2 text-right text-ink font-semibold">${fmt(v)}</td>
    </tr>
  );
}

export const metadata = {
  title: "Tính cước DDP / CIF / FOB — Cybersilkroads",
  description: "Ước tính trọn gói chi phí nhập khẩu từ Trung Quốc về Việt Nam: FOB, CIF, DDP. Tính nhanh theo CBM + giá trị đơn.",
};
