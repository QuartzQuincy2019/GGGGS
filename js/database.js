// database.js
// 数据库。储存与游戏角色及属性、卡池配置相关信息。

/**
 * 仿枚举类型
 */
var Element = {
    anemo: 1,
    geo: 2,
    electro: 3,
    dendro: 4,
    hydro: 5,
    pyro: 6,
    cryo: 7
}

var WeaponType = {
    sword: 1,
    catalyst: 2,
    polearm: 3,
    claymore: 4,
    bow: 5
}

var ELEMENT_NAME = ["anemo", "geo", "electro", "dendro", "hydro", "pyro", "cryo"];
var ELEMENT_NAMECHS = ["风", "岩", "雷", "草", "水", "火", "冰"];
var ELEMENT_NUMBER = [1, 2, 3, 4, 5, 6, 7];
var STAR_NUMBER = [4, 5];
var STAR_NAME = ["R", "S"];

class Character {
    name;//角色识别名（不是英文名）
    star;//角色星数
    pfile;//Charaicon对应文件路径
    wfile;//WishArtworks对应文件路径
    signature;//角色称号
    element;//角色元素
    nameChs;//角色简体中文名
    /**
     * 
     * @param {String} name 
     * @param {Number} star 
     * @param {String} signature
     */
    constructor(name, star, signature, element, nameChs) {
        this.name = name;
        this.star = star;
        this.pfile = './img/p_' + this.name + '.png';
        this.wfile = './img/w_' + this.name + '.png';
        this.signature = signature;
        this.element = element;
        this.nameChs = nameChs;
    }
}

class Weapon {
    name;
    star;
    weaponFile;
    weaponType;
    nameChs;
    constructor(name, star, weaponType, nameChs) {
        this.name = name;
        this.star = star;
        this.weaponType = weaponType;
        this.weaponFile = './img/weapon/' + this.star + '/Weapon_' + this.name + '.png';
        this.nameChs = nameChs;
    }
}

/**
 * 角色列表
 */
