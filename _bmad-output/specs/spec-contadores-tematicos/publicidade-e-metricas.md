# Publicidade e sinais de uso

Contrato de CAP-6 e premissas A8/A9. Rede, conta e metas de receita não foram escolhidas. A especificação não afirma aprovação comercial.

## Entrega técnica e ativação comercial

**Entrega técnica:** componente de slot, adapter para rede, configuração por ambiente/rota, reserva de espaço, estados desligado/carregando/preenchido/sem anúncio/falha e teste local sem gerar impressões artificiais. O relógio não aguarda scripts externos. Com feature flag desligada, não injetar script nem exibir um falso anúncio; remover espaço reservado antes do primeiro layout.

**Ativação comercial:** resolver Q1 e Q3, configurar a conta real e comprovar que o formato e a página são elegíveis. Um mock demonstra integração, mas não fecha o aceite de veiculação. Nunca inventar publisher ID, cliente, credenciais ou receita. Q2 determina o domínio a configurar na rede.

Proposta: no máximo um slot por página elegível, depois do conteúdo e ações principais. Na home, depois da galeria e explicação; no evento, depois de contador/mensagem/ações. Criador, prévia, erros e OG não têm anúncios. Com slot ativo, reservar altura por breakpoint para evitar deslocar ações; em falha ou ausência de inventário, não fazer colapso tardio que mova controles. Sem atualização automática, overlay ou intersticial.

Se a rede considerar a página personalizada inadequada, manter anúncios somente nas páginas aprovadas de catálogo/temas, sem bloquear a utilidade do evento. Essa opção precisa aparecer na configuração por rota/estado.

Se AdSense for escolhido, avaliar o conteúdo real antes de ativar: suas políticas restringem anúncios em telas sem conteúdo editorial ou de baixo valor, e anúncios que interferem no uso; também pode haver impedimento em conteúdo que a rede não consegue avaliar. Isso é uma dependência comercial, não uma afirmação de que este site será aprovado ou recusado. [Políticas de publishers](https://support.google.com/adsense/answer/10502938), [posicionamento de anúncios](https://support.google.com/adsense/answer/1346295)

## Dados e operação

Definir mercados, dados coletados, responsável/contato, política de privacidade e comportamento de consentimento aplicável à rede antes de scripts de produção. Não inventar texto jurídico ou presumir que uma configuração serve para todos os países. Com recusa/falha/indefinição, o produto permanece usável sem scripts opcionais.

Mapas também usam serviços externos. Informar o provedor, a consulta de endereço e o encaminhamento da origem nas direções; nunca registrar coordenadas/origem em medição própria.

Código de terceiros no mesmo documento pode ler o fragmento. Auditar captura automática de URL, referrer, título e erros; não enviar intencionalmente dados do evento à medição própria. Isolar integrações quando compatível com o provedor e documentar seu comportamento real. Não prometer confidencialidade do link.

## Instrumentação mínima proposta

| Evento | Momento | Propriedades permitidas |
|---|---|---|
| `theme_selected` | Escolha na galeria | slug do tema |
| `event_created` | Gerar link válido | slug do tema |
| `event_opened` | Abrir payload válido | slug do tema |
| `share_attempt` | Acionar compartilhar/copiar | slug e método |
| `share_completed` | API de compartilhar/cópia confirma sucesso | slug e método |
| `calendar_action` | Abrir opção de calendário ou baixar ICS | slug e destino (`google`, `microsoft`, `ics`) |
| `create_from_event` | Visitante escolhe criar o seu | slug do tema |

Não incluir nome, mensagem, data/hora inicial/final, fuso, anfitrião, local, endereço, coordenadas de destino/origem, URL de reunião, texto de convite, consulta da busca, payload, fragmento ou URL completa. Evitar duplicação na montagem de componentes. Erros têm somente códigos fechados, sem carga original ou link importado. Métricas são melhores esforços; falha de envio não afeta o produto. O destino é Q4 e fica desligado até decisão; um adapter local inspecionável demonstra o contrato.

`calendar_action` mede preparação/abertura, nunca comprova salvamento na agenda.

`share_completed` mede conclusão da ação no dispositivo, não leitura do destinatário. Não há atribuição individual de convite no MVP. Impressões, cliques, preenchimento e receita vêm da rede escolhida; renderizar um slot não prova impressão faturável.

Sinais a acompanhar quando houver dados: eventos criados, abertura de links, conclusão de ações de compartilhar e criação a partir de eventos, segmentados por tema. Estabelecer janela e metas após Q4; não adicionar painel próprio, modelo de faturamento ou promessas de renda ao MVP.
