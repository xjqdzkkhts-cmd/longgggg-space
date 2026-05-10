const cards = [...document.querySelectorAll('[data-card]')];
const scene = document.querySelector('.hero-visual');
const stackCard = document.querySelector('.stack-card');
const cursor = document.querySelector('.custom-cursor');
const scrollTrigger = document.querySelector('[data-scroll-target]');
const hero = document.querySelector('.hero');
const heroTitle = document.querySelector('.hero-title');
const roleStack = document.querySelector('[data-role-stack]');
const currentRoleLayer = document.querySelector('[data-role-current]');
const nextRoleLayer = document.querySelector('[data-role-next]');
const aboutSection = document.querySelector('#about');
const learningDrop = document.querySelector('.about-bento-learning-drop');
const timePixelGroups = [...document.querySelectorAll('.about-time-pixel-group')];
const timeToggle = document.querySelector('[data-time-toggle]');
const guestbookForm = document.querySelector('[data-guestbook-form]');
const guestbookInput = document.querySelector('[data-guestbook-input]');
const guestbookCount = document.querySelector('[data-guestbook-count]');
const guestbookList = document.querySelector('[data-guestbook-list]');
const guestbookPaper = document.querySelector('[data-guestbook-paper]');
const guestbookSubmitTrigger = document.querySelector('[data-guestbook-submit-trigger]');
const aiDock = document.querySelector('[data-ai-dock]');
const interestCard = document.querySelector('[data-interest-card]');
const interestStage = document.querySelector('[data-interest-stage]');
const interestLabels = [...document.querySelectorAll('[data-interest-label]')];
const aboutAppBento = document.querySelector('[data-about-app-bento]');
const aboutAppOpen = document.querySelector('[data-about-app-open]');
const aboutAppModal = document.querySelector('[data-about-app-modal]');
const aboutAppCloseButtons = [...document.querySelectorAll('[data-about-app-close]')];
const aboutAppCardContainer = document.querySelector('[data-about-app-card-container]');
const aboutAppCard = document.querySelector('[data-about-app-card]');
const worksSection = document.querySelector('#works');
const portfolioSection = document.querySelector('#works .works-showcase-inner');
const knowledgeSection = document.querySelector('#knowledge');
const contactWrapper = document.querySelector('#contact');
const contactSection = document.querySelector('#contact .contact-footer');
const siteHeader = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('[data-nav-section]')];
const pageIndicator = document.querySelector('[data-page-indicator]');
const worksTabs = [...document.querySelectorAll('[data-work-filter]')];
const workCards = [...document.querySelectorAll('[data-work-category]')];
const workCardMedia = [...document.querySelectorAll('.work-card-media')];
const projectCards = [...document.querySelectorAll('[data-project-gallery]')];
const projectViewer = document.querySelector('[data-project-viewer]');
const projectViewerPages = document.querySelector('[data-project-viewer-pages]');
const projectViewerClose = document.querySelector('[data-project-viewer-close]');
const projectViewerPresent = document.querySelector('[data-project-viewer-present]');
const projectSlideFrame = document.querySelector('.project-slide-frame');
const projectSlideImage = document.querySelector('[data-project-slide-image]');
const projectSlideCount = document.querySelector('[data-project-slide-count]');
const projectSlideProgress = document.querySelector('[data-project-slide-progress]');
const projectSlidePrev = document.querySelector('[data-project-slide-prev]');
const projectSlideNext = document.querySelector('[data-project-slide-next]');
const knowledgeEntries = [...document.querySelectorAll('[data-knowledge-entry]')];
const knowledgeViewer = document.querySelector('[data-knowledge-viewer]');
const knowledgeViewerClose = document.querySelector('[data-knowledge-viewer-close]');
const knowledgeTitle = document.querySelector('[data-knowledge-title]');
const knowledgeDate = document.querySelector('[data-knowledge-date]');
const knowledgeCategory = document.querySelector('[data-knowledge-category]');
const knowledgeContent = document.querySelector('[data-knowledge-content]');
const copyButtons = [...document.querySelectorAll('[data-copy-value]')];
const siteToast = document.querySelector('[data-site-toast]');
const versionUpdate = document.querySelector('[data-version-update]');
const versionUpdateValue = document.querySelector('[data-version-update-value]');
const versionUpdateRefresh = document.querySelector('[data-version-update-refresh]');
const cursorIcon = document.querySelector('.custom-cursor-icon');
const aiChatToggle = document.querySelector('[data-ai-chat-toggle]');
const aiAgentCard = document.querySelector('[data-agent-chat-card]');
const aiChatSidebar = document.querySelector('[data-ai-chat-sidebar]');
const aiChatClose = document.querySelector('[data-ai-chat-close]');
const aiChatMessages = document.querySelector('[data-ai-chat-messages]');
const aiChatStarters = document.querySelector('[data-ai-chat-starters]');
const aiChatForm = document.querySelector('[data-ai-chat-form]');
const aiChatInput = document.querySelector('[data-ai-chat-input]');
const aiChatSend = document.querySelector('[data-ai-chat-send]');
const heroRoles = ['UX设计师', 'Vibe Coder', 'HCI 爱好者', 'UI 设计师'];
const heroCardSources = {
  UX设计师: './assets/user-card.png',
  'Vibe Coder': './assets/hero-card-vibe-coder.png',
  'HCI 爱好者': './assets/hero-card-hci-lover.png',
  'UI 设计师': './assets/hero-card-ui-designer.png',
};
const workCardTintCache = new Map();
const workCardTintInflight = new Map();
const aiChatApiBaseUrl = (window.LONG_AI_CONFIG?.apiBaseUrl || '').replace(/\/$/, '');
const aiChatEndpoint = `${aiChatApiBaseUrl}/api/chat`;
const spotifyRecentEndpoint = `${aiChatApiBaseUrl}/api/spotify-recent`;
let openProjectViewerByGallery = null;
let attachCursorBehavior = () => {};
const aiChatState = {
  isOpen: false,
  isSending: false,
  isTyping: false,
  typingTimer: null,
  starterIndex: -1,
  starterOptions: [],
  hasBooted: false,
  spotifyTracks: null,
  spotifyTrackPool: null,
  spotifyTracksPromise: null,
  messages: [],
};
const AI_CHAT_COPY = {
  welcome:
    '你好呀！我是龙湘玉的 AI分身，你可以询问我的过往经历、作品、生活风格等等。',
  serviceUnavailable: 'AI 服务暂时不可用，请稍后再试。',
  notConfigured: 'AI 服务还没有接通，请先部署 Vercel 后端并填写前端 API 地址。',
};
const DEFAULT_AI_CHAT_STARTERS = ['生活中的你是什么样？', '和你合作是什么感觉？', '你如何思考设计？'];
const knowledgeArticles = {
  '001': {
    title: '标题 001',
    date: '2026.05',
    datetime: '2026-05',
    category: 'Design Notes',
    content: [
      { type: 'p', text: '这里会是一篇更接近 Astro Blog 阅读体验的知识库文章。它不需要迁移到 Astro，也不需要引入构建流程，只是在当前静态网站中保留清晰的文章结构。' },
      { type: 'h2', text: '为什么这样记录' },
      { type: 'p', text: '我希望把设计观察、AI 工具实践、项目复盘和日常灵感沉淀在同一个地方。首页展示短列表，点进来后再进入更安静的阅读界面。' },
      { type: 'h2', text: '后续可以替换成什么' },
      { type: 'p', text: '之后这里可以替换为真实文章，比如一次产品拆解、一段用户研究记录、一个前端实现笔记，或者某个 AI 工作流的复盘。' },
    ],
  },
  '002': {
    title: '标题 002',
    date: '2026.05',
    datetime: '2026-05',
    category: 'Process',
    content: [
      { type: 'p', text: '这是一篇关于问题拆解的占位文章。真实内容可以记录从模糊需求到明确界面方案的过程。' },
      { type: 'h2', text: '从问题开始' },
      { type: 'p', text: '先确认用户是谁、要完成什么、现在被什么阻碍，再把信息结构和交互路径逐步展开。' },
    ],
  },
  '003': {
    title: '标题 003',
    date: '2026.05',
    datetime: '2026-05',
    category: 'Fragments',
    content: [
      { type: 'p', text: '这是一篇关于日常观察的占位文章。生活中的细节经常会变成界面、动效或者产品概念的起点。' },
      { type: 'h2', text: '观察的价值' },
      { type: 'p', text: '好的体验通常不是凭空出现的，它往往来自对真实场景的耐心观察，以及对小问题的持续追问。' },
    ],
  },
  '004': {
    title: '标题 004',
    date: '2026.05',
    datetime: '2026-05',
    category: 'Portfolio',
    content: [
      { type: 'p', text: '这是一篇关于作品集和个人表达的占位文章。知识库可以作为项目之外的第二条线索，展示思考方式和长期积累。' },
      { type: 'h2', text: '作品之外' },
      { type: 'p', text: '项目展示结果，文章展示过程。两者放在一起，会让访问者更容易理解我如何学习、判断和创造。' },
    ],
  },
};
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
const AI_CHAT_TYPE_SPEED_MS = 24;
const AI_SPOTIFY_CACHE_KEY = 'long-ai-spotify-tracks';
const VERSION_CHECK_INTERVAL_MS = 60000;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

let siteToastTimer = 0;
const showSiteToast = (message) => {
  if (!siteToast) {
    return;
  }

  siteToast.textContent = message;
  siteToast.classList.add('is-visible');
  window.clearTimeout(siteToastTimer);
  siteToastTimer = window.setTimeout(() => {
    siteToast.classList.remove('is-visible');
  }, 1400);
};

const rgbToHsl = (r, g, b) => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const lightness = (max + min) / 2;
  const delta = max - min;

  if (delta === 0) {
    return { h: 0, s: 0, l: lightness };
  }

  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue = 0;

  switch (max) {
    case rn:
      hue = (gn - bn) / delta + (gn < bn ? 6 : 0);
      break;
    case gn:
      hue = (bn - rn) / delta + 2;
      break;
    default:
      hue = (rn - gn) / delta + 4;
  }

  return { h: hue / 6, s: saturation, l: lightness };
};

