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

document.body.onload = initializeAllCard();

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

function submitForm(isLastInfoAvailable) {
    inventory.innerHTML = "";
    var isSC, isRC, startSDrop, startRDrop, ttw;
    var isSC_val = document.querySelector('input[name="IsSUpCertainRadio"]:checked').value;
    var isRC_val = document.querySelector('input[name="IsRUpCertainRadio"]:checked').value;
    isSC_val == "cert" ? isSC = true : isSC = false;
    isRC_val == "cert" ? isRC = true : isRC = false;
    ttw = E_GachaTimes.value;
    startSDrop = E_StartSDrop.value;
    startRDrop = E_StartRDrop.value;
    if (isLastInfoAvailable) {
        wish(lastInfo[0], lastInfo[1], lastInfo[2], lastInfo[3], lastInfo[4]);
    } else {
        wish(ttw, startSDrop, startRDrop, isSC, isRC);
    }

    for (var i = 0; i < obtainedCharacters.length; i++) {
        var _container = document.createElement("div");
        _container.classList.add("container");
        inventory.appendChild(_container);
        initializeCard(findCharacter(obtainedCharacters[i]), _container);
        _container.innerHTML += "<p>" + Number(i + 1) + "#(" + Number(obtainedRecords[i]) + ", <strong>" + Number(obtainedCalc[i]) + "</strong>)</p>"
    }
    _IsSupCertain == false ? E_uc_option1_1.checked = true : E_uc_option1_2.checked = true;
    _IsRupCertain == false ? E_uc_option2_1.checked = true : E_uc_option2_2.checked = true;
    E_StartSDrop.value = _S_DropCalc;
    E_StartRDrop.value = _R_DropCalc;
}