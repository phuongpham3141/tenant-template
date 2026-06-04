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
    city: "Hanoi",
    cityEn: "Hanoi",
    role: "Headquarters — Operations, Sales & Vietnam Distribution",
    isHQ: true,
    address: "Floor 7, Bao Ngoc Building, No. 02 Thanh Lam Street, Xuan Phuong Ward, Hanoi, Vietnam",
    addressCn: "越南河内市春芳坊清林街2号宝玉大厦7楼",
    addressEn:
      "Floor 7, Bao Ngoc Building, No. 02 Thanh Lam Street, Xuan Phuong Ward, Hanoi, Vietnam",
    phone: "+86 181-2225-6999",
    hotline: "+86 181-2225-6999",
    email: "support@huayuesc.vn",
    manager: {
      name: "Hanoi Operations Team",
      title: "Head of Operations & Distribution",
      initials: "HN",
    },
    teamSize: 20,
    departments: [
      "VNACCS/VCIS customs clearance (working with Hai Phong port)",
      "Logistics & carrier coordination",
      "Vietnam distribution (Hanoi, Ho Chi Minh City, 63 provinces)",
      "B2B sales of building materials & furniture",
      "Vietnamese-language Customer Success",
      "Dealer & construction contractor partnerships",
    ],
    hours: "Mon – Sat: 8:00 – 17:30",
    timezone: "GMT+7 (Asia/Ho_Chi_Minh)",
    transit:
      "Bao Ngoc Building at No. 02 Thanh Lam Street, Xuan Phuong Ward — in western Hanoi, about 3 km from the My Dinh center and about 30 km from Noi Bai airport via Thang Long Boulevard. Buses 27, 29, and 32 stop near the building.",
    parking: "On-site parking at Bao Ngoc Building — free for visitors with an appointment (notify reception in advance via hotline)",
    landmark:
      "Bao Ngoc Building, Xuan Phuong Ward, in the Nam Tu Liem area of western Hanoi — near building-materials dealers and furniture showrooms in Hanoi and the northern provinces",
    services: [
      "Vietnam-end supply chain management (logistics + customs clearance + distribution)",
      "VNACCS/VCIS clearance for containers imported from China (Hai Phong / Cat Lai ports)",
      "DDP domestic shipping to Hanoi, Ho Chi Minh City, and 63 provinces",
      "Sales & advisory for Vietnamese buyers via hotline + email",
      "Partnerships with dealers, construction contractors, and interior design firms",
      "24/7 Vietnamese-language Customer Success support",
    ],
    googleMapsQuery: "Bao+Ngoc+Building+02+Thanh+Lam+Xuan+Phuong+Hanoi",
  },
  {
    id: "gz",
    flag: "🇨🇳",
    region: "CN",
    city: "Guangzhou",
    cityEn: "Guangzhou",
    role: "Representative Office — Procurement, Factory Audit & Sourcing",
    address: "3F, Building 1, Shuyu Chuangxing Port, North Wharf of Huangpu Village, East Xingang Road, Haizhu District, Guangzhou, China",
    addressCn: "广州市海珠区新港东路黄埔村北码头数娱创兴港1号楼3楼",
    addressEn: "3F, Building 1, Shuyu Chuangxing Port, North Wharf of Huangpu Village, East Xingang Road, Haizhu District, Guangzhou, China",
    phone: "+86 181-2225-6999",
    email: "sales@huayuesc.vn",
    manager: { name: "Guangzhou Sourcing Team", title: "Sourcing & QC Team Lead", initials: "GZ" },
    teamSize: 15,
    departments: [
      "Sourcing & curated supplier selection",
      "On-site factory QC inspectors",
      "On-site supplier audits",
      "Chinese – Vietnamese commercial interpretation",
      "Factory & industry-association relations in Guangdong",
    ],
    hours: "Mon – Fri: 9:00 – 18:00 · Sat: 9:00 – 12:00 (Beijing time)",
    timezone: "GMT+8 (Asia/Shanghai)",
    transit: "Haizhu District — the old center of Guangzhou, about 6 km from Guangzhou East railway station and 35 km from Baiyun International Airport. Near the Foshan ceramics cluster (50 km), the Lecong furniture cluster (40 km), and the Midea appliances cluster (30 km).",
    parking: "Parking at Shuyu Chuangxing Port — with space for visitors with an appointment",
    landmark: "The Shuyu Chuangxing digital-culture port at the North Wharf of Huangpu Village, the central commercial district of Haizhu, near the Pearl River",
    services: [
      "Screening & auditing of Chinese factories across Huayue's 3 industries (building materials / interior materials / kitchen & bathroom appliances)",
      "Pre-shipment QC inspectors — AQL 2.5 standard",
      "Vietnamese – Chinese interpretation for RFQs and negotiations",
      "Representing Vietnamese buyers on factory visits",
      "Liaison with industry associations in Guangdong, Foshan, Zhongshan, and Chaozhou",
    ],
    googleMapsQuery: "数娱创兴港+Shuyu+Chuangxing+Xingang+East+Road+Haizhu+Guangzhou",
  },
];

