import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const shared = readFileSync(new URL('../script.js', import.meta.url), 'utf8');
const navigation = shared.slice(shared.indexOf('// History navigation owns'), shared.indexOf('const SITE_DESIGN_WIDTH'));

function clickBack({ referrer = '', href = 'https://portfolio.test/article.html?id=001', length = 2, modifiers = {} } = {}) {
  let onClick, backCalls = 0, prevented = false;
  const history = { length, scrollRestoration: 'manual', back() { backCalls++; } };
  const location = new URL(href);
  vm.runInNewContext(navigation, {
    URL,
    window: { location, history },
    document: { referrer, querySelector: () => ({ addEventListener: (_, fn) => { onClick = fn; } }) },
  });
  onClick({ button: 0, preventDefault() { prevented = true; }, ...modifiers });
  return { backCalls, prevented, restoration: history.scrollRestoration, href: location.href };
}

test('return uses the preceding history entry and enables native scroll restoration', () => {
  assert.deepEqual(clickBack({ referrer: 'https://portfolio.test/knowledge.html?category=Frontend' }), {
    backCalls: 1, prevented: true, restoration: 'auto', href: 'https://portfolio.test/article.html?id=001',
  });
});

test('localhost uses the same return behavior as the published website', () => {
  const result = clickBack({ href: 'http://127.0.0.1:8765/article.html?id=001', referrer: 'http://127.0.0.1:8765/' });
  assert.equal(result.backCalls, 1);
  assert.equal(result.prevented, true);
});

test('direct visits and external referrers use the ordinary article-list fallback', () => {
  for (const options of [{}, { referrer: 'https://search.test/' }, { referrer: 'https://portfolio.test/', length: 1 }]) {
    const result = clickBack(options);
    assert.equal(result.backCalls, 0);
    assert.equal(result.prevented, false);
  }
});

test('opening the return link in a new tab is not intercepted', () => {
  const result = clickBack({ referrer: 'https://portfolio.test/', modifiers: { metaKey: true } });
  assert.equal(result.backCalls, 0);
  assert.equal(result.prevented, false);
});

test('page scripts coexist with the shared navigation script', () => {
  for (const name of ['article.js', 'knowledge.js']) {
    const page = readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
    assert.doesNotThrow(() => new vm.Script(`${shared}\n${page}`), name);
  }
});


test('landing URL cleanup preserves the knowledge anchor and history state', () => {
  const cleanup = shared.slice(shared.indexOf('const cleanLandingUrl'), shared.indexOf('// History navigation owns'));
  const calls = [];
  const state = { previousPage: 'knowledge' };
  vm.runInNewContext(cleanup, {
    window: {
      location: new URL('https://portfolio.test/index.html?from=article#knowledge'),
      history: { state, replaceState(...args) { calls.push(args); } },
    },
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], state);
  assert.equal(calls[0][2], '/?from=article#knowledge');
});

test('standalone pages leave the real browser history intact', () => {
  for (const name of ['article.js', 'knowledge.js']) {
    const page = readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
    assert.doesNotMatch(page, /history\.(?:pushState|replaceState)|location\.(?:href\s*=|replace\()/);
    const html = readFileSync(new URL(`../${name.replace('.js', '.html')}`, import.meta.url), 'utf8');
    assert.match(html, /class="article-back-link" href="\.\/index\.html#knowledge"/);
  }
});
