import { KITO_PRODUCTS } from "@/data/catalogs/kito";
import { MIDEA_PRODUCTS } from "@/data/catalogs/midea";
import { TOSHIBA_PRODUCTS } from "@/data/catalogs/toshiba";
import { LESSO_PRODUCTS } from "@/data/catalogs/lesso";
import { TEKA_PRODUCTS } from "@/data/catalogs/teka";
import { DUC_THINH_STONE_PRODUCTS } from "@/data/catalogs/duc-thinh-stone";
import { YUHONG_PRODUCTS } from "@/data/catalogs/yuhong";
import { ANBI_PRODUCTS } from "@/data/catalogs/anbi";
import { GUANGRI_PRODUCTS } from "@/data/catalogs/guangri";
import { TOSHIBA_ELEVATOR_PRODUCTS } from "@/data/catalogs/toshiba-elevator";
import { TEEHO_PRODUCTS } from "@/data/catalogs/teeho";
import { TREES_PRODUCTS } from "@/data/catalogs/3trees";
import { DULUX_PRO_PRODUCTS } from "@/data/catalogs/dulux-pro";
import { DAWEIER_PRODUCTS } from "@/data/catalogs/daweier";
import { PENGXIANG_PRODUCTS } from "@/data/catalogs/pengxiang";
import { TTLOCK_PRODUCTS } from "@/data/catalogs/ttlock";
import { LINVOL_PRODUCTS } from "@/data/catalogs/linvol";
import { SYLVANIA_PRODUCTS } from "@/data/catalogs/sylvania";
import { BRAVAT_PRODUCTS } from "@/data/catalogs/bravat";
import { FSL_PRODUCTS } from "@/data/catalogs/fsl";
import { DONGYUAN_PRODUCTS } from "@/data/catalogs/dongyuan";
import { CARE_LIGHTING_PRODUCTS } from "@/data/catalogs/care-lighting";
import { LANGHUI_PRODUCTS } from "@/data/catalogs/langhui";
import { ZHONGJU_YABAI_PRODUCTS } from "@/data/catalogs/zhongju-yabai";
import { LUMINA_PRODUCTS } from "@/data/catalogs/lumina";

/**
 * 华越供应链合作工厂 —— 24 个正式合作品牌，均已通过广州采购部门
 * 审核并提供产品目录，服务于越南市场分销。
 *
 * 每个合作伙伴均映射到 NAV_MENU 中的某一个主分类（slug）。
 * 原始中文 / 英文内容已编译并改写为简体中文，
 * 以契合 B2B 客户，未原样照搬品牌的市场宣传文案。
 */

export type PartnerProduct = {
  /** 工厂官方 SKU / 型号代码。 */
  model: string;
  /** URL slug —— 路径 /info/partners/{partner}/{productSlug}。
   *  未设置时默认 = model.toLowerCase()。 */
  slug?: string;
  /** 产品名称。 */
  name: string;
  /** 中文原名（如有）。 */
  nameOriginal?: string;
  /** 系列 / 产品线名称。 */
  series?: string;
  /** 中文原始系列名。 */
  seriesOriginal?: string;
  /** 简短描述 1-2 句（主要特性 / 功能）。 */
  desc?: string;
  /** 详情页长描述。 */
  longDesc?: string;
  /** 产品图片 —— 品牌 CDN 直链或本地 /img/。 */
  image?: string;
  /** 详情页附加图片（图库）。 */
  gallery?: string[];
  /** 尺寸（如 "1200×600 mm"）。 */
  dimensions?: string;
  /** 表面 / 饰面。 */
  surface?: string;
  /** 突出特性。 */
  features?: string[];
  /** 应用 / 适用空间。 */
  applications?: string[];
  /** 真实技术参数表（从品牌产品页抓取）。
   *  k = 标签（如 "容量"），v = 数值（如 "8.5 kg"）。 */
  specs?: { k: string; v: string }[];
  /** 品牌官网原始产品页链接（用于溯源）。 */
  sourceUrl?: string;
};

export type PartnerFactory = {
  /** 工厂地址（城市、省份、国家）。 */
  location: string;
  /** 工厂面积。 */
  area?: string;
  /** 员工 / 工人数量。 */
  employees?: string;
  /** 年产能。 */
  capacity?: string;
  /** 基地数量（生产 / 研发 / 物流）。 */
  facilities?: string;
  /** 工厂总投资额。 */
  investment?: string;
};

