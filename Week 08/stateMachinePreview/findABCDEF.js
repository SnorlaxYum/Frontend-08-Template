/**
 * 在字符串中找到abcdef
 * @param {String} str 目标字符串
 * @returns {Boolean} 是否找到
 */
function findAtoF(str) {
    return !!(str.indexOf('abcdef')+1)
}

/**
 * 在字符串中找到abcdef
 * @param {String} str 目标字符串
 * @returns {Boolean} 是否找到
 */
function findAtoF(str) {
    let [target, curIndex] = ['abcdef', -1]
    for (let i in str) {
        if(str[i] === target[curIndex+1]) {
            curIndex++
        } else {
            curIndex = -1
        }
        if(curIndex === 5) {
            return true
        }
    }
    return false
}

/**
 * 在字符串中找到abcdef（修正）
 * @param {String} str 目标字符串
 * @returns {Boolean} 是否找到
 */
function match(string) {
    let state = start
    for(let c of string) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    if(c === "a")
        return foundA
    return start
}

function end(c) {
    return end
}

function foundA(c) {
    if(c === "b")
        return foundB
    return start(c)
}

function foundB(c) {
    if(c === "c")
        return foundC
    return start(c)
}

function foundC(c) {
    if(c === "d")
        return foundD
    return start(c)
}

function foundD(c) {
    if(c === "e")
        return foundE
    return start(c)
}

function foundE(c) {
    if(c === "f")
        return end
    return start(c)
}

console.log(match("aaaaaaabcabcdef"))