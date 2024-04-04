// card.js
// 卡片。控制布局及内容。

/**
 * 未参与的五星角色
 */
var S_Non = [];

/**
 * 未参与的四星角色
 */
var R_Non = [];

/**
 * 未参与的五星武器
 */
var SW_Non = [];

/**
 * 未参与的四星武器
 */
var RW_Non = [];

/**
 * S Chronicled Box
 */
var E_SChBox = document.getElementById("Chronicled_Sup_PoolBox");

/**
 * S Non Box
 */
var E_SnonBox = document.getElementById("Snon_PoolBox");
var E_SupBox = document.getElementById("Sup_PoolBox");
var E_ScommonBox = document.getElementById("Scommon_PoolBox");
var E_RnonBox = document.getElementById("Rnon_PoolBox");
var E_RupBox = document.getElementById("Rup_PoolBox");
var E_RcommonBox = document.getElementById("Rcommon_PoolBox");

var E_RWBox = document.getElementById("RW_PoolBox");
var E_RWnonBox = document.getElementById("RWnon_PoolBox");

var inventory = document.getElementById("inventory");

var E_StartSDrop = document.getElementById("StartSDrop");
var E_StartRDrop = document.getElementById("StartRDrop");
var E_uc_option1_1 = document.getElementById("uc_option1_1");
var E_uc_option1_2 = document.getElementById("uc_option1_2");
var E_uc_option2_1 = document.getElementById("uc_option2_1");
var E_uc_option2_2 = document.getElementById("uc_option2_2");
var E_GachaTimes = document.getElementById("GachaTimes");
var E_GachaForm = document.getElementById("GachaForm");

var E_SBoxes = document.querySelectorAll(".SBox");

/**
 * 物品是?星
 * @param {Number} star
 * @param {String} name Weapon或Character的识别名 
 */
function isStar(star, name) {
    if (getGameObject(name).star == star) {
        return true;
    } else {
        return false;
    }
}

function isUp(name) {
    var u = Sup.concat(Rup);
    if (u.includes(name)) {
        return true;
    } else {
        return false;
    }
}

function isCommon(name) {
    var u = Scommon.concat(Rcommon);
    if (u.includes(name)) {
        return true;
    } else {
        return false;
    }
}


/**
 * @function 是否为五星角色
 * @param {String} characterName 
 * @returns 
 */
function isSCharacter(characterName) {
    var _chara = characterMap[characterName];
    if (_chara && _chara.star == 5) return true;
    return false;
}

/**
 * @function 是否为四星角色
 * @param {String} characterName 
 * @returns 
 */
function isRCharacter(characterName) {
    var _chara = characterMap[characterName];
    if (_chara && _chara.star == 4) return true;
    return false;
}

/**
 * @function 是否为Up角色
 * @param {String} characterName 
 * @returns 
 */
function isUpCharacter(characterName) {
    return !!upCharacterMap[characterName];
}

function isCommonCharacter(characterName) {
    return !!commonCharacterMap[characterName];
}

function checkSCharacter() {
    var obtainedCharacters = [];
    if (containerInfo.length > 1) {
        for (var i = 1; i < containerInfo.length; i++) {
            if (containerInfo[i].type == 'weapon') continue;
            obtainedCharacters.push(containerInfo[i].name);
        }
    }
    var num = 0;
    for (var character of obtainedCharacters) {
        if (isSCharacter(character)) num += 1;
    }
    return num;
}

function checkSUpCharacter() {
    var obtainedCharacters = [];
    if (containerInfo.length > 1) {
        for (var i = 1; i < containerInfo.length; i++) {
            if (containerInfo[i].type == 'weapon') continue;
            obtainedCharacters.push(containerInfo[i].name);
        }
    }
    var num = 0;
    for (var character of obtainedCharacters) {
        if (isSCharacter(character) && isUpCharacter(character)) num += 1;
    }
    return num;
}

function checkSCommonCharacter() {
    var obtainedCharacters = [];
    if (containerInfo.length > 1) {
        for (var i = 1; i < containerInfo.length; i++) {
            if (containerInfo[i].type == 'weapon') continue;
            obtainedCharacters.push(containerInfo[i].name);
        }
    }
    var num = 0;
    for (var character of obtainedCharacters) {
        if (isSCharacter(character) && isCommonCharacter(character)) num += 1;
    }
    return num;
}

