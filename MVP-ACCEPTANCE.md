# Evidências técnicas — 2026-10-05

Este registro distingue a implementação funcional dos aceites visual, externo e comercial. Não há deploy/push, contas, receita ou preview social de produção validado.

## Evidências executadas

- `npm run check`: sem erros, warnings ou hints.
- `npm run build`: 18 páginas estáticas (home, quinze temas, privacidade e 404).
- `npm test`: **61/61 passaram** na raiz e em `BASE_PATH=/countdown/` após a última mudança. Check/build limpos nas duas bases; build raiz restaurado ao final. Testes reais Node, HTML via servidor Astro temporário, DOM `linkedom` e parser ICS independente `ical.js`.
- Contratos: round-trip Unicode/opcionais e quinze temas; schema/tipos/chaves, base/origem/fragmento/Base64URL/UTF-8, limites individuais/agregados, passado na leitura e futuro na criação, duplicação original íntegra.
- Tempo: fusos equivalentes, leap day, virada de ano, DST inexistente/ambíguo (New York/Lord Howe), relógio injetável, suspensão e zero terminal.
- Busca: substring normalizada em qualquer posição, prioridades nome/alias exato → palavra inteira → trecho, isolamento por campo, ordem estável e nenhuma requisição por consulta; DOM compilado cobre vers/tec/mat/médi/categoria parcial e restauração de cartões/foco.
- Histórico: testes DOM com pilha back/forward e eventos popstate/hashchange comprovam draft/opcionais/mode/tema restaurados, preview/edit diretos, reload de draft incompleto e recovery de erro; codec v1 continua rejeitando query. Skip link preserva fragmento/relógio e foca main; href nativo permanece para fallback sem scripts.
- CUA real: completo → prévia → voltar → avançar preservou título/data/hora/mensagem; evento → duplicação → prévia → dois retornos recuperou o evento original intacto. Reload e skip link mantiveram o fragmento do evento, com foco em main. SVG calendar-1 fornecido pelo usuário confirmado no DOM e visualmente; captura do cartão em `/private/tmp/countdown-calendar-detail.png`.
- DOM: quinze percursos abrir → duplicar → prévia → novo link; texto de script seguro, opcionais preservados, confirmação/reconfirmação, modo simples à meia-noite no fuso do navegador, alternância preservando campos completos, tema em memória e recuperação de payload inválido.
- Relógio/efeitos: DOM da biblioteca FlipClock real com cinco dígitos de dias, tempo injetado e descarte; confete com entrada/10s/pausa sem rajadas acumuladas, movimento reduzido. Distribuição browser idêntica ao npm. FlipClock 1.0.1 e canvas-confetti 1.9.4 instalados e confirmados como latest no npm em 2026-10-05.
- Datas fixas: próxima ocorrência em fuso local, meia-noite, virada de ano e nenhum preenchimento inventado para temas pessoais.
- Compartilhar: CUA real confirmou clipboard com botão Link copiado! e aria-live adjacente em 2026-10-05; download externo não executado. clipboard ausente/falha, Web Share cancelada/sucesso; convite íntegro e fallback manual. API mockada não comprova compartilhamento em app real.
- Agenda: parser independente, UTC, fim opcional/sem duração inventada, UID determinístico, folding por bytes, Unicode e prevenção de injeção de VEVENT.
- Integrações: adapters publicitários off/filled/no-fill/error e elegibilidade; métricas com allowlist, falha isolada e dados mínimos. Geolocalização mockada por chamada única e falha/recusa; tiles em falha e busca não configurada sem requests.

- Revisão final: três lentes independentes, findings triados individualmente. Patches para fuso coerente, persistência/limpeza do mapa, respostas tardias de busca/share/geo e fallback de endereço em prévia; testes de provider ativo, download Blob/âncora/parser e loader real em VM adicionados. Aceites externos e matriz visual restante continuam explicitamente pendentes.

## Pendências de aceite

- **Artes:** quinze composições PNG com desktop/mobile dedicados integradas; originais e exports completos preservados. Mobile servido 540×960 entre 216 e 380 KB, OG 1200×630 entre 293 e 494 KB. Manifesto inclui prompts e SHA-256; título/data/mensagem/contador permanecem HTML. Inspeção visual final das variantes no browser, textos máximos e quatro larguras deve ser registrada pelo agente responsável; testes de dimensões/hashes/budgets não substituem essa inspeção. SVGs intermediários removidos e OGs vetoriais sobrescritas; auditoria dos assets do projeto não encontrou outros PNG/SVG fora desse conjunto (legado e dependências preservados).
- **Browser/dispositivos:** o agente responsável registrou CUA real da composição final: Aniversário nas larguras 320/390/768/1440 sem overflow; relógio mobile2×2, fonte real41,73px a390; artcore contém apenas título/contador e todos os detalhes abaixo. Formatura Ensino Médio com título/data/status creme, labels sobre pills escuras; help do card calendário computed RGB74/81/73. Ano-Novo/Tecnologia/Festa também tiveram cores computed verificadas. Confete no body/fixed ocupa viewport, sem checkbox, respeitando movimento reduzido. Agrupamento de ações/calendário inspecionado no desktop/mobile. Busca vers com dois resultados e paca sem resultados/Ver todos com altura44px/radius8; servidor temporário com CSP script-src none confirmou HTML com quinze cartões e busca oculta; não foi desativado o JavaScript global do navegador. CUA anterior no prefixo /countdown/ confirmou busca tec, criador simples, geração da URL, FlipClock e caminhos corretos da fonte, PNG e vendor. Outros temas/textos máximos, zoom200%, teclado completo e falhas externas ainda exigem aceite específico. Teste DOM não comprova layout. Safari/iOS e Chrome/Android reais indisponíveis nesta etapa de implementação.
- **Calendários externos:** Google web, Outlook pessoal/Microsoft365 e Apple Mac/iOS/Android precisam de importação real com ambiente/versão documentados. Atalhos permanecem desabilitados; ICS/instruções disponíveis.
- **Q2/publicação:** domínio/base de produção e preview social real (fragmento/cache) pendentes. O host deve servir 404 real.
- **Q5/mapas:** tiles públicos são demonstração. Provedor/limites/atribuição de produção e validação real do planejador pendentes; geocodificação desligada por padrão.
- **Q1/Q3/comercial:** rede/conta/formatos/elegibilidade, responsável/contato, mercados/privacidade/consentimento não definidos; ads desligados.
- **Q4/negócio:** destino de métricas e metas não definidos; medição desligada. Mock/slot não comprova monetização.

## Limites do produto

Relógio do dispositivo; nenhum servidor de hora. Dados públicos para portadores do link, sem revogação ou sincronização. Geocodificador substituível exige endpoint com limites agregados adequados, nunca Nominatim público como padrão. Falhas de terceiros não interrompem o evento. Fontes Google Fonts locais, com originais TTF/OFL e WOFF2 pt-BR; máximo de fontes por página abaixo de 260 KB, sem CDN.
