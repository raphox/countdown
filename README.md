# Contagem — catálogo de temas

Site Astro estático em pt-BR com quinze temas navegáveis. Nesta etapa, cada rota apresenta a ocasião e explica o funcionamento planejado. Criar eventos, acompanhar a contagem, busca, compartilhamento e artes finais ainda não estão disponíveis.

## Desenvolvimento

Requer Node.js 22.12 ou superior (testado com Node 24). Rode:

```sh
npm ci
npm run dev
npm run check
npm run build
npm test
```

`npm test` verifica o HTML gerado e inicia o servidor de prévia do Astro para conferir rotas, recursos e status HTTP. Execute depois de `npm run build`.

## Origem e subdiretório

O build usa `https://contagem.vivace-softwares.com.br` como origem pública padrão. Copie `.env.example` para `.env` se precisar alterar `SITE_URL`. `BASE_PATH` é `/` para domínio raiz ou, por exemplo, `/countdown/` para um subdiretório. As duas variáveis são aplicadas **durante o build**; gere novamente `dist/` ao alterá-las.

```sh
SITE_URL=https://contagem.vivace-softwares.com.br BASE_PATH=/countdown/ npm run build
SITE_URL=https://contagem.vivace-softwares.com.br BASE_PATH=/countdown/ npm test
```

Publique apenas `dist/` em uma hospedagem de arquivos estáticos. Configure o host para servir `404.html` com status HTTP **404** em caminhos desconhecidos, sem redirecioná-los para a página inicial. Em subdiretório, monte o conteúdo de `dist/` no prefixo configurado e preserve essa regra para o prefixo. O servidor de prévia do Astro é usado para desenvolvimento e testes, não é necessário em produção.

## Estrutura

- `src/data/themes.ts`: registro único de nomes, slugs, categorias, descrições, paletas e mensagens de encerramento para uso futuro.
- `src/lib/paths.ts`: URLs internas compatíveis com `BASE_PATH`.
- `src/pages/`: catálogo, quinze páginas geradas e erro 404.
- `index.html` e `compiled/`: legado preservado, fora do build Astro.

O site de produção usa fontes do sistema, texto e paletas em CSS. Não carrega CDNs, imagens remotas ou serviços externos. A interface funciona sem JavaScript nesta etapa; as funções de criação e contagem futuras dependerão dele.
