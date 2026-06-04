import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const CHANNELS = [
  {
    name: "Tmall (天猫)",
    operator: "Alibaba Group",
    audience: "城市中高端人群",
    pros: ["淘宝/天猫 12 亿用户", "品牌友好，适合大品牌", "双 11、6.18 大促销量为平日 10×"],
    cons: ["开店费约 ¥60K + 保证金 ¥50K", "需中国 TM 商标", "竞争激烈"],
    fee: "¥60K 开店 · 0.5-5% 佣金",
    img: 81,
  },
  {
    name: "JD.com (京东)",
    operator: "JD Group",
    audience: "科技人群、电子、快消",
    pros: ["自营物流——中国 90% 地区 1-2 天送达", "品质佳，假货少", "客户数据比天猫更透明"],
    cons: ["开店费 ¥30-100K 视行业而定", "京东优先扶持已有认证的品牌", "需在中国设仓"],
    fee: "¥30-100K 开店 · 2-8% 佣金",
    img: 82,
  },
  {
    name: "1688.com",
    operator: "Alibaba B2B",
    audience: "国内 B2B、分销、OEM",
    pros: ["专注 B2B——适合生产型供应商", "费用低，约 ¥1,688/年", "易获批发商大单"],
    cons: ["毛利低（B2B = 批发价）", "需丰富的目录与样品", "须投入 1688 展厅"],
    fee: "¥1,688/年 · 0% 佣金",
    img: 83,
  },
];

const COMPARE = [
  { feature: "初始开店费", tmall: "¥60K", jd: "¥30-100K", c1688: "¥1,688/年" },
  { feature: "佣金", tmall: "0.5-5%", jd: "2-8%", c1688: "0%" },
  { feature: "受众", tmall: "城市 B2C", jd: "科技 B2C", c1688: "批发 B2B + OEM" },
  { feature: "免费流量", tmall: "中等", jd: "高", c1688: "高（B2B）" },
  { feature: "最低营销费", tmall: "¥30K/月", jd: "¥15K/月", c1688: "¥5K/月" },
  { feature: "首年典型 ROI", tmall: "1.4-2.2×", jd: "1.6-2.5×", c1688: "1.8-3.0×" },
];

const SERVICES = [
  { icon: "🏪", title: "开店一站式服务", desc: "代办中国工商注册（如无）、TM 商标、银行保函。" },
  { icon: "✨", title: "商品优化", desc: "按淘宝算法撰写 SEO 标题、符合平台标准的 A+ 图片、30 秒产品视频。" },
  { icon: "📢", title: "淘宝直通车广告", desc: "专业淘宝广告团队——关键词竞价、超级推荐、品牌专区。目标 ROI 3.5×。" },
  { icon: "💬", title: "中文客服", desc: "旺旺客服团队每日在线 16 小时——DSR 评分目标 ≥ 4.85（天猫 Premium 要求）。" },
  { icon: "📈", title: "报告与分析", desc: "整合三平台的看板——营收、转化、退货率、Top SKU。每周通过钉钉汇报。" },
];

const CASES = [
  {
    company: "OPPEIN Home（橱柜）",
    desc: "此前 100% 出口，2024 年开通天猫 + 1688。18 个月后内销占营收 32%，在 2025 Q2 出口放缓时稳定了业绩。",
    metric: "内销 = 32% 营收",
    img: 91,
  },
  {
    company: "KUKA Home（沙发）",
    desc: "同步运营天猫（B2C）+ 1688（经销商展厅）+ 华越出口。三渠道共享仓库 + 共享 QC 团队——管理成本降低 18%。",
    metric: "−18% 管理成本",
    img: 92,
  },
];

