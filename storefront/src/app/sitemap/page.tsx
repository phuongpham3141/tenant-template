import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { ARTICLES } from "@/lib/blog";

type SitemapLink = { label: string; href: string; desc?: string };

type SitemapSection = {
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  links: SitemapLink[];
};

const SECTIONS: SitemapSection[] = [
  {
    icon: "🏠",
    color: "#005F6B",
    title: "首页与探索",
    subtitle: "平台主要入口",
    links: [
      { label: "首页", href: "/", desc: "起点——精选产品、询价表单、促销活动" },
      { label: "全部产品", href: "/products", desc: "来自 1,840+ 家已认证供应商的 200K+ SKU 目录" },
      { label: "搜索", href: "/search", desc: "按 SKU、供应商、行业全文搜索" },
      { label: "以图搜图", href: "/search/by-image", desc: "上传图片查找相似产品" },
      { label: "供应商", href: "/suppliers", desc: "1,840+ 家已通过验厂的供应商列表" },
      { label: "产业带", href: "/zones", desc: "按产业集群生产——佛山、东莞、义乌……" },
      { label: "行业频道", href: "/industry-channels", desc: "专业频道——家具、卫浴、电子……" },
      { label: "实地验厂", href: "/factory-tour", desc: "合作工厂 360° 视频参观" },
    ],
  },
  {
    icon: "🛒",
    color: "#16A34A",
    title: "采购（Buyer）",
    subtitle: "从询价到收货的全流程",
    links: [
      { label: "发送询价", href: "/buying-request", desc: "询价表单——AI 匹配 24 小时内推送 5-10 家供应商" },
      { label: "交易预警（订阅）", href: "/trade-alert", desc: "12,000+ 采购商订阅——每周资讯 + 促销预警" },
      { label: "2026 展会", href: "/trade-shows", desc: "CSR 代表或联合主办的 12 场活动" },
      { label: "帮助中心", href: "/help", desc: "按采购旅程 5 阶段编排的 300+ 篇指南" },
    ],
  },
  {
    icon: "📊",
    color: "#0891B2",
    title: "采购中心——登录后",
    subtitle: "含 12 项功能的采购商仪表盘",
    links: [
      { label: "总览", href: "/buyer-center", desc: "询价、订单、消息汇总" },
      { label: "我的订单", href: "/buyer-center/orders", desc: "实时追踪，各节点照片/视频" },
      { label: "收藏产品", href: "/buyer-center/favorites", desc: "在考虑中的 SKU 收藏夹" },
      { label: "工厂验厂报告", href: "/buyer-center/audited-reports", desc: "下载区块链签名的验厂报告" },
      { label: "浏览历史", href: "/buyer-center/browsing-history", desc: "最近 30 天浏览过的产品" },
      { label: "联系——聊天", href: "/buyer-center/contact", desc: "与客户经理、供应商在线沟通" },
      { label: "在线见供应商", href: "/buyer-center/meet-suppliers", desc: "经 CSR 调度与供应商预约视频通话" },
      { label: "新采购商指南", href: "/buyer-center/new-user-guide", desc: "前 30 天——详细入门引导" },
      { label: "发布询价", href: "/buyer-center/post-rfq", desc: "含行业模板的多供应商询价" },
      { label: "产品目录", href: "/buyer-center/product-directory", desc: "按 HS 编码、起订量、交期分类" },
      { label: "担保交易", href: "/buyer-center/secured-trading", desc: "交易保障（担保账户）流程" },
      { label: "发现新供应商", href: "/buyer-center/supplier-discover", desc: "AI 按采购历史推荐供应商" },
    ],
  },
  {
    icon: "🏭",
    color: "#9C6A1F",
    title: "销售（Seller / Supplier）",
    subtitle: "供应商店铺入驻与管理",
    links: [
      { label: "入驻华越", href: "/sell-on-csr", desc: "3 档（Free / Verified / Premium）——4 步验厂流程" },
      { label: "工厂注册", href: "/register/factory", desc: "注册表单 + 上传法律证件" },
      { label: "经销商注册", href: "/register/dealer", desc: "越南/东盟分销经销商" },
    ],
  },
  {
    icon: "💼",
    color: "#7C2D12",
    title: "卖家中心——验厂后",
    subtitle: "面向已认证供应商的 10 项运营工具",
    links: [
      { label: "总览", href: "/seller-center", desc: "销售额、接单、询价收件箱、转化率" },
      { label: "AI 助手", href: "/seller-center/ai-assistant", desc: "AI 助手撰写报价、翻译越南语、优化商品" },
      { label: "中国内销", href: "/seller-center/domestic-cn", desc: "通过淘宝/天猫在中国国内销售" },
      { label: "北美出口", href: "/seller-center/export-na", desc: "通过 Amazon FBA + 3PL 出口北美" },
      { label: "金牌会员", href: "/seller-center/gold-member", desc: "最高档——精选横幅、询价优先" },
      { label: "物流", href: "/seller-center/logistics", desc: "订舱、报关行、集装箱追踪" },
      { label: "智慧展会", href: "/seller-center/smart-expo", desc: "线上展会虚拟展位" },
      { label: "Trade eHome", href: "/seller-center/trade-ehome", desc: "家具行业数字展厅" },
      { label: "贸易服务", href: "/seller-center/trade-services", desc: "面向供应商的翻译、法律、金融服务" },
      { label: "代运营服务", href: "/seller-center/trading-service", desc: "CSR 代理贸易——外包买手代理" },
    ],
  },
  {
    icon: "📚",
    color: "#7C3AED",
    title: "信息与资料",
    subtitle: "指南、政策与研究资料",
    links: [
      { label: "关于 CSR", href: "/info/about-us", desc: "「数字丝绸之路」愿景——四大支柱" },
      { label: "协会合作伙伴网络", href: "/info/network", desc: "42 家越南·中国·东盟协会，28+ 份 MOU" },
      { label: "工厂审核流程", href: "/info/audit-process", desc: "7 步，32% 通过率，SGS/BV/TÜV/Intertek 实验室" },
      { label: "交易保障", href: "/info/trade-assurance", desc: "VCB·BIDV·中国银行担保——支付保障" },
      { label: "投诉与争议", href: "/info/disputes", desc: "3 级升级——直接协商·调解·VIAC 仲裁" },
      { label: "样品下单", href: "/info/sample-orders", desc: "6 步流程，广州样品中心" },
      { label: "进口指南", href: "/info/import-guide", desc: "9 个章节——VNACCS、Form E、ACFTA、RCEP" },
      { label: "运输政策", href: "/info/shipping-policy", desc: "Incoterms 2020，越南 5 大港口，谅山陆运" },
      { label: "DDP 运费测算", href: "/info/ddp-calculator", desc: "交互式计算器——输入 CBM、重量、路线" },
      { label: "实时订单追踪", href: "/info/order-tracking", desc: "5 个阶段，各节点照片/视频" },
      { label: "支付保障", href: "/info/payment-protection", desc: "担保机制 + 保险" },
      { label: "高效寻品", href: "/info/find-products", desc: "询价技巧、AI 匹配、多供应商对比" },
      { label: "API 集成", href: "/info/api-integration", desc: "REST + Webhook + 4 个 SDK（Node/Py/PHP/Go）" },
      { label: "市场报告", href: "/info/market-reports", desc: "每年 48 份报告，覆盖 12 个行业" },
      { label: "行业资讯（博客）", href: "/info/industry-news", desc: "12+ 篇分析，每周动态" },
      { label: "招聘（Careers）", href: "/info/careers", desc: "37+ 个在招职位——工程、产品、销售" },
      { label: "联系", href: "/info/contact", desc: "越南 + 东盟 8 个办事处，按地区下拉选择" },
    ],
  },
  {
    icon: "⚖",
    color: "#475569",
    title: "法律与政策",
    subtitle: "使用条款与数据隐私",
    links: [
      { label: "服务条款", href: "/info/terms-of-service", desc: "14 个章节，VIAC 仲裁，不可抗力" },
      { label: "隐私政策", href: "/info/privacy-policy", desc: "ISO 27001、越南第 13/2023 号法令、PIPL、GDPR 合规" },
    ],
  },
  {
    icon: "🔐",
    color: "#A21CAF",
    title: "账户与注册",
    subtitle: "认证与开通",
    links: [
      { label: "登录", href: "/login", desc: "邮箱/密码 + Google + Apple + Facebook OAuth" },
      { label: "采购商注册", href: "/register/buyer", desc: "个人或企业——快速 KYC" },
      { label: "经销商注册", href: "/register/dealer", desc: "越南/东盟分销经销商——认证流程" },
      { label: "工厂注册", href: "/register/factory", desc: "供应商工厂——启动 7 步验厂" },
      { label: "下载手机 App", href: "/app", desc: "iOS + Android——移动端询价 + 追踪" },
    ],
  },
];