const hslToRgb = (h, s, l) => {
  if (s === 0) {
    const value = Math.round(l * 255);
    return [value, value, value];
  }

  const hueToRgb = (p, q, t) => {
    let nextT = t;

    if (nextT < 0) nextT += 1;
    if (nextT > 1) nextT -= 1;
    if (nextT < 1 / 6) return p + (q - p) * 6 * nextT;
    if (nextT < 1 / 2) return q;
    if (nextT < 2 / 3) return p + (q - p) * (2 / 3 - nextT) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return [
    Math.round(hueToRgb(p, q, h + 1 / 3) * 255),
    Math.round(hueToRgb(p, q, h) * 255),
    Math.round(hueToRgb(p, q, h - 1 / 3) * 255),
  ];
};

const mixRgb = (source, target, amount) =>
  source.map((channel, index) => Math.round(channel + (target[index] - channel) * amount));

const extractDominantWorkCardTint = (imageUrl) => {
  if (!imageUrl) {
    return Promise.resolve({
      tintRgb: [24, 24, 24],
      contrastBoost: 0.45,
    });
  }

  if (workCardTintCache.has(imageUrl)) {
    return Promise.resolve(workCardTintCache.get(imageUrl));
  }

  if (workCardTintInflight.has(imageUrl)) {
    return workCardTintInflight.get(imageUrl);
  }

  const extractionPromise = new Promise((resolve) => {
    const image = new Image();
    image.decoding = 'async';

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d', { willReadFrequently: true });

      if (!context) {
        const fallbackTint = {
          tintRgb: [24, 24, 24],
          contrastBoost: 0.45,
        };
        workCardTintCache.set(imageUrl, fallbackTint);
        resolve(fallbackTint);
        return;
      }

      const sampleWidth = 48;
      const sampleHeight = 28;
      const sourceHeight = Math.max(1, Math.floor(image.naturalHeight * 0.35));
      const sourceY = Math.max(0, image.naturalHeight - sourceHeight);
      canvas.width = sampleWidth;
      canvas.height = sampleHeight;
      context.drawImage(
        image,
        0,
        sourceY,
        image.naturalWidth,
        sourceHeight,
        0,
        0,
        sampleWidth,
        sampleHeight
      );

      const pixels = context.getImageData(0, 0, sampleWidth, sampleHeight).data;
      const clusters = new Map();
      let luminanceTotal = 0;
      let sampledPixels = 0;

      for (let index = 0; index < pixels.length; index += 4) {
        const alpha = pixels[index + 3];

        if (alpha < 120) {
          continue;
        }

        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const quantizedRed = Math.round(red / 24) * 24;
        const quantizedGreen = Math.round(green / 24) * 24;
        const quantizedBlue = Math.round(blue / 24) * 24;
        const key = `${quantizedRed}-${quantizedGreen}-${quantizedBlue}`;
        const { s } = rgbToHsl(red, green, blue);
        const nextCluster = clusters.get(key) || { count: 0, red: 0, green: 0, blue: 0, saturation: 0 };
        const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

        nextCluster.count += 1;
        nextCluster.red += red;
        nextCluster.green += green;
        nextCluster.blue += blue;
        nextCluster.saturation += s;
        clusters.set(key, nextCluster);
        luminanceTotal += luminance;
        sampledPixels += 1;
      }

      if (!clusters.size) {
        const fallbackTint = {
          tintRgb: [24, 24, 24],
          contrastBoost: 0.45,
        };
        workCardTintCache.set(imageUrl, fallbackTint);
        resolve(fallbackTint);
        return;
      }

      const winner = [...clusters.values()].sort((clusterA, clusterB) => {
        const scoreA = (clusterA.saturation / clusterA.count) * clusterA.count;
        const scoreB = (clusterB.saturation / clusterB.count) * clusterB.count;
        return scoreB - scoreA;
      })[0];

      const averageRed = Math.round(winner.red / winner.count);
      const averageGreen = Math.round(winner.green / winner.count);
      const averageBlue = Math.round(winner.blue / winner.count);
      const tintHsl = rgbToHsl(averageRed, averageGreen, averageBlue);
      const clampedTint = hslToRgb(tintHsl.h, tintHsl.s, Math.min(tintHsl.l, 0.2));
      const sampleLuminance = sampledPixels ? luminanceTotal / sampledPixels : tintHsl.l;
      const saturationPenalty = clamp((0.22 - tintHsl.s) / 0.22, 0, 1) * 0.28;
      const lightnessBoost = clamp((sampleLuminance - 0.52) / 0.28, 0, 1) * 0.72;
      const contrastBoost = clamp(lightnessBoost + saturationPenalty, 0, 1);
      const tintData = {
        tintRgb: clampedTint,
        contrastBoost,
      };

      workCardTintCache.set(imageUrl, tintData);
      resolve(tintData);
    };

    image.onerror = () => {
      const fallbackTint = {
        tintRgb: [24, 24, 24],
        contrastBoost: 0.45,
      };
      workCardTintCache.set(imageUrl, fallbackTint);
      resolve(fallbackTint);
    };

    image.src = imageUrl;
  }).finally(() => {
    workCardTintInflight.delete(imageUrl);
  });

  workCardTintInflight.set(imageUrl, extractionPromise);
  return extractionPromise;
};

const applyWorkCardTint = async (mediaElement) => {
  const imageElement = mediaElement?.querySelector('.work-card-image');

  if (!mediaElement || !imageElement) {
    return;
  }

  const { tintRgb, contrastBoost } = await extractDominantWorkCardTint(imageElement.currentSrc || imageElement.src);
  const glassRgb = mixRgb(tintRgb, [255, 255, 255], 0.58 - contrastBoost * 0.16);

  mediaElement.style.setProperty('--work-card-tint-rgb', tintRgb.join(' '));
  mediaElement.style.setProperty('--work-card-glass-rgb', glassRgb.join(' '));
  mediaElement.style.setProperty('--work-card-contrast-boost', contrastBoost.toFixed(3));
  mediaElement.classList.add('is-tinted');
};
const PHYSICS = {
  gravity: 0.0024,
  damping: 0.988,
  springBack: 0.0016,
  maxSwing: Math.PI / 22,
  dragAngleFollow: 0.18,
  dragVelocityFollow: 0.06,
  hoverFollow: 0.018,
  hoverDamping: 0.94,
  hoverMaxSwing: Math.PI / 30,
  introKickMin: 0.04,
  introKickMax: 0.075,
  introDurationMs: 2600,
};

const ROLE_SWAP = {
  hold: 2400,
  initialDelay: 1850,
  duration: 720,
  stagger: 45,
};

const roleSwapState = {
  roleIndex: 0,
  timeoutId: 0,
  animationFrameId: 0,
};
let heroIntroHasPlayed = false;

function createCardState(element) {
  const anchorX = Number(element.dataset.anchorX);
  const anchorY = Number(element.dataset.anchorY);
  const ropeLength = Number(element.dataset.length);
  const restRotation = Number(element.dataset.rotation || 0);

  return {
    element,
    grip: element.querySelector('.card-grip'),
    image: element.querySelector('.card-grip img'),
    anchorRatioX: anchorX / 100,
    anchorY,
    ropeLength,
    baseLength: ropeLength,
    restRotation,
    angle: restRotation * (Math.PI / 180),
    angularVelocity: 0,
    dragging: false,
    dragPointerId: null,
    dragOffsetX: 0,
    dragOffsetY: 0,
    hoverActive: false,
    hoverTargetAngle: restRotation * (Math.PI / 180),
    introActive: true,
    introEndTime: 0,
  };
}

const states = cards.map(createCardState);

Object.values(heroCardSources).forEach((src) => {
  const image = new Image();
  image.src = src;
});

workCardMedia.forEach((mediaElement) => {
  applyWorkCardTint(mediaElement);
});

function setHeroCardForRole(roleName) {
  const nextSource = heroCardSources[roleName] || heroCardSources.UX设计师;

  states.forEach((state) => {
    if (!state.image || state.image.getAttribute('src') === nextSource) {
      return;
    }

    state.image.setAttribute('src', nextSource);
  });
}

function triggerCardIntro(state) {
  const direction = Math.random() > 0.5 ? 1 : -1;
  const kick =
    PHYSICS.introKickMin + Math.random() * (PHYSICS.introKickMax - PHYSICS.introKickMin);
  state.angle = state.restRotation * (Math.PI / 180);
  state.angularVelocity = direction * kick;
  state.dragging = false;
  state.dragPointerId = null;
  state.dragOffsetX = 0;
  state.dragOffsetY = 0;
  state.introActive = true;
  state.introEndTime = performance.now() + PHYSICS.introDurationMs + Math.random() * 500;
}

states.forEach((state) => {
  triggerCardIntro(state);
});

if (currentRoleLayer && nextRoleLayer) {
  setDisplayedRole(heroRoles[0]);
}

function buildRoleMarkup(roleName) {
  return [...roleName]
    .map((character, index) => {
      if (character === ' ') {
        return '<span class="hero-role-char hero-role-space" aria-hidden="true">&nbsp;</span>';
      }

      return `<span class="hero-role-char" style="--char-index:${index}">${character}</span>`;
    })
    .join('');
}

function setDisplayedRole(roleName) {
  if (!currentRoleLayer || !nextRoleLayer) {
    return;
  }

  currentRoleLayer.innerHTML = buildRoleMarkup(roleName);
  currentRoleLayer.classList.remove('is-leaving');
  nextRoleLayer.innerHTML = '';
  nextRoleLayer.classList.remove('is-entering');
}

function scheduleRoleSwap() {
  if (!currentRoleLayer || !nextRoleLayer) {
    return;
  }

  window.clearTimeout(roleSwapState.timeoutId);
  cancelAnimationFrame(roleSwapState.animationFrameId);

  const nextIndex = (roleSwapState.roleIndex + 1) % heroRoles.length;
  const nextRole = heroRoles[nextIndex];

  setHeroCardForRole(nextRole);
  nextRoleLayer.innerHTML = buildRoleMarkup(nextRole);
  currentRoleLayer.classList.add('is-leaving');
  nextRoleLayer.classList.add('is-entering');

  const totalDuration =
    ROLE_SWAP.duration + (Math.max([...nextRole].length, [...heroRoles[roleSwapState.roleIndex]].length) - 1) * ROLE_SWAP.stagger;

  roleSwapState.timeoutId = window.setTimeout(() => {
    roleSwapState.roleIndex = nextIndex;
    setDisplayedRole(nextRole);
    roleSwapState.timeoutId = window.setTimeout(scheduleRoleSwap, ROLE_SWAP.hold);
  }, totalDuration);
}

function resetHeroTextAnimations() {
  if (!heroTitle) {
    return;
  }

  hero.classList.remove('is-active');
  window.clearTimeout(roleSwapState.timeoutId);
  cancelAnimationFrame(roleSwapState.animationFrameId);
  roleSwapState.timeoutId = 0;
  roleSwapState.animationFrameId = 0;
  roleSwapState.roleIndex = 0;
  setDisplayedRole(heroRoles[0]);
  setHeroCardForRole(heroRoles[0]);
  void hero.offsetWidth;
}

function activateHeroIntro() {
  if (!hero) {
    return;
  }

  if (heroIntroHasPlayed) {
    return;
  }

  hero.classList.add('is-active');
  window.clearTimeout(roleSwapState.timeoutId);
  cancelAnimationFrame(roleSwapState.animationFrameId);
  roleSwapState.roleIndex = 0;
  setDisplayedRole(heroRoles[0]);
  setHeroCardForRole(heroRoles[0]);
  roleSwapState.timeoutId = window.setTimeout(scheduleRoleSwap, ROLE_SWAP.initialDelay);
  states.forEach((state) => {
    triggerCardIntro(state);
  });
  heroIntroHasPlayed = true;
}

function autoResizeAiChatInput() {
  if (!aiChatInput) {
    return;
  }

  aiChatInput.style.height = 'auto';
  aiChatInput.style.height = `${Math.min(aiChatInput.scrollHeight, 168)}px`;
}

