import type { PartnerProduct } from "@/data/partners";

/**
 * Catalog Langhui 朗辉建材 — 来自 gdlanghui.com（国际站）的 6 款真实 ALC/AAC 板材产品。官方图片（已验证）。中文名称。
 */

export const LANGHUI_PRODUCTS: PartnerProduct[] = [
  // ─── AAC 砌块 ───────────────
  {
    model: "High Precision Autoclaved AeratedConcreate Blocks",
    slug: "aac-blocks",
    name: "朗辉高精度蒸压加气混凝土 AAC 砌块",
    nameOriginal: "High Precision Autoclaved AeratedConcreate Blocks",
    series: "AAC 砌块",
    seriesOriginal: "aac-blocks",
    desc: "蒸压加气混凝土 AAC 砌块，质轻、强度高，具有良好的隔热、隔音、防火、耐久及防渗性能。节能环保的建筑材料，施工便捷、成本低，表面美观且承载性能优良。",
    image: "/img/products/langhui/aac-blocks.png",
    specs: [{ k: "特性", v: "质轻、强度高、隔热、隔音" }, { k: "防火与耐久", v: "防火、耐久、抗冻、防渗、抗震" }, { k: "其他性能", v: "软化系数高、悬挂重物不开裂、环保、节能" }, { k: "品牌", v: "Langhui 朗辉 (Guangdong Langhui)" }, { k: "类型", v: "蒸压加气混凝土 ALC/AAC" }],
    applications: ["钢结构房屋的内外墙、楼板、屋面", "办公大楼、厂房、防火墙", "隔音墙及旧建筑加层改造"],
    sourceUrl: "https://gdlanghui.com/en/248.html",
  },
  // ─── 防火墙 ───────────────
  {
    model: "Firewalls",
    slug: "firewalls",
    name: "朗辉 ALC/AAC 防火墙板（包覆保护钢柱、钢梁）",
    nameOriginal: "Firewalls",
    series: "防火墙",
    seriesOriginal: "firewalls",
    desc: "朗辉采用 ALC/AAC 蒸压加气混凝土板的防火墙及包覆解决方案，用于包覆保护钢柱与钢梁。薄板安装于轻钢龙骨架上并以自钻螺钉固定，为钢结构形成质轻的防火、隔热、隔音保护层。",
    image: "/img/products/langhui/firewalls.png",
    specs: [{ k: "构造", v: "ALC/AAC 薄板安装于轻钢龙骨架，自钻螺钉固定（按技术图纸）" }, { k: "结构应用", v: "工字钢柱及圆钢柱的防火包覆" }, { k: "类型", v: "蒸压加气混凝土 ALC/AAC" }, { k: "品牌", v: "Langhui 朗辉 (Guangdong Langhui)" }],
    applications: ["钢结构柱、梁的防火包覆", "钢结构房屋、厂房的防火隔墙", "需防火隔热的办公大楼、工厂工程"],
    sourceUrl: "https://gdlanghui.com/en/250.html",
  },
  // ─── 楼板/屋面板 ───────────────
  {
    model: "Floor and roof panels",
    slug: "floor-roof-panels",
    name: "朗辉 ALC/AAC 蒸压加气混凝土楼板与屋面板",
    nameOriginal: "Floor and roof panels",
    series: "楼板/屋面板",
    seriesOriginal: "floor-roof-panels",
    desc: "朗辉 ALC/AAC 蒸压加气混凝土楼板与屋面板，用作混凝土工程及钢结构房屋的楼板、屋面结构。板材铺装于钢梁之上，以钢角码与化学锚栓连接，适合快速、轻质、灵活的施工。",
    image: "/img/products/langhui/floor-roof-panels.png",
    specs: [{ k: "品牌", v: "Langhui 朗辉 (Guangdong Langhui)" }, { k: "类型", v: "蒸压加气混凝土 ALC/AAC" }, { k: "结构应用", v: "楼板与屋面板" }, { k: "安装方式", v: "铺装于钢梁，以钢角码与 M12 化学锚栓连接" }],
    applications: ["钢结构房屋的楼板与屋面", "混凝土结构工程、办公大楼", "快速装配式施工的厂房"],
    sourceUrl: "https://gdlanghui.com/en/249.html",
  },
  // ─── ALC/AAC 墙板 ───────────────
  {
    model: "Autoclaved Lightweight Concrete",
    slug: "autoclaved-lightweight-concrete-panel",
    name: "朗辉 ALC/AAC 蒸压加气混凝土超薄墙板",
    nameOriginal: "Autoclaved Lightweight Concrete",
    series: "ALC/AAC 墙板",
    seriesOriginal: "autoclaved-lightweight-concrete-panel",
    desc: "朗辉 ALC/AAC 蒸压加气混凝土超薄墙板，现有 50mm 与 75mm 厚度可选。50mm 板适合快速施工，其他规格按供应需求协商确定。",
    image: "/img/products/langhui/autoclaved-lightweight-concrete-panel.png",
    specs: [{ k: "厚度", v: "50mm, 75mm" }, { k: "50mm 板", v: "用于快速施工（thin fast）" }, { k: "其他规格", v: "由供需双方协商确定" }, { k: "品牌", v: "Langhui 朗辉 (Guangdong Langhui)" }, { k: "类型", v: "蒸压加气混凝土 ALC/AAC" }],
    applications: ["钢结构房屋隔墙", "需快速、轻质施工的工程", "厂房、办公大楼"],
    sourceUrl: "https://gdlanghui.com/en/247.html",
  },
  {
    model: "Lightweight ultra-thin 50, 75mm AAC (ALC) concrete wall panels",
    slug: "lightweight-ultrathin-aac-panel",
    name: "朗辉 ALC/AAC 蒸压加气混凝土超薄墙板 50、75mm",
    nameOriginal: "Lightweight ultra-thin 50, 75mm AAC (ALC) concrete wall panels",
    series: "ALC/AAC 墙板",
    seriesOriginal: "lightweight-ultrathin-aac-panel",
    desc: "ALC/AAC 蒸压加气混凝土超薄墙板，质量轻，主要用于轻钢结构工程。朗辉拥有先进的板材生产线与生产工艺，已实现批量生产并大量出口至澳大利亚、日本、韩国。",
    image: "/img/products/langhui/lightweight-ultrathin-aac-panel.png",
    gallery: ["/img/products/langhui/lightweight-ultrathin-aac-panel-g1.jpg", "/img/products/langhui/lightweight-ultrathin-aac-panel-g2.jpg"],
    specs: [{ k: "厚度", v: "50mm, 75mm" }, { k: "特性", v: "超薄、质量轻" }, { k: "类型", v: "蒸压加气混凝土 ALC/AAC" }, { k: "品牌", v: "Langhui 朗辉 (Guangdong Langhui)" }],
    applications: ["轻钢结构房屋隔墙", "出口工程（澳大利亚、日本、韩国）", "办公大楼、厂房"],
    sourceUrl: "https://gdlanghui.com/en/246.html",
  },
  {
    model: "wallboard",
    slug: "wallboard",
    name: "朗辉 ALC/AAC 蒸压加气混凝土墙板",
    nameOriginal: "wallboard",
    series: "ALC/AAC 墙板",
    seriesOriginal: "wallboard",
    desc: "朗辉 ALC/AAC 蒸压加气混凝土墙板，用作工程的内外隔墙。板材采用卡接（clip/anchor）方式固定于梁与楼板，拼缝以水泥砂浆填补。",
    image: "/img/products/langhui/wallboard.png",
    gallery: ["/img/products/langhui/wallboard-g1.jpg"],
    specs: [{ k: "安装方式", v: "卡接（管卡）以 L=25mm 射钉及 M8 金属锚栓固定" }, { k: "拼缝处理", v: "以水泥砂浆填缝，再批刮腻子并涂刷内墙漆" }, { k: "品牌", v: "Langhui 朗辉 (Guangdong Langhui)" }, { k: "类型", v: "蒸压加气混凝土 ALC/AAC" }],
    applications: ["钢结构房屋内外隔墙", "厂房、办公大楼", "需快速施工、干法装配的工程"],
    sourceUrl: "https://gdlanghui.com/en/251.html",
  },
];