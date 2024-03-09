// card.js
// 卡片。控制布局及内容。

var E_SBox = document.getElementById("Snon_PoolBox");
var E_RBox = document.getElementById("Rnon_PoolBox");
var inventory = document.getElementById("inventory");

var E_StartSDrop = document.getElementById("StartSDrop");
var E_StartRDrop = document.getElementById("StartRDrop");
var E_uc_option1_1 = document.getElementById("uc_option1_1");
var E_uc_option1_2 = document.getElementById("uc_option1_2");
var E_uc_option2_1 = document.getElementById("uc_option2_1");
var E_uc_option2_2 = document.getElementById("uc_option2_2");
var E_GachaTimes = document.getElementById("GachaTimes");
var E_GachaForm = document.getElementById("GachaForm");


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
    var num = 0;
    for (var character of obtainedCharacters) {
        if (isSCharacter(character)) num += 1;
    }
    return num;
}

function checkSUpCharacter() {
    var num = 0;
    for (var character of obtainedCharacters) {
        if (isSCharacter(character) && isUpCharacter(character)) num += 1;
    }
    return num;
}

function checkSCommonCharacter() {
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
function initializeCard(character, destination) {
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
    _card.id = "card_" + _chara.name;
    _card.onclick = function () {
        moveCard(this);
    };
    var parentNode = destination;
    parentNode.appendChild(_card);
}

/**
 * 初始化所有卡片
 */
function initializeAllCard() {
    clearCard();
    Sup = [];
    Rup = [];
    Scommon = [];
    Rcommon = [];
    for (var i = 0; i < CHARACTER_NAMES.length; i++) {
        var _chara = findCharacter(CHARACTER_NAMES[i]);
        if (_chara.star == 4) initializeCard(_chara, E_RBox);
        if (_chara.star == 5) initializeCard(_chara, E_SBox);
    }
}

document.body.onload = initializeAllCard();//body加载后立刻初始化所有卡片

/**
 * 用户动手操作时调用该函数
 * @param {*} element 
 */
function moveCard(element) {
    var passenger = element;
    var origin = element.parentNode;
    var destination;
    if (origin.id === "Rnon_PoolBox") destination = document.getElementById("Rcommon_PoolBox");
    if (origin.id === "Rcommon_PoolBox") destination = document.getElementById("Rup_PoolBox");
    if (origin.id === "Rup_PoolBox") destination = document.getElementById("Rnon_PoolBox");
    if (origin.id === "Snon_PoolBox") destination = document.getElementById("Scommon_PoolBox");
    if (origin.id === "Scommon_PoolBox") destination = document.getElementById("Sup_PoolBox");
    if (origin.id === "Sup_PoolBox") destination = document.getElementById("Snon_PoolBox");
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

/**
 * 从卡池数组中刷新卡片
 */
function analizeCardSet() {
    clearCard();
    let non = [];
    let S_Non = [];
    let R_Non = [];
    let all = [];
    for (var i = 0; i < CHARACTER_LIST.length; i++) {
        all.push(CHARACTER_NAMES[i]);
    }
    all.deleteElement(Sup[0]);
    for (var i = 0; i < Scommon.length; i++) {
        all.deleteElement(Scommon[i]);
    }
    for (var i = 0; i < Rup.length; i++) {
        all.deleteElement(Rup[i]);
    }
    for (var i = 0; i < Rcommon.length; i++) {
        all.deleteElement(Rcommon[i]);
    }
    non = all;
    for (var i = 0; i < non.length; i++) {
        if (findCharacter(non[i]).star === 4) R_Non.push(non[i]);
        if (findCharacter(non[i]).star === 5) S_Non.push(non[i]);
    }
    initializeCard(findCharacter(Sup[0]), document.getElementById("Sup_PoolBox"));
    for (var i = 0; i < Scommon.length; i++) {
        initializeCard(findCharacter(Scommon[i]), document.getElementById("Scommon_PoolBox"));
    }
    for (var i = 0; i < Rup.length; i++) {
        initializeCard(findCharacter(Rup[i]), document.getElementById("Rup_PoolBox"));
    }
    for (var i = 0; i < Rcommon.length; i++) {
        initializeCard(findCharacter(Rcommon[i]), document.getElementById("Rcommon_PoolBox"));
    }
    for (var i = 0; i < S_Non.length; i++) {
        initializeCard(findCharacter(S_Non[i]), E_SBox);
    }
    for (var i = 0; i < R_Non.length; i++) {
        initializeCard(findCharacter(R_Non[i]), E_RBox);
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

/**
 * 切换条幅
 * @returns 
 */
function updateBanner() {
    var itemPoolSelect = document.getElementById("itemPoolSelect");
    var selectedPool = itemPoolSelect.value;
    if (selectedPool == "none") {
        E_header.style.backgroundImage = "url(./img/transparent.png)";
        return;
    }
    var version = selectedPool.slice(5, -2);//"4_2"
    E_header.style.backgroundImage = "url(./img/Banner_" + version + ".png)";
}

function outputObtained() {
    inventory.innerHTML = "";
    checkPools();
    for (var i = 0; i < obtainedCharacters.length; i++) {
        var _container = document.createElement("div");
        _container.classList.add("container");
        if (isSCharacter(obtainedCharacters[i]) && isUpCharacter(obtainedCharacters[i])) _container.classList.add("SUpContainer");
        if (isRCharacter(obtainedCharacters[i]) && isUpCharacter(obtainedCharacters[i])) _container.classList.add("RUpContainer");
        inventory.appendChild(_container);
        initializeCard(findCharacter(obtainedCharacters[i]), _container);
        _container.innerHTML += "<p class='veryMark'><strong>" + Number(obtainedCalc[i]) + "</strong></p>";
        _container.innerHTML += "<p>#" + Number(i + 1) + ":(" + Number(obtainedRecords[i]) + ")</p>";
    }
}