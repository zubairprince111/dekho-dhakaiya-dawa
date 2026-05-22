import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell, R as ReviewCard } from "./AppShell-BloKswEJ.mjs";
import { i as isSupabaseConfigured, s as supabase } from "./router-DBm3iMqC.mjs";
import "../_libs/sonner.mjs";
import "../_libs/html2canvas.mjs";
import { a as MapPin, X } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
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
function getCoordinatesForLocation(location) {
  const known = {
    "পাসপোর্ট অফিস": { lat: 23.7291, lng: 90.3804 },
    "এনআইডি / নির্বাচন কমিশন": { lat: 23.7508, lng: 90.3855 },
    "জন্ম-মৃত্যু নিবন্ধন শাখা": { lat: 23.742, lng: 90.392 },
    "ভূমি অফিস / এসিল্যান্ড": { lat: 23.738, lng: 90.375 },
    "সাব-রেজিস্ট্রি অফিস": { lat: 23.7925, lng: 90.4078 },
    "সেটেলমেন্ট অফিস": { lat: 23.785, lng: 90.395 },
    "রাজউক / উন্নয়ন কর্তৃপক্ষ": { lat: 23.7285, lng: 90.4135 },
    "বিআরটিএ অফিস": { lat: 23.8042, lng: 90.3673 },
    "ট্রাফিক পুলিশ জোন": { lat: 23.7592, lng: 90.3889 },
    "থানা / police স্টেশন": { lat: 23.765, lng: 90.39 },
    "সরকারি hospital": { lat: 23.725, lng: 90.397 }
  };
  const key = location.trim();
  for (const knownKey of Object.keys(known)) {
    if (key.includes(knownKey) || knownKey.includes(key)) {
      return known[knownKey];
    }
  }
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  const latOffset = hash % 100 / 1e3 * 0.12;
  const lngOffset = (hash >> 8) % 100 / 1e3 * 0.12;
  return {
    lat: 23.75 + latOffset,
    lng: 90.38 + lngOffset
  };
}
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
function LocalRadar({ reports = [] }) {
  const [userLocation, setUserLocation] = reactExports.useState(null);
  const [isLocating, setIsLocating] = reactExports.useState(false);
  const [nearbyCount, setNearbyCount] = reactExports.useState(0);
  const [nearbyReports, setNearbyReports] = reactExports.useState([]);
  const [isSheetOpen, setIsSheetOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!userLocation) {
      setNearbyCount(reports.length);
    } else {
      const filtered = reports.filter((r) => {
        const coords = getCoordinatesForLocation(r.location);
        const dist = calculateDistance(userLocation.lat, userLocation.lng, coords.lat, coords.lng);
        return dist <= 10;
      });
      setNearbyReports(filtered);
      setNearbyCount(filtered.length);
    }
  }, [reports, userLocation]);
  const fetchNearbyReports = () => {
    if (isLocating) return;
    setIsLocating(true);
    if (!navigator.geolocation) {
      alert("মামা, আপনার ব্রাউজারে লোকেশন সার্ভিস সাপোর্ট করে না! ম্যানুয়ালি সার্চ দেন।");
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        const filtered = reports.filter((r) => {
          const coords = getCoordinatesForLocation(r.location);
          const dist = calculateDistance(latitude, longitude, coords.lat, coords.lng);
          return dist <= 10;
        });
        setNearbyReports(filtered);
        setNearbyCount(filtered.length);
        setIsLocating(false);
        setIsSheetOpen(true);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("মামা লোকেশন অন না করলে আপনার এলাকার চোর ধরবো কেমনে? ম্যানুয়ালি সার্চ দেন!");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8e3, maximumAge: 0 }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: fetchNearbyReports,
        className: `mx-4 mt-4 flex w-[calc(100%-2rem)] items-center gap-3 rounded-2xl p-3.5 text-left transition select-none ${isLocating ? "bg-amber-50 text-amber-900 border border-amber-200/50" : isSheetOpen ? "bg-blue-100 text-blue-900 border border-blue-200/40" : "bg-blue-50 text-blue-800 border border-blue-100/50 hover:bg-blue-100/80 active:scale-[0.98]"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative grid h-9 w-9 shrink-0 place-items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute inset-0 rounded-full bg-blue-400/40 ${isLocating ? "animate-ping" : "animate-radar-ping"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `relative grid h-9 w-9 place-items-center rounded-full bg-blue-500 text-white ${isLocating ? "animate-spin" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, strokeWidth: 2.2 }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold leading-normal truncate py-0.5", children: isLocating ? "রাডার ঘুরতেসে... লোকেশন স্ক্যান হচ্ছে 📡" : `আপনার আশপাশে আজকে কোপ খাইসে ${nearbyCount} জন!` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600/80 mt-0.5 font-semibold", children: isLocating ? "মামা একটু ধৈর্য ধরেন..." : "ট্যাপ করেন কাছের খবর দেখতে" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isSheetOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setIsSheetOpen(false),
          className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-[4px]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
          transition: { type: "spring", damping: 26, stiffness: 220 },
          className: "fixed inset-x-0 bottom-0 z-50 flex max-h-[80vh] flex-col rounded-t-[32px] bg-[#FAF8F5]/95 backdrop-blur-3xl border-t border-white/50 shadow-2xl pb-6 select-none",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mx-auto my-3 h-1.5 w-12 rounded-full bg-gray-300/80 cursor-pointer",
                onClick: () => setIsSheetOpen(false)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-3 pt-1 flex items-center justify-between border-b border-gray-150/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 pr-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-extrabold text-gray-800 leading-normal py-0.5", children: [
                  "আপনার আশপাশে আজকে কোপ খাইসে ",
                  nearbyCount,
                  " জন!"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-gray-500 font-semibold mt-0.5 leading-relaxed py-0.5", children: "১০ কিলোমিটার ব্যাসার্ধের মধ্যে ঘটিত লাইভ কেসসমূহ" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setIsSheetOpen(false),
                  className: "rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-250 transition active:scale-90",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, strokeWidth: 2.5 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-1 py-3 space-y-1", children: nearbyReports.length > 0 ? nearbyReports.map((review) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review }, review.id)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-center space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-emerald-50 p-5 border border-emerald-100/50 text-emerald-500 animate-bounce", children: "🎉" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-extrabold text-gray-800", children: "সাবাস মামা! এলাকা তো পুরাই পরিষ্কার!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-[280px] text-xs text-gray-500 leading-relaxed font-semibold mt-1", children: "আপনার আশপাশে ১০ কিলোমিটারের মধ্যে আজকে কোনো চুরির রিপোর্ট নাই।" })
              ] })
            ] }) })
          ]
        }
      )
    ] }) })
  ] });
}
const reviews = [
  {
    id: "demo-new",
    author: "ঢাকার ওস্তাদ",
    location: "পাসপোর্ট অফিস",
    area: "আগারগাঁও, ঢাকা",
    timeAgo: "এইমাত্র",
    rating: 5,
    ratingLabel: "রক্ত চুইষা খাইসে!",
    category: "পরিচয় ও পাসপোর্ট (Identity)",
    items: [
      { label: "দালাল মামা (বাইরের কন্ট্রাক্ট)", amount: 5e3 },
      { label: "পুলিশ ভেরিফিকেশন ফি", amount: 2e3 },
      { label: "অফিসিয়াল চা-পানি", amount: 500 }
    ],
    total: 7500,
    story: "মামা, পাসপোর্ট করাইতে গিয়া তো পুরাই ফতুর! দালালে কয় ৫ হাজার ছাড়া নাকি ফাইল নড়বই না। লগে আবার পুলিশের চা-পানির খরচ আলাদা। এলাকাটা আগারগাঁও হইলেও পকেট কিন্তু পুরো দেশী স্টাইলে কাটসে!",
    sames: 0
  },
  {
    id: "1",
    author: "গুলিস্তানের জেমস বন্ড",
    location: "গুলশান সাব-রেজিস্ট্রি",
    timeAgo: "২ ঘণ্টা আগে",
    rating: 5,
    ratingLabel: "একদম মাখন!",
    category: "सरकारी দফতর",
    items: [
      { label: "দালাল মামা", amount: 1e3 },
      { label: "ফাইল মুভমেন্ট ফি", amount: 2500 },
      { label: "চা-নাস্তা", amount: 600 },
      { label: "স্যারের 'খু খুশি'", amount: 2500 }
    ],
    total: 6600,
    story: "ভাইরে ভাই, সকাল ৮টায় গেসিলাম, ভাবসিলাম কাজ হইয়া যাইব। শেষে দেখি লাইনে দাঁড়াইতেই দালাল মামা আইসা কয় - 'বস, সিস্টেমে যান, নাইলে ৩ মাসেও হইব না।' সিস্টেম মানে কী, পরে বুঝলাম। মাখনের মতো কাজ হইসে, পকেট ফাঁকা।",
    sames: 89
  },
  {
    id: "2",
    author: "মিরপুরের বাটপার",
    location: "বিআরটিএ মিরপুর",
    timeAgo: "৫ ঘণ্টা আগে",
    rating: 4,
    ratingLabel: "ভালোই কোপ",
    category: "সরকারি দফতর",
    items: [
      { label: "দালাল commission", amount: 1500 },
      { label: "ফিটনেস 'পাশ'", amount: 3e3 },
      { label: "ইন্সপেক্টর সাহেব", amount: 2e3 }
    ],
    total: 6500,
    story: "গাড়ির ফিটনেস করতে গেসি। দালাল ছাড়া ঢুকতেও দেয় না। ভিতরে গিয়া দেখি স্যারের মুখ গোমরা। ২ হাজার দিতেই হাসি ফুটল। বাংলাদেশ এগিয়ে যাচ্ছে!",
    sames: 156
  }
];
function Index() {
  const [reports, setReports] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!isSupabaseConfigured) {
      setReports(reviews);
      setLoading(false);
      return;
    }
    async function fetchReports() {
      try {
        const {
          data,
          error
        } = await supabase.from("bribe_reports").select("*").order("id", {
          ascending: false
        });
        if (error) {
          console.error("Supabase fetch failed", error);
          setReports(reviews);
        } else if (data && data.length > 0) {
          const mapped = data.map((item, index) => {
            const timeAgo = item.created_at ? formatDhakaiyaTime(item.created_at) : "আজকে";
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
              timeAgo,
              rating: item.teaCups || 3,
              ratingLabel: ratingLabels[item.teaCups] || "চুমুকে চুমুকে কোপ",
              category: item.category || "অন্যান্য",
              items: formattedItems,
              total: item.totalAmount || 0,
              story: item.comments || "",
              sames: item.sames !== void 0 ? item.sames : 0
            };
          });
          setReports([...reviews, ...mapped]);
        } else {
          setReports(reviews);
        }
      } catch (err) {
        console.error("Error fetching Supabase data", err);
        setReports(reviews);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    isSupabaseConfigured && /* @__PURE__ */ jsxRuntimeExports.jsx(LocalRadar, { reports }),
    !isSupabaseConfigured ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mt-6 flex flex-col items-center justify-center rounded-3xl border border-amber-200 bg-amber-50/50 p-8 text-center shadow-sm animate-in fade-in duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "💸" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-extrabold text-amber-800 leading-normal py-0.5", children: "ফাইলের নিচে চাকা লাগান নাই মামা!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-amber-700 leading-normal py-0.5 font-bold", children: "ওস্তাদ, চা-পানি (ডাটাবেজ কানেকশন) না খাওয়াইলে কি খাতা খুলবো? আগে পিছন দিয়া কিছু গুঁইজা দ্যান!" })
    ] }) : loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-[#00BCD4] border-t-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-gray-500", children: "রাডার ঘুরতেসে... ডেটা লোড হচ্ছে 📡" })
    ] }) : reports.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mt-6 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "😭" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-extrabold text-gray-700 leading-normal py-0.5", children: "এখনো কোনো কোপের খবর নাই!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-gray-400 leading-normal py-0.5", children: "মামা, আপনিই প্রথম কোপের খবর দিয়া ইতিহাস গড়েন!" })
    ] }) : reports.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review: r }, r.id))
  ] });
}
function formatDhakaiyaTime(dateStr) {
  try {
    const past = new Date(dateStr);
    const now = /* @__PURE__ */ new Date();
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 6e4);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);
    const bnNums = {
      "0": "০",
      "1": "১",
      "2": "২",
      "3": "৩",
      "4": "৪",
      "5": "৫",
      "6": "৬",
      "7": "৭",
      "8": "৮",
      "9": "৯"
    };
    const toBn = (num) => String(num).split("").map((d) => bnNums[d] || d).join("");
    if (diffMins < 1) return "এইমাত্র";
    if (diffMins < 60) return `${toBn(diffMins)} মিনিট আগে`;
    if (diffHrs < 24) return `${toBn(diffHrs)} ঘণ্টা আগে`;
    if (diffDays === 1) return "গতকাল";
    if (diffDays < 7) return `${toBn(diffDays)} দিন আগে`;
    return past.toLocaleDateString("bn-BD", {
      month: "short",
      day: "numeric"
    });
  } catch {
    return "কিছুক্ষণ আগে";
  }
}
export {
  Index as component
};
