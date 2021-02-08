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

