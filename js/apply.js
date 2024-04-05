// apply.js

var _interval = 5000000; //每_interval次十连提醒一次

function newWish() {
    if (_CHRONICLE_MODE == false) {
        if (_GACHA_MODE == "character") {
            wish(newInfo[0], newInfo[1], newInfo[2], newInfo[3], newInfo[4]);
        }
        if (_GACHA_MODE == "weapon") {
            weaponWish(newInfo[0], newInfo[1], newInfo[2], newInfo[3], newInfo[4], newInfo[5]);
        }
    } else {
        chronicledWish(newInfo[0], newInfo[1], newInfo[2], newInfo[3], newInfo[4]);
    }
}

function lastWish() {
    if (_CHRONICLE_MODE == false) {
        if (_GACHA_MODE == "character") {
            wish(lastInfo[0], lastInfo[1], lastInfo[2], lastInfo[3], lastInfo[4]);
        }
        if (_GACHA_MODE == "weapon") {
            weaponWish(lastInfo[0], lastInfo[1], lastInfo[2], lastInfo[3], lastInfo[4], lastInfo[5]);
        }
    } else {
        chronicledWish(lastInfo[0], lastInfo[1], lastInfo[2], lastInfo[3], lastInfo[4]);
    }
}

function refreshLastWishText() {
    if (_CHRONICLE_MODE == false) {
        var text1;
        if (lastInfo[3] === true) { text1 = "是" } else { text1 = "否" };
        var text2;
        if (lastInfo[4] === true) { text2 = "是" } else { text2 = "否" };
        E_RepeatWish.title = "上次祈愿信息：\n抽数：" + lastInfo[0] +
            "\n五星垫数：" + lastInfo[1] +
            "\n四星垫数：" + lastInfo[2] +
            "\n是否五星大保底：" + text1 +
            "\n是否四星大保底：" + text2;
    } else {
        var text2;
        if (lastInfo[4] === true) { text2 = "是" } else { text2 = "否" };
        E_RepeatWish.title = "上次祈愿信息：\n抽数：" + lastInfo[0] +
            "\n五星垫数：" + lastInfo[1] +
            "\n四星垫数：" + lastInfo[2] +
            "\n命定值：" + lastInfo[3] +
            "\n是否四星大保底：" + text2;
    }
}

/**
 * @function 表单数字是否合法
 * @param {Element} _element 
 * @returns 
 */
function isFormNumberValueLegal(_element) {
    var val = Number(_element.value);
    if (!isInteger(val)) return false;
    var max = Number(_element.max);
    var min = Number(_element.min);
    if (val >= min && val <= max) return true;
    return false;
}

function readNewInfo() {
    let isSC_val;
    let fp;
    if (_CHRONICLE_MODE == false) {
        isSC_val = document.querySelector('input[name="IsSUpCertainRadio"]:checked').value;
        if (_GACHA_MODE == "character") {
            isSC_val == "cert" ? newInfo[3] = true : newInfo[3] = false;
        }
        if (_GACHA_MODE == "weapon") {
            isSC_val == "cert" ? newInfo[4] = true : newInfo[4] = false;
            fp = document.getElementById("FatePointInput").value;
            newInfo[3] = fp;//命定值
        }
    } else {
        fp = document.getElementById("FatePointInput").value;
        newInfo[3] = fp;
    }
    var isRC_val = document.querySelector('input[name="IsRUpCertainRadio"]:checked').value;
    if (_GACHA_MODE == "character") {
        isRC_val == "cert" ? newInfo[4] = true : newInfo[4] = false;
    }
    if (_GACHA_MODE == "weapon") {
        isRC_val == "cert" ? newInfo[5] = true : newInfo[5] = false;
    }

    if ((isFormNumberValueLegal(E_StartSDrop) && isFormNumberValueLegal(E_StartRDrop)) == true) {
        if (E_StartRDrop.value == 10) {
            if (E_StartSDrop.value != 0) {
                newInfo[0] = 0;
                newInfo[1] = 0;
                newInfo[2] = 0;
                return false;
            }
        }
        newInfo[0] = Number(E_GachaTimes.value) || 0;
        newInfo[1] = Number(E_StartSDrop.value);
        newInfo[2] = Number(E_StartRDrop.value);
        return true;
    } else {
        // console.log("imfalse");
        newInfo[0] = 0;
        newInfo[1] = 0;
        newInfo[2] = 0;
        return false;
    }
}

