---
id: SPEC-contadores-tematicos
companions:
  - ux.md
  - temas-e-artes.md
  - arquitetura.md
  - publicidade-e-metricas.md
  - criterios-de-aceite.md
  - calendarios.md
  - mapas-e-rotas.md
  - busca-de-temas.md
sources: []
---

> **Contrato do MVP.** Esta especificação e seus companions definem o que construir e verificar. Derivados das decisões registradas em `.memlog.md` e das mensagens desta conversa. Data: 2026-10-05. Escopo funcional consolidado após confirmação do usuário e adição da busca estática. Premissas de implementação abaixo continuam propostas de trabalho; as questões operacionais permanecem abertas.

# Contadores temáticos — MVP

## Why

Transformar a página atual de contadores fixos em um produto no qual qualquer pessoa crie e compartilhe uma contagem regressiva com identidade visual própria para sua ocasião. A oportunidade comercial é gerar tráfego recorrente e compartilhado para publicidade, mantendo criação simples e custo operacional baixo; receita é uma hipótese a medir.

## Capabilities

- **CAP-1 — Encontrar e escolher uma ocasião**
  - **intent:** A pessoa encontra um tema adequado pela galeria ou por busca de nomes, palavras e sinônimos.
  - **success:** Os quinze temas de `temas-e-artes.md` têm prévias e páginas próprias; busca por palavra/nome exato ou sinônimo encontra os temas sem diferenciar caixa ou acentos, conforme `busca-de-temas.md`.
- **CAP-2 — Personalizar um evento**
  - **intent:** Qualquer pessoa cria um evento ou duplica um link existente, personaliza seus dados e confere a cópia antes de compartilhar.
  - **success:** Título, data/hora/fuso, mensagem e detalhes opcionais geram prévia fiel; qualquer visitante pode colar/duplicar um link existente para preencher o criador sem permissão do autor; editar gera nova URL sem modificar links anteriores nem consultar base de dados.
- **CAP-3 — Acompanhar a contagem**
  - **intent:** Visitantes acompanham o tempo restante e reconhecem quando o evento chegou.
  - **success:** Dias, horas, minutos e segundos convergem para o mesmo instante em qualquer fuso, sem valores negativos; suspensão da aba, evento vencido e movimento reduzido têm comportamento definido.
- **CAP-4 — Compartilhar e reabrir**
  - **intent:** A pessoa envia o evento e visitantes podem abri-lo e redistribuí-lo sem cadastro.
  - **success:** Um link aberto em sessão limpa preserva tema, conteúdo, local/endereço e instante; compartilhar e copiar convite pronto têm prévia/fallback manual; URLs inválidas mostram recuperação compreensível.
- **CAP-5 — Reconhecer a identidade visual**
  - **intent:** Cada ocasião é reconhecida pela arte da página e pela prévia social.
  - **success:** Os quinze temas têm composições exclusivas, versões para página/galeria e OG fixa no HTML, com legibilidade móvel e desktop conforme os companions.
- **CAP-6 — Operar publicidade**
  - **intent:** O operador monetiza espaços publicitários sem impedir criação, compartilhamento ou leitura do contador.
  - **success:** Espaço e integração desativável são demonstrados com carregamento e falha isolados; veiculação real exige resolver Q1/Q3 e validar a rede escolhida. Slot ou mock isolados não comprovam monetização ativa.

- **CAP-7 — Adicionar à agenda**
  - **intent:** Qualquer visitante leva o evento ao calendário que utiliza para se organizar e configurar seus lembretes.
  - **success:** Google Calendar, Microsoft Outlook/Microsoft 365 e Apple/outros via `.ics` recebem título, instante, local/endereço, descrição e link corretos; a pessoa confirma no destino e tem alternativa de importação sem cadastro no site.

- **CAP-8 — Ver o local e obter direções**
  - **intent:** Visitantes encontram o local do evento e consultam como chegar desde sua localização ou outra origem.
  - **success:** Em qualquer tema, local preenchido e confirmado oferece mapa OpenStreetMap e rota; sem local, a seção não aparece; recusa/falha de geolocalização permite origem manual e não bloqueia o evento.

- **CAP-9 — Acessar reunião online**
  - **intent:** Visitantes acessam a reunião online associada ao evento, quando informada.
  - **success:** Link HTTPS opcional é preservado na criação, duplicação e agenda; “Entrar na reunião” só aparece quando preenchido e abre o endereço escolhido sem integrar contas.

## Constraints

- Astro gera HTML estático; eventos são resolvidos no navegador sem banco, Functions, SSR ou armazenamento remoto no MVP.
- Dados completos e versionados viajam na URL em JSON/Base64URL; um digest MD5 isolado não satisfaz o contrato. Links e edição por importação não dependem do dispositivo criador ou de base de dados.
- Busca de temas usa índice e sinônimos locais gerados no build, sem API, IA, banco ou envio da consulta a terceiros.
- Quinze temas, priorizando os cinco originais na ordem de produção, e artes exclusivas por tema; a OG é fixa por tema, nunca personalizada por evento no MVP.
- Data absoluta e fuso explícito; título/mensagem são texto sem HTML. Limites, versão e estados de falha estão em `arquitetura.md`.
- Duplicação e redistribuição são livres para qualquer portador do link; não há proprietário, segredo de edição ou autorização do criador. Uma cópia nunca altera o original.
- Exportação de calendário é uma cópia do evento, confirmada no destino, sem OAuth, gravação automática, convites ou sincronização; contrato em `calendarios.md`.
- Local é opcional em todos os temas; preenchido, habilita mapa e rota. Coordenadas do destino viajam na URL, mas a localização atual do visitante nunca é incorporada ao evento.
- Contagem, foco, leitura e compartilhamento continuam funcionais com movimento reduzido e falha/bloqueio de publicidade.
- Bibliotecas atuais são candidatas a reaproveitamento; compatibilidade e qualidade prevalecem sobre preservação literal do código.
- Artes/fontes devem permitir uso comercial; informações do evento não podem entrar automaticamente na medição própria.
- Firebase é planejamento de evolução sem banco de eventos: não entra no caminho crítico, dependências ou deploy do MVP.

