import { useState, useEffect } from "react";
import { Handshake } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { toast } from "sonner";
import type { Review } from "@/lib/dummy-data";

function TeaCup({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"
        stroke={filled ? "#FFB300" : "#D1D5DB"}
        strokeWidth="1.8"
        fill={filled ? "#FFB300" : "none"}
      />
      <path d="M17 10h2a3 3 0 0 1 0 6h-2" stroke={filled ? "#FFB300" : "#D1D5DB"} strokeWidth="1.8" />
      <path d="M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3" stroke={filled ? "#FFB300" : "#D1D5DB"} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Avatar({ seed }: { seed: string }) {
  const hue = (seed.charCodeAt(0) * 37) % 360;
  return (
    <div
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
      style={{ background: `linear-gradient(135deg, hsl(${hue} 70% 55%), hsl(${(hue + 60) % 360} 70% 60%))` }}
    >
      {seed.charAt(0)}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  const [samesCount, setSamesCount] = useState(review.sames);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Check localStorage if the user has already voted on this post
    const voted = localStorage.getItem(`voted_same_${review.id}`);
    if (voted === "true") {
      setHasVoted(true);
    }
  }, [review.id]);

  const handleVote = async () => {
    if (hasVoted) {
      toast.info("মামা, অলরেডি তো 'us ভাই us' বইলা ফেলছেন! ❤️", {
        description: "একই পোস্টে বারবার ভোট দেওয়া যাবে না ওস্তাদ।",
        duration: 3000,
      });
      return;
    }

    try {
      setIsSyncing(true);
      
      const newCount = samesCount + 1;

      // Synchronize with database via secure API
      if (isSupabaseConfigured) {
        const response = await fetch("/api/vote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reportId: review.id,
            newCount: newCount,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to vote");
        }
      }

      // Update state immediately for premium, zero-latency response after success
      setSamesCount(newCount);
      setHasVoted(true);
      localStorage.setItem(`voted_same_${review.id}`, "true");

      toast.success("us ভাই us! 🤝", {
        description: "কোপের অনুভূতি একদম মিইলা গেল মামা!",
        duration: 3000,
      });

    } catch (err) {
      console.warn("Error updating vote:", err);
      toast.error("ওস্তাদ, ভোটটা দেওয়া গেল না!", {
        description: "সার্ভারে একটু সমস্যা হইছে। একটু পর ট্রাই মারেন।",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <article className="mx-4 mt-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <header className="flex items-start gap-3">
        <Avatar seed={review.author} />
        {/* Left: author + office name + time */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-800">{review.author}</p>
          <p className="truncate text-xs font-bold text-gray-600 mt-0.5">{review.location}</p>
          <span className="text-[10px] text-gray-400">• {review.timeAgo}</span>
        </div>
        {/* Right: category pill + 📍 area below it */}
        <div className="flex flex-col items-end gap-0.5 shrink-0">
          <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-bold text-cyan-700 text-right">
            {review.category}
          </span>
          {review.area && (
            <p className="text-[11px] font-bold text-gray-500 flex items-center gap-0.5">
              <span className="text-cyan-600">📍</span>{review.area}
            </p>
          )}
        </div>
      </header>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <TeaCup key={i} filled={i <= review.rating} />
          ))}
        </div>
        <span className="text-xs font-medium text-gray-600">{review.ratingLabel}</span>
      </div>

      <div className="my-3 rounded-xl bg-gray-50 p-4">
        {review.items.map((it, idx) => (
          <div
            key={idx}
            className={`flex items-baseline justify-between gap-2 py-1.5 ${
              idx < review.items.length - 1 ? "border-b border-dashed border-gray-300" : ""
            }`}
          >
            <span className="text-sm text-gray-700">{it.label}</span>
            <span className="text-sm font-medium text-gray-800 tabular-nums">
              {it.amount.toLocaleString("bn-BD")} ৳
            </span>
          </div>
        ))}
        <div className="mt-3 flex items-baseline justify-between border-t border-gray-300 pt-3">
          <span className="text-sm font-bold text-[#E91E63]">সর্বমোট কোপ</span>
          <span className="text-base font-extrabold text-[#E91E63] tabular-nums">
            {review.total.toLocaleString("bn-BD")} ৳
          </span>
        </div>
      </div>

      <p className="text-[15px] leading-relaxed text-gray-700">{review.story}</p>

      <div className="mt-4 flex items-center justify-center border-t border-gray-100 pt-3">
        <ActionBtn
          icon={<Handshake size={18} strokeWidth={1.8} />}
          label="us ভাই us"
          count={samesCount}
          hasVoted={hasVoted}
          onClick={handleVote}
          disabled={isSyncing}
        />
      </div>
    </article>
  );
}

interface ActionBtnProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  hasVoted: boolean;
  onClick: () => void;
  disabled?: boolean;
}

function ActionBtn({ icon, label, count, hasVoted, onClick, disabled }: ActionBtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 px-4 transition-all duration-200 active:scale-95 cursor-pointer max-w-[140px] ${
        hasVoted
          ? "bg-rose-50/75 text-rose-600 font-extrabold shadow-sm border border-rose-100/50"
          : "text-gray-600 hover:bg-rose-50/20 hover:text-rose-500 border border-transparent"
      }`}
    >
      <div className="flex items-center gap-1.5">
        <div className={`transition-transform duration-300 ${hasVoted ? "scale-110 rotate-3 text-rose-500 animate-bounce" : ""}`}>
          {icon}
        </div>
        <span className={`text-xs font-bold tabular-nums ${hasVoted ? "text-rose-600 scale-105" : ""}`}>{count}</span>
      </div>
      <span className="text-[10px] tracking-wide font-extrabold leading-tight">{label}</span>
    </button>
  );
}
