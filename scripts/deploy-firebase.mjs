#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const args = process.argv.slice(2);
if (args.some((arg) => arg !== '--check-only')) {
  console.error('Uso: npm run deploy:firebase -- [--check-only]');
  process.exit(1);
}
const project = JSON.parse(readFileSync(join(root, '.firebaserc'), 'utf8')).projects.default;
const { hosting } = JSON.parse(readFileSync(join(root, 'firebase.json'), 'utf8'));
if (project !== 'contagemregressiva-48055' || hosting.site !== project || hosting.public !== 'dist') {
  throw new Error('Destino Firebase inesperado. Revise o script e a configuração antes de publicar.');
}
const cli = join(root, 'node_modules/firebase-tools/lib/bin/firebase.js');
if (!existsSync(cli)) throw new Error('Dependências ausentes. Execute npm ci antes do deploy.');
const origin = `https://${hosting.site}.web.app`;
const env = { ...process.env, SITE_URL: origin, PUBLIC_SITE_ORIGIN: origin, BASE_PATH: '/' };

function run(command, commandArgs) {
  const result = spawnSync(command, commandArgs, { cwd: root, env, stdio: 'inherit' });
  if (result.error) console.error(result.error.message);
  if (result.error || result.status !== 0) process.exit(result.status || 1);
}

function npm(script) {
  if (process.env.npm_execpath) run(process.execPath, [process.env.npm_execpath, 'run', script]);
  else run('npm', ['run', script]);
}

console.log(`Validando publicação em ${origin} (projeto ${project})`);
npm('check');
npm('build');
npm('test');
if (args.includes('--check-only')) {
  console.log('Validação concluída. Nenhuma publicação realizada.');
} else {
  // Usa o Node atual e o CLI fixado no lockfile; não depende do Firebase global.
  run(process.execPath, [cli, 'deploy', '--only', 'hosting', '--project', project, '--non-interactive']);
  console.log(`Publicado: ${origin}`);
}
