# Plano de Google Ads da dedetizadora

Tudo nesta pasta é gerado por `npm run check:ads` a partir de `scripts/validate-ads.mjs`. O script também confere o limite de caracteres de cada título, descrição, sitelink e frase de destaque, então o que está aqui sobe no Google Ads sem ser recusado por tamanho.

| Arquivo | O que é | Onde usar |
|---|---|---|
| `palavras-chave.csv` | 49 termos × 2 correspondências (exata e de frase) = 98 linhas, já com o grupo e a URL final | Google Ads Editor → Conta → Importar → Do arquivo |
| `anuncios-rsa.csv` | 1 anúncio responsivo por grupo, com 15 títulos e 4 descrições | Google Ads Editor → Importar |
| `negativas.csv` / `negativas.txt` | 46 termos que trazem clique sem cliente (receita caseira, vaga, sonho, veneno de mercado…) | `.txt`: Ferramentas → Biblioteca compartilhada → Listas de palavras-chave negativas |
| `sitelinks.csv` | 5 sitelinks, um para cada página | Recursos → Sitelinks |
| `extensoes.txt` | Frases de destaque e snippet estruturado | Recursos |

> Os textos falam em garantia de 90 dias, atendimento em até 24 horas e aos sábados. **Ajuste para o que o cliente realmente oferece.** O Google reprova anúncios com promessas que a empresa não cumpre.

## Estrutura da campanha

**Campanha:** `Pesquisa | Dedetização | Curitiba`

| Grupo de anúncios | Página de destino | Exemplo de busca |
|---|---|---|
| Baratas | `/baratas/` | dedetização de baratas |
| Ratos | `/ratos/` | desratização, rato no forro |
| Cupins | `/cupins/` | descupinização, cupim em móveis |
| Aranha-marrom | `/aranha-marrom/` | controle de aranha marrom |
| Geral | `/` | dedetizadora perto de mim |
| Empresas | `/empresas/` | dedetização para restaurante |

Cada grupo leva para uma página cujo título repete a busca. Isso melhora o Índice de Qualidade, que deixa o clique mais barato. As páginas de praga não têm menu nem links que tirem a pessoa da página: o único caminho é o WhatsApp ou o telefone.

## Configurações

- **Rede:** só Rede de Pesquisa do Google. Desmarque Parceiros de pesquisa e Rede de Display.
- **Locais:** Curitiba, São José dos Pinhais, Pinhais, Colombo, Araucária, Almirante Tamandaré, Fazenda Rio Grande e Campo Largo.
- **Opção de local:** "Presença: pessoas que estão ou costumam estar nos locais segmentados". Assim o anúncio não aparece para quem só pesquisou sobre Curitiba de outro estado.
- **Idioma:** português.
- **Programação:** segunda a sábado, das 7h às 20h, quando tem alguém para responder o WhatsApp. Fora desse horário, o lead esfria.
- **Orçamento para começar:** R$ 40 a R$ 60 por dia. Confira o custo por clique de "dedetização" na sua cidade no Planejador de palavras-chave antes de definir.
- **Lances:**
  1. Primeiras 2 semanas: **Maximizar cliques** com CPC máximo de R$ 6, para juntar dados.
  2. Com 15 a 30 conversões registradas: mude para **Maximizar conversões**.
  3. Com custo por lead estável: **CPA desejado** perto do valor que vinha dando.

## Conversões (configure antes de ligar a campanha)

1. Em **Metas → Conversões → Nova ação de conversão → Site**, crie duas ações manuais:
   - `Clique no WhatsApp`, categoria **Contato**, contagem **Uma**, janela de 30 dias.
   - `Clique para ligar`, categoria **Ligação telefônica**, contagem **Uma**.
2. Copie o ID da conta (`AW-…`) e o rótulo de cada conversão para `src/data/site.mjs`, em `tracking`.
3. Rode `npm run build` e publique. O site já dispara a conversão em todos os botões de WhatsApp, no formulário "Orçamento em 30 segundos" e no botão de ligar.
4. Ative também o recurso de ligação nos anúncios, com a conversão "Ligações de anúncios" de 60 segundos ou mais.
5. Teste com o Google Tag Assistant: clique nos botões e veja a conversão aparecer.

Com o GA4 (`ga4Id`), o site envia os eventos `whatsapp_click` e `click_to_call`. Quem usa Google Tag Manager recebe o evento `lead_click` no `dataLayer`.

## De onde veio cada lead

- Deixe a **codificação automática** ligada (gclid).
- Em **Configurações da conta → Sufixo do URL final**, cole:

  ```
  utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}
  ```

- O site guarda a origem por 90 dias e coloca "(Vim pelo Google)" no fim da mensagem do WhatsApp. No fim do mês, basta contar essas conversas e quantas viraram serviço para saber o custo por cliente fechado.

### Cidade no título

Toda página aceita `?cidade=` na URL. `.../baratas/?cidade=Pinhais` mostra "Dedetização de baratas em Pinhais" no título e no texto. Para usar, crie uma campanha por cidade (ou grupo de cidades) e coloque `cidade=Nome da Cidade` no sufixo da URL final dessa campanha.

## Rotina semanal

1. **Termos de pesquisa:** negative o que não é cliente (curiosidade, produto de mercado, outra cidade).
2. **Palavras sem resultado:** pause a que gastou mais de 2 vezes o custo por lead sem nenhuma conversão.
3. **Recursos do anúncio:** troque os títulos com desempenho "Baixo".
4. **Dispositivos:** quase todo lead de dedetização vem do celular. Se o computador gastar sem converter, reduza o lance nele.
5. **WhatsApp:** some as conversas com "(Vim pelo Google)" e quantas fecharam. Esse é o número que importa para o cliente.

## Antes de publicar para um cliente real

- [ ] `src/data/site.mjs`: `whatsapp`, `phone`, `phoneDisplay`, `cnpj`, `address`, `technician`, `url` e `demo: false`
- [ ] Textos das páginas e dos anúncios conferidos com o que a empresa realmente oferece
- [ ] Avaliações reais do Google no lugar da seção de exemplo (`src/templates.mjs`)
- [ ] Perfil da empresa no Google vinculado à conta de anúncios (recurso de local)
- [ ] Conversões testadas no Tag Assistant
