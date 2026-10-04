// Gera os arquivos do Google Ads (google-ads/*.csv e *.txt) e confere os limites de caracteres.
// Rode: npm run check:ads
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { site } from "../src/data/site.mjs";

const OUT = fileURLToPath(new URL("../google-ads/", import.meta.url));
const CAMPAIGN = `Pesquisa | Dedetização | ${site.city}`;
const url = (p = "") => `${site.url}/${p}`;

const groups = [
  {
    name: "Baratas",
    path: "baratas/",
    paths: ["dedetizacao", "baratas"],
    keywords: [
      "dedetização de baratas", "dedetização baratas", "dedetizadora de baratas", "dedetizar baratas",
      "empresa de dedetização de baratas", "dedetização barata alemã", "dedetização de baratas preço",
      `dedetização de baratas ${site.city.toLowerCase()}`,
    ],
    headlines: [
      "Dedetização de Baratas", "Baratas? Chame no WhatsApp", "Gel Sem Cheiro Para Baratas", "Não Precisa Sair de Casa",
      "Garantia de 90 Dias", "Orçamento Grátis Por Foto", `Atendemos ${site.city} e Região`, "Atendimento em Até 24 Horas",
      "Seguro p/ Crianças e Pets", "Produtos Com Registro no MS", "Fim da Barata Francesinha", "Baratas de Cozinha e Esgoto",
      `Dedetizadora em ${site.city}`, "Comprovante e Nota Fiscal", "Atendemos Também Sábados",
    ],
    descriptions: [
      "Gel sem cheiro nas frestas da cozinha. Você não sai de casa e as baratas somem em dias.",
      `Mande uma foto no WhatsApp e receba o orçamento na hora. Vistoria grátis em ${site.city}.`,
      "Garantia de 90 dias por escrito. Se as baratas voltarem, o retorno não tem custo.",
      "Empresa licenciada, com responsável técnico e produtos registrados no Ministério da Saúde.",
    ],
  },
  {
    name: "Ratos",
    path: "ratos/",
    paths: ["desratizacao", ""],
    keywords: [
      "desratização", "empresa de desratização", "dedetização de ratos", "controle de ratos",
      "desratização residencial", "rato no forro", "dedetizadora de ratos", `desratização ${site.city.toLowerCase()}`,
    ],
    headlines: [
      "Desratização em " + site.city, "Rato no Forro? Resolvemos", "Porta-Iscas Trancados", "Seguro p/ Crianças e Pets",
      "Vedação das Entradas", "Garantia de 90 Dias", "Orçamento Grátis no WhatsApp", "Atendimento em Até 24 Horas",
      "Ratazana, Rato e Camundongo", "Empresa Licenciada", "Monitoramento com Retornos", `Atendemos ${site.city} e Região`,
      "Comprovante e Nota Fiscal", "Atendemos Também Sábados", "Chame Agora no WhatsApp",
    ],
    descriptions: [
      "Iscas dentro de porta-iscas trancados com chave, longe de crianças e animais de estimação.",
      "Fechamos as entradas por onde os ratos passam e voltamos para confirmar o resultado.",
      `Orçamento pelo WhatsApp em minutos. Atendemos ${site.city} e Região Metropolitana.`,
      "Garantia de 90 dias por escrito, comprovante do serviço e nota fiscal.",
    ],
  },
  {
    name: "Cupins",
    path: "cupins/",
    paths: ["descupinizacao", ""],
    keywords: [
      "descupinização", "dedetização de cupim", "dedetização de cupins", "tratamento de cupim",
      "empresa de descupinização", "cupim em móveis", "cupim de madeira", `descupinização ${site.city.toLowerCase()}`,
    ],
    headlines: [
      "Descupinização em " + site.city, "Cupim no Móvel? Tratamos", "Sem Desmontar o Móvel", "Cupim de Madeira e de Solo",
      "Portas, Rodapés e Telhados", "Orçamento Grátis por Foto", "Garantia Por Escrito", "Atendimento em Até 24 Horas",
      "Viu Revoada de Aleluias?", "Empresa Licenciada", "Vistoria Grátis", `Atendemos ${site.city} e Região`,
      "Chame Agora no WhatsApp", "Comprovante e Nota Fiscal", "Proteja o Seu Telhado",
    ],
    descriptions: [
      "Injeção de cupinicida dentro da madeira, sem desmontar o móvel e sem sujeira.",
      "Pozinho embaixo do móvel ou revoada de aleluias? Mande uma foto e receba o orçamento.",
      "Tratamos cupim de madeira seca e cupim de solo em casas, apartamentos e empresas.",
      `Vistoria grátis em ${site.city} e região. Garantia por escrito e nota fiscal.`,
    ],
  },
  {
    name: "Aranha-marrom",
    path: "aranha-marrom/",
    paths: ["aranha-marrom", ""],
    keywords: [
      "dedetização aranha marrom", "controle de aranha marrom", "dedetização de aranhas", "dedetizadora aranha marrom",
      "aranha marrom em casa", "dedetização contra aranha", `dedetização aranha marrom ${site.city.toLowerCase()}`,
    ],
    headlines: [
      "Controle de Aranha-Marrom", "Dedetização de Aranhas", "Rodapés, Forros e Frestas", "Retirada de Teias e Ovos",
      "Orientação Contra Picadas", "Orçamento Grátis no WhatsApp", `Dedetizadora em ${site.city}`, "Atendimento em Até 24 Horas",
      "Empresa Licenciada", "Garantia Por Escrito", "Manutenção a Cada 6 Meses", "Chame Agora no WhatsApp",
      `Atendemos ${site.city} e Região`, "Comprovante e Nota Fiscal", "Vistoria Grátis",
    ],
    descriptions: [
      "Aplicação em rodapés, forros e frestas, retirada de teias e orientação contra picadas.",
      `${site.city} tem muita aranha-marrom. Tratamos os esconderijos dentro e fora da casa.`,
      "Mande uma foto no WhatsApp e receba o orçamento na hora. Vistoria grátis.",
      "Empresa licenciada, com responsável técnico e produtos registrados no Ministério da Saúde.",
    ],
  },
  {
    name: "Geral",
    path: "",
    paths: ["dedetizacao", ""],
    keywords: [
      "dedetização", "dedetizadora", `dedetização ${site.city.toLowerCase()}`, `dedetizadora ${site.city.toLowerCase()}`,
      "dedetizadora perto de mim", "empresa de dedetização", "dedetização residencial", "controle de pragas",
      "dedetização preço", "dedetização apartamento",
    ],
    headlines: [
      `Dedetizadora em ${site.city}`, "Dedetização Residencial", "Orçamento Grátis no WhatsApp", "Baratas, Ratos e Cupins",
      "Garantia de 90 Dias", "Seguro p/ Crianças e Pets", "Atendimento em Até 24 Horas", "Produtos de Baixo Odor",
      "Empresa Licenciada", `Atendemos ${site.city} e Região`, "Orçamento Grátis Por Foto", "Comprovante e Nota Fiscal",
      "Atendemos Também Sábados", "Chame Agora no WhatsApp", "Vistoria Grátis",
    ],
    descriptions: [
      "Baratas, ratos, cupins e aranha-marrom. Mande uma foto e receba o orçamento na hora.",
      "Na maioria dos serviços você não precisa sair de casa. Seguro para crianças e pets.",
      `Atendemos ${site.city} e Região Metropolitana em até 24 horas, inclusive aos sábados.`,
      "Garantia de 90 dias por escrito, comprovante do serviço e nota fiscal.",
    ],
  },
  {
    name: "Empresas",
    path: "empresas/",
    paths: ["empresas", ""],
    keywords: [
      "controle integrado de pragas", "dedetização para restaurante", "controle de pragas restaurante",
      "dedetização condomínio", "certificado de dedetização", "dedetização comercial",
      "empresa de controle de pragas", "dedetização para empresas",
    ],
    headlines: [
      "Controle de Pragas p/ Empresa", "Comprovante p/ a Vigilância", "Contrato Mensal de Visitas", "Restaurantes e Condomínios",
      "Visitas Fora do Expediente", "Relatório a Cada Visita", "Visita Técnica Grátis", "Empresa Licenciada",
      "Responsável Técnico", "Atendimento Extra Sem Custo", `Atendemos ${site.city} e Região`, "Chame Agora no WhatsApp",
      "Clínicas, Escolas e Creches", "Nota Fiscal Para Empresa", "Passe na Fiscalização",
    ],
    descriptions: [
      "Contrato mensal, relatório a cada visita e o comprovante que a Vigilância Sanitária pede.",
      "Visitas fora do seu horário de funcionamento. Sua operação não para.",
      "Restaurantes, padarias, condomínios, clínicas e escolas. Visita técnica gratuita.",
      "Empresa licenciada, com responsável técnico e produtos registrados no Ministério da Saúde.",
    ],
  },
];

