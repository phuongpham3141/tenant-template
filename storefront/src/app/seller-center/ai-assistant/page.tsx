import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const CAPS = [
  { icon: "📨", title: "自动回复询价", desc: "Maike 读取询价、与您的产品目录匹配，< 60 秒生成报价草稿。您只需审核 + 发送。" },
  { icon: "🌐", title: "中越实时聊天翻译", desc: "越南采购商打越南语，您看到中文。您回中文，采购商看到越南语。无需翻译人员。" },
  { icon: "💲", title: "智能定价建议", desc: "分析竞品价格 + 您的成交历史 → 推荐最优 FOB 价，既赢单又保毛利。" },
  { icon: "🔍", title: "同行竞品分析", desc: "追踪 200+ 同行供应商——价格、促销、评分、Top SKU。每周对比表。" },
  { icon: "📝", title: "生成产品描述", desc: "自动撰写中越双语 SEO 标题 + 卖点 + 规格表。针对华越搜索算法优化。" },
];

const CHAT = [
  { who: "buyer", text: "请问 L 形海军蓝丝绒沙发，起订量 30 套，FOB 广州多少钱？" },
  { who: "maike", text: "[Maike 已在您的目录中匹配到 SKU SF-2840]\n报价建议：\n• 起订量 30：$420/套 FOB 广州\n• 起订量 50：$395/套（降 6%）\n• 交期：25 天\n• 需采购商确认躺位尺寸 240/280cm\n→ 是否发送此报价？" },
  { who: "user", text: "好，发送，并备注：起订量 30+ 赠送 5 个抱枕" },
  { who: "maike", text: "✓ 已向采购商 陈文 A（河内）发送 PI #PI-9145。\n采购商已于 14:23 阅读（2 分钟前）。\n预测签约概率：68%——丝绒沙发类订单采购商通常在 8-12 小时内签约。" },
];

const FAQ = [
  { q: "Maike 会取代我的销售人员吗？", a: "不会——Maike 是助手。它自动处理 70% 的重复工作（标准报价、聊天翻译、采购商 FAQ），让销售专注于大单和客户关系。多数供应商使用 Maike 后团队规模不变——但人效提升 2.5×。" },
  { q: "Maike 翻译准确吗？会因误译造成误解吗？", a: "Maike 采用针对外贸 B2B 语法精调的模型（基于 1,200 万条 MIC 聊天 + 400 万份 PI 数据）。中越互译准确率达 96.8%。复杂句 / 关键数据均会标注「需人工审核」。" },
  { q: "我的报价数据会被 Maike 分享给其他供应商吗？", a: "绝对不会。您的价格与目录均被隔离——Maike 仅学习行业的通用模式（已匿名化）。其他供应商无法通过 Maike 查询您的价格或 SKU。" },
  { q: "我能让 Maike 学习本公司的专属写作风格吗？", a: "可以——钻石套餐支持定制训练。上传您的 50-100 份样例报价，Maike 将学习语气（正式/随意）、固定模板和偏好格式。2-3 天内完成设置。" },
  { q: "除中越外，Maike 还支持其他语言吗？", a: "支持。2026 路线图：英语、印尼语、泰语、马来语。目前中越最为稳定，覆盖华越 92% 的询价。英语正在 beta——可在「设置」中开启。" },
];

