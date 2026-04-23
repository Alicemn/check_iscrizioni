const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "127.0.0.1";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const requiredEnv = [
  ["SUPABASE_URL", SUPABASE_URL],
  ["SUPABASE_KEY", SUPABASE_KEY]
].filter(([, value]) => !value);

if (requiredEnv.length > 0) {
  const missing = requiredEnv.map(([name]) => name).join(", ");
  throw new Error(`Variabili mancanti nel file .env: ${missing}`);
}

const indexPath = path.join(__dirname, "index.html");

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(payload));
}

function sendHtml(res, html) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

async function fetchRegistrationCount() {
  const url = new URL("/rest/v1/registrations", SUPABASE_URL);
  url.searchParams.set("select", "created_at");

  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload.message || payload.error || "Errore Supabase";
    throw new Error(message);
  }

  return Array.isArray(payload) ? payload.length : 0;
}

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "GET" && requestUrl.pathname === "/") {
      const html = fs.readFileSync(indexPath, "utf8");
      sendHtml(res, html);
      return;
    }

    if (req.method === "GET" && requestUrl.pathname === "/api/registrations/count") {
      const count = await fetchRegistrationCount();
      sendJson(res, 200, { count });
      return;
    }

    sendJson(res, 404, { error: "Risorsa non trovata" });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Errore interno" });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server avviato su http://${HOST}:${PORT}`);
});
