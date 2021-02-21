/**
 * 找到A
 * @param {String} str 目标字符串
 * @returns {Boolean} 是否找到
 */
function findA(str) {
    for(let i = 0; i < str.length; i++) {
        if(str[i] === 'a') {
            return true
        }
    }
    return false
}

/**
 * 找到A
 * @param {String} str 目标字符串
 * @returns {Boolean} 是否找到
 */
function findA(str) {
    return !!(str.indexOf('a')+1)
}