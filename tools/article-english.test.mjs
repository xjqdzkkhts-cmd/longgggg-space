import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync,readdirSync} from 'node:fs';
import vm from 'node:vm';
const root = new URL('../',import.meta.url);
const page = readFileSync(new URL('article.js',root),'utf8');
const shared = readFileSync(new URL('script.js',root),'utf8');
const definitions = page.slice(0,page.indexOf('const articleTitle ='));
const parser = page.slice(page.indexOf('const parseArticleFrontmatter ='),page.indexOf('const renderArticleInline ='));
const loader = page.slice(page.indexOf('const loadArticlePage ='),page.indexOf("if (document.readyState === 'loading')"));
for (const file of readdirSync(new URL('articles/',root)).filter(f=>f.endsWith('.md'))) {
 test(file+' loads its complete English Markdown instead of a translation override',async()=>{
  const markdown = readFileSync(new URL('articles/'+file,root),'utf8');
  const renders=[]; const requests=[];
  const context = vm.createContext({
   URLSearchParams,console,window:{location:{search:'?id='+file.slice(0,3)}},
   articleLanguage:'en',renderArticle:p=>renders.push(p),setArticleError:()=>assert.fail('unexpected error'),
   fetch:async(url,options)=>{requests.push({url,options});return {ok:true,text:async()=>markdown};},
  });
  vm.runInContext(definitions+parser+loader,context);
  await vm.runInContext('loadArticlePage()',context);
  assert.equal(requests.length,1);
  assert.equal(requests[0].url,'./articles/'+file);
  assert.ok(markdown.endsWith(renders.at(-1).body));
  assert.doesNotMatch(renders.at(-1).meta.title,/[\u4e00-\u9fff]/);
  assert.equal(vm.runInContext('getArticleLanguage()',context),'en');
  assert.equal(JSON.stringify(renders[0]),JSON.stringify(renders.at(-1)));
 });
}
test('homepage reads Markdown without stale English overrides',()=>{
 const data=shared.slice(shared.indexOf('const knowledgeArticles ='),shared.indexOf('const projectLanguageMap ='));
 const overrides=shared.slice(shared.indexOf('const knowledgeArticleTranslations ='),shared.indexOf('const knowledgeArticleCache ='));
 const context=vm.createContext({}); vm.runInContext(data+overrides,context);
 assert.equal(vm.runInContext('Object.keys(knowledgeArticleTranslations).length',context),0);
 for(const id of ['001','002','003','004']) {
  assert.equal(vm.runInContext(`knowledgeArticles['${id}'].title`,context),vm.runInNewContext(definitions+`ARTICLE_FALLBACKS['${id}'].meta.title`));
 }
});
