import type { Review } from "@/lib/dummy-data";
import { Laugh, Handshake, TriangleAlert } from "lucide-react";

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
  return (
    <article className="mx-4 mt-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <header className="flex items-center gap-3">
        <Avatar seed={review.author} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-800">{review.author}</p>
          <p className="truncate text-xs text-gray-500 leading-normal py-0.5">
            {review.location} • {review.timeAgo}
          </p>
        </div>
        <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700">
          {review.category}
        </span>
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

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
        <ActionBtn icon={<Laugh size={18} strokeWidth={1.8} />} label="সেই লেভেলের কোপ!" count={review.laughs} />
        <ActionBtn icon={<Handshake size={18} strokeWidth={1.8} />} label="সেম টু সেম" count={review.sames} />
        <ActionBtn icon={<TriangleAlert size={18} strokeWidth={1.8} />} label="চাপাবাজি!" count={review.caps} />
      </div>
    </article>
  );
}

function ActionBtn({ icon, label, count }: { icon: React.ReactNode; label: string; count: number }) {
  return (
    <button className="flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-gray-600 active:bg-gray-50 transition">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-xs font-medium tabular-nums">{count}</span>
      </div>
      <span className="text-[10px] text-gray-500 leading-tight">{label}</span>
    </button>
  );
}
