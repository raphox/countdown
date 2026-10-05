import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { editorialAliases } from './fixtures/editorial-aliases.mjs';
async function loadTypeScript(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
const { themes, categories } = await loadTypeScript('../src/data/themes.ts');
const { createSearchIndex, normalizeSearch, searchThemes } = await loadTypeScript('../src/lib/theme-search.ts');
const index = createSearchIndex(themes, categories);
const find = (query) => searchThemes(index, query);

test('editorial matrix and every curated alias', () => {
  const matrix = [
    [['Aniversário', 'ANIVERSARIO', 'aniversario', 'niver'], ['aniversario']],
    [['réveillon', 'REVEILLON', '  ano-novo  ', 'ano novo'], ['ano-novo']],
    [['reunião de família', 'REUNIAO DE FAMILIA'], ['familia']],
    [['colação de grau', 'colacao de grau'], ['formatura-faculdade']],
    [['formatura'], ['formatura-fundamental', 'formatura-ensino-medio', 'formatura-faculdade']],
    [['medicina', 'congresso medico', 'SAÚDE'], ['evento-medicina']],
    [['juridico'], ['evento-direito']],
    [['eventos'], ['evento-tecnologia', 'evento-medicina', 'evento-direito', 'festa']],
    [['', '  ', '---!?'], themes.map((theme) => theme.slug)],
    [['tema inexistente', 'med', '.*[med](a)+$'], []],
  ];
  for (const [queries, expected] of matrix) for (const query of queries) assert.deepEqual(find(query), expected, query);
  assert.deepEqual(Object.fromEntries(themes.map((theme) => [theme.slug, [...theme.aliases]])), editorialAliases);
  for (const [slug, aliases] of Object.entries(editorialAliases)) for (const alias of aliases) {
    const matches = find(alias);
    assert.ok(matches.includes(slug), `${slug}: ${alias}`);
    assert.equal(new Set(matches).size, matches.length);
  }
});

test('Unicode, punctuation and category names normalize consistently', () => {
  assert.equal(normalizeSearch('  ReÚNIÃO--de, família! '), 'reuniao de familia');
  for (const query of ['Aniversário'.normalize('NFD'), 'rÉvEiLlOn'.normalize('NFD'), 'reunião---de,,, família']) {
    assert.deepEqual(find(query), find(normalizeSearch(query)));
  }
  assert.deepEqual(find('celebrações'), ['aniversario', 'ano-novo', 'natal', 'casamento', 'cha-de-bebe']);
  assert.deepEqual(find('encontros e jornadas'), ['familia', 'empresa', 'viagem']);
  assert.deepEqual(find('conquistas'), ['formatura-fundamental', 'formatura-ensino-medio', 'formatura-faculdade']);
  assert.deepEqual(find('evento medicina'), ['evento-medicina']);
  assert.deepEqual(find('tecnologia saúde'), []);
  assert.deepEqual(find('natalina ceia'), ['natal']);
  assert.deepEqual(find('ceia confraternização'), []);
  assert.deepEqual(find('evento-tecnologia'), ['evento-tecnologia']); // name tokens, not slug lookup
  assert.deepEqual(find('familia'), ['familia']);
});

test('best rank, global stable ties, shared aliases, unique themes and isolated fields', () => {
  const fixtures = createSearchIndex([
    { slug: 'tokens', name: 'Uma festa especial', category: 'x', aliases: ['festa especial', 'duplicado'] },
    { slug: 'alias', name: 'Outro nome', category: 'x', aliases: ['festa', 'festa', 'duplicado'] },
    { slug: 'exact', name: 'Festa', category: 'x', aliases: ['festa', 'duplicado'] },
    { slug: 'split', name: 'Outra ocasião', category: 'x', aliases: ['azul claro', 'verde escuro'] },
  ], [{ id: 'x', name: 'Eventos' }]);
  assert.deepEqual(searchThemes(fixtures, 'festa'), ['exact', 'alias', 'tokens']);
  assert.deepEqual(searchThemes(fixtures, 'duplicado'), ['tokens', 'alias', 'exact']);
  assert.deepEqual(searchThemes(fixtures, 'verde azul'), []);
  assert.deepEqual(searchThemes(fixtures, 'outra eventos'), []);
  assert.deepEqual(searchThemes(fixtures, 'ocasi'), []);
  assert.deepEqual(searchThemes(fixtures, ''), ['tokens', 'alias', 'exact', 'split']);
  const hidden = createSearchIndex([{ slug: 'segredo', name: 'Nome', category: 'x', aliases: [] }], [{ id: 'x', name: 'Categoria' }]);
  assert.deepEqual(searchThemes(hidden, 'segredo'), []);
});
