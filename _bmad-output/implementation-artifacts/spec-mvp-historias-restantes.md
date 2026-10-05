---
title: 'MVP — concluir histórias restantes'
type: 'feature'
created: '2026-10-05'
status: 'done'
baseline_commit: '057789acc4f1b5e64c641ca5448c82bf91d66294'
route: 'full'
review_loop_iteration: 0
context:
  - '{project-root}/_bmad-output/specs/spec-contadores-tematicos/SPEC.md'
  - '{project-root}/_bmad-output/specs/spec-contadores-tematicos/historias-propostas.md'
  - '{project-root}/_bmad-output/specs/spec-contadores-tematicos/arquitetura.md'
  - '{project-root}/_bmad-output/specs/spec-contadores-tematicos/ux.md'
  - '{project-root}/_bmad-output/specs/spec-contadores-tematicos/temas-e-artes.md'
  - '{project-root}/_bmad-output/specs/spec-contadores-tematicos/mapas-e-rotas.md'
  - '{project-root}/_bmad-output/specs/spec-contadores-tematicos/calendarios.md'
  - '{project-root}/_bmad-output/specs/spec-contadores-tematicos/publicidade-e-metricas.md'
  - '{project-root}/_bmad-output/specs/spec-contadores-tematicos/criterios-de-aceite.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problema:** Base Astro e busca estão implementadas; falta o restante do produto aprovado. Usuário solicitou seguir até concluir todas as histórias, sem novos checkpoints ou autorizações para comandos sobre arquivos deste projeto/temporários.

**Abordagem:** Implementar integralmente o contrato e seus companions, preservando busca e catálogo. Executar 2, 15, 3, 4–8, 13, 14, 16, 9, 12, 10 e 11 conforme dependências. Usuário mantém todos os objetivos nesta execução, dispensando o gate de divisão e aprovação intermediária. As questões Q1–Q5 limitam publicação/ativação externa, não autorizam inventar credenciais ou simular evidências.

## Boundaries & Constraints

**Sempre:** Aplicar todos os contratos dos nove arquivos contextuais. HTML estático Astro; mesmos quinze temas e componentes comuns; layout editorial refinado que acompanhe a qualidade das artes PNG, sem ilustração CSS antiga na abertura; eventos inteiros na URL v1, sem backend/storage necessário. Criador simplificado por padrão com título/data/tema; completa com todos os campos, alternância sem perda de dados. Limites por pontos de código, bytes e URL; texto seguro; UTC canônico/fuso explícito e rejeição de DST inexistente/ambíguo. Duplicação livre pelo evento aberto, sem formulário de importação ou fetch, preserva original/opcionais. Local opcional, confirmação/reconfirmação, mapa/rota e origem transitória apenas por ação. Reunião HTTPS explícita. Contador FlipClock pelo relógio atual, zero terminal, acessibilidade/movimento reduzido; confetti.browser ao entrar e a cada 10 segundos, com limpeza de timers e preferência de movimento reduzido do dispositivo. Quinze composições raster originais distintas em PNG, originais em alta resolução e todos os exports/OGs/proveniência. Decisões explícitas do usuário: artes PNG, não vetoriais, com área livre para textos; título/data/mensagem/contador dinâmicos em HTML, nunca embutidos na imagem. Usar fontes gratuitas Google Fonts compatíveis com cada tema, locais e com licença/proveniência registradas; inclusive exports PNG sem texto embutido, metadados OG permanecem em HTML. Compartilhamento/convite com fallback e sem falso sucesso. ICS interoperável local; atalhos só habilitados quando verificados. Publicidade/métricas desligadas por padrão com adapters de teste isolados. Build/base/404 e fallback sem JS preservados. Registrar prontidão técnica, limitações de teste e pendências externas separadamente.

**Nunca:** Login próprio, banco, Firebase, SSR, URLs MD5 irreversíveis, edição in-place, HTML livre, dados do evento em analytics, requests automáticos de reunião/busca, formulários de importação por link, geolocalização contínua, anúncios no criador/erro, identidades publicitárias inventadas, duração de calendário inventada, prévias provisórias como arte final, recolorações como quinze composições, deploy/push ou afirmação de teste externo não executado. Não implementar recursos pós-MVP. Não modificar SPEC/companions originais nem legado.

## I/O & Edge-Case Matrix

