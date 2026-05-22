import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link, u as useLocation } from "../_libs/tanstack__react-router.mjs";
import { i as isSupabaseConfigured, s as supabase } from "./router-DBm3iMqC.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { h as html2canvas } from "../_libs/html2canvas.mjs";
import { H as Handshake, d as Search, b as Megaphone, B as BookOpen, X, a as MapPin, C as ChevronDown, P as Plus, f as Sparkles } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
function TeaCup({ filled }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z",
        stroke: filled ? "#FFB300" : "#D1D5DB",
        strokeWidth: "1.8",
        fill: filled ? "#FFB300" : "none"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 10h2a3 3 0 0 1 0 6h-2", stroke: filled ? "#FFB300" : "#D1D5DB", strokeWidth: "1.8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3", stroke: filled ? "#FFB300" : "#D1D5DB", strokeWidth: "1.6", strokeLinecap: "round" })
  ] });
}
function Avatar({ seed }) {
  const hue = seed.charCodeAt(0) * 37 % 360;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-white",
      style: { background: `linear-gradient(135deg, hsl(${hue} 70% 55%), hsl(${(hue + 60) % 360} 70% 60%))` },
      children: seed.charAt(0)
    }
  );
}
function ReviewCard({ review }) {
  const [samesCount, setSamesCount] = reactExports.useState(review.sames);
  const [hasVoted, setHasVoted] = reactExports.useState(false);
  const [isSyncing, setIsSyncing] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const voted = localStorage.getItem(`voted_same_${review.id}`);
    if (voted === "true") {
      setHasVoted(true);
    }
  }, [review.id]);
  const handleVote = async () => {
    if (hasVoted) {
      toast.info("মামা, অলরেডি তো 'us ভাই us' বইলা ফেলছেন! ❤️", {
        description: "একই পোস্টে বারবার ভোট দেওয়া যাবে না ওস্তাদ।",
        duration: 3e3
      });
      return;
    }
    try {
      setIsSyncing(true);
      const newCount = samesCount + 1;
      if (isSupabaseConfigured) {
        const response = await fetch("/api/vote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            reportId: review.id,
            newCount
          })
        });
        if (!response.ok) {
          throw new Error("Failed to vote");
        }
      }
      setSamesCount(newCount);
      setHasVoted(true);
      localStorage.setItem(`voted_same_${review.id}`, "true");
      toast.success("us ভাই us! 🤝", {
        description: "কোপের অনুভূতি একদম মিইলা গেল মামা!",
        duration: 3e3
      });
    } catch (err) {
      console.warn("Error updating vote:", err);
      toast.error("ওস্তাদ, ভোটটা দেওয়া গেল না!", {
        description: "সার্ভারে একটু সমস্যা হইছে। একটু পর ট্রাই মারেন।"
      });
    } finally {
      setIsSyncing(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-4 mt-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { seed: review.author }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold text-gray-800", children: review.author }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs font-bold text-gray-600 mt-0.5", children: review.location }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-gray-400", children: [
          "• ",
          review.timeAgo
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-0.5 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-bold text-cyan-700 text-right", children: review.category }),
        review.area && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-bold text-gray-500 flex items-center gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-600", children: "📍" }),
          review.area
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TeaCup, { filled: i <= review.rating }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-gray-600", children: review.ratingLabel })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-3 rounded-xl bg-gray-50 p-4", children: [
      review.items.map((it, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-baseline justify-between gap-2 py-1.5 ${idx < review.items.length - 1 ? "border-b border-dashed border-gray-300" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700", children: it.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-gray-800 tabular-nums", children: [
              it.amount.toLocaleString("bn-BD"),
              " ৳"
            ] })
          ]
        },
        idx
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline justify-between border-t border-gray-300 pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-[#E91E63]", children: "সর্বমোট কোপ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-extrabold text-[#E91E63] tabular-nums", children: [
          review.total.toLocaleString("bn-BD"),
          " ৳"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] leading-relaxed text-gray-700", children: review.story }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-center justify-center border-t border-gray-100 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActionBtn,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Handshake, { size: 18, strokeWidth: 1.8 }),
        label: "us ভাই us",
        count: samesCount,
        hasVoted,
        onClick: handleVote,
        disabled: isSyncing
      }
    ) })
  ] });
}
function ActionBtn({ icon, label, count, hasVoted, onClick, disabled }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick,
      disabled,
      className: `flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 px-4 transition-all duration-200 active:scale-95 cursor-pointer max-w-[140px] ${hasVoted ? "bg-rose-50/75 text-rose-600 font-extrabold shadow-sm border border-rose-100/50" : "text-gray-600 hover:bg-rose-50/20 hover:text-rose-500 border border-transparent"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `transition-transform duration-300 ${hasVoted ? "scale-110 rotate-3 text-rose-500 animate-bounce" : ""}`, children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold tabular-nums ${hasVoted ? "text-rose-600 scale-105" : ""}`, children: count })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-wide font-extrabold leading-tight", children: label })
      ]
    }
  );
}
const SheetCtx = reactExports.createContext(null);
function useSubmissionSheet() {
  const c = reactExports.useContext(SheetCtx);
  if (!c) throw new Error("SubmissionSheet provider missing");
  return c;
}
function SubmissionSheetProvider({ children }) {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetCtx.Provider, { value: { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }, children: [
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubmissionSheet, {})
  ] });
}
const WHO_OPTIONS = [
  "বড় স্যার (ফাইনাল সাইন)",
  "পিয়ন ভাই (ফাইল পুশার)",
  "দালাল মামা (বাইরের কন্ট্রাক্ট)",
  "গেটের দারোয়ান (এন্ট্রি ফি)",
  "কম্পিউটার অপারেটর (টাইপিং চার্জ)",
  "ডিউটি অফিসার (জিডির খরচ)",
  "রেকর্ড কিপার (পুরানো ফাইল খোঁজা)"
];
const SPOT_OPTIONS = [
  {
    category: "পরিচয় ও পাসপোর্ট (Identity)",
    options: ["পাসপোর্ট অফিস", "এনআইডি / নির্বাচন কমিশন", "জন্ম-মৃত্যু নিবন্ধন শাখা"]
  },
  {
    category: "জমি ও বাড়িঘর (Land)",
    options: ["ভূমি অফিস / এসিল্যান্ড", "সাব-রেজিস্ট্রি অফিস", "সেটেলমেন্ট অফিস", "রাজউক / উন্নয়ন কর্তৃপক্ষ"]
  },
  {
    category: "গাড়ি ও রাস্তা (Transport)",
    options: ["বিআরটিএ অফিস", "ট্রাফিক পুলিশ জোন", "বিআরটিসি ডিপো"]
  },
  {
    category: "আইন ও প্রশাসন (Law & Admin)",
    options: ["থানা / police স্টেশন", "আদালত / কোর্ট প্রাঙ্গণ", "ডিসি অফিস", "ইউএনও অফিস", "জেলখানা গেট"]
  },
  {
    category: "বিল ও সেবা (Utility)",
    options: ["বিদ্যুৎ অফিস (ডেসকো/পল্লী বিদ্যুৎ)", "ওয়াসা / পানি ভবন", "তিতাস / গ্যাস অফিস"]
  },
  {
    category: "চিকিৎসাসেবা (Healthcare)",
    options: ["সরকারি হাসপাতাল", "উপজেলা স্বাস্থ্য কমপ্লেক্স", "সিভিল সার্জন অফিস"]
  },
  {
    category: "শিক্ষা (Education)",
    options: ["শিক্ষা বোর্ড", "সরকারি স্কুল/কলেজ এডমিন", "প্রাথমিক শিক্ষা অধিদপ্তর"]
  },
  {
    category: "অন্যান্য (Others)",
    options: ["অন্যান্য সরকারি অফিস"]
  }
];
function TeaCupIcon({ filled }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: filled ? "currentColor" : "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "w-8 h-8 transition-colors duration-200",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 2v4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13 2v4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 8h10a2 2 0 0 1 2 2v3a6 6 0 0 1-12 0v-3a2 2 0 0 1 2-2z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 10h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1" })
      ]
    }
  );
}
const CAPTCHA_CHALLENGES = [
  {
    id: 1,
    q: "ফাইল আটকায়া গেলে নিচে কী লাগাইতে হয়?",
    options: ["আঠা", "চাকা", "ক্লিপ"],
    a: "চাকা"
  },
  {
    id: 2,
    q: "স্যাররা টেবিলের তলা দিয়া কী নেয়?",
    options: ["বাতাস", "খাম", "পেনড্রাইভ"],
    a: "খাম"
  },
  {
    id: 3,
    q: "পুলিশ ধরলে পকেটে কী গুঁইজা দিতে হয়?",
    options: ["ভিজিটিং কার্ড", "পাতা", "লজেন্স"],
    a: "পাতা"
  },
  {
    id: 4,
    q: "দুপুরে সরকারি অফিসে গেলে স্যাররা কোথায় থাকেন?",
    options: ["মিটিংয়ে", "লাঞ্চের নামে হাওয়া", "কাজে চরম ব্যস্ত"],
    a: "লাঞ্চের নামে হাওয়া"
  },
  {
    id: 5,
    q: "অফিসের আসল বস কে, যার কথায় ফাইল নড়ে?",
    options: ["বড় স্যার", "মিনিস্টার", "দালাল/পিয়ন"],
    a: "দালাল/পিয়ন"
  },
  {
    id: 6,
    q: "'টেবিলে ওজন কম হইসে'—এর মানে কী?",
    options: ["কাগজ পাতলা", "মালকড়ি কম দিসে", "টেবিল নড়বড়ে"],
    a: "মালকড়ি কম দিসে"
  },
  {
    id: 7,
    q: "স্যার 'মিষ্টি খাইতে' চাইলে আসলে কী চায়?",
    options: ["রসগোল্লা", "ক্যাশ টাকা", "জিলাপি"],
    a: "ক্যাশ টাকা"
  },
  {
    id: 8,
    q: "পাসপোর্ট অফিসে কার কদর সবচেয়ে বেশি?",
    options: ["পাবলিকের", "দালালের", "কম্পিউটারের"],
    a: "দালালের"
  },
  {
    id: 9,
    q: "'সার্ভার ডাউন' থাকলে আসলে কী আপ করতে হয়?",
    options: ["ইন্টারনেট", "স্পিড মানি", "পিসি"],
    a: "স্পিড মানি"
  },
  {
    id: 10,
    q: "'আজকে হবে না, কালকে আসেন'—এই কথার আসল অর্থ কী?",
    options: ["কালকে কাজ হবে", "রেট বাড়াইতে হবে", "স্যার ক্লান্ত"],
    a: "রেট বাড়াইতে হবে"
  },
  {
    id: 11,
    q: "ফাইলের গতি বাড়াইতে কী স্প্রে করতে হয়?",
    options: ["পারফিউম", "মশার ওষুধ", "স্পিড মানি"],
    a: "স্পিড মানি"
  },
  {
    id: 12,
    q: "ফাইলে সাইন করতে স্যারের হাত কাঁপে কেন?",
    options: ["ভিটামিনের অভাব", "খামের অভাব", "বয়সের দোষ"],
    a: "খামের অভাব"
  },
  {
    id: 13,
    q: "ঈদের আগে স্যাররা কীসের আশায় বসে থাকে?",
    options: ["চাঁদ দেখার", "সালামির", "ছুটির"],
    a: "সালামির"
  },
  {
    id: 14,
    q: "বিআরটিএ-তে লাইনে না দাঁড়ায় কেমনে কাজ হয়?",
    options: ["জাদুমন্ত্রে", "দালালের জাদুতে", "অনলাইনে"],
    a: "দালালের জাদুতে"
  },
  {
    id: 15,
    q: "পিয়নকে 'চা-পানি' না দিলে ফাইলের কী অবস্থা হয়?",
    options: ["ফাইল উড়ে যায়", "ফাইল ঘুমায়", "ফাইল দৌড়ায়"],
    a: "ফাইল ঘুমায়"
  },
  {
    id: 16,
    q: "স্যার মিটিংয়ে—এর মানে স্যার আসলে কী করতেসে?",
    options: ["গুরুত্বপূর্ণ কাজ", "ঘুম বা আড্ডা", "দেশ উদ্ধার"],
    a: "ঘুম বা আড্ডা"
  },
  {
    id: 17,
    q: "ট্রাফিক পুলিশের সবচেয়ে প্রিয় কাগজ কোনটা?",
    options: ["লাইসেন্স", "ইন্স্যুরেন্স", "হাজার টাকার নোট"],
    a: "হাজার টাকার নোট"
  },
  {
    id: 18,
    q: "ভূমি অফিসে খতিয়ান তুলতে গেলে কোন ভাষা বুঝতে হয়?",
    options: ["ইংরেজি", "আরবি", "টাকার ভাষা"],
    a: "টাকার ভাষা"
  },
  {
    id: 19,
    q: "'উপর মহলের চাপ আছে'—কথাটা কখন বলা হয়?",
    options: ["সত্যিই চাপ থাকলে", "রেট ডাবল করার জন্য", "কাজে মন না থাকলে"],
    a: "রেট ডাবল করার জন্য"
  },
  {
    id: 20,
    q: "সরকারি অফিসে কোন জিনিসটা সবচেয়ে দ্রুত হাওয়া হয়ে যায়?",
    options: ["কলম", "ফাইল", "পাবলিকের টাকা"],
    a: "পাবলিকের টাকা"
  },
  {
    id: 21,
    q: "'আপনার কাগজপত্রে একটু ভেজাল আছে'—এর সমাধান কী?",
    options: ["নতুন কাগজ আনা", "উকিল ধরা", "পকেট গরম করা"],
    a: "পকেট গরম করা"
  },
  {
    id: 22,
    q: "স্যারদের টেবিলের ড্রয়ার সবসময় একটু খোলা থাকে কেন?",
    options: ["হাওয়া ঢোকার জন্য", "খাম ঢোকানোর জন্য", "ড্রয়ার নষ্ট তাই"],
    a: "খাম ঢোকানোর জন্য"
  },
  {
    id: 23,
    q: "'আমি তো কিছু রাখি না, সব উপরে দিতে হয়'—ডায়লগটা কার?",
    options: ["সাধু সন্ন্যাসী", "ঘুষখোর দালাল", "মসজিদের ইমাম"],
    a: "ঘুষখোর দালাল"
  },
  {
    id: 24,
    q: "ফাইলের নিচে 'চাকা' না লাগাইলে ফাইল কী করে?",
    options: ["হাঁটে", "ঘুমায়", "আকাশে উড়ে"],
    a: "ঘুমায়"
  },
  {
    id: 25,
    q: "'চেয়ারম্যান সাবের সাইন লাগবে'—এর মানে কী?",
    options: ["সাবের অনেক পাওয়ার", "সাইনের একটা রেট আছে", "সাব খুব ভালো মানুষ"],
    a: "সাইনের একটা রেট আছে"
  },
  {
    id: 26,
    q: "सरकारी হাসপাতালে সিরিয়াল ভাঙার সবচেয়ে সোজা উপায় কী?",
    options: ["মারামারি করা", "মামার জোর/মালকড়ি", "সারারাত বসে থাকা"],
    a: "মামার জোর/মালকড়ি"
  },
  {
    id: 27,
    q: "'আপনার কাজটা তো অনেক কঠিন'—শোনার পর কী করতে হয়?",
    options: ["আশা ছেড়ে দেওয়া", "বাজেট বাড়ানো", "কেঁদে দেওয়া"],
    a: "বাজেট বাড়ানো"
  },
  {
    id: 28,
    q: "সরকারি অফিসের ফ্যানের সবচেয়ে বড় বৈশিষ্ট্য কী?",
    options: ["খুব স্পিডে ঘোরে", "ঘ্যাঁচ ঘ্যাঁচ শব্দ করে কিন্তু বাতাস নাই", "এসি ফেল"],
    a: "ঘ্যাঁচ ঘ্যাঁচ শব্দ করে কিন্তু বাতাস নাই"
  },
  {
    id: 29,
    q: "ফাইল কোন জায়গা থেকে হাওয়া হয়ে যায়?",
    options: ["টেবিল থেকে ড্রয়ারে", "আলমারি থেকে", "পিয়নের হাত থেকে"],
    a: "টেবিল থেকে ড্রয়ারে"
  },
  {
    id: 30,
    q: "'স্যার তো একটু নামাজে গেছে'—স্যার কখন ফিরবে?",
    options: ["১৫ মিনিট পর", "খাম রেডি হলে", "লাঞ্চের পর"],
    a: "খাম রেডি হলে"
  }
];
const errorMessages = [
  "মামা আপনে তো দেখি পুরাই এআই (AI)! সঠিক লাইনে আসেন।",
  "ভাই, আপনি কি এই দেশের পাবলিক নাকি মঙ্গল গ্রহ থেকে আসছেন?",
  "ধরা খাইছেন মামা! আপনি শিওর সরকারের কোনো দালাল।",
  "এই উত্তর তো স্যারদেরও জানা নাই! আবার ট্রাই নেন।",
  "মনে হয় জীবনে কোনোদিন সরকারি অফিসে যান নাই। আবার চেষ্টা করেন।",
  "পাসপোর্ট অফিসের দালালের কাছে আপনার ট্রেনিং দরকার। ভুল উত্তর!",
  "উফফ! ফাইলে চাকা না লাগায়েই দৌড় দিতে চাইতেছেন? আবার ক্লিক করেন।",
  "আপনার কি মনে হয় উনারা সত্যি সত্যি বাতাস খায়? সঠিকটা বাছেন মিয়া!",
  "এই উত্তর দিলে তো আপনার ফাইল জিন্দেগীতেও নড়বে না! আবার ট্রাই নেন।"
];
const DHAKAIYA_USERNAMES = [
  // --- ওরিজিনাল ওস্তাদ ও ডন সিরিজ ---
  "মিরপুরের মজনু",
  "গুলিস্তানের জেমস বন্ড",
  "গুলশানের গডফাদার",
  "মতিঝিলের মস্তান",
  "ধানমন্ডির ডন",
  "উত্তরা হিরো",
  "পুরান ঢাকার নবাব",
  "ফার্মগেটের ফালতু",
  "বনানীর বস",
  "যাত্রাবাড়ীর যাত্রী",
  "তেজগাঁওয়ের তানিয়া",
  "পল্টনের পল্টু",
  "কাওরান বাজারের ক্যাশিয়ার",
  "চকবাজারের চশমখোর",
  "সদরঘাটের কুলি",
  "গাবতলীর কন্ডাক্টর",
  "مহাখালীর মন্টু ভাই",
  "মোহাম্মদপুরের মাফিয়া",
  "খিলগাঁওয়ের খাদক",
  "বাসাবোর বাটপার",
  "আজিমপুরের আতেল",
  "লালবাগের কেল্লা ফতেহ",
  "মগবাজারের মগা",
  "রামপুরার রোমিও",
  "বাড্ডার বাঁশখোর",
  "খিলখেতের খিটখিটে",
  "কাকরাইলের কাসেম",
  // --- চিপা গলি ও রাস্তাঘাটের পাবলিক ---
  "নীলক্ষেতের ডুপ্লিকেট",
  "শাহবাগের সেলফি কিং",
  "প্রেসক্লাবের টকশো",
  "কমলাপুরের কুলিজ্ঞান",
  "টঙ্গীর টেনশন",
  "সাভারের সন্টু",
  "উত্তরা বারো নাম্বারের বাদশা",
  "মিরপুর ১০ এর মেসি",
  "কুড়িল ফ্লাইওভারের কবি",
  "বসুন্ধরার ব্রো",
  "কদমতলীর কালাচাঁদ",
  "পোস্তগোলার পন্টু",
  "বাবুবাজারের ব্যাপারী",
  "ইসলামপুরের ইবলিশ",
  "পাটুয়াটুলীর চশমা",
  "নয়াবাজারের নাদান",
  "ধোলাইখালের মেকানিক",
  "ওয়ারীর ভিআইপি",
  "স্বামীবাগের সাধু",
  "টিটিপাড়ার টিকিটবক্স",
  // --- চা খোর ও ধান্দাবাজ সিরিজ ---
  "টং দোকানের ট্রাম্প",
  "কড়া চায়ের কাস্টমার",
  "বিস্কুট চুবানো বিল্লাল",
  "রং চায়ের রোবট",
  "ধোঁয়া উঠা ধনা",
  "মামার পকেট কাটা",
  "ঘুষের খাতা মেইন্টেইনার",
  "টেবিলের তলার পাহারাদার",
  "ফাইল আটকানো ফজলু",
  "চা খাওয়ার পয়সা ট্র্যাকার",
  "ডিজিটাল কোপ খাদক",
  "বাঁশ বাগানের বুলবুল",
  "পকেট কাটার পার্টনার",
  "ক্যাশকার্ডের কাঙাল",
  "রিসিপ্ট চোর",
  "সিল মারা সিরাজ",
  // --- খাটি পুরান ঢাকা ও লোকাল স্ল্যাং ভাইব ---
  "ঢাকাইয়া কাউয়া",
  "চিপা গলির চামচিকা",
  "হাতিরঝিলের মজনু",
  "লুঙ্গি পরা লর্ড",
  "মুড়ির টিন ড্রাইভার",
  "লোকাল বাসের ঝুলন্ত মজনু",
  "পাবলিকের পকেটমার",
  "সিএনজি মিটার চোর",
  "রিকশা ভাড়ার দালালি",
  "জ্যামের জাদুকর",
  "রাস্তার ধারের ফিলোসফার",
  "ফুটপাতের হকার",
  "টাকার কুমির",
  "চোরের বাপের ফুফাতো ভাই",
  "নন-ভেজিটেরিয়ান বাঘ",
  "হালখাতার লাল কালি",
  // --- ফানি ক্যাটাগরি ও আধুনিক ঢাকাইয়া মিক্স ---
  "ওয়াইফাই চোর",
  "ফেসবুকের ফাজিল",
  "ইনস্টাগ্রামের ইবলিশ",
  "টিকটকের টর্নেডো",
  "অনলাইন মাস্তান",
  "কীবোর্ড ফাইটার",
  "লাইকের কাঙাল",
  "কমেন্টের কোপাজিশ",
  "ভাইরাল ভাদাইম্মা",
  "মিম মেকার মজনু",
  "ক্যাশলেস ফকির",
  "বিকাশ চোর ফাতরা",
  "স্মার্ট বাটপার",
  "ডিজিটাল দাদাগিরি",
  "আকামের অলরাউন্ডার",
  "নবাবের নাতি",
  "চোরের হাটের দালাল"
];
function getVictimBadge(totalAmount) {
  if (totalAmount < 1e3) {
    return {
      icon: "🥉",
      title: "হালকার ওপর ঝাপসা",
      subtext: "চা-পানির বিল দিয়া কোনোমতে বাইচা গেছেন!",
      color: "text-yellow-600 border-yellow-200 bg-yellow-50/60"
    };
  } else if (totalAmount < 5e3) {
    return {
      icon: "🥈",
      title: "মাঝারি ছ্যাঁকা",
      subtext: "পকেটটা মোটামুটি ভালোই কাটসে। সান্ত্বনা নিবেন!",
      color: "text-gray-500 border-gray-200 bg-gray-50/60"
    };
  } else if (totalAmount <= 1e4) {
    return {
      icon: "🥇",
      title: "পকেট শহীদ",
      subtext: "আপনার এই বিশাল অবদানে স্যারদের আজকের লাঞ্চটা জোস হবে!",
      color: "text-amber-600 border-amber-200 bg-amber-50/60"
    };
  } else {
    return {
      icon: "💀",
      title: "জাতীয় 'ভিআইপি' ডোনার",
      subtext: "আপনার টাকায় তো স্যারদের বিল্ডিংয়ের রড কেনা হবে! আপনাকে পুরাই স্যালুট!",
      color: "text-blue-600 border-blue-200 bg-blue-50/60"
    };
  }
}
function SubmissionSheet() {
  const { isOpen, close } = useSubmissionSheet();
  const [area, setArea] = reactExports.useState("");
  const [subCategory, setSubCategory] = reactExports.useState("");
  const [spot, setSpot] = reactExports.useState("");
  const [isOpenDropdown, setIsOpenDropdown] = reactExports.useState(false);
  const [hoveredCategory, setHoveredCategory] = reactExports.useState("");
  const [activeWhoDropdown, setActiveWhoDropdown] = reactExports.useState(null);
  const [combos, setCombos] = reactExports.useState([{ who: "", amount: "" }]);
  const [eventDate, setEventDate] = reactExports.useState("today");
  const [customDate, setCustomDate] = reactExports.useState("");
  const [rating, setRating] = reactExports.useState(0);
  const [hoverRating, setHoverRating] = reactExports.useState(0);
  const [error, setError] = reactExports.useState(null);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [localSubmissionCount, setLocalSubmissionCount] = reactExports.useState(0);
  const getLocalSubmissionsInLast24Hours = () => {
    try {
      const stored = localStorage.getItem("dhakaiya_submissions");
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      const now = (/* @__PURE__ */ new Date()).getTime();
      return parsed.map((t) => new Date(t).getTime()).filter((t) => now - t < 24 * 60 * 60 * 1e3);
    } catch {
      return [];
    }
  };
  const recordLocalSubmission = () => {
    try {
      const active = getLocalSubmissionsInLast24Hours();
      const updated = [...active, (/* @__PURE__ */ new Date()).getTime()];
      localStorage.setItem("dhakaiya_submissions", JSON.stringify(updated.map((t) => new Date(t).toISOString())));
      setLocalSubmissionCount(updated.length);
    } catch (e) {
      console.warn("localStorage write failed", e);
    }
  };
  const [showMemo, setShowMemo] = reactExports.useState(false);
  const [submittedData, setSubmittedData] = reactExports.useState(null);
  const [captchaChallenge, setCaptchaChallenge] = reactExports.useState(() => CAPTCHA_CHALLENGES[Math.floor(Math.random() * CAPTCHA_CHALLENGES.length)]);
  const [selectedCaptchaOption, setSelectedCaptchaOption] = reactExports.useState(null);
  const [captchaSolved, setCaptchaSolved] = reactExports.useState(false);
  const [errorMessage, setErrorMessage] = reactExports.useState("");
  const [details, setDetails] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (isOpen) {
      const active = getLocalSubmissionsInLast24Hours();
      setLocalSubmissionCount(active.length);
      const rand = CAPTCHA_CHALLENGES[Math.floor(Math.random() * CAPTCHA_CHALLENGES.length)];
      setCaptchaChallenge(rand);
      setSelectedCaptchaOption(null);
      setCaptchaSolved(false);
      setErrorMessage("");
      setArea("");
      setSubCategory("");
      setSpot("");
      setCombos([{ who: "", amount: "" }]);
      setEventDate("today");
      setCustomDate("");
      setRating(0);
      setHoverRating(0);
      setError(null);
      setDetails("");
      setShowMemo(false);
      setSubmittedData(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);
  function submit(e) {
    e.preventDefault();
    const bad = combos.some((c) => c.who && !c.amount);
    if (bad) {
      setError("ফ্রি সার্ভিস পাইছেন নাকি? টাকার ফিগার বসান!");
      return;
    }
    if (!captchaSolved) {
      setError("মামা রোবট নাকি পাবলিক? প্রুফ দিয়া যান!");
      return;
    }
    setError(null);
    const activeCombos = combos.filter((c) => c.who && c.amount);
    if (activeCombos.length === 0) {
      setError("কমপক্ষে একটা টেবিলে তো কোপ খাইছেন, সেইটা তো লিখবেন!");
      return;
    }
    const author = DHAKAIYA_USERNAMES[Math.floor(Math.random() * DHAKAIYA_USERNAMES.length)];
    const uniqueId = `MEMO-${Math.floor(1e5 + Math.random() * 9e5)}`;
    const dateObj = /* @__PURE__ */ new Date();
    const dateStr = dateObj.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const badge = getVictimBadge(totalAmount);
    setIsSubmitting(true);
    const insertRecord = async () => {
      try {
        const response = await fetch("/api/submit-report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            author,
            officeName: spot || "অন্যান্য সরকারি অফিস",
            area,
            totalAmount,
            teaCups: rating,
            badgeTitle: badge.title,
            comments: details,
            items: activeCombos.map((c) => ({ who: c.who, amount: parseFloat(c.amount) })),
            category: subCategory || "অন্যান্য",
            captchaQuestionId: captchaChallenge.id,
            userSelectedAnswer: selectedCaptchaOption
          })
        });
        const result = await response.json();
        if (!response.ok) {
          const errMsg = result.error || "সাবমিট করতে সমস্যা হয়েছে!";
          if (response.status === 429) {
            toast.error("সীমা অতিক্রম! 🚫", {
              description: errMsg,
              duration: 6e3
            });
          } else {
            toast.error("সাবমিট ব্যর্থ 😬", {
              description: errMsg,
              duration: 5e3
            });
          }
          setIsSubmitting(false);
          return;
        }
        console.log("✅ API submit success:", result);
        setSubmittedData({
          author,
          area,
          spot: spot || "অন্যান্য সরকারি অফিস",
          combos: activeCombos,
          totalAmount,
          dateStr,
          uniqueId
        });
        recordLocalSubmission();
        if (result.demoMode) {
          toast.success("মেমো রেডি মামা! ✅", {
            description: "লোকাল ডেমো মোডে আছেন, মেমোটা ডাউনলোড বা শেয়ার করে নেন!",
            duration: 3500
          });
        } else {
          toast.success("কোপের খবর সাবমিট হইছে! ✅", {
            description: "আপনার রিপোর্ট পাবলিক রাডারে যোগ হইয়া গেছে।",
            duration: 3500
          });
        }
        setShowMemo(true);
      } catch (err) {
        console.warn("⚠️ API submit error catch wrapper:", err.message || err);
        toast.error("নেটওয়ার্ক সমস্যা 😓", {
          description: "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না। দয়া করে ইন্টারনেট কানেকশন চেক করুন!",
          duration: 5e3
        });
      } finally {
        setIsSubmitting(false);
      }
    };
    insertRecord();
  }
  const downloadMemo = async () => {
    const element = document.getElementById("vip-memo-container");
    if (!element) return;
    try {
      const html2canvasFn = typeof html2canvas === "function" ? html2canvas : html2canvas.default;
      if (typeof html2canvasFn !== "function") {
        throw new Error("html2canvas is not a function or failed to load");
      }
      const renderWidth = 375;
      const clone = element.cloneNode(true);
      clone.style.position = "fixed";
      clone.style.top = "0";
      clone.style.left = "-9999px";
      clone.style.width = renderWidth + "px";
      clone.style.height = "auto";
      clone.style.overflow = "visible";
      document.body.appendChild(clone);
      const canvas = await html2canvasFn(clone, {
        backgroundColor: "#FDFAF4",
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: renderWidth,
        width: renderWidth
      });
      document.body.removeChild(clone);
      const imgData = canvas.toDataURL("image/png");
      if (!imgData || imgData === "data:,") {
        throw new Error("Canvas export returned empty data");
      }
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `ভিআইপি_আপ্যায়ন_বিল_${submittedData?.uniqueId || "bribe"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("মেমো ডাউনলোড শুরু হইছে! 📥");
    } catch (err) {
      console.error("Error generating image:", err);
      toast.error("মেমো জেনারেট করতে সমস্যা হইসে মামা! আবার ট্রাই মারেন।", {
        description: err?.message || String(err),
        duration: 8e3
      });
    }
  };
  const shareToFacebook = async () => {
    if (!submittedData) return;
    const shareText = `ওস্তাদ! ${submittedData.spot}-এ বড় স্যার ও দালালদের আপ্যায়ন করতে মোট ৳${submittedData.totalAmount.toLocaleString("bn-BD")} টাকার 'চা-পানি' বিল দিতে হইসে! দেশের এই আজব হিসাবের খাতা দেখেন! ⚖️`;
    const siteUrl = window.location.origin;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "আন-অফিসিয়াল 'ভিআইপি আপ্যায়ন' বিল",
          text: shareText,
          url: siteUrl
        });
        return;
      } catch (err) {
        console.log("Native share failed/cancelled, falling back to Facebook sharer URL.", err);
      }
    }
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(fbShareUrl, "_blank", "noopener,noreferrer");
  };
  const handleCloseMemo = () => {
    setShowMemo(false);
    setSubmittedData(null);
    close();
  };
  const totalAmount = combos.reduce((sum, c) => {
    const amt = parseFloat(c.amount) || 0;
    return sum + amt;
  }, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: close,
        className: "fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
        transition: { type: "spring", damping: 28, stiffness: 280 },
        className: "fixed inset-x-0 bottom-0 z-[70] max-h-[92dvh] overflow-y-auto rounded-t-3xl bg-white p-6 pb-10 shadow-2xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gray-800", children: "খুইলা কন মিয়া" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: close, className: "grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-gray-100 bg-gray-50/30 p-4.5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-bold text-gray-800 leading-none", children: "কোন চিপায় ধরা খাইলেন?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-gray-500", children: "এলাকা বা জেলার নাম কন" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, strokeWidth: 2.2 }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        value: area,
                        onChange: (e) => setArea(e.target.value),
                        placeholder: "যেমন: মিরপুর...",
                        className: "w-full rounded-xl border border-gray-200 bg-white pl-8.5 pr-2.5 py-3 text-xs sm:text-sm text-gray-800 transition placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-gray-500 truncate", children: "কোন অফিসে বা স্পটে?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setIsOpenDropdown(!isOpenDropdown);
                        if (!isOpenDropdown) {
                          setHoveredCategory(subCategory || SPOT_OPTIONS[0]?.category || "");
                        }
                      },
                      className: "flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-2.5 py-3 text-left text-xs sm:text-sm text-gray-800 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: spot ? `📍 ${spot}` : subCategory ? `📂 ${subCategory.split(" (")[0]}...` : "খাত বা ক্যাটাগরি..." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14, className: `text-gray-400 transition-transform ${isOpenDropdown ? "rotate-180" : ""}` })
                      ]
                    }
                  ),
                  isOpenDropdown && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "fixed inset-0 z-40 bg-transparent",
                        onClick: () => setIsOpenDropdown(false)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-full z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-gray-150 bg-white shadow-xl animate-in fade-in slide-in-from-top-1 duration-150", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1", children: SPOT_OPTIONS.map((group) => {
                      const isExpanded = hoveredCategory === group.category;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg overflow-hidden mb-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            onMouseEnter: () => setHoveredCategory(group.category),
                            onClick: () => {
                              if (hoveredCategory === group.category) {
                                setHoveredCategory("");
                              } else {
                                setHoveredCategory(group.category);
                              }
                            },
                            className: `cursor-pointer px-3 py-2 text-xs font-bold flex items-center justify-between transition-colors ${isExpanded ? "bg-[#00BCD4]/10 text-[#00838F]" : "text-gray-700 hover:bg-gray-50"}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                                "📂 ",
                                group.category
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                ChevronDown,
                                {
                                  size: 12,
                                  className: `text-gray-400 transition-transform duration-200 shrink-0 ${isExpanded ? "rotate-180 text-[#00BCD4]" : ""}`
                                }
                              )
                            ]
                          }
                        ),
                        isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50/50 pl-5 pr-2 py-1 space-y-0.5 border-t border-gray-100 animate-in slide-in-from-top-1 duration-100", children: group.options.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => {
                              setSubCategory(group.category);
                              setSpot(s);
                              setIsOpenDropdown(false);
                            },
                            className: "flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-[11px] text-gray-600 transition-colors hover:bg-[#00BCD4]/5 hover:text-[#00BCD4] font-medium",
                            children: [
                              "📍 ",
                              s
                            ]
                          },
                          s
                        )) })
                      ] }, group.category);
                    }) }) })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-gray-700", children: "কবেকার ঘটনা?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: ["আজকে", "গতকাল", "আগে"].map((opt, idx) => {
                const val = ["today", "yesterday", "before"][idx];
                const active = eventDate === val;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setEventDate(val),
                    className: `rounded-2xl py-3.5 text-center text-xs font-semibold border transition ${active ? "border-[#E91E63] bg-rose-50 text-[#E91E63] font-bold" : "border-gray-200 bg-gray-50/50 text-gray-600 hover:bg-gray-100/50"}`,
                    children: opt
                  },
                  val
                );
              }) }),
              eventDate === "before" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 animate-in fade-in slide-in-from-top-1 duration-150", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "date",
                  value: customDate,
                  onChange: (e) => setCustomDate(e.target.value),
                  className: "w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm text-gray-800 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-gray-700", children: "স্যারদের কত টাকার 'চা-পানি' করাইলেন?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: combos.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setActiveWhoDropdown(activeWhoDropdown === i ? null : i);
                      },
                      className: "flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-left text-sm text-gray-800 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: c.who ? `👤 ${c.who}` : "কোন টেবিলে/স্যারকে দিলেন?" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14, className: `text-gray-400 transition-transform ${activeWhoDropdown === i ? "rotate-180" : ""}` })
                      ]
                    }
                  ),
                  activeWhoDropdown === i && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "fixed inset-0 z-40 bg-transparent",
                        onClick: () => setActiveWhoDropdown(null)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-2xl border border-gray-150 bg-white p-1.5 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400", children: "🏛️ সরকারি কর্মকর্তা" }),
                      WHO_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            const v = [...combos];
                            v[i].who = o;
                            setCombos(v);
                            setActiveWhoDropdown(null);
                          },
                          className: `flex w-full items-center rounded-xl px-2.5 py-2 text-left text-xs transition-colors ${c.who === o ? "bg-[#00BCD4]/10 text-[#00838F] font-semibold" : "text-gray-700 hover:bg-gray-50"}`,
                          children: [
                            "👤 ",
                            o
                          ]
                        },
                        o
                      ))
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: c.amount,
                    onChange: (e) => {
                      const v = [...combos];
                      v[i].amount = e.target.value;
                      setCombos(v);
                    },
                    inputMode: "numeric",
                    placeholder: "মিষ্টির বিল কত? (৳)",
                    className: "rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm placeholder:text-gray-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30"
                  }
                )
              ] }, i)) }),
              combos.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex justify-between items-center rounded-2xl bg-rose-50/50 border border-rose-100/50 px-4 py-3.5 text-sm font-bold text-[#E91E63] animate-in fade-in duration-200", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "সর্বমোট 'সম্মানী':" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
                  "৳ ",
                  totalAmount.toLocaleString("bn-BD")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setCombos([...combos, { who: "", amount: "" }]),
                  className: "mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00BCD4] transition hover:text-[#00BCD4]/80",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
                    " + অন্য টেবিলেও কি 'সম্মানী' লাগছে?"
                  ]
                }
              ),
              error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs font-medium text-[#E91E63]", children: error })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-gray-700", children: "স্যারদের 'চা-পিপাসা' রেটিং করেন:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50/30 p-4.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: [1, 2, 3, 4, 5].map((index) => {
                  const isFilled = (hoverRating || rating) >= index;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onMouseEnter: () => setHoverRating(index),
                      onMouseLeave: () => setHoverRating(0),
                      onClick: () => setRating(index),
                      className: "transition-transform active:scale-90 duration-150 cursor-pointer",
                      style: { color: isFilled ? "#FFAA00" : "#D1D5DB" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(TeaCupIcon, { filled: isFilled })
                    },
                    index
                  );
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-sm font-extrabold text-gray-800 transition-all duration-150 min-h-[1.25rem]", children: [
                  rating === 1 && "হালকা চা-পানি",
                  rating === 2 && "গলা শুকনা ছিল",
                  rating === 3 && "চুমুকে চুমুকে কোপ",
                  rating === 4 && "কলিজা শুকায়া দিসে",
                  rating === 5 && "রক্ত চুইষা খাইসে!",
                  rating === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400 font-medium", children: hoverRating > 0 ? hoverRating === 1 ? "হালকা চা-পানি" : hoverRating === 2 ? "গলা শুকনা ছিল" : hoverRating === 3 ? "চুমুকে চুমুকে কোপ" : hoverRating === 4 ? "কলিজা শুকায়া দিসে" : "রক্ত চুইষা খাইসে!" : "রেটিং দিতে ট্যাপ করুন" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-gray-700", children: "ডিটেইলস কন মিয়া..." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: details,
                  onChange: (e) => setDetails(e.target.value),
                  rows: 4,
                  placeholder: "পুরা ঘটনাটা বলেন...",
                  className: "w-full resize-none rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm leading-relaxed placeholder:text-gray-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-4 flex gap-3 rounded-2xl border border-amber-250 bg-amber-50/70 p-4 text-left shadow-sm items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg shrink-0 select-none leading-none mt-0.5", children: "⚠️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-amber-900 leading-normal py-0.5", children: "⚠️ ওস্তাদ, একটা সিরিয়াস কথা!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-amber-800 leading-relaxed py-0.5", children: "দয়া কইরা হুদা কামে ফেইক বা ভুয়া ইনফো দিয়েন না। কারো লগে পার্সোনাল শত্রুতা মিটাইতে উল্টাপাল্টা হিসাব দিলে আসল চোরেরা পার পাইয়া যাবে। একদম জেনুইন যেই বাঁশ খাইছেন, শুধু ওইটাই সাবমিট করেন। ফাউল খেললে রাডার নষ্ট হয়ে যাবে!" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-gray-150 bg-gray-50/50 p-4.5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-gray-750", children: "🤖 রোবট নাকি আসল পাবলিক? প্রমাণ দেন:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-extrabold tracking-wider text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100/50", children: "জরুরী যাচাই" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-gray-600 bg-white rounded-xl px-3 py-2.5 border border-gray-100 shadow-sm leading-relaxed", children: [
                "❓ ",
                captchaChallenge.q
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: captchaChallenge.options.map((opt) => {
                const isSelected = selectedCaptchaOption === opt;
                const isCorrect = opt === captchaChallenge.a;
                let btnStyle = "border-gray-300 text-gray-600 bg-white hover:border-gray-400 hover:bg-gray-50";
                if (isSelected) {
                  if (isCorrect) {
                    btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-sm";
                  } else {
                    btnStyle = "border-rose-400 bg-rose-50 text-rose-600 font-bold shadow-sm";
                  }
                }
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setSelectedCaptchaOption(opt);
                      if (isCorrect) {
                        setCaptchaSolved(true);
                        setErrorMessage("");
                      } else {
                        setCaptchaSolved(false);
                        setErrorMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
                      }
                    },
                    className: `rounded-xl py-2.5 text-center text-xs font-medium border transition-all duration-200 active:scale-[0.97] ${btnStyle}`,
                    children: opt
                  },
                  opt
                );
              }) }),
              errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.p,
                {
                  initial: { x: 0 },
                  animate: { x: [-10, 10, -10, 10, -5, 5, -2, 2, 0] },
                  transition: { duration: 0.5 },
                  className: "text-red-500 font-bold mt-2 text-sm text-center flex items-center justify-center gap-1 leading-relaxed",
                  children: [
                    "⚠️ ",
                    errorMessage
                  ]
                },
                errorMessage
              ),
              captchaSolved && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in duration-200 justify-center", children: "✅ পারফেক্ট মামা! আপনি খাঁটি পাবলিক।" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              localSubmissionCount >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-2 flex gap-3 rounded-2xl border border-rose-250 bg-rose-50/70 p-4 text-left shadow-sm items-start animate-pulse", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg shrink-0 select-none leading-none mt-0.5", children: "🚫" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-rose-900 leading-normal py-0.5", children: "🚫 ওস্তাদ, আজকের কোটা শেষ!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-rose-800 leading-relaxed py-0.5", children: "২৪ ঘণ্টায় ২ বারের বেশি রিপোর্ট করা যাবে না। শান্ত হোন মামা! কালকে আবার ফ্রেশ খবর নিয়া আইসেন।" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  disabled: !captchaSolved || localSubmissionCount >= 2 || isSubmitting,
                  className: `w-full rounded-2xl py-4 text-lg font-extrabold text-white shadow-lg active:scale-[0.99] transition-all duration-200 ${!captchaSolved || localSubmissionCount >= 2 || isSubmitting ? "opacity-50 cursor-not-allowed bg-gray-300 pointer-events-none" : "hover:shadow-xl hover:brightness-105"} ${isSubmitting ? "animate-pulse" : ""}`,
                  style: captchaSolved && localSubmissionCount < 2 && !isSubmitting ? { background: "linear-gradient(90deg, #E91E63, #FFB300)" } : void 0,
                  children: isSubmitting ? "দাঁড়ান ওস্তাদ, কোপটা বসতাছে... ⏳" : localSubmissionCount >= 2 ? "কোটা শেষ মামা!" : "পাবলিকের সামনে ন্যাংটা করেন!"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium leading-normal py-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-3.5 w-3.5 text-gray-400 shrink-0", fill: "currentColor", viewBox: "0 0 20 20", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "py-0.5", children: "আপনার পরিচয় ১০০% গোপন (Ghost Protocol) থাকবে। কোনো প্যারা নাই!" })
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black/45 backdrop-blur-md",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { scale: 0.9, y: 20 },
            animate: { scale: 1, y: 0 },
            exit: { scale: 0.9, y: 20 },
            className: "flex flex-col items-center justify-center max-w-sm rounded-3xl bg-white/90 border border-white/40 p-8 shadow-2xl text-center space-y-4 m-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center w-20 h-20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-gradient-to-tr from-[#E91E63] to-[#FFB300] opacity-20 animate-ping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-2 rounded-full bg-gradient-to-bl from-[#00BCD4] to-[#00838F] opacity-15 animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full border-4 border-gray-150 border-t-amber-500 border-r-[#E91E63] animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute text-2xl animate-bounce", children: "☕" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black text-gray-800 leading-tight", children: "হিসাবটা ক্যাশ মেমোতে তুলতেছি, একটু দম লন!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gray-500", children: "সার্ভারের বড় স্যার খাম চেক করতেছেন... 🤫" })
              ] })
            ]
          }
        )
      }
    ) }),
    showMemo && submittedData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "fixed inset-0 cursor-pointer",
          onClick: handleCloseMemo
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.9, opacity: 0 },
          transition: { type: "spring", damping: 25, stiffness: 300 },
          className: "relative flex flex-col items-center max-w-sm w-full bg-[#FAF8F5] rounded-3xl border border-gray-200/50 p-4 sm:p-5 shadow-2xl space-y-4 z-10 select-none",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                id: "vip-memo-container",
                className: "w-full bg-[#FDFAF4] border-2 border-red-700/60 p-4 font-sans text-red-800 space-y-4 relative overflow-hidden",
                style: {
                  backgroundColor: "#FDFAF4"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      "data-html2canvas-ignore": "true",
                      className: "absolute inset-0 opacity-[0.03] pointer-events-none",
                      style: {
                        backgroundImage: "linear-gradient(red 1px, transparent 1px)",
                        backgroundSize: "100% 20px"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      "data-html2canvas-ignore": "true",
                      className: "absolute inset-0 opacity-[0.03] pointer-events-none",
                      style: {
                        backgroundImage: "linear-gradient(90deg, red 1px, transparent 1px)",
                        backgroundSize: "20px 100%"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1 relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black tracking-widest text-red-700/60", children: "॥ বিসমিল্লাহির রহমানির রাহিম ॥" }),
                    (() => {
                      const badge = getVictimBadge(submittedData.totalAmount);
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `my-2.5 p-3 rounded-2xl border text-center transition-all duration-300 shadow-sm leading-normal py-0.5 ${badge.color}`, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-black tracking-wider uppercase opacity-75 mb-0.5 leading-normal py-0.5", children: "🏆 অর্জন আনলকড! (Victim Badge)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 text-xs sm:text-sm font-extrabold leading-normal py-0.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: badge.icon }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: badge.title })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] font-semibold opacity-90 leading-normal py-0.5", children: [
                          '"',
                          badge.subtext,
                          '"'
                        ] })
                      ] });
                    })(),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-black tracking-tight text-red-700 border-b-2 border-red-700/40 pb-1.5 uppercase", children: "আন-অফিসিয়াল 'ভিআইপি আপ্যায়ন' বিল" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold space-y-1 relative border-b border-dashed border-red-700/40 pb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "তারিখ: ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-800 font-extrabold", children: submittedData.dateStr })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-red-700/70", children: [
                        "নং: ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-800 font-extrabold", children: submittedData.uniqueId })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "ডোনার: ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-800 font-extrabold", children: submittedData.author })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "অফিস: ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-800 font-extrabold", children: submittedData.spot })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "এলাকা: ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-800 font-extrabold", children: submittedData.area })
                    ] }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto] border-b-2 border-red-700 pb-1 font-extrabold uppercase tracking-wide", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "বিবরণ" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "পরিমাণ" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-red-700/30 border-b border-red-700/50", children: submittedData.combos.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto] py-2 text-gray-800 font-semibold items-baseline", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        item.who,
                        " এর চা-পানি"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-extrabold tabular-nums", children: [
                        "৳ ",
                        parseFloat(item.amount).toLocaleString("bn-BD")
                      ] })
                    ] }, index)) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2.5 border-t-2 border-red-700/70 flex flex-col items-end relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-black text-red-700/70 tracking-widest leading-none", children: "সর্বমোট গলাকাটা বিল" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-black text-red-600 mt-1 tabular-nums leading-normal py-0.5", children: [
                      "৳ ",
                      submittedData.totalAmount.toLocaleString("bn-BD")
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "absolute right-4 bottom-20 opacity-85 select-none pointer-events-none border-[3px] border-dashed border-red-600/80 rounded-2xl px-3 py-1 font-black text-red-600 text-sm tracking-widest text-center shadow-sm",
                      style: { transform: "rotate(-12deg)" },
                      children: [
                        "৳ পরিশোধিত ৳",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-wider font-extrabold opacity-95", children: "(খাম রেডি)" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-bold leading-relaxed text-red-800/70 border-t border-dashed border-red-700/30 pt-2 text-center", children: "বিঃদ্রঃ এই বিল পাবলিকের কথা অনুযায়ী বানানো। আমরা শুধু হিসাব রাখি। পরিশোধিত লেখা না থাকলে কাজ হবে না।" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full space-y-2 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: downloadMemo,
                  className: "w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-600 hover:bg-amber-700 transition active:scale-[0.99] text-white py-3.5 text-sm font-extrabold shadow-md hover:shadow-lg duration-150 cursor-pointer",
                  children: "📥 মেমো ডাউনলোড করেন"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: shareToFacebook,
                  className: "w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 transition active:scale-[0.99] text-white py-3.5 text-sm font-extrabold shadow-md hover:shadow-lg duration-150 cursor-pointer",
                  children: "👥 ফেসবুকে শেয়ার মারেন!"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: handleCloseMemo,
                  className: "w-full flex items-center justify-center gap-1.5 rounded-2xl bg-gray-100 hover:bg-gray-200 transition text-gray-700 py-3 text-xs font-bold duration-150 border border-gray-200 cursor-pointer",
                  children: "ড্যাশবোর্ডে ফেরত যান"
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] }) });
}
const SearchCtx = reactExports.createContext(null);
function useSearch() {
  const context = reactExports.useContext(SearchCtx);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
function SearchProvider({ children }) {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const open = () => {
    setIsOpen(true);
    setSearchQuery("");
  };
  const close = () => {
    setIsOpen(false);
    setSearchQuery("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SearchCtx.Provider, { value: { isOpen, open, close, searchQuery, setSearchQuery }, children: [
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchOverlay, {})
  ] });
}
const POPULAR_TAGS = [
  { label: "বিআরটিএ", color: "bg-red-50 text-red-600 border-red-100 hover:bg-red-100/50" },
  { label: "গুলশান", color: "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100/50" },
  { label: "পাসপোর্ট", color: "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100/50" },
  { label: "থানা", color: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100/50" },
  { label: "ওয়াসা", color: "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100/50" }
];
function SearchOverlay() {
  const { isOpen, close, searchQuery, setSearchQuery } = useSearch();
  const inputRef = reactExports.useRef(null);
  const [selectedReview, setSelectedReview] = reactExports.useState(null);
  const [selectedOffice, setSelectedOffice] = reactExports.useState(null);
  const [liveReviews, setLiveReviews] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  reactExports.useEffect(() => {
    if (isOpen && isSupabaseConfigured) {
      async function loadLiveReviews() {
        try {
          const { data, error } = await supabase.from("bribe_reports").select("*").order("id", { ascending: false });
          if (error) {
            console.warn("Supabase fetch failed in SearchOverlay, using mock data.", error);
          } else if (data && data.length > 0) {
            const mapped = data.map((item, index) => {
              const ratingLabels = {
                1: "হালকা চা-পানি",
                2: "গলা শুকনা ছিল",
                3: "চুমুকে চুমুকে কোপ",
                4: "কলিজা শুকায়া দিসে",
                5: "রক্ত চুইষা খাইসে!"
              };
              let formattedItems = [];
              if (Array.isArray(item.items)) {
                formattedItems = item.items.map((c) => ({
                  label: c.label || c.who || "চা-পানি ফি",
                  amount: parseFloat(c.amount) || 0
                }));
              }
              return {
                id: item.id || String(index),
                author: item.author || "অজ্ঞাত পাবলিক",
                location: item.officeName || "সরকারি অফিস",
                area: item.area || "",
                timeAgo: "আজকে",
                rating: item.teaCups || 3,
                ratingLabel: ratingLabels[item.teaCups] || "চুমুকে চুমুকে কোপ",
                category: item.category || "অন্যান্য",
                items: formattedItems,
                total: item.totalAmount || 0,
                story: item.comments || "",
                sames: item.sames !== void 0 ? item.sames : Math.floor(Math.random() * 30) + 2
              };
            });
            setLiveReviews(mapped);
          }
        } catch (err) {
          console.warn("Error fetching live reviews inside SearchOverlay:", err);
        }
      }
      loadLiveReviews();
    }
  }, [isOpen]);
  if (!isOpen) return null;
  const filteredReviews = liveReviews.filter((review) => {
    if (!searchQuery.trim()) return false;
    const query = searchQuery.toLowerCase();
    const matchesLocation = review.location.toLowerCase().includes(query);
    const matchesAuthor = review.author.toLowerCase().includes(query);
    const matchesStory = review.story.toLowerCase().includes(query);
    const matchesCategory = review.category.toLowerCase().includes(query);
    const matchesItems = review.items.some(
      (item) => item.label.toLowerCase().includes(query)
    );
    return matchesLocation || matchesAuthor || matchesStory || matchesCategory || matchesItems;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[100] flex justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: close,
        className: "absolute inset-0 bg-black/35 backdrop-blur-[6px]"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { y: "-30px", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "-30px", opacity: 0 },
        transition: { type: "spring", damping: 25, stiffness: 220 },
        className: "relative z-[110] flex h-full w-full max-w-[480px] flex-col bg-transparent",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-[120] p-4 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 bg-white/80 backdrop-blur-2xl border border-white/45 rounded-2xl p-2.5 shadow-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16, strokeWidth: 2.2 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: inputRef,
                    type: "text",
                    value: searchQuery,
                    onChange: (e) => {
                      setSearchQuery(e.target.value);
                      setSelectedReview(null);
                      setSelectedOffice(null);
                    },
                    placeholder: "কোন চিপায় কোপ খাইছেন? খুঁজুন...",
                    className: "w-full rounded-xl border border-gray-200 bg-white/50 pl-9 pr-8 py-2.5 text-xs font-semibold text-gray-800 transition placeholder:text-gray-400 focus:border-[#00BCD4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/10"
                  }
                ),
                searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => {
                      setSearchQuery("");
                      setSelectedReview(null);
                      setSelectedOffice(null);
                    },
                    className: "absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-200/50 p-1 text-gray-500 hover:bg-gray-200 active:scale-95 transition",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12, strokeWidth: 2.5 })
                  }
                ),
                searchQuery.trim() && !selectedReview && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 top-full z-[130] mt-3.5 max-h-[300px] overflow-y-auto rounded-2xl border border-white/50 bg-white/85 backdrop-blur-3xl p-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200", children: filteredReviews.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 pb-1.5 flex items-center justify-between text-[10px] font-extrabold text-gray-400 uppercase tracking-wider", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "কাঙ্ক্ষিত দফতর সমুহ" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#E91E63] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100/50 font-bold", children: [
                      filteredReviews.length,
                      " টি ম্যাচ"
                    ] })
                  ] }),
                  filteredReviews.map((review) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setSelectedOffice(review);
                        setSearchQuery("");
                      },
                      className: "flex w-full flex-col gap-1 rounded-xl bg-white/40 hover:bg-white/90 p-2.5 text-left transition duration-150 border border-transparent hover:border-gray-200/50 active:scale-[0.99] cursor-pointer",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between w-full", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-black text-gray-800 truncate max-w-[180px] py-0.5 leading-normal", children: [
                            "📍 ",
                            review.location
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-black text-[#E91E63] tabular-nums py-0.5 leading-normal", children: [
                            "৳",
                            review.total.toLocaleString("bn-BD")
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-gray-500 line-clamp-1 font-semibold leading-relaxed", children: review.story })
                      ]
                    },
                    review.id
                  ))
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 px-4 text-center space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-extrabold text-red-500", children: "কোনো কোপ পাওয়া যায় নাই! 😭" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-500 leading-relaxed font-semibold", children: "এই দফতরে কোনো দুর্নীতির রেকর্ড নেই। অন্য কোনো কী-ওয়ার্ড দিয়ে ট্রাই করেন।" })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: close,
                  className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gray-150/40 text-gray-650 hover:bg-gray-200 active:scale-95 transition",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, strokeWidth: 2.2 })
                }
              )
            ] }),
            !searchQuery.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 flex flex-wrap items-center gap-2 bg-white/70 backdrop-blur-xl border border-white/40 rounded-xl p-2.5 shadow-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-gray-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 11, className: "text-amber-500" }),
                " হটস্পট:"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: POPULAR_TAGS.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => {
                    setSearchQuery(tag.label);
                    setSelectedReview(null);
                    setSelectedOffice(null);
                  },
                  className: `rounded-full border px-2 py-0.5 text-[10px] font-extrabold transition-all duration-200 active:scale-95 cursor-pointer ${tag.color}`,
                  children: [
                    "#",
                    tag.label
                  ]
                },
                tag.label
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto pb-24 pt-2", children: selectedReview ? (
            // When a small card is tapped, show ONLY the large detailed card here
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in fade-in zoom-in-95 duration-250", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-2 flex items-center justify-between text-xs font-bold text-gray-400 tracking-wider uppercase", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1.5 text-rose-600 font-extrabold", children: "🔥 ডিটেইলস কোপ কাহিনী" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setSelectedReview(null),
                    className: "text-[#E91E63] bg-rose-50 hover:bg-rose-100 px-3.5 py-1.5 rounded-full border border-rose-100/50 font-extrabold transition active:scale-95 text-[11px] cursor-pointer flex items-center gap-1 shadow-sm",
                    children: "⬅️ ফিরে যান"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "transition-all duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review: selectedReview }) })
            ] })
          ) : !searchQuery.trim() ? selectedOffice ? /* @__PURE__ */ jsxRuntimeExports.jsx(OfficeDetailsCard, { data: selectedOffice, liveReviews }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptySearchState, {}) : null })
        ]
      }
    )
  ] }) });
}
function BribeRadarIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "72",
      height: "72",
      viewBox: "0 0 100 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "select-none",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.path,
          {
            d: "M 20 25 A 40 40 0 0 1 80 25",
            fill: "none",
            stroke: "#F59E0B",
            strokeWidth: "3",
            strokeDasharray: "6 4",
            strokeLinecap: "round",
            animate: { opacity: [0.3, 0.9, 0.3], scale: [0.95, 1.05, 0.95] },
            transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.path,
          {
            d: "M 30 35 A 25 25 0 0 1 70 35",
            fill: "none",
            stroke: "#F59E0B",
            strokeWidth: "2.5",
            strokeDasharray: "4 3",
            strokeLinecap: "round",
            animate: { opacity: [0.2, 0.7, 0.2] },
            transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "translate(14, 38) rotate(-10)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "2",
              y: "4",
              width: "52",
              height: "34",
              rx: "3",
              fill: "#1F2937",
              opacity: "0.15"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "0",
              y: "0",
              width: "52",
              height: "34",
              rx: "3",
              fill: "#9CA3AF",
              stroke: "#4B5563",
              strokeWidth: "3.5",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M 0 0 L 26 18 L 52 0",
              fill: "none",
              stroke: "#4B5563",
              strokeWidth: "3.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M 0 34 L 18 19",
              fill: "none",
              stroke: "#4B5563",
              strokeWidth: "3.5",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M 52 34 L 34 19",
              fill: "none",
              stroke: "#4B5563",
              strokeWidth: "3.5",
              strokeLinecap: "round"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.g,
          {
            animate: {
              x: [0, 6, -4, 0],
              y: [0, -5, 3, 0]
            },
            transition: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "64",
                  y1: "58",
                  x2: "84",
                  y2: "78",
                  stroke: "#EA580C",
                  strokeWidth: "8.5",
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "72",
                  y1: "66",
                  x2: "82",
                  y2: "76",
                  stroke: "#9A3412",
                  strokeWidth: "8.5",
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: "48",
                  cy: "42",
                  r: "19",
                  fill: "none",
                  stroke: "#1F2937",
                  strokeWidth: "5",
                  opacity: "0.1",
                  transform: "translate(2, 3)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: "48",
                  cy: "42",
                  r: "19",
                  fill: "#FEF3C7",
                  fillOpacity: "0.85",
                  stroke: "#EA580C",
                  strokeWidth: "4.5"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: "48",
                  y: "50",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: "900",
                  fontSize: "24",
                  fill: "#C2410C",
                  textAnchor: "middle",
                  className: "select-none font-extrabold",
                  children: "৳"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M 36 34 A 14 14 0 0 1 52 28",
                  fill: "none",
                  stroke: "#FFFFFF",
                  strokeWidth: "2.5",
                  strokeLinecap: "round",
                  opacity: "0.65"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function EmptySearchState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center p-8 text-center h-[50vh] space-y-5 animate-in fade-in duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        animate: {
          y: [0, -8, 0]
        },
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        },
        className: "rounded-full bg-orange-50 p-6 border border-orange-100/50 text-orange-500 shadow-inner flex items-center justify-center",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(BribeRadarIcon, {})
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-extrabold text-gray-800", children: "কার আমলনামা খুঁজতাছেন?" }) })
  ] });
}
function OfficeDetailsCard({ data, liveReviews }) {
  const { close } = useSearch();
  const submissionSheet = useSubmissionSheet();
  const officeReviews = liveReviews.filter(
    (r) => r.location.toLowerCase() === data.location.toLowerCase()
  );
  const totalAmount = officeReviews.reduce((sum, r) => sum + r.total, 0);
  const avgRating = officeReviews.length > 0 ? Math.round(officeReviews.reduce((sum, r) => sum + r.rating, 0) / officeReviews.length) : 4;
  const cupsStr = "☕".repeat(avgRating);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-5 my-4 animate-in fade-in zoom-in-95 duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-3 w-full justify-between overflow-hidden bg-gray-50", children: Array.from({ length: 24 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-3 w-3 shrink-0 -translate-y-1.5 rotate-45 border-b border-r border-gray-200 bg-white"
      },
      i
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 pt-4 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1.5 border-b border-dashed border-gray-200 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🧾" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-black text-gray-800 tracking-tight", children: [
          "📍 ",
          data.location
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest", children: "অফিসিয়াল কোপ রশিদ (MEMO)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3.5 bg-gray-50/70 border border-gray-100 rounded-2xl p-4.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block", children: "সর্বমোট দুর্নীতির খতিয়ান" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-extrabold text-gray-700", children: [
            "টোটাল কোপ খাইসে: ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-black text-xl text-red-600 block mt-0.5", children: [
              "৳",
              totalAmount.toLocaleString("bn-BD")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-gray-200/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-gray-500", children: "প্যারার লেভেল:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100/40 flex items-center gap-1.5 select-none", children: [
            cupsStr,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold text-amber-700", children: [
              "(",
              avgRating,
              " কাপ)"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-1", children: [
          "💬 পাবলিকের বাস্তব অভিজ্ঞতা (",
          officeReviews.length,
          " টি)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[160px] overflow-y-auto pr-1", children: officeReviews.slice(0, 2).map((rev) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl bg-rose-50/30 hover:bg-rose-50/50 p-3.5 border border-rose-100/20 transition duration-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-extrabold text-[#E91E63]", children: rev.author }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-gray-400 font-bold", children: rev.timeAgo })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-gray-650 leading-relaxed font-semibold italic", children: [
            '"',
            rev.story,
            '"'
          ] })
        ] }, rev.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-dashed border-gray-200 pt-4 flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 items-center justify-center gap-[1.5px] opacity-35 hover:opacity-60 transition duration-300 select-none", children: Array.from({ length: 42 }).map((_, i) => {
          const heights = ["h-5", "h-6", "h-7"];
          const widths = ["w-[1.5px]", "w-[2px]", "w-[3px]"];
          const h = heights[i % 3];
          const w = widths[i * 7 % 3];
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${h} ${w} bg-black shrink-0` }, i);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-gray-400 font-mono tracking-widest leading-none", children: [
          "#",
          data.id || "COP",
          "-",
          Math.floor(1e5 + Math.random() * 9e5)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            submissionSheet.open();
            close();
          },
          className: "w-full rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-extrabold text-xs py-4 px-4 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "[+] এই অফিসে আপনিও কি ধরা খাইছেন?" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-3 w-full justify-between overflow-hidden bg-gray-50", children: Array.from({ length: 24 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-3 w-3 shrink-0 translate-y-1.5 rotate-45 border-t border-l border-gray-200 bg-white"
      },
      i
    )) })
  ] }) });
}
function AppBar() {
  const { open } = useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      className: "sticky top-0 z-50 bg-white bg-cover bg-center shadow-sm rounded-b-3xl overflow-hidden",
      style: { backgroundImage: "url('/navbar.png')" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-end px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: open,
          "aria-label": "search",
          className: "grid h-10 w-10 place-items-center rounded-full bg-gray-50 text-gray-700 active:scale-95 transition cursor-pointer hover:bg-gray-100",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 20, strokeWidth: 2 })
        }
      ) })
    }
  );
}
const LOCAL_HEADLINES = [
  "ওয়াসা: পানির লাইনের নতুন সংযোগ ফি বাড়সে মামা! 💧",
  "আজকের বাজারদর দেখতে 'আজকের বাজার' ট্যাবে চোখ রাখুন! 📈",
  "মিরপুর বিআরটিএ: আজকে দালালের জাদুতে সবার লাইসেন্স এক দিনেই কমপ্লিট! 🪄",
  "ফাইলের গতি বাড়াইতে 'স্পিড মানি' স্প্রে করুন, ফ্যানের বাতাস খাইতে খাইতে ফাইল সরান! 💸",
  "গুলশান সাব-রেজিস্ট্রি: স্যারদের 'মিষ্টি খাওয়ার' বাজেট ১৫% বৃদ্ধি পাইসে! 🍬",
  "দালাল মামাদের মিষ্টি মিষ্টি ডায়লগ থেকে পকেট সাবধানে রাখুন ওস্তাদ! ⚠️",
  "ভূমি অফিস: নামজারি ফি দ্বিগুণ হইসে কিন্তু ফাইলের স্পিড অর্ধেক হইসে! 🐢"
];
function LiveTicker() {
  const [items2, setItems] = reactExports.useState(LOCAL_HEADLINES);
  reactExports.useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }
    const fetchLatestReports = async () => {
      try {
        const { data, error } = await supabase.from("bribe_reports").select("id, author, officeName, totalAmount, comments").order("id", { ascending: false }).limit(10);
        if (!error && data && data.length > 0) {
          const dynamicItems = data.map((item) => {
            const office = item.officeName || "সরকারি অফিস";
            const authorName = item.author || "অজ্ঞাত পাবলিক";
            const amountStr = item.totalAmount ? `৳${parseFloat(item.totalAmount).toLocaleString("bn-BD")}` : "";
            const templates = [
              `${office}: ${authorName} ${amountStr ? amountStr + " টাকার" : ""} 'চা-পানি' বিল পরিশোধ করলো! 💸`,
              `${office}: ওস্তাদ! ${authorName} এর পকেট থেকে ${amountStr || "কিছু টাকা"} হাওয়া হয়ে গেল! 🤫`,
              `${office}: ${authorName} এর ফাইলে সই বসাতে ${amountStr || "চা-পানি খরচ"} লাগলো! ⚖️`,
              `${office}: "${item.comments ? item.comments.slice(0, 45) + "..." : "দালাল ভাইদের চা-পানিতে সন্তুষ্ট করা হইলো"}"`
            ];
            const index = Math.abs(Number(item.id) || 0) % templates.length;
            return templates[index];
          });
          if (dynamicItems.length < 5) {
            setItems([...dynamicItems, ...LOCAL_HEADLINES]);
          } else {
            setItems(dynamicItems);
          }
        }
      } catch (err) {
        console.warn("Failed to load live ticker from Supabase:", err);
      }
    };
    fetchLatestReports();
    const interval = setInterval(fetchLatestReports, 45e3);
    return () => clearInterval(interval);
  }, []);
  const marqueeItems = [...items2, ...items2];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#FFFDE7] overflow-hidden border-y border-amber-100/60 select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-3 shrink-0 text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1 animate-pulse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-rose-600 animate-ping" }),
      "লাইভ"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex animate-marquee whitespace-nowrap will-change-transform", children: marqueeItems.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center text-xs font-bold text-gray-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-4 inline-block h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse-dot" }),
      t
    ] }, i)) }) })
  ] }) });
}
const items = [
  { to: "/", label: "কোপের কিসসা", Icon: Megaphone },
  { to: "/halkhata", label: "হালখাতা", Icon: BookOpen }
];
function BottomNav() {
  const { pathname } = useLocation();
  const { open } = useSubmissionSheet();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white/80 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid grid-cols-[1fr_auto_1fr] items-end justify-between px-4 pb-safe pt-2", children: [
    items.slice(0, 1).map(({ to, label, Icon }) => {
      const active = pathname === to;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to, label, Icon, active }, to);
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative -mt-10 flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: open,
          "aria-label": "কোপ রিপোর্ট",
          className: "grid h-16 w-16 place-items-center active:scale-95 hover:scale-110 transition duration-200 cursor-pointer",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/money.gif",
              alt: "খুইলা কন",
              className: "h-16 w-16 object-contain select-none pointer-events-none"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 text-[10px] font-semibold text-gray-700 select-none", children: "খুইলা কন" })
    ] }),
    items.slice(1, 2).map(({ to, label, Icon }) => {
      const active = pathname === to;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to, label, Icon, active }, to);
    })
  ] }) });
}
function NavLink({
  to,
  label,
  Icon,
  active
}) {
  const isHalkhata = to === "/halkhata";
  const activeColor = isHalkhata ? "#DC2626" : "#E91E63";
  const inactiveColor = "#6B7280";
  const hoverClass = isHalkhata ? "group-hover:rotate-12 group-hover:scale-105" : "group-hover:-rotate-12 group-hover:scale-110";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to,
      className: "flex flex-col items-center gap-1 py-1 group",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `transition-all duration-200 ${hoverClass} ${active && !isHalkhata ? "animate-pulse" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Icon,
          {
            size: 22,
            strokeWidth: active ? 2.4 : 1.8,
            color: active ? activeColor : inactiveColor,
            fill: active && !isHalkhata ? activeColor : "none",
            className: isHalkhata ? active ? "text-red-600 dark:text-red-500" : "text-gray-500" : active ? "text-[#E91E63]" : "text-gray-500"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-[10px] leading-tight transition-colors ${active ? `font-bold ${isHalkhata ? "text-red-600 dark:text-red-500" : "text-[#E91E63]"}` : "text-gray-500"}`,
            children: label
          }
        )
      ]
    }
  );
}
function AppShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SubmissionSheetProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto min-h-dvh max-w-[480px] bg-[#FAF8F5]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LiveTicker, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "pb-32", children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-12 pb-4 px-6 text-center space-y-1.5 select-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-400 font-semibold leading-relaxed", children: "এই সাইট কোনো সরকারি বা বেসরকারি প্রতিষ্ঠানের সাথে যুক্ত নয়। পুরাটাই পাবলিকের মাল।" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/privacy",
            className: "inline-block text-[11px] font-extrabold text-[#E91E63] hover:underline cursor-pointer",
            children: "⚖️ আইনের চিপা (শর্ত ও প্রাইভেসি)"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] }) }) });
}
export {
  AppShell as A,
  ReviewCard as R
};
