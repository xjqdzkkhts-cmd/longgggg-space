const ARTICLE_SOURCES = {
  '001': './articles/001-card-blur.md',
  '002': './articles/002-threejs-drop.md',
  '003': './articles/003-vibe-coding-animation.md',
  '004': './articles/004-parallax-card.md',
};

const isLocalArticlePreview = () =>
  window.location.protocol === 'file:' ||
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === '0.0.0.0' ||
  window.location.hostname === '::1' ||
  window.location.hostname === '[::1]' ||
  window.location.pathname.includes('/Users/');

const redirectLocalArticleBackHome = (event) => {
  if (isLocalArticlePreview() && event.state?.articleHomeFallback) {
    window.location.replace('./index.html');
  }
};

const normalizeLocalArticleHistory = () => {
  if (!isLocalArticlePreview() || !window.history?.replaceState || !window.history?.pushState) {
    return;
  }

  window.addEventListener('popstate', redirectLocalArticleBackHome);

  if (window.history.state?.articleHistoryNormalized) {
    return;
  }

  try {
    const currentArticleUrl = `./article.html${window.location.search}${window.location.hash}`;
    window.history.replaceState({ articleHomeFallback: true }, '', './index.html');
    window.history.pushState({ articleHistoryNormalized: true }, '', currentArticleUrl);
  } catch (_error) {
    // Some local preview environments restrict history rewrites.
  }
};

normalizeLocalArticleHistory();

document.querySelector('.article-back-link')?.addEventListener('click', (event) => {
  if (!isLocalArticlePreview()) {
    return;
  }

  event.preventDefault();
  window.location.href = './index.html';
});

