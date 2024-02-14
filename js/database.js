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

var ELEMENT_NAME = ["anemo", "geo", "electro", "dendro", "hydro", "pyro", "cryo"];
var ELEMENT_NAMECHS = ["风", "岩", "雷", "草", "水", "火", "冰"];
var ELEMENT_NUMBER = [1, 2, 3, 4, 5, 6, 7];
var STAR_NUMBER = [4, 5];
var STAR_NAME = ["R", "S"];

class Character {
    name;//角色识别名（不是英文名）
    star;//角色星数
    pfile;//Charaicon对应文件路径
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
        this.pfile = '.\\img\\p_' + this.name + '.png';
        this.signature = signature;
        this.element = element;
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
    new Character("eula", 5, "浪花骑士", Element.cryo, "欧菈"),
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
    new Character("tohma", 4, "渡来介者", Element.pyro, "托马"),
    new Character("gorou", 4, "戎犬锵锵", Element.geo, "五郎"),
    new Character("itto", 5, "花坂豪快", Element.geo, "荒泷一斗"),
    new Character("yae", 5, "浮世笑百姿", Element.electro, "八重神子"),
    new Character("ayato", 5, "磐祭叶守", Element.hydro, "神里绫人"),
    new Character("shinobu", 4, "烦恼刈除", Element.electro, "久岐忍"),
    new Character("heizo", 4, "心朝乂安", Element.anemo, "鹿野院平藏"),
    new Character("kirara", 4, "檐宇猫游", Element.dendro, "绮良良"),
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

var CHARACTER_NAMES = [];
for (var i = 0; i < CHARACTER_LIST.length; i++) {
    CHARACTER_NAMES.push(CHARACTER_LIST[i].name);
}

var itemPools = {
    wish_4_4_1: [
        ["xianyun"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["gaming", "faruzan", "noelle"],
        ["lynette", "sayu", "heizo", "sucrose", "charlotte", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "yunjin", "barbara", "candace", "xingqiu", "bennett", "chevreuse", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_4_4_2: [
        ["nahida"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["gaming", "faruzan", "noelle"],
        ["lynette", "sayu", "heizo", "sucrose", "charlotte", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "yunjin", "barbara", "candace", "xingqiu", "bennett", "chevreuse", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_4_3_3: [
        ["shogun"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["chevreuse", "sara", "bennett"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "charlotte", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_4_3_4: [
        ["yoimiya"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["chevreuse", "sara", "bennett"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "charlotte", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_4_3_1: [
        ["navia"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["sucrose", "rosaria", "candace"],
        ["faruzan", "lynette", "sayu", "heizo", "charlotte", "chongyun", "diona", "freminet", "layla", "mika", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "xingqiu", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_4_3_2: [
        ["ayaka"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["sucrose", "rosaria", "candace"],
        ["faruzan", "lynette", "sayu", "heizo", "charlotte", "chongyun", "diona", "freminet", "layla", "mika", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "xingqiu", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_4_2_3: [
        ["cyno"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kirara", "shinobu", "xiangling"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "tohma", "xinyan", "yanfei"]
    ],
    wish_4_2_4: [
        ["ayato"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kirara", "shinobu", "xiangling"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "tohma", "xinyan", "yanfei"]
    ],
    wish_4_2_1: [
        ["furina"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["charlotte", "collei", "beidou"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "kaveh", "kirara", "yaoyao", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_4_2_2: [
        ["baizhu"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["charlotte", "collei", "beidou"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "chongyun", "diona", "freminet", "layla", "mika", "rosaria", "kaveh", "kirara", "yaoyao", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_4_1_3: [
        ["wriothesley"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["chongyun", "tohma", "dori"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "xiangling", "xinyan", "yanfei"]
    ],
    wish_4_1_4: [
        ["venti"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["chongyun", "tohma", "dori"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "diona", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "xiangling", "xinyan", "yanfei"]
    ],
    wish_4_1_1: [
        ["neuvillette"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["fischl", "xingqiu", "diona"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "chongyun", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_4_1_2: [
        ["hutao"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["fischl", "xingqiu", "diona"],
        ["faruzan", "lynette", "sayu", "heizo", "sucrose", "chongyun", "freminet", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    // 4.0
    wish_4_0_3: [
        ["zhongli"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["freminet", "sayu", "noelle"],
        ["faruzan", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "yunjin", "barbara", "candace", "xingqiu", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_4_0_4: [
        ["tartaglia"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["freminet", "sayu", "noelle"],
        ["faruzan", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "yunjin", "barbara", "candace", "xingqiu", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_4_0_1: [
        ["lyney"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["lynette", "bennett", "barbara"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "candace", "xingqiu", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_4_0_2: [
        ["yelan"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["lynette", "bennett", "barbara"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "kirara", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "candace", "xingqiu", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    // 3.8
    wish_3_8_3: [
        ["kokomi"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["faruzan", "rosaria", "yanfei"],
        ["sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "kirara", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "yunjin", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "tohma", "xiangling", "xinyan"]
    ],
    wish_3_8_4: [
        ["wanderer"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["faruzan", "rosaria", "yanfei"],
        ["sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "kirara", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "yunjin", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "tohma", "xiangling", "xinyan"]
    ],
    wish_3_8_1: [
        ["eula"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["mika", "razor", "tohma"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "kirara", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "yunjin", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "xiangling", "xinyan", "yanfei"]
    ],
    wish_3_8_2: [
        ["klee"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["mika", "razor", "tohma"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "kirara", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "yunjin", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "xiangling", "xinyan", "yanfei"]
    ],
    // 3.7
    wish_3_7_3: [
        ["alhaitham"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["heizo", "xiangling", "yaoyao"],
        ["faruzan", "sayu", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "tohma", "xinyan", "yanfei"]
    ],
    wish_3_7_4: [
        ["kazuha"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["heizo", "xiangling", "yaoyao"],
        ["faruzan", "sayu", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "tohma", "xinyan", "yanfei"]
    ],
    wish_3_7_1: [
        ["yoimiya"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kirara", "yunjin", "chongyun"],
        ["faruzan", "sayu", "heizo", "sucrose", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_3_7_2: [
        ["yae"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kirara", "yunjin", "chongyun"],
        ["faruzan", "sayu", "heizo", "sucrose", "diona", "layla", "mika", "rosaria", "collei", "kaveh", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    // 3.6
    wish_3_6_3: [
        ["baizhu"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kaveh", "candace", "fischl"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "yaoyao", "beidou", "dori", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "xingqiu", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_3_6_4: [
        ["ganyu"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["kaveh", "candace", "fischl"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "mika", "rosaria", "collei", "yaoyao", "beidou", "dori", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "xingqiu", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_3_6_1: [
        ["nahida"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["shinobu", "dori", "layla"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "mika", "rosaria", "collei", "yaoyao", "beidou", "fischl", "sara", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_3_6_2: [
        ["nilou"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["shinobu", "dori", "layla"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "mika", "rosaria", "collei", "yaoyao", "beidou", "fischl", "sara", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    // 3.5
    wish_3_5_3: [
        ["shenhe"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["diona", "sucrose", "mika"],
        ["faruzan", "sayu", "heizo", "chongyun", "layla", "rosaria", "collei", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_3_5_4: [
        ["ayaka"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "dehya", "diluc"],
        ["diona", "sucrose", "mika"],
        ["faruzan", "sayu", "heizo", "chongyun", "layla", "rosaria", "collei", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "barbara", "candace", "xingqiu", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_3_5_1: [
        ["dehya"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["bennett", "barbara", "collei"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "candace", "xingqiu", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_3_5_2: [
        ["cyno"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["bennett", "barbara", "collei"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "yaoyao", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "yunjin", "candace", "xingqiu", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    // 3.4
    wish_3_4_3: [
        ["hutao"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["xingqiu", "ningguang", "beidou"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "collei", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "noelle", "yunjin", "barbara", "candace", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_3_4_4: [
        ["yelan"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["xingqiu", "ningguang", "beidou"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "collei", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "noelle", "yunjin", "barbara", "candace", "bennett", "tohma", "xiangling", "xinyan", "yanfei"]
    ],
    wish_3_4_1: [
        ["alhaitham"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["yaoyao", "yunjin", "xinyan"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "collei", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "tohma", "xiangling", "yanfei"]
    ],
    wish_3_4_2: [
        ["xiao"],
        ["jean", "qiqi", "tighnari", "keqing", "mona", "diluc"],
        ["yaoyao", "yunjin", "xinyan"],
        ["faruzan", "sayu", "heizo", "sucrose", "chongyun", "diona", "layla", "rosaria", "collei", "beidou", "dori", "fischl", "sara", "shinobu", "razor", "gorou", "ningguang", "noelle", "barbara", "candace", "xingqiu", "bennett", "tohma", "xiangling", "yanfei"]
    ]
}