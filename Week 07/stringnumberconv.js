function isSafeNumber(value) {
    return Number(value) <= Number.MAX_SAFE_INTEGER && Number(value) >= Number.MIN_SAFE_INTEGER
}

/**
 * 字符串转数字
 * @param {String} s
 * @return {Number|BigInt|String} 成功转换输出数字，否则输出错误字符串
 */
function StringToNumber(s) {
    if(Number.isNaN(Number(s))) {
        return `不是数字`
    }
    if(!isSafeNumber(s)) {
        if(s.indexOf('.')+1) {
            return '浮点数超过范围，无法转换'
        } else {
            return BigInt(s)
        }
    }
    return Number(s)
}

/**
 * 数字转字符串
 * @param {Number|BigInt} n
 * @returns {String}
 */
function NumberToString(n) {
    if(typeof n !== "number" && typeof n !== "bigint") {
        return `不是数字`
    }
    return n.toString()
}

console.log(StringToNumber("0x10"), NumberToString(0x10))