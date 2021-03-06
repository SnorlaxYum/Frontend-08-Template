# 学习笔记

## CSS排版

### 盒

HTML代码中可以书写开始标签，结束标签，和自封闭标签。

一对起止标签，表示一个元素。

DOM树中存储的是元素和其它类型的节点（Node）。

CSS选择器选中的是元素（或伪元素）。

CSS选择器选中的元素，在排版时可能产生多个**盒**。

排版和渲染的基本单位是**盒**。

![盒模型](2021-03-21-172005_1920x1080_scrot.png)

### 正常流

排版（layout）三代技术：

1. 第一代，正常流
2. 基于flex的排版（目前主流）
3. 基于grid的排版
4. 3.5代，CSS Houdini带来的完全自由的、可以拿js来干预的排版，可能是一个更后面，但是现在这个还不太明显

flex最简单最容易理解，正常流能力最差但是最复杂

正常流排版：

* 收集**盒**进行
* 计算盒在行中的派布
* 计算行的排布

![](2021-03-21-191858_1920x1080_scrot.png)

### 正常流的行级排布

Baseline
![](2021-03-21-204403_1920x1080_scrot.png)

Text
![](2021-03-21-204703_1920x1080_scrot.png)

![](2021-03-21-211305_1920x1080_scrot.png)

行内盒基线对齐会随着里面的文字变化，用vertical-align设置对应值调整top、middle、bottom、text-bottom、text-top
![](2021-03-21-211742_1920x1080_scrot.png)

### 正常流的块级排布

正常流两个复杂的机制：float与clear……

margin堆叠，margin collapse，堆叠高度与最高margin相等，只会发生在BFC里，不会发生在IFC或是flex中
![](2021-03-21-214343_1920x1080_scrot.png)

### BFC合并

BFC（Block Formatting Context），块级格式化上下文

* block box && overflow: visible
    * BFC合并与float
    * BFC合并与边距折叠

#### Block

* BLock Container：里面有BFC的
    * 能容纳正常流的盒，里面就有BFC，想想有哪些？
* Block-level Box：外面有BFC的
* Block Box = BLock Container + Block-level Box：里外都有BFC的

### Block Container

* block
* inline-block
* table-cell
* flex item
* grid cell
* table-caption

#### Block-level Box

![](2021-03-23-215119_1920x1080_scrot.png)

`display: run-in`跟着自己上一个元素来

#### 设立BFC

* floats
* absolutely positioned elements
* block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes,
    * flex items
    * grid cell
    * ......
* and block boxes with `overflow` other than `visible`

换种方式更好记，能容纳正常流的盒，我们都认为它会创建BFC，但是只有一种情况例外（block box && overflow: visible）

### Flex排版

* 收集盒进行
* 计算盒在主轴方向的排布
* 计算盒在交叉轴方向的排布

#### 分行

* 根据主轴尺寸，把元素分进行
* 如果设置了no-wrap，则强行分配进第一行

#### 计算主轴方向

* 找出所有flex元素
* 把主轴方向的剩余尺寸按比例分配给这些元素
* 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

#### 计算交叉轴方向

* 根据每一行中最大元素尺寸计算行高
* 根据行高flex-align和item-align，确定元素具体位置

## CSS动画与绘制

### 动画

* @keyframs定义
* animation：使用

#### animation

```css
@keyframes mykf
{
    from {background: red;}
    to {background: yellow;}
}

div
{
    animation: mykf 5s infinite;
}
```

* animation-name 时间曲线
* animation-duration 动画的时长
* animation-timing-function 动画的时间曲线
* animation-delay 动画开始前的延迟
* animation-ieration-count 动画的播放次数
* animation-direction 动画的方向

#### transition

```css
@keyframes mykf {
    0% {top: 0; transition: top ease}
    50% {top: 30px; transition: top ease-in}
    75% {top: 10px; transition: top ease-out}
    100% {top: 0; transition: top linear}
}
```

* transition使用
    * transition-property 要变换的属性
    * transition-duration 变换的时长
    * transition-timing-function 时间曲线
    * transition-delay 延迟

cubic-bezier.com

### 颜色

![](2021-03-28-204442_2560x1440_scrot.png)

视锥细胞只有三种，分别能感应红绿蓝三原色的光（RGB三原色的来历）；自然界的所有颜色给眼睛的刺激只有红绿蓝

编程适用的颜色谱系
![](2021-03-28-205228_2560x1440_scrot.png)

H（Hue）-色相（6种颜色之间，把6种颜色拼成了一个色盘）
S-纯度（颜色杂色的数量，S越高，颜色越鲜艳越漂亮）
L-亮度
V-色值（明度，Brightness）

### 绘制

* 几何图形
    * border
    * box-shadow
    * border-radius
* 文字
    * font
    * text-decoration
* 位图
    * background-image

不推荐用这些做一些黑魔法，尽量保留原生的意义

* data uri + svg
* data:image/svg+xml,<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><ellipse cx="300" cy="150" rx="200" ry="80" style="fill:rgb(200,100,50);stroke:rgb(0,0,100); stroke-width:2"/></svg>