export default function DomesticCnPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "供应商中心", href: "/seller-center" }, { label: "中国内贸" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/domestic-cn" />
        <div>
          <div className="bg-gradient-to-br from-red-700 to-yellow-500 text-white rounded p-6 mb-4" style={{ background: "linear-gradient(135deg,#b91c1c,#eab308)" }}>
            <div className="inline-block bg-white text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🇨🇳 MIC DOMESTIC TRADE</div>
            <h1 className="text-[26px] font-bold leading-tight">中国内销</h1>
            <p className="text-[14px] opacity-95 mt-2 leading-relaxed max-w-[680px]">
              中国工厂可在出口的同时拓展内销——多元化营收，在出口市场波动时稳定现金流。华越助力仅做出口的供应商入驻天猫、京东、1688。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {CHANNELS.map((c) => (
              <div key={c.name} className="bg-paper border border-line rounded overflow-hidden hover:border-brand">
                <img src={`/img/seller-cn-${c.img}.jpg?v=5`} alt="" className="w-full h-[120px] object-cover" />
                <div className="p-4">
                  <b className="block text-[14px] text-ink">{c.name}</b>
                  <span className="text-[11px] text-mute mb-2 block">运营方：{c.operator}</span>
                  <p className="text-[11.5px] text-ink mb-2"><b>受众：</b> {c.audience}</p>
                  <div className="border-t border-line pt-2">
                    <span className="text-[10.5px] text-mute font-semibold uppercase tracking-wider">优势</span>
                    <ul className="mt-1 mb-2 space-y-0.5">
                      {c.pros.map((p) => <li key={p} className="text-[11.5px] text-ink flex gap-1"><span className="text-success">✓</span> {p}</li>)}
                    </ul>
                    <span className="text-[10.5px] text-mute font-semibold uppercase tracking-wider">注意事项</span>
                    <ul className="mt-1 mb-2 space-y-0.5">
                      {c.cons.map((p) => <li key={p} className="text-[11.5px] text-mute flex gap-1"><span className="text-accent">!</span> {p}</li>)}
                    </ul>
                  </div>
                  <div className="bg-[#FAFBFC] rounded-sm px-2 py-1.5 text-[11px] text-accent font-semibold">{c.fee}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4 overflow-x-auto">
            <b className="block text-[15px] text-ink mb-4">📊 三大内销渠道对比</b>
            <table className="w-full text-[12.5px] min-w-[560px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">要素</th>
                  <th className="text-left px-3 py-2.5 font-medium">Tmall</th>
                  <th className="text-left px-3 py-2.5 font-medium">JD.com</th>
                  <th className="text-left px-3 py-2.5 font-medium">1688</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((c) => (
                  <tr key={c.feature} className="border-t border-line">
                    <td className="px-3 py-2.5 text-ink font-semibold">{c.feature}</td>
                    <td className="px-3 py-2.5 text-mute">{c.tmall}</td>
                    <td className="px-3 py-2.5 text-mute">{c.jd}</td>
                    <td className="px-3 py-2.5 text-mute">{c.c1688}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🛠 入驻支持——5 项服务</b>
            <div className="grid grid-cols-5 gap-3 max-md:grid-cols-2">
              {SERVICES.map((s) => (
                <div key={s.title} className="border border-line rounded p-3 hover:border-brand">
                  <div className="text-[24px] mb-2">{s.icon}</div>
                  <b className="block text-[12.5px] text-ink mb-1">{s.title}</b>
                  <p className="text-[11px] text-mute leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🏆 真实案例——多渠道成功的供应商</b>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              {CASES.map((c) => (
                <div key={c.company} className="border border-line rounded overflow-hidden hover:border-brand grid grid-cols-[140px_1fr] max-md:grid-cols-1">
                  <img src={`/img/seller-cn-case-${c.img}.jpg?v=5`} alt="" className="w-full h-full object-cover max-md:h-[140px]" />
                  <div className="p-4">
                    <b className="block text-[13px] text-ink mb-2">{c.company}</b>
                    <p className="text-[11.5px] text-mute leading-relaxed mb-3">{c.desc}</p>
                    <div className="border-t border-line pt-2 flex justify-between items-baseline">
                      <span className="text-[10.5px] text-mute">成效</span>
                      <b className="text-[13px] text-success">{c.metric}</b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="#" className="block bg-brand text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">🇨🇳 免费内销入驻咨询</b>
            <p className="text-[12.5px] opacity-90">天猫/京东/1688 团队分析您的产品目录——选择合适渠道 + 6 个月路线图。</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "中国内销 — 供应商中心" };
