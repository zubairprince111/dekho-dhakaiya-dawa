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
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-5xl sm:text-7xl font-black text-foreground tracking-tight">404</h1>
        <h2 className="mt-3 text-lg sm:text-xl font-extrabold text-foreground leading-snug">Page not found</h2>
        <p className="mt-2 text-xs sm:text-sm font-semibold text-muted-foreground leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground transition-all duration-200 active:scale-95 hover:bg-primary/90 shadow-md cursor-pointer"
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-sm text-center space-y-4">
        <div className="text-4xl animate-bounce">☕</div>
        <div className="space-y-1.5">
          <h1 className="text-lg sm:text-xl font-black text-gray-800 leading-snug">
            কোনো একটা ডিশটাপ হইছে মনে হয়।
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-gray-500 leading-relaxed">
            স্যাররা লাঞ্চে গেছেন বা সার্ভার একটু জ্যাম খাইছে, একটু পর আবার ট্রাই মারেন!
          </p>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-extrabold text-white transition-all duration-200 active:scale-95 hover:bg-amber-700 cursor-pointer shadow-md"
          >
            আবার একটু টিপ দেন তো।
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-extrabold text-gray-700 transition-all duration-200 active:scale-95 hover:bg-gray-50 cursor-pointer shadow-sm"
          >
            নিজের ডেরায় চলেন ওস্তাদ
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
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" },
      { name: "theme-color", content: "#FAF8F5" },
      { title: "দেখো — ‘চা-পানির’ হিসাব!" },
      { name: "description", content: "ক্রাউডসোর্সড কোপ-কাহিনী ও সরকারি দফতর রিভিউ।" },
      { property: "og:title", content: "দেখো — ‘চা-পানির’ হিসাব!" },
      { property: "og:description", content: "বাংলাদেশের প্রতিদিনের ধান্দাবাজির হিসাব।" },
      { property: "og:image", content: "/money.gif" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/money.gif" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
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

  return (
    <html lang="bn">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
      {/* Pulsing Satirical Bengali Text */}
      <h2 className="text-base font-black text-gray-700 animate-pulse tracking-wide text-center px-6">
        স্যার লাঞ্চে গেছেন, একটু ওয়েট করেন...
      </h2>
      <p className="text-[10px] text-gray-400 font-extrabold uppercase mt-2 tracking-widest text-center leading-relaxed py-0.5 px-6">
        অফিস সময়: ১০:০০ টা - ৫:০০ টা (লাঞ্চ বিরতি দুপুর ১:০০ - ৪:০০)
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