function getAiCardIcon(icon) {
  const icons = {
    mail: '✉',
    phone: '☎',
    wechat: '微',
    link: '↗',
  };

  return icons[icon] || '•';
}

function handleAiCardAction(item) {
  const value = item.value || item.url || '';

  if (!value) {
    return;
  }

  if (item.action === 'email') {
    window.location.href = `mailto:${value}`;
    return;
  }

  if (item.action === 'tel') {
    window.location.href = `tel:${value.replace(/\s/g, '')}`;
    return;
  }

  if (item.action === 'link' && item.url) {
    window.open(item.url, '_blank', 'noopener,noreferrer');
    return;
  }

  navigator.clipboard?.writeText(value).catch(() => {});
}

function getAiProjectGallery(item) {
  const rawGallery = typeof item?.gallery === 'string' ? item.gallery.trim() : '';
  const title = `${item?.title || ''} ${item?.label || ''}`.toLowerCase();
  const galleryMap = {
    'ai-thrombolysis': 'ai-thrombolysis',
    'ai 溶栓': 'ai-thrombolysis',
    溶栓: 'ai-thrombolysis',
    iknow: 'iknow',
    ikonw: 'iknow',
    'adhd-ai': 'adhd-ai',
    adhd: 'adhd-ai',
    etea: 'etea',
    'e-tea': 'etea',
    'marry-christmas': 'marry-christmas',
    merry: 'marry-christmas',
    christmas: 'marry-christmas',
  };

  if (galleryMap[rawGallery]) {
    return galleryMap[rawGallery];
  }

  return Object.entries(galleryMap).find(([key]) => title.includes(key))?.[1] || '';
}

function getDefaultAiLifeItems() {
  return [
    {
      type: 'music',
      title: '最近在听',
      description: '最近很喜欢听 Kpop，尤其是晚上边听活力的音乐边做自己的事情。',
      accent: '#74B0FF',
      tracks: [],
    },
    {
      type: 'dogs',
      title: '我是狗狗派',
      accent: '#C4A8F5',
      images: [
        { src: './assets/life-cards/dog-husky.png', label: 'Husky' },
        { src: './assets/life-cards/dog-beagle.jpg', label: 'Beagle' },
        { src: './assets/life-cards/dog-border-collie.png', label: 'Border Collie' },
      ],
    },
    { type: 'quote', title: '“现在开始，虽晚不迟”', description: '最近收藏的一句话', accent: '#D2FD5F' },
    {
      type: 'book',
      title: '《夜晚的潜水艇》',
      description: '最近在看陈春成的这本极具想象力的小说，推荐。',
      image: './assets/life-cards/book-night-submarine.jpg',
      accent: '#74B0FF',
    },
    { type: 'friend', title: '温柔', description: '朋友喜欢这样描述我。', accent: '#0045DD' },
  ];
}

function getDefaultAiMusicTracks() {
  return [
    { title: 'Magnetic', artist: 'illit', theme: 'magnetic' },
    { title: '陀飞轮', artist: '陈奕迅', theme: 'dark' },
    { title: 'Ditto', artist: 'Newjeans', theme: 'ditto' },
    { title: 'Love Lee', artist: 'AKMU', theme: 'love' },
  ];
}

function normalizeSpotifyTracksPayload(payload) {
  const sourceTracks = Array.isArray(payload?.pool) ? payload.pool : payload?.tracks;
  if (!Array.isArray(sourceTracks)) {
    return [];
  }

  return sourceTracks
    .filter((track) => track && typeof track.title === 'string' && track.title.trim())
    .map((track) => ({
      title: track.title.trim(),
      artist: typeof track.artist === 'string' ? track.artist.trim() : '',
      image: typeof track.image === 'string' ? track.image : '',
      url: typeof track.url === 'string' ? track.url : '',
      theme: 'spotify',
    }));
}

function getTrackFingerprint(tracks = []) {
  return tracks.map((track) => `${track.title}__${track.artist}`).join('|');
}

function shuffleTracks(tracks = []) {
  const nextTracks = [...tracks];
  for (let index = nextTracks.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [nextTracks[index], nextTracks[randomIndex]] = [nextTracks[randomIndex], nextTracks[index]];
  }
  return nextTracks;
}

function readSavedSpotifyTracks() {
  try {
    const parsed = JSON.parse(window.localStorage?.getItem(AI_SPOTIFY_CACHE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
}

function saveSpotifyTracks(tracks = []) {
  if (!tracks.length) {
    return;
  }

  try {
    window.localStorage?.setItem(AI_SPOTIFY_CACHE_KEY, JSON.stringify(tracks.slice(0, 20)));
  } catch (_error) {
    // Local storage may be unavailable in private browsing; live Spotify data still works.
  }
}

function getAiMusicTracks(fallbackTracks = []) {
  const spotifyTracks = Array.isArray(aiChatState.spotifyTracks) ? aiChatState.spotifyTracks : [];
  return (spotifyTracks.length ? spotifyTracks : fallbackTracks).slice(0, 4);
}

function renderAiMusicLoading() {
  const loading = document.createElement('div');
  loading.className = 'ai-chat-music-loading';
  loading.textContent = '正在读取 Spotify';
  return loading;
}

function renderAiMusicRefreshButton() {
  const button = document.createElement('button');
  button.className = 'ai-chat-music-refresh';
  button.type = 'button';
  button.setAttribute('aria-label', '刷新最近在听');
  button.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12a9 9 0 0 1-15.32 6.36M3 12A9 9 0 0 1 18.32 5.64" />
      <path d="M21 5v7h-7" />
      <path d="M3 19v-7h7" />
    </svg>
  `;
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    loadAiSpotifyTracks({ force: true });
  });
  button.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  button.addEventListener('pointerup', (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  return button;
}

function renderAiMusicCover(track) {
  const cover = document.createElement(track.url ? 'a' : 'span');
  cover.className = `ai-chat-music-cover is-${track.theme || 'default'}`;

  if (track.image) {
    cover.classList.add('has-image');
    cover.style.backgroundImage = `url("${track.image.replace(/"/g, '%22')}")`;
  }

  if (track.url) {
    cover.href = track.url;
    cover.target = '_blank';
    cover.rel = 'noopener noreferrer';
    cover.setAttribute('aria-label', `在 Spotify 打开 ${track.title}`);
  }

  return cover;
}

function renderAiMusicTrack(track) {
  const trackEl = document.createElement('div');
  trackEl.className = 'ai-chat-music-track';

  const cover = renderAiMusicCover(track);

  const trackTitle = document.createElement('b');
  trackTitle.textContent = track.title || '';

  const artist = document.createElement('span');
  artist.textContent = track.artist || '';

  trackEl.append(cover, trackTitle, artist);
  return trackEl;
}

function updateAiMusicCards() {
  if (!aiChatMessages) {
    return;
  }

  aiChatMessages.querySelectorAll('[data-ai-music-grid]').forEach((grid) => {
    grid.innerHTML = '';
    if (!Array.isArray(aiChatState.spotifyTracks)) {
      grid.appendChild(renderAiMusicLoading());
      return;
    }

    getAiMusicTracks(getDefaultAiMusicTracks()).forEach((track) => {
      grid.appendChild(renderAiMusicTrack(track));
    });
  });
}

function loadAiSpotifyTracks(options = {}) {
  const force = Boolean(options.force);
  if (!force && (aiChatState.spotifyTracks || aiChatState.spotifyTracksPromise)) {
    return aiChatState.spotifyTracksPromise;
  }

  if (force) {
    aiChatState.spotifyTracks = null;
    aiChatState.spotifyTracksPromise = null;
    updateAiMusicCards();
  }

  const endpoint = force ? `${spotifyRecentEndpoint}?t=${Date.now()}` : spotifyRecentEndpoint;
  aiChatState.spotifyTracksPromise = fetch(endpoint, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Spotify request failed.');
      }
      return response.json();
    })
    .then((payload) => {
      const tracks = normalizeSpotifyTracksPayload(payload);
      const savedTracks = readSavedSpotifyTracks();
      const hasSamePool =
        force &&
        tracks.length &&
        savedTracks.length &&
        getTrackFingerprint(tracks.slice(0, 8)) === getTrackFingerprint(savedTracks.slice(0, 8));

      if (tracks.length) {
        aiChatState.spotifyTrackPool = tracks;
        aiChatState.spotifyTracks = hasSamePool ? shuffleTracks(savedTracks).slice(0, 4) : tracks.slice(0, 4);
        saveSpotifyTracks(tracks);
        updateAiMusicCards();
      } else {
        aiChatState.spotifyTrackPool = savedTracks;
        aiChatState.spotifyTracks = savedTracks.length ? shuffleTracks(savedTracks).slice(0, 4) : [];
        updateAiMusicCards();
      }
      return tracks;
    })
    .catch(() => {
      const savedTracks = readSavedSpotifyTracks();
      aiChatState.spotifyTrackPool = savedTracks;
      aiChatState.spotifyTracks = savedTracks.length ? shuffleTracks(savedTracks).slice(0, 4) : [];
      updateAiMusicCards();
      return [];
    });

  return aiChatState.spotifyTracksPromise;
}

function renderAiMusicCardContent(lifeCard, item = {}, options = {}) {
  const header = document.createElement('div');
  header.className = 'ai-chat-music-header';

  const title = document.createElement('strong');
  title.className = 'ai-chat-music-title';
  title.textContent = item.title || '最近在听';

  header.append(title, renderAiMusicRefreshButton());
  if (options.compactHeader) {
    header.classList.add('is-compact');
  }

  const grid = document.createElement('div');
  grid.className = 'ai-chat-music-grid';
  grid.dataset.aiMusicGrid = 'true';
  const musicTracks = getAiMusicTracks(item.tracks || []);
  if (musicTracks.length) {
    musicTracks.forEach((track) => {
      const trackEl = renderAiMusicTrack(track);
      grid.appendChild(trackEl);
    });
  } else {
    grid.appendChild(renderAiMusicLoading());
  }

  lifeCard.append(header, grid);
  loadAiSpotifyTracks();
}

function updateAiLifeCarousel(carousel) {
  if (!carousel) {
    return;
  }

  const cards = [...carousel.querySelectorAll('.ai-chat-life-card')];
  const activeIndex = Number(carousel.dataset.activeIndex || 0);
  const total = cards.length;

  cards.forEach((card, index) => {
    let offset = index - activeIndex;
    if (total > 2) {
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
    }

    card.dataset.offset = String(offset);
    card.style.setProperty('--life-card-offset', offset);
    card.style.setProperty('--life-card-abs-offset', Math.min(Math.abs(offset), 3));
    card.style.zIndex = String(20 - Math.abs(offset));
  });
}

