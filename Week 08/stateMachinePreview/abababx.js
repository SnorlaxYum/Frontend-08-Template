/**
 * 状态机
 * @param {String} str 目标字符串
 * @param {(char: String) => (fun: Function)} start 起始字符函数
 * @returns {Boolean} 是否找到
 */
function match(str, start) {
    let state = start
    for(let c of str) {
        state = state(c)
    }
    return state === end
}

function end() {
    return end
}

/**
 * 在目标字符串找abababx
 * @param {String} str 目标字符串
 * @returns {Boolean} 是否找到
 */
function findThese(str) {
    let start = c => c === 'a' ? foundA1 : start
    let foundA1 = c => c === 'b' ? foundB1 : start(c)
    let foundB1 = c => c === 'a' ? foundA2 : start
    let foundA2 = c => c === 'b' ? foundB2 : start(c)
    let foundB2 = c => c === 'a' ? foundA3 : start
    let foundA3 = c => c === 'b' ? foundB3 : start(c)
    let foundB3 = c => c === 'x' ? end : foundB2(c)

    return match(str, start)
}

console.log(findThese("ababababababababababaaaaaaabababababababababababx"))