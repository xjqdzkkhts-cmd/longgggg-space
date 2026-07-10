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
const aiToolCard = document.querySelector('.about-bento-card-ai');
const aiToolRows = [...document.querySelectorAll('.about-ai-tools-row')];
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
const languageMenu = document.querySelector('[data-language-menu]');
const languageToggle = document.querySelector('[data-language-toggle]');
const languageOptions = [...document.querySelectorAll('[data-language-option]')];
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
const siteScaleShell = document.querySelector('[data-site-scale-shell]');
const siteCanvas = document.querySelector('[data-site-canvas]');
const cursorIcon = document.querySelector('.custom-cursor-icon');
const revealItems = [...document.querySelectorAll('.reveal')];
const aiChatToggle = document.querySelector('[data-ai-chat-toggle]');
const aiAgentCard = document.querySelector('[data-agent-chat-card]');
const aiChatSidebar = document.querySelector('[data-ai-chat-sidebar]');
const aiChatClose = document.querySelector('[data-ai-chat-close]');
const aiChatMessages = document.querySelector('[data-ai-chat-messages]');
const aiChatStarters = document.querySelector('[data-ai-chat-starters]');
const aiChatForm = document.querySelector('[data-ai-chat-form]');
const aiChatInput = document.querySelector('[data-ai-chat-input]');
const aiChatSend = document.querySelector('[data-ai-chat-send]');
const heroRoleMap = {
  zh: ['UX设计师', 'Vibe Coder', 'HCI 爱好者', 'UI 设计师'],
  en: ['UX Designer', 'Vibe Coder', 'HCI Enthusiast', 'UI Designer'],
};
const heroCardSources = {
  UX设计师: './assets/user-card.png',
  'UX Designer': './assets/user-card.png',
  'Vibe Coder': './assets/hero-card-vibe-coder.png',
  'HCI 爱好者': './assets/hero-card-hci-lover.png',
  'HCI Enthusiast': './assets/hero-card-hci-lover.png',
  'UI 设计师': './assets/hero-card-ui-designer.png',
  'UI Designer': './assets/hero-card-ui-designer.png',
};
const workCardTintCache = new Map();
const workCardTintInflight = new Map();
let workCardColorSamplerPromise = null;
const aiChatApiBaseUrl = (window.LONG_AI_CONFIG?.apiBaseUrl || '').replace(/\/$/, '');
const aiChatEndpoint = `${aiChatApiBaseUrl}/api/chat`;
const musicRecentEndpoint = `${aiChatApiBaseUrl}/api/lastfm-recent`;
let openProjectViewerByGallery = null;

const cleanLandingUrl = () => {
  const isLocalPreview =
    window.location.protocol === 'file:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '0.0.0.0' ||
    window.location.hostname === '::1' ||
    window.location.hostname === '[::1]' ||
    window.location.pathname.includes('/Users/');

  if (isLocalPreview || !window.history?.replaceState) {
    return;
  }

  const cleanPath = window.location.pathname.replace(/\/index\.html$/, '/');
  if (cleanPath === window.location.pathname && !window.location.hash) {
    return;
  }

  try {
    window.history.replaceState(null, '', `${cleanPath}${window.location.search || ''}`);
  } catch (_error) {
    // Some local file previews do not allow history rewrites.
  }
};

cleanLandingUrl();

const SITE_DESIGN_WIDTH = 1440;
const SITE_SCALE_MIN_WIDTH = 1101;

const updateSiteScale = () => {
  if (!siteScaleShell || !siteCanvas) return;

  const viewportWidth = window.innerWidth;
  const shouldScale = viewportWidth >= SITE_SCALE_MIN_WIDTH && viewportWidth < SITE_DESIGN_WIDTH;
  const scale = shouldScale ? viewportWidth / SITE_DESIGN_WIDTH : 1;

  document.documentElement.style.setProperty('--site-scale', scale.toFixed(4));
  document.body.classList.toggle('is-site-scaled', shouldScale);

  if (shouldScale) {
    const scaledHeight = Math.ceil(siteCanvas.scrollHeight * scale);
    document.documentElement.style.setProperty('--site-canvas-height', `${scaledHeight}px`);
  } else {
    document.documentElement.style.setProperty('--site-canvas-height', 'auto');
  }
};

let siteScaleFrame = 0;
const requestSiteScaleUpdate = () => {
  window.cancelAnimationFrame(siteScaleFrame);
  siteScaleFrame = window.requestAnimationFrame(updateSiteScale);
};

updateSiteScale();
window.addEventListener('resize', requestSiteScaleUpdate);
window.addEventListener('load', requestSiteScaleUpdate);