| Cenário | Entrada/estado | Resultado | Recuperação |
|---|---|---|---|
| Criar/duplicar | Unicode, opcionais, evento aberto | Prévia fiel, modos simples/completo, datas fixas sugeridas, nova URL, original íntegro, campos preservados ao trocar tema | Erro não apaga formulário |
| Codec | v1 antigo/novo, inválido, enorme, chaves extras, UTF-8/base64 ruim | Aceitar contrato estrito e passado na leitura | Erro sem carga bruta, criar outro |
| Tempo | Futuro, passado, leap day, fusos/DST, suspensão | UTC equivalente, rejeitar criação inválida, recalcular e zerar | Feedback focável |
| Local | Vazio, confirmado, editado, legado sem ponto, falha de tiles/busca | Sem requests vazio; mapa/direções quando confirmado; reconfirmar | Manual/endereço/fallback |
| Origem/reunião | Geolocalização negada/timeout; HTTPS ou protocolo/credenciais inválidos | Origem só transitória; ação de reunião só válida e explícita | Origem manual/correção |
| Arte | Quinze temas, máximo texto, mobile, arquivo ausente | Identidades finais/OGs distintas, conteúdo legível | Paleta/texto funcionais |
| Compartilhar | Clipboard ausente/falha; share cancelado | Link e convite íntegros; sucesso somente confirmado | Campo selecionável |
| Agenda | Sem fim/com fim, CRLF, emoji, URL longa | ICS UTC com escapes/folding/UID, sem duração inventada | Importação local/instruções |
| Ads/métricas | Off, mock, no-fill, erro, bloqueador | Sem scripts off; isolamento/foco intactos; allowlist estrita | Produto independente |

</frozen-after-approval>

## Code Map

- `src/data/themes.ts`, `src/lib/paths.ts`: registry e base únicos; expandir assets sem duplicar regras.
- `src/pages/[theme].astro`: atualmente página informativa; adicionar criador/evento/erro progressivos. `src/pages/index.astro`: busca local parcial e abertura editorial; duplicação somente pelo evento aberto, sem importação por formulário.
- `src/layouts/BaseLayout.astro`, `src/components/ThemeCard.astro`, `src/styles/global.css`: layout existente, cards reutilizados, estilos responsivos; adicionar OG/artes e interface consistente.
- `src/lib/theme-search.ts`, `tests/theme-search.test.mjs`, `tests/catalog.test.mjs`: preservar busca testada e ampliar testes estáticos para páginas interativas locais.
- `package.json`, `astro.config.mjs`: Astro estático e Node>=22.12; dependências justificadas/licenciadas, scripts check/build/test.
- Módulos novos: event-validation, event-codec, event-time, countdown-renderer, event-map, directions, share, calendar-export, ads, metrics; componentes/forms/client separados conforme necessário.
- `public/art/`, `public/og/`, `scripts/`: decisão do usuário em 2026-10-05 exige artes PNG, produzidas com imagegen, com originais em alta resolução e exports locais. Substituir consumo dos SVGs pela família raster; registrar prompts, origem e proveniência sem atribuir licença inventada ao gerador.
- Base Git: 057789acc4f1b5e64c641ca5448c82bf91d66294; História17 concluída e preservada. Q2 mantém origem configurável existente; Q1/Q3/Q4 off, Q5 exige configuração substituível e limites explícitos para demonstração/produção.

## Tasks & Acceptance

**Execução:**
- [x] Estados de navegação e formulário — requisito adicional: URLs próprias, pushState/popstate, voltar/avançar e acesso direto preservando campos/mode/tema e evento original.
- [x] `src/lib/event-{validation,codec,time}.ts`, componentes de formulário e `src/pages/[theme].astro`, `src/pages/index.astro` — História2: núcleo seguro, DST, criador/prévia e links; duplicação pelo evento aberto.
- [x] `src/lib/event-map.ts`, `src/lib/directions.ts`, componentes de local — História15: ponto/mapa/direções e falhas; configuração documentada.
- [x] `src/lib/countdown-renderer.ts`, componente de evento — História3: FlipClock, cálculo injetável, suspensão, zero, acessibilidade e confetti.browser por entrada/10 segundos, com movimento reduzido e limpeza.
- [x] `public/art/`, `public/og/`, geração de assets, registry/cards/estilos — Histórias4/5/6/7/8/13/14: quinze artes e exports finais com proveniência.
- [x] `src/lib/event-validation.ts`, formulário/evento — História16: reunião HTTPS opcional e domínio visível.
- [x] `src/lib/share.ts`, ações, layout — História9: convite/prévia/cópia/nativo/fallback e OG estática.
- [x] `src/lib/calendar-export.ts`, ações — História12: ICS local, parser independente, clientes/fallbacks e honestidade dos atalhos.
- [x] `src/lib/ads.ts`, `src/lib/metrics.ts`, componente/privacidade/config — História10: estados, elegibilidade e allowlist sem ativação comercial.
- [x] `tests/`, `README.md`, `.env.example`, relatório de aceite — História11: contratos/matrizes, integração quinze temas, duas bases, assets/404 e limites externos reais.

