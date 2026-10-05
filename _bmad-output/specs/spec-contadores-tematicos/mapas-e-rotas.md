# Local, mapa e direções

Contrato de CAP-8. OpenStreetMap é a interpretação proposta para “openmap” (A12). O grupo Local é opcional em todos os quinze temas; preencher nome/endereço habilita a experiência de mapa e rota, sem exigir local para criar um evento.

## Captura e URL

1. Informar nome do local e/ou endereço. Localizar por busca explícita em provedor configurado ou marcar ponto manualmente no mapa; não usar autocomplete por tecla como requisito.
2. Confirmar um marcador. Se houver múltiplos resultados, mostrar escolhas e pedir confirmação; não adotar o primeiro silenciosamente. Alterar nome/endereço invalida a confirmação anterior até reconfirmar ou reposicionar.
3. Gerar link com `location: {lat, lon}`. Validar números finitos, latitude de −90 a 90 e longitude de −180 a 180, normalizados a até seis casas. Zero é válido; não confundir latitude/longitude. O par só existe junto de nome ou endereço.
4. Limpar o grupo Local remove marcador e texto. Com grupo vazio, não mostrar nem carregar o mapa no evento; com texto preenchido, novos links exigem ponto confirmado.

Coordenadas do destino são parte pública do evento e contam nos limites de bytes/URL. Mapa e pin não são enviados como imagens no payload. O decoder aceita links antigos com `venue`/`address` e sem `location`: manter a página e oferecer “Localizar no mapa” para resolver/confirmar ponto, sem inventar marcador. A confirmação na visualização é transitória; para salvar uma versão com ponto, duplicar e compartilhar outro link.

## Exibição

Renderizar mapa incorporado com dados OpenStreetMap e marcador do destino, junto do nome/endereço e botão “Como chegar”. Carregar quando a seção se aproximar da área visível, com dimensões reservadas, atribuição visível, acesso por teclado e alternativa textual; falha de tiles não impede contador, compartilhamento ou cópia do endereço.

Tiles, geocodificação e roteamento são serviços diferentes. Não geocodificar automaticamente cada visita; o destino dos links novos já está codificado. O mapa não precisa incluir anúncios ou duplicar o conteúdo da arte do tema. Provedor deve permitir o uso comercial pretendido, com configuração substituível e sem segredo no JavaScript.

## Direções e origem

Ao clicar “Como chegar”, permitir “Usar minha localização” ou “Informar origem”. Na primeira opção, consultar `getCurrentPosition` uma vez em contexto seguro, com permissão do navegador; negar, expirar ou não suportar mantém origem manual. Não usar rastreamento contínuo. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition)

Encaminhar origem e destino ao planejador externo OpenStreetMap; confirmar o formato da URL e o transporte disponível durante a implementação. A origem manual pode ser informada no planejador, que já recebe o destino. Não construir motor de rotas nem prometer trânsito em tempo real/navegação própria. Roteamento sobre OSM é prestado por motores/serviços específicos. [OSM: navegação](https://wiki.openstreetmap.org/wiki/Navigation)

A origem permanece transitória. Não inserir no link do evento, ICS, OG, favoritos, analytics ou logs próprios. Transmiti-la ao planejador somente como parte da ação escolhida. Se o planejador falhar, manter endereço e copiar endereço; não mover o destino ou repetir permissões automaticamente.

## Provedores e limites

O serviço público de tiles exige atribuição e observância do cache HTTP; não usar prefetch maciço ou downloads offline. Confirmar o provedor apropriado antes de produção e manter sua URL/configuração substituível. [Política oficial de tiles](https://operations.osmfoundation.org/policies/tiles/)

O Nominatim público limita uso a no máximo uma requisição por segundo e proíbe autocomplete no cliente. Não adotá-lo como busca padrão de produção: limitar requisições isoladamente em cada navegador não assegura o limite agregado do aplicativo. Escolher serviço compatível e documentar tratamento dos endereços; marcação manual evita depender de geocodificação. [Política oficial Nominatim](https://operations.osmfoundation.org/policies/nominatim/)

Q5 resolve provedor/uso esperado/restrições/atribuição para tiles e busca; não pede banco de eventos. Se a busca externa não estiver configurada, manter marcação manual. Se os tiles falharem, informar a falha sem fingir que o mapa carregou, mantendo alternativas textuais.

## Aceite

- Nos quinze temas, grupo Local vazio omite seção/requisições de mapa; nome/endereço preenchido exige confirmação na criação e produz mapa/direções ao abrir em outro navegador.
- Duplicar preserva texto/ponto; alterar local pede reconfirmação; remover local remove ambos. Testar nomes ambíguos, endereço inexistente e falha da busca, com seleção manual disponível.
- Cobrir zero, negativos, limites e números inválidos; links antigos sem ponto continuam válidos com estado de resolução explícito.
- Geolocalização somente por clique, origem obtida/negada/timeout/indisponível, alternativa manual e destino correto no planejador; sem escrita de origem no payload/ICS/métricas.
- Mapa móvel e teclado, atribuição, altura reservada, falha de tiles e bloqueio de terceiros sem regressão do contador. Confirmar URL/fluxo do planejador em navegador real; não alegar validação externa não executada.
