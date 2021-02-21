# 学习笔记

JavaScript

* Atom
* Expression
* Statement
* Structure
* Program/Module

## JS表达式

### 运算符和表达式

运算优先级由高到底

* Member
    * a.b
    * a[b]
    * foo`string`
    * super.b
    * super[ `b` ]
    * new.target
    * new Foo()
* New
    * new Foo

* Reference（是运行时中的一种类型）
    * Object
    * Key
    * delete
    * assign (=, +=……)

* Expressions
    * Call
        *foo()
        *super()
        *foo()['b']
        *foo().b
        *foo()`abc`

    * Left Handside & Right Handside

    * Update
        * a + +
        * a --
        * --a
        * + + a
        （不用死记， 不合法）

    * Unary
        * delete a.b
        * void fooo()
        * typeof a
        * + a
        * - a
        * ~ a
        * ! a
        * await a

    * Exponental
        * ** (js唯一一个右结合的运算符)

    * Multiplicative
        * * /
    * Additive
        * + -
    * SHift
        * << >> >>>
    * Relationship
        * < > <= >= instanceof in
    * Equalty
        * ==
        * !=
        * ===
        * !==
    * Bitwise
        * & ^ |
    * Logical（短路原则，前面xx就不运行后面）
        * &&
        * ||
    * Conditional（一样短路逻辑）
        * ? :

### 类型转换

* a + b
* "false" == false（全转为数字处理，历史包袱，反直觉，尽量不要用）
* a[o] = 1

#### Unboxing（拆箱）

* ToPremitive
* toString vs valueOf
* Symbol.toPrimitive

#### BOxing

Number, String, Boolean, Symbol
new Number(1), new String('a'), new Boolean(true), new Object(Symbol('a'))

## JS语句(Statement)

* Grammer
    * 简单语句
    * 组合语句
    * 声明
* Runtime
    * Completion Record
    * Lexical Environment

### 运行时相关概念

#### Completion Record

* [[type]]: normal, break, continue, return, or throw
* [[value]]: 基本类型
* [[target]]: label

### 简单语句和复合语句

简单语句：

* ExpressionStatement
* EmptyStatement
* DebuggerStatement
* ThrowStatement
* ContinueStatement
* BreakSTatement
* ReturnStatement

复合语句：
* BlockStatement
    * [[type]]: normal
    * [[value]]: --
    * [[target]]: --
* IfStatement
* SwitchSTatement（尽量用if替代）
* IterationStatement
    * while() {}
    * do {} while()
    * for( ; ;)
    * for( in )
    * for( of)
    * for await( of )
* WithStatement（尽量不要用）
* LabelledStatement
* TryStatement
    * [[type]]: return
    * [[value]]: --
    * [[target]]: label

### 声明

* FunctionDeclaration
    * function
* GeneratorDecalration
    * function *
* AsyncFunctionDeclaration
    * async function
* AsyncGeneratorDecalration
    * async function *
* VariableStatement
    * var
* ClassDeclaration
    * class
* LexicalDeclaration
    * const
    * let

#### 预处理

```
var a = 2
void function () {
    a = 1
    return
    var a
}()

console.log(a)
```

```
var a = 2
void function () {
    a = 1
    return
    const a
}()

console.log(a)
```

结果都是2。
不管变量声明到函数哪个位置，都会让它变成局部变量
所有声明都有预处理机制，把变量变成局部变量

#### 作用域

```
var a = 2
void function() {
    a = 1
    {
        var a
    }
}()
console.log(a)
```

```
var a = 2
void function() {
    a = 1
    {
        const a
    }
}()
console.log(a)
```

## JS结构化

### 宏任务和微任务

* 宏任务
* 微任务（Promise）
* 函数调用（Execution Context）
* 语句/声明（Completion Record）
* 表达式（Reference）
* 直接量/变量/this……

事件循环(Event Loop)：get code -> execute -> wait -> get code……

### JS函数调用

从js文件import变量时，变量如果是函数，执行环境则是被调用的js文件

这种栈式访问——Execution Context Stack

Execution Context

* LexicalEnvironment
    * this
    * new.target
    * super
    * 变量
* VariableEnvironment
    历史包袱，仅仅处理var声明
* Environment Record
* Function - CLosure
    每个函数都会生成一个闭包

* REalm
    js中产生对象要有原型，REalm用来记录这些原型