**Critérios:**
- Dado qualquer tema, quando criar/pré-visualizar/gerar/abrir/duplicar, então preservar dados/fuso e original sem backend ou autenticação.
- Dado entrada inválida/falha opcional, quando usar o produto, então recuperar sem perder campos, foco ou contador.
- Dado evento válido, quando tempo avançar/aba retomar, então calcular corretamente e terminar uma vez, respeitando movimento reduzido.
- Dado os quinze temas e HTML bruto, quando inspecionar arte/metadados/exports, então cumprir briefing, budgets e acessibilidade, em ambas as bases.
- Dado exportação ou integração opcional, quando cancelar/falhar/desligar, então não afirmar sucesso falso nem transmitir dados indevidos.
- Dado conclusão técnica, quando conferir relatório, então distinguir evidências reais, dispositivos/clientes indisponíveis e Q1–Q5, sem marcar publicação/comercial como entregues.

## Implementation Notes

- Usuário forneceu o SVG Lucide calendar-1 para o ícone funcional do calendário; markup/drawing aplicado exatamente, currentColor e decorativo. Esta exceção de ícone não altera requisito PNG das artes. CUA real confirmou SVG, clipboard, back/forward com campos preservados e skip link sem perder evento.

- Decisão de implementação de 2026-10-05 para a navegação solicitada: estados do controlador via query ui com whitelist simples/completo/editar/previa/erro; links de evento v1 mantêm duas chaves do fragmento e nenhuma query. Edição/prévia diretas transportam payload válido; drafts incompletos ficam em history.state e não são transportados por cópia de URL. PushState nas transições, restauração sem push em popstate/hashchange, deduplicação da montagem da mesma entrada.

- Em 2026-10-05, usuário exigiu URLs próprias e histórico para todas as telas/formulários. Estados UI locais usarão query estrita ?ui=simples|completo|editar|previa|erro, separados do codec de eventos v1 (que permanece estrito e sem query). Transições normais por pushState; popstate restaura modo, tema e campos sem novas entradas. Edição/prévia podem abrir diretamente com payload v1; draft/history.state preserva formulário no voltar/avançar/reload. Compartilhamento sempre usa URL canônica de evento, sem estado UI.

- Em 2026-10-05, usuário removeu o botão Copiar convite pronto e exigiu confirmação visível junto ao botão Copiar link, somente após sucesso real da clipboard, com fallback próximo na falha. Substituir o símbolo de grade do calendário por ícone reconhecível de calendário. Convite interno pode continuar sendo usado na descrição do ICS/compartilhamento nativo.

- Em 2026-10-05, usuário reforçou contraste de textos em todos os fundos. Corrigir a cascata real dos temas escuros, incluindo títulos, labels do relógio, detalhes abaixo e textos do card claro de calendário. Labels sobre objetos claros/escuros recebem pequenas superfícies de contraste, preservando a arte sem painel amplo.

- Em 2026-10-05, usuário removeu a seção de prévia do convite e pediu nova organização das ações. Manter cópia do convite; agrupar compartilhar/copiar, separar criação/duplicação e destacar calendário com ícone, card e instruções compactas. Omitir detalhes internos de validação do produto, mantendo pendências de atalhos nos documentos técnicos.

- Em 2026-10-05, usuário redefiniu composição: somente título e FlipClock sobre o PNG; data, status, rótulo de prévia, mensagem e todos os demais detalhes abaixo da imagem. Aumentar proporção mobile das faces reais e distribuir 2×2 mantendo cinco dígitos possíveis sem overflow.
- Em 2026-10-05, usuário removeu o checkbox de desativação e exigiu confetes em toda a tela. Canvas fixo no viewport, sem clipping do artcore; limpeza ao sair, entrada/10 segundos e preferência de movimento reduzido permanecem. Esta decisão substitui o controle manual anterior.

- Em 2026-10-05, usuário pediu cores das peças FlipClock baseadas na arte. Usar paleta temática do registry, números claros sobre accent legível nos temas claros e creme/números escuros nos temas noturnos; sobrescrever as classes reais do pacote com especificidade suficiente, sem modificar PNG.

