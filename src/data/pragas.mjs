// Conteúdo de cada página de destino. Uma página por grupo de anúncios do Google Ads:
// o título repete a busca da pessoa ("dedetização de baratas em Curitiba").
// {cidade} é trocado pela cidade padrão ou pela cidade da URL (?cidade=).

export const pragas = [
  {
    slug: "baratas",
    label: "Baratas",
    quiz: "Baratas",
    title: "Dedetização de baratas em Curitiba | Muro Controle de Pragas",
    description:
      "Dedetização de baratas com gel sem cheiro: você não precisa sair de casa. Vistoria e orçamento grátis pelo WhatsApp. Garantia de 90 dias.",
    h1: "Dedetização de baratas em {cidade}",
    lead:
      "Gel sem cheiro aplicado nas frestas da cozinha e do banheiro. Você não precisa sair de casa e as baratas somem em poucos dias.",
    heroPoints: ["Sem cheiro e sem sair de casa", "Atendimento em até 24 horas", "Garantia de 90 dias por escrito"],
    speciesTitle: "Qual barata apareceu aí?",
    species: [
      {
        name: "Barata-alemã (francesinha)",
        sci: "Blattella germanica",
        text: "Pequena e marrom-clara, vive dentro de armários, fogão, micro-ondas e geladeira. Se reproduz muito rápido. O tratamento certo é gel em isca.",
      },
      {
        name: "Barata-americana (de esgoto)",
        sci: "Periplaneta americana",
        text: "Grande e avermelhada, sobe pelos ralos e caixas de gordura. O tratamento é feito na rede de esgoto, ralos e áreas externas.",
      },
    ],
    signsTitle: "Sinais de que já é infestação",
    signs: [
      "Baratas andando durante o dia (elas preferem a noite; de dia, é porque falta espaço no esconderijo)",
      "Pontinhos pretos parecidos com pó de café no canto dos armários",
      "Cápsulas marrons de ovos, do tamanho de um grão de feijão",
      "Cheiro oleoso e adocicado dentro dos armários",
    ],
    method: [
      { t: "Vistoria", d: "O técnico identifica a espécie e onde ficam os ninhos." },
      { t: "Gel nas frestas", d: "Pontos de gel em dobradiças, rodapés, motor da geladeira e atrás do fogão." },
      { t: "Ralos e esgoto", d: "Pulverização em ralos, caixas de gordura e área externa quando há barata-americana." },
      { t: "Retorno", d: "Revisão gratuita dentro da garantia se alguma barata voltar." },
    ],
    safety: {
      leave: "Não precisa sair",
      text: "O gel não tem cheiro e fica dentro das frestas, longe de crianças e animais. Quando há pulverização na área externa, basta esperar o produto secar.",
    },
    faq: [
      { q: "Em quanto tempo as baratas somem?", a: "A maior parte some entre 3 e 7 dias. A barata come o gel, volta para o esconderijo e contamina as outras." },
      { q: "Posso limpar a cozinha depois?", a: "Pode limpar normalmente as bancadas. Só evite passar pano dentro das frestas onde o gel foi aplicado nos primeiros 15 dias." },
      { q: "Por que o inseticida de mercado não resolve?", a: "O spray mata a barata que você vê, mas espalha as outras e não chega nos ovos. O gel age dentro do ninho." },
    ],
  },
  {
    slug: "ratos",
    label: "Ratos",
    quiz: "Ratos",
    title: "Desratização em Curitiba | Muro Controle de Pragas",
    description:
      "Desratização com porta-iscas trancados, seguros para crianças e pets, e vedação das entradas. Orçamento grátis pelo WhatsApp.",
    h1: "Desratização em {cidade}",
    lead:
      "Porta-iscas trancados com chave, longe de crianças e animais, e vedação dos buracos por onde os ratos entram. Barulho no forro acaba de vez.",
    heroPoints: ["Porta-iscas trancados com chave", "Vedação das entradas", "Garantia de 90 dias por escrito"],
    speciesTitle: "Três ratos, três tratamentos",
    species: [
      { name: "Ratazana", sci: "Rattus norvegicus", text: "A maior. Vive no esgoto e em tocas no quintal. Entra pela rede de esgoto e por ralos sem tela." },
      { name: "Rato-de-telhado", sci: "Rattus rattus", text: "Ágil, sobe por fios e árvores. É o barulho no forro durante a noite." },
      { name: "Camundongo", sci: "Mus musculus", text: "Pequeno, vive dentro de casa, em armários e despensas. Passa por frestas de 1 cm." },
    ],
    signsTitle: "Sinais de rato em casa",
    signs: [
      "Fezes escuras: do tamanho de um grão de arroz (camundongo) até 2 cm (ratazana)",
      "Embalagens, fios e madeira roídos",
      "Barulho de arranhado no forro ou nas paredes à noite",
      "Manchas de gordura no rodapé, no caminho que eles sempre fazem",
    ],
    method: [
      { t: "Vistoria", d: "Identificamos a espécie, as trilhas e por onde eles entram." },
      { t: "Porta-iscas", d: "Iscas dentro de caixas trancadas, posicionadas nas trilhas e fora do alcance de crianças e pets." },
      { t: "Vedação", d: "Telas em ralos e fechamento de frestas para nenhum rato novo entrar." },
      { t: "Monitoramento", d: "Retornos para repor as iscas e confirmar que a população acabou." },
    ],
    safety: {
      leave: "Não precisa sair",
      text: "As iscas ficam dentro de porta-iscas trancados com chave. Crianças e animais não conseguem abrir nem alcançar o produto.",
    },
    faq: [
      { q: "Rato morto vai cheirar mal dentro do forro?", a: "Pode acontecer em casos pontuais. Por isso posicionamos as iscas nas trilhas externas e voltamos para recolher o que for encontrado." },
      { q: "Rato transmite doença?", a: "Sim. A urina do rato transmite leptospirose, e as fezes contaminam alimentos. Não varra fezes a seco: umedeça antes com água sanitária." },
      { q: "Ratoeira e veneno de mercado não resolvem?", a: "Pegam um ou outro. Sem fechar as entradas e sem tratar as trilhas, a população volta em semanas." },
    ],
  },
  {
    slug: "cupins",
    label: "Cupins",
    quiz: "Cupins",
    title: "Descupinização em Curitiba | Muro Controle de Pragas",
    description:
      "Descupinização de móveis, portas, telhados e estruturas. Tratamento de cupim de madeira seca e cupim de solo. Orçamento grátis pelo WhatsApp.",
    h1: "Descupinização em {cidade}",
    lead:
      "Apareceu pozinho embaixo do móvel ou revoada de aleluias perto da lâmpada? Tratamos o cupim dentro da madeira e no solo, antes que ele chegue no telhado.",
    heroPoints: ["Móveis, portas, rodapés e telhados", "Cupim de madeira seca e de solo", "Garantia por escrito"],
    speciesTitle: "Que cupim é esse?",
    species: [
      { name: "Cupim de madeira seca", sci: "Cryptotermes brevis", text: "Vive dentro de móveis, portas e batentes. Deixa montinhos de grãos parecidos com areia ou pó de serragem." },
      { name: "Cupim de solo (subterrâneo)", sci: "Coptotermes gestroi", text: "Vem do chão e faz túneis de terra nas paredes. É o mais perigoso para telhados e estruturas." },
    ],
    signsTitle: "Sinais de cupim",
    signs: [
      "Montinhos de pó granulado embaixo de móveis, portas e rodapés",
      "Revoada de aleluias (siriris) perto das lâmpadas, comum de setembro a dezembro",
      "Asas soltas no chão perto de janelas",
      "Túneis de terra nas paredes ou madeira oca ao bater",
    ],
    method: [
      { t: "Vistoria", d: "Identificamos o tipo de cupim e até onde a colônia chegou." },
      { t: "Injeção na madeira", d: "Pequenos furos e aplicação de cupinicida dentro das galerias, sem desmontar o móvel." },
      { t: "Barreira no solo", d: "Para cupim subterrâneo, tratamento do solo e das bases das paredes." },
      { t: "Garantia", d: "Revisão gratuita se o cupim voltar dentro do prazo." },
    ],
    safety: {
      leave: "Em geral, não precisa",
      text: "A aplicação é feita dentro da madeira. Em barreiras químicas no solo, pedimos que crianças e pets fiquem longe da área até o produto secar.",
    },
    faq: [
      { q: "Preciso jogar o móvel fora?", a: "Na maioria dos casos, não. A injeção trata a madeira por dentro e o móvel continua firme se o ataque ainda não destruiu a estrutura." },
      { q: "A revoada de aleluias é perigosa?", a: "A revoada em si não, mas indica que existe uma colônia madura por perto procurando lugar para formar outra." },
      { q: "Quanto tempo dura o tratamento?", a: "Um móvel leva poucas horas. Barreira no solo depende da área. O prazo exato vem no orçamento depois da vistoria." },
    ],
  },
  {
    slug: "aranha-marrom",
    label: "Aranha-marrom",
    quiz: "Aranha-marrom",
    title: "Controle de aranha-marrom em Curitiba | Muro Controle de Pragas",
    description:
      "Controle de aranha-marrom em casas e apartamentos: aplicação em rodapés, forros e frestas, limpeza de teias e orientação para evitar picadas.",
    h1: "Controle de aranha-marrom em {cidade}",
    lead:
      "Curitiba é uma das cidades com mais aranha-marrom do Brasil. Tratamos rodapés, forros e frestas e mostramos onde ela se esconde na sua casa.",
    heroPoints: ["Aplicação em rodapés, forros e frestas", "Retirada de teias e bolsas de ovos", "Orientação para evitar picadas"],
    speciesTitle: "Como reconhecer",
    species: [
      { name: "Aranha-marrom", sci: "Loxosceles intermedia", text: "Pequena (corpo de 1 cm), marrom, com pernas finas e compridas. Não é agressiva: pica quando é apertada contra a pele, em roupas, toalhas ou na cama." },
    ],
    signsTitle: "Onde ela costuma estar",
    signs: [
      "Atrás de quadros, móveis encostados na parede e rodapés",
      "Dentro de roupas e calçados guardados há muito tempo",
      "Em forros, sótãos, garagens e pilhas de telhas ou entulho",
      "Teias irregulares, parecidas com algodão, em cantos escuros",
    ],
    method: [
      { t: "Vistoria", d: "Localizamos os esconderijos dentro e fora da casa." },
      { t: "Limpeza", d: "Retirada de teias e bolsas de ovos antes da aplicação." },
      { t: "Aplicação", d: "Produto residual em rodapés, frestas, forro e área externa." },
      { t: "Orientação", d: "O que mudar em casa para ela não voltar: móveis afastados da parede, telas e organização de depósitos." },
    ],
    safety: {
      leave: "Sim, por algumas horas",
      text: "Durante a pulverização, moradores e animais saem do local e voltam depois que o produto secar, normalmente de 2 a 4 horas. Cubra aquários e desligue a bomba.",
    },
    alert: {
      title: "Foi picado?",
      text: "Procure uma unidade de saúde na hora, mesmo sem dor. A lesão costuma aparecer horas depois. Se puder, leve a aranha num pote. Disque-Intoxicação da Anvisa: 0800 722 6001.",
    },
    faq: [
      { q: "A dedetização mata 100% das aranhas?", a: "Nenhum produto sozinho garante isso. O que funciona é a combinação de aplicação, limpeza dos esconderijos e as mudanças em casa que orientamos na visita." },
      { q: "Tenho criança pequena. É seguro?", a: "Sim, desde que todos fiquem fora durante a aplicação e voltem depois da secagem. O técnico explica o tempo exato para o produto usado." },
      { q: "De quanto em quanto tempo preciso refazer?", a: "Em casas com histórico de aranha-marrom, recomendamos manutenção a cada 6 meses." },
    ],
  },
];

