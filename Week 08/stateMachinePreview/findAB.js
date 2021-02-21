/**
 * 不使用正则找字符串中的ab
 * @param {String} str 目标字符串
 * @returns {Boolean} 是否找到
 */
function findAB(str) {
    for(let i = 0; i < str.length-1; i++) {
        if(str.slice(i, i+2) === 'ab') {
            return true
        }
    }
    return false
}

/**
 * 不使用正则找字符串中的ab
 * @param {String} str 目标字符串
 * @returns {Boolean} 是否找到
 */
function findAB(str) {
    return !!(str.indexOf('ab')+1)
}