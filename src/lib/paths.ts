/** Prefixes internal paths with Astro's configured base. */
export function sitePath(path = '', base = import.meta.env.BASE_URL): string {
  const prefix = `/${base.split('/').filter(Boolean).join('/')}`;
  const suffix = path.split('/').filter(Boolean).join('/');
  return suffix ? `${prefix === '/' ? '' : prefix}/${suffix}/` : `${prefix === '/' ? '' : prefix}/`;
}

export function themePath(slug: string, base?: string): string {
  return sitePath(slug, base);
}

export function assetPath(path: string, base = import.meta.env.BASE_URL): string { return `${sitePath('', base)}${path.replace(/^\//, '')}`; }
