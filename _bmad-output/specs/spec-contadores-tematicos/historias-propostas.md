# Histórias propostas — MVP consolidado

Dezessete histórias em ordem de execução, com quinze temas e nove capacidades. IDs anteriores preservados: executar 1, 17, 2, 15, 3–8, 13, 14, 16, 9, 12, 10 e 11. O contrato funcional é `SPEC.md` e seus companions; a aprovação do escopo não define checkpoints humanos. Esta decomposição ainda não é `stories.yaml`.

## 1. Base Astro e catálogo navegável

**Capacidades:** CAP-1, CAP-5.

Migrar a estrutura para Astro estático, criar registry de temas, layout e páginas reais de catálogo/tema com componentes compartilhados; entregar navegação e conteúdo textual. As artes definitivas serão concluídas nas histórias 4 a 8 e 13/14, com prévias provisórias identificadas somente no ambiente de desenvolvimento.

**Aceite:** Build estático e navegação direta dos quinze temas; 404 real, modo sem JS e convenções de domínio/base path previstas.

## 17. Busca de temas no site estático

**Capacidades:** CAP-1.

Implementar índice e aliases do catálogo, normalização e ranking conforme busca-de-temas.md, sem serviço externo de pesquisa. Entregar busca por nome/palavra exata, caixa/acentos indiferentes, sinônimos, limpeza e estado sem resultados com acesso por teclado.

**Aceite:** Casos de nomes/aliases e Unicode, palavras inteiras, ranking determinístico, consulta vazia/desconhecida, quinze rotas e zero requests por consulta, preservando galeria sem JavaScript.

## 2. Criador, prévia e contrato do link

**Capacidades:** CAP-2, CAP-4.

Implementar criador/prévia com local, endereço e anfitrião e reunião online opcionais, validação, fuso e codec v1 com coordenadas opcionais do destino e término opcional do compromisso, permitindo a qualquer visitante duplicar um link existente sem login, permissão ou consulta remota. Personalizar a cópia gera outra URL e preserva a original; aceitar v1 sem campos opcionais conforme arquitetura.md e ux.md.

**Aceite:** Round-trip com Unicode e detalhes opcionais, limites reais da URL, DST, sessão limpa, duplicação por outra pessoa sem autenticação/fetch, falhas recuperáveis e original preservado. Validar término posterior ao início e preservar opcionais ao duplicar. Integrar confirmação de local conforme história 15.

## 15. Local opcional, mapa e direções

**Capacidades:** CAP-2, CAP-8.

Implementar grupo Local opcional em todos os temas, confirmação de ponto, mapa OpenStreetMap e direções a partir de origem autorizada ou manual conforme mapas-e-rotas.md. Preservar links antigos sem coordenadas e manter origem do visitante fora do evento e da medição.

**Aceite:** Ausência de local sem mapa/requisições, mapa/rota em links confirmados, reconfirmação ao editar, busca/manual, tiles em falha, permissão negada/timeout e destino preservado no planejador.

## 3. Contagem correta e encerramento acessível

**Capacidades:** CAP-3.

Implementar o relógio a partir do instante absoluto, renderer isolado, estados vencido/zero e animação condicional conforme ux.md. Avaliar reaproveitamento do FlipClock/jQuery e canvas-confetti sem impor sua manutenção se falharem nos critérios.

**Aceite:** Relógio injetável nos testes, recálculo após suspensão, múltiplos fusos, ausência de negativos, teclado, leitor de tela e movimento reduzido.

## 4. Artes dos temas festivos

**Capacidades:** CAP-1, CAP-5.

Produzir e integrar as artes exclusivas de aniversário, Ano-Novo e Natal conforme temas-e-artes.md, incluindo variantes móvel/desktop, miniaturas e OG. Registrar originais, proveniência e direito de uso comercial.

**Aceite:** Três composições distintas conferidas nos quatro tamanhos, com textos máximos, zoom, encerramento e budgets de assets.

## 5. Artes dos encontros

**Capacidades:** CAP-1, CAP-5.

Produzir e integrar as artes de família e empresa com todos os exports, completando os cinco temas de primeira prioridade. Aplicar o mesmo contrato visual sem copiar composição ou lógica por tema.

**Aceite:** Duas composições finais, empresa sóbria, recortes móveis e OG legíveis, assets locais e licença/proveniência registrada.

## 6. Artes das três formaturas

**Capacidades:** CAP-1, CAP-5.

Produzir e integrar artes distintas para ensino fundamental, ensino médio e faculdade conforme temas-e-artes.md, usando os mesmos campos de evento. Entregar todas as versões, miniaturas e OGs sem reduzir a diferença a título ou recoloração.

**Aceite:** Três identidades reconhecíveis por etapa, textos máximos e mobile conferidos, catálogo/rotas atualizados e proveniência registrada.

## 7. Artes de casamento e chá de bebê

**Capacidades:** CAP-1, CAP-5.

Produzir e integrar as artes de casamento e chá de bebê com os exports e critérios compartilhados. Preservar o formulário comum, sem RSVP, lista de presentes ou cadastro adicional.

**Aceite:** Duas composições originais, contraste, cortes móveis, OGs legíveis e ausência de gênero obrigatório no chá de bebê.

## 8. Arte de viagem e férias

**Capacidades:** CAP-1, CAP-5.

Produzir e integrar a arte de viagem/férias com versões móvel/desktop, miniatura e OG. Usar os mesmos campos e componentes do evento, sem itinerário ou formulário específico.

**Aceite:** Composição original, textos máximos, cortes móveis, arte/OG e proveniência conferidos; a história 14 conclui o catálogo completo.

## 13. Artes de eventos profissionais

**Capacidades:** CAP-1, CAP-5.

