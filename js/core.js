// core.js
// 核心。储存版本、文件操作、核心函数。

var __VERSION = "v3.3.1";
document.getElementById("VersionTitle").innerHTML = __VERSION;

var E_header = document.getElementById('header');

/**
 * 获取数组最后一个元素
 * @returns 
 */
Array.prototype.getLast = function () {
    return this[this.length - 1];
}

/**
 * 删除String数组中对应的字符串
 * @param {String} target 
 */
Array.prototype.deleteElement = function (target) {
    var targetIndex = this.indexOf(target);
    if (targetIndex !== -1) {
        this.splice(targetIndex, 1); // 删除目标字符串
    }
}

/**
 * 根据referenceArray中的referenceObj，对应找到valueArray中的元素。
 * 一般要求referenceArray和valueArray的长度对等。
 * @param {Object} referenceObj
 * @param {Array} referenceArray 
 * @param {Array} valueArray 
 * @returns 任意类型的值。若未找到对应值，返回false。
 */
function extractValue(referenceObj, referenceArray, valueArray) {
    for (var i = 0; i < referenceArray.length; i++) {
        if (referenceArray[i] == referenceObj) {
            return valueArray[i];
        }
    }
    return false;
}

/**
 * 随机0-1之间的小数。
 * @returns 小数。
 */
function getRandomDecimal() {
    return Math.random();
}

function isInteger() {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] % 1 != 0) return false;
    }
    return true;
}

function getQuotient(dividend, divisor) {
    if (!isInteger(dividend, divisor)) throw new Error("不允许接收小数！");
    if (dividend < 0 || divisor < 0) throw new Error("不允许接收负数！");
    var remainder = dividend % divisor;
    return (dividend - remainder) / divisor;
}

/**
 * 通过角色识别名获取角色对象。
 * @param {String} characterName 
 * @returns 角色(Character)类型的值，若未找到则返回false。
 */
function findCharacter(characterName) {
    var _chara = characterMap[characterName];
    return _chara;
}