export default function SitemapPage() {
  const totalLinks = SECTIONS.reduce((acc, s) => acc + s.links.length, 0) + ARTICLES.length;
  const sectionsCount = SECTIONS.length + 1; // +1 for the blog

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "首页", href: "/" },
          { label: "网站地图" },
        ]}
      />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #001A3F 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-brand-light blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-10 max-md:py-7">
          <span className="inline-block bg-gold text-brand-dark text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wider mb-3">
            🗺 网站地图
          </span>
          <h1 className="text-[36px] font-extrabold leading-[1.1] mb-3 max-md:text-[24px]">
            Huayuesc 网站地图
          </h1>
          <p className="text-[14.5px] opacity-90 max-w-[760px] leading-relaxed mb-6 max-md:text-[13px]">
            {totalLinks}+ 个页面，按 {sectionsCount} 个功能分组整理。使用本网站地图可快速探索平台的全部功能与资料。面向搜索引擎的 XML 网站地图：<a href="/sitemap.xml" className="underline text-gold hover:opacity-80">/sitemap.xml</a>
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">📄</div>
              <div className="text-[22px] font-extrabold">{totalLinks}+</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">总页面数</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">🗂</div>
              <div className="text-[22px] font-extrabold">{sectionsCount}</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">功能分组</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">📰</div>
              <div className="text-[22px] font-extrabold">{ARTICLES.length}</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">博客文章</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded p-3 backdrop-blur-sm">
              <div className="text-[18px] mb-0.5">🌐</div>
              <div className="text-[22px] font-extrabold">EN</div>
              <div className="text-[10.5px] opacity-85 mt-0.5">URL slugs (SEO ready)</div>
            </div>
          </div>
        </div>
      </section>

      {/* === Section anchors quick nav ====================================== */}
      <div className="max-w-[1200px] mx-auto px-4 mt-6">
        <div className="bg-paper border border-line rounded p-4">
          <div className="text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">📍 快速跳转到分组</div>
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a
                key={s.title}
                href={`#${s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="text-[12px] font-semibold px-2.5 py-1 rounded-sm border cursor-pointer hover:opacity-80"
                style={{ borderColor: `${s.color}40`, color: s.color, background: `${s.color}08` }}
              >
                <span className="mr-1">{s.icon}</span>
                {s.title}
              </a>
            ))}
            <a
              href="#blog"
              className="text-[12px] font-semibold px-2.5 py-1 rounded-sm border cursor-pointer hover:opacity-80"
              style={{ borderColor: "#E8943A40", color: "#E8943A", background: "#E8943A08" }}
            >
              <span className="mr-1">📰</span>
              最新博客
            </a>
          </div>
        </div>
      </div>

      {/* === SECTIONS ======================================================= */}
      <div className="max-w-[1200px] mx-auto px-4 mt-6 space-y-6">
        {SECTIONS.map((s) => (
          <section
            key={s.title}
            id={s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            className="bg-paper border border-line rounded overflow-hidden scroll-mt-20"
          >
            {/* Header */}
            <div
              className="px-5 py-4 border-b border-line flex items-center justify-between gap-3 flex-wrap"
              style={{ background: `linear-gradient(135deg, ${s.color}10, ${s.color}03)` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center text-[22px] flex-shrink-0 shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}DD)`, color: "#fff" }}
                >
                  {s.icon}
                </div>
                <div>
                  <h2 className="text-[18px] font-extrabold text-ink leading-tight">{s.title}</h2>
                  <p className="text-[12px] text-mute mt-0.5">{s.subtitle}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[22px] font-extrabold leading-none" style={{ color: s.color }}>
                  {s.links.length}
                </div>
                <div className="text-[10.5px] uppercase tracking-wider text-mute">页</div>
              </div>
            </div>

            {/* Links grid */}
            <ul className="grid grid-cols-2 gap-x-5 gap-y-1 p-4 max-md:grid-cols-1">
              {s.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block py-2 px-2.5 rounded-sm hover:bg-bg group"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-[13.5px] font-semibold text-ink group-hover:text-brand">{l.label}</span>
                      <span className="text-[10.5px] text-mute2 font-mono">{l.href}</span>
                    </div>
                    {l.desc && (
                      <span className="block text-[11.5px] text-mute leading-snug mt-0.5">{l.desc}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* === Blog articles section ======================================= */}
        <section id="blog" className="bg-paper border border-line rounded overflow-hidden scroll-mt-20">
          <div
            className="px-5 py-4 border-b border-line flex items-center justify-between gap-3 flex-wrap"
            style={{ background: "linear-gradient(135deg, #E8943A10, #E8943A03)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-md flex items-center justify-center text-[22px] flex-shrink-0 shadow-sm text-white"
                style={{ background: "linear-gradient(135deg, #E8943A, #C97520)" }}
              >
                📰
              </div>
              <div>
                <h2 className="text-[18px] font-extrabold text-ink leading-tight">博客——行业资讯</h2>
                <p className="text-[12px] text-mute mt-0.5">{ARTICLES.length} 篇市场分析、案例研究与指南文章</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/info/industry-news"
                className="text-[12px] text-brand font-semibold hover:underline whitespace-nowrap"
              >
                查看全部 →
              </Link>
              <div className="text-right">
                <div className="text-[22px] font-extrabold leading-none text-[#E8943A]">{ARTICLES.length}</div>
                <div className="text-[10.5px] uppercase tracking-wider text-mute">篇</div>
              </div>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-x-5 gap-y-1 p-4 max-md:grid-cols-1">
            {ARTICLES.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/info/industry-news/${a.slug}`}
                  className="block py-2 px-2.5 rounded-sm hover:bg-bg group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[13px] font-semibold text-ink group-hover:text-brand leading-snug flex-1 line-clamp-2">{a.title}</span>
                    <span className="text-[10px] text-mute2 whitespace-nowrap">{a.readMinutes} 分钟</span>
                  </div>
                  <span className="block text-[10.5px] text-mute2 font-mono mt-1">/info/industry-news/{a.slug}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* === Footer note ==================================================== */}
      <div className="max-w-[1200px] mx-auto px-4 mt-8 mb-10">
        <div className="bg-bg border border-line rounded p-5 text-center">
          <p className="text-[13px] text-mute leading-relaxed max-w-[680px] mx-auto">
            <b className="text-ink">面向搜索引擎的 XML 网站地图</b>：<a href="/sitemap.xml" className="text-brand font-semibold hover:underline">huayuesc.vn/sitemap.xml</a>
            {" · "}
            新增页面或博客文章时自动更新。所有 slug 均已规范为英文，以优化国际化 SEO。
          </p>
          <div className="mt-3 flex justify-center gap-3 flex-wrap">
            <Link href="/help" className="text-[12px] px-4 py-2 border border-line rounded-sm font-semibold text-ink hover:border-brand hover:text-brand">
              帮助中心
            </Link>
            <Link href="/info/contact" className="text-[12px] px-4 py-2 bg-brand text-white rounded-sm font-bold hover:bg-brand-light">
              联系 CSR
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: "网站地图 — Huayuesc",
  description: "Huayuesc 全站地图——80+ 页面，按 9 个功能分组整理。面向搜索引擎的 XML 网站地图见 /sitemap.xml。",
};
