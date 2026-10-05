# Critérios de aceite e rastreabilidade

Estes são critérios para a futura implementação. A criação dos documentos não significa que o produto já passou neles.

| Capacidade | Demonstração mínima |
|---|---|
| CAP-1 | Quinze temas e busca local exata/caixa/acentos/sinônimos conforme busca-de-temas.md; 404 e galeria sem JavaScript |
| CAP-2 | Criar/pré-visualizar com título, mensagem, data/hora/fuso e detalhes opcionais; colar link anterior e editar local/endereço, como visitante sem cadastro/permissão, sem consulta remota ou alteração do link original |
| CAP-3 | Mesma contagem em fusos distintos com relógios sincronizados; zero, evento passado, mudança de visibilidade e movimento reduzido |
| CAP-4 | Abrir link em sessão limpa/outro dispositivo sem storage; compartilhar/copiar convite com prévia/fallback, cancelamento e payload inválido |
| CAP-5 | Quinze artes originais, exports finais e OG correta em HTML bruto; inspeção nos quatro tamanhos e zoom de 200% |
| CAP-6 | Flag off sem script, carregamento/sem preenchimento/falha em teste e bloqueador sem interferência; ativação real documentada separadamente |
| CAP-7 | Exportar/importar em Google, Microsoft e Apple conforme calendarios.md; conferir instante/detalhes/link, ausência de sync e fallback ICS |
| CAP-8 | Local opcional nos quinze temas; mapa/rota com ponto confirmado, origem autorizada/manual e falhas isoladas conforme mapas-e-rotas.md |
| CAP-9 | Reunião HTTPS opcional presente/ausente, validada e preservada na duplicação/agenda; abrir só por clique sem integração de contas |

## Testes de contrato

- Busca: normalização Unicode/caixa/acentos, palavras inteiras, aliases, ranking, empates, limpar/zero resultados e zero requests por consulta; casos em busca-de-temas.md.
- Codec: round-trip de acentos/emoji e opcionais preenchidas/vazias; v1 sem novos campos continua válido; texto mínimo/máximo, bytes inválidos, fragmento ausente, truncado, excessivo, parâmetros duplicados, versão desconhecida, chaves/tipos extras e tema inválido.
- Duplicação livre: uma segunda pessoa em sessão limpa importa o link de outra, modifica nome/endereço e gera novo link sem provar autoria; o original mantém os mesmos dados.
- Importação: URL própria absoluta e caminho relativo, URL de produção configurada, domínio/esquema/credenciais inválidos, evento vencido e dados excessivos; preservar formulário após erro e confirmar zero fetch para resolver o link.
- Detalhes: endereço multilinha permanece texto, cópia com fallback, opcionais vazios não geram seções vazias, e limite da URL considera todos os campos sem truncamento.
- Segurança de texto: payload com marcação/script permanece texto ou é rejeitado; não carrega URLs fornecidas pelo evento automaticamente nem injeta HTML; reunião HTTPS só abre por ação explícita.
- Mapa/rota: validar ponto, confirmar/reconfirmar, omitir seção quando sem local, compatibilidade de links sem coordenadas e geolocalização somente por ação; matriz em mapas-e-rotas.md.
- Calendário: parser ICS independente, escaping/folding UTF-8, link completo, UID, início correto e término opcional; payload antigo sem término permanece válido. Matriz de clientes em calendarios.md.
- Tempo: criação futura e rejeição de passado; decoder aceita passado; virada de dia/ano, leap day válido/inválido, diferenças de fuso, lacuna/duplicidade de horário e instante que vence durante suspensão.
- Tempo determinístico: relógio injetável nos testes, comparação do instante UTC e recálculo após atraso; não depender de esperar horas reais. O relógio do dispositivo continua sendo limite do produto.
- Reunião: HTTPS válida e domínio visível; rejeitar esquemas perigosos/credenciais, preservar query, omitir campo vazio, aplicar limites individuais/agregados e não fazer fetch de preview.
- Convite pronto: campos opcionais omitidos, data/fuso/endereço/reunião/link íntegros, Unicode e fallback manual de clipboard, sem envio automático.
- Sharing: URL gerada preserva todos os dados, tema e versão; clipboard indisponível e compartilhamento cancelado não reportam sucesso falso.

## Inspeção de interface e artes

