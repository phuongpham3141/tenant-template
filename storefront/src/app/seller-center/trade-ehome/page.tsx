import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const TOOLS = [
  { icon: "📦", name: "产品管理", desc: "批量 CSV 上传、按行业设置属性、OEM/ODM 价格版本管理、校验华越商品列表标准。", count: "412 个 SKU 在售" },
  { icon: "📋", name: "订单管理", desc: "看板式流水线：询价 → 报价 → PI → 定金 → 生产 → 出厂 → 交货。集成担保。", count: "23 个订单处理中" },
  { icon: "📨", name: "询价收件箱", desc: "汇集越南采购商的全部询价，按行业/金额/起订量筛选。AI 推荐回复模板。", count: "23 条询价未回复" },
  { icon: "💲", name: "快速报价", desc: "30 秒生成专业中越双语 PI / 报价单。自动同步价格矩阵。", count: "平均 18 分钟/报价" },
  { icon: "🚚", name: "运输跟踪", desc: "实时追踪集装箱，从盐田/上海 → 海防/胡志明市。自动同步给采购商。", count: "8 个在途集装箱" },
  { icon: "📊", name: "销售报告", desc: "营收、毛利、Top 采购商、Top SKU、询价→订单转化率。导出 Excel/PDF 呈报。", count: "5 月 $187K" },
];

const INTEGRATIONS = [
  { name: "SAP Business One", type: "ERP", logo: 11 },
  { name: "Oracle NetSuite", type: "ERP", logo: 12 },
  { name: "Kingdee K3", type: "中国本土 ERP", logo: 13 },
  { name: "Manhattan WMS", type: "仓储", logo: 14 },
  { name: "Cainiao Fulfillment", type: "履约", logo: 15 },
  { name: "Salesforce CRM", type: "CRM", logo: 16 },
  { name: "WeCom (企业微信)", type: "员工沟通", logo: 17 },
  { name: "DingTalk", type: "员工沟通", logo: 18 },
];

const STEPS = [
  { n: 1, title: "单点登录", desc: "使用华越金牌账户单点登录（SSO）" },
  { n: 2, title: "连接 ERP/WMS", desc: "向导自动映射字段，双向同步产品 + 库存" },
  { n: 3, title: "统一运营", desc: "全团队共享同一订单流水线——告别分散的 Excel" },
];

export default function TradeEhomePage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "供应商中心", href: "/seller-center" }, { label: "Foreign Trade e-Home" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/trade-ehome" />
        <div>
          <div className="bg-gradient-to-br from-brand to-brand-dark text-white rounded p-6 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🏡 ALL-IN-ONE PORTAL</div>
            <h1 className="text-[26px] font-bold leading-tight">Foreign Trade e-Home</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              出口供应商的「数字之家」——6 大工具集成于一个控制台，连接内部 ERP/WMS/CRM。从询价到集装箱交货的全订单生命周期，尽在一处完成。
            </p>
            <div className="flex gap-3 mt-4 max-md:flex-col">
              <button className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[12.5px]">免费试用 14 天</button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-semibold text-[12.5px] border border-white/30">观看演示（3 分钟）</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {TOOLS.map((t) => (
              <div key={t.name} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[28px] mb-2">{t.icon}</div>
                <b className="block text-[14px] text-ink mb-1">{t.name}</b>
                <p className="text-[11.5px] text-mute leading-relaxed mb-3">{t.desc}</p>
                <div className="bg-success/10 text-success text-[11px] font-semibold px-2 py-1 rounded-sm inline-block">
                  {t.count}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🔗 集成 8 大企业系统</b>
            <p className="text-[12px] text-mute mb-4">e-Home 不取代您的 ERP——它是连接内部系统与越南采购商的桥梁。</p>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {INTEGRATIONS.map((i) => (
                <div key={i.name} className="border border-line rounded p-3 flex items-center gap-3 hover:border-brand">
                  <img src={`/img/seller-ehome-int-${i.logo}.jpg?v=5`} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <b className="block text-[12px] text-ink truncate">{i.name}</b>
                    <span className="text-[10.5px] text-mute">{i.type}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="#" className="text-brand text-[12px] font-semibold">+ 申请定制 ERP 集成</Link>
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">⚙ 仅需 3 步设置</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-4 text-center">
                  <div className="w-12 h-12 bg-brand text-white rounded-full mx-auto flex items-center justify-center font-bold text-[18px] mb-3">{s.n}</div>
                  <b className="block text-[13px] text-ink mb-1">{s.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-2">
            <div className="bg-paper border border-line rounded p-4 text-center">
              <b className="block text-[24px] text-brand">−68%</b>
              <span className="text-[11px] text-mute">订单处理时间</span>
            </div>
            <div className="bg-paper border border-line rounded p-4 text-center">
              <b className="block text-[24px] text-success">+34%</b>
              <span className="text-[11px] text-mute">询价 → 订单转化率</span>
            </div>
            <div className="bg-paper border border-line rounded p-4 text-center">
              <b className="block text-[24px] text-accent">14 天</b>
              <span className="text-[11px] text-mute">免费试用，无需绑卡</span>
            </div>
          </div>

          <div className="bg-brand-dark text-white rounded p-5 text-center">
            <b className="block text-[18px] mb-2">🏡 进入 e-Home——像大型外贸公司一样运营</b>
            <p className="text-[12.5px] opacity-90 mb-4">免费 14 天 · 开通金牌即免费 · 随时取消</p>
            <button className="bg-gold text-brand-dark px-7 py-3 rounded-sm font-bold text-[14px] hover:opacity-95">
              开始体验 e-Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Foreign Trade e-Home — 供应商中心" };
