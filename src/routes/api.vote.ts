import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { supabase as clientSupabase } from "../lib/supabase";

// Server-side Supabase Client Initialization
const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://placeholder-project-dummy-url.supabase.co";

const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

const isServerConfigured = Boolean(
  (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL) &&
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY) &&
  !process.env.VITE_SUPABASE_URL?.includes("your-supabase-project-url-here")
);

const secureSupabase = isServerConfigured
  ? createClient(supabaseUrl, supabaseServiceKey!)
  : clientSupabase;

export const Route = createFileRoute("/api/vote")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { reportId, newCount } = body;

          if (!reportId || typeof newCount !== "number") {
            return new Response(JSON.stringify({ error: "অবৈধ রিকোয়েস্ট!" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          if (!isServerConfigured) {
            // Local demo mode gracefully bypasses database writes
            return new Response(JSON.stringify({ success: true, demoMode: true }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Update the vote count using the secure service role key
          // This allows us to keep RLS strict on the frontend
          const { error: dbError } = await secureSupabase
            .from("bribe_reports")
            .update({ sames: newCount })
            .eq("id", reportId);

          if (dbError) {
            console.error("Database update error:", dbError.message);
            return new Response(
              JSON.stringify({ error: "ভোট সেভ করতে সমস্যা হয়েছে!" }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err: any) {
          console.error("API execution failed:", err.message || err);
          return new Response(
            JSON.stringify({ error: "সার্ভারে সমস্যা!" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },
  },
});
