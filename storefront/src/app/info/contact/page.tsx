"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

type Office = {
  id: string;
  flag: string;
  region: "VN" | "CN";
  city: string;
  cityEn: string;
  role: string;
  isHQ?: boolean;
  address: string;
  addressCn?: string;
  addressEn: string;
  phone: string;
  hotline?: string;
  email: string;
  manager: { name: string; title: string; initials: string };
  teamSize: number;
  departments: string[];
  hours: string;
  timezone: string;
  transit: string;
  parking: string;
  landmark: string;
  services: string[];
  googleMapsQuery: string;
};

const OFFICES: Office[] = [
  {
    id: "hn",
    flag: "🇻🇳",
    region: "VN",
    city: "河内",
    cityEn: "Hanoi",
    role: "总部——越南运营、销售与分销",
    isHQ: true,
    address: "越南河内市春芳坊清林街 2 号宝玉大厦 7 楼",
    addressCn: "越南河内市春芳坊清林街2号宝玉大厦7楼",
    addressEn:
      "Floor 7, Bao Ngoc Building, No. 02 Thanh Lam Street, Xuan Phuong Ward, Hanoi, Vietnam",
    phone: "+86 181-2225-6999",
    hotline: "+86 181-2225-6999",
    email: "support@huayuesc.vn",
    manager: {
      name: "河内运营团队",
      title: "运营与分销负责人",
      initials: "HN",
    },
    teamSize: 20,
    departments: [
      "VNACCS/VCIS 海关申报（对接海防港）",
      "物流与船公司协调",
      "越南分销（河内、胡志明市、63 省）",
      "建筑材料与家具 B2B 销售",
      "越南语客户成功",
      "经销商与建筑承包商合作",
    ],
    hours: "周一 – 周六：8:00 – 17:30",
    timezone: "GMT+7 (Asia/Ho_Chi_Minh)",
    transit:
      "宝玉大厦位于春芳坊清林街 2 号——河内西部，距美亭中心约 3 km，经升龙大道距内排机场约 30 km。27、29、32 路公交车在附近停靠。",
    parking: "宝玉大厦内部停车场——预约访客免费（请提前通过热线告知前台）",
    landmark:
      "宝玉大厦，春芳坊，位于河内西部南慈廉区——临近河内及北部各省的建材分销商和家具展厅",
    services: [
      "越南端供应链管理（物流 + 清关 + 分销）",
      "为自中国进口的集装箱办理 VNACCS/VCIS 申报（海防港 / 吉莱港）",
      "DDP 国内运输至河内、胡志明市及 63 省市",
      "通过热线 + 邮件为越南采购商提供销售与咨询",
      "经销商、建筑承包商、室内设计公司合作",
      "24/7 越南语客户成功支持",
    ],
    googleMapsQuery: "Bao+Ngoc+Building+02+Thanh+Lam+Xuan+Phuong+Hanoi",
  },
  {
    id: "gz",
    flag: "🇨🇳",
    region: "CN",
    city: "广州",
    cityEn: "Guangzhou",
    role: "代表处——采购、验厂与寻源",
    address: "中国广州市海珠区新港东路黄埔村北码头数娱创兴港 1 号楼 3 楼",
    addressCn: "广州市海珠区新港东路黄埔村北码头数娱创兴港1号楼3楼",
    addressEn: "3F, Building 1, Shuyu Chuangxing Port, North Wharf of Huangpu Village, East Xingang Road, Haizhu District, Guangzhou, China",
    phone: "+86 181-2225-6999",
    email: "sales@huayuesc.vn",
    manager: { name: "广州寻源团队", title: "寻源与品控团队负责人", initials: "GZ" },
    teamSize: 15,
    departments: [
      "寻源与源头精选",
      "工厂驻厂品控检验员",
      "供应商实地验厂",
      "中越商务翻译",
      "广东工厂及行业协会关系",
    ],
    hours: "周一 – 周五：9:00 – 18:00 · 周六：9:00 – 12:00（北京时间）",
    timezone: "GMT+8 (Asia/Shanghai)",
    transit: "海珠区——老广州中心，距广州东站 6 km，距白云国际机场 35 km。临近佛山陶瓷（50 km）、乐从家具（40 km）、美的电器（30 km）等产业带。",
    parking: "数娱创兴港停车场——设有预约访客车位",
    landmark: "数娱创兴港（数字娱乐 – 文化港）位于黄埔村北码头，海珠区中心商务区，临近珠江",
    services: [
      "在华越 3 大行业（建材 / 装饰材料 / 厨卫小家电）筛选与验厂中国工厂",
      "出厂前品控检验员——AQL 2.5 标准",
      "为询价及谈判提供中越翻译",
      "代表越南采购商实地验厂",
      "对接广东、佛山、中山、潮州行业协会",
    ],
    googleMapsQuery: "数娱创兴港+Shuyu+Chuangxing+Xingang+East+Road+Haizhu+Guangzhou",
  },
];