const negatives = [
  "como fazer", "caseiro", "caseira", "receita", "vinagre", "bicarbonato", "remédio", "veneno", "comprar",
  "mercado livre", "shopee", "amazon", "magazine", "preço do veneno", "ultrassônico", "repelente", "armadilha", "ratoeira",
  "curso", "apostila", "vaga", "vagas", "emprego", "salário", "trabalhe conosco", "franquia", "como abrir",
  "licitação", "pdf", "fispq", "bula", "o que é", "significado", "sonhar", "sonho", "desenho", "jogo", "música", "filme",
  "prefeitura", "zoonoses", "picada", "picou", "sintomas", "tratamento da picada", "grátis prefeitura",
];

const sitelinks = [
  { text: "Dedetização de Baratas", d1: "Gel sem cheiro, sem sair de casa", d2: "Garantia de 90 dias", url: url("baratas/") },
  { text: "Desratização", d1: "Porta-iscas trancados com chave", d2: "Vedação das entradas", url: url("ratos/") },
  { text: "Descupinização", d1: "Móveis, portas e telhados", d2: "Cupim de madeira e de solo", url: url("cupins/") },
  { text: "Aranha-Marrom", d1: "Rodapés, forros e frestas", d2: "Orientação contra picadas", url: url("aranha-marrom/") },
  { text: "Empresas e Condomínios", d1: "Comprovante para a Vigilância", d2: "Contrato com visitas mensais", url: url("empresas/") },
];
const callouts = [
  "Orçamento Grátis", "Garantia de 90 Dias", "Atendimento em 24h", "Produtos de Baixo Odor",
  "Seguro Para Pets", "Nota Fiscal", "Atendemos aos Sábados", "Empresa Licenciada",
];
const snippets = { header: "Serviços", values: ["Dedetização", "Desratização", "Descupinização", "Controle de Aranhas", "Desinsetização", "Contrato Para Empresas"] };

