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

var lastInfo = [0, 0, 0, false, false];
var newInfo = [0, 0, 0, false, false];


var E_RepeatWish = document.getElementById("repeat_wish");

function getCurrentInfo() {
    return [_TotalWishTimes, _S_DropCalc, _R_DropCalc, _IsSupCertain, _IsRupCertain];
}

function selectWishPool(wishPool) {
    Sup = wishPool[0];
    Scommon = wishPool[1];
    Rup = wishPool[2];
    Rcommon = wishPool[3];
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
        refreshSProbability();
        level = decideLevel(getRandomDecimal());
        if (level == "N") {//抽到了普通等级
            obtainedNormal++;
            _S_DropCalc++;
            _R_DropCalc++;
            info += "第" + (wished) + "抽：3星物品。\n";
            level = "";
        }
        if (level == "S") {//抽到五星
            obtainedCalc.push(Number(_S_DropCalc) + 1);//此时五星垫了几抽
            obtainedRecords.push(wished);//第几抽抽到的
            level = decideS();

            if (level == "Sup") {
                obtainedCharacters.push(Sup[0]);
                _IsSupCertain = false;
                _ch = obtainedCharacters.getLast();
                info += "第" + (wished) + "抽：抽中本期5星UP角色" + _ch + "。\n";
            }
            if (level == "Scommon") {
                obtainedCharacters.push(getRandomElement(Scommon));
                _IsSupCertain = true;
                _ch = obtainedCharacters.getLast();
                info += "第" + (wished) + "抽：抽中本期5星常驻角色" + _ch + "。\n";
            }
            _S_DropCalc = 0;
            _R_DropCalc++;
        }
        if (level == "R") {
            level = decideR();

            if (level == "Rup") {
                obtainedRecords.push(wished);//第几抽抽到的
                obtainedCalc.push(Number(_S_DropCalc) + 1);//此时五星垫了几抽
                obtainedCharacters.push(getRandomElement(Rup));
                _ch = obtainedCharacters.getLast();
                _IsRupCertain = false;
                info += "第" + (wished) + "抽：抽中本期4星UP角色" + _ch + "。\n";
            }
            if (level == "Rcommon") {
                obtainedRecords.push(wished);//第几抽抽到的
                obtainedCalc.push(Number(_S_DropCalc) + 1);//此时五星垫了几抽
                obtainedCharacters.push(getRandomElement(Rcommon));
                _ch = obtainedCharacters.getLast();
                _IsRupCertain = true;
                info += "第" + (wished) + "抽：抽中本期4星非UP角色" + _ch + "。\n";
            }
            if (level == "Rweapon") {
                obtainedRWeapons++;
                _IsRupCertain = true;
                info += "第" + (wished) + "抽：抽中本期4星武器\n";
            }
            _S_DropCalc++;
            _R_DropCalc = 0;
        }
        console.log(info);
        var text1;
        if (lastInfo[3] === true) { text1 = "是" } else { text1 = "否" };
        var text2;
        if (lastInfo[4] === true) { text2 = "是" } else { text2 = "否" };
        E_RepeatWish.title = "上次祈愿信息：\n抽数：" + lastInfo[0] +
            "\n五星垫数：" + lastInfo[1] +
            "\n四星垫数：" + lastInfo[2] +
            "\n是否五星大保底：" + text1 +
            "\n是否四星大保底：" + text2;
        newInfo = getCurrentInfo();
    }
}