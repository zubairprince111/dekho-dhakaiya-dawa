import { createClient } from "@supabase/supabase-js";

// Standard Vite environment scope + standard NEXT-style fallbacks for cross-framework compatibility
const supabaseUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  "";

const supabaseAnonKey =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase API keys are missing. Using placeholder keys and falling back to mock/local data query paths.");
}

// Use valid placeholder URLs to prevent Supabase JS SDK client creation errors
const finalUrl = supabaseUrl || "https://placeholder-project-dummy-url.supabase.co";
const finalAnonKey = supabaseAnonKey || "placeholder-anon-key-dummy-string";

export const supabase = createClient(finalUrl, finalAnonKey);
