/**
 * @var stack 元素栈
 */
let stack = [{}], elementNotFound = false, curAttribute = "", attrValueIn = false

function stackReset() {
    stack = [{}]
}

/**
 * 检验选择器和目标元素是否匹配
 * @param {String} selector 选择器
 * @param {HTMLElement} element 目标元素
 */
function match(selector, element) {
    let state = data, curEle = element, preEle
    for(let char of selector) {
        state = state(char)
        if(state === end) {
            break
        }
    }
    if(elementNotFound) {
        stackReset()
        return false
    }

    // console.dir(stack)

    function isSameEle(ori) {
        for(let key of Object.keys(ori)) {
            if(key === "type") {
                continue
            }
            if(key === "classList") {
                let classList = Array.from(curEle.classList)
                for(let className of ori[key]) {
                    if(classList.indexOf(className) === -1) {
                        console.log("className not found, ", className)
                        console.dir(curEle)
                        return false
                    }
                }
            } else if(key === "localName") {
                if(curEle.localName !== ori.localName) {
                    return false
                }
            } else if(key === "attributes") {
                for(let attr of Object.keys(ori[key])){
                    if(typeof ori.attributes[attr] === "string") {
                        if(ori.attributes[attr] !== Object(curEle.attributes)[attr].nodeValue) {
                            return false
                        }
                    } else {
                        if(ori.attributes[attr].relation === ">=") {
                            if(Object(curEle.attributes)[attr].nodeValue >= ori.attributes[attr].value) {
                                return false
                            }
                        } else if(ori.attributes[attr].relation === ">") {
                            if(Object(curEle.attributes)[attr].nodeValue > ori.attributes[attr].value) {
                                return false
                            }
                        } else if(ori.attributes[attr].relation === "<=") {
                            if(Object(curEle.attributes)[attr].nodeValue <= ori.attributes[attr].value) {
                                return false
                            }
                        } else if(ori.attributes[attr].relation === "<") {
                            if(Object(curEle.attributes)[attr].nodeValue < ori.attributes[attr].value) {
                                return false
                            }
                        } else if(ori.attributes[attr].relation === "=") {
                            if(ori.attributes[attr].value !== Object(curEle.attributes)[attr].nodeValue) {
                                return false
                            }
                        } else if(ori.attributes[attr].relation === "~=") {
                            if(Object(curEle.attributes)[attr].nodeValue.search(ori.attributes[attr].value) === -1) {
                                return false
                            }
                        } else if(ori.attributes[attr].relation === "|=") {
                            if(!(Object(curEle.attributes)[attr].nodeValue === ori.attributes[attr].value) || !(Object(curEle.attributes)[attr].nodeValue.match(`^(${ori.attributes[attr].value}-)\\w+`))) {
                                return false
                            }
                        } else if(ori.attributes[attr].relation === "^=") {
                            if(Object(curEle.attributes)[attr].nodeValue.match(`^(${ori.attributes[attr].value})\\w+`)) {
                                return false
                            }
                        } else if(ori.attributes[attr].relation === "$=") {
                            if(Object(curEle.attributes)[attr].nodeValue.match(`\\w+(${ori.attributes[attr].value})$`)) {
                                return false
                            }
                        } else if(ori.attributes[attr].relation === "*=") {
                            if(Object(curEle.attributes)[attr].nodeValue.search(ori.attributes[attr].value) === -1) {
                                return false
                            }
                        }
                    }
                }
            }
        }
        return true
    }

    for(let i = stack.length-1; i >= 0; i--) {
        if(stack[i].type === "element" && i === stack.length-1){
            if(!isSameEle(stack[i])) {
                stackReset()
                return false
            }
        } else if(stack[i].type === "element") {
            while(curEle && !isSameEle(stack[i])) {
                curEle = curEle.parentElement
            }
            if(!curEle) {
                stackReset()
                return false
            }
        } else if(stack[i].type === 'operator') {
            if(stack[i].value === '>' || stack[i].value === '||') {
                // 因为时间有限，所以把||并入>，因为行和列也是绝对母子关系
                if(!isSameEle(stack[--i])) {
                    stackReset()
                    return false
                }
            } else if(stack[i].value === '~') {
                i--
                curEle = preEle.previousElementSibling
                while(curEle && !isSameEle(stack[i])) {
                    curEle = curEle.previousElementSibling
                }
                if(!curEle) {
                    stackReset()
                    return false
                }
            } else if(stack[i].value === '+') {
                i--
                curEle = preEle.previousElementSibling
                if(!isSameEle(stack[i])) {
                    return false
                }
            }
        }
        preEle = curEle
        curEle = curEle.parentElement
    }
    stackReset()
    return true;
}