/**
 * 清空NonBox、UpBox、CommonBox中的卡片
 */
function clearCard() {
    document.getElementById("Chronicled_Sup_PoolBox").innerHTML = "";
    document.getElementById("Snon_PoolBox").innerHTML = "";
    document.getElementById("Rnon_PoolBox").innerHTML = "";
    document.getElementById("Rup_PoolBox").innerHTML = "";
    document.getElementById("Sup_PoolBox").innerHTML = "";
    document.getElementById("Rcommon_PoolBox").innerHTML = "";
    document.getElementById("Scommon_PoolBox").innerHTML = "";
}

/**
 * 制造单个卡片
 * @param {Character} character 【角色类对象】角色
 * @param {Element} destination 【元素类对象】放置目的地
 * @returns 
 */
function initializeCharacterCard(character, destination) {
    var _chara = character;
    var _card = document.createElement("div");
    _card.classList.add("card");
    _card.classList.add("characterCard");
    _card.classList.add(extractValue(_chara.element, ELEMENT_NUMBER, ELEMENT_NAME));
    _card.classList.add("star" + extractValue(_chara.star, STAR_NUMBER, STAR_NAME));
    var _charaicon = document.createElement("img");
    _charaicon.src = _chara.pfile;
    _card.appendChild(_charaicon);
    var _title = document.createElement("p");
    _title.innerHTML = _chara.nameChs;
    _card.appendChild(_title);
    var elementChs = extractValue(_chara.element, ELEMENT_NUMBER, ELEMENT_NAMECHS);
    _card.title = _chara.star + "星【" + elementChs + "】 “" + _chara.signature + "” " + _chara.nameChs;
    _card.onclick = function () {
        moveCard(this);
    };
    /**
     * 目的地
     */
    var parentNode = destination;
    _card.id = "card_" + _chara.name;//卡片id
    if (parentNode.id == E_SChBox.id) {
        _card.id = "card_chronicled_" + _chara.name;
        _card.onclick = function () {
            alert("直接点击候选栏（可定轨五星池）中的物品属于无效操作。该区域中的卡片仅有展示作用。\n请点击“已定轨五星池”、“未定轨五星池”或“不参与集录祈愿的五星物品”三个区域中的卡片以更改定轨的物品。");
        }
    }
    if (parentNode.parentNode.id == inventory.id) {
        _card.id = "card_obtained_" + _chara.name;
    }
    parentNode.appendChild(_card);
}

/**
 * 
 * @param {Weapon} weapon 
 * @param {Element} destination 
 */
function initializeWeaponCard(weapon, destination) {
    var _weapon = weapon;
    var _card = document.createElement("div");
    _card.classList.add("card");
    _card.classList.add("weaponCard");
    _card.classList.add("star" + extractValue(_weapon.star, STAR_NUMBER, STAR_NAME));
    var _weaponImg = document.createElement("img");
    _weaponImg.src = _weapon.weaponFile;
    _card.appendChild(_weaponImg);
    var _title = document.createElement("p");
    _title.innerHTML = _weapon.nameChs;
    _card.appendChild(_title);
    _card.title = _weapon.star + "星 " + _weapon.nameChs;
    var parentNode = destination;
    _card.id = "card_" + _weapon.name;//卡片id
    _card.onclick = function () {
        moveCard(this);
    };
    if (parentNode.id == E_SChBox.id) {
        _card.id = "card_chronicled_" + _weapon.name;
        _card.onclick = function () {
            alert("直接点击候选栏（可定轨五星池）中的物品属于无效操作。该区域中的卡片仅有展示作用。\n请点击“已定轨五星池”、“未定轨五星池”或“不参与集录祈愿的五星物品”三个区域中的卡片以更改定轨的物品。");
        }
    }
    if (parentNode.parentNode.id == inventory.id) {
        _card.id = "card_obtained_" + _weapon.name;
    }
    parentNode.appendChild(_card);
}

function generateCard(name, destination) {
    if (getItemType(name) == "weapon") {
        initializeWeaponCard(findWeapon(name), destination);
        return;
    }
    if (getItemType(name) == "character") {
        initializeCharacterCard(findCharacter(name), destination);
        return;
    }
    throw new Error("generateCard：卡片生成失败。未找到名为" + name + "的数据。");
}

/**
 * 初始化所有卡片
 */
