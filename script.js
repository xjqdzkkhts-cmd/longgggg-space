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
const aiDock = document.querySelector('[data-ai-dock]');
const interestCard = document.querySelector('[data-interest-card]');
const interestStage = document.querySelector('[data-interest-stage]');
const aboutAppBento = document.querySelector('[data-about-app-bento]');
const aboutAppOpen = document.querySelector('[data-about-app-open]');
const aboutAppModal = document.querySelector('[data-about-app-modal]');
const aboutAppCloseButtons = [...document.querySelectorAll('[data-about-app-close]')];
const aboutAppCardContainer = document.querySelector('[data-about-app-card-container]');
const aboutAppCard = document.querySelector('[data-about-app-card]');
const worksSection = document.querySelector('#works');
const portfolioSection = document.querySelector('#works .works-showcase-inner');
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
const copyButtons = [...document.querySelectorAll('[data-copy-value]')];
const siteToast = document.querySelector('[data-site-toast]');
const cursorIcon = document.querySelector('.custom-cursor-icon');
const aiChatToggle = document.querySelector('[data-ai-chat-toggle]');
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
let openProjectViewerByGallery = null;
let attachCursorBehavior = () => {};
const aiChatState = {
  isOpen: false,
  isSending: false,
  hasBooted: false,
  messages: [],
};
const AI_CHAT_COPY = {
  welcome:
    '你好呀！我是龙湘玉的 AI分身，你可以询问我的过往经历、作品、生活风格等等。',
  serviceUnavailable: 'AI 服务暂时不可用，请稍后再试。',
  notConfigured: 'AI 服务还没有接通，请先部署 Vercel 后端并填写前端 API 地址。',
};
const DEFAULT_AI_CHAT_STARTERS = ['生活中的你是什么样？', '和你合作是什么感觉？', '你如何思考设计？'];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

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
    .slice(0, 3);
  const nextOptions = options.length ? options : DEFAULT_AI_CHAT_STARTERS;

  aiChatStarters.innerHTML = '';
  nextOptions.forEach((suggestion) => {
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
      const meta = document.createElement('div');
      meta.className = 'ai-chat-message-meta';
      meta.textContent = message.role === 'user' ? 'You' : 'Long AI';
      item.appendChild(meta);
    }

    const bubble = document.createElement('div');
    bubble.className = 'ai-chat-bubble';
    bubble.textContent = message.text;
    item.appendChild(bubble);

    if (Array.isArray(message.cards) && message.cards.length) {
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

async function sendAiChatMessage(rawText) {
  const messageText = rawText.trim();
  if (!messageText || aiChatState.isSending) {
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
      pushAiChatMessage({
        role: 'assistant',
        text: fallbackMessage,
      });
      setAiChatStarterOptions();
      return;
    }

    setAiChatStarterOptions(data.suggestions);
    pushAiChatMessage({
      role: 'assistant',
      text: data.reply || AI_CHAT_COPY.serviceUnavailable,
      cards: data.cards,
    });
  } catch (_error) {
    removeAiChatStatusMessages();
    setAiChatStarterOptions();
    pushAiChatMessage({
      role: 'assistant',
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
  const engine = Engine.create({ enableSleeping: true });
  const runner = Runner.create();
  const wordBodies = new Map();
  const boundaries = [];
  let dropTimers = [];
  let animationFrameId = 0;
  let cycleTimer = 0;
  let resizeTimer = 0;

  engine.gravity.y = 0.72;

  const clearLearningPhysics = () => {
    window.clearTimeout(cycleTimer);
    window.cancelAnimationFrame(animationFrameId);
    Runner.stop(runner);
    dropTimers.forEach((timer) => window.clearTimeout(timer));
    dropTimers = [];
    Composite.clear(engine.world, false);
    wordBodies.clear();
    boundaries.length = 0;
    words.forEach((word) => {
      word.classList.remove('is-visible');
      word.style.transform = '';
    });
  };

  const addLearningBoundaries = () => {
    const rect = learningDrop.getBoundingClientRect();
    const wall = 72;
    const innerInset = 4;
    const options = {
      isStatic: true,
      restitution: 0,
      friction: 1,
      render: { visible: false },
    };

    boundaries.push(
      Bodies.rectangle(rect.width / 2, rect.height - innerInset + wall / 2, rect.width, wall, options),
      Bodies.rectangle(innerInset - wall / 2, rect.height / 2, wall, rect.height * 2.4, options),
      Bodies.rectangle(rect.width - innerInset + wall / 2, rect.height / 2, wall, rect.height * 2.4, options)
    );

    Composite.add(engine.world, boundaries);
  };

  const updateLearningWords = () => {
    wordBodies.forEach((body, word) => {
      const visualWidth = word.offsetWidth;
      const visualHeight = word.offsetHeight;
      const rect = learningDrop.getBoundingClientRect();
      const x = clamp(body.position.x - visualWidth / 2, 0, rect.width - visualWidth);
      const y = clamp(body.position.y - visualHeight / 2, -visualHeight, rect.height - visualHeight);
      word.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
      word.classList.toggle('is-visible', y > -visualHeight * 0.2);
    });

    animationFrameId = window.requestAnimationFrame(updateLearningWords);
  };

  const addLearningWord = (word, index) => {
    const rect = learningDrop.getBoundingClientRect();
    const isCircle = word.classList.contains('learning-shape-circle');
    const isTriangle = word.classList.contains('learning-shape-triangle');
    const visualWidth = word.offsetWidth;
    const visualHeight = word.offsetHeight;
    const bodyWidth = Math.max(8, visualWidth - 2);
    const bodyHeight = Math.max(8, visualHeight - 2);
    const dropSlots = [0.24, 0.54, 0.38, 0.62, 0.3, 0.48, 0.34, 0.58, 0.42, 0.66, 0.52, 0.28, 0.6, 0.44, 0.56];
    const safeInset = Math.max(visualWidth / 2 + 10, 34);
    const rawX = rect.width * (dropSlots[index % dropSlots.length]);
    const x = clamp(rawX, safeInset, rect.width - safeInset);
    const bodyOptions = {
      chamfer: undefined,
      restitution: 0.08,
      friction: 0.35,
      frictionStatic: 1,
      frictionAir: 0.006,
      density: 0.004,
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
    Body.setAngularVelocity(body, 0);
    Body.setAngle(body, ((index % 5) - 2) * 0.05);
    wordBodies.set(word, body);
    Composite.add(engine.world, body);
  };

  const runLearningCycle = () => {
    clearLearningPhysics();
    learningDrop.classList.remove('is-fading');
    addLearningBoundaries();
    Runner.run(runner, engine);
    updateLearningWords();

    dropTimers = words.map((word, index) =>
      window.setTimeout(() => addLearningWord(word, index), index * 260)
    );

    cycleTimer = window.setTimeout(() => {
      learningDrop.classList.add('is-fading');
      cycleTimer = window.setTimeout(runLearningCycle, 900);
    }, words.length * 260 + 3300);
  };

  const restartLearningCycle = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(runLearningCycle, 240);
  };

  runLearningCycle();
  window.addEventListener('resize', restartLearningCycle);
} else if (learningDrop) {
  learningDrop.classList.add('is-static');
}

if (aiDock) {
  const aiIcons = [...aiDock.querySelectorAll('.about-ai-icon')];
  const minDistance = 50;
  const maxScale = 1.55;
  const influence = minDistance * Math.PI;
  let aiDockHovering = false;
  let aiDockCycleFrame = 0;
  let aiDockCycleStart = 0;

  const updateAiDockCycle = (timestamp) => {
    if (!aiDockCycleStart) {
      aiDockCycleStart = timestamp;
    }

    if (!aiDockHovering && aiIcons.length) {
      const elapsed = timestamp - aiDockCycleStart;
      const travelLength = Math.max(aiIcons.length - 1, 1);
      const phase = ((elapsed / 3400) % 1) * Math.PI * 2;
      const easedPosition = (1 - Math.cos(phase)) / 2;
      const activeIndex = easedPosition * travelLength;

      aiIcons.forEach((icon, index) => {
        const distance = Math.abs(index - activeIndex);
        const focus = Math.max(0, 1 - distance / 1.45);
        const bounce = 1 + Math.sin(focus * Math.PI) * 0.05;
        const scale = 1 + focus * 0.46 * bounce;
        const lift = focus * -6;

        icon.style.setProperty('--dock-x', '0px');
        icon.style.setProperty('--dock-y', `${lift}px`);
        icon.style.setProperty('--dock-scale', scale.toFixed(3));
      });
    }

    aiDockCycleFrame = window.requestAnimationFrame(updateAiDockCycle);
  };

  const resetAiDock = () => {
    aiIcons.forEach((icon) => {
      icon.style.setProperty('--dock-x', '0px');
      icon.style.setProperty('--dock-y', '0px');
      icon.style.setProperty('--dock-scale', '1');
    });
  };

  const updateAiDock = (event) => {
    aiDockHovering = true;
    const rect = aiDock.getBoundingClientRect();
    const centerRatio = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const rowShift = clamp(centerRatio, -1, 1) * 42;
    const pointer = event.clientX - rect.left - rowShift;

    aiIcons.forEach((icon, index) => {
      const iconCenter = index * minDistance + minDistance / 2;
      const distance = iconCenter - pointer;
      let localShift = distance < 0 ? -26 : 26;
      let scale = 1;

      if (-influence < distance && distance < influence) {
        const rad = (distance / minDistance) * 0.5;
        scale = 1 + (maxScale - 1) * Math.cos(rad);
        localShift = 32 * Math.sin(rad);
      }

      icon.style.setProperty('--dock-x', `${rowShift + localShift}px`);
      icon.style.setProperty('--dock-y', '0px');
      icon.style.setProperty('--dock-scale', scale.toFixed(3));
    });
  };

  aiDockCycleFrame = window.requestAnimationFrame(updateAiDockCycle);
  aiDock.addEventListener('mouseenter', () => {
    aiDockHovering = true;
  });
  aiDock.addEventListener('mousemove', updateAiDock);
  aiDock.addEventListener('mouseleave', () => {
    aiDockHovering = false;
  });
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

  aboutAppCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setAboutAppOpen(false);
    });
  });

  aboutAppCardContainer.addEventListener('mousemove', (event) => {
    const rect = aboutAppCardContainer.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    aboutAppCard.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  });

  aboutAppCardContainer.addEventListener('mouseleave', () => {
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

  const switchInterest = () => {
    interestIndex = (interestIndex + 1) % interestItems.length;
    interestStage.dataset.interestMode = interestItems[interestIndex];
  };

  interestStage.dataset.interestMode = interestItems[interestIndex];
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

if (copyButtons.length) {
  let toastTimer = 0;

  const showToast = (message) => {
    if (!siteToast) {
      return;
    }

    siteToast.textContent = message;
    siteToast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      siteToast.classList.remove('is-visible');
    }, 1400);
  };

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copyValue || '');
        showToast('复制成功');
      } catch (_error) {
        showToast('复制失败');
      }
    });
  });
}

if (aiChatToggle && aiChatSidebar && aiChatForm && aiChatInput) {
  autoResizeAiChatInput();

  aiChatToggle.addEventListener('click', () => {
    setAiChatOpen(!aiChatState.isOpen);
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

if (navLinks.length && hero && aboutSection && worksSection && portfolioSection && contactWrapper && contactSection) {
  const sectionLabelMap = {
    home: '首页',
    about: '关于',
    works: '作品',
    contact: '联系方式',
  };

  const sectionMap = {
    home: hero,
    about: aboutSection,
    works: worksSection,
    contact: contactWrapper,
  };

  const navOffsetMap = {
    home: () => 0,
    about: () => window.scrollY + aboutSection.getBoundingClientRect().top - window.innerHeight * 0.08,
    works: () => window.scrollY + portfolioSection.getBoundingClientRect().top - window.innerHeight * 0.08,
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
