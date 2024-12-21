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

var ELEMENT_CALL = {
    anemo: {
        chs: "风",
        eng: "Anemo"
    },
    geo: {
        chs: "岩",
        eng: "Geo"
    },
    electro: {
        chs: "雷",
        eng: "Electro"
    },
    dendro: {
        chs: "草",
        eng: "Dendro"
    },
    hydro: {
        chs: "水",
        eng: "Hydro"
    },
    pyro: {
        chs: "火",
        eng: "Pyro"
    },
    cryo: {
        chs: "冰",
        eng: "Cryo"
    }
}

var PATH_FULLWISH = "./img/w/";
var PATH_BANNER = "./img/b/";
var PATH_NAMECARD = "./img/n/";

class Character {
    name;//角色识别名（不是英文名）
    star;//角色星数
    pfile;//Charaicon对应文件路径
    wfile;//WishArtworks对应文件路径
    signature = {
        chs: "", eng: ""
    }//角色称号
    element;//角色元素
    elementName;
    fullName = {
        chs: "", eng: ""
    }
    /**
     * 
     * @param {String} name 
     * @param {Number} star 
     * @param {Object} signature
     */
    constructor(name, star, signature, element, fullName) {
        this.name = name;
        this.star = star;
        this.pfile = './img/p_' + this.name + '.png';
        this.wfile = PATH_FULLWISH + 'w_' + this.name + '.png';
        if (this.star == 5) {
            this.nfile = PATH_NAMECARD + 'n_' + this.name + '.png';
        }
        this.signature = signature;
        this.element = element;
        this.fullName = fullName;
        this.elementName = extractValue(this.element, ELEMENT_NUMBER, ELEMENT_NAME);
    }
}

class Weapon {
    name;
    star;
    weaponFile;
    weaponType;
    nameChs;
    fullName = {
        chs: "", eng: ""
    }
    constructor(name, star, weaponType, nameChs) {
        this.name = name;
        this.star = star;
        this.weaponType = weaponType;
        this.weaponFile = './img/weapon/' + this.star + '/Weapon_' + this.name + '.png';
        this.nameChs = nameChs;
        this.fullName.chs = this.nameChs;
        let fn = this.name;
        let fnArr = fn.split("_");
        fn = "";
        for (var i = 0; i < fnArr.length; i++) {
            if (i != 0) {
                fn += " " + fnArr[i];
            } else {
                fn += "" + fnArr[i];
            }
        }
        this.fullName.eng = fn;
    }
}

/**
 * 角色列表
 */
