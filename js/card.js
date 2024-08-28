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

var E_SEL_CH = document.getElementById("chronicledPoolSelect")

var E_StartSDrop = document.getElementById("StartSDrop");
var E_StartRDrop = document.getElementById("StartRDrop");
var E_uc_option1_1 = document.getElementById("uc_option1_1");
var E_uc_option1_2 = document.getElementById("uc_option1_2");
var E_uc_option2_1 = document.getElementById("uc_option2_1");
var E_uc_option2_2 = document.getElementById("uc_option2_2");
var E_GachaTimes = document.getElementById("GachaTimes");
var E_GachaForm = document.getElementById("GachaForm");

var E_SBoxes = document.querySelectorAll(".SBox");

function getSelectValue(element) {
    return element.value;
}

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


function check(array) {
    var num = 0;
    if (containerInfo.length > 1) {
        for (var i = 1; i < containerInfo.length; i++) {
            if (array.includes(containerInfo[i].name)) {
                num += 1;
            }
        }
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

function refreshCardSize() {// 获取所有满足选择器".card div.cardTitle"的元素
    let elements = document.querySelectorAll('.card div.cardTitle');

    // 根据LANGUAGE_CODE设置font-size
    elements.forEach(element => {
        if (LANGUAGE_CODE === "chs") {
            element.style.fontSize = "calc(var(--universal-font-size) * 0.6)";
            element.style["white-space"] = "nowrap";
            element.style["font-weight"] = "500";
        } else if (LANGUAGE_CODE === "eng") {
            element.style.fontSize = "calc(var(--universal-font-size) * 0.5)";
            element.style["white-space"] = "normal";
            element.style["font-weight"] = "700";
        }
    });

    elements = document.querySelectorAll('.card');
    elements.forEach(element => {
        if (LANGUAGE_CODE === "chs") {
            element.style.width = "var(--card-width)";
            element.style.height = "var(--card-height)";
        } else if (LANGUAGE_CODE === "eng") {
            element.style.width = "calc(var(--card-width) * 1.05)";
            element.style.height = "calc(var(--card-height) * 1.17)";
        }
    });

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
    var fullName = _chara.fullName[LANGUAGE_CODE];
    var elementName = ELEMENT_CALL[_chara.elementName][LANGUAGE_CODE];
    //创建img
    var _charaicon = document.createElement("img");
    _charaicon.src = _chara.pfile;
    _card.appendChild(_charaicon);
    //创建cardTitle(div)
    var _title = document.createElement("div");
    _title.classList.add("cardTitle");
    _title.innerHTML = fullName;
    _card.appendChild(_title);
    _card.title = _chara.star + "★[" + elementName + "] \"" + _chara.signature[LANGUAGE_CODE] + "\" - " + _chara.fullName[LANGUAGE_CODE];
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
    $(parentNode).append(_card);
    refreshCardSize();
    if ($(destination).parent().attr("id") != 'inventory') {//v5.4.9
        _card.classList.add("console_card");
        $(_card).hide(10);
        $(_card).fadeIn(400);
    }
}

/**
 * 
 * @param {Weapon} weapon 
 * @param {Element} destination 
 */
function initializeWeaponCard(weapon, destination) {
    var _weapon = weapon;
    var _card = document.createElement("div");
    var shownName = _weapon.fullName[LANGUAGE_CODE];
    var cardHover = shownName;
    _card.classList.add("card");
    _card.classList.add("weaponCard");
    _card.classList.add("star" + extractValue(_weapon.star, STAR_NUMBER, STAR_NAME));
    var _weaponImg = document.createElement("img");
    _weaponImg.src = _weapon.weaponFile;
    _card.appendChild(_weaponImg);
    var _title = document.createElement("div");
    _title.classList.add("cardTitle");
    _title.innerHTML = shownName;
    _card.appendChild(_title);
    _card.title = cardHover + " " + _weapon.star + "★";
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
    $(parentNode).append(_card);
    refreshCardSize();
    if ($(destination).parent().attr("id") != 'inventory') {//v5.4.9
        _card.classList.add("console_card");
        $(_card).hide(10);
        $(_card).fadeIn(400);
    }
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
    } else {
        if (getSelectValue(E_SEL_CH) == "none_C") {//定轨角色的记录卡池
            for (var i = 0; i < CHARACTER_NAMES.length; i++) {
                var _chara = findCharacter(CHARACTER_NAMES[i]);
                if (_chara.star == 5) initializeCharacterCard(_chara, E_SnonBox);
                if (_chara.star == 4) initializeCharacterCard(_chara, E_RnonBox);
            }
            for (var i = 0; i < WEAPON_NAMES.length; i++) {
                var _weapon = findWeapon(WEAPON_NAMES[i]);
                if (_weapon.star == 4) initializeWeaponCard(_weapon, E_RnonBox);
            }
        }
        if (getSelectValue(E_SEL_CH) == "none_W") {//定轨武器的集录卡池
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

    if (_CHRONICLE_MODE == false && _GACHA_MODE == "weapon") {
        var E = document.getElementById("EpitomizationClaim");
        if (Sup.length == 0) {
            E.innerHTML = "󰯏神铸定轨：【未定轨】（请选择参与神铸定轨的第<strong>一</strong>把武器）";
        } else if (Sup.length == 1) {
            E.innerHTML = "󰯏神铸定轨：【未定轨】（请选择参与神铸定轨的第<strong>二</strong>把武器）";
        } else {
            let shownName = findWeapon(Sup[0]).fullName[LANGUAGE_CODE];
            E.innerHTML = "󰯏神铸定轨：【已定轨<strong>" + shownName + "</strong>】";
        }
    }
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
            generateCard(passengerName, E_SChBox);
        }
        if (origin.id == E_RcommonBox.id && passengerType == "character") {
            destination = E_RnonBox;
            origin.removeChild(passenger);
            generateCard(passengerName, destination);
        }
        if (origin.id == E_RcommonBox.id && passengerType == "weapon") {
            destination = E_RupBox;
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
    if (_CHRONICLE_MODE == true) {
        if (getSelectValue(E_SEL_CH).slice(-1) == 'C') {//定轨角色
            if (origin.id == E_ScommonBox.id) {//起点是Scommon，应前往Sup，若当前有Sup，替换掉当前Sup
                destination = E_SupBox;
                var opposite;
                if (destination.children.length == 1) {
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
                E_SChBox.removeChild(document.getElementById("card_chronicled_" + passengerName));
                generateCard(passengerName, destination);
            }
            if (origin.id == E_SnonBox.id) {//起点是Snon，应前往Scommon
                destination = E_ScommonBox;
                origin.removeChild(passenger);
                generateCard(passengerName, destination);
                generateCard(passengerName, E_SChBox);
            }
            if (origin.id == E_RupBox.id) {
                destination = E_RnonBox;
                origin.removeChild(passenger);
                generateCard(passengerName, destination);
            }
            if (origin.id == E_RnonBox.id) {
                destination = E_RupBox;
                origin.removeChild(passenger);
                generateCard(passengerName, destination);
            }
        }
        if (getSelectValue(E_SEL_CH).slice(-1) == 'W') {
            if (origin.id == E_ScommonBox.id) {//起点是Scommon，应前往Sup，若当前有Sup，替换掉当前Sup
                destination = E_SupBox;
                var opposite;
                if (destination.children.length == 1) {
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
                generateCard(passengerName, E_SChBox);
            }
            if (origin.id == E_RupBox.id) {
                destination = E_RnonBox;
                origin.removeChild(passenger);
                generateCard(passengerName, destination);
            }
            if (origin.id == E_RnonBox.id) {
                destination = E_RupBox;
                origin.removeChild(passenger);
                generateCard(passengerName, destination);
            }
        }
    }
    tidyPoolArray();
    return;
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
                if (!Rup.includes(Rcommon[i])) generateCard(Rcommon[i], E_RcommonBox);
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
                if (!Rup.includes(Rcommon[i])) generateCard(Rcommon[i], E_RcommonBox);
            }
            //未参与的物品：仅限于四星武器、五星武器以及四星角色
            for (var i = 0; i < outsiders.length; i++) {
                if (isStar(4, outsiders[i])) generateCard(outsiders[i], E_RnonBox);
                if (isStar(5, outsiders[i]) && getItemType(outsiders[i]) == "weapon") generateCard(outsiders[i], E_SnonBox);
            }
        }
    } else {//集录模式
        var participants = Sup.concat(Rup.concat(Scommon.concat(Rcommon)));
        let outsiders = [];
        let all = doValue(CHARACTER_NAMES);
        all = all.concat(WEAPON_NAMES);//all为一切物品之和
        outsiders = all.filter(item => !participants.includes(item));
        //集录模式：五星武器或角色+四星武器+四星角色
        if (getSelectValue(E_SEL_CH).slice(-1) == 'C') {//定轨角色
            //Sup是空的
            for (var i = 0; i < Rup.length; i++) {
                generateCard(Rup[i], E_RupBox);
            }
            for (var i = 0; i < Scommon.length; i++) {
                generateCard(Scommon[i], E_ScommonBox);
                generateCard(Scommon[i], E_SChBox);
            }
            //Rup在集录中无效
            //将已参与的物品卡片全部安置完毕
            //未参与的物品：仅限于四星武器、四星角色和五星角色
            for (var i = 0; i < outsiders.length; i++) {
                if (isStar(4, outsiders[i])) generateCard(outsiders[i], E_RnonBox);
                if (isStar(5, outsiders[i]) && getItemType(outsiders[i]) == "character") generateCard(outsiders[i], E_SnonBox);
            }
        }
        if (getSelectValue(E_SEL_CH).slice(-1) == 'W') {//定轨武器
            for (var i = 0; i < Rup.length; i++) {
                generateCard(Rup[i], E_RupBox);
            }
            for (var i = 0; i < Scommon.length; i++) {
                generateCard(Scommon[i], E_ScommonBox);
                generateCard(Scommon[i], E_SChBox);
            }
            //Rup在集录中无效
            //未参与的物品：仅限于四星武器、五星武器以及四星角色
            for (var i = 0; i < outsiders.length; i++) {
                if (isStar(4, outsiders[i])) generateCard(outsiders[i], E_RnonBox);
                if (isStar(5, outsiders[i]) && getItemType(outsiders[i]) == "weapon") generateCard(outsiders[i], E_SnonBox);
            }
        }
    }
    tidyPoolArray();
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
            if (Number(selectedPool[5]) >= 5) {//原神v5.0及以后
                MAX_FATE_POINT = 1;
                document.getElementById("FatePointInput").max = 1;
            };
            if (Number(selectedPool[5]) <= 4) {
                MAX_FATE_POINT = 2;
                document.getElementById("FatePointInput").max = 2;
            };
            selectWishPool(weaponPools[selectedPool]);
        }
        analizeCardSet();
    }
}