const DEPARTMENTS = [
  { icon: "💼", title: "Sales & Sourcing Advisory", email: "sales@huayuesc.vn", desc: "RFQ advisory, screening Chinese suppliers, price negotiation, PI/PO contracts." },
  { icon: "🚚", title: "Logistics, Customs Clearance & Warehouse", email: "support@huayuesc.vn", desc: "DDP / FOB / CIF — booking shipping, VNACCS clearance (Hai Phong & Cat Lai ports), order tracking." },
  { icon: "🔍", title: "QC & Factory Audit", email: "sales@huayuesc.vn", desc: "AQL 2.5 pre-shipment inspection, on-site supplier audits in Guangdong, reports with photos/video." },
  { icon: "🛡", title: "Trade Assurance & Complaints", email: "support@huayuesc.vn", desc: "Escrow account, dispute mediation, refund or replacement under Section 7 of the Terms." },
  { icon: "🤝", title: "Distribution & Dealer Partners (Vietnam)", email: "partnership@huayuesc.vn", desc: "Partnerships with distribution dealers, construction contractors, and interior design firms." },
  { icon: "👥", title: "Recruitment & HR", email: "hr@huayuesc.vn", desc: "Applications for roles in Hanoi and Guangzhou, internal training." },
  { icon: "🔒", title: "Privacy & DPO", email: "privacy@huayuesc.vn", desc: "Data subject rights, NĐ 13/2023, breach notification within 72h." },
];

