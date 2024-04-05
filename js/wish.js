// wish.js
// 第三版 祈愿逻辑（2024/3/23）
// 第四版 祈愿逻辑（2024/4/5）更新武器逻辑，集录卡池逻辑等待下一次整改
// 祈愿。储存祈愿逻辑。

/**
 * Sup：五星Up物品，只有一个
 */
var Sup = [];

/**
 * Scommon：概率未提升的五星物品。用户有一定概率能抽取到。
 */
var Scommon = [];

/**
 * Rup：四星Up物品。可以有多个
 */
var Rup = [];

/**
 * Rcommon：概率未提升的四星物品。
 */
var Rcommon = [];

/**
 * Candidates：候选
 */
var Candidates = [];

var Sup_W = [];
var Sup_C = [];
var Rup_W = [];
var Rup_C = [];
var Scommon_W = [];
var Scommon_C = [];
var Rcommon_W = [];
var Rcommon_C = [];
function resetDetail() {
    Candidates = [];
    Sup = [];
    Scommon = [];
    Rup = [];
    Rcommon = [];
    Sup_W = [];
    Sup_C = [];
    Rup_W = [];
    Rup_C = [];
    Scommon_W = [];
    Scommon_C = [];
    Rcommon_W = [];
    Rcommon_C = [];
}



var RW = [];//R Weapon
var ChronicledSup = [];
var _IsSupCertain = false;
var _IsRupCertain = false;//紫保底的意思是：一定能抽到紫Up
var _FatePoint = 0;
var S_Probability = 0.006;
var R_Probability = 0.051;
var _TotalWishTimes = 0;

class ContainerInfo {
    type;//character/weapon
    name;
    obtainedRecord;
    obtainedCalc;
    constructor(type, name, obtainedRecord, obtainedCalc) {
        this.type = type;
        this.name = name;
        this.obtainedCalc = obtainedCalc;
        this.obtainedRecord = obtainedRecord;
    }
}
var containerInfo = [];//盛放ContainerInfo类

var _S_DropCalc = 0;//五星UP角色保底计算器（五星垫数）意味着抽取之前的垫数
var _R_DropCalc = 0;//四星UP角色保底计算器（四星垫数）
var obtainedNormal = 0;
var obtainedRWeapons = 0;

var lastInfo = [0, 0, 0, false, false];

/**
 * Character：0总抽数，1五星垫数，2四星垫数，3五星Up保底，4四星Up保底
 * Weapon：0总抽数，1五星垫数，2四星垫数，3命定值，4五星Up保底，5四星Up保底
 */
var newInfo = [0, 0, 0, false, false];


var E_RepeatWish = document.getElementById("repeat_wish");

var upCharacterMap = {};
var commonCharacterMap = {};

function refreshUpMap() {
    upCharacterMap = {};
    Sup.concat(Rup).forEach(characterName => {
        upCharacterMap[characterName] = true;
    });
}

function refreshCommonMap() {
    commonCharacterMap = {};
    Scommon.concat(Rcommon).forEach(characterName => {
        commonCharacterMap[characterName] = true;
    });
}

function getCurrentInfo() {
    if (_CHRONICLE_MODE == false) {
        return [_TotalWishTimes, _S_DropCalc, _R_DropCalc, _IsSupCertain, _IsRupCertain];
    }
    else {
        return [_TotalWishTimes, _S_DropCalc, _R_DropCalc, _FatePoint, _IsRupCertain];
    }
}

function selectWishPool(wishPool) {
    if (_CHRONICLE_MODE == false) {
        if (_GACHA_MODE == "character") {
            ChronicledSup = [];
            var u3 = doValue(wishPool[3]);
            var u4 = doValue(wishPool[4]);
            Sup = doValue(wishPool[0]);
            Scommon = doValue(wishPool[1]);
            Rup = doValue(wishPool[2]);
            Rcommon = doValue(u3.concat(u4));
            Rcommon_W = doValue(u4);
        }
        if (_GACHA_MODE == "weapon") {
            var u3 = doValue(wishPool[3]);
            var u4 = doValue(wishPool[4]);
            ChronicledSup = [];
            Sup = doValue(wishPool[0]);
            Scommon = doValue(wishPool[1]);
            Rup = doValue(wishPool[2]);
            Rcommon = doValue(u3.concat(u4));
            Rcommon_W = doValue(u3);
        }
    }
    if (_CHRONICLE_MODE == true) {
        ChronicledSup = doValue(wishPool[0]);
        Sup = [];
        Scommon = doValue(wishPool[0]);
        Rup = doValue(wishPool[1]);
        Rcommon = [];
    }
}

