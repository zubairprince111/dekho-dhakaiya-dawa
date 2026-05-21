import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-black text-gray-800 leading-normal py-0.5">
          কোনো একটা ডিশটাপ হইছে মনে হয়।
        </h1>
        <p className="mt-2 text-sm font-semibold text-gray-500 leading-normal py-0.5">
          স্যাররা লাঞ্চে গেছেন বা সার্ভার একটু জ্যাম খাইছে, একটু পর আবার ট্রাই মারেন!
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-sm font-extrabold text-white transition active:scale-95 hover:bg-amber-700 cursor-pointer shadow-md"
          >
            আবার একটু টিপ দেন তো।
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-extrabold text-gray-700 transition active:scale-95 hover:bg-gray-50 cursor-pointer shadow-sm"
          >
            নিজের ডেরায় চলেন ওস্তাদ
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#FAF8F5" },
      { title: "দেখো — Dekhoo" },
      { name: "description", content: "ক্রাউডসোর্সড কোপ-কাহিনী ও সরকারি দফতর রিভিউ।" },
      { property: "og:title", content: "দেখো — Dekhoo" },
      { property: "og:description", content: "বাংলাদেশের প্রতিদিনের ধান্দাবাজির হিসাব।" },
      { property: "og:image", content: "/money.gif" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/money.gif" },
    ],
    links: [
      { rel: "icon", type: "image/jpeg", href: "/favicon.jpeg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF8F5] select-none"
    >
      {/* Ceiling Fan Widget Container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Style block for wobbly spin keyframes */}
        <style>{`
          @keyframes slow-spin-wobble {
            0% { transform: rotate(0deg) translate(0px, 0px); }
            25% { transform: rotate(90deg) translate(1px, -1.2px); }
            50% { transform: rotate(180deg) translate(-1.5px, 1.5px); }
            75% { transform: rotate(270deg) translate(1.2px, 1px); }
            100% { transform: rotate(360deg) translate(0px, 0px); }
          }
          .wobbly-fan {
            animation: slow-spin-wobble 3s linear infinite;
            transform-origin: 50px 50px;
          }
        `}</style>
        
        {/* Custom ceiling fan SVG */}
        <svg width="120" height="120" viewBox="0 0 100 100" className="wobbly-fan filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]">
          {/* Ceiling Rod Mount Shadow */}
          <circle cx="50" cy="50" r="14" fill="#E5E7EB" opacity="0.8" />
          
          {/* Rusty Metal Blades */}
          <g>
            {/* Blade 1 (North) */}
            <path
              d="M 47 45 L 45 10 C 45 7 55 7 55 10 L 53 45 Z"
              fill="#78716C"
              stroke="#57534E"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Blade 2 (East-South-120deg) */}
            <path
              d="M 47 45 L 45 10 C 45 7 55 7 55 10 L 53 45 Z"
              fill="#78716C"
              stroke="#57534E"
              strokeWidth="1.8"
              strokeLinejoin="round"
              transform="rotate(120 50 50)"
            />
            {/* Blade 3 (West-South-240deg) */}
            <path
              d="M 47 45 L 45 10 C 45 7 55 7 55 10 L 53 45 Z"
              fill="#78716C"
              stroke="#57534E"
              strokeWidth="1.8"
              strokeLinejoin="round"
              transform="rotate(240 50 50)"
            />
          </g>
          
          {/* Fan Motor Cap (Tawny Rust Color) */}
          <circle cx="50" cy="50" r="11" fill="#7C2D12" stroke="#451A03" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="6" fill="#D97706" />
          <circle cx="50" cy="50" r="2.5" fill="#FEF3C7" />
        </svg>
      </div>

      {/* Pulsing Satirical Bengali Text */}
      <h2 className="text-xl font-black text-gray-700 mt-6 animate-pulse tracking-wide text-center px-6">
        স্যার লাঞ্চে গেছেন, একটু ওয়েট করেন...
      </h2>
      <p className="text-[11px] text-gray-400 font-extrabold uppercase mt-2 tracking-widest text-center leading-relaxed py-0.5">
        অফিস সময়: ১০:০০ টা - ৫:০০ টা (লাঞ্চ বিরতি দুপুর ১:০০ - ৪:০০)
      </p>
    </motion.div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        {isLoading && <SplashScreen key="splash" />}
      </AnimatePresence>
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}