function initializeAllCard() {
    clearCard();
    ChronicledSup = [];
    Sup = [];
    Rup = [];
    Scommon = [];
    Rcommon = [];
    S_Non = [];
    R_Non = [];
    RW = [];
    SW_Non = [];
    RW_Non = [];
    if (_CHRONICLE_MODE == false) {
        if (_GACHA_MODE == "character") {
            for (var i = 0; i < CHARACTER_NAMES.length; i++) {
                var _chara = findCharacter(CHARACTER_NAMES[i]);
                if (_chara.star == 4) initializeCharacterCard(_chara, E_RnonBox);
                if (_chara.star == 5) initializeCharacterCard(_chara, E_SnonBox);
            }
            for (var i = 0; i < WEAPON_NAMES.length; i++) {
                var _weapon = findWeapon(WEAPON_NAMES[i]);
                if (_weapon.star == 4) initializeWeaponCard(_weapon, E_RnonBox);
            }
        }
        if (_GACHA_MODE == "weapon") {
            for (var i = 0; i < CHARACTER_NAMES.length; i++) {
                var _chara = findCharacter(CHARACTER_NAMES[i]);
                if (_chara.star == 4) initializeCharacterCard(_chara, E_RnonBox);
            }
            for (var i = 0; i < WEAPON_NAMES.length; i++) {
                var _weapon = findWeapon(WEAPON_NAMES[i]);
                if (_weapon.star == 4) initializeWeaponCard(_weapon, E_RnonBox);
                if (_weapon.star == 5) initializeWeaponCard(_weapon, E_SnonBox);
            }
        }
    }
}

document.body.onload = initializeAllCard();//body加载后立刻初始化所有卡片


/**
 * 卡片发生位置移动后，请执行一遍此函数之后在进行wish
 */
function tidyPoolArray() {
    //获取各卡片并对应
    resetDetail();//清除所有数组

    //1.候选数组
    for (var i = 0; i < E_SChBox.children.length; i++) {
        Candidates.push(E_SChBox.children[i].id.slice(16));
    }
    Candidates = rearrangeItem(Candidates);

    //2.Sup数组
    for (var i = 0; i < E_SupBox.children.length; i++) {
        Sup.push(E_SupBox.children[i].id.slice(5));
    }
    Sup = rearrangeItem(Sup);
    Sup_C = Sup.filter(item => getItemType(item) == "character");
    Sup_W = Sup.filter(item => getItemType(item) == "weapon");

    //3.Rup数组
    for (var i = 0; i < E_RupBox.children.length; i++) {
        Rup.push(E_RupBox.children[i].id.slice(5));
    }
    Rup = rearrangeItem(Rup);
    Rup_C = Rup.filter(item => getItemType(item) == "character");
    Rup_W = Rup.filter(item => getItemType(item) == "weapon");

    //4.Scommon数组
    for (var i = 0; i < E_ScommonBox.children.length; i++) {
        Scommon.push(E_ScommonBox.children[i].id.slice(5));
    }
    Scommon = rearrangeItem(Scommon);
    Scommon_C = Scommon.filter(item => getItemType(item) == "character");
    Scommon_W = Scommon.filter(item => getItemType(item) == "weapon");

    //5.Rcommon数组
    for (var i = 0; i < E_RcommonBox.children.length; i++) {
        Rcommon.push(E_RcommonBox.children[i].id.slice(5));
    }
    Rcommon_C = Rcommon.filter(item => getItemType(item) == "character");
    Rcommon_W = Rcommon.filter(item => getItemType(item) == "weapon");
}


/**
 * 用户动手操作时调用该函数
 * @param {Element} element 
 */
