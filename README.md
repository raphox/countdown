# Contagem — contadores temáticos

Site Astro estático em pt-BR e en-US com dezenove temas, busca local por palavras ou trechos em qualquer posição (sem acentos, com prioridade para nome/alias exatos) e eventos completos no fragmento da URL. Criador, prévia, duplicação livre pelo botão do evento aberto, contagem, reunião opcional, convite e exportação ICS funcionam sem cadastro, backend ou storage necessário. JavaScript é necessário para eventos; catálogo e informações permanecem no HTML.

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

Os testes verificam HTML/rotas/status HTTP/OG, busca compilada, contratos do evento, fluxos DOM nos dois idiomas, parser ICS independente `ical.js`, falhas opcionais e adapters publicitários. O servidor temporário dos testes exige permissão para ouvir em localhost. `linkedom` é usado nos testes e na tradução do HTML durante o build; não substitui validação em dispositivos reais.

## Origem e publicação

Copie `.env.example` se necessário. `SITE_URL`, `PUBLIC_SITE_ORIGIN` e `BASE_PATH` são configurações de build. A origem de produção aceita na leitura de links deve acompanhar o domínio publicado; a origem atual também é aceita. Links v1 têm formato `/<tema>/#v=1&dados=<JSON UTF-8 Base64URL>`; máximo 4096 caracteres, JSON máximo 3072 bytes. Base64URL não cifra os dados. Não use informação confidencial; os links não podem ser revogados.

Publique somente `dist/` em hospedagem estática, após resolver domínio e configuração operacional. Sirva `404.html` com status **404**; não use fallback universal. Em subdiretório, monte `dist/` no prefixo configurado. A publicação no Firebase está descrita abaixo.

## Tempo, detalhes e mapas

O formulário começa no modo Simples: título, data e tema. A data corresponde a 00:00 no fuso do navegador, indicado na tela. Completo revela horário, fuso, mensagem e opcionais; alternar preserva os valores. Duplicar abre Completo com todos os dados originais. Não há formulário para importar links: abra o link e use Duplicar. Natal sugere o próximo 25 de dezembro; Ano-Novo, o próximo 1º de janeiro, à meia-noite. A data é editável e nunca substitui uma data duplicada.

O fuso IANA é explícito; criação rejeita horários ambíguos/inexistentes e datas passadas. A leitura aceita eventos vencidos e o contador termina em zero. O relógio é o do dispositivo, sem consulta de hora remota. O fim opcional do compromisso não muda o alvo da contagem.

Local/endereço exige confirmação de coordenadas em novos links. Alterar texto/ponto exige reconfirmação; links antigos sem ponto oferecem resolução transitória. A seleção manual funciona por coordenadas ou mapa (zoom e setas de teclado). Limpar Local remove o ponto. Mapa carrega ao aproximar a seção; falhas mantêm endereço e direções.