const CHANNELS = [
  { icon: "📞", title: "Hotline", desc: "+86 181-2225-6999 — Vietnamese + Chinese support, 8am–10pm", action: "Call Now", href: "tel:+8618122256999" },
  { icon: "✉", title: "Email", desc: "support@huayuesc.vn — response under 6 business hours", action: "Compose Email", href: "mailto:support@huayuesc.vn" },
  { icon: "💬", title: "Website Live Chat", desc: "Response under 5 minutes during business hours; AI 24/7 after hours", action: "Open Chat", href: "#chat" },
  { icon: "📱", title: "Zalo OA", desc: "Huayuesc — fastest Vietnamese-language chat", action: "Open Zalo", href: "https://zalo.me/huayuesc" },
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
          🗺 Open Google Maps
        </a>
        <a
          href={dirUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center py-2 bg-brand text-white rounded-sm text-[12px] font-bold cursor-pointer hover:bg-brand-light"
        >
          🧭 Get Directions
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
          { label: "Home", href: "/" },
          { label: "Information", href: "/help" },
          { label: "Contact" },
        ]}
      />

      {/* === HERO ============================================================ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, #001A3F 100%)" }}
      >
        <div className="max-w-[1100px] mx-auto px-4 py-10 max-md:py-7">
          <span className="inline-block bg-gold text-brand-dark text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wider mb-3">
            📍 CONTACT
          </span>
          <h1 className="text-[34px] font-extrabold leading-tight mb-3 max-md:text-[24px]">
            Contact Huayuesc — Two offices, one supply chain
          </h1>
          <p className="text-[14.5px] opacity-90 max-w-[720px] leading-relaxed mb-5 max-md:text-[13px]">
            Our headquarters at <b>Floor 7, Bao Ngoc Building, No. 02 Thanh Lam Street, Xuan Phuong Ward, Hanoi</b> handles warehousing, VNACCS clearance, and distribution in Vietnam. Our procurement representative office at <b>3F, Shuyu Chuangxing Port, Haizhu District, Guangzhou</b> handles sourcing, factory audits, and pre-shipment QC. A single hotline: <b>+86 181-2225-6999</b> — with Vietnamese and Chinese support.
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            {[
              { n: "8", l: "Offices" },
              { n: "114", l: "Staff" },
              { n: "5", l: "Countries" },
              { n: "24/7", l: "Online support" },
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
              <h2 className="text-[18px] font-bold text-ink">Select an office to view details</h2>
              <p className="text-[12.5px] text-mute mt-0.5">2 offices — the Hanoi headquarters (Vietnam) and the Guangzhou representative office (China)</p>
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
                  {r === "all" ? "All (2)" : r === "VN" ? "🇻🇳 Vietnam (1)" : "🇨🇳 China (1)"}
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
                <div className="text-[11px] opacity-80 uppercase tracking-wider">Team</div>
                <div className="text-[20px] font-extrabold">{active.teamSize} people</div>
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
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1.5">📍 Address</b>
                <p className="text-[14px] text-ink leading-relaxed">{active.address}</p>
                <p className="text-[12px] text-mute italic mt-0.5">{active.addressEn}</p>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div>
                  <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1.5">📞 Phone</b>
                  <a href={`tel:${active.phone.replace(/\s/g, "")}`} className="text-[13.5px] text-brand font-semibold hover:underline">
                    {active.phone}
                  </a>
                  {active.hotline && (
                    <div className="text-[12px] text-mute mt-0.5">Vietnam hotline: <b className="text-ink">{active.hotline}</b></div>
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
                    <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold">Contact person</b>
                    <div className="text-[13.5px] text-ink font-semibold">{active.manager.name}</div>
                    <div className="text-[11.5px] text-mute">{active.manager.title}</div>
                  </div>
                </div>
                <div className="bg-bg border border-line rounded p-3">
                  <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-1">⏰ Business hours</b>
                  <div className="text-[12.5px] text-ink leading-relaxed">{active.hours}</div>
                </div>
              </div>

              {/* Departments */}
              <div>
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">🏢 Departments at this office</b>
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
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">⚡ Key services in {active.city}</b>
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
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">🧭 Getting here</b>
                <div className="space-y-2 text-[12.5px] text-ink leading-relaxed">
                  <div><b className="text-mute">Public transit:</b> {active.transit}</div>
                  <div><b className="text-mute">Parking:</b> {active.parking}</div>
                  <div><b className="text-mute">Landmark:</b> {active.landmark}</div>
                </div>
              </div>
            </div>

            {/* Right column — map + CTA */}
            <div className="space-y-4">
              <MapCard office={active} />

              {/* Schedule visit CTA */}
              <div className="bg-bg border border-line rounded p-4">
                <b className="block text-[13px] text-ink mb-1">📅 Schedule a visit</b>
                <p className="text-[11.5px] text-mute leading-relaxed mb-3">
                  Our offices welcome business buyers for in-person meetings. Book at least 24h ahead so we can prepare a private room and materials tailored to your industry.
                </p>
                <Link
                  href="/info/contact#dat-lich"
                  className="block text-center py-2 bg-brand text-white rounded-sm text-[12px] font-bold cursor-pointer hover:bg-brand-light"
                >
                  Book online →
                </Link>
              </div>

              {/* Quick stats */}
              <div className="bg-paper border border-line rounded p-4">
                <b className="block text-[10.5px] uppercase tracking-wider text-mute font-bold mb-2">Quick facts</b>
                <ul className="space-y-1.5 text-[12px]">
                  <li className="flex justify-between"><span className="text-mute">Region</span><b className="text-ink">{active.region === "VN" ? "Vietnam" : "China"}</b></li>
                  <li className="flex justify-between"><span className="text-mute">Role</span><b className="text-ink text-right text-[11.5px]">{active.role.split(" · ")[0]}</b></li>
                  <li className="flex justify-between"><span className="text-mute">Team</span><b className="text-ink">{active.teamSize} people</b></li>
                  <li className="flex justify-between"><span className="text-mute">Time zone</span><b className="text-ink">{active.timezone.split(" ")[0]}</b></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Contact channels =============================================== */}
      <div className="max-w-[1100px] mx-auto px-4 mb-9">
        <div className="text-center mb-5">
          <h2 className="text-[22px] font-bold text-ink max-md:text-[18px]">Instant contact channels</h2>
          <p className="text-[13px] text-mute mt-1">Cannot make it to an office? Choose the right channel below — most reply within minutes</p>
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
          <h2 className="text-[22px] font-bold text-ink max-md:text-[18px]">Email by department</h2>
          <p className="text-[13px] text-mute mt-1">8 dedicated contacts — pick the right department for the fastest reply</p>
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
          <h3 className="text-[24px] font-bold mb-2 max-md:text-[20px]">Need a 1-on-1 business consultation?</h3>
          <p className="text-[13.5px] opacity-85 mb-5 max-w-[640px] mx-auto leading-relaxed">
            Book a 30-minute consultation with our sales team — analyzing your sourcing needs, choosing the right tier, and introducing Trade Assurance and Market Reports. Free for businesses with 3+ years of operation.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/buying-request"
              className="inline-block px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px] hover:bg-[#E8943A]"
            >
              🚀 Send an RFQ Now
            </Link>
            <a
              href="mailto:hello@huayuesc.vn"
              className="inline-block px-6 py-3 border-2 border-white/40 text-white rounded-sm font-bold text-[14px] hover:bg-white/10"
            >
              📧 Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