function throwNewInfo() {
    E_StartSDrop.value = newInfo[1];
    E_StartRDrop.value = newInfo[2];
    if (_CHRONICLE_MODE == false) {
        if (_GACHA_MODE == "weapon") {
            document.getElementById("FatePointInput").value = newInfo[3];//命定值
            newInfo[4] == false ? E_uc_option1_1.checked = true : E_uc_option1_2.checked = true;//五星保底单选
            if (newInfo[5] == undefined) {
                E_uc_option2_1.checked = false;
            } else {
                newInfo[5] == false ? E_uc_option2_1.checked = true : E_uc_option2_2.checked = true;//四星保底单选
            }
        }
        if (_GACHA_MODE == "character") {
            newInfo[3] == false ? E_uc_option1_1.checked = true : E_uc_option1_2.checked = true;
            newInfo[4] == false ? E_uc_option2_1.checked = true : E_uc_option2_2.checked = true;
        }
    } else {
        document.getElementById("FatePointInput").value = newInfo[3];
    }
}

function resetForm() {
    E_StartSDrop.value = 0;
    E_StartRDrop.value = 0;
    E_uc_option1_1.checked = true;
    E_uc_option1_2.checked = false;
    _FatePoint = 0;
    E_uc_option2_1.checked = true;
    E_uc_option2_2.checked = false;
    E_GachaTimes.value = 1;
}

/**
 * @function 核心流程函数，单轮祈愿
 * @desc 接收祈愿表单的所有信息，祈愿，并刷新卡片。
 * @param {Boolean} isLastInfoAvailable 是否重复上一次祈愿
 */
function submitForm(isLastInfoAvailable) {
    inventory.innerHTML = "";
    var status = readNewInfo();
    if (!status) {
        alert("表单数据不合法！");
        throw new Error("表单数据不合法！");
    }
    if (!isFormNumberValueLegal(E_GachaTimes)) throw new Error("表单“单轮抽数”数据不合法！");
    checkPools();
    if (isLastInfoAvailable) {
        lastWish();
    } else {
        newWish();
    }
    throwNewInfo();
    outputObtained();
    refreshLastWishText();
    refreshTotalCounter();
}

function auxiliaryMultipleSTest(isAllUp, SQty) {
    var num = 0;
    var times = 0;
    var max = 3;
    var interval = _interval;
    if (SQty != "Super") {
        var t = SQty;
        if (isAllUp == 'All_Up') {
            do {
                newWish();
                num = checkSUpCharacter();
                times++;
            } while (num != t);
            outputObtained();
            throwNewInfo();
            refreshLastWishText();
            refreshTotalCounter();
        }
        else if (isAllUp == 'Not_All_Up') {
            do {
                newWish();
                num = checkSCharacter();
                times++;
            } while (num != t);
            outputObtained();
            throwNewInfo();
            refreshLastWishText();
            refreshTotalCounter();
        } else {
            do {
                newWish();
                num = checkSCommonCharacter();
                times++;
            } while (num != t);
            outputObtained();
            throwNewInfo();
            refreshLastWishText();
            refreshTotalCounter();
        }
        return times;
    } else {
        if (isAllUp) {
            do {
                newWish();
                num = checkSUpCharacter();
                times++;
                if (times % interval == 0) {
                    var res = confirm("当前已进行" + times / 10000 + "万次十连，都未实现十连中大于" + max + "个五星Up角色。\n该提示每" + interval / 10000 + "万次十连出现一次。\n若要继续，请单击“确认”；若要中止此次祈愿，请单击“取消”。");
                    if (!res) break;
                }
            } while (num <= max);
            outputObtained();
            throwNewInfo();
            refreshLastWishText();
            refreshTotalCounter();
        } else {
            do {
                newWish();
                num = checkSCharacter();
                times++;
                if (times % interval == 0) {
                    var res = confirm("当前已进行" + times / 10000 + "万次十连，都未实现十连中大于" + max + "个五星角色。\n该提示每" + interval / 10000 + "万次十连出现一次。\n若要继续，请单击“确认”；若要中止此次祈愿，请单击“取消”。");
                    if (!res) break;
                }
            } while (num <= max);
            outputObtained();
            throwNewInfo();
            refreshLastWishText();
            refreshTotalCounter();
        }
        if (num > max) {
            return [true, times];
        } else {
            return [false, times];
        }
    }
}

