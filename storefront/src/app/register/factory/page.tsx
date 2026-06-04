import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";
import { LOGIN_PROVIDERS } from "@/components/icons/social";

const VALUE_PROPS = [
  {
    icon: "📈",
    title: "触达 600+ 越南经销商",
    desc: "已认证、有真实营业额的采购商，绝非虚假账户。",
  },
  {
    icon: "🆓",
    title: "验厂与入驻免费",
    desc: "广州团队亲赴工厂验厂，并替您整理资料。",
  },
  {
    icon: "💼",
    title: "0% 上架费",
    desc: "成交才付 5% 佣金——无隐藏费用，无订阅费。",
  },
  {
    icon: "🌐",
    title: "越南语营销",
    desc: "内容团队撰写落地页、翻译目录、向越南采购商投放广告。",
  },
];

const STEPS = [
  { n: 1, title: "提交资料", desc: "5 分钟表单 + 宣传册 / 目录（PDF）" },
  { n: 2, title: "线上面谈", desc: "与 QC 团队 30 分钟视频通话——核实生产能力" },
  { n: 3, title: "实地验厂", desc: "广州团队赴厂 1 天——拍照、录像、收集资料" },
  { n: 4, title: "入驻上架", desc: "创建档案 + 10 款主打产品，一对一培训" },
  { n: 5, title: "上线 & 首张询价", desc: "自提交资料起平均 30 天" },
];

const FAQ = [
  {
    q: "我需要支付任何费用吗？",
    a: "不需要。注册、验厂、入驻、托管、营销——全部免费。华越仅在订单成交时收取 5% 佣金。",
  },
  {
    q: "验厂需要多久？",
    a: "实地 1 天 + 出报告 3-5 天。从预约到拿到验厂报告，总计约 7-10 天。",
  },
  {
    q: "我需要懂越南语吗？",
    a: "不需要。广州团队讲中文，处理与越南采购商的所有交易。您只需专注于生产。",
  },
  {
    q: "已有多少家工厂上线？",
    a: "截至 2025 Q4 已有 40+ 家已认证工厂，平均每季度新增 8-12 家。",
  },
];

