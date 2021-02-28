# 浏览器工作原理

## HTML解析

### HTML parse模块的文件拆分

* 为了方便文件管理，把parser拆到文件里
* parser接受html文本作为参数，返回一颗dom树

### 用FSM实现HTML的分析

[whatwg中tokenization（html词法，描述完全是状态机，每个state下有各个情况的处理方式，比如跳到别的状态）](https://html.spec.whatwg.org/multipage/parsing.html#tokenization)

* 我们用FSM来实现HTML的分析
* 在HTML标准中，已经规定了HTML的状态
* Toy-Browser只挑选其中一部分状态，完成一个最简版本

### 解析标签

* 主要的标签有：开始标签，结束标签和自封闭标签
* 在这一步暂时忽略属性

### 创建元素

* 在状态机中，除了状态迁移，我们还会要加入业务逻辑
* 我们在标签结束状态提交标签token