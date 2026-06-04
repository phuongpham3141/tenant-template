import Link from "next/link";
import type { Factory, Product } from "@/data/home";
import { Vr360Frame } from "./Vr360Frame";

const CERTS = ["CE", "ISO 9001", "BSCI", "Sedex", "FSC", "RoHS"];

const TABS: { n: 1 | 2 | 3 | 4 | 5 | 6 | 7; label: string; icon: string }[] = [
  { n: 1, label: "供应商主页", icon: "🏠" },
  { n: 7, label: "AI 助手", icon: "🤖" },
  { n: 6, label: "360° 全景", icon: "🎬" },
  { n: 2, label: "产品", icon: "📦" },
  { n: 3, label: "公司简介", icon: "🏢" },
  { n: 4, label: "生产能力", icon: "🏭" },
  { n: 5, label: "联系", icon: "📞" },
];

export function SupplierDetail({
  factory: f,
  heroProducts,
  ownProducts,
  allProducts,
}: {
  factory: Factory;
  heroProducts: Product[];
  ownProducts: Product[];
  allProducts: Product[];
}) {
  const foundedYear = 2026 - parseInt(f.badges.years);
  const productList = ownProducts.length > 0 ? ownProducts : allProducts.slice(0, 24);
  // Per-supplier unique radio name to avoid collision when multiple supplier
  // pages are pre-rendered. Default checked = tab 1 (supplier home).
  const radioName = `sup-${f.slug}`;

  return (
    <div className="sup-root">
      {/* Hidden radios — drive tab + panel visibility via :has() */}
      {TABS.map((t) => (
        <input
          key={`r-${t.n}`}
          type="radio"
          name={radioName}
          id={`${radioName}-${t.n}`}
          defaultChecked={t.n === 1}
          className={`hidden sup-radio-${t.n}`}
        />
      ))}

      {/* Banner */}
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[220px] bg-brand-dark">
          <img src={`/img/${f.slug}-cover.jpg?v=5`} alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 px-7 py-6 flex items-end gap-5 text-white" style={{ background: "linear-gradient(transparent 30%, rgba(0,37,87,0.95))" }}>
            <div className="w-20 h-20 bg-white border-4 border-gold rounded flex items-center justify-center font-extrabold text-[28px] text-brand flex-shrink-0">
              {f.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {f.badges.gold && <span className="bg-gold text-brand-dark text-[10px] px-2 py-0.5 rounded-sm font-bold">金牌供应商</span>}
                {f.badges.audited && <span className="bg-success text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">已验厂</span>}
                <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">{f.badges.years}</span>
                <span className="text-[12.5px] text-gold">★ {f.rating} ({f.reviews} 条评价)</span>
              </div>
              <h1 className="text-[26px] font-extrabold leading-tight max-md:text-[20px]">{f.name}</h1>
              <div className="text-[12.5px] opacity-90 flex items-center gap-3 flex-wrap mt-1">
                <span><span className="cn-flag" /> {f.location}</span>
                <span>•</span>
                <span><b className="text-gold">{f.meta}</b></span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs nav — labels styled as buttons, click toggles radio */}
        <div className="flex gap-0 border-b border-line bg-paper mt-0 px-4 overflow-x-auto" role="tablist">
          {TABS.map((t) => (
            <label
              key={t.n}
              htmlFor={`${radioName}-${t.n}`}
              role="tab"
              className={`sup-tab sup-tab-${t.n} px-4 py-3 text-[13px] cursor-pointer border-b-2 -mb-px whitespace-nowrap transition`}
            >
              <span className="mr-1.5">{t.icon}</span>
              {t.label}
            </label>
          ))}
        </div>
      </div>

      {/* All 5 panels rendered server-side — CSS shows only the active one */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5 grid grid-cols-[1fr_340px] gap-5 max-md:grid-cols-1">
        <div>
          <div className="sup-panel sup-panel-1">
            <HomeTab f={f} foundedYear={foundedYear} heroProducts={heroProducts} />
          </div>
          <div className="sup-panel sup-panel-2">
            <ProductsTab f={f} products={productList} radioName={radioName} />
          </div>
          <div className="sup-panel sup-panel-3">
            <CompanyTab f={f} foundedYear={foundedYear} />
          </div>
          <div className="sup-panel sup-panel-4">
            <CapacityTab f={f} />
          </div>
          <div className="sup-panel sup-panel-5">
            <ContactTab f={f} />
          </div>
          <div className="sup-panel sup-panel-6">
            <Vr360Tab f={f} />
          </div>
          <div className="sup-panel sup-panel-7">
            <AiTab f={f} foundedYear={foundedYear} />
          </div>
        </div>

        {/* Right sidebar — shared across all tabs */}
        <aside className="space-y-4">
          <div className="bg-paper border border-line rounded overflow-hidden">
            <div className="bg-brand text-white px-4 py-2.5 font-semibold text-[13px]">联系 {f.name}</div>
            <form action="/buying-request" method="get" className="p-4 space-y-2.5">
              <input name="name" placeholder="姓名" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
              <input name="email" type="email" placeholder="邮箱" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
              <input name="phone" placeholder="电话/微信" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
              <textarea name="q" placeholder="详细需求：产品、数量、交期……" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand min-h-[100px] resize-none" />
              <button type="submit" className="w-full py-2.5 bg-accent text-white rounded-sm font-bold text-[13px] hover:opacity-90">📨 发送询价——24 小时内回复</button>
            </form>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-semibold text-ink mb-2">主营标签</b>
            <div className="flex gap-1 flex-wrap">
              {f.tags.map((t) => (
                <span key={t} className="text-[11px] bg-[#F5F5F5] text-mute px-2 py-1 rounded-sm">{t}</span>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-semibold text-ink mb-2">🛡 交易保障</b>
            <ul className="space-y-1.5 text-[12px] text-mute leading-relaxed">
              <li>✓ 交易保障——不符 100% 退款</li>
              <li>✓ 担保账户 VCB · BIDV · 中国银行</li>
              <li>✓ 出厂前验货（AQL 2.5）</li>
              <li>✓ 运输保险 110% 货值</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* =================================================================== */
/* TAB 1 — SUPPLIER HOME                                               */
/* =================================================================== */
function HomeTab({ f, foundedYear, heroProducts }: { f: Factory; foundedYear: number; heroProducts: Product[] }) {
  return (
    <>
      <div className="bg-paper border border-line rounded p-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">关于 {f.name}</h2>
        <div className="text-[13px] text-ink leading-relaxed space-y-3">
          <p>{f.name} 成立于 {foundedYear} 年，在 {f.tags.join("、")} 领域拥有逾 {f.badges.years} 经验。工厂位于 {f.location}，是中国最大的工业中心之一。</p>
          <p>目前，{f.name} 拥有 3 处生产基地，总面积逾 200,000 ㎡，员工 1,500 余人，研发团队 80 名工程师。产能 {f.meta}，可承接来自 50 个国家的订单。</p>
          <p>主要客户包括北美、欧洲、东南亚的知名品牌。在越南，自 2018 年起通过华越与逾 80 家经销商合作，并由我们的团队每年验厂 2 次。</p>
          <p>工厂支持按图纸 OEM/ODM，起订量灵活，最低 50 件起，标准交货周期 25 天，经凭祥仓 DDP 运输至越南。</p>
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">主要信息</h2>
        <div className="grid grid-cols-3 gap-4 text-[13px] max-md:grid-cols-2">
          {[
            ["工厂面积", "200,000 ㎡"],
            ["员工人数", "1,500+"],
            ["成立年份", `${foundedYear}`],
            ["营业额", "$120M/年"],
            ["出口额", "$80M/年（66%）"],
            ["主要市场", "VN, US, EU, JP, KR"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-[11.5px] text-mute uppercase tracking-wider">{k}</div>
              <b className="block text-ink mt-1">{v}</b>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-4 max-md:grid-cols-2">
        {[
          { icon: "🥇", title: "金牌供应商", desc: f.badges.gold ? `连续 ${f.badges.years}` : "已验厂" },
          { icon: "✅", title: "已认证", desc: "已实地验厂" },
          { icon: "📦", title: "按时交货", desc: "98.5% 准时率" },
          { icon: "🛡", title: "交易保障", desc: "100% 保护" },
        ].map((b) => (
          <div key={b.title} className="bg-paper border border-line rounded p-3 text-center">
            <div className="text-[28px]">{b.icon}</div>
            <b className="block text-[12.5px] text-ink mt-1">{b.title}</b>
            <div className="text-[11px] text-mute">{b.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">主打产品</h2>
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
          {heroProducts.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand block">
              <div className="aspect-square bg-[#F5F5F5]">
                {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="p-2.5">
                <h4 className="text-[12px] text-ink line-clamp-2 mb-1">{p.title}</h4>
                <div className="text-accent font-bold text-[13px]">{p.price}<small className="text-mute font-normal text-[10px]">{p.unit}</small></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">生产线</h2>
        <div className="grid grid-cols-4 gap-2 max-md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-video bg-[#F5F5F5] rounded overflow-hidden">
              <img src={`/img/${f.slug}-line-${i}.jpg?v=5`} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">认证</h2>
        <div className="flex gap-3 flex-wrap">
          {CERTS.map((c) => (
            <div key={c} className="px-4 py-2 bg-paper border border-line rounded-sm text-[12.5px] font-semibold text-ink">
              ✓ {c}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* =================================================================== */
/* TAB 2 — PRODUCTS                                                    */
/* =================================================================== */
function ProductsTab({ f, products, radioName }: { f: Factory; products: Product[]; radioName: string }) {
  const categories = ["全部", ...Array.from(new Set(products.flatMap((p) => p.tags ?? []))).slice(0, 6)];
  return (
    <div className="bg-paper border border-line rounded p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-[18px] font-bold text-ink">产品目录</h2>
          <p className="text-[12px] text-mute mt-0.5">已上架 {products.length} 款产品——每周更新</p>
        </div>
        <div className="text-[12px] text-mute">
          <span>📊 已售：<b className="text-ink">42,000+ 件</b></span>
          <span className="ml-3">⭐ 平均评分：<b className="text-ink">{f.rating}</b></span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-4 pb-3 border-b border-line">
        {categories.map((c, i) => (
          <span
            key={c}
            className={`text-[11.5px] px-3 py-1.5 rounded-sm cursor-pointer ${
              i === 0 ? "bg-brand text-white font-semibold" : "bg-bg border border-line text-mute hover:border-brand"
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2">
        {products.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand transition block">
            <div className="aspect-square bg-[#F5F5F5] relative">
              {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
              {p.badges?.includes("new") && (
                <span className="absolute top-1.5 left-1.5 bg-success text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold">新品</span>
              )}
              {p.badges?.includes("top") && (
                <span className="absolute top-1.5 left-1.5 bg-gold text-brand-dark text-[9px] px-1.5 py-0.5 rounded-sm font-bold">热销</span>
              )}
            </div>
            <div className="p-2.5">
              <h4 className="text-[12px] text-ink line-clamp-2 mb-1 min-h-[32px]">{p.title}</h4>
              <div className="text-accent font-bold text-[13px]">
                {p.price}<small className="text-mute font-normal text-[10px]">{p.unit}</small>
              </div>
              <div className="text-[10.5px] text-mute mt-1 flex justify-between">
                <span>{p.moq}</span>
                <span>★{p.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 max-md:grid-cols-1">
        <div className="bg-bg border border-line rounded p-3.5">
          <b className="block text-[13px] text-ink mb-1">📦 起订量灵活</b>
          <p className="text-[12px] text-mute leading-snug">
            最低起订量 50 件起。可多 SKU 组合凑足起订量。按数量阶梯（200、500、1,000）享 5-12% 折扣。
          </p>
        </div>
        <div className="bg-bg border border-line rounded p-3.5">
          <b className="block text-[13px] text-ink mb-1">🧪 起订前先打样</b>
          <p className="text-[12px] text-mute leading-snug">
            $50-200/样，下单达到起订量时 100% 抵扣。经广州样品中心 8-12 天运至越南。
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <label
          htmlFor={`${radioName}-5`}
          className="px-6 py-2.5 bg-brand text-white rounded-sm text-[13px] font-bold hover:bg-brand-light cursor-pointer"
        >
          📨 发送多 SKU 询价 →
        </label>
      </div>
    </div>
  );
}

/* =================================================================== */
/* TAB 3 — COMPANY PROFILE                                             */
/* =================================================================== */
function CompanyTab({ f, foundedYear }: { f: Factory; foundedYear: number }) {
  const milestones = [
    { y: foundedYear, t: "成立", d: `在 ${f.location.split(",")[0]} 由 12 名工人的小作坊起步创业。` },
    { y: foundedYear + 3, t: "第二基地", d: "扩建第二处生产基地——总面积突破 50,000 ㎡。" },
    { y: foundedYear + 6, t: "首次出口", d: "首张出口至欧盟的订单——获得 CE/RoHS 认证。" },
    { y: foundedYear + 9, t: "携手华越", d: "成为战略合作伙伴，获得已验厂 + 金牌徽章。" },
    { y: 2025, t: "拓展东盟", d: "越南营业额突破 $8M/年——成为公司东盟市场前三。" },
  ];

  const leaders = [
    { name: "Wang Lei", role: "CEO & Founder", initials: "WL", years: f.badges.years },
    { name: "Li Mei", role: "首席运营官（COO）", initials: "LM", years: "12 年" },
    { name: "Zhang Wei", role: "研发总监", initials: "ZW", years: "8 年" },
    { name: "阮秋河", role: "越南代表处负责人", initials: "NH", years: "5 年" },
  ];

  return (
    <>
      <div className="bg-paper border border-line rounded p-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">{f.name} 企业简介</h2>
        <p className="text-[13px] text-ink leading-relaxed mb-4">
          {f.name} 是一家专业从事 {f.tags.join("、")} 制造的民营企业，拥有 {f.badges.years} 经验。总部位于 {f.location}，公司已从一家小作坊发展为拥有 3 处生产基地、1,500 余名工人、覆盖 50 个国家分销网络的集团。
        </p>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          <div className="bg-bg border border-line rounded p-3">
            <b className="block text-[10.5px] uppercase tracking-wider text-mute mb-1">工商信息</b>
            <ul className="text-[12.5px] text-ink space-y-1">
              <li>• 中国统一社会信用代码：<b>91440605MA****</b></li>
              <li>• 注册资本：<b>5,000 万元人民币</b></li>
              <li>• 企业类型：<b>有限责任公司</b></li>
              <li>• 进出口备案：<b>GACC + AEO</b></li>
            </ul>
          </div>
          <div className="bg-bg border border-line rounded p-3">
            <b className="block text-[10.5px] uppercase tracking-wider text-mute mb-1">财务</b>
            <ul className="text-[12.5px] text-ink space-y-1">
              <li>• 2025 年营业额：<b>$1.2 亿</b></li>
              <li>• 同比增长：<b>+18%</b></li>
              <li>• 出口占比：<b>66%</b></li>
              <li>• 天眼查信用评分：<b>92/100</b></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-4">发展历程</h2>
        <div className="relative pl-6">
          <div className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-line" />
          {milestones.map((m, i) => (
            <div key={i} className="relative mb-4 last:mb-0">
              <div className="absolute -left-[1.4rem] top-0.5 w-4 h-4 rounded-full bg-brand border-2 border-paper" />
              <div className="flex items-baseline gap-2 mb-1">
                <b className="text-[14px] text-brand">{m.y}</b>
                <b className="text-[13.5px] text-ink">{m.t}</b>
              </div>
              <p className="text-[12.5px] text-mute leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">管理团队</h2>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {leaders.map((l) => (
            <div key={l.name} className="bg-bg border border-line rounded p-3 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-[16px] mb-2">
                {l.initials}
              </div>
              <b className="block text-[13px] text-ink">{l.name}</b>
              <div className="text-[11px] text-mute mt-0.5">{l.role}</div>
              <div className="text-[10.5px] text-mute2 mt-1">{l.years} 经验</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[15px] font-bold text-ink mb-3">🏆 奖项与荣誉</h3>
          <ul className="space-y-1.5 text-[12.5px] text-ink">
            <li>• 2024 中国 {f.tags[0]} 制造商百强</li>
            <li>• 2023 CIFF 创新设计奖</li>
            <li>• 2022 广东省优秀出口企业</li>
            <li>• 高新技术企业认证</li>
            <li>• 佛山值得信赖品牌 50 强</li>
          </ul>
        </div>
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[15px] font-bold text-ink mb-3">🤝 协会会员</h3>
          <ul className="space-y-1.5 text-[12.5px] text-ink">
            <li>• 中国国际贸易促进委员会（CCPIT）</li>
            <li>• 中国 {f.tags[0]} 协会</li>
            <li>• 佛山国际商会</li>
            <li>• 自 2018 年起华越官方合作伙伴</li>
          </ul>
        </div>
      </div>
    </>
  );
}

/* =================================================================== */
/* TAB 4 — PRODUCTION CAPACITY                                         */
/* =================================================================== */
function CapacityTab({ f }: { f: Factory }) {
  return (
    <>
      <div className="bg-paper border border-line rounded p-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">{f.name} 生产能力</h2>
        <p className="text-[13px] text-ink leading-relaxed mb-4">
          位于 {f.location} 的 3 处生产基地，总面积逾 200,000 ㎡。12 条自动化生产线 + 4 个 QC 检验室 + 2 个研发室。产能 {f.meta}，可承接来自 50 个国家的订单。
        </p>
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
          {[
            { n: "200K ㎡", l: "总面积", icon: "🏭" },
            { n: "1,500+", l: "工人", icon: "👷" },
            { n: "12", l: "自动化生产线", icon: "🔧" },
            { n: "80", l: "研发工程师", icon: "🧪" },
          ].map((s) => (
            <div key={s.l} className="bg-bg border border-line rounded p-3 text-center">
              <div className="text-[22px]">{s.icon}</div>
              <b className="block text-[18px] font-extrabold text-brand mt-1">{s.n}</b>
              <div className="text-[11px] text-mute">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">生产线</h2>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {[
            { n: 1, name: "主生产线", capacity: "12,000 件/月", auto: "85% 自动化", staff: "120 名工人" },
            { n: 2, name: "OEM 定制生产线", capacity: "3,000 件/月", auto: "60% 自动化", staff: "85 名工人" },
            { n: 3, name: "高端生产线", capacity: "1,500 件/月", auto: "手工", staff: "45 名工匠" },
            { n: 4, name: "研发/新样生产线", capacity: "200 件/月", auto: "手工", staff: "20 名工程师" },
          ].map((l) => (
            <div key={l.n} className="bg-bg border border-line rounded p-3 flex gap-3">
              <div className="aspect-video w-32 flex-shrink-0 bg-[#F5F5F5] rounded overflow-hidden">
                <img src={`/img/${f.slug}-line${l.n}.jpg?v=5`} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <b className="block text-[13px] text-ink">{l.n} 号线 — {l.name}</b>
                <div className="text-[11.5px] text-mute mt-1 space-y-0.5">
                  <div>📦 产能：<b className="text-ink">{l.capacity}</b></div>
                  <div>⚙️ 自动化程度：<b className="text-ink">{l.auto}</b></div>
                  <div>👷 人力：<b className="text-ink">{l.staff}</b></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">机器与设备</h2>
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
          {[
            { n: "12 台", t: "五轴 CNC", brand: "DMG Mori（德国）" },
            { n: "8 台", t: "焊接/激光切割机器人", brand: "FANUC（日本）" },
            { n: "6 台", t: "自动喷涂", brand: "Wagner（德国）" },
            { n: "4 条线", t: "自动包装", brand: "Bosch（德国）" },
            { n: "20 台", t: "工业缝纫机", brand: "JUKI（日本）" },
            { n: "10 台", t: "液压压力机", brand: "Schuler（德国）" },
          ].map((m, i) => (
            <div key={i} className="bg-bg border border-line rounded p-3">
              <b className="block text-[15px] text-brand">{m.n}</b>
              <div className="text-[12.5px] text-ink mt-0.5">{m.t}</div>
              <div className="text-[11px] text-mute mt-1">{m.brand}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">质量控制（QC）体系</h2>
        <div className="space-y-3">
          {[
            { stage: "1. 来料检验（IQC）", desc: "100% 检验每批原料。独立 QC 室配备 XRF 光谱仪、水分仪、力学性能测试实验室。留样 18 个月。" },
            { stage: "2. 制程检验（IPQC）", desc: "沿生产线 5 个工位检验。抽样按 AQL 2.5。早期发现缺陷——次品率降至 <0.8%。" },
            { stage: "3. 成品检验（FQC）", desc: "包装前 100% 检验。用电子卡尺测量尺寸，用光泽度仪检查表面处理，进行功能测试。" },
            { stage: "4. 出货前检验（Pre-shipment）", desc: "华越验货员对每张 ≥$5K 的订单按 AQL 2.5 独立验货。4 小时内向采购商发送 PDF 报告 + 100+ 张照片 + 视频。" },
          ].map((q, i) => (
            <div key={i} className="border-l-4 border-brand bg-bg pl-4 py-2.5">
              <b className="block text-[13px] text-ink">{q.stage}</b>
              <p className="text-[12px] text-mute mt-0.5 leading-relaxed">{q.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[15px] font-bold text-ink mb-3">🧪 研究与开发</h3>
          <ul className="space-y-1.5 text-[12.5px] text-ink">
            <li>• 80 名全职研发工程师</li>
            <li>• 研发投入：<b>占营业额 4.5%</b></li>
            <li>• 已授权专利 47 项</li>
            <li>• 每季度推出 12 款新品</li>
            <li>• 3D 设计实验室 + 工业级 3D 打印机</li>
          </ul>
        </div>
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[15px] font-bold text-ink mb-3">🌱 可持续与环保</h3>
          <ul className="space-y-1.5 text-[12.5px] text-ink">
            <li>• ISO 14001——环境管理</li>
            <li>• 厂房屋顶太阳能——满足 30% 用电需求</li>
            <li>• 废水循环处理系统</li>
            <li>• 废料回收率：<b>92%</b></li>
            <li>• 木材FSC产销监管链认证</li>
          </ul>
        </div>
      </div>
    </>
  );
}

/* =================================================================== */
/* TAB 5 — CONTACT                                                     */
/* =================================================================== */
function ContactTab({ f }: { f: Factory }) {
  return (
    <>
      <div className="bg-paper border border-line rounded p-5">
        <h2 className="text-[18px] font-bold text-ink mb-2">联系 {f.name}</h2>
        <p className="text-[13px] text-mute leading-relaxed">
          所有沟通均通过华越进行，享受交易保障+中越自动翻译。专属客户经理在工作时间内 <b className="text-ink">30分钟内</b> 回复。
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-5">
          <span className="inline-block text-[10.5px] uppercase tracking-wider font-bold bg-brand/10 text-brand px-2 py-0.5 rounded-sm mb-2">
            🇨🇳 总部
          </span>
          <h3 className="text-[15px] font-bold text-ink mb-1">{f.name}</h3>
          <p className="text-[12.5px] text-mute leading-relaxed mb-3">
            主生产楼，天河工业园区，{f.location}
          </p>
          <ul className="space-y-1 text-[12px] text-ink">
            <li>📞 热线：<b>+86 757 8888 1234</b></li>
            <li>💬 微信/WhatsApp：<b>+86 138 0000 1234</b></li>
            <li>✉ 邮箱：<b>sales@{f.slug.replace(/-/g, "")}.com.cn</b></li>
            <li>🕒 工作时间：<b>周一至周六，8:30-18:00 (GMT+8)</b></li>
            <li>🌐 语言：<b>中文、英文，经CSR翻译可提供越南语</b></li>
          </ul>
        </div>

        <div className="bg-paper border border-line rounded p-5">
          <span className="inline-block text-[10.5px] uppercase tracking-wider font-bold bg-gold/15 text-[#9C6A1F] px-2 py-0.5 rounded-sm mb-2">
            🇻🇳 越南代表处
          </span>
          <h3 className="text-[15px] font-bold text-ink mb-1">华越河内办事处</h3>
          <p className="text-[12.5px] text-mute leading-relaxed mb-3">
            河内市纸桥郡黎文良街48号Diamond Flower大厦21层
          </p>
          <ul className="space-y-1 text-[12px] text-ink">
            <li>📞 热线：<b>1900 6688</b>（越南境内免费）</li>
            <li>💬 Zalo：<b>+84 24 3556 7788</b></li>
            <li>✉ 邮箱：<b>vn-{f.slug}@huayuesc.vn</b></li>
            <li>🕒 工作时间：<b>周一至周五，8:30-18:00 (GMT+7)</b></li>
            <li>🌐 语言：<b>越南语，可翻译为中文</b></li>
          </ul>
        </div>
      </div>

      <div className="bg-paper border-2 border-brand rounded p-5 mt-4">
        <div className="flex items-start gap-4 max-md:flex-col">
          <div className="w-16 h-16 rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-[20px] flex-shrink-0">
            NH
          </div>
          <div className="flex-1">
            <span className="inline-block text-[10.5px] uppercase tracking-wider font-bold bg-brand text-white px-2 py-0.5 rounded-sm mb-1">
              专属客户经理
            </span>
            <h3 className="text-[16px] font-bold text-ink mt-1">阮秋河</h3>
            <p className="text-[12px] text-mute">采购专员 · {f.tags[0]} 专业 5 年</p>
            <p className="text-[12.5px] text-ink mt-2 leading-relaxed">
              阮秋河负责 {f.name} 的越南经销渠道——从产品咨询、价格谈判、生产跟进到争议处理。工作时间内通过 Zalo / 邮箱 30 分钟内回复。
            </p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <a href="tel:19006688" className="px-3 py-1.5 bg-brand text-white rounded-sm text-[12px] font-semibold hover:bg-brand-light">📞 立即致电</a>
              <a href="https://zalo.me/huayuesc" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-[#0068FF] text-white rounded-sm text-[12px] font-semibold hover:opacity-90">💬 Zalo聊天</a>
              <a href="mailto:hr@huayuesc.vn" className="px-3 py-1.5 border border-line text-ink rounded-sm text-[12px] font-semibold hover:border-brand">✉ 邮箱</a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-4 hover:border-brand transition cursor-pointer">
          <div className="text-[28px] mb-2">📨</div>
          <b className="block text-[13px] text-ink mb-1">发送询价</b>
          <p className="text-[11.5px] text-mute leading-snug mb-2">60秒表单——24小时内回复。附规格、数量、交期。</p>
          <Link href="/buying-request" className="text-[12px] text-brand font-semibold hover:underline">打开询价表单→</Link>
        </div>
        <div className="bg-paper border border-line rounded p-4 hover:border-brand transition cursor-pointer">
          <div className="text-[28px] mb-2">🎥</div>
          <b className="block text-[13px] text-ink mb-1">预约视频通话</b>
          <p className="text-[11.5px] text-mute leading-snug mb-2">与销售部+车间实时视频通话（提供中越同声传译）。</p>
          <Link href="/buyer-center/meet-suppliers" className="text-[12px] text-brand font-semibold hover:underline">预约→</Link>
        </div>
        <div className="bg-paper border border-line rounded p-4 hover:border-brand transition cursor-pointer">
          <div className="text-[28px] mb-2">🏭</div>
          <b className="block text-[13px] text-ink mb-1">实地验厂</b>
          <p className="text-[11.5px] text-mute leading-snug mb-2">越南采购商团由华越团队陪同——费用约$580/4天。</p>
          <Link href="/factory-tour" className="text-[12px] text-brand font-semibold hover:underline">报名→</Link>
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h3 className="text-[15px] font-bold text-ink mb-3">📍 工厂位置</h3>
        <div className="aspect-[16/7] bg-bg border border-line rounded flex items-center justify-center text-mute">
          <div className="text-center">
            <div className="text-[42px] mb-2">🗺</div>
            <p className="text-[13px]">{f.location}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-4 py-2 bg-brand text-white rounded-sm text-[12px] font-bold hover:bg-brand-light"
            >
              🧭 打开Google地图→
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/* =================================================================== */
/* TAB 6 — 360° TOUR                                                   */
/* =================================================================== */
function Vr360Tab({ f }: { f: Factory }) {
  // Default demo comId (OPPEIN) when supplier has no own VR — so the demo is viewable.
  const DEMO_COM_ID = "eKtTcaCAvhrm";
  const comId = f.vr360ComId ?? DEMO_COM_ID;
  const isOwnVr = !!f.vr360ComId;
  const vrUrl = `https://world-port.made-in-china.com/viewVR?comId=${comId}`;

  // Build display name for the logo-cover overlay (strip legal suffixes + long province names)
  const overlayName = f.name
    // Strip leading province / city
    .replace(/^(Guangdong|Guangzhou|Hangzhou|Shenzhen|Foshan|Shanghai|Hong Kong|Taizhou|Dongguan|Ningbo|Beijing|Tianjin)\s+/i, "")
    // Strip trailing parenthetical (e.g. "(HK)")
    .replace(/\s*[(（][^)）]*[)）]\s*$/g, "")
    // Strip legal suffix + trailing dot
    .replace(/\s*,?\s*(Co\.,?\s*Ltd\.?|Co\.\s*Ltd\.?|Co\.,\s*Ltd|Inc\.?|Ltd\.?|Corp\.?|Limited|Holdings|Group)\.?$/gi, "")
    .replace(/\s*,?\s*(Co\.,?\s*Ltd\.?|Co\.\s*Ltd\.?|Co\.,\s*Ltd|Inc\.?|Ltd\.?|Corp\.?|Limited|Holdings|Group)\.?$/gi, "")
    // Clean up extra spaces + characters
    .replace(/\s+/g, " ")
    .replace(/[\s.,;:]+$/g, "")
    .trim()
    .toUpperCase();

  return (
    <>
      {/* Hero intro */}
      <div className="bg-paper border border-line rounded p-5">
        <div className="mb-3">
          <span className="inline-block bg-accent/15 text-accent text-[10.5px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm mb-1">
            🎬 360°虚拟全景
          </span>
          <h2 className="text-[18px] font-bold text-ink">通过 VR 参观 {f.name} 工厂</h2>
          <p className="text-[13px] text-mute mt-1 leading-relaxed">
            无需飞往中国即可身临其境参观工厂。拖动鼠标360°旋转，点击热点查看生产线、成品仓、QC室、客户洽谈室。
          </p>
        </div>

        {!isOwnVr && (
          <div className="bg-gold/10 border border-gold/30 text-[#7C5A1F] rounded p-3 mb-3 text-[12.5px] flex items-start gap-2">
            <span className="text-[18px] flex-shrink-0">ℹ️</span>
            <span>
              <b>这是演示</b>——<b>{f.name}</b> 的专属360°全景正由华越拍摄中。请联系客户经理，准备就绪后将通知您。当前您查看的是示例全景。
            </span>
          </div>
        )}

        {/* VR iframe + 2 overlays + native fullscreen button (kept within Huayuesc) */}
        <Vr360Frame vrUrl={vrUrl} overlayName={overlayName} factoryName={f.name} />

        <p className="text-[11px] text-mute2 italic mt-2 text-center">
          全景由 VR 技术合作伙伴提供 ·{" "}
          {isOwnVr ? "本工厂专属全景" : "演示（该供应商正在筹备专属全景）"}
        </p>
      </div>

      {/* What you can see */}
      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h3 className="text-[15px] font-bold text-ink mb-3">全景中您能看到什么</h3>
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
          {[
            { icon: "🏭", t: "工厂全貌", d: "无人机航拍外景、招牌、大门、集装箱停车区。" },
            { icon: "⚙️", t: "生产线", d: "主要生产工位、运行中的机器、真实的工人。" },
            { icon: "📦", t: "成品仓", d: "仓库规模、出口级包装、贴标、托盘化方式。" },
            { icon: "🔬", t: "QC 室", d: "质量检测设备、材料测试实验室、留样。" },
            { icon: "🎨", t: "样品展厅", d: "成品陈列——便于询价前选定款式。" },
            { icon: "🤝", t: "洽谈室", d: "面对面接待空间——预约与销售部视频通话。" },
          ].map((s) => (
            <div key={s.t} className="bg-bg border border-line rounded p-3">
              <div className="text-[24px] mb-1">{s.icon}</div>
              <b className="block text-[13px] text-ink">{s.t}</b>
              <p className="text-[11.5px] text-mute mt-0.5 leading-snug">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How to use */}
      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h3 className="text-[15px] font-bold text-ink mb-3">操作指南</h3>
        <div className="grid grid-cols-2 gap-4 text-[12.5px] max-md:grid-cols-1">
          <ul className="space-y-1.5 text-ink">
            <li>🖱 <b>拖动鼠标</b> 即可360°旋转视角</li>
            <li>🔍 <b>滚动鼠标</b> 或+/-按钮放大/缩小</li>
            <li>🎯 <b>点击画面中的光点</b> 即可前往其他区域</li>
            <li>🗺 角落的 <b>小地图</b> 帮您定位当前所在位置</li>
          </ul>
          <ul className="space-y-1.5 text-ink">
            <li>📱 <b>在移动设备上</b>：倾斜手机旋转（陀螺仪），或触摸拖动</li>
            <li>🥽 <b>有VR眼镜？</b> 点击底栏的眼镜图标进入VR模式</li>
            <li>⛶ <b>全屏</b>：顶部按钮——体验最佳</li>
            <li>🎧 <b>开启声音</b> 聆听真实的机器声（如有）</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded p-5 text-white mt-4" style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}>
        <div className="flex items-start justify-between gap-4 max-md:flex-col">
          <div>
            <h3 className="text-[16px] font-bold mb-1">想实地看工厂，而不是VR？</h3>
            <p className="text-[12.5px] opacity-90 leading-relaxed">
              华越在广州/深圳/佛山组织4天3夜的实地验厂行程。费用约$580/人，由华越团队+翻译陪同。
            </p>
          </div>
          <Link
            href="/factory-tour"
            className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm text-[13px] font-bold hover:bg-[#E8943A] whitespace-nowrap"
          >
            ✈ 报名实地验厂
          </Link>
        </div>
      </div>
    </>
  );
}

function AiTab({ f, foundedYear }: { f: Factory; foundedYear: number }) {
  const shortName = f.name.split(/\s+/).slice(0, 2).join(" ");
  const yearsExperience = 2026 - foundedYear;
  const tags = f.tags.slice(0, 3).join(", ");

  const conversation: { role: "ai" | "user"; text: string; time: string }[] = [
    {
      role: "ai",
      time: "09:14",
      text: `您好！我是 **CSR AI**——${f.name} 的虚拟助手。我已基于 ${shortName} 的全部目录、价格表、认证及订单历史进行训练。我可以即时回答关于产品、起订量、交期、打样、付款及 OEM/ODM 流程的问题。今天需要什么帮助？`,
    },
    { role: "user", time: "09:15", text: `${shortName} 的主打产品和最低起订量是什么？` },
    {
      role: "ai",
      time: "09:15",
      text: `${shortName} 在 ${f.location.split(" · ")[0]} 拥有 ${yearsExperience} 年经验，专注于 ${tags}。三大主要产品线：\n\n📦 **按图纸定制款**——起订量 10 套起，交期 25–30 天\n📦 **标准模块款**——起订量 20 套起，交期 18–22 天\n📦 **现货款**——起订量 5 套起，7–10 天内交货\n\n订单 ≥ 50 套时，起订量可协商最高降低 30%。您对哪条产品线感兴趣？我可立即发送详细价格表。`,
    },
    { role: "user", time: "09:17", text: "我想在确定大批量前先订样品，流程如何？" },
    {
      role: "ai",
      time: "09:17",
      text: `${shortName} 的打样流程分 5 步：\n\n1️⃣ 通过本页侧栏的 **询价** 按钮提交需求并附图纸/参考图\n2️⃣ ${shortName} 设计团队 **免费** 在 3–5 天内出 3D 渲染图\n3️⃣ 确认设计后支付 50% 打样费定金——约 **$80–250/件**，视复杂度而定\n4️⃣ 工厂打样 **7–15 天**\n5️⃣ 经 DHL/Fedex 将样品运至越南（约 5 天，$80–120 视重量而定）\n\n💰 订单 ≥ $5,000 时，打样费 **100% 抵扣** 至正式订单。`,
    },
    { role: "user", time: "09:19", text: "付款支持交易保障吗？有出口欧盟/美国的认证吗？" },
    {
      role: "ai",
      time: "09:19",
      text: `两者都有 ✅\n\n**付款方式：**\n🛡️ **华越担保**（推荐）——平台托管定金，货到验质合格后才放款\n💳 **L/C 信用证** 经 VietinBank / Vietcombank\n🏦 **T/T**——30% 定金 + 70% 见装箱照片后付清\n🔄 **OA 30/60 天**——面向老合作客户（需审核）\n\n**出口认证：**\n🏅 CE Marking（欧盟）· ISO 9001:2015 · BSCI · Sedex SMETA 4-pillar · FSC-COC · CARB Phase 2 / TSCA Title VI（美国）\n\n可在 **公司简介** 标签页 → 质量认证栏目下载完整认证文件。`,
    },
    { role: "user", time: "09:21", text: "我订 30 套定制款，价格大约多少美元？" },
    {
      role: "ai",
      time: "09:21",
      text: `要为 30 套定制款准确报价，我还需要：\n\n📐 每套平均尺寸\n🪵 期望材质（MDF / HDF / 实木 / 亚克力 / 烤漆）\n🔧 配套五金（Blum / Hettich / Häfele 或普通五金）\n🚚 交货条件（FOB 广州 / CIF 海防 / DDP 河内）\n\n**30 套标准款参考价区间：**\n• 经济型：**$280–380/套**\n• 中端型：**$520–680/套**\n• 高端型：**$1,150–1,580/套**\n\n👉 需要我按具体配置自动生成询价单吗？点击下方 **生成询价** 按钮。`,
    },
  ];

  const trainingSources = [
    { icon: "📦", label: "2,400+ SKU 产品目录", value: f.tags.join(" · ") },
    { icon: "💵", label: "起订量价格表 + 贸易术语", value: "FOB / CIF / DDP" },
    { icon: "🏅", label: "质量认证文件集", value: "CE · ISO 9001 · BSCI · FSC · CARB" },
    { icon: "📜", label: "订单历史 + 客户评价", value: `${f.reviews} 条评价 · ★ ${f.rating}` },
    { icon: "⏱️", label: "各产品线实际交期", value: "定制 25–30 · 模块 18–22 · 现货 7–10 天" },
    { icon: "🔄", label: "OEM/ODM 流程 + 打样", value: "5 步 · 7–15 天 · 打样费可退" },
  ];

  const quickTopics = [
    "💵 起订量价格表",
    "📐 打样 + 3D 渲染",
    "🚚 交期 + 运输",
    "🏅 欧盟/美国认证",
    "🛡️ 付款 + 担保",
    "🔧 OEM/ODM 定制",
    "📞 与销售 Zoom 会议安排",
    "🔍 与其他供应商对比",
  ];

  return (
    <>
      <div className="bg-paper border border-line rounded p-5 mb-4">
        <div className="flex items-start gap-4 max-md:flex-col">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-[26px] flex-shrink-0" style={{ background: "linear-gradient(135deg, #005F6B 0%, #008899 100%)" }}>
            🤖
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h2 className="text-[18px] font-bold text-fg">CSR AI · {shortName}</h2>
              <span className="bg-success text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">● ONLINE</span>
              <span className="bg-gold text-brand-dark text-[10px] px-2 py-0.5 rounded-sm font-bold">BETA</span>
            </div>
            <p className="text-[12.5px] text-mute leading-relaxed">
              基于 <b>{f.name}</b> 数据专属训练的虚拟助手。<b>7×24小时即时</b> 用中文回答产品、起订量、交期、打样、认证、付款及OEM/ODM问题。所有回答均源自工厂的目录+官方资料。
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-line">
          <div className="text-[11.5px] font-bold text-mute uppercase tracking-wide mb-2">📚 AI训练所用数据：</div>
          <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1">
            {trainingSources.map((s) => (
              <div key={s.label} className="flex items-start gap-2 p-2 bg-bg rounded border border-line">
                <span className="text-[18px] flex-shrink-0">{s.icon}</span>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-fg leading-tight">{s.label}</div>
                  <div className="text-[11px] text-mute2 truncate">{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-4 mb-4">
        <div className="text-[12px] font-bold text-mute mb-2">💡 点击话题查看AI示例回答：</div>
        <div className="flex flex-wrap gap-2">
          {quickTopics.map((t) => (
            <button
              key={t}
              type="button"
              className="px-3 py-1.5 bg-bg border border-line rounded-full text-[12px] text-fg hover:border-brand hover:text-brand cursor-pointer transition"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-line rounded overflow-hidden bg-paper">
        <div className="px-4 py-2.5 flex items-center justify-between text-white" style={{ background: "linear-gradient(90deg, #005F6B, #066875)" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-[14px]">🤖</div>
            <div>
              <div className="text-[13px] font-bold leading-tight">CSR AI</div>
              <div className="text-[10.5px] opacity-90 leading-tight">平均响应1.2s · 中文+English</div>
            </div>
          </div>
          <span className="text-[10.5px] bg-white/15 px-2 py-1 rounded">DEMO</span>
        </div>

        <div className="p-4 space-y-3 bg-bg" style={{ maxHeight: 520, overflowY: "auto" }}>
          {conversation.map((m, i) => {
            if (m.role === "ai") {
              return (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[13px] flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #005F6B, #008899)" }}>
                    🤖
                  </div>
                  <div className="max-w-[80%]">
                    <div className="bg-white border border-line rounded-lg rounded-tl-none px-3 py-2 text-[12.5px] text-fg leading-relaxed whitespace-pre-line">
                      {m.text.split(/(\*\*[^*]+\*\*)/).map((seg, j) =>
                        seg.startsWith("**") && seg.endsWith("**")
                          ? <b key={j}>{seg.slice(2, -2)}</b>
                          : <span key={j}>{seg}</span>
                      )}
                    </div>
                    <div className="text-[10px] text-mute2 mt-1 ml-1">CSR AI · {m.time}</div>
                  </div>
                </div>
              );
            }
            return (
              <div key={i} className="flex items-start gap-2 justify-end">
                <div className="max-w-[80%]">
                  <div className="text-white rounded-lg rounded-tr-none px-3 py-2 text-[12.5px] leading-relaxed" style={{ background: "linear-gradient(135deg, #005F6B, #066875)" }}>
                    {m.text}
                  </div>
                  <div className="text-[10px] text-mute2 mt-1 mr-1 text-right">您 · {m.time}</div>
                </div>
                <div className="w-7 h-7 rounded-full bg-bg border border-line flex items-center justify-center text-[13px] flex-shrink-0 mt-0.5">
                  👤
                </div>
              </div>
            );
          })}

          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[13px] flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #005F6B, #008899)" }}>
              🤖
            </div>
            <div className="bg-white border border-line rounded-lg rounded-tl-none px-4 py-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-mute2 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-mute2 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-mute2 inline-block" />
              <span className="text-[10.5px] text-mute2 ml-2">CSR AI正在输入……</span>
            </div>
          </div>
        </div>

        <div className="border-t border-line p-3 bg-paper">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="咨询产品、起订量、打样、交期、OEM……（演示——2026 Q3 即将上线）"
              disabled
              className="flex-1 px-3 py-2 border border-line rounded text-[12.5px] bg-bg cursor-not-allowed"
            />
            <button
              type="button"
              disabled
              className="px-4 py-2 bg-mute2 text-white rounded text-[12.5px] font-bold cursor-not-allowed whitespace-nowrap"
            >
              📤 发送
            </button>
          </div>
          <div className="flex items-start gap-2 mt-2 text-[10.5px] text-mute2 leading-relaxed">
            <span>🚧</span>
            <span>与AI实时聊天功能将于 <b className="text-fg">2026 Q3</b> 上线。当前您查看的是演示对话。需紧急咨询？请点击侧栏的 <b>询价</b>——{shortName} 销售团队将在 2 小时内回复（中国工作时间）。</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-4">
          <div className="text-[13px] font-bold text-fg mb-2">✅ AI可以回答：</div>
          <ul className="text-[12px] text-mute space-y-1.5 leading-relaxed">
            <li>• 具体产品（价格、起订量、交期、材质）</li>
            <li>• 打样+定制下单流程</li>
            <li>• 质量认证及附件文件</li>
            <li>• 付款方式+保险</li>
            <li>• 同一目录内产品对比</li>
            <li>• 按预算推荐合适材质</li>
            <li>• 物流：FOB港口、海运时间、DDP河内</li>
          </ul>
        </div>
        <div className="bg-paper border border-line rounded p-4">
          <div className="text-[13px] font-bold text-fg mb-2">❌ AI无法替代：</div>
          <ul className="text-[12px] text-mute space-y-1.5 leading-relaxed">
            <li>• 大单的特殊价格谈判</li>
            <li>• 签署长期OEM合同</li>
            <li>• 法律/争议决策</li>
            <li>• ≥ $50K复杂项目的报价</li>
            <li>• 需专属客户经理的VIP客户</li>
          </ul>
          <div className="mt-3 pt-3 border-t border-line text-[11.5px] text-mute2">
            👉 所有订单在生产前仍由 {shortName} 销售确认。AI 只是帮您 <b className="text-fg">提前快速答疑</b>，免去等待时差。
          </div>
        </div>
      </div>
    </>
  );
}