function moveCard(element) {
    var passenger = element;
    var passengerName = element.id.slice(5);
    var passengerType = getItemType(passengerName);
    var origin = element.parentNode;//起点
    var destination;//终点
    if (_CHRONICLE_MODE == false && _GACHA_MODE == "character") {
        if (origin.id == E_ScommonBox.id) {//起点是Scommon，应前往Sup，若当前有Sup，替换掉当前Sup
            destination = E_SupBox;
            var opposite;
            if (destination.children.length != 0) {
                opposite = destination.children[0].id.slice(5);
                destination.removeChild(destination.children[0]);
                generateCard(opposite, origin);
            }
            origin.removeChild(passenger);
            generateCard(passengerName, destination);
        }
        if (origin.id == E_SupBox.id) {//起点是Sup，应前往Snon
            destination = E_SnonBox;
            origin.removeChild(passenger);
            generateCard(passengerName, destination);
        }
        if (origin.id == E_SnonBox.id) {//起点是Snon，应前往Scommon
            destination = E_ScommonBox;
            origin.removeChild(passenger);
            generateCard(passengerName, destination);
        }
        if (origin.id == E_RcommonBox.id && passengerType == "character") {
            destination = E_RupBox;
            origin.removeChild(passenger);
            generateCard(passengerName, destination);
        }
        if (origin.id == E_RcommonBox.id && passengerType == "weapon") {
            destination = E_RnonBox;
            origin.removeChild(passenger);
            generateCard(passengerName, destination);
        }
        if (origin.id == E_RupBox.id) {
            destination = E_RnonBox;
            origin.removeChild(passenger);
            generateCard(passengerName, destination);
        }
        if (origin.id == E_RnonBox.id) {
            destination = E_RcommonBox;
            origin.removeChild(passenger);
            generateCard(passengerName, destination);
        }
    }
    if (_CHRONICLE_MODE == false && _GACHA_MODE == "weapon") {
        if (origin.id == E_ScommonBox.id) {//起点是Scommon，应前往Sup，若当前有Sup，替换掉当前Sup
            destination = E_SupBox;
            var opposite;
            if (destination.children.length == 2) {
                opposite = destination.children[0].id.slice(5);
                destination.removeChild(destination.children[0]);
                generateCard(opposite, origin);
            }
            origin.removeChild(passenger);
            generateCard(passengerName, destination);
        }
        if (origin.id == E_SupBox.id) {//起点是Sup，应前往Snon
            destination = E_SnonBox;
            origin.removeChild(passenger);
            if (E_SChBox.children.length != 0) {
                E_SChBox.removeChild(document.getElementById("card_chronicled_" + passengerName));
            }
            generateCard(passengerName, destination);
        }
        if (origin.id == E_SnonBox.id) {//起点是Snon，应前往Scommon
            destination = E_ScommonBox;
            origin.removeChild(passenger);
            generateCard(passengerName, destination);
        }
        if (origin.id == E_RcommonBox.id && passengerType == "character") {
            destination = E_RupBox;
            origin.removeChild(passenger);
            generateCard(passengerName, destination);
        }
        if (origin.id == E_RcommonBox.id && passengerType == "weapon") {
            destination = E_RnonBox;
            origin.removeChild(passenger);
            generateCard(passengerName, destination);
        }
        if (origin.id == E_RupBox.id) {
            destination = E_RnonBox;
            origin.removeChild(passenger);
            generateCard(passengerName, destination);
        }
        if (origin.id == E_RnonBox.id) {
            destination = E_RcommonBox;
            origin.removeChild(passenger);
            generateCard(passengerName, destination);
        }
    }
    tidyPoolArray();
    return;
    if (origin.id === "Snon_PoolBox") destination = document.getElementById("Scommon_PoolBox");
    if (origin.id === "Scommon_PoolBox") destination = document.getElementById("Sup_PoolBox");
    if (origin.id === "Sup_PoolBox") destination = document.getElementById("Snon_PoolBox");
    if (_CHRONICLE_MODE == true) {
        console.log(findCharacter(passengerName).star);
        if (findCharacter(passengerName).star == 5) {
            if (origin.id === "Snon_PoolBox") {//要前往ScommonBox
                S_Non.deleteElement(passengerName);//消去Non的身份
                ChronicledSup.push(passengerName);//在Ch中登记
                Scommon.push(passengerName);
                initializeCharacterCard(findCharacter(passengerName), E_SChBox);//在Ch中复制一份
            }
            if (origin.id === "Scommon_PoolBox") {//要前往SupBox
                Scommon.deleteElement(passengerName);
                if (Sup.length != 0) {
                    E_SupBox.removeChild(document.getElementById("card_" + Sup[0]));//删除当前的Sup卡片
                    initializeCharacterCard(findCharacter(Sup[0]), E_ScommonBox);//并将其挪至Scom
                    Scommon.push(Sup[0]);//将当前的Sup驱赶至Scommon
                }
                Sup = [passengerName];
            }
            if (origin.id === "Sup_PoolBox") {//要前往SnonBox
                ChronicledSup.deleteElement(passengerName);
                S_Non.push(Sup[0]);
                Sup.deleteElement(passengerName);
                E_SChBox.removeChild(document.getElementById("card_chronicled_" + passengerName));
            }
        }
        if (findCharacter(passengerName).star == 4) {
            if (origin.id == E_RnonBox.id) {//要前往Rup
                destination = E_RupBox;
                R_Non.deleteElement(passengerName);
                Rup.push(passengerName);
            }
            if (origin.id == E_RupBox.id) {//要返回Rnon
                destination = E_RnonBox;
                Rup.deleteElement(passengerName);
                R_Non.push(passengerName);
            }
        }
        origin.removeChild(passenger);
        destination.appendChild(passenger);
    }
}