// 需要注意一点：https://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
// In CSS, identifiers (including element names, classes, and IDs in selectors) can contain only the characters [a-zA-Z0-9] and ISO 10646 characters U+00A0 and higher, plus the hyphen (-) and the underscore (_); they cannot start with a digit, two hyphens, or a hyphen followed by a digit. Identifiers can also contain escaped characters and any ISO 10646 character as a numeric code (see next item). For instance, the identifier "B&W?" may be written as "B\&W\?" or "B\26 W\3F".
// 元素名字、ID、class名字每个字母必须得在这个范围——[a-zA-Z0-9] and ISO 10646 characters U+00A0 and higher, plus the hyphen (-) and the underscore (_)，且不得以数字、两个hyphen（-）开头
// 因为时间原因，所以我做的这个版本跳过Unicode，并且规定只能字母开头

function data(char) {
    if(char === "#") {
        stack[stack.length-1].type = 'element'
        stack[stack.length-1].attributes = {}
        stack[stack.length-1].attributes.id = ''
        return getId
    } else if(char === ".") {
        stack[stack.length-1].type = 'element'
        stack[stack.length-1].attributes = {}
        if(!stack[stack.length-1].classList) {
            stack[stack.length-1].classList = []
        }
        return getClassName
    } else if(char === "[") {
        stack[stack.length-1].type = 'element'
        stack[stack.length-1].attributes = {}
        return getAttrName
    } else if(char === " ") {
        if(Object.keys(stack[stack.length-1]).length) {
            stack.push({})
        }
    } else if(char === ">" || char === "~" || char === "+") {
        if(Object.keys(stack[stack.length-1]).length) {
            stack.push({})
        }
        stack[stack.length-1].type = 'operator'
        stack[stack.length-1].value = char
        stack.push({})
    } else if(char === "|") {
        if(Object.keys(stack[stack.length-1]).length) {
            if(stack[stack.length-1].type === "element") {
                stack.push({})
                stack[stack.length-1].type = 'operator'
                stack[stack.length-1].value = char
            } else if(stack[stack.length-1].type === "operator") {
                if(stack[stack.length-1].value === char) {
                    stack[stack.length-1].value += char
                    stack.push({})
                }
            }
        }
    } else if(char === "*") {
        stack[stack.length-1].type = 'element'
    } else if(!stack[stack.length-1].identifierError) {
        if(stack[stack.length-1].localName) {
            if(char.match(/[[a-zA-Z0-9\-\_]/)) {
                stack[stack.length-1].localName += char
            } else {
                stack[stack.length-1].identifierError = "illegal letter in the element name"
                elementNotFound = true
                return end
            }
        } else {
            if(char.match(/[[a-zA-Z]/)) {
                stack[stack.length-1].type = 'element'
                stack[stack.length-1].attributes = {}
                stack[stack.length-1].localName = char
            } else {
                stack[stack.length-1].identifierError = "illegal starting letter in the element name"
                elementNotFound = true
                return end
            }
        }
    }
    return data
}

function end() {
    return end
}

function getId(char) {
    if(char == " ") {
        return data(char)
    }
    if(stack[stack.length-1].identifierError) {
        return data
    }
    if(char === ".") {
        if(!stack[stack.length-1].classList) {
            stack[stack.length-1].classList = ['']
        }
        return getClassName
    }
    if(typeof stack[stack.length-1].attributes.id === "string" && stack[stack.length-1].attributes.id.length) {
        if(char.match(/[[a-zA-Z0-9\-\_]/)) {
            stack[stack.length-1].attributes.id += char
        } else {
            stack[stack.length-1].identifierError = "illegal letter in the element id"
            elementNotFound = true
            return end
        }
    } else {
        if(char.match(/[[a-zA-Z]/)) {
            stack[stack.length-1].attributes.id = char
        } else {
            stack[stack.length-1].identifierError = "illegal starting letter in the element id"
            elementNotFound = true
            return end
        }
    }
    return getId
}

function getClassName(char) {
    if(char == " ") {
        return data(char)
    }
    if(stack[stack.length-1].identifierError) {
        return data
    }
    if(char === ".") {
        stack[stack.length-1].classList.push('')
        return getClassName
    }
    if(typeof stack[stack.length-1].classList[stack[stack.length-1].classList.length-1] === "string" && stack[stack.length-1].classList[stack[stack.length-1].classList.length-1].length) {
        if(char.match(/[[a-zA-Z0-9\-\_]/)) {
            stack[stack.length-1].classList[stack[stack.length-1].classList.length-1] += char
        } else {
            stack[stack.length-1].identifierError = "illegal letter in the element id"
            elementNotFound = true
            return end
        }
    } else {
        if(char.match(/[[a-zA-Z]/)) {
            stack[stack.length-1].classList[stack[stack.length-1].classList.length-1] = char
        } else {
            stack[stack.length-1].identifierError = "illegal starting letter in the element id"
            elementNotFound = true
            return end
        }
    }
    return getClassName
}

function getAttrName(char) {
    if(char === "]") {
        stack[stack.length-1].attributes[curAttribute] = {}
        return data
    }
    
    if(char === ">" || char === "<" || char === "~" || char === "|" || char === "^" || char === "$" || char === "*") {
        stack[stack.length-1].attributes[curAttribute] = {relation: char}
        return getAttrValue
    }

    if(char === "=") {
        if(!stack[stack.length-1].attributes[curAttribute]) {
            stack[stack.length-1].attributes[curAttribute] = {relation: char}
        }
        return getAttrValue
    }

    if(typeof curAttribute === "string" && curAttribute.length) {
        if(char.match(/[[a-zA-Z0-9\-\_]/)) {
            curAttribute += char
        } else {
            elementNotFound = true
            return end
        }
    } else {
        if(char.match(/[[a-zA-Z]/)) {
            curAttribute = char
        } else {
            elementNotFound = true
            return end
        }
    }
    return getAttrName
}

function getAttrValue(char) {
    if(attrValueIn) {
        if(attrValueIn === char) {
            attrValueIn = false
        } else {
            stack[stack.length-1].attributes[curAttribute].value += char
        }
    } else {
        if(char === '=') {
            stack[stack.length-1].attributes[curAttribute].relation += char
        } else if(char === '"' || char === "'") {
            attrValueIn = char
            stack[stack.length-1].attributes[curAttribute].value = ''
        } else if(char === "]") {
            curAttribute = ''
            return data
        }
    }
    return getAttrValue
}
 
console.log(match("div #id.class.cls", document.getElementById("id")))
console.log(match("div>#id.class.cls", document.getElementById("id")))
console.log(match("body>div>div~#id.class.cls", document.getElementById("id")))
console.log(match("body>div>div+#id.class.cls", document.getElementById("id")))
console.log(match("body||div>div~#id.class.cls", document.getElementById("id")))

console.log(match("a #id.class.cls", document.getElementById("id")))
console.log(match("a>#id.class.cls", document.getElementById("id")))
console.log(match("a>div>div~#id.class.cls", document.getElementById("id")))
console.log(match("a>div>div+#id.class.cls", document.getElementById("id")))
console.log(match("a||div>div~#id.class.cls", document.getElementById("id")))