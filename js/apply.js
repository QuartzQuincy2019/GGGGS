// apply.js

function newWish() {
    wish(newInfo[0], newInfo[1], newInfo[2], newInfo[3], newInfo[4]);
}

function lastWish() {
    wish(lastInfo[0], lastInfo[1], lastInfo[2], lastInfo[3], lastInfo[4]);
}

function readNewInfo() {
    var isSC_val = document.querySelector('input[name="IsSUpCertainRadio"]:checked').value;
    var isRC_val = document.querySelector('input[name="IsRUpCertainRadio"]:checked').value;
    isSC_val == "cert" ? newInfo[3] = true : newInfo[3] = false;
    isRC_val == "cert" ? newInfo[4] = true : newInfo[4] = false;
    newInfo[0] = E_GachaTimes.value;
    newInfo[1] = E_StartSDrop.value;
    newInfo[2] = E_StartRDrop.value;
}

function throwNewInfo() {
    E_StartSDrop.value = newInfo[1];
    E_StartRDrop.value = newInfo[2];
    newInfo[3] == false ? E_uc_option1_1.checked = true : E_uc_option1_2.checked = true;
    newInfo[4] == false ? E_uc_option2_1.checked = true : E_uc_option2_2.checked = true;
}

/**
 * 核心流程函数，单轮祈愿。接收祈愿表单的所有信息，祈愿，并刷新卡片。
 * @param {Boolean} isLastInfoAvailable 是否重复上一次祈愿
 */
function submitForm(isLastInfoAvailable) {
    inventory.innerHTML = "";
    readNewInfo();
    if (isLastInfoAvailable) {
        lastWish();
    } else {
        newWish();
    }
    throwNewInfo();
    outputObtained();
}

function isSCharacter(characterName) {
    var _chara = findCharacter(characterName);
    if (_chara.star == 5) return true;
    return false;
}

function isUpCharacter(characterName) {
    if (Sup.includes(characterName) || Rup.includes(characterName)) return true;
    return false;
}

function checkSCharacter() {
    var num = 0;
    for (var i = 0; i < obtainedCharacters.length; i++) {
        if (isSCharacter(obtainedCharacters[i])) num += 1;
    }
    return num;
}

function checkSUpCharacter() {
    var num = 0;
    for (var i = 0; i < obtainedCharacters.length; i++) {
        if (isSCharacter(obtainedCharacters[i]) && isUpCharacter(obtainedCharacters[i])) num += 1;
    }
    return num;
}

function tripleSupTest() {
    _TotalWishTimes = 10;
    E_GachaTimes.value = _TotalWishTimes;
    var times = 0;
    var num = 0;
    var interval = 100000;
    var safeLimit = 2000000;
    readNewInfo();
    do {
        newWish();
        num = checkSUpCharacter();
        times++;
        if (times % interval == 0 && times > (interval - 1)) alert("当前已进行" + times + "次十连，都未实现十连三（或更多）黄Up。\n该提示每" + interval + "次十连出现一次。\n如果尝试" + safeLimit + "十连都不符合要求，则该循环会自动退出。");
        if (times == safeLimit) break;
    } while (num < 3);
    outputObtained();
    if (times == safeLimit) {
        alert(safeLimit + "次十连之内没有符合要求的记录。");
        return;
    }
    alert("热烈祝贺！第" + times + "次十连实现十连三（或更多）黄Up！");
}

function doubleSupTest() {
    _TotalWishTimes = 10;
    E_GachaTimes.value = _TotalWishTimes;
    var times = 0;
    var num = 0;
    readNewInfo();
    do {
        newWish();
        num = checkSUpCharacter();
        times++;
    } while (num != 2);
    outputObtained();
    alert("第" + times + "次十连获得双黄Up！");
}

function luckTest() {
    var _MODE = document.getElementById("CharaNumberInTen").value;
    if (_MODE == 0 || _MODE == undefined || _MODE > document.getElementById("CharaNumberInTen").max) {
        alert("未指定角色数或角色数不正确！");
        return;
    }
    _TotalWishTimes = 10;
    E_GachaTimes.value = _TotalWishTimes;
    var times = 0;
    var num = 0;
    var interval = 100000;
    var safeLimit = 2000000;
    readNewInfo();
    do {
        newWish();
        num = obtainedCharacters.length;
        times++;
        if (times % interval == 0 && times > (interval - 1)) alert("当前已进行" + times + "次十连，都未实现一次十连中有" + _MODE + "位角色。\n该提示每" + interval + "次十连出现一次。\n如果尝试" + safeLimit + "十连都不符合要求，则该循环会自动退出。");
        if (times == safeLimit) break;
    } while (num != _MODE);
    outputObtained();
    if (times == safeLimit) {
        alert(safeLimit + "次十连之内没有符合要求的记录。");
        return;
    }
    alert("第" + times + "次十连同时获得了" + _MODE + "个角色！");
}