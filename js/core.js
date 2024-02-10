var __VERSION = "v1.0.8";
document.getElementById("VersionTitle").innerHTML = __VERSION;

var E_header = document.getElementById('header');

Array.prototype.getLast = function () {
    return this[this.length - 1];
}

Array.prototype.deleteElement = function (target) {
    var targetIndex = this.indexOf(target);
    if (targetIndex !== -1) {
        this.splice(targetIndex, 1); // 删除目标字符串
    }
}

/**
 * 
 * @param {Object} referenceObj
 * @param {Array} referenceArray 
 * @param {Array} valueArray 
 * @returns
 */
function extractValue(referenceObj, referenceArray, valueArray) {
    for (var i = 0; i < referenceArray.length; i++) {
        if (referenceArray[i] == referenceObj) {
            return valueArray[i];
        }
    }
    return false;
}

function getRandomDecimal() {
    return Math.random();
}

function findCharacter(characterName) {
    for (var i = 0; i < CHARACTER_LIST.length; i++) {
        if (CHARACTER_LIST[i].name == characterName) return CHARACTER_LIST[i];
    }
    return false;
}