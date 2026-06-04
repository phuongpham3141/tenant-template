/**
 * 元数据 Bravat 贝朗 — 详情页。所有组别通用的品牌元数据。
 * 来源：bravathcm.com（Bravat 越南官方代理商）+ bravat.com。
 * Bravat 隶属 Roman Dietsche（德国）— 逾 145 年历史（始于 1873 年，黑森林地区）。
 */
export type SeriesMeta = {
  story: string; heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[]; careGuide: { title: string; desc: string }[];
  installation: string[]; certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[]; faq: { q: string; a: string }[];
};
const BRAND: SeriesMeta = {
  story:
    "Bravat（贝朗）是隶属 Roman Dietsche 的高端卫浴洁具品牌 —— 这家德国卫浴集团拥有逾 145 年历史，起源于 1873 年德国巴登-符腾堡州黑森林（Black Forest）地区的一家家庭作坊。Bravat 提供整体浴室解决方案：水龙头与花洒、马桶、台盆、浴缸、淋浴房、浴室柜及配件 —— 定位于高端市场。",
  heritage:
    "Bravat 在 10 多个市场销售（德国、美国、中国、巴西、澳大利亚、新加坡、越南、俄罗斯、墨西哥）。在越南设有河内和岘港展厅，并有官方代理商。",
  technicalSpecs: [
    { label: "品牌", value: "Bravat 贝朗 (Roman Dietsche, 德国)" },
    { label: "历史", value: "逾 145 年（始于 1873 年）" },
    { label: "覆盖范围", value: "水龙头/花洒、马桶、台盆、浴缸、浴室柜、配件" },
    { label: "材质", value: "黄铜（brass）主体，陶瓷阀芯，高端电镀层" },
  ],
  manufacturing: [
    "Bravat 隶属德国 Roman Dietsche 集团 — 逾 145 年卫浴洁具经验",
    "黄铜（brass）龙头主体；耐用的 Flush/Kerox 陶瓷阀芯（ceramic cartridge）",
    "Neoperl 起泡器，镀铬 / 镀金 / PVD 拉丝镍 / 黑色表面处理",
    "工厂体系 + 研发服务全球市场",
  ],
  careGuide: [
    { title: "表面清洁", desc: "用柔软湿布擦拭；避免强力/腐蚀性清洁剂损坏电镀层。" },
    { title: "阀芯保养", desc: "陶瓷阀芯耐用；若有渗漏可更换正品阀芯（cartridge）。" },
    { title: "起泡器", desc: "定期清洁/更换 Neoperl 起泡器，保持水流均匀、节水。" },
  ],
  installation: [
    "按开孔数确定安装类型（台缘式、入墙式、台上式等）",
    "由专业人员安装；按正确螺纹接驳不锈钢进水软管（G1/2、G3/4）",
    "检查推荐水压（通常约 0.3MPa）及密封性",
    "安装前清洁管路，避免杂质卡阀",
  ],
  certifications: [
    "国际卫浴洁具与水龙头标准（依各市场而定）",
    "德国品牌 Roman Dietsche — 按欧洲标准管控品质",
    "参考项目：万豪（Marriott）、岘港凯悦（Hyatt 越南）、Sber City",
  ],
  packaging: [
    { label: "供货形式", value: "按 SKU / 整套浴室" },
    { label: "随附配件", value: "不锈钢进水软管、起泡器、安装螺丝（视 SKU 而定）" },
    { label: "越南市场", value: "河内与岘港展厅，官方代理商" },
  ],
  whyChoose: [
    { icon: "🇩🇪", title: "145+ 年德国品牌", desc: "隶属 Roman Dietsche — 始于 1873 年的德国卫浴传承。" },
    { icon: "🛁", title: "整体浴室方案", desc: "从水龙头/花洒到马桶、台盆、浴缸、柜体、配件。" },
    { icon: "💎", title: "高端品质", desc: "黄铜主体、陶瓷阀芯、耐用美观的电镀层；并有镶施华洛世奇（Swarovski）水晶系列。" },
  ],
  projectShowcase: ["四至五星级酒店（万豪、岘港凯悦）", "高端公寓与别墅", "度假村、水疗中心", "家庭住宅"],
  faq: [
    { q: "Bravat 是哪国的品牌？", a: "Bravat（贝朗）隶属德国 Roman Dietsche 集团，逾 145 年历史（始于 1873 年）。拥有工厂及全球分销体系。" },
    { q: "Bravat 在越南有售吗？", a: "有。Bravat 在河内和岘港设有展厅，并有官方代理商；请联系华越供应链（Huayuesc）获取咨询。" },
    { q: "Bravat 龙头的材质是什么？", a: "大多数龙头主体采用黄铜（brass），使用耐用的陶瓷阀芯（ceramic cartridge），表面依系列采用镀铬/镀金/镀镍/黑色处理。" },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
