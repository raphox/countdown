# Busca estática de temas

Contrato de CAP-1. A pesquisa funciona exclusivamente sobre o catálogo de quinze temas no navegador; não pesquisa conteúdo de eventos nem depende de backend, banco, IA ou serviço de busca.

## Índice e normalização

O registro de cada tema contém slug, nome de exibição, categoria e lista curada de aliases. Gerar índice no build e entregá-lo no mesmo site estático. Nome/aliases/categoria são campos pesquisáveis; slug identifica a rota e não substitui o nome visível.

Aplicar à consulta e aos campos: decomposição Unicode NFD, remoção das marcas combinantes, minúsculas pt-BR, pontuação/hífens como separadores e colapso de espaços com trim. Preservar nomes originais na apresentação. Assim `RÉVEILLON`, `réveillon` e `reveillon` têm o mesmo tratamento, como `reunião`/`reuniao` e `Aniversário`/`ANIVERSARIO`.

Não construir expressão regular diretamente com entrada do usuário. Comparar texto normalizado e tokens de palavras inteiras; pontuação e espaço não podem causar exceção ou injeção. Consulta normalizada vazia mostra todo o catálogo.

## Correspondência e ordem

1. Nome completo normalizado igual à consulta.
2. Um alias completo normalizado igual à consulta.
3. Todos os tokens da consulta presentes como palavras inteiras em um único nome, alias ou categoria do tema.

Usar a melhor classe por tema; empates seguem a ordem do catálogo, e cada tema aparece uma vez. Não combinar palavras espalhadas em aliases distintos para fabricar uma correspondência. Alias compartilhado pode retornar mais de um tema; não presumir uma resposta única.

A busca aceita palavras como `medicina` dentro do nome de um tema, mas não trechos arbitrários como `med`. Prefixos, stemming, correção de erros e similaridade semântica não são requisitos do MVP. Novos sinônimos entram por edição do catálogo e novo build.

## Aliases iniciais propostos

Nomes oficiais também são pesquisáveis; não é necessário duplicá-los em todas as variantes de caixa/acento.

| Slug | Aliases |
|---|---|
| `aniversario` | niver; festa de aniversário; festa de anos |
| `ano-novo` | réveillon; virada do ano; fim de ano |
| `natal` | ceia natalina; festa de natal; confraternização natalina |
| `familia` | encontro familiar; reunião de família; almoço em família |
| `empresa` | confraternização; confraternização da empresa; reunião de equipe; encontro corporativo; team building |
| `formatura-fundamental` | formatura fundamental; formatura do fundamental; formatura escolar; conclusão do ensino fundamental |
| `formatura-ensino-medio` | formatura colegial; formatura ensino médio; formatura segundo grau; conclusão do ensino médio |
| `formatura-faculdade` | colação de grau; formatura universitária; graduação; conclusão da faculdade |
| `casamento` | matrimônio; cerimônia de casamento; festa de casamento |
| `viagem` | férias; viagem de férias; partida; embarque |
| `cha-de-bebe` | chá de fraldas; baby shower; chegada do bebê |
| `evento-tecnologia` | tech; TI; informática; programação; conferência de tecnologia |
| `evento-medicina` | saúde; congresso médico; simpósio de medicina; jornada médica |
| `evento-direito` | jurídico; advocacia; congresso jurídico; seminário de direito |
| `festa` | festa genérica; balada; comemoração |

Categoria Eventos é comum aos quatro temas de tecnologia, medicina, direito e festa; consultar `eventos` mostra esse grupo. Aliases são proposta editorial A14, não uma inferência automática sobre todos os sentidos de uma palavra.

## Experiência e aceite

Campo com label, ação de limpar e quantidade de resultados. Atualizar sem mover foco, manter teclado/toque e mensagem acessível discreta. Sem resultados, manter consulta, mostrar “Nenhum tema encontrado” e oferecer limpar/ver todos. Sem JavaScript, a galeria completa mantém links navegáveis.

| Consulta | Resultado mínimo esperado |
|---|---|
| `Aniversário`, `ANIVERSARIO`, `aniversario` | Aniversário |
| `niver` | Aniversário por alias |
| `réveillon`, `REVEILLON` | Ano-Novo |
| `  ano-novo  `, `ano novo` | Ano-Novo |
| `reunião de família`, `REUNIAO DE FAMILIA` | Encontro da família |
| `colação de grau`, `colacao de grau` | Formatura da faculdade |
| `formatura` | As três formaturas |
| `medicina`, `congresso medico`, `SAÚDE` | Evento de medicina e saúde |
| `juridico` | Evento de direito e jurídico |
| `eventos` | Os quatro temas da família Eventos |
| vazio, só espaços ou limpar | Os quinze temas |
| `tema inexistente`, `med` | Nenhum resultado, com recuperação |

Verificar formas Unicode precomposta/decomposta, caixa mista, acentos pt-BR, hífens, espaços repetidos, alias compartilhado, ausência de resultados e ausência de duplicatas. Com índice carregado, digitar/limpar não dispara request; não registrar texto da busca em analytics. Recarregar o site estático continua funcionando sem serviço de pesquisa.
