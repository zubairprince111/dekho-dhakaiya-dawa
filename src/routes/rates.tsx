import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/rates")({
  head: () => ({
    meta: [
      { title: "আজকের বাজার | দেখো — ‘চা-পানির’ হিসাব!" },
      { name: "description", content: "ঘুষ ও দালালির আজকের গড় বাজারদর।" },
    ],
  }),
  component: Rates,
});

function Rates() {
  const [ratesList, setRatesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setRatesList([]);
      setLoading(false);
      return;
    }

    async function fetchRates() {
      try {
        const { data, error } = await supabase
          .from("bribe_rates")
          .select("*")
          .order("id", { ascending: true });

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

  return (
    <AppShell>
      <div className="mx-4 mt-4">
        <h1 className="text-2xl font-extrabold text-gray-800">আজকের বাজার</h1>
        <p className="mt-1 text-sm text-gray-500">কোন সার্ভিসে কত খসবে — আজকের গড়</p>
      </div>

      {!isSupabaseConfigured ? (
        <div className="mx-4 mt-6 flex flex-col items-center justify-center rounded-3xl border border-amber-200 bg-amber-50/50 p-8 text-center shadow-sm animate-in fade-in duration-200">
          <div className="text-4xl mb-3">📈</div>
          <h3 className="text-base font-extrabold text-amber-800 leading-normal py-0.5">আজকের বাজারদর আড়ালে চলে গেছে!</h3>
          <p className="mt-1 text-xs text-amber-700 leading-normal py-0.5 font-bold">ওস্তাদ, বাজারের হিসেবনিকাশ (ডাটাবেজ কানেকশন) রেডি নাই! আগে পিছনে স্পিড বাড়িয়ে খাতাটা সচল করেন!</p>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#00BCD4] border-t-transparent" />
          <p className="text-sm font-bold text-gray-500">রাডার ঘুরতেসে... বাজারদর লোড হচ্ছে 📡</p>
        </div>
      ) : ratesList.length === 0 ? (
        <div className="mx-4 mt-6 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="text-3xl mb-2">🎉</div>
          <h4 className="text-sm font-bold text-gray-700 leading-normal py-0.5">কোনো বাজারদর পাওয়া যায় নাই!</h4>
          <p className="text-xs text-gray-400 leading-normal py-0.5">মামা, ডাটাবেজে এখনো কোনো বাজারদর রেকর্ড করা হয়নি।</p>
        </div>
      ) : (
        <div className="mt-4 space-y-3 px-4 pb-8">
          {ratesList.map((r, i) => (
            <RateRow key={i} item={r} />
          ))}
        </div>
      )}
    </AppShell>
  );
}

function RateRow({ item }: { item: any }) {
  const [revealed, setRevealed] = useState(false);
  const Icon = item.trend === "up" ? TrendingUp : item.trend === "down" ? TrendingDown : Minus;
  const trendColor = item.trend === "up" ? "#E91E63" : item.trend === "down" ? "#10B981" : "#9CA3AF";

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-gray-800">{item.service}</p>
          <p className="mt-0.5 text-xs text-gray-500">{item.location}</p>
        </div>
      </div>
      <button
        onClick={() => setRevealed(true)}
        disabled={revealed}
        className="relative mt-3 block w-full overflow-hidden rounded-xl bg-gray-50 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold tabular-nums text-gray-800">
            গড় কোপ: {item.avgPrice.toLocaleString("bn-BD")} ৳
          </span>
          <Icon size={18} color={trendColor} strokeWidth={2.4} />
        </div>
        <AnimatePresence>
          {!revealed && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 grid place-items-center bg-gray-200/80 backdrop-blur-md"
            >
              <span className="text-sm font-semibold text-gray-700">আজকের রেট দেখেন</span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
