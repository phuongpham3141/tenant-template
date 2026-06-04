/**
 * Huayue Supply Chain — Single source of truth for company facts.
 *
 * All pages displaying legal entity name, addresses, tax ID, hotline,
 * vision, industries… should IMPORT from this file (do not hardcode).
 *
 * Source of truth: Huayue Supply Chain brochure (PDF).
 */

export const COMPANY = {
  // ─── Legal identity ─────────────────────────────────────────────────────
  legalNameVi: "Huayue Supply Chain (Vietnam) Co., Ltd.",
  legalNameCn: "Huayue Supply Chain Co., Ltd.",
  brandShort: "Huayuesc",
  brandCn: "Huayue Supply Chain",
  taxId: "0111453693",
  domain: "huayuesc.vn",
  websiteUrl: "https://huayuesc.vn",

  // ─── Vision & Mission (from brochure cover + closing) ──────────────────
  visionCn: "To become the benchmark enterprise in China–Vietnam supply chain services and lead a new ecosystem for China–Vietnam trade in building materials and home furnishings.",
  visionVi:
    "To become a model company for China–Vietnam supply chain services, leading and building a new ecosystem for trade in building materials and home furnishings between China and Vietnam.",

  missionCn: "Through professional, efficient and reliable one-stop cross-border supply chain services, help Chinese manufacturing shine in Vietnam and empower the Vietnam market to upgrade and grow.",
  missionVi:
    "Through professional, highly efficient and reliable one-stop supply chain services, we help Chinese manufacturing shine in Vietnam while helping the Vietnam market advance to a higher level.",

  taglineCn: "No trip to China needed —— one-stop sourcing of premium Chinese goods.",
  taglineVi:
    "With Huayue, you do not need to travel to China —— you can still source premium Chinese products quickly and conveniently.",

  // ─── Three product industries (brochure page 4) ─────────────────────────
  industries: [
    {
      key: "construction-materials",
      nameVi: "Building Materials",
      nameCn: "Building Materials",
      icon: "🧱",
      examples: [
        "Porcelain tiles",
        "Sanitaryware",
        "Hardware & metal fittings",
        "Door materials & profiles",
        "Paints & coatings",
        "Pipes & pipe fittings",
        "Lighting fixtures",
      ],
    },
    {
      key: "decoration",
      nameVi: "Interior Decoration Materials",
      nameCn: "Decoration Materials",
      icon: "🛋",
      examples: [
        "Wallpaper & wall fabric",
        "Engineered wood flooring / solid wood flooring",
        "Ceiling decoration materials",
        "Natural & engineered stone",
        "Interior decorative items",
      ],
    },
    {
      key: "kitchen-bathroom-appliances",
      nameVi: "Kitchen & Bathroom Appliances",
      nameCn: "Kitchen & Bathroom Appliances",
      icon: "🔌",
      examples: [
        "Electric water heaters",
        "Gas cooktops",
        "Range hoods",
        "Rice cookers",
        "Masticating juicers",
        "Smart toilet seats",
      ],
    },
  ] as const,

  // ─── Four core services (brochure page 3) ───────────────────────────────
  services: [
    {
      key: "source-selection",
      nameVi: "Source Selection & Sourcing Support",
      nameCn: "Source Selection & Sourcing Support",
      desc: "We screen competitive Chinese suppliers, control quality at the factory, and manage orders and consolidated sourcing — minimizing both cost and sourcing risk.",
    },
    {
      key: "warehouse-cn",
      nameVi: "Warehousing in China & Consolidated Shipping",
      nameCn: "Warehousing in China & Consolidated Shipping",
      desc: "We build or partner with modern warehouses at key Chinese industrial parks and ports, providing safe and efficient warehouse management services.",
    },
    {
      key: "logistics-customs",
      nameVi: "Cross-Border Logistics & Efficient Customs Clearance",
      nameCn: "Cross-Border Logistics & Efficient Customs Clearance",
      desc: "Door-to-door and port-to-port; our customs team at Hai Phong port is well versed in import-export law, ensuring fast, compliant and cost-effective customs clearance.",
    },
    {
      key: "vn-distribution",
      nameVi: "Distribution Channel Development in Vietnam",
      nameCn: "Localized Distribution Channel Development",
      desc: "An extensive partner network across Vietnam — bringing Chinese brands and products into the main distribution channels.",
    },
  ] as const,

  // ─── Warehouse + Logistics + Customs (brochure page 6) ──────────────────
  warehouseTypes: [
    { nameVi: "Ambient-temperature storage", nameCn: "Ambient-temperature storage area" },
    { nameVi: "Dedicated warehouse for flammables (paints, solvents)", nameCn: "Flammables warehouse (e.g. paint, thinner)" },
    { nameVi: "Climate-controlled (temperature & humidity) warehouse", nameCn: "Temperature- and humidity-controlled warehouse" },
  ] as const,

  // ─── Digital supply chain pillars (brochure page 7) ─────────────────────
  digitalPillars: [
    {
      nameVi: "Data-Driven Decisions",
      nameCn: "Data-Driven Decisions",
      desc: "Big data analytics to forecast market demand and optimize inventory.",
    },
    {
      nameVi: "Smart Automation",
      nameCn: "Smart Automation",
      desc: "AI algorithms automatically process orders, coordinate shipping and optimize logistics routes.",
    },
    {
      nameVi: "Collaborative Network",
      nameCn: "Collaborative Network",
      desc: "A platform that connects every supplier, manufacturer, shipping company and final retail channel.",
    },
  ] as const,

  // ─── Offices (brochure page 8) ──────────────────────────────────────────
  offices: {
    cn: {
      key: "guangzhou",
      cityVi: "Guangzhou",
      cityCn: "Guangzhou",
      countryVi: "China",
      countryCn: "China",
      addressCn: "Floor 3, Building 1, Shuyu Chuangxing Port, North Wharf, Huangpu Village, Xingang East Road, Haizhu District, Guangzhou, China",
      addressVi:
        "Floor 3, Building 1, Shuyu Chuangxing Port, North Wharf, Huangpu Village, Xingang East Road, Haizhu District, Guangzhou, China",
      role: "Sourcing center, factory audits, sourcing & QC",
      timezone: "GMT+8",
    },
    vn: {
      key: "hanoi",
      cityVi: "Hanoi",
      cityCn: "Hanoi",
      countryVi: "Vietnam",
      countryCn: "Vietnam",
      addressCn: "Floor 7, Bao Ngoc Building, No. 02 Thanh Lam Street, Xuan Phuong Ward, Hanoi, Vietnam",
      addressVi:
        "Floor 7, Bao Ngoc Building, No. 02 Thanh Lam Street, Xuan Phuong Ward, Hanoi, Vietnam",
      role: "Headquarters · Operations · Vietnam Distribution",
      timezone: "GMT+7",
    },
  } as const,

  // ─── Contact (brochure page 8) ──────────────────────────────────────────
  contact: {
    hotline: "+86 181-2225-6999",
    emails: {
      sales: "sales@huayuesc.vn",
      support: "support@huayuesc.vn",
      hr: "hr@huayuesc.vn",
      privacy: "privacy@huayuesc.vn",
      partnership: "partnership@huayuesc.vn",
    },
    social: {
      zalo: "https://zalo.me/huayuesc",
      facebook: "https://fb.com/huayuesc",
      wechat: "huayuesc_qc",
    },
  } as const,

  // ─── Legal / Regulatory ─────────────────────────────────────────────────
  legal: {
    arbitrationVenue: "VIAC Hanoi",
    governingLaw: "Laws of Vietnam",
    dataProtection: ["ISO/IEC 27001:2022", "NĐ 13/2023/NĐ-CP (VN)", "PIPL (China)", "GDPR (EU where applicable)"],
  } as const,
} as const;

export type Industry = (typeof COMPANY.industries)[number];
export type Service = (typeof COMPANY.services)[number];

/** Convenience: short legal line for footer. */
export const COMPANY_FOOTER_LINE = `© 2026 ${COMPANY.legalNameVi} · ${COMPANY.domain} · Tax ID: ${COMPANY.taxId}`;
