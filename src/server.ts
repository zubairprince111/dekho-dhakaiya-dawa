import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
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

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);

      // --- Cloudflare Cache-Control Header Injection ---
      const url = new URL(request.url);
      const path = url.pathname;
      const isStaticAsset = /\.(js|css|woff2?|ttf|otf|eot|ico|png|jpe?g|gif|svg|webp|avif|map)(\?.*)?$/.test(path);
      const isImmutableAsset = path.startsWith("/_build/") || path.startsWith("/assets/") || /\.[a-f0-9]{8,}\.(js|css)/.test(path);

      const headers = new Headers(normalized.headers);

      if (isImmutableAsset || isStaticAsset) {
        // Static/hashed assets: Cloudflare edge caches for 1 year, browser also caches 1 year
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
        headers.set("Surrogate-Control", "max-age=31536000");
      } else {
        // HTML pages and SSR routes: never cache — always fresh from the server
        headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        headers.set("Pragma", "no-cache");
        headers.set("Expires", "0");
        headers.set("Surrogate-Control", "no-store");
      }

      return new Response(normalized.body, {
        status: normalized.status,
        statusText: normalized.statusText,
        headers,
      });
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
