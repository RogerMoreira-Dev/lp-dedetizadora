# Landing pages de dedetizadora para Google Ads

Site de exemplo de uma dedetizadora em que **cada anúncio do Google leva para uma página própria e todo botão termina no WhatsApp** com a mensagem já escrita.

**Site no ar:** https://rogermoreira-dev.github.io/lp-dedetizadora/

> A "Muro Controle de Pragas" é uma empresa fictícia. Esta é uma página demonstrativa de portfólio: as páginas têm `noindex`, os depoimentos são de exemplo e os botões não estão ligados a nenhum número real.

## Páginas

| Página | Para qual busca | Endereço |
|---|---|---|
| Inicial | dedetizadora, dedetização + cidade | `/` |
| Baratas | dedetização de baratas | `/baratas/` |
| Ratos | desratização, rato no forro | `/ratos/` |
| Cupins | descupinização, cupim em móveis | `/cupins/` |
| Aranha-marrom | controle de aranha-marrom | `/aranha-marrom/` |
| Empresas | controle de pragas para restaurante e condomínio | `/empresas/` |
| Privacidade | exigida para anúncios e LGPD | `/privacidade/` |

## O que tem para converter

- **Orçamento em 30 segundos:** a pessoa marca a praga, o tipo de imóvel e o bairro, vê a mensagem pronta e envia no WhatsApp.
- **Botões de WhatsApp e de ligar** no topo, no meio, no fim e numa barra fixa no celular.
- **Páginas de anúncio sem menu**, sem links que tirem a pessoa da página.
- **Cidade pela URL:** `?cidade=Pinhais` troca a cidade no título e no texto.
- **Origem do lead:** o site guarda o gclid e as UTMs e escreve "(Vim pelo Google)" na mensagem do WhatsApp.
- **Conversões do Google Ads e eventos do GA4** nos cliques, com aviso de cookies e Consent Mode v2. Nada carrega enquanto os IDs estiverem vazios.
- **Rápido:** HTML estático, sem framework. O fundo em WebGL só começa depois que a página carregou, roda em resolução reduzida, pausa fora da tela e respeita "reduzir movimento".
- **SEO técnico:** título e descrição por página, canonical, Open Graph com imagem, dados estruturados de FAQ e sitemap.

## Google Ads

A pasta [`google-ads/`](google-ads/) tem a campanha pronta para importar no Google Ads Editor: palavras-chave por grupo, anúncios responsivos, palavras negativas, sitelinks e frases de destaque. O [plano da campanha](google-ads/README.md) explica configuração, conversões, lances e a rotina semanal.

## Usar com um cliente

1. Edite `src/data/site.mjs`: nome, WhatsApp, telefone, CNPJ, endereço, cidade, bairros, IDs do Google Ads e `demo: false`.
2. Ajuste os textos em `src/data/pragas.mjs`.
3. `npm run build` gera o site em `dist/`.
4. `npm run check:ads` regenera os arquivos do Google Ads com a cidade e os endereços novos.

```bash
npm run dev
```

Abre em http://localhost:4173/lp-dedetizadora/

Não tem dependências: basta Node 18 ou mais novo.

## Publicação

Cada push na branch `main` gera o site e publica no GitHub Pages pelo workflow `.github/workflows/deploy.yml`. Para outro servidor (Vercel, Netlify, Cloudflare Pages, hospedagem comum), basta publicar a pasta `dist/` e trocar `url` em `src/data/site.mjs`.

## Estrutura

```
build.mjs                 gera dist/
src/data/site.mjs         configuração (contato, cidade, rastreamento)
src/data/pragas.mjs       conteúdo de cada página
src/templates.mjs         HTML das seções
src/icons.mjs             ícones e desenhos das pragas em SVG
src/assets/css/style.css  estilos
src/assets/js/main.js     WhatsApp, orçamento, cidade, barra do celular
src/assets/js/tracking.js Google Ads, GA4, origem do lead, cookies
src/assets/js/shader.js   fundo animado em WebGL
scripts/validate-ads.mjs  gera e confere os arquivos do Google Ads
google-ads/               campanha pronta para importar
```

Visual inspirado no template "Zen" de agência com shader WebGL do 21st.dev. O shader, os ícones e o código são originais.
