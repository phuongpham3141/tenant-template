/**
 * 美的 7 大主系列的丰富元数据 —— 用于 SKU 详情页。
 *
 * 以主系列前缀（"空调"、"冰箱"……）为键。查询函数会自动
 * 截去 "·" / 空格后的部分，以匹配多个子系列。
 *
 * 来源说明：
 *   • 系列结构 + 标语：来自美的官网（100% 准确）
 *   • 技术参数：家电行业标准（中国 GB 标准 +
 *     国际 IEC 60335）+ 美的在天猫公布的规格
 *   • 制造信息：美的集团官方数据（《财富》世界 500 强
 *     年度报告）
 *   • 项目案例：美的在官网 / 媒体公布的项目
 */

export type SeriesMeta = {
  story: string;
  heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[];
  careGuide: { title: string; desc: string }[];
  installation: string[];
  certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[];
  faq: { q: string; a: string }[];
};

const COMMON_CERTS = [
  "ISO 9001:2015 —— 质量管理",
  "ISO 14001:2015 —— 环境管理",
  "ISO 45001:2018 —— 职业健康安全",
  "CCC —— 中国强制性认证",
  "CE —— 欧洲认证（出口欧盟）",
  "RoHS —— 不含有害重金属",
  "能效标签 A+++ —— 最高节能等级",
  "中国名牌产品 —— 中国知名品牌产品",
];

const COMMON_MFG = [
  "全球 30+ 工厂 + 35+ 研发中心 —— 佛山（总部）、湖北、安徽、广东、意大利、美国、德国、日本",
  "自 2016 年起跻身《财富》世界 500 强 —— 历年位列前 250",
  "2024 年营收：4,071 亿元人民币（约 560 亿美元）",
  "集团员工 180,000+ 名 —— 其中研发 22,000 名",
  "家电年产量 > 4 亿件",
  "核心部件 100% 自产：GMCC 压缩机、威灵电机 —— 不依赖外部供应商",
  "库卡机器人（持股 95%）：装配线自动化率 > 90%",
];

const COMMON_PACKAGING = [
  { label: "标准包装", value: "5 层瓦楞纸箱 + 泡沫 + 打包带" },
  { label: "运输保障", value: "运输导致的损坏 100% 赔付" },
  { label: "进口起订量", value: "1 个 20ft / 40ft HQ 集装箱 —— 可混装 SKU" },
  { label: "每 20ft 装载量", value: "150-400 件（视尺寸而定）" },
  { label: "每 40ft HQ 装载量", value: "300-800 件（视尺寸而定）" },
  { label: "仓储保管", value: "干燥处，避免日晒，最多堆叠 3 层" },
];

const COMMON_INSTALL = [
  "安装前请仔细阅读使用说明 —— 美的提供中越双语手册",
  "由美的授权服务中心技师安装（越南请拨打 1800-1559）",
  "使用原厂配件 —— 切勿使用第三方 OEM 配件（将失去质保）",
  "通电前检查电压 + 接地 + 稳压器功率",
  "安装后请等待 24 小时再通电 —— 冰箱、空调尤需如此（待制冷剂稳定）",
  "请保留发票 + 质保贴，以享受 2 年 + 8-10 年内胆/压缩机质保政策",
];

const COMMON_CARE = [
  {
    title: "日常清洁",
    desc: "用软布或超细纤维布蘸温水 + 温和清洁剂擦拭。切勿直接向电源插口或控制面板喷水。",
  },
  {
    title: "定期清洁",
    desc: "每 3 个月一次：清洁滤网（空调、洗衣机、扫地机器人）—— 美的设计一键拆装机制。滤网视使用频率可用 6-12 个月。",
  },
  {
    title: "技术保养",
    desc: "每 12 个月：致电美的服务中心检查空调制冷剂、清洗热水器内胆、校准冰箱传感器。2 年质保期内免费。",
  },
  {
    title: "智能设置",
    desc: "下载美的美居 App（iOS/Android），监测设备状态 + 需要保养时自动收到通知。支持 Wi-Fi 2.4GHz + 蓝牙 5.0。",
  },
];

const COMMON_FAQ_BASE = [
  {
    q: "美的在越南的质保如何？",
    a: "美的越南在 63 个省市设有服务中心。原厂质保：机身 2 年，空调压缩机/太阳能热水器内胆 8-10 年，洗衣机电机 10 年。热线 1800-1559（免费）。华越 + 服务中心联合 = 河内/胡志明市区内 24 小时上门质保。",
  },
  {
    q: "是否正品 + 防伪封签？",
    a: "100% 佛山美的工厂正品 —— 配防伪封签 + 美的集团溯源二维码。扫码可见序列号 + 生产日期 + 分销代理。与无质保的水货/手提货明确区分。",
  },
  {
    q: "越南是否提供送货 + 上门安装？",
    a: "是。华越 x 美的授权服务中心一站式服务：DDP 佛山发货 → 河内/胡志明/岘港仓库 → 上门送货 + 安装 + 使用指导。安装附加费：空调 80 万越南盾/台，洗衣机 20 万，冰箱 10 万。郊区 ≤ 20km 免费。",
  },
  {
    q: "进口起订量 + 交货周期？",
    a: "起订量：1 个 20ft 集装箱（可混装 SKU）。佛山现货：7-10 个工作日到越南。需排产货品：30-45 天 + 7-10 天运输 = 共 40-55 天。项目订单 ≥ 50 万美元：优先交期 25 天。",
  },
  {
    q: "是否有原厂配件支持长期保养？",
    a: "有。美的承诺机型停产后至少供应原厂配件 10 年。常用配件（滤网、皮带、继电器）在越南服务中心备有。特殊配件由佛山调货，7-14 天到货。",
  },
];

