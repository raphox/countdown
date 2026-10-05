---
title: '1 — Base Astro e catálogo navegável'
type: 'feature'
created: '2026-10-05'
status: 'done'
route: 'full'
review_loop_iteration: 0
context:
  - '{project-root}/_bmad-output/specs/spec-contadores-tematicos/temas-e-artes.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problema:** O site contém três contadores fixos, sem catálogo de ocasiões.

**Abordagem:** História 1: Astro estático com catálogo, páginas temáticas e componentes comuns para descobrir quinze ocasiões.

## Boundaries & Constraints

**Sempre:** pt-BR; quinze slugs/nomes de `temas-e-artes.md`; registry tipado único; grupo Eventos (tecnologia, medicina, direito, festa); HTML útil sem JS; links/assets respeitam base path; domínio configurável (Q2 pendente); fontes do sistema. Preservar planejamento, BMad e legado.

**Nunca:** Backend, SSR, banco, Firebase, deploy, anúncios, métricas ou ações falsas. Busca, criador/codec, relógio, mapas, agendas, sharing, artes/OG finais ficam nas próximas histórias. Prévias provisórias só em desenvolvimento; produção usa texto/paletas, sem simular arte final ou inventar eventos.

## I/O & Edge-Case Matrix

| Cenário | Entrada | Resultado | Falha |
|---|---|---|---|
| Catálogo | `/` | Quinze links no HTML | Nenhum tema omitido |
| Acesso direto | Slug conhecido | Página própria e volta ao catálogo | Não depender de navegação anterior |
| Caminho inválido | Slug desconhecido | Página 404 e recuperação | HTTP 404, sem fallback para home |
| Subdiretório | Base `/countdown/` | Rotas e recursos sob o prefixo | Evitar links para a raiz externa à base |
| JS desativado | Home ou tema | Conteúdo e navegação utilizáveis | Aviso de que criar/contar exigirá JS |

</frozen-after-approval>

## Code Map

- `index.html`: legado com datas fixas e CDNs; preservar fora do produto gerado.
- `compiled/`: FlipClock e imagem antiga; preservar sem importar no catálogo.
- `_bmad-output/specs/spec-contadores-tematicos/`: contrato e sequência; história 17 sucede esta entrega.
- `.gitignore`: manter exclusões BMad e acrescentar artefatos Node/Astro.
- Base Git: `7c04db771d5b3f7b602eaef5293844e76b034edb`, branch `feat/contadores-tematicos`; Node local 24.18.0, sem pacote existente.

## Tasks & Acceptance

**Execução:**
- [ ] `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore` — configurar Astro estático, TypeScript, scripts dev/check/build/preview/test e dependências compatíveis com Node 24.
- [ ] `src/data/themes.ts` — registrar quinze temas, categoria, descrição, paleta e encerramento; permitir assets futuros sem caminhos fictícios.
- [ ] `src/lib/paths.ts` — centralizar caminhos com base configurável.
- [ ] `src/layouts/BaseLayout.astro`, `src/styles/global.css` — layout pt-BR responsivo, título/descrição, navegação, foco e link de pular conteúdo.
- [ ] `src/components/ThemeCard.astro`, `src/pages/index.astro`, `src/pages/[theme].astro` — gerar catálogo agrupado e quinze páginas pelo registry; conteúdo explica produto, compartilhamento futuro e fuso, sem controles inoperantes.
- [ ] `src/pages/404.astro` — erro recuperável estático.
- [ ] `tests/catalog.test.mjs` — testar matriz no HTML/servidor estático: status, recursos, quinze slugs contratados e links nas duas bases.
- [ ] `README.md`, `.env.example` — documentar execução, origem/base, publicação de `dist/`, requisito de 404 do host e limites desta etapa.

**Critérios:**
- Dado ambiente Node compatível, quando instalar e executar check/build, então gerar site estático sem servidor de aplicação.
- Dado catálogo gerado, quando abrir cada uma das quinze rotas diretamente sem JS, então encontrar nome correto, conteúdo útil e retorno funcional.
- Dado build na raiz ou subdiretório, quando seguir links/carregar CSS e pedir rota inexistente, então recursos válidos respondem e o erro retorna HTTP 404.
- Dada interface em 320/390/768/1440 px e zoom 200%, quando navegar por teclado, então não haver rolagem horizontal, foco oculto ou alvos menores que 44 px; texto normal atende contraste 4,5:1.
- Dado build de produção, quando inspecionar HTML/rede, então não carregar serviços externos ou prévias provisórias nem anunciar o MVP completo.

## Implementation Notes

## Spec Change Log

## Review Triage Log

## Verification

- `npm ci`, `npm run check`, `npm run build`, `npm test`: instalação reprodutível, tipos válidos e matriz aprovada.
- Repetir build/test com `SITE_URL=https://example.test` e `BASE_PATH=/countdown/`; restaurar build padrão depois.
- Inspecionar quatro tamanhos, teclado, sem JS e zoom; registrar limitações. Q2 e artes finais ficam pendentes.
- Referência técnica: https://docs.astro.build/en/reference/configuration-reference/ (`site`, `base`, `output`).
