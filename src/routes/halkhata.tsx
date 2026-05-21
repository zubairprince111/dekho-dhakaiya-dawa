import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/halkhata")({
  head: () => ({
    meta: [
      { title: "কোথায় কত কোপ — দেখো" },
      { name: "description", content: "বাংলাদেশের সরকারি দফতর সমূহের মোট এবং গড় ঘুষের রিয়েল-টাইম এনালিটিক্স।" },
    ],
  }),
  component: LB,
});

// Interactive requestAnimationFrame CountUp component
function CountUp({ end, duration = 1.2, formatter }: { end: number; duration?: number; formatter?: (val: number) => string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{formatter ? formatter(count) : count}</>;
}

function LB() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setSubmissions([]);
      setLoading(false);
      return;
    }

    async function fetchSubmissions() {
      try {
        const { data, error } = await supabase
          .from("bribe_reports")
          .select("*");

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

  // 1. Grand Totals
  const totalBribeAmount = submissions.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
  const totalContributors = submissions.length;

  // 2. Group submissions by Office Name
  const officeGroups: Record<string, { office: string; sum: number; count: number; avg: number }> = {};
  
  submissions.forEach((sub) => {
    const office = sub.officeName || "অন্যান্য সরকারি অফিস";
    const amount = sub.totalAmount || 0;
    if (!officeGroups[office]) {
      officeGroups[office] = { office, sum: 0, count: 0, avg: 0 };
    }
    officeGroups[office].sum += amount;
    officeGroups[office].count += 1;
  });

  // Calculate AVG and convert to array
  const officeRankings = Object.values(officeGroups).map((group) => {
    group.avg = group.count > 0 ? Math.round(group.sum / group.count) : 0;
    return group;
  });

  // Sort the array in descending order based on the SUM
  officeRankings.sort((a, b) => b.sum - a.sum);

  return (
    <AppShell>
      {!isSupabaseConfigured ? (
        <div className="mx-4 mt-6 flex flex-col items-center justify-center rounded-3xl border border-amber-200 bg-amber-50/50 p-8 text-center shadow-sm animate-in fade-in duration-200">
          <div className="text-4xl mb-3">🤝</div>
          <h3 className="text-base font-extrabold text-amber-800 leading-normal py-0.5">সব ধান্দাবাজ হাওয়া হয়া গেছে!</h3>
          <p className="mt-1 text-xs text-amber-700 leading-normal py-0.5 font-bold">ওস্তাদ, ধান্দাবাজদের খাতা (ডাটাবেজ কানেকশন) রেডি নাই! আগে পিছনে কিছু চালান করেন, খাতা সচল হবে!</p>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#00BCD4] border-t-transparent" />
          <p className="text-sm font-bold text-gray-500 leading-normal py-0.5">রাডার ঘুরতেসে... ড্যাশবোর্ড আপডেট হচ্ছে 📡</p>
        </div>
      ) : (
        <>
          {/* Hero Section (Grand Totals) */}
          <div className="mx-4 mt-6 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="rounded-3xl bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white shadow-xl flex flex-col items-center text-center space-y-4">
              <div className="space-y-1">
                <p className="text-xs uppercase font-extrabold tracking-widest text-red-100 leading-normal py-0.5">
                  🚨 সর্বমোট কোপের পরিমাণ:
                </p>
                <h2 className="text-4xl xs:text-5xl font-black tracking-tight tabular-nums leading-normal py-0.5">
                  <CountUp end={totalBribeAmount} formatter={(val) => `৳${val.toLocaleString("bn-BD")}`} />
                </h2>
              </div>
              
              <div className="h-[1px] w-full bg-white/20" />
              
              <div className="space-y-0.5">
                <p className="text-xs uppercase font-extrabold tracking-widest text-orange-100 leading-normal py-0.5">
                  👥 টোটাল কোপ খাওয়া পাবলিক:
                </p>
                <p className="text-2xl font-bold tracking-tight leading-normal py-0.5">
                  <CountUp end={totalContributors} formatter={(val) => `${val.toLocaleString("bn-BD")} জন`} />
                </p>
              </div>
            </div>
          </div>

          {/* Leaderboard Section (Office Rankings) */}
          <div className="mx-4 mt-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight leading-normal py-0.5">
              সেরা পারফর্মার
            </h2>
            
            <div className="mt-4 space-y-3 pb-8">
              {officeRankings.length > 0 ? (
                officeRankings.map((ranking, index) => {
                  const rank = index + 1;
                  const isTopSpot = rank === 1;
                  
                  return (
                    <div
                      key={ranking.office}
                      className={`relative overflow-hidden rounded-3xl border bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] ${
                        isTopSpot ? "border-amber-200 ring-2 ring-amber-100/50" : "border-gray-100"
                      }`}
                    >
                      {isTopSpot && (
                        <div className="absolute right-0 top-0 bg-amber-500 text-white font-extrabold text-[10px] px-3.5 py-1.5 rounded-bl-2xl shadow-sm uppercase tracking-wider flex items-center gap-1 leading-normal">
                          👑 সেরা নিমকহারাম
                        </div>
                      )}
                      
                      <div className="flex items-start gap-4">
                        <div
                          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-black text-white shadow-md transition-transform duration-300 hover:scale-105"
                          style={{
                            background: isTopSpot
                              ? "linear-gradient(135deg, #FFB300, #FF8F00)"
                              : rank === 2
                              ? "linear-gradient(135deg, #B0BEC5, #78909C)"
                              : rank === 3
                              ? "linear-gradient(135deg, #BCAAA4, #8D6E63)"
                              : "linear-gradient(135deg, #00BCD4, #0097A7)"
                          }}
                        >
                          #{rank}
                        </div>
                        
                        <div className="min-w-0 flex-1">
                          <h3 className="font-extrabold text-gray-800 truncate text-base pr-20 leading-normal py-0.5">
                            {ranking.office}
                          </h3>
                          
                          <div className="mt-2.5 space-y-1">
                            <p className="text-sm font-semibold text-gray-500 leading-normal py-0.5">
                              মোট কোপ দিসে:{" "}
                              <span className="text-red-500 text-2xl font-bold tracking-tight tabular-nums block sm:inline leading-normal py-0.5">
                                ৳{ranking.sum.toLocaleString("bn-BD")}
                              </span>
                            </p>
                            <p className="text-gray-400 text-xs font-semibold leading-normal py-0.5">
                              জনপ্রতি গড় কোপ: ৳{ranking.avg.toLocaleString("bn-BD")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-gray-200 bg-white">
                  <div className="text-3xl mb-2">🎉</div>
                  <h4 className="text-sm font-bold text-gray-700 leading-normal py-0.5">কোনো দুর্নীতির রেকর্ড নাই!</h4>
                  <p className="text-xs text-gray-400 leading-normal py-0.5">সারা বাংলাদেশ কি একরাতেই সৎ হয়ে গেল মামা?</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}
