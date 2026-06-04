import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";

const CHANNELS = [
  {
    icon: "📧",
    title: "邮件支持",
    primary: "buyer@alibabavn.com",
    secondary: "support@alibabavn.com",
    hours: "4 个工作小时内回复 · 每日 7:00–22:00",
    color: "bg-brand/10 text-brand",
  },
  {
    icon: "📞",
    title: "7×24 热线",
    primary: "1900 6868 (VN)",
    secondary: "+86 020 8888 6868 (CN)",
    hours: "越南语 · 中文 · 英语",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: "💬",
    title: "在线客服",
    primary: "Zalo: Huayuesc-Buyer",
    secondary: "WeChat: Huayuesc_Service",
    hours: "在线 8:00–22:00 · 5 分钟内响应",
    color: "bg-success/10 text-success",
  },
];

const OFFICES = [
  {
    flag: "🇻🇳",
    city: "河内办事处",
    address: "河内市巴亭郡柳街 54 号乐天中心大厦 18 层",
    phone: "+84 24 3939 6868",
    email: "hanoi@alibabavn.com",
    hours: "周一至周六：8:00 – 18:00",
  },
  {
    flag: "🇻🇳",
    city: "胡志明市办事处",
    address: "胡志明市第一郡海潮街 2 号 Bitexco 金融大厦 12 层",
    phone: "+84 28 3868 6868",
    email: "hcm@alibabavn.com",
    hours: "周一至周六：8:00 – 18:00",
  },
  {
    flag: "🇨🇳",
    city: "广州办事处",
    address: "广州市天河区华夏路 10 号富力中心 1808 室",
    phone: "+86 020 8888 6868",
    email: "guangzhou@alibabavn.com",
    hours: "周一至周五：9:00 – 18:00 (GMT+8)",
  },
  {
    flag: "🇨🇳",
    city: "佛山代表处",
    address: "广东省佛山市禅城区中国陶瓷城 5 层",
    phone: "+86 0757 8222 6868",
    email: "foshan@alibabavn.com",
    hours: "周一至周五：9:00 – 18:00 (GMT+8)",
  },
];

const SUBJECTS = [
  "综合咨询",
  "询价 / 报价问题",
  "处理中订单问题",
  "品质 / 物流投诉",
  "工厂验厂申请",
  "QC 验货申请",
  "支付 / 交易保障支持",
  "系统故障反馈",
  "产品建议 / 反馈",
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "采购商中心", href: "/buyer-center" }, { label: "联系我们" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/contact" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📞 CONTACT US</div>
            <h1 className="text-[22px] font-bold text-ink">联系我们</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              华越 Buyer Success 团队遍布河内、胡志明市、广州和佛山。您的每一项需求均由专业团队人工处理——无机器人、无误译。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 max-md:grid-cols-1">
            {CHANNELS.map((c) => (
              <div key={c.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className={`inline-flex w-12 h-12 rounded-full items-center justify-center text-[22px] mb-3 ${c.color}`}>{c.icon}</div>
                <b className="block text-[14px] text-ink mb-2">{c.title}</b>
                <div className="text-[13px] text-brand font-semibold">{c.primary}</div>
                <div className="text-[12.5px] text-mute mb-2">{c.secondary}</div>
                <div className="text-[11px] text-mute pt-2 border-t border-line">{c.hours}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            {OFFICES.map((o) => (
              <div key={o.city} className="bg-paper border border-line rounded p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[20px]">{o.flag}</span>
                  <b className="text-[14px] text-ink">{o.city}</b>
                </div>
                <div className="text-[12.5px] text-ink mb-1">📍 {o.address}</div>
                <div className="text-[12.5px] text-mute mb-1">📞 {o.phone}</div>
                <div className="text-[12.5px] text-mute mb-1">✉️ {o.email}</div>
                <div className="text-[11.5px] text-mute pt-2 border-t border-line mt-2">🕘 {o.hours}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#F5F7FA] border border-line rounded p-3 mb-4 text-center">
            <div className="aspect-[3/1] bg-paper border border-dashed border-line rounded flex items-center justify-center text-mute text-[13px]">
              🗺️ Google Maps 地图 – 河内办事处（乐天中心）
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-1">✉️ 给我们留言</b>
            <p className="text-[12px] text-mute mb-4">4 个工作小时内回复——并附工单编号供您追踪。</p>
            <form className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              <input placeholder="姓名 *" className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <input placeholder="邮箱 *" type="email" className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <input placeholder="电话" className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <input placeholder="公司（选填）" className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <select className="col-span-2 px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white outline-none focus:border-brand">
                <option value="">-- 咨询主题 * --</option>
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>
              <textarea placeholder="详细内容 *" rows={5} className="col-span-2 px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand resize-none" />
              <label className="col-span-2 flex items-center gap-2 text-[12px] text-mute">
                <input type="checkbox" className="accent-brand" /> 我同意华越使用我的邮箱/电话就此事与我联系。
              </label>
              <button type="button" className="col-span-2 px-5 py-3 bg-accent text-white rounded-sm font-bold text-[13.5px] hover:opacity-90 max-md:col-span-1">发送留言 📨</button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link href="/buyer-center/contact?subject=bug" className="bg-paper border border-line rounded p-4 hover:border-accent">
              <b className="block text-[13px] text-ink mb-1">🐞 系统故障反馈</b>
              <p className="text-[11.5px] text-mute leading-snug">在发起询价、支付或查看报告时遇到错误？反馈给技术团队，2 小时内优先处理。</p>
            </Link>
            <Link href="/info/cau-hoi-thuong-gap" className="bg-paper border border-line rounded p-4 hover:border-brand">
              <b className="block text-[13px] text-ink mb-1">❓ FAQ – 常见问题</b>
              <p className="text-[11.5px] text-mute leading-snug">90% 采购商的问题都有详细解答——提交工单前请先查阅。</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "联系我们 — 采购商中心" };
