# Experiência e interface

Contrato proposto para CAP-1 a CAP-9; premissas A1–A6/A8/A10–A14. Não contém mockups finais.

## Percurso

1. **Descobrir:** `/` apresenta a proposta, busca por tema e quinze cards com arte e nome da ocasião e a ação “Criar contador”. Agrupar os quatro novos temas sob Eventos, com nomes e miniaturas próprios e a mesma navegação do restante. Conteúdo útil explica como criar, compartilhar e interpretar o fuso.
2. **Criar:** `/<tema>/` sem fragmento abre o criador com a identidade do tema. Campos: título, data, hora, fuso IANA, término opcional do compromisso, mensagem e link opcional de reunião online; “Detalhes do encontro” acrescenta local, endereço e anfitrião/organização opcionais. Exibir fuso por extenso e resumo da data; sugerir o fuso detectado, permitindo mudança.
3. **Conferir:** prévia local usa os mesmos componentes do evento e indica claramente que é prévia. “Gerar link” só avança com dados válidos e futuros. Trocar tema preserva os campos em memória.
4. **Compartilhar:** `/<tema>/#v=1&dados=...` abre o evento. Ações “Compartilhar”, “Copiar link” e “Criar meu contador”; compartilhar nativo quando disponível, cópia ou campo selecionável como alternativas.
5. **Reutilizar:** na home e no criador, “Duplicar a partir de um link” permite colar uma URL existente e preencher todos os campos sem consulta remota; no evento, “Duplicar e personalizar” faz o mesmo. Salvar gera outro link; informar “Compartilhe o novo link; o anterior continua igual”. Qualquer visitante pode duplicar: não pedir login, prova de autoria ou permissão. O estado da edição é em memória, sem cadastro ou painel.

Importar um link vencido é permitido para reaproveitar os dados, mas gerar outro exige escolher data futura. Em erro de importação, manter os campos que a pessoa já preencheu; não navegar para a URL colada.

A escolha do tema no criador não deve descartar conteúdo ao navegar: interceptar essa ação e transferir os valores em memória ou transportar o payload validado entre as rotas; não depender de localStorage.

## Hierarquia da página do evento

Marca discreta → título do evento → data/hora e fuso do evento → contador → local/endereço/anfitrião, quando preenchidos, e mapa/Como chegar → mensagem → ações de compartilhar/calendário/entrar na reunião (se informada)/duplicar/criar → publicidade opcional → informação útil do tema/rodapé. O contador tem superfície legível sobre a arte. Publicidade nunca ocupa a arte, o relógio ou a OG.

Até 320 px, o contador pode usar grade 2 × 2; em telas maiores, linha única. Mostrar rótulos dias/horas/minutos/segundos, sem depender de cor. Títulos longos quebram linha sem cortar conteúdo. Não esconder informação essencial para caber na arte.

## Campos e feedback

- Título obrigatório, 1–80 pontos de código após trim/NFC; mensagem opcional, até 240. Mostrar contagem e preservar acentos/emoji.
- Data/hora futuras ao gerar; erros junto ao campo, com resumo focável após tentativa inválida. Não normalizar silenciosamente hora inexistente ou ambígua por mudança de fuso.
- Fuso inválido ou não suportado recebe instrução para escolher um válido; não alterar o instante de um link existente para “corrigi-lo”.
- A data de um evento recebido aparece no fuso do evento. O dispositivo do visitante não muda a ocasião; conversão secundária para fuso local fica fora do MVP.
- Local (até 80), endereço livre (até 200) e anfitrião/organização (até 60 pontos de código) são opcionais. Exibir apenas campos preenchidos; endereço admite quebras de linha seguras e ação “Copiar endereço” com fallback de seleção manual. Local é opcional em todos os temas. Se nome/endereço for preenchido, confirmar o ponto; a página exibirá mapa e rota. Busca geográfica só por ação explícita; sem busca de CEP.
- Mensagem recebe orientações como traje e o que levar, sem coletar telefone ou e-mail. Informar junto aos detalhes que o endereço também estará no link compartilhado.
- Ao gerar, conferir o limite real da URL; se excedido, orientar encurtar textos, sem truncar conteúdo silenciosamente.
- Compartilhamento cancelado não exibe “Enviado”. Cópia confirma só após sucesso; falha oferece selecionar e copiar manualmente.
- A URL contém os dados: explicar junto ao compartilhamento que quem recebe pode ler e redistribuir o conteúdo. Não apresentar link como privado.

## Estados

| Estado | Comportamento |
|---|---|
| Sem fragmento | Criador e explicação estática do tema; não inventar evento |
| Válido/futuro | Contagem ativa e ações disponíveis |
| Chegou a zero | Zerar todos os campos e mostrar mensagem do tema; não reiniciar para outro ano |
| Já vencido ao abrir | Mostrar data e mensagem final, sem contagem negativa ou confetes automáticos |
| Payload inválido/versão desconhecida | “Este link não pôde ser aberto”; ação para criar outro, sem exibir carga bruta nem anúncios |
| Aba suspensa/reaberta | Recalcular pelo instante atual; mostrar estado final se venceu durante suspensão |
| Falha de imagem | Manter paleta/superfície/textos funcionais; arte tem dimensões reservadas |
| Anúncio bloqueado/sem preenchimento | Uso e foco intactos; não insistir nem pedir desativação de bloqueador |
| Sem JavaScript | Galeria e conteúdo temático legíveis; aviso de que criar e executar contador exige JavaScript |

