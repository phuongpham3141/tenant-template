import type { PartnerProduct } from "@/data/partners";

/**
 * LINVOL 领沃 catalog — 4 real elevator lines from linvol.midea.com.cn.
 * The official elevator brand of the Midea Group (Midea Building Technologies).
 * Manufacturer: 菱王电梯有限公司 (Lingwang Elevator). Official images (verified). English names.
 */

export const LINVOL_PRODUCTS: PartnerProduct[] = [
  // ─── Home elevators ───────────────────────────────
  {
    model: "LV-VILLA",
    slug: "lv-villa",
    name: "LINVOL Villa Elevator",
    nameOriginal: "别墅电梯",
    series: "Home Elevators",
    seriesOriginal: "villa",
    desc: "The LINVOL Villa Elevator features a comprehensively redesigned cabin and components that make the most of the shaft space, with a fashionable look and rich customization options. Part of the official elevator brand of the Midea Group.",
    image: "/img/products/linvol/lv-villa.png",
    specs: [
      { k: "Type", v: "Home / villa elevator" },
      { k: "Brand", v: "LINVOL 领沃 — Midea Building Technologies" },
      { k: "Manufacturer", v: "菱王电梯有限公司 (Lingwang Elevator)" },
      { k: "Service", v: "Full-lifecycle concierge + expert support — lifetime warranty + maintenance" },
    ],
    applications: ["Villas, townhouses, and premium multi-story homes"],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── Retrofit elevators ───────────────────────────────
  {
    model: "LV-RETRO",
    slug: "lv-retro",
    name: "LINVOL Retrofit Elevator",
    nameOriginal: "加装改造电梯",
    series: "Retrofit Elevators",
    seriesOriginal: "retrofit",
    desc: "The LINVOL Retrofit Elevator is purpose-built for adding elevators to older buildings, combining the latest digital technology with people-centered design to serve residential communities and elderly residents.",
    image: "/img/products/linvol/lv-retro.png",
    specs: [
      { k: "Type", v: "Retrofit elevator for older buildings" },
      { k: "Brand", v: "LINVOL 领沃 — Midea Building Technologies" },
      { k: "Manufacturer", v: "菱王电梯有限公司 (Lingwang Elevator)" },
      { k: "Highlights", v: "Latest digital technology + people-centered community design" },
    ],
    applications: ["Apartments/older buildings adding an elevator", "Residential areas with many elderly residents"],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── Escalators ───────────────────────────────
  {
    model: "LV-ESC",
    slug: "lv-esc",
    name: "LINVOL Escalator",
    nameOriginal: "自动扶梯",
    series: "Escalators",
    seriesOriginal: "escalator",
    desc: "The LINVOL Escalator is built for shopping malls, train stations, and airports: precision construction, smooth operation, and energy efficiency.",
    image: "/img/products/linvol/lv-esc.png",
    specs: [
      { k: "Type", v: "Escalator" },
      { k: "Brand", v: "LINVOL 领沃 — Midea Building Technologies" },
      { k: "Manufacturer", v: "菱王电梯有限公司 (Lingwang Elevator)" },
      { k: "Features", v: "Precision construction, smooth operation, energy efficiency" },
    ],
    applications: ["Shopping malls", "Train stations and airports", "High-traffic public facilities"],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
  // ─── Passenger elevators ───────────────────────────────
  {
    model: "LV-PAX",
    slug: "lv-pax",
    name: "LINVOL Passenger Elevator",
    nameOriginal: "乘客电梯",
    series: "Passenger Elevators",
    seriesOriginal: "passenger",
    desc: "The digital LINVOL Passenger Elevator is built for hotels, offices, and apartments: outstanding performance, high safety, and energy efficiency, applying digital + AI technology across the elevator's entire lifecycle.",
    image: "/img/products/linvol/lv-pax.png",
    specs: [
      { k: "Type", v: "Passenger elevator" },
      { k: "Brand", v: "LINVOL 领沃 — Midea Building Technologies" },
      { k: "Manufacturer", v: "菱王电梯有限公司 (Lingwang Elevator)" },
      { k: "Technology", v: "Digital + AI across the full elevator lifecycle" },
    ],
    applications: ["Hotels", "Office buildings", "Apartments and residences"],
    sourceUrl: "https://linvol.midea.com.cn/home",
  },
];