/* ---------- Validação ---------- */
const errors = [];
const check = (label, s, max) => { if ([...s].length > max) errors.push(`${label} tem ${[...s].length}/${max}: "${s}"`); };
for (const g of groups) {
  if (g.headlines.length < 3 || g.headlines.length > 15) errors.push(`${g.name}: precisa de 3 a 15 títulos`);
  if (g.descriptions.length < 2 || g.descriptions.length > 4) errors.push(`${g.name}: precisa de 2 a 4 descrições`);
  g.headlines.forEach((h, i) => check(`${g.name} título ${i + 1}`, h, 30));
  g.descriptions.forEach((d, i) => check(`${g.name} descrição ${i + 1}`, d, 90));
  g.paths.forEach((p, i) => check(`${g.name} caminho ${i + 1}`, p, 15));
  const dup = g.headlines.filter((h, i) => g.headlines.indexOf(h) !== i);
  if (dup.length) errors.push(`${g.name}: títulos repetidos ${dup.join(", ")}`);
  g.keywords.forEach((k) => { if (k.split(" ").length > 10 || k.length > 80) errors.push(`${g.name}: palavra-chave longa demais "${k}"`); });
}
sitelinks.forEach((s) => { check("Sitelink", s.text, 25); check("Sitelink linha 1", s.d1, 35); check("Sitelink linha 2", s.d2, 35); });
callouts.forEach((c) => check("Frase de destaque", c, 25));
snippets.values.forEach((v) => check("Snippet", v, 25));

if (errors.length) {
  console.error("Erros:\n- " + errors.join("\n- "));
  process.exit(1);
}

/* ---------- Arquivos ---------- */
const csv = (rows) => rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n") + "\r\n";
await mkdir(OUT, { recursive: true });

const kwRows = [["Campaign", "Ad group", "Keyword", "Criterion Type", "Final URL"]];
for (const g of groups) for (const k of g.keywords) for (const t of ["Exact", "Phrase"]) kwRows.push([CAMPAIGN, g.name, k, t, url(g.path)]);
await writeFile(OUT + "palavras-chave.csv", "﻿" + csv(kwRows));

const adHead = ["Campaign", "Ad group", ...Array.from({ length: 15 }, (_, i) => `Headline ${i + 1}`), ...Array.from({ length: 4 }, (_, i) => `Description ${i + 1}`), "Path 1", "Path 2", "Final URL"];
const adRows = [adHead];
for (const g of groups) {
  const hs = [...g.headlines, ...Array(15 - g.headlines.length).fill("")];
  const ds = [...g.descriptions, ...Array(4 - g.descriptions.length).fill("")];
  adRows.push([CAMPAIGN, g.name, ...hs, ...ds, g.paths[0], g.paths[1], url(g.path)]);
}
await writeFile(OUT + "anuncios-rsa.csv", "﻿" + csv(adRows));

const negRows = [["Campaign", "Keyword", "Criterion Type"]];
for (const n of negatives) negRows.push([CAMPAIGN, n, "Negative Phrase"]);
await writeFile(OUT + "negativas.csv", "﻿" + csv(negRows));
await writeFile(OUT + "negativas.txt", negatives.map((n) => `"${n}"`).join("\r\n") + "\r\n");

const sl = [["Sitelink text", "Description line 1", "Description line 2", "Final URL"], ...sitelinks.map((s) => [s.text, s.d1, s.d2, s.url])];
await writeFile(OUT + "sitelinks.csv", "﻿" + csv(sl));
await writeFile(
  OUT + "extensoes.txt",
  `FRASES DE DESTAQUE (callouts)\r\n${callouts.join("\r\n")}\r\n\r\nSNIPPET ESTRUTURADO\r\nCabeçalho: ${snippets.header}\r\nValores: ${snippets.values.join(", ")}\r\n`
);

const total = groups.reduce((n, g) => n + g.keywords.length * 2, 0);
console.log(`OK: ${groups.length} grupos, ${total} palavras-chave (exata + frase), ${groups.length} anúncios RSA, ${negatives.length} negativas, ${sitelinks.length} sitelinks, ${callouts.length} frases de destaque.`);