Percorrer criação → prévia → link → abertura limpa → zero para cada tema. Conferir 320/390/768/1440 px, zoom 200%, textos máximos, navegação por teclado, foco/labels, leitura textual do relógio e `prefers-reduced-motion`. Testar dia com muitos dígitos e imagem ausente. Confirmar artes distintas e proveniência comercial registrada.

Testar ao menos Safari/iOS e Chrome/Android para compartilhamento e layout, além de navegador desktop. Se dispositivo real não estiver disponível, registrar a limitação, usar emulação e deixar a verificação real pendente; não alegar cobertura não executada.

## Build, publicação e anúncios

- Build estático gera home, quinze páginas, assets e 404 sem servidor de aplicação; abrir cada rota diretamente em servidor de arquivos.
- HTML bruto de cada tema contém metadados absolutos e OG própria com dimensões/alt; imagens acessíveis sem autenticação. Não depender do fragmento ou de execução de JS para OG.
- Quando Q2 for resolvida, validar links no domínio/base path reais e prévia em um canal social alvo, inicialmente WhatsApp como proposta. Registrar diferenças de cache e preservação do fragmento.
- Testar anúncios desligados, carregados em ambiente de teste, sem preenchimento, bloqueados e com erro. Conferir ausência de sobreposição e deslocamento de controles.
- Inspecionar requests de medição própria: nenhum payload, título, mensagem, local/endereço/anfitrião, link importado ou URL integral. Ativação real exige Q1/Q3/Q4 conforme a integração afetada.

## Separação dos aceites

**Funcional/visual:** CAP-1 a CAP-5, CAP-7/CAP-8/CAP-9 e integração técnica de CAP-6, com todos os testes aplicáveis e limitações explícitas. **Publicação:** Q2 fechada, Q5 definida para os serviços de mapa habilitados e OG verificada no domínio real. **Comercial:** Q1/Q3 fechadas e veiculação real validada. **Resultado de negócio:** Q4 fechada e dados reais; não condicionar a correção técnica a uma receita inventada.

## Preservação da intenção original

| Fonte da conversa | Destino no contrato |
|---|---|
| Evoluir projeto básico e contadores existentes | Why; arquitetura, estado atual |
| Múltiplos temas e artes exclusivas | CAP-1/CAP-5; temas-e-artes.md |
| Aniversário, fim de ano, família, empresa e Natal da proposta | Cinco temas originais no catálogo |
| Ampliação confirmada: três formaturas, casamento, viagem/férias e chá de bebê | Seis temas adicionais no MVP; catálogo e histórias de artes |
| Eventos de tecnologia, medicina, direito e festa genérica | Família Eventos com quatro artes/rotas próprias; quinze temas totais |
| Link compartilhável e hash MD5 ou outro | CAP-4; codec reversível e distinção de digest |
| Site estático e Astro/templates compartilhados | Constraints; registry/componentes em arquitetura.md |
| jQuery, canvas-confetti e FlipClock como possível base | Avaliação e isolamento no estado atual |
| OG fixa inicialmente | CAP-5; metadados por tema no HTML |
| Firebase para arte por link futuramente | Evolução Firebase com imagem e HTML de metadados |
| Publicidade para obter receita | CAP-6; publicidade-e-metricas.md e aceite comercial |
| Endereço e dados convenientes na criação | CAP-2; detalhes opcionais em UX/codec; serviço de busca de local configurável e ponto confirmado |
| Sem banco e edição por link existente | Importação local; URL nova/imutabilidade; evolução Firebase também sem banco |
| Qualquer pessoa pode replicar um link | CAP-2/CAP-4; duplicação livre sem propriedade, nova URL e original preservado |
| MD5 é sugestão, pode ser outra representação | JSON/Base64URL reversível, versionado e validado |
| Compartilhar e enviar aos calendários Google/Microsoft/etc. | CAP-4/CAP-7; calendarios.md e história 12, sem APIs autenticadas |
| Local opcional em qualquer tema; preenchido mostra OpenStreetMap e rota desde o visitante | CAP-8; mapas-e-rotas.md e história 15 |
| MVP final aprovado após duas sugestões | CAP-9 e CAP-4: link de reunião online e copiar convite pronto |
| Busca exata, caixa indiferente, com/sem acento e sinônimos em site estático | CAP-1; busca-de-temas.md e história 17 |
| Demais ações sugeridas | acoes-sugeridas.md: convite PNG/tela cheia/QR/favoritos pós-MVP |
| Documentos de UX/arquitetura e histórias | Companions; decomposição de histórias separada do contrato |
