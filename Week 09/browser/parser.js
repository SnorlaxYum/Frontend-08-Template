const EOF = Symbol("EOF")

function data(c) {
    // <开始
    if(c === "<") {
        return tagOpen
    }
    // 文件结束
    if(c == EOF) {
        return
    }
    // 未开始，继续寻找
    return data
}

function tagOpen(c) {
    // </说明是结束标签
    if(c == "/") {
        return endTagOpen
    }
    // 是字母的话，标签名字开始记录
    if(c.match(/^[a-zA-Z]$/)) {
        return tagName(c)
    }
    // 继续寻找
    return tagOpen
}

function endTagOpen(c) {
    if(c.match(/^[a-zA-Z]$/)) {
        return tagName(c)
    } else if(c == ">") {

    } else if(c == EOF) {

    } else {

    }
}

function tagName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    }
    if(c == "/") {
        return selfClosingStartTag
    }
    if(c.match(/^[a-zA-Z]$/)) {
        return tagName
    }
    if(c == ">") {
        return data
    }
    return tagName
}

function beforeAttributeName(c) {
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