export default function RegisterFactoryPage() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "首页", href: "/" },
          { label: "入驻 CSR", href: "/sell-on-csr" },
          { label: "工厂注册" },
        ]}
      />
      <div className="max-w-[1200px] mx-auto px-4 mt-6 mb-10">
        {/* HEADER BANNER */}
        <div
          className="rounded text-white px-7 py-6 mb-5 grid grid-cols-[1fr_auto] gap-5 items-center max-md:grid-cols-1 max-md:px-5 max-md:py-4"
          style={{ background: "linear-gradient(135deg, #003A42 0%, #001F26 100%)" }}
        >
          <div>
            <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2.5">
              🏭 供应商注册
            </span>
            <h1 className="text-[26px] font-extrabold leading-tight mb-1.5 max-md:text-[22px]">
              在 <span className="text-gold">Huayuesc</span> 注册工厂
            </h1>
            <p className="text-[13px] opacity-90 leading-relaxed max-w-[680px]">
              触达 600+ 家正在主动寻找中国供应商的越南经销商。免费实地验厂、一对一入驻、无上架费，成交才付 5% 佣金。
            </p>
          </div>
          <div className="flex flex-col gap-2 text-[12px] opacity-90 min-w-[200px]">
            <div className="flex justify-between">
              <span>🏭 已认证供应商</span>
              <b>40+</b>
            </div>
            <div className="flex justify-between">
              <span>📦 月询价量</span>
              <b>1,200+</b>
            </div>
            <div className="flex justify-between">
              <span>💰 2025 年 GMV</span>
              <b>$8.2M</b>
            </div>
            <div className="flex justify-between">
              <span>⏱ 上线周期</span>
              <b>约 30 天</b>
            </div>
          </div>
        </div>

        {/* VALUE PROPS */}
        <div className="grid grid-cols-4 gap-3 mb-5 max-md:grid-cols-2">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className="bg-paper border border-line rounded p-3.5">
              <div className="text-[26px] mb-1.5">{v.icon}</div>
              <b className="block text-[13px] text-ink mb-1">{v.title}</b>
              <p className="text-[11.5px] text-mute leading-snug">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_320px] gap-6 max-md:grid-cols-1">
          {/* === LEFT: form ============================================== */}
          <div className="bg-paper border border-line rounded p-6 max-md:p-4">
            {/* Quick OAuth signup */}
            <div className="mb-5">
              <p className="text-[12.5px] text-mute mb-2.5">
                ⚡ 用公司账户快速开始：
              </p>
              <div className="grid grid-cols-3 gap-2">
                {LOGIN_PROVIDERS.map((p) => (
                  <Link
                    key={p.name}
                    href={`/register/oauth/${p.name.toLowerCase()}?role=supplier`}
                    className="flex items-center justify-center gap-2 py-2.5 border border-line rounded-sm text-[12.5px] font-semibold text-ink cursor-pointer hover:border-brand hover:bg-bg"
                    aria-label={`使用 ${p.name} 注册`}
                  >
                    <span className="flex-shrink-0">{p.icon}</span>
                    <span>{p.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-line" />
              <span className="text-[10.5px] text-mute2 uppercase tracking-wider">
                或填写详细资料
              </span>
              <div className="flex-1 h-px bg-line" />
            </div>

            <form action="/sell-on-csr" method="get" className="space-y-4">
              {/* Section: Company info */}
              <div>
                <b className="block text-[12px] uppercase tracking-wider text-brand mb-2">
                  ① 公司信息
                </b>
                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                  <div className="col-span-2">
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      公司名称 <span className="text-accent">*</span>
                    </label>
                    <input
                      name="company"
                      required
                      placeholder="Foshan ABC Industrial Co., Ltd."
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      成立年份 <span className="text-accent">*</span>
                    </label>
                    <input
                      name="founded"
                      type="number"
                      placeholder="2010"
                      required
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      经营类型 <span className="text-accent">*</span>
                    </label>
                    <select
                      name="businessType"
                      required
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                    >
                      <option>制造商</option>
                      <option>制造商 + 贸易</option>
                      <option>贸易公司</option>
                      <option>分销商/代理</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      省 / 市 <span className="text-accent">*</span>
                    </label>
                    <select
                      name="province"
                      required
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                    >
                      <option value="">-- 选择省份 --</option>
                      <option>Foshan, Guangdong</option>
                      <option>Guangzhou, Guangdong</option>
                      <option>Shenzhen, Guangdong</option>
                      <option>Dongguan, Guangdong</option>
                      <option>Hangzhou, Zhejiang</option>
                      <option>Ningbo, Zhejiang</option>
                      <option>Taizhou, Zhejiang</option>
                      <option>Yiwu, Zhejiang</option>
                      <option>Shanghai</option>
                      <option>Tianjin</option>
                      <option>其他</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      员工人数
                    </label>
                    <select
                      name="employees"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                    >
                      <option>&lt; 100</option>
                      <option>100 – 500</option>
                      <option>500 – 2000</option>
                      <option>&gt; 2000</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section: Production capability */}
              <div className="pt-3 border-t border-line">
                <b className="block text-[12px] uppercase tracking-wider text-brand mb-2">
                  ② 生产能力
                </b>
                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      工厂面积（㎡）
                    </label>
                    <input
                      name="area"
                      type="number"
                      placeholder="50000"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      月产能
                    </label>
                    <input
                      name="capacity"
                      placeholder="例：200,000 件/月"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      典型起订量
                    </label>
                    <input
                      name="moq"
                      placeholder="例：500 件 / 50 千克 / 1×20 集装箱"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      平均交货周期
                    </label>
                    <select
                      name="leadTime"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                    >
                      <option>7–15 天</option>
                      <option>15–30 天</option>
                      <option>30–45 天</option>
                      <option>45–60 天</option>
                      <option>&gt; 60 天</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      主营产品 <span className="text-accent">*</span>{" "}
                      <span className="text-mute2 font-normal text-[11px]">（可多选）</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2">
                      {NAV_CATEGORIES.map((c) => (
                        <label
                          key={c.slug}
                          className="flex items-center gap-1.5 text-[12px] text-mute cursor-pointer px-2 py-1.5 border border-line rounded-sm hover:border-brand hover:bg-bg"
                        >
                          <input
                            type="checkbox"
                            name="products"
                            value={c.slug}
                            className="accent-brand"
                          />
                          <span className="text-[14px]">{c.icon}</span>
                          <span>{c.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      开始出口年份
                    </label>
                    <input
                      name="exportYear"
                      type="number"
                      placeholder="2015"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      年出口额（美元）
                    </label>
                    <select
                      name="revenue"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                    >
                      <option>&lt; $1M</option>
                      <option>$1M – $10M</option>
                      <option>$10M – $50M</option>
                      <option>&gt; $50M</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      现有认证{" "}
                      <span className="text-mute2 font-normal text-[11px]">（可多选）</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2 max-md:grid-cols-2">
                      {[
                        "ISO 9001",
                        "ISO 14001",
                        "BSCI",
                        "Sedex",
                        "CE",
                        "RoHS",
                        "FDA",
                        "其他",
                      ].map((cert) => (
                        <label
                          key={cert}
                          className="flex items-center gap-1.5 text-[12px] text-mute cursor-pointer px-2 py-1.5 border border-line rounded-sm hover:border-brand hover:bg-bg"
                        >
                          <input
                            type="checkbox"
                            name="cert"
                            value={cert}
                            className="accent-brand"
                          />
                          <span>{cert}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Contact + documents */}
              <div className="pt-3 border-t border-line">
                <b className="block text-[12px] uppercase tracking-wider text-brand mb-2">
                  ③ 联系与资料
                </b>
                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      联系人 <span className="text-accent">*</span>
                    </label>
                    <input
                      name="contactName"
                      required
                      placeholder="工厂联系人姓名"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      职务
                    </label>
                    <input
                      name="contactRole"
                      placeholder="Sales Manager / Export Director"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      邮箱 <span className="text-accent">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="export@company.com"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      微信/WhatsApp
                    </label>
                    <input
                      name="im"
                      placeholder="微信号或 WhatsApp 号码"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      上传能力资料（PDF、宣传册、目录）
                    </label>
                    <div className="border-2 border-dashed border-line rounded p-5 text-center text-[12.5px] text-mute hover:border-brand cursor-pointer">
                      📎 点击或拖放 PDF、ZIP 文件——最大 20MB
                      <br />
                      <small className="text-[11px] text-mute2">
                        建议：产品目录 + 营业执照 + 工厂照片
                      </small>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                      现有网站（如有）
                    </label>
                    <input
                      name="website"
                      type="url"
                      placeholder="https://yourcompany.com"
                      className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-2 text-[12px] text-mute mt-4">
                <input type="checkbox" required className="accent-brand mt-0.5" />
                <span>
                  同意华越进行实地验厂，并同意{" "}
                  <Link
                    href="/info/terms-of-service"
                    className="text-brand cursor-pointer hover:underline"
                  >
                    供应商条款
                  </Link>
                  （成交订单收取 5% 佣金）。
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 bg-brand text-white rounded-sm font-bold text-[14px] cursor-pointer hover:bg-brand-light mt-3"
              >
                提交工厂注册 →
              </button>
              <p className="text-[12px] text-mute text-center">
                已有账户？{" "}
                <Link href="/login" className="text-brand font-semibold cursor-pointer hover:underline">
                  登录
                </Link>
              </p>
            </form>
          </div>

          {/* === RIGHT: side info ======================================== */}
          <aside className="space-y-4 self-start">
            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[14px] font-bold text-ink mb-3">📋 5 步流程</b>
              <ol className="space-y-3">
                {STEPS.map((s) => (
                  <li key={s.n} className="flex gap-2.5">
                    <span className="w-6 h-6 flex-shrink-0 rounded-full bg-brand text-white text-[12px] font-bold flex items-center justify-center">
                      {s.n}
                    </span>
                    <div>
                      <b className="block text-[12.5px] text-ink">{s.title}</b>
                      <p className="text-[11px] text-mute leading-snug">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[14px] font-bold text-ink mb-3">❓ 简明 FAQ</b>
              <div className="space-y-3">
                {FAQ.map((f) => (
                  <details key={f.q} className="group">
                    <summary className="flex justify-between items-start gap-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <b className="text-[12.5px] text-ink leading-snug">{f.q}</b>
                      <span className="text-mute text-[11px] group-open:rotate-180 transition-transform flex-shrink-0">
                        ▾
                      </span>
                    </summary>
                    <p className="text-[11.5px] text-mute leading-relaxed mt-1.5">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div
              className="rounded p-4 text-white"
              style={{ background: "linear-gradient(135deg,#005F6B,#003A42)" }}
            >
              <b className="block text-[14px] font-bold mb-1">💬 想先咨询？</b>
              <p className="text-[11.5px] opacity-90 leading-snug mb-2.5">
                广州团队随时可视频通话（中文）。
              </p>
              <div className="text-[11.5px] opacity-90 space-y-1">
                <div>📞 +86 20 1234 5678</div>
                <div>📧 supplier@alibabavn.com</div>
                <div>💬 WeChat: alibabavn_sup</div>
              </div>
            </div>

            <div className="bg-paper border border-line rounded p-4">
              <b className="block text-[12.5px] text-ink mb-1">🛍 您是采购商？</b>
              <p className="text-[11.5px] text-mute leading-snug mb-2">
                注册采购商，发送询价并获得免费验厂。
              </p>
              <Link
                href="/register/buyer"
                className="text-[12px] text-brand font-semibold cursor-pointer hover:underline"
              >
                采购商注册 →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "工厂注册 — 华越供应链" };