- Em 2026-10-05, usuário exigiu estilos consistentes para todos os botões e campos, incluindo a recuperação “Ver todos os temas” no estado vazio da busca. Aplicar baseline visual global com foco visível, hover e disabled, preservando controles semânticos e a biblioteca FlipClock.

- Em 2026-10-05, usuário exigiu busca por partes da palavra em qualquer posição, não apenas palavra inteira. Aplicar substring a nome/aliases/categoria após normalização existente, mantendo ranking de relevância e interseção de tokens quando há múltiplos trechos. Exemplos: “vers” → Aniversário, “tec” → Tecnologia. Preservar busca estática e ausência de requests por consulta.
- Em 2026-10-05, usuário pediu preenchimento automático de data para temas com data fixa. Natal: próxima ocorrência de 25/12; Ano-Novo/fim de ano: próxima virada em 01/01 às 00:00, no fuso selecionado/do navegador. Aplicar ao abrir criador novo e selecionar tema fixo, mantendo data editável. Duplicação não altera data original; temas pessoais/corporativos não inventam data fixa. Testar virada de ano e data da ocasião já transcorrida.
- Em 2026-10-05, usuário rejeitou o painel branco amplo/discreto sobre a arte do evento. Preservar integralmente os PNGs gerados e integrar título/data/mensagem/FlipClock diretamente à área livre da composição; hierarquia central, contraste adaptado a temas claros/escuros, profundidade contida, espaçamento e controles discretos inspirados na clareza das interfaces Apple/Microsoft/Facebook. Evitar grande superfície opaca que esconda a arte. Não copiar marcas/UI nem adicionar novos elementos às imagens.
- Em 2026-10-05, usuário exigiu FlipClock para animar a contagem e `confetti.browser` ao entrar no evento e a cada 10 segundos. Substituir contador visual/efeito CSS pelos pacotes oficiais locais, sem CDN, mantendo relógio atual, retomada, zero terminal e anúncio textual acessível. Animações respeitam movimento reduzido/desativação e são limpas ao sair de evento/prévia; efeitos festivos por entrada e intervalo conforme solicitação explícita, sem impedir ações.
- Em 2026-10-05, usuário exigiu duas versões do criador. Simplificada por padrão: apenas título, data e tema. Versão completa revela horário, fuso, mensagem e todos os opcionais existentes, preservando os valores ao alternar. Decisão operacional: data simples conta até 00:00 no fuso do navegador, indicada em texto breve; horário/fuso ajustáveis na completa. Duplicação preserva horário e opcionais e abre completa quando necessário para torná-los visíveis. Mesma validação segura e rejeição DST; sem perda silenciosa de dados.
- Em 2026-10-05, usuário exigiu evolução visual do layout para acompanhar a qualidade dos PNGs. Refinar home, galeria, criador e evento como experiência editorial coesa: artes reais na abertura (substituir círculos/ilustração CSS antigos), tipografia e hierarquia, espaçamento, superfícies e controles com acabamento profissional. Não inserir texto nas imagens; preservar acessibilidade, funcionalidades e quatro larguras. Não criar novos recursos ou etapas.
- Em 2026-10-05, usuário removeu explicitamente o formulário de importação por link da interface. Duplicação é iniciada ao acessar um evento e clicar em “Duplicar e personalizar”; preservar original e todos os opcionais. Remover formulário de home/criador e código exclusivo desse formulário, mantendo leitura segura da URL e duplicação do evento aberto.
- Em 2026-10-05, usuário explicitou que não haverá distinção entre masculino e feminino: todas as artes devem representar a ocasião de forma inclusiva, sem personagens, símbolos ou composição que remetam exclusivamente a um gênero. A seleção de cores não define público por gênero. Aplicar esse requisito também às variantes mobile, galeria e OG.
- Em 2026-10-05, usuário renegociou explicitamente o formato visual: artes devem ser PNG, não vetoriais, para melhorar qualidade. SVGs intermediários não satisfazem entrega final. Núcleo funcional/testes continua; produção/integração PNG ocorrerá em seguida. Depois, usuário reforçou imagens sem texto embutido e sugeriu fontes gratuitas Google Fonts adequadas ao tema; decisão adotada com self-hosting e licenças locais.

## Spec Change Log

## Review Triage Log

