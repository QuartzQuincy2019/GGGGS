// card.js
// 卡片。控制布局及内容。

var S_Non = [];
var R_Non = [];

/**
 * S Chronicled Box
 */
var E_SChBox = document.getElementById("Chronicled_Sup_PoolBox");

/**
 * S Non Box
 */
var E_SBox = document.getElementById("Snon_PoolBox");
var E_SupBox = document.getElementById("Sup_PoolBox");
var E_ScommonBox = document.getElementById("Scommon_PoolBox");
var E_RBox = document.getElementById("Rnon_PoolBox");
var E_RupBox = document.getElementById("Rup_PoolBox");
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
    if (_CHRONICLE_MODE == true) {
        if (parentNode.id == E_SChBox.id) {
            _card.id = "card_chronicled_" + _chara.name;
            _card.onclick = function () {
                alert("直接点击候选栏（可定轨五星池）中的角色属于无效操作。该区域中的卡片仅有展示作用。\n请点击“已定轨五星池”、“未定轨五星池”或“不参与集录祈愿的五星角色”三个区域中的角色卡片以更改定轨的角色。");
            }
        }
    }
    if (parentNode.parentNode.id == inventory.id) {
        _card.id = "card_obtained_" + _chara.name;
    }
    parentNode.appendChild(_card);
}

function initializeWeaponCard(weapon, destination) {
    var _weapon = weapon;
    var _card = document.createElement("div");
    _card.classList.add("card");
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
    parentNode.appendChild(_card);
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
    for (var i = 0; i < CHARACTER_NAMES.length; i++) {
        var _chara = findCharacter(CHARACTER_NAMES[i]);
        if (_chara.star == 4) initializeCharacterCard(_chara, E_RBox);
        if (_chara.star == 5) initializeCharacterCard(_chara, E_SBox);
    }
}

document.body.onload = initializeAllCard();//body加载后立刻初始化所有卡片

/**
 * 用户动手操作时调用该函数
 * @param {Element} element 
 */
function moveCard(element) {
    var passenger = element;
    var passengerName = element.id.slice(5);
    var origin = element.parentNode;
    var destination;
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
            if (origin.id == E_RBox.id) {//要前往Rup
                destination = E_RupBox;
                R_Non.deleteElement(passengerName);
                Rup.push(passengerName);
            }
            if (origin.id == E_RupBox.id) {//要返回Rnon
                destination = E_RBox;
                Rup.deleteElement(passengerName);
                R_Non.push(passengerName);
            }
        }
        origin.removeChild(passenger);
        destination.appendChild(passenger);
    } else {
        if (origin.id === "Rnon_PoolBox") destination = document.getElementById("Rcommon_PoolBox");
        if (origin.id === "Rcommon_PoolBox") destination = document.getElementById("Rup_PoolBox");
        if (origin.id === "Rup_PoolBox") destination = document.getElementById("Rnon_PoolBox");
        origin.removeChild(passenger);
        destination.appendChild(passenger);
        Sup = [];
        Rup = [];
        Rcommon = [];
        Scommon = [];
        for (var i = 0; i < document.getElementById("Sup_PoolBox").childNodes.length; i++) {
            Sup.push(document.getElementById("Sup_PoolBox").children[i].id.slice(5));
        }
        for (var i = 0; i < document.getElementById("Scommon_PoolBox").childNodes.length; i++) {
            Scommon.push(document.getElementById("Scommon_PoolBox").children[i].id.slice(5));
        }
        for (var i = 0; i < document.getElementById("Rup_PoolBox").childNodes.length; i++) {
            Rup.push(document.getElementById("Rup_PoolBox").children[i].id.slice(5));
        }
        for (var i = 0; i < document.getElementById("Rcommon_PoolBox").childNodes.length; i++) {
            Rcommon.push(document.getElementById("Rcommon_PoolBox").children[i].id.slice(5));
        }
    }
}

/**
 * 从卡池数组中刷新卡片
 */
function analizeCardSet() {
    clearCard();
    let non = [];
    S_Non = [];
    R_Non = [];
    let all = [];
    //录入所有角色名
    for (var i = 0; i < CHARACTER_LIST.length; i++) {
        all.push(CHARACTER_NAMES[i]);
    }
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
        initializeCharacterCard(findCharacter(S_Non[i]), E_SBox);
    }
    for (var i = 0; i < R_Non.length; i++) {
        initializeCharacterCard(findCharacter(R_Non[i]), E_RBox);
    }
}

/**
 * 获取下拉菜单的值以更新卡片
 * @returns 
 */
function updateCards() {
    var itemPoolSelect = document.getElementById("itemPoolSelect");
    var selectedPool = itemPoolSelect.value;
    if (selectedPool == "none") {
        initializeAllCard();
        return;
    }
    selectWishPool(itemPools[selectedPool]);
    analizeCardSet();
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
        if (isSCharacter(containerInfo[i].name) && isUpCharacter(containerInfo[i].name)) _container.classList.add("SUpContainer");
        if (isRCharacter(containerInfo[i].name) && isUpCharacter(containerInfo[i].name)) _container.classList.add("RUpContainer");
        inventory.appendChild(_container);
        initializeCharacterCard(findCharacter(containerInfo[i].name), _container);
        inventory.children[inventory.children.length - 1].children[0].id += "_" + Number(i);
        _container.innerHTML += "<p class='veryMark'><strong>" + Number(containerInfo[i].obtainedCalc) + "</strong></p>";
        _container.innerHTML += "<p>#" + Number(i) + ":(" + Number(containerInfo[i].obtainedRecord) + ")</p>";
    }
}