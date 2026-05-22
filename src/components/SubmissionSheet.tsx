import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { Plus, X, MapPin, ChevronDown } from "lucide-react";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const SheetCtx = createContext<Ctx | null>(null);

export function useSubmissionSheet() {
  const c = useContext(SheetCtx);
  if (!c) throw new Error("SubmissionSheet provider missing");
  return c;
}

export function SubmissionSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SheetCtx.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
      <SubmissionSheet />
    </SheetCtx.Provider>
  );
}

const WHO_OPTIONS: string[] = [
  "বড় স্যার (ফাইনাল সাইন)",
  "পিয়ন ভাই (ফাইল পুশার)",
  "দালাল মামা (বাইরের কন্ট্রাক্ট)",
  "গেটের দারোয়ান (এন্ট্রি ফি)",
  "কম্পিউটার অপারেটর (টাইপিং চার্জ)",
  "ডিউটি অফিসার (জিডির খরচ)",
  "রেকর্ড কিপার (পুরানো ফাইল খোঁজা)",
];

type GroupedOption = {
  category: string;
  options: string[];
};

const SPOT_OPTIONS: GroupedOption[] = [
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

function TeaCupIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8 transition-colors duration-200"
    >
      {/* Steam */}
      <path d="M9 2v4" />
      <path d="M13 2v4" />
      {/* Cup Body */}
      <path d="M5 8h10a2 2 0 0 1 2 2v3a6 6 0 0 1-12 0v-3a2 2 0 0 1 2-2z" />
      {/* Handle */}
      <path d="M17 10h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1" />
    </svg>
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
  "চোরের হাটের দালাল",
];

export interface VictimBadge {
  icon: string;
  title: string;
  subtext: string;
  color: string;
}

export function getVictimBadge(totalAmount: number): VictimBadge {
  if (totalAmount < 1000) {
    return {
      icon: "🥉",
      title: "হালকার ওপর ঝাপসা",
      subtext: "চা-পানির বিল দিয়া কোনোমতে বাইচা গেছেন!",
      color: "text-yellow-600 border-yellow-200 bg-yellow-50/60",
    };
  } else if (totalAmount < 5000) {
    return {
      icon: "🥈",
      title: "মাঝারি ছ্যাঁকা",
      subtext: "পকেটটা মোটামুটি ভালোই কাটসে। সান্ত্বনা নিবেন!",
      color: "text-gray-500 border-gray-200 bg-gray-50/60",
    };
  } else if (totalAmount <= 10000) {
    return {
      icon: "🥇",
      title: "পকেট শহীদ",
      subtext: "আপনার এই বিশাল অবদানে স্যারদের আজকের লাঞ্চটা জোস হবে!",
      color: "text-amber-600 border-amber-200 bg-amber-50/60",
    };
  } else {
    return {
      icon: "💀",
      title: "জাতীয় 'ভিআইপি' ডোনার",
      subtext: "আপনার টাকায় তো স্যারদের বিল্ডিংয়ের রড কেনা হবে! আপনাকে পুরাই স্যালুট!",
      color: "text-blue-600 border-blue-200 bg-blue-50/60",
    };
  }
}