const ARTICLE_FALLBACKS = {
  '001': {
    meta: {
      title: '如何实现卡片 UI 的渐变模糊效果',
      date: '2026.05',
      datetime: '2026-05',
      category: 'Design Notes',
    },
    body: `
卡片 UI 里的渐变模糊，本质上不是为了“做一个很炫的效果”，而是为了让信息层级更清楚。图片、文字、标签同时出现在一张卡片里时，如果只是直接叠放，文字很容易被背景干扰。渐变模糊可以把复杂背景慢慢压低，让内容自然浮出来。

## 先确定模糊服务于什么

我通常会先判断这张卡片最重要的信息是什么。比如作品卡片里，图片负责建立第一印象，标题和标签负责帮助用户快速判断项目类型。渐变模糊应该服务于后者，而不是盖住前者。所以模糊区域一般只放在文字附近，从底部或边缘逐渐出现。

## 用多层叠加，而不是一层大模糊

比较稳定的做法是把卡片拆成三层：底层是图片，中间是渐变遮罩，上层是文字内容。遮罩层可以由几段不同强度的 blur 组成，从轻到重逐层过渡。这样视觉会更柔和，不会出现一块突然变糊的生硬边界。

## 颜色要从图片里来

如果遮罩只是固定黑色或白色，很多卡片会显得很模板化。更好的方式是根据图片主色动态生成一层轻微的 tint，让模糊区域和图片本身有关系。比如蓝色项目图可以带一点冷色遮罩，绿色项目图可以带一点低饱和绿色。这样每张卡片都有自己的气质，但整体仍然统一。

## 控制文字可读性

渐变模糊最终还是要回到可读性。标题区域需要足够的对比度，标签不能被图片细节淹没。如果图片本身很亮，就需要更强的暗色遮罩；如果图片偏暗，可以减少遮罩强度，避免卡片变脏。实现时可以给卡片设置一个 contrast boost，根据图片亮度微调遮罩透明度。

## 实现思路

在前端里，可以用绝对定位把 overlay 放在图片上方，再用多个 span 或伪元素分别设置不同的 \`backdrop-filter: blur()\`。每一层用 mask 或 linear-gradient 控制作用范围，让模糊从下往上逐渐减弱。文字内容放在最上层，并保持独立的 padding 和 z-index。

## 需要注意的细节

第一，模糊不要铺满整张图，否则图片会失去展示价值。第二，模糊层不要太重，否则卡片会显得灰。第三，圆角、裁切和 hover 状态要一起处理，尤其是图片容器需要 \`overflow: hidden\` 或 \`clip-path\`，否则模糊层可能溢出圆角。

## 总结

好的渐变模糊不是单纯的视觉装饰，而是一种信息组织方式。它让图片保持情绪，让文字保持清晰，也让卡片在统一的系统里保留差异。实现时重点不是把 blur 调大，而是控制它出现的位置、范围、颜色和层级。
`,
  },
  '002': {
    meta: {
      title: '使用 Three.js 来实现 UI 元素掉落堆积效果',
      date: '2026.05',
      datetime: '2026-05',
      category: 'Process',
    },
    body: `
这是一篇关于 UI 元素掉落堆积效果的占位文章。之后可以记录从视觉想法、空间参数、碰撞边界到最终交互状态的完整过程。

## 从问题开始

先确认动画要表达什么，再决定技术方案。掉落堆积不是为了炫技，而是为了让“学习经历”这类抽象信息变得更有身体感和记忆点。
`,
  },
  '003': {
    meta: {
      title: '更高效通过 Vibe Coding 来实现动画效果',
      date: '2026.05',
      datetime: '2026-05',
      category: 'Fragments',
    },
    body: `
这是一篇关于日常观察的占位文章。生活中的细节经常会变成界面、动效或者产品概念的起点。

## 观察的价值

好的体验通常不是凭空出现的，它往往来自对真实场景的耐心观察，以及对小问题的持续追问。
`,
  },
  '004': {
    meta: {
      title: '视差卡片效果如何实现',
      date: '2026.05',
      datetime: '2026-05',
      category: 'Portfolio',
    },
    body: `
这是一篇关于作品集和个人表达的占位文章。知识库可以作为项目之外的第二条线索，展示思考方式和长期积累。

## 作品之外

项目展示结果，文章展示过程。两者放在一起，会让访问者更容易理解我如何学习、判断和创造。
`,
  },
};
const ARTICLE_TRANSLATIONS = {
  en: {
    '001': {
      meta: {
        title: 'Card Gradient Blur Based on Image Colors',
        date: '2026.04',
        datetime: '2026-04',
        category: 'Frontend',
      },
      body: `
## What Is an Image-Based Gradient Blur?

An image-based gradient blur usually has four steps:
- Extract the dominant color from an image.
- Use the color to generate a soft background gradient.
- Apply a large blur to the gradient layer.
- Place the actual content card above it.

The result is a softer and more atmospheric background while the card content remains readable.

## Implementation Method

Common tools include Color Thief, Vibrant.js, and fast-average-color. These libraries can automatically analyze an image and return representative colors.

\`\`\`JS
const color = colorThief.getColor(img)
\`\`\`

Then the interface can generate a dynamic gradient:

\`\`\`CSS
background: radial-gradient(...)
\`\`\`

## A Simple Structure

\`\`\`HTML
<div class="bg"></div>
<div class="card"></div>
\`\`\`

\`\`\`CSS
.bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle, #ff6b6b, transparent),
    radial-gradient(circle, #4d96ff, transparent);
  filter: blur(120px);
  opacity: .6;
}

.card {
  position: relative;
  backdrop-filter: blur(20px);
}
\`\`\`
`,
    },
    '002': {
      meta: {
        title: 'Using Matter.js to Create Falling and Stacking UI Elements',
        date: '2026.03',
        datetime: '2026-03',
        category: 'Frontend',
      },
      body: `
Sometimes UI elements should not simply sit in a static layout. A group of tags can fall from the top, collide with each other, and naturally stack at the bottom of a container.

## Core Principle

The core idea is to let Matter.js calculate position, rotation, gravity, and collision behind the scenes, then synchronize those physical values back to real DOM elements.

The process can be split into four steps:
- Create a physics world and set gravity.
- Convert each UI tag into a rigid body.
- Add invisible walls around the container.
- Read the calculated position and angle on every frame, then update the matching DOM element with \`transform\`.

This creates the feeling that real webpage elements are falling and stacking naturally, while the actual motion is driven by a 2D physics simulation.

## Basic HTML Structure

\`\`\`HTML
<div class="tag-physics-card">
  <div class="tag green">001</div>
  <div class="tag purple">002</div>
  <div class="tag dark">003</div>
</div>
\`\`\`

## Styling the Container and Tags

\`\`\`CSS
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
\`\`\`

\`position: absolute\` is necessary because each element will be controlled precisely with transforms. \`overflow: hidden\` keeps the objects inside the rounded container, and \`will-change: transform\` helps the browser optimize animation performance.
`,
    },
    '003': {
      meta: {
        title: 'Using Vibe Coding to Build Animations More Efficiently',
        date: '2026.05',
        datetime: '2026-05',
        category: 'Vibe Coding',
      },
      body: `
Vibe coding can greatly reduce the time needed to build web interactions. For designers who are not fully comfortable with frontend engineering, a more efficient method is to start from a close open-source example, then let AI explain, adapt, and refine it.

## Clarify the Type of Animation First

Before coding, define the animation category. Web motion usually falls into a few groups: entrance animations, hover micro-interactions, scroll-triggered animations, looping ambient animations, and direct interactive animations such as dragging, expanding, stacking, or physics-based falling.

## Teach the AI Before Asking It to Build

Many weak vibe coding results come from vague prompts, such as “make a premium animation.” A better approach is to provide a close reference and say: “I want a similar motion, but with lighter blue colors, slower speed, my own assets, and responsive behavior.”

The clearer the reference and constraints are, the easier it is for AI to produce useful code.

## Useful Inspiration Sources

- CodePen is one of the best places to find complete animation examples with HTML, CSS, and JavaScript.
- Animista is useful for adjustable CSS animations.
- Hover.css is good for button, link, and card hover interactions.
- FreeFrontend collects many categorized CSS animation and UI examples.
- GSAP official CodePens and showcases are better for advanced motion.
`,
    },
    '004': {
      meta: {
        title: 'How to Build a Parallax Card Effect',
        date: '2026.05',
        datetime: '2026-05',
        category: 'Portfolio',
      },
      body: `
A parallax card effect gives a flat interface a subtle sense of depth. The key is to calculate movement based on pointer position, then let different layers move at different speeds.

## Beyond the Final Visual

Projects show outcomes, while articles show process. Recording how an effect is built helps visitors understand the design judgment behind the final result, not just the final screen.

## Implementation Idea

The card can track the pointer position relative to its center, convert that value into small rotation and translation offsets, and apply different multipliers to foreground and background layers.

The result should be subtle enough to feel responsive without distracting from the content.
`,
    },
  },
};

