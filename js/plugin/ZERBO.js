//ZERBO.js
/** 
 * @file ZER Basic Operations 
 * @author Quincy K.
 */



/**
 * @func 双映射数组元素提取函数
 * @desc 参考数组和值数组互为映射关系，已知参考数组中的一个元素，求取值数组中对应的元素。
 * 要求双映射数组的长度必须一致。
 * @param {Object} key 已知值
 * @param {Array} referenceArray 参考数组
 * @param {Array} valueArray 值数组
 */
function extractValue(key, referenceArray, valueArray) {
    for (var i = 0; i < valueArray.length; i++) {
        if (referenceArray[i] == key) return valueArray[i];
    }
    throw new Error("extractValue: 未在参考数组中找到对应的元素！");
}

/**
 * @func 获取数组的最后一个元素。
 * @returns 
 */
Array.prototype.getLast = function () {
    return this[this.length - 1];
}

/**
 * @func 删除非重复数组中的某个已知元素。
 * @param {String} target 要删除的元素
 */
Array.prototype.deleteElement = function (target) {
    var targetIndex = this.indexOf(target);
    if (targetIndex !== -1) {
        this.splice(targetIndex, 1); // 删除目标元素
    }
}