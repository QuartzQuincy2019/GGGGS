var Sup = [];
var Scommon = [];
var Rup = [];
var Rcommon = [];
var isSupCertain = false;
var isRupCertain = false;
var S_Probability = 0.006;
var R_Probability = 0.051;
var S_DropCalc = 0;//五星UP角色保底计算器（五星垫数）
var R_DropCalc = 0;//四星UP角色保底计算器（四星垫数）
var obtainedCharacters = [];
var obtainedRecords = [];//储存第几抽出的角色
var obtainedCalc = [];//储存（金）垫了几抽出的角色
var obtainedNormal = 0;
var obtainedRWeapons = 0;

function selectWishPool(wishPool) {
    Sup = wishPool[0];
    Scommon = wishPool[1];
    Rup = wishPool[2];
    Rcommon = wishPool[3];
}

function refreshSProbability() {
    if (S_DropCalc <= 73) S_Probability = 0.006;
    if (S_DropCalc > 73 && S_DropCalc <= 89) {
        S_Probability = 0.06 * S_DropCalc - 4.374;
    }
    if (S_DropCalc == 90) S_Probability = 1;
}

/**
 * 
 * @param {Number} randomedDecimal 
 * @returns 抽到的等级
 */
function decideLevel(randomedDecimal) {
    if (R_DropCalc == 9) return "R";
    if (randomedDecimal <= S_Probability) return "S";
    if (randomedDecimal > S_Probability && randomedDecimal < (S_Probability + R_Probability)) return "R";
    return "N";
}

/**
 * 
 * @returns S种类
 */
function decideS() {
    if (isSupCertain) return "Sup";
    var rand = getRandomDecimal();
    if (rand <= 0.5) return "Sup";
    return "Scommon";
}

/**
 * 
 * @returns R种类
 */
function decideR() {
    if (isRupCertain) return "Rup";
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

function wish(totalWishTimes, startSDrop, startRDrop, isSC, isRC) {
    obtainedCharacters = [];
    obtainedRecords = [];
    obtainedCalc = [];
    obtainedNormal = 0;
    obtainedRWeapons = 0;
    S_DropCalc = startSDrop;
    R_DropCalc = startRDrop;
    isSupCertain = isSC;
    isRupCertain = isRC;
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
    for (; wished <= totalWishTimes; wished++) {
        refreshSProbability();
        level = decideLevel(getRandomDecimal());
        if (level == "N") {//抽到了普通等级
            obtainedNormal++;
            S_DropCalc++;
            R_DropCalc++;
            info += "第" + (wished) + "抽：3星物品。\n";
            level = "";
        }
        if (level == "S") {//抽到五星
            obtainedCalc.push(Number(S_DropCalc) + 1);//此时五星垫了几抽
            obtainedRecords.push(wished);//第几抽抽到的
            level = decideS();

            if (level == "Sup") {
                obtainedCharacters.push(Sup[0]);
                isSupCertain = false;
                _ch = obtainedCharacters.getLast();
                info += "第" + (wished) + "抽：抽中本期5星UP角色" + _ch + "。\n";
            }
            if (level == "Scommon") {
                obtainedCharacters.push(getRandomElement(Scommon));
                isSupCertain = true;
                _ch = obtainedCharacters.getLast();
                info += "第" + (wished) + "抽：抽中本期5星常驻角色" + _ch + "。\n";
            }
            S_DropCalc = 0;
            R_DropCalc++;
        }
        if (level == "R") {
            level = decideR();

            if (level == "Rup") {
                obtainedRecords.push(wished);//第几抽抽到的
                obtainedCalc.push(Number(S_DropCalc) + 1);//此时五星垫了几抽
                obtainedCharacters.push(getRandomElement(Rup));
                _ch = obtainedCharacters.getLast();
                isRupCertain = false;
                info += "第" + (wished) + "抽：抽中本期4星UP角色" + _ch + "。\n";
            }
            if (level == "Rcommon") {
                obtainedRecords.push(wished);//第几抽抽到的
                obtainedCalc.push(Number(S_DropCalc) + 1);//此时五星垫了几抽
                obtainedCharacters.push(getRandomElement(Rcommon));
                _ch = obtainedCharacters.getLast();
                isRupCertain = true;
                info += "第" + (wished) + "抽：抽中本期4星非UP角色" + _ch + "。\n";
            }
            if (level == "Rweapon") {
                obtainedRWeapons++;
                isRupCertain = true;
                info += "第" + (wished) + "抽：抽中本期4星武器\n";
            }
            S_DropCalc++;
            R_DropCalc = 0;
        }
        console.log(info);
    }
}