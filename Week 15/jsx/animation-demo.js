import {Timeline, Animation} from './animation.js'
import {ease, easeIn} from './ease.js'

let tl = new Timeline()


// tl.add(new Animation({ set a (v) {console.log(v) }}, "a", 0, 100, 1000, null))
tl.start()

tl.add(new Animation(document.querySelector("#el").style, "transform", 0, 500, 2000, 0, easeIn, v=> `translateX(${v}px)`))

document.querySelector("#el2").style.transition = 'transform 2s ease-in'
document.querySelector("#el2").style.transform = 'translateX(500px)'

document.querySelector("#pause-btn").addEventListener("click", () => tl.pause())
document.querySelector("#resume-btn").addEventListener("click", () => tl.resume())