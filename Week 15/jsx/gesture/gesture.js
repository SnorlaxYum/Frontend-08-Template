let element = document.documentElement

let isListeningMouse

element.addEventListener("mousedown", event => {
    
    let context = Object.create(null)
    contexts.set("mouse" + (1 << event.button), context)

    start(event, context)

    let mousemove = event => {
        let button = 1

        // event.buttons掩码设计比如0b00001
        while(button <= event.buttons) {
            if(button & event.buttons) {
                let key
                // event.buttons中键和右键刚好是相反的顺序
                if(button === 2)
                    key = 4
                else if(button === 4)
                    key = 2
                else
                    key = button
                let context = contexts.get("mouse"+key)
                move(event, context)
            }
            button = button << 1
        }
    }
    let mouseup = event => {
        let context = contexts.get("mouse"+(1 << event.button))
        end(event, context)
        contexts.delete("mouse"+(1 << event.button))
        if(event.buttons === 0) {
            document.removeEventListener("mousemove", mousemove)
            document.removeEventListener("mouseup", mouseup)
            isListeningMouse = false
        }
    }
    if(!isListeningMouse) {
        document.addEventListener("mousemove", mousemove)
        document.addEventListener("mouseup", mouseup)
        isListeningMouse = true
    }
})

let contexts = new Map()

element.addEventListener("touchstart", event => {
    // 移动端touchstart肯定会触发move，不用在里面监听
    // console.log(event.changedTouches)
    for(let touch of event.changedTouches) {
        let context = Object.create(null)
        contexts.set(touch.identifier, context)
        start(touch, context)
    }
})

element.addEventListener("touchmove", event => {
    for(let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        move(touch, context)
    }
})

element.addEventListener("touchend", event => {
    for(let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        end(touch, context)
        contexts.delete(touch.identifier)
    }
})

// touchcancel表示手指touch的点的序列是以一个异常的模式去结束的，比如alert
element.addEventListener("touchcancel", event => {
    for(let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        cancel(touch)
        contexts.delete(touch.identifier)
    }
})

let handler
let startX, startY
let isPan = false, isTap = true, isPress = false

let start = (point, context) => {
    //console.log("start", point.clientX, point.clientY)
    context.startX = point.clientX, context.startY = point.clientY

    context.isTap = true
    context.isPan = false
    context.isPress = false

    context.handler = setTimeout(() => {
        context.isTap = false
        context.isPan = false
        context.isPress = true
        context.handler = null
        console.log("pressstart")
    }, 500)
}

let move = (point, context) => {
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY

    if(!context.isPan && dx ** 2 + dy ** 2 > 100) {
        context.isTap = false
        context.isPan = true
        context.isPress = false
        console.log("panstart")
        clearTimeout(context.handler)
    }

    if(context.isPan) {
        console.log(dx, dy)
        console.log("pan")
    }

    //console.log("move", point.clientX, point.clientY)
    
}

let end = (point, context) => {
    if(context.isTap) {
        dispatch("tap", {})
        clearTimeout(handler)
    }
    if(context.isPan) {
        console.log("panend")
    }
    if(context.isPress) {
        console.log("pressend")
    }
    // console.log("end", point.clientX, point.clientY)
    
}

let cancel = (point, context) => {
    clearTimeout(context.handler)
    console.log("cancel", point.clientX, point.clientY)
}

function dispatch(type, properties) {
    let event = new Event(type)
    for(let name in properties) {
        event[name] = properties[name]
    }
    element.dispatchEvent(event)
}