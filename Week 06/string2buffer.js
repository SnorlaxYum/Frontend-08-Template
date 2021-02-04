// 方法一：TextEncoder——https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
function UTF8_Encoding(String) {
    let encoder = new TextEncoder()
    return encoder.encode(String)
}

// 方法二：encodeURI，然后遍历输出数字
function UTF8_Encoding1(String) {
    let res = []
    let strPar = encodeURI(String)

    for(let i = 0; i < strPar.length; i++) {
        if(strPar[i] == '%') {
            // UTF8码，除去`%`是2位16进制的数字
            res.push(parseInt(strPar.slice(i+1, i+3), 16))
            i += 2
        } else {
            // ASCII码
            res.push(strPar[i].codePointAt(0))
        }
    }

    return res
}

let a = "s就发送的会更健康合法的健康"

console.log(UTF8_Encoding(a))
console.log(UTF8_Encoding1(a))