function attachAiLifeCarousel(carousel) {
  if (!carousel) {
    return;
  }

  let isDragging = false;
  let startX = 0;
  const cards = [...carousel.querySelectorAll('.ai-chat-life-card')];
  const total = cards.length;

  const setActiveIndex = (nextIndex) => {
    if (!total) {
      return;
    }

    carousel.dataset.activeIndex = String((nextIndex + total) % total);
    updateAiLifeCarousel(carousel);
  };

  carousel.dataset.activeIndex = carousel.dataset.activeIndex || '0';
  const controls = carousel.querySelector('.ai-chat-life-controls');
  controls?.addEventListener('pointerdown', (event) => {
    event.stopPropagation();
  });
  controls?.addEventListener('pointerup', (event) => {
    event.stopPropagation();
  });

  carousel.querySelector('[data-life-prev]')?.addEventListener('click', (event) => {
    event.stopPropagation();
    setActiveIndex(Number(carousel.dataset.activeIndex || 0) - 1);
  });
  carousel.querySelector('[data-life-next]')?.addEventListener('click', (event) => {
    event.stopPropagation();
    setActiveIndex(Number(carousel.dataset.activeIndex || 0) + 1);
  });

  carousel.addEventListener('pointerdown', (event) => {
    isDragging = true;
    startX = event.clientX;
    carousel.classList.add('is-dragging');
    carousel.setPointerCapture?.(event.pointerId);
  });

  carousel.addEventListener('pointermove', (event) => {
    if (isDragging) event.preventDefault();
  });

  const stopDragging = (event) => {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    carousel.classList.remove('is-dragging');
    carousel.releasePointerCapture?.(event.pointerId);
    const deltaX = event.clientX - startX;
    if (Math.abs(deltaX) > 34) {
      setActiveIndex(Number(carousel.dataset.activeIndex || 0) + (deltaX < 0 ? 1 : -1));
    }
  };

  carousel.addEventListener('pointerup', stopDragging);
  carousel.addEventListener('pointercancel', stopDragging);
  carousel.addEventListener('pointerleave', stopDragging);
  carousel.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaX) < 10 && Math.abs(event.deltaY) < 10) {
      return;
    }

    event.preventDefault();
    setActiveIndex(Number(carousel.dataset.activeIndex || 0) + (event.deltaX + event.deltaY > 0 ? 1 : -1));
  }, { passive: false });

  requestAnimationFrame(() => updateAiLifeCarousel(carousel));
}

function renderAiFeedbackCard(card) {
  const cardEl = document.createElement('div');
  cardEl.className = 'ai-chat-feedback-card';
  cardEl.dataset.cardType = card.type;

  if (card.title) {
    const title = document.createElement('div');
    title.className = 'ai-chat-feedback-title';
    title.textContent = card.title;
    cardEl.appendChild(title);
  }

  if (card.type === 'contact') {
    const grid = document.createElement('div');
    grid.className = 'ai-chat-contact-grid';

    (card.items || []).forEach((item) => {
      const button = document.createElement('button');
      button.className = 'ai-chat-contact-item';
      button.type = 'button';

      const icon = document.createElement('span');
      icon.className = 'ai-chat-contact-icon';
      icon.textContent = getAiCardIcon(item.icon);

      const label = document.createElement('span');
      label.textContent = item.label || item.value || 'Contact';

      button.append(icon, label);
      button.addEventListener('click', () => handleAiCardAction(item));
      grid.appendChild(button);
    });

    cardEl.appendChild(grid);
    return cardEl;
  }

  if (card.type === 'life') {
    const carousel = document.createElement('div');
    carousel.className = 'ai-chat-life-carousel';
    carousel.setAttribute('aria-label', card.title || '生活中的我');
    carousel.dataset.activeIndex = '0';

    const track = document.createElement('div');
    track.className = 'ai-chat-life-track';
    const lifeItems = getDefaultAiLifeItems();

    lifeItems.forEach((item, index) => {
      const lifeCard = document.createElement('article');
      lifeCard.className = `ai-chat-life-card ai-chat-life-card-${item.type || 'text'}`;
      lifeCard.style.setProperty('--life-card-accent', item.accent || ['#D2FD5F', '#74B0FF', '#FF5CA6'][index % 3]);

      if (item.type === 'music') {
        renderAiMusicCardContent(lifeCard, item);
      } else if (item.type === 'dogs') {
        const title = document.createElement('strong');
        title.className = 'ai-chat-life-heading';
        title.textContent = item.title || '';

        const dogGrid = document.createElement('div');
        dogGrid.className = 'ai-chat-dog-grid';
        (item.images || []).forEach((image) => {
          const figure = document.createElement('figure');
          figure.className = 'ai-chat-dog-photo';

          const img = document.createElement('img');
          img.src = image.src || '';
          img.alt = image.label || item.title || '狗狗照片';

          figure.appendChild(img);
          dogGrid.appendChild(figure);
        });

        lifeCard.append(title, dogGrid);
      } else if (item.type === 'quote') {
        const title = document.createElement('strong');
        title.className = 'ai-chat-life-quote';
        title.textContent = item.title || '';

        const description = document.createElement('span');
        description.className = 'ai-chat-life-description';
        description.textContent = item.description || '';

        lifeCard.append(title, description);
      } else if (item.type === 'book') {
        const copy = document.createElement('div');
        copy.className = 'ai-chat-book-copy';

        const title = document.createElement('strong');
        title.className = 'ai-chat-life-heading';
        title.textContent = item.title || '';

        const description = document.createElement('span');
        description.className = 'ai-chat-life-description';
        description.textContent = item.description || '';

        copy.append(title, description);

        const cover = document.createElement('img');
        cover.className = 'ai-chat-book-cover';
        cover.src = item.image || '';
        cover.alt = item.title || '书籍封面';

        lifeCard.append(copy, cover);
      } else if (item.type === 'friend') {
        const title = document.createElement('strong');
        title.className = 'ai-chat-life-friend-title';
        title.textContent = item.title || '';

        const description = document.createElement('span');
        description.className = 'ai-chat-life-description';
        description.textContent = item.description || '';

        lifeCard.append(title, description);
      } else {
        const marker = document.createElement('span');
        marker.className = 'ai-chat-life-marker';
        marker.textContent = String(index + 1).padStart(2, '0');

        const title = document.createElement('strong');
        title.textContent = item.title || '';

        const description = document.createElement('span');
        description.textContent = item.description || '';

        lifeCard.append(marker, title, description);
      }
      track.appendChild(lifeCard);
    });

    const controls = document.createElement('div');
    controls.className = 'ai-chat-life-controls';
    controls.innerHTML = `
      <button type="button" data-life-prev aria-label="上一张生活卡片">‹</button>
      <button type="button" data-life-next aria-label="下一张生活卡片">›</button>
    `;

    carousel.append(track, controls);
    cardEl.appendChild(carousel);
    attachAiLifeCarousel(carousel);
    return cardEl;
  }

  if (card.type === 'music') {
    const musicWrap = document.createElement('div');
    musicWrap.className = 'ai-chat-single-music';
    const musicCard = document.createElement('article');
    musicCard.className = 'ai-chat-life-card ai-chat-life-card-music';
    musicCard.dataset.offset = '0';
    musicCard.style.setProperty('--life-card-accent', '#74B0FF');
    musicCard.style.setProperty('--life-card-offset', 0);
    musicCard.style.setProperty('--life-card-abs-offset', 0);
    renderAiMusicCardContent(musicCard, { title: card.title || '最近在听', tracks: [] }, { compactHeader: true });
    musicWrap.appendChild(musicCard);
    cardEl.appendChild(musicWrap);
    return cardEl;
  }

  if (card.type === 'projects' || card.type === 'profile') {
    const list = document.createElement('div');
    list.className = card.type === 'profile' ? 'ai-chat-profile-list' : 'ai-chat-project-list';

    (card.items || []).forEach((item) => {
      const galleryName = card.type === 'projects' ? getAiProjectGallery(item) : '';
      const project = document.createElement(galleryName ? 'button' : 'div');
      project.className = card.type === 'profile' ? 'ai-chat-profile-item' : 'ai-chat-project-item';

      if (galleryName) {
        project.type = 'button';
        project.dataset.projectGallery = galleryName;
        project.dataset.cursorIcon = 'view';
        project.setAttribute('aria-label', `打开项目 ${item.title || '详情'}`);
        project.addEventListener('click', () => {
          setAiChatOpen(false);
          openProjectViewerByGallery?.(galleryName);
        });
        attachCursorBehavior(project);
      }

      const title = document.createElement('strong');
      title.textContent = item.title || '项目';
      project.appendChild(title);

      if (item.description) {
        const description = document.createElement('span');
        description.textContent = item.description;
        project.appendChild(description);
      }

      if (item.tag) {
        const tag = document.createElement('em');
        tag.textContent = item.tag;
        project.appendChild(tag);
      }

      list.appendChild(project);
    });

    cardEl.appendChild(list);
    return cardEl;
  }

  if (card.type === 'tags') {
    const tags = document.createElement('div');
    tags.className = 'ai-chat-tag-list';

    (card.items || []).forEach((item) => {
      const tag = document.createElement('span');
      tag.textContent = typeof item === 'string' ? item : item.label || item.title || '';
      if (tag.textContent) {
        tags.appendChild(tag);
      }
    });

    cardEl.appendChild(tags);
    return cardEl;
  }

  if (card.type === 'timeline') {
    const timeline = document.createElement('div');
    timeline.className = 'ai-chat-timeline';

    (card.items || []).forEach((item) => {
      const row = document.createElement('div');
      row.className = 'ai-chat-timeline-item';
      const title = document.createElement('strong');
      title.textContent = item.title || '';
      const description = document.createElement('span');
      description.textContent = item.description || '';
      row.append(title, description);
      timeline.appendChild(row);
    });

    cardEl.appendChild(timeline);
    return cardEl;
  }

  return cardEl;
}

function renderAiSuggestions(suggestions) {
  if (!Array.isArray(suggestions) || !suggestions.length) {
    return null;
  }

  const wrap = document.createElement('div');
  wrap.className = 'ai-chat-suggestions';

  suggestions.slice(0, 3).forEach((suggestion) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = suggestion;
    button.addEventListener('click', () => sendAiChatMessage(suggestion));
    wrap.appendChild(button);
  });

  return wrap;
}

function setAiChatStarterOptions(suggestions = DEFAULT_AI_CHAT_STARTERS) {
  if (!aiChatStarters) {
    return;
  }

  const options = (Array.isArray(suggestions) ? suggestions : [])
    .filter((item) => typeof item === 'string' && item.trim())
    .slice(0, 6);
  const nextOptions = options.length ? options : DEFAULT_AI_CHAT_STARTERS;
  const isSamePool =
    nextOptions.length === aiChatState.starterOptions.length &&
    nextOptions.every((item, index) => item === aiChatState.starterOptions[index]);

  aiChatState.starterOptions = nextOptions;
  aiChatState.starterIndex = isSamePool
    ? (aiChatState.starterIndex + 1) % nextOptions.length
    : 0;
  const visibleOptions = Array.from({ length: Math.min(3, nextOptions.length) }, (_, index) => {
    const optionIndex = (aiChatState.starterIndex + index) % nextOptions.length;
    return nextOptions[optionIndex];
  });

  aiChatStarters.innerHTML = '';
  visibleOptions.forEach((suggestion) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.aiChatStarter = suggestion;
    button.textContent = suggestion;
    aiChatStarters.appendChild(button);
  });
}

