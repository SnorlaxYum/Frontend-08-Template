# 组件化

## 组件的基本知识

### 组件的基本概念和基本组成部分

我们怎么样去扩展HTML标签，从这个开始引申出来的前端的架构体系，主要目标就是复用。
架构模式就是大家特别熟悉的MVC啊MVVM它主要的关心就是前端和数据逻辑层之间，它是如何去交互的，所以说前端架构里面组件化的这个部分，可以说是重中之重，同时在我的实际的工程的实际操作里面，我认为组件化的重要性其实是比MVC这样的架构模式要更重要一些。因为组件化直接决定了你一个前端团队它的复用率。好的组件化体系能够帮助一个前端团队提升它的复用率，并且写代码的时候可以少很多的心智负担。

首先我们先了解一下组件的一些基本的概念和一个组件的基本的组成部分

#### 对象与组件

##### 对象

* Properties
* Methods
* Inherit

##### 组件

和UI强相关，某种意义上可以认为它是一种特殊的模块或者是特殊的对象
注意它即是对象又是模块
它可以以树形结构来进行组合，并且它有一定程度的这种模板化的配置的能力啊，这个就是我们组件的一个基本概念

* Properties
* Methods
* Inherit
* Attribute
* Config & State
* Event
* LifeCycle
* Children

![](./2021-04-19-203525_2560x1440_scrot.png)

JSX也可以理解为是一种嵌入在编程语言里面的XML的结构
然后Component User，就是这个使用组件的程序员，他除了通过Markup去影响组件，还可以通过Property去影响组件
attribute和Property是不是一回事完全取决于组件体系的设计者（有激进的方案把state config attribute property四者完全统一）
Method和Property其实差不多，只不过Method它可能用于描述一个复杂一点的过程，但javascript里的Property是允许有get和set的，所以两者最终是差不多的
如果说Method和Property是使用组件的程序员向开发组件的程序员传递信息，那么事件非常简单，它的方向反过来了，它是由开发组件的程序员向使用组件的程序员去传递信息，所以这一章图基本说明了组件的各个要素都是干嘛用的，以及他们的信息的流转的方向，到这里我们已经对组件有了一个初步的描述。接下来理清一些概念——

* Attribute vs Property

Attribute强调描述性，Property强调从属关系

Attribute:

```jsx
<my-component attribute="v" />
myComponent.getAttribute("a")
myComponent.setAttribute("a", "value")
```

Property:

```jsx
myCompnoent.a = "value"
```

class:

```html
<div class="cls1 cls2"></div>
<script>
    var div = document.getElementByTagName("div")
    div.className // cls1 cls2
</script>
```

style:

```html
<div class="cls1 cls2" style="color:blue"></div>
<script>
    var div = document.getElementByTagName("div")
    div.style // 对象
</script>
```

href:

```html
<a href="//m.taobao.com">aaa</a>
<script>
    var a = document.getElementByTagName("a")
    a.href // "http://m.taobao.com"，这个是resolve过的结果
    a.getAttribute("href") // "//m.taobao.com"，跟html代码中的完全一致
</script>
```

value:

```html
<input value="cute"/>
<script>
    var input = document.getElementByTagName("input") // 若property没有设置，则结果是attribute
    input.value // cute
    input.getAttribute("value") // cute
    input.value = "hello" // 若value属性已经设置，则attribute不变，property变化，元素上实际的效果是property优先
    input.value // hello
    input.getAttribute("value") // cute
</script>
```

attribute实际上相当于默认值的东西，以前jquery的时候经常有开发者会踩prop和attribute的坑，索性他后面出了val

###### 如何设置组件状态

| Markup Set | JS Set | JS Change | User Input Change |           |
|------------|--------|-----------|-------------------|-----------|
| N          | Y      | Y         | ?                 | property  |
| Y          | Y      | Y         | ?                 | attribute |
| N          | N      | N         | Y                 | state     |
| N          | Y      | N         | N                 | config    |

大多数情况下，prop是不允许用户输入去改变的，少数情况下，可能你的业务逻辑是允许的
attribute是Markup、js去设置，js也可以改变。用户的输入不一定会改变它，跟prop类似，大多数情况下，用户输入也是不会去改变attribute
state很大的特点就是，只能从组件的内部去改变，不会从组件的外部去改变，如果你想要设计一个东西是从组件外部去改变组件，一般来说是不会提供给你从外部改变state的能力，但是要保证用户输入能改变state
config只有在我组件构造的时候触发。因为不可更改性，通常会把它留给全局

###### LifeCycle

最容易想到两个：created、destroyed
世间一切一定有这两个生命周期

![](./2021-04-19-212252_2560x1440_scrot.png)

###### Children

* Content型Children与Template型Children

```jsx
// Content型
<my-button><img src="{{icon}}"/>{{title}}</my-button>

// Template型
<my-list>
    <li><img src="{{icon}}" />{{title}}</li>
</my-list>
```