function refreshSProbability() {
    if (_S_DropCalc <= 73) S_Probability = 0.006;
    if (_S_DropCalc > 73 && _S_DropCalc <= 89) {
        S_Probability = 0.06 * _S_DropCalc - 4.374;
    }
    if (_S_DropCalc == 89) S_Probability = 1;//S垫数达到89，下一抽必出S
}

function refreshRProbability() {
    if (_R_DropCalc >= 9) R_Probability = 0.994;
    if (_R_DropCalc < 9) R_Probability = 0.051;
}

function refreshWSProbability() {
    if (_S_DropCalc <= 61) S_Probability = 0.007;
    if (_S_DropCalc > 61 && _S_DropCalc <= 70) {
        S_Probability = 0.007 + 0.07 * (_S_DropCalc - 62);
    }
    if (_S_DropCalc > 70 && _S_DropCalc <= 78) {
        S_Probability = 0.637 + 0.035 * (_S_DropCalc - 71);
    }
    if (_S_DropCalc == 79) S_Probability = 1;
}

function refreshWRProbability() {
    if (_R_DropCalc <= 6) R_Probability = 0.06;
    if (_R_DropCalc == 7) R_Probability = 0.66;
    if (_R_DropCalc == 8) R_Probability = 0.96;
    if (_R_DropCalc >= 9) _R_DropCalc = 1;
}

/**
 * 随机返回数组中的一个元素
 * @param {Array} arr 
 * @returns 
 */
function getRandomElement(arr) {
    // 生成一个随机索引
    const randomIndex = Math.floor(Math.random() * arr.length);
    // 返回对应索引的元素
    return arr[randomIndex];
}

function initializeObtained() {
    obtainedCharacters = [];
    obtainedRecords = [];
    obtainedCalc = [];
    obtainedNormal = 0;
    obtainedRWeapons = 0;
}

function checkPools() {
    if (Sup.length == 0 || Rup.length == 0) {
        alert("UP卡池为空！");
        throw new Error("UP卡池为空！");
    }
    if (_CHRONICLE_MODE == false) {
        if (Scommon.length == 0 || Rcommon.length == 0) {
            alert("非UP卡池为空！");
            throw new Error("非UP卡池为空！");
        }
        if (_GACHA_MODE == "weapon") {
            if (Sup.length != 2) {
                alert("神铸定轨武器数量不合法！当前为" + Sup.length + "个，应该为2个。\n【武器祈愿：已选择定轨&未选择定轨五星武器】池 中必须要有2个五星武器卡片。\n这两个武器是参与【神铸定轨】的武器。\n其中前一个是您定轨的武器，后一个是您未定轨的武器。");
                throw new Error("神铸定轨武器数量不合法！");
            }
        }
    } else {
        if (Scommon.length == 0) {
            alert("五星非UP卡池为空！");
            throw new Error("五星非UP卡池为空！");
        }
    }
    refreshUpMap();
    refreshCommonMap();
}