function renderAiChatMessages() {
  if (!aiChatMessages) {
    return;
  }

  aiChatMessages.innerHTML = '';

  aiChatState.messages.forEach((message) => {
    const item = document.createElement('div');
    item.className = 'ai-chat-message';
    item.dataset.role = message.role;

    if (message.role === 'status') {
      item.classList.add('is-status');
    } else {
      if (message.isTyping) {
        item.classList.add('is-typing');
      }
      const meta = document.createElement('div');
      meta.className = 'ai-chat-message-meta';
      meta.textContent = message.role === 'user' ? 'You' : 'Long AI';
      item.appendChild(meta);
    }

    const bubble = document.createElement('div');
    bubble.className = 'ai-chat-bubble';
    bubble.textContent = message.text;
    item.appendChild(bubble);

    if (!message.isTyping && Array.isArray(message.cards) && message.cards.length) {
      const cardsWrap = document.createElement('div');
      cardsWrap.className = 'ai-chat-feedback';
      message.cards.forEach((card) => {
        cardsWrap.appendChild(renderAiFeedbackCard(card));
      });
      item.appendChild(cardsWrap);
    }

    aiChatMessages.appendChild(item);
  });

  aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
}

if (aiChatStarters) {
  aiChatStarters.addEventListener('click', (event) => {
    const starter = event.target.closest('[data-ai-chat-starter]');
    if (!starter) {
      return;
    }

    sendAiChatMessage(starter.dataset.aiChatStarter || starter.textContent || '');
  });
}

function ensureAiChatBooted() {
  if (aiChatState.hasBooted) {
    return;
  }

  aiChatState.hasBooted = true;
  setAiChatStarterOptions();
  aiChatState.messages.push({
    role: 'assistant',
    text: AI_CHAT_COPY.welcome,
    includeInHistory: false,
  });
  renderAiChatMessages();
}

function setAiChatOpen(nextOpen) {
  if (!aiChatSidebar || !aiChatToggle) {
    return;
  }

  aiChatState.isOpen = nextOpen;
  document.body.classList.toggle('is-chat-open', nextOpen);
  aiChatSidebar.setAttribute('aria-hidden', String(!nextOpen));
  aiChatToggle.setAttribute('aria-expanded', String(nextOpen));

  if (nextOpen) {
    ensureAiChatBooted();
    requestAnimationFrame(() => {
      aiChatInput?.focus();
    });
  }
}

function setAiChatSending(nextSending) {
  aiChatState.isSending = nextSending;

  if (aiChatInput) {
    aiChatInput.disabled = nextSending;
  }

  if (aiChatSend) {
    aiChatSend.disabled = nextSending;
    aiChatSend.textContent = nextSending ? '思考中…' : '发送';
  }
}

function buildAiChatHistoryPayload() {
  return aiChatState.messages
    .filter((message) => (message.role === 'user' || message.role === 'assistant') && message.includeInHistory !== false)
    .slice(-8)
    .map((message) => ({
      role: message.role,
      text: message.text,
    }));
}

function pushAiChatMessage(message) {
  aiChatState.messages.push(message);
  renderAiChatMessages();
}

function removeAiChatStatusMessages() {
  aiChatState.messages = aiChatState.messages.filter((message) => message.role !== 'status');
  renderAiChatMessages();
}

function typeAiChatAssistantMessage({ text, cards }) {
  return new Promise((resolve) => {
    const fullText = text || AI_CHAT_COPY.serviceUnavailable;
    const chars = Array.from(fullText);
    const message = {
      role: 'assistant',
      text: '',
      cards,
      isTyping: true,
    };
    let index = 0;

    if (aiChatState.typingTimer) {
      clearTimeout(aiChatState.typingTimer);
      aiChatState.typingTimer = null;
    }

    aiChatState.isTyping = true;
    aiChatState.messages.push(message);

    const typeNext = () => {
      if (index >= chars.length) {
        message.text = fullText;
        message.isTyping = false;
        aiChatState.isTyping = false;
        aiChatState.typingTimer = null;
        renderAiChatMessages();
        resolve();
        return;
      }

      const nextChar = chars[index];
      message.text += nextChar;
      index += 1;
      renderAiChatMessages();

      const delay = /[。！？!?；;，,]/.test(nextChar) ? AI_CHAT_TYPE_SPEED_MS * 5 : AI_CHAT_TYPE_SPEED_MS;
      aiChatState.typingTimer = setTimeout(typeNext, delay);
    };

    typeNext();
  });
}

async function sendAiChatMessage(rawText) {
  const messageText = rawText.trim();
  if (!messageText || aiChatState.isSending || aiChatState.isTyping) {
    return;
  }

  ensureAiChatBooted();
  pushAiChatMessage({
    role: 'user',
    text: messageText,
  });

  if (aiChatInput) {
    aiChatInput.value = '';
    autoResizeAiChatInput();
  }

  pushAiChatMessage({
    role: 'status',
    text: 'Long AI 正在思考...',
    includeInHistory: false,
  });

  setAiChatSending(true);

  try {
    const response = await fetch(aiChatEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: messageText,
        history: buildAiChatHistoryPayload(),
      }),
    });

    const data = await response.json().catch(() => ({}));

    removeAiChatStatusMessages();

    if (!response.ok) {
      const fallbackMessage =
        response.status === 404 ? AI_CHAT_COPY.notConfigured : data.error || AI_CHAT_COPY.serviceUnavailable;
      setAiChatStarterOptions();
      await typeAiChatAssistantMessage({
        text: fallbackMessage,
      });
      return;
    }

    setAiChatStarterOptions(data.suggestions);
    await typeAiChatAssistantMessage({
      text: data.reply || AI_CHAT_COPY.serviceUnavailable,
      cards: data.cards,
    });
  } catch (_error) {
    removeAiChatStatusMessages();
    setAiChatStarterOptions();
    await typeAiChatAssistantMessage({
      text: AI_CHAT_COPY.serviceUnavailable,
    });
  } finally {
    setAiChatSending(false);
  }
}

function updateBounds() {
  const rect = scene.getBoundingClientRect();

  states.forEach((state) => {
    state.anchorX = rect.width * state.anchorRatioX;
    state.anchorAbsoluteY = state.anchorY;
  });
}

function render(state) {
  const width = state.element.offsetWidth;
  const angleDegrees = state.angle * (180 / Math.PI);
  const cardX = state.anchorX - width / 2;

  state.element.style.left = `${cardX}px`;
  state.element.style.top = `${state.anchorAbsoluteY}px`;
  state.element.style.setProperty('--length', `${state.baseLength}px`);
  state.element.style.transform = `rotate(${angleDegrees}deg)`;

  if (stackCard) {
    const stackAngle = 16 + angleDegrees * 0.28;
    const swingOffsetX = Math.sin(state.angle) * state.baseLength * 0.34;
    const swingOffsetY = (1 - Math.cos(state.angle)) * state.baseLength * 0.16;
    const stackShiftX = swingOffsetX - 10;
    const stackShiftY = swingOffsetY - 10;
    stackCard.style.transform = `translate(${stackShiftX}px, ${stackShiftY}px) rotate(${stackAngle}deg)`;
  }
}

function animate() {
  const now = performance.now();

  states.forEach((state) => {
    if (state.introActive && now >= state.introEndTime) {
      state.introActive = false;
    }

    if (!state.dragging) {
      const restAngle = state.restRotation * (Math.PI / 180);
      const targetAngle = state.hoverActive ? state.hoverTargetAngle : restAngle;
      const returnForce = state.hoverActive ? PHYSICS.hoverFollow : PHYSICS.springBack;

      state.angularVelocity += -PHYSICS.gravity * Math.sin(state.angle);
      state.angularVelocity += (targetAngle - state.angle) * returnForce;
      state.angularVelocity *= state.hoverActive ? PHYSICS.hoverDamping : PHYSICS.damping;
      state.angle += state.angularVelocity;
      state.angle = clamp(state.angle, -PHYSICS.maxSwing, PHYSICS.maxSwing);

      if (!state.introActive && Math.abs(state.angle) < 0.0015 && Math.abs(state.angularVelocity) < 0.0015) {
        state.angle = state.restRotation * (Math.PI / 180);
        state.angularVelocity = 0;
      }
    }

    render(state);
  });

  requestAnimationFrame(animate);
}

function startDrag(state, event) {
  event.preventDefault();
  const rect = state.grip.getBoundingClientRect();
  state.introActive = false;
  state.dragging = true;
  state.dragPointerId = event.pointerId;
  state.dragOffsetX = event.clientX - (rect.left + rect.width / 2);
  state.dragOffsetY = event.clientY - rect.top;
  state.grip.setPointerCapture(event.pointerId);
}

function updateDrag(state, event) {
  const rect = scene.getBoundingClientRect();
  const gripRect = state.grip.getBoundingClientRect();
  const gripHeight = gripRect.height || state.element.offsetWidth / 0.72;
  const targetTopX = event.clientX - rect.left - state.dragOffsetX;
  const targetTopY = event.clientY - rect.top - state.dragOffsetY;
  const localX = clamp(targetTopX, 40, rect.width - 40);
  const localY = clamp(targetTopY, 120, rect.height - gripHeight - 32);
  const dx = localX - state.anchorX;
  const dy = Math.max(48, localY - state.anchorAbsoluteY);
  const nextAngle = clamp(-Math.atan2(dx, dy), -PHYSICS.maxSwing, PHYSICS.maxSwing);

  state.angularVelocity = (nextAngle - state.angle) * PHYSICS.dragVelocityFollow;
  state.angle += (nextAngle - state.angle) * PHYSICS.dragAngleFollow;
}

function updateHover(state, event) {
  const rect = state.grip.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const relativeX = clamp((event.clientX - centerX) / (rect.width / 2), -1, 1);

  state.introActive = false;
  state.hoverActive = true;
  state.hoverTargetAngle = relativeX * PHYSICS.hoverMaxSwing;
}

function endDrag(state) {
  state.dragging = false;
  state.dragPointerId = null;
}

states.forEach((state) => {
  state.grip.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') {
      updateHover(state, event);
    }
  });

  state.grip.addEventListener('pointerdown', (event) => startDrag(state, event));

  state.grip.addEventListener('pointermove', (event) => {
    if (!state.dragging && event.pointerType === 'mouse') {
      updateHover(state, event);
      return;
    }

    if (!state.dragging || event.pointerId !== state.dragPointerId) {
      return;
    }

    updateDrag(state, event);
  });

  const finish = (event) => {
    if (!state.dragging || event.pointerId !== state.dragPointerId) {
      return;
    }

    endDrag(state);
    if (event.pointerType === 'mouse') {
      updateHover(state, event);
    }
  };

  state.grip.addEventListener('pointerup', finish);
  state.grip.addEventListener('pointercancel', finish);
  state.grip.addEventListener('pointerleave', () => {
    state.hoverActive = false;
    state.hoverTargetAngle = state.restRotation * (Math.PI / 180);
  });
});

window.addEventListener('resize', updateBounds);

