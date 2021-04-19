# 重学HTML

## HTML的定义：XML与SGML

### DTD与XML namespace

* http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
* http://www.w3.org/1999/xhtml

&lt; <转义
&gt; >转义

## HTML标签语义

aside：不是主体部分
main：主体部分
article：文章主体
h1：页面主标题
h2：次级标题
hgroup：标题组
不知道使用那个：用class补充
strong：这个词在文章中很重要
em：这个词在句子里面的重音
figure：里面的figcaption是说明，可以把图也放进去
ol：ordered list
ul：unordered list
dfn：概念，表示这个地方有这个词的定义
pre：预先调整好格式的文本
samp：实例

## HTML语法

### 合法元素

* Element: `<tagname>...</tagname>`
* Text: text
* Comment: `<!-- comments -->`
* DocumentType: `<!Doctype html>`
* ProgressingInstruction: `<?a 1?>`（线上不应该出现）
* CDATA: `<![CDATA[ ]]>`

### 字符引用

* `&#161;`
* `&amp;`
* `&lt;`
* `&quot;`

# 浏览器API

## 事件API

[addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

事件冒泡与捕获

捕获：从外到内计算点到了哪个元素上
冒泡：已经算出来点到了哪个元素，层层的向外去触发，然后让元素去响应这个事件的过程

addEventListener不传第三个参数，默认得到的就是一个冒泡的事件的监听

事件根据加的先后顺序触发，捕获事件先于冒泡事件触发

## DOM API

BOM最早是浏览器一个私有的名称，不是DOM

DOM API分成四个部分，其中有一部分是废的（traversal系列的API，可以去访问DOM树所有节点的自动迭代工具，用了比不用还麻烦，不推荐大家使用）。  
我们DOM API中节点部分，是最重要的一部分API，我们平时大部分的场景都在用节点部分，  
除了节点部分，还有事件部分，这个也是非常关键的（用JS和HTML发生交互，都需要通过事件），  
还有一部分非常强大，用起来也非常麻烦，叫做Range API，比起节点类的API能够更精确的操纵DOM树，性能也是更好的，但因为应用性很差，所以只有少数专业人士，比方说喜欢做HTML编辑器的一些专家，他们就会使用这部分。

先从最简单的节点类API开始说起

所有DOM树上能挂着的东西，都是统一继承自一个叫做Node的类，所以Node是所有这些节点的基类，挂在DOM树上的一定叫Node，但是它不一定是Element，Element和Node有时候也常常被大家所混淆（Node里面80%～90%也都是属于Element）
脑图见`Node.xmind`

### 导航类操作

所有节点：
* parentNode
* childNodes
* firstChild
* lastChild
* nextSibling
* previousSibling
元素节点：
* parentElement
* children
* firstElementChild
* lastElementChild
* nextElementSibling
* previousElementSibling

### 修改操作

* appendChild
* insertBefore
* removeChild
* replaceChild

### 高级操作

* compareDocumentPosition是一个用于比较两个节点中关系的函数
* contains检查一个节点是否包含另一个节点的函数
* isEqualNode检查两个节点是否完全相同
* isSameNode检查两个节点是否是同一个节点，实际上在JavaScript中可以用`===`
* cloneNode复制一个节点，如果传入参数true，则会连同子元素做深拷贝

### iterater迭代器

没有实际用途，设计风格过于老旧，没有和现代Javascript相结合，所以winter老师认为这个API已经是被淘汰的一个状态

### Range API

比Node API更强大更细致也更难用和难理解。对DOM的操作树可以说是万能。适用于对DOM树精准的小手术

元素的子元素实现逆序，了解DOM API的会这样做：

```
<div id="a">
    <span>1</span>
    <p>2</p>
    <p>3</p>
    <p>4</p>
</div>
<script>
let element = document.getElementById("a");

function reverseChildren(element) {
    var l = element.childNodes.length;
    while(l-- > 0) {
        element.appendChild(element.childNodes[l]);
    }
}

reverseChildren(element);
</script>
```

讲解Range API答案前，讲一下它：

可以理解为文档流里面一个有起始点和终止点的一个范围

* var range = new Range()
* range.setStart(element, 9)
* range.setEnd(element, 4)
* var range = document.getSelection().getRangeAt(0)

便捷方式：

* range.setStartBefore
* range.setEndBefore
* range.setStartAfter
* range.setEndAfter
* range.selectNode
* range.selectNodeContents

Example：

* 删(在append时，会把自己的子节点代替自己放上去)：var fragment = range.extractContents()
* 加：range.insertNode(document.createTextNode("aaaa"))

```
<div id="a">123<span style="background-color: pink">456789</span>01234567890</div>
<script>
let range = new Range();
range.setStart(document.getElementById("a").childNodes[0], 3)
range.setEnd(document.getElementById("a").childNodes[2], 3)
</script>
```

用range解决那道题：

```
<div id="a">
    <span>1</span>
    <p>2</p>
    <p>3</p>
    <p>4</p>
</div>
<script>
let element = document.getElementById("a");

function reverseChildren(element) {
    let range = new Range()
    range.selectNodeContents(element)

    let fragment = range.extractContents()
    // fragment不需要重排，性能比较高
    let l = fragment.childNodes.length
    while(l-- > 0) {
        fragment.appendChild(fragment.childNodes[l])
    }
    element.appendChild(fragment)
}

reverseChildren(element);
</script>
```

### CSSOM

DOM API约等于html语言的对象化，所以DOM API基本上和html的能力是非常对等的
对CSS的文档的一个抽象，就是咱们的CSSOM
严格来说也是要从DOM API去访问的，因为它就嵌在html代码里面，CSS一切的API都需要通过document.styleSheets这个属性去访问

#### document.styleSheets

* document.styleSheets
* 案例
* document.styleSheets[0].cssRules
* document.styleSheets[0].insertRule("p {color:pink;}", 0)
* document.styleSheets[0].removeRule(0)

#### Rule

* CSSStyleRule
    * selectorText String
    * style K-V结构
* CSSCharsetRule
* CSSImportRule
* CSSMediaRule
* CSSFontFaceRule
* CSSPageRule
* CSSNamespaceRule
* CSSKeyframesRule
* CSSKeyframeRule
* CSSSupportsRule
* ......

#### getComputedStyle

* window.getComputedStyle(elt, pseudoElt)
    * elt 想要获取的元素
    * pseudoElt 可选，伪元素

### CSSOM View

#### window

* window.innerHeight, window.innerWidth
* window.outerWidth, window.outerHeight
* window.devicePixelRatio
* window.screen
    * window.screen.width
    * window.screen.height
    * window.screen.availWidth
    * window.screen.availHeight

##### Window API

* window.open("about:blank", "_blank", "width=100, height=100, left=100, right=100")
* moveTo(x,y)
* moveBy(x,y)
* resizeTo(x,y)
* resizeBy(x,y)

##### scroll

* scrollTop
* scrollLeft
* scrollWidth
* scrollHeight
* scroll(x,y)
* scrollBy(x,y)
* scrollIntoView()

* window
    * scrollX
    * scrollY
    * scroll(x,y)
    * scrollBy(x,y)

##### layout

* getClientRects()
* getBoundingClientRect()

### 其它API

#### 标准化组织

* khronos
    * WebGL
* ECMA
    * ECMAScript
* WHATWG
    * HTML
* W3C
    * webaudio
    * CG/WG

对全部的API进行分类与整理

```
let names = Object.getOwnPropertyNames(window)

function filterOut(names, props) {
    let set = new Set()
    props.forEach(o => set.add(o))
    return names.filter(e => !set.has(e))
}

// ECMA 262
{
    let js = new Set()
    let objects = []
    objects.forEach(o => js.add(o))
    names = names.filter(e => !js.has(e))
}

// Subclass of Mode
names = names.filter(e => {
    try {
        return !(window[e].prototype instanceof Node)
    } catch(err) {
        return true
    }
}).filter(e => e != "Node")

// events
names = names.filter(e => !e.match(/^on/))

// webkit private
names = names.filter(e => !e.match(/^webkit/))

//https://html.spec.whatwg.org/#window

{
    let names = Object.getOwnPropertyNames(window)
    let js = new Set()
    let objects = ["BigInt"]
    objects.forEach(o => js.add(o))
    names = names.filter(e => !js.has(e))

    names = names.filter(e => {
        try {
            return !(window[e].prototype instanceof Node)
        } catch(err) {
            return true
        }
    }).filter(e => e != "Node")

    let windowprops = new Set()
    objects = ["window"]
    objects.forEach(o => windowprops.add(o))
    names = names.filter(e => !windowprops.has(e))
}

//https://html.spec.whatwg.org/

{
    let interfaces = new Set()
    objects = ["ApplicationCache", "AudioTrack", "AudioTrackList"]
    objects.forEach(o => interfaces.add(o))

    names = names.filter(e => !interfaces.has(e))
}
```
