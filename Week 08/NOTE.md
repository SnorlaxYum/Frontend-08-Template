# 学习笔记

## 浏览器总论——浏览器工作原理总论

接下来要用node.js实现一个玩具浏览器

url--(http)->html--(parse)->DOM--(css computing)->DOM with CSS--(layout)->DOM with position--(render)->Bitmap

## 状态机

### 有限状态机

* 每一个状态都是一个机器
    * 在每一个机器里，我们可以做计算、存储、输出……
    * 所有的这些机器接受的输入是一致的
    * 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，应该是纯函数（无副作用）
* 每一个机器知道下一个状态
    * 每个机器都有确定的下一个状态（Moore）
    * 每个机器都有根据输入决定下一个状态（Mealy）

#### JS中的有限状态机（Mealy）

```js
//每个函数是一个状态
function state(input) {//函数参数就是输入
    //在函数中，可以自由地编写代码，处理每个状态的逻辑
    return next;//返回值作为下一个状态
}

//以下是调用
while(input) {
    //获取输入
    state = state(input); //把状态机的返回值作为下一个状态
}
```

### 使用状态机处理字符串

课堂原代码：
```js
function match(string) {
    let state = start
    for(let c of string) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    if(c === "a")
        return foundA
    return start
}

function end(c) {
    return end
}

function foundA(c) {
    if(c === "b")
        return foundB
    return start
}

function foundB(c) {
    if(c === "c")
        return foundC
    return start
}

function foundC(c) {
    if(c === "d")
        return foundD
    return start
}

function foundD(c) {
    if(c === "e")
        return foundE
    return start(c)
}

function foundE(c) {
    if(c === "f")
        return end
    return start(c)
}
```

个人仔细在脑内运行了几遍，并对aaaaaaabcabcdef这样的字符串运行（也同时执行了一遍），发现会返回false，我个人理解可能课堂上老师typo，应该是：

```js
function match(string) {
    let state = start
    for(let c of string) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    if(c === "a")
        return foundA
    return start
}

function end(c) {
    return end
}

function foundA(c) {
    if(c === "b")
        return foundB
    return start(c)
}

function foundB(c) {
    if(c === "c")
        return foundC
    return start(c)
}

function foundC(c) {
    if(c === "d")
        return foundD
    return start(c)
}

function foundD(c) {
    if(c === "e")
        return foundE
    return start(c)
}

function foundE(c) {
    if(c === "f")
        return end
    return start(c)
}
```

这样找到a、b或c后下一个字符不符合Pattern，会继续检测该字符是否符合开头。

## HTTP请求

### 第一步：HTTP的协议解析

ISO-OSI七层网络模型（计算机网络相关知识）

应用（HTTP）
表示（HTTP）
会话（HTTP）
传输（TCP）
网络（Internet）
数据链路（4G/5G/WiFi）
物理层（4G/5G/WiFi）

#### TCP与IP的一些基础知识

* 流
* 端口
* require("net");
* 包
* IP地址
* libnet/libpcap

#### HTTP

* Request
* Response

### 第二：服务端环境准备

node.js写一个小的服务端

服务端：`browser/server.js`

POST / HTTP/1.1
Host: 127.0.0.1
Content-Type: application/x-www-form-urlencoded

field1=aaa&code=x%3D1

第一行Request Line
第2～3 header
最后是body

### 实现一个HTTP的请求

第一步 HTTP请求总结
* 设计一个HTTP请求的类
* content type是一个必要的字段，要有默认值
* body可以是KV格式
* 不同的content-type影响body的格式

第二步 send函数总结
* 在Request的构造器中收集必要的信息
* 设计一个send函数，把请求真实发送到服务器
* send函数应该是异步的，所以返回Promise

第三步 发送请求

HTTP/1.1 200 OK
Content-Type: text/html
Date: Mon, 23 Dec 2019 00:00:00 GMT
Connection: keep-alive
Transfer-Encoding: chunked

26
<html><body>Hello World</body></html>
0

* 设计支持已有的connection或者自己搭建connection
* 收到数据传给parser
* 根据parser的状态resolve Promise

第四步 ResponseParser总结

* Response必须分段构造，所以我们要用一个ResponseParser来装配
* REsponseParser分段处理ResponseText，我们用状态机来分析文本的结构

第五步 BodyParser总结

* Response body可能根据Content-type有不同的结构，因此我们会采用子Parser的结构来解决问题
* 以TrunkedBodyParser为例，我们同样用状态机来处理body的格式