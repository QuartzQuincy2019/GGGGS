// wish.js
// 祈愿。储存祈愿逻辑。
var _TOKEN = 0;

var Sup = [];
var Scommon = [];
var Rup = [];
var Rcommon = [];
var _IsSupCertain = false;
var _IsRupCertain = false;
var S_Probability = 0.006;
var R_Probability = 0.051;
var _TotalWishTimes = 0;
var _S_DropCalc = 0;//五星UP角色保底计算器（五星垫数）意味着抽取之前的垫数
var _R_DropCalc = 0;//四星UP角色保底计算器（四星垫数）
var obtainedCharacters = [];
var obtainedRecords = [];//储存第几抽出的角色
var obtainedCalc = [];//储存（金）垫了几抽出的角色
var obtainedNormal = 0;
var obtainedRWeapons = 0;
var upCharacterMap = {};

var lastInfo = [0, 0, 0, false, false];
var newInfo = [0, 0, 0, false, false];


var E_RepeatWish = document.getElementById("repeat_wish");
var E_TotalCounter = document.getElementById("TotalCounter");

function refreshTotalCounter() {
    E_TotalCounter.children[0].innerHTML = "自打开页面以来已进行" + _TOKEN + "次祈愿";
}
refreshTotalCounter();

function getCurrentInfo() {
    return [_TotalWishTimes, _S_DropCalc, _R_DropCalc, _IsSupCertain, _IsRupCertain];
}

function selectWishPool(wishPool) {
    Sup = wishPool[0];
    Scommon = wishPool[1];
    Rup = wishPool[2];
    Rcommon = wishPool[3];
}

function refreshUpMap() {
    upCharacterMap = {};
    Sup.concat(Rup).forEach(characterName => {
        upCharacterMap[characterName] = true;
    });
}

function refreshSProbability() {
    if (_S_DropCalc <= 73) S_Probability = 0.006;
    if (_S_DropCalc > 73 && _S_DropCalc <= 89) {
        S_Probability = 0.06 * _S_DropCalc - 4.374;
    }
    if (_S_DropCalc == 90) S_Probability = 1;//S垫数达到90必出S
}

/**
 * 
 * @param {Number} randomedDecimal 
 * @returns 抽到的等级
 */
function decideLevel(randomedDecimal) {
    //S级别优先于R级别，仅当S未到达垫数上限且R到达时，才必出R
    if (_S_DropCalc != 89 && _R_DropCalc >= 9) return "R";
    if (randomedDecimal <= S_Probability) return "S";
    if (randomedDecimal > S_Probability && randomedDecimal < (S_Probability + R_Probability)) return "R";
    return "N";
}

/**
 * 
 * @returns S种类
 */
function decideS() {
    if (_IsSupCertain) return "Sup";
    var rand = getRandomDecimal();
    if (rand <= 0.5) return "Sup";
    return "Scommon";
}

/**
 * 
 * @returns R种类
 */
function decideR() {
    if (_IsRupCertain) return "Rup";
    var rand = getRandomDecimal();
    if (rand <= 0.5) {
        rand = getRandomDecimal();
        if (rand <= 0.5) return "Rup";
        return "Rcommon";
    } else {
        return "Rweapon";
    }
}

function getRandomElement(arr) {
    // 生成一个随机索引
    const randomIndex = Math.floor(Math.random() * arr.length);
    // 返回对应索引的元素
    return arr[randomIndex];
}

function wish(totalWishes, startSDrop, startRDrop, isSC, isRC) {
    lastInfo = [Number(totalWishes), Number(startSDrop), Number(startRDrop), isSC, isRC];
    _TotalWishTimes = totalWishes;
    obtainedCharacters = [];
    obtainedRecords = [];
    obtainedCalc = [];
    obtainedNormal = 0;
    obtainedRWeapons = 0;
    _S_DropCalc = startSDrop;
    _R_DropCalc = startRDrop;
    _IsSupCertain = isSC;
    _IsRupCertain = isRC;
    level = "";
    info = "";
    if (Sup.length == 0 || Rup.length == 0) {
        alert("UP卡池为空！");
        throw new Error("UP卡池为空！");
    }
    if (Scommon.length == 0 || Rcommon.length == 0) {
        alert("非UP卡池为空！");
        throw new Error("非UP卡池为空！");
    }
    var wished = 1;//当前祈愿次数
    for (; wished <= _TotalWishTimes; wished++) {
        _TOKEN++;
        refreshSProbability();
        var randomedDecimal = getRandomDecimal();
        if (_S_DropCalc != 89 && _R_DropCalc >= 9) {
            level = "R";
        } else if (randomedDecimal <= S_Probability) {
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
            obtainedCalc.push(Number(_S_DropCalc) + 1);//此时五星垫了几抽
            obtainedRecords.push(wished);//第几抽抽到的
            if (_IsSupCertain || getRandomDecimal() <= 0.5) {
                obtainedCharacters.push(Sup[0]);
                _IsSupCertain = false;
            } else {
                obtainedCharacters.push(getRandomElement(Scommon));
                _IsSupCertain = true;
            }
            _S_DropCalc = 0;
            _R_DropCalc++;
        }
        if (level == "R") {
            if (_IsRupCertain || getRandomDecimal() <= 0.5) {
                if (getRandomDecimal() <= 0.5) {
                    obtainedRecords.push(wished);//第几抽抽到的
                    obtainedCalc.push(Number(_S_DropCalc) + 1);//此时五星垫了几抽
                    obtainedCharacters.push(getRandomElement(Rup));
                    _IsRupCertain = false;
                } else {
                    obtainedRecords.push(wished);//第几抽抽到的
                    obtainedCalc.push(Number(_S_DropCalc) + 1);//此时五星垫了几抽
                    obtainedCharacters.push(getRandomElement(Rcommon));
                    _IsRupCertain = true;
                }
            } else {//抽到四星武器
                obtainedRWeapons++;
                _IsRupCertain = true;
            }
            _S_DropCalc++;
            _R_DropCalc = 0;
        }
        newInfo = getCurrentInfo();
    }
}