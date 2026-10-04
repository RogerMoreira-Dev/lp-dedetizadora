// Servidor local simples para ver dist/ em http://localhost:4173/lp-dedetizadora/
// (mesmo caminho do GitHub Pages, para os links relativos e a 404 funcionarem igual)
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const BASE = "/lp-dedetizadora";
const PORT = Number(process.env.PORT) || 4173;
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".xml": "application/xml", ".txt": "text/plain", ".json": "application/json" };

createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path === "/" ) { res.writeHead(302, { Location: BASE + "/" }); return res.end(); }
  if (!path.startsWith(BASE)) return send404(res);
  path = path.slice(BASE.length) || "/";
  let file = normalize(join(dist, path));
  if (!file.startsWith(normalize(dist))) return send404(res);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    send404(res);
  }
}).listen(PORT, () => console.log(`http://localhost:${PORT}${BASE}/`));

async function send404(res) {
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  res.end(await readFile(join(dist, "404.html")).catch(() => "404"));
}