const DEPARTMENTS = [
  { icon: "💼", title: "销售与寻源咨询", email: "sales@huayuesc.vn", desc: "询价咨询、筛选中国供应商、价格谈判、PI/PO 合同。" },
  { icon: "🚚", title: "物流、清关与仓储", email: "support@huayuesc.vn", desc: "DDP / FOB / CIF——订舱、VNACCS 申报（海防港与吉莱港）、订单追踪。" },
  { icon: "🔍", title: "品控与验厂", email: "sales@huayuesc.vn", desc: "出厂前 AQL 2.5 验货、广东供应商实地验厂、附图片/视频报告。" },
  { icon: "🛡", title: "交易保障与投诉", email: "support@huayuesc.vn", desc: "担保账户、争议调解、依据条款第 7 节退款或换货。" },
  { icon: "🤝", title: "越南分销与经销商合作", email: "partnership@huayuesc.vn", desc: "与分销经销商、建筑承包商、室内装饰设计公司合作。" },
  { icon: "👥", title: "招聘与人力资源", email: "hr@huayuesc.vn", desc: "河内与广州职位的应聘材料、内部培训。" },
  { icon: "🔒", title: "数据保护与 DPO", email: "privacy@huayuesc.vn", desc: "数据主体权利、NĐ 13/2023 号法令、72 小时内泄露通知。" },
];

const CHANNELS = [
  { icon: "📞", title: "热线", desc: "+86 181-2225-6999——越南语 + 中文支持，8:00–22:00", action: "立即拨打", href: "tel:+8618122256999" },
  { icon: "✉", title: "邮箱", desc: "support@huayuesc.vn——工作时间 6 小时内响应", action: "撰写邮件", href: "mailto:support@huayuesc.vn" },
  { icon: "💬", title: "网站在线客服", desc: "工作时间 5 分钟内响应；非工作时间 AI 24/7", action: "打开客服", href: "#chat" },
  { icon: "📱", title: "Zalo OA", desc: "华越——最快的越南语沟通", action: "打开 Zalo", href: "https://zalo.me/huayuesc" },
];

function MapCard({ office }: { office: Office }) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${office.googleMapsQuery}`;
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${office.googleMapsQuery}`;
  return (
    <div className="bg-bg border border-line rounded p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-brand text-white rounded flex items-center justify-center flex-shrink-0 text-[20px]">
          📍
        </div>
        <div className="flex-1">
          <b className="block text-[13px] text-ink mb-1">{office.flag} {office.city}</b>
          <p className="text-[12.5px] text-mute leading-relaxed">{office.address}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center py-2 bg-paper border border-line rounded-sm text-[12px] text-ink font-semibold cursor-pointer hover:border-brand hover:text-brand"
        >
          🗺 打开 Google 地图
        </a>
        <a
          href={dirUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center py-2 bg-brand text-white rounded-sm text-[12px] font-bold cursor-pointer hover:bg-brand-light"
        >
          🧭 获取路线
        </a>
      </div>
    </div>
  );
}

