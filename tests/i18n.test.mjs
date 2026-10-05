import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {parseHTML} from 'linkedom';import {moduleTS} from './fixtures/load-ts.mjs';
const {themes}=await moduleTS('src/data/themes.ts');const {localizedPath,translate}=await moduleTS('src/i18n/index.ts');const {decodeURL,eventURL}=await moduleTS('src/lib/event-codec.ts');const {searchThemes}=await moduleTS('src/lib/theme-search.ts');
const base=process.env.BASE_PATH??'/';const origin=process.env.SITE_URL??'https://contagem.vivace-softwares.com.br';
test('every theme has static translated social metadata, canonical locale URL, alternate and reachable PNG',async()=>{
 for(const locale of ['pt-br','en-us'])for(const theme of themes){
  const {document}=parseHTML(await readFile(`dist/${locale}/${theme.slug}/index.html`,'utf8'));
  const url=`${origin}${base}${locale}/${theme.slug}/`;const lang=locale==='en-us'?'en-US':'pt-BR';
  assert.equal(document.documentElement.lang,lang);
  assert.equal(document.querySelector('meta[property="og:title"]').content,`${translate(theme.name,lang)} | Contagem`);
  assert.equal(document.querySelector('meta[property="og:locale"]').content,lang.replace('-','_'));
  assert.equal(document.querySelector('meta[property="og:url"]').content,url);assert.equal(document.querySelector('link[rel="canonical"]').href,url);
  assert.equal(document.querySelectorAll('link[rel="alternate"][hreflang]').length,2);
  const description=document.querySelector('meta[property="og:description"]').content;
  assert.ok(description.startsWith(translate(theme.description,lang)));assert.ok(description.includes(lang==='en-US'?'Create and share':'Crie e compartilhe'));
  assert.equal(document.querySelector('meta[property="og:image"]').content,`${origin}${base}og/${theme.slug}.png`);
  assert.ok((await readFile(`dist/og/${theme.slug}.png`)).length>0);
  assert.equal(document.getElementById('copy-link').textContent,lang==='en-US'?'Copy link':'Copiar link');
 }
});
test('English catalog exposes 19 localized cards, search and links without untranslated interface copy',async()=>{
 const {document}=parseHTML(await readFile('dist/en-us/index.html','utf8'));const cards=[...document.querySelectorAll('[data-theme-slug]')];assert.equal(cards.length,19);
 for(const card of cards)assert.ok(card.querySelector('a').href.startsWith(`${base}en-us/`));
 const index=JSON.parse(document.getElementById('theme-search-index').textContent);
 for(const [query,slug] of [['polit','evento-politico'],['inaug','evento-politico'],['pran','zoeira'],['zuei','zoeira'],['birth','aniversario'],['carnival','festa'],['mardi','festa'],['hangout','encontro-amigos'],['supper','jantar'],["new year's eve",'ano-novo'],['b-day','aniversario']])assert.ok(searchThemes(index,query).includes(slug));
 assert.ok(document.querySelector('.collection-stamp').textContent.includes('19'));assert.ok(!document.querySelector('.catalog').textContent.includes('TEMA '));
});
test('localized links retain the exact event payload and old URLs remain readable',()=>{
 const data={title:'Título 🎉',message:'Mensagem',endAt:'2030-06-12T21:00:00.000Z',timeZone:'America/Sao_Paulo'};
 const original=eventURL(data,`${origin}${base}zoeira/`);let url=new URL(original);
 for(const lang of ['en-US','pt-BR']){url.pathname=localizedPath(url.pathname,lang,base);assert.equal(url.hash,new URL(original).hash);assert.deepEqual(decodeURL(url.href,url.href,base).event,data);}
 assert.deepEqual(decodeURL(original,original,base).event,data);
 assert.equal(localizedPath('/countdown/en-us/zoeira/','pt-BR','/countdown/'),'/countdown/pt-br/zoeira/');
 assert.throws(()=>decodeURL(`${origin}${base}fr-fr/zoeira/${url.hash}`,original,base),/caminho/);
});

test('calendar description follows interface language while visitor content and UID remain unchanged',async()=>{
 const {calendarICS}=await moduleTS('src/lib/calendar-export.ts');const previous=globalThis.document;
 const event={title:'Título',message:'Mensagem',organizer:'Amigos',endAt:'2030-06-12T21:00:00.000Z',timeZone:'America/Sao_Paulo'};
 try{
  globalThis.document={documentElement:{lang:'en-US'}};
  const en=await calendarICS(event,`${origin}${base}en-us/zoeira/`);
  globalThis.document={documentElement:{lang:'pt-BR'}};
  const pt=await calendarICS(event,`${origin}${base}pt-br/zoeira/`);
  assert.ok(en.includes('Host / organizer: Amigos'));assert.ok(en.includes('June'));assert.ok(en.includes('SUMMARY:Título'));assert.ok(en.includes('Mensagem'));
  assert.equal(en.match(/UID:(.+)/)[1],pt.match(/UID:(.+)/)[1]);
 }finally{if(previous===undefined)delete globalThis.document;else globalThis.document=previous;}
});

test('authored pages have no untranslated Portuguese text nodes in English',async()=>{
 const unchanged=new Set(['Menu','contagem','Português (BR)','English (US)','America/Sao_Paulo','America/Manaus','America/New_York','Europe/Lisbon','Europe/London','Asia/Tokyo','UTC','Photon','OpenStreetMap contributors','Latitude','Longitude']);
 function texts(node,out=[]){if(node.nodeType===3&&/[A-Za-zÀ-ÿ]/.test(node.textContent))out.push(node.textContent.trim());if(node.nodeType===1&&!['SCRIPT','STYLE'].includes(node.tagName))for(const child of node.childNodes)texts(child,out);return out;}
 for(const path of ['index.html','privacidade/index.html','404/index.html',...themes.map(t=>`${t.slug}/index.html`)]){
  const pt=parseHTML(await readFile(`dist/pt-br/${path}`,'utf8')).document;const en=parseHTML(await readFile(`dist/en-us/${path}`,'utf8')).document;
  const original=new Set(texts(pt.body));for(const text of texts(en.body))assert.ok(!original.has(text)||unchanged.has(text),`${path}: untranslated ${text}`);
 }
});

test('shared Hosting 404 adapts to an English missing route without redirecting',async()=>{
 const {localizeNotFound}=await moduleTS('src/lib/not-found-locale.ts');const previous=globalThis.document,previousLocation=globalThis.location;
 try{globalThis.document=parseHTML(await readFile('dist/404.html','utf8')).document;globalThis.location={pathname:`${base}en-us/missing/`};localizeNotFound();assert.equal(document.documentElement.lang,'en-US');assert.equal(document.querySelector('h1').textContent,'Time has stopped here.');assert.equal(document.querySelector('.not-found a').getAttribute('href'),`${base}en-us/`);}finally{if(previous===undefined)delete globalThis.document;else globalThis.document=previous;if(previousLocation===undefined)delete globalThis.location;else globalThis.location=previousLocation;}
});