if (cursor) {
  const cursorIconMap = {
    drag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 12h.01"/>
        <path d="M16 12h.01"/>
        <path d="m17 7 5 5-5 5"/>
        <path d="m7 7-5 5 5 5"/>
        <path d="M8 12h.01"/>
      </svg>
    `,
    view: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    `,
    click: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M14 4.1 12 6"/>
        <path d="m5.1 8-2.9-.8"/>
        <path d="m6 12-1.9 2"/>
        <path d="M7.2 2.2 8 5.1"/>
        <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"/>
      </svg>
    `,
    type: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 4v16"/>
        <path d="M8 4h8"/>
        <path d="M8 20h8"/>
      </svg>
    `,
  };

  const setCursorIcon = (iconName, label) => {
    if (!cursorIcon) {
      return;
    }

    if (label) {
      cursor.classList.remove('has-icon');
      cursor.classList.add('has-label');
      cursorIcon.textContent = label;
      return;
    }

    if (!iconName || !cursorIconMap[iconName]) {
      cursor.classList.remove('has-icon');
      cursor.classList.remove('has-label');
      cursorIcon.innerHTML = '';
      return;
    }

    cursor.classList.remove('has-label');
    cursorIcon.innerHTML = cursorIconMap[iconName];
    cursor.classList.add('has-icon');
  };

  window.addEventListener('mousemove', (event) => {
    cursor.classList.add('is-visible');
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  window.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-visible');
    cursor.classList.remove('has-icon');
    cursor.classList.remove('has-label');
  });

  attachCursorBehavior = (target) => {
    if (!target || target.dataset.cursorReady === 'true') {
      return;
    }

    target.dataset.cursorReady = 'true';
    target.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hovering');
      setCursorIcon(target.dataset.cursorIcon, target.dataset.cursorLabel);
    });

    target.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hovering');
      setCursorIcon('', '');
    });
  };

  const hoverTargets = [...document.querySelectorAll('a, button, [data-card], [data-cursor-icon]')];
  hoverTargets.forEach(attachCursorBehavior);
}

if (scrollTrigger) {
  scrollTrigger.addEventListener('click', () => {
    const targetSelector = scrollTrigger.dataset.scrollTarget;
    const target = document.querySelector(targetSelector);
    if (!target) {
      return;
    }

    const targetTop = window.scrollY + target.getBoundingClientRect().top - window.innerHeight * 0.12;
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });
  });
}

if (worksTabs.length && workCards.length) {
  const applyWorkFilter = (filter) => {
    worksTabs.forEach((tab) => {
      const active = tab.dataset.workFilter === filter;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    workCards.forEach((card) => {
      const categories = card.dataset.workCategory.split(' ');
      const visible = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-hidden', !visible);
    });
  };

  worksTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      applyWorkFilter(tab.dataset.workFilter);
    });
  });

  applyWorkFilter('all');
}

if (learningDrop && window.Matter) {
  const { Engine, Runner, Bodies, Body, Composite } = window.Matter;
  const words = [...learningDrop.querySelectorAll('span')];
  const learningCard = learningDrop.closest('.about-bento-card');
  const engine = Engine.create({ enableSleeping: true });
  const runner = Runner.create();
  const wordBodies = new Map();
  const boundaries = [];
  let dropTimers = [];
  let animationFrameId = 0;
  let cycleTimer = 0;
  let resizeTimer = 0;
  let isLearningHovering = false;
  let isLearningCycleRunning = false;

  engine.gravity.y = 0.72;

  const clearLearningPhysics = ({ keepTransforms = false } = {}) => {
    window.clearTimeout(cycleTimer);
    window.cancelAnimationFrame(animationFrameId);
    Runner.stop(runner);
    dropTimers.forEach((timer) => window.clearTimeout(timer));
    dropTimers = [];
    Composite.clear(engine.world, false);
    wordBodies.clear();
    boundaries.length = 0;
    words.forEach((word) => {
      if (!keepTransforms) {
        word.classList.remove('is-visible');
        word.style.transform = '';
      }
    });
  };

  const addLearningBoundaries = () => {
    const rect = learningDrop.getBoundingClientRect();
    const wall = 72;
    const innerInset = 0;
    const options = {
      isStatic: true,
      restitution: 0,
      friction: 1,
      render: { visible: false },
    };

    boundaries.push(
      Bodies.rectangle(rect.width / 2, rect.height + wall / 2, rect.width, wall, options),
      Bodies.rectangle(innerInset - wall / 2, rect.height / 2, wall, rect.height * 2.4, options),
      Bodies.rectangle(rect.width - innerInset + wall / 2, rect.height / 2, wall, rect.height * 2.4, options)
    );

    Composite.add(engine.world, boundaries);
  };

  const updateLearningWords = () => {
    wordBodies.forEach((body, word) => {
      const visualWidth = word.offsetWidth;
      const visualHeight = word.offsetHeight;
      const x = body.position.x - visualWidth / 2;
      const y = body.position.y - visualHeight / 2;
      word.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
      word.classList.toggle('is-visible', y > -visualHeight * 0.2);
    });

    animationFrameId = window.requestAnimationFrame(updateLearningWords);
  };

  const paintLearningWords = () => {
    wordBodies.forEach((body, word) => {
      const visualWidth = word.offsetWidth;
      const visualHeight = word.offsetHeight;
      const x = body.position.x - visualWidth / 2;
      const y = body.position.y - visualHeight / 2;
      word.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
      word.classList.add('is-visible');
    });
  };

  const addLearningWord = (word, index) => {
    const rect = learningDrop.getBoundingClientRect();
    const isCircle = word.classList.contains('learning-shape-circle');
    const isTriangle = word.classList.contains('learning-shape-triangle');
    const visualWidth = word.offsetWidth;
    const visualHeight = word.offsetHeight;
    const bodyWidth = Math.max(8, visualWidth + 1);
    const bodyHeight = Math.max(8, visualHeight + 1);
    const dropSlots = [0.58, 0.24, 0.14, 0.48, 0.28, 0.54, 0.42, 0.68, 0.36, 0.62, 0.72, 0.52];
    const safeInset = Math.max(visualWidth / 2 + 10, 34);
    const rawX = rect.width * (dropSlots[index % dropSlots.length]);
    const x = clamp(rawX, safeInset, rect.width - safeInset);
    const isSquare = word.classList.contains('learning-shape-square');
    const bodyOptions = {
      chamfer:
        isCircle || isTriangle
          ? undefined
          : { radius: isSquare ? 12 : bodyHeight / 2 },
      restitution: 0.02,
      friction: 0.7,
      frictionStatic: 1,
      frictionAir: 0.012,
      density: 0.006,
      render: { visible: false },
    };
    const startY = -bodyHeight * 1.6 - index * 7;
    const body = isCircle
      ? Bodies.circle(x, startY, bodyWidth / 2, bodyOptions)
      : isTriangle
        ? Bodies.polygon(x, startY, 3, bodyWidth / 2, bodyOptions)
        : Bodies.rectangle(x, startY, bodyWidth, bodyHeight, bodyOptions);

    Body.setPosition(body, { x, y: startY });
    Body.setVelocity(body, { x: 0, y: 0 });
    Body.setAngularVelocity(body, ((index % 3) - 1) * 0.018);
    Body.setAngle(body, ((index % 7) - 3) * 0.1);
    wordBodies.set(word, body);
    Composite.add(engine.world, body);
  };

  const settleLearningStack = () => {
    clearLearningPhysics();
    learningDrop.classList.add('is-physics-positioned');
    learningDrop.classList.remove('is-animating', 'is-fading');
    addLearningBoundaries();
    words.forEach((word, index) => addLearningWord(word, index));

    for (let step = 0; step < 420; step += 1) {
      Engine.update(engine, 1000 / 60);
    }

    paintLearningWords();
    clearLearningPhysics({ keepTransforms: true });
  };

  const finishLearningCycle = () => {
    isLearningCycleRunning = false;
    learningDrop.classList.remove('is-animating', 'is-fading');
    paintLearningWords();
    clearLearningPhysics({ keepTransforms: true });

    if (isLearningHovering) {
      cycleTimer = window.setTimeout(() => {
        learningDrop.classList.add('is-fading');
        cycleTimer = window.setTimeout(runLearningCycle, 360);
      }, 520);
    }
  };

  function runLearningCycle() {
    clearLearningPhysics();
    isLearningCycleRunning = true;
    learningDrop.classList.add('is-physics-positioned', 'is-animating');
    learningDrop.classList.remove('is-fading');
    addLearningBoundaries();
    Runner.run(runner, engine);
    updateLearningWords();

    dropTimers = words.map((word, index) =>
      window.setTimeout(() => addLearningWord(word, index), index * 240)
    );

    cycleTimer = window.setTimeout(finishLearningCycle, words.length * 240 + 3200);
  }

  const restartLearningCycle = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (isLearningCycleRunning) {
        return;
      }
      settleLearningStack();
    }, 240);
  };

  const startLearningCycle = () => {
    if (isLearningHovering) return;
    isLearningHovering = true;
    if (isLearningCycleRunning) return;
    learningDrop.classList.add('is-fading');
    cycleTimer = window.setTimeout(runLearningCycle, 280);
  };

  const stopLearningCycle = () => {
    isLearningHovering = false;
    if (!isLearningCycleRunning) {
      settleLearningStack();
    }
  };

  settleLearningStack();
  learningCard?.addEventListener('mouseenter', startLearningCycle);
  learningCard?.addEventListener('mouseleave', stopLearningCycle);
  learningCard?.addEventListener('focusin', startLearningCycle);
  learningCard?.addEventListener('focusout', (event) => {
    if (!learningCard.contains(event.relatedTarget)) {
      stopLearningCycle();
    }
  });
  window.addEventListener('resize', restartLearningCycle);
} else if (learningDrop) {
  learningDrop.classList.add('is-static');
}

if (timePixelGroups.length) {
  const timeGlyphs = {
    '0': ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
    '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
    '2': ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
    '3': ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
    '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
    '5': ['11111', '10000', '10000', '11110', '00001', '00001', '11110'],
    '6': ['01110', '10000', '10000', '11110', '10001', '10001', '01110'],
    '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
    '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
    '9': ['01110', '10001', '10001', '01111', '00001', '00001', '01110'],
    ':': ['00000', '00100', '00100', '00000', '00100', '00100', '00000'],
    B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
    D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
    E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
    G: ['01110', '10001', '10000', '10111', '10001', '10001', '01110'],
    I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
    J: ['00111', '00010', '00010', '00010', '10010', '10010', '01100'],
    L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
    N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
    O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  };
  const timeModes = {
    london: {
      zone: 'Europe/London',
      location: 'LONDON',
      label: '切换为北京时间',
    },
    beijing: {
      zone: 'Asia/Shanghai',
      location: 'BEIJING',
      label: '切换为伦敦时间',
    },
  };
  let activeTimeMode = 'london';

  const renderPixelGroup = (group, value, isLocation = false) => {
    const glyph = timeGlyphs[value] || ['00000', '00000', '00000', '00000', '00000', '00000', '00000'];
    group.textContent = '';
    group.classList.toggle('is-location', isLocation);
    group.classList.toggle('is-colon', value === ':');
    glyph.join('').split('').forEach((cell) => {
      const pixel = document.createElement('i');
      pixel.classList.toggle('is-on', cell === '1');
      group.append(pixel);
    });
  };

  const getTimeText = (zone) =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: zone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());

  const renderTimeCard = () => {
    const mode = timeModes[activeTimeMode];
    const timeText = getTimeText(mode.zone).slice(0, 5).padEnd(5, ' ');
    const locationText = mode.location.slice(0, 7).padEnd(7, ' ');
    const displayText = `${timeText}  ${locationText}`;

    timePixelGroups.forEach((group, index) => {
      renderPixelGroup(group, displayText[index] || ' ', index >= 7);
    });

    if (timeToggle) {
      const isBeijing = activeTimeMode === 'beijing';
      timeToggle.classList.toggle('is-active', isBeijing);
      timeToggle.setAttribute('aria-pressed', String(isBeijing));
      timeToggle.setAttribute('aria-label', mode.label);
    }
  };

  timeToggle?.addEventListener('click', () => {
    activeTimeMode = activeTimeMode === 'london' ? 'beijing' : 'london';
    renderTimeCard();
  });

  renderTimeCard();
  window.setInterval(renderTimeCard, 30000);
}