if (window.ResizeObserver && siteCanvas) {
  const siteScaleObserver = new ResizeObserver(requestSiteScaleUpdate);
  siteScaleObserver.observe(siteCanvas);
}
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
  zh: {
    welcome: '你好呀！我是龙湘玉的 AI分身，你可以询问我的过往经历、作品、生活风格等等。',
    serviceUnavailable: 'AI 服务暂时不可用，请稍后再试。',
    notConfigured: 'AI 服务还没有接通，请先部署 Vercel 后端并填写前端 API 地址。',
  },
  en: {
    welcome:
      "Hi! I'm Long Xiangyu's AI persona. You can ask me about my background, projects, life style, and more.",
    serviceUnavailable: 'The AI service is temporarily unavailable. Please try again later.',
    notConfigured: 'The AI service is not connected yet. Please deploy the Vercel backend and set the frontend API address.',
  },
};
const DEFAULT_AI_CHAT_STARTERS = ['生活中的你是什么样？', '和你合作是什么感觉？', '你如何思考设计？'];
const defaultAiStarterLabelMap = new Map([
  ['生活中的你是什么样？', 'starterLife'],
  ['生活中的你是什么样的人？', 'starterLife'],
  ['和你合作是什么感觉？', 'starterWork'],
  ['和你一起工作会是什么感觉？', 'starterWork'],
  ['你如何思考设计？', 'starterDesign'],
  ['你的设计思考方式是什么？', 'starterDesign'],
]);
const SITE_LANGUAGE_STORAGE_KEY = 'long-portfolio-language';
const siteTranslations = {
  zh: {
    brandHome: '返回首页',
    navHome: '首页',
    navAbout: '关于',
    navWorks: '作品',
    navKnowledge: '个人知识库',
    navContact: '联系方式',
    languageToggle: '设置',
    heroGreeting: 'Hi,',
    heroName: '我是龙湘玉，',
    heroRolePrefix: '是一名',
    heroAbout: '热爱设计，也对 AI 产品充满好奇。希望创造<br />更自然、易用、有价值的体验。',
    heroContact: '联系',
    copyEmail: '复制邮箱',
    aboutTitleCn: '关于我',
    aboutTitleEn: 'About',
    aboutLearning: '学习历程',
    degreeMaster: '硕士',
    degreeBachelor: '学士',
    schoolUcl: 'UCL (QS9)',
    schoolHust: 'HUST (985)',
    schoolUclFull: '伦敦大学学院（QS9）',
    schoolHustFull: '华中科技大学（985）',
    aboutExplore: '热衷探索',
    aboutGithub: 'Github',
    githubContribution: 'Contribution',
    aboutInterests: '兴趣广泛',
    switchInterest: '切换兴趣动画',
    aboutGrounded: '落地项目',
    viewBbhust: '查看 BBHust 项目详情',
    bbhustSubtitle: 'Hust 校园论坛',
    socialTag: '社交',
    switchTime: '切换为北京时间',
    switchTimeToBeijing: '切换为北京时间',
    switchTimeToLondon: '切换为伦敦时间',
    guestbookInput: '留言',
    guestbookSubmit: '提交留言',
    guestbookEmptyToast: '写点什么吧～',
    openAgent: '打开个人 AI Agent 对话窗口',
    worksTitleCn: '项目',
    worksTitleEn: 'Works',
    worksFilterLabel: '项目分类',
    filterPlugin: '插件',
    filterProduct: '产品',
    filterVisual: '平面',
    knowledgeTitleCn: '文章',
    knowledgeTitleEn: 'Knowledge',
    viewMore: '查看更多',
    contactEyebrow: '欢迎联系我',
    contactHeadline: '相信改变正在发生',
    contactEmail: '邮箱',
    contactPhone: '电话',
    contactWechat: '微信',
    copyPhoneCn: '复制电话 86-19186818073',
    copyPhoneUk: '复制电话 44-7962889579',
    copyWechat: '复制微信',
    floatingDockLabel: '快捷操作和当前位置',
    aiTitle: 'Ask Long',
    closeAiChat: '关闭 AI 对话窗口',
    starterLabel: '推荐问题',
    starterLife: '生活中的你是什么样？',
    starterWork: '和你合作是什么感觉？',
    starterDesign: '你如何思考设计？',
    aiInputLabel: '输入你想问龙湘玉 AI 分身的问题',
    aiInputPlaceholder: '你想了解我的哪些项目？',
    aiSend: '发送',
    aiThinking: '思考中…',
    aiMusicTitle: '最近在听',
    aiMusicLoading: '正在读取最近在听',
    aiMusicRefresh: '刷新最近在听',
  },
  en: {
    brandHome: 'Back to home',
    navHome: 'Home',
    navAbout: 'About',
    navWorks: 'Works',
    navKnowledge: 'Knowledge',
    navContact: 'Contact',
    languageToggle: 'Setting',
    heroGreeting: 'Hi,',
    heroName: 'I am Long Xiangyu,',
    heroRolePrefix: 'a',
    heroAbout: 'I love design and stay curious about AI products.<br />I hope to create experiences that feel natural, usable, and valuable.',
    heroContact: 'Contact',
    copyEmail: 'Copy Email',
    aboutTitleCn: 'About Me',
    aboutTitleEn: 'About',
    aboutLearning: 'Learning Journey',
    degreeMaster: 'Master',
    degreeBachelor: 'Bachelor',
    schoolUcl: 'UCL (QS9)',
    schoolHust: 'HUST (985)',
    schoolUclFull: 'University College London (QS9)',
    schoolHustFull: 'Huazhong University of Science and Technology (985)',
    aboutExplore: 'Tool Explorer',
    aboutGithub: 'Github',
    githubContribution: 'Contribution',
    aboutInterests: 'Wide Interests',
    switchInterest: 'Switch interest animation',
    aboutGrounded: 'Shipped Project',
    viewBbhust: 'View BBHust project detail',
    bbhustSubtitle: 'HUST campus forum',
    socialTag: 'Social',
    switchTime: 'Switch to Beijing time',
    switchTimeToBeijing: 'Switch to Beijing time',
    switchTimeToLondon: 'Switch to London time',
    guestbookInput: 'Message',
    guestbookSubmit: 'Submit message',
    guestbookEmptyToast: 'Write something first.',
    openAgent: 'Open personal AI Agent chat',
    worksTitleCn: 'Projects',
    worksTitleEn: 'Works',
    worksFilterLabel: 'Project categories',
    filterPlugin: 'Plugin',
    filterProduct: 'Product',
    filterVisual: 'Visual',
    knowledgeTitleCn: 'Articles',
    knowledgeTitleEn: 'Knowledge',
    viewMore: 'View more',
    contactEyebrow: 'Get in touch',
    contactHeadline: 'Change is already<br />happening',
    contactEmail: 'Email',
    contactPhone: 'Phone',
    contactWechat: 'WeChat',
    copyPhoneCn: 'Copy phone number 86-19186818073',
    copyPhoneUk: 'Copy phone number 44-7962889579',
    copyWechat: 'Copy WeChat ID',
    floatingDockLabel: 'Quick actions and current section',
    aiTitle: 'Ask Long',
    closeAiChat: 'Close AI chat',
    starterLabel: 'Suggested questions',
    starterLife: 'What are you like in life?',
    starterWork: 'What is it like to work with you?',
    starterDesign: 'How do you think about design?',
    aiInputLabel: 'Ask Long Xiangyu’s AI persona a question',
    aiInputPlaceholder: 'Which projects do you want to know about?',
    aiSend: 'Send',
    aiThinking: 'Thinking…',
    aiMusicTitle: 'Recently listening',
    aiMusicLoading: 'Loading recent music',
    aiMusicRefresh: 'Refresh recent music',
  },
};
const supportedSiteLanguages = Object.keys(siteTranslations);
const getSavedSiteLanguage = () => {
  try {
    const savedLanguage = window.localStorage?.getItem(SITE_LANGUAGE_STORAGE_KEY);
    return supportedSiteLanguages.includes(savedLanguage) ? savedLanguage : 'zh';
  } catch (_error) {
    return 'zh';
  }
};
let currentSiteLanguage = getSavedSiteLanguage();
const getSiteText = (key, language = currentSiteLanguage) =>
  siteTranslations[language]?.[key] ?? siteTranslations.zh[key] ?? '';
