# Temas e direção de arte

Contrato de CAP-1/CAP-5; propostas A6/A7. Esta entrega é o briefing de produção, não as imagens finais.

## Catálogo do MVP — quinze temas

| Slug | Tema | Composição exclusiva | Paleta proposta | Encerramento |
|---|---|---|---|---|
| `aniversario` | Aniversário | Balões assimétricos e recortes de papel nas bordas, centro limpo | Coral, creme e lilás | “Parabéns! Chegou o grande dia!”; confetes |
| `ano-novo` | Ano-Novo | Céu noturno com fogos nas extremidades e brilho dourado discreto | Azul-noturno e dourado | “Feliz Ano-Novo!”; confetes |
| `natal` | Natal | Ramos, luzes quentes e detalhes de papel ilustrado formando moldura | Vinho, verde-escuro e creme | “Feliz Natal!”; confetes discretos |
| `familia` | Encontro da família | Mesa de encontro ilustrada na base, folhagens laterais e textura acolhedora | Terracota, sálvia e areia | “Chegou a hora de reunir a família!”; confetes |
| `empresa` | Encontro da empresa | Geometria sobreposta e ritmo visual sóbrio, sem iconografia de festa infantil | Azul, petróleo e branco | “Nosso encontro começa agora.”; sem confetes por padrão |
| `formatura-fundamental` | Formatura do ensino fundamental | Livros abertos, aviões de papel e estrelas em composição lúdica de passagem de etapa | Azul-celeste, coral e amarelo | “Uma etapa concluída. Vamos celebrar!”; confetes |
| `formatura-ensino-medio` | Formatura do ensino médio | Diploma e fitas ascendentes com estrelas gráficas e composição enérgica | Roxo e amarelo | “Chegou a hora de celebrar esta conquista!”; confetes |
| `formatura-faculdade` | Formatura da faculdade | Capelo, diploma e ramos de louro em composição solene, com brilho metálico discreto | Preto, creme e bronze | “Chegou o grande dia da formatura!”; confetes |
| `casamento` | Casamento | Moldura floral e fitas entrelaçadas com espaço central amplo e atmosfera delicada | Off-white, sálvia e champanhe | “Chegou o grande dia!”; confetes discretos |
| `viagem` | Viagem e férias | Mala ilustrada, bilhete e mapa abstrato com percurso curvo nas bordas | Azul-oceano, areia e tangerina | “Boa viagem!”; confetes |
| `cha-de-bebe` | Chá de bebê | Nuvens, estrelas e formas macias em composição acolhedora, sem associação obrigatória a gênero | Creme, verde-pastel e lilás | “Chegou a hora de celebrar essa chegada!”; confetes discretos |
| `evento-tecnologia` | Evento de tecnologia | Malha e circuitos abstratos com pontos luminosos, profundidade e gradientes nas bordas | Azul-noturno, ciano e violeta | “Nosso evento começa agora.”; sem confetes por padrão |
| `evento-medicina` | Evento de medicina e saúde | Conexões e ondas orgânicas com camadas suaves, composição clara e ambiente profissional | Verde-petróleo, menta e branco | “Nosso evento começa agora.”; sem confetes por padrão |
| `evento-direito` | Evento de direito e jurídico | Colunas estilizadas e equilíbrio geométrico em composição editorial sóbria | Grafite, marfim e bronze | “Nosso evento começa agora.”; sem confetes por padrão |
| `festa` | Festa genérica | Luzes, fitas e formas rítmicas sem elementos obrigatórios de aniversário ou feriado | Violeta, coral e amarelo | “A festa vai começar!”; confetes |



Os cinco temas originais são a primeira prioridade de produção; os dez adicionais também fazem parte do lançamento, conforme a ampliação solicitada pelo usuário. As três formaturas têm artes próprias, não variantes de texto de uma única imagem.

A galeria agrupa tecnologia, medicina, direito e festa genérica sob **Eventos**, mantendo uma rota e uma arte por opção. A categoria não exige uma rota própria adicional no MVP.

Todos usam os mesmos campos do criador, incluindo local, endereço e anfitrião/organização opcionais. Instituição/curso, destino, nomes do casal ou identificação da celebração podem aparecer no título/mensagem; não adicionar formulários de viagem, convites, presentes ou dados pessoais extras. Congressos, conferências e seminários usam título, auditório em Local, entidade realizadora em Anfitrião/organização e orientações na mensagem; programação, inscrição e certificados não entram no escopo.

Os temas compartilham uma família de ilustração editorial e componentes, mas precisam ser distinguíveis pela composição mesmo em miniatura. Trocar apenas cor não satisfaz “arte exclusiva”. Não usar fotografias de pessoas, marcas de terceiros ou imagens genéricas como entrega final.

## Conjunto de assets por tema

| Entrega | Contrato proposto |
|---|---|
| Original | Fonte editável quando vetorial ou original em alta resolução quando raster; registrar autoria/origem e permissão de uso comercial |
| Página desktop | 1920 × 1080 ou SVG responsivo equivalente, com área central segura para o conteúdo |
| Página móvel | 1080 × 1920 ou composição vetorial equivalente; recompor elementos, sem depender de corte cego do desktop |
| Galeria | 640 × 360; identidade reconhecível e nome do tema em HTML |
| OG | 1200 × 630, JPEG/PNG, até 500 KB; título genérico do tema e marca quando definida, sem nome/data pessoais |

Raster de página pode usar AVIF/WebP com fallback necessário; assets locais versionados. A página carrega só a arte do tema atual. Na galeria, usar miniaturas leves e carregamento progressivo. Orçamento inicial de arte no primeiro acesso móvel: até 600 KB por tema.

Textos personalizados, dígitos e botões são HTML; não gravá-los na imagem. Usar superfície opaca/translúcida suficiente para contraste, centro livre e margens seguras; detalhes decorativos recebem alt vazio e a miniatura tem nome acessível sem duplicação.

## Tipografia e aceite visual

Escolher famílias licenciadas que suportem pt-BR. Fonte decorativa pode aparecer em títulos festivos; controles, mensagens e relógio usam fonte legível. Preferir arquivos locais com subset adequado para não depender de fonte externa na abertura.

Aprovar cada composição em desktop/móvel e OG; testar título de 80 caracteres, mensagem de 240, emoji, datas longas e contagem de muitos dias. Conferir também arte ausente, movimento reduzido e estado encerrado. Não aceitar marcas d'água, texto deformado na OG, cortes sobre a área de leitura ou substituição das quinze artes por recolorações.

O registro do tema associa slug, nome, paleta, fonte, caminhos de arte, texto OG e encerramento. Novos temas devem exigir catálogo/assets, não cópia da lógica de data ou compartilhamento.