function multipleSTest(_SMODE) {
    _TotalWishTimes = 10;
    E_GachaTimes.value = _TotalWishTimes;
    var times = 0;
    var status = readNewInfo();
    checkPools();
    if (!status) {
        alert("表单数据不合法！");
        throw new Error("表单数据不合法！");
    }
    var IsAllSup_val = document.querySelector('input[name="IsAllSup"]:checked').value;
    if (IsAllSup_val == 'All_Common' && (_SMODE == 'Super' || _SMODE == 3)) {
        alert("此事件概率过小，无法继续进行。");
        return;
    }
    if (_SMODE == 2) {
        times = auxiliaryMultipleSTest(IsAllSup_val, 2);
        if (IsAllSup_val == 'All_Up') {
            alert("第" + times + "次十连获得双黄Up！");
        } else if (IsAllSup_val == 'Not_All_Up') {
            alert("第" + times + "次十连获得双黄！");
        } else {
            alert("幸运女神眷顾！第" + times + "次十连同时获得2个五星非Up角色！");
        }
    }
    if (_SMODE == 3) {
        times = auxiliaryMultipleSTest(IsAllSup_val, 3);
        if (IsAllSup_val == 'All_Up') {
            alert("热烈祝贺！第" + times + "次十连实现十连3个黄Up！");
        } else {
            alert("第" + times + "次十连实现十连3个黄！");
        }
    }
    if (_SMODE == "Super") {
        var res = auxiliaryMultipleSTest(IsAllSup_val, "Super");
        if (IsAllSup_val) {
            if (res[0] == true) {
                alert("热烈祝贺！第" + res[1] + "次十连实现多于3个五星Up角色！");
            } else {
                alert(res[1] + "次十连内没有十连多于3个五星Up角色的记录。");
            }
        } else {
            if (res[0] == true) {
                alert("热烈祝贺！第" + res[1] + "次十连实现多于3个五星角色！");
            } else {
                alert(res[1] + "次十连内没有十连多于3个五星角色的记录。");
            }
        }
    }
}

function luckTest() {
    var _MODE = document.getElementById("CharaNumberInTen").value;
    console.log(_MODE);
    if (_MODE == undefined || !isFormNumberValueLegal(document.getElementById("CharaNumberInTen"))) {
        alert("未指定角色数或角色数不正确！");
        return;
    }
    _TotalWishTimes = 10;
    E_GachaTimes.value = _TotalWishTimes;
    var times = 0;
    var num = 0;
    var interval = _interval;
    var status = readNewInfo();
    checkPools();
    if (!status) {
        alert("表单数据不合法！");
        throw new Error("表单数据不合法！");
    }
    var IsEqualToCharacterQuantityRadio_val = document.querySelector('input[name="IsEqualToCharacterQuantityRadio"]:checked').value;
    IsEqualToCharacterQuantityRadio_val = convertBoolean(IsEqualToCharacterQuantityRadio_val);
    if (IsEqualToCharacterQuantityRadio_val) {
        do {
            newWish();
            num = containerInfo.length - 1;
            times++;
            if (times % interval == 0) {
                var res = confirm("当前已进行" + times / 10000 + "万次十连，都未实现十连中出现" + _MODE + "位角色。\n该提示每" + interval / 10000 + "万次十连出现一次。\n若要继续，请单击“确认”；若要中止此次祈愿，请单击“取消”。");
                if (!res) break;
            }
        } while (num != _MODE);
        if (num == _MODE) {
            alert("第" + times + "次十连同时获得了" + _MODE + "个角色！");
        } else {
            alert(times + "次十连内没有同时获得" + _MODE + "个角色的记录……");
        }
    }
    if (!IsEqualToCharacterQuantityRadio_val) {
        do {
            newWish();
            num = containerInfo.length - 1;
            times++;
            if (times % interval == 0) {
                var res = confirm("当前已进行" + times / 10000 + "万次十连，都未实现十连中出现" + _MODE + "位角色。\n该提示每" + interval / 10000 + "万次十连出现一次。\n若要继续，请单击“确认”；若要中止此次祈愿，请单击“取消”。");
                if (!res) break;
            }
        } while (num < _MODE);
        if (num >= _MODE) {
            alert("第" + times + "次十连实现了同时获得不少于" + _MODE + "个角色！");
        } else {
            alert(times + "次十连内没有实现同时获得不少于" + _MODE + "个角色的记录……");
        }
    }
    outputObtained();
    throwNewInfo();
    refreshLastWishText();
    refreshTotalCounter();
}