export default function LienHePage() {
  const [activeId, setActiveId] = useState("hn");
  const [region, setRegion] = useState<"all" | "VN" | "CN">("all");
  const filtered = region === "all" ? OFFICES : OFFICES.filter((o) => o.region === region);
  const active = OFFICES.find((o) => o.id === activeId) ?? OFFICES[0];

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "首页", href: "/" },
          { label: "信息", href: "/help" },
          { label: "联系" },
        ]}
      />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, #001A3F 100%)" }}
      >
        <div className="max-w-[1100px] mx-auto px-4 py-10 max-md:py-7">
          <span className="inline-block bg-gold text-brand-dark text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wider mb-3">
            📍 联系 · CONTACT
          </span>
          <h1 className="text-[34px] font-extrabold leading-tight mb-3 max-md:text-[24px]">
            联系华越——两地办公，一条供应链
          </h1>
          <p className="text-[14.5px] opacity-90 max-w-[720px] leading-relaxed mb-5 max-md:text-[13px]">
            总部位于<b>河内市春芳坊清林街 2 号宝玉大厦 7 楼</b>，负责仓储、VNACCS 清关及越南境内分销。采购代表处位于<b>广州市海珠区数娱创兴港 3 楼</b>，负责寻源、验厂及出厂前品控。唯一热线：<b>+86 181-2225-6999</b>——提供越南语和中文支持。
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {[
              { n: "8", l: "办事处" },
              { n: "114", l: "员工" },
              { n: "5", l: "国家" },
              { n: "24/7", l: "在线支持" },
            ].map((s) => (
              <div key={s.l} className="bg-white/10 border border-white/20 rounded p-3 text-center backdrop-blur">
                <div className="text-[22px] font-extrabold">{s.n}</div>
                <div className="text-[11px] opacity-85 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Office selector ================================================ */}
      <div className="max-w-[1100px] mx-auto px-4 mt-7">
        <div className="bg-paper border border-line rounded p-5 max-md:p-4">
          <div className="flex justify-between items-end gap-4 mb-4 flex-wrap">
            <div>
              <h2 className="text-[18px] font-bold text-ink">选择办事处查看详情</h2>
              <p className="text-[12.5px] text-mute mt-0.5">2 个办事处——河内总部（越南）和广州代表处（中国）</p>
            </div>
            {/* Region filter chips */}
            <div className="flex gap-1.5 bg-bg border border-line rounded-sm p-1">
              {(["all", "VN", "CN"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRegion(r);
                    const next = r === "all" ? OFFICES[0] : OFFICES.find((o) => o.region === r);
                    if (next) setActiveId(next.id);
                  }}
                  className={`px-3 py-1.5 text-[12px] font-semibold rounded-sm cursor-pointer transition ${
                    region === r ? "bg-brand text-white" : "text-mute hover:text-brand"
                  }`}
                >
                  {r === "all" ? "全部 (2)" : r === "VN" ? "🇻🇳 越南 (1)" : "🇨🇳 中国 (1)"}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: native dropdown */}
          <div className="md:hidden mb-3">
            <select
              value={activeId}
              onChange={(e) => setActiveId(e.target.value)}
              className="w-full px-3 py-2.5 border border-line rounded-sm bg-bg text-[13.5px] text-ink font-semibold outline-none focus:border-brand cursor-pointer"
            >
              {filtered.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.flag} {o.city} — {o.role}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop: tab pills */}
          <div className="hidden md:grid grid-cols-4 gap-2 mb-1">
            {filtered.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setActiveId(o.id)}
                className={`text-left p-3 border rounded-sm cursor-pointer transition ${
                  activeId === o.id
                    ? "border-brand bg-brand/5 ring-1 ring-brand"
                    : "border-line bg-bg hover:border-brand/40"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[16px]">{o.flag}</span>
                  <b className={`text-[13px] ${activeId === o.id ? "text-brand" : "text-ink"}`}>{o.city}</b>
                  {o.isHQ && (
                    <span className="text-[9px] bg-gold text-brand-dark font-bold px-1.5 py-0.5 rounded-sm tracking-wide ml-auto">HQ</span>
                  )}
                </div>
                <div className="text-[11px] text-mute leading-tight line-clamp-2">{o.role}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === Active office detail ========================================== */}
      <div className="max-w-[1100px] mx-auto px-4 mt-5 mb-9">
        <div className="bg-paper border border-line rounded overflow-hidden">
          {/* Office header */}
          <div
            className="px-6 py-5 text-white max-md:px-4 max-md:py-4"
            style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[34px]">{active.flag}</span>
                  <div>
                    <h2 className="text-[24px] font-extrabold leading-tight max-md:text-[20px]">
                      {active.city}
                      {active.isHQ && (
                        <span className="ml-2 text-[10px] bg-gold text-brand-dark font-bold px-2 py-0.5 rounded-sm tracking-wider align-middle">
                          GLOBAL HQ
                        </span>
                      )}
                    </h2>
                    <p className="text-[13px] opacity-90">{active.role}</p>
                  </div>
                </div>
              </div>
              <div className="text-right max-md:text-left">
                <div className="text-[11px] opacity-80 uppercase tracking-wider">团队</div>
                <div className="text-[20px] font-extrabold">{active.teamSize} 人</div>
                <div className="text-[11px] opacity-80">{active.timezone}</div>
              </div>
            </div>
          </div>

          {/* Office body */}
          <div className="p-6 max-md:p-4 grid grid-cols-[1fr_360px] gap-6 max-lg:grid-cols-1">
            {/* Left column — info */}
            <div className="space-y-5">
              {/* Address */}
              <div>
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1.5">📍 地址</b>
                <p className="text-[14px] text-ink leading-relaxed">{active.address}</p>
                <p className="text-[12px] text-mute italic mt-0.5">{active.addressEn}</p>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div>
                  <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1.5">📞 电话</b>
                  <a href={`tel:${active.phone.replace(/\s/g, "")}`} className="text-[13.5px] text-brand font-semibold hover:underline">
                    {active.phone}
                  </a>
                  {active.hotline && (
                    <div className="text-[12px] text-mute mt-0.5">越南热线：<b className="text-ink">{active.hotline}</b></div>
                  )}
                </div>
                <div>
                  <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1.5">✉ Email</b>
                  <a href={`mailto:${active.email}`} className="text-[13.5px] text-brand font-semibold hover:underline break-all">
                    {active.email}
                  </a>
                </div>
              </div>

              {/* Manager + Hours */}
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div className="bg-bg border border-line rounded p-3 flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center font-extrabold text-[15px] flex-shrink-0">
                    {active.manager.initials}
                  </div>
                  <div>
                    <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold">负责人</b>
                    <div className="text-[13.5px] text-ink font-semibold">{active.manager.name}</div>
                    <div className="text-[11.5px] text-mute">{active.manager.title}</div>
                  </div>
                </div>
                <div className="bg-bg border border-line rounded p-3">
                  <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1">⏰ 营业时间</b>
                  <div className="text-[12.5px] text-ink leading-relaxed">{active.hours}</div>
                </div>
              </div>

              {/* Departments */}
              <div>
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">🏢 办事处部门</b>
                <div className="flex flex-wrap gap-1.5">
                  {active.departments.map((d) => (
                    <span key={d} className="text-[11.5px] bg-brand/8 text-brand border border-brand/20 px-2 py-1 rounded-sm font-semibold">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">⚡ {active.city}主要服务</b>
                <ul className="space-y-1.5">
                  {active.services.map((s, i) => (
                    <li key={i} className="flex gap-2 text-[13px] text-ink leading-relaxed">
                      <span className="text-success flex-shrink-0">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Transit + Parking + Landmark */}
              <div className="border-t border-line pt-4">
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">🧭 交通方式</b>
                <div className="space-y-2 text-[12.5px] text-ink leading-relaxed">
                  <div><b className="text-mute">公共交通：</b> {active.transit}</div>
                  <div><b className="text-mute">停车：</b> {active.parking}</div>
                  <div><b className="text-mute">地标：</b> {active.landmark}</div>
                </div>
              </div>
            </div>

            {/* Right column — map + CTA */}
            <div className="space-y-4">
              <MapCard office={active} />

              {/* Schedule visit CTA */}
              <div className="bg-bg border border-line rounded p-4">
                <b className="block text-[13px] text-ink mb-1">📅 预约到访</b>
                <p className="text-[11.5px] text-mute leading-relaxed mb-3">
                  办事处接待企业采购商到访面谈。请提前 24 小时预约，以便准备专属会议室及符合行业的资料。
                </p>
                <Link
                  href="/info/contact#dat-lich"
                  className="block text-center py-2 bg-brand text-white rounded-sm text-[12px] font-bold cursor-pointer hover:bg-brand-light"
                >
                  在线预约 →
                </Link>
              </div>

              {/* Quick stats */}
              <div className="bg-paper border border-line rounded p-4">
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">速览信息</b>
                <ul className="space-y-1.5 text-[12px]">
                  <li className="flex justify-between"><span className="text-mute">地区</span><b className="text-ink">{active.region === "VN" ? "越南" : "中国"}</b></li>
                  <li className="flex justify-between"><span className="text-mute">职能</span><b className="text-ink text-right text-[11.5px]">{active.role.split(" · ")[0]}</b></li>
                  <li className="flex justify-between"><span className="text-mute">团队</span><b className="text-ink">{active.teamSize} 人</b></li>
                  <li className="flex justify-between"><span className="text-mute">时区</span><b className="text-ink">{active.timezone.split(" ")[0]}</b></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Contact channels =============================================== */}
      <div className="max-w-[1100px] mx-auto px-4 mb-9">
        <div className="text-center mb-5">
          <h2 className="text-[22px] font-bold text-ink max-md:text-[18px]">即时联系渠道</h2>
          <p className="text-[13px] text-mute mt-1">无法到访办事处？选择下方合适的渠道——多数在几分钟内回复</p>
        </div>
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
          {CHANNELS.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="block bg-paper border border-line rounded p-4 cursor-pointer hover:border-brand transition group"
            >
              <div className="text-[28px] mb-2">{c.icon}</div>
              <b className="block text-[14px] text-ink mb-1 group-hover:text-brand">{c.title}</b>
              <p className="text-[11.5px] text-mute leading-snug mb-3">{c.desc}</p>
              <span className="text-[12px] text-brand font-semibold">{c.action} →</span>
            </a>
          ))}
        </div>
      </div>

      {/* === Departments =================================================== */}
      <div className="max-w-[1100px] mx-auto px-4 mb-9">
        <div className="text-center mb-5">
          <h2 className="text-[22px] font-bold text-ink max-md:text-[18px]">各部门邮箱</h2>
          <p className="text-[13px] text-mute mt-1">8 个专责联络点——选对部门可获最快回复</p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {DEPARTMENTS.map((d) => (
            <a
              key={d.email}
              href={`mailto:${d.email}`}
              className="bg-paper border border-line rounded p-4 flex gap-3 items-start cursor-pointer hover:border-brand group"
            >
              <span className="w-12 h-12 bg-brand/8 border border-brand/20 rounded flex items-center justify-center text-[20px] flex-shrink-0">
                {d.icon}
              </span>
              <div className="flex-1 min-w-0">
                <b className="block text-[14px] text-ink group-hover:text-brand">{d.title}</b>
                <div className="text-[12px] text-brand font-semibold break-all">{d.email}</div>
                <p className="text-[11.5px] text-mute leading-snug mt-1">{d.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* === FAQ + CTA ===================================================== */}
      <div className="max-w-[1100px] mx-auto px-4 mb-10">
        <div
          className="rounded p-7 text-white text-center max-md:p-5"
          style={{ background: "linear-gradient(135deg, #002557 0%, #001A3F 100%)" }}
        >
          <h3 className="text-[24px] font-bold mb-2 max-md:text-[20px]">需要一对一企业咨询？</h3>
          <p className="text-[13.5px] opacity-85 mb-5 max-w-[640px] mx-auto leading-relaxed">
            预约与销售团队 30 分钟咨询——分析采购需求、选择合适的等级、介绍交易保障和市场报告。经营满 3 年以上的企业免费。
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/buying-request"
              className="inline-block px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              🚀 立即发送询价
            </Link>
            <a
              href="mailto:hello@huayuesc.vn"
              className="inline-block px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              📧 预约咨询
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