var CHARACTER_LIST = [
    //mondstadt
    new Character("jean", 5, "蒲公英骑士", Element.anemo, "琴"),
    new Character("amber", 4, "飞行冠军", Element.pyro, "安柏"),
    new Character("lisa", 4, "蔷薇魔女", Element.electro, "丽莎"),
    new Character("kaeya", 4, "寒风剑士", Element.cryo, "凯亚"),
    new Character("barbara", 4, "闪耀偶像", Element.hydro, "芭芭拉"),
    new Character("diluc", 5, "晨曦的暗面", Element.pyro, "迪卢克"),
    new Character("razor", 4, "奔狼领的传说", Element.electro, "雷泽"),
    new Character("venti", 5, "风色诗人", Element.anemo, "温迪"),
    new Character("klee", 5, "逃跑的太阳", Element.pyro, "可莉"),
    new Character("bennett", 4, "命运试金石", Element.pyro, "班尼特"),
    new Character("noelle", 4, "未授勋之花", Element.geo, "诺艾尔"),
    new Character("fischl", 4, "断罪皇女！！", Element.electro, "菲谢尔"),
    new Character("sucrose", 4, "无害甜度", Element.anemo, "砂糖"),
    new Character("mona", 5, "星天水镜", Element.hydro, "莫娜"),
    new Character("diona", 4, "猫尾特调", Element.cryo, "迪奥娜"),
    new Character("albedo", 5, "白垩之子", Element.geo, "阿贝多"),
    new Character("rosaria", 4, "棘冠恩典", Element.cryo, "罗莎莉亚"),
    new Character("eula", 5, "浪花骑士", Element.cryo, "优菈"),
    new Character("mika", 4, "晴霜的标绘", Element.cryo, "米卡"),
    //liyue
    new Character("xiao", 5, "靖妖傩舞", Element.anemo, "魈"),
    new Character("beidou", 4, "无冕的龙王", Element.electro, "北斗"),
    new Character("ningguang", 4, "群玉阁之主", Element.geo, "凝光"),
    new Character("xiangling", 4, "万民百味", Element.pyro, "香菱"),
    new Character("xingqiu", 4, "少年春衫薄", Element.hydro, "行秋"),
    new Character("chongyun", 4, "雪融有踪", Element.cryo, "重云"),
    new Character("keqing", 5, "霆霓快雨", Element.electro, "刻晴"),
    new Character("qiqi", 5, "冻冻回魂夜", Element.cryo, "七七"),
    new Character("zhongli", 5, "尘世闲游", Element.geo, "钟离"),
    new Character("xinyan", 4, "燥热旋律", Element.pyro, "辛焱"),
    new Character("ganyu", 5, "循循守月", Element.cryo, "甘雨"),
    new Character("hutao", 5, "雪霁梅香", Element.pyro, "胡桃"),
    new Character("yanfei", 4, "智明无邪", Element.pyro, "烟绯"),
    new Character("shenhe", 5, "孤辰茕怀", Element.cryo, "申鹤"),
    new Character("yunjin", 4, "红毹婵娟", Element.geo, "云堇"),
    new Character("yelan", 5, "兰生幽谷", Element.hydro, "夜兰"),
    new Character("yaoyao", 4, "仙蕊玲珑", Element.dendro, "瑶瑶"),
    new Character("baizhu", 5, "遵生合和", Element.dendro, "白术"),
    new Character("xianyun", 5, "鸾音鹤信", Element.anemo, "闲云"),
    new Character("gaming", 4, "骏猊頕首", Element.pyro, "嘉明"),
    //inazuma
    new Character("ayaka", 5, "白鹭霜华", Element.cryo, "神里绫华"),
    new Character("kazuha", 5, "红叶逐荒波", Element.anemo, "枫原万叶"),
    new Character("yoimiya", 5, "琉焰华舞", Element.pyro, "宵宫"),
    new Character("sayu", 4, "忍里之貉", Element.anemo, "早柚"),
    new Character("shogun", 5, "一心净土", Element.electro, "雷电将军"),
    new Character("sara", 4, "黑羽鸣镝", Element.electro, "九条裟罗"),
    new Character("kokomi", 5, "真珠之智", Element.hydro, "珊瑚宫心海"),
    new Character("thoma", 4, "渡来介者", Element.pyro, "托马"),
    new Character("gorou", 4, "戎犬锵锵", Element.geo, "五郎"),
    new Character("itto", 5, "花坂豪快", Element.geo, "荒泷一斗"),
    new Character("yae", 5, "浮世笑百姿", Element.electro, "八重神子"),
    new Character("ayato", 5, "磐祭叶守", Element.hydro, "神里绫人"),
    new Character("shinobu", 4, "烦恼刈除", Element.electro, "久岐忍"),
    new Character("heizo", 4, "心朝乂安", Element.anemo, "鹿野院平藏"),
    new Character("kirara", 4, "檐宇猫游", Element.dendro, "绮良良"),
    new Character("chiori", 5, "鸣雷的裁锦师", Element.geo, "千织"),
    //sumeru
    new Character("tighnari", 5, "浅蔚轻行", Element.dendro, "提纳里"),
    new Character("collei", 4, "萃念初蘖", Element.dendro, "柯莱"),
    new Character("dori", 4, "梦园藏金", Element.electro, "多莉"),
    new Character("cyno", 5, "缄秘的裁遣", Element.electro, "赛诺"),
    new Character("candace", 4, "浮金的誓愿", Element.hydro, "坎蒂丝"),
    new Character("nilou", 5, "莲光落舞筵", Element.hydro, "妮露"),
    new Character("nahida", 5, "白草净华", Element.dendro, "纳西妲"),
    new Character("layla", 4, "绮思晚星", Element.cryo, "莱依拉"),
    new Character("wanderer", 5, "久世浮倾", Element.anemo, "流浪者"),
    new Character("faruzan", 4, "机逐封秘", Element.anemo, "珐露珊"),
    new Character("alhaitham", 5, "诲韬诤言", Element.dendro, "艾尔海森"),
    new Character("dehya", 5, "炽鬃之狮", Element.pyro, "迪希雅"),
    new Character("kaveh", 4, "天穹之镜", Element.dendro, "卡维"),
    //fontaine
    new Character("lyney", 5, "惑光幻戏", Element.pyro, "林尼"),
    new Character("lynette", 4, "丽影绮行", Element.anemo, "琳妮特"),
    new Character("freminet", 4, "浅怀遐梦", Element.cryo, "菲米尼"),
    new Character("neuvillette", 5, "谕告的潮音", Element.hydro, "那维莱特"),
    new Character("wriothesley", 5, "寂罪的密使", Element.cryo, "莱欧斯利"),
    new Character("furina", 5, "不休独舞", Element.hydro, "芙宁娜"),
    new Character("charlotte", 4, "朗镜索真", Element.cryo, "夏洛蒂"),
    new Character("navia", 5, "明花蔓舵", Element.geo, "娜维娅"),
    new Character("chevreuse", 4, "明律决罚", Element.pyro, "夏沃蕾"),
    new Character("tartaglia", 5, "「公子」", Element.hydro, "达达利亚")
];

