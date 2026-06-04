/**
 * Sylvania（Feilo Sylvania）元数据——详情页。
 * 一份品牌通用元数据，供所有产品/解决方案系列共用。
 * 来源：sylvania-group.com——始于 1901 年的国际照明集团。
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
    "Sylvania 是全球最悠久、最具声誉的照明品牌之一，起源于 1901 年。如今隶属 Feilo Sylvania 集团（在与上海飞乐音响集团合并之后），Sylvania 将西方照明技术与中国供应链相结合，提供全面的产品组合：室内与工业 LED 灯、智能照明（SylSmart）、应急照明（LiFeSafe）及能源解决方案（Power）。",
  heritage:
    "拥有 120 多年历史，业务遍及多个大洲（欧洲、美洲、亚洲、非洲）。产品组合覆盖各细分领域：建筑、工业、零售、办公及城市照明。",
  technicalSpecs: [
    { label: "品牌", value: "Sylvania / Feilo Sylvania" },
    { label: "成立", value: "1901 年（120 多年）" },
    { label: "范围", value: "LED 灯、智能照明、应急、能源" },
    { label: "运营", value: "跨多大洲——西方技术 + 中国供应链" },
  ],
  manufacturing: [
    "国际照明集团 Feilo Sylvania——跨多大洲的研发网络 + 工厂",
    "部分系列在欧洲生产（如 OptiClip TERRA——法国圣艾蒂安工厂）",
    "将西方照明技术与中国供应链相结合（飞乐）",
    "SylSmart 数字平台按「设计即安全」（security by design）原则设计",
  ],
  careGuide: [
    { title: "维护", desc: "LED 灯寿命长、维护少；按建议定期清洁表面并检查驱动器。" },
    { title: "智能系统", desc: "SylSmart 通过应用/数字平台配置与监控——可远程更新、排程与分析。" },
    { title: "应急", desc: "LiFeSafe 具备 Self-Test/DALI Self-Test 功能，可自动检测电池与后备灯。" },
  ],
  installation: [
    "按应用选择配置（办公、工业、零售、应急等）",
    "由合格电气技术人员安装；正确接驳驱动器与控制",
    "智能系统：分区、组网（mesh）并通过应用配置",
    "按工程标准进行照明验收（照度、防眩 UGR）",
  ],
  certifications: [
    "符合欧洲照明标准（EN 60598-1 等）",
    "ISO 14644-1 洁净室（LiteGuard 系列）",
    "应急符合 ISO7001 / BS3864（LiFeSafe 系列）",
    "符合国际集团标准的质量管理体系",
  ],
  packaging: [
    { label: "供应形式", value: "按项目 / 按产品系列" },
    { label: "解决方案", value: "灯具 + 智能控制 + 360 Services 服务" },
    { label: "质保", value: "视系列而定（如 OptiClip TERRA 质保 5 年）" },
  ],
  whyChoose: [
    { icon: "💡", title: "120+ 年传承", desc: "全球最悠久、最具声誉的照明品牌之一（始于 1901 年）。" },
    { icon: "🌍", title: "国际化", desc: "西方技术 + 中国供应链（Feilo Sylvania）。" },
    { icon: "🔗", title: "生态系统", desc: "从 LED 灯到智能照明、应急与能源。" },
  ],
  projectShowcase: ["办公与商业楼宇", "工业与物流", "零售、酒店与教育", "城市与户外照明"],
  faq: [
    { q: "Sylvania 和 Feilo Sylvania 是什么？", a: "Sylvania 是始于 1901 年的国际照明品牌；现隶属 Feilo Sylvania 集团，系与上海飞乐音响集团合并后形成。" },
    { q: "在越南有供应吗？", a: "请联系 Huayuesc，获取合适的供应方案与照明项目咨询。" },
    { q: "Sylvania 有智能照明解决方案吗？", a: "有——SylSmart 平台（Standalone/Connected/Connected Pro/Energy）以及 360 Services 数字服务。" },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
