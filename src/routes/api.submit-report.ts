import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured as isClientConfigured, supabase as clientSupabase } from "../lib/supabase";

// IP-Based Rate Limiting Map
const ipCache = new Map<string, { count: number; firstRequestTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxSubmissions = 3;

  // Clean up expired cache items to prevent memory leaks
  for (const [key, val] of ipCache.entries()) {
    if (now - val.firstRequestTime > windowMs) {
      ipCache.delete(key);
    }
  }

  const record = ipCache.get(ip);
  if (!record) {
    ipCache.set(ip, { count: 1, firstRequestTime: now });
    return true;
  }

  if (now - record.firstRequestTime > windowMs) {
    ipCache.set(ip, { count: 1, firstRequestTime: now });
    return true;
  }

  if (record.count >= maxSubmissions) {
    return false;
  }

  record.count += 1;
  return true;
}

// Server-side Captcha Challenges duplicate
const CAPTCHA_CHALLENGES = [
  { id: 1, q: "ফাইল আটকায়া গেলে নিচে কী লাগাইতে হয়?", a: "চাকা" },
  { id: 2, q: "স্যাররা টেবিলের তলা দিয়া কী নেয়?", a: "খাম" },
  { id: 3, q: "পুলিশ ধরলে পকেটে কী গুঁইজা দিতে হয়?", a: "পাতা" },
  { id: 4, q: "দুপুরে সরকারি অফিসে গেলে স্যাররা কোথায় থাকেন?", a: "লাঞ্চের নামে হাওয়া" },
  { id: 5, q: "অফিসের আসল বস কে, যার কথায় ফাইল নড়ে?", a: "দালাল/পিয়ন" },
  { id: 6, q: "'টেবিলে ওজন কম হইসে'—এর মানে কী?", a: "মালকড়ি কম দিসে" },
  { id: 7, q: "স্যার 'মিষ্টি খাইতে' চাইলে আসলে কী চায়?", a: "ক্যাশ টাকা" },
  { id: 8, q: "পাসপোর্ট অফিসে কার কদর সবচেয়ে বেশি?", a: "দালালের" },
  { id: 9, q: "'সার্ভার ডাউন' থাকলে আসলে কী আপ করতে হয়?", a: "স্পিড মানি" },
  { id: 10, q: "'আজকে হবে না, কালকে আসেন'—এই কথার আসল অর্থ কী?", a: "রেট বাড়াইতে হবে" },
  { id: 11, q: "ফাইলের গতি বাড়াইতে কী স্প্রে করতে হয়?", a: "স্পিড মানি" },
  { id: 12, q: "ফাইলে সাইন করতে স্যারের হাত কাঁপে কেন?", a: "খামের অভাব" },
  { id: 13, q: "ঈদের আগে স্যাররা কীসের আশায় বসে থাকে?", a: "সালামির" },
  { id: 14, q: "বিআরটিএ-তে লাইনে না দাঁড়ায় কেমনে কাজ হয়?", a: "দালালের জাদুতে" },
  { id: 15, q: "পিয়নকে 'চা-পানি' না দিলে ফাইলের কী অবস্থা হয়?", a: "ফাইল ঘুমায়" },
  { id: 16, q: "স্যার মিটিংয়ে—এর মানে স্যার আসলে কী করতেসে?", a: "ঘুম বা আড্ডা" },
  { id: 17, q: "ট্রাফিক পুলিশের সবচেয়ে প্রিয় কাগজ কোনটা?", a: "হাজার টাকার নোট" },
  { id: 18, q: "ভূমি অফিসে খতিয়ান তুলতে গেলে কোন ভাষা বুঝতে হয়?", a: "টাকার ভাষা" },
  { id: 19, q: "'উপর মহলের চাপ আছে'—কথাটা কখন বলা হয়?", a: "রেট ডাবল করার জন্য" },
  { id: 20, q: "সরকারি অফিসে কোন জিনিসটা সবচেয়ে দ্রুত হাওয়া হয়ে যায়?", a: "পাবলিকের টাকা" },
  { id: 21, q: "'আপনার কাগজপত্রে একটু ভেজাল আছে'—এর সমাধান কী?", a: "পকেট গরম করা" },
  { id: 22, q: "স্যারদের টেবিলের ড্রয়ার সবসময় একটু খোলা থাকে কেন?", a: "খাম ঢোকানোর জন্য" },
  { id: 23, q: "'আমি তো কিছু রাখি না, সব উপরে দিতে হয়'—ডায়লগটা কার?", a: "ঘুষখোর দালাল" },
  { id: 24, q: "ফাইলের নিচে 'চাকা' না লাগাইলে ফাইল কী করে?", a: "ঘুমায়" },
  { id: 25, q: "'চেয়ারম্যান সাবের সাইন লাগবে'—এর মানে কী?", a: "সাইনের একটা রেট আছে" },
  { id: 26, q: "सरकारी হাসপাতালে সিরিয়াল ভাঙার সবচেয়ে সোজা উপায় কী?", a: "মামার জোর/মালকড়ি" },
  { id: 27, q: "'আপনার কাজটা তো অনেক কঠিন'—শোনার পর কী করতে হয়?", a: "বাজেট বাড়ানো" },
  { id: 28, q: "সরকারি অফিসের ফ্যানের সবচেয়ে বড় বৈশিষ্ট্য কী?", a: "ঘ্যাঁচ ঘ্যাঁচ শব্দ করে কিন্তু বাতাস নাই" },
  { id: 29, q: "ফাইল কোন জায়গা থেকে হাওয়া হয়ে যায়?", a: "টেবিল থেকে ড্রয়ারে" },
  { id: 30, q: "'স্যার তো একটু নামাজে গেছে'—স্যার কখন ফিরবে?", a: "খাম রেডি হলে" }
];