function updateChronicle() {
    if (_CHRONICLE_MODE == false) return;
    if (getSelectValue(E_SEL_CH) == "none_C" || getSelectValue(E_SEL_CH) == "none_W") {
        initializeAllCard();
        return;
    }
    selectWishPool(chronicledPools[getSelectValue(E_SEL_CH)]);
    analizeCardSet();
}
function locateCards() {
    document.querySelectorAll('.card');
}

/**
 * 刷新相应卡片
 * @param {string} condition character/weapon R/S
 * @returns 
 */
function locateCardsOf(condition) {
    var selector = '.card';
    if (condition == "character") {
        selector += '.characterCard';
    }
    if (condition == "weapon") {
        selector += '.weaponCard';
    }
    if (condition == "character S") {
        selector += '.characterCard.starS';
    }
    if (condition == "character R") {
        selector += '.characterCard.starR';
    }
    if (condition == "weapon S") {
        selector += '.weaponCard.starS';
    }
    if (condition == "weapon R") {
        selector += '.weaponCard.starR';
    }
    return document.querySelectorAll(selector);
}

var screen = document.querySelector("body");

/**
 * 重要函数。控制鼠标悬停于卡片上后外观和文字的改变。
 */
function renewCardStyle() {
    SCharacterCards = locateCardsOf("character S");
    RCharacterCards = locateCardsOf("character R");
    characterCards = locateCardsOf("character");
    SCharacterCards.forEach(card => {
        card.addEventListener('mouseenter', function (event) {
            const card = event.currentTarget;
            if (!card.classList.contains('characterCard')) {
                return;
            }
            const cardId = card.id;
            const name = extractNameFromId(cardId); // 提取name部分
            const imageUrl = findCharacter(name).nfile; // 构建图片文件名
            card.style.backgroundImage = `url(${imageUrl})`; // 设置背景图片
        });
        card.addEventListener('touchstart', function (event) {
            const touch = event.touches[0];
            if (!isTouchedOn(card, touch)) {
                return;
            }
            if (!card.classList.contains('characterCard')) {
                return;
            }
            const cardId = card.id;
            const name = extractNameFromId(cardId); // 提取name部分
            const imageUrl = findCharacter(name).nfile; // 构建图片文件名
            card.style.backgroundImage = `url(${imageUrl})`; // 设置背景图片
        });
        card.addEventListener('mouseleave', function (event) {
            const card = event.currentTarget;
            card.style.backgroundImage = ''; // 恢复原样
        });
        card.addEventListener('touchend', function (event) {
            card.style.backgroundImage = '';
        });
    });

    characterCards.forEach(card => {
        card.addEventListener('mouseenter', function (event) {
            const card = event.currentTarget;
            const cardId = card.id;
            var _name = extractNameFromId(cardId);
            var _chara = findCharacter(_name);

            var shown = "";
            var elementName = ELEMENT_CALL[_chara.elementName][LANGUAGE_CODE];
            var shownSignature = _chara.signature[LANGUAGE_CODE];
            shown = elementName + "/" + shownSignature;
            card.children[1].innerHTML = shown;
        });
        card.addEventListener('touchstart', function (event) {
            var touch = event.touches[0];
            if (!isTouchedOn(card, touch)) {
                return;
            }
            const cardId = card.id;
            var _name = extractNameFromId(cardId);
            var _chara = findCharacter(_name);

            var shown = "";
            var elementName = ELEMENT_CALL[_chara.elementName][LANGUAGE_CODE];
            var shownSignature = _chara.signature[LANGUAGE_CODE];
            shown = elementName + "/" + shownSignature;
            card.children[1].innerHTML = shown;
        });
        card.addEventListener('mouseleave', function (event) {
            const card = event.currentTarget;
            const cardId = card.id;
            var _name = extractNameFromId(cardId);
            var _chara = findCharacter(_name);
            card.children[1].innerHTML = _chara.fullName[LANGUAGE_CODE];
        });
        card.addEventListener('touchend', function (event) {
            const cardId = card.id;
            var _name = extractNameFromId(cardId);
            var _chara = findCharacter(_name);

            card.children[1].innerHTML = _chara.fullName[LANGUAGE_CODE];
        });
    });
}

