/**
 * 东芝家电品牌元数据。
 *
 * 来源说明 —— 仅使用真实、可核实的信息：
 *   • 东芝公司于 1875 年在日本成立
 *   • 家电业务（Toshiba Lifestyle Products & Services）于 2016 年
 *     由美的集团以 5.37 亿美元收购 80.1% 股权，保留东京研发 +
 *     品牌 + 日本品质标准
 *   • 在越南由 Toshiba Lifestyle 正品分销（toshiba-lifestyle.com/vn）
 *
 * 不杜撰各系列的技术参数表 —— 每款产品已有从 PDP 抓取的真实参数
 * + 真实描述。元数据仅提供品牌故事 + 服务承诺 + 运营 FAQ（符合 B2B 实际）。
 * 品牌故事为所有东芝产品线通用（technicalSpecs 留空 → 页面显示真实参数）。
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

const TOSHIBA_BRAND: SeriesMeta = {
  story:
    "标语：「Leading Innovation」—— 引领创新。\n\n东芝公司于 1875 年在日本成立 —— 是日本历史最悠久、最具声誉的科技集团之一，拥有逾 150 年历史。东芝是诸多开创性发明的鼻祖：日本首台冰箱、洗衣机、微波炉。\n\n2016 年，美的集团以 5.37 亿美元收购东芝家电业务（Toshiba Lifestyle Products & Services）80.1% 股权。根据协议，东芝保留品牌、核心技术与日本品质标准；美的负责大规模生产与全球供应链 —— 形成「日本技术 + 中国制造」的组合，价格更具优势。\n\n在越南，东芝通过 Toshiba Lifestyle 正品分销，产品线齐全：空调、冰箱、洗衣机、干衣机、厨房设备、净水器及家居用品 —— 聚焦保鲜技术、节能变频与日式精湛工艺。",
  heritage:
    "逾150年的日本技术传承（始于1875年）。日本首台冰箱+洗衣机+微波炉的鼻祖。2016年美的接管后研发仍设于东京——确保日本品质与核心技术。",
  technicalSpecs: [],
  manufacturing: [
    "东芝公司成立于1875年——逾150年日本技术历史",
    "家电业务自2016年起由美的集团运营（持股80.1%）",
    "研发保留于东京实验室——日本技术与品质标准",
    "通过美的全球工厂体系+供应链进行大规模生产",
    "核心技术：节能变频、保鲜（NaturePURE、PureBIO）、精湛工艺",
  ],
  careGuide: [
    {
      title: "日常清洁",
      desc: "用软布+温水+pH中性温和清洁剂擦拭。切勿直接向控制面板或电源插口喷水。",
    },
    {
      title: "定期清洁",
      desc: "每3个月一次：清洁滤网（空调、洗衣机、净水器、吸尘器）。东芝设计了便于拆装的机制。",
    },
    {
      title: "技术保养",
      desc: "每12个月：致电东芝售后中心（toshiba-lifestyle.com/vn/support）检查空调制冷剂、清洁内腔、校准传感器。质保期内免费。",
    },
    {
      title: "原厂配件",
      desc: "使用东芝原厂配件与部件以保持性能+质保。请联系服务中心或华越订购。",
    },
  ],
  installation: [
    "安装前请仔细阅读使用说明（双语手册）",
    "由东芝授权服务中心技师安装",
    "通电前检查电压 + 接地 + 稳压器功率",
    "冰箱+空调安装后请等待24小时再通电（待制冷剂稳定）",
    "请保留发票+质保卡以享受原厂质保政策",
  ],
  certifications: [
    "正宗日本品牌——东芝公司（始于1875年）",
    "在越南由Toshiba Lifestyle正品分销",
    "符合越南工贸部规定的能效标签",
    "日本品质标准——东京研发",
  ],
  packaging: [
    { label: "标准包装", value: "纸箱+泡沫+防撞打包带" },
    { label: "运输保障", value: "运输导致的损坏予以赔付" },
    { label: "进口起订量", value: "1 个 20ft / 40ft HQ 集装箱 —— 可混装 SKU" },
    { label: "仓储保管", value: "干燥处，避免日晒，按建议堆叠" },
  ],
  whyChoose: [
    {
      icon: "🇯🇵",
      title: "源自1875年的日本技术",
      desc: "逾150年传承。东京研发。日本首台冰箱+洗衣机+微波炉的鼻祖。",
    },
    {
      icon: "🏭",
      title: "由美的集团运营",
      desc: "自2016年起，美的的生产实力+供应链使价格更具优势，同时保持日本品质。",
    },
    {
      icon: "❄️",
      title: "保鲜技术+变频",
      desc: "NaturePURE、PureBIO除味杀菌；变频节能；日式精湛工艺。",
    },
    {
      icon: "🛡️",
      title: "越南原厂质保",
      desc: "通过Toshiba Lifestyle正品分销+华越DDP质保。原厂配件齐全。",
    },
  ],
  projectShowcase: [
    "通过Toshiba Lifestyle越南体系全国正品分销",
    "产品线齐全：空调、冰箱、洗衣机、灶具、净水",
    "适合需要日系高端品牌的公寓+酒店+联排住宅项目",
    "华越为大批量项目提供DDP进口+安装解决方案",
  ],
  faq: [
    {
      q: "美的收购后东芝还是日本品牌吗？",
      a: "是。美的于2016年收购家电业务80.1%股权，但东芝保留品牌、东京研发、核心技术与日本品质标准。美的负责大规模生产+供应链→价格更具优势而品质仍是日本水准。",
    },
    {
      q: "东芝在越南的质保如何？",
      a: "通过Toshiba Lifestyle正品分销，设有全国售后中心（toshiba-lifestyle.com/vn/support）。华越+服务中心联合上门质保。每款产品详情页均有来源链接，可查询官方参数。",
    },
    {
      q: "是否提供送货+上门安装+越南DDP报价？",
      a: "是。华越一站式服务：正规进口→河内/胡志明/岘港仓库→上门送货+安装。无论单件还是整柜项目，均在24小时内提供DDP报价（含税+运费）。",
    },
    {
      q: "起订量+交货周期？",
      a: "起订量：1个20ft集装箱（可混装SKU）。现货：7-10个工作日。按项目排产：30-45天。大型项目订单可享优先交期。",
    },
    {
      q: "页面上的技术参数准确吗？",
      a: "所有产品名称+描述+参数+图片均直接取自Toshiba Lifestyle越南官网（每个详情页均有「来源」链接）。不修改、不杜撰。",
    },
  ],
};

/** 所有东芝产品线共用品牌故事（品牌统一）。 */
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return TOSHIBA_BRAND;
}
