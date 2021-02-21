/**
 * 找到abcabx
 * @param {String} str 目标字符串
 * @returns {Boolean} 是否找到
 */
function match(str) {
    let state = start
    for(let c of str) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    if(c === 'a') {
        return foundA1
    }
    return start
}

function end(c) {
    return end
}

function foundA1(c) {
    if(c === 'b') {
        return foundB1
    }
    return start(c)
}

function foundB1(c) {
    if(c === 'c') {
        return foundC
    }
    return start(c)
}

function foundC(c) {
    if(c === 'a') {
        return foundA2
    }
    return start
}

function foundA2(c) {
    if(c === 'b') {
        return foundB2
    }
    //也可start(c)，因为a后面都是b
    return foundA1(c)
}

function foundB2(c) {
    if(c === 'x') {
        return end
    }
    return foundB1(c)
}

console.log(match("aabcabx"))
console.log(match("ababcabx"))
console.log(match("abcabcabx"))
console.log(match("abcaabcabx"))
console.log(match("abcababcabx"))
console.log(match("abcabxabcabx"))
