export type Badge = "new" | "gold" | "deal" | "oem" | "top";

export type Product = {
  id: string;
  title: string;
  price: string;
  unit: string;
  moq: string;
  rating: number;
  seller: string;
  years: string;
  badges?: Badge[];
  image?: string;
  tags?: string[];
};

export type Section = {
  id: string;
  num: number;
  title: string;
  cn: string;
  tabs: string[];
  totalCount: string;
  categorySlug: string;
  featureSlug: string;
  feature: {
    badge: string;
    title: string;
    desc: string;
    cta: string;
    image?: string;
  };
  products: Product[];
};

export type Factory = {
  initials: string;
  slug: string;
  name: string;
  location: string;
  rating: number;
  reviews: string;
  meta: string;
  badges: { gold?: boolean; audited?: boolean; years: string };
  tags: string[];
  /** Made-in-China VR comId — 如有，则在 VR 全景标签页显示 360° 漫游。 */
  vr360ComId?: string;
};

export type Zone = {
  slug: string;
  name: string;
  count: string;
  image?: string;
};

export const HOT_SEARCHES = [
  "瓷砖",
  "大板大理石",
  "沙发套装",
  "橱柜",
  "实木复合地板",
  "酒店床具",
];

export const NAV_CATEGORIES = [
  { icon: "🏠", name: "家居与园艺", slug: "home-garden" },
  { icon: "🧱", name: "建筑材料", slug: "construction-materials" },
  { icon: "🚿", name: "卫浴洁具", slug: "bathroom-sanitary" },
  { icon: "🛋", name: "家具", slug: "noi-that" },
  { icon: "🍳", name: "厨房设备", slug: "kitchen-equipment" },
  { icon: "💡", name: "灯具照明", slug: "lighting" },
  { icon: "🪟", name: "门窗", slug: "doors-windows" },
  { icon: "⚡", name: "电气与电器", slug: "electrical" },
];

export type NavSubItem = {
  name: string;
  slug: string;
  /** Emoji shown next to the sub-item name in the mega-menu sidebar
      (mirrors the main category icon styling). */
  icon: string;
  image: string;
  /** Tagline shown next to hero image in the sub-panel. */
  tagline: string;
  /** Legacy: 6 related thumbnails. Still used by sub-panel hero strip preview. */
  highlights: { name: string; image: string; slug?: string }[];
  /** CSR-style sections grid: 4 sections × 4 sub-sub items as text links. */
  sections: { title: string; items: { name: string; slug?: string }[] }[];
};

/** Hierarchical sidebar menu — 2 main groups × 8 sub-items.
 *  Hovering a sub-item shows a dedicated sub-panel (image + highlights). */