const SITE_LANGUAGE_STORAGE_KEY = 'long-portfolio-language';
const getArticleLanguage = () => {
  try {
    return window.localStorage?.getItem(SITE_LANGUAGE_STORAGE_KEY) === 'en' ? 'en' : 'zh';
  } catch (_error) {
    return 'zh';
  }
};
const getLocalizedArticlePayload = (articleId, payload) => ARTICLE_TRANSLATIONS[getArticleLanguage()]?.[articleId] || payload;

const articleTitle = document.querySelector('[data-article-title]');
const articleDate = document.querySelector('[data-article-date]');
const articleCategory = document.querySelector('[data-article-category]');
const articleContent = document.querySelector('[data-article-content]');
const articlePageIndicator = document.querySelector('[data-page-indicator]');
const articleFloatingDock = document.querySelector('.article-floating-dock');
const articleLanguage = getArticleLanguage();
const articleCopy = {
  zh: {
    loading: '正在加载文章...',
    unavailable: '文章暂时不可用',
    missing: '没有找到这篇文章。你可以返回个人知识库重新选择。',
    untitled: '未命名文章',
    knowledge: '个人知识库',
    back: '返回',
    titleSuffix: '龙湘玉 Portfolio',
  },
  en: {
    loading: 'Loading article...',
    unavailable: 'Article unavailable',
    missing: 'This article was not found. You can return to Knowledge and choose again.',
    untitled: 'Untitled article',
    knowledge: 'Knowledge',
    back: 'Back',
    titleSuffix: 'Long Xiangyu Portfolio',
  },
};
const getArticleCopy = (key) => articleCopy[articleLanguage]?.[key] || articleCopy.zh[key] || '';
let articleCurrentTitle = getArticleCopy('loading');

