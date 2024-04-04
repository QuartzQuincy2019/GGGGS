// wish.js
// 第三版 祈愿逻辑（2024/3/23）
// 祈愿。储存祈愿逻辑。

var Sup = [];
var Scommon = [];
var Rup = [];
var Rcommon = [];
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
        ChronicledSup = [];
        Sup = doValue(wishPool[0]);
        Scommon = doValue(wishPool[1]);
        Rup = doValue(wishPool[2]);
        Rcommon = doValue(wishPool[3]);
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
            if (_IsRupCertain) {
                _IsRupCertain = false;
                let _ch = getRandomElement(Rup);
                containerInfo.push(new ContainerInfo("character", _ch, wished, Number(_S_DropCalc) + 1));
            } else if (getRandomDecimal() <= 0.5) {//角色/武器决定
                if (_IsSupCertain || getRandomDecimal() <= 0.5) {//Up角色/非Up角色决定
                    let _ch = getRandomElement(Rup);
                    _IsRupCertain = false;
                    containerInfo.push(new ContainerInfo("character", _ch, wished, Number(_S_DropCalc) + 1));
                } else {
                    let _ch = getRandomElement(Rcommon);
                    _IsRupCertain = true;
                    containerInfo.push(new ContainerInfo("character", _ch, wished, Number(_S_DropCalc) + 1));
                }
            } else {//抽到四星武器
                obtainedRWeapons++;
                _IsRupCertain = true;
            }
            _S_DropCalc++;
            _R_DropCalc = 0;
        }
    }
    _TOKEN += _TotalWishTimes;
    newInfo = [Number(_TotalWishTimes), Number(_S_DropCalc), Number(_R_DropCalc), _IsSupCertain, _IsRupCertain];
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