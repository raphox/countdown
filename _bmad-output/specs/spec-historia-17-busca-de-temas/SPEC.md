---
id: SPEC-historia-17-busca-de-temas
companions:
  - ../spec-contadores-tematicos/busca-de-temas.md
  - brownfield.md
sources: []
---

> Contrato de implementação derivado das decisões de `.memlog.md` e das fontes ali citadas em 2026-10-05. Esta SPEC e seus companions definem o recorte da História 17.

# História 17 — Busca de temas no site estático

## Why

Permitir que visitantes encontrem a ocasião desejada entre os quinze temas por nome, palavra ou sinônimo. A base Astro e o catálogo navegável da História 1 já estão entregues; a busca é a próxima etapa da descoberta.

## Capabilities

- **CAP-1 — Encontrar e escolher uma ocasião**
  - **intent:** A pessoa encontra e escolhe temas por nome, palavras inteiras ou sinônimos no catálogo.
  - **success:** Os casos de `busca-de-temas.md` retornam os temas e a ordem previstos, ignorando caixa e acentos; limpar restaura os quinze links; consulta desconhecida oferece recuperação; teclado e galeria sem JavaScript permanecem utilizáveis.

## Constraints

- Astro mantém saída estática e registry único; índice de nomes, categorias e aliases é gerado no build e entregue pelo próprio site, sem backend, banco, IA ou serviço de pesquisa.
- Normalização, correspondência, desempate e aliases seguem integralmente `../spec-contadores-tematicos/busca-de-temas.md`; preservar grafia visível, ordem do catálogo nos empates e um resultado por tema.
- Consultas são comparadas como texto e palavras inteiras, sem expressão regular construída da entrada nem combinação de tokens entre campos ou aliases distintos.
- Digitar e limpar, com índice carregado, geram zero requests; texto da busca não entra em analytics nem é transmitido a terceiros.
- Campo rotulado, ação de limpar, quantidade e mensagem acessível discreta; atualizações preservam foco e acesso por teclado/toque. Sem resultado, manter consulta e oferecer limpar/ver todos.
- Quinze cards e links permanecem no HTML estático sem JavaScript; rotas e recursos respeitam o base path existente. Integração e verificações estão em `brownfield.md`.

## Non-goals

- Pesquisa de conteúdo de eventos, descrições ou slugs; prefixos, stemming, correção de digitação e similaridade semântica.
- Descoberta automática de sinônimos ou atualização remota do índice; novos aliases exigem edição do catálogo e novo build.
- Criador, codec, contador, compartilhamento, mapas, agendas, reunião online, publicidade, artes finais e publicação, pertencentes às outras histórias.

## Success signal

- Demonstrar a matriz completa do companion, ranking determinístico e ausência de duplicatas; verificar zero requests durante digitação/limpeza, recuperação sem resultados e navegação das quinze rotas com e sem JavaScript, na raiz e em subdiretório.

## Assumptions

- **A14 herdada:** Os aliases iniciais propostos em `busca-de-temas.md` são a base editorial para esta implementação; esta spec não representa nova confirmação editorial.
