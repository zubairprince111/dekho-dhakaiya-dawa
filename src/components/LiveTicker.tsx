import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const LOCAL_HEADLINES = [
  "ওয়াসা: পানির লাইনের নতুন সংযোগ ফি বাড়সে মামা! 💧",
  "আজকের বাজারদর দেখতে 'আজকের বাজার' ট্যাবে চোখ রাখুন! 📈",
  "মিরপুর বিআরটিএ: আজকে দালালের জাদুতে সবার লাইসেন্স এক দিনেই কমপ্লিট! 🪄",
  "ফাইলের গতি বাড়াইতে 'স্পিড মানি' স্প্রে করুন, ফ্যানের বাতাস খাইতে খাইতে ফাইল সরান! 💸",
  "গুলশান সাব-রেজিস্ট্রি: স্যারদের 'মিষ্টি খাওয়ার' বাজেট ১৫% বৃদ্ধি পাইসে! 🍬",
  "দালাল মামাদের মিষ্টি মিষ্টি ডায়লগ থেকে পকেট সাবধানে রাখুন ওস্তাদ! ⚠️",
  "ভূমি অফিস: নামজারি ফি দ্বিগুণ হইসে কিন্তু ফাইলের স্পিড অর্ধেক হইসে! 🐢"
];

export function LiveTicker() {
  const [items, setItems] = useState<string[]>(LOCAL_HEADLINES);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    const fetchLatestReports = async () => {
      try {
        const { data, error } = await supabase
          .from("bribe_reports")
          .select("id, author, officeName, totalAmount, comments")
          .order("id", { ascending: false })
          .limit(10);

        if (!error && data && data.length > 0) {
          const dynamicItems = data.map((item: any) => {
            const office = item.officeName || "সরকারি অফিস";
            const authorName = item.author || "অজ্ঞাত পাবলিক";
            const amountStr = item.totalAmount ? `৳${parseFloat(item.totalAmount).toLocaleString("bn-BD")}` : "";
            
            // Satirical Dhakaiya ticker templates
            const templates = [
              `${office}: ${authorName} ${amountStr ? amountStr + ' টাকার' : ''} 'চা-পানি' বিল পরিশোধ করলো! 💸`,
              `${office}: ওস্তাদ! ${authorName} এর পকেট থেকে ${amountStr || 'কিছু টাকা'} হাওয়া হয়ে গেল! 🤫`,
              `${office}: ${authorName} এর ফাইলে সই বসাতে ${amountStr || 'চা-পানি খরচ'} লাগলো! ⚖️`,
              `${office}: "${item.comments ? item.comments.slice(0, 45) + '...' : 'দালাল ভাইদের চা-পানিতে সন্তুষ্ট করা হইলো'}"`
            ];
            
            // Select template deterministically based on report ID
            const index = Math.abs(Number(item.id) || 0) % templates.length;
            return templates[index];
          });
          
          // Merge with dynamic items if we have less than 5 items to keep the marquee long and smooth
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

    // Poll for fresh reports every 45 seconds
    const interval = setInterval(fetchLatestReports, 45000);
    return () => clearInterval(interval);
  }, []);

  // Double items for seamless infinite marquee loop
  const marqueeItems = [...items, ...items];

  return (
    <div className="bg-[#FFFDE7] overflow-hidden border-y border-amber-100/60 select-none">
      <div className="flex items-center gap-2 py-2">
        <span className="ml-3 shrink-0 text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1 animate-pulse">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-600 animate-ping" />
          লাইভ
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap will-change-transform">
            {marqueeItems.map((t, i) => (
              <span key={i} className="flex items-center text-xs font-bold text-gray-700">
                <span className="mx-4 inline-block h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse-dot" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
