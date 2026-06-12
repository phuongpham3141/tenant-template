import type { PartnerProduct } from "@/data/partners";

/**
 * 光年地板 (Lumina Floor) 产品目录 —— 华越供应链旗下自营工厂青年地材品牌。
 * 以环保石塑 SPC 与高弹性 LVT 为核心；800+ 图案/颜色，多种厚度与耐磨层可选。
 * 资料来源：华越供应链-光年地板产品画册（中越双语版）。图片由画册逐页渲染。
 */

const SPC_SPECS = [
  { k: "类型", v: "SPC 石塑地板（石塑刚性基材）" },
  { k: "厚度", v: "4mm – 8mm" },
  { k: "背衬垫", v: "1.0 / 1.5 / 2.0mm EVA 或 IXPE 静音垫" },
  { k: "耐磨层", v: "0.2 / 0.3 / 0.5mm 透明 PVC" },
  { k: "安装方式", v: "锁扣（点击式）免胶安装" },
  { k: "环保等级", v: "E0 / E1 级" },
  { k: "适用场景", v: "住宅、公寓、办公、零售、轻商业" },
];
const LVT_SPECS = [
  { k: "类型", v: "LVT 多层弹性地板" },
  { k: "耐磨层", v: "0.2 / 0.3 / 0.5mm" },
  { k: "表面", v: "防滑处理 · 仿真木/石纹" },
  { k: "环保等级", v: "E0 / E1 级" },
  { k: "适用场景", v: "住宅、办公、医疗、教育、零售" },
];

