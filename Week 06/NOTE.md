# 学习笔记——重学js

## 泛用语言分类方法

语言按语法分类：

* 非形式语言
    * 中文、英文
* 形式语言（乔姆斯基谱系）
    * 0型 无限制文法
        * ?::=?
    * 1型 上下文相关文法
        * ?<A>?::=?<B>?
    * 2型 上下文无关文法
        * <A> ::= ?
    * 3型 正则文法
        * <A>::=<A>?
        * <A>::=?<A> ×
    （上下包含，上包括下）

js大多是正则文法，特例：
* `**` `2**1**2`右结合，所以是2
总结——js是上下文相关文法（一个特例，就会变成更泛的类型）

### 现代语言的特例

* C++中，*可能表示乘号或指针，具体是哪个，取决于星号前面的标识符是否被声明为类型
* VB中，<可能是小于号，可能是xml直接量的开始，取决于当前位置是否可以接受xml直接量
* python中，行首的tab和空格会根据上一行的行首空白以一定规则被处理成虚拟终结符indent或者dedent
* javascript中，/可能是除号，也可能是正则表达式开头，处理方式类似于VB，字符串模板中也需要特殊处理}，还有自动插入分号规则

### 形式语言的分类

* 形式语言——用途
    * 数据描述语言（json,html,xaml,sql,css）
    * 编程语言(c,c++,java,c#,python,ruby,golang,js........)
* 形式语言——表达方式
    * 声明式语言（json,html,xaml,sql,css,lisp,closure,haskell）
    * 命令型语言(c,c++,java,c#,python,ruby,perl,js)

### 什么是产生式

产生式（BNF）：

* 用尖括号括起来的名称来表示语法结构名
* 语法结构分成基础结构和需要用其他语法结构定义的复合结构
    * 基础结构称终结符
    * 复合结构称非终结符
* 引号和中间的字符表示终结符
* 可以有括号
* `*`表示重复多次
* `|`表示或
* `+`表示至少一次

举例：

四则运算：
* 1 + 2 * 3
终结符：
* Number
* + - * /
非终结符：
* MultiplicativeExpression
* AddictiveExpression

### 编程语言的性质

* 图灵完备性
    * 命令式——图灵机
        * goto
        * if和while
    * 声明式——lambda
        * 递归
* 动态与静态
    * 动态
        * 在用户的设备/在线的服务器上
        * 产品实际进行时
        * Runtime
    * 静态
        * 在程序员的设备上
        * 产品开发时
        * Compiletime
* 类型系统
    * 动态类型系统与静态类型系统
    * 强类型与弱类型
        * String + Number
        * String == Boolean
    * 复合类型
        * 结构体
        * 函数签名
    * 子类型
    * 泛型
        * 逆变/协变

### 一般命令式编程语言的设计方式

* Atom
    * Identifier
    * Literal
* Expression
    * Atom
    * Operator
    * Punctuator
* Statement
    * Expression
    * Keyword
    * Punctuator
* Structure
    * Function
    * Class
    * Process
    * Namespace
    * ……
* Program
    * Program
    * Module
    * Package
    * Library

[ 语法 ] **—语义—>** [ **运行时** ]

JS对应到：

* Atom
    * Grammer
        * Literal
        * Variable
        * Keywords
        * Whitespace
        * Line Terminator
    * Runtime
        * Types
        * Execution Context

## JS类型

* Number
* String
* Boolean
* Object
* Null
* Undefined
* Symbol

### Number

* IEEE 754 Double Float
    * Sign (1)
    * Exponent (11)
    * Fraction (52)

#### Grammer

* DEcimalLiteral
    * 0
    * 0.
    * .2
    * 1e3
* BinaryIntegerLiteral
    * 0b111
* OctalIntegerLiteral
    * 0o10
* HexIntegerLiteral
    * 0xFF

`0.`是合法的十进制语法，所以后接方法会出错

`0.toString();` ×
`0 .toString();` 才会吐出数字

### String

* Character
* Code Point
* Encoding
    * ASCII
    * Unicode
    * UCS
    * GB
        * GB2312
        * GBK(GB13000)
        * GB18030
    * ISO-8859
    * BIG5

小练习：一个string代表的字节转换出来
```js
function UTF8_Encoding(String) {
    //return new Buffer();
}
```

### Object

更贴近人类的自然思维

* state
* identifier
* behaviour

继承于它的分类Class

对象的行为应该是改变他状态的。

属性：
* Data Property（defineProperty修改）
    * [[value]]
    * writable
    * enumerable
    * configurable
* Accessor Property
    * get
    * set
    * enumerable
    * configurable

#### API

* {} . [] Object.defineProperty
* Object.create / Object.setPrototypeOf /
    Object.getPrototypeOf
* new / class / extends
* new / function / prototype（Outdated，尽量不要用）

#### Function

* 带call方法的对象

#### Host Object

……


### Symbol

主要用于Object的键（Key）

### 其它类型

#### Boolean

* true
* false

#### Null & Undefined

* null
* undefined（变量）
* void 0;（产生undefined的安全方法）