function wish(totalWishes, startSDrop, startRDrop, isSC, isRC) {
    lastInfo = [Number(totalWishes), Number(startSDrop), Number(startRDrop), isSC, isRC];
    containerInfo = [null];//清空
    obtainedNormal = 0;
    obtainedRWeapons = 0;
    _TotalWishTimes = totalWishes;
    _S_DropCalc = startSDrop;
    _R_DropCalc = startRDrop;
    _IsSupCertain = isSC;
    _IsRupCertain = isRC;
    var level = "";
    var wished = new Number(1);//当前祈愿次数
    for (; wished <= _TotalWishTimes; wished++) {
        refreshRProbability();
        refreshSProbability();
        var randomedDecimal = getRandomDecimal();
        if (randomedDecimal <= S_Probability) {
            level = "S";
        } else if (randomedDecimal > S_Probability && randomedDecimal < (S_Probability + R_Probability)) {
            level = "R";
        } else {
            level = "N";
        }
        if (level == "N") {//抽到了普通等级
            obtainedNormal++;
            _S_DropCalc++;
            _R_DropCalc++;
            level = "";
        }
        if (level == "S") {//抽到五星
            if (_IsSupCertain || getRandomDecimal() <= 0.5) {
                _IsSupCertain = false;
                containerInfo.push(new ContainerInfo("character", Sup[0], wished, Number(_S_DropCalc) + 1));
            } else {
                let _ch = getRandomElement(Scommon);
                _IsSupCertain = true;
                containerInfo.push(new ContainerInfo("character", _ch, wished, Number(_S_DropCalc) + 1));
            }
            _S_DropCalc = 0;
            _R_DropCalc++;
        }
        if (level == "R") {
            if (_IsRupCertain) {//触发紫大保底，即触发紫保底角色
                _IsRupCertain = false;
                let _ch = getRandomElement(Rup_C);
                containerInfo.push(new ContainerInfo("character", _ch, wished, Number(_S_DropCalc) + 1));
            } else if (getRandomDecimal() <= 0.5) {//角色/武器决定
                if (_IsRupCertain || getRandomDecimal() <= 0.5) {//抽到角色，进行Up角色/非Up角色决定
                    let _ch = getRandomElement(Rup_C);
                    _IsRupCertain = false;
                    containerInfo.push(new ContainerInfo("character", _ch, wished, Number(_S_DropCalc) + 1));
                } else {
                    let _ch = getRandomElement(Rcommon_C);
                    _IsRupCertain = true;
                    containerInfo.push(new ContainerInfo("character", _ch, wished, Number(_S_DropCalc) + 1));
                }
            } else {//抽到四星武器
                obtainedRWeapons++;
                _IsRupCertain = true;
                if (Rcommon_W.length != 0) {
                    let _ch = getRandomElement(Rcommon_W);
                    containerInfo.push(new ContainerInfo("weapon", _ch, wished, Number(_S_DropCalc) + 1));
                }
            }
            _S_DropCalc++;
            _R_DropCalc = 0;
        }
    }
    _TOKEN += _TotalWishTimes;
    newInfo = [Number(_TotalWishTimes), Number(_S_DropCalc), Number(_R_DropCalc), _IsSupCertain, _IsRupCertain];
}

function weaponWish(totalWishes, startSDrop, startRDrop, fp, isSC, isRC) {
    lastInfo = [Number(totalWishes), Number(startSDrop), Number(startRDrop), fp, isSC, isRC];
    containerInfo = [null];//清空
    obtainedNormal = 0;
    obtainedRWeapons = 0;
    fp = Number(fp);
    _FatePoint = fp;
    var maxFatePoint = 2;
    _TotalWishTimes = totalWishes;
    _S_DropCalc = startSDrop;
    _R_DropCalc = startRDrop;
    _IsSupCertain = isSC;
    _IsRupCertain = isRC;
    var level = "";
    var wished = new Number(1);//当前祈愿次数
    for (; wished <= _TotalWishTimes; wished++) {
        refreshWRProbability();
        refreshWSProbability();
        var randomedDecimal = getRandomDecimal();
        if (randomedDecimal <= S_Probability) {
            level = "S";
        } else if (randomedDecimal > S_Probability && randomedDecimal < (S_Probability + R_Probability)) {
            level = "R";
        } else {
            level = "N";
        }
        if (level == "N") {//抽到了普通等级
            obtainedNormal++;
            _S_DropCalc++;
            _R_DropCalc++;
            level = "";
        }
        if (level == "S") {//抽到五星
            if (fp == maxFatePoint || _IsSupCertain || getRandomDecimal() <= 0.75) {//Sup/Scommon
                //抽到本期定轨的两个之一
                if (fp == maxFatePoint || getRandomDecimal() <= 0.5) {
                    //抽到定轨的武器
                    fp = 0;
                    containerInfo.push(new ContainerInfo("weapon", Sup[0], wished, Number(_S_DropCalc) + 1));
                } else {
                    //抽到与定轨相反的武器
                    fp += 1;
                    containerInfo.push(new ContainerInfo("weapon", Sup[1], wished, Number(_S_DropCalc) + 1));
                }
                _IsSupCertain = false;
            } else {
                let _ch = getRandomElement(Scommon_W);
                fp += 1;
                _IsSupCertain = true;
                containerInfo.push(new ContainerInfo("weapon", _ch, wished, Number(_S_DropCalc) + 1));
            }
            _S_DropCalc = 0;
            _R_DropCalc++;
        }
        if (level == "R") {
            if (_IsRupCertain || getRandomDecimal() <= 0.75) {
                let _ch = getRandomElement(Rup_W);
                _IsRupCertain = false;
                containerInfo.push(new ContainerInfo("weapon", _ch, wished, Number(_S_DropCalc) + 1));
            } else {
                let _ch = getRandomElement(Rcommon);
                _IsRupCertain = true;
                if (getItemType(_ch) == "character") {
                    containerInfo.push(new ContainerInfo("character", _ch, wished, Number(_S_DropCalc) + 1));
                }
                if (getItemType(_ch) == "weapon") {
                    containerInfo.push(new ContainerInfo("weapon", _ch, wished, Number(_S_DropCalc) + 1));
                }
            }
            _S_DropCalc++;
            _R_DropCalc = 0;
        }
    }
    _FatePoint = fp;
    _TOKEN += _TotalWishTimes;
    newInfo = [Number(_TotalWishTimes), Number(_S_DropCalc), Number(_R_DropCalc), Number(_FatePoint), _IsSupCertain, _IsRupCertain];
}