export const empresas = {
  slug: "empresas",
  label: "Empresas e condomínios",
  title: "Controle de pragas para empresas e condomínios em Curitiba | Muro",
  description:
    "Contrato mensal de controle de pragas para restaurantes, condomínios, clínicas e escolas, com comprovante de execução para a Vigilância Sanitária.",
  h1: "Controle de pragas para empresas em {cidade}",
  lead:
    "Contrato mensal com visitas programadas, relatório de cada visita e o comprovante de execução que a Vigilância Sanitária pede na fiscalização.",
  heroPoints: ["Comprovante para a Vigilância Sanitária", "Visitas mensais programadas", "Atendimento fora do horário comercial"],
  segments: [
    { t: "Restaurantes e padarias", d: "Controle integrado exigido pelas boas práticas de manipulação de alimentos." },
    { t: "Condomínios", d: "Áreas comuns, garagens, caixas de gordura e lixeiras." },
    { t: "Clínicas e consultórios", d: "Aplicação programada fora do horário de atendimento." },
    { t: "Escolas e creches", d: "Produtos e horários escolhidos para não haver contato com as crianças." },
  ],
  certificate: [
    ["Serviço", "Desinsetização e desratização"],
    ["Produto e princípio ativo", "Conforme a aplicação"],
    ["Registro no Ministério da Saúde", "Nº do registro de cada produto"],
    ["Responsável técnico", "Nome e conselho de classe"],
    ["Validade da garantia", "Data"],
  ],
  faq: [
    { q: "O comprovante serve para a fiscalização?", a: "Sim. Ele traz os produtos usados, princípio ativo, registro, responsável técnico e validade, como pede a norma da Anvisa para empresas de controle de pragas (RDC 622/2022)." },
    { q: "Vocês atendem à noite ou no fim de semana?", a: "Sim. Para não parar a sua operação, as visitas são agendadas fora do horário de funcionamento." },
    { q: "Como funciona o contrato?", a: "Visitas mensais ou quinzenais, com monitoramento dos porta-iscas, relatório e atendimento extra sem custo dentro do contrato." },
  ],
};