document.getElementsByTagName('body').item(0).onload += renewCardStyle();

screen.addEventListener("click", function () {
    renewCardStyle();
});

function outputObtained() {
    inventory.innerHTML = "";
    checkPools();
    var chSelVal = getSelectValue(E_SEL_CH).slice(-1);
    let totalItems = containerInfo.length - 1;
    let itemsLoaded = 0; // 已加载的元素数量
    const itemsPerLoad = 100; // 每次滚动加载的元素数量 v5.4.11
    function loadItems() {
        let itemsRemaining = totalItems - itemsLoaded;
        let count = Math.min(itemsPerLoad, itemsRemaining);
        for (var i = itemsLoaded + 1; i < itemsLoaded + count + 1; i++) {
            if (containerInfo[i] == undefined) return;
            var _container = document.createElement("div");
            _container.classList.add("container");
            if (containerInfo[i].type == "character") {//如果获得的是角色
                if (_GACHA_MODE == "character" || (_CHRONICLE_MODE == true && chSelVal == 'C')) {
                    if (isSCharacter(containerInfo[i].name) && isUpCharacter(containerInfo[i].name)) _container.classList.add("SUpContainer");
                    if (_CHRONICLE_MODE == false) {
                        if (isRCharacter(containerInfo[i].name) && isUpCharacter(containerInfo[i].name)) _container.classList.add("RUpContainer");
                    }
                }
                inventory.appendChild(_container);
                initializeCharacterCard(findCharacter(containerInfo[i].name), _container);
            } else {
                if (_GACHA_MODE == "weapon" || (_CHRONICLE_MODE == true && chSelVal == 'W')) {
                    if (Sup[0] == (containerInfo[i].name) && isStar(5, containerInfo[i].name)) _container.classList.add("SUpContainer");
                    if (_CHRONICLE_MODE == false) {
                        if (isUp(containerInfo[i].name) && isStar(4, containerInfo[i].name)) _container.classList.add("RUpContainer");
                    }
                }
                inventory.appendChild(_container);
                initializeWeaponCard(findWeapon(containerInfo[i].name), _container);
            }
            let _id = inventory.children[inventory.children.length - 1].children[0].id;
            let _name = _id.split("_")[2];
            inventory.children[inventory.children.length - 1].children[0].id = "card_obtained_" + Number(i) + '_' + _name;
            _container.innerHTML += "<p class='veryMark'><strong>" + Number(containerInfo[i].obtainedCalc) + "</strong></p>";
            _container.innerHTML += "<p>#" + Number(i) + ":(" + Number(containerInfo[i].obtainedRecord) + ")</p>";
            starRCardControl();
            weaponCardControl();
        }
        itemsLoaded += count;
    }
    loadItems();
    $(window).scroll(function () {
        // 检查用户是否滚动到接近页面底部
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            // 加载更多元素
            loadItems();
            renewCardStyle();
        }
    });
}