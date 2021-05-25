let element = document.documentElement

element.addEventListener("mousedown", event => {
    start(event)
    let mousemove = event => {
        move(event)
    }
    let mouseup = event => {
        end(event)
        element.removeEventListener("mousemove", mousemove)
        element.removeEventListener("mouseup", mouseup)    
    }
    element.addEventListener("mousemove", mousemove)
    element.addEventListener("mouseup", mouseup)
})

element.addEventListener("touchstart", event => {
    // 移动端touchstart肯定会触发move，不用在里面监听
    // console.log(event.changedTouches)
    for(let touch of event.changedTouches) {
        start(touch)
    }
})

element.addEventListener("touchmove", event => {
    for(let touch of event.changedTouches) {
        move(touch)
    }
})

element.addEventListener("touchend", event => {
    for(let touch of event.changedTouches) {
        end(touch)
    }
})

// touchcancel表示手指touch的点的序列是以一个异常的模式去结束的，比如alert
element.addEventListener("touchcancel", event => {
    for(let touch of event.changedTouches) {
        cancel(touch)
    }
})

let start = (point) => {
    console.log("start", point.clientX, point.clientY)
}

let move = (point) => {
    console.log("move", point.clientX, point.clientY)
    
}

let end = (point) => {
    console.log("end", point.clientX, point.clientY)
    
}

let cancel = (point) => {
    console.log("cancel", point.clientX, point.clientY)
    
}