/**
 * 从卡池数组中刷新卡片
 */
function analizeCardSet() {
    clearCard();
    if (_CHRONICLE_MODE == false) {
        var participants = Sup.concat(Rup.concat(Scommon.concat(Rcommon)));
        let outsiders = [];
        let all = doValue(CHARACTER_NAMES);
        all = all.concat(WEAPON_NAMES);//all为一切物品之和
        outsiders = all.filter(item => !participants.includes(item));
        //将未参与的物品数组(outsiders)处理完毕
        if (_GACHA_MODE == "character") {
            for (var i = 0; i < Sup.length; i++) {
                generateCard(Sup[i], E_SupBox);
            }
            for (var i = 0; i < Rup.length; i++) {
                generateCard(Rup[i], E_RupBox);
            }
            for (var i = 0; i < Scommon.length; i++) {
                generateCard(Scommon[i], E_ScommonBox);
            }
            for (var i = 0; i < Rcommon.length; i++) {
                generateCard(Rcommon[i], E_RcommonBox);
            }
            //将已参与的物品卡片全部安置完毕
            //未参与的物品：仅限于四星武器、四星角色和五星角色
            for (var i = 0; i < outsiders.length; i++) {
                if (isStar(4, outsiders[i])) generateCard(outsiders[i], E_RnonBox);
                if (isStar(5, outsiders[i]) && getItemType(outsiders[i]) == "character") generateCard(outsiders[i], E_SnonBox);
            }
        }
        if (_GACHA_MODE == "weapon") {
            for (var i = 0; i < Sup.length; i++) {
                generateCard(Sup[i], E_SChBox);
                generateCard(Sup[i], E_ScommonBox);
            }
            for (var i = 0; i < Rup.length; i++) {
                generateCard(Rup[i], E_RupBox);
            }
            for (var i = 0; i < Scommon.length; i++) {
                generateCard(Scommon[i], E_ScommonBox);
                generateCard(Scommon[i], E_SChBox);
            }
            for (var i = 0; i < Rcommon.length; i++) {
                generateCard(Rcommon[i], E_RcommonBox);
            }
            //未参与的物品：仅限于四星武器、五星武器以及四星角色
            for (var i = 0; i < outsiders.length; i++) {
                if (isStar(4, outsiders[i])) generateCard(outsiders[i], E_RnonBox);
                if (isStar(5, outsiders[i]) && getItemType(outsiders[i]) == "weapon") generateCard(outsiders[i], E_SnonBox);
            }
        }
    }
    tidyPoolArray();
    /*
        let non = [];
        let all = [];
        all = doValue(CHARACTER_NAMES);//录入所有角色名
        all.deleteElement(Sup[0]);//删除五星Up集
        for (var i = 0; i < Scommon.length; i++) {
            all.deleteElement(Scommon[i]);
        }//从所有角色名中删除 常驻五星
        for (var i = 0; i < Rup.length; i++) {
            all.deleteElement(Rup[i]);
        }
        for (var i = 0; i < Rcommon.length; i++) {
            all.deleteElement(Rcommon[i]);
        }
        if (_CHRONICLE_MODE == true) {
            for (var i = 0; i < ChronicledSup.length; i++) {
                all.deleteElement(ChronicledSup[i]);
            }
        }
        non = all;//令未选中的角色为删除操作后的所有角色
        //角色all处理完毕
    
    
        for (var i = 0; i < non.length; i++) {
            if (findCharacter(non[i]).star === 4) R_Non.push(non[i]);
            if (findCharacter(non[i]).star === 5) S_Non.push(non[i]);
        }//将所有未选中的角色安置
        if (_CHRONICLE_MODE == true) {
            for (var i = 0; i < ChronicledSup.length; i++) {
                initializeCharacterCard(findCharacter(ChronicledSup[i]), E_SChBox);
            }
        }
        if (_CHRONICLE_MODE == false) {
            initializeCharacterCard(findCharacter(Sup[0]), E_SupBox);
        }
        for (var i = 0; i < Scommon.length; i++) {
            initializeCharacterCard(findCharacter(Scommon[i]), E_ScommonBox);
        }
        for (var i = 0; i < Rup.length; i++) {
            initializeCharacterCard(findCharacter(Rup[i]), E_RupBox);
        }
        if (_CHRONICLE_MODE == false) {
            for (var i = 0; i < Rcommon.length; i++) {
                initializeCharacterCard(findCharacter(Rcommon[i]), document.getElementById("Rcommon_PoolBox"));
            }
        }
        for (var i = 0; i < S_Non.length; i++) {
            initializeCharacterCard(findCharacter(S_Non[i]), E_SnonBox);
        }
        for (var i = 0; i < R_Non.length; i++) {
            initializeCharacterCard(findCharacter(R_Non[i]), E_RnonBox);
        }
    
        //----------------角色结束------武器开始------------------
    
        all = doValue(WEAPON_NAMES);//录入所有武器名
        if (_GACHA_MODE == "character") {
            for (var i = 0; i < RW.length; i++) {
                all.deleteElement(RW[i]);
            }
        }
        non = all;
        //武器all处理完毕
        for (var i = 0; i < non.length; i++) {
            if (findWeapon(non[i]).star === 4) RW_Non.push(non[i]);
        }
        //将所有未选中的武器安置在数组中
        for (var i = 0; i < RW.length; i++) {
            initializeWeaponCard(findWeapon(RW[i]), E_RWBox);
        }
        for (var i = 0; i < RW_Non.length; i++) {
            initializeWeaponCard(findWeapon(RW_Non[i]), E_RWnonBox);
        }
        */
}