Produzir e integrar artes próprias para eventos de tecnologia, medicina/saúde e direito/jurídico, agrupados na família Eventos conforme temas-e-artes.md. Entregar todas as versões e OGs usando o formulário compartilhado, sem inscrições ou programação de congresso.

**Aceite:** Três identidades profissionais distintas, rotas/miniaturas próprias, texto legível, comportamento sem confetes por padrão e assets com proveniência.

## 14. Festa genérica e catálogo completo

**Capacidades:** CAP-1, CAP-5.

Produzir a arte de festa genérica e concluir a galeria de quinze temas, incluindo o agrupamento Eventos. Conferir exports e integração de todas as identidades sem placeholders ou duplicação de regras.

**Aceite:** Quinze temas com páginas, miniaturas, artes responsivas e OGs finais; festa não depende de aniversário, e o conjunto passa pelos critérios visuais.

## 16. Reunião online opcional

**Capacidades:** CAP-2, CAP-9.

Implementar campo opcional de reunião HTTPS, sua validação e ação Entrar na reunião conforme SPEC.md e arquitetura.md. Preservar dados ao duplicar e preparar sua inclusão no convite/agenda, sem conectar contas ou carregar serviços automaticamente.

**Aceite:** Link presente/ausente, domínio visível, protocolos/credenciais inválidos, limites agregados, duplicação e abertura explícita; nenhum fetch de preview ou dado da reunião em analytics.

## 9. Compartilhamento e prévias sociais

**Capacidades:** CAP-4, CAP-5.

Implementar compartilhar, copiar link e copiar convite pronto com prévia/fallback, além de metadados estáticos por tema, canonical e assets absolutos. Preservar detalhes/endereço/reunião e URL completa, distinguindo OG genérica de conteúdo personalizado conforme SPEC.md CAP-4/CAP-5.

**Aceite:** HTML bruto e imagens OG corretos, sessão limpa, cancelamento/falha de clipboard; domínio real depende de Q2. Conferir texto do convite e opcionais, sem envio automático.

## 12. Adicionar aos calendários

**Capacidades:** CAP-7.

Implementar menu de calendário, exportação ICS local e opções Google/Microsoft/Apple conforme calendarios.md, com confirmação no destino e fallback de importação. Preservar título, instante inicial, término opcional, local/endereço, descrição e link completo sem OAuth, banco ou sincronização.

**Aceite:** Parser ICS independente e matriz de clientes/atalhos verificados; ausência de fim, DST, Unicode, links longos, injeção de propriedades e ausência de falso sucesso de salvamento. Preservar URL de reunião na descrição sem criar conferência.

## 10. Publicidade desativável e medição mínima

**Capacidades:** CAP-6.

Implementar slot, configuração de elegibilidade, adapter e estados de falha junto ao contrato de métricas de publicidade-e-metricas.md. Ativação de rede real e coleta dependem de Q1/Q3/Q4; demonstração local não conta como monetização ativa.

**Aceite:** Off sem scripts, mock explicitamente de teste, no-fill/erro/bloqueador sem regressão, ausência de dados pessoais e de URL integral em medição própria.

## 11. Integração final e preparação de publicação

**Capacidades:** CAP-1, CAP-2, CAP-3, CAP-4, CAP-5, CAP-6, CAP-7, CAP-8, CAP-9.

Executar o percurso integrado dos quinze temas e a exportação de calendário, mapas/direções, busca e reunião online, corrigir falhas que impeçam os critérios de aceite e preparar a configuração estática de produção. Registrar separadamente prontidão funcional, publicação e ativação comercial, com pendências externas nomeadas.

**Aceite:** Matriz de criterios-de-aceite.md com evidências reais, build final, quinze OG acessíveis e nenhum bloqueio funcional; deploy/contas externas não são simulados como concluídos.

## Checkpoints propostos para decisão humana

`spec_checkpoint` pausa para revisar o plano antes da implementação; `done_checkpoint` pausa após conclusão. `invoke_dev_with` é observação de despacho, não requisito de produto. Valores abaixo continuam propostas; o usuário confirmou o produto, não escolheu as pausas.

| História | Revisar plano antes | Revisar resultado depois | Observação proposta |
|---|---|---|---|
| 1 — Base Astro e catálogo navegável | Sim | Não | Nenhuma |
| 17 — Busca de temas no site estático | Não | Sim | Nenhuma |
| 2 — Criador, prévia e contrato do link | Sim | Sim | Nenhuma |
| 15 — Local opcional, mapa e direções | Sim | Sim | Nenhuma |
| 3 — Contagem correta e encerramento acessível | Não | Não | Nenhuma |
| 4 — Artes dos temas festivos | Não | Sim | Nenhuma |
| 5 — Artes dos encontros | Não | Sim | Nenhuma |
| 6 — Artes das três formaturas | Não | Sim | Nenhuma |
| 7 — Artes de casamento e chá de bebê | Não | Sim | Nenhuma |
| 8 — Arte de viagem e férias | Não | Sim | Nenhuma |
| 13 — Artes de eventos profissionais | Não | Sim | Nenhuma |
| 14 — Festa genérica e catálogo completo | Não | Sim | Nenhuma |
| 16 — Reunião online opcional | Não | Sim | Nenhuma |
| 9 — Compartilhamento e prévias sociais | Não | Não | Nenhuma |
| 12 — Adicionar aos calendários | Sim | Sim | Nenhuma |
| 10 — Publicidade desativável e medição mínima | Sim | Sim | Nenhuma |
| 11 — Integração final e preparação de publicação | Não | Sim | Nenhuma |

Convite PNG, tela cheia, QR, favoritos e OG dinâmica permanecem pós-MVP. A decisão de checkpoints pode ser feita antes de despachar implementação, sem reabrir o escopo funcional.