export const NAV_MENU: { main: { icon: string; name: string; slug: string }; items: NavSubItem[] }[] = [
  {
    main: { icon: "🏠", name: "家居与园艺", slug: "home-garden" },
    items: [
      {
        name: "电梯", slug: "thang-may", icon: "🛗",
        image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5",
        tagline: "电梯—乘客电梯/自动扶梯/消防电梯—多种载重与应用场景。",
        highlights: [
          { name: "乘客电梯",                   image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "thang-may-cho-khach" },
          { name: "自动扶梯",                   image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "thang-cuon" },
          { name: "消防电梯",                   image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "thang-chong-chay" },
          { name: "6人电梯",                    image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "thang-may-cho-khach" },
          { name: "13人电梯",                   image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "thang-may-cho-khach" },
          { name: "机场自动扶梯",                image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "thang-cuon" },
        ],
        sections: [
          { title: "客用电梯", items: [
            { name: "6人轿厢（450kg）", slug: "thang-may-cho-khach" },
            { name: "13人轿厢（1000kg）", slug: "thang-may-cho-khach" },
            { name: "21人轿厢（1600kg）", slug: "thang-may-cho-khach" },
            { name: "速度1.0–2.5米/秒", slug: "thang-may-cho-khach" },
          ]},
          { title: "自动扶梯", items: [
            { name: "梯级宽度600–1000mm", slug: "thang-cuon" },
            { name: "倾斜角30°/35°", slug: "thang-cuon" },
            { name: "商业中心", slug: "thang-cuon" },
            { name: "机场/地铁", slug: "thang-cuon" },
          ]},
          { title: "消防电梯", items: [
            { name: "120分钟耐火轿厢", slug: "thang-chong-chay" },
            { name: "耐高温门", slug: "thang-chong-chay" },
            { name: "UPS备用电源", slug: "thang-chong-chay" },
            { name: "EN 81-72 / TCVN 6396", slug: "thang-chong-chay" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🧱", name: "建筑材料", slug: "construction-materials" },
    items: [
      {
        name: "钢材与金属", slug: "ket-cau-thep-khung", icon: "🔩",
        image: "/img/thep-hinh-h-i-u-v.jpg?v=5",
        tagline: "钢材 — H/I/U/V型钢、钢管、钢板、彩钢瓦 — 广州FOB按吨报价",
        highlights: [
          { name: "H/I/U/V型钢",       image: "/img/thep-hinh-h-i-u-v.jpg?v=5", slug: "ket-cau-thep-khung" },
          { name: "黑管/镀锌钢管",     image: "/img/ceramic-1-2.jpg?v=5", slug: "ket-cau-thep-khung" },
          { name: "钢卷板",            image: "/img/ceramic-1-3.jpg?v=5", slug: "ket-cau-thep-khung" },
          { name: "方钢管",            image: "/img/ceramic-1-4.jpg?v=5", slug: "ket-cau-thep-khung" },
          { name: "彩钢瓦",            image: "/img/ceramic-1-5.jpg?v=5", slug: "ton-lanh" },
          { name: "工字钢",            image: "/img/cer3.jpg?v=5", slug: "ket-cau-thep-khung" },
        ],
        sections: [
          { title: "钢材", items: [
            { name: "彩钢瓦", slug: "ton-lanh" },
            { name: "工字钢", slug: "ket-cau-thep-khung" },
          ]},
          { title: "按形状", items: [
            { name: "H/I型钢", slug: "ket-cau-thep-khung" },
            { name: "U/V型钢", slug: "ket-cau-thep-khung" },
            { name: "方钢管", slug: "ket-cau-thep-khung" },
            { name: "圆钢管", slug: "ket-cau-thep-khung" },
          ]},
          { title: "按表面", items: [
            { name: "黑钢", slug: "ket-cau-thep-khung" },
            { name: "热镀锌", slug: "ket-cau-thep-khung" },
            { name: "静电喷涂", slug: "ket-cau-thep-khung" },
            { name: "不锈钢304/316", slug: "ket-cau-thep-khung" },
          ]},
          { title: "按标准", items: [
            { name: "JIS SS400", slug: "ket-cau-thep-khung" },
            { name: "EN S275JR", slug: "ket-cau-thep-khung" },
            { name: "GB Q235", slug: "ket-cau-thep-khung" },
            { name: "ASTM A36", slug: "ket-cau-thep-khung" },
          ]},
          { title: "配件", items: [
            { name: "M16锚栓", slug: "ket-cau-thep-khung" },
            { name: "高强度螺栓", slug: "ket-cau-thep-khung" },
            { name: "焊接钢丝网", slug: "ket-cau-thep-khung" },
            { name: "钢铆钉", slug: "ket-cau-thep-khung" },
          ]},
        ],
      },
      {
        name: "墙板与吊顶", slug: "tam-op-tuong-tran", icon: "🟦",
        image: "/img/cer6.jpg?v=5",
        tagline: "瓷砖板、陶瓷、MDF — 酒店与别墅室内设计专用",
        highlights: [
          { name: "大规格瓷砖板",  image: "/img/cer6.jpg?v=5", slug: "tam-op-tuong-tran" },
          { name: "3D墙板",       image: "/img/cer4.jpg?v=5", slug: "tam-op-tuong-tran" },
          { name: "石膏吊顶",     image: "/img/cer5.jpg?v=5", slug: "tam-op-tuong-tran" },
          { name: "MDF木饰面",    image: "/img/cer8.jpg?v=5", slug: "tam-op-tuong-tran" },
          { name: "隔音面板",     image: "/img/cer3.jpg?v=5", slug: "tam-cach-am" },
          { name: "ALC/ACC砖",   image: "/img/cer2.jpg?v=5", slug: "gach-alc-acc" },
        ],
        sections: [
          { title: "墙面材料", items: [
            { name: "隔音面板", slug: "tam-cach-am" },
            { name: "ALC/ACC砖", slug: "gach-alc-acc" },
          ]},
          { title: "墙板", items: [
            { name: "大规格瓷砖板", slug: "tam-op-tuong-tran" },
            { name: "3D PVC板", slug: "tam-op-tuong-tran" },
            { name: "复合板", slug: "tam-op-tuong-tran" },
            { name: "亮面亚克力板", slug: "tam-op-tuong-tran" },
          ]},
          { title: "石膏吊顶", items: [
            { name: "平整暗藏吊顶", slug: "tam-op-tuong-tran" },
            { name: "60×60明架吊顶", slug: "tam-op-tuong-tran" },
            { name: "60×120格栅吊顶", slug: "tam-op-tuong-tran" },
            { name: "纳米冲孔吊顶", slug: "tam-op-tuong-tran" },
          ]},
          { title: "装饰木饰面", items: [
            { name: "橡木贴皮MDF", slug: "tam-op-tuong-tran" },
            { name: "防潮HDF", slug: "tam-op-tuong-tran" },
            { name: "WPC木塑", slug: "tam-op-tuong-tran" },
            { name: "松木线条", slug: "tam-op-tuong-tran" },
          ]},
          { title: "配件", items: [
            { name: "镀锌龙骨", slug: "tam-op-tuong-tran" },
            { name: "墙板专用胶", slug: "tam-op-tuong-tran" },
            { name: "嵌入式LED灯", slug: "tam-op-tuong-tran" },
            { name: "PVC线条", slug: "tam-op-tuong-tran" },
          ]},
        ],
      },
      {
        name: "地板材料", slug: "vat-lieu-lat-san", icon: "🟫",
        image: "/img/cer7.jpg?v=5",
        tagline: "木地板+地面材料 — SPC+LVT木地板、实木地板、瓷砖 — DDP 18天到货",
        highlights: [
          { name: "SPC+LVT木地板",            image: "/img/cer7.jpg?v=5", slug: "san-go-spc-lvt" },
          { name: "多层实木拼花",                image: "/img/cer8.jpg?v=5", slug: "san-go-engineered" },
          { name: "实木地板",                   image: "/img/cer2.jpg?v=5", slug: "san-go-tu-nhien" },
          { name: "瓷砖",                       image: "/img/cer1.jpg?v=5", slug: "gach-op-lat" },
          { name: "花岗岩大板",                  image: "/img/da-granite-tu-nhien.jpg?v=5", slug: "vat-lieu-lat-san" },
          { name: "户外地板",                    image: "/img/cer5.jpg?v=5", slug: "vat-lieu-lat-san" },
        ],
        sections: [
          { title: "木地板", items: [
            { name: "SPC+LVT木地板", slug: "san-go-spc-lvt" },
            { name: "多层实木拼花", slug: "san-go-engineered" },
            { name: "实木地板", slug: "san-go-tu-nhien" },
          ]},
          { title: "地面材料", items: [
            { name: "瓷砖", slug: "gach-op-lat" },
          ]},
          { title: "瓷砖", items: [
            { name: "抛釉亮面", slug: "vat-lieu-lat-san" },
            { name: "哑光面", slug: "vat-lieu-lat-san" },
            { name: "3D纹理", slug: "vat-lieu-lat-san" },
            { name: "马赛克拼贴", slug: "vat-lieu-lat-san" },
          ]},
          { title: "木地板", items: [
            { name: "三层实木复合", slug: "vat-lieu-lat-san" },
            { name: "AC4强化地板", slug: "vat-lieu-lat-san" },
            { name: "SPC乙烯基地板", slug: "vat-lieu-lat-san" },
            { name: "碳化竹地板", slug: "vat-lieu-lat-san" },
          ]},
          { title: "天然石材", items: [
            { name: "卡拉拉大理石", slug: "vat-lieu-lat-san" },
            { name: "黑色花岗岩", slug: "vat-lieu-lat-san" },
            { name: "洞石", slug: "vat-lieu-lat-san" },
            { name: "中国黑板岩", slug: "vat-lieu-lat-san" },
          ]},
          { title: "配件", items: [
            { name: "踢脚线", slug: "vat-lieu-lat-san" },
            { name: "门槛收边条", slug: "vat-lieu-lat-san" },
            { name: "地板胶", slug: "vat-lieu-lat-san" },
            { name: "地板垫层", slug: "vat-lieu-lat-san" },
          ]},
        ],
      },
      {
        name: "石材与人造石", slug: "da-op-lat", icon: "⛰️",
        image: "/img/da-marble-tu-nhien.jpg?v=5",
        tagline: "福建大理石、花岗岩、石英石 — 厨房台面与大堂用大板。",
        highlights: [
          { name: "天然大理石",                  image: "/img/da-marble-tu-nhien.jpg?v=5", slug: "da-op-lat" },
          { name: "花岗岩大板",                  image: "/img/da-granite-tu-nhien.jpg?v=5", slug: "da-op-lat" },
          { name: "生态石英石",                  image: "/img/da-quartz-nhan-tao.jpg?v=5", slug: "da-thach-anh-tu-nhien" },
          { name: "人造石英石",                  image: "/img/da-mosaic-trang-tri.jpg?v=5", slug: "da-thach-anh-nhan-tao" },
          { name: "无机石、环氧磨石",             image: "/img/da-op-ngoai-that.jpg?v=5", slug: "da-mai-vo-co" },
          { name: "岩板",                       image: "/img/da-sintered-da-thieu-ket.jpg?v=5", slug: "da-op-lat" },
        ],
        sections: [
          { title: "特殊石材", items: [
            { name: "生态石英石", slug: "da-thach-anh-tu-nhien" },
            { name: "人造石英石 / 人造大理石", slug: "da-thach-anh-nhan-tao" },
            { name: "无机石、环氧磨石", slug: "da-mai-vo-co" },
          ]},
          { title: "天然大理石", items: [
            { name: "卡拉拉白", slug: "da-op-lat" },
            { name: "黑金沙", slug: "da-op-lat" },
            { name: "米黄", slug: "da-op-lat" },
            { name: "葡萄牙玫瑰红", slug: "da-op-lat" },
          ]},
          { title: "花岗岩", items: [
            { name: "纯黑", slug: "da-op-lat" },
            { name: "巴西红", slug: "da-op-lat" },
            { name: "萨迪诺灰", slug: "da-op-lat" },
            { name: "万年青黄", slug: "da-op-lat" },
          ]},
          { title: "人造石", items: [
            { name: "大理石纹石英石", slug: "da-op-lat" },
            { name: "金属纹石英石", slug: "da-op-lat" },
            { name: "亚克力人造石", slug: "da-op-lat" },
            { name: "人造水磨石", slug: "da-op-lat" },
          ]},
          { title: "岩板", items: [
            { name: "Neolith", slug: "da-op-lat" },
            { name: "Dekton", slug: "da-op-lat" },
            { name: "Lapitec", slug: "da-op-lat" },
            { name: "MaxFine", slug: "da-op-lat" },
          ]},
        ],
      },
      {
        name: "涂料与涂层", slug: "son-lop-phu", icon: "🎨",
        image: "/img/son-epoxy-san.jpg?v=5",
        tagline: "环氧地坪漆、防火涂料、装饰砂浆 — 符合QCVN标准。",
        highlights: [
          { name: "内墙艺术漆", image: "/img/son-epoxy-san.jpg?v=5", slug: "son-tuong-trong-nghe-thuat" },
          { name: "外墙仿石漆",  image: "/img/ceramic-2-1.jpg?v=5", slug: "son-mat-tuong-ngoai" },
          { name: "瓷砖胶",     image: "/img/ceramic-2-2.jpg?v=5", slug: "keo-gach-op" },
          { name: "美缝剂",     image: "/img/ceramic-2-3.jpg?v=5", slug: "keo-chit-mach" },
          { name: "防水涂料",   image: "/img/ceramic-2-5.jpg?v=5", slug: "son-chong-tham" },
          { name: "环氧地坪漆", image: "/img/ceramic-2-4.jpg?v=5", slug: "son-lop-phu" },
        ],
        sections: [
          { title: "涂料", items: [
            { name: "内墙艺术漆 / 乳胶漆", slug: "son-tuong-trong-nghe-thuat" },
            { name: "外墙仿石漆", slug: "son-mat-tuong-ngoai" },
            { name: "瓷砖胶", slug: "keo-gach-op" },
            { name: "美缝剂", slug: "keo-chit-mach" },
            { name: "防水涂料", slug: "son-chong-tham" },
          ]},
          { title: "内墙涂料", items: [
            { name: "抗碱底漆", slug: "son-lop-phu" },
            { name: "亮光面漆", slug: "son-lop-phu" },
            { name: "纹理质感漆", slug: "son-lop-phu" },
            { name: "防霉漆", slug: "son-lop-phu" },
          ]},
          { title: "外墙涂料", items: [
            { name: "纳米超耐久漆", slug: "son-lop-phu" },
            { name: "隔热涂料", slug: "son-lop-phu" },
            { name: "路面 / 划线漆", slug: "son-lop-phu" },
            { name: "环氧地坪漆", slug: "son-lop-phu" },
          ]},
          { title: "专用涂料", items: [
            { name: "防火涂料", slug: "son-lop-phu" },
            { name: "防水涂料", slug: "son-lop-phu" },
            { name: "防静电涂料", slug: "son-lop-phu" },
            { name: "绝缘涂料", slug: "son-lop-phu" },
          ]},
          { title: "涂装配件", items: [
            { name: "美纹遮蔽胶带", slug: "son-lop-phu" },
            { name: "滚筒 / 刷子", slug: "son-lop-phu" },
            { name: "地面防护布", slug: "son-lop-phu" },
            { name: "墙面腻子", slug: "son-lop-phu" },
          ]},
        ],
      },
      {
        name: "隔音与隔热", slug: "vat-lieu-cach-am-cach-nhiet", icon: "🧊",
        image: "/img/tam-cach-am.jpg?v=5",
        tagline: "岩棉、EPS/XPS、橡塑棉 — 用于KTV包厢、厂房、冷库。",
        highlights: [
          { name: "岩棉", image: "/img/bong-khoang-rockwool.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "墙体隔音板",   image: "/img/tam-cach-am.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "玻璃棉",      image: "/img/bong-thuy-tinh-cach-nhiet.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "聚酯纤维棉",   image: "/img/bong-polyester.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "EPS/XPS板",   image: "/img/ceramic-3-1.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "隔热铝箔",     image: "/img/ceramic-3-2.jpg?v=5", slug: "vat-lieu-cach-am-cach-nhiet" },
        ],
        sections: [
          { title: "岩棉", items: [
            { name: "岩棉板", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "玻璃棉卷毡", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "耐高温陶瓷纤维", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "气凝胶硅棉", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "泡棉", items: [
            { name: "PE泡棉卷材", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "PU喷涂泡沫", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "酚醛泡沫", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "EPP定型", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "EPS / XPS", items: [
            { name: "普通EPS板", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "抗压XPS板", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "SIPs定型EPS", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "屋面XPS", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "隔热配件", items: [
            { name: "防晒铝箔", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "隔热棉专用胶", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "拉杆/镀锌龙骨", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "专用锚钉", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
        ],
      },
      {
        name: "防水材料", slug: "vat-lieu-chong-tham", icon: "💧",
        image: "/img/mang-chong-tham-bitum.jpg?v=5",
        tagline: "自粘沥青卷材、聚氨酯涂料、PU胶 — 质保10-15年。",
        highlights: [
          { name: "自粘沥青卷材",  image: "/img/mang-chong-tham-bitum.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "PU防水涂料",   image: "/img/ceramic-4-1.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "硅酮密封胶",    image: "/img/ceramic-4-2.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "水泥外加剂",    image: "/img/ceramic-4-3.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "PVC止水带",    image: "/img/ceramic-4-4.jpg?v=5", slug: "vat-lieu-chong-tham" },
          { name: "防水砂浆",      image: "/img/ceramic-4-5.jpg?v=5", slug: "vat-lieu-chong-tham" },
        ],
        sections: [
          { title: "沥青卷材", items: [
            { name: "SBS自粘", slug: "vat-lieu-chong-tham" },
            { name: "APP热熔", slug: "vat-lieu-chong-tham" },
            { name: "3mm厚卷材", slug: "vat-lieu-chong-tham" },
            { name: "4mm厚卷材", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "防水涂料", items: [
            { name: "单组分弹性PU", slug: "vat-lieu-chong-tham" },
            { name: "双组分弹性PU", slug: "vat-lieu-chong-tham" },
            { name: "水性丙烯酸", slug: "vat-lieu-chong-tham" },
            { name: "高压喷涂聚脲", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "胶粘剂与外加剂", items: [
            { name: "中性硅酮胶", slug: "vat-lieu-chong-tham" },
            { name: "MS聚合物", slug: "vat-lieu-chong-tham" },
            { name: "水泥防水外加剂", slug: "vat-lieu-chong-tham" },
            { name: "双组分防水浆料", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "施工配件", items: [
            { name: "PVC止水带", slug: "vat-lieu-chong-tham" },
            { name: "玻纤增强网", slug: "vat-lieu-chong-tham" },
            { name: "丁基胶带", slug: "vat-lieu-chong-tham" },
            { name: "无收缩灌浆料", slug: "vat-lieu-chong-tham" },
          ]},
        ],
      },
      {
        name: "水泥与砂浆", slug: "vat-lieu-kho-xi-mang-vua", icon: "🏗️",
        image: "/img/chau-xi-mang.jpg?v=5",
        tagline: "河仙水泥、预拌干砂浆、混凝土外加剂 — 直送工地。",
        highlights: [
          { name: "通用水泥",     image: "/img/chau-xi-mang.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "预拌砂浆",     image: "/img/ceramic-5-1.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "混凝土外加剂",  image: "/img/ceramic-5-2.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "无收缩灌浆料",  image: "/img/ceramic-5-3.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "瓷砖胶",       image: "/img/ceramic-5-4.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "耐酸砂浆",      image: "/img/ceramic-5-5.jpg?v=5", slug: "vat-lieu-kho-xi-mang-vua" },
        ],
        sections: [
          { title: "袋装水泥", items: [
            { name: "PCB30通用", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCB40高抗压", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCB50高强度", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "白水泥", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "预拌干砂浆", items: [
            { name: "砌筑抹灰砂浆", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "底层砂浆", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "精找平面层砂浆", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "自流平砂浆", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "混凝土外加剂", items: [
            { name: "速凝剂", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "缓凝剂", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCE高效减水剂", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "混凝土防水剂", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "胶粘剂与填缝剂", items: [
            { name: "单组分瓷砖胶", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "双组分瓷砖胶", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "环氧填缝剂", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "防霉水泥填缝剂", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🚿", name: "卫浴洁具", slug: "bathroom-sanitary" },
    items: [
      {
        name: "陶瓷马桶", slug: "bon-cau-su", icon: "🚽",
        image: "/img/bathroom-1-1.jpg?v=5",
        tagline: "连体、分体、挂壁式马桶 — 釉面陶瓷，虹吸静音。",
        highlights: [
          { name: "连体虹吸马桶",  image: "/img/bathroom-1-1.jpg?v=5", slug: "bon-cau-su" },
          { name: "普通分体马桶", image: "/img/bathroom-1-2.jpg?v=5", slug: "bon-cau-su" },
          { name: "挂壁式马桶",     image: "/img/bathroom-1-3.jpg?v=5", slug: "bon-cau-su" },
          { name: "陶瓷蹲便器",     image: "/img/bathroom-1-4.jpg?v=5", slug: "bon-cau-su" },
        ],
        sections: [
          { title: "冲水方式", items: [
            { name: "虹吸静音", slug: "bon-cau-su" },
            { name: "直冲", slug: "bon-cau-su" },
            { name: "压力冲水", slug: "bon-cau-su" },
          ]},
          { title: "安装方式", items: [
            { name: "连体式", slug: "bon-cau-su" },
            { name: "分体带水箱", slug: "bon-cau-su" },
            { name: "挂壁式", slug: "bon-cau-su" },
          ]},
          { title: "用水标准", items: [
            { name: "3/6L节水", slug: "bon-cau-su" },
            { name: "WaterSense", slug: "bon-cau-su" },
            { name: "CUPC", slug: "bon-cau-su" },
          ]},
        ],
      },
      {
        name: "智能马桶", slug: "bon-cau-thong-minh", icon: "🤖",
        image: "/img/bathroom-2-1.jpg?v=5",
        tagline: "智能马桶（冲洗+烘干+座圈加热+自动除臭）",
        highlights: [
          { name: "连体智能马桶",   image: "/img/bathroom-2-1.jpg?v=5", slug: "bon-cau-thong-minh" },
          { name: "智能盖板",         image: "/img/bathroom-2-2.jpg?v=5", slug: "bon-cau-thong-minh" },
          { name: "挂壁智能马桶", image: "/img/bathroom-2-3.jpg?v=5", slug: "bon-cau-thong-minh" },
          { name: "日标高端款",   image: "/img/bathroom-2-4.jpg?v=5", slug: "bon-cau-thong-minh" },
        ],
        sections: [
          { title: "功能", items: [
            { name: "温水冲洗", slug: "bon-cau-thong-minh" },
            { name: "暖风烘干", slug: "bon-cau-thong-minh" },
            { name: "座圈加热+除臭", slug: "bon-cau-thong-minh" },
          ]},
          { title: "控制方式", items: [
            { name: "近距感应", slug: "bon-cau-thong-minh" },
            { name: "红外遥控", slug: "bon-cau-thong-minh" },
            { name: "侧板+语音", slug: "bon-cau-thong-minh" },
          ]},
          { title: "节能", items: [
            { name: "超微量3L冲水", slug: "bon-cau-thong-minh" },
            { name: "节能模式", slug: "bon-cau-thong-minh" },
            { name: "自动断电", slug: "bon-cau-thong-minh" },
          ]},
        ],
      },
      {
        name: "陶瓷台盆", slug: "lavabo-su", icon: "🪣",
        image: "/img/bathroom-3-1.jpg?v=5",
        tagline: "挂壁式、台上式、半嵌式陶瓷台盆 — 多种造型。",
        highlights: [
          { name: "台上圆盆",   image: "/img/bathroom-3-1.jpg?v=5", slug: "lavabo-su" },
          { name: "挂壁式",     image: "/img/bathroom-3-2.jpg?v=5", slug: "lavabo-su" },
          { name: "半嵌式", image: "/img/bathroom-3-3.jpg?v=5", slug: "lavabo-su" },
          { name: "台下盆",          image: "/img/bathroom-3-4.jpg?v=5", slug: "lavabo-su" },
        ],
        sections: [
          { title: "安装方式", items: [
            { name: "台上式", slug: "lavabo-su" },
            { name: "挂壁式", slug: "lavabo-su" },
            { name: "台下式", slug: "lavabo-su" },
          ]},
          { title: "材质", items: [
            { name: "卫生陶瓷", slug: "lavabo-su" },
            { name: "复合材料", slug: "lavabo-su" },
            { name: "人造石", slug: "lavabo-su" },
          ]},
          { title: "饰面", items: [
            { name: "经典白釉", slug: "lavabo-su" },
            { name: "哑光黑釉", slug: "lavabo-su" },
            { name: "艺术石纹", slug: "lavabo-su" },
          ]},
        ],
      },
      {
        name: "浴室柜", slug: "tu-phong-tam", icon: "🪞",
        image: "/img/bathroom-4-1.jpg?v=5",
        tagline: "台盆柜+镜子+灯 — 防水板材+不锈钢。",
        highlights: [
          { name: "600 mm柜",       image: "/img/bathroom-4-1.jpg?v=5", slug: "tu-phong-tam" },
          { name: "800 mm带镜柜", image: "/img/bathroom-4-2.jpg?v=5", slug: "tu-phong-tam" },
          { name: "1200 mm双盆柜",   image: "/img/bathroom-4-3.jpg?v=5", slug: "tu-phong-tam" },
          { name: "304不锈钢柜",       image: "/img/bathroom-4-4.jpg?v=5", slug: "tu-phong-tam" },
        ],
        sections: [
          { title: "材质", items: [
            { name: "三聚氰胺贴面胶合板", slug: "tu-phong-tam" },
            { name: "防水PVC", slug: "tu-phong-tam" },
            { name: "304不锈钢", slug: "tu-phong-tam" },
          ]},
          { title: "尺寸", items: [
            { name: "600 mm", slug: "tu-phong-tam" },
            { name: "800 mm", slug: "tu-phong-tam" },
            { name: "1200 mm双盆", slug: "tu-phong-tam" },
          ]},
          { title: "配件", items: [
            { name: "感应镜+灯", slug: "tu-phong-tam" },
            { name: "液压上翻支撑", slug: "tu-phong-tam" },
            { name: "玫瑰金拉手", slug: "tu-phong-tam" },
          ]},
        ],
      },
      {
        name: "五金水龙头", slug: "voi-nuoc", icon: "🚰",
        image: "/img/bathroom-5-1.jpg?v=5",
        tagline: "花洒、面盆龙头、厨房龙头 — 铜镀铬/金色/哑光。",
        highlights: [
          { name: "高面盆龙头", image: "/img/bathroom-5-1.jpg?v=5", slug: "voi-nuoc" },
          { name: "入墙式花洒", image: "/img/bathroom-5-2.jpg?v=5", slug: "voi-nuoc" },
          { name: "弯管厨房龙头", image: "/img/bathroom-5-3.jpg?v=5", slug: "voi-nuoc" },
          { name: "淋浴花洒套装",   image: "/img/bathroom-5-4.jpg?v=5", slug: "voi-nuoc" },
        ],
        sections: [
          { title: "安装位置", items: [
            { name: "面盆", slug: "voi-nuoc" },
            { name: "浴缸 / 花洒", slug: "voi-nuoc" },
            { name: "厨房", slug: "voi-nuoc" },
          ]},
          { title: "材质", items: [
            { name: "红铜镀铬", slug: "voi-nuoc" },
            { name: "304不锈钢", slug: "voi-nuoc" },
            { name: "经济型锌合金", slug: "voi-nuoc" },
          ]},
          { title: "饰面颜色", items: [
            { name: "亮铬", slug: "voi-nuoc" },
            { name: "哑光黑", slug: "voi-nuoc" },
            { name: "玫瑰金 / 拉丝金", slug: "voi-nuoc" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🛋", name: "家具", slug: "noi-that" },
    items: [
      {
        name: "客厅", slug: "phong-khach", icon: "🛋️",
        image: "/img/phong-khach.jpg?v=5",
        tagline: "沙发、茶几、电视柜 — 别墅与高端公寓整体配套。",
        highlights: [
          { name: "现代沙发",       image: "/img/fur1.jpg?v=5", slug: "phong-khach" },
          { name: "古典沙发",        image: "/img/fur2.jpg?v=5", slug: "phong-khach" },
          { name: "茶几",          image: "/img/ban-ca-phe.jpg?v=5", slug: "phong-khach" },
          { name: "电视柜",               image: "/img/fur4.jpg?v=5", slug: "phong-khach" },
          { name: "休闲椅",        image: "/img/fur5.jpg?v=5", slug: "phong-khach" },
          { name: "玄关桌",         image: "/img/furniture-1-3.jpg?v=5", slug: "phong-khach" },
        ],
        sections: [
          { title: "沙发", items: [
            { name: "现代沙发", slug: "phong-khach" },
            { name: "古典沙发", slug: "phong-khach" },
            { name: "意大利真皮沙发", slug: "phong-khach" },
            { name: "亚麻布艺沙发", slug: "phong-khach" },
          ]},
          { title: "桌几与柜架", items: [
            { name: "茶几", slug: "phong-khach" },
            { name: "玄关桌", slug: "phong-khach" },
            { name: "壁挂电视柜", slug: "phong-khach" },
            { name: "落地电视柜", slug: "phong-khach" },
          ]},
          { title: "休闲椅", items: [
            { name: "单人扶手椅", slug: "phong-khach" },
            { name: "可躺休闲椅", slug: "phong-khach" },
            { name: "吊篮摇椅", slug: "phong-khach" },
            { name: "脚凳", slug: "phong-khach" },
          ]},
          { title: "灯具与装饰", items: [
            { name: "落地灯", slug: "phong-khach" },
            { name: "沙发边台灯", slug: "phong-khach" },
            { name: "客厅地毯", slug: "phong-khach" },
            { name: "高端窗帘", slug: "phong-khach" },
          ]},
        ],
      },
      {
        name: "卧室", slug: "phong-ngu", icon: "🛏️",
        image: "/img/phong-ngu.jpg?v=5",
        tagline: "床、衣柜、梳妆台 — 现代与新古典风格。",
        highlights: [
          { name: "床",          image: "/img/fur3.jpg?v=5", slug: "phong-ngu" },
          { name: "衣柜",          image: "/img/fur8.jpg?v=5", slug: "phong-ngu" },
          { name: "梳妆台",      image: "/img/furniture-2-1.jpg?v=5", slug: "phong-ngu" },
          { name: "床头柜",      image: "/img/furniture-2-2.jpg?v=5", slug: "phong-ngu" },
          { name: "乳胶床垫",           image: "/img/dem-latex-memory-foam.jpg?v=5", slug: "phong-ngu" },
          { name: "独立袋装弹簧床垫",   image: "/img/dem-pocket-spring.jpg?v=5", slug: "phong-ngu" },
        ],
        sections: [
          { title: "床", items: [
            { name: "1.6米床", slug: "phong-ngu" },
            { name: "1.8米床", slug: "phong-ngu" },
            { name: "2米大床", slug: "phong-ngu" },
            { name: "高低床", slug: "phong-ngu" },
          ]},
          { title: "衣柜", items: [
            { name: "推拉门衣柜", slug: "phong-ngu" },
            { name: "平开门衣柜", slug: "phong-ngu" },
            { name: "步入式衣帽间", slug: "phong-ngu" },
            { name: "带镜衣柜", slug: "phong-ngu" },
          ]},
          { title: "高端床垫", items: [
            { name: "天然乳胶床垫", slug: "phong-ngu" },
            { name: "独立袋装弹簧床垫", slug: "phong-ngu" },
            { name: "记忆棉床垫", slug: "phong-ngu" },
            { name: "7区乳胶床垫", slug: "phong-ngu" },
          ]},
          { title: "桌台 / 配件", items: [
            { name: "带镜梳妆台", slug: "phong-ngu" },
            { name: "床头柜", slug: "phong-ngu" },
            { name: "床尾凳", slug: "phong-ngu" },
            { name: "感应夜灯", slug: "phong-ngu" },
          ]},
        ],
      },
      {
        name: "餐厅", slug: "phong-an", icon: "🍽️",
        image: "/img/phong-an.jpg?v=5",
        tagline: "餐桌套装、酒柜、餐椅 — 实木与高端MDF贴皮。",
        highlights: [
          { name: "6-8座餐桌",      image: "/img/ban-an.jpg?v=5", slug: "phong-an" },
          { name: "餐椅",              image: "/img/ghe-an.jpg?v=5", slug: "phong-an" },
          { name: "茶几",          image: "/img/ban-ca-phe.jpg?v=5", slug: "phong-an" },
          { name: "吧椅",             image: "/img/ghe-bar.jpg?v=5", slug: "phong-an" },
          { name: "水晶吊灯",     image: "/img/den-pha-le-k9.jpg?v=5", slug: "phong-an" },
          { name: "吊线灯",         image: "/img/den-pendant.jpg?v=5", slug: "phong-an" },
        ],
        sections: [
          { title: "餐桌", items: [
            { name: "4座桌", slug: "phong-an" },
            { name: "6座桌", slug: "phong-an" },
            { name: "8座桌", slug: "phong-an" },
            { name: "伸缩餐桌", slug: "phong-an" },
          ]},
          { title: "餐椅", items: [
            { name: "实木椅", slug: "phong-an" },
            { name: "真皮软包椅", slug: "phong-an" },
            { name: "布艺软包椅", slug: "phong-an" },
            { name: "高端塑料椅", slug: "phong-an" },
          ]},
          { title: "酒柜与餐边柜", items: [
            { name: "玻璃门酒柜", slug: "phong-an" },
            { name: "模块化酒柜", slug: "phong-an" },
            { name: "展示餐边柜", slug: "phong-an" },
            { name: "迷你吧台柜", slug: "phong-an" },
          ]},
          { title: "灯具与装饰", items: [
            { name: "水晶吊灯", slug: "phong-an" },
            { name: "单头吊线灯", slug: "phong-an" },
            { name: "餐桌花瓶", slug: "phong-an" },
            { name: "装饰挂画", slug: "phong-an" },
          ]},
        ],
      },
      {
        name: "橱柜", slug: "tu-bep", icon: "🍳",
        image: "/img/fur7.jpg?v=5",
        tagline: "OPPEIN橱柜、亚克力与三聚氰胺饰面 — 30套起免费3D设计。",
        highlights: [
          { name: "L型橱柜",        image: "/img/fur7.jpg?v=5", slug: "tu-bep" },
          { name: "U型橱柜",        image: "/img/furniture-7-1.jpg?v=5", slug: "tu-bep" },
          { name: "中岛台",             image: "/img/furniture-7-2.jpg?v=5", slug: "tu-bep" },
          { name: "石英石台面",       image: "/img/da-quartz-nhan-tao.jpg?v=5", slug: "tu-bep" },
          { name: "橱柜铰链",       image: "/img/ban-le-tu-bep.jpg?v=5", slug: "tu-bep" },
          { name: "阻尼铰链",    image: "/img/ban-le-tu-giam-chan.jpg?v=5", slug: "tu-bep" },
        ],
        sections: [
          { title: "橱柜形状", items: [
            { name: "基础一字型", slug: "tu-bep" },
            { name: "L型转角", slug: "tu-bep" },
            { name: "U型封闭", slug: "tu-bep" },
            { name: "带中岛", slug: "tu-bep" },
          ]},
          { title: "柜门材质", items: [
            { name: "亮面亚克力", slug: "tu-bep" },
            { name: "木纹三聚氰胺", slug: "tu-bep" },
            { name: "MFC三聚氰胺板", slug: "tu-bep" },
            { name: "橡木/胡桃实木", slug: "tu-bep" },
          ]},
          { title: "台面", items: [
            { name: "人造石英石", slug: "tu-bep" },
            { name: "天然花岗岩", slug: "tu-bep" },
            { name: "白色大理石", slug: "tu-bep" },
            { name: "可丽耐人造石", slug: "tu-bep" },
          ]},
          { title: "配件", items: [
            { name: "百隆Blum阻尼铰链", slug: "tu-bep" },
            { name: "三节滑轨", slug: "tu-bep" },
            { name: "柜门拉手", slug: "tu-bep" },
            { name: "柜内LED灯", slug: "tu-bep" },
          ]},
        ],
      },
      {
        name: "衣柜", slug: "tu-quan-ao", icon: "👔",
        image: "/img/fur8.jpg?v=5",
        tagline: "嵌入式衣柜、步入式衣帽间 — 按房间尺寸OEM定制。",
        highlights: [
          { name: "推拉门衣柜",    image: "/img/fur8.jpg?v=5", slug: "tu-quan-ao" },
          { name: "步入式衣帽间",      image: "/img/furniture-8-1.jpg?v=5", slug: "tu-quan-ao" },
          { name: "儿童衣柜",        image: "/img/furniture-8-2.jpg?v=5", slug: "tu-quan-ao" },
          { name: "鞋柜",             image: "/img/furniture-8-3.jpg?v=5", slug: "tu-quan-ao" },
          { name: "柜体铰链",           image: "/img/ban-le.jpg?v=5", slug: "tu-quan-ao" },
          { name: "门铰链",          image: "/img/ban-le-cua.jpg?v=5", slug: "tu-quan-ao" },
        ],
        sections: [
          { title: "衣柜类型", items: [
            { name: "推拉门", slug: "tu-quan-ao" },
            { name: "平开门", slug: "tu-quan-ao" },
            { name: "步入式衣帽间", slug: "tu-quan-ao" },
            { name: "嵌入式模块", slug: "tu-quan-ao" },
          ]},
          { title: "材质", items: [
            { name: "MDF贴皮", slug: "tu-quan-ao" },
            { name: "防潮HDF", slug: "tu-quan-ao" },
            { name: "实木", slug: "tu-quan-ao" },
            { name: "亮面亚克力", slug: "tu-quan-ao" },
          ]},
          { title: "内部配件", items: [
            { name: "海福乐拉篮", slug: "tu-quan-ao" },
            { name: "旋转领带架", slug: "tu-quan-ao" },
            { name: "感应LED灯", slug: "tu-quan-ao" },
            { name: "柜内隐藏保险箱", slug: "tu-quan-ao" },
          ]},
          { title: "配套柜体", items: [
            { name: "组合鞋柜", slug: "tu-quan-ao" },
            { name: "床头柜", slug: "tu-quan-ao" },
            { name: "抽屉柜", slug: "tu-quan-ao" },
            { name: "集成首饰架", slug: "tu-quan-ao" },
          ]},
        ],
      },
      {
        name: "家庭办公", slug: "van-phong-tai-nha", icon: "💼",
        image: "/img/van-phong-tai-nha.jpg?v=5",
        tagline: "办公桌、人体工学椅、书架 — 混合办公标准配置。",
        highlights: [
          { name: "办公桌",        image: "/img/ban-lam-viec.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "办公椅",       image: "/img/ghe-van-phong.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "折叠野餐桌",      image: "/img/ban-picnic-gap-gon.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "LED台灯",         image: "/img/den-ban-de-ban.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "落地灯",      image: "/img/den-san-floor-lamp.jpg?v=5", slug: "van-phong-tai-nha" },
          { name: "智能Wi-Fi灯",     image: "/img/den-smart-wi-fi.jpg?v=5", slug: "van-phong-tai-nha" },
        ],
        sections: [
          { title: "办公桌", items: [
            { name: "升降桌", slug: "van-phong-tai-nha" },
            { name: "L型桌", slug: "van-phong-tai-nha" },
            { name: "极简直桌", slug: "van-phong-tai-nha" },
            { name: "带书架组合桌", slug: "van-phong-tai-nha" },
          ]},
          { title: "座椅", items: [
            { name: "人体工学椅", slug: "van-phong-tai-nha" },
            { name: "电竞椅", slug: "van-phong-tai-nha" },
            { name: "真皮老板椅", slug: "van-phong-tai-nha" },
            { name: "办公网椅", slug: "van-phong-tai-nha" },
          ]},
          { title: "收纳", items: [
            { name: "开放式书架", slug: "van-phong-tai-nha" },
            { name: "玻璃门文件柜", slug: "van-phong-tai-nha" },
            { name: "文件收纳盒", slug: "van-phong-tai-nha" },
            { name: "移动抽屉柜", slug: "van-phong-tai-nha" },
          ]},
          { title: "办公配件", items: [
            { name: "感应LED台灯", slug: "van-phong-tai-nha" },
            { name: "显示器支架", slug: "van-phong-tai-nha" },
            { name: "智能Wi-Fi灯", slug: "van-phong-tai-nha" },
            { name: "笔记本立式支架", slug: "van-phong-tai-nha" },
          ]},
        ],
      },
      {
        name: "酒店家具", slug: "noi-that-khach-san", icon: "🏨",
        image: "/img/noi-that-khach-san.jpg?v=5",
        tagline: "3-5星FF&E整体配套 — 符合万豪/希尔顿标准设计",
        highlights: [
          { name: "酒店床具",    image: "/img/fur6.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "大堂桌",           image: "/img/furniture-6-1.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "等候区座椅",        image: "/img/furniture-6-2.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "水晶吊灯", image: "/img/den-chum-chandelier.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "壁灯",     image: "/img/den-tuong-wall-sconce.jpg?v=5", slug: "noi-that-khach-san" },
          { name: "吸顶灯",         image: "/img/den-op-tran.jpg?v=5", slug: "noi-that-khach-san" },
        ],
        sections: [
          { title: "酒店客房", items: [
            { name: "大床/双床", slug: "noi-that-khach-san" },
            { name: "软包床头", slug: "noi-that-khach-san" },
            { name: "客房办公桌", slug: "noi-that-khach-san" },
            { name: "木贴皮迷你吧柜", slug: "noi-that-khach-san" },
          ]},
          { title: "酒店卫浴", items: [
            { name: "100%纯棉浴巾", slug: "noi-that-khach-san" },
            { name: "盒装洗漱用品", slug: "noi-that-khach-san" },
            { name: "华夫格浴袍", slug: "noi-that-khach-san" },
            { name: "客房拖鞋", slug: "noi-that-khach-san" },
          ]},
          { title: "大堂与等候区", items: [
            { name: "等候区座椅", slug: "noi-that-khach-san" },
            { name: "前台桌", slug: "noi-that-khach-san" },
            { name: "水晶吊灯", slug: "noi-that-khach-san" },
            { name: "玻璃展示柜", slug: "noi-that-khach-san" },
          ]},
          { title: "餐厅/酒吧", items: [
            { name: "不锈钢自助餐台", slug: "noi-that-khach-san" },
            { name: "高端餐厅椅", slug: "noi-that-khach-san" },
            { name: "吧台吊灯", slug: "noi-that-khach-san" },
            { name: "一体式吧台", slug: "noi-that-khach-san" },
          ]},
        ],
      },
      {
        name: "儿童与母婴", slug: "tre-em-em-be", icon: "🧸",
        image: "/img/tre-em-em-be.jpg?v=5",
        tagline: "儿童床、学习桌、安全玩具 — E0/E1环保认证",
        highlights: [
          { name: "儿童床",       image: "/img/furniture-3-1.jpg?v=5", slug: "tre-em-em-be" },
          { name: "学习桌",             image: "/img/furniture-3-2.jpg?v=5", slug: "tre-em-em-be" },
          { name: "玩具柜",          image: "/img/furniture-3-3.jpg?v=5", slug: "tre-em-em-be" },
          { name: "儿童功能椅",        image: "/img/ghe-tam-nang.jpg?v=5", slug: "tre-em-em-be" },
          { name: "儿童台灯",   image: "/img/den-ban-de-ban.jpg?v=5", slug: "tre-em-em-be" },
          { name: "LED装饰灯带", image: "/img/den-led-day.jpg?v=5", slug: "tre-em-em-be" },
        ],
        sections: [
          { title: "儿童卧室", items: [
            { name: "安全高低床", slug: "tre-em-em-be" },
            { name: "MDF婴儿床", slug: "tre-em-em-be" },
            { name: "儿童衣柜", slug: "tre-em-em-be" },
            { name: "感应夜灯", slug: "tre-em-em-be" },
          ]},
          { title: "学习", items: [
            { name: "防驼背学习桌", slug: "tre-em-em-be" },
            { name: "可调节学习椅", slug: "tre-em-em-be" },
            { name: "儿童书架", slug: "tre-em-em-be" },
            { name: "护眼LED台灯", slug: "tre-em-em-be" },
          ]},
          { title: "玩具与收纳", items: [
            { name: "模块化玩具柜", slug: "tre-em-em-be" },
            { name: "E0级木质玩具", slug: "tre-em-em-be" },
            { name: "益智拼图", slug: "tre-em-em-be" },
            { name: "布艺收纳盒", slug: "tre-em-em-be" },
          ]},
          { title: "清洁与喂养", items: [
            { name: "婴儿餐椅", slug: "tre-em-em-be" },
            { name: "纯棉儿童浴巾", slug: "tre-em-em-be" },
            { name: "硅胶围兜", slug: "tre-em-em-be" },
            { name: "婴儿迷你洗手盆", slug: "tre-em-em-be" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🍳", name: "厨房设备", slug: "kitchen-equipment" },
    items: [
      {
        name: "电磁炉", slug: "bep-tu", icon: "♨️",
        image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5",
        tagline: "单灶/双灶/3-4灶电磁炉 — 肖特微晶面板，功率3500W+",
        highlights: [
          { name: "双灶",   image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "bep-tu" },
          { name: "3灶",     image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "bep-tu" },
          { name: "4灶",     image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "bep-tu" },
          { name: "便携单灶",    image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "bep-tu" },
        ],
        sections: [
          { title: "灶头数量", items: [
            { name: "单灶1头", slug: "bep-tu" },
            { name: "双灶2头", slug: "bep-tu" },
            { name: "3-4灶嵌入式", slug: "bep-tu" },
          ]},
          { title: "功率", items: [
            { name: "≤ 2000 W", slug: "bep-tu" },
            { name: "2000–3500 W", slug: "bep-tu" },
            { name: "爆炒档 > 3500 W", slug: "bep-tu" },
          ]},
          { title: "功能", items: [
            { name: "儿童锁", slug: "bep-tu" },
            { name: "空锅自动断电", slug: "bep-tu" },
            { name: "9档火力", slug: "bep-tu" },
          ]},
        ],
      },
      {
        name: "抽油烟机", slug: "may-hut-mui", icon: "💨",
        image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5",
        tagline: "顶吸式、欧式、中岛式油烟机 — 风量700–1300 m³/h",
        highlights: [
          { name: "钻石顶吸式", image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "may-hut-mui" },
          { name: "经典欧式",   image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "may-hut-mui" },
          { name: "中岛吊顶式", image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "may-hut-mui" },
          { name: "远程感应",     image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "may-hut-mui" },
        ],
        sections: [
          { title: "按安装方式", items: [
            { name: "顶吸/侧吸", slug: "may-hut-mui" },
            { name: "经典欧式", slug: "may-hut-mui" },
            { name: "中岛吊顶式", slug: "may-hut-mui" },
          ]},
          { title: "风量", items: [
            { name: "700 m³/h", slug: "may-hut-mui" },
            { name: "1000 m³/h", slug: "may-hut-mui" },
            { name: "1300+ m³/h", slug: "may-hut-mui" },
          ]},
          { title: "材质", items: [
            { name: "304不锈钢", slug: "may-hut-mui" },
            { name: "钢化玻璃", slug: "may-hut-mui" },
            { name: "艺术拉丝铜", slug: "may-hut-mui" },
          ]},
        ],
      },
      {
        name: "微波炉", slug: "lo-vi-song", icon: "📡",
        image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5",
        tagline: "机械式、电子式、带烧烤微波炉 — 容量20–42L",
        highlights: [
          { name: "机械式20L",     image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "lo-vi-song" },
          { name: "电子式25L",    image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "lo-vi-song" },
          { name: "带烧烤30L",   image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "lo-vi-song" },
          { name: "蒸汽组合", image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "lo-vi-song" },
        ],
        sections: [
          { title: "容量", items: [
            { name: "20L家用", slug: "lo-vi-song" },
            { name: "25–30L", slug: "lo-vi-song" },
            { name: "42L+专业", slug: "lo-vi-song" },
          ]},
          { title: "类型", items: [
            { name: "机械式", slug: "lo-vi-song" },
            { name: "电子触控式", slug: "lo-vi-song" },
            { name: "微波+烧烤+蒸汽", slug: "lo-vi-song" },
          ]},
          { title: "功率", items: [
            { name: "700 W", slug: "lo-vi-song" },
            { name: "900 W", slug: "lo-vi-song" },
            { name: "1200 W+", slug: "lo-vi-song" },
          ]},
        ],
      },
      {
        name: "压力锅", slug: "noi-ap-suat", icon: "🍲",
        image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5",
        tagline: "电子压力锅、多功能料理锅 — 容量4–10L",
        highlights: [
          { name: "电子式5L",       image: "/img/kitchen-equipment-sc-prod-6.jpg?v=5", slug: "noi-ap-suat" },
          { name: "多功能料理锅6L",    image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "noi-ap-suat" },
          { name: "大容量不锈钢8L",      image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "noi-ap-suat" },
          { name: "传统机械式", image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "noi-ap-suat" },
        ],
        sections: [
          { title: "容量", items: [
            { name: "4–5L家用", slug: "noi-ap-suat" },
            { name: "6–8L", slug: "noi-ap-suat" },
            { name: "10L+餐饮店", slug: "noi-ap-suat" },
          ]},
          { title: "类型", items: [
            { name: "电子式", slug: "noi-ap-suat" },
            { name: "机械式", slug: "noi-ap-suat" },
            { name: "12合1多功能", slug: "noi-ap-suat" },
          ]},
          { title: "内胆材质", items: [
            { name: "陶瓷不粘", slug: "noi-ap-suat" },
            { name: "304不锈钢", slug: "noi-ap-suat" },
            { name: "加厚铝合金", slug: "noi-ap-suat" },
          ]},
        ],
      },
      {
        name: "电饭煲", slug: "noi-com-dien", icon: "🍚",
        image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5",
        tagline: "机械式、电子式、IH电磁加热电饭煲 — 1.8–5L家用与餐厅",
        highlights: [
          { name: "机械式1.8L",   image: "/img/kitchen-equipment-sc-prod-7.jpg?v=5", slug: "noi-com-dien" },
          { name: "电子式2L",    image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "noi-com-dien" },
          { name: "IH电磁加热",    image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "noi-com-dien" },
          { name: "商用5L",image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "noi-com-dien" },
        ],
        sections: [
          { title: "技术", items: [
            { name: "机械式", slug: "noi-com-dien" },
            { name: "电子式", slug: "noi-com-dien" },
            { name: "IH电磁加热", slug: "noi-com-dien" },
          ]},
          { title: "容量", items: [
            { name: "1.0–1.8L", slug: "noi-com-dien" },
            { name: "2.0–3.0L", slug: "noi-com-dien" },
            { name: "5L+餐厅", slug: "noi-com-dien" },
          ]},
          { title: "模式", items: [
            { name: "煮饭", slug: "noi-com-dien" },
            { name: "蒸煮", slug: "noi-com-dien" },
            { name: "煮粥/慢炖", slug: "noi-com-dien" },
          ]},
        ],
      },
      {
        name: "洗碗机", slug: "may-rua-bat", icon: "🍽️",
        image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5",
        tagline: "独立式、嵌入式、迷你洗碗机 — 6–14套标准",
        highlights: [
          { name: "独立式14套",  image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "may-rua-bat" },
          { name: "嵌入式12套",    image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "may-rua-bat" },
          { name: "迷你台式6套",  image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "may-rua-bat" },
          { name: "半嵌式",          image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "may-rua-bat" },
        ],
        sections: [
          { title: "安装方式", items: [
            { name: "独立式", slug: "may-rua-bat" },
            { name: "嵌入式", slug: "may-rua-bat" },
            { name: "迷你台式", slug: "may-rua-bat" },
          ]},
          { title: "套数", items: [
            { name: "6套迷你", slug: "may-rua-bat" },
            { name: "8–10套", slug: "may-rua-bat" },
            { name: "13–14套专业", slug: "may-rua-bat" },
          ]},
          { title: "功能", items: [
            { name: "热风烘干", slug: "may-rua-bat" },
            { name: "UV杀菌", slug: "may-rua-bat" },
            { name: "Wi-Fi控制", slug: "may-rua-bat" },
          ]},
        ],
      },
      {
        name: "不锈钢水槽", slug: "chau-rua-inox", icon: "🍽️",
        image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5",
        tagline: "304不锈钢单槽/双槽/三槽 — 手工细磨/静音",
        highlights: [
          { name: "单槽50×40",   image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "chau-rua-inox" },
          { name: "双槽78×42",   image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "chau-rua-inox" },
          { name: "方形手工槽",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "chau-rua-inox" },
          { name: "三槽商用", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "chau-rua-inox" },
        ],
        sections: [
          { title: "槽数", items: [
            { name: "单槽", slug: "chau-rua-inox" },
            { name: "双槽", slug: "chau-rua-inox" },
            { name: "三槽", slug: "chau-rua-inox" },
          ]},
          { title: "类型", items: [
            { name: "台上式", slug: "chau-rua-inox" },
            { name: "台下式", slug: "chau-rua-inox" },
            { name: "半嵌式", slug: "chau-rua-inox" },
          ]},
          { title: "饰面", items: [
            { name: "丝光拉丝", slug: "chau-rua-inox" },
            { name: "纳米哑光黑", slug: "chau-rua-inox" },
            { name: "R10手工", slug: "chau-rua-inox" },
          ]},
        ],
      },
      {
        name: "五金产品", slug: "kim-khi-bep", icon: "🔧",
        image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5",
        tagline: "橱柜铰链、滑轨、拉手、不锈钢配件——整柜采购",
        highlights: [
          { name: "阻尼铰链", image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "kim-khi-bep" },
          { name: "底装滑轨",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "kim-khi-bep" },
          { name: "合金拉手",  image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "kim-khi-bep" },
          { name: "不锈钢配件",    image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "kim-khi-bep" },
        ],
        sections: [
          { title: "铰链与滑轨", items: [
            { name: "35mm杯型铰链", slug: "kim-khi-bep" },
            { name: "三节滑轨", slug: "kim-khi-bep" },
            { name: "上翻气撑", slug: "kim-khi-bep" },
          ]},
          { title: "不锈钢配件", items: [
            { name: "碗碟架", slug: "kim-khi-bep" },
            { name: "调味料架", slug: "kim-khi-bep" },
            { name: "柜内垃圾桶", slug: "kim-khi-bep" },
          ]},
          { title: "拉手", items: [
            { name: "方形不锈钢拉手", slug: "kim-khi-bep" },
            { name: "圆形铜拉手", slug: "kim-khi-bep" },
            { name: "暗藏嵌入式拉手", slug: "kim-khi-bep" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "💡", name: "灯具照明", slug: "lighting" },
    items: [
      {
        name: "LED光源", slug: "den-led", icon: "💡",
        image: "/img/ceramic-2-1.jpg?v=5",
        tagline: "各类LED芯片光源——驱动器、模组、COB、SMD专用",
        highlights: [
          { name: "COB芯片",      image: "/img/ceramic-2-1.jpg?v=5", slug: "den-led" },
          { name: "SMD 2835/5050", image: "/img/ceramic-2-2.jpg?v=5", slug: "den-led" },
          { name: "驱动模组",  image: "/img/ceramic-2-3.jpg?v=5", slug: "den-led" },
          { name: "LED灯丝灯泡", image: "/img/ceramic-2-4.jpg?v=5", slug: "den-led" },
        ],
        sections: [
          { title: "芯片类型", items: [
            { name: "COB", slug: "den-led" },
            { name: "SMD", slug: "den-led" },
            { name: "灯丝", slug: "den-led" },
          ]},
          { title: "色温", items: [
            { name: "暖白3000K", slug: "den-led" },
            { name: "中性白4000K", slug: "den-led" },
            { name: "冷白6500K", slug: "den-led" },
          ]},
          { title: "显色指数", items: [
            { name: "Ra >80", slug: "den-led" },
            { name: "Ra >90", slug: "den-led" },
            { name: "Ra >95艺术级", slug: "den-led" },
          ]},
        ],
      },
      {
        name: "家用LED灯", slug: "den-led-gia-dung", icon: "🏠",
        image: "/img/ceramic-2-2.jpg?v=5",
        tagline: "吸顶灯、筒灯、面板灯、LED灯带——适用客厅与生活空间",
        highlights: [
          { name: "吸顶灯",  image: "/img/ceramic-2-2.jpg?v=5", slug: "den-led-gia-dung" },
          { name: "嵌入式筒灯", image: "/img/ceramic-2-3.jpg?v=5", slug: "den-led-gia-dung" },
          { name: "方形面板灯",  image: "/img/ceramic-2-4.jpg?v=5", slug: "den-led-gia-dung" },
          { name: "装饰LED灯带", image: "/img/ceramic-2-5.jpg?v=5", slug: "den-led-gia-dung" },
        ],
        sections: [
          { title: "按位置", items: [
            { name: "客厅", slug: "den-led-gia-dung" },
            { name: "卧室", slug: "den-led-gia-dung" },
            { name: "走廊/楼梯", slug: "den-led-gia-dung" },
          ]},
          { title: "按款式", items: [
            { name: "吸顶灯", slug: "den-led-gia-dung" },
            { name: "嵌入式筒灯", slug: "den-led-gia-dung" },
            { name: "超薄面板灯", slug: "den-led-gia-dung" },
          ]},
          { title: "功能", items: [
            { name: "三色变光", slug: "den-led-gia-dung" },
            { name: "亮度调节", slug: "den-led-gia-dung" },
            { name: "智能Wi-Fi", slug: "den-led-gia-dung" },
          ]},
        ],
      },
      {
        name: "商用LED灯", slug: "den-led-thuong-mai", icon: "🏢",
        image: "/img/ceramic-2-3.jpg?v=5",
        tagline: "投光灯、工业灯管、射灯——IP65/66",
        highlights: [
          { name: "100W LED投光灯",  image: "/img/ceramic-2-3.jpg?v=5", slug: "den-led-thuong-mai" },
          { name: "T8灯管",       image: "/img/ceramic-2-4.jpg?v=5", slug: "den-led-thuong-mai" },
          { name: "轨道射灯", image: "/img/ceramic-2-5.jpg?v=5", slug: "den-led-thuong-mai" },
          { name: "UFO工矿灯", image: "/img/ceramic-2-1.jpg?v=5", slug: "den-led-thuong-mai" },
        ],
        sections: [
          { title: "应用", items: [
            { name: "展厅", slug: "den-led-thuong-mai" },
            { name: "办公室", slug: "den-led-thuong-mai" },
            { name: "厂房", slug: "den-led-thuong-mai" },
          ]},
          { title: "功率", items: [
            { name: "≤ 50 W", slug: "den-led-thuong-mai" },
            { name: "50–150 W", slug: "den-led-thuong-mai" },
            { name: "> 200 W", slug: "den-led-thuong-mai" },
          ]},
          { title: "防护等级", items: [
            { name: "IP44室内", slug: "den-led-thuong-mai" },
            { name: "IP65户外", slug: "den-led-thuong-mai" },
            { name: "IP66防尘防水", slug: "den-led-thuong-mai" },
          ]},
        ],
      },
      {
        name: "电气物料", slug: "vat-tu-dien", icon: "⚙️",
        image: "/img/ceramic-2-4.jpg?v=5",
        tagline: "插座、开关、MCB、ATS——照明系统配套配件",
        highlights: [
          { name: "暗装插座",  image: "/img/ceramic-2-4.jpg?v=5", slug: "vat-tu-dien" },
          { name: "感应开关", image: "/img/ceramic-2-5.jpg?v=5", slug: "vat-tu-dien" },
          { name: "MCB / RCBO",       image: "/img/ceramic-2-1.jpg?v=5", slug: "vat-tu-dien" },
          { name: "接线盒",      image: "/img/ceramic-2-2.jpg?v=5", slug: "vat-tu-dien" },
        ],
        sections: [
          { title: "开关电器", items: [
            { name: "MCB 6/10/16A", slug: "vat-tu-dien" },
            { name: "RCBO", slug: "vat-tu-dien" },
            { name: "自动断路器", slug: "vat-tu-dien" },
          ]},
          { title: "插座与开关", items: [
            { name: "暗装方形面板", slug: "vat-tu-dien" },
            { name: "智能感应", slug: "vat-tu-dien" },
            { name: "USB插座", slug: "vat-tu-dien" },
          ]},
          { title: "配件", items: [
            { name: "暗装底盒", slug: "vat-tu-dien" },
            { name: "接地螺栓", slug: "vat-tu-dien" },
            { name: "快速线夹", slug: "vat-tu-dien" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "🪟", name: "门窗", slug: "doors-windows" },
    items: [
      {
        name: "3D人脸识别锁", slug: "khoa-3d-face", icon: "📹",
        image: "/img/ceramic-3-1.jpg?v=5",
        tagline: "3D人脸识别+可视通话锁 — IP68防水",
        highlights: [
          { name: "3D人脸+可视",  image: "/img/ceramic-3-1.jpg?v=5", slug: "khoa-3d-face" },
          { name: "1080p摄像头",     image: "/img/ceramic-3-2.jpg?v=5", slug: "khoa-3d-face" },
          { name: "5000 mAh充电电池", image: "/img/ceramic-3-3.jpg?v=5", slug: "khoa-3d-face" },
          { name: "Wi-Fi + 4G",        image: "/img/ceramic-3-4.jpg?v=5", slug: "khoa-3d-face" },
        ],
        sections: [
          { title: "传感器", items: [
            { name: "3D点阵识别", slug: "khoa-3d-face" },
            { name: "夜间红外", slug: "khoa-3d-face" },
            { name: "辅助指纹传感器", slug: "khoa-3d-face" },
          ]},
          { title: "开锁方式", items: [
            { name: "人脸识别", slug: "khoa-3d-face" },
            { name: "指纹", slug: "khoa-3d-face" },
            { name: "PIN码 / NFC", slug: "khoa-3d-face" },
          ]},
          { title: "连接", items: [
            { name: "Wi-Fi 2.4 GHz", slug: "khoa-3d-face" },
            { name: "蓝牙5.0", slug: "khoa-3d-face" },
            { name: "辅助4G模块", slug: "khoa-3d-face" },
          ]},
        ],
      },
      {
        name: "Wi-Fi智能锁", slug: "khoa-wifi", icon: "📶",
        image: "/img/ceramic-3-2.jpg?v=5",
        tagline: "指纹锁+Wi-Fi，App远程控制",
        highlights: [
          { name: "涂鸦智能App",  image: "/img/ceramic-3-2.jpg?v=5", slug: "khoa-wifi" },
          { name: "AA电池续航1年", image: "/img/ceramic-3-3.jpg?v=5", slug: "khoa-wifi" },
          { name: "一次性密码",         image: "/img/ceramic-3-4.jpg?v=5", slug: "khoa-wifi" },
          { name: "防撬双锁", image: "/img/ceramic-3-5.jpg?v=5", slug: "khoa-wifi" },
        ],
        sections: [
          { title: "开锁方式", items: [
            { name: "指纹", slug: "khoa-wifi" },
            { name: "PIN码", slug: "khoa-wifi" },
            { name: "NFC感应卡", slug: "khoa-wifi" },
          ]},
          { title: "智能家居", items: [
            { name: "Tuya / Smart Life", slug: "khoa-wifi" },
            { name: "Google Home", slug: "khoa-wifi" },
            { name: "Alexa", slug: "khoa-wifi" },
          ]},
          { title: "外壳材质", items: [
            { name: "锌合金", slug: "khoa-wifi" },
            { name: "304不锈钢", slug: "khoa-wifi" },
            { name: "阳极氧化铝", slug: "khoa-wifi" },
          ]},
        ],
      },
      {
        name: "Wi-Fi智能门栓锁", slug: "khoa-don-cong-wifi", icon: "🚪",
        image: "/img/ceramic-3-3.jpg?v=5",
        tagline: "户外大门门栓锁，指纹+Wi-Fi — 别墅专用",
        highlights: [
          { name: "别墅铁艺大门",  image: "/img/ceramic-3-3.jpg?v=5", slug: "khoa-don-cong-wifi" },
          { name: "不锈钢折叠门",      image: "/img/ceramic-3-4.jpg?v=5", slug: "khoa-don-cong-wifi" },
          { name: "自动平移门", image: "/img/ceramic-3-5.jpg?v=5", slug: "khoa-don-cong-wifi" },
          { name: "欧式铝合金门",     image: "/img/ceramic-3-1.jpg?v=5", slug: "khoa-don-cong-wifi" },
        ],
        sections: [
          { title: "开锁方式", items: [
            { name: "指纹", slug: "khoa-don-cong-wifi" },
            { name: "密码", slug: "khoa-don-cong-wifi" },
            { name: "App + 遥控", slug: "khoa-don-cong-wifi" },
          ]},
          { title: "防护等级", items: [
            { name: "IP65", slug: "khoa-don-cong-wifi" },
            { name: "IP67", slug: "khoa-don-cong-wifi" },
            { name: "IP68可浸水", slug: "khoa-don-cong-wifi" },
          ]},
          { title: "电源", items: [
            { name: "碱性电池", slug: "khoa-don-cong-wifi" },
            { name: "可充锂电池", slug: "khoa-don-cong-wifi" },
            { name: "太阳能", slug: "khoa-don-cong-wifi" },
          ]},
        ],
      },
      {
        name: "指纹锁", slug: "khoa-van-tay", icon: "👆",
        image: "/img/ceramic-3-4.jpg?v=5",
        tagline: "适用木门、铝门、钢门的电子指纹锁 — 普及型",
        highlights: [
          { name: "普通木门",  image: "/img/ceramic-3-4.jpg?v=5", slug: "khoa-van-tay" },
          { name: "兴发铝门",   image: "/img/ceramic-3-5.jpg?v=5", slug: "khoa-van-tay" },
          { name: "防火钢门", image: "/img/ceramic-3-1.jpg?v=5", slug: "khoa-van-tay" },
          { name: "玻璃旋转门",      image: "/img/ceramic-3-2.jpg?v=5", slug: "khoa-van-tay" },
        ],
        sections: [
          { title: "传感器类型", items: [
            { name: "电容式", slug: "khoa-van-tay" },
            { name: "光学式", slug: "khoa-van-tay" },
            { name: "半导体式", slug: "khoa-van-tay" },
          ]},
          { title: "开锁方式", items: [
            { name: "指纹（≤100枚）", slug: "khoa-van-tay" },
            { name: "密码", slug: "khoa-van-tay" },
            { name: "机械钥匙", slug: "khoa-van-tay" },
          ]},
          { title: "电池", items: [
            { name: "4 × AA", slug: "khoa-van-tay" },
            { name: "可充锂电池", slug: "khoa-van-tay" },
            { name: "USB-C应急充电", slug: "khoa-van-tay" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "⚡", name: "电气与电器", slug: "electrical" },
    items: [
      {
        name: "空调", slug: "dieu-hoa", icon: "❄️",
        image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5",
        tagline: "壁挂、嵌入式、柜式变频空调 — 多档功率",
        highlights: [
          { name: "壁挂变频", image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "dieu-hoa" },
          { name: "嵌入式天花机",    image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "dieu-hoa" },
          { name: "商用柜机", image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "dieu-hoa" },
          { name: "多联机",         image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "dieu-hoa" },
        ],
        sections: [
          { title: "按功率", items: [
            { name: "9000 BTU", slug: "dieu-hoa" },
            { name: "12000 BTU", slug: "dieu-hoa" },
            { name: "18000–24000 BTU", slug: "dieu-hoa" },
          ]},
          { title: "按安装方式", items: [
            { name: "壁挂式", slug: "dieu-hoa" },
            { name: "嵌入式", slug: "dieu-hoa" },
            { name: "柜式", slug: "dieu-hoa" },
          ]},
          { title: "技术", items: [
            { name: "R32变频", slug: "dieu-hoa" },
            { name: "Wi-Fi控制", slug: "dieu-hoa" },
            { name: "PM2.5过滤", slug: "dieu-hoa" },
          ]},
        ],
      },
      {
        name: "冰箱", slug: "tu-lanh", icon: "🧊",
        image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5",
        tagline: "对开门、法式多门、迷你吧冰箱 — 按FCL整柜报价。",
        highlights: [
          { name: "对开门",  image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "tu-lanh" },
          { name: "法式多门",   image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "tu-lanh" },
          { name: "上置冷冻室",  image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "tu-lanh" },
          { name: "迷你吧冰箱",      image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "tu-lanh" },
        ],
        sections: [
          { title: "按容量", items: [
            { name: "< 200L", slug: "tu-lanh" },
            { name: "200–400L", slug: "tu-lanh" },
            { name: "> 500L", slug: "tu-lanh" },
          ]},
          { title: "按款式", items: [
            { name: "对开门", slug: "tu-lanh" },
            { name: "法式多门", slug: "tu-lanh" },
            { name: "多门", slug: "tu-lanh" },
          ]},
          { title: "功能", items: [
            { name: "变频节能", slug: "tu-lanh" },
            { name: "风冷无霜", slug: "tu-lanh" },
            { name: "智能Wi-Fi", slug: "tu-lanh" },
          ]},
        ],
      },
      {
        name: "洗衣机", slug: "may-giat", icon: "🧺",
        image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5",
        tagline: "滚筒、波轮、洗烘一体 — 家用与酒店全系列。",
        highlights: [
          { name: "滚筒变频",  image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "may-giat" },
          { name: "波轮顶开",            image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "may-giat" },
          { name: "洗烘一体",      image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "may-giat" },
          { name: "酒店商用机", image: "/img/kitchen-equipment-sc-prod-5.jpg?v=5", slug: "may-giat" },
        ],
        sections: [
          { title: "按容量", items: [
            { name: "7–9 kg", slug: "may-giat" },
            { name: "10–12 kg", slug: "may-giat" },
            { name: "商用 >15 kg", slug: "may-giat" },
          ]},
          { title: "类型", items: [
            { name: "滚筒式", slug: "may-giat" },
            { name: "波轮式", slug: "may-giat" },
            { name: "洗烘一体", slug: "may-giat" },
          ]},
          { title: "功能", items: [
            { name: "变频", slug: "may-giat" },
            { name: "蒸汽除菌", slug: "may-giat" },
            { name: "Wi-Fi控制", slug: "may-giat" },
          ]},
        ],
      },
      {
        name: "取暖器", slug: "may-suoi", icon: "🔥",
        image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5",
        tagline: "油汀、卤素、暖风取暖器 — 功率1500–2500 W。",
        highlights: [
          { name: "9片油汀",  image: "/img/kitchen-equipment-sc-prod-0.jpg?v=5", slug: "may-suoi" },
          { name: "塔式卤素",      image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "may-suoi" },
          { name: "迷你暖风机",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "may-suoi" },
          { name: "碳纤维红外", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "may-suoi" },
        ],
        sections: [
          { title: "类型", items: [
            { name: "油汀", slug: "may-suoi" },
            { name: "塔式卤素", slug: "may-suoi" },
            { name: "暖风机", slug: "may-suoi" },
          ]},
          { title: "功率", items: [
            { name: "1500 W", slug: "may-suoi" },
            { name: "2000 W", slug: "may-suoi" },
            { name: "2500 W", slug: "may-suoi" },
          ]},
          { title: "功能", items: [
            { name: "定时自动关机", slug: "may-suoi" },
            { name: "远程控制", slug: "may-suoi" },
            { name: "过热防爆保护", slug: "may-suoi" },
          ]},
        ],
      },
      {
        name: "热水器", slug: "binh-nong-lanh", icon: "🚿",
        image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5",
        tagline: "即热式、储水式、太阳能热水器。",
        highlights: [
          { name: "即热式3500W",     image: "/img/kitchen-equipment-sc-prod-1.jpg?v=5", slug: "binh-nong-lanh" },
          { name: "储水式30L",       image: "/img/kitchen-equipment-sc-prod-2.jpg?v=5", slug: "binh-nong-lanh" },
          { name: "太阳能", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=5", slug: "binh-nong-lanh" },
          { name: "空气能热泵",           image: "/img/kitchen-equipment-sc-prod-4.jpg?v=5", slug: "binh-nong-lanh" },
        ],
        sections: [
          { title: "类型", items: [
            { name: "即热式", slug: "binh-nong-lanh" },
            { name: "储水式", slug: "binh-nong-lanh" },
            { name: "太阳能", slug: "binh-nong-lanh" },
          ]},
          { title: "容量", items: [
            { name: "15–20L", slug: "binh-nong-lanh" },
            { name: "30L", slug: "binh-nong-lanh" },
            { name: "50L+酒店", slug: "binh-nong-lanh" },
          ]},
          { title: "内胆材质", items: [
            { name: "搪瓷内胆", slug: "binh-nong-lanh" },
            { name: "不锈钢内胆", slug: "binh-nong-lanh" },
            { name: "铜内胆", slug: "binh-nong-lanh" },
          ]},
        ],
      },
      {
        name: "电线电缆", slug: "day-dien-cap", icon: "🔌",
        image: "/img/ceramic-4-1.jpg?v=5",
        tagline: "单芯线、多芯线、控制电缆 — 纯铜导体，符合EN标准。",
        highlights: [
          { name: "单芯1.5–4 mm²",  image: "/img/ceramic-4-1.jpg?v=5", slug: "day-dien-cap" },
          { name: "多芯软线2.5–10",   image: "/img/ceramic-4-2.jpg?v=5", slug: "day-dien-cap" },
          { name: "电力电缆25–95 mm²",   image: "/img/ceramic-4-3.jpg?v=5", slug: "day-dien-cap" },
          { name: "CY控制电缆",    image: "/img/ceramic-4-4.jpg?v=5", slug: "day-dien-cap" },
        ],
        sections: [
          { title: "按截面", items: [
            { name: "1.5 mm²", slug: "day-dien-cap" },
            { name: "2.5 mm²", slug: "day-dien-cap" },
            { name: "4–10 mm²", slug: "day-dien-cap" },
          ]},
          { title: "按类型", items: [
            { name: "VCm单芯硬线", slug: "day-dien-cap" },
            { name: "多芯软线", slug: "day-dien-cap" },
            { name: "LSZH阻燃线", slug: "day-dien-cap" },
          ]},
          { title: "标准", items: [
            { name: "IEC 60227", slug: "day-dien-cap" },
            { name: "EN 50525", slug: "day-dien-cap" },
            { name: "TCVN 5934", slug: "day-dien-cap" },
          ]},
        ],
      },
      {
        name: "线管", slug: "ong-dan-dien", icon: "📏",
        image: "/img/ceramic-4-2.jpg?v=5",
        tagline: "PVC、PE、金属穿线管 — 阻燃+耐压。",
        highlights: [
          { name: "白色PVC管",   image: "/img/ceramic-4-2.jpg?v=5", slug: "ong-dan-dien" },
          { name: "PE弹性管",  image: "/img/ceramic-4-3.jpg?v=5", slug: "ong-dan-dien" },
          { name: "GI镀锌钢管",     image: "/img/ceramic-4-4.jpg?v=5", slug: "ong-dan-dien" },
          { name: "铝合金波纹管",    image: "/img/ceramic-4-5.jpg?v=5", slug: "ong-dan-dien" },
        ],
        sections: [
          { title: "材质", items: [
            { name: "硬质PVC", slug: "ong-dan-dien" },
            { name: "PE弹性管", slug: "ong-dan-dien" },
            { name: "GI镀锌钢管", slug: "ong-dan-dien" },
          ]},
          { title: "直径", items: [
            { name: "Ø16 mm", slug: "ong-dan-dien" },
            { name: "Ø20 mm", slug: "ong-dan-dien" },
            { name: "Ø25–32 mm", slug: "ong-dan-dien" },
          ]},
          { title: "配件", items: [
            { name: "T型/L型接头", slug: "ong-dan-dien" },
            { name: "暗装底盒", slug: "ong-dan-dien" },
            { name: "吊顶吊卡", slug: "ong-dan-dien" },
          ]},
        ],
      },
      {
        name: "电缆桥架", slug: "mang-day-dien", icon: "🛤️",
        image: "/img/ceramic-4-3.jpg?v=5",
        tagline: "镀锌、不锈钢、铝合金桥架 — 厂房与办公走廊布线。",
        highlights: [
          { name: "环氧喷涂桥架", image: "/img/ceramic-4-3.jpg?v=5", slug: "mang-day-dien" },
          { name: "304不锈钢桥架",       image: "/img/ceramic-4-4.jpg?v=5", slug: "mang-day-dien" },
          { name: "镀锌梯式桥架",  image: "/img/ceramic-4-5.jpg?v=5", slug: "mang-day-dien" },
          { name: "塑料弯通桥架",       image: "/img/ceramic-4-1.jpg?v=5", slug: "mang-day-dien" },
        ],
        sections: [
          { title: "材质", items: [
            { name: "环氧喷涂钢板", slug: "mang-day-dien" },
            { name: "304不锈钢", slug: "mang-day-dien" },
            { name: "热镀锌", slug: "mang-day-dien" },
          ]},
          { title: "款式", items: [
            { name: "槽式桥架", slug: "mang-day-dien" },
            { name: "托盘式桥架", slug: "mang-day-dien" },
            { name: "工业梯式桥架", slug: "mang-day-dien" },
          ]},
          { title: "配件", items: [
            { name: "T型/Y型弯通", slug: "mang-day-dien" },
            { name: "盖板", slug: "mang-day-dien" },
            { name: "吊顶支架", slug: "mang-day-dien" },
          ]},
        ],
      },
    ],
  },
];

export const STATS = [
  { value: "960+", label: "在售SKU" },
  { value: "20+", label: "已验证工厂" },
  { value: "<24h", label: "报价时效" },
  { value: "300+", label: "越南经销商" },
  { value: "12年", label: "交易历史" },
];

export const SECTIONS: Section[] = [
  {
    id: "ceramic",
    num: 1,
    title: "建筑材料",
    cn: "建材",
    tabs: ["全部", "瓷砖", "大理石大板", "地砖", "墙砖", "实木复合地板"],
    totalCount: "480",
    categorySlug: "construction-materials",
    featureSlug: "dongpeng-ceramics",
    feature: {
      badge: "精选推荐",
      title: "东鹏高端瓷砖",
      desc: "主打系列 · 卡拉卡塔系列 · 600×1200mm · A级",
      cta: "查看系列 →",
      image: "/img/marble1.jpg?v=5",
    },
    products: [
      { id: "ceramic-1", title: "卡拉卡塔白石纹瓷砖 600×1200", price: "$8.50", unit: "/㎡", moq: "起订量：100 ㎡", rating: 4.9, seller: "Dongpeng Ceramics", years: "12年", badges: ["top"], image: "/img/cer1.jpg?v=5", tags: ["瓷砖", "地砖", "大理石大板"] },
      { id: "ceramic-2", title: "黑金啡Nero Marquina大理石大板 1600×3200mm", price: "$42", unit: "/㎡", moq: "起订量：50 ㎡", rating: 4.8, seller: "NABEL Stone Group", years: "10年", badges: ["new"], image: "/img/cer2.jpg?v=5", tags: ["大理石大板", "墙砖"] },
      { id: "ceramic-3", title: "仿洞石仿古地砖 800×800", price: "$6.80", unit: "/㎡", moq: "起订量：200 ㎡", rating: 4.7, seller: "Monalisa Ceramic", years: "10年", badges: ["deal"], image: "/img/cer3.jpg?v=5", tags: ["地砖", "瓷砖"] },
      { id: "ceramic-4", title: "复古赤陶六角马赛克墙砖 200×230mm", price: "$12", unit: "/㎡", moq: "起订量：50 ㎡", rating: 4.9, seller: "Xinzhongyuan Ceramic", years: "8年", image: "/img/cer4.jpg?v=5", tags: ["马赛克", "墙砖"] },
      { id: "ceramic-5", title: "灰色大理石纹哑光瓷砖大板 1200×2400mm", price: "$18", unit: "/㎡", moq: "起订量：80 ㎡", rating: 5.0, seller: "Guanzhu Ceramic", years: "15年", badges: ["top"], image: "/img/cer5.jpg?v=5", tags: ["瓷砖", "大理石大板", "墙砖", "地砖"] },
      { id: "ceramic-6", title: "3D装饰木纹吸音墙板 2400×600", price: "$15", unit: "/㎡", moq: "起订量：100 ㎡", rating: 4.7, seller: "Foshan Hanse Industrial", years: "6年", badges: ["new"], image: "/img/cer6.jpg?v=5", tags: ["墙砖"] },
      { id: "ceramic-7", title: "鱼骨纹SPC锁扣乙烯基地板 1900×190×6mm", price: "$7.20", unit: "/㎡", moq: "起订量：500 ㎡", rating: 4.8, seller: "Longda Flooring Co.", years: "9年", image: "/img/cer7.jpg?v=5", tags: ["地砖"] },
      { id: "ceramic-8", title: "欧洲橡木UV饰面AB级实木复合地板", price: "$22", unit: "/㎡", moq: "起订量：300 ㎡", rating: 4.9, seller: "Jinjiang Wood House", years: "11年", badges: ["deal"], image: "/img/cer8.jpg?v=5", tags: ["地砖"] },
    ],
  },
  {
    id: "furniture",
    num: 2,
    title: "家具",
    cn: "家具",
    tabs: ["全部", "客厅", "卧室", "餐厅", "橱柜与衣柜", "办公", "酒店"],
    totalCount: "480",
    categorySlug: "noi-that",
    featureSlug: "kuka-home",
    feature: {
      badge: "热销",
      title: "顾家KUKA沙发系列",
      desc: "模块化转角沙发 · 意大利绒布 · 10种颜色可选 · 支持OEM",
      cta: "索取产品目录 →",
      image: "/img/sofa1.jpg?v=5",
    },
    products: [
      { id: "furniture-1", title: "L型转角6座绒布沙发", price: "$420", unit: "/套", moq: "起订量：10套", rating: 4.9, seller: "KUKA Home", years: "9年", badges: ["top"], image: "/img/fur1.jpg?v=5", tags: ["客厅"] },
      { id: "furniture-2", title: "现代3座电动真皮休闲沙发带USB接口", price: "$680", unit: "/套", moq: "起订量：5套", rating: 4.8, seller: "Foshan ZuoYou", years: "8年", image: "/img/fur2.jpg?v=5", tags: ["客厅"] },
      { id: "furniture-3", title: "胡桃木大床 1800×2000mm 酒店标准", price: "$380", unit: "/个", moq: "起订量：5个", rating: 4.9, seller: "Landbond Furniture", years: "14年", badges: ["new"], image: "/img/fur3.jpg?v=5", tags: ["卧室", "酒店"] },
      { id: "furniture-4", title: "北欧6座大理石面不锈钢脚餐桌套装", price: "$280", unit: "/套", moq: "起订量：10套", rating: 4.8, seller: "Dongguan Yijia Element", years: "7年", badges: ["oem"], image: "/img/fur4.jpg?v=5", tags: ["餐厅"] },
      { id: "furniture-5", title: "真皮人体工学高背带头枕老板椅", price: "$95", unit: "/个", moq: "起订量：20个", rating: 4.7, seller: "Anji Chair Group", years: "11年", badges: ["top"], image: "/img/fur5.jpg?v=5", tags: ["办公"] },
      { id: "furniture-6", title: "5星级酒店客房家具4件套", price: "$1,450", unit: "/套", moq: "起订量：10套", rating: 5.0, seller: "Foshan EMT Jufu", years: "13年", image: "/img/fur6.jpg?v=5", tags: ["卧室", "酒店"] },
      { id: "furniture-7", title: "OPPEIN模块化亮面亚克力定制橱柜", price: "$210", unit: "/米", moq: "起订量：1套", rating: 4.9, seller: "OPPEIN Home", years: "15年", badges: ["deal"], image: "/img/fur7.jpg?v=5", tags: ["餐厅"] },
      { id: "furniture-8", title: "现代4门MDF三聚氰胺推拉门衣柜", price: "$340", unit: "/个", moq: "起订量：10个", rating: 4.8, seller: "Suofeiya Home", years: "12年", image: "/img/fur8.jpg?v=5", tags: ["卧室"] },
    ],
  },
];

export const FACTORIES: Factory[] = [
  // Construction materials (瓷砖、石材、地板)
  { initials: "DP", slug: "dongpeng-ceramics", name: "Guangdong Dongpeng Ceramics Co., Ltd.", location: "广东佛山 · 中国", rating: 4.9, reviews: "2,340", meta: "5000万㎡/年", badges: { gold: true, audited: true, years: "12年" }, tags: ["瓷砖", "大理石", "墙地砖"] },
  { initials: "MN", slug: "monalisa-group", name: "Monalisa Group Co., Ltd.", location: "广东佛山 · 中国", rating: 4.9, reviews: "1,540", meta: "2500万㎡/年", badges: { gold: true, audited: true, years: "10年" }, tags: ["陶瓷", "大板", "石板"] },
  { initials: "NP", slug: "newpearl-ceramics", name: "NewPearl Ceramics Group", location: "佛山 · 中国", rating: 4.7, reviews: "680", meta: "2亿㎡/年", badges: { audited: true, years: "11年" }, tags: ["墙砖", "地砖", "瓷砖"] },
  // 家具
  { initials: "KK", slug: "kuka-home", name: "Hangzhou KUKA Home Co., Ltd.", location: "浙江杭州 · 中国", rating: 4.8, reviews: "1,810", meta: "6千+门店", badges: { gold: true, audited: true, years: "9年" }, tags: ["沙发", "休闲椅", "酒店家具"] },
  { initials: "OP", slug: "oppein-home", name: "OPPEIN Home Group Inc.", location: "广州 · 中国", rating: 5.0, reviews: "3,120", meta: "亚洲第一 — 定制柜", badges: { gold: true, audited: true, years: "15年" }, tags: ["橱柜", "衣柜", "全屋定制"], vr360ComId: "eKtTcaCAvhrm" },
  { initials: "LB", slug: "landbond-furniture", name: "Landbond Furniture Group", location: "佛山与临沂 · 中国", rating: 5.0, reviews: "1,230", meta: "40年实木经验", badges: { gold: true, audited: true, years: "14年" }, tags: ["实木", "卧室", "客厅"] },
  { initials: "ZY", slug: "zuoyou-furniture", name: "ZuoYou Furniture Co., Ltd.", location: "深圳 · 中国", rating: 4.8, reviews: "540", meta: "设计驱动", badges: { audited: true, years: "8年" }, tags: ["软体", "沙发", "现代"] },
  { initials: "RA", slug: "redapple-furniture", name: "RedApple Furniture (HK)", location: "香港 · 中国", rating: 4.9, reviews: "1,050", meta: "始于1981年", badges: { audited: true, years: "18年" }, tags: ["定制", "床垫", "酒店"] },
];

export const ZONES: Zone[] = [
  { slug: "foshan-ceramic", name: "佛山 — 陶瓷", count: "1,200家工厂", image: "/img/zone1.jpg?v=5" },
  { slug: "foshan-furniture", name: "佛山 — 家具", count: "3,000+家工厂", image: "/img/zone3.jpg?v=5" },
  { slug: "jinjiang-wood", name: "晋江 — 木业", count: "340家工厂", image: "/img/zone5.jpg?v=5" },
];