const getAiChatCopy = (key) => AI_CHAT_COPY[currentSiteLanguage]?.[key] ?? AI_CHAT_COPY.zh[key] ?? '';
const getHeroRoles = () => heroRoleMap[currentSiteLanguage] || heroRoleMap.zh;
const getAiStarterLabel = (suggestion) => {
  const key = defaultAiStarterLabelMap.get(suggestion);
  return key ? getSiteText(key) : suggestion;
};
const setTextContentForKey = (element, key) => {
  const value = getSiteText(key);
  if (value) {
    element.textContent = value;
  }
};
const applySiteLanguage = (language, options = {}) => {
  const nextLanguage = supportedSiteLanguages.includes(language) ? language : 'zh';
  currentSiteLanguage = nextLanguage;
  document.documentElement.lang = nextLanguage === 'en' ? 'en' : 'zh-CN';
  document.documentElement.dataset.language = nextLanguage;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    setTextContentForKey(element, element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    const value = getSiteText(element.dataset.i18nHtml);
    if (value) {
      element.innerHTML = value;
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const value = getSiteText(element.dataset.i18nPlaceholder);
    if (value) {
      element.setAttribute('placeholder', value);
    }
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    const value = getSiteText(element.dataset.i18nAriaLabel);
    if (value) {
      element.setAttribute('aria-label', value);
    }
  });
  document.querySelectorAll('[data-i18n-title]').forEach((element) => {
    const value = getSiteText(element.dataset.i18nTitle);
    if (value) {
      element.setAttribute('title', value);
    }
  });
  document.querySelectorAll('[data-i18n-cursor-label]').forEach((element) => {
    const value = getSiteText(element.dataset.i18nCursorLabel);
    if (value) {
      element.dataset.cursorLabel = value;
    }
  });

  languageOptions.forEach((option) => {
    const isActive = option.dataset.languageOption === nextLanguage;
    option.classList.toggle('is-active', isActive);
    option.setAttribute('aria-checked', String(isActive));
  });

  if (languageToggle) {
    languageToggle.setAttribute('aria-expanded', 'false');
  }
  languageMenu?.classList.remove('is-open');

  if (!options.skipStorage) {
    try {
      window.localStorage?.setItem(SITE_LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch (_error) {
      // Local storage may be unavailable; language still changes for this session.
    }
  }

  if (currentRoleLayer && nextRoleLayer) {
    const firstRole = getHeroRoles()[0];
    if (typeof roleSwapState !== 'undefined') {
      window.clearTimeout(roleSwapState.timeoutId);
      roleSwapState.roleIndex = 0;
    }
    setDisplayedRole(firstRole);
    setHeroCardForRole(firstRole);
    if (hero?.classList.contains('is-active') && typeof roleSwapState !== 'undefined') {
      roleSwapState.timeoutId = window.setTimeout(scheduleRoleSwap, ROLE_SWAP.hold);
    }
  }

  if (aiChatSend && !aiChatState.isSending) {
    aiChatSend.textContent = getSiteText('aiSend');
  }

  aiChatStarters?.querySelectorAll('[data-ai-chat-starter]').forEach((button) => {
    button.textContent = getAiStarterLabel(button.dataset.aiChatStarter || button.textContent || '');
  });

  const welcomeMessage = aiChatState.messages.find((message) => message.isWelcome);
  if (welcomeMessage) {
    welcomeMessage.text = getAiChatCopy('welcome');
    renderAiChatMessages();
  }

  const activeNavLink = navLinks.find((link) => link.classList.contains('is-active'));
  if (pageIndicator && activeNavLink?.dataset.navSection) {
    const sectionKey = {
      home: 'navHome',
      about: 'navAbout',
      works: 'navWorks',
      knowledge: 'navKnowledge',
      contact: 'navContact',
    }[activeNavLink.dataset.navSection];
    if (sectionKey) {
      pageIndicator.textContent = getSiteText(sectionKey);
    }
  }
};
const knowledgeArticles = {
  '001': {
    source: './articles/001-card-blur.md',
    title: '如何实现卡片 UI 的渐变模糊效果',
    date: '2026.05',
    datetime: '2026-05',
    category: 'Design Notes',
    content: [
      { type: 'p', text: '卡片 UI 里的渐变模糊，本质上不是为了“做一个很炫的效果”，而是为了让信息层级更清楚。图片、文字、标签同时出现在一张卡片里时，如果只是直接叠放，文字很容易被背景干扰。渐变模糊可以把复杂背景慢慢压低，让内容自然浮出来。' },
      { type: 'h2', text: '先确定模糊服务于什么' },
      { type: 'p', text: '我通常会先判断这张卡片最重要的信息是什么。比如作品卡片里，图片负责建立第一印象，标题和标签负责帮助用户快速判断项目类型。渐变模糊应该服务于后者，而不是盖住前者。所以模糊区域一般只放在文字附近，从底部或边缘逐渐出现。' },
      { type: 'h2', text: '用多层叠加，而不是一层大模糊' },
      { type: 'p', text: '比较稳定的做法是把卡片拆成三层：底层是图片，中间是渐变遮罩，上层是文字内容。遮罩层可以由几段不同强度的 blur 组成，从轻到重逐层过渡。这样视觉会更柔和，不会出现一块突然变糊的生硬边界。' },
      { type: 'h2', text: '颜色要从图片里来' },
      { type: 'p', text: '如果遮罩只是固定黑色或白色，很多卡片会显得很模板化。更好的方式是根据图片主色动态生成一层轻微的 tint，让模糊区域和图片本身有关系。比如蓝色项目图可以带一点冷色遮罩，绿色项目图可以带一点低饱和绿色。这样每张卡片都有自己的气质，但整体仍然统一。' },
      { type: 'h2', text: '控制文字可读性' },
      { type: 'p', text: '渐变模糊最终还是要回到可读性。标题区域需要足够的对比度，标签不能被图片细节淹没。如果图片本身很亮，就需要更强的暗色遮罩；如果图片偏暗，可以减少遮罩强度，避免卡片变脏。实现时可以给卡片设置一个 contrast boost，根据图片亮度微调遮罩透明度。' },
      { type: 'h2', text: '实现思路' },
      { type: 'p', text: '在前端里，可以用绝对定位把 overlay 放在图片上方，再用多个 span 或伪元素分别设置不同的 backdrop-filter: blur()。每一层用 mask 或 linear-gradient 控制作用范围，让模糊从下往上逐渐减弱。文字内容放在最上层，并保持独立的 padding 和 z-index。' },
      { type: 'h2', text: '需要注意的细节' },
      { type: 'p', text: '第一，模糊不要铺满整张图，否则图片会失去展示价值。第二，模糊层不要太重，否则卡片会显得灰。第三，圆角、裁切和 hover 状态要一起处理，尤其是图片容器需要 overflow hidden 或 clip-path，否则模糊层可能溢出圆角。' },
      { type: 'h2', text: '总结' },
      { type: 'p', text: '好的渐变模糊不是单纯的视觉装饰，而是一种信息组织方式。它让图片保持情绪，让文字保持清晰，也让卡片在统一的系统里保留差异。实现时重点不是把 blur 调大，而是控制它出现的位置、范围、颜色和层级。' },
    ],
  },
  '002': {
    source: './articles/002-threejs-drop.md',
    title: '使用 Three.js 来实现 UI 元素掉落堆积效果',
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
    source: './articles/003-vibe-coding-animation.md',
    title: '更高效通过 Vibe Coding 来实现动画效果',
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
    source: './articles/004-parallax-card.md',
    title: '视差卡片效果如何实现',
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
const knowledgeArticleCache = new Map();
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
const parseMarkdownFrontmatter = (markdown) => {
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
const renderMarkdownInline = (value) => {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  return html;
};
const highlightCode = (code, language = '') => {
  const normalizedLanguage = language.trim().toLowerCase();
  let html = escapeHtml(code);
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
const markdownToBlocks = (markdown) => {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let paragraph = [];
  let list = [];
  let codeBlock = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({ type: 'p', html: renderMarkdownInline(paragraph.join(' ').trim()) });
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    blocks.push({ type: 'ul', items: list.map((item) => renderMarkdownInline(item)) });
    list = [];
  };

  const flushCodeBlock = () => {
    if (!codeBlock) return;
    blocks.push({
      type: 'code',
      language: codeBlock.language,
      code: codeBlock.lines.join('\n'),
    });
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
      blocks.push({ type: 'h2', html: renderMarkdownInline(trimmed.replace(/^##\s+/, '')) });
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
  return blocks;
};
const parseMarkdownArticle = (markdown, fallbackArticle) => {
  const { meta, body } = parseMarkdownFrontmatter(markdown);
  return {
    ...fallbackArticle,
    title: meta.title || fallbackArticle.title,
    date: meta.date || fallbackArticle.date,
    datetime: meta.datetime || meta.date || fallbackArticle.datetime,
    category: meta.category || fallbackArticle.category,
    content: markdownToBlocks(body),
  };
};
const loadKnowledgeArticle = async (articleId) => {
  const fallbackArticle = knowledgeArticles[articleId];
  if (!fallbackArticle) {
    return null;
  }

  if (knowledgeArticleCache.has(articleId)) {
    return knowledgeArticleCache.get(articleId);
  }

  if (!fallbackArticle.source) {
    knowledgeArticleCache.set(articleId, fallbackArticle);
    return fallbackArticle;
  }

  try {
    const response = await fetch(encodeURI(fallbackArticle.source), { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Unable to load ${fallbackArticle.source}`);
    }
    const markdown = await response.text();
    const article = parseMarkdownArticle(markdown, fallbackArticle);
    knowledgeArticleCache.set(articleId, article);
    return article;
  } catch (error) {
    console.warn(error);
    knowledgeArticleCache.set(articleId, fallbackArticle);
    return fallbackArticle;
  }
};
const AI_CHAT_TYPE_SPEED_MS = 24;
const AI_MUSIC_CACHE_KEY = 'long-ai-music-tracks';
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

aiToolRows.forEach((row) => {
  if (row.dataset.marqueeReady === 'true') {
    return;
  }

  row.dataset.marqueeReady = 'true';
  [...row.children].forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    row.append(clone);
  });
});

if (aiToolCard && aiToolRows.length) {
  const marqueeStates = aiToolRows.map((row, index) => ({
    row,
    halfWidth: Math.max(1, row.scrollWidth / 2),
    progress: index === 1 ? Math.max(1, row.scrollWidth / 2) : 0,
    velocity: 0,
    targetVelocity: 0,
    direction: index === 1 ? 1 : -1,
    baseOffset: index === 1 ? -12 : 0,
  }));
  let marqueeFrame = 0;
  let lastMarqueeTime = 0;

  const wrapMarquee = (value, size) => ((value % size) + size) % size;

  const updateMarqueeWidths = () => {
    marqueeStates.forEach((state) => {
      state.halfWidth = Math.max(1, state.row.scrollWidth / 2);
    });
  };

  const renderMarquee = (state) => {
    const wrapped = wrapMarquee(state.progress, state.halfWidth);
    const x =
      state.direction < 0
        ? -wrapped + state.baseOffset
        : -state.halfWidth + wrapped + state.baseOffset;

    state.row.style.setProperty('--marquee-x', `${x}px`);
  };

  const tickMarquee = (time) => {
    const delta = lastMarqueeTime ? Math.min(0.04, (time - lastMarqueeTime) / 1000) : 0;
    lastMarqueeTime = time;
    let keepRunning = false;

    marqueeStates.forEach((state) => {
      state.velocity += (state.targetVelocity - state.velocity) * 0.075;

      if (Math.abs(state.velocity) < 0.08 && state.targetVelocity === 0) {
        state.velocity = 0;
      }

      state.progress += state.velocity * delta;
      renderMarquee(state);

      if (state.velocity !== 0 || state.targetVelocity !== 0) {
        keepRunning = true;
      }
    });

    if (keepRunning) {
      marqueeFrame = window.requestAnimationFrame(tickMarquee);
    } else {
      marqueeFrame = 0;
      lastMarqueeTime = 0;
    }
  };

  const startMarquee = () => {
    if (!marqueeFrame) {
      lastMarqueeTime = 0;
      marqueeFrame = window.requestAnimationFrame(tickMarquee);
    }
  };

  const setMarqueeActive = (isActive) => {
    marqueeStates.forEach((state) => {
      state.targetVelocity = isActive ? 54 : 0;
    });
    startMarquee();
  };

  marqueeStates.forEach(renderMarquee);
  aiToolCard.addEventListener('mouseenter', () => setMarqueeActive(true));
  aiToolCard.addEventListener('mouseleave', () => setMarqueeActive(false));
  window.addEventListener('resize', updateMarqueeWidths);
}

const mixRgb = (source, target, amount) =>
  source.map((channel, index) => Math.round(channel + (target[index] - channel) * clamp(amount, 0, 1)));

const getRgbLuminance = ([red, green, blue]) => (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

const fallbackWorkCardTint = {
  tintRgb: [24, 24, 24],
  accentRgb: [24, 24, 24],
  contrastBoost: 0.45,
};

const loadWorkCardColorSampler = () => {
  if (!workCardColorSamplerPromise) {
    workCardColorSamplerPromise = import('https://cdn.jsdelivr.net/npm/fast-average-color@9.5.0/dist/index.esm.js')
      .then((module) => {
        const FastAverageColor = module.FastAverageColor || module.default;
        return typeof FastAverageColor === 'function' ? new FastAverageColor() : null;
      })
      .catch(() => null);
  }

  return workCardColorSamplerPromise;
};

const extractDominantWorkCardTint = async (imageElement) => {
  const imageUrl = imageElement?.currentSrc || imageElement?.src;

  if (!imageUrl) {
    return Promise.resolve(fallbackWorkCardTint);
  }

  if (workCardTintCache.has(imageUrl)) {
    return Promise.resolve(workCardTintCache.get(imageUrl));
  }

  if (workCardTintInflight.has(imageUrl)) {
    return workCardTintInflight.get(imageUrl);
  }

  const extractionPromise = loadWorkCardColorSampler()
    .then((workCardColorSampler) => {
      if (!workCardColorSampler) {
        return fallbackWorkCardTint;
      }

      return workCardColorSampler.getColorAsync(imageElement, {
        algorithm: 'dominant',
        mode: 'speed',
        ignoredColor: [
          [255, 255, 255, 255, 32],
          [0, 0, 0, 0, 0],
        ],
      });
    })
    .then((color) => {
      if (!color?.value) {
        return fallbackWorkCardTint;
      }

      const sampledRgb = color.value
        .slice(0, 3)
        .map((channel) => clamp(Math.round(channel), 0, 255));
      const luminance = getRgbLuminance(sampledRgb);
      const tintData = {
        tintRgb: mixRgb(sampledRgb, [0, 0, 0], luminance > 0.56 ? 0.7 : 0.58),
        accentRgb: luminance < 0.18 ? mixRgb(sampledRgb, [255, 255, 255], 0.24) : sampledRgb,
        contrastBoost: clamp((luminance - 0.44) / 0.38, 0, 1),
      };

      workCardTintCache.set(imageUrl, tintData);
      return tintData;
    })
    .catch(() => fallbackWorkCardTint)
    .finally(() => {
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

  const { tintRgb, accentRgb, contrastBoost } = await extractDominantWorkCardTint(imageElement);
  const glassRgb = mixRgb(tintRgb, [255, 255, 255], 0.58 - contrastBoost * 0.16);

  mediaElement.style.setProperty('--work-card-tint-rgb', tintRgb.join(' '));
  mediaElement.style.setProperty('--work-card-accent-rgb', (accentRgb || tintRgb).join(' '));
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
  setDisplayedRole(getHeroRoles()[0]);
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

  const heroRoles = getHeroRoles();
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
  setDisplayedRole(getHeroRoles()[0]);
  setHeroCardForRole(getHeroRoles()[0]);
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
  setDisplayedRole(getHeroRoles()[0]);
  setHeroCardForRole(getHeroRoles()[0]);
  roleSwapState.timeoutId = window.setTimeout(scheduleRoleSwap, ROLE_SWAP.initialDelay);
  states.forEach((state) => {
    triggerCardIntro(state);
  });
  heroIntroHasPlayed = true;
}

if (languageToggle && languageMenu) {
  languageToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const nextOpen = !languageMenu.classList.contains('is-open');
    languageMenu.classList.toggle('is-open', nextOpen);
    languageToggle.setAttribute('aria-expanded', String(nextOpen));
  });

  languageOptions.forEach((option) => {
    option.addEventListener('click', (event) => {
      event.stopPropagation();
      applySiteLanguage(option.dataset.languageOption);
    });
  });

  document.addEventListener('click', (event) => {
    if (!languageMenu.contains(event.target)) {
      languageMenu.classList.remove('is-open');
      languageToggle.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      languageMenu.classList.remove('is-open');
      languageToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

applySiteLanguage(currentSiteLanguage, { skipStorage: true });

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
    'search-focus': 'search-focus',
    search: 'search-focus',
    focus: 'search-focus',
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
  if (currentSiteLanguage === 'en') {
    return [
      {
        type: 'music',
        title: getSiteText('aiMusicTitle'),
        description: 'I often use music to shift into a creative or relaxed state.',
        accent: '#74B0FF',
        tracks: [],
      },
      {
        type: 'dogs',
        title: 'I am a dog person',
        accent: '#C4A8F5',
        images: [
          { src: './assets/life-cards/dog-husky.png', label: 'Husky' },
          { src: './assets/life-cards/dog-beagle.jpg', label: 'Beagle' },
          { src: './assets/life-cards/dog-border-collie.png', label: 'Border Collie' },
        ],
      },
      { type: 'quote', title: '“It is never too late to begin.”', description: 'A sentence I recently saved.', accent: '#D2FD5F' },
      {
        type: 'book',
        title: 'The Submarine at Night',
        description: 'I am reading this highly imaginative novel by Chen Chuncheng. Recommended.',
        image: './assets/life-cards/book-night-submarine.jpg',
        accent: '#74B0FF',
      },
      { type: 'friend', title: 'Gentle', description: 'Friends often describe me this way.', accent: '#0045DD' },
    ];
  }

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

function normalizeMusicTracksPayload(payload) {
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

function readSavedMusicTracks() {
  try {
    const parsed = JSON.parse(window.localStorage?.getItem(AI_MUSIC_CACHE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
}

function saveMusicTracks(tracks = []) {
  if (!tracks.length) {
    return;
  }

  try {
    window.localStorage?.setItem(AI_MUSIC_CACHE_KEY, JSON.stringify(tracks.slice(0, 20)));
  } catch (_error) {
    // Local storage may be unavailable in private browsing; live music data still works.
  }
}

function getAiMusicTracks(fallbackTracks = []) {
  const musicTracks = Array.isArray(aiChatState.spotifyTracks) ? aiChatState.spotifyTracks : [];
  return (musicTracks.length ? musicTracks : fallbackTracks).slice(0, 4);
}

function renderAiMusicLoading() {
  const loading = document.createElement('div');
  loading.className = 'ai-chat-music-loading';
  loading.textContent = getSiteText('aiMusicLoading');
  return loading;
}

function renderAiMusicRefreshButton() {
  const button = document.createElement('button');
  button.className = 'ai-chat-music-refresh';
  button.type = 'button';
  button.setAttribute('aria-label', getSiteText('aiMusicRefresh'));
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
    loadAiMusicTracks({ force: true });
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
    cover.setAttribute('aria-label', currentSiteLanguage === 'en' ? `Open ${track.title}` : `打开 ${track.title}`);
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

function loadAiMusicTracks(options = {}) {
  const force = Boolean(options.force);
  if (!force && (aiChatState.spotifyTracks || aiChatState.spotifyTracksPromise)) {
    return aiChatState.spotifyTracksPromise;
  }

  if (force) {
    aiChatState.spotifyTracks = null;
    aiChatState.spotifyTracksPromise = null;
    updateAiMusicCards();
  }

  const endpoint = force ? `${musicRecentEndpoint}?t=${Date.now()}` : musicRecentEndpoint;
  aiChatState.spotifyTracksPromise = fetch(endpoint, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Music request failed.');
      }
      return response.json();
    })
    .then((payload) => {
      const tracks = normalizeMusicTracksPayload(payload);
      const savedTracks = readSavedMusicTracks();
      const hasSamePool =
        force &&
        tracks.length &&
        savedTracks.length &&
        getTrackFingerprint(tracks.slice(0, 8)) === getTrackFingerprint(savedTracks.slice(0, 8));

      if (tracks.length) {
        aiChatState.spotifyTrackPool = tracks;
        aiChatState.spotifyTracks = hasSamePool ? shuffleTracks(savedTracks).slice(0, 4) : tracks.slice(0, 4);
        saveMusicTracks(tracks);
        updateAiMusicCards();
      } else {
        aiChatState.spotifyTrackPool = savedTracks;
        aiChatState.spotifyTracks = savedTracks.length ? shuffleTracks(savedTracks).slice(0, 4) : [];
        updateAiMusicCards();
      }
      return tracks;
    })
    .catch(() => {
      const savedTracks = readSavedMusicTracks();
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
  title.textContent = item.title || getSiteText('aiMusicTitle');

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
  loadAiMusicTracks();
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
    carousel.setAttribute('aria-label', card.title || (currentSiteLanguage === 'en' ? 'Life outside work' : '生活中的我'));
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
        cover.alt = item.title || (currentSiteLanguage === 'en' ? 'Book cover' : '书籍封面');

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
      <button type="button" data-life-prev aria-label="${currentSiteLanguage === 'en' ? 'Previous life card' : '上一张生活卡片'}">‹</button>
      <button type="button" data-life-next aria-label="${currentSiteLanguage === 'en' ? 'Next life card' : '下一张生活卡片'}">›</button>
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
    renderAiMusicCardContent(musicCard, { title: card.title || getSiteText('aiMusicTitle'), tracks: [] }, { compactHeader: true });
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
    button.textContent = getAiStarterLabel(suggestion);
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
    text: getAiChatCopy('welcome'),
    includeInHistory: false,
    isWelcome: true,
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
    aiChatSend.textContent = nextSending ? getSiteText('aiThinking') : getSiteText('aiSend');
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
    const fullText = text || getAiChatCopy('serviceUnavailable');
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
    text: currentSiteLanguage === 'en' ? 'Long AI is thinking...' : 'Long AI 正在思考...',
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
        language: currentSiteLanguage === 'en' ? 'en' : 'zh',
      }),
    });

    const data = await response.json().catch(() => ({}));

    removeAiChatStatusMessages();

    if (!response.ok) {
      const fallbackMessage =
        response.status === 404 ? getAiChatCopy('notConfigured') : data.error || getAiChatCopy('serviceUnavailable');
      setAiChatStarterOptions();
      await typeAiChatAssistantMessage({
        text: fallbackMessage,
      });
      return;
    }

    setAiChatStarterOptions(data.suggestions);
    await typeAiChatAssistantMessage({
      text: data.reply || getAiChatCopy('serviceUnavailable'),
      cards: data.cards,
    });
  } catch (_error) {
    removeAiChatStatusMessages();
    setAiChatStarterOptions();
    await typeAiChatAssistantMessage({
      text: getAiChatCopy('serviceUnavailable'),
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

  const hoverTargets = [...document.querySelectorAll('a, button, [data-card], [data-cursor-icon], [data-cursor-label]')];
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
  const workCardHideTimers = new WeakMap();

  const applyWorkFilter = (filter, isInitial = false) => {
    const activeTabIndex = Math.max(
      0,
      worksTabs.findIndex((tab) => tab.dataset.workFilter === filter)
    );
    worksTabs[0].parentElement?.style.setProperty('--works-segment-index', String(activeTabIndex));

    worksTabs.forEach((tab) => {
      const active = tab.dataset.workFilter === filter;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    workCards.forEach((card) => {
      const categories = card.dataset.workCategory.split(' ');
      const visible = filter === 'all' || categories.includes(filter);

      window.clearTimeout(workCardHideTimers.get(card));

      if (visible) {
        card.classList.remove('is-hidden');
        window.requestAnimationFrame(() => {
          card.classList.remove('is-filtered-out');
        });
        return;
      }

      if (isInitial) {
        card.classList.add('is-filtered-out', 'is-hidden');
        return;
      }

      card.classList.add('is-filtered-out');
      const hideTimer = window.setTimeout(() => {
        card.classList.add('is-hidden');
      }, 280);
      workCardHideTimers.set(card, hideTimer);
    });
  };

  worksTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      applyWorkFilter(tab.dataset.workFilter);
    });
  });

  applyWorkFilter('ux', true);
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

  const getLearningDropSize = () => ({
    width: learningDrop.clientWidth,
    height: learningDrop.clientHeight,
  });

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
    const rect = getLearningDropSize();
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
    const rect = getLearningDropSize();
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
      labelKey: 'switchTimeToBeijing',
    },
    beijing: {
      zone: 'Asia/Shanghai',
      location: 'BEIJING',
      labelKey: 'switchTimeToLondon',
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
      timeToggle.setAttribute('aria-label', getSiteText(mode.labelKey));
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
      showSiteToast(getSiteText('guestbookEmptyToast'));
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
    'search-focus': [
      './assets/project-search-focus-pages/01.jpg',
      './assets/project-search-focus-pages/02.jpg',
    ],
    'mark-code': [
      './assets/project-mark-code-pages/01.jpg',
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
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        projectSlideFrame?.scrollBy({
          top: event.key === 'ArrowUp' ? -180 : 180,
          left: 0,
          behavior: 'smooth',
        });
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
        const html = block.html || escapeHtml(block.text || '');
        if (block.type === 'h2') {
          return `<h2>${html}</h2>`;
        }
        if (block.type === 'ul') {
          return `<ul>${(block.items || []).map((item) => `<li>${item}</li>`).join('')}</ul>`;
        }
        if (block.type === 'code') {
          const language = block.language ? escapeHtml(block.language.toUpperCase()) : 'CODE';
          return `<figure class="knowledge-code-block"><figcaption>${language}</figcaption><pre><code>${highlightCode(
            block.code || '',
            block.language || ''
          )}</code></pre></figure>`;
        }
        return `<p>${html}</p>`;
      })
      .join('');

  const openKnowledgeArticle = async (articleId) => {
    const fallbackArticle = knowledgeArticles[articleId];
    if (!fallbackArticle) {
      return;
    }

    knowledgeTitle.textContent = fallbackArticle.title;
    knowledgeDate.textContent = fallbackArticle.date;
    knowledgeDate.setAttribute('datetime', fallbackArticle.datetime);
    knowledgeCategory.textContent = fallbackArticle.category;
    knowledgeContent.innerHTML = '<p>正在加载文章...</p>';
    knowledgeViewer.classList.add('is-open');
    knowledgeViewer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const article = await loadKnowledgeArticle(articleId);
    if (!article) {
      return;
    }

    knowledgeTitle.textContent = article.title;
    knowledgeDate.textContent = article.date;
    knowledgeDate.setAttribute('datetime', article.datetime);
    knowledgeCategory.textContent = article.category;
    knowledgeContent.innerHTML = renderKnowledgeContent(article);
  };

  const closeKnowledgeArticle = () => {
    knowledgeViewer.classList.remove('is-open');
    knowledgeViewer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  knowledgeEntries.forEach((entry) => {
    if (entry.matches('a[href]')) {
      return;
    }

    entry.addEventListener('click', () => {
      openKnowledgeArticle(entry.dataset.knowledgeEntry);
    });
  });

  knowledgeEntries.forEach(async (entry) => {
    const article = await loadKnowledgeArticle(entry.dataset.knowledgeEntry);
    if (!article) return;

    const title = entry.querySelector('.knowledge-item-title');
    const time = entry.querySelector('time');
    if (title) {
      title.textContent = article.title;
    }
    if (time) {
      time.textContent = article.date;
      time.setAttribute('datetime', article.datetime);
    }
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
  const sectionLabelKeyMap = {
    home: 'navHome',
    about: 'navAbout',
    works: 'navWorks',
    knowledge: 'navKnowledge',
    contact: 'navContact',
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
      pageIndicator.textContent = getSiteText(sectionLabelKeyMap[sectionName] || sectionLabelKeyMap.home);
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

if (revealItems.length) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add('show'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('show', entry.isIntersecting);
        });
      },
      {
        rootMargin: '0px 0px 12% 0px',
        threshold: 0.04,
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }
}

if (scene && states.length) {
  updateBounds();
  animate();
}
