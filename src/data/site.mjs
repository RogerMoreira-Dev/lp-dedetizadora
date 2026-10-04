// Configuração única do site. Para usar com um cliente real, troque os campos
// marcados com "TROQUE" e rode `npm run build`.

export const site = {
  // Marca
  name: "Muro",
  fullName: "Muro Controle de Pragas",
  tagline: "Controle de pragas em Curitiba",
  // TROQUE: CNPJ e endereço reais aparecem no rodapé (o Google Ads valoriza transparência).
  cnpj: "00.000.000/0001-00",
  address: "Curitiba, PR",
  hours: "Segunda a sábado, das 7h às 20h",
  technician: "Responsável técnico: nome e registro no conselho",

  // Cidade padrão. Pode ser trocada pela URL: ?cidade=Pinhais
  city: "Curitiba",

  // TROQUE: WhatsApp só com números, com 55 + DDD. Vazio = modo demonstração
  // (o botão abre o WhatsApp com a mensagem pronta e o usuário escolhe o contato).
  whatsapp: "",
  // TROQUE: telefone fixo/celular para o botão "Ligar". Vazio = modo demonstração.
  phone: "",
  phoneDisplay: "",

  // Endereço público do site, sem barra no final (usado em canonical, OG e sitemap).
  url: "https://rogermoreira-dev.github.io/lp-dedetizadora",

  // Página de portfólio: mostra a faixa de aviso e pede para o Google não indexar.
  demo: true,

  // Google Ads e GA4. Deixe vazio para não carregar nenhum script de rastreamento.
  tracking: {
    googleAdsId: "",            // ex.: "AW-123456789"
    conversionLabels: {
      whatsapp: "",             // ex.: "AbCdEfGhIjk"  (conversão "Clique no WhatsApp")
      phone: "",                // ex.: "LmNoPqRsTuv"  (conversão "Clique para ligar")
    },
    ga4Id: "",                  // ex.: "G-XXXXXXXXXX"
  },

  guaranteeDays: 90,

  bairros: [
    "Água Verde", "Batel", "Bigorrilho", "Centro", "Portão", "Cabral", "Juvevê",
    "Mercês", "Bacacheri", "Boa Vista", "Santa Felicidade", "Rebouças", "Hauer",
    "Boqueirão", "Xaxim", "Cajuru", "Uberaba", "Pinheirinho", "Sítio Cercado", "CIC",
  ],
  regiao: [
    "São José dos Pinhais", "Pinhais", "Colombo", "Araucária",
    "Almirante Tamandaré", "Fazenda Rio Grande", "Campo Largo",
  ],
};