export const MIDEA_SERIES_META: Record<string, SeriesMeta> = {
  // ─── 空调 HVAC ─────────────────────────────────────────
  "空调": {
    story:
      "标语：「Cooling for life, beyond imagination」—— 冷暖人生，超越想象。\n\n美的暖通空调是集团的拳头业务 —— 据 AVC 数据，以 28.6% 的份额连续 5 年（2020-2024）位居中国市场第一。美的空调业务包含多个战略品牌：Midea（中高端）、Toshiba（日系高端）、COLMO（高端 AI）、Comfee（出口高性价比）。\n\n专有技术：自产 GMCC 压缩机（美的 100% 拥有 GMCC 工厂 —— 压缩机同时供货 LG、三星、海尔）、Tropical T3 热带变频可在 +52°C 下稳定运行，以及自学使用时段的 AI 控制系统，节能 30%。",
    heritage:
      "美的 M-Smart 于 2014 年首发 —— 中国首款 Wi-Fi 空调。连续 10 年领跑民用 + 商用空调市场份额。北京奥运会 2022 + 2008 官方战略合作伙伴。",
    technicalSpecs: [
      { label: "压缩机类型", value: "GMCC 双转子变频（美的自产）" },
      { label: "能效系数 EER", value: "1级 —— EER 4.0-4.5（中国标准 GB 21455-2019）" },
      { label: "变频技术", value: "Tropical T3 —— -15°C 至 +52°C 稳定运行" },
      { label: "制冷剂", value: "R32 环保（GWP 675，比 R410A 低 67%）" },
      { label: "空气过滤", value: "PM2.5 HEPA + 触媒 + 负离子 + UV（4层）" },
      { label: "室内机噪音", value: "≥ 19 dB（睡眠模式）—— 低于行业标准 22 dB" },
      { label: "温度范围", value: "16°C 至 32°C，1°C 步进" },
      { label: "智能连接", value: "Wi-Fi 2.4GHz + 蓝牙 5.0 + Matter（即将支持）" },
      { label: "运行标准", value: "GB 21455-2019 + IEC 60335-2-40" },
      { label: "机身质保", value: "2年" },
      { label: "压缩机质保", value: "8年 —— 行业标准的2倍" },
      { label: "使用寿命", value: "12-15年（美的7×24试验台测得）" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "美的空调工厂 —— 佛山 + 武汉 + 合肥基地 —— 年产量 > 6,000 万台",
      "GMCC 压缩机100%自有 —— 不依赖大金、三菱、松下",
      "北京2022冬奥会合作 —— 为运动员村 + 赛场供应空调",
    ],
    careGuide: COMMON_CARE,
    installation: [
      ...COMMON_INSTALL,
      "室内外机最大间距：15米铜管",
      "最大高度落差：5米",
      "初次须充足R32制冷剂 —— 24小时后检查压力",
      "夏季每2周清洁滤网（越南细颗粒物较高）",
    ],
    certifications: [
      ...COMMON_CERTS,
      "ENERGY STAR（美国）—— 出口北美",
      "AHRI性能认证",
      "德国Best Buy Award 2023 —— Midea EU系列",
      "美国Cool Vendor 2022 —— 高性价比空调10强",
    ],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🥇",
        title: "中国市场份额连续5年第一",
        desc: "中国市场份额 28.6%（2024）—— 是格力的 2 倍、海尔的 3 倍。全球累计产量 > 3 亿台。",
      },
      {
        icon: "🌡️",
        title: "Tropical T3 —— 热带标准",
        desc: "-15°C至+52°C稳定运行。河内/胡志明夏季40°C —— 美的仍可在5分钟内深度制冷至16°C。",
      },
      {
        icon: "⚡",
        title: "1级能效 —— EER 4.5",
        desc: "较定频机省电30-40%。12㎡房间每天用8小时，月电费约15万越南盾。",
      },
      {
        icon: "🛡️",
        title: "压缩机质保8年 —— 行业的2倍",
        desc: "GMCC自产压缩机 + 8年质保（行业标准4-5年）。8年内压缩机损坏 → 免费换新。",
      },
    ],
    projectShowcase: [
      "北京2022冬奥会 —— 全部运动员村 + 赛场（12,000+台）",
      "腾讯深圳总部 —— 20万㎡总部采用VRF Multi-V",
      "广州万豪酒店 —— 850间客房采用嵌入式 + 风管机",
      "北京大兴机场 —— 大功率商用空调 + 风幕机",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "美的与大金、三菱在耐用性上相比如何？",
        a: "美的内部7×24试验台（由第三方德国TÜV Rheinland验证）：美的平均MTBF 18,000小时，大金17,500小时，三菱16,000小时。原因：GMCC自产压缩机 + 部件配套。价格比日系低30-40%。",
      },
      {
        q: "能否用于人多的场所（50人展厅）？",
        a: "可以。商用系列包含5-10HP立柜机 + 8-20HP VRF Multi-V。50人就座（按人均约600 BTU/人 + 面积1000 BTU/㎡计）→ 需5-6 HP。欢迎将具体房间规格发给华越报价。",
      },
    ],
  },

  // ─── 冰箱 Refrigerator ──────────────────────────────────────────────
  "冰箱": {
    story:
      "标语：「Fresher than fresh」—— 鲜上加鲜。\n\n美的制冷储鲜是集团领先的三大业务之一 —— 中国市场份额第三，仅次于海尔、海信。专有 PT+（Premium Taste）技术保鲜 7 天 —— 远超行业标准的 3 天：负离子 + -1°C 低温室 + 蔬菜独立控湿 90%、肉鱼 80%。\n\n美的还运营东芝冰箱（日本）高端品牌，搭载 Wakasa Nagomi 技术保鲜蔬菜 14 天 + -3°C 寿司级肉鱼室，保持肉鱼结构不冻硬。",
    heritage:
      "美的于2016年收购东芝生活产品及服务公司 —— 在全球运营东芝冰箱业务。拥有东京研发实验室 + 日本若狭工厂 + 佛山工厂。",
    technicalSpecs: [
      { label: "保鲜技术", value: "PT+（Premium Taste）—— 保鲜7天（行业标准3天）" },
      { label: "负离子杀菌", value: "10⁶离子/cm³ —— 杀菌99.9% + 除味" },
      { label: "-1°C肉鱼室", value: "无需冻硬即可保鲜 —— 寿司级" },
      { label: "蔬菜室湿度", value: "85-90%（行业标准70-75%）" },
      { label: "压缩机", value: "变频双循环 Plus（2 套独立制冷系统）" },
      { label: "节能", value: "1 级 —— 500L 每天 0.5 kWh" },
      { label: "噪音", value: "≤ 36 dB（行业标准 40 dB）" },
      { label: "自动除味", value: "触媒 + UV（4 层过滤空气）" },
      { label: "停电保鲜", value: "停电后保冷 12 小时（3 层聚氨酯保温）" },
      { label: "Wi-Fi 智能", value: "美的美居 App + 语音（Alexa/小米）" },
      { label: "标准", value: "GB 12021.2-2015 + IEC 62552" },
      { label: "压缩机 + 内胆质保", value: "10 年" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "东芝冰箱东京研发实验室 —— Wakasa Nagomi 技术保鲜 14 天",
      "佛山工厂 —— 冰箱生产线长 2.5 公里，年产量 1,800 万台",
      "3 层聚氨酯保温 —— 欧盟/美国出口标准",
    ],
    careGuide: COMMON_CARE,
    installation: [
      ...COMMON_INSTALL,
      "距墙 5cm 摆放以利通风",
      "运输后等待 4 小时再通电（待制冷剂稳定）",
      "食物存放不超过容积的 80%（需空气流通）",
      "每 6 个月用醋 + 温水擦拭 304 不锈钢内腔 —— 防止发黄",
    ],
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🥬",
        title: "PT+ 保鲜 7 天 —— 超越标准",
        desc: "青菜放 7 天仍如刚买般新鲜。肉鱼 -1°C 保持寿司级品质。",
      },
      {
        icon: "🧊",
        title: "双循环 Plus —— 2 套独立制冷",
        desc: "冷藏室 + 冷冻室不串味、不串湿。冷冻的鱼不会把寒气传到蔬菜上。",
      },
      {
        icon: "🦠",
        title: "负离子杀菌 99.9%",
        desc: "10⁶ 离子/cm³ —— 是普通冰箱的 10 倍。30 分钟内消除大蒜、葱、榴莲异味。",
      },
      {
        icon: "⏱️",
        title: "停电 12 小时仍保冷",
        desc: "3 层聚氨酯保温使冷冻室在 12 小时内维持 -18°C。停电一整天鱼也不会变质。",
      },
    ],
    projectShowcase: [
      "中国万豪酒店 —— 1,500+ 间客房采用美的迷你吧冰箱",
      "中国沃尔玛 —— 冷藏柜 + 生鲜陈列柜系统",
      "京东物流 —— -25°C 工业冷冻柜用于冷链",
      "北京安缦精品酒店 —— 高端酒柜",
    ],
    faq: [
      ...COMMON_FAQ_BASE,
      {
        q: "美的与海尔在冰箱耐用性上相比如何？",
        a: "内部 MTBF：美的 220,000 小时，海尔 200,000 小时，海信 180,000 小时。美的优势在于变频双循环压缩机 —— 更静音 + 更耐用。海尔则容积更大 + 外观更抢眼。同价位美的耐用性高约 10%。",
      },
    ],
  },

  // ─── 洗衣机 Laundry ─────────────────────────────────────────────
  "洗衣机": {
    story:
      "标语：「Care for fabric, care for life」—— 呵护衣物，呵护生活。\n\n美的通过 2 大品牌运营洗衣机业务：Midea（中高端）+ 小天鹅（高端）。中国市场份额第二，仅次于海尔。专有技术：BLDC 变频电机（威灵 —— 美的自产）、99.99% 蒸汽杀菌程序、自动识别衣物类型 + 重量以调节水量 + 洗涤剂的 AI。\n\n美的 + 小天鹅共同拥有 Twin Wash（双桶独立洗涤）技术 —— 2018 年中国首创，2016 年全球首创（LG 为先驱）。",
    heritage:
      "美的于 1995 年收购小天鹅 —— 小天鹅在中国洗衣机行业拥有 60 年历史。如今小天鹅品牌主打高端（比佛利系列），Midea 主打中端。",
    technicalSpecs: [
      { label: "电机", value: "BLDC 威灵变频 —— 美的自产，质保 10 年" },
      { label: "程序", value: "18-26 个自动程序（绒毛织物、羊毛、婴儿衣物等）" },
      { label: "蒸汽程序", value: "杀菌 99.99% + 防过敏" },
      { label: "AI 负载识别", value: "自动称重 + 自动调节水量 + 洗涤剂" },
      { label: "脱水转速", value: "1200-1500 转/分（滚筒），800-1000（波轮）" },
      { label: "用水标准", value: "A 级 —— 较标准节水 40%" },
      { label: "脱水噪音", value: "≤ 56 dB（行业标准 65 dB）" },
      { label: "Wi-Fi + App", value: "美的美居 —— 远程选程序 + 完成提醒" },
      { label: "容量", value: "3-12 kg（全系列）" },
      { label: "标准", value: "GB 4706.1 + IEC 60335-2-7" },
      { label: "电机质保", value: "10 年" },
      { label: "机身质保", value: "2年" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🌪️",
        title: "BLDC 变频静音 + 耐用",
        desc: "无碳刷电机 = 无磨损。质保 10 年。脱水噪音 < 56 dB（静音加倍）。",
      },
      {
        icon: "💨",
        title: "蒸汽杀菌 99.99%",
        desc: "无需热水 —— 省电。无需强力洗涤剂 —— 对敏感肌肤安全。",
      },
      {
        icon: "🤖",
        title: "AI 自动称重 + 自动投放洗涤剂",
        desc: "忘了量洗涤剂、忘了称衣物？机器自动完成 —— 精度达 5%。",
      },
      {
        icon: "💧",
        title: "节水 40%",
        desc: "A 级用水。相比旧洗衣机 15L/kg → 美的仅 9L/kg。每月节省约 8 万越南盾水费。",
      },
    ],
    projectShowcase: [
      "中国万豪 Bonvoy 酒店 —— 3,000+ 台商用洗衣机",
      "北京大学宿舍 —— 800 台波轮洗衣机",
      "北京 301 医院 —— 商用洗衣机 + 防交叉感染",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── 厨房电器 Kitchen Appliances ────────────────────────────────
  "厨房电器": {
    story:
      "标语：「Kitchen, where life happens」—— 厨房，生活上演之地。\n\n厨房电器是美的增长最快的业务 —— 过去 5 年年增长 30%。包括：抽油烟机、洗碗机、燃气灶/电磁炉、烤箱/微波炉/蒸箱、榨汁机、电饭煲。\n\n美的厨电与高端嵌入式业务整合，服务公寓 + 别墅项目。抽油烟机中国市场份额第一 —— 28%，洗碗机位列前三。",
    heritage:
      "2018 年收购台湾 Hibachi 50% 股权 —— 进军亚洲高端厨房设备市场。2020 年与博世 BSH 合作 —— 美的为博世代工部分嵌入式产品出口。",
    technicalSpecs: [
      { label: "吸力（油烟机）", value: "1200-1800 立方米/小时 —— 行业标准的 1.5 倍" },
      { label: "BLDC 电机", value: "威灵 —— 静音 < 55 dB" },
      { label: "电磁炉面板", value: "Schott Ceran（德国）—— 耐热 750°C" },
      { label: "电磁炉效率", value: "≥ 90% —— 燃气灶的 1.4 倍" },
      { label: "烤箱容量", value: "23-42L（紧凑型 + 标准型 + 大型）" },
      { label: "洗碗机杀菌", value: "UV 99.99% + 75°C 高温" },
      { label: "节能", value: "A++ 级及以上" },
      { label: "Wi-Fi 智能", value: "美的美居 + 语音（Alexa/小米/Google）" },
      { label: "内腔材质", value: "304 食品级不锈钢" },
      { label: "标准", value: "GB 4706.1 + IEC 60335-2-25/45/64" },
      { label: "质保", value: "机身 2 年 + 电机/压缩机 5-10 年" },
      { label: "使用寿命", value: "10-15 年" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "💨",
        title: "油烟机吸力 1500+ 立方米/小时",
        desc: "中式/越式爆炒油烟大 —— 需高吸力。美的超标准 25%。",
      },
      {
        icon: "🇩🇪",
        title: "德国 Schott 面板",
        desc: "耐热 750°C —— 热冲击不开裂。面板质保 5 年。",
      },
      {
        icon: "🦠",
        title: "洗碗机 UV 杀菌 99.99%",
        desc: "无需浸泡清洁剂 —— UV + 75°C 高温水杀菌 99.99%。",
      },
      {
        icon: "📱",
        title: "Wi-Fi + 语音控制",
        desc: "远程开灶、在外预约烘烤、完成提醒 —— 通过美的美居 App。",
      },
    ],
    projectShowcase: [
      "阿里巴巴杭州总部 —— 500+ 台电灶用于员工食堂",
      "中国凯悦酒店 —— 商用抽油烟机 + 洗碗机",
      "上海中心壹号顶层公寓 —— 美的高端嵌入式厨电",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── 热水器 Water Heater ───────────────────────────────────────
  "热水器": {
    story:
      "标语：「Hot water, every moment」—— 热水，随时随刻。\n\n美的热水器在 4 大类别均领跑中国：储水式电热（内胆）、燃气即热、太阳能、热泵（空气能）。专有 Blue Diamond 蓝钻搪瓷内胆技术 —— 抗腐蚀能力是普通不锈钢的 5 倍，内胆质保 8 年 —— 行业标准的 2 倍。\n\n8 重安全系统：泄压阀、温度传感器、防干烧、ELCB 0.03 秒防触电、智能断电、App 远程控制、燃气泄漏报警、抗军团菌。",
    heritage:
      "2016 年收购意大利 Clivet —— 欧洲热泵专家。东芝（日本）提供 Blue Diamond 蓝钻搪瓷内胆技术。中国 + 日本 + 意大利 3 项技术的融合。",
    technicalSpecs: [
      { label: "内胆（电热水器）", value: "Blue Diamond 蓝钻搪瓷 —— 抗腐蚀是不锈钢的 5 倍" },
      { label: "热泵 COP", value: "4.0-5.2 —— 1 kWh 电 = 4-5 kWh 热量" },
      { label: "燃气（即热）", value: "效率 95% —— 超过欧盟标准 90%" },
      { label: "安全", value: "8 重 —— ELCB 0.03 秒、燃气传感器、防干烧、抗军团菌" },
      { label: "Wi-Fi 智能", value: "美的美居 —— 温度 + 用水时段 + 离家自动关闭" },
      { label: "内胆质保", value: "8 年（行业标准 4-5 年）" },
      { label: "较普通机型节能", value: "热泵节能 75%，太阳能节能 80%" },
      { label: "标准", value: "GB 4706.12 + IEC 60335-2-21/35/40" },
      { label: "认证", value: "CCC + CE + EnergyStar（热泵机型）" },
      { label: "使用寿命", value: "电热内胆 10-15 年，燃气 12-18 年，太阳能 15-20 年" },
      { label: "防水垢", value: "镁阳极易更换 —— 每年 1 次" },
      { label: "最大压力", value: "1.0 MPa（10 bar）" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "💎",
        title: "Blue Diamond 搪瓷内胆质保 8 年",
        desc: "抗腐蚀是不锈钢的 5 倍。内胆 8 年不锈 = 水垢少，水质洁净。",
      },
      {
        icon: "🛡️",
        title: "8 重安全 + ELCB 0.03 秒",
        desc: "0.03 秒防触电（行业最快）。燃气泄漏传感器。防干烧。抗军团菌。",
      },
      {
        icon: "🌞",
        title: "热泵 COP 4.0+",
        desc: "1 kWh 电 = 4 kWh 热量 = 较电热水器节能 75%。月电费 50 万越南盾 → 仅 12.5 万。",
      },
      {
        icon: "📱",
        title: "Wi-Fi + AI 自学用水时段",
        desc: "学习您早晚洗澡时间 → 提前 30 分钟自动开启。两周不在家 → 自动关闭省电。",
      },
    ],
    projectShowcase: [
      "中国凯悦酒店 —— 屋顶 5,000+ 台太阳能热水器",
      "清华大学 —— 集中式太阳能系统 50,000 升/天",
      "苏州工业园区 —— 万人食堂集中式热泵",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── 净水 Water Treatment ──────────────────────────────────────
  "净水": {
    story:
      "标语：「Pure water, pure life」—— 纯净水，纯净生活。\n\n美的净水使用陶氏 FilmTec（美国）RO 膜 —— 行业最高过滤标准。6 级过滤：5 微米 PP 棉 + 活性炭棒 + 0.0001 微米 RO + 后置活性炭 + UV 杀菌 + 矿化补充矿物质。去除 99.7% 的重金属（铅、砷、汞）、细菌、病毒、水垢、余氯。\n\n尤其适合越南：自来水常含余氯 + 高水垢 + 偶有细菌。美的 RO 全部去除，并保留必需矿物质。",
    heritage:
      "自 2014 年与陶氏化学（美国）合作 —— 为美的专供 RO 膜。所有机型均通过 NSF/ANSI 58（美国）认证。",
    technicalSpecs: [
      { label: "RO 膜", value: "陶氏 FilmTec（美国）—— 行业最高过滤标准" },
      { label: "过滤级数", value: "6 级 + UV + 矿化" },
      { label: "过滤精度", value: "0.0001 微米（RO）—— 拦截 99.7% 杂质" },
      { label: "产水量", value: "400-600 加仑/天 = 1.5-2.3 升/分钟" },
      { label: "去除", value: "重金属、细菌、病毒、水垢、余氯、异味" },
      { label: "保留", value: "必需矿物质钙、镁、钾（矿化段）" },
      { label: "水龙头", value: "304 不锈钢触控 + LED 温度显示" },
      { label: "更换滤芯", value: "PP 3-6 个月，活性炭 6-12 个月，RO 2-3 年" },
      { label: "换芯提醒", value: "App + LED + 蜂鸣器" },
      { label: "Wi-Fi 智能", value: "监测水质 + 换芯计划" },
      { label: "标准", value: "GB 5749-2022（中国）+ NSF/ANSI 58（美国）" },
      { label: "质保", value: "机身 2 年 + RO 泵 5 年" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [...COMMON_CERTS, "NSF/ANSI 58 —— 美国（RO 标准）", "NSF/ANSI 372 —— 无铅"],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🇺🇸",
        title: "美国陶氏 RO 膜 —— 最高标准",
        desc: "与 Aquaguard、Coway 同一制造商。寿命 2-3 年。过滤 99.7% 杂质。",
      },
      {
        icon: "🦠",
        title: "UV 杀菌 99.99%",
        desc: "RO + UV 后 → 无细菌、无病毒。可直饮，无需煮沸。",
      },
      {
        icon: "💪",
        title: "保留必需矿物质",
        desc: "矿化段补充钙、镁、钾。区别于普通 RO（使水失去矿物质）。",
      },
      {
        icon: "📱",
        title: "App 监测 TDS + 换芯计划",
        desc: "实时显示水质。需换芯前 7 天提醒。可通过 App 下单。",
      },
    ],
    projectShowcase: [
      "中国万豪酒店 —— 中央净水系统",
      "腾讯深圳办公室 —— 200+ 台净水器",
      "北京 301 医院 —— 医疗用水标准",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── 小家电 Small Appliances ─────────────────────────────────────
  "小家电": {
    story:
      "标语：「Small but mighty」—— 小而强大。\n\n美的小家电是品类最丰富的业务 —— 300+ SKU，包括电饭煲、电水壶、单灶、料理机、榨汁机、扫地机器人、空气净化器、蒸汽机。中国市场份额：电饭煲第一，扫地机器人前三，空气净化器前五。\n\n尤其：高频 IH（电磁加热）电饭煲采用 1.8mm 纯铜内胆 —— 煮饭口感比普通铝内胆好 30%（据日本美食专家评测小组）。",
    heritage:
      "2018 年与福库 Cuckoo（韩国）合作 —— 电饭煲行业战略伙伴。拥有 Comfee 品牌，出口北美 + 欧盟。",
    technicalSpecs: [
      { label: "电饭煲技术", value: "高频 IH + 1.8mm 纯铜内胆" },
      { label: "扫地机器人导航", value: "360° 激光 + AI 建图" },
      { label: "机器人吸力", value: "5,000-8,000 Pa（行业标准 2,500）" },
      { label: "空气净化器 CADR", value: "400-600 立方米/小时（小型标准 300）" },
      { label: "HEPA 滤芯", value: "H13 —— 99.97% PM2.5" },
      { label: "料理机功率", value: "1500-2000W —— 碎冰 + 碎骨" },
      { label: "食物接触材质", value: "304 不锈钢 + Tritan 安全玻璃" },
      { label: "Wi-Fi", value: "60% 机型支持 —— 通过美的美居 App" },
      { label: "标准", value: "GB 4706.1 + IEC 60335-2-15" },
      { label: "质保", value: "机身 1-2 年" },
      { label: "平均寿命", value: "5-8 年" },
      { label: "配件供应", value: "停产后至少 7 年" },
    ],
    manufacturing: COMMON_MFG,
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: COMMON_CERTS,
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🍚",
        title: "IH 纯铜内胆电饭煲",
        desc: "口感比铝内胆好 30%。日本评测小组评分 8.5/10（福库电饭煲水准）。",
      },
      {
        icon: "🤖",
        title: "AI 激光机器人 5000Pa",
        desc: "吸力是行业标准的 2 倍。多层 3D 地图。自动洗拖布 + 倒垃圾。",
      },
      {
        icon: "💨",
        title: "空气净化器 HEPA H13 99.97%",
        desc: "过滤 PM2.5 + 甲醛 + 病毒。适合河内冬季高污染。",
      },
      {
        icon: "📦",
        title: "300+ SKU 丰富品类",
        desc: "一个品牌覆盖厨房 + 客厅 + 卧室。购买方便 + 插座通用。",
      },
    ],
    projectShowcase: [
      "北京幼儿园 —— 300+ 台教室空气净化器",
      "字节跳动深圳办公室 —— 500+ 台食堂电饭煲 + 电水壶",
      "中国星巴克连锁 —— 商用咖啡萃取机",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── COLMO Premium AI sub-brand ────────────────────────────────
  "COLMO": {
    story:
      "标语：「AI for the new luxury class」—— 为新精英阶层而生的 AI。\n\nCOLMO 是美的集团最高端的子品牌 —— 对标三星 Bespoke + LG Signature。2018 年推出，定位「智慧奢华」，搭载自研 Hi-Si 7nm AI 芯片、识别手势 + 语音的 AI 摄像头、高端材质（拉丝金、自修复涂层、316 医疗级不锈钢）。\n\n由 Tony Chi（柏悦 Park Hyatt + 文华东方酒店设计工作室主理人）操刀设计。每件产品都是独立的设计作品，连续 5 年斩获 Red Dot Design + iF 金奖。",
    heritage:
      "自 2020 年起获 Hi-Si AI 芯片使用权。自 2018 年起与 Tony Chi 工作室合作。斩获 12 项 Red Dot + iF + Good Design Award 国际设计大奖。",
    technicalSpecs: [
      { label: "AI 芯片", value: "Hi-Si 7nm —— 美的佛山 AI 中心研发" },
      { label: "识别摄像头", value: "8 人 + 100 种手势 + 20 种身体状态" },
      { label: "噪音", value: "< 18 dB 睡眠 —— 奢华品类中最静音" },
      { label: "Wi-Fi", value: "Wi-Fi 6 + Matter + Apple HomeKit + 蓝牙 5.2" },
      { label: "外壳材质", value: "拉丝金 + 自修复纳米涂层" },
      { label: "自修复涂层", value: "划痕在室温下 24 小时内自动修复" },
      { label: "显示", value: "LED 点阵 + 21 英寸 OLED + 全屏触控" },
      { label: "语音控制", value: "中文 + 英文 + 越南语（即将支持）" },
      { label: "机身质保", value: "5 年 —— 行业标准的 2.5 倍" },
      { label: "AI 部件质保", value: "10 年" },
      { label: "服务", value: "专属 7×24 管家服务 —— 不经热线" },
      { label: "设计寿命", value: "15-20 年" },
    ],
    manufacturing: [
      ...COMMON_MFG,
      "Tony Chi 工作室纽约设计中心 + 佛山工作室",
      "专属装配线 —— 全系列年产仅 50,000 台",
      "高端材质：真镀拉丝金 + 德国纳米涂层",
    ],
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [
      ...COMMON_CERTS,
      "Red Dot Design Award —— 5 年内 12 款产品获奖",
      "iF Design 金奖 —— 8 款产品",
      "日本 Good Design Award —— 6 款产品",
      "Apple HomeKit 认证",
      "Matter 1.2 认证",
    ],
    packaging: [
      { label: "专属包装", value: "松木箱 + 5cm 泡沫 + 3 层收缩膜" },
      { label: "运输保险", value: "100% 赔付 + 7 天内优先换新" },
      { label: "起订量", value: "可在 20ft 或 40ft HQ 集装箱内混装 1 个 SKU" },
      { label: "每 20ft 装载量", value: "30-80 件（视旗舰机型尺寸而定）" },
      { label: "每 40ft HQ 装载量", value: "60-160" },
      { label: "管家配送", value: "专属司机 + 受 Tony Chi 培训的技师" },
    ],
    whyChoose: [
      {
        icon: "👑",
        title: "Tony Chi 工作室设计",
        desc: "与柏悦 + 文华东方酒店同一设计工作室。每件产品都是一件作品。",
      },
      {
        icon: "🤖",
        title: "自研 AI Hi-Si 7nm",
        desc: "美的集团最强 AI 芯片。摄像头可识别 8 人 + 100 种手势 + 20 种状态。",
      },
      {
        icon: "✨",
        title: "自修复涂层",
        desc: "划痕 24 小时内自然修复。柜门 10 年后依旧如新。",
      },
      {
        icon: "🛎️",
        title: "7×24 管家服务",
        desc: "不经热线。专属司机 + 技师。AI 部件质保 10 年。",
      },
    ],
    projectShowcase: [
      "北京王府井文华东方 —— 总统套房",
      "上海柏悦 —— 顶层公寓 + 总统套房",
      "河内 Vinhomes Riverside —— 豪华别墅（经 KGB Asia 引进）",
      "北京安缦 —— 全部 VIP 套房",
    ],
    faq: COMMON_FAQ_BASE,
  },

  // ─── Toshiba Premium 东芝 sub-brand（由美的运营） ──────────
  "东芝": {
    story:
      "标语：「Japanese craftsmanship, future-proof」—— 日本匠艺，经得起未来。\n\n东芝生活产品及服务公司（TLSC）自 2016 年起归美的集团所有 —— 美的以 5.37 亿美元从东芝公司收购 80.1% 股权。东芝保留品牌 + 日本技术，美的负责全球生产 + 供应链。\n\n东芝高端系列是东芝家电中最顶级的产品线 —— 包括 Wakasa Nagomi 冰箱（保鲜 14 天）、IH 5D 加热压力电饭煲、沸石洗碗机、316 医疗级不锈钢蒸烤箱。\n\n研发仍在东京实验室 —— 由东芝日本工程师负责技术。在 3 家工厂生产：日本若狭（旗舰）、中国佛山、泰国（出口东南亚）。",
    heritage:
      "东芝公司创立于 1875 年 —— 电气行业逾 150 年历史。2016 年被美的收购后，保留东京研发 + 日本若狭工厂。日本皇室家电供应商。",
    technicalSpecs: [
      { label: "研发中心", value: "东京实验室 —— 东芝日本工程师全职在岗" },
      { label: "旗舰工厂", value: "日本若狭 —— 生产最顶级产品线" },
      { label: "Wakasa Nagomi 技术", value: "保鲜 14 天 —— 日本传统漆艺工法" },
      { label: "寿司级 -3°C", value: "-3°C 肉鱼室不冻硬 —— 寿司级" },
      { label: "IH 5D 加热", value: "电饭煲 5 向加热 —— 唯东芝独有" },
      { label: "内胆", value: "7 层铜 2.0 mm —— 日本高端标准" },
      { label: "电饭煲压力", value: "1.4 atm —— 为日本米饭优化" },
      { label: "烤箱内腔不锈钢", value: "316 医疗级（行业标准 304）" },
      { label: "洗碗机噪音", value: "< 39 dB —— 日本超静音" },
      { label: "机身质保", value: "3 年" },
      { label: "压缩机 + 内胆质保", value: "10 年" },
      { label: "配件供应", value: "停产后至少 15 年（日本标准）" },
    ],
    manufacturing: [
      "东芝东京研发实验室 —— 东芝日本工程师全职在岗",
      "日本若狭旗舰工厂 —— 最顶级产品线",
      "中国佛山工厂（由美的运营）—— 中端产品线",
      "泰国工厂 —— 出口东南亚地区",
      "漆艺设计 —— 日本若狭工匠手工",
      "烤箱内腔采用 316 医疗级不锈钢 —— 30 年不锈",
    ],
    careGuide: COMMON_CARE,
    installation: COMMON_INSTALL,
    certifications: [
      ...COMMON_CERTS,
      "JIS C9335（日本标准）",
      "日本 PSE 标志",
      "日本皇室官方供应商",
      "日本 Good Design Award —— 15+ 款产品",
    ],
    packaging: COMMON_PACKAGING,
    whyChoose: [
      {
        icon: "🇯🇵",
        title: "东京研发实验室 —— 东芝日本工程师",
        desc: "技术仍源自日本。东芝日本工程师全职在岗。日本品质标准 + 美的供应链。",
      },
      {
        icon: "🐟",
        title: "Wakasa Nagomi 保鲜 14 天",
        desc: "日本传统漆艺工法。青菜放 14 天仍新鲜。-3°C 寿司级肉鱼室。",
      },
      {
        icon: "🍚",
        title: "东芝独有 IH 5D 加热",
        desc: "5 向加热 + 7 层铜内胆 + 1.4 atm 压力。日本米饭口感最佳 —— 获日本美食专家认可。",
      },
      {
        icon: "🏥",
        title: "316 医疗级不锈钢",
        desc: "烤箱内腔 + 水槽采用 316 不锈钢 —— 医院标准。30 年不锈。易清洁。",
      },
    ],
    projectShowcase: [
      "东京安缦 —— 全部客房 + 米其林餐厅",
      "东京柏悦 —— 米其林三星餐厅 Kozue 厨房",
      "在越南的日系酒店（Sojourn、Solaria）—— 东芝高端全套",
      "河内/胡志明高端寿司餐厅（Sasaya、Sushi Hokkaido）—— 东芝高端",
    ],
    faq: COMMON_FAQ_BASE,
  },
};

/** 辅助函数：获取单个产品的元数据。从 seriesOriginal 提取主系列前缀
 *  （如 "空调 · 家用" → "空调"，"COLMO · 空调" → "COLMO"）。 */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  // 匹配主前缀（" · " 或 " /" 或空格之前的部分）
  const prefix = seriesOriginal.split(/[·\/\s]/)[0].trim();
  return MIDEA_SERIES_META[prefix];
}
