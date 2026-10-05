---
title: '17 — Busca estática de temas'
type: 'feature'
created: '2026-10-05'
status: 'done'
baseline_commit: '0b84014786635c890cc64bf63f567fbfc3ce3156'
route: 'full'
review_loop_iteration: 0
context:
  - '{project-root}/_bmad-output/specs/spec-historia-17-busca-de-temas/SPEC.md'
  - '{project-root}/_bmad-output/specs/spec-historia-17-busca-de-temas/brownfield.md'
  - '{project-root}/_bmad-output/specs/spec-contadores-tematicos/busca-de-temas.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problema:** Visitantes precisam localizar uma ocasião entre quinze temas por nome, palavra inteira ou sinônimo; o catálogo atual oferece somente navegação por categoria.

**Abordagem:** Acrescentar busca local com índice derivado do registry no build, ranking determinístico e recuperação acessível. O contrato editorial e a matriz completos permanecem em `busca-de-temas.md`; esta implementação aplica todos os casos desse companion.

## Boundaries & Constraints

**Sempre:** Astro estático, registry único e quinze rotas preservadas; nomes visíveis das categorias pesquisáveis; aliases exatamente conforme companion, inclusive Eventos para tecnologia, medicina, direito e festa. Normalizar consulta e campos com NFD, remover marcas combinantes, converter minúsculas pt-BR, tratar pontuação/hífens como separadores e colapsar espaços. Melhor correspondência por tema: nome completo exato, alias completo exato, todos os tokens inteiros em um único nome/alias/categoria. Empates seguem registry; um resultado por tema. Exibir ranking global entre categorias. Limpar restaura catálogo agrupado. Preservar grafia, numeração e links via themePath/base path. Campo rotulado, placeholder contratado, ação limpar, quantidade e anúncio discreto sem deslocar foco; consulta desconhecida permanece editável e oferece recuperação. Quinze links no HTML sem JS, sem controles inoperantes. Com índice carregado, consulta e limpeza geram zero requests.

**Nunca:** Combinar tokens entre campos ou aliases distintos; pesquisar slugs, descrições ou conteúdo de eventos; regex construída da entrada, prefixos, stemming, correção, similaridade, backend, banco, serviços externos, analytics do texto. Criador, contador, compartilhamento, mapas, agendas, publicidade, artes finais e publicação estão fora do escopo. Preservar arquivos-fonte da SPEC, BMad e legado.

## I/O & Edge-Case Matrix

| Cenário | Entrada / estado | Resultado / comportamento | Recuperação |
|---|---|---|---|
| Nome/alias | Aniversário, niver, réveillon, colação de grau | Tema previsto na matriz editorial | Sem erro |
| Normalização | NFD/NFC, caixa mista, acentos, hífens, espaços e pontuação | Mesmo resultado normalizado | Sem regex da consulta |
| Palavra/categoria | formatura, medicina, juridico, eventos | Três formaturas, medicina, direito, quatro Eventos respectivamente | Ordem contratada |
| Ranking | Nome exato, alias exato, tokens e alias compartilhado | Melhor classe, empate estável, sem duplicatas | Todos os temas pertinentes |
| Campo isolado | Tokens repartidos entre aliases/campos | Sem correspondência fabricada | Consulta preservada |
| Vazio | Vazio, separadores ou limpar | Quinze temas, agrupamento restaurado | Foco utilizável |
| Desconhecido | tema inexistente, med, metacaracteres | Nenhum resultado quando não houver correspondência | Mensagem e limpar/ver todos |
| Sem JS | HTML servido diretamente | Quinze links navegáveis | Busca não apresenta controles inoperantes |

</frozen-after-approval>

## Code Map

- `src/data/themes.ts`: registry tipado, categorias visíveis e quinze paletas; acrescentar aliases sem alterar conteúdo existente.
- `src/lib/theme-search.ts` (novo): núcleo puro de índice, normalização e ranking, reutilizado no build e cliente.
- `src/pages/index.astro`: home agrupada; integrar índice e melhoria progressiva. `src/components/ThemeCard.astro`: identificar cards para reuso, mantendo themePath e numeração.
- `src/styles/global.css`: grids responsivos existentes; acrescentar controles, estado oculto e foco acessível.
- `src/lib/paths.ts`, `astro.config.mjs`: contrato já suporta raiz/subdiretório; reutilizar sem reescrever.
- `tests/catalog.test.mjs`: servidor preview, quinze rotas/assets/404; flexibilizar apenas scripts locais da home.
- `README.md`: atualizar limites que hoje indicam busca indisponível e ausência total de JS.
- Continuidade: História 1 entregue. Base Git `0b84014786635c890cc64bf63f567fbfc3ce3156`, branch `feat/contadores-tematicos`. Usuário autorizou usar/preservar pasta de SPEC não rastreada. Sem sprint-status ou contexto de épico aplicável.