var characterMap = {};
for (var i = 0; i < CHARACTER_LIST.length; i++) {
    var character = CHARACTER_LIST[i];
    characterMap[character.name] = character;
}

var CHARACTER_NAMES = [];
for (var i = 0; i < CHARACTER_LIST.length; i++) {
    CHARACTER_NAMES.push(CHARACTER_LIST[i].name);
}

var WEAPON_LIST = [
    // 5 star
    new Weapon("Amos'_Bow", 5, WeaponType.bow, "阿莫斯之弓"),
    new Weapon("Aqua_Simulacra", 5, WeaponType.bow, "若水"),
    new Weapon("Aquila_Favonia", 5, WeaponType.sword, "风鹰剑"),
    new Weapon("A_Thousand_Floating_Dreams", 5, WeaponType.catalyst, "千夜浮梦"),
    new Weapon("Beacon_of_the_Reed_Sea", 5, WeaponType.claymore, "苇海信标"),
    new Weapon("Calamity_Queller", 5, WeaponType.polearm, "息灾"),
    new Weapon("Cashflow_Supervision", 5, WeaponType.catalyst, "金流监督"),
    new Weapon("Crane's_Echoing_Call", 5, WeaponType.catalyst, "鹤鸣余音"),
    new Weapon("Elegy_for_the_End", 5, WeaponType.bow, "终末嗟叹之诗"),
    new Weapon("Engulfing_Lightning", 5, WeaponType.polearm, "薙草之稻光"),
    new Weapon("Everlasting_Moonglow", 5, WeaponType.catalyst, "不灭月华"),
    new Weapon("Freedom-Sworn", 5, WeaponType.sword, "苍古自由之誓"),
    new Weapon("Haran_Geppaku_Futsu", 5, WeaponType.sword, "波乱月白经津"),
    new Weapon("Hunter's_Path", 5, WeaponType.bow, "猎人之径"),
    new Weapon("Jadefall's_Splendor", 5, WeaponType.catalyst, "碧落之珑"),
    new Weapon("Kagura's_Verity", 5, WeaponType.catalyst, "神乐之真意"),
    new Weapon("Key_of_Khaj-Nisut", 5, WeaponType.sword, "圣显之钥"),
    new Weapon("Light_of_Foliar_Incision", 5, WeaponType.sword, "裁叶萃光"),
    new Weapon("Lost_Prayer_to_the_Sacred_Winds", 5, WeaponType.catalyst, "四风原典"),
    new Weapon("Memory_of_Dust", 5, WeaponType.catalyst, "尘世之锁"),
    new Weapon("Mistsplitter_Reforged", 5, WeaponType.sword, "雾切之回光"),
    new Weapon("Polar_Star", 5, WeaponType.bow, "冬极白星"),
    new Weapon("Primordial_Jade_Cutter", 5, WeaponType.sword, "磐岩结绿"),
    new Weapon("Primordial_Jade_Winged-Spear", 5, WeaponType.polearm, "和璞鸢"),
    new Weapon("Redhorn_Stonethresher", 5, WeaponType.claymore, "赤角石溃杵"),
    new Weapon("Skyward_Atlas", 5, WeaponType.catalyst, "天空之卷"),
    new Weapon("Skyward_Blade", 5, WeaponType.sword, "天空之刃"),
    new Weapon("Skyward_Harp", 5, WeaponType.bow, "天空之翼"),
    new Weapon("Skyward_Pride", 5, WeaponType.claymore, "天空之傲"),
    new Weapon("Skyward_Spine", 5, WeaponType.polearm, "天空之脊"),
    new Weapon("Song_of_Broken_Pines", 5, WeaponType.claymore, "松籁响起之时"),
    new Weapon("Splendor_of_Tranquil_Waters", 5, WeaponType.sword, "静水流涌之辉"),
    new Weapon("Staff_of_Homa", 5, WeaponType.polearm, "护摩之杖"),
    new Weapon("Staff_of_the_Scarlet_Sands", 5, WeaponType.polearm, "赤沙之杖"),
    new Weapon("Summit_Shaper", 5, WeaponType.sword, "斫峰之刃"),
    new Weapon("The_First_Great_Magic", 5, WeaponType.bow, "最初的大魔术"),
    new Weapon("The_Unforged", 5, WeaponType.claymore, "无工之剑"),
    new Weapon("Thundering_Pulse", 5, WeaponType.bow, "飞雷之弦振"),
    new Weapon("Tome_of_the_Eternal_Flow", 5, WeaponType.catalyst, "万世流涌大典"),
    new Weapon("Tulaytullah's_Remembrance", 5, WeaponType.catalyst, "图莱杜拉的回忆"),
    new Weapon("Uraku_Misugiri", 5, WeaponType.sword, "有乐御簾切"),
    new Weapon("Verdict", 5, WeaponType.claymore, "裁断"),
    new Weapon("Vortex_Vanquisher", 5, WeaponType.polearm, "贯虹之槊"),
    new Weapon("Wolf's_Gravestone", 5, WeaponType.claymore, "狼的末路"),
    // 4 star
    new Weapon("Akuoumaru", 4, WeaponType.claymore, "恶王丸"),
    new Weapon("Alley_Hunter", 4, WeaponType.bow, "暗巷猎手"),
    new Weapon("Dragon's_Bane", 4, WeaponType.polearm, "匣里灭辰"),
    new Weapon("Eye_of_Perception", 4, WeaponType.catalyst, "昭心"),
    new Weapon("Favonius_Codex", 4, WeaponType.catalyst, "西风秘典"),
    new Weapon("Favonius_Greatsword", 4, WeaponType.claymore, "西风大剑"),
    new Weapon("Favonius_Lance", 4, WeaponType.polearm, "西风长枪"),
    new Weapon("Favonius_Sword", 4, WeaponType.sword, "西风剑"),
    new Weapon("Favonius_Warbow", 4, WeaponType.bow, "西风猎弓"),
    new Weapon("Lion's_Roar", 4, WeaponType.sword, "匣里龙吟"),
    new Weapon("Lithic_Blade", 4, WeaponType.claymore, "千岩古剑"),
    new Weapon("Lithic_Spear", 4, WeaponType.polearm, "千岩长枪"),
    new Weapon("Makhaira_Aquamarine", 4, WeaponType.claymore, "玛海菈的水色"),
    new Weapon("Mitternachts_Waltz", 4, WeaponType.bow, "幽夜华尔兹"),
    new Weapon("Mouun's_Moon", 4, WeaponType.bow, "曚云之月"),
    new Weapon("Portable_Power_Saw", 4, WeaponType.claymore, "便携动力锯"),
    new Weapon("Prospector's_Drill", 4, WeaponType.polearm, "勘探钻机"),
    new Weapon("Rainslasher", 4, WeaponType.claymore, "雨裁"),
    new Weapon("Range_Gauge", 4, WeaponType.bow, "测距规"),
    new Weapon("Rust", 4, WeaponType.bow, "弓藏"),
    new Weapon("Sacrificial_Bow", 4, WeaponType.bow, "祭礼弓"),
    new Weapon("Sacrificial_Fragments", 4, WeaponType.catalyst, "祭礼残章"),
    new Weapon("Sacrificial_Greatsword", 4, WeaponType.claymore, "祭礼大剑"),
    new Weapon("Sacrificial_Sword", 4, WeaponType.sword, "祭礼剑"),
    new Weapon("The_Alley_Flash", 4, WeaponType.sword, "暗巷闪光"),
    new Weapon("The_Bell", 4, WeaponType.claymore, "钟剑"),
    new Weapon("The_Black_Sword", 4, WeaponType.sword, "黑剑"),
    new Weapon("The_Dockhand's_Assistant", 4, WeaponType.sword, "船坞长剑"),
    new Weapon("The_Flute", 4, WeaponType.sword, "笛剑"),
    new Weapon("The_Stringless", 4, WeaponType.bow, "绝弦"),
    new Weapon("The_Widsith", 4, WeaponType.catalyst, "流浪乐章"),
    new Weapon("Wandering_Evenstar", 4, WeaponType.catalyst, "流浪的晚星"),
    new Weapon("Wavebreaker's_Fin", 4, WeaponType.polearm, "断浪长鳍"),
    new Weapon("Wine_and_Song", 4, WeaponType.catalyst, "暗巷的酒与诗"),
    new Weapon("Xiphos'_Moonlight", 4, WeaponType.sword, "西福斯的月光")
];