if (guestbookForm && guestbookInput && guestbookCount && guestbookList) {
  const guestbookStorageKey = 'long-portfolio-guestbook';
  const guestbookLimit = 4;
  let guestbookIsSubmitting = false;

  const readGuestbookNotes = () => {
    try {
      const notes = JSON.parse(window.localStorage.getItem(guestbookStorageKey) || '[]');
      return Array.isArray(notes) ? notes : [];
    } catch {
      return [];
    }
  };

  const writeGuestbookNotes = (notes) => {
    window.localStorage.setItem(guestbookStorageKey, JSON.stringify(notes.slice(0, guestbookLimit)));
  };

  const renderGuestbookNotes = () => {
    const notes = readGuestbookNotes();
    guestbookList.innerHTML = '';

    if (!notes.length) {
      return;
    }

    notes.slice(0, 2).forEach((note) => {
      const item = document.createElement('div');
      item.className = 'guestbook-note';
      item.textContent = note.text;
      guestbookList.append(item);
    });
  };

  const updateGuestbookCount = () => {
    guestbookCount.textContent = `${guestbookInput.value.length}/80`;
  };

  guestbookInput.addEventListener('input', updateGuestbookCount);

  const submitGuestbookNote = () => {
    if (guestbookIsSubmitting) {
      return;
    }

    const text = guestbookInput.value.trim().replace(/\s+/g, ' ');

    if (!text) {
      showSiteToast('写点什么吧～');
      guestbookInput.focus();
      return;
    }

    guestbookIsSubmitting = true;
    const notes = readGuestbookNotes();
    writeGuestbookNotes([{ text, createdAt: new Date().toISOString() }, ...notes]);

    const completeSubmit = () => {
      guestbookInput.value = '';
      updateGuestbookCount();
      renderGuestbookNotes();
      guestbookPaper?.classList.remove('is-tearing');
      guestbookIsSubmitting = false;
    };

    if (!guestbookPaper) {
      completeSubmit();
      return;
    }

    guestbookPaper.classList.remove('is-tearing');
    void guestbookPaper.offsetWidth;
    guestbookPaper.classList.add('is-tearing');
    guestbookPaper.addEventListener('animationend', completeSubmit, { once: true });
  };

  guestbookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    submitGuestbookNote();
  });

  guestbookSubmitTrigger?.addEventListener('click', () => {
    submitGuestbookNote();
  });

  guestbookSubmitTrigger?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    submitGuestbookNote();
  });

  updateGuestbookCount();
  renderGuestbookNotes();
}

if (aboutAppOpen && aboutAppModal && aboutAppCardContainer && aboutAppCard) {
  const depthItems = [...aboutAppCard.querySelectorAll('[data-depth]')];

  depthItems.forEach((item) => {
    item.style.setProperty('--card-depth', `${Number(item.dataset.depth || 0)}px`);
  });

  const setAboutAppOpen = (isOpen) => {
    if (isOpen) {
      const buttonRect = aboutAppOpen.getBoundingClientRect();
      const originX = ((buttonRect.left + buttonRect.width / 2) / window.innerWidth) * 100;
      const originY = ((buttonRect.top + buttonRect.height / 2) / window.innerHeight) * 100;
      aboutAppModal.style.setProperty('--about-app-origin-x', `${originX}%`);
      aboutAppModal.style.setProperty('--about-app-origin-y', `${originY}%`);
    }

    aboutAppModal.classList.toggle('is-open', isOpen);
    aboutAppModal.setAttribute('aria-hidden', String(!isOpen));

    if (!isOpen) {
      aboutAppCard.style.transform = '';
    }
  };

  aboutAppOpen.addEventListener('click', () => {
    setAboutAppOpen(true);
  });

  aboutAppOpen.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    setAboutAppOpen(true);
  });

  aboutAppCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setAboutAppOpen(false);
    });
  });

  aboutAppModal.addEventListener('mousemove', (event) => {
    if (!aboutAppModal.classList.contains('is-open')) {
      return;
    }

    const rect = aboutAppModal.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    aboutAppCard.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  });

  aboutAppModal.addEventListener('mouseleave', () => {
    aboutAppCard.style.transform = '';
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && aboutAppModal.classList.contains('is-open')) {
      setAboutAppOpen(false);
    }
  });
}

if (aboutAppBento) {
  const edgePadding = 16;

  const updateAppGlow = (event) => {
    const rect = aboutAppBento.getBoundingClientRect();
    const localX = clamp(event.clientX - rect.left, edgePadding, rect.width - edgePadding);
    const localY = clamp(event.clientY - rect.top, edgePadding, rect.height - edgePadding);
    const distanceToLeft = localX;
    const distanceToRight = rect.width - localX;
    const distanceToTop = localY;
    const distanceToBottom = rect.height - localY;
    const nearestEdge = Math.min(distanceToLeft, distanceToRight, distanceToTop, distanceToBottom);
    let glowX = localX;
    let glowY = localY;

    if (nearestEdge === distanceToLeft) {
      glowX = edgePadding;
    } else if (nearestEdge === distanceToRight) {
      glowX = rect.width - edgePadding;
    } else if (nearestEdge === distanceToTop) {
      glowY = edgePadding;
    } else {
      glowY = rect.height - edgePadding;
    }

    aboutAppBento.style.setProperty('--app-glow-x', `${(glowX / rect.width) * 100}%`);
    aboutAppBento.style.setProperty('--app-glow-y', `${(glowY / rect.height) * 100}%`);
  };

  aboutAppBento.addEventListener('mousemove', updateAppGlow);
  aboutAppBento.addEventListener('mouseleave', () => {
    aboutAppBento.style.setProperty('--app-glow-x', '86%');
    aboutAppBento.style.setProperty('--app-glow-y', '84%');
  });
}

if (interestStage) {
  const interestItems = ['travel', 'book', 'music'];
  let interestIndex = 0;
  let activeInterest = interestItems[interestIndex];

  const setInterestMode = (mode, isInitial = false) => {
    const previousInterest = activeInterest;
    activeInterest = mode;
    interestStage.dataset.interestMode = mode;

    interestLabels.forEach((label) => {
      const isCurrent = label.dataset.interestLabel === mode;
      const isPrevious = !isInitial && previousInterest !== mode && label.dataset.interestLabel === previousInterest;

      label.classList.toggle('is-active', isCurrent);
      label.classList.toggle('is-exiting', isPrevious);

      if (isPrevious) {
        window.setTimeout(() => {
          label.classList.remove('is-exiting');
        }, 420);
      }
    });
  };

  const switchInterest = () => {
    interestIndex = (interestIndex + 1) % interestItems.length;
    setInterestMode(interestItems[interestIndex]);
  };

  setInterestMode(activeInterest, true);
  (interestCard || interestStage).addEventListener('click', switchInterest);
  interestStage.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      switchInterest();
    }
  });
}