function chronicledWish(totalWishes, startSDrop, startRDrop, fp, isRC) {
    lastInfo = [Number(totalWishes), Number(startSDrop), Number(startRDrop), fp, isRC];
    containerInfo = [null];
    obtainedNormal = 0;
    obtainedRWeapons = 0;
    var maxFatePoint = 1;
    _TotalWishTimes = totalWishes;
    _S_DropCalc = startSDrop;
    _R_DropCalc = startRDrop;
    if (fp == maxFatePoint) {
        _IsSupCertain = true;
    } else {
        _IsSupCertain = false;
    }
    _IsRupCertain = isRC;
    var level = "";
    var wished = 1;//当前祈愿次数
    for (; wished <= _TotalWishTimes; wished++) {
        refreshRProbability();
        refreshSProbability();
        var randomedDecimal = getRandomDecimal();
        if (randomedDecimal <= S_Probability) {
            level = "S";
        } else if (randomedDecimal > S_Probability && randomedDecimal < (S_Probability + R_Probability)) {
            level = "R";
        } else {
            level = "N";
        }
        if (level == "N") {//抽到了普通等级
            obtainedNormal++;
            _S_DropCalc++;
            _R_DropCalc++;
            level = "";
        }
        if (level == "S") {//抽到五星
            if (_IsSupCertain || getRandomDecimal() <= 0.5) {
                _IsSupCertain = false;
                _FatePoint = 0;
                containerInfo.push(new ContainerInfo("character", Sup[0], wished, Number(_S_DropCalc) + 1));
            } else {
                let _ch = getRandomElement(Scommon);
                _FatePoint += 1;
                if (_FatePoint == maxFatePoint) _IsSupCertain = true;
                containerInfo.push(new ContainerInfo("character", _ch, wished, Number(_S_DropCalc) + 1));
            }
            _S_DropCalc = 0;
            _R_DropCalc++;
        }
        if (level == "R") {
            if (_IsRupCertain || getRandomDecimal() <= 0.5) {
                let _ch = getRandomElement(Rup);
                containerInfo.push(new ContainerInfo("character", _ch, wished, Number(_S_DropCalc) + 1));
                _IsRupCertain = false;
            } else {//抽到四星武器
                obtainedRWeapons++;
                _IsRupCertain = true;
            }
            _S_DropCalc++;
            _R_DropCalc = 0;
        }
    }
    _TOKEN += _TotalWishTimes;
    newInfo = [Number(_TotalWishTimes), Number(_S_DropCalc), Number(_R_DropCalc), Number(_FatePoint), _IsRupCertain];
}