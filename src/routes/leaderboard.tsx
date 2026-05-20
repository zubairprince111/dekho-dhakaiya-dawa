import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { leaders } from "@/lib/dummy-data";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "সেরা ধান্দাবাজ — দেখো" },
      { name: "description", content: "এই সপ্তাহের শীর্ষ বাঁশদাতা প্রতিষ্ঠান।" },
    ],
  }),
  component: LB,
});

function LB() {
  return (
    <AppShell>
      <div className="mx-4 mt-4">
        <h1 className="text-2xl font-extrabold text-gray-800">সেরা ধান্দাবাজ</h1>
        <p className="mt-1 text-sm text-gray-500">এই সপ্তাহের চ্যাম্পিয়নরা</p>
      </div>
      <div className="mt-4 space-y-3 px-4">
        {leaders.map((l) => (
          <div
            key={l.rank}
            className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-extrabold text-white"
              style={{
                background:
                  l.rank === 1
                    ? "linear-gradient(135deg,#FFB300,#FF8F00)"
                    : l.rank === 2
                    ? "linear-gradient(135deg,#B0BEC5,#78909C)"
                    : l.rank === 3
                    ? "linear-gradient(135deg,#BCAAA4,#8D6E63)"
                    : "linear-gradient(135deg,#E91E63,#FFB300)",
              }}
            >
              #{l.rank}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-gray-800">{l.name}</p>
              <p className="mt-0.5 text-xs text-gray-500">
                {l.cases.toLocaleString("bn-BD")} রিভিউ • মোট বাঁশ {l.totalDamage.toLocaleString("bn-BD")} ৳
              </p>
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-[#E91E63]">
                <Trophy size={10} /> {l.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