var CHARACTER_LIST = [
    //mondstadt
    new Character("jean", 5, { chs: "蒲公英骑士", eng: "Dandelion Knight" }, Element.anemo, { chs: "琴", eng: "Jean" }),
    new Character("amber", 4, { chs: "飞行冠军", eng: "Gliding Champion" }, Element.pyro, { chs: "安柏", eng: "Amber" }),
    new Character("lisa", 4, { chs: "蔷薇魔女", eng: "Witch of Purple Rose" }, Element.electro, { chs: "丽莎", eng: "Lisa" }),
    new Character("kaeya", 4, { chs: "寒风剑士", eng: "Frostwind Swordsman" }, Element.cryo, { chs: "凯亚", eng: "Kaeya" }),
    new Character("barbara", 4, { chs: "闪耀偶像", eng: "Shining Idol" }, Element.hydro, { chs: "芭芭拉", eng: "Barbara" }),
    new Character("diluc", 5, { chs: "晨曦的暗面", eng: "The Dark Side of Dawn" }, Element.pyro, { chs: "迪卢克", eng: "Diluc" }),
    new Character("razor", 4, { chs: "奔狼领的传说", eng: "Wolf Boy" }, Element.electro, { chs: "雷泽", eng: "Razor" }),
    new Character("venti", 5, { chs: "风色诗人", eng: "Windborne Bard" }, Element.anemo, { chs: "温迪", eng: "Venti" }),
    new Character("klee", 5, { chs: "逃跑的太阳", eng: "Fleeing Sunlight" }, Element.pyro, { chs: "可莉", eng: "Klee" }),
    new Character("bennett", 4, { chs: "命运试金石", eng: "Trial by Fire" }, Element.pyro, { chs: "班尼特", eng: "Bennett" }),
    new Character("noelle", 4, { chs: "未授勋之花", eng: "Chivalric Blossom" }, Element.geo, { chs: "诺艾尔", eng: "Noelle" }),
    new Character("fischl", 4, { chs: "断罪皇女！！", eng: "Prinzessin der Verurteilung!" }, Element.electro, { chs: "菲谢尔", eng: "Fischl" }),
    new Character("sucrose", 4, { chs: "无害甜度", eng: "Harmless Sweetie" }, Element.anemo, { chs: "砂糖", eng: "Sucrose" }),
    new Character("mona", 5, { chs: "星天水镜", eng: "Astral Reflection" }, Element.hydro, { chs: "莫娜", eng: "Mona" }),
    new Character("diona", 4, { chs: "猫尾特调", eng: "Kätzlein Cocktail" }, Element.cryo, { chs: "迪奥娜", eng: "Diona" }),
    new Character("albedo", 5, { chs: "白垩之子", eng: "Kreideprinz" }, Element.geo, { chs: "阿贝多", eng: "Albedo" }),
    new Character("rosaria", 4, { chs: "棘冠恩典", eng: "Thorny Benevolence" }, Element.cryo, { chs: "罗莎莉亚", eng: "Rosaria" }),
    new Character("eula", 5, { chs: "浪花骑士", eng: "Dance of the Shimmering Wave" }, Element.cryo, { chs: "优菈", eng: "Eula" }),
    new Character("mika", 4, { chs: "晴霜的标绘", eng: "Coordinates of Clear Frost" }, Element.cryo, { chs: "米卡", eng: "Mika" }),
    //liyue
    new Character("xiao", 5, { chs: "靖妖傩舞", eng: "Vigilant Yaksha" }, Element.anemo, { chs: "魈", eng: "Xiao" }),
    new Character("beidou", 4, { chs: "无冕的龙王", eng: "Uncrowned Lord of the Ocean" }, Element.electro, { chs: "北斗", eng: "Beidou" }),
    new Character("ningguang", 4, { chs: "群玉阁之主", eng: "Eclipsing Star" }, Element.geo, { chs: "凝光", eng: "Ningguang" }),
    new Character("xiangling", 4, { chs: "万民百味", eng: "Exquisite Delicacy" }, Element.pyro, { chs: "香菱", eng: "Xiangling" }),
    new Character("xingqiu", 4, { chs: "少年春衫薄", eng: "Juvenile Galant" }, Element.hydro, { chs: "行秋", eng: "Xingqiu" }),
    new Character("chongyun", 4, { chs: "雪融有踪", eng: "Frozen Ardor" }, Element.cryo, { chs: "重云", eng: "Chongyun" }),
    new Character("keqing", 5, { chs: "霆霓快雨", eng: "Driving Thunder" }, Element.electro, { chs: "刻晴", eng: "Keqing" }),
    new Character("qiqi", 5, { chs: "冻冻回魂夜", eng: "Icy Resurrection" }, Element.cryo, { chs: "七七", eng: "Qiqi" }),
    new Character("zhongli", 5, { chs: "尘世闲游", eng: "Vago Mundo" }, Element.geo, { chs: "钟离", eng: "Zhongli" }),
    new Character("xinyan", 4, { chs: "燥热旋律", eng: "Blazing Riff" }, Element.pyro, { chs: "辛焱", eng: "Xinyan" }),
    new Character("ganyu", 5, { chs: "循循守月", eng: "Plenilune Gaze" }, Element.cryo, { chs: "甘雨", eng: "Ganyu" }),
    new Character("hutao", 5, { chs: "雪霁梅香", eng: "Fragrance in Thaw" }, Element.pyro, { chs: "胡桃", eng: "Hu Tao" }),
    new Character("yanfei", 4, { chs: "智明无邪", eng: "Wise Innocence" }, Element.pyro, { chs: "烟绯", eng: "Yanfei" }),
    new Character("shenhe", 5, { chs: "孤辰茕怀", eng: "Lonesome Transcendence" }, Element.cryo, { chs: "申鹤", eng: "Shenhe" }),
    new Character("yunjin", 4, { chs: "红毹婵娟", eng: "Stage Lucida" }, Element.geo, { chs: "云堇", eng: "Yun Jin" }),
    new Character("yelan", 5, { chs: "兰生幽谷", eng: "Valley Orchid" }, Element.hydro, { chs: "夜兰", eng: "Yelan" }),
    new Character("yaoyao", 4, { chs: "仙蕊玲珑", eng: "Burgeoning Grace" }, Element.dendro, { chs: "瑶瑶", eng: "Yaoyao" }),
    new Character("baizhu", 5, { chs: "遵生合和", eng: "Beyond Mortality" }, Element.dendro, { chs: "白术", eng: "Baizhu" }),
    new Character("xianyun", 5, { chs: "鸾音鹤信", eng: "Passerine Herald" }, Element.anemo, { chs: "闲云", eng: "Xianyun" }),
    new Character("gaming", 4, { chs: "骏猊頕首", eng: "Leonine Vanguard" }, Element.pyro, { chs: "嘉明", eng: "Gaming" }),
    //inazuma
    new Character("ayaka", 5, { chs: "白鹭霜华", eng: "Frostflake Heron" }, Element.cryo, { chs: "神里绫华", eng: "Kamisato Ayaka" }),
    new Character("kazuha", 5, { chs: "红叶逐荒波", eng: "Scarlet Leaves Pursue Wild Waves" }, Element.anemo, { chs: "枫原万叶", eng: "Kaedehara Kazuha" }),
    new Character("yoimiya", 5, { chs: "琉焰华舞", eng: "Frolicking Flames" }, Element.pyro, { chs: "宵宫", eng: "Yoimiya" }),
    new Character("sayu", 4, { chs: "忍里之貉", eng: "Mujina Ninja" }, Element.anemo, { chs: "早柚", eng: "Sayu" }),
    new Character("shogun", 5, { chs: "一心净土", eng: "Plane of Euthymia" }, Element.electro, { chs: "雷电将军", eng: "Raiden Shogun" }),
    new Character("sara", 4, { chs: "黑羽鸣镝", eng: "Crowfeather Kaburaya" }, Element.electro, { chs: "九条裟罗", eng: "Kujou Sara" }),
    new Character("kokomi", 5, { chs: "真珠之智", eng: "Pearl of Wisdom" }, Element.hydro, { chs: "珊瑚宫心海", eng: "Sangonomiya Kokomi" }),
    new Character("thoma", 4, { chs: "渡来介者", eng: "Protector From Afar" }, Element.pyro, { chs: "托马", eng: "Thoma" }),
    new Character("gorou", 4, { chs: "戎犬锵锵", eng: "Canine Warrior" }, Element.geo, { chs: "五郎", eng: "Gorou" }),
    new Character("itto", 5, { chs: "花坂豪快", eng: "Hanamizaka Heroics" }, Element.geo, { chs: "荒泷一斗", eng: "Arataki Itto" }),
    new Character("yae", 5, { chs: "浮世笑百姿", eng: "Astute Amusement" }, Element.electro, { chs: "八重神子", eng: "Yae Miko" }),
    new Character("ayato", 5, { chs: "磐祭叶守", eng: "Pillar of Fortitude" }, Element.hydro, { chs: "神里绫人", eng: "Kamisato Ayato" }),
    new Character("shinobu", 4, { chs: "烦恼刈除", eng: "Mender of Tribulations" }, Element.electro, { chs: "久岐忍", eng: "Kuki Shinobu" }),
    new Character("heizo", 4, { chs: "心朝乂安", eng: "Analytical Harmony" }, Element.anemo, { chs: "鹿野院平藏", eng: "Shikanoin Heizou" }),
    new Character("kirara", 4, { chs: "檐宇猫游", eng: "Cat Upon the Eaves" }, Element.dendro, { chs: "绮良良", eng: "Kirara" }),
    new Character("chiori", 5, { chs: "鸣雷的裁锦师", eng: "The Thundering Seamstress" }, Element.geo, { chs: "千织", eng: "Chiori" }),
    //sumeru
    new Character("tighnari", 5, { chs: "浅蔚轻行", eng: "Verdant Strider" }, Element.dendro, { chs: "提纳里", eng: "Tighnari" }),
    new Character("collei", 4, { chs: "萃念初蘖", eng: "Sprout of Rebirth" }, Element.dendro, { chs: "柯莱", eng: "Collei" }),
    new Character("dori", 4, { chs: "梦园藏金", eng: "Treasure of Dream Garden" }, Element.electro, { chs: "多莉", eng: "Dori" }),
    new Character("cyno", 5, { chs: "缄秘的裁遣", eng: "Judicator of Secrets" }, Element.electro, { chs: "赛诺", eng: "Cyno" }),
    new Character("candace", 4, { chs: "浮金的誓愿", eng: "Golden Vow" }, Element.hydro, { chs: "坎蒂丝", eng: "Candace" }),
    new Character("nilou", 5, { chs: "莲光落舞筵", eng: "Dance of Lotuslight" }, Element.hydro, { chs: "妮露", eng: "Nilou" }),
    new Character("nahida", 5, { chs: "白草净华", eng: "Physic of Purity" }, Element.dendro, { chs: "纳西妲", eng: "Nahida" }),
    new Character("layla", 4, { chs: "绮思晚星", eng: "Fantastical Evening Star" }, Element.cryo, { chs: "莱依拉", eng: "Layla" }),
    new Character("wanderer", 5, { chs: "久世浮倾", eng: "Eons Adrift" }, Element.anemo, { chs: "流浪者", eng: "Wanderer" }),
    new Character("faruzan", 4, { chs: "机逐封秘", eng: "Enigmatic Machinist" }, Element.anemo, { chs: "珐露珊", eng: "Faruzan" }),
    new Character("alhaitham", 5, { chs: "诲韬诤言", eng: "Admonishing Instruction" }, Element.dendro, { chs: "艾尔海森", eng: "Alhaitham" }),
    new Character("dehya", 5, { chs: "炽鬃之狮", eng: "Flame-Mane" }, Element.pyro, { chs: "迪希雅", eng: "Dehya" }),
    new Character("kaveh", 4, { chs: "天穹之镜", eng: "Empyrean Reflection" }, Element.dendro, { chs: "卡维", eng: "Kaveh" }),
    new Character("sethos", 4, { chs: "衡明知度", eng: "Wisdom's Measure" }, Element.electro, { chs: "塞索斯", eng: "Sethos" }),
    //fontaine
    new Character("lyney", 5, { chs: "惑光幻戏", eng: "Spectacle of Phantasmagoria" }, Element.pyro, { chs: "林尼", eng: "Lyney" }),
    new Character("lynette", 4, { chs: "丽影绮行", eng: "Elegance in the Shadows" }, Element.anemo, { chs: "琳妮特", eng: "Lynette" }),
    new Character("freminet", 4, { chs: "浅怀遐梦", eng: "Yearning for Unseen Depths" }, Element.cryo, { chs: "菲米尼", eng: "Freminet" }),
    new Character("neuvillette", 5, { chs: "谕告的潮音", eng: "Ordainer of Inexorable Judgment" }, Element.hydro, { chs: "那维莱特", eng: "Neuvillette" }),
    new Character("wriothesley", 5, { chs: "寂罪的密使", eng: "Emissary of Solitary Iniquity" }, Element.cryo, { chs: "莱欧斯利", eng: "Wriothesly" }),
    new Character("furina", 5, { chs: "不休独舞", eng: "Endless Solo of Solitude" }, Element.hydro, { chs: "芙宁娜", eng: "Furina" }),
    new Character("charlotte", 4, { chs: "朗镜索真", eng: "Lens of Verity" }, Element.cryo, { chs: "夏洛蒂", eng: "Charlotte" }),
    new Character("navia", 5, { chs: "明花蔓舵", eng: "Helm of the Radiant Rose" }, Element.geo, { chs: "娜维娅", eng: "Navia" }),
    new Character("chevreuse", 4, { chs: "明律决罚", eng: "Executor of Justice" }, Element.pyro, { chs: "夏沃蕾", eng: "Chevreuse" }),
    new Character("arlecchino", 5, { chs: "孤暝厄月", eng: "Dire Balemoon" }, Element.pyro, { chs: "阿蕾奇诺", eng: "Arlecchino" }),
    new Character("clorinde", 5, { chs: "秉烛狝影", eng: "Candlebearer, Shadowhunter" }, Element.electro, { chs: "克洛琳德", eng: "Clorinde" }),
    new Character("sigewinne", 5, { chs: "龙女妙变", eng: "Wondrous Dragonheir" }, Element.hydro, { chs: "希格雯", eng: "Sigewinne" }),
    new Character("emilie", 5, { chs: "千缕之踪", eng: "A Thousand Scents Traced" }, Element.dendro, { chs: "艾梅莉埃", eng: "Emilie" }),
    //natlan
    new Character("mualani", 5, { chs: "哗啦啦逐浪客", eng: "Splish-Splash Wavechaser" }, Element.hydro, { chs: "玛拉妮", eng: "Mualani" }),
    new Character("kachina", 4, { chs: "斑金矿朴", eng: "Mottled Gold Yet Unsmelted" }, Element.geo, { chs: "卡齐娜", eng: "Kachina" }),
    new Character("kinich", 5, { chs: "回火之狩", eng: "Turnfire Hunt" }, Element.dendro, { chs: "基尼奇", eng: "Kinich" }),
    new Character("xilonen", 5, { chs: "焮火铸魂", eng: "Ardent Flames Forge the Soul" }, Element.geo, { chs: "希诺宁", eng: "Xilonen" }),
    //new Character("citlali",        ?, {chs:"?", eng:"?"},         Element.anemo,         {chs:"茜特菈莉", eng:"Citlali"}),
    new Character("chasca", 5, { chs: "巡宇翦定", eng: "Skyborne Arbiter" }, Element.anemo, { chs: "恰斯卡", eng: "Chasca" }),
    new Character("ororon", 4, { chs: "深黯的谜烟", eng: "Shadow of the Night-Wind" }, Element.electro, { chs: "欧洛伦", eng: "Ororon" }),
    //
    new Character("tartaglia", 5, { chs: "「公子」", eng: "Childe" }, Element.hydro, { chs: "达达利亚", eng: "Tartaglia" })
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
    new Weapon("Absolution", 5, WeaponType.sword, "赦罪"),
    new Weapon("Amos'_Bow", 5, WeaponType.bow, "阿莫斯之弓"),
    new Weapon("Aqua_Simulacra", 5, WeaponType.bow, "若水"),
    new Weapon("Aquila_Favonia", 5, WeaponType.sword, "风鹰剑"),
    new Weapon("Astral_Vulture's_Crimson_Plumage", 5, WeaponType.bow, "星鹫赤羽"),
    new Weapon("A_Thousand_Floating_Dreams", 5, WeaponType.catalyst, "千夜浮梦"),
    new Weapon("Beacon_of_the_Reed_Sea", 5, WeaponType.claymore, "苇海信标"),
    new Weapon("Calamity_Queller", 5, WeaponType.polearm, "息灾"),
    new Weapon("Cashflow_Supervision", 5, WeaponType.catalyst, "金流监督"),
    new Weapon("Crane's_Echoing_Call", 5, WeaponType.catalyst, "鹤鸣余音"),
    new Weapon("Crimson_Moon's_Semblance", 5, WeaponType.polearm, "赤月之形"),
    new Weapon("Elegy_for_the_End", 5, WeaponType.bow, "终末嗟叹之诗"),
    new Weapon("Engulfing_Lightning", 5, WeaponType.polearm, "薙草之稻光"),
    new Weapon("Everlasting_Moonglow", 5, WeaponType.catalyst, "不灭月华"),
    new Weapon("Fang_of_the_Mountain_King", 5, WeaponType.claymore, "山王长牙"),
    new Weapon("Freedom-Sworn", 5, WeaponType.sword, "苍古自由之誓"),
    new Weapon("Haran_Geppaku_Futsu", 5, WeaponType.sword, "波乱月白经津"),
    new Weapon("Hunter's_Path", 5, WeaponType.bow, "猎人之径"),
    new Weapon("Jadefall's_Splendor", 5, WeaponType.catalyst, "碧落之珑"),
    new Weapon("Kagura's_Verity", 5, WeaponType.catalyst, "神乐之真意"),
    new Weapon("Key_of_Khaj-Nisut", 5, WeaponType.sword, "圣显之钥"),
    new Weapon("Light_of_Foliar_Incision", 5, WeaponType.sword, "裁叶萃光"),
    new Weapon("Lost_Prayer_to_the_Sacred_Winds", 5, WeaponType.catalyst, "四风原典"),
    new Weapon("Lumidouce_Elegy", 5, WeaponType.polearm, "柔灯挽歌"),
    new Weapon("Memory_of_Dust", 5, WeaponType.catalyst, "尘世之锁"),
    new Weapon("Mistsplitter_Reforged", 5, WeaponType.sword, "雾切之回光"),
    new Weapon("Peak_Patrol_Song", 5, WeaponType.sword, "岩峰巡歌"),
    new Weapon("Polar_Star", 5, WeaponType.bow, "冬极白星"),
    new Weapon("Primordial_Jade_Cutter", 5, WeaponType.sword, "磐岩结绿"),
    new Weapon("Primordial_Jade_Winged-Spear", 5, WeaponType.polearm, "和璞鸢"),
    new Weapon("Redhorn_Stonethresher", 5, WeaponType.claymore, "赤角石溃杵"),
    new Weapon("Silvershower_Heartstrings", 5, WeaponType.bow, "白雨心弦"),
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
    new Weapon("Surf's_Up", 5, WeaponType.catalyst, "冲浪时光"),
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
    new Weapon("Flower-Wreathed_Feathers", 4, WeaponType.bow, "缀花之翎"),
    new Weapon("Fruitful_Hook", 4, WeaponType.claymore, "硕果钩"),
    new Weapon("Lion's_Roar", 4, WeaponType.sword, "匣里龙吟"),
    new Weapon("Lithic_Blade", 4, WeaponType.claymore, "千岩古剑"),
    new Weapon("Lithic_Spear", 4, WeaponType.polearm, "千岩长枪"),
    new Weapon("Makhaira_Aquamarine", 4, WeaponType.claymore, "玛海菈的水色"),
    new Weapon("Mitternachts_Waltz", 4, WeaponType.bow, "幽夜华尔兹"),
    new Weapon("Mountain-Bracing_Bolt", 4, WeaponType.polearm, "镇山之钉"),
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
    new Weapon("Sturdy_Bone", 4, WeaponType.sword, "弥坚骨"),
    new Weapon("The_Alley_Flash", 4, WeaponType.sword, "暗巷闪光"),
    new Weapon("The_Bell", 4, WeaponType.claymore, "钟剑"),
    new Weapon("The_Black_Sword", 4, WeaponType.sword, "黑剑"),
    new Weapon("The_Dockhand's_Assistant", 4, WeaponType.sword, "船坞长剑"),
    new Weapon("The_Flute", 4, WeaponType.sword, "笛剑"),
    new Weapon("The_Stringless", 4, WeaponType.bow, "绝弦"),
    new Weapon("The_Widsith", 4, WeaponType.catalyst, "流浪乐章"),
    new Weapon("Wandering_Evenstar", 4, WeaponType.catalyst, "流浪的晚星"),
    new Weapon("Wavebreaker's_Fin", 4, WeaponType.polearm, "断浪长鳍"),
    new Weapon("Waveriding_Whirl", 4, WeaponType.catalyst, "乘浪的回旋"),
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
    //5.2
    wish_5_2_3: [
        ["neuvillette"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["heizo", "fischl", "yaoyao"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "freminet", "gaming", "gorou", "kachina", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_5_2_4: [
        ["zhongli"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["heizo", "fischl", "yaoyao"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "freminet", "gaming", "gorou", "kachina", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_5_2_1: [
        ["chasca"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["ororon", "sucrose", "barbara"],
        ["beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kachina", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_5_2_2: [
        ["lyney"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["ororon", "sucrose", "barbara"],
        ["beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kachina", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    //5.1
    wish_5_1_3: [
        ["nahida"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["sethos", "xingqiu", "shinobu"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kachina", "kaveh", "kirara", "sara", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_5_1_4: [
        ["hutao"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["sethos", "xingqiu", "shinobu"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kachina", "kaveh", "kirara", "sara", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_5_1_1: [
        ["xilonen"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["dori", "candace", "collei"],
        ["barbara", "beidou", "bennett", "charlotte", "chevreuse", "chongyun", "diona", "faruzan", "fischl", "freminet", "gaming", "gorou", "kachina", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_5_1_2: [
        ["chiori"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["dori", "candace", "collei"],
        ["barbara", "beidou", "bennett", "charlotte", "chevreuse", "chongyun", "diona", "faruzan", "fischl", "freminet", "gaming", "gorou", "kachina", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    //5.0
    wish_5_0_3: [
        ["kinich"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["thoma", "sara", "chevreuse"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_5_0_4: [
        ["shogun"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["thoma", "sara", "chevreuse"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_5_0_1: [
        ["mualani"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kachina", "xinyan", "bennett"],
        ["barbara", "beidou", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_5_0_2: [
        ["kazuha"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kachina", "xinyan", "bennett"],
        ["barbara", "beidou", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    //4.8
    wish_4_8_3: [
        ["emilie"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["yanfei", "xiangling", "razor"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xingqiu", "xinyan", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_8_4: [
        ["yelan"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["yanfei", "xiangling", "razor"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xingqiu", "xinyan", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_8_1: [
        ["navia"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kirara", "kaveh", "ningguang"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "sara", "shinobu", "layla", "lynette", "mika", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_8_2: [
        ["nilou"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kirara", "kaveh", "ningguang"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "sara", "shinobu", "layla", "lynette", "mika", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    //4.7
    wish_4_7_3: [
        ["sigewinne"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["noelle", "gaming", "rosaria"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "razor", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_7_4: [
        ["furina"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["noelle", "gaming", "rosaria"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "razor", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_7_1: [
        ["clorinde"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["sethos", "bennett", "thoma"],
        ["barbara", "beidou", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_7_2: [
        ["alhaitham"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["sethos", "bennett", "thoma"],
        ["barbara", "beidou", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    //4.6
    wish_4_6_3: [
        ["wanderer"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["beidou", "faruzan", "layla"],
        ["barbara", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_6_4: [
        ["baizhu"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["beidou", "faruzan", "layla"],
        ["barbara", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_6_1: [
        ["arlecchino"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["freminet", "lynette", "xiangling"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_4_6_2: [
        ["lyney"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["freminet", "lynette", "xiangling"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
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
    //2.8
    wish_2_8_3: [
        ["yoimiya"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["bennett", "xinyan", "yunjin"],
        ["barbara", "beidou", "chongyun", "diona", "fischl", "gorou", "sara", "shinobu", "ningguang", "noelle", "razor", "rosaria", "sayu", "sucrose", "thoma", "xiangling", "xingqiu", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_2_8_1: [
        ["kazuha"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["heizo", "ningguang", "thoma"],
        ["barbara", "beidou", "bennett", "chongyun", "diona", "fischl", "gorou", "sara", "shinobu", "noelle", "razor", "rosaria", "sayu", "sucrose", "xiangling", "xingqiu", "xinyan", "yanfei", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_2_8_2: [
        ["klee"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["heizo", "ningguang", "thoma"],
        ["barbara", "beidou", "bennett", "chongyun", "diona", "fischl", "gorou", "sara", "shinobu", "noelle", "razor", "rosaria", "sayu", "sucrose", "xiangling", "xingqiu", "xinyan", "yanfei", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    //2.7
    wish_2_7_3: [
        ["itto"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["shinobu", "chongyun", "gorou"],
        ["barbara", "beidou", "bennett", "diona", "fischl", "sara", "ningguang", "noelle", "razor", "rosaria", "sayu", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_2_7_1: [
        ["yelan"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["barbara", "yanfei", "noelle"],
        ["beidou", "bennett", "chongyun", "diona", "fischl", "gorou", "sara", "ningguang", "razor", "rosaria", "sayu", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_2_7_2: [
        ["xiao"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["barbara", "yanfei", "noelle"],
        ["beidou", "bennett", "chongyun", "diona", "fischl", "gorou", "sara", "ningguang", "razor", "rosaria", "sayu", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    //2.6
    wish_2_6_3: [
        ["ayaka"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["razor", "rosaria", "sayu"],
        ["bennett", "xinyan", "sara", "barbara", "beidou", "chongyun", "diona", "fischl", "gorou", "ningguang", "noelle", "sucrose", "thoma", "xiangling", "xingqiu", "yanfei", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_2_6_1: [
        ["ayato"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["sucrose", "xiangling", "yunjin"],
        ["bennett", "xinyan", "sara", "barbara", "beidou", "chongyun", "diona", "fischl", "gorou", "ningguang", "noelle", "razor", "rosaria", "sayu", "thoma", "xingqiu", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_2_6_2: [
        ["venti"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["sucrose", "xiangling", "yunjin"],
        ["bennett", "xinyan", "sara", "barbara", "beidou", "chongyun", "diona", "fischl", "gorou", "ningguang", "noelle", "razor", "rosaria", "sayu", "thoma", "xingqiu", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    //2.5
    wish_2_5_2: [
        ["shogun"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["bennett", "xinyan", "sara"],
        ["barbara", "beidou", "chongyun", "diona", "fischl", "gorou", "ningguang", "noelle", "razor", "rosaria", "sayu", "sucrose", "thoma", "xiangling", "xingqiu", "yanfei", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_2_5_3: [
        ["kokomi"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["bennett", "xinyan", "sara"],
        ["barbara", "beidou", "chongyun", "diona", "fischl", "gorou", "ningguang", "noelle", "razor", "rosaria", "sayu", "sucrose", "thoma", "xiangling", "xingqiu", "yanfei", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_2_5_1: [
        ["yae"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["fischl", "diona", "thoma"],
        ["barbara", "beidou", "bennett", "chongyun", "gorou", "sara", "ningguang", "noelle", "razor", "rosaria", "sayu", "sucrose", "xiangling", "xingqiu", "xinyan", "yanfei", "yunjin"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    //2.4
    wish_2_4_3: [
        ["zhongli"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["xingqiu", "beidou", "yanfei"],
        ["barbara", "bennett", "chongyun", "diona", "fischl", "gorou", "sara", "ningguang", "noelle", "razor", "rosaria", "sayu", "sucrose", "thoma", "xiangling", "xinyan"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_2_4_4: [
        ["ganyu"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["xingqiu", "beidou", "yanfei"],
        ["barbara", "bennett", "chongyun", "diona", "fischl", "gorou", "sara", "ningguang", "noelle", "razor", "rosaria", "sayu", "sucrose", "thoma", "xiangling", "xinyan"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_2_4_1: [
        ["shenhe"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["yunjin", "ningguang", "chongyun"],
        ["barbara", "beidou", "bennett", "diona", "fischl", "gorou", "sara", "noelle", "razor", "rosaria", "sayu", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ],
    wish_2_4_2: [
        ["xiao"],
        ["jean", "qiqi", "keqing", "mona", "diluc"],
        ["yunjin", "ningguang", "chongyun"],
        ["barbara", "beidou", "bennett", "diona", "fischl", "gorou", "sara", "noelle", "razor", "rosaria", "sayu", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"]
    ]
}

const weaponPools = {
    wish_5_2_2: [
        ["Tome_of_the_Eternal_Flow", "Vortex_Vanquisher"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Mitternachts_Waltz", "Favonius_Sword", "Favonius_Greatsword", "Dragon's_Bane", "Sacrificial_Fragments"],
        ["Eye_of_Perception", "Favonius_Codex", "Favonius_Lance", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kachina", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_5_2_1: [
        ["Astral_Vulture's_Crimson_Plumage", "The_First_Great_Magic"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Waveriding_Whirl", "Flower-Wreathed_Feathers", "The_Flute", "The_Bell", "Favonius_Lance"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Stringless", "The_Widsith"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kachina", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_5_1_2: [
        ["A_Thousand_Floating_Dreams", "Staff_of_Homa"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Fruitful_Hook", "Lion's_Roar", "Dragon's_Bane", "Eye_of_Perception", "Favonius_Warbow"],
        ["Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kachina", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_5_1_1: [
        ["Peak_Patrol_Song", "Uraku_Misugiri"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Sturdy_Bone", "Mountain-Bracing_Bolt", "Sacrificial_Greatsword", "Favonius_Codex", "Rust"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kachina", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_5_0_2: [
        ["Fang_of_the_Mountain_King", "Engulfing_Lightning"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Sacrificial_Sword", "Rainslasher", "Favonius_Lance", "The_Widsith", "Sacrificial_Bow"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rust", "Sacrificial_Fragments", "Sacrificial_Greatsword", "The_Bell", "The_Flute", "The_Stringless"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_5_0_1: [
        ["Surf's_Up", "Freedom-Sworn"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Favonius_Sword", "Favonius_Greatsword", "Dragon's_Bane", "Sacrificial_Fragments", "The_Stringless"],
        ["Eye_of_Perception", "Favonius_Codex", "Favonius_Lance", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Widsith"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_4_8_2: [
        ["Lumidouce_Elegy", "Aqua_Simulacra"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Makhaira_Aquamarine", "Wandering_Evenstar", "The_Flute", "Favonius_Lance", "Favonius_Warbow"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword" /*"Favonius_Warbow"*/, "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_4_8_1: [
        ["Verdict", "Key_of_Khaj-Nisut"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Xiphos'_Moonlight", "The_Bell", "Dragon's_Bane", "Eye_of_Perception", "Rust"],
        ["Favonius_Codex", "Favonius_Greatsword",/*'Favonius_Lance',*/ "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Flute", "The_Stringless", "The_Widsith"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "sethos", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_4_7_2: [
        ["Silvershower_Heartstrings", "Splendor_of_Tranquil_Waters"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Lithic_Blade", "Lion's_Roar", "Favonius_Lance", "Favonius_Codex", "Sacrificial_Bow"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Greatsword", "Favonius_Sword", "Favonius_Warbow", "Rainslasher", "Rust", "Sacrificial_Fragments", "Sacrificial_Greatsword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_4_7_1: [
        ["Absolution", "Light_of_Foliar_Incision"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Lithic_Spear", "Sacrificial_Sword", "Sacrificial_Greatsword", "The_Widsith", "The_Stringless"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "The_Bell", "The_Flute"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_4_6_2: [
        ["Tulaytullah's_Remembrance", "Jadefall's_Splendor"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Range_Gauge", "Favonius_Sword", "Sacrificial_Fragments", "Prospector's_Drill", "Rainslasher"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Warbow", "Lion's_Roar", "Rust", "Sacrificial_Bow", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_4_6_1: [
        ["Crimson_Moon's_Semblance", "The_First_Great_Magic"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["The_Dockhand's_Assistant", "Portable_Power_Saw", "Dragon's_Bane", "Eye_of_Perception", "Favonius_Warbow"],
        ["Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_4_5_2: [
        ["Tome_of_the_Eternal_Flow", "Freedom-Sworn"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Wine_and_Song", "Mitternachts_Waltz", "The_Flute", "Favonius_Greatsword", "Favonius_Lance"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_4_5_1: [
        ["Uraku_Misugiri", "Redhorn_Stonethresher"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["The_Alley_Flash", "Alley_Hunter", "The_Bell", "Dragon's_Bane", "Favonius_Codex"],
        ["Eye_of_Perception", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Flute", "The_Stringless", "The_Widsith"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_4_4_2: [
        ["Kagura's_Verity", "Primordial_Jade_Winged-Spear"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Lithic_Blade", "Lion's_Roar", "Favonius_Lance", "The_Widsith", "The_Stringless"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Sword", "Favonius_Warbow", "Rainslasher", "Rust", "Sacrificial_Bow", "Sacrificial_Fragments", "Sacrificial_Greatsword", "Sacrificial_Sword", "The_Bell", "The_Flute"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
    wish_4_4_1: [
        ["Crane's_Echoing_Call", "A_Thousand_Floating_Dreams"],
        ["Amos'_Bow", "Aquila_Favonia", "Lost_Prayer_to_the_Sacred_Winds", "Primordial_Jade_Winged-Spear", "Skyward_Atlas", "Skyward_Blade", "Skyward_Harp", "Skyward_Pride", "Skyward_Spine", "Wolf's_Gravestone"],
        ["Lithic_Spear", "Sacrificial_Sword", "Sacrificial_Greatsword", "Sacrificial_Fragments", "Sacrificial_Bow"],
        ["Dragon's_Bane", "Eye_of_Perception", "Favonius_Codex", "Favonius_Greatsword", "Favonius_Lance", "Favonius_Sword", "Favonius_Warbow", "Lion's_Roar", "Rainslasher", "Rust", "The_Bell", "The_Flute", "The_Stringless", "The_Widsith"],
        ["barbara", "beidou", "bennett", "candace", "charlotte", "chevreuse", "chongyun", "collei", "diona", "dori", "faruzan", "fischl", "freminet", "gaming", "gorou", "kaveh", "kirara", "sara", "shinobu", "layla", "lynette", "mika", "ningguang", "noelle", "razor", "rosaria", "sayu", "heizo", "sucrose", "thoma", "xiangling", "xingqiu", "xinyan", "yanfei", "yaoyao", "yunjin"],
    ],
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