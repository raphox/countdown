import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import { createServer } from 'node:net';
import { resolve } from 'node:path';

const expected = new Map([
  ['aniversario', 'Aniversário'], ['ano-novo', 'Ano-Novo'], ['natal', 'Natal'],
  ['familia', 'Encontro da família'], ['empresa', 'Encontro da empresa'],
  ['formatura-fundamental', 'Formatura do ensino fundamental'],
  ['formatura-ensino-medio', 'Formatura do ensino médio'],
  ['formatura-faculdade', 'Formatura da faculdade'], ['casamento', 'Casamento'],
  ['viagem', 'Viagem e férias'], ['cha-de-bebe', 'Chá de bebê'],
  ['evento-tecnologia', 'Evento de tecnologia'],
  ['evento-medicina', 'Evento de medicina e saúde'],
  ['evento-direito', 'Evento de direito e jurídico'], ['festa', 'Festa genérica'],
]);
const prefix = `/${(process.env.BASE_PATH ?? '/').split('/').filter(Boolean).join('/')}`;
const base = prefix === '/' ? '/' : `${prefix}/`;
const site = process.env.SITE_URL ?? 'https://contagem.vivace-softwares.com.br';
const htmlPath = (slug) => `${base}${slug ? `${slug}/` : ''}`;

async function freePort() {
  const server = createServer();
  await new Promise((done) => server.listen(0, '127.0.0.1', done));
  const port = server.address().port;
  await new Promise((done) => server.close(done));
  return port;
}

async function startPreview(t) {
  const port = await freePort();
  const child = spawn(resolve('node_modules/.bin/astro'), ['preview', '--ignore-lock', '--host', '127.0.0.1', '--port', String(port)], { env: process.env, stdio: 'ignore' });
  t.after(() => child.kill());
  const origin = `http://127.0.0.1:${port}`;
  for (let attempt = 0; attempt < 40; attempt++) {
    if (child.exitCode !== null) throw new Error(`Astro preview exited with ${child.exitCode}`);
    try { const response = await fetch(`${origin}${base}`); if (response.ok) return origin; } catch { /* starting */ }
    await new Promise((done) => setTimeout(done, 150));
  }
  throw new Error('Astro preview did not start');
}

test('static catalog, theme routes, assets and 404 at the configured base', async (t) => {
  const files = await readdir(resolve('dist'));
  assert.ok(files.includes('404.html'));
  const origin = await startPreview(t);
  const homeResponse = await fetch(`${origin}${base}`);
  assert.equal(homeResponse.status, 200);
  const home = await homeResponse.text();
  assert.match(home, /<html lang="pt-BR">/);
  assert.match(home, /<main id="conteudo">/);
  assert.ok(home.includes(`<link rel="canonical" href="${site}${base}"`));
  assert.doesNotMatch(home, /<script\b/i);

  const hrefs = [...home.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  const sources = [...home.matchAll(/src="([^"]+)"/g)].map((match) => match[1]);
  for (const url of [...hrefs, ...sources]) {
    if (url.startsWith('http')) assert.ok(url.startsWith(site), `external resource: ${url}`);
  }
  for (const [slug, name] of expected) {
    assert.ok(hrefs.includes(htmlPath(slug)), `catalog link missing: ${slug}`);
    const response = await fetch(`${origin}${htmlPath(slug)}`);
    assert.equal(response.status, 200, slug);
    const page = await response.text();
    assert.ok(page.includes(`<h1 id="theme-title">${name}`), slug);
    assert.ok(page.includes(`href="${base}"`), `return link missing: ${slug}`);
    assert.match(page, /fuso horário/);
    assert.doesNotMatch(page, /<script\b/i);
  }

  const assets = [...home.matchAll(/(?:href|src)="(\/_astro\/[^"]+|\/countdown\/_astro\/[^"]+)"/g)].map((match) => match[1]);
  for (const asset of assets) {
    assert.ok(asset.startsWith(base), `asset outside base: ${asset}`);
    assert.equal((await fetch(`${origin}${asset}`)).status, 200, asset);
  }
  const missing = await fetch(`${origin}${htmlPath('tema-inexistente')}`);
  assert.equal(missing.status, 404);
  const notFound = await readFile(resolve('dist/404.html'), 'utf8');
  assert.ok(notFound.includes(`href="${base}"`));
});