export type PartnerBrand = {
  /** URL slug —— 路径 /info/partners/{slug}。 */
  slug: string;
  /** 品牌名称（如有中文名）或保留拉丁原名。 */
  name: string;
  /** 中文原名 + 拉丁名，便于客户识别。 */
  nameOriginal: string;
  /** NAV_MENU 中主分类的 slug。 */
  category:
    | "home-garden"
    | "construction-materials"
    | "bathroom-sanitary"
    | "noi-that"
    | "kitchen-equipment"
    | "lighting"
    | "doors-windows"
    | "electrical";
  /** 原始 CSV 序号（用于溯源）。 */
  cvsStt: number;
  /** Logo URL（如有）。 */
  logo?: string;
  /** 若 logo 为白色透明底设计（仅在深色背景显示），
   *  设置 `logoBg: "dark"` 使所有 logo 容器改用深色背景而非白色。 */
  logoBg?: "dark";
  /** Banner / hero image. */
  banner?: string;

  /** 公司简介 —— 2-3 句段落。 */
  introduction: string;
  /** 成立年份。 */
  founded?: string;
  /** 若为上市公司 —— 股票代码。 */
  listed?: string;

  factory: PartnerFactory;

  /** 亮点（认证、奖项、专有技术、大型项目）。 */
  highlights: string[];

  /** Hotline + website. */
  hotline?: string;
  website: string;

  /** 全部主要产品。 */
  products: PartnerProduct[];
};

