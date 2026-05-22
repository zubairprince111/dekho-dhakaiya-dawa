// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

const isVercel = process.env.VERCEL === "1";
if (isVercel) {
  process.env.NITRO_PRESET = "vercel";
}

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
// If deploying to Vercel, we use Vercel's preset and default entry.
export default defineConfig({
  cloudflare: isVercel ? false : undefined,
  plugins: isVercel ? [nitro({ preset: "vercel" })] : [],
  vite: {
    build: {
      chunkSizeWarningLimit: 2000,
    },
  },
  tanstackStart: {
    server: { 
      preset: isVercel ? "vercel" : undefined,
      entry: isVercel ? undefined : "server" 
    },
  },
});
