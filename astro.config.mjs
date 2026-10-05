import { defineConfig } from 'astro/config';

const base = `/${(process.env.BASE_PATH ?? '/').split('/').filter(Boolean).join('/')}`;

export default defineConfig({
  vite: { define: { 'import.meta.env.PUBLIC_SITE_ORIGIN': JSON.stringify(process.env.PUBLIC_SITE_ORIGIN || process.env.SITE_URL || 'https://contagem.vivace-softwares.com.br') } },
  site: process.env.SITE_URL || 'https://contagem.vivace-softwares.com.br',
  base: base === '/' ? '/' : `${base}/`,
  output: 'static',
  trailingSlash: 'always',
});