| Origem | Finding | Veredito | Evidência e rota |
|---|---|---|---|
| Blind 1 | Fuso do fim no modo simples | medium | readEvent usa browserZone no início e value(timeZone) no fim; endpoints do mesmo formulário divergem após troca de modo. patch: fuso efetivo comum. |
| Blind 2 | Seleção no mapa não persiste | medium | pick chama set/updateFields sem saveDraft; history.state mantém ponto anterior. patch. |
| Blind 3 | Resultado geocodificado não persiste | medium | onclick do resultado também omite saveDraft após invalidar confirmação. patch, mesma raiz de Blind2. |
| Blind 4 | Busca assíncrona obsoleta | medium | search-location não verifica query/estado depois do await; resultados podem substituir consulta posterior. patch. |
| Blind 5 | Origem usa destino posterior | medium | current-origin relê transientPoint após await, e showEvent altera esse valor. patch. |
| Blind 6 | Movimento reduzido da prévia | false | global.css linhas6/10 aplica media prefers-reduced-motion a todas as animações e às faces FlipClock, inclusive preview; independência já existe em CSS. rejeitar. |
| Blind 7 | Falta controle manual de confetes | false | Usuário removeu expressamente checkbox/controle manual; preferência do dispositivo continua respeitada. Reintroduzir contraria intenção explícita. rejeitar. |
| Blind 8 | Mapa do criador retém seleção anterior | medium | disposeCreatorMap só é usado ao montar novamente; fill/showEvent não limpam superfície/listeners. patch de descarte. |
| Blind 9 | Atribuição de provedor customizado | low | Configuração aceita tiles alternativos mas atribuição é OSM; provedores finais/atribuição estão explicitamente pendentes Q5, sem consumidor alternativo implantado. Rejeitar expansão de configuração antes de definição do provedor. |
| Blind 10 | Importações externas não testadas | maybe-false | Parser independente verifica formato, não comportamento de clientes reais. Ambiente Google/Outlook/Apple e versões são necessários para decidir interoperabilidade. defer medium não verificado; pendência já declarada, sem alegar aceite externo. |
| Blind 11 | Matriz visual/zoom incompleta | maybe-false | CUA cobre larguras e alguns temas, não todo conjunto no zoom nativo200. Inspeção real dos casos restantes decidiria defeito de layout. defer medium não verificado, limitações preservadas. |
| Edge 1 | Coordenadas programáticas não persistem | medium | Mesmo percurso confirmado em Blind2/3. patch agrupado; finding registrado individualmente. |
| Edge 2 | Share copia evento posterior | medium | share-event usa activeURL após await de nativeShare; showEvent atualiza URL nesse intervalo. patch com snapshot/contexto. |
| Edge 3 | Geolocalização navega destino posterior | medium | Confirmado pelo await seguido de directionsURL(transientPoint,origin). patch agrupado com Blind5. |
| Edge 4 | Fallback de endereço invisível na prévia | medium | copy-address está fora de event-actions; manual-copy/copy-status estão dentro, enquanto event-actions.hidden=preview. patch com feedback próprio visível no local. |
| Edge 5 | Resultados de busca fora de ordem | medium | Nenhuma guarda de consulta ou contexto em search-location. patch agrupado com Blind4. |
| Gap 1 | Download ICS não exercitado | medium | Evidência pre-verificada: parser exercita calendarICS mas nenhum teste invoca botão/downloadCalendar; remoção de a.click fica invisível. patch de teste de Blob/download real do handler. |
| Gap 2 | Loader confetti não exercitado | medium | Evidência pre-verificada: injeção de burst e preferência reduzida contornam loader em todos os testes. patch de integração vendor/base e descarte pendente. |
| Gap 3 | Busca configurada não exercitada | medium | Evidência pre-verificada: fixture força endpoint vazio; query/lat/lon não são testados em configuração ativa. patch de request/resposta/seleção. |


Patches agrupados aplicados pelo mesmo implementador. Verificação final do root: 61/61 testes nas duas bases, check sem erros/warnings/hints, build18 páginas, raiz restaurada; diferenças sem whitespace inválido. Pendências de clientes reais e matriz visual completa registradas em deferred-work e MVP-ACCEPTANCE.

## Verification

- `npm run check`, `npm run build`, `npm test` na raiz e com `BASE_PATH=/countdown/`; restaurar raiz.
- Testes de todas as linhas da matriz e companions, DOM integrado e parser ICS independente. Conferência browser por CUA: percurso, textos máximos, quatro larguras, zoom, foco, rede, sem JS, falhas. Registrar limites reais.