document.documentElement.lang = articleLanguage === 'en' ? 'en' : 'zh-CN';
document.querySelector('.article-back-link')?.replaceChildren(document.createTextNode(getArticleCopy('back')));
document.querySelector('.knowledge-article-eyebrow')?.replaceChildren(document.createTextNode(getArticleCopy('knowledge')));
if (articleTitle && articleTitle.textContent.trim() === '正在加载文章...') {
  articleTitle.textContent = getArticleCopy('loading');
}
if (articleContent && articleContent.textContent.includes('正在加载文章')) {
  articleContent.innerHTML = `<p>${getArticleCopy('loading')}</p>`;
}
if (articlePageIndicator && articlePageIndicator.textContent.trim() === '正在加载文章...') {
  articlePageIndicator.textContent = getArticleCopy('loading');
}

const escapeArticleHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const parseArticleFrontmatter = (markdown) => {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) {
    return { meta: {}, body: markdown };
  }

  const meta = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key) {
      meta[key] = value;
    }
  });

  return {
    meta,
    body: markdown.slice(match[0].length),
  };
};

const renderArticleInline = (value) => {
  let html = escapeArticleHtml(value);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  return html;
};

const highlightArticleCode = (code, language = '') => {
  const normalizedLanguage = language.trim().toLowerCase();
  let html = escapeArticleHtml(code);
  const tokens = [];
  const stash = (className, value) => {
    const key = `@@CODE_TOKEN_${tokens.length}@@`;
    tokens.push(`<span class="${className}">${value}</span>`);
    return key;
  };

  html = html.replace(/(\/\*[\s\S]*?\*\/|\/\/.*$|&lt;!--[\s\S]*?--&gt;)/gm, (match) => stash('code-token-comment', match));
  html = html.replace(/(&quot;.*?&quot;|&#39;.*?&#39;|`.*?`)/g, (match) => stash('code-token-string', match));

  if (normalizedLanguage === 'css') {
    html = html.replace(/(#(?:[0-9a-fA-F]{3,8})\b)/g, '<span class="code-token-color">$1</span>');
    html = html.replace(/\b([a-z-]+)(\s*:)/gi, '<span class="code-token-property">$1</span>$2');
    html = html.replace(/(@[a-z-]+)/gi, '<span class="code-token-keyword">$1</span>');
    html = html.replace(/\b(-?\d*\.?\d+(?:px|rem|em|%|vh|vw|s|ms)?)\b/g, '<span class="code-token-number">$1</span>');
  } else if (normalizedLanguage === 'html') {
    html = html.replace(/(&lt;\/?)([a-z0-9-]+)/gi, '$1<span class="code-token-keyword">$2</span>');
    html = html.replace(/\s([a-z-:]+)(=)/gi, ' <span class="code-token-property">$1</span>$2');
  } else {
    html = html.replace(
      /\b(const|let|var|function|return|if|else|for|while|class|new|import|from|export|async|await|try|catch|throw|true|false|null|undefined)\b/g,
      '<span class="code-token-keyword">$1</span>'
    );
    html = html.replace(/\b([A-Za-z_$][\w$]*)(?=\s*\()/g, '<span class="code-token-function">$1</span>');
    html = html.replace(/\b(-?\d*\.?\d+)\b/g, '<span class="code-token-number">$1</span>');
  }

  return html.replace(/@@CODE_TOKEN_(\d+)@@/g, (_match, index) => tokens[Number(index)] || '');
};

const markdownToArticleHtml = (markdown) => {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let paragraph = [];
  let list = [];
  let codeBlock = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(`<p>${renderArticleInline(paragraph.join(' ').trim())}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    blocks.push(`<ul>${list.map((item) => `<li>${renderArticleInline(item)}</li>`).join('')}</ul>`);
    list = [];
  };

  const flushCodeBlock = () => {
    if (!codeBlock) return;
    const language = codeBlock.language ? escapeArticleHtml(codeBlock.language.toUpperCase()) : 'CODE';
    const highlightedCode = highlightArticleCode(codeBlock.lines.join('\n'), codeBlock.language);
    blocks.push(
      `<figure class="knowledge-code-block"><figcaption>${language}</figcaption><pre><code>${highlightedCode}</code></pre></figure>`
    );
    codeBlock = null;
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (codeBlock) {
        flushCodeBlock();
      } else {
        flushParagraph();
        flushList();
        codeBlock = {
          language: trimmed.replace(/^```/, '').trim(),
          lines: [],
        };
      }
      return;
    }

    if (codeBlock) {
      codeBlock.lines.push(line);
      return;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushParagraph();
      flushList();
      blocks.push(`<h2>${renderArticleInline(trimmed.replace(/^##\s+/, ''))}</h2>`);
      return;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      list.push(trimmed.replace(/^[-*]\s+/, ''));
      return;
    }

    flushList();
    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();
  flushCodeBlock();
  return blocks.join('');
};

const setArticleError = () => {
  if (!articleTitle || !articleDate || !articleCategory || !articleContent) {
    return;
  }

  articleCurrentTitle = getArticleCopy('unavailable');
  articleTitle.textContent = getArticleCopy('unavailable');
  articleDate.textContent = '';
  articleCategory.textContent = 'Not Found';
  articleContent.innerHTML = `<p>${getArticleCopy('missing')}</p>`;
  if (articlePageIndicator) {
    articlePageIndicator.textContent = getArticleCopy('unavailable');
  }
};

const renderArticle = ({ meta, body }) => {
  if (!articleTitle || !articleDate || !articleCategory || !articleContent) {
    return;
  }

  const title = meta.title || getArticleCopy('untitled');
  articleCurrentTitle = title;
  articleTitle.textContent = title;
  articleDate.textContent = meta.date || '';
  articleDate.setAttribute('datetime', meta.datetime || meta.date || '');
  articleCategory.textContent = meta.category || 'Notes';
  articleContent.innerHTML = markdownToArticleHtml(body);
  if (articlePageIndicator) {
    articlePageIndicator.textContent = title;
  }
  updateArticleDockIndicator();
  document.title = `${title}｜${getArticleCopy('titleSuffix')}`;
};

const updateArticleDockIndicator = () => {
  if (!articlePageIndicator || !articleContent) {
    return;
  }

  const headings = [...articleContent.querySelectorAll('h2')];
  const activeHeadings = headings.filter((heading) => heading.getBoundingClientRect().top <= window.innerHeight * 0.38);
  const activeHeading = activeHeadings[activeHeadings.length - 1];

  articlePageIndicator.textContent = activeHeading?.textContent?.trim() || articleCurrentTitle;
};

const updateArticleDockProgress = () => {
  if (!articleFloatingDock) {
    return;
  }

  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
  articleFloatingDock.style.setProperty('--article-scroll-progress', progress.toFixed(4));
};

const updateArticleDock = () => {
  updateArticleDockIndicator();
  updateArticleDockProgress();
};

window.addEventListener('scroll', updateArticleDock, { passive: true });
window.addEventListener('resize', updateArticleDock);

const loadArticlePage = async () => {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get('id') || '001';
  const source = ARTICLE_SOURCES[articleId];
  const fallback = ARTICLE_FALLBACKS[articleId];
  const fallbackPayload = fallback ? getLocalizedArticlePayload(articleId, fallback) : null;

  if (!source && !fallback) {
    setArticleError();
    return;
  }

  if (fallbackPayload) {
    renderArticle(fallbackPayload);
  }

  if (!source || (articleLanguage === 'en' && fallbackPayload)) {
    return;
  }

  try {
    const response = await fetch(encodeURI(source), { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Unable to load ${source}`);
    }

    const markdown = await response.text();
    const { meta, body } = parseArticleFrontmatter(markdown);
    renderArticle(getLocalizedArticlePayload(articleId, { meta, body }));
  } catch (error) {
    console.warn(error);
    if (fallbackPayload) {
      return;
    }
    setArticleError();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadArticlePage, { once: true });
} else {
  loadArticlePage();
}
