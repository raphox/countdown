# Contagem — contadores temáticos

Site Astro estático em pt-BR com quinze temas, busca local por palavras ou trechos em qualquer posição (sem acentos, com prioridade para nome/alias exatos) e eventos completos no fragmento da URL. Criador, prévia, duplicação livre pelo botão do evento aberto, contagem, reunião opcional, convite e exportação ICS funcionam sem cadastro, backend ou storage necessário. JavaScript é necessário para eventos; catálogo e informações permanecem no HTML.

## Desenvolvimento e verificação

Node >=22.12.0 (verificado com Node 24). Instale com `npm ci`, execute `npm run dev`. Antes de entregar:

```sh
npm run check
npm run build
npm test
BASE_PATH=/countdown/ npm run check
BASE_PATH=/countdown/ npm run build
BASE_PATH=/countdown/ npm test
npm run build
```

Os testes verificam HTML/rotas/status HTTP/OG, busca compilada, contratos do evento, quinze fluxos DOM, parser ICS independente `ical.js`, falhas opcionais e adapters publicitários. O servidor temporário dos testes exige permissão para ouvir em localhost. `linkedom` é somente infraestrutura de teste; não substitui validação em dispositivos reais.

## Origem e publicação

Copie `.env.example` se necessário. `SITE_URL`, `PUBLIC_SITE_ORIGIN` e `BASE_PATH` são configurações de build. A origem de produção aceita na leitura de links deve acompanhar o domínio publicado; a origem atual também é aceita. Links v1 têm formato `/<tema>/#v=1&dados=<JSON UTF-8 Base64URL>`; máximo 4096 caracteres, JSON máximo 3072 bytes. Base64URL não cifra os dados. Não use informação confidencial; os links não podem ser revogados.

Publique somente `dist/` em hospedagem estática, após resolver domínio e configuração operacional. Sirva `404.html` com status **404**; não use fallback universal. Em subdiretório, monte `dist/` no prefixo configurado. Não há deploy nem push nesta entrega.

## Tempo, detalhes e mapas

O formulário começa no modo Simples: título, data e tema. A data corresponde a 00:00 no fuso do navegador, indicado na tela. Completo revela horário, fuso, mensagem e opcionais; alternar preserva os valores. Duplicar abre Completo com todos os dados originais. Não há formulário para importar links: abra o link e use Duplicar. Natal sugere o próximo 25 de dezembro; Ano-Novo, o próximo 1º de janeiro, à meia-noite. A data é editável e nunca substitui uma data duplicada.

O fuso IANA é explícito; criação rejeita horários ambíguos/inexistentes e datas passadas. A leitura aceita eventos vencidos e o contador termina em zero. O relógio é o do dispositivo, sem consulta de hora remota. O fim opcional do compromisso não muda o alvo da contagem.

Local/endereço exige confirmação de coordenadas em novos links. Alterar texto/ponto exige reconfirmação; links antigos sem ponto oferecem resolução transitória. A seleção manual funciona por coordenadas ou mapa (zoom e setas de teclado). Limpar Local remove o ponto. Mapa carrega ao aproximar a seção; falhas mantêm endereço e direções.

`PUBLIC_MAP_TILES` é substituível. O padrão público OpenStreetMap é apenas demonstração; Q5 exige decidir provedor, atribuição, termos e uso de produção. Não há prefetch offline. `PUBLIC_GEOCODER_URL` está vazio: busca só por clique quando configurada, em `GET ?q=…`, resposta `[{display_name,lat,lon}]`; endpoint deve tratar CORS, limites agregados e termos. Não usar Nominatim público como padrão. Nenhuma busca automática por tecla ou visita.

Direções usam planejador OSM com `engine=fossgis_osrm_car` e pares `origem;destino`. A origem atual só é consultada uma vez por ação, em memória; recusa/timeout permite origem manual no planejador. A origem nunca entra no payload/ICS/métricas. Validar o fluxo do planejador em navegador real antes de alegar compatibilidade externa.

## Compartilhar e agenda

Clipboard e Web Share têm falhas/cancelamento honestos e seleção manual. Copiar link oferece confirmação visível junto à ação após sucesso real e fallback manual próximo em falha. O calendário tem card próprio com download e instruções compactas. Reunião HTTPS é validada e só abre explicitamente. OG é genérica por tema, no HTML; nenhum dado do evento personaliza a OG.

Arquivo ICS é gerado localmente com UTC, escapes, CRLF, folding UTF-8, UID SHA-256 canônico e sem alarmes/convites. Sem fim, não inventa duração. A pessoa confirma importação e lembretes no destino. Atalhos Google/Microsoft estão indisponíveis até serem verificados; os três destinos têm instruções e fallback ICS. Testes com parser não comprovam importação real em Google, Outlook/Microsoft365, Apple ou celulares.