/**
 * 获取下拉菜单的值以更新卡片
 * @returns 
 */
function updateCards() {
    if (_GACHA_MODE == "character") {
        poolSelector = document.getElementById("characterPoolSelect");
    }
    if (_GACHA_MODE == "weapon") {
        poolSelector = document.getElementById("weaponPoolSelect");
    }
    var selectedPool = poolSelector.value;
    if (selectedPool == "none") {
        initializeAllCard();
        return;
    } else {
        resetDetail();
        if (_GACHA_MODE == "character") {
            selectWishPool(itemPools[selectedPool]);
        }
        if (_GACHA_MODE == "weapon") {
            selectWishPool(weaponPools[selectedPool]);
        }
        analizeCardSet();
    }
}

function updateChronicle() {
    if (_CHRONICLE_MODE == false) return;
    var chronicledPoolSelect = document.getElementById("chronicledPoolSelect");
    var selectedPool = chronicledPoolSelect.value;
    if (selectedPool == "none") {
        initializeAllCard();
        return;
    }
    selectWishPool(chronicledPools[selectedPool]);
    analizeCardSet();
}

function outputObtained() {
    inventory.innerHTML = "";
    checkPools();
    for (var i = 1; i < containerInfo.length + 1; i++) {
        if (containerInfo[i] == undefined) return;
        var _container = document.createElement("div");
        _container.classList.add("container");
        if (containerInfo[i].type == "character") {
            if (isSCharacter(containerInfo[i].name) && isUpCharacter(containerInfo[i].name)) _container.classList.add("SUpContainer");
            if (isRCharacter(containerInfo[i].name) && isUpCharacter(containerInfo[i].name)) _container.classList.add("RUpContainer");
            inventory.appendChild(_container);
            initializeCharacterCard(findCharacter(containerInfo[i].name), _container);
        } else {
            inventory.appendChild(_container);
            initializeWeaponCard(findWeapon(containerInfo[i].name), _container);
        }
        inventory.children[inventory.children.length - 1].children[0].id += "_" + Number(i);
        _container.innerHTML += "<p class='veryMark'><strong>" + Number(containerInfo[i].obtainedCalc) + "</strong></p>";
        _container.innerHTML += "<p>#" + Number(i) + ":(" + Number(containerInfo[i].obtainedRecord) + ")</p>";
    }
}