export default function AiAssistantPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "供应商中心", href: "/seller-center" }, { label: "Maike AI 助手" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/ai-assistant" />
        <div>
          <div className="bg-gradient-to-br from-brand-dark to-accent text-white rounded p-6 mb-4">
            <div className="inline-block bg-white text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🤖 MAIKE AI ASSISTANT</div>
            <h1 className="text-[26px] font-bold leading-tight">Maike——供应商 AI 助手</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              Maike（麦可）是专注外贸 B2B 的 AI——基于 1,200 万条 Made-in-China 历史聊天 + 400 万份形式发票训练。60 秒回复询价、中越实时聊天翻译、智能定价建议。金牌套餐免费。
            </p>
            <div className="flex gap-3 mt-4 max-md:flex-col">
              <button className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[12.5px]">开启 Maike（金牌免费）</button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-semibold text-[12.5px] border border-white/30">观看演示（90 秒）</button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3 mb-4 max-md:grid-cols-1">
            {CAPS.map((c) => (
              <div key={c.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[26px] mb-2">{c.icon}</div>
                <b className="block text-[12.5px] text-ink mb-1">{c.title}</b>
                <p className="text-[11px] text-mute leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-4">
              <b className="block text-[14px] text-ink mb-3">💬 演示：Maike 处理真实询价</b>
              <div className="bg-[#F5F7FA] rounded p-3 space-y-2 max-h-[420px] overflow-y-auto">
                {CHAT.map((c, i) => (
                  <div key={i} className={`flex ${c.who === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-md p-2.5 text-[12px] leading-relaxed whitespace-pre-line ${
                      c.who === "buyer" ? "bg-white border border-line text-ink" :
                      c.who === "maike" ? "bg-accent/10 border border-accent text-ink" :
                      "bg-brand text-white"
                    }`}>
                      <span className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                        c.who === "buyer" ? "text-mute" :
                        c.who === "maike" ? "text-accent" :
                        "text-white/80"
                      }`}>
                        {c.who === "buyer" ? "采购商 · 陈文 A" : c.who === "maike" ? "🤖 Maike" : "您"}
                      </span>
                      {c.text}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10.5px] text-mute mt-2 text-center">演示为 mock——注册即可在您的真实数据上体验。</p>
            </div>

            <div className="bg-paper border border-line rounded p-5 flex flex-col">
              <b className="block text-[14px] text-ink mb-3">💰 Pricing</b>
              <div className="grid grid-cols-1 gap-3 flex-1">
                <div className="border-2 border-gold rounded p-4 bg-gold/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <b className="text-[14px] text-ink">随金牌会员附赠</b>
                      <span className="text-[11px] text-mute block">全部 5 项能力 · 报价不限量</span>
                    </div>
                    <span className="bg-gold text-brand-dark text-[10px] font-bold px-2 py-0.5 rounded-sm">免费</span>
                  </div>
                  <p className="text-[11.5px] text-mute mt-2">已含于 $2,980/年金牌会员中。推荐所有认真经营的供应商使用。</p>
                </div>
                <div className="border border-line rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <b className="text-[14px] text-ink">Maike 单独版</b>
                      <span className="text-[11px] text-mute block">适合暂不开通金牌的供应商</span>
                    </div>
                    <span className="text-[16px] font-extrabold text-accent">$29<small className="text-[11px] text-mute font-normal">/月</small></span>
                  </div>
                  <p className="text-[11.5px] text-mute mt-2">每月限 200 条询价。开通金牌后不受此限。</p>
                </div>
                <div className="border border-line rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <b className="text-[14px] text-ink">钻石定制训练</b>
                      <span className="text-[11px] text-mute block">训练专属语气 / 模板</span>
                    </div>
                    <span className="text-[14px] font-extrabold text-brand">+$200<small className="text-[11px] text-mute font-normal">/月</small></span>
                  </div>
                  <p className="text-[11.5px] text-mute mt-2">2-3 天设置 + 您的 50-100 份样例报价。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">❓ Maike 常见问题</b>
            <div className="space-y-2">
              {FAQ.map((f, i) => (
                <details key={i} className="border border-line rounded group">
                  <summary className="flex justify-between items-center p-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-[#FAFBFC]">
                    <b className="text-[12.5px] text-ink">{f.q}</b>
                    <span className="text-[12px] text-mute group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="text-[12px] text-mute leading-relaxed px-3 pb-3 border-t border-line pt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <Link href="/seller-center/gold-member" className="block bg-accent text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">🤖 开启 Maike——询价处理时间减少 70%</b>
            <p className="text-[12.5px] opacity-90">开通金牌即可免费使用 Maike，或单独试用 $29/月。</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Maike AI 助手 — 供应商中心" };
