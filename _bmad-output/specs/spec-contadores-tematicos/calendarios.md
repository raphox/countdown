# Adicionar ao calendário

Contrato de CAP-7; horário final opcional é premissa A11. Exportar significa preparar uma cópia que a pessoa salva no destino; não assinar uma agenda nem conectar contas ao site.

## Serviços e experiência

| Opção no menu | Contrato do MVP |
|---|---|
| Google Calendar | Oferecer inclusão com dados preenchidos por atalho validado; fallback obrigatório com arquivo `.ics` e orientação de importação |
| Microsoft Outlook / Microsoft 365 | Distinguir conta pessoal/corporativa quando o atalho exigir; fallback com `.ics` e orientação para a interface utilizada |
| Apple Calendar / outros | Baixar `.ics` e orientar abertura/importação no app compatível; não prometer abertura automática em todo navegador móvel |

Google documenta importação de ICS no computador. Outlook suporta importação, distinguindo-a de assinatura; Apple Calendar no Mac também documenta importação de eventos. Essas referências sustentam o fallback, não uma garantia universal de comportamento móvel ou de links de composição. [Google](https://support.google.com/calendar/answer/37118), [Microsoft](https://support.microsoft.com/en-us/outlook/import-or-subscribe-to-a-calendar-in-outlook-com-or-outlook-on-the-web), [Apple](https://support.apple.com/en-il/guide/calendar/-icl1023/mac)

Habilitar atalhos de composição somente após verificar parâmetros e comportamento nos serviços atuais, incluindo login prévio/ausente, conta pessoal/corporativa, texto Unicode e tamanho de URL. Se falharem ou excederem limites, manter acesso ao ICS e instruções. Não introduzir APIs autenticadas como fallback. O login eventual acontece no provedor, sem credenciais entregues ao site.

## Dados exportados

| Origem | Destino |
|---|---|
| `title` | Título/SUMMARY |
| `endAt` | Início/DTSTART; este campo é o fim da contagem, não o fim do compromisso |
| `calendarEndsAt`, se presente | Fim/DTEND, posterior ao início |
| `venue` + `address`, quando preenchidos | Local/LOCATION |
| `message`, `organizer`, fuso do evento, `meetingUrl` se preenchido e link completo | Descrição legível/DESCRIPTION |
| URL completa, incluindo fragmento | URL do evento; também aparece na descrição |

Anfitrião é apenas texto: não emitir ORGANIZER, ATTENDEES ou solicitação de reunião a partir dele. Não enviar convites, contatos ou listas de destinatários. URL de reunião é texto/link na descrição, sem criar conferência ou integrar conta de reunião. Atalhos e arquivo devem preservar o mesmo instante e detalhes; o calendário pode exibir o instante no fuso local da pessoa.

O horário final é opcional na criação, validado no mesmo fuso e codificado como UTC. Links sem ele seguem válidos. Sem horário final, não inventar duração: no ICS omitir DTEND/DURATION; se o atalho precisar de fim, pedir a escolha na preparação da exportação ou usar o arquivo. Informar “Duração não definida”; essa escolha temporária não modifica o link recebido.

## Arquivo interoperável

Usar VCALENDAR/VEVENT, VERSION 2.0, PRODID, UID estável derivado do conteúdo canônico e DTSTAMP UTC da exportação. DTSTART/DTEND usam UTC; não é necessário VTIMEZONE nesse formato. O padrão permite VEVENT com DTSTART temporal sem fim, com duração zero. Aplicar CRLF, folding de linhas em octetos e escapes de TEXT para barra invertida, vírgula, ponto e vírgula e quebra de linha, sem dividir sequência UTF-8. Impedir que campos adicionem propriedades ou outro VEVENT. [RFC 5545](https://www.rfc-editor.org/rfc/rfc5545)

Gerar `Blob` local com MIME `text/calendar;charset=utf-8` e nome de arquivo seguro; liberar URL temporária após uso. Não enviar dados a serviço gerador de ICS. UID determinístico pode usar digest de payload canônico: isso não substitui a URL reversível nem cria uma base de eventos. Alterar o conteúdo cria outra identidade; importar o mesmo arquivo novamente pode duplicar conforme o cliente, mesmo com UID consistente.

Não emitir alarmes automáticos no MVP: a pessoa configura lembretes no calendário. Não alegar “evento salvo” após download/abertura, pois não há confirmação de salvamento. Nenhuma edição posterior do link atualiza o compromisso importado.

## Aceite

- Conferir mesmo instante, título Unicode/emoji, endereço com múltiplas linhas, mensagem, anfitrião, reunião opcional e link completo em Google Calendar web, Outlook web e Apple Calendar no Mac; registrar versões/ambientes e limitações reais.
- Verificar Microsoft pessoal e Microsoft 365 quando atalho diferenciado for oferecido; testar entrada sem sessão e com sessão. Validar a experiência em Safari/iOS e Chrome/Android, com fallback claro se não houver importação direta.
- Cobrir início/fim, ausência de fim, término inválido, virada de dia/ano, fusos/DST, evento passado válido e URL longa. O alvo da contagem deve virar início, jamais fim do compromisso.
- Validar sintaxe ICS com parser independente, round-trip de texto e prevenção de injeção CRLF/propriedades, UID estável e alterações que geram outra identidade.
- Confirmar ausência de request de exportação ao próprio backend e de pré-envio ao provedor; abrir o serviço apenas por ação explícita. A exportação local não exige banco ou autenticação.
