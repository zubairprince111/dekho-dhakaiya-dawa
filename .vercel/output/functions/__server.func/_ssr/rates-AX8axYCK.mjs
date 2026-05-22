import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell } from "./AppShell-BloKswEJ.mjs";
import { i as isSupabaseConfigured, s as supabase } from "./router-DBm3iMqC.mjs";
import "../_libs/sonner.mjs";
import "../_libs/html2canvas.mjs";
import { g as TrendingUp, T as TrendingDown, c as Minus } from "../_libs/lucide-react.mjs";
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
function Rates() {
  const [ratesList, setRatesList] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!isSupabaseConfigured) {
      setRatesList([]);
      setLoading(false);
      return;
    }
    async function fetchRates() {
      try {
        const {
          data,
          error
        } = await supabase.from("bribe_rates").select("*").order("id", {
          ascending: true
        });
        if (error) {
          console.error("Supabase fetch failed in rates", error);
          setRatesList([]);
        } else if (data) {
          setRatesList(data);
        }
      } catch (err) {
        console.error("Error in rates fetch", err);
        setRatesList([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRates();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold text-gray-800", children: "আজকের বাজার" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500", children: "কোন সার্ভিসে কত খসবে — আজকের গড়" })
    ] }),
    !isSupabaseConfigured ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mt-6 flex flex-col items-center justify-center rounded-3xl border border-amber-200 bg-amber-50/50 p-8 text-center shadow-sm animate-in fade-in duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "📈" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-extrabold text-amber-800 leading-normal py-0.5", children: "আজকের বাজারদর আড়ালে চলে গেছে!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-amber-700 leading-normal py-0.5 font-bold", children: "ওস্তাদ, বাজারের হিসেবনিকাশ (ডাটাবেজ কানেকশন) রেডি নাই! আগে পিছনে স্পিড বাড়িয়ে খাতাটা সচল করেন!" })
    ] }) : loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-[#00BCD4] border-t-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-gray-500", children: "রাডার ঘুরতেসে... বাজারদর লোড হচ্ছে 📡" })
    ] }) : ratesList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mt-6 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: "🎉" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-gray-700 leading-normal py-0.5", children: "কোনো বাজারদর পাওয়া যায় নাই!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 leading-normal py-0.5", children: "মামা, ডাটাবেজে এখনো কোনো বাজারদর রেকর্ড করা হয়নি।" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3 px-4 pb-8", children: ratesList.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RateRow, { item: r }, i)) })
  ] });
}
function RateRow({
  item
}) {
  const [revealed, setRevealed] = reactExports.useState(false);
  const Icon = item.trend === "up" ? TrendingUp : item.trend === "down" ? TrendingDown : Minus;
  const trendColor = item.trend === "up" ? "#E91E63" : item.trend === "down" ? "#10B981" : "#9CA3AF";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-800", children: item.service }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-gray-500", children: item.location })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setRevealed(true), disabled: revealed, className: "relative mt-3 block w-full overflow-hidden rounded-xl bg-gray-50 px-4 py-3 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-extrabold tabular-nums text-gray-800", children: [
          "গড় কোপ: ",
          item.avgPrice.toLocaleString("bn-BD"),
          " ৳"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, color: trendColor, strokeWidth: 2.4 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: !revealed && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 1
      }, exit: {
        opacity: 0
      }, transition: {
        duration: 0.45
      }, className: "absolute inset-0 grid place-items-center bg-gray-200/80 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-gray-700", children: "আজকের রেট দেখেন" }) }) })
    ] })
  ] });
}
export {
  Rates as component
};
