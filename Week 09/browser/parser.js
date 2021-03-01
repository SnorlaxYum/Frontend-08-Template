// 当前token
let currentToken = null
let currentAttribute = null
let currentTextNode = null

let stack = [{type: "document", children: []}]

//输出token
function emit(token) {
    if(token.type==="text")
        return

    let top = stack[stack.length - 1]
    
    if(token.type == "startTag") {
        let element = {
            type: "element",
            children: [],
            attributes: []
        }

        element.tagName = token.tagName

        for(let p in token) {
            if(p != "type" && p != "tagName")
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
        }

        top.children.push(element)
        element.parent = top

        if(!token.isSelfClosing)
            stack.push(element)

        currentTextNode = null
    } else if(token.type == "endTag") {
        if(top.tagName != token.tagName) {
            throw new Error("Tag start end doesn't match!")
        } else {
            stack.pop()
        }
        currentTextNode = null
    }
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
    if(c == "/" || c == ">" || c == EOF) {
        return afterAttributeName(c)
    }
    if(c == "=") {
        return beforeAttributeName
    }
    currentAttribute = {
        name: "",
        value: ""
    }
    return attributeName(c)
}

function attributeName(c) {
    //console.log(currentAttribute)
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
        return afterAttributeName(c)
    }
    if(c == "=") {
        return beforeAttributeValue
    } else if(c == "\u0000") {

    } else if(c == "\"" || c == "'" || c == "<") {

    } else {
        currentAttribute.name += c
        return attributeName
    }
}

function beforeAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
        return beforeAttributeValue
    }
    if(c == "\"") {
        return doubleQuotedAttributeValue
    }
    if(c == "\'") {
        return singleQuotedAttributeValue
    }
    if(c == ">") {

    } else {
        return UnquotedAttributeValue(c)
    }
}

function doubleQuotedAttributeValue(c) {
    if(c == "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    }
    if(c == "\u0000") {

    } else if(c == EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function afterQuotedAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if(c == "/") {
        return selfClosingStartTag
    } else if(c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    }
    if(c == EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function UnquotedAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value
    }
    if(c == "/") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag
    }
    if(c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    }
    if(c == "\u0000") {

    } else if(c == "\"" || c == "'" || c == "<" || c == "=" || c == "'") {

    } else if(c == EOF) {

    } else {
        currentAttribute.value += c
        return UnquotedAttributeValue
    }
}

function singleQuotedAttributeValue(c) {
    if(c == "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    }
    if(c == "\u0000") {

    } else if(c == EOF) {

    } else {
        currentAttribute.value += c
        return singleQuotedAttributeValue
    }
}

function selfClosingStartTag(c) {
    if(c == ">") {
        currentToken.isSelfClosing = true
        emit(currentToken)
        return data
    }
    return selfClosingStartTag
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

function afterAttributeName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName
    }
    if(c == "/") {
        return selfClosingStartTag
    }
    if(c == "=") {
        return beforeAttributeValue
    }
    if(c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    }
    if(c == EOF) {

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c)
    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data
    for(let c of html) {
        state = state(c)
    }
    state = state(EOF)
    console.log(stack[0])
}