if (
  projectViewer &&
  projectViewerPages &&
  projectViewerClose &&
  projectViewerPresent &&
  projectSlideImage &&
  projectSlideProgress &&
  projectSlideCount &&
  projectSlidePrev &&
  projectSlideNext &&
  projectCards.length
) {
  const projectGalleries = {
    'ai-thrombolysis': [
      './assets/project-ai-thrombolysis-pages/01.jpg',
      './assets/project-ai-thrombolysis-pages/02.jpg',
      './assets/project-ai-thrombolysis-pages/03.jpg',
      './assets/project-ai-thrombolysis-pages/04.jpg',
      './assets/project-ai-thrombolysis-pages/05.jpg',
      './assets/project-ai-thrombolysis-pages/06.jpg',
      './assets/project-ai-thrombolysis-pages/07.jpg',
      './assets/project-ai-thrombolysis-pages/08.jpg',
      './assets/project-ai-thrombolysis-pages/09.jpg',
      './assets/project-ai-thrombolysis-pages/10.jpg',
      './assets/project-ai-thrombolysis-pages/11.jpg',
      './assets/project-ai-thrombolysis-pages/12.jpg',
      './assets/project-ai-thrombolysis-pages/13.jpg',
      './assets/project-ai-thrombolysis-pages/14.jpg',
      './assets/project-ai-thrombolysis-pages/15.jpg',
      './assets/project-ai-thrombolysis-pages/16.jpg',
      './assets/project-ai-thrombolysis-pages/17.jpg',
      './assets/project-ai-thrombolysis-pages/18.jpg',
      './assets/project-ai-thrombolysis-pages/19.jpg',
      './assets/project-ai-thrombolysis-pages/20.jpg',
    ],
    iknow: [
      './assets/project-iknow-pages/01.jpg',
      './assets/project-iknow-pages/02.jpg',
      './assets/project-iknow-pages/03.jpg',
      './assets/project-iknow-pages/04.jpg',
      './assets/project-iknow-pages/05.jpg',
      './assets/project-iknow-pages/06.jpg',
      './assets/project-iknow-pages/07.jpg',
      './assets/project-iknow-pages/08.jpg',
      './assets/project-iknow-pages/09.jpg',
      './assets/project-iknow-pages/10.jpg',
      './assets/project-iknow-pages/11.jpg',
      './assets/project-iknow-pages/12.jpg',
      './assets/project-iknow-pages/13.jpg',
    ],
    'adhd-ai': [
      './assets/project-adhd-pages/01.jpg',
      './assets/project-adhd-pages/02.jpg',
      './assets/project-adhd-pages/03.jpg',
      './assets/project-adhd-pages/04.jpg',
      './assets/project-adhd-pages/05.jpg',
      './assets/project-adhd-pages/06.jpg',
      './assets/project-adhd-pages/07.jpg',
      './assets/project-adhd-pages/08.jpg',
    ],
    etea: [
      './assets/project-etea-pages/01.jpg',
      './assets/project-etea-pages/02.jpg',
      './assets/project-etea-pages/03.jpg',
      './assets/project-etea-pages/04.jpg',
      './assets/project-etea-pages/05.jpg',
      './assets/project-etea-pages/06.jpg',
      './assets/project-etea-pages/07.jpg',
      './assets/project-etea-pages/08.jpg',
      './assets/project-etea-pages/09.jpg',
      './assets/project-etea-pages/10.jpg',
      './assets/project-etea-pages/11.jpg',
    ],
    'marry-christmas': [
      './assets/project-marry-christmas-pages/01.jpg',
      './assets/project-marry-christmas-pages/02.jpg',
    ],
  };

  let activeProjectImages = [];
  let activeSlideIndex = 0;

  const updateProjectSlide = () => {
    if (!activeProjectImages.length) {
      return;
    }

    projectSlideImage.src = activeProjectImages[activeSlideIndex];
    projectSlideImage.alt = `项目放映页面 ${activeSlideIndex + 1}`;
    const progress = ((activeSlideIndex + 1) / activeProjectImages.length) * 100;
    projectSlideCount.textContent = `${activeSlideIndex + 1} / ${activeProjectImages.length}`;
    projectSlideProgress.style.setProperty('--project-slide-progress', `${progress}%`);
    if (projectSlideFrame) {
      projectSlideFrame.scrollTo({ top: 0, left: 0 });
    }
  };

  const goToProjectSlide = (direction) => {
    if (!activeProjectImages.length) {
      return;
    }

    activeSlideIndex =
      (activeSlideIndex + direction + activeProjectImages.length) % activeProjectImages.length;
    updateProjectSlide();
  };

  const enterPresentationMode = () => {
    if (!activeProjectImages.length) {
      return;
    }

    activeSlideIndex = 0;
    updateProjectSlide();
    projectViewer.classList.add('is-presenting');
    projectViewerPresent.setAttribute('aria-label', '退出放映模式');
  };

  const exitPresentationMode = () => {
    projectViewer.classList.remove('is-presenting');
    projectViewerPresent.setAttribute('aria-label', '进入放映模式');
  };

  const openProjectViewer = (galleryName) => {
    const images = projectGalleries[galleryName] || [];
    if (!images.length) {
      return;
    }
    activeProjectImages = images;
    activeSlideIndex = 0;
    projectViewerPages.innerHTML = images
      .map(
        (src, index) =>
          `<img class="project-viewer-page" src="${src}" alt="项目页面 ${index + 1}" loading="lazy">`
      )
      .join('');
    projectViewer.classList.add('is-open');
    projectViewer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  openProjectViewerByGallery = openProjectViewer;

  const closeProjectViewer = () => {
    exitPresentationMode();
    projectViewer.classList.remove('is-open');
    projectViewer.setAttribute('aria-hidden', 'true');
    projectViewerPages.innerHTML = '';
    projectSlideImage.removeAttribute('src');
    activeProjectImages = [];
    activeSlideIndex = 0;
    document.body.style.overflow = '';
  };

  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      openProjectViewer(card.dataset.projectGallery);
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectViewer(card.dataset.projectGallery);
      }
    });
  });

  projectViewerPresent.addEventListener('click', () => {
    if (projectViewer.classList.contains('is-presenting')) {
      exitPresentationMode();
      return;
    }

    enterPresentationMode();
  });

  projectSlidePrev.addEventListener('click', () => {
    goToProjectSlide(-1);
  });

  projectSlideNext.addEventListener('click', () => {
    goToProjectSlide(1);
  });

  projectViewerClose.addEventListener('click', closeProjectViewer);

  projectViewer.addEventListener('click', (event) => {
    if (event.target === projectViewer) {
      closeProjectViewer();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (!projectViewer.classList.contains('is-open')) {
      return;
    }

    if (projectViewer.classList.contains('is-presenting')) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToProjectSlide(-1);
      } else if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        goToProjectSlide(1);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        exitPresentationMode();
      }
      return;
    }

    if (event.key === 'Escape') {
      closeProjectViewer();
    }
  });
}

if (knowledgeEntries.length && knowledgeViewer && knowledgeViewerClose && knowledgeTitle && knowledgeDate && knowledgeCategory && knowledgeContent) {
  const renderKnowledgeContent = (article) =>
    article.content
      .map((block) => {
        const text = escapeHtml(block.text || '');
        if (block.type === 'h2') {
          return `<h2>${text}</h2>`;
        }
        return `<p>${text}</p>`;
      })
      .join('');

  const openKnowledgeArticle = (articleId) => {
    const article = knowledgeArticles[articleId];
    if (!article) {
      return;
    }

    knowledgeTitle.textContent = article.title;
    knowledgeDate.textContent = article.date;
    knowledgeDate.setAttribute('datetime', article.datetime);
    knowledgeCategory.textContent = article.category;
    knowledgeContent.innerHTML = renderKnowledgeContent(article);
    knowledgeViewer.classList.add('is-open');
    knowledgeViewer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeKnowledgeArticle = () => {
    knowledgeViewer.classList.remove('is-open');
    knowledgeViewer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  knowledgeEntries.forEach((entry) => {
    entry.addEventListener('click', () => {
      openKnowledgeArticle(entry.dataset.knowledgeEntry);
    });
  });

  knowledgeViewerClose.addEventListener('click', closeKnowledgeArticle);

  knowledgeViewer.addEventListener('click', (event) => {
    if (event.target === knowledgeViewer) {
      closeKnowledgeArticle();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && knowledgeViewer.classList.contains('is-open')) {
      closeKnowledgeArticle();
    }
  });
}

if (copyButtons.length) {
  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copyValue || '');
        showSiteToast('复制成功');
      } catch (_error) {
        showSiteToast('复制失败');
      }
    });
  });
}

function showVersionUpdate(version) {
  if (!versionUpdate || !versionUpdateValue) {
    return;
  }

  versionUpdateValue.textContent = version;
  versionUpdate.setAttribute('aria-hidden', 'false');
  versionUpdate.classList.add('is-visible');
}

async function fetchSiteVersion() {
  const response = await fetch(`/version.json?t=${Date.now()}`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Version check failed.');
  }

  const data = await response.json();
  return typeof data.version === 'string' ? data.version.trim() : '';
}

function initVersionUpdateCheck() {
  if (!versionUpdate || !versionUpdateRefresh) {
    return;
  }

  let currentVersion = '';
  let hasUpdate = false;

  const checkVersion = async () => {
    if (hasUpdate) {
      return;
    }

    try {
      const nextVersion = await fetchSiteVersion();
      if (!nextVersion) {
        return;
      }

      if (!currentVersion) {
        currentVersion = nextVersion;
        return;
      }

      if (nextVersion !== currentVersion) {
        hasUpdate = true;
        showVersionUpdate(nextVersion);
      }
    } catch (_error) {
      // Ignore transient network errors; the next interval will try again.
    }
  };

  versionUpdateRefresh.addEventListener('click', () => {
    window.location.reload();
  });

  checkVersion();
  window.setInterval(checkVersion, VERSION_CHECK_INTERVAL_MS);
}

initVersionUpdateCheck();

if (aiChatToggle && aiChatSidebar && aiChatForm && aiChatInput) {
  autoResizeAiChatInput();

  aiChatToggle.addEventListener('click', () => {
    setAiChatOpen(!aiChatState.isOpen);
  });

  aiAgentCard?.addEventListener('click', () => {
    setAiChatOpen(true);
  });

  aiAgentCard?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    setAiChatOpen(true);
  });

  aiChatClose?.addEventListener('click', () => {
    setAiChatOpen(false);
  });

  aiChatInput.addEventListener('input', autoResizeAiChatInput);

  aiChatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      aiChatForm.requestSubmit();
    }
  });

  aiChatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    sendAiChatMessage(aiChatInput.value);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && aiChatState.isOpen && !projectViewer?.classList.contains('is-open')) {
      setAiChatOpen(false);
    }
  });
}

if (navLinks.length && hero && aboutSection && worksSection && portfolioSection && knowledgeSection && contactWrapper && contactSection) {
  const sectionLabelMap = {
    home: '首页',
    about: '关于',
    works: '作品',
    knowledge: '个人知识库',
    contact: '联系方式',
  };

  const sectionMap = {
    home: hero,
    about: aboutSection,
    works: worksSection,
    knowledge: knowledgeSection,
    contact: contactWrapper,
  };

  const navOffsetMap = {
    home: () => 0,
    about: () => window.scrollY + aboutSection.getBoundingClientRect().top - window.innerHeight * 0.08,
    works: () => window.scrollY + portfolioSection.getBoundingClientRect().top - window.innerHeight * 0.08,
    knowledge: () => window.scrollY + knowledgeSection.getBoundingClientRect().top - window.innerHeight * 0.12,
    contact: () => window.scrollY + contactWrapper.getBoundingClientRect().top - window.innerHeight * 0.06,
  };

  const scrollToNavSection = (sectionName) => {
    const target = sectionMap[sectionName];
    if (!target) {
      return;
    }

    const resolver = navOffsetMap[sectionName];
    const targetTop =
      typeof resolver === 'function'
        ? resolver()
        : window.scrollY + target.getBoundingClientRect().top - window.innerHeight * 0.1;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });
  };

  const setActiveNavSection = (sectionName) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.dataset.navSection === sectionName);
    });

    if (pageIndicator) {
      pageIndicator.textContent = sectionLabelMap[sectionName] || sectionLabelMap.home;
    }
  };

  const updateActiveNavOnScroll = () => {
    const viewportMid = window.innerHeight * 0.45;
    let activeSection = 'home';

    if (contactWrapper.getBoundingClientRect().top <= viewportMid) {
      activeSection = 'contact';
    } else if (knowledgeSection.getBoundingClientRect().top <= viewportMid) {
      activeSection = 'knowledge';
    } else if (worksSection.getBoundingClientRect().top <= viewportMid) {
      activeSection = 'works';
    } else if (aboutSection.getBoundingClientRect().top <= viewportMid) {
      activeSection = 'about';
    }

    setActiveNavSection(activeSection);
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      setActiveNavSection(link.dataset.navSection);
      scrollToNavSection(link.dataset.navSection);
    });
  });

  window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });
  updateActiveNavOnScroll();
}

if (siteHeader) {
  let headerPinned = true;
  let headerHovering = false;

  const updateHeaderVisibility = () => {
    const shouldShow = window.scrollY <= 24 || headerPinned || headerHovering;
    siteHeader.classList.toggle('is-hidden', !shouldShow);
  };

  window.addEventListener('scroll', () => {
    if (window.scrollY <= 24) {
      headerPinned = true;
    } else if (!headerHovering) {
      headerPinned = false;
    }

    updateHeaderVisibility();
  });

  window.addEventListener('mousemove', (event) => {
    if (window.scrollY <= 24) {
      headerPinned = true;
    } else if (event.clientY <= 40) {
      headerPinned = true;
    } else if (!headerHovering) {
      headerPinned = false;
    }

    updateHeaderVisibility();
  });

  siteHeader.addEventListener('mouseenter', () => {
    headerHovering = true;
    headerPinned = true;
    updateHeaderVisibility();
  });

  siteHeader.addEventListener('mouseleave', () => {
    headerHovering = false;
    headerPinned = window.scrollY <= 24;
    updateHeaderVisibility();
  });

  updateHeaderVisibility();
}

if (hero && heroTitle) {
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateHeroIntro();
        }
      });
    },
    {
      threshold: 0.65,
    }
  );

  heroObserver.observe(hero);
}

updateBounds();
animate();
