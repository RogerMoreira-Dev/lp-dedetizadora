// Gera o site estático em dist/. Sem dependências: `node build.mjs`
import { mkdir, writeFile, readFile, cp, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { site } from "./src/data/site.mjs";
import { pragas, empresas, reentrada, faqGeral } from "./src/data/pragas.mjs";
import {
  head, ribbon, header, footer, scripts, homeBody, pestBody, empresasBody, privacyBody, notFoundBody, plainCity,
} from "./src/templates.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "dist");

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, "src", "assets"), join(out, "assets"), { recursive: true });

const hash = async (rel) =>
  createHash("sha1").update(await readFile(join(root, "src", "assets", rel))).digest("hex").slice(0, 8);
const assets = {
  css: await hash("css/style.css"),
  main: await hash("js/main.js"),
  tracking: await hash("js/tracking.js"),
  shader: await hash("js/shader.js"),
};

const pages = [];

async function page({ path, title, description, body, faq = [], isHome = false, prefix, bodyClass = "" }) {
  const html = `${head({ title, description, path, prefix, assets, faq })}
<body class="${bodyClass}">
${ribbon()}
${header({ prefix, isHome })}
<main>
${body}
</main>
${footer({ prefix })}
${scripts(prefix, assets)}
</body>
</html>
`;
  const file = path ? join(out, path, "index.html") : join(out, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  pages.push(path);
}

// Página inicial
await page({
  path: "",
  prefix: "./",
  isHome: true,
  title: `Dedetização em ${site.city} | ${site.fullName}`,
  description: `Dedetização de baratas, ratos, cupins e aranha-marrom em ${site.city} e região. Orçamento grátis pelo WhatsApp e garantia de ${site.guaranteeDays} dias.`,
  body: homeBody({ pragas, empresas, reentrada, faqGeral, prefix: "./" }),
  faq: faqGeral,
});

// Uma página por praga (grupos de anúncios)
for (const p of pragas) {
  const { html, faq } = pestBody(p, { faqGeral });
  await page({ path: `${p.slug}/`, prefix: "../", title: plainCity(p.title), description: p.description, body: html, faq, bodyClass: "lp" });
}

// Empresas
{
  const { html, faq } = empresasBody(empresas, { faqGeral });
  await page({ path: `${empresas.slug}/`, prefix: "../", title: empresas.title, description: empresas.description, body: html, faq, bodyClass: "lp" });
}

// Privacidade
await page({
  path: "privacidade/",
  prefix: "../",
  title: `Política de privacidade | ${site.fullName}`,
  description: `Como o site da ${site.fullName} trata dados e cookies.`,
  body: privacyBody(),
  bodyClass: "lp plain",
});

// 404 (o GitHub Pages serve este arquivo em qualquer profundidade, então usa caminho absoluto)
{
  const base = new URL(site.url).pathname.replace(/\/?$/, "/");
  const html = `${head({ title: `Página não encontrada | ${site.fullName}`, description: "Página não encontrada.", path: "404.html", prefix: base, assets })}
<body class="lp plain">
${ribbon()}
${header({ prefix: base, isHome: false })}
<main>${notFoundBody(base)}</main>
${footer({ prefix: base })}
${scripts(base, assets)}
</body>
</html>
`;
  await writeFile(join(out, "404.html"), html);
}

// robots.txt e sitemap.xml
await writeFile(
  join(out, "robots.txt"),
  site.demo ? `User-agent: *\nDisallow:\n\n# Página demonstrativa: as páginas usam meta robots noindex.\n` : `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`
);
const today = new Date().toISOString().slice(0, 10);
await writeFile(
  join(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((p) => `  <url><loc>${site.url}/${p}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`
);
await writeFile(join(out, ".nojekyll"), "");

console.log(`Gerado em dist/: ${pages.length} páginas + 404, robots.txt, sitemap.xml`);
