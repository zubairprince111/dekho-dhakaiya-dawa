import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell } from "./AppShell-BloKswEJ.mjs";
import { i as isSupabaseConfigured, s as supabase } from "./router-DBm3iMqC.mjs";
import "../_libs/sonner.mjs";
import "../_libs/html2canvas.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
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
function CountUp({
  end,
  duration = 1.2,
  formatter
}) {
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1e3), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: formatter ? formatter(count) : count });
}
function LB() {
  const [submissions, setSubmissions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!isSupabaseConfigured) {
      setSubmissions([]);
      setLoading(false);
      return;
    }
    async function fetchSubmissions() {
      try {
        const {
          data,
          error
        } = await supabase.from("bribe_reports").select("*");
        if (error) {
          console.error("Supabase fetch failed in leaderboard", error);
          setSubmissions([]);
        } else if (data && data.length > 0) {
          setSubmissions(data);
        } else {
          setSubmissions([]);
        }
      } catch (err) {
        console.error("Error in leaderboard live fetch", err);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSubmissions();
  }, []);
  const totalBribeAmount = submissions.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
  const totalContributors = submissions.length;
  const officeGroups = {};
  submissions.forEach((sub) => {
    const office = sub.officeName || "অন্যান্য সরকারি অফিস";
    const amount = sub.totalAmount || 0;
    if (!officeGroups[office]) {
      officeGroups[office] = {
        office,
        sum: 0,
        count: 0,
        avg: 0
      };
    }
    officeGroups[office].sum += amount;
    officeGroups[office].count += 1;
  });
  const officeRankings = Object.values(officeGroups).map((group) => {
    group.avg = group.count > 0 ? Math.round(group.sum / group.count) : 0;
    return group;
  });
  officeRankings.sort((a, b) => b.sum - a.sum);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: !isSupabaseConfigured ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mt-6 flex flex-col items-center justify-center rounded-3xl border border-amber-200 bg-amber-50/50 p-8 text-center shadow-sm animate-in fade-in duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "🤝" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-extrabold text-amber-800 leading-normal py-0.5", children: "সব ধান্দাবাজ হাওয়া হয়া গেছে!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-amber-700 leading-normal py-0.5 font-bold", children: "ওস্তাদ, ধান্দাবাজদের খাতা (ডাটাবেজ কানেকশন) রেডি নাই! আগে পিছনে কিছু চালান করেন, খাতা সচল হবে!" })
  ] }) : loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-[#00BCD4] border-t-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-gray-500 leading-normal py-0.5", children: "রাডার ঘুরতেসে... ড্যাশবোর্ড আপডেট হচ্ছে 📡" })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-4 mt-6 animate-in fade-in slide-in-from-top-3 duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white shadow-xl flex flex-col items-center text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase font-extrabold tracking-widest text-red-100 leading-normal py-0.5", children: "🚨 সর্বমোট কোপের পরিমাণ:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl xs:text-5xl font-black tracking-tight tabular-nums leading-normal py-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { end: totalBribeAmount, formatter: (val) => `৳${val.toLocaleString("bn-BD")}` }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[1px] w-full bg-white/20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase font-extrabold tracking-widest text-orange-100 leading-normal py-0.5", children: "👥 টোটাল কোপ খাওয়া পাবলিক:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold tracking-tight leading-normal py-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { end: totalContributors, formatter: (val) => `${val.toLocaleString("bn-BD")} জন` }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mt-8 animate-in fade-in slide-in-from-bottom-3 duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gray-800 tracking-tight leading-normal py-0.5", children: "সেরা পারফর্মার" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3 pb-8", children: officeRankings.length > 0 ? officeRankings.map((ranking, index) => {
        const rank = index + 1;
        const isTopSpot = rank === 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative overflow-hidden rounded-3xl border bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] ${isTopSpot ? "border-amber-200 ring-2 ring-amber-100/50" : "border-gray-100"}`, children: [
          isTopSpot && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 bg-amber-500 text-white font-extrabold text-[10px] px-3.5 py-1.5 rounded-bl-2xl shadow-sm uppercase tracking-wider flex items-center gap-1 leading-normal", children: "👑 সেরা নিমকহারাম" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-black text-white shadow-md transition-transform duration-300 hover:scale-105", style: {
              background: isTopSpot ? "linear-gradient(135deg, #FFB300, #FF8F00)" : rank === 2 ? "linear-gradient(135deg, #B0BEC5, #78909C)" : rank === 3 ? "linear-gradient(135deg, #BCAAA4, #8D6E63)" : "linear-gradient(135deg, #00BCD4, #0097A7)"
            }, children: [
              "#",
              rank
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-gray-800 truncate text-base pr-20 leading-normal py-0.5", children: ranking.office }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-gray-500 leading-normal py-0.5", children: [
                  "মোট কোপ দিসে:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-500 text-2xl font-bold tracking-tight tabular-nums block sm:inline leading-normal py-0.5", children: [
                    "৳",
                    ranking.sum.toLocaleString("bn-BD")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 text-xs font-semibold leading-normal py-0.5", children: [
                  "জনপ্রতি গড় কোপ: ৳",
                  ranking.avg.toLocaleString("bn-BD")
                ] })
              ] })
            ] })
          ] })
        ] }, ranking.office);
      }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-gray-200 bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: "🎉" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-gray-700 leading-normal py-0.5", children: "কোনো দুর্নীতির রেকর্ড নাই!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 leading-normal py-0.5", children: "সারা বাংলাদেশ কি একরাতেই সৎ হয়ে গেল মামা?" })
      ] }) })
    ] })
  ] }) });
}
export {
  LB as component
};
