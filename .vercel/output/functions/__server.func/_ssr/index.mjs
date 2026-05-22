let lastCapturedError;
const TTL_MS = 5e3;
function record(error) {
  lastCapturedError = { error, at: Date.now() };
}
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record(event.error ?? event));
  globalThis.addEventListener(
    "unhandledrejection",
    (event) => record(event.reason)
  );
}
function consumeLastCapturedError() {
  if (!lastCapturedError) return void 0;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = void 0;
    return void 0;
  }
  const { error } = lastCapturedError;
  lastCapturedError = void 0;
  return error;
}
function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>কোনো একটা ডিশটাপ হইছে মনে হয়।</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #faf8f5; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; font-weight: 900; margin: 0 0 0.5rem; color: #1f2937; }
      p { color: #6b7280; font-weight: 600; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.75rem 1.25rem; border-radius: 1rem; font: inherit; font-weight: 800; cursor: pointer; text-decoration: none; border: 1px solid transparent; transition: all 0.2s; }
      .primary { background: #d97706; color: #fff; }
      .primary:hover { background: #b45309; }
      .secondary { background: #fff; color: #374151; border-color: #e5e7eb; }
      .secondary:hover { background: #f9fafb; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>কোনো একটা ডিশটাপ হইছে মনে হয়।</h1>
      <p>স্যাররা লাঞ্চে গেছেন বা সার্ভার একটু জ্যাম খাইছে, একটু পর আবার ট্রাই মারেন!</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">আবার একটু টিপ দেন তো।</button>
        <a class="secondary" href="/">নিজের ডেরায় চলেন ওস্তাদ</a>
      </div>
    </div>
  </body>
</html>`;
}
let serverEntryPromise;
async function getServerEntry() {
  if (!serverEntryPromise) {
    serverEntryPromise = import("./server-DueU4V72.mjs").then((n) => n.s).then(
      (m) => m.default ?? m
    );
  }
  return serverEntryPromise;
}
function brandedErrorResponse() {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
function isCatastrophicSsrErrorBody(body, responseStatus) {
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }
  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }
  const fields = payload;
  const expectedKeys = /* @__PURE__ */ new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }
  return fields.unhandled === true && fields.message === "HTTPError" && (fields.status === void 0 || fields.status === responseStatus);
}
async function normalizeCatastrophicSsrResponse(response) {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;
  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }
  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}
const server = {
  async fetch(request, env, ctx) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      const url = new URL(request.url);
      const path = url.pathname;
      const isStaticAsset = /\.(js|css|woff2?|ttf|otf|eot|ico|png|jpe?g|gif|svg|webp|avif|map)(\?.*)?$/.test(path);
      const isImmutableAsset = path.startsWith("/_build/") || path.startsWith("/assets/") || /\.[a-f0-9]{8,}\.(js|css)/.test(path);
      const headers = new Headers(normalized.headers);
      if (isImmutableAsset || isStaticAsset) {
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
        headers.set("Surrogate-Control", "max-age=31536000");
      } else {
        headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        headers.set("Pragma", "no-cache");
        headers.set("Expires", "0");
        headers.set("Surrogate-Control", "no-store");
      }
      return new Response(normalized.body, {
        status: normalized.status,
        statusText: normalized.statusText,
        headers
      });
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  }
};
export {
  server as default,
  renderErrorPage as r
};