## Publicidade, métricas e privacidade

Sem scripts comerciais e sem destino de métricas. `ads.ts` permite no máximo um slot por página elegível, depois das ações, com reserva fixa quando ativo. Criador/prévia/erro não recebem anúncios. `PUBLIC_AD_TEST_MODE=filled|no-fill|error` funciona somente em `astro dev`; é demonstração local, nunca impressão real. Builds sempre mantêm off.

`metrics.ts` usa allowlist de nomes/propriedades e slugs conhecidos. O adapter é desligado no produto; testes demonstram propriedades mínimas e falha isolada. Não recebe payload, URL, data, fuso, texto, consulta ou coordenadas. Q1/Q3/Q4 precisam ser resolvidas antes de qualquer ativação. `/privacidade/` explica funcionamento atual, sem inventar operador ou política jurídica final.

## Artes e pendências

O registry concentra todos os caminhos de arte. Os quinze temas usam composições **PNG** originais produzidas com OpenAI image_gen, sem texto embutido, pessoas ou símbolos exclusivos de gênero. Cada tema tem original desktop e uma composição móvel dedicada, além de exports 1920×1080, 1080×1920, miniatura 640×360 e OG 1200×630. O navegador móvel carrega PNG responsivo 540×960 (216–380 KB); o export completo não é carregado automaticamente. OGs ficam abaixo de 500 KB. Fontes, título, data, mensagem e contador são HTML. `npm run generate:art` reproduz os derivados via Sharp sem inserir texto. Originais/prompts/SHA-256/proveniência ficam em `public/art/`; uso das artes segue os termos aplicáveis do gerador, sem atribuição de licença artística inventada. Os SVGs intermediários e OGs antigas foram removidos/substituídos. A matriz visual final de browser/dispositivos permanece separada do teste automatizado.

Legado `index.html`/`compiled/` e SPEC/companions originais permanecem preservados. Evidências e limites de aceite estão em `MVP-ACCEPTANCE.md`.

## Fontes locais

As dez famílias Google Fonts têm TTF original, licença OFL e manifesto de commit/SHA-256 em `public/fonts/`. O site serve subsets WOFF2 pt-BR: Inter no corpo/controles/relógio e a família do tema apenas nos títulos. Nenhuma requisição para Google Fonts ocorre no navegador. Downloads de fontes por página ficam abaixo de 260 KB, incluindo Inter e o título. Trocar tema atualiza sua fonte sem perder campos. Subsets modificados têm nomes internos próprios para respeitar Reserved Font Names; atribuição e OFL originais estão preservadas. Reprodução em `public/fonts/README.md`.

## Relógio e efeitos locais

O contador usa a biblioteca oficial `flipclock@1.0.1`, com quatro instâncias controladas pelo cálculo absoluto do evento, zero terminal e anúncio textual por minuto. `canvas-confetti@1.9.4` fornece sua distribuição oficial `confetti.browser.js`, copiada sem alterações para `public/vendor/` no prebuild, com licenças e hashes. Confetes cobrem a tela inteira, sem bloquear cliques. Sobre o PNG ficam somente título e contador; todos os demais detalhes aparecem abaixo. No celular, o relógio usa uma grade 2×2. O efeito aparece ao entrar no evento e a cada dez segundos em todos os temas; não roda no criador ou prévia. Pausa em aba oculta, respeita movimento reduzido, e é descartado na navegação. Nada depende de CDN. Versões instaladas confirmadas como latest no npm em 2026-10-05; isso não garante versões futuras.

## Navegação e rascunhos

Cada estado do criador tem URL própria: `?ui=simples`, `?ui=completo`, `?ui=editar`, `?ui=previa` ou `?ui=erro`. Trocar modo/tema, duplicar, visualizar, gerar e recuperar erro participa do histórico. Voltar/avançar restaura campos, modo e confirmação de coordenadas sem gerar novas entradas; eventos e prévias descartam relógio/efeitos anteriores. Os listeners de popstate/hashchange não montam duas vezes a mesma entrada.

URLs diretas de edição/prévia levam payload v1 válido no fragmento. Rascunhos ainda incompletos ficam apenas em `history.state` da entrada, preservados ao voltar e recarregar essa entrada; copiar uma URL incompleta não transporta seus campos inválidos. Não há backend ou storage persistente. Valores válidos atualizam o payload do rascunho. Links compartilhados do evento continuam estritos, sem query e com apenas v/dados; o controlador de UI aceita somente a query ui conhecida e remove-a antes de chamar o codec. Consultas desconhecidas falham com recuperação.

O link Pular para o conteúdo foca o landmark main sem alterar o fragmento do evento quando scripts estão ativos; a âncora nativa permanece no HTML como fallback.