## Tasks & Acceptance

**Execução:**
- [x] `src/data/themes.ts` — tipar e registrar aliases editoriais dos quinze temas.
- [x] `src/lib/theme-search.ts` — implementar índice e busca pura conforme matriz.
- [x] `src/pages/index.astro`, `src/components/ThemeCard.astro`, `src/styles/global.css` — integrar busca progressiva, ranking global, recuperação e restauração dos grupos.
- [x] `tests/theme-search.test.mjs` (novo) — validar matriz completa, aliases, Unicode, limites de palavras, campos isolados, ranking, estabilidade e deduplicação com fixtures.
- [x] `tests/catalog.test.mjs` — verificar fallback completo, scripts locais, rotas e recursos nas duas bases, preservando páginas temáticas sem JS.
- [x] `README.md` — documentar busca local, edição de aliases e limites reais.

**Critérios:**
- Dado o índice carregado, quando digitar/limpar consultas, então atualizar resultados sem requests, envio de texto, redirecionamento ou perda de foco.
- Dada consulta sem correspondência, quando usar recuperação por teclado/toque, então voltar aos quinze temas e continuar navegando.
- Dado JavaScript desativado, quando abrir catálogo e cada rota em ambas as bases, então navegar nos quinze temas sem depender do índice.
- Dada interface em 320/390/768/1440 px e zoom 200%, quando usar busca e teclado, então não haver overflow horizontal, foco oculto ou controles abaixo de 44 px; texto normal atende contraste 4,5:1.
- Dado build raiz/subdiretório, quando executar verificações, então tipos, build, matriz, assets e regressão 404 passam.

## Implementation Notes

- Aliases e índice derivados no build; módulo cliente pequeno inlineado pelo Astro, sem fetch. Cards reutilizados e grupos restaurados. Testes TypeScript via transpileModule. check/build/test aprovados em ambas as bases; build raiz restaurado.
- CUA confirmou busca formatura/eventos, recuperação e foco; larguras 320/390/768/1440 sem overflow, controles 48 px. Servidor temporário observou zero requests adicionais em seis consultas/limpeza/recuperação; CSP script-src none confirmou fallback real no browser. Navegação e busca em /countdown/ também conferidas. Zoom nativo direto fica pendente na integração final; não alegar execução.
- Usuário autorizou continuidade de todas as histórias sem novos checkpoints de aprovação para arquivos do projeto/temporários.

## Spec Change Log

## Review Triage Log

### Pass 1 — blind 7, edge 0, verification-gap 1

| Achado | Veredito | Rota/evidência |
|---|---|---|
| Blind: campo restaurado sem atualização inicial | medium | patch: chamar update antes de revelar controles; valor inicial hoje não recalcula. |
| Blind: ausência de teste DOM | medium | patch: eventos de input/limpeza/recuperação ainda não executados em npm test. |
| Blind: zero requests sem teste executável | medium | patch: teste DOM com instrumentação; servidor temporário confirmou 2 requests iniciais e zero adicionais em seis consultas/recuperação/limpeza. |
| Blind: evidência de acessibilidade/layout ausente | medium | patch: registrar CUA, quatro larguras sem overflow, controles48px/foco e fallback CSP; reflow equivalente a zoom coberto; zoom nativo direto não executado por interferência da sessão de uso do navegador e fica explicitamente pendente na integração final. |
| Blind: fixture de aliases deriva da implementação | medium | patch: fixture editorial independente. |
| Blind: índice servido não testado | medium | patch: parsear JSON do HTML gerado e conferir conteúdo. |
| Blind: checklist/notes vazios | false | checklist e notes já atualizados antes de coleta; snapshot anterior estava desatualizado. |
| Gap: DOM não executado | medium | patch: mesma causa da cobertura de eventos da home; acrescentar teste de integração. |


## Design Notes

Reusar cards existentes em um grid de resultados permite ordem global sem duplicar links. A consulta vazia restaura a apresentação agrupada; controles são habilitados somente após inicialização bem-sucedida.

## Verification

- `npm run check`, `npm run build`, `npm test`; repetir com `BASE_PATH=/countdown/`, restaurando build padrão.
- Navegador: matriz representativa, rede sem requests por busca, limpeza/recuperação, teclado/foco, sem JS, quatro larguras e zoom 200%. Registrar evidências e eventuais limitações reais.

- Verificação pós-patches: check/build/test nas duas bases aprovados, 6 testes executados sem skips; build padrão restaurado. Três revisores; todos os patches aplicados, sem defeitos funcionais restantes identificados.