export const LUMINA_PRODUCTS: PartnerProduct[] = [
  // ─── SPC 石塑锁扣地板 ───────────────────────────────
  {
    model: "771476",
    slug: "lumina-spc-771476",
    name: "光年 SPC 石塑锁扣地板 771476",
    nameOriginal: "LuminaFloor SPC 771476",
    series: "SPC 石塑地板",
    seriesOriginal: "spc",
    desc: "环保石塑（SPC）锁扣地板，刚性基材、即装即用，防水耐磨，800+ 花色任选。",
    longDesc:
      "771476 是光年地板 SPC 系列的人气基础款。钙粉与高纯 PVC 复合的刚性基材，让它生来防水、不怕潮、不易变形；表层高清装饰膜还原真实木纹肌理，UV 耐磨涂层抗刮抗踩。单边锁扣免胶点击安装，旧瓷砖或旧地坪找平后即可直铺，开荒到入住更快一步。无论租房改造还是新居整装，都能用友好的预算拍出高级质感。",
    image: "/img/products/lumina/page-4.png",
    features: ["刚性石塑基材，防水抗变形", "高清木纹装饰膜，质感逼真", "免胶锁扣，旧地面可直铺", "UV 耐磨层，抗刮耐踩"],
    applications: ["公寓 / 小户型整屋", "出租房快速翻新", "办公室与共享空间", "零售与展厅地面"],
    specs: SPC_SPECS,
    sourceUrl: "",
  },
  {
    model: "771478",
    slug: "lumina-spc-771478",
    name: "光年 SPC 石塑锁扣地板 771478",
    nameOriginal: "LuminaFloor SPC 771478",
    series: "SPC 石塑地板",
    seriesOriginal: "spc",
    desc: "SPC 石塑锁扣地板，仿真木/石纹表层，耐刮耐磨、防水防潮，适合大面积铺装。",
    longDesc:
      "771478 主打沉稳耐看的中性色木纹，是客厅、卧室大面积通铺的安心之选。刚性基材尺寸稳定，冷热环境下不易热胀冷缩；搭配 EVA / IXPE 静音背垫，脚步声更轻、踩感更扎实。锁扣错缝拼装、轻敲到位，接缝平整自然，连成一片如整木地坪般大气。",
    image: "/img/products/lumina/page-5.png",
    features: ["中性木纹，百搭耐看", "尺寸稳定，冷热不变形", "静音背垫，脚感舒适", "大面积通铺接缝自然"],
    applications: ["客厅 / 卧室通铺", "公寓与精装房", "民宿与酒店客房", "办公开放区"],
    specs: SPC_SPECS,
    sourceUrl: "",
  },
  {
    model: "771497",
    slug: "lumina-spc-771497",
    name: "光年 SPC 石塑锁扣地板 771497",
    nameOriginal: "LuminaFloor SPC 771497",
    series: "SPC 石塑地板",
    seriesOriginal: "spc",
    desc: "SPC 石塑锁扣地板，时尚潮流花色，环保无醛添加，绿色家装首选。",
    longDesc:
      "771497 为追求个性的年轻空间而生 —— 大胆的纹理与潮流配色，让地面也成为设计的一部分。E0 / E1 级环保基材，无醛添加，入住更安心；商用级耐磨层让它既扛得住高频走动，又保持长久如新。咖啡馆、买手店、工作室用它打底，氛围感瞬间拉满。",
    image: "/img/products/lumina/page-6.png",
    features: ["潮流纹理，设计感强", "E0/E1 环保无醛添加", "商用级耐磨，耐久如新", "防水易洁，打理省心"],
    applications: ["咖啡馆 / 买手店", "工作室与展陈空间", "潮流零售门店", "年轻家居个性空间"],
    specs: SPC_SPECS,
    sourceUrl: "",
  },
  // ─── LVT 弹性地板 ───────────────────────────────
  {
    model: "771500",
    slug: "lumina-lvt-771500",
    name: "光年 LVT 弹性地板（干式背衬）",
    nameOriginal: "LuminaFloor LVT",
    series: "LVT 弹性地板",
    seriesOriginal: "lvt",
    desc: "高弹性 LVT 地板，脚感舒适、静音耐磨，干式背衬款配合自流平基面铺装。",
    longDesc:
      "光年 LVT 干式背衬款以「柔」取胜 —— 多层弹性结构带来温润脚感与出色静音，踩上去安静而舒适。2mm / 3mm 超薄设计不抬高地面、不卡门，是旧房翻新与局部改造的友好之选。配合平整自流平基面满胶铺贴，平整服帖、经久耐用，商用级耐磨层让它在高频场景里依旧从容。",
    image: "/img/products/lumina/page-7.png",
    features: ["多层弹性结构，静音脚感", "2–3mm 超薄不卡门", "商用级耐磨易洁", "柔韧防滑更安全"],
    applications: ["医院 / 诊所 / 养老机构", "学校与培训中心", "办公室与开放工位", "零售连锁门店"],
    specs: [{ k: "厚度", v: "2mm / 3mm（干式背衬）" }, ...LVT_SPECS],
    sourceUrl: "",
  },
  {
    model: "771518",
    slug: "lumina-lvt-771518",
    name: "光年 LVT 自粘弹性地板 771518",
    nameOriginal: "LuminaFloor LVT 771518",
    series: "LVT 弹性地板",
    seriesOriginal: "lvt",
    desc: "自粘式 LVT 弹性地板，撕膜即贴、施工快捷，耐磨防滑、易清洁。",
    longDesc:
      "771518 是「快装党」的福音 —— 背面自带胶层，撕膜即贴、滚压排气，一个人一下午就能翻新一间房，无需专业师傅。超薄轻盈、裁切方便，遇到管线与墙角也能灵活处理。耐磨防滑的表层让它既适合居家翻新，也能胜任办公与商铺的快速改造。",
    image: "/img/products/lumina/page-8.png",
    features: ["自粘背胶，撕膜即贴", "免专业工具，DIY 友好", "超薄轻盈，裁切灵活", "耐磨防滑，易清洁"],
    applications: ["出租房快速翻新", "办公室局部改造", "商铺快装", "DIY 家居改造"],
    specs: [{ k: "厚度", v: "2mm / 3mm（自粘式）" }, ...LVT_SPECS],
    sourceUrl: "",
  },
  {
    model: "771560",
    slug: "lumina-lvt-771560",
    name: "光年 LVT 锁扣弹性地板 771560",
    nameOriginal: "LuminaFloor LVT 771560",
    series: "LVT 弹性地板",
    seriesOriginal: "lvt",
    desc: "锁扣式 LVT 弹性地板（4mm / 5mm 点击式），免胶安装、可重复拆装，脚感舒适。",
    longDesc:
      "771560 把 LVT 的舒适脚感与锁扣的便捷合二为一 —— 4mm / 5mm 点击锁扣结构，免胶安装、可重复拆装，搬家也能带走重铺。多层弹性体兼顾静音与耐用，表面防滑，适合家有老人小孩的居家空间，也适合需要灵活维护、可单片更换的商业场所。",
    image: "/img/products/lumina/page-9.png",
    features: ["点击锁扣，免胶免胶水味", "可重复拆装，灵活复用", "弹性静音，脚感舒适", "可单片更换，维护便捷"],
    applications: ["家有老人小孩的住宅", "办公室与会议空间", "连锁零售与展厅", "需灵活维护的商业地面"],
    specs: [{ k: "厚度", v: "4mm / 5mm（点击锁扣式）" }, ...LVT_SPECS],
    sourceUrl: "",
  },
];
