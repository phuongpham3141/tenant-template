/**
 * 欧神诺 OCEANO 元数据 —— 产品详情页富文本。以 seriesOriginal（玉石色系）为键。
 * 来源：欧神诺 2025 秋季「中国玉」新品画册。欧神诺为帝欧家居旗下高端瓷砖/岩板品牌。
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

const CERTS = [
  "符合陶瓷砖国家标准 GB/T 4100 —— 吸水率、强度、耐磨等指标达标",
  "放射性核素限量 A 类 —— 可不受限制用于室内各类场所",
  "面层耐磨与防滑分级，按场景选用，兼顾美观与安全",
  "绿色建材导向 —— 大规格薄型化，减少资源消耗",
];
const MFG = [
  "欧神诺 OCEANO —— 帝欧家居旗下高端瓷砖 / 岩板品牌，专注大规格大理石瓷砖",
  "新一代「微雕肌理面」工艺：400 目超细干粒 + 三层施釉，纹理立体、触感温润如玉",
  "坯体加厚升级：900×1800mm 升至 12mm、1200×1600mm 升至 11mm，稳定耐用、平整度高",
  "数码对位技术实现「雕」的核心动作，凹凸与纹理图案精准同步，还原真实石质感",
];
const PACK = [
  { label: "包装", value: "按片 / 箱包装，按规格分装；大板木架加固出运" },
  { label: "起订量", value: "按托盘 / 集装箱计；可混装多花色" },
  { label: "运输防护", value: "大规格瓷砖木架 + 护角加固，防止运输磕碰开裂" },
  { label: "服务", value: "可提供选型样板与铺贴方案，工程下单前确认花色与规格" },
];
const INSTALL = [
  "基层须坚实、平整、洁净；大规格砖建议做找平层并控制空鼓",
  "采用瓷砖胶薄贴 / 背胶满浆工艺，确保大板满浆无空鼓",
  "按设计留缝或 A' 密缝铺贴，使用十字架与找平器控制高低差",
  "铺贴养护后做美缝处理；填缝前清理缝隙、按色卡选美缝剂",
];
const CARE = [
  { title: "日常清洁", desc: "中性清洁剂配合软布 / 拖把擦拭，亮光面避免硬物刮擦。" },
  { title: "防污养护", desc: "局部顽固污渍及时清理；厨卫区域注意防油防水垢。" },
  { title: "重物防护", desc: "搬运重物时做好垫护，避免边角磕碰与点状冲击。" },
  { title: "美缝维护", desc: "保持缝隙清洁干燥，美缝老化或污染时可重新处理。" },
];
const FAQ = [
  { q: "「中国玉」系列是什么？", a: "是欧神诺 2025 秋季推出的大理石瓷砖/岩板新品，以玄玉、白玉、青玉、赤玉、黄玉五大玉石色系演绎东方玉质美学，采用微雕肌理面工艺。" },
  { q: "有哪些规格与厚度？", a: "主推大规格，如 1200×2700mm、1200×1600mm、900×1800mm、800×2700mm、750×1500mm 等；坯体加厚至 11–12mm，平整稳定。" },
  { q: "可以用于室内吗？放射性如何？", a: "可以。产品放射性符合 A 类限量，可不受限制用于住宅、酒店、商业等室内空间的墙面与地面。" },
  { q: "在越南是否供货？", a: "请联系华越，获取适合项目的花色、规格、供货与铺贴方案咨询。" },
];

function mk(p: Pick<SeriesMeta, "story" | "heritage" | "technicalSpecs" | "whyChoose" | "projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}

const WHY_BRAND = { icon: "💎", title: "高端大理石瓷砖", desc: "欧神诺 OCEANO —— 帝欧家居旗下高端瓷砖品牌，专注大规格大理石瓷砖与岩板。" };
const WHY_TEXTURE = { icon: "🪨", title: "微雕肌理面", desc: "400 目超细干粒 + 三层施釉，纹理立体、触感温润如玉，告别冰冷塑料感。" };
const WHY_BIG = { icon: "📐", title: "大规格加厚坯体", desc: "1200×2700mm 等大板，坯体加厚 11–12mm，平整稳定、A' 密缝更服帖。" };

function jade(p: { story: string; heritage: string; color: string; faces: string; sizes: string; showcase: string[] }): SeriesMeta {
  return mk({
    story: p.story,
    heritage: p.heritage,
    technicalSpecs: [
      { label: "系列", value: "中国玉 · 大理石瓷砖 / 岩板" },
      { label: "色系", value: p.color },
      { label: "面层工艺", value: "微雕肌理面 · 400 目超细干粒 · 三层施釉" },
      { label: "纹理", value: p.faces },
      { label: "主推规格", value: p.sizes },
      { label: "坯体厚度", value: "11–12mm（大规格加厚坯体）" },
    ],
    whyChoose: [WHY_BRAND, WHY_TEXTURE, WHY_BIG, { icon: "🏛️", title: "东方玉质美学", desc: "以玉石入砖，纹理温润大气，适配高端住宅与酒店空间。" }],
    projectShowcase: p.showcase,
  });
}

export const OCEANO_SERIES_META: Record<string, SeriesMeta> = {
  "black-jade": jade({
    story:
      "玄玉，是「中国玉」系列里最沉静大气的一脉 —— 以咖、墨为主调，深色玉纹如夜潮翻涌、又如晨汐微澜，在大板之上铺展出江河奔流般的气韵。微雕肌理面让深色纹理不再冰冷反光，而是温润含蓄、深邃耐看；一石三纹理与一石六纹理的连纹设计，使大面积通铺时纹理灵动连贯，气势如虹。它适合需要稳重格调与高级感的空间，让一面墙成为厅堂的视觉中心。",
    heritage: "玄玉以深色玉纹诠释「静中有势」的东方审美，是欧神诺中国玉系列的气场担当。",
    color: "咖色 / 墨色 Brown · Black",
    faces: "一石三纹理（灵动连纹）/ 一石六纹理（连纹设计）",
    sizes: "1200×2700mm / 1200×1600mm",
    showcase: ["客厅电视与沙发背景墙", "酒店大堂与会所", "高端住宅地面通铺"],
  }),
  "white-jade": jade({
    story:
      "白玉，是「中国玉」系列中最清雅通透的一脉 —— 齐云、凝脂、冰肌，名字本身便写满了温润。雪白至浅灰的底色上，玉纹若隐若现，柔光肌理面带来如脂似玉的细腻触感，光线掠过时温柔不刺眼。它把空间衬得明亮、干净而高级，是现代极简与轻奢风格的百搭之选，无论墙面还是地面，都能营造通透舒展的留白美学。",
    heritage: "白玉以洁净通透的玉色，成为现代极简与轻奢空间的明亮底色。",
    color: "雪白 / 浅灰 Snow White · Light Grey",
    faces: "柔光肌理面，纹理细腻含蓄",
    sizes: "1200×1600mm / 900×1800mm / 750×1500mm 等",
    showcase: ["现代极简住宅", "轻奢风格客厅与卧室", "明亮通透的商业空间"],
  }),
  "sapphire-jade": jade({
    story:
      "青玉，是「中国玉」系列里最有书卷气的一脉 —— 琅琊、接天碧、玉沁笙莲，青灰与碧色之间藏着山水般的氤氲意境。柔润的青玉纹理如远山含黛、如碧水接天，为空间注入一份沉静雅致的东方诗意。它既能压得住大面积墙地通铺的气场，也能在留白处点出一抹清雅，适合追求格调与文化感的高端空间。",
    heritage: "青玉以青碧玉纹写就山水诗意，是中国玉系列中最具东方文人气质的色系。",
    color: "青灰 / 碧色 Sapphire Grey · Green",
    faces: "柔光 / 亮光肌理面，山水般连纹",
    sizes: "1200×2700mm / 800×2700mm / 750×1500mm 等",
    showcase: ["新中式与东方雅奢空间", "茶室、会所与酒店", "客厅与玄关背景墙"],
  }),
  "red-jade": jade({
    story:
      "赤玉，是「中国玉」系列里最浪漫灵动的一脉 —— 栖霞、胭脂绯、胭脂黛、芙蓉，粉、绯、黛交织如朝霞晚照、如花瓣轻染。绚丽却不张扬的玉色，为空间带来温暖而高级的情绪价值；细腻的纹理与柔润的光泽，让墙面如一幅写意花鸟。它适合需要个性与艺术感的空间，是设计师笔下的点睛之色。",
    heritage: "赤玉以霞色花纹演绎浪漫与艺术感，是中国玉系列中最具个性表达的色系。",
    color: "粉色 / 绯色 / 黛色 Pink · Rosy · Dark",
    faces: "亮光 / 柔光肌理面，霞彩花纹",
    sizes: "1200×2700mm / 1200×1600mm / 900×1800mm 等",
    showcase: ["设计师个性空间", "精品酒店与买手店", "客厅与卧室艺术背景墙"],
  }),
  "yellow-jade": jade({
    story:
      "黄玉，是「中国玉」系列里最温暖明媚的一脉 —— 天山金玉、天山雪玉、金篆玉，米黄、暖金的玉色如金辉映照、一步登天。温润的暖色调让空间倍感舒适与尊贵，金色玉纹延伸出大气格局；柔润肌理面在灯光下流转出低调的奢华，适合营造温馨、典雅而有品质感的居所与会客空间。",
    heritage: "黄玉以暖金玉色铺陈温润与尊贵，是中国玉系列中最具暖意与轻奢气质的色系。",
    color: "米黄 / 暖金 Cream Yellow · Warm Gold",
    faces: "亮光肌理面，暖金玉纹连纹",
    sizes: "1200×1600mm / 900×1800mm / 750×1500mm 等",
    showcase: ["温馨轻奢住宅", "会客厅与餐厅", "酒店客房与套房"],
  }),
};

/** 按 seriesOriginal（玉色系）获取元数据，缺省回退到 white-jade。 */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return OCEANO_SERIES_META[seriesOriginal.trim()] || OCEANO_SERIES_META["white-jade"];
}
