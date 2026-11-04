---
title: Card Gradient Blur Based on Image Colors
date: 2026.04
datetime: 2026-04
category: Frontend
---

## What Is an Image-Based Gradient Blur?

The effect has four main steps:

- Extract the dominant colors from an image.
- Use those colors to generate a background gradient.
- Apply a large blur to the background.
- Layer the content card over it.

The result usually feels soft and atmospheric.

## Implementation

Common tools include:

- Color Thief
- Vibrant.js
- fast-average-color

These libraries can automatically identify the dominant colors in an image.

```JS
const color = colorThief.getColor(img)
```

Then generate the background dynamically:

```CSS
background: radial-gradient(...)
```

## A Simple Structure

```HTML
<div class="bg"></div>
<div class="card"></div>
```

```CSS
.bg{
  position:absolute;
  inset:0;
  background:
    radial-gradient(circle,#ff6b6b,transparent),
    radial-gradient(circle,#4d96ff,transparent);

  filter:blur(120px);
  opacity:.6;
}

.card{
  position:relative;
  backdrop-filter:blur(20px);
}
```