export const PARTNERS: PartnerBrand[] = [
  // ─── ⚡ 电气与电器 ─────────────────────────────────────────
  {
    slug: "midea",
    name: "Midea",
    nameOriginal: "美的 Midea",
    category: "electrical",
    cvsStt: 1,
    logo: "https://cn-res.midea.com/content/dam/mideacn-aem/test/logo-1x.png",
    banner:
      "https://cn-res.midea.com/content/dam/mideacn-aem/%E7%BE%8E%E7%9A%84%E4%B8%9A%E5%8A%A1/%E6%99%BA%E8%83%BD%E5%AE%B6%E5%B1%85/%E7%BE%8E%E7%9A%84/%E7%BE%8E%E7%9A%841.png",
    introduction:
      "美的是中国领先的多品牌家电集团，拥有覆盖中端到高端的战略品牌矩阵。美的的空调、冰箱、洗衣机以及厨房电器与小家电产品在中国市场占有领先份额，并出口至200多个国家。",
    founded: "1968",
    listed: "SZSE 000333",
    factory: {
      location: "总部：中国广东省佛山市",
      facilities: "全球30+工厂 + 35+研发中心",
      employees: "180,000+名员工（集团整体）",
    },
    highlights: [
      "《财富》世界500强（自2016年起持续上榜）",
      "拥有7大战略子品牌：Midea、Little Swan、COLMO（高端AI）、Toshiba（日系高端）、Cuckoo、Hualing（年轻+高性价比）、Comfee（出口）",
      "分销网络覆盖200+个国家",
      "深圳证券交易所上市，代码000333",
    ],
    website: "https://www.midea.com.cn/zh/our-businesses/Smart-Home-Business-Unit/midea",
    products: MIDEA_PRODUCTS,
  },
  {
    slug: "toshiba-home",
    name: "Toshiba Home Appliances",
    nameOriginal: "东芝家电 Toshiba",
    category: "electrical",
    cvsStt: 3,
    logo: "/img/logos/toshiba-elevator.png",
    introduction:
      "东芝家电是源自日本、拥有逾百年历史的高端家电品牌。其中国家电业务由美的集团运营，专注高端市场，融合日本技术、精湛工艺与卓越的保鲜性能。",
    founded: "1875 (Toshiba Corp)",
    factory: {
      location: "由美的集团在中国广东佛山运营",
      facilities: "共用美的集团的生产基地",
    },
    highlights: [
      "拥有逾150年传承的日本品牌（东芝株式会社始于1875年）",
      "家电业务自2016年起由美的集团运营——研发保留于东京",
      "产品线齐全：空调、冰箱、洗衣机、烘干机、灶具、净水器、风扇、吸尘器",
      "在越南由Toshiba Lifestyle正品分销（toshiba-lifestyle.com/vn）",
    ],
    website: "https://www.toshiba-lifestyle.com/vn/",
    products: TOSHIBA_PRODUCTS,
  },
  {
    slug: "lesso",
    name: "Lesso",
    nameOriginal: "联塑 Lesso",
    category: "electrical",
    cvsStt: 29,
    logo: "https://www.lesso.com/uploads/20260210/1469496bff5ab6eba035b3c4ef12df07.png",
    introduction:
      "联塑是中国大型建材、家居及供应链集团，业务涵盖塑料管道、电线电缆、建筑材料、环保、新能源等多个领域，产品服务于民用、工业、农业及市政基础设施市场。",
    factory: {
      location: "总部：中国广东省佛山市顺德区龙江",
      facilities: "在中国及东南亚拥有30余家大型工厂",
    },
    highlights: [
      "全国7×24小时热线：400-168-2128",
      "布局7个国际市场：英语区、阿联酋、美国、印度尼西亚、印度、马来西亚、柬埔寨",
      "6大产品体系：市政工程、民用、农业、工商业、消防、燃气",
      "从工厂直接整柜发运至越南",
    ],
    hotline: "400-168-2128",
    website: "https://www.lessopipe.com/",
    products: LESSO_PRODUCTS,
  },

  // ─── 🍳 厨房设备 ─────────────────────────────────────────────
  {
    slug: "teka",
    name: "Teka",
    nameOriginal: "Teka",
    category: "kitchen-equipment",
    cvsStt: 4,
    logo: "https://www.teka.com/zh-cn/wp-content/themes/teka/img/teka-new-logo.svg",
    introduction:
      "Teka是拥有逾百年历史的西班牙厨卫设备集团，旗下拥有3大品牌：Teka（1924年，源自德国）、Küppersbusch（1875年，德国高端，屡获Red Dot与IF Design奖）、Intra（1871年，瑞典不锈钢水槽）。现隶属母公司German Heritage B。",
    founded: "1924 (Teka)",
    factory: {
      location: "总部：德国（Teka）、西班牙（主要运营）",
      facilities: "全球15家工厂",
      employees: "5,000名员工",
      capacity: "服务全球120余个国家、1亿户家庭",
    },
    highlights: [
      "约50%的西班牙家庭使用Teka产品",
      "拥有3大品牌矩阵：Teka（1924）、Küppersbusch（1875）、Intra（1871）",
      "Küppersbusch屡获Red Dot、IF Design、ADEX Platinum Excellence奖项",
      "Küppersbusch是德国设计委员会创始成员（2016）",
    ],
    website: "https://www.teka.com/zh-cn/guanyuwomen/teka-pinpai/",
    products: TEKA_PRODUCTS,
  },

  // ─── 🏠 家居与园艺（电梯属于住宅基础设施） ──────────────────
  {
    slug: "toshiba-elevator",
    name: "Toshiba Elevator",
    nameOriginal: "东芝电梯 Toshiba Elevator (China)",
    category: "home-garden",
    cvsStt: 12,
    logo: "/img/logos/toshiba-elevator.png",
    introduction:
      "东芝电梯（中国）是日本东芝集团在华分支机构，专注提供融合日本先进技术的高端电梯解决方案。2024年，东芝电梯位列全球电梯厂商前7强，以磁悬浮导向技术、双层轿厢电梯及高速电梯纪录而著称。",
    factory: {
      location: "总部：中国上海",
      facilities: "生产工厂位于沈阳及苏州",
    },
    highlights: [
      "全国技术热线：400-700-5680",
      "全球电梯前7强（2024）",
      "12项核心技术：超高速、FLOORNAVI目的层群控、AI群梯管理、BIM设计、磁悬浮导靴等",
      "近期参考项目：内蒙古CT医学医院、山西六安华都五期（67台）",
    ],
    hotline: "400-700-5680",
    website: "https://www.toshiba-elevator.com.cn/",
    products: TOSHIBA_ELEVATOR_PRODUCTS,
  },
  {
    slug: "guangri",
    name: "Guangri Elevator",
    nameOriginal: "广日电梯 Guangri",
    category: "home-garden",
    cvsStt: 13,
    logo: "https://www.guangri.com.cn/cn/images/logo.png",
    introduction:
      "广日电梯是上市企业，为广州工业投资控股集团（《财富》世界500强）的重要子公司。创立于1956年，自1973年起生产载货电梯，广日积累了逾50年经验，发展成为集研发、生产、安装、维保于一体的现代化企业。",
    founded: "1956",
    factory: {
      location: "广州市番禺区石楼镇国贸南大道636号",
      facilities: "主要生产在广州，全国设有辅助基地",
    },
    highlights: [
      "技术热线：400-8866-130",
      "邮箱：grdt@guangri.com.cn",
      "母公司位列《财富》世界500强",
      "逾50年电梯制造经验",
      "提供全方位解决方案：研发、设计、生产、安装、维保、培训",
    ],
    hotline: "400-8866-130",
    website: "https://guangri.com.cn/",
    products: GUANGRI_PRODUCTS,
  },

  // ─── 🪟 门窗（智能锁） ──────────────────────────────
  {
    slug: "teeho",
    name: "TEEHO",
    nameOriginal: "TEEHO",
    category: "doors-windows",
    cvsStt: 18,
    logo: "https://www.teeho.com/cdn/shop/files/20220414170928_dab500c7-794d-410b-80a0-54b76e9eb97b.png?v=1678261396&width=240",
    introduction:
      "TEEHO是美国亚马逊智能锁热销品牌，专注设计与生产指纹锁、密码锁及Wi-Fi锁。产品融合现代技术与友好的用户体验，服务北美家庭、酒店及Airbnb短租市场。",
    factory: {
      location: "生产工厂位于中国广东",
    },
    highlights: [
      "美国亚马逊智能锁品类热销冠军",
      "全部产品达IP54（防尘及防水溅）或IP55",
      "4×AA电池续航1年，无需频繁充电",
      "工作温度：-30°C至70°C（适应越南气候）",
      "30天退换政策及7×24小时客户支持",
    ],
    website: "https://www.teeho.com/",
    products: TEEHO_PRODUCTS,
  },

  // ─── 🚿 卫浴洁具 ─────────────────────────────────────────
  {
    slug: "anbi",
    name: "ANBI",
    nameOriginal: "安彼卫浴 ANBI",
    category: "bathroom-sanitary",
    cvsStt: 24,
    introduction:
      "安彼是位于广东潮州的卫生陶瓷品牌——潮州是中国最大的卫生陶瓷生产基地之一。品牌专注于智能马桶及一体化卫浴空间设计，致力于成为面向全国市场的家居品牌。",
    founded: "2021",
    factory: {
      location: "中国广东省潮州市潮安区古巷镇",
    },
    highlights: [
      "热线：400-8308-789",
      "品牌口号：安彼智能，安心享用",
      "荣获2024潮州卫浴十大品牌",
      "2024消费者喜爱品牌",
      "入选中国政府节能采购目录",
    ],
    hotline: "400-8308-789",
    website: "https://www.anbichina.com/",
    products: ANBI_PRODUCTS,
  },

  // ─── 🧱 建筑材料 ──────────────────────────────────────────
  {
    slug: "dulux-pro",
    name: "Dulux Professional",
    nameOriginal: "Dulux Pro / AkzoNobel",
    category: "construction-materials",
    cvsStt: 34,
    logo: "https://www.duluxpro.com.cn/wp-content/uploads/2024/05/logo-1.png",
    introduction:
      "Dulux Professional是AkzoNobel集团（荷兰，创立于1792年，逾230年历史）旗下的专业涂料产品线。集团拥有Dulux、International、Sikkens、Interpon等全球知名涂料品牌，业务遍及150多个国家，员工34,000人。",
    founded: "1792 (AkzoNobel)",
    factory: {
      location: "AkzoNobel总部：荷兰阿姆斯特丹",
      facilities: "在150余个国家生产",
      employees: "全球约34,000人",
    },
    highlights: [
      "全球历史最悠久的涂料集团——逾230年",
      "拥有多品牌矩阵：Dulux、International、Sikkens、Interpon",
      "定位「专业解决方案伙伴」——为B2B提供方案、技术及配色一站式服务",
      "中国重点客户：万科、龙湖、华润、碧桂园、招商蛇口、越秀地产",
    ],
    website: "https://www.duluxpro.com.cn/",
    products: DULUX_PRO_PRODUCTS,
  },
  {
    slug: "yuhong",
    name: "Yuhong",
    nameOriginal: "东方雨虹 Oriental Yuhong",
    category: "construction-materials",
    cvsStt: 36,
    logo: "https://www.yuhong.com.cn/thems/dfyhjt/images/f_logo_03.png",
    introduction:
      "东方雨虹是中国领先的防水、保温及民用建筑涂料集团，在深圳证券交易所上市，代码002271。2023年营收约328亿元人民币，拥有1,916项专利及68个生产、研发、物流基地（其中3个位于中国境外）。",
    founded: "1995",
    listed: "SZSE 002271",
    factory: {
      location: "总部：中国北京",
      facilities: "68个基地（生产、研发、物流，含3个海外基地）",
      capacity: "防水卷材 15 亿㎡/年 · 防水涂料 500 万吨/年 · 砂浆 2000+ 万吨/年 · 保温 1000+ 万立方米/年",
    },
    highlights: [
      "深交所上市 —— 代码 002271",
      "2023 年营收：约 328 亿元人民币，净利润约 22.7 亿元人民币",
      "1,916 项专利（集团整体）",
      "建有先进防水材料国家重点实验室",
      "为鸟巢、水立方（2008 北京奥运）、中央歌剧院等项目提供防水",
      "按产品线分设热线：工程 400-779-1975 / 民建 400-700-5756 / 维修 400-995-8686 / 砂浆 400-685-0885",
    ],
    website: "https://www.yuhong.com.cn/",
    products: YUHONG_PRODUCTS,
  },
  {
    slug: "langhui",
    name: "Langhui",
    nameOriginal: "朗辉建材 Langhui",
    category: "construction-materials",
    cvsStt: 42,
    logo: "https://gdlanghui.com/template/default/images/logo.png",
    introduction:
      "朗辉（广东朗辉建材）是位于中国广东的蒸压加气混凝土 ALC/AAC 板材专业制造商。生产园区占地 246 亩（约 166 公顷），投资约 42 亿元人民币，拥有 120 多套高度自动化设备，年产能超 100 万立方米。",
    factory: {
      location: "广东佛山高明工业园，明八路 133-8 号",
      area: "246 亩（约 166 公顷）",
      capacity: "100 万+ 立方米/年",
      facilities: "120+ 套自动化设备",
      investment: "约 42 亿元人民币",
    },
    highlights: [
      "销售热线：133-1632-2103 / 邮箱：salesem@gdlanghui.com",
      "防火墙产品耐火 &gt; 4 小时",
      "50/75mm 超薄板出口澳大利亚、日本、韩国",
      "参考项目：龙湖地产、雅居乐熙悦府",
    ],
    hotline: "133-1632-2103",
    website: "https://gdlanghui.com/",
    products: LANGHUI_PRODUCTS,
  },
  {
    slug: "duc-thinh-stone",
    name: "德盛石材",
    nameOriginal: "德盛 Duc Thinh Stone Technology Co., Ltd.",
    category: "construction-materials",
    cvsStt: 44,
    logo:
      "https://ducthinhstone.com/wp-content/uploads/2025/06/z7153273983391_4d3bb7ae8fc09b583a866595e847744c.jpg",
    introduction:
      "德盛石材科技是隶属鹏翔集团（中国福建）的越南法人公司 —— 鹏翔是亚洲领先的高端人造石制造商之一。工厂位于越南乂安省义坛工业园，投资 2,500 万美元，员工约 800-1,000 人，年产板材 850 万㎡。产品服务越南本土市场并出口至 120+ 个国家。",
    factory: {
      location: "越南乂安省义坛工业园义寿乡",
      area: "400,000 ㎡（约 40 公顷）",
      employees: "约 800–1,000 人",
      capacity: "板材 850 万㎡/年",
      investment: "2,500 万美元",
    },
    highlights: [
      "越南法人公司 —— 在越南本土生产，物流便利",
      "热线：(+84) 238-863-9666 / 邮箱：office@ducthinhstone.com",
      "母公司鹏翔集团（中国福建）—— 亚洲顶级人造石制造商",
      "出口逾 120 个国家",
      "应用：厨房台面、浴室柜、墙面装饰、楼梯、高端家装、商场、酒店",
    ],
    hotline: "(+84) 238-863-9666",
    website: "https://ducthinhstone.com/",
    products: DUC_THINH_STONE_PRODUCTS,
  },
  {
    slug: "lumina",
    name: "光年地板",
    nameOriginal: "光年地板 Lumina Floor",
    category: "construction-materials",
    cvsStt: 45,
    introduction:
      "光年地板（Lumina Floor）是华越供应链旗下自营工厂倾力打造的新锐青年地材品牌，秉持「让高级感触手可及」的信条，专注环保石塑 SPC 与高弹性 LVT 两大核心品类。品牌深度洞察年轻一代对时尚设计与实用性能的双重渴望——既要颜值在线、拍照出片，又要防水耐磨、省心耐用。依托华越从基材配方、装饰膜印刷到锁扣开模的全链条自控能力，光年把「商用级耐用」与「潮流级美学」熔于一炉，提供超过 800 种木纹、石纹与潮流花色，风格涵盖从侘寂原木到现代极简。无论是小户型整屋翻新、咖啡店与买手店的氛围营造，还是办公展厅的快速焕新，光年地板都以高颜值、好品质与友好价格，为现代家居与商业空间铺就一片年轻、安静而坚实的地面。",
    factory: {
      location: "中国 · 华越供应链自营工厂（SPC / LVT 地材基地）",
      capacity: "SPC 4–8mm / LVT 2–5mm，800+ 花色常备",
      facilities: "全链条自控：基材配料 · 装饰膜印刷 · 锁扣开模 · 成品质检",
    },
    highlights: [
      "华越供应链自营工厂 —— 源头直供、价格友好、交期稳定",
      "双核心品类：环保石塑 SPC（刚硬防水）+ 高弹性 LVT（静音舒适）",
      "800+ 装饰花色：木纹 / 石纹 / 人字拼 / 编织纹，潮流风格一站配齐",
      "多档厚度（SPC 4–8mm · LVT 2–5mm）、背衬（EVA / IXPE）与耐磨层（0.2–0.5mm）自由搭配",
      "锁扣免胶 / 自粘撕贴 / 干式满胶三种装法，旧房直铺、当日焕新",
      "天生防水、刚硬耐磨、E0 / E1 环保基材，绿色家装放心选",
      "支持 OEM / ODM 花色与规格定制，工程与经销双渠道适配",
      "应用广泛：住宅公寓、办公展厅、咖啡馆与买手店、零售与轻商业空间",
    ],
    website: "https://huayuesc.vn/",
    products: LUMINA_PRODUCTS,
  },

  // ─── 💡 灯具照明（新增 —— Phase 5+ 批次） ──────────────────
  {
    slug: "fsl",
    name: "FSL",
    nameOriginal: "佛山照明 Foshan Lighting (FSL)",
    category: "lighting",
    cvsStt: 16,
    logo: "/img/logos/fsl.png",
    introduction:
      "佛山照明（FSL）是中国历史最悠久的照明企业之一，始创于 1958 年。公司目前拥有完整的 LED 产业链 —— 从上游芯片 → 中游 LED 封装 → 下游 LED 灯具应用。FSL 持续拓展智能照明、健康、船舶、航空、体育、农业及养殖等新领域。",
    founded: "1958",
    factory: {
      location: "总部：中国广东省佛山市",
      facilities: "完整 LED 产业链：芯片 + 封装 + 应用",
    },
    highlights: [
      "中国首家上市照明企业 —— 获评中华老字号",
      "内部完整 LED 产业链（芯片 → 封装 → 应用）",
      "3 大核心业务：通用照明、电气工程、车灯",
      "拓展至智能照明、医疗、船舶、航空、体育领域",
    ],
    website: "https://www.chinafsl.com/",
    products: FSL_PRODUCTS,
  },
  {
    slug: "care-lighting",
    name: "CareLighting",
    nameOriginal: "开尔照明 Zhejiang Xuguang Electronic",
    category: "lighting",
    cvsStt: 14,
    logo: "/img/logos/care-lighting.png",
    introduction:
      "开尔照明隶属浙江旭光电子股份有限公司 —— 集研发 + 生产 + 销售 + 服务于一体的 LED 灯具应用解决方案供应商。公司于 2016 年在新三板（NEEQ）挂牌，代码 839762，获评中国十大 LED 品牌之一，并是 50V 以上自镇流 LED 灯安全规范国家标准的起草单位。",
    founded: "1995 (CareLighting brand)",
    listed: "NEEQ 839762",
    factory: {
      location: "总部：中国浙江省",
      facilities: "生产基地位于浙江，分销网络覆盖 26 个省/市",
    },
    highlights: [
      "新三板挂牌 —— 代码 839762（2016）",
      "中国十大 LED 品牌",
      "国家标准起草单位：50V 以上自镇流 LED 灯安全规范",
      "在 26 个省、直辖市、自治区设有 500 家分销门店网络",
    ],
    website: "http://www.care-china.cn/",
    products: CARE_LIGHTING_PRODUCTS,
  },

  // ─── 🍳 厨房设备（新增 2 个品牌） ─────────────────────────
  {
    slug: "daweier",
    name: "Daweier",
    nameOriginal: "开平达威尔厨卫 Kaiping Daweier",
    category: "kitchen-equipment",
    cvsStt: 27,
    logo: "/img/logos/daweier.png",
    introduction:
      "开平达威尔厨卫是一家中美合资企业，专业生产高端不锈钢水槽 + 水龙头 + 不锈钢地漏 + 厨卫配件。集设计 + 研发 + 生产 + 营销 + 服务于一体，达威尔是中国水槽市场的领军企业，早期即通过 ISO 9001 与 UPC 认证。",
    factory: {
      location: "中国广东省开平市水口镇",
      facilities: "开平 60,000+ ㎡ 现代化工厂 ——「中国卫浴王国」",
    },
    highlights: [
      "中美合资，1998 年成立 —— 25 年以上专业积淀",
      "早期即获 ISO 9001（质量）+ UPC（美国 uPVC 产品认证）",
      "中国不锈钢水槽市场领军企业",
      "产品出口 30 多个国家和地区",
    ],
    website: "http://www.daweier.com/",
    products: DAWEIER_PRODUCTS,
  },
  {
    slug: "dongyuan",
    name: "Dongyuan",
    nameOriginal: "东原厨具 GuangDong DongYuan Kitchenware",
    category: "kitchen-equipment",
    cvsStt: 28,
    logo: "/img/logos/dongyuan.png",
    introduction:
      "东原厨具是位于佛山顺德区的现代化企业 —— 顺德是中国最大的制造产业集群中心之一。公司创立于 1993 年，集研发 + 生产 + 销售于一体，主营不锈钢水槽、厨房用具 + 五金制品。年产量超 180 万件，出口 30 多个国家。",
    founded: "1993",
    factory: {
      location: "中国广东省佛山市顺德区",
      area: "约 60,000 ㎡",
      capacity: "180 万+ 件/年",
    },
    highlights: [
      "30 余年专业积淀（始于 1993）—— 在水槽 + 厨房五金领域积累深厚经验",
      "年产量超180万件",
      "出口全球30多个国家和地区",
      "顺德产业集群——中国领先的金属加工中心",
    ],
    website: "http://www.sddongyuan.com/",
    products: DONGYUAN_PRODUCTS,
  },

  // ─── 🧱 建筑材料（新增 2 个石材 + 隔热板品牌） ──────────────────
  {
    slug: "pengxiang",
    name: "Pengxiang",
    nameOriginal: "福建鹏翔实业 Fujian Pengxiang Industry",
    category: "construction-materials",
    cvsStt: 43,
    logo: "/img/logos/pengxiang.png",
    introduction:
      "福建鹏翔实业是位于中国福建省的高端石材制造集团，是亚洲领先的人造石制造商之一。主营产品包括人造石英石、再造大理石、水磨石及3D石英石。集团同时是越南乂安省德盛石材（越南法人公司）的母公司。",
    factory: {
      location: "中国福建省 + 越南乂安省义坛工业园工厂（通过德盛石材）",
      facilities: "全自动人造石生产技术——达国际标准",
    },
    highlights: [
      "亚洲最大的人造石制造商之一",
      "在越南乂安省义坛工业园拥有越南法人公司（德盛石材）",
      "越南工厂投资：2,500万美元，年产能850万㎡",
      "出口全球120多个国家",
    ],
    website: "http://www.pengxiang.cn/",
    products: PENGXIANG_PRODUCTS,
  },
  {
    slug: "zhongju-yabai",
    name: "Zhongju Yabai",
    nameOriginal: "中居亚百建材科技 Zhongju Yabai Building Materials",
    category: "construction-materials",
    cvsStt: 38,
    logo: "/img/logos/zhongju-yabai.png",
    introduction:
      "广东中居亚百建材科技专业生产无机预涂板——又称「冰火板」——用于室内外隔墙及吊顶的高端饰面材料。产品具备防火、防潮、防霉、抗菌且无甲醛释放等特性。",
    factory: {
      location: "中国广东省",
      facilities: "全自动生产线——无机预涂板",
    },
    highlights: [
      "无机预涂板——防火+防潮+防霉特性",
      "抗菌、无甲醛释放产品——达医院+洁净室标准",
      "应用：室内外隔墙、吊顶、医用墙面、实验室",
      "「冰火板」产品——耐火+耐低温",
    ],
    website: "http://www.gdzjyb.com/",
    products: ZHONGJU_YABAI_PRODUCTS,
  },

  // ─── 🏠 家具（新增 1 个家用电梯品牌） ───────────────
  {
    slug: "linvol",
    name: "LINVOL",
    nameOriginal: "领沃 LINVOL (Midea Group)",
    category: "noi-that",
    cvsStt: 45,
    logo: "/img/logos/linvol.png",
    introduction:
      "领沃（LINVOL）是美的集团旗下官方电梯品牌——专注别墅电梯、旧楼加装改造电梯、自动扶梯及乘客电梯。领沃秉持「每一程，都是更好的抵达」理念，将数字技术+AI融入电梯全生命周期：设计→生产→定制→研发→运行→维保。",
    factory: {
      location: "研发+工厂区：中国广东省（美的园区）",
      facilities: "美的数字化电梯研发中心+佛山园区工厂",
    },
    highlights: [
      "美的集团（《财富》世界500强）官方电梯品牌",
      "「管家+专家」全周期——终身质保+维保",
      "数字技术+AI贯穿电梯全生命周期",
      "4大产品线：别墅、加装改造、自动扶梯、乘客电梯",
    ],
    website: "https://linvol.midea.com.cn/home",
    products: LINVOL_PRODUCTS,
  },

  // ─── 🚪 门窗与智能锁（新增 1 个智能锁品牌） ─────
  {
    slug: "ttlock",
    name: "TTLock",
    nameOriginal: "TTLock Sciener (赛脑智能/鹿客 LOOCK)",
    category: "doors-windows",
    cvsStt: 46,
    logo: "/img/logos/ttlock.png",
    introduction:
      "TTLock（由赛脑智能开发）是全球领先的智能锁解决方案供应商——包括适配各类门锁的PCBA硬件+管理软件平台+面向酒店、Airbnb、服务式公寓及企业的集成系统。TTLock生态连接30多家中国软件合作伙伴，服务公寓租赁+物业管理市场。",
    factory: {
      location: "研发+生产总部：中国——全球分销",
      facilities: "研发中心+智能锁专用PCBA生产线",
    },
    highlights: [
      "全球领先的智能锁解决方案供应商（自称）",
      "PCBA可集成于各类门锁——将普通锁升级为智能锁",
      "30+软件合作伙伴生态，服务租赁+物业管理市场",
      "专用软件：TTLock app、TTRenting、TTHotel Pro、TTology",
    ],
    website: "https://www.ttlock.com/",
    products: TTLOCK_PRODUCTS,
  },

  // ─── 🧱 建筑材料（新增 2 个瓷砖 + 涂料品牌） ───────────────────
  {
    slug: "kito",
    name: "KITO",
    nameOriginal: "金意陶 KITO Ceramics",
    category: "construction-materials",
    cvsStt: 47,
    logo: "/img/logos/kito.png",
    introduction:
      "金意陶（广东金意陶陶瓷集团）是中国领先的瓷砖+岩板制造商——自称「中国质感砖开创者」。运营总部位于广东佛山禅城区季华路28号新城智汇T6栋。金意陶定位中高端，拥有6大艺术砖系列，并为室内设计提供一站式整体配送服务。",
    factory: {
      location: "中国广东佛山（禅城季华路28号——新城智汇T6）",
      facilities: "佛山产业集群——「中国瓷砖之都」",
    },
    highlights: [
      "中国「质感系」瓷砖开创者",
      "6大专属艺术砖系列——中高端定位",
      "为室内设计提供「一站式」整体配送服务",
      "另设出口品牌KITO Ceramics（kitoceramics.com）",
    ],
    hotline: "4008-678-488",
    website: "https://kito.cn/",
    products: KITO_PRODUCTS,
  },
  {
    slug: "3trees",
    name: "3TREES",
    nameOriginal: "三棵树涂料股份有限公司 SKSHU Paint",
    category: "construction-materials",
    cvsStt: 48,
    logo: "/img/logos/3trees.png",
    introduction:
      "三棵树涂料（SKSHU Paint）是中国上市涂料集团，品牌口号为「树立天地，绿满世界」。公司提供完整的家装产品体系（内墙漆+艺术漆+小森林板材）及工程产品体系（防水涂料+工业涂料）。三棵树推出「马上住」服务——短期交付的家装施工套餐。",
    listed: "SSE 603737（参考）",
    factory: {
      location: "总部：中国福建省莆田市",
      facilities: "上交所上市集团——大型涂料生产集群体系",
    },
    highlights: [
      "中国大型上市涂料集团——股票代码SSE 603737",
      "「马上住」一站式服务——涂装快速交付",
      "完整产品体系：家装+工程+工业+防水",
      "品牌口号：「树立天地，绿满世界」",
    ],
    website: "http://www.skshu.com.cn/",
    products: TREES_PRODUCTS,
  },

  // ─── 🚿 卫浴洁具（新增 1 个德国高端品牌） ───────────
  {
    slug: "bravat",
    name: "BRAVAT",
    nameOriginal: "贝朗 BRAVAT (Dietsche Group, 德国)",
    category: "bathroom-sanitary",
    cvsStt: 49,
    logo: "/img/logos/bravat.png",
    introduction:
      "贝朗（BRAVAT）是隶属Dietsche集团的高端卫浴品牌——Dietsche是拥有逾百年历史的德国卫浴集团。贝朗定位「生活，从这里真正开始」——提供整体卫浴解决方案：智能产品+五金+马桶+浴室家具+台盆+浴缸+淋浴房+配件。服务全球市场（德国、美国、中国、巴西、澳大利亚、新加坡、越南、俄罗斯、墨西哥）。",
    factory: {
      location: "中国总部：贝朗（中国）卫浴有限公司（BRAVAT China）",
      facilities: "中国工厂+研发——Dietsche全球体系的一部分",
    },
    highlights: [
      "母公司Dietsche——逾百年历史的德国卫浴集团",
      "完整产品体系：从智能到配件共8大系列",
      "参考项目：万豪、岘港凯悦酒店（越南）、Sber City",
      "分销10+市场：德国、美国、中国、巴西、澳大利亚、新加坡、越南、俄罗斯、墨西哥",
    ],
    website: "https://www.bravat.com.cn/",
    products: BRAVAT_PRODUCTS,
  },

  // ─── 💡 灯具照明（新增 1 个国际品牌） ────────────────────────
  {
    slug: "sylvania",
    name: "Sylvania Group",
    nameOriginal: "Sylvania Group (Feilo Sylvania)",
    category: "lighting",
    cvsStt: 50,
    logo: "/img/logos/sylvania.png",
    introduction:
      "Sylvania Group（Feilo Sylvania）是源自1901年的国际照明集团，全球历史最悠久、最具声誉的照明品牌之一。业务遍及欧洲、拉丁美洲、亚洲及非洲，产品体系覆盖建筑、工业、零售、办公及城市照明。与上海飞乐音响集团合并后，Sylvania融入中外生态体系，将西方照明技术与中国供应链相结合。",
    founded: "1901",
    factory: {
      location: "跨国运营——欧洲总部+中国工厂（飞乐）",
      facilities: "多洲研发+工厂网络（欧洲、美洲、亚洲）",
    },
    highlights: [
      "源自1901年的国际照明品牌——逾120年历史",
      "跨洲运营：欧洲+美洲+亚洲+非洲",
      "产品体系覆盖：建筑、工业、零售、办公、城市",
      "隶属Feilo Sylvania集团——融合西方技术+中国供应链",
    ],
    website: "https://www.sylvania-group.com/",
    products: SYLVANIA_PRODUCTS,
  },
];

/** 查询辅助：按主分类分组合作伙伴。 */
export function partnersByCategory(slug: PartnerBrand["category"]): PartnerBrand[] {
  return PARTNERS.filter((p) => p.category === slug);
}

/** 查询辅助：按 slug 获取单个合作伙伴。 */
export function getPartner(slug: string): PartnerBrand | undefined {
  return PARTNERS.find((p) => p.slug === slug);
}

/** 单个产品的 slug —— 优先 `slug` 字段，回退 model.toLowerCase()。 */
export function productSlug(p: PartnerProduct): string {
  return (p.slug ?? p.model).toLowerCase();
}

/** 查询辅助：按 (partnerSlug, productSlug) 获取单个产品。 */
export function getProduct(
  partnerSlug: string,
  prodSlug: string
): { partner: PartnerBrand; product: PartnerProduct } | undefined {
  const partner = getPartner(partnerSlug);
  if (!partner) return undefined;
  const product = partner.products.find(
    (p) => productSlug(p) === prodSlug.toLowerCase()
  );
  if (!product) return undefined;
  return { partner, product };
}
