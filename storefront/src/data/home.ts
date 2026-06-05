import {
  PARTNERS,
  productSlug,
  type PartnerBrand,
  type PartnerProduct,
} from "@/data/partners";

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
  /** Direct link target — real partner products link to /info/partners/{slug}/{productSlug}.
   *  When unset, ProductCard falls back to /product/{id}. */
  href?: string;
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
    /** Optional link target for the feature panel (real partner page). */
    href?: string;
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
  /** Made-in-China VR comId — if present, show the 360° tour in the VR Tour tab. */
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
  "大规格大理石板",
  "沙发套装",
  "橱柜",
  "强化复合地板",
  "酒店床",
];

export const NAV_CATEGORIES = [
  { icon: "🏠", name: "家居与园艺", slug: "home-garden" },
  { icon: "🧱", name: "建筑材料", slug: "construction-materials" },
  { icon: "🚿", name: "卫浴设备", slug: "bathroom-sanitary" },
  { icon: "🛋", name: "家具", slug: "noi-that" },
  { icon: "🍳", name: "厨房设备", slug: "kitchen-equipment" },
  { icon: "💡", name: "照明灯具", slug: "lighting" },
  { icon: "🪟", name: "门与锁", slug: "doors-windows" },
  { icon: "⚡", name: "电气与家电", slug: "electrical" },
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
        image: "/img/nm-home-garden-0.jpg?v=8",
        tagline: "乘客电梯 / 自动扶梯 / 消防电梯——载重与应用齐全。",
        highlights: [
          { name: "乘客电梯",       image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "thang-may-cho-khach" },
          { name: "自动扶梯",                image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "thang-cuon" },
          { name: "消防电梯",      image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "thang-chong-chay" },
          { name: "6人乘客电梯",        image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "thang-may-cho-khach" },
          { name: "13人乘客电梯",       image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "thang-may-cho-khach" },
          { name: "机场自动扶梯",        image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "thang-cuon" },
        ],
        sections: [
          { title: "乘客电梯", items: [
            { name: "6人轿厢 (450 kg)", slug: "thang-may-cho-khach" },
            { name: "13人轿厢 (1000 kg)", slug: "thang-may-cho-khach" },
            { name: "21人轿厢 (1600 kg)", slug: "thang-may-cho-khach" },
            { name: "速度 1.0–2.5 m/s", slug: "thang-may-cho-khach" },
          ]},
          { title: "自动扶梯", items: [
            { name: "梯级宽度 600–1000 mm", slug: "thang-cuon" },
            { name: "倾斜角 30° / 35°", slug: "thang-cuon" },
            { name: "商业中心", slug: "thang-cuon" },
            { name: "机场 / 地铁", slug: "thang-cuon" },
          ]},
          { title: "消防电梯", items: [
            { name: "120分钟防火轿厢", slug: "thang-chong-chay" },
            { name: "耐热门", slug: "thang-chong-chay" },
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
        image: "/img/nm-construction-materials-0.jpg?v=8",
        tagline: "H/I/U/V型钢、钢管、钢板、彩涂镀铝锌板——按吨广州FOB报价。",
        highlights: [
          { name: "H/I/U/V型钢",  image: "/img/thep-hinh-h-i-u-v.jpg?v=6", slug: "ket-cau-thep-khung" },
          { name: "黑管 / 镀锌钢管",  image: "/img/ceramic-1-2.jpg?v=6", slug: "ket-cau-thep-khung" },
          { name: "卷钢板",      image: "/img/ceramic-1-3.jpg?v=6", slug: "ket-cau-thep-khung" },
          { name: "方矩管",      image: "/img/ceramic-1-4.jpg?v=6", slug: "ket-cau-thep-khung" },
          { name: "彩涂镀铝锌板",     image: "/img/ceramic-1-5.jpg?v=6", slug: "ton-lanh" },
          { name: "工字钢",   image: "/img/cer3.jpg?v=6", slug: "ket-cau-thep-khung" },
        ],
        sections: [
          { title: "钢材", items: [
            { name: "彩涂镀铝锌板", slug: "ton-lanh" },
            { name: "工字钢", slug: "ket-cau-thep-khung" },
          ]},
          { title: "按形状", items: [
            { name: "H/I型钢", slug: "ket-cau-thep-khung" },
            { name: "U/V型钢", slug: "ket-cau-thep-khung" },
            { name: "方管", slug: "ket-cau-thep-khung" },
            { name: "圆钢管", slug: "ket-cau-thep-khung" },
          ]},
          { title: "按表面处理", items: [
            { name: "黑钢", slug: "ket-cau-thep-khung" },
            { name: "热浸镀锌", slug: "ket-cau-thep-khung" },
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
            { name: "M16+地脚螺栓", slug: "ket-cau-thep-khung" },
            { name: "高强度螺栓", slug: "ket-cau-thep-khung" },
            { name: "焊接钢丝网", slug: "ket-cau-thep-khung" },
            { name: "钢铆钉", slug: "ket-cau-thep-khung" },
          ]},
        ],
      },
      {
        name: "墙面与天花板饰面板", slug: "tam-op-tuong-tran", icon: "🟦",
        image: "/img/nm-construction-materials-1.jpg?v=8",
        tagline: "瓷板、陶瓷、密度板——为酒店与别墅打造室内设计。",
        highlights: [
          { name: "大规格瓷板",  image: "/img/cer6.jpg?v=6", slug: "tam-op-tuong-tran" },
          { name: "3D墙面板",       image: "/img/cer4.jpg?v=6", slug: "tam-op-tuong-tran" },
          { name: "石膏吊顶",     image: "/img/cer5.jpg?v=6", slug: "tam-op-tuong-tran" },
          { name: "密度板木饰面",          image: "/img/cer8.jpg?v=6", slug: "tam-op-tuong-tran" },
          { name: "隔音板",  image: "/img/cer3.jpg?v=6", slug: "tam-cach-am" },
          { name: "ALC砖", image: "/img/cer2.jpg?v=6", slug: "gach-alc-acc" },
        ],
        sections: [
          { title: "墙体材料", items: [
            { name: "隔音板", slug: "tam-cach-am" },
            { name: "ALC / ACC砖", slug: "gach-alc-acc" },
          ]},
          { title: "墙面板", items: [
            { name: "大规格瓷板", slug: "tam-op-tuong-tran" },
            { name: "3D PVC板", slug: "tam-op-tuong-tran" },
            { name: "复合板", slug: "tam-op-tuong-tran" },
            { name: "亮光亚克力板", slug: "tam-op-tuong-tran" },
          ]},
          { title: "石膏吊顶", items: [
            { name: "平面暗装吊顶", slug: "tam-op-tuong-tran" },
            { name: "60×60明架吊顶", slug: "tam-op-tuong-tran" },
            { name: "60×120明架吊顶", slug: "tam-op-tuong-tran" },
            { name: "纳米冲孔吊顶", slug: "tam-op-tuong-tran" },
          ]},
          { title: "装饰木饰面", items: [
            { name: "橡木饰面密度板", slug: "tam-op-tuong-tran" },
            { name: "防潮高密度板", slug: "tam-op-tuong-tran" },
            { name: "WPC木塑", slug: "tam-op-tuong-tran" },
            { name: "松木线条", slug: "tam-op-tuong-tran" },
          ]},
          { title: "配件", items: [
            { name: "镀锌龙骨", slug: "tam-op-tuong-tran" },
            { name: "饰面板胶粘剂", slug: "tam-op-tuong-tran" },
            { name: "嵌入式LED灯", slug: "tam-op-tuong-tran" },
            { name: "PVC线条", slug: "tam-op-tuong-tran" },
          ]},
        ],
      },
      {
        name: "地面铺装材料", slug: "vat-lieu-lat-san", icon: "🟫",
        image: "/img/nm-construction-materials-2.jpg?v=8",
        tagline: "SPC + LVT地板、天然实木、地砖——18天内DDP到货。",
        highlights: [
          { name: "SPC + LVT地板",          image: "/img/cer7.jpg?v=6", slug: "san-go-spc-lvt" },
          { name: "多层实木复合地板", image: "/img/cer8.jpg?v=6", slug: "san-go-engineered" },
          { name: "天然实木地板",   image: "/img/cer2.jpg?v=6", slug: "san-go-tu-nhien" },
          { name: "地砖",          image: "/img/cer1.jpg?v=6", slug: "gach-op-lat" },
          { name: "花岗岩石板",            image: "/img/da-granite-tu-nhien.jpg?v=6", slug: "vat-lieu-lat-san" },
          { name: "户外地板",            image: "/img/cer5.jpg?v=6", slug: "vat-lieu-lat-san" },
        ],
        sections: [
          { title: "木地板", items: [
            { name: "SPC + LVT地板", slug: "san-go-spc-lvt" },
            { name: "多层实木复合地板", slug: "san-go-engineered" },
            { name: "天然实木地板", slug: "san-go-tu-nhien" },
          ]},
          { title: "地面铺装材料", items: [
            { name: "地砖", slug: "gach-op-lat" },
          ]},
          { title: "瓷砖", items: [
            { name: "抛光釉面", slug: "vat-lieu-lat-san" },
            { name: "哑光防滑", slug: "vat-lieu-lat-san" },
            { name: "3D纹理", slug: "vat-lieu-lat-san" },
            { name: "马赛克", slug: "vat-lieu-lat-san" },
          ]},
          { title: "木地板", items: [
            { name: "三层实木复合", slug: "vat-lieu-lat-san" },
            { name: "AC4强化地板", slug: "vat-lieu-lat-san" },
            { name: "SPC乙烯基", slug: "vat-lieu-lat-san" },
            { name: "炭化竹地板", slug: "vat-lieu-lat-san" },
          ]},
          { title: "天然石材", items: [
            { name: "卡拉拉大理石", slug: "vat-lieu-lat-san" },
            { name: "黑色花岗岩", slug: "vat-lieu-lat-san" },
            { name: "洞石", slug: "vat-lieu-lat-san" },
            { name: "中国黑板岩", slug: "vat-lieu-lat-san" },
          ]},
          { title: "配件", items: [
            { name: "踢脚线", slug: "vat-lieu-lat-san" },
            { name: "门槛压条", slug: "vat-lieu-lat-san" },
            { name: "地板胶", slug: "vat-lieu-lat-san" },
            { name: "地板垫层", slug: "vat-lieu-lat-san" },
          ]},
        ],
      },
      {
        name: "天然石材与人造石", slug: "da-op-lat", icon: "⛰️",
        image: "/img/nm-construction-materials-3.jpg?v=8",
        tagline: "福建大理石、花岗岩、石英石——大板适用于台面与大堂。",
        highlights: [
          { name: "天然大理石",                  image: "/img/da-marble-tu-nhien.jpg?v=6", slug: "da-op-lat" },
          { name: "花岗岩石板",                      image: "/img/da-granite-tu-nhien.jpg?v=6", slug: "da-op-lat" },
          { name: "天然石英石",  image: "/img/da-quartz-nhan-tao.jpg?v=6", slug: "da-thach-anh-tu-nhien" },
          { name: "人造石英石", image: "/img/da-mosaic-trang-tri.jpg?v=6", slug: "da-thach-anh-nhan-tao" },
          { name: "无机磨石水磨石",     image: "/img/da-op-ngoai-that.jpg?v=6", slug: "da-mai-vo-co" },
          { name: "烧结石",                       image: "/img/da-sintered-da-thieu-ket.jpg?v=6", slug: "da-op-lat" },
        ],
        sections: [
          { title: "专用石材", items: [
            { name: "天然石英石", slug: "da-thach-anh-tu-nhien" },
            { name: "人造石英石 / 人造大理石", slug: "da-thach-anh-nhan-tao" },
            { name: "无机磨石水磨石", slug: "da-mai-vo-co" },
          ]},
          { title: "天然大理石", items: [
            { name: "白色卡拉拉", slug: "da-op-lat" },
            { name: "黑金沙Marquina", slug: "da-op-lat" },
            { name: "米黄色", slug: "da-op-lat" },
            { name: "葡萄牙玫瑰红", slug: "da-op-lat" },
          ]},
          { title: "花岗岩", items: [
            { name: "纯黑", slug: "da-op-lat" },
            { name: "巴西红", slug: "da-op-lat" },
            { name: "萨多灰", slug: "da-op-lat" },
            { name: "热带黄", slug: "da-op-lat" },
          ]},
          { title: "人造石", items: [
            { name: "大理石纹石英石", slug: "da-op-lat" },
            { name: "金属纹石英石", slug: "da-op-lat" },
            { name: "实体亚克力面材", slug: "da-op-lat" },
            { name: "人造水磨石", slug: "da-op-lat" },
          ]},
          { title: "烧结石", items: [
            { name: "Neolith", slug: "da-op-lat" },
            { name: "Dekton", slug: "da-op-lat" },
            { name: "Lapitec", slug: "da-op-lat" },
            { name: "MaxFine", slug: "da-op-lat" },
          ]},
        ],
      },
      {
        name: "涂料与涂层", slug: "son-lop-phu", icon: "🎨",
        image: "/img/nm-construction-materials-4.jpg?v=8",
        tagline: "环氧地坪漆、防火涂料、装饰砂浆——符合QCVN标准。",
        highlights: [
          { name: "内墙 / 艺术涂料", image: "/img/son-epoxy-san.jpg?v=6", slug: "son-tuong-trong-nghe-thuat" },
          { name: "石纹外墙涂料",  image: "/img/ceramic-2-1.jpg?v=6", slug: "son-mat-tuong-ngoai" },
          { name: "瓷砖胶",                     image: "/img/ceramic-2-2.jpg?v=6", slug: "keo-gach-op" },
          { name: "装饰填缝剂",         image: "/img/ceramic-2-3.jpg?v=6", slug: "keo-chit-mach" },
          { name: "防水涂料",                image: "/img/ceramic-2-5.jpg?v=6", slug: "son-chong-tham" },
          { name: "环氧地坪漆",                            image: "/img/ceramic-2-4.jpg?v=6", slug: "son-lop-phu" },
        ],
        sections: [
          { title: "涂料", items: [
            { name: "内墙 / 艺术乳胶漆", slug: "son-tuong-trong-nghe-thuat" },
            { name: "石纹外墙涂料", slug: "son-mat-tuong-ngoai" },
            { name: "瓷砖胶", slug: "keo-gach-op" },
            { name: "装饰填缝剂", slug: "keo-chit-mach" },
            { name: "防水涂料", slug: "son-chong-tham" },
          ]},
          { title: "内墙涂料", items: [
            { name: "抗碱底漆", slug: "son-lop-phu" },
            { name: "亮光面漆", slug: "son-lop-phu" },
            { name: "纹理漆", slug: "son-lop-phu" },
            { name: "防霉漆", slug: "son-lop-phu" },
          ]},
          { title: "外墙涂料", items: [
            { name: "纳米超耐久漆", slug: "son-lop-phu" },
            { name: "反射隔热漆", slug: "son-lop-phu" },
            { name: "道路 / 划线漆", slug: "son-lop-phu" },
            { name: "环氧地坪漆", slug: "son-lop-phu" },
          ]},
          { title: "专用涂料", items: [
            { name: "防火涂料", slug: "son-lop-phu" },
            { name: "防水涂料", slug: "son-lop-phu" },
            { name: "防静电涂料", slug: "son-lop-phu" },
            { name: "隔热涂料", slug: "son-lop-phu" },
          ]},
          { title: "涂装配件", items: [
            { name: "遮蔽胶带", slug: "son-lop-phu" },
            { name: "滚筒 / 油漆刷", slug: "son-lop-phu" },
            { name: "地面保护防尘布", slug: "son-lop-phu" },
            { name: "墙面腻子粉", slug: "son-lop-phu" },
          ]},
        ],
      },
      {
        name: "隔音与隔热材料", slug: "vat-lieu-cach-am-cach-nhiet", icon: "🧊",
        image: "/img/nm-construction-materials-5.jpg?v=8",
        tagline: "岩棉、EPS/XPS、橡塑棉——适用于KTV、厂房、冷库。",
        highlights: [
          { name: "Rockwool岩棉", image: "/img/bong-khoang-rockwool.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "墙面隔音板",   image: "/img/tam-cach-am.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "玻璃棉",      image: "/img/bong-thuy-tinh-cach-nhiet.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "聚酯纤维棉",      image: "/img/bong-polyester.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "EPS/XPS板",         image: "/img/ceramic-3-1.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
          { name: "隔热膜",     image: "/img/ceramic-3-2.jpg?v=6", slug: "vat-lieu-cach-am-cach-nhiet" },
        ],
        sections: [
          { title: "岩棉", items: [
            { name: "Rockwool岩棉板", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "玻璃棉卷", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "耐热陶瓷纤维棉", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "二氧化硅气凝胶棉", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "泡棉", items: [
            { name: "PE泡棉卷", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "喷涂PU泡沫", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "酚醛泡沫", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "EPP模塑成型", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "EPS / XPS", items: [
            { name: "标准EPS板", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "抗压XPS板", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "模塑EPS SIP板", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "屋面XPS板", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
          { title: "隔热配件", items: [
            { name: "反射隔热铝箔膜", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "隔热棉胶粘剂", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "拉结件 / 镀锌龙骨", slug: "vat-lieu-cach-am-cach-nhiet" },
            { name: "专用锚栓", slug: "vat-lieu-cach-am-cach-nhiet" },
          ]},
        ],
      },
      {
        name: "防水", slug: "vat-lieu-chong-tham", icon: "💧",
        image: "/img/nm-construction-materials-6.jpg?v=8",
        tagline: "自粘沥青卷材、聚氨酯涂层、PU胶——质保10–15年。",
        highlights: [
          { name: "自粘沥青卷材",  image: "/img/mang-chong-tham-bitum.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "PU防水涂层",   image: "/img/ceramic-4-1.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "硅酮胶",        image: "/img/ceramic-4-2.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "水泥添加剂",     image: "/img/ceramic-4-3.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "PVC止水带",   image: "/img/ceramic-4-4.jpg?v=6", slug: "vat-lieu-chong-tham" },
          { name: "防水砂浆",      image: "/img/ceramic-4-5.jpg?v=6", slug: "vat-lieu-chong-tham" },
        ],
        sections: [
          { title: "沥青卷材", items: [
            { name: "SBS自粘", slug: "vat-lieu-chong-tham" },
            { name: "APP热熔", slug: "vat-lieu-chong-tham" },
            { name: "3mm厚卷材", slug: "vat-lieu-chong-tham" },
            { name: "4mm厚卷材", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "防水涂层", items: [
            { name: "单组分弹性PU", slug: "vat-lieu-chong-tham" },
            { name: "双组分弹性PU", slug: "vat-lieu-chong-tham" },
            { name: "水性丙烯酸", slug: "vat-lieu-chong-tham" },
            { name: "高压喷涂聚脲", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "胶粘剂与添加剂", items: [
            { name: "中性硅酮胶", slug: "vat-lieu-chong-tham" },
            { name: "MS聚合物", slug: "vat-lieu-chong-tham" },
            { name: "水泥防水添加剂", slug: "vat-lieu-chong-tham" },
            { name: "双组分防水砂浆", slug: "vat-lieu-chong-tham" },
          ]},
          { title: "施工配件", items: [
            { name: "PVC止水带", slug: "vat-lieu-chong-tham" },
            { name: "增强纤维网", slug: "vat-lieu-chong-tham" },
            { name: "丁基胶带", slug: "vat-lieu-chong-tham" },
            { name: "无收缩砂浆", slug: "vat-lieu-chong-tham" },
          ]},
        ],
      },
      {
        name: "水泥与砂浆", slug: "vat-lieu-kho-xi-mang-vua", icon: "🏗️",
        image: "/img/nm-construction-materials-7.jpg?v=8",
        tagline: "河仙水泥、预拌干粉砂浆、混凝土外加剂——送货到工地。",
        highlights: [
          { name: "通用水泥",     image: "/img/chau-xi-mang.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "预拌砂浆",        image: "/img/ceramic-5-1.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "混凝土外加剂",     image: "/img/ceramic-5-2.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "无收缩砂浆",  image: "/img/ceramic-5-3.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "瓷砖胶",        image: "/img/ceramic-5-4.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
          { name: "耐酸砂浆",      image: "/img/ceramic-5-5.jpg?v=6", slug: "vat-lieu-kho-xi-mang-vua" },
        ],
        sections: [
          { title: "袋装水泥", items: [
            { name: "PCB30通用型", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCB40高抗压", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCB50高强度", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "白水泥", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "预拌干粉砂浆", items: [
            { name: "砌筑与抹灰砂浆", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "粘结砂浆", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "饰面砂浆", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "自流平砂浆", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "混凝土外加剂", items: [
            { name: "速凝剂", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "缓凝剂", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "PCE聚羧酸高效减水剂", slug: "vat-lieu-kho-xi-mang-vua" },
            { name: "混凝土防水剂", slug: "vat-lieu-kho-xi-mang-vua" },
          ]},
          { title: "瓷砖胶与填缝剂", items: [
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
    main: { icon: "🚿", name: "卫浴设备", slug: "bathroom-sanitary" },
    items: [
      {
        name: "陶瓷座便器", slug: "bon-cau-su", icon: "🚽",
        image: "/img/nm-bathroom-sanitary-0.jpg?v=8",
        tagline: "连体、分体、壁挂式座便器——釉面陶瓷，虹吸静音冲水。",
        highlights: [
          { name: "连体虹吸座便器",  image: "/img/bathroom-1-1.jpg?v=6", slug: "bon-cau-su" },
          { name: "标准分体座便器", image: "/img/bathroom-1-2.jpg?v=6", slug: "bon-cau-su" },
          { name: "壁挂式座便器",       image: "/img/bathroom-1-3.jpg?v=6", slug: "bon-cau-su" },
          { name: "陶瓷蹲便器",            image: "/img/bathroom-1-4.jpg?v=6", slug: "bon-cau-su" },
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
            { name: "壁挂式", slug: "bon-cau-su" },
          ]},
          { title: "用水标准", items: [
            { name: "3/6L节水", slug: "bon-cau-su" },
            { name: "WaterSense", slug: "bon-cau-su" },
            { name: "CUPC", slug: "bon-cau-su" },
          ]},
        ],
      },
      {
        name: "智能座便器", slug: "bon-cau-thong-minh", icon: "🤖",
        image: "/img/nm-bathroom-sanitary-1.jpg?v=8",
        tagline: "智能座便器，带冲洗 + 烘干 + 座圈加热 + 自动除臭。",
        highlights: [
          { name: "智能连体机",   image: "/img/bathroom-2-1.jpg?v=6", slug: "bon-cau-thong-minh" },
          { name: "智能冲洗盖板",         image: "/img/bathroom-2-2.jpg?v=6", slug: "bon-cau-thong-minh" },
          { name: "智能壁挂式", image: "/img/bathroom-2-3.jpg?v=6", slug: "bon-cau-thong-minh" },
          { name: "日式高端款",   image: "/img/bathroom-2-4.jpg?v=6", slug: "bon-cau-thong-minh" },
        ],
        sections: [
          { title: "功能", items: [
            { name: "温水冲洗", slug: "bon-cau-thong-minh" },
            { name: "暖风烘干", slug: "bon-cau-thong-minh" },
            { name: "座圈加热 + 除臭", slug: "bon-cau-thong-minh" },
          ]},
          { title: "控制", items: [
            { name: "接近感应", slug: "bon-cau-thong-minh" },
            { name: "红外遥控", slug: "bon-cau-thong-minh" },
            { name: "侧边面板 + 语音", slug: "bon-cau-thong-minh" },
          ]},
          { title: "节能", items: [
            { name: "3L超节水冲洗", slug: "bon-cau-thong-minh" },
            { name: "Eco模式", slug: "bon-cau-thong-minh" },
            { name: "自动断电", slug: "bon-cau-thong-minh" },
          ]},
        ],
      },
      {
        name: "陶瓷洗脸盆", slug: "lavabo-su", icon: "🪣",
        image: "/img/nm-bathroom-sanitary-2.jpg?v=8",
        tagline: "壁挂式、台下式与台上式陶瓷洗脸盆——款式多样。",
        highlights: [
          { name: "圆形台上盆",   image: "/img/bathroom-3-1.jpg?v=6", slug: "lavabo-su" },
          { name: "壁挂式",     image: "/img/bathroom-3-2.jpg?v=6", slug: "lavabo-su" },
          { name: "台上盆", image: "/img/bathroom-3-3.jpg?v=6", slug: "lavabo-su" },
          { name: "台下盆",          image: "/img/bathroom-3-4.jpg?v=6", slug: "lavabo-su" },
        ],
        sections: [
          { title: "安装方式", items: [
            { name: "台上式", slug: "lavabo-su" },
            { name: "壁挂式", slug: "lavabo-su" },
            { name: "台下式", slug: "lavabo-su" },
          ]},
          { title: "材质", items: [
            { name: "卫生陶瓷", slug: "lavabo-su" },
            { name: "复合材料", slug: "lavabo-su" },
            { name: "人造石", slug: "lavabo-su" },
          ]},
          { title: "表面", items: [
            { name: "经典白釉", slug: "lavabo-su" },
            { name: "哑光黑釉", slug: "lavabo-su" },
            { name: "石纹艺术面", slug: "lavabo-su" },
          ]},
        ],
      },
      {
        name: "浴室柜", slug: "tu-phong-tam", icon: "🪞",
        image: "/img/nm-bathroom-sanitary-3.jpg?v=8",
        tagline: "盆柜 + 镜子 + 灯具——防水木材 + 不锈钢。",
        highlights: [
          { name: "600 mm柜",       image: "/img/bathroom-4-1.jpg?v=6", slug: "tu-phong-tam" },
          { name: "800 mm含镜柜", image: "/img/bathroom-4-2.jpg?v=6", slug: "tu-phong-tam" },
          { name: "1200 mm双盆柜",   image: "/img/bathroom-4-3.jpg?v=6", slug: "tu-phong-tam" },
          { name: "不锈钢304柜",       image: "/img/bathroom-4-4.jpg?v=6", slug: "tu-phong-tam" },
        ],
        sections: [
          { title: "材质", items: [
            { name: "三聚氰胺饰面胶合板", slug: "tu-phong-tam" },
            { name: "防水PVC", slug: "tu-phong-tam" },
            { name: "不锈钢304", slug: "tu-phong-tam" },
          ]},
          { title: "尺寸", items: [
            { name: "600 mm", slug: "tu-phong-tam" },
            { name: "800 mm", slug: "tu-phong-tam" },
            { name: "1200 mm双盆", slug: "tu-phong-tam" },
          ]},
          { title: "配件", items: [
            { name: "感应镜 + 灯", slug: "tu-phong-tam" },
            { name: "液压上翻门", slug: "tu-phong-tam" },
            { name: "玫瑰金拉手", slug: "tu-phong-tam" },
          ]},
        ],
      },
      {
        name: "水龙头与花洒", slug: "voi-nuoc", icon: "🚰",
        image: "/img/nm-bathroom-sanitary-4.jpg?v=8",
        tagline: "花洒、面盆龙头与厨房龙头——黄铜镀铬 / 镀金 / 哑光。",
        highlights: [
          { name: "加高面盆龙头", image: "/img/bathroom-5-1.jpg?v=6", slug: "voi-nuoc" },
          { name: "暗装花洒", image: "/img/bathroom-5-2.jpg?v=6", slug: "voi-nuoc" },
          { name: "鹅颈厨房龙头", image: "/img/bathroom-5-3.jpg?v=6", slug: "voi-nuoc" },
          { name: "淋浴花洒套装",   image: "/img/bathroom-5-4.jpg?v=6", slug: "voi-nuoc" },
        ],
        sections: [
          { title: "安装位置", items: [
            { name: "面盆", slug: "voi-nuoc" },
            { name: "浴缸 / 花洒", slug: "voi-nuoc" },
            { name: "厨房", slug: "voi-nuoc" },
          ]},
          { title: "材质", items: [
            { name: "黄铜镀铬", slug: "voi-nuoc" },
            { name: "不锈钢304", slug: "voi-nuoc" },
            { name: "经济型锌合金", slug: "voi-nuoc" },
          ]},
          { title: "表面颜色", items: [
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
        image: "/img/nm-noi-that-0.jpg?v=8",
        tagline: "沙发、茶几、电视柜——为别墅与高端公寓提供整套配置。",
        highlights: [
          { name: "现代沙发",       image: "/img/fur1.jpg?v=6", slug: "phong-khach" },
          { name: "古典沙发",        image: "/img/fur2.jpg?v=6", slug: "phong-khach" },
          { name: "茶几",          image: "/img/ban-ca-phe.jpg?v=6", slug: "phong-khach" },
          { name: "电视柜",               image: "/img/fur4.jpg?v=6", slug: "phong-khach" },
          { name: "休闲椅",        image: "/img/fur5.jpg?v=6", slug: "phong-khach" },
          { name: "玄关桌",         image: "/img/furniture-1-3.jpg?v=6", slug: "phong-khach" },
        ],
        sections: [
          { title: "沙发", items: [
            { name: "现代沙发", slug: "phong-khach" },
            { name: "古典沙发", slug: "phong-khach" },
            { name: "意大利真皮沙发", slug: "phong-khach" },
            { name: "亚麻布艺沙发", slug: "phong-khach" },
          ]},
          { title: "桌与柜", items: [
            { name: "茶几", slug: "phong-khach" },
            { name: "玄关桌", slug: "phong-khach" },
            { name: "壁挂电视柜", slug: "phong-khach" },
            { name: "落地电视柜", slug: "phong-khach" },
          ]},
          { title: "休闲椅", items: [
            { name: "扶手椅", slug: "phong-khach" },
            { name: "可躺休闲椅", slug: "phong-khach" },
            { name: "吊篮蛋椅", slug: "phong-khach" },
            { name: "坐墩", slug: "phong-khach" },
          ]},
          { title: "灯具与装饰", items: [
            { name: "落地灯", slug: "phong-khach" },
            { name: "沙发边几台灯", slug: "phong-khach" },
            { name: "客厅地毯", slug: "phong-khach" },
            { name: "高档窗帘", slug: "phong-khach" },
          ]},
        ],
      },
      {
        name: "卧室", slug: "phong-ngu", icon: "🛏️",
        image: "/img/nm-noi-that-1.jpg?v=8",
        tagline: "床、衣柜、梳妆台——现代风格与新古典风格。",
        highlights: [
          { name: "床",          image: "/img/fur3.jpg?v=6", slug: "phong-ngu" },
          { name: "衣柜",          image: "/img/fur8.jpg?v=6", slug: "phong-ngu" },
          { name: "梳妆台",      image: "/img/furniture-2-1.jpg?v=6", slug: "phong-ngu" },
          { name: "床头柜",      image: "/img/furniture-2-2.jpg?v=6", slug: "phong-ngu" },
          { name: "乳胶床垫",           image: "/img/dem-latex-memory-foam.jpg?v=6", slug: "phong-ngu" },
          { name: "独立袋装弹簧床垫",   image: "/img/dem-pocket-spring.jpg?v=6", slug: "phong-ngu" },
        ],
        sections: [
          { title: "床", items: [
            { name: "1.6m床", slug: "phong-ngu" },
            { name: "1.8m床", slug: "phong-ngu" },
            { name: "2m King床", slug: "phong-ngu" },
            { name: "上下床", slug: "phong-ngu" },
          ]},
          { title: "衣柜", items: [
            { name: "推拉门衣柜", slug: "phong-ngu" },
            { name: "平开门衣柜", slug: "phong-ngu" },
            { name: "衣帽间", slug: "phong-ngu" },
            { name: "带镜衣柜", slug: "phong-ngu" },
          ]},
          { title: "高档床垫", items: [
            { name: "天然乳胶床垫", slug: "phong-ngu" },
            { name: "独立袋装弹簧床垫", slug: "phong-ngu" },
            { name: "记忆棉床垫", slug: "phong-ngu" },
            { name: "7区乳胶床垫", slug: "phong-ngu" },
          ]},
          { title: "桌 / 配件", items: [
            { name: "带镜梳妆台", slug: "phong-ngu" },
            { name: "床头柜", slug: "phong-ngu" },
            { name: "床尾凳", slug: "phong-ngu" },
            { name: "感应夜灯", slug: "phong-ngu" },
          ]},
        ],
      },
      {
        name: "餐厅", slug: "phong-an", icon: "🍽️",
        image: "/img/nm-noi-that-2.jpg?v=8",
        tagline: "餐桌套装、酒柜、餐椅——天然实木与高档密度板饰面。",
        highlights: [
          { name: "6–8座餐桌",      image: "/img/ban-an.jpg?v=6", slug: "phong-an" },
          { name: "餐椅",              image: "/img/ghe-an.jpg?v=6", slug: "phong-an" },
          { name: "茶几",          image: "/img/ban-ca-phe.jpg?v=6", slug: "phong-an" },
          { name: "吧椅",             image: "/img/ghe-bar.jpg?v=6", slug: "phong-an" },
          { name: "水晶吊灯",     image: "/img/den-pha-le-k9.jpg?v=6", slug: "phong-an" },
          { name: "吊灯",         image: "/img/den-pendant.jpg?v=6", slug: "phong-an" },
        ],
        sections: [
          { title: "餐桌", items: [
            { name: "4座桌", slug: "phong-an" },
            { name: "6座桌", slug: "phong-an" },
            { name: "8座桌", slug: "phong-an" },
            { name: "伸缩餐桌", slug: "phong-an" },
          ]},
          { title: "餐椅", items: [
            { name: "天然实木椅", slug: "phong-an" },
            { name: "皮革包椅", slug: "phong-an" },
            { name: "布艺包椅", slug: "phong-an" },
            { name: "高档塑料椅", slug: "phong-an" },
          ]},
          { title: "酒柜与餐边柜", items: [
            { name: "玻璃门酒柜", slug: "phong-an" },
            { name: "模块化酒柜", slug: "phong-an" },
            { name: "展示餐边柜", slug: "phong-an" },
            { name: "迷你吧台柜", slug: "phong-an" },
          ]},
          { title: "灯具与装饰", items: [
            { name: "水晶吊灯", slug: "phong-an" },
            { name: "单头吊灯", slug: "phong-an" },
            { name: "餐桌花瓶", slug: "phong-an" },
            { name: "装饰画", slug: "phong-an" },
          ]},
        ],
      },
      {
        name: "橱柜", slug: "tu-bep", icon: "🍳",
        image: "/img/nm-noi-that-3.jpg?v=8",
        tagline: "OPPEIN橱柜，亚克力与防火板面材——30套起免费3D设计。",
        highlights: [
          { name: "L型厨房",        image: "/img/fur7.jpg?v=6", slug: "tu-bep" },
          { name: "U型厨房",        image: "/img/furniture-7-1.jpg?v=6", slug: "tu-bep" },
          { name: "中岛台",             image: "/img/furniture-7-2.jpg?v=6", slug: "tu-bep" },
          { name: "石英石台面",       image: "/img/da-quartz-nhan-tao.jpg?v=6", slug: "tu-bep" },
          { name: "橱柜铰链",       image: "/img/ban-le-tu-bep.jpg?v=6", slug: "tu-bep" },
          { name: "阻尼铰链",    image: "/img/ban-le-tu-giam-chan.jpg?v=6", slug: "tu-bep" },
        ],
        sections: [
          { title: "布局", items: [
            { name: "基础I型", slug: "tu-bep" },
            { name: "L型转角厨房", slug: "tu-bep" },
            { name: "U型封闭式", slug: "tu-bep" },
            { name: "带中岛台", slug: "tu-bep" },
          ]},
          { title: "门板材质", items: [
            { name: "亮光亚克力", slug: "tu-bep" },
            { name: "木纹防火板", slug: "tu-bep" },
            { name: "三聚氰胺MFC", slug: "tu-bep" },
            { name: "天然橡木 / 胡桃木", slug: "tu-bep" },
          ]},
          { title: "台面", items: [
            { name: "人造石英石", slug: "tu-bep" },
            { name: "天然花岗岩", slug: "tu-bep" },
            { name: "白色大理石", slug: "tu-bep" },
            { name: "Corian实体面材", slug: "tu-bep" },
          ]},
          { title: "配件", items: [
            { name: "Blum阻尼铰链", slug: "tu-bep" },
            { name: "三节抽屉滑轨", slug: "tu-bep" },
            { name: "柜门拉手", slug: "tu-bep" },
            { name: "柜下LED灯", slug: "tu-bep" },
          ]},
        ],
      },
      {
        name: "衣柜", slug: "tu-quan-ao", icon: "👔",
        image: "/img/nm-noi-that-4.jpg?v=8",
        tagline: "嵌入式衣柜、衣帽间——按您的房间尺寸OEM定制。",
        highlights: [
          { name: "推拉门衣柜",    image: "/img/fur8.jpg?v=6", slug: "tu-quan-ao" },
          { name: "衣帽间",      image: "/img/furniture-8-1.jpg?v=6", slug: "tu-quan-ao" },
          { name: "儿童衣柜",        image: "/img/furniture-8-2.jpg?v=6", slug: "tu-quan-ao" },
          { name: "鞋柜",             image: "/img/furniture-8-3.jpg?v=6", slug: "tu-quan-ao" },
          { name: "柜体铰链",           image: "/img/ban-le.jpg?v=6", slug: "tu-quan-ao" },
          { name: "门铰链",          image: "/img/ban-le-cua.jpg?v=6", slug: "tu-quan-ao" },
        ],
        sections: [
          { title: "衣柜类型", items: [
            { name: "推拉门", slug: "tu-quan-ao" },
            { name: "平开门", slug: "tu-quan-ao" },
            { name: "衣帽间", slug: "tu-quan-ao" },
            { name: "嵌入式模块", slug: "tu-quan-ao" },
          ]},
          { title: "材质", items: [
            { name: "密度板饰面", slug: "tu-quan-ao" },
            { name: "防潮高密度板", slug: "tu-quan-ao" },
            { name: "天然实木", slug: "tu-quan-ao" },
            { name: "亮光亚克力", slug: "tu-quan-ao" },
          ]},
          { title: "内部配件", items: [
            { name: "Hafele拉篮", slug: "tu-quan-ao" },
            { name: "旋转领带架", slug: "tu-quan-ao" },
            { name: "人体感应LED灯", slug: "tu-quan-ao" },
            { name: "柜内保险箱", slug: "tu-quan-ao" },
          ]},
          { title: "配套柜体", items: [
            { name: "配套鞋柜", slug: "tu-quan-ao" },
            { name: "床头柜", slug: "tu-quan-ao" },
            { name: "抽屉柜", slug: "tu-quan-ao" },
            { name: "柜内首饰托盘", slug: "tu-quan-ao" },
          ]},
        ],
      },
      {
        name: "家庭办公", slug: "van-phong-tai-nha", icon: "💼",
        image: "/img/nm-noi-that-5.jpg?v=8",
        tagline: "办公桌、人体工学椅、书架——打造灵活的家庭办公空间。",
        highlights: [
          { name: "办公桌",        image: "/img/ban-lam-viec.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "办公椅",       image: "/img/ghe-van-phong.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "折叠野餐桌",      image: "/img/ban-picnic-gap-gon.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "LED台灯",         image: "/img/den-ban-de-ban.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "落地灯",      image: "/img/den-san-floor-lamp.jpg?v=6", slug: "van-phong-tai-nha" },
          { name: "Wi-Fi智能灯",     image: "/img/den-smart-wi-fi.jpg?v=6", slug: "van-phong-tai-nha" },
        ],
        sections: [
          { title: "办公桌", items: [
            { name: "升降站立桌", slug: "van-phong-tai-nha" },
            { name: "L型桌", slug: "van-phong-tai-nha" },
            { name: "极简直桌", slug: "van-phong-tai-nha" },
            { name: "带书架办公桌", slug: "van-phong-tai-nha" },
          ]},
          { title: "座椅", items: [
            { name: "人体工学椅", slug: "van-phong-tai-nha" },
            { name: "电竞椅", slug: "van-phong-tai-nha" },
            { name: "真皮老板椅", slug: "van-phong-tai-nha" },
            { name: "网布办公椅", slug: "van-phong-tai-nha" },
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
            { name: "Wi-Fi智能灯", slug: "van-phong-tai-nha" },
            { name: "立式笔记本支架", slug: "van-phong-tai-nha" },
          ]},
        ],
      },
      {
        name: "酒店家具", slug: "noi-that-khach-san", icon: "🏨",
        image: "/img/nm-noi-that-6.jpg?v=8",
        tagline: "3–5星级FF&E整体配套——符合万豪/希尔顿标准的设计。",
        highlights: [
          { name: "酒店床",    image: "/img/fur6.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "大堂桌",           image: "/img/furniture-6-1.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "休闲椅",        image: "/img/furniture-6-2.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "水晶吊灯", image: "/img/den-chum-chandelier.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "壁灯",     image: "/img/den-tuong-wall-sconce.jpg?v=6", slug: "noi-that-khach-san" },
          { name: "吸顶灯",         image: "/img/den-op-tran.jpg?v=6", slug: "noi-that-khach-san" },
        ],
        sections: [
          { title: "酒店客房", items: [
            { name: "King/Queen床", slug: "noi-that-khach-san" },
            { name: "软包床头", slug: "noi-that-khach-san" },
            { name: "客房办公桌", slug: "noi-that-khach-san" },
            { name: "木饰面迷你吧柜", slug: "noi-that-khach-san" },
          ]},
          { title: "酒店浴室", items: [
            { name: "100%纯棉毛巾", slug: "noi-that-khach-san" },
            { name: "包装洗漱用品套装", slug: "noi-that-khach-san" },
            { name: "华夫格浴袍", slug: "noi-that-khach-san" },
            { name: "客房拖鞋", slug: "noi-that-khach-san" },
          ]},
          { title: "大堂与休息区", items: [
            { name: "休闲椅", slug: "noi-that-khach-san" },
            { name: "前台接待台", slug: "noi-that-khach-san" },
            { name: "水晶吊灯", slug: "noi-that-khach-san" },
            { name: "玻璃展示柜", slug: "noi-that-khach-san" },
          ]},
          { title: "餐饮区 / 吧台", items: [
            { name: "不锈钢自助餐台", slug: "noi-that-khach-san" },
            { name: "高档餐厅椅", slug: "noi-that-khach-san" },
            { name: "吧台吊灯", slug: "noi-that-khach-san" },
            { name: "整体式吧台", slug: "noi-that-khach-san" },
          ]},
        ],
      },
      {
        name: "儿童与婴儿", slug: "tre-em-em-be", icon: "🧸",
        image: "/img/nm-noi-that-7.jpg?v=8",
        tagline: "儿童床、学习桌、安全玩具——符合E0/E1标准。",
        highlights: [
          { name: "儿童床",       image: "/img/furniture-3-1.jpg?v=6", slug: "tre-em-em-be" },
          { name: "学习桌",             image: "/img/furniture-3-2.jpg?v=6", slug: "tre-em-em-be" },
          { name: "玩具柜",          image: "/img/furniture-3-3.jpg?v=6", slug: "tre-em-em-be" },
          { name: "可调节儿童椅",        image: "/img/ghe-tam-nang.jpg?v=6", slug: "tre-em-em-be" },
          { name: "儿童台灯",   image: "/img/den-ban-de-ban.jpg?v=6", slug: "tre-em-em-be" },
          { name: "装饰LED灯带", image: "/img/den-led-day.jpg?v=6", slug: "tre-em-em-be" },
        ],
        sections: [
          { title: "儿童卧室", items: [
            { name: "安全上下床", slug: "tre-em-em-be" },
            { name: "密度板婴儿床", slug: "tre-em-em-be" },
            { name: "儿童衣柜", slug: "tre-em-em-be" },
            { name: "感应夜灯", slug: "tre-em-em-be" },
          ]},
          { title: "学习角", items: [
            { name: "防驼背书桌", slug: "tre-em-em-be" },
            { name: "可调节学习椅", slug: "tre-em-em-be" },
            { name: "儿童书架", slug: "tre-em-em-be" },
            { name: "护眼LED台灯", slug: "tre-em-em-be" },
          ]},
          { title: "玩具与收纳", items: [
            { name: "模块化玩具柜", slug: "tre-em-em-be" },
            { name: "E0木制玩具", slug: "tre-em-em-be" },
            { name: "益智积木", slug: "tre-em-em-be" },
            { name: "布艺收纳盒", slug: "tre-em-em-be" },
          ]},
          { title: "卫生与饮食", items: [
            { name: "婴儿餐椅", slug: "tre-em-em-be" },
            { name: "儿童纯棉毛巾", slug: "tre-em-em-be" },
            { name: "硅胶围兜", slug: "tre-em-em-be" },
            { name: "婴儿迷你洗脸盆", slug: "tre-em-em-be" },
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
        image: "/img/nm-kitchen-equipment-0.jpg?v=8",
        tagline: "单 / 双 / 3–4灶电磁炉——Schott玻璃面板，功率3500W+。",
        highlights: [
          { name: "双灶",   image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "bep-tu" },
          { name: "3灶",     image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "bep-tu" },
          { name: "4灶",     image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "bep-tu" },
          { name: "便携单灶炉",    image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "bep-tu" },
        ],
        sections: [
          { title: "灶头数量", items: [
            { name: "单灶", slug: "bep-tu" },
            { name: "双灶", slug: "bep-tu" },
            { name: "3–4灶嵌入式", slug: "bep-tu" },
          ]},
          { title: "功率", items: [
            { name: "≤ 2000 W", slug: "bep-tu" },
            { name: "2000–3500 W", slug: "bep-tu" },
            { name: "爆炒档 > 3500 W", slug: "bep-tu" },
          ]},
          { title: "功能", items: [
            { name: "儿童锁", slug: "bep-tu" },
            { name: "自动断电（空锅）", slug: "bep-tu" },
            { name: "9档火力", slug: "bep-tu" },
          ]},
        ],
      },
      {
        name: "抽油烟机", slug: "may-hut-mui", icon: "💨",
        image: "/img/nm-kitchen-equipment-1.jpg?v=8",
        tagline: "壁挂式、嵌入式与中岛式抽油烟机——风量700–1300 m³/h。",
        highlights: [
          { name: "壁挂钻石款", image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "may-hut-mui" },
          { name: "嵌入式经典款",   image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "may-hut-mui" },
          { name: "中岛吸顶式", image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "may-hut-mui" },
          { name: "触控远程控制",     image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "may-hut-mui" },
        ],
        sections: [
          { title: "按安装方式", items: [
            { name: "墙面 / 壁挂", slug: "may-hut-mui" },
            { name: "嵌入式经典款", slug: "may-hut-mui" },
            { name: "中岛吸顶式", slug: "may-hut-mui" },
          ]},
          { title: "风量", items: [
            { name: "700 m³/h", slug: "may-hut-mui" },
            { name: "1000 m³/h", slug: "may-hut-mui" },
            { name: "1300+ m³/h", slug: "may-hut-mui" },
          ]},
          { title: "材质", items: [
            { name: "不锈钢304", slug: "may-hut-mui" },
            { name: "钢化玻璃", slug: "may-hut-mui" },
            { name: "艺术拉丝铜", slug: "may-hut-mui" },
          ]},
        ],
      },
      {
        name: "微波炉", slug: "lo-vi-song", icon: "📡",
        image: "/img/nm-kitchen-equipment-2.jpg?v=8",
        tagline: "机械式、电子式与烧烤微波炉——容量20–42L。",
        highlights: [
          { name: "机械式20L",     image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "lo-vi-song" },
          { name: "电子式25L",    image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "lo-vi-song" },
          { name: "烧烤式30L",   image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "lo-vi-song" },
          { name: "蒸汽组合式", image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "lo-vi-song" },
        ],
        sections: [
          { title: "容量", items: [
            { name: "20L家用", slug: "lo-vi-song" },
            { name: "25–30L", slug: "lo-vi-song" },
            { name: "42L+专业型", slug: "lo-vi-song" },
          ]},
          { title: "类型", items: [
            { name: "机械式", slug: "lo-vi-song" },
            { name: "电子触控", slug: "lo-vi-song" },
            { name: "微波 + 烧烤 + 蒸", slug: "lo-vi-song" },
          ]},
          { title: "功率", items: [
            { name: "700 W", slug: "lo-vi-song" },
            { name: "900 W", slug: "lo-vi-song" },
            { name: "1200 W+", slug: "lo-vi-song" },
          ]},
        ],
      },
      {
        name: "高压锅", slug: "noi-ap-suat", icon: "🍲",
        image: "/img/nm-kitchen-equipment-3.jpg?v=8",
        tagline: "电压力锅与多功能锅——容量4–10L。",
        highlights: [
          { name: "电压力锅5L",       image: "/img/kitchen-equipment-sc-prod-6.jpg?v=6", slug: "noi-ap-suat" },
          { name: "多功能6L",    image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "noi-ap-suat" },
          { name: "大容量不锈钢8L",      image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "noi-ap-suat" },
          { name: "传统机械式", image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "noi-ap-suat" },
        ],
        sections: [
          { title: "容量", items: [
            { name: "4–5L家用", slug: "noi-ap-suat" },
            { name: "6–8L", slug: "noi-ap-suat" },
            { name: "10L+餐馆用", slug: "noi-ap-suat" },
          ]},
          { title: "类型", items: [
            { name: "电压力锅", slug: "noi-ap-suat" },
            { name: "机械式", slug: "noi-ap-suat" },
            { name: "12合1多功能", slug: "noi-ap-suat" },
          ]},
          { title: "内胆材质", items: [
            { name: "陶瓷不粘", slug: "noi-ap-suat" },
            { name: "不锈钢304", slug: "noi-ap-suat" },
            { name: "加厚铝合金", slug: "noi-ap-suat" },
          ]},
        ],
      },
      {
        name: "电饭煲", slug: "noi-com-dien", icon: "🍚",
        image: "/img/nm-kitchen-equipment-4.jpg?v=8",
        tagline: "机械式、电子式与IH电磁电饭煲——1.8–5L，适用于家庭与餐厅。",
        highlights: [
          { name: "机械式1.8L",   image: "/img/kitchen-equipment-sc-prod-7.jpg?v=6", slug: "noi-com-dien" },
          { name: "电子式2L",    image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "noi-com-dien" },
          { name: "IH电磁加热",    image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "noi-com-dien" },
          { name: "商用5L",image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "noi-com-dien" },
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
            { name: "5L+餐厅用", slug: "noi-com-dien" },
          ]},
          { title: "模式", items: [
            { name: "煮饭", slug: "noi-com-dien" },
            { name: "蒸", slug: "noi-com-dien" },
            { name: "煮粥 / 炖", slug: "noi-com-dien" },
          ]},
        ],
      },
      {
        name: "洗碗机", slug: "may-rua-bat", icon: "🍽️",
        image: "/img/nm-kitchen-equipment-5.jpg?v=8",
        tagline: "独立式、嵌入式与迷你洗碗机——6–14套。",
        highlights: [
          { name: "独立式14套",  image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "may-rua-bat" },
          { name: "嵌入式12套",    image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "may-rua-bat" },
          { name: "台式迷你6套",  image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "may-rua-bat" },
          { name: "半嵌入式",          image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "may-rua-bat" },
        ],
        sections: [
          { title: "安装方式", items: [
            { name: "独立式", slug: "may-rua-bat" },
            { name: "嵌入式", slug: "may-rua-bat" },
            { name: "台式迷你", slug: "may-rua-bat" },
          ]},
          { title: "容量套数", items: [
            { name: "6套迷你", slug: "may-rua-bat" },
            { name: "8–10套", slug: "may-rua-bat" },
            { name: "13–14套专业型", slug: "may-rua-bat" },
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
        image: "/img/nm-kitchen-equipment-6.jpg?v=8",
        tagline: "304不锈钢单 / 双 / 三槽——手工拉丝 / 静音。",
        highlights: [
          { name: "单槽50×40",   image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "chau-rua-inox" },
          { name: "双槽78×42",   image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "chau-rua-inox" },
          { name: "方形手工槽",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "chau-rua-inox" },
          { name: "商用三槽", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "chau-rua-inox" },
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
            { name: "半台下式", slug: "chau-rua-inox" },
          ]},
          { title: "表面", items: [
            { name: "丝光拉丝", slug: "chau-rua-inox" },
            { name: "纳米哑光黑", slug: "chau-rua-inox" },
            { name: "R10手工槽", slug: "chau-rua-inox" },
          ]},
        ],
      },
      {
        name: "五金与配件", slug: "kim-khi-bep", icon: "🔧",
        image: "/img/nm-kitchen-equipment-7.jpg?v=8",
        tagline: "柜体铰链、抽屉滑轨、拉手、不锈钢配件——按集装箱订购。",
        highlights: [
          { name: "阻尼铰链", image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "kim-khi-bep" },
          { name: "隐藏式底装滑轨",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "kim-khi-bep" },
          { name: "合金拉手",  image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "kim-khi-bep" },
          { name: "不锈钢配件",    image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "kim-khi-bep" },
        ],
        sections: [
          { title: "铰链与滑轨", items: [
            { name: "35 mm杯型铰链", slug: "kim-khi-bep" },
            { name: "三节抽屉滑轨", slug: "kim-khi-bep" },
            { name: "液压上翻支撑", slug: "kim-khi-bep" },
          ]},
          { title: "不锈钢配件", items: [
            { name: "碗碟架", slug: "kim-khi-bep" },
            { name: "调味架", slug: "kim-khi-bep" },
            { name: "柜内垃圾桶", slug: "kim-khi-bep" },
          ]},
          { title: "拉手", items: [
            { name: "方形不锈钢拉手", slug: "kim-khi-bep" },
            { name: "圆形铜拉钮", slug: "kim-khi-bep" },
            { name: "平嵌暗拉手", slug: "kim-khi-bep" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "💡", name: "照明灯具", slug: "lighting" },
    items: [
      {
        name: "LED光源", slug: "den-led", icon: "💡",
        image: "/img/nm-lighting-0.jpg?v=8",
        tagline: "各类LED光源——驱动器、模组、COB、专用SMD。",
        highlights: [
          { name: "COB芯片",      image: "/img/ceramic-2-1.jpg?v=6", slug: "den-led" },
          { name: "SMD 2835/5050", image: "/img/ceramic-2-2.jpg?v=6", slug: "den-led" },
          { name: "驱动模组",  image: "/img/ceramic-2-3.jpg?v=6", slug: "den-led" },
          { name: "LED灯丝灯泡", image: "/img/ceramic-2-4.jpg?v=6", slug: "den-led" },
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
          { title: "显色指数CRI", items: [
            { name: "Ra >80", slug: "den-led" },
            { name: "Ra >90", slug: "den-led" },
            { name: "Ra >95（艺术品展示）", slug: "den-led" },
          ]},
        ],
      },
      {
        name: "家用LED灯", slug: "den-led-gia-dung", icon: "🏠",
        image: "/img/nm-lighting-1.jpg?v=8",
        tagline: "吸顶灯、筒灯、面板灯、LED灯带——适用于客厅与生活空间。",
        highlights: [
          { name: "吸顶灯",  image: "/img/ceramic-2-2.jpg?v=6", slug: "den-led-gia-dung" },
          { name: "嵌入式筒灯", image: "/img/ceramic-2-3.jpg?v=6", slug: "den-led-gia-dung" },
          { name: "方形面板灯",  image: "/img/ceramic-2-4.jpg?v=6", slug: "den-led-gia-dung" },
          { name: "装饰LED灯带", image: "/img/ceramic-2-5.jpg?v=6", slug: "den-led-gia-dung" },
        ],
        sections: [
          { title: "按位置", items: [
            { name: "客厅", slug: "den-led-gia-dung" },
            { name: "卧室", slug: "den-led-gia-dung" },
            { name: "走廊 / 楼梯", slug: "den-led-gia-dung" },
          ]},
          { title: "按类型", items: [
            { name: "吸顶灯", slug: "den-led-gia-dung" },
            { name: "嵌入式筒灯", slug: "den-led-gia-dung" },
            { name: "超薄面板灯", slug: "den-led-gia-dung" },
          ]},
          { title: "功能", items: [
            { name: "3档色温", slug: "den-led-gia-dung" },
            { name: "亮度调节", slug: "den-led-gia-dung" },
            { name: "Wi-Fi智能", slug: "den-led-gia-dung" },
          ]},
        ],
      },
      {
        name: "商业LED灯", slug: "den-led-thuong-mai", icon: "🏢",
        image: "/img/nm-lighting-2.jpg?v=8",
        tagline: "投光灯、工业灯管、射灯——IP65/66。",
        highlights: [
          { name: "100W LED投光灯",  image: "/img/ceramic-2-3.jpg?v=6", slug: "den-led-thuong-mai" },
          { name: "T8灯管",       image: "/img/ceramic-2-4.jpg?v=6", slug: "den-led-thuong-mai" },
          { name: "轨道射灯", image: "/img/ceramic-2-5.jpg?v=6", slug: "den-led-thuong-mai" },
          { name: "UFO工矿灯", image: "/img/ceramic-2-1.jpg?v=6", slug: "den-led-thuong-mai" },
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
          { title: "IP防护等级", items: [
            { name: "IP44室内", slug: "den-led-thuong-mai" },
            { name: "IP65户外", slug: "den-led-thuong-mai" },
            { name: "IP66防尘/防水", slug: "den-led-thuong-mai" },
          ]},
        ],
      },
      {
        name: "电气材料", slug: "vat-tu-dien", icon: "⚙️",
        image: "/img/nm-lighting-3.jpg?v=8",
        tagline: "插座、开关、MCB、ATS——完善照明系统的配件。",
        highlights: [
          { name: "暗装插座",  image: "/img/ceramic-2-4.jpg?v=6", slug: "vat-tu-dien" },
          { name: "感应开关", image: "/img/ceramic-2-5.jpg?v=6", slug: "vat-tu-dien" },
          { name: "MCB / RCBO",       image: "/img/ceramic-2-1.jpg?v=6", slug: "vat-tu-dien" },
          { name: "接线盒",      image: "/img/ceramic-2-2.jpg?v=6", slug: "vat-tu-dien" },
        ],
        sections: [
          { title: "开关设备", items: [
            { name: "MCB 6/10/16A", slug: "vat-tu-dien" },
            { name: "RCBO", slug: "vat-tu-dien" },
            { name: "自动断路器", slug: "vat-tu-dien" },
          ]},
          { title: "插座与开关", items: [
            { name: "方形暗装面板", slug: "vat-tu-dien" },
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
    main: { icon: "🪟", name: "门与锁", slug: "doors-windows" },
    items: [
      {
        name: "3D人脸识别锁", slug: "khoa-3d-face", icon: "📹",
        image: "/img/nm-doors-windows-0.jpg?v=8",
        tagline: "3D人脸识别锁 + 视频通话——IP68防水。",
        highlights: [
          { name: "3D人脸 + 视频",  image: "/img/ceramic-3-1.jpg?v=6", slug: "khoa-3d-face" },
          { name: "1080p摄像头",     image: "/img/ceramic-3-2.jpg?v=6", slug: "khoa-3d-face" },
          { name: "5000 mAh充电电池", image: "/img/ceramic-3-3.jpg?v=6", slug: "khoa-3d-face" },
          { name: "Wi-Fi + 4G",        image: "/img/ceramic-3-4.jpg?v=6", slug: "khoa-3d-face" },
        ],
        sections: [
          { title: "传感器", items: [
            { name: "3D结构光识别", slug: "khoa-3d-face" },
            { name: "夜视红外", slug: "khoa-3d-face" },
            { name: "备用指纹传感器", slug: "khoa-3d-face" },
          ]},
          { title: "开锁方式", items: [
            { name: "人脸识别", slug: "khoa-3d-face" },
            { name: "指纹", slug: "khoa-3d-face" },
            { name: "PIN码 / NFC", slug: "khoa-3d-face" },
          ]},
          { title: "连接", items: [
            { name: "Wi-Fi 2.4 GHz", slug: "khoa-3d-face" },
            { name: "蓝牙5.0", slug: "khoa-3d-face" },
            { name: "4G备用模块", slug: "khoa-3d-face" },
          ]},
        ],
      },
      {
        name: "Wi-Fi智能锁", slug: "khoa-wifi", icon: "📶",
        image: "/img/nm-doors-windows-1.jpg?v=8",
        tagline: "指纹锁 + 通过Wi-Fi应用远程控制。",
        highlights: [
          { name: "Tuya Smart应用",  image: "/img/ceramic-3-2.jpg?v=6", slug: "khoa-wifi" },
          { name: "AA电池可用1年", image: "/img/ceramic-3-3.jpg?v=6", slug: "khoa-wifi" },
          { name: "一次性密码",         image: "/img/ceramic-3-4.jpg?v=6", slug: "khoa-wifi" },
          { name: "双重防撬锁舌", image: "/img/ceramic-3-5.jpg?v=6", slug: "khoa-wifi" },
        ],
        sections: [
          { title: "开锁方式", items: [
            { name: "指纹", slug: "khoa-wifi" },
            { name: "PIN码", slug: "khoa-wifi" },
            { name: "NFC卡", slug: "khoa-wifi" },
          ]},
          { title: "智能家居", items: [
            { name: "Tuya / Smart Life", slug: "khoa-wifi" },
            { name: "Google Home", slug: "khoa-wifi" },
            { name: "Alexa", slug: "khoa-wifi" },
          ]},
          { title: "锁体材质", items: [
            { name: "锌合金", slug: "khoa-wifi" },
            { name: "不锈钢304", slug: "khoa-wifi" },
            { name: "阳极氧化铝", slug: "khoa-wifi" },
          ]},
        ],
      },
      {
        name: "Wi-Fi门锁", slug: "khoa-don-cong-wifi", icon: "🚪",
        image: "/img/nm-doors-windows-2.jpg?v=8",
        tagline: "户外大门锁，指纹 + Wi-Fi——专为别墅设计。",
        highlights: [
          { name: "别墅铁艺大门",  image: "/img/ceramic-3-3.jpg?v=6", slug: "khoa-don-cong-wifi" },
          { name: "不锈钢折叠门",      image: "/img/ceramic-3-4.jpg?v=6", slug: "khoa-don-cong-wifi" },
          { name: "自动平移门", image: "/img/ceramic-3-5.jpg?v=6", slug: "khoa-don-cong-wifi" },
          { name: "Euro铝合金门",     image: "/img/ceramic-3-1.jpg?v=6", slug: "khoa-don-cong-wifi" },
        ],
        sections: [
          { title: "开锁方式", items: [
            { name: "指纹", slug: "khoa-don-cong-wifi" },
            { name: "PIN码", slug: "khoa-don-cong-wifi" },
            { name: "应用 + 远程控制", slug: "khoa-don-cong-wifi" },
          ]},
          { title: "IP防护等级", items: [
            { name: "IP65", slug: "khoa-don-cong-wifi" },
            { name: "IP67", slug: "khoa-don-cong-wifi" },
            { name: "IP68浸水", slug: "khoa-don-cong-wifi" },
          ]},
          { title: "供电", items: [
            { name: "碱性电池", slug: "khoa-don-cong-wifi" },
            { name: "锂电池充电", slug: "khoa-don-cong-wifi" },
            { name: "太阳能", slug: "khoa-don-cong-wifi" },
          ]},
        ],
      },
      {
        name: "指纹锁", slug: "khoa-van-tay", icon: "👆",
        image: "/img/nm-doors-windows-3.jpg?v=8",
        tagline: "适用于木门、铝门与钢门的电子指纹锁——经济实用。",
        highlights: [
          { name: "标准木门",  image: "/img/ceramic-3-4.jpg?v=6", slug: "khoa-van-tay" },
          { name: "Xingfa铝门",   image: "/img/ceramic-3-5.jpg?v=6", slug: "khoa-van-tay" },
          { name: "防火钢门", image: "/img/ceramic-3-1.jpg?v=6", slug: "khoa-van-tay" },
          { name: "地弹簧玻璃门",      image: "/img/ceramic-3-2.jpg?v=6", slug: "khoa-van-tay" },
        ],
        sections: [
          { title: "传感器类型", items: [
            { name: "电容式", slug: "khoa-van-tay" },
            { name: "光学式", slug: "khoa-van-tay" },
            { name: "半导体式", slug: "khoa-van-tay" },
          ]},
          { title: "开锁方式", items: [
            { name: "指纹（≤100）", slug: "khoa-van-tay" },
            { name: "PIN码", slug: "khoa-van-tay" },
            { name: "机械钥匙", slug: "khoa-van-tay" },
          ]},
          { title: "电池", items: [
            { name: "4 × AA", slug: "khoa-van-tay" },
            { name: "锂电池充电", slug: "khoa-van-tay" },
            { name: "USB-C应急充电", slug: "khoa-van-tay" },
          ]},
        ],
      },
    ],
  },
  {
    main: { icon: "⚡", name: "电气与家电", slug: "electrical" },
    items: [
      {
        name: "空调", slug: "dieu-hoa", icon: "❄️",
        image: "/img/nm-electrical-0.jpg?v=8",
        tagline: "变频壁挂式、嵌入式与立柜式空调——功率范围齐全。",
        highlights: [
          { name: "变频壁挂机", image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "dieu-hoa" },
          { name: "嵌入式天花机",    image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "dieu-hoa" },
          { name: "商用立柜机", image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "dieu-hoa" },
          { name: "多联机",         image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "dieu-hoa" },
        ],
        sections: [
          { title: "按功率", items: [
            { name: "9,000 BTU", slug: "dieu-hoa" },
            { name: "12,000 BTU", slug: "dieu-hoa" },
            { name: "18,000–24,000 BTU", slug: "dieu-hoa" },
          ]},
          { title: "按安装方式", items: [
            { name: "壁挂式", slug: "dieu-hoa" },
            { name: "嵌入式天花机", slug: "dieu-hoa" },
            { name: "立柜机", slug: "dieu-hoa" },
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
        image: "/img/nm-electrical-1.jpg?v=8",
        tagline: "对开门、法式多门与迷你吧冰箱——按FCL整柜报价。",
        highlights: [
          { name: "对开门",  image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "tu-lanh" },
          { name: "法式多门",   image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "tu-lanh" },
          { name: "上冷冻室",  image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "tu-lanh" },
          { name: "迷你吧冰箱",      image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "tu-lanh" },
        ],
        sections: [
          { title: "按容量", items: [
            { name: "< 200L", slug: "tu-lanh" },
            { name: "200–400L", slug: "tu-lanh" },
            { name: "> 500L", slug: "tu-lanh" },
          ]},
          { title: "按类型", items: [
            { name: "对开门", slug: "tu-lanh" },
            { name: "法式多门", slug: "tu-lanh" },
            { name: "多门", slug: "tu-lanh" },
          ]},
          { title: "功能", items: [
            { name: "变频节能", slug: "tu-lanh" },
            { name: "风冷无霜", slug: "tu-lanh" },
            { name: "Wi-Fi智能", slug: "tu-lanh" },
          ]},
        ],
      },
      {
        name: "洗衣机", slug: "may-giat", icon: "🧺",
        image: "/img/nm-electrical-2.jpg?v=8",
        tagline: "前开式、上开式与洗烘一体机——满足家庭与酒店各类需求。",
        highlights: [
          { name: "变频前开式",  image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "may-giat" },
          { name: "上开式",            image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "may-giat" },
          { name: "洗烘一体",      image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "may-giat" },
          { name: "酒店商用", image: "/img/kitchen-equipment-sc-prod-5.jpg?v=6", slug: "may-giat" },
        ],
        sections: [
          { title: "按容量", items: [
            { name: "7–9 kg", slug: "may-giat" },
            { name: "10–12 kg", slug: "may-giat" },
            { name: "商用 >15 kg", slug: "may-giat" },
          ]},
          { title: "类型", items: [
            { name: "前开式", slug: "may-giat" },
            { name: "上开式", slug: "may-giat" },
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
        image: "/img/nm-electrical-3.jpg?v=8",
        tagline: "油汀、卤素与暖风机——功率1500–2500 W。",
        highlights: [
          { name: "9片油汀",  image: "/img/kitchen-equipment-sc-prod-0.jpg?v=6", slug: "may-suoi" },
          { name: "卤素塔式取暖器",      image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "may-suoi" },
          { name: "迷你暖风机",    image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "may-suoi" },
          { name: "碳纤维红外取暖器", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "may-suoi" },
        ],
        sections: [
          { title: "类型", items: [
            { name: "油汀取暖器", slug: "may-suoi" },
            { name: "卤素塔式取暖器", slug: "may-suoi" },
            { name: "暖风机", slug: "may-suoi" },
          ]},
          { title: "功率", items: [
            { name: "1500 W", slug: "may-suoi" },
            { name: "2000 W", slug: "may-suoi" },
            { name: "2500 W", slug: "may-suoi" },
          ]},
          { title: "功能", items: [
            { name: "定时关机", slug: "may-suoi" },
            { name: "遥控", slug: "may-suoi" },
            { name: "过热保护", slug: "may-suoi" },
          ]},
        ],
      },
      {
        name: "热水器", slug: "binh-nong-lanh", icon: "🚿",
        image: "/img/nm-electrical-4.jpg?v=8",
        tagline: "即热式、储水式与太阳能热水器。",
        highlights: [
          { name: "即热式3500W",     image: "/img/kitchen-equipment-sc-prod-1.jpg?v=6", slug: "binh-nong-lanh" },
          { name: "储水式30L",       image: "/img/kitchen-equipment-sc-prod-2.jpg?v=6", slug: "binh-nong-lanh" },
          { name: "太阳能", image: "/img/kitchen-equipment-sc-prod-3.jpg?v=6", slug: "binh-nong-lanh" },
          { name: "热泵",           image: "/img/kitchen-equipment-sc-prod-4.jpg?v=6", slug: "binh-nong-lanh" },
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
            { name: "50L+酒店用", slug: "binh-nong-lanh" },
          ]},
          { title: "内胆材质", items: [
            { name: "搪瓷内胆", slug: "binh-nong-lanh" },
            { name: "不锈钢内胆", slug: "binh-nong-lanh" },
            { name: "紫铜内胆", slug: "binh-nong-lanh" },
          ]},
        ],
      },
      {
        name: "电线与电缆", slug: "day-dien-cap", icon: "🔌",
        image: "/img/nm-electrical-5.jpg?v=8",
        tagline: "单芯线、多芯线、控制电缆——纯铜，符合EN标准。",
        highlights: [
          { name: "单芯1.5–4 mm²",  image: "/img/ceramic-4-1.jpg?v=6", slug: "day-dien-cap" },
          { name: "多芯软线2.5–10",   image: "/img/ceramic-4-2.jpg?v=6", slug: "day-dien-cap" },
          { name: "动力电缆25–95 mm²",   image: "/img/ceramic-4-3.jpg?v=6", slug: "day-dien-cap" },
          { name: "CY控制电缆",    image: "/img/ceramic-4-4.jpg?v=6", slug: "day-dien-cap" },
        ],
        sections: [
          { title: "按截面积", items: [
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
        name: "穿线管", slug: "ong-dan-dien", icon: "📏",
        image: "/img/nm-electrical-6.jpg?v=8",
        tagline: "PVC、PE与金属穿线管——阻燃 + 耐压。",
        highlights: [
          { name: "白色PVC管",   image: "/img/ceramic-4-2.jpg?v=6", slug: "ong-dan-dien" },
          { name: "PE软管",  image: "/img/ceramic-4-3.jpg?v=6", slug: "ong-dan-dien" },
          { name: "GI钢管",     image: "/img/ceramic-4-4.jpg?v=6", slug: "ong-dan-dien" },
          { name: "铝合金软管",    image: "/img/ceramic-4-5.jpg?v=6", slug: "ong-dan-dien" },
        ],
        sections: [
          { title: "材质", items: [
            { name: "硬质PVC", slug: "ong-dan-dien" },
            { name: "PE软管", slug: "ong-dan-dien" },
            { name: "镀锌GI钢管", slug: "ong-dan-dien" },
          ]},
          { title: "直径", items: [
            { name: "Ø16 mm", slug: "ong-dan-dien" },
            { name: "Ø20 mm", slug: "ong-dan-dien" },
            { name: "Ø25–32 mm", slug: "ong-dan-dien" },
          ]},
          { title: "配件", items: [
            { name: "T/L型接头", slug: "ong-dan-dien" },
            { name: "暗装底盒", slug: "ong-dan-dien" },
            { name: "吊顶卡夹", slug: "ong-dan-dien" },
          ]},
        ],
      },
      {
        name: "电缆桥架", slug: "mang-day-dien", icon: "🛤️",
        image: "/img/nm-electrical-7.jpg?v=8",
        tagline: "钢制、不锈钢与铝合金桥架——用于厂房走廊与办公室布线。",
        highlights: [
          { name: "环氧喷涂钢桥架", image: "/img/ceramic-4-3.jpg?v=6", slug: "mang-day-dien" },
          { name: "不锈钢304桥架",       image: "/img/ceramic-4-4.jpg?v=6", slug: "mang-day-dien" },
          { name: "镀锌梯式桥架",  image: "/img/ceramic-4-5.jpg?v=6", slug: "mang-day-dien" },
          { name: "弯曲塑料线槽",       image: "/img/ceramic-4-1.jpg?v=6", slug: "mang-day-dien" },
        ],
        sections: [
          { title: "材质", items: [
            { name: "环氧喷涂钢", slug: "mang-day-dien" },
            { name: "不锈钢304", slug: "mang-day-dien" },
            { name: "热浸镀锌", slug: "mang-day-dien" },
          ]},
          { title: "类型", items: [
            { name: "槽式桥架", slug: "mang-day-dien" },
            { name: "托盘式桥架", slug: "mang-day-dien" },
            { name: "工业梯式桥架", slug: "mang-day-dien" },
          ]},
          { title: "配件", items: [
            { name: "T/Y型接头", slug: "mang-day-dien" },
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
  { value: "20+", label: "已认证工厂" },
  { value: "<24h", label: "报价时间" },
  { value: "300+", label: "越南经销商" },
  { value: "12年", label: "行业经验" },
];

// ── Homepage product sections — computed from real PARTNERS (single source of truth).
//    Auto-updates for future partners too; each card links to the real product detail page. ──
function homeYears(founded?: string): string {
  const m = founded?.match(/(\d{4})/);
  if (!m) return "正品";
  const d = 2026 - parseInt(m[1], 10);
  return d > 0 ? `${d}年` : "正品";
}
function partnerCard(p: PartnerBrand, prod: PartnerProduct): Product {
  const ps = productSlug(prod);
  return {
    id: `${p.slug}-${ps}`,
    href: `/info/partners/${p.slug}/${ps}`,
    title: prod.name,
    price: "询价",
    unit: "",
    moq: prod.series ?? "现货",
    rating: 5,
    seller: p.name,
    years: homeYears(p.founded),
    image: prod.image,
    tags: [p.name],
  };
}
const HOME_CATS: { slug: string; title: string }[] = [
  { slug: "electrical", title: "电气与家电" },
  { slug: "kitchen-equipment", title: "厨房设备" },
  { slug: "bathroom-sanitary", title: "卫浴设备" },
  { slug: "lighting", title: "照明灯具" },
  { slug: "construction-materials", title: "建筑材料" },
  { slug: "noi-that", title: "家具与装饰" },
  { slug: "home-garden", title: "家居与园艺" },
  { slug: "doors-windows", title: "门、窗与智能锁" },
];
function buildHomeSections(): Section[] {
  const out: Section[] = [];
  for (const cat of HOME_CATS) {
    const brands = PARTNERS.filter((p) => p.category === cat.slug && p.products.length > 0);
    if (brands.length === 0) continue;
    const lists = brands.map((b) =>
      b.products.filter((pr) => pr.image).slice(0, 12).map((pr) => partnerCard(b, pr))
    );
    const cards: Product[] = [];
    for (let i = 0; cards.length < 96 && lists.some((l) => l[i]); i++)
      for (const l of lists) if (l[i]) cards.push(l[i]);
    const featured = brands[0];
    const featuredImg = `/img/feat-${cat.slug}.jpg?v=2`;
    out.push({
      id: cat.slug,
      num: out.length + 1,
      title: cat.title,
      cn: cat.title,
      tabs: ["全部", ...brands.slice(0, 7).map((b) => b.name)],
      totalCount: String(brands.reduce((s, b) => s + b.products.length, 0)),
      categorySlug: cat.slug,
      featureSlug: featured.slug,
      feature: {
        badge: "合作伙伴",
        title: featured.name,
        desc: featured.name,
        cta: "查看产品 →",
        image: featuredImg,
        href: `/info/partners/${featured.slug}`,
      },
      products: cards,
    });
  }
  return out;
}
export const SECTIONS: Section[] = buildHomeSections();

export const FACTORIES: Factory[] = [
  // Building materials (tiles, stone, flooring)
  { initials: "DP", slug: "dongpeng-ceramics", name: "Guangdong Dongpeng Ceramics Co., Ltd.", location: "广东佛山 · CN", rating: 4.9, reviews: "2,340", meta: "5000万 m²/年", badges: { gold: true, audited: true, years: "12年" }, tags: ["瓷砖", "大理石", "墙地砖"] },
  { initials: "MN", slug: "monalisa-group", name: "Monalisa Group Co., Ltd.", location: "广东佛山 · CN", rating: 4.9, reviews: "1,540", meta: "2500万 m²/年", badges: { gold: true, audited: true, years: "10年" }, tags: ["陶瓷", "大规格板", "石板"] },
  { initials: "NP", slug: "newpearl-ceramics", name: "NewPearl Ceramics Group", location: "佛山 · CN", rating: 4.7, reviews: "680", meta: "2亿 m²/年", badges: { audited: true, years: "11年" }, tags: ["墙砖", "地砖", "瓷砖"] },
  // Furniture
  { initials: "KK", slug: "kuka-home", name: "Hangzhou KUKA Home Co., Ltd.", location: "浙江杭州 · CN", rating: 4.8, reviews: "1,810", meta: "6K+门店", badges: { gold: true, audited: true, years: "9年" }, tags: ["沙发", "休闲椅", "酒店家具"] },
  { initials: "OP", slug: "oppein-home", name: "OPPEIN Home Group Inc.", location: "广州 · CN", rating: 5.0, reviews: "3,120", meta: "亚洲第一——橱柜", badges: { gold: true, audited: true, years: "15年" }, tags: ["橱柜", "衣柜", "全屋定制"], vr360ComId: "eKtTcaCAvhrm" },
  { initials: "LB", slug: "landbond-furniture", name: "Landbond Furniture Group", location: "佛山 & 临沂 · CN", rating: 5.0, reviews: "1,230", meta: "40年实木经验", badges: { gold: true, audited: true, years: "14年" }, tags: ["天然实木", "卧室", "客厅"] },
  { initials: "ZY", slug: "zuoyou-furniture", name: "ZuoYou Furniture Co., Ltd.", location: "深圳 · CN", rating: 4.8, reviews: "540", meta: "注重设计", badges: { audited: true, years: "8年" }, tags: ["软包", "沙发", "现代"] },
  { initials: "RA", slug: "redapple-furniture", name: "RedApple Furniture (HK)", location: "香港 · CN", rating: 4.9, reviews: "1,050", meta: "始于1981年", badges: { audited: true, years: "18年" }, tags: ["定制", "床垫", "酒店"] },
];

export const ZONES: Zone[] = [
  { slug: "foshan-ceramic", name: "佛山 — 陶瓷", count: "1,200家工厂", image: "/img/zk-ceramic.jpg?v=1" },
  { slug: "foshan-furniture", name: "佛山 — 家具", count: "3,000+家工厂", image: "/img/zk-furniture.jpg?v=1" },
  { slug: "jinjiang-wood", name: "晋江 — 木材", count: "340家工厂", image: "/img/zk-wood.jpg?v=1" },
  { slug: "guangzhou-appliance", name: "广州 — 家电", count: "2,000+家工厂", image: "/img/zk-appliance.jpg?v=1" },
  { slug: "guzhen-lighting", name: "古镇 — 照明灯具", count: "8,000+家企业", image: "/img/zk-lighting.jpg?v=1" },
  { slug: "chaozhou-sanitary", name: "潮州 — 卫浴设备", count: "1,500+家工厂", image: "/img/zk-sanitary.jpg?v=1" },
];
