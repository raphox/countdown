import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { assertShippedIndex, createHomeDOM } from './fixtures/home-search.mjs';
const home = await readFile(resolve('dist/index.html'), 'utf8');
const module = [...home.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].find((match) => match[1].includes('type="module"'));
assert.ok(module, 'compiled home module');
let code = module[2];
const src = module[1].match(/src="([^"]+)"/);
if (src) code = await readFile(resolve('dist', src[1].slice(src[1].indexOf('_astro/'))), 'utf8');

for (const initial of ['', 'formatura']) test(`shipped UI initializes restored value ${JSON.stringify(initial)} and handles events locally`, () => {
  assertShippedIndex(home);
  const dom = createHomeDOM(home, initial);
  const { document, ids, groups, cards, visibleResults } = dom;
  const originals = groups.map((group) => group.children[0].children.map((card) => card.dataset.themeSlug));
  const input = ids['theme-query']; input.focus();
  let requests = 0;
  const request = () => { requests++; throw new Error('Unexpected network request'); };
  runInNewContext(code, { document, fetch: request, XMLHttpRequest: request, WebSocket: request, navigator: { sendBeacon: request } });
  assert.equal(ids['theme-search'].hidden, false);
  assert.equal(document.activeElement, input);
  if (initial) {
    assert.deepEqual(visibleResults(), ['formatura-fundamental', 'formatura-ensino-medio', 'formatura-faculdade']);
    assert.equal(ids['search-count'].textContent, '3 temas encontrados');
    assert.ok(groups.every((group) => group.hidden));
  } else assert.equal(ids['search-count'].textContent, '15 temas encontrados');
  function query(value, expected) {
    input.value = value; input.dispatch('input');
    assert.deepEqual(visibleResults(), expected);
    assert.equal(ids['search-count'].textContent, `${expected.length} ${expected.length === 1 ? 'tema encontrado' : 'temas encontrados'}`);
    assert.equal(document.activeElement, input);
  }
  query('festa', ['aniversario', 'natal', 'casamento', 'festa']);
  query('confraternização', ['empresa', 'natal']);
  query('eventos', ['evento-tecnologia', 'evento-medicina', 'evento-direito', 'festa']);
  query('niver', ['aniversario']);
  query('tema inexistente', []);
  assert.equal(input.value, 'tema inexistente');
  assert.equal(ids['search-empty'].hidden, false);
  assert.equal(ids['search-results'].hidden, true);
  function assertRestored() {
    assert.equal(input.value, '');
    assert.equal(document.activeElement, input);
    assert.equal(ids['search-count'].textContent, '15 temas encontrados');
    assert.equal(ids['search-empty'].hidden, true);
    assert.equal(ids['search-results'].hidden, true);
    assert.ok(groups.every((group) => !group.hidden));
    assert.ok(cards.every((card) => card.visible));
    assert.deepEqual(groups.map((group) => group.children[0].children.map((card) => card.dataset.themeSlug)), originals);
  }
  ids['show-all'].focus(); ids['show-all'].dispatch('click'); assertRestored();
  query('SAÚDE', ['evento-medicina']);
  ids['clear-search'].focus(); ids['clear-search'].dispatch('click'); assertRestored();
  input.value = '--- !'; input.dispatch('input');
  assert.equal(ids['search-count'].textContent, '15 temas encontrados');
  assert.equal(requests, 0);
});
