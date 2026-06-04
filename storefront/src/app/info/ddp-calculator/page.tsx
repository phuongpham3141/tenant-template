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
  haiphong: { label: "海防港（北部）",        cifPerCbm: 280, ddpPerCbm: 480, days: "12-15 / 18-22" },
  catlai:   { label: "吉莱港（胡志明市）",    cifPerCbm: 320, ddpPerCbm: 540, days: "14-17 / 20-24" },
  danang:   { label: "岘港（中部）",          cifPerCbm: 350, ddpPerCbm: 580, days: "13-16 / 19-23" },
  langson:  { label: "谅山陆路",              cifPerCbm: 220, ddpPerCbm: 420, days: "5-8 / 10-12" },
};

const MODES: Record<string, { label: string; desc: string }> = {
  fob: { label: "FOB 中国",                  desc: "在港口/工厂提货。采购商自理运费、税费。" },
  cif: { label: "CIF 越南港口",              desc: "已含至越南港口的海运费 + 保险。采购商自理税费 + 国内段。" },
  ddp: { label: "DDP 越南到仓",              desc: "全包：运费 + 税费 + 清关 + 国内段。无额外费用。" },
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
    { label: "首页", href: "/" },
    { label: "帮助", href: "/help" },
    { label: "DDP 运费计算" },
  ];

  return (
    <>
      <Breadcrumb trail={trail} />

      <div className="max-w-[1100px] mx-auto px-4 mt-4 mb-7">
        {/* === Calculator form (always visible — easy to re-tune) === */}
        <div className="bg-paper border border-line rounded p-5 mb-4">
          <h1 className="text-[20px] font-bold text-ink mb-1">⚡ DDP / CIF / FOB 运费计算</h1>
          <p className="text-[12.5px] text-mute mb-4">
            估算从中国进口至越南的全包成本。仅供参考，正式报价请通过{" "}
            <Link href="/buying-request" className="text-brand font-semibold cursor-pointer hover:underline">询价</Link>发送。
          </p>

          <form action="/info/ddp-calculator" method="get" className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {sp.productId && <input type="hidden" name="productId" value={sp.productId} />}

            <div>
              <label className="block text-[11.5px] font-semibold text-ink mb-1">方式</label>
              <select name="mode" defaultValue={mode} className="w-full px-3 py-2 border border-line rounded-sm text-[13px] bg-white outline-none focus:border-brand cursor-pointer">
                {Object.entries(MODES).map(([k, m]) => (
                  <option key={k} value={k}>{m.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold text-ink mb-1">目的港</label>
              <select name="port" defaultValue={portKey} className="w-full px-3 py-2 border border-line rounded-sm text-[13px] bg-white outline-none focus:border-brand cursor-pointer">
                {Object.entries(PORTS).map(([k, p]) => (
                  <option key={k} value={k}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold text-ink mb-1">体积（CBM）</label>
              <input
                name="qty"
                type="number"
                step="0.1"
                min="0"
                defaultValue={qty || ""}
                placeholder="例：5.5"
                className="w-full px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold text-ink mb-1">货值（USD）</label>
              <input
                name="value"
                type="number"
                step="1"
                min="0"
                defaultValue={value || ""}
                placeholder="例：8500"
                className="w-full px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
            </div>

            <button
              type="submit"
              className="col-span-4 py-2.5 bg-brand text-white rounded-sm font-bold text-[13.5px] cursor-pointer hover:bg-brand-light max-md:col-span-2"
            >
              计算运费 →
            </button>
          </form>
        </div>

        {/* === Result breakdown ============================================ */}
        {hasInputs ? (
          <div className="bg-paper border-2 border-brand rounded p-5 mb-4">
            <div className="flex justify-between items-baseline mb-3 pb-3 border-b border-line max-md:flex-col max-md:gap-2">
              <h2 className="text-[16px] font-bold text-ink">
                估算 {MODES[mode].label} → {port.label}
              </h2>
              <div className="text-[11.5px] text-mute">
                {qty > 0 && <>📦 {qty} CBM · </>}{value > 0 && <>💰 ${fmt(value)} · </>}⏱ {port.days} 天
              </div>
            </div>

            <table className="w-full text-[13px]">
              <tbody>
                <Row label="货值（FOB）" v={goodsCost} />
                {oceanFreight > 0 && <Row label="海运费 + 装卸" v={oceanFreight} />}
                {insurance > 0 && <Row label="货物保险（0.5%）" v={insurance} />}
                {importDuty > 0 && <Row label="进口税（平均约 10%）" v={importDuty} />}
                {vat > 0 && <Row label="增值税 10%" v={vat} />}
                {customsClearance > 0 && <Row label="清关 + 单证费" v={customsClearance} />}
                {domesticDelivery > 0 && <Row label="越南国内运输" v={domesticDelivery} />}
                {platformFee > 0 && <Row label="华越服务费（2%）" v={platformFee} />}
                <tr className="border-t-2 border-brand">
                  <td className="py-3 text-ink font-bold text-[14px]">合计</td>
                  <td className="py-3 text-right text-accent font-extrabold text-[20px]">${fmt(total)}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="py-1 text-right text-[11.5px] text-mute">
                    ≈ {fmt(total * VND_RATE)} VND（汇率 1 USD = {fmt(VND_RATE)} VND）
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 grid grid-cols-2 gap-2 max-md:grid-cols-1">
              <Link
                href={`/buying-request${sp.productId ? `?productId=${sp.productId}` : ""}&intent=rfq&mode=${mode}&port=${portKey}&qty=${qty}&value=${value}`}
                className="px-5 py-2.5 bg-accent text-white rounded-sm font-bold text-[13px] text-center cursor-pointer hover:opacity-90"
              >
                🚀 发送询价获取精确 DDP 报价
              </Link>
              <Link
                href="/info/shipping-policy"
                className="px-5 py-2.5 border-2 border-brand text-brand rounded-sm font-bold text-[13px] text-center cursor-pointer hover:bg-brand hover:text-white"
              >
                📖 运输政策详情
              </Link>
            </div>

            <p className="text-[11px] text-mute mt-3 leading-relaxed">
              <b>注意：</b>此为按平均公式估算的结果。正式报价取决于实际 HS 编码、重量、货物类型（特殊：易碎、冷链、危险品）及旺季因素。误差 ±15-20%。
            </p>
          </div>
        ) : (
          <div className="bg-paper border border-line rounded p-5 mb-4 text-[13px] text-mute leading-relaxed space-y-3">
            <p>
              <b className="text-ink">DDP（完税后交货）</b>是最高级别的国际贸易术语——供应商承担一切费用和风险，直至货物送达越南采购商仓库，且已缴清各类税费。
            </p>
            <p>
              华越通过 3 个主要港口管理 DDP：<b className="text-ink">海防港</b>（面向北部客户）、<b className="text-ink">胡志明市吉莱港</b>（南部）和 <b className="text-ink">岘港</b>（中部）。经谅山陆路更快（5-8 天），适合 < 3 CBM 的小批量货物。
            </p>
            <p>
              在上方表单中输入<b>体积</b>（CBM 或等效 kg/167）和 <b>FOB 货值</b>，即可立即查看估算总成本。
            </p>
          </div>
        )}

        {/* === Methodology ================================================== */}
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[14px] font-bold text-ink mb-3">📋 DDP 成本计算方式</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12.5px] text-ink max-md:grid-cols-1">
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">平均海运费</span><b>$280-350/CBM</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">货物保险</span><b>货值的 0.5%</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">进口税</span><b>按 HS 0-30%</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">增值税</span><b>10%（货值 + 进口税）</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">清关费</span><b>$80-150 / 批</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">国内运输</span><b>$60-120/CBM</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">华越服务费</span><b>2%（担保 + 争议）</b></div>
            <div className="flex justify-between border-b border-line py-1.5"><span className="text-mute">DDP 总附加成本</span><b className="text-accent">+25-35% FOB 价</b></div>
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
  title: "DDP / CIF / FOB 运费计算 — 华越",
  description: "估算从中国进口至越南的全包成本：FOB、CIF、DDP。按 CBM + 订单货值快速计算。",
};
