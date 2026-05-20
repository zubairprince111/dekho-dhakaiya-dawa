import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { rates } from "@/lib/dummy-data";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/rates")({
  head: () => ({
    meta: [
      { title: "আজকের বাজার — দেখো" },
      { name: "description", content: "ঘুষ ও দালালির আজকের গড় বাজারদর।" },
    ],
  }),
  component: Rates,
});

function Rates() {
  return (
    <AppShell>
      <div className="mx-4 mt-4">
        <h1 className="text-2xl font-extrabold text-gray-800">আজকের বাজার</h1>
        <p className="mt-1 text-sm text-gray-500">কোন সার্ভিসে কত খসবে — আজকের গড়</p>
      </div>
      <div className="mt-4 space-y-3 px-4">
        {rates.map((r, i) => (
          <RateRow key={i} item={r} />
        ))}
      </div>
    </AppShell>
  );
}

function RateRow({ item }: { item: (typeof rates)[number] }) {
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
            গড় বাঁশ: {item.avgPrice.toLocaleString("bn-BD")} ৳
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
