import { icon, pests } from "./icons.mjs";
import { site } from "./data/site.mjs";

export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Troca {cidade} por um span que o JavaScript pode reescrever com ?cidade=
const city = (s) => esc(s).replace(/\{cidade\}/g, `<span data-city>${esc(site.city)}</span>`);
const plainCity = (s) => s.replace(/\{cidade\}/g, site.city);

const QUIZ_PRAGAS = ["Baratas", "Ratos", "Cupins", "Aranha-marrom", "Outra / não sei"];
const QUIZ_LOCAL = ["Casa", "Apartamento", "Comércio", "Condomínio"];

/* ---------- Peças comuns ---------- */

export function head({ title, description, path, prefix, assets, faq = [] }) {
  const url = `${site.url}/${path}`;
  const publicSite = {
    name: site.fullName,
    city: site.city,
    whatsapp: site.whatsapp,
    phone: site.phone,
    demo: site.demo,
    tracking: site.tracking,
  };
  const ld = [];
  if (faq.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }
  if (!site.demo) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: site.fullName,
      url: site.url,
      telephone: site.phone || undefined,
      address: site.address,
      areaServed: [site.city, ...site.regiao],
      openingHours: "Mo-Sa 07:00-20:00",
    });
  }
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${site.demo ? `<meta name="robots" content="noindex, nofollow">\n` : ""}<link rel="canonical" href="${esc(url)}">
<meta name="theme-color" content="#090b08">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${esc(site.fullName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(site.url)}/assets/img/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${prefix}assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="${prefix}assets/css/style.css?v=${assets.css}">
<script>window.SITE=${JSON.stringify(publicSite)}</script>
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n")}
</head>`;
}

export const ribbon = () =>
  site.demo
    ? `<div class="ribbon">Página demonstrativa de portfólio. A empresa, os depoimentos e os dados de contato são fictícios.</div>`
    : "";

export function header({ prefix, isHome }) {
  const brand = `${icon.logo(22)}<span>${esc(site.name)}</span>`;
  return `<header class="top" data-top>
  <div class="wrap top-in">
    ${isHome ? `<a class="brand" href="#top" aria-label="${esc(site.fullName)}, início">${brand}</a>` : `<span class="brand">${brand}</span>`}
    ${
      isHome
        ? `<nav class="top-nav" aria-label="Seções">
      <a href="#pragas">Pragas</a>
      <a href="#como-funciona">Como funciona</a>
      <a href="#duvidas">Dúvidas</a>
    </nav>`
        : `<p class="top-note">${icon.clock(16)} ${esc(site.hours)}</p>`
    }
    <a class="btn btn-outline btn-sm" href="#" data-wa data-convert="whatsapp">${icon.whatsapp(18)}<span>Chamar no WhatsApp</span></a>
  </div>
</header>`;
}

export function quote({ preset = "", local = "" } = {}) {
  const chips = (name, list, checked) =>
    list
      .map(
        (v, i) =>
          `<label class="chip"><input type="radio" name="${name}" value="${esc(v)}"${v === checked ? " checked" : ""} id="q-${name}-${i}"><span>${esc(v)}</span></label>`
      )
      .join("");
  return `<form class="quote" data-quote novalidate>
  <h2 class="quote-title">Orçamento em 30 segundos</h2>
  <fieldset>
    <legend>Qual é a praga?</legend>
    <div class="chips">${chips("praga", QUIZ_PRAGAS, preset)}</div>
  </fieldset>
  <fieldset>
    <legend>Onde?</legend>
    <div class="chips">${chips("local", QUIZ_LOCAL, local)}</div>
  </fieldset>
  <label class="field" for="q-bairro"><span>Bairro ou cidade</span>
    <input id="q-bairro" name="bairro" type="text" autocomplete="address-level3" maxlength="40" placeholder="Ex.: Água Verde">
  </label>
  <div class="bubble-wrap">
    <p class="bubble-label">Mensagem que vai para o WhatsApp</p>
    <p class="bubble" data-preview aria-live="polite"></p>
  </div>
  <button class="btn btn-lime btn-block" type="submit">${icon.whatsapp(20)}<span>Enviar no WhatsApp</span></button>
  <p class="quote-note">Resposta em poucos minutos, ${esc(site.hours.toLowerCase())}.</p>
</form>`;
}

const ctas = () => `<div class="cta-row">
  <a class="btn btn-lime btn-lg" href="#" data-wa data-convert="whatsapp">${icon.whatsapp(22)}<span>Chamar no WhatsApp</span></a>
  <a class="btn btn-ghost btn-lg" href="#" data-tel data-convert="phone">${icon.phone(20)}<span>Ligar agora</span></a>
</div>`;

const trust = (points) =>
  `<ul class="trust">${points.map((p) => `<li>${icon.check(18)}<span>${esc(p)}</span></li>`).join("")}</ul>`;

function hero({ h1, lead, points, preset, local, kicker }) {
  return `<section class="hero" id="top">
  <canvas class="hero-canvas" data-shader aria-hidden="true"></canvas>
  <div class="wrap hero-in">
    <div class="hero-copy">
      ${kicker ? `<p class="kicker">${kicker}</p>` : ""}
      <h1>${h1}</h1>
      <p class="lead">${lead}</p>
      ${ctas()}
      ${trust(points)}
    </div>
    ${quote({ preset, local })}
  </div>
</section>`;
}

const faqBlock = (items, title = "Dúvidas frequentes") => `<section class="sec light" id="duvidas">
  <div class="wrap faq-grid">
    <div class="sec-head">
      <h2>${esc(title)}</h2>
      <p>Não achou a sua dúvida? Pergunte no WhatsApp, respondemos na hora.</p>
      <a class="btn btn-dark" href="#" data-wa data-convert="whatsapp">${icon.whatsapp(20)}<span>Perguntar no WhatsApp</span></a>
    </div>
    <div class="faq">
      ${items
        .map(
          (f, i) =>
            `<details${i === 0 ? " open" : ""}><summary>${esc(f.q)}<span class="plus" aria-hidden="true"></span></summary><p>${esc(f.a)}</p></details>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>`;

const finalCta = (text = "Mande uma foto da praga e receba o orçamento hoje.") => `<section class="final">
  <div class="wrap final-in">
    <h2>${esc(text)}</h2>
    ${ctas()}
  </div>
</section>`;

const certificate = (rows) => `<figure class="cert" aria-label="Exemplo de comprovante de execução do serviço">
  <div class="cert-top">${icon.logo(18)}<span>Comprovante de execução de serviço</span></div>
  <dl>
    ${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("\n    ")}
  </dl>
  <figcaption>Entregue ao final de cada serviço, junto com a nota fiscal.</figcaption>
</figure>`;

const CERT_DEFAULT = [
  ["Serviço", "Desinsetização residencial"],
  ["Produto e princípio ativo", "Gel inseticida, conforme a aplicação"],
  ["Registro no Ministério da Saúde", "Nº do registro de cada produto"],
  ["Responsável técnico", "Nome e conselho de classe"],
  ["Garantia", "90 dias a partir da aplicação"],
];

const guarantee = () => `<section class="sec light">
  <div class="wrap split">
    <div class="sec-head">
      <h2>Tudo por escrito</h2>
      <p>No fim do serviço você recebe o comprovante de execução com os produtos usados, o registro de cada um no Ministério da Saúde e o prazo da garantia. Se a praga voltar dentro do prazo, o retorno não tem custo.</p>
      <ul class="facts">
        <li>${icon.shield(22)}<div><strong>Licença sanitária e responsável técnico</strong><span>Exigências da Anvisa para empresas de controle de pragas.</span></div></li>
        <li>${icon.doc(22)}<div><strong>Produtos registrados</strong><span>Só usamos produtos com registro no Ministério da Saúde.</span></div></li>
        <li>${icon.clock(22)}<div><strong>Garantia de ${site.guaranteeDays} dias</strong><span>Retorno grátis se a praga tratada voltar.</span></div></li>
      </ul>
    </div>
    ${certificate(CERT_DEFAULT)}
  </div>
</section>`;

const steps = (list, title, intro) => `<section class="sec dark" id="como-funciona">
  <div class="wrap">
    <div class="sec-head">
      <h2>${esc(title)}</h2>
      ${intro ? `<p>${esc(intro)}</p>` : ""}
    </div>
    <ol class="steps">
      ${list.map((s) => `<li><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></li>`).join("\n      ")}
    </ol>
  </div>
</section>`;

export function footer({ prefix }) {
  return `<footer class="foot">
  <div class="wrap foot-in">
    <div class="foot-brand">${icon.logo(20)}<strong>${esc(site.fullName)}</strong></div>
    <div class="foot-info">
      <p>CNPJ ${esc(site.cnpj)} · ${esc(site.address)}</p>
      <p>${esc(site.hours)}</p>
      <p>${esc(site.technician)}</p>
    </div>
    <div class="foot-links">
      <a href="${prefix}privacidade/">Política de privacidade</a>
      <p>© <span data-year>2026</span> ${esc(site.fullName)}${site.demo ? " (empresa fictícia)" : ""}</p>
    </div>
  </div>
</footer>
<div class="mbar" data-mbar>
  <a class="btn btn-lime" href="#" data-wa data-convert="whatsapp">${icon.whatsapp(20)}<span>WhatsApp</span></a>
  <a class="btn btn-ghost" href="#" data-tel data-convert="phone">${icon.phone(18)}<span>Ligar</span></a>
</div>
<div class="toast" role="status" aria-live="polite" data-toast hidden></div>`;
}

export const scripts = (prefix, assets) => `<script src="${prefix}assets/js/tracking.js?v=${assets.tracking}" defer></script>
<script src="${prefix}assets/js/main.js?v=${assets.main}" defer></script>
<script src="${prefix}assets/js/shader.js?v=${assets.shader}" defer></script>`;

/* ---------- Página inicial ---------- */

export function homeBody({ pragas, empresas, reentrada, faqGeral, prefix }) {
  const cards = pragas
    .map(
      (p) => `<a class="pcard" href="${prefix}${p.slug}/">
        <div class="pcard-copy"><h3>${esc(p.label)}</h3><p>${esc(p.heroPoints[0])}</p></div>
        <div class="pcard-art">${pests[p.slug]}</div>
        <span class="pcard-go" aria-hidden="true">${icon.arrow(20)}</span>
      </a>`
    )
    .join("\n      ");

  const reviews = [
    { q: "Tinha barata-alemã no armário da cozinha havia meses. Aplicaram o gel numa terça e no sábado não vi mais nenhuma.", who: "Cliente no Água Verde" },
    { q: "Barulho no forro toda noite. Colocaram os porta-iscas trancados e fecharam duas entradas no telhado. Acabou em duas semanas.", who: "Cliente em Pinhais" },
    { q: "O comprovante saiu no mesmo dia e passamos na vistoria da Vigilância Sanitária sem nenhum apontamento.", who: "Restaurante no Batel" },
  ];

  return `${hero({
    h1: `Sua casa livre de baratas, ratos e cupins<span class="dot">.</span>`,
    lead: `Dedetização em <span data-city>${esc(site.city)}</span> e região com produtos de baixo odor, orçamento pelo WhatsApp e garantia de ${site.guaranteeDays} dias.`,
    points: ["Orçamento grátis com uma foto", "Seguro para crianças e pets", `Garantia de ${site.guaranteeDays} dias por escrito`],
  })}

<section class="sec light grid-bg" id="pragas">
  <div class="wrap">
    <div class="sec-head">
      <h2>Qual praga está te incomodando?</h2>
      <p>Cada praga tem um tratamento diferente. Escolha a sua para ver como resolvemos.</p>
    </div>
    <div class="pcards">
      ${cards}
      <a class="pcard pcard-wide" href="${prefix}${empresas.slug}/">
        <div class="pcard-copy"><h3>${esc(empresas.label)}</h3><p>Contrato mensal com comprovante para a Vigilância Sanitária.</p></div>
        <div class="pcard-art">${pests.empresas}</div>
        <span class="pcard-go" aria-hidden="true">${icon.arrow(20)}</span>
      </a>
    </div>
  </div>
</section>

${steps(
  [
    { t: "Você chama no WhatsApp", d: "Mande uma foto da praga ou conte o que está acontecendo." },
    { t: "Orçamento na hora", d: "Respondemos com o valor. Quando precisa, a vistoria é grátis." },
    { t: "Aplicação agendada", d: "No dia e horário que for melhor para você, inclusive sábado." },
    { t: "Comprovante e garantia", d: `Você recebe o comprovante do serviço e ${site.guaranteeDays} dias de garantia.` },
  ],
  "Como funciona",
  "Do primeiro contato até a garantia, sem precisar sair de casa para resolver nada."
)}

<section class="sec light">
  <div class="wrap split">
    <div class="sec-head">
      <h2>Precisa sair de casa?</h2>
      <p>Na maioria dos serviços, não. Veja o que acontece em cada um. Animais de estimação seguem a mesma regra da família.</p>
    </div>
    <div class="table-wrap">
      <table class="reentry">
        <thead><tr><th scope="col">Serviço</th><th scope="col">Precisa sair?</th><th scope="col">Quando pode voltar</th></tr></thead>
        <tbody>
          ${reentrada
            .map(
              (r) =>
                `<tr><th scope="row">${esc(r.metodo)}</th><td><span class="pill ${r.sair === "Não" ? "pill-ok" : "pill-warn"}">${esc(r.sair)}</span></td><td>${esc(r.volta)}</td></tr>`
            )
            .join("\n          ")}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="sec dark">
  <div class="wrap">
    <div class="sec-head">
      <h2>Atendemos <span data-city>${esc(site.city)}</span> e região</h2>
      <p>Chegamos em até 24 horas nos bairros abaixo e na Região Metropolitana.</p>
    </div>
    <ul class="tags">
      ${[...site.bairros, ...site.regiao].map((b) => `<li>${esc(b)}</li>`).join("")}
    </ul>
  </div>
</section>

${guarantee()}

<section class="sec dark">
  <div class="wrap">
    <div class="sec-head">
      <h2>Quem já chamou</h2>
      <p class="note">Exemplo de seção. Na página de um cliente real, aqui entram as avaliações do Google Meu Negócio.</p>
    </div>
    <div class="reviews">
      ${reviews
        .map((r) => `<figure class="review"><blockquote>${esc(r.q)}</blockquote><figcaption>${esc(r.who)}</figcaption></figure>`)
        .join("\n      ")}
    </div>
  </div>
</section>

${faqBlock(faqGeral)}

${finalCta()}`;
}

/* ---------- Páginas de praga (uma por grupo de anúncios) ---------- */

export function pestBody(p, { faqGeral }) {
  const faq = [...p.faq, ...faqGeral.slice(0, 3)];
  return {
    faq,
    html: `${hero({
      h1: city(p.h1),
      lead: esc(p.lead),
      points: p.heroPoints,
      preset: p.quiz,
    })}

<section class="sec light grid-bg">
  <div class="wrap">
    <div class="sec-head">
      <h2>${esc(p.speciesTitle)}</h2>
      <p>Identificar a espécie é o que define o tratamento certo. Na dúvida, mande uma foto no WhatsApp.</p>
    </div>
    <div class="species${p.species.length === 1 ? " species-one" : ""}${p.species.length === 3 ? " species-three" : ""}">
      ${p.species
        .map(
          (s) => `<article class="sp">
        <div class="sp-art">${pests[p.slug]}</div>
        <h3>${esc(s.name)}</h3>
        <p class="sci">${esc(s.sci)}</p>
        <p>${esc(s.text)}</p>
      </article>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>

<section class="sec dark">
  <div class="wrap split">
    <div class="sec-head">
      <h2>${esc(p.signsTitle)}</h2>
      <p>Viu um desses sinais? Fotografe e mande para a gente. O orçamento sai pela foto.</p>
      <a class="btn btn-lime" href="#" data-wa data-convert="whatsapp">${icon.whatsapp(20)}<span>Mandar foto no WhatsApp</span></a>
    </div>
    <ul class="signs">
      ${p.signs.map((s) => `<li>${icon.check(20)}<span>${esc(s)}</span></li>`).join("\n      ")}
    </ul>
  </div>
</section>

<section class="sec light">
  <div class="wrap">
    <div class="sec-head">
      <h2>Como tratamos</h2>
    </div>
    <ol class="steps steps-light">
      ${p.method.map((s) => `<li><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></li>`).join("\n      ")}
    </ol>
  </div>
</section>

<section class="sec dark">
  <div class="wrap split">
    <div class="sec-head">
      <h2>Precisa sair de casa?</h2>
      <p class="answer">${esc(p.safety.leave)}.</p>
      <p>${esc(p.safety.text)}</p>
    </div>
    ${
      p.alert
        ? `<aside class="alert">${icon.alert(26)}<div><h3>${esc(p.alert.title)}</h3><p>${esc(p.alert.text)}</p></div></aside>`
        : `<aside class="alert alert-calm">${icon.shield(26)}<div><h3>Crianças e animais</h3><p>Os produtos ficam fora do alcance deles. O técnico explica tudo antes de começar e deixa as orientações por escrito.</p></div></aside>`
    }
  </div>
</section>

${guarantee()}

${faqBlock(faq)}

${finalCta()}`,
  };
}

/* ---------- Empresas ---------- */

export function empresasBody(e, { faqGeral }) {
  const faq = [...e.faq, faqGeral[4]];
  return {
    faq,
    html: `${hero({
      h1: city(e.h1),
      lead: esc(e.lead),
      points: e.heroPoints,
      preset: "",
      local: "Comércio",
    })}

<section class="sec light grid-bg">
  <div class="wrap">
    <div class="sec-head">
      <h2>Para quem atendemos</h2>
      <p>Cada segmento tem exigências e horários diferentes. O plano de visitas é montado para a sua operação.</p>
    </div>
    <div class="segments">
      ${e.segments.map((s) => `<article class="seg"><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></article>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="sec dark">
  <div class="wrap split">
    <div class="sec-head">
      <h2>O comprovante que a fiscalização pede</h2>
      <p>A cada visita você recebe o comprovante de execução com as informações que a norma da Anvisa exige das empresas de controle de pragas. É o documento que fica na pasta para a vistoria da Vigilância Sanitária.</p>
    </div>
    ${certificate(e.certificate)}
  </div>
</section>

${steps(
  [
    { t: "Visita técnica", d: "Levantamento das áreas, pragas presentes e pontos de risco." },
    { t: "Plano e contrato", d: "Frequência das visitas, mapa de porta-iscas e produtos definidos." },
    { t: "Visitas programadas", d: "Fora do seu horário de funcionamento, com relatório a cada visita." },
    { t: "Atendimento extra", d: "Se aparecer praga entre as visitas, voltamos sem custo adicional." },
  ],
  "Como funciona o contrato",
  ""
)}

${faqBlock(faq)}

${finalCta("Peça uma visita técnica gratuita para a sua empresa.")}`,
  };
}

export const privacyBody = () => `<section class="sec light legal">
  <div class="wrap narrow">
    <h1>Política de privacidade</h1>
    <p>${esc(site.fullName)}${site.demo ? " é uma empresa fictícia criada para demonstração. Este texto é um modelo." : "."}</p>
    <h2>Quais dados coletamos</h2>
    <p>Este site não tem formulário que grave dados. Quando você clica em "Enviar no WhatsApp", a mensagem é montada no seu próprio aparelho e enviada pelo WhatsApp, onde a conversa segue com a nossa equipe.</p>
    <h2>Cookies e anúncios</h2>
    <p>Usamos cookies do Google Ads e do Google Analytics para saber quantas pessoas chegam pelos anúncios e quantas entram em contato. Esses dados são estatísticos e não identificam você pelo nome. Você pode recusar os cookies no aviso exibido no site ou nas configurações do navegador.</p>
    <h2>Seus direitos</h2>
    <p>Pela Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo nosso WhatsApp.</p>
    <p><a class="btn btn-dark" href="../">Voltar ao site</a></p>
  </div>
</section>`;

export const notFoundBody = (prefix) => `<section class="sec light legal">
  <div class="wrap narrow">
    <h1>Página não encontrada</h1>
    <p>O endereço pode ter mudado. Volte para a página inicial ou chame direto no WhatsApp.</p>
    <p class="cta-inline"><a class="btn btn-dark" href="${prefix}">Ir para a página inicial</a> <a class="btn btn-lime" href="#" data-wa data-convert="whatsapp">${icon.whatsapp(20)}<span>Chamar no WhatsApp</span></a></p>
  </div>
</section>`;

export { plainCity };
