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

// Detect if keys are missing, are placeholders, or have invalid formats
const isPlaceholder = (url: string, key: string) => {
  return (
    !url ||
    !key ||
    url.includes("your-supabase-project-url-here") ||
    key.includes("your-supabase-anon-key-here") ||
    !url.startsWith("https://")
  );
};

export const isSupabaseConfigured = !isPlaceholder(supabaseUrl, supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn("⚠️ Supabase API keys are missing or contain placeholder values. Falling back to mock/local data query paths.");
}

// Use valid placeholder URLs to prevent Supabase JS SDK client creation errors
const finalUrl = isSupabaseConfigured ? supabaseUrl : "https://placeholder-project-dummy-url.supabase.co";
const finalAnonKey = isSupabaseConfigured ? supabaseAnonKey : "placeholder-anon-key-dummy-string";

export const supabase = createClient(finalUrl, finalAnonKey);