var weaponMap = {};
for (var i = 0; i < WEAPON_LIST.length; i++) {
    var weapon = WEAPON_LIST[i];
    weaponMap[weapon.name] = weapon;
}

var WEAPON_NAMES = [];
for (var i = 0; i < WEAPON_LIST.length; i++) {
    WEAPON_NAMES.push(WEAPON_LIST[i].name);
}

const itemPools = {
    //4.5
    wish_4_5_3: [
        ["neuvillette"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["barbara", "xingqiu", "yanfei"],
        ["beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xinyan", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_5_4: [
        ["kazuha"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["barbara", "xingqiu", "yanfei"],
        ["beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xinyan", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_5_1: [
        ["chiori"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["gorou", "yunjin", "dori"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "faruzan", "fischl", "freminet", "gaming", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_5_2: [
        ["itto"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["gorou", "yunjin", "dori"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "faruzan", "fischl", "freminet", "gaming", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    //4.4
    wish_4_4_3: [
        ["xiao"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["yaoyao", "xinyan", "ningguang"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "charlotte", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "chevreuse", "thoma", "xiangling", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_4_4: [
        ["yae"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["yaoyao", "xinyan", "ningguang"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "charlotte", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "chevreuse", "thoma", "xiangling", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_4_1: [
        ["xianyun"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["gaming", "faruzan", "noelle"],
        ["lynette", "sayu", "heizo", "sucrose", "charlotte", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "yunjin", "barbara", "candace", "xingqiu", "bennett", "chevreuse", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_4_2: [
        ["nahida"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["gaming", "faruzan", "noelle"],
        ["lynette", "sayu", "heizo", "sucrose", "charlotte", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "yunjin", "barbara", "candace", "xingqiu", "bennett", "chevreuse", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    //4.3
    wish_4_3_3: [
        ["shogun"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["chevreuse", "sara", "bennett"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "charlotte", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_3_4: [
        ["yoimiya"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["chevreuse", "sara", "bennett"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "charlotte", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_3_1: [
        ["navia"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["sucrose", "rosaria", "candace"],
        ["faruzan", "lynette", "sayu", "heizo", "charlotte", "chongyun", "diona", "freminet", "layla", "mika", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_3_2: [
        ["ayaka"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["sucrose", "rosaria", "candace"],
        ["faruzan", "lynette", "sayu", "heizo", "charlotte", "chongyun", "diona", "freminet", "layla", "mika", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_2_3: [
        ["cyno"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kirara", "shinobu", "xiangling"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_2_4: [
        ["ayato"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kirara", "shinobu", "xiangling"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_2_1: [
        ["furina"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["charlotte", "collei", "beidou"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "kaveh", "kirara", "yaoyao", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_2_2: [
        ["baizhu"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["charlotte", "collei", "beidou"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "kaveh", "kirara", "yaoyao", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_1_3: [
        ["wriothesley"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["chongyun", "thoma", "dori"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_1_4: [
        ["venti"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["chongyun", "thoma", "dori"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_1_1: [
        ["neuvillette"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["fischl", "xingqiu", "diona"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "chongyun", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_1_2: [
        ["hutao"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["fischl", "xingqiu", "diona"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "chongyun", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    // 4.0
    wish_4_0_3: [
        ["zhongli"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["freminet", "sayu", "noelle"],
        ["faruzan", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_0_4: [
        ["tartaglia"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["freminet", "sayu", "noelle"],
        ["faruzan", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_0_1: [
        ["lyney"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["lynette", "bennett", "barbara"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "candace", "xingqiu", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_0_2: [
        ["yelan"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["lynette", "bennett", "barbara"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "candace", "xingqiu", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    // 3.8
    wish_3_8_3: [
        ["kokomi"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["faruzan", "rosaria", "yanfei"],
        ["sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "kirara", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "yunjin", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_8_4: [
        ["wanderer"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["faruzan", "rosaria", "yanfei"],
        ["sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "kirara", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "yunjin", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_8_1: [
        ["eula"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["mika", "razor", "thoma"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "kirara", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "yunjin", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_8_2: [
        ["klee"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["mika", "razor", "thoma"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "kirara", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "yunjin", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    // 3.7
    wish_3_7_3: [
        ["alhaitham"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["heizo", "xiangling", "yaoyao"],
        ["faruzan", "sayu", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_7_4: [
        ["kazuha"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["heizo", "xiangling", "yaoyao"],
        ["faruzan", "sayu", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_7_1: [
        ["yoimiya"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kirara", "yunjin", "chongyun"],
        ["faruzan", "sayu", "heizo", "sucrose", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_7_2: [
        ["yae"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kirara", "yunjin", "chongyun"],
        ["faruzan", "sayu", "heizo", "sucrose", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    // 3.6
    wish_3_6_3: [
        ["baizhu"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kaveh", "candace", "fischl"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "yaoyao", "beidou", "dori", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_6_4: [
        ["ganyu"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kaveh", "candace", "fischl"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "yaoyao", "beidou", "dori", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_6_1: [
        ["nahida"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["shinobu", "dori", "layla"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "mika", "rosaria", "collei", "yaoyao", "beidou", "fischl", "sara", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_6_2: [
        ["nilou"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["shinobu", "dori", "layla"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "mika", "rosaria", "collei", "yaoyao", "beidou", "fischl", "sara", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    // 3.5
    wish_3_5_3: [
        ["shenhe"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["diona", "sucrose", "mika"],
        ["faruzan", "sayu", "heizo", "chongyun", "layla", "rosaria", "collei", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_5_4: [
        ["ayaka"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["diona", "sucrose", "mika"],
        ["faruzan", "sayu", "heizo", "chongyun", "layla", "rosaria", "collei", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_5_1: [
        ["dehya"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["bennett", "barbara", "collei"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "candace", "xingqiu", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_5_2: [
        ["cyno"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["bennett", "barbara", "collei"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "candace", "xingqiu", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    // 3.4
    wish_3_4_3: [
        ["hutao"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["xingqiu", "ningguang", "beidou"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "collei", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "noelle", "yunjin", "barbara", "candace", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_4_4: [
        ["yelan"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["xingqiu", "ningguang", "beidou"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "collei", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "noelle", "yunjin", "barbara", "candace", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_4_1: [
        ["alhaitham"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["yaoyao", "yunjin", "xinyan"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "collei", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_4_2: [
        ["xiao"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["yaoyao", "yunjin", "xinyan"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "collei", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    // 3.3
    wish_3_3_3: [
        ["shogun"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["rosaria", "sayu", "sara"],
        ["heizo", "sucrose", "chongyun", "diona", "layla", "collei", "beidou", "dori", "fischl", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_3_4: [
        ["ayato"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["rosaria", "sayu", "sara"],
        ["heizo", "sucrose", "chongyun", "diona", "layla", "collei", "beidou", "dori", "fischl", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_3_1: [
        ["wanderer"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["faruzan", "gorou", "yanfei"],
        ["sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "collei", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_3_2: [
        ["itto"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["faruzan", "gorou", "yanfei"],
        ["sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "collei", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "thoma", "xiangling", "xinyan"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    // 3.2
    wish_3_2_3: [
        ["yae"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["layla", "thoma", "heizo"],
        ["sayu", "sucrose", "chongyun", "diona", "rosaria", "collei", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_2_4: [
        ["tartaglia"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["layla", "thoma", "heizo"],
        ["sayu", "sucrose", "chongyun", "diona", "rosaria", "collei", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_2_1: [
        ["nahida"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["razor", "noelle", "bennett"],
        ["sayu", "heizo", "sucrose", "chongyun", "diona", "rosaria", "collei", "beidou", "dori", "fischl", "sara", "shinobu", "gorou", "ningguang", "yunjin", "barbara", "candace", "xingqiu", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_2_2: [
        ["yoimiya"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["razor", "noelle", "bennett"],
        ["sayu", "heizo", "sucrose", "chongyun", "diona", "rosaria", "collei", "beidou", "dori", "fischl", "sara", "shinobu", "gorou", "ningguang", "yunjin", "barbara", "candace", "xingqiu", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    // 3.1
    wish_3_1_3: [
        ["nilou"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["barbara", "beidou", "xiangling"],
        ["sayu", "heizo", "sucrose", "chongyun", "diona", "rosaria", "collei", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "xingqiu", "bennett", "thoma", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_1_4: [
        ["albedo"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["barbara", "beidou", "xiangling"],
        ["sayu", "heizo", "sucrose", "chongyun", "diona", "rosaria", "collei", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "xingqiu", "bennett", "thoma", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_1_1: [
        ["cyno"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["candace", "shinobu", "sayu"],
        ["heizo", "sucrose", "chongyun", "diona", "rosaria", "collei", "dori", "fischl", "sara", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_1_2: [
        ["venti"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["candace", "shinobu", "sayu"],
        ["heizo", "sucrose", "chongyun", "diona", "rosaria", "collei", "dori", "fischl", "sara", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    // 3.0
    wish_3_0_3: [
        ["ganyu"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["dori", "sucrose", "xingqiu"],
        ["sayu", "heizo", "chongyun", "diona", "rosaria", "beidou", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_0_4: [
        ["kokomi"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["dori", "sucrose", "xingqiu"],
        ["sayu", "heizo", "chongyun", "diona", "rosaria", "beidou", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_0_1: [
        ["tighnari"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["collei", "diona", "fischl"],
        ["sayu", "heizo", "sucrose", "chongyun", "rosaria", "beidou", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_3_0_2: [
        ["zhongli"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["collei", "diona", "fischl"],
        ["sayu", "heizo", "sucrose", "chongyun", "rosaria", "beidou", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "xingqiu", "bennett", "thoma", "xiangling", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
}

const weaponPools = {
    wish_4_5_2: [
        ["Tome_of_the_Eternal_Flow", "Freedom-Sworn"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Wine_and_Song", "Mitternachts_Waltz", "The_Flute", "Favonius_Greatsword", "Favonius_Lance"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ]
}

//混池
var chronicledPools = {
    wish_4_5_1_C: [
        ["albedo", "diluc", "eula", "jean", "klee", "mona"],
        ["amber", "barbara", "bennett", "diona", "fischl", "kaeya", "lisa", "mika", "noelle", "razor", "rosaria", "sucrose"],
        ["Alley_Hunter", "Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Mitternachts_Waltz", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Alley_Flash", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith", "Wine_and_Song"]
    ],
    wish_4_5_1_W: [
        ["Aquila_Favonia", "Beacon_of_the_Reed_Sea", "Hunter's_Path", "Lost_Prayer_to_the_Sacred_Winds", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Song_of_Broken_Pines", "Wolf's_Gravestone"],
        ["amber", "barbara", "bennett", "diona", "fischl", "kaeya", "lisa", "mika", "noelle", "razor", "rosaria", "sucrose"],
        ["Alley_Hunter", "Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Mitternachts_Waltz", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Alley_Flash", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith", "Wine_and_Song"]
    ]
}