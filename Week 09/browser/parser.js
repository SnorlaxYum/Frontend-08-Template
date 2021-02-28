// 当前token
let currentToken = null

//输出token
function emit(token) {
    //if(token.type!="text")
    console.log(token)
}

const EOF = Symbol("EOF")

function data(c) {
    // <开始
    if(c === "<") {
        return tagOpen
    }
    // 文件结束
    if(c == EOF) {
        emit({
            type:"EOF"
        })
        return
    }
    // 文本节点
    emit({
        type:"text",
        content:c
    })
    return data
}

function tagOpen(c) {
    // </说明是结束标签
    if(c == "/") {
        return endTagOpen
    }
    // 是字母的话，标签名字开始记录
    if(c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: ""
        }
        return tagName(c)
    }
    return
}

function endTagOpen(c) {
    // 字母
    if(c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "endTag",
            tagName: ""
        }
        return tagName(c)
    } else if(c == ">") {

    } else if(c == EOF) {

    } else {

    }
}

function tagName(c) {
    // 空白，标签名字结束，找属性
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    }
    //  / 自结束
    if(c == "/") {
        return selfClosingStartTag
    }
    // 继续读取名字
    if(c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c
        return tagName
    }
    // 读取标签中的内容
    if(c == ">") {
        emit(currentToken)
        return data
    }
    return tagName
}

function beforeAttributeName(c) {
    // 空，继续找attribute
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    }
    if(c == ">") {
        return data
    }
    if(c == "=") {
        return beforeAttributeName
    }
    return beforeAttributeName
}

function selfClosingStartTag(c) {
    if(c ==">") {
        currentToken.isSelfClosing = true
        return data
    } else if(c == "EOF") {

    } else {

    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data
    for(let c of html) {
        state = state(c)
    }
    state = state(EOF)
}