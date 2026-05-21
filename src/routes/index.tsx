import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { LocalRadar } from "@/components/LocalRadar";
import { ReviewCard } from "@/components/ReviewCard";
import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "দেখো- কাঁচকলা কেমনে খায়" },
      { name: "description", content: "বাংলাদেশের প্রতিদিনের কোপ-কাহিনী ও সরকারি দফতর রিভিউ।" },
    ],
  }),
  component: Index,
});

function Index() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    async function fetchReports() {
      try {
        const { data, error } = await supabase
          .from("bribe_reports")
          .select("*")
          .order("id", { ascending: false });

        if (error) {
          console.error("Supabase fetch failed", error);
          setReports([]);
        } else if (data && data.length > 0) {
          const mapped = data.map((item: any, index: number) => {
            const timeAgo = item.created_at
              ? formatDhakaiyaTime(item.created_at)
              : "আজকে";

            const ratingLabels: Record<number, string> = {
              1: "হালকা চা-পানি",
              2: "গলা শুকনা ছিল",
              3: "চুমুকে চুমুকে কোপ",
              4: "কলিজা শুকায়া দিসে",
              5: "রক্ত চুইষা খাইসে!",
            };

            let formattedItems = [];
            if (Array.isArray(item.items)) {
              formattedItems = item.items.map((c: any) => ({
                label: c.label || c.who || "চা-পানি ফি",
                amount: parseFloat(c.amount) || 0,
              }));
            }

            return {
              id: item.id || String(index),
              author: item.author || "অজ্ঞাত পাবলিক",
              location: item.officeName || "সরকারি অফিস",
              timeAgo,
              rating: item.teaCups || 3,
              ratingLabel: ratingLabels[item.teaCups] || "চুমুকে চুমুকে কোপ",
              category: item.category || "অন্যান্য",
              items: formattedItems,
              total: item.totalAmount || 0,
              story: item.comments || "",
              sames: item.sames !== undefined ? item.sames : 0,
            };
          });
          setReports(mapped);
        } else {
          setReports([]);
        }
      } catch (err) {
        console.error("Error fetching Supabase data", err);
        setReports([]);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  return (
    <AppShell>
      {isSupabaseConfigured && <LocalRadar reports={reports} />}

      {!isSupabaseConfigured ? (
        <div className="mx-4 mt-6 flex flex-col items-center justify-center rounded-3xl border border-amber-200 bg-amber-50/50 p-8 text-center shadow-sm animate-in fade-in duration-200">
          <div className="text-4xl mb-3">💸</div>
          <h3 className="text-base font-extrabold text-amber-800 leading-normal py-0.5">ফাইলের নিচে চাকা লাগান নাই মামা!</h3>
          <p className="mt-1 text-xs text-amber-700 leading-normal py-0.5 font-bold">ওস্তাদ, চা-পানি (ডাটাবেজ কানেকশন) না খাওয়াইলে কি খাতা খুলবো? আগে পিছন দিয়া কিছু গুঁইজা দ্যান!</p>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#00BCD4] border-t-transparent" />
          <p className="text-sm font-bold text-gray-500">রাডার ঘুরতেসে... ডেটা লোড হচ্ছে 📡</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="mx-4 mt-6 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="text-4xl mb-3">😭</div>
          <h3 className="text-base font-extrabold text-gray-700 leading-normal py-0.5">এখনো কোনো কোপের খবর নাই!</h3>
          <p className="mt-1 text-xs text-gray-400 leading-normal py-0.5">মামা, আপনিই প্রথম কোপের খবর দিয়া ইতিহাস গড়েন!</p>
        </div>
      ) : (
        reports.map((r) => <ReviewCard key={r.id} review={r} />)
      )}
    </AppShell>
  );
}

function formatDhakaiyaTime(dateStr: string) {
  try {
    const past = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    const bnNums: Record<string, string> = {
      "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
      "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
    };
    const toBn = (num: number) => String(num).split("").map((d) => bnNums[d] || d).join("");

    if (diffMins < 1) return "এইমাত্র";
    if (diffMins < 60) return `${toBn(diffMins)} মিনিট আগে`;
    if (diffHrs < 24) return `${toBn(diffHrs)} ঘণ্টা আগে`;
    if (diffDays === 1) return "গতকাল";
    if (diffDays < 7) return `${toBn(diffDays)} দিন আগে`;

    return past.toLocaleDateString("bn-BD", { month: "short", day: "numeric" });
  } catch {
    return "কিছুক্ষণ আগে";
  }
}