## Non-goals

- OG individual, encurtador que consulte servidor ou geração de imagens em tempo de execução.
- Contas, banco de eventos, painel privado, edição remota/in-place, revogação de links ou garantia de confidencialidade.
- Fotos/logos enviados pelo usuário, HTML livre, RSVP, recorrência, sincronização de calendários ou envio automático de convites, pagamentos ou planos premium.
- Convite em imagem, tela cheia, QR Code e favoritos ficam pós-MVP; OG personalizada via Firebase permanece evolução futura.
- Múltiplos idiomas, promessa de aprovação por rede publicitária ou garantia de renda.

## Success signal

- Demonstrar os casos de busca de `busca-de-temas.md` com consultas exatas, caixa/acentos variados e aliases, sem requests de pesquisa, inclusive estado sem resultado.
- Nos quinze temas, criar um evento, abrir seu link em outro navegador/fuso, importar e editar local/endereço por outro link, preservar a versão anterior e demonstrar a transição a zero; o HTML publicado contém a OG correta mesmo sem executar JavaScript. As quinze artes finais passam pela conferência visual de `criterios-de-aceite.md`.
- Exportar um evento e demonstrar importação em Google Calendar, Microsoft Outlook/Microsoft 365 e Apple Calendar conforme a matriz de `calendarios.md`; o instante e os detalhes permanecem corretos, sem alegar atualização automática.
- Demonstrar evento sem local e com local nos quinze temas; mapa no destino confirmado, direções com localização autorizada e origem manual, falha isolada de tiles e compatibilidade com links antigos sem ponto.
- Demonstrar link de reunião opcional em evento online/híbrido, sua preservação em duplicação/agenda e cópia do convite com link completo, sem envio automático.
- O MVP técnico comprova slots desligados, carregados em teste e em falha sem afetar o uso. Aceite comercial é separado: anúncios reais apenas com Q1/Q3 resolvidas; resultados de receita/tráfego dependem de Q4.

## Assumptions

- **A0:** Projeto `countdown`; pasta `_bmad-output/specs/spec-contadores-tematicos/` por ausência de configuração local do BMad.
- **A1:** Público inicial pt-BR, prioridade móvel, sem cadastro; quem possui o link pode ler e copiar os dados.
- **A2:** Formato v1 Base64URL/JSON; título até 80 e mensagem até 240 pontos de código; URL até 4096 caracteres.
- **A3:** Eventos de 2000 a 2100; criação exige data futura com precisão de minuto; fuso detectado/editável e fallback `America/Sao_Paulo`.
- **A4:** Evento único, sem recorrência, uploads ou links na mensagem; criação/contagem exigem JavaScript.
- **A5:** Critérios de tela, contraste, foco, zoom e movimento de `ux.md` são o piso proposto de qualidade.
- **A6:** As quinze direções visuais de `temas-e-artes.md` são propostas; a entrega atual especifica as artes e não as produz.
- **A7:** Limites propostos de assets: 600 KB de arte no primeiro acesso móvel ao tema e 500 KB por OG.
- **A8:** Um slot no máximo por página elegível; integração desligada até configuração comercial e requisitos aplicáveis definidos.
- **A9:** Medição mínima por adapter desligado até destino definido; não registrar dados do evento nem URL integral.
- **A10:** Local até 80, endereço livre até 200 e anfitrião/organização até 60 pontos de código, todos opcionais; sem busca de CEP, telefone ou e-mail; busca geográfica somente explícita, com confirmação do ponto.
- **A11:** Horário final opcional `calendarEndsAt`; sem ele, exportar compromisso pontual ou pedir fim para um atalho que o exija, sem inventar duração.
- **A12:** “openmap” significa OpenStreetMap; confirmar marcador ao informar local e abrir direções em planejador OSM, com permissão apenas ao usar origem atual.

- **A13:** URL de reunião HTTPS opcional até 1024 caracteres; limites globais de payload/URL continuam valendo; apenas abertura explícita, sem integração de contas.
- **A14:** Aliases curados e ranking determinístico de `busca-de-temas.md`; pesquisa por palavras inteiras, sem correção de digitação ou busca semântica no MVP.

## Open Questions

- **Q1 — Publicidade:** Qual rede, conta, formatos e páginas elegíveis? Bloqueia veiculação real, não a implementação do slot.
- **Q2 — Publicação:** Qual domínio, base path e hospedagem? Bloqueia metadados absolutos finais e teste social de produção.
- **Q3 — Operação:** Quais mercados, identificação/contato do operador, política de privacidade e solução de consentimento aplicável? Bloqueia ativação de scripts externos em produção.
- **Q4 — Resultado:** Qual destino das métricas e qual meta de tráfego/receita por período? Bloqueia medição comercial, não o contador.
- **Q5 — Mapas:** Qual provedor/configuração de tiles e busca geográfica atende o uso de produção? Bloqueia configuração final dos mapas/busca em produção; marcação manual dispensa geocodificador, mas exige base de mapa configurada.