// Tabela "Pode ficar em casa?" da página inicial.
export const reentrada = [
  { metodo: "Gel para baratas", sair: "Não", volta: "Na hora" },
  { metodo: "Porta-iscas para ratos", sair: "Não", volta: "Na hora" },
  { metodo: "Injeção em madeira (cupim)", sair: "Não", volta: "Na hora" },
  { metodo: "Pulverização (aranhas e áreas externas)", sair: "Sim", volta: "Depois da secagem, em geral de 2 a 4 horas" },
];

export const faqGeral = [
  { q: "O orçamento é grátis?", a: "Sim. Você manda uma foto ou descreve o problema no WhatsApp e respondemos com o valor. Quando precisa de vistoria, ela também é grátis." },
  { q: "Tenho cachorro e gato. Tem problema?", a: "Não. Gel e porta-iscas ficam fora do alcance deles. Quando há pulverização, os animais saem junto com a família e voltam depois da secagem." },
  { q: "Os produtos têm cheiro forte?", a: "Os produtos que usamos são de baixo odor. O gel para baratas não tem cheiro nenhum." },
  { q: "Como funciona a garantia?", a: "Se a praga tratada voltar dentro do prazo da garantia, fazemos o retorno sem custo." },
  { q: "Vocês emitem nota fiscal?", a: "Sim, para pessoa física e jurídica, junto com o comprovante de execução do serviço." },
];
