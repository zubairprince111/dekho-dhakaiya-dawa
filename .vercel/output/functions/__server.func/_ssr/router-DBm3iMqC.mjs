import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, d as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const appCss = "/assets/styles-pd7kJ8ob.css";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-black text-gray-800 leading-normal py-0.5", children: "কোনো একটা ডিশটাপ হইছে মনে হয়।" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-semibold text-gray-500 leading-normal py-0.5", children: "স্যাররা লাঞ্চে গেছেন বা সার্ভার একটু জ্যাম খাইছে, একটু পর আবার ট্রাই মারেন!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-sm font-extrabold text-white transition active:scale-95 hover:bg-amber-700 cursor-pointer shadow-md",
          children: "আবার একটু টিপ দেন তো।"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-extrabold text-gray-700 transition active:scale-95 hover:bg-gray-50 cursor-pointer shadow-sm",
          children: "নিজের ডেরায় চলেন ওস্তাদ"
        }
      )
    ] })
  ] }) });
}
const Route$6 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" },
      { name: "theme-color", content: "#FAF8F5" },
      { title: "দেখো — ‘চা-পানির’ হিসাব!" },
      { name: "description", content: "ক্রাউডসোর্সড কোপ-কাহিনী ও সরকারি দফতর রিভিউ।" },
      { property: "og:title", content: "দেখো — ‘চা-পানির’ হিসাব!" },
      { property: "og:description", content: "বাংলাদেশের প্রতিদিনের ধান্দাবাজির হিসাব।" },
      { property: "og:image", content: "/money.gif" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/money.gif" }
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap"
      },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "দেখো — ‘চা-পানির’ হিসাব!",
    "alternateName": "Dekhoo",
    "url": "https://dekhoo.pages.dev",
    "description": "বাংলাদেশের প্রতিদিনের কোপ-কাহিনী ও সরকারি দফতর রিভিউ।",
    "genre": "Satire, Crowdsourced Accountability",
    "inLanguage": "bn-BD"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "bn", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "script",
        {
          type: "application/ld+json",
          dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function SplashScreen() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5, ease: "easeInOut" },
      className: "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF8F5] select-none",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-black text-gray-700 animate-pulse tracking-wide text-center px-6", children: "স্যার লাঞ্চে গেছেন, একটু ওয়েট করেন..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-400 font-extrabold uppercase mt-2 tracking-widest text-center leading-relaxed py-0.5 px-6", children: "অফিস সময়: ১০:০০ টা - ৫:০০ টা (লাঞ্চ বিরতি দুপুর ১:০০ - ৪:০০)" })
      ]
    }
  );
}
function RootComponent() {
  const { queryClient } = Route$6.useRouteContext();
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3e3);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(SplashScreen, {}, "splash") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] });
}
const $$splitComponentImporter$3 = () => import("./rates-AX8axYCK.mjs");
const Route$5 = createFileRoute("/rates")({
  head: () => ({
    meta: [{
      title: "আজকের বাজার | দেখো — ‘চা-পানির’ হিসাব!"
    }, {
      name: "description",
      content: "ঘুষ ও দালালির আজকের গড় বাজারদর।"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./privacy-D4UXWvSr.mjs");
const Route$4 = createFileRoute("/privacy")({
  head: () => ({
    meta: [{
      title: "আইনের চিপা (শর্ত ও প্রাইভেসি) | দেখো — ‘চা-পানির’ হিসাব!"
    }, {
      name: "description",
      content: "দেখো অ্যাপের লিগ্যাল ডিসক্লেইমার ও ইউজার প্রাইভেসি পলিসি।"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./halkhata-DsFeyNtr.mjs");
const Route$3 = createFileRoute("/halkhata")({
  head: () => ({
    meta: [{
      title: "হালখাতা | দেখো — ‘চা-পানির’ হিসাব!"
    }, {
      name: "description",
      content: "বাংলাদেশের সরকারি দফতর সমূহের মোট এবং গড় ঘুষের রিয়েল-টাইম এনালিটিক্স।"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BaC9i-T4.mjs");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "দেখো — ‘চা-পানির’ হিসাব!"
    }, {
      name: "description",
      content: "বাংলাদেশের প্রতিদিনের কোপ-কাহিনী ও সরকারি দফতর রিভিউ।"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const supabaseUrl$2 = typeof import.meta !== "undefined" && "your-supabase-project-url-here" || typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = typeof import.meta !== "undefined" && "your-supabase-anon-key-here" || typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const isPlaceholder = (url, key) => {
  return !url || !key || url.includes("your-supabase-project-url-here") || key.includes("your-supabase-anon-key-here") || !url.startsWith("https://");
};
const isSupabaseConfigured = !isPlaceholder(supabaseUrl$2, supabaseAnonKey);
if (!isSupabaseConfigured) {
  console.warn("⚠️ Supabase API keys are missing or contain placeholder values. Falling back to mock/local data query paths.");
}
const finalUrl = isSupabaseConfigured ? supabaseUrl$2 : "https://placeholder-project-dummy-url.supabase.co";
const finalAnonKey = isSupabaseConfigured ? supabaseAnonKey : "placeholder-anon-key-dummy-string";
const supabase = createClient(finalUrl, finalAnonKey);
const supabaseUrl$1 = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://placeholder-project-dummy-url.supabase.co";
const supabaseServiceKey$1 = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const isServerConfigured$1 = Boolean(
  (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL) && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY) && !process.env.VITE_SUPABASE_URL?.includes("your-supabase-project-url-here")
);
const secureSupabase$1 = isServerConfigured$1 ? createClient(supabaseUrl$1, supabaseServiceKey$1) : supabase;
const Route$1 = createFileRoute("/api/vote")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { reportId, newCount } = body;
          if (!reportId || typeof newCount !== "number") {
            return new Response(JSON.stringify({ error: "অবৈধ রিকোয়েস্ট!" }), {
              status: 400,
              headers: { "Content-Type": "application/json" }
            });
          }
          if (!isServerConfigured$1) {
            return new Response(JSON.stringify({ success: true, demoMode: true }), {
              status: 200,
              headers: { "Content-Type": "application/json" }
            });
          }
          const { error: dbError } = await secureSupabase$1.from("bribe_reports").update({ sames: newCount }).eq("id", reportId);
          if (dbError) {
            console.error("Database update error:", dbError.message);
            return new Response(
              JSON.stringify({ error: "ভোট সেভ করতে সমস্যা হয়েছে!" }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" }
              }
            );
          }
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        } catch (err) {
          console.error("API execution failed:", err.message || err);
          return new Response(
            JSON.stringify({ error: "সার্ভারে সমস্যা!" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
      }
    }
  }
});
const ipCache = /* @__PURE__ */ new Map();
function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1e3;
  const maxSubmissions = 3;
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
function sanitize(str) {
  if (typeof str !== "string") return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").trim();
}
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://placeholder-project-dummy-url.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const isServerConfigured = Boolean(
  (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL) && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY) && !process.env.VITE_SUPABASE_URL?.includes("your-supabase-project-url-here")
);
const secureSupabase = isServerConfigured ? createClient(supabaseUrl, supabaseServiceKey) : supabase;
const Route = createFileRoute("/api/submit-report")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || "127.0.0.1";
        if (!checkRateLimit(ip)) {
          return new Response(
            JSON.stringify({ error: "ওস্তাদ, একটু আস্তে! চা ঠান্ডা কইরা খান।" }),
            {
              status: 429,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
        let body;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "অবৈধ রিকোয়েস্ট পেলোড!" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
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
          userSelectedAnswer
        } = body;
        const captcha = CAPTCHA_CHALLENGES.find((c) => c.id === captchaQuestionId);
        if (!captcha || captcha.a !== userSelectedAnswer) {
          return new Response(
            JSON.stringify({ error: "মামা রোবট নাকি পাবলিক? ক্যাপচা সঠিক উত্তর দিন!" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
        const comments = sanitize(rawComments || "").slice(0, 500);
        const officeName = sanitize(rawOfficeName || "অন্যান্য সরকারি অফিস").slice(0, 200);
        const cleanArea = sanitize(area || "অজ্ঞাত").slice(0, 200);
        const cleanAuthor = sanitize(author || "অজ্ঞাত পাবলিক").slice(0, 100);
        const cleanCategory = sanitize(category || "অন্যান্য").slice(0, 100);
        const cleanBadgeTitle = sanitize(badgeTitle || "হালকার ওপর ঝাপসা").slice(0, 100);
        const totalAmount = parseInt(rawTotalAmount, 10);
        if (isNaN(totalAmount) || totalAmount <= 0 || totalAmount >= 1e7) {
          return new Response(
            JSON.stringify({ error: "টাকার পরিমাণ ১ থেকে ১০,০০০,০০০ এর মধ্যে হতে হবে!" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
        const rating = Math.max(1, Math.min(5, parseInt(teaCups, 10) || 3));
        let cleanItems = [];
        if (Array.isArray(items)) {
          cleanItems = items.map((item) => ({
            who: sanitize(item.who || "অজ্ঞাত").slice(0, 100),
            amount: parseFloat(item.amount) || 0
          }));
        }
        if (!isServerConfigured && !isSupabaseConfigured) {
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
                category: cleanCategory
              }
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
        try {
          const { data, error: dbError } = await secureSupabase.from("bribe_reports").insert([
            {
              author: cleanAuthor,
              officeName,
              area: cleanArea,
              totalAmount,
              teaCups: rating,
              badgeTitle: cleanBadgeTitle,
              comments,
              items: cleanItems,
              category: cleanCategory
            }
          ]).select();
          if (dbError) {
            console.error("Database insert error:", dbError.message);
            return new Response(
              JSON.stringify({ error: "ডাটাবেসে সংরক্ষণে সমস্যা হয়েছে। ওস্তাদ, পরে আবার ট্রাই মারেন।" }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" }
              }
            );
          }
          return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        } catch (err) {
          console.error("API execution failed:", err.message || err);
          return new Response(
            JSON.stringify({ error: "সার্ভারে কিছু একটা সমস্যা হইসে!" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
      }
    }
  }
});
const RatesRoute = Route$5.update({
  id: "/rates",
  path: "/rates",
  getParentRoute: () => Route$6
});
const PrivacyRoute = Route$4.update({
  id: "/privacy",
  path: "/privacy",
  getParentRoute: () => Route$6
});
const HalkhataRoute = Route$3.update({
  id: "/halkhata",
  path: "/halkhata",
  getParentRoute: () => Route$6
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const ApiVoteRoute = Route$1.update({
  id: "/api/vote",
  path: "/api/vote",
  getParentRoute: () => Route$6
});
const ApiSubmitReportRoute = Route.update({
  id: "/api/submit-report",
  path: "/api/submit-report",
  getParentRoute: () => Route$6
});
const rootRouteChildren = {
  IndexRoute,
  HalkhataRoute,
  PrivacyRoute,
  RatesRoute,
  ApiSubmitReportRoute,
  ApiVoteRoute
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  isSupabaseConfigured as i,
  router as r,
  supabase as s
};