O mapa funciona por padrão com tiles públicos OpenStreetMap e busca Photon, gratuitamente e sem cadastro, chave ou backend próprio. A busca ocorre apenas no botão: até 5 resultados, cache em memória por 15 minutos (100 consultas), requisições repetidas compartilhadas e intervalo de 1,5 segundo por página para o Photon público. HTTP429 aplica espera de30 segundos; falhas/timeout preservam seleção manual. Isso não é uma cota global garantida: o servidor público exige uso moderado e não garante disponibilidade ([termos Photon](https://github.com/komoot/photon#demo-server)). `PUBLIC_GEOCODER_URL` permite substituir o endpoint (GeoJSON Photon ou array `[{display_name,lat,lon}]`); vazio também usa Photon. Os tiles enviam somente a origem via `referrerpolicy="strict-origin"`, mantendo atribuição e cache HTTP, sem prefetch offline ([política OSM](https://operations.osmfoundation.org/policies/tiles/)). Caminho, query e fragmento do evento não seguem no cabeçalho de referência.

Direções usam planejador OSM com `engine=fossgis_osrm_car` e pares `origem;destino`. A origem atual só é consultada uma vez por ação, em memória; recusa/timeout permite origem manual no planejador. A origem nunca entra no payload/ICS/métricas. Validar o fluxo do planejador em navegador real antes de alegar compatibilidade externa.

## Compartilhar e agenda

Clipboard e Web Share têm falhas/cancelamento honestos e seleção manual. Copiar link oferece confirmação visível junto à ação após sucesso real e fallback manual próximo em falha. O calendário tem card próprio com download e instruções compactas. Reunião HTTPS é validada e só abre explicitamente. OG é genérica por tema, no HTML; nenhum dado do evento personaliza a OG.

Arquivo ICS é gerado localmente com UTC, escapes, CRLF, folding UTF-8, UID SHA-256 canônico e sem alarmes/convites. Sem fim, não inventa duração. A pessoa confirma importação e lembretes no destino. Atalhos Google/Microsoft estão indisponíveis até serem verificados; os três destinos têm instruções e fallback ICS. Testes com parser não comprovam importação real em Google, Outlook/Microsoft365, Apple ou celulares.

## Publicidade, métricas e privacidade

Sem scripts comerciais e sem destino de métricas. `ads.ts` permite no máximo um slot por página elegível, depois das ações, com reserva fixa quando ativo. Criador/prévia/erro não recebem anúncios. `PUBLIC_AD_TEST_MODE=filled|no-fill|error` funciona somente em `astro dev`; é demonstração local, nunca impressão real. Builds sempre mantêm off.

`metrics.ts` usa allowlist de nomes/propriedades e slugs conhecidos. O adapter é desligado no produto; testes demonstram propriedades mínimas e falha isolada. Não recebe payload, URL, data, fuso, texto, consulta ou coordenadas. Q1/Q3/Q4 precisam ser resolvidas antes de qualquer ativação. `/privacidade/` explica funcionamento atual, sem inventar operador ou política jurídica final.

## Artes e pendências

O registry concentra todos os caminhos de arte. Os dezenove temas usam composições **PNG** originais produzidas com OpenAI image_gen, sem texto embutido, pessoas ou símbolos exclusivos de gênero. Cada tema tem original desktop e uma composição móvel dedicada, além de exports 1920×1080, 1080×1920, miniatura 640×360 e OG 1200×630. O navegador móvel carrega PNG responsivo 540×960 (216–380 KB); o export completo não é carregado automaticamente. OGs ficam abaixo de 500 KB. Fontes, título, data, mensagem e contador são HTML. `npm run generate:art` reproduz os derivados via Sharp sem inserir texto. Originais/prompts/SHA-256/proveniência ficam em `public/art/`; uso das artes segue os termos aplicáveis do gerador, sem atribuição de licença artística inventada. Os SVGs intermediários e OGs antigas foram removidos/substituídos. A matriz visual final de browser/dispositivos permanece separada do teste automatizado.

A aplicação atual usa `src/`; SPEC/companions originais permanecem como referência. Evidências e limites de aceite estão em `MVP-ACCEPTANCE.md`.

## Fontes locais

As dez famílias Google Fonts têm TTF original, licença OFL e manifesto de commit/SHA-256 em `public/fonts/`. O site serve subsets WOFF2 pt-BR: Inter no corpo/controles/relógio e a família do tema apenas nos títulos. Nenhuma requisição para Google Fonts ocorre no navegador. Downloads de fontes por página ficam abaixo de 260 KB, incluindo Inter e o título. Trocar tema atualiza sua fonte sem perder campos. Subsets modificados têm nomes internos próprios para respeitar Reserved Font Names; atribuição e OFL originais estão preservadas. Reprodução em `public/fonts/README.md`.

## Relógio e efeitos locais

O contador usa a biblioteca oficial `flipclock@1.0.1`, com quatro instâncias controladas pelo cálculo absoluto do evento, zero terminal e anúncio textual por minuto. `canvas-confetti@1.9.4` fornece sua distribuição oficial `confetti.browser.js`, copiada sem alterações para `public/vendor/` no prebuild, com licenças e hashes. Confetes cobrem a tela inteira, sem bloquear cliques. Sobre o PNG ficam somente título e contador; todos os demais detalhes aparecem abaixo. No celular, o relógio usa uma grade 2×2. O efeito aparece ao entrar no evento e a cada dez segundos em todos os temas; não roda no criador ou prévia. Pausa em aba oculta, respeita movimento reduzido, e é descartado na navegação. Nada depende de CDN. Versões instaladas confirmadas como latest no npm em 2026-10-05; isso não garante versões futuras.

## Navegação e rascunhos

Cada estado do criador tem URL própria: `?ui=simples`, `?ui=completo`, `?ui=editar`, `?ui=previa` ou `?ui=erro`. Trocar modo/tema, duplicar, visualizar, gerar e recuperar erro participa do histórico. Voltar/avançar restaura campos, modo e confirmação de coordenadas sem gerar novas entradas; eventos e prévias descartam relógio/efeitos anteriores. Os listeners de popstate/hashchange não montam duas vezes a mesma entrada.

URLs diretas de edição/prévia levam payload v1 válido no fragmento. Rascunhos ainda incompletos ficam apenas em `history.state` da entrada, preservados ao voltar e recarregar essa entrada; copiar uma URL incompleta não transporta seus campos inválidos. Não há backend ou armazenamento permanente de eventos. Valores válidos atualizam o payload do rascunho. Links compartilhados do evento continuam estritos, sem query e com apenas v/dados; o controlador de UI aceita somente a query ui conhecida e remove-a antes de chamar o codec. Consultas desconhecidas falham com recuperação.

O link Pular para o conteúdo foca o landmark main sem alterar o fragmento do evento quando scripts estão ativos; a âncora nativa permanece no HTML como fallback.

Modo Simples: prévia e geração válidas descartam horário personalizado, fuso personalizado, mensagem, anfitrião, local, ponto, reunião e término opcional. Só título, data à meia-noite no fuso do navegador e tema seguem no evento; erro de validação mantém o draft.

## Firebase Hosting

Projeto: `contagemregressiva-48055`. Site: https://contagemregressiva-48055.web.app.

Para agentes e próximos deploys, use Node >=22.12 e as dependências do lockfile:

```sh
npm ci
npm run deploy:firebase
```

O script `scripts/deploy-firebase.mjs` executa check, build de produção e testes antes de publicar somente Hosting. Qualquer falha interrompe a publicação. Usa o Firebase CLI local com o Node atual, sem depender de uma instalação global. O destino é explícito e conferido contra `.firebaserc` e `firebase.json`. Os testes precisam abrir um servidor temporário em localhost; o deploy precisa de acesso à rede.

Para validar sem publicar: `npm run deploy:firebase -- --check-only`. Para gerar apenas o build: `npm run build:firebase`.

É necessário estar autenticado com acesso ao projeto: na primeira configuração, execute `npx --no-install firebase login`; em automação, configure credenciais Application Default Credentials com permissões para Hosting. Não grave credenciais no repositório. A publicação é não interativa e não inicia login automaticamente.

O build usa origem canônica `https://contagemregressiva-48055.web.app` e base `/`. O Hosting serve `dist`, preserva rotas estáticas e status 404, sem rewrite global para a home. Originais de artes/fontes e arquivos de geração ficam no repositório, fora do upload. SDKs de banco e Analytics não são necessários para esta hospedagem.

## Idiomas e novos temas

URLs compartilhadas incluem `/pt-br/` ou `/en-us/`; os links antigos sem prefixo continuam funcionando em português. Trocar idioma mantém o fragmento do evento e o modo do formulário. Rascunhos incompletos são transferidos apenas durante essa ação via sessionStorage da própria aba e removidos na chegada. Sem acesso ao storage, os dados válidos continuam no fragmento.

O HTML estático inclui `lang`, canonical, hreflang, título, descrição e Open Graph no idioma da rota, permitindo prévias de WhatsApp/LinkedIn sem executar JavaScript. A prévia é genérica por tema: dados privados do fragmento nunca são enviados ao crawler. As artes são as mesmas nos dois idiomas porque não têm textos embutidos. O cache da plataforma pode retardar a atualização de prévias antigas.

`src/i18n/en.ts` contém as traduções; `src/i18n/markup.ts` traduz somente o HTML autoral durante o build. Dados escritos pelos visitantes nunca passam pela tradução. `src/i18n/themes.ts` mantém sinônimos em inglês, junto dos aliases em português na busca inglesa. Ao adicionar texto de interface, inclua sua tradução e valide o HTML dos dois idiomas.

Novos temas: Evento político, Zoeira, Encontro de amigos e Jantar. Carnaval é um alias de Festa genérica; carnival e mardi gras são aliases em inglês. Originais PNG e prompts ficam em `public/art/originals/` e `public/art/*-generation.json`. Geração pelo image_gen integrado, com versões próprias para desktop/mobile; Sharp produz somente os derivados.

Para exportar somente temas alterados: `npm run generate:art -- evento-politico zoeira encontro-amigos jantar`. Sem argumentos, todos os temas são exportados. As OGs mantêm 1200×630 em PNG; quando necessário, a quantização da paleta é ajustada para respeitar o limite de 500 KB, sem alterar a composição.
