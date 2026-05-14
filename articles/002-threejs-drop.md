---
title: 使用 Matter.js 来实现 UI 元素掉落堆积效果
date: 2026.03
datetime: 2026-03
category: 前端
---
在网页设计中，我们有时会希望 UI 元素不只是静态排列，而是以更自然、更有动态感的方式出现。例如，让一组标签像真实物体一样从上方掉落，在容器底部发生碰撞并自然堆积。

## **一、实现原理**

这种效果的核心是让 Matter.js 在背后计算每个元素的位置、角度和碰撞状态。然后，我们再把这些物理计算结果同步到真实的 DOM 元素上。

简单来说，整个过程可以分为四步：
- 第一步，创建一个物理世界，并设置重力。
- 第二步，把每个 UI 标签转换成一个物理刚体，例如矩形、圆形或胶囊形状。
- 第三步，在容器四周创建不可见的墙体，防止标签掉出容器。
- 第四步，在每一帧中读取 Matter.js 计算出的物体位置和旋转角度，并更新对应 DOM 元素的 `transform`。
这样，用户看到的是一组真实的网页元素在自然下落和堆积；而背后实际运行的是一个 **2D 物理模拟**系统。

## 二、基础页面结构
假设我们要实现一个技能标签堆积区域，可以先写一组普通的 HTML 标签：

```HTML
<div class="tag-physics-card">
  <div class="tag green">001</div>
  <div class="tag purple">002</div>
  <div class="tag dark">003</div>
  <div class="tag purple">004</div>
  <div class="tag green">005</div>
  <div class="tag dark">006</div>
  <div class="tag dark">007</div>
  <div class="tag purple">008</div>
</div>
```

这些标签本质上仍然是普通 DOM 元素。Matter.js 负责计算它们应该出现在什么位置、旋转多少角度，以及彼此如何碰撞。
## 三、设置容器和标签样式
视觉层面可以完全交给 CSS。

```CSS
.tag-physics-card {
  position: relative;
  width: 540px;
  height: 460px;
  border-radius: 36px;
  background: #f4f4f5;
  overflow: hidden;
}

.tag {
  position: absolute;
  padding: 10px 24px;
  border-radius: 999px;
  font-size: 28px;
  line-height: 1;
  white-space: nowrap;
  user-select: none;
  will-change: transform;
}

.tag.green {
  background: #ccff44;
  color: #333;
}

.tag.purple {
  background: #cec3ff;
  color: #333;
}

.tag.dark {
  background: #3a3a3a;
  color: #fff;
}

```
这里有几个关键点。
`position: absolute` 是必要的，因为后续我们会用 `transform` 精确控制每个标签的位置。
`overflow: hidden` 可以确保标签不会跑出圆角容器。
`will-change: transform` 可以提醒浏览器提前优化动画性能，减少卡顿。

## 四、创建 Matter.js 物理世界
安装 Matter.js 后，可以先创建一个基础物理引擎：

```JS
import Matter from "matter-js";
const { Engine, World, Bodies, Body, Runner } = Matter;
const engine = Engine.create();
const world = engine.world;
engine.gravity.y = 1;
```
`Engine.create()` 用来创建物理引擎。
`world` 是所有物理物体存在的空间。
`engine.gravity.y = 1` 表示开启向下的重力。如果想让下落更慢，可以把数值调小，例如 `0.6`；如果想让标签掉落得更快，可以调到 `1.2` 或更高。

## 五、为容器添加不可见墙体
为了让标签在容器内部堆积，需要给容器添加底部、左侧和右侧边界。这些边界不需要显示出来，只需要在物理世界中存在。

```JS
const container = document.querySelector(".tag-physics-card");
const width = container.clientWidth;
const height = container.clientHeight;

const walls = [
  Bodies.rectangle(width / 2, height + 10, width, 20, {
    isStatic: true,
  }),
  Bodies.rectangle(-10, height / 2, 20, height, {
    isStatic: true,
  }),
  Bodies.rectangle(width + 10, height / 2, 20, height, {
    isStatic: true,
  }),
];

World.add(world, walls);
```

这里的 `isStatic: true` 表示这些物体是静止的，不会被其他物体撞开。
底部墙体放在容器下边缘稍微靠下的位置，左右墙体分别放在容器左右两侧。这样标签下落后会被挡住，并自然堆积在容器底部。
## 六、把 UI 标签转换成物理刚体
接下来，需要为每一个 DOM 标签创建对应的 Matter.js 刚体。

```JS
const tags = document.querySelectorAll(".tag");

tags.forEach((el) => {
  const rect = el.getBoundingClientRect();

  const body = Bodies.rectangle(
    Math.random() * width,
    Math.random() * 80,
    rect.width,
    rect.height,
    {
      restitution: 0.25,
      friction: 0.8,
      frictionAir: 0.02,
    }
  );

  Body.rotate(body, (Math.random() - 0.5) * 1.2);

  el.body = body;
  World.add(world, body);
});

```
`restitution` 控制弹性。数值越高，标签越容易弹起来。对于 UI 标签来说，一般不建议太高，否则会显得过于玩具化。`0.2` 到 `0.4` 会比较自然。
`friction` 控制物体之间的摩擦力。数值高一点，标签更容易稳定堆住，不会一直滑动。
`frictionAir` 控制空气阻力。适当增加这个值，可以让运动更柔和，避免标签长时间晃动。
`Body.rotate()` 用来给每个标签一个初始旋转角度，这样堆积结果会更自然，不会显得过于整齐。

## 七、同步物理位置到 DOM
Matter.js 只负责物理计算，不会自动改变 DOM 元素的位置。因此我们需要在每一帧中手动同步：

```JS
function update() {
  tags.forEach((el) => {
    const body = el.body;

    el.style.transform = `
      translate(
        ${body.position.x - el.offsetWidth / 2}px,
        ${body.position.y - el.offsetHeight / 2}px
      )
      rotate(${body.angle}rad)
    `;
  });

  requestAnimationFrame(update);
}

const runner = Runner.create();
Runner.run(runner, engine);

update();
```

Matter.js 中的物体坐标默认表示物体中心点，而 DOM 元素的 `translate` 默认是从左上角开始定位。所以这里需要减去元素宽高的一半，让视觉位置和物理位置保持一致。

## 八、如何让效果更接近真实 UI
如果只是做基础效果，矩形碰撞体已经足够。但如果标签是圆角胶囊形状，矩形碰撞体会有一点不真实，因为视觉上是圆角，物理上却是直角。
实际项目中可以采用三种方案:
- 第一种是继续使用矩形碰撞体，视觉上用 CSS 圆角处理。这是最简单、性能也最好的方案。
- 第二种是用多个物理体组合成胶囊形状。例如中间是一个矩形，两端各有一个圆形，这样碰撞效果更接近真实 pill 标签。
- 第三种是只把 Matter.js 当作近似物理层，视觉层继续保持精致。对于大多数网页 UI 来说，用户更关注整体动效是否自然，不会过度关注碰撞边缘是否完全精确。

## 九、性能优化建议
Matter.js 虽然轻量，但如果一直运行物理模拟，仍然会消耗性能。尤其是在个人网站中，用户可能只是快速浏览页面，没有必要让这个模块一直计算。
可以通过设置一个计时器，在动画运行几秒后停止更新：

```JS
setTimeout(() => {
  Runner.stop(runner);
}, 3000);
```
