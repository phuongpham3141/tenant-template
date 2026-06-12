/**
 * 喜万年 SYLVANIA（Feilo Sylvania）系列元数据 —— 产品详情页富文本。
 * 一份品牌通用元数据，供所有产品/解决方案系列共用（室内 LED 灯具、筒灯、面板、
 * 工业与体育馆照明、健康照明、智能控制、应急与能源方案）。
 * 资料来源：sylvania-group.com —— 始于 1901 年的国际照明集团 + 行业通用工程参数。
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
    "喜万年 SYLVANIA 是一束跨越百年的光 —— 从 1901 年第一支白炽灯丝点亮起，它就把光当作一门关于人、关于空间、关于效率的学问来打磨。今天的喜万年不再只是一盏灯，而是一整套从光源到光环境的专业语言：Concord Equinox 用一圈看不见中心光源的光晕抹平了暗顶，Optix 用高端防眩光学把开放办公的眩光压到 UGR 19 以下，Luminature 则把窗外的自然光「搬进」展厅与教室。对建筑师、照明设计师和工程方而言，喜万年提供的是一份可被计算、可被验收、可被长期信赖的光，而不是一时的亮度。当一座楼宇需要既省电又舒适、既体面又耐用的照明时，喜万年往往是那个被写进设计说明书的名字。",
  heritage:
    "拥有 120 多年历史，业务遍及欧洲、美洲、亚洲与非洲。在与上海飞乐音响集团合并、组建 Feilo Sylvania 集团之后，喜万年把成熟的西方照明技术与中国供应链能力合而为一，形成覆盖建筑、工业、零售、办公、教育与城市照明的完整产品矩阵 —— 既有可持续纸框灯具 OptiClip TERRA 这样的前沿创新，也有 SylSmart 智能平台与 Power 能源方案这样的体系化延伸。",
  technicalSpecs: [
    { label: "功率范围", value: "约 8W – 200W（按灯具型号与配光而定）" },
    { label: "光效", value: "典型 100 – 130 lm/W（OptiClip TERRA 等高效系列更优）" },
    { label: "色温", value: "3000K / 4000K / 6500K，Luminature 支持可调白光全光谱" },
    { label: "显色指数", value: "CRI 80 起步，CRI90+ 高显色可选（精准还原材质与肤色）" },
    { label: "防护等级", value: "室内 IP20 起，Helios 灯管气密封焊超过 IP68" },
    { label: "额定寿命", value: "约 50,000 小时起，OptiClip TERRA 达 100,000 小时（L80B10）" },
  ],
  manufacturing: [
    "国际照明集团 Feilo Sylvania —— 跨越多大洲的研发网络与制造基地，西方照明技术 + 中国供应链协同",
    "部分高端系列在欧洲生产，如 OptiClip TERRA 出自法国圣艾蒂安工厂，灯框采用 60% 经认证可持续纸材、可完全回收",
    "OptiClip TERRA 采用可拆卸双 LED 模块设计，相比同类钢框灯具生产碳排放降低约 80%、运输碳排放节省约 40%",
    "光学部件自研：从模块化反光罩、平面微棱镜扩散板（MPO）到非对称反光罩，按场景匹配配光与防眩",
    "SylSmart 数字平台遵循「设计即安全」（security by design）原则，每盏灯内置智能传感器、微处理器与存储，端侧即时处理",
  ],
  careGuide: [
    { title: "日常维护", desc: "LED 灯具寿命长、维护少；定期用干净软布清洁灯面与反光罩，保持出光效率，并按周期检查驱动器工作状态。" },
    { title: "智能系统", desc: "SylSmart 通过应用与数字平台配置和监控，可远程更新固件、设定排程与场景，并查看功率、照度与在场分析数据。" },
    { title: "应急自检", desc: "LiFeSafe 应急灯具具备 Self-Test / DALI Self-Test，自动检测电池与后备灯状态，按记录在电池衰减前更换，确保停电时 3 小时后备。" },
    { title: "环境清洁", desc: "洁净室（LiteGuard）与体育馆（Rocks）灯具表面易清洁，可按 EN 60598-1 要求擦拭消毒，不影响洁净度等级。" },
  ],
  installation: [
    "按应用场景选型：办公与教育重防眩与显色，工业与体育馆重抗冲击与耐用，零售与酒店重氛围，应急与能源按规范配置",
    "由具备资质的电气技术人员安装，正确接驳外置 LED 驱动与控制线路，确认电压、极性与接地",
    "嵌入式筒灯/面板按吊顶开孔尺寸预留，注意散热空间；Helios 灯管按直管荧光灯尺寸单端供电改造替换",
    "智能系统先分区、再组建蓝牙 Mesh 网状网络，通过移动应用完成绑定、调试与场景设定，支持免电池无线墙面开关",
    "竣工按工程标准做照明验收：核验照度（Lux）、防眩指数（UGR）、均匀度与色温一致性，并存档调试参数",
  ],
  certifications: [
    "CE 认证 —— 符合欧盟低电压（LVD）与电磁兼容（EMC）指令，满足 EN 60598-1 等照明安全标准",
    "CCC 中国强制性产品认证（按在华销售型号适用），符合国内电气安全要求",
    "能效认证 —— 高光效设计满足能效标识/能效等级要求，助力建筑节能与净零目标",
    "光生物安全 —— 依据 IEC/EN 62471 评估蓝光等危害，办公与教育场景低频闪、护眼舒适",
    "原厂质保 —— 视系列而定，OptiClip TERRA 提供 5 年质保，专业系列普遍提供长期质保承诺",
  ],
  packaging: [
    { label: "供应形式", value: "按项目或按产品系列供货，支持灯具 + 智能控制 + 服务的整体方案打包" },
    { label: "包装", value: "原厂纸箱独立包装，泡棉/护角防护，灯具与驱动配套，工程批量托盘缠膜运输" },
    { label: "交期", value: "常规型号备货快速发货，欧洲制造与定制配置随订单协商（参考工程项目排期）" },
    { label: "质保", value: "随系列而定，专业灯具普遍长期质保（如 OptiClip TERRA 5 年）" },
    { label: "增值服务", value: "随附 360 Services 与 SylSmart 数字平台，覆盖评估、实施、管理与售后" },
  ],
  whyChoose: [
    { icon: "💡", title: "120+ 年传承", desc: "全球最悠久、最具声誉的照明品牌之一，自 1901 年起把光做成一门专业。" },
    { icon: "🌍", title: "国际化体系", desc: "Feilo Sylvania 集团跨多大洲布局，西方照明技术结合中国供应链，稳定可靠。" },
    { icon: "👁️", title: "防眩高显色", desc: "高端光学把 UGR 压到 19 以下，CRI90+ 精准还原材质与肤色，久看不累眼。" },
    { icon: "🔗", title: "整套生态", desc: "从 LED 灯具到 SylSmart 智能控制、LiFeSafe 应急与 Power 能源，一站打通。" },
    { icon: "♻️", title: "可持续低碳", desc: "OptiClip TERRA 纸框可回收、碳排放大幅降低，助力建筑迈向净零目标。" },
  ],
  projectShowcase: [
    "办公与商业楼宇 —— 开放办公、会议室、大堂与零售空间的防眩高显色照明",
    "工业与物流 —— 厂房、仓库、数据中心及体育馆等大空间与严苛环境",
    "零售、酒店与教育 —— 高端陈列、客房氛围、教室与图书馆的健康光环境",
    "城市、应急与能源 —— 户外与公共照明、疏散应急及光伏储能与能源监测方案",
  ],
  faq: [
    { q: "喜万年 SYLVANIA 和 Feilo Sylvania 是什么关系？", a: "SYLVANIA 是始于 1901 年的国际照明品牌；现隶属 Feilo Sylvania 集团，系与上海飞乐音响集团合并后组建，融合西方照明技术与中国供应链。" },
    { q: "灯具的显色性和防眩表现如何？", a: "专业系列普遍提供 CRI90+ 高显色，搭配防眩光学，办公典型 UGR 低于 19，低频闪护眼，适合长时间用眼的办公、教育与零售陈列环境。" },
    { q: "喜万年有智能照明解决方案吗？", a: "有，SylSmart 平台覆盖 Standalone、Connected、Connected Pro 与 Energy，基于蓝牙 Mesh 无线组网，可远程控制、排程与能耗分析，并配 360 Services 数字服务。" },
    { q: "灯具寿命和质保是多久？", a: "LED 灯具额定寿命普遍 5 万小时起，OptiClip TERRA 达 10 万小时（L80B10）并提供 5 年质保；具体寿命与质保以对应系列规格为准。" },
    { q: "在越南有供应和工程支持吗？", a: "请联系华越供应链（Huayuesc）获取选型建议、报价与照明工程方案咨询，并对接产品供应与售后服务。" },
  ],
};
export function getSeriesMeta(_seriesOriginal?: string): SeriesMeta | undefined {
  return BRAND;
}
