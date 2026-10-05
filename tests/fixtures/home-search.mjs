import assert from 'node:assert/strict';
import { editorialAliases } from './editorial-aliases.mjs';
export function shippedIndex(home) {
  const match = home.match(/<script\b[^>]*id="theme-search-index"[^>]*>([\s\S]*?)<\/script>/);
  assert.ok(match, 'shipped JSON index');
  return JSON.parse(match[1]);
}
export function assertShippedIndex(home) {
  const names = ['aniversario', 'ano novo', 'natal', 'encontro da familia', 'encontro da empresa', 'formatura do ensino fundamental', 'formatura do ensino medio', 'formatura da faculdade', 'casamento', 'viagem e ferias', 'cha de bebe', 'evento de tecnologia', 'evento de medicina e saude', 'evento de direito e juridico', 'festa generica'];
  const categories = ['celebracoes', 'celebracoes', 'celebracoes', 'encontros e jornadas', 'encontros e jornadas', 'conquistas', 'conquistas', 'conquistas', 'celebracoes', 'encontros e jornadas', 'celebracoes', 'eventos', 'eventos', 'eventos', 'eventos'];
  const normalize = (text) => text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
  const expected = Object.entries(editorialAliases).map(([slug, aliases], position) => {
    aliases = aliases.map(normalize);
    return { slug, position, name: names[position], aliases, fields: [names[position], ...aliases, categories[position]].map((field) => field.split(' ')) };
  });
  assert.deepEqual(shippedIndex(home), expected);
}

// Only the DOM surface consumed by the shipped module. append moves existing nodes,
// hidden propagates through ancestors, events and focus follow actual node identity.
export function createHomeDOM(home, initialValue = '') {
  const document = { activeElement: null };
  class Element {
    constructor(hidden = false) { this.hidden = hidden; this.children = []; this.parentElement = null; this.dataset = {}; this.listeners = {}; this.textContent = ''; this.value = ''; }
    append(child) {
      if (child.parentElement) child.parentElement.children.splice(child.parentElement.children.indexOf(child), 1);
      this.children.push(child); child.parentElement = this;
    }
    addEventListener(type, handler) { (this.listeners[type] ??= []).push(handler); }
    dispatch(type) { for (const handler of this.listeners[type] ?? []) handler({ target: this }); }
    focus() { document.activeElement = this; }
    get visible() { return !this.hidden && (!this.parentElement || this.parentElement.visible); }
  }
  const ids = Object.fromEntries(['theme-search', 'theme-query', 'clear-search', 'show-all', 'search-results', 'search-count', 'search-empty', 'theme-search-index'].map((id) => [id, new Element(['theme-search', 'search-results', 'search-empty'].includes(id))]));
  ids['theme-query'].value = initialValue;
  ids['theme-search-index'].textContent = JSON.stringify(shippedIndex(home));
  const groups = [], cards = [];
  for (const section of home.matchAll(/<section class="category"[\s\S]*?<\/section>/g)) {
    const group = new Element(), grid = new Element(); group.append(grid); groups.push(group);
    for (const match of section[0].matchAll(/data-theme-slug="([^"]+)"/g)) {
      const card = new Element(); card.dataset.themeSlug = match[1]; grid.append(card); cards.push(card);
    }
  }
  assert.equal(cards.length, 15);
  document.querySelector = (selector) => ids[selector.slice(1)] ?? null;
  document.querySelectorAll = (selector) => selector === '.category' ? groups : selector === '[data-theme-slug]' ? cards : [];
  return { document, ids, groups, cards, visibleResults: () => ids['search-results'].children.filter((card) => card.visible).map((card) => card.dataset.themeSlug) };
}