// HTML Tag and Script Sanitization Helper
function sanitize(str: string): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .trim();
}

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

export const Route = createFileRoute("/api/submit-report")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // 1. IP-Based Rate Limiting (Extract cf-connecting-ip, fallback for development)
        const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || "127.0.0.1";

        if (!checkRateLimit(ip)) {
          return new Response(
            JSON.stringify({ error: "ওস্তাদ, একটু আস্তে! চা ঠান্ডা কইরা খান।" }),
            {
              status: 429,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        // 2. Parse payload
        let body: any;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "অবৈধ রিকোয়েস্ট পেলোড!" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const {
          author,
          officeName: rawOfficeName,
          area,
          totalAmount: rawTotalAmount,
          teaCups,
          badgeTitle,
          comments: rawComments,
          items,
          category,
          captchaQuestionId,
          userSelectedAnswer,
        } = body;

        // 3. Server-Side Captcha Validation
        const captcha = CAPTCHA_CHALLENGES.find((c) => c.id === captchaQuestionId);
        if (!captcha || captcha.a !== userSelectedAnswer) {
          return new Response(
            JSON.stringify({ error: "মামা রোবট নাকি পাবলিক? ক্যাপচা সঠিক উত্তর দিন!" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        // 4. Server-Side Sanitization & Validation
        const comments = sanitize(rawComments || "").slice(0, 500);
        const officeName = sanitize(rawOfficeName || "অন্যান্য সরকারি অফিস").slice(0, 200);
        const cleanArea = sanitize(area || "অজ্ঞাত").slice(0, 200);
        const cleanAuthor = sanitize(author || "অজ্ঞাত পাবলিক").slice(0, 100);
        const cleanCategory = sanitize(category || "অন্যান্য").slice(0, 100);
        const cleanBadgeTitle = sanitize(badgeTitle || "হালকার ওপর ঝাপসা").slice(0, 100);

        const totalAmount = parseInt(rawTotalAmount, 10);
        if (isNaN(totalAmount) || totalAmount <= 0 || totalAmount >= 10000000) {
          return new Response(
            JSON.stringify({ error: "টাকার পরিমাণ ১ থেকে ১০,০০০,০০০ এর মধ্যে হতে হবে!" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        const rating = Math.max(1, Math.min(5, parseInt(teaCups, 10) || 3));

        let cleanItems: { who: string; amount: number }[] = [];
        if (Array.isArray(items)) {
          cleanItems = items.map((item: any) => ({
            who: sanitize(item.who || "অজ্ঞাত").slice(0, 100),
            amount: parseFloat(item.amount) || 0,
          }));
        }

        // 5. Database Insert Execution
        if (!isServerConfigured && !isClientConfigured) {
          // Local demo mode gracefully bypasses database writes and returns mock success
          return new Response(
            JSON.stringify({
              success: true,
              demoMode: true,
              data: {
                author: cleanAuthor,
                officeName,
                area: cleanArea,
                totalAmount,
                teaCups: rating,
                badgeTitle: cleanBadgeTitle,
                comments,
                items: cleanItems,
                category: cleanCategory,
              },
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        try {
          const { data, error: dbError } = await secureSupabase
            .from("bribe_reports")
            .insert([
              {
                author: cleanAuthor,
                officeName,
                area: cleanArea,
                totalAmount,
                teaCups: rating,
                badgeTitle: cleanBadgeTitle,
                comments,
                items: cleanItems,
                category: cleanCategory,
              },
            ])
            .select();

          if (dbError) {
            console.error("Database insert error:", dbError.message);
            return new Response(
              JSON.stringify({ error: "ডাটাবেসে সংরক্ষণে সমস্যা হয়েছে। ওস্তাদ, পরে আবার ট্রাই মারেন।" }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err: any) {
          console.error("API execution failed:", err.message || err);
          return new Response(
            JSON.stringify({ error: "সার্ভারে কিছু একটা সমস্যা হইসে!" }),
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
