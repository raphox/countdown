export type SearchSource = { slug: string; name: string; category: string; aliases: readonly string[] };
export type SearchEntry = { slug: string; name: string; aliases: string[]; fields: string[][]; position: number };

export function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('pt-BR')
    .replace(/[^\p{L}\p{N}]+/gu, ' ').trim().replace(/\s+/g, ' ');
}

export function createSearchIndex(sources: readonly SearchSource[], categories: readonly { id: string; name: string }[]): SearchEntry[] {
  return sources.map((theme, position) => {
    const name = normalizeSearch(theme.name);
    const aliases = theme.aliases.map(normalizeSearch);
    const category = normalizeSearch(categories.find((entry) => entry.id === theme.category)?.name ?? '');
    return { slug: theme.slug, name, aliases, fields: [name, ...aliases, category].map((field) => field.split(' ')), position };
  });
}

export function searchThemes(index: readonly SearchEntry[], query: string): string[] {
  const normalized = normalizeSearch(query);
  const tokens = normalized.split(' ');
  return index.map((entry) => ({ entry, rank: !normalized || entry.name === normalized ? 0
    : entry.aliases.includes(normalized) ? 1
    : entry.fields.some((field) => tokens.every((token) => field.includes(token))) ? 2 : 3 }))
    .filter(({ rank }) => rank < 3)
    .sort((a, b) => a.rank - b.rank || a.entry.position - b.entry.position)
    .map(({ entry }) => entry.slug);
}
