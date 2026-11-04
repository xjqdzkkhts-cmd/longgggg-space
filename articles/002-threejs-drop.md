---
title: Creating Falling and Stacking UI Elements with Matter.js
date: 2026.03
datetime: 2026-03
category: Frontend
---

In web design, we sometimes want UI elements to feel more natural and dynamic than a static arrangement. For example, a group of tags can fall from above like physical objects, collide at the bottom of a container, and settle into a pile.

## 1. How It Works

The core idea is to let Matter.js calculate each element's position, rotation, and collisions behind the scenes, then synchronize those values with real DOM elements.

The process has four steps:

- Create a physics world and set its gravity.
- Represent each UI tag as a rigid body, such as a rectangle, circle, or capsule.
- Add invisible walls around the container to keep the tags inside it.
- On every frame, read each body's position and rotation from Matter.js and update the corresponding DOM element's `transform`.

The visitor sees real web elements falling and stacking naturally, while a **2D physics simulation** runs behind the scenes.

## 2. Basic Page Structure

To build a container of falling skill tags, start with ordinary HTML elements:

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

These tags are still ordinary DOM elements. Matter.js calculates where they should be, how much they should rotate, and how they collide with one another.

## 3. Styling the Container and Tags

CSS can handle the entire visual appearance.

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

There are a few key details here:

- `position: absolute` is necessary because we will use `transform` to control each tag's position precisely.
- `overflow: hidden` keeps the tags inside the rounded container.
- `will-change: transform` tells the browser to prepare for transform changes, helping reduce stutter.

## 4. Creating the Matter.js Physics World

After installing Matter.js, create a basic physics engine:

```JS
import Matter from "matter-js";
const { Engine, World, Bodies, Body, Runner } = Matter;
const engine = Engine.create();
const world = engine.world;
engine.gravity.y = 1;
```

`Engine.create()` creates the physics engine. The `world` contains all the physical bodies. Setting `engine.gravity.y = 1` enables downward gravity. For a slower fall, try a smaller value such as `0.6`; for a faster fall, use `1.2` or higher.

## 5. Adding Invisible Walls

To keep the tags stacked inside the container, add boundaries at the bottom, left, and right. These walls do not need to be visible; they only need to exist in the physics world.

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

Here, `isStatic: true` means the walls stay in place when other bodies collide with them. The bottom wall sits slightly below the container's lower edge, while the side walls sit just outside its left and right edges. This keeps the falling tags inside so they can stack naturally.

## 6. Turning UI Tags into Rigid Bodies

Next, create a Matter.js rigid body for each DOM tag.

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

`restitution` controls bounciness. Higher values make the tags bounce more. For UI tags, avoid setting it too high or the effect may feel too much like a toy. Values between `0.2` and `0.4` tend to feel more natural.

`friction` controls friction between bodies. Higher values help the tags form a stable pile rather than sliding around continuously.

`frictionAir` controls air resistance. Increasing it slightly can soften the motion and help the tags settle sooner.

`Body.rotate()` gives each tag an initial angle so the pile looks more natural and less neatly aligned.

## 7. Synchronizing Physics with the DOM

Matter.js calculates the physics but does not automatically move DOM elements. We need to synchronize them on every frame:

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

Matter.js uses the center of a body as its position, whereas a DOM element's `translate` offset starts from its top-left corner. Subtracting half the element's width and height keeps the visible tag aligned with its physical body.

## 8. Making the Effect Match the UI

Rectangular bodies are enough for a basic effect. However, rounded capsule tags may collide a little unnaturally because their visual shape is rounded while their physical body is rectangular.

There are three practical approaches:

- Keep rectangular bodies and use CSS for rounded corners. This is the simplest option and offers the best performance.
- Build a capsule from several bodies: a rectangle in the middle and a circle at each end. This produces collisions closer to the visible pill shape.
- Use Matter.js as an approximate physics layer while keeping the visual design polished. In most UI projects, visitors care more about natural motion than perfectly accurate collision edges.

## 9. Performance Considerations

Matter.js is lightweight, but a continuously running simulation still consumes resources. On a personal website, visitors may only glance at this section, so it does not need to keep calculating indefinitely.

You can use a timer to stop the simulation after a few seconds:

```JS
setTimeout(() => {
  Runner.stop(runner);
}, 3000);
```
