# Integração e verificação da busca

## Recorte e proveniência

Implementar a seção 17 de `../spec-contadores-tematicos/historias-propostas.md`, após a História 1. O contrato completo de busca, incluindo tabela de aliases e matriz de consultas, é o companion adotado `../spec-contadores-tematicos/busca-de-temas.md`. As demais histórias e os checkpoints propostos não integram este recorte; não gerar `stories.yaml` ou escolher pausas humanas nesta execução.

## Pontos de integração

- `src/data/themes.ts`: registry tipado dos quinze temas, ainda sem aliases. Acrescentar a lista curada por tema; usar nomes visíveis de `categories` na pesquisa de categoria. O ID interno não substitui o nome pesquisável. Eventos reúne tecnologia, medicina, direito e festa.
- `src/lib/theme-search.ts` (novo módulo proposto): núcleo de normalização e correspondência testável sem DOM; índice derivado do registry no build. Cada tema recebe sua melhor classe; ordenar por classe e posição original do registry. Um alias compartilhado admite vários temas.
- `src/pages/index.astro`: integrar campo “Buscar tema” acima da galeria, exemplo “Aniversário, formatura, tecnologia…”, contador e recuperação. O HTML inicial contém todos os cards; habilitar a interação com melhoria progressiva e evitar controles inoperantes sem JS.
- `src/components/ThemeCard.astro` e `src/styles/global.css`: integrar apresentação dos resultados e foco; manter nomes, links via `themePath`, conteúdo e navegação. A galeria hoje é agrupada por categoria: a apresentação dos resultados deve tornar observável a ordem global do ranking, mesmo quando temas de categorias distintas correspondem.
- `src/lib/paths.ts`: reutilizar o contrato de base path; não construir links absolutos à raiz manualmente.
- `tests/catalog.test.mjs`: a asserção atual proíbe qualquer script na home. Ajustá-la para permitir o script local da busca e verificar HTML completo/fallback e ausência de serviços externos. A busca não exige scripts nas páginas temáticas.

## Verificação de aceite

1. Executar todas as consultas da matriz de `busca-de-temas.md` e conferir os aliases iniciais dos quinze slugs, sem reescrever a lista neste arquivo.
2. Testar formas Unicode precomposta/decomposta, caixa mista, acentos pt-BR, hífens, espaços repetidos, pontuação e entrada com metacaracteres; nenhuma exceção ou interpretação da consulta como regex. Consulta normalizada vazia, inclusive só separadores, restaura o catálogo.
3. Usar fixtures controladas para diferenciar nome completo exato, alias completo exato e tokens em um único nome/alias/categoria; conferir melhor classe, empates pela ordem original, alias compartilhado e resultado único por tema. Tokens repartidos entre aliases distintos não correspondem; `med` não encontra `medicina`.
4. No navegador, digitar, limpar e recuperar de “Nenhum tema encontrado”; verificar quantidade, anúncio discreto, manutenção de foco, teclado e toque, sem redirecionamento automático. Inspecionar rede após carregar o índice: zero requests por consulta/limpeza e nenhum envio do texto a analytics.
5. Desativar JavaScript e recarregar: quinze links navegáveis no HTML, sem depender do índice para acessar páginas. Recarregar com JS continua funcionando somente com os arquivos estáticos.
6. Conferir quinze rotas e recursos em `/` e `/countdown/`, além da regressão de 404. Rodar `npm run check`, `npm run build` e `npm test` em ambas as configurações de base.
7. Conferir 320, 390, 768 e 1440 px, zoom 200%, foco visível, contraste de texto normal 4,5:1 e controles de 44 px, preservando o piso de acessibilidade da História 1.

Estas são verificações exigidas da implementação futura; a criação desta spec não comprova execução da busca.
