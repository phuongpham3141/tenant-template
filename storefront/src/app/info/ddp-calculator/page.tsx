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
  haiphong: { label: "Hai Phong (North)",      cifPerCbm: 280, ddpPerCbm: 480, days: "12-15 / 18-22" },
  catlai:   { label: "Cat Lai (Ho Chi Minh City)", cifPerCbm: 320, ddpPerCbm: 540, days: "14-17 / 20-24" },
  danang:   { label: "Da Nang (Central)",      cifPerCbm: 350, ddpPerCbm: 580, days: "13-16 / 19-23" },
  langson:  { label: "Lang Son overland",      cifPerCbm: 220, ddpPerCbm: 420, days: "5-8 / 10-12" },
};

const MODES: Record<string, { label: string; desc: string }> = {
  fob: { label: "FOB China",                 desc: "Pickup at the port/factory. The buyer handles freight and duties." },
  cif: { label: "CIF Vietnam Port",          desc: "Includes ocean freight + insurance to the Vietnam port. The buyer handles duties + domestic legs." },
  ddp: { label: "DDP to Vietnam Warehouse",  desc: "All-in: freight + duties + customs clearance + domestic. No surprises." },
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
    { label: "Home", href: "/" },
    { label: "Support", href: "/help" },
    { label: "DDP Cost Calculator" },
  ];

  return (
    <>
      <Breadcrumb trail={trail} />

      <div className="max-w-[1100px] mx-auto px-4 mt-4 mb-7">
        {/* === Calculator form (always visible — easy to re-tune) === */}
        <div className="bg-paper border border-line rounded p-5 mb-4">
          <h1 className="text-[20px] font-bold text-ink mb-1">⚡ DDP / CIF / FOB Cost Calculator</h1>
          <p className="text-[12.5px] text-mute mb-4">
            Estimate the all-in cost of importing from China to Vietnam. For reference only; an official quote is sent via{" "}
            <Link href="/buying-request" className="text-brand font-semibold cursor-pointer hover:underline">RFQ</Link>.
          </p>

          <form action="/info/ddp-calculator" method="get" className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {sp.productId && <input type="hidden" name="productId" value={sp.productId} />}

            <div>
              <label className="block text-[11.5px] font-semibold text-ink mb-1">Mode</label>
              <select name="mode" defaultValue={mode} className="w-full px-3 py-2 border border-line rounded-sm text-[13px] bg-white outline-none focus:border-brand cursor-pointer">
                {Object.entries(MODES).map(([k, m]) => (
                  <option key={k} value={k}>{m.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold text-ink mb-1">Destination port</label>
              <select name="port" defaultValue={portKey} className="w-full px-3 py-2 border border-line rounded-sm text-[13px] bg-white outline-none focus:border-brand cursor-pointer">
                {Object.entries(PORTS).map(([k, p]) => (
                  <option key={k} value={k}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold text-ink mb-1">Volume (CBM)</label>
              <input
                name="qty"
                type="number"
                step="0.1"
                min="0"
                defaultValue={qty || ""}
                placeholder="e.g. 5.5"
                className="w-full px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold text-ink mb-1">Goods value (USD)</label>
              <input
                name="value"
                type="number"
                step="1"
                min="0"
                defaultValue={value || ""}
                placeholder="e.g. 8500"
                className="w-full px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
            </div>

            <button
              type="submit"
              className="col-span-4 py-2.5 bg-brand text-white rounded-sm font-bold text-[13.5px] cursor-pointer hover:bg-brand-light max-md:col-span-2"
            >
              Calculate →
            </button>
          </form>
        </div>

        {/* === Result breakdown ============================================ */}
        {hasInputs ? (
          <div className="bg-paper border-2 border-brand rounded p-5 mb-4">
            <div className="flex justify-between items-baseline mb-3 pb-3 border-b border-line max-md:flex-col max-md:gap-2">
              <h2 className="text-[16px] font-bold text-ink">
                Estimate {MODES[mode].label} → {port.label}
              </h2>
              <div className="text-[11.5px] text-mute">
                {qty > 0 && <>📦 {qty} CBM · </>}{value > 0 && <>💰 ${fmt(value)} · </>}⏱ {port.days} days
              </div>
            </div>

            <table className="w-full text-[13px]">
              <tbody>
                <Row label="Goods value (FOB)" v={goodsCost} />
                {oceanFreight > 0 && <Row label="Ocean freight + handling" v={oceanFreight} />}
                {insurance > 0 && <Row label="Cargo insurance (0.5%)" v={insurance} />}
                {importDuty > 0 && <Row label="Import duty (~10% average)" v={importDuty} />}
                {vat > 0 && <Row label="VAT 10%" v={vat} />}
                {customsClearance > 0 && <Row label="Customs clearance + documentation fee" v={customsClearance} />}
                {domesticDelivery > 0 && <Row label="Vietnam domestic shipping" v={domesticDelivery} />}
                {platformFee > 0 && <Row label="Huayuesc service fee (2%)" v={platformFee} />}
                <tr className="border-t-2 border-brand">
                  <td className="py-3 text-ink font-bold text-[14px]">Total</td>
                  <td className="py-3 text-right text-accent font-extrabold text-[20px]">${fmt(total)}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="py-1 text-right text-[11.5px] text-mute">
                    ≈ {fmt(total * VND_RATE)} VND (exchange rate 1 USD = {fmt(VND_RATE)} VND)
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 grid grid-cols-2 gap-2 max-md:grid-cols-1">
              <Link
                href={`/buying-request${sp.productId ? `?productId=${sp.productId}` : ""}&intent=rfq&mode=${mode}&port=${portKey}&qty=${qty}&value=${value}`}
                className="px-5 py-2.5 bg-accent text-white rounded-sm font-bold text-[13px] text-center cursor-pointer hover:opacity-90"
              >
                🚀 Send an RFQ for an exact DDP quote
              </Link>
              <Link
                href="/info/shipping-policy"
                className="px-5 py-2.5 border-2 border-brand text-brand rounded-sm font-bold text-[13px] text-center cursor-pointer hover:bg-brand hover:text-white"
              >
                📖 Shipping policy details
              </Link>
            </div>

            <p className="text-[11px] text-mute mt-3 leading-relaxed">
              <b>Note:</b> this is an estimate based on average formulas. An official quote depends on the actual HS code, weight,
              cargo type (especially: fragile, refrigerated, hazardous), and peak season. Margin of error ±15–20%.
            </p>
          </div>
        ) : (
          <div className="bg-paper border border-line rounded p-5 mb-4 text-[13px] text-mute leading-relaxed space-y-3">
            <p>
              <b className="text-ink">DDP (Delivered Duty Paid)</b> is the most premium incoterm — the supplier bears all costs and risks
              until the goods are placed at the buyer's warehouse in Vietnam, with all duties paid.
            </p>
            <p>
              Huayuesc manages DDP through 3 main ports: <b className="text-ink">Hai Phong</b> (for northern customers),{" "}
              <b className="text-ink">Cat Lai (Ho Chi Minh City)</b> (the south), and <b className="text-ink">Da Nang</b> (the center).
              The overland route via Lang Son is faster (5–8 days) for small shipments under 3 CBM.
            </p>
            <p>
              Enter the <b>volume</b> (CBM, or kg/167 equivalent) and the <b>FOB value</b> in the form above to see the estimated total cost instantly.
            </p>
          </div>
        )}

        {/* === Methodology ================================================== */}
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[14px] font-bold text-ink mb-3">📋 How DDP Cost Is Calculated</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12.5px] text-ink max-md:grid-cols-1">
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">Average ocean freight</span><b>$280-350/CBM</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">Cargo insurance</span><b>0.5% of value</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">Import duty</span><b>0–30% by HS</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">VAT</span><b>10% (value + duty)</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">Customs clearance fee</span><b>$80-150 / shipment</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">Domestic shipping</span><b>$60-120/CBM</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">Huayuesc fee</span><b>2% (escrow + disputes)</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">Total DDP overhead</span><b className="text-accent">+25–35% of FOB price</b></div>
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
  title: "DDP / CIF / FOB Cost Calculator — Huayuesc",
  description: "Estimate the all-in cost of importing from China to Vietnam: FOB, CIF, DDP. A quick calculation by CBM + order value.",
};
