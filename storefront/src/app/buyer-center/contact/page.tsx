import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";

const CHANNELS = [
  {
    icon: "📧",
    title: "Email Support",
    primary: "buyer@alibabavn.com",
    secondary: "support@alibabavn.com",
    hours: "Reply within 4 business hours · 7:00–22:00 daily",
    color: "bg-brand/10 text-brand",
  },
  {
    icon: "📞",
    title: "24/7 Hotline",
    primary: "1900 6868 (VN)",
    secondary: "+86 020 8888 6868 (CN)",
    hours: "Vietnamese · Chinese · English",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: "💬",
    title: "Live Chat",
    primary: "Zalo: Huayuesc-Buyer",
    secondary: "WeChat: Huayuesc_Service",
    hours: "Online 8:00–22:00 · reply in under 5 min",
    color: "bg-success/10 text-success",
  },
];

const OFFICES = [
  {
    flag: "🇻🇳",
    city: "Hanoi Office",
    address: "18th Floor, Lotte Center, 54 Lieu Giai, Ba Dinh, Hanoi",
    phone: "+84 24 3939 6868",
    email: "hanoi@alibabavn.com",
    hours: "Mon – Sat: 8:00 – 18:00",
  },
  {
    flag: "🇻🇳",
    city: "Ho Chi Minh City Office",
    address: "12th Floor, Bitexco Financial Tower, 2 Hai Trieu, District 1, Ho Chi Minh City",
    phone: "+84 28 3868 6868",
    email: "hcm@alibabavn.com",
    hours: "Mon – Sat: 8:00 – 18:00",
  },
  {
    flag: "🇨🇳",
    city: "Guangzhou Office",
    address: "Room 1808, R&F Center, No.10 Huaxia Rd, Tianhe District, Guangzhou",
    phone: "+86 020 8888 6868",
    email: "guangzhou@alibabavn.com",
    hours: "Mon – Fri: 9:00 – 18:00 (GMT+8)",
  },
  {
    flag: "🇨🇳",
    city: "Foshan Representative Office",
    address: "5th Floor, China Ceramics City, Chancheng District, Foshan, Guangdong",
    phone: "+86 0757 8222 6868",
    email: "foshan@alibabavn.com",
    hours: "Mon – Fri: 9:00 – 18:00 (GMT+8)",
  },
];

const SUBJECTS = [
  "General support",
  "RFQ / quote issue",
  "Issue with an order in progress",
  "Quality / shipping complaint",
  "Factory audit request",
  "QC inspection request",
  "Payment / Trade Assurance support",
  "System bug report",
  "Product suggestion / feedback",
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Buyer Center", href: "/buyer-center" }, { label: "Contact Us" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/contact" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📞 CONTACT US</div>
            <h1 className="text-[22px] font-bold text-ink">Contact Us</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              The Huayuesc Buyer Success team is on the ground in Hanoi, Ho Chi Minh City, Guangzhou, and Foshan. Every request is handled by native Vietnamese-speaking staff — no chatbots, no lost-in-translation.
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
              🗺️ Google Maps – Hanoi office (Lotte Center)
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-1">✉️ Send us a message</b>
            <p className="text-[12px] text-mute mb-4">Reply within 4 business hours — with a ticket number so you can track it.</p>
            <form className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              <input placeholder="Full name *" className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <input placeholder="Email *" type="email" className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <input placeholder="Phone" className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <input placeholder="Company (optional)" className="px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              <select className="col-span-2 px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white outline-none focus:border-brand">
                <option value="">-- Subject * --</option>
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>
              <textarea placeholder="Message details *" rows={5} className="col-span-2 px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand resize-none" />
              <label className="col-span-2 flex items-center gap-2 text-[12px] text-mute">
                <input type="checkbox" className="accent-brand" /> I agree to let Huayuesc use my email/phone to contact me about this matter.
              </label>
              <button type="button" className="col-span-2 px-5 py-3 bg-accent text-white rounded-sm font-bold text-[13.5px] hover:opacity-90 max-md:col-span-1">Send Message 📨</button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Link href="/buyer-center/contact?subject=bug" className="bg-paper border border-line rounded p-4 hover:border-accent">
              <b className="block text-[13px] text-ink mb-1">🐞 Report a system issue</b>
              <p className="text-[11.5px] text-mute leading-snug">Hit an error posting an RFQ, paying, or viewing a report? Tell our engineering team for priority handling within 2 hours.</p>
            </Link>
            <Link href="/info/cau-hoi-thuong-gap" className="bg-paper border border-line rounded p-4 hover:border-brand">
              <b className="block text-[13px] text-ink mb-1">❓ FAQ – frequently asked questions</b>
              <p className="text-[11.5px] text-mute leading-snug">90% of buyer questions already have detailed answers — check before submitting a ticket.</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Contact Us — Buyer Center" };