## Movimento e acessibilidade

- Confetes somente na transição observada para zero, por até 5 segundos; sem repetição automática. Empresa e os três eventos profissionais usam mensagem sóbria sem confetes por padrão.
- Respeitar `prefers-reduced-motion`; controle “Desativar animações” atua na sessão. Sem flashes ou áudio automático.
- Navegação completa por teclado, ordem de foco lógica e foco visível. Labels associados, erros conectados e mensagens de sucesso em região discreta.
- Fornecer representação textual acessível da contagem; não anunciar alterações a cada segundo ao leitor de tela. Anunciar a chegada do evento uma vez.
- Meta proposta: contraste 4.5:1 para texto normal e 3:1 para texto grande, controles de 44 px, zoom de 200% e sem rolagem horizontal em 320 px.
- Conferir layout em 320, 390, 768 e 1440 px, incluindo os limites de texto. O efeito flip é opcional quando atrapalhar leitura ou movimento reduzido.

## Compartilhar e adicionar ao calendário

Manter “Compartilhar” e “Adicionar ao calendário” como ações principais de quem recebe o evento; “Duplicar e personalizar” e “Criar meu contador” ficam como ações secundárias. O menu de calendário oferece Google Calendar, Microsoft Outlook/Microsoft 365 e Apple/outros (.ics), com instruções curtas e fallback em arquivo.

Antes de sair ou baixar, exibir resumo de título, início, fuso, local/endereço e fim, quando informado. O campo opcional “Horário de término” define o fim do compromisso; o contador sempre aponta para seu início. Sem término, informar “Duração não definida”; pedir um fim apenas quando necessário para o atalho escolhido. Essa escolha na exportação não altera o link recebido.

Quem recebe confirma a inclusão no próprio calendário e configura lembretes nele. A interface diz “Abrir no calendário” ou “Baixar arquivo”, nunca confirma salvamento só por abrir uma aba. Cancelar mantém o contador; repetir importação pode gerar duplicata; alterações em outra cópia do link não atualizam a agenda.

Arquivos/atalhos preservam o link completo com fragmento e os detalhes opcionais. Não pré-carregar o calendário nem transmitir os dados antes de a pessoa escolher essa ação. Para requisitos técnicos e diferenças entre clientes, ler `calendarios.md`.

## Local opcional em todos os temas

O mesmo grupo Local atende os quinze temas: nome do espaço, endereço e marcador confirmado. Quem não preencher não vê mapa ou rota na página final. Quem preencher confirma o ponto, por busca explícita quando configurada ou marcação manual; resultados ambíguos exigem escolha. Alterar endereço/nome pede reconfirmação do marcador; limpar o grupo limpa as coordenadas.

Com local confirmado, mostrar mapa OpenStreetMap junto do endereço, atribuição legível e botão “Como chegar”. O mapa tem altura reservada e não captura rolagem ou foco indevidamente. Texto e “Copiar endereço” continuam úteis se o mapa falhar. Sem local, não carregar o mapa.

“Como chegar” oferece “Usar minha localização” e “Informar origem”. Pedir geolocalização apenas na primeira ação; se recusada, indisponível ou demorada, manter a alternativa manual. Abrir planejador OSM com destino e origem escolhidos; não rastrear continuamente nem guardar origem no evento. Informar que as direções abrem outro serviço.

Links antigos só com texto de local continuam funcionando: mostrar a seção com “Localizar no mapa” e permitir confirmar resultado/ponto, sem inventar localização. O comportamento de dados, serviços e falhas está em `mapas-e-rotas.md`.

## Busca de temas

Campo “Buscar tema” acima da galeria com exemplo “Aniversário, formatura, tecnologia…”. Nome, palavra ou sinônimo encontra resultados ignorando diferenças de caixa e acentos, sem alterar a grafia dos cards. Regras e aliases estão em `busca-de-temas.md`.

Filtrar no navegador mantendo foco no campo e ordem determinística. Limpar volta aos quinze temas; nenhum resultado mostra mensagem e “Limpar busca”. Exibir quantidade de resultados com anúncio acessível discreto; sem redirecionar automaticamente ou bloquear teclado. Sem JavaScript, manter galeria completa utilizável.

## Reunião online e convite pronto

Campo “Link da reunião online” opcional em todos os temas, independente do Local físico. Assim o mesmo criador permite eventos presenciais, online ou híbridos sem exigir um seletor adicional de modalidade. Validar HTTPS, mostrar domínio e preservar URL completa; não carregar preview, iframe ou serviços da reunião.

Quando preenchido, exibir “Entrar na reunião”; abrir apenas por clique e com proteção contra acesso à janela de origem. Avisar perto do campo que o link será compartilhado com quem receber o evento. Limpar o campo remove a ação; duplicar preserva o valor para edição.

“Copiar convite pronto” abre prévia de texto com título, data/horário/fuso, término se informado, local/endereço, link da reunião, mensagem e link completo do contador. Omitir vazios e manter acentos/quebras de linha. Confirmar cópia só depois de sucesso; oferecer seleção manual em falha. Não enviar mensagens automaticamente a contatos.
