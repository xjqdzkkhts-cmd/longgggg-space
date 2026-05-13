---
title: 基于图片颜色的卡片渐变模糊效果
date: 2026.05
datetime: 2026-05
category: Design Notes
---

## 什么是图片颜色渐变模糊效果
主要分为四步骤
1. 从图片中提取主色
2. 使用这些颜色生成背景渐变
3. 对背景进行大范围模糊
4. 将内容卡片叠加在其下

最终效果通常会呈现出一种柔和且具有氛围感的背景。

# 实现方法
常用工具：
- Color Thief
- Vibrant.js
- fast-average-color
这些库可以自动分析图片主色。

```JS
const color = colorThief.getColor(img)
```
然后动态生成：

```CSS
background: radial-gradient(...)
```

# 简短的结构示例

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