function SubmissionSheet() {
  const { isOpen, close } = useSubmissionSheet();
  const [area, setArea] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [spot, setSpot] = useState("");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState("");
  const [activeWhoDropdown, setActiveWhoDropdown] = useState<number | null>(null);
  const [combos, setCombos] = useState([{ who: "", amount: "" }]);
  const [eventDate, setEventDate] = useState("today"); // "today" | "yesterday" | "before"
  const [customDate, setCustomDate] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Local submission limiting states & helpers
  const [localSubmissionCount, setLocalSubmissionCount] = useState(0);

  const getLocalSubmissionsInLast24Hours = () => {
    try {
      const stored = localStorage.getItem("dhakaiya_submissions");
      if (!stored) return [];
      const parsed = JSON.parse(stored) as string[];
      const now = new Date().getTime();
      return parsed.map(t => new Date(t).getTime()).filter(t => now - t < 24 * 60 * 60 * 1000);
    } catch {
      return [];
    }
  };

  const recordLocalSubmission = () => {
    try {
      const active = getLocalSubmissionsInLast24Hours();
      const updated = [...active, new Date().getTime()];
      localStorage.setItem("dhakaiya_submissions", JSON.stringify(updated.map(t => new Date(t).toISOString())));
      setLocalSubmissionCount(updated.length);
    } catch (e) {
      console.warn("localStorage write failed", e);
    }
  };

  // Digital Cash Memo states
  const [showMemo, setShowMemo] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    author: string;
    area: string;
    spot: string;
    combos: { who: string; amount: string }[];
    totalAmount: number;
    dateStr: string;
    uniqueId: string;
  } | null>(null);

  // Custom Dhakaiya Captcha states
  const [captchaChallenge, setCaptchaChallenge] = useState(() => CAPTCHA_CHALLENGES[Math.floor(Math.random() * CAPTCHA_CHALLENGES.length)]);
  const [selectedCaptchaOption, setSelectedCaptchaOption] = useState<string | null>(null);
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [details, setDetails] = useState("");
  const [generatedMemoUrl, setGeneratedMemoUrl] = useState<string | null>(null);

  // Auto-generate memo image for iOS/Android offline long press / Web Share API compatibility
  useEffect(() => {
    if (showMemo && submittedData) {
      const timer = setTimeout(async () => {
        const element = document.getElementById("vip-memo-container");
        if (!element) return;
        try {
          const html2canvasFn = typeof html2canvas === "function"
            ? html2canvas
            : (html2canvas as any).default;

          if (typeof html2canvasFn !== "function") return;

          const renderWidth = 375;
          const clone = element.cloneNode(true) as HTMLElement;
          
          // Remove the overlay image from clone to prevent recursive captures
          const overlayImg = clone.querySelector("img[alt='Memo Receipt']");
          if (overlayImg) overlayImg.remove();

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
            width: renderWidth,
          });

          document.body.removeChild(clone);

          const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
          if (blob) {
            const url = URL.createObjectURL(blob);
            setGeneratedMemoUrl(url);
          }
        } catch (err) {
          console.warn("Auto-generating preview image failed:", err);
        }
      }, 600); // Wait for open animation to settle
      return () => clearTimeout(timer);
    } else {
      if (generatedMemoUrl) {
        URL.revokeObjectURL(generatedMemoUrl);
      }
      setGeneratedMemoUrl(null);
    }
  }, [showMemo, submittedData]);

  // Reset form and pick a random captcha challenge when the sheet opens
  useEffect(() => {
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

  function submit(e: React.FormEvent) {
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
    const uniqueId = `MEMO-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateObj = new Date();
    const dateStr = dateObj.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const badge = getVictimBadge(totalAmount);

    setIsSubmitting(true);

    // Secure backend API insert with IP rate limiting and server validation
    const insertRecord = async () => {
      try {
        const response = await fetch("/api/submit-report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
            userSelectedAnswer: selectedCaptchaOption,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          const errMsg = result.error || "সাবমিট করতে সমস্যা হয়েছে!";
          if (response.status === 429) {
            toast.error("সীমা অতিক্রম! 🚫", {
              description: errMsg,
              duration: 6000,
            });
          } else {
            toast.error("সাবমিট ব্যর্থ 😬", {
              description: errMsg,
              duration: 5000,
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
          uniqueId,
        });

        recordLocalSubmission();

        if (result.demoMode) {
          toast.success("মেমো রেডি মামা! ✅", {
            description: "লোকাল ডেমো মোডে আছেন, মেমোটা ডাউনলোড বা শেয়ার করে নেন!",
            duration: 3500,
          });
        } else {
          toast.success("কোপের খবর সাবমিট হইছে! ✅", {
            description: "আপনার রিপোর্ট পাবলিক রাডারে যোগ হইয়া গেছে।",
            duration: 3500,
          });
        }

        setShowMemo(true);
      } catch (err: any) {
        console.warn("⚠️ API submit error catch wrapper:", err.message || err);
        toast.error("নেটওয়ার্ক সমস্যা 😓", {
          description: "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না। দয়া করে ইন্টারনেট কানেকশন চেক করুন!",
          duration: 5000,
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    insertRecord();
  }

  const downloadMemo = async () => {
    toast.info("মেমো ডাউনলোড প্রসেস হচ্ছে... ⏳");
    try {
      let blob: Blob | null = null;
      let memoUrl = generatedMemoUrl;

      if (memoUrl) {
        // Fetch the blob from the pre-generated Object URL
        blob = await fetch(memoUrl).then((r) => r.blob());
      } else {
        // Fallback: dynamic rendering if not fully generated yet
        const element = document.getElementById("vip-memo-container");
        if (!element) throw new Error("vip-memo-container not found");

        const html2canvasFn = typeof html2canvas === "function"
          ? html2canvas
          : (html2canvas as any).default;

        if (typeof html2canvasFn !== "function") {
          throw new Error("html2canvas is not a function or failed to load");
        }

        const renderWidth = 375;
        const clone = element.cloneNode(true) as HTMLElement;
        
        // Remove transparent overlay image to prevent render artifact issues
        const overlayImg = clone.querySelector("img[alt='Memo Receipt']");
        if (overlayImg) overlayImg.remove();

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
          width: renderWidth,
        });

        document.body.removeChild(clone);

        blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
        if (blob) {
          const url = URL.createObjectURL(blob);
          setGeneratedMemoUrl(url);
          memoUrl = url;
        }
      }

      if (!blob || !memoUrl) {
        throw new Error("মেমো ইমেজ জেনারেট করতে সমস্যা হইসে মামা!");
      }

      const fileName = `ভিআইপি_আপ্যায়ন_বিল_${submittedData?.uniqueId || "bribe"}.png`;

      // 1. Try Native Web Share File API for mobile devices (iOS/Android)
      if (navigator.canShare && navigator.share) {
        try {
          const file = new File([blob], fileName, { type: "image/png" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: "ভিআইপি আপ্যায়ন বিল",
              text: `ওস্তাদ! ${submittedData?.spot}-এ বড় স্যার ও দালালদের আপ্যায়ন করতে মোট ৳${submittedData?.totalAmount.toLocaleString("bn-BD")} টাকার বিল দিতে হইসে!`,
            });
            toast.success("মেমো শেয়ার ও ডাউনলোড অপশন ওপেন হইছে! 📤");
            return;
          }
        } catch (shareErr) {
          console.log("Native share failed, falling back to direct download.", shareErr);
        }
      }

      // 2. Direct Blob URL download fallback (greatly preferred over heavy data URI)
      const link = document.createElement("a");
      link.href = memoUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("মেমো ডাউনলোড শুরু হইছে! 📥");
    } catch (err: any) {
      console.error("Error generating image:", err);
      toast.error("মেমো জেনারেট করতে সমস্যা হইসে মামা! আবার ট্রাই মারেন।", {
        description: err?.message || String(err),
        duration: 8000,
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
          url: siteUrl,
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
    if (generatedMemoUrl) {
      URL.revokeObjectURL(generatedMemoUrl);
    }
    setGeneratedMemoUrl(null);
    close();
  };

  // Calculate dynamic subtotal
  const totalAmount = combos.reduce((sum, c) => {
    const amt = parseFloat(c.amount) || 0;
    return sum + amt;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-x-0 bottom-0 z-[70] mx-auto w-full max-w-[480px] max-h-[92dvh] overflow-y-auto rounded-t-3xl bg-white p-6 pb-10 shadow-2xl"
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">খুইলা কন মিয়া</h2>
              <button onClick={close} className="grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-gray-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-5">
              {/* Two-step Input Block */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50/30 p-4.5 space-y-4">
                <span className="block text-sm font-bold text-gray-800 leading-none">কোন চিপায় ধরা খাইলেন?</span>

                <div className="grid grid-cols-2 gap-3">
                  {/* Part 1: The Area (Text Input) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-500">এলাকা বা জেলার নাম কন</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <MapPin size={14} strokeWidth={2.2} />
                      </span>
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="যেমন: মিরপুর..."
                        className="w-full rounded-xl border border-gray-200 bg-white pl-8.5 pr-2.5 py-3 text-base sm:text-sm text-gray-800 transition placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30"
                      />
                    </div>
                  </div>

                  {/* Part 2: Custom Hover Drill-down Dropdown */}
                  <div className="relative space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-500 truncate">
                      কোন অফিসে বা স্পটে?
                    </label>

                    {/* Trigger Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpenDropdown(!isOpenDropdown);
                        if (!isOpenDropdown) {
                          // Pre-select first category if empty
                          setHoveredCategory(subCategory || SPOT_OPTIONS[0]?.category || "");
                        }
                      }}
                      className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-2.5 py-3 text-left text-xs sm:text-sm text-gray-800 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30"
                    >
                      <span className="truncate">
                        {spot ? `📍 ${spot}` : subCategory ? `📂 ${subCategory.split(" (")[0]}...` : "খাত বা ক্যাটাগরি..."}
                      </span>
                      <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpenDropdown ? "rotate-180" : ""}`} />
                    </button>

                    {/* Custom Flyout Menu */}
                    {isOpenDropdown && (
                      <>
                        {/* Overlay backdrop to close dropdown when clicking outside */}
                        <div
                          className="fixed inset-0 z-40 bg-transparent"
                          onClick={() => setIsOpenDropdown(false)}
                        />

                        <div className="absolute right-0 top-full z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-gray-150 bg-white shadow-xl animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="p-1">
                            {SPOT_OPTIONS.map((group) => {
                              const isExpanded = hoveredCategory === group.category;
                              return (
                                <div key={group.category} className="rounded-lg overflow-hidden mb-0.5">
                                  {/* Category Header */}
                                  <div
                                    onMouseEnter={() => setHoveredCategory(group.category)}
                                    onClick={() => {
                                      if (hoveredCategory === group.category) {
                                        setHoveredCategory("");
                                      } else {
                                        setHoveredCategory(group.category);
                                      }
                                    }}
                                    className={`cursor-pointer px-3 py-2 text-xs font-bold flex items-center justify-between transition-colors ${isExpanded
                                        ? "bg-[#00BCD4]/10 text-[#00838F]"
                                        : "text-gray-700 hover:bg-gray-50"
                                      }`}
                                  >
                                    <span className="truncate">📂 {group.category}</span>
                                    <ChevronDown
                                      size={12}
                                      className={`text-gray-400 transition-transform duration-200 shrink-0 ${isExpanded ? "rotate-180 text-[#00BCD4]" : ""
                                        }`}
                                    />
                                  </div>

                                  {/* Sub-options List (Accordion) */}
                                  {isExpanded && (
                                    <div className="bg-gray-50/50 pl-5 pr-2 py-1 space-y-0.5 border-t border-gray-100 animate-in slide-in-from-top-1 duration-100">
                                      {group.options.map((s) => (
                                        <button
                                          key={s}
                                          type="button"
                                          onClick={() => {
                                            setSubCategory(group.category);
                                            setSpot(s);
                                            setIsOpenDropdown(false);
                                          }}
                                          className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-[11px] text-gray-600 transition-colors hover:bg-[#00BCD4]/5 hover:text-[#00BCD4] font-medium"
                                        >
                                          📍 {s}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Date Picker Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">কবেকার ঘটনা?</label>
                <div className="grid grid-cols-3 gap-2">
                  {["আজকে", "গতকাল", "আগে"].map((opt, idx) => {
                    const val = ["today", "yesterday", "before"][idx];
                    const active = eventDate === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setEventDate(val)}
                        className={`rounded-2xl py-3.5 text-center text-xs font-semibold border transition ${active
                            ? "border-[#E91E63] bg-rose-50 text-[#E91E63] font-bold"
                            : "border-gray-200 bg-gray-50/50 text-gray-600 hover:bg-gray-100/50"
                          }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {eventDate === "before" && (
                  <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                    <input
                      type="date"
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-base sm:text-sm text-gray-800 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">স্যারদের কত টাকার 'চা-পানি' করাইলেন?</label>
                <div className="space-y-2.5">
                  {combos.map((c, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2.5">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveWhoDropdown(activeWhoDropdown === i ? null : i);
                          }}
                          className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-left text-sm text-gray-800 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30"
                        >
                          <span className="truncate">
                            {c.who ? `👤 ${c.who}` : "কোন টেবিলে/স্যারকে দিলেন?"}
                          </span>
                          <ChevronDown size={14} className={`text-gray-400 transition-transform ${activeWhoDropdown === i ? "rotate-180" : ""}`} />
                        </button>

                        {activeWhoDropdown === i && (
                          <>
                            <div
                              className="fixed inset-0 z-40 bg-transparent"
                              onClick={() => setActiveWhoDropdown(null)}
                            />
                            <div className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-2xl border border-gray-150 bg-white p-1.5 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150">
                              <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                🏛️ সরকারি কর্মকর্তা
                              </div>
                              {WHO_OPTIONS.map((o) => (
                                <button
                                  key={o}
                                  type="button"
                                  onClick={() => {
                                    const v = [...combos];
                                    v[i].who = o;
                                    setCombos(v);
                                    setActiveWhoDropdown(null);
                                  }}
                                  className={`flex w-full items-center rounded-xl px-2.5 py-2 text-left text-xs transition-colors ${c.who === o
                                      ? "bg-[#00BCD4]/10 text-[#00838F] font-semibold"
                                      : "text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                  👤 {o}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <input
                        value={c.amount}
                        onChange={(e) => {
                          const v = [...combos]; v[i].amount = e.target.value; setCombos(v);
                        }}
                        inputMode="numeric"
                        placeholder="মিষ্টির বিল কত? (৳)"
                        className="rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-base sm:text-sm placeholder:text-gray-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30"
                      />
                    </div>
                  ))}
                </div>

                {/* Dynamic Subtotal */}
                {combos.length > 1 && (
                  <div className="mt-3 flex justify-between items-center rounded-2xl bg-rose-50/50 border border-rose-100/50 px-4 py-3.5 text-sm font-bold text-[#E91E63] animate-in fade-in duration-200">
                    <span>সর্বমোট 'সম্মানী':</span>
                    <span className="tabular-nums">৳ {totalAmount.toLocaleString("bn-BD")}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setCombos([...combos, { who: "", amount: "" }])}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00BCD4] transition hover:text-[#00BCD4]/80"
                >
                  <Plus size={16} /> + অন্য টেবিলেও কি 'সম্মানী' লাগছে?
                </button>
                {error && <p className="mt-2 text-xs font-medium text-[#E91E63]">{error}</p>}
              </div>

              {/* Sir's Tea-Thirst 5-Point Rating Component */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  স্যারদের 'চা-পিপাসা' রেটিং করেন:
                </label>
                <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50/30 p-4.5">
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map((index) => {
                      const isFilled = (hoverRating || rating) >= index;
                      return (
                        <button
                          key={index}
                          type="button"
                          onMouseEnter={() => setHoverRating(index)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(index)}
                          className="transition-transform active:scale-90 duration-150 cursor-pointer"
                          style={{ color: isFilled ? "#FFAA00" : "#D1D5DB" }}
                        >
                          <TeaCupIcon filled={isFilled} />
                        </button>
                      );
                    })}
                  </div>
                  {/* Dynamic Reaction Text */}
                  <div className="mt-3 text-sm font-extrabold text-gray-800 transition-all duration-150 min-h-[1.25rem]">
                    {rating === 1 && "হালকা চা-পানি"}
                    {rating === 2 && "গলা শুকনা ছিল"}
                    {rating === 3 && "চুমুকে চুমুকে কোপ"}
                    {rating === 4 && "কলিজা শুকায়া দিসে"}
                    {rating === 5 && "রক্ত চুইষা খাইসে!"}
                    {rating === 0 && (
                      <span className="text-xs text-gray-400 font-medium">
                        {hoverRating > 0 ? (
                          hoverRating === 1 ? "হালকা চা-পানি" :
                            hoverRating === 2 ? "গলা শুকনা ছিল" :
                              hoverRating === 3 ? "চুমুকে চুমুকে কোপ" :
                                hoverRating === 4 ? "কলিজা শুকায়া দিসে" :
                                  "রক্ত চুইষা খাইসে!"
                        ) : (
                          "রেটিং দিতে ট্যাপ করুন"
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">ডিটেইলস কন মিয়া...</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={4}
                  placeholder="পুরা ঘটনাটা বলেন..."
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm leading-relaxed placeholder:text-gray-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/30"
                />
              </div>

              {/* No Fake Data Warning Banner */}
              <div className="my-4 flex gap-3 rounded-2xl border border-amber-250 bg-amber-50/70 p-4 text-left shadow-sm items-start">
                <span className="text-lg shrink-0 select-none leading-none mt-0.5">⚠️</span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-900 leading-normal py-0.5">
                    ⚠️ ওস্তাদ, একটা সিরিয়াস কথা!
                  </h4>
                  <p className="text-xs font-semibold text-amber-800 leading-relaxed py-0.5">
                    দয়া কইরা হুদা কামে ফেইক বা ভুয়া ইনফো দিয়েন না। কারো লগে পার্সোনাল শত্রুতা মিটাইতে উল্টাপাল্টা হিসাব দিলে আসল চোরেরা পার পাইয়া যাবে। একদম জেনুইন যেই বাঁশ খাইছেন, শুধু ওইটাই সাবমিট করেন। ফাউল খেললে রাডার নষ্ট হয়ে যাবে!
                  </p>
                </div>
              </div>

              {/* Dhakaiya Captcha */}
              <div className="rounded-2xl border border-gray-150 bg-gray-50/50 p-4.5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-750">
                    🤖 রোবট নাকি আসল পাবলিক? প্রমাণ দেন:
                  </span>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100/50">
                    জরুরী যাচাই
                  </span>
                </div>
                
                <p className="text-xs font-semibold text-gray-600 bg-white rounded-xl px-3 py-2.5 border border-gray-100 shadow-sm leading-relaxed">
                  ❓ {captchaChallenge.q}
                </p>
                
                <div className="grid grid-cols-3 gap-2">
                  {captchaChallenge.options.map((opt) => {
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
                    
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setSelectedCaptchaOption(opt);
                          if (isCorrect) {
                            setCaptchaSolved(true);
                            setErrorMessage("");
                          } else {
                            setCaptchaSolved(false);
                            setErrorMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
                          }
                        }}
                        className={`rounded-xl py-2.5 text-center text-xs font-medium border transition-all duration-200 active:scale-[0.97] ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                
                {errorMessage && (
                  <motion.p
                    key={errorMessage} // Trigger animation on message change
                    initial={{ x: 0 }}
                    animate={{ x: [-10, 10, -10, 10, -5, 5, -2, 2, 0] }}
                    transition={{ duration: 0.5 }}
                    className="text-red-500 font-bold mt-2 text-sm text-center flex items-center justify-center gap-1 leading-relaxed"
                  >
                    ⚠️ {errorMessage}
                  </motion.p>
                )}
                {captchaSolved && (
                  <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in duration-200 justify-center">
                    ✅ পারফেক্ট মামা! আপনি খাঁটি পাবলিক।
                  </p>
                )}
              </div>

              <div className="space-y-3">
                {localSubmissionCount >= 2 && (
                  <div className="my-2 flex gap-3 rounded-2xl border border-rose-250 bg-rose-50/70 p-4 text-left shadow-sm items-start animate-pulse">
                    <span className="text-lg shrink-0 select-none leading-none mt-0.5">🚫</span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-rose-900 leading-normal py-0.5">
                        🚫 ওস্তাদ, আজকের কোটা শেষ!
                      </h4>
                      <p className="text-xs font-semibold text-rose-800 leading-relaxed py-0.5">
                        ২৪ ঘণ্টায় ২ বারের বেশি রিপোর্ট করা যাবে না। শান্ত হোন মামা! কালকে আবার ফ্রেশ খবর নিয়া আইসেন।
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!captchaSolved || localSubmissionCount >= 2 || isSubmitting}
                  className={`w-full rounded-2xl py-4 text-lg font-extrabold text-white shadow-lg active:scale-[0.99] transition-all duration-200 ${
                    !captchaSolved || localSubmissionCount >= 2 || isSubmitting
                      ? "opacity-50 cursor-not-allowed bg-gray-300 pointer-events-none"
                      : "hover:shadow-xl hover:brightness-105"
                  } ${isSubmitting ? "animate-pulse" : ""}`}
                  style={captchaSolved && localSubmissionCount < 2 && !isSubmitting ? { background: "linear-gradient(90deg, #E91E63, #FFB300)" } : undefined}
                >
                  {isSubmitting ? "দাঁড়ান ওস্তাদ, কোপটা বসতাছে... ⏳" : localSubmissionCount >= 2 ? "কোটা শেষ মামা!" : "পাবলিকের সামনে ন্যাংটা করেন!"}
                </button>

                {/* Anonymity Disclaimer */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium leading-normal py-0.5">
                  <svg className="h-3.5 w-3.5 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="py-0.5">আপনার পরিচয় ১০০% গোপন (Ghost Protocol) থাকবে। কোনো প্যারা নাই!</span>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Glassmorphic Full Screen Submitting Overlay */}
          <AnimatePresence>
            {isSubmitting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black/45 backdrop-blur-md"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="flex flex-col items-center justify-center max-w-sm rounded-3xl bg-white/90 border border-white/40 p-8 shadow-2xl text-center space-y-4 m-4"
                >
                  {/* Animated Loading Spinner Container */}
                  <div className="relative flex items-center justify-center w-20 h-20">
                    {/* Animated pulsing gradient background rings */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E91E63] to-[#FFB300] opacity-20 animate-ping" />
                    <div className="absolute inset-2 rounded-full bg-gradient-to-bl from-[#00BCD4] to-[#00838F] opacity-15 animate-pulse" />
                    
                    {/* Main spinning ring */}
                    <div className="w-14 h-14 rounded-full border-4 border-gray-150 border-t-amber-500 border-r-[#E91E63] animate-spin" />
                    
                    {/* Center cup icon pulsing */}
                    <div className="absolute text-2xl animate-bounce">
                      ☕
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-gray-800 leading-tight">
                      হিসাবটা ক্যাশ মেমোতে তুলতেছি, একটু দম লন!
                    </h3>
                    <p className="text-xs font-bold text-gray-500">
                      সার্ভারের বড় স্যার খাম চেক করতেছেন... 🤫
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Post-Submission "Digital Cash Memo" Overlay Modal */}
          {showMemo && submittedData && (
            <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-6 px-2.5 sm:px-4">
              <div
                className="fixed inset-0 cursor-pointer"
                onClick={handleCloseMemo}
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative flex flex-col items-center max-w-sm w-full bg-[#FAF8F5] rounded-3xl border border-gray-200/50 p-3 sm:p-5 shadow-2xl space-y-4 z-10 select-none"
              >
                {/* Traditional Cash Memo Document */}
                <div
                  id="vip-memo-container"
                  className="w-full bg-[#FDFAF4] border-2 border-red-700/60 p-3 sm:p-4 font-sans text-red-800 space-y-4 relative overflow-hidden"
                  style={{
                    backgroundColor: "#FDFAF4",
                  }}
                >
                  {/* Absolute Image overlay for native long-press save */}
                  {generatedMemoUrl && (
                    <img
                      src={generatedMemoUrl}
                      alt="Memo Receipt"
                      className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer pointer-events-auto select-all"
                      style={{ WebkitTouchCallout: "default" }}
                    />
                  )}

                  {/* Paper Grid background effect (Horizontal) */}
                  <div
                    data-html2canvas-ignore="true"
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: "linear-gradient(red 1px, transparent 1px)",
                      backgroundSize: "100% 20px",
                    }}
                  />
                  {/* Paper Grid background effect (Vertical) */}
                  <div
                    data-html2canvas-ignore="true"
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: "linear-gradient(90deg, red 1px, transparent 1px)",
                      backgroundSize: "20px 100%",
                    }}
                  />

                  {/* Memo Header */}
                  <div className="text-center space-y-1 relative">
                    <p className="text-[10px] font-black tracking-widest text-red-700/60">॥ বিসমিল্লাহির রহমানির রাহিম ॥</p>
                    
                    {/* Satirical Achievement Badge Unlocked */}
                    {(() => {
                      const badge = getVictimBadge(submittedData.totalAmount);
                      return (
                        <div className={`my-2.5 p-3 rounded-2xl border text-center transition-all duration-300 shadow-sm leading-normal py-0.5 ${badge.color}`}>
                          <div className="text-[9px] font-black tracking-wider uppercase opacity-75 mb-0.5 leading-normal py-0.5">
                            🏆 অর্জন আনলকড! (Victim Badge)
                          </div>
                          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-extrabold leading-normal py-0.5">
                            <span>{badge.icon}</span>
                            <span>{badge.title}</span>
                          </div>
                          <div className="text-[9px] font-semibold opacity-90 leading-normal py-0.5">
                            "{badge.subtext}"
                          </div>
                        </div>
                      );
                    })()}

                    <h1 className="text-lg font-black tracking-tight text-red-700 border-b-2 border-red-700/40 pb-1.5 uppercase">
                      আন-অফিসিয়াল 'ভিআইপি আপ্যায়ন' বিল
                    </h1>
                  </div>

                  {/* Memo Meta fields */}
                  <div className="text-xs font-bold space-y-1 relative border-b border-dashed border-red-700/40 pb-3">
                    <div className="flex justify-between">
                      <span>তারিখ: <span className="text-gray-800 font-extrabold">{submittedData.dateStr}</span></span>
                      <span className="text-[10px] text-red-700/70">নং: <span className="text-gray-800 font-extrabold">{submittedData.uniqueId}</span></span>
                    </div>
                    <div>
                      <span>ডোনার: <span className="text-gray-800 font-extrabold">{submittedData.author}</span></span>
                    </div>
                    <div>
                      <span>অফিস: <span className="text-gray-800 font-extrabold">{submittedData.spot}</span></span>
                    </div>
                    <div>
                      <span>এলাকা: <span className="text-gray-800 font-extrabold">{submittedData.area}</span></span>
                    </div>
                  </div>

                  {/* Dynamic Items Table */}
                  <div className="text-xs relative">
                    {/* Table Header */}
                    <div className="grid grid-cols-[1fr_auto] border-b-2 border-red-700 pb-1 font-extrabold uppercase tracking-wide">
                      <span>বিবরণ</span>
                      <span className="text-right">পরিমাণ</span>
                    </div>

                    {/* Table Rows */}
                    <div className="divide-y divide-red-700/30 border-b border-red-700/50">
                      {submittedData.combos.map((item, index) => (
                        <div key={index} className="grid grid-cols-[1fr_auto] py-2 text-gray-800 font-semibold items-baseline">
                          <span>{item.who} এর চা-পানি</span>
                          <span className="font-extrabold tabular-nums">৳ {parseFloat(item.amount).toLocaleString("bn-BD")}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grand Total */}
                  <div className="pt-2.5 border-t-2 border-red-700/70 flex flex-col items-end relative">
                    <span className="text-[10px] uppercase font-black text-red-700/70 tracking-widest leading-none">সর্বমোট গলাকাটা বিল</span>
                    <span className="text-2xl font-black text-red-600 mt-1 tabular-nums leading-normal py-0.5">
                      ৳ {submittedData.totalAmount.toLocaleString("bn-BD")}
                    </span>
                  </div>

                  {/* Traditional Paid Stamp */}
                  <div
                    className="absolute right-4 bottom-20 opacity-85 select-none pointer-events-none border-[3px] border-dashed border-red-600/80 rounded-2xl px-3 py-1 font-black text-red-600 text-sm tracking-widest text-center shadow-sm"
                    style={{ transform: "rotate(-12deg)" }}
                  >
                    ৳ পরিশোধিত ৳<br />
                    <span className="text-[9px] uppercase tracking-wider font-extrabold opacity-95">(খাম রেডি)</span>
                  </div>

                  {/* Footer disclaimer */}
                  <div className="text-[9px] font-bold leading-relaxed text-red-800/70 border-t border-dashed border-red-700/30 pt-2 text-center">
                    বিঃদ্রঃ এই বিল পাবলিকের কথা অনুযায়ী বানানো। আমরা শুধু হিসাব রাখি। পরিশোধিত লেখা না থাকলে কাজ হবে না।
                  </div>
                </div>

                {/* Visual Long Press instruction helper */}
                {generatedMemoUrl && (
                  <p className="text-[10px] font-extrabold text-amber-700 text-center animate-pulse px-2 py-0.5 leading-relaxed">
                    💡 মামা! সরাসরি ডাউনলোড না হলে মেমোটির ওপর চেপে ধরে ফোনে সেভ করুন!
                  </p>
                )}

                {/* Action Buttons */}
                <div className="w-full space-y-2 pt-2">
                  <button
                    onClick={downloadMemo}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-600 hover:bg-amber-700 transition active:scale-[0.99] text-white py-3.5 text-sm font-extrabold shadow-md hover:shadow-lg duration-150 cursor-pointer"
                  >
                    📥 মেমো ডাউনলোড করেন
                  </button>

                  <button
                    onClick={shareToFacebook}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 transition active:scale-[0.99] text-white py-3.5 text-sm font-extrabold shadow-md hover:shadow-lg duration-150 cursor-pointer"
                  >
                    👥 ফেসবুকে শেয়ার মারেন!
                  </button>

                  <button
                    onClick={handleCloseMemo}
                    className="w-full flex items-center justify-center gap-1.5 rounded-2xl bg-gray-100 hover:bg-gray-200 transition text-gray-700 py-3 text-xs font-bold duration-150 border border-gray-200 cursor-pointer"
                  >
                    ড্যাশবোর্ডে ফেরত যান
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
