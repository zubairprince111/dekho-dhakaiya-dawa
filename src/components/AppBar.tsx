import { Search } from "lucide-react";

export function AppBar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-2">
          <EyesLogo />
          <span
            className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #E91E63 0%, #FFB300 100%)",
            }}
          >
            দেখো
          </span>
        </div>
        <button
          aria-label="search"
          className="grid h-10 w-10 place-items-center rounded-full bg-gray-50 text-gray-700 active:scale-95 transition"
        >
          <Search size={20} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}

function EyesLogo() {
  return (
    <svg width="40" height="22" viewBox="0 0 40 22" fill="none" aria-hidden>
      <defs>
        <linearGradient id="eyeg" x1="0" x2="1">
          <stop offset="0%" stopColor="#E91E63" />
          <stop offset="100%" stopColor="#FFB300" />
        </linearGradient>
      </defs>
      <ellipse cx="11" cy="11" rx="9" ry="7" stroke="url(#eyeg)" strokeWidth="2" />
      <ellipse cx="29" cy="11" rx="9" ry="7" stroke="url(#eyeg)" strokeWidth="2" />
      <circle cx="11" cy="11" r="3" fill="url(#eyeg)" />
      <circle cx="29" cy="11" r="3" fill="url(#eyeg)" />
    </svg>
  );
}
