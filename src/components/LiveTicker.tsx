import { tickerItems } from "@/lib/dummy-data";

export function LiveTicker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="bg-[#FFFDE7] overflow-hidden border-y border-amber-100/60">
      <div className="flex items-center gap-2 py-2">
        <span className="ml-3 shrink-0 text-[11px] font-bold uppercase tracking-wider text-amber-700">
          লাইভ
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap will-change-transform">
            {items.map((t, i) => (
              <span key={i} className="flex items-center text-sm text-gray-700">
                <span className="mx-4 inline-block h-2 w-2 rounded-full bg-rose-500 animate-pulse-dot" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
