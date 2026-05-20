import { MapPin } from "lucide-react";
import { useState } from "react";

export function LocalRadar() {
  const [active, setActive] = useState(false);
  return (
    <button
      onClick={() => setActive((v) => !v)}
      className={`mx-4 mt-4 flex w-[calc(100%-2rem)] items-center gap-3 rounded-2xl p-3.5 text-left transition ${
        active ? "bg-blue-100 text-blue-900" : "bg-blue-50 text-blue-800"
      }`}
    >
      <span className="relative grid h-9 w-9 shrink-0 place-items-center">
        <span className="absolute inset-0 rounded-full bg-blue-400/40 animate-radar-ping" />
        <span className="relative grid h-9 w-9 place-items-center rounded-full bg-blue-500 text-white">
          <MapPin size={16} strokeWidth={2.2} />
        </span>
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold leading-tight">
          আপনার আশপাশে আজকে বাঁশ খাইসে ৪ জন!
        </p>
        <p className="text-xs text-blue-600/80 mt-0.5">
          {active ? "ফিল্টার চালু • ট্যাপ করে বন্ধ করেন" : "ট্যাপ করেন কাছের খবর দেখতে"}
        </p>
      </div>
    </button>
  );
}
