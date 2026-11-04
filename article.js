const ARTICLE_SOURCES = {
  '001': './articles/001-card-blur.md',
  '002': './articles/002-threejs-drop.md',
  '003': './articles/003-vibe-coding-animation.md',
  '004': './articles/004-parallax-card.md',
};

const ARTICLE_FALLBACKS = {
  "001": {
    "meta": {
      "title": "Card Gradient Blur Based on Image Colors",
      "date": "2026.04",
      "datetime": "2026-04",
      "category": "Frontend"
    },
    "body": "## What Is an Image-Based Gradient Blur?\n\nThe effect has four main steps:\n\n- Extract the dominant colors from an image.\n- Use those colors to generate a background gradient.\n- Apply a large blur to the background.\n- Layer the content card over it.\n\nThe result usually feels soft and atmospheric.\n\n## Implementation\n\nCommon tools include:\n\n- Color Thief\n- Vibrant.js\n- fast-average-color\n\nThese libraries can automatically identify the dominant colors in an image.\n\n```JS\nconst color = colorThief.getColor(img)\n```\n\nThen generate the background dynamically:\n\n```CSS\nbackground: radial-gradient(...)\n```\n\n## A Simple Structure\n\n```HTML\n<div class=\"bg\"></div>\n<div class=\"card\"></div>\n```\n\n```CSS\n.bg{\n  position:absolute;\n  inset:0;\n  background:\n    radial-gradient(circle,#ff6b6b,transparent),\n    radial-gradient(circle,#4d96ff,transparent);\n\n  filter:blur(120px);\n  opacity:.6;\n}\n\n.card{\n  position:relative;\n  backdrop-filter:blur(20px);\n}\n```\n"
  },
  "002": {
    "meta": {
      "title": "Creating Falling and Stacking UI Elements with Matter.js",
      "date": "2026.03",
      "datetime": "2026-03",
      "category": "Frontend"
    },
    "body": "In web design, we sometimes want UI elements to feel more natural and dynamic than a static arrangement. For example, a group of tags can fall from above like physical objects, collide at the bottom of a container, and settle into a pile.\n\n## 1. How It Works\n\nThe core idea is to let Matter.js calculate each element's position, rotation, and collisions behind the scenes, then synchronize those values with real DOM elements.\n\nThe process has four steps:\n\n- Create a physics world and set its gravity.\n- Represent each UI tag as a rigid body, such as a rectangle, circle, or capsule.\n- Add invisible walls around the container to keep the tags inside it.\n- On every frame, read each body's position and rotation from Matter.js and update the corresponding DOM element's `transform`.\n\nThe visitor sees real web elements falling and stacking naturally, while a **2D physics simulation** runs behind the scenes.\n\n## 2. Basic Page Structure\n\nTo build a container of falling skill tags, start with ordinary HTML elements:\n\n```HTML\n<div class=\"tag-physics-card\">\n  <div class=\"tag green\">001</div>\n  <div class=\"tag purple\">002</div>\n  <div class=\"tag dark\">003</div>\n  <div class=\"tag purple\">004</div>\n  <div class=\"tag green\">005</div>\n  <div class=\"tag dark\">006</div>\n  <div class=\"tag dark\">007</div>\n  <div class=\"tag purple\">008</div>\n</div>\n```\n\nThese tags are still ordinary DOM elements. Matter.js calculates where they should be, how much they should rotate, and how they collide with one another.\n\n## 3. Styling the Container and Tags\n\nCSS can handle the entire visual appearance.\n\n```CSS\n.tag-physics-card {\n  position: relative;\n  width: 540px;\n  height: 460px;\n  border-radius: 36px;\n  background: #f4f4f5;\n  overflow: hidden;\n}\n\n.tag {\n  position: absolute;\n  padding: 10px 24px;\n  border-radius: 999px;\n  font-size: 28px;\n  line-height: 1;\n  white-space: nowrap;\n  user-select: none;\n  will-change: transform;\n}\n\n.tag.green {\n  background: #ccff44;\n  color: #333;\n}\n\n.tag.purple {\n  background: #cec3ff;\n  color: #333;\n}\n\n.tag.dark {\n  background: #3a3a3a;\n  color: #fff;\n}\n\n```\n\nThere are a few key details here:\n\n- `position: absolute` is necessary because we will use `transform` to control each tag's position precisely.\n- `overflow: hidden` keeps the tags inside the rounded container.\n- `will-change: transform` tells the browser to prepare for transform changes, helping reduce stutter.\n\n## 4. Creating the Matter.js Physics World\n\nAfter installing Matter.js, create a basic physics engine:\n\n```JS\nimport Matter from \"matter-js\";\nconst { Engine, World, Bodies, Body, Runner } = Matter;\nconst engine = Engine.create();\nconst world = engine.world;\nengine.gravity.y = 1;\n```\n\n`Engine.create()` creates the physics engine. The `world` contains all the physical bodies. Setting `engine.gravity.y = 1` enables downward gravity. For a slower fall, try a smaller value such as `0.6`; for a faster fall, use `1.2` or higher.\n\n## 5. Adding Invisible Walls\n\nTo keep the tags stacked inside the container, add boundaries at the bottom, left, and right. These walls do not need to be visible; they only need to exist in the physics world.\n\n```JS\nconst container = document.querySelector(\".tag-physics-card\");\nconst width = container.clientWidth;\nconst height = container.clientHeight;\n\nconst walls = [\n  Bodies.rectangle(width / 2, height + 10, width, 20, {\n    isStatic: true,\n  }),\n  Bodies.rectangle(-10, height / 2, 20, height, {\n    isStatic: true,\n  }),\n  Bodies.rectangle(width + 10, height / 2, 20, height, {\n    isStatic: true,\n  }),\n];\n\nWorld.add(world, walls);\n```\n\nHere, `isStatic: true` means the walls stay in place when other bodies collide with them. The bottom wall sits slightly below the container's lower edge, while the side walls sit just outside its left and right edges. This keeps the falling tags inside so they can stack naturally.\n\n## 6. Turning UI Tags into Rigid Bodies\n\nNext, create a Matter.js rigid body for each DOM tag.\n\n```JS\nconst tags = document.querySelectorAll(\".tag\");\n\ntags.forEach((el) => {\n  const rect = el.getBoundingClientRect();\n\n  const body = Bodies.rectangle(\n    Math.random() * width,\n    Math.random() * 80,\n    rect.width,\n    rect.height,\n    {\n      restitution: 0.25,\n      friction: 0.8,\n      frictionAir: 0.02,\n    }\n  );\n\n  Body.rotate(body, (Math.random() - 0.5) * 1.2);\n\n  el.body = body;\n  World.add(world, body);\n});\n\n```\n\n`restitution` controls bounciness. Higher values make the tags bounce more. For UI tags, avoid setting it too high or the effect may feel too much like a toy. Values between `0.2` and `0.4` tend to feel more natural.\n\n`friction` controls friction between bodies. Higher values help the tags form a stable pile rather than sliding around continuously.\n\n`frictionAir` controls air resistance. Increasing it slightly can soften the motion and help the tags settle sooner.\n\n`Body.rotate()` gives each tag an initial angle so the pile looks more natural and less neatly aligned.\n\n## 7. Synchronizing Physics with the DOM\n\nMatter.js calculates the physics but does not automatically move DOM elements. We need to synchronize them on every frame:\n\n```JS\nfunction update() {\n  tags.forEach((el) => {\n    const body = el.body;\n\n    el.style.transform = `\n      translate(\n        ${body.position.x - el.offsetWidth / 2}px,\n        ${body.position.y - el.offsetHeight / 2}px\n      )\n      rotate(${body.angle}rad)\n    `;\n  });\n\n  requestAnimationFrame(update);\n}\n\nconst runner = Runner.create();\nRunner.run(runner, engine);\n\nupdate();\n```\n\nMatter.js uses the center of a body as its position, whereas a DOM element's `translate` offset starts from its top-left corner. Subtracting half the element's width and height keeps the visible tag aligned with its physical body.\n\n## 8. Making the Effect Match the UI\n\nRectangular bodies are enough for a basic effect. However, rounded capsule tags may collide a little unnaturally because their visual shape is rounded while their physical body is rectangular.\n\nThere are three practical approaches:\n\n- Keep rectangular bodies and use CSS for rounded corners. This is the simplest option and offers the best performance.\n- Build a capsule from several bodies: a rectangle in the middle and a circle at each end. This produces collisions closer to the visible pill shape.\n- Use Matter.js as an approximate physics layer while keeping the visual design polished. In most UI projects, visitors care more about natural motion than perfectly accurate collision edges.\n\n## 9. Performance Considerations\n\nMatter.js is lightweight, but a continuously running simulation still consumes resources. On a personal website, visitors may only glance at this section, so it does not need to keep calculating indefinitely.\n\nYou can use a timer to stop the simulation after a few seconds:\n\n```JS\nsetTimeout(() => {\n  Runner.stop(runner);\n}, 3000);\n```\n"
  },
  "003": {
    "meta": {
      "title": "Building Animations More Efficiently with Vibe Coding",
      "date": "2026.05",
      "datetime": "2026-05",
      "category": "Vibe Coding"
    },
    "body": "Vibe coding can greatly reduce the time it takes to build animated web interactions. For beginners who are less confident with frontend programming, an efficient approach is to find an open-source example close to the intended result, then ask AI to help explain and adapt it.\n\n## 1. Define the Type of Animation First\n\nBefore you start vibe coding, describe the animation you want. Web animations generally fall into a few categories:\n\n- Entrance animations: text fading in, cards sliding up, or images gradually appearing.\n- Hover animations: elements growing, glowing, changing color, or moving with a spring effect when hovered over.\n- Scroll-triggered animations: elements appearing one by one as a section enters the viewport, or backgrounds moving with parallax.\n- Looping ambient animations: gradient glows, floating particles, rotating globes, or fluid backgrounds.\n- Interactive animations: pointer tracking, dragging, click-to-expand interactions, card stacking, or objects falling under simulated gravity.\n\n## 2. Start by Teaching the AI\n\nMany beginners get disappointing results because they give AI an abstract request such as, \"Help me create a sophisticated web animation.\"\n\nThat instruction is too vague. A better approach is to find a similar open-source example and say, \"I want an animation like this example, but in light blue, at a slower speed, using the assets I provide, and adapted for mobile.\"\n\nThis gives the AI a much clearer task.\n\n## 3. Recommended Resources for CSS Animations\n\n- CodePen is one of the most useful places for beginners to find web animation inspiration. Many frontend developers share complete HTML, CSS, and JavaScript examples that you can give to AI for explanation and adaptation.\n- Animista is useful for finding ready-to-use CSS animations. It offers presets and lets you adjust speed, direction, delay, and other settings online, then copy just the CSS you need.\n- Hover.css works well for hover micro-interactions on buttons, links, and cards.\n- FreeFrontend collects CSS animations, components, and UI examples, with clearly organized categories.\n- The official GSAP CodePen examples and GSAP Showcase are better suited to advanced animation. In my experience, they offer more sophisticated motion effects.\n"
  },
  "004": {
    "meta": {
      "title": "How to Build a Parallax Card Effect",
      "date": "2026.05",
      "datetime": "2026-05",
      "category": "Portfolio"
    },
    "body": "This is a placeholder article about parallax card effects. A future version can explain how to calculate layer offsets from the pointer position, giving a card a subtle sense of depth on hover.\n\n## Beyond the Final Work\n\nProjects show the results; articles show the process. Documenting how an effect is built helps visitors understand the decisions behind it, as well as the final visual.\n"
  }
};

const getArticleLanguage = () => 'en';
const getLocalizedArticlePayload = (_articleId, payload) => payload;

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

  if (!source) {
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
