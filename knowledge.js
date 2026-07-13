const KNOWLEDGE_ARTICLE_SOURCES = [
  { id: '001', source: './articles/001-card-blur.md' },
  { id: '002', source: './articles/002-threejs-drop.md' },
  { id: '003', source: './articles/003-vibe-coding-animation.md' },
  { id: '004', source: './articles/004-parallax-card.md' },
];

const isLocalKnowledgePreview = () =>
  window.location.protocol === 'file:' ||
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === '0.0.0.0' ||
  window.location.hostname === '::1' ||
  window.location.hostname === '[::1]' ||
  window.location.pathname.includes('/Users/');

const redirectLocalKnowledgeBackHome = (event) => {
  if (isLocalKnowledgePreview() && event.state?.knowledgeHomeFallback) {
    window.location.replace('./index.html');
  }
};

const normalizeLocalKnowledgeHistory = () => {
  if (!isLocalKnowledgePreview() || !window.history?.replaceState || !window.history?.pushState) {
    return;
  }

  window.addEventListener('popstate', redirectLocalKnowledgeBackHome);

  if (window.history.state?.knowledgeHistoryNormalized) {
    return;
  }

  try {
    window.history.replaceState({ knowledgeHomeFallback: true }, '', './index.html');
    window.history.pushState({ knowledgeHistoryNormalized: true }, '', './knowledge.html');
  } catch (_error) {
    // Some local preview environments restrict history rewrites.
  }
};

normalizeLocalKnowledgeHistory();

document.querySelector('.article-back-link')?.addEventListener('click', (event) => {
  const hasSameSiteReferrer = (() => {
    try {
      return document.referrer && new URL(document.referrer).origin === window.location.origin;
    } catch (_error) {
      return false;
    }
  })();

  if (!isLocalKnowledgePreview() && hasSameSiteReferrer && window.history.length > 1) {
    event.preventDefault();
    window.history.back();
    return;
  }

  if (isLocalKnowledgePreview()) {
    event.preventDefault();
    window.location.href = './index.html';
  }
});

const knowledgeList = document.querySelector('[data-knowledge-list]');
const knowledgeFilters = document.querySelector('[data-knowledge-filters]');
const knowledgeSort = document.querySelector('[data-knowledge-sort]');
const knowledgeCount = document.querySelector('[data-knowledge-count]');

let knowledgeArticles = [];
let activeCategory = '全部';

const escapeKnowledgeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const parseKnowledgeFrontmatter = (markdown) => {
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

const createKnowledgeExcerpt = (body) => {
  const plainText = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#{1,6}\s+/gm, ' ')
    .replace(/[-*]\s+/g, ' ')
    .replace(/[`*_#[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return plainText.length > 96 ? `${plainText.slice(0, 96)}...` : plainText;
};

const normalizeKnowledgeDate = (article) => article.datetime || article.date || '';

const loadKnowledgeArticles = async () => {
  const loaded = await Promise.all(
    KNOWLEDGE_ARTICLE_SOURCES.map(async ({ id, source }) => {
      const response = await fetch(`${encodeURI(source)}?t=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Unable to load ${source}`);
      }

      const markdown = await response.text();
      const { meta, body } = parseKnowledgeFrontmatter(markdown);
      return {
        id,
        title: meta.title || '未命名文章',
        date: meta.date || '',
        datetime: meta.datetime || meta.date || '',
        category: meta.category || 'Notes',
        excerpt: createKnowledgeExcerpt(body),
      };
    })
  );

  knowledgeArticles = loaded;
};

const renderKnowledgeFilters = () => {
  if (!knowledgeFilters) return;

  const categories = ['全部', ...new Set(knowledgeArticles.map((article) => article.category))];
  knowledgeFilters.innerHTML = categories
    .map(
      (category) =>
        `<button class="knowledge-filter-button${category === activeCategory ? ' is-active' : ''}" type="button" data-category="${escapeKnowledgeHtml(
          category
        )}">${escapeKnowledgeHtml(category)}</button>`
    )
    .join('');

  knowledgeFilters.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category || '全部';
      renderKnowledgeFilters();
      renderKnowledgeList();
    });
  });
};

const getVisibleKnowledgeArticles = () => {
  const sortMode = knowledgeSort?.value || 'newest';
  const filtered =
    activeCategory === '全部'
      ? [...knowledgeArticles]
      : knowledgeArticles.filter((article) => article.category === activeCategory);

  return filtered.sort((a, b) => {
    if (sortMode === 'oldest') {
      return normalizeKnowledgeDate(a).localeCompare(normalizeKnowledgeDate(b), 'zh-Hans-CN');
    }

    if (sortMode === 'title') {
      return a.title.localeCompare(b.title, 'zh-Hans-CN');
    }

    return normalizeKnowledgeDate(b).localeCompare(normalizeKnowledgeDate(a), 'zh-Hans-CN');
  });
};

const renderKnowledgeList = () => {
  if (!knowledgeList) return;

  const visibleArticles = getVisibleKnowledgeArticles();
  knowledgeCount.textContent = `${visibleArticles.length} 篇文章`;

  knowledgeList.innerHTML = visibleArticles
    .map(
      (article) => `
        <a class="knowledge-page-item" href="./article.html?id=${encodeURIComponent(article.id)}" data-cursor-icon="view">
          <span class="knowledge-page-item-main">
            <span class="knowledge-page-item-title">${escapeKnowledgeHtml(article.title)}</span>
            <span class="knowledge-page-item-excerpt">${escapeKnowledgeHtml(article.excerpt)}</span>
          </span>
          <span class="knowledge-page-item-side">
            <span>${escapeKnowledgeHtml(article.category)}</span>
            <time datetime="${escapeKnowledgeHtml(article.datetime)}">${escapeKnowledgeHtml(article.date)}</time>
          </span>
        </a>
      `
    )
    .join('');
};

const initKnowledgePage = async () => {
  if (!knowledgeList || !knowledgeFilters || !knowledgeSort || !knowledgeCount) {
    return;
  }

  try {
    await loadKnowledgeArticles();
    renderKnowledgeFilters();
    renderKnowledgeList();
    knowledgeSort.addEventListener('change', renderKnowledgeList);
  } catch (error) {
    console.warn(error);
    knowledgeCount.textContent = '文章暂时不可用';
    knowledgeList.innerHTML = '<p class="knowledge-page-empty">暂时没有读取到文章，请稍后再试。</p>';
  }
};